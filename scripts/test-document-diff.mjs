import {readFileSync} from 'node:fs';
import vm from 'node:vm';
import test from 'node:test';
import assert from 'node:assert/strict';
const source=readFileSync(new URL('../Resources/web/app.js',import.meta.url),'utf8');
const diff=vm.runInNewContext(source.slice(source.indexOf('function documentDiff('),source.indexOf('function reviewEdit('))+';documentDiff');
function verify(before,after){const rows=diff(before,after);assert.equal(rows.filter(r=>r.kind!=='add').map(r=>r.text).join('\n'),before);assert.equal(rows.filter(r=>r.kind!=='remove').map(r=>r.text).join('\n'),after);return rows;}
test('inserção no meio mantém as linhas posteriores alinhadas',()=>{const rows=verify('a\nb\nc','a\nnova\nb\nc');assert.equal(rows.filter(r=>r.kind==='add').length,1);assert.equal(rows.filter(r=>r.kind==='remove').length,0);assert.equal(rows.at(-1).a,3);assert.equal(rows.at(-1).b,4)});
test('substituição, exclusão, linhas repetidas e arquivo vazio preservam os dois textos',()=>{for(const pair of [['a\nb\nc','a\nc'],['','novo'],['texto',''],['a\na\nb','a\nb\na'],['<script>\nx','x\n<img>'],['igual','igual']])verify(...pair)});
test('documento grande usa limite de memória e preserva o sufixo comum',()=>{const before=Array.from({length:1200},(_,i)=>'linha '+i).join('\n'),after=before.replace('linha 600\n','linha inserida\nlinha 600\n');const rows=verify(before,after);assert.equal(rows.filter(r=>r.kind==='add').length,1);assert.equal(rows.filter(r=>r.kind==='remove').length,0)});
