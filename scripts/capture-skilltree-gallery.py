#!/usr/bin/env python3
"""Verified WKWebView captures from the public catalog; never conceptual renders."""
import importlib.util,json,shutil,time,hashlib
from pathlib import Path
ROOT=Path(__file__).resolve().parent.parent;out=ROOT/'docs/evidence/skilltree'
spec=importlib.util.spec_from_file_location('qa',ROOT/'scripts/atlas-qa.py');qa=importlib.util.module_from_spec(spec);spec.loader.exec_module(qa)
call=qa.call;images=[]
def settle():
    for _ in range(100):
        if call('!document.hidden&&window.oracleWindowVisible!==false&&!atlasController.frame&&!atlasController.geometryMoving&&!atlasController.universe.pending&&!atlasController.universe.timeout'):return
        time.sleep(.08)
    raise TimeoutError('A visible static native frame is required')
def capture(name,expected,selected=None):
    settle()
    state=call('({visible:!document.hidden,context:atlasController.context,selected,zoom:atlasController.camera.k/atlasController.baseScale,viewport:[innerWidth,innerHeight],renderCount:atlasController.universe.renderCount,rendererError:atlasController.diagnostics().error,groups:atlasController.groups.size,leaves:[...atlasController.nodes.values()].map(n=>({id:n.id,total:n.skills.length,shown:[...atlasController.leaves.values()].filter(l=>l.parent===n.id&&!l.retiring).length}))})')
    assert state['visible'] and state['renderCount']>0 and not state['rendererError'] and state['context']['kind']==expected and state.get('selected')==selected,state
    source=Path(call(op='snapshot',name=name+'.png')['path']);dest=out/source.name;shutil.copy2(source,dest)
    images.append({'file':dest.name,'sha256':hashlib.sha256(dest.read_bytes()).hexdigest(),**state});print('CAPTURE',name,expected,flush=True)
assert call('state.config.fixture===true&&state.config.vault.includes("/.work/public-gallery/")')
assert call('!modalDirty'),'Preserve an unsaved test edit'
call(op='show');call(op='resize',width=1440,height=900)
call('window.capturePreviousInert=$("#app").inert;$("#app").inert=true;closeModal(true);if(window.organicExpansion)clearInterval(organicExpansion);$("#motion").checked=true;renderAtlas();toggleObservatory(false);toggleNavigation(true);atlasController.select(null);atlasController.fit();true')
try:
    capture('global-wide','global')
    call('atlasController.focus("marketing");true');capture('marketing-50','specialist','marketing')
    call('atlasController.focus("cyber-security");true');capture('security-818','specialist','cyber-security')
    call('window.galleryGroup=atlasController.geometry.groups.filter(g=>g.parent==="cyber-security").sort((a,b)=>b.skills.length-a.skills.length)[0].id;atlasController.focusGroup(galleryGroup);true');capture('group-50','group','cyber-security')
    call('atlasController.select("cyber-security",atlasController.geometry.leaves.find(l=>l.group===galleryGroup).id);true');capture('skill-inspector','skill','cyber-security')
    call('atlasController.select(null);atlasController.fit();toggleObservatory(true);renderPlugins();$("#observatory-panel").scrollTop=$("#plugin-list").offsetTop-60;true');capture('logos-observatory-top','global')
    call('$("#observatory-panel").scrollTop=$("#plugin-list").offsetTop+550;true');capture('logos-observatory-bottom','global')
    call('toggleObservatory(false);atlasController.select(null);atlasController.fit();true')
    call(op='resize',width=840,height=620);settle();call('atlasController.focus("marketing");true');capture('marketing-small','specialist','marketing')
finally:
    call('$("#app").inert=window.capturePreviousInert??false;$("#motion").checked=false;renderAtlas();atlasController.select(null);atlasController.fit();true');call(op='resize',width=1200,height=760)
(out/'gallery.json').write_text(json.dumps({'source':'Native AppKit WKWebView takeSnapshot; public catalog; static reduced-motion captures with original visual styles','images':images},indent=2)+'\n')
