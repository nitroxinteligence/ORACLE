#!/bin/bash
# Default is read-only preflight. --execute explicitly opts into Developer ID signing
# and Apple notarization network submissions; never run it for synthetic audit tests.
set -euo pipefail
cd "$(dirname "$0")/.."
ROOT="$PWD"
export PATH="${HOME}/.bun/bin:/opt/homebrew/bin:/usr/local/bin:/usr/bin:/bin:/usr/sbin:/sbin:$PATH"
EXECUTE=false; PREFLIGHT=false
while [ "$#" -gt 0 ]; do
  case "$1" in
    --execute) if "$EXECUTE"; then echo 'Duplicate --execute is invalid.' >&2; exit 2; fi; EXECUTE=true; shift ;;
    --preflight) PREFLIGHT=true; shift ;;
    --help|-h) echo 'Usage: scripts/release.sh [--preflight] | --execute'; echo 'Requires clean committed sources and explicit ORACLE_SIGN_IDENTITY, ORACLE_NOTARY_PROFILE, ORACLE_APP_ENTITLEMENTS.'; exit 0 ;;
    *) printf 'Unknown release option: %s\n' "$1" >&2; exit 2 ;;
  esac
done
if "$EXECUTE" && "$PREFLIGHT"; then echo '--execute and --preflight are mutually exclusive; no release action was performed.' >&2; exit 2; fi
python3 scripts/build-manifest.py preflight --channel release
if ! "$EXECUTE"; then echo 'Preflight passed; no signature, credential access, upload, package or installation was performed.'; exit 0; fi

python3 scripts/build-manifest.py validate-output --output "$ROOT/.work/release-output/Oracle.app" >/dev/null
mkdir -p .work
LOCK="$ROOT/.work/release.lock"
mkdir "$LOCK" 2>/dev/null || { echo 'A release lock exists; another release may still be running. Do not issue a second release concurrently.' >&2; exit 1; }
trap 'rmdir "$LOCK" 2>/dev/null || true' EXIT
RUN=$(mktemp -d "$ROOT/.work/release-evidence.XXXXXX")
chmod 700 "$RUN"
python3 scripts/build-manifest.py snapshot --output "$RUN/sources.json"
bash scripts/build.sh --channel release
APP="$ROOT/.work/build/release/Oracle.app"
python3 scripts/build-manifest.py verify --channel release --app "$APP" > "$RUN/manifest.json"
python3 scripts/build-manifest.py verify-signature --channel release --app "$APP" > "$RUN/app-signatures.json"

accepted_id() {
  python3 - "$1" <<'PY'
import json,sys,uuid
record=json.load(open(sys.argv[1]))
if record.get('status')!='Accepted': raise SystemExit('Notarization was not accepted; nothing will be published.')
value=record.get('id',''); uuid.UUID(value); print(value)
PY
}
check_notary_log() {
  python3 - "$1" <<'PY'
import json,sys
record=json.load(open(sys.argv[1]))
if record.get('status')!='Accepted' or any(row.get('severity')=='error' for row in record.get('issues') or []):
    raise SystemExit('Notarization log contains errors; publication blocked.')
print('Notarization log inspected; warnings:',sum(row.get('severity')=='warning' for row in record.get('issues') or []))
PY
}

