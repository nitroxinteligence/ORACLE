# Distribution provenance and release gates — ORC05/21

This work prepares scripts and validates synthetic policy fixtures only. No real Developer
ID identity, issuer key, notary account, upload, disk image, /Applications installation or
GitHub publication was used. The target is **native arm64, macOS 13 or later**. The pipeline
does not certify Intel, physical second-Mac activation or offline first launch.

## Explicit channels

```sh
bash scripts/build.sh --channel developer --preflight
bash scripts/build.sh --channel release --preflight
bash scripts/package.sh --channel developer --preflight
bash scripts/release.sh --preflight
```

Build and package require `--channel developer|release`; omission or a duplicated channel
is rejected. `release.sh` defaults to preflight. Only its explicit `--execute` selects
real Developer ID signing and Apple notarization submissions; `--execute --preflight` is
an error. Do not run the execution path during synthetic validation or this audit handoff.

Preflight inspects repository/files/tools and explicit configuration, without querying
Keychain, discovering signing identities, storing credentials, calling Apple's service,
fetching dependencies or installing the app. Package preflight additionally requires an
existing manifest-valid bundle. Its success alone is not a code-signature or ticket test.

Release requires clean committed source plus these explicit settings:

| Setting | Meaning |
|---|---|
| `ORACLE_SIGN_IDENTITY` | Exact `Developer ID Application: … (TEAMID)` common name selected by the owner |
| `ORACLE_NOTARY_PROFILE` | Existing notarytool credential profile name; the script does not create it or place passwords on the command line |
| `ORACLE_APP_ENTITLEMENTS` | Absolute path to reviewed public native App ID/team/Keychain entitlement plist |
| `ORACLE_PROVISIONING_PROFILE` | Optional absolute public provisioning profile path when the selected App ID/capabilities require one |
| `ORACLE_BUILD_NUMBER` | Optional positive numeric bundle build number; default is committed revision count |

The native entitlement plist must contain exactly `com.apple.application-identifier`,
`com.apple.developer.team-identifier`, and `keychain-access-groups`. The team must match
the signing identity; the App ID prefix is supplied, not inferred; the sole group is the
application's own App ID ending in `.com.oraclecompanion.macos`. The UI receives no JIT,
unsigned-memory, debugger, dynamic-loader or library-validation exceptions. The owner
must verify Apple authorization/provisioning of the chosen entitlements with a real
signed build before rollout. Ad-hoc developer builds are not a hardware-activation test.

Release also refuses an empty `Resources/licensing/public-keys.json`. Public trust keys
must be reviewed and committed without any issuer private material. A clean build is not
permission to overwrite the existing owner's profile or app before owner activation.

## Reproducible inputs and manifests

`build.sh` never calls `bootstrap.sh`, checks out vendor source, installs packages, fetches
catalogs or modifies shared vendor/node_modules/catalog packs. It checks the pinned GBrain
commit `2efaaf8f8a817b5b82e023383618fdcdb1cc5f7d`, version `0.48.4.0`, lexer Marked `18.0.6`,
and the SHA-256 equality of the private copied GBrain binary and already-built vendor binary.
Unknown resource symlinks are rejected. Only the approved `catalog/packs` link can be read
and copied into a real, symlink-free bundle; it is never modified.

The build regenerates atlas/replay, invokes `python3 scripts/build-reader.py`, recompiles
the adapter into a regular private engine file, builds native Swift in a channel-specific
`.work` scratch directory, and generates the approved identity assets. The Bun compiler
disables compiled-executable automatic dotenv/bunfig loading. Missing local prerequisites
fail clearly; no fallback download or installation is started. Minimum deployment target
is macOS 13 and all three bundle executables must report arm64.

Input hashes before and after resource generation detect concurrent source edits while
allowing only the listed generated resources to change. Release checks cleanliness again
after generation. A source snapshot before compilation and a final comparison before
publishing the local bundle prevent mismatched source/commit attribution during concurrent
work. Dirty developer builds are labeled dirty; a developer bundle cannot pass release
manifest verification merely by renaming its directory or image.

`Contents/Resources/build-manifest.json` is small presentation metadata for
`OracleBuildIdentity`: version, build number, commit, sourceHash, dirty flag, unique buildID,
channel, architecture/minimum OS, pin provenance, license policy, native entitlement
fingerprint, and resource inventory filename/hash/count. The complete sorted resource
path/size/SHA-256 inventory is separate in `build-resources.json`, so the UI does not load a
massive file list into its About/status projection.

Both manifest files are inside the final outer code signature. Signed inner-engine bytes
are inventoried **after** inner signing and before the outer bundle is sealed. Manifest
verification rejects missing, extra or changed resources and Info.plist version/channel
drift. Native executable authenticity is verified by codesign, not a self-referential
pre-sign main-executable hash. `verifiedRelease` remains false in build metadata; only
actual signature/ticket checks and the external release report can attest those steps.

Issuer programs, ledgers, credential filenames, complete PEM private keys and unexpected
symlinks are rejected in the bundle. Documentation that merely names a PEM marker is not
a private key. This is a packaging boundary plus inspection policy, not a claim that a
scanner can identify arbitrary renamed random private-key bytes. Always review resources.

## Signing, packaging and publication sequence

