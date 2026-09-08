#!/usr/bin/env python3
"""Acceptance matrix against the real macOS/WebKit app in its isolated fixture profile."""
import hashlib,importlib.util,json,time
from pathlib import Path
ROOT=Path(__file__).resolve().parent.parent
spec=importlib.util.spec_from_file_location('qa',ROOT/'scripts/atlas-qa.py');qa=importlib.util.module_from_spec(spec);spec.loader.exec_module(qa)
call=qa.call;checks=[];matrix=[]

def check(name,js):
    value=call(js);assert value is True,(name,value);checks.append(name);print('PASS',name,flush=True)
def async_js(body,timeout=30):
    call('window.matrixDone=false;window.matrixError=null;(async()=>{'+body+'})().then(()=>matrixDone=true,e=>{matrixError=String(e);matrixDone=true});true')
    end=time.monotonic()+timeout
    while time.monotonic()<end:
        result=call('({done:matrixDone,error:matrixError})')
        if result['done']:
            assert not result['error'],result['error'];return
        time.sleep(.05)
    raise TimeoutError(body[:80])
def settle():
    end=time.monotonic()+5
    while time.monotonic()<end:
        if call('!atlasController.frame && !atlasController.geometryMoving && !document.hidden && window.oracleWindowVisible!==false && Math.abs(atlasController.camera.k-atlasController.target.k)<.000001 && Math.hypot(atlasController.camera.x-atlasController.target.x,atlasController.camera.y-atlasController.target.y)<.01'):return
        time.sleep(.06)
    raise TimeoutError('geometry did not settle')
def zoom(value):
    call(f'atlasController.zoomAt({value}/(atlasController.target.k/atlasController.baseScale));true');settle()
def snapshot(name):
    result=call(op='snapshot',name=name+'.png');return result['path']
def files():
    root=Path(call('state.config.vault'));assert '/.work/' in str(root)
    return {str(p.relative_to(root)):hashlib.sha256(p.read_bytes()).hexdigest() for p in root.rglob('*') if p.is_file()}

call(op='show')
for _ in range(100):
    if call('typeof atlasController!=="undefined" && !!atlasController?.universe'):break
    time.sleep(.1)
else:raise TimeoutError('Oracle did not load')
call("window.OracleOnboarding?.suspend();closeModal(true);live();selected=null;selectedSkill=null;$('#motion').checked=false;$('#density').value=3;renderAtlas();atlasController.fit();atlasController.setFormation({progress:1,playing:false});true");settle()
check('isolated native fixture is pinned','state.config.fixture===true && state.config.vault.includes("/.work/")')
check('monochrome floating controls and collapsed initial panels','!document.querySelector("footer") && getComputedStyle(document.querySelector("main")).position==="absolute" && $("#observatory-panel").hidden && $("#replay-panel").hidden')
check('real WebGL shaders compile','!atlasController.diagnostics().error && atlasController.el.querySelectorAll("canvas").length===1')
check('V3 planetary wordmark loads','document.querySelector(".brand-lockup").naturalWidth>0')
original=files()
for size in [(1200,760),(840,620),(1440,900)]:
    call(op='resize',width=size[0],height=size[1]);settle()
    for selected in [None,'marketing','cyber-security']:
        call(f'selected={json.dumps(selected)};selectedSkill=null;renderAtlas();atlasController.fit();true');settle()
        for level in [.49,.50,.51,.74,.90,1,1.12,2.59]:
            zoom(level)
            row=call('({selected,zoom:atlasController.camera.k/atlasController.baseScale,leaves:[...atlasController.nodes.values()].map(n=>({id:n.id,total:n.skills.length,shown:[...atlasController.leaves.values()].filter(l=>l.parent===n.id).length})),gpu:atlasController.universe.leafGeometry.drawRange.count,finite:[...atlasController.leaves.values()].every(l=>Number.isFinite(l.x)&&Number.isFinite(l.y))})')
            assert abs(row['zoom']-level)<.0001,(size,level,row['zoom'])
            for group in row['leaves']:
                expected=0 if level<=.5 else min(group['total'],50 if group['id']==selected else 10)
                assert group['shown']==expected,(size,selected,level,group,expected)
            assert row['gpu']==sum(x['shown'] for x in row['leaves']) and row['finite']
            matrix.append({'viewport':size,'selected':selected,'requestedZoom':level,**row})
        zoom(1)
        check(f'all nodes fit at 100%, {size}, {selected}', '([...atlasController.nodes.values(),...atlasController.leaves.values()]).every(p=>{const c=atlasController.camera;return p.x*c.k+c.x>=0&&p.x*c.k+c.x<=atlasController.width&&p.y*c.k+c.y>=0&&p.y*c.k+c.y<=atlasController.height})')
    print('PASS zoom matrix',size,flush=True)
