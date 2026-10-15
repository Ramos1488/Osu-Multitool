const q=new URLSearchParams(location.search);
(async()=>{
  await authReady;
  const id=q.get('id'),u=q.get('u')||(me&&me.u);
  const d=await api('osu?a=user&'+(id?'id='+encodeURIComponent(id):'u='+encodeURIComponent(u||'')));
  if(!d||!d.id){
    $('#pf').textContent=d?.error||t('playerNotFound');
    return;
  }
  const s=d.statistics||{},best=await api('osu?a=best&id='+encodeURIComponent(d.id));
  if(!Array.isArray(best)&&best?.error){
    $('#tp').innerHTML=`<div class="card dim">${esc(best.error)}</div>`;
  }
  const scores=Array.isArray(best)?best:[];
  const validScores=scores.filter(x=>x&&x.beatmap);
  const bpm=validScores.length
    ?validScores.reduce((sum,x)=>sum+(Number(x.beatmap.bpm)||0)*bpmMul(x.mods||[]),0)/validScores.length
    :0;
  const value=n=>Number.isFinite(Number(n))?f(n):'—';
  const stat=(v,label)=>`<div><b>${v}</b><span>${label}</span></div>`;
  const team=d.team?`<span class="dim team-inline"> · ${image(d.team.flag_url||d.team.logo_url,'team-image',d.team.name||d.team.short_name)}<a target="_blank" rel="noreferrer" href="https://osu.ppy.sh/teams/${encodeURIComponent(d.team.id)}">${esc(d.team.short_name||d.team.name||t('premium'))}</a></span>`:'';
  $('#pf').innerHTML=`<div class="prof">${image(d.avatar_url,'profile-avatar',d.username)}<div><h2 style="margin:0">${esc(d.username)}</h2><span class="dim">${flagImg(d.country_code)}${esc(d.country?.name||d.country_code||t('countryUnknown'))}${team}</span></div></div>
  <div class="stats">${stat(s.global_rank?'#'+f(s.global_rank):'—',t('worldRank'))}${stat(s.country_rank?'#'+f(s.country_rank):'—',t('countryRank'))}${stat(value(s.pp)+'pp',t('pp'))}${stat(Number.isFinite(Number(s.hit_accuracy))?f(s.hit_accuracy,2)+'%':'—',t('accuracy'))}${stat(value(s.play_count),t('plays'))}${stat(Number.isFinite(Number(s.play_time))?f(s.play_time/3600)+' '+t('hours'):'—',t('playTime'))}${stat(f(bpm),t('avgTopBpm'))}</div>
  <a target="_blank" rel="noreferrer" href="https://osu.ppy.sh/users/${encodeURIComponent(d.id)}">${t('openProfile')}</a> · <a href="calc.html?u=${encodeURIComponent(d.username)}">${t('ppCalculator')}</a>`;
  if(!Array.isArray(best)||!validScores.length){
    if(!best?.error)$('#tp').innerHTML=`<section class="card"><h3>${t('topPlays')}</h3><p class="dim">${t('noScores')}</p></section>`;
    return;
  }
  $('#tp').innerHTML=`<section class="card"><h3>${t('topPlays')}</h3><div class="table-scroll"><table class="score-table"><tr><th>${t('map')}<th>${t('mods')}<th>${t('accuracy')}<th>${t('bpm')}<th>${t('scorePP')}</tr>${validScores.slice(0,15).map(x=>{
    const set=x.beatmapset||{},map=x.beatmap||{},beatmapLink=map.id?`https://osu.ppy.sh/beatmaps/${encodeURIComponent(map.id)}`:null;
    const mapName=`${set.title||''}${set.title?' ':''}[${map.version||''}]`;
    const mapLabel=esc(mapName||t('map'));
    return `<tr><td class="score-map"><span class="cover">${image(mapCover(set),'beatmap-cover',t('cover'))}</span>${beatmapLink?`<a target="_blank" rel="noreferrer" href="${beatmapLink}">${mapLabel}</a>`:mapLabel}<td>${(x.mods||[]).map(m=>esc(mn(m))).join('')||'—'}<td>${Number.isFinite(Number(x.accuracy))?f(x.accuracy*100,2)+'%':'—'}<td>${f((Number(map.bpm)||0)*bpmMul(x.mods||[]))}<td>${value(x.pp)}</tr>`;
  }).join('')}</table></div></section>`;
})();
