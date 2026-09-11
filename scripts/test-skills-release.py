#!/usr/bin/env python3
"""Synthetic, offline release-builder regression tests; no publisher is invoked."""
import base64
import hashlib
import json
import os
from pathlib import Path
import shutil
import subprocess
import sys
import tempfile

ROOT=Path(__file__).resolve().parent.parent
SCRIPT=ROOT/'scripts/build-skills-release.py'


def main():
    scratch=ROOT/'.work/release-tests';scratch.mkdir(parents=True,exist_ok=True)
    base=Path(tempfile.mkdtemp(prefix='run-',dir=scratch));checks=[]
    try:
        source=base/'source';folder=source/'SISTEMA/skills/code/example';folder.mkdir(parents=True)
        expected={'SISTEMA/skills/code/example/SKILL.md':b'---\nname: fixture\n---\n# Fixture\n',
                  'SISTEMA/skills/code/LICENSE':b'MIT fixture license\n',
                  'SISTEMA/skills/code/example/ref.sql':b'-- public reference; never executed\n',
                  'SISTEMA/skills/code/example/image.png':b'\x89PNG\r\n\x1a\nfixture',
                  'SISTEMA/skills/code/example/diagram.svg':b'<svg xmlns="http://www.w3.org/2000/svg"/>',
                  'SISTEMA/skills/code/example/task.sh':b'#!/bin/sh\nexit 99\n'}
        for name,data in expected.items():(source/name).write_bytes(data)
        output=base/'oracle-skills.json'
        env={'PATH':'/usr/bin:/bin:/usr/sbin:/sbin','HOME':str(base/'home'),'TMPDIR':str(base/'tmp'),'PYTHONDONTWRITEBYTECODE':'1'}
        for name in ('home','tmp'):(base/name).mkdir()
        def check(name,condition):
            if not condition:raise AssertionError(name)
            checks.append(name);print('PASS '+name,flush=True)
        def build(src=source,out=output,version='fixture-v2'):
            return subprocess.run([sys.executable,str(SCRIPT),'--source',str(src),'--version',version,'--output',str(out)],env=env,cwd=base,capture_output=True,text=True,timeout=30)
        result=build();check('complete v2 release builds without running source scripts',result.returncode==0)
        stable=output.read_bytes();payload=json.loads(stable)
        check('schema and compatibility explicitly versioned',payload['schema_version']==2 and payload['oracle_compatibility']=='0.3')
        actual={r['path']:base64.b64decode(r['content_base64']) for r in payload['files']}
        check('license images SQL and scripts preserved byte for byte',actual==expected)
        check('all files carry verified checksums',all(hashlib.sha256(actual[r['path']]).hexdigest()==r['sha256'] for r in payload['files']))
        check('same snapshot creates deterministic asset',build().returncode==0 and output.read_bytes()==stable)
        check('source inside output scope cannot be overwritten',build(out=source/'release.json').returncode!=0 and not (source/'release.json').exists())
        for name,data in [('unsupported.bin',b'opaque'),('private.md',b'-----BEGIN PRIVATE KEY-----\nsynthetic\n'),('large.txt',b'x'*2_000_001)]:
            bad=folder/name;bad.write_bytes(data);failed=build()
            check('reject '+name+' without replacing prior output',failed.returncode!=0 and output.read_bytes()==stable)
            if name=='private.md':check('secret diagnostic does not include matching content','synthetic' not in failed.stderr and 'BEGIN PRIVATE' not in failed.stderr)
            bad.unlink()
        empty=base/'empty';(empty/'SISTEMA/skills').mkdir(parents=True)
        check('empty source cannot erase a release',build(src=empty).returncode!=0 and output.read_bytes()==stable)
        check('missing source fails closed',build(src=base/'missing').returncode!=0)
        alias=base/'alias';alias.symlink_to(source,target_is_directory=True)
        check('source symlink rejected before file reads',build(src=alias).returncode!=0)
        nested=base/'nested-alias';nested.mkdir();(nested/'SISTEMA').symlink_to(source/'SISTEMA',target_is_directory=True)
        check('SISTEMA ancestor symlink rejected',build(src=nested).returncode!=0 and output.read_bytes()==stable)
        (nested/'SISTEMA').unlink();(nested/'SISTEMA').mkdir();(nested/'SISTEMA/skills').symlink_to(source/'SISTEMA/skills',target_is_directory=True)
        check('skills root symlink rejected',build(src=nested).returncode!=0 and output.read_bytes()==stable)
        secret_name='sk-proj-'+('a'*48)
        named=folder/(secret_name+'.md');named.write_bytes(b'public fixture')
        named_result=build();named.unlink()
        check('credential-like filenames refused without echoing their value',named_result.returncode!=0 and secret_name not in named_result.stdout+named_result.stderr and output.read_bytes()==stable)
        named=folder/secret_name;named.mkdir()
        named_result=build();named.rmdir()
        check('credential-like directory names refused without echoing their value',named_result.returncode!=0 and secret_name not in named_result.stdout+named_result.stderr and output.read_bytes()==stable)
        linked=folder/'linked.md';linked.symlink_to(folder/'SKILL.md')
        check('nested file symlink refused',build().returncode!=0);linked.unlink()
        os.link(folder/'SKILL.md',linked)
        check('hardlink refused',build().returncode!=0);linked.unlink()
        check('invalid version rejected',build(version='bad\nversion').returncode!=0)
        # The macOS flag is modeled without touching iCloud or requesting hydration.
        wrapper='''import pathlib,runpy,sys
original=pathlib.Path.lstat
class Flagged:
 def __init__(self,value):self.value=value;self.st_flags=0x40000000
 def __getattr__(self,name):return getattr(self.value,name)
def lstat(self,*a,**kw):
 value=original(self,*a,**kw)
 return Flagged(value) if self.name=="SKILL.md" else value
pathlib.Path.lstat=lstat
sys.argv=sys.argv[1:]
runpy.run_path(sys.argv[0],run_name="__main__")
'''
        modeled=dict(env);modeled['PYTHONPATH']=str(ROOT/'scripts')
        r=subprocess.run([sys.executable,'-c',wrapper,str(SCRIPT),'--source',str(source),'--version','fixture','--output',str(output)],env=modeled,cwd=base,capture_output=True,text=True,timeout=30)
        check('dataless preflight refuses without hydration',r.returncode!=0 and 'Dataless' in r.stderr and output.read_bytes()==stable)
        report={'count':len(checks),'checks':checks,'synthetic':True,'source_scripts_executed':False,'published':False}
        (scratch/'result.json').write_text(json.dumps(report,indent=2));print(json.dumps(report),flush=True)
    finally:shutil.rmtree(base)


if __name__=='__main__':main()
