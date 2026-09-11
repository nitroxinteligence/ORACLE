import Foundation
import CoreServices

/// Native freshness authority. UI polling only reads cached projections. The
/// filesystem observer, bounded scans and official engine work have separate lanes.
final class MemorySyncCoordinator {
    let home:URL
    private let mutex=NSLock()
    private let scanQueue=DispatchQueue(label:"oracle.memory.scan",qos:.utility)
    private let indexQueue=DispatchQueue(label:"oracle.memory.index",qos:.utility)
    private var timer:DispatchSourceTimer?
    private var observer:NSObjectProtocol?
    private var watcher:FSEventStreamRef?
    private var watchedRoot:String?
    private var active=false,scanPending=false,indexing=false,blocked=false
    private var generation=0,indexedGeneration:Int?,attempts=0
    private var selectedRoot:String?,cached:VaultScanSnapshot?
    private var currentState="stale",reason="Aguardando verificação local",lastError:String?
    private var lastIndexed:Date?,lastDeepCheck=Date.distantPast
    private var watcherAvailable=false
    private var cancellationURL:URL { home.appendingPathComponent("memory-sync/cancel") }

    init(home:URL) { self.home=home }
    deinit {
        timer?.cancel()
        if let observer { NotificationCenter.default.removeObserver(observer) }
        if let watcher { FSEventStreamStop(watcher);FSEventStreamInvalidate(watcher);FSEventStreamRelease(watcher) }
    }
    private func locked<T>(_ body:()->T)->T { mutex.lock();defer{mutex.unlock()};return body() }

    func start() {
        let shouldStart=locked { ()->Bool in if active { return false };active=true;return true }
        guard shouldStart else { return }
        try? fm.removeItem(at:cancellationURL)
        if observer == nil {
            observer=NotificationCenter.default.addObserver(forName:.oracleVaultChanged,object:nil,queue:nil) { [weak self] notice in
                guard let self,notice.userInfo?["home"] as? String == self.home.path else { return }
                self.invalidate(reason:notice.userInfo?["reason"] as? String ?? "vault-write")
            }
        }
        let periodic=DispatchSource.makeTimerSource(queue:scanQueue)
        periodic.schedule(deadline:.now()+30,repeating:30,leeway:.seconds(3))
        periodic.setEventHandler { [weak self] in self?.requestScan() }
        timer=periodic;periodic.resume();requestScan()
    }

    func stop() {
        let wasActive=locked { ()->Bool in let old=active;active=false;generation+=1;currentState="stale";return old }
        guard wasActive else { return }
        try? fm.createDirectory(at:cancellationURL.deletingLastPathComponent(),withIntermediateDirectories:true)
        try? atomicWriteData(Data("cancel".utf8),to:cancellationURL)
        timer?.cancel();timer=nil
        scanQueue.async { [weak self] in self?.stopWatcher() }
    }

    func invalidate(reason:String) {
        locked {
            generation+=1;attempts=0;blocked=false;self.reason=reason;lastError=nil
            currentState="stale"
        }
        requestScan()
    }

    func status()->[String:Any] {
        locked {
            ["state":currentState,"active":active,"generation":generation,"indexedGeneration":indexedGeneration.map{ $0 as Any } ?? NSNull(),
             "indexing":indexing,"scanComplete":cached?.complete ?? false,"scanPending":scanPending,
             "lastScanAt":cached?.at.timeIntervalSince1970 as Any? ?? NSNull(),
             "lastIndexedAt":lastIndexed?.timeIntervalSince1970 as Any? ?? NSNull(),
             "reason":reason,"error":lastError as Any? ?? NSNull(),"watcherAvailable":watcherAvailable,
             "periodicScanSeconds":30,"deepVerificationSeconds":300,"resumeAttempts":attempts,
             "maxResumeAttempts":8,"coverage":"Markdown local; hashes verificados antes de abrir; sem inferência remota"]
        }
    }

