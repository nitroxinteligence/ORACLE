import Foundation
import CryptoKit
import Darwin

struct OracleVaultBackupLimits {
    var entries = 100_000
    var bytes: Int64 = 20 * 1024 * 1024 * 1024
    var fileBytes: Int64 = 2 * 1024 * 1024 * 1024
    var seconds: Double = 600
    var manifestBytes = 16 * 1024 * 1024
    var reserveBytes: Int64 = 128 * 1024 * 1024
}

struct OracleVaultBackupEntry: Codable, Equatable {
    let path: String
    let directory: Bool
    let bytes: Int64
    let sha256: String?
}

struct OracleVaultBackupManifest: Codable {
    let schemaVersion: Int
    let owner: String
    let id: String
    let sourceVault: String
    let createdAt: String
    let exclusions: [String]
    let excludedRoots: [String]
    let entries: [OracleVaultBackupEntry]
    let bytes: Int64
}

struct OracleVaultBackupReceipt: Codable {
    let id: String
    let snapshot: String
    let sourceVault: String
    let manifestSHA256: String
    let bytes: Int64
    let files: Int
    let directories: Int
    let fullVault: Bool
    let excludedRoots: [String]
    let createdAt: String
    var projection: [String: Any] {
        ["id": id, "snapshot": snapshot, "sourceVault": sourceVault, "manifestSHA256": manifestSHA256,
         "bytes": bytes, "files": files, "directories": directories, "fullVault": fullVault,
         "excludedRoots": excludedRoots, "excludedSubtreesEnumerated": false, "checkedAt": createdAt,
         "status": "snapshot_verified", "complete": true, "integrityVerified": true,
         "coverage": fullVault ? "all_local_vault_files" : "selected_files_with_explicit_exclusions",
         "scope": "vault_files_and_attachments", "databaseIncluded": false, "network": false,
         "metadataScope": "file_bytes_names_and_empty_directories"]
    }
}

/// Tests inject availability and mutation at explicit boundaries, without changing iCloud flags.
struct OracleVaultBackupHooks {
    var available: ((URL) throws -> Bool)?
    var afterInventory: (() throws -> Void)?
    var beforeRestorePublish: (() throws -> Void)?
    var beforeBackupPublish: (() throws -> Void)?
    var now: () -> Double = { ProcessInfo.processInfo.systemUptime }
}

