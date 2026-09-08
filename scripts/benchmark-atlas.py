#!/usr/bin/env python3
"""Same native app, fixture, viewport and interaction paths before and after.

The QA build polls its mailbox at 10 Hz in both runs. Samples never record video.
Run: python3 scripts/benchmark-atlas.py before|after
"""
import hashlib
import importlib.util
import json
import pathlib
import subprocess
import sys
import time

ROOT = pathlib.Path(__file__).resolve().parent.parent
spec = importlib.util.spec_from_file_location('qa', ROOT / 'scripts/atlas-qa.py')
qa = importlib.util.module_from_spec(spec)
spec.loader.exec_module(qa)
call = qa.call

def processes():
    # WebKit helpers are launchd children. Include all and explicitly avoid attributing them to Oracle.
    text = subprocess.check_output(['ps', '-axo', 'pid,ppid,%cpu,rss,comm'], text=True)
    return [line.strip() for line in text.splitlines() if 'WebKit.' in line or '/MacOS/Oracle' in line]

def sample(name, seconds=10):
    call("atlasController.universe.resetDiagnostics?.(); atlasController.universe.frames=[]; atlasController.universe.costs=[]; atlasController.interactionFrames=[]; atlasController.updateCosts=[]; window.qaPaint={last:0,intervals:[],cpu:[]}; window.qaRenderStart=atlasController.universe.renderCount||0; true")
    start = time.monotonic()
    process_samples = []
    while time.monotonic() - start < seconds:
        time.sleep(1)
        process_samples.append(processes())
    result = call("({diagnostics:atlasController.diagnostics(),paintProbe:qaSummarize(),renderDelta:(atlasController.universe.renderCount||0)-qaRenderStart,viewport:[innerWidth,innerHeight,devicePixelRatio],atlas:[atlasController.width,atlasController.height],nodes:atlasController.nodes.size,leaves:atlasController.leaves.size})")
    if name in ('ambient', 'zoom', 'drag_geometry', 'economy', 'focused') and (result['diagnostics']['paused'] or result['renderDelta'] < seconds * 8):
        raise RuntimeError(f'{name}: visible sample interrupted; do not use this run for comparison')
    result.update(durationSeconds=round(time.monotonic()-start, 3), processes=process_samples)
    print(name, json.dumps({k: v for k, v in result.items() if k != 'processes'}), flush=True)
    return result

if __name__ == '__main__':
    label = sys.argv[1]
    call(op='show')
    for _ in range(20):
        if call("typeof atlasController!=='undefined' && !!atlasController?.universe"):
            break
        time.sleep(.5)
    call("visualPaused=false; selected=null; selectedSkill=null; $('#motion').checked=false; $('#economy').checked=false; renderAtlas(); atlasController.reset(); atlasController.setFormation?.({progress:1,playing:false}); true")
    time.sleep(2)
    call("""(()=>{
      const u=atlasController.universe;
      if(!u.qaOriginalRender)u.qaOriginalRender=u.render;
      window.qaPaint={last:0,intervals:[],cpu:[]};
      u.render=function(...args){const start=performance.now(),count=this.renderCount||0;const result=this.qaOriginalRender(...args);
        if((this.renderCount||0)>count){if(qaPaint.last)qaPaint.intervals.push(start-qaPaint.last);qaPaint.last=start;qaPaint.cpu.push(performance.now()-start)}return result;};
      window.qaSummarize=()=>{const p=(a,q)=>{if(!a.length)return null;const s=[...a].sort((a,b)=>a-b);return s[Math.floor((s.length-1)*q)]};return{samples:qaPaint.cpu.length,intervalMedianMs:p(qaPaint.intervals,.5),intervalP95Ms:p(qaPaint.intervals,.95),cpuMedianMs:p(qaPaint.cpu,.5),cpuP95Ms:p(qaPaint.cpu,.95)}};
      return true;
    })()""")
    entries = call('state.entries.filter(e=>!e.directory).map(e=>e.path).sort()')
    result = {'label': label, 'utc': time.strftime('%Y-%m-%dT%H:%M:%SZ', time.gmtime()),
              'hardware': subprocess.check_output(['sysctl', '-n', 'machdep.cpu.brand_string'], text=True).strip(),
              'os': subprocess.check_output(['sw_vers', '-productVersion'], text=True).strip(),
              'fixtureDocumentCount': len(entries), 'fixturePathsSHA256': hashlib.sha256(json.dumps(entries).encode()).hexdigest(),
              'limitations': 'CPU submission is not GPU time. ps CPU is an OS average, not energy. WebKit helpers below include other apps. QA mailbox wakes at 10Hz in both builds. No recording during metrics.',
              'phases': {}}
    phases = result['phases']
    phases['ambient'] = sample('ambient', 12)
    # Fixed anchored zoom impulses through the real camera API, not a simplified render loop.
    call("window.qaStep=0; window.qaGesture=setInterval(()=>{atlasController.zoomAt(qaStep++%2?1/1.12:1.12,innerWidth*.52,innerHeight*.57)},180); true")
    phases['zoom'] = sample('zoom', 8)
    call('clearInterval(qaGesture); atlasController.fit(); true')
    time.sleep(1)
    # Same geometry updates as a category drag, bounded and reversible. Pointer capture is covered separately.
    call("window.qaOrigin={...atlasController.nodes.get('code')}; window.qaDragStart=performance.now(); window.qaDragFrame=0; window.qaDragging=true; window.qaMove=()=>{if(!qaDragging)return;let n=atlasController.nodes.get('code'),t=(performance.now()-qaDragStart)/1000;const x=qaOrigin.x+Math.sin(t*2)*55,y=qaOrigin.y+Math.sin(t*3)*30,dx=x-n.x,dy=y-n.y;n.x=x;n.y=y;for(const l of atlasController.leaves.values()){if(l.parent===n.id&&!l.custom){l.x+=dx;l.y+=dy}}atlasController.drag={node:n,category:n.id,moved:true};atlasController.draw();qaDragFrame=requestAnimationFrame(qaMove)};qaMove();true")
    phases['drag_geometry'] = sample('drag_geometry', 8)
    call("qaDragging=false;cancelAnimationFrame(qaDragFrame);atlasController.drag=null;atlasController.reset();$('#density').value=5;atlasController.data.detail=5;atlasController.select('code');atlasController.focus('code');true")
    time.sleep(1)
    phases['focused'] = sample('focused', 10)
    call("selected=null;selectedSkill=null;$('#density').value=3;$('#economy').checked=true;renderAtlas();atlasController.reset();true")
    time.sleep(1)
    phases['economy'] = sample('economy', 12)
    call("visualPaused=true;renderAtlas();true")
    phases['paused'] = sample('paused', 4)
    call("visualPaused=false;$('#motion').checked=true;renderAtlas();true")
    phases['reduced'] = sample('reduced', 4)
    call("$('#motion').checked=false;$('#economy').checked=false;renderAtlas();true")
    call(op='hide')
    time.sleep(1)
    phases['minimized'] = sample('minimized', 4)
    call(op='show')
    destination = ROOT / f'docs/benchmarks/atlas-motion-{label}.json'
    destination.write_text(json.dumps(result, indent=2) + '\n')
    print(destination)
