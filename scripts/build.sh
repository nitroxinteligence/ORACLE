#!/bin/bash
# Explicit local build only. Never invokes bootstrap, installs dependencies or updates /Applications.
set -euo pipefail
cd "$(dirname "$0")/.."
ROOT="$PWD"
export PATH="${HOME}/.bun/bin:/opt/homebrew/bin:/usr/local/bin:/usr/bin:/bin:/usr/sbin:/sbin:$PATH"
CHANNEL=""; PREFLIGHT=false; EXTERNAL_NETWORK_SANDBOX=false
while [ "$#" -gt 0 ]; do
  case "$1" in
    --channel) [ "$#" -ge 2 ] && [ -z "$CHANNEL" ] || { echo 'Missing or duplicate --channel value' >&2; exit 2; }; CHANNEL="$2"; shift 2 ;;
    --preflight) PREFLIGHT=true; shift ;;
    --external-network-sandbox) EXTERNAL_NETWORK_SANDBOX=true; shift ;;
    --help|-h) echo 'Usage: scripts/build.sh --channel developer|release [--preflight] [--external-network-sandbox (developer only)]'; exit 0 ;;
    *) printf 'Unknown build option: %s\n' "$1" >&2; exit 2 ;;
  esac
done
case "$CHANNEL" in developer|release) ;; *) echo 'Choose --channel developer or --channel release explicitly.' >&2; exit 2 ;; esac
SWIFT_SANDBOX_FLAG=""
if "$EXTERNAL_NETWORK_SANDBOX"; then
  [ "$CHANNEL" = developer ] || { echo 'External network sandbox mode is developer-only; release sandbox policy is unchanged.' >&2; exit 2; }
  # Only the nested SwiftPM sandbox is disabled. The externally imposed network
  # boundary must already be effective; a refused connection is not proof.
  python3 -B - <<'NETWORK_PROBE'
import errno
import socket
import sys
try:
    with socket.socket() as probe:
        probe.settimeout(0.5)
        probe.connect(('127.0.0.1', 9))
except OSError as error:
    if error.errno not in (errno.EPERM, errno.EACCES):
        sys.exit('External network sandbox not verified; no build was started.')
else:
    sys.exit('External network sandbox not verified; no build was started.')
print('External kernel network denial verified; SwiftPM nested sandbox only is disabled.')
NETWORK_PROBE
  SWIFT_SANDBOX_FLAG=--disable-sandbox
fi
# This inspection never enumerates Keychain identities or accesses notary credentials.
python3 scripts/build-manifest.py preflight --channel "$CHANNEL"
if "$PREFLIGHT"; then exit 0; fi

python3 scripts/build-manifest.py validate-output --output "$ROOT/.work/build/$CHANNEL/Oracle.app" >/dev/null
mkdir -p .work
LOCK="$ROOT/.work/distribution-build.lock"
mkdir "$LOCK" 2>/dev/null || { echo 'A build lock exists. Verify the other build has stopped before removing it manually.' >&2; exit 1; }
STAGE=""
cleanup() { if [ -n "$STAGE" ] && [ -d "$STAGE" ]; then rm -rf "$STAGE"; fi; rmdir "$LOCK" 2>/dev/null || true; }
trap cleanup EXIT
STAGE=$(mktemp -d "$ROOT/.work/native-build.XXXXXX")
APP="$STAGE/Oracle.app"
export CLANG_MODULE_CACHE_PATH="$STAGE/ModuleCache"
export SWIFT_MODULE_CACHE_PATH="$STAGE/ModuleCache"
export BUN_RUNTIME_TRANSPILER_CACHE_PATH="$STAGE/bun-cache"
export MACOSX_DEPLOYMENT_TARGET=13.0

