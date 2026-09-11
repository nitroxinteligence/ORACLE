import {readFileSync,existsSync,realpathSync} from 'node:fs';
import {join} from 'node:path';
import {scopedNote,sha} from './scope.ts';

export function readCompleteManifest(profile=process.env.GBRAIN_HOME){
  if(!profile)return null;
  const path=join(profile,'oracle-vault-manifest.json');
  if(!existsSync(path))return null;
  const manifest=JSON.parse(readFileSync(path,'utf8'));
  if(manifest.complete!==true||!Array.isArray(manifest.records)||manifest.records.length>60_000||typeof manifest.root!=='string')return null;
  return manifest;
}
export function indexFreshness(){
  const profile=process.env.GBRAIN_HOME;
  if(!profile)return {state:'unavailable',complete:false};
  const manifest=readCompleteManifest(profile);
  const partial=existsSync(join(profile,'oracle-vault-checkpoint.json'));
  // Only the native watcher can attest a whole live snapshot. This receipt is
  // historical evidence, not an assertion that no external edit occurred later.
  return {state:partial?'partial':manifest?'snapshot_verified':'stale',complete:!!manifest&&!partial,
          verified_at:manifest?.at||null,generation:manifest?.generation??null};
}
export function assertFreshPage(page:any){
  if(!page||page.source_id!=='oracle-vault')return page;
  const manifest=readCompleteManifest();
  const record=manifest?.records.find((r:any)=>r.slug===page.slug);
  if(!record||typeof record.indexed_content_hash!=='string'||!/^[a-f0-9]{64}$/.test(record.indexed_content_hash)||record.indexed_content_hash!==page.content_hash)throw Error('Derived index is stale or partial. Synchronize before opening this note; the canonical file is preserved.');
  const root=realpathSync(manifest.root),path=scopedNote(root,record.path);
  if(sha(readFileSync(path))!==record.sha256)throw Error('Canonical note changed after indexing. Synchronize before opening this result.');
  return {...page,canonical_path:path,indexed_hash:record.sha256,index_verified_at:manifest.at,freshness:'current_at_read'};
}
