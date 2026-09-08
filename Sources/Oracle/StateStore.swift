import Foundation
import Darwin

extension Core {
    func acquireOperationLock(_ name:String) throws -> Int32 {
        let directory=home.appendingPathComponent("setup/locks")
        try fm.createDirectory(at:directory,withIntermediateDirectories:true)
        let url=directory.appendingPathComponent(name+".lock")
        let fd=Darwin.open(url.path,O_CREAT|O_RDWR,S_IRUSR|S_IWUSR)
        guard fd>=0 else { throw failure("Não foi possível abrir o bloqueio de operação") }
        guard flock(fd,LOCK_EX|LOCK_NB)==0 else { Darwin.close(fd);throw failure("Configuração em andamento no Codex. Aguarde ou interrompa essa operação antes de alterar o plano.") }
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
        let fd=Darwin.open(home.appendingPathComponent("config.lock").path,O_CREAT|O_RDWR,S_IRUSR|S_IWUSR)
        guard fd>=0 else { throw failure("Não foi possível salvar as preferências") }
        defer { flock(fd,LOCK_UN);Darwin.close(fd) }
        guard flock(fd,LOCK_EX)==0 else { throw failure("Preferências ocupadas") }
        var latest=(try? readJSON(home.appendingPathComponent("config.json"))) ?? [:]
        func equal(_ a:Any?,_ b:Any?)->Bool { NSDictionary(dictionary:["v":a ?? NSNull()]).isEqual(to:["v":b ?? NSNull()]) }
        for key in Set(config.keys).union(configBaseline.keys) where !equal(config[key],configBaseline[key]) {
            guard equal(latest[key],configBaseline[key]) || equal(latest[key],config[key]) else { throw failure("A configuração mudou em outra operação. Atualize a janela antes de salvar novamente.") }
            latest[key]=config[key]
        }
        try writeJSON(latest,home.appendingPathComponent("config.json"));config=latest;configBaseline=latest
    }
}
