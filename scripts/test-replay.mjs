import {projectJournal,formationAt} from '../packages/contracts/replay.js';
import assert from 'node:assert/strict';
import {writeFileSync} from 'node:fs';
const baseline=[{path:'existing.md',directory:false,name:'existing.md'}];
const events=[{subject_refs:[{path:'SISTEMA/skills/code/fixture/SKILL.md',directory:false}]},{removed_refs:[{path:'SISTEMA/skills/code/fixture',directory:true}]},{subject_refs:[{path:'../escape.md',directory:false}]}];
const before=JSON.stringify({baseline,events});
assert.equal(projectJournal(baseline,events,-1).length,1);
assert(projectJournal(baseline,events,0).some(x=>x.path.endsWith('SKILL.md')));
assert(!projectJournal(baseline,events,2).some(x=>x.path.includes('fixture')||x.path.includes('escape')));
assert.equal(JSON.stringify({baseline,events}),before);
assert.deepEqual(projectJournal(baseline,events,2),projectJournal(baseline,events,2));
writeFileSync('docs/evidence/replay-contract.json',JSON.stringify({baseline:true,creation:true,rollback:true,path_boundary:true,deterministic:true,inputs_unchanged:true},null,2));
console.log('PASS replay baseline, creation, rollback, path boundary and deterministic projection');

const collections=[{id:'ads'},{id:'code'},{id:'contents'},{id:'customer-finder'},{id:'cyber-security'},{id:'marketing'},{id:'personal-branding'}];
const entries=collections.map(c=>({path:`SISTEMA/skills/${c.id}/fixture/SKILL.md`,name:'SKILL.md',directory:false}));
const saved=JSON.stringify({collections,entries});
for(let i=0;i<=14;i++){
 const frame=formationAt(entries,collections,i);
 assert.equal(frame.collections.length,Math.min(i,7));
 assert.equal(frame.entries.length,Math.max(0,i-7));
 assert(frame.entries.every(e=>frame.collections.some(c=>c.id===e.path.split('/')[2])));
}
assert.equal(JSON.stringify({collections,entries}),saved);
assert.equal(formationAt(entries,collections,-100).collections.length,0);
assert.equal(formationAt(entries,collections,100).entries.length,7);
writeFileSync('docs/evidence/timelapse-contract.json',JSON.stringify({core_first:true,all_specialists_before_skills:true,child_requires_parent:true,immutable_snapshot:true,clamped_cursor:true,frames_verified:15},null,2));
console.log('PASS 15 formation stages, parent before child, immutable snapshot and bounded cursor');
