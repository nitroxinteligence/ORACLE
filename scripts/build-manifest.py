#!/usr/bin/env python3
"""Oracle build provenance and fail-closed packaging policy. No key access or network calls.

The manifest is evidence of build inputs, not a replacement for Developer ID, notarization,
or a physical offline launch test. Signing modifies Mach-O bytes; the resource inventory
is generated after signing the two inner engines and before sealing the outer bundle.
"""
from __future__ import annotations

import argparse
import base64
import datetime as dt
import hashlib
import json
import os
from pathlib import Path
import platform
import plistlib
import re
import shutil
import stat
import subprocess
import sys
import tempfile
import uuid

ROOT = Path(__file__).resolve().parents[1]
GBRAIN_COMMIT = "2efaaf8f8a817b5b82e023383618fdcdb1cc5f7d"
GBRAIN_VERSION = "0.48.4.0"
MARKED_VERSION = "18.0.6"
MANIFEST = "build-manifest.json"
INVENTORY = "build-resources.json"
FORBIDDEN_NAMES = {"oracle-license", "oracle-license.swift", "ed25519-private.key", "ledger.json", "ledger.lock", ".env", "auth.json"}
GENERATED_INPUTS = {"Resources/web/universe.js", "Resources/web/replay.js", "Resources/web/vendor/marked.js",
                    "Resources/web/vendor/MARKED-LICENSE.txt", "Resources/web/vendor/manifest.json", "Resources/Oracle.icns",
                    "Resources/web/brand/lockup-white.svg"}


class BuildError(RuntimeError):
    pass


def canonical(value) -> bytes:
    return json.dumps(value, sort_keys=True, separators=(",", ":"), ensure_ascii=True).encode()


def digest(path: Path) -> str:
    h = hashlib.sha256()
    with path.open("rb") as handle:
        for chunk in iter(lambda: handle.read(1024 * 1024), b""):
            h.update(chunk)
    return h.hexdigest()


def load(path: Path):
    if path.is_symlink() or not path.is_file() or path.stat().st_size > 32_000_000:
        raise BuildError(f"Invalid regular JSON file: {path.name}")
    return json.loads(path.read_text())


def write_json(path: Path, value) -> None:
    path.parent.mkdir(parents=True, exist_ok=True)
    if path.is_symlink():
        raise BuildError("Refusing a symlink output")
    temporary = path.with_name(".manifest-" + uuid.uuid4().hex)
    try:
        with temporary.open("xb") as handle:
            handle.write(json.dumps(value, indent=2, sort_keys=True).encode() + b"\n")
        os.replace(temporary, path)
    finally:
        temporary.unlink(missing_ok=True)


def work_path(path: Path, root: Path = ROOT) -> Path:
    path = Path(os.path.abspath(path))
    if path != path.resolve() or not path.is_relative_to(root.resolve() / ".work") or path == root / ".work":
        raise BuildError("Output/staging must be a non-symlink descendant of this repository's .work")
    return path


def git(root: Path, *args: str) -> bytes:
    env = dict(os.environ, GIT_OPTIONAL_LOCKS="0")
    return subprocess.check_output(["git", "-C", str(root), *args], env=env, stderr=subprocess.DEVNULL)


def source_snapshot(root: Path = ROOT) -> dict:
    commit = git(root, "rev-parse", "--verify", "HEAD").decode().strip()
    if not re.fullmatch(r"[0-9a-f]{40}", commit):
        raise BuildError("No committed source revision")
    status = git(root, "status", "--porcelain=v1", "--untracked-files=normal")
    names = set(git(root, "ls-files", "-z", "--cached", "--others", "--exclude-standard").decode().split("\0")) - {""}
    records = []
    for name in sorted(names):
        path = root / name
        if not path.is_relative_to(root) or ".." in Path(name).parts:
            raise BuildError("Source path escaped repository")
        if path.is_symlink():
            records.append({"path": name, "type": "symlink", "sha256": hashlib.sha256(os.readlink(path).encode()).hexdigest()})
        elif path.is_file():
            records.append({"path": name, "type": "file", "sha256": digest(path), "executable": bool(path.stat().st_mode & 0o111)})
        elif not path.exists():
            records.append({"path": name, "type": "deleted"})
    return {"commit": commit, "dirty": bool(status), "sourceHash": hashlib.sha256(canonical(records)).hexdigest(), "sourceFiles": records,
            "sourceFileCount": len(records), "buildNumber": git(root, "rev-list", "--count", "HEAD").decode().strip()}


