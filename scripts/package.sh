#!/bin/bash
# Packaging is local-only. Release-channel input must already have a stapled app ticket.
set -euo pipefail
cd "$(dirname "$0")/.."
ROOT="$PWD"
export PATH="${HOME}/.bun/bin:/opt/homebrew/bin:/usr/local/bin:/usr/bin:/bin:/usr/sbin:/sbin:$PATH"
CHANNEL=""; APP=""; OUTPUT=""; PREFLIGHT=false
while [ "$#" -gt 0 ]; do
  case "$1" in
    --channel|--app|--output-dir)
      [ "$#" -ge 2 ] || { printf 'Missing value for %s\n' "$1" >&2; exit 2; }
      case "$1" in
        --channel) [ -z "$CHANNEL" ] || { echo 'Duplicate channel' >&2; exit 2; }; CHANNEL="$2";;
        --app) [ -z "$APP" ] || { echo 'Duplicate app' >&2; exit 2; }; APP="$2";;
        --output-dir) [ -z "$OUTPUT" ] || { echo 'Duplicate output directory' >&2; exit 2; }; OUTPUT="$2";;
      esac; shift 2 ;;
    --preflight) PREFLIGHT=true; shift ;;
    --help|-h) echo 'Usage: scripts/package.sh --channel developer|release [--app .work/.../Oracle.app] [--output-dir .work/...] [--preflight]'; exit 0 ;;
    *) printf 'Unknown package option: %s\n' "$1" >&2; exit 2 ;;
  esac
done
case "$CHANNEL" in developer|release) ;; *) echo 'Choose --channel developer or --channel release explicitly.' >&2; exit 2 ;; esac
APP=${APP:-"$ROOT/.work/build/$CHANNEL/Oracle.app"}
OUTPUT=${OUTPUT:-"$ROOT/.work/distribution/$CHANNEL"}
python3 scripts/build-manifest.py preflight --channel "$CHANNEL"
APP=$(python3 scripts/build-manifest.py validate-output --output "$APP")
OUTPUT=$(python3 scripts/build-manifest.py validate-output --output "$OUTPUT")
python3 scripts/build-manifest.py verify --channel "$CHANNEL" --app "$APP"
if "$PREFLIGHT"; then
  echo 'Manifest preflight passed. Actual packaging still requires signature and (release) stapled-ticket validation.'
  exit 0
fi
python3 scripts/build-manifest.py verify-signature --channel "$CHANNEL" --app "$APP"
if [ "$CHANNEL" = release ]; then xcrun stapler validate "$APP"; fi

mkdir -p "$OUTPUT"
LOCK="$OUTPUT/.package.lock"
mkdir "$LOCK" 2>/dev/null || { echo 'Another package operation holds this output directory.' >&2; exit 1; }
STAGE=""; TEMP_IMAGE=""
cleanup() {
  if [ -n "$STAGE" ] && [ -d "$STAGE" ]; then rm -rf "$STAGE"; fi
  if [ -n "$TEMP_IMAGE" ] && [ -f "$TEMP_IMAGE" ]; then rm -f "$TEMP_IMAGE"; fi
  rmdir "$LOCK" 2>/dev/null || true
}
trap cleanup EXIT
STAGE=$(mktemp -d "$ROOT/.work/package-stage.XXXXXX")
NAME=$(python3 - "$APP" "$CHANNEL" <<'PY'
import json,re,sys
from pathlib import Path
m=json.loads((Path(sys.argv[1])/'Contents/Resources/build-manifest.json').read_text())
name='Oracle-'+m['version']+'-'+m['buildID']+'-'+sys.argv[2]+'-arm64.dmg'
if not re.fullmatch(r'[A-Za-z0-9._-]+\.dmg',name): raise SystemExit('Unsafe artifact name')
print(name)
PY
)
DESTINATION="$OUTPUT/$NAME"
[ ! -e "$DESTINATION" ] && [ ! -L "$DESTINATION" ] || { echo 'Artifact already exists; refusing to overwrite its provenance.' >&2; exit 1; }
mkdir "$STAGE/payload"
ditto "$APP" "$STAGE/payload/Oracle.app"
# This link exists only inside the disk-image payload; no /Applications file is changed.
ln -s /Applications "$STAGE/payload/Applications"
python3 - "$APP" "$STAGE/payload/LEIA-ME.txt" <<'PY'
import json,sys
from pathlib import Path
manifest=json.loads((Path(sys.argv[1])/'Contents/Resources/build-manifest.json').read_text())
header='Canal: '+manifest['channel']+' | Versão: '+manifest['version']+'\nBuild: '+manifest['buildID']+'\nCommit: '+manifest['commit']+'\n\n'
Path(sys.argv[2]).write_text(header+Path('docs/INSTALL-OFFLINE.txt').read_text())
PY
python3 scripts/build-manifest.py verify --channel "$CHANNEL" --app "$STAGE/payload/Oracle.app" >/dev/null
python3 scripts/build-manifest.py verify-signature --channel "$CHANNEL" --app "$STAGE/payload/Oracle.app" >/dev/null
if [ "$CHANNEL" = release ]; then xcrun stapler validate "$STAGE/payload/Oracle.app"; fi
TEMP_IMAGE="$OUTPUT/.pending-$NAME"
[ ! -e "$TEMP_IMAGE" ] && [ ! -L "$TEMP_IMAGE" ] || { echo 'Pending image exists; refusing to replace it.' >&2; exit 1; }
hdiutil create -volname "Oracle $CHANNEL" -srcfolder "$STAGE/payload" -format UDZO "$TEMP_IMAGE"
hdiutil verify "$TEMP_IMAGE"
mv "$TEMP_IMAGE" "$DESTINATION"; TEMP_IMAGE=""
shasum -a 256 "$DESTINATION" > "$DESTINATION.sha256"
printf 'Local %s package (not installed): %s\n' "$CHANNEL" "$DESTINATION"
if [ "$CHANNEL" = release ]; then echo 'Container signing/notarization/stapling and final release report remain required; this is not a published release.'; fi
