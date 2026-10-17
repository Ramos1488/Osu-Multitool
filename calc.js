let P,best=[],rw=[];
const num=x=>Number(x)||0;
const scoresPP=()=>best.map(s=>num(s.pp));
const sorted=a=>a.slice().sort(desc);
authReady.then(session=>{
  const username=new URLSearchParams(location.search).get('u')||(session&&session.u);
  if(username){$('#uname').value=username;ld()}
});
function defaultTarget(){
  const st=P?.statistics||{},r=$('#trt').value==='country'?st.country_rank:st.global_rank;
  $('#tr').value=r?Math.max(1,r-1):'';
}
async function ld(){
  const username=$('#uname').value.trim();
  if(!username)return;
  $('#pinfo').textContent=t('loadingPlayer');
  P=await api('osu?a=user&u='+encodeURIComponent(username));
  if(!P||!P.id){
    const error=P?.error;
    P=null;$('#pinfo').textContent=error||t('playerNotFound');return;
  }
  best=await api('osu?a=best&id='+encodeURIComponent(P.id));
  if(!Array.isArray(best)){$('#pinfo').textContent=best?.error||t('failedLoad');best=[];return}
  const stats=P.statistics||{};
  const avgBpm=best.length?best.reduce((sum,s)=>sum+num(s.beatmap?.bpm)*bpmMul(s.mods||[]),0)/best.length:0;
  $('#pinfo').innerHTML=`<b>${esc(P.username)}</b> · ${f(stats.pp)}pp · #${f(stats.global_rank)} (${esc(P.country_code||'—')} #${f(stats.country_rank)})<br>${t('avgTopBpm')}: <b>${f(avgBpm)}</b>`;
  defaultTarget();
  rw=best.slice(0,100).map(s=>({name:s.beatmap?.version||t('map'),old:num(s.pp),next:num(s.pp)}));
  drawRw();
}
$('#ld').onclick=ld;
$('#trt').onchange=defaultTarget;
// smallest single new score that adds at least `gain` pp
function singleScoreFor(gain){
  const old=sorted(scoresPP()),base=tot(old),gainOf=x=>tot(sorted(old.concat(x)))-base;
  let lo=0,hi=1500;
  if(gainOf(hi)<gain)return null;
  for(let i=0;i<40;i++){const mid=(lo+hi)/2;gainOf(mid)>=gain?hi=mid:lo=mid}
  return hi;
}
$('#gr').onclick=async()=>{
  if(!P){$('#rres').textContent=t('selectPlayer');return}
  const target=Number($('#tr').value);
  if(!Number.isInteger(target)||target<1){$('#rres').textContent=t('enterValidRank');return}
  const page=Math.ceil(target/50);
  if(page>200){$('#rres').textContent=t('rankOutOfRange');return}
  const country=$('#trt').value==='country'?(P.country_code||''):'';
  const d=await api(`osu?a=rank&page=${page}&country=${encodeURIComponent(country)}`);
  const item=Array.isArray(d.ranking)?d.ranking[(target-1)%50]:null;
  if(d.error||!item?.user){$('#rres').textContent=d.error||t('rankUnavailable');return}
  const gain=Math.max(0,num(item.pp)-num(P.statistics?.pp)+.01);
  let text=t('rankNeeded',{pp:f(gain,1),rank:f(target),player:item.user.username||'—'});
  if(gain>0){const one=singleScoreFor(gain);text+=' '+(one?t('singleScore',{pp:f(one)}):t('singleScoreNo'))}
  $('#rres').textContent=text;
};
$('#gp').onclick=()=>{
  if(!P){$('#pres').textContent=t('selectPlayer');return}
  const values=$('#np').value.split(/[\s,;]+/).map(Number).filter(v=>Number.isFinite(v)&&v>0);
  if(!values.length){$('#pres').textContent=t('invalidScorePP');return}
  const old=sorted(scoresPP()),next=sorted(old.concat(values)),gain=tot(next)-tot(old);
  const pos=next.indexOf(Math.max(...values))+1;
  let text=t('gainResult',{pp:f(gain,1),total:f(num(P.statistics?.pp)+gain,1)});
  if(pos<=100)text+=' '+t('scorePosition',{pos});
  $('#pres').textContent=text;
};
function drawRw(){
  $('#rw').innerHTML=`<tr><th>${t('map')}<th>${t('current')}<th>${t('newPP')}</tr>`+rw.map((s,i)=>`<tr><td>${esc(s.name)}<td>${f(s.old,1)}<td><input type="number" step=".1" value="${s.next.toFixed(1)}" data-i="${i}" aria-label="${esc(s.name)}"></tr>`).join('');
  calcRw();
}
function calcRw(){
  const oldTotal=tot(rw.map(s=>s.old)),newTotal=tot(sorted(rw.map(s=>s.next))),change=newTotal-oldTotal,profile=num(P?.statistics?.pp);
  $('#rwres').innerHTML=`${t('rankReworkResult',{label:t('top100'),old:f(oldTotal,1),new:f(newTotal,1),change:(change>=0?'+':'')+f(change,1)})}`+(P?`<br>${t('reworkTotal',{old:f(profile,1),new:f(profile+change,1)})}`:'');
}
$('#rw').oninput=e=>{
  const i=Number(e.target.dataset.i);
  if(!Number.isInteger(i)||!rw[i])return;
  rw[i].next=Math.max(0,num(e.target.value));calcRw();
};
$('#am').onclick=()=>{
  const m=Number($('#mul').value);
  if(!Number.isFinite(m)||m<0)return;
  rw.forEach(s=>s.next=s.old*m);drawRw();
};
$('#rr').onclick=()=>{rw.forEach(s=>s.next=s.old);drawRw()};
