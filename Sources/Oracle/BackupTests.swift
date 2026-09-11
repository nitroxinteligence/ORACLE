import Foundation

/// Synthetic controls. The separate adapter suite proves a physical restore/query.
func runGBrainBackupTests() throws {
    let base=try oracleTestDirectory("gbrain-backup-controls")
    try fm.createDirectory(at:base,withIntermediateDirectories:true)
    defer{try? fm.removeItem(at:base)}
    let core=try Core(home:base.appendingPathComponent("state"))
    var checks=0
    func check(_ value:Bool,_ label:String) throws {guard value else{throw failure(label)};checks += 1;print("PASS "+label)}
    func refuses(_ label:String,_ body:()throws->Void) throws {
        var rejected=false;do{try body()}catch{rejected=true};try check(rejected,label)
    }
    try check(core.gbrainBackupStatus()["enabled"] as? Bool == false,"Backup must default to disabled")
    try refuses("Unconfigured state cannot opt into database backups"){_ = try core.configureGBrainBackupConsent(enabled:true)}
    try refuses("Default create cannot read a personal database"){_ = try core.createGBrainBackup()}
    try refuses("Backup id traversal rejected"){_ = try core.verifyGBrainBackup(id:"../../outside")}
    try refuses("Restore requires separate explicit confirmation"){_ = try core.restoreGBrainBackup(id:UUID().uuidString)}
    let vault=base.appendingPathComponent("vault")
    try fm.createDirectory(at:vault,withIntermediateDirectories:true)
    core.config=["vault":vault.path,"gbrainAccess":true,"gbrainVaultSource":"oracle-vault"];try core.persist()
    try writeJSON(["owner":"OracleCompanion","schema_version":2,"vault_root":vault.path],core.home.appendingPathComponent("gbrain/profile/oracle-owned.json"))
    _ = try core.configureGBrainBackupConsent(enabled:true)
    try check(core.gbrainBackupStatus()["enabled"] as? Bool == true,"Explicit consent saved separately")
    let other=base.appendingPathComponent("other-vault")
    core.config["vault"]=other.path;try core.persist()
    try check(core.gbrainBackupStatus()["enabled"] as? Bool == false,"Changed vault does not display old backup consent as active")
    try refuses("Changed vault cannot reuse backup consent"){_ = try core.createGBrainBackup()}
    core.config["vault"]=vault.path;core.config["gbrainAccess"]=false;try core.persist()
    try check(core.gbrainBackupStatus()["enabled"] as? Bool == false,"Revoked memory access disables effective backup consent")
    core.config["gbrainAccess"]=true;core.config["gbrainWorkspace"]=other.path;try core.persist()
    try check(core.gbrainBackupStatus()["available"] as? Bool == false,"External profile cannot expose local backups as available")
    core.config.removeValue(forKey:"gbrainWorkspace");try core.persist()
    let held=try core.acquireOperationLock("gbrain")
    do {try refuses("Held gbrain writer lock fails promptly, not recursively"){_ = try core.createGBrainBackup()}}
    catch {core.releaseOperationLock(held);throw error}
    core.releaseOperationLock(held)
    _ = try core.configureGBrainBackupConsent(enabled:false)
    try check(core.gbrainBackupStatus()["enabled"] as? Bool == false,"Consent can be revoked without opening database")
    try refuses("Revoked consent blocks create before adapter"){_ = try core.createGBrainBackup()}
    print("GBrain backup controls: \(checks) checks passed")
}
