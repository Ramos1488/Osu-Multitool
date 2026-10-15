const seen=new Set();
$('#feed').innerHTML=`<tr><th>${t('player')}<th>${t('map')}<th>${t('rankColumn')}<th>${t('accuracy')}<th>${t('mods')}<th>${t('scorePP')}</tr>`;
async function tick(){const d=await api('osu?a=scores');if(d.error){$('#msg').textContent=`${t('liveError')} ${d.error}`;return}$('#msg').textContent='';(Array.isArray(d.scores)?d.scores:[]).slice().reverse().forEach(s=>{if(seen.has(s.id))return;seen.add(s.id);const tr=document.createElement('tr');
const set=s.beatmapset||{},user=s.user||{};
tr.innerHTML=`<td>${image(user.avatar_url,'avatar',user.username)}${flagImg(user.country_code)}<a href="profile.html?id=${encodeURIComponent(s.user_id||'')}">${esc(user.username||'#'+s.user_id)}</a><td class="score-map"><span class="cover">${image(mapCover(set),'beatmap-cover',set.title||t('cover'))}</span><a target="_blank" rel="noreferrer" href="https://osu.ppy.sh/beatmaps/${encodeURIComponent(s.beatmap_id||'')}">${esc(set.title||t('map'))}</a><td>${esc(s.rank||'–')}<td>${f(s.accuracy*100,2)}%<td>${(s.mods||[]).map(m=>esc(mn(m))).join('')||'—'}<td>${s.pp?f(s.pp)+'pp':'–'}`;
$('#feed').prepend(tr);while($('#feed').rows.length>60)$('#feed').deleteRow(-1)})}
tick();setInterval(tick,5000);
