import {strict as assert} from 'node:assert';
import {canonicalizeLocalLinks,hasKnownEndpoints} from '../packages/gbrain-adapter/link-resolution.ts';
import {extractPageLinks,makeResolver} from '../vendor/gbrain/src/core/link-extraction.ts';
const byPath=new Map([['Root.md','root'],['sub/Origin.md','sub/origin'],['sub/Root.md','sub/root']]);
const engine:any={resolveSlugsByPaths:async()=>new Map(),getAllSlugs:async()=>new Set(byPath.values()),getPage:async()=>null,resolveSlugs:async()=>new Map()};
let checks=0;
for(const [origin,source,text,target] of [
 ['alpha','Alpha.md','[Root](Root.md)','root'],
 ['sub/origin','sub/Origin.md','[Root](../Root.md)','root'],
 ['sub/origin','sub/Origin.md','[Sibling](Root.md)','sub/root'],
 ['sub/origin','sub/Origin.md','[Absolute](</Root.md>)','root'],
]){
 const normalized=canonicalizeLocalLinks(text,source,byPath);
 const links=await extractPageLinks(origin,normalized,{},'note',makeResolver(engine,{mode:'batch',sourceId:'oracle-vault'}),{globalBasename:false});
 const known=new Set([...byPath.values(),origin]);const candidates=links.candidates.filter(c=>hasKnownEndpoints(c,origin,known));
 assert.equal(candidates.length,1,`unambiguous ${text}`);assert.equal(candidates[0].targetSlug,target);checks++;console.log('PASS '+text+' -> '+target);
}
console.log('GBrain link boundary: '+checks+' checks passed');
