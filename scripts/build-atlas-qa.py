#!/usr/bin/env python3
"""Build the real macOS app with an isolated, test-only evaluation mailbox.

No production source edits, backend bootstrap, personal installation or vault access.
Usage: python3 scripts/build-atlas-qa.py [web-resource-directory]
"""
import pathlib
import json
import shutil
import subprocess
import sys

root = pathlib.Path(__file__).resolve().parent.parent
work = root / '.work/atlas-qa'
src = work / 'src'
src.mkdir(parents=True, exist_ok=True)
for file in (root / 'Sources/Oracle').glob('*.swift'):
    shutil.copy(file, src / file.name)
main = src / 'main.swift'
text = main.read_text().replace('window.setFrameAutosaveName("OracleUniverse");', '')
default_state = root / '.work/native-fixture/state'
assert json.loads((default_state / 'config.json').read_text()).get('fixture') is True, 'Run make-atlas-fixture.py first'
core_line = 'let core = try Core(home: (argument("--state") ?? validationState).map { URL(fileURLWithPath:$0) })'
assert core_line in text, 'Native Core initialization changed; refuse an unpinned QA profile'
text = text.replace(core_line,
    'let core = try Core(home: argument("--state").map { URL(fileURLWithPath:$0) } ?? URL(fileURLWithPath:' + json.dumps(str(default_state), ensure_ascii=False) + '))')
text = text.replace('window.title = "Oracle"', 'window.title = "Oracle · Atlas Motion QA"')
text = text.replace('        buildMenu()', '        AtlasQA.attach(web, window)\n        buildMenu()', 1)
main.write_text(text)
shutil.copy(root / 'scripts/atlas-qa.swift', src / 'AtlasQA.swift')
app = work / 'Oracle Atlas QA.app/Contents'
(app / 'MacOS').mkdir(parents=True, exist_ok=True)
(app / 'Resources').mkdir(parents=True, exist_ok=True)
subprocess.run(['swiftc', '-O', '-o', str(app / 'MacOS/OracleAtlasQA'), *map(str, src.glob('*.swift'))], check=True)
web = pathlib.Path(sys.argv[1]).resolve() if len(sys.argv) > 1 else root / 'Resources/web'
shutil.rmtree(app / 'Resources/web', ignore_errors=True)
shutil.copytree(web, app / 'Resources/web')
shutil.copytree(root / 'Resources/catalog', app / 'Resources/catalog', dirs_exist_ok=True)
shutil.copytree(root / 'Resources/updates', app / 'Resources/updates', dirs_exist_ok=True)
(app / 'Info.plist').write_text('''<?xml version="1.0" encoding="UTF-8"?>
<!DOCTYPE plist PUBLIC "-//Apple//DTD PLIST 1.0//EN" "http://www.apple.com/DTDs/PropertyList-1.0.dtd">
<plist version="1.0"><dict><key>CFBundleExecutable</key><string>OracleAtlasQA</string>
<key>CFBundleIdentifier</key><string>com.oraclecompanion.atlas-qa</string>
<key>CFBundleName</key><string>Oracle Atlas QA</string>
<key>NSHighResolutionCapable</key><true/></dict></plist>''')
print(app.parent)
