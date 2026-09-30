/** Dedicated isolated compatibility probe, never a live host session. */
import {Client} from '../vendor/gbrain/node_modules/@modelcontextprotocol/sdk/dist/esm/client/index.js';
import {StdioClientTransport} from '../vendor/gbrain/node_modules/@modelcontextprotocol/sdk/dist/esm/client/stdio.js';
import {readFileSync,writeFileSync,realpathSync,existsSync} from 'node:fs';
import {resolve,join} from 'node:path';
import {createHash} from 'node:crypto';
import {dirname} from 'node:path';
import {strict as assert} from 'node:assert';
const fixture=realpathSync(process.argv[2]),phase=process.argv[3];
assert(fixture.startsWith(resolve(import.meta.dir,'../.work/gbrain-release-compatibility')+'/'));
const config=JSON.parse(readFileSync(join(fixture,'protocol-input.json'),'utf8'));
assert(config.personal_profiles===false);
const profile=realpathSync(config.env.GBRAIN_HOME);assert(profile.startsWith(fixture+'/'));
const owner=JSON.parse(readFileSync(join(profile,'oracle-owned.json'),'utf8'));
assert(owner.owner==='OracleCompanion'&&owner.schema_version===2&&owner.vault_root.startsWith(fixture+'/')&&realpathSync(owner.vault_root)===owner.vault_root);
const epochFile=join(dirname(profile),'vault-epoch.json');
config.env.ORACLE_MCP_VAULT=owner.vault_root;
config.env.ORACLE_MCP_EPOCH_SHA256=createHash('sha256').update(existsSync(epochFile)?readFileSync(epochFile):Buffer.alloc(0)).digest('hex');
const transport=new StdioClientTransport({command:'/usr/bin/sandbox-exec',args:['-p','(version 1)(allow default)(deny network*)',config.adapter,'--mcp'],env:config.env,cwd:fixture,stderr:'pipe'});
const client=new Client({name:'oracle-release-compatibility',version:'1'},{capabilities:{}}),checks:string[]=[];
let errorText='';transport.stderr?.on('data',data=>{errorText=(errorText+String(data)).slice(-8000)});
async function call(name:string,args:any){const value=await client.callTool({name,arguments:args},undefined,{timeout:40000});assert(!value.isError,JSON.stringify(value)+'\n'+errorText);return JSON.stringify(value)}
try{
 await client.connect(transport);const listed=await client.listTools();assert.equal(listed.tools.length,13);checks.push('handshake13');
 if(phase==='seed'){
  await call('put_page',{slug:'people/compatibility-sentinel',content:'---\ntitle: Compatibility Sentinel\ntype: person\n---\n# Compatibility Sentinel\n\nOriginal synthetic release probe.\n'});
  await call('remember',{fact:'The synthetic compatibility sentinel prefers concise evidence.',provenance:'release-compatibility:synthetic',entity:'people/compatibility-sentinel',kind:'preference',ttl:'3d'});checks.push('writeCanonicalRemember');
 }
 assert((await call('get_page',{slug:'people/compatibility-sentinel',include_content:true})).includes('concise evidence'));checks.push('getMemory');
 assert((await call('recall',{entity:'people/compatibility-sentinel',query:'concise evidence'})).includes('concise evidence'));checks.push('recallWithoutProvider');
 assert((await call('search',{query:'CANONICAL_RELEASE_SENTINEL'})).includes('release-note'));checks.push('derivedSearch');
 writeFileSync(join(fixture,'protocol-'+phase+'.json'),JSON.stringify({passed:checks.length,checks,networkDenied:true,provider:false,personal_profiles:false}));
 console.log(JSON.stringify({passed:checks.length,checks}));
}finally{await client.close()}
