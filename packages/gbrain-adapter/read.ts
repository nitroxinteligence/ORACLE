/** Read adapter over the official, pinned GBrain library. No SQL, AI gateway,
 * agent loop, extraction, embedding provider or auto-migration is invoked. */
import { createEngine } from '../../vendor/gbrain/src/core/engine-factory.ts';
import { loadConfig, toEngineConfig } from '../../vendor/gbrain/src/core/config.ts';
const input = JSON.parse(await Bun.stdin.text());
if (!['status','search','get','graph','list','index'].includes(input.operation)) throw Error('Unsupported operation');
const config = loadConfig();
if (!config) throw Error('GBrain has not been initialized in this profile');
const engine = await createEngine(toEngineConfig(config));
try {
  await engine.connect(toEngineConfig(config));
  let value: unknown;
  if(input.operation==='index'){const {indexVault}=await import('./index.ts');value=await indexVault(engine,input);} else if(input.operation==='status') {
    const sources=await engine.listAllSources();
    value={version:'0.48.4.0',commit:'2efaaf8f8a817b5b82e023383618fdcdb1cc5f7d',engine:config.engine||'postgres',sources:sources.map(s=>({id:s.id,name:s.name,local_path:s.local_path})),capabilities:['keyword-search','get-page','explicit-links'],inference:false};
  } else {
    const sourceId=input.source;
    if(typeof sourceId!=='string'||!sourceId||sourceId==='__all__')throw Error('Choose one source');
    const scope={sourceId};
    if(input.operation==='search') value=await engine.searchKeyword(String(input.query||'').slice(0,500),{...scope,limit:30});
    else if(input.operation==='list')value=(await engine.listPages({...scope,limit:100,sort:'updated_desc'})).map(p=>({slug:p.slug,title:p.title,source_id:p.source_id,updated_at:p.updated_at}));
    else if(input.operation==='get')value=await engine.getPage(String(input.slug),scope);
    else value=await engine.getLinks(String(input.slug),scope);
  }
  console.log(JSON.stringify({ok:true,value}));
} catch(error) {
  // Connection strings / provider credentials must never enter the UI.
  const message=String(error instanceof Error?error.message:error).replace(/(?:postgres(?:ql)?|https?):\/\/\S+/gi,'[endpoint omitted]').slice(0,600);
  console.log(JSON.stringify({ok:false,error:message}));
  process.exitCode=1;
} finally { await engine.disconnect(); }
