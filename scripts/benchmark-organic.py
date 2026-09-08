#!/usr/bin/env python3
"""Measure native 0.3 idle, expansion and timelapse. Run with no parallel Oracle QA."""
import importlib.util,json,pathlib,statistics,subprocess,time
ROOT=pathlib.Path(__file__).resolve().parent.parent
spec=importlib.util.spec_from_file_location('qa',ROOT/'scripts/atlas-qa.py');qa=importlib.util.module_from_spec(spec);spec.loader.exec_module(qa)
call=qa.call
label=__import__('sys').argv[1] if len(__import__('sys').argv)>1 else 'after'

def processes():
    rows=[]
    for line in subprocess.check_output(['ps','-axo','pid,ppid,%cpu,rss,comm'],text=True).splitlines()[1:]:
        fields=line.strip().split(None,4)
        if len(fields)==5 and ('WebKit.' in fields[4] or fields[4].endswith('/OracleAtlasQA')):
            rows.append({'pid':int(fields[0]),'ppid':int(fields[1]),'cpuPercent':float(fields[2]),'rssKB':int(fields[3]),'command':fields[4],'ownHost':fields[4].endswith('/OracleAtlasQA')})
    return rows

def sample(name,seconds):
    call('atlasController.universe.resetDiagnostics();atlasController.interactionFrames=[];atlasController.updateCosts=[];window.organicStart=atlasController.universe.renderCount;true')
    begin=time.monotonic();ps=[]
    while time.monotonic()-begin<seconds:
        time.sleep(1);ps.append(processes())
    elapsed=time.monotonic()-begin
    result=call('({diagnostics:atlasController.diagnostics(),frames:atlasController.universe.renderCount-organicStart,viewport:[innerWidth,innerHeight,devicePixelRatio],area:[atlasController.width,atlasController.height],nodes:atlasController.nodes.size,leaves:atlasController.leaves.size})')
    host=[p for sample in ps for p in sample if p['ownHost']]
    result.update(elapsedSeconds=round(elapsed,3),observedFPS=round(result['frames']/elapsed,2),hostCPUMedianPercent=statistics.median(p['cpuPercent'] for p in host) if host else None,hostRSSPeakMB=round(max(p['rssKB'] for p in host)/1024,2) if host else None,processSamples=ps)
    if name in ['idle','expansion','timelapse']:
        assert result['frames']>seconds*8 and not result['diagnostics']['paused'], 'measurement interrupted by occlusion'
    print(name,json.dumps({k:v for k,v in result.items() if k!='processSamples'}),flush=True)
    return result

call(op='show');call(op='resize',width=1200,height=760)
call('window.OracleOnboarding?.suspend();closeModal(true);live();selected=null;selectedSkill=null;visualPaused=false;$("#motion").checked=false;$("#economy").checked=false;$("#density").value=3;renderAtlas();atlasController.fit();atlasController.setFormation({progress:1,playing:false});true');time.sleep(1.5)
results={}
results['idle']=sample('idle',12)
call('window.organicStep=0;window.organicExpansion=setInterval(()=>{selected=["marketing","cyber-security",null][organicStep++%3];selectedSkill=null;renderAtlas();atlasController.fit()},1500);true')
results['expansion']=sample('expansion',12)
call('clearInterval(organicExpansion);selected=null;renderAtlas();atlasController.fit();true');time.sleep(1)
if label=='before':
    call('play();true')
else:
    call('ensureReplay().then(()=>{atlasController.setFormation({progress:0,playing:true,duration:12000});renderPlayback()});true')
results['timelapse']=sample('timelapse',13)
call('live();$("#economy").checked=true;renderAtlas();true');time.sleep(.5)
results['economy']=sample('economy',8)
call('$("#economy").checked=false;$("#motion").checked=true;renderAtlas();true');time.sleep(.5)
results['reduced']=sample('reduced',4)
call('$("#motion").checked=false;renderAtlas();true');call(op='hide');time.sleep(.5)
results['minimized']=sample('minimized',4)
call(op='show')
report={'label':label,'measuredAt':__import__('datetime').datetime.now(__import__('datetime').timezone.utc).isoformat(),'hardware':subprocess.check_output(['sysctl','-n','machdep.cpu.brand_string'],text=True).strip(),'os':subprocess.check_output(['sw_vers','-productVersion'],text=True).strip(),'phases':results,'limitations':'Render cadence measures delivered WebGL draws, not GPU duration. CPU is ps OS average; ownHost is OracleAtlasQA only. WebKit helpers are launchd children shared across applications and are recorded separately, never attributed wholesale to Oracle. Mailbox overhead at 10 Hz applies to both runs.'}
path=ROOT/f'docs/benchmarks/organic-{label}.json';path.write_text(json.dumps(report,indent=2)+'\n');print(path)
