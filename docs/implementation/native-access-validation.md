# Offline access: evidence and remaining physical gates

## Implemented policy

ORC01/02 uses an individual random `ORACLEINV2` invitation, a signed `ORACLEREQ2`
activation request and an `ORACLE2` response. The request proves possession of its P256
key and carries the invitation. The owner-signed response contains the device public key
and fingerprint, unique request/license IDs, invitation digest, subject and owner-assigned
role. Only permanent responses are accepted. Every production capability decision also
proves possession of the current Secure Enclave key; copying the profile, its old UUID,
license file or a public fingerprint does not supply that private key.

CryptoKit's encrypted enclave key representation is saved in a non-synchronizing,
ThisDeviceOnly Data Protection Keychain entry. It is outside the Oracle profile. An
unavailable or corrupted existing identity is not replaced silently. Unsupported hardware
gets an explicit error; no UUID or software-key fallback exists in production. A correctly
signed application's Keychain entitlements are required. The build pipeline therefore
requires explicitly reviewed native App ID/team/access-group metadata for releases.

ORC04 keeps the issuer exclusively in `scripts/licensing/oracle-license.swift`, invoked
by `scripts/oracle-license`. The application never has the private issuer key, owner ledger
or issuer capability. It can expose catalog/distribution administration only after a
verified signed owner response, not after selecting a vault or editing config.

## Owner issuer operations

No real operation in this section was executed by this worker. The supported interface is:

```text
scripts/oracle-license init --issuer-dir /absolute/private/owner-directory
scripts/oracle-license export-public --issuer-dir /absolute/private/owner-directory
scripts/oracle-license invite --issuer-dir /absolute/private/owner-directory --to 'Student name'
scripts/oracle-license invite --issuer-dir /absolute/private/owner-directory --to 'Owner name' --role owner
scripts/oracle-license issue --issuer-dir /absolute/private/owner-directory --request-file request.txt
```

The directory must be outside the repository, owned by the current user, mode 700;
private key/ledger files must be regular, not symlinks, mode 600. `init` refuses an existing
directory and never replaces an issuer. The tool does not select a default real signer.

Invitations store only their digest in the ledger, with subject and role selected by the
owner. Issuance verifies the request before taking the ledger transaction. File lock,
atomic rename and file/directory synchronization commit consumption before a response is
delivered. A same-key retry, including a regenerated request, retrieves the exact original
response after a restart or failed delivery. Another key receives an explicit consumed
invitation error. An unreadable/corrupt ledger is not recreated to free a used invitation.

Maintain exactly one authoritative active ledger. Offline durable storage cannot prevent
an owner from deliberately forking the ledger or restoring an old backup and issuing
again. Backups require operational reconciliation, not a claim of remote single-use
consensus. The private signer and ledger must never be committed or bundled. A device
replacement policy must be approved explicitly; this implementation does not silently
reset invitations or promise revocation of the previous permanently offline Mac.

## Reproducible isolated tests

From the implementation worktree:

```sh
CLANG_MODULE_CACHE_PATH="$PWD/.work/native-access-build/ModuleCache" \
SWIFT_MODULE_CACHE_PATH="$PWD/.work/native-access-build/ModuleCache" \
swift build --scratch-path .work/native-access-build -j 2

.work/native-access-build/debug/Oracle \
  --state "$PWD/.work/native-access-tests/cli-state" --self-test-onboarding

/usr/bin/swift -module-cache-path "$PWD/.work/native-access-build/ModuleCache" \
  scripts/licensing/oracle-license.swift --self-test \
  --work-root "$PWD/.work/native-access-tests"
```

Observed results: **Swift compilation passed; 65 licensing/consent checks and 67
lifecycle/transport checks passed; 13 separate issuer checks passed.** Logs are
`.work/native-access-build/build.log`, `onboarding-test.log`, and `issuer-test.log`.

The licensing suite covers correct/incorrect signatures, altered payloads, wrong product,
future-issued/nonpermanent responses, removed trust keys, legacy unbound format rejection,
copied-license rejection with a second synthetic key, failure to prove possession,
invitation proof, native student/owner capabilities, forged legacy config and preserved
profile data. Issuer tests exercise reopen/idempotency, another key, unknown invitation,
payload tampering, owner-only role assignment, and failure immediately before/after durable
commit with subsequent exact-response recovery.

Lifecycle tests use actual `Core.applyPlan` and local journal verification in a synthetic
vault, but an explicitly fake GBrain prepare/finish/bridge driver. They cover readback pause,
stale confirmation, phase failure/resume, cancellation, same versus mutated running draft,
tampered/reopened review, explicit local external profile selection, no attach initialization,
and absence of account/model calls during default install/resume.

Protocol tests use documented IDs and payload fields, including resolved events without
turnId, FIFO approvals, request-before-ack, terminal-before-ack, wrong/missing turn, stale
generation/transport, double response, permission scope, validated question answers,
disconnect/failing send and local verification after model completion. A separate Python
stdio process under `.work` tests real transport framing, duplicate/boolean response IDs,
timeout/late response, redacted upstream errors, process exit and restart. That process is
not Codex and has isolated HOME/PATH. No test opens real login/configuration or stores
protocol secrets. Fixture private keys exist in memory only and are never issued for use.

## Not certified by these tests

Physical Secure Enclave key creation/signing, actual Keychain entitlement behavior, update
and reinstall survival, macOS account migration, copied encrypted reference rejection on
a second physical Mac, and a clean quarantined offline first launch still require tests
on the supported signed application and target hardware. The target is macOS 13+ arm64;
this work does not certify Intel or every Secure Enclave configuration.

The request's `keyProtection` label is not remote hardware attestation. The genuine app
enforces the Secure Enclave implementation locally; the owner tool verifies possession of
the request key, not a manufacturer's attestation chain. A modified application under an
adversary's control is outside an invulnerable-DRM claim. No remote revocation, clock service,
periodic authorization or mandatory online installation is promised.

Actual full `NativeOfflineInstallation` GBrain engine execution, bundled release signing,
notarization, stapled tickets and pilot deployment are distinct evidence; fake driver
results must not be described as passing those gates. The owner must review migration and
activate an explicit owner response before any installed legacy application is replaced.

## Primary technical references

Apple CryptoKit SecureEnclave.P256.Signing.PrivateKey:
https://developer.apple.com/documentation/cryptokit/secureenclave/p256/signing/privatekey

Apple DTS, Data Protection Keychain entitlements and error -34018:
https://developer.apple.com/forums/thread/114456

OpenAI app-server protocol, including models, turns and approval/request fields:
https://developers.openai.com/codex/app-server/
