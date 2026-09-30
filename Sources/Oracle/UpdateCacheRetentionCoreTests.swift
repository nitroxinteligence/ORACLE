import Foundation

/// Native Core leases, without touching the selected vault or granting a license.
func runUpdateCacheRetentionCoreTests()throws {
    let root=try oracleTestDirectory("update-cache-retention-core")
    let core=try Core(home:root)
    let status=try core.updateCacheStatus()
    guard status["count"] as? Int==0,status["manual"] as? Bool==true,status["previewID"] is String else{throw failure("Prévia vazia de cache inválida.")}
    for name in ["updates","installation","setup","gbrain"] {
        let lease=try core.acquireOperationLock(name)
        do {
            do {_=try core.updateCacheStatus();throw failure("Retenção ignorou a operação "+name)}
            catch let error as OracleOperationLockError {guard error.name==name else{throw error}}
            core.releaseOperationLock(lease)
        }catch{core.releaseOperationLock(lease);throw error}
    }
    do {_=try core.pruneUpdateCache(confirmed:false);throw failure("Limpeza sem confirmação foi aceita.")}
    catch {guard error.localizedDescription.contains("Confirme") else{throw error}}
    print("PASS Core: prévia manual, confirmação e locks de updates/installation/setup/gbrain")
}
