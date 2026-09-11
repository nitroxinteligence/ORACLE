// Runs only in audit-native-ui-host.swift. Never uses the installed app/profile.
const checks=[],delay=ms=>new Promise(resolve=>setTimeout(resolve,ms));
const check=(name,pass,details={})=>{checks.push({name,pass:!!pass,...details});if(!pass)throw Error(name);};
async function until(name,predicate,timeout=90000){const deadline=Date.now()+timeout;let value;do{value=await predicate();if(value)return value;await delay(180);}while(Date.now()<deadline);throw Error('Timeout: '+name);}
async function status(){await OracleOnboarding.poll();return OracleOnboarding.getState();}
function requireProgress(s){if(['failed','interrupted','cancelled'].includes(s.status))throw Error('Native installation '+s.status+': '+(s.message||s.phase||'unknown'));return s;}
try {
await until('frontend boot',()=>state.config?.vault&&OracleOnboarding.getState().licensed);
OracleOnboarding.open();
await until('vault step',()=>document.querySelector('#ob-vault-next'));
document.querySelector('#ob-vault-next').click();
for(let group=0;group<3;group++){
  await until('identity group '+group,()=>document.querySelectorAll('[data-answer]').length>0);
  const fields=[...document.querySelectorAll('[data-answer]')],first=fields[0].dataset.answer;
  for(const input of fields){input.value=input.dataset.answer==='PRINCIPAL_TIMEZONE'?'UTC':'Synthetic '+input.dataset.answer;input.dispatchEvent(new Event('input',{bubbles:true}));}
  document.querySelector('#ob-identity-next').click();
  await until('next interview screen',()=>document.querySelector('#ob-install')||document.querySelector('[data-answer]')?.dataset.answer!==first);
}
await until('review plan',()=>document.querySelector('#ob-install'));
let current=await status();
check('UI review comes from a persisted native local plan',current.review?.executor==='native-local'&&!!current.review?.plan_hash&&!current.codexConnected);
const planHash=current.review.plan_hash;
document.querySelector('.ob-close').click();OracleOnboarding.open();
check('review reopens with the same native hash',OracleOnboarding.getState().review.plan_hash===planHash&&!!document.querySelector('#ob-install'));
document.querySelector('#ob-install').click();
current=await until('real official readback',async()=>{const s=requireProgress(await status());return s.readback?s:false;});
check('real local prepare pauses for user readback',current.status==='waiting_user'&&current.readback.text.includes('Synthetic')&&!current.codexConnected);
check('original canonical document survives installation',(await call('read',{path:'WIKI/integration-note.md'})).text.includes('Initial synthetic revision'));
document.querySelector('#ob-confirm-identity').click();
current=await until('confirmation paused',async()=>{const s=await status();return s.status==='paused'?s:false;});
check('UI confirmation does not automatically finish or resume',current.phase==='identity_confirmed'&&!!document.querySelector('#ob-resume'));
await delay(500);check('confirmed installation remains paused until separate click',(await status()).status==='paused');
document.querySelector('#ob-resume').click();
current=await until('real native completion',async()=>{const s=requireProgress(await status());return s.status==='completed'?s:false;});
check('UI reflects real completion without Codex account',document.querySelector('#ob-title')?.textContent==='Seu Oracle está pronto.'&&!current.codexConnected);
document.querySelector('#ob-progress-close').click();await delay(100);await refresh();
await until('native index current',async()=>{const s=await call('memoryStatus');state.memorySync=s;return s.state==='current'&&!s.indexing;});
const listed=await call('gbrainRead',{operation:'list',source:'oracle-vault'}),hit=listed.find(row=>String(row.slug||row.page_slug).includes('integration-note'));
check('real GBrain lists the canonical fixture note',!!hit,{entries:listed.length});
const slug=hit.slug||hit.page_slug;
let page=await call('gbrainRead',{operation:'get',source:'oracle-vault',slug});
check('real native get returns hash-verified canonical content',page.freshness==='current_at_read'&&page.compiled_truth.includes('Initial synthetic revision'));
await openNote('WIKI/integration-note.md');editNote();
const field=document.querySelector('#editor');field.value='# Integration note\n\nSaved through the real Oracle editor\n';field.dispatchEvent(new Event('input',{bubbles:true}));
await saveEditor();check('real editor save remains mounted and clean',document.querySelector('#editor')===field&&!modalDirty);
await until('editor save indexed',async()=>{const s=await call('memoryStatus');return s.state==='current'&&!s.indexing;});
page=await call('gbrainRead',{operation:'get',source:'oracle-vault',slug});
check('saved editor text reaches the real derived index',page.compiled_truth.includes('Saved through the real Oracle editor'));
closeModal(true);await delay(80);
const previous=(await call('memoryStatus')).generation;
await call('fixtureExternalEdit');
await until('external edit detected and indexed',async()=>{const s=await call('memoryStatus');return s.generation>previous&&s.state==='current'&&!s.indexing;});
page=await call('gbrainRead',{operation:'get',source:'oracle-vault',slug});
check('filesystem observer reindexes external edits without restart',page.compiled_truth.includes('External synthetic revision'));
await call('fixtureResize');await delay(300);await refresh();
check('minimal window keeps actual 118 percent scale',Math.abs(atlasController.camera.k/atlasController.baseScale-1.18)<0.00001,{width:innerWidth,height:innerHeight,scale:atlasController.camera.k/atlasController.baseScale});
OracleOnboarding.suspend();
return {checks,passed:checks.filter(c=>c.pass).length,failed:checks.filter(c=>!c.pass).length,finished:true,physicalDeviceActivationVerified:false,remoteInferenceUsed:false};
} catch(error) {
  OracleOnboarding.suspend();
  return {checks,passed:checks.filter(c=>c.pass).length,failed:checks.filter(c=>!c.pass).length,fatal:String(error),finished:false,stack:error.stack,body:document.body.innerText.slice(0,2000)};
}
