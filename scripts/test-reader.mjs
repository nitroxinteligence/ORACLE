import test from 'node:test';
import assert from 'node:assert/strict';
import {readFileSync} from 'node:fs';
import vm from 'node:vm';
const context=vm.createContext({URL});
for(const path of ['vendor/marked.js','reader.js']) vm.runInContext(readFileSync(new URL('../Resources/web/'+path,import.meta.url),'utf8'),context);
const {render,resolveLocal,resolveWiki,linkKind}=context.OracleMarkdown;
test('tables, ordered lists, nested lists and closed code fences render',()=>{
  assert.match(render('| A | B |\n|---|---|\n| 1 | 2 |'),/<table>/);
  assert.match(render('3. Terceiro\n4. Quarto'),/<ol start="3">/);
  assert.match(render('- Um\n  - Dois'),/<ul>[\s\S]*<ul>/);
  assert.match(render('```js\n<script>\n```'),/&lt;script&gt;/);
});
test('source HTML, malicious links and images cannot become active markup',()=>{
  for(const input of ['<script>alert(1)</script>','<img src=x onerror=alert(1)>','[X](javascript:alert(1))','[X](data:text/html,evil)','![a](https://example.com/x.png)']){
    const output=render(input);assert.doesNotMatch(output,/<script|<img|<iframe|<[^>]+\sonerror=|data-external="(?:javascript|data):/i);
  }
  assert.equal(linkKind('https://user:pass@example.com/'),null);
  assert.equal(linkKind('//example.com/x'),null);
});
test('wiki aliases and relative links have explicit safe targets',()=>{
  assert.match(render('[[Nota|Rótulo]]'),/data-wiki="Nota">Rótulo/);
  assert.match(render('[Guia](references/guia.md)'),/data-local="references\/guia.md"/);
  assert.doesNotMatch(render('`[[Nota]]`'),/data-wiki/);
});
test('relative links preserve source directories and cannot escape the authorized inventory',()=>{
  const entries=[{path:'SISTEMA/skills/code/one/references/guia.md'},{path:'WIKI/Nota com espaço.md'}];
  assert.equal(resolveLocal('references/guia.md','SISTEMA/skills/code/one/SKILL.md',entries).path,entries[0].path);
  assert.equal(resolveLocal('/WIKI/Nota%20com%20espa%C3%A7o.md#Título','x.md',entries).fragment,'Título');
  for(const href of ['../../secret.md','%2e%2e/%2e%2e/secret.md','file:///etc/passwd','%5csecret.md','/Users/private.md']) assert.throws(()=>resolveLocal(href,'x.md',entries));
});
test('ambiguous case variants fail rather than opening an arbitrary source',()=>{
  assert.throws(()=>resolveLocal('nota.md','x.md',[{path:'NOTA.md'},{path:'Nota.md'}]),/mais de uma/);
});
test('wiki aliases keep headings and explicit source scope',()=>{
 const entries=[{path:'WIKI/Nota.md'},{path:'WIKI/Guia.md'},{path:'PROJETOS/Duplicada.md'},{path:'WIKI/Duplicada.md'}];
 assert.equal(resolveWiki('Guia#Seção','WIKI/Nota.md',entries).path,'WIKI/Guia.md');
 assert.equal(resolveWiki('#Seção','WIKI/Nota.md',entries).fragment,'Seção');
 assert.equal(resolveWiki('WIKI/Guia#Seção','WIKI/Nota.md',entries).fragment,'Seção');
 assert.throws(()=>resolveWiki('Duplicada','WIKI/Nota.md',entries),/mais de uma/);
 assert.throws(()=>resolveWiki('../../secret','WIKI/Nota.md',entries));
 assert.throws(()=>resolveWiki('javascript:alert(1)','WIKI/Nota.md',entries));
 assert.match(render('[[Guia#Seção|Leia a seção]]'),/data-wiki="Guia#Seção">Leia a seção/);
});
