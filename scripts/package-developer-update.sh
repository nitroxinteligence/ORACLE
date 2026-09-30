#!/bin/bash
# Local updater ZIP preparation only. This never signs with Developer ID,
# notarizes, installs, changes an update feed or publishes to GitHub.
set -euo pipefail
cd "$(dirname "$0")/.."
ROOT="$PWD"
CHANNEL=""; APP=""; PREFLIGHT=false
while [ "$#" -gt 0 ]; do
  case "$1" in
    --channel|--app)
      [ "$#" -ge 2 ] || { echo 'Missing option value.' >&2; exit 2; }
      case "$1" in
        --channel) [ -z "$CHANNEL" ] || { echo 'Duplicate channel.' >&2; exit 2; }; CHANNEL="$2" ;;
        --app) [ -z "$APP" ] || { echo 'Duplicate app.' >&2; exit 2; }; APP="$2" ;;
      esac; shift 2 ;;
    --preflight) PREFLIGHT=true; shift ;;
    --help|-h) echo 'Usage: scripts/package-developer-update.sh --channel developer [--app .work/.../Oracle.app] [--preflight]'; exit 0 ;;
    *) echo 'Unknown developer-update option.' >&2; exit 2 ;;
  esac
done
[ "$CHANNEL" = developer ] || { echo 'Choose --channel developer explicitly; this is not the Apple release pipeline.' >&2; exit 2; }
export PATH="${HOME}/.bun/bin:/opt/homebrew/bin:/usr/local/bin:/usr/bin:/bin:/usr/sbin:/sbin:$PATH"
source "$ROOT/scripts/build-toolchain.sh"
APP=${APP:-"$ROOT/.work/build/developer/Oracle.app"}
APP=$(python3 scripts/build-manifest.py validate-output --output "$APP")
python3 - <<'PY'
import importlib.util
spec=importlib.util.spec_from_file_location('policy','scripts/build-manifest.py'); policy=importlib.util.module_from_spec(spec); spec.loader.exec_module(policy)
if policy.source_snapshot()['dirty'] is not False:
    raise SystemExit('Developer updater publication requires clean committed source; no artifact was prepared.')
PY
python3 scripts/build-manifest.py preflight --channel developer
python3 scripts/build-manifest.py validate-output --output "$ROOT/.work/developer-update.lock" >/dev/null
mkdir "$ROOT/.work/developer-update.lock" 2>/dev/null || { echo 'Another developer update package holds the lock.' >&2; exit 1; }
STAGE=""
cleanup() { if [ -n "$STAGE" ] && [ -d "$STAGE" ]; then rm -rf "$STAGE"; fi; rmdir "$ROOT/.work/developer-update.lock" 2>/dev/null || true; }
trap cleanup EXIT
STAGE=$(mktemp -d "$ROOT/.work/developer-update.XXXXXX")
chmod 700 "$STAGE"
python3 scripts/build-manifest.py snapshot --output "$STAGE/source.json"
python3 scripts/build-manifest.py verify --channel developer --app "$APP" > "$STAGE/manifest.json"
python3 scripts/build-manifest.py verify-signature --channel developer --app "$APP" > "$STAGE/signatures.json"
python3 - "$APP" "$STAGE" "$PREFLIGHT" <<'PY'
import ctypes,errno,hashlib,importlib.util,json,os,re,shutil,stat,subprocess,sys,tempfile,zipfile
from pathlib import Path
app,stage=map(Path,sys.argv[1:3]); preflight=sys.argv[3]=='true'; root=Path.cwd()
spec=importlib.util.spec_from_file_location('policy',root/'scripts/build-manifest.py'); policy=importlib.util.module_from_spec(spec); spec.loader.exec_module(policy)
record=json.loads((stage/'source.json').read_text()); manifest=json.loads((stage/'manifest.json').read_text())
def require(condition,message):
    if not condition: raise SystemExit(message)
require(app.name=='Oracle.app' and app.suffix=='.app','Expected a canonical Oracle.app input.')
require(manifest.get('product')=='oracle-macos' and manifest.get('channel')=='developer' and manifest.get('dirty') is False and manifest.get('signing')=='ad-hoc-development','Expected a clean developer ad-hoc manifest.')
require(all(manifest.get(key)==record.get(key) for key in ['commit','sourceHash','sourceFileCount']),'Bundle does not match current committed source.')
require(manifest['version']==json.loads((root/'package.json').read_text())['version']==json.loads((root/'Resources/updates/sources.json').read_text())['oracle_version'],'Application/feed versions disagree.')
require(manifest.get('provenance')==policy.pins(),'Bundle pinned inputs differ from the current provisioned inputs.')
require(manifest['provenance'].get('adapterCompilerSupported') is True,'Updater artifact requires the supported pinned compiler.')
require(re.fullmatch(r'[0-9]+\.[0-9]+\.[0-9]+',manifest['version']) and re.fullmatch(r'[A-Za-z0-9._-]{1,120}',manifest['buildID']),'Unsafe artifact identity.')
def validate_app(path):
    observed=policy.verify_manifest(path,'developer'); require(observed==manifest,'Copied bundle manifest changed.')
    signatures=policy.verify_signature(path,'developer')
    # Developer here means actual ad-hoc signatures, never a relabeled release.
    for executable in [path,path/'Contents/Resources/engine/gbrain',path/'Contents/Resources/engine/oracle-gbrain-read']:
        signature=subprocess.run(['/usr/bin/codesign','-d','--verbose=4',str(executable)],capture_output=True,text=True,check=True,timeout=30)
        require('Signature=adhoc' in signature.stderr.splitlines(),'Developer artifact must contain actual ad-hoc signatures.')
        binary=path/'Contents/MacOS/Oracle' if executable==path else executable
        architecture=subprocess.check_output(['/usr/bin/lipo','-archs',str(binary)],timeout=30).decode().strip()
        require(architecture=='arm64','All app executables must be arm64.')
    files=[p for p in path.rglob('*') if p.is_file()]
    require(len(files)<=5000 and sum(p.stat().st_size for p in files)<=1_000_000_000,'Bundle exceeds current updater file/byte limits.')
    return signatures
