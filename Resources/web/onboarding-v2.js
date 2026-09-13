/* V2 visual controller. The host supplies the native bridge; only receipts advance installation. */
(function () {
  'use strict';
  let api, root, screen, activation, progress, current={}, stage='', timer, generation=0, pending=false, busy=false;
  const needsRecovery=value=>value.licensed&&!['starting','running','cancelling','completed'].includes(value.status)&&(value.libraryRootChoices?.length||value.distributionConflicts?.length);
  const motionHandles=new Set();
  const esc=v=>String(v??'').replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
  const logo=()=>'<span class="ob2-logo metallic-lockup" role="img" aria-label="Oracle"><img class="metallic-symbol" src="brand/oracle-planet-chrome-v1.png" alt=""><img class="metallic-wordmark" src="brand/lockup-white.svg" alt=""></span>';
  const folder='<svg viewBox="0 0 64 64" fill="none" aria-hidden="true"><path class="ob2-folder-back" d="M10 19a5 5 0 0 1 5-5h13l6 7h15a5 5 0 0 1 5 5v22H10Z"/><path class="ob2-folder-front" d="M8 29h48l-5 21H13Z"/></svg>';
  const effects=()=>window.OracleOnboardingEffects;
  const reduced=()=>matchMedia('(prefers-reduced-motion:reduce)').matches||document.body.classList.contains('reduced');
  function clean(container){container?.querySelectorAll('[data-ob2-effect]').forEach(el=>effects()?.destroy(el));}
  function errorToast(error){api?.toast?.(error?.message||String(error),'error');}
  async function invoke(method,params={}){const epoch=generation;const value=await api.call(method,params);if(epoch!==generation)throw Error('Operação encerrada.');return value;}
  function ensure(){
    if(root)return;
    root=document.createElement('section');root.className='oracle-onboarding-v2';
    root.innerHTML='<dialog class="ob2-screen" aria-label="Configuração do Oracle"><div class="ob2-space" aria-hidden="true"><div class="ob2-stars"></div><div class="ob2-orbits"></div></div><main class="ob2-content"></main></dialog><dialog class="ob2-activation" tabindex="-1" aria-labelledby="ob2-activating-title"><div class="ob2-beam" data-ob2-effect></div><div class="ob2-status-body"><h2 id="ob2-activating-title">Ativando…</h2><progress aria-label="Ativando acesso"></progress></div></dialog><aside class="ob2-installation" aria-label="Progresso da instalação" hidden><div class="ob2-beam" data-ob2-effect></div><div class="ob2-status-body"><strong>Instalando seu segundo cérebro…</strong><progress aria-label="Instalação do Second Brain"></progress><p class="ob2-install-error" hidden></p><button class="ob2-retry" type="button" hidden>Tentar novamente</button></div></aside>';
    document.body.append(root);screen=root.querySelector('.ob2-screen');activation=root.querySelector('.ob2-activation');progress=root.querySelector('.ob2-installation');
    screen.addEventListener('cancel',e=>e.preventDefault());activation.addEventListener('cancel',e=>e.preventDefault());
    root.querySelector('.ob2-retry').onclick=()=>run(async()=>{await invoke('onboardingResume');await poll();});
    // Fixed, deterministic star positions; no random rerender or animation loop.
    const stars=root.querySelector('.ob2-stars');
    for(let i=0;i<135;i++){const dot=document.createElement('i');dot.style.left=((i*37.17+11)%100)+'%';dot.style.top=((i*61.73+7)%100)+'%';dot.style.opacity=String(.12+(i%5)*.055);stars.append(dot);}
  }
  async function run(fn){if(busy)return;busy=true;try{await fn();}catch(error){errorToast(error);try{const value=await invoke('onboardingStatus');if(needsRecovery(value))await api.openRecovery?.();}catch{}}finally{busy=false;}}
  function metal(host,label,onClick,disabled=false){effects().button(host,{label,onClick:()=>run(onClick),disabled});}
  function closeScreen(){clean(screen);screen.close();document.body.classList.remove('ob2-configuring');}
  function show(next){
    ensure();stage=next;
    if(next==='progress'||next==='completed'){closeScreen();updateProgress();return;}
    const content=screen.querySelector('.ob2-content');clean(content);
    document.body.classList.add('ob2-configuring');
    if(next==='license'){
      content.innerHTML=logo()+'<h1 class="ob2-intro">Ative o universo do Oracle<br>com sua chave de acesso</h1><form class="ob2-key-form"><label class="ob2-sr-only" for="ob2-key">Chave de acesso</label><input id="ob2-key" type="password" autocomplete="off" autocapitalize="characters" spellcheck="false" placeholder="***" aria-describedby="ob2-key-error"><p id="ob2-key-error" class="ob2-sr-only" role="alert"></p><div class="ob2-action" data-ob2-effect></div></form>';
      const input=content.querySelector('input');
      input.oninput=()=>{input.removeAttribute('aria-invalid');input.classList.remove('ob2-shake');content.querySelector('#ob2-key-error').textContent='';};
      const activate=async()=>{
        if(!input.value.trim()){invalidKey(input,'Informe sua chave de acesso.');return;}
        const epoch=generation;input.disabled=true;activation.classList.remove('ob2-closing');activation.showModal();effects().beam(activation.querySelector('.ob2-beam'));void animate(activation,[{opacity:0,transform:'scale(.98)'},{opacity:1,transform:'scale(1)'}],240);
        try{
          await invoke('onboardingActivate',{code:input.value.trim()});
          current=await invoke('onboardingStatus');
          if(!current.licensed)throw Error('Não foi possível validar esta chave de acesso.');
          input.value='';if(current.resumeExisting){await closeActivation();show('completed');await api.refresh?.();}else if(current.runID){await closeActivation();show(current.status==='completed'?'completed':'progress');await api.refresh?.();}else{await navigate('vault');await closeActivation();}
        }catch(error){if(epoch===generation){await closeActivation();input.disabled=false;invalidKey(input,error.message);}}
        finally{if(input.isConnected)input.disabled=false;}
      };
      content.querySelector('form').onsubmit=e=>{e.preventDefault();run(activate);};metal(content.querySelector('.ob2-action'),'Ativar',activate);
    }else if(next==='vault'){
      content.innerHTML=logo()+'<h1>Escolha seu Obsidian.</h1><p class="ob2-description"><span>Selecione o vault que você já criou no Obsidian.</span><span>Todo o Second Brain será instalado neste vault.</span></p><div class="ob2-vault-selection"></div><div class="ob2-action" data-ob2-effect></div>';
      updateVaultSelection();
    }else if(next==='install'){
      content.innerHTML=logo()+'<h1>Instale seu segundo cérebro.</h1><div class="ob2-action" data-ob2-effect></div>';
      metal(content.querySelector('.ob2-action'),'Instalar',async()=>{
        const button=content.querySelector('button');button.disabled=true;
        try{await invoke('onboardingInstallMemoryOnly');current=await invoke('onboardingStatus');await api.refresh?.();document.body.classList.remove('ob2-configuring');const exit=await animate(screen,[{opacity:1},{opacity:0}],460,true);closeScreen();release(exit);stage='progress';updateProgress();}
        finally{if(button.isConnected)button.disabled=false;}
      });
    }
    if(!screen.open)screen.showModal();
    if(!content.dataset.transitioning)void animate(content,[{opacity:0,transform:'translateY(8px)'},{opacity:1,transform:'translateY(0)'}],320);
    const target=content.querySelector('input,button');if(!activation.open)target?.focus({preventScroll:true});updateProgress();
  }
  function invalidKey(input,text){
    input.setAttribute('aria-invalid','true');input.classList.remove('ob2-shake');void input.offsetWidth;if(!reduced())input.classList.add('ob2-shake');
    const message=screen.querySelector('#ob2-key-error');if(message)message.textContent=text;
    errorToast(Error(text));input.focus({preventScroll:true});
  }
  function release(animation){animation?.cancel();motionHandles.delete(animation);}
  async function animate(element,frames,duration=240,hold=false){
    if(reduced()||!element?.isConnected)return null;
    const animation=element.animate(frames,{duration,easing:'cubic-bezier(.22,.7,.2,1)',fill:'both'});motionHandles.add(animation);
    try{await animation.finished;}catch{}finally{if(!hold)release(animation);}
    return animation;
  }
  async function transitionTo(next){
    const epoch=generation,content=screen.querySelector('.ob2-content');content.dataset.transitioning='true';content.inert=true;
    const exit=await animate(content,[{opacity:1,transform:'translateY(0)'},{opacity:0,transform:'translateY(-6px)'}],180,true);
    if(epoch!==generation){release(exit);return;}
    show(next);
    // Keep the outgoing content invisible until the replacement and effects have painted.
    await new Promise(resolve=>requestAnimationFrame(()=>requestAnimationFrame(resolve)));
    if(epoch!==generation){release(exit);return;}
    const entrance=animate(content,[{opacity:0,transform:'translateY(8px)'},{opacity:1,transform:'translateY(0)'}],320);
    release(exit);await entrance;content.inert=false;delete content.dataset.transitioning;content.querySelector('input,button')?.focus({preventScroll:true});
  }
  async function closeActivation(){
    activation.classList.add('ob2-closing');const exit=await animate(activation,[{opacity:1,transform:'scale(1)'},{opacity:0,transform:'scale(.98)'}],180,true);
    activation.close();clean(activation);release(exit);
  }
  async function navigate(next){await invoke('onboardingDraftUI',{step:next});await transitionTo(next);}
  function updateVaultSelection(){
    const host=screen.querySelector('.ob2-vault-selection'),action=screen.querySelector('.ob2-action');if(!host)return;
    if(current.hasVault){
      host.innerHTML='<div class="ob2-selected-vault">'+folder+'<div><strong>'+esc(current.vaultName)+'</strong><span>'+esc(current.vaultPath||current.vaultName)+'</span></div><button class="ob2-remove-vault" type="button" aria-label="Remover pasta selecionada" title="Remover pasta selecionada"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" aria-hidden="true"><path d="M4 7h16M9 7V4h6v3M6 7l1 13h10l1-13M10 10v7M14 10v7"/></svg></button></div>';
      host.querySelector('button').onclick=()=>run(async()=>{await invoke('onboardingClearVault');current=await invoke('onboardingStatus');updateVaultSelection();host.querySelector('button')?.focus({preventScroll:true});});
    }else{
      host.innerHTML='<button class="ob2-vault" type="button" aria-label="Escolher vault do Obsidian">'+folder+'<span class="ob2-vault-name">Escolher vault do Obsidian</span><span class="ob2-vault-hint">Clique para selecionar uma pasta</span></button>';
      const picker=host.querySelector('button');picker.onclick=()=>run(async()=>{picker.disabled=true;try{const selected=await invoke('onboardingChooseVault');if(selected){current=await invoke('onboardingStatus');updateVaultSelection();}}finally{if(picker.isConnected)picker.disabled=false;}});
    }
    metal(action,'Prosseguir',()=>navigate('install'),!current.hasVault);
  }
  function positionProgress(){
    if(!progress||progress.hidden)return;
    const logo=document.querySelector('#app .wordmark')?.getBoundingClientRect(),tabs=document.querySelector('.workspace-tabs')?.getBoundingClientRect();
    const left=logo?logo.right+24:24,right=tabs?tabs.left-24:innerWidth-24,room=right-left;
    if(room>=270){progress.style.left=(left+right)/2+'px';progress.style.top=(logo?(logo.top+logo.bottom)/2:48)+'px';progress.style.width=Math.min(380,room)+'px';progress.classList.add('ob2-in-header');}
    else{progress.style.left='50%';progress.style.top='88px';progress.style.width='min(380px,calc(100vw - 40px))';progress.classList.remove('ob2-in-header');}
  }
  function updateProgress(){
    if(!progress)return;
    const installing=!!current.runID&&current.status!=='completed'&&!current.resumeExisting;
    const visible=installing&&!screen.open;
    if(!visible){progress.hidden=true;clean(progress);return;}
    const wasHidden=progress.hidden;progress.hidden=false;
    positionProgress();if(wasHidden){effects().beam(progress.querySelector('.ob2-beam'));void animate(progress,[{opacity:0},{opacity:1}],300);}
    const bar=progress.querySelector('progress');
    const data=current.installationProgress||current;
    const total=Number(data.total),completed=Number(data.completed);
    const byteTotal=Number(data.bytes_total),bytes=Number(data.bytes_downloaded);
    if(total>0&&Number.isFinite(completed)){bar.max=total;bar.value=Math.max(0,Math.min(total,completed));bar.setAttribute('aria-valuetext',Math.round(bar.value/total*100)+'%');}
    else if(byteTotal>0&&Number.isFinite(bytes)){bar.max=byteTotal;bar.value=Math.max(0,Math.min(byteTotal,bytes));bar.setAttribute('aria-valuetext',Math.round(bar.value/byteTotal*100)+'%');}
    else{bar.removeAttribute('value');bar.removeAttribute('aria-valuetext');}
    const failed=['failed','interrupted','paused','cancelled'].includes(current.status);
    const error=progress.querySelector('.ob2-install-error');error.hidden=!failed;error.textContent=failed?(current.message||'Não foi possível concluir a instalação.') :'';
    progress.querySelector('.ob2-retry').hidden=!failed;
  }
  async function poll(){
    if(pending||!api)return;pending=true;const epoch=generation;
    try{
      const value=await invoke('onboardingStatus');if(epoch!==generation)return;
      const before=JSON.stringify([current.status,current.installationProgress,current.confirmed]);current=value;
      if(needsRecovery(current)&&api.openRecovery){await api.openRecovery();return;}
      updateProgress();
      if(before!==JSON.stringify([current.status,current.installationProgress,current.confirmed])){
        window.dispatchEvent(new CustomEvent('oracle:onboarding-progress',{detail:{schemaVersion:2,...current}}));
        if(current.runID)await api.refresh?.();
        if(current.status==='completed'&&stage==='progress')show('completed');
      }
    }catch(error){if(epoch===generation)errorToast(error);}finally{if(epoch===generation)pending=false;}
  }
  function suspend(){generation++;for(const animation of motionHandles)animation.cancel();motionHandles.clear();clearInterval(timer);busy=false;pending=false;if(root){clean(root);activation.close();screen.close();progress.hidden=true;const content=screen.querySelector('.ob2-content');content.inert=false;delete content.dataset.transitioning;}document.body.classList.remove('ob2-configuring');api=null;}
  window.OracleOnboardingV2={
    async mount(options){suspend();api=options;ensure();current=await invoke('onboardingStatus');const next=!current.licensed?'license':current.resumeExisting?'completed':current.runID?(current.status==='completed'?'completed':'progress'):current.hasVault&&current.ui?.step==='install'?'install':'vault';show(next);timer=setInterval(()=>{if(!document.hidden&&!busy)void poll();},800);},
    open(options={}){if(options.connection)return;show(options.previewStage||(!current.licensed?'license':current.runID&&current.status!=='completed'?'progress':current.hasVault?'install':'vault'));},
    suspend,poll,getState:()=>({...current}),pendingDraft:()=>null,prepareToClose:async()=>{if(busy)throw Error('Aguarde esta etapa antes de fechar a configuração.');},
  };
  window.addEventListener('resize',positionProgress);
  const legacy=window.OracleOnboarding;let controller=window.OracleOnboardingV2;
  async function openRecovery(options){window.OracleOnboardingV2.suspend();controller=legacy;await legacy.mount(options);legacy.open();}
  // Existing incomplete identity plans keep their own consent and recovery path.
  window.OracleOnboarding={
    async mount(options){legacy?.suspend();window.OracleOnboardingV2.suspend();const status=await options.call('onboardingStatus');controller=needsRecovery(status)||status.legacyPlanAvailable&&status.profileMode!=='memory-only'&&status.runID&&status.status!=='completed'?legacy:window.OracleOnboardingV2;return controller.mount({...options,openRecovery:()=>openRecovery(options)});},
    open:options=>controller.open(options),poll:()=>controller.poll(),suspend(){legacy?.suspend();window.OracleOnboardingV2.suspend();},
    getState:()=>controller.getState(),pendingDraft:()=>controller.pendingDraft(),prepareToClose:()=>controller.prepareToClose(),formatReadback:legacy?.formatReadback,
  };
})();
