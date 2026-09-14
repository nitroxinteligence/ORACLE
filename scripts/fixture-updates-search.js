/* Extends the isolated WKWebView bridge fixture. No real update or vault writes. */
(() => {
 const f=window.__oracleFixture,baseReceive=window.__oracleFixtureReceive;
 const q=s=>document.querySelector(s),qa=s=>[...document.querySelectorAll(s)],sleep=ms=>new Promise(r=>setTimeout(r,ms));
 const assert=(value,message)=>{if(!value)throw Error(message)};
 const wait=async(fn,message)=>{for(let i=0;i<240;i++){if(fn())return;await sleep(25)}throw Error(message)};
 const click=s=>{const el=q(s);assert(el&&!el.disabled,'Disabled/missing '+s);el.click()};
 f.ob={...f.ob,status:'completed',licensed:true,legacyAccess:true,hasVault:true,runID:'synthetic-complete'};f.config.vault='/__synthetic_oracle__/vault';f.ob.knowledgeWelcome={runID:f.ob.runID,vault:f.config.vault};
 let status={busy:false,available:true,knownUpdate:true,phase:'complete',results:[{id:'skills',status:'available'}]},delay=0;
 window.__oracleFixtureReceive=async request=>{
  const {id,method,params={}}=request;
  if(method==='updateStatus'){await sleep(delay);window.oracleReply(id,{value:structuredClone(status)});return}
  if(method==='updateStart'){f.calls.push({method,params});status={...status,busy:true,phase:params.operation==='check-only'?'checking':'installing',message:params.operation==='check-only'?'Verificando e preparando…':'Atualizando skills, prompts e tutoriais.',total:10,completed:2};window.oracleReply(id,{value:true});return}
  return baseReceive(request);
 };
 window.__oracleFixtureRun=async()=>{
  if(f.started)return;f.started=true;const cases=[];
  const check=async(name,run)=>{try{await run();cases.push({name,ok:true})}catch(e){cases.push({name,ok:false,error:e.message});throw e}};
  try{
   await wait(()=>q('#app')&&q('#lock-screen').hidden&&window.OracleOnboarding,'app startup');await sleep(150);applyAccessibility({reduceMotion:false});
   await check('Notice contains only title and a stable Metal action',async()=>{
    if(!q('#update-notice-metal')){startupUpdateNoticeShown=false;startupUpdateReady=true;latestUpdateStatus=status;maybeShowStartupUpdateNotice()}
    await wait(()=>q('#update-notice-metal button'),'notice');
    assert(!q('.modal-close'),'notice still has close icon');
    assert(q('#update-notice-metal button').getBoundingClientRect().height<=38,'notice action too tall');
    assert(!q('#update-notice-later')&&!q('.modal-body p'),'extra notice content');
    click('#update-notice-metal button');await wait(()=>q('#check-updates'),'updates opened');
   });
   await check('Check is read-only and keeps its button during polling',async()=>{
    const button=q('#check-updates');click('#check-updates');await wait(()=>status.busy,'check started');
    assert(f.calls.filter(c=>c.method==='updateStart').at(-1).params.operation==='check-only','Check started an install');
    await sleep(900);assert(q('#check-updates')===button,'poll replaced button');assert(!q('#modal .update-status .ob2-beam'),'status beam was not removed');
    assert(getComputedStyle(button).backgroundColor==='rgba(0, 0, 0, 0)'&&getComputedStyle(button).borderTopWidth==='0px','Check is not text-only');
    status={...status,busy:false,phase:'complete'};await pollUpdateStatus();await wait(()=>!button.disabled,'check completion');assert(q('#update-message').classList.contains('update-ready-badge'),'success badge missing');assert(q('.update-result').classList.contains('update-success'),'green card border missing');window.__fixtureSnapshotSaved=false;window.webkit.messageHandlers.fixture.postMessage({type:'snapshot',name:'options'});await wait(()=>window.__fixtureSnapshotSaved,'green updates screenshot');
   });
   await check('Install has its own progress dialog and reopening never disables the icon',async()=>{
    const metal=q('#apply-update-metal button');assert(metal.getBoundingClientRect().height<=38,'install action too tall');assert(getComputedStyle(metal).backgroundImage.includes('gradient'),'metal fallback missing');
    window.webkit.messageHandlers.fixture.postMessage({type:'snapshot'});await wait(()=>window.__fixtureSnapshotSaved,'snapshot');
    click('#apply-update-metal button');await wait(()=>q('#modal').dataset.family==='update-installing','installation dialog');
    await wait(()=>f.calls.filter(c=>c.method==='updateStart').at(-1)?.params.operation==='check-apply','Install did not apply');
    await pollUpdateStatus();
    assert(!q('#modal-content > .modal-header .modal-close'),'installation still has close icon');
    assert(q('#modal > .update-modal-beam')?.childElementCount>0,'full modal beam not mounted');
    assert(q('#update-progress').value===2&&q('#update-progress').max===10,'actual 20% progress not rendered');
    await closeModal();assert(q('#modal').open,'busy installation dismissed accidentally');
    status={...status,phase:'verifying',completed:0,total:0};await pollUpdateStatus();
    assert(!q('#update-progress').hasAttribute('value'),'unknown verification percentage was invented');
    status={...status,phase:'downloading',message:'Baixando atualização do Second Brain',completed:37,total:100};await pollUpdateStatus();
    await sleep(600);window.__fixtureSnapshotSaved=false;window.webkit.messageHandlers.fixture.postMessage({type:'snapshot',name:'installation'});await wait(()=>window.__fixtureSnapshotSaved,'beam and real progress screenshot');
    await closeModal(true);delay=1500;const started=performance.now();click('#updates');
    assert(q('#modal').open&&performance.now()-started<150&&!q('#updates').disabled,'opening waits for backend');
    await sleep(1800);delay=0;
   });
   await check('Terminal backend error replaces the spinner with its exact cause',async()=>{
    status={...status,busy:false,phase:'failed',error:'Markdown ainda não está disponível localmente.',results:[{id:'skills',status:'error',message:'Markdown ainda não está disponível localmente.'}]};
    await pollUpdateStatus();await wait(()=>q('#update-progress').hidden,'spinner stopped');
    assert(q('#update-message').textContent===status.error,'actual error hidden');assert(q('#update-message').classList.contains('update-error'),'red error badge missing');assert(q('#update-finish')&&!q('#update-finish').hidden,'no exit after terminal failure');
    assert(q('#modal-title').textContent==='Atualização não concluída','false success');
    await closeModal(true);
   });
   await check('Left pointer drag cannot move the map',async()=>{
    const a=atlasController;a.setPaused(true);const before=JSON.stringify(a.target),svg=a.el;
    svg.dispatchEvent(new PointerEvent('pointerdown',{bubbles:true,button:0,pointerId:51,clientX:400,clientY:400}));
    svg.dispatchEvent(new PointerEvent('pointermove',{bubbles:true,button:0,pointerId:51,clientX:580,clientY:520}));
    svg.dispatchEvent(new PointerEvent('pointerup',{bubbles:true,button:0,pointerId:51,clientX:580,clientY:520}));
    assert(JSON.stringify(a.target)===before&&!a.drag,'drag moved the camera');
   });
   await check('Search starts with ten skills, appends on scroll and expands on query',async()=>{
    openSearch();assert(qa('#search-results [data-hit]').length===10,'not ten initial results');
    assert(qa('#search-results small').every(e=>!e.textContent.includes('Rotina')),'unrelated default notes');
    const first=q('#search-option-0'),host=q('#search-results');host.scrollTop=host.scrollHeight;host.dispatchEvent(new Event('scroll'));
    assert(qa('#search-results [data-hit]').length===20&&q('#search-option-0')===first,'scroll replaced or failed to append');
    const input=q('#universe-query');input.value='Rotina';input.dispatchEvent(new Event('input'));
    assert(qa('#search-results [data-hit]').length===1&&q('#search-results').textContent.includes('Rotina'),'query did not find other notes');
   });
   await check('Filesystem snapshot events update sidebar immediately without engine indexing',async()=>{
    await closeModal(true);
    const path='Realtime sentinel.md';
    f.entries.push({path,name:path,directory:false,size:20});
    await window.oracleVaultSnapshotChanged();
    assert(q('#tree [data-path="Realtime sentinel.md"]'),'created file not shown after scan event');
    f.entries.splice(f.entries.findIndex(row=>row.path===path),1);
    await window.oracleVaultSnapshotChanged();
    assert(!q('#tree [data-path="Realtime sentinel.md"]'),'deleted file remained in sidebar');
    f.ob.hasVault=false;
    await window.oracleVaultSnapshotChanged();
    assert(!q('#tree [data-path]')&&!q('#tree [data-folder]'),'removed vault retained old sidebar contents');
   });
  }catch{}
  if(f.jsErrors.length||f.failures.length)cases.push({name:'No JavaScript or bridge failures',ok:false,error:JSON.stringify([...f.jsErrors,...f.failures])});
  window.webkit.messageHandlers.fixture.postMessage({type:'done',passed:cases.filter(c=>c.ok).length,failed:cases.filter(c=>!c.ok).length,cases,synthetic:true,realCore:false,jsErrors:f.jsErrors,bridgeFailures:f.failures});
 };
})();
