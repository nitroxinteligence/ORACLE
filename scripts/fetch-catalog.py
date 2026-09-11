#!/usr/bin/env python3
"""Fetch immutable public pins. A cache entry is repo+commit, never collection alone."""
from __future__ import annotations
import hashlib, json, os, pathlib, re, urllib.request, uuid

ROOT=pathlib.Path(__file__).resolve().parent.parent
MAX_ARCHIVE=128_000_000

def validate_spec(spec):
    collection=spec.get('collection','')
    repo=spec.get('repo','').removeprefix('https://github.com/')
    commit=spec.get('commit','')
    if not re.fullmatch(r'[a-z][a-z0-9]*(?:[-_][a-z0-9]+)*',collection) or len(collection)>64:
        raise ValueError('Invalid specialist identifier')
    if not re.fullmatch(r'[A-Za-z0-9_.-]+/[A-Za-z0-9_.-]+',repo) or not re.fullmatch(r'[a-f0-9]{40}',commit):
        raise ValueError('Invalid immutable GitHub source pin')
    if any(piece in ('.','..') for piece in repo.split('/')): raise ValueError('Invalid repository')
    expected=spec.get('archive_sha256')
    if expected is not None and not re.fullmatch(r'[a-f0-9]{64}',expected): raise ValueError('Invalid archive checksum pin')
    return collection,repo,commit

def cache_paths(spec,cache):
    collection,repo,commit=validate_spec(spec)
    key=f'{collection}-{hashlib.sha256(repo.encode()).hexdigest()[:16]}-{commit}'
    return pathlib.Path(cache)/(key+'.tar.gz'),pathlib.Path(cache)/(key+'.receipt.json')

def file_hash(path):
    if path.is_symlink() or path.stat().st_size>MAX_ARCHIVE: raise ValueError('Invalid archive size or symbolic cache entry')
    result=hashlib.sha256()
    with path.open('rb') as stream:
        while block:=stream.read(1024*1024): result.update(block)
    return result.hexdigest()

def read_cache(spec,cache):
    archive,receipt=cache_paths(spec,cache)
    if not archive.exists() and not receipt.exists(): raise FileNotFoundError(archive)
    if receipt.is_symlink() or not receipt.exists() or receipt.stat().st_size>4096:
        raise ValueError('Missing or invalid cache receipt; do not reuse this archive')
    saved=json.loads(receipt.read_text())
    _,repo,commit=validate_spec(spec)
    actual=file_hash(archive)
    if saved.get('repo')!=repo or saved.get('commit')!=commit or saved.get('sha256')!=actual or saved.get('size')!=archive.stat().st_size:
        raise ValueError('Corrupted cache or mismatched immutable source pin')
    if spec.get('archive_sha256') not in (None,actual): raise ValueError('Archive does not match the source checksum pin')
    return archive

def atomic_write(path,data):
    temporary=path.with_name(path.name+'.'+uuid.uuid4().hex+'.tmp')
    try:
        with temporary.open('xb') as output:
            output.write(data);output.flush();os.fsync(output.fileno())
        temporary.replace(path)
    finally:
        if temporary.exists(): temporary.unlink()

class PublicGitHubRedirect(urllib.request.HTTPRedirectHandler):
    def redirect_request(self,request,fp,code,message,headers,url):
        from urllib.parse import urlsplit
        parsed=urlsplit(url)
        if parsed.scheme!='https' or parsed.hostname not in ('api.github.com','github.com','codeload.github.com','objects.githubusercontent.com'):
            raise ValueError('Archive redirect left the public GitHub allowlist')
        return super().redirect_request(request,fp,code,message,headers,url)

def fetch_one(spec,cache):
    cache=pathlib.Path(cache)
    if cache.is_symlink(): raise ValueError('Symbolic catalog cache is not writable')
    cache.mkdir(parents=True,exist_ok=True,mode=0o700)
    archive,receipt=cache_paths(spec,cache)
    if archive.exists() or receipt.exists(): return read_cache(spec,cache)
    _,repo,commit=validate_spec(spec)
    request=urllib.request.Request(f'https://api.github.com/repos/{repo}/tarball/{commit}',headers={'User-Agent':'Oracle-catalog-build/0.2'})
    temporary=archive.with_name(archive.name+'.'+uuid.uuid4().hex+'.part')
    try:
        size=0
        with urllib.request.build_opener(PublicGitHubRedirect()).open(request,timeout=60) as response,temporary.open('xb') as output:
            while data:=response.read(1024*1024):
                size+=len(data)
                if size>MAX_ARCHIVE: raise ValueError('Archive exceeds download budget')
                output.write(data)
            output.flush();os.fsync(output.fileno())
        actual=file_hash(temporary)
        if spec.get('archive_sha256') not in (None,actual): raise ValueError('Downloaded archive checksum mismatch')
        temporary.replace(archive)
        atomic_write(receipt,json.dumps({'schema_version':1,'repo':repo,'commit':commit,'sha256':actual,'size':size},sort_keys=True).encode())
        return read_cache(spec,cache)
    finally:
        if temporary.exists(): temporary.unlink()

if __name__=='__main__':
    sources=pathlib.Path(os.environ.get('ORACLE_CATALOG_SOURCES',ROOT/'docs/evidence/catalog-sources.json'))
    cache=pathlib.Path(os.environ.get('ORACLE_CATALOG_CACHE',ROOT/'.work/catalog-archives'))
    specs=json.loads(sources.read_text());seen=set()
    for spec in specs:
        collection,_,commit=validate_spec(spec)
        if collection in seen: raise ValueError('Duplicate specialist identifier')
        seen.add(collection)
        print('Verified',collection,commit,fetch_one(spec,cache))
