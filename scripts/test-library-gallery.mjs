import test from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs';
import vm from 'node:vm';
import {performance} from 'node:perf_hooks';
function fixture(){
 const entries=Array.from({length:13501},(_,i)=>({path:i<1000?`SISTEMA/prompts/Categoria ${i%12}/Prompt ${i}.md`:i<1400?`SISTEMA/Tutoriais/Guia ${i}.md`:`SISTEMA/skills/codigo/skill-${i}/SKILL.md`,name:`Nota ${i}.md`,size:2400}));
 let scans=0,reads=0,images=0;const state={entries,scan:{signature:'one'},config:{vault:'/synthetic/vault'}};
 const ctx={window:{},Intl,requestAnimationFrame:fn=>setTimeout(fn,0)};vm.createContext(ctx);
 vm.runInContext(fs.readFileSync(new URL('../Resources/web/library.js',import.meta.url),'utf8'),ctx);
 const original=ctx.OracleLibrary.inventory;ctx.OracleLibrary={inventory:(...args)=>{scans++;return original(...args)}};
 vm.runInContext(fs.readFileSync(new URL('../Resources/web/library-gallery.js',import.meta.url),'utf8')+'\nglobalThis.Gallery=OracleLibraryGallery;',ctx);
 const el={scrollTop:0,replaceChildren(){},removeAttribute(){}};
 const gallery=new ctx.Gallery(el,{state:()=>state,call:async()=>{reads++;return {text:'---\ncover: cover.png\n---\n# Real title\nText'}},readImage:async()=>{images++;return ''}});
 return {gallery,state,get scans(){return scans},get reads(){return reads},get images(){return images},original};
}
test('one inventory per library revision, warm switches reuse it, snapshot changes invalidate it',()=>{
 const f=fixture(),start=performance.now();for(let i=0;i<15;i++)f.gallery.data();const elapsed=performance.now()-start;
 assert.equal(f.scans,1);assert.equal(f.gallery.data().documents.length,1000);
 f.gallery.mode='tutorials';assert.equal(f.gallery.data().documents.length,400);assert.equal(f.scans,2);
 f.gallery.mode='prompts';f.gallery.data();assert.equal(f.scans,2);
 f.state.entries=[...f.state.entries];f.gallery.data();assert.equal(f.scans,2,'unchanged snapshot signature');
 f.state.entries.push({path:'SISTEMA/prompts/New.md'});f.state.scan.signature='two';assert.equal(f.gallery.data().documents.length,1001);assert.equal(f.scans,3);
 f.state.config.vault='/synthetic/other';f.gallery.data();assert.equal(f.scans,4);
 console.log(JSON.stringify({entries:13501,inventoryCalls:15,actualScans:1,elapsedMs:Math.round(elapsed)}));
});
test('category counts match real paths, source ambiguity remains explicit',()=>{
 const f=fixture(),data=f.gallery.data();assert.equal(data.counts.get(data.root),1000);
 for(const folder of data.folders)assert.equal(data.counts.get(folder)||0,data.documents.filter(e=>e.path.startsWith(folder+'/')).length);
 f.state.entries.push({path:'SISTEMA/Prompts/Other.md'});f.state.scan.signature='two';assert.equal(f.gallery.data().ambiguous,true);
 f.gallery.model().choice='SISTEMA/Prompts';assert.equal(f.gallery.data().documents.length,1);
});
test('metadata survives tab changes, does not fetch unused covers and cache stays bounded',async()=>{
 const f=fixture();const entry=f.gallery.data().documents[0];await f.gallery.read(entry);f.gallery.mode='tutorials';f.gallery.data();f.gallery.mode='prompts';await f.gallery.read(entry);
 assert.equal(f.reads,1);assert.equal(f.images,0);
 for(let i=0;i<80;i++)f.gallery.remember(String(i),{text:'x'.repeat(200000)});
 assert.ok(f.gallery.cache.size<=24);assert.ok([...f.gallery.cache.values()].reduce((sum,v)=>sum+v.text.length,0)<=4000000);
});
test('placeholder paints first and a rapid switch cancels stale opening',async()=>{
 const f=fixture(),g=f.gallery;let renders=0,skeletons=0;g.skeleton=()=>skeletons++;g.render=()=>renders++;
 const first=g.open('prompts');assert.equal(skeletons,1);assert.equal(renders,0);assert.equal(f.scans,0);
 g.hide();assert.equal(await first,false);assert.equal(renders,0);
 assert.equal(await g.open('tutorials'),true);assert.equal(renders,1);assert.equal(g.mode,'tutorials');
});
