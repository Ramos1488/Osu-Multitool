const crypto=require('crypto');
const {OSU_CLIENT_ID:ID,OSU_CLIENT_SECRET:SEC,SESSION_SECRET:SS,BASE_URL}=process.env;
let tok={v:null,e:0};
async function token(){
  if(tok.v&&Date.now()<tok.e)return tok.v;
  const r=await fetch('https://osu.ppy.sh/oauth/token',{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify({client_id:+ID,client_secret:SEC,grant_type:'client_credentials',scope:'public'})}).then(r=>r.json());
  tok={v:r.access_token,e:Date.now()+(r.expires_in-60)*1000};return tok.v;
}
async function osu(path,opt={}){
  const r=await fetch('https://osu.ppy.sh/api/v2'+path,{...opt,headers:{Authorization:'Bearer '+await token(),'Content-Type':'application/json',Accept:'application/json'}});
  return r.json();
}
const sign=s=>crypto.createHmac('sha256',SS).update(s).digest('base64url');
const makeSession=o=>{const b=Buffer.from(JSON.stringify(o)).toString('base64url');return b+'.'+sign(b)};
const readSession=req=>{
  const m=(req.headers.cookie||'').match(/(?:^|; )s=([^;]+)/);if(!m)return null;
  const [b,g]=m[1].split('.');if(g!==sign(b))return null;
  try{return JSON.parse(Buffer.from(b,'base64url'))}catch{return null}
};
const sb=(path,opt={})=>fetch(process.env.SUPABASE_URL+'/rest/v1/'+path,{...opt,headers:{apikey:process.env.SUPABASE_SERVICE_KEY,Authorization:'Bearer '+process.env.SUPABASE_SERVICE_KEY,'Content-Type':'application/json',...(opt.headers||{})}});
module.exports={osu,makeSession,readSession,sb,ID,SEC,BASE_URL};
