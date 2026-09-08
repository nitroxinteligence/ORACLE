import test from 'node:test';import assert from 'node:assert/strict';
globalThis.window={};await import('../Resources/web/installation-visual.js');
const visual=window.OracleInstallationVisual;
const old={name:'SKILL.md',path:'SISTEMA/skills/marketing/old/SKILL.md'},added={name:'SKILL.md',path:'SISTEMA/skills/marketing/new/SKILL.md'};
const state={collections:[{id:'marketing'}],entries:[old,added],setup:{plan_id:'run-one'},setupBaselinePaths:[old.path],onboarding:{runID:'run-one',status:'running',confirmed:[{id:'sol',kind:'core'},{id:'obsidian',kind:'connector'}]}};
test('new files stay absent until verified; preexisting files remain visible',()=>{visual.reset();const p=visual.projection(state);assert.deepEqual(p.entries,[old]);assert.equal(p.coreReady,true);assert.equal(p.forming,true)});
test('receipt admits the exact original path',()=>{const p=visual.projection({...state,onboarding:{...state.onboarding,confirmed:[...state.onboarding.confirmed,{kind:'skill',id:added.path,path:added.path}]}});assert.deepEqual(p.entries,[old,added])});
test('restart uses persisted baseline and never treats unverified current files as historical',()=>{visual.reset();assert.deepEqual(visual.projection(state).entries,[old])});
test('baseline from another plan is ignored',()=>{visual.reset();const p=visual.projection({...state,setup:{plan_id:'different'}});assert.deepEqual(p.entries,[])});
test('completion shows current vault; no progress creates no components',()=>{const p=visual.projection({...state,onboarding:{status:'completed',runID:'run-one',confirmed:[]}});assert.deepEqual(p.entries,[old,added]);assert.equal(p.forming,false);assert.deepEqual(p.connectors,[])});

test('fresh onboarding does not depict a completed universe before authorization and installation',()=>{visual.reset();const p=visual.projection({...state,onboarding:{status:'not_started',licensed:false,legacyAccess:false,confirmed:[]}});assert.equal(p.coreReady,false);assert.deepEqual(p.collections,[]);assert.deepEqual(p.connectors,[])});
