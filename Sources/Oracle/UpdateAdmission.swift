import Foundation
import Darwin

/// Scheduling preference within this process, never consent or a filesystem lock.
enum OracleUpdatePriority {
    private static let mutex=NSLock()
    private static var pending=[String:Set<String>]()
    private static func key(_ home:URL)->String {home.resolvingSymlinksInPath().standardizedFileURL.path}
    static func setPending(_ value:Bool,home:URL,requestID:String) {
        mutex.lock();defer{mutex.unlock()}
        let path=key(home)
        if value {pending[path,default:[]].insert(requestID)}
        else {pending[path]?.remove(requestID);if pending[path]?.isEmpty==true {pending.removeValue(forKey:path)}}
    }
    static func hasPending(home:URL)->Bool {
        mutex.lock();defer{mutex.unlock()};return !(pending[key(home)]?.isEmpty ?? true)
    }
}

/// Owns the real descriptors once. It is passed into the update body, never
/// reacquired by an inner wrapper. Closing also fences late download callbacks.
final class OracleUpdateExecution {
    let home:URL
    let requestID:String
    let operation:String
    let distribution:Bool
    let vaultIdentity:String
    let sourceKey:String
    let executorID=UUID().uuidString
    private let mutex=NSLock()
    private var descriptors:[Int32]
    private var revision:Int
    private var claimed=false
    private var latest=[String:Any]()
    private let progress:([String:Any])->Void
    private let resolvePath:(String)throws->URL
    var identity:[String:Any] {
        ["requestID":requestID,"operation":operation,"executorID":executorID,"ownerPID":Int(getpid()),"vaultIdentity":vaultIdentity]
    }
    init(core:Core,requestID:String,operation:String,distribution:Bool,revision:Int=0,
         progress:@escaping([String:Any])->Void={_ in}) throws {
        guard UUID(uuidString:requestID) != nil,OracleUpdateCoordinator.operations.contains(operation) else {throw failure("Pedido de atualização inválido.")}
        home=core.home;self.requestID=requestID;self.operation=operation
        self.distribution=distribution;self.revision=revision;self.progress=progress
        resolvePath={try core.updatePath($0)}
        vaultIdentity=try core.updateTargetIdentity(includeSettings:false)
        sourceKey=core.updateSourceKey()
        descriptors=[]
        do {
            for name in distribution ? ["updates","installation"] : ["updates","setup","gbrain"] {
                descriptors.append(try core.acquireOperationLock(name))
            }
        } catch {close();throw error}
    }
    func claim() throws {
        mutex.lock();defer{mutex.unlock()}
        guard !descriptors.isEmpty,!claimed else{throw failure("A atualização não possui uma admissão válida.")}
        try writeJSON(identity,resolvePath("owner.json"));claimed=true
    }
    func write(_ body:([String:Any])throws->[String:Any]) throws {
        mutex.lock();defer{mutex.unlock()}
        guard claimed,!descriptors.isEmpty else{throw failure("Progresso recusado: esta execução não possui o bloqueio de atualização.")}
        let path=try resolvePath("status.json")
        var value=try body((try? readJSON(path)) ?? [:])
        revision+=1
        for (key,field) in identity {value[key]=field}
        value["revision"]=revision;value["canCancelWait"]=false
        value["busy"] = !OracleUpdateCoordinator.terminalPhases.contains(value["phase"] as? String ?? "")
        // A replayed UUID can read its own result even after a later request.
        try writeJSON(value,resolvePath("requests/"+requestID+".json"))
        try writeJSON(value,path)
        latest=value;progress(value)
    }
    func lastSnapshot()->[String:Any] {mutex.lock();defer{mutex.unlock()};return latest}
    func close() {
        mutex.lock();defer{mutex.unlock()}
        guard !descriptors.isEmpty else{return}
        if claimed,let ownerURL=try? resolvePath("owner.json"),(try? readJSON(ownerURL))?["executorID"] as? String==executorID {try? fm.removeItem(at:ownerURL)}
        claimed=false
        for fd in descriptors.reversed() {flock(fd,LOCK_UN);Darwin.close(fd)}
        descriptors=[]
    }
    deinit {close()}
}

