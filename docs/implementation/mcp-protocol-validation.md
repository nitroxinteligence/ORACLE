# MCP protocol validation — 2026-09-11

## Result and scope

The real stdio protocol suite passes **68 assertions, 0 failures in each of
two independent fresh, synthetic, network-denied PGLite profiles**. Each run
made 49 SDK tool calls; together they are 136 assertion executions, not 136
distinct assertions. This is an actual
`@modelcontextprotocol/sdk` client connected to the compiled Oracle adapter,
not a direct `dispatchToolCall` unit test or a CLI-only smoke test.

Worktree: `/Users/mateusmpz/code/Projetos - Mateus M/ORACLE/.work/worktrees/audit-full-20260910`.
Branch: `codex/oracle-audit-full-20260910`; baseline HEAD:
`f14382479cb769f8b57cf5d38db27acf0947a243`.

GBrain: official `0.48.4.0`, source commit
`2efaaf8f8a817b5b82e023383618fdcdb1cc5f7d`; MCP SDK: **1.29.0** from the pinned
vendor dependency. Installed Bun: **1.3.8**, below upstream's declared
`>=1.3.10`. These results are developer validation, not release-toolchain
qualification. No runtime or dependency was installed or upgraded.

The worker changed only `scripts/test-mcp-offline.py`,
`scripts/test-mcp-offline.ts`, `packages/gbrain-adapter/mcp.ts`, and this document,
plus private fixtures/builds/logs under `.work/mcp-protocol`. No staging,
commit, merge, push, installation, shared engine replacement, or interaction
with Oracle Audit Onboarding was performed. `scope.ts`, `freshness.ts`, the
official vendor, shared dependencies, and catalog packs were not edited.

## Reproduce

Run from the worktree above. The command below produced the first successful
driver log; use a different driver-log name to retain separate executions.
The Python harness creates a new UUID fixture on every run.

```sh
set -e
set -o pipefail
BASE="$PWD/.work/mcp-protocol"
test ! -L "$BASE"
mkdir -p "$BASE/launcher/home" "$BASE/launcher/tmp" "$BASE/launcher/profile"
/usr/bin/env -i PATH=/usr/bin:/bin:/usr/sbin:/sbin \
  HOME="$BASE/launcher/home" TMPDIR="$BASE/launcher/tmp" \
  GBRAIN_HOME="$BASE/launcher/profile" \
  ORACLE_TEST_BUN=/Users/mateusmpz/.bun/bin/bun \
  /usr/bin/sandbox-exec -p '(version 1)(allow default)(deny network*)' \
  /usr/bin/python3 -B scripts/test-mcp-offline.py 2>&1 \
  | /usr/bin/tee "$BASE/post-fixes-driver.log"
```

All child commands use the same network-denial policy and an explicit private
`HOME`, `TMPDIR`, and `GBRAIN_HOME`. The socket-denial probe must receive
`EPERM`/`EACCES`; an ordinary connection refusal is not accepted as proof of
the sandbox. The fixture has no credentials or inference provider, uses
official `init --pglite --no-embedding`, and disables update checks/hooks.
No personal vault, real profile/database, Keychain, signer, Codex login, or
global configuration is used.

The harness copies `Resources/engine/gbrain` into the fixture and compiles
`packages/gbrain-adapter/read.ts` only to
`<fixture>/engine/oracle-gbrain-read`. The actual build/client commands, exit
codes, durations, environment scope, source hashes, and output paths are in
`<fixture>/provenance.json` and the two test scripts. Fixture seeding uses the
copied official CLI; the tested MCP operations use `Client.callTool` over
stdio. No mock transport or mock engine substitutes for the protocol.

## Evidence and failure lineage

All paths below are relative to this worktree. Each UUID directory retains
its original evidence; failed evidence has not been overwritten.

| Execution | Fixture under `.work/mcp-protocol/` | Actual result |
| --- | --- | --- |
| Original prepared harness | `run-978486fe881a446aa0ed438aeaa430f3` | Exit 0, **zero protocol assertions**; no adapter binary and no result report. Not a pass. |
| First genuinely executed client | `run-d2b9745f604a462ebb3ce913aa15bf9b` | Exit 1; **5 passed / 1 failed**. DB/file configuration mismatch blocked the first tool write. |
| Expanded adversarial baseline | `run-151d5fb0baff48c58e3390f15fedcee1` | Exit 1; **54 passed / 7 failed**. Reproduced source leaks, ignored write-source override, UTF-8 limit bypass, and stale memory-page content. |
| Corrected adapter and expanded suite | `run-45d4e1260d184abda7158699f5ad7a79` | Exit 0; **68 passed / 0 failed**, all eight sections completed. |
| Independent repeat, unchanged sources | `run-cb0111a6d5954df499d6e0d60965d2d3` | Exit 0; **68 passed / 0 failed**, all eight sections completed; 49 SDK tool calls again. |

Driver logs are respectively `baseline-driver.log`,
`real-baseline-driver.log`, `expanded-before-fixes-driver.log`,
`post-fixes-driver.log`, and `repeat-driver.log`, all under
`.work/mcp-protocol/`. The repeat used the same reproduction command with
`repeat-driver.log` as the tee destination.

