#!/usr/bin/env python3
"""Bounded real STDIO smoke test. Uses disposable profiles, never personal state."""
import argparse
import json
import os
from pathlib import Path
import queue
import re
import subprocess
import threading
import time

parser = argparse.ArgumentParser()
parser.add_argument('--server', required=True, type=Path)
parser.add_argument('--runtime', default='node', help='Node or bundled Bun executable')
parser.add_argument('--executable', type=Path)
parser.add_argument('--web', type=Path)
parser.add_argument('--state', required=True, type=Path)
args = parser.parse_args()
state = args.state.resolve()
assert '.work' in state.parts, 'Disposable --state must be inside .work'
assert not state.exists(), 'Use a new state directory for every run'
state.mkdir(parents=True)
env = dict(os.environ, ORACLE_DESKTOP_STATE=str(state))
if args.executable:
    env['ORACLE_DESKTOP_EXECUTABLE'] = str(args.executable.resolve())
if args.web:
    env['ORACLE_DESKTOP_WEB_ROOT'] = str(args.web.resolve())
log = (state / 'stderr.log').open('w')
process = subprocess.Popen([args.runtime, str(args.server.resolve())], stdin=subprocess.PIPE,
                           stdout=subprocess.PIPE, stderr=log, text=True, env=env)
responses = queue.Queue()

def read_responses():
    for line in process.stdout:
        try:
            responses.put(json.loads(line))
        except Exception as error:
            responses.put(error)
threading.Thread(target=read_responses, daemon=True).start()
checks = []
sequence = 0

def request(method, params=None):
    global sequence
    sequence += 1
    process.stdin.write(json.dumps({'jsonrpc': '2.0', 'id': sequence,
                                   'method': method, 'params': params or {}}) + '\n')
    process.stdin.flush()
    response = responses.get(timeout=30)
    assert isinstance(response, dict) and response.get('id') == sequence, response
    assert 'result' in response, response
    return response['result']

def dispatch(method, params=None):
    return request('tools/call', {'name': 'oracle_dispatch',
                                'arguments': {'method': method, 'params': params or {}}})