# All dependencies must already be provisioned from the reviewed pins. vendor is read-only.
python3 scripts/build-manifest.py snapshot --output "$STAGE/generator-inputs.json"
bun run build:atlas
python3 scripts/build-reader.py
bun build packages/contracts/replay.js --target browser --format iife --outfile Resources/web/replay.js
if [ -L Resources/engine/oracle-gbrain-read ]; then echo 'Refusing to rebuild a shared/symlink engine.' >&2; exit 1; fi
bun build --compile --target=bun-darwin-arm64 --no-compile-autoload-dotenv --no-compile-autoload-bunfig \
  packages/gbrain-adapter/read.ts --outfile Resources/engine/oracle-gbrain-read
python3 scripts/package-identity.py
python3 scripts/build-manifest.py check-inputs --source-record "$STAGE/generator-inputs.json"
# Generated tracked resources must be committed before release; a build cannot conceal drift.
python3 scripts/build-manifest.py preflight --channel "$CHANNEL"
python3 scripts/build-manifest.py snapshot --output "$STAGE/sources.json"
swift build ${SWIFT_SANDBOX_FLAG:+--disable-sandbox} -c release --arch arm64 --scratch-path "$ROOT/.work/distribution-swift-$CHANNEL" -j "${ORACLE_BUILD_JOBS:-2}"
BIN=$(swift build ${SWIFT_SANDBOX_FLAG:+--disable-sandbox} -c release --arch arm64 --scratch-path "$ROOT/.work/distribution-swift-$CHANNEL" --show-bin-path)
python3 scripts/build-manifest.py assemble --channel "$CHANNEL" --app "$APP" --source-record "$STAGE/sources.json" --executable "$BIN/Oracle"
for binary in "$APP/Contents/MacOS/Oracle" "$APP/Contents/Resources/engine/gbrain" "$APP/Contents/Resources/engine/oracle-gbrain-read"; do
  [ "$(lipo -archs "$binary")" = arm64 ] || { echo 'Bundle contains a non-arm64 executable.' >&2; exit 1; }
done
python3 scripts/build-manifest.py entitlements --output "$STAGE/bun-entitlements.plist"

# Sign inside-out. Bun alone receives the two JIT exceptions; the native UI receives neither.
for binary in "$APP/Contents/Resources/engine/gbrain" "$APP/Contents/Resources/engine/oracle-gbrain-read"; do
  if [ "$CHANNEL" = release ]; then
    codesign --force --sign "$ORACLE_SIGN_IDENTITY" --options runtime --timestamp --entitlements "$STAGE/bun-entitlements.plist" "$binary"
  else
    codesign --force --sign - --entitlements "$STAGE/bun-entitlements.plist" "$binary"
  fi
done
# Signed engine bytes enter the manifest before the outer bundle seals the manifest itself.
python3 scripts/build-manifest.py create --channel "$CHANNEL" --app "$APP" --source-record "$STAGE/sources.json" > "$STAGE/build-manifest-output.json"
if [ "$CHANNEL" = release ]; then
  python3 scripts/build-manifest.py entitlements --kind app --output "$STAGE/app-entitlements.plist"
  codesign --force --sign "$ORACLE_SIGN_IDENTITY" --options runtime --timestamp --entitlements "$STAGE/app-entitlements.plist" "$APP"
else
  codesign --force --sign - "$APP"
fi
codesign --verify --deep --strict --verbose=2 "$APP"
python3 scripts/build-manifest.py verify-signature --channel "$CHANNEL" --app "$APP" > "$STAGE/signatures.json"
python3 scripts/build-manifest.py verify --channel "$CHANNEL" --app "$APP" > "$STAGE/verified-manifest.json"
python3 scripts/build-manifest.py check-source --source-record "$STAGE/sources.json"
DESTINATION="$ROOT/.work/build/$CHANNEL/Oracle.app"
python3 scripts/build-manifest.py finalize --app "$APP" --destination "$DESTINATION"
printf 'Verified %s build (not installed): %s\n' "$CHANNEL" "$DESTINATION"
if [ "$CHANNEL" = release ]; then echo 'Not yet distributable: notarization and stapled-ticket gates remain required.'; fi
