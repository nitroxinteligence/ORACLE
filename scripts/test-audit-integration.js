// Runs only inside audit-integration-host.swift. No replacement of the JS/native bridge.
const checks = [], wait = ms => new Promise(resolve => setTimeout(resolve, ms));
const check = (name, pass, evidence = {}) => { checks.push({name, pass: !!pass, ...evidence}); if (!pass) throw Error(name); };
const until = async (name, predicate, timeout = 60000) => {
  const deadline = Date.now() + timeout;
  while (Date.now() < deadline) { if (await predicate()) return; await wait(150); }
  throw Error('Timeout: ' + name);
};
const click = selector => { const button = document.querySelector(selector); if (!button || button.disabled) throw Error('Missing/enabled control: ' + selector); button.click(); };
const input = (selector, value) => { const field = document.querySelector(selector); if (!field) throw Error('Missing field: ' + selector); field.value = value; field.dispatchEvent(new Event('input', {bubbles:true})); };
let failure;
try {
  await until('native onboarding boot', () => !!document.querySelector('#ob-vault'));
  check('fixture license projection does not require Codex', OracleOnboarding.getState().licensed && !OracleOnboarding.getState().codexConnected);
  click('#ob-vault');
  await until('selected fixture vault', () => OracleOnboarding.getState().hasVault);
  click('#ob-vault-next');
  await until('identity fields', () => !!document.querySelector('#ob-AGENT_NAME'));
  input('#ob-AGENT_NAME', 'Oracle Integration'); input('#ob-PRINCIPAL_NAME', 'Synthetic Student'); input('#ob-PRINCIPAL_TIMEZONE', 'America/Recife'); click('#ob-identity-next');
  await until('purpose fields', () => !!document.querySelector('#ob-AGENT_PURPOSE'));
  input('#ob-AGENT_PURPOSE', 'Validate only disposable local fixtures.'); input('#ob-AGENT_TOP_JOBS', 'Read and edit synthetic Markdown notes.'); click('#ob-identity-next');
  await until('context fields', () => !!document.querySelector('#ob-PRINCIPAL_CONTEXT'));
  input('#ob-PRINCIPAL_CONTEXT', 'A synthetic test account with no personal information.'); input('#ob-VOICE_REGISTER', 'Clear and factual.'); click('#ob-identity-next');
  await until('durable review', () => !!document.querySelector('#ob-install'));
  const plan = OracleOnboarding.getState().review;
  check('review comes from native validated local plan', !!plan?.plan_hash && plan.executor === 'native-local');
  click('.ob-close'); OracleOnboarding.open();
  check('reopened review preserves real plan hash', OracleOnboarding.getState().review.plan_hash === plan.plan_hash && !!document.querySelector('#ob-install'));
  click('#ob-install');
  await until('real GBrain readback', async () => {
    await OracleOnboarding.poll(); const current = OracleOnboarding.getState();
    if (['interrupted','failed'].includes(current.status)) throw Error('Native install failed: ' + current.message);
    return !!document.querySelector('#ob-confirm-identity');
  }, 120000);
  const readback = OracleOnboarding.getState().readback;
  check('official interview requires explicit confirmation', !!readback?.hash && readback.text.includes('Synthetic Student'));
  click('#ob-confirm-identity');
  await until('paused after confirmation', () => OracleOnboarding.getState().status === 'paused');
  const paused = await call('fixtureEvidence');
  check('native confirmation did not resume automatically', !paused.calls.onboardingResume && !!document.querySelector('#ob-resume'));
  click('.ob-close'); OracleOnboarding.open();
  check('confirmed pause survives modal reopening', !!document.querySelector('#ob-resume') && !document.querySelector('#ob-confirm-identity'));
  click('#ob-resume');
  await until('complete real local installation', async () => {
    await OracleOnboarding.poll(); const current = OracleOnboarding.getState();
    if (['interrupted','failed'].includes(current.status)) throw Error('Native resume failed: ' + current.message);
    return current.status === 'completed';
  }, 120000);
  check('UI follows native completion', document.querySelector('#ob-title')?.textContent === 'Seu Oracle está pronto.');
  const verified = await call('fixtureVerify');
  check('real final receipts verify without hook trust or model discovery', verified.structure && verified.memory && verified.skill && verified.localOnly && verified.hooksTrusted === false && verified.skillDiscoveredByCodex === false);
  click('.ob-close'); await wait(50); await refresh();
  await until('cached scan available', async () => { await refresh(); return state.entries.some(e => e.path === 'WIKI/Integration.md'); });
  await until('native index current', async () => (await call('memoryStatus')).state === 'current');
  const rows = await call('gbrainRead', {operation:'list', source:'oracle-vault'});
  const original = rows.find(row => (row.slug || '').includes('integration'));
  check('real engine lists canonical fixture', !!original?.slug, {rows: rows.length});
  const page = await call('gbrainRead', {operation:'get', source:'oracle-vault', slug:original.slug});
  check('derived page points back to canonical file', page.canonical_path?.endsWith('/vault/WIKI/Integration.md') && !!page.indexed_hash);
  await openNote('WIKI/Integration.md'); editNote();
  await call('fixtureSaveDelay', {seconds:0.25});
  const field = document.querySelector('#editor'); input('#editor', '# Integration\n\nSaved alpha revision.');
  const save = saveEditor(); await wait(40); input('#editor', '# Integration\n\nLatest beta typed while saving.'); await save;
  check('actual file save preserves concurrent newer typing', document.querySelector('#editor') === field && field.value.includes('Latest beta') && modalDirty);
  const interim = await call('read', {path:'WIKI/Integration.md'});
  check('newer draft is durable against the acknowledged file hash', interim.text.includes('Saved alpha') && interim.draft?.text.includes('Latest beta') && interim.draft.originalHash === interim.hash);
  await saveEditor(); await call('fixtureSaveDelay', {seconds:0});
  check('later revision saved to real canonical file', (await call('read', {path:'WIKI/Integration.md'})).text.includes('Latest beta'));
  closeModal(true); await wait(30);
  await until('save invalidates and refreshes real index', async () => {
    if ((await call('memoryStatus')).state !== 'current') return false;
    try { return (await call('gbrainRead', {operation:'get', source:'oracle-vault', slug:original.slug})).compiled_truth.includes('Latest beta'); } catch { return false; }
  });
  check('native editor to coordinator to official engine roundtrip', true);
  await call('fixtureStopSync');
  await until('own indexer stopped', async () => !(await call('memoryStatus')).indexing);
  await call('fixtureExternalEdit', {text:'# Integration\n\nExternal gamma revision.'});
  let staleRejected = false;
  try { await call('gbrainRead', {operation:'get', source:'oracle-vault', slug:original.slug}); } catch { staleRejected = true; }
  check('stale derived page is refused after actual external edit', staleRejected);
  await call('memoryRefresh');
  await until('external edit indexed', async () => {
    if ((await call('memoryStatus')).state !== 'current') return false;
    try { return (await call('gbrainRead', {operation:'get', source:'oracle-vault', slug:original.slug})).compiled_truth.includes('External gamma'); } catch { return false; }
  });
  check('external edit can be rebuilt locally without changing canonical ownership', true);
  await call('fixtureResize'); await wait(200); atlasController.fit(); await wait(100);
  const fixed = () => Math.abs(atlasController.target.k / atlasController.baseScale - 1.18) < 1e-8 && Math.abs(atlasController.camera.k / atlasController.baseScale - 1.18) < 1e-8;
  check('small-window actual camera scale is 118 percent', fixed());
  atlasController.zoomAt(4); await wait(50); check('legacy zoom input cannot change scale', fixed());
  atlasController.navigateDepartment('code', 0, true); await wait(100); check('department context keeps fixed scale', fixed());
  atlasController.back(true); await wait(50); check('return keeps fixed scale', fixed());
  const evidence = await call('fixtureEvidence');
  check('default flow never starts account login or model execution', evidence.codexCalls.length === 0 && !evidence.calls.onboardingConnect && !evidence.calls.onboardingInstallWithCodex);
  check('resume was one separate explicit native action', evidence.calls.onboardingResume === 1);
} catch (error) { failure = String(error); checks.push({name: 'integration exception', pass:false, error:failure, stack:error.stack}); }
OracleOnboarding.suspend();
return {checks, passed:checks.filter(c=>c.pass).length, failed:checks.filter(c=>!c.pass).length, ...(failure ? {fatal:failure, title:document.querySelector('#ob-title')?.textContent, message:document.querySelector('[data-ob-message]')?.textContent} : {})};