def release_policy(channel: str, snapshot: dict, identity: str, notary: str) -> list[str]:
    errors = []
    if channel not in ("developer", "release"):
        return ["Choose --channel developer or --channel release explicitly."]
    if channel == "release":
        if snapshot.get("dirty") is not False:
            errors.append("Release requires a clean, committed source tree, including generated tracked resources.")
        if not re.fullmatch(r"Developer ID Application: [^\r\n]+ \([A-Z0-9]{10}\)", identity) or any(ord(c) < 32 for c in identity):
            errors.append("Set ORACLE_SIGN_IDENTITY to an explicit Developer ID Application identity. No identity is discovered automatically.")
        if not notary.strip() or len(notary) > 200 or any(ord(c) < 32 for c in notary):
            errors.append("Set ORACLE_NOTARY_PROFILE explicitly. Preflight does not read or create Keychain credentials.")
    return errors


def app_entitlements(value: dict, identity: str) -> dict:
    """No inferred App ID prefix; the owner supplies reviewed, public entitlement metadata."""
    team = re.search(r"\(([A-Z0-9]{10})\)$", identity)
    allowed = {"com.apple.application-identifier", "com.apple.developer.team-identifier", "keychain-access-groups"}
    identifier = value.get("com.apple.application-identifier", "")
    if not isinstance(identifier, str) or not re.fullmatch(r"[A-Z0-9]{10}\.com\.oraclecompanion\.macos", identifier) or not team or value.get("com.apple.developer.team-identifier") != team[1] or value.get("keychain-access-groups") != [identifier] or set(value) != allowed:
        raise BuildError("Native entitlements must explicitly declare this App ID, signing team and only its own Keychain group; no JIT/unsigned-memory/debug exceptions are allowed in the UI.")
    return value


def reviewed_app_entitlements() -> dict:
    text = os.environ.get("ORACLE_APP_ENTITLEMENTS", "")
    path = Path(text)
    if not text or not path.is_absolute() or path.resolve() != path or not path.is_file() or path.stat().st_size > 65536:
        raise BuildError("Set ORACLE_APP_ENTITLEMENTS to an explicit, reviewed native App ID/Keychain entitlements plist. Preflight never guesses an identity or opens Keychain.")
    value = plistlib.loads(path.read_bytes())
    if not isinstance(value, dict):
        raise BuildError("Native entitlement plist must be a dictionary")
    return app_entitlements(value, os.environ.get("ORACLE_SIGN_IDENTITY", ""))


def validate_trust_keys(value) -> None:
    if not isinstance(value, dict) or type(value.get("version")) is not int or value["version"] != 1 or not isinstance(value.get("keys"), dict) or not value["keys"]:
        raise BuildError("Release has no reviewed owner public trust key. Do not ship a bundle that cannot activate its owner.")
    for key_id, public_key in value["keys"].items():
        if not isinstance(key_id, str) or not re.fullmatch(r"[A-Za-z0-9_-]{1,128}", key_id) or not isinstance(public_key, str):
            raise BuildError("Malformed issuer public-key entry")
        try:
            raw = base64.b64decode(public_key, validate=True)
        except (ValueError, TypeError) as error:
            raise BuildError("Malformed issuer public-key encoding") from error
        if len(raw) != 32 or base64.b64encode(raw).decode() != public_key:
            raise BuildError("Issuer public key must be a canonical 32-byte Ed25519 public key")


def signature_metadata(text: str, channel: str, identity: str, runtime: bool = True) -> dict:
    """Pure policy check; caller must first run codesign --verify on the actual bytes."""
    lines = text.splitlines()
    authorities = [line[10:] for line in lines if line.startswith("Authority=")]
    team = next((line[15:] for line in lines if line.startswith("TeamIdentifier=")), "")
    hardened = any(line.startswith("CodeDirectory ") and "runtime" in line for line in lines)
    if channel == "release":
        expected = re.search(r"\(([A-Z0-9]{10})\)$", identity)
        if not expected or not authorities or authorities[0] != identity or team != expected[1] or "Signature=adhoc" in lines or (runtime and not hardened) or not any(line.startswith("Timestamp=") for line in lines):
            raise BuildError("Release signature must match the explicit Developer ID team, secure timestamp and required hardened runtime.")
    return {"authority": authorities[0] if authorities else "ad-hoc", "team": team, "hardenedRuntime": hardened}


