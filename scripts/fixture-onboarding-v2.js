/* Injected at document start by atlas-web-fixture.m. Synthetic bridge ONLY.
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
      onboarding:f.ob,operations:{setup:f.ob.status==='running',gbrain:false},
      setup:f.ob.runID?{plan_id:f.ob.runID}:null,setupBaselinePaths:[],
      codexPlugins:{status:f.ob.codexConnected?'available':'unavailable',plugins:[]},
      gbrainSync:{status:f.ob.status==='completed'?'verified':'unconfigured'},departmentManifest:window.OracleDepartmentManifest});
  }
  async function invoke(method, params) {
    switch (method) {
      case 'boot': return {locked:false,accessibility:{reduceMotion:true}};
      case 'snapshot': return snapshot();
      case 'events': return [];
      case 'updateStatus': return {busy:false,available:false,knownUpdate:false,phase:'complete',checkedAt:new Date().toISOString(),results:[]};
      case 'onboardingStatus': return clone(f.ob);
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
      case 'onboardingOpenCodex':return true;
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
  window.addEventListener('error',event=>{if(event.message)f.jsErrors.push(event.message);});
  window.addEventListener('unhandledrejection',event=>f.jsErrors.push(String(event.reason?.stack||event.reason)));
  async function check(name, run, fatal=true) {
    try {await run();const result={type:'case',name,ok:true};f.cases.push(result);report(result);return true;}
    catch(error){const result={type:'case',name,ok:false,error:error.message};f.cases.push(result);report(result);if(fatal)throw error;return false;}
  }
  function breadcrumb(label) {return qa('.ob-navigation button').find(button=>button.textContent===label);}


  window.__oracleFixtureRun = async () => {
    if(f.started)return;f.started=true;
    try {
      await check('Invalid activation keeps a masked key field and clears error when typing',async()=>{
        await wait(()=>q('#ob2-key')&&window.OracleOnboarding,'access screen');
        assert(q('#ob2-key').type==='password','access key is visible');
        input('#ob2-key','invalid');click('.ob2-action button');
        await wait(()=>q('#ob2-key')?.getAttribute('aria-invalid')==='true','invalid code');
        assert(!f.ob.licensed,'invalid activation advanced');
        input('#ob2-key','ORACLE2.SYNTHETIC.SIGNATURE');
        assert(!q('#ob2-key').hasAttribute('aria-invalid'),'typing did not clear error');
      });
      await check('Activation advances to vault without optional Codex interview',async()=>{
        click('.ob2-action button');await wait(()=>q('.ob2-vault'),'vault stage');
        await wait(()=>!q('.ob2-activation').open,'activation overlay closed');
        assert(countCalls('onboardingConnect')===0,'implicit account connection');
        assert(q('.ob2-description').children.length===2,'vault explanation not split in two lines');
      });
      await check('Vault can be selected, removed without deleting data, and selected again',async()=>{
        assert(q('.ob2-action button').disabled,'vault is required');
        click('.ob2-vault-action button');await wait(()=>q('.ob2-selected-vault'),'selected vault');
        assert(q('.ob2-selected-vault span').textContent==='/__synthetic_oracle__/vault','actual vault path missing');
        click('.ob2-vault-action button');await wait(()=>q('.ob2-vault'),'cleared selection');
        assert(q('.ob2-action button').disabled,'removed vault can advance');
        click('.ob2-vault-action button');await wait(()=>q('.ob2-selected-vault'),'reselected vault');
        click('.ob2-action button');await wait(()=>q('.ob2-content h1')?.textContent==='Instale seu segundo cérebro.','install stage');
        assert(!qa('[data-answer]').length&&!q('#ob-connect'),'identity or account required');
      });
      await check('Daily schedule defaults to 15h and capture has separate consent',async()=>{
        assert(q('#ob-daily').checked&&q('#ob-daily-hour').value==='15','daily schedule default');
        await wait(()=>q('#ob-daily-hour').closest('.oracle-select'),'enhanced schedule select');
        click('#ob-daily-hour + .select-trigger');
        q('#ob-daily-hour').closest('.oracle-select').querySelectorAll('[role=option]')[20].click();
        assert(q('#ob-daily-hour').value==='20'&&q('#ob-daily').checked,'select did not retain hour or toggled maintenance');
        assert(qa('.ob2-content button').filter(b=>!b.classList.contains('select-trigger')).every(b=>b.classList.contains('ob2-metal-button')),'nonmetal onboarding action');
        assert(!q('#ob-capture').checked&&!q('#ob-synthesis').checked&&q('#ob-synthesis').disabled,'remote capture enabled without consent');
        q('#ob-capture').checked=true;q('#ob-capture').dispatchEvent(new Event('change',{bubbles:true}));
        assert(!q('#ob-synthesis').disabled,'synthesis consent unavailable');
        q('#ob-synthesis').checked=true;q('#ob-synthesis').dispatchEvent(new Event('change',{bubbles:true}));
        report({type:'snapshot',name:'options'});await wait(()=>window.__fixtureSnapshotSaved!==undefined,'options screenshot');assert(window.__fixtureSnapshotSaved,'options screenshot failed');delete window.__fixtureSnapshotSaved;
      });
      await check('Install reveals the shell with a compact header progress and no extra buttons',async()=>{
        await sleep(100);click('.ob2-action button');
        await wait(()=>!q('.ob2-screen').open&&f.ob.status==='running','shell during install');
        assert(f.installMaintenance?.hour===20&&f.installMaintenance?.consolidateWiki===true&&f.installMaintenance?.captureSource==='codex_workspace_hooks_v1','consent missing from install request');
        assert(countCalls('onboardingPlan')===0&&countCalls('onboardingInstall')===0,'legacy path called');
        assert(q('aside')&&q('#atlas'),'sidebar or map absent');
        assert(!q('.ob2-installation').hidden&&!qa('.ob2-installation button').some(visible),'missing progress or extra actions');
      });
      await check('Phase changes never restart verified progress',async()=>{
        f.ob.phase='downloading';f.ob.installationProgress={phase:'downloading',completed:10,total:10,unit:'arquivos'};await OracleOnboarding.poll();
        const before=q('.ob2-installation progress').value;
        f.ob.phase='installing';f.ob.installationProgress={phase:'installing',completed:0,total:100,unit:'arquivos'};await OracleOnboarding.poll();
        assert(q('.ob2-installation progress').value>=before,'progress restarted between stages');
        assert(q('.ob2-installation strong').textContent.includes('Instalando acervo'),'current phase missing');
      });
      await check('Verified skill receipt appears within 2 seconds and is unique',async()=>{
        const path='SISTEMA/skills/marketing/alpha-0000/SKILL.md';
        const started=performance.now();
        f.ob.confirmed.push({id:'obsidian',kind:'connector',label:'Synthetic Vault'},{id:'gbrain',kind:'connector',label:'Second Brain'},{id:'skill-fixture',kind:'skill',path,label:'Alpha'});
        await wait(()=>OracleOnboarding.getState().confirmed?.some(row=>row.id==='skill-fixture'),'receipt delivery',4000);
        const projection=OracleInstallationVisual.projection(snapshot());
        assert(projection.entries.filter(row=>row.path===path).length===1,'missing or duplicated skill');
        await wait(()=>visible(q('[data-category=\"department/marketing\"]')),'rendered verified department',4000);
        assert(qa('.department-node').length===1,'unverified empty departments rendered');
        f.latency=performance.now()-started;assert(f.latency<=2000,'receipt exceeded 2 second UI delivery');
        assert(projection.connectors.length===0&&!qa('.verified-connector').length,'unexpected integration icons in graph');
        report({type:'snapshot'});await wait(()=>window.__fixtureSnapshotSaved!==undefined,'native screenshot');assert(window.__fixtureSnapshotSaved,'native screenshot failed');
      });
      await check('Prompts and tutorials require independent verified receipts',async()=>{
        const path='SISTEMA/prompts/exemplo.md';
        assert(!OracleInstallationVisual.projection(snapshot()).entries.some(row=>row.path===path),'unverified prompt visible');
        f.ob.confirmed.push({id:'prompt-fixture',kind:'prompt',path,label:'Prompt'});
        assert(OracleInstallationVisual.projection(snapshot()).entries.some(row=>row.path===path),'verified prompt missing');
        const isolated={config:{},entries:[{path:'SISTEMA/Tutoriais/Guide.md',name:'Guide.md'}],collections:[],setup:{plan_id:f.ob.runID},setupBaselinePaths:[],onboarding:{...f.ob,confirmed:[]}};
        assert(!OracleInstallationVisual.projection(isolated).entries.length,'unverified tutorial visible');
        isolated.onboarding.confirmed=[{id:'tutorial-fixture',kind:'tutorial',path:'SISTEMA/Tutoriais/Guide.md'}];
        assert(OracleInstallationVisual.projection(isolated).entries.length===1,'verified tutorial missing');
      });
      await check('Interrupted installation offers explicit same-plan continuation',async()=>{
        f.ob.status='interrupted';f.ob.message='Synthetic interruption';await OracleOnboarding.poll();OracleOnboarding.open();
        await wait(()=>visible(q('.ob2-retry')),'resume action');click('.ob2-retry button');
        await wait(()=>!q('.ob2-screen').open&&f.ob.status==='running','resume shell');
        assert(f.ob.runID==='memory-only-fixture','resume changed install ID');
      });
      await check('Codex integration remains pending until hooks and scheduler are verified',async()=>{
        f.ob.status='completed';f.ob.integrationPending=true;await OracleOnboarding.poll();
        assert(!q('.ob2-installation').hidden&&visible(q('[data-open-codex] button')),'integration silently skipped');
        click('[data-copy-codex] button');await wait(()=>f.copied?.includes('Synthetic request'),'copied registration procedure');
        assert(!qa('.verified-connector').length,'unexpected graph connectors');
        f.ob.integrationPending=false;
      });
      await check('Completion removes progress without additional interview',async()=>{
        f.ob.status='completed';f.ob.message='Pronto';await OracleOnboarding.poll();
        await wait(()=>q('.ob2-installation').hidden&&!q('.ob2-screen').open,'completion without another screen');
        assert(countCalls('onboardingConnect')===0&&countCalls('onboardingConfirmIdentity')===0,'implicit consent or login');
        assert(countCalls('onboardingOpenCodex')===1,'missing or duplicate automatic Codex handoff');
      });
    } catch(error){f.error=error.message;}
    if(f.failures.length||f.jsErrors.length)f.cases.push({name:'No bridge or JavaScript failures',ok:false,error:JSON.stringify([...f.failures,...f.jsErrors])});
    const failed=f.cases.filter(row=>!row.ok).length;
    report({type:'done',passed:f.cases.filter(row=>row.ok).length,failed:failed+(f.error&&!failed?1:0),cases:f.cases,error:f.error||null,receiptLatencyMs:f.latency||null,synthetic:true,realCore:false,hostDiscovered:false,jsErrors:f.jsErrors,bridgeFailures:f.failures});
  };
})();
