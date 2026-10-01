import Foundation
import Darwin
import CryptoKit

/// st_dev identifies a mounted device, not a persistent volume across reboots.
/// Only a pinned volume UUID or the original bookmark's stored UUID may prove
/// that the same inode still belongs to the originally selected volume.
enum OracleVaultIdentity {
    struct Snapshot {
        let root:String,device:Int64,inode:UInt64,volumeUUID:String?
    }
    struct BookmarkEvidence {
        let volumeUUID:String?,resolvedRoot:String,stale:Bool
    }
    static func error()->NSError {NSError(domain:"Oracle.VaultIdentity",code:1,userInfo:[NSLocalizedDescriptionKey:"O vault foi movido, substituído ou sua identidade não pôde ser confirmada. Selecione a pasta novamente para criar um plano separado."])}
    static func uuid(_ value:String?)->String? {value.flatMap{UUID(uuidString:$0)?.uuidString.lowercased()}}
    static func capture(_ root:URL)throws->Snapshot {
        guard root.isFileURL,root.path==root.standardizedFileURL.path,root.path==root.resolvingSymlinksInPath().path else{throw error()}
        var identity=stat()
        guard lstat(root.path,&identity)==0,(identity.st_mode&S_IFMT)==S_IFDIR else{throw error()}
        let volume=try root.resourceValues(forKeys:[.volumeUUIDStringKey]).volumeUUIDString
        return Snapshot(root:root.path,device:Int64(identity.st_dev),inode:UInt64(identity.st_ino),volumeUUID:uuid(volume))
    }
    static func planIdentity(_ root:URL)throws->[String:Any] {
        let snapshot=try capture(root)
        var result:[String:Any]=["device":snapshot.device,"inode":snapshot.inode]
        if let volume=snapshot.volumeUUID{result["volume_uuid"]=volume}
        return result
    }
    static func bookmarkEvidence(_ data:Data)throws->BookmarkEvidence {
        guard data.count>0,data.count<=4_000_000,
              let stored=URL.resourceValues(forKeys:[.volumeUUIDStringKey],fromBookmarkData:data),
              let volume=uuid(stored.volumeUUIDString) else{throw error()}
        var stale=false
        let resolved=try URL(resolvingBookmarkData:data,options:[.withoutUI,.withoutMounting],relativeTo:nil,bookmarkDataIsStale:&stale)
        guard resolved.isFileURL,resolved.path==resolved.standardizedFileURL.path,
              resolved.path==resolved.resolvingSymlinksInPath().path else{throw error()}
        _=try capture(resolved)
        return BookmarkEvidence(volumeUUID:volume,resolvedRoot:resolved.path,stale:stale)
    }
    static func verify(expected:[String:Any],current:Snapshot,bookmark:Data?,readBookmark:(Data)throws->BookmarkEvidence=bookmarkEvidence)throws->[String:Any] {
        guard let inode=expected["inode"] as? NSNumber,inode.uint64Value==current.inode,
              let device=expected["device"] as? NSNumber else{throw error()}
        var proof:[String:Any]=["inode":current.inode,"device_before":device.int64Value,"device_current":current.device,"root":current.root]
        if expected["volume_uuid"] != nil {
            guard let pinned=uuid(expected["volume_uuid"] as? String),pinned==current.volumeUUID else{throw error()}
            proof["mode"]="pinned_volume_inode";proof["volume_uuid"]=pinned
        } else if device.int64Value==current.device {
            proof["mode"]="legacy_device_inode"
        } else {
            guard let bookmark,let currentVolume=current.volumeUUID else{throw error()}
            let original=try readBookmark(bookmark)
            guard !original.stale,original.resolvedRoot==current.root,uuid(original.volumeUUID)==currentVolume else{throw error()}
            proof["mode"]="legacy_bookmark_volume_inode";proof["volume_uuid"]=currentVolume
            proof["bookmark_sha256"]=SHA256.hash(data:bookmark).map{String(format:"%02x",$0)}.joined()
        }
        return proof
    }
}

extension Core {
    func verifyVaultPlanIdentity(_ plan:[String:Any])throws->[String:Any] {
        let root=try vault()
        guard plan["vault"] as? String==root.path,let expected=plan["vault_identity"] as? [String:Any] else{throw OracleVaultIdentity.error()}
        let bookmark=(config["vaultBookmark"] as? String).flatMap{Data(base64Encoded:$0)}
        return try OracleVaultIdentity.verify(expected:expected,current:OracleVaultIdentity.capture(root),bookmark:bookmark)
    }
}
