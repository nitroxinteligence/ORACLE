#!/usr/bin/env python3
"""Official release qualification against pinned adapter on disposable profiles.
Does not update pins, install dependencies, mutate personal config or publish.
"""
import argparse
import hashlib
import json
import os
from pathlib import Path
import shutil
import signal
import subprocess
import sys
import time
import uuid

ROOT=Path(__file__).resolve().parents[1]
BASE=ROOT/'.work/gbrain-release-compatibility'
PIN='2efaaf8f8a817b5b82e023383618fdcdb1cc5f7d'
RELEASES={
 '0.60.13.0': {'commit':'6c8373c3de9bb321a3da0bfa2dc2140736aeafa5','sha256':'72cf6dedc3824d507598b397894e7191bfe910d1673c7433e628676f64479867','bun_requirement':'>=1.3.11'},
 '0.60.15.0': {'commit':'7ef5165b496217d0bdfadb377f1080a776eaee87','sha256':'ae1b6f7d9325e97a838be3789e16bbf14877e765f40fbe58d0c77a8109d57c3c','bun_requirement':'>=1.3.11'},
}
SANDBOX=['/usr/bin/sandbox-exec','-p','(version 1)(allow default)(deny network*)']
def sha(path):
 h=hashlib.sha256()
 with path.open('rb') as stream:
  for part in iter(lambda:stream.read(1024*1024),b''):h.update(part)
 return h.hexdigest()
def inventory(path):
 return {str(p.relative_to(path)):sha(p) for p in sorted(path.rglob('*')) if p.is_file() and p.name!='.gbrain-lock'}
def verify_report(path):
 path=path.resolve()
 if not path.is_relative_to(BASE.resolve()) or path.name!='report.json':raise RuntimeError('Explicit fixture report required')
 report=json.loads(path.read_text());fixture=Path(report['fixture'])
 if path.parent!=fixture or not report.get('network_denied') or report.get('personal_profiles') is not False:raise RuntimeError('Unverified fixture scope')
 for version,row in report['releases'].items():
  state=fixture/('candidate-'+version);profile=state/'gbrain/profile'
  journals=[json.loads(p.read_text()) for p in (state/'updates/runtime/generations').glob('*/journal.json')]
  rolled=[journal for journal in journals if journal.get('status')=='rolled_back']
  if not rolled:raise RuntimeError('No product rollback journal '+version)
  # Compare to the transaction's closed preimage. Opening PGLite BEFORE that
  # snapshot legitimately changes control/WAL files and is a separate claim.
  journal=max(rolled,key=lambda item:(state/'updates/runtime/generations'/item['id']/'journal.json').stat().st_mtime)
  protected={key:value['sha256'] for key,value in journal['original_inventory'].items()}
  row['rollback_protected_preimage_preserved']=inventory(profile)==protected
  row['fault_journal_status']=journal['status']
  row['transition_gate_remaining']=(state/'updates/runtime/transition.json').exists()
  schema=profile/'oracle-update-tmp/schema.log'
  if schema.exists():row['schema_log']=schema.read_text()[-8000:]
  row['rollback_storage_open_note']='Pre-open PGLite bytes may change when connecting; closed journal preimage is the rollback authority'
  if not row['rollback_protected_preimage_preserved'] or row['transition_gate_remaining']:raise RuntimeError('Rollback verification failed '+version)
 report['rollback_verified_from_closed_journals']=True
 report['observed_adapter_source_pin']=subprocess.check_output(['/usr/bin/git','-C',str(ROOT/'vendor/gbrain'),'rev-parse','HEAD'],text=True).strip()
 if report['observed_adapter_source_pin']!=PIN:raise RuntimeError('Adapter source pin changed')
 path.write_text(json.dumps(report,indent=2)+'\n');(BASE/'latest.json').write_text(json.dumps(report,indent=2)+'\n')
 print(json.dumps({'report':str(path),'releases':{v:{'qualification_passed':r.get('qualification_passed'),'rollback_verified':r['rollback_protected_preimage_preserved']} for v,r in report['releases'].items()}}))

