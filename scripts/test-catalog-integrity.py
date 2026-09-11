#!/usr/bin/env python3
"""Synthetic, offline tests for immutable cache identity and dynamic catalogs."""
import hashlib,io,json,os,pathlib,runpy,subprocess,sys,tarfile,uuid

ROOT=pathlib.Path(__file__).resolve().parents[1]
BASE=ROOT/'.work/data-build/fixtures'/('catalog-'+uuid.uuid4().hex)
BASE.mkdir(parents=True)
api=runpy.run_path(str(ROOT/'scripts/fetch-catalog.py'))
CACHE=BASE/'cache';CACHE.mkdir()
SPEC={'collection':'research-lab','repo':'https://github.com/fixture/public-skills','commit':'a'*40}
passed=[]
def expect(ok,name):
    if not ok:raise AssertionError(name)
    passed.append(name);print('PASS',name,flush=True)
def rejects(name,operation):
    try:operation()
    except (ValueError,FileNotFoundError):expect(True,name);return
    raise AssertionError('Accepted: '+name)
def archive(spec,members):
    path,receipt=api['cache_paths'](spec,CACHE)
    with tarfile.open(path,'w:gz') as tar:
        for name,data in members.items():
            data=data.encode();member=tarfile.TarInfo(name);member.size=len(data);member.mode=0o644
            tar.addfile(member,io.BytesIO(data))
    _,repo,commit=api['validate_spec'](spec)
    receipt.write_text(json.dumps({'schema_version':1,'repo':repo,'commit':commit,'sha256':hashlib.sha256(path.read_bytes()).hexdigest(),'size':path.stat().st_size}))
    return path
def build(spec,out):
    source=BASE/('sources-'+uuid.uuid4().hex+'.json');source.write_text(json.dumps([spec]))
    environment={'PATH':'/usr/bin:/bin','HOME':str(BASE/'home'),'PYTHONDONTWRITEBYTECODE':'1',
                 'ORACLE_CATALOG_SOURCES':str(source),'ORACLE_CATALOG_CACHE':str(CACHE),
                 'ORACLE_CATALOG_OUTPUT':str(out),'ORACLE_CATALOG_REPORT':str(BASE/'report.json')}
    return subprocess.run([sys.executable,str(ROOT/'scripts/build-catalog.py')],cwd=ROOT,env=environment,
                          stdout=subprocess.PIPE,stderr=subprocess.PIPE,text=True,timeout=20)

members={'fixture-root/LICENSE':'MIT License\n\nCopyright Fixture\nPermission is hereby granted, free of charge.\n',
         'fixture-root/agents/research/SKILL.md':'---\nname: research\ndescription: Synthetic research specialist\n---\n# Fixture\n',
         'fixture-root/agents/research/tool.py':'print("fixture")\n'}
valid=archive(SPEC,members)
expect(api['read_cache'](SPEC,CACHE)==valid,'cache verifies source identity and SHA-256 receipt')
other_pin={**SPEC,'commit':'b'*40}
expect(api['cache_paths'](SPEC,CACHE)!=api['cache_paths'](other_pin,CACHE),'changing commit cannot reuse collection-named archive')
rejects('missing new pin refuses legacy cache fallback',lambda:api['read_cache'](other_pin,CACHE))
other_repo={**SPEC,'repo':'https://github.com/fixture/other-repository'}
expect(api['cache_paths'](SPEC,CACHE)!=api['cache_paths'](other_repo,CACHE),'same collection and commit in another repository has different cache identity')
rejects('traversal specialist identifier rejected',lambda:api['validate_spec']({**SPEC,'collection':'../escape'}))
rejects('nonimmutable commit rejected',lambda:api['validate_spec']({**SPEC,'commit':'main'}))
rejects('explicit checksum pin must match cached archive',lambda:api['read_cache']({**SPEC,'archive_sha256':'0'*64},CACHE))
original=valid.read_bytes();valid.write_bytes(original+b'corruption')
rejects('corrupted cache is never accepted',lambda:api['read_cache'](SPEC,CACHE))
valid.write_bytes(original)
output=BASE/'catalog';result=build(SPEC,output)
if result.returncode:raise AssertionError(result.stderr)
manifest=json.loads((output/'manifest.json').read_text())
expect(any(row['id']=='research-lab' for row in manifest['collections']) and len(manifest['entries'])==1,'dynamic specialist outside seven is discovered and packaged')
expect(all(hashlib.sha256((output/row['path']).read_bytes()).hexdigest()==row['sha256'] for row in manifest['files']),'all packaged bytes match integrity manifest')
bad={**SPEC,'collection':'unsafe','commit':'c'*40};archive(bad,{**members,'fixture-root/../escape.md':'not allowed'})
result=build(bad,BASE/'unsafe-output')
expect(result.returncode!=0 and not (BASE/'escape.md').exists(),'archive traversal rejected before extraction')
duplicate={**SPEC,'collection':'duplicate','commit':'d'*40};archive(duplicate,{**members,'fixture-root/agents/Research/SKILL.md':'collision'})
expect(build(duplicate,BASE/'duplicate-output').returncode!=0,'portable case-insensitive archive collisions rejected')
readonly=BASE/'shared-output';readonly.mkdir();(readonly/'packs').symlink_to(output/'packs',target_is_directory=True)
before=(output/'manifest.json').read_bytes()
expect(build(SPEC,readonly).returncode!=0 and (output/'manifest.json').read_bytes()==before,'read-only shared catalog symlink is never written through')
(ROOT/'.work/data-build/catalog-tests-result.json').write_text(json.dumps({'passed':len(passed),'checks':passed,'fixture':str(BASE)},indent=2))
print(json.dumps({'passed':len(passed),'fixture':str(BASE)}))
