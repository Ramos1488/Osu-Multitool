const seen=new Set();
async function tick(){const d=await api('osu?a=scores');$('#msg').textContent=d.error||'';(d.scores||[]).reverse().forEach(s=>{if(seen.has(s.id))return;seen.add(s.id);const tr=document.createElement('tr');
const set=s.beatmapset||{},user=s.user||{};
tr.innerHTML=`<td>${image(user.avatar_url,'avatar',user.username)}${flagImg(user.country_code)}<a href="profile.html?id=${+s.user_id}">${esc(user.username||'#'+s.user_id)}</a><td class="score-map"><span class="cover">${image(mapCover(set),'beatmap-cover',set.title||'Обложка карты')}</span><a target="_blank" rel="noreferrer" href="https://osu.ppy.sh/beatmaps/${+s.beatmap_id}">${esc(set.title||'Карта')} ${set.title?'':'#'+s.beatmap_id}</a><td>${esc(s.rank||'–')}<td>${f(s.accuracy*100,2)}%<td>${(s.mods||[]).map(m=>esc(mn(m))).join('')}<td>${s.pp?f(s.pp)+'pp':'–'}`;
$('#feed').prepend(tr);while($('#feed').rows.length>60)$('#feed').deleteRow(-1)})}
tick();setInterval(tick,5000);
