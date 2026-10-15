let mode='players',page=1;const sel=$('#cc'),qs=new URLSearchParams(location.search);
countries().then(l=>{sel.innerHTML='<option value="">Весь мир</option>'+l.map(c=>`<option value="${c.code}">${flag(c.code)} ${c.name}</option>`).join('');if(qs.get('c'))sel.value=qs.get('c');rk()});
document.querySelectorAll('.seg button').forEach(b=>b.onclick=()=>{document.querySelectorAll('.seg button').forEach(x=>x.classList.remove('on'));b.classList.add('on');mode=b.dataset.m;page=1;rk()});
sel.onchange=()=>{page=1;rk()};$('#nx').onclick=()=>{page++;rk()};$('#pv').onclick=()=>{page=Math.max(1,page-1);rk()};
async function rk(){sel.style.display=mode==='players'?'':'none';
const d=await api(`osu?a=rank&type=${{players:'',teams:'team',countries:'country'}[mode]}&page=${page}&country=${sel.value}`),R=d.ranking||[],n=i=>(page-1)*50+i+1;
if(d.error||!R.length)return $('#rt').innerHTML='<tr><td class="dim">'+(d.error||'Нет данных')+'</tr>';
$('#rt').innerHTML=mode==='players'?'<tr><th>#<th>Игрок<th>PP<th>Точность<th>Плеи</tr>'+R.map((x,i)=>{const u=x.user||{};return `<tr><td>${n(i)}<td>${image(u.avatar_url,'avatar',u.username)}${flagImg(u.country_code)}<a href="profile.html?id=${+u.id}">${esc(u.username)}</a><td>${f(x.pp)}<td>${f(x.hit_accuracy,2)}%<td>${f(x.play_count)}</tr>`}).join('')
:mode==='teams'?'<tr><th>#<th>Команда<th>PP<th>Участники</tr>'+R.map((x,i)=>{const t=x.team||x;return `<tr><td>${n(i)}<td>${image(t.flag_url||t.logo_url,'team-image',t.name||t.short_name)}<a target="_blank" rel="noreferrer" href="https://osu.ppy.sh/teams/${+t.id}">${esc(t.name||t.short_name||t.id)}</a><td>${f(x.pp||x.performance||0)}<td>${f(x.members_count||t.members_count||0)}</tr>`}).join('')
:'<tr><th>#<th>Страна<th>PP<th>Игроки</tr>'+R.map((x,i)=>{const c=x.code||x.country?.code;return `<tr><td>${n(i)}<td>${flagImg(c)}<a href="ranking.html?c=${encodeURIComponent(c||'')}">${esc(x.name||x.country?.name||c)}</a><td>${f(x.performance||x.pp||0)}<td>${f(x.active_users||0)}</tr>`}).join('')}
