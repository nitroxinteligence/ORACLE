#!/usr/bin/env python3
"""Native WKWebView onboarding tests against an explicit synthetic QA mailbox."""
import importlib.util,json,os,pathlib,time
ROOT=pathlib.Path(__file__).resolve().parent.parent
os.environ.setdefault('ORACLE_ATLAS_QA_DIR',str(ROOT/'.work/onboarding-qa/mailbox'))
spec=importlib.util.spec_from_file_location('qa',ROOT/'scripts/atlas-qa.py');qa=importlib.util.module_from_spec(spec);spec.loader.exec_module(qa)
checks=[]
def check(name,expression):
 value=qa.call(expression);assert value is True,(name,value);checks.append(name);print('PASS',name,flush=True)
def run(js,timeout=60):
 qa.call('window.obTestDone=false;window.obTestError=null;(async()=>{'+js+'})().then(()=>window.obTestDone=true,e=>{window.obTestError=String(e);window.obTestDone=true});true')
 end=time.monotonic()+timeout
 while time.monotonic()<end:
  r=qa.call('({done:window.obTestDone,error:window.obTestError})')
  if r['done']:
   assert not r['error'],r['error'];return
  time.sleep(.1)
 raise TimeoutError('Onboarding action timed out')
check('new profile opens license gate','document.querySelector(".ob-dialog").open && !OracleOnboarding.getState().licensed && !OracleOnboarding.getState().legacyAccess')
qa.call('document.querySelector("#ob-code").value="INVALIDO";document.querySelector("#ob-activate").click();true')
time.sleep(.3)
check('invalid code stays locked with explanation','!OracleOnboarding.getState().licensed && document.querySelector("[data-ob-message]").textContent.includes("Código inválido")')
code=(ROOT/'.work/onboarding-qa/fixture-code.txt').read_text().strip()
qa.call('document.querySelector("#ob-code").value='+json.dumps(code)+';document.querySelector("#ob-activate").click();true')
time.sleep(.5)
run('await OracleOnboarding.poll()')
check('issuer code activates native validator','OracleOnboarding.getState().licensed && document.querySelector("#ob-connect")!==null')
check('no progress invented before Codex start','OracleOnboarding.getState().confirmed.length===0')
qa.call('document.querySelector(".ob-dialog").dispatchEvent(new Event("cancel",{cancelable:true}));true')
check('Escape route closes setup','!document.querySelector(".ob-dialog").open')
qa.call('OracleOnboarding.open();true')
check('setup reopens without losing activation','document.querySelector(".ob-dialog").open && !!document.querySelector("#ob-connect")')
run('await call("onboardingConnect");await OracleOnboarding.poll()',90)
check('real Codex account handshake','OracleOnboarding.getState().codexConnected===true')
run('window.obInventory=await call("codexPlugins");await refresh()',150)
check('real inventory has provenance','obInventory.status==="available" && obInventory.plugins.every(p=>p.evidence)')
check('no hardcoded Gmail connection','!obInventory.plugins.some(p=>p.name==="Gmail" && p.status==="connected")')
# Save sanitized counts only; no tokens, license codes, or account identity.
report={'checks':checks,'passed':len(checks),'connected':qa.call('obInventory.plugins.filter(p=>p.status==="connected").map(p=>p.name)'),'installed':qa.call('obInventory.plugins.filter(p=>p.status==="installed").map(p=>p.name)'),'scope':'Native app, synthetic isolated profile, real Codex account/installed runtime; no personal installation changes'}
(ROOT/'docs/evidence/onboarding-native.json').write_text(json.dumps(report,indent=2,ensure_ascii=False)+'\n')
print(json.dumps(report,ensure_ascii=False))