def verify_signature(path: Path, channel: str) -> dict:
    subprocess.run(["/usr/bin/codesign", "--verify", "--deep", "--strict", "--verbose=2", str(path)], check=True, stdout=subprocess.PIPE, stderr=subprocess.PIPE)
    targets = [path]
    if path.suffix == ".app":
        targets += [path / "Contents/Resources/engine/gbrain", path / "Contents/Resources/engine/oracle-gbrain-read"]
    evidence = []
    expected_native = reviewed_app_entitlements() if channel == "release" and path.suffix == ".app" else None
    for index, target in enumerate(targets):
        subprocess.run(["/usr/bin/codesign", "--verify", "--strict", str(target)], check=True, stdout=subprocess.PIPE, stderr=subprocess.PIPE)
        result = subprocess.run(["/usr/bin/codesign", "--display", "--verbose=4", str(target)], check=True, capture_output=True, text=True)
        evidence.append(signature_metadata(result.stdout + result.stderr, channel, os.environ.get("ORACLE_SIGN_IDENTITY", ""), runtime=path.suffix == ".app"))
        if channel == "release" and path.suffix == ".app":
            output = subprocess.run(["/usr/bin/codesign", "--display", "--entitlements", ":-", str(target)], check=True, capture_output=True).stdout
            start = output.find(b"<?xml")
            if start < 0: start = output.find(b"<plist")
            if start < 0: raise BuildError("Signed entitlements are missing")
            value = plistlib.loads(output[start:])
            expected = expected_native if index == 0 else {"com.apple.security.cs.allow-jit": True, "com.apple.security.cs.allow-unsigned-executable-memory": True}
            if value != expected:
                raise BuildError("Signed runtime/Keychain entitlements differ from the reviewed minimal policy")
            if index == 0:
                manifest = load(path / "Contents/Resources/build-manifest.json")
                if manifest.get("nativeEntitlementsSHA256") != hashlib.sha256(canonical(value)).hexdigest():
                    raise BuildError("Signed native entitlements do not match the build manifest")
    return {"verified": True, "channel": channel, "signatures": evidence}


def reject_private(path: Path, relative: str) -> None:
    parts = Path(relative).parts
    if path.name.lower() in FORBIDDEN_NAMES or path.suffix.lower() in (".p12", ".p8", ".key") or "scripts/licensing/" in relative or ".oracle-issuer" in parts:
        raise BuildError(f"Private issuer/credential material is forbidden in a bundle: {relative}")
    # Renaming the owner tool or a PEM must not defeat the path policy.
    if path.stat().st_size <= 2_000_000:
        data = path.read_bytes()
        pem = re.search(rb"-----BEGIN (?:EC |RSA |ENCRYPTED )?PRIVATE KEY-----\s*[A-Za-z0-9+/=\r\n]{100,}\s*-----END (?:EC |RSA |ENCRYPTED )?PRIVATE KEY-----", data)
        if pem or b"final class OfflineIssuerLedger" in data:
            raise BuildError(f"Private key or issuer source detected in bundle resource: {relative}")


def resource_files(directory: Path, allow_pack_link: bool = False):
    if not directory.is_dir() or directory.is_symlink():
        raise BuildError("Resources must be a real directory")
    for base, directories, names in os.walk(directory, followlinks=False):
        base = Path(base)
        for name in list(directories):
            child = base / name
            if child.is_symlink():
                relative = child.relative_to(directory).as_posix()
                if not allow_pack_link or relative != "catalog/packs" or not child.resolve().is_dir():
                    raise BuildError(f"Unexpected resource symlink: {relative}")
                directories.remove(name)
                for path, subrelative in resource_files(child.resolve()):
                    yield path, relative + "/" + subrelative
        for name in sorted(names):
            child = base / name
            relative = child.relative_to(directory).as_posix()
            if child.is_symlink() or not stat.S_ISREG(child.stat().st_mode):
                raise BuildError(f"Non-regular resource: {relative}")
            if relative in (MANIFEST, INVENTORY) or name == ".DS_Store":
                continue
            reject_private(child, relative)
            yield child, relative


def supported_bun(actual: str, requirement: str) -> bool:
    installed = re.fullmatch(r"(\d+)\.(\d+)\.(\d+)", actual.strip())
    minimum = re.fullmatch(r">=(\d+)\.(\d+)\.(\d+)", requirement.strip())
    return bool(installed and minimum and tuple(map(int, installed.groups())) >= tuple(map(int, minimum.groups())))


