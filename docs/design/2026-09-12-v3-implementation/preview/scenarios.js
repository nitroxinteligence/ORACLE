/* Exercises the actual UI renderers with fixture-only data and bridge. */
window.addEventListener('load',async()=>{
 const fixture=window.oracleVisualFixture;if(!fixture)return;
 const sleep=ms=>new Promise(r=>setTimeout(r,ms));
 for(let i=0;i<100&&!atlasController;i++)await sleep(50);
 const mode=fixture.scenario,path='WIKI/Guia de exemplo.md';
 const flag=document.createElement('span');flag.id='v3-fixture-label';flag.textContent='Preview sintético · '+mode;flag.style.cssText='position:fixed;left:30px;bottom:8px;font:10px system-ui;color:#aaa;z-index:5;pointer-events:none';document.body.append(flag);
 try{
  const openReader=()=>openNote(path);
  switch(mode){
   case'motion-toast':{
    await openReader();const button=document.createElement('button');button.textContent='Testar animação da notificação';button.className='secondary';document.querySelector('.modal-footer').append(button);
    button.onclick=()=>{const start=performance.now(),samples=[];toast('Prévia da notificação.','success');const sample=()=>{const element=document.querySelector('#toast'),style=getComputedStyle(element),rect=element.getBoundingClientRect();samples.push({ms:Math.round(performance.now()-start),phase:element.dataset.motion||'steady',hidden:element.hidden,opacity:Number(style.opacity),y:rect.y,x:rect.x,w:rect.width});if(performance.now()-start<5500)requestAnimationFrame(sample);else{const output=document.createElement('output');output.id='toast-motion-result';output.textContent=JSON.stringify(samples);output.hidden=true;document.body.append(output)}};sample();};break;
   }
   case'motion-reduced':fixture.snapshot.config.visualPreferences={reduceMotion:true};applyVisualPreferences();break;
   case'motion-close':case'motion-close-error':{
    if(mode==='motion-close-error'){await openReader();editNote();editorSession.text+='\nRascunho sintético.';document.querySelector('#editor').value=editorSession.text;modalDirty=true;}
    const button=document.createElement('button');button.textContent='Simular encerramento';button.style.cssText='position:fixed;bottom:32px;left:24px;z-index:99999';
    button.onclick=async()=>{const start=performance.now();try{const closed=await window.oraclePrepareToClose();flag.textContent='Encerramento: '+closed+' · '+Math.round(performance.now()-start)+' ms · opacidade '+getComputedStyle(document.querySelector('#app')).opacity;}catch(error){flag.textContent=error.message+' · opacidade '+getComputedStyle(document.querySelector('#app')).opacity;}flag.dataset.calls=fixture.calls.join(',');};
    (mode==='motion-close-error'?document.querySelector('#modal-content'):document.body).append(button);break;
   }
   case'department':atlasController.setDepartment('department/code');break;
   case'specialist':case'dense':atlasController.focus('code');break;
   case'group':atlasController.focus('code');await sleep(400);atlasController.focusGroup([...atlasController.groups.keys()][0]);break;
   case'skill':atlasController.revealSkill(fixture.snapshot.entries.find(e=>!e.directory&&e.path.startsWith('SISTEMA/skills/code/')).path,true);break;
   case'tutorials-graph':atlasController.navigateKnowledge('tutorials','SISTEMA/Tutoriais');break;
   case'tutorials-folder':atlasController.navigateKnowledge('tutorials','SISTEMA/Tutoriais/design');break;
   case'prompts-graph':atlasController.navigateKnowledge('prompts','SISTEMA/prompts');break;
   case'prompts-folder':atlasController.navigateKnowledge('prompts','SISTEMA/prompts/design');break;
   case'knowledge':atlasController.navigateKnowledge('personal','AREAS/pessoal');break;
   case'knowledge-empty':atlasController.navigateKnowledge('personal','AREAS/pessoal/vazia');break;
   case'prompts':case'prompts-empty':case'prompts-partial':case'prompts-ambiguous':await promptLibrary();break;
   case'prompts-error':await promptLibrary();await libraryGallery.openDocument('SISTEMA/prompts/design/Guia 1.md');break;
   case'tutorials':case'tutorials-empty':await tutorialsLibrary();break;
   case'reader':case'reader-long':case'draft':await openReader();break;
   case'editor':case'diff':case'conflict':case'exit':case'save-error':
    await openReader();editNote();
    if(mode!=='editor'){editorSession.text+='\n\nAlteração sintética ainda não salva.';document.querySelector('#editor').value=editorSession.text;modalDirty=true;}
    if(mode==='diff')reviewEdit(editorSession);
    if(mode==='conflict')showEditorConflict({...fixture.doc(path),hash:'synthetic-new',text:'# Versão externa sintética\n\nO documento mudou enquanto era editado.'});
    if(mode==='exit')requestEditorExit();
    if(mode==='save-error')await safe(saveEditor)();
    break;
   case'search':openSearch();break;
   case'hub-summary':case'hub-summary-error':case'hub-summary-dense':await openKnowledgeHub();break;
   case'memory':case'memory-empty':case'memory-error':case'memory-partial':await memory();break;
   case'memory-page':await memory();await memoryPage('guia','oracle-vault');break;
   case'conversations':case'conversations-empty':await conversations();break;
   case'conversation':await conversations();document.querySelector('[data-conversation]')?.click();break;
   case'projects':case'projects-empty':await instructions();break;
   case'instruction':await instructions();document.querySelector('[data-instruction]')?.click();break;
   case'plugins':case'plugin':flag.textContent='Visualização de plugins removida da interface';break;

   case'settings':settings();break;
   case'owner':await catalogSettings();break;
   case'schedule':await maintenanceSettings();document.querySelector('#maintenance-request').click();break;
   case'departments':departmentSettings();break;
   case'context':await reviewGBrain();break;
   case'maintenance':await maintenanceSettings();break;
   case'backup':case'backup-confirm':await backupSettings();if(mode==='backup-confirm')document.querySelector('#backup-restore').click();break;
   case'bridge':await reviewBridge();break;
   case'updates':case'updates-partial':await showUpdates(false);break;
   case'diagnostics':graphicsDiagnostics();break;
   case'activity':activity();break;
   case'revoke':settings();document.querySelector('#revoke').click();break;
   case'lock':window.oracleLock();break;
   default:
    if(['license','invitation','vault','workspace','identity','objectives','preferences','review','readback','progress','progress-card','paused','failed','permission','questions','connection','model'].includes(mode)){
     await OracleOnboarding.mount({call,refresh:()=>Promise.resolve(),getState:()=>fixture.snapshot,toast,openSettings:settings,canOpen:()=>true});
     OracleOnboarding.open({connection:['connection','model'].includes(mode)});
     if(mode==='progress-card')document.querySelector('#ob-progress-close').click();
     if(mode==='model')document.querySelector('#ob-model')?.closest('details').setAttribute('open','');
     if(mode==='invitation'){document.querySelector('#ob-simple-request').open=true;document.querySelector('#ob-invitation-details').open=true;}
    }
  }
  await sleep(900);
  document.documentElement.dataset.fixtureReady=mode;
 }catch(error){document.documentElement.dataset.fixtureError=error.message;flag.textContent+=' · erro: '+error.message;}
});
