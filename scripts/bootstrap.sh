#!/bin/bash
set -euo pipefail
cd "$(dirname "$0")/.."
command -v bun >/dev/null
command -v python3 >/dev/null
command -v swift >/dev/null
GBRAIN_REF=2efaaf8f8a817b5b82e023383618fdcdb1cc5f7d
if [ ! -d vendor/gbrain/.git ]; then
  git clone --filter=blob:none https://github.com/garrytan/gbrain.git vendor/gbrain
fi
git -C vendor/gbrain checkout "$GBRAIN_REF"
(cd vendor/gbrain && bun install --frozen-lockfile --ignore-scripts && bun run build)
mkdir -p Resources/engine
cp vendor/gbrain/bin/gbrain Resources/engine/gbrain
cp vendor/gbrain/LICENSE Resources/engine/GBRAIN-LICENSE
cp vendor/gbrain/BOOTSTRAP_FOR_AGENTS.md Resources/engine/BOOTSTRAP_FOR_AGENTS.md
cp vendor/gbrain/templates/bootstrap/questions.json Resources/engine/questions.json
bun build --compile packages/gbrain-adapter/read.ts --outfile Resources/engine/oracle-gbrain-read
bun run build:atlas
bun build packages/contracts/replay.js --target browser --format iife --outfile Resources/web/replay.js
cp node_modules/three/LICENSE Resources/web/THREE-LICENSE.txt
python3 scripts/fetch-catalog.py
python3 scripts/build-catalog.py

python3 scripts/third-party-notices.py
