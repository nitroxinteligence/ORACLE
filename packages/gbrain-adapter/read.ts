/** Official pinned engine only: bounded input, explicit profiles, verified freshness. */
import {createEngine} from '../../vendor/gbrain/src/core/engine-factory.ts';
import {toEngineConfig} from '../../vendor/gbrain/src/core/config.ts';
import {ownedConfig} from './owned-runtime.ts';
import {explicitEngineConfig} from './scope.ts';
import {assertFreshPage,indexFreshness} from './freshness.ts';

if(Bun.argv.includes('--mcp')){
  const {startMemoryMcp}=await import('./mcp.ts');await startMemoryMcp();
}else{
  console.log=(...args)=>console.error(...args);
  let engine:Awaited<ReturnType<typeof createEngine>>|undefined;
  let response:{ok:boolean;value?:unknown;error?:string}={ok:false,error:'No operation completed'};
  const safeError=(error:unknown)=>String(error instanceof Error?error.message:error).replace(/(?:postgres(?:ql)?|https?):\/\/\S+/gi,'[endpoint omitted]').slice(0,600);
  try{
    const chunks:Uint8Array[]=[];let size=0;
    for await(const chunk of Bun.stdin.stream()){
      size+=chunk.byteLength;if(size>16_000_000)throw Error('Adapter request exceeds 16 MB');chunks.push(chunk);
    }
    const input=JSON.parse(Buffer.concat(chunks).toString('utf8'));
    if(!input||!['status','search','get','graph','list','index','backup'].includes(input.operation))throw Error('Unsupported operation');
    if(input.operation==='backup'){
      // Backup owns its official writer; never open an outer engine around it.
      const {runGBrainBackupOperation}=await import('./backup.ts');
      response={ok:true,value:await runGBrainBackupOperation(input)};
    }else{
      const owned=input.owned===true||input.operation==='index';
      const config=owned?ownedConfig():explicitEngineConfig();
      const engineConfig=owned?toEngineConfig(config):config.engineConfig;
      engine=await createEngine(engineConfig);await engine.connect(engineConfig);
      let value:unknown;
      if(input.operation==='index'){
        const {indexVault}=await import('./index.ts');value=await indexVault(engine,input);
      }else if(input.operation==='status'){
        const sources=await engine.listAllSources();
        value={version:'0.48.4.0',commit:'2efaaf8f8a817b5b82e023383618fdcdb1cc5f7d',engine:config.engine||'postgres',
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
    }
  }catch(error){response={ok:false,error:safeError(error)}}
  finally{try{if(engine)await engine.disconnect()}catch(error){response={ok:false,error:'Engine cleanup failed: '+safeError(error)}}}
  await Bun.stdout.write(JSON.stringify(response)+'\n');
  process.exit(response.ok?0:1);
}
