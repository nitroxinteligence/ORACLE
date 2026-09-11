#!/usr/bin/env python3
"""Copy the already pinned GBrain lexer. No package installation or mutable CDN."""
from pathlib import Path
import hashlib
import json
import shutil

root = Path(__file__).resolve().parents[1]
source = root / 'vendor/gbrain/node_modules/marked'
expected = '18.0.6'
if json.loads((source / 'package.json').read_text())['version'] != expected:
    raise SystemExit('Marked version changed: review the lexer and its regressions before updating the pin.')
destination = root / 'Resources/web/vendor'
destination.mkdir(parents=True, exist_ok=True)
shutil.copyfile(source / 'lib/marked.umd.js', destination / 'marked.js')
shutil.copyfile(source / 'LICENSE', destination / 'MARKED-LICENSE.txt')
(destination / 'manifest.json').write_text(json.dumps({
    'name': 'marked', 'version': expected, 'origin': 'https://github.com/markedjs/marked',
    'sha256': hashlib.sha256((destination / 'marked.js').read_bytes()).hexdigest(),
    'usage': 'Lexer only. Oracle renders a closed tag/attribute allowlist; source HTML and remote images are not enabled.'
}, indent=2) + '\n')
print('Pinned Markdown lexer copied; version ' + expected)
