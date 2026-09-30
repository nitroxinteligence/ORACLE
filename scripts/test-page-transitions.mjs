import test from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs';
import vm from 'node:vm';
function fixture(reduced=false){
 const classes=()=>({add(){},contains(){return false}});
 const make=id=>({id,childNodes:[],style:{},classList:classes(),dataset:{},removeAttribute(){},setAttribute(){},querySelectorAll(){return []},remove(){},append(...nodes){for(const n of nodes){if(n.owner)n.owner.childNodes=n.owner.childNodes.filter(child=>child!==n);n.owner=this;this.childNodes.push(n)}},get firstElementChild(){return this.childNodes[0]},cloneNode(){return make(this.id)}});
 const from=make('library-page'),to=make('graph-page'),parent={append(node){this.snapshot=node}};to.parentElement=parent;
 from.append({style:{}});let reads=0;
 Object.defineProperty(from,'scrollTop',{get(){reads++;return 210}});
 const context={window:{},document:{hidden:false,body:{classList:classes()},querySelector(selector){return selector==='#graph-page'?to:selector==='#library-page'?from:null},addEventListener(){}},matchMedia:()=>({matches:reduced,addEventListener(){}}),setTimeout,clearTimeout,Promise};
 vm.createContext(context);vm.runInContext(fs.readFileSync(new URL('../Resources/web/transitions.js',import.meta.url),'utf8'),context);
 return {from,to,parent,transitions:context.window.OracleTransitions,get reads(){return reads}};
}
test('capture is passed to commit before snapshot mutation and uses a visual scroll offset',()=>{
 const f=fixture();let saved;
 f.transitions.changePage(f.from,f.to,scroll=>{saved=scroll;assert.equal(f.from.childNodes.length,0);return true},210);
 assert.equal(saved,210);assert.equal(f.reads,0);
 assert.equal(f.parent.snapshot.style.overflow,'hidden');
 assert.equal(f.parent.snapshot.firstElementChild.style.translate,'0 -210px');
});
test('blocked commit restores original nodes and leaves no translated content',()=>{
 const f=fixture(),content=f.from.firstElementChild;
 f.transitions.changePage(f.from,f.to,()=>false,210);
 assert.equal(f.from.firstElementChild,content);assert.equal(content.style.translate,undefined);assert.equal(f.parent.snapshot,undefined);
});
test('reduced motion still preserves an explicitly captured zero scroll',()=>{
 const f=fixture(true);let saved;
 f.transitions.changePage(f.from,f.to,scroll=>{saved=scroll;return true},0);
 assert.equal(saved,0);assert.equal(f.reads,0);assert.equal(f.from.childNodes.length,1);
});
