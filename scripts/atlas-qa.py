#!/usr/bin/env python3
"""Local mailbox client for the opt-in synthetic macOS test build."""
import json
import fcntl
import os
import pathlib
import sys
import time

ROOT = pathlib.Path(__file__).resolve().parent.parent
MAILBOX = pathlib.Path(os.environ.get('ORACLE_ATLAS_QA_DIR', ROOT / '.work/atlas-qa/mailbox'))

def call(js=None, *, op='eval', name=None, timeout=15, **parameters):
    with (MAILBOX / 'client.lock').open('a') as lock:
        fcntl.flock(lock, fcntl.LOCK_EX)
        return _call_locked(js, op=op, name=name, timeout=timeout, **parameters)

def _call_locked(js=None, *, op='eval', name=None, timeout=15, **parameters):
    response = MAILBOX / 'response.json'
    response.unlink(missing_ok=True)
    temp = MAILBOX / 'request.tmp'
    payload = json.dumps({'op': op, 'js': js, 'name': name, **parameters})
    temp.write_text(payload)
    request = MAILBOX / 'request.json'
    temp.replace(request)
    deadline = time.monotonic() + timeout
    while time.monotonic() < deadline:
        if response.exists():
            result = json.loads(response.read_text())
            if 'error' in result:
                raise RuntimeError(result['error'])
            return result.get('value', result)
        time.sleep(.025)
    # Do not leave a command (especially close) queued for the next launch.
    if request.exists() and request.read_text() == payload:
        request.unlink()
    raise TimeoutError('Native QA did not reply')

if __name__ == '__main__':
    if sys.argv[1] in ('snapshot', 'hide', 'show', 'close'):
        print(json.dumps(call(op=sys.argv[1], name=sys.argv[2] if len(sys.argv) > 2 else None), indent=2))
    else:
        print(json.dumps(call(sys.argv[1]), indent=2, ensure_ascii=False))
