import {Client} from '../vendor/gbrain/node_modules/@modelcontextprotocol/sdk/dist/esm/client/index.js';
import {StdioClientTransport} from '../vendor/gbrain/node_modules/@modelcontextprotocol/sdk/dist/esm/client/stdio.js';
import {readFileSync,writeFileSync,existsSync,readdirSync} from 'node:fs';
import {resolve,join} from 'node:path';
import {spawnSync} from 'node:child_process';
const config=JSON.parse(readFileSync('.work/latest-gbrain-test.json','utf8'));
const env={PATH:'/usr/bin:/bin',HOME:process.env.HOME!,GBRAIN_HOME:join(config.state,'gbrain/profile'),GBRAIN_HOOKS:'0'};
const slug='people/fixture-'+Date.now();
const transport=new StdioClientTransport({command:resolve('Resources/engine/oracle-gbrain-read'),args:['--mcp'],env,stderr:'pipe'});
const client=new Client({name:'oracle-fixture-client',version:'1'},{capabilities:{}});
try{
 await client.connect(transport);
 const tools=await client.listTools();
 if(tools.tools.some(t=>['think','synthesize','query','submit_agent','extract_facts'].includes(t.name)))throw Error('Unexpected inference/executor tool');
 const created=await client.callTool({name:'put_page',arguments:{slug,content:'---\ntitle: Pessoa Sintetica\ntype: person\n---\n# Pessoa Sintetica\n\nEntidade criada explicitamente para o teste.'}});if(created.isError)throw Error(JSON.stringify(created.content));
 const response=await client.callTool({name:'remember',arguments:{fact:'A pessoa sintética prefere exemplos curtos.',provenance:'oracle-e2e:literal-fixture',entity:slug,kind:'preference',ttl:'3d'}});
 if(response.isError)throw Error(JSON.stringify(response.content));
 const remembered=JSON.parse((response.content as any[]).find(c=>c.type==='text').text);
 const page=join(config.vault,'INBOX/oracle-memory/'+slug+'.md');
 if(!existsSync(page)||!readFileSync(page,'utf8').includes('prefere exemplos curtos'))throw Error('Canonical memory fence was not written');
 const read=spawnSync(resolve('Resources/engine/oracle-gbrain-read'),[],{env,input:JSON.stringify({operation:'search',source:'oracle-vault',query:'fixture'}),encoding:'utf8'});
 if(read.status!==0)throw Error('Idle MCP retained the engine writer lock');
 const result={mcp_handshake:true,tool_names:tools.tools.map(t=>t.name),remember_status:remembered.status,ttl_present:!!remembered.valid_until,canonical_fence_written:true,ui_read_while_mcp_connected:true,scope:'synthetic profile, official GBrain handlers, no inference or remote agent tools'};
 writeFileSync('docs/evidence/mcp-roundtrip.json',JSON.stringify(result,null,2));console.log(JSON.stringify(result));
}finally{await client.close()}
