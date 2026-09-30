#!/usr/bin/env python3
"""Simplified settings regression in actual WKWebView with a synthetic native bridge.

Only this suite's .work directory is writable. Personal home reads and network
are denied. No installed app, real Core, profile or vault is opened or mutated.
"""
from __future__ import annotations

import hashlib
import json
import os
from pathlib import Path
import subprocess
import sys
import struct

ROOT = Path(__file__).resolve().parents[1]
WEB = ROOT / "Resources/web"
SCRATCH = ROOT / ".work/client-readiness-screenshots/ui-tests-final"


FIXTURE = r'''/* Injected at document start by atlas-web-fixture.m. Synthetic bridge ONLY.
 * Runs real app.js/onboarding.js/atlas.js and the real generated bundle in WebKit.
 * No source rewriting, fake DOM, actual Core, file I/O, remote account or inference.
 */
(() => {
  'use strict';
  const clone = value => JSON.parse(JSON.stringify(value));
  const sleep = ms => new Promise(resolve => setTimeout(resolve, ms));
  const q = selector => document.querySelector(selector);
  const qa = selector => [...document.querySelectorAll(selector)];
  const report = value => window.webkit.messageHandlers.fixture.postMessage(value);
  const assert = (condition, message) => { if (!condition) throw Error(message); };
  const wait = async (predicate, label, milliseconds = 4500) => {
    const until = performance.now() + milliseconds;
    while (performance.now() < until) { if (predicate()) return; await sleep(20); }
    throw Error('Timed out: ' + label + '; title=' + (q('#ob-title')?.textContent || q('#modal-title')?.textContent || 'none'));
  };
  const visible = element => !!element && element.getClientRects().length > 0 && getComputedStyle(element).visibility !== 'hidden';
  const click = selector => { const element = q(selector); assert(element && !element.disabled, 'Missing or disabled ' + selector); element.click(); };
  const input = (selector, value) => {
    const element = q(selector); assert(element, 'Missing input ' + selector);
    element.value = value; element.dispatchEvent(new Event('input', {bubbles:true}));
  };
  const changeModel = value => { q('#ob-model').value = value; q('#ob-model').dispatchEvent(new Event('change', {bubbles:true})); };
  const files = [], folders = new Set(['AREAS', 'AREAS/pessoal', 'AREAS/profissional', 'SISTEMA', 'SISTEMA/skills', 'SISTEMA/skills/contents', 'SISTEMA/prompts']);
  for (const [id, count] of [['code',225], ['cyber-security',818], ['marketing',3], ['unknown-specialist',3]]) {
    for (let i = 0; i < count; i++) files.push(`SISTEMA/skills/${id}/alpha-${String(i).padStart(4,'0')}/SKILL.md`);
  }
  files.push('AREAS/pessoal/Rotina.md', 'AREAS/profissional/Plano.md', 'SISTEMA/prompts/exemplo.md');
  for (const path of files) { const parts = path.split('/'); for (let i=1;i<parts.length;i++) folders.add(parts.slice(0,i).join('/')); }
  const entries = [...folders].map(path=>({path,name:path.split('/').at(-1),directory:true})).concat(
    files.map(path=>({path,name:path.split('/').at(-1),directory:false,size:120,source:'Synthetic only'})));
  const f = window.__oracleFixture = {
    ob:{schemaVersion:1,status:'not_started',licensed:false,legacyAccess:false,hasVault:false,hasExistingBrain:false,
      codexConnected:false,authorizing:false,deviceID:null,confirmed:[],models:[],modelSelection:null},
    config:{fixture:true,layout:{nodes:{},leaves:{}}}, entries, requests:[], calls:[], failures:[], cases:[], jsErrors:[],
    maintenance:{enabled:false,external:false,hour:15,timezone:'UTC',scheduleState:'disabled',autoCapture:false,remoteProcessing:false,lastRun:{},message:'Executor local; registro externo não verificado.'},
    backup:{enabled:false,available:true,lastRun:{}},failDeviceRequest:true,failBackup:false,
    draftActive:0,draftMax:0,draftCompleted:[],holdDrafts:false,draftReleases:[],failNextDraft:false,
    releaseDrafts(){this.holdDrafts=false;for(const resolve of this.draftReleases.splice(0))resolve();},
  };
  const models = [{model:'fixture-codex-a',displayName:'Fixture Model A'}, {model:'fixture-codex-b',displayName:'Fixture Model B'}];
  const collections = ['code','cyber-security','marketing','contents','unknown-specialist','Impeccable','frontend-design'].map(id=>({id,name:id==='cyber-security'?'Cybersecurity':id,icon:'code'}));
  const countCalls = method => f.calls.filter(call=>call.method===method).length;
  function snapshot() {
    return clone({config:f.config,entries:f.ob.hasVault?entries:[],collections,events:[],projects:[],
      scan:{signature:JSON.stringify(entries.map(e=>[e.path,e.size])),complete:true,pending:false},
      onboarding:f.ob,operations:{setup:f.ob.status==='running',gbrain:false},
      setup:f.ob.runID?{plan_id:f.ob.runID}:null,setupBaselinePaths:[],
      codexPlugins:{status:f.ob.codexConnected?'available':'unavailable',plugins:[]},
      gbrainSync:{status:f.ob.status==='completed'?'verified':'unconfigured'},departmentManifest:window.OracleDepartmentManifest});
  }
  async function invoke(method, params) {
    switch (method) {
      case 'interfaceReady':return true;
      case 'boot': return {locked:false,accessibility:{reduceMotion:true}};
      case 'snapshot': return snapshot();
      case 'events': return [];
      case 'updateStatus': return {busy:false,available:false,knownUpdate:false,phase:'complete',checkedAt:new Date().toISOString(),results:[]};
      case 'onboardingStatus': return clone(f.ob);
      case 'onboardingKnowledgeWelcomeSeen': f.ob.knowledgeWelcome=clone(params);return true;
      case 'onboardingDraftUI':f.ob.ui={...f.ob.ui,...clone(params)};return true;
      case 'onboardingDeviceRequest':
        if(f.failDeviceRequest){f.failDeviceRequest=false;throw Error('Synthetic device unavailable');}
        f.ob.deviceID='ORACLE-MAC2-'+'A'.repeat(64);return {deviceID:f.ob.deviceID,activated:false};
      case 'copy': f.copied=params.text;return true;
      case 'backupStatus':return clone(f.backup);
      case 'configureBackup':f.backup.enabled=params.enabled===true;return clone(f.backup);
      case 'backupCreate':
        if(!f.backup.enabled||f.failBackup){f.failBackup=false;throw Error('Synthetic backup failure');}
        f.backup.lastRun={id:'11111111-2222-4333-8444-555555555555',status:'backup_verified',complete:true,integrity_verified:true,restore_verified:false};return clone(f.backup.lastRun);
      case 'backupVerify':
        assert(params.id===(f.backup.lastRun.id||f.backup.lastRun.backup_id),'Wrong backup ID');
        f.backup.lastRun={...f.backup.lastRun,status:'backup_verified',restore_verified:false};return clone(f.backup.lastRun);
      case 'backupRestore':
        assert(params.confirmed===true&&params.id===(f.backup.lastRun.id||f.backup.lastRun.backup_id),'Restore without confirmation or wrong ID');
        f.backup.lastRun={backup_id:params.id,status:'restore_verified',complete:true,integrity_verified:true,restore_verified:true,activated:false,live_overwritten:false};return clone(f.backup.lastRun);
      case 'maintenanceStatus':return clone(f.maintenance);
      case 'configureMaintenance':f.maintenance={...f.maintenance,...clone(params),scheduleState:params.enabled?'pending_host_registration':'disabled'};return clone(f.maintenance);
      case 'maintenanceRun':
        assert(f.maintenance.enabled,'Unconsented maintenance');f.maintenance.lastRun={status:'local_complete',complete:true,lastSuccess:new Date().toISOString(),deferred:[]};return clone(f.maintenance.lastRun);
      case 'maintenanceScheduleRequest':return {request:'Synthetic request; no scheduler registration.',registered:false};
      case 'onboardingActivate':
        if (params.code !== 'ORACLE2.SYNTHETIC.SIGNATURE') throw Error('Código sintético inválido.');
        f.ob.licensed=true; return {activated:true};
      case 'onboardingChooseVault':
        f.ob.hasVault=true;f.ob.vaultName='Synthetic Vault';f.ob.vaultPath='/__synthetic_oracle__/vault';f.ob.status='configuring';f.config.vault='/__synthetic_oracle__/vault';return true;
      case 'onboardingClearVault': f.ob.hasVault=false;delete f.ob.vaultName;delete f.ob.vaultPath;delete f.config.vault;return true;
      case 'onboardingDraft': {
        f.draftActive++;f.draftMax=Math.max(f.draftMax,f.draftActive);
        try {
          if (f.holdDrafts) await new Promise(resolve=>f.draftReleases.push(resolve));
          await sleep(12);
          if (f.failNextDraft) { f.failNextDraft=false; throw Error('Synthetic draft storage unavailable'); }
          f.ob.draft=clone(params);f.draftCompleted.push(clone(params));return true;
        } finally {f.draftActive--;}
      }
      case 'onboardingConnect':
        if (countCalls('onboardingConnect')===1) {f.ob.authorizing=true;return {connected:false,message:'Autorização sintética pendente.'};}
        f.ob.codexConnected=true;f.ob.authorizing=false;f.ob.models=models;return {connected:true};
      case 'onboardingCheckConnection': return {connected:f.ob.codexConnected};
      case 'onboardingCancelLogin': f.ob.authorizing=false;return true;
      case 'onboardingSelectModel': {
        const model=models.find(row=>row.model===params.model);if(!model)throw Error('Unknown fixture model');
        f.ob.draft={...f.ob.draft,model:model.model};f.ob.modelSelection={...model,effort:'medium'};return true;
      }
      case 'codexPlugins': return {status:'available',plugins:[]};
      case 'onboardingPlan':
        f.ob.draft=clone(params);f.ob.status='review';f.ob.runID='synthetic-run';
        f.ob.reviewPlan={id:'synthetic-run',plan_hash:'synthetic-plan-hash'};return clone(f.ob.reviewPlan);
      case 'onboardingInstallMemoryOnly':
        f.installMaintenance=clone(params.maintenance);f.ob.maintenance={...clone(params.maintenance),registered:false};
        f.ob={...f.ob,status:'running',phase:'installing',profileMode:'memory-only',schemaVersion:3,runID:'memory-only-fixture',confirmed:[{id:'sol',kind:'core',label:'Oracle'}]};return clone(f.ob);
      case 'onboardingOpenCodex':case 'onboardingOpenIntegrationCodex':return true;
      case 'onboardingVerifyIntegration':await sleep(200);f.ob.integrationPending=!f.trustReady;return {...clone(f.ob),integrationMessage:f.trustReady?'Integração confirmada. Seu Oracle está pronto.':'Há hooks aguardando confiança no Codex.'};
      case 'onboardingResume':f.ob.status='running';return clone(f.ob);
      case 'onboardingCancel':f.ob.status='paused';return clone(f.ob);
      case 'memoryStatus':return {status:'idle'};
      case 'onboardingInstall':
        if(params.hash!=='synthetic-plan-hash')throw Error('Invalid synthetic plan hash');
        f.ob.status='running';f.ob.message='Instalação sintética em andamento';f.ob.confirmed=[{id:'sol',kind:'core',label:'Oracle'}];return clone(f.ob);
      case 'onboardingAnswer':
        if(params.id!==f.ob.request?.id)throw Error('Wrong synthetic request ID');
        f.requests.shift();f.ob.request=f.requests[0]||null;f.ob.status=f.ob.request?'waiting_user':'running';return true;
      case 'read':
        if(!files.includes(params.path))throw Error('Fixture refuses a path not in its in-memory index');
        return {path:'/__synthetic_oracle__/vault/'+params.path,hash:'synthetic-hash',editable:false,
          text:'# Synthetic document\n\nThis is fixture text, not a private or installed skill.\n\n'+params.path};
      default: f.failures.push('Unexpected bridge call '+method);throw Error('Fixture blocked unsupported native call: '+method);
    }
  }
  window.__oracleFixtureReceive = async ({id,method,params={}}) => {
    f.calls.push({method,params:clone(params),time:performance.now()});
    try {const value=await invoke(method,clone(params));window.oracleReply(id,{value});}
    catch(error){window.oracleReply(id,{error:error.message});}
  };
  window.addEventListener('error',event=>{if(event.message)f.jsErrors.push({message:event.message,file:event.filename,line:event.lineno,stack:event.error?.stack||null});});
  window.addEventListener('unhandledrejection',event=>f.jsErrors.push(String(event.reason?.stack||event.reason)));
  async function check(name, run, fatal=true) {
    try {await run();const result={type:'case',name,ok:true};f.cases.push(result);report(result);return true;}
    catch(error){const result={type:'case',name,ok:false,error:error.message};f.cases.push(result);report(result);if(fatal)throw error;return false;}
  }
  function breadcrumb(label) {return qa('.ob-navigation button').find(button=>button.textContent===label);}


  Object.assign(f.ob,{status:'completed',licensed:true,hasVault:true,runID:'fixture-run',knowledgeWelcome:{runID:'fixture-run',vault:'/__synthetic_oracle__/vault'}});
  f.config.vault='/__synthetic_oracle__/vault';
  f.config.vault='/__synthetic_oracle__/ATLAS Exemplo';
  f.ob.knowledgeWelcome={runID:f.ob.runID,vault:f.config.vault};
  const oldInvoke=invoke;
  invoke=async(method,params)=>{
   if(method==='knowledgeInterviewStatus')return {message:params.topic==='personal'?'Comprovante conferido: os fatos declarados estão nas notas pessoais do vault.':'Comprovante conferido: os fatos declarados estão nas notas profissionais do vault.',pending_count:0};
   return oldInvoke(method,params);
  };
  const screenshots=[];
  async function capture(name,label,bottom=false){
   if(!window.__finalScreenshots)return;
   const body=q('.modal-body');if(body)body.scrollTop=bottom?body.scrollHeight:0;
   await sleep(180);
   assert(document.documentElement.scrollWidth<=document.documentElement.clientWidth+1,'horizontal overflow: '+label);
   assert(!body||body.scrollWidth<=body.clientWidth+2,'body overflow: '+label);
   window.__memoryScreenshot=false;report({type:'snapshot',name});await wait(()=>window.__memoryScreenshot===true,'capture '+name);
   screenshots.push({label,name,fixture:true,final:true});
  }
  window.__oracleFixtureRun=async()=>{
   if(f.started)return;f.started=true;
   try{
    await wait(()=>window.oracleStartupRendered&&countCalls('onboardingStatus')>0&&!q('.ob-dialog[open]'),'interface pronta');await sleep(200);
    await check('Settings sem painel de memória ou carregamento do módulo',async()=>{
     click('#settings');assert(!q('#memory-settings')&&!window.OracleMemorySettings,'memory frontend remains');
     assert(!q('#modal-content').textContent.includes('Memória e sincronização'),'memory row remains');
     assert(q('#knowledge-settings')&&q('#updates-settings'),'existing settings unavailable');
     assert(!qa('script[src]').some(e=>e.src.endsWith('/memory-settings.js')),'removed script loaded');
     await capture('final-01-configuracoes','Final: Configurações sem painel de memória');
    });
    await check('Knowledge Base alcançável pelo botão existente',async()=>{
     click('#knowledge-settings');await wait(()=>q('[data-preview-knowledge="personal"]'),'Knowledge Base');
     await capture('final-02-knowledge-base','Final: Knowledge Base pessoal e profissional');
    });
    for(const [topic,label,n] of [['personal','Pessoal','03'],['professional','Profissional','04']]){
     await check('Roteiro '+label+' e retorno original do modal',async()=>{
      click('[data-preview-knowledge="'+topic+'"]');await wait(()=>q('[data-open-knowledge="'+topic+'"]')&&!q('[data-preview-knowledge]'),'roteiro '+label);
      assert(q('#modal-content').textContent.includes('ATLAS Exemplo'),'synthetic vault missing');
      await capture('final-'+n+'-roteiro-'+topic,'Final: roteiro '+label+' para entrevista no Codex');
      click('#modal-back');await wait(()=>q('[data-check-knowledge="'+topic+'"]'),'retorno Knowledge Base');
     });
    }
    await check('Comprovantes são conferidos somente por ação explícita',async()=>{
     assert(countCalls('knowledgeInterviewStatus')===0,'automatic receipt check');
     click('[data-check-knowledge="personal"]');await wait(()=>q('[data-knowledge-receipt="personal"]').textContent.includes('Comprovante conferido'),'recibo pessoal');
     click('[data-check-knowledge="professional"]');await wait(()=>q('[data-knowledge-receipt="professional"]').textContent.includes('Comprovante conferido'),'recibo profissional');
     assert(countCalls('knowledgeInterviewStatus')===2,'receipt duplicate');
     await capture('final-05-comprovantes-pessoal','Final fixture: comprovante pessoal conferido');
     await capture('final-06-comprovantes-profissional','Final fixture: comprovante profissional conferido',true);
    });
    await check('Fecho e reabertura preservam configurações e não mutam memória',async()=>{
     click('#modal [data-close]');await wait(()=>!q('#modal').open,'modal fechado');click('#settings');
     assert(!q('#memory-settings'),'removed panel reopened');
     const allowed=new Set(['boot','interfaceReady','snapshot','events','memoryStatus','onboardingStatus','updateStatus','knowledgeInterviewStatus']);
     assert(f.calls.every(c=>allowed.has(c.method)),'unexpected write or consent change');
     assert(!f.jsErrors.length&&!f.failures.length,'uncaught error or unsupported call');
    });
   }catch(error){f.error=error.stack||String(error)}
   report({type:'done',passed:f.cases.filter(c=>c.ok).length,failed:f.cases.filter(c=>!c.ok).length+(f.error&&!f.cases.some(c=>!c.ok)?1:0),cases:f.cases,error:f.error||null,screenshots,jsErrors:f.jsErrors,unsupported:f.failures,calls:f.calls,final:true,fixture:true});
  };
})();
'''


