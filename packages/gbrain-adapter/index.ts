/** Derived index only. GBrain owns all page/chunk/link semantics and its PGLite
 * writer lock. The vault is never mutated, and a failed scan never authorizes
 * reconciliation. Successful manifests and recovery ownership are separate. */
import {canonicalizeLocalLinks, hasKnownEndpoints} from './link-resolution.ts';
import {importFromFile} from '../../vendor/gbrain/src/core/import-file.ts';
import {extractPageLinks, makeResolver} from '../../vendor/gbrain/src/core/link-extraction.ts';
import {slugifyPath, hasMalformedPathSegment} from '../../vendor/gbrain/src/core/sync.ts';
import {parseMarkdown} from '../../vendor/gbrain/src/core/markdown.ts';
import {validateSlug} from '../../vendor/gbrain/src/core/utils.ts';
import {createHash, randomUUID} from 'node:crypto';
import {lstatSync, realpathSync, readFileSync, writeFileSync, mkdirSync, renameSync, existsSync, readdirSync, unlinkSync} from 'node:fs';
import {join, resolve, dirname} from 'node:path';
import type {BrainEngine} from '../../vendor/gbrain/src/core/engine.ts';

const SOURCE = 'oracle-vault';
const MEMORY = 'INBOX/oracle-memory';
const EXCLUDED_DIRS = new Set(['node_modules', 'vendor', 'dist', 'build']);
const scope = {sourceId: SOURCE};
type Row = {path:string; slug:string; sha256:string; canonical_path:string; page_hash?:string};
export function sha(value:string|Buffer):string { return createHash('sha256').update(value).digest('hex'); }
export function canonical(value:any):string {
  if (Array.isArray(value)) return '[' + value.map(canonical).join(',') + ']';
  if (value && typeof value === 'object') return '{' + Object.keys(value).sort().filter(k=>value[k]!==undefined).map(k=>JSON.stringify(k)+':'+canonical(value[k])).join(',') + '}';
  return JSON.stringify(value);
}
function atomic(path:string, value:any):void {
  mkdirSync(dirname(path), {recursive:true, mode:0o700});
  if (existsSync(path) && lstatSync(path).isSymbolicLink()) throw Error('Receipt symlink refused');
  const temporary = path + '.' + randomUUID() + '.tmp';
  try { writeFileSync(temporary, JSON.stringify(value), {mode:0o600, flag:'wx'}); renameSync(temporary,path); }
  finally { if (existsSync(temporary)) unlinkSync(temporary); }
}
export function isOwnedMemory(path:string):boolean {
  const lower = path.toLowerCase(); return lower === MEMORY.toLowerCase() || lower.startsWith(MEMORY.toLowerCase()+'/');
}
function cancelled():void {
  if (process.env.ORACLE_CANCEL_FILE && existsSync(process.env.ORACLE_CANCEL_FILE)) throw Error('Operation cancelled; last verified index preserved');
}
function safeRelative(path:unknown):path is string {
  return typeof path === 'string' && path.length>0 && !path.startsWith('/') && !path.includes('\\') && !/[\x00-\x1f\x7f]/.test(path) && path.split('/').every(p=>!!p && p!=='.' && p!=='..');
}
function checkedFile(root:string, rel:string):string {
  if (!safeRelative(rel) || !/\.md$/i.test(rel)) throw Error('Invalid Markdown path');
  let part = root;
  for (const component of rel.split('/')) { part=join(part,component); if (lstatSync(part).isSymbolicLink()) throw Error('Symbolic link excluded'); }
  const stat=lstatSync(part);
  if (!stat.isFile() || stat.size>2_000_000 || realpathSync(part)!==part) throw Error('Unavailable, oversized or non-regular Markdown');
  // Refuse a sparse/dataless placeholder before a read could hydrate it.
  if (stat.size>0 && stat.blocks===0) throw Error('Markdown is not locally materialized');
  return part;
}
/** Scan here rather than trusting a possibly truncated UI scan. Hidden/build
 * trees and the independent write-through memory source are intentionally out. */
