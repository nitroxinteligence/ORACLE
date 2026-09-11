/** Real pinned SDK/stdio test, invoked only by test-mcp-offline.py in its sandbox. */
import {Client} from '../vendor/gbrain/node_modules/@modelcontextprotocol/sdk/dist/esm/client/index.js';
import {StdioClientTransport} from '../vendor/gbrain/node_modules/@modelcontextprotocol/sdk/dist/esm/client/stdio.js';
import {readFileSync,writeFileSync,existsSync,realpathSync,readdirSync} from 'node:fs';
import {resolve,join,relative} from 'node:path';
import {spawnSync} from 'node:child_process';
import {createHash} from 'node:crypto';

const root=resolve(import.meta.dir,'..'),fixture=resolve(process.argv[2]||'');
if(!fixture.startsWith(join(root,'.work/mcp-protocol')+'/')||realpathSync(fixture)!==fixture||
   readFileSync(join(fixture,'fixture-marker'),'utf8')!=='oracle-mcp-protocol\n')throw Error('Explicit isolated fixture required');
const adapter=join(fixture,'engine/oracle-gbrain-read'),profile=join(fixture,'state/gbrain/profile'),vault=join(fixture,'vault');
const sandbox=['-p','(version 1)(allow default)(deny network*)'];
const env={PATH:'/usr/bin:/bin:/usr/sbin:/sbin',HOME:join(fixture,'home'),TMPDIR:join(fixture,'tmp'),
 GBRAIN_HOME:profile,GBRAIN_HOOKS:'0',GBRAIN_SKIP_UPDATE_CHECK:'1',DATABASE_URL:'',GBRAIN_DATABASE_URL:'',
 ORACLE_RECEIPT_DIR:join(fixture,'state/events'),DO_NOT_TRACK:'1'};