ditto -c -k --keepParent "$APP" "$RUN/Oracle.zip"
xcrun notarytool submit "$RUN/Oracle.zip" --keychain-profile "$ORACLE_NOTARY_PROFILE" --wait --output-format json > "$RUN/app-notary.json"
APP_SUBMISSION=$(accepted_id "$RUN/app-notary.json")
xcrun notarytool log "$APP_SUBMISSION" --keychain-profile "$ORACLE_NOTARY_PROFILE" "$RUN/app-notary-log.json"
check_notary_log "$RUN/app-notary-log.json"
xcrun stapler staple "$APP" > "$RUN/app-staple.log" 2>&1
xcrun stapler validate "$APP" > "$RUN/app-staple-validation.log" 2>&1
python3 scripts/build-manifest.py verify --channel release --app "$APP" >/dev/null
python3 scripts/build-manifest.py verify-signature --channel release --app "$APP" >/dev/null
spctl --assess --type execute --verbose=4 "$APP" > "$RUN/app-gatekeeper.log" 2>&1
bash scripts/package.sh --channel release --app "$APP" --output-dir "$RUN/container"
IMAGE=$(python3 - "$RUN/container" <<'PY'
from pathlib import Path
import sys
values=list(Path(sys.argv[1]).glob('Oracle-*-release-arm64.dmg'))
if len(values)!=1: raise SystemExit('Expected one release candidate disk image')
print(values[0])
PY
)
codesign --force --sign "$ORACLE_SIGN_IDENTITY" --timestamp "$IMAGE"
python3 scripts/build-manifest.py verify-signature --channel release --app "$IMAGE" > "$RUN/container-signatures.json"
xcrun notarytool submit "$IMAGE" --keychain-profile "$ORACLE_NOTARY_PROFILE" --wait --output-format json > "$RUN/container-notary.json"
IMAGE_SUBMISSION=$(accepted_id "$RUN/container-notary.json")
xcrun notarytool log "$IMAGE_SUBMISSION" --keychain-profile "$ORACLE_NOTARY_PROFILE" "$RUN/container-notary-log.json"
check_notary_log "$RUN/container-notary-log.json"
xcrun stapler staple "$IMAGE" > "$RUN/container-staple.log" 2>&1
xcrun stapler validate "$IMAGE" > "$RUN/container-staple-validation.log" 2>&1
python3 scripts/build-manifest.py verify-signature --channel release --app "$IMAGE" >/dev/null
hdiutil verify "$IMAGE" > "$RUN/container-integrity.log" 2>&1
spctl --assess --type open --context context:primary-signature --verbose=4 "$IMAGE" > "$RUN/container-gatekeeper.log" 2>&1
python3 scripts/build-manifest.py check-source --source-record "$RUN/sources.json"

# Only fully accepted, stapled and verified artifacts are copied to dist. No install,
# launch, GitHub push or remote publication is performed by this script.
python3 - "$ROOT" "$RUN" "$IMAGE" <<'PY'
import hashlib,json,os,shutil,sys,tempfile
from pathlib import Path
root,run,image=map(Path,sys.argv[1:])
out=root/'dist'
if out.is_symlink() or out.resolve()!=out: raise SystemExit('Refusing a redirected distribution directory')
out.mkdir(exist_ok=True)
manifest=json.loads((run/'manifest.json').read_text())
name=image.stem
destination=out/name
if destination.exists() or destination.is_symlink(): raise SystemExit('Release already exists; refusing to overwrite it')
staging=Path(tempfile.mkdtemp(prefix='.publish-',dir=out))
try:
    shutil.copy2(image,staging/image.name)
    h=hashlib.sha256()
    with (staging/image.name).open('rb') as handle:
        for chunk in iter(lambda:handle.read(1024*1024),b''): h.update(chunk)
    digest=h.hexdigest()
    (staging/(image.name+'.sha256')).write_text(digest+'  '+image.name+'\n')
    report={'schemaVersion':1,'version':manifest['version'],'commit':manifest['commit'],'buildID':manifest['buildID'],
            'sourceHash':manifest['sourceHash'],'channel':'release','artifact':image.name,'sha256':digest,
            'appNotarizationID':json.loads((run/'app-notary.json').read_text())['id'],
            'containerNotarizationID':json.loads((run/'container-notary.json').read_text())['id'],
            'notarizationAccepted':True,'appStapled':True,'containerStapled':True,'signaturesVerified':True,
            'gatekeeperAssessmentsPassed':True,'physicalOfflineLaunchVerified':False,'secondMacBindingVerified':False,
            'supportedTarget':{'architecture':'arm64','minimumMacOS':'13.0'},'installed':False,'uploadedToGitHub':False}
    (staging/'release-report.json').write_text(json.dumps(report,indent=2)+'\n')
    os.replace(staging,destination)
finally:
    if staging.exists(): shutil.rmtree(staging)
print('Verified distribution prepared locally:',destination)
print('Physical offline/quarantine and second-Mac activation tests remain mandatory before pilot distribution.')
PY
