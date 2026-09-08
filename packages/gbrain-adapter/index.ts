import {importFromFile} from '../../vendor/gbrain/src/core/import-file.ts';
import {extractPageLinks,makeResolver} from '../../vendor/gbrain/src/core/link-extraction.ts';
import {createHash,randomUUID} from 'node:crypto';
import {lstatSync,realpathSync,readFileSync,writeFileSync,mkdirSync,renameSync,existsSync} from 'node:fs';
import {join,resolve,dirname} from 'node:path';
import type {BrainEngine} from '../../vendor/gbrain/src/core/engine.ts';

function sha(value:string|Buffer){return createHash('sha256').update(value).digest('hex')}
function atomic(path:string,data:unknown){mkdirSync(dirname(path),{recursive:true,mode:0o700});const tmp=path+'.'+process.pid+'.tmp';writeFileSync(tmp,JSON.stringify(data),{mode:0o600});renameSync(tmp,path)}
export async function indexVault(engine:BrainEngine,input:any){
 const profile=process.env.GBRAIN_HOME,receiptDir=process.env.ORACLE_RECEIPT_DIR;
 if(!profile||!existsSync(join(profile,'oracle-owned.json'))||!receiptDir)throw Error('Indexing requires the isolated Oracle-owned profile');
 if(input.source!=='oracle-vault'||!Array.isArray(input.files)||input.files.length>60000)throw Error('Invalid derived-source scope');
 const root=realpathSync(String(input.root));const files=input.files as string[];const run=randomUUID();const now=()=>new Date().toISOString();
 let sequence=0;const event=(type:string,completed:number,summary:string)=>{const id=sha(run+type+completed);sequence=Math.max(sequence+1,Date.now()*1000);const doc={schema_version:1,event_id:id,sequence,source:'gbrain',event_type:type,phase:'index',completed,total:files.length,run_id:run,plan_ref:input.plan_ref||null,received_at:now(),occurred_at:now(),sanitized_summary:summary,coverage:'derived-vault-source',observed_status:type.endsWith('failed')?'failed':'verified'};atomic(join(receiptDir,id+'.json'),doc);if(process.env.ORACLE_PLAN_EVENTS_DIR)atomic(join(process.env.ORACLE_PLAN_EVENTS_DIR,id+'.json'),doc)};
 const manifestPath=join(profile,'oracle-vault-manifest.json');const previous=existsSync(manifestPath)?JSON.parse(readFileSync(manifestPath,'utf8')).records||[]:[];const records:any[]=[];const failures:any[]=[];event('gbrain.index_started',0,'Indexação dos Markdown autorizados iniciada');
 for(const rel of files){try{
   if(typeof rel!=='string'||rel.startsWith('/')||rel.split('/').includes('..')||!rel.toLowerCase().endsWith('.md'))throw Error('Non-Markdown or invalid path');
   const path=resolve(root,rel);if(!realpathSync(path).startsWith(root+'/'))throw Error('Path outside scope');
   let component=root;for(const part of rel.split('/')){component=join(component,part);if(lstatSync(component).isSymbolicLink())throw Error('Symbolic link excluded')}
   if(lstatSync(path).size>2_000_000)throw Error('File larger than 2MB');
   const hash=sha(readFileSync(path));const result=await importFromFile(engine,path,rel,{noEmbed:true,sourceId:'oracle-vault'});
   if(result.status==='error'||result.error&&result.error!=='unchanged')throw Error(result.error||'Import rejected');
   const page=await engine.getPage(result.slug,{sourceId:'oracle-vault'});if(!page)throw Error('Page read-back failed');
   records.push({path:rel,slug:result.slug,sha256:hash,canonical_path:path});
 }catch(error){failures.push({path:rel,error:String(error instanceof Error?error.message:error).slice(0,300)})}
 if((records.length+failures.length)%25===0){atomic(manifestPath,{run_id:run,root,records,failures,complete:false,at:now()});event('gbrain.file_verified',records.length,`${records.length} documentos verificados de ${files.length}`)}
 }
 // Re-read composite identity after the batch to catch slug collisions.
 for(let i=0;i<records.length;i+=300){const batch=records.slice(i,i+300);const resolved=await engine.resolveSlugsByPaths(batch.map(r=>r.path),{sourceId:'oracle-vault'});for(const row of batch)if(resolved.get(row.path)!==row.slug)failures.push({path:row.path,error:'Source-path collision; rename or disambiguate the document'})}
 let removed=0,links=0;
 if(!failures.length){
  const wanted=new Set(records.map(r=>r.path));for(const old of previous){if(!wanted.has(old.path)){const resolved=await engine.resolveSlugsByPaths([old.path],{sourceId:'oracle-vault'});if(resolved.get(old.path)===old.slug){await engine.deletePage(old.slug,{sourceId:'oracle-vault'});removed++}}}
  const managed=records.map(r=>({slug:r.slug,source_id:'oracle-vault'}));
  for(let i=0;i<managed.length;i+=500){await engine.removeLinksByPagesAndSource(managed.slice(i,i+500),{linkSource:'markdown'});await engine.removeLinksByPagesAndSource(managed.slice(i,i+500),{linkSource:'frontmatter'})}
  const resolver=makeResolver(engine,{mode:'batch',sourceId:'oracle-vault'});
  for(const row of records){const page=await engine.getPage(row.slug,{sourceId:'oracle-vault'});if(!page)continue;const extracted=await extractPageLinks(page.slug,page.compiled_truth,page.frontmatter,page.type,resolver,{globalBasename:true});
   for(const link of extracted.candidates){await engine.addLink(link.fromSlug||page.slug,link.targetSlug,link.context,link.linkType,link.linkSource||'markdown',link.originSlug,link.originField,{fromSourceId:'oracle-vault',toSourceId:'oracle-vault',originSourceId:'oracle-vault'});links++}
  }
 }
 const manifest={run_id:run,root,records,failures,complete:failures.length===0,at:now(),removed_from_derived_index:removed,explicit_links:links};atomic(manifestPath,manifest);
 event(failures.length?'gbrain.index_failed':'gbrain.index_verified',records.length,failures.length?`${failures.length} falhas; índice parcial preservado`:`${records.length} documentos e ${links} relações verificados`);
 return {total:files.length,verified:records.length,failures,complete:!failures.length,explicit_links:links,removed_from_derived_index:removed};
}
