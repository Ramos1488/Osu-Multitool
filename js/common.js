const $=s=>document.querySelector(s);
const TEXT={
  ru:{
    titleLive:'Live · osu!multitool',titleRankings:'Рейтинг · osu!multitool',titleProfile:'Профиль · osu!multitool',titleMaps:'Карты · osu!multitool',titlePP:'PP · osu!multitool',titleBpm:'BPM тест · osu!multitool',
    navLive:'Live',navRanking:'Рейтинг',navPP:'PP',navBpm:'BPM тест',navMaps:'Карты',
    searchPlayer:'Поиск игрока',language:'Язык',login:'Войти через osu!',logout:'выйти',homeLabel:'osu!multitool — главная',
    footerData:'Данные и изображения — osu!',liveTitle:'Live',liveDesc:'Новые результаты игроков osu! · обновление каждые 5 секунд',
    rankingTitle:'Рейтинг osu!',rankingDesc:'Игроки, команды и страны · данные официального osu! API',
    players:'Игроки',teams:'Команды',countries:'Страны',countryLabel:'Страна',world:'Весь мир',previous:'← Назад',next:'Дальше →',
    mapsTitle:'Карты',mapsDesc:'Найди карту в каталоге osu! и сравни PP с разными модами.',
    mapSearch:'Название карты или маппер',searchMaps:'Найти карты',selectDifficulty:'Выбери сложность, чтобы рассчитать PP',
    ppTitle:'Калькулятор PP',ppDesc:'Посмотри, как меняются pp, ранг и ценность нового результата.',
    username:'Ник osu!',load:'Загрузить',loadingPlayer:'Загружаю игрока…',playerNotFound:'Игрок не найден',
    rankTarget:'PP до нужного ранга',targetRank:'Целевой ранг',calculate:'Считать',
    ppMaster:'PP Master — что даст новый скор',newScorePP:'pp скора',ppRework:'PP реворк',
    ppReworkDesc:'Впиши новое pp для топ-50 или умножь все на коэффициент.',multiplyAll:'× ко всем',
    current:'Сейчас',newPP:'Новое pp',top50:'Топ-50',bpmTestTitle:'BPM тест',
    bpmTestDesc:'Проверь скорость нажатий и сравни её со своим привычным темпом.',
    chooseKeys:'Выбрать клавиши',pressKeys:'Нажми клавиши ({n})…',
    bpmHelp:'Нажми свою клавишу — тест стартует на 10 секунд. BPM = нажатия/сек × 15 (1/4 бита).',
    result:'Результат',presses:'нажатий',worldRank:'Мир',countryRank:'Страна',pp:'PP',
    accuracy:'Точность',plays:'Плеи',hours:'ч',playTime:'Время',avgTopBpm:'Средний BPM топ-100',
    openProfile:'Открыть профиль osu! ↗',ppCalculator:'PP калькулятор',topPlays:'Лучшие результаты',
    map:'Карта',mods:'Моды',bpm:'BPM',scorePP:'PP',cover:'Обложка карты',mapper:'Маппер',
    difficulty:'Сложность',approxPP:'приближённый расчёт PP, фулл-комбо',loadingProfile:'Загрузка профиля…',
    noScores:'Лучших результатов пока нет.',failedLoad:'Не удалось загрузить профиль.',
    rankColumn:'#',player:'Игрок',countryColumn:'Страна',members:'Участники',noData:'Нет данных',
    accuracyColumn:'Точность',playsColumn:'Плеи',countryPlayers:'Игроки',
    noRankData:'Не удалось загрузить рейтинг.',selectPlayer:'Сначала загрузи игрока.',
    enterValidRank:'Укажи корректный ранг.',rankUnavailable:'Не удалось получить данные для этого ранга.',
    invalidScorePP:'Укажи корректное значение pp.',
    needMore:'Нужно ещё',scoreGain:'Прибавка',newTotal:'итого',top50Change:'Топ-50',
    rankNeeded:'Нужно ещё {pp} pp до ранга #{rank} ({player}).',
    gainResult:'Прибавка: +{pp} pp · {total} pp всего',
    rankReworkResult:'{label}: {old} → {new} ({change} pp)',
    loadingMaps:'Ищу карты…',mapsError:'Не удалось загрузить карты.',noMaps:'Карты не найдены.',
    calculating:'Считаю…',mapLoadError:'Не удалось рассчитать PP для карты.',
    pressToStart:'Нажми выбранную клавишу, чтобы начать тест.',
    liveError:'Не удалось загрузить Live-результаты.',rankError:'Ошибка загрузки',
    premium:'Команда',countryUnknown:'Страна не указана',
    apiInvalidResponse:'Некорректный ответ API (HTTP {status}).',apiRequestFailed:'Запрос API завершился ошибкой (HTTP {status}).',networkError:'Ошибка сети'
  },
  en:{
    titleLive:'Live · osu!multitool',titleRankings:'Rankings · osu!multitool',titleProfile:'Profile · osu!multitool',titleMaps:'Beatmaps · osu!multitool',titlePP:'PP · osu!multitool',titleBpm:'BPM test · osu!multitool',
    navLive:'Live',navRanking:'Rankings',navPP:'PP',navBpm:'BPM test',navMaps:'Beatmaps',
    searchPlayer:'Search player',language:'Language',login:'Sign in with osu!',logout:'log out',homeLabel:'osu!multitool — home',
    footerData:'Data and images by osu!',liveTitle:'Live',liveDesc:'New osu! player scores · refreshes every 5 seconds',
    rankingTitle:'osu! Rankings',rankingDesc:'Players, teams and countries · official osu! API data',
    players:'Players',teams:'Teams',countries:'Countries',countryLabel:'Country',world:'Global',previous:'← Previous',next:'Next →',
    mapsTitle:'Beatmaps',mapsDesc:'Find a beatmap in the osu! catalogue and compare PP across mods.',
    mapSearch:'Beatmap title or mapper',searchMaps:'Search beatmaps',selectDifficulty:'Select a difficulty to calculate PP',
    ppTitle:'PP calculator',ppDesc:'See how PP, rank and a new score’s value could change.',
    username:'osu! username',load:'Load',loadingPlayer:'Loading player…',playerNotFound:'Player not found',
    rankTarget:'PP needed for a rank',targetRank:'Target rank',calculate:'Calculate',
    ppMaster:'PP Master — value of a new score',newScorePP:'Score PP',ppRework:'PP rework',
    ppReworkDesc:'Enter new PP values for your top 50 scores or multiply them by a factor.',multiplyAll:'× all',
    current:'Current',newPP:'New PP',top50:'Top 50',bpmTestTitle:'BPM test',
    bpmTestDesc:'Test your tapping speed and compare it to your usual tempo.',
    chooseKeys:'Choose keys',pressKeys:'Press keys ({n})…',
    bpmHelp:'Press your selected key to start the 10-second test. BPM = taps/sec × 15 (quarter beats).',
    result:'Result',presses:'taps',worldRank:'Global',countryRank:'Country',pp:'PP',
    accuracy:'Accuracy',plays:'Plays',hours:'hrs',playTime:'Play time',avgTopBpm:'Average top-100 BPM',
    openProfile:'Open osu! profile ↗',ppCalculator:'PP calculator',topPlays:'Top scores',
    map:'Beatmap',mods:'Mods',bpm:'BPM',scorePP:'PP',cover:'Beatmap cover',mapper:'Mapper',
    difficulty:'Difficulty',approxPP:'approximate PP calculation, full combo',loadingProfile:'Loading profile…',
    noScores:'No top scores yet.',failedLoad:'Could not load the profile.',
    rankColumn:'#',player:'Player',countryColumn:'Country',members:'Members',noData:'No data',
    accuracyColumn:'Accuracy',playsColumn:'Plays',countryPlayers:'Players',
    noRankData:'Could not load rankings.',selectPlayer:'Load a player first.',
    enterValidRank:'Enter a valid rank.',rankUnavailable:'Could not get data for that rank.',
    invalidScorePP:'Enter a valid PP value.',
    needMore:'More needed',scoreGain:'Gain',newTotal:'total',top50Change:'Top 50',
    rankNeeded:'You need {pp} more pp for rank #{rank} ({player}).',
    gainResult:'Gain: +{pp} pp · {total} pp total',
    rankReworkResult:'{label}: {old} → {new} ({change} pp)',
    loadingMaps:'Searching beatmaps…',mapsError:'Could not load beatmaps.',noMaps:'No beatmaps found.',
    calculating:'Calculating…',mapLoadError:'Could not calculate PP for this beatmap.',
    pressToStart:'Press a selected key to start the test.',
    liveError:'Could not load live scores.',rankError:'Loading error',
    premium:'Team',countryUnknown:'Country not set',
    apiInvalidResponse:'Invalid API response (HTTP {status}).',apiRequestFailed:'API request failed (HTTP {status}).',networkError:'Network error'
  }
};
let language=localStorage.getItem('osu-multitool-language');
if(language!=='en'&&language!=='ru')language='ru';
const t=(key,vars={})=>Object.entries(vars).reduce((s,[k,v])=>s.replaceAll('{'+k+'}',v),TEXT[language][key]||TEXT.ru[key]||key);
const api=async path=>{
  try{
    const response=await fetch('/api/'+path),body=await response.text();
    let data;
    try{data=JSON.parse(body)}catch{return{error:t('apiInvalidResponse',{status:response.status})}}
    if(!response.ok)return{error:data?.error||t('apiRequestFailed',{status:response.status})};
    return data;
  }catch(error){return{error:`${t('networkError')}: ${String(error)}`}}
};
const f=(n,d=0)=>Number.isFinite(Number(n))?Number(n).toLocaleString(language==='en'?'en-US':'ru-RU',{maximumFractionDigits:d}):'—';
const mn=x=>x.acronym||x,tot=l=>l.reduce((s,p,i)=>s+p*.95**i,0),desc=(a,b)=>b-a;
const bpmMul=m=>m.some(x=>/DT|NC/.test(mn(x)))?1.5:m.some(x=>/HT|DC/.test(mn(x)))?.75:1;
const esc=x=>String(x??'').replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
const flag=c=>c&&c.length===2?String.fromCodePoint(...[...c.toUpperCase()].map(x=>127397+x.charCodeAt(0))):'';
const flagImg=c=>c&&/^[a-z]{2}$/i.test(c)?`<img class="flag" src="https://osu.ppy.sh/images/flags/${c.toUpperCase()}.png" alt="${esc(c)}" loading="lazy">`:'';
const mapCover=s=>s?.covers?.list||s?.covers?.['list@2x']||s?.covers?.cover||'';
const image=(url,cls,alt='')=>url?`<img class="${cls}" src="${esc(url)}" alt="${esc(alt)}" loading="lazy">`:'';
const countries=()=>api('osu?a=countries').then(d=>{const dn=new Intl.DisplayNames([language==='en'?'en':'ru'],{type:'region'});
  return (d.list||[]).filter(c=>c.code).map(c=>{let n;try{n=dn.of(c.code)}catch{}return{code:c.code,name:n&&n!==c.code?n:c.name}}).sort((a,b)=>a.name.localeCompare(b.name,language==='en'?'en':'ru'))});