enum OracleVaultBackupEngine {
    private static let manager = FileManager.default
    private struct Inventory: Equatable {
        let entries: [OracleVaultBackupEntry]
        let stamps: [String: String]
        let excluded: [String]
        let bytes: Int64
    }
    private static func error(_ text: String) -> NSError {
        NSError(domain: "OracleVaultBackup", code: 1, userInfo: [NSLocalizedDescriptionKey: text])
    }
    private static func hash(_ data: Data) -> String { SHA256.hash(data: data).map { String(format: "%02x", $0) }.joined() }
    private static func canonical(_ url: URL) -> URL { url.standardizedFileURL }
    private static func related(_ a: URL, _ b: URL) -> Bool {
        a.path == b.path || a.path.hasPrefix(b.path + "/") || b.path.hasPrefix(a.path + "/")
    }
    static func validPath(_ path: String) -> Bool {
        let pieces = path.split(separator: "/", omittingEmptySubsequences: false)
        return !path.hasPrefix("/") && path.utf8.count <= 4096 && !path.contains("\\") && !path.contains("\0") &&
            path.unicodeScalars.allSatisfy({$0.value>=32 && $0.value != 127}) &&
            !pieces.isEmpty && pieces.count <= 64 && pieces.allSatisfy { !$0.isEmpty && $0 != "." && $0 != ".." && $0.utf8.count <= 255 && !$0.contains(":") }
    }
    static func validateExclusions(_ exclusions: [String]) throws -> [String] {
        guard exclusions.count <= 100, exclusions.reduce(0,{$0+$1.utf8.count})<=32_000,exclusions.allSatisfy(validPath) else { throw error("Use até 100 exclusões e 32 KB de caminhos relativos exatos do vault, sem ../ ou links.") }
        return Array(Set(exclusions)).sorted()
    }
    static func validateDestination(_ destination: URL, outside roots: [URL]) throws {
        let destination = canonical(destination)
        _ = try directory(destination)
        guard manager.isWritableFile(atPath: destination.path), roots.allSatisfy({ !related(destination, canonical($0)) }) else {
            throw error("Escolha uma pasta gravável fora do vault, dos perfis GBrain e do estado do Oracle, sem conter essas origens.")
        }
    }
    private static func directory(_ url: URL) throws -> stat {
        var value = stat()
        guard url.isFileURL, url.resolvingSymlinksInPath().path == canonical(url).path,
              lstat(url.path, &value) == 0, value.st_mode & S_IFMT == S_IFDIR else { throw error("A pasta selecionada está indisponível ou contém links: " + url.path) }
        return value
    }
    private static func stamp(_ value: stat) -> String {
        "\(value.st_dev):\(value.st_ino):\(value.st_mode):\(value.st_size):\(value.st_mtimespec.tv_sec):\(value.st_mtimespec.tv_nsec):\(value.st_ctimespec.tv_sec):\(value.st_ctimespec.tv_nsec):\(value.st_flags)"
    }
    private static func budget(_ start: Double, _ limits: OracleVaultBackupLimits, _ hooks: OracleVaultBackupHooks) throws {
        guard hooks.now() - start <= limits.seconds else { throw error("A operação excedeu \(Int(limits.seconds)) segundos. Nenhum backup completo ou restauro foi confirmado; reduza o escopo e tente novamente.") }
    }
    /// Every component is opened relative to a no-follow directory descriptor.
    private static func openRelative(_ path: String, root: Int32, directory: Bool = false) throws -> Int32 {
        guard validPath(path) else { throw error("Caminho inválido no inventário: " + path) }
        let pieces = path.split(separator: "/").map(String.init)
        var parent = dup(root)
        guard parent >= 0 else { throw error("Não foi possível manter a pasta autorizada aberta.") }
        for (index, piece) in pieces.enumerated() {
            let isDirectory = index < pieces.count - 1 || directory
            let next = openat(parent, piece, O_RDONLY | O_NOFOLLOW | O_NONBLOCK | O_CLOEXEC | (isDirectory ? O_DIRECTORY : 0))
            close(parent)
            guard next >= 0 else { throw error("Arquivo indisponível, alterado ou vinculado: " + path) }
            parent = next
        }
        return parent
    }
    private static func local(_ file: URL, value: stat, hooks: OracleVaultBackupHooks) throws {
        guard value.st_flags & 0x40000000 == 0, try hooks.available?(file) ?? true else {
            throw error("Arquivo somente na nuvem ou indisponível: \(file.path). No Finder, baixe o vault completo antes de repetir o backup.")
        }
        let cloud = try file.resourceValues(forKeys: [.isUbiquitousItemKey, .ubiquitousItemDownloadingStatusKey, .ubiquitousItemDownloadingErrorKey])
        guard cloud.ubiquitousItemDownloadingError == nil,
              cloud.isUbiquitousItem != true || cloud.ubiquitousItemDownloadingStatus == .current else {
            throw error("O iCloud ainda não confirmou a cópia local atual: " + file.path)
        }
    }
    /// Hashes and optionally copies a bounded regular file, checking its identity before and after.
    private static func stream(_ path: String, root: URL, fd: Int32, expectedStamp: String? = nil,
                               outputRoot: Int32? = nil, start: Double, limits: OracleVaultBackupLimits, hooks: OracleVaultBackupHooks) throws -> (String, Int64, String) {
        let file = root.appendingPathComponent(path)
        var named = stat()
        guard lstat(file.path, &named) == 0, named.st_mode & S_IFMT == S_IFREG, named.st_nlink == 1 else { throw error("Arquivo irregular, link ou leitura parcial: " + path) }
        try local(file, value: named, hooks: hooks)
        let input = try openRelative(path, root: fd); defer { close(input) }
        var before = stat(), after = stat()
        guard fstat(input, &before) == 0, stamp(before) == stamp(named), before.st_size >= 0,
              before.st_size <= limits.fileBytes, expectedStamp == nil || expectedStamp == stamp(before) else {
            throw error("Arquivo mudou ou excedeu \(limits.fileBytes) bytes por arquivo: " + path)
        }
        var destination: Int32 = -1
        if let outputRoot {
            let parent = try openParent(path, root: outputRoot); defer { close(parent) }
            destination = openat(parent, URL(fileURLWithPath: path).lastPathComponent, O_WRONLY | O_CREAT | O_EXCL | O_NOFOLLOW | O_CLOEXEC, 0o600)
            guard destination >= 0 else { throw error("Conflito na cópia do snapshot: " + path) }
        }
        defer { if destination >= 0 { close(destination) } }
        var digest = SHA256(), total: Int64 = 0, buffer = [UInt8](repeating: 0, count: 64 * 1024)
        while true {
            try budget(start, limits, hooks)
            let count = Darwin.read(input, &buffer, buffer.count)
            if count < 0 && errno == EINTR { continue }
            guard count >= 0 else { throw error("Falha de leitura; backup incompleto: " + path) }
            if count == 0 { break }
            total += Int64(count)
            guard total <= limits.fileBytes, total <= before.st_size else { throw error("Arquivo cresceu durante a operação: " + path) }
            let data = Data(buffer.prefix(count)); digest.update(data: data)
            if destination >= 0 {
                try data.withUnsafeBytes { bytes in
                    var offset = 0
                    while offset < count {
                        let written = Darwin.write(destination, bytes.baseAddress!.advanced(by: offset), count - offset)
                        if written < 0 && errno == EINTR { continue }
                        guard written > 0 else { throw error("Espaço ou permissão insuficiente ao gravar: " + path) }; offset += written
                    }
                }
            }
        }
        guard total == before.st_size, fstat(input, &after) == 0, stamp(after) == stamp(before),
              lstat(file.path, &named) == 0, stamp(named) == stamp(before) else { throw error("Arquivo alterado durante a leitura; a origem foi preservada: " + path) }
        if destination >= 0 { guard fsync(destination) == 0 else { throw error("Não foi possível sincronizar a cópia local: " + path) } }
        return (digest.finalize().map { String(format: "%02x", $0) }.joined(), total, stamp(before))
    }
    private static func inventory(_ root: URL, exclusions: [String], protectedRoots: [URL], automaticExclusions: Bool = true, cached: Inventory? = nil, start: Double,
                                  limits: OracleVaultBackupLimits, hooks: OracleVaultBackupHooks) throws -> Inventory {
        let initial = try directory(root), rootFD = open(root.path, O_RDONLY | O_DIRECTORY | O_NOFOLLOW | O_CLOEXEC)
        guard rootFD >= 0 else { throw error("Não foi possível abrir todo o vault.") }; defer { close(rootFD) }
        try local(root,value:initial,hooks:hooks)
        var opened = stat();guard fstat(rootFD,&opened)==0,stamp(opened)==stamp(initial) else{throw error("A raiz da origem mudou durante a seleção.")}
        let cachedEntries = Dictionary(uniqueKeysWithValues:(cached?.entries ?? []).map {($0.path,$0)})
        var issue: Error?, entries = [OracleVaultBackupEntry](), stamps = [String: String](), excluded = [String](), seen = Set<String>(), total: Int64 = 0, visited = 0
        guard let enumerator = manager.enumerator(at: root, includingPropertiesForKeys: nil, options: [], errorHandler: { _, error in issue = error; return false }) else { throw error("A enumeração da pasta é parcial.") }
        for case let file as URL in enumerator {
            try budget(start, limits, hooks); visited += 1
            guard visited <= limits.entries else { throw error("A pasta excedeu \(limits.entries) entradas. Configure exclusões explícitas ou reduza o escopo.") }
            let path = String(file.path.dropFirst(root.path.count + 1))
            guard validPath(path), seen.insert(path.precomposedStringWithCanonicalMapping.lowercased()).inserted else { throw error("Caminho inseguro ou colisão de maiúsculas/Unicode: " + path) }
            if exclusions.contains(where: { path == $0 || path.hasPrefix($0 + "/") }) ||
                (automaticExclusions && path.split(separator: "/").contains(".gbrain")) || protectedRoots.contains(where: { file.path == canonical($0).path || file.path.hasPrefix(canonical($0).path + "/") }) {
                excluded.append(path);guard excluded.count<=1000 else{throw error("Mais de 1.000 raízes excluídas; simplifique o escopo antes de repetir.")}; enumerator.skipDescendants(); continue
            }
            var value = stat()
            guard lstat(file.path, &value) == 0 else { throw error("A leitura da pasta ficou parcial: " + path) }
            try local(file, value: value, hooks: hooks)
            if value.st_mode & S_IFMT == S_IFDIR {
                let directoryFD = try openRelative(path, root: rootFD, directory: true); defer { close(directoryFD) }
                var anchored = stat(); guard fstat(directoryFD, &anchored) == 0, stamp(anchored) == stamp(value) else { throw error("A pasta mudou durante o inventário: " + path) }
                entries.append(OracleVaultBackupEntry(path: path, directory: true, bytes: 0, sha256: nil)); stamps[path] = stamp(value)
            } else {
                let sha:String,bytes:Int64,identity:String
                if let cached {
                    let fileFD = try openRelative(path,root:rootFD);defer{close(fileFD)}
                    var fileInfo=stat()
                    guard value.st_mode & S_IFMT == S_IFREG,value.st_nlink==1,fstat(fileFD,&fileInfo)==0,
                          stamp(fileInfo)==stamp(value),cached.stamps[path]==stamp(value),let entry=cachedEntries[path],!entry.directory,let expected=entry.sha256 else{
                        throw error("Um arquivo mudou após o readback final; nada foi publicado: "+path)
                    }
                    sha=expected;bytes=entry.bytes;identity=stamp(value)
                } else { (sha,bytes,identity) = try stream(path, root: root, fd: rootFD, start: start, limits: limits, hooks: hooks) }
                guard bytes <= limits.bytes - total else { throw error("O vault excedeu \(limits.bytes) bytes. O snapshot não foi declarado completo.") }
                total += bytes; entries.append(OracleVaultBackupEntry(path: path, directory: false, bytes: bytes, sha256: sha)); stamps[path] = identity
            }
        }
        if let issue { throw error("A enumeração da pasta ficou parcial: " + issue.localizedDescription) }
        guard stamp(try directory(root)) == stamp(initial) else { throw error("A pasta mudou durante o inventário; repita com o vault estável.") }
        return Inventory(entries: entries.sorted { $0.path < $1.path }, stamps: stamps, excluded: excluded.sorted(), bytes: total)
    }
    private static func space(_ parent: URL, bytes: Int64, limits: OracleVaultBackupLimits) throws {
        let available = try parent.resourceValues(forKeys: [.volumeAvailableCapacityForImportantUsageKey, .volumeAvailableCapacityKey])
        let free = available.volumeAvailableCapacityForImportantUsage ?? available.volumeAvailableCapacity.map(Int64.init) ?? 0
        guard bytes <= Int64.max - limits.reserveBytes, free >= bytes + limits.reserveBytes else { throw error("Libere pelo menos \((bytes + limits.reserveBytes + 1_048_575) / 1_048_576) MiB na pasta escolhida para copiar e verificar o snapshot.") }
    }
    private static func copy(_ source: URL, inventory: Inventory, to target: URL, start: Double, limits: OracleVaultBackupLimits, hooks: OracleVaultBackupHooks) throws {
        try manager.createDirectory(at: target, withIntermediateDirectories: false, attributes: [.posixPermissions: 0o700])
        let fd = open(source.path, O_RDONLY | O_DIRECTORY | O_NOFOLLOW | O_CLOEXEC)
        guard fd >= 0 else { throw error("A origem ficou indisponível durante a cópia.") }; defer { close(fd) }
        let outputFD = open(target.path, O_RDONLY | O_DIRECTORY | O_NOFOLLOW | O_CLOEXEC)
        guard outputFD >= 0 else { throw error("A pasta de cópia ficou indisponível.") }; defer { close(outputFD) }
        for entry in inventory.entries {
            try budget(start, limits, hooks)
            if entry.directory {
                let parent = try openParent(entry.path, root: outputFD); defer { close(parent) }
                guard mkdirat(parent, URL(fileURLWithPath: entry.path).lastPathComponent, 0o700) == 0 else { throw error("Conflito na pasta de cópia: " + entry.path) }
            }
            else {
                let (sha, bytes, _) = try stream(entry.path, root: source, fd: fd, expectedStamp: inventory.stamps[entry.path], outputRoot: outputFD, start: start, limits: limits, hooks: hooks)
                guard sha == entry.sha256, bytes == entry.bytes else { throw error("A cópia não corresponde ao inventário: " + entry.path) }
            }
        }
    }
    private static func openParent(_ path: String, root: Int32) throws -> Int32 {
        let pieces = path.split(separator: "/").dropLast()
        if pieces.isEmpty { let fd = dup(root); guard fd >= 0 else { throw error("Pasta de cópia indisponível.") }; return fd }
        return try openRelative(pieces.joined(separator: "/"), root: root, directory: true)
    }
    private static func publish(_ stage: URL, target: URL, parentIdentity: stat) throws {
        let parent = target.deletingLastPathComponent(), current = try directory(parent)
        guard current.st_dev == parentIdentity.st_dev, current.st_ino == parentIdentity.st_ino else { throw error("A pasta de destino mudou; nenhuma publicação foi feita.") }
        let fd = open(parent.path, O_RDONLY | O_DIRECTORY | O_NOFOLLOW | O_CLOEXEC)
        guard fd >= 0 else { throw error("Destino indisponível para publicação.") }; defer { close(fd) }
        var opened=stat();guard fstat(fd,&opened)==0,opened.st_dev==parentIdentity.st_dev,opened.st_ino==parentIdentity.st_ino else{throw error("A pasta mudou antes da publicação atômica.")}
        guard renameatx_np(fd, stage.lastPathComponent, fd, target.lastPathComponent, UInt32(RENAME_EXCL)) == 0 else { throw error("Um novo item apareceu no destino; ele foi preservado e a operação não foi concluída.") }
        _ = fsync(fd)
    }