export function inventory(root:string):string[] {
  const files:string[]=[];
  function walk(directory:string, prefix:string):void {
    cancelled();
    for (const entry of readdirSync(directory, {withFileTypes:true}).sort((a,b)=>a.name.localeCompare(b.name))) {
      const rel=prefix ? prefix+'/'+entry.name : entry.name;
      if (entry.name.startsWith('.') || isOwnedMemory(rel)) continue;
      if (entry.isSymbolicLink()) throw Error('Symbolic link in index scope: '+rel);
      if (entry.isDirectory()) { if (!EXCLUDED_DIRS.has(entry.name)) walk(join(directory,entry.name),rel); }
      else if (/\.md$/i.test(entry.name)) { checkedFile(root,rel); files.push(rel); }
      if (files.length>60000) throw Error('Index inventory exceeds 60000 Markdown files');
    }
  }
  walk(root,''); return files.sort();
}
function loadReceipt(path:string, root:string):any|null {
  if (!existsSync(path)) return null;
  if (lstatSync(path).isSymbolicLink()) throw Error('Receipt symlink refused');
  const doc=JSON.parse(readFileSync(path,'utf8'));
  if (doc.root!==root || (doc.source && doc.source!==SOURCE) || !Array.isArray(doc.records)) throw Error('Index receipt belongs to a different source/target');
  if (doc.schema_version===2) {
    const {receipt_sha256,...payload}=doc;
    if (receipt_sha256!==sha(canonical(payload))) throw Error('Index receipt hash mismatch');
  } else if (doc.schema_version!==undefined && doc.schema_version!==1) throw Error('Unsupported index receipt');
  const paths=new Set(),slugs=new Set();
  for (const row of doc.records) {
    if (!safeRelative(row.path) || typeof row.slug!=='string' || !/^[0-9a-f]{64}$/.test(row.sha256) || paths.has(row.path) || slugs.has(row.slug)) throw Error('Invalid ownership receipt');
    paths.add(row.path);slugs.add(row.slug);
  }
  return doc;
}
function seal(payload:any):any { return {...payload, receipt_sha256:sha(canonical(payload))}; }
function expectedIdentity(path:string, bytes:Buffer):{slug:string;externalId:string|null} {
  if (hasMalformedPathSegment(path)) throw Error('Malformed Markdown filename');
  const parsed=parseMarkdown(bytes.toString('utf8'),path,{validate:true});
  if (parsed.errors?.some(e=>e.code==='YAML_PARSE')) throw Error('Invalid YAML frontmatter');
  const expected=slugifyPath(path);
  if (expected && parsed.slug!==expected && slugifyPath(parsed.slug)!==expected) throw Error('Frontmatter slug conflicts with canonical path');
  return {slug:validateSlug(parsed.slug || expected),externalId:typeof parsed.frontmatter?.id==='string' && parsed.frontmatter.id ? parsed.frontmatter.id : null};
}
export async function indexVault(engine:BrainEngine, input:any):Promise<any> {
  const profileInput=process.env.GBRAIN_HOME, receiptDir=process.env.ORACLE_RECEIPT_DIR;
  if (!profileInput || !receiptDir || input.source!==SOURCE) throw Error('Indexing requires the isolated Oracle-owned profile');
  const profile=realpathSync(profileInput);
  const markerPath=join(profile,'oracle-owned.json');
  if (!existsSync(markerPath) || lstatSync(markerPath).isSymbolicLink()) throw Error('Missing Oracle profile ownership');
  const owner=JSON.parse(readFileSync(markerPath,'utf8'));
  const requested=resolve(String(input.root));
  const root=realpathSync(requested);
  if (lstatSync(requested).isSymbolicLink() || requested!==root || owner.owner!=='OracleCompanion' || owner.vault_root!==root || owner.schema_version!==2) throw Error('Source/target ownership mismatch');
  if (root===profile || root.startsWith(profile+'/') || profile.startsWith(root+'/')) throw Error('Index source overlaps its profile');
  const sources=await engine.listAllSources();
  const derived=sources.find(s=>s.id===SOURCE), memory=sources.find(s=>s.id==='oracle-memory');
  if (!derived || derived.local_path) throw Error('oracle-vault must be an isolated derived source, not a write-through target');
  const memoryRoot=join(root,MEMORY);
  if (!memory || memory.local_path!==memoryRoot || realpathSync(memoryRoot)!==memoryRoot || lstatSync(join(root,'INBOX')).isSymbolicLink() || lstatSync(memoryRoot).isSymbolicLink()) throw Error('Memory write-through target changed');
  const stateRoot=resolve(profile,'../..');
  if (resolve(receiptDir)!==join(stateRoot,'events')) throw Error('Receipt destination must stay inside Oracle state');
  if (input.force!==undefined && typeof input.force!=='boolean') throw Error('force must be boolean');
  if (process.env.ORACLE_PLAN_EVENTS_DIR && (!/^[a-f0-9-]{36}$/i.test(input.plan_ref||'') || resolve(process.env.ORACLE_PLAN_EVENTS_DIR)!==join(stateRoot,'setup/events',input.plan_ref))) throw Error('Plan event target changed');
  for (const path of [receiptDir,process.env.ORACLE_PLAN_EVENTS_DIR].filter(Boolean) as string[]) {
    let cursor=path;
    while (cursor!==stateRoot) {if (existsSync(cursor) && lstatSync(cursor).isSymbolicLink()) throw Error('Event directory symlink refused');cursor=dirname(cursor);}
  }
  const manifestPath=join(profile,'oracle-vault-manifest.json'), pendingPath=join(profile,'oracle-vault-pending.json');
  const previous=loadReceipt(manifestPath,root), pending=loadReceipt(pendingPath,root);
  const owned=new Map<string,Row>((previous?.records || []).map((r:Row)=>[r.slug,r]));
  for (const row of pending?.records || []) owned.set(row.slug,row);
  const run=randomUUID(), now=()=>new Date().toISOString();
  const records:Row[]=[], failures:{path:string;error:string}[]=[];
  let changed=0, unchanged=0, removed=0, links=0;
  let files:string[]=[];
  const event=(type:string,completed:number,summary:string)=>{
    const id=sha(run+type+completed),at=now();
    const doc={schema_version:1,event_id:id,sequence:Date.now()*1000,source:'gbrain',event_type:type,phase:'index',completed,total:files.length,run_id:run,plan_ref:input.plan_ref||null,received_at:at,occurred_at:at,sanitized_summary:summary,coverage:'derived-vault-source',observed_status:type.endsWith('failed')?'failed':'verified'};
    atomic(join(receiptDir,id+'.json'),doc);
    if (process.env.ORACLE_PLAN_EVENTS_DIR) atomic(join(process.env.ORACLE_PLAN_EVENTS_DIR,id+'.json'),doc);
  };
  // getPage in the pinned release deliberately omits source_path. Resolve
  // path ownership through the official source-scoped batch API instead.
  const ownsPath=async (row:Row)=>(await engine.resolveSlugsByPaths([row.path],scope)).get(row.path)===row.slug;
  const savePending=()=>atomic(pendingPath,seal({schema_version:2,source:SOURCE,root,records:[...owned.values()].sort((a,b)=>a.path.localeCompare(b.path)),run_id:run,complete:false,at:now()}));
  try {
    files=inventory(root);
    if (input.files!==undefined) {
      if (!Array.isArray(input.files) || input.files.some((r:any)=>!safeRelative(r))) throw Error('Invalid requested inventory');
      const requestedFiles=input.files.filter((r:string)=>!isOwnedMemory(r)).sort();
      if (canonical(requestedFiles)!==canonical(files)) throw Error('Incomplete or stale inventory; deletion reconciliation refused');
    }
    // Entire input is preflighted before any page changes, including collisions.
    const slugs=new Set<string>(), externalIds=new Map<string,string>(), ownedRenameTargets=new Set<string>();
    for (const rel of files) {
      const path=checkedFile(root,rel),bytes=readFileSync(path),{slug,externalId}=expectedIdentity(rel,bytes);
      if (externalId) {if(externalIds.has(externalId)) throw Error('Duplicate frontmatter identity in source inventory');externalIds.set(externalId,slug);}
      if (slugs.has(slug)) throw Error('Source-path slug collision: '+rel);
      slugs.add(slug); records.push({path:rel,slug,sha256:sha(bytes),canonical_path:path});
    }
    const wantedPaths=new Set(files);
    for (const row of records) {
      const page=await engine.getPage(row.slug,scope), old=owned.get(row.slug);
      if (page) {
        if (!old || !(await ownsPath(old)) || (old.page_hash && old.page_hash!==page.content_hash)) throw Error('Derived page changed without an ownership receipt: '+row.path);
        if (old.path!==row.path && wantedPaths.has(old.path)) throw Error('Rename conflicts with existing source: '+row.path);
      }
    }
    for (const old of owned.values()) if (!slugs.has(old.slug)) {
      const page=await engine.getPage(old.slug,scope);
      if (page && (!(await ownsPath(old)) || (old.page_hash && old.page_hash!==page.content_hash))) throw Error('Deletion requires reconciliation of edited index row: '+old.path);
      const target=typeof page?.frontmatter?.id==='string' ? externalIds.get(page.frontmatter.id) : undefined;
      if (target) ownedRenameTargets.add(target);
    }
    event('gbrain.index_started',0,'Inventário completo validado; sincronização incremental iniciada');
    for (const row of records) {
      cancelled();
      const old=owned.get(row.slug),page=await engine.getPage(row.slug,scope);
      if (!input.force && old?.path===row.path && old.sha256===row.sha256 && old.page_hash && page?.content_hash===old.page_hash && (await ownsPath(row))) {
        row.page_hash=old.page_hash;unchanged++;continue;
      }
      if (sha(readFileSync(checkedFile(root,row.path)))!==row.sha256) throw Error('Source changed while indexing: '+row.path);
      const result=await importFromFile(engine,row.canonical_path,row.path,{noEmbed:true,sourceId:SOURCE,forceRechunk:input.force===true || ownedRenameTargets.has(row.slug) || (!!page && !(await ownsPath(row)))});
      if (result.status==='error' || result.error || result.slug!==row.slug) throw Error('Official importer rejected '+row.path+': '+(result.error || 'path identity mismatch'));
      const verified=await engine.getPage(row.slug,scope);
      if (!verified || !(await ownsPath(row)) || sha(readFileSync(checkedFile(root,row.path)))!==row.sha256) throw Error('Source/page changed during read-back: '+row.path);
      row.page_hash=verified.content_hash; owned.set(row.slug,row); changed++; savePending();
      if ((changed+unchanged)%25===0) event('gbrain.file_verified',changed+unchanged,`${changed+unchanged} documentos verificados`);
    }
    // Rescan before destructive derived-index reconciliation. A read failure,
    // rename, iCloud placeholder or edit never masquerades as a deleted note.
    if (canonical(inventory(root))!==canonical(files)) throw Error('Inventory changed; deletion reconciliation postponed');
    for (const row of records) if (sha(readFileSync(checkedFile(root,row.path)))!==row.sha256) throw Error('Source changed before reconciliation: '+row.path);
    for (const old of [...owned.values()]) if (!slugs.has(old.slug)) {
      cancelled();const page=await engine.getPage(old.slug,scope);
      if (page) {
        if (!(await ownsPath(old)) || (old.page_hash && old.page_hash!==page.content_hash)) throw Error('Edited row preserved: '+old.path);
        await engine.deletePage(old.slug,scope);removed++;
      }
      owned.delete(old.slug);savePending();
    }
    const inventoryChanged=canonical((previous?.records||[]).map((r:Row)=>[r.path,r.slug,r.sha256]))!==canonical(records.map(r=>[r.path,r.slug,r.sha256]));
    const topologyChanged=changed>0 || removed>0 || inventoryChanged || !!pending || previous?.schema_version!==2;
    const unresolved:any[]=[];
    if (topologyChanged) {
      // Rebuild only explicit source-local edges after a changed topology. An
      // entirely unchanged run performs no page/chunk/link writes at all.
      const managed=records.map(r=>({slug:r.slug,source_id:SOURCE}));
      for (let i=0;i<managed.length;i+=500) for (const linkSource of ['markdown','frontmatter','wikilink-resolved']) await engine.removeLinksByPagesAndSource(managed.slice(i,i+500),{linkSource});
      const resolver=makeResolver(engine,{mode:'batch',sourceId:SOURCE});
      const byPath=new Map(records.map(r=>[r.path,r.slug]));
      for (const row of records) {
        cancelled();const page=await engine.getPage(row.slug,scope);if (!page) throw Error('Page disappeared during links');
        const extracted=await extractPageLinks(page.slug,canonicalizeLocalLinks(page.compiled_truth,row.path,byPath),page.frontmatter,page.type,resolver,{globalBasename:false});
        for (const link of extracted.candidates) {
          if (!hasKnownEndpoints(link,page.slug,slugs)) { unresolved.push({path:row.path,target:link.targetSlug});continue; }
          await engine.addLink(link.fromSlug||page.slug,link.targetSlug,link.context,link.linkType,link.linkSource||'markdown',link.originSlug,link.originField,{fromSourceId:SOURCE,toSourceId:SOURCE,originSourceId:SOURCE});links++;
        }
      }
    } else links=previous?.explicit_links || 0;
    const noOp=!topologyChanged;
    const manifest=seal({schema_version:2,source:SOURCE,root,records,run_id:run,complete:true,at:now(),excluded_sources:[MEMORY],changed,unchanged,no_op:noOp,removed_from_derived_index:removed,explicit_links:links,unresolved_link_count:topologyChanged?unresolved.length:previous?.unresolved_link_count||0,unresolved_links:topologyChanged?unresolved.slice(0,200):previous?.unresolved_links||[]});
    atomic(manifestPath,manifest);if (existsSync(pendingPath)) unlinkSync(pendingPath);
    event('gbrain.index_verified',records.length,`${records.length} documentos verificados; ${changed} atualizados, ${unchanged} inalterados`);
    return {total:files.length,verified:records.length,complete:true,no_op:noOp,changed,unchanged,failures:[],explicit_links:links,removed_from_derived_index:removed,receipt_sha256:manifest.receipt_sha256,manifest_file_sha256:sha(readFileSync(manifestPath))};
  } catch (error) {
    failures.push({path:'',error:String(error instanceof Error?error.message:error).replace(/(?:postgres(?:ql)?|https?):\/\/\S+/gi,'[endpoint omitted]').slice(0,500)});
    event('gbrain.index_failed',changed+unchanged,'Sincronização não concluída; último recibo completo preservado');
    return {total:files.length,verified:changed+unchanged,complete:false,changed,unchanged,failures,stable_manifest_preserved:true};
  }
}
