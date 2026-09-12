/* Read-only, extractive overview of existing documents and memory sources.
 * Content stays local to this dialog; no inference, persistence or account sync. */
window.OracleKnowledgeHub={open(hooks){
 const {esc,icon}=hooks,entries=hooks.entries||[],areas=OracleKnowledge.areas(entries);
 const tabs=[{id:'personal',name:'Vida pessoal',icon:'person',description:'Quem você é, o que importa e os planos que orientam sua vida.'},{id:'professional',name:'Vida profissional',icon:'code',description:'Sua atuação, sua empresa e o que você está construindo.'},{id:'memory',name:'Memórias',icon:'brain',description:'O contexto que acompanha suas conversas, escolhas e próximos passos.'}];
 let active='personal',generation=0;const cache=new Map();
 if(hooks.modal(`<h1>Seu conhecimento</h1><div class="knowledge-hub"><nav class="hub-tabs" role="tablist" aria-label="Áreas do conhecimento">${tabs.map((t,i)=>`<button type="button" role="tab" id="hub-tab-${t.id}" aria-controls="hub-panel" aria-selected="${i===0}" tabindex="${i===0?0:-1}" data-hub-tab="${t.id}">${icon(t.icon)}<span>${t.name}</span></button>`).join('')}</nav><section id="hub-panel" role="tabpanel" tabindex="0" aria-labelledby="hub-tab-personal"></section></div>`,{family:'knowledge-hub',key:'knowledge-hub'})===false)return;
 const root=document.querySelector('.knowledge-hub'),panel=root.querySelector('#hub-panel');
 const title=()=>`<div class="hub-intro"><h2>${tabs.find(t=>t.id===active).name}</h2><p>${tabs.find(t=>t.id===active).description}</p></div>`;
 const plain=text=>String(text||'').replace(/!\[[^\]]*\]\([^)]*\)/g,'').replace(/\[([^\]]+)\]\([^)]*\)/g,'$1').replace(/\[\[([^\]|]+)\|?([^\]]*)\]\]/g,(_,path,label)=>label||path).replace(/<[^>]*>/g,'').replace(/[*_`]/g,'').replace(/^[-*>]\s*/,'').replace(/\s+/g,' ').trim();
 const shorten=(text,max=440)=>text.length<=max?text:text.slice(0,max).replace(/\s+\S*$/,'')+'…';
 function excerpts(text){
  const blocks=String(text||'').replace(/^---\r?\n[\s\S]*?\r?\n---\r?\n/,'').replace(/```[\s\S]*?```/g,'').split(/\r?\n\s*\r?\n/);let heading='';const out=[];
  for(const block of blocks){const lines=block.split(/\r?\n/);const body=[];for(const line of lines){if(/^#{1,6}\s/.test(line)){heading=plain(line.replace(/^#+\s*/,''));continue}if(!/^\s*\|/.test(line))body.push(line)}const value=plain(body.map(line=>line.replace(/^\s*(?:[-*+]|\d+[.)])\s+/,'')).join(' '));if(value.length>24)out.push({text:shorten(value),heading})}
  return out;
 }
 const definitions={
  personal:[['Quem você é',/identidade|sobre mim|perfil|quem|familia|família/],['Rotina e interesses',/rotina|saude|saúde|habito|hábito|interesse|lazer|aprend/],['Planos e prioridades',/plano|objetivo|meta|prioridade|proximo|próximo|futuro/]],
  professional:[['Atuação e empresa',/empresa|negocio|negócio|atuacao|atuação|perfil|oferta|servico|serviço|cliente|produto/],['Projetos e responsabilidades',/projeto|responsab|entrega|equipe|constru|trabalho/],['Direção profissional',/objetivo|meta|prioridade|carreira|direção|direcao|proximo|próximo|estrateg|estratég/]],
  memory:[['Preferências e decisões',/prefere|preferencia|preferência|decis|escolh|combin|lembra/],['Assuntos em andamento',/projeto|andamento|penden|próximo|proximo|objetivo|plano/],['Contexto preservado',/.*/]]
 };
 function summary(model){
  const seen=new Set(),all=[];
  for(const doc of model.docs)for(const item of excerpts(doc.text)){const key=item.text.toLocaleLowerCase('pt-BR');if(!seen.has(key)){seen.add(key);all.push({...item,doc})}}
  const groups=definitions[active].map(([name,pattern])=>({name,pattern,items:[]}));
  for(const item of all){const subject=item.heading+' '+item.text;const group=groups.find(g=>g.pattern.test(item.heading))||groups.find(g=>g.pattern.test(subject))||groups[0];group.items.push(item)}
  const lead=all.find(x=>/resumo|panorama|identidade|sobre|perfil|contexto/i.test(x.heading))||all[0];
  const included=new Set(lead?[lead.doc]:[]);
  const cards=groups.map(group=>{const items=group.items.filter(x=>x!==lead).slice(0,4);items.forEach(x=>included.add(x.doc));return items.length?`<section class="hub-topic"><h3>${esc(group.name)}</h3><ul>${items.map(x=>`<li>${esc(x.text)}</li>`).join('')}</ul></section>`:''}).join('');
  panel.innerHTML=title()+(window.ORACLE_PREVIEW?'<div class="hub-demo">Perfil de demonstração · dados fictícios</div>':'')+(active==='memory'?providers(model):'')+(lead?`<article class="hub-overview"><span class="hub-eyebrow">Panorama</span><p>${esc(lead.text)}</p></article>${cards?'<div class="hub-topics">'+cards+'</div>':''}`:`<div class="hub-empty">${model.errors.length?'O resumo está indisponível porque não foi possível ler as fontes.':'Ainda não há contexto suficiente para apresentar um resumo desta área.'}</div>`)+(model.errors.length?`<p class="hub-summary-status" role="status">${model.docs.length?'Resumo parcial. ':''}${model.errors.length} ${model.errors.length===1?'fonte não pôde ser lida':'fontes não puderam ser lidas'}.</p>`:'')+`<details class="hub-provenance"><summary>Sobre este resumo</summary><p>Trechos dos registros disponíveis, organizados por assunto. ${model.total>model.docs.length?'Este panorama usa '+model.docs.length+' de '+model.total+' registros encontrados. ':' '}As informações refletem suas fontes e podem incluir registros antigos.</p><div>${[...included].map((doc,i)=>`<button type="button" data-hub-source="${i}">${icon('note')}<span>${esc(doc.title)}<small>${esc(doc.origin)}</small></span></button>`).join('')}</div>${model.errors.length?`<p>${esc(model.errors[0])}</p>`:''}</details><div class="hub-summary-actions">${model.more?'<button class="secondary" type="button" data-hub-more>Ampliar resumo</button>':''}${model.errors.length?'<button class="secondary" type="button" data-hub-retry>Tentar novamente</button>':''}${active==='memory'?'<button class="quiet-link" type="button" data-hub-conversations>Ver conversas disponíveis</button>':''}</div>`;
  panel.querySelectorAll('[data-hub-source]').forEach(b=>b.onclick=()=>[...included][Number(b.dataset.hubSource)].open());
  panel.querySelector('[data-hub-more]')?.addEventListener('click',()=>load(true));
  panel.querySelector('[data-hub-retry]')?.addEventListener('click',()=>{cache.delete(active);load()});
  panel.querySelector('[data-hub-conversations]')?.addEventListener('click',()=>hooks.conversations());
 }
 function providers(model){
  const items=[['Codex · ChatGPT',/codex|chatgpt/i],['Claude Code',/claude|cloud.?code/i]];
  return `<div class="hub-providers">${items.map(([label,re])=>{const count=model.docs.filter(d=>re.test(d.provider||d.origin)).length;return `<div><strong>${label}</strong><span>${count?'Contexto disponível':'Sem contexto disponível nesta instalação'}</span></div>`}).join('')}</div>`;
 }
 function localFiles(id){
  const area=areas.find(a=>a.id===id),roots=area?.exists?[area.path]:[];
  if(id==='professional')roots.push('PROJETOS');
  const score=e=>/resumo|perfil|identidade|sobre|contexto|visao|visão/i.test(e.path)?0:/AGENTS\.md$/i.test(e.path)?3:1;
  return entries.filter(e=>!e.directory&&/\.md$/i.test(e.path)&&!/(?:^|\/)AGENTS\.md$/i.test(e.path)&&roots.some(r=>e.path.startsWith(r+'/'))).sort((a,b)=>score(a)-score(b)||a.path.split('/').length-b.path.split('/').length||a.path.localeCompare(b.path,'pt-BR'));
 }
 async function readLocal(id,limit){
  const files=localFiles(id),chosen=files.slice(0,limit),model={docs:[],errors:[],total:files.length,more:files.length>limit,limit};
  // Bound native reads, including when the user changes tabs during loading.
  for(let i=0;i<chosen.length;i+=3){const rows=await Promise.allSettled(chosen.slice(i,i+3).map(async e=>{const doc=await hooks.call('read',{path:e.path});return {title:e.name?.replace(/\.md$/i,'')||e.path.split('/').at(-1),origin:e.path,text:doc.text||'',open:()=>hooks.openNote(e.path)}}));for(const row of rows)if(row.status==='fulfilled')model.docs.push(row.value);else model.errors.push(row.reason?.message||'Leitura indisponível')}
  return model;
 }
 async function readMemory(limit){
  const model={docs:[],errors:[],total:0,more:false,limit};
  const [status,conversations]=await Promise.allSettled([hooks.call('gbrainRead',{operation:'status'}),hooks.call('conversations')]);
  if(status.status==='fulfilled'){
   const sources=status.value.sources||[];
   // Each query stays scoped to its registered source. Names alone do not prove account access.
   for(const source of sources){try{
    const hits=await hooks.call('gbrainRead',{operation:'list',source:source.id});
    if(!Array.isArray(hits)||hits.some(h=>h.source_id&&h.source_id!==source.id))throw Error('A origem dos resultados não corresponde à fonte selecionada.');
    model.total+=hits.length;if(hits.length>limit)model.more=true;
    for(const hit of hits.slice(0,limit)){try{const slug=hit.slug||hit.page_slug;if(!slug)continue;const page=await hooks.call('gbrainRead',{operation:'get',source:source.id,slug});if(page.source_id&&page.source_id!==source.id)throw Error('Origem da memória incompatível');model.docs.push({title:page.title||hit.title||slug,origin:source.name||source.id,provider:source.id+' '+(source.name||''),text:page.compiled_truth||'',open:()=>hooks.memoryPage(slug,source.id)})}catch(error){model.errors.push(error.message)}}
   }catch(error){model.errors.push(error.message)}}
  }else model.errors.push(status.reason?.message||'Memórias indisponíveis');
  if(conversations.status==='fulfilled'){
   const items=conversations.value||[];model.total+=items.length;if(items.length>limit)model.more=true;
   for(const c of items.slice(-limit))model.docs.push({title:c.title||'Conversa',origin:c.source||'Conversa importada',text:(c.messages||[]).slice(-6).map(m=>m.text||'').join('\n\n'),open:()=>hooks.conversations()});
  }else model.errors.push(conversations.reason?.message||'Conversas indisponíveis');
  return model;
 }
 async function load(more=false){
  const id=active,token=++generation,previous=cache.get(id),limit=more?(previous?.limit||12)+12:12;
  if(previous&&!more){summary(previous);return}
  panel.innerHTML=title()+'<div class="hub-summary-loading" role="status">Reunindo o contexto disponível…<span>Organizando informações e assuntos importantes.</span></div>';
  try{const model=await (id==='memory'?readMemory(limit):readLocal(id,limit));cache.set(id,model);if(token===generation&&active===id)summary(model)}catch(error){if(token===generation&&active===id)summary({docs:[],errors:[error.message],total:0})}
 }
 function select(id){active=id;root.querySelectorAll('[data-hub-tab]').forEach(b=>{const selected=b.dataset.hubTab===id;b.setAttribute('aria-selected',String(selected));b.tabIndex=selected?0:-1});panel.setAttribute('aria-labelledby','hub-tab-'+id);void load()}
 root.querySelectorAll('[data-hub-tab]').forEach((button,index)=>{button.onclick=()=>select(button.dataset.hubTab);button.onkeydown=e=>{let next;if(e.key==='ArrowRight')next=(index+1)%3;if(e.key==='ArrowLeft')next=(index+2)%3;if(e.key==='Home')next=0;if(e.key==='End')next=2;if(next!==undefined){e.preventDefault();const tab=root.querySelectorAll('[data-hub-tab]')[next];tab.focus();select(tab.dataset.hubTab)}}});
 void load();
}};
