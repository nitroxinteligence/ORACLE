#!/usr/bin/env python3
"""Real WKWebView regression tests, isolated public catalog. No personal vault changes."""
import hashlib,importlib.util,json,time
from pathlib import Path
ROOT=Path(__file__).resolve().parent.parent
spec=importlib.util.spec_from_file_location('qa',ROOT/'scripts/atlas-qa.py');qa=importlib.util.module_from_spec(spec);spec.loader.exec_module(qa)
call=qa.call;checks=[];matrix=[]
def check(name,js):
    value=call(js);assert value is True,(name,value);checks.append(name);print('PASS',name,flush=True)
def settle(timeout=8):
    end=time.monotonic()+timeout
    while time.monotonic()<end:
        if call('!atlasController.frame && !atlasController.geometryMoving && !document.hidden && window.oracleWindowVisible!==false && Math.abs(atlasController.camera.k-atlasController.target.k)<.000001'):return
        time.sleep(.08)
    raise TimeoutError('Native window must remain visible for geometry to settle')
def zoom(value):
    call(f'atlasController.zoomAt({value}/(atlasController.target.k/atlasController.baseScale));true');settle()
def source_hashes():
    root=Path(call('state.config.vault'));assert '/.work/' in str(root)
    return {str(p.relative_to(root)):hashlib.sha256(p.read_bytes()).hexdigest() for p in root.rglob('*.md')}
call(op='show')
call('window.OracleOnboarding?.suspend();closeModal(true);live();toggleObservatory(false);selected=null;selectedSkill=null;$("#motion").checked=true;$("#density").value=3;renderAtlas();atlasController.fit();true');settle()
check('public fixture isolated from the personal vault','state.config.fixture===true&&state.config.vault.includes("/.work/public-gallery/")')
check('WebGL compiles the new topology','!atlasController.diagnostics().error&&atlasController.universe.renderCount>0&&atlasController.el.querySelectorAll("canvas").length===1')
check('all 818 security files remain indexed','atlasController.nodes.get("cyber-security").skills.length===818')
check('every skill points to a group and no skill is a prerequisite','atlasController.geometry.leaves.every(l=>l.source===l.group&&atlasController.groups.get(l.source).skills.some(s=>s.path===l.id))')
original=source_hashes()
for size in [(1200,760),(840,620),(1440,900)]:
    call(op='resize',width=size[0],height=size[1]);settle()
    for selected in [None,'marketing','cyber-security','contents']:
        call(f'atlasController.select({json.dumps(selected)});atlasController.fit();true');settle()
        for level in [.49,.5,.51,1,2]:
            zoom(level)
            row=call('({selected,zoom:atlasController.camera.k/atlasController.baseScale,groups:[...atlasController.nodes.values()].map(n=>({id:n.id,total:n.skills.length,shown:[...atlasController.leaves.values()].filter(l=>l.parent===n.id&&!l.retiring).length})),finite:[...atlasController.leaves.values()].every(l=>Number.isFinite(l.x)&&Number.isFinite(l.y))})')
            assert abs(row['zoom']-level)<.0001 and row['finite'],row
            for group in row['groups']:
                expected=0 if level<=.5 else min(group['total'],50 if group['id']==selected else 10)
                assert group['shown']==expected,(size,level,selected,group)
            matrix.append({'size':size,'requestedZoom':level,**row})
        zoom(1)
        check(f'focal geometry fits {size} {selected}', 'atlasController.geometry.leaves.filter(l=>!selected||l.parent===selected).every(l=>{const c=atlasController.camera;return l.x*c.k+c.x>=10&&l.x*c.k+c.x<=atlasController.width-10&&l.y*c.k+c.y>=atlasController.contentTop&&l.y*c.k+c.y<=atlasController.height-10})')
        check(f'SOL is wholly framed {size} {selected}','(()=>{const c=atlasController.camera,r=125*c.k;return c.x-r>=0&&c.x+r<=atlasController.width&&c.y-r>=0&&c.y+r<=atlasController.height})()')
    print('PASS viewport matrix',size,flush=True)
