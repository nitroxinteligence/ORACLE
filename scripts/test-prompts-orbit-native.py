#!/usr/bin/env python3
"""Bounded native UI checks. Uses only the existing synthetic public-gallery vault."""
import importlib.util
import json
import os
from pathlib import Path
import shutil
import time

ROOT = Path(__file__).resolve().parent.parent
REVIEW = Path(os.environ.get('ORACLE_PROMPT_ORBIT_REVIEW', ROOT / '.work/prompt-orbit-review'))
os.environ['ORACLE_ATLAS_QA_DIR'] = str(REVIEW / 'mailbox')
spec = importlib.util.spec_from_file_location('qa', ROOT / 'scripts/atlas-qa.py')
qa = importlib.util.module_from_spec(spec)
spec.loader.exec_module(qa)
checks = []

def js(source):
    return qa.call(source)

def check(name, source):
    assert js(source), name
    checks.append(name)

def wait_for(source, timeout=8):
    deadline = time.monotonic() + timeout
    while time.monotonic() < deadline:
        if js(source):
            return
        time.sleep(.15)
    raise AssertionError('Native state did not settle: ' + source)

def settled():
    wait_for('!atlasController.geometryMoving && !atlasController.el.classList.contains("scene-travelling")')

if __name__ == '__main__':
    config = json.loads((ROOT / '.work/public-gallery/state/config.json').read_text())
    vault = ROOT / '.work/public-gallery/vault'
    assert config.get('fixture') is True and config['vault'] == str(vault)
    library = vault / 'SISTEMA/prompts'
    assert not library.exists(), 'Do not overwrite any pre-existing fixture'
    qa.call(op='show')
    wait_for('!document.hidden')
    wait_for('typeof closeModal==="function" && typeof atlasController!=="undefined" && !!atlasController?.data')
    library.mkdir()
    try:
        for department in ['imagens', 'front-end-design', 'back-end', 'vida-pessoal', 'vida-profissional']:
            for subfolder in ['criacao', 'revisao', 'referencias']:
                (library / department / subfolder).mkdir(parents=True)
        prompt = library / 'imagens/criacao/Exemplo de imagem.md'
        prompt.write_text('# Exemplo de imagem\n\nPrompt sintético exclusivo desta verificação.\n\nDescreva a luz e preserve a composição.\n', encoding='utf-8')
        (library / 'front-end-design/revisao/Interface.md').write_text('# Interface\n\nVerifique a hierarquia e a leitura.\n', encoding='utf-8')
        js('window.promptOrbitErrors=[];window.addEventListener("error",e=>promptOrbitErrors.push(e.message));closeModal(true);safe(refresh)();true')
        wait_for('!!atlasController.promptOrbit?.points.length')
        js('atlasController.select(null);atlasController.setFormation({progress:1,playing:false});true')
        settled()
        wait_for('Math.abs(atlasController.camera.k/atlasController.baseScale-1.18)<.0001')
        check('Default camera and its visible label both use 118 percent',
              'Math.abs(atlasController.camera.k/atlasController.baseScale-1.18)<.0001 && $("#zoom-label").textContent==="118%"')
        check('Every orbital item inherits its fixed personal, professional or prompt color',
              '(()=>{const colors={personal:"#D4A1CC",professional:"#83B9D7",prompts:"#CEC08B"};return [...atlasController.knowledgeOrbit.points,...atlasController.promptOrbit.points].every(p=>p.color===colors[p.area]) && [...document.querySelectorAll("[data-knowledge-area]")].filter(g=>g.querySelector(".knowledge-orbit-dot")).every(g=>g.querySelector(".knowledge-orbit-dot").getAttribute("fill")===colors[g.dataset.knowledgeArea])})()')
        check('Starfield covers the entire app and cannot intercept navigation',
              '(()=>{const s=atlasController.starfield,r=s.getBoundingClientRect();return s.parentElement.id==="app"&&s.childElementCount>=80&&s.getAttribute("aria-hidden")==="true"&&getComputedStyle(s).pointerEvents==="none"&&r.left===0&&r.top===0&&Math.abs(r.width-innerWidth)<1&&Math.abs(r.height-innerHeight)<1})()')
        check('Seven faint expansion rings stay separate from interactive orbit items',
              'atlasController.expansionRings.length===7&&atlasController.expansion.getAttribute("aria-hidden")==="true"&&getComputedStyle(atlasController.expansion).pointerEvents==="none"&&atlasController.expansionRings.every(r=>Number(r.getAttribute("opacity"))<.075&&!r.hasAttribute("tabindex"))')
        check('Ambient expansion shares the existing motion, pause and accessibility controls',
              '(()=>{const a=atlasController,paused=a.paused,reduced=a.reduced;try{a.paused=false;a.reduced=false;const t=a.atmosphereSeconds;a.animateOrbits(100);if(a.atmosphereSeconds<=t)return false;const advanced=a.atmosphereSeconds;a.paused=true;a.animateOrbits(100);if(a.atmosphereSeconds!==advanced)return false;a.paused=false;a.reduced=true;a.animateOrbits(100);return a.atmosphereSeconds===advanced}finally{a.paused=paused;a.reduced=reduced}})()')
        check('Exactly one outer concentric orbit, with real folders and prompts',
              'atlasController.promptOrbit.rings.length===1 && atlasController.promptOrbit.points.length===23 && atlasController.promptOrbit.area.notes===2 && atlasController.promptOrbit.rings[0]===atlasController.knowledgeOrbit.radius+38')
        check('Personal/professional geometry remains unchanged',
              'JSON.stringify(OracleKnowledge.orbit(state.entries,atlasController.pluginRadius))===JSON.stringify(atlasController.knowledgeOrbit)')
        check('Sun and specialist positions remain unchanged for the added orbit',
              '(()=>{const original=OracleLayout.plan(atlasController.data.collections,atlasController.data.entries,null,Number($("#density").value),atlasController.layout,atlasController.knowledgeOrbit.radius+110);return original.nodes.every(p=>{const n=atlasController.nodes.get(p.id);return n.tx===p.x&&n.ty===p.y})&&atlasController.universe.sun.visible})()')
        check('Filled circles reuse knowledge-circle dimensions, stroke, and keyboard semantics',
              '[...document.querySelectorAll(".prompt-orbit-node")].every(g=>g.getAttribute("role")==="button"&&g.getAttribute("tabindex")==="0"&&g.querySelector(".knowledge-orbit-dot")&&g.querySelector(".knowledge-orbit-hit"))')
        js('atlasController.setPaused(true);true')
        qa.call(op='snapshot', name='after.png')
        check('Prompt tooltip identifies the canonical folder and actual count',
              '(()=>{const g=document.querySelector("[data-knowledge-area=prompts][data-knowledge-path=\\"SISTEMA/prompts\\"]");g.focus();g.dispatchEvent(new FocusEvent("focusin",{bubbles:true}));return !$("#tooltip").hidden && $("#tooltip").textContent.includes("2 prompts") && $("#tooltip").textContent.includes("SISTEMA/prompts")})()')
        qa.call(op='snapshot', name='prompt-tooltip.png')
        js('document.querySelector("[data-knowledge-area=prompts][data-knowledge-path=\\"SISTEMA/prompts\\"]").dispatchEvent(new KeyboardEvent("keydown",{key:"Enter",bubbles:true}));true')
        settled()
        check('Enter opens only prompt departments with contextual breadcrumb',
              'atlasController.knowledge?.area==="prompts" && atlasController.leaves.size===5 && !atlasController.universe.sun.visible && document.querySelector(".atlas-breadcrumb").textContent.includes("Prompts")')
        check('Prompt departments keep the same fixed color inside their scene',
              '[...atlasController.nodes.values(),...atlasController.leaves.values()].every(p=>p.color==="#CEC08B")')
        check('Focused folder scenes retain stars but hide the expanding global rings',
              'getComputedStyle(atlasController.expansion).display==="none"&&getComputedStyle(atlasController.starfield).display!=="none"')
        qa.call(op='snapshot', name='prompt-departments.png')
        js('atlasController.navigateKnowledge("prompts","SISTEMA/prompts/imagens/criacao");true')
        settled()
        check('Nested folder shows only its actual prompt',
              'atlasController.leaves.size===1 && atlasController.leaves.has("SISTEMA/prompts/imagens/criacao/Exemplo de imagem.md")')
        js('atlasController.select(atlasController.geometry.nodes[0].id,"SISTEMA/prompts/imagens/criacao/Exemplo de imagem.md");true')
        wait_for('$("#modal").open && !!promptDocument')
        check('Click opens the intact prompt library and reads the actual selected Markdown',
              '$("#modal").dataset.family==="prompts" && promptDocument.text.includes("Prompt sintético exclusivo") && promptSelectedPath.endsWith("Exemplo de imagem.md")')
        qa.call(op='snapshot', name='prompt-library.png')
        js('closeModal(true);atlasController.back();true')
        settled()
        check('Back returns to the parent prompt context',
              'atlasController.knowledge?.path==="SISTEMA/prompts"')
        js('atlasController.select(null);true')
        settled()
        check('Returning to universe restores the existing and new orbits',
              'atlasController.nodes.size===7 && !atlasController.knowledge && getComputedStyle(atlasController.promptLayer).display!=="none" && getComputedStyle(atlasController.knowledgeLayer).display!=="none"')
        check('Hover freezes its whole orbit without adding a timer',
              '(()=>{const a=atlasController,t=a.orbitTracks.get("prompts-0");a.hovered={orbit:"prompts-0"};a.setPaused(false);const before=t.seconds;a.animateOrbits(100);a.hovered=null;a.setPaused(true);return t.seconds===before})()')
        check('Reduced motion prevents orbit movement',
              '(()=>{const a=atlasController,t=a.orbitTracks.get("prompts-0"),before=t.seconds;a.reduced=true;a.setPaused(false);a.animateOrbits(100);a.reduced=false;a.setPaused(true);return t.seconds===before})()')
        qa.call(op='resize', width=840, height=620)
        settled()
        check('Complete prompt orbit fits the small native window',
              'atlasController.promptOrbit.points.every(p=>{const c=atlasController.target,x=c.x+p.x*c.k,y=c.y+p.y*c.k,r=p.r*c.k;return x-r>=0&&x+r<=atlasController.width&&y-r>=0&&y+r<=atlasController.height})')
        qa.call(op='snapshot', name='small-window.png')
        qa.call(op='resize', width=1200, height=760)
        settled()
        js('$("#zoom-in").click();true')
        wait_for('Math.abs(atlasController.camera.k/atlasController.baseScale-1.416)<.0001')
        check('Manual zoom remains available and the label follows the actual scale',
              '$("#zoom-label").textContent==="142%" && !atlasController.autoFit')
        js('$("#zoom-reset").click();$("#zoom-reset").click();true')
        wait_for('Math.abs(atlasController.camera.k/atlasController.baseScale-1.18)<.0001')
        check('Repeated fit returns to 118 percent without accumulating scale',
              '$("#zoom-label").textContent==="118%" && atlasController.autoFit')
        js('atlasController.zoomAt(.3);atlasController.navigateKnowledge("prompts","SISTEMA/prompts");true')
        settled()
        js('atlasController.back();true')
        settled()
        wait_for('Math.abs(atlasController.camera.k/atlasController.baseScale-1.18)<.0001')
        check('Back to the universe resets a previous manual overview zoom to 118 percent',
              '!atlasController.knowledge && !atlasController.selected && $("#zoom-label").textContent==="118%"')
        js('atlasController.navigateKnowledge("prompts","SISTEMA/prompts");true')
        settled()
        js('atlasController.zoomAt(.3);atlasController.select(null);true')
        settled()
        wait_for('Math.abs(atlasController.camera.k/atlasController.baseScale-1.18)<.0001')
        check('Overview navigation cannot carry a low zoom out of a folder',
              '!atlasController.knowledge && $("#zoom-label").textContent==="118%"')
        check('No script or renderer errors',
              'promptOrbitErrors.length===0 && !atlasController.sceneError && !atlasController.universe.diagnostics().error')
        report = {'passed': len(checks), 'checks': checks,
                  'scope': 'Native AppKit/WKWebView, public skill catalog and synthetic prompt files; not personal vault contents.'}
        (REVIEW / 'native-checks.json').write_text(json.dumps(report, indent=2, ensure_ascii=False)+'\n')
        print(json.dumps(report, ensure_ascii=False, indent=2))
    finally:
        shutil.rmtree(library)
        js('safe(refresh)();true')