def pins(root: Path = ROOT) -> dict:
    vendor = root / "vendor/gbrain"
    ref = git(vendor, "rev-parse", "HEAD").decode().strip()
    version = load(vendor / "package.json").get("version")
    marked = load(vendor / "node_modules/marked/package.json").get("version")
    if ref != GBRAIN_COMMIT or version != GBRAIN_VERSION or marked != MARKED_VERSION:
        raise BuildError("Pinned GBrain commit/version or Marked lexer differs. No checkout/install/bootstrap is performed by this pipeline.")
    engine = root / "Resources/engine/gbrain"
    if engine.is_symlink() or not engine.is_file():
        raise BuildError("Resources/engine/gbrain must be a private regular copy, not a shared symlink.")
    local_hash, vendor_hash = digest(engine), digest(vendor / "bin/gbrain")
    if local_hash != vendor_hash:
        raise BuildError("Copied GBrain binary does not match the already-built pinned vendor binary. Reconcile provenance before packaging.")
    requirement = load(vendor / "package.json").get("engines", {}).get("bun", "")
    compiler = shutil.which("bun")
    actual = subprocess.check_output([compiler, "--version"], cwd=root, env={"PATH": "/usr/bin:/bin"}, timeout=10).decode().strip() if compiler else "unavailable"
    return {"gbrainCommit": ref, "gbrainVersion": version, "gbrainSourceBinarySHA256": local_hash, "markedVersion": marked,
            "adapterCompilerBun": actual, "upstreamBunRequirement": requirement, "adapterCompilerSupported": supported_bun(actual, requirement)}


def preflight(channel: str) -> dict:
    errors, warnings = [], []
    try:
        snapshot = source_snapshot()
    except (OSError, subprocess.SubprocessError, BuildError) as error:
        snapshot = {"dirty": True}; errors.append(str(error))
    errors += release_policy(channel, snapshot, os.environ.get("ORACLE_SIGN_IDENTITY", ""), os.environ.get("ORACLE_NOTARY_PROFILE", ""))
    if channel == "release":
        try:
            reviewed_app_entitlements()
        except (BuildError, ValueError, OSError, plistlib.InvalidFileException) as error:
            errors.append(str(error))
    if platform.system() != "Darwin" or platform.machine() != "arm64":
        errors.append("This pipeline supports native macOS arm64 builds only; Intel/second-Mac support is not certified.")
    for tool in ("bun", "swift", "python3", "codesign", "xcrun", "ditto", "lipo", "hdiutil", "sips", "iconutil", "spctl"):
        if not shutil.which(tool):
            errors.append(f"Missing required local tool: {tool}")
    provenance = {}
    try:
        provenance = pins()
        if not provenance["adapterCompilerSupported"]:
            message = f"Adapter compiler Bun {provenance['adapterCompilerBun']} does not meet pinned upstream {provenance['upstreamBunRequirement']}. Developer tests are not supported-toolchain release certification."
            (errors if channel == "release" else warnings).append(message)
        list(resource_files(ROOT / "Resources", allow_pack_link=True))
        list(resource_files(ROOT / "skills"))
        if channel == "release":
            validate_trust_keys(load(ROOT / "Resources/licensing/public-keys.json"))
    except (OSError, ValueError, subprocess.SubprocessError, BuildError) as error:
        errors.append(str(error))
    return {"ok": not errors, "channel": channel, "commit": snapshot.get("commit"), "dirty": snapshot.get("dirty"), "errors": errors, "warnings": warnings,
            "provenance": provenance, "minimumMacOS": "13.0", "architecture": "arm64", "credentialsAccessed": False, "networkAccessed": False}


