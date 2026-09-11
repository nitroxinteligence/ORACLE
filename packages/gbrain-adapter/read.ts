/** Thin adapter over the official pinned GBrain library; no inference or migration. */
import {createEngine} from '../../vendor/gbrain/src/core/engine-factory.ts';
import {explicitEngineConfig} from './scope.ts';
import {assertFreshPage,indexFreshness} from './freshness.ts';
if(Bun.argv.includes('--mcp')){
  const {startMemoryMcp}=await import('./mcp.ts');await startMemoryMcp();
}else{
  let engine:Awaited<ReturnType<typeof createEngine>>|undefined;
  let response:unknown,exitStatus=0;
  try{
    const chunks:Uint8Array[]=[];let size=0;
    for await(const chunk of Bun.stdin.stream()){
      size+=chunk.byteLength;if(size>16_000_000)throw Error('Adapter request exceeds 16 MB');chunks.push(chunk);
    }
    const input=JSON.parse(Buffer.concat(chunks).toString('utf8'));
    if(!['status','search','get','graph','list','index'].includes(input.operation))throw Error('Unsupported operation');
    const config=explicitEngineConfig();
    engine=await createEngine(config.engineConfig);await engine.connect(config.engineConfig);
    let value:unknown;
    if(input.operation==='index'){
      const {indexVault}=await import('./index.ts');value=await indexVault(engine,input);
    }else if(input.operation==='status'){
      const sources=await engine.listAllSources();
      value={version:'0.48.4.0',commit:'2efaaf8f8a817b5b82e023383618fdcdb1cc5f7d',engine:config.engine,
        sources:sources.map(s=>({id:s.id,name:s.name,local_path:s.local_path})),
        capabilities:['keyword-search','get-page','explicit-links'],inference:false,index:indexFreshness()};
    }else{
      const sourceId=input.source;if(typeof sourceId!=='string'||!sourceId||sourceId==='__all__')throw Error('Choose one source');
      const scope={sourceId};
      if(input.operation==='search')value=await engine.searchKeyword(String(input.query||'').slice(0,500),{...scope,limit:30});
      else if(input.operation==='list')value=(await engine.listPages({...scope,limit:100,sort:'updated_desc'})).map(p=>({slug:p.slug,title:p.title,source_id:p.source_id,updated_at:p.updated_at}));
      else if(input.operation==='get')value=assertFreshPage(await engine.getPage(String(input.slug),scope));
      else{if(sourceId==='oracle-vault')assertFreshPage(await engine.getPage(String(input.slug),scope));value=await engine.getLinks(String(input.slug),scope)}
    }
    response={ok:true,value};
  }catch(error){
    const message=String(error instanceof Error?error.message:error).replace(/(?:postgres(?:ql)?|https?):\/\/\S+/gi,'[endpoint omitted]').slice(0,600);
    response={ok:false,error:message};exitStatus=1;
  }finally{
    try{if(engine)await engine.disconnect()}catch{response={ok:false,error:'Engine cleanup failed; state preserved for inspection'};exitStatus=1}
  }
  // Pinned PGLite/Emscripten overwrites ambient process.exitCode during teardown
  // (official pglite-engine.ts #2084). Flush the response, then exit with OUR code.
  await Bun.stdout.write(JSON.stringify(response)+'\n');
  process.exit(exitStatus);
}
