# Data/backend reliability — audit implementation

Scope: worker-4, `codex/oracle-audit-full-20260910`, based on `f143824`. All implementation and synthetic validation stayed in the shared implementation worktree. No commit, staging, push, merge, installation, private vault read, real identity/Keychain access, Codex login, or remote inference was performed by this worker.

## Integration contract

| API | Contract |
| --- | --- |
| `Core.memorySync.start()` | Start asynchronous cached scanning, filesystem observation and bounded local indexing. Call when the authorized configured UI becomes active. |
| `Core.memorySync.stop()` | Stop observation/scheduling and cancel the coordinator's own subprocess through `memory-sync/cancel`. This does not change setup cancellation state. |
| `Core.memorySync.invalidate(reason:)` | Mark the current generation stale immediately and enqueue a debounced scan. Internal editor/setup/catalog/update mutations already emit this signal. |
| `Core.memorySync.status()` | Small in-memory projection. `state` is `current`, `stale`, `partial`, `external` or `unavailable`; includes generations, timestamps, scan/index flags, errors and retry bounds. |
| `Core.snapshot()` | Returns cached `entries`, explicit `scan.complete/issues`, optional `scanError`, and `memorySync`. First load may return a pending empty projection; it does not enumerate synchronously on every UI poll. |
| `Core.selectExternalGBrain(workspace:profile:)` | Validate before mutation. `profile` is the **GBRAIN_HOME parent containing `.gbrain/config.json`**, not the `.gbrain` directory. Omitted profile means that exact workspace must contain the config. There is no implicit global profile fallback. |
| `Core.withVaultWrite { ... }` | Common canonical-vault writer exclusion for editor/updater/setup. Nested calls through this wrapper on the same thread are reentrant; independent operations still conflict without blocking indefinitely. |
| `Core.indexVaultSnapshot(...)` | Caller already owns the named `gbrain` operation lock. Background coordinator provides its own index queue. Setup callers retain the preexisting named-lock convention. |

When revoking or replacing an external selection, remove **both `gbrainWorkspace` and `gbrainProfile`**. Completed internal setup removes both automatically. Normal `gbrainRead` requests ignore an old onboarding cancel marker; only setup requests continue to honor it. Status responses also expose the native `memorySync` projection.

Do not add another directory `flock` around the reentrant vault wrapper. Do not add another named `gbrain` lock inside the setup methods: CLI/native onboarding callers already hold it.

`ORACLE_ENGINE_RESOURCES` is accepted only for an unbundled developer executable or a bundle identifier ending in `.validation`. Distributed bundles ignore this override and use bundled resources plus verified update slots.

## Canonical files and writer safety

`scanSnapshot` distinguishes complete from partial enumeration. An unreadable subtree, oversized Markdown note, resource-value failure or work limit records an explicit issue, preserves readable siblings and forbids authoritative deletion reconciliation. The legacy `scan` API rejects a partial result when a caller requires a complete baseline.

The common writer lock is a nonblocking kernel lock on the selected directory inode. It therefore excludes Oracle writers even when they use different Oracle state directories, without creating a lock file in the user's vault. Editor, catalog, setup and skill update entry points use it. Existing operation locks remain separate for workflow ownership.

`NSFileCoordinator` coordinates individual writes and recovery. Hash comparisons happen inside coordinated writes; an editor proposal is saved as a recoverable draft before lock acquisition. Recovery removes a directory using atomic `rmdir`, not recursive deletion following a racy empty check. File removal uses `unlink`, so a file replaced by a directory cannot turn rollback into recursive deletion of new notes.

These are cooperative filesystem protections, not a claim that arbitrary external applications honor Oracle locks. External content is rechecked before writes and indexing, and canonical notes are never changed by the indexer.

## Pinned engine and profile resolution

The implementation uses the official bundled GBrain **0.48.4.0**, source pin **`2efaaf8f8a817b5b82e023383618fdcdb1cc5f7d`**. No replacement engine, custom SQL schema, auto-migration or model-based extraction was introduced.

Primary API references in the existing pinned source:

