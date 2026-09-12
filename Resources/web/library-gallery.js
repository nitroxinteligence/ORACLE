/* Dedicated library pages over the same inventory used by the Atlas. */
class OracleLibraryGallery {
 constructor(element,hooks){
  this.el=element;this.h=hooks;this.active=false;this.mode='prompts';this.models=new Map();this.cache=new Map();this.pending=new Map();this.queue=[];this.running=0;this.sequence=0;this.revision=0;this.pageSize=24;
  this.options={prompts:{id:'prompt',root:'SISTEMA/prompts',title:'Prompts',description:'Modelos para criar, pensar e executar.'},tutorials:{id:'tutorial',root:'SISTEMA/Tutoriais',title:'Tutoriais',description:'Guias para aprender, consultar e colocar em prática.'}};
 }
 model(){if(!this.models.has(this.mode))this.models.set(this.mode,{query:'',folder:'',order:'az',page:0,scroll:0,selected:'',choice:''});return this.models.get(this.mode)}
 data(){const o=this.options[this.mode],state=this.h.state();return OracleLibrary.inventory(state.entries,o.root,this.model().choice||state.config?.libraryRoots?.[o.id])}
 label(path){return path.split('/').at(-1).replace(/\.md$/i,'').replace(/[-_]+/g,' ')}
 inside(path,root){return path===root||path.startsWith(root+'/')}
 key(text){return String(text||'').normalize('NFD').replace(/\p{Diacritic}/gu,'').toLocaleLowerCase('pt-BR')}
 signature(){const d=this.data();return JSON.stringify([this.mode,d.root,d.ambiguous,this.h.state().scan?.signature,d.documents.map(e=>[e.path,e.size,e.modified_at,e.modified,e.hash])])}
 open(mode){if(this.active)this.model().scroll=this.el.scrollTop;this.mode=mode;this.active=true;this.sequence++;const key=this.signature();if(key!==this.keyValue){this.revision++;this.cache.clear();this.pending.clear()}this.keyValue=key;this.render();this.el.scrollTop=this.model().scroll;}
 reset(){this.hide();this.revision++;this.cache.clear();this.pending.clear();this.models.clear();this.el.replaceChildren();}
 hide(){if(this.active)this.model().scroll=this.el.scrollTop;this.active=false;this.sequence++;this.queue=[];}
 refresh(){if(!this.active)return;const key=this.signature();if(key!==this.keyValue){this.keyValue=key;this.revision++;this.cache.clear();this.pending.clear();this.sequence++;this.model().selected='';this.render()}}
 metadata(text,entry,document){
  const fields={},raw=String(text||''),front=raw.match(/^\uFEFF?---\r?\n([\s\S]*?)\r?\n---(?:\r?\n|$)/)?.[1]||'';
  for(const line of front.split(/\r?\n/)){const match=line.match(/^([\w-]+):\s*(.*?)\s*$/);if(match)fields[match[1].toLowerCase()]=match[2].replace(/^(['"])(.*)\1$/,'$2')}
  const plain=raw.replace(/^\uFEFF?---\r?\n[\s\S]*?\r?\n---(?:\r?\n|$)/,'');
  const name=fields.title||plain.match(/^#\s+(.+)$/m)?.[1]||entry.name?.replace(/\.md$/i,'')||this.label(entry.path);
  const markdownImage=plain.match(/!\[[^\]]*\]\((?:<([^>\n]+)>|([^\s)]+))(?:\s+['"][^)]*)?\)/);
  const embedded=plain.match(/!\[\[([^\]\n]+)\]\]/)?.[0]||markdownImage?.[1]||markdownImage?.[2];
  const reference=fields.cover||fields.image||fields.thumbnail||fields.banner||embedded||'';
  const candidate=document.coverDataURL||entry.coverDataURL||entry.thumbnailDataURL||reference;
  let cover=/^data:image\/(?:png|jpeg|webp|gif);base64,[a-z\d+/=\r\n]+$/i.test(candidate)&&candidate.length<6_000_000?candidate:'';
  if(window.ORACLE_PREVIEW&&/^preview-gallery-(?:graph|knowledge)\.png$/.test(reference))cover=reference;
  return {title:name.replace(/[*_`]/g,''),text:raw,cover,reference,description:fields.description||'',error:null};
 }
 read(entry){
  const cached=this.cache.get(entry.path);if(cached&&!cached.error)return Promise.resolve(cached);
  if(this.pending.has(entry.path))return this.pending.get(entry.path);
  const revision=this.revision;
  const task=this.h.call('read',{path:entry.path}).then(async doc=>{const value=this.metadata(doc.text,entry,doc);if(!value.cover&&value.reference&&this.h.readImage){try{value.cover=await this.h.readImage(value.reference,entry.path)}catch{value.cover=''}}if(revision===this.revision)this.cache.set(entry.path,value);return value}).catch(error=>{const value={title:this.label(entry.path),text:'',cover:'',error:error.message};if(revision===this.revision)this.cache.set(entry.path,value);return value}).finally(()=>{if(this.pending.get(entry.path)===task)this.pending.delete(entry.path)});
  this.pending.set(entry.path,task);return task;
 }
 hydrate(entries){
  const sequence=this.sequence;
  this.queue=entries.filter(e=>!this.cache.has(e.path));
  const pump=()=>{while(this.active&&sequence===this.sequence&&this.running<3&&this.queue.length){const entry=this.queue.shift();this.running++;this.read(entry).then(()=>{if(this.active&&sequence===this.sequence&&!this.model().selected){const button=[...this.el.querySelectorAll('[data-card-path]')].find(b=>b.dataset.cardPath===entry.path);if(button)this.fillCard(button,entry)}}).finally(()=>{this.running--;if(this.active){if(sequence===this.sequence)pump();else this.hydrate(this.visible||[])}})}};
  pump();
 }
 filtered(data){const model=this.model(),terms=this.key(model.query).split(/\s+/).filter(Boolean);return data.documents.filter(e=>this.inside(e.path,model.folder||data.root)&&terms.every(t=>this.key(e.path+' '+(e.name||'')+' '+(this.cache.get(e.path)?.title||'')).includes(t))).sort((a,b)=>(model.order==='za'?-1:1)*this.label(a.path).localeCompare(this.label(b.path),'pt-BR'))}
 fillCard(button,entry){
  const value=this.cache.get(entry.path),title=value?.title||this.label(entry.path),cover=value?.cover;
  button.classList.toggle('has-cover',!!cover);button.setAttribute('aria-label',title);
  button.innerHTML=(cover?`<span class="gallery-cover"><img src="${this.h.esc(cover)}" alt="" loading="lazy" decoding="async"></span>`:'')+`<span class="gallery-card-title">${this.h.esc(title)}</span>`;
  button.querySelector('img')?.addEventListener('error',()=>{button.classList.remove('has-cover');button.querySelector('.gallery-cover')?.remove();if(value)value.cover='';},{once:true});
 }
 render(){
  if(!this.active)return;
  if(this.model().selected){void this.renderDocument();return}
  const {esc,icon}=this.h,o=this.options[this.mode],model=this.model(),data=this.data();
  if(model.folder&&!data.folders.includes(model.folder))model.folder='';
  this.el.innerHTML=`<div class="library-page-inner"><header class="gallery-heading"><div><span class="gallery-eyebrow">SUA BIBLIOTECA</span><h1 tabindex="-1">${o.title}</h1><p>${o.description}</p></div><button type="button" class="gallery-refresh icon-button" aria-label="Atualizar ${o.title}">${icon('refresh')}</button></header><div class="gallery-search-row"><label class="gallery-search">${icon('search')}<input type="search" aria-label="Buscar ${o.title}" placeholder="Buscar por nome ou pasta…" autocomplete="off" value="${esc(model.query)}"><kbd>⌕</kbd></label><label class="gallery-sort"><span>Ordenar</span><select aria-label="Ordenar ${o.title}"><option value="az" ${model.order==='az'?'selected':''}>Nome A–Z</option><option value="za" ${model.order==='za'?'selected':''}>Nome Z–A</option></select></label></div><div class="gallery-source-state" role="status"></div><div class="gallery-root-choice"></div><nav class="gallery-categories" aria-label="Categorias"></nav><div class="gallery-folder-controls"></div><div class="gallery-results"></div></div>`;
  this.el.querySelector('input').oninput=e=>{model.query=e.target.value;model.page=0;this.renderResults()};
  this.el.querySelector('select').onchange=e=>{model.order=e.target.value;model.page=0;this.renderResults()};
  this.el.querySelector('.gallery-refresh').onclick=async()=>{const button=this.el.querySelector('.gallery-refresh');button.disabled=true;try{this.revision++;this.cache.clear();this.pending.clear();await this.h.rescan();if(this.active){this.keyValue=this.signature();this.sequence++;this.render();this.h.toast('Biblioteca atualizada.','success')}}catch(error){this.h.toast(error.message,'error')}finally{if(button.isConnected)button.disabled=false}};
  const status=this.el.querySelector('.gallery-source-state'),state=this.h.state();status.textContent=state.scanError?'A leitura está parcial. Alguns itens podem não aparecer.':state.scan?.pending?'A biblioteca continua sendo lida…':window.ORACLE_PREVIEW?'Biblioteca de demonstração':'';
  if(data.roots.length>1){const host=this.el.querySelector('.gallery-root-choice');host.innerHTML=`<label>Biblioteca de origem<select aria-label="Biblioteca de origem"><option value="">Selecionar…</option>${data.roots.map(path=>`<option value="${esc(path)}" ${!data.ambiguous&&path===data.root?'selected':''}>${esc(path)}</option>`).join('')}</select></label>`;host.querySelector('select').onchange=async e=>{const path=e.target.value;if(!data.roots.includes(path))return;model.choice=path;model.folder='';model.page=0;this.sequence++;this.render()}}
  this.renderFilters();this.renderResults();
 }
 renderFilters(){
  const {esc}=this.h,data=this.data(),model=this.model(),first=path=>path.slice(data.root.length+1).split('/')[0];
  const categories=data.folders.filter(path=>path!==data.root&&path.split('/').length===data.root.split('/').length+1),selected=model.folder?first(model.folder):'';
  const chips=[{label:'Todos',path:'',count:data.documents.length},...categories.map(path=>({label:this.label(path),path,count:data.documents.filter(e=>this.inside(e.path,path)).length}))];
  const nav=this.el.querySelector('.gallery-categories');nav.innerHTML=chips.map((c,i)=>`<button type="button" data-gallery-category="${i}" aria-pressed="${c.path?first(c.path)===selected:!selected}">${esc(c.label)}<span>${c.count}</span></button>`).join('');
  nav.querySelectorAll('button').forEach(button=>button.onclick=()=>{model.folder=chips[Number(button.dataset.galleryCategory)].path;model.page=0;this.sequence++;this.renderFilters();this.renderResults();this.el.querySelectorAll('[data-gallery-category]')[Number(button.dataset.galleryCategory)]?.focus({preventScroll:true})});
  const current=model.folder||data.root,ancestors=[];if(model.folder){const parts=model.folder.slice(data.root.length+1).split('/');for(let i=0;i<parts.length;i++)ancestors.push(data.root+'/'+parts.slice(0,i+1).join('/'))}
  const children=data.folders.filter(path=>path.slice(0,path.lastIndexOf('/'))===current&&current!==data.root);
  const host=this.el.querySelector('.gallery-folder-controls');host.innerHTML=ancestors.length?`<nav class="gallery-breadcrumb" aria-label="Pasta atual"><button type="button" data-gallery-root>${this.options[this.mode].title}</button>${ancestors.map((path,i)=>`<span aria-hidden="true">/</span><button type="button" data-gallery-ancestor="${i}" ${path===current?'aria-current="page"':''}>${esc(this.label(path))}</button>`).join('')}</nav>${children.length?`<div class="gallery-subfolders"><span>Subpastas</span>${children.map((path,i)=>`<button type="button" data-gallery-folder="${i}">${esc(this.label(path))}<span>${data.documents.filter(e=>this.inside(e.path,path)).length}</span></button>`).join('')}</div>`:''}`:'';
  const navigate=path=>{model.folder=path;model.page=0;this.sequence++;this.renderFilters();this.renderResults();this.el.querySelector('.gallery-breadcrumb button[aria-current=page],.gallery-categories button')?.focus({preventScroll:true})};
  host.querySelector('[data-gallery-root]')?.addEventListener('click',()=>navigate(''));
  host.querySelectorAll('[data-gallery-ancestor]').forEach(b=>b.onclick=()=>navigate(ancestors[Number(b.dataset.galleryAncestor)]));
  host.querySelectorAll('[data-gallery-folder]').forEach(b=>b.onclick=()=>navigate(children[Number(b.dataset.galleryFolder)]));
 }
 renderResults(){
  if(!this.active||this.model().selected)return;
  const {esc}=this.h,data=this.data(),model=this.model(),items=this.filtered(data),pages=Math.max(1,Math.ceil(items.length/this.pageSize));model.page=Math.min(model.page,pages-1);
  const rows=items.slice(model.page*this.pageSize,(model.page+1)*this.pageSize);this.visible=rows;
  const host=this.el.querySelector('.gallery-results');if(!host)return;
  host.innerHTML=`<div class="gallery-result-heading"><span role="status">${items.length} ${this.mode==='prompts'?(items.length===1?'prompt':'prompts'):(items.length===1?'tutorial':'tutoriais')}${model.query?(items.length===1?' encontrado':' encontrados'):''}</span>${model.query||model.folder?'<button type="button" class="quiet-link" data-gallery-clear>Limpar filtros</button>':''}</div>`+(rows.length?`<div class="gallery-grid" aria-label="${this.options[this.mode].title} encontrados">${rows.map(entry=>`<button type="button" class="gallery-card" data-card-path="${esc(entry.path)}"></button>`).join('')}</div>`:`<div class="gallery-empty"><h2>${data.ambiguous?'Escolha a biblioteca de origem':model.query||model.folder?'Nenhum resultado encontrado':'Sua biblioteca ainda está vazia'}</h2><p>${data.ambiguous?'Há mais de uma pasta correspondente. Selecione qual delas deseja explorar.':model.query||model.folder?'Tente outro nome ou remova um filtro.':'Os documentos aparecerão aqui quando estiverem disponíveis no Obsidian.'}</p></div>`)+(pages>1?`<nav class="gallery-pagination" aria-label="Páginas da galeria"><button type="button" data-gallery-page="-1" ${model.page===0?'disabled':''}>Anterior</button><span>${model.page+1} de ${pages}</span><button type="button" data-gallery-page="1" ${model.page===pages-1?'disabled':''}>Próxima</button></nav>`:'');
  host.querySelectorAll('[data-card-path]').forEach((button,i)=>{this.fillCard(button,rows[i]);button.onclick=()=>this.openDocument(button.dataset.cardPath)});
  host.querySelector('[data-gallery-clear]')?.addEventListener('click',()=>{model.query='';model.folder='';model.page=0;this.sequence++;this.render();this.el.querySelector('input')?.focus()});
  host.querySelectorAll('[data-gallery-page]').forEach(button=>button.onclick=()=>{model.page+=Number(button.dataset.galleryPage);this.sequence++;this.renderResults();this.el.querySelector('.gallery-results').scrollIntoView({block:'start'});this.el.querySelector('[data-card-path]')?.focus({preventScroll:true})});
  this.hydrate(rows);
 }
 async openDocument(path){if(this.h.blocked()||!this.data().documents.some(e=>e.path===path))return;const model=this.model();model.scroll=this.el.scrollTop;model.selected=path;this.sequence++;this.queue=[];this.el.scrollTop=0;await this.renderDocument();}
 async renderDocument(){
  const model=this.model(),path=model.selected,entry=this.data().documents.find(e=>e.path===path);if(!entry){model.selected='';this.render();return}
  const {esc,icon}=this.h,sequence=++this.sequence;
  const shell=()=>`<div class="library-document-inner"><button type="button" class="gallery-back">${icon('back')}Voltar para ${this.options[this.mode].title}</button><div class="gallery-document-body"></div></div>`;
  this.el.innerHTML=shell();this.el.querySelector('.gallery-back').onclick=()=>{model.selected='';this.sequence++;this.render();this.el.scrollTop=model.scroll;[...this.el.querySelectorAll('[data-card-path]')].find(b=>b.dataset.cardPath===path)?.focus({preventScroll:true})};
  const host=this.el.querySelector('.gallery-document-body');host.innerHTML='<p class="gallery-loading" role="status">Abrindo documento…</p>';
  const value=await this.read(entry);if(!this.active||sequence!==this.sequence||model.selected!==path)return;
  if(value.error){host.innerHTML=`<div class="gallery-empty" role="alert"><h1>Não foi possível abrir este documento</h1><p>${esc(value.error)}</p><button type="button" class="secondary" data-gallery-retry>Tentar novamente</button></div>`;host.querySelector('button').onclick=()=>{this.cache.delete(path);this.renderDocument()};return}
  host.innerHTML=`<header class="gallery-document-heading"><span class="gallery-eyebrow">${esc(path.slice(this.data().root.length+1).split('/').slice(0,-1).map(this.label).join(' / ')||this.options[this.mode].title)}</span><h1 tabindex="-1">${esc(value.title)}</h1><div class="gallery-document-actions"><button type="button" class="secondary" data-gallery-copy>Copiar ${this.mode==='prompts'?'prompt':'conteúdo'}</button><button type="button" class="quiet-link" data-gallery-original>Abrir nota original</button></div></header>${value.cover?`<img class="gallery-document-cover" src="${esc(value.cover)}" alt="">`:''}<article class="markdown-reader gallery-document-content">${OracleMarkdown.render(value.text.replace(/^\uFEFF?---\r?\n[\s\S]*?\r?\n---(?:\r?\n|$)/,'').replace(/^\s*#\s+[^\n]+(?:\n|$)/,''))}</article>`;
  host.querySelector('h1').focus({preventScroll:true});host.querySelector('img')?.addEventListener('error',e=>e.target.remove(),{once:true});
  host.querySelector('[data-gallery-copy]').onclick=async()=>{try{await this.h.call('copy',{text:value.text});this.h.toast('Texto copiado.','success')}catch(error){this.h.toast(error.message,'error')}};
  host.querySelector('[data-gallery-original]').onclick=()=>this.h.openNote(path);this.h.bindMarkdown(host,path);
 }
}
