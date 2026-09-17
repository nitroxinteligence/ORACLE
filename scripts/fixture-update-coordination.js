/* Actual Oracle web sources in WKWebView. Native replies are deliberately
 * reordered; no real Core, network, vault, credentials or installation. */
(() => {
 const f=window.__oracleFixture,baseReceive=window.__oracleFixtureReceive;
 const q=s=>document.querySelector(s),copy=v=>JSON.parse(JSON.stringify(v));
 const sleep=ms=>new Promise(r=>setTimeout(r,ms));
 const assert=(ok,message)=>{if(!ok)throw Error(message)};
 const wait=async(fn,label)=>{for(let n=0;n<350;n++){if(fn())return;await sleep(20)}throw Error('Timed out: '+label)};
 const oldError='Outra operação está em andamento. Os arquivos foram preservados; tente novamente após a conclusão.';
 const known=[{id:'gbrain',status:'available',version:'0.99.0.0'}];
 const old=()=>({busy:false,phase:'failed',message:oldError,available:true,knownUpdate:true,results:[],pendingUpdates:copy(known)});
 let status=old(),mode='normal',holdNext=false,held=null,requestMissing=false,starts=0,executions=0,statusReads=0,cancelCalls=0;
 const cases=[],trace=[];let appInstalls=0;
 f.ob={...f.ob,status:'completed',licensed:true,legacyAccess:true,hasVault:true,runID:'synthetic-update-coordination'};
 f.config.vault='/__synthetic_oracle__/vault';f.ob.knowledgeWelcome={runID:f.ob.runID,vault:f.config.vault};
 const publish=(phase,extra={})=>{status={...status,phase,revision:(status.revision||0)+1,...extra}};
 const complete=()=>publish('complete',{busy:false,canCancelWait:false,message:'Verificação concluída.',results:copy(known)});
 const flush=()=>{assert(held,'No delayed response');const reply=held;held=null;window.oracleReply(reply.id,{value:reply.value})};
 const click=id=>{const el=q(id);assert(el&&!el.disabled,'Missing/disabled '+id);el.click()};
 window.__oracleFixtureReceive=async ({id,method,params={}})=>{
  if(method==='installOracleUpdate'){appInstalls++;window.oracleReply(id,{value:{restarting:true,version:status.results?.find(row=>row.id==='oracle')?.version||'synthetic'}});return;}
  if(method==='updateStatus'){
   statusReads++;const value=copy(status);
   trace.push({method,requestID:params.requestID,phase:value.phase,revision:value.revision});
   if(holdNext){holdNext=false;held={id,value};return;}
   if(params.requestID&&(requestMissing||params.requestID!==value.requestID)){window.oracleReply(id,{value:{requestID:params.requestID,requestNotFound:true,phase:'interrupted',busy:false,revision:0}});return;}
   window.oracleReply(id,{value});return;
  }
  if(method==='updateStart'){
   starts++;trace.push({method,...params});
   assert(/^[a-f\d-]{36}$/i.test(params.requestID),'Start requires UUID');
   if(status.busy){window.oracleReply(id,{value:{accepted:false,requestID:status.requestID,operation:status.operation,status:copy(status)}});return;}
   if(mode==='not-found'){window.oracleReply(id,{error:'Synthetic unconfirmed start'});return;}
   executions++;
   status={...old(),requestID:params.requestID,operation:params.operation,revision:1,busy:true,phase:'checking',message:'Consultando fontes sintéticas.',results:[],canCancelWait:false};
   if(mode==='waiting')publish(params.automatic?'deferred':'waiting',{busy:!params.automatic,canCancelWait:!params.automatic,message:params.automatic?'Consulta automática adiada.':'Aguardando a operação atual para continuar…'});
   if(mode==='lost-ack'){window.oracleReply(id,{error:'Synthetic acknowledgement lost'});return;}
   window.oracleReply(id,{value:{accepted:true,requestID:params.requestID,operation:params.operation,status:copy(status)}});return;
  }
  if(method==='updateCancel'){
   cancelCalls++;
   if(status.requestID!==params.requestID||!status.canCancelWait){window.oracleReply(id,{error:'A execução já começou; apenas a espera pode ser cancelada.'});return;}
   publish('cancelled',{busy:false,canCancelWait:false,message:'Espera cancelada. A atualização não começou.',results:[]});
   window.oracleReply(id,{value:copy(status)});return;
  }
  return baseReceive({id,method,params});
 };
 async function reset(){
  resetUpdateTracking();if(held)flush();holdNext=false;
  await closeModal(true);status=old();mode='normal';requestMissing=false;latestUpdateStatus=copy(status);startupUpdateNoticeShown=true;
 }
 const check=async(name,run)=>{try{await run();cases.push({name,ok:true})}catch(error){cases.push({name,ok:false,error:error.message});throw error}};
 window.__oracleFixtureRun=async()=>{
  if(f.started)return;f.started=true;
  try{
   await wait(()=>q('#app')&&!q('#app').inert&&q('#lock-screen').hidden&&window.OracleOnboarding,'startup');await sleep(200);
   await check('Verify sends one identified read-only request and clears the previous error',async()=>{
    await reset();await showUpdates();const before=starts;
    click('#check-updates');q('#check-updates').click();
    await wait(()=>starts===before+1&&status.busy,'identified Verify');
    assert(status.operation==='check-only','Verify attempted installation');
    assert(!q('#update-message').classList.contains('update-error'),'old red badge survived start');
    complete();await wait(()=>!q('#check-updates').disabled,'completion');
    assert(starts===before+1&&!q('#update-message').classList.contains('update-error'),'duplicate request or stale error');
   });
   await check('Pre-click terminal response cannot stop polling the new request',async()=>{
    await reset();holdNext=true;const opening=showUpdates();await wait(()=>held,'old status held');
    const before=starts;click('#check-updates');await wait(()=>starts===before+1,'new start');
    await wait(()=>updateRequestID===status.requestID&&!updateStarting,'ack');
    flush();await opening;const reads=statusReads;complete();
    await wait(()=>!updateBusy,'completion after delayed prior failure');
    assert(statusReads>reads,'no fresh polling');
    assert(q('#update-message').textContent!==oldError&&!q('#update-message').classList.contains('update-error'),'old response rendered');
   });
   await check('Close/reopen during pending status read keeps operation tracking alive',async()=>{
    await reset();holdNext=true;const first=showUpdates();await wait(()=>held,'read held');
    await closeModal(true);const reopened=showUpdates();const before=starts;click('#check-updates');
    await wait(()=>starts===before+1,'start on reopened modal');flush();await first;await reopened;
    complete();await wait(()=>!updateBusy&&!q('#check-updates').disabled,'reopened completion');
    assert(q('#update-message').textContent!==oldError,'stale error after reopening');
   });
   await check('Same-request lower revision cannot overwrite newer progress or terminal state',async()=>{
    await reset();await showUpdates('check-only');const stale=copy(status);
    complete();await pollUpdateStatus({fresh:true});await wait(()=>!updateBusy,'terminal status');
    const before=q('#update-message').textContent;renderUpdateStatus(stale);
    assert(!updateBusy&&q('#update-message').textContent===before,'older revision accepted');
   });
   await check('Waiting resumes automatically without a second Verify click',async()=>{
    await reset();mode='waiting';const before=starts;await showUpdates('check-only');
    assert(status.phase==='waiting'&&!q('#update-message').classList.contains('update-error'),'busy treated as error');
    assert(q('#update-cancel-wait')&&!q('#update-cancel-wait').hidden,'waiting has no cancel');
    publish('checking',{canCancelWait:false,message:'Verificando agora…'});complete();
    await wait(()=>!updateBusy,'resumed check');assert(starts===before+1,'waiting resubmitted operation');
   });
   await check('Cancel waiting installation never displays successful installation',async()=>{
    await reset();mode='waiting';const before=cancelCalls;await showUpdates('check-apply');
    assert(q('#modal').dataset.family==='update-installing','installation family missing');
    click('#update-cancel-wait');await wait(()=>cancelCalls===before+1&&!updateBusy,'cancel acknowledged');
    assert(status.phase==='cancelled','wrong cancellation');
    assert(q('#modal-title').textContent==='Atualização não concluída','cancel marked successful');
    assert(!q('#update-message').classList.contains('update-ready-badge'),'cancel has green completion badge');
    assert(q('#update-finish')&&!q('#update-finish').hidden,'no return after cancel');
   });
   await check('Automatic busy is deferred without a failure counter or installation',async()=>{
    await reset();mode='waiting';const before=automaticUpdateFailures;await startUpdateRequest('check-only',true);
    assert(status.phase==='deferred'&&!updateBusy,'automatic check did not defer');
    assert(automaticUpdateFailures===before,'busy counted as failure');
    assert(status.operation==='check-only'&&latestUpdateStatus.available,'lost availability or installed automatically');
   });
   await check('Lost start acknowledgement reconciles exact request without replaying effects',async()=>{
    await reset();mode='lost-ack';const before=executions;await showUpdates('check-only');
    assert(executions===before+1&&updateBusy&&latestUpdateStatus.requestID===status.requestID,'request was replayed or lost');
    complete();await wait(()=>!updateBusy,'reconciled completion');assert(executions===before+1,'replayed after missing acknowledgement');
   });
   await check('Already-running check is attached explicitly, never reported as an installation',async()=>{
    await reset();const runningID=window.crypto.randomUUID();status={...old(),requestID:runningID,operation:'check-only',revision:3,busy:true,phase:'checking',results:[],message:'Verificação já em andamento.'};
    const before=executions;await showUpdates('check-apply');
    assert(updateRequestID===runningID&&executions===before,'created competing execution');
    complete();await wait(()=>!updateBusy,'attached completion');
    assert(q('#modal-title').textContent==='Verificação concluída','check reported installed');
    assert(!q('#update-message').classList.contains('update-ready-badge'),'unperformed install has success badge');
   });
   await check('Unconfirmed nonexistent request leaves retry available instead of infinite busy',async()=>{
    await reset();mode='not-found';await showUpdates('check-only');
    await wait(()=>!updateBusy,'unknown request resolved');
    assert(latestUpdateStatus.phase==='interrupted'&&!q('#check-updates').disabled,'unconfirmed request stuck');
   });
   await check('Scope change after acknowledged progress accepts an explicit missing-request terminal response',async()=>{
    await reset();await showUpdates('check-only');
    assert(updateBusy&&latestUpdateStatus.revision>=1,'No acknowledged progress before scope change');
    requestMissing=true;await pollUpdateStatus({fresh:true});
    await wait(()=>!updateBusy,'scope change terminal state');
    assert(latestUpdateStatus.phase==='interrupted'&&!q('#check-updates').disabled,'missing request rejected as an old revision');
   });
   await check('Installation with compatibility pending is not falsely marked complete',async()=>{
    await reset();await showUpdates('check-apply');
    publish('complete',{busy:false,results:[{id:'gbrain',status:'compatibility_required'}],message:'Nova versão aguardando compatibilidade.'});
    await pollUpdateStatus({fresh:true});await wait(()=>!updateBusy,'compatibility outcome');
    assert(q('#modal-title').textContent==='Atualização não concluída','compatibility pending became success');
   });
   await check('A fresh idle read discovers another execution rather than retaining a prior request forever',async()=>{
    const otherID=window.crypto.randomUUID();status={...status,requestID:otherID,operation:'check-only',phase:'checking',busy:true,revision:1,results:[]};
    await pollUpdateStatus({fresh:true});await wait(()=>updateRequestID===otherID,'other execution discovered');
    complete();await wait(()=>!updateBusy,'other execution completed');
   });
   await check('The modal separates Oracle, the three-library catalog, and GBrain; Codex is only integration detail',async()=>{
    await reset();
    status={busy:false,operation:'check-only',phase:'complete',available:true,knownUpdate:true,applicationUpdateAvailable:false,results:[
     {id:'oracle',status:'publication_pending',version:'0.3.1',installedVersion:'0.3.14',publicationPending:true,publicationMessage:'Há alterações no código do GitHub que ainda não fazem parte de um novo instalador publicado para os usuários.'},
     {id:'skills',status:'publication_pending',publishedStatus:'current',version:'acervo-2026.09.13.1',counts:{skills:179,prompts:17,tutorials:24},publicationPending:true,publicationMessage:'Há skills, prompts ou tutoriais novos no GitHub que ainda não foram incluídos em uma release assinada do acervo.'},
     {id:'codex',status:'current',message:'Atalhos locais conferidos. O reconhecimento no Codex é verificado em Integrações.'},
     {id:'gbrain',status:'available',version:'0.50.5.0',message:'Nova versão oficial do GBrain disponível.'}
    ]};
    await showUpdates();
    const rows=[...document.querySelectorAll('[data-update-channel]')];assert(rows.length===3,'not exactly three channels');
    assert(rows.map(row=>row.dataset.updateChannel).join(',')==='oracle,skills,gbrain','wrong channel order');
    assert(q('[data-update-channel="skills"]').textContent.includes('179 skills · 17 prompts · 24 tutoriais'),'three-library counts absent');
    assert(q('[data-update-channel="skills"] details')&&!q('[data-update-channel="codex"]'),'Codex is incorrectly a release channel');
    assert(q('[data-status="publication_pending"]').dataset.tone==='pending','publication pending is not recognized');
    assert(!q('#install-oracle-update'),'offered an app replacement for a non-installable release');
    assert(q('.modal-body').scrollWidth<=q('.modal-body').clientWidth+1,'horizontal modal overflow');
    window.__updateChannelScreenshot=false;window.webkit.messageHandlers.fixture.postMessage({type:'snapshot'});
    await wait(()=>window.__updateChannelScreenshot,'channel screenshot');
   });
   await check('An app-only update offers one-click replacement without invoking catalog installation',async()=>{
    const before=starts;
    const row={id:'oracle',status:'install_available',version:'0.3.15',installedVersion:'0.3.14',message:'Nova versão do aplicativo disponível.',downloadSHA256:'sha256:'+'a'.repeat(64),downloadURL:'https://github.com/nitroxinteligence/ORACLE/releases/download/v0.3.15/Oracle-0.3.15-macos-arm64.zip'};
    status={...status,available:false,applicationUpdateAvailable:true,results:[row,{id:'skills',status:'current'},{id:'gbrain',status:'current'}]};
    await pollUpdateStatus({fresh:true});assert(q('#apply-update-metal').hidden,'app-only update enables catalog installation');
    assert(q('#install-oracle-update')&&!q('#install-oracle-update').disabled,'one-click app update missing');
    click('#install-oracle-update');await wait(()=>appInstalls===1,'app update action');
    assert(starts===before,'app replacement incorrectly invoked catalog updateStart');
    assert(q('#update-message').textContent.includes('Oracle'),'app update mislabeled as compatibility');
   });
   await check('An untrusted installer URL cannot create an app update action',async()=>{
    status.results[0].downloadURL='https://github.com/foreign/ORACLE/releases/download/v0.3.15/Oracle-0.3.15-macos-arm64.zip';
    await pollUpdateStatus({fresh:true});assert(!q('#install-oracle-update'),'foreign installer exposed');
   });
   await check('Source-only changes remain pending publication rather than being offered for installation',async()=>{
    status={...status,available:false,applicationUpdateAvailable:false,knownUpdate:true,results:[{id:'oracle',status:'current'},
     {id:'skills',status:'publication_pending',publishedStatus:'current',publicationMessage:'Novos arquivos aguardam publicação.',publicationPending:true},{id:'gbrain',status:'current'}]};
    await pollUpdateStatus({fresh:true});assert(q('#apply-update-metal').hidden&&!q('#install-oracle-update'),'unpublished code offered to install');
    assert(q('#update-message').textContent.includes('publicação'),'source-only changes mislabeled as compatibility');
   });
   await check('A new published catalog is actionable even if the engine is already current',async()=>{
    status={...status,available:true,results:[{id:'oracle',status:'current'},{id:'skills',status:'available',version:'fixture-new',counts:{skills:204,prompts:17,tutorials:30},message:'Novo acervo publicado disponível.'},{id:'gbrain',status:'current'}]};
    await pollUpdateStatus({fresh:true});assert(!q('#apply-update-metal').hidden,'catalog release omitted');
    assert(q('[data-update-channel="skills"]').classList.contains('update-success'),'new catalog is not marked available');
   });
   await check('App locking invalidates delayed replies and clears update tracking',async()=>{
    holdNext=true;const reading=pollUpdateStatus({fresh:true});await wait(()=>held,'final reply held');
    window.oracleLock();flush();await reading;await sleep(50);
    assert(latestUpdateStatus===null&&!updateBusy&&updateRequestID===null,'private stale status returned after app lock');
   });
  }catch(error){if(!cases.length)cases.push({name:'Startup',ok:false,error:error.message});}
  clearTimeout(updatePolling);
  if(f.jsErrors.length||f.failures.length)cases.push({name:'No unexpected JavaScript/bridge errors',ok:false,error:JSON.stringify([...f.jsErrors,...f.failures])});
  window.webkit.messageHandlers.fixture.postMessage({type:'done',passed:cases.filter(c=>c.ok).length,failed:cases.filter(c=>!c.ok).length,cases,trace,executions,synthetic:true,realCore:false,realWebKit:true,realNetwork:false});
 };
})();
