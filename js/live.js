const seen=new Set();
async function tick(){const d=await api('osu?a=scores');$('#msg').textContent=d.error||'';(d.scores||[]).reverse().forEach(s=>{if(seen.has(s.id))return;seen.add(s.id);const tr=document.createElement('tr');
tr.innerHTML=`<td><a href="profile.html?id=${s.user_id}">${s.user?.username||'#'+s.user_id}</a><td><a target=_blank href="https://osu.ppy.sh/b/${s.beatmap_id}">b/${s.beatmap_id}</a><td>${s.rank}<td>${f(s.accuracy*100,2)}%<td>${(s.mods||[]).map(mn).join('')}<td>${s.pp?f(s.pp)+'pp':'–'}`;
$('#feed').prepend(tr);while($('#feed').rows.length>60)$('#feed').deleteRow(-1)})}
tick();setInterval(tick,5000);
