import {readFileSync} from 'node:fs';
import vm from 'node:vm';
import test from 'node:test';
import assert from 'node:assert/strict';

const source=readFileSync(new URL('../Resources/web/app.js',import.meta.url),'utf8');
const updateCode=source.slice(source.indexOf('let startupUpdateReady='),source.indexOf('function updateResultRows('));
function setup(){
 const notices=[],opened=[],calls=[],classes=new Set(),elements={
  '#app':{inert:false},'#modal':{open:false},'#lock-screen':{hidden:true},
  '#updates':{classList:{toggle(name,on){on?classes.add(name):classes.delete(name)},remove(name){classes.delete(name)}},dataset:{},setAttribute(name,value){this[name]=value}},
  '#update-notice-later':{},'#update-notice-open':{}
 };
 const onboarding={hasVault:true,licensed:true,status:'completed'};
 const context=vm.createContext({document:{hidden:false},window:{oracleWindowVisible:true,OracleOnboarding:{getState:()=>onboarding}},state:{config:{},onboarding},updateBusy:false,$:selector=>elements[selector],navigationBlocked:()=>!elements['#lock-screen'].hidden||context.dirty,modal:html=>{notices.push(html);elements['#modal'].open=true;return true},actions:html=>html,safe:fn=>fn,closeModal:()=>{elements['#modal'].open=false},showUpdates:operation=>opened.push(operation),call:(method,params)=>{calls.push({method,params});return new Promise(()=>{})},setTimeout,clearTimeout});
 vm.runInContext(updateCode+';globalThis.api={ready:finishUpdateStartup,reflect:reflectUpdateStatus,notify:maybeShowStartupUpdateNotice,check:maybeAutomaticUpdateCheck};',context);
 return {context,elements,classes,notices,opened,calls,onboarding,api:context.api};
}
const available={available:true,busy:false,checkedAt:new Date().toISOString()};
test('avisa uma vez por abertura e reaparece em uma nova inicialização',()=>{
 for(let i=0;i<2;i++){const h=setup();h.context.window.ORACLE_PREVIEW=true;h.api.ready();h.api.reflect(available);assert.equal(h.notices.length,1);h.elements['#update-notice-later'].onclick();h.api.reflect(available);h.api.notify();assert.equal(h.notices.length,1);assert(h.classes.has('update-ready'));}
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
 const h=setup();h.context.window.ORACLE_PREVIEW=true;h.api.ready();h.api.reflect(available);h.elements['#update-notice-open'].onclick();assert.deepEqual(h.opened,[undefined]);assert.equal(h.calls.length,0);
});
test('inicialização verifica novidades mesmo com consulta recente e mantém check-only',()=>{
 const h=setup();const current={available:false,phase:'complete',checkedAt:new Date().toISOString()};h.api.reflect(current);h.api.ready();assert.equal(h.calls.length,1);assert.equal(h.calls[0].method,'updateStart');assert.equal(h.calls[0].params.operation,'check-only');h.context.updateBusy=false;h.api.check(current);assert.equal(h.calls.length,1);
});
