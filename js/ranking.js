let page=1;
async function rk(){const d=await api(`osu?a=rank&page=${page}&country=${$('#cc').value}`);
$('#rt').innerHTML='<tr><th>#<th>Игрок<th>PP<th>Acc<th>Плеи</tr>'+(d.ranking||[]).map((x,i)=>`<tr><td>${(page-1)*50+i+1}<td>${x.user.username} ${x.user.country_code}<td>${f(x.pp)}<td>${f(x.hit_accuracy,2)}%<td>${f(x.play_count)}</tr>`).join('')}
$('#rk').onclick=()=>{page=1;rk()};$('#nx').onclick=()=>{page++;rk()};$('#pv').onclick=()=>{page=Math.max(1,page-1);rk()};rk();
