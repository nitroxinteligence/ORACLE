#!/usr/bin/env python3
"""Download only pinned, public GitHub archives into a temporary build cache."""
import pathlib,json,re,urllib.request,os
root=pathlib.Path(__file__).resolve().parent.parent
cache=pathlib.Path('/tmp/oracle-catalog-archives');cache.mkdir(exist_ok=True)
for spec in json.loads((root/'docs/evidence/catalog-sources.json').read_text()):
    repo=spec['repo'].removeprefix('https://github.com/')
    if not re.fullmatch(r'[A-Za-z0-9_.-]+/[A-Za-z0-9_.-]+',repo) or not re.fullmatch(r'[a-f0-9]{40}',spec['commit']):raise RuntimeError('Invalid pinned source')
    dest=cache/(spec['collection']+'.tar.gz')
    if dest.exists():continue
    req=urllib.request.Request(f'https://api.github.com/repos/{repo}/tarball/{spec["commit"]}',headers={'User-Agent':'Oracle-build/0.1'})
    tmp=dest.with_suffix('.part.'+str(os.getpid()))
    with urllib.request.urlopen(req,timeout=60) as response,tmp.open('wb') as output:
        while data:=response.read(1024*1024):output.write(data)
    tmp.replace(dest)
    print('Downloaded',spec['collection'],spec['commit'][:12])