    func cachedSnapshot(root:URL)->[String:Any] {
        let canonical=root.resolvingSymlinksInPath().path
        let changed=locked { ()->Bool in
            guard selectedRoot != canonical else { return false }
            selectedRoot=canonical;cached=nil;generation+=1;attempts=0;blocked=false;currentState="stale";return true
        }
        // Cache reads never authorize background work. A UI snapshot already
        // queued before app lock must not restart indexing after stop().
        if changed { requestScan() }
        return locked {
            guard let cached,cached.root.path == canonical else {
                return ["entries":[],"scan":["complete":false,"pending":true,"issues":[]]]
            }
            var result:[String:Any]=["entries":cached.entries,"scan":cached.metadata]
            if !cached.complete { result["scanError"]="Leitura parcial: \(cached.issues.count) problemas. Os itens encontrados continuam disponíveis; nenhuma exclusão será reconciliada." }
            return result
        }
    }

    private func requestScan() {
        let schedule=locked { ()->Bool in
            guard active,!scanPending else { return false };scanPending=true;return true
        }
        if schedule { scanQueue.asyncAfter(deadline:.now()+0.6) { [weak self] in self?.scan() } }
    }

    private func scan() {
        defer { locked { scanPending=false } }
        guard locked({active}) else { return }
        do {
            let core=try Core(home:home)
            guard let root=try? core.vault() else {
                locked { cached=nil;selectedRoot=nil;currentState="unavailable";reason="Selecione uma pasta do Obsidian" }
                stopWatcher();return
            }
            let canonical=root.resolvingSymlinksInPath()
            if watchedRoot != canonical.path { installWatcher(root:canonical) }
            let snapshot=try core.scanSnapshot(root:canonical)
            var shouldIndex=false,targetGeneration=0
            locked {
                let changed=cached?.signature != snapshot.signature || cached?.complete != snapshot.complete || selectedRoot != canonical.path
                if changed { generation+=1;attempts=0;blocked=false;currentState="stale" }
                selectedRoot=canonical.path;cached=snapshot
                if !snapshot.complete { currentState="partial";reason="Leitura parcial; exclusões suspensas" }
                if core.config["gbrainWorkspace"] != nil { currentState="external";reason="Perfil externo: Oracle não reindexa um banco que não possui" }
                else if core.config["gbrainAccess"] as? Bool != true || core.config["gbrainVaultSource"] as? String != "oracle-vault" {
                    currentState="unavailable";reason="Índice local ainda não configurado"
                } else {
                    let due=Date().timeIntervalSince(lastDeepCheck)>=300
                    if due && !blocked && !indexing { generation+=1;attempts=0;currentState=snapshot.complete ? "stale" : "partial";lastDeepCheck=Date() }
                    shouldIndex = !indexing && !blocked && attempts<8 && (indexedGeneration != generation || due)
                    if shouldIndex { indexing=true;attempts+=1;reason="Verificando memória em tarefa local separada" }
                }
                targetGeneration=generation
            }
            if shouldIndex { queueIndex(snapshot,generation:targetGeneration) }
        } catch {
            locked { currentState="partial";lastError=error.localizedDescription;reason="Não foi possível verificar a pasta; dados preservados" }
        }
    }

