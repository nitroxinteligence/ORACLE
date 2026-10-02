// Real resource HTML and bridge in a WKWebView iframe. Synthetic host only.
(() => {
 'use strict';
 if(window.parent!==window){
  window.addEventListener('error',event=>parent.postMessage({fixture:'error',message:event.message},'*'));
  window.addEventListener('unhandledrejection',event=>parent.postMessage({fixture:'error',message:String(event.reason?.message||event.reason)},'*'));
  return;
 }
 const resource=__RESOURCE_JSON__;
 const sleep=ms=>new Promise(resolve=>setTimeout(resolve,ms));
 const cases=[],messages=[],errors=[],unexpectedCalls=[],drafts=new Map(),teardownReplies=new Map();let exportChunks=[],exportSaved=false,exportFinalPending=false,exportSaveResolve;let exported=null,started=false,initialized=false,hostLocked=false,failDraft=false,lockedWrites=0;
 const report=value=>webkit.messageHandlers.fixture.postMessage(value);
 const check=(name,pass,detail={})=>{const item={name,pass:!!pass,...detail};cases.push(item);report({type:'case',...item});};
 const wait=async(fn,label,ms=7000)=>{const until=performance.now()+ms;while(performance.now()<until){if(fn())return;await sleep(30);}throw Error('Timed out: '+label);};
 const files=['SISTEMA/skills/code/fixture-skill/SKILL.md','SISTEMA/skills/marketing/fixture-campaign/SKILL.md','SISTEMA/Tutoriais/design/Interface sintética.md','SISTEMA/prompts/design/Prompt sintético.md','WIKI/Nota sintética.md'];
 const dirs=new Set();for(const path of files){const parts=path.split('/');for(let i=1;i<parts.length;i++)dirs.add(parts.slice(0,i).join('/'));}
 const entries=[...dirs].map(path=>({path,name:path.split('/').at(-1),directory:true})).concat(files.map(path=>({path,name:path.split('/').at(-1),directory:false,size:128,source:'Synthetic fixture'})));
 const onboarding={schemaVersion:2,licensed:true,legacyAccess:true,status:'completed',resumeExisting:true,profileMode:'memory-only',hasVault:true,hasExistingBrain:true,runID:'synthetic-completed',completed:2,total:2,codexConnected:false,confirmed:[],models:[],knowledgeWelcome:{runID:'synthetic-completed',vault:'/synthetic/vault'}};
 const memory={state:'current',generation:1,indexedGeneration:1,indexing:false,lastScanAt:1};
 const snapshot={config:{vault:'/synthetic/vault',fixture:true,layout:{nodes:{},leaves:{}},libraryRoots:{skills:'SISTEMA/skills',tutorial:'SISTEMA/Tutoriais',prompt:'SISTEMA/prompts'},visualPreferences:{reduceMotion:true}},entries,collections:[{id:'code',name:'Code',icon:'code'},{id:'marketing',name:'Marketing',icon:'chart'}],events:[],projects:[],onboarding,memorySync:memory,scan:{pending:false,complete:true,at:1,signature:'synthetic'},operations:{setup:false,gbrain:false},setup:{plan_id:'synthetic-completed'},setupBaselinePaths:files,codexPlugins:{status:'unavailable',plugins:[]},gbrainSync:{status:'verified'},build:{version:'synthetic',channel:'fixture',commit:'fixture',buildID:'fixture'}};
 window.__fixtureExportDone=(path)=>{exportSaveResolve?.(path);exportSaveResolve=null;};
 const value=(method,params)=>{
  if(method==='exportSnapshotBegin'){if(hostLocked)throw Error('Oracle bloqueado');exportChunks=[];return {exportID:'synthetic-export'};}
  if(method==='exportSnapshotChunk'){if(hostLocked)throw Error('Oracle bloqueado');if(params.exportID!=='synthetic-export'||params.index!==exportChunks.length)throw Error('Invalid chunk');exportChunks.push(params.base64);return {accepted:true};}
  if(method==='exportSnapshotDiscard'){exportChunks=[];return {discarded:true};}
  if(method==='exportSnapshot'){if(hostLocked)throw Error('Oracle bloqueado');exportFinalPending=true;return new Promise(resolve=>{exportSaveResolve=path=>{exportSaved=!!path;exportFinalPending=false;resolve(path);};const binary=exportChunks.map(part=>atob(part)).join('');report({type:'export',base64:btoa(binary)});});}
  if(method==='boot')return {locked:hostLocked,accessibility:{reduceMotion:true,reduceTransparency:false}};
  if(method==='snapshot')return snapshot;
  if(method==='onboardingStatus')return onboarding;
  if(method==='memoryStatus')return memory;
  if(method==='events')return [];
  if(method==='updateStatus')return {busy:false,available:false,knownUpdate:false,phase:'complete',checkedAt:new Date().toISOString(),results:[]};
  if(method==='unlock'){hostLocked=false;return true;}
  if(method==='saveDraft'){if(hostLocked){lockedWrites++;throw Error('Oracle bloqueado');}if(failDraft==='unconfirmed')return {saved:false};if(failDraft)throw Error('Synthetic draft storage refused');drafts.set(params.path,{path:params.path,vault:'/synthetic/vault',originalHash:params.hash,text:params.text});return {saved:true};}
  if(method==='read')return {draft:drafts.get(params.path),path:'/synthetic/vault/'+params.path,text:'# '+(params.path.split('/').at(-1)||'Nota')+'\n\nDocumento sintético do harness.\n\n## Exemplo\n\nConteúdo local de teste.',hash:'a'.repeat(64),editable:true};
  if(method==='maintenanceStatus')return {enabled:false,scheduleState:'disabled',remoteProcessing:false};
  if(method==='backupStatus')return {enabled:false,available:false};
  if(['interfaceReady','onboardingKnowledgeWelcomeSeen'].includes(method))return true;
  unexpectedCalls.push(method);throw Error('Unsupported synthetic method: '+method);
 };
 const snapshots=new Map();
 window.__fixtureSnapshotDone=(names,saved)=>{snapshots.get(names[0])?.(saved);snapshots.delete(names[0]);};
 const capture=name=>new Promise(resolve=>{snapshots.set(name,resolve);report({type:'snapshot',name});});
 window.addEventListener('message',async event=>{
  const frame=document.querySelector('#oracle');if(event.source!==frame?.contentWindow)return;
  const message=event.data;
  if(message?.fixture==='error'){errors.push(message.message);return;}
  if(message?.fixture==='export'){exported=message.metrics;report({type:'export',base64:message.base64});return;}
  if(!message||message.jsonrpc!=='2.0')return;messages.push(message);
  if(!message.method&&String(message.id).startsWith('draft-')){teardownReplies.set(message.id,message);return;}
  const send=result=>event.source.postMessage({jsonrpc:'2.0',id:message.id,result},'*');
  if(message.method==='ui/initialize'){send({protocolVersion:'2026-01-26',hostCapabilities:{serverTools:{}},hostInfo:{name:'Synthetic isolated WKWebView host',version:'1'},hostContext:{displayMode:'fullscreen',availableDisplayModes:['inline','fullscreen'],containerDimensions:{width:1280,height:820}}});return;}
  if(message.method==='ui/notifications/initialized'){initialized=true;return;}
  if(message.method==='tools/call'){
   try{if(!initialized)throw Error('Dispatch before initialized');if(message.params?.name!=='oracle_dispatch')throw Error('Unexpected tool');const {method,params={}}=message.params.arguments;send({structuredContent:{value:await value(method,params)},content:[]});}catch(error){send({isError:true,content:[{type:'text',text:error.message}]});}return;
  }
  if(message.method==='ui/request-display-mode'){send({mode:message.params.mode});return;}
 });
 window.__fixtureRun=async()=>{
  if(started)return;started=true;
  try{
   const frame=document.querySelector('#oracle');frame.srcdoc=resource;
   await wait(()=>initialized,'MCP Apps initialization');
   const child=frame.contentWindow,doc=frame.contentDocument,q=selector=>doc.querySelector(selector),visible=selector=>{const el=q(selector);return !!el&&el.getClientRects().length>0&&child.getComputedStyle(el).visibility!=='hidden';};
   await wait(()=>child.oracleStartupRendered&&q('#atlas svg')&&q('#app')?.inert===false,'complete SVG Graph');await sleep(1200);
   // Observe the original iframe canvas after creation: WK srcdoc does not
   // consistently receive document-start canvas instrumentation. No pixels,
   // Blob implementation or drawing operations are replaced.
   const originalToBlob=child.HTMLCanvasElement.prototype.toBlob;
   child.HTMLCanvasElement.prototype.toBlob=function(callback,type,...args){
    const canvas=this;
    return originalToBlob.call(this,blob=>{
     if(blob&&type==='image/png'){
      let metrics;
      try{const pixels=canvas.getContext('2d').getImageData(0,0,canvas.width,canvas.height).data;let nonempty=0;const colors=new Set();for(let i=0;i<pixels.length;i+=16){if(pixels[i+3])nonempty++;colors.add([pixels[i],pixels[i+1],pixels[i+2]].join(','));}const bounds=q('.metallic-symbol').getBoundingClientRect(),scale=canvas.width/child.innerWidth,brand=canvas.getContext('2d').getImageData(Math.round(bounds.x*scale),Math.round(bounds.y*scale),Math.round(bounds.width*scale),Math.round(bounds.height*scale)).data;let brandPixels=0;for(let n=0;n<brand.length;n+=4)if(Math.max(brand[n],brand[n+1],brand[n+2])>80)brandPixels++;metrics={width:canvas.width,height:canvas.height,nonempty,sampleColors:colors.size,brandPixels,mime:blob.type,bytes:blob.size};}catch(error){metrics={error:error.message};}
      exported=metrics;
     }
     callback(blob);
    },type,...args);
   };

   check('real iframe uses plugin transport without native handler',child.parent===window&&child.OraclePluginBridge.active()&&!child.webkit?.messageHandlers.oracle);
   check('initialization precedes boot dispatch',messages.findIndex(m=>m.method==='ui/notifications/initialized')<messages.findIndex(m=>m.method==='tools/call'));
   check('Graph has rendered active SVG and unchanged tabs',visible('#atlas svg')&&['Graph','Tutoriais','Prompts'].every(text=>[...doc.querySelectorAll('.workspace-tabs button')].some(b=>b.textContent===text)),{svgElements:q('#atlas').querySelectorAll('svg *').length});
   const planet=q('.metallic-symbol');await wait(()=>planet.complete,'planet image');check('original planet image dimensions preserved',planet.naturalWidth===1254&&planet.naturalHeight===1254,{naturalWidth:planet.naturalWidth,naturalHeight:planet.naturalHeight});
   const brandImages=[...doc.querySelectorAll('.brand-lockup img,.lock-card img')];check('all original brand images load',brandImages.every(img=>img.complete&&img.naturalWidth>0),{images:brandImages.map(img=>({width:img.naturalWidth,height:img.naturalHeight}))});
   check('no new chat/context UI controls',![...doc.querySelectorAll('button')].some(button=>button.textContent.includes('Usar no chat')));
   check('Graph screenshot saved',await capture('graph'));
   for(const mode of ['tutorials','prompts']){
    q('[data-workspace="'+mode+'"]').click();await wait(()=>visible('#library-page')&&q('.gallery-card'),'gallery '+mode);await sleep(900);
    const cards=[...doc.querySelectorAll('.gallery-card')],images=[...doc.querySelectorAll('.gallery-cover img')];
    check(mode+' renders unchanged gallery with document cards',cards.length>0&&visible('.gallery-heading'),{cards:cards.length});
    check(mode+' original covers load without missing assets',images.length===cards.length&&images.every(img=>img.complete&&img.naturalWidth>0),{cards:cards.length,images:images.map(img=>({width:img.naturalWidth,height:img.naturalHeight,srcType:img.src.slice(0,30)}))});
    check(mode+' screenshot saved',await capture(mode));
   }
   q('[data-workspace="map"]').click();await sleep(600);
   await child.openNote('WIKI/Nota sintética.md');await wait(()=>visible('.markdown-reader'),'synthetic note');
   check('original note reader rendered through oracle_dispatch',q('.markdown-reader').textContent.includes('Documento sintético'));check('reader screenshot saved',await capture('reader'));
   child.closeModal(true); child.settings();await wait(()=>q('#export-view'),'existing export action');
   check('settings screenshot saved',await capture('settings'));
   const exportAction=q('#export-view');check('export keeps original action and label',exportAction.textContent.includes('Exportar imagem'));
   let exportFailure=null;const originalCall=child.OraclePluginBridge.call;let exportDispatched=false;child.OraclePluginBridge.call=async(...args)=>{if(args[0]==='exportSnapshot')exportDispatched=true;try{return await originalCall(...args);}catch(error){if(args[0]==='exportSnapshot')exportFailure=error.message;throw error;}};
   check('export action is enabled before activation',!exportAction.disabled&&typeof exportAction.onclick==='function',{disabled:exportAction.disabled,dialogOpen:q('#modal').open,dialogInert:q('#modal').inert,contentInert:q('#modal-content').inert});
   let exportClicked=false;exportAction.addEventListener('click',()=>{exportClicked=true;});
   exportAction.click();await sleep(250);check('original export action receives click',exportClicked,{modalOpen:q('#modal').open,toast:q('#toast')?.textContent});await wait(()=>exported||exportFailure,'actual PNG result or explicit failure',20000).catch(error=>{throw Error(error.message+'; dispatched='+exportDispatched+'; toast='+q('#toast')?.textContent);});
   check('real canvas exported PNG with nonempty varied pixels',exported?.mime==='image/png'&&exported.bytes>1000&&exported.nonempty>1000&&exported.sampleColors>5,{exported,exportFailure,exportDispatched,visibleError:q('#toast')?.textContent});

   await wait(()=>exportSaved||exportFailure,'confirmed isolated native write',20000);
   check('export confirms success only after real isolated file persistence',exportSaved&&q('#toast')?.textContent==='Imagem salva.'&&!exportFinalPending,{chunks:exportChunks.length,toast:q('#toast')?.textContent});
   check('exported PNG preserves the original header planet',exported?.brandPixels>100,{brandPixels:exported?.brandPixels});
   // Reproduce the sub-450ms draft race, with storage denied while locked.
   await child.openNote('WIKI/Nota sintética.md');q('#edit-note').click();await wait(()=>q('#editor'),'editor before external lock');
   const unsent='Rascunho digitado imediatamente antes do bloqueio';q('#editor').value=unsent;q('#editor').dispatchEvent(new child.Event('input',{bubbles:true}));
   hostLocked=true;child.oracleLock();await sleep(100);
   check('external lock hides unsent draft without writing while locked',!q('#lock-screen').hidden&&!q('#modal-content').textContent.includes(unsent)&&lockedWrites===0&&!drafts.has('WIKI/Nota sintética.md'));

   snapshot.config.vault='/synthetic/other-vault';q('#unlock').click();await wait(()=>q('#lock-screen').hidden,'unlock with different selected vault');await sleep(80);
   let wrongVaultRejected=false;try{await child.openNote('WIKI/Nota sintética.md');}catch{wrongVaultRejected=true;}
   check('retained draft cannot write or recover into a different vault',wrongVaultRejected&&!drafts.has('WIKI/Nota sintética.md')&&!q('#recover-draft'));
   child.oracleLock();snapshot.config.vault='/synthetic/vault';
   q('#unlock').click();await wait(()=>q('#lock-screen').hidden&&drafts.get('WIKI/Nota sintética.md')?.text===unsent,'bound draft flush after authorized unlock');

   await child.openNote('WIKI/Nota sintética.md');await wait(()=>q('#recover-draft'),'existing recovery action');q('#recover-draft').click();await wait(()=>q('#editor'),'recovered editor');
   check('unlock restores pending text through existing draft recovery',q('#editor').value===unsent&&lockedWrites===0);
   const latest='Última digitação antes do fechamento do recurso';q('#editor').value=latest;q('#editor').dispatchEvent(new child.Event('input',{bubbles:true}));
   failDraft=true;child.postMessage({jsonrpc:'2.0',id:'draft-refused',method:'ui/resource-teardown',params:{}},'*');
   await wait(()=>teardownReplies.has('draft-refused'),'teardown refusal');
   check('failed teardown does not acknowledge saved draft or clear editor',!!teardownReplies.get('draft-refused').error&&q('#editor')?.value===latest&&q('#lock-screen').hidden);

   failDraft='unconfirmed';child.postMessage({jsonrpc:'2.0',id:'draft-unconfirmed',method:'ui/resource-teardown',params:{}},'*');await wait(()=>teardownReplies.has('draft-unconfirmed'),'unconfirmed draft refusal');
   check('teardown refuses an unconfirmed save receipt',!!teardownReplies.get('draft-unconfirmed').error&&q('#editor')?.value===latest&&q('#lock-screen').hidden);
   failDraft=false;child.postMessage({jsonrpc:'2.0',id:'draft-saved',method:'ui/resource-teardown',params:{}},'*');

   await wait(()=>teardownReplies.has('draft-saved'),'teardown draft confirmation');
   check('successful teardown acknowledges only after latest draft saved',!!teardownReplies.get('draft-saved').result&&drafts.get('WIKI/Nota sintética.md')?.text===latest&&!q('#lock-screen').hidden&&lockedWrites===0);
   check('runtime has no JavaScript exceptions',errors.length===0,{errors});check('all invoked methods have declared synthetic responses',unexpectedCalls.length===0,{unexpectedCalls});
  }catch(error){check('fixture completes all expected interactions',false,{error:error.message,errors,unexpectedCalls});}
  report({type:'done',passed:cases.filter(c=>c.pass).length,failed:cases.filter(c=>!c.pass).length,cases,errors,unexpectedCalls,exported,host:'synthetic WKWebView MCP Apps iframe',actualCodex:false});
 };
})();