def assemble(app: Path, executable: Path, record: dict, channel: str) -> None:
    app = work_path(app)
    if app.exists():
        raise BuildError("Staging bundle already exists; do not merge into an old application")
    resources = app / "Contents/Resources"
    resources.mkdir(parents=True)
    for directory, prefix in ((ROOT / "Resources", ""), (ROOT / "skills", "skills/")):
        for source, relative in resource_files(directory, allow_pack_link=(not prefix)):
            destination = resources / (prefix + relative)
            destination.parent.mkdir(parents=True, exist_ok=True)
            shutil.copy2(source, destination)
    macos = app / "Contents/MacOS"; macos.mkdir()
    if executable.is_symlink() or not executable.is_file():
        raise BuildError("Compiled executable must be a regular file")
    shutil.copy2(executable, macos / "Oracle")
    profile = os.environ.get("ORACLE_PROVISIONING_PROFILE", "") if channel == "release" else ""
    if profile:
        source = Path(profile)
        if not source.is_absolute() or source.is_symlink() or not source.is_file() or source.stat().st_size > 2_000_000:
            raise BuildError("Explicit provisioning profile is not a regular public profile file")
        shutil.copy2(source, app / "Contents/embedded.provisionprofile")
    version = load(ROOT / "package.json")["version"]
    if not re.fullmatch(r"[0-9]+\.[0-9]+\.[0-9]+", version):
        raise BuildError("Version must be a numeric major.minor.patch")
    number = os.environ.get("ORACLE_BUILD_NUMBER", record["buildNumber"])
    if not re.fullmatch(r"[1-9][0-9]{0,8}", number):
        raise BuildError("ORACLE_BUILD_NUMBER must be a positive integer of at most nine digits")
    info = {"CFBundleName": "Oracle", "CFBundleDisplayName": "Oracle" if channel == "release" else "Oracle Development",
            "CFBundleIdentifier": "com.oraclecompanion.macos", "CFBundleVersion": number,
            "CFBundleShortVersionString": version, "CFBundleExecutable": "Oracle", "CFBundlePackageType": "APPL",
            "CFBundleIconFile": "Oracle", "LSMinimumSystemVersion": "13.0", "LSArchitecturePriority": ["arm64"],
            "NSHighResolutionCapable": True, "NSPrincipalClass": "NSApplication",
            "NSFaceIDUsageDescription": "Desbloquear seu universo no Oracle.",
            "NSDocumentsFolderUsageDescription": "Acessar o vault que você selecionar.",
            "NSDownloadsFolderUsageDescription": "Importar a exportação de conversas que você selecionar.",
            "OracleBuildChannel": channel, "OracleSourceRevision": record["commit"]}
    (app / "Contents/Info.plist").write_bytes(plistlib.dumps(info))


def create_manifest(app: Path, record: dict, channel: str, provenance: dict | None = None) -> dict:
    resources = app / "Contents/Resources"
    entries = [{"path": name, "bytes": path.stat().st_size, "sha256": digest(path)} for path, name in resource_files(resources)]
    entries.sort(key=lambda row: row["path"])
    write_json(resources / INVENTORY, {"schemaVersion": 1, "files": entries})
    info = plistlib.loads((app / "Contents/Info.plist").read_bytes())
    manifest = {"schemaVersion": 1, "product": "oracle-macos", "version": info["CFBundleShortVersionString"],
                "buildNumber": info["CFBundleVersion"], "commit": record["commit"], "dirty": record["dirty"], "sourceHash": record["sourceHash"],
                "sourceFileCount": record["sourceFileCount"], "buildID": dt.datetime.now(dt.timezone.utc).strftime("%Y%m%dT%H%M%SZ") + "-" + record["commit"][:12] + "-" + uuid.uuid4().hex[:8],
                "channel": channel, "architecture": "arm64", "minimumMacOS": "13.0", "verifiedRelease": False,
                "signing": "developer-id-hardened-runtime" if channel == "release" else "ad-hoc-development",
                "notarization": "not asserted by build metadata; validate stapled ticket and release report",
                "resourceManifest": INVENTORY, "resourceManifestSHA256": digest(resources / INVENTORY), "resourceCount": len(entries),
                "provenance": provenance or {}, "licensePolicy": "ORACLE2-permanent-secure-enclave-no-legacy-bypass"}
    if channel == "release":
        manifest["nativeEntitlementsSHA256"] = hashlib.sha256(canonical(reviewed_app_entitlements())).hexdigest()
    write_json(resources / MANIFEST, manifest)
    return manifest


