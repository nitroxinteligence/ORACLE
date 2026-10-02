import {execFile} from 'node:child_process';
import {promisify} from 'node:util';
import {createHash} from 'node:crypto';
import {createReadStream} from 'node:fs';
import {cp,readFile,readdir,lstat,mkdir,writeFile,realpath} from 'node:fs/promises';
import {homedir} from 'node:os';
import {resolve,relative,join,isAbsolute} from 'node:path';

const exec = promisify(execFile);
const pluginName = 'oracle-desktop';
const contained = (root,path) => {const value=relative(resolve(root),resolve(path));return value==='' || (!value.startsWith('..') && !isAbsolute(value));};
const sha = async path => {const hash=createHash('sha256');for await(const block of createReadStream(path))hash.update(block);return hash.digest('hex');};
const json = async path => JSON.parse(await readFile(path,'utf8'));
function context(options) {
  if(options.refreshMarketplace)throw new Error('A atualização remota do marketplace exige uma fonte completa assinada, ainda não configurada.');
  if(!options.pluginRoot)throw new Error('O diretório do plugin é obrigatório.');
  const home=resolve(options.home||homedir());
  const codexHome=resolve(options.codexHome||process.env.CODEX_HOME||join(home,'.codex'));
  const run=options.run || (async (command,args)=>{
    const {stdout,stderr}=await exec(command,args,{env:{...process.env,HOME:home,CODEX_HOME:codexHome},timeout:60000,maxBuffer:4*1024*1024});
    return command==='/usr/bin/codesign' && args.includes('--display')?stderr:stdout;
  });
  const cli=async args=>JSON.parse(await run(options.codexCommand||'codex',args));
  return {home,codexHome,run,cli,pluginRoot:resolve(options.pluginRoot)};
}
async function files(root,prefix='') {
  const found=[];
  for(const entry of await readdir(join(root,prefix),{withFileTypes:true})) {
    const path=prefix?`${prefix}/${entry.name}`:entry.name;
    if(entry.isSymbolicLink())throw new Error('O pacote contém um link simbólico.');
    if(entry.isDirectory())found.push(...await files(root,path));
    else if(entry.isFile() && path!=='package-receipt.json')found.push(path);
    else if(!entry.isFile())throw new Error('O pacote contém um recurso incompatível.');
  }
  return found.sort();
}
export async function verifyPluginPackage(root) {
  const receipt=await json(join(root,'package-receipt.json'));
  if(receipt.plugin!==pluginName || receipt.platform!=='macOS-arm64' || receipt.schemaVersion!==1)throw new Error('Pacote Oracle incompatível.');
  if(!receipt.files || typeof receipt.files!=='object')throw new Error('Recibo do pacote ausente.');
  const actual=await files(root);
  if(JSON.stringify(actual)!==JSON.stringify(Object.keys(receipt.files).sort()))throw new Error('O inventário do pacote não corresponde ao recibo.');
  for(const name of actual) {
    if(!contained(root,join(root,name)) || await sha(join(root,name))!==receipt.files[name])throw new Error('A integridade do pacote Oracle não foi confirmada.');
  }
  for(const name of ['plugin.json','mcp.json','server.mjs','runtime/bun','runtime/Oracle.app/Contents/MacOS/Oracle','scripts/launch-mcp.sh']) {
    if(!(name in receipt.files))throw new Error('O pacote Oracle está incompleto.');
  }
  const manifest=await json(join(root,'plugin.json'));
  if(manifest.name!==pluginName || !/^\d+\.\d+\.\d+$/.test(manifest.version))throw new Error('Identidade ou versão de plugin inválida.');
  const bundle=await json(join(root,'runtime/Oracle.app/Contents/Resources/build-manifest.json'));
  if(bundle.architecture!=='arm64' || bundle.channel!==receipt.channel || bundle.buildID!==receipt.bundleBuildID || bundle.commit!==receipt.bundleCommit || bundle.sourceHash!==receipt.bundleSourceHash)throw new Error('A procedência do runtime não corresponde ao recibo do plugin.');
  if(!['developer','release'].includes(receipt.channel))throw new Error('Canal de plugin inválido.');
  return {manifest,receipt,bundle,receiptHash:await sha(join(root,'package-receipt.json'))};
}
function newer(candidate,current) {
  const a=candidate.split('.').map(Number),b=current.split('.').map(Number);
  for(let i=0;i<3;i++){if(a[i]!==b[i])return a[i]>b[i];}
  return false;
}
async function registeredSource(ctx,installed) {
  const catalog=await ctx.cli(['plugin','marketplace','list','--json']);
  const marketplace=catalog.marketplaces?.find(item=>item.name===installed.marketplaceName);
  if(!marketplace)throw new Error('O marketplace instalado não está registrado neste host.');
  let entry,marketPath;
  for(const part of ['.agents/plugins/marketplace.json','.claude-plugin/marketplace.json','marketplace.json']) {
    const file=join(marketplace.root,part);
    let data;
    try{data=await json(file);}catch(error){if(error.code==='ENOENT')continue;throw error;}
    if(data.name!==installed.marketplaceName)continue;
    entry=data.plugins?.find(item=>item.name===pluginName);marketPath=file;if(entry)break;
  }
  if(entry?.source?.source!=='local' || !entry.source.path?.startsWith('./'))throw new Error('Este plugin não possui uma fonte local completa para atualização.');
  const source=resolve(marketplace.root,entry.source.path);
  if(!contained(marketplace.root,source) || source!==resolve(installed.source?.path||''))throw new Error('A fonte do plugin não corresponde ao marketplace registrado.');
  if(!contained(await realpath(marketplace.root),await realpath(source)))throw new Error('A fonte local sai do marketplace por um link simbólico.');
  const sourceStat=await lstat(source);
  if(sourceStat.isSymbolicLink() || !sourceStat.isDirectory())throw new Error('Fonte local de plugin inválida.');
  return {source,marketPath,marketHash:await sha(marketPath)};
}
async function inspect(ctx) {
  const manifest=await json(join(ctx.pluginRoot,'plugin.json'));
  if(manifest.name!==pluginName)throw new Error('Runtime fora do Oracle System.');
  const listing=await ctx.cli(['plugin','list','--json']);
  const matches=listing.installed?.filter(item=>item.name===pluginName && item.installed && item.enabled);
  if(matches?.length!==1)throw new Error('Selecione uma única instalação ativa do Oracle System no Codex.');
  const installed=matches[0];
  if(installed.pluginId!==`${pluginName}@${installed.marketplaceName}`)throw new Error('Identidade de instalação inválida.');
  const registered=await registeredSource(ctx,installed);
  const candidate=await verifyPluginPackage(registered.source);
  const currentBundle=await json(join(ctx.pluginRoot,'runtime/Oracle.app/Contents/Resources/build-manifest.json'));
  if(candidate.receipt.channel!==currentBundle.channel)throw new Error('A atualização não pode trocar o canal do runtime instalado. Use o fluxo explícito de instalação para mudar de canal.');
  return {installed,registered,candidate,manifest,currentBundle};
}
export async function inspectPluginUpdate(options) {
  const state=await inspect(context(options));
  return {supported:true,available:newer(state.candidate.manifest.version,state.installed.version),restartRequired:newer(state.installed.version,state.manifest.version),
    currentVersion:state.manifest.version,latestVersion:state.candidate.manifest.version,
    pluginId:state.installed.pluginId,channel:state.candidate.receipt.channel,
    message:newer(state.installed.version,state.manifest.version)?'A versão nova já está instalada. Abra uma nova interface do plugin.':newer(state.candidate.manifest.version,state.installed.version)?'Atualização completa do Oracle System disponível no marketplace registrado.':'Oracle System está na versão disponível neste marketplace.'};
}
export async function applyPluginUpdate(options) {
  const ctx=context(options),state=await inspect(ctx);
  if(newer(state.installed.version,state.manifest.version) && !newer(state.candidate.manifest.version,state.installed.version))return {installed:true,restartRequired:true,message:'A versão nova já está instalada. Abra uma nova interface do plugin.'};
  if(!newer(state.candidate.manifest.version,state.manifest.version))return {installed:false,restartRequired:false,message:'Nenhuma versão mais recente disponível.'};
  // The host remains responsible for plugin installation and approval policies.
  // Verify the signed native bundle independently of the hash inventory.
  await ctx.run('/usr/bin/codesign',['--verify','--deep','--strict',join(state.registered.source,'runtime/Oracle.app')]);
  if(state.candidate.receipt.channel==='release') {
    const details=await ctx.run('/usr/bin/codesign',['--display','--verbose=4',join(state.registered.source,'runtime/Oracle.app')]);
    const previous=await ctx.run('/usr/bin/codesign',['--display','--verbose=4',join(ctx.pluginRoot,'runtime/Oracle.app')]);
    const team=value=>value.match(/^TeamIdentifier=(.+)$/m)?.[1];
    if(state.candidate.bundle.signing!=='developer-id-hardened-runtime' || !details.includes('Authority=Developer ID Application:') || !team(details) || team(details)==='not set' || team(details)!==team(previous))throw new Error('O emissor da atualização release não corresponde ao runtime instalado.');
    await ctx.run('/usr/bin/xcrun',['stapler','validate',join(state.registered.source,'runtime/Oracle.app')]);
  }
  const backup=join(ctx.codexHome,'plugin-backups',`oracle-desktop-update-${Date.now()}`);
  await mkdir(backup,{recursive:true,mode:0o700});
  await cp(ctx.pluginRoot,join(backup,'oracle-desktop'),{recursive:true,errorOnExist:true,force:false});
  await cp(state.registered.marketPath,join(backup,'marketplace.json'));
  const record={pluginId:state.installed.pluginId,currentVersion:state.manifest.version,
    candidateVersion:state.candidate.manifest.version,source:state.registered.source,
    receiptHash:state.candidate.receiptHash,installed:false,restartRequired:false};
  await writeFile(join(backup,'update-receipt.json'),JSON.stringify(record,null,2)+'\n',{mode:0o600});
  const second=await verifyPluginPackage(state.registered.source);
  if(second.receiptHash!==state.candidate.receiptHash || await sha(state.registered.marketPath)!==state.registered.marketHash)throw new Error('A fonte mudou durante a atualização; o runtime atual foi preservado.');
  const result=await ctx.cli(['plugin','add',state.installed.pluginId,'--json']);
  if(result.pluginId!==state.installed.pluginId || result.version!==state.candidate.manifest.version || !result.installedPath)throw new Error('O host não confirmou a instalação da versão esperada.');
  if(!contained(join(ctx.codexHome,'plugins/cache'),result.installedPath))throw new Error('O host retornou um destino fora do cache de plugins.');
  const installed=await verifyPluginPackage(result.installedPath);
  if(installed.receiptHash!==state.candidate.receiptHash)throw new Error('O host instalou um pacote diferente do verificado; preserve a versão anterior.');
  Object.assign(record,{installed:true,installedPath:result.installedPath,restartRequired:true});
  await writeFile(join(backup,'update-receipt.json'),JSON.stringify(record,null,2)+'\n',{mode:0o600});
  return {...record,backupPath:backup,message:'Oracle System atualizado no Codex. Abra uma nova interface do plugin para usar a versão instalada.'};
}
