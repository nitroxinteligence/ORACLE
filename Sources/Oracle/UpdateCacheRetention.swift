import Foundation
import Darwin

extension Core {
    private func withUpdateCacheLease<T>(_ body:()throws->T)throws->T {
        var locks=[Int32]()
        defer{for descriptor in locks.reversed(){releaseOperationLock(descriptor)}}
        for name in ["update-cache-retention","updates","installation","setup","gbrain"] {locks.append(try acquireOperationLock(name))}
        return try body()
    }
    private func cacheRetentionEngine()->OracleUpdateCacheRetention {
        OracleUpdateCacheRetention(home:home){bytes in
            let manifest=try self.decodeDistribution(bytes,allowKnownRollback:true)
            return try manifest.packages.map {row in
                guard let hash=row["sha256"] as? String,DistributionManifest.validHash(hash) else{throw failure("Pacote sem hash assinado.")}
                return hash
            }
        }
    }
    /// A bounded preview is persisted so a separate CLI invocation can confirm it.
    /// This private receipt contains cache paths only, never note contents.
    func updateCacheStatus()throws->[String:Any] {
        try withUpdateCacheLease {
            let preview=try cacheRetentionEngine().preview()
            let data=try JSONEncoder().encode(preview)
            guard data.count<=4_000_000 else{throw failure("A prévia tem itens demais. Nenhum cache foi limpo.")}
            let parent=home.appendingPathComponent("updates/cache-retention")
            try fm.createDirectory(at:parent,withIntermediateDirectories:true,attributes:[.posixPermissions:0o700])
            let engine=cacheRetentionEngine(),fd=try engine.directory("updates/cache-retention")
            Darwin.close(fd)
            let path=parent.appendingPathComponent("preview.json")
            if try engine.exists("updates/cache-retention/preview.json") {_=try engine.file("updates/cache-retention/preview.json",limit:4_000_000)}
            try atomicWriteData(data,to:path,permissions:0o600)
            return preview.projection
        }
    }
    func pruneUpdateCache(confirmed:Bool,previewID:String?=nil)throws->[String:Any] {
        guard confirmed else{throw failure("Confirme a prévia de downloads guardados antes de limpar.")}
        guard let previewID,UUID(uuidString:previewID) != nil else{throw failure("Confira novamente os IDs e bytes antes de limpar.")}
        try requireCapability(.configure)
        return try withUpdateCacheLease {
            let engine=cacheRetentionEngine()
            let (_,data)=try engine.file("updates/cache-retention/preview.json",limit:4_000_000)
            let preview=try JSONDecoder().decode(OracleCachePreview.self,from:data)
            guard preview.id==previewID else{throw failure("Esta prévia foi substituída. Confira novamente antes de limpar.")}
            return try engine.prune(preview,confirmed:confirmed)
        }
    }
}
