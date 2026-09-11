# Worker-3 handoff — native access and distribution

Base `f14382479cb769f8b57cf5d38db27acf0947a243`, branch
`codex/oracle-audit-full-20260910`, worktree `audit-full-20260910` only.
No staging, commits, merge, push, installed-app changes or other-session interaction.

## Results

Latest shared-tree Swift build passed in `.work/native-access-build`, including recent
main/Core/MemorySync integration changes. Native suite: **65 licensing/consent + 67
lifecycle/transport checks passed**. Standalone owner issuer: **13 fixture checks passed**.
Distribution manifest/policy: **27 fixture checks passed**. Total: **172 checks**, plus
shell syntax, Python compilation and `git diff --check` passed. Logs are
`.work/native-access-build/{build,onboarding-test,issuer-test,distribution-test}.log`.
All started tool shell sessions were polled to completion; no worker shell is pending.

The actual GBrain setup/finalization driver is implemented but its phases are explicitly
faked in the onboarding lifecycle tests; Core.applyPlan/journal verification is real with
synthetic vault files. The stdio transport fixture is isolated Python, not Codex. No real
Secure Enclave key, Keychain identity, owner signer, license issuance, Codex login, model,
paid service or global configuration was used in tests.

## Files to include in prime's review/commit

Native modified: `License.swift`, `Onboarding.swift`, `OnboardingTests.swift`,
`OnboardingUIBridge.swift`, `CodexBridge.swift` under `Sources/Oracle`.
Native new: `DeviceIdentity.swift`, `OnboardingConsent.swift`, `OfflineOnboarding.swift`.
Issuer: `scripts/licensing/oracle-license.swift`; existing `scripts/oracle-license` wrapper
is unchanged.

Prime subsequently assigned ORC05/21 build/distribution ownership. Modified:
`scripts/build.sh`, `scripts/package.sh`. New: `scripts/build-manifest.py`,
`scripts/release.sh`, `docs/INSTALL-OFFLINE.txt`.

Dedicated documents: `native-access-integration.md`, `native-access-validation.md`,
`distribution-pipeline.md`, and this handoff in `docs/implementation`.

## Exact integration points

Default onboardingInstall/onboardingResume are local and never call a model. Readback
confirmation changes `waiting_user` to `paused`/`identity_confirmed`, and explicit resume
continues. Native UI status exposes current `review` plus first ephemeral FIFO `request`;
the latter is never persisted. `onboardingDraftUI` changes presentation without mutating
a running plan. Optional execution is only InstallWithCodex/ResumeWithCodex and discovers
the model/effort. See the complete bridge table in `native-access-integration.md`.

Main gates need the provided Core.requireCapability API. Existing main now visibly gates
catalog-source administration and CLI configuration. A legacy profile/UUID is never an
owner license. Keep the installed owner's app/profile unchanged until signed owner
activation and migration are reviewed. Trust keys come from signed bundle Resources only,
not engine overrides or config.

External GBrain selection calls worker-4's
`Core.selectExternalGBrain(workspace:profile:)` after two explicit native selections.
Profile means GBRAIN_HOME containing `.gbrain/config.json`. No global profile inference.
Operation gbrain/setup wrappers coexist with the backend's different reentrant vault lock.

Build output manifest matches prime's `OracleBuildIdentity` reader. Builds require an
explicit developer/release channel; release.sh defaults to preflight. Actual release
execution would require clean committed sources, explicit Developer ID, notary profile
and reviewed `ORACLE_APP_ENTITLEMENTS` (App ID/team/own Keychain group). Only Bun helpers
receive the two JIT exceptions; the native UI does not. Actual signing, notarization,
stapling, image creation and publication were NOT executed here.

The complete shell preflight rerun was blocked by the tool safety layer before execution.
Do not claim it passed. Earlier direct helper preflight verified the exact GBrain pin and
binary-copy hash; wrapper/scanner fixes plus pure policy fixtures are documented separately.

## Remaining gates / communications

Physical second-Mac key binding, Secure Enclave/Keychain signing behavior, reinstall/key
survival, signed quarantined offline first launch, real minimal-Bun-entitlement execution,
Developer ID/notarization and pilot installation remain untested physical/release gates.
No remote hardware attestation, remote revocation or protection against intentionally
forking/rolling back the owner's authoritative offline ledger is claimed.

Early integration messages were delivered through agents. Recent result/distribution
messages repeatedly returned `OWNER_TRANSITION_IN_PROGRESS`; this durable handoff records
their contents without assuming delivery. No code was written outside the owned paths or
the build/distribution ownership explicitly reassigned by prime.