For the successful fixture, inspect:

- `mcp-result.json`: 68 named assertions with snapshotted observations;
  `mcp-calls.json`: actual tool responses plus argument sizes/hashes;
  `tool-schemas.json`: the catalog returned by the running SDK server.
- `protocol.log`, `mcp-stderr.log`, `build.log`, `network-denial.log`,
  `source-pin.log`, `bun-version.log`, `official-*.log`, and `seed-*.log`:
  command and protocol evidence. `mcp-stderr.log` is empty in the successful run.
- `calls/reader-*-input.json`, `calls/reader-*.log`,
  `calls/official-*-args.json`, and `calls/official-*.log`: independent UI-style
  database access, reindexing, and the keyword-only policy toggles.
- `provenance.json` and `mcp-processes.json`: source/binary provenance and
  process cleanup. The successful run observed **13 owned process groups**,
  all with `residualDetected: false` and `remaining: false`. MCP server PIDs
  **28393** and **28425** were both stopped; the first shutdown snapshot
  contains only the first PID. No database lock file was deleted by the tests.

The first successful build had:

```text
packages/gbrain-adapter/mcp.ts
00e0dd0a9d72f5deafa3eb4bf9d1e5c9361014d7644053e305ac92ebb145ebe6
scripts/test-mcp-offline.ts
6de75389e662a6ccdb4604c85a2e1d698d6a122eb144bcc04b0efbfc28680eca
scripts/test-mcp-offline.py
d43d10827f65dc1f1671f1e35c6cbbc9754b098878b5c87017edf70c4202ac3b
engine/oracle-gbrain-read (private compiled binary)
79e0fc9cd1e788ad10c4a2c0fd7811231707a7189b16957822aca9420c590d9c
engine/gbrain (copy of protected Resources engine)
d1a897d8f4d036da81cc9b276b90b2922b0364a2ab097f8b015a137ec044a865
```

`sourceChangedDuringRun` is empty and `resourcesEngineUnchanged` is true.
`.work/mcp-protocol/latest.json` is written only after a successful, stable
execution; it is a pointer to evidence, not a substitute for its checks.

The repeat has the same source and compiled-binary hashes, empty stderr,
8 successful queue admissions / 4 queue-full responses, and 13 clean process
groups. Its two stopped server PIDs are **28830** and **28899**. Final review
at `2026-09-11T03:45:23Z` is recorded in
`.work/mcp-protocol/final-review.json`: both reports have 68 uniquely named
passing assertions and 49 tool calls; current source hashes still match;
the protected engine is unchanged; no recorded server PID or process group
from the fixture runs remains alive. Python AST parsing, owned-file whitespace
checks (including untracked files), and scoped `git diff --check` passed.

## Verified behavior

| Section | Assertions | What the protocol actually exercised |
| --- | ---: | --- |
| Handshake/catalog | 8 | SDK initialization and capabilities; exactly 13 approved tools; pinned `source_id`/`include_content` schema; closed argument schemas; `think` and `submit_agent` unavailable. |
| Canonical writes and memory | 21 | Official `put_page` write-through; server-stamped provenance; required/empty provenance and invalid TTL rejection; literal `remember` with TTL and receipt; canonical fence and `recall` persistence; world/private fact filtering; get-edit-put preservation; idle DB access by an independent process. |
| Source isolation | 9 | A genuinely populated third source; explicit out-of-grant `get_page`, `list_pages`, and `search` rejection; unqualified and `__all__` restrictions; a colliding slug; rejected write-source override without a file side effect. |
| Input/policy limits | 10 | Four traversal/invalid-slug forms; unchanged canonical files; oversized ASCII and multibyte UTF-8 requests; required schema validation; DB keyword-only disable/re-enable and same-connection recovery. |
| Backpressure | 4 | Twelve concurrent real tool calls yielded **8 successful admissions and 4 queue-full rejections**; no other errors; a subsequent real tool and independent DB reader both succeeded. |
| Vault freshness | 8 | Complete reindex; known fresh page/search hit; external canonical edit; stale `get_page` and stale keyword-hit rejection; edit preservation; reindex recovery. |
| Shutdown | 2 | SDK transport shutdown terminated its server; an independent process reopened the DB without lock deletion. |
| Reconnect | 4 | A new SDK/server process; persisted canonical content, original fact ID/provenance, and reindexed vault content survived reconnection. |
| Final cleanup/protocol | 2 | Both server PIDs stopped and zero SDK protocol-parse errors. |
| **Total** | **68** | **0 failed assertions.** |

## Integration findings and narrow fixes

### Trustworthy harness, not a successful no-op

On the installed Bun 1.3.8, separate `--config PATH` tokens allowed the
prepared build/run invocations to exit zero without running the intended
entrypoint. Probes are retained under `.work/mcp-protocol/launcher/` in
`bun-probe.json` and `bun-flag-probe.json`. The harness now uses explicit
`bun build`/`bun run` with `--config=PATH`, requires the private executable,
requires the result artifact and all eight completed sections, validates
assertion counts, and fails on source drift or surviving owned processes.
Transport exceptions are infrastructure failures, never successful negative
tests. PID evidence is snapshotted rather than held as a mutable array.

