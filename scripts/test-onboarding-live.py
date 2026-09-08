#!/usr/bin/env python3
"""Exercise the shipped onboarding via native WKWebView and a real Codex skill turn.
Requires the opt-in test bundle, an activated synthetic profile and normal Codex login.
Does not grant permissions, trust hooks, alter existing vaults, or install paid providers.
"""
import importlib.util,json,os,pathlib,time,sys
ROOT=pathlib.Path(__file__).resolve().parent.parent
os.environ.setdefault('ORACLE_ATLAS_QA_DIR',str(ROOT/'.work/onboarding-qa/mailbox'))
spec=importlib.util.spec_from_file_location('qa',ROOT/'scripts/atlas-qa.py');qa=importlib.util.module_from_spec(spec);spec.loader.exec_module(qa)
base=ROOT/'.work/onboarding-qa';state=base/'state';vault=base/'synthetic-vault'
assert json.loads((state/'config.json').read_text()).get('fixture') is True
vault.mkdir(exist_ok=True)
if '--resume' not in sys.argv:(vault/'Teste.md').write_text('# Documento sintético\n\nA memória desta validação contém somente notas sintéticas.\n')
# Native selector tested separately. For an unattended test, configure only its explicitly owned fixture destination.
config=json.loads((state/'config.json').read_text());assert not config.get('vault') or config['vault']==str(vault)
config['vault']=str(vault);(state/'config.json').write_text(json.dumps(config))
answers={'AGENT_NAME':'Oracle de Teste','PRINCIPAL_NAME':'Pessoa Sintética','AGENT_PURPOSE':'Organizar exclusivamente notas sintéticas para validar a instalação.','AGENT_TOP_JOBS':'1. Encontrar notas de teste\n2. Conferir fontes locais','PRINCIPAL_CONTEXT':'Este perfil é uma fixture isolada. Nenhum dado pessoal real.','VOICE_REGISTER':'Respostas curtas e claras.'}
params={'answers':answers,'newVault':True,'attach':False,'catalogCollections':['customer-finder']}
def async_start(body):
 qa.call('window.obLiveDone=false;window.obLiveError=null;(async()=>{'+body+'})().then(()=>window.obLiveDone=true,e=>{window.obLiveError=String(e);window.obLiveDone=true});true')
def native(method,params=None,timeout=90):
 async_start('window.obLiveResult=await call('+json.dumps(method)+','+json.dumps(params or {})+');')
 end=time.monotonic()+timeout
 while time.monotonic()<end:
  r=qa.call('({done:window.obLiveDone,error:window.obLiveError,result:window.obLiveResult})')
  if r['done']:
   if r['error']:raise RuntimeError(r['error'])
   return r.get('result')
  time.sleep(.2)
 raise TimeoutError(method)
native('onboardingConnect')
if '--resume' in sys.argv:native('onboardingResume')
else:
 plan=native('onboardingPlan',params);native('onboardingInstall',{'hash':plan['plan_hash']})
phases=[];last=None;existing_readback=json.loads((state/"setup/gbrain-readback.json").read_text()) if (state/"setup/gbrain-readback.json").exists() else {};confirmed=bool(existing_readback.get("confirmed_hash") and existing_readback.get("confirmed_hash")==existing_readback.get("upstream_hash"));started=time.monotonic();deadline=started+1200
while time.monotonic()<deadline:
 s=native('onboardingStatus',timeout=15)
 phase=(s.get('status'),s.get('phase'),len(s.get('confirmed',[])))
 if phase!=last:print(json.dumps({'status':phase[0],'phase':phase[1],'confirmed':phase[2],'seconds':round(time.monotonic()-started)},ensure_ascii=False),flush=True);phases.append(phase);last=phase
 if s.get('request'):
  print(json.dumps({'needs_user':s['request']},ensure_ascii=False),flush=True)
  raise RuntimeError('Codex requested a permission or answer; test does not grant it automatically.')
 if s.get('status')=='waiting_user' and s.get('readback'):
  # A synthetic fixture may confirm its exact upstream readback automatically. Product users use the UI.
  native('onboardingConfirmIdentity',{'hash':s['readback']['hash']});confirmed=True;native('onboardingResume')
 if s.get('status')=='completed':
  report={'status':'completed','real_codex_execution':True,'upstream_readback_confirmed_for_synthetic_fixture':confirmed,'elapsed_seconds':round(time.monotonic()-started),'confirmed':s['confirmed'],'verification':s.get('verification'),'phases':phases,'scope':'Fresh isolated fixture. Existing personal profile and vault untouched. No hook-trust bypass.'}
  (ROOT/'docs/evidence/onboarding-live.json').write_text(json.dumps(report,indent=2,ensure_ascii=False)+'\n');print(json.dumps({'result':'completed','verification':s.get('verification')},ensure_ascii=False));sys.exit(0)
 if s.get('status') in ('failed','paused','cancelled','interrupted'):
  print(json.dumps({'status':s['status'],'message':s.get('message'),'detail':s.get('detail')},ensure_ascii=False));raise RuntimeError('Installation stopped before verification.')
 time.sleep(2)
raise TimeoutError('Live onboarding exceeded 20 minutes; inspect before resuming.')
