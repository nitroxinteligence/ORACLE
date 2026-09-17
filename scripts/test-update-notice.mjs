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
const available={available:true,busy:false,checkedAt:new Date().toISOString()};
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
 const h=setup();h.context.window.ORACLE_PREVIEW=true;h.api.ready();for(const status of [{available:false},{available:false,phase:'failed'},{knownUpdate:true,available:false}])h.api.reflect(status);assert.equal(h.notices.length,0);assert(!h.classes.has('update-ready'));assert.match(h.elements['#updates']['aria-label'],/compatibilidade/);h.api.reflect(available);assert(h.classes.has('update-ready'));h.api.reflect({available:false});assert(!h.classes.has('update-ready'));
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
 const h=setup();h.context.window.ORACLE_PREVIEW=true;h.api.ready();h.api.reflect({...available,available:false,applicationUpdateAvailable:true,knownUpdate:true});
 assert.equal(h.notices.length,1);assert(h.classes.has('update-ready'));
});
test('pendência de publicação é distinta de atualização instalável',()=>{
 const h=setup();h.context.window.ORACLE_PREVIEW=true;h.api.ready();h.api.reflect({available:false,knownUpdate:true,results:[{id:'skills',status:'publication_pending'}]});
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
