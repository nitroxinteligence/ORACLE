import {readFileSync} from 'node:fs';
import vm from 'node:vm';
import test from 'node:test';
import assert from 'node:assert/strict';

const source=readFileSync(new URL('../Resources/web/app.js',import.meta.url),'utf8');
const updateCode=source.slice(source.indexOf('let updatePolling='),source.indexOf('const updateEffectHosts='));
function setup(){
 const notices=[],opened=[],calls=[],classes=new Set(),elements={
  '#app':{inert:false},'#modal':{open:false,dataset:{family:'updates'}},'#lock-screen':{hidden:true},
  '#updates':{classList:{toggle(name,on){on?classes.add(name):classes.delete(name)},remove(name){classes.delete(name)}},dataset:{},setAttribute(name,value){this[name]=value}},
  '#update-notice-metal':{}
 };
 const onboarding={hasVault:true,licensed:true,status:'completed'};
 const clock={now:Date.now()},timers=new Map();let timerID=0;
 class ClockDate extends Date {static now(){return clock.now}}
 const context=vm.createContext({Date:ClockDate,URL,document:{hidden:false,body:{classList:{contains:()=>false}},querySelector:()=>null},window:{oracleWindowVisible:true,OracleOnboarding:{getState:()=>onboarding}},state:{config:{},onboarding},$:selector=>elements[selector],knowledgeWelcomePending:()=>false,navigationBlocked:()=>!elements['#lock-screen'].hidden||context.dirty,modal:html=>{notices.push(html);elements['#modal'].open=true;return true},actions:html=>html,mountUpdateMetal:(host,label,action)=>{host.onclick=action},safe:fn=>fn,closeModal:()=>{elements['#modal'].open=false},showUpdates:operation=>opened.push(operation),startUpdateRequest:(operation,automatic)=>{calls.push({method:'updateStart',params:{operation,automatic}});vm.runInContext('updateBusy=true',context);return new Promise(()=>{})},setTimeout:(fn,ms)=>{timers.set(++timerID,{fn,ms});return timerID},clearTimeout:id=>timers.delete(id)});
 vm.runInContext(updateCode+';globalThis.api={ready:finishUpdateStartup,reflect:reflectUpdateStatus,notify:maybeShowStartupUpdateNotice,check:maybeAutomaticUpdateCheck,rows:updateResultRows,installable:oracleInstallable};',context);
 return {context,elements,classes,notices,opened,calls,onboarding,clock,timers,api:context.api};
}
const available={available:true,installableNow:true,busy:false,phase:'complete',checkedAt:new Date().toISOString(),results:[{id:'skills',status:'available'}]};
test('avisa uma vez por abertura e reaparece em uma nova inicialização',()=>{
 for(let i=0;i<2;i++){const h=setup();h.context.window.ORACLE_PREVIEW=true;h.api.ready();h.api.reflect(available);assert.equal(h.notices.length,1);h.elements['#modal'].open=false;h.api.reflect(available);h.api.notify();assert.equal(h.notices.length,1);assert(h.classes.has('update-ready'));}
});
test('espera desbloqueio, primeiro carregamento e janela visível',()=>{
 const h=setup();h.context.window.ORACLE_PREVIEW=true;h.api.reflect(available);assert.equal(h.notices.length,0);h.elements['#lock-screen'].hidden=false;h.api.ready();assert.equal(h.notices.length,0);h.elements['#lock-screen'].hidden=true;h.context.document.hidden=true;h.api.notify();assert.equal(h.notices.length,0);h.context.document.hidden=false;h.api.notify();assert.equal(h.notices.length,1);
});
test('aguarda outro modal ou rascunho sem descartar a notificação',()=>{
 const h=setup();h.context.window.ORACLE_PREVIEW=true;h.api.ready();h.elements['#modal'].open=true;h.api.reflect(available);assert.equal(h.notices.length,0);h.elements['#modal'].open=false;h.context.dirty=true;h.api.notify();assert.equal(h.notices.length,0);h.context.dirty=false;h.api.notify();assert.equal(h.notices.length,1);
});
test('não anuncia estado atual, erro ou versão ainda incompatível; remove o pulso quando atualiza',()=>{
 const h=setup();h.context.window.ORACLE_PREVIEW=true;h.api.ready();for(const status of [{available:false,installableNow:false},{available:false,installableNow:false,phase:'failed'},{knownUpdate:true,available:false,installableNow:false}])h.api.reflect(status);assert.equal(h.notices.length,0);assert(!h.classes.has('update-ready'));assert.match(h.elements['#updates']['aria-label'],/compatibilidade/);h.api.reflect(available);assert(h.classes.has('update-ready'));h.api.reflect({available:false,installableNow:false});assert(!h.classes.has('update-ready'));
});
test('espera a verificação e a conclusão do onboarding, inclusive com acesso legado',()=>{
 const h=setup();h.context.window.ORACLE_PREVIEW=true;h.api.ready();h.api.reflect({...available,busy:true});assert.equal(h.notices.length,0);h.onboarding.legacyAccess=true;h.onboarding.status='running';h.api.reflect(available);assert.equal(h.notices.length,0);h.onboarding.status='completed';h.api.notify();assert.equal(h.notices.length,1);
});
test('ação do aviso abre revisão e não solicita instalação',()=>{
 const h=setup();h.context.window.ORACLE_PREVIEW=true;h.api.ready();h.api.reflect(available);h.elements['#update-notice-metal'].onclick();assert.deepEqual(h.opened,[undefined]);assert.equal(h.calls.length,0);
});
test('inicialização verifica novidades mesmo com consulta recente e mantém check-only',()=>{
 const h=setup();const current={available:false,phase:'complete',checkedAt:new Date().toISOString()};h.api.reflect(current);h.api.ready();assert.equal(h.calls.length,1);assert.equal(h.calls[0].method,'updateStart');assert.equal(h.calls[0].params.operation,'check-only');assert.equal(h.calls[0].params.automatic,true);vm.runInContext('updateBusy=false',h.context);h.api.check(current);assert.equal(h.calls.length,1);
});
test('nova versão do Oracle avisa mesmo sem atualização do acervo ou motor',()=>{
 const h=setup();h.context.window.ORACLE_PREVIEW=true;h.api.ready();h.api.reflect({...available,available:false,installableNow:false,applicationUpdateAvailable:true,applicationUpdateAvailableNow:true,knownUpdate:true,results:[{id:'oracle',status:'install_available'}]});
 assert.equal(h.notices.length,1);assert(h.classes.has('update-ready'));
});
test('pendência de publicação é distinta de atualização instalável',()=>{
 const h=setup();h.context.window.ORACLE_PREVIEW=true;h.api.ready();h.api.reflect({available:false,installableNow:false,knownUpdate:true,results:[{id:'skills',status:'publication_pending'}]});
 assert.equal(h.notices.length,0);assert.match(h.elements['#updates']['aria-label'],/publicação/);assert(!h.classes.has('update-ready'));
});
test('a consulta agendada se repete depois de uma hora sem refresh do vault',()=>{
 const h=setup(),current={available:false,phase:'complete',checkedAt:new Date(h.clock.now).toISOString()};h.api.reflect(current);h.api.ready();assert.equal(h.calls.length,1);
 vm.runInContext('updateBusy=false',h.context);h.api.reflect(current);h.clock.now+=3600001;
 const timer=[...h.timers.values()][0];h.timers.clear();timer.fn();assert.equal(h.calls.length,2);assert.equal(h.calls[1].params.automatic,true);assert.equal(h.calls[1].params.operation,'check-only');assert.equal(h.timers.size,1);
});
test('consulta não depende da confiança Codex e aceita instalação pausada',()=>{
 const h=setup();h.onboarding.integrationPending=true;h.onboarding.runID='fixture';h.onboarding.status='paused';h.api.check({phase:'idle'});assert.equal(h.calls.length,1);
});
test('consulta automática respeita janela oculta e instalação executando',()=>{
 const h=setup();h.context.window.oracleWindowVisible=false;h.api.check({phase:'idle'});h.context.window.oracleWindowVisible=true;h.onboarding.status='running';h.api.check({phase:'idle'});assert.equal(h.calls.length,0);
});
test('modal Atualizações permite consulta vencida mas editor aberto não',()=>{
 const h=setup();h.elements['#modal'].open=true;h.elements['#modal'].dataset.family='editor';h.api.check({phase:'idle'},{allowUpdateDialog:true});assert.equal(h.calls.length,0);h.elements['#modal'].dataset.family='updates';h.api.check({phase:'idle'},{allowUpdateDialog:true});assert.equal(h.calls.length,1);
});
test('três canais permanecem visíveis e Codex fica dentro do acervo',()=>{
 const h=setup(),rows=h.api.rows({results:[{id:'skills',status:'current'},{id:'codex',status:'available'}]});assert.equal(rows.length,3);assert.deepEqual(Array.from(rows,r=>r.id),['oracle','skills','gbrain']);assert.equal(rows[1].localIntegration.status,'available');
});
test('autoatualização só aceita o ZIP oficial da release Oracle esperada',()=>{
 const h=setup(),row={id:'oracle',status:'install_available',version:'0.3.14',downloadSHA256:'sha256:'+'a'.repeat(64),downloadURL:'https://github.com/nitroxinteligence/ORACLE/releases/download/v0.3.14/Oracle-0.3.14-macos-arm64.zip'};
 assert.equal(h.api.installable(row),true);
 for(const downloadURL of [row.downloadURL+'?redirect=elsewhere',row.downloadURL.replace('nitroxinteligence','foreign'),row.downloadURL.replace('arm64','x64'),row.downloadURL.replace('v0.3.14','v0.3.13')])assert.equal(h.api.installable({...row,downloadURL}),false);
 assert.equal(h.api.installable({...row,status:'error'}),false);
});

