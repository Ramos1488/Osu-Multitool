const seen=new Set();
const period=$('#score-period'),countrySelect=$('#score-country');
const liveHead=`<tr><th>${t('player')}<th>${t('map')}<th>${t('rankColumn')}<th>${t('accuracy')}<th>${t('mods')}<th>${t('scorePP')}</tr>`;
const topHead=`<tr><th>${t('rankColumn')}<th>${t('player')}<th>${t('country')}<th>${t('map')}<th>${t('accuracy')}<th>${t('mods')}<th>${t('scorePP')}<th>${t('scoreTime')}</tr>`;
$('#feed').innerHTML=liveHead;
$('#top-feed').innerHTML=topHead;
countries().then(list=>{
  countrySelect.innerHTML=`<option value="">${t('worldwide')}</option>`+list.map(item=>`<option value="${esc(item.code)}">${flag(item.code)} ${esc(item.name)}</option>`).join('');
}).catch(error=>{$('#top-msg').textContent=`${t('scoreLoadError')} ${error.message||String(error)}`});
period.onchange=loadTopScores;
countrySelect.onchange=loadTopScores;
function scoreUserCell(user,id){
  const name=user.username||`#${id||'?'}`,country=user.country?.name||countryName(user.country_code);
  return `${image(user.avatar_url,'avatar',name)}${flagImg(user.country_code)}<a href="profile.html?id=${encodeURIComponent(id||'')}">${esc(name)}</a>${country?`<span class="dim country-name"> · ${esc(country)}</span>`:''}`;
}
function scoreMapCell(score){
  const beatmap=score.beatmap||{},set=score.beatmapset||{};
  const setWithId={...set,id:set.id||score.beatmapset_id||beatmap.beatmapset_id};
  const id=score.beatmap_id||beatmap.id;
  const title=set.title||beatmap.title||`${t('map')} #${id||'?'}`;
  return `<span class="cover">${image(score.beatmap_cover||mapCover(setWithId),'beatmap-cover',title)}</span><a target="_blank" rel="noreferrer" href="https://osu.ppy.sh/beatmaps/${encodeURIComponent(id||'')}">${esc(title)}${beatmap.version?` [${esc(beatmap.version)}]`:''}</a>`;
}
async function loadTopScores(){
  $('#top-msg').textContent='';
  $('#top-feed').innerHTML=topHead;
  const response=await api(`osu?a=top_scores&period=${encodeURIComponent(period.value)}&country=${encodeURIComponent(countrySelect.value)}`);
  if(response.error){
    $('#top-msg').textContent=response.error.includes('Configure Supabase')
      ?t('trackingSetup')
      :`${t('scoreLoadError')} ${response.error}`;
    return;
  }
  const rows=Array.isArray(response.scores)?response.scores:[];
  if(!rows.length){
    $('#top-msg').textContent=t('noTrackedScores');
    return;
  }
  $('#top-msg').textContent='';
  $('#top-feed').innerHTML=topHead+rows.map((score,index)=>{
    const user={username:score.username,country_code:score.country_code};
    const time=score.score_date?new Date(score.score_date).toLocaleString(language==='en'?'en-US':'ru-RU'):'—';
    const set={id:score.beatmapset_id};
    return `<tr><td>${index+1}<td>${scoreUserCell(user,score.osu_id)}<td>${flagImg(score.country_code)}${esc(countryName(score.country_code)||'—')}<td class="score-map"><span class="cover">${image(score.beatmap_cover||mapCover(set),'beatmap-cover',score.beatmap_title||t('cover'))}</span><a target="_blank" rel="noreferrer" href="https://osu.ppy.sh/beatmaps/${encodeURIComponent(score.beatmap_id)}">${esc(score.beatmap_title||t('map'))}${score.beatmap_version?` [${esc(score.beatmap_version)}]`:''}</a><td>${Number.isFinite(Number(score.accuracy))?f(score.accuracy*100,2)+'%':'—'}<td>${Array.isArray(score.mods)?score.mods.map(mod=>esc(mn(mod))).join(''):'—'}<td>${Number.isFinite(Number(score.pp))?f(score.pp)+'pp':'—'}<td>${esc(time)}</tr>`;
  }).join('');
}
async function tick(){
  const response=await api('osu?a=scores');
  if(response.error){$('#msg').textContent=`${t('liveError')} ${response.error}`;return}
  const messages=[];
  if(response.trackingError){
    messages.push(response.trackingError.includes('Configure Supabase')
      ?t('trackingSetup')
      :`${t('scoreTrackingError')} ${response.trackingError}`);
  }
  if(response.profileLookupFailures)messages.push(t('profileDataMissing'));
  $('#msg').textContent=messages.join(' ');
  (Array.isArray(response.scores)?response.scores:[]).slice().reverse().forEach(score=>{
    if(seen.has(score.id))return;
    seen.add(score.id);
    const row=document.createElement('tr'),user=score.user||{};
    row.innerHTML=`<td>${scoreUserCell(user,score.user_id)}<td class="score-map">${scoreMapCell(score)}<td>${esc(score.rank||'–')}<td>${f(score.accuracy*100,2)}%<td>${(score.mods||[]).map(mod=>esc(mn(mod))).join('')||'—'}<td>${score.pp?f(score.pp)+'pp':'–'}`;
    $('#feed').prepend(row);
    while($('#feed').rows.length>61)$('#feed').deleteRow(-1);
  });
  if(response.trackingError)loadTopScores();
}
loadTopScores();
tick();
setInterval(tick,5000);
