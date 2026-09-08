#!/usr/bin/env python3
"""Package only public, pinned skill sources; never copy the personal vault."""
import pathlib,json,tarfile,hashlib,re,shutil,os
ROOT=pathlib.Path(__file__).resolve().parent.parent
SOURCES=json.loads((ROOT/'docs/evidence/catalog-sources.json').read_text())
OUT=ROOT/'Resources/catalog';OUT.mkdir(parents=True,exist_ok=True)
VAULT=pathlib.Path(os.environ['ORACLE_INVENTORY_ROOT']) if os.environ.get('ORACLE_INVENTORY_ROOT') else None
sha=lambda b:hashlib.sha256(b).hexdigest()
manifest={'schema_version':1,'collections':[],'entries':[],'files':[]}
report={'source':'authorized OS skill inventory','observed':{},'upstream':{},'local_changes':[]}
allowed={'.md','.py','.sh','.js','.ts','.json','.yaml','.yml','.txt','.toml','.html','.css','.sql','.svg','.png','.jpg','.jpeg','.webp'}
for spec in SOURCES:
 category=spec['collection'];archive=pathlib.Path('/tmp/oracle-catalog-archives')/(category+'.tar.gz')
 with tarfile.open(archive,'r:gz') as tar:
  members={str(pathlib.PurePosixPath(m.name).relative_to(pathlib.PurePosixPath(m.name).parts[0])):m for m in tar.getmembers() if m.isfile()}
  skill_paths=sorted(p for p in members if p.endswith('/SKILL.md') and not any(x.startswith('.') for x in pathlib.PurePosixPath(p).parts))
  parents=[str(pathlib.PurePosixPath(p).parent)+'/' for p in skill_paths]
  local=list((VAULT/category).rglob('SKILL.md')) if VAULT else [];report['observed'][category]=len(local) if VAULT else None;report['upstream'][category]=len(skill_paths)
  root_license=next((p for p in ['LICENSE','LICENSE.md','LICENSE.txt'] if p in members),None)
  if root_license is None:raise RuntimeError(f'Missing license: {category}')
  root_license_bytes=tar.extractfile(members[root_license]).read()
  root_spdx='Apache-2.0' if b'Apache License' in root_license_bytes else 'MIT' if b'MIT License' in root_license_bytes else 'unresolved'
  if root_spdx=='unresolved':raise RuntimeError(f'Unresolved license: {category}')
  collection={'id':category,'repo':spec['repo'],'commit':spec['commit'],'license':root_spdx,'skill_count':len(skill_paths),'archive_sha256':sha(archive.read_bytes())}
  manifest['collections'].append(collection)
  for rel,m in members.items():
   parts=pathlib.PurePosixPath(rel).parts
   if not parts or '..' in parts or rel.startswith('/') or any(p.startswith('.') for p in parts):continue
   if any(p in {'node_modules','vendor','dist','test','tests','fixtures','evals','bench','state','memory','conversations'} for p in parts):continue
   if pathlib.PurePosixPath(rel).suffix.lower() not in allowed and 'LICENSE' not in parts[-1] and 'NOTICE' not in parts[-1]:continue
   within_skill=any(rel.startswith(parent) for parent in parents)
   shared=('_shared' in parts or parts[0] in {'references','templates','scripts','assets'})
   legal='LICENSE' in parts[-1] or 'NOTICE' in parts[-1]
   if not (within_skill or shared or legal):continue
   if m.size>5_000_000:continue
   data=tar.extractfile(m).read()
   if b'/Users/' in data and b'OracleGBrain/secrets' in data:raise RuntimeError(f'Personal path in upstream file: {category}/{rel}')
   dest=OUT/'packs'/category/rel;dest.parent.mkdir(parents=True,exist_ok=True);dest.write_bytes(data);dest.chmod(0o755 if m.mode&0o111 else 0o644)
   manifest['files'].append({'path':f'packs/{category}/{rel}','sha256':sha(data),'size':len(data)})
  for rel in skill_paths:
   data=tar.extractfile(members[rel]).read();text=data.decode('utf-8');name=re.search(r'^name:\s*[\'"]?([^\n\'"]+)',text,re.M);description=re.search(r'^description:\s*(.*)',text,re.M);license_match=re.search(r'^license:\s*[\'"]?([^\n\'"]+)',text,re.M)
   local_path=VAULT/category/rel if VAULT else None;local_hash=sha(local_path.read_bytes()) if local_path and local_path.exists() else None
   if VAULT and local_hash!=sha(data):report['local_changes'].append({'collection':category,'path':rel,'reason':'local runtime adaptation or missing path','upstream_sha256':sha(data)})
   packed=OUT/'packs'/category/rel
   if not packed.exists():raise RuntimeError(f'Entrypoint not packaged: {rel}')
   manifest['entries'].append({'id':category+':'+rel,'collection':category,'name':name.group(1).strip() if name else pathlib.PurePosixPath(rel).parent.name,'description':description.group(1).strip(' \"\'') if description else '', 'path':f'packs/{category}/{rel}','source_path':rel,'sha256':sha(data),'license':license_match.group(1).strip() if license_match else root_spdx,'repo':spec['repo'],'commit':spec['commit'],'codex_status':'not_installed'})
for category in ['contents','personal-branding']:
 report['observed'][category]=len(list((VAULT/category).rglob('SKILL.md'))) if VAULT else None
 manifest['collections'].append({'id':category,'skill_count':0,'license':None,'repo':None,'commit':None})
# Some Gentle entries explicitly carry Apache-2.0 despite the root MIT license.
apache=(OUT/'packs/cyber-security/LICENSE').read_bytes()
for category in sorted({e['collection'] for e in manifest['entries'] if e['license']=='Apache-2.0'}):
    relative=f'packs/{category}/ORACLE-LICENSES/Apache-2.0.txt'
    destination=OUT/relative;destination.parent.mkdir(parents=True,exist_ok=True);destination.write_bytes(apache)
    manifest['files'].append({'path':relative,'sha256':sha(apache),'size':len(apache)})
(OUT/'manifest.json').write_text(json.dumps(manifest,ensure_ascii=False,indent=2))
(ROOT/'docs/evidence/catalog-audit.json').write_text(json.dumps(report,ensure_ascii=False,indent=2))
print(json.dumps({'observed':report['observed'],'packaged_entries':len(manifest['entries']),'packaged_files':len(manifest['files']),'local_runtime_differences':len(report['local_changes'])},ensure_ascii=False))
