function pp(a,m,acc,hd){acc/=100;const n=m.count_circles+m.count_sliders+m.count_spinners,nc=Math.max(1,m.count_circles),od=a.overall_difficulty,ar=a.approach_rate;
const L=.95+.4*Math.min(1,n/2000)+(n>2000?Math.log10(n/2000)*.5:0),B=d=>(5*Math.max(1,d/.0675)-4)**3/1e5;
const arF=ar>10.33?.3*(ar-10.33):ar<8?.05*(8-ar):0,h=hd?1+.04*(12-ar):1;
const aim=B(a.aim_difficulty)*L*(1+arF*L)*h*acc*(.98+od*od/2500);
const sp=B(a.speed_difficulty)*L*(1+arF*L)*h*(.95+od*od/750)*acc**((14.5-Math.max(od,8))/2);
const ba=Math.max(0,1-(1-acc)*n/nc),ac=1.52163**od*ba**24*2.83*Math.min(1.15,(nc/1000)**.3)*(hd?1.08:1);
return 1.14*(aim**1.1+sp**1.1+ac**1.1)**(1/1.1)}
let sets=[];
$('#ms').onclick=async()=>{
  const query=$('#mq').value.trim();
  if(!query){$('#ml').innerHTML=`<div class="card dim">${t('mapSearch')}</div>`;return}
  $('#ml').innerHTML=`<div class="card dim">${t('loadingMaps')}</div>`;
  const d=await api('osu?a=search&q='+encodeURIComponent(query));
  if(d.error){sets=[];$('#ml').innerHTML=`<div class="card dim">${esc(d.error||t('mapsError'))}</div>`;return}
  sets=Array.isArray(d.beatmapsets)?d.beatmapsets:[];
  if(!sets.length){$('#ml').innerHTML=`<div class="card dim">${t('noMaps')}</div>`;return}
  $('#ml').innerHTML=sets.slice(0,15).map((set,i)=>{
    const beatmaps=Array.isArray(set.beatmaps)?set.beatmaps.filter(map=>map.mode==='osu'):[];
    return `<div class="card map-card"><span class="cover">${image(mapCover(set),'beatmap-cover',set.title||t('cover'))}</span><div><b>${esc(set.artist||'')} — ${esc(set.title||'')}</b><div class="dim">${esc(set.creator||'')}</div><div class="row" style="margin:10px 0 0">${beatmaps.map(map=>`<button data-s="${i}" data-b="${encodeURIComponent(map.id)}">${esc(map.version||t('difficulty'))} · ${f(map.difficulty_rating,2)}★</button>`).join(' ')}</div></div></div>`;
  }).join('');
};
$('#ml').onclick=async e=>{
  const button=e.target.closest('button[data-b]');
  if(!button)return;
  const set=sets[Number(button.dataset.s)],map=set?.beatmaps?.find(item=>String(item.id)===decodeURIComponent(button.dataset.b));
  if(!map){$('#mres').textContent=t('mapLoadError');return}
  $('#mres').textContent=t('calculating');
  const MODS=['','HD','HR','DT','HDDT','HDHR'],ACC=[95,98,99,100];
  const attributes=await Promise.all(MODS.map(mod=>api(`osu?a=attr&id=${encodeURIComponent(map.id)}&mods=${mod}`)));
  if(attributes.some(result=>result.error||!result.attributes)){
    $('#mres').textContent=t('mapLoadError');return;
  }
  const header=`<tr><th>${t('mods')}${ACC.map(acc=>`<th>${acc}%`).join('')}</tr>`;
  const rows=MODS.map((mod,i)=>`<tr><td>${mod||'NM'}`+ACC.map(acc=>`<td>${f(pp(attributes[i].attributes,map,acc,mod.includes('HD')))}`).join('')+'</tr>').join('');
  $('#mres').innerHTML=`<div class="prof">${image(mapCover(set),'team-image',t('cover'))}<div><b>${esc(map.version||t('difficulty'))}</b><div class="dim">${t('bpm')} ${f(map.bpm)} · ${f(map.difficulty_rating,2)}★ · ${t('approxPP')}</div></div></div><div class="table-scroll"><table>${header}${rows}</table></div>`;
};
