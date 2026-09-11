/* Shared, bounded local Markdown libraries. Paths preserve real spelling;
   ambiguous case variants require an explicit selection, never an implicit merge. */
(function (global) {
  'use strict';
  const key=value=>String(value||'').normalize('NFC').toLocaleLowerCase('pt-BR');
  const parent=path=>path.split('/').slice(0,-1).join('/');
  const inside=(path,root)=>path===root||path.startsWith(root+'/');
  const valid=path=>typeof path==='string'&&!path.startsWith('/')&&!/[\\\u0000-\u001f]/.test(path)&&!path.split('/').some(p=>!p||p==='.'||p==='..');
  function inventory(entries,expected,choice='') {
    const depth=expected.split('/').length, roots=new Set();
    for(const e of entries||[]) if(valid(e.path)) {
      const p=e.path.split('/').slice(0,depth).join('/');
      if(key(p)===key(expected)&&(e.directory||e.path.split('/').length>depth))roots.add(p);
    }
    const candidates=[...roots].sort((a,b)=>a.localeCompare(b,'pt-BR'));
    const chosen=candidates.includes(choice)?choice:candidates.length===1?candidates[0]:'';
    const root=chosen||expected,ambiguous=candidates.length>1&&!chosen,documents=[],folders=new Set([root]);
    if(!ambiguous)for(const e of entries||[]) {
      if(!valid(e.path)||!inside(e.path,root))continue;
      if(e.directory)folders.add(e.path);
      else if(/\.md$/i.test(e.path))documents.push(e);
      else continue;
      for(let p=parent(e.path);p&&inside(p,root);p=parent(p))folders.add(p);
    }
    const unique=[...new Map(documents.map(e=>[e.path,e])).values()].sort((a,b)=>a.path.localeCompare(b.path,'pt-BR'));
    return {root,roots:candidates,exists:candidates.length>0,ambiguous,documents:unique,folders:[...folders].sort((a,b)=>a.localeCompare(b,'pt-BR'))};
  }
  class Library {
    constructor(options,hooks){this.options=options;this.hooks=hooks;this.generation=0;this.sequence=0;this.pageSize=80;this.reset();}
    reset(){this.folder=this.options.root;this.selected='';this.query='';this.document=null;this.expanded=new Set([this.options.root]);this.page=0;this.focused='';}
    data(){const s=this.hooks.state();return inventory(s.entries,this.options.root,s.config?.libraryRoots?.[this.options.id]||this.choice);}
    get active(){return document.querySelector('#modal')?.open&&document.querySelector('#'+this.options.id+'-library')?.dataset.generation===String(this.generation);}
    selector(name){return '#'+this.options.id+'-'+name;}
    find(name){return document.querySelector(this.selector(name));}
    label(path){return path===(this.currentRoot||this.options.root)?this.options.all:path.split('/').at(-1).replace(/\.md$/i,'').replace(/[-_]/g,' ');}
    items(data){const terms=key(this.query).trim().split(/\s+/).filter(Boolean);return data.documents.filter(e=>inside(e.path,this.folder)&&terms.every(t=>key(e.path+' '+e.name).includes(t)));}
    async open(initialPath=null){
      if(this.hooks.blocked())return false;
      this.reset();this.sequence++;this.generation++;
      const {id,title,description}=this.options,{esc,icon}=this.hooks;
      if(this.hooks.modal(`<h1>${esc(title)}</h1><p class="library-description">${esc(description)}</p><div id="${id}-library" class="prompt-library" data-generation="${this.generation}"><div class="prompt-library-toolbar"><div class="prompt-library-source"><span class="status-badge" data-tone="info">Fonte local</span><span id="${id}-source-status" role="status">Lendo o vault…</span></div><label class="search prompt-search">${icon('search')}<input id="${id}-search" type="search" autocomplete="off" spellcheck="false" aria-label="Buscar ${esc(title)}" placeholder="Buscar por nome ou pasta…"></label></div><div id="${id}-root-choice"></div><div class="prompt-library-layout"><aside class="prompt-sidebar" aria-label="Pastas"><div class="prompt-pane-heading"><div><span>Pastas</span><small id="${id}-folder-count"></small></div></div><nav id="${id}-tree" role="tree" aria-label="Pastas da biblioteca"></nav></aside><section class="prompt-catalog" aria-label="Documentos"><div id="${id}-list"></div></section><article id="${id}-preview" class="prompt-preview" aria-label="Pré-visualização"></article></div></div><div class="actions"><button class="secondary" id="${id}-refresh">Reler Obsidian</button></div>`,{family:this.options.family,focus:this.selector('search'),key:id+'-library'})===false)return false;
      const generation=this.generation,epoch=this.hooks.epoch();
      this.find('search').oninput=e=>{this.query=e.target.value;this.page=0;this.render();};
      this.find('refresh').onclick=()=>this.reload();
      try{await this.hooks.refresh();}catch(e){if(this.active)this.hooks.toast(e.message);}
      if(!this.active||generation!==this.generation||epoch!==this.hooks.epoch())return false;
      const data=this.data();this.folder=data.root;this.expanded.add(data.root);this.render();
      if(initialPath&&data.documents.some(e=>e.path===initialPath)){
        this.folder=parent(initialPath);for(let p=this.folder;inside(p,data.root);p=parent(p)){this.expanded.add(p);if(p===data.root)break;}
        const index=this.items(data).findIndex(e=>e.path===initialPath);this.page=Math.floor(Math.max(0,index)/this.pageSize);await this.select(initialPath);
      }
      document.querySelector(this.options.trigger)?.setAttribute('aria-expanded','true');
      return true;
    }
    async reload(){
      const epoch=this.hooks.epoch(),generation=this.generation,button=this.find('refresh');if(button)button.disabled=true;
      try{await (this.hooks.rescan||this.hooks.refresh)();if(this.active&&epoch===this.hooks.epoch()&&generation===this.generation){this.document=null;this.selected='';this.render();}}
      catch(e){if(this.active&&epoch===this.hooks.epoch())this.hooks.toast(e.message);}
      finally{if(button?.isConnected)button.disabled=false;}
    }
    async select(path){
      if(!this.active)return;
      const sequence=++this.sequence,epoch=this.hooks.epoch(),generation=this.generation;
      this.selected=path;this.document=null;this.render();
      const current=()=>this.active&&sequence===this.sequence&&epoch===this.hooks.epoch()&&generation===this.generation&&this.selected===path;
      try{const doc=await this.hooks.call('read',{path});if(!current())return;this.document={...doc,relative:path};}
      catch(e){if(!current())return;this.document={error:e.message};}
      if(current())this.render();
    }
    render(){
      if(!this.active)return;
      const {id}=this.options,{esc,icon}=this.hooks,data=this.data(),tree=this.find('tree'),list=this.find('list'),preview=this.find('preview');this.currentRoot=data.root;
      const focused=document.activeElement,focusPath=focused?.dataset.folderPath||focused?.dataset.documentPath;
      const focusType=focused?.dataset.folderPath?'folder':'document';
      const positions=[tree,list,preview].map(e=>[e.scrollTop,e.parentElement.scrollTop]);
      if(!data.folders.includes(this.folder))this.folder=data.root;
      if(this.selected&&!data.documents.some(e=>e.path===this.selected)){this.selected='';this.document=null;}
      const childMap=new Map(),counts=new Map();
      for(const folder of data.folders){const p=parent(folder);if(!childMap.has(p))childMap.set(p,[]);childMap.get(p).push(folder);}
      for(const e of data.documents)for(let p=parent(e.path);p&&inside(p,data.root);p=parent(p))counts.set(p,(counts.get(p)||0)+1);
      let visibleFolders=0;
      const node=(path,depth=0)=>{
        if(depth>32||visibleFolders++>=600)return '';
        const children=childMap.get(path)||[],expanded=path===data.root||this.expanded.has(path),active=path===this.folder;
        return `<div role="none" class="prompt-tree-node"><button type="button" class="prompt-folder-button${active?' active':''}" data-folder-path="${esc(path)}" data-${id}-folder="${esc(path)}" role="treeitem" tabindex="${active?0:-1}" aria-level="${depth+1}" aria-selected="${active}"${children.length?' aria-expanded="'+expanded+'"':''}>${icon('folder')}<span><strong>${esc(path===data.root?this.options.all:this.label(path))}</strong><small>${counts.get(path)||0} documentos</small></span>${children.length?icon('chevron','prompt-folder-chevron'):''}</button>${expanded&&children.length?'<div class="prompt-tree-children" role="group">'+children.map(p=>node(p,depth+1)).join('')+'</div>':''}</div>`;
      };
      tree.innerHTML=data.ambiguous?'':node(data.root);
      const items=this.items(data),pages=Math.max(1,Math.ceil(items.length/this.pageSize));this.page=Math.max(0,Math.min(this.page,pages-1));
      const rows=items.slice(this.page*this.pageSize,(this.page+1)*this.pageSize);
      if(!rows.some(e=>e.path===this.focused))this.focused=rows.find(e=>e.path===this.selected)?.path||rows[0]?.path||'';
      list.innerHTML=`<div class="prompt-pane-heading"><div><span>${esc(this.label(this.folder))}</span><small role="status">${items.length} documentos${pages>1?' · página '+(this.page+1)+' de '+pages:''}</small></div></div>`+(rows.length?`<div class="prompt-list-items" role="listbox" aria-label="Documentos encontrados">${rows.map(e=>`<button type="button" class="prompt-list-item${e.path===this.selected?' active':''}" data-document-path="${esc(e.path)}" data-${id}-document="${esc(e.path)}" role="option" tabindex="${e.path===this.focused?0:-1}" aria-selected="${e.path===this.selected}" aria-posinset="${items.indexOf(e)+1}" aria-setsize="${items.length}">${icon('note','prompt-list-icon')}<span><strong>${esc(this.label(e.path))}</strong><small>${esc(e.path.slice(data.root.length+1))}</small></span><span aria-hidden="true">↗</span></button>`).join('')}</div>`:`<div class="prompt-empty"><strong>${data.ambiguous?'Escolha a pasta de origem':this.query?'Nenhum documento encontrado':'Nenhum documento nesta pasta'}</strong><p>${data.ambiguous?'As variantes não são mescladas automaticamente.':'Adicione notas Markdown no Obsidian ou ajuste a busca.'}</p></div>`)+(pages>1?`<nav class="library-pages" aria-label="Páginas"><button type="button" class="secondary" data-page="-1" ${this.page===0?'disabled':''}>Anterior</button><span>${this.page+1} / ${pages}</span><button type="button" class="secondary" data-page="1" ${this.page===pages-1?'disabled':''}>Próxima</button></nav>`:'');
      const doc=this.document;
      preview.innerHTML=!this.selected?`<div class="prompt-preview-empty"><h2>Escolha um documento</h2><p>A prévia lê o arquivo original no vault.</p></div>`:!doc?'<div class="prompt-preview-empty prompt-loading" role="status">Lendo documento…</div>':doc.error?`<div class="prompt-preview-empty" role="alert"><h2>Leitura não concluída</h2><p>${esc(doc.error)}</p><button type="button" class="secondary" data-retry>Tentar novamente</button></div>`:`<div class="prompt-preview-heading"><div><h2>${esc(this.label(this.selected))}</h2><small>${esc(this.selected)}</small></div><div class="prompt-preview-actions"><button type="button" class="secondary" id="copy-${id}">Copiar</button><button type="button" class="secondary" id="open-${id}-note">Abrir nota</button></div></div><article class="markdown-reader prompt-preview-content">${global.OracleMarkdown.render(doc.text||'')}</article>`;
      preview.setAttribute('aria-busy',String(!!this.selected&&!doc));
      this.find('folder-count').textContent=Math.max(0,data.folders.length-1)+' pastas'+(visibleFolders>=600?' · árvore limitada; busque os demais documentos':'');
      this.find('source-status').textContent=this.hooks.state().scan?.pending?'Leitura local em andamento; o inventário ainda não está completo':this.hooks.state().scanError?'Leitura parcial ou indisponível':data.ambiguous?'Mais de uma pasta correspondente':!data.exists?'Pasta ainda não encontrada':data.documents.length+' documentos no vault';
      const choice=this.find('root-choice');
      const rootOptions=data.roots.map(r=>`<option value="${esc(r)}" ${r===data.root&&!data.ambiguous?'selected':''}>${esc(r)}</option>`).join('');
      choice.innerHTML=data.roots.length>1?`<label class="field">Escolha a pasta de origem<select aria-label="Pasta de origem"><option value="">Selecionar…</option>${rootOptions}</select></label>`:'';
      choice.querySelector('select')?.addEventListener('change',async e=>{
        const path=e.target.value;if(!data.roots.includes(path))return;
        const generation=this.generation,epoch=this.hooks.epoch();
        try{await this.hooks.call('saveLibraryRoot',{library:id,path});if(!this.active||generation!==this.generation||epoch!==this.hooks.epoch())return;this.choice=path;await this.hooks.refresh();if(!this.active||generation!==this.generation||epoch!==this.hooks.epoch())return;this.folder=path;this.expanded.add(path);this.render();}
        catch(error){if(this.active)this.hooks.toast(error.message);}
      });
      const focusFolder=path=>[...tree.querySelectorAll('[data-folder-path]')].find(b=>b.dataset.folderPath===path)?.focus({preventScroll:true});
      tree.querySelectorAll('[data-folder-path]').forEach(b=>{
        const path=b.dataset.folderPath;
        b.onclick=()=>{this.folder=path;this.page=0;if(path!==data.root&&(childMap.get(path)||[]).length){this.expanded.has(path)?this.expanded.delete(path):this.expanded.add(path);}this.render();focusFolder(path);};
        b.onfocus=()=>tree.querySelectorAll('[data-folder-path]').forEach(x=>x.tabIndex=x===b?0:-1);
        b.onkeydown=e=>{
          const buttons=[...tree.querySelectorAll('[data-folder-path]')],index=buttons.indexOf(b);let target;
          if(e.key==='ArrowDown')target=buttons[Math.min(index+1,buttons.length-1)];
          else if(e.key==='ArrowUp')target=buttons[Math.max(0,index-1)];
          else if(e.key==='Home')target=buttons[0];else if(e.key==='End')target=buttons.at(-1);
          else if(e.key==='ArrowRight'){if(!this.expanded.has(path)){this.expanded.add(path);this.render();focusFolder(path);}else focusFolder(childMap.get(path)?.[0]);}
          else if(e.key==='ArrowLeft'){if(this.expanded.has(path)&&path!==data.root){this.expanded.delete(path);this.render();focusFolder(path);}else focusFolder(parent(path));}
          else return;e.preventDefault();target?.focus();
        };
      });
      list.querySelectorAll('[data-document-path]').forEach(b=>{
        b.onclick=()=>this.select(b.dataset.documentPath);
        b.onfocus=()=>{this.focused=b.dataset.documentPath;list.querySelectorAll('[data-document-path]').forEach(x=>x.tabIndex=x===b?0:-1);};
        b.onkeydown=e=>{
          let index=items.findIndex(x=>x.path===b.dataset.documentPath);
          if(e.key==='ArrowDown')index++;else if(e.key==='ArrowUp')index--;else if(e.key==='Home')index=0;else if(e.key==='End')index=items.length-1;else return;
          e.preventDefault();index=Math.max(0,Math.min(items.length-1,index));const target=items[index].path;this.focused=target;this.page=Math.floor(index/this.pageSize);this.render();this.focused=target;
          [...this.find('list').querySelectorAll('[data-document-path]')].find(x=>x.dataset.documentPath===target)?.focus();
        };
      });
      list.querySelectorAll('[data-page]').forEach(b=>b.onclick=()=>{this.page+=Number(b.dataset.page);this.focused='';this.render();this.find('list').querySelector('[data-document-path]')?.focus();});
      preview.querySelector('[data-retry]')?.addEventListener('click',()=>this.select(this.selected));
      preview.querySelector('#copy-'+id)?.addEventListener('click',async()=>{try{await this.hooks.call('copy',{text:doc.text||''});this.hooks.toast('Texto copiado.');}catch(e){this.hooks.toast(e.message);}});
      preview.querySelector('#open-'+id+'-note')?.addEventListener('click',()=>this.hooks.openNote(this.selected));
      this.hooks.bindMarkdown(preview,this.selected);
      [tree,list,preview].forEach((e,i)=>{e.scrollTop=positions[i][0];e.parentElement.scrollTop=positions[i][1];});
      if(focusPath){const selector=focusType==='folder'?'[data-folder-path]':'[data-document-path]';[...(focusType==='folder'?tree:list).querySelectorAll(selector)].find(b=>(b.dataset.folderPath||b.dataset.documentPath)===focusPath)?.focus({preventScroll:true});}
    }
  }
  global.OracleLibrary=Object.freeze({inventory,Library});
})(globalThis);