try:
    initialized = request('initialize', {'protocolVersion': '2025-11-25', 'capabilities': {},
                                        'clientInfo': {'name': 'oracle-smoke', 'version': '1'}})
    assert initialized['serverInfo']['title'] == 'Oracle System'
    assert request('initialize', {'protocolVersion': 'unknown'})['protocolVersion'] == '2025-11-25'
    checks.append('initialize and protocol negotiation')
    tools = {tool['name']: tool for tool in request('tools/list')['tools']}
    metadata = tools['oracle_open']['_meta']
    assert metadata['openai/ui']['entrypoints'] == [{'type': 'global'}, {'type': 'thread'}]
    assert tools['oracle_dispatch']['_meta']['ui']['visibility'] == ['app']
    assert request('tools/call', {'name': 'oracle_open'})['structuredContent']['value']['ready']
    checks.append('global/thread entrypoints and app-only dispatch')
    contents = request('resources/read', {'uri': metadata['ui']['resourceUri']})['contents'][0]
    html = contents['text']
    assert contents['mimeType'] == 'text/html;profile=mcp-app'
    assert '<script src=' not in html and '<link rel="stylesheet"' not in html
    assert not re.findall(r'(?:brand|portraits)/[A-Za-z0-9_.-]+\.(?:png|svg|jpg|jpeg|webp|ttf)', html)
    assert 'data:image/png;base64,' in html and 'data:font/ttf;base64,' in html
    assert 'window.OracleBundledAsset(`gallery/metallic-' in html
    for index in range(1, 7):
        assert f'\"gallery/metallic-{index:02d}.webp\":\"data:image/webp;base64,' in html
    assert 'oracle_dispatch' in html and "script-src 'nonce-oracle-desktop-resource'" in html
    checks.append('complete inlined scripts/CSS/font/brand/portrait resource')
    assert dispatch('boot')['structuredContent']['value']['locked'] is False
    assert not dispatch('onboardingStatus').get('isError')
    snapshot = dispatch('snapshot')['structuredContent']['value']
    assert snapshot['entries'] == [] and snapshot['config'] == {}
    denied = dispatch('read', {'path': 'synthetic.md'})
    assert denied['isError'] and 'licença' in denied['content'][0]['text']
    assert not dispatch('onboardingCancel').get('isError')
    checks.append('native boot/onboarding/snapshot/license denial/cancel')
    assert not dispatch('lock').get('isError')
    assert dispatch('boot')['structuredContent']['value']['locked'] is True
    assert dispatch('onboardingStatus')['isError']
    checks.append('shared lock gate')
    # Identify the actual native child while it is alive, then verify EOF reaps it.
    children = subprocess.run(['pgrep', '-P', str(process.pid)], capture_output=True, text=True).stdout.split()
    assert children, 'Native runtime child was not found'
    process.stdin.close()
    process.wait(timeout=10)
    deadline = time.monotonic() + 5
    for child in children:
        while True:
            try:
                os.kill(int(child), 0)
            except ProcessLookupError:
                break
            assert time.monotonic() < deadline, 'Native runtime remained after EOF'
            time.sleep(.05)
    checks.append('EOF shuts down server and leaves no native child')
    # Submit finite queued calls and a draft, then immediately EOF. An unlicensed
    # profile must receive a real refusal, never a synthetic saved acknowledgment.
    eof_state = state / 'immediate-eof'
    eof_env = dict(env, ORACLE_DESKTOP_STATE=str(eof_state))
    immediate = subprocess.Popen([args.runtime, str(args.server.resolve())], stdin=subprocess.PIPE,
                                 stdout=subprocess.PIPE, stderr=log, text=True, env=eof_env)
    calls = [{'jsonrpc': '2.0', 'id': number, 'method': 'tools/call',
              'params': {'name': 'oracle_dispatch', 'arguments': {
                  'method': 'onboardingStatus' if number < 17 else 'saveDraft',
                  'params': {} if number < 17 else {'path': 'synthetic.md', 'hash': '', 'text': 'synthetic draft'}}}}
             for number in range(1, 18)]
    output, _ = immediate.communicate(''.join(json.dumps(call) + '\n' for call in calls), timeout=30)
    replies = {reply['id']: reply['result'] for reply in map(json.loads, output.splitlines())}
    assert len(replies) == len(calls), 'EOF discarded an admitted queued request'
    assert all(not replies[number].get('isError') for number in range(1, 17))
    assert replies[17]['isError'] and 'licença' in replies[17]['content'][0]['text']
    assert not (eof_state / 'drafts').exists(), 'Refused draft was incorrectly persisted'
    checks.append('immediate EOF drains queued native RPCs and returns truthful draft refusal')
    native_path = args.executable.resolve() if args.executable else args.server.resolve().parent / 'runtime/Oracle.app/Contents/MacOS/Oracle'
    direct = subprocess.Popen([str(native_path), '--plugin-server', '--state', str(state / 'direct-eof')],
                              stdin=subprocess.PIPE, stdout=subprocess.PIPE, stderr=log, text=True)
    native_calls = [{'id': str(number), 'method': 'onboardingStatus' if number < 17 else 'saveDraft',
                     'params': {} if number < 17 else {'path': 'synthetic.md', 'hash': '', 'text': 'synthetic draft'}}
                    for number in range(1, 18)]
    output, _ = direct.communicate(''.join(json.dumps(call) + '\n' for call in native_calls), timeout=30)
    direct_replies = {reply['id']: reply for reply in map(json.loads, output.splitlines())}
    assert len(direct_replies) == len(native_calls), 'Native EOF exited before its queue drained'
    assert 'licença' in direct_replies['17']['error']
    checks.append('direct native JSONL immediate EOF drains queue before exit')
    # A closed host output must not turn SIGPIPE/EPIPE into a premature runtime kill.
    disconnected = subprocess.Popen([args.runtime, str(args.server.resolve())], stdin=subprocess.PIPE,
                                    stdout=subprocess.PIPE, stderr=log, text=True,
                                    env=dict(env, ORACLE_DESKTOP_STATE=str(state / 'closed-output')))
    disconnected.stdin.write(json.dumps(calls[0]) + '\n')
    disconnected.stdin.flush()
    assert json.loads(disconnected.stdout.readline())['id'] == 1
    children = subprocess.run(['pgrep', '-P', str(disconnected.pid)], capture_output=True, text=True).stdout.split()
    disconnected.stdout.close()
    disconnected.stdin.write(''.join(json.dumps(call) + '\n' for call in calls[1:]))
    disconnected.stdin.close()
    assert disconnected.wait(timeout=30) == 0, 'Closed host output killed server during drain'
    for child in children:
        try:
            os.kill(int(child), 0)
        except ProcessLookupError:
            continue
        raise AssertionError('Closed host output left an orphan native runtime')
    checks.append('host stdout EPIPE preserves native drain and leaves no orphan')
    source = Path(__file__).resolve().parents[1] / 'Sources/Oracle/DesktopPluginServer.swift'
    if source.exists():
        text = source.read_text()
        assert 'if !app.locked && core.activeLicense() != nil && !recovering {core.memorySync.start()}' in text
        assert 'recoverRuntimeGenerationIfNeeded()' in text
        checks.append('source contract: admitted memory startup and recovery, not a licensed runtime journey')
    (state / 'result.json').write_text(json.dumps({'passed': True, 'checks': checks}, indent=2) + '\n')
    print(json.dumps({'passed': True, 'checks': checks}, indent=2))
finally:
    if process.poll() is None:
        process.terminate()
        try:
            process.wait(timeout=5)
        except subprocess.TimeoutExpired:
            process.kill()
            process.wait()
    log.close()