const PAGES=[['index','navLive'],['ranking','navRanking'],['calc','navPP'],['bpm','navBpm'],['maps','navMaps']];
$('#nav').innerHTML=PAGES.map(([p,key])=>`<a href="${p==='index'?'/':p+'.html'}" class="${p===$('#nav').dataset.active?'on':''}">${t(key)}</a>`).join('');
$('#hs input').placeholder=t('searchPlayer');
$('#hs input').setAttribute('aria-label',t('searchPlayer'));
$('#hs').onsubmit=e=>{e.preventDefault();const v=$('#hs input').value.trim();if(v)location='profile.html?u='+encodeURIComponent(v)};
const languageControl=document.createElement('label');
languageControl.className='language-switch';
languageControl.innerHTML=`<span class="sr-only">${t('language')}</span><select id="language" aria-label="${t('language')}"><option value="ru">RU</option><option value="en">EN</option></select>`;
$('#login').before(languageControl);
$('#language').value=language;
$('#language').onchange=()=>{localStorage.setItem('osu-multitool-language',$('#language').value);location.reload()};
document.documentElement.lang=language;
if($('#cc'))$('#cc').setAttribute('aria-label',t('countryLabel'));
document.querySelectorAll('[data-i18n]').forEach(el=>el.textContent=t(el.dataset.i18n));
document.querySelectorAll('[data-i18n-placeholder]').forEach(el=>el.placeholder=t(el.dataset.i18nPlaceholder));
document.querySelectorAll('[data-i18n-aria]').forEach(el=>el.setAttribute('aria-label',t(el.dataset.i18nAria)));
let me;
const authReady=api('auth').then(s=>{me=s&&!s.error?s:null;$('#login').innerHTML=me?`<a href="profile.html?id=${encodeURIComponent(me.id)}">${esc(me.u)}</a> · <a href="/api/auth?a=logout" class="dim">${t('logout')}</a>`:`<a href="/api/auth?a=login">${t('login')}</a>`;return me});
