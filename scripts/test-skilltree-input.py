#!/usr/bin/env python3
"""Native hit testing and fallback checks after map targets or appearance changes."""
import importlib.util,json,time
from pathlib import Path
ROOT=Path(__file__).resolve().parent.parent
spec=importlib.util.spec_from_file_location('qa',ROOT/'scripts/atlas-qa.py');qa=importlib.util.module_from_spec(spec);spec.loader.exec_module(qa)
call=qa.call;results=[]
def check(name,js):
    value=call(js);assert value is True,(name,value);results.append(name);print('PASS',name,flush=True)
def settle():
    for _ in range(80):
        if call('!atlasController.frame&&!atlasController.geometryMoving&&!document.hidden'):return
        time.sleep(.08)
    raise TimeoutError('native scene did not settle')
for _ in range(100):
    if call('typeof closeModal==="function"&&typeof atlasController!=="undefined"&&!!atlasController?.universe'):break
    time.sleep(.1)
else:raise TimeoutError('native page did not load')
call(op='show');call('if(window.organicExpansion)clearInterval(organicExpansion);closeModal(true);$("#app").inert=false;toggleObservatory(false);$("#motion").checked=true;renderAtlas();atlasController.select(null);atlasController.fit();true');settle()
for size in [(840,620),(1440,900)]:
    call(op='resize',width=size[0],height=size[1]);settle()
    for selected in [None,'marketing']:
        call(f'atlasController.select({json.dumps(selected)});atlasController.fit();true');settle()
        for level in [.51,1]:
            call(f'atlasController.zoomAt({level}/(atlasController.target.k/atlasController.baseScale));true');settle()
            misses=call('(()=>{const a=atlasController,c=a.camera,r=a.el.getBoundingClientRect();return [...a.leaves.values()].filter(l=>!l.retiring&&(!selected||l.parent===selected)).flatMap(l=>{const x=r.left+c.x+l.x*c.k,y=r.top+c.y+l.y*c.k;const target=document.elementFromPoint(x,y)?.closest("[data-skill]")?.dataset.skill;return target===l.id?[]:[{expected:l.id,actual:target||null,x,y}]})})()')
            assert not misses,(size,selected,level,misses)
            results.append(f'precise skill centre hit tests {size} {selected} {level}')
            print('PASS hit tests',size,selected,level,flush=True)
call(op='resize',width=1200,height=760);settle()
call('atlasController.focus("cyber-security");window.inputGroup=atlasController.geometry.groups.find(g=>g.parent==="cyber-security"&&g.skills.length>100).id;atlasController.focusGroup(inputGroup);true');settle()
check('group has short file branches and semantic membership','atlasController.geometry.leaves.filter(l=>l.group===inputGroup).every(l=>l.route&&l.source===l.group)&&Number(atlasController.groups.get(inputGroup).bus.style.opacity)>.4')
call('window.priorTransparency=document.body.classList.contains("reduce-transparency");document.body.classList.add("reduce-transparency");true')
check('new navigation honours Reduce Transparency','getComputedStyle(document.querySelector(".atlas-context")).backgroundColor==="rgb(28, 28, 28)"')
call('document.body.classList.toggle("reduce-transparency",priorTransparency);true')
check('the UI accepts only rasterized artwork','!pluginIcon({name:"Fixture",iconDataURL:"data:image/svg+xml;base64,PHN2Zz48L3N2Zz4="}).includes("<img")')
check('original artwork has no CSS desaturation','[...document.querySelectorAll(".orbital-plugin image,.plugin-icon img")].every(e=>getComputedStyle(e).filter==="none")')
call('atlasController.select(null);atlasController.fit();window.inputExtension=atlasController.universe.renderer.getContext().getExtension("WEBGL_lose_context");inputExtension.loseContext();true');time.sleep(.25)
check('WebGL loss preserves accessible SVG group targets','atlasController.el.classList.contains("svg-fallback")&&[...atlasController.groups.values()].every(g=>g.g.tabIndex===0)')
call('inputExtension.restoreContext();true');time.sleep(.6)
check('WebGL recovery keeps one canvas and working shaders','atlasController.el.classList.contains("three-enabled")&&atlasController.el.querySelectorAll("canvas").length===1&&!atlasController.diagnostics().error')
call('$("#motion").checked=false;renderAtlas();true');settle()
(ROOT/'docs/evidence/skilltree/native-input-tests.json').write_text(json.dumps({'passed':len(results),'checks':results,'scope':'WebKit native DOM hit testing, appearance and WebGL recovery; physical mouse and keyboard tested separately.'},indent=2)+'\n')
print('TOTAL',len(results),flush=True)
