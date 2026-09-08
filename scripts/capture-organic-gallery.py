#!/usr/bin/env python3
"""Capture final native surfaces with the pinned synthetic QA profile."""
from pathlib import Path
import importlib.util,time,json,shutil
ROOT=Path(__file__).resolve().parent.parent
spec=importlib.util.spec_from_file_location('q',ROOT/'scripts/atlas-qa.py');q=importlib.util.module_from_spec(spec);spec.loader.exec_module(q)
OUT=ROOT/'docs/evidence/organic-ui';captured=[]
def run(body):
 q.call('window.galleryDone=false;window.galleryError=null;(async()=>{'+body+'})().then(()=>galleryDone=true,e=>{galleryError=String(e);galleryDone=true});true')
 end=time.monotonic()+30
 while time.monotonic()<end:
  r=q.call('({done:galleryDone,error:galleryError})')
  if r['done']:
   assert not r['error'],r['error'];return
  time.sleep(.05)
 raise TimeoutError(body[:100])
def shot(name,body=''):
 if body:run(body)
 q.call('renderInspector();hideTooltip();document.activeElement?.blur();true')
 time.sleep(.65)
 r=q.call(op='snapshot',name=name+'.png');shutil.copy(r['path'],OUT/(name+'.png'));captured.append(name)
q.call(op='show');q.call(op='resize',width=1440,height=900)
run('closeModal(true);live();selected=null;selectedSkill=null;toggleObservatory(false);toggleNavigation(true);renderAtlas();atlasController.fit();atlasController.setFormation({progress:1,playing:false});')
shot('final-map')
shot('final-marketing','selected="marketing";selectedSkill=null;renderAtlas();atlasController.fit();toggleObservatory(true);')
shot('final-settings','settings();')
shot('final-updates','await showUpdates(false);')
shot('final-plugins','plugin();')
shot('final-conversations','await conversations();')
shot('final-instructions','await instructions();')
shot('final-search','openSearch("marketing");')
shot('final-reader','await openNote("WIKI/Decisões.md");')
shot('final-editor','editNote();')
shot('final-diff','editorSession.text=editorSession.base+"\\nRevisão de validação (rascunho).\\n";reviewEdit(editorSession);')
run('editorSession=null;modalDirty=false;closeModal(true);toggleObservatory(false);')
shot('final-timelapse','await ensureReplay();replay=true;atlasController.setFormation({progress:.78,playing:false});toggleReplayPanel(true);renderPlayback();')
run('live();toggleReplayPanel(false);')
q.call(op='resize',width=840,height=620)
shot('final-small','toggleNavigation(false);selected="marketing";renderAtlas();atlasController.fit();toggleObservatory(true);')
shot('final-small-settings','settings();')
run('closeModal(true);toggleObservatory(false);selected=null;renderAtlas();atlasController.fit();')
q.call(op='resize',width=1200,height=760)
(OUT/'gallery.json').write_text(json.dumps({'scope':'Native consolidated app with synthetic documents and real Codex plugin metadata; drafts in gallery are unsaved test content.','screenshots':captured},indent=2)+'\n')
print(json.dumps(captured))
