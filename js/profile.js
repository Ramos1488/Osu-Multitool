const q=new URLSearchParams(location.search);
(async()=>{await authReady;
const id=q.get('id'),u=q.get('u')||(me&&me.u);
const d=await api('osu?a=user&'+(id?'id='+id:'u='+encodeURIComponent(u||'')));
if(!d.id)return $('#pf').textContent=d.error||'Игрок не найден';
const s=d.statistics||{},best=await api('osu?a=best&id='+d.id),b=Array.isArray(best)?best:[];
const bpm=b.length?b.reduce((a,x)=>a+x.beatmap.bpm*bpmMul(x.mods||[]),0)/b.length:0;
const st=(v,l)=>`<div><b>${v}</b><span>${l}</span></div>`;
$('#pf').innerHTML=`<div class="prof"><img src="${d.avatar_url}" alt=""><div><h2 style="margin:0">${d.username}</h2><span class="dim">${flag(d.country_code)} ${d.country?.name||d.country_code}${d.team?` · <a target=_blank href="https://osu.ppy.sh/teams/${d.team.id}">[${d.team.short_name}] ${d.team.name}</a>`:''}</span></div></div>
<div class="stats">${st('#'+f(s.global_rank),'Мир')}${st('#'+f(s.country_rank),'Страна')}${st(f(s.pp)+'pp','PP')}${st(f(s.hit_accuracy,2)+'%','Точность')}${st(f(s.play_count),'Плеи')}${st(f(s.play_time/3600)+' ч','Время')}${st(f(bpm),'Средний BPM топ-100')}</div>
<a target=_blank href="https://osu.ppy.sh/users/${d.id}">Открыть на osu! ↗</a> · <a href="calc.html?u=${encodeURIComponent(d.username)}">PP калькулятор</a>`;
$('#tp').innerHTML='<h3>Топ плеи</h3><table><tr><th>Карта<th>Моды<th>Acc<th>BPM<th>PP</tr>'+b.slice(0,15).map(x=>`<tr><td><a target=_blank href="https://osu.ppy.sh/b/${x.beatmap.id}">${x.beatmapset.title} [${x.beatmap.version}]</a><td>${(x.mods||[]).map(mn).join('')}<td>${f(x.accuracy*100,2)}%<td>${f(x.beatmap.bpm*bpmMul(x.mods||[]))}<td>${f(x.pp)}</tr>`).join('')+'</table>'})();