def main():
 parser=argparse.ArgumentParser(description=__doc__)
 parser.add_argument('--old-engine',type=Path)
 parser.add_argument('--verify-report',type=Path,help='Recheck durable journals from an already executed isolated run without repeating migration')
 parser.add_argument('--bun',type=Path,default=Path('/Users/mateusmpz/.bun/bin/bun'))
 args=parser.parse_args();BASE.mkdir(parents=True,exist_ok=True)
 if args.verify_report:return verify_report(args.verify_report)
 if not args.old_engine:parser.error('--old-engine is required to execute a new fixture')
 fixture=BASE/('run-'+uuid.uuid4().hex);fixture.mkdir(mode=0o700)
 for name in ['engine','home','tmp','vault/INBOX/oracle-memory','baseline/gbrain/profile','baseline/events']:(fixture/name).mkdir(parents=True)
 (fixture/'vault/release-note.md').write_text('# Release Sentinel\n\nCANONICAL_RELEASE_SENTINEL\n\n' + '\n'.join('[Missing](missing-'+str(i)+'.md)' for i in range(251)) + '\n![External](https://example.com/test.png)\n')
 (fixture/'bunfig.toml').write_text('# No providers or preloads\n')
 old=fixture/'engine/gbrain-old';shutil.copy2(args.old_engine,old)
 report={'fixture':str(fixture),'adapter_pin':PIN,'personal_profiles':False,'provider_inference':False,
         'network_denied':False,'source_links':{'vendor':str((ROOT/'vendor').resolve()),'node_modules':str((ROOT/'node_modules').resolve())},'commands':[],'releases':{},'source_hashes':{str(p.relative_to(ROOT)):sha(p) for p in sorted((ROOT/'packages/gbrain-adapter').glob('*.ts'))}}
 def env(profile):
  return {'PATH':'/usr/bin:/bin:/usr/sbin:/sbin','HOME':str(fixture/'home'),'TMPDIR':str(fixture/'tmp'),'GBRAIN_HOME':str(profile),
   'GBRAIN_SKIP_UPDATE_CHECK':'1','GBRAIN_HOOKS':'0','ORACLE_RECEIPT_DIR':str(profile.parent.parent/'events'),'LANG':'en_US.UTF-8',
   'BUN_RUNTIME_TRANSPILER_CACHE_PATH':str(fixture/'bun-cache'),'DO_NOT_TRACK':'1'}
 def run(argv,name,profile,request=None,timeout=90):
  started=time.monotonic();log=fixture/(name+'.log');command=[str(a) for a in argv]
  process=subprocess.Popen(command,cwd=fixture,env=env(profile),stdin=subprocess.PIPE if request is not None else subprocess.DEVNULL,stdout=subprocess.PIPE,stderr=subprocess.PIPE,start_new_session=True)
  try:out,err=process.communicate(json.dumps(request).encode() if request is not None else None,timeout=timeout)
  except subprocess.TimeoutExpired:
   os.killpg(process.pid,signal.SIGKILL);out,err=process.communicate();raise RuntimeError('Timeout '+name)
  finally:
   try:os.killpg(process.pid,signal.SIGTERM)
   except ProcessLookupError:pass
  log.write_bytes(out+b'\nSTDERR\n'+err)
  report['commands'].append({'name':name,'argv':command,'exit':process.returncode,'seconds':round(time.monotonic()-started,3),'log':str(log)})
  print(name+': '+str(process.returncode),flush=True)
  return process.returncode,out.decode(errors='replace'),err.decode(errors='replace')
 def require(argv,name,profile,**kwargs):
  result=run(argv,name,profile,**kwargs)
  if result[0]:raise RuntimeError(name+' failed: '+result[2][-1000:])
  return result
 def adapter(profile,name,request):
  # The product's migration creates its own write-confined network sandbox.
  # macOS refuses nesting sandbox-exec, so only that transaction skips the
  # enclosing sandbox; all index/get/MCP commands retain it.
  prefix=[] if request.get('operation')=='runtime-generation' else SANDBOX
  code,out,err=run(prefix+[fixture/'engine/oracle-gbrain-read'],name,profile,request)
  report['commands'][-1]['network_boundary']='product migration child sandbox' if not prefix else 'outer network-denying sandbox'
  data=json.loads(out.strip().splitlines()[-1]);return code,data
 def protocol(profile,directory,phase):
  directory.mkdir(exist_ok=True)
  (directory/'protocol-input.json').write_text(json.dumps({'personal_profiles':False,'adapter':str(fixture/'engine/oracle-gbrain-read'),'env':env(profile)}))
  code,out,err=run(SANDBOX+[args.bun,'run','--no-env-file','--no-install','--config='+str(fixture/'bunfig.toml'),ROOT/'scripts/test-gbrain-release-protocol.ts',directory,phase],directory.name+'-protocol-'+phase,profile,timeout=120)
  result_file=directory/('protocol-'+phase+'.json');return {'exit':code,'report':json.loads(result_file.read_text()) if result_file.exists() else None,'failure':err[-1000:] if code else None}
 profile=fixture/'baseline/gbrain/profile'
 try:
  require(SANDBOX+[sys.executable,'-c','import socket,errno\ntry:socket.socket().connect(("127.0.0.1",9))\nexcept OSError as e:raise SystemExit(0 if e.errno in (errno.EPERM,errno.EACCES) else 1)\nraise SystemExit(2)'],'network-denial',profile);report['network_denied']=True
  report['old_engine_sha256']=sha(old)
  observed_pin=subprocess.check_output(['/usr/bin/git','-C',str(ROOT/'vendor/gbrain'),'rev-parse','HEAD'],text=True).strip();assert observed_pin==PIN;report['observed_adapter_source_pin']=observed_pin
  _,out,_=require(SANDBOX+[old,'--version'],'old-version',profile);assert '0.48.4.0' in out
  _,out,_=require([args.bun,'--version'],'bun-version',profile);report['bun_version']=out.strip();report['supported_source_rebuild']=False;report['toolchain_limitation']='Installed Bun 1.3.8 is below pinned >=1.3.10 and candidate >=1.3.11; developer adapter compile only, no source-pin upgrade qualification'
  require(SANDBOX+[args.bun,'build','--no-env-file','--no-install','--config='+str(fixture/'bunfig.toml'),'--compile','--no-compile-autoload-dotenv','--no-compile-autoload-bunfig',ROOT/'packages/gbrain-adapter/read.ts','--outfile',fixture/'engine/oracle-gbrain-read'],'build-adapter',profile,timeout=180)
  report['adapter_sha256']=sha(fixture/'engine/oracle-gbrain-read')
  for index,argv in enumerate([['init','--pglite','--no-embedding'],['sources','add','oracle-vault','--name','Synthetic release vault'],['sources','add','oracle-memory','--path',str(fixture/'vault/INBOX/oracle-memory'),'--name','Synthetic memory','--force'],['config','set','search.mcp_keyword_only','true']]):require(SANDBOX+[old,*argv],'baseline-'+str(index),profile)
  (profile/'oracle-owned.json').write_text(json.dumps({'owner':'OracleCompanion','schema_version':2,'vault_root':str(fixture/'vault')}))
  request={'operation':'index','source':'oracle-vault','root':str(fixture/'vault'),'scan_complete':True,'budget_ms':90000}
  code,result=adapter(profile,'baseline-index',request);assert code==0 and result['value']['complete'],result
  diagnostics=result['value'];assert diagnostics['unresolved_link_count']==251 and diagnostics['unresolved_link_sample_count']==200 and diagnostics['unresolved_links_truncated'] and diagnostics['external_reference_count']==1,diagnostics
  report['baseline_diagnostics']={key:diagnostics[key] for key in ['unresolved_link_count','unresolved_link_sample_count','unresolved_links_truncated','external_reference_count']}
  manifest=profile/'oracle-vault-manifest.json';prior_manifest=sha(manifest)
  _,partial=adapter(profile,'baseline-partial',{**request,'scan_complete':False,'files':['release-note.md']});assert not partial['value']['complete'] and sha(manifest)==prior_manifest
  report['partial_preserved_manifest']=True
  _,resumed=adapter(profile,'baseline-resume',request);assert resumed['value']['complete'] and resumed['value']['unresolved_link_count']==251
  _,noop=adapter(profile,'baseline-noop',request);assert noop['value']['no_op'] and noop['value']['unresolved_link_count']==251
  report['noop_preserved_diagnostics']=True
  report['baseline_protocol']=protocol(profile,fixture/'baseline-protocol','seed');assert report['baseline_protocol']['exit']==0
  baseline_inventory=inventory(profile);report['baseline_inventory']=baseline_inventory;canonical_before=inventory(fixture/'vault')
  for version,metadata in RELEASES.items():
   candidate=BASE/'downloads'/('gbrain-'+version)
   if sha(candidate)!=metadata['sha256']:raise RuntimeError('Official digest mismatch '+version)
   state=fixture/('candidate-'+version);state.mkdir();(state/'events').mkdir();selected=state/'gbrain/profile';shutil.copytree(profile,selected)
   config_file=selected/'.gbrain/config.json';raw=json.loads(config_file.read_text());raw['database_path']=str(selected/'.gbrain/pglite');config_file.write_text(json.dumps(raw))
   # Preserve the actual configured database basename, not an inferred engine path.
   original=json.loads((profile/'.gbrain/config.json').read_text());raw['database_path']=str(selected/Path(original['database_path']).relative_to(profile));config_file.write_text(json.dumps(raw))
   before=inventory(selected);identifier=str(uuid.uuid4());slotid=str(uuid.uuid4());slot=state/'updates/runtime/versions'/slotid;slot.mkdir(parents=True)
   shutil.copy2(candidate,slot/'gbrain');shutil.copy2(fixture/'engine/oracle-gbrain-read',slot/'oracle-gbrain-read')
   release_report={'version':version,**metadata,'download_url':'https://github.com/garrytan/gbrain/releases/download/v'+version+'/gbrain-darwin-arm64','download_sha256':sha(candidate)}
   report['releases'][version]=release_report
   _,out,_=require(SANDBOX+[candidate,'--version'],'candidate-'+version+'-version',selected);assert version in out
   request_activation={'operation':'runtime-generation','action':'activate','id':identifier,'commit':PIN,'database_compatibility':'same-schema','metadata':{'commit':PIN,'directory':slotid,'version':version,'files':{'gbrain':sha(slot/'gbrain'),'oracle-gbrain-read':sha(slot/'oracle-gbrain-read')},'official_release':{'version':version,'sha256':sha(candidate)}}}
   code,result=adapter(selected,'candidate-'+version+'-activation',request_activation);release_report['activation']=result;release_report['activation_exit']=code
   journal=state/'updates/runtime/generations'/identifier/'journal.json'
   if journal.exists():
    release_report['journal']=json.loads(journal.read_text())
    protected={key:value['sha256'] for key,value in release_report['journal'].get('original_inventory',{}).items()}
    release_report['rollback_protected_preimage_preserved']=inventory(selected)==protected if code else None
   schema_log=state/'updates/runtime/generations'/identifier/'candidate/oracle-update-tmp/schema.log'
   if schema_log.exists():release_report['schema_log']=schema_log.read_text()[-8000:]
   release_report['transition_gate_remaining']=(state/'updates/runtime/transition.json').exists()
   if code==0:
    _,readback=adapter(selected,'candidate-'+version+'-index',request);release_report['index']=readback
    _,get=adapter(selected,'candidate-'+version+'-get',{'operation':'get','source':'oracle-vault','slug':'release-note','owned':True});release_report['get_verified']=get.get('ok') and 'CANONICAL_RELEASE_SENTINEL' in json.dumps(get)
    release_report['protocol']=protocol(selected,fixture/('protocol-'+version),'read')
    release_report['qualification_passed']=bool(readback.get('ok') and readback['value'].get('complete') and release_report['get_verified'] and release_report['protocol']['exit']==0)
    # Force a product failure after profile activation to exercise its real rollback.
    prior=inventory(selected);fault={**request_activation,'id':str(uuid.uuid4()),'fail_at':'after-profile-activation'}
    fault_code,fault_result=adapter(selected,'candidate-'+version+'-rollback-fault',fault);release_report['rollback_fault']=fault_result;release_report['rollback_preserved_profile']=inventory(selected)==prior
    fault_journal=json.loads((state/'updates/runtime/generations'/fault['id']/'journal.json').read_text());protected={key:value['sha256'] for key,value in fault_journal.get('original_inventory',{}).items()};release_report['rollback_protected_preimage_preserved']=inventory(selected)==protected
    release_report['fault_journal_status']=fault_journal.get('status')
   else:
    release_report['qualification_passed']=False;release_report['rollback_preserved_profile']=inventory(selected)==before
   release_report['canonical_notes_unchanged']=inventory(fixture/'vault')==canonical_before
   release_report['active_baseline_preserved']=inventory(profile)==baseline_inventory
   release_report['owner_preserved']=json.loads((selected/'oracle-owned.json').read_text())==json.loads((profile/'oracle-owned.json').read_text())
   release_report['admission']='accepted' if code==0 else 'rejected_before_active_profile_switch'
 except BaseException as error:
  report['failure']=str(error);raise
 finally:
  report['source_changed']=[path for path,digest in report['source_hashes'].items() if sha(ROOT/path)!=digest]
  (fixture/'report.json').write_text(json.dumps(report,indent=2)+'\n');(BASE/'latest.json').write_text(json.dumps(report,indent=2)+'\n');print('EVIDENCE='+str(fixture/'report.json'),flush=True)
 if 'failure' not in report:verify_report(fixture/'report.json')
if __name__=='__main__':main()