validate_app(app)
if preflight:
    require(policy.source_snapshot()==record,'Source changed during developer ZIP preflight.')
    print('Developer ZIP preflight passed; no ZIP, installation or publication performed.'); raise SystemExit(0)
payload=stage/'payload'; payload.mkdir(); copied=payload/'Oracle.app'
subprocess.run(['/usr/bin/ditto',str(app),str(copied)],check=True,timeout=180); validate_app(copied)
name='Oracle-'+manifest['version']+'-macos-arm64.zip'; archive=stage/name
subprocess.run(['/usr/bin/ditto','-c','-k','--keepParent','--norsrc','--noextattr','--noacl',str(copied),str(archive)],check=True,timeout=180)
require(0<archive.stat().st_size<=500_000_000,'ZIP exceeds current updater download limit.')
with zipfile.ZipFile(archive) as zipped:
    entries=zipped.infolist(); require(0<len(entries)<=10000,'ZIP entry count exceeds bounded admission.')
    seen=set(); total=0
    for entry in entries:
        parts=entry.filename.rstrip('/').split('/'); key=entry.filename.rstrip('/').casefold()
        require(parts[0]=='Oracle.app' and all(part and part not in ('.','..') for part in parts) and '\\' not in entry.filename and key not in seen,'Unsafe or colliding ZIP member.')
        seen.add(key); mode=(entry.external_attr>>16)&0xffff
        require(not entry.flag_bits&1 and (stat.S_IFMT(mode) in (0,stat.S_IFREG,stat.S_IFDIR)),'Encrypted, linked or irregular ZIP member.')
        total+=entry.file_size; require(total<=1_000_000_000,'ZIP expands beyond updater limit.')
expanded=stage/'expanded'; expanded.mkdir()
subprocess.run(['/usr/bin/ditto','-x','-k',str(archive),str(expanded)],check=True,timeout=180)
require([p.name for p in expanded.iterdir()]==['Oracle.app'],'ZIP must contain only Oracle.app at top level.')
validate_app(expanded/'Oracle.app')
require(policy.source_snapshot()==record,'Source changed before artifact publication.')
digest=hashlib.sha256(archive.read_bytes()).hexdigest()
dist=root/'dist'; require(not dist.is_symlink() and dist.resolve()==dist,'Redirected dist directory refused.'); dist.mkdir(exist_ok=True)
destination=dist/('Oracle-'+manifest['version']+'-'+manifest['buildID']+'-developer-arm64')
require(not destination.exists() and not destination.is_symlink(),'Artifact destination already exists; never overwrite provenance.')
pending=Path(tempfile.mkdtemp(prefix='.developer-update-',dir=dist))
try:
    shutil.copy2(archive,pending/name); require(policy.digest(pending/name)==digest,'Published ZIP copy changed.')
    (pending/'SHA256SUMS.txt').write_text(digest+'  '+name+'\n')
    report={'schemaVersion':1,'product':'oracle-macos','version':manifest['version'],'buildNumber':manifest['buildNumber'],'commit':manifest['commit'],'sourceHash':manifest['sourceHash'],'buildID':manifest['buildID'],'channel':'developer','signing':'ad-hoc-development','asset':name,'sha256':digest,'bytes':archive.stat().st_size,'sourceClean':True,'manifestVerified':True,'signaturesVerified':True,'extractedBundleVerified':True,'architecture':'arm64','minimumMacOS':'13.0','developerIDSigned':False,'notarizationAccepted':False,'gatekeeperQualified':False,'physicalOfflineLaunchVerified':False,'secondMacBindingVerified':False,'installed':False,'uploadedToGitHub':False,'feedContract':'existing stable GitHub application ZIP; not Apple release qualification'}
    (pending/'developer-update-report.json').write_text(json.dumps(report,indent=2)+'\n')
    require(policy.source_snapshot()==record,'Source changed before final atomic publication.')
    # Darwin RENAME_EXCL atomically refuses even a concurrently created empty
    # destination; ordinary os.replace/rename cannot provide this guarantee.
    libc=ctypes.CDLL('/usr/lib/libSystem.B.dylib',use_errno=True); rename=libc.renamex_np; rename.argtypes=[ctypes.c_char_p,ctypes.c_char_p,ctypes.c_uint]; rename.restype=ctypes.c_int
    if rename(os.fsencode(pending),os.fsencode(destination),4)!=0:
        failure=ctypes.get_errno(); raise OSError(failure,os.strerror(failure))
finally:
    if pending.exists(): shutil.rmtree(pending)
print('Local developer ad-hoc updater package:',destination)
print('Not Developer ID signed, notarized or Gatekeeper qualified. No app installation or GitHub publication performed.')
PY
