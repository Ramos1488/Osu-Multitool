let keys=['z','x'],cnt=0,t0=0,run=false,sel=false,iv;
$('#ks').onclick=()=>{keys=[];sel=true;$('#kl').textContent=t('pressKeys',{n:$('#kn').value})};
const bnow=()=>cnt/((performance.now()-t0)/1000)*15;
function end(){run=false;clearInterval(iv);const b=cnt/10*15;$('#bv').textContent=f(b);$('#bres').textContent=`${t('result')}: ${f(b,1)} BPM (${cnt} ${t('presses')})`;if(me)fetch(`/api/osu?a=savebpm&bpm=${b}&keys=${keys.join('')}`)}
addEventListener('keydown',e=>{if(e.repeat||e.target.tagName==='SELECT')return;const k=e.key.toLowerCase();
if(sel){e.preventDefault();if(!keys.includes(k))keys.push(k);$('#kl').textContent=keys.join(' + ').toUpperCase();if(keys.length>=+$('#kn').value)sel=false;return}
if(!keys.includes(k))return;e.preventDefault();if(!run){run=true;cnt=0;t0=performance.now();setTimeout(end,10000);iv=setInterval(()=>$('#bv').textContent=f(bnow()),100)}cnt++});
