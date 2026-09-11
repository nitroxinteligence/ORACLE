import Foundation
import Darwin

extension Core {
    /// One kernel lock on the selected directory inode, shared even by different
    /// Oracle state directories. No lock file or other metadata is put in the vault.
    /// Only nested calls through THIS wrapper on the same thread are reentrant.
    func withVaultWrite<T>(_ body: () throws -> T) throws -> T {
        let root = try vault().resolvingSymlinksInPath()
        let key = "oracle.vault-write." + digest(Data(root.path.utf8))
        let dictionary = Thread.current.threadDictionary
        if dictionary[key] != nil { return try body() }
        let descriptor = Darwin.open(root.path, O_RDONLY | O_DIRECTORY | O_NOFOLLOW | O_CLOEXEC)
        guard descriptor >= 0 else { throw failure("A pasta do Obsidian está indisponível para gravação.") }
        defer { Darwin.close(descriptor) }
        guard flock(descriptor, LOCK_EX | LOCK_NB) == 0 else {
            throw failure("Outra operação está alterando esta pasta. Sua edição foi preservada; tente novamente após a operação terminar.")
        }
        dictionary[key] = descriptor
        defer { dictionary.removeObject(forKey:key); flock(descriptor, LOCK_UN) }
        return try body()
    }

    /// File coordination complements the process lock: cooperating external
    /// document writers are serialized too. Callers still compare hashes inside.
    func coordinatedWrite<T>(at url:URL, options:NSFileCoordinator.WritingOptions = .forReplacing,
                             _ body:(URL)throws->T) throws -> T {
        var coordinationError:NSError?
        var result:Result<T,Error>?
        NSFileCoordinator(filePresenter:nil).coordinate(writingItemAt:url,options:options,error:&coordinationError) {
            destination in result = Result { try body(destination) }
        }
        if let coordinationError { throw coordinationError }
        guard let result else { throw failure("Não foi possível coordenar a gravação; nenhum arquivo foi sobrescrito.") }
        return try result.get()
    }

    func notifyVaultChanged(reason:String) {
        NotificationCenter.default.post(name:.oracleVaultChanged,object:nil,
                                        userInfo:["home":home.path,"reason":reason])
    }

    /// rmdir is atomic and refuses nonempty directories. FileManager.removeItem
    /// would recursively delete a note created after an earlier empty check.
    func removeEmptyVaultDirectory(_ url:URL) throws -> Bool {
        guard fm.fileExists(atPath:url.path) else { return false }
        return try coordinatedWrite(at:url,options:.forDeleting) { destination in
            if Darwin.rmdir(destination.path) == 0 { return true }
            if [ENOTEMPTY,EEXIST,ENOENT,ENOTDIR].contains(errno) { return false }
            throw failure("Pasta preservada: não foi possível confirmar a remoção vazia.")
        }
    }

    func acquireOperationLock(_ name:String) throws -> Int32 {
        guard name.range(of:"^[a-z0-9-]{1,64}$",options:.regularExpression) != nil else { throw failure("Bloqueio inválido") }
        let directory=home.appendingPathComponent("setup/locks")
        try fm.createDirectory(at:directory,withIntermediateDirectories:true)
        let url=directory.appendingPathComponent(name+".lock")
        let fd=Darwin.open(url.path,O_CREAT|O_RDWR|O_CLOEXEC|O_NOFOLLOW,S_IRUSR|S_IWUSR)
        guard fd>=0 else { throw failure("Não foi possível abrir o bloqueio de operação") }
        guard flock(fd,LOCK_EX|LOCK_NB)==0 else { Darwin.close(fd);throw failure("Outra operação está em andamento. Os arquivos foram preservados; tente novamente após a conclusão.") }
        return fd
    }
    func releaseOperationLock(_ fd:Int32) { flock(fd,LOCK_UN);Darwin.close(fd) }
    func operationIsRunning(_ name:String) -> Bool {
        let url=home.appendingPathComponent("setup/locks/"+name+".lock")
        let fd=Darwin.open(url.path,O_RDONLY)
        guard fd>=0 else { return false }
        defer { Darwin.close(fd) }
        if flock(fd,LOCK_EX|LOCK_NB)==0 { flock(fd,LOCK_UN);return false }
        return errno==EWOULDBLOCK
    }
    func refreshConfig() {
        if let fresh=try? readJSON(home.appendingPathComponent("config.json")) { config=fresh;configBaseline=fresh }
    }
    func persistMergedConfig() throws {
        let fd=Darwin.open(home.appendingPathComponent("config.lock").path,O_CREAT|O_RDWR|O_CLOEXEC|O_NOFOLLOW,S_IRUSR|S_IWUSR)
        guard fd>=0 else { throw failure("Não foi possível salvar as preferências") }
        defer { flock(fd,LOCK_UN);Darwin.close(fd) }
        guard flock(fd,LOCK_EX|LOCK_NB)==0 else { throw failure("Preferências ocupadas; tente salvar novamente.") }
        var latest=(try? readJSON(home.appendingPathComponent("config.json"))) ?? [:]
        func equal(_ a:Any?,_ b:Any?)->Bool { NSDictionary(dictionary:["v":a ?? NSNull()]).isEqual(to:["v":b ?? NSNull()]) }
        for key in Set(config.keys).union(configBaseline.keys) where !equal(config[key],configBaseline[key]) {
            guard equal(latest[key],configBaseline[key]) || equal(latest[key],config[key]) else { throw failure("A configuração mudou em outra operação. Atualize a janela antes de salvar novamente.") }
            latest[key]=config[key]
        }
        try writeJSON(latest,home.appendingPathComponent("config.json"));config=latest;configBaseline=latest
    }
}
