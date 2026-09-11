#!/bin/bash
# Local build + native regression contract. Never starts the distributed app,
# Codex, a personal engine, a package installer or a remote publication.
set -euo pipefail
cd "$(dirname "$0")/.."
ROOT="$(pwd -P)"
BASE="$ROOT/.work/validation-20260911"
for folder in "$ROOT/.work" "$BASE"; do
  test ! -L "$folder" || { printf 'Linked scratch refused: %s\n' "$folder" >&2; exit 2; }
done
mkdir -p "$BASE/home" "$BASE/tmp" "$BASE/clang-cache" "$BASE/resources" "$BASE/native-state"
for resource in engine catalog licensing updates gbrain-method; do
  target="$BASE/resources/$resource"
  if test -e "$target" || test -L "$target"; then
    test -L "$target" && test "$(readlink "$target")" = "$ROOT/Resources/$resource" || { printf 'Unexpected fixture resource: %s\n' "$target" >&2; exit 2; }
  else
    ln -s "$ROOT/Resources/$resource" "$target"
  fi
done
if test -e "$BASE/resources/skills" || test -L "$BASE/resources/skills"; then
  test -L "$BASE/resources/skills" && test "$(readlink "$BASE/resources/skills")" = "$ROOT/skills" || exit 2
else
  ln -s "$ROOT/skills" "$BASE/resources/skills"
fi
export ROOT BASE
/usr/bin/python3 - <<'PY'
import hashlib,json,os
from pathlib import Path
root=Path(os.environ['ROOT']);base=Path(os.environ['BASE'])
files=sorted((root/'Sources/Oracle').glob('*.swift'))+[root/'Package.swift']
hashes={str(p.relative_to(root)):hashlib.sha256(p.read_bytes()).hexdigest() for p in files}
(base/'native-source-hashes.json').write_text(json.dumps(hashes,indent=2)+'\n')
# JSON quoting also safely encodes spaces/quotes in a sandbox path.
policy='(version 1)(allow default)(deny network*)(deny file-write* (require-all (require-not (subpath '+json.dumps(str(base))+')) (require-not (literal "/dev/null"))))'
(base/'native-tests.sb').write_text(policy+'\n')
PY
/usr/bin/sandbox-exec -p '(version 1)(allow default)(deny network*)' /usr/bin/env -i \
  PATH=/usr/bin:/bin:/usr/sbin:/sbin HOME="$BASE/home" CFFIXED_USER_HOME="$BASE/home" TMPDIR="$BASE/tmp" \
  CLANG_MODULE_CACHE_PATH="$BASE/clang-cache" SWIFTPM_MODULECACHE_OVERRIDE="$BASE/clang-cache" \
  /usr/bin/swift build --disable-sandbox --scratch-path "$BASE/swift-prime" -c release > "$BASE/swift-integrated.log" 2>&1
printf 'PASS native Swift release build\n'
APP="$BASE/swift-prime/release/Oracle"
failed=0
for suite in onboarding updates editor core backup maintenance; do
  flag="--self-test-$suite"; test "$suite" != core || flag=--self-test
  if /usr/bin/sandbox-exec -f "$BASE/native-tests.sb" /usr/bin/env -i \
    PATH=/usr/bin:/bin:/usr/sbin:/sbin HOME="$BASE/home" CFFIXED_USER_HOME="$BASE/home" TMPDIR="$BASE/tmp" \
    ORACLE_TEST_ROOT="$BASE/tmp" GBRAIN_HOME="$BASE/unused-gbrain" ORACLE_ENGINE_RESOURCES="$BASE/resources/engine" \
    "$APP" --state "$BASE/native-state" "$flag" > "$BASE/test-$suite.log" 2>&1; then
    printf '0\n' > "$BASE/test-$suite.exit";printf 'PASS native %s\n' "$suite"
  else
    printf '1\n' > "$BASE/test-$suite.exit";printf 'FAIL native %s; inspect its scoped log\n' "$suite" >&2;failed=1
  fi
done
/usr/bin/python3 - <<'PY'
import hashlib,json,os,sys
from pathlib import Path
root=Path(os.environ['ROOT']);base=Path(os.environ['BASE'])
hashes=json.loads((base/'native-source-hashes.json').read_text())
stable=all((root/path).exists() and hashlib.sha256((root/path).read_bytes()).hexdigest()==value for path,value in hashes.items())
stable=stable and {str(p.relative_to(root)) for p in (root/'Sources/Oracle').glob('*.swift')}==set(hashes)-{'Package.swift'}
suites={}
for suite in ['onboarding','updates','editor','core','backup','maintenance']:
    text=(base/f'test-{suite}.log').read_text()
    suites[suite]={'passed':(base/f'test-{suite}.exit').read_text().strip()=='0','checks':sum(line.startswith('PASS ') for line in text.splitlines())}
report={'sourcesUnchangedDuringRun':stable,'suites':suites,'checks':sum(s['checks'] for s in suites.values()),
        'network':'denied','runtimeWrites':'own scratch only','realCodex':False,'personalVault':False,
        'realReleaseQualified':False,'sourceHashes':hashes,'binarySHA256':hashlib.sha256((base/'swift-prime/release/Oracle').read_bytes()).hexdigest()}
(base/'native-result.json').write_text(json.dumps(report,indent=2)+'\n')
print(json.dumps({k:v for k,v in report.items() if k not in ['sourceHashes']},ensure_ascii=False))
if not stable:sys.exit('Sources changed during validation; repeat on the settled working tree')
PY
exit "$failed"
