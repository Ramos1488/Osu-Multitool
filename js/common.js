const $=s=>document.querySelector(s);
const TEXT={
  ru:{
    titleLive:'Live · osu!multitool',titleRankings:'Рейтинг · osu!multitool',titleProfile:'Профиль · osu!multitool',titleMaps:'Карты · osu!multitool',titlePP:'PP · osu!multitool',titleBpm:'BPM тест · osu!multitool',
    navLive:'Live',navRanking:'Рейтинг',navPP:'PP',navBpm:'BPM тест',navMaps:'Карты',
    searchPlayer:'Поиск игрока',language:'Язык',login:'Войти через osu!',logout:'выйти',homeLabel:'osu!multitool — главная',
    footerCredit:'Maded by',privacyLink:'Конфиденциальность',termsLink:'Условия',legalNav:'Юридическая информация',
    notAffiliated:'Не связан с osu!. Данные предоставлены',licensed:'лицензия',
    nonCommercial:'Этот проект некоммерческий.',liveTitle:'Live',liveDesc:'Новые результаты игроков osu! · обновление каждые 5 секунд',
    topScores:'Лучшие скоры',period:'Период',scope:'Регион',allTime:'Всё время',day:'День',week:'Неделя',month:'Месяц',year:'Год',
    worldwide:'Весь мир',country:'Страна',scoreTime:'Время',noTrackedScores:'Пока нет сохранённых результатов для этого периода.',
    trackingSetup:'Чтобы накапливать топ-скоры, настрой Supabase и выполни schema.sql. Сбор начинается после настройки.',
    trackingSince:'Сохраняются Live-скоры, замеченные сайтом после включения истории.',
    profileDataMissing:'Не для всех игроков удалось загрузить страну и профиль.',
    scoreTrackingError:'Не удалось сохранить Live-результаты:',
    scoreLoadError:'Не удалось загрузить топ-результаты:',
    privacyTitle:'Политика конфиденциальности',privacyUpdated:'Последнее обновление: 15 октября 2026 г.',
    privacyIntro:'В этой политике описано, какие данные обрабатывает osu!multitool и зачем.',
    privacyAccountTitle:'Вход и данные аккаунта',privacyAccount:'При входе через osu! сайт получает публичный профиль и сохраняет osu! ID, имя пользователя, страну, PP, мировой ранг и время последнего входа в Supabase. Для поддержания входа устанавливается подписанная cookie с osu! ID и именем пользователя (HttpOnly, Secure, SameSite=Lax; срок — до 30 дней).',
    privacyScoresTitle:'Результаты и тест BPM',privacyScores:'Live-результаты, которые сайт получает от osu!, могут сохраняться в Supabase для рейтинга по периоду и стране. Сохраняются osu! ID и имя игрока, страна, карта, PP, точность, моды и дата результата. Для авторизованных пользователей также сохраняются введённые в BPM-тесте нажатия клавиш и результат BPM.',
    privacyThirdPartyTitle:'Сторонние сервисы',privacyThirdParty:'Сайт запрашивает публичные данные и изображения у osu! и использует osu! OAuth для входа. Приложение размещается на Vercel, а серверные данные хранятся в Supabase. Эти сервисы обрабатывают запросы в соответствии со своими условиями и политиками.',
    privacyRetentionTitle:'Хранение и выбор пользователя',privacyRetention:'Данные хранятся в базе проекта и не удаляются автоматически по установленному сроку. Удалить сохранённые данные можно, обратившись к владельцу сайта; выход из аккаунта удаляет cookie входа в браузере, но не удаляет записи из базы.',
    privacyContactTitle:'Контакты',privacyContact:'По вопросам о данных и их удалении свяжитесь с владельцем через профиль osu! ниже.',
    termsTitle:'Условия использования',termsUpdated:'Последнее обновление: 15 октября 2026 г.',
    termsIntro:'Используя osu!multitool, вы соглашаетесь с этими условиями.',
    termsUnofficialTitle:'Неофициальный проект',termsUnofficial:'osu!multitool не связан, не одобрен и не поддерживается osu! или ppy Pty Ltd. Названия и данные osu! принадлежат соответствующим правообладателям.',
    termsDataTitle:'Данные и доступность',termsData:'Информация и результаты загружаются из osu! и предоставляются «как есть». Возможны задержки, ошибки и перерывы в работе; расчёты PP на картах являются приблизительными. Не используйте сайт как единственный источник критически важной информации.',
    termsUsageTitle:'Использование сайта',termsUsage:'Не нарушайте работу сайта, не злоупотребляйте API и не используйте сервис для незаконной деятельности. Вход осуществляется через osu! OAuth; пароль osu! сайту не передаётся.',
    termsLicenseTitle:'Лицензия и некоммерческое использование',termsLicense:'Проект распространяется по лицензии',termsLicenseExtra:'Сайт является некоммерческим. Использование данных osu! также регулируется условиями и лицензиями их источников.',
    termsChangesTitle:'Изменения условий',termsChanges:'Условия могут обновляться вместе с функциями сайта. Продолжая пользоваться сайтом после публикации изменений, вы принимаете обновлённую версию.',
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
    footerCredit:'Maded by',privacyLink:'Privacy',termsLink:'Terms',legalNav:'Legal information',
    notAffiliated:'Not affiliated with osu!. Contains data from',licensed:'licensed',
    nonCommercial:'This project is non-commercial.',liveTitle:'Live',liveDesc:'New osu! player scores · refreshes every 5 seconds',
    topScores:'Top scores',period:'Period',scope:'Region',allTime:'All time',day:'Day',week:'Week',month:'Month',year:'Year',
    worldwide:'Worldwide',country:'Country',scoreTime:'Time',noTrackedScores:'No saved scores for this period yet.',
    trackingSetup:'Set up Supabase and run schema.sql to collect top scores. Collection starts after setup.',
    trackingSince:'Shows Live scores observed by this site after score tracking is enabled.',
    profileDataMissing:'Could not load country/profile details for every player.',
    scoreTrackingError:'Could not save Live scores:',
    scoreLoadError:'Could not load top scores:',
    privacyTitle:'Privacy Policy',privacyUpdated:'Last updated: October 15, 2026.',
    privacyIntro:'This policy explains what data osu!multitool processes and why.',
    privacyAccountTitle:'Sign-in and account data',privacyAccount:'When you sign in with osu!, the site receives your public profile and stores your osu! ID, username, country, PP, global rank, and last sign-in time in Supabase. A signed cookie containing your osu! ID and username keeps you signed in (HttpOnly, Secure, SameSite=Lax; expires after up to 30 days).',
    privacyScoresTitle:'Scores and BPM test',privacyScores:'Live scores received from osu! may be stored in Supabase to provide rankings by period and country. Stored fields include osu! ID and username, country, beatmap, PP, accuracy, mods, and score date. For signed-in users, the BPM test also stores the selected key presses and BPM result.',
    privacyThirdPartyTitle:'Third-party services',privacyThirdParty:'The site requests public data and images from osu! and uses osu! OAuth for sign-in. The app is hosted on Vercel and server-side data is stored in Supabase. These services process requests under their own terms and privacy policies.',
    privacyRetentionTitle:'Storage and your choices',privacyRetention:'Data is stored in the project database and is not automatically deleted on a fixed schedule. Contact the site owner through the osu! profile below to request deletion. Signing out removes the sign-in cookie from your browser but does not delete database records.',
    privacyContactTitle:'Contact',privacyContact:'For questions about data or deletion, contact the site owner through the osu! profile below.',
    termsTitle:'Terms of Service',termsUpdated:'Last updated: October 15, 2026.',
    termsIntro:'By using osu!multitool, you agree to these terms.',
    termsUnofficialTitle:'Unofficial project',termsUnofficial:'osu!multitool is not affiliated with, endorsed by, or supported by osu! or ppy Pty Ltd. osu! names and data belong to their respective owners.',
    termsDataTitle:'Data and availability',termsData:'Information and scores are retrieved from osu! and provided “as is”. Delays, errors, and interruptions may occur; beatmap PP calculations are approximate. Do not rely on this site as the sole source for critical information.',
    termsUsageTitle:'Use of the site',termsUsage:'Do not disrupt the site, abuse APIs, or use the service for unlawful activity. Sign-in uses osu! OAuth; your osu! password is not shared with this site.',
    termsLicenseTitle:'License and non-commercial use',termsLicense:'This project is distributed under the',termsLicenseExtra:'The site is non-commercial. Use of osu! data is also subject to the terms and licenses of its sources.',
    termsChangesTitle:'Changes to these terms',termsChanges:'These terms may be updated as site features change. Continued use after changes are published means you accept the updated terms.',
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
const countryName=c=>{if(!c||!/^[a-z]{2}$/i.test(c))return'';try{return new Intl.DisplayNames([language==='en'?'en':'ru'],{type:'region'}).of(c.toUpperCase())||c.toUpperCase()}catch{return c.toUpperCase()}};
const mapCover=s=>s?.covers?.list||s?.covers?.['list@2x']||s?.covers?.cover||(s?.id||s?.beatmapset_id?`https://assets.ppy.sh/beatmaps/${encodeURIComponent(s.id||s.beatmapset_id)}/covers/list.jpg`:'');
const image=(url,cls,alt='')=>url?`<img class="${cls}" src="${esc(url)}" alt="${esc(alt)}" loading="lazy">`:'';
const countries=()=>api('osu?a=countries').then(d=>{if(d.error)throw new Error(d.error);const dn=new Intl.DisplayNames([language==='en'?'en':'ru'],{type:'region'});
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
