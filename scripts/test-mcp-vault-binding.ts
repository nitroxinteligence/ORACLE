/** Focused real MCP/PGLite regression; synthetic vaults only, no provider calls. */
import {Client} from '../vendor/gbrain/node_modules/@modelcontextprotocol/sdk/dist/esm/client/index.js';
import {StdioClientTransport} from '../vendor/gbrain/node_modules/@modelcontextprotocol/sdk/dist/esm/client/stdio.js';
import {mkdirSync,readFileSync,writeFileSync,renameSync,existsSync,readdirSync,realpathSync} from 'node:fs';
import {join,resolve} from 'node:path';
import {spawnSync} from 'node:child_process';
import {createHash,randomUUID} from 'node:crypto';
const repo=resolve(import.meta.dir,'..'),fixture=resolve(process.argv[2]||'');
if(!fixture.startsWith(join(repo,'.work/mcp-vault-binding')+'/')||realpathSync(fixture)!==fixture)throw Error('Explicit synthetic test root required');
const active=join(fixture,'state/gbrain/profile'),epochFile=join(fixture,'state/gbrain/vault-epoch.json');
const hash=(bytes:Buffer|string)=>createHash('sha256').update(bytes).digest('hex');
const env={PATH:'/usr/bin:/bin:/usr/sbin:/sbin',HOME:join(fixture,'home'),TMPDIR:join(fixture,'tmp'),GBRAIN_HOME:active,GBRAIN_SKIP_UPDATE_CHECK:'1',GBRAIN_HOOKS:'0',DO_NOT_TRACK:'1'};
const rows:Array<{name:string,pass:boolean}>=[],clients:Client[]=[],pids:number[]=[];
function check(name:string,pass:unknown){rows.push({name,pass:!!pass});console.error((pass?'PASS ':'FAIL ')+name);if(!pass)throw Error(name)}
function epoch(){return existsSync(epochFile)?readFileSync(epochFile):Buffer.alloc(0)}
function grant(vault:string){return {...env,ORACLE_MCP_VAULT:vault,ORACLE_MCP_EPOCH_SHA256:hash(epoch())}}
function initialize(vault:string){
 mkdirSync(active,{recursive:true});mkdirSync(join(vault,'INBOX/oracle-memory'),{recursive:true});
 for(const args of [['init','--pglite','--no-embedding'],['sources','add','oracle-vault','--name','Synthetic derived'],['sources','add','oracle-memory','--path',join(vault,'INBOX/oracle-memory'),'--name','Synthetic memory','--force'],['config','set','search.mcp_keyword_only','true']]){
  const r=spawnSync('/usr/bin/sandbox-exec',['-p','(version 1)(allow default)(deny network*)',join(fixture,'engine/gbrain'),...args],{env,cwd:fixture,encoding:'utf8',timeout:60000,maxBuffer:1000000});if(r.status!==0)throw Error(r.stderr);
 }
 writeFileSync(join(active,'oracle-owned.json'),JSON.stringify({owner:'OracleCompanion',schema_version:2,vault_root:vault}));
}
async function connect(environment:Record<string,string>){
 const client=new Client({name:'vault-binding-fixture',version:'1'},{capabilities:{}}),transport=new StdioClientTransport({command:'/usr/bin/sandbox-exec',args:['-p','(version 1)(allow default)(deny network*)',join(fixture,'engine/adapter'),'--mcp'],env:environment,cwd:fixture,stderr:'pipe'});
 transport.stderr?.on('data',()=>{});await client.connect(transport);clients.push(client);if(transport.pid)pids.push(transport.pid);return client;
}
async function write(client:Client,slug:string){return client.callTool({name:'put_page',arguments:{slug,content:'# Synthetic binding sentinel\n\n'+slug}},undefined,{timeout:40000})}
async function refusal(client:Client,slug:string){const r=await write(client,slug);return r.isError===true&&/vault|binding|revision/.test(JSON.stringify(r))}
function switchTo(vault:string,archive:string,restore?:string){
 // Same directory transition shape and epoch change as the product; this
 // focused fixture does not claim to exercise native selectVault itself.
 writeFileSync(epochFile,JSON.stringify({id:randomUUID()}));renameSync(active,archive);
 if(restore)renameSync(restore,active);else initialize(vault);
}
let failure:string|undefined;
try{
 mkdirSync(join(fixture,'state/gbrain'),{recursive:true});mkdirSync(env.HOME,{recursive:true});mkdirSync(env.TMPDIR,{recursive:true});
 const a=join(fixture,'vault-a'),b=join(fixture,'vault-b');initialize(a);
 const grantA=grant(a),old=await connect(grantA);
 check('current configuration A writes only A',!(await write(old,'accepted-a')).isError&&existsSync(join(a,'INBOX/oracle-memory/accepted-a.md')));
 switchTo(b,join(fixture,'archived-a'));
 check('same process A rejects after A to B',await refusal(old,'denied-old-live'));
 const stale=await connect(grantA);check('new process with configuration A rejects active B',await refusal(stale,'denied-old-new'));
 const currentB=await connect(grant(b));check('current configuration B writes B',!(await write(currentB,'accepted-b')).isError&&existsSync(join(b,'INBOX/oracle-memory/accepted-b.md')));
 const legacy=await connect(env);check('legacy configuration refuses writes without inventing grant',await refusal(legacy,'denied-legacy'));
 check('rejected writes created no notes in B',!['denied-old-live','denied-old-new','denied-legacy'].some(slug=>existsSync(join(b,'INBOX/oracle-memory',slug+'.md'))));
 switchTo(a,join(fixture,'archived-b'),join(fixture,'archived-a'));
 const staleReturn=await connect(grantA);check('return A invalidates its old epoch even for new process',await refusal(staleReturn,'denied-return-a'));
 const newA=await connect(grant(a));check('reprepared current A writes A',!(await write(newA,'accepted-return-a')).isError&&existsSync(join(a,'INBOX/oracle-memory/accepted-return-a.md')));
 check('B process rejects after return A',await refusal(currentB,'denied-b-return'));
 check('A did not receive rejected returned-context notes',!existsSync(join(a,'INBOX/oracle-memory/denied-return-a.md'))&&!existsSync(join(a,'INBOX/oracle-memory/denied-b-return.md')));
}catch(error){failure=String(error)}finally{
 for(const client of clients)await client.close();
 await new Promise(r=>setTimeout(r,100));
 const alive=pids.filter(pid=>{try{process.kill(pid,0);return true}catch{return false}});
 if(alive.length)failure='Own fixture processes still alive: '+alive.join(',');
 writeFileSync(join(fixture,'report.json'),JSON.stringify({rows,passed:rows.filter(r=>r.pass).length,failed:rows.filter(r=>!r.pass).length,failure,pids,remaining:alive,networkDenied:true,realMCP:true,realPGLite:true,nativeVaultSwitchExercised:false},null,2));
}
if(failure)throw Error(failure);
