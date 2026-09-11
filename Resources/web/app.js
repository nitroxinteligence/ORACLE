'use strict';
const $=s=>document.querySelector(s), $$=s=>[...document.querySelectorAll(s)];
const paths={lock:'M6 10h12v11H6z M8 10V6a4 4 0 0 1 8 0v4 M12 14v3',folder:'M3 6h6l2 2h10v12H3z M3 6V4h6l2 2h10v2',note:'M6 3h8l4 4v14H6z M14 3v5h4 M9 12h6 M9 15h6 M9 18h5',search:'M16 16l5 5 M18 10a8 8 0 1 1-16 0 8 8 0 0 1 16 0',code:'M8 6l-6 6 6 6 M16 6l6 6-6 6 M14 3l-4 18',megaphone:'M3 9v6h5l12 5V4L8 9z M8 15l2 6h3l-2-5',shield:'M12 2l9 4v6c0 5-6 9-9 10-3-1-9-5-9-10V6z M8 12l3 3 5-6',chart:'M3 21h19 M5 18v-5h3v5 M11 18V9h3v9 M17 18V4h3v14 M4 9l7-5 4 1 6-4',person:'M17 7a5 5 0 1 1-10 0 5 5 0 0 1 10 0 M3 22v-3a9 9 0 0 1 18 0v3z',chat:'M3 3h18v14H9l-6 4z M7 8h10 M7 12h7',book:'M5 3h15v19H5a2 2 0 0 1 0-4h15 M5 3a2 2 0 0 0-2 2v15 M8 7h8 M8 11h6',tool:'M14 3a6 6 0 0 0-7 8l-5 7 4 4 7-7a6 6 0 0 0 8-7l-5 4-4-4z',mail:'M2 5h20v15H2z M2 5l10 8L22 5',brain:'M8 3a4 4 0 0 0-4 6 5 5 0 0 0 0 8 4 4 0 0 0 8 3V5a3 3 0 0 0-4-2 M16 3a4 4 0 0 1 4 6 5 5 0 0 1 0 8 4 4 0 0 1-8 3 M5 10l3 2 M19 10l-3 2',sliders:'M2 5h7 M15 5h7 M2 12h12 M20 12h2 M2 19h3 M11 19h11 M9 2v6h6V2z M14 9v6h6V9z M5 16v6h6v-6z'};
Object.assign(paths,{orbit:'M4 12a8 8 0 1 0 16 0a8 8 0 1 0-16 0 M2 17c2 3 21-6 20-10s-21 5-20 10',sidebar:'M3 4h18v16H3z M9 4v16',history:'M3 11a9 9 0 1 1 2 7 M3 4v7h7 M12 7v5l3 2',observatory:'M3 12s3-7 9-7 9 7 9 7-3 7-9 7-9-7-9-7 M15 12a3 3 0 1 1-6 0 3 3 0 0 1 6 0',minimize:'M5 12h14',play:'M8 5l12 7-12 7Z',pause:'M8 5v14 M16 5v14',refresh:'M20 7a9 9 0 1 0 1 8 M20 2v6h-6',live:'M12 8v8 M8 12h8 M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0',fit:'M8 3H3v5 M16 3h5v5 M3 16v5h5 M21 16v5h-5 M8 12h8 M12 8v8',back:'M9 5l-6 6 6 6 M3 11h12a6 6 0 0 1 6 6',close:'M6 6l12 12 M18 6L6 18',chevron:'M9 5l7 7-7 7',check:'M5 12l4 4L19 6'});
paths.prompts='M5 4h14a2 2 0 0 1 2 2v12a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2z M8 8h8 M8 12h6 M8 16h4 M17 2v4 M15 4h4';
function icon(name,cls=''){return `<svg class="${cls}" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="${paths[name]||paths.note}"/></svg>`}
function esc(v){return String(v??'').replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]))}
$$('[data-icon]').forEach(e=>e.outerHTML=icon(e.dataset.icon));$('#settings').innerHTML=icon('sliders');$('#lock').innerHTML=icon('lock');
const pending=new Map();let requestID=0;
function call(method,params={}){return new Promise((resolve,reject)=>{
 if(!window.webkit?.messageHandlers.oracle){reject(Error('O aplicativo macOS é necessário. Este arquivo não é um app web.'));return}
 if(pending.size>=128){reject(Error('Há operações demais em andamento. Aguarde as respostas atuais.'));return}
 const id=String(++requestID),timeout=setTimeout(()=>{pending.delete(id);reject(Error('A operação não respondeu a tempo. Confira o estado antes de repetir.'));},['gbrainRead','onboardingConnect','codexPlugins','codexPluginsRefresh'].includes(method)?120000:90000);
 pending.set(id,{resolve,reject,timeout});
 try{window.webkit.messageHandlers.oracle.postMessage({id,method,params})}catch(error){clearTimeout(timeout);pending.delete(id);reject(error)}
})}
window.oracleReply=(id,res)=>{const p=pending.get(id);if(!p)return;pending.delete(id);clearTimeout(p.timeout);res.error?p.reject(Error(res.error)):p.resolve(res.value)};
let state={entries:[],collections:[],events:[],config:{}},selected=null,view='map',query='',zoom=OracleAtlas.DEFAULT_ZOOM,replay=false,cursor=0,timer=null,speed=1,readDocument=null;
const colors=['#dba17c','#91b5ed','#7bc8b4','#d9c276','#b29bd7','#92c399','#d49cae'];
const positions=[[292,132],[564,130],[678,313],[164,310],[248,491],[600,485],[424,574]];
let modalOrigin=null, modalRevision=0, modalDirty=false, settingsTrail=false;
let navigationEpoch=0,noteReadSequence=0,refreshSequence=0,refreshTask=null;
let initialScanTimer=null,initialScanRetries=0,memoryPollTask=null,memoryEpoch=0,lastMemorySignature='';
const navigationBlocked=()=>!$('#lock-screen').hidden||!!document.querySelector('.ob-dialog[open]')||modalDirty;
let modalSequence=0,modalHistory=[],modalPage=null;
const promptRoot='SISTEMA/prompts';
let promptFolderPath=promptRoot,promptSelectedPath='',promptQuery='',promptDocument=null;
let promptExpanded=new Set([promptRoot]);
const tutorialRoot='SISTEMA/Tutoriais';
const tutorialDepartments=[
 {slug:'design',label:'Design'},
 {slug:'backend',label:'Back-end'},
 {slug:'marketing',label:'Marketing'},
 {slug:'go-to-market',label:'Go-to-market'},
 {slug:'engenharia-de-ai',label:'Engenharia de IA'},
 {slug:'criacao-de-imagens',label:'Criação de imagens'},
 {slug:'criacao-de-videos',label:'Criação de vídeos'},
 {slug:'3d',label:'3D'}
];
let tutorialFolderPath=tutorialRoot,tutorialSelectedPath='',tutorialQuery='',tutorialDocument=null;
let tutorialExpanded=new Set([tutorialRoot]);
function toast(text){
 if(!$('#lock-screen').hidden)return;
 if($('#modal').open){let notice=$('.modal-notice');if(!notice){notice=document.createElement('div');notice.className='modal-notice';notice.setAttribute('role','alert');$('.modal-body').prepend(notice)}notice.textContent=text;return}
 $('#toast').textContent=text;$('#toast').hidden=false;clearTimeout(toast.timer);toast.timer=setTimeout(()=>$('#toast').hidden=true,6000);
}
function safe(fn){return async(...a)=>{const button=a[0]?.currentTarget instanceof HTMLButtonElement?a[0].currentTarget:null;if(button)button.disabled=true;try{return await fn(...a)}catch(e){toast(e.message)}finally{if(button)button.disabled=false}}}
function modalBreadcrumb(){
 const nav=document.createElement('nav');nav.className='modal-breadcrumb';nav.setAttribute('aria-label','Caminho desta janela');
 const back=document.createElement('button');back.id='modal-back';back.type='button';back.setAttribute('aria-label','Voltar');back.innerHTML=icon('back')+'<span>Voltar</span>';back.onclick=()=>modalBack();nav.append(back);
 const list=document.createElement('ol');
 const item=(label,index,current=false)=>{const li=document.createElement('li');const el=document.createElement(current?'span':'button');el.textContent=label;el.title=label;if(current)el.setAttribute('aria-current','page');else{el.type='button';el.onclick=()=>modalBack(index)}li.append(el);list.append(li)};
 item('Universo',-1);modalHistory.forEach((page,index)=>item(page.title,index));item(modalPage.title,0,true);nav.append(list);return nav;
}
function modalBack(index=modalHistory.length-1){
 const prior=modalHistory[index];
 const restore=()=>{
  if(!prior){closeModal(true);return}
  modalHistory=modalHistory.slice(0,index);modalPage=prior;modalRevision=prior.revision;
  navigationEpoch++;
  readDocument=prior.document;editorSession=prior.editor;settingsTrail=prior.settings;
  modalDirty=prior.dirty;hideTooltip();
  $('#modal-content').replaceChildren(...prior.nodes);$('#modal').dataset.family=prior.family;
  $('.modal-breadcrumb').replaceWith(modalBreadcrumb());
  const body=$('.modal-body');if(body)body.scrollTop=prior.scroll;
  const focus=prior.focus?.isConnected?prior.focus:$('#modal-title');focus?.focus({preventScroll:true});
 };
 // Review -> editor preserves the same draft; leaving that draft uses the existing exit guard.
 if(modalDirty&&!(prior?.family==='editor'&&prior.editor===editorSession)){requestEditorExit(false,restore);return}
 restore();
}
function modal(html,options={}){
 if(!$('#lock-screen').hidden||document.querySelector('.ob-dialog[open]'))return false;
 if(modalDirty&&options.family!=='editor'){requestEditorExit(false,()=>modal(html,options));return false}
 const dialog=$('#modal'), content=$('#modal-content');
 const template=document.createElement('template');template.innerHTML=html;
 const heading=template.content.querySelector('h1')||document.createElement('h1');heading.id='modal-title';heading.tabIndex=-1;
 const key=options.key||heading.textContent;
 if(!dialog.open){modalOrigin=document.activeElement;modalHistory=[];modalPage=null}
 if(modalPage){
  const ancestor=modalHistory.findIndex(page=>page.key===key);
  if(ancestor>=0)modalHistory=modalHistory.slice(0,ancestor);
  else if(modalPage.key!==key){
   modalHistory.push({...modalPage,nodes:[...content.childNodes],dirty:modalDirty,scroll:$('.modal-body')?.scrollTop||0,focus:document.activeElement});
   if(modalHistory.length>24)modalHistory.shift();
  }
 }
 modalRevision=++modalSequence;navigationEpoch++;modalDirty=false;hideTooltip();atlasController?.setPaused(true);
 template.content.querySelectorAll('.step-label').forEach(e=>e.remove());
 const footers=[...template.content.children].filter(e=>e.classList.contains('actions'));const footer=footers.at(-1)||document.createElement('div');footer.className='modal-footer';
 footer.querySelectorAll('[data-close]').forEach(e=>e.remove());
 const family=options.family||(template.content.querySelector('.editor')?'editor':template.content.querySelector('.markdown-reader')?'reader':'standard');
 modalPage={key,title:heading.textContent,revision:modalRevision,family,document:readDocument,editor:editorSession,settings:settingsTrail};
 const head=document.createElement('div');head.className='modal-header';const titles=document.createElement('div');titles.append(modalBreadcrumb(),heading);head.append(titles);
 const close=document.createElement('button');close.className='icon-button modal-close';close.dataset.close='';close.setAttribute('aria-label','Fechar janela');close.dataset.tooltip='Fechar · Esc';close.innerHTML=icon('close');head.append(close);
 footer.remove();const body=document.createElement('div');body.className='modal-body';body.append(template.content);
 if(!footer.children.length){const done=document.createElement('button');done.className='secondary';done.dataset.close='';done.textContent='Concluído';footer.append(done)}
 content.replaceChildren(head,body,footer);dialog.dataset.family=family;
 dialog.append($('#tooltip'));if(!dialog.open)dialog.showModal();
 const focus=options.focus?content.querySelector(options.focus):body.querySelector('input:not([type=checkbox]),textarea,select');(focus||heading).focus({preventScroll:true});
 return true;
}
function closeModal(force=false){
 if(modalDirty&&!force){requestEditorExit();return}
 navigationEpoch++;$('#modal').close();
}
function actions(extra=''){return `<div class="actions"><button class="secondary" data-close>Concluído</button>${extra}</div>`}
let backdropDown=false;$('#modal').addEventListener('pointerdown',e=>{backdropDown=e.target===$('#modal')});
$('#modal').addEventListener('click',e=>{if(e.target.closest('[data-close]')||(e.target===$('#modal')&&backdropDown))closeModal();backdropDown=false});
$('#modal').addEventListener('keydown',e=>{if(e.key==='Escape'){e.preventDefault();e.stopPropagation();closeModal()}});
$('#modal').addEventListener('cancel',e=>{e.preventDefault();closeModal()});
$('#modal').addEventListener('close',()=>{document.body.append($('#tooltip'));modalRevision=++modalSequence;modalDirty=false;settingsTrail=false;modalHistory=[];modalPage=null;hideTooltip();const origin=modalOrigin;modalOrigin=null;if(origin?.isConnected&&!$('#app').inert)origin.focus({preventScroll:true});atlasController?.setPaused(document.hidden||window.oracleWindowVisible===false||view!=='map'||visualPaused)});
$('#modal').addEventListener('close',()=>{$('#prompts')?.setAttribute('aria-expanded','false');$('#tutorials')?.setAttribute('aria-expanded','false')});
function skills(id){return visibleEntries().filter(e=>!e.directory&&e.path.startsWith(`SISTEMA/skills/${id}/`)&&e.name==='SKILL.md')}
function departmentCatalog(){return OracleDepartments.createCatalog(state.collections,visibleEntries(),state.departmentManifest||window.OracleDepartmentManifest,state.config.departmentAssignments||{})}
function title(e){return e.name==='SKILL.md'?e.path.split('/').slice(-2,-1)[0]:e.name.replace(/\.md$/,'')}
function entryLocation(e){const collection=state.collections.find(c=>e.path.startsWith(`SISTEMA/skills/${c.id}/`));return collection?`${collection.name} · ${e.name==='SKILL.md'?'Skill':'Documento'}`:e.path.split('/').slice(0,-1).slice(-2).join(' / ')||'Pasta principal'}
async function refresh(){
 if(refreshTask)return refreshTask;
 const sequence=++refreshSequence;
 const task=(async()=>{const next=await call('snapshot');if(sequence!==refreshSequence||!$('#lock-screen').hidden)return;
  const librariesChanged=state.scan?.signature!==next.scan?.signature||state.scan?.pending!==next.scan?.pending||state.scan?.complete!==next.scan?.complete||state.scanError!==next.scanError||JSON.stringify(state.config.libraryRoots)!==JSON.stringify(next.config.libraryRoots);
  const scanErrorChanged=state.scanError!==next.scanError;
  state=next;applyVisualPreferences(false);render();
  if(librariesChanged){promptBrowser.render();tutorialBrowser.render();}
  if(!updateBusy)call('updateStatus').then(status=>{if(sequence!==refreshSequence||!$('#lock-screen').hidden)return;reflectUpdateStatus(status);maybeAutomaticUpdateCheck(status)}).catch(()=>{});if(state.scanError&&scanErrorChanged)toast(state.scanError);
  clearTimeout(initialScanTimer);if(state.scan?.pending&&initialScanRetries++<20)initialScanTimer=setTimeout(()=>safe(refresh)(),750);else if(!state.scan?.pending)initialScanRetries=0;
 })();
 refreshTask=task;try{return await task}finally{if(refreshTask===task)refreshTask=null}
}
async function refreshVault(){if(state.config.vault&&state.onboarding?.licensed)await call('memoryRefresh');return refresh();}
function mountOnboarding(){return window.ORACLE_PREVIEW?Promise.resolve():window.OracleOnboarding?.mount({call,refresh,getState:()=>state,toast,openSettings:settings,canOpen:()=>$('#lock-screen').hidden&&!$('#modal').open&&!modalDirty})}
function render(){
 renderTree();renderAtlas();renderResults();renderProgress();renderInspector();renderPlugins();
 renderMemoryStatus();renderMemoryFreshness();
 OracleStatusBadge.apply($('#codex-status'),state.codexPlugins?.status==='available'?'connected':state.events.some(e=>e.source==='codex-hook')?'recent_activity':'unverified',state.codexPlugins?.status==='available'?'Conectado':state.events.some(e=>e.source==='codex-hook')?'Atividade recente':'Conexão não verificada');
 renderPlayback();
}
function renderMemoryStatus(){
 $('#footer-status').textContent=state.scanError?'Leitura parcial · confira as permissões':state.scan?.pending?'Lendo o vault local…':state.memorySync?.state==='stale'||state.memorySync?.indexing?'Memória aguardando atualização local':'';
 const memoryState=state.memorySync?.state;
 OracleStatusBadge.apply($('#gbrain-status'),memoryState==='current'?'connected':memoryState==='partial'?'error':memoryState==='external'?'selected':'pending',({current:'Índice atualizado',partial:'Leitura parcial',stale:'Atualização pendente',external:'Perfil externo selecionado',unavailable:'Índice não configurado'})[memoryState]||'Conexão não verificada');
}
async function pollMemoryStatus(){
 if(memoryPollTask)return memoryPollTask;
 if(!$('#lock-screen').hidden||document.hidden||window.oracleWindowVisible===false||!state.onboarding?.licensed||!state.config.vault)return;
 const epoch=memoryEpoch,vault=state.config.vault;
 const current=()=>epoch===memoryEpoch&&$('#lock-screen').hidden&&state.config.vault===vault;
 const task=(async()=>{
  try{
   const status=await call('memoryStatus');if(!current()||!status||typeof status.state!=='string')return;
   const signature=JSON.stringify([status.state,status.generation,status.indexedGeneration,status.indexing,status.lastScanAt,status.error]);
   state.memorySync=status;
   if(signature!==lastMemorySignature){lastMemorySignature=signature;renderMemoryStatus();renderMemoryFreshness();}
   // This asks for the already cached snapshot, not a scan/index on the UI lane.
   if(status.lastScanAt&&status.lastScanAt!==state.scan?.at)await refresh();
  }catch(error){if(current()){state.memorySync={...state.memorySync,state:'unavailable',error:'Não foi possível verificar a memória agora.'};lastMemorySignature='';renderMemoryStatus();renderMemoryFreshness();}}
 })();
 memoryPollTask=task;try{return await task}finally{if(memoryPollTask===task)memoryPollTask=null}
}
function renderTree(){
 const opened=new Set($$('#tree details[open]>summary').map(e=>e.dataset.folder||e.dataset.collection||e.dataset.department));
 const catalog=departmentCatalog();
 const areas=OracleKnowledge.areas(visibleEntries());
 const childrenByParent=new Map();for(const e of visibleEntries()){const parent=e.path.split('/').slice(0,-1).join('/');if(!childrenByParent.has(parent))childrenByParent.set(parent,[]);childrenByParent.get(parent).push(e)};const folder=(path,label,open=false)=>{const children=(childrenByParent.get(path)||[]).filter(e=>(path!=='SISTEMA'||e.name!=='skills')&&(path!=='AREAS'||!areas.some(a=>a.path===e.path)));return `<details ${open||opened.has(path)?'open':''}><summary data-folder="${esc(path)}">${icon('folder')}${esc(label||path.split('/').at(-1))}</summary><div>${children.slice(0,30).map(e=>e.directory?folder(e.path,e.name):`<button class="leaf" data-path="${esc(e.path)}">${icon('note')}<span>${esc(e.name.replace('.md',''))}</span></button>`).join('')}${children.length>30?`<button data-prefix="${esc(path)}">Ver todos →</button>`:''}</div></details>`};
 const roots=new Set(visibleEntries().filter(e=>e.directory&&!e.path.includes('/')).map(e=>e.path));
 let html='<div class=tree-section-label>Seu conhecimento</div>'+areas.map(a=>a.exists?folder(a.path,a.name):`<button data-knowledge-area="${a.id}" data-knowledge-path="${esc(a.path)}">${icon('folder')}${a.name}<span class=count>0</span></button>`).join('');
 if(roots.has('INBOX'))html+=folder('INBOX','Inbox',false);
 if(roots.has('PROJETOS'))html+=folder('PROJETOS','Projetos');
 const knowledge=['AREAS','WIKI','FONTES'].filter(x=>roots.has(x)&&(x!=='AREAS'||(childrenByParent.get('AREAS')||[]).some(e=>!areas.some(a=>a.path===e.path))));if(knowledge.length)html+=`<details><summary>${icon('folder')}Conhecimento</summary><div>${knowledge.map(p=>folder(p,p==='AREAS'?'Áreas':p==='WIKI'?'Wiki':'Fontes')).join('')}</div></details>`;
 html+=`<div class="tree-section-label">Departamentos</div>`+catalog.departments.map(d=>`<details ${selectedDepartment===d.id||opened.has(d.id)?'open':''}><summary data-department="${esc(d.id)}">${icon(d.icon)}<i class="collection-dot" style="background:${d.color}"></i>${esc(d.name)}<span class="count">${d.specialistCount}</span></summary><div>${d.specialists.map(c=>`<details ${selected===c.id||opened.has(c.id)?'open':''}><summary data-collection="${esc(c.id)}">${icon('folder')}${esc(c.name)}<span class="count">${c.skillCount}</span></summary><div>${c.skills.slice(0,9).map(e=>`<button class="leaf" data-path="${esc(e.path)}">${icon('note')}${esc(title(e).replace(/-/g,' '))}</button>`).join('')}${c.skillCount>9?`<button data-prefix="${esc(c.originPath)}">Ver todas →</button>`:''}${!c.skillCount?'<small class="empty-collection">Nenhuma skill nesta fonte</small>':''}</div></details>`).join('')}${d.empty?'<small class="empty-collection">Nenhum especialista instalado</small>':''}</div></details>`).join('');
 const extraRoots=[...roots].filter(p=>!areas.some(a=>a.path===p)&&!['INBOX','PROJETOS','AREAS','WIKI','FONTES'].includes(p)&&!(p==='SISTEMA'&&!(childrenByParent.get(p)||[]).some(e=>e.name!=='skills')));if(extraRoots.length)html+='<div class="tree-section-label">Pastas</div>'+extraRoots.map(p=>folder(p)).join('');
 html+=(childrenByParent.get('')||[]).filter(e=>!e.directory).map(e=>`<button class="leaf" data-path="${esc(e.path)}">${icon('note')}${esc(title(e))}</button>`).join('');
 if(!state.config.vault)html='<p class="empty">Seu conhecimento, no seu espaço.<button class="primary" data-connect>Conectar vault</button></p>'+html;
 if($('#tree').oracleHTML===html)return;$('#tree').oracleHTML=html;$('#tree').innerHTML=html;$('#tree').querySelectorAll('[data-collection]').forEach(e=>e.onclick=()=>{selected=e.dataset.collection;selectedDepartment=catalog.specialistByID.get(selected)?.department||null;selectedSkill=null;renderAtlas();renderInspector()});$('#tree').querySelectorAll('[data-department]').forEach(e=>e.onclick=()=>atlasController?.setDepartment(e.dataset.department));bindPaths($('#tree'));$('#tree').querySelectorAll('[data-folder],[data-knowledge-path]').forEach(el=>{const path=el.dataset.folder||el.dataset.knowledgePath,area=areas.find(a=>path===a.path||path.startsWith(a.path+'/'));if(area)el.addEventListener('click',()=>atlasController?.navigateKnowledge(area.id,path))});$('#tree').querySelector('[data-connect]')?.addEventListener('click',()=>showSetup(0));$('#tree').querySelectorAll('[data-prefix]').forEach(e=>e.onclick=()=>{openSearch(e.dataset.prefix)});
}
function bindPaths(container){container.querySelectorAll('[data-path]').forEach(e=>e.onclick=safe(()=>{const entry=visibleEntries().find(n=>n.path===e.dataset.path);if(entry?.directory){openSearch(entry.path)}else return openNote(e.dataset.path)}))}
let inspectorOpenedByMap=false;
let atlasController=null, selectedSkill=null, selectedDepartment=null, visualPaused=false,replaySession=null,replayProjection=null;
function renderAtlas(){
 const installation=OracleInstallationVisual.projection(state);document.body.classList.toggle('setup-pending',installation.coreReady===false);
 if(!atlasController){atlasController=new OracleAtlas($('#atlas'),{onNavigate:hideTooltip,onSelect:(id,leaf,keyboard,selection)=>{selected=id;selectedSkill=leaf;selectedDepartment=selection?.department||null;renderInspector();if(leaf){if(!document.body.classList.contains('observatory-open')){inspectorOpenedByMap=true;toggleObservatory(true)}}else if(inspectorOpenedByMap){inspectorOpenedByMap=false;toggleObservatory(false)}},onPlugin:id=>plugin(id),onConnector:id=>id==='gbrain'?safe(memory)():settings(),onOpen:safe(openNote),onOpenPrompt:safe(openPromptFromOrbit),onLayout:safe(async layout=>{if(replay)return;await call('saveLayout',{layout});state.config.layout=structuredClone(layout)}),onZoom:value=>{$('#zoom-label').textContent=Math.round(value*100)+'%'}})}
 atlasController.update({promptRoot:state.config.libraryRoots?.prompt||'',departmentAssignments:state.config.departmentAssignments||{},departmentManifest:state.departmentManifest||window.OracleDepartmentManifest,selectedDepartment,collections:replay&&replaySession?.kind==='formation'?replaySession.collections:installation.collections,entries:replay&&replaySession?.kind==='formation'?replaySession.entries:replay?visibleEntries():installation.entries,plugins:state.codexPlugins?.plugins||[],connectors:installation.connectors,coreReady:installation.coreReady,selected,selectedLeaf:selectedSkill,detail:Number($('#density').value),events:replay?timelineEvents().slice(0,cursor+1):state.events,replay,reduced:$('#motion').checked,economy:$('#economy').checked,layout:state.config.layout,formation:undefined,hidden:view!=='map'||window.oracleWindowVisible===false||installation.coreReady===false,paused:visualPaused||!!document.querySelector('dialog[open]')});
}
function setView(next){view=next;$$('[data-view]').forEach(b=>b.classList.toggle('active',b.dataset.view===view));$('#atlas').hidden=view!=='map';$('#results').hidden=view==='map';$('.map-tools').hidden=view!=='map';renderResults();atlasController?.setPaused(view!=='map'||document.hidden)}
function renderResults(){if(view==='map')return;let entries=visibleEntries().filter(e=>(view==='folders'||!e.directory)&&(!query||(e.path+' '+title(e)).toLowerCase().includes(query)));$('#results').innerHTML=`<h2>${view==='list'?'Documentos':'Pastas e documentos'} <small>${entries.length} resultados · fonte local</small></h2>`+(entries.length?entries.slice(0,300).map(e=>`<button class="result" data-path="${esc(e.path)}">${icon(e.directory?'folder':'note')}<div><strong>${esc(title(e))}</strong><small>${esc(entryLocation(e))}</small></div></button>`).join('')+(entries.length>300?'<p class="empty">Mostrando 300 resultados. Refine a busca.</p>':''):'<p class="empty">Nenhum resultado nesta pasta e filtro.</p>');bindPaths($('#results'))}
const collectionDescriptions={ads:'Estratégia, criação e análise de campanhas.',code:'Procedimentos para projetar, construir e revisar software.',contents:'Seu espaço para procedimentos de conteúdo.','customer-finder':'Pesquisa e descoberta de potenciais clientes.','cyber-security':'Conhecimento e procedimentos de segurança.',marketing:'Pesquisa, posicionamento e crescimento.','personal-branding':'Seu espaço para identidade e marca pessoal.'};
function renderInspector(){
 if(selectedSkill){renderSkillInspector();return}
 const department=atlasController?.catalog?.departmentByID.get(selectedDepartment);
 if(department&&!selected){$('#inspector-title').textContent=department.name;$('#inspector').innerHTML=`<span class="pill">Departamento</span><div class="big-count">${department.specialistCount}</div><small>${department.specialistCount===1?'especialista instalado':'especialistas instalados'} · ${department.skillCount} skills</small><p class="muted">A organização é visual. Seus arquivos continuam nas pastas originais.</p>${department.specialists.map(s=>`<button class="secondary" data-inspect-specialist="${esc(s.id)}">${esc(s.name)} · ${s.skillCount}</button>`).join('')}${department.empty?'<p>Nenhum especialista instalado neste departamento.</p>':''}${department.skillCount?'<button class="secondary" id="department-search">Buscar neste departamento</button>':''}`;$$('[data-inspect-specialist]').forEach(b=>b.onclick=()=>atlasController.focus(b.dataset.inspectSpecialist));$('#department-search')?.addEventListener('click',()=>openSearch('',{department:department.id}));return}
 const c=state.collections.find(c=>c.id===selected),group=atlasController?.groups.get(atlasController?.context.group);
 if(group){$('#inspector-title').textContent=group.name;$('#inspector').innerHTML=`<span class="pill">${group.kind==='folder'?'Pasta':'Por nome'} · ${esc(c?.name||'')}</span><div class="big-count">${group.skills.length}</div><small>${group.skills.length===1?'skill neste grupo':'skills neste grupo'}</small><p class="muted">${group.kind==='folder'?'Arquivos reunidos na mesma pasta.':'Uma faixa alfabética para explorar sua coleção.'}</p><button id="group-parent" class="secondary">Voltar ao especialista</button>`;$('#group-parent').onclick=()=>atlasController.focus(selected);return}
 $('#inspector-title').textContent=c?c.name:'Observatório';
 $('#inspector').innerHTML=c?`<div class="big-count">${skills(c.id).length}</div><small>${skills(c.id).length===1?'skill disponível':'skills disponíveis'}</small><p class="muted">${esc(collectionDescriptions[c.id]||'Seus procedimentos, reunidos por especialidade.')}</p><button id="view-skills" class="secondary">Explorar skills</button>`:`<div class="inspector-orbit">${icon('brain')}</div><p class="inspector-welcome">Seu conhecimento, conectado.</p><p class="muted">Selecione um especialista para explorar suas skills.</p>`;
 $('#view-skills')?.addEventListener('click',()=>openSearch(`SISTEMA/skills/${c.id}`));
}
function renderProgress(){
 // Only actual receipts control installation progress; replay never enters here as a source.
 const last=state.events.filter(e=>e.phase&&Number.isFinite(e.total)).at(-1), bar=$('#installation-progress');
 const complete=last&&(last.event_type.endsWith('failed')||last.event_type.endsWith('completed')||last.completed>=last.total);
 const active=(state.operations?.setup||state.operations?.gbrain)&&last&&!complete&&last.total>0;
 bar.hidden=!active;
 if(active){const completed=Math.max(0,Math.min(last.completed||0,last.total));bar.setAttribute('aria-valuemin','0');bar.setAttribute('aria-valuemax',String(last.total));bar.setAttribute('aria-valuenow',String(completed));bar.setAttribute('aria-valuetext',`${completed} de ${last.total} arquivos verificados`);$('#progress-fill').style.width=(completed/last.total*100)+'%'}
 renderPlayback();
}
let editorSession=null,draftTimer=null,editorWrites=Promise.resolve();
function queueEditorWrite(operation){const task=editorWrites.catch(()=>{}).then(operation);editorWrites=task.catch(()=>{});return task}
async function persistEditorDraft(){
 clearTimeout(draftTimer);
 const session=editorSession;if(!session||!modalDirty)return;
 if(session.savePromise)await session.savePromise;
 const revision=session.revision,text=session.text;
 if(text===session.base)return;
 const saved=await queueEditorWrite(()=>call('saveDraft',{path:session.path,hash:session.hash,text}));
 if(editorSession===session&&revision===session.revision){session.saved=true;const status=$('#draft-status');if(status)status.textContent='Rascunho guardado neste Mac'}
 return saved;
}
async function openNote(path){
 if(navigationBlocked())return;
 const epoch=navigationEpoch,sequence=++noteReadSequence,document=await call('read',{path});if(epoch!==navigationEpoch||sequence!==noteReadSequence||navigationBlocked())return;
 readDocument={...document,relative:path};editorSession=null;
 const name=path.endsWith('/SKILL.md')?path.split('/').at(-2).replace(/-/g,' '):path.split('/').at(-1).replace(/\.md$/i,'');
 modal(`<h1>${esc(name)}</h1>${document.draft&&document.draft.text!==document.text?'<div class="editor-recovery"><p>Há um rascunho que ainda não foi salvo no documento.</p><button class="secondary" id="recover-draft">Retomar</button></div>':''}<article class="markdown-reader">${markdown(document.text)}</article><details class="source-details"><summary>Detalhes do arquivo</summary><div class="source">${esc(document.path)}<br>SHA-256 ${document.hash}</div></details>${actions(`<button class="secondary" id="reveal-note">Mostrar no Finder</button>${document.editable!==false?'<button class="primary" id="edit-note">Editar</button>':''}`)}`,{family:'reader',key:'document:'+path});
 bindMarkdown($('#modal-content'),path);$('#reveal-note').onclick=safe(()=>call('reveal',{path}));$('#edit-note')?.addEventListener('click',()=>editNote());
 $('#recover-draft')?.addEventListener('click',()=>{editNote(document.draft.text,document.draft.originalHash);if(document.draft.originalHash!==document.hash)showEditorConflict(document)});
 return true;
}
function editNote(draft=readDocument.text,baseHash=readDocument.hash){
 const current=editorSession;
 editorSession=current&&current.path===readDocument.relative?current:{path:readDocument.relative,hash:baseHash,base:readDocument.text,text:draft,revision:0,saved:false};
 const session=editorSession;session.text=draft;
 modal(`<h1>Editar ${esc(session.path.endsWith('/SKILL.md')?session.path.split('/').at(-2).replace(/-/g,' '):session.path.split('/').at(-1))}</h1><div class="editor-status"><span id="draft-status">${session.saved?'Rascunho guardado neste Mac':'O arquivo será salvo na sua pasta do Obsidian'}</span><button id="reload-note">Reler arquivo</button></div><div id="editor-conflict"></div><textarea class="editor" id="editor" aria-label="Conteúdo do documento" autocorrect="off" autocapitalize="off" spellcheck="false" writingsuggestions="false">${esc(draft)}</textarea>${actions('<button class="secondary" id="discard-edit">Descartar</button><button class="secondary" id="diff">Ver alterações</button><button class="primary" id="save-note">Salvar</button>')}`,{family:'editor',focus:'#editor',key:'editor:'+session.path});
 modalDirty=session.text!==session.base;
 $('#editor').oninput=()=>{session.text=$('#editor').value;session.revision++;session.saved=false;modalDirty=session.text!==session.base;$('#draft-status').textContent=modalDirty?'Guardando rascunho…':'Sem alterações';clearTimeout(draftTimer);if(modalDirty)draftTimer=setTimeout(()=>safe(persistEditorDraft)(),450)};
 $('#discard-edit').onclick=()=>requestEditorExit(true);
 $('#diff').onclick=()=>reviewEdit(session);
 $('#save-note').onclick=safe(saveEditor);
 $('#reload-note').onclick=safe(async()=>{const doc=await call('read',{path:session.path});if(doc.hash!==session.hash)showEditorConflict(doc);else toast('O documento continua atualizado.')});
}
function showEditorConflict(current){
 if(!editorSession)return;
 const mount=$('#editor-conflict');if(!mount){editNote(editorSession.text);return showEditorConflict(current)}
 const session=editorSession;session.conflict=current;
 mount.innerHTML=`<div class="editor-recovery"><p>Este arquivo mudou no Obsidian. Seu rascunho está guardado. Confira a versão atual antes de salvar.</p><details class="source-details"><summary>Ver versão atual</summary><pre>${esc(current.text)}</pre></details><button class="secondary" id="merge-base">Usar versão atual como base</button></div>`;
 $('#save-note').disabled=true;
 $('#merge-base').onclick=()=>{session.hash=current.hash;session.base=current.text;session.conflict=null;readDocument={...current,relative:session.path};modalDirty=session.text!==session.base;mount.innerHTML='<p class="modal-notice">Revise seu texto com as mudanças do Obsidian antes de salvar.</p>';$('#save-note').disabled=false;safe(persistEditorDraft)();$('#editor').focus()};
 mount.scrollIntoView({block:'nearest'});
}
async function saveEditor(){
 const session=editorSession;if(!session)return;
 if(session.savePromise)return session.savePromise;
 clearTimeout(draftTimer);
 const sent={path:session.path,hash:session.hash,text:session.text,revision:session.revision};
 const save=queueEditorWrite(()=>call('saveNote',{path:sent.path,hash:sent.hash,text:sent.text})).then(result=>{
  if(result.status==='conflict'){session.conflict=result.current;if(editorSession===session)showEditorConflict(result.current);return result}
  if(result.status!=='saved'||!result.document?.hash)throw Error('A gravação ainda não foi confirmada. Seu texto continua no editor.');
  session.base=sent.text;session.hash=result.document.hash;
  modalHistory=modalHistory.filter(page=>!(page.family==='reader'&&page.document?.relative===session.path));
  session.saved=session.text===sent.text;
  if(editorSession===session){readDocument={...result.document,relative:session.path};modalDirty=session.text!==session.base;const label=$('#draft-status');if(label)label.textContent=modalDirty?'Versão enviada salva. Guardando a digitação mais recente…':'Salvo no arquivo original';}
  return result;
 });
 session.savePromise=save;
 let failure;try{await save}catch(error){failure=error}finally{session.savePromise=null}
 if(editorSession!==session)return;
 // The editor stays mounted. A later revision can never be replaced by the acknowledgement.
 if(modalDirty)await persistEditorDraft();
 if(failure)throw failure;
 safe(refresh)();
}
function reviewEdit(session){
 const old=session.base.split('\n'),now=session.text.split('\n');let lines='';
 for(let i=0;i<Math.max(old.length,now.length);i++){if(old[i]===now[i])lines+='  '+esc(old[i]??'')+'\n';else{if(old[i]!==undefined)lines+=`<span class="diff-remove">− ${esc(old[i])}</span>\n`;if(now[i]!==undefined)lines+=`<span class="diff-add">+ ${esc(now[i])}</span>\n`}}
 modal(`<h1>Suas alterações</h1><p>Salvar atualiza o arquivo original na sua pasta do Obsidian.</p><pre>${lines}</pre>${actions('<button class="secondary" id="back-editor">Voltar ao editor</button><button class="primary" id="save-note">Salvar</button>')}`,{family:'editor',key:'diff:'+session.path});
 modalDirty=session.text!==session.base;$('#back-editor').onclick=()=>editNote(session.text);$('#save-note').onclick=safe(saveEditor);
}
function requestEditorExit(discardOnly=false,onExit=null){
 const leave=onExit||(()=>closeModal(true));
 if(!editorSession){leave();return}
 if(!modalDirty){leave();return}
 let notice=$('.editor-exit');if(notice){notice.querySelector('button')?.focus();return}
 notice=document.createElement('div');notice.className='editor-exit editor-recovery';notice.setAttribute('role','alert');
 notice.innerHTML=`<p>${discardOnly?'Descartar suas alterações?':'Há alterações que ainda não foram salvas no arquivo.'}</p><button class="secondary" id="keep-editing">Continuar editando</button>${discardOnly?'':'<button class="secondary" id="keep-draft-close">Guardar rascunho e '+(onExit?'voltar':'fechar')+'</button>'}<button class="secondary" id="confirm-discard">Descartar</button>`;
 $('.modal-body').prepend(notice);notice.scrollIntoView({block:'nearest'});
 $('#keep-editing').onclick=()=>{notice.remove();$('#editor')?.focus()};
 $('#keep-draft-close')?.addEventListener('click',safe(async()=>{const draft=editorSession;await persistEditorDraft();editorSession=null;modalDirty=false;leave();if($('#modal').open&&$('#modal').dataset.family==='reader'&&readDocument?.relative===draft.path){let recovery=$('#recover-draft');if(!recovery){const box=document.createElement('div');box.className='editor-recovery';box.innerHTML='<p>Seu rascunho continua guardado.</p><button class=secondary id=recover-draft>Retomar</button>';$('.modal-body').prepend(box);recovery=$('#recover-draft')}recovery.onclick=()=>editNote(draft.text,draft.hash)}}));
 $('#confirm-discard').onclick=safe(async()=>{clearTimeout(draftTimer);await call('discardDraft',{path:editorSession.path});editorSession=null;modalDirty=false;leave()});
 $('#keep-editing').focus();
}
window.oraclePrepareToClose=async()=>{if(editorSession?.savePromise)await editorSession.savePromise;await persistEditorDraft();await window.OracleOnboarding?.prepareToClose?.();return true};
function showSetup(options={}){
 if(!window.OracleOnboarding||window.ORACLE_PREVIEW){toast('A configuração funciona no aplicativo para macOS.');return;}
 const enter=()=>{closeModal(true);OracleOnboarding.open(typeof options==='object'?options:{});};
 if(modalDirty){requestEditorExit(false,enter);return;}enter();
}
const pluginStates={connected:'Conectado',disconnected:'Desconectado',installed:'Instalado',needs_auth:'Conectar conta',unavailable:'Indisponível',missing:'Ausente',absent:'Ausente',pending:'Pendente',inactive:'Inativo',disabled:'Inativo',paused:'Pausado',running:'Em execução',error:'Erro'};
const statusBadge=(status,label)=>OracleStatusBadge.render(status,label);
function pluginIcon(p){const url=p.iconDataURL;return url&&/^data:image\/(png|jpeg|webp);base64,/.test(url)?`<span class="plugin-icon"><img src="${esc(url)}" alt=""></span>`:`<span class="plugin-icon plugin-fallback" aria-hidden="true">${icon('orbit')}</span>`}
function renderPlugins(){
 const inventory=state.codexPlugins;
 $('#plugin-list').innerHTML=inventory?.plugins?.length?inventory.plugins.map((p,i)=>`<button class="plugin-row" data-plugin-index="${i}">${pluginIcon(p)}<div><strong>${esc(p.name)}</strong>${statusBadge(p.status,pluginStates[p.status]||'Não verificado')}</div></button>`).join(''):`<small>${inventory?.status==='available'?'Nenhum plugin disponível.':'Conecte o Codex para ver seus plugins.'}</small>`;
 $$('#plugin-list [data-plugin-index]').forEach(b=>b.onclick=()=>plugin(inventory.plugins[Number(b.dataset.pluginIndex)].id));
}
function plugin(id){
 const inventory=state.codexPlugins,p=inventory?.plugins?.find(p=>p.id===id),fromSettings=settingsTrail;
 modal(p?`<h1>${esc(p.name)}</h1><div class="plugin-row">${pluginIcon(p)}${statusBadge(p.status,pluginStates[p.status]||'Não verificado')}</div><p>${p.status==='connected'?'As ferramentas deste plugin estão disponíveis no Codex.':'Gerencie a conexão e as permissões deste plugin no Codex.'}</p><details class="source-details"><summary>Detalhes da conexão</summary><pre>${esc(JSON.stringify({checkedAt:inventory.checkedAt,kind:p.kind,evidence:p.evidence},null,2))}</pre></details>${actions('<button class="primary" id="manage-plugin">Abrir Codex</button>')}`:`<h1>Plugins</h1><p>${inventory?.status==='available'?'Seus plugins e conexões no Codex.':'Conecte o Codex para acessar seus plugins.'}</p><div id="modal-plugins"></div>${actions('<button class="primary" id="manage-plugin">Abrir Codex</button>')}`,{breadcrumb:[...(fromSettings?['Ajustes','Codex e plugins']:[]),'Plugins',...(p?[p.name]:[])],onBack:p?()=>plugin():fromSettings?()=>reviewBridge():()=>closeModal()});
 if(!p&&inventory?.plugins?.length){$('#modal-plugins').innerHTML=inventory.plugins.map((p,i)=>`<button class="plugin-row" data-plugin="${i}">${pluginIcon(p)}<div><strong>${esc(p.name)}</strong>${statusBadge(p.status,pluginStates[p.status]||'Não verificado')}</div>${icon('chevron')}</button>`).join('');$$('[data-plugin]').forEach(b=>b.onclick=()=>plugin(inventory.plugins[Number(b.dataset.plugin)].id))}
 $('#manage-plugin').onclick=safe(()=>call('openCodex'));
}
async function conversations(){
 if(navigationBlocked())return;
 const epoch=navigationEpoch,items=await call('conversations');if(epoch!==navigationEpoch||navigationBlocked())return;
 modal(`<h1>Conversas importadas</h1><p>Importe um arquivo Oracle Conversations v1. O histórico das suas contas não é acessado automaticamente.</p><div id="conversation-list">${items.map((c,i)=>`<button class="result" data-conversation="${i}">${icon('chat')}<div><strong>${esc(c.title)}</strong><small>${esc(c.source)}</small></div></button>`).join('')||'<p class="empty">Nenhuma conversa importada.</p>'}</div>${actions('<button class="primary" id="import-conversations">Importar conversas…</button>')}`);
 $('#import-conversations').onclick=safe(async()=>{const e=navigationEpoch;await call('importConversations');if(e===navigationEpoch)await conversations()});
 $$('[data-conversation]').forEach(e=>e.onclick=()=>{const c=items[Number(e.dataset.conversation)];modal(`<h1>${esc(c.title)}</h1><div class="source">${esc(c.source)} · conteúdo importado</div><pre>${esc(c.messages.map(m=>m.role.toUpperCase()+'\n'+m.text).join('\n\n'))}</pre>${actions()}`)});
}
async function instructions(){const revision=modalRevision;const items=await call('instructions');if(revision!==modalRevision)return;modal(`<h1>Instruções dos projetos</h1><p>Consulte as instruções dos projetos que você conectou.</p>${items.map((e,i)=>`<button class="result" data-instruction="${i}">${icon('book')}<div><strong>${esc(e.path)}</strong><small>${esc(e.source.split('/').at(-1))}</small></div></button>`).join('')||'<p class="empty">Conecte um projeto para ver suas instruções.</p>'}${actions('<button class="primary" id="add-project">Autorizar projeto…</button>')}`);$('#add-project').onclick=safe(async()=>{await call('chooseProject');await instructions()});$$('[data-instruction]').forEach(e=>e.onclick=safe(async()=>{const doc=await call('readInstruction',items[Number(e.dataset.instruction)]);modal(`<h1>Instrução encontrada</h1><div class="source">${esc(doc.path)}</div><pre>${esc(doc.text)}</pre>${actions()}`)}))}
function activity(){modal(`<h1>Histórico técnico</h1><p>Hooks observam apenas caminhos suportados e confiados no Codex. Ferramentas hosted podem não emitir todos os eventos. Stop encerra um turno; silêncio não prova ociosidade, sucesso ou falha.</p><span class="pill">${state.events.filter(e=>e.source==='codex-hook').length} hooks recebidos</span><span class="pill">Sem observação total</span><pre>${esc(state.events.slice(-50).map(e=>`${e.received_at} · ${e.source}\n${e.event_type}: ${e.sanitized_summary}`).join('\n\n')||'Nenhum recibo recebido. A integração não foi comprovada nesta instalação.')}</pre>${actions('<button class="secondary" id="journal-replay">Reproduzir histórico</button>')}`);$('#journal-replay').onclick=safe(startJournal)}
const libraryHooks={state:()=>state,esc,icon,modal,epoch:()=>navigationEpoch,blocked:navigationBlocked,refresh,rescan:refreshVault,toast,call,openNote:safe(openNote),bindMarkdown};
const promptBrowser=new OracleLibrary.Library({id:'prompt',family:'prompts',root:promptRoot,title:'Biblioteca de prompts',all:'Todos os prompts',description:'Prompts Markdown no seu vault. A prévia lê o arquivo original.',trigger:'#prompts'},libraryHooks);
const tutorialBrowser=new OracleLibrary.Library({id:'tutorial',family:'tutorials',root:tutorialRoot,title:'Tutoriais',all:'Todos os tutoriais',description:'Tutoriais Markdown nas pastas reais do seu vault.',trigger:'#tutorials'},libraryHooks);
function promptData(){return promptBrowser.data()}
function tutorialData(){return tutorialBrowser.data()}
function promptLibrary(){return promptBrowser.open()}
function tutorialsLibrary(){return tutorialBrowser.open()}
function renderPromptLibrary(){return promptBrowser.render()}
function renderTutorialLibrary(){return tutorialBrowser.render()}
function selectPrompt(path){return promptBrowser.select(path)}
function selectTutorial(path){return tutorialBrowser.select(path)}
function openPromptFromOrbit(path){return promptBrowser.open(path)}
function departmentSettings(){
 const catalog=departmentCatalog();
 modal(`<h1>Organizar departamentos</h1><p>A organização usa os mesmos departamentos do mapa. Os arquivos permanecem nas pastas originais.</p><div class="department-settings">${catalog.specialists.map(c=>`<label class="department-setting"><span>${esc(c.name)}</span><select data-department-choice="${esc(c.id)}">${catalog.departments.map(d=>`<option value="${esc(d.id)}" ${c.department===d.id?'selected':''}>${esc(d.name)}</option>`).join('')}</select></label>`).join('')||'<p class="empty">Nenhum especialista encontrado nesta fonte.</p>'}</div>${actions('<button class="primary" id="save-departments">Salvar organização</button>')}`);
 $('#save-departments').onclick=safe(async()=>{
  // The native preferences keep their shipped slugs; the shared catalog normalizes them.
  const assignments={...state.config.departmentAssignments,...Object.fromEntries($$('[data-department-choice]').map(e=>[e.dataset.departmentChoice,e.value==='department/other'?'unassigned':e.value.replace(/^department\//,'')]))};
  await call('saveDepartments',{assignments});state.config.departmentAssignments=assignments;if(atlasController)atlasController.topologyKey=null;await refresh();toast('Organização salva. Os arquivos permanecem no lugar.');
 });
}
async function catalogSettings(){
 if(!state.onboarding?.capabilities?.manageCatalogSource){toast('Esta ação exige a licença administrativa assinada.');return;}
 const epoch=navigationEpoch,status=await call('updateStatus');if(epoch!==navigationEpoch)return;
 modal(`<h1>Fonte oficial de skills</h1><p>Configuração administrativa. Os alunos recebem apenas o catálogo aprovado; este controle não altera os arquivos de origem.</p><label class="field">Repositório GitHub HTTPS<input id="catalog-repository" type="url" value="${esc(status.skills_repository||'')}" placeholder="https://github.com/organizacao/repositorio"></label><p class="muted">Não inclua tokens ou credenciais. O catálogo é validado antes de instalar.</p>${actions('<button class="primary" id="save-catalog-source">Salvar fonte</button>')}`);
 $('#save-catalog-source').onclick=safe(async()=>{await call('configureSkillSource',{repository:$('#catalog-repository').value});toast('Fonte configurada. Use Verificar para consultar uma versão.');});
}

function settings(){
 if(document.querySelector('.ob-dialog[open]'))return;
 if(modalDirty){requestEditorExit(false,settings);return}
 settingsTrail=true;
 const row=(id,name,description,ic='chevron')=>`<button class="setting-row" id="${id}"><span><strong>${name}</strong><small>${description}</small></span>${icon(ic)}</button>`;
 modal(`<h1>Ajustes do Oracle</h1>
 <section class="settings-section"><h2>Seu Oracle</h2><div class="setting-group">
 ${row('restart-setup','Configurar Oracle','Identidade, instalação local e pasta do Obsidian')}
 ${row('manage-departments','Organizar departamentos','Agrupamento visual; os arquivos não serão movidos')}
 ${row('gbrain-memory','Consultar memória','Encontrar notas e suas conexões')}
 ${row('gbrain-connect','Conectar Second Brain','Usar uma instalação que você já possui')}
 ${row('gbrain-review','Revisar contexto','Conferir as informações sobre você')}
 ${row('maintenance-settings','Sincronização e manutenção','Índice local, consentimento e último resultado')}
 ${row('backup-settings','Backup privado do banco','Consentimento, integridade e restauração de teste')}
 </div></section>
 <section class="settings-section"><h2>Conexões e privacidade</h2><div class="setting-group">
 ${row('bridge-review','Codex e plugins','Ver e gerenciar suas conexões')}
 ${row('protect-settings','Bloqueio',state.config.protected?'Touch ID ou senha do Mac ativados':'Ativar Touch ID ou senha do Mac','lock')}
 ${row('revoke','Desconectar pastas','Interromper o acesso do Oracle aos documentos')}
 </div></section>
 <section class="settings-section"><h2>Aplicativo</h2><div class="setting-group">
 ${row('updates-settings','Atualizações','Verificar novidades e versões','refresh')}
 ${state.onboarding?.capabilities?.manageCatalogSource?row('catalog-settings','Fonte oficial de skills','Ação administrativa desta licença'):''}
 ${row('export-view','Exportar imagem','Salvar uma imagem do seu universo')}
 </div></section>
 <details class="source-details"><summary>Avançado</summary><div class="setting-group">
 ${row('graphics-diagnostics','Desempenho do mapa','Medidas desta janela')}
 ${row('activity-settings','Histórico técnico','Consultar registros de atividade')}
 </div><div class="source">${window.ORACLE_PREVIEW||state.config.fixture?'Ambiente de validação · dados sintéticos':'Instalação local'}<br>Pasta: ${esc(state.config.vault||'Não selecionada')}<br>${esc(buildDescription())}</div></details>${actions()}`,{family:'settings'});
 $('#restart-setup').onclick=()=>showSetup({fromSettings:true});$('#manage-departments').onclick=departmentSettings;
 $('#catalog-settings')?.addEventListener('click',safe(catalogSettings));
 $('#gbrain-memory').onclick=safe(memory);$('#gbrain-review').onclick=safe(reviewGBrain);$('#bridge-review').onclick=safe(reviewBridge);
 $('#maintenance-settings').onclick=safe(maintenanceSettings);$('#backup-settings').onclick=safe(backupSettings);
 $('#graphics-diagnostics').onclick=graphicsDiagnostics;$('#activity-settings').onclick=activity;$('#updates-settings').onclick=safe(()=>showUpdates(false));
 $('#export-view').onclick=safe(async()=>{closeModal();const path=await call('exportSnapshot');if(path)toast('Imagem salva.')});
 $('#gbrain-connect').onclick=safe(async()=>{await call('chooseGBrain');await refresh();settings()});
 $('#protect-settings').onclick=safe(async()=>{await call('protect');await refresh();settings();toast('Bloqueio ativado')});
 $('#revoke').onclick=()=>{modal(`<h1>Desconectar pastas?</h1><p>O Oracle deixará de acessar seus documentos. Os arquivos continuam no Obsidian e você pode conectar a pasta novamente.</p>${actions('<button class="secondary" id="revoke-cancel">Voltar</button><button class="primary" id="confirm-revoke">Desconectar</button>')}`);$('#revoke-cancel').onclick=settings;$('#confirm-revoke').onclick=safe(async()=>{await call('revoke');live();selected=null;selectedSkill=null;query='';await refresh();settings()})};
}
async function maintenanceSettings(){
 const value=await call('maintenanceStatus'),sync=state.gbrainSync||{},last=value.lastRun?.lastSuccess;
 const capture=value.autoCapture===true&&value.captureSource==='codex_workspace_hooks_v1';
 const remote=value.remoteProcessing===true&&value.synthesisScope==='captured_messages_codex_v1';
 modal(`<h1>Sincronização e manutenção</h1>
 <p>O índice acompanha o vault enquanto o Oracle estiver aberto e desbloqueado. A indexação básica é local e preserva instalações externas.</p>
 <dl class="ob-review"><dt>Índice</dt><dd>${esc(sync.status==='verified'?'Verificado':sync.status==='external_preserved'?'Instalação externa preservada':sync.status==='needs_attention'?'Precisa de atenção':'Aguardando configuração')}</dd><dt>Última rotina completa</dt><dd>${last?esc(new Date(last).toLocaleString('pt-BR')):'Nenhuma execução confirmada'}</dd><dt>Agendamento externo</dt><dd>${value.scheduleState==='disabled'?'Não solicitado':'Pendente de confirmação no aplicativo oficial'}</dd></dl>
 <label class="ob-check"><input type="checkbox" id="maintenance-enabled" ${value.enabled?'checked':''} ${value.external?'disabled':''}>Manutenção local diária</label>
 <div class="ob-fields"><label for="maintenance-hour">Horário preferencial</label><select id="maintenance-hour">${Array.from({length:24},(_,h)=>`<option value="${h}" ${h===value.hour?'selected':''}>${String(h).padStart(2,'0')}:00</option>`).join('')}</select><label for="maintenance-zone">Fuso horário</label><input id="maintenance-zone" value="${esc(value.timezone)}" maxlength="80"></div>
 <label class="ob-check"><input type="checkbox" id="maintenance-capture" ${capture?'checked':''}>Capturar prompts e últimas respostas do workspace Oracle</label>
 <p class="muted">Somente mensagens novas recebidas por hooks que você confiou no Codex, inclusive quando o Oracle estiver fechado. Não lê histórico privado, transcrições, raciocínio ou resultados de ferramentas. As mensagens serão guardadas localmente e projetadas em INBOX/oracle-history/conversations. Reativar não recupera mensagens de uma autorização revogada.</p>
 <label class="ob-check"><input type="checkbox" id="maintenance-remote" ${remote?'checked':''}>Enviar essas capturas ao Codex para gerar sínteses</label>
 <p class="muted">Consentimento separado para processamento remoto. Usa a conexão e um modelo disponível no Codex; sem conexão, a fase falha e pode ser retomada. As sínteses são notas separadas, com fontes e revisão humana recomendada; não alteram sua identidade automaticamente.</p>
 <p class="muted">Pausar interrompe novas capturas e a rotina diária; a indexação básica continua. Uma síntese em andamento recebe cancelamento. Conteúdo já enviado não pode ser recolhido. Mensagens já salvas não são apagadas.</p>
 <details><summary>Backup e agendamento</summary><p>Backup do banco exige o consentimento separado nos Ajustes de backup. Preparar um pedido não registra uma tarefa no host. O comando confere novamente consentimento e vault antes de executar; nenhum ID de tarefa é inventado.</p></details>
 <p role="status">${esc(value.message)}</p><p>Última tentativa: ${esc(value.lastRun?.status||'Nenhuma')}${value.lastRun?.message?' · '+esc(value.lastRun.message):''}. ${value.lastRun?.complete===false?'Há fases pendentes; a rotina completa não foi confirmada.':''}</p>
 ${actions('<button class="secondary" id="maintenance-run" '+(!value.enabled||value.external?'disabled':'')+'>Executar agora</button><button class="secondary" id="maintenance-request" '+(!value.enabled||value.external?'disabled':'')+'>Preparar pedido para o Codex</button><button class="primary" id="maintenance-save">Salvar preferências</button>')}`,{key:'maintenance-settings'});
 const updateConsentControls=()=>{const enabled=$('#maintenance-enabled').checked&&!value.external;$('#maintenance-capture').disabled=!enabled;$('#maintenance-remote').disabled=!enabled||!$('#maintenance-capture').checked;if($('#maintenance-remote').disabled)$('#maintenance-remote').checked=false};
 $('#maintenance-enabled').onchange=updateConsentControls;$('#maintenance-capture').onchange=updateConsentControls;updateConsentControls();
 $('#maintenance-save').onclick=safe(async()=>{const enabled=$('#maintenance-enabled').checked,capture=enabled&&$('#maintenance-capture').checked,remote=capture&&$('#maintenance-remote').checked;await call('configureMaintenance',{enabled,timezone:$('#maintenance-zone').value,hour:Number($('#maintenance-hour').value),autoCapture:capture,remoteProcessing:remote,captureSource:capture?'codex_workspace_hooks_v1':null,synthesisScope:remote?'captured_messages_codex_v1':null});await refresh();await maintenanceSettings()});
 $('#maintenance-run').onclick=safe(async()=>{const result=await call('maintenanceRun');await maintenanceSettings();toast(result.status==='local_complete'?(result.complete?'Rotina local verificada.':'Parte local verificada; as demais fases continuam pendentes.'):'Manutenção não concluída: '+result.status)});
 $('#maintenance-request').onclick=safe(async()=>{const result=await call('maintenanceScheduleRequest');modal(`<h1>Pedido de agendamento</h1><p>Pedido preparado, ainda não registrado. O aplicativo oficial deverá localizar ou criar a tarefa e confirmar sua existência.</p><pre class="ob-readback">${esc(result.request)}</pre>${actions('<button class="primary" id="copy-maintenance-request">Copiar pedido</button>')}`);$('#copy-maintenance-request').onclick=safe(async()=>{await call('copy',{text:result.request});toast('Pedido copiado. O registro continua pendente de confirmação no host.')})});
}
function renderPlayback(){
 const journal=replaySession?.kind==='journal',formation=atlasController?.getFormation(),playing=journal?!!timer:!!formation?.playing;
 const max=journal?Math.max(0,replaySession.events.length-1):1000;
 $('#timeline').max=max;$('#timeline').value=replay?(journal?cursor:Math.round((formation?.progress??1)*1000)):max;
 const phase=journal?'Histórico':({sun:'SOL',collections:'Conexões',skills:'Skills',complete:'Completo'}[formation?.phase]||'SOL');
 $('#replay-label').textContent=replay?phase:'Ao vivo';
 $('#play').innerHTML=icon(playing?'pause':'play');
 const label=playing?'Pausar timelapse':replay?'Retomar timelapse':'Iniciar timelapse';
 $('#play').setAttribute('aria-label',label);$('#play').dataset.tooltip=label;
 $('#timeline').setAttribute('aria-valuetext',replay?`${phase}, ${Math.round(Number($('#timeline').value)/Math.max(1,max)*100)}%`:'Visão atual');
 $('#live').disabled=!replay;$('#speed').setAttribute('aria-label',`Velocidade do timelapse: ${speed} vezes`);$('#reset-layout').disabled=replay;
}
function live(){
 clearInterval(timer);timer=null;replay=false;replayProjection=null;replaySession=null;
 atlasController?.setFormation({progress:1,playing:false});
 if(atlasController)atlasController.restoreLayout(state.config.layout);
 render();
}
async function ensureReplay(){
 if(replaySession)return;
 replaySession={kind:'formation',entries:structuredClone(state.entries),collections:structuredClone(state.collections)};
 cursor=0;selected=null;selectedSkill=null;replay=true;renderAtlas();atlasController?.fit();renderInspector();
 atlasController?.setFormation({progress:0,playing:false,duration:12000,rate:speed});
}
function projectReplay(){
 if(replaySession?.kind==='journal'){replayProjection=OracleReplay.projectJournal(replaySession.baseline,replaySession.events,cursor);renderAtlas();renderResults()}
 renderPlayback();
}
async function scrub(){
 const value=Number($('#timeline').value);clearInterval(timer);timer=null;await ensureReplay();replay=true;
 if(replaySession.kind==='journal'){cursor=value;projectReplay()}else{atlasController.setFormation({progress:value/1000,playing:false});renderPlayback()}
}
async function play(){
 visualPaused=false;$('#ambient-toggle').textContent='Pausar atmosfera';atlasController?.setPaused(document.hidden||window.oracleWindowVisible===false||view!=='map'||!!document.querySelector('dialog[open]'));
 if(replaySession?.kind==='journal'){
  if(timer){clearInterval(timer);timer=null;renderPlayback();return}
  const max=replaySession.events.length-1;if(cursor>=max)cursor=0;
  timer=setInterval(()=>{cursor=Math.min(cursor+1,max);if(cursor===max){clearInterval(timer);timer=null}projectReplay()},800/speed);renderPlayback();return;
 }
 await ensureReplay();replay=true;const current=atlasController.getFormation();
 atlasController.setFormation(current.playing?{playing:false}:{progress:current.progress>=1?0:current.progress,playing:true,duration:12000,rate:speed});renderPlayback();
}
async function startJournal(){
 const data=await call('replayData');if(!data.events?.length)throw Error('Nenhum histórico de instalação disponível.');
 clearInterval(timer);timer=null;replaySession={...data,kind:'journal'};cursor=0;replay=true;closeModal();projectReplay();
}
$('#search').onclick=()=>openSearch();$('#refresh').onclick=safe(refreshVault);$('#settings').onclick=settings;$('#prompts').onclick=safe(promptLibrary);$('#tutorials').onclick=safe(tutorialsLibrary);
$('#tools').onclick=()=>plugin();$('#conversations').onclick=safe(conversations);$('#instructions').onclick=safe(instructions);
$('#density').oninput=renderAtlas;$('#motion').checked=matchMedia('(prefers-reduced-motion: reduce)').matches;
$('#motion').onchange=safe(()=>saveVisualPreference('reduceMotion',$('#motion').checked));
$('#timeline').oninput=safe(scrub);$('#play').onclick=safe(play);$('#live').onclick=live;
$('#speed').onclick=()=>{speed=speed===4?1:speed*2;$('#speed').textContent=speed+'×';atlasController?.setFormation({rate:speed});if(timer){clearInterval(timer);timer=null;play()}renderPlayback()};
$('.wordmark').onclick=e=>{e.preventDefault();setView('map');renderAtlas();atlasController?.select(null);atlasController?.fit()};
$('#updates').onclick=safe(()=>showUpdates(false));
function setZoom(factor){atlasController?.zoomAt(factor)}$('#zoom-in').onclick=()=>setZoom(1.2);$('#zoom-out').onclick=()=>setZoom(1/1.2);$('#zoom-reset').onclick=()=>atlasController?.fit();$('#context-back').onclick=()=>atlasController?.back();$('#reset-layout').onclick=()=>{atlasController?.reset();toast('Posições restauradas. Nenhum arquivo foi movido.')};$('#economy').onchange=safe(()=>saveVisualPreference('economy',$('#economy').checked));
window.oracleLock=()=>{
 window.OracleOnboarding?.suspend();OracleInstallationVisual.reset();refreshSequence++;navigationEpoch++;noteReadSequence++;refreshTask=null;
 memoryEpoch++;memoryPollTask=null;lastMemorySignature='';visualPending={};
 clearTimeout(initialScanTimer);initialScanRetries=0;clearTimeout(updatePolling);
 for(const p of pending.values()){clearTimeout(p.timeout);p.reject(Error('Oracle bloqueado'));}pending.clear();
 replay=false;replayProjection=null;replaySession=null;closeModal(true);if(atlasController){atlasController.dispose();atlasController=null;}
 $('#lock-screen').hidden=false;$('#app').inert=true;state={entries:[],collections:[],events:[],config:{}};readDocument=null;editorSession=null;clearTimeout(draftTimer);
 $('#tree').oracleHTML=null;$('#tree').textContent='';$('#results').textContent='';$('#atlas').textContent='';$('#modal-content').textContent='';clearInterval(timer);timer=null;
};
$('#lock').onclick=safe(async()=>{await persistEditorDraft();await window.OracleOnboarding?.prepareToClose?.();if(!window.ORACLE_PREVIEW)await call('lock');else window.oracleLock();});
$('#unlock').onclick=safe(async()=>{const allowed=await call('unlock');if(!allowed)return;$('#lock-screen').hidden=true;$('#app').inert=false;await refresh();await mountOnboarding();});
// Deterministic ambient dust; it never represents an agent or event.
for(let i=0;i<46;i++){const e=document.createElement('i');e.className='star';e.style.cssText=`left:${(Math.sin(i*12.9898)*43758.5453%1+1)%1*100}%;top:${(Math.sin(i*78.233)*12731.7%1+1)%1*100}%;width:${i%7===0?2:1}px;height:${i%7===0?2:1}px;opacity:${i%5/18+.04}`;$('#galaxy').append(e)}
call('boot').then(async b=>{applyAccessibility(b.accessibility);if(b.locked)window.oracleLock();else{await refresh();$('#app').inert=false;await mountOnboarding()}}).catch(e=>{if($('#lock-screen').hidden)$('#app').inert=false;toast(e.message)});
setInterval(()=>{if(!$('#lock-screen').hidden||document.hidden)return;call('events').then(events=>{if(events.at(-1)?.event_id!==state.events.at(-1)?.event_id){state.events=events;renderProgress();renderAtlas();if(events.at(-1)?.phase&&!$('#modal').open)safe(refresh)()}}).catch(()=>{})},2500);
setInterval(()=>{if($('#lock-screen').hidden&&!document.hidden&&!$('#modal').open)safe(refresh)()},30000);
setInterval(()=>{void pollMemoryStatus();},1800);

async function memory(){
 if(navigationBlocked())return;
 modal('<h1>Memória</h1><p>Conectando à sua biblioteca…</p>'+actions());
 const revision=modalRevision,epoch=navigationEpoch;let status;
 try{status=await call('gbrainRead',{operation:'status'});}catch(error){if(epoch!==navigationEpoch)return;modal(`<h1>Memória indisponível</h1><p role="alert">${esc(error.message)}</p>${actions('<button class="secondary" id="memory-retry">Tentar novamente</button>')}`);$('#memory-retry').onclick=safe(memory);return;}
 if(epoch!==navigationEpoch||revision!==modalRevision||!$('#modal').open)return;
 modal(`<span class="step-label">${window.ORACLE_PREVIEW?'MEMÓRIA / DADOS SINTÉTICOS':'MEMÓRIA / GBRAIN OFICIAL '+esc(status.version)}</span><h1>Memória</h1><p>Encontre suas notas e acompanhe suas conexões.</p><label class="field">Biblioteca<select id="memory-source">${status.sources.map(s=>`<option value="${esc(s.id)}">${esc(({default:'Geral','oracle-memory':'Memória do Oracle','oracle-vault':'Obsidian'})[s.id]||s.name||s.id)}</option>`).join('')}</select></label><label class="search"><input id="memory-query" placeholder="Buscar na memória" aria-label="Buscar na memória"></label><div id="memory-results"></div>${actions('<button class="primary" id="memory-search">Buscar</button>')}`);
 if(status.sources.some(s=>s.id==='oracle-vault'))$('#memory-source').value='oracle-vault';
 const freshness=document.createElement('div');freshness.id='memory-freshness';freshness.className='memory-freshness';freshness.setAttribute('role','status');$('.modal-body').prepend(freshness);renderMemoryFreshness();
 const update=document.createElement('button');update.className='secondary';update.textContent='Atualizar índice local';$('.modal-footer').prepend(update);
 update.onclick=safe(async()=>{state.memorySync=await call('memoryRefresh');renderMemoryFreshness();});
 const source=()=>$('#memory-source').value;
 const viewRevision=modalRevision;let searchSequence=0;
 const renderHits=(hits,src)=>{
  $('#memory-results').innerHTML=hits.map((h,i)=>`<button class="result" data-memory-hit="${i}">${icon('note')}<div><strong>${esc(h.title||h.slug||h.page_slug)}</strong><small>${esc($('#memory-source').selectedOptions[0]?.textContent||'Biblioteca')}</small></div></button>`).join('')||'<p class="empty">Nenhum resultado nesta fonte.</p>';
  $$('[data-memory-hit]').forEach(e=>e.onclick=safe(()=>memoryPage(hits[Number(e.dataset.memoryHit)].slug||hits[Number(e.dataset.memoryHit)].page_slug,src)));
 };
 const search=async()=>{
  const sequence=++searchSequence,query=$('#memory-query').value,src=source();
  const current=()=>sequence===searchSequence&&viewRevision===modalRevision&&$('#modal').open;
  $('#memory-results').innerHTML='<p class="empty" role="status">Consultando esta fonte…</p>';
  $('#memory-results').setAttribute('aria-busy','true');
  try {
   if(!src)throw Error('Nenhuma fonte registrada');
   const hits=await call('gbrainRead',{operation:query?'search':'list',source:src,query});
   if(!current())return;
   if(hits.some(h=>h.source_id&&h.source_id!==src))throw Error('A origem dos resultados não corresponde à fonte selecionada.');
   renderHits(hits,src);
  }catch(e){if(current()){$('#memory-results').innerHTML='<p class="empty">Consulta não concluída.</p>';toast(e.message)}}
  finally{if(current())$('#memory-results').setAttribute('aria-busy','false')}
 };
 $('#memory-search').onclick=search;$('#memory-query').onkeydown=e=>{if(e.key==='Enter')search()};$('#memory-source').onchange=search;if(status.sources.length)await search();
}
async function memoryPage(slug,source){
 const epoch=navigationEpoch,page=await call('gbrainRead',{operation:'get',source,slug});if(epoch!==navigationEpoch)return;if(!page)throw Error('Nota não encontrada');
 let links;try{links=await call('gbrainRead',{operation:'graph',source,slug});}catch(error){links={status:'unavailable',message:error.message};}if(epoch!==navigationEpoch)return;
 const canonical=page.canonical_path||page.frontmatter?.canonical_path||'',prefix=String(state.config.vault||'')+'/';
 const relative=source==='oracle-vault'&&canonical.startsWith(prefix)?canonical.slice(prefix.length):'';
 modal(`<h1>${esc(page.title||slug)}</h1><article class="markdown-reader">${markdown(page.compiled_truth||'')}</article><details class="source-details"><summary>Origem e conexões</summary><div class="source">${esc(source)} / ${esc(slug)}<br>${esc(canonical||page.frontmatter?.origin_source_path||'Caminho de origem não informado')}${page.indexed_hash?'<br>Versão indexada: '+esc(page.indexed_hash):''}</div><pre>${esc(JSON.stringify(links,null,2))}</pre></details>${actions()}`,{family:'reader',key:'memory:'+source+':'+slug});bindMarkdown($('#modal-content'),relative);
}
function renderMemoryFreshness(){
 const element=$('#memory-freshness');if(!element)return;
 const sync=state.memorySync||{},names={current:'Índice local atualizado.',stale:'Alterações aguardam verificação local.',partial:'A leitura ou indexação está parcial. Exclusões não serão reconciliadas.',external:'Perfil externo selecionado. Sua atualização é gerenciada pelo responsável dessa instalação.',unavailable:'Índice local ainda não disponível.'};
 element.textContent=(names[sync.state]||'Atualidade do índice ainda não verificada.')+(sync.indexing?' Indexação em andamento.':'')+(sync.error?' '+sync.error:'');
}
async function reviewGBrain(){const revision=modalRevision;const r=await call('gbrainReadback');if(revision!==modalRevision)return;if(!r.upstream_hash)throw Error('Seu contexto ainda não foi preparado. Continue pela configuração do Oracle.');modal(`<span class="step-label">REVISÃO OFICIAL GBRAIN</span><h1>Revisar contexto</h1><p>Confira suas respostas registradas. Confirmações e alterações são feitas na configuração, vinculadas ao plano atual.</p><pre>${esc(window.OracleOnboarding?.formatReadback?.(r.readback)||r.readback)}</pre>${actions('<button class="primary" id="open-identity-setup">Abrir configuração</button>')}`);$('#open-identity-setup').onclick=()=>showSetup({fromSettings:true});}

function renderSkillInspector(){const path=selectedSkill,name=path.split('/').slice(-2,-1)[0],collection=state.collections.find(c=>c.id===selected);$('#inspector-title').textContent=name.replace(/-/g,' ');$('#inspector').innerHTML=`<span class="pill">Skill · ${esc(collection?.name||'')}</span><p class="muted">Um procedimento da sua coleção de especialistas.</p><button id="inspect-skill" class="primary">Ler procedimento</button><button id="edit-selected-skill" class="secondary">Editar</button><button id="focus-parent">Enquadrar coleção →</button>`;$('#inspect-skill').onclick=safe(()=>openNote(path));$('#edit-selected-skill').onclick=safe(async()=>{if(await openNote(path))editNote()});$('#focus-parent').onclick=()=>atlasController?.focus(selected)}

function graphicsDiagnostics(){modal(`<h1>Diagnóstico do atlas</h1><p>Medidas desta janela, sem estimar tempo de GPU. O movimento ambiental é separado de execução real do Codex.</p><pre>${esc(JSON.stringify(atlasController?.diagnostics()||{renderer:'SVG fallback',reason:atlasController?.renderError},null,2))}</pre>${actions()}`)}

window.oracleVisibility=visible=>{window.oracleWindowVisible=visible;atlasController?.setPaused(!visible||view!=='map'||visualPaused||$('#modal').open);document.body.classList.toggle('window-hidden',!visible)};

$('#ambient-toggle').onclick=()=>{visualPaused=!visualPaused;$('#ambient-toggle').textContent=visualPaused?'Retomar atmosfera':'Pausar atmosfera';atlasController?.setPaused(visualPaused||document.hidden||view!=='map')};

function markdown(text){return OracleMarkdown.render(text)}
function scrollMarkdownFragment(fragment){
 if(!fragment)return;
 const normalized=String(fragment).normalize('NFC').toLocaleLowerCase('pt-BR'),slug=text=>text.replace(/[^\p{L}\p{N}_ -]/gu,'').trim().replace(/\s+/g,'-');
 const heading=[...document.querySelectorAll('.markdown-reader :is(h2,h3,h4,h5,h6)')].find(h=>{const text=h.textContent.normalize('NFC').toLocaleLowerCase('pt-BR');return text===normalized||slug(text)===normalized;});
 if(heading){heading.tabIndex=-1;heading.focus({preventScroll:true});heading.scrollIntoView({block:'start'});}
 else toast('Nota aberta; a seção citada não foi encontrada.');
}
function bindMarkdown(container,sourcePath=readDocument?.relative||''){
 container.querySelectorAll('[data-external]').forEach(e=>e.onclick=safe(()=>call('openExternal',{url:e.dataset.external})));
 container.querySelectorAll('[data-local]').forEach(e=>e.onclick=safe(async()=>{
  if(!sourcePath)throw Error('A origem local deste documento não foi confirmada. Abra a nota na fonte original.');
  const target=OracleMarkdown.resolveLocal(e.dataset.local,sourcePath,visibleEntries());
  if(await openNote(target.path))scrollMarkdownFragment(target.fragment);
 }));
 container.querySelectorAll('[data-wiki]').forEach(e=>e.onclick=safe(async()=>{
  let target;try{target=OracleMarkdown.resolveWiki(e.dataset.wiki,sourcePath,visibleEntries());}
  catch(error){openSearch(e.dataset.wiki.split('#')[0]);toast(error.message);return;}
  if(await openNote(target.path))scrollMarkdownFragment(target.fragment);
 }));
}

$('#modal').addEventListener('close',()=>atlasController?.setPaused(document.hidden||window.oracleWindowVisible===false||view!=='map'||visualPaused));

function visibleEntries(){return replayProjection||state.entries}
function timelineEvents(){return replay&&replaySession?.kind==='journal'?replaySession.events:state.events}

function setupContinuation(){modal(`<h1>Continuar sua configuração</h1><p>O plano confirmado permanece disponível. A retomada verifica o que já existe e continua pelos recibos, sem criar outro plano.</p><div class="source">Plano ${esc(state.setup.plan_id)}</div>${actions('<button class="primary" id="resume-setup">Abrir retomada local</button>')}`);$('#resume-setup').onclick=()=>showSetup()}

async function reviewBridge(){
 const connected=state.codexPlugins?.status==='available';
 modal(`<h1>Codex e plugins</h1>${statusBadge(connected?'connected':'unverified',connected?'Conectado':'Conexão não verificada')}<p>A conexão é opcional para tarefas remotas. A instalação, consulta e edição locais permanecem disponíveis offline.</p>${actions('<button class="secondary" id="bridge-plugins">Ver plugins</button><button class="secondary" id="bridge-codex">Abrir Codex</button><button class="primary" id="bridge-connect">Conexão e modelo</button>')}`);
 $('#bridge-plugins').onclick=()=>plugin();$('#bridge-codex').onclick=safe(()=>call('openCodex'));$('#bridge-connect').onclick=()=>showSetup({fromSettings:true,connection:true});
}

// One search surface serves the launcher, collection navigation and wiki links.
function openSearch(initial='',scope={}){
 if(navigationBlocked())return;
 const prefix=/^(SISTEMA|INBOX|PROJETOS|AREAS|WIKI|FONTES)\//i.test(initial)?initial:'';
 const catalog=departmentCatalog(),department=catalog.departmentByID.get(scope.department);
 let selectedIndex=0,hits=[],page=0;
 modal(`<span class="step-label">MEU UNIVERSO</span><h1>Buscar notas e skills</h1>
 <label class="search search-field">${icon('search')}<input id="universe-query" type="search" autocomplete="off" spellcheck="false" aria-label="Buscar notas e skills" placeholder="Nome, assunto ou caminho…" value="${esc(prefix?'':initial)}" aria-controls="search-results"></label>
 ${prefix||department?`<button class="search-scope" id="clear-search-scope">${icon('folder')}${esc(department?.name||prefix)} ${icon('close')}</button>`:''}
 <div class="search-meta" id="search-count" role="status" aria-live="polite"></div>
 <div id="search-results" class="search-results" role="listbox" aria-label="Resultados da busca"></div>
 <nav id="search-pages" aria-label="Páginas de resultados"></nav>
 <div class="actions"><span class="keyboard-guide"><kbd>↑</kbd><kbd>↓</kbd> navegar <kbd>↵</kbd> abrir <kbd>esc</kbd> fechar</span></div>`,{family:'search',focus:'#universe-query'});
 const input=$('#universe-query');input.setAttribute('role','combobox');input.setAttribute('aria-expanded','true');input.setAttribute('aria-autocomplete','list');
 const select=()=>{const buttons=$$('#search-results [role=option]');buttons.forEach((b,i)=>{b.setAttribute('aria-selected',String(i===selectedIndex));b.classList.toggle('active',i===selectedIndex)});if(buttons[selectedIndex]){input.setAttribute('aria-activedescendant',buttons[selectedIndex].id);buttons[selectedIndex].scrollIntoView({block:'nearest'})}else input.removeAttribute('aria-activedescendant')};
 const open=safe(async index=>{const entry=hits[index];if(!entry)return;if(catalog.skillByPath.has(entry.path)){atlasController?.revealSkill(entry.path);renderInspector()}await openNote(entry.path)});
 const search=()=>{
  const terms=OracleDepartments.normalize(input.value).split(/\s+/).filter(Boolean);
  const all=state.entries.filter(e=>!e.directory&&(!prefix||e.path===prefix||e.path.startsWith(prefix+'/'))&&(!department||catalog.skillByPath.get(e.path)?.department===department.id)&&terms.every(t=>OracleDepartments.normalize(title(e)+' '+e.path+' '+entryLocation(e)+' '+(catalog.departmentByID.get(catalog.skillByPath.get(e.path)?.department)?.name||'')).includes(t)));
  all.sort((a,b)=>{const q=input.value.trim().toLowerCase();return Number(title(b).toLowerCase()===q)-Number(title(a).toLowerCase()===q)||title(a).localeCompare(title(b))});
  const pages=Math.max(1,Math.ceil(all.length/100));page=Math.min(page,pages-1);hits=all.slice(page*100,(page+1)*100);selectedIndex=0;
  $('#search-count').textContent=all.length?`${all.length} ${all.length===1?'resultado':'resultados'} · página ${page+1} de ${pages}`:'Nenhum resultado';
  $('#search-pages').innerHTML=pages>1?`<button class="secondary" id="search-previous" ${page===0?'disabled':''}>← Anterior</button><button class="secondary" id="search-next" ${page+1>=pages?'disabled':''}>Próxima →</button>`:'';
  $('#search-previous')?.addEventListener('click',()=>{page--;search();input.focus()});$('#search-next')?.addEventListener('click',()=>{page++;search();input.focus()});
  $('#search-results').innerHTML=hits.length?hits.map((e,i)=>`<button role="option" aria-selected="${i===0}" tabindex="-1" class="result" id="search-option-${i}" data-hit="${i}">${icon('note')}<div><strong>${esc(title(e))}</strong><small>${esc(entryLocation(e))}</small></div><span class="result-enter" aria-hidden="true">↵</span></button>`).join(''):`<div class="search-empty">${icon('search')}<h2>${input.value?'Não encontramos resultados.':'Seu universo ainda está vazio.'}</h2><p>${input.value?'Experimente outro nome ou parte do caminho.':'Conecte uma pasta nos ajustes para explorar notas e skills.'}</p></div>`;
  $$('[data-hit]').forEach(b=>{b.onclick=()=>open(Number(b.dataset.hit));b.onpointermove=()=>{selectedIndex=Number(b.dataset.hit);select()}});select();
 };
 input.oninput=()=>{page=0;search()};input.onkeydown=e=>{if(e.key==='ArrowDown'||e.key==='ArrowUp'){e.preventDefault();selectedIndex=Math.max(0,Math.min(hits.length-1,selectedIndex+(e.key==='ArrowDown'?1:-1)));select()}else if(e.key==='Enter'){e.preventDefault();open(selectedIndex)}};
 $('#clear-search-scope')?.addEventListener('click',()=>openSearch(input.value));search();
}

let tooltipTarget=null,tooltipTimer=null;
function hideTooltip(){clearTimeout(tooltipTimer);if(tooltipTarget){tooltipTarget.removeAttribute('aria-describedby');tooltipTarget=null}$('#tooltip').hidden=true}
function showTooltip(target,immediate=false){
 if(!target?.dataset.tooltip||target.disabled)return;hideTooltip();tooltipTarget=target;
 const reveal=()=>{if(!target.isConnected)return;const tooltip=$('#tooltip');tooltip.textContent=target.dataset.tooltip;tooltip.hidden=false;target.setAttribute('aria-describedby','tooltip');const r=target.getBoundingClientRect(),t=tooltip.getBoundingClientRect();tooltip.style.left=Math.max(12,Math.min(innerWidth-t.width-12,r.left+r.width/2-t.width/2))+'px';tooltip.style.top=(r.bottom+t.height+14>innerHeight?r.top-t.height-10:r.bottom+10)+'px'};
 if(immediate)reveal();else tooltipTimer=setTimeout(reveal,500);
}
// Tooltips live in the top layer when a modal is open, so dialog controls work too.
document.addEventListener('pointerover',e=>{const target=e.target.closest('[data-tooltip]');if(target&&target!==tooltipTarget)showTooltip(target)});
document.addEventListener('pointerout',e=>{if(tooltipTarget&&!tooltipTarget.contains(e.relatedTarget))hideTooltip()});
document.addEventListener('focusin',e=>{const target=e.target.closest('[data-tooltip]');if(target)showTooltip(target,true);else hideTooltip()});
document.addEventListener('pointerdown',hideTooltip);
// Keep logical focus for navigation, but distinguish pointer focus from keyboard focus.
document.documentElement.dataset.inputMode='keyboard';
function setInputMode(mode){if(document.documentElement.dataset.inputMode===mode)return;document.documentElement.dataset.inputMode=mode;if(atlasController)atlasController.universe?.sync(atlasController)}
document.addEventListener('pointerdown',()=>setInputMode('pointer'),true);
document.addEventListener('keydown',e=>{if(!['Shift','Control','Alt','Meta'].includes(e.key))setInputMode('keyboard')},true);
// WebKit on macOS does not focus every clicked control by default. Keep the
// native app's modal origin and keyboard controls consistent with the browser.
document.addEventListener('click',e=>{const control=e.target.closest('button,input[type=range],summary');if(control&&!control.disabled)control.focus({preventScroll:true})},true);
document.addEventListener('keydown',e=>{
 if(document.querySelector('.ob-dialog[open]')||$('#app').inert)return;
 if(e.key==='Escape'){hideTooltip();if(!e.defaultPrevented&&!document.querySelector('dialog[open]')&&view==='map'&&(atlasController?.selected||atlasController?.knowledge||atlasController?.department)){e.preventDefault();atlasController.back();}}
 if((e.metaKey||e.ctrlKey)&&e.key.toLowerCase()==='k'){e.preventDefault();if(!modalDirty)openSearch();}
 if(e.metaKey&&e.key===','){e.preventDefault();if(!modalDirty)settings();}
});

let updatePolling=null,updateBusy=false;
const updateNames={gbrain:'GBrain oficial',cognee:'Integração não adotada',skills:'Skills'};
const updateStates={not_checked:'Não verificado',configured:'Disponível',current:'Em dia',updated:'Atualizado',available:'Atualização disponível',external:'Instalação existente',compatibility_required:'Aguardando validação',not_adopted:'Não adotado',not_configured:'Fonte não configurada',offline:'Sem conexão',error:'Consulta não concluída',preserved_edits:'Personalizações preservadas',rolled_back:'Restaurado'};
function reflectUpdateStatus(status){
 updateBusy=!!status.busy;$('#updates').classList.toggle('busy',updateBusy);
 const pending=!!status.knownUpdate||!!status.available;
 const age=Date.now()-Date.parse(status.checkedAt||status.at||'');
 const recent=Number.isFinite(age)&&age>=-300000&&age<86400000;
 $('#updates').classList.toggle('available',pending);
 $('#updates').classList.toggle('stale',pending&&!recent);
 const label=updateBusy?(pending?'Atualizações — verificando; atualização conhecida':'Atualizações — verificando'):
  pending?(recent?'Atualizações — atualização disponível':'Atualizações — atualização conhecida; verificar novamente'):'Atualizações';
 $('#updates').setAttribute('aria-label',label);$('#updates').dataset.tooltip=label;
}
let automaticUpdateAttempt=0,automaticUpdateFailures=0;
function maybeAutomaticUpdateCheck(status){
 if(window.ORACLE_PREVIEW||state.config?.fixture||document.hidden||window.oracleWindowVisible===false||!$('#lock-screen').hidden||$('#modal').open||updateBusy||status.busy)return;
 const onboarding=window.OracleOnboarding?.getState?.();
 if(!onboarding||!onboarding.hasVault||(!onboarding.legacyAccess&&onboarding.status!=='completed')||(!onboarding.licensed&&!onboarding.legacyAccess)||['starting','running','cancelling','waiting_user'].includes(onboarding.status))return;
 const now=Date.now(),checked=Date.parse(status.checkedAt||(status.phase==='complete'?status.at:'')||'');
 const hasError=status.phase==='failed'||status.results?.some(r=>r.status==='error');
 if(!hasError&&Number.isFinite(checked)&&now-checked>=0&&now-checked<6*3600000)return;
 const delay=Math.min(3600000,300000*2**Math.min(automaticUpdateFailures,4));
 if(automaticUpdateAttempt&&now-automaticUpdateAttempt<delay)return;
 automaticUpdateAttempt=now;updateBusy=true;
 call('updateStart',{operation:'check-only'}).then(()=>pollAutomaticUpdateStatus(0)).catch(()=>{automaticUpdateFailures++;updateBusy=false});
}
async function pollAutomaticUpdateStatus(attempt){
 try{
  const status=await call('updateStatus');reflectUpdateStatus(status);
  if(status.busy){if(attempt<600)setTimeout(()=>pollAutomaticUpdateStatus(attempt+1),1000);else{automaticUpdateFailures++;updateBusy=false}return}
  automaticUpdateFailures=(status.phase==='failed'||status.results?.some(r=>r.status==='error'))?automaticUpdateFailures+1:0;
 }catch(error){automaticUpdateFailures++;updateBusy=false;$('#updates').classList.remove('busy')}
}
function updateResultRows(status){
 const displayed=new Map((status.pendingUpdates||[]).map(row=>[row.id,row]));
 for(const row of status.results||[]){
  const known=displayed.get(row.id);
  displayed.set(row.id,known&&['offline','error','not_checked'].includes(row.status)?{...known,...row,pendingUpdate:known}:row);
 }
 return (displayed.size?[...displayed.values()]:[{id:'gbrain',status:'not_checked',version:status.gbrain_version},{id:'skills',status:'not_checked'}]).filter(row=>row.status!=='not_adopted');
}
async function showUpdates(operation=null){
 if(operation===true)operation='check-apply';if(operation===false)operation=null;
 if(operation){await call('updateStart',{operation});updateBusy=true}
 modal(`<h1>Atualizações</h1><p>Verifica as fontes e instala atualizações compatíveis, preservando suas personalizações.</p><div class="update-status" role="status" aria-live="polite"><span id="update-message">Consultando atualizações…</span><progress id="update-progress" aria-label="Progresso das atualizações"></progress></div><div id="update-results" class="update-results"></div><div id="update-recovery" class="recovery-actions"></div>${actions('<button class="primary" id="check-updates">Verificar</button><button class="secondary" id="apply-updates" hidden>Instalar atualização</button>')}`,{family:'updates'});
 const revision=modalRevision;
 $('#check-updates').onclick=safe(()=>showUpdates('check-apply'));$('#apply-updates').onclick=safe(()=>showUpdates('check-apply'));
 const poll=async()=>{
  try{
   const status=await call('updateStatus');reflectUpdateStatus(status);
   if($('#modal').open&&modalRevision===revision){
    $('#update-message').textContent=updateBusy?'Verificando e preparando…':status.phase==='interrupted'?'A atualização foi interrompida. Você pode tentar novamente.':status.available?'Há uma atualização pronta para instalar.':status.knownUpdate?'Há uma versão nova aguardando compatibilidade.':status.phase==='complete'?'Verificação concluída.':'Confira se há novidades para seu Oracle.';
    const progress=$('#update-progress');progress.hidden=!updateBusy;if(status.total>0){progress.max=status.total;progress.value=status.completed||0}else progress.removeAttribute('value');
    $('#check-updates').disabled=updateBusy;$('#apply-updates').hidden=!status.available;$('#apply-updates').disabled=updateBusy;
    const results=updateResultRows(status);
    const descriptions={current:'Você já está usando a versão aprovada disponível.',updated:'A atualização foi instalada.',available:'Pronta para instalar.',external:'Gerenciada na instalação que você conectou.',compatibility_required:'Esta versão ainda precisa ser validada para o Oracle.',not_configured:'Configure uma fonte aprovada antes de verificar o catálogo.',not_checked:'Use Verificar para consultar novidades.',preserved_edits:'Suas alterações foram mantidas.',offline:'Sem conexão para consultar a fonte. A versão instalada foi preservada.',error:'Não foi possível concluir a consulta; isso não significa ausência de atualizações.'};
    $('#update-results').innerHTML=results.map(r=>`<section class="update-result"><div>${icon(r.id==='skills'?'folder':'brain')}<h2>${updateNames[r.id]||esc(r.id)}</h2>${statusBadge(r.status,updateStates[r.status]||'Não verificado')}</div><p>${descriptions[r.status]||'Confira os detalhes abaixo.'}</p>${r.version?`<small>Versão ${esc(r.version)}</small>`:''}${r.pendingUpdate?`<p>Atualização conhecida${r.pendingUpdate.version?' · versão '+esc(r.pendingUpdate.version):''}. Aguardando nova verificação.</p>`:''}${r.message&&r.status!=='not_adopted'?`<details class="source-details"><summary>Detalhes</summary><p>${esc(r.message)}</p></details>`:''}</section>`).join('');
    $('#update-recovery').innerHTML=(status.gbrain_rollback?'<button class="secondary" data-rollback="rollback-gbrain">Restaurar Second Brain</button>':'')+(status.skills_rollback?'<button class="secondary" data-rollback="rollback-skills">Restaurar skills anteriores</button>':'');
    $$('[data-rollback]').forEach(b=>{b.disabled=updateBusy;b.onclick=safe(()=>showUpdates(b.dataset.rollback))});
   }
   if(updateBusy)updatePolling=setTimeout(poll,800);
  }catch(e){$('#updates').classList.remove('busy');if(modalRevision===revision)toast(e.message)}
 };
 clearTimeout(updatePolling);await poll();
}

// Panels expand from their own controls. The stage's ResizeObserver preserves camera scale.
let autoHiddenNavigation=false;
function toggleObservatory(open=!document.body.classList.contains('observatory-open')){
 if(open&&!document.body.classList.contains('observatory-open'))$('#observatory-plugins').open=false;
 if(open&&innerWidth<=1050&&!document.body.classList.contains('navigation-closed')){autoHiddenNavigation=true;toggleNavigation(false)}
 document.body.classList.toggle('observatory-open',open);$('#observatory-panel').hidden=!open;$('#observatory-toggle').setAttribute('aria-expanded',String(open));
 if(!open){if(autoHiddenNavigation){autoHiddenNavigation=false;toggleNavigation(true)}$('#observatory-toggle').focus({preventScroll:true})}
}
function toggleNavigation(open=document.body.classList.contains('navigation-closed')){
 document.body.classList.toggle('navigation-closed',!open);$('#navigation-toggle').setAttribute('aria-expanded',String(open));
 if(open&&innerWidth<=1050&&document.body.classList.contains('observatory-open'))toggleObservatory(false);
}
function toggleReplayPanel(open=$('#replay-panel').hidden){$('#replay-panel').hidden=!open;$('#replay-toggle').setAttribute('aria-expanded',String(open));if(!open)$('#replay-toggle').focus({preventScroll:true})}
$('#observatory-toggle').onclick=()=>toggleObservatory();$('#observatory-close').onclick=()=>toggleObservatory(false);
$('#navigation-toggle').onclick=()=>toggleNavigation();$('#replay-toggle').onclick=()=>toggleReplayPanel();
$('#replay-restart').onclick=safe(async()=>{live();await ensureReplay();atlasController.setFormation({progress:0,playing:true,duration:12000,rate:speed});renderPlayback()});
$('#atlas').addEventListener('oracle:formation',()=>{if(replay&&replaySession?.kind==='formation')renderPlayback()});
$('#plugins-refresh').onclick=safe(async()=>{await call('codexPluginsRefresh');await refresh()});
const systemVisual={reduceMotion:matchMedia('(prefers-reduced-motion: reduce)').matches,reduceTransparency:matchMedia('(prefers-reduced-transparency: reduce)').matches};
let visualPending={},visualWrites=Promise.resolve(),visualRevision=0;
function applyVisualPreferences(redraw=true){
 const saved=state.config.visualPreferences||{};
 for(const [key,id] of [['reduceMotion','motion'],['reduceTransparency','transparency'],['economy','economy']]){
  const control=$('#'+id),forced=systemVisual[key]===true;
  control.checked=forced||(visualPending[key]?.value??saved[key]??false);control.disabled=forced;
  control.title=forced?'Definido pelas opções de acessibilidade do macOS':'';
 }
 document.body.classList.toggle('reduced',$('#motion').checked);document.body.classList.toggle('reduce-transparency',$('#transparency').checked);
 if(redraw&&atlasController)renderAtlas();
}
async function saveVisualPreference(key,value){
 const epoch=memoryEpoch,revision=++visualRevision;visualPending[key]={value:!!value,revision};applyVisualPreferences();
 const task=visualWrites.catch(()=>{}).then(async()=>{
  if(epoch!==memoryEpoch)throw Error('Preferência cancelada após bloqueio.');
  if(window.ORACLE_PREVIEW)return {...state.config.visualPreferences,[key]:!!value};
  return call('saveVisualPreferences',{[key]:!!value});
 });visualWrites=task;
 try{const saved=await task;if(epoch===memoryEpoch){state.config.visualPreferences={...state.config.visualPreferences,...saved};}}
 finally{if(epoch===memoryEpoch&&visualPending[key]?.revision===revision){delete visualPending[key];applyVisualPreferences();}}
}
function applyAccessibility(value={}){
 for(const key of ['reduceMotion','reduceTransparency'])if(typeof value[key]==='boolean')systemVisual[key]=value[key];
 applyVisualPreferences();
}
function buildDescription(){const b=state.build||{};return `Oracle ${b.version||'versão não registrada'} · ${b.channel||'canal não registrado'} · commit ${String(b.commit||'não registrado').slice(0,12)}${b.dirty?' · alterações locais':''} · build ${b.buildID||'não registrado'}`;}
window.oracleAccessibility=applyAccessibility;
$('#transparency').checked=matchMedia('(prefers-reduced-transparency: reduce)').matches;
$('#transparency').onchange=safe(()=>saveVisualPreference('reduceTransparency',$('#transparency').checked));
for(const [key,query] of [['reduceMotion','(prefers-reduced-motion: reduce)'],['reduceTransparency','(prefers-reduced-transparency: reduce)']])matchMedia(query).addEventListener('change',event=>applyAccessibility({[key]:event.matches}));
if(innerWidth<=1050)toggleNavigation(false);
document.addEventListener('keydown',e=>{if(e.key==='Escape'&&!$('#modal').open){if(!$('#replay-panel').hidden)toggleReplayPanel(false);else if(document.body.classList.contains('observatory-open'))toggleObservatory(false)}});
document.addEventListener('pointerdown',e=>{if(!$('#replay-panel').hidden&&!e.target.closest('#replay-panel,#replay-toggle')&&!$('#modal').open)toggleReplayPanel(false)});

window.oracleTakeDraftAndLock=()=>{const editor=editorSession&&modalDirty?{path:editorSession.path,hash:editorSession.hash,text:editorSession.text,vault:state.config.vault}:null;const onboarding=window.OracleOnboarding?.pendingDraft?.()||null;window.oracleLock();return {editor,onboarding};};

window.addEventListener('oracle:onboarding-progress',event=>{
 if(!$('#lock-screen').hidden)return;
 state.onboarding={...state.onboarding,...event.detail};
 if(!replay)renderAtlas();
});

// Includes the onboarding dialog. Opening a modal pauses visual time, never the executor.
function syncFloatingSurfaces(){
 const anyModal=!!document.querySelector('dialog[open]');
 const installationCard=document.querySelector('.ob-progress-card');
 document.body.classList.toggle('has-installation-progress',!!installationCard&&!installationCard.hidden);
 atlasController?.setPaused(document.hidden||window.oracleWindowVisible===false||view!=='map'||visualPaused||anyModal);
}
const floatingSurfaceObserver=new MutationObserver(records=>{if(records.some(r=>r.target instanceof Element&&(r.target.matches('dialog,.ob-progress-card')||r.type==='childList'&&[...r.addedNodes].some(n=>n instanceof Element&&n.matches('.oracle-onboarding')))))syncFloatingSurfaces()});
floatingSurfaceObserver.observe(document.body,{subtree:true,attributes:true,attributeFilter:['open','hidden'],childList:true});

async function backupSettings(){
 const value=await call('backupStatus'),last=value.lastRun||{},id=last.id||last.backup_id;
 const verified=last.complete===true&&last.integrity_verified===true;
 modal(`<h1>Backup privado do banco</h1><p>Cópia local do banco GBrain, sem envio remoto. Não inclui Markdown, anexos ou todo o aplicativo. No mesmo disco, não protege contra perda física. Os arquivos são privados, mas não têm criptografia própria.</p><label class="ob-check"><input type="checkbox" id="backup-enabled" ${value.enabled?'checked':''} ${!value.available?'disabled':''}>Autorizar backup privado para este vault</label><p>Consentimento separado da manutenção, captura e processamento remoto. Quando autorizado, a manutenção cria o backup depois da sincronização. Você também pode criar uma cópia manual.</p>${!value.available?'<p role="alert">Configure o perfil local Oracle e autorize seu acesso antes de habilitar backups. Instalações externas são preservadas.</p>':''}<dl class="ob-review"><dt>Última operação verificada</dt><dd>${verified?(last.restore_verified?'Restauração de teste verificada, sem ativação':'Integridade verificada; restauração ainda não testada'):'Nenhuma operação confirmada'}</dd><dt>Identificador</dt><dd>${esc(id||'Nenhum')}</dd></dl><p>A verificação de integridade não prova uma restauração. Restaurar para teste exige confirmação e cria um estado novo, sem substituir ou ativar o banco atual.</p>${actions('<button class="secondary" id="backup-save">Salvar consentimento</button><button class="primary" id="backup-create" '+(!value.enabled?'disabled':'')+'>Criar backup</button><button class="secondary" id="backup-verify" '+(!value.available||!id?'disabled':'')+'>Verificar integridade</button><button class="secondary" id="backup-restore" '+(!value.available||!id?'disabled':'')+'>Testar restauração…</button>')}`,{key:'backup-settings'});
 $('#backup-save').onclick=safe(async()=>{await call('configureBackup',{enabled:$('#backup-enabled').checked});await backupSettings()});
 $('#backup-create').onclick=safe(async()=>{await call('backupCreate');await backupSettings();toast('Backup criado e integridade verificada. A restauração ainda não foi testada.')});
 $('#backup-verify').onclick=safe(async()=>{await call('backupVerify',{id});await backupSettings();toast('Integridade verificada. Isso não confirma uma restauração.')});
 $('#backup-restore').onclick=()=>{
  modal(`<h1>Testar restauração?</h1><p>O backup ${esc(id)} será restaurado somente em um estado privado novo. O banco ativo e os documentos do vault não serão substituídos. Esta operação não ativa o estado restaurado.</p>${actions('<button class="secondary" id="backup-restore-cancel">Voltar</button><button class="primary" id="backup-restore-confirm">Confirmar restauração de teste</button>')}`);
  $('#backup-restore-cancel').onclick=safe(backupSettings);
  $('#backup-restore-confirm').onclick=safe(async()=>{await call('backupRestore',{id,confirmed:true});await backupSettings();toast('Restauração de teste verificada em estado novo. O banco ativo foi preservado.')});
 };
}