- `vendor/gbrain/src/core/config.ts`: `configPath`, `loadConfigFileOnly`, `toEngineConfig`. The adapter explicitly requires `GBRAIN_HOME`; file-only loading avoids environment and workspace `.env` database retargeting.
- `vendor/gbrain/src/core/import-file.ts`: `importFromContent`, `noEmbed`, `sourcePath`, `allowEmptyOverwrite`, `forceRechunk`. The official parser and slug APIs are reused before imports.
- `vendor/gbrain/src/core/engine.ts` and `pglite-engine.ts`: `resolveSlugsByPaths`, `deletePages`, `transaction`, `removeLinksByPagesAndSource`, `addLinksBatch`. The public `Page` projection does not expose `source_path`; the adapter verifies it through the official path resolver instead.
- `vendor/gbrain/src/core/link-extraction.ts`: `extractPageLinks`, `makeResolver`; only explicit local relations are derived.
- The pinned PGLite implementation documents Emscripten's manipulation of `process.exitCode` during teardown. The compiled adapter flushes its response after disconnect and exits with its own final result code.

Subprocesses receive isolated HOME/TMPDIR, explicit profile paths and a minimal environment, never inherited provider credentials or database/proxy settings. External PGLite requires an explicit absolute database path. External PostgreSQL is limited to an explicit loopback URL without endpoint-override query options; **no PostgreSQL connection was made in these tests**. Remote profiles are refused. External databases are read as selected and are not reindexed as Oracle-owned vault sources.

## Complete snapshots, checkpoints and recovery

`oracle-vault-manifest.json` is the last **complete** receipt. `oracle-vault-checkpoint.json` is an independent durable partial record; it cannot replace the complete manifest during an incomplete run.

Before the first upsert, the adapter resolves every supplied canonical identity with official slug/parser APIs, detects path/slug and frontmatter-ID collisions, and checks ownership of existing derived identities. A collision produces a partial receipt with zero upserts. Identical content at different canonical paths remains distinct. A proven owned rename with the same frontmatter ID uses the official `forceRechunk` option to update identity without silently deduplicating to the obsolete path.

All intended managed paths are durably checkpointed before imports; progress is saved every 25 imports and on partial exit. A crash may require at most 24 additional readbacks/replays, not a full loss of progress. Upserts are idempotently revalidated through canonical and indexed hashes and official path mapping.

Deletion and relation replacement happen together in one official transaction, only after a complete scan, independent canonical membership enumeration and hash verification. The canonical membership and hashes are checked again inside the transaction before commit. Failed reconciliation rolls back derived deletion and relations. The complete manifest is atomically replaced only after transaction success. A post-commit receipt failure explicitly reports that reconciliation committed; the next run can rebuild the receipt. Canonical files are never written or deleted by these operations.

`get` refuses a derived vault page whose canonical hash or indexed-content hash no longer matches its complete receipt. Thus a historical complete receipt alone is never proof that an externally edited note is current. Search/list may identify historical candidates while the native state is stale; opening a vault result revalidates its canonical file. Adapter-only status uses `snapshot_verified`, not an unjustified global `current` assertion.

## Work and performance limits

| Work | Bound |
| --- | --- |
| Native scan | 60,000 visible entries; 180,000 visited entries; 15-second budget; 100 reported issues; Markdown up to 2 MB per note. |
| Native scheduling | Debounced filesystem observation; periodic scan every 30 seconds; deep verification every 300 seconds. Hidden/dependency metadata changes are excluded from ordinary note invalidation. |
| UI polling | Reads the cached projection; does not recompute its signature or enumerate files each poll. |
| Automatic indexing | Dedicated queue; default 25-second operation budget and 500 upserts per slice; at most eight resume attempts per generation. Failure remains visible instead of starting an unlimited loop. |
| Setup indexing | One bounded larger slice; default setup caller uses 120 seconds and 5,000 upserts, with a resumable partial result if necessary. |
| Adapter snapshot | At most 60,000 notes, 128 MB aggregate canonical content, 120,000 recovery intents, 100,000 relations and 64 MB relation preparation. |
| Process transport | Input at most 16 MB, stdout at most 4 MB, stderr at most 100 KB; nonblocking concurrent I/O; cancellation and monotonic deadline checks. |
| MCP request queue | At most eight pending requests, 500 KB input per request and a 35-second total request deadline; a stuck disposable adapter exits and requires client reconnection. |

