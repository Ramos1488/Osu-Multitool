let keys=['z','x'],sel=false,ctx=null,S=null,lastBeat=-1;
const clamp=(v,a,b)=>Math.min(b,Math.max(a,v));
const mean=a=>a.reduce((x,y)=>x+y,0)/(a.length||1),sd=a=>{const m=mean(a);return Math.sqrt(mean(a.map(x=>(x-m)**2)))};
const effBpm=()=>clamp(+$('#bt').value||0,30,500)*clamp(+$('#rt').value||1,.25,3);
const syncEff=()=>{$('#eff').textContent=f(effBpm(),1)};
$('#bt').oninput=()=>{$('#bs').value=clamp(+$('#bt').value||0,60,400);syncEff()};
$('#bs').oninput=()=>{$('#bt').value=$('#bs').value;syncEff()};
$('#rt').oninput=syncEff;
document.querySelectorAll('.rate-btn').forEach(b=>b.onclick=()=>{$('#rt').value=b.dataset.rate;syncEff()});
$('#ks').onclick=()=>{keys=[];sel=true;$('#kl').textContent=t('pressKeys',{n:$('#kn').value})};
$('#go').onclick=()=>S?stop():start();
syncEff();

function click(at,accent){
  const o=ctx.createOscillator(),g=ctx.createGain();
  o.frequency.value=accent?1500:1000;
  g.gain.setValueAtTime(.0001,at);g.gain.exponentialRampToValueAtTime(.35,at+.002);g.gain.exponentialRampToValueAtTime(.0001,at+.05);
  o.connect(g).connect(ctx.destination);o.start(at);o.stop(at+.06);
}
function start(){
  const bpm=clamp(+$('#bt').value||180,30,500),rate=clamp(+$('#rt').value||1,.25,3),snap=+$('#sn').value,dur=+$('#du').value;
  const beat=60000/(bpm*rate),lead=200,t0=performance.now()+lead,tStart=t0+4*beat,tEnd=tStart+dur*1000;
  S={bpm,rate,snap,dur,beat,g:beat/snap,t0,tStart,tEnd,taps:[],metro:$('#mt').checked};
  S.timer=setTimeout(finish,tEnd-performance.now()+30);
  if(S.metro){
    const AC=window.AudioContext||window.webkitAudioContext;
    if(AC){ctx=new AC();ctx.resume();const a0=ctx.currentTime+lead/1000;for(let k=0;k*beat<=4*beat+dur*1000;k++)click(a0+k*beat/1000,k%4===0)}
  }
  $('#go').textContent=t('stop');$('#go').blur();$('#bres').innerHTML='';$('#bv').textContent='0';lastBeat=-1;
  requestAnimationFrame(loop);
}
function stop(){
  if(!S)return;
  clearTimeout(S.timer);S=null;
  if(ctx){ctx.close();ctx=null}
  $('#go').textContent=t('start');$('#bsub').textContent='';$('#beat').classList.remove('on');
}
function loop(){
  if(!S)return;
  const now=performance.now(),n=Math.floor((now-S.t0)/S.beat);
  if(n!==lastBeat&&n>=0){lastBeat=n;$('#beat').classList.add('on');setTimeout(()=>$('#beat').classList.remove('on'),90)}
  if(now<S.t0)$('#bsub').textContent=t('getReady');
  else if(now<S.tStart)$('#bsub').textContent=`${t('getReady')} ${Math.max(1,4-n)}`;
  else{
    const left=Math.max(0,(S.tEnd-now)/1000);
    $('#bsub').textContent=`${t('tapGo')} ${f(left,1)}`;
    const w=S.taps.filter(x=>x>now-2000);
    if(w.length>2)$('#bv').textContent=f((w.length-1)/((w[w.length-1]-w[0])/1000)*60/S.snap);
  }
  requestAnimationFrame(loop);
}
function finish(){
  const s=S;stop();
  if(!s)return;
  const n=s.taps.length;
  if(n<3){$('#bres').textContent=t('noTaps');return}
  const measured=n/s.dur*60/s.snap,target=s.bpm*s.rate;
  const intervals=s.taps.slice(1).map((x,i)=>x-s.taps[i]),ur=10*sd(intervals);
  const offsets=s.taps.map(x=>{const o=((x-s.t0)%s.g+s.g)%s.g;return o>s.g/2?o-s.g:o});
  const stat=(v,l)=>`<div><b>${v}</b><span>${l}</span></div>`;
  $('#bv').textContent=f(measured);
  $('#bres').innerHTML=`<div class="stats">${stat(f(measured,1),t('measuredBpm'))}${stat(f(target,1),t('effectiveBpm'))}${stat(f(measured/target*100,1)+'%',t('vsTarget'))}${stat(f(n),t('tapsCount'))}${stat(f(ur,1),t('unstableRate'))}${s.metro?stat(f(mean(offsets),1),t('avgOffset')):''}</div>${s.metro?`<p class="dim">${t('offsetNote')}</p>`:''}`;
  if(me)fetch(`/api/osu?a=savebpm&bpm=${encodeURIComponent(measured)}&keys=${encodeURIComponent(keys.join(''))}`);
}
addEventListener('keydown',e=>{
  if(e.key==='Escape'&&S){stop();return}
  if(e.repeat||['INPUT','SELECT','TEXTAREA'].includes(e.target.tagName))return;
  const k=e.key.toLowerCase();
  if(sel){
    e.preventDefault();
    if(!keys.includes(k))keys.push(k);
    $('#kl').textContent=keys.join(' + ').toUpperCase();
    if(keys.length>=+$('#kn').value)sel=false;
    return;
  }
  if(!S||!keys.includes(k))return;
  e.preventDefault();
  const now=performance.now();
  if(now>=S.tStart&&now<=S.tEnd)S.taps.push(now);
});
