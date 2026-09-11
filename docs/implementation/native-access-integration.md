# Native access/onboarding — integration contract

Worktree: `audit-full-20260910`, base `f14382479cb769f8b57cf5d38db27acf0947a243`.
Owner: worker-3. No main merge, staging, commit, real issuance, installation or publication.

## Native access is authoritative

`Core.requireCapability(.useOracle/.configure/.manageCatalogSource/.manageDistribution)`
validates the bundled issuer signature AND possession of this Mac's Secure Enclave key.
`licenseCapabilities` exposes the resulting booleans for presentation only. `issueLicenses`
is always false in the application. The issuer and its durable ledger are an owner tool,
not application resources.

Main integration: normal data access needs `.useOracle`, onboarding/configuration writes
need `.configure`, catalog source administration needs `.manageCatalogSource`, and actual
distribution administration needs `.manageDistribution`. Apply gates at native entry
points, including CLI mutators; JavaScript/UI flags are not authorization. Native self-tests
invoke isolated dependencies directly, not a production environment-variable bypass.

`config.vault`, `deviceID` UUID, `owner`, old `legacyAccess`, draft fields and completion
records cannot mint permissions. The old method `onboardingLegacyAccess()` now means
verified signed owner access only. Existing profile/vault contents are preserved. Before
replacing the owner's installed application, explicitly review the public trust key and
complete owner activation with a signed owner invitation. Do not install this branch over
the legacy owner profile as an implicit migration or add a permanent bypass to make it work.

Trust keys come only from `Bundle.main/Contents/Resources/licensing/public-keys.json`.
`ORACLE_ENGINE_RESOURCES`, imported configuration and downloaded catalog content cannot
replace them. Keep old public verification keys in reviewed releases when existing
permanent licenses must remain accepted; deleting a trust key would invalidate those
licenses after an app update, not remotely revoke an offline copy.

## Exact UI bridge

| Method | Parameters | Result / behavior |
|---|---|---|
| `onboardingActivationRequest` | `{invitation}` | `{request, deviceID, status:"awaiting_response"}`; explicit enclave key creation, same invitation/device reuses saved request |
| `onboardingActivate` | `{code}` | ORACLE2 permanent device-bound response, `{valid, subject, role, capabilities}` |
| `onboardingStatus` | `{}` | persisted state plus verified projection below; no Codex login required |
| `onboardingChooseVault` | `{}` | native folder picker; cancellation does not change the selection |
| `onboardingChooseBrain` | `{}` | native workspace picker, then explicit local profile picker; `{name, profileName}` or cancellation |
| `onboardingDraft` | `{answers,newVault,attach,catalogCollections,step?,ui?}` | same reviewed inputs may save during a run; mutations are rejected while active |
| `onboardingDraftUI` | `{step?,expanded?,tab?}` | UI-only state, bounded to 2 KB, independent of installation mutations |
| `onboardingPlan` | `{answers,newVault,attach,catalogCollections}` | validated review, including `id`, `plan_hash`, `hash`, `planHash`; no canonical vault path |
| `onboardingInstall` | `{hash}` | confirms the current review and starts LOCAL phases |
| `onboardingConfirmIdentity` | `{hash}` | confirms current GBrain readback only; changes state to `paused`, phase `identity_confirmed` |
| `onboardingResume` | `{}` | LOCAL resume even when an earlier attempt used Codex |
| `onboardingCancel` | `{}` | cancellation marker first; acknowledged phase boundary preserves journal/files |
| `onboardingConnect` | `{}` | explicitly optional Codex connection/login |
| `onboardingCheckConnection` / `onboardingCancelLogin` | `{}` | inspect or cancel the explicitly started login |
| `onboardingOpenCodex` | `{}` | explicitly open the private workspace in Codex |
| `onboardingInstallWithCodex` | `{hash}` | explicit optional model execution; never selected automatically |
| `onboardingResumeWithCodex` | `{}` | explicit optional model continuation |
| `onboardingVerifyCodex` | `{}` | optional discovery of the installed skill in connected Codex |
| `onboardingAnswer` | `{id,generation?,allow?,answers?}` | reply only to first current in-memory request; preserves supported protocol shape |

