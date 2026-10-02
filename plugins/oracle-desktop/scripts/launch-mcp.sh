#!/bin/sh
set -eu
PLUGIN_DIR=$(CDPATH= cd -- "$(dirname -- "$0")/.." && pwd)
case "$(uname -s):$(uname -m)" in
  Darwin:arm64) ;;
  *) echo 'Oracle Desktop requer macOS Apple Silicon; este pacote não suporta Windows ou Linux.' >&2; exit 1 ;;
esac
exec "$PLUGIN_DIR/runtime/bun" "$PLUGIN_DIR/server.mjs" "$@"
