import {canonicalizeLocalLinks,hasKnownEndpoints} from './link-resolution.ts';
import {importFromContent} from '../../vendor/gbrain/src/core/import-file.ts';
import {extractPageLinks,makeResolver} from '../../vendor/gbrain/src/core/link-extraction.ts';
import type {BrainEngine} from '../../vendor/gbrain/src/core/engine.ts';
import {randomUUID} from 'node:crypto';
import {readFileSync,writeFileSync,mkdirSync,renameSync,existsSync,openSync,closeSync,fsyncSync,unlinkSync,realpathSync} from 'node:fs';
import {join,dirname,basename} from 'node:path';
import {sha,readCandidate,canonicalFiles,isProvenCanonicalRename} from './scope.ts';
import {readCompleteManifest} from './freshness.ts';

type RecordRow={path:string;slug:string;sha256:string;canonical_path:string;indexed_content_hash?:string};
type Problem={path:string;error:string};
export function atomicJSON(path:string,data:unknown){
  mkdirSync(dirname(path),{recursive:true,mode:0o700});const tmp=path+'.'+randomUUID()+'.tmp';
  try{
    writeFileSync(tmp,JSON.stringify(data),{mode:0o600,flag:'wx'});
    const file=openSync(tmp,'r');try{fsyncSync(file)}finally{closeSync(file)}
    renameSync(tmp,path);
    const directory=openSync(dirname(path),'r');try{fsyncSync(directory)}finally{closeSync(directory)}
  }finally{if(existsSync(tmp))unlinkSync(tmp)}
}
function loadCheckpoint(path:string,root:string):any{
  if(!existsSync(path))return null;
  const value=JSON.parse(readFileSync(path,'utf8'));
  if(value.root!==root||!Array.isArray(value.records)||!Array.isArray(value.managed)||value.records.length>60_000||value.managed.length>120_000)throw Error('Checkpoint belongs to another scope or is malformed; preserved for inspection');
  return value;
}

