/** Read/sync adapter over the official pinned engine. No SQL, extra AI
 * executor, credential discovery, embedding or automatic migration. */
import {createEngine} from '../../vendor/gbrain/src/core/engine-factory.ts';
import {loadConfig,toEngineConfig} from '../../vendor/gbrain/src/core/config.ts';
import {ownedConfig} from './owned-runtime.ts';

if (Bun.argv.includes('--mcp')) {
  const {startMemoryMcp}=await import('./mcp.ts');await startMemoryMcp();
} else {
  // stdout is exactly one protocol response, never dependency logging.
  console.log=(...args)=>console.error(...args);
  let engine:Awaited<ReturnType<typeof createEngine>>|undefined;
  let response:{ok:boolean;value?:unknown;error?:string}={ok:false,error:'No operation was completed'};
  const safeError=(error:unknown)=>String(error instanceof Error?error.message:error).replace(/(?:postgres(?:ql)?|https?):\/\/\S+/gi,'[endpoint omitted]').slice(0,600);
  try {
    const input=JSON.parse(await Bun.stdin.text());
    if (!input || !['status','search','get','graph','list','index','backup'].includes(input.operation)) throw Error('Unsupported operation');
    if (input.operation==='backup') {
      const {runGBrainBackupOperation}=await import('./backup.ts');
      response={ok:true,value:await runGBrainBackupOperation(input)};
    } else {
    const config=input.owned===true || input.operation==='index' ? ownedConfig() : loadConfig();
    if (!config) throw Error('GBrain has not been initialized in this profile');
    engine=await createEngine(toEngineConfig(config));await engine.connect(toEngineConfig(config));
    let value:unknown;
    if (input.operation==='index') {
      const {indexVault}=await import('./index.ts');value=await indexVault(engine,input);
    } else if (input.operation==='status') {
      const sources=await engine.listAllSources();
      value={version:'0.48.4.0',commit:'2efaaf8f8a817b5b82e023383618fdcdb1cc5f7d',engine:config.engine||'postgres',sources:sources.map(s=>({id:s.id,name:s.name,local_path:s.local_path})),capabilities:['keyword-search','get-page','explicit-links'],inference:false};
    } else {
      const sourceId=input.source;
      if (typeof sourceId!=='string' || !sourceId || sourceId==='__all__') throw Error('Choose one source');
      const scope={sourceId};
      if (input.operation==='search') value=await engine.searchKeyword(String(input.query||'').slice(0,500),{...scope,limit:30});
      else if (input.operation==='list') value=(await engine.listPages({...scope,limit:100,sort:'updated_desc'})).map(p=>({slug:p.slug,title:p.title,source_id:p.source_id,updated_at:p.updated_at}));
      else if (input.operation==='get') value=await engine.getPage(String(input.slug),scope);
      else value=await engine.getLinks(String(input.slug),scope);
    }
    response={ok:true,value};
    }
  } catch (error) { response={ok:false,error:safeError(error)}; }
  finally {
    try { if (engine) await engine.disconnect(); }
    catch (error) { response={ok:false,error:'Engine did not close cleanly: '+safeError(error)}; }
  }
  // PGLite's WASM teardown can reset process.exitCode. Set it AFTER disconnect
  // so a bad ownership receipt cannot look like a successful CLI invocation.
  process.stdout.write(JSON.stringify(response)+'\n');process.exitCode=response.ok?0:1;
}