// Focused post-update onboarding regression: real production progress/controller
// functions with a bounded DOM contract, no WK/Core/personal profile.
const onboardingSource=readFileSync(new URL('../Resources/web/onboarding-v2.js',import.meta.url),'utf8');
function repairSetup(status,repairCall){
 const calls=[],toasts=[],hosts=new Map();
 const classes={toggle(){},contains:()=>false};
 const leaf=()=>({hidden:false,textContent:'',classList:classes,setAttribute(){}});
 for(const key of ['progress','strong','.ob2-install-error','.ob2-retry'])hosts.set(key,leaf());
 const buttons=['[data-open-codex]','[data-copy-codex]','[data-verify-codex]'].map(key=>{
  const host={key,button:null,replaceChildren(button){this.button=button||null},querySelector(){return this.button}};hosts.set(key,host);return host;
 });
 const actions={hidden:true,dataset:{},children:buttons,querySelector(key){return key==='button'?buttons.find(host=>host.button)?.button:key.endsWith(' button')?hosts.get(key.slice(0,-7))?.button:hosts.get(key)}};
 hosts.set('.ob2-codex-actions',actions);
 const progress={hidden:false,classList:classes,querySelector:key=>hosts.get(key)};
 const context=vm.createContext({current:{...status},progress,screen:{open:false},generation:1,busy:false,repairing:false,openedRun:'',integrationMessage:'',progressRun:'',progressValue:0,needsRecovery:()=>false,positionProgress(){},effects:()=>({beam(){}}),animate(){},clean(){},errorToast:error=>toasts.push(error.message),document:{createElement:()=>({textContent:'',disabled:false})},api:{call:async(method,params)=>{calls.push({method,params});if(method==='onboardingReprepareIntegration')return repairCall();if(method==='onboardingStatus')return {...status};return{}},refresh:async()=>{},toast:text=>toasts.push(text)}});
 const invoke=onboardingSource.slice(onboardingSource.indexOf('  async function invoke('),onboardingSource.indexOf('  function ensure('));
 const buttonsCode=onboardingSource.slice(onboardingSource.indexOf('  async function run('),onboardingSource.indexOf('  function closeScreen('));
 const progressCode=onboardingSource.slice(onboardingSource.indexOf('  function updateProgress('),onboardingSource.indexOf('  async function poll('));
 vm.runInContext(invoke+buttonsCode+progressCode+';globalThis.render=updateProgress;',context);
 context.render();return{context,calls,toasts,hosts,actions,progress,button:()=>hosts.get('[data-open-codex]').button};
}
const staleBridge={licensed:true,hasVault:true,status:'completed',runID:'synthetic',resumeExisting:true,integrationPending:false,bridgeNeedsReprepare:true,bridgeRepairMessage:'O Oracle foi atualizado. Atualize a ligação local com o Codex.',maintenance:{enabled:false}};
test('ponte stale oferece reparo sem manutenção/integrationPending ou abertura automática',()=>{
 const h=repairSetup(staleBridge,()=>({}));assert.equal(h.progress.hidden,false);assert.equal(h.button().textContent,'Atualizar integração local');assert.match(h.hosts.get('.ob2-install-error').textContent,/Oracle foi atualizado/);assert.equal(h.calls.length,0);assert.equal(h.hosts.get('[data-copy-codex]').button,null);assert.equal(h.hosts.get('[data-verify-codex]').button,null);
});
test('reparo chama ação exata uma vez, fica busy e aplica snapshot sem abrir Codex',async()=>{
 let resolve;const h=repairSetup(staleBridge,()=>new Promise(r=>{resolve=r}));
 const first=h.button().onclick();const duplicate=h.button().onclick();
 assert.equal(h.button().disabled,true);assert.equal(h.button().textContent,'Atualizando…');assert.equal(h.calls.length,1);assert.equal(h.calls[0].method,'onboardingReprepareIntegration');assert.equal(Object.keys(h.calls[0].params).length,0);
 resolve({...staleBridge,resumeExisting:false,bridgeNeedsReprepare:false,integrationPending:true,bridgeRepairMessage:'Ligação atualizada; revise a confiança no Codex.',hooksTrusted:false});await first;await duplicate;
 assert.equal(h.context.current.hooksTrusted,false);assert.equal(h.context.current.integrationPending,true);assert.equal(h.context.current.bridgeNeedsReprepare,false);assert.equal(h.button().textContent,'Abrir Codex');assert.match(h.hosts.get('.ob2-install-error').textContent,/revise a confiança/);assert.equal(h.calls.length,1);
});
test('conflito preservado mantém reparo disponível, erro visível e atualiza snapshot',async()=>{
 const h=repairSetup(staleBridge,()=>{throw Error('A configuração foi editada fora do Oracle. Revise antes de continuar.');});
 await h.button().onclick();assert.equal(h.button().disabled,false);assert.equal(h.button().textContent,'Atualizar integração local');assert.match(h.hosts.get('.ob2-install-error').textContent,/editada fora/);assert(h.toasts.some(text=>text.includes('editada fora')));assert.deepEqual(h.calls.map(c=>c.method),['onboardingReprepareIntegration','onboardingStatus','onboardingStatus']);
});
test('resposta tardia do reparo não aplica snapshot após encerramento',async()=>{
 let resolve;const h=repairSetup(staleBridge,()=>new Promise(r=>{resolve=r}));const click=h.button().onclick();h.context.generation++;resolve({...staleBridge,bridgeNeedsReprepare:false});await click;assert.equal(h.context.current.bridgeNeedsReprepare,true);assert.equal(h.calls.length,1);
});
