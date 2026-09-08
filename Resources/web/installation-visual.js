/* The installation view only admits documents whose receipts are verified by Core.
 * Timelapse is a separate visual snapshot and never calls an installation method. */
(function(){
  let runID=null,baseline=new Set();
  function projection(state){
    const progress=state.onboarding||{};
    if(progress.runID&&progress.runID!==runID){runID=progress.runID;baseline=new Set()}
    if(state.setup?.plan_id===runID&&Array.isArray(state.setupBaselinePaths))baseline=new Set(state.setupBaselinePaths);
    const awaitingSetup=progress.legacyAccess===false&&(progress.licensed===false||['not_started','configuring','review'].includes(progress.status));
    if(awaitingSetup)return {entries:state.entries,collections:[],connectors:[],coreReady:false,forming:false};
    const forming=!!progress.runID&&!['completed','not_started','configuring','review'].includes(progress.status);
    const confirmed=progress.confirmed||[],sources=confirmed.filter(c=>c.kind==='connector');
    if(!forming)return {entries:state.entries,collections:state.collections,connectors:sources,coreReady:true,forming:false};
    const verified=new Set(confirmed.filter(c=>c.kind==='skill').map(c=>c.path||c.id));
    const entries=state.entries.filter(e=>e.directory||e.name!=='SKILL.md'||baseline.has(e.path)||verified.has(e.path));
    const hasVault=sources.some(c=>c.id==='obsidian');
    const collections=state.collections.filter(c=>entries.some(e=>e.path.startsWith(`SISTEMA/skills/${c.id}/`)&&(!e.directory||hasVault||baseline.has(e.path))));
    return {entries,collections,connectors:sources,coreReady:confirmed.some(c=>c.kind==='core'),forming:true};
  }
  window.OracleInstallationVisual={projection,reset(){runID=null;baseline=new Set()}};
})();
