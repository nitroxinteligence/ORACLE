import Foundation
import Darwin

/// Publish complete bytes through a sibling temporary file, never Foundation's
/// volume-wide replacement directory. Callers still own their operation lock
/// and content-level conflict policy. Existing POSIX permissions are retained.
func atomicWriteData(_ data:Data,to url:URL,permissions:mode_t?=nil) throws {
    let parent=url.deletingLastPathComponent(),name=url.lastPathComponent
    guard !name.isEmpty,name != ".",name != "..",!name.contains("/"),!name.contains("\0") else {throw failure("Nome de arquivo inválido.")}
    func error(_ phase:String)->NSError {NSError(domain:NSPOSIXErrorDomain,code:Int(errno),userInfo:[NSLocalizedDescriptionKey:"Não foi possível \(phase) \(name)."])}
    let directory=Darwin.open(parent.path,O_RDONLY|O_DIRECTORY|O_NOFOLLOW|O_CLOEXEC)
    guard directory>=0 else{throw error("abrir a pasta de")}
    defer{Darwin.close(directory)}
    var prior=stat()
    let exists=fstatat(directory,name,&prior,AT_SYMLINK_NOFOLLOW)==0
    guard exists || errno==ENOENT else{throw error("verificar")}
    if exists {
        guard prior.st_mode & S_IFMT==S_IFREG,prior.st_nlink==1 else{throw failure("Arquivo irregular ou vinculado preservado: \(name).")}
    }
    let mode=permissions ?? (exists ? prior.st_mode & 0o777 : mode_t(0o600))
    let temporary=".oracle-write-"+UUID().uuidString
    let fd=Darwin.openat(directory,temporary,O_WRONLY|O_CREAT|O_EXCL|O_NOFOLLOW|O_CLOEXEC,mode_t(0o600))
    guard fd>=0 else{throw error("preparar")}
    defer{Darwin.close(fd);unlinkat(directory,temporary,0)}
    try data.withUnsafeBytes { buffer in
        guard let pointer=buffer.baseAddress else{return}
        var offset=0
        while offset<buffer.count {
            let written=Darwin.write(fd,pointer.advanced(by:offset),buffer.count-offset)
            if written<0,errno==EINTR {continue}
            guard written>0 else{throw error("gravar")}
            offset += written
        }
    }
    guard fchmod(fd,mode)==0,fsync(fd)==0 else{throw error("sincronizar")}
    var current=stat()
    let stillExists=fstatat(directory,name,&current,AT_SYMLINK_NOFOLLOW)==0
    guard stillExists || errno==ENOENT else{throw error("rever")}
    if exists {
        guard stillExists,current.st_dev==prior.st_dev,current.st_ino==prior.st_ino,
              current.st_size==prior.st_size,current.st_mtimespec.tv_sec==prior.st_mtimespec.tv_sec,
              current.st_mtimespec.tv_nsec==prior.st_mtimespec.tv_nsec,
              current.st_ctimespec.tv_sec==prior.st_ctimespec.tv_sec,current.st_ctimespec.tv_nsec==prior.st_ctimespec.tv_nsec else {
            throw failure("O arquivo mudou durante a gravação; a versão atual foi preservada: \(name).")
        }
        guard renameat(directory,temporary,directory,name)==0 else{throw error("substituir")}
    } else {
        // linkat publishes a new file only if the destination is still absent.
        // The temporary sibling is removed by defer before returning.
        guard !stillExists else{throw failure("Um novo arquivo apareceu no destino e foi preservado: \(name).")}
        guard linkat(directory,temporary,directory,name,0)==0 else{throw error("publicar")}
    }
    // Directory fsync is not supported by every macOS filesystem. The file's
    // fsync above is required; a verified caller receipt covers retry semantics.
    _=fsync(directory)
}
