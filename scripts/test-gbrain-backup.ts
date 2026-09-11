/** Run with network denied and write access ONLY to .work/worker4-backup.
 * No personal discovery, credentials, provider config, full Swift build or SQL.
 * The real engine proves facts, versions, tombstones and indexes survive restore.
 */
import {strict as assert} from 'node:assert';
import {mkdirSync,readFileSync,writeFileSync,existsSync,readdirSync,lstatSync,renameSync,symlinkSync,linkSync,unlinkSync} from 'node:fs';
import {resolve,join} from 'node:path';
import {randomUUID,createHash} from 'node:crypto';
import {spawnSync} from 'node:child_process';
import {PGLiteEngine} from '../vendor/gbrain/src/core/pglite-engine.ts';
import {addSource} from '../vendor/gbrain/src/core/sources-ops.ts';
import {importFromContent} from '../vendor/gbrain/src/core/import-file.ts';
import {validateGBrainSnapshot} from '../packages/gbrain-adapter/backup.ts';

const root=resolve(import.meta.dir,'..'),scratch=join(root,'.work/worker4-backup');
const adapter=process.argv[process.argv.indexOf('--adapter')+1];
assert(adapter && resolve(adapter).startsWith(scratch+'/') && !lstatSync(adapter).isSymbolicLink(),'Use own scratch adapter');
const base=join(scratch,'run-'+randomUUID()),state=join(base,'state'),vault=join(base,'vault');
const profile=join(state,'gbrain/profile'),configDir=join(profile,'.gbrain'),db=join(configDir,'brain.pglite'),backups=join(state,'gbrain-backups');
for(const path of [base,state,vault,join(vault,'INBOX'),join(vault,'INBOX/oracle-memory'),join(state,'gbrain'),profile,configDir,join(profile,'tmp')])mkdirSync(path,{mode:0o700});
process.chdir(base);
const env={PATH:'/usr/bin:/bin',HOME:profile,TMPDIR:join(profile,'tmp'),GBRAIN_HOME:profile,GBRAIN_HOOKS:'0',GBRAIN_SKIP_UPDATE_CHECK:'1',LANG:'en_US.UTF-8'};
for(const key of Object.keys(process.env))delete process.env[key];Object.assign(process.env,env);
const configFile=join(configDir,'config.json'),ownerFile=join(profile,'oracle-owned.json'),appFile=join(state,'config.json');
const config={engine:'pglite',database_path:db,embedding_disabled:true};
const owner={owner:'OracleCompanion',schema_version:2,vault_root:vault,engine_version:'0.48.4.0',plan_hash:'synthetic-backup'};
const app={vault,gbrainAccess:true,gbrainVaultSource:'oracle-vault'};
const put=(path:string,value:any)=>writeFileSync(path,JSON.stringify(value),{mode:0o600});
put(configFile,config);put(ownerFile,owner);put(appFile,app);
writeFileSync(join(vault,'fixture.md'),'# Backup fixture\n\nOriginal canonical vault bytes.\n',{mode:0o600});
const hash=(value:Buffer|string)=>createHash('sha256').update(value).digest('hex');
const passed:string[]=[];
function check(name:string,condition:unknown){assert(condition,name);passed.push(name);console.log('PASS '+name)}
function call(action:string,fields:any={},good=true){
  const result=spawnSync(adapter,[],{cwd:base,env,input:JSON.stringify({operation:'backup',action,state,...fields}),encoding:'utf8',timeout:120000,maxBuffer:2_000_000});
  if(result.error)throw result.error;
  let output:any;try{output=JSON.parse(result.stdout)}catch{throw Error('Invalid response: '+result.stdout+' '+result.stderr.slice(-1800))}
  if(good)assert(result.status===0 && output.ok===true,JSON.stringify(output)+'\n'+result.stderr.slice(-1800));
  else assert(result.status!==0 && output.ok===false,'Expected refusal: '+JSON.stringify(output));
  return output.value ?? output;
}
const consentFile=join(backups,'consent.json');
function setConsent(enabled=true,extra:any={}){put(consentFile,{schema_version:1,enabled,scope:'full_pglite_database_only',profile,vault_root:vault,private:true,network:false,...extra})}
let engine:PGLiteEngine|undefined;
try {
  engine=new PGLiteEngine();await engine.connect({database_path:db});await engine.initSchema();
  await addSource(engine,{id:'oracle-vault',name:'Derived synthetic fixture'});
  await addSource(engine,{id:'oracle-memory',name:'Canonical synthetic memory',localPath:join(vault,'INBOX/oracle-memory'),force:true});
  await engine.setConfig('search.mcp_keyword_only','true');
  await engine.setConfig('oracle.synthetic.setting','retained-database-value');
  const scope={sourceId:'oracle-memory'},slug='people/fixture';
  const before='# Synthetic entity\n\nThe archived fixture uses the token violetbicycle.\n';
  await importFromContent(engine,slug,before,{...scope,noEmbed:true});
  await engine.createVersion(slug,scope);
  await engine.addTag(slug,'synthetic-preserved',scope);
  await importFromContent(engine,'projects/fixture','# Project fixture\n\nSynthetic project.\n',{...scope,noEmbed:true});
  await engine.addLink(slug,'projects/fixture','Synthetic explicit link','mentions','manual',undefined,undefined,{fromSourceId:'oracle-memory',toSourceId:'oracle-memory'});
  await engine.insertFacts([{fact:'Private backup fixture fact',kind:'preference',visibility:'private',entity_slug:slug,
    source:'synthetic-backup',source_markdown_slug:slug,row_num:1,valid_until:new Date('2100-01-01T00:00:00Z')}],{source_id:'oracle-memory'});
  const seededFacts=await engine.listFactsByEntity('oracle-memory',slug,{activeOnly:false});
  check('source private fact and exact UTC expiration are verified before backup',seededFacts.some(f=>f.visibility==='private' && f.valid_until?.toISOString()==='2100-01-01T00:00:00.000Z'));
  await importFromContent(engine,'notes/tombstone','# Tombstone\n\nRetain recoverable deleted data.\n',{...scope,noEmbed:true});
  await engine.softDeletePage('notes/tombstone',scope);
  await engine.disconnect();engine=undefined;
  call('create',{},false);check('default consent denies backup before creating artifacts',!existsSync(backups));
  mkdirSync(backups,{mode:0o700});setConsent(false);call('create',{},false);
  check('explicitly disabled backup is not an installation side effect',readdirSync(backups).length===1);
  setConsent(true,{vault_root:join(base,'other-vault')});call('create',{},false);
  check('consent cannot be reused for a different vault',readdirSync(backups).length===1);setConsent();
  engine=new PGLiteEngine();await engine.connect({database_path:db});
  const lockBefore=readFileSync(join(db,'.gbrain-lock/lock'));
  call('create',{},false);check('live official writer is never copied or unlocked',readFileSync(join(db,'.gbrain-lock/lock')).equals(lockBefore));
  await engine.disconnect();engine=undefined;
  const originalFiles=[appFile,ownerFile,configFile,join(vault,'fixture.md')].map(path=>({path,sha:hash(readFileSync(path))}));
  const created=call('create');const id=created.id,archive=join(created.path,'snapshot.tgz');
  check('complete physical database snapshot has a verified manifest',created.integrity_verified && created.complete && existsSync(archive));
  check('hash verification never pretends to prove restoration',created.restore_verified===false && call('verify',{id}).restore_verified===false);
  check('backup explicitly excludes canonical vault files',created.vault_files_included===false);
  check('backup is private, not a release payload',(lstatSync(created.path).mode&0o077)===0 && (lstatSync(archive).mode&0o077)===0);
  call('restore',{id},false);check('restore requires its own explicit confirmation',!existsSync(join(backups,'restores')));
  const snapshotBytes=readFileSync(archive),savedManifest=readFileSync(join(created.path,'manifest.json'));
  const damaged=Buffer.from(snapshotBytes);damaged[damaged.length-5]^=1;writeFileSync(archive,damaged);
  call('verify',{id},false);call('restore',{id,confirmed:true},false);check('corrupt snapshot cannot restore',!existsSync(join(backups,'restores')));writeFileSync(archive,snapshotBytes);
  put(join(created.path,'manifest.json'),{...JSON.parse(savedManifest.toString()),version:'0.50.0'});call('verify',{id},false);writeFileSync(join(created.path,'manifest.json'),savedManifest);
  check('different upstream/schema qualification is rejected',true);
  call('verify',{id:'../../live'},false);check('caller cannot choose backup paths',true);
  const savedArchive=join(base,'saved-archive.tgz');
  renameSync(archive,savedArchive);symlinkSync(savedArchive,archive);call('verify',{id},false);unlinkSync(archive);renameSync(savedArchive,archive);
  check('symlink snapshot is refused',true);
  const hardlink=join(base,'archive-hardlink');linkSync(archive,hardlink);call('verify',{id},false);unlinkSync(hardlink);check('hardlink snapshot is refused',true);
  writeFileSync(join(configDir,'.env'),'DO_NOT_READ=synthetic\n',{mode:0o600});call('create',{},false);unlinkSync(join(configDir,'.env'));check('credential sidecar is refused before discovery',true);
  put(configFile,{...config,chat_model:'unsupported-test-model'});call('create',{},false);put(configFile,config);check('additional model configuration is rejected',true);
  put(appFile,{...app,gbrainAccess:false});call('create',{},false);put(appFile,app);check('revoked memory access blocks backup',true);
  engine=new PGLiteEngine();await engine.connect({database_path:db});
  await importFromContent(engine,slug,'# Current entity\n\nChanged after backup to ambermotorcycle.\n',{...scope,noEmbed:true});
  await engine.disconnect();engine=undefined;
  const restored=call('restore',{id,confirmed:true});
  check('official snapshot loader and GBrain query verify a real restore',restored.restore_verified===true && restored.complete===true);
  check('restoration never replaces or activates live state',restored.new_state!==state && restored.new_state.startsWith(join(backups,'restores')+'/') && restored.activated===false && restored.live_overwritten===false);
  check('restored validation state cannot be used as normal MCP profile',!existsSync(join(restored.new_state,'gbrain-profile/oracle-owned.json')) && JSON.parse(readFileSync(join(restored.new_state,'config.json'),'utf8')).gbrainAccess===false);
  engine=new PGLiteEngine();await engine.connect({database_path:restored.database_path});
  check('restored original body differs from subsequently modified live body',(await engine.getPage(slug,scope))?.compiled_truth.includes('violetbicycle'));
  check('keyword index really works after reopening restored database',(await engine.searchKeyword('violetbicycle',scope)).some(row=>row.slug===slug));
  check('database-only settings are restored',await engine.getConfig('oracle.synthetic.setting')==='retained-database-value');
  check('page versions survive full database restoration',(await engine.getVersions(slug,scope)).length>0);
  check('explicit graph links survive restoration',(await engine.getLinks(slug,scope)).some(link=>JSON.stringify(link).includes('projects/fixture')));
  check('private facts and TTL survive restoration',(await engine.listFactsByEntity('oracle-memory',slug)).some(f=>f.fact==='Private backup fixture fact' && f.visibility==='private' && f.valid_until?.toISOString()==='2100-01-01T00:00:00.000Z'));
  check('soft-deleted rows remain recoverable',(await engine.getPage('notes/tombstone',{...scope,includeDeleted:true}))?.deleted_at!=null);
  await engine.disconnect();engine=undefined;
  engine=new PGLiteEngine();await engine.connect({database_path:db});
  check('live database was not rolled back by validation',(await engine.getPage(slug,scope))?.compiled_truth.includes('ambermotorcycle'));
  await engine.disconnect();engine=undefined;
  check('vault, profile config and binding bytes are preserved',originalFiles.every(file=>hash(readFileSync(file.path))===file.sha));
  assert.throws(()=>validateGBrainSnapshot(Buffer.from('invalid')));check('non-snapshot bytes are rejected before loading',true);
  const evidence={checks:passed.length,passed,base,state,adapter_sha256:hash(readFileSync(adapter)),backup_id:id,restored,
    network:'denied by caller sandbox',model_inference:false,personal_profiles:false,full_database_snapshot:true};
  put(join(scratch,'latest-result.json'),evidence);console.log(JSON.stringify(evidence,null,2));
} finally {if(engine)await engine.disconnect()}
process.exitCode=0;
