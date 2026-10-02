import {spawn} from 'node:child_process';
import {readFileSync,existsSync} from 'node:fs';
import {dirname,resolve,extname,sep,posix} from 'node:path';
import {fileURLToPath} from 'node:url';
import {createInterface} from 'node:readline';

const root=dirname(fileURLToPath(import.meta.url));
const runtime=resolve(root,'runtime/Oracle.app');
const executable=process.env.ORACLE_DESKTOP_EXECUTABLE || resolve(runtime,'Contents/MacOS/Oracle');
const web=process.env.ORACLE_DESKTOP_WEB_ROOT || resolve(runtime,'Contents/Resources/web');
const resourceURI='ui://oracle/workspace';
const mimeType='text/html;profile=mcp-app';
const uiMeta={ui:{resourceUri:resourceURI,visibility:['app','model']},'openai/outputTemplate':resourceURI,'openai/ui':{entrypoints:[{type:'global'},{type:'thread'}]}};
let native;let nextID=0;let inputEnded=false;let hostWritable=true;const pending=new Map();
function sendHost(value){if(hostWritable)process.stdout.write(JSON.stringify(value)+"\n");}
process.stdout.on("error",error=>{hostWritable=false;if(error.code!=="EPIPE")process.stderr.write(error.message+"\n");});
function nativeCall(method,params={}) {
  if(inputEnded)throw new Error("O transporte foi encerrado antes de iniciar esta operação.");
  if(!native) {
    if(!existsSync(executable)) throw new Error('Runtime local do Oracle ausente. Reinstale o plugin completo.');
    const args=['--plugin-server'];if(process.env.ORACLE_DESKTOP_STATE) args.push('--state',process.env.ORACLE_DESKTOP_STATE);
    native=spawn(executable,args,{stdio:['pipe','pipe','inherit'],env:{...process.env,ORACLE_DESKTOP_PLUGIN_ROOT:root}});
    createInterface({input:native.stdout}).on('line',line=>{
      try {const reply=JSON.parse(line);const request=pending.get(reply.id);if(!request)return;pending.delete(reply.id);clearTimeout(request.timer);reply.error?request.reject(new Error(reply.error)):request.resolve(reply.value);}catch(error){process.stderr.write(`Oracle: resposta inválida: ${error.message}\n`);}
    });
    const fail=error=>{native=null;for(const request of pending.values()){clearTimeout(request.timer);request.reject(error)};pending.clear();};
    native.stdin.on('error',fail);native.on('error',fail);native.on('exit',(code,signal)=>fail(new Error(`Runtime Oracle encerrado (${signal||code}).`)));
  }
  if(pending.size>=128)throw new Error('Limite de operações simultâneas atingido.');
  return new Promise((resolve,reject)=>{const id=String(++nextID);const timer=setTimeout(()=>{pending.delete(id);reject(new Error('A operação Oracle não respondeu em 30 minutos. Confira seu estado antes de repetir a ação.'));},30*60*1000);timer.unref();pending.set(id,{resolve,reject,timer});native.stdin.write(JSON.stringify({id,method,params})+'\n',error=>{if(error){clearTimeout(timer);pending.delete(id);reject(error);}});});
}
function localFile(path) {const file=resolve(web,path.split(/[?#]/)[0]);if(!file.startsWith(resolve(web)+sep))throw new Error('Recurso fora do pacote.');return file;}
function dataURI(path) {
  if(/^(data:|https?:|#|blob:)/.test(path))return path;
  const mime={'.png':'image/png','.svg':'image/svg+xml','.jpg':'image/jpeg','.jpeg':'image/jpeg','.webp':'image/webp','.woff2':'font/woff2','.woff':'font/woff','.ttf':'font/ttf'}[extname(path)]||'application/octet-stream';
  return `data:${mime};base64,${readFileSync(localFile(path)).toString('base64')}`;
}
function resourceHTML() {
  const nonce='oracle-desktop-resource';
  let html=readFileSync(localFile('index.html'),'utf8');
  html=html.replace(/<meta[^>]*http-equiv="Content-Security-Policy"[^>]*>/i,`<meta http-equiv="Content-Security-Policy" content="default-src 'none'; script-src 'nonce-${nonce}'; style-src 'unsafe-inline'; img-src data: blob:; font-src data:; connect-src 'none'; object-src 'none'; base-uri 'none'">`);
  html=html.replace(/<link\s+rel="stylesheet"\s+href="([^"]+)"\s*>/g,(_,path)=>{
    const css=readFileSync(localFile(path),'utf8').replace(/url\((["']?)([^)'"\s]+)\1\)/g,(match,quote,asset)=>{
      if(/^(data:|https?:|#)/.test(asset))return match;
      return `url("${dataURI(posix.join(posix.dirname(path),asset))}")`;
    });return `<style nonce="${nonce}">${css.replace(/<\/style/gi,'<\\/style')}</style>`;
  });
  html=html.replace(/(<img\b[^>]*\bsrc=")([^"]+)(")/g,(_,before,path,after)=>before+dataURI(path)+after);
  const dynamicAssets=Object.fromEntries(Array.from({length:6},(_,i)=>`gallery/metallic-${String(i+1).padStart(2,'0')}.webp`).map(path=>[path,dataURI(path)]));
  html=html.replace('</head>',`<script nonce="${nonce}">window.OracleBundledAsset=(()=>{const assets=Object.freeze(${JSON.stringify(dynamicAssets)});return path=>assets[path]||path;})();</script></head>`);
  html=html.replace(/<script\s+src="([^"]+)"\s*><\/script>/g,(_,path)=>{
    let script=readFileSync(localFile(path),'utf8');
    if(path==='library-gallery.js') {
      const expression="`gallery/metallic-${String(variant).padStart(2,'0')}.webp`";
      if(!script.includes(expression))throw new Error('A referência dinâmica das capas mudou; revise o empacotamento do recurso.');
      script=script.replace(expression,`window.OracleBundledAsset(${expression})`);
    }
    return `<script nonce="${nonce}">${script.replace(/(?:brand|portraits)\/[A-Za-z0-9_.-]+\.(?:png|svg|jpg|jpeg|webp)/g,asset=>dataURI(asset)).replace(/<\/script/gi,'<\\/script')}</script>`;
  });
  return html;
}
let pluginUpdateCache;let pluginUpdatePending;
async function pluginUpdateStatus(force=false) {
  if(!force&&pluginUpdateCache&&Date.now()-pluginUpdateCache.at<30_000)return pluginUpdateCache.value;
  if(pluginUpdatePending)return pluginUpdatePending;
  pluginUpdatePending=import('./update.mjs').then(module=>nativeCall('desktopPluginUpdateInfo',{}).then(info=>module.inspectPluginUpdate({pluginRoot:root,codexCommand:info.codexExecutable||undefined}))).catch(error=>({supported:false,available:false,message:error.message})).then(value=>{pluginUpdateCache={at:Date.now(),value};return value;}).finally(()=>{pluginUpdatePending=null;});
  return pluginUpdatePending;
}
async function dispatchNative(method,params) {
  if(method==='installOracleUpdate') {
    const admission=await nativeCall('desktopPluginUpdateAdmission',{});
    const module=await import('./update.mjs');
    const value=await module.applyPluginUpdate({pluginRoot:root,codexCommand:admission.codexExecutable||undefined,refreshMarketplace:false});
    pluginUpdateCache=null;
    return value;
  }
  const value=await nativeCall(method,params);
  if(method!=='updateStatus'||!value||typeof value!=='object')return value;
  const update=await pluginUpdateStatus();
  const row={id:'oracle',channel:'desktop-plugin',pluginUpdate:true,status:update.available?'install_available':update.supported?'current':'not_checked',version:update.latestVersion||update.currentVersion,installedVersion:update.currentVersion,message:update.message};
  const merged={...value,applicationUpdateAvailable:update.available===true,applicationUpdateAvailableNow:update.available===true};
  for(const key of ['results','lastVerifiedResults','pendingUpdates'])if(Array.isArray(value[key]))merged[key]=[row,...value[key].filter(item=>item.id!=='oracle')];
  if(!merged.results)merged.results=[row];
  const pending=(value.pendingUpdates||[]).filter(item=>item.id!=='oracle');
  merged.pendingUpdates=update.available?[row,...pending]:pending;
  merged.knownUpdate=update.available===true||pending.some(item=>['available','compatibility_required','upstream_available','install_available','download_available','publication_pending'].includes(item.status));
  return merged;
}
function result(value,meta={}) {return {content:[{type:'text',text:JSON.stringify(value)}],structuredContent:{value},_meta:meta};}
async function request(method,params={}) {
  switch(method) {
    case 'initialize': return {protocolVersion:(['2026-01-26','2025-11-25','2025-06-18','2025-03-26','2024-11-05'].includes(params.protocolVersion)?params.protocolVersion:'2025-11-25'),capabilities:{tools:{},resources:{}},serverInfo:{name:'oracle-desktop',title:'Oracle System',version:'1.0.0'}};
    case 'ping':return {};
    case 'tools/list':return {tools:[
      {name:'oracle_open',description:'Abrir o Oracle no Codex para explorar o vault, notas, skills e configuração local.',inputSchema:{type:'object',properties:{},additionalProperties:false},_meta:uiMeta},
      {name:'oracle_dispatch',description:'Executar uma ação da interface Oracle usando o runtime local e seus gates de autorização.',inputSchema:{type:'object',properties:{method:{type:'string',maxLength:80},params:{type:'object'}},required:['method'],additionalProperties:false},_meta:{ui:{visibility:['app']}}}
    ]};
    case 'tools/call': {
      try {
        if(params.name==='oracle_open')return result({ready:true},uiMeta);
        if(params.name!=='oracle_dispatch')throw new Error('Ferramenta desconhecida.');
        const input=params.arguments||{};
        if(typeof input.method!=='string'||input.method.length>80||input.params&&(typeof input.params!=='object'||Array.isArray(input.params)))throw new Error('Pedido Oracle inválido.');
        return result(await dispatchNative(input.method,input.params||{}));
      }catch(error){return {content:[{type:'text',text:error.message}],isError:true};}
    }
    case 'resources/list':return {resources:[{uri:resourceURI,name:'Oracle System',mimeType,_meta:{ui:{prefersBorder:false}}}]};
    case 'resources/read':if(params.uri!==resourceURI)throw new Error('Recurso desconhecido.');return {contents:[{uri:resourceURI,mimeType,text:resourceHTML(),_meta:{ui:{prefersBorder:false,csp:{connectDomains:[],resourceDomains:[]}}}}]};
    default:throw Object.assign(new Error('Método MCP desconhecido.'),{code:-32601});
  }
}
const input=createInterface({input:process.stdin,crlfDelay:Infinity});
input.on('line',line=>{
  let message;try{if(Buffer.byteLength(line)>4_000_000)throw new Error('Pedido excede 4 MB.');message=JSON.parse(line);}catch(error){sendHost({jsonrpc:'2.0',id:null,error:{code:-32700,message:error.message}});return;}
  if(message.id===undefined)return;
  request(message.method,message.params).then(value=>sendHost({jsonrpc:'2.0',id:message.id,result:value}),error=>sendHost({jsonrpc:'2.0',id:message.id,error:{code:error.code||-32603,message:error.message}}));
});
function closeNativeInput(){if(inputEnded)return;inputEnded=true;native?.stdin.end();}
input.on('close',closeNativeInput);
for(const signal of ['SIGINT','SIGTERM'])process.on(signal,()=>{input.close();closeNativeInput();});