call(op='resize',width=1200,height=760);settle()
call('atlasController.select(null);atlasController.fit();atlasController.history=[];true');settle()
call('window.savedGlobal={...atlasController.camera};atlasController.focus("marketing");true');settle()
call('window.savedSpecialist={...atlasController.camera};window.testGroup=atlasController.geometry.groups.find(g=>g.parent==="marketing"&&g.skills.length>5).id;atlasController.focusGroup(testGroup);true');settle()
check('group is a distinct camera context','atlasController.context.kind==="group"&&atlasController.context.group===testGroup&&document.querySelector(".atlas-context").textContent.includes("Marketing")')
call('atlasController.zoomAt(1.18);atlasController.target.x+=37;atlasController.target.y-=23;atlasController.invalidate();true');settle()
call('window.savedGroup={...atlasController.camera};window.testLeaf=atlasController.geometry.leaves.find(l=>l.group===testGroup).id;atlasController.select("marketing",testLeaf);true');settle()
check('skill opens its inspector without being hidden behind it','atlasController.context.kind==="skill"&&!$("#observatory-panel").hidden&&(()=>{const l=atlasController.leaves.get(testLeaf),c=atlasController.camera;return Math.abs(l.x*c.k+c.x-atlasController.width/2)<1&&Math.abs(l.y*c.k+c.y-(atlasController.height+atlasController.contentTop)/2)<1})()')
call('atlasController.back();true');settle()
check('back closes the map-owned inspector and restores the panned and zoomed group','$("#observatory-panel").hidden&&atlasController.context.kind==="group"&&Math.hypot(atlasController.camera.x-savedGroup.x,atlasController.camera.y-savedGroup.y)<1&&Math.abs(atlasController.camera.k-savedGroup.k)<.001')
call('atlasController.back();true');settle()
check('back restores specialist camera','atlasController.context.kind==="specialist"&&Math.hypot(atlasController.camera.x-savedSpecialist.x,atlasController.camera.y-savedSpecialist.y)<1')
call('atlasController.back();true');settle()
check('back restores global camera','atlasController.context.kind==="global"&&Math.hypot(atlasController.camera.x-savedGlobal.x,atlasController.camera.y-savedGlobal.y)<1')
call('window.pointer={x:atlasController.width*.31,y:atlasController.height*.67};window.anchor={x:(pointer.x-atlasController.target.x)/atlasController.target.k,y:(pointer.y-atlasController.target.y)/atlasController.target.k};window.rect=atlasController.el.getBoundingClientRect();atlasController.zoomAt(1.4,pointer.x+rect.left,pointer.y+rect.top);true');settle()
check('pointer-anchored zoom keeps the same world coordinate','Math.abs((pointer.x-atlasController.target.x)/atlasController.target.k-anchor.x)<.00001&&Math.abs((pointer.y-atlasController.target.y)/atlasController.target.k-anchor.y)<.00001')
call('atlasController.focus("cyber-security");window.largeGroup=atlasController.geometry.groups.find(g=>g.parent==="cyber-security"&&g.skills.length>180).id;atlasController.focusGroup(largeGroup);atlasController.pageGroup(3);true');settle()
check('large groups page actual members','atlasController.context.page===3&&atlasController.geometry.leaves.filter(l=>l.group===largeGroup).length===50&&[...atlasController.leaves.values()].filter(l=>l.parent==="cyber-security"&&!l.retiring).length>=50')
call('atlasController.focus("marketing");atlasController.focus("code");atlasController.focus("cyber-security");atlasController.select(null);true');settle()
check('rapid navigation has one scene and no lingering retirees','atlasController.context.kind==="global"&&atlasController.el.querySelectorAll("canvas").length===1&&[...atlasController.leaves.values()].every(l=>!l.retiring)&&!atlasController.diagnostics().error')
call('$("#motion").checked=false;renderAtlas();atlasController.setFormation({progress:.35,playing:false});window.sameCanvas=atlasController.universe.canvas;true')
check('formation reveals specialists before groups and skills','[...atlasController.groups.values()].every(g=>Number(g.g.style.opacity)===0)&&[...atlasController.leaves.values()].every(l=>Number(l.g.style.opacity)===0)')
call('atlasController.setFormation({progress:.6,playing:false});true')
check('groups precede skills','[...atlasController.groups.values()].some(g=>Number(g.g.style.opacity)>.5)&&[...atlasController.leaves.values()].every(l=>Number(l.g.style.opacity)===0)')
call('atlasController.setFormation({progress:.73,playing:true,duration:12000});true');time.sleep(.4)
call('atlasController.setFormation({playing:false});window.pauseAt=atlasController.getFormation().progress;true');time.sleep(.35)
check('pause is exact','atlasController.getFormation().progress===pauseAt')
call('atlasController.setFormation({playing:true});true');time.sleep(.3)
check('resume advances the same scene','atlasController.getFormation().progress>pauseAt&&sameCanvas===atlasController.universe.canvas')
call('atlasController.setFormation({progress:1,playing:false});$("#motion").checked=true;renderAtlas();true');settle()
call('window.drawsBefore=atlasController.universe.renderCount;true');time.sleep(.4)
check('reduced motion settles without a render loop','atlasController.universe.renderCount===drawsBefore&&!atlasController.universe.pending&&!atlasController.universe.timeout')
call('$("#motion").checked=false;renderAtlas();true');call(op='hide');time.sleep(.4)
call('window.hiddenDraws=atlasController.universe.renderCount;true');time.sleep(.4)
check('minimized native window stops rendering','atlasController.universe.renderCount===hiddenDraws&&atlasController.diagnostics().paused')
call(op='show');time.sleep(.4)
check('restoring native window resumes','atlasController.universe.renderCount>hiddenDraws')
assert source_hashes()==original,'Visual navigation modified public source files'
checks.append('all public Markdown hashes unchanged by navigation and timelapse')
report={'checks':checks,'passed':len(checks),'matrix':matrix,'source':'Real AppKit/WKWebView with isolated public catalog; state transitions tested through test-only native mailbox. Physical pointer/keyboard coverage documented separately.'}
(ROOT/'docs/evidence/skilltree/native-tests.json').write_text(json.dumps(report,indent=2)+'\n')
print('TOTAL',len(checks),'checks;',len(matrix),'zoom scenarios',flush=True)