Subprocesses are launched into their own process group before `exec`. Deadline/cancel/normal-exit cleanup closes channels, terminates the group, escalates to `SIGKILL` and reaps the leader. A pathological uninterruptible kernel wait uses a final asynchronous reaper rather than blocking the caller indefinitely; this is not a guarantee of instantaneous termination of a process stuck in kernel I/O or a deliberately detached unrelated session.

## Dynamic catalog and immutable cache

Specialist identifiers are validated lowercase names with bounded alphanumeric, hyphen or underscore segments, not an allowlist of seven legacy names. Plans must still select IDs present in the validated manifest. Catalog and skill-update paths reject portable case/Unicode collisions, traversal, invalid components and checksum mismatches.

Archive cache identity contains the specialist, repository digest and the full immutable commit. A receipt binds repository, commit, byte size and SHA-256; an optional source checksum pin is also enforced. Old collection-only cache names are not reused. Corruption fails closed. Builds refuse read-only output symlinks and do not read a personal vault inventory. Public download code does not write to ORACLE-SKILLS or any upstream repository.

The build publishes the final manifest atomically after validated file writes. It is not a whole-directory atomic deployment mechanism; interrupted build output should be regenerated in a disposable output directory before packaging.

## Reproduce isolated validation

Run from the implementation worktree with an existing Bun installation. `ORACLE_TEST_BUN` must point to the installed executable when Bun is not on PATH. No package installation or global configuration changes are required.

```sh
mkdir -p .work/data-build/Resources/engine .work/data-build/Resources/catalog
cp Resources/engine/gbrain Resources/engine/questions.json \
  Resources/engine/BOOTSTRAP_FOR_AGENTS.md .work/data-build/Resources/engine/
cp Resources/catalog/manifest.json .work/data-build/Resources/catalog/manifest.json
cp -R Resources/updates .work/data-build/Resources/
"$ORACLE_TEST_BUN" build --compile packages/gbrain-adapter/read.ts \
  --outfile .work/data-build/Resources/engine/oracle-gbrain-read
swift build --scratch-path .work/data-build/swift

python3 -B packages/gbrain-adapter/offline-integration.py
/usr/bin/sandbox-exec -p '(version 1)(allow default)(deny network*)' \
  python3 -B scripts/test-catalog-integrity.py

for suite in --self-test --self-test-editor --self-test-updates; do
  ORACLE_ENGINE_RESOURCES="$PWD/.work/data-build/Resources/engine" \
  ORACLE_TEST_ROOT="$PWD/.work/data-build/fixtures" \
  ORACLE_RUN_ENGINE_TESTS=1 \
  /usr/bin/sandbox-exec -p '(version 1)(allow default)(deny network*)' \
    .work/data-build/swift/debug/Oracle \
    --state "$PWD/.work/data-build/cli-state" "$suite" || exit 1
done
```

The Python integration harness itself launches every tested engine subprocess under the network-denying sandbox and explicitly checks that a loopback connection is denied by the kernel. Its fixture engine is the copied bundled binary and its database is a newly initialized isolated PGLite profile. The transaction fault test invokes the real official PGLite transaction and injects a failure after a real derived deletion, then verifies rollback and successful resume.

Evidence lives under `.work/data-build/`: `swift-build.log`, `native-tests.log`, `editor-tests.log`, `update-tests.log`, `offline-integration.log`, `offline-integration-result.json`, `catalog-tests.log`, and `catalog-tests-result.json`. The integration result records the tested engine/adapter SHA-256 values. Generated fixtures are synthetic and remain under the same scratch root.

## Validation boundaries

Verified locally: genuine offline engine initialization/import/query; complete vs partial snapshot semantics; stale get rejection; collision preflight; partial resume; transactional rollback/recovery; owned renames including equivalent slugs/frontmatter IDs; native watcher-to-engine lifecycle for internal/external changes; cancel-marker isolation; process I/O bounds/child cleanup; editor/update recovery; dynamic catalog/cache integrity; and read-only symlink protection.

Not exercised here: a real user's vault or database, a PostgreSQL connection, Keychain identity, signer or activation, Codex authentication, a complete external MCP client session, live public archive download, app installation/distribution on another physical Mac, or power-loss durability on real hardware. The MCP adapter was compiled and its reused engine/profile/freshness primitives were exercised; a full protocol/client compatibility test remains an integration check. None of these unexecuted gates should be described as passed.
