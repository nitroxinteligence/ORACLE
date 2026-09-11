// Executed as one async function by audit-ui-host.swift, using the actual packaged frontend.
const results=[],wait=ms=>new Promise(r=>setTimeout(r,ms));
const check=(name,pass,evidence={})=>results.push({name,pass:!!pass,...evidence});
OracleOnboarding.suspend();closeModal(true);await wait(50);
const base=structuredClone(state);base.config={fixture:true,vault:'/synthetic-vault'};
base.scan={complete:true,pending:false,signature:'fixture-initial',at:1};base.memorySync={state:'current',lastScanAt:1,generation:1,indexing:false};
base.onboarding={licensed:true,legacyAccess:false,status:'completed',confirmed:[]};
base.entries=[{path:'WIKI/Nota.md',name:'Nota.md',directory:false}];
const originalCall=call;
let snapshot=base,readError=false,slowSnapshot=0,slowMemory=0,visualFailure=false,methodCounts={},updateState={phase:'complete',busy:false,results:[]},doc={text:'Original',hash:'h0',editable:true,path:'/synthetic-vault/WIKI/Nota.md'},saved=[],drafts=[];
call=async(method,p={})=>{
 methodCounts[method]=(methodCounts[method]||0)+1;
 if(method==='snapshot'){if(slowSnapshot)await wait(slowSnapshot);return structuredClone(snapshot);}
 if(method==='read'){await wait(15);if(readError)throw Error('Leitura de teste indisponível');return {...doc};}
 if(method==='saveNote'){saved.push({...p});await wait(150);doc={...doc,text:p.text,hash:'h1'};return {status:'saved',document:{...doc}};}
 if(method==='saveDraft'){drafts.push({...p});return {saved:true};}
 if(method==='memoryStatus'){if(slowMemory)await wait(slowMemory);return structuredClone(snapshot.memorySync);}
 if(method==='saveVisualPreferences'){if(visualFailure)throw Error('Synthetic preference write failure');snapshot.config.visualPreferences={...snapshot.config.visualPreferences,...p};return {...snapshot.config.visualPreferences};}
 if(method==='updateStatus')return structuredClone(updateState);
 if(method==='gbrainRead')return {sources:[],version:'fixture'};
 if(['events','conversations','instructions'].includes(method))return [];
 return true;
};
// The shared component receives an injected bridge; replace its captured bridge too.
libraryHooks.call=(...args)=>call(...args);
await refresh();
check('department renderer booted without fallback exception',!!atlasController?.geometry&&typeof OracleDepartments==='object');
await openNote('WIKI/Nota.md');editNote();
const field=document.querySelector('#editor');field.value='Versão A';field.dispatchEvent(new Event('input',{bubbles:true}));
const pendingSave=saveEditor();await wait(20);field.value='Versão B, digitada enquanto salva';field.dispatchEvent(new Event('input',{bubbles:true}));
await pendingSave;await wait(80);
check('editor keeps latest revision after delayed save',document.querySelector('#editor')===field&&field.value.includes('Versão B')&&modalDirty&&drafts.some(d=>d.text.includes('Versão B')&&d.hash==='h1'),{sent:saved.at(-1)?.text,latest:field.value});
await saveEditor();check('saving the later revision updates the file without closing the editor',doc.text.includes('Versão B')&&document.querySelector('#editor')===field&&!modalDirty);
closeModal(true);await wait(50);
applyAccessibility({reduceMotion:false,reduceTransparency:false});
await saveVisualPreference('reduceMotion',true);await refresh();
check('motion preference persists through native preference bridge and snapshot',snapshot.config.visualPreferences.reduceMotion&&document.body.classList.contains('reduced'));
await saveVisualPreference('reduceMotion',false);applyAccessibility({reduceMotion:true});
check('system reduction overrides an app preference that allows motion',document.body.classList.contains('reduced')&&document.querySelector('#motion').disabled);
applyAccessibility({reduceMotion:false});
check('system preference can be disabled without retaining a stale forced setting',!document.body.classList.contains('reduced')&&!document.querySelector('#motion').disabled);
visualFailure=true;let rejectedPreference=false;try{await saveVisualPreference('economy',true);}catch{rejectedPreference=true;}visualFailure=false;
check('failed preference persistence restores the last saved value',rejectedPreference&&!document.querySelector('#economy').checked);
await saveVisualPreference('reduceMotion',true);
await memory();const visibilityDeadline=Date.now()+3000;while(document.hidden&&Date.now()<visibilityDeadline)await wait(50);const memoryField=document.querySelector('#memory-query');memoryField.value='Consulta em andamento';memoryField.focus();
snapshot.memorySync={...snapshot.memorySync,state:'partial',generation:2,error:'Synthetic partial scan'};await pollMemoryStatus();
check('freshness poll updates an open memory view without losing its query or focus',document.querySelector('#memory-query')===memoryField&&memoryField.value==='Consulta em andamento'&&document.activeElement===memoryField&&document.querySelector('#memory-freshness').textContent.includes('parcial'),{hidden:document.hidden,windowVisible:window.oracleWindowVisible??null,licensed:state.onboarding?.licensed,text:document.querySelector('#memory-freshness').textContent,requests:methodCounts.memoryStatus||0});
slowMemory=100;const pollsBefore=methodCounts.memoryStatus;await Promise.all([pollMemoryStatus(),pollMemoryStatus(),pollMemoryStatus()]);slowMemory=0;
check('concurrent freshness polls share one native request',methodCounts.memoryStatus-pollsBefore===1,{before:pollsBefore??null,after:methodCounts.memoryStatus??null});
snapshot.memorySync={...snapshot.memorySync,state:'current',error:null};await pollMemoryStatus();closeModal(true);await wait(40);
for(const status of ['not_configured','offline','error']){
 updateState={phase:'complete',busy:false,available:false,results:[{id:'skills',status}]};await showUpdates(false);
 const badge=document.querySelector(`[data-status="${status}"]`);
 check('update '+status+' is not presented as current or available',badge&&badge.dataset.tone!=='positive'&&document.querySelector('#apply-updates').hidden&&!document.querySelector('#update-results').textContent.includes('Sem atualização disponível'));
 closeModal(true);await wait(30);
}
const dir=path=>({path,name:path.split('/').at(-1),directory:true}),note=path=>({path,name:path.split('/').at(-1),directory:false});
snapshot.entries=[dir('SISTEMA/prompts'),dir('SISTEMA/prompts/design'),...Array.from({length:181},(_,i)=>note('SISTEMA/prompts/design/Nota '+String(i).padStart(3,'0')+'.md')),dir('SISTEMA/Tutoriais'),dir('SISTEMA/Tutoriais/design'),note('SISTEMA/Tutoriais/design/Guia.md')];
for(const[id,open,select]of [['prompt',promptLibrary,selectPrompt],['tutorial',tutorialsLibrary,selectTutorial]]){
 await open();const folder=document.querySelector(`[data-${id}-folder="SISTEMA/${id==='prompt'?'prompts':'Tutoriais'}/design"]`);folder.focus();folder.click();
 check(id+' folder focus restored after render',!folder.isConnected&&document.activeElement.dataset.folderPath===folder.dataset.folderPath);
 const buttons=[...document.querySelectorAll(`[data-${id}-document]`)];
 if(buttons.length>1){buttons[0].focus();buttons[0].dispatchEvent(new KeyboardEvent('keydown',{key:'ArrowDown',bubbles:true}));check('listbox ArrowDown moves focus',document.activeElement.dataset.documentPath===buttons[1].dataset.documentPath);}
 readError=true;await select(buttons[0].dataset.documentPath);
 check(id+' read failure removes loading and offers retry',!document.querySelector('.prompt-loading')&&!!document.querySelector('[data-retry]'));
 readError=false;closeModal(true);await wait(40);
 slowSnapshot=180;const pending=open();await wait(25);settings();await pending;slowSnapshot=0;
 check(id+' late response does not replace later navigation',document.querySelector('#modal-title')?.textContent==='Ajustes do Oracle');closeModal(true);await wait(40);
}
await promptLibrary();const firstPage=[...document.querySelectorAll('[data-prompt-document]')];
check('library DOM is bounded with complete pagination',firstPage.length===80,{visible:firstPage.length,total:promptData().documents.length});
const seen=new Set();for(let page=0;page<3;page++){document.querySelectorAll('[data-prompt-document]').forEach(b=>seen.add(b.dataset.documentPath));const next=document.querySelector('[data-page="1"]');if(next&&!next.disabled)next.click();}
check('all documents reachable through pages',seen.size===181,{seen:seen.size});closeModal(true);await wait(30);
const libraryEntries=structuredClone(snapshot.entries);snapshot.entries=[];snapshot.scan={pending:true,complete:false,at:1,signature:'pending'};
await promptLibrary();check('pending initial scan is not presented as a completed empty library',document.querySelector('#prompt-source-status').textContent.includes('em andamento'));
snapshot.entries=libraryEntries;snapshot.scan={pending:false,complete:true,at:2,signature:'complete'};snapshot.memorySync.lastScanAt=2;
await refresh();check('an open library fills when its asynchronous native snapshot arrives',document.querySelectorAll('[data-prompt-document]').length===80);
let listButton=document.querySelector('[data-prompt-document]');listButton.focus();listButton.dispatchEvent(new KeyboardEvent('keydown',{key:'End',bubbles:true}));
check('End reaches the last document across pages',document.activeElement.dataset.documentPath?.endsWith('Nota 180.md'));
document.activeElement.dispatchEvent(new KeyboardEvent('keydown',{key:'Home',bubbles:true}));
check('Home returns focus to the first document across pages',document.activeElement.dataset.documentPath?.endsWith('Nota 000.md'));
await originalCall('fixtureResize',{width:840,height:620});await wait(160);renderPromptLibrary();
const previewBounds=document.querySelector('#prompt-preview').getBoundingClientRect();
check('minimum window keeps a readable library preview',previewBounds.height>=200&&previewBounds.width>=260,{width:previewBounds.width,height:previewBounds.height,window:[innerWidth,innerHeight]});
await originalCall('fixtureSnapshot',{name:'library'});
const renderCosts=[];for(let i=0;i<5;i++){const before=performance.now();renderPromptLibrary();document.querySelector('#prompt-library').getBoundingClientRect();renderCosts.push(performance.now()-before);}
check('library render keeps a bounded document DOM',document.querySelectorAll('[data-prompt-document]').length===80,{renderMs:renderCosts,DOM:document.querySelector('#prompt-library').querySelectorAll('*').length});
closeModal(true);await wait(40);
snapshot.entries.push(dir('SISTEMA/skills/code'),note('SISTEMA/skills/code/fixture/SKILL.md'));snapshot.scan.signature='with-skills';await refresh();
const fixed=()=>Math.abs(atlasController.camera.k/atlasController.baseScale-1.18)<0.00001&&Math.abs(atlasController.target.k/atlasController.baseScale-1.18)<0.00001;
atlasController.fit();await wait(40);check('overview camera uses 118 percent in the minimum window',fixed());
atlasController.zoomAt(4);atlasController.el.dispatchEvent(new WheelEvent('wheel',{deltaY:-120,ctrlKey:true,bubbles:true,cancelable:true}));await wait(40);check('wheel and legacy zoom cannot change the fixed camera scale',fixed());
atlasController.navigateDepartment('code',0,true);await wait(50);check('department drilldown preserves 118 percent',fixed()&&atlasController.department==='code');
await originalCall('fixtureSnapshot',{name:'department'});
atlasController.navigate('code',null,null,0,false,true);await wait(50);check('specialist drilldown preserves 118 percent',fixed()&&atlasController.selected==='code');
const leafGroup=OracleLayout.catalogGroups('code',snapshot.entries).find(g=>g.skills.length);atlasController.navigate('code',leafGroup.id,leafGroup.skills[0].path,0,false,true);await wait(50);check('skill focus preserves actual 118 percent instead of 135 percent',fixed());
atlasController.back(true);await wait(50);atlasController.reset();await wait(50);check('return and reset preserve 118 percent',fixed());
const uppercase=OracleLibrary.inventory([dir('SISTEMA/PROMPTS'),note('SISTEMA/PROMPTS/Nota.md')],'SISTEMA/prompts');
check('existing root spelling discovered',uppercase.root==='SISTEMA/PROMPTS'&&uppercase.documents.length===1);
const ambiguous=OracleLibrary.inventory([dir('SISTEMA/PROMPTS'),note('SISTEMA/PROMPTS/Nota.md'),dir('SISTEMA/prompts'),note('SISTEMA/prompts/Nota.md')],'SISTEMA/prompts');
check('colliding roots require explicit selection',ambiguous.ambiguous&&ambiguous.documents.length===0);
const originalEntries=snapshot.entries;snapshot.entries=[dir('SISTEMA/PROMPTS'),note('SISTEMA/PROMPTS/Upper.md')];snapshot.scan.signature='uppercase-root';await refresh();
check('real renderer discovers uppercase prompts in the orbit',atlasController.promptOrbit.points.some(p=>p.path==='SISTEMA/PROMPTS/Upper.md'));
snapshot.entries.push(dir('SISTEMA/prompts'),note('SISTEMA/prompts/Lower.md'));snapshot.scan.signature='two-roots';await refresh();
check('real renderer does not merge case-distinct prompt roots',atlasController.promptOrbit.area.ambiguous&&atlasController.promptOrbit.points.length===0);
snapshot.config.libraryRoots={prompt:'SISTEMA/PROMPTS'};await refresh();
check('persisted library root also scopes the orbit',atlasController.promptOrbit.points.some(p=>p.path==='SISTEMA/PROMPTS/Upper.md')&&!atlasController.promptOrbit.points.some(p=>p.path==='SISTEMA/prompts/Lower.md'));
atlasController.navigateKnowledge('prompts','SISTEMA/PROMPTS',0,true);await wait(50);
check('prompt drilldown keeps the chosen path and fixed camera scale',atlasController.geometry.leaves.some(p=>p.id==='SISTEMA/PROMPTS/Upper.md')&&fixed());
atlasController.select(null);snapshot.entries=originalEntries;delete snapshot.config.libraryRoots;snapshot.scan.signature='restored';await refresh();
let ob={licensed:true,legacyAccess:false,status:'review',hasVault:true,vaultName:'Fixture',codexConnected:false,runID:'fixture-run',confirmed:[],review:{plan_hash:'fixture-hash',answers:{},folders:['AREAS/pessoal'],catalog_collections:[]}},obCalls=[];
await OracleOnboarding.mount({call:async(method)=>{obCalls.push(method);if(method==='onboardingStatus')return structuredClone(ob);if(method==='onboardingConfirmIdentity'){delete ob.readback;ob.status='paused';ob.phase='identity_confirmed';}if(method==='onboardingResume')ob.status='running';return true;},refresh:async()=>{},getState:()=>({catalog:[],collections:[]}),toast:()=>{}});
OracleOnboarding.open();check('review reopens with install and without online prerequisite',!!document.querySelector('#ob-install')&&!document.querySelector('#ob-connect'));
document.querySelector('.ob-close').click();OracleOnboarding.open();check('review survives closing with original plan action',!!document.querySelector('#ob-install'));
ob.status='running';ob.review.confirmed_hash='fixture-hash';await OracleOnboarding.poll();document.querySelector('.ob-close').click();OracleOnboarding.open();
ob.status='completed';ob.message='Concluído';await OracleOnboarding.poll();check('open progress reflects native completion',document.querySelector('#ob-title')?.textContent==='Seu Oracle está pronto.');
document.dispatchEvent(new KeyboardEvent('keydown',{key:',',metaKey:true,bubbles:true}));check('onboarding blocks competing global modal',document.querySelectorAll('dialog[open]').length===1);
ob.status='waiting_user';ob.request={id:'q1',generation:'fixture',kind:'item/tool/requestUserInput',questions:[{id:'secret',question:'Campo de teste',isSecret:true}]};await OracleOnboarding.poll();
check('question has explicit cancellation and secret masking',!!document.querySelector('#ob-cancel')&&document.querySelector('#ob-q-0')?.type==='password');
document.querySelector('#ob-q-0').value='SYNTHETIC_SECRET_NOT_A_DRAFT';document.querySelector('#ob-q-0').dispatchEvent(new Event('input',{bubbles:true}));
check('ephemeral secret question cannot become an onboarding draft',OracleOnboarding.pendingDraft()===null);
delete ob.request;ob.readback={hash:'fixture-readback',text:'Synthetic identity only'};await OracleOnboarding.poll();
document.querySelector('#ob-confirm-identity').click();await wait(80);
check('readback confirmation stays paused without automatic resume',ob.status==='paused'&&!obCalls.includes('onboardingResume')&&!!document.querySelector('#ob-resume'));
document.querySelector('#ob-resume').click();await wait(80);
check('a separate explicit action resumes after readback confirmation',ob.status==='running'&&obCalls.filter(m=>m==='onboardingResume').length===1);
document.querySelector('.ob-close').click();
check('app reduced motion also disables the onboarding progress animation',!!document.querySelector('.ob-working')&&getComputedStyle(document.querySelector('.ob-working')).animationName==='none');
OracleOnboarding.suspend();closeModal(true);call=originalCall;
return {checks:results,passed:results.filter(r=>r.pass).length,failed:results.filter(r=>!r.pass).length,scope:'Real WKWebView frontend; all bridge responses synthetic, no Core, account, vault or Keychain access'};
