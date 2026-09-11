/** Explicit synthetic fixture only; parent command must deny network. */
import {Client} from '../vendor/gbrain/node_modules/@modelcontextprotocol/sdk/dist/esm/client/index.js';
import {StdioClientTransport} from '../vendor/gbrain/node_modules/@modelcontextprotocol/sdk/dist/esm/client/stdio.js';
import {readFileSync,writeFileSync,existsSync,unlinkSync,realpathSync,lstatSync,renameSync,symlinkSync,mkdirSync} from 'node:fs';
import {resolve,join,dirname} from 'node:path';
import {spawnSync} from 'node:child_process';
import {strict as assert} from 'node:assert';
import {randomUUID} from 'node:crypto';
const root=realpathSync(resolve(import.meta.dir,'..'));
const resultFile=realpathSync(process.argv[2]||'missing-explicit-fixture-result');
assert(resultFile.startsWith(root+'/.work/gbrain-method-sync-') && resultFile.endsWith('/result.json'));
const fixture=JSON.parse(readFileSync(resultFile,'utf8')),base=dirname(resultFile);
for (const path of [fixture.state,fixture.vault,fixture.resources]) assert(realpathSync(path).startsWith(base+'/'));
assert(fixture.personal_profiles===false && fixture.real_codex===false);
const profile=join(fixture.state,'gbrain/profile');
const env={PATH:'/usr/bin:/bin',HOME:profile,TMPDIR:join(profile,'tmp'),GBRAIN_HOME:profile,GBRAIN_HOOKS:'0',ORACLE_RECEIPT_DIR:join(fixture.state,'events')};
const binary=join(fixture.resources,'engine/oracle-gbrain-read');assert(!lstatSync(binary).isSymbolicLink());
const transport=new StdioClientTransport({command:binary,args:['--mcp'],env,stderr:'pipe'});
const client=new Client({name:'oracle-worker4-synthetic',version:'1'},{capabilities:{}});
const passed:string[]=[];let diagnostics='';
transport.stderr?.on('data',chunk=>{diagnostics=(diagnostics+String(chunk)).slice(-6000)});
function check(name:string,condition:unknown){assert(condition,name);passed.push(name);console.log('PASS '+name)}
async function call(name:string,args:Record<string,unknown>={}){
 const value=await client.callTool({name,arguments:args});assert(!value.isError,`${name}: ${JSON.stringify(value.content)}\n${diagnostics}`);return value;
}
function read(request:unknown){
 const value=spawnSync(binary,[],{env,cwd:base,input:JSON.stringify(request),encoding:'utf8',timeout:45000});
 assert.equal(value.status,0,value.stderr);const result=JSON.parse(value.stdout);assert(result.ok);return result.value;
}
const slug='people/fixture-'+randomUUID(),memoryRoot=join(fixture.vault,'INBOX/oracle-memory');
try {
 await client.connect(transport);
 const {tools}=await client.listTools();
 check('MCP handshake exposes only reviewed deterministic operations',tools.length===13 && !tools.some(t=>['think','synthesize','query','submit_agent','extract_facts','dream','embed'].includes(t.name)));
 await call('put_page',{slug,content:'---\ntitle: Pessoa Sintetica\ntype: person\n---\n# Pessoa Sintetica\n\nEntidade criada explicitamente para o teste isolado.'});
 const remembered=await call('remember',{fact:'A pessoa sintética prefere exemplos curtos.',provenance:'worker4:literal-synthetic-fixture',entity:slug,kind:'preference',ttl:'3d'});
 const details=JSON.parse((remembered.content as any[]).find(c=>c.type==='text').text);
 const page=join(memoryRoot,slug+'.md');
 check('official remember writes its fact through to canonical Markdown',existsSync(page)&&readFileSync(page,'utf8').includes('prefere exemplos curtos'));
 check('official fact TTL preserved',!!details.valid_until);
 const fetched=await call('get_page',{slug,include_content:true});
 check('MCP page read-back verifies the canonical entity',JSON.stringify(fetched).includes('Entidade criada explicitamente'));
 const recalled=await call('recall',{entity:slug,query:'exemplos curtos'});
 check('recall operates without an embedding provider',JSON.stringify(recalled).includes('exemplos curtos'));
 const search=await call('search',{query:'updated'});
 check('read-only federation reaches the derived vault',JSON.stringify(search).includes('alpha'));
 const ui=read({operation:'search',source:'oracle-vault',query:'updated',owned:true});
 check('idle MCP connection releases the PGLite writer lock',JSON.stringify(ui).includes('alpha'));
 const sync=read({operation:'index',source:'oracle-vault',root:fixture.vault});
 check('MCP memory updates do not duplicate into derived index',sync.complete&&sync.no_op&&read({operation:'get',source:'oracle-vault',slug,owned:true})===null);
 const concurrent=await Promise.all([call('get_page',{slug}),call('get_page',{slug})]);
 check('concurrent MCP calls serialize one engine owner',concurrent.length===2);
 const unsupported=await client.callTool({name:'dream',arguments:{}});
 check('inference/executor tool rejected',unsupported.isError===true);
 const traversal=await client.callTool({name:'put_page',arguments:{slug:'../escaped',content:'# Must not be written\n'}});
 check('canonical memory path traversal refused',traversal.isError===true&&!existsSync(join(fixture.vault,'INBOX/escaped.md')));
 const dotenv=join(profile,'.gbrain/.env');assert(!existsSync(dotenv));
 try {
  writeFileSync(dotenv,'# synthetic sentinel: never read credentials\n',{mode:0o600});
  const denied=await client.callTool({name:'search',arguments:{query:'updated'}});
  check('secret-bearing profiles refused before credential discovery',denied.isError===true);
 } finally {unlinkSync(dotenv)}
 const configFile=join(profile,'.gbrain/config.json'),original=readFileSync(configFile);
 try {
  const changed=JSON.parse(original.toString());changed.chat_model='fixture-not-a-provider';writeFileSync(configFile,JSON.stringify(changed));
  const denied=await client.callTool({name:'search',arguments:{query:'updated'}});
  check('additional model configuration fails closed',denied.isError===true);
 } finally {writeFileSync(configFile,original)}
 const outside=join(base,'unauthorized-memory-target'),saved=memoryRoot+'-saved';mkdirSync(outside);
 renameSync(memoryRoot,saved);symlinkSync(outside,memoryRoot);
 try {
  const denied=await client.callTool({name:'put_page',arguments:{slug:'guarded',content:'# Guarded fixture\n'}});
  check('changed canonical memory target refused',denied.isError===true&&!existsSync(join(outside,'guarded.md')));
 } finally {unlinkSync(memoryRoot);renameSync(saved,memoryRoot)}
 await call('get_page',{slug});check('MCP recovers after refused configuration changes',true);
 const result={checks:passed.length,passed,fixture:base,network:'denied by caller sandbox',real_codex:false,personal_profiles:false,model_inference:false};
 writeFileSync(join(base,'mcp-result.json'),JSON.stringify(result,null,2));console.log(JSON.stringify(result,null,2));
} finally {await client.close()}