call(op='resize',width=1200,height=760);settle()
call('selected=null;renderAtlas();atlasController.fit();true');settle();start_width=call('atlasController.width')
call('toggleObservatory(true);true');settle()
check('Observatory reduces actual graph viewport',f'atlasController.width<{start_width}-100 && !$("#observatory-panel").hidden && $("#observatory-toggle").getAttribute("aria-expanded")==="true"')
call('toggleObservatory(false);true');settle()
check('minimize restores graph area',f'Math.abs(atlasController.width-{start_width})<1 && $("#observatory-panel").hidden')
call('atlasController.nodes.get("marketing").g.focus();true')
check('expert tooltip reveals name and actual count on keyboard focus','!$("#tooltip").hidden && $("#tooltip").textContent==="Marketing · 50 skills" && getComputedStyle(atlasController.nodes.get("marketing").label).display==="none"')
call('selected="cyber-security";$("#density").value=0;renderAtlas();true');settle()
check('low detail retains 50 actual selected skills','[...atlasController.leaves.values()].filter(l=>l.parent==="cyber-security").length===50')
call('$("#density").value=6;renderAtlas();true');settle()
check('high detail has an observable effect','[...atlasController.leaves.values()].filter(l=>l.parent==="cyber-security").length===86')
call('$("#density").value=3;selected=null;renderAtlas();atlasController.fit();true');settle()
# Continuous formation uses the same objects and never installation/file commands.
async_js('await ensureReplay();window.matrixNode=atlasController.nodes.get("marketing");window.matrixCanvas=atlasController.universe.canvas;')
call('atlasController.setFormation({progress:0,playing:false});true')
check('formation begins with hidden specialists','atlasController.nodes.get("marketing").g.style.opacity==="0" && atlasController.nodes.get("marketing").g.tabIndex===-1')
call('atlasController.setFormation({progress:.55,playing:false});true')
check('connectors precede skills','Number(atlasController.nodes.get("marketing").g.style.opacity)>.8 && [...atlasController.leaves.values()].every(l=>Number(l.g.style.opacity)===0)')
call('atlasController.setFormation({progress:.75,playing:true,duration:12000});true');time.sleep(.3)
call('atlasController.setFormation({playing:false});window.matrixPause=atlasController.getFormation().progress;true');time.sleep(.4)
check('pause holds exact visual position','atlasController.getFormation().progress===matrixPause')
call('atlasController.setFormation({playing:true});true');time.sleep(.3)
check('resume advances without rebuilding topology','atlasController.getFormation().progress>matrixPause && matrixNode===atlasController.nodes.get("marketing") && matrixCanvas===atlasController.universe.canvas')
call('atlasController.setFormation({progress:1,playing:false});true')
check('final stage reveals all instantiated skills','[...atlasController.leaves.values()].every(l=>l.g.style.opacity==="" && l.g.tabIndex===0)')
call('live();true');settle()
assert files()==original,'Replay modified fixture files';checks.append('replay leaves all fixture file hashes unchanged')
# Shared modal, breadcrumb and dirty close behavior.
call('$("#settings").focus();settings();true')
check('modal has one header, one body, one footer and breadcrumb','$("#modal").open && $$(".modal-header").length===1 && $$(".modal-body").length===1 && $$(".modal-footer").length===1 && !!$("#modal-back")')
async_js('await showUpdates(false);')
check('updates remove former repository UI and present Memory honestly','$("#modal-title").textContent==="Atualizações" && !$("#modal-content").textContent.includes("Cognee") && !$("#skills-repository") && !$("#catalog-origins") && $("#modal-content").textContent.includes("Memory")')
call('$("#modal-back").click();true')
check('settings back button returns to root','$("#modal-title").textContent==="Ajustes do Oracle"')
call('closeModal();true')
check('closing modal restores origin focus','document.activeElement===$("#settings")')
path='WIKI/Decisões.md'
async_js('await openNote('+json.dumps(path)+');window.matrixOriginal=readDocument.text;editNote();')
call('$("#editor").value=matrixOriginal+"\\nTeste automático do editor.\\n";$("#editor").dispatchEvent(new Event("input"));closeModal();true')
check('dirty close keeps content and offers explicit recovery choices','$("#modal").open && modalDirty && !!$("#keep-editing") && !!$("#keep-draft-close")')
async_js('await persistEditorDraft();')
call('$("#keep-editing").click();true');async_js('await saveEditor();')
check('saving rereads the original Markdown file','readDocument.relative==='+json.dumps(path)+' && readDocument.text.includes("Teste automático") && !modalDirty')
async_js('editNote(matrixOriginal);await saveEditor();closeModal();')
assert files()==original,'Editor restoration failed';checks.append('editor can restore original bytes after direct save')
# Fail closed on installed-only plugins and stale update signals, without making them live data.
call('window.matrixInventory=state.codexPlugins;state.codexPlugins={status:"available",checkedAt:new Date().toISOString(),plugins:[{id:"fixture-installed",name:"Fixture Installed",status:"installed"},{id:"fixture-connected",name:"Fixture Connected",status:"connected"}]};renderPlugins();renderAtlas();true')
check('only connected plugins enter SOL orbit','document.querySelectorAll("[data-orbit-plugin]").length===1 && document.querySelector("[data-orbit-plugin]").dataset.orbitPlugin==="fixture-connected"')
call('state.codexPlugins=matrixInventory;renderPlugins();renderAtlas();reflectUpdateStatus({available:true,at:new Date().toISOString()});true')
check('verified fresh availability enables green state','$("#updates").classList.contains("available")')
call('reflectUpdateStatus({available:true,at:"2000-01-01T00:00:00Z"});true')
check('stale availability never remains green','!$("#updates").classList.contains("available")')
call('$("#motion").checked=true;renderAtlas();true');time.sleep(.5);call('window.matrixFrames=atlasController.universe.renderCount;true');time.sleep(.4)
check('reduced motion settles without a running render loop','atlasController.universe.renderCount===matrixFrames && atlasController.universe.pending===0 && atlasController.universe.timeout===0')
call('$("#motion").checked=false;renderAtlas();true');call(op='hide');time.sleep(.3);call('window.matrixFrames=atlasController.universe.renderCount;true');time.sleep(.4)
check('minimization stops both render schedulers','atlasController.universe.renderCount===matrixFrames && atlasController.frame===0')
call(op='show');time.sleep(.3)
call('window.matrixExtension=atlasController.universe.renderer.getContext().getExtension("WEBGL_lose_context");matrixExtension.loseContext();true');time.sleep(.3)
check('WebGL loss keeps an accessible SVG fallback','atlasController.el.classList.contains("svg-fallback") && atlasController.nodes.get("marketing").g.tabIndex===0')
call('matrixExtension.restoreContext();true');time.sleep(.6)
check('WebGL restoration retains a single canvas','atlasController.el.classList.contains("three-enabled") && atlasController.el.querySelectorAll("canvas").length===1 && !atlasController.diagnostics().error')
result={'passed':len(checks),'checks':checks,'zoomMatrix':matrix,'scope':'Real AppKit/WKWebView app; isolated synthetic vault; runtime plugin and availability fixture assertions are explicitly synthetic, never live integration evidence.'}
(ROOT/'docs/evidence/organic-ui/native-matrix.json').write_text(json.dumps(result,indent=2,ensure_ascii=False)+'\n')
print('TOTAL',len(checks),'checks and',len(matrix),'zoom scenarios',flush=True)
