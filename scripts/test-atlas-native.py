#!/usr/bin/env python3
"""Native WebKit regression tests against the real app and the synthetic QA profile.

Run after benchmark-atlas.py; tests deliberately change renderer state.
"""
import importlib.util
import json
import pathlib
import time

ROOT = pathlib.Path(__file__).resolve().parent.parent
spec = importlib.util.spec_from_file_location('qa', ROOT / 'scripts/atlas-qa.py')
qa = importlib.util.module_from_spec(spec); spec.loader.exec_module(qa)
call = qa.call
results = []

def check(name, js):
    value = call(js)
    assert value is True, f'{name}: {value}'
    results.append({'test': name, 'passed': True})
    print('PASS', name, flush=True)

call(op='show')
call("visualPaused=false;selected=null;selectedSkill=null;$('#motion').checked=false;$('#economy').checked=false;renderAtlas();atlasController.setFormation({progress:1,playing:false});true")
time.sleep(.6)
check('all shaders compiled in native WebKit and all seven collections remain collections',
      "atlasController.nodes.size===7 && !atlasController.universe.failed && !atlasController.diagnostics().error && document.querySelectorAll('.category-node').length===7")
check('seven GPU draw calls; no postprocessing framebuffer allocation',
      "atlasController.diagnostics().drawCalls===7 && atlasController.diagnostics().textures===1")
check('input preempts a pending ambient timer instead of throttling canvas gestures', """(()=>{
 const u=atlasController.universe;
 u.cancel();u.dirty=false;u.transitioning=false;u.arrivalUntil=0;u.schedule();
 if(!u.timeout)return false;
 atlasController.camera.x+=1;atlasController.target.x+=1;atlasController.draw();
 return u.timeout===0 && u.pending!==0;
})()""")
check('solar mark is absent while the accessible core remains focusable',
      "(!document.querySelector('.core-word') || getComputedStyle(document.querySelector('.core-word')).display==='none') && document.querySelector('[data-core]').tabIndex===0")

call("window.qaPositions=JSON.stringify([...atlasController.nodes.values(),...atlasController.leaves.values()].map(n=>[n.id,n.x,n.y]));window.qaNodeBuffer=atlasController.universe.nodeGeometry.attributes.center;window.qaEdgeBuffer=atlasController.universe.edgeGeometry.attributes.source;atlasController.hovered={category:'code'};atlasController.universe.sync(atlasController);true")
time.sleep(.4)
check('hover changes illumination without moving targets or replacing geometry buffers',
      "qaPositions===JSON.stringify([...atlasController.nodes.values(),...atlasController.leaves.values()].map(n=>[n.id,n.x,n.y])) && qaNodeBuffer===atlasController.universe.nodeGeometry.attributes.center && qaEdgeBuffer===atlasController.universe.edgeGeometry.attributes.source && atlasController.universe.nodeGeometry.attributes.nodeState.array[5]>.9")

call("window.qaAnchor={x:atlasController.width*.53,y:atlasController.height*.61};window.qaWorld={x:(qaAnchor.x-atlasController.target.x)/atlasController.target.k,y:(qaAnchor.y-atlasController.target.y)/atlasController.target.k};window.qaRect=atlasController.el.getBoundingClientRect();atlasController.zoomAt(1.25,qaAnchor.x+qaRect.left,qaAnchor.y+qaRect.top);true")
time.sleep(.8)
check('anchored zoom preserves world position at the pointer',
      "Math.hypot((qaAnchor.x-atlasController.camera.x)/atlasController.camera.k-qaWorld.x,(qaAnchor.y-atlasController.camera.y)/atlasController.camera.k-qaWorld.y)<.1")

call("atlasController.select('code');atlasController.focus('code');true")
time.sleep(.8)
check('focus and skill selection preserve the source hierarchy and accessible state',
      "atlasController.selected==='code' && atlasController.nodes.get('code').g.getAttribute('aria-pressed')==='true' && [...atlasController.leaves.values()].filter(l=>l.parent==='code').length===6")
call("window.qaSkill=[...atlasController.leaves.values()].find(l=>l.parent==='code');qaSkill.g.focus();qaSkill.g.dispatchEvent(new KeyboardEvent('keydown',{key:'Enter',bubbles:true}));true")
check('keyboard Enter selects a skill without opening or executing it',
      "atlasController.selectedLeaf===qaSkill.id && qaSkill.g.getAttribute('aria-pressed')==='true' && !$('#modal').open")
