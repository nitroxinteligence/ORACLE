#!/usr/bin/env python3
"""Real WKWebView iframe, real resources/read HTML, synthetic MCP Apps host/data.
No Oracle Core, real vault or installed Codex state is accessed. Network denied.
"""
from pathlib import Path
import hashlib
import json
import os
import shutil
import signal
import subprocess
import sys
import uuid

ROOT = Path(__file__).resolve().parents[1]

def main():
    if sys.platform != 'darwin':
        raise RuntimeError('This verification requires macOS WKWebView.')
    scratch = ROOT / '.work/desktop-plugin-ui' / uuid.uuid4().hex
    scratch.mkdir(parents=True, mode=0o700)
    for name in ('home', 'tmp', 'cache'):
        (scratch / name).mkdir()
    env = {'PATH': '/usr/bin:/bin:/usr/sbin:/sbin', 'HOME': str(scratch/'home'),
           'CFFIXED_USER_HOME': str(scratch/'home'), 'TMPDIR': str(scratch/'tmp')+'/',
           'CLANG_MODULE_CACHE_PATH': str(scratch/'cache'), 'LC_ALL': 'en_US.UTF-8',
           'ORACLE_DESKTOP_WEB_ROOT': str(ROOT/'Resources/web')}
    account_home = str(Path.home())
    sandbox = '(version 1)(allow default)(deny network*)\n' + f'(deny file-read-data (require-all (subpath {json.dumps(account_home)}) (require-not (subpath {json.dumps(str(ROOT))}))))\n'
    (scratch/'runtime.sb').write_text(sandbox)
    prefix = ['/usr/bin/sandbox-exec', '-f', str(scratch/'runtime.sb')]
    def run(command, name, timeout):
        result = subprocess.run(prefix+list(map(str,command)), cwd=scratch, env=env,
                                capture_output=True, text=True, timeout=timeout)
        (scratch/name).write_text(result.stdout+result.stderr)
        if result.returncode:
            print((result.stdout+result.stderr)[-6000:])
        return result
    node = os.environ.get('ORACLE_TEST_NODE') or shutil.which('node')
    if not node:
        raise RuntimeError('Set ORACLE_TEST_NODE to an existing Node executable.')
    request = {'jsonrpc':'2.0','id':1,'method':'resources/read','params':{'uri':'ui://oracle/workspace'}}
    fetched = subprocess.run(prefix+[node,str(ROOT/'packages/oracle-desktop-plugin/server.mjs')],
                             cwd=scratch, env=env, input=json.dumps(request)+'\n',
                             text=True,capture_output=True,timeout=30)
    (scratch/'resource-stderr.log').write_text(fetched.stderr)
    if fetched.returncode or not fetched.stdout.strip():
        raise RuntimeError('Real resources/read failed: '+fetched.stderr)
    response = json.loads(fetched.stdout)
    if 'error' in response:
        raise RuntimeError('Real resources/read failed: '+str(response.get('error',fetched.stderr)))
    resource = response['result']['contents'][0]
    if resource['mimeType'] != 'text/html;profile=mcp-app':
        raise RuntimeError('Unexpected resource MIME type.')
    html = resource['text']
    (scratch/'resource.html').write_text(html)
    (scratch/'resource.json').write_text(json.dumps({'uri':resource['uri'],'sha256':hashlib.sha256(html.encode()).hexdigest(),'bytes':len(html.encode())},indent=2))
    (scratch/'index.html').write_text('<!doctype html><html><head><meta charset="utf-8"><style>html,body,iframe{margin:0;width:100%;height:100%;border:0;overflow:hidden}</style></head><body><iframe id="oracle" sandbox="allow-scripts allow-same-origin allow-downloads" title="Synthetic Oracle MCP Apps"></iframe></body></html>')
    # Parent JS embeds exactly the server resource, unchanged.
    js=(ROOT/'scripts/fixture-desktop-plugin-ui.js').read_text().replace('__RESOURCE_JSON__',json.dumps(html))
    (scratch/'fixture.js').write_text(js)
    shutil.copy2(ROOT/'scripts/fixture-desktop-plugin-ui.m',scratch/'fixture.m')
    compiled=run(['/usr/bin/clang','-fobjc-arc','-fno-modules','-O0','-g0','-framework','AppKit','-framework','WebKit',scratch/'fixture.m','-o',scratch/'fixture'],'compile.log',45)
    if compiled.returncode:
        return compiled.returncode
    guard=run([sys.executable,'-c',"import socket,sys\ntry: socket.socket().connect(('127.0.0.1',9))\nexcept OSError as e: sys.exit(0 if e.errno in (1,13) else 1)\nsys.exit(2)"],'network-denial.log',10)
    if guard.returncode:
        raise RuntimeError('Network denial was not confirmed.')
    # WebKit helpers may inherit log handles. Wait for our fixture PID, then
    # terminate only its own process group, never unrelated UI processes.
    with (scratch/'native.log').open('w') as log:
        native=subprocess.Popen(prefix+[str(scratch/'fixture'),str(scratch)],cwd=scratch,env=env,stdout=log,stderr=subprocess.STDOUT,start_new_session=True)
        try:
            native.wait(timeout=100)
        finally:
            try: os.killpg(native.pid,signal.SIGKILL)
            except ProcessLookupError: pass
    print((scratch/'native.log').read_text()[-6500:])
    if (scratch/'result.json').exists():
        report=json.loads((scratch/'result.json').read_text())
        report['isolation']={'host':'synthetic MCP Apps parent iframe','actualCodex':False,'realCore':False,'personalVault':False,'network':'denied','websiteData':'nonpersistent','scratch':str(scratch)}
        report['resource']={'sha256':hashlib.sha256(html.encode()).hexdigest(),'bytes':len(html.encode()),'source':'real MCP resources/read'}
        (scratch/'result.json').write_text(json.dumps(report,indent=2,ensure_ascii=False)+'\n')
        print(json.dumps({key:report.get(key) for key in ('passed','failed','fatal')},ensure_ascii=False))
    print('Artifacts: '+str(scratch),flush=True)
    return native.returncode
if __name__ == '__main__':
    sys.exit(main())
