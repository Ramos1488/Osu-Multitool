let mode='players',page=1;
const sel=$('#cc'),qs=new URLSearchParams(location.search);
countries().then(list=>{
  sel.innerHTML=`<option value="">${t('world')}</option>`+list.map(c=>`<option value="${esc(c.code)}">${flag(c.code)} ${esc(c.name)}</option>`).join('');
  if(qs.get('c'))sel.value=qs.get('c');
  rk();
});
document.querySelectorAll('.seg button').forEach(button=>button.onclick=()=>{
  document.querySelectorAll('.seg button').forEach(item=>item.classList.remove('on'));
  button.classList.add('on');mode=button.dataset.m;page=1;rk();
});
sel.onchange=()=>{page=1;rk()};
$('#nx').onclick=()=>{page++;rk()};
$('#pv').onclick=()=>{page=Math.max(1,page-1);rk()};
async function rk(){
  sel.style.display=mode==='players'?'':'none';
  const type={players:'',teams:'team',countries:'country'}[mode];
  const d=await api(`osu?a=rank&type=${type}&page=${page}&country=${encodeURIComponent(sel.value)}`);
  const rows=Array.isArray(d.ranking)?d.ranking:[];
  const rank=i=>(page-1)*50+i+1;
  if(d.error||!rows.length){
    $('#rt').innerHTML=`<tr><td class="dim">${esc(d.error||t('noRankData'))}</td></tr>`;
    return;
  }
  if(mode==='players'){
    $('#rt').innerHTML=`<tr><th>${t('rankColumn')}<th>${t('player')}<th>${t('pp')}<th>${t('accuracyColumn')}<th>${t('playsColumn')}</tr>`+rows.map((x,i)=>{
      const user=x.user||{};
      return `<tr><td>${rank(i)}<td>${image(user.avatar_url,'avatar',user.username)}${flagImg(user.country_code)}<a href="profile.html?id=${encodeURIComponent(user.id||'')}">${esc(user.username||'—')}</a><td>${f(x.pp)}<td>${f(x.hit_accuracy,2)}%<td>${f(x.play_count)}</tr>`;
    }).join('');
  }else if(mode==='teams'){
    $('#rt').innerHTML=`<tr><th>${t('rankColumn')}<th>${t('teams')}<th>${t('pp')}<th>${t('members')}</tr>`+rows.map((x,i)=>{
      const team=x.team||x,id=team.id;
      return `<tr><td>${rank(i)}<td>${image(team.flag_url||team.logo_url,'team-image',team.name||team.short_name)}${id?`<a target="_blank" rel="noreferrer" href="https://osu.ppy.sh/teams/${encodeURIComponent(id)}">${esc(team.name||team.short_name||id)}</a>`:esc(team.name||team.short_name||'—')}<td>${f(x.pp||x.performance||0)}<td>${f(x.members_count||team.members_count||0)}</tr>`;
    }).join('');
  }else{
    $('#rt').innerHTML=`<tr><th>${t('rankColumn')}<th>${t('countryColumn')}<th>${t('pp')}<th>${t('countryPlayers')}</tr>`+rows.map((x,i)=>{
      const countryCode=x.code||x.country?.code;
      return `<tr><td>${rank(i)}<td>${flagImg(countryCode)}<a href="ranking.html?c=${encodeURIComponent(countryCode||'')}">${esc(x.name||x.country?.name||countryCode||'—')}</a><td>${f(x.performance||x.pp||0)}<td>${f(x.active_users||0)}</tr>`;
    }).join('');
  }
}
