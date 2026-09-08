#!/bin/bash
set -euo pipefail
cd "$(dirname "$0")/.."
swift build -c release
mkdir -p .work/Oracle.iconset
swift scripts/make-icon.swift .work/Oracle.iconset
iconutil -c icns .work/Oracle.iconset -o Resources/Oracle.icns
APP="dist/Oracle.app"
mkdir -p "$APP/Contents/MacOS" "$APP/Contents/Resources"
cp .build/release/Oracle "$APP/Contents/MacOS/Oracle"
python3 - <<'PYTHON'
import shutil
from pathlib import Path
dest=Path("dist/Oracle.app/Contents/Resources")
shutil.rmtree(dest)
shutil.copytree("Resources",dest)
PYTHON
mkdir -p "$APP/Contents/Resources/skills"
ditto skills/ "$APP/Contents/Resources/skills/"
cat > "$APP/Contents/Info.plist" <<'PLIST'
<?xml version="1.0" encoding="UTF-8"?>
<!DOCTYPE plist PUBLIC "-//Apple//DTD PLIST 1.0//EN" "http://www.apple.com/DTDs/PropertyList-1.0.dtd">
<plist version="1.0"><dict>
<key>CFBundleName</key><string>Oracle</string>
<key>CFBundleDisplayName</key><string>Oracle</string>
<key>CFBundleIdentifier</key><string>com.oraclecompanion.macos</string>
<key>CFBundleVersion</key><string>1</string>
<key>CFBundleShortVersionString</key><string>0.1.0</string>
<key>CFBundleExecutable</key><string>Oracle</string>
<key>CFBundlePackageType</key><string>APPL</string>
<key>CFBundleIconFile</key><string>Oracle</string>
<key>LSMinimumSystemVersion</key><string>13.0</string>
<key>NSHighResolutionCapable</key><true/>
<key>NSPrincipalClass</key><string>NSApplication</string>
<key>NSFaceIDUsageDescription</key><string>Desbloquear seu universo no Oracle.</string>
<key>NSDocumentsFolderUsageDescription</key><string>Acessar o vault que você selecionar.</string>
<key>NSDownloadsFolderUsageDescription</key><string>Importar a exportação de conversas que você selecionar.</string>
</dict></plist>
PLIST
codesign --force --sign - "$APP/Contents/Resources/engine/gbrain"
codesign --force --sign - "$APP/Contents/Resources/engine/oracle-gbrain-read"
codesign --force --sign - "$APP"
codesign --verify --deep --strict "$APP"
printf 'App local: %s\n' "$PWD/$APP"