def verify_manifest(app: Path, channel: str) -> dict:
    if app.is_symlink() or not (app / "Contents").is_dir():
        raise BuildError("Invalid application bundle")
    resources = app / "Contents/Resources"
    # The issuer cannot be smuggled into Contents/MacOS or another non-resource directory.
    for base, directories, names in os.walk(app, followlinks=False):
        for name in directories + names:
            candidate = Path(base) / name
            if candidate.is_symlink():
                raise BuildError("Bundle contains a symlink")
            if candidate.is_file():
                reject_private(candidate, candidate.relative_to(app).as_posix())
    value = load(resources / MANIFEST)
    if not isinstance(value, dict):
        raise BuildError("Build manifest must be an object")
    if value.get("schemaVersion") != 1 or value.get("channel") != channel or value.get("architecture") != "arm64" or value.get("minimumMacOS") != "13.0":
        raise BuildError("Manifest channel/schema/target mismatch")
    if not isinstance(value.get("commit"), str) or not isinstance(value.get("sourceHash"), str) or not re.fullmatch(r"[0-9a-f]{40}", value["commit"]) or not re.fullmatch(r"[0-9a-f]{64}", value["sourceHash"]):
        raise BuildError("Missing committed revision or source fingerprint")
    if channel == "release" and value.get("dirty") is not False:
        raise BuildError("Dirty-source bundle is not eligible for release")
    if channel == "release" and value.get("provenance", {}).get("adapterCompilerSupported") is not True:
        raise BuildError("Release requires an adapter compiler satisfying the pinned upstream Bun requirement")
    if channel == "release" and value.get("nativeEntitlementsSHA256") != hashlib.sha256(canonical(reviewed_app_entitlements())).hexdigest():
        raise BuildError("Native App ID/Keychain policy differs from the built release")
    if value.get("resourceManifest") != INVENTORY or digest(resources / INVENTORY) != value.get("resourceManifestSHA256"):
        raise BuildError("Resource manifest was changed")
    expected = load(resources / INVENTORY).get("files")
    actual = [{"path": name, "bytes": path.stat().st_size, "sha256": digest(path)} for path, name in resource_files(resources)]
    actual.sort(key=lambda row: row["path"])
    if expected != actual or value.get("resourceCount") != len(actual):
        raise BuildError("Missing, extra or changed application resources")
    info = plistlib.loads((app / "Contents/Info.plist").read_bytes())
    if info.get("CFBundleShortVersionString") != value.get("version") or info.get("CFBundleVersion") != value.get("buildNumber") or info.get("OracleBuildChannel") != channel or info.get("OracleSourceRevision") != value.get("commit") or info.get("CFBundleIdentifier") != "com.oraclecompanion.macos" or info.get("LSMinimumSystemVersion") != "13.0":
        raise BuildError("Info.plist does not match build provenance")
    return value


def finalize(stage: Path, destination: Path) -> None:
    stage, destination = work_path(stage), work_path(destination)
    if stage.suffix != ".app" or destination.suffix != ".app":
        raise BuildError("Only .app staging bundles can be finalized")
    destination.parent.mkdir(parents=True, exist_ok=True)
    previous = destination.with_name(destination.stem + ".previous.app")
    if previous.is_symlink():
        raise BuildError("Previous-build path is a symlink")
    if previous.exists():
        shutil.rmtree(previous)
    if destination.exists():
        os.replace(destination, previous)
    try:
        os.replace(stage, destination)
    except OSError:
        if previous.exists() and not destination.exists():
            os.replace(previous, destination)
        raise


