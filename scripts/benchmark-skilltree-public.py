#!/usr/bin/env python3
"""Short active-camera sample on the full public catalog; raw intervals, no input races."""
import importlib.util,json,time,subprocess,statistics
from pathlib import Path
ROOT=Path(__file__).resolve().parent.parent
spec=importlib.util.spec_from_file_location('qa',ROOT/'scripts/atlas-qa.py');qa=importlib.util.module_from_spec(spec);spec.loader.exec_module(qa)
call=qa.call
for _ in range(100):
    if call('typeof atlasController!=="undefined"&&!!atlasController?.universe&&state.config.fixture===true'):break
    time.sleep(.1)
assert call('state.config.vault.includes("/.work/public-gallery/")')
call(op='show');call(op='resize',width=1200,height=760)
call('if(window.organicExpansion)clearInterval(organicExpansion);closeModal(true);toggleObservatory(false);toggleNavigation(true);$("#motion").checked=false;$("#economy").checked=false;$("#density").value=3;renderAtlas();atlasController.select(null);atlasController.fit();atlasController.setFormation({progress:1,playing:false});atlasController.universe.governor.reset();atlasController.universe.setQuality("balanced");window.publicPriorInert=$("#app").inert;$("#app").inert=true;true')
time.sleep(1.2)
call('atlasController.universe.resetDiagnostics();atlasController.interactionFrames=[];atlasController.updateCosts=[];window.publicStart=atlasController.universe.renderCount;window.publicStep=0;window.publicMotion=setInterval(()=>atlasController.select(["marketing","cyber-security",null][publicStep++%3]),1800);true')
start=time.monotonic();processes=[]
try:
    while time.monotonic()-start<11:
        time.sleep(1)
        for line in subprocess.check_output(['ps','-axo','pid,%cpu,rss,comm'],text=True).splitlines()[1:]:
            fields=line.strip().split(None,3)
            if len(fields)==4 and fields[3].endswith('/OracleAtlasQA'):processes.append({'pid':int(fields[0]),'cpu':float(fields[1]),'rssKB':int(fields[2])})
    seconds=time.monotonic()-start
    result=call('({frames:atlasController.universe.renderCount-publicStart,diagnostics:atlasController.diagnostics(),documents:state.entries.filter(e=>e.name==="SKILL.md").length,viewport:[innerWidth,innerHeight],visible:!document.hidden,selected})')
    assert result['visible'] and not result['diagnostics']['paused'] and result['frames']>70,result
    result.update(seconds=round(seconds,3),observedFPS=round(result['frames']/seconds,2),hostCPUMedianPercent=statistics.median(p['cpu'] for p in processes),hostRSSPeakMB=round(max(p['rssKB'] for p in processes)/1024,2),processSamples=processes,scope='Native public catalog, scripted specialist selection; raw interaction intervals. UI input temporarily inert. Host CPU/RSS excludes unattributable shared WebKit helpers. This is not a physical pinch measurement.')
    (ROOT/'docs/benchmarks/skilltree-public-expansion.json').write_text(json.dumps(result,indent=2)+'\n');print(json.dumps({k:v for k,v in result.items() if k!='processSamples'},indent=2))
finally:call('clearInterval(publicMotion);$("#app").inert=publicPriorInert;true')
