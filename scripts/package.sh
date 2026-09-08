#!/bin/bash
set -euo pipefail
cd "$(dirname "$0")/.."
APP="dist/Oracle.app"
codesign --verify --deep --strict "$APP"
STAGE=$(mktemp -d "$PWD/.work/dmg.XXXXXX")
trap 'rm -rf "$STAGE"' EXIT
ditto "$APP" "$STAGE/Oracle.app"
ln -s /Applications "$STAGE/Applications"
cp docs/INSTALL.txt "$STAGE/LEIA-ME.txt"
hdiutil create -volname "Oracle 0.1.0" -srcfolder "$STAGE" -ov -format UDZO dist/Oracle-0.1.0-arm64.dmg
shasum -a 256 dist/Oracle-0.1.0-arm64.dmg > dist/Oracle-0.1.0-arm64.dmg.sha256
