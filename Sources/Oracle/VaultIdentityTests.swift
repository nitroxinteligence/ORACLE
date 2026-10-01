import Foundation

/// Real Foundation bookmark decoding plus simulated remount metadata. No real
/// mount, personal vault, permission token or confirmed plan is changed.
func runVaultIdentityTests(root:URL)throws {
    let fm=FileManager.default
    guard root.pathComponents.contains(".work"),root.resolvingSymlinksInPath().path==root.path else{throw OracleVaultIdentity.error()}
    try fm.createDirectory(at:root,withIntermediateDirectories:true)
    let current=try OracleVaultIdentity.capture(root),identity=try OracleVaultIdentity.planIdentity(root)
    guard let volume=current.volumeUUID else{throw OracleVaultIdentity.error()}
    var passed=0
    func check(_ value:Bool,_ label:String)throws{guard value else{throw NSError(domain:"Oracle.VaultIdentityTests",code:1,userInfo:[NSLocalizedDescriptionKey:label])};passed+=1;print("PASS "+label)}
    func reject(_ label:String,_ action:()throws->Void)throws{var refused=false;do{try action()}catch{refused=true};try check(refused,label)}
    var legacy=identity;legacy.removeValue(forKey:"volume_uuid")
    try check((try OracleVaultIdentity.verify(expected:legacy,current:current,bookmark:nil))["mode"] as? String=="legacy_device_inode","legacy matching device and inode retains its strict direct path")
    let remounted=OracleVaultIdentity.Snapshot(root:current.root,device:current.device+1,inode:current.inode,volumeUUID:volume)
    try check((try OracleVaultIdentity.verify(expected:identity,current:remounted,bookmark:nil))["mode"] as? String=="pinned_volume_inode","new plan pinned UUID survives a simulated remount with the same inode")
    let bookmark=try root.bookmarkData(options:[],includingResourceValuesForKeys:[.volumeUUIDStringKey],relativeTo:nil),bookmarkBefore=bookmark
    let evidence=try OracleVaultIdentity.bookmarkEvidence(bookmark)
    try check(!evidence.stale && evidence.volumeUUID==volume && evidence.resolvedRoot==current.root,"original Foundation bookmark contains matching historical UUID and resolves without UI or mounting")
    try check((try OracleVaultIdentity.verify(expected:legacy,current:remounted,bookmark:bookmark))["mode"] as? String=="legacy_bookmark_volume_inode" && bookmark==bookmarkBefore,"legacy remount requires original stored bookmark UUID without replacing bookmark bytes")
    let otherVolume=UUID().uuidString.lowercased()
    let replaced=OracleVaultIdentity.Snapshot(root:current.root,device:current.device,inode:current.inode,volumeUUID:otherVolume)
    try reject("pinned UUID rejects another volume even with equal device and inode"){_=try OracleVaultIdentity.verify(expected:identity,current:replaced,bookmark:bookmark)}
    let remountedOther=OracleVaultIdentity.Snapshot(root:current.root,device:current.device+1,inode:current.inode,volumeUUID:otherVolume)
    try reject("legacy remount rejects another volume with equal inode"){_=try OracleVaultIdentity.verify(expected:legacy,current:remountedOther,bookmark:bookmark)}
    let changedInode=OracleVaultIdentity.Snapshot(root:current.root,device:current.device+1,inode:current.inode+1,volumeUUID:volume)
    try reject("same volume and valid bookmark cannot admit a replaced inode"){_=try OracleVaultIdentity.verify(expected:legacy,current:changedInode,bookmark:bookmark)}
    try reject("legacy remount without original bookmark is refused"){_=try OracleVaultIdentity.verify(expected:legacy,current:remounted,bookmark:nil)}
    try reject("corrupt original bookmark is refused"){_=try OracleVaultIdentity.verify(expected:legacy,current:remounted,bookmark:Data("corrupt".utf8))}
    try reject("bookmark without stored volume UUID is refused"){_=try OracleVaultIdentity.verify(expected:legacy,current:remounted,bookmark:bookmark,readBookmark:{_ in .init(volumeUUID:nil,resolvedRoot:current.root,stale:false)})}
    try reject("stale original bookmark is refused"){_=try OracleVaultIdentity.verify(expected:legacy,current:remounted,bookmark:bookmark,readBookmark:{_ in .init(volumeUUID:volume,resolvedRoot:current.root,stale:true)})}
    try reject("original bookmark resolving another folder is refused"){_=try OracleVaultIdentity.verify(expected:legacy,current:remounted,bookmark:bookmark,readBookmark:{_ in .init(volumeUUID:volume,resolvedRoot:current.root+"/moved",stale:false)})}
    let noVolume=OracleVaultIdentity.Snapshot(root:current.root,device:current.device+1,inode:current.inode,volumeUUID:nil)
    try reject("legacy remount without current volume UUID is refused"){_=try OracleVaultIdentity.verify(expected:legacy,current:noVolume,bookmark:bookmark)}
    let link=root.deletingLastPathComponent().appendingPathComponent("vault-identity-link")
    try fm.createSymbolicLink(at:link,withDestinationURL:root)
    defer{try? fm.removeItem(at:link)}
    try reject("symlink cannot become a confirmed canonical vault identity"){_=try OracleVaultIdentity.capture(link)}
    print("VAULT_IDENTITY_TESTS_OK \(passed)")
}
