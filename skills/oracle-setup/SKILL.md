---
name: oracle-setup
description: Configure the Oracle macOS companion through its deterministic scripts, preserving the selected vault and existing GBrain/Codex installations.
---

# Oracle local setup and optional Codex integration

Oracle performs deterministic setup and resume natively by default, without a Codex account or model. Codex is the only optional AI executor in this integration, and only when explicitly requested. Do not start another agent runtime, use subscription tokens as API credentials, enable model inference in GBrain, or bypass hook trust. No first-experience exercise, training task or post-onboarding demonstration is required or created.

## Start from the reviewed plan

The Oracle briefing supplies the absolute app executable and state directory. Read `<state>/setup/plan.json`. Its `confirmed_hash` must match the full `plan_hash`, including destination and catalog choices. Editing answers or changing vault requires a new review. An installed package never proves an active agent.

Run the supplied executable using argument arrays or safe shell quoting:

```text
Oracle --state <state> --setup apply
Oracle --state <state> --setup verify
```

`apply` resumes verified work. A collision is an error, not permission to overwrite. To undo owned unchanged catalog files and empty folders created by this plan:

```text
Oracle --state <state> --setup rollback
```

User-edited files and nonempty folders are preserved. The state/journal is outside the vault.

## Existing GBrain

If the plan has `attach: true`, do not initialize, migrate, render, or replace the user's existing installation. Oracle's **Consultar memória GBrain** uses the pinned public GBrain library for keyword reads and explicit links. Choose one source. A locked PGLite database is unavailable; never remove its lock or open a second writer. PostgreSQL remains unchanged. Do not configure providers or copy credentials into Oracle.

## New isolated GBrain

Run:

```text
Oracle --state <state> --gbrain prepare
```

This initializes the bundled official GBrain 0.48.4.0 (commit 2efaaf8f8a817b5b82e023383618fdcdb1cc5f7d) in `<state>/gbrain/profile`, records the reviewed answers and timezone when provided using official interview commands, and writes `setup/gbrain-readback.json`.

Have the person review **Configuração → Confirme sua identidade** in Oracle. The exact official read-back hash must be confirmed. Confirmation leaves the app paused; a separate explicit **Retomar localmente** action continues. Do not manufacture either action for a real person. Synthetic test fixtures may exercise this contract automatically. A default resume never starts another model turn.

After the review:

```text
Oracle --state <state> --gbrain finish
```

The official motor confirms the hash, renders identity in its owned workspace, registers the selected vault as `oracle-vault`, and syncs it without embeddings or model inference. The vault is canonical; do not copy personal identity into the distributed application. Verify reads in Oracle. Rendering/indexing is not full bootstrap success; relay the separate Codex trust and capability status.

## Codex observation

Run `Oracle --state <state> --prepare-bridge` after GBrain finish (or in attach mode). Read `<state>/setup/bridge.json`, then open the returned workspace in Codex Desktop. The project contains `.codex/config.toml`, `.codex/hooks.json` and `.agents/skills/oracle-setup/SKILL.md`. Existing GBrain attach mode preserves its connection configuration. Inspect the generated hooks and skill. Install through supported Codex project/plugin surfaces. The person reviews the exact hooks in Codex. Do not edit private databases, trust records, auth files, or enable bypass flags. Never overwrite other hooks or global skill packages.

The receiver keeps only event type, opaque correlation and timestamps. It discards prompts, outputs, arguments, reasoning and transcripts. Hosted tools may not be covered. Stop means turn ended; no event means unknown.

## Finish with evidence

Report separately: structure, identity, index, source read-back, skill/package discovery, hooks received, and unavailable contracts. Include journal paths and the exact continuation for any failed step. Do not claim deployment, publication, complete history access, connected Gmail, or active agents from package presence.

## Canonical memory writes

The isolated MCP exposes official GBrain operations with source visibility checks. It opens and releases the engine for each request; do not keep another PGLite process open. `oracle-memory` writes through to `<vault>/INBOX/oracle-memory`. Before remembering a fact for a new entity, explicitly create its canonical page using `put_page`, then call `remember`. Upstream intentionally keeps facts for unknown pages DB-only; a tool success alone does not prove vault persistence. Verify `get_page` and the resulting canonical path. Use TTL `3d` for transient facts. Retrieve vault notes through source `oracle-vault`; do not write new authoritative knowledge into this derived index. No inference or remote-agent tools are enabled.

## Personal and professional notes

The reviewed plan includes `knowledge_spaces` with the canonical Obsidian paths for Pessoal and Profissional. Setup creates only the missing directories. Existing recognized directories are reused; never relocate, rename, classify, or rewrite the user's existing notes automatically. Earlier confirmed plans remain immutable.

When the user authorizes a new durable note, write personal material in the personal area and work/company/client material in the professional area, under the appropriate real subfolder. Read the plan paths instead of creating competing roots; defaults are `AREAS/pessoal` and `AREAS/profissional`. Ask when the intended area is ambiguous. Preserve provenance and verify the actual Markdown file. Normal vault indexing includes these files; `oracle-vault` remains a derived index, not the canonical write destination. Literal memory capture in `INBOX/oracle-memory` retains its existing receipt and retention contract; do not duplicate an entire conversation into either area.

Oracle visualizes actual folder membership, with at most 50 visible items in a folder page. A circle or animation never proves a memory write or an index update.
