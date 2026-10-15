let P,best=[],rw=[];
authReady.then(session=>{
  const username=new URLSearchParams(location.search).get('u')||(session&&session.u);
  if(username){$('#uname').value=username;ld()}
});
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
  if(!Array.isArray(best)){
    const error=best?.error;
    P=null;best=[];rw=[];$('#pinfo').textContent=error||t('failedLoad');return;
  }
  const stats=P.statistics||{};
  const avgBpm=best.length
    ?best.reduce((sum,score)=>sum+(Number(score.beatmap?.bpm)||0)*bpmMul(score.mods||[]),0)/best.length
    :0;
  $('#pinfo').innerHTML=`<b>${esc(P.username)}</b> · ${f(stats.pp)}pp · #${f(stats.global_rank)} (${esc(P.country_code||'—')} #${f(stats.country_rank)})<br>${t('avgTopBpm')}: <b>${f(avgBpm)}</b>`;
  $('#tr').value=stats.global_rank?Math.max(1,stats.global_rank-1):'';
  rw=best.slice(0,50).map(score=>({name:score.beatmap?.version||t('map'),old:Number(score.pp)||0,next:Number(score.pp)||0}));
  drawRw();
}
$('#ld').onclick=ld;
$('#gr').onclick=async()=>{
  if(!P){$('#rres').textContent=t('selectPlayer');return}
  const target=Number($('#tr').value);
  if(!Number.isInteger(target)||target<1){$('#rres').textContent=t('enterValidRank');return}
  const d=await api('osu?a=rank&page='+Math.ceil(target/50));
  const item=Array.isArray(d.ranking)?d.ranking[(target-1)%50]:null;
  if(d.error||!item?.user){$('#rres').textContent=d.error||t('rankUnavailable');return}
  $('#rres').textContent=t('rankNeeded',{pp:f(Math.max(0,(Number(item.pp)||0)-(Number(P.statistics?.pp)||0)+.01),1),rank:f(target),player:item.user.username||'—'});
};
$('#gp').onclick=()=>{
  if(!P){$('#pres').textContent=t('selectPlayer');return}
  const newScore=Number($('#np').value);
  if(!Number.isFinite(newScore)||newScore<0){$('#pres').textContent=t('invalidScorePP');return}
  const oldScores=best.map(score=>Number(score.pp)||0);
  const gain=tot(oldScores.concat(newScore).sort(desc))-tot(oldScores);
  $('#pres').textContent=t('gainResult',{pp:f(gain,1),total:f((Number(P.statistics?.pp)||0)+gain,1)});
};
function drawRw(){
  $('#rw').innerHTML=`<tr><th>${t('map')}<th>${t('current')}<th>${t('newPP')}</tr>`+rw.map((score,index)=>`<tr><td>${esc(score.name)}<td>${f(score.old,1)}<td><input type="number" step=".1" value="${score.next.toFixed(1)}" data-i="${index}" aria-label="${esc(score.name)}"></tr>`).join('');
  calcRw();
}
function calcRw(){
  const oldTotal=tot(rw.map(score=>score.old)),newTotal=tot(rw.map(score=>score.next).sort(desc)),change=newTotal-oldTotal;
  $('#rwres').textContent=t('rankReworkResult',{label:t('top50'),old:f(oldTotal,1),new:f(newTotal,1),change:(change>=0?'+':'')+f(change,1)});
}
$('#rw').oninput=event=>{
  const index=Number(event.target.dataset.i);
  if(!Number.isInteger(index)||!rw[index])return;
  rw[index].next=Math.max(0,Number(event.target.value)||0);calcRw();
};
$('#am').onclick=()=>{
  const multiplier=Number($('#mul').value);
  if(!Number.isFinite(multiplier)||multiplier<0)return;
  rw.forEach(score=>score.next=score.old*multiplier);drawRw();
};
