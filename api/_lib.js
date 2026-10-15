const crypto=require('crypto');
const env=k=>(process.env[k]||'').trim().replace(/^["']|["']$/g,'').trim();
const ID=env('OSU_CLIENT_ID'),SEC=env('OSU_CLIENT_SECRET'),SS=env('SESSION_SECRET')||'dev';
const SBURL=env('SUPABASE_URL')||env('NEXT_PUBLIC_SUPABASE_URL');
const SBKEY=env('SUPABASE_SERVICE_KEY')||env('SUPABASE_SERVICE_ROLE_KEY')||env('NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY');
const base=req=>env('BASE_URL').replace(/\/+$/,'')||'https://'+(req.headers['x-forwarded-host']||req.headers.host);
let tok={v:null,e:0};
async function token(){
  if(tok.v&&Date.now()<tok.e)return tok.v;
  const r=await fetch('https://osu.ppy.sh/oauth/token',{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify({client_id:+ID,client_secret:SEC,grant_type:'client_credentials',scope:'public'})}).then(r=>r.json());
  if(!r.access_token)throw new Error('osu token: '+JSON.stringify(r)+' (secretLen='+SEC.length+')');
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
const sb=async(path,opt={})=>{
  if(!SBURL||!SBKEY)return null;
  try{return await fetch(SBURL+'/rest/v1/'+path,{...opt,headers:{apikey:SBKEY,Authorization:'Bearer '+SBKEY,'Content-Type':'application/json',...(opt.headers||{})}})}catch{return null}
};
module.exports={osu,makeSession,readSession,sb,base,ID,SEC,SS,SBURL};
