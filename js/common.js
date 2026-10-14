const $=s=>document.querySelector(s),api=p=>fetch('/api/'+p).then(r=>r.json()),f=(n,d=0)=>(+n).toLocaleString('ru',{maximumFractionDigits:d});
const mn=x=>x.acronym||x,tot=l=>l.reduce((s,p,i)=>s+p*.95**i,0),desc=(a,b)=>b-a;
const PAGES=[['index','Live'],['ranking','Рейтинг'],['calc','PP'],['bpm','BPM тест'],['maps','Карты']];
$('#nav').innerHTML=PAGES.map(([p,t])=>`<a href="${p==='index'?'/':p+'.html'}" class="${p===$('#nav').dataset.active?'on':''}">${t}</a>`).join('');
let me;
const authReady=api('auth').then(s=>{me=s;$('#login').innerHTML=s?`${s.u} · <a href="/api/auth?a=logout">выйти</a>`:'<a href="/api/auth?a=login">Войти через osu!</a>';return s});
