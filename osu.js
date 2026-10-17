const L=require('./_lib');
const periods={day:1,week:7,month:30,year:365};
const userCache=new Map();
async function hydrateRecentUsers(scores){
  const ids=[...new Set(scores.slice(0,25).filter(score=>score.user_id&&(!score.user?.username||!score.user?.country_code)).map(score=>String(score.user_id)))];
  const results=await Promise.allSettled(ids.map(async id=>{
    const cached=userCache.get(id);
    if(cached&&cached.expiresAt>Date.now())return;
    const user=await L.osu(`/users/${encodeURIComponent(id)}/osu`);
    if(user?.id)userCache.set(id,{user,expiresAt:Date.now()+3600000});
    else userCache.set(id,{user:null,expiresAt:Date.now()+60000});
  }));
  results.forEach((result,index)=>{
    if(result.status==='rejected'){
      userCache.set(ids[index],{user:null,expiresAt:Date.now()+60000});
    }
  });
  for(const score of scores){
    const cached=userCache.get(String(score.user_id));
    if(cached?.user){
      const liveUser=score.user||{};
      score.user={
        ...cached.user,...liveUser,
        username:liveUser.username||cached.user.username,
        country_code:liveUser.country_code||cached.user.country_code,
        country:liveUser.country||cached.user.country
      };
    }
  }
  return scores.slice(0,25).filter(score=>!score.user?.username||!score.user?.country_code).length;
}
const recordScore=s=>{
  const beatmap=s.beatmap||{},set=s.beatmapset||{},user=s.user||{};
  const date=s.created_at||s.ended_at;
  if(!s.id||!s.user_id||!s.beatmap_id||!date||!user.username)return null;
  return{
    score_id:s.id,osu_id:s.user_id,username:user.username,country_code:user.country_code||null,
    beatmap_id:s.beatmap_id,beatmapset_id:set.id||beatmap.beatmapset_id||null,
    beatmap_title:set.title||beatmap.title||null,beatmap_version:beatmap.version||null,
    beatmap_cover:set.covers?.list||set.covers?.['list@2x']||(set.id||beatmap.beatmapset_id?`https://assets.ppy.sh/beatmaps/${set.id||beatmap.beatmapset_id}/covers/list.jpg`:null),
    pp:s.pp??null,accuracy:s.accuracy??null,rank:s.rank||null,
    mods:Array.isArray(s.mods)?s.mods:[],score_date:date
  };
};
module.exports=async(req,res)=>{
  const q=req.query;let d;
  try{
    switch(q.a){
      case 'user':d=await L.osu(q.id?`/users/${+q.id}/osu`:`/users/${encodeURIComponent(q.u)}/osu?key=username`);break;
      case 'best':d=await L.osu(`/users/${+q.id}/scores/best?mode=osu&limit=100`);break;
      case 'rank':{
        const t=q.type==='team'?'team':q.type==='country'?'country':'performance';
        d=await L.osu(`/rankings/osu/${t}?${t==='performance'&&/^[A-Za-z]{2}$/.test(q.country||'')?'country='+q.country+'&':''}cursor[page]=${+q.page||1}`);break;
      }
      case 'countries':{
        const list=[];
        for(let p=1;p<=10;p++){
          const r=await L.osu('/rankings/osu/country?cursor[page]='+p),rk=r.ranking||[];
          rk.forEach(x=>list.push({code:x.code||x.country?.code,name:x.name||x.country?.name}));
          if(rk.length<50)break;
        }
        d={list};break;
      }
      case 'scores':{
        const response=await L.osu('/scores?ruleset=osu');
        const scores=Array.isArray(response)?response:Array.isArray(response.scores)?response.scores:[];
        const profileLookupFailures=await hydrateRecentUsers(scores);
        let trackingError=null;
        if(L.SBURL&&L.SBKEY){
          const rows=scores.map(recordScore).filter(Boolean);
          if(rows.length){
            const saved=await L.sb('live_scores?on_conflict=score_id',{method:'POST',headers:{Prefer:'resolution=merge-duplicates'},body:JSON.stringify(rows)});
            if(!saved)trackingError='Supabase request did not return a response';
            else if(!saved.ok)trackingError=`Supabase rejected score tracking (HTTP ${saved.status})`;
          }
        }else trackingError='Configure Supabase and run schema.sql to enable score rankings';
        d={scores,trackingError,profileLookupFailures};break;
      }
      case 'top_scores':{
        const period=String(q.period||'week'),country=String(q.country||'');
        if(period!=='all'&&!Object.hasOwn(periods,period))return res.status(400).json({error:'Invalid period'});
        if(country&&!/^[A-Za-z]{2}$/.test(country))return res.status(400).json({error:'Invalid country code'});
        if(!L.SBURL||!L.SBKEY)return res.status(503).json({error:'Configure Supabase and run schema.sql to enable score rankings'});
        const query=new URLSearchParams({select:'*',order:'pp.desc.nullslast,score_date.desc',limit:'50'});
        if(country)query.set('country_code',`eq.${country.toUpperCase()}`);
        if(period!=='all')query.set('score_date',`gte.${new Date(Date.now()-periods[period]*86400000).toISOString()}`);
        const result=await L.sb(`live_scores?${query.toString()}`);
        if(!result)return res.status(502).json({error:'Supabase request did not return a response'});
        if(!result.ok)return res.status(502).json({error:`Supabase score query failed (HTTP ${result.status}): ${await result.text()}`});
        d={scores:await result.json(),period,country:country.toUpperCase()||null};
        break;
      }
      case 'beatmap':d=await L.osu(`/beatmaps/${+q.id}`);break;
      case 'set':d=await L.osu(`/beatmapsets/${+q.id}`);break;
      case 'search':d=await L.osu('/beatmapsets/search?q='+encodeURIComponent(q.q||''));break;
      case 'attr':d=await L.osu(`/beatmaps/${+q.id}/attributes`,{method:'POST',body:JSON.stringify({mods:(q.mods||'').match(/../g)||[],ruleset:'osu'})});break;
      case 'savebpm':{
        const s=L.readSession(req);if(!s)return res.status(401).json({error:'login'});
        await L.sb('bpm_tests',{method:'POST',body:JSON.stringify({osu_id:s.id,bpm:+q.bpm,keys:String(q.keys||'').slice(0,8)})});
        return res.json({ok:1});
      }
      default:return res.status(400).json({error:'bad action'});
    }
  }catch(e){return res.status(500).json({error:String(e)})}
  res.setHeader('Cache-Control',q.a==='countries'?'s-maxage=86400':q.a==='top_scores'?'s-maxage=30, stale-while-revalidate=60':'s-maxage=5, stale-while-revalidate=30');
  res.json(d);
};
