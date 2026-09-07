---
name: oracle-setup
description: Configure the Oracle macOS companion through its deterministic scripts, preserving the selected vault and existing GBrain/Codex installations.
---

# Oracle setup, executed by Codex Desktop

Codex Desktop is the only AI executor. Oracle is a native viewer/configuration surface. Do not start another agent runtime, use subscription tokens as API credentials, enable model inference in GBrain, or bypass hook trust.

## Start from the reviewed plan

The Oracle briefing supplies the absolute app executable and state directory. Read `<state>/setup/plan.json`. Its `confirmed_hash` must match its answers. Editing answers or changing vault requires a new review. An installed package never proves an active agent.

Run the supplied executable using argument arrays or safe shell quoting:

```text
Oracle --state <state> --setup apply
Oracle --state <state> --setup verify
```

`apply` resumes verified work. A collision is an error, not permission to overwrite. To undo only empty folders created by this plan:

```text
Oracle --state <state> --setup rollback
```

Files and nonempty folders are preserved. The state/journal is outside the vault.

## Existing GBrain

If the plan has `attach: true`, do not initialize, migrate, render, or replace the user's existing installation. Oracle's **Consultar memória GBrain** uses the pinned public GBrain library for keyword reads and explicit links. Choose one source. A locked PGLite database is unavailable; never remove its lock or open a second writer. PostgreSQL remains unchanged. Do not configure providers or copy credentials into Oracle.

## New isolated GBrain

Run:

```text
Oracle --state <state> --gbrain prepare
```

This initializes the bundled official GBrain 0.48.4.0 (commit 2efaaf8f8a817b5b82e023383618fdcdb1cc5f7d) in `<state>/gbrain/profile`, records the six confirmed answers using official interview commands, and writes `setup/gbrain-readback.json`.

Have the person review **Configuração → Revisar entrevista oficial** in Oracle. The exact official read-back hash must be confirmed. Do not manufacture that confirmation for a real person's identity. Synthetic test fixtures may exercise the confirmation contract automatically.

After the review:

```text
Oracle --state <state> --gbrain finish
```

The official motor confirms the hash, renders identity in its owned workspace, registers the selected vault as `oracle-vault`, and syncs it without embeddings or model inference. The vault is canonical; do not copy personal identity into the distributed application. Verify reads in Oracle. Rendering/indexing is not full bootstrap success; relay the separate Codex trust and capability status.

## Codex observation

Prepare the reviewed bridge using Oracle's deterministic bridge command when available. Inspect the generated hooks and skill. Install through supported Codex project/plugin surfaces. The person reviews the exact hooks in Codex. Do not edit private databases, trust records, auth files, or enable bypass flags. Never overwrite other hooks or global skill packages.

The receiver keeps only event type, opaque correlation and timestamps. It discards prompts, outputs, arguments, reasoning and transcripts. Hosted tools may not be covered. Stop means turn ended; no event means unknown.

## Finish with evidence

Report separately: structure, identity, index, source read-back, skill/package discovery, hooks received, and unavailable contracts. Include journal paths and the exact continuation for any failed step. Do not claim deployment, publication, complete history access, connected Gmail, or active agents from package presence.