def self_test() -> None:
    root = ROOT / ".work/native-access-build"; root.mkdir(parents=True, exist_ok=True)
    checks = 0
    def check(value, name):
        nonlocal checks
        if not value:
            raise BuildError("FAIL " + name)
        checks += 1; print("PASS " + name)
    def rejects(name, operation):
        try:
            operation()
        except (BuildError, OSError, ValueError):
            check(True, name); return
        check(False, name)
    snapshot = {"dirty": False, "commit": "1" * 40, "sourceHash": "2" * 64, "sourceFileCount": 1, "buildNumber": "1"}
    check(len(release_policy("release", {"dirty": True}, "", "")) == 3, "release preflight refuses dirty source and absent explicit credentials")
    check(not release_policy("developer", {"dirty": True}, "", ""), "developer channel does not discover or require real credentials")
    check(not supported_bun("1.3.8", ">=1.3.10"), "below-minimum Bun cannot pass the supported release toolchain gate")
    check(supported_bun("1.3.10", ">=1.3.10") and supported_bun("1.4.0", ">=1.3.10"), "semantic version comparison accepts supported Bun versions")
    check(not supported_bun("1.3.10-canary", ">=1.3.10") and not supported_bun("1.3.10", "unknown"), "unknown toolchain policy is fail-closed")
    check(not release_policy("release", snapshot, "Developer ID Application: Synthetic (ABCDEFGHIJ)", "synthetic-profile"), "explicit credential policy is testable without Keychain access")
    check(bool(release_policy("release", snapshot, "-", "synthetic-profile")), "ad-hoc identity cannot become release identity")
    identity = "Developer ID Application: Synthetic (ABCDEFGHIJ)"
    native = {"com.apple.application-identifier": "ABCDEFGHIJ.com.oraclecompanion.macos", "com.apple.developer.team-identifier": "ABCDEFGHIJ", "keychain-access-groups": ["ABCDEFGHIJ.com.oraclecompanion.macos"]}
    check(app_entitlements(native, identity) == native, "explicit native App ID and private Keychain group validate without touching Keychain")
    rejects("native UI cannot receive JIT exceptions", lambda: app_entitlements(dict(native, **{"com.apple.security.cs.allow-jit": True}), identity))
    rejects("unrelated shared Keychain group is rejected", lambda: app_entitlements(dict(native, **{"keychain-access-groups": ["ABCDEFGHIJ.other.app"]}), identity))
    signature = "CodeDirectory v=20500 flags=0x10000(runtime)\nAuthority=" + identity + "\nTeamIdentifier=ABCDEFGHIJ\nTimestamp=synthetic\n"
    check(signature_metadata(signature, "release", identity)["hardenedRuntime"], "signature policy requires Developer ID, team, hardened runtime and timestamp")
    rejects("ad-hoc text cannot masquerade as a release signature", lambda: signature_metadata("Signature=adhoc", "release", identity))
    rejects("release without hardened runtime rejected", lambda: signature_metadata(signature.replace("runtime", "none"), "release", identity))
    rejects("release without secure timestamp rejected", lambda: signature_metadata(signature.replace("Timestamp=synthetic\n", ""), "release", identity))
    rejects("empty release trust roots cannot lock out an owner silently", lambda: validate_trust_keys({"version": 1, "keys": {}}))
    rejects("malformed public verification keys cannot ship", lambda: validate_trust_keys({"version": 1, "keys": {"fixture": "not-base64"}}))
    validate_trust_keys({"version": 1, "keys": {"fixture": base64.b64encode(bytes(range(32))).decode()}})
    check(True, "public-key shape validation uses no issuer private key")
    with tempfile.TemporaryDirectory(prefix="distribution-fixture-", dir=root) as temporary:
        app = Path(temporary) / "Oracle.app"; resources = app / "Contents/Resources"; resources.mkdir(parents=True)
        info = {"CFBundleShortVersionString": "0.0.0", "CFBundleVersion": "1", "OracleBuildChannel": "developer", "OracleSourceRevision": snapshot["commit"], "CFBundleIdentifier": "com.oraclecompanion.macos", "LSMinimumSystemVersion": "13.0"}
        (app / "Contents/Info.plist").write_bytes(plistlib.dumps(info))
        (resources / "fixture.txt").write_text("Synthetic resource")
        manifest = create_manifest(app, snapshot, "developer", {"synthetic": True})
        check(verify_manifest(app, "developer")["sourceHash"] == snapshot["sourceHash"], "source/build identity and resource manifest verify")
        check(manifest["verifiedRelease"] is False, "build metadata never fabricates notarization evidence")
        rejects("developer bundle cannot be packaged as release", lambda: verify_manifest(app, "release"))
        (resources / "fixture.txt").write_text("Changed")
        rejects("changed resource rejected", lambda: verify_manifest(app, "developer"))
        (resources / "fixture.txt").write_text("Synthetic resource")
        (resources / "extra.txt").write_text("extra")
        rejects("extra unmanifested resource rejected", lambda: verify_manifest(app, "developer")); (resources / "extra.txt").unlink()
        (resources / "ledger.json").write_text("{}")
        rejects("owner ledger cannot enter bundle", lambda: create_manifest(app, snapshot, "developer")); (resources / "ledger.json").unlink()
        (resources / "renamed-tool.txt").write_text("final class OfflineIssuerLedger")
        rejects("renamed owner issuer source rejected", lambda: create_manifest(app, snapshot, "developer")); (resources / "renamed-tool.txt").unlink()
        (resources / "private.pem").write_text("-----BEGIN PRIVATE KEY-----\n" + "A" * 128 + "\n-----END PRIVATE KEY-----\n")
        rejects("complete PEM private-key material rejected", lambda: create_manifest(app, snapshot, "developer")); (resources / "private.pem").unlink()
        (resources / "public-reference.md").write_text("Secret scanner pattern: `-----BEGIN PRIVATE KEY-----` (no key material)")
        check(len(list(resource_files(resources))) == 2, "documentation of a secret pattern is not private key material"); (resources / "public-reference.md").unlink()
        (resources / "link.txt").symlink_to(resources / "fixture.txt")
        rejects("symlink resource rejected", lambda: verify_manifest(app, "developer")); (resources / "link.txt").unlink()
        info["CFBundleVersion"] = "2"; (app / "Contents/Info.plist").write_bytes(plistlib.dumps(info))
        rejects("Info.plist version drift rejected", lambda: verify_manifest(app, "developer"))
        rejects("output outside .work rejected", lambda: work_path(ROOT / "outside.app"))
        (Path(temporary) / "redirect").symlink_to(root, target_is_directory=True)
        rejects("symlink output ancestor rejected", lambda: work_path(Path(temporary) / "redirect/Oracle.app"))
    print(f"Distribution policy/manifest: {checks} checks passed; no signing, credentials, upload or application install.")


