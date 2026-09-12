import Foundation
import CryptoKit

private final class SyntheticLicenseDevice: OracleLicenseDeviceProviding {
    var value: String
    var exists = false
    var unavailable = false
    var calls = [Bool]()
    init(_ value: String) { self.value = value }
    func identifier(create: Bool) throws -> String {
        calls.append(create)
        if unavailable { throw failure("Synthetic device unavailable") }
        if create { exists = true }
        guard exists else { throw failure("Synthetic device missing; explicit request required") }
        return value
    }
}

/// Ephemeral signing keys and fake devices only. Never uses hardware or Keychain.
func runLicenseDeviceTests() throws {
    let base = try oracleTestDirectory("oracle-license-v2")
    defer { try? fm.removeItem(at: base) }
    var count = 0
    func check(_ value: Bool, _ label: String) throws {
        guard value else { throw failure("License v2 test failed: " + label) }
        count += 1; print("PASS " + label)
    }
    func rejects(_ label: String, _ action: () throws -> Void) throws {
        do { try action() } catch { count += 1; print("PASS " + label); return }
        throw failure("License v2 unexpectedly accepted: " + label)
    }
    let hardware = "11111111-2222-3333-4444-555555555555"
    let secret = Data(repeating: 7, count: 32)
    let device = try OracleDeviceBinding.identifier(platformUUID: hardware, secret: secret)
    let other = try OracleDeviceBinding.identifier(platformUUID: "AAAAAAAA-BBBB-CCCC-DDDD-EEEEEEEEEEEE", secret: secret)
    try check(OracleDeviceBinding.valid(device), "v2 device identifier has canonical format")
    try check(try OracleDeviceBinding.identifier(platformUUID: hardware.lowercased(), secret: secret) == device, "hardware UUID normalization is stable")
    try check(device != other, "copied secret on a different Mac has a different binding")
    try check(try OracleDeviceBinding.identifier(platformUUID: hardware, secret: Data(repeating: 8, count: 32)) != device, "replaced device secret cannot reuse old binding")
    try rejects("malformed hardware identifier refused") { _ = try OracleDeviceBinding.identifier(platformUUID: "not-a-uuid", secret: secret) }
    try rejects("short device secret refused") { _ = try OracleDeviceBinding.identifier(platformUUID: hardware, secret: Data()) }
    try check(!OracleDeviceBinding.valid(device + "0") && !OracleDeviceBinding.valid("ORACLE-MAC2-" + String(repeating: "G", count: 64)), "invalid public device identifiers refused")
    let signer = Curve25519.Signing.PrivateKey()
    let keys = LicenseKeys(version: 1, keys: ["synthetic": signer.publicKey.rawRepresentation.base64EncodedString()])
    let now = Int64(Date().timeIntervalSince1970)
    func issue(version: Int = 2, binding: String? = device, expires: Int64? = nil,
               issued: Int64? = nil, domain: String? = nil,
               signingKey: Curve25519.Signing.PrivateKey? = nil) throws -> String {
        let value = OracleLicense(version: version, product: "oracle-macos", keyID: "synthetic",
            licenseID: UUID().uuidString, subject: "Synthetic student", issuedAt: issued ?? now - 30,
            expiresAt: expires, deviceID: binding)
        let data = try JSONEncoder().encode(value), prefix = domain ?? "ORACLE\(version)"
        let signature = try (signingKey ?? signer).signature(for: Data((prefix + ".").utf8) + data)
        return prefix + "." + base64URL(data) + "." + base64URL(signature)
    }
    let code = try issue()
    try check(try validateLicense(code, keys: keys, device: device, now: now).version == 2, "signed v2 access validates offline")
    try check(try validateLicense(code, keys: keys, device: device, now: now + 100_000_000).expiresAt == nil, "v2 access has no subscription expiry")
    try rejects("v2 without mandatory binding refused") { _ = try validateLicense(issue(binding: nil), keys: keys, device: device, now: now) }
    try rejects("v2 for another Mac refused") { _ = try validateLicense(code, keys: keys, device: other, now: now) }
    try rejects("v2 expiring payload refused") { _ = try validateLicense(issue(expires: now + 3600), keys: keys, device: device, now: now) }
    try rejects("v2 future issue date refused") { _ = try validateLicense(issue(issued: now + 3600), keys: keys, device: device, now: now) }
    try rejects("signed protocol downgrade refused") { _ = try validateLicense(issue(domain: "ORACLE1"), keys: keys, device: device, now: now) }
    try rejects("v2 untrusted signing key refused") { _ = try validateLicense(issue(signingKey: Curve25519.Signing.PrivateKey()), keys: keys, device: device, now: now) }
    try rejects("unknown trust format refused") { _ = try validateLicense(code, keys: LicenseKeys(version: 2, keys: keys.keys), device: device, now: now) }
    let fake = SyntheticLicenseDevice(device)
    let core = try Core(home: base.appendingPathComponent("state"), licenseDevice: fake, licenseTrust: keys)
    let snapshot = try core.onboardingSnapshot()
    try check(fake.calls.isEmpty && snapshot["deviceBindingStatus"] as? String == "request_required", "fresh snapshot never queries or creates a device key")
    try check(core.activeLicense() == nil && fake.calls.isEmpty, "missing license never queries hardware or Keychain")
    try rejects("activation does not silently create a device key") { _ = try core.activateLicense(code) }
    try check(!fake.exists && !fm.fileExists(atPath: core.home.appendingPathComponent("onboarding/license").path), "failed activation leaves profile without a fabricated license")
    let request = try core.licenseDeviceRequest()
    try check(fake.exists && request["deviceID"] as? String == device && request["activated"] as? Bool == false, "explicit device request is not activation")
    try check(try core.licenseDeviceRequest()["deviceID"] as? String == device, "repeated device request keeps the binding")
    let activated = try core.activateLicense(code)
    try check(activated["deviceBound"] as? Bool == true && core.activeLicense()?.deviceID == device, "v2 activation and local readback agree")
    try check(!core.onboardingLegacyAccess(), "v2 activation removes inherited legacy bypass")
    let licensePath = core.home.appendingPathComponent("onboarding/license")
    let original = try Data(contentsOf: licensePath)
    let note = base.appendingPathComponent("personal-note.md")
    try atomicWriteData(Data("Synthetic canonical note".utf8), to: note)
    fake.unavailable = true
    try check(core.activeLicense() == nil && fake.calls.last == false, "unavailable device never falls back to a new key")
    try check(try Data(contentsOf: licensePath) == original && Data(contentsOf: note) == Data("Synthetic canonical note".utf8), "license failure never deletes code or notes")
    fake.unavailable = false
    let copyDevice = SyntheticLicenseDevice(other); copyDevice.exists = true
    let copied = base.appendingPathComponent("copied-state"); try fm.copyItem(at: core.home, to: copied)
    let otherCore = try Core(home: copied, licenseDevice: copyDevice, licenseTrust: keys)
    try check(otherCore.activeLicense() == nil && !otherCore.onboardingLegacyAccess(), "copied v2 state cannot activate another device")
    try check(otherCore.licenseDeviceSnapshot()["deviceBindingStatus"] as? String == "device_changed", "copied request is not displayed as verified identity")
    let legacyCode = try issue(version: 1, binding: nil)
    try rejects("new v1 activation is refused without overwriting v2") { _ = try core.activateLicense(legacyCode) }
    try check(try Data(contentsOf: licensePath) == original, "rejected legacy activation preserves valid v2 bytes")
    let legacyFake = SyntheticLicenseDevice(device)
    let legacy = try Core(home: base.appendingPathComponent("legacy"), licenseDevice: legacyFake, licenseTrust: keys)
    try writeJSON(["legacyAccess": true], legacy.onboardingURL)
    try atomicWriteData(Data(legacyCode.utf8), to: legacy.home.appendingPathComponent("onboarding/license"))
    try check(legacy.activeLicense()?.version == 1 && legacyFake.calls.isEmpty, "already installed v1 access is preserved without Keychain migration")
    try check(!fm.fileExists(atPath: legacy.home.appendingPathComponent("onboarding/device-id").path), "legacy read does not regenerate a random UUID")
    let held = try core.acquireOperationLock("setup")
    try rejects("activation excludes concurrent setup") { _ = try core.activateLicense(code) }
    core.releaseOperationLock(held)
    let linked = core.home.appendingPathComponent("onboarding/linked")
    try fm.createSymbolicLink(at: linked, withDestinationURL: licensePath)
    try rejects("linked access record refused") { _ = try core.licenseFile("onboarding/linked") }
    try fm.removeItem(at: linked); try fm.linkItem(at: licensePath, to: linked)
    try rejects("hardlinked access record refused") { _ = try core.licenseFile("onboarding/license") }
    try fm.removeItem(at: linked)
    try rejects("oversized access record refused before reading") { _ = try core.licenseFile("onboarding/license", limit: 1) }
    try check(try Data(contentsOf: licensePath) == original, "all negative device tests retain installed license")
    // Short-key grants use the same pinned issuer trust, without Keychain setup.
    let shortDevice = SyntheticLicenseDevice(device)
    let shortCore = try Core(home: base.appendingPathComponent("short-key"), licenseDevice: shortDevice, licenseTrust: keys)
    let shortKey = "ABCD-EFGH-JKLM-NPQR", normalized = shortKey.replacingOccurrences(of: "-", with: "")
    let accessHash = digest(Data(normalized.utf8))
    func grant(role: String = "owner", expires: Int64? = nil, hash: String = accessHash,
               signingKey: Curve25519.Signing.PrivateKey? = nil) throws -> String {
        var value = OracleLicense(version: 3, product: "oracle-macos", keyID: "synthetic", licenseID: UUID().uuidString,
            subject: "Synthetic short key", issuedAt: now - 30, expiresAt: expires, deviceID: nil)
        value.role = role; value.accessKeyHash = hash
        let bytes = try JSONEncoder().encode(value)
        return "ORACLE3." + base64URL(bytes) + "." + base64URL(try (signingKey ?? signer).signature(for: Data("ORACLE3.".utf8) + bytes))
    }
    let grantPath = shortCore.home.appendingPathComponent("onboarding/access-grants/" + accessHash + ".license")
    try fm.createDirectory(at: grantPath.deletingLastPathComponent(), withIntermediateDirectories: true)
    try rejects("short key alone cannot invent a grant") { _ = try shortCore.activateLicense(shortKey) }
    try atomicWriteData(Data(try grant().utf8), to: grantPath, permissions: 0o600)
    try check(try shortCore.activateLicense(shortKey.lowercased())["valid"] as? Bool == true, "short key activates a signed owner grant")
    try check(shortCore.activeLicense()?.role == "owner" && shortDevice.calls.isEmpty, "short activation and reopening do not touch hardware or Keychain")
    try shortCore.requireCapability(.manageDistribution)
    let shortOriginal = try Data(contentsOf: shortCore.home.appendingPathComponent("onboarding/license"))
    try rejects("unrecognized short key rejected") { _ = try shortCore.activateLicense("ZZZZ-ZZZZ-ZZZZ-ZZZZ") }
    try atomicWriteData(Data(try grant(signingKey: Curve25519.Signing.PrivateKey()).utf8), to: grantPath)
    try rejects("untrusted short-key grant cannot activate") { _ = try shortCore.activateLicense(shortKey) }
    try atomicWriteData(Data(try grant(hash: String(repeating: "0", count: 64)).utf8), to: grantPath)
    try rejects("grant cannot be remapped to another short key") { _ = try shortCore.activateLicense(shortKey) }
    try rejects("v3 unknown role rejected") { _ = try validateLicense(grant(role: "admin"), keys: keys, device: "") }
    try rejects("v3 expiring grant rejected") { _ = try validateLicense(grant(expires: now + 3600), keys: keys, device: "") }
    try check(licenseCapabilities(try validateLicense(grant(role: "student"), keys: keys, device: ""))["manageDistribution"] == false, "short student grant cannot grant owner capabilities")
    try check(try Data(contentsOf: shortCore.home.appendingPathComponent("onboarding/license")) == shortOriginal, "rejected short keys preserve the installed grant")
    shortCore.config["vault"] = base.path; try shortCore.persist()
    try writeJSON(["status": "review", "localStarted": false, "codexStarted": false], shortCore.onboardingURL)
    let resumed = try shortCore.onboardingSnapshot()
    try check(resumed["resumeExisting"] as? Bool == true && resumed["status"] as? String == "review", "existing vault resumes without fabricating completed setup")
    try check((resumed["confirmed"] as? [[String: Any]])?.isEmpty == true, "existing vault does not invent identity or index receipts")
    try writeJSON(["status": "running", "localStarted": true], shortCore.onboardingURL)
    try check(try shortCore.onboardingSnapshot()["resumeExisting"] as? Bool == false, "real setup in progress is not silently dismissed")
    print("License v2: \(count) checks passed; synthetic devices and signing keys only")
}
