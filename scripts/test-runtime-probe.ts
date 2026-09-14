import {mkdirSync,writeFileSync,readFileSync,chmodSync,existsSync,rmSync} from 'node:fs';
import {resolve,join} from 'node:path';
import {probeRuntime} from '../packages/gbrain-adapter/runtime-probe.ts';
const base=resolve('.work/probe-boundary'),profile=join(base,'copy');mkdirSync(profile,{recursive:true});
const outside=join(base,'personal.md');writeFileSync(outside,'original');
for(const [name,body] of [['fail','exit 1'],['write',`set -e\nprintf changed > '${outside}'`],['noop','exit 0']]){
 const executable=join(base,name);writeFileSync(executable,'#!/bin/sh\n'+body+'\n');chmodSync(executable,0o700);
 let rejected=false;try{await probeRuntime(executable,profile)}catch{rejected=true}
 if(!rejected)throw Error('Probe accepted '+name);console.log('PASS rejected '+name);
}
if(readFileSync(outside,'utf8')!=='original')throw Error('Probe modified outside file');
console.log('PASS sandbox preserves files outside candidate');

rmSync(base,{recursive:true,force:true});
