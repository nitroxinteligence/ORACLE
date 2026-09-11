#!/usr/bin/env python3
"""Small native UI regression fixture: real web sources + mocked bridge, never Core.

No packages are installed. Only .work/atlas-worker/native is written. No global
defaults, real vault, credentials, browser profiles, or other worktrees are used.
"""
from __future__ import annotations

import hashlib
import json
import os
from pathlib import Path
import shutil
import subprocess
import sys

ROOT = Path(__file__).resolve().parents[1]
BRANCH = "codex/oracle-onboarding-implementation-20260910"
SCRATCH = ROOT / ".work/atlas-worker/native"


def guard() -> None:
    if ROOT.name != "onboarding-implementation-20260910":
        raise RuntimeError("This fixture is scoped to the onboarding implementation worktree")
    branch = subprocess.check_output(["/usr/bin/git", "branch", "--show-current"], cwd=ROOT, text=True).strip()
    if branch != BRANCH or Path.cwd().resolve() != ROOT:
        raise RuntimeError("Wrong branch/cwd; no fixture files were changed")
    for path in (ROOT / ".work", ROOT / ".work/atlas-worker", SCRATCH):
        if path.is_symlink():
            raise RuntimeError(f"Refusing linked output directory: {path}")


def main() -> int:
    guard()
    if sys.platform != "darwin":
        raise RuntimeError("The native fixture requires macOS; no browser substitute was launched")
    if shutil.disk_usage(ROOT).free < 24 * 1024 * 1024:
        raise RuntimeError("Less than 24 MiB free; refusing native fixture startup")
    for name in ("home", "tmp", "cache", "assets", "assets/brand"):
        (SCRATCH / name).mkdir(parents=True, exist_ok=True)
    env = {"PATH":"/usr/bin:/bin:/usr/sbin:/sbin:/usr/local/bin", "HOME":str(SCRATCH / "home"),
           "CFFIXED_USER_HOME":str(SCRATCH / "home"), "TMPDIR":str(SCRATCH / "tmp") + "/",
           "XDG_CACHE_HOME":str(SCRATCH / "cache"), "CLANG_MODULE_CACHE_PATH":str(SCRATCH / "cache"),
           "GBRAIN_HOME":str(SCRATCH / "home/gbrain"), "LC_ALL":"en_US.UTF-8"}
    # Copy only the small UI, never Resources/engine, catalog packs or native state.
    web = ROOT / "Resources/web"
    names = ["index.html", "style.css", "atlas-motion.css", "onboarding.css", "status-badges.js",
             "preview.js", "universe.js", "replay.js", "atlas.js", "installation-visual.js", "onboarding.js",
             "app.js", "brand/lockup-white.svg", "brand/symbol-white.svg"]
    hashes = {}
    for name in names:
        source = web / name
        if source.is_symlink():
            raise RuntimeError("Linked web sources are not accepted")
        guard()
        data = source.read_bytes()
        hashes[name] = hashlib.sha256(data).hexdigest()
        (SCRATCH / "assets" / name).write_bytes(data)
    guard()
    shutil.copyfile(ROOT / "scripts/fixture-integrated-web.js", SCRATCH / "fixture.js")
    shutil.copyfile(ROOT / "scripts/atlas-web-fixture.m", SCRATCH / "atlas-web-fixture.m")
    # Reads of the account's home are blocked except these synthetic assets/state.
    account_home = str(Path(ROOT.parts[0], ROOT.parts[1], ROOT.parts[2]))
    sandbox = ("(version 1)\n(allow default)\n(deny network*)\n"
               f"(deny file-write* (require-all (require-not (subpath {json.dumps(str(SCRATCH))})) (require-not (literal \"/dev/null\"))))\n"
               f"(deny file-read* (require-all (subpath {json.dumps(account_home)}) (require-not (subpath {json.dumps(str(SCRATCH))}))))\n")
    compile_sandbox = sandbox
    (SCRATCH / "runtime.sb").write_text(sandbox)
    (SCRATCH / "compile.sb").write_text(compile_sandbox)
    binary = SCRATCH / "atlas-web-fixture"
    guard()
    compile_result = subprocess.run(["/usr/bin/sandbox-exec", "-f", str(SCRATCH / "compile.sb"),
        "/usr/bin/clang", "-fobjc-arc", "-fno-modules", "-O0", "-g0", "-framework", "AppKit",
        "-framework", "WebKit", str(SCRATCH / "atlas-web-fixture.m"), "-o", str(binary)],
        cwd=SCRATCH, env=env, text=True, capture_output=True, timeout=45)
    print(compile_result.stdout[-12000:] + compile_result.stderr[-12000:], flush=True)
    if compile_result.returncode:
        return compile_result.returncode
    guard()
    report = SCRATCH / "result.json"
    if report.exists():
        report.unlink()  # Only this worker's previous report; never other scratch.
    process = subprocess.run(["/usr/bin/sandbox-exec", "-f", str(SCRATCH / "runtime.sb"),
        str(binary), str(SCRATCH / "assets"), str(SCRATCH / "fixture.js"), str(report)],
        cwd=SCRATCH, env=env, text=True, capture_output=True, timeout=90)
    print(process.stdout[-26000:] + process.stderr[-9000:], flush=True)
    if report.exists():
        result = json.loads(report.read_text())
        result["sourceHashes"] = hashes
        result["sourcesUnchangedDuringRun"] = all(hashlib.sha256((web / name).read_bytes()).hexdigest() == sha for name, sha in hashes.items())
        result["isolation"] = {"realCore":False,"network":"denied","websiteData":"nonpersistent",
                               "privateHomeReads":"denied","state":"synthetic","scratch":str(SCRATCH)}
        guard()
        report.write_text(json.dumps(result, indent=2, ensure_ascii=False) + "\n")
        print(json.dumps({key:result.get(key) for key in ("passed","failed","sourcesUnchangedDuringRun","renderer","error")}, ensure_ascii=False), flush=True)
    print("Disposable artifacts: " + str(SCRATCH), flush=True)
    return process.returncode


if __name__ == "__main__":
    try:
        sys.exit(main())
    except (OSError, RuntimeError, subprocess.SubprocessError) as error:
        print(f"NATIVE_FIXTURE_UNAVAILABLE: {error}", file=sys.stderr)
        sys.exit(2)
