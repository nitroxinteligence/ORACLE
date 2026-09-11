/** MCP lifecycle adapter over official GBrain operations, never an AI executor.
 * Each request owns and releases the engine, so an idle Codex connection cannot
 * monopolize the PGLite writer lock or block the Oracle UI. */
import {Server} from '../../vendor/gbrain/node_modules/@modelcontextprotocol/sdk/dist/esm/server/index.js';
import {StdioServerTransport} from '../../vendor/gbrain/node_modules/@modelcontextprotocol/sdk/dist/esm/server/stdio.js';
import {CallToolRequestSchema,ListToolsRequestSchema} from '../../vendor/gbrain/node_modules/@modelcontextprotocol/sdk/dist/esm/types.js';
import {operations,OperationError} from '../../vendor/gbrain/src/core/operations.ts';
import {dispatchToolCall,normalizeOptionalParams,validateParams} from '../../vendor/gbrain/src/mcp/dispatch.ts';
import {findUnknownParams} from '../../vendor/gbrain/src/mcp/validate-params.ts';
import {buildToolDefs} from '../../vendor/gbrain/src/mcp/tool-defs.ts';
import {createEngine} from '../../vendor/gbrain/src/core/engine-factory.ts';
import type {BrainEngine} from '../../vendor/gbrain/src/core/engine.ts';
import {resolvePageWriteTarget} from '../../vendor/gbrain/src/core/write-through.ts';
import {importFromContent} from '../../vendor/gbrain/src/core/import-file.ts';
import {readFileSync,realpathSync} from 'node:fs';
import {relative} from 'node:path';
import {scopedNote} from './scope.ts';
import {assertFreshPage} from './freshness.ts';
import {ownedConfig,verifyMemorySource} from './owned-runtime.ts';
import {toEngineConfig} from '../../vendor/gbrain/src/core/config.ts';
const allowed=['remember','recall','entity','context_pack','delta','forget','search','get_page','list_pages','get_links','get_backlinks','traverse_graph','put_page'];
const ops=operations.filter(op=>allowed.includes(op.name));
const memorySource='oracle-memory',readSources=[memorySource,'oracle-vault'];

/** The pinned fact writer updates the canonical fence and fact rows, not the
 * Page body. Before an exact get→edit→put, reconcile that projection with the
 * official importer, without writing the canonical file or invoking embeddings.
 * Do not invent a page for an absent slug, follow an ungranted source, or return
 * the old Page when its configured canonical file cannot be read safely. */
