import assert from 'node:assert/strict';
import {readFileSync} from 'node:fs';
import vm from 'node:vm';
import test from 'node:test';

const source=readFileSync(new URL('../Resources/web/app.js',import.meta.url),'utf8');
const handshake=source.match(/^function markInterfaceReady\(\).*$/m)?.[0];
const boot=source.match(/^call\('boot'\)\.then\(.*$/m)?.[0];
assert.ok(handshake&&boot,'real startup and handshake must be present');

async function startup({locked=false,snapshotFails=false,bootFails=false}={}) {
  const calls=[],toasts=[],app={inert:true},lockScreen={hidden:!locked},window={};
  const context=vm.createContext({window,view:'map',graphEntrancePending:false,
    $:selector=>selector==='#app'?app:selector==='#lock-screen'?lockScreen:{},
    applyAccessibility:()=>{},OracleTransitions:{content:()=>{},enterApp:()=>{}},
    refresh:async()=>{if(snapshotFails)throw Error('Synthetic events unavailable');},
    requestGraphEntrance:()=>{},mountOnboarding:async()=>{},finishUpdateStartup:()=>{},
    toast:text=>toasts.push(text),
    call:async method=>{calls.push(method);if(method==='boot'&&bootFails)throw Error('Boot unavailable');return method==='boot'?{locked,accessibility:{}}:true;}
  });
  window.oracleLock=()=>{lockScreen.hidden=false;app.inert=true;};
  await vm.runInContext(handshake+'\n'+boot,context);
  return {calls,toasts,app,window};
}

test('snapshot failure does not reject a successfully rendered startup shell',async()=>{
  const result=await startup({snapshotFails:true});
  assert.equal(result.window.oracleStartupRendered,true);
  assert.equal(result.app.inert,false);
  assert.deepEqual(result.calls,['boot','interfaceReady']);
  assert.deepEqual(result.toasts,['Synthetic events unavailable']);
});
test('locked startup confirms shell without reading private snapshot',async()=>{
  const result=await startup({locked:true,snapshotFails:true});
  assert.equal(result.window.oracleStartupRendered,true);
  assert.equal(result.app.inert,true);
  assert.deepEqual(result.toasts,[]);
});
test('successful unlocked startup acknowledges the interface once',async()=>{
  const result=await startup();
  assert.equal(result.calls.filter(value=>value==='interfaceReady').length,1);
  assert.deepEqual(result.toasts,[]);
});
test('failed native boot never supplies a health acknowledgement',async()=>{
  const result=await startup({bootFails:true});
  assert.equal(result.window.oracleStartupRendered,undefined);
  assert.deepEqual(result.calls,['boot']);
});
