#!/usr/bin/env python3
import importlib.util,json,time
from pathlib import Path
root=Path(__file__).resolve().parent.parent
spec=importlib.util.spec_from_file_location('qa',root/'scripts/atlas-qa.py');qa=importlib.util.module_from_spec(spec);spec.loader.exec_module(qa)
checks=[]
def js(s):return qa.call(s)
def clocks():return json.loads(js('JSON.stringify(Object.fromEntries([...atlasController.orbitTracks].map(([k,t])=>[k,t.seconds])))'))
def pause():time.sleep(.7)
assert not js('modalDirty'),'Finish the current draft before this QA run'
qa.call(op='show');js("window.motionErrors=[];window.addEventListener('error',e=>motionErrors.push(e.message));closeModal(true);atlasController.select(null);atlasController.setFormation({progress:1,playing:false});true");time.sleep(1.3)
js("atlasController.hovered=null;setInputMode('pointer');atlasController.svg.focus();true")
a=clocks();pause();b=clocks();assert all(b[k]>a[k] for k in a),(a,b);checks.append('Plugins and every knowledge ring move')
js("document.querySelector('[data-orbit-plugin]').dispatchEvent(new PointerEvent('pointerover',{bubbles:true}));true")
a=clocks();pause();b=clocks();assert a['plugins']==b['plugins'] and b['knowledge-0']>a['knowledge-0'],(a,b);checks.append('Hover pauses the entire plugin ring, leaving others moving')
js("atlasController.hovered=null;setInputMode('keyboard');document.querySelector('[data-orbit-track=knowledge-0]').focus();true")
a=clocks();pause();b=clocks();assert a['knowledge-0']==b['knowledge-0'] and b['plugins']>a['plugins'];checks.append('Keyboard focus holds its knowledge ring')
js("atlasController.svg.focus();visualPaused=true;atlasController.setPaused(true);true");a=clocks();pause();assert clocks()==a;checks.append('Pause atmosphere stops all orbital motion')
js("visualPaused=false;$('#motion').checked=true;renderAtlas();true");time.sleep(.15);a=clocks();pause();assert clocks()==a;checks.append('Reduce motion freezes all rings without resetting positions')
js("$('#motion').checked=false;renderAtlas();atlasController.hovered=null;true");pause();qa.call(op='hide');time.sleep(.15);a=clocks();pause();assert clocks()==a;checks.append('Hidden window does not advance orbit phases')
assert not js('modalDirty'),'Finish the current draft before this QA run'
qa.call(op='show');js("atlasController.navigateKnowledge('personal','AREAS/pessoal');true");time.sleep(1.5)
js("atlasController.hovered=null;setInputMode('pointer');atlasController.svg.focus();true")
a=js("[...atlasController.leaves.values()][0].g.getAttribute('transform')");pause();b=js("[...atlasController.leaves.values()][0].g.getAttribute('transform')");assert a!=b;checks.append('Folders and notes move in dedicated knowledge scenes')
js("[...atlasController.leaves.values()][0].g.dispatchEvent(new PointerEvent('pointerover',{bubbles:true}));true")
a=js("[...atlasController.leaves.values()][0].g.getAttribute('transform')");pause();assert js("[...atlasController.leaves.values()][0].g.getAttribute('transform')")==a;checks.append('Knowledge item remains still for inspection and clicking')
assert js('motionErrors.length===0&&!atlasController.sceneError&&!atlasController.universe.diagnostics().error');checks.append('No navigation or renderer errors')
js('atlasController.hovered=null;atlasController.select(null);true');time.sleep(1.3)
qa.call(op='snapshot',name='moving-orbits.png')
report={'passed':len(checks),'checks':checks,'scope':'Native WKWebView with synthetic public-gallery state; one existing ambient render scheduler'}
(root/'docs/evidence/skilltree/orbit-motion-native.json').write_text(json.dumps(report,indent=2)+'\n')
print(json.dumps(report,indent=2))
