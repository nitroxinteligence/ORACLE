import test from 'node:test';
import assert from 'node:assert/strict';
import {mkdtemp,mkdir,writeFile,readFile,cp,rm,readdir} from 'node:fs/promises';
import {createHash} from 'node:crypto';
import {join} from 'node:path';
import {inspectPluginUpdate,applyPluginUpdate} from '../packages/oracle-desktop-plugin/update.mjs';
const hash=data=>createHash('sha256').update(data).digest('hex');
async function makePackage(root,version,channel='developer') {
  await mkdir(root,{recursive:true});
  const contents={'plugin.json':JSON.stringify({name:'oracle-desktop',version}),'mcp.json':'{}','server.mjs':'// synthetic fixture',
    'runtime/bun':'synthetic Bun','runtime/Oracle.app/Contents/MacOS/Oracle':'synthetic native executable',
    'scripts/launch-mcp.sh':'#!/bin/sh\n',
    'runtime/Oracle.app/Contents/Resources/build-manifest.json':JSON.stringify({architecture:'arm64',channel,buildID:'synthetic',commit:'synthetic',sourceHash:'synthetic',signing:channel==='release'?'developer-id-hardened-runtime':'ad-hoc-development'})};
  const files={};
  for(const [name,value] of Object.entries(contents)){await mkdir(join(root,name,'..'),{recursive:true});await writeFile(join(root,name),value);files[name]=hash(value);}
  await writeFile(join(root,'package-receipt.json'),JSON.stringify({schemaVersion:1,plugin:'oracle-desktop',platform:'macOS-arm64',channel,bundleBuildID:'synthetic',bundleCommit:'synthetic',bundleSourceHash:'synthetic',files}));
}
async function fixture(t) {
  const home=await mkdtemp('/tmp/oracle-plugin-update-test-');t.after(()=>rm(home,{recursive:true,force:true}));
  const codexHome=join(home,'.codex'),pluginRoot=join(codexHome,'plugins/cache/personal/oracle-desktop/0.3.21'),source=join(home,'plugins/oracle-desktop');
  await makePackage(pluginRoot,'0.3.21');await makePackage(source,'0.3.22');
  await mkdir(join(home,'.agents/plugins'),{recursive:true});await writeFile(join(home,'.agents/plugins/marketplace.json'),JSON.stringify({name:'personal',plugins:[{name:'oracle-desktop',source:{source:'local',path:'./plugins/oracle-desktop'}}]}));
  const calls=[];
  const run=async(command,args)=>{
    calls.push({command,args});
    if(command==='/usr/bin/codesign')return '';
    if(args.join(' ')==='plugin marketplace list --json')return JSON.stringify({marketplaces:[{name:'personal',root:home}]});
    if(args.join(' ')==='plugin list --json')return JSON.stringify({installed:[{name:'oracle-desktop',version:'0.3.21',pluginId:'oracle-desktop@personal',marketplaceName:'personal',installed:true,enabled:true,source:{path:source}}]});
    if(args.join(' ')==='plugin add oracle-desktop@personal --json') {
      const installedPath=join(codexHome,'plugins/cache/personal/oracle-desktop/0.3.22');await cp(source,installedPath,{recursive:true});
      return JSON.stringify({pluginId:'oracle-desktop@personal',version:'0.3.22',installedPath});
    }
    throw new Error('Unexpected CLI command');
  };
  return {home,codexHome,pluginRoot,source,calls,run};
}
test('checks candidate semver from complete registered package without installing',async t=>{
  const f=await fixture(t),result=await inspectPluginUpdate(f);
  assert.equal(result.available,true);assert.equal(result.latestVersion,'0.3.22');assert.equal(f.calls.some(call=>call.args[1]==='add'),false);
});
test('updates through scoped host command with backup, signature verification and restart receipt',async t=>{
  const f=await fixture(t),result=await applyPluginUpdate(f);
  assert.equal(result.installed,true);assert.equal(result.restartRequired,true);
  assert.equal(JSON.parse(await readFile(join(f.pluginRoot,'plugin.json'))).version,'0.3.21');
  assert.equal(JSON.parse(await readFile(join(result.backupPath,'oracle-desktop/plugin.json'))).version,'0.3.21');
  assert.equal(f.calls.some(call=>call.command==='/usr/bin/codesign'),true);
  assert.deepEqual(f.calls.at(-1).args,['plugin','add','oracle-desktop@personal','--json']);
});
test('changed package is rejected before signature, installation or backup',async t=>{
  const f=await fixture(t);await writeFile(join(f.source,'server.mjs'),'tampered');
  await assert.rejects(applyPluginUpdate(f),/integridade/);assert.equal(f.calls.some(call=>call.args[1]==='add'),false);
});
test('fails closed on unsigned native runtime and does not call host install',async t=>{
  const f=await fixture(t),base=f.run;f.run=async(command,args)=>{if(command==='/usr/bin/codesign')throw new Error('signature rejected');return base(command,args);};
  await assert.rejects(applyPluginUpdate(f),/signature rejected/);assert.equal(f.calls.some(call=>call.args[1]==='add'),false);
});
test('remote refresh is explicit unsupported without signed complete source',async t=>{
  const f=await fixture(t);await assert.rejects(applyPluginUpdate({...f,refreshMarketplace:true}),/assinada/);assert.deepEqual(f.calls,[]);
});

test('release update rejects a different publisher before installing',async t=>{
  const f=await fixture(t);await makePackage(f.pluginRoot,'0.3.21','release');await makePackage(f.source,'0.3.22','release');const base=f.run;
  f.run=async(command,args)=>{if(command==='/usr/bin/codesign' && args.includes('--display'))return 'Authority=Developer ID Application: Synthetic\nTeamIdentifier='+ (args.at(-1).startsWith(f.source)?'OTHERTEAM':'OLDTEAM')+'\n';return base(command,args);};
  await assert.rejects(applyPluginUpdate(f),/emissor/);assert.equal(f.calls.some(call=>call.args[1]==='add'),false);
});

test('runtime provenance mismatch is rejected before installing',async t=>{
  const f=await fixture(t),path=join(f.source,'package-receipt.json');const receipt=JSON.parse(await readFile(path));receipt.bundleCommit='different';await writeFile(path,JSON.stringify(receipt));
  await assert.rejects(applyPluginUpdate(f),/procedência/);assert.equal(f.calls.some(call=>call.args[1]==='add'),false);
});

test('release runtime cannot silently update to a developer candidate',async t=>{
  const f=await fixture(t);await makePackage(f.pluginRoot,'0.3.21','release');
  await assert.rejects(applyPluginUpdate(f),/trocar o canal/);assert.equal(f.calls.some(call=>call.args[1]==='add'||call.command==='/usr/bin/codesign'),false);
});
