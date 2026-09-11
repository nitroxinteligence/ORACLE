import test from 'node:test';import assert from 'node:assert/strict';import '../Resources/web/library.js';
const {inventory}=globalThis.OracleLibrary;
const note=path=>({path,name:path.split('/').at(-1),directory:false});
test('discovers uppercase roots without renaming or duplicating files',()=>{
 const model=inventory([note('SISTEMA/PROMPTS/Um.md')],'SISTEMA/prompts');
 assert.equal(model.root,'SISTEMA/PROMPTS');assert.equal(model.documents.length,1);assert.equal(model.exists,true);
});
test('root collision is explicit and a choice scopes to one real root',()=>{
 const entries=[note('SISTEMA/PROMPTS/Um.md'),note('SISTEMA/prompts/Dois.md')];
 assert.equal(inventory(entries,'SISTEMA/prompts').ambiguous,true);
 const selected=inventory(entries,'SISTEMA/prompts','SISTEMA/prompts');assert.deepEqual(selected.documents.map(d=>d.path),['SISTEMA/prompts/Dois.md']);
});
test('invalid and unrelated paths never enter the inventory',()=>{
 const entries=['/SISTEMA/prompts/no.md','SISTEMA/prompts/../no.md','SISTEMA/prompts2/no.md','SISTEMA/prompts/file.png','SISTEMA/prompts/yes.md'].map(note);
 assert.deepEqual(inventory(entries,'SISTEMA/prompts').documents.map(d=>d.name),['yes.md']);
});
