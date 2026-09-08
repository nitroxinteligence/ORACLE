#!/usr/bin/env python3
"""Regression coverage for interactions crossing the UI/motion/identity merge.
Runs only against the opt-in synthetic native QA app.
"""
import importlib.util
import json
from pathlib import Path
import time

ROOT = Path(__file__).resolve().parent.parent
spec = importlib.util.spec_from_file_location('oracle_qa', ROOT / 'scripts/atlas-qa.py')
qa = importlib.util.module_from_spec(spec)
spec.loader.exec_module(qa)
checks = []

def check(name, expression):
    result = qa.call(expression)
    assert result is True, (name, result)
    checks.append(name)
    print('PASS', name, flush=True)

def async_js(body):
    qa.call("window.integrationAsyncDone=false;window.integrationAsyncError=null;(async()=>{" + body + "})().then(()=>{window.integrationAsyncDone=true},e=>{window.integrationAsyncError=String(e);window.integrationAsyncDone=true});true")
    deadline=time.monotonic()+15
    while time.monotonic()<deadline:
        state=qa.call("({done:window.integrationAsyncDone,error:window.integrationAsyncError})")
        if state['done']:
            assert not state['error'],state['error']
            return
        time.sleep(.05)
    raise TimeoutError('Combined UI operation did not finish')

qa.call(op='show')
qa.call("live();atlasController.setFormation({progress:1,playing:false});true")
check('integrated identity loads in the native webview', "document.querySelector('.app-header .brand-lockup').naturalWidth>0 && document.querySelector('.app-header .brand-lockup').getAttribute('src')==='brand/lockup-white.svg'")
check('new top controls and animation stylesheet coexist without old UI', "!!document.querySelector('.app-header #play') && !!document.querySelector('link[href=\"atlas-motion.css\"]') && !document.querySelector('.replay-bar') && !document.querySelector('[data-view]') && !document.querySelector('.core-word')")
qa.call("openSearch('ads-google');true")
check('search modal finds a skill in the merged interface', "$('#modal').open && $('#universe-query').getAttribute('role')==='combobox' && [...document.querySelectorAll('#search-results [role=option]')].some(e=>e.textContent.includes('ads-google'))")
qa.call('closeModal();true')
async_js("window.integrationLayout=JSON.stringify(state.config.layout||{});await ensureReplay();replay=true;cursor=0;projectReplay();")
check('top timelapse starts with only the solar core', "atlasController.nodes.size===0 && atlasController.leaves.size===0 && !atlasController.diagnostics().error && $('#replay-label').textContent==='Núcleo'")
qa.call('cursor=state.collections.length;projectReplay();true')
check('all specialists precede their leaves', "atlasController.nodes.size===7 && atlasController.leaves.size===0 && $('#replay-label').textContent==='Especialistas'")
qa.call('cursor=state.collections.length*2;projectReplay();true')
check('final replay stage restores skills with motion renderer intact', "atlasController.nodes.size===7 && atlasController.leaves.size>0 && !atlasController.diagnostics().error && $('#replay-label').textContent==='Skills'")
qa.call("window.integrationNode=atlasController.nodes.get('code');window.integrationX=integrationNode.x;integrationNode.g.dispatchEvent(new KeyboardEvent('keydown',{key:'ArrowRight',bubbles:true}));atlasController.persistSoon();true")
time.sleep(.45)
check('replay cannot move or persist the live layout', "integrationNode.x===integrationX && JSON.stringify(state.config.layout||{})===integrationLayout")
qa.call('live();true')
check('return to live restores the unchanged layout and controls', "!replay && $('#live').disabled && !$('#reset-layout').disabled && JSON.stringify(state.config.layout||{})===integrationLayout")
qa.call("window.integrationOldAtlas=atlasController;window.integrationOldUniverse=atlasController.universe;window.oracleLock();true")
time.sleep(.2)
check('locking disposes both renderer and controller listeners', "!integrationOldUniverse.active && integrationOldAtlas.abort.signal.aborted && !document.querySelector('#atlas canvas') && !$('#lock-screen').hidden")
async_js("await call('unlock');$('#lock-screen').hidden=true;$('#app').inert=false;await refresh();")
time.sleep(.5)
check('unlock remounts exactly one renderer with the integrated brand', "!!atlasController && atlasController.el.querySelectorAll('canvas').length===1 && !atlasController.diagnostics().error && document.querySelector('.brand-lockup').naturalWidth>0")
(ROOT/'docs/evidence/consolidation-native-tests.json').write_text(json.dumps({'passed':len(checks),'checks':checks,'scope':'Combined native App/Core with opt-in QA bridge and synthetic fixture; no personal vault modified'},indent=2)+'\n')