async function refreshMemoryPage(engine:BrainEngine,slug:string){
 const page=await engine.getPage(slug,{sourceId:memorySource});if(!page)return;
 const target=await resolvePageWriteTarget(engine,page.slug,memorySource);
 if(!target.ok)throw Error('Canonical memory page unavailable; synchronize the memory source before editing.');
 const root=realpathSync(target.writeRoot),path=scopedNote(root,relative(root,target.filePath)),bytes=readFileSync(path);
 if(bytes.length>2_000_000)throw Error('Canonical memory page exceeds the 2 MB read limit.');
 const content=new TextDecoder('utf-8',{fatal:true}).decode(bytes);
 const imported=await importFromContent(engine,page.slug,content,{noEmbed:true,sourceId:memorySource,sourcePath:target.sourcePathToBind});
 if(imported.error||imported.status==='error'||imported.slug!==page.slug)throw Error('Canonical memory refresh did not preserve the requested identity.');
 if(!readFileSync(path).equals(bytes))throw Error('Canonical memory changed during refresh; retry the read before editing.');
}
export async function startMemoryMcp(){
 // Dependencies may log; stdout is exclusively the MCP protocol stream.
 console.log=(...args)=>console.error(...args);
 const server=new Server({name:'oracle-gbrain',version:'0.1.0'},{capabilities:{tools:{}}});
 server.setRequestHandler(ListToolsRequestSchema,async()=>({tools:buildToolDefs(ops,{strictParams:true})}));
 let queue:Promise<any>=Promise.resolve(),pending=0;
 server.setRequestHandler(CallToolRequestSchema,request=>{
  const rejected=(text:string)=>({isError:true,content:[{type:'text' as const,text}]});
  if(pending>=8)return rejected('Local memory queue is full; retry after the active request finishes.');
  if(Buffer.byteLength(JSON.stringify(request.params.arguments||{}),'utf8')>500_000)return rejected('Memory request exceeds the bounded input limit.');
  pending++;const received=Date.now();
  const work=async()=>{
   if(Date.now()-received>35_000)return rejected('Queued memory request expired without execution.');
   const op=ops.find(op=>op.name===request.params.name);if(!op)return {isError:true,content:[{type:'text' as const,text:'Tool is not enabled in Oracle.'}]};
   const params=normalizeOptionalParams(op,request.params.arguments||{}),invalid=validateParams(op,params);
   // The upstream grace period warns about unknown keys by default. Oracle
   // advertises closed schemas, so never silently ignore a source override.
   // Keep upstream required/type validation ahead of unknown-key validation.
   if(!invalid&&findUnknownParams(op,params).length)return rejected(JSON.stringify(new OperationError('invalid_params','Unknown parameters are not allowed by the Oracle tool schema.').toJSON()));
   const config=ownedConfig(),engineConfig=toEngineConfig(config);
   if(config.engine!=='pglite')return rejected('Offline memory requires an explicit local PGLite profile.');
   const engine=await createEngine(engineConfig);
   // A stuck official operation cannot monopolize an unbounded queue. Terminating
   // this disposable stdio adapter releases its OS DB lock; Codex may reconnect.
   const timer=setTimeout(()=>{console.error('Oracle memory request deadline exceeded; reconnect to resume.');process.exit(124)},35_000-(Date.now()-received));
   try{
    await engine.connect(engineConfig);
    await verifyMemorySource(engine);
    // `gbrain config set` persists this setting in the official database;
    // ops/search.ts uses the same DB value. The file-only config above still
    // owns endpoint selection, but cannot stand in for the search policy.
    if(await engine.getConfig('search.mcp_keyword_only')!=='true')return rejected('Offline memory requires keyword-only search enabled in the selected database.');
    if(!invalid&&op.name==='get_page'&&typeof params.slug==='string'&&
       (params.source_id===undefined||params.source_id===memorySource||params.source_id==='__all__'))await refreshMemoryPage(engine,params.slug);
    const originalGet=engine.getPage.bind(engine),originalSearch=engine.searchKeyword.bind(engine);
    engine.getPage=async(...args)=>assertFreshPage(await originalGet(...args));
    engine.searchKeyword=async(...args)=>{
      const hits=await originalSearch(...args);
      for(const hit of hits)if(hit.source_id==='oracle-vault')assertFreshPage(await originalGet(hit.slug,{sourceId:'oracle-vault'}));
      return hits;
    };
    // A server-owned local grant feeds the official source-scope resolver. It
    // is not an OAuth login/token or device attestation: remote=true still
    // applies all untrusted-reader privacy and provenance rules. A federated
    // default alone does NOT reject explicit out-of-scope source_id requests.
    return await dispatchToolCall(engine,op.name,params,{remote:true,transport:'stdio',sourceId:memorySource,
      auth:{token:'',clientId:'oracle-local-stdio',scopes:['read','write'],sourceId:memorySource,allowedSources:[...readSources]},
      takesHoldersAllowList:['world'],allowedOps:new Set(allowed)});
   }
   catch(error){return {isError:true,content:[{type:'text' as const,text:String(error instanceof Error?error.message:error).replace(/(?:postgres(?:ql)?|https?):\/\/\S+/gi,'[endpoint omitted]').slice(0,1500)}]}}
   finally{try{await engine.disconnect()}finally{clearTimeout(timer)}}
  };
  const result=queue.then(work,work).catch(error=>rejected(String(error instanceof Error?error.message:error).replace(/(?:postgres(?:ql)?|https?):\/\/\S+/gi,'[endpoint omitted]').slice(0,600))).finally(()=>{pending--});
  queue=result.then(()=>undefined,()=>undefined);return result;
 });
 await server.connect(new StdioServerTransport());
}
