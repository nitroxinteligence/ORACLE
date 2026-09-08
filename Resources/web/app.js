'use strict';
const $=s=>document.querySelector(s), $$=s=>[...document.querySelectorAll(s)];
const paths={lock:'M6 10h12v11H6z M8 10V6a4 4 0 0 1 8 0v4 M12 14v3',folder:'M3 6h6l2 2h10v12H3z M3 6V4h6l2 2h10v2',note:'M6 3h8l4 4v14H6z M14 3v5h4 M9 12h6 M9 15h6 M9 18h5',search:'M16 16l5 5 M18 10a8 8 0 1 1-16 0 8 8 0 0 1 16 0',code:'M8 6l-6 6 6 6 M16 6l6 6-6 6 M14 3l-4 18',megaphone:'M3 9v6h5l12 5V4L8 9z M8 15l2 6h3l-2-5',shield:'M12 2l9 4v6c0 5-6 9-9 10-3-1-9-5-9-10V6z M8 12l3 3 5-6',chart:'M3 21h19 M5 18v-5h3v5 M11 18V9h3v9 M17 18V4h3v14 M4 9l7-5 4 1 6-4',person:'M17 7a5 5 0 1 1-10 0 5 5 0 0 1 10 0 M3 22v-3a9 9 0 0 1 18 0v3z',chat:'M3 3h18v14H9l-6 4z M7 8h10 M7 12h7',book:'M5 3h15v19H5a2 2 0 0 1 0-4h15 M5 3a2 2 0 0 0-2 2v15 M8 7h8 M8 11h6',tool:'M14 3a6 6 0 0 0-7 8l-5 7 4 4 7-7a6 6 0 0 0 8-7l-5 4-4-4z',mail:'M2 5h20v15H2z M2 5l10 8L22 5',brain:'M8 3a4 4 0 0 0-4 6 5 5 0 0 0 0 8 4 4 0 0 0 8 3V5a3 3 0 0 0-4-2 M16 3a4 4 0 0 1 4 6 5 5 0 0 1 0 8 4 4 0 0 1-8 3 M5 10l3 2 M19 10l-3 2',sliders:'M2 5h7 M15 5h7 M2 12h12 M20 12h2 M2 19h3 M11 19h11 M9 2v6h6V2z M14 9v6h6V9z M5 16v6h6v-6z'};
Object.assign(paths,{sidebar:'M3 4h18v16H3z M9 4v16',history:'M3 11a9 9 0 1 1 2 7 M3 4v7h7 M12 7v5l3 2',observatory:'M3 12s3-7 9-7 9 7 9 7-3 7-9 7-9-7-9-7 M15 12a3 3 0 1 1-6 0 3 3 0 0 1 6 0',minimize:'M5 12h14',play:'M8 5l12 7-12 7Z',pause:'M8 5v14 M16 5v14',refresh:'M20 7a9 9 0 1 0 1 8 M20 2v6h-6',live:'M12 8v8 M8 12h8 M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0',fit:'M8 3H3v5 M16 3h5v5 M3 16v5h5 M21 16v5h-5 M8 12h8 M12 8v8',back:'M9 5l-6 6 6 6 M3 11h12a6 6 0 0 1 6 6',close:'M6 6l12 12 M18 6L6 18',chevron:'M9 5l7 7-7 7',check:'M5 12l4 4L19 6'});
function icon(name,cls=''){return `<svg class="${cls}" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="${paths[name]||paths.note}"/></svg>`}
function esc(v){return String(v??'').replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]))}
$$('[data-icon]').forEach(e=>e.outerHTML=icon(e.dataset.icon));$('#settings').innerHTML=icon('sliders');$('#lock').innerHTML=icon('lock');
const pending=new Map();let requestID=0;
function call(method,params={}){return new Promise((resolve,reject)=>{if(!window.webkit?.messageHandlers.oracle){reject(Error('O aplicativo macOS é necessário. Este arquivo não é um app web.'));return}const id=String(++requestID);pending.set(id,{resolve,reject});window.webkit.messageHandlers.oracle.postMessage({id,method,params})})}
window.oracleReply=(id,res)=>{const p=pending.get(id);if(!p)return;pending.delete(id);res.error?p.reject(Error(res.error)):p.resolve(res.value)};
let state={entries:[],collections:[],events:[],config:{}},selected=null,view='map',query='',zoom=1,replay=false,cursor=0,timer=null,speed=1,readDocument=null,plan=null,onboarding={answers:{AGENT_NAME:'Oracle'},newVault:false,attach:false,catalogCollections:[]};
const colors=['#dba17c','#91b5ed','#7bc8b4','#d9c276','#b29bd7','#92c399','#d49cae'];
const positions=[[292,132],[564,130],[678,313],[164,310],[248,491],[600,485],[424,574]];
let modalOrigin=null, modalRevision=0, modalDirty=false, settingsTrail=false;
function toast(text){
 if(!$('#lock-screen').hidden)return;
 if($('#modal').open){let notice=$('.modal-notice');if(!notice){notice=document.createElement('div');notice.className='modal-notice';notice.setAttribute('role','alert');$('.modal-body').prepend(notice)}notice.textContent=text;return}
 $('#toast').textContent=text;$('#toast').hidden=false;clearTimeout(toast.timer);toast.timer=setTimeout(()=>$('#toast').hidden=true,6000);
}
function safe(fn){return async(...a)=>{const button=a[0]?.currentTarget instanceof HTMLButtonElement?a[0].currentTarget:null;if(button)button.disabled=true;try{return await fn(...a)}catch(e){toast(e.message)}finally{if(button?.isConnected)button.disabled=false}}}
function modal(html,options={}){
 if(!$('#lock-screen').hidden)return;
 const dialog=$('#modal'), content=$('#modal-content');
 if(!dialog.open)modalOrigin=document.activeElement;
 modalRevision++;modalDirty=false;hideTooltip();atlasController?.setPaused(true);
 const template=document.createElement('template');template.innerHTML=html;
 const heading=template.content.querySelector('h1')||document.createElement('h1');heading.id='modal-title';heading.tabIndex=-1;
 template.content.querySelectorAll('.step-label').forEach(e=>e.remove());
 const footers=[...template.content.children].filter(e=>e.classList.contains('actions'));const footer=footers.at(-1)||document.createElement('div');footer.className='modal-footer';
 // One shared close control; intermediate action groups stay in the scrollable body.
 footer.querySelectorAll('[data-close]').forEach(e=>e.remove());
 const head=document.createElement('div');head.className='modal-header';const titles=document.createElement('div');if(settingsTrail){const crumb=document.createElement('nav');crumb.className='modal-breadcrumb';crumb.setAttribute('aria-label','Navegação dos ajustes');crumb.innerHTML='<button id=modal-back>'+icon('back')+(heading.textContent==='Ajustes do Oracle'?' Voltar':' Ajustes')+'</button>'+(heading.textContent==='Ajustes do Oracle'?'':'<span> / '+esc(heading.textContent)+'</span>');titles.append(crumb)}titles.append(heading);head.append(titles);
 const close=document.createElement('button');close.className='icon-button modal-close';close.dataset.close='';close.setAttribute('aria-label','Fechar janela');close.dataset.tooltip='Fechar · Esc';close.innerHTML=icon('close');head.append(close);
 footer.remove();const body=document.createElement('div');body.className='modal-body';body.append(template.content);
 if(!footer.children.length){const done=document.createElement('button');done.className='secondary';done.dataset.close='';done.textContent='Concluído';footer.append(done)}
 content.replaceChildren(head,body,footer);$('#modal-back')?.addEventListener('click',()=>{if(modalDirty){closeModal();return}if(heading.textContent==='Ajustes do Oracle')closeModal();else settings()});dialog.dataset.family=options.family||(body.querySelector('.editor')?'editor':body.querySelector('.markdown-reader')?'reader':'standard');
 dialog.append($('#tooltip'));if(!dialog.open)dialog.showModal();
 const focus=options.focus?content.querySelector(options.focus):body.querySelector('input:not([type=checkbox]),textarea,select');(focus||heading).focus({preventScroll:true});
}
function closeModal(force=false){
 if(modalDirty&&!force){requestEditorExit();return}
 $('#modal').close();
}
function actions(extra=''){return `<div class="actions"><button class="secondary" data-close>Concluído</button>${extra}</div>`}
let backdropDown=false;$('#modal').addEventListener('pointerdown',e=>{backdropDown=e.target===$('#modal')});
$('#modal').addEventListener('click',e=>{if(e.target.closest('[data-close]')||(e.target===$('#modal')&&backdropDown))closeModal();backdropDown=false});
$('#modal').addEventListener('keydown',e=>{if(e.key==='Escape'){e.preventDefault();e.stopPropagation();closeModal()}});
$('#modal').addEventListener('cancel',e=>{e.preventDefault();closeModal()});
$('#modal').addEventListener('close',()=>{document.body.append($('#tooltip'));modalRevision++;modalDirty=false;settingsTrail=false;hideTooltip();const origin=modalOrigin;modalOrigin=null;if(origin?.isConnected&&!$('#app').inert)origin.focus({preventScroll:true});atlasController?.setPaused(document.hidden||window.oracleWindowVisible===false||view!=='map'||visualPaused)});
function skills(id){return visibleEntries().filter(e=>!e.directory&&e.path.startsWith(`SISTEMA/skills/${id}/`)&&e.name==='SKILL.md')}
function title(e){return e.name==='SKILL.md'?e.path.split('/').slice(-2,-1)[0]:e.name.replace(/\.md$/,'')}
async function refresh(){state=await call('snapshot');render();if(!updateBusy)call('updateStatus').then(reflectUpdateStatus).catch(()=>{});if(state.scanError)toast(state.scanError)}
function render(){
 renderTree();renderAtlas();renderResults();renderProgress();renderInspector();renderPlugins();
 $('#footer-status').textContent=state.scanError?'Fonte indisponível · consulte os ajustes':'';
 $('#codex-status').textContent=state.codexPlugins?.status==='available'?'Conectado':state.events.some(e=>e.source==='codex-hook')?'Atividade recente':'Conexão não verificada';
 $('#gbrain-status').textContent=state.config.gbrainWorkspace?'Fonte selecionada':'Conectar nos ajustes';
 renderPlayback();
}
function renderTree(){
 const opened=new Set($$('#tree details[open]>summary').map(e=>e.dataset.folder||e.dataset.collection));
 const childrenByParent=new Map();for(const e of visibleEntries()){const parent=e.path.split('/').slice(0,-1).join('/');if(!childrenByParent.has(parent))childrenByParent.set(parent,[]);childrenByParent.get(parent).push(e)};const folder=(path,label,open=false)=>{const children=(childrenByParent.get(path)||[]).filter(e=>path!=='SISTEMA'||e.name!=='skills');return `<details ${open||opened.has(path)?'open':''}><summary data-folder="${esc(path)}">${icon('folder')}${esc(label||path.split('/').at(-1))}</summary><div>${children.slice(0,30).map(e=>e.directory?folder(e.path,e.name):`<button class="leaf" data-path="${esc(e.path)}">${icon('note')}<span>${esc(e.name.replace('.md',''))}</span></button>`).join('')}${children.length>30?`<button data-prefix="${esc(path)}">Ver todos →</button>`:''}</div></details>`};
 const roots=new Set(visibleEntries().filter(e=>e.directory&&!e.path.includes('/')).map(e=>e.path));
 let html=roots.has('INBOX')?folder('INBOX','Inbox',false):'';
 if(roots.has('PROJETOS'))html+=folder('PROJETOS','Projetos');
 const knowledge=['AREAS','WIKI','FONTES'].filter(x=>roots.has(x));if(knowledge.length)html+=`<details><summary>${icon('folder')}Conhecimento</summary><div>${knowledge.map(p=>folder(p,p==='AREAS'?'Áreas':p==='WIKI'?'Wiki':'Fontes')).join('')}</div></details>`;
 html+=`<div class="tree-section-label">Especialistas</div>`+state.collections.map((c,i)=>`<details ${selected===c.id||opened.has(c.id)?'open':''}><summary data-collection="${c.id}">${icon('folder')}<i class="collection-dot" style="background:${colors[i]}"></i>${esc(c.name)}<span class="count">${skills(c.id).length}</span></summary><div>${skills(c.id).filter(e=>!query||title(e).toLowerCase().includes(query)).slice(0,9).map(e=>`<button class="leaf" data-path="${esc(e.path)}">${icon('note')}${esc(title(e).replace(/-/g,' '))}</button>`).join('')}${skills(c.id).length>9?`<button data-prefix="SISTEMA/skills/${c.id}">Ver todas →</button>`:''}${!skills(c.id).length?'<small class="empty-collection">Nenhuma skill nesta fonte</small>':''}</div></details>`).join('');
 const extraRoots=[...roots].filter(p=>!['INBOX','PROJETOS','AREAS','WIKI','FONTES'].includes(p)&&!(p==='SISTEMA'&&!(childrenByParent.get(p)||[]).some(e=>e.name!=='skills')));if(extraRoots.length)html+='<div class="tree-section-label">Pastas</div>'+extraRoots.map(p=>folder(p)).join('');
 html+=(childrenByParent.get('')||[]).filter(e=>!e.directory).map(e=>`<button class="leaf" data-path="${esc(e.path)}">${icon('note')}${esc(title(e))}</button>`).join('');
 if(!state.config.vault)html='<p class="empty">Seu conhecimento, no seu espaço.<button class="primary" data-connect>Conectar vault</button></p>'+html;
 $('#tree').innerHTML=html;$('#tree').querySelectorAll('[data-collection]').forEach(e=>e.onclick=()=>{selected=e.dataset.collection;selectedSkill=null;renderAtlas();renderInspector()});bindPaths($('#tree'));$('#tree').querySelector('[data-connect]')?.addEventListener('click',()=>showSetup(0));$('#tree').querySelectorAll('[data-prefix]').forEach(e=>e.onclick=()=>{openSearch(e.dataset.prefix)});
}
function bindPaths(container){container.querySelectorAll('[data-path]').forEach(e=>e.onclick=safe(()=>{const entry=visibleEntries().find(n=>n.path===e.dataset.path);if(entry?.directory){openSearch(entry.path)}else return openNote(e.dataset.path)}))}
let atlasController=null, selectedSkill=null, visualPaused=false,replaySession=null,replayProjection=null;
function renderAtlas(){
 if(!atlasController){atlasController=new OracleAtlas($('#atlas'),{onSelect:(id,leaf)=>{selected=id;selectedSkill=leaf;renderInspector()},onPlugin:id=>plugin(id),onOpen:safe(openNote),onLayout:safe(async layout=>{if(replay)return;await call('saveLayout',{layout});state.config.layout=structuredClone(layout)}),onZoom:value=>{$('#zoom-label').textContent=Math.round(value*100)+'%'}})}
 atlasController.update({collections:replay&&replaySession?.kind==='formation'?replaySession.collections:state.collections,entries:replay&&replaySession?.kind==='formation'?replaySession.entries:visibleEntries(),plugins:state.codexPlugins?.plugins||[],selected,selectedLeaf:selectedSkill,detail:Number($('#density').value),events:replay?timelineEvents().slice(0,cursor+1):state.events,replay,reduced:$('#motion').checked,economy:$('#economy').checked,layout:state.config.layout,formation:undefined,hidden:view!=='map'||window.oracleWindowVisible===false,paused:visualPaused||$('#modal').open});
}
function setView(next){view=next;$$('[data-view]').forEach(b=>b.classList.toggle('active',b.dataset.view===view));$('#atlas').hidden=view!=='map';$('#results').hidden=view==='map';$('.map-tools').hidden=view!=='map';renderResults();atlasController?.setPaused(view!=='map'||document.hidden)}
function renderResults(){if(view==='map')return;let entries=visibleEntries().filter(e=>(view==='folders'||!e.directory)&&(!query||(e.path+' '+title(e)).toLowerCase().includes(query)));$('#results').innerHTML=`<h2>${view==='list'?'Documentos':'Pastas e documentos'} <small>${entries.length} resultados · fonte local</small></h2>`+(entries.length?entries.slice(0,300).map(e=>`<button class="result" data-path="${esc(e.path)}">${icon(e.directory?'folder':'note')}<div><strong>${esc(title(e))}</strong><small>${esc(e.path)}</small></div></button>`).join('')+(entries.length>300?'<p class="empty">Mostrando 300 resultados. Refine a busca.</p>':''):'<p class="empty">Nenhum resultado nesta pasta e filtro.</p>');bindPaths($('#results'))}
const collectionDescriptions={ads:'Estratégia, criação e análise de campanhas.',code:'Procedimentos para projetar, construir e revisar software.',contents:'Seu espaço para procedimentos de conteúdo.','customer-finder':'Pesquisa e descoberta de potenciais clientes.','cyber-security':'Conhecimento e procedimentos de segurança.',marketing:'Pesquisa, posicionamento e crescimento.','personal-branding':'Seu espaço para identidade e marca pessoal.'};
function renderInspector(){
 if(selectedSkill){renderSkillInspector();return}
 const c=state.collections.find(c=>c.id===selected);
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
let editorSession=null,draftTimer=null;
async function persistEditorDraft(){
 clearTimeout(draftTimer);
 const session=editorSession;if(!session||!modalDirty)return;
 const revision=session.revision;
 const saved=await call('saveDraft',{path:session.path,hash:session.hash,text:session.text});
 if(editorSession===session&&revision===session.revision){session.saved=true;const status=$('#draft-status');if(status)status.textContent='Rascunho guardado neste Mac'}
 return saved;
}
async function openNote(path){
 const revision=modalRevision,document=await call('read',{path});if(revision!==modalRevision)return;
 readDocument={...document,relative:path};editorSession=null;
 const name=path.endsWith('/SKILL.md')?path.split('/').at(-2).replace(/-/g,' '):path.split('/').at(-1).replace(/\.md$/i,'');
 modal(`<h1>${esc(name)}</h1>${document.draft&&document.draft.text!==document.text?'<div class="editor-recovery"><p>Há um rascunho que ainda não foi salvo no documento.</p><button class="secondary" id="recover-draft">Retomar</button></div>':''}<article class="markdown-reader">${markdown(document.text)}</article><details class="source-details"><summary>Detalhes do arquivo</summary><div class="source">${esc(document.path)}<br>SHA-256 ${document.hash}</div></details>${actions(`<button class="secondary" id="reveal-note">Mostrar no Finder</button>${document.editable!==false?'<button class="primary" id="edit-note">Editar</button>':''}`)}`,{family:'reader'});
 bindMarkdown($('#modal-content'));$('#reveal-note').onclick=safe(()=>call('reveal',{path}));$('#edit-note')?.addEventListener('click',()=>editNote());
 $('#recover-draft')?.addEventListener('click',()=>{editNote(document.draft.text,document.draft.originalHash);if(document.draft.originalHash!==document.hash)showEditorConflict(document)});
}
function editNote(draft=readDocument.text,baseHash=readDocument.hash){
 const current=editorSession;
 editorSession=current&&current.path===readDocument.relative?current:{path:readDocument.relative,hash:baseHash,base:readDocument.text,text:draft,revision:0,saved:false};
 const session=editorSession;session.text=draft;
 modal(`<h1>Editar ${esc(session.path.endsWith('/SKILL.md')?session.path.split('/').at(-2).replace(/-/g,' '):session.path.split('/').at(-1))}</h1><div class="editor-status"><span id="draft-status">${session.saved?'Rascunho guardado neste Mac':'O arquivo será salvo na sua pasta do Obsidian'}</span><button id="reload-note">Reler arquivo</button></div><div id="editor-conflict"></div><textarea class="editor" id="editor" aria-label="Conteúdo do documento" autocorrect="off" autocapitalize="off" spellcheck="false" writingsuggestions="false">${esc(draft)}</textarea>${actions('<button class="secondary" id="discard-edit">Descartar</button><button class="secondary" id="diff">Ver alterações</button><button class="primary" id="save-note">Salvar</button>')}`,{family:'editor',focus:'#editor'});
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
 const result=await call('saveNote',{path:session.path,hash:session.hash,text:session.text});
 if(editorSession!==session)return;
 if(result.status==='conflict'){if(!$('#editor'))editNote(session.text);showEditorConflict(result.current);return}
 clearTimeout(draftTimer);modalDirty=false;session.saved=true;
 await refresh();await openNote(session.path);toast('Salvo no Obsidian.');
}
function reviewEdit(session){
 const old=session.base.split('\n'),now=session.text.split('\n');let lines='';
 for(let i=0;i<Math.max(old.length,now.length);i++){if(old[i]===now[i])lines+='  '+esc(old[i]??'')+'\n';else{if(old[i]!==undefined)lines+=`<span class="diff-remove">− ${esc(old[i])}</span>\n`;if(now[i]!==undefined)lines+=`<span class="diff-add">+ ${esc(now[i])}</span>\n`}}
 modal(`<h1>Suas alterações</h1><p>Salvar atualiza o arquivo original na sua pasta do Obsidian.</p><pre>${lines}</pre>${actions('<button class="secondary" id="back-editor">Voltar ao editor</button><button class="primary" id="save-note">Salvar</button>')}`,{family:'editor'});
 modalDirty=session.text!==session.base;$('#back-editor').onclick=()=>editNote(session.text);$('#save-note').onclick=safe(saveEditor);
}
function requestEditorExit(discardOnly=false){
 if(!editorSession){closeModal(true);return}
 if(!modalDirty){closeModal(true);return}
 let notice=$('.editor-exit');if(notice){notice.querySelector('button')?.focus();return}
 notice=document.createElement('div');notice.className='editor-exit editor-recovery';notice.setAttribute('role','alert');
 notice.innerHTML=`<p>${discardOnly?'Descartar suas alterações?':'Há alterações que ainda não foram salvas no arquivo.'}</p><button class="secondary" id="keep-editing">Continuar editando</button>${discardOnly?'':'<button class="secondary" id="keep-draft-close">Guardar rascunho e fechar</button>'}<button class="secondary" id="confirm-discard">Descartar</button>`;
 $('.modal-body').prepend(notice);notice.scrollIntoView({block:'nearest'});
 $('#keep-editing').onclick=()=>{notice.remove();$('#editor')?.focus()};
 $('#keep-draft-close')?.addEventListener('click',safe(async()=>{await persistEditorDraft();closeModal(true);editorSession=null}));
 $('#confirm-discard').onclick=safe(async()=>{clearTimeout(draftTimer);await call('discardDraft',{path:editorSession.path});editorSession=null;closeModal(true)});
 $('#keep-editing').focus();
}
window.oraclePrepareToClose=async()=>{await persistEditorDraft();return true};
const fields=[['AGENT_NAME','Como seu agente deve se chamar?',64],['PRINCIPAL_NAME','Como devemos chamar você?',128],['AGENT_PURPOSE','Para que seu segundo cérebro deve servir?',2048],['AGENT_TOP_JOBS','Quais são suas 3 a 5 tarefas recorrentes, em ordem?',2048],['PRINCIPAL_CONTEXT','O que você faz, constrói, valoriza e como trabalha?',4096],['VOICE_REGISTER','Como o agente deve se comunicar? Inclua um exemplo.',1024]];
function captureFields(){$$('[data-answer]').forEach(e=>onboarding.answers[e.dataset.answer]=e.value)}
function showSetup(step){if(step===0){modal(`<span class="step-label">01 / CONECTAR SEU CONHECIMENTO</span><h1>Um lugar para o que você sabe.</h1><p>Oracle apresenta seu conhecimento. O Codex Desktop executa o trabalho de IA; o GBrain oficial organiza a memória. Escolha uma pasta existente ou crie uma pasta vazia no seletor do macOS.</p><div class="source">${esc(state.config.vault||'Nenhuma pasta selecionada')}</div><div class="actions"><button class="secondary" data-close>Agora não</button><button class="primary" id="choose-vault">Escolher pasta…</button></div><label class="check"><input type="checkbox" id="new-vault" ${onboarding.newVault?'checked':''}> Esta é uma pasta nova: criar a estrutura planejada</label><label class="check"><input type="checkbox" id="attach" ${onboarding.attach?'checked':''}> Já tenho GBrain: preservar identidade e conectar instalação existente</label><h2>Especialistas disponíveis</h2><p>Selecione coleções públicas para copiar ao vault. Arquivos existentes com conteúdo diferente são preservados.</p><div class="catalog-choices">${(state.catalog||[]).filter(c=>c.skill_count>0).map(c=>`<label class="check"><input type="checkbox" data-catalog="${c.id}" ${onboarding.catalogCollections.includes(c.id)?'checked':''}> ${esc(state.collections.find(x=>x.id===c.id)?.name||c.id)} <small>${c.skill_count} skills · ${esc(c.license)}</small></label>`).join('')||'<small>Catálogo não disponível neste preview.</small>'}</div><h2>Proteção de acesso</h2><p>Touch ID ou senha do macOS, pela janela segura do sistema. Não criptografa o vault.</p><button class="secondary" id="protect-access">Ativar proteção</button>${actions('<button class="primary" id="next">Continuar</button>')}`);$('#choose-vault').onclick=safe(async()=>{const p=await call('chooseVault');if(p){await refresh();showSetup(0)}});$('#protect-access').onclick=safe(async()=>{await call('protect');toast('Proteção ativada para as próximas aberturas')});$('#next').onclick=safe(async()=>{if(!state.config.vault)throw Error('Escolha uma pasta primeiro');onboarding.newVault=$('#new-vault').checked;onboarding.attach=$('#attach').checked;onboarding.catalogCollections=$$('[data-catalog]:checked').map(e=>e.dataset.catalog);if(onboarding.attach){await call('chooseGBrain');showSetup(4)}else showSetup(1)});return}
if(step<=3){const batch=step===1?fields.slice(0,4):step===2?fields.slice(4,5):fields.slice(5);modal(`<span class="step-label">02 / ENTREVISTA GBRAIN · LOTE ${step} DE 3</span><h1>${['','Seu propósito.','Seu contexto.','Sua voz.'][step]}</h1><p>Respostas literais. Os seis campos oficiais são obrigatórios; você revisará tudo antes de confirmar.</p>${batch.map(([key,label,max])=>`<label class="field">${label}<textarea data-answer="${key}" maxlength="${max}" rows="${max<200?1:3}">${esc(onboarding.answers[key]||'')}</textarea></label>`).join('')}${step===2?`<label class="field">Fuso horário (opcional)<input data-answer="PRINCIPAL_TIMEZONE" value="${esc(onboarding.answers.PRINCIPAL_TIMEZONE||Intl.DateTimeFormat().resolvedOptions().timeZone)}"></label>`:''}${actions('<button class="secondary" id="back">Voltar</button><button class="primary" id="next">Continuar</button>')}`);$('#back').onclick=()=>{captureFields();showSetup(step-1)};$('#next').onclick=safe(()=>{captureFields();if(batch.some(([key])=>!onboarding.answers[key]?.trim()))throw Error('Preencha os campos deste lote');showSetup(step+1)});return}
if(step===4){modal(`<span class="step-label">03 / REVISÃO EXATA</span><h1>Este é o Oracle que você quer?</h1><p>${onboarding.attach?'A identidade existente será preservada. A conexão GBrain ainda precisa de verificação oficial.':'Revise suas respostas. Alterações invalidam a confirmação anterior. O bootstrap oficial GBrain terá sua própria leitura e hash de confirmação.'}</p>${Object.entries(onboarding.answers).filter(([k])=>!onboarding.attach).map(([k,v])=>`<div class="review-field"><strong>${k}</strong><span>${esc(v)}</span></div>`).join('')}<div class="review-field"><strong>DESTINO</strong><span>${esc(state.config.vault)}</span></div><p>${onboarding.newVault?'Criar estrutura padrão: Inbox, Projetos, Áreas, Wiki, Fontes, Diário, Outputs, Arquivo e Sistema.':'Vault existente: nenhuma reorganização ou criação automática da estrutura padrão.'}</p><p>Coleções selecionadas: ${esc(onboarding.catalogCollections.join(', ')||'nenhuma')}. O catálogo local é descoberto pela pasta. A distribuição de novas skills depende de licença e de revisão; nenhuma skill é executada ao aparecer no mapa.</p>${actions('<button class="secondary" id="back">Editar</button><button class="primary" id="confirm-plan">Confirmar e preparar pedido</button>')}`);$('#back').onclick=()=>showSetup(0);$('#confirm-plan').onclick=safe(async()=>{plan=await call('plan',onboarding);await call('confirm',{hash:plan.plan_hash});showSetup(5)});return}
const revision=modalRevision;call('briefing').then(brief=>{if(revision!==modalRevision)return;modal(`<span class="step-label">04 / CONTINUAR NO CODEX</span><h1>O próximo passo acontece no Codex.</h1><p>Seu plano está preparado e confirmado. Copie o pedido e cole em uma tarefa do Codex Desktop. A instalação só aparece em andamento quando os scripts produzirem recibos.</p><pre>${esc(brief)}</pre><p>Hooks novos exigem revisão e confiança no próprio Codex. Oracle não altera essa confiança.</p>${actions('<button class="secondary" id="copy-request">Copiar pedido</button><button class="primary" id="open-codex">Abrir Codex</button>')}`);$('#copy-request').onclick=safe(async()=>{await call('copy',{text:brief});toast('Pedido copiado. Cole na tarefa do Codex.')});$('#open-codex').onclick=safe(()=>call('openCodex'))}).catch(e=>toast(e.message))}
const pluginStates={connected:'Conectado',installed:'Instalado',needs_auth:'Conectar conta',unavailable:'Indisponível'};
function pluginIcon(p){const url=p.iconDataURL;return url&&/^data:image\/(png|jpeg|webp|svg\+xml);base64,/.test(url)?`<span class="plugin-icon"><img src="${esc(url)}" alt=""></span>`:`<span class="plugin-icon plugin-monogram" aria-hidden="true">${esc(p.name.slice(0,2).toUpperCase())}</span>`}
function renderPlugins(){
 const inventory=state.codexPlugins;
 $('#plugin-list').innerHTML=inventory?.plugins?.length?inventory.plugins.map((p,i)=>`<button class="plugin-row" data-plugin-index="${i}">${pluginIcon(p)}<div><strong>${esc(p.name)}</strong><small>${pluginStates[p.status]||'Não verificado'}</small></div></button>`).join(''):`<small>${inventory?.status==='available'?'Nenhum plugin disponível.':'Conecte o Codex para ver seus plugins.'}</small>`;
 $$('#plugin-list [data-plugin-index]').forEach(b=>b.onclick=()=>plugin(inventory.plugins[Number(b.dataset.pluginIndex)].id));
}
function plugin(id){
 const inventory=state.codexPlugins,p=inventory?.plugins?.find(p=>p.id===id);
 modal(p?`<h1>${esc(p.name)}</h1><div class="plugin-row">${pluginIcon(p)}<span class="pill">${pluginStates[p.status]||'Não verificado'}</span></div><p>${p.status==='connected'?'As ferramentas deste plugin estão disponíveis no Codex.':'Gerencie a conexão e as permissões deste plugin no Codex.'}</p><details class="source-details"><summary>Detalhes da conexão</summary><pre>${esc(JSON.stringify({checkedAt:inventory.checkedAt,kind:p.kind,evidence:p.evidence},null,2))}</pre></details>${actions('<button class="primary" id="manage-plugin">Abrir Codex</button>')}`:`<h1>Plugins</h1><p>Conecte o Codex para acessar os plugins disponíveis na sua conta.</p><div id="modal-plugins"></div>${actions('<button class="primary" id="manage-plugin">Abrir Codex</button>')}`);
 if(!p&&inventory?.plugins?.length){$('#modal-plugins').innerHTML=inventory.plugins.map((p,i)=>`<button class="plugin-row" data-plugin="${i}">${pluginIcon(p)}<div><strong>${esc(p.name)}</strong><small>${pluginStates[p.status]}</small></div>${icon('chevron')}</button>`).join('');$$('[data-plugin]').forEach(b=>b.onclick=()=>plugin(inventory.plugins[Number(b.dataset.plugin)].id))}
 $('#manage-plugin').onclick=safe(()=>call('openCodex'));
}
async function conversations(){const revision=modalRevision;const items=await call('conversations');if(revision!==modalRevision)return;modal(`<span class="step-label">CONVERSAS / IMPORTAÇÃO DELIMITADA</span><h1>Conversas Codex</h1><p>Importe uma exportação de conversas para consultá-las aqui.</p><div id="conversation-list">${items.map((c,i)=>`<button class="result" data-conversation="${i}">${icon('chat')}<div><strong>${esc(c.title)}</strong><small>${esc(c.source)}</small></div></button>`).join('')||'<p class="empty">Nenhuma conversa importada.</p>'}</div>${actions('<button class="primary" id="import-conversations">Importar conversas…</button>')}`);$('#import-conversations').onclick=safe(async()=>{await call('importConversations');await conversations()});$$('[data-conversation]').forEach(e=>e.onclick=()=>{const c=items[Number(e.dataset.conversation)];modal(`<h1>${esc(c.title)}</h1><div class="source">${esc(c.source)} · conteúdo importado</div><pre>${esc(c.messages.map(m=>m.role.toUpperCase()+'\n'+m.text).join('\n\n'))}</pre>${actions()}`)})}
async function instructions(){const revision=modalRevision;const items=await call('instructions');if(revision!==modalRevision)return;modal(`<h1>Instruções dos projetos</h1><p>Consulte as instruções dos projetos que você conectou.</p>${items.map((e,i)=>`<button class="result" data-instruction="${i}">${icon('book')}<div><strong>${esc(e.path)}</strong><small>${esc(e.source.split('/').at(-1))}</small></div></button>`).join('')||'<p class="empty">Nenhuma raiz autorizada ou instrução encontrada.</p>'}${actions('<button class="primary" id="add-project">Autorizar projeto…</button>')}`);$('#add-project').onclick=safe(async()=>{await call('chooseProject');await instructions()});$$('[data-instruction]').forEach(e=>e.onclick=safe(async()=>{const doc=await call('readInstruction',items[Number(e.dataset.instruction)]);modal(`<h1>Instrução encontrada</h1><div class="source">${esc(doc.path)}</div><pre>${esc(doc.text)}</pre>${actions()}`)}))}
function activity(){modal(`<h1>Histórico técnico</h1><p>Hooks observam apenas caminhos suportados e confiados no Codex. Ferramentas hosted podem não emitir todos os eventos. Stop encerra um turno; silêncio não prova ociosidade, sucesso ou falha.</p><span class="pill">${state.events.filter(e=>e.source==='codex-hook').length} hooks recebidos</span><span class="pill">Sem observação total</span><pre>${esc(state.events.slice(-50).map(e=>`${e.received_at} · ${e.source}\n${e.event_type}: ${e.sanitized_summary}`).join('\n\n')||'Nenhum recibo recebido. A integração não foi comprovada nesta instalação.')}</pre>${actions('<button class="secondary" id="journal-replay">Reproduzir histórico</button>')}`);$('#journal-replay').onclick=safe(startJournal)}
function settings(){
 settingsTrail=true;
 const row=(id,name,description,ic='chevron')=>`<button class="setting-row" id="${id}"><span><strong>${name}</strong><small>${description}</small></span>${icon(ic)}</button>`;
 modal(`<h1>Ajustes do Oracle</h1>
 <section class="settings-section"><h2>Seu Oracle</h2><div class="setting-group">
 ${row('restart-setup','Configurar Oracle','Conta, conexões e pasta do Obsidian')}
 ${row('gbrain-memory','Consultar memória','Encontrar notas e suas conexões')}
 ${row('gbrain-connect','Conectar Second Brain','Usar uma instalação que você já possui')}
 ${row('gbrain-review','Revisar contexto','Conferir as informações sobre você')}
 </div></section>
 <section class="settings-section"><h2>Conexões e privacidade</h2><div class="setting-group">
 ${row('bridge-review','Codex e plugins','Ver e gerenciar suas conexões')}
 ${row('protect-settings','Bloqueio',state.config.protected?'Touch ID ou senha do Mac ativados':'Ativar Touch ID ou senha do Mac','lock')}
 ${row('revoke','Desconectar pastas','Interromper o acesso do Oracle aos documentos')}
 </div></section>
 <section class="settings-section"><h2>Aplicativo</h2><div class="setting-group">
 ${row('updates-settings','Atualizações','Verificar novidades e versões','refresh')}
 ${row('export-view','Exportar imagem','Salvar uma imagem do seu universo')}
 </div></section>
 <details class="source-details"><summary>Avançado</summary><div class="setting-group">
 ${row('graphics-diagnostics','Desempenho do mapa','Medidas desta janela')}
 ${row('activity-settings','Histórico técnico','Consultar registros de atividade')}
 </div><div class="source">${window.ORACLE_PREVIEW||state.config.fixture?'Ambiente de validação · dados sintéticos':'Instalação local'}<br>Pasta: ${esc(state.config.vault||'Não selecionada')}<br>Oracle 0.3.0 · distribuição de desenvolvimento</div></details>${actions()}`,{family:'settings'});
 $('#restart-setup').onclick=()=>{if(window.OracleOnboarding){closeModal();OracleOnboarding.open()}else showSetup(0)};
 $('#gbrain-memory').onclick=safe(memory);$('#gbrain-review').onclick=safe(reviewGBrain);$('#bridge-review').onclick=safe(reviewBridge);
 $('#graphics-diagnostics').onclick=graphicsDiagnostics;$('#activity-settings').onclick=activity;$('#updates-settings').onclick=safe(()=>showUpdates(false));
 $('#export-view').onclick=safe(async()=>{closeModal();const path=await call('exportSnapshot');if(path)toast('Imagem salva.')});
 $('#gbrain-connect').onclick=safe(async()=>{await call('chooseGBrain');await refresh();settings()});
 $('#protect-settings').onclick=safe(async()=>{await call('protect');await refresh();settings();toast('Bloqueio ativado')});
 $('#revoke').onclick=()=>{modal(`<h1>Desconectar pastas?</h1><p>O Oracle deixará de acessar seus documentos. Os arquivos continuam no Obsidian e você pode conectar a pasta novamente.</p>${actions('<button class="secondary" id="revoke-cancel">Voltar</button><button class="primary" id="confirm-revoke">Desconectar</button>')}`);$('#revoke-cancel').onclick=settings;$('#confirm-revoke').onclick=safe(async()=>{await call('revoke');live();selected=null;selectedSkill=null;query='';await refresh();settings()})};
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
$('#search').onclick=()=>openSearch();$('#refresh').onclick=safe(refresh);$('#settings').onclick=settings;
$('#tools').onclick=()=>plugin();$('#conversations').onclick=safe(conversations);$('#instructions').onclick=safe(instructions);
$('#density').oninput=renderAtlas;$('#motion').checked=matchMedia('(prefers-reduced-motion: reduce)').matches;
$('#motion').onchange=()=>{document.body.classList.toggle('reduced',$('#motion').checked);renderAtlas()};
$('#timeline').oninput=safe(scrub);$('#play').onclick=safe(play);$('#live').onclick=live;
$('#speed').onclick=()=>{speed=speed===4?1:speed*2;$('#speed').textContent=speed+'×';atlasController?.setFormation({rate:speed});if(timer){clearInterval(timer);timer=null;play()}renderPlayback()};
$('.wordmark').onclick=e=>{e.preventDefault();setView('map');atlasController?.fit()};
$('#updates').onclick=safe(()=>showUpdates(false));
function setZoom(factor){atlasController?.zoomAt(factor)}$('#zoom-in').onclick=()=>setZoom(1.2);$('#zoom-out').onclick=()=>setZoom(1/1.2);$('#zoom-reset').onclick=()=>atlasController?.fit();$('#context-back').onclick=()=>atlasController?.back();$('#reset-layout').onclick=()=>{atlasController?.reset();toast('Posições restauradas. Nenhum arquivo foi movido.')};$('#economy').onchange=renderAtlas;
window.oracleLock=()=>{for(const p of pending.values())p.reject(Error('Oracle bloqueado'));pending.clear();replay=false;replayProjection=null;replaySession=null;closeModal(true);if(atlasController){atlasController.dispose();atlasController=null};$('#lock-screen').hidden=false;$('#app').inert=true;state={entries:[],collections:[],events:[],config:{}};readDocument=null;$('#tree').textContent='';$('#results').textContent='';$('#atlas').textContent='';$('#modal-content').textContent='';clearInterval(timer);timer=null};$('#lock').onclick=safe(async()=>{await persistEditorDraft();if(!window.ORACLE_PREVIEW)await call('lock');window.oracleLock()});$('#unlock').onclick=safe(async()=>{await call('unlock');$('#lock-screen').hidden=true;$('#app').inert=false;await refresh()});
// Deterministic ambient dust; it never represents an agent or event.
for(let i=0;i<46;i++){const e=document.createElement('i');e.className='star';e.style.cssText=`left:${(Math.sin(i*12.9898)*43758.5453%1+1)%1*100}%;top:${(Math.sin(i*78.233)*12731.7%1+1)%1*100}%;width:${i%7===0?2:1}px;height:${i%7===0?2:1}px;opacity:${i%5/18+.04}`;$('#galaxy').append(e)}
call('boot').then(async b=>{applyAccessibility(b.accessibility);if(b.locked)window.oracleLock();else{await refresh();$('#app').inert=false}}).catch(e=>{if($('#lock-screen').hidden)$('#app').inert=false;toast(e.message)});
setInterval(()=>{if(!$('#lock-screen').hidden||document.hidden)return;call('events').then(events=>{if(events.at(-1)?.event_id!==state.events.at(-1)?.event_id){state.events=events;renderProgress();renderAtlas();if(events.at(-1)?.phase&&!$('#modal').open)safe(refresh)()}}).catch(()=>{})},2500);
setInterval(()=>{if($('#lock-screen').hidden&&!document.hidden&&!$('#modal').open)safe(refresh)()},30000);

async function memory(){
 modal('<h1>Memória</h1><p>Conectando à sua biblioteca…</p>'+actions());
 const revision=modalRevision;const status=await call('gbrainRead',{operation:'status'});if(revision!==modalRevision||!$('#modal').open)return;
 $('#gbrain-status').textContent='Conectada';
 modal(`<span class="step-label">${window.ORACLE_PREVIEW?'MEMÓRIA / DADOS SINTÉTICOS':'MEMÓRIA / GBRAIN OFICIAL '+esc(status.version)}</span><h1>Memória</h1><p>Encontre suas notas e acompanhe suas conexões.</p><label class="field">Biblioteca<select id="memory-source">${status.sources.map(s=>`<option value="${esc(s.id)}">${esc(s.name||s.id)}</option>`).join('')}</select></label><label class="search"><input id="memory-query" placeholder="Buscar na memória" aria-label="Buscar na memória"></label><div id="memory-results"></div>${actions('<button class="primary" id="memory-search">Buscar</button>')}`);
 const source=()=>$('#memory-source').value;
 const viewRevision=modalRevision;let searchSequence=0;
 const renderHits=(hits,src)=>{
  $('#memory-results').innerHTML=hits.map((h,i)=>`<button class="result" data-memory-hit="${i}">${icon('note')}<div><strong>${esc(h.title||h.slug||h.page_slug)}</strong><small>${esc(src)} / ${esc(h.slug||h.page_slug)}</small></div></button>`).join('')||'<p class="empty">Nenhum resultado nesta fonte.</p>';
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
 const revision=modalRevision,page=await call('gbrainRead',{operation:'get',source,slug});if(revision!==modalRevision)return;if(!page)throw Error('Nota não encontrada');
 const links=await call('gbrainRead',{operation:'graph',source,slug});if(revision!==modalRevision)return;
 modal(`<h1>${esc(page.title||slug)}</h1><article class="markdown-reader">${markdown(page.compiled_truth||'')}</article><details class="source-details"><summary>Origem e conexões</summary><div class="source">${esc(source)} / ${esc(slug)}<br>${esc(page.canonical_path||page.frontmatter?.canonical_path||page.frontmatter?.origin_source_path||'Caminho de origem não informado')}</div><pre>${esc(JSON.stringify(links,null,2))}</pre></details>${actions()}`,{family:'reader'});bindMarkdown($('#modal-content'));
}
async function reviewGBrain(){const revision=modalRevision;const r=await call('gbrainReadback');if(revision!==modalRevision)return;if(!r.upstream_hash)throw Error('Seu contexto ainda não foi preparado. Continue pela configuração do Oracle.');modal(`<span class="step-label">REVISÃO OFICIAL GBRAIN</span><h1>Revisar contexto</h1><p>Confira se estas informações refletem suas respostas.</p><pre>${esc(r.readback)}</pre>${actions('<button class="primary" id="confirm-official">Confirmar contexto</button>')}`);$('#confirm-official').onclick=safe(async()=>{await call('confirmGBrain',{hash:r.upstream_hash});toast('Contexto confirmado. Continue a configuração no Codex.');closeModal()})}

function renderSkillInspector(){const path=selectedSkill,name=path.split('/').slice(-2,-1)[0],collection=state.collections.find(c=>c.id===selected);$('#inspector-title').textContent=name.replace(/-/g,' ');$('#inspector').innerHTML=`<span class="pill">Skill · ${esc(collection?.name||'')}</span><p class="muted">Um procedimento da sua coleção de especialistas.</p><button id="inspect-skill" class="primary">Ler procedimento</button><button id="edit-selected-skill" class="secondary">Editar</button><button id="focus-parent">Enquadrar coleção →</button>`;$('#inspect-skill').onclick=safe(()=>openNote(path));$('#edit-selected-skill').onclick=safe(async()=>{await openNote(path);editNote()});$('#focus-parent').onclick=()=>atlasController?.focus(selected)}

function graphicsDiagnostics(){modal(`<h1>Diagnóstico do atlas</h1><p>Medidas desta janela, sem estimar tempo de GPU. O movimento ambiental é separado de execução real do Codex.</p><pre>${esc(JSON.stringify(atlasController?.diagnostics()||{renderer:'SVG fallback',reason:atlasController?.renderError},null,2))}</pre>${actions()}`)}

window.oracleVisibility=visible=>{window.oracleWindowVisible=visible;atlasController?.setPaused(!visible||view!=='map'||visualPaused||$('#modal').open);document.body.classList.toggle('window-hidden',!visible)};

$('#ambient-toggle').onclick=()=>{visualPaused=!visualPaused;$('#ambient-toggle').textContent=visualPaused?'Retomar atmosfera':'Pausar atmosfera';atlasController?.setPaused(visualPaused||document.hidden||view!=='map')};

function markdown(text){
 const lines=text.replace(/^---\n[\s\S]*?\n---\n/,'').split('\n');let html='',list=false,code=false,codeLines=[];
 const inline=line=>esc(line).replace(/`([^`]+)`/g,'<code>$1</code>').replace(/\*\*([^*]+)\*\*/g,'<strong>$1</strong>').replace(/\[\[([^\]]+)\]\]/g,'<button class="wiki-link" data-wiki="$1">$1</button>').replace(/\[([^\]]+)\]\((https?:\/\/[^\s)]+)\)/g,'<button class="document-link" data-external="$2">$1 ↗</button>');
 for(const line of lines){if(line.startsWith('```')){if(code){html+='<pre><code>'+esc(codeLines.join('\n'))+'</code></pre>';codeLines=[];code=false}else code=true;continue}if(code){codeLines.push(line);continue}const item=/^\s*[-*] (.+)/.exec(line);if(item){if(!list){html+='<ul>';list=true}html+='<li>'+inline(item[1])+'</li>';continue}if(list){html+='</ul>';list=false}const heading=/^(#{1,4}) (.+)/.exec(line);if(heading){html+=`<h${Math.min(heading[1].length+1,4)}>${inline(heading[2])}</h${Math.min(heading[1].length+1,4)}>`}else if(line.startsWith('> '))html+='<blockquote>'+inline(line.slice(2))+'</blockquote>';else if(line.trim())html+='<p>'+inline(line)+'</p>'}
 if(list)html+='</ul>';if(code)html+='<pre><code>'+esc(codeLines.join('\n'))+'</code></pre>';return html||'<p>Documento vazio.</p>';
}
function bindMarkdown(container){container.querySelectorAll('[data-external]').forEach(e=>e.onclick=safe(()=>call('openExternal',{url:e.dataset.external})));container.querySelectorAll('[data-wiki]').forEach(e=>e.onclick=safe(async()=>{const name=e.dataset.wiki.split('|')[0].split('#')[0].toLowerCase();const matches=visibleEntries().filter(n=>!n.directory&&(title(n).toLowerCase()===name||n.path.replace(/\.md$/,'').toLowerCase()===name));if(matches.length===1)await openNote(matches[0].path);else{openSearch(name);if(!matches.length)toast('Relação citada; documento não encontrado nesta pasta')}}))}

$('#modal').addEventListener('close',()=>atlasController?.setPaused(document.hidden||window.oracleWindowVisible===false||view!=='map'||visualPaused));

function visibleEntries(){return replayProjection||state.entries}
function timelineEvents(){return replay&&replaySession?.kind==='journal'?replaySession.events:state.events}

function setupContinuation(){modal(`<h1>Continuar sua configuração</h1><p>O plano confirmado permanece disponível. A retomada verifica o que já existe e continua pelos recibos, sem criar outro plano.</p><div class="source">Plano ${esc(state.setup.plan_id)}</div>${actions('<button class="secondary" id="new-setup">Nova configuração</button><button class="primary" id="resume-setup">Retomar no Codex</button>')}`);$('#new-setup').onclick=()=>showSetup(0);$('#resume-setup').onclick=()=>showSetup(5)}

async function reviewBridge(){
 const connected=state.codexPlugins?.status==='available';
 modal(`<h1>Codex e plugins</h1><span class="pill">${connected?'Conectado':'Conexão não verificada'}</span><p>O Codex executa suas tarefas e gerencia as permissões dos plugins.</p>${actions('<button class="secondary" id="bridge-plugins">Ver plugins</button><button class="primary" id="bridge-codex">Abrir Codex</button>')}`);
 $('#bridge-plugins').onclick=()=>plugin();$('#bridge-codex').onclick=safe(()=>call('openCodex'));
}

// One search surface serves the launcher, collection navigation and wiki links.
function openSearch(initial=''){
 const prefix=/^(SISTEMA|INBOX|PROJETOS|AREAS|WIKI|FONTES)\//i.test(initial)?initial:'';
 let selectedIndex=0,hits=[];
 modal(`<span class="step-label">MEU UNIVERSO</span><h1>Encontre uma ideia.</h1>
 <label class="search search-field">${icon('search')}<input id="universe-query" type="search" autocomplete="off" spellcheck="false" aria-label="Buscar notas e skills" placeholder="Nome, assunto ou caminho…" value="${esc(prefix?'':initial)}" aria-controls="search-results"></label>
 ${prefix?`<button class="search-scope" id="clear-search-scope">${icon('folder')}${esc(prefix)} ${icon('close')}</button>`:''}
 <div class="search-meta" id="search-count" role="status" aria-live="polite"></div>
 <div id="search-results" class="search-results" role="listbox" aria-label="Resultados da busca"></div>
 <div class="actions"><span class="keyboard-guide"><kbd>↑</kbd><kbd>↓</kbd> navegar <kbd>↵</kbd> abrir <kbd>esc</kbd> fechar</span></div>`,{family:'search',focus:'#universe-query'});
 const input=$('#universe-query');input.setAttribute('role','combobox');input.setAttribute('aria-expanded','true');input.setAttribute('aria-autocomplete','list');
 const select=()=>{const buttons=$$('#search-results [role=option]');buttons.forEach((b,i)=>{b.setAttribute('aria-selected',String(i===selectedIndex));b.classList.toggle('active',i===selectedIndex)});if(buttons[selectedIndex]){input.setAttribute('aria-activedescendant',buttons[selectedIndex].id);buttons[selectedIndex].scrollIntoView({block:'nearest'})}else input.removeAttribute('aria-activedescendant')};
 const open=safe(async index=>{const entry=hits[index];if(!entry)return;const collection=state.collections.find(c=>entry.path.startsWith(`SISTEMA/skills/${c.id}/`));if(collection){selected=collection.id;selectedSkill=entry.path;renderAtlas();renderInspector()}await openNote(entry.path)});
 const search=()=>{
  const terms=input.value.trim().toLocaleLowerCase('pt-BR').split(/\s+/).filter(Boolean);
  const all=state.entries.filter(e=>!e.directory&&(!prefix||e.path.startsWith(prefix))&&terms.every(t=>(title(e)+' '+e.path).toLocaleLowerCase('pt-BR').includes(t)));
  all.sort((a,b)=>{const q=input.value.trim().toLowerCase();return Number(title(b).toLowerCase()===q)-Number(title(a).toLowerCase()===q)||title(a).localeCompare(title(b))});
  hits=all.slice(0,100);selectedIndex=0;
  $('#search-count').textContent=all.length?`${all.length} ${all.length===1?'resultado':'resultados'}${all.length>100?' · refine para ver mais':''}`:'Nenhum resultado';
  $('#search-results').innerHTML=hits.length?hits.map((e,i)=>`<button role="option" aria-selected="${i===0}" tabindex="-1" class="result" id="search-option-${i}" data-hit="${i}">${icon('note')}<div><strong>${esc(title(e))}</strong><small>${esc(e.path.replace(/\/SKILL\.md$/,''))}</small></div><span class="result-enter" aria-hidden="true">↵</span></button>`).join(''):`<div class="search-empty">${icon('search')}<h2>${input.value?'Não encontramos essa ideia.':'Seu universo ainda está vazio.'}</h2><p>${input.value?'Experimente outro nome ou parte do caminho.':'Conecte uma pasta nos ajustes para explorar notas e skills.'}</p></div>`;
  $$('[data-hit]').forEach(b=>{b.onclick=()=>open(Number(b.dataset.hit));b.onpointermove=()=>{selectedIndex=Number(b.dataset.hit);select()}});select();
 };
 input.oninput=search;input.onkeydown=e=>{if(e.key==='ArrowDown'||e.key==='ArrowUp'){e.preventDefault();selectedIndex=Math.max(0,Math.min(hits.length-1,selectedIndex+(e.key==='ArrowDown'?1:-1)));select()}else if(e.key==='Enter'){e.preventDefault();open(selectedIndex)}};
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
// WebKit on macOS does not focus every clicked control by default. Keep the
// native app's modal origin and keyboard controls consistent with the browser.
document.addEventListener('click',e=>{const control=e.target.closest('button,input[type=range],summary');if(control&&!control.disabled)control.focus({preventScroll:true})},true);
document.addEventListener('keydown',e=>{if(e.key==='Escape')hideTooltip();if($('#app').inert)return;if((e.metaKey||e.ctrlKey)&&e.key.toLowerCase()==='k'){e.preventDefault();if(!modalDirty)openSearch()}if(e.metaKey&&e.key===','){e.preventDefault();if(!modalDirty)settings()}});

let updatePolling=null,updateBusy=false;
const updateNames={gbrain:'Second Brain',cognee:'Memory',skills:'Skills'};
const updateStates={not_checked:'Não verificado',configured:'Disponível',current:'Em dia',updated:'Atualizado',available:'Atualização disponível',external:'Instalação existente',compatibility_required:'Em avaliação',not_adopted:'Ainda não conectado',not_configured:'Sem atualização disponível',error:'Tente novamente',preserved_edits:'Personalizações preservadas',rolled_back:'Restaurado'};
function reflectUpdateStatus(status){
 updateBusy=!!status.busy;$('#updates').classList.toggle('busy',updateBusy);
 const recent=status.at&&Date.now()-Date.parse(status.at)<86400000;
 $('#updates').classList.toggle('available',!!status.available&&!!recent&&!updateBusy);
 $('#updates').setAttribute('aria-label',status.available&&recent?'Atualizar — atualização disponível':'Atualizações');
}
async function showUpdates(operation=null){
 if(operation===true)operation='check-apply';if(operation===false)operation=null;
 if(operation){await call('updateStart',{operation});updateBusy=true}
 modal(`<h1>Atualizações</h1><div class="update-status" role="status" aria-live="polite"><span id="update-message">Consultando atualizações…</span><progress id="update-progress" aria-label="Progresso das atualizações"></progress></div><div id="update-results" class="update-results"></div><div id="update-recovery" class="recovery-actions"></div>${actions('<button class="secondary" id="check-updates">Verificar</button><button class="primary" id="apply-updates" hidden>Instalar atualização</button>')}`,{family:'updates'});
 const revision=modalRevision;
 $('#check-updates').onclick=safe(()=>showUpdates('check-only'));$('#apply-updates').onclick=safe(()=>showUpdates('check-apply'));
 const poll=async()=>{
  try{
   const status=await call('updateStatus');reflectUpdateStatus(status);
   if($('#modal').open&&modalRevision===revision){
    $('#update-message').textContent=updateBusy?'Verificando e preparando…':status.phase==='interrupted'?'A atualização foi interrompida. Você pode tentar novamente.':status.available?'Há uma atualização pronta para instalar.':status.phase==='complete'?'Verificação concluída.':'Confira se há novidades para seu Oracle.';
    const progress=$('#update-progress');progress.hidden=!updateBusy;if(status.total>0){progress.max=status.total;progress.value=status.completed||0}else progress.removeAttribute('value');
    $('#check-updates').disabled=updateBusy;$('#apply-updates').hidden=!status.available;$('#apply-updates').disabled=updateBusy;
    const results=status.results?.length?status.results:[{id:'gbrain',status:'not_checked',version:status.gbrain_version},{id:'cognee',status:'not_adopted'},{id:'skills',status:'not_checked'}];
    const descriptions={current:'Você já está usando a versão disponível.',updated:'A atualização foi instalada.',available:'Pronta para instalar.',external:'Gerenciada na instalação que você conectou.',compatibility_required:'Uma nova versão está sendo avaliada para o Oracle.',not_adopted:'Nenhuma integração ativa.',not_configured:'Nenhum pacote novo disponível.',not_checked:'Use Verificar para consultar novidades.',preserved_edits:'Suas alterações foram mantidas.',error:'Não foi possível concluir a consulta.'};
    $('#update-results').innerHTML=results.map(r=>`<section class="update-result"><div>${icon(r.id==='skills'?'folder':'brain')}<h2>${updateNames[r.id]||esc(r.id)}</h2><span class="pill">${updateStates[r.status]||'Não verificado'}</span></div><p>${descriptions[r.status]||'Confira os detalhes abaixo.'}</p>${r.version?`<small>Versão ${esc(r.version)}</small>`:''}${r.message&&r.status!=='not_adopted'?`<details class="source-details"><summary>Detalhes</summary><p>${esc(r.message)}</p></details>`:''}</section>`).join('');
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
function applyAccessibility(value={}){
 if(value.reduceMotion)$('#motion').checked=true;
 if(value.reduceTransparency)$('#transparency').checked=true;
 document.body.classList.toggle('reduced',$('#motion').checked);document.body.classList.toggle('reduce-transparency',$('#transparency').checked);
 if(atlasController)renderAtlas();
}
window.oracleAccessibility=applyAccessibility;
$('#transparency').checked=matchMedia('(prefers-reduced-transparency: reduce)').matches;
$('#transparency').onchange=()=>document.body.classList.toggle('reduce-transparency',$('#transparency').checked);
if(innerWidth<=1050)toggleNavigation(false);
document.addEventListener('keydown',e=>{if(e.key==='Escape'&&!$('#modal').open){if(!$('#replay-panel').hidden)toggleReplayPanel(false);else if(document.body.classList.contains('observatory-open'))toggleObservatory(false)}});
document.addEventListener('pointerdown',e=>{if(!$('#replay-panel').hidden&&!e.target.closest('#replay-panel,#replay-toggle')&&!$('#modal').open)toggleReplayPanel(false)});

window.oracleTakeDraftAndLock=()=>{const draft=editorSession&&modalDirty?{path:editorSession.path,hash:editorSession.hash,text:editorSession.text,vault:state.config.vault}:null;window.oracleLock();editorSession=null;clearTimeout(draftTimer);return draft};
