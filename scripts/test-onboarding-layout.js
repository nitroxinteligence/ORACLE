// Executed by audit-ui-host.swift with a synthetic bridge, never a personal profile.
const checks=[],wait=ms=>new Promise(resolve=>setTimeout(resolve,ms));
for(const size of [{width:1200,height:780},{width:840,height:620}]){
 await call('fixtureResize',size);
 for(const scenario of ['license','identity','review']){
  OracleOnboarding.suspend();
  const status={licensed:scenario!=='license',status:scenario==='review'?'review':scenario==='license'?'not_started':'configuring',hasVault:scenario!=='license',draft:{step:'identity',answers:{},ui:{group:0}}};
  if(scenario==='review')status.review={plan_hash:'synthetic-layout-plan',answers:{},folders:['WIKI'],catalog_collections:[]};
  await OracleOnboarding.mount({call:async method=>method==='onboardingStatus'?status:{},canOpen:()=>true});
  if(scenario!=='license')OracleOnboarding.open();
  await wait(450);
  const dialog=document.querySelector('.ob-dialog'),content=dialog.querySelector('.ob-content'),box=dialog.getBoundingClientRect(),inside=content.getBoundingClientRect();
  const label=scenario+' '+size.width+'x'+size.height;
  checks.push({name:label+' retains intrinsic content height',pass:dialog.open&&box.height>250&&inside.height>248,dialogHeight:box.height,contentHeight:inside.height});
  const footer=dialog.querySelector('footer'),foot=footer.getBoundingClientRect();
  checks.push({name:label+' keeps actions visible within the window',pass:box.top>=0&&box.bottom<=innerHeight+.5&&foot.height>0&&foot.bottom<=box.bottom+.5&&box.width<=innerWidth});
  const body=dialog.querySelector('.ob-body'),field=body.querySelector('textarea,input');
  if(field){const rect=field.getBoundingClientRect();checks.push({name:label+' exposes its first input inside the dialog',pass:rect.height>0&&rect.top>=box.top&&rect.top<box.bottom});}
 }
}
OracleOnboarding.suspend();
return {checks,passed:checks.filter(c=>c.pass).length,failed:checks.filter(c=>!c.pass).length,scope:'WKWebView layout with synthetic onboarding states'};