    private func queueIndex(_ snapshot:VaultScanSnapshot,generation target:Int) {
        indexQueue.async { [weak self] in
            guard let self else { return }
            var resume=false
            do {
                guard self.locked({self.active && self.generation == target}) else { self.locked { self.indexing=false };self.requestScan();return }
                let core=try Core(home:self.home)
                let setup=try core.acquireOperationLock("setup");defer{core.releaseOperationLock(setup)}
                let updates=try core.acquireOperationLock("updates");defer{core.releaseOperationLock(updates)}
                let operation=try core.acquireOperationLock("gbrain");defer{core.releaseOperationLock(operation)}
                // Another state or a changed selection must not borrow this snapshot.
                guard try core.vault().resolvingSymlinksInPath() == snapshot.root,core.config["gbrainWorkspace"] == nil else { throw failure("A seleção da memória mudou") }
                let result=try core.indexVaultSnapshot(snapshot,generation:target,cancellation:self.cancellationURL)
                self.locked {
                    self.indexing=false
                    guard self.active else { return }
                    guard self.generation == target else { resume=true;return }
                    if result["complete"] as? Bool == true {
                        self.indexedGeneration=target;self.currentState="current";self.lastIndexed=Date();self.reason="Snapshot completo verificado";self.lastError=nil
                    } else {
                        self.currentState="partial";self.reason="Índice parcial; checkpoint preservado"
                        self.lastError=(result["failures"] as? [[String:Any]])?.first?["error"] as? String
                        resume=result["needs_resume"] as? Bool == true && self.attempts<8
                        self.blocked = !resume
                    }
                }
            } catch {
                self.locked { self.indexing=false;self.currentState="partial";self.lastError=error.localizedDescription;self.reason="Memória aguardando nova verificação" }
                // Lock conflicts are retried by the bounded periodic scan, not a busy loop.
            }
            if resume { self.scanQueue.asyncAfter(deadline:.now()+2) { [weak self] in self?.requestScan() } }
        }
    }

    private func stopWatcher() {
        if let watcher { FSEventStreamStop(watcher);FSEventStreamInvalidate(watcher);FSEventStreamRelease(watcher) }
        watcher=nil;watchedRoot=nil;locked { watcherAvailable=false }
    }
    private func installWatcher(root:URL) {
        stopWatcher()
        var context=FSEventStreamContext(version:0,info:Unmanaged.passUnretained(self).toOpaque(),retain:nil,release:nil,copyDescription:nil)
        let flags=FSEventStreamCreateFlags(kFSEventStreamCreateFlagFileEvents|kFSEventStreamCreateFlagWatchRoot|kFSEventStreamCreateFlagNoDefer|kFSEventStreamCreateFlagUseCFTypes)
        watcher=FSEventStreamCreate(kCFAllocatorDefault,{ _,info,count,paths,eventFlags,_ in
            guard let info else { return }
            let owner=Unmanaged<MemorySyncCoordinator>.fromOpaque(info).takeUnretainedValue()
            let changed=unsafeBitCast(paths,to:NSArray.self) as? [String] ?? []
            let rescanFlags=FSEventStreamEventFlags(kFSEventStreamEventFlagMustScanSubDirs|kFSEventStreamEventFlagUserDropped|kFSEventStreamEventFlagKernelDropped|kFSEventStreamEventFlagEventIdsWrapped|kFSEventStreamEventFlagRootChanged)
            for index in 0..<count {
                if eventFlags[index] & rescanFlags != 0 { owner.invalidate(reason:"filesystem-observation-gap");return }
                guard index<changed.count,let root=owner.watchedRoot else { continue }
                let path=changed[index]
                if path == root { owner.invalidate(reason:"vault-directory-change");return }
                guard path.hasPrefix(root+"/") else { continue }
                let components=String(path.dropFirst(root.count+1)).split(separator:"/")
                // Obsidian's workspace JSON and dependency caches can change
                // constantly. They are outside the indexed scope, not new notes.
                if components.contains(where:{ $0.hasPrefix(".") || ["node_modules","vendor","dist","build"].contains(String($0)) }) { continue }
                if eventFlags[index] & FSEventStreamEventFlags(kFSEventStreamEventFlagItemIsDir) != 0 || URL(fileURLWithPath:path).pathExtension.lowercased() == "md" {
                    owner.invalidate(reason:"external-filesystem-change");return
                }
            }
        },&context,[root.path] as CFArray,FSEventStreamEventId(kFSEventStreamEventIdSinceNow),0.5,flags)
        if let watcher {
            FSEventStreamSetDispatchQueue(watcher,scanQueue)
            let available=FSEventStreamStart(watcher)
            watchedRoot=root.path;locked { watcherAvailable=available }
        }
    }
}