### Database policy must match the official search implementation

The native setup uses `gbrain config set search.mcp_keyword_only true`
(`Sources/Oracle/GBrain.swift`). The setting is in the DB, not the file-only
endpoint configuration. The pinned `src/core/ops/search.ts` checks
`await engine.getConfig('search.mcp_keyword_only') === 'true'`.

`mcp.ts` now follows that same DB policy after connecting to the explicitly
selected local PGLite database. `explicitEngineConfig()` still selects the
endpoint using the file-only API; it has not been weakened to inherit a
global profile, shell database URL, or remote engine. Turning the DB policy
off rejects a write without creating its Markdown; turning it back on
restores the same SDK connection.

### Federated defaults are not source grants

The pinned `src/core/ops/context.ts` checks an explicit `source_id` against
`auth.allowedSources`. Merely passing `localFederatedSourceIds` limits the
default read set but does not forbid an explicit third source. The old
adapter disclosed the synthetic sentinel via all three tested read tools.

The adapter now passes a **server-owned, fixed local grant** to the official
dispatcher: writes target `oracle-memory`; reads are limited to
`oracle-memory` and `oracle-vault`. `remote: true` retains the upstream
privacy/provenance rules. The empty token/local client descriptor is an
internal scope carrier, **not** an OAuth login, physical-device attestation,
or authentication evidence.

### Closed schemas and byte bounds must be enforced

The official dispatcher's unknown-parameter grace mode warns by default,
even when Oracle advertises `additionalProperties: false`. The baseline
accepted an undeclared `put_page.source_id`, ignored it, and wrote to memory.
The adapter uses the official optional-parameter normalizer, type validator,
and unknown-key detector to reject undeclared arguments before side effects,
preserving upstream required/type-validation priority and the official
`_meta`/`dry_run` allowances.

The input bound now measures `Buffer.byteLength(JSON.stringify(arguments),
'utf8')`, not JavaScript UTF-16 string length. The regression sends a
multibyte request over 500,000 bytes that was below the old character limit.
This is a decoded-arguments bound, not a pre-parse raw-transport frame cap.

### Canonical facts and the Page projection are different write paths

Pinned `src/core/facts/fence-write.ts` writes canonical Markdown and fact
rows without updating the Page body. Consequently, `get_page` serialized
the pre-remember body, including after reconnect. The original seven-failure
run records this directly; the assertions were retained.

Before an **exact `oracle-memory` `get_page`** (explicit or part of the
permitted default read set), the adapter now refreshes an existing Page
projection using the official `resolvePageWriteTarget` and
`importFromContent(..., {noEmbed: true})`. The existing canonical-scope helper
enforces a contained, non-symlink Markdown file and a 2 MB read bound. No
canonical bytes are written by refresh; identity is checked and a concurrent
byte change fails the read. This does not synthesize a page for an absent
slug. Official remote privacy filtering runs afterward, and the actual
get-edit-put test verifies both visible-fact retention and hidden-fact
preservation. `scope.ts` and `freshness.ts` remain unchanged.

## Limits and remaining coverage

This suite does **not** qualify a release built with Bun >=1.3.10, exercise a
production vault/account, test Codex or another client implementation, or
make any physical-device or Keychain claim. Native UI, app packaging/signing,
installer, frontend, and combined-session integration remain with prime.

The 35-second forced deadline, cancellation while an official DB operation
is stuck, kill-during-write recovery, resource exhaustion, and long-duration
contention were not fault-injected. Shutdown used the pinned SDK transport's
close/reap behavior; absence of surviving processes is verified, but the test
does not classify whether SDK shutdown needed a signal.

The 13-tool catalog and deny boundary are checked; this is not full semantic
coverage of `entity`, `context_pack`, `delta`, `forget`, or the graph tools.
Exact source-bound memory reads are covered; fuzzy/alias memory resolution,
all memory search-refresh paths, and concurrent filesystem races are not
claimed as covered. The memory refresh does not replace the vault's existing
stale-derived rejection and complete-reindex protocol.

TTL persistence in this GBrain pin is **UTC date-granular**. The returned
`remember.valid_until` receipt is request-time plus the duration, while
`facts/fence-write.ts` serializes only its date and `recall` returns midnight
UTC for that date. The suite asserts both actual representations; it does
not claim sub-day expiry precision or simulate passage of three days.

## Primary contract references

Runtime expectations were checked against the pinned local files:
`vendor/gbrain/src/mcp/{dispatch,tool-defs,validate-params}.ts`,
`src/core/ops/{pages,search,context}.ts`, `src/core/verbs.ts`,
`src/core/facts/{write-single,fence-write}.ts`, `src/core/import-file.ts`,
`src/core/write-through.ts`, and SDK 1.29.0's
`dist/esm/client/{index,stdio}.js`.

The primary MCP lifecycle reference reviewed was
`https://modelcontextprotocol.io/specification/2025-11-25/basic/lifecycle`.
The tested schema and implementation remain those returned by the pinned
SDK/server, rather than assumptions about a newer upstream release.
