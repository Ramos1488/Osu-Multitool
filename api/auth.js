const L=require('./_lib');
module.exports=async(req,res)=>{
  const a=req.query.a,redirect=L.BASE_URL+'/api/auth?a=callback';
  if(a==='login')return res.redirect('https://osu.ppy.sh/oauth/authorize?'+new URLSearchParams({client_id:L.ID,redirect_uri:redirect,response_type:'code',scope:'identify public'}));
  if(a==='callback'){
    const t=await fetch('https://osu.ppy.sh/oauth/token',{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify({client_id:+L.ID,client_secret:L.SEC,code:req.query.code,grant_type:'authorization_code',redirect_uri:redirect})}).then(r=>r.json());
    if(!t.access_token)return res.status(400).send('auth failed');
    const me=await fetch('https://osu.ppy.sh/api/v2/me/osu',{headers:{Authorization:'Bearer '+t.access_token}}).then(r=>r.json());
    const st=me.statistics||{};
    await L.sb('users?on_conflict=osu_id',{method:'POST',headers:{Prefer:'resolution=merge-duplicates'},body:JSON.stringify({osu_id:me.id,username:me.username,country:me.country_code,pp:st.pp,global_rank:st.global_rank,last_login:new Date()})});
    res.setHeader('Set-Cookie','s='+L.makeSession({id:me.id,u:me.username})+'; Path=/; HttpOnly; Secure; SameSite=Lax; Max-Age=2592000');
    return res.redirect('/');
  }
  if(a==='logout'){res.setHeader('Set-Cookie','s=; Path=/; Max-Age=0');return res.redirect('/')}
  res.json(L.readSession(req));
};