def main() -> int:
    parser = argparse.ArgumentParser(description=__doc__)
    parser.add_argument("command", choices=("preflight", "snapshot", "check-source", "check-inputs", "validate-output", "assemble", "create", "verify", "verify-signature", "finalize", "entitlements", "self-test"))
    parser.add_argument("--channel", choices=("developer", "release"))
    parser.add_argument("--app", type=Path); parser.add_argument("--output", type=Path); parser.add_argument("--source-record", type=Path)
    parser.add_argument("--executable", type=Path); parser.add_argument("--destination", type=Path)
    parser.add_argument("--kind", choices=("bun", "app"), default="bun")
    args = parser.parse_args()
    if args.command == "self-test": self_test(); return 0
    if args.command == "preflight":
        if not args.channel: parser.error("--channel is required")
        result = preflight(args.channel); print(json.dumps(result, indent=2)); return 0 if result["ok"] else 1
    if args.command == "snapshot":
        if not args.output: parser.error("--output is required")
        write_json(work_path(args.output), source_snapshot()); return 0
    if args.command == "validate-output":
        if not args.output: parser.error("--output is required")
        print(work_path(args.output)); return 0
    if args.command == "entitlements":
        if not args.output: parser.error("--output is required")
        path = work_path(args.output); path.parent.mkdir(parents=True, exist_ok=True)
        # Only the Bun engines need JIT. Never give these exceptions to the native UI.
        value = reviewed_app_entitlements() if args.kind == "app" else {"com.apple.security.cs.allow-jit": True, "com.apple.security.cs.allow-unsigned-executable-memory": True}
        path.write_bytes(plistlib.dumps(value)); return 0
    if args.command == "finalize":
        if not args.app or not args.destination: parser.error("--app and --destination are required")
        finalize(args.app, args.destination); return 0
    if args.command == "check-source":
        if not args.source_record: parser.error("--source-record is required")
        previous, current = load(args.source_record), source_snapshot()
        if any(previous.get(k) != current.get(k) for k in ("sourceHash", "commit", "dirty")):
            raise BuildError("Source changed during build; no stale bundle will be finalized")
        return 0
    if args.command == "check-inputs":
        if not args.source_record: parser.error("--source-record is required")
        previous, current = load(args.source_record), source_snapshot()
        def inputs(value): return [row for row in value["sourceFiles"] if row["path"] not in GENERATED_INPUTS]
        if previous["commit"] != current["commit"] or inputs(previous) != inputs(current):
            raise BuildError("Build inputs changed during resource generation; outputs cannot be attributed to this revision")
        return 0
    if not args.app or not args.channel: parser.error("--app and --channel are required")
    if args.command == "verify-signature": print(json.dumps(verify_signature(args.app, args.channel), indent=2)); return 0
    if args.command == "verify": print(json.dumps(verify_manifest(args.app, args.channel), indent=2)); return 0
    if not args.source_record: parser.error("--source-record is required")
    record = load(args.source_record)
    current = source_snapshot()
    if any(record.get(k) != current.get(k) for k in ("commit", "dirty", "sourceHash", "sourceFileCount")):
        raise BuildError("Source record no longer matches the current repository")
    if args.channel == "release" and record.get("dirty") is not False:
        raise BuildError("Only clean committed sources can create a release bundle")
    if args.command == "assemble":
        if not args.executable: parser.error("--executable is required")
        assemble(args.app, args.executable, record, args.channel)
    elif args.command == "create":
        work_path(args.app); print(json.dumps(create_manifest(args.app, record, args.channel, pins()), indent=2))
    return 0


if __name__ == "__main__":
    try:
        raise SystemExit(main())
    except (BuildError, OSError, ValueError, subprocess.SubprocessError) as error:
        print("Build policy: " + str(error), file=sys.stderr); raise SystemExit(1)
