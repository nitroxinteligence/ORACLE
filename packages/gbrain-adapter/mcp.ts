/** MCP lifecycle adapter over official GBrain operations, never an AI executor.
 * Each request owns and releases the engine, so an idle Codex connection cannot
 * monopolize the PGLite writer lock or block the Oracle UI. */
import {Server} from '../../vendor/gbrain/node_modules/@modelcontextprotocol/sdk/dist/esm/server/index.js';
import {StdioServerTransport} from '../../vendor/gbrain/node_modules/@modelcontextprotocol/sdk/dist/esm/server/stdio.js';
import {CallToolRequestSchema,ListToolsRequestSchema} from '../../vendor/gbrain/node_modules/@modelcontextprotocol/sdk/dist/esm/types.js';
import {operations} from '../../vendor/gbrain/src/core/operations.ts';
import {dispatchToolCall} from '../../vendor/gbrain/src/mcp/dispatch.ts';
import {buildToolDefs} from '../../vendor/gbrain/src/mcp/tool-defs.ts';
import {createEngine} from '../../vendor/gbrain/src/core/engine-factory.ts';
import {ownedConfig,verifyMemorySource} from './owned-runtime.ts';
import {toEngineConfig} from '../../vendor/gbrain/src/core/config.ts';
const allowed=['remember','recall','entity','context_pack','delta','forget','search','get_page','list_pages','get_links','get_backlinks','traverse_graph','put_page'];
const ops=operations.filter(op=>allowed.includes(op.name));
export async function startMemoryMcp(){
 // Dependencies may log; stdout is exclusively the MCP protocol stream.
 console.log=(...args)=>console.error(...args);
 const server=new Server({name:'oracle-gbrain',version:'0.1.0'},{capabilities:{tools:{}}});
 server.setRequestHandler(ListToolsRequestSchema,async()=>({tools:buildToolDefs(ops,{strictParams:true})}));
 let queue:Promise<any>=Promise.resolve();
 server.setRequestHandler(CallToolRequestSchema,request=>{
  const work=async()=>{
   const op=ops.find(op=>op.name===request.params.name);if(!op)return {isError:true,content:[{type:'text' as const,text:'Tool is not enabled in Oracle.'}]};
   let engine:Awaited<ReturnType<typeof createEngine>>|undefined;
   try{const config=ownedConfig();engine=await createEngine(toEngineConfig(config));await engine.connect(toEngineConfig(config));await verifyMemorySource(engine);return await dispatchToolCall(engine,op.name,request.params.arguments||{},{remote:true,transport:'stdio',sourceId:'oracle-memory',localFederatedSourceIds:['oracle-memory','oracle-vault'],takesHoldersAllowList:['world'],allowedOps:new Set(allowed)});}
   catch(error){return {isError:true,content:[{type:'text' as const,text:String(error instanceof Error?error.message:error).replace(/(?:postgres(?:ql)?|https?):\/\/\S+/gi,'[endpoint omitted]').slice(0,1500)}]}}
   finally{if(engine)await engine.disconnect()}
  };
  const result=queue.then(work,work);queue=result.then(()=>undefined,()=>undefined);return result;
 });
 await server.connect(new StdioServerTransport());
}