export async function indexVault(engine:BrainEngine,input:any){
  const profile=process.env.GBRAIN_HOME,receiptDir=process.env.ORACLE_RECEIPT_DIR;
  if(!profile||!existsSync(join(profile,'oracle-owned.json'))||!receiptDir)throw Error('Indexing requires the isolated Oracle-owned profile');
  const ownership=JSON.parse(readFileSync(join(profile,'oracle-owned.json'),'utf8'));
  if(ownership.owner!=='OracleCompanion')throw Error('The profile is not owned by Oracle');
  if(engine.kind!=='pglite'||input.source!=='oracle-vault'||!Array.isArray(input.files)||input.files.length>60_000)throw Error('Invalid derived-source scope');
  const root=realpathSync(String(input.root)),files=input.files as string[],run=randomUUID(),now=()=>new Date().toISOString();
  const started=Date.now(),budget=Math.min(480_000,Math.max(100,Number(input.budget_ms)||25_000)),deadline=started+budget;
  const maxUpserts=Math.min(5000,Math.max(1,Number(input.max_upserts)||500));
  const manifestPath=join(profile,'oracle-vault-manifest.json'),checkpointPath=join(profile,'oracle-vault-checkpoint.json');
  const previous=readCompleteManifest(profile);
  if(previous&&realpathSync(previous.root)!==root)throw Error('Complete manifest belongs to another canonical root');
  const checkpoint=loadCheckpoint(checkpointPath,root);
  const historical:RecordRow[]=[...(previous?.records||[]),...(checkpoint?.managed||[]),...(checkpoint?.records||[])];
  const managed=new Map<string,RecordRow>(historical.map(row=>[row.path+'\0'+row.slug,row]));
  const reusable=new Map<string,RecordRow>([...(previous?.records||[]),...(checkpoint?.records||[])].map((row:RecordRow)=>[row.path,row]));
  const records:RecordRow[]=[],failures:Problem[]=[],candidates:ReturnType<typeof readCandidate>[]=[];
  let phase='preflight',upserts=0,removed=0,links=0,sequence=0,needsResume=false,reconciled=false;
  const problem=(path:string,error:unknown)=>{if(failures.length<100)failures.push({path,error:String(error instanceof Error?error.message:error).slice(0,300)})};
  const event=(type:string,summary:string)=>{
    const id=sha(run+type+sequence++),document={schema_version:1,event_id:id,sequence:Date.now()*1000+sequence,source:'gbrain',event_type:type,
      phase:'index',completed:records.length,total:files.length,run_id:run,plan_ref:input.plan_ref||null,received_at:now(),occurred_at:now(),
      sanitized_summary:summary,coverage:'derived-vault-source',observed_status:type.endsWith('verified')?'verified':'partial'};
    atomicJSON(join(receiptDir,id+'.json'),document);
    if(process.env.ORACLE_PLAN_EVENTS_DIR)atomicJSON(join(process.env.ORACLE_PLAN_EVENTS_DIR,id+'.json'),document);
  };
  const save=()=>atomicJSON(checkpointPath,{schema_version:2,run_id:run,root,phase,records,managed:[...managed.values()],failures,complete:false,
                                         generation:input.generation??null,scan_complete:input.scan_complete===true,at:now()});
  const check=()=>{
    if(process.env.ORACLE_CANCEL_FILE&&existsSync(process.env.ORACLE_CANCEL_FILE))throw Error('Indexing cancelled');
    if(Date.now()>deadline){needsResume=true;throw Error('Bounded indexing budget reached; resume from checkpoint')}
  };
  event('gbrain.index_started','Verificação do índice derivado iniciada');
  try{
    // Resolve EVERY identity with official parser/slug APIs BEFORE the first upsert.
    // Two spellings collapsing to one slug can never overwrite each other.
    const seenPaths=new Set<string>(),seenSlugs=new Map<string,string>(),seenExternalIDs=new Map<string,string>();let totalBytes=0;
    for(const relative of files){
      check();
      try{
        if(typeof relative!=='string'||seenPaths.has(relative))throw Error('Duplicate or invalid canonical path');
        seenPaths.add(relative);
        const row=readCandidate(root,relative);totalBytes+=row.bytes;
        if(totalBytes>128_000_000)throw Error('Snapshot exceeds the 128 MB bounded content budget');
        const other=seenSlugs.get(row.slug);
        if(other!==undefined)throw Error(`Slug collision with ${other}; rename one canonical note`);
        if(row.external_id){
          const duplicate=seenExternalIDs.get(row.external_id);
          if(duplicate!==undefined)throw Error(`Frontmatter identity collision with ${duplicate}; no canonical note was changed`);
          seenExternalIDs.set(row.external_id,relative);
        }
        seenSlugs.set(row.slug,relative);candidates.push(row);
      }catch(error){problem(String(relative),error)}
    }
    if(failures.length)throw Error('Preflight failed; no derived upsert was performed');
    // Page read projections deliberately do not expose source_path in this pin.
    // Use the official batch path resolver rather than assuming an internal field.
    const mappings=new Map<string,string>();
    const paths=[...new Set([...candidates.map(row=>row.path),...historical.map(row=>row.path)])];
    for(let start=0;start<paths.length;start+=200){
      check();for(const [path,slug] of await engine.resolveSlugsByPaths(paths.slice(start,start+200),{sourceId:'oracle-vault'}))mappings.set(path,slug);
    }
    // Also protect existing rows not represented by our ownership receipts.
    const forceOwnedRename=new Set<string>();
    for(const row of candidates){
      check();const page=await engine.getPage(row.slug,{sourceId:'oracle-vault'});
      if(page&&mappings.get(row.path)!==row.slug&&!historical.some(old=>old.slug===row.slug&&mappings.get(old.path)===row.slug&&
          isProvenCanonicalRename(root,old.path,row.path,input.scan_complete===true)))throw Error(`Existing canonical identity collision: ${row.path}`);
      if(row.external_id){
        const duplicate=await engine.findDuplicatePage('oracle-vault',{hash:row.sha256,frontmatterId:row.external_id});
        if(duplicate&&duplicate.slug!==row.slug){
          const old=historical.find(old=>old.slug===duplicate.slug&&mappings.get(old.path)===duplicate.slug&&!seenPaths.has(old.path)&&
              isProvenCanonicalRename(root,old.path,row.path,input.scan_complete===true));
          if(!old)throw Error(`Unowned external identity collision: ${row.path}`);
          // Official forceRechunk overrides identity dedup only for a proven
          // owned canonical rename whose old path is absent from this snapshot.
          forceOwnedRename.add(row.path);
        }
      }
    }
    // Persist the entire preflighted intent set ONCE before any import. Checkpoint
    // progress is then batched (25), not an O(N²) full fsync on every single note.
    // After a crash at most 24 imports need readback/replay; intents stay durable.
    for(const {text,bytes,...row} of candidates)managed.set(row.path+'\0'+row.slug,row);
    if(managed.size>120_000)throw Error('Derived ownership intent budget exceeded');
    phase='upsert';save();
    for(const candidate of candidates){
      check();
      const {text,bytes,...row}=candidate;
      const current=readCandidate(root,row.path);
      if(current.sha256!==row.sha256||current.slug!==row.slug)throw Error(`Canonical note changed during indexing: ${row.path}`);
      const page=await engine.getPage(row.slug,{sourceId:'oracle-vault'}),prior=reusable.get(row.path);
      if(prior?.sha256===row.sha256&&page?.content_hash===prior.indexed_content_hash&&mappings.get(row.path)===row.slug){records.push(prior);continue}
      if(upserts>=maxUpserts){needsResume=true;throw Error('Bounded upsert count reached; resume from checkpoint')}
      // Intent was committed before this batch; canonical content is never written.
      const imported=await importFromContent(engine,row.slug,text,{noEmbed:true,sourceId:'oracle-vault',sourcePath:row.path,
        filename:basename(row.path,'.md'),allowEmptyOverwrite:true,forceRechunk:forceOwnedRename.has(row.path)||(!!page&&mappings.get(row.path)!==row.slug)});
      if(imported.error||imported.slug!==row.slug||imported.status==='error')throw Error(imported.error||'Official import did not preserve the requested identity');
      const verified=await engine.getPage(row.slug,{sourceId:'oracle-vault'});
      const verifiedMapping=await engine.resolveSlugsByPaths([row.path],{sourceId:'oracle-vault'});
      if(!verified||verifiedMapping.get(row.path)!==row.slug||typeof verified.content_hash!=='string'||!/^[a-f0-9]{64}$/.test(verified.content_hash))throw Error('Official engine source-path or content-hash readback failed');
      records.push({...row,indexed_content_hash:verified.content_hash});upserts++;
      if(upserts%25===0){save();event('gbrain.index_progress',`${records.length} documentos verificados`)}
    }
    if(input.scan_complete!==true)throw Error('Native scan was partial or unverified; no deletions or link reconciliation permitted');
    phase='verify-snapshot';save();check();
    const actual=canonicalFiles(root,deadline);
    if(JSON.stringify(actual)!==JSON.stringify([...files].sort()))throw Error('Canonical scope changed (create/delete/rename) during indexing');
    for(const row of records){check();if(readCandidate(root,row.path).sha256!==row.sha256)throw Error(`Canonical note changed before reconciliation: ${row.path}`)}
    // Build every relation first. A parse/cancellation failure cannot remove any
    // previously good relation or page. Reconciliation below is one official tx.
    const resolver=makeResolver(engine,{mode:'batch',sourceId:'oracle-vault'});
    const byPath=new Map(records.map(row=>[row.path,row.slug])),known=new Set(records.map(row=>row.slug));
    const relations:any[]=[],unresolved:any[]=[];let relationBytes=0;
    for(const row of records){
      check();const page=await engine.getPage(row.slug,{sourceId:'oracle-vault'});
      if(!page||page.content_hash!==row.indexed_content_hash)throw Error('Index changed during relation preparation');
      const extracted=await extractPageLinks(page.slug,canonicalizeLocalLinks(page.compiled_truth,row.path,byPath),page.frontmatter,page.type,resolver,{globalBasename:true});
      for(const relation of extracted.candidates){
        if(!hasKnownEndpoints(relation,page.slug,known)){if(unresolved.length<200)unresolved.push({path:row.path,target:relation.targetSlug});continue}
        relations.push({...relation,from:relation.fromSlug||page.slug});
        relationBytes+=Buffer.byteLength(JSON.stringify(relations[relations.length-1]));
        if(relations.length>100_000||relationBytes>64_000_000)throw Error('Explicit relation budget exceeded');
      }
    }
    phase='reconcile';save();check();
    const desiredPaths=new Set(records.map(row=>row.path)),desiredSlugs=new Set(records.map(row=>row.slug));
    await engine.transaction(async tx=>{
      const obsolete=[...managed.values()].filter(old=>!desiredSlugs.has(old.slug));
      for(let start=0;start<obsolete.length;start+=200){
        check();const batch=obsolete.slice(start,start+200);
        const resolved=await tx.resolveSlugsByPaths(batch.map(row=>row.path),{sourceId:'oracle-vault'});
        const removable:string[]=[];
        for(const row of batch){
          check();
          if(resolved.get(row.path)===row.slug){removable.push(row.slug);continue}
          const page=await tx.getPage(row.slug,{sourceId:'oracle-vault'});
          if(!page)continue;
          // A frontmatter identity change may create a second slug for the SAME
          // path; the official path->slug map returns only one. The prior complete
          // receipt's indexed hash proves the superseded page is still ours.
          if(desiredPaths.has(row.path)&&row.indexed_content_hash&&page.content_hash===row.indexed_content_hash){removable.push(row.slug);continue}
          throw Error(`Derived ownership changed before reconciliation: ${row.path}`);
        }
        const slugs=[...new Set(removable)];
        removed+=(await tx.deletePages(slugs,{sourceId:'oracle-vault'})).length;
      }
      const pages=records.map(row=>({slug:row.slug,source_id:'oracle-vault'}));
      for(let start=0;start<pages.length;start+=300){check();await tx.removeLinksByPagesAndSource(pages.slice(start,start+300),{linkSource:'markdown'});await tx.removeLinksByPagesAndSource(pages.slice(start,start+300),{linkSource:'frontmatter'})}
      for(let start=0;start<relations.length;start+=200){
        check();links+=await tx.addLinksBatch(relations.slice(start,start+200).map(link=>({
          from_slug:link.from,to_slug:link.targetSlug,context:link.context,link_type:link.linkType,
          link_source:link.linkSource||'markdown',origin_slug:link.originSlug,origin_field:link.originField,
          from_source_id:'oracle-vault',to_source_id:'oracle-vault',origin_source_id:'oracle-vault'})));
      }
      // Final membership/hash check inside the same transaction prevents a failed
      // snapshot from committing derived deletions. Canonical notes are read only.
      if(JSON.stringify(canonicalFiles(root,deadline))!==JSON.stringify(actual))throw Error('Canonical scope changed before commit');
      for(const row of records){check();if(readCandidate(root,row.path).sha256!==row.sha256)throw Error('Canonical note changed before commit')}
    });
    reconciled=true;
    const manifest={schema_version:2,run_id:run,root,records,complete:true,at:now(),generation:input.generation??null,
      snapshot_signature:input.snapshot_signature??null,removed_from_derived_index:removed,explicit_links:links,
      unresolved_link_count:unresolved.length,unresolved_links:unresolved};
    // Last complete manifest is immutable until the full tx has committed.
    atomicJSON(manifestPath,manifest);unlinkSync(checkpointPath);
    event('gbrain.index_verified',`${records.length} documentos e ${links} relações verificados`);
    return {total:files.length,verified:records.length,complete:true,failures:[],explicit_links:links,removed_from_derived_index:removed};
  }catch(error){
    problem('',error);phase='partial';save();event('gbrain.index_failed','Índice parcial; manifesto completo anterior e notas canônicas preservados');
    return {total:files.length,verified:records.length,upserts,complete:false,failures,needs_resume:needsResume,reconciliation_committed:reconciled,removed_from_derived_index:reconciled?removed:0};
  }
}