    static func create(vault: URL, destination: URL, exclusions: [String] = [], protectedRoots: [URL] = [],
                       destinationForbiddenRoots: [URL] = [], limits: OracleVaultBackupLimits = OracleVaultBackupLimits(), hooks: OracleVaultBackupHooks = OracleVaultBackupHooks()) throws -> OracleVaultBackupReceipt {
        let vault = canonical(vault), destination = canonical(destination), start = hooks.now()
        let exclusions = try validateExclusions(exclusions)
        guard !protectedRoots.contains(where: { vault.path == canonical($0).path || vault.path.hasPrefix(canonical($0).path + "/") }) else { throw error("O vault selecionado está dentro de um estado ativo. Escolha somente o vault de notas e anexos.") }
        try validateDestination(destination, outside: [vault] + protectedRoots + destinationForbiddenRoots)
        let sourceIdentity = try directory(vault), parentIdentity = try directory(destination)
        let initial = try inventory(vault, exclusions: exclusions, protectedRoots: protectedRoots, start: start, limits: limits, hooks: hooks)
        try space(destination, bytes: initial.bytes, limits: limits); try hooks.afterInventory?()
        let id = UUID().uuidString.lowercased(), stage = destination.appendingPathComponent(".oracle-vault-stage-" + id)
        try manager.createDirectory(at: stage, withIntermediateDirectories: false, attributes: [.posixPermissions: 0o700])
        // Failed stages are retained privately, never advertised as a complete snapshot.
        let payload = stage.appendingPathComponent("payload")
        try copy(vault, inventory: initial, to: payload, start: start, limits: limits, hooks: hooks)
        let copied = try inventory(payload, exclusions: [], protectedRoots: [], automaticExclusions: false, start: start, limits: limits, hooks: OracleVaultBackupHooks(now: hooks.now))
        guard copied.entries == initial.entries else { throw error("O readback da cópia não corresponde ao inventário original.") }
        let final = try inventory(vault, exclusions: exclusions, protectedRoots: protectedRoots, start: start, limits: limits, hooks: hooks)
        guard final == initial, stamp(try directory(vault)) == stamp(sourceIdentity) else { throw error("O vault mudou durante o backup. Suas alterações foram preservadas; nenhum sucesso completo foi registrado.") }
        let createdAt = ISO8601DateFormatter().string(from: Date())
        let manifest = OracleVaultBackupManifest(schemaVersion: 1, owner: "OracleCompanion", id: id, sourceVault: vault.path, createdAt: createdAt,
            exclusions: exclusions, excludedRoots: initial.excluded, entries: initial.entries, bytes: initial.bytes)
        let encoder = JSONEncoder(); encoder.outputFormatting = [.sortedKeys]
        let data = try encoder.encode(manifest)
        guard data.count <= limits.manifestBytes else { throw error("O inventário excedeu \(limits.manifestBytes) bytes; reduza o escopo.") }
        try data.write(to: stage.appendingPathComponent("manifest.json"), options: .withoutOverwriting)
        guard try Data(contentsOf: stage.appendingPathComponent("manifest.json")) == data else { throw error("O manifesto não passou no readback final.") }
        try budget(start, limits, hooks)
        try hooks.beforeBackupPublish?()
        guard try inventory(vault,exclusions:exclusions,protectedRoots:protectedRoots,cached:initial,start:start,limits:limits,hooks:hooks)==initial,
              stamp(try directory(vault))==stamp(sourceIdentity) else{throw error("A origem mudou antes da publicação; nenhuma conclusão foi registrada.")}
        let snapshot = destination.appendingPathComponent("Oracle-vault-backup-" + id)
        try publish(stage, target: snapshot, parentIdentity: parentIdentity)
        return OracleVaultBackupReceipt(id: id, snapshot: snapshot.path, sourceVault: vault.path, manifestSHA256: hash(data), bytes: initial.bytes,
            files: initial.entries.filter { !$0.directory }.count, directories: initial.entries.filter { $0.directory }.count,
            fullVault: initial.excluded.isEmpty, excludedRoots: initial.excluded, createdAt: createdAt)
    }