The status projection includes `licensed`, `role` (`locked`, `student`, `owner`),
`capabilities`, hardware `deviceSupport`, informational `legacyProfilePreserved`,
`review`, optional `readback`, `pendingRequestCount`, and only the first current `request`.
The hardware support field does not certify the signing entitlements or a physical test.
Do not use informational `legacyProfilePreserved` to unlock anything. The absence of
`codexConnected` must not disable plan/install/readback/resume or local completion.

`review` is reconstructed from the durable Core plan, validating its digest, answer hash,
vault and current run ID. It survives UI close/reopen. Editing inputs or selecting a new
vault/external profile invalidates the reviewed run. `request` is never reconstructed from
disk: protocol consent is ephemeral, and reconnect requires fresh requests.

## Local sequencing and locking

`confirmPlan` → `applyPlan` → `prepareGBrain` → `waiting_user` readback → explicit
`confirmGBrain` → `paused` → user `onboardingResume` → `applyPlan`/cached `prepareGBrain`
→ `finishGBrain` → `prepareBridge` → local structure/memory/skill/hash verification
→ `completed`.

Repeated apply/prepare use Core's validated plan/journal/receipts; they do not manufacture
confirmation. Each phase checks cancellation. A failed phase returns `interrupted`, not
success. A reopened controller marks abandoned active work interrupted and never
automatically starts a model, logs in, reconnects globally or repeats paid execution.

Attach mode applies/verifies Oracle structure and prepares a local bridge, but never
initializes, interviews or renders the existing GBrain. It uses
`Core.selectExternalGBrain(workspace:profile:)`. The profile is the GBRAIN_HOME folder
containing `.gbrain/config.json`, not the `.gbrain` folder itself. Both locations are
chosen explicitly; invalid/remote profiles leave the previous selection unchanged.

`NativeOfflineInstallation` holds the existing `setup`/`gbrain` operation locks around
the relevant public calls. Backend `prepareGBrain`/`finishGBrain` additionally hold their
reentrant vault write lock. Do not add a second non-reentrant lock of the same name
inside these functions without coordinating the wrappers.

Local readiness returns `localOnly:true`, `hooksTrusted:false`,
`skillDiscoveredByCodex:false`. Hashes of the local skill/config/hooks prove local receipt
integrity, not approval or discovery by an external Codex process. No tutorial or
first-experience deliverable is created or required.

## Optional protocol execution

Model and effort are chosen from documented `model/list` fields and supported text
models. No fixed model/provider assumption is used. Approval intake requires the active
connection epoch, generation, thread and turn. Requests arriving before turn/start's
response are deferred and bound only to its actual turn. Unknown/missing/stale fields are
rejected, IDs are tombstoned per transport, and pending requests are FIFO.

`serverRequest/resolved` uses actual `threadId` and `requestId` fields; a fabricated
`turnId` requirement is not added. A stale callback from an old connection cannot become
current even if it carries a current thread/turn ID. Completion finalizes once only and
still requires local receipts. Disconnect, cancel, resolved, completed and failed reply
invalidate the corresponding prompts. Commands, reasons, questions, answers and upstream
error text are not persisted in `run.json`.

## Test injection, not a shipped bypass

`OnboardingController(home:bridge:automaticallyReconnect:localDriver:accessCheck:)` accepts
native dependencies. Tests supply an ephemeral Ed25519 issuer, ephemeral P256 device,
real signature-validation closure, and fake local GBrain driver. Nothing selects these
dependencies through UI, environment, profile JSON or a production CLI flag. Production
default always requires a signed license and the nonexportable device key.

Validation and physical limits are recorded in `native-access-validation.md`; distribution
contracts are in `distribution-pipeline.md`.