Actual developer builds use ad-hoc signatures. Actual release builds sign the two Bun
engines with explicit Developer ID, secure timestamp and hardened runtime; only those
engines receive `allow-jit` and `allow-unsigned-executable-memory`. The native app is signed
last with its reviewed Keychain entitlements and hardened runtime. Signing never uses
`--deep`; verification checks both the app and each engine, expected team, timestamp,
runtime flags and exact entitlements. Bun's broader exception sample is not copied into
the UI or enabled silently. Hardware tests must demonstrate that the minimal policy works
with the selected Bun runtime; failures require review, not weakening the defaults.

Successful builds are moved into `.work/build/<channel>/Oracle.app`, retaining the
previous bundle until staging passes. Nothing updates Launch Services or /Applications.

The release execution path creates a ZIP for notarytool, requires `Accepted`, fetches and
checks the log, staples and validates the app's ticket, rechecks signatures/manifests,
and assesses Gatekeeper. `package.sh` then copies that already-stapled app into a private
staging directory, rechecks the copy, and creates/verifies a DMG under `.work`. The optional
Applications link is inside that image payload only, not a write to the real directory.

The container is separately signed, submitted, required `Accepted`, stapled, validated,
checked for image integrity and assessed with Gatekeeper. Source identity is checked again.
Only then are the DMG, its final SHA-256 and `release-report.json` atomically placed in a
unique `dist/<version-buildID-channel-architecture>/` directory. Existing release artifacts
are not overwritten. No script pushes to GitHub or automatically installs/launches the app.

The final report records real submission IDs and successful automated gates, but keeps
`physicalOfflineLaunchVerified:false` and `secondMacBindingVerified:false`. Stapled-ticket
validation is a required offline-distribution gate, not a substitute for a clean physical
Mac, quarantine, network-disabled launch and genuine Secure Enclave activation test.

## Validation in this worktree

```sh
bash -n scripts/build.sh scripts/package.sh scripts/release.sh
PYTHONPYCACHEPREFIX="$PWD/.work/native-access-build/pycache" \
  python3 -m py_compile scripts/build-manifest.py
python3 scripts/build-manifest.py self-test
```

Initial worker policy suite: **27 checks passed**, log
`.work/native-access-build/distribution-test.log`. The fixtures test source/resource
identity, channel mismatch, changed/extra resources, issuer/PEM/symlink exclusion, Info.plist
drift, .work output containment, explicit native Keychain metadata, minimal entitlement
policy, public trust-key shape, hardened runtime and timestamp rejection. They neither sign nor simulate an actual
Apple-issued identity, notarization acceptance, stapled ticket or Gatekeeper approval.

An earlier direct manifest preflight verified the GBrain copied/vendor binary hashes and
correct pins, and correctly rejected dirty source/missing signing/notary settings. It also
reported missing Bun in that tool shell's PATH and a documentation-marker false positive;
the wrapper now locates the installed Bun path and the scanner requires complete PEM key
material. The attempt to rerun the complete shell preflight was blocked by the tool safety
layer before execution. That attempt did not pass. The prime subsequently executed the
complete developer wrapper successfully; current evidence is
`.work/integration-prime/developer-preflight-current.json`.

The current policy suite passes **30 checks** in
`.work/integration-prime/distribution-policy-current.log`. Three additional checks enforce
semantic-version handling for the adapter compiler. The installed Bun 1.3.8 is below the
pinned GBrain package requirement `>=1.3.10`. This is a developer warning and a release
error, and the exact values enter provenance. A release manifest without positive supported
compiler evidence is rejected. No global toolchain upgrade or dependency installation was
performed. Successful developer fixtures do not waive this release gate.

No real Developer ID build, notarization submission, stapled artifact, mounted DMG or release
installation was exercised here. Developer ad-hoc build results, when executed, are recorded
separately in `.work/integration-prime/developer-bundle-build.log` and
`developer-bundle-verification.json`; they do not qualify a release. The audit worktree remains intentionally uncommitted, so
a real release is expected to be refused until the prime's integration and review finish.

## Developer validation inside an existing network sandbox

The 11 September full-bundle attempt exposed a SwiftPM manifest failure:
`sandbox-exec: sandbox_apply: Operation not permitted` inside the already applied
network-denying sandbox. `build.sh --external-network-sandbox` is an explicit,
developer-only compatibility mode. It accepts SwiftPM `--disable-sandbox` only
when a local socket probe receives kernel EPERM/EACCES. Connection refusal, timeout
or merely passing the flag does not qualify. Release rejects this mode; its normal
sandbox and signing policy remain unchanged. No global security setting is changed.

Invoke the complete build under `sandbox-exec -p '(version 1)(allow default)(deny network*)'`
with `--channel developer --external-network-sandbox` and HOME/CFFIXED_USER_HOME/TMPDIR
explicitly under this worktree's `.work`. The enclosing network boundary remains
active for compilers, subprocesses and ad-hoc signing. The mode does not itself
claim file-write confinement. All configured build/cache/state paths remain local.

This continuation preserves the first failure as
`.work/audit-verification-20260911/developer-build.log`. Subsequent build, signature,
manifest and final-binary suite results are recorded separately in that same
verification directory; none imply publication or release qualification.

## Primary references

Apple notarization, submission/log/stapling workflow:
https://developer.apple.com/documentation/security/customizing-the-notarization-workflow

Apple TN2206, nested signing, sealed resources and signing modifications:
https://developer.apple.com/library/archive/technotes/tn2206/_index.html

Apple DTS, Data Protection Keychain entitlement requirements:
https://developer.apple.com/forums/thread/114456

Bun compiled-executable targets, configuration autoload and signing requirements:
https://bun.com/docs/bundler/executables
