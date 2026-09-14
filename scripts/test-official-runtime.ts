import {mkdirSync,writeFileSync,readFileSync,copyFileSync,existsSync,chmodSync,rmSync} from 'node:fs';
import {resolve,join} from 'node:path';
import {createHash,randomUUID} from 'node:crypto';
import {createEngine} from '../vendor/gbrain/src/core/engine-factory.ts';
import {toEngineConfig} from '../vendor/gbrain/src/core/config.ts';
import {runRuntimeGeneration} from '../packages/gbrain-adapter/runtime-generation.ts';
const base=resolve('.work/official-runtime-fixture-'+randomUUID()),state=join(base,'state'),profile=join(state,'gbrain/profile'),vault=join(base,'vault');
for(const path of [join(profile,'.gbrain'),join(vault,'INBOX/oracle-memory')])mkdirSync(path,{recursive:true});
const config={engine:'pglite',database_path:join(profile,'.gbrain/data'),embedding_disabled:true};
const json=(p:string,x:any)=>writeFileSync(p,JSON.stringify(x));
json(join(profile,'.gbrain/config.json'),config);json(join(profile,'oracle-owned.json'),{owner:'OracleCompanion',schema_version:2,vault_root:vault});
writeFileSync(join(vault,'personal.md'),'# Original personal note\n');
process.env.GBRAIN_HOME=profile;process.env.HOME=profile;
const e=await createEngine(toEngineConfig(config));await e.connect(toEngineConfig(config));await e.initSchema();
await e.executeRaw("INSERT INTO sources (id,name,local_path) VALUES ('oracle-memory','Memory',$1),('oracle-vault','Vault',NULL) ON CONFLICT (id) DO NOTHING",[join(vault,'INBOX/oracle-memory')]);
await e.setConfig('search.mcp_keyword_only','true');await e.disconnect();
const id=randomUUID(),slot=join(state,'updates/runtime/versions',id);mkdirSync(slot,{recursive:true});
copyFileSync(resolve('.work/gbrain-latest'),join(slot,'gbrain'));chmodSync(join(slot,'gbrain'),0o700);
copyFileSync(resolve('Resources/engine/oracle-gbrain-read'),join(slot,'oracle-gbrain-read'));
const hash=(p:string)=>createHash('sha256').update(readFileSync(p)).digest('hex');
const metadata={directory:id,version:'0.50.0.0',commit:'2efaaf8f8a817b5b82e023383618fdcdb1cc5f7d',files:{gbrain:hash(join(slot,'gbrain')),'oracle-gbrain-read':hash(join(slot,'oracle-gbrain-read'))},official_release:{origin:'official-github'},previous:{bundled:true}};
const request={action:'activate',id:randomUUID(),commit:metadata.commit,database_compatibility:'same-schema',metadata};
const result=await runRuntimeGeneration(request);console.log('RESULT',JSON.stringify(result));
if(!result.database_verified||readFileSync(join(vault,'personal.md'),'utf8')!=='# Original personal note\n')throw Error('verification failed');
console.log('PASS actual latest binary, schema migration, old adapter readback, preserved personal note');
const previous=readFileSync(join(state,'updates/runtime/current.json'),'utf8');
try {await runRuntimeGeneration({...request,id:randomUUID(),fail_at:'after-profile-activation'});throw Error('failure missing')}
catch(error){if(!String(error).includes('Synthetic fault'))throw error;}
if(readFileSync(join(state,'updates/runtime/current.json'),'utf8')!==previous||existsSync(join(state,'updates/runtime/transition.json')))throw Error('rollback failed');
console.log('PASS fault after profile switch restores runtime and clears transition');

rmSync(base,{recursive:true,force:true});
