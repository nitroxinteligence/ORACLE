#!/usr/bin/env python3
"""Build an opt-in native onboarding test window. No personal profile or product bypass."""
import pathlib,json,shutil,subprocess,plistlib
root=pathlib.Path(__file__).resolve().parent.parent
work=root/'.work/onboarding-qa';src=work/'src';src.mkdir(parents=True,exist_ok=True)
state=work/'state';state.mkdir(exist_ok=True)
if not (state/'config.json').exists():(state/'config.json').write_text(json.dumps({'fixture':True}))
assert json.loads((state/'config.json').read_text()).get('fixture') is True
for p in (root/'Sources/Oracle').glob('*.swift'):shutil.copy2(p,src/p.name)
p=src/'main.swift';s=p.read_text().replace('window.setFrameAutosaveName("OracleUniverse");','').replace('        buildMenu()','        AtlasQA.attach(web, window)\n        buildMenu()',1).replace('window.title = "Oracle"','window.title = "Oracle · Onboarding QA"');s=s.replace('NSApp.activate(ignoringOtherApps:true)','if ProcessInfo.processInfo.environment["ORACLE_QA_BACKGROUND"] != "1" { NSApp.activate(ignoringOtherApps:true) }');s=s.replace('window.makeKeyAndOrderFront(nil)','if ProcessInfo.processInfo.environment["ORACLE_QA_BACKGROUND"] != "1" { window.makeKeyAndOrderFront(nil) } else { window.orderBack(nil) }');p.write_text(s)
qa=(root/'scripts/atlas-qa.swift').read_text()
qa=qa.replace('window.level = .floating //', 'window.level = ProcessInfo.processInfo.environment["ORACLE_QA_BACKGROUND"] == "1" ? .normal : .floating //')
(src/'AtlasQA.swift').write_text(qa)
app=work/'Oracle Onboarding QA.app';(app/'Contents/MacOS').mkdir(parents=True,exist_ok=True)
subprocess.run(['swiftc','-O','-o',str(app/'Contents/MacOS/OracleOnboardingQA'),*map(str,src.glob('*.swift'))],check=True)
shutil.copytree(root/'Resources',app/'Contents/Resources',dirs_exist_ok=True)
shutil.copytree(root/'skills',app/'Contents/Resources/skills',dirs_exist_ok=True)
with open(app/'Contents/Info.plist','wb') as f:plistlib.dump({'CFBundleExecutable':'OracleOnboardingQA','CFBundleIdentifier':'com.oraclecompanion.onboarding.validation','CFBundleName':'Oracle Onboarding QA','NSHighResolutionCapable':True,'OracleQAState':str(state)},f)
print(app)
