const q=new URLSearchParams(location.search);
(async()=>{await authReady;
const id=q.get('id'),u=q.get('u')||(me&&me.u);
const d=await api('osu?a=user&'+(id?'id='+id:'u='+encodeURIComponent(u||'')));
if(!d.id)return $('#pf').textContent=d.error||'Игрок не найден';
const s=d.statistics||{},best=await api('osu?a=best&id='+d.id),b=Array.isArray(best)?best:[];
const bpm=b.length?b.reduce((a,x)=>a+x.beatmap.bpm*bpmMul(x.mods||[]),0)/b.length:0;
const st=(v,l)=>`<div><b>${v}</b><span>${l}</span></div>`;
const team=d.team?`<span class="dim"> · ${image(d.team.flag_url||d.team.logo_url,'team-image',d.team.name)}<a target="_blank" rel="noreferrer" href="https://osu.ppy.sh/teams/${+d.team.id}">${esc(d.team.short_name||d.team.name)}</a></span>`:'';
$('#pf').innerHTML=`<div class="prof">${image(d.avatar_url,'','Аватар '+d.username)}<div><h2 style="margin:0">${esc(d.username)}</h2><span class="dim">${flagImg(d.country_code)}${esc(d.country?.name||d.country_code||'')}${team}</span></div></div>
<div class="stats">${st('#'+f(s.global_rank),'Мир')}${st('#'+f(s.country_rank),'Страна')}${st(f(s.pp)+'pp','PP')}${st(f(s.hit_accuracy,2)+'%','Точность')}${st(f(s.play_count),'Плеи')}${st(f(s.play_time/3600)+' ч','Время')}${st(f(bpm),'Средний BPM топ-100')}</div>
<a target="_blank" rel="noreferrer" href="https://osu.ppy.sh/users/${+d.id}">Открыть профиль osu! ↗</a> · <a href="calc.html?u=${encodeURIComponent(d.username)}">PP калькулятор</a>`;
$('#tp').innerHTML='<section class="card"><h3>Лучшие результаты</h3><table class="score-table"><tr><th>Карта<th>Моды<th>Точность<th>BPM<th>PP</tr>'+b.slice(0,15).map(x=>{const set=x.beatmapset||{},map=x.beatmap||{};return `<tr><td class="score-map"><span class="cover">${image(mapCover(set),'beatmap-cover',set.title||'Обложка карты')}</span><a target="_blank" rel="noreferrer" href="https://osu.ppy.sh/beatmaps/${+map.id}">${esc(set.title||'Карта')} [${esc(map.version||'')}]</a><td>${(x.mods||[]).map(m=>esc(mn(m))).join('')}<td>${f(x.accuracy*100,2)}%<td>${f(map.bpm*bpmMul(x.mods||[]))}<td>${f(x.pp)}</tr>`}).join('')+'</table></section>'})();
