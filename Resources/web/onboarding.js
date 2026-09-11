/* Oracle onboarding v1. Only the native bridge executes work; this module renders confirmed state. */
(function(){
'use strict';
const esc=v=>String(v??'').replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
const active=new Set(['starting','running','cancelling']);
const labels={AGENT_NAME:'Nome do seu companheiro',PRINCIPAL_NAME:'Como podemos chamar você?',AGENT_PURPOSE:'Para que o Oracle deve servir?',AGENT_TOP_JOBS:'Quais tarefas são mais importantes?',PRINCIPAL_CONTEXT:'Conte um pouco sobre seu trabalho e seus projetos',VOICE_REGISTER:'Como prefere que o Oracle se comunique?',PRINCIPAL_TIMEZONE:'Fuso horário'};
const limits={AGENT_NAME:64,PRINCIPAL_NAME:128,AGENT_PURPOSE:2048,AGENT_TOP_JOBS:2048,PRINCIPAL_CONTEXT:4096,VOICE_REGISTER:1024};
let api=null,root=null,dialog=null,card=null,current={},draft={answers:{AGENT_NAME:'Oracle',PRINCIPAL_TIMEZONE:Intl.DateTimeFormat().resolvedOptions().timeZone||'UTC'},catalogCollections:[],newVault:false,attach:false},stage='',review=null,timer=null,polling=false,open=false,origin=null,suspended=false,group=0,lastSignature='',lastCardSignature='',fromSettings=false;
const $=s=>root?.querySelector(s);
async function invoke(method,params={}){return api.call(method,params)}
function message(text){const e=$('[data-ob-message]');if(e){
 const detailed=String(text).includes('/Users/')||String(text).length>350;
 e.textContent=detailed?'Não foi possível concluir esta etapa. Confira os detalhes e tente novamente.':text;e.hidden=false;
 dialog.querySelector('[data-ob-error-detail]')?.remove();
 if(detailed){const d=document.createElement('details');d.dataset.obErrorDetail='';const s=document.createElement('summary');s.textContent='Detalhes do erro';const p=document.createElement('pre');p.textContent=text;d.append(s,p);e.after(d)}
 }else api.toast?.(text)}
function action(fn){return async e=>{const b=e?.currentTarget;if(b)b.disabled=true;try{await fn(e)}catch(err){message(err.message)}finally{if(b?.isConnected)b.disabled=false}}}
function backStep(){
 saveInputs();
 if(stage==='identity'&&group>0){group--;render();return}
 const previous={connection:'vault',identity:'connection',review:draft.attach?'connection':'identity',readback:'progress',request:'progress'}[stage];
 if(previous){if(stage==='review'&&!draft.attach)group=2;navigate(previous);return}
 close();if(fromSettings)api.openSettings?.();
}
function breadcrumbs(){
 const steps=[['vault','Obsidian'],['connection','Codex'],['identity','Identidade'],['review','Revisão']];
 const names={license:'Acesso',connection:'Codex',vault:'Obsidian',identity:['Identidade','Objetivos','Preferências'][group],review:'Revisão',progress:'Progresso',readback:'Confirmação',request:'Solicitação do Codex'};
 const path=[{label:'Universo',go:close}];
 if(fromSettings)path.push({label:'Ajustes',go:()=>{close();api.openSettings?.()}});
 path.push({label:'Configuração',go:()=>navigate(current.runID?'progress':!current.licensed&&!current.legacyAccess?'license':'connection')});
 if(['readback','request'].includes(stage))path.push({label:'Progresso',go:()=>navigate('progress')});
 else if(!current.runID){
  const end=steps.findIndex(([id])=>id===stage);
  for(const [id,label] of steps.slice(0,Math.max(0,end))){if(id==='identity'&&draft.attach)continue;path.push({label,go:()=>{saveInputs();if(id==='identity')group=0;navigate(id)}})}
  if(stage==='identity')for(let i=0;i<group;i++)path.push({label:['Identidade','Objetivos','Preferências'][i],go:()=>{saveInputs();group=i;render()}});
 }
 const nav=document.createElement('nav');nav.className='modal-breadcrumb';nav.setAttribute('aria-label','Caminho da configuração');
 const back=document.createElement('button');back.type='button';back.id='ob-breadcrumb-back';back.textContent='← Voltar';back.setAttribute('aria-label','Voltar');back.onclick=backStep;nav.append(back);
 const list=document.createElement('ol');
 for(const item of [...path,{label:names[stage]||'Progresso'}]){const li=document.createElement('li'),el=document.createElement(item.go?'button':'span');el.textContent=item.label;if(item.go){el.type='button';el.onclick=item.go}else el.setAttribute('aria-current','page');li.append(el);list.append(li)}
 nav.append(list);return nav;
}
function frame(title,body,buttons=''){
 dialog.innerHTML=`<div class="ob-heading"><div><img class="ob-brand" src="brand/lockup-white.svg" alt="Oracle" width="143"></div><button type="button" class="ob-close" aria-label="Fechar configuração">×</button></div><div class="ob-body"><h1 id="ob-title" tabindex="-1">${title}</h1>${body}<p data-ob-message role="alert" hidden></p></div><footer>${buttons}</footer>`;
 dialog.querySelector('.ob-close').onclick=close;const navigation=document.createElement('div');navigation.className='ob-navigation';navigation.append(breadcrumbs());dialog.querySelector('.ob-heading').after(navigation);
 for(const b of dialog.querySelectorAll('[data-ob-back]'))b.onclick=()=>navigate(b.dataset.obBack);
 (dialog.querySelector('input:not([type=checkbox]),textarea')||dialog.querySelector('h1'))?.focus({preventScroll:true});
}
const button=(id,text,primary=true)=>`<button type="button" class="ob-button ${primary?'ob-primary':''}" id="${id}">${text}</button>`;
const back=(to)=>`<button type="button" class="ob-button" data-ob-back="${to}">← Voltar</button>`;
function reveal(){if(suspended)return;origin=document.activeElement;if(!dialog.open)dialog.showModal();open=true;render();renderCard()}
function close(){saveInputs();open=false;dialog.close();origin?.focus?.();renderCard()}
let draftSave=Promise.resolve(),draftSaveFailure=null;
function persistDraft(){
 const payload=JSON.parse(JSON.stringify(draft));
 draftSave=draftSave.catch(()=>{}).then(async()=>{
  try{await invoke('onboardingDraft',payload);draftSaveFailure=null}
  catch(error){draftSaveFailure=error;message('Não foi possível salvar suas respostas. Elas continuam nesta tela; tente novamente.')}
 });
 return draftSave;
}
async function flushDraft(){let pendingSave;do{pendingSave=draftSave;await pendingSave}while(pendingSave!==draftSave);if(draftSaveFailure)throw draftSaveFailure}
function saveInputs(){
 if(!open)return;
 if(stage==='identity'){for(const input of dialog.querySelectorAll('[data-answer]'))draft.answers[input.dataset.answer]=input.value;if($('#ob-maintenance'))draft.maintenance={enabled:$('#ob-maintenance').checked,autoCapture:false,remoteProcessing:false,timezone:draft.answers.PRINCIPAL_TIMEZONE||'UTC',hour:3}}
 if(stage==='vault'){draft.newVault=!!$('#ob-new')?.checked;draft.attach=!!$('#ob-attach')?.checked;draft.catalogCollections=[]}
 if(['identity','vault'].includes(stage)&&(current.licensed||current.legacyAccess)&&!active.has(current.status))persistDraft();
}
function navigate(next){saveInputs();stage=next;render()}
function render(){
 if(!open)return;
 if(stage==='license'){
  frame('Seu universo começa aqui.',`<p>Insira o código individual de acesso recebido de Mateus.</p><label for="ob-code">Código de acesso</label><textarea id="ob-code" rows="4" autocomplete="off" autocapitalize="off" spellcheck="false" placeholder="Cole seu código ORACLE2 aqui"></textarea><details><summary>Pedido de acesso para este Mac</summary><p>Gere o identificador e envie a Mateus. Esta ação guarda um vínculo local no Chaves do macOS; não envia informações pela rede.</p>${button('ob-device-request',current.deviceID?'Verificar pedido deste Mac':'Gerar pedido deste Mac',false)}${current.deviceID?`<p><code>${esc(current.deviceID)}</code></p>${button('ob-copy-device','Copiar identificador',false)}`:''}${current.deviceBindingMessage?`<p role="alert">${esc(current.deviceBindingMessage)}</p>`:''}<p>A licença individual não expira e é validada offline. Trocar de Mac exige uma nova emissão vinculada ao destino. O Codex precisa de internet para executar a instalação.</p></details>`,button('ob-activate','Ativar acesso'));
  $('#ob-device-request').onclick=action(async()=>{const typedCode=$('#ob-code').value;const request=await invoke('onboardingDeviceRequest');current.deviceID=request.deviceID;current.deviceBindingMessage=null;render();$('#ob-code').value=typedCode;dialog.querySelector('details').open=true});
  if($('#ob-copy-device'))$('#ob-copy-device').onclick=action(()=>invoke('copy',{text:current.deviceID}));
  $('#ob-activate').onclick=action(async()=>{await invoke('onboardingActivate',{code:$('#ob-code').value});$('#ob-code').value='';await poll();stage='vault';render()});
 }else if(stage==='connection'){
  frame('Conecte ao Codex.',`<p>O Codex executa a instalação. O Oracle acompanha cada etapa e mantém seu conhecimento no Obsidian.</p><div class="ob-status">${OracleStatusBadge.render(current.codexConnected?'connected':current.authorizing?'pending':current.codexConnected===false?'disconnected':'unverified',current.codexConnected?'Codex conectado':current.authorizing?'Aguardando autorização':current.codexConnected===false?'Desconectado':'Não verificado')}${!current.codexConnected?'<p>Autorize sua conta ChatGPT no Codex para continuar.</p>':''}</div><p class="ob-muted">A autorização acontece na página do Codex. Senhas e tokens ficam sob controle dele.</p>`,button('ob-connect',current.codexConnected?'Verificar conexão':'Conectar Codex',!current.codexConnected)+(current.authorizing?button('ob-cancel-login','Cancelar autorização',false):'')+button('ob-next','Continuar',true));
  if(current.codexConnected){const models=document.createElement('details');models.innerHTML=`<summary>Modelo do Codex${current.modelSelection?' · '+esc(current.modelSelection.displayName):''}</summary><label for="ob-model">Modelo disponível na sua conta</label><select id="ob-model"><option value="">Escolha um modelo</option>${(current.models||[]).map(m=>`<option value="${esc(m.model)}" ${m.model===current.modelSelection?.model?'selected':''}>${esc(m.displayName)}</option>`).join('')}</select>${current.modelSelectionError?`<p role="alert">${esc(current.modelSelectionError)}</p>`:''}<p class="ob-muted">Usaremos o esforço padrão compatível informado pelo Codex.</p>`;if(!current.modelSelection)models.open=true;dialog.querySelector('.ob-body').append(models);$('#ob-model').onchange=action(async()=>{const model=$('#ob-model').value;if(!model)return;await flushDraft();await invoke('onboardingSelectModel',{model});draft.model=model;await poll();render()})}
  $('#ob-next').disabled=!current.codexConnected||!current.modelSelection;if($('#ob-cancel-login'))$('#ob-cancel-login').onclick=action(async()=>{await invoke('onboardingCancelLogin');await poll();render()});
  $('#ob-connect').onclick=action(async()=>{const r=await invoke('onboardingConnect');current.codexConnected=r.connected;await poll();render();if(!r.connected)message(r.message||'Conclua a autorização no navegador.');else invoke('codexPlugins').then(()=>api.refresh?.()).catch(()=>{})});
  $('#ob-next').onclick=action(async()=>{await flushDraft();if(current.status==='review'){navigate('review');return}if(draft.attach){await prepareReview()}else{group=0;navigate('identity')}});
 }else if(stage==='vault'){
  frame('Escolha seu Obsidian.',`<p>Escolha seu vault atual ou crie uma pasta no seletor do macOS. Seus documentos existentes permanecem no lugar.</p><div class="ob-selection"><span>${esc(current.vaultName||'Nenhuma pasta selecionada')}</span>${button('ob-vault','Escolher pasta…',false)}</div><label class="ob-check"><input type="checkbox" id="ob-new" ${draft.newVault?'checked':''}>Preparar as pastas essenciais do Oracle</label><p class="ob-muted">Pessoal e Profissional aproveitam pastas existentes. A instalação prepara o GBrain oficial; pacotes opcionais não são instalados automaticamente.</p><details ${draft.attach?'open':''}><summary>Já utilizo o GBrain</summary><label class="ob-check"><input type="checkbox" id="ob-attach" ${draft.attach?'checked':''}>Conectar minha instalação existente</label><div id="ob-existing" ${draft.attach?'':'hidden'}>${button('ob-brain',current.hasExistingBrain?'Trocar instalação existente…':'Selecionar instalação existente…',false)}<p class="ob-muted">Sua identidade e seu banco existentes serão preservados.</p></div></details>`,button('ob-vault-next','Continuar'));
  $('#ob-attach').onchange=()=>{$('#ob-existing').hidden=!$('#ob-attach').checked};
  $('#ob-vault').onclick=action(async()=>{saveInputs();await flushDraft();const r=await invoke('onboardingChooseVault');if(r){await api.refresh?.();await poll();render()}});
  $('#ob-brain').onclick=action(async()=>{saveInputs();await flushDraft();const r=await invoke('onboardingChooseBrain');if(r){await poll();render()}});
  $('#ob-vault-next').onclick=action(async()=>{saveInputs();await flushDraft();if(!current.hasVault)throw Error('Escolha uma pasta para continuar.');if(draft.attach&&!current.hasExistingBrain)throw Error('Escolha a instalação existente do Second Brain.');navigate('connection')});
 }else if(stage==='identity'){
  const groups=[['AGENT_NAME','PRINCIPAL_NAME'],['AGENT_PURPOSE','AGENT_TOP_JOBS'],['PRINCIPAL_CONTEXT','VOICE_REGISTER']];
  frame(['Vamos nos conhecer.','O que vamos construir?','Do seu jeito.'][group],`<p>${['Dois nomes para começar.','Conte o que faz diferença no seu dia.','Suas respostas orientarão a memória. Você poderá revisá-las antes de confirmar.'][group]}</p><div class="ob-fields">${groups[group].map(k=>`<label for="ob-${k}">${labels[k]}</label>${limits[k]<=128?`<input id="ob-${k}" data-answer="${k}" maxlength="${limits[k]}" value="${esc(draft.answers[k]||'')}">`:`<textarea id="ob-${k}" data-answer="${k}" rows="3" maxlength="${limits[k]}">${esc(draft.answers[k]||'')}</textarea>`}`).join('')}${group===0?`<label for="ob-timezone">Fuso horário sugerido</label><input id="ob-timezone" data-answer="PRINCIPAL_TIMEZONE" maxlength="80" value="${esc(draft.answers.PRINCIPAL_TIMEZONE||'UTC')}">`:''}</div>`,button('ob-identity-back','← Voltar',false)+button('ob-identity-next',group===2?'Revisar':'Continuar'));
  if(group===2){const consent=document.createElement('div');consent.innerHTML=`<label class="ob-check"><input type="checkbox" id="ob-maintenance" ${draft.maintenance?.enabled?'checked':''}>Autorizar manutenção local diária</label><p class="ob-muted">Às 3h ou na próxima abertura elegível do Oracle, verifica o índice local. Sem captura de conversas, envio remoto ou publicação. Pode ser pausada nos Ajustes.</p>`;dialog.querySelector('.ob-fields').append(consent)}
  $('#ob-identity-back').onclick=()=>{saveInputs();if(group>0){group--;render()}else navigate('connection')};
  $('#ob-identity-next').onclick=action(async()=>{saveInputs();for(const k of groups[group])if(!draft.answers[k]?.trim())throw Error('Preencha os dois campos para continuar.');if(group<2){group++;render()}else await prepareReview()});
 }else if(stage==='review'){
  frame('Tudo pronto para começar.',`<dl class="ob-review"><dt>Obsidian</dt><dd>${esc(current.vaultName)}</dd><dt>Second Brain</dt><dd>${draft.attach?'Conectar instalação existente':'Criar memória local exclusiva para este Oracle'}</dd><dt>Estrutura</dt><dd>${draft.newVault?'Criar pastas planejadas':'Preservar a estrutura atual'}</dd><dt>Áreas de notas</dt><dd>Pessoal e Profissional — aproveitar as pastas existentes ou criar as que faltam</dd><dt>Especialistas</dt><dd>${draft.catalogCollections.length?esc(draft.catalogCollections.join(', ')):'Nenhum pacote novo selecionado'}</dd></dl>${!draft.attach?`<details open><summary>Suas respostas</summary><dl class="ob-review">${Object.keys(labels).map(k=>`<dt>${labels[k]}</dt><dd>${esc(draft.answers[k])}</dd>`).join('')}</dl></details>`:''}<p>Ao instalar, você autoriza o Codex a criar os componentes escolhidos na pasta selecionada e no espaço local do Oracle. Alterações conflitantes serão preservadas.</p>`,back(draft.attach?'vault':'identity')+button('ob-install','Instalar Oracle'));
  $('#ob-install').onclick=action(async()=>{await flushDraft();if(!current.codexConnected){navigate('connection');return}if(!review)throw Error('Revise novamente a configuração.');await invoke('onboardingInstall',{hash:review.plan_hash});await poll();close()});
 }else if(stage==='readback'){
  // Exact official readback stays visible; the protocol hash is only submitted, never edited.
  frame('Confirme sua identidade.',`<p>Confira a leitura de confirmação preparada pelo Second Brain.</p><pre class="ob-readback">${esc(readbackText(current.readback?.text||'Suas respostas já foram confirmadas.'))}</pre>`,button('ob-confirm-identity','Confirmar e continuar'));
  $('#ob-confirm-identity').onclick=action(async()=>{await invoke('onboardingConfirmIdentity',{hash:current.readback.hash});await poll();if(!active.has(current.status)){await invoke('onboardingResume');await poll();close()}else{message('Respostas confirmadas. Aguarde o Codex encerrar a etapa e clique em Retomar.')}});
 }else if(stage==='request'){
  const req=current.request;
  if(!req){navigate('progress');return}
  const isQuestion=req.kind==='item/tool/requestUserInput';
  frame(isQuestion?'O Codex precisa saber…':'Permitir esta etapa?',`<p>${esc(req.reason)}</p>${isQuestion?(req.questions||[]).map(q=>`<label for="ob-q-${esc(q.id)}">${esc(q.question)}</label><textarea id="ob-q-${esc(q.id)}" data-question="${esc(q.id)}" rows="3"></textarea>${q.options?.length?`<p class="ob-muted">${q.options.map(x=>esc(x.label)).join(' · ')}</p>`:''}`).join(''):`<details open><summary>O que o Codex solicitou</summary><pre>${esc(req.command||JSON.stringify(req.permissions,null,2))}</pre>${req.cwd?`<p class="ob-muted">${esc(req.cwd)}</p>`:''}${req.grantRoot?`<p>Permitir gravação em: ${esc(req.grantRoot)}</p>`:''}</details>`}`,isQuestion?button('ob-send-answer','Enviar resposta'):button('ob-decline','Não permitir',false)+button('ob-allow','Permitir uma vez'));
  async function answer(allow){const p={id:req.id,allow};if(isQuestion){p.answers={};for(const e of dialog.querySelectorAll('[data-question]'))p.answers[e.dataset.question]={answers:[e.value]}}await invoke('onboardingAnswer',p);await poll();if(current.request){stage='request';render()}else close()}
  if(isQuestion)$('#ob-send-answer').onclick=action(()=>answer(false));else{$('#ob-allow').onclick=action(()=>answer(true));$('#ob-decline').onclick=action(()=>answer(false))}
 }else{
  frame(current.status==='completed'?'Seu Oracle está pronto.':'Seu universo está tomando forma.',`<p>${esc(current.message||'Continue a configuração do seu Oracle.')}</p><ul class="ob-confirmed">${(current.confirmed||[]).filter(x=>x.kind!=='skill').map(x=>`<li>✓ ${esc(x.label)}</li>`).join('')}</ul>${(current.confirmed||[]).some(x=>x.kind==='skill')?`<p>${current.confirmed.filter(x=>x.kind==='skill').length} ${current.confirmed.filter(x=>x.kind==='skill').length===1?'skill verificada':'skills verificadas'}</p>`:''}${current.detail?`<details><summary>Ver detalhes</summary><p>${esc(current.detail)}</p></details>`:''}${current.status==='completed'?'<details><summary>Configuração avançada</summary><p>A observação de tarefas por hooks pode ser ativada pelo mecanismo de confiança do Codex.</p></details>':''}`,button('ob-progress-close','Voltar ao universo',false)+button('ob-open-codex','Abrir no Codex',false)+(!active.has(current.status)&&current.status!=='completed'?button('ob-resume','Retomar'):''));
  $('#ob-progress-close').onclick=close;$('#ob-open-codex').onclick=action(()=>invoke('onboardingOpenCodex'));
  if($('#ob-resume'))$('#ob-resume').onclick=action(async()=>{if(!current.codexConnected){navigate('connection');return}await invoke('onboardingResume');await poll();close()});
 }
}
function readbackText(text){const names={...labels,SOUL_RELATIONSHIP:'Papel na colaboração',SOUL_MODE_DEFAULT:'Como agir diante de dúvidas',SOUL_WINCE:'O que evitar',SOUL_WORLDVIEW:'Visão de mundo',SOUL_GOOD_OUTPUT:'O que define uma boa entrega'};return text.replace(/^read-back hash:.*$/gm,'').replace(/^(?:\* )?\s*([A-Z_]+):/gm,(all,k)=>(names[k]||k)+':').replace(/\(default:/g,'(padrão:').trim()}
async function prepareReview(){saveInputs();await flushDraft();review=await invoke('onboardingPlan',draft);stage='review';await poll();render()}
function renderCard(){
 if(!card)return;
 const hasRun=!!current.runID,needed=!current.licensed&&!current.legacyAccess;
 card.hidden=suspended||open||(!hasRun&&!needed&&current.legacyAccess)||(!needed&&current.status==='completed');
 if(card.hidden){lastCardSignature='';return}
 const signature=JSON.stringify([current.status,current.message,current.confirmed,!!current.readback,current.request?.id,needed]);
 if(signature===lastCardSignature)return;lastCardSignature=signature;
 const running=active.has(current.status),title=needed?'Ative seu Oracle':current.message||(hasRun?'Continue a configuração':'Comece seu Oracle');
 card.innerHTML=`<div class="ob-card-copy"><strong>${esc(title)}</strong>${hasRun?`<span>${(current.confirmed||[]).filter(x=>x.kind==='skill').length} ${(current.confirmed||[]).filter(x=>x.kind==='skill').length===1?'skill verificada':'skills verificadas'}</span>`:''}</div><div class="ob-card-actions">${running?button('ob-cancel','Cancelar',false):button('ob-continue',current.status==='completed'?'Concluído':needed?'Inserir código':current.readback?'Revisar respostas':current.request?'Responder ao Codex':'Continuar',false)}</div>${running?'<div class="ob-working" aria-label="Codex em execução"></div>':''}`;
 if($('#ob-cancel'))$('#ob-cancel').onclick=action(async()=>{await invoke('onboardingCancel');await poll()});
 if($('#ob-continue'))$('#ob-continue').onclick=()=>{if(current.status==='completed'){card.dataset.dismissed='true';card.hidden=true;clearInterval(timer);timer=null;return}stage=resolveStage();reveal()};
}
function resolveStage(){
 if(!current.licensed&&!current.legacyAccess)return 'license';
 if(!current.hasVault)return 'vault';
 if(current.status==='review')return 'review';
 if(current.request)return 'request';
 if(current.readback)return 'readback';
 if(current.status==='completed')return 'progress';
 if(!current.codexConnected)return 'connection';
 return current.runID?'progress':'vault';
}
async function poll(){
 if(polling||!api||suspended)return;polling=true;
 try{
  const priorConnection=current.codexConnected,priorAuthorizing=current.authorizing,priorStatus=current.status;current=await invoke('onboardingStatus');
  if(current.status==='completed'&&priorStatus!=='completed'&&open&&['progress','request','readback'].includes(stage)){close();api.refresh?.()}
  if(current.status==='review')review=current.reviewPlan||(review?.id===current.runID?review:null);
  const signature=JSON.stringify([current.runID,current.status,current.phase,current.confirmed]);
  if(signature!==lastSignature){lastSignature=signature;window.dispatchEvent(new CustomEvent('oracle:onboarding-progress',{detail:{schemaVersion:1,runID:current.runID,status:current.status,phase:current.phase,confirmed:current.confirmed||[],completed:current.completed,total:current.total}}));if(active.has(current.status)||current.status==='completed')api.refresh?.()}
  renderCard();
  if(open&&stage==='connection'&&(current.codexConnected!==priorConnection||current.authorizing!==priorAuthorizing))render();
  if(open&&stage==='progress'&&(current.request||current.readback)){stage=current.request?'request':'readback';render()}
 }catch(e){message(e.message)}finally{polling=false}
}
async function mount(options){
 api=options;suspended=false;
 if(!root){root=document.createElement('section');root.className='oracle-onboarding';root.innerHTML='<dialog aria-labelledby="ob-title" class="ob-dialog"></dialog><aside class="ob-progress-card" aria-label="Configuração do Oracle" hidden></aside>';document.body.append(root);dialog=root.querySelector('dialog');card=root.querySelector('aside');dialog.addEventListener('input',()=>{if(stage==='identity'||stage==='vault'){clearTimeout(dialog.draftTimer);dialog.draftTimer=setTimeout(saveInputs,200)}});dialog.addEventListener('cancel',e=>{e.preventDefault();close()});dialog.addEventListener('click',e=>{const r=dialog.getBoundingClientRect();if(e.target===dialog&&(e.clientX<r.left||e.clientX>r.right||e.clientY<r.top||e.clientY>r.bottom))close()});}
 await poll();if(current.draft)draft={...draft,...current.draft,answers:{...draft.answers,...current.draft.answers}};
 if(!timer)timer=setInterval(async()=>{await poll();if(open&&stage==='connection'&&!current.codexConnected){try{const r=await invoke('onboardingCheckConnection');if(r.connected){current.codexConnected=true;render();invoke('codexPlugins').then(()=>api.refresh?.()).catch(()=>{})}}catch{}}},1800);
 if(!current.legacyAccess&&current.status==='not_started'){stage=resolveStage();reveal()}
}
function suspend(){saveInputs();suspended=true;open=false;dialog?.close();dialog?.replaceChildren();if(card)card.hidden=true;clearInterval(timer);timer=null;draft={answers:{AGENT_NAME:'Oracle',PRINCIPAL_TIMEZONE:Intl.DateTimeFormat().resolvedOptions().timeZone||'UTC'},catalogCollections:[],newVault:false,attach:false};current={};review=null;stage='';}
window.OracleOnboarding={mount,formatReadback:readbackText,open(options={}){fromSettings=!!options.fromSettings;stage=resolveStage();reveal()},async prepareToClose(){if(open)saveInputs();await flushDraft()},suspend,poll,getState:()=>({...current})};
})();
