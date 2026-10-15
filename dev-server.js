const fs=require('fs');
const http=require('http');
const path=require('path');

const root=__dirname;
const mimeTypes={
  '.css':'text/css; charset=utf-8',
  '.html':'text/html; charset=utf-8',
  '.ico':'image/x-icon',
  '.js':'text/javascript; charset=utf-8',
  '.json':'application/json; charset=utf-8',
  '.png':'image/png',
  '.svg':'image/svg+xml'
};

function loadLocalEnv(){
  const file=path.join(root,'.env');
  if(!fs.existsSync(file))return;
  for(const line of fs.readFileSync(file,'utf8').split(/\r?\n/)){
    const match=line.match(/^\s*([A-Za-z_][A-Za-z0-9_]*)\s*=\s*(.*?)\s*$/);
    if(!match||(process.env[match[1]]||'').trim())continue;
    let value=match[2];
    if((value.startsWith('"')&&value.endsWith('"'))||(value.startsWith("'")&&value.endsWith("'"))){
      value=value.slice(1,-1);
    }else{
      value=value.replace(/\s+#.*$/,'');
    }
    process.env[match[1]]=value;
  }
}

function sendJson(res,status,payload){
  res.statusCode=status;
  res.setHeader('Content-Type','application/json; charset=utf-8');
  res.end(JSON.stringify(payload));
}

function apiResponse(res){
  return{
    status(code){res.statusCode=code;return this},
    setHeader(name,value){res.setHeader(name,value)},
    json(payload){if(!res.writableEnded)sendJson(res,res.statusCode||200,payload)},
    send(payload){
      if(res.writableEnded)return;
      if(typeof payload==='string'&&!res.hasHeader('Content-Type'))res.setHeader('Content-Type','text/plain; charset=utf-8');
      res.end(payload);
    },
    redirect(url){
      if(res.writableEnded)return;
      res.statusCode=302;
      res.setHeader('Location',url);
      res.end();
    }
  };
}

async function handleApi(req,res,url){
  const endpoint=url.pathname.slice('/api/'.length).replace(/\.js$/,'');
  if(!/^[a-zA-Z0-9_-]+$/.test(endpoint)){
    sendJson(res,404,{error:'API endpoint not found'});
    return;
  }
  let handler;
  try{
    handler=require(path.join(root,'api',endpoint));
  }catch(error){
    if(error.code==='MODULE_NOT_FOUND'){
      sendJson(res,404,{error:'API endpoint not found'});
      return;
    }
    throw error;
  }
  const query=Object.fromEntries(url.searchParams.entries());
  await handler({method:req.method,headers:req.headers,query},apiResponse(res));
  if(!res.writableEnded)res.end();
}

function handleStatic(req,res,url){
  if(req.method!=='GET'&&req.method!=='HEAD'){
    sendJson(res,405,{error:'Method not allowed'});
    return;
  }
  let pathname;
  try{pathname=decodeURIComponent(url.pathname)}catch{
    sendJson(res,400,{error:'Invalid URL path'});
    return;
  }
  if(pathname==='/')pathname='/index.html';
  const file=path.resolve(root,'.'+pathname);
  if(file!==root&&!file.startsWith(root+path.sep)){
    sendJson(res,403,{error:'Forbidden'});
    return;
  }
  fs.stat(file,(statError,stat)=>{
    if(statError||!stat.isFile()){
      res.statusCode=404;
      res.setHeader('Content-Type','text/plain; charset=utf-8');
      res.end('Not found');
      return;
    }
    res.statusCode=200;
    res.setHeader('Content-Type',mimeTypes[path.extname(file).toLowerCase()]||'application/octet-stream');
    if(req.method==='HEAD'){res.end();return}
    fs.createReadStream(file).on('error',error=>{
      console.error('Static file error:',error.message);
      if(!res.headersSent)res.statusCode=500;
      res.end();
    }).pipe(res);
  });
}

loadLocalEnv();
const port=Number(process.env.PORT)||3000;
const host=process.env.HOST||'127.0.0.1';
const server=http.createServer(async(req,res)=>{
  let url;
  try{url=new URL(req.url,'http://localhost')}catch{
    sendJson(res,400,{error:'Invalid request URL'});
    return;
  }
  try{
    if(url.pathname.startsWith('/api/'))await handleApi(req,res,url);
    else handleStatic(req,res,url);
  }catch(error){
    console.error('Request failed:',error);
    if(!res.writableEnded)sendJson(res,500,{error:'Internal server error'});
  }
});

server.listen(port,host,()=>console.log(`osu!multitool running at http://${host}:${port}`));
