# Sourced by build/package/release. Select a previously provisioned compiler only.
# No installation, download or modification of the operator's global toolchain.
if [ -n "${ORACLE_BUN_BIN:-}" ]; then
  case "$ORACLE_BUN_BIN" in
    /*/bun) ;;
    *) echo 'ORACLE_BUN_BIN must be an absolute path to a binary named bun.' >&2; exit 2 ;;
  esac
  if [ ! -f "$ORACLE_BUN_BIN" ] || [ ! -x "$ORACLE_BUN_BIN" ] || [ -L "$ORACLE_BUN_BIN" ]; then
    echo 'ORACLE_BUN_BIN must be an existing executable regular file, not a symlink.' >&2
    exit 2
  fi
  export PATH="$(dirname "$ORACLE_BUN_BIN"):$PATH"
  hash -r
fi