call("window.qaOldX=qaSkill.x;qaSkill.g.dispatchEvent(new KeyboardEvent('keydown',{key:'ArrowRight',bubbles:true}));true")
time.sleep(.45)
check('keyboard layout movement reaches the real native persistence bridge',
      "qaSkill.x===qaOldX+8 && state.config.layout.leaves[qaSkill.id].x===qaSkill.x")

call("window.qaEventCount=state.events.length;atlasController.setFormation({progress:0,playing:false});true")
check('formation seek starts from the sun and hides unrevealed collection labels',
      "atlasController.getFormation().progress===0 && atlasController.nodes.get('code').g.style.opacity==='0'")
call("atlasController.setFormation({progress:.8,playing:false});true")
time.sleep(.25)
check('paused scrub does not advance or execute journal actions',
      "atlasController.getFormation().progress===.8 && state.events.length===qaEventCount")
call("atlasController.setFormation({progress:0,playing:true,duration:1000});true")
time.sleep(1.4)
check('formation completes and restores normal selection opacity',
      "atlasController.getFormation().progress===1 && !atlasController.getFormation().playing && atlasController.nodes.get('code').g.style.opacity===''")

check('decorative motion rejects stale, future, duplicated and replay receipts', """(()=>{
 const u=atlasController.universe;
 const valid={event_id:'native-test-receipt',source:'codex-hook',received_at:new Date().toISOString()};
 const before=u.receipts.size;
 if(u.signalReceipt({...valid,source:'ambient'}))return false;
 if(u.signalReceipt({...valid,received_at:new Date(Date.now()-9000).toISOString()}))return false;
 if(u.signalReceipt({...valid,received_at:new Date(Date.now()+9000).toISOString()}))return false;
 if(!u.signalReceipt(valid)||u.signalReceipt(valid))return false;
 atlasController.data.replay=true;
 const rejected=!u.signalReceipt({...valid,event_id:'replay-receipt'});
 atlasController.data.replay=false;
 return rejected&&u.receipts.size===before+1;
})()""")

call("$('#motion').checked=true;renderAtlas();atlasController.setFormation({progress:0,playing:true});true")
time.sleep(.5)
call('window.qaCount=atlasController.universe.renderCount;true')
time.sleep(1)
check('reduced motion settles completely, with an immediately complete formation',
      "atlasController.universe.renderCount===qaCount && atlasController.getFormation().progress===1 && atlasController.universe.pending===0 && atlasController.universe.timeout===0")
call("$('#motion').checked=false;renderAtlas();true")
call(op='hide'); time.sleep(.5)
call('window.qaCount=atlasController.universe.renderCount;true'); time.sleep(1)
check('native minimization stops both renderer and controller frames',
      "atlasController.universe.renderCount===qaCount && atlasController.frame===0 && atlasController.universe.pending===0 && atlasController.universe.timeout===0")
call(op='show'); time.sleep(.5)
check('native restoration resumes rendering', 'atlasController.universe.renderCount>qaCount')

call("window.qaExtension=atlasController.universe.renderer.getContext().getExtension('WEBGL_lose_context');qaExtension.loseContext();true")
time.sleep(.3)
check('lost WebGL context exposes the interactive SVG fallback',
      "!atlasController.el.classList.contains('three-enabled') && atlasController.universe.contextLost && atlasController.nodes.get('code').g.tabIndex===0")
call('qaExtension.restoreContext();true'); time.sleep(.7)
check('context restoration rebuilds GPU resources without duplicating the canvas',
      "atlasController.el.classList.contains('three-enabled') && !atlasController.universe.contextLost && !atlasController.universe.failed && atlasController.el.querySelectorAll('canvas').length===1")

call("window.qaDisposed=atlasController;window.qaOldUniverse=atlasController.universe;atlasController.dispose();atlasController.dispose();true")
time.sleep(.2)
check('dispose is idempotent and releases frames, timers, observers and canvas',
      "!qaOldUniverse.active && qaOldUniverse.pending===0 && qaOldUniverse.timeout===0 && !document.querySelector('#atlas canvas') && qaDisposed.abort.signal.aborted")
call('atlasController=null;renderAtlas();atlasController.setFormation({progress:1,playing:false});true'); time.sleep(.5)
check('remount creates one working scene after disposal',
      "atlasController.universe.active && atlasController.el.querySelectorAll('canvas').length===1 && !atlasController.universe.failed")

destination = ROOT / 'docs/evidence/atlas-motion-native-tests.json'
destination.write_text(json.dumps({'passed': len(results), 'tests': results,
  'scope': 'Real App/Core loaded from repository with a test-only evaluation bridge. Synthetic 63-document profile. DOM keyboard events test handlers; native pointer capture is validated separately.'}, indent=2) + '\n')
print(destination)
