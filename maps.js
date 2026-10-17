// Visual preview is embedded from a third-party site (loaded only when the user clicks).
const PREVIEW_URL=id=>`https://preview.tryz.id.vn/?b=${encodeURIComponent(id)}`;
const MODS=['','HD','HR','DT','HDDT','HDHR'],ACC=[95,98,99,100];
function pp(a,m,acc,hd){acc/=100;const n=m.count_circles+m.count_sliders+m.count_spinners,nc=Math.max(1,m.count_circles),od=a.overall_difficulty,ar=a.approach_rate;
const L=.95+.4*Math.min(1,n/2000)+(n>2000?Math.log10(n/2000)*.5:0),B=d=>(5*Math.max(1,d/.0675)-4)**3/1e5;
const arF=ar>10.33?.3*(ar-10.33):ar<8?.05*(8-ar):0,h=hd?1+.04*(12-ar):1;
const aim=B(a.aim_difficulty)*L*(1+arF*L)*h*acc*(.98+od*od/2500);
const sp=B(a.speed_difficulty)*L*(1+arF*L)*h*(.95+od*od/750)*acc**((14.5-Math.max(od,8))/2);
const ba=Math.max(0,1-(1-acc)*n/nc),ac=1.52163**od*ba**24*2.83*Math.min(1.15,(nc/1000)**.3)*(hd?1.08:1);
return 1.14*(aim**1.1+sp**1.1+ac**1.1)**(1/1.1)}
const mmss=s=>`${Math.floor(s/60)}:${String(Math.round(s%60)).padStart(2,'0')}`;
let sets=[],cur=null,loadToken=0;

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
$('#mq').addEventListener('keydown',e=>{if(e.key==='Enter'){e.preventDefault();$('#ms').click()}});
$('#ml').onclick=e=>{
  const button=e.target.closest('button[data-b]');
  if(!button)return;
  const set=sets[Number(button.dataset.s)],map=set?.beatmaps?.find(item=>String(item.id)===decodeURIComponent(button.dataset.b));
  if(!map){$('#mres').textContent=t('mapLoadError');return}
  showMap(map,set);
};
$('#mres').onclick=e=>{
  const dsw=e.target.closest('.dsw');
  if(dsw&&cur){const map=cur.set.beatmaps.find(m=>String(m.id)===dsw.dataset.b);if(map)showMap(map,cur.set,true);return}
  if(e.target.closest('#vp-toggle')){
    const box=$('#vp'),btn=$('#vp-toggle');
    if(box.innerHTML){box.innerHTML='';btn.textContent=t('visualPreview')}
    else{box.innerHTML=`<iframe class="map-preview" src="${esc(PREVIEW_URL(cur.map.id))}" loading="lazy" allow="autoplay; fullscreen" title="${esc(t('visualPreview'))}"></iframe><p class="dim">${t('previewNote')}</p>`;btn.textContent=t('hidePreview')}
  }
};
async function showMap(map,set,keepScroll){
  const token=++loadToken;
  cur={map,set,attrs:null,acc:cur?.acc??97};
  $('#mres').className='card';
  $('#mres').innerHTML=`<p class="dim">${t('calculating')}</p>`;
  if(!keepScroll)$('#mres').scrollIntoView({behavior:'smooth',block:'start'});
  const results=await Promise.all(MODS.map(mod=>api(`osu?a=attr&id=${encodeURIComponent(map.id)}&mods=${mod}`)));
  if(token!==loadToken)return;
  cur.attrs=results.every(r=>r.attributes)?results.map(r=>r.attributes):null;
  render();
}
function render(){
  const {map,set,attrs}=cur,sid=set.id||map.beatmapset_id,mode0=attrs?.[0];
  const cover=set.covers?.cover||set.covers?.['cover@2x']||mapCover(set);
  const audio=set.preview_url?(set.preview_url.startsWith('//')?'https:'+set.preview_url:set.preview_url):`https://b.ppy.sh/preview/${encodeURIComponent(sid)}.mp3`;
  const diffs=(set.beatmaps||[]).filter(m=>m.mode==='osu');
  const stat=(v,l)=>`<div><b>${v}</b><span>${l}</span></div>`;
  const chip=x=>x?`<span class="chip">${x}</span>`:'';
  $('#mres').innerHTML=`<div class="map-hero" style="background-image:linear-gradient(#0d0d12b8,#15151cf5),url('${esc(cover)}')">
    <div class="map-hero-top"><span class="cover">${image(mapCover(set),'beatmap-cover',set.title||t('cover'))}</span><div><h3>${esc(set.title||'')}</h3><div class="dim">${esc(set.artist||'')} · ${t('mappedBy')} ${esc(set.creator||'')}</div><div class="chips">${chip(esc(map.version||''))}${chip(f(map.difficulty_rating,2)+t('stars'))}${chip(esc(set.status||map.status||''))}${chip(t('bpm')+' '+f(map.bpm))}${chip(map.total_length?mmss(map.total_length):'')}</div></div></div>
  </div>
  <div class="stats">${stat(f(map.cs,1),'CS')}${stat(f(map.ar,1),'AR')}${stat(f(map.accuracy,1),'OD')}${stat(f(map.drain,1),'HP')}${stat(f(map.count_circles),t('circles'))}${stat(f(map.count_sliders),t('sliders'))}${stat(mode0?f(mode0.max_combo)+'x':'—',t('maxCombo'))}</div>
  ${diffs.length>1?`<div class="row"><span class="dim">${t('difficulties')}</span>${diffs.map(m=>`<button class="dsw${m.id===map.id?' on':''}" data-b="${esc(m.id)}">${esc(m.version||'')} · ${f(m.difficulty_rating,2)}★</button>`).join('')}</div>`:''}
  <div class="row"><button id="vp-toggle">${t('visualPreview')}</button><a href="https://osu.ppy.sh/beatmaps/${encodeURIComponent(map.id)}" target="_blank" rel="noreferrer">${t('openOsu')} ↗</a></div>
  <div class="dim">${t('previewAudio')}</div><audio controls preload="none" src="${esc(audio)}"></audio>
  <div id="vp"></div>
  <div class="row" style="margin-top:18px"><label class="dim" for="cacc">${t('customAcc')}</label><input id="cacc" type="number" min="50" max="100" step="0.1" value="${esc(cur.acc)}" style="width:96px"></div>
  <div id="pp-table" class="table-scroll"></div>`;
  $('#cacc').oninput=()=>{cur.acc=Math.min(100,Math.max(50,Number($('#cacc').value)||97));renderPP()};
  renderPP();
}
function renderPP(){
  const {map,attrs,acc}=cur,box=$('#pp-table');
  if(!attrs){box.innerHTML=`<p class="dim">${t('mapLoadError')}</p>`;return}
  const cols=[...ACC,acc];
  box.innerHTML=`<p class="dim">${t('approxPP')}</p><table><tr><th>${t('mods')}<th>★${cols.map(a=>`<th>${f(a,1)}%`).join('')}</tr>`+MODS.map((mod,i)=>`<tr><td>${mod||'NM'}<td>${f(attrs[i].star_rating,2)}`+cols.map(a=>`<td>${f(pp(attrs[i],map,a,mod.includes('HD')))}`).join('')+'</tr>').join('')+'</table>';
}
// deep link: maps.html?b=BEATMAP_ID
(async()=>{
  const id=new URLSearchParams(location.search).get('b');
  if(!/^\d+$/.test(id||''))return;
  $('#mres').textContent=t('calculating');
  const map=await api('osu?a=beatmap&id='+id);
  if(!map||!map.id){$('#mres').textContent=map?.error||t('mapNotFound');return}
  let set=map.beatmapset||{};
  if(!set.beatmaps){const full=await api('osu?a=set&id='+encodeURIComponent(map.beatmapset_id));if(full&&full.id)set=full}
  showMap(map,set,true);
})();
