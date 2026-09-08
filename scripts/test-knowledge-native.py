#!/usr/bin/env python3
"""Knowledge orbit checks against the public, disposable native QA vault."""
import importlib.util,json,time,shutil
from pathlib import Path
root=Path(__file__).resolve().parent.parent
spec=importlib.util.spec_from_file_location('qa',root/'scripts/atlas-qa.py');qa=importlib.util.module_from_spec(spec);spec.loader.exec_module(qa)
def js(source):return qa.call(source)
def settle():time.sleep(1.1)
checks=[]
def check(name,condition):
 assert js(condition),name
 checks.append(name)
config=json.loads((root/'.work/public-gallery/state/config.json').read_text());vault=Path(config['vault']);assert str(vault).startswith(str(root/'.work/public-gallery/'))
folder=vault/'AREAS/profissional/Paginação QA';assert not folder.exists(),'A prior fixture must be reviewed before rerunning'
folder.mkdir(parents=True)
for i in range(103):(folder/f'Nota QA {i:03}.md').write_text(f'# Nota QA {i}\n\nSomente fixture de paginação.\n')
try:
 qa.call(op='show');js("window.knowledgeErrors=[];window.addEventListener('error',e=>knowledgeErrors.push(e.message));closeModal(true);safe(refresh)();true");time.sleep(.4)
 js("atlasController.select(null);true");settle()
 check('Internal utility connectors absent from solar orbit',"!document.querySelector('[data-orbit-plugin=connector_openai_hotline],[data-orbit-plugin=connector_openai_safety_settings],[data-orbit-plugin=connector_openai_codex_document_control]')")
 check('Knowledge orbit capped at 50 actual items and outside plugins',"document.querySelectorAll('.knowledge-orbit-node').length===50&&atlasController.knowledgeOrbit.points.every(p=>Math.hypot(p.x,p.y)>atlasController.pluginRadius+35)")
 js("atlasController.updatePlugins([...atlasController.data.plugins,{id:'qa-icon-only',name:'Ícone de teste',status:'connected'}]);true")
 check('Missing artwork renders a white orbit icon',"document.querySelector('[data-orbit-plugin=qa-icon-only] svg[stroke=\"#fff\"]')!==null&&document.querySelector('[data-orbit-plugin=qa-icon-only] text')===null")
 js("atlasController.updatePlugins(atlasController.data.plugins);atlasController.selection();document.querySelector('[data-knowledge-path=\"AREAS/pessoal\"]').focus();true")
 check('Focus/hover tooltip identifies the area and note count',"!$('#tooltip').hidden&&$('#tooltip').textContent.includes('Pessoal')&&$('#tooltip').textContent.includes('4 notas')")
 js("atlasController.navigateKnowledge('personal','AREAS/pessoal');true");settle()
 check('Personal area contains only its direct folders and notes',"atlasController.knowledge.path==='AREAS/pessoal'&&atlasController.leaves.size===3&&!atlasController.universe.sun.visible&&atlasController.nodes.size===1")
 js("atlasController.select(atlasController.geometry.nodes[0].id,'AREAS/pessoal/Saúde');true");settle()
 check('Folder selection expands its own contents',"atlasController.knowledge.path==='AREAS/pessoal/Saúde'&&atlasController.leaves.size===2")
 js("atlasController.select(atlasController.geometry.nodes[0].id,'AREAS/pessoal/Saúde/Rotina.md');true");time.sleep(.3)
 check('Note selection opens its real Markdown document',"$('#modal').open&&$('#modal-title').textContent==='Rotina'&&readDocument.relative==='AREAS/pessoal/Saúde/Rotina.md'")
 js('closeModal(true);true');time.sleep(.1);js('atlasController.back();true');settle()
 check('Back returns to the parent personal area',"atlasController.knowledge.path==='AREAS/pessoal'")
 js("atlasController.navigateKnowledge('professional','AREAS/profissional/Paginação QA');true");settle()
 seen=set()
 for page,count in [(0,50),(1,50),(2,3)]:
  if page:js('atlasController.pageGroup(1);true');settle()
  check(f'Knowledge page {page+1} is bounded',f'atlasController.leaves.size==={count}&&atlasController.knowledge.page==={page}')
  seen.update(json.loads(js('JSON.stringify([...atlasController.leaves.keys()])')))
 assert len(seen)==103;checks.append('All 103 real notes reachable across pages')
 js('atlasController.select(null);true');settle()
 check('Back to universe restores sun, specialists, and knowledge rings',"!atlasController.knowledge&&atlasController.universe.sun.visible&&atlasController.nodes.size===7&&getComputedStyle(atlasController.knowledgeLayer).display!=='none'")
 check('No navigation or rendering errors',"knowledgeErrors.length===0&&!atlasController.sceneError&&!atlasController.universe.diagnostics().error")
finally:
 for path in folder.glob('Nota QA *.md'):path.unlink()
 folder.rmdir()
 js('safe(refresh)();true');time.sleep(.4)
qa.call(op='show');js('atlasController.select(null);true');settle();qa.call(op='snapshot',name='knowledge-orbit.png')
js("document.querySelector('[data-knowledge-path=\"AREAS/pessoal\"]').focus();true");qa.call(op='snapshot',name='knowledge-tooltip.png')
js("atlasController.navigateKnowledge('personal','AREAS/pessoal');true");settle();qa.call(op='snapshot',name='knowledge-personal.png')
js("atlasController.navigateKnowledge('professional','AREAS/profissional/Empresa');true");settle();qa.call(op='snapshot',name='knowledge-company.png')
js('atlasController.select(null);true')
report={'checks':checks,'passed':len(checks),'scope':'Native AppKit/WKWebView with disposable public-catalog vault; test notes are synthetic'}
(root/'docs/evidence/skilltree/knowledge-native.json').write_text(json.dumps(report,indent=2)+'\n')
for name in ['knowledge-orbit.png','knowledge-tooltip.png','knowledge-personal.png','knowledge-company.png']:shutil.copy2(root/'.work/atlas-qa/mailbox'/name,root/'docs/evidence/skilltree'/name)
print(json.dumps(report,indent=2))
