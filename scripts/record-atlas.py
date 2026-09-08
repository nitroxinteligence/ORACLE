#!/usr/bin/env python3
"""Record the QA app's own window. Keep capture overhead out of benchmark runs."""
import importlib.util
import json
from pathlib import Path
import subprocess
import sys
import time

sys.dont_write_bytecode = True
root = Path(__file__).resolve().parent.parent
spec = importlib.util.spec_from_file_location('qa', root / 'scripts/atlas-qa.py')
qa = importlib.util.module_from_spec(spec); spec.loader.exec_module(qa)
label = sys.argv[1]
assert label in ['before', 'after']
pids = subprocess.check_output(['pgrep', '-x', 'OracleAtlasQA'], text=True).split()
assert len(pids) == 1, 'Exactly one isolated QA process is required'
windows = json.loads(subprocess.check_output(['swift', str(root / 'scripts/atlas-window.swift'), pids[0]], text=True))
assert len(windows) == 1, 'The QA window must be visible'
destination = root / f'.work/atlas-{label}.mov'
capture = subprocess.Popen(['screencapture', '-x', '-l' + str(windows[0]['kCGWindowNumber']), '-v', '-V18', str(destination)])
time.sleep(.8)
qa.call(f"window.qaDemoVariant='{label}';true")
qa.call((root / 'scripts/atlas-demo.js').read_text())
assert capture.wait(timeout=30) == 0
print(destination)
