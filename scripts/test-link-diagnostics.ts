import {strict as assert} from 'node:assert';
import {extractPageLinks,makeResolver} from '../vendor/gbrain/src/core/link-extraction.ts';
import {canonicalizeLocalLinks,hasKnownEndpoints} from '../packages/gbrain-adapter/link-resolution.ts';
import {LinkDiagnostics,prepareLinkContent} from '../packages/gbrain-adapter/link-diagnostics.ts';
const byPath=new Map([['Origin.md','origin'],['folder/Existing.md','folder/existing'],['one/Duplicate.md','one/duplicate'],['two/Duplicate.md','two/duplicate']]),known=new Set(byPath.values());
const engine:any={resolveSlugsByPaths:async()=>new Map(),getAllSlugs:async()=>known,getPage:async()=>null,findByTitleFuzzy:async()=>null,resolveSlugs:async()=>new Map()};
const diagnostic=new LinkDiagnostics(known),original=['[Local](folder/Existing.md#Heading)','[Missing](folder/Missing.md)','[[duplicate]]','[[missing#Heading]]','[Anchor](#Heading)',
 '[URL](https://example.com/a.md)','![Image](https://example.com/image.png)','[Mail](mailto:somebody@example.com)','[Protocol](//example.com/ref.md)',
 '`[Ignored](https://example.com/ignored.md)`','```md\n[Ignored](https://example.com/fenced.md)\n```'].join('\n');
const prepared=prepareLinkContent(original);diagnostic.externalReferences('Origin.md',prepared.external);
const extracted=await extractPageLinks('origin',canonicalizeLocalLinks(prepared.content,'Origin.md',byPath),{},'note',makeResolver(engine,{mode:'batch',sourceId:'oracle-vault'}),{globalBasename:false});
const links=[];
for(const candidate of extracted.candidates){if(hasKnownEndpoints(candidate,'origin',known))links.push(candidate);else diagnostic.unresolved('Origin.md',candidate.targetSlug)}
assert.equal(links.length,1);assert.equal(links[0].targetSlug,'folder/existing');
let report=diagnostic.snapshot();assert.equal(report.external_reference_count,4);assert.equal(report.unresolved_link_count,3);
assert(report.unresolved_links.some(row=>row.reason==='ambiguous_basename'));
assert(!report.unresolved_links.some(row=>row.target.includes('example.com')||row.target==='com/image'));
for(let i=0;i<250;i++)diagnostic.unresolved('Origin.md','missing-'+i);
report=diagnostic.snapshot();assert.equal(report.unresolved_link_count,253);assert.equal(report.unresolved_link_sample_count,200);assert(report.unresolved_links_truncated);
assert.equal(report.external_reference_count,4);assert(!report.external_references_truncated);
const fm=await extractPageLinks('origin','',{key_people:['Unknown Person']},'company',makeResolver(engine,{mode:'batch',sourceId:'oracle-vault'}),{globalBasename:false});
for(const ref of fm.unresolved)diagnostic.unresolved('Origin.md',ref.name,ref.field);
assert.equal(fm.unresolved.length,1);assert.equal(diagnostic.snapshot().unresolved_link_count,254);
console.log(JSON.stringify({passed:true,official_extractor:true,localEdges:links.length,localIssues:3,externalReferences:4,sample:200,total:253,frontmatterUnresolved:fm.unresolved.length}));
