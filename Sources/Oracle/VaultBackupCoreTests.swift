import Foundation
import CryptoKit

private struct VaultBackupTestDevice: OracleLicenseDeviceProviding {
    func identifier(create: Bool) throws -> String { "ORACLE-MAC2-" + String(repeating: "f", count: 64) }
}


/// This companion runs only in the integrated native test binary with a signed
/// synthetic license. The standalone engine script does not simulate license trust.
func runVaultBackupCoreTests() throws {
    let root=try oracleTestDirectory("vault-backup-core")
    defer{try? fm.removeItem(at:root)}
    let key=Curve25519.Signing.PrivateKey(),device=VaultBackupTestDevice()
    let core=try Core(home:root.appendingPathComponent("state"),licenseDevice:device,
        licenseTrust:LicenseKeys(version:1,keys:["fixture":key.publicKey.rawRepresentation.base64EncodedString()]))
    let vault=root.appendingPathComponent("vault"),destination=root.appendingPathComponent("snapshots")
    try fm.createDirectory(at:vault,withIntermediateDirectories:true);try fm.createDirectory(at:destination,withIntermediateDirectories:true)
    try Data("# Apenas fixture\n".utf8).write(to:vault.appendingPathComponent("Nota.md"))
    core.config=["vault":vault.path];try core.persist()
    var count=0
    func expect(_ value:Bool,_ text:String)throws{guard value else{throw failure(text)};count+=1;print("PASS "+text)}
    func refuses(_ text:String,_ action:()throws->Void)throws{do{try action()}catch{count+=1;print("PASS "+text);return};throw failure("Accepted: "+text)}
    try expect(core.vaultBackupStatus()["enabled"] as? Bool==false,"new Core starts with vault backup disabled")
    try refuses("unlicensed caller cannot authorize file backup"){_=try core.configureVaultBackupConsent(enabled:true,destination:destination)}
    _=try core.licenseDeviceRequest()
    let grant=OracleLicense(version:2,product:"oracle-macos",keyID:"fixture",licenseID:UUID().uuidString,subject:"Synthetic vault backup",issuedAt:1,expiresAt:nil,deviceID:try device.identifier(create:false))
    let payload=try JSONEncoder().encode(grant)
    _=try core.activateLicense("ORACLE2."+base64URL(payload)+"."+base64URL(try key.signature(for:Data("ORACLE2.".utf8)+payload)))
    try refuses("valid license does not implicitly enable vault backup"){_=try core.createVaultBackup()}
    try refuses("consent requires an explicitly chosen destination"){_=try core.configureVaultBackupConsent(enabled:true)}
    let status=try core.configureVaultBackupConsent(enabled:true,destination:destination)
    try expect(status["enabled"] as? Bool==true && status["databaseIncluded"] as? Bool==false,"separate consent enables only vault files")
    try expect(!fm.fileExists(atPath:core.home.appendingPathComponent("gbrain-backups/consent.json").path),"vault consent never authorizes PGLite backup")
    let created=try core.createVaultBackup()
    try expect(created["complete"] as? Bool==true && created["files"] as? Int==1,"native Core persists owned snapshot receipt")
    let id=created["id"] as! String,restored=root.appendingPathComponent("restored")
    try fm.createDirectory(at:restored,withIntermediateDirectories:true)
    try refuses("native Core restore requires explicit confirmation"){_=try core.restoreVaultBackup(id:id,destination:restored,confirmed:false)}
    try refuses("native Core restore refuses unknown owned snapshot ID"){_=try core.restoreVaultBackup(id:UUID().uuidString.lowercased(),destination:restored,confirmed:true)}
    let result=try core.restoreVaultBackup(id:id,destination:restored,confirmed:true)
    try expect(result["complete"] as? Bool==true && fm.fileExists(atPath:restored.appendingPathComponent("Nota.md").path),"native Core restores registered snapshot into new directory")
    _=try core.configureVaultBackupConsent(enabled:false)
    try expect(core.vaultBackupStatus()["enabled"] as? Bool==false,"explicit revocation disables later snapshots")
    try refuses("revoked consent cannot create another snapshot"){_=try core.createVaultBackup()}
    let different=root.appendingPathComponent("different-vault");try fm.createDirectory(at:different,withIntermediateDirectories:true)
    _=try core.configureVaultBackupConsent(enabled:true,destination:destination)
    core.config["vault"]=different.path;try core.persist()
    try expect(core.vaultBackupStatus()["enabled"] as? Bool==false,"changed vault invalidates old backup consent binding")
    let scope=try core.memoryPortabilityScope(),beforeConsent=try Data(contentsOf:core.home.appendingPathComponent("vault-backups/consent.json"))
    core.config["vault"]=vault.path;core.config["vaultSelectionRevision"]=UUID().uuidString.lowercased();try core.persist()
    try refuses("directory choice cannot authorize a later vault selection") {
        try core.withMemoryPortabilitySelection(expectedScope:scope) {
            _=try core.configureVaultBackupConsent(enabled:true,destination:destination)
        }
    }
    try expect(try Data(contentsOf:core.home.appendingPathComponent("vault-backups/consent.json"))==beforeConsent,"rejected stale choice preserves consent bytes")
    let returnedScope=try core.memoryPortabilityScope()
    core.config["vault"]=different.path;core.config["vaultSelectionRevision"]=UUID().uuidString.lowercased();try core.persist()
    core.config["vault"]=vault.path;core.config["vaultSelectionRevision"]=UUID().uuidString.lowercased();try core.persist()
    try refuses("A to B to A does not revive a pending directory authorization") {
        try core.withMemoryPortabilitySelection(expectedScope:returnedScope) {_=try core.configureVaultBackupConsent(enabled:true,destination:destination)}
    }
    let currentScope=try core.memoryPortabilityScope()
    try core.withMemoryPortabilitySelection(expectedScope:currentScope) {
        try core.withMemoryPortabilitySelection(expectedScope:currentScope) {
            try expect(core.operationIsRunning("memory-portability-selection"),"selection exclusion remains held in nested revocation boundary")
        }
    }
    let held=try core.acquireOperationLock("memory-portability-selection")
    try refuses("another selection cannot race with consent persistence") {
        try core.withMemoryPortabilitySelection(expectedScope:currentScope) {_=try core.configureVaultBackupConsent(enabled:true,destination:destination)}
    }
    core.releaseOperationLock(held)
    print("Vault backup Core: \(count) checks; signed synthetic device, no personal profile")
}
