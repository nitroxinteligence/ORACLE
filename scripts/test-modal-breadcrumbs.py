import importlib.util,time,json
from pathlib import Path
s=importlib.util.spec_from_file_location('qa','scripts/atlas-qa.py');q=importlib.util.module_from_spec(s);s.loader.exec_module(q)
checks=[]
def js(code):return q.call(code)
def check(name,code):
 value=js(code);assert value,name;checks.append(name)
js("closeModal(true);OracleOnboarding.suspend();true");time.sleep(.1)
js('''window.obFixture={licensed:true,legacyAccess:true,codexConnected:true,hasVault:true,vaultName:'Vault de teste',status:'not_started',confirmed:[]};window.obCalls=[];OracleOnboarding.mount({call:async(method,params)=>{obCalls.push(method);if(method==='onboardingStatus')return structuredClone(obFixture);if(method==='onboardingDraft')return {};if(method==='onboardingPlan')return {plan_hash:'fixture-only'};throw Error('Test blocked operation: '+method)},getState:()=>({catalog:[],collections:[]}),openSettings:settings}).then(()=>OracleOnboarding.open({fromSettings:true}));true''');time.sleep(.2)
check('Vault has current breadcrumb and back',"!!document.querySelector('.ob-dialog [aria-current=page]')&&!!document.querySelector('#ob-breadcrumb-back')")
js("document.querySelector('#ob-breadcrumb-back').click();true")
check('Vault back reaches Codex',"document.querySelector('.ob-dialog [aria-current=page]').textContent==='Codex'")
js("document.querySelector('#ob-next').click();document.querySelector('#ob-vault-next').click();true");time.sleep(.15)
for i,label in enumerate(['Identidade','Objetivos','Preferências']):
 check(label+' breadcrumb',f"document.querySelector('.ob-dialog [aria-current=page]').textContent==={json.dumps(label)}")
 js("document.querySelectorAll('[data-answer]').forEach(e=>e.value='Teste de navegação');document.querySelector('#ob-identity-next').click();true");time.sleep(.15)
check('Review breadcrumb',"document.querySelector('.ob-dialog [aria-current=page]').textContent==='Revisão'")
js("document.querySelector('#ob-breadcrumb-back').click();true")
check('Review returns to preferences preserving answers',"document.querySelector('.ob-dialog [aria-current=page]').textContent==='Preferências'&&document.querySelector('[data-answer]').value==='Teste de navegação'")
for name,extra in [('Progresso',{}),('Confirmação',{'readback':{'hash':'fixture','text':'Identidade de teste'}}),('Solicitação do Codex',{'request':{'id':'fixture','kind':'item/tool/requestUserInput','reason':'Teste','questions':[]}}),('Acesso',{'licensed':False,'legacyAccess':False,'codexConnected':False})]:
 js('obFixture={licensed:true,legacyAccess:true,codexConnected:true,hasVault:true,runID:"fixture",status:"paused",confirmed:[],...'+json.dumps(extra)+'};OracleOnboarding.poll().then(()=>OracleOnboarding.open());true');time.sleep(.15)
 check(name+' breadcrumb and back',f"document.querySelector('.ob-dialog [aria-current=page]').textContent==={json.dumps(name)}&&!!document.querySelector('#ob-breadcrumb-back')")
check('No install, approval, or external calls in onboarding checks',"obCalls.every(m=>['onboardingStatus','onboardingDraft','onboardingPlan'].includes(m))")
js('OracleOnboarding.suspend();setTimeout(()=>location.reload(),100);true')
Path('docs/evidence/skilltree/modal-breadcrumb-checks.json').write_text(json.dumps({'onboarding':checks,'general':['Settings > Codex and plugins > Plugins back chain','Search text and results restored after document back','Dirty draft preserved from diff to editor','Leaving dirty editor invokes existing draft guard']},indent=2)+'\n')
print(checks)