extension Core {
    func usesDistributionUpdates(operation:String)->Bool {
        (try? updateManifest()["skills"] as? [String:Any])?["schema_version"] as? Int==3 && operation != "rollback-gbrain"
    }
    func acquireUpdateExecution(operation:String,requestID:String=UUID().uuidString,revision:Int=0,
                                progress:@escaping([String:Any])->Void={_ in}) throws -> OracleUpdateExecution {
        try OracleUpdateExecution(core:self,requestID:requestID,operation:operation,
                                  distribution:usesDistributionUpdates(operation:operation),revision:revision,progress:progress)
    }
    func validateUpdateAccess(operation:String) throws {
        if !["rollback-gbrain","rollback-skills","rollback-distribution"].contains(operation) {try requireCapability(.configure)}
    }
    /// Snapshot of the selected target, including inode replacement and access
    /// revocation. It is rechecked after admission, before any update effects.
    func updateTargetIdentity(includeSettings:Bool=true) throws -> String {
        refreshConfig()
        let keys=includeSettings ? ["vault","vaultBookmark","gbrainWorkspace","gbrainProfile","gbrainAccess","libraryRoots"] : ["vault","vaultBookmark"]
        var value=config.filter{keys.contains($0.key)}
        if let path=config["vault"] as? String {
            var info=stat()
            if lstat(path,&info)==0 {value["vaultDevice"]=Int64(info.st_dev);value["vaultInode"]=UInt64(info.st_ino)}
            else {value["vaultUnavailable"]=true}
        }
        return digest(try jsonData(value))
    }
    func liveUpdateIdentity()->[String:Any]? {
        guard operationIsRunning("updates"),let owner=try? readJSON(updatePath("owner.json")),
              let request=owner["requestID"] as? String,UUID(uuidString:request) != nil,
              let executor=owner["executorID"] as? String,UUID(uuidString:executor) != nil,
              let operation=owner["operation"] as? String,OracleUpdateCoordinator.operations.contains(operation),
              let pid=owner["ownerPID"] as? Int,pid>0,pid<=Int(Int32.max),
              kill(Int32(pid),0)==0 || errno==EPERM,operationIsRunning("updates") else{return nil}
        if let recorded=try? readJSON(updatePath("requests/"+request+".json")),
           recorded["executorID"] as? String==executor,
           OracleUpdateCoordinator.terminalPhases.contains(recorded["phase"] as? String ?? "") {return nil}
        return owner
    }
    /// Failure publication stays within the owned lease, including partial
    /// component results. Admission failures never enter this method.
    func performAdmittedUpdates(_ execution:OracleUpdateExecution,
                                perform:((Core)throws->[String:Any])?=nil,
                                validate:((Core,String)throws->Void)?=nil) throws -> [String:Any] {
        guard execution.home==home,updateExecution==nil else{throw failure("Admissão de outro perfil ou atualização já em execução.")}
        updateExecution=execution;defer{updateExecution=nil}
        try execution.claim()
        do {
            refreshConfig()
            if let validate {try validate(self,execution.operation)}else{try validateUpdateAccess(operation:execution.operation)}
            try recordUpdate("preparing","Preparando a verificação das atualizações.")
            if let perform {return try perform(self)}
            return try execution.distribution ? performDistributionUpdatesLocked(operation:execution.operation) : performLegacyUpdatesLocked(operation:execution.operation)
        } catch {
            let results=execution.lastSnapshot()["results"] as? [[String:Any]] ?? []
            try? recordUpdate("failed",error.localizedDescription,results:results,
                              diagnostic:(error as? OracleOperationLockError)?.diagnostic ?? [:])
            throw error
        }
    }
    /// CLI entrypoint. Maintenance already owns updates/setup and uses the inner
    /// syncGBrainVault instead, so neither operation lock is acquired twice.
    func syncGBrainVaultWithAdmission() throws -> [String:Any] {
        let updates=try acquireOperationLock("updates");defer{releaseOperationLock(updates)}
        let setup=try acquireOperationLock("setup");defer{releaseOperationLock(setup)}
        return try syncGBrainVault()
    }
}