    static func restore(_ receipt: OracleVaultBackupReceipt, destination: URL, confirmed: Bool, forbiddenRoots: [URL] = [],
                        limits: OracleVaultBackupLimits = OracleVaultBackupLimits(), hooks: OracleVaultBackupHooks = OracleVaultBackupHooks()) throws -> [String: Any] {
        guard confirmed else { throw error("Confirme explicitamente a restauração em uma nova pasta vazia. Nenhum vault existente será substituído.") }
        let snapshot = canonical(URL(fileURLWithPath: receipt.snapshot)), destination = canonical(destination), start = hooks.now()
        guard UUID(uuidString: receipt.id)?.uuidString.lowercased() == receipt.id, snapshot.lastPathComponent == "Oracle-vault-backup-" + receipt.id,
              receipt.snapshot.hasPrefix("/"), snapshot.path == receipt.snapshot, receipt.sourceVault.hasPrefix("/"),
              canonical(URL(fileURLWithPath:receipt.sourceVault)).path == receipt.sourceVault,
              receipt.manifestSHA256.range(of:"^[a-f0-9]{64}$",options:.regularExpression) != nil,
              receipt.bytes >= 0, receipt.bytes <= limits.bytes else { throw error("Snapshot sem vínculo de autoria reconhecido.") }
        try validateDestination(destination, outside: [snapshot.deletingLastPathComponent(), URL(fileURLWithPath: receipt.sourceVault)] + forbiddenRoots)
        let selected = try directory(destination), parent = destination.deletingLastPathComponent(), parentIdentity = try directory(parent)
        guard try manager.contentsOfDirectory(atPath: destination.path).isEmpty else { throw error("A pasta de restauração precisa estar vazia. Os arquivos existentes foram preservados.") }
        guard Set(try manager.contentsOfDirectory(atPath:snapshot.path)) == Set(["manifest.json","payload"]) else { throw error("O snapshot contém itens inesperados; revise a cópia antes de restaurar.") }
        let snapshotFD = try openSnapshot(snapshot); defer { close(snapshotFD) }
        let manifestFD = try openRelative("manifest.json", root: snapshotFD); defer { close(manifestFD) }
        var info = stat(); guard fstat(manifestFD, &info) == 0, info.st_mode & S_IFMT == S_IFREG, info.st_nlink == 1,
            info.st_size >= 0, info.st_size <= limits.manifestBytes, info.st_flags & 0x40000000 == 0 else { throw error("Manifesto indisponível ou fora do limite.") }
        let handle = FileHandle(fileDescriptor:manifestFD,closeOnDealloc:false)
        let data = try handle.read(upToCount:limits.manifestBytes+1) ?? Data()
        var after = stat()
        guard data.count==info.st_size, fstat(manifestFD,&after)==0,stamp(after)==stamp(info) else{throw error("O manifesto mudou durante a leitura.")}
        guard hash(data) == receipt.manifestSHA256 else { throw error("O manifesto do snapshot foi alterado. A restauração não começou.") }
        let manifest = try JSONDecoder().decode(OracleVaultBackupManifest.self, from: data)
        guard manifest.schemaVersion == 1, manifest.owner == "OracleCompanion", manifest.id == receipt.id,
              manifest.sourceVault == receipt.sourceVault, manifest.bytes == receipt.bytes,
              manifest.entries.count <= limits.entries,manifest.excludedRoots==receipt.excludedRoots,
              receipt.fullVault==manifest.excludedRoots.isEmpty,
              receipt.files==manifest.entries.filter({!$0.directory}).count,
              receipt.directories==manifest.entries.filter({$0.directory}).count else { throw error("O manifesto não pertence ao recibo deste vault.") }
        var names=Set<String>(),counted:Int64=0
        for entry in manifest.entries {
            guard validPath(entry.path),names.insert(entry.path.precomposedStringWithCanonicalMapping.lowercased()).inserted,
                  entry.bytes>=0,entry.bytes<=limits.fileBytes,entry.bytes<=limits.bytes-counted,
                  entry.directory ? (entry.bytes==0 && entry.sha256==nil) : (entry.sha256?.range(of:"^[a-f0-9]{64}$",options:.regularExpression) != nil) else{
                throw error("O manifesto contém caminho inseguro, colisão ou conteúdo sem hash válido.")
            }; counted+=entry.bytes
        }
        guard counted==manifest.bytes else{throw error("O tamanho agregado do manifesto não é válido.")}
        let payload = snapshot.appendingPathComponent("payload")
        let original = try inventory(payload, exclusions: [], protectedRoots: [], automaticExclusions: false, start: start, limits: limits, hooks: hooks)
        guard original.entries == manifest.entries, original.bytes == manifest.bytes else { throw error("Arquivos, anexos ou diretórios do snapshot não passaram na integridade SHA-256.") }
        try space(parent, bytes: original.bytes, limits: limits)
        let stage = parent.appendingPathComponent(".oracle-vault-restore-" + UUID().uuidString.lowercased())
        try copy(payload, inventory: original, to: stage, start: start, limits: limits, hooks: hooks)
        let readback = try inventory(stage, exclusions: [], protectedRoots: [], automaticExclusions: false, start: start, limits: limits, hooks: hooks)
        guard readback.entries == original.entries, try inventory(payload, exclusions: [], protectedRoots: [], automaticExclusions: false, start: start, limits: limits, hooks: hooks) == original else { throw error("A cópia ou o snapshot mudou durante o restauro.") }
        try hooks.beforeRestorePublish?(); try budget(start, limits, hooks)
        let current = try directory(destination)
        guard current.st_dev == selected.st_dev, current.st_ino == selected.st_ino,
              try manager.contentsOfDirectory(atPath: destination.path).isEmpty else { throw error("A pasta escolhida mudou ou recebeu novos arquivos. Esses arquivos foram preservados.") }
        // rmdir fails if an external writer adds a note. Exclusive rename also
        // fails if another directory appears in the gap; no notes are overwritten.
        let parentFD=open(parent.path,O_RDONLY|O_DIRECTORY|O_NOFOLLOW|O_CLOEXEC)
        guard parentFD>=0 else{throw error("A pasta do restauro ficou indisponível.")};defer{close(parentFD)}
        var anchored=stat(),selectedNow=stat()
        guard fstat(parentFD,&anchored)==0,anchored.st_dev==parentIdentity.st_dev,anchored.st_ino==parentIdentity.st_ino,
              fstatat(parentFD,destination.lastPathComponent,&selectedNow,AT_SYMLINK_NOFOLLOW)==0,
              selectedNow.st_dev==selected.st_dev,selectedNow.st_ino==selected.st_ino else{throw error("A pasta selecionada mudou antes da publicação e foi preservada.")}
        guard unlinkat(parentFD,destination.lastPathComponent,AT_REMOVEDIR) == 0 else { throw error("Um arquivo apareceu na pasta escolhida e foi preservado; o restauro não foi publicado.") }
        try publish(stage, target: destination, parentIdentity: parentIdentity)
        return ["status": "restore_verified", "complete": true, "integrityVerified": true, "destination": destination.path,
                "id": receipt.id, "files": receipt.files, "bytes": receipt.bytes, "fullVault": receipt.fullVault,
                "excludedRoots": receipt.excludedRoots, "sourceVaultUnchanged": true, "network": false]
    }
    private static func openSnapshot(_ snapshot: URL) throws -> Int32 {
        _ = try directory(snapshot)
        let fd = open(snapshot.path, O_RDONLY | O_DIRECTORY | O_NOFOLLOW | O_CLOEXEC)
        guard fd >= 0 else { throw error("O snapshot não está acessível localmente.") }; return fd
    }
}
