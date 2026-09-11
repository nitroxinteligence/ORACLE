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
    maintenance:{enabled:false,external:false,hour:3,timezone:'UTC',scheduleState:'disabled',autoCapture:false,remoteProcessing:false,lastRun:{},message:'Executor local; registro externo não verificado.'},
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
      setup:f.ob.runID?{plan_id:f.ob.runID}:null,setupBaselinePaths:files,
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
        f.ob.hasVault=true;f.ob.vaultName='Synthetic Vault';f.ob.status='configuring';f.config.vault='/__synthetic_oracle__/vault';return true;
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
      await check('ORACLE2 device request is explicit, preserves typed code on failure/success and never activates',async()=>{
        await wait(()=>q('#ob-code')&&window.OracleOnboarding,'ORACLE2 screen');
        assert(countCalls('onboardingDeviceRequest')===0&&!q('#ob-copy-device'),'Implicit device creation');
        input('#ob-code','ORACLE2.SYNTHETIC.SIGNATURE');click('#ob-device-request');
        await wait(()=>q('[data-ob-message]')?.textContent.includes('Synthetic device unavailable'),'device refusal');
        assert(q('#ob-code').value==='ORACLE2.SYNTHETIC.SIGNATURE'&&!f.ob.licensed,'Failure lost code or activated');
        click('#ob-device-request');await wait(()=>q('#ob-copy-device'),'explicit synthetic device');
        assert(q('#ob-code').value==='ORACLE2.SYNTHETIC.SIGNATURE'&&!f.ob.licensed,'Request consumed access code or activated');
        click('#ob-copy-device');await wait(()=>f.copied===f.ob.deviceID,'copy public device identifier');
        assert(!f.copied.includes('SIGNATURE')&&countCalls('onboardingConnect')===0,'Copied access code or connected early');
      });
      await check('Access activation precedes vault/account and rejects invalid code',async()=>{
        await wait(()=>q('#ob-code')&&window.OracleOnboarding,'onboarding access screen');
        assert(countCalls('onboardingConnect')===0,'Connected before activation/vault');
        input('#ob-code','invalid');click('#ob-activate');await wait(()=>q('[data-ob-message]')&&!q('[data-ob-message]').hidden,'invalid-code alert');
        assert(!!q('#ob-code'),'Invalid code advanced configuration');
        input('#ob-code','ORACLE2.SYNTHETIC.SIGNATURE');click('#ob-activate');await wait(()=>q('#ob-vault-next'),'vault stage');
        assert(f.ob.licensed&&countCalls('onboardingConnect')===0,'Access/vault order violated');
      });
      await check('Vault selection gates continuation and retains minimal configuration',async()=>{
        click('#ob-vault-next');await wait(()=>q('[data-ob-message]')?.textContent.includes('Escolha uma pasta'),'missing-vault guard');
        q('#ob-new').checked=true;click('#ob-vault');await wait(()=>q('.ob-selection')?.textContent.includes('Synthetic Vault'),'selected fixture vault');
        click('#ob-vault-next');await wait(()=>q('#ob-connect'),'Codex stage');
        assert(q('#ob-next').disabled,'Disconnected account permits continuation');
        assert(f.ob.draft.newVault===true&&f.ob.draft.catalogCollections.length===0,'Vault options lost or optional packs added');
      });
      await check('Account authorization can cancel; explicit model selection gates continuation',async()=>{
        click('#ob-connect');await wait(()=>q('#ob-cancel-login'),'pending login');
        click('#ob-cancel-login');await wait(()=>!q('#ob-cancel-login'),'cancelled login');
        click('#ob-connect');await wait(()=>q('#ob-model'),'model selector');
        assert(q('#ob-next').disabled,'Missing model permits continuation');
        assert(q('#ob-model').options.length===3,'Model selector does not reflect native payload');
        changeModel('fixture-codex-a');await wait(()=>f.ob.modelSelection?.model==='fixture-codex-a'&&!q('#ob-next').disabled,'model selection applied');
        click('#ob-next');await wait(()=>q('#ob-AGENT_NAME'),'identity fields');
      });
      await check('Model changes wait for serialized pending identity drafts',async()=>{
        f.holdDrafts=true;input('#ob-AGENT_NAME','Draft A');input('#ob-PRINCIPAL_NAME','Fixture Person');
        await wait(()=>f.draftActive===1,'held draft');
        input('#ob-AGENT_NAME','Final Fixture Companion');click('#ob-identity-back');
        await wait(()=>q('#ob-model'),'return to model selector');
        const before=countCalls('onboardingSelectModel');changeModel('fixture-codex-b');await sleep(60);
        assert(countCalls('onboardingSelectModel')===before,'Model write raced an older queued draft');
        f.releaseDrafts();await wait(()=>f.ob.modelSelection?.model==='fixture-codex-b'&&!q('#ob-next').disabled,'model after save drain');
        assert(f.draftMax===1,'Draft writes ran concurrently');
        assert(f.ob.draft.model==='fixture-codex-b','Older draft overwrote selected model');
        click('#ob-next');await wait(()=>q('#ob-AGENT_NAME'),'identity restored');
        assert(q('#ob-AGENT_NAME').value==='Final Fixture Companion','Latest identity input was lost');
        click('#ob-identity-next');await wait(()=>q('#ob-AGENT_PURPOSE'),'goals stage');
        input('#ob-AGENT_PURPOSE','Synthetic knowledge organization');input('#ob-AGENT_TOP_JOBS','Synthetic local planning');
        click('#ob-identity-next');await wait(()=>q('#ob-PRINCIPAL_CONTEXT'),'preferences stage');
      });
      await check('Failed draft is visible and prepareToClose rejects without losing fields',async()=>{
        input('#ob-PRINCIPAL_CONTEXT','Fixture projects');input('#ob-VOICE_REGISTER','Clear and direct');
        // Drain the input debounce and prior successful saves before injecting a
        // failure in the final close-time save, not an older superseded payload.
        await sleep(260);await window.OracleOnboarding.prepareToClose();
        f.failNextDraft=true;let rejected=false;
        try{await window.OracleOnboarding.prepareToClose();}catch{rejected=true;}
        assert(rejected,'Failed persistence was reported as a safe close');
        assert(q('[data-ob-message]')?.textContent.includes('salvar'),'Save failure not visible');
        assert(q('#ob-PRINCIPAL_CONTEXT').value==='Fixture projects','Failed save discarded the draft');
      });
      await check('Review waits for final queued answers and preserves selected model/consent',async()=>{
        f.holdDrafts=true;input('#ob-PRINCIPAL_CONTEXT','Old context');await wait(()=>f.draftActive===1,'held preferences');
        input('#ob-PRINCIPAL_CONTEXT','Final context <synthetic>');q('#ob-maintenance').checked=true;
        const before=countCalls('onboardingPlan');click('#ob-identity-next');await sleep(60);
        assert(countCalls('onboardingPlan')===before,'Review raced unfinished drafts');
        f.releaseDrafts();await wait(()=>q('#ob-install'),'review');
        assert(f.ob.draft.answers.PRINCIPAL_CONTEXT==='Final context <synthetic>','Review used stale answers');
        assert(f.ob.draft.model==='fixture-codex-b','Review lost model choice');
        assert(f.ob.draft.maintenance.enabled&&!f.ob.draft.maintenance.autoCapture&&!f.ob.draft.maintenance.remoteProcessing,'Local consent widened unexpectedly');
        assert(q('.ob-review').textContent.includes('Synthetic Vault'),'Review lost vault');
        assert(qa('.ob-review').some(el=>el.textContent.includes('Final context <synthetic>')),'Review escaping or content incorrect');
        assert(f.draftMax===1,'Draft queue was not serial');
      });
      await check('Installation submits reviewed hash and request queue advances by exact ID',async()=>{
        click('#ob-install');await wait(()=>!q('.ob-dialog').open,'running card');
        assert(f.calls.find(call=>call.method==='onboardingInstall').params.hash==='synthetic-plan-hash','Wrong install hash');
        f.requests=[{id:'synthetic-approval-1',kind:'item/commandExecution/requestApproval',reason:'Synthetic first permission',command:'fixture-only; not executed'},
          {id:'synthetic-approval-2',kind:'item/commandExecution/requestApproval',reason:'Synthetic second permission',command:'fixture-only; not executed'}];
        f.ob.request=f.requests[0];f.ob.status='waiting_user';await window.OracleOnboarding.poll();window.OracleOnboarding.open();
        await wait(()=>q('#ob-allow'),'first approval');click('#ob-allow');
        await wait(()=>q('#ob-decline')&&q('.ob-body').textContent.includes('second permission'),'second approval');click('#ob-decline');
        await wait(()=>!q('.ob-dialog').open,'permission queue empty');
        const answers=f.calls.filter(call=>call.method==='onboardingAnswer').map(call=>call.params);
        assert(answers.length===2&&answers[0].id==='synthetic-approval-1'&&answers[0].allow&&answers[1].id==='synthetic-approval-2'&&!answers[1].allow,'Permission answers were misrouted');
      });
      await check('Completion closes onboarding with no exercise, guided-first-use or CTA',async()=>{
        window.OracleOnboarding.open();await wait(()=>q('.ob-dialog').open,'progress dialog');
        f.ob.status='completed';f.ob.message='Synthetic completion';f.ob.confirmed=[{id:'sol',kind:'core',label:'Oracle'},
          {id:'obsidian',kind:'connector',label:'Synthetic Vault'},{id:'gbrain',kind:'connector',label:'Second Brain'}];
        await window.OracleOnboarding.poll();await wait(()=>!q('.ob-dialog').open&&!document.body.classList.contains('setup-pending'),'completed graph');
        assert(q('.ob-progress-card').hidden,'Completed onboarding retained a CTA card');
        assert(qa('.oracle-onboarding button').every(button=>!visible(button)),'Completed onboarding displays a button');
        assert(!f.calls.some(call=>/first|cold.?start|tutorial|openCodex/i.test(call.method)),'Completion launched a guided action');
        await wait(()=>typeof atlasController!=='undefined'&&atlasController?.catalog?.skillCount===1049,'integrated catalog');
      });
      await check('Integrated tree groups only discovered specialists and overview hides skill leaves',async()=>{
        assert(q('#tree [data-department="department/code"]'),'Código department missing');
        assert(q('#tree [data-department="department/code"]').parentElement.querySelector('[data-collection="cyber-security"]'),'Cybersecurity not nested in Código');
        assert(q('#tree [data-department="department/other"]').parentElement.querySelector('[data-collection="unknown-specialist"]'),'Unmatched specialist vanished');
        assert(!q('#tree [data-collection="Impeccable"]')&&!atlasController.nodes.has('Impeccable'),'Absent package was invented');
        assert(atlasController.leaves.size===0,'Overview contains skill clutter');
        assert(Math.abs(atlasController.target.k/atlasController.baseScale-1.18)<1e-6,'Overview default zoom changed');
        assert(atlasController.knowledgeOrbit.areas.map(area=>area.name).join('|')==='Pessoal|Profissional','Knowledge orbit names changed');
        assert(atlasController.promptOrbit.points.length>0,'Prompts orbit missing');
      });
      await check('Department tree callback populates inspector and pageable real graph',async()=>{
        click('#tree [data-department="department/code"]');await wait(()=>atlasController.context.kind==='department','department view');
        assert(q('#inspector-title').textContent==='Código','Department inspector title incorrect');
        assert(qa('[data-inspect-specialist]').length===2,'Department inspector has wrong membership');
        assert(atlasController.geometry.leaves.length===50&&atlasController.geometry.total===1043,'Department paging catalog incorrect');
        const first=new Set(atlasController.geometry.leaves.map(leaf=>leaf.id));click('[data-map-page="1"]');
        assert(atlasController.context.page===1&&atlasController.geometry.leaves.every(leaf=>!first.has(leaf.id)),'Department page repeats skills');
        click('[data-inspect-specialist="code"]');await wait(()=>atlasController.selected==='code','specialist inspector');
        assert(q('#inspector-title').textContent==='code'&&q('#inspector .big-count').textContent==='225','Specialist inspector incorrect');
        for(let i=0;i<4;i++)click('[data-map-page="1"]');
        assert(atlasController.geometry.leaves.length===25&&q('[data-map-page="1"]').disabled,'Specialist tail is unreachable or overlaps');
      });
      await check('Tree Ver todas searches all 818 skills with 100-result pages and hidden tail reveal',async()=>{
        click('#tree [data-prefix="SISTEMA/skills/cyber-security"]');await wait(()=>q('#universe-query'),'scoped search');
        assert(q('#search-count').textContent.includes('818 resultados'),'Search was capped to scene/tree sample');
        const seen=new Set();
        for(let page=0;page<9;page++){
          const titles=qa('#search-results strong').map(el=>el.textContent);
          assert(titles.length===(page===8?18:100),'Wrong result page length');
          for(const title of titles){assert(!seen.has(title),'Search page overlap '+title);seen.add(title);}
          if(page<8)click('#search-next');
        }
        assert(seen.size===818&&q('#search-next').disabled,'Search tail/final button incorrect');
        const tail='SISTEMA/skills/cyber-security/alpha-0817/SKILL.md';
        assert(!atlasController.leaves.has(tail),'Tail unexpectedly already rendered');
        click('#search-results [data-hit="17"]');await wait(()=>q('#modal').dataset.family==='reader','reader for hidden result');
        await wait(()=>atlasController.selectedLeaf===tail,'hidden result atlas route');
        assert(atlasController.leaves.has(tail)&&atlasController.context.page===16,'Hidden skill not revealed on final atlas page');
        assert(q('#inspector-title').textContent==='alpha 0817','Hidden skill inspector incorrect');
        assert(f.calls.filter(call=>call.method==='read').at(-1).params.path===tail,'Reader opened wrong path');
        click('.modal-close');click('#context-back');await wait(()=>atlasController.selected==='code'&&atlasController.context.page===4,'prior page restored');
      });
      await check('Department search clears scope and input change resets pagination/ARIA selection',async()=>{
        atlasController.setDepartment('department/code');click('#department-search');
        assert(q('#search-count').textContent.includes('1043 resultados'),'Department search excludes hidden skills');
        click('#search-next');assert(q('#search-count').textContent.includes('página 2'),'Search page did not advance');
        input('#universe-query','alpha-0817');assert(qa('#search-results [role=option]').length===1,'Search terms not applied');
        assert(q('#universe-query').getAttribute('aria-activedescendant')===q('#search-results [role=option]').id,'Combobox active descendant stale');
        click('#clear-search-scope');input('#universe-query','unknown-specialist');
        assert(q('#search-count').textContent.includes('3 resultados'),'Full search stayed scoped to Código');
        click('.modal-close');
      });
      await check('Empty discovered source and empty department remain distinct in integrated inspector',async()=>{
        atlasController.setDepartment('department/sales');assert(q('#inspector').textContent.includes('Nenhum especialista instalado'),'Empty department unexplained');
        atlasController.focus('contents');assert(q('#inspector .big-count').textContent==='0','Empty present source missing count');
        assert(visible(q('.knowledge-empty'))&&q('.knowledge-empty').textContent.includes('fonte está presente'),'Empty present source explanation missing');
      });
      await check('Escape from sidebar returns a selected department to the previous graph context',async()=>{
        atlasController.select(null);atlasController.setDepartment('department/code');
        const summary=q('#tree [data-department="department/code"]');summary.focus();
        summary.dispatchEvent(new KeyboardEvent('keydown',{key:'Escape',bubbles:true}));await sleep(50);
        assert(atlasController.context.kind==='global','Escape ignored department-only selection outside the SVG; actual='+atlasController.context.kind);
      },false);
      await check('Backup UI keeps consent separate, exposes errors and distinguishes integrity from restore',async()=>{
        click('#settings');click('#backup-settings');await wait(()=>q('#backup-enabled'),'backup settings');
        assert(!q('#backup-enabled').checked&&q('#backup-create').disabled,'Backup implicitly enabled');
        q('#backup-enabled').checked=true;click('#backup-save');await wait(()=>q('#backup-create')&&!q('#backup-create').disabled,'saved consent');
        assert(!f.maintenance.enabled&&countCalls('configureMaintenance')===0,'Backup widened maintenance consent');
        f.failBackup=true;click('#backup-create');await wait(()=>q('.modal-notice')?.textContent.includes('Synthetic backup failure'),'visible backup error');
        assert(!f.backup.lastRun.id,'Failed backup became success');
        click('#backup-create');await wait(()=>q('#backup-restore')&&!q('#backup-restore').disabled,'created backup');
        assert(q('.ob-review').textContent.includes('restauração ainda não testada'),'Hash check presented as restore');
        click('#backup-verify');await wait(()=>countCalls('backupVerify')===1&&!q('#backup-verify').disabled,'integrity verification');
        const before=countCalls('backupRestore');click('#backup-restore');
        assert(countCalls('backupRestore')===before&&q('#backup-restore-confirm'),'Restore without separate confirmation');
        click('#backup-restore-cancel');await wait(()=>q('#backup-restore'),'restore cancelled');
        assert(countCalls('backupRestore')===before,'Cancellation restored data');
        click('#backup-restore');click('#backup-restore-confirm');await wait(()=>q('.ob-review')?.textContent.includes('Restauração de teste verificada'),'restore readback');
        assert(f.backup.lastRun.activated===false&&f.backup.lastRun.live_overwritten===false,'Activated restored database');
        q('#backup-enabled').checked=false;click('#backup-save');await wait(()=>q('#backup-create')?.disabled,'revoked backup');
        click('.modal-close');
      });
      await check('Maintenance UI runs only after consent and never claims host registration',async()=>{
        click('#settings');click('#maintenance-settings');await wait(()=>q('#maintenance-enabled'),'maintenance settings');
        assert(q('#maintenance-run').disabled&&q('#maintenance-request').disabled,'Unconsented actions enabled');
        q('#maintenance-enabled').checked=true;click('#maintenance-save');await wait(()=>q('#maintenance-run')&&!q('#maintenance-run').disabled,'consented maintenance');
        assert(!f.backup.enabled,'Maintenance enabled backup implicitly');
        click('#maintenance-run');await wait(()=>countCalls('maintenanceRun')===1&&q('.modal-notice')?.textContent.includes('Rotina local verificada'),'local execution');
        click('#maintenance-request');await wait(()=>q('#copy-maintenance-request'),'scheduler handoff');
        assert(q('.modal-body').textContent.includes('ainda não registrado'),'Prepared request claimed registration');
        click('.modal-close');
      });
      await check('Capture and remote synthesis have independent explicit scoped UI consent',async()=>{
        click('#settings');click('#maintenance-settings');await wait(()=>q('#maintenance-capture'),'capture consent controls');
        assert(!q('#maintenance-capture').checked&&!q('#maintenance-remote').checked&&q('#maintenance-remote').disabled,'Local maintenance implicitly captures or sends data');
        q('#maintenance-capture').checked=true;q('#maintenance-capture').dispatchEvent(new Event('change',{bubbles:true}));
        assert(!q('#maintenance-remote').disabled&&!q('#maintenance-remote').checked,'Capture silently enables remote use');
        click('#maintenance-save');await wait(()=>f.maintenance.autoCapture===true&&!q('#maintenance-save').disabled,'capture-only consent saved');
        assert(f.maintenance.captureSource==='codex_workspace_hooks_v1'&&!f.maintenance.remoteProcessing,'Capture consent widened');
        q('#maintenance-remote').checked=true;click('#maintenance-save');await wait(()=>f.maintenance.remoteProcessing===true&&!q('#maintenance-save').disabled,'remote consent saved');
        assert(f.maintenance.synthesisScope==='captured_messages_codex_v1'&&!f.backup.enabled,'Remote scope missing or backup opted in');
        assert(q('.modal-body').textContent.includes('Não lê histórico privado')&&q('.modal-body').textContent.includes('Conteúdo já enviado não pode ser recolhido'),'Capture/remote boundaries not explained');
        q('#maintenance-enabled').checked=false;q('#maintenance-enabled').dispatchEvent(new Event('change',{bubbles:true}));
        click('#maintenance-save');await wait(()=>!f.maintenance.enabled&&q('#maintenance-run')?.disabled,'pause saved');
        assert(!f.maintenance.autoCapture&&!f.maintenance.remoteProcessing,'Pause left content processing authorized');
        click('.modal-close');
      });
      await check('WebKit has no uncaught JavaScript errors or unexpected privileged bridge calls',async()=>{
        assert(f.jsErrors.length===0, f.jsErrors.join('\n'));
        assert(f.failures.length===0, f.failures.join('\n'));
        assert(f.draftMax===1,'Draft save concurrency exceeded one');
      },false);
    } catch(error) {
      f.abort=error.message;
    } finally {
      f.releaseDrafts();
      const renderer=typeof atlasController!=='undefined'&&atlasController?atlasController.diagnostics():null;
      window.OracleOnboarding?.suspend();
      if(typeof atlasController!=='undefined')atlasController?.setPaused(true);
      report({type:'done',passed:f.cases.filter(row=>row.ok).length,failed:f.cases.filter(row=>!row.ok).length,
        cases:f.cases,abort:f.abort||null,jsErrors:f.jsErrors,bridgeViolations:f.failures,
        bridgeCalls:f.calls.map(call=>call.method),draftMaximumConcurrent:f.draftMax,renderer,
        contract:'Native WKWebView over unchanged web files; mock bridge and in-memory data only. Does not verify native Core, real Codex authorization, inference, or engine installation.'});
    }
  };
})();
