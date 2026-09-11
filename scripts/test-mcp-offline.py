#!/usr/bin/env python3
"""Real offline MCP protocol regression with private binaries and a fresh profile."""
from pathlib import Path
import hashlib
import json
import os
import shutil
import signal
import shlex
import subprocess
import sys
import time
import uuid

ROOT = Path(__file__).resolve().parents[1]
BASE = ROOT / '.work/mcp-protocol'
SANDBOX = ['/usr/bin/sandbox-exec', '-p', '(version 1)(allow default)(deny network*)']


def sha(path):
    h = hashlib.sha256()
    with path.open('rb') as source:
        for block in iter(lambda: source.read(1024 * 1024), b''):
            h.update(block)
    return h.hexdigest()


def main():
    BASE.mkdir(parents=True, exist_ok=True)
    if BASE.resolve() != BASE:
        raise RuntimeError('Refusing a symlinked fixture root')
    fixture = BASE / ('run-' + uuid.uuid4().hex)
    fixture.mkdir(mode=0o700)
    for name in ('engine', 'profile', 'workspace', 'home', 'tmp', 'events', 'calls', 'other-source', 'vault/INBOX/oracle-memory'):
        (fixture / name).mkdir(parents=True)
    (fixture / 'fixture-marker').write_text('oracle-mcp-protocol\n')
    (fixture / 'bunfig.toml').write_text('# Isolated test configuration; no preloads or providers.\n')
    (fixture / 'vault/protocol-note.md').write_text('# Protocol note\n\nOriginal protocol sentinel\n')
    engine = ROOT / 'Resources/engine/gbrain'
    if engine.is_symlink() or not engine.is_file():
        raise RuntimeError('Regular copied official engine required')
    shutil.copy2(engine, fixture / 'engine/gbrain')
    original_engine_hash = sha(engine)
    bun = os.environ.get('ORACLE_TEST_BUN', '/Users/mateusmpz/.bun/bin/bun')
    if not Path(bun).is_file():
        raise RuntimeError('Set ORACLE_TEST_BUN to the installed Bun executable')
    env = {'PATH': '/usr/bin:/bin:/usr/sbin:/sbin', 'HOME': str(fixture / 'home'),
           'TMPDIR': str(fixture / 'tmp'), 'LANG': 'en_US.UTF-8', 'GBRAIN_HOME': str(fixture / 'profile'),
           'GBRAIN_SKIP_UPDATE_CHECK': '1', 'GBRAIN_HOOKS': '0', 'DATABASE_URL': '', 'GBRAIN_DATABASE_URL': '',
           'GIT_CONFIG_NOSYSTEM': '1', 'GIT_OPTIONAL_LOCKS': '0', 'DO_NOT_TRACK': '1',
           'BUN_RUNTIME_TRANSPILER_CACHE_PATH': str(fixture / 'bun-cache'), 'ORACLE_RECEIPT_DIR': str(fixture / 'events')}
    inputs = sorted((ROOT / 'packages/gbrain-adapter').glob('*.ts')) + [ROOT / 'scripts/test-mcp-offline.ts', Path(__file__).resolve()]
    hashes = {str(p.relative_to(ROOT)): sha(p) for p in inputs}
    result = {'fixture': str(fixture), 'sourceHashes': hashes, 'networkDenied': False, 'commands': [], 'processGroups': []}
    def group_alive(pid):
        try:
            os.killpg(pid, 0)
            return True
        except ProcessLookupError:
            return False
    def clean_group(pid):
        observed = group_alive(pid)
        if observed:
            os.killpg(pid, signal.SIGTERM)
            for _ in range(20):
                if not group_alive(pid):
                    break
                time.sleep(0.05)
            if group_alive(pid):
                os.killpg(pid, signal.SIGKILL)
                for _ in range(20):
                    if not group_alive(pid):
                        break
                    time.sleep(0.05)
        row = {'pgid': pid, 'residualDetected': observed, 'remaining': group_alive(pid)}
        result['processGroups'].append(row)
        if row['remaining']:
            raise RuntimeError('Own fixture process group did not stop: ' + str(pid))
    def run(args, name, timeout=90, cwd=None):
        started = time.monotonic()
        row = {'argv': [str(a) for a in args], 'command': shlex.join(str(a) for a in args),
               'cwd': str(cwd or fixture / 'workspace'), 'log': str(fixture / name)}
        result['commands'].append(row)
        with (fixture / name).open('wb') as log:
            process = subprocess.Popen([str(a) for a in args], cwd=cwd or fixture / 'workspace', env=env,
                                       stdin=subprocess.DEVNULL, stdout=log, stderr=subprocess.STDOUT, start_new_session=True)
            try:
                code = process.wait(timeout=timeout)
            except subprocess.TimeoutExpired:
                os.killpg(process.pid, signal.SIGKILL)
                process.wait(timeout=5)
                raise RuntimeError('Timed out own fixture process: ' + name)
            finally:
                row.update(exitCode=process.returncode, seconds=round(time.monotonic() - started, 3))
                clean_group(process.pid)
        print(name + ': exit ' + str(code), flush=True)
        if code:
            print((fixture / name).read_text(errors='replace')[-16000:], flush=True)
            raise RuntimeError('Fixture command failed: ' + name)
    print('MCP_FIXTURE=' + str(fixture), flush=True)
    try:
        run(SANDBOX + [sys.executable, '-c', 'import socket,errno\ntry: socket.socket().connect(("127.0.0.1",9))\nexcept OSError as e: print(e.errno);raise SystemExit(0 if e.errno in (errno.EPERM,errno.EACCES) else 1)\nraise SystemExit(2)'], 'network-denial.log', 10)
        result['networkDenied'] = True
        run(SANDBOX + ['/usr/bin/git', '-C', ROOT / 'vendor/gbrain', 'rev-parse', 'HEAD'], 'source-pin.log', 10)
        result['gbrainSourcePin'] = (fixture / 'source-pin.log').read_text().strip()
        if result['gbrainSourcePin'] != '2efaaf8f8a817b5b82e023383618fdcdb1cc5f7d':
            raise RuntimeError('Unexpected GBrain source pin')
        result['sdkVersion'] = json.loads((ROOT / 'vendor/gbrain/node_modules/@modelcontextprotocol/sdk/package.json').read_text())['version']
        if result['sdkVersion'] != '1.29.0':
            raise RuntimeError('Unexpected MCP SDK version')
        run(SANDBOX + [bun, '--version'], 'bun-version.log', 10)
        result['bunVersion'] = (fixture / 'bun-version.log').read_text().strip()
        result['upstreamBunRequirement'] = json.loads((ROOT / 'vendor/gbrain/package.json').read_text())['engines']['bun']
        # --config takes an optional argument in Bun 1.3.8. With a separate
        # token, Bun may execute the TOML instead of the requested script and
        # return zero without doing any work. Always use --config=PATH.
        bun_flags = ['--no-env-file', '--no-install', '--config=' + str(fixture / 'bunfig.toml')]
        run(SANDBOX + [bun, 'build', *bun_flags, '--compile', '--no-compile-autoload-dotenv', '--no-compile-autoload-bunfig',
                      ROOT / 'packages/gbrain-adapter/read.ts', '--outfile', fixture / 'engine/oracle-gbrain-read'], 'build.log', 180)
        if not (fixture / 'engine/oracle-gbrain-read').is_file() or not os.access(fixture / 'engine/oracle-gbrain-read', os.X_OK):
            raise RuntimeError('Build exited without producing the private adapter executable')
        commands = [('--version',), ('init', '--pglite', '--no-embedding'),
                    ('sources', 'add', 'oracle-vault', '--name', 'Synthetic protocol vault'),
                    ('sources', 'add', 'oracle-memory', '--path', str(fixture / 'vault/INBOX/oracle-memory'), '--name', 'Synthetic memory', '--force'),
                    ('sources', 'add', 'fixture-other', '--path', str(fixture / 'other-source'), '--name', 'Synthetic ungranted source', '--force'),
                    ('config', 'set', 'search.mcp_keyword_only', 'true')]
        for i, args in enumerate(commands):
            run(SANDBOX + [fixture / 'engine/gbrain', *args], 'official-' + str(i) + '.log')
        if '0.48.4.0' not in (fixture / 'official-0.log').read_text():
            raise RuntimeError('Unexpected official engine version')
        (fixture / 'profile/oracle-owned.json').write_text(json.dumps({'owner': 'OracleCompanion', 'schema_version': 1}))
        for slug in ('outside-sentinel', 'protocol-note'):
            content = '---\ntitle: Synthetic ungranted sentinel\ntype: note\n---\n# Synthetic fixture\n\nUNGRANTED_SENTINEL_' + slug + '\n'
            run(SANDBOX + [fixture / 'engine/gbrain', 'call', '--source', 'fixture-other', 'put_page',
                           json.dumps({'slug': slug, 'content': content})], 'seed-' + slug + '.log')
        run(SANDBOX + [bun, 'run', *bun_flags, ROOT / 'scripts/test-mcp-offline.ts', fixture], 'protocol.log', 420)
        report = json.loads((fixture / 'mcp-result.json').read_text())
        if (not report.get('finished') or report.get('completedSections') != ['handshake', 'writes', 'scope', 'limits', 'queue', 'freshness', 'shutdown', 'reconnect']
                or not report.get('checks') or report.get('failure') or report.get('failed') != 0
                or report.get('passed') != len(report['checks']) or report['passed'] < 40):
            raise RuntimeError('Protocol report is missing assertions or reports failures')
        result['protocol'] = {'passed': report['passed'], 'failed': report['failed']}
        print('MCP_COUNTS=' + json.dumps(result['protocol']), flush=True)
    except BaseException as error:
        result['failure'] = str(error)
        raise
    finally:
        result['sourceChangedDuringRun'] = [n for n, h in hashes.items() if sha(ROOT / n) != h]
        result['engineHashes'] = {p.name: sha(p) for p in (fixture / 'engine').iterdir() if p.is_file()}
        result['resourcesEngineUnchanged'] = sha(engine) == original_engine_hash
        if (fixture / 'mcp-result.json').is_file():
            report = json.loads((fixture / 'mcp-result.json').read_text())
            result['protocol'] = {key: report.get(key) for key in ('passed', 'failed', 'finished')}
        (fixture / 'provenance.json').write_text(json.dumps(result, indent=2) + '\n')
        print('MCP_EVIDENCE=' + str(fixture), flush=True)
    if result['sourceChangedDuringRun']:
        raise RuntimeError('Adapter sources changed during execution; result is not a stable revision')
    if not result['resourcesEngineUnchanged']:
        raise RuntimeError('Shared Resources engine changed during execution')
    (BASE / 'latest.json').write_text(json.dumps(result, indent=2) + '\n')


if __name__ == '__main__':
    main()
