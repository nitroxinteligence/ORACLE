/* Real WKWebView, synthetic vault and bridge only. */
(()=>{
 const f=window.__oracleFixture,base=window.__oracleFixtureReceive;
 const q=s=>document.querySelector(s),qa=s=>[...document.querySelectorAll(s)],sleep=ms=>new Promise(r=>setTimeout(r,ms));
 const assert=(v,m)=>{if(!v)throw Error(m)};
 const wait=async(fn,m)=>{for(let i=0;i<240;i++){if(fn())return;await sleep(25)}throw Error(m)};
 const click=s=>{assert(q(s)&&!q(s).disabled,'missing '+s);q(s).click()};
 f.ob={...f.ob,status:'completed',licensed:true,legacyAccess:true,hasVault:true,runID:'knowledge-1'};f.config.vault='/__synthetic_oracle__/Vault de Ana & João';
 let updates={busy:false,available:false,phase:'complete',results:[{id:'gbrain',status:'current'},{id:'skills',status:'updated'},{id:'codex',status:'available'},{id:'fixture',status:'error'}]};
 window.__oracleFixtureReceive=async r=>{
  if(r.method==='updateStatus'){window.oracleReply(r.id,{value:updates});return}
  if(r.method==='read'){
   f.calls.push({method:r.method,params:r.params});
   const text=r.params.path.includes('pessoal')?'# Perfil pessoal\n\n## Resumo\n\nAna gosta de aprender desenho e reservar tempo para os amigos.\n\n## Rotina e interesses\n\nCaminhadas curtas e leitura fazem parte da rotina combinada.':'# Perfil profissional\n\n## Atuação e empresa\n\nAna trabalha com pesquisa e coordena o projeto de documentação.';
   window.oracleReply(r.id,{value:{path:r.params.path,text}});return;
  }
  return base(r);
 };
 window.__oracleFixtureRun=async()=>{
  if(f.started)return;f.started=true;const cases=[];
  const check=async(name,fn)=>{try{await fn();cases.push({name,ok:true})}catch(e){cases.push({name,ok:false,error:e.message});throw e}};
  const shot=async name=>{window.__fixtureSnapshotSaved=false;window.webkit.messageHandlers.fixture.postMessage({type:'snapshot',name});await wait(()=>window.__fixtureSnapshotSaved,'screenshot')};
  try{
   await check('Completed onboarding opens prompts and persists a presentation receipt',async()=>{
    await wait(()=>q('#modal[open][data-family="knowledge-prompts"]'),'automatic welcome');
    await wait(()=>f.ob.knowledgeWelcome,'receipt');assert(qa('[data-copy-knowledge]').length===2,'two prompts');
    assert(q('.knowledge-destination').textContent.includes(f.config.vault),'actual selected vault');
    assert(!f.calls.some(c=>c.method==='write'||c.method==='onboardingInstall'),'presentation changed installation');
    await sleep(300);await shot('installation');
   });
   await check('Prompt preview opens separately and returns with working actions',async()=>{
    click('[data-preview-knowledge="personal"]');await wait(()=>q('.knowledge-prompt-text'),'prompt preview');
    assert(q('.knowledge-prompt-text').textContent.includes(f.config.vault),'preview vault');
    f.copied='';click('[data-copy-knowledge="personal"]');await wait(()=>f.copied,'preview copy');
    click('#modal-back');await wait(()=>qa('[data-preview-knowledge]').length===2,'back to areas');
   });
   await check('Copy uses current vault, original thirty-question scripts, and native clipboard',async()=>{
    for(const id of ['personal','professional']){f.copied='';click(`[data-copy-knowledge="${id}"]`);await wait(()=>f.copied,'copied');assert(f.copied.startsWith('/oracle\n'),'router');assert(f.copied.includes(f.config.vault),'selected path');assert((f.copied.match(/^\d+\. /gm)||[]).length===30,'question count')}
    const previous=f.copied;f.config.vault='/__synthetic_oracle__/Other';click('[data-copy-knowledge="personal"]');await sleep(200);assert(f.copied===previous,'stale vault copied');f.config.vault='/__synthetic_oracle__/Vault de Ana & João';
   });
   await check('Existing knowledge shows two areas, real excerpts and live file changes',async()=>{
    click('#knowledge-view-notes');await wait(()=>q('.hub-overview'),'personal summary');assert(qa('[data-hub-tab]').length===2&&!q('[data-hub-tab="memory"]'),'memory tab remains');assert(q('.hub-overview').textContent.includes('desenho'),'personal excerpt');
    click('[data-hub-tab="professional"]');await wait(()=>q('.hub-overview')?.textContent.includes('pesquisa'),'professional excerpt');
    f.entries.push({path:'AREAS/profissional/Perfil novo.md',name:'Perfil novo.md',directory:false,size:120});await window.oracleVaultSnapshotChanged();await wait(()=>f.calls.some(c=>c.method==='read'&&c.params.path.includes('Perfil novo')),'updated notes read');
    click('.hub-build-context');await wait(()=>q('[data-copy-knowledge]'),'reopen prompts');
   });
   await check('Settings reopen prompts and remove the technical section without overflow',async()=>{
    await closeModal(true);await refresh();await sleep(200);assert(!q('#modal').open,'welcome repeated');
    settings();await wait(()=>q('#knowledge-settings'),'settings');
    assert(!/Avançado|Desempenho do mapa|Histórico técnico|Instalação local/.test(q('#modal').textContent),'technical UI remains');
    assert(qa('.setting-row').every(e=>e.scrollWidth<=e.clientWidth+1),'row overflow');
    assert(qa('.setting-group').every(e=>Math.abs(e.getBoundingClientRect().right-q('.modal-body').getBoundingClientRect().right+parseFloat(getComputedStyle(q('.modal-body')).paddingRight))<2),'groups fail to fill width');
    const notice=q('#toast');if(notice.matches(':popover-open'))notice.hidePopover();notice.hidden=true;
    await sleep(300);await shot('options');click('#knowledge-settings');await wait(()=>q('[data-copy-knowledge]'),'settings prompts');
   });
   await check('Update cards are green only when an update is available',async()=>{
    await closeModal(true);await showUpdates(false);await pollUpdateStatus();await wait(()=>qa('.update-result').length===4,'update results');
    const rows=qa('.update-result');assert(rows.filter(r=>r.classList.contains('update-success')).length===1,'current cards remain green');assert(rows.filter(r=>r.classList.contains('update-failure')).length===1,'error card missing');
   });
   await check('A new installation only presents after completion',async()=>{
    await closeModal(true);f.ob.status='running';f.ob.runID='knowledge-2';await refresh();await sleep(100);assert(!q('#modal').open,'welcome before completion');
    f.ob.status='completed';await refresh();await wait(()=>q('[data-copy-knowledge]'),'completion transition');await wait(()=>f.ob.knowledgeWelcome.runID==='knowledge-2','new receipt');
   });
  }catch{}
  if(f.jsErrors.length||f.failures.length)cases.push({name:'No JS or bridge failures',ok:false,error:JSON.stringify([...f.jsErrors,...f.failures])});
  window.webkit.messageHandlers.fixture.postMessage({type:'done',passed:cases.filter(c=>c.ok).length,failed:cases.filter(c=>!c.ok).length,cases,synthetic:true,realCore:false});
 };
})();
