function pp(a,m,acc,hd){acc/=100;const n=m.count_circles+m.count_sliders+m.count_spinners,nc=Math.max(1,m.count_circles),od=a.overall_difficulty,ar=a.approach_rate;
const L=.95+.4*Math.min(1,n/2000)+(n>2000?Math.log10(n/2000)*.5:0),B=d=>(5*Math.max(1,d/.0675)-4)**3/1e5;
const arF=ar>10.33?.3*(ar-10.33):ar<8?.05*(8-ar):0,h=hd?1+.04*(12-ar):1;
const aim=B(a.aim_difficulty)*L*(1+arF*L)*h*acc*(.98+od*od/2500);
const sp=B(a.speed_difficulty)*L*(1+arF*L)*h*(.95+od*od/750)*acc**((14.5-Math.max(od,8))/2);
const ba=Math.max(0,1-(1-acc)*n/nc),ac=1.52163**od*ba**24*2.83*Math.min(1.15,(nc/1000)**.3)*(hd?1.08:1);
return 1.14*(aim**1.1+sp**1.1+ac**1.1)**(1/1.1)}
let sets=[];
$('#ms').onclick=async()=>{const d=await api('osu?a=search&q='+encodeURIComponent($('#mq').value));sets=d.beatmapsets||[];
$('#ml').innerHTML=sets.slice(0,15).map((s,i)=>`<div class="card map-card"><span class="cover">${image(mapCover(s),'beatmap-cover',s.title||'Обложка карты')}</span><div><b>${esc(s.artist)} — ${esc(s.title)}</b><div class="dim">${esc(s.creator||'')} · ${s.play_count?f(s.play_count)+' прохождений':''}</div><div class="row" style="margin:10px 0 0">`+s.beatmaps.filter(b=>b.mode==='osu').map(b=>`<button data-s="${i}" data-b="${b.id}">${esc(b.version)} · ${f(b.difficulty_rating,2)}★</button>`).join(' ')+'</div></div></div>').join('')};
$('#ml').onclick=async e=>{const b=e.target.dataset.b;if(!b)return;const m=sets[e.target.dataset.s].beatmaps.find(x=>x.id==b);$('#mres').textContent='Считаю…';
const MODS=['','HD','HR','DT','HDDT','HDHR'],ACC=[95,98,99,100],A=await Promise.all(MODS.map(x=>api(`osu?a=attr&id=${b}&mods=${x}`)));
$('#mres').innerHTML=`<div class="prof">${image(mapCover(sets[e.target.dataset.s]),'team-image','Обложка карты')}<div><b>${esc(m.version)}</b><div class="dim">BPM ${f(m.bpm)} · ${f(m.difficulty_rating,2)}★ · приближённый расчёт PP, фулл-комбо</div></div></div><table><tr><th>Моды${ACC.map(a=>`<th>${a}%`).join('')}</tr>`+MODS.map((x,i)=>`<tr><td>${x||'NM'}`+(A[i].attributes?ACC.map(a=>`<td>${f(pp(A[i].attributes,m,a,x.includes('HD')))}`).join(''):'<td colspan="4">—')+'</tr>').join('')+'</table>'};
