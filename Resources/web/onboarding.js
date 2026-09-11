/* Native local onboarding. A rendered animation is never installation evidence.
   Draft inputs, immutable reviewed plan, and ephemeral protocol answers are separate. */
(function () {
  'use strict';
  const esc=v=>String(v??'').replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
  const active=new Set(['starting','running','cancelling']);
  const labels={AGENT_NAME:'Nome do seu companheiro',PRINCIPAL_NAME:'Como podemos chamar você?',AGENT_PURPOSE:'Para que o Oracle deve servir?',AGENT_TOP_JOBS:'Quais tarefas são importantes?',PRINCIPAL_CONTEXT:'Seu trabalho, responsabilidades e projetos',VOICE_REGISTER:'Como prefere que o Oracle se comunique?',PRINCIPAL_TIMEZONE:'Fuso horário'};
  const limits={AGENT_NAME:64,PRINCIPAL_NAME:128,AGENT_PURPOSE:2048,AGENT_TOP_JOBS:2048,PRINCIPAL_CONTEXT:4096,VOICE_REGISTER:1024,PRINCIPAL_TIMEZONE:80};
  const groups=[['AGENT_NAME','PRINCIPAL_NAME','PRINCIPAL_TIMEZONE'],['AGENT_PURPOSE','AGENT_TOP_JOBS'],['PRINCIPAL_CONTEXT','VOICE_REGISTER']];
  const fresh=()=>({answers:{AGENT_NAME:'Oracle',PRINCIPAL_TIMEZONE:Intl.DateTimeFormat().resolvedOptions().timeZone||'UTC'},catalogCollections:[],newVault:false,attach:false});
  let api,root,dialog,card,timer,epoch=0,pollPromise=null,open=false,suspended=true,stage='',group=0,current={},draft=fresh(),review=null,origin=null,fromSettings=false;
  let saveTimer,lastSignature='',lastView='',dirty=false,draftWrites=Promise.resolve(),activationRequest='',licenseCode='',invitation='',connectionRequested=false,checkingConnection=false;
  const $=selector=>root?.querySelector(selector);
  const invoke=async(method,params={})=>{
    const generation=epoch,value=await api.call(method,params);
    if(suspended||generation!==epoch)throw Error('Esta operação pertence a uma janela anterior.');
    return value;
  };
  const mutable=()=>current.licensed&&!active.has(current.status)&&!current.request&&current.status!=='waiting_user';
  const button=(id,text,primary=true)=>`<button type="button" id="${id}" class="ob-button${primary?' ob-primary':''}">${text}</button>`;
  function message(error){const box=$('[data-ob-message]');if(box){box.hidden=false;box.textContent=String(error?.message||error);}else api.toast?.(String(error?.message||error));}
  const action=fn=>async e=>{const b=e?.currentTarget,generation=epoch;if(b)b.disabled=true;try{await fn(e);}catch(error){if(!suspended&&generation===epoch)message(error);}finally{if(b?.isConnected&&generation===epoch)b.disabled=false;}};
  function capture(){
    if(!open)return;
    if(stage==='license'){licenseCode=$('#ob-code')?.value??licenseCode;invitation=$('#ob-invitation')?.value??invitation;return;}
    if(!mutable()||!['identity','vault'].includes(stage))return;
    const prior=JSON.stringify(draft);
    if(stage==='identity'){
      for(const input of dialog.querySelectorAll('[data-answer]'))draft.answers[input.dataset.answer]=input.value;
      if($('#ob-maintenance'))draft.maintenance={enabled:$('#ob-maintenance').checked,autoCapture:false,remoteProcessing:false,timezone:draft.answers.PRINCIPAL_TIMEZONE||'UTC',hour:3};
    }
    if(stage==='vault'){draft.newVault=!!$('#ob-new')?.checked;draft.attach=!!$('#ob-attach')?.checked;draft.catalogCollections=[];}
    if(prior!==JSON.stringify(draft))dirty=true;
  }
  async function flushDraft(){let pending;do{pending=draftWrites;await pending;}while(pending!==draftWrites);}
  async function flushInputs(){do{await save();await flushDraft();capture();}while(dirty&&mutable()&&['identity','vault'].includes(stage));}
  async function save(){
    clearTimeout(saveTimer);capture();
    if(!dirty||!mutable()||!['identity','vault'].includes(stage)){await flushDraft();return;}
    const payload=structuredClone({...draft,step:stage,ui:{group}}),signature=JSON.stringify(payload),generation=epoch;
    const task=draftWrites.catch(()=>{}).then(()=>{
      if(suspended||generation!==epoch)throw Error('Rascunho cancelado após bloquear a janela.');
      return invoke('onboardingDraft',payload);
    });draftWrites=task;
    try{await task;if(generation===epoch&&signature===JSON.stringify({...draft,step:stage,ui:{group}}))dirty=false;}
    catch(error){if(suspended||generation!==epoch)throw error;const failure=Error('Não foi possível salvar suas respostas. Elas continuam nesta tela; tente novamente.');failure.cause=error;message(failure);throw failure;}
  }
  function resolveStage(){
    if(!current.licensed)return 'license';
    if(current.request)return 'request';
    if(current.readback)return 'readback';
    if(current.status==='review'&&review&&!review.confirmed_hash)return 'review';
    if(current.runID&&['starting','running','cancelling','waiting_user','paused','cancelled','interrupted','failed','completed'].includes(current.status))return 'progress';
    if(!current.hasVault)return 'vault';
    const saved=current.ui?.step||current.draft?.step;
    return saved==='identity'?'identity':'vault';
  }
  async function navigate(next){await flushInputs();stage=next;render();if(current.licensed)await invoke('onboardingDraftUI',{step:next});}
  function dismiss(){open=false;dialog?.close();renderCard();if(origin?.isConnected)origin.focus({preventScroll:true});}
  async function close(){await flushInputs();dismiss();}
  function reveal(){
    if(suspended)return;
    if(api.canOpen&&!api.canOpen())return;
    const competing=document.querySelector('#modal[open]');if(competing)return;
    origin=document.activeElement;open=true;if(!dialog.open)dialog.showModal();render();renderCard();
  }
  function frame(title,body,buttons=''){
    const names={license:'Acesso',vault:'Obsidian',identity:['Identidade','Objetivos','Preferências'][group],review:'Revisão',progress:'Instalação local',readback:'Confirmação',request:'Solicitação',connection:'Codex opcional'};
    dialog.innerHTML=`<div class="ob-heading"><img class="ob-brand" src="brand/lockup-white.svg" alt="Oracle" width="143"><button type="button" class="ob-close" aria-label="Fechar configuração">×</button></div><div class="ob-navigation"><nav class="modal-breadcrumb" aria-label="Caminho da configuração"><button type="button" id="ob-breadcrumb-back">← Voltar</button><ol><li><button type="button" id="ob-universe">Universo</button></li><li><span>Configuração</span></li><li><span aria-current="page">${names[stage]||'Configuração'}</span></li></ol></nav></div><div class="ob-body"><h1 id="ob-title" tabindex="-1">${esc(title)}</h1>${body}<p data-ob-message role="alert" hidden></p></div><footer>${buttons}</footer>`;
    $('.ob-close').onclick=action(close);$('#ob-universe').onclick=action(close);
    $('#ob-breadcrumb-back').onclick=action(async()=>{
      if(stage==='identity'&&group>0){await flushInputs();group--;dirty=true;render();}
      else if(stage==='identity')await navigate('vault');
      else if(stage==='review')await navigate(draft.attach?'vault':'identity');
      else{await close();if(fromSettings)api.openSettings?.();}
    });
    const target=dialog.querySelector('input:not([type=checkbox]):not([type=radio]),textarea:not([readonly]),h1');target?.focus({preventScroll:true});
  }
  async function plan(){await flushInputs();review=await invoke('onboardingPlan',{...draft,catalogCollections:[]});await refreshStatus();stage=review?'review':resolveStage();render();}
  async function cancel(){await invoke('onboardingCancel');await refreshStatus();stage=resolveStage();render();}
  function render(){
    if(!open||suspended)return;
    if(stage==='progress'&&current.status==='completed'){dismiss();return;}
    lastView=viewSignature();
    if(stage==='license'){
      capture();const unsupported=current.deviceSupport?.supported===false;
      const simpleDevice=String(current.deviceID||'').startsWith('ORACLE-MAC2-')?current.deviceID:'';
      frame('Seu Oracle, neste Mac.',`<p>Insira o código individual de acesso recebido de Mateus. A validação e a instalação são locais.</p><label for="ob-code">Código de acesso</label><textarea id="ob-code" rows="4" autocomplete="off" autocapitalize="off" spellcheck="false" placeholder="Cole seu código ORACLE2 aqui">${esc(licenseCode)}</textarea><details id="ob-simple-request"><summary>Pedido de acesso para este Mac</summary><p>Gere o identificador e envie a Mateus. Esta ação guarda um vínculo local no Chaves do macOS; não envia informações pela rede.</p>${button('ob-device-request',simpleDevice?'Verificar pedido deste Mac':'Gerar pedido deste Mac',false)}${simpleDevice?`<p><code>${esc(simpleDevice)}</code></p>${button('ob-copy-device','Copiar identificador',false)}`:''}${current.deviceBindingMessage?`<p role="alert">${esc(current.deviceBindingMessage)}</p>`:''}</details><details id="ob-invitation-details" ${activationRequest?'open':''}><summary>Tenho um convite individual ORACLEINV2</summary><p>Gere a solicitação e envie ao proprietário para receber a resposta de ativação deste Mac.</p>${unsupported?'<p role="alert">'+esc(current.deviceSupport.reason)+'</p>':''}<label for="ob-invitation">Convite individual</label><input id="ob-invitation" autocomplete="off" autocapitalize="off" spellcheck="false" placeholder="ORACLEINV2…" value="${esc(invitation)}">${button('ob-request','Gerar solicitação',false)}<section id="ob-request-result" ${activationRequest?'':'hidden'}><label for="ob-request-code">Envie esta solicitação ao proprietário</label><textarea id="ob-request-code" rows="3" readonly spellcheck="false">${esc(activationRequest)}</textarea>${button('ob-copy-request','Copiar solicitação',false)}</section></details><p class="ob-muted">A licença individual é permanente e validada offline. Trocar de Mac exige nova emissão. Uma licença offline não recebe revogação remota.</p>`,button('ob-activate','Ativar acesso'));
      // Secure Enclave support applies only to the invitation request. Native activation
      // validates either shipped ORACLE2 format and never creates a device implicitly.
      $('#ob-request').disabled=unsupported;
      $('#ob-device-request').onclick=action(async()=>{capture();const request=await invoke('onboardingDeviceRequest');capture();current.deviceID=request.deviceID;current.deviceBindingMessage=null;render();$('#ob-simple-request').open=true;});
      $('#ob-copy-device')?.addEventListener('click',action(()=>invoke('copy',{text:simpleDevice})));
      $('#ob-request').onclick=action(async()=>{capture();const r=await invoke('onboardingActivationRequest',{invitation});activationRequest=r.request;$('#ob-request-code').value=r.request;$('#ob-request-result').hidden=false;$('#ob-request-code').focus();});
      $('#ob-copy-request').onclick=action(()=>invoke('copy',{text:activationRequest}));
      $('#ob-activate').onclick=action(async()=>{capture();await invoke('onboardingActivate',{code:licenseCode});$('#ob-code').value='';$('#ob-invitation').value='';licenseCode='';invitation='';activationRequest='';await refreshStatus();stage=resolveStage();render();});
    }else if(stage==='vault'){
      frame('Escolha seu Obsidian.',`<p>As notas originais permanecem na pasta escolhida. O GBrain oficial mantém um índice local derivado, que pode ser reconstruído.</p><div class="ob-selection"><span>${esc(current.vaultName||'Nenhuma pasta selecionada')}</span>${button('ob-vault','Escolher pasta…',false)}</div><label class="ob-check"><input id="ob-new" type="checkbox" ${draft.newVault?'checked':''}>Criar a estrutura Oracle nesta pasta</label><label class="ob-check"><input id="ob-attach" type="checkbox" ${draft.attach?'checked':''}>Conectar um GBrain local existente</label><div id="ob-existing" ${draft.attach?'':'hidden'}>${button('ob-brain','Escolher workspace e perfil…',false)}<p class="ob-muted">O perfil é escolhido explicitamente. Não será usado outro banco por padrão.</p></div><p class="ob-muted">Pessoal e Profissional aproveitam as pastas existentes. Pacotes opcionais não serão instalados nesta configuração.</p><p class="ob-muted">Conectar o Codex é opcional. A instalação abaixo usa somente operações locais verificáveis.</p>`,button('ob-vault-next','Continuar'));
      $('#ob-attach').onchange=()=>{$('#ob-existing').hidden=!$('#ob-attach').checked;dirty=true;};
      $('#ob-vault').onclick=action(async()=>{await save();const result=await invoke('onboardingChooseVault');if(result){await api.refresh?.();await refreshStatus();render();}});
      $('#ob-brain').onclick=action(async()=>{await save();await invoke('onboardingChooseBrain');await refreshStatus();render();});
      $('#ob-vault-next').onclick=action(async()=>{capture();if(!current.hasVault)throw Error('Escolha uma pasta para continuar.');if(draft.attach&&!current.hasExistingBrain)throw Error('Escolha o workspace e o perfil existentes.');if(draft.attach)await plan();else{group=0;await navigate('identity');}});
    }else if(stage==='identity'){
      group=Math.max(0,Math.min(2,group));
      frame(['Vamos nos conhecer.','Seu contexto de trabalho.','Suas preferências.'][group],`<p>Registre somente informações que deseja usar no seu segundo cérebro. Você revisará o conteúdo antes da criação.</p><div class="ob-fields">${groups[group].map(k=>`<label for="ob-${k}">${labels[k]}</label>${limits[k]<=128?`<input id="ob-${k}" data-answer="${k}" maxlength="${limits[k]}" value="${esc(draft.answers[k]||'')}">`:`<textarea id="ob-${k}" data-answer="${k}" maxlength="${limits[k]}" rows="3">${esc(draft.answers[k]||'')}</textarea>`}`).join('')}</div>`,button('ob-identity-next',group===2?'Revisar plano':'Continuar'));
      if(group===2){const consent=document.createElement('div');consent.innerHTML=`<label class="ob-check"><input type="checkbox" id="ob-maintenance" ${draft.maintenance?.enabled?'checked':''}>Autorizar manutenção local diária</label><p class="ob-muted">Às 3h ou na próxima abertura elegível, verifica o índice local. Captura, síntese remota e backup exigem consentimentos separados nos Ajustes. Você pode pausar a rotina.</p>`;dialog.querySelector('.ob-fields').append(consent);}
      $('#ob-identity-next').onclick=action(async()=>{capture();for(const k of groups[group])if(!draft.answers[k]?.trim())throw Error('Preencha os campos apresentados.');dirty=true;await flushInputs();if(group<2){group++;dirty=true;render();}else await plan();});
    }else if(stage==='review'){
      review=current.review||null;
      if(!review){stage='vault';render();message('Não há um plano íntegro para revisar. Confira a configuração.');return;}
      const answers=review.answers||draft.answers,folders=review.folders||[],catalog=review.catalog_collections||draft.catalogCollections;
      frame('Confira antes de instalar.',`<dl class="ob-review"><dt>Obsidian</dt><dd>${esc(current.vaultName)}</dd><dt>GBrain</dt><dd>${review.attach?'Conectar ao perfil local selecionado, sem reinicializar':'Criar perfil local exclusivo, sem embeddings remotos'}</dd><dt>Especialistas</dt><dd>${esc(catalog.join(', ')||'Nenhum pacote novo')}</dd><dt>Execução</dt><dd>Local, sem conta ou modelo obrigatório</dd><dt>Manutenção diária</dt><dd>${review.maintenance?.enabled?'Autorizada para o índice local':'Não autorizada nesta configuração'}</dd></dl><details open><summary>Pastas planejadas (${folders.length})</summary><pre>${esc(folders.join('\n')||'Estrutura existente preservada')}</pre></details>${review.attach?'':'<details><summary>Respostas da identidade</summary><dl class="ob-review">'+Object.entries(answers).map(([k,v])=>'<dt>'+esc(labels[k]||k)+'</dt><dd>'+esc(v)+'</dd>').join('')+'</dl></details>'}<p>Somente o escopo selecionado será usado. Alterações existentes e conflitos não serão substituídos silenciosamente.</p>`,button('ob-review-edit','Editar configuração',false)+button('ob-install','Instalar localmente'));
      $('#ob-review-edit').onclick=action(()=>navigate('vault'));
      $('#ob-install').onclick=action(async()=>{await flushDraft();const hash=review?.plan_hash;if(!hash||current.review?.plan_hash!==hash)throw Error('O plano mudou. Revise a configuração novamente.');await invoke('onboardingInstall',{hash});await refreshStatus();stage=resolveStage();render();});
    }else if(stage==='readback'){
      const readback=current.readback,runID=current.runID;
      frame('Confirme sua identidade.',`<p>Leitura de confirmação gerada pelo GBrain oficial. Confirme estas respostas; depois, retome a instalação local para criar a identidade e o índice.</p><pre class="ob-readback">${esc(readbackText(readback?.text||''))}</pre>`,button('ob-cancel','Pausar instalação',false)+button('ob-confirm-identity','Confirmar identidade'));
      $('#ob-cancel').onclick=action(cancel);
      $('#ob-confirm-identity').onclick=action(async()=>{const hash=readback?.hash;if(!hash||current.runID!==runID||current.readback?.hash!==hash)throw Error('A revisão mudou. Aguarde a atualização.');await invoke('onboardingConfirmIdentity',{hash});await refreshStatus();stage=resolveStage();render();});
    }else if(stage==='request'){
      const req=current.request;if(!req){stage=resolveStage();render();return;}
      const questions=req.kind==='item/tool/requestUserInput',rows=(req.questions||[]).slice(0,3);
      const form=questions?rows.map((q,i)=>{
        const options=q.options||[];
        return `<fieldset class="ob-question"><legend>${esc(q.question)}</legend>${q.isSecret?'<p class="ob-muted">Não informe senhas ou tokens de contas. Campos sigilosos não são guardados no rascunho.</p>':''}${options.length?options.map((o,j)=>`<label class="ob-check"><input type="radio" name="ob-choice-${i}" value="${j}">${esc(o.label)}${o.description?'<small>'+esc(o.description)+'</small>':''}</label>`).join('')+(q.isOther?`<label class="ob-check"><input type="radio" name="ob-choice-${i}" value="other">Outra resposta</label>`:''):''}${!options.length||q.isOther?(q.isSecret?`<input id="ob-q-${i}" type="password" autocomplete="off" maxlength="4096" aria-label="${esc(q.question)}">`:`<textarea id="ob-q-${i}" rows="3" maxlength="4096" aria-label="${esc(q.question)}"></textarea>`):''}</fieldset>`;
      }).join(''):`<details open><summary>Ação solicitada</summary><pre>${esc(req.command||JSON.stringify(req.permissions||req.additionalPermissions||{},null,2))}</pre>${req.cwd?'<p>'+esc(req.cwd)+'</p>':''}</details>`;
      frame(questions?'O Codex precisa saber…':'Permitir esta etapa?',`<p>${esc(req.reason)}</p><p class="ob-muted">${current.pendingRequestCount||1} solicitações pendentes. A autorização vale apenas para esta etapa.</p>${form}`,button('ob-cancel','Cancelar tarefa',false)+(questions?button('ob-send-answer','Enviar resposta'):button('ob-decline','Não permitir',false)+button('ob-allow','Permitir uma vez')));
      $('#ob-cancel').onclick=action(cancel);
      const answer=async allow=>{
        const p={id:req.id,generation:req.generation,allow};
        if(questions){p.answers={};for(const[q,i]of rows.map((q,i)=>[q,i])){
          const chosen=dialog.querySelector(`input[name="ob-choice-${i}"]:checked`),options=q.options||[];
          const value=options.length&&chosen?.value!=='other'?options[Number(chosen?.value)]?.label:$('#ob-q-'+i)?.value;
          if(!value?.trim())throw Error('Responda cada pergunta antes de enviar.');p.answers[q.id]={answers:[value]};
        }}
        await invoke('onboardingAnswer',p);dialog.querySelectorAll('input[type=password],textarea').forEach(e=>e.value='');await refreshStatus();stage=resolveStage();render();
      };
      if(questions)$('#ob-send-answer').onclick=action(()=>answer(true));else{$('#ob-decline').onclick=action(()=>answer(false));$('#ob-allow').onclick=action(()=>answer(true));}
    }else if(stage==='connection'){
      frame('Codex é uma conexão opcional.',`<p>A consulta, a edição e a instalação local não exigem login no Codex. Tarefas remotas exigem conexão e autorização da sua conta no próprio Codex.</p><p>${OracleStatusBadge.render(current.codexConnected?'connected':current.authorizing?'pending':'unverified',current.codexConnected?'Codex conectado':current.authorizing?'Aguardando autorização':'Conexão não verificada')}</p><p class="ob-muted">A autorização acontece na página do Codex. Senhas e tokens ficam sob controle dele.</p>`,button('ob-connection-close','Voltar ao Oracle',false)+button('ob-connect',current.codexConnected?'Verificar conexão':'Conectar Codex')+(current.authorizing?button('ob-cancel-login','Cancelar autorização',false):''));
      $('#ob-connection-close').onclick=action(close);
      if(current.codexConnected){const models=document.createElement('details');models.innerHTML=`<summary>Modelo do Codex${current.modelSelection?' · '+esc(current.modelSelection.displayName):''}</summary><label for="ob-model">Modelo disponível na sua conta</label><select id="ob-model"><option value="">Escolha um modelo</option>${(current.models||[]).map(m=>`<option value="${esc(m.model)}" ${m.model===current.modelSelection?.model?'selected':''}>${esc(m.displayName)}</option>`).join('')}</select>${current.modelSelectionError?`<p role="alert">${esc(current.modelSelectionError)}</p>`:''}<p class="ob-muted">Usaremos o esforço padrão compatível informado pelo Codex. Esta escolha não é necessária para uso local.</p>`;models.open=!current.modelSelection;dialog.querySelector('.ob-body').append(models);$('#ob-model').disabled=!mutable();$('#ob-model').onchange=action(async()=>{const model=$('#ob-model').value;if(!model)return;await flushDraft();await invoke('onboardingSelectModel',{model});draft.model=model;await refreshStatus();render();});}
      $('#ob-connect').onclick=action(async()=>{connectionRequested=true;const r=await invoke('onboardingConnect');await refreshStatus();render();if(current.codexConnected){connectionRequested=false;invoke('codexPlugins').then(()=>api.refresh?.()).catch(message);}if(r.message)message(r.message);});
      $('#ob-cancel-login')?.addEventListener('click',action(async()=>{await invoke('onboardingCancelLogin');connectionRequested=false;await refreshStatus();render();}));
    }else{
      const done=current.status==='completed',busy=active.has(current.status),cancelable=busy||current.status==='waiting_user';
      frame(done?'Seu Oracle está pronto.':'Configuração do Oracle.',`<p role="status">${esc(current.message||'Continue a configuração local.')}</p><ul class="ob-confirmed">${(current.confirmed||[]).filter(x=>x.kind!=='skill').map(x=>'<li>✓ '+esc(x.label)+'</li>').join('')}</ul><p>${(current.confirmed||[]).filter(x=>x.kind==='skill').length} skills verificadas</p>${done?'<p class="ob-muted">Arquivos, identidade e índice local conferidos. Conexões externas e confiança dos hooks têm verificações separadas.</p>':''}`,button('ob-progress-close','Voltar ao universo',false)+(cancelable?button('ob-cancel',current.status==='cancelling'?'Cancelamento solicitado':'Pausar instalação',false):!done&&current.runID?button('ob-resume','Retomar localmente'):''));
      $('#ob-progress-close').onclick=action(close);
      $('#ob-cancel')?.addEventListener('click',action(cancel));if($('#ob-cancel'))$('#ob-cancel').disabled=current.status==='cancelling';
      $('#ob-resume')?.addEventListener('click',action(async()=>{await invoke('onboardingResume');await refreshStatus();stage=resolveStage();render();}));
    }
  }
  function readbackText(text){const names={...labels,SOUL_RELATIONSHIP:'Papel na colaboração',SOUL_MODE_DEFAULT:'Como agir diante de dúvidas',SOUL_WINCE:'O que evitar',SOUL_WORLDVIEW:'Visão de mundo',SOUL_GOOD_OUTPUT:'O que define uma boa entrega'};return String(text).replace(/^read-back hash:.*$/gm,'').replace(/^(?:\* )?\s*([A-Z_]+):/gm,(_,k)=>(names[k]||k)+':').replace(/\(default:/g,'(padrão:').trim();}
  function renderCard(){
    if(!card)return;
    card.hidden=suspended||open||current.status==='completed';if(card.hidden)return;
    const cancelable=active.has(current.status)||current.status==='waiting_user';
    card.innerHTML=`<div class="ob-card-copy"><strong>${esc(!current.licensed?'Ative seu Oracle':current.message||'Continue a configuração local')}</strong><span>${esc(current.phase||'')}</span></div><div class="ob-card-actions">${button('ob-continue',current.request?'Responder':current.readback?'Revisar respostas':'Continuar',false)}${cancelable?button('ob-card-cancel','Pausar',false):''}</div>${active.has(current.status)?'<div class="ob-working" aria-label="Instalação local em andamento"></div>':''}`;
    $('#ob-continue').onclick=()=>{stage=resolveStage();reveal();};$('#ob-card-cancel')?.addEventListener('click',action(cancel));
  }
  const requestKey=value=>JSON.stringify([value.runID,value.request?.id,value.request?.generation]);
  const viewSignature=()=>JSON.stringify([stage,current.runID,current.status,current.message,current.readback?.hash,requestKey(current),current.confirmed,current.codexConnected,current.authorizing,current.models,current.modelSelection,current.modelSelectionError]);
  async function refreshStatus(){if(pollPromise)await pollPromise;return poll();}
  async function poll(){
    if(suspended||!api)return;if(pollPromise)return pollPromise;
    const generation=epoch;
    const task=(async()=>{
      const value=await invoke('onboardingStatus');if(suspended||generation!==epoch)return;
      const prior=current;current=value;review=current.review||null;
      const signature=JSON.stringify([current.runID,current.status,current.phase,current.confirmed]);
      if(signature!==lastSignature){lastSignature=signature;window.dispatchEvent(new CustomEvent('oracle:onboarding-progress',{detail:{schemaVersion:2,runID:current.runID,status:current.status,phase:current.phase,confirmed:current.confirmed||[],completed:current.completed,total:current.total}}));if(current.status==='completed'||active.has(current.status))Promise.resolve(api.refresh?.()).catch(message);}
      if(open){
        const automatic=['progress','readback','request'].includes(stage);
        if(current.status==='completed'&&prior.status!=='completed'&&automatic){dismiss();}
        else{
          if(automatic)stage=resolveStage();
          // Preserve the same question while typing. A new run/generation is a new question.
          if(automatic&&viewSignature()!==lastView&&!(stage==='request'&&requestKey(prior)===requestKey(current)))render();
          if(stage==='connection'&&viewSignature()!==lastView)render();
          if(stage==='license'&&current.licensed){stage=resolveStage();render();}
        }
      }
      renderCard();
    })();pollPromise=task;
    try{return await task;}finally{if(pollPromise===task)pollPromise=null;}
  }
  async function tick(){
    if(suspended||document.hidden)return;
    await poll();
    if(open&&stage==='connection'&&connectionRequested&&!current.codexConnected&&!checkingConnection){
      const generation=epoch;checkingConnection=true;
      try{await invoke('onboardingCheckConnection');await refreshStatus();if(current.codexConnected){connectionRequested=false;invoke('codexPlugins').then(()=>api.refresh?.()).catch(message);}}
      finally{if(generation===epoch)checkingConnection=false;}
    }
  }
  async function mount(options){
    api=options;suspended=false;epoch++;pollPromise=null;
    if(!root){root=document.createElement('section');root.className='oracle-onboarding';root.innerHTML='<dialog class="ob-dialog" aria-labelledby="ob-title"></dialog><aside class="ob-progress-card" aria-label="Configuração do Oracle" hidden></aside>';document.body.append(root);dialog=root.querySelector('dialog');card=root.querySelector('aside');
      dialog.addEventListener('cancel',e=>{e.preventDefault();close().catch(message);});
      dialog.addEventListener('input',()=>{capture();if(['vault','identity'].includes(stage)){dirty=true;clearTimeout(saveTimer);saveTimer=setTimeout(()=>save().catch(()=>{}),300);}});
      dialog.addEventListener('keydown',e=>{if((e.metaKey||e.ctrlKey)&&['k',','].includes(e.key.toLowerCase())){e.preventDefault();e.stopPropagation();}});
    }
    await poll();if(current.draft){draft={...fresh(),...current.draft,answers:{...fresh().answers,...current.draft.answers}};group=Math.max(0,Math.min(2,current.draft.ui?.group||0));}
    clearInterval(timer);timer=setInterval(()=>{const generation=epoch;tick().catch(error=>{if(!suspended&&generation===epoch)message(error);});},1800);
    if(!current.licensed||current.status==='not_started'){stage=resolveStage();reveal();}
  }
  function suspend(){capture();clearTimeout(saveTimer);epoch++;suspended=true;open=false;clearInterval(timer);timer=null;pollPromise=null;draftWrites=draftWrites.catch(()=>{});dialog?.close();dialog?.replaceChildren();if(card)card.hidden=true;draft=fresh();current={};review=null;activationRequest='';licenseCode='';invitation='';connectionRequested=false;checkingConnection=false;dirty=false;lastSignature='';lastView='';}
  window.OracleOnboarding={mount,poll,suspend,formatReadback:readbackText,getState:()=>({...current}),
    pendingDraft(){capture();return dirty&&mutable()&&['identity','vault'].includes(stage)?structuredClone({...draft,step:stage,ui:{group}}):null;},
    open(options={}){fromSettings=!!options.fromSettings;stage=options.connection&&current.licensed?'connection':resolveStage();reveal();},
    async prepareToClose(){if(['identity','vault'].includes(stage)&&mutable())await flushInputs();else await flushDraft();}
  };
})();
