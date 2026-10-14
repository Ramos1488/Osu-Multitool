const L=require('./_lib');
module.exports=async(req,res)=>{
  const q=req.query;let d;
  try{
    switch(q.a){
      case 'user':d=await L.osu(`/users/${encodeURIComponent(q.u)}/osu?key=username`);break;
      case 'best':d=await L.osu(`/users/${+q.id}/scores/best?mode=osu&limit=100`);break;
      case 'rank':d=await L.osu(`/rankings/osu/performance?${/^[A-Za-z]{2}$/.test(q.country||'')?'country='+q.country+'&':''}cursor[page]=${+q.page||1}`);break;
      case 'scores':d=await L.osu('/scores?ruleset=osu');break;
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
  res.setHeader('Cache-Control','s-maxage=5, stale-while-revalidate=30');
  res.json(d);
};
