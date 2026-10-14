let P,best=[],rw=[];
const bpmMul=m=>m.some(x=>/DT|NC/.test(mn(x)))?1.5:m.some(x=>/HT|DC/.test(mn(x)))?.75:1;
authReady.then(s=>{if(s){$('#uname').value=s.u;ld()}});
async function ld(){const u=$('#uname').value.trim();if(!u)return;P=await api('osu?a=user&u='+encodeURIComponent(u));
if(!P.id)return $('#pinfo').textContent='Игрок не найден';best=await api('osu?a=best&id='+P.id);const s=P.statistics;
const bpm=best.reduce((a,x)=>a+x.beatmap.bpm*bpmMul(x.mods||[]),0)/best.length;
$('#pinfo').innerHTML=`<b>${P.username}</b> · ${f(s.pp)}pp · #${f(s.global_rank)} (${P.country_code} #${f(s.country_rank)})<br>Средний BPM твоих топ-100: <b>${f(bpm)}</b>`;
$('#tr').value=s.global_rank-1;rw=best.slice(0,50).map(x=>({n:x.beatmap.version,old:x.pp,nw:x.pp}));drawRw()}
$('#ld').onclick=ld;
$('#gr').onclick=async()=>{if(!P)return;const t=+$('#tr').value,d=await api('osu?a=rank&page='+Math.ceil(t/50)),x=d.ranking[(t-1)%50];
$('#rres').innerHTML=`#${t} — ${x.user.username}: ${f(x.pp)}pp. Нужно ещё <b>${f(Math.max(0,x.pp-P.statistics.pp+.01),1)}</b> pp`};
$('#gp').onclick=()=>{if(!P)return;const o=best.map(x=>x.pp),g=tot(o.concat(+$('#np').value).sort(desc))-tot(o);
$('#pres').innerHTML=`Прибавка: <b>+${f(g,1)}pp</b> → ${f(P.statistics.pp+g,1)}pp`};
function drawRw(){$('#rw').innerHTML='<tr><th>Карта<th>Сейчас<th>Новое pp</tr>'+rw.map((r,i)=>`<tr><td>${r.n}<td>${f(r.old,1)}<td><input type="number" step=".1" value="${r.nw.toFixed(1)}" data-i="${i}"></tr>`).join('');calcRw()}
function calcRw(){const o=tot(rw.map(r=>r.old)),n=tot(rw.map(r=>r.nw).sort(desc)),d=n-o;$('#rwres').innerHTML=`Топ-50: ${f(o,1)} → ${f(n,1)} (<b>${d>=0?'+':''}${f(d,1)}pp</b>)`}
$('#rw').oninput=e=>{rw[e.target.dataset.i].nw=+e.target.value;calcRw()};
$('#am').onclick=()=>{rw.forEach(r=>r.nw=r.old*$('#mul').value);drawRw()};
