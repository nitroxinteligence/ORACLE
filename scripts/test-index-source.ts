import {strict as assert} from 'node:assert';
import {mkdirSync,mkdtempSync,writeFileSync,readFileSync,realpathSync} from 'node:fs';
import {resolve,join} from 'node:path';
import {readCandidate,sha} from '../packages/gbrain-adapter/scope.ts';
import {parseMarkdown} from '../vendor/gbrain/src/core/markdown.ts';

mkdirSync('.work/index-source-tests',{recursive:true});
const root=realpathSync(mkdtempSync(resolve('.work/index-source-tests/run-')));
function note(path:string,text:string){mkdirSync(resolve(root,path,'..'),{recursive:true});writeFileSync(join(root,path),text);return readCandidate(root,path)}
const a=note('one/tutorial.md','---\nslug: tutorial\ntitle: Tutorial\n---\n# Search sentinel\n');
const b=note('two/tutorial.md','---\nslug: tutorial\n---\n# Independent note\n');
assert.equal(a.slug,'one/tutorial');assert.equal(b.slug,'two/tutorial');
assert.throws(()=>note('one/spoof.md','---\nslug: two/tutorial\n---\n# Spoof\n'),/conflicts/);
const source='---\nmodel: {{CLAUDE_MODEL}}\n{{CLAUDE_EFFORT_FRONTMATTER}}\n---\n# Template sentinel\n';
const template=note('agents/example.md',source);
assert.equal(readFileSync(join(root,template.path),'utf8'),source);
assert.equal(template.sha256,sha(source));
assert(template.text.endsWith(source));
assert(!parseMarkdown(template.text,template.path,{validate:true}).errors?.some(e=>e.code==='YAML_PARSE'));
assert.throws(()=>note('invalid.md','---\ninvalid: [unclosed\n---\n# Invalid\n'),/Invalid YAML/);
console.log('Index source: basename identities stay scoped; spoof rejected; template indexed without source mutation; malformed YAML rejected.');