def main() -> int:
    global SCRATCH
    if sys.platform != 'darwin':
        raise RuntimeError('This test requires macOS and WebKit')
    screenshots = "--screenshots" in sys.argv
    if screenshots:
        SCRATCH = ROOT / ".work/client-readiness-screenshots"
    if SCRATCH.resolve() != SCRATCH or WEB.resolve() != WEB:
        raise RuntimeError('Refusing symlinked test paths')
    SCRATCH.mkdir(parents=True, exist_ok=True)
    for name in ('home', 'tmp', 'cache'):
        (SCRATCH / name).mkdir(exist_ok=True)
    fixture = ("window.__finalScreenshots=true;\n" if screenshots else "") + FIXTURE
    (SCRATCH / 'fixture.js').write_text(fixture)
    harness = (ROOT / 'scripts/atlas-web-fixture.m').read_text()
    harness = harness.replace('[host.window orderFront:nil];', '[host.window orderBack:nil]; // QA host never activates or becomes key.')
    harness = harness.replace('    if ([body[@"type"] isEqual:@"case"]) {', '''    if ([body[@"type"] isEqual:@"snapshot"]) {
        [self.web takeSnapshotWithConfiguration:nil completionHandler:^(NSImage *image, NSError *error) {
            NSBitmapImageRep *bitmap = image ? [NSBitmapImageRep imageRepWithData:image.TIFFRepresentation] : nil;
            NSData *png = [bitmap representationUsingType:NSBitmapImageFileTypePNG properties:@{}];
            NSString *path = [[self.reportPath stringByDeletingLastPathComponent] stringByAppendingPathComponent:[NSString stringWithFormat:@"%@.png", body[@"name"] ?: @"memory"]];
            BOOL saved = png && [png writeToFile:path options:0 error:nil];
            [self.web evaluateJavaScript:saved ? @"window.__memoryScreenshot=true" : @"window.__memoryScreenshot=false" completionHandler:nil];
        }];
        return;
    }
    if ([body[@"type"] isEqual:@"case"]) {''')
    (SCRATCH / 'host.m').write_text(harness)
    env = {'PATH': '/usr/bin:/bin:/usr/sbin:/sbin', 'HOME': str(SCRATCH / 'home'),
           'CFFIXED_USER_HOME': str(SCRATCH / 'home'), 'TMPDIR': str(SCRATCH / 'tmp') + '/',
           'CLANG_MODULE_CACHE_PATH': str(SCRATCH / 'cache'), 'LC_ALL': 'en_US.UTF-8'}
    home, scratch, web = map(json.dumps, (str(Path.home()), str(SCRATCH), str(WEB)))
    profile = '(version 1)(allow default)(deny network*)\n'
    profile += f'(deny file-write* (require-all (require-not (subpath {scratch})) (require-not (literal "/dev/null"))))\n'
    profile += f'(deny file-read* (require-all (subpath {home}) (require-not (subpath {scratch})) (require-not (subpath {web}))))\n'
    (SCRATCH / 'runtime.sb').write_text(profile)
    sandbox = ['/usr/bin/sandbox-exec', '-f', str(SCRATCH / 'runtime.sb')]
    binary = SCRATCH / 'host'
    compile_result = subprocess.run(sandbox + ['/usr/bin/clang', '-fobjc-arc', '-fno-modules',
        '-O0', '-g0', '-framework', 'AppKit', '-framework', 'WebKit', str(SCRATCH / 'host.m'),
        '-o', str(binary)], cwd=SCRATCH, env=env, capture_output=True, text=True, timeout=45)
    (SCRATCH / 'compile.log').write_text(compile_result.stdout + compile_result.stderr)
    if compile_result.returncode:
        print(compile_result.stdout + compile_result.stderr)
        return compile_result.returncode
    before = {str(p.relative_to(WEB)): hashlib.sha256(p.read_bytes()).hexdigest()
              for p in WEB.rglob('*') if p.is_file()}
    report_path = SCRATCH / 'result.json'
    report_path.unlink(missing_ok=True)
    result = subprocess.run(sandbox + [str(binary), str(WEB), str(SCRATCH / 'fixture.js'),
                            str(report_path)], cwd=SCRATCH, env=env,
                            capture_output=True, text=True, timeout=85)
    (SCRATCH / 'run.log').write_text(result.stdout + result.stderr)
    print(result.stdout + result.stderr)
    if not report_path.exists():
        return result.returncode or 1
    report = json.loads(report_path.read_text())
    report['sourceHashes'] = before
    report['sourcesUnchangedDuringRun'] = all(hashlib.sha256((WEB / name).read_bytes()).hexdigest() == value for name, value in before.items())
    report['isolation'] = {'realCore': False, 'network': 'denied', 'personalHomeReads': 'denied',
                           'writeScope': str(SCRATCH), 'websiteData': 'nonpersistent'}
    report_path.write_text(json.dumps(report, ensure_ascii=False, indent=2) + '\n')
    if screenshots:
        index = [{"label": item["label"], "path": str(SCRATCH / (item["name"] + ".png")), "sourceHashes": before, "fixture": True, "final": True} for item in report.get("screenshots", [])]
        for item in index:
            png = Path(item["path"]).read_bytes()
            if png[:8] != b"\x89PNG\r\n\x1a\n":
                raise RuntimeError("Invalid WK screenshot: " + item["path"])
            item["pixels"] = list(struct.unpack(">II", png[16:24]))
        (SCRATCH / "indice.json").write_text(json.dumps(index, ensure_ascii=False, indent=2) + "\n")
    print(json.dumps({k: report.get(k) for k in ('passed', 'failed', 'error', 'measured', 'sourcesUnchangedDuringRun')}, ensure_ascii=False, indent=2))
    return 0 if result.returncode == 0 and report.get('passed', 0) > 0 and report.get('failed') == 0 and report['sourcesUnchangedDuringRun'] else 1


if __name__ == '__main__':
    try:
        raise SystemExit(main())
    except (OSError, RuntimeError, subprocess.SubprocessError) as error:
        print('SETTINGS_UI_TEST_ERROR: ' + str(error), file=sys.stderr)
        raise SystemExit(2)