const checks:Array<{name:string,pass:boolean,details?:unknown}>=[];
const completedSections:string[]=[],protocolErrors:string[]=[],calls:unknown[]=[],pids:number[]=[];
let client:Client,transport:StdioClientTransport,stderr='',failure:unknown,finished=false,readerCount=0;
let remembered:any,canonical='',catalog:any,initialPid:number|null=null;
const allowed=['remember','recall','entity','context_pack','delta','forget','search','get_page','list_pages','get_links','get_backlinks','traverse_graph','put_page'].sort();
const slug='people/protocol-fixture',fact='The synthetic fixture prefers concise examples.';
const provenance='oracle-mcp-offline:synthetic-literal';
const hash=(bytes:Buffer|string)=>createHash('sha256').update(bytes).digest('hex');
const text=(response:any)=>response.content?.filter((c:any)=>c.type==='text').map((c:any)=>c.text).join('\n')||'';
const body=(response:any)=>JSON.parse(response.content[0].text);
function check(name:string,pass:unknown,details?:unknown){
 // Snapshot evidence now (especially PID arrays), not by a mutable reference
 // that a later reconnect could silently alter in the final report.
 const row={name,pass:!!pass,...(details===undefined?{}:{details:JSON.parse(JSON.stringify(details))})};checks.push(row);
 console.error((row.pass?'PASS ':'FAIL ')+name);
 return row.pass;
}
async function section(name:string,run:()=>Promise<void>){
 try{await run();}catch(error){check(name+' completes without an infrastructure exception',false,String(error));}
 completedSections.push(name);
}
function read(input:Record<string,unknown>){
 const stem=join(fixture,'calls','reader-'+String(++readerCount).padStart(2,'0'));
 writeFileSync(stem+'-input.json',JSON.stringify(input,null,2)+'\n');
 const result=spawnSync('/usr/bin/sandbox-exec',[...sandbox,adapter],{
  env,cwd:join(fixture,'workspace'),input:JSON.stringify(input),encoding:'utf8',timeout:40000,maxBuffer:4000000});
 writeFileSync(stem+'.log',result.stdout+'\nSTDERR\n'+result.stderr);
 if(result.error)throw result.error;
 const line=result.stdout.split('\n').filter(line=>line.startsWith('{')).at(-1);
 if(!line)throw Error('Adapter did not return bounded JSON: '+result.stderr.slice(-1000));
 const response=JSON.parse(line);
 if((result.status===0)!==!!response.ok)throw Error('Adapter exit status disagrees with JSON');
 return response;
}
function official(args:string[]){
 const stem=join(fixture,'calls','official-'+String(++readerCount).padStart(2,'0'));
 writeFileSync(stem+'-args.json',JSON.stringify(args,null,2)+'\n');
 const result=spawnSync('/usr/bin/sandbox-exec',[...sandbox,join(fixture,'engine/gbrain'),...args],{
  env,cwd:join(fixture,'workspace'),encoding:'utf8',timeout:40000,maxBuffer:4000000});
 writeFileSync(stem+'.log',result.stdout+'\nSTDERR\n'+result.stderr);
 if(result.error)throw result.error;
 if(result.status!==0)throw Error('Official fixture CLI failed: '+result.stderr.slice(-1000));
}
function markdownFiles(directory=vault):string[]{
 return readdirSync(directory,{withFileTypes:true}).filter(e=>!e.name.startsWith('.')).flatMap(e=>{
  const path=join(directory,e.name);return e.isDirectory()?markdownFiles(path):e.isFile()&&e.name.endsWith('.md')?[relative(vault,path)]:[];
 }).sort();
}
function index(){return read({operation:'index',source:'oracle-vault',root:vault,files:markdownFiles(),scan_complete:true,budget_ms:30000,generation:checks.length});}
async function connect(){
 client=new Client({name:'oracle-offline-protocol-fixture',version:'1'},{capabilities:{}});
 transport=new StdioClientTransport({command:'/usr/bin/sandbox-exec',args:[...sandbox,adapter,'--mcp'],env,stderr:'pipe',cwd:join(fixture,'workspace')});
 transport.stderr?.on('data',(chunk:Buffer)=>{if(stderr.length<100000)stderr+=chunk.toString().slice(0,100000-stderr.length);});
 client.onerror=error=>protocolErrors.push(String(error));
 await client.connect(transport);
 if(transport.pid)pids.push(transport.pid);
}
async function tool(name:string,args:Record<string,unknown>={}){
 // A transport exception is never treated as an expected tool rejection.
 const result=await client.callTool({name,arguments:args},undefined,{timeout:40000});
 calls.push({name,argumentKeys:Object.keys(args),argumentBytes:Buffer.byteLength(JSON.stringify(args)),
  argumentSHA256:hash(JSON.stringify(args)),result});
 return result;
}
async function denied(name:string,args:Record<string,unknown>,message:RegExp){
 const result=await tool(name,args);
 return {ok:result.isError===true&&message.test(text(result)),result};
}
function alive(pid:number){try{process.kill(pid,0);return true;}catch(error){if((error as NodeJS.ErrnoException).code==='ESRCH')return false;throw error;}}
async function close(){
 if(client)await client.close();
 for(let n=0;n<100&&pids.some(alive);n++)await new Promise(resolve=>setTimeout(resolve,50));
}
try{
 await section('handshake',async()=>{
  const seeded=index();if(!check('official adapter indexes a complete synthetic vault',seeded.ok&&seeded.value?.complete===true,seeded))throw Error('Initial index failed');
  await connect();initialPid=transport.pid;
  check('real pinned SDK completes stdio initialize',client.getServerVersion()?.name==='oracle-gbrain',client.getServerVersion());
  check('server negotiates the tools capability',!!client.getServerCapabilities()?.tools);
  catalog=await client.listTools();writeFileSync(join(fixture,'tool-schemas.json'),JSON.stringify(catalog,null,2)+'\n');
  check('exactly thirteen approved memory tools are exposed',JSON.stringify(catalog.tools.map((t:any)=>t.name).sort())===JSON.stringify(allowed));
  const get=catalog.tools.find((t:any)=>t.name==='get_page').inputSchema;
  check('get_page declares source_id and include_content in the pinned schema',get.properties.source_id?.type==='string'&&get.properties.include_content?.type==='boolean');
  check('tools advertise closed argument schemas',catalog.tools.every((t:any)=>t.inputSchema.additionalProperties===false));
  for(const name of ['think','submit_agent']){const r=await denied(name,{},/not enabled|unknown.tool/i);check(name+' is unavailable over the protocol',r.ok,r.result);}
 });
 if(!client?.getServerVersion())throw Error('Protocol initialization did not complete');
 await section('writes',async()=>{
  const created=await tool('put_page',{slug,content:'---\ntitle: Protocol Fixture\ntype: person\n---\n# Protocol Fixture\n\nExplicit synthetic entity.\n',source_kind:'synthetic-forgery',ingested_via:'synthetic-forgery'});
  if(!check('put_page succeeds with official canonical write-through',!created.isError&&body(created).write_through?.written===true,created))return;
  canonical=join(vault,'INBOX/oracle-memory',slug+'.md');
  check('put_page creates canonical Markdown in oracle-memory',existsSync(canonical)&&readFileSync(canonical,'utf8').includes('Protocol Fixture'));
  check('remote caller cannot forge canonical put_page provenance',readFileSync(canonical,'utf8').includes('mcp:put_page')&&!readFileSync(canonical,'utf8').includes('synthetic-forgery'));
  for(const [label,args,re] of [
   ['missing provenance',{fact,entity:slug},/invalid_params|provenance_required/],
   ['empty provenance',{fact,entity:slug,provenance:'   '},/provenance_required/],
   ['ISO duration TTL',{fact,entity:slug,provenance,ttl:'P3D'},/invalid_params/],
  ] as const){const r=await denied('remember',args,re);check('remember rejects '+label,r.ok,r.result);}
  const before=Date.now(),result=await tool('remember',{fact,entity:slug,kind:'preference',provenance,ttl:'3d'}),after=Date.now();
  if(!check('literal remember succeeds with a string id and entity receipt',!result.isError&&typeof body(result).id==='string'&&body(result).entity_slug===slug,result))return;
  remembered=body(result);const expiry=Date.parse(remembered.valid_until);
  check('3d TTL receipt is within the actual request interval',expiry>=before+3*86400000&&expiry<=after+3*86400000,remembered);
  check('keyless remember explicitly reports degraded embedding dedup',remembered.degraded_dedup===true);
  const md=readFileSync(canonical,'utf8');
  check('literal fact and provenance persist in canonical Markdown',md.includes(fact)&&md.includes(provenance));
  check('TTL persists in the pinned date-only Markdown fence',md.includes(remembered.valid_until.slice(0,10)));
  const recalled=await tool('recall',{entity:slug});
  const stored=!recalled.isError&&body(recalled).facts.find((f:any)=>f.fact_id===remembered.id);
  check('recall round-trips the fact and exact provenance',stored&&stored.fact===fact&&stored.provenance===provenance,recalled);
  check('recall returns the expiry derived from the date-only fence',stored&&stored.valid_until===remembered.valid_until.slice(0,10)+'T00:00:00.000Z',stored);
  const privateFact='PRIVATE_SYNTHETIC_FACT_MUST_NOT_LEAK';
  const privateResult=await tool('remember',{fact:privateFact,entity:slug,provenance,visibility:'private'});
  check('private synthetic fact exists canonically before privacy checks',!privateResult.isError&&readFileSync(canonical,'utf8').includes(privateFact),privateResult);
  const beforeRead=hash(readFileSync(canonical));
  const page=await tool('get_page',{slug,source_id:'oracle-memory',include_content:true});
  check('get_page include_content returns editable Markdown from the correct source',!page.isError&&body(page).source_id==='oracle-memory'&&body(page).content?.includes(fact),page);
  check('refreshing the derived memory page does not write canonical bytes',beforeRead===hash(readFileSync(canonical)));
  check('official remote privacy filtering still removes private fact rows',!page.isError&&!text(page).includes(privateFact),page);
  if(!page.isError){
   const edited=await tool('put_page',{slug,content:body(page).content+'\nProtocol edit roundtrip sentinel\n'});
   check('canonical get-edit-put succeeds without dropping remembered facts',!edited.isError&&readFileSync(canonical,'utf8').includes(fact)&&readFileSync(canonical,'utf8').includes('Protocol edit roundtrip sentinel'),edited);
   check('roundtrip preserves hidden private facts on disk',readFileSync(canonical,'utf8').includes(privateFact));
  }
  const external=read({operation:'status'});
  check('idle MCP releases PGLite for an independent UI reader',external.ok&&external.value.engine==='pglite');
  check('SDK server remains alive during independent database access',initialPid!==null&&alive(initialPid));
 });
 await section('scope',async()=>{
  const direct=read({operation:'get',source:'fixture-other',slug:'outside-sentinel'});
  check('the third source contains a real indexed synthetic sentinel',direct.ok&&direct.value?.source_id==='fixture-other'&&JSON.stringify(direct).includes('UNGRANTED_SENTINEL'));
  for(const [name,args] of [
   ['get_page',{slug:'outside-sentinel',source_id:'fixture-other'}],
   ['list_pages',{source_id:'fixture-other'}],
   ['search',{query:'UNGRANTED_SENTINEL',source_id:'fixture-other'}],
  ] as const){const r=await denied(name,args,/permission_denied|outside.*(?:grant|scope)|not.*allowed/i);check(name+' rejects an explicit ungranted source',r.ok,r.result);}
  const miss=await denied('get_page',{slug:'outside-sentinel'},/page_not_found/);
  check('unqualified get_page cannot see a third-source-only page',miss.ok,miss.result);
  for(const source of [undefined,'__all__']){
   const pages=await tool('list_pages',source?{source_id:source}:{});
   check((source||'unqualified')+' listing stays within the two approved sources',!pages.isError&&Array.isArray(body(pages))&&body(pages).length>0&&body(pages).every((p:any)=>['oracle-memory','oracle-vault'].includes(p.source_id)),pages);
  }
  const fresh=await tool('get_page',{slug:'protocol-note',source_id:'oracle-vault'});
  check('source selector resolves the allowed vault version of a colliding slug',!fresh.isError&&body(fresh).source_id==='oracle-vault'&&text(fresh).includes('Original protocol sentinel')&&!text(fresh).includes('UNGRANTED_SENTINEL'),fresh);
  const wrongWrite=await denied('put_page',{slug:'rejected-source-override',content:'# Never write this',source_id:'fixture-other'},/unknown.*param|invalid_params/i);
  check('a write cannot silently accept a source override absent from its schema',wrongWrite.ok&&!existsSync(join(vault,'INBOX/oracle-memory/rejected-source-override.md')),wrongWrite.result);
 });
 await section('limits',async()=>{
  const original=hash(readFileSync(join(vault,'protocol-note.md')));
  for(const path of ['../../escaped','nested/../escaped','/absolute-escape','nested\\escaped']){
   const r=await denied('put_page',{slug:path,content:'# Not allowed'},/invalid_params|invalid.*slug|traversal/i);
   check('official dispatch rejects traversal or invalid slug '+JSON.stringify(path),r.ok,r.result);
  }
  check('rejected paths preserve canonical files and do not escape the source',original===hash(readFileSync(join(vault,'protocol-note.md')))&&!existsSync(join(vault,'escaped.md'))&&!existsSync(join(fixture,'escaped.md')));
  const large=await denied('put_page',{slug:'oversized',content:'x'.repeat(500001)},/bounded input limit/);
  check('oversized ASCII write is rejected before canonical creation',large.ok&&!existsSync(join(vault,'INBOX/oracle-memory/oversized.md')),large.result);
  const unicode=await denied('get_page',{slug:'protocol-note',source_id:'oracle-vault',_meta:{pad:'界'.repeat(170000)}},/bounded input limit/);
  check('500 KB input bound counts UTF-8 bytes, not UTF-16 code units',unicode.ok,unicode.result);
  const invalid=await denied('put_page',{slug:'missing-content'},/invalid_params/);
  check('required schema arguments are validated by official dispatch',invalid.ok,invalid.result);
  official(['config','set','search.mcp_keyword_only','false']);
  try{
   const disabled=await denied('put_page',{slug:'disabled-policy-write',content:'# Never persist'},/Keyword-only policy changed; Oracle will not call an embedding provider/);
   check('DB-disabled keyword-only policy fails closed without writing Markdown',disabled.ok&&!existsSync(join(vault,'INBOX/oracle-memory/disabled-policy-write.md')),disabled.result);
  }finally{official(['config','set','search.mcp_keyword_only','true']);}
  const restored=await tool('list_pages',{});
  check('same SDK connection recovers after official DB policy is restored',!restored.isError);
 });
 await section('queue',async()=>{
  const burst=await Promise.all(Array.from({length:12},()=>tool('list_pages',{})));
  const busy=burst.filter(r=>r.isError&&text(r).includes('queue is full')).length,accepted=burst.filter(r=>!r.isError).length;
  check('twelve concurrent calls cannot exceed eight admitted requests',busy>=4&&accepted>0&&accepted<=8&&busy+accepted===12,{busy,accepted,total:burst.length});
  check('all admitted requests finish successfully after backpressure',burst.every(r=>!r.isError||text(r).includes('queue is full')));
  const resumed=await tool('list_pages',{});
  check('a real tool remains usable after queue drain',!resumed.isError);
  const external=read({operation:'status'});
  check('queue drain releases the DB to an independent process',external.ok);
 });
 await section('freshness',async()=>{
  const indexed=index();check('reindex includes memory-created canonical files while MCP is idle',indexed.ok&&indexed.value?.complete===true,indexed);
  const fresh=await tool('get_page',{slug:'protocol-note',source_id:'oracle-vault'});
  check('fresh derived get_page returns the verified original content',!fresh.isError&&body(fresh).freshness==='current_at_read'&&text(fresh).includes('Original protocol sentinel'),fresh);
  const hit=await tool('search',{query:'Original protocol sentinel',source_id:'oracle-vault'});
  check('keyword-only search actually retrieves the pre-edit vault note',!hit.isError&&text(hit).includes('protocol-note'),hit);
  writeFileSync(join(vault,'protocol-note.md'),'# Protocol note\n\nExternally edited protocol sentinel\n');
  const stale=await denied('get_page',{slug:'protocol-note',source_id:'oracle-vault'},/Canonical note changed|Derived index is stale/);
  check('MCP rejects a stale derived page after external canonical edit',stale.ok,stale.result);
  const staleSearch=await denied('search',{query:'Original protocol sentinel',source_id:'oracle-vault'},/Canonical note changed|Derived index is stale/);
  check('MCP rejects a keyword hit whose canonical file is stale',staleSearch.ok,staleSearch.result);
  check('stale rejection never overwrites the external edit',readFileSync(join(vault,'protocol-note.md'),'utf8').includes('Externally edited'));
  const repaired=index();check('complete reindex restores canonical freshness',repaired.ok&&repaired.value?.complete===true,repaired);
  const current=await tool('get_page',{slug:'protocol-note',source_id:'oracle-vault'});
  check('get_page returns the externally edited content after reindex',!current.isError&&body(current).freshness==='current_at_read'&&text(current).includes('Externally edited'),current);
 });
 await section('shutdown',async()=>{
  await close();check('SDK transport shutdown leaves no live server process',pids.every(pid=>!alive(pid)),{pids});
  const after=read({operation:'status'});check('shutdown releases the database without deleting lock files',after.ok);
 });
 await section('reconnect',async()=>{
  await connect();check('a fresh SDK transport reconnects with a new live process',transport.pid!==initialPid&&transport.pid!==null&&alive(transport.pid));
  const page=await tool('get_page',{slug,source_id:'oracle-memory',include_content:true});
  check('reconnected MCP reads the persisted canonical memory',!page.isError&&body(page).content?.includes(fact),page);
  const recalled=await tool('recall',{entity:slug});
  check('reconnect preserves fact id and provenance',!recalled.isError&&body(recalled).facts.some((f:any)=>f.fact_id===remembered?.id&&f.provenance===provenance),recalled);
  const pageNow=await tool('get_page',{slug:'protocol-note',source_id:'oracle-vault'});
  check('reconnect sees the reindexed external edit',!pageNow.isError&&text(pageNow).includes('Externally edited'),pageNow);
 });
 finished=true;
}catch(error){failure=String(error);console.error(failure);}
finally{
 try{await close();check('final cleanup stops every recorded SDK server',pids.every(pid=>!alive(pid)),{pids});}
 catch(error){check('final cleanup completes',false,String(error));failure??=String(error);}
 check('stdio contains no SDK protocol parse errors',protocolErrors.length===0,protocolErrors);
 writeFileSync(join(fixture,'mcp-stderr.log'),stderr);
 writeFileSync(join(fixture,'mcp-calls.json'),JSON.stringify(calls,null,2)+'\n');
 writeFileSync(join(fixture,'mcp-processes.json'),JSON.stringify(pids.map(pid=>({pid,alive:alive(pid)})),null,2)+'\n');
 const report={passed:checks.filter(c=>c.pass).length,failed:checks.filter(c=>!c.pass).length,failure,finished,completedSections,checks,
  scope:'Real pinned MCP SDK 1.29.0, stdio, compiled Oracle adapter, official GBrain/PGLite, synthetic three-source profile; no Codex, inference, Keychain or production app',
  limits:['Pinned fence TTL is persisted at UTC date granularity, not sub-day precision.','The 35-second forced deadline and cancellation while a DB operation is stuck are not fault-injected.','No other MCP client implementation, physical device, PostgreSQL, or production vault was tested.']};
 writeFileSync(join(fixture,'mcp-result.json'),JSON.stringify(report,null,2)+'\n');
 console.log(JSON.stringify(report,null,2));
 if(failure||report.failed||!finished)process.exitCode=1;
}
