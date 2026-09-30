import Foundation
import CryptoKit
import Darwin

struct AIMemoryExportConsent: Codable {
    var enabled: Bool
    var source: String?
    var vault: String
    var includeSessions: Bool
    var revision: String
}
struct AIMemoryExportCandidate: Codable {
    let id: String
    let path: String
    let title: String
    let type: String
    let tier: String
    let sha256: String
    let bytes: Int
    let sourceVersion: String
    var projection: [String: Any] {
        ["id": id, "path": path, "title": title, "type": type, "tier": tier,
         "sha256": sha256, "bytes": bytes, "sourceVersion": sourceVersion, "eligible": true]
    }
}
struct AIMemoryExportHooks {
    var validateConsent: (() throws -> Void)?
    var beforeRecheck: (() throws -> Void)?
    var afterWrite: (() throws -> Void)?
}

/// Manual one-way copy. The SQLite state, capture hooks and search index are not involved.
enum OracleAIMemoryVaultExportEngine {
    static let fileLimit = 2_000_000
    static let entryLimit = 5_000
    static let batchLimit = 100
    static let batchBytes = 16_000_000
    static let scanBytes: Int64 = 64_000_000
    static let scanSeconds: Double = 15
    private static let fm = FileManager.default
    private struct Entry: Codable {
        let id: String
        let source: String
        let path: String
        let destination: String
        let sha256: String
        let sourceVersion: String
    }
    private struct Manifest: Codable {
        var schemaVersion = 1
        var vault: String
        var entries: [String: Entry] = [:]
        // Permanent foreign markers record identity/path only, never human content hashes.
        var foreign: [String: String]? = nil
    }
    private struct Journal: Codable {
        let revision: String
        let vault: String
        let entry: Entry
        let priorHash: String?
    }
    private static func fail(_ message: String) -> NSError {
        NSError(domain: "OracleAIMemoryVaultExport", code: 1, userInfo: [NSLocalizedDescriptionKey: message])
    }
    static func hash(_ data: Data) -> String { SHA256.hash(data: data).map { String(format: "%02x", $0) }.joined() }
    static func validPath(_ path: String) -> Bool {
        let parts = path.split(separator: "/", omittingEmptySubsequences: false)
        return !path.hasPrefix("/") && !path.contains("\\") && !path.contains(":") && !path.contains("\0") && path.utf8.count <= 4096 && parts.count <= 32 && parts.allSatisfy { !$0.isEmpty && $0 != "." && $0 != ".." && $0.utf8.count <= 255 }
    }
    static func directory(_ url: URL) throws {
        var s = stat()
        guard url.isFileURL, url.standardizedFileURL.path == url.resolvingSymlinksInPath().path,
              lstat(url.path, &s) == 0, s.st_mode & S_IFMT == S_IFDIR else { throw fail("Pasta indisponível ou com link simbólico.") }
    }
    static func validateSource(_ source: URL, vault: URL) throws -> (String, String) {
        try directory(source); try directory(vault)
        let project = source.lastPathComponent, workspace = source.deletingLastPathComponent().lastPathComponent
        guard UUID(uuidString: project) != nil, UUID(uuidString: workspace) != nil,
              source.deletingLastPathComponent().deletingLastPathComponent().lastPathComponent == "wiki",
              !source.path.hasPrefix(vault.path + "/"), !vault.path.hasPrefix(source.path + "/"), source.path != vault.path else {
            throw fail("Escolha explicitamente wiki/workspaceUUID/projectUUID de uma instalação AI Memory fora do vault.")
        }
        return (workspace, project)
    }
    private static func path(_ relative: String, root: URL) throws -> URL {
        guard validPath(relative) else { throw fail("Caminho inválido.") }
        try directory(root)
        var current = root
        for piece in relative.split(separator: "/") {
            let names = (try? fm.contentsOfDirectory(atPath: current.path)) ?? []
            let folded = String(piece).precomposedStringWithCanonicalMapping.lowercased()
            guard !names.contains(where: { $0 != String(piece) && $0.precomposedStringWithCanonicalMapping.lowercased() == folded }) else { throw fail("Colisão de maiúsculas ou Unicode no caminho.") }
            current.appendPathComponent(String(piece))
            var s = stat()
            if lstat(current.path, &s) == 0 && s.st_mode & S_IFMT == S_IFLNK { throw fail("Links simbólicos não são exportados.") }
        }
        guard current.standardizedFileURL.path == current.resolvingSymlinksInPath().path else { throw fail("Caminho fora do escopo.") }
        return current
    }
    /// Open every absolute path component without following links. A parent
    /// swap cannot redirect an already opened descriptor into another tree.
    private static func openSafe(_ url: URL, directory: Bool = false) throws -> Int32 {
        guard url.isFileURL, url.path.hasPrefix("/") else { throw fail("Caminho absoluto inválido.") }
        var fd = open("/", O_RDONLY | O_DIRECTORY | O_NOFOLLOW)
        guard fd >= 0 else { throw fail("Raiz indisponível.") }
        let components = url.standardizedFileURL.path.split(separator: "/")
        for (index, component) in components.enumerated() {
            let isDirectory = index < components.count - 1 || directory
            let next = openat(fd, String(component), O_RDONLY | O_NOFOLLOW | O_NONBLOCK | (isDirectory ? O_DIRECTORY : 0))
            close(fd)
            guard next >= 0 else { throw fail("Componente indisponível ou com link.") }
            fd = next
        }
        return fd
    }
    private static func createParents(_ relative: String, root: URL) throws {
        guard validPath(relative) else { throw fail("Caminho inválido.") }
        var fd = try openSafe(root, directory: true); defer { close(fd) }
        var current = root
        for component in relative.split(separator: "/").dropLast() {
            current.appendPathComponent(String(component))
            _ = try path(String(component), root: current.deletingLastPathComponent())
            if mkdirat(fd, String(component), 0o755) != 0 && errno != EEXIST { throw fail("Não foi possível preparar o destino.") }
            let next = openat(fd, String(component), O_RDONLY | O_DIRECTORY | O_NOFOLLOW)
            guard next >= 0 else { throw fail("Destino contém link ou arquivo.") }
            close(fd); fd = next
        }
    }
    private static func publish(_ data: Data, to destination: URL, expected: String?) throws {
        let parent = try openSafe(destination.deletingLastPathComponent(), directory: true); defer { close(parent) }
        let temporary = ".oracle-ai-memory-" + UUID().uuidString.lowercased()
        let fd = openat(parent, temporary, O_WRONLY | O_CREAT | O_EXCL | O_NOFOLLOW, 0o600)
        guard fd >= 0 else { throw fail("Escrita temporária indisponível.") }
        defer { close(fd); unlinkat(parent, temporary, 0) }
        let handle = FileHandle(fileDescriptor: fd, closeOnDealloc: false)
        try handle.write(contentsOf: data)
        guard fsync(fd) == 0, try existingHash(destination) == expected else { throw fail("Destino mudou antes da publicação.") }
        let renamed = expected == nil
            ? renameatx_np(parent, temporary, parent, destination.lastPathComponent, UInt32(RENAME_EXCL))
            : renameat(parent, temporary, parent, destination.lastPathComponent)
        guard renamed == 0, fsync(parent) == 0 else { throw fail("Publicação não foi sincronizada.") }
    }
    private static func read(_ file: URL, limit: Int = fileLimit) throws -> Data {
        let fd = try openSafe(file); defer { close(fd) }
        var s = stat()
        guard fstat(fd, &s) == 0, s.st_mode & S_IFMT == S_IFREG, s.st_size >= 0, s.st_size <= limit, s.st_flags & 0x40000000 == 0 else { throw fail("Somente arquivos regulares dentro do limite.") }
        let handle = FileHandle(fileDescriptor: fd, closeOnDealloc: false)
        let data = try handle.read(upToCount: limit + 1) ?? Data()
        guard data.count <= limit, data.count == s.st_size else { throw fail("Leitura parcial ou fora do limite.") }
        return data
    }
    /// Restricted metadata YAML; arbitrary constructors, aliases and duplicate keys fail closed.
    private static func metadata(_ data: Data) throws -> [String: String] {
        guard let text = String(data: data, encoding: .utf8), text.hasPrefix("---\n") || text.hasPrefix("---\r\n") else { throw fail("Markdown sem frontmatter UTF-8.") }
        let lines = text.replacingOccurrences(of: "\r\n", with: "\n").components(separatedBy: "\n")
        guard let end = lines.dropFirst().firstIndex(of: "---"), end <= 256, lines[1..<end].joined(separator: "\n").utf8.count <= 64_000 else { throw fail("Frontmatter inválido ou fora do limite.") }
        var result: [String: String] = [:], nested = "", block: String?
        for line in lines[1..<end] {
            if line.isEmpty || line.trimmingCharacters(in: .whitespaces).hasPrefix("#") { continue }
            if line.first?.isWhitespace == true {
                if let block { result[block, default: ""] += " " + line.trimmingCharacters(in: .whitespaces); continue }
                let trimmed = line.trimmingCharacters(in: .whitespaces)
                if !nested.isEmpty, let colon = trimmed.firstIndex(of: ":"), !trimmed.hasPrefix("-") {
                    let key = nested + "." + trimmed[..<colon]
                    if result[key] != nil { throw fail("Metadado duplicado.") }
                    result[key] = trimmed[trimmed.index(after: colon)...].trimmingCharacters(in: .whitespaces).trimmingCharacters(in: CharacterSet(charactersIn: "\"'"))
                }
                continue // sources/list extensions are retained in original bytes, not interpreted.
            }
            block = nil; nested = ""
            guard let colon = line.firstIndex(of: ":") else { throw fail("Metadado inválido.") }
            let key = String(line[..<colon]), raw = line[line.index(after: colon)...].trimmingCharacters(in: .whitespaces)
            guard key.range(of: "^[a-zA-Z_][a-zA-Z0-9_-]*$", options: .regularExpression) != nil,
                  result[key] == nil, !raw.hasPrefix("!") && !raw.hasPrefix("&") && !raw.hasPrefix("*") else { throw fail("Metadado não suportado.") }
            if let first = raw.first, first == "\"" || first == "'", raw.last != first || raw.count < 2 { throw fail("Scalar YAML com aspas incompletas.") }
            if ["type", "tier", "status", "expires_at", "stale_after", "deleted", "expired", "deleted_at"].contains(key), raw.hasPrefix("[") || raw.hasPrefix("{") { throw fail("A política requer metadados escalares.") }
            if raw == "|" || raw == ">" || raw == "|-" || raw == ">-" { result[key] = ""; block = key }
            else { result[key] = raw.trimmingCharacters(in: CharacterSet(charactersIn: "\"'")); if raw.isEmpty { nested = key } }
        }
        return result
    }
    private static func candidate(_ file: URL, relative: String, source: URL, includeSessions: Bool) throws -> AIMemoryExportCandidate? {
        let family = relative.split(separator: "/").first.map(String.init) ?? ""
        let allowed = ["concepts", "decisions", "procedures", "_rules", "gotchas", "runbooks"]
        guard allowed.contains(family) || (includeSessions && family == "sessions") else { return nil }
        let data = try read(file), fields = try metadata(data)
        guard let type = fields["type"], !type.isEmpty, type.utf8.count <= 256,
              let tier = fields["tier"], ["semantic", "procedural", "episodic", "working"].contains(tier) else { throw fail("Metadados type/tier ausentes ou não suportados; revise a fonte.") }
        guard family == "sessions" ? tier == "episodic" : ["semantic", "procedural"].contains(tier) else { return nil }
        if ["expired", "deleted"].contains((fields["status"] ?? "").lowercased()) || ["true", "yes", "1"].contains((fields["deleted"] ?? "").lowercased()) || ["true", "yes", "1"].contains((fields["expired"] ?? "").lowercased()) || !(fields["deleted_at"] ?? "").isEmpty { return nil }
        for key in ["expires_at", "stale_after"] {
            if let raw = fields[key], !raw.isEmpty {
                let formatter = ISO8601DateFormatter()
                formatter.formatOptions = [.withInternetDateTime, .withFractionalSeconds]
                let instant = formatter.date(from: raw) ?? ISO8601DateFormatter().date(from: raw) ?? ISO8601DateFormatter().date(from: raw + "T23:59:59Z")
                guard let instant else { throw fail("Prazo YAML não suportado; use data ou timestamp ISO-8601.") }
                if instant <= Date() { return nil }
            }
        }
        let namespace = source.deletingLastPathComponent().lastPathComponent + "/" + source.lastPathComponent + "/" + relative
        return AIMemoryExportCandidate(id: hash(Data(namespace.utf8)), path: relative,
            title: String((fields["title"] ?? file.deletingPathExtension().lastPathComponent).prefix(256)), type: type,
            tier: tier, sha256: hash(data), bytes: data.count, sourceVersion: String((fields["generated.by"] ?? "unknown").prefix(256)))
    }
    private static func inventory(source: URL, vault: URL, includeSessions: Bool) throws -> (items: [AIMemoryExportCandidate], issues: [[String: String]]) {
        _ = try validateSource(source, vault: vault)
        var queue = [""], items: [AIMemoryExportCandidate] = [], issues: [[String: String]] = [], visited = 0
        var readBytes: Int64 = 0
        let started = ProcessInfo.processInfo.systemUptime
        scan: while let relative = queue.popLast() {
            let folder = relative.isEmpty ? source : try path(relative, root: source)
            for name in try fm.contentsOfDirectory(atPath: folder.path).sorted() {
                visited += 1
                if visited > entryLimit || ProcessInfo.processInfo.systemUptime - started > scanSeconds {
                    issues.append(["path": relative, "message": "Inventário incompleto: limite de entradas ou tempo."]); break scan
                }
                if name == "_pending" || name == "index.md" || name == "log.md" || name.hasPrefix("log-") || name.hasPrefix(".") { continue }
                let child = relative.isEmpty ? name : relative + "/" + name
                do {
                    let url = try path(child, root: source)
                    var s = stat(); guard lstat(url.path, &s) == 0 else { throw fail("Entrada indisponível.") }
                    if s.st_mode & S_IFMT == S_IFDIR { queue.append(child) }
                    else if url.pathExtension == "md" {
                        if s.st_size >= 0 && s.st_size <= fileLimit { readBytes += s.st_size }
                        if readBytes > scanBytes { issues.append(["path": child, "message": "Inventário incompleto: leitura agregada excede 64 MB."]); break scan }
                        if let item = try candidate(url, relative: child, source: source, includeSessions: includeSessions) { items.append(item) }
                    }
                } catch { issues.append(["path": child, "message": error.localizedDescription]) }
            }
        }
        return (items.sorted { $0.path < $1.path }, issues)
    }
    private static func snapshotToken(_ items: [AIMemoryExportCandidate], source: URL, vault: URL, includeSessions: Bool, revision: String) throws -> String {
        hash(try encode(items) + Data((source.path + "\n" + vault.path + "\n" + String(includeSessions) + "\n" + revision).utf8))
    }
    static func candidates(source: URL, vault: URL, includeSessions: Bool, offset: Int = 0, revision: String = "") throws -> [String: Any] {
        guard offset >= 0, offset <= entryLimit else { throw fail("Página inválida.") }
        let listing = try inventory(source: source, vault: vault, includeSessions: includeSessions)
        let items = listing.items, end = min(items.count, offset + 256)
        return ["items": offset < items.count ? Array(items[offset..<end]).map(\.projection) : [],
                "total": items.count, "offset": offset, "nextOffset": end < items.count ? end as Any : NSNull(),
                "snapshot": try snapshotToken(items, source: source, vault: vault, includeSessions: includeSessions, revision: revision),
                "issues": listing.issues, "complete": listing.issues.isEmpty, "semanticApproval": false,
                "scope": "selected_project_wiki_metadata", "limits": ["entries": entryLimit, "fileBytes": fileLimit, "batch": batchLimit, "page": 256, "scanBytes": scanBytes, "scanSeconds": scanSeconds]]
    }
    static func preview(source: URL, vault: URL, includeSessions: Bool, revision: String, id: String, snapshot: String) throws -> [String: Any] {
        guard id.utf8.count == 64, snapshot.utf8.count == 64 else { throw fail("Identidade ou snapshot inválido.") }
        let listing = try inventory(source: source, vault: vault, includeSessions: includeSessions)
        guard listing.issues.isEmpty,
              snapshot == (try snapshotToken(listing.items, source: source, vault: vault, includeSessions: includeSessions, revision: revision)),
              let item = listing.items.first(where: { $0.id == id }) else { throw fail("Snapshot incompleto, alterado ou página fora da seleção revisada.") }
        let data = try read(path(item.path, root: source))
        guard hash(data) == item.sha256, let text = String(data: data, encoding: .utf8) else { throw fail("Fonte alterada ou UTF-8 inválido.") }
        return ["id": id, "path": item.path, "title": item.title, "text": text, "sha256": item.sha256, "snapshot": snapshot]
    }
    private static func encode<T: Encodable>(_ value: T) throws -> Data { let e = JSONEncoder(); e.outputFormatting = [.sortedKeys]; return try e.encode(value) }
    private static func saveRaw(_ data: Data, at file: URL) throws {
        guard data.count <= 8_000_000 else { throw fail("Estado excedeu o limite de 8 MB.") }
        try data.write(to: file, options: .atomic); chmod(file.path, 0o600)
        let fd = try openSafe(file); defer { close(fd) }
        guard fsync(fd) == 0 else { throw fail("Estado não sincronizado.") }
        let parent = try openSafe(file.deletingLastPathComponent(), directory: true); defer { close(parent) }
        guard fsync(parent) == 0 else { throw fail("Pasta do estado não sincronizada.") }
    }
    private static func save<T: Encodable>(_ value: T, at file: URL) throws { try saveRaw(encode(value), at: file) }
    private static func saveDictionary(_ value: [String: Any], at file: URL) throws {
        try saveRaw(JSONSerialization.data(withJSONObject: value, options: [.sortedKeys]), at: file)
    }
    private static func load<T: Decodable>(_ type: T.Type, at file: URL) throws -> T { try JSONDecoder().decode(type, from: read(file, limit: 8_000_000)) }
    private static func existingHash(_ file: URL) throws -> String? {
        var s = stat(); if lstat(file.path, &s) != 0 { if errno == ENOENT { return nil }; throw fail("Destino indisponível.") }
        return hash(try read(file))
    }
    private struct Recovery {
        let journal: Journal
        let manifest: Manifest
        let token: String
        let sourceFingerprint: String
        let destinationFingerprint: String
        let journalHash: String
        let journalData: Data
    }
    /// Fingerprints never follow links. Large human edits need no content copy:
    /// inode/size/mtime/ctime prove the preview boundary, under coordination.
    private static func fingerprint(_ file: URL) throws -> String {
        var probe = stat()
        if lstat(file.path, &probe) != 0 && errno == ENOENT { return "missing" }
        let parent = try openSafe(file.deletingLastPathComponent(), directory: true); defer { close(parent) }
        var value = stat()
        if fstatat(parent, file.lastPathComponent, &value, AT_SYMLINK_NOFOLLOW) != 0 {
            if errno == ENOENT { return "missing" }; throw fail("Fingerprint indisponível.")
        }
        let stamp = "\(value.st_dev):\(value.st_ino):\(value.st_mode):\(value.st_size):\(value.st_mtimespec.tv_sec):\(value.st_mtimespec.tv_nsec):\(value.st_ctimespec.tv_sec):\(value.st_ctimespec.tv_nsec):\(value.st_flags)"
        guard value.st_mode & S_IFMT == S_IFREG else { throw fail("A recuperação exige arquivo regular ou destino ausente, sem links.") }
        if value.st_size > fileLimit { return stamp + ":content_over_limit" }
        return stamp + ":" + hash(try read(file))
    }
    private static func recovery(source: URL, vault: URL, state: URL, consent: AIMemoryExportConsent) throws -> Recovery? {
        guard consent.enabled, consent.vault == vault.path, consent.source == source.path else { throw fail("Consentimento de recuperação não pertence à origem e ao vault atuais.") }
        let (workspace, project) = try validateSource(source, vault: vault)
        guard state.path != vault.path, state.path != source.path,
              !state.path.hasPrefix(vault.path + "/"), !state.path.hasPrefix(source.path + "/"),
              !vault.path.hasPrefix(state.path + "/"), !source.path.hasPrefix(state.path + "/") else { throw fail("Recuperação privada precisa ficar fora do conhecimento.") }
        if !fm.fileExists(atPath: state.path) { return nil }
        try directory(state)
        let pending = try path("pending.json", root: state)
        if !fm.fileExists(atPath: pending.path) { return nil }
        let data = try read(pending, limit: 64_000), journal = try JSONDecoder().decode(Journal.self, from: data)
        let family = journal.entry.path.split(separator: "/").first.map(String.init) ?? ""
        guard ["concepts", "decisions", "procedures", "_rules", "gotchas", "runbooks", "sessions"].contains(family),
              journal.entry.path.hasSuffix(".md"), !["index.md", "log.md"].contains(URL(fileURLWithPath: journal.entry.path).lastPathComponent),
              !URL(fileURLWithPath: journal.entry.path).lastPathComponent.hasPrefix("log-") else { throw fail("Journal não corresponde a uma página exportável da wiki.") }
        let expected = "INBOX/oracle-ai-memory/" + workspace + "/" + project + "/" + journal.entry.path
        let namespace = workspace + "/" + project + "/" + journal.entry.path
        guard journal.vault == vault.path, journal.entry.source == source.path,
              validPath(journal.entry.path), journal.entry.destination == expected,
              journal.entry.id == hash(Data(namespace.utf8)) else { throw fail("Journal fora do namespace autorizado.") }
        let destination = try path(expected, root: vault), origin = try path(journal.entry.path, root: source)
        let destinationFingerprint = try fingerprint(destination), sourceFingerprint = try fingerprint(origin)
        let current = destinationFingerprint == "missing" ? nil : (try? existingHash(destination))
        let manifestURL = try path("manifest.json", root: state)
        let manifestData = fm.fileExists(atPath: manifestURL.path) ? try read(manifestURL, limit: 8_000_000) : Data()
        let manifest = manifestData.isEmpty ? Manifest(vault: vault.path) : try JSONDecoder().decode(Manifest.self, from: manifestData)
        guard manifest.vault == vault.path else { throw fail("Manifesto de outro vault.") }
        // A partial explicit resolution may already have persisted a foreign
        // marker. Never let automatic replay remove that human-preservation gate.
        let matchesPrior = destinationFingerprint == "missing" ? journal.priorHash == nil : current != nil && current == journal.priorHash
        if manifest.foreign?[journal.entry.id] == nil && (current == journal.entry.sha256 || matchesPrior) { return nil }
        let material = data + manifestData + Data((source.path + "\n" + vault.path + "\n" + consent.revision + "\n" + String(consent.includeSessions) + "\n" + sourceFingerprint + "\n" + destinationFingerprint).utf8)
        return Recovery(journal: journal, manifest: manifest, token: hash(material), sourceFingerprint: sourceFingerprint,
            destinationFingerprint: destinationFingerprint, journalHash: hash(data), journalData: data)
    }
    private static func conflictProjection(_ recovery: Recovery) -> [String: Any] {
        ["id": recovery.journal.entry.id, "path": recovery.journal.entry.destination,
         "sourcePath": recovery.journal.entry.path, "message": "A nota local divergiu da escrita interrompida. Ela será preservada como conteúdo estrangeiro, sem adoção do hash humano."]
    }
    static func recoveryPreview(source: URL, vault: URL, state: URL, consent: AIMemoryExportConsent) throws -> [String: Any] {
        guard let value = try recovery(source: source, vault: vault, state: state, consent: consent) else {
            return ["recoveryRequired": false, "previewID": NSNull(), "conflicts": [], "message": "Nenhum conflito de journal exige intervenção."]
        }
        return ["recoveryRequired": true, "previewID": value.token, "conflicts": [conflictProjection(value)],
                "message": "Preservar notas locais e continuar. Esta ação arquiva somente o journal privado e mantém as notas intactas."]
    }
    static func resolveRecovery(source: URL, vault: URL, state: URL, consent: AIMemoryExportConsent,
                                confirmed: Bool, previewID: String, hooks: AIMemoryExportHooks = .init()) throws -> [String: Any] {
        guard confirmed, previewID.utf8.count == 64 else { throw fail("Confirme o preview para preservar as notas locais e continuar.") }
        try directory(state)
        let lock = open((try path("operation.lock", root: state)).path, O_CREAT | O_RDWR | O_NOFOLLOW, 0o600)
        guard lock >= 0 else { throw fail("Lock indisponível.") }; defer { close(lock) }
        guard flock(lock, LOCK_EX | LOCK_NB) == 0 else { throw fail("Outra exportação está em andamento.") }; defer { flock(lock, LOCK_UN) }
        try hooks.validateConsent?()
        guard let initial = try recovery(source: source, vault: vault, state: state, consent: consent), initial.token == previewID else { throw fail("O preview de recuperação mudou; revise novamente antes de confirmar.") }
        let origin = try path(initial.journal.entry.path, root: source), destination = try path(initial.journal.entry.destination, root: vault)
        var coordinationError: NSError?, actionError: Error?, result: [String: Any] = [:]
        NSFileCoordinator(filePresenter: nil).coordinate(readingItemAt: origin, options: [], writingItemAt: destination, options: [], error: &coordinationError) { _, _ in
            do {
                try hooks.beforeRecheck?(); try hooks.validateConsent?()
                guard let current = try recovery(source: source, vault: vault, state: state, consent: consent), current.token == previewID else { throw fail("Origem, destino, journal ou consentimento mudou após o preview.") }
                let receiptID = UUID().uuidString.lowercased(), archive = "recovery/" + receiptID
                try createParents(archive + "/journal.json", root: state)
                // Archive first; a crash leaves pending intact and cannot make human bytes owned.
                try saveRaw(current.journalData, at: try path(archive + "/journal.json", root: state))
                let receipt: [String: Any] = ["schemaVersion": 1, "receiptID": receiptID, "status": "preserved_conflicts",
                    "preserved_conflicts": [conflictProjection(current)], "previewID": previewID, "journalSHA256": current.journalHash,
                    "sourceFingerprint": current.sourceFingerprint, "destinationFingerprint": current.destinationFingerprint,
                    "vault": vault.path, "source": source.path, "consentRevision": consent.revision,
                    "at": ISO8601DateFormatter().string(from: Date()), "recoveryRequired": false,
                    "notesChanged": false, "indexed": false, "retrieved": false]
                let intent = receipt.merging(["status": "preservation_intent", "recoveryRequired": true, "completed": false]) { _, new in new }
                try saveDictionary(intent, at: try path(archive + "/receipt.json", root: state))
                try hooks.validateConsent?()
                guard let rechecked = try recovery(source: source, vault: vault, state: state, consent: consent), rechecked.token == previewID else { throw fail("A revisão mudou antes da resolução; o journal pendente foi preservado.") }
                var manifest = current.manifest
                manifest.entries.removeValue(forKey: current.journal.entry.id)
                var foreign = manifest.foreign ?? [:]
                foreign[current.journal.entry.id] = current.journal.entry.destination
                manifest.foreign = foreign
                try save(manifest, at: try path("manifest.json", root: state))
                // Recheck file fingerprints after state writes, before revoking pending.
                guard try fingerprint(origin) == current.sourceFingerprint, try fingerprint(destination) == current.destinationFingerprint,
                      hash(try read(path("pending.json", root: state), limit: 64_000)) == current.journalHash else { throw fail("Intervenção posterior invalidou a resolução; nenhuma nota foi alterada.") }
                try fm.removeItem(at: try path("pending.json", root: state))
                let stateFD = try openSafe(state, directory: true); defer { close(stateFD) }
                guard fsync(stateFD) == 0 else { throw fail("Resolução não sincronizada.") }
                let completed = receipt.merging(["completed": true]) { _, new in new }
                try saveDictionary(completed, at: try path(archive + "/receipt.json", root: state))
                try saveDictionary(completed, at: try path("last-recovery.json", root: state))
                result = completed
            } catch { actionError = error }
        }
        if let error = coordinationError ?? actionError as NSError? { throw error }
        return result
    }
    static func export(source: URL, vault: URL, state: URL, consent: AIMemoryExportConsent, ids: [String], confirmed: Bool, snapshot: String?, hooks: AIMemoryExportHooks = .init()) throws -> [String: Any] {
        guard confirmed, consent.enabled, consent.source == source.path, consent.vault == vault.path,
              snapshot?.utf8.count == 64, !ids.isEmpty, ids.count <= batchLimit, ids.allSatisfy({ $0.utf8.count == 64 && $0.range(of: "^[a-f0-9]+$", options: .regularExpression) != nil }), Set(ids).count == ids.count else { throw fail("Escolha páginas e confirme a exportação manual deste vault.") }
        let (workspace, project) = try validateSource(source, vault: vault)
        guard state.path != vault.path, state.path != source.path,
              !state.path.hasPrefix(vault.path + "/"), !state.path.hasPrefix(source.path + "/"),
              !vault.path.hasPrefix(state.path + "/"), !source.path.hasPrefix(state.path + "/") else { throw fail("Recibos precisam ficar fora do conhecimento.") }
        try fm.createDirectory(at: state, withIntermediateDirectories: true, attributes: [.posixPermissions: 0o700]); try directory(state)
        let lockFile = try path("operation.lock", root: state), lock = open(lockFile.path, O_CREAT | O_RDWR | O_NOFOLLOW, 0o600)
        guard lock >= 0 else { throw fail("Lock indisponível.") }; defer { close(lock) }
        guard flock(lock, LOCK_EX | LOCK_NB) == 0 else { throw fail("Outra exportação está em andamento.") }; defer { flock(lock, LOCK_UN) }
        let manifestFile = try path("manifest.json", root: state), journalFile = try path("pending.json", root: state)
        var manifest = fm.fileExists(atPath: manifestFile.path) ? try load(Manifest.self, at: manifestFile) : Manifest(vault: vault.path)
        guard manifest.vault == vault.path else { throw fail("Estado pertence a outro vault.") }
        try hooks.validateConsent?()
        if fm.fileExists(atPath: journalFile.path) {
            let journal = try load(Journal.self, at: journalFile)
            guard journal.vault == vault.path else { throw fail("Journal pertence a outro vault.") }
            let file = try path(journal.entry.destination, root: vault)
            let current = try existingHash(file)
            if manifest.foreign?[journal.entry.id] != nil { throw fail("O journal possui conflito preservado; confirme a recuperação explícita.") }
            if current == journal.entry.sha256 {
                manifest.entries[journal.entry.id] = journal.entry; try save(manifest, at: manifestFile)
            } else if current != journal.priorHash { throw fail("Destino mudou durante a recuperação; preserve o conflito.") }
            try fm.removeItem(at: journalFile)
        }
        let listing = try inventory(source: source, vault: vault, includeSessions: consent.includeSessions)
        guard listing.issues.isEmpty else { throw fail("Inventário incompleto; nenhuma exportação do snapshot parcial foi autorizada.") }
        guard let snapshot, snapshot == (try snapshotToken(listing.items, source: source, vault: vault, includeSessions: consent.includeSessions, revision: consent.revision)) else {
            throw fail("A versão revisada mudou ou não foi confirmada; liste as páginas novamente.")
        }
        let selected = try ids.map { id -> AIMemoryExportCandidate in
            guard let row = listing.items.first(where: { $0.id == id }) else { throw fail("Página escolhida ausente, inelegível ou fora do escopo.") }
            return row
        }
        guard selected.reduce(0, { $0 + $1.bytes }) <= batchBytes else { throw fail("Lote excede 16 MB.") }
        var results: [[String: Any]] = []
        let runID = UUID().uuidString.lowercased()
        func attempt(_ status: String, message: String? = nil) throws {
            let value: [String: Any] = ["id": runID, "status": status, "complete": false, "results": results,
                "source": source.path, "vault": vault.path, "snapshot": snapshot, "consentRevision": consent.revision,
                "pending": fm.fileExists(atPath: journalFile.path), "message": message as Any? ?? NSNull(),
                "at": ISO8601DateFormatter().string(from: Date()), "indexed": false, "retrieved": false]
            try saveDictionary(value, at: try path("last-attempt.json", root: state))
        }
        try attempt("running")
        do {
        for item in selected {
            let relative = "INBOX/oracle-ai-memory/" + workspace + "/" + project + "/" + item.path
            let entry = Entry(id: item.id, source: source.path, path: item.path, destination: relative, sha256: item.sha256, sourceVersion: item.sourceVersion)
            let destination = try path(relative, root: vault), origin = try path(item.path, root: source)
            try createParents(relative, root: vault)
            var coordinationError: NSError?, actionError: Error?, outcome = ""
            let coordinator = NSFileCoordinator(filePresenter: nil)
            coordinator.coordinate(readingItemAt: origin, options: [], writingItemAt: destination, options: .forReplacing, error: &coordinationError) { _, _ in
                do {
                    try hooks.beforeRecheck?(); try hooks.validateConsent?()
                    _ = try validateSource(source, vault: vault)
                    _ = try path(item.path, root: source); _ = try path(relative, root: vault)
                    let data = try read(origin)
                    guard hash(data) == item.sha256,
                          try candidate(origin, relative: item.path, source: source, includeSessions: consent.includeSessions)?.id == item.id else { throw fail("A fonte mudou após a seleção.") }
                    let current = try existingHash(destination), managed = manifest.entries[item.id]
                    if manifest.foreign?[item.id] != nil || (manifest.foreign?.values.contains(relative) ?? false) { outcome = "conflict"; return }
                    if let managed {
                        guard managed.destination == relative, managed.source == source.path, current == managed.sha256 else { outcome = "conflict"; return }
                        if current == item.sha256 { outcome = "no_op"; return }
                    } else if current != nil { outcome = "conflict"; return }
                    var projected = manifest
                    projected.entries[item.id] = entry
                    guard projected.entries.count <= entryLimit, try encode(projected).count <= 8_000_000 else { throw fail("Manifesto excedeu o limite; nenhuma nova página foi escrita.") }
                    try save(Journal(revision: consent.revision, vault: vault.path, entry: entry, priorHash: current), at: journalFile)
                    try hooks.validateConsent?()
                    guard try existingHash(destination) == current, hash(try read(origin)) == item.sha256 else { throw fail("Fonte ou destino mudou antes da escrita.") }
                    try publish(data, to: destination, expected: current)
                    try hooks.afterWrite?()
                    guard try existingHash(destination) == item.sha256 else { throw fail("Destino mudou durante a escrita.") }
                    manifest.entries[item.id] = entry; try save(manifest, at: manifestFile); try fm.removeItem(at: journalFile)
                    outcome = "written"
                } catch { actionError = error }
            }
            if let error = coordinationError ?? actionError as NSError? { throw error }
            results.append(["id": item.id, "path": relative, "sha256": item.sha256, "status": outcome])
            try attempt("partial")
        }
        } catch {
            try? attempt("failed", message: error.localizedDescription)
            throw error
        }
        let receipt: [String: Any] = ["schemaVersion": 1, "id": runID, "vault": vault.path, "source": source.path,
            "consentRevision": consent.revision, "includeSessions": consent.includeSessions, "results": results,
            "at": ISO8601DateFormatter().string(from: Date()), "complete": results.allSatisfy { $0["status"] as? String != "conflict" },
            "indexed": false, "retrieved": false, "semanticApproval": false, "manual": true,
            "hashSnapshot": manifest.entries.mapValues { $0.sha256 }]
        try saveDictionary(receipt, at: try path("last-run.json", root: state))
        try saveDictionary(receipt.merging(["status": "finished"]) { _, new in new }, at: try path("last-attempt.json", root: state))
        let receipts = state.appendingPathComponent("receipts"); try fm.createDirectory(at: receipts, withIntermediateDirectories: true)
        try saveDictionary(receipt, at: try path("receipts/" + runID + ".json", root: state))
        return receipt
    }
}
