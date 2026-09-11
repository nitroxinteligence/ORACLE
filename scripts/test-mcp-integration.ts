// Explicit fixture only; never reads .work/latest-gbrain-test.json or a personal profile.
import {Client} from '../vendor/gbrain/node_modules/@modelcontextprotocol/sdk/dist/esm/client/index.js';
import {StdioClientTransport} from '../vendor/gbrain/node_modules/@modelcontextprotocol/sdk/dist/esm/client/stdio.js';
import {readFileSync,writeFileSync,existsSync,realpathSync,lstatSync} from 'node:fs';
import {resolve,join} from 'node:path';
import {spawnSync} from 'node:child_process';
import {createHash,randomUUID} from 'node:crypto';

const root=realpathSync(process.argv[2]||'');
if(!root.includes('/.work/integrated-audit/run-')||readFileSync(join(root,'fixture-marker'),'utf8')!=='oracle-integrated-audit\n')throw Error('A marked isolated integration fixture is required.');
const binary=join(root,'Oracle Integration.app/Contents/Resources/engine/oracle-gbrain-read');
if(lstatSync(binary).isSymbolicLink())throw Error('Shared adapter is forbidden.');
const env={PATH:'/usr/bin:/bin',HOME:join(root,'home'),TMPDIR:join(root,'tmp'),GBRAIN_HOME:join(root,'state/gbrain/profile'),GBRAIN_HOOKS:'0',GBRAIN_SKIP_UPDATE_CHECK:'1'};
const checks:{name:string,pass:boolean}[]=[],log:string[]=[];
function check(pass:boolean,name:string){checks.push({name,pass});if(!pass)throw Error(name);console.log('PASS '+name);}
const transport=new StdioClientTransport({command:binary,args:['--mcp'],env,stderr:'pipe'});
const client=new Client({name:'oracle-integrated-offline-fixture',version:'1'},{capabilities:{}});
transport.stderr?.on('data',data=>{if(log.join('').length<100000)log.push(String(data));});
const slug='people/integrated-'+randomUUID(),page=join(root,'vault/INBOX/oracle-memory',slug+'.md');
const allowed=['remember','recall','entity','context_pack','delta','forget','search','get_page','list_pages','get_links','get_backlinks','traverse_graph','put_page'];
let fatal:string|undefined;
try{
 await client.connect(transport);
 check(true,'real SDK client performs MCP initialize handshake over stdio');
 const tools=await client.listTools();
 check(tools.tools.length===allowed.length&&tools.tools.every(t=>allowed.includes(t.name)),'tool discovery exposes exactly the reviewed local operation set');
 const created=await client.callTool({name:'put_page',arguments:{slug,content:'---\ntitle: Synthetic MCP Integration\ntype: person\n---\n# Synthetic MCP Integration\n\nDisposable canonical entity.'}});
 check(!created.isError&&existsSync(page),'official put_page creates the explicit canonical memory page');
 const remembered=await client.callTool({name:'remember',arguments:{entity:slug,fact:'Synthetic entity prefers small integration tests.',kind:'preference',provenance:'oracle-integration:synthetic-literal',ttl:'3d'}});
 check(!remembered.isError,'official remember succeeds without inference');
 const memory=JSON.parse((remembered.content as any[]).find(c=>c.type==='text').text);
 check(!!memory.valid_until&&readFileSync(page,'utf8').includes('prefers small integration tests'),'memory with transient TTL is verified in the canonical file');
 const fetched=await client.callTool({name:'get_page',arguments:{slug}});
 check(!fetched.isError&&JSON.stringify(fetched).includes('prefers small integration tests'),'get_page roundtrip returns the official persisted memory');
 const concurrent=await Promise.all([client.callTool({name:'get_page',arguments:{slug}}),client.callTool({name:'list_pages',arguments:{}})]);
 check(concurrent.every(r=>!r.isError),'concurrent protocol calls finish in the bounded serialized engine queue');
 const read=spawnSync(binary,[],{env,cwd:root,input:JSON.stringify({operation:'list',source:'oracle-vault'}),encoding:'utf8',timeout:40000});
 check(read.status===0&&read.stdout.includes('"ok":true'),'idle MCP releases the database so a separate UI adapter can read');
 const blocked=await client.callTool({name:'extract_facts',arguments:{text:'No model execution allowed'}});
 check(blocked.isError===true,'unexposed inference operation is rejected');
}catch(error){fatal=String(error);checks.push({name:fatal,pass:false});}
finally{
 await client.close();
 writeFileSync(join(root,'mcp-result.json'),JSON.stringify({checks,passed:checks.filter(c=>c.pass).length,failed:checks.filter(c=>!c.pass).length,fatal,adapterSHA256:createHash('sha256').update(readFileSync(binary)).digest('hex'),scope:'Real official SDK stdio client + compiled adapter + GBrain/PGLite, marked synthetic profile; externally sandboxed with network denied.'},null,2));
 writeFileSync(join(root,'mcp-stderr.log'),log.join(''));
}
if(fatal)throw Error(fatal);
