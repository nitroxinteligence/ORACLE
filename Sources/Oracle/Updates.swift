import Foundation
import CryptoKit

// Update artifacts stay in the application's own state. No git checkout is mutated.
// Executable versions are an explicit allowlist shipped alongside their compiled adapter.
struct UpdateFile {
    let path: String
    let hash: String
    let data: Data
}

func fileDigest(_ url: URL) throws -> String {
    let handle = try FileHandle(forReadingFrom: url)
    defer { try? handle.close() }
    var hash = SHA256()
    while let chunk = try handle.read(upToCount: 1_048_576), !chunk.isEmpty { hash.update(data: chunk) }
    return hash.finalize().map { String(format: "%02x", $0) }.joined()
}

final class UpdateNetwork: NSObject, URLSessionTaskDelegate {
    static func permitted(_ url: URL) -> Bool {
        guard url.scheme == "https", url.user == nil, url.password == nil, url.port == nil else { return false }
        return ["github.com", "api.github.com", "objects.githubusercontent.com", "release-assets.githubusercontent.com", "raw.githubusercontent.com"].contains(url.host ?? "")
    }
    func urlSession(_ session: URLSession, task: URLSessionTask, willPerformHTTPRedirection response: HTTPURLResponse, newRequest request: URLRequest, completionHandler: @escaping (URLRequest?) -> Void) {
        completionHandler(request.url.map { Self.permitted($0) } == true ? request : nil)
    }
    func fetch(_ text: String, limit: Int = 2_000_000) throws -> Data {
        guard let url = URL(string: text), Self.permitted(url) else { throw failure("Fonte de atualização não permitida") }
        let settings = URLSessionConfiguration.ephemeral
        settings.httpCookieStorage = nil; settings.urlCredentialStorage = nil
        settings.timeoutIntervalForRequest = 30; settings.timeoutIntervalForResource = 180
        let session = URLSession(configuration: settings, delegate: self, delegateQueue: nil)
        defer { session.invalidateAndCancel() }
        var request = URLRequest(url: url); request.setValue("OracleCompanion/0.2.0", forHTTPHeaderField: "User-Agent")
        request.setValue("application/vnd.github+json", forHTTPHeaderField: "Accept")
        let done = DispatchSemaphore(value: 0), mutex = NSLock()
        var result: Result<Data, Error>?
        let task = session.downloadTask(with: request) { local, response, error in
            let value: Result<Data, Error>
            do {
                if let error { throw error }
                guard let response = response as? HTTPURLResponse, response.statusCode == 200, let local else { throw failure("Fonte indisponível (HTTP \((response as? HTTPURLResponse)?.statusCode ?? 0)). Tente novamente.") }
                guard (try local.resourceValues(forKeys: [.fileSizeKey]).fileSize ?? Int.max) <= limit else { throw failure("Pacote excede o limite autorizado") }
                value = .success(try Data(contentsOf: local))
            } catch { value = .failure(error) }
            mutex.lock(); result = value; mutex.unlock(); done.signal()
        }
        task.resume()
        guard done.wait(timeout: .now() + 190) == .success else { task.cancel(); throw failure("Atualização sem resposta; versão atual preservada") }
        mutex.lock(); let answer = result; mutex.unlock()
        return try answer!.get()
    }
    func json(_ url: String) throws -> [String: Any] {
        guard let value = try JSONSerialization.jsonObject(with: fetch(url)) as? [String: Any] else { throw failure("Manifesto inválido") }
        return value
    }
}

extension Core {
    func updateManifest() throws -> [String: Any] {
        try readJSON(bundledEngineResources().deletingLastPathComponent().appendingPathComponent("updates/sources.json"))
    }
    func updatePath(_ path: String) throws -> URL { try scoped("updates/" + path, root: home) }
    func updatePreferences() -> [String: Any] {
        var value=(try? readJSON(home.appendingPathComponent("updates/sources.local.json"))) ?? [:]
        if value["skills_repository"] == nil,let defaults=try? updateManifest(),let skills=defaults["skills"] as? [String:Any],let repository=skills["repository"] as? String {value["skills_repository"]=repository}
        return value
    }
    func configureSkillSource(_ repository: String) throws -> [String: Any] {
        let lock = try acquireOperationLock("updates"); defer { releaseOperationLock(lock) }
        let normalized = repository.trimmingCharacters(in: .whitespacesAndNewlines).replacingOccurrences(of: #"/+$"#, with: "", options: .regularExpression)
        if !normalized.isEmpty { _ = try githubSlug(normalized) }
        var preferences = updatePreferences(); preferences["skills_repository"] = normalized.isEmpty ? nil : normalized
        try writeJSON(preferences, updatePath("sources.local.json")); return preferences
    }
    func githubSlug(_ repository: String) throws -> String {
        guard let url = URLComponents(string: repository), url.scheme == "https", url.host == "github.com", url.user == nil, url.password == nil, url.port == nil, url.query == nil, url.fragment == nil else { throw failure("Use o endereço HTTPS do repositório GitHub, sem credenciais") }
        let parts = url.path.split(separator: "/")
        guard parts.count == 2, parts.allSatisfy({ $0.range(of: #"^[A-Za-z0-9_.-]+$"#, options: .regularExpression) != nil && $0 != "." && $0 != ".." }) else { throw failure("Endereço esperado: https://github.com/organização/repositório") }
        return parts.joined(separator: "/")
    }
    func recordUpdate(_ phase: String, _ text: String, completed: Int = 0, total: Int = 0, results: [[String: Any]] = []) throws {
        try writeJSON(["phase": phase, "message": text, "completed": completed, "total": total, "results": results, "at": ISO8601DateFormatter().string(from: Date())], updatePath("status.json"))
    }
    func updateStatus() throws -> [String: Any] {
        var value = (try? readJSON(updatePath("status.json"))) ?? ["phase": "idle", "message": "Pronto para verificar as fontes"]
        value["available"] = (value["results"] as? [[String:Any]] ?? []).contains { $0["status"] as? String == "available" }
        value["skills_repository"] = updatePreferences()["skills_repository"] ?? NSNull()
        value["gbrain_version"] = ((try? readJSON(updatePath("runtime/current.json")))?["version"] ?? ((try? updateManifest())?["gbrain"] as? [String: Any])?["bundled_version"]) ?? "desconhecida"
        value["gbrain_rollback"] = (try? readJSON(updatePath("runtime/current.json")))?["previous"] != nil
        value["skills_rollback"] = ((try? readJSON(updatePath("skills/transaction.json")))?["status"] as? String).map { $0 != "rolled_back" } ?? false
        value["catalog_origins"] = catalogSummary().filter { $0["repo"] as? String != nil }.map { ["id":$0["id"] ?? "", "repo":$0["repo"] ?? "", "commit":$0["commit"] ?? ""] }
        return value
    }
    func verifiedRuntime(_ metadata: [String: Any]) throws -> URL {
        guard let id = metadata["directory"] as? String, UUID(uuidString: id) != nil, let files = metadata["files"] as? [String: String], Set(files.keys) == Set(["gbrain", "oracle-gbrain-read"]) else { throw failure("Recibo do motor inválido; restaure a versão anterior nos ajustes") }
        guard let source=try updateManifest()["gbrain"] as? [String:Any],metadata["commit"] as? String==source["adapter_commit"] as? String,
              (source["compatible_releases"] as? [[String:Any]] ?? []).contains(where:{$0["version"] as? String==metadata["version"] as? String && $0["sha256"] as? String==files["gbrain"]}),
              try fileDigest(bundledEngineResources().appendingPathComponent("oracle-gbrain-read"))==files["oracle-gbrain-read"] else { throw failure("Recibo sem correspondência com uma versão aprovada") }
        let root = try updatePath("runtime/versions/" + id)
        for (file, expected) in files {
            let path = try scoped(file, root: root)
            guard try fileDigest(path) == expected else { throw failure("Motor alterado fora do atualizador; arquivo preservado. Restaure a versão anterior ou revise a alteração.") }
        }
        return root
    }
    func engineResources() throws -> URL {
        let current = try updatePath("runtime/current.json")
        guard fm.fileExists(atPath: current.path) else { return bundledEngineResources() }
        return try verifiedRuntime(readJSON(current))
    }
    func activateRuntime(binary: Data, release: [String: Any], validate: ((URL) throws -> Void)? = nil) throws -> [String: Any] {
        let manifest = try updateManifest()
        guard let oracleVersion = manifest["oracle_version"] as? String,
              let expected = release["sha256"] as? String, digest(binary) == expected,
              let version = release["version"] as? String, let commit = release["commit"] as? String,
              release["platform"] as? String == "darwin-arm64",
              let minimum = release["minimum_oracle"] as? String, minimum.compare(oracleVersion, options:.numeric) != .orderedDescending,
              let gbrain = manifest["gbrain"] as? [String: Any], commit == gbrain["adapter_commit"] as? String,
              (gbrain["compatible_releases"] as? [[String: Any]] ?? []).contains(where: { $0["version"] as? String == version && $0["sha256"] as? String == expected }) else { throw failure("Pacote sem integridade ou compatibilidade aprovada") }
        let currentURL = try updatePath("runtime/current.json")
        let previous = try fm.fileExists(atPath: currentURL.path) ? readJSON(currentURL) : ["bundled": true, "version": gbrain["bundled_version"] ?? ""]
        if previous["bundled"] as? Bool != true { _ = try verifiedRuntime(previous) }
        let id = UUID().uuidString, slot = try updatePath("runtime/versions/" + id)
        try fm.createDirectory(at: slot, withIntermediateDirectories: true)
        let executable = slot.appendingPathComponent("gbrain")
        try binary.write(to: executable, options: .withoutOverwriting)
        try fm.setAttributes([.posixPermissions: 0o700], ofItemAtPath: executable.path)
        let adapter = slot.appendingPathComponent("oracle-gbrain-read")
        try fm.copyItem(at: bundledEngineResources().appendingPathComponent("oracle-gbrain-read"), to: adapter)
        // Version check has no database, vault, credentials or home profile available.
        if let validate { try validate(executable) } else {
            let result = try runProcess(executable, ["--version"], cwd: slot, environment: ["PATH": "/usr/bin:/bin", "HOME": slot.path, "GBRAIN_HOME": slot.path, "GBRAIN_SKIP_UPDATE_CHECK": "1", "GBRAIN_HOOKS": "0"], timeout: 20)
            guard result.code == 0, result.output.contains(version) else { throw failure("O motor não passou na verificação de versão") }
        }
        let metadata: [String: Any] = ["directory": id, "version": version, "commit": commit, "files": ["gbrain": try fileDigest(executable), "oracle-gbrain-read": try fileDigest(adapter)], "previous": previous]
        try writeJSON(metadata, slot.appendingPathComponent("receipt.json"))
        // Until this one atomic write, every client keeps using the previous version.
        try writeJSON(metadata, currentURL)
        return metadata
    }
    func rollbackRuntime() throws -> [String: Any] {
        let currentURL = try updatePath("runtime/current.json")
        let current = try readJSON(currentURL)
        guard let previous = current["previous"] as? [String: Any] else { throw failure("Nenhuma versão anterior registrada") }
        // A modified active slot is retained for inspection, never deleted by rollback.
        if previous["bundled"] as? Bool == true { try fm.removeItem(at: currentURL) }
        else { _ = try verifiedRuntime(previous); try writeJSON(previous, currentURL) }
        return ["id": "gbrain", "status": "rolled_back", "message": "Motor anterior restaurado. Banco e arquivos pessoais preservados."]
    }
    func skillPathAllowed(_ path: String) -> Bool {
        let pieces = path.split(separator: "/", omittingEmptySubsequences: false)
        guard pieces.count >= 4, pieces[0] == "SISTEMA", pieces[1] == "skills", collections.contains(where: { $0.0 == pieces[2] }), !pieces.contains(where: { $0.isEmpty || $0 == "." || $0 == ".." || $0.hasPrefix(".") }), !path.contains("\\"), path.utf8.count <= 700 else { return false }
        return ["md", "txt", "json", "yaml", "yml", "py", "js", "ts", "sh", "toml", "css", "html", "csv"].contains(URL(fileURLWithPath: path).pathExtension.lowercased())
    }
    func decodeSkillsBundle(_ bytes:Data) throws -> (String,[UpdateFile]) {
        guard bytes.count<=72_000_000,let payload=try JSONSerialization.jsonObject(with:bytes) as? [String:Any],payload["schema_version"] as? Int==1,payload["oracle_compatibility"] as? String=="0.2",let version=payload["version"] as? String,!version.isEmpty,version.utf8.count<=80,let records=payload["files"] as? [[String:Any]],!records.isEmpty,records.count<=5000 else { throw failure("Catálogo fora do contrato Oracle 0.2") }
        var files=[UpdateFile](),total=0,paths=Set<String>()
        for record in records {
            guard let path=record["path"] as? String,skillPathAllowed(path),paths.insert(path).inserted,let hash=record["sha256"] as? String,let encoded=record["content_base64"] as? String,encoded.utf8.count<=2_700_000,let data=Data(base64Encoded:encoded),data.count<=2_000_000,digest(data)==hash else { throw failure("Arquivo sem integridade ou caminho autorizado") }
            total+=data.count;guard total<=50_000_000 else { throw failure("Catálogo maior que 50 MB") }
            files.append(UpdateFile(path:path,hash:hash,data:data))
        }
        return (version,files)
    }
    func applySkillFiles(_ files: [UpdateFile], version: String, repository: String) throws -> [String: Any] {
        let root = try vault(), receiptURL = try updatePath("skills/installed.json")
        let prior = (try? readJSON(receiptURL)) ?? [:]
        if let priorRoot = prior["vault"] as? String, priorRoot != root.path { throw failure("O catálogo gerenciado pertence a outro vault. Selecione a fonte original antes de atualizar.") }
        var owned = prior["files"] as? [String: String] ?? [:]
        if prior.isEmpty,let plan=try? readJSON(home.appendingPathComponent("setup/plan.json")),plan["vault"] as? String==root.path,let planID=plan["id"] as? String,UUID(uuidString:planID) != nil,let catalog=try? readJSON(home.appendingPathComponent("setup/\(planID).catalog.json")),let created=catalog["created_files"] as? [String:String] { owned=created }
        guard files.count <= 5000, Set(files.map(\.path)).count == files.count, files.reduce(0, { $0 + $1.data.count }) <= 50_000_000 else { throw failure("Manifesto de skills fora dos limites") }
        for file in files { guard skillPathAllowed(file.path), file.data.count <= 2_000_000, digest(file.data) == file.hash else { throw failure("Arquivo de skill inválido ou hash divergente") } }
        if let pending=try? readJSON(updatePath("skills/transaction.json")),pending["status"] as? String=="applying" { throw failure("Recupere a atualização interrompida antes de começar outra") }
        let id = UUID().uuidString, staging = try updatePath("skills/staging/" + id)
        var operations = [[String: Any]](), preserved = [String](), verified = [String: String]()
        for (index, file) in files.enumerated() {
            let destination = try scoped(file.path, root: root)
            let exists = fm.fileExists(atPath: destination.path)
            if !exists && owned[file.path] != nil { preserved.append(file.path);continue }
            let old = try exists ? Data(contentsOf: destination) : nil
            if let old, digest(old) == file.hash { if owned[file.path] == file.hash { verified[file.path] = file.hash }; continue }
            if let old, owned[file.path] != digest(old) { preserved.append(file.path); continue }
            let payload = staging.appendingPathComponent("\(index).new")
            try fm.createDirectory(at: staging, withIntermediateDirectories: true)
            try file.data.write(to: payload, options: .withoutOverwriting)
            if let old { try old.write(to: staging.appendingPathComponent("\(index).old"), options: .withoutOverwriting) }
            operations.append(["path": file.path, "index": index, "old_hash": old.map(digest) ?? NSNull(), "new_hash": file.hash, "applied": false])
        }
        if operations.isEmpty { return ["id":"skills", "status":preserved.isEmpty ? "current" : "preserved_edits", "version":version, "message":preserved.isEmpty ? "Arquivos já verificados. Nenhuma alteração necessária." : "\(preserved.count) personalizações ou remoções preservadas.", "preserved":preserved] }
        var transaction: [String: Any] = ["id": id, "vault": root.path, "repository": repository, "version": version, "operations": operations, "previous": prior, "status": "applying", "preserved": preserved]
        let transactionURL = try updatePath("skills/transaction.json")
        // Keep older recovery receipts before starting another transaction.
        if fm.fileExists(atPath: transactionURL.path) { try fm.createDirectory(at: updatePath("skills/history"), withIntermediateDirectories: true); try fm.copyItem(at: transactionURL, to: updatePath("skills/history/\(UUID().uuidString).json")) }
        try writeJSON(transaction, transactionURL)
        do {
            for index in operations.indices {
                let op = operations[index], path = op["path"] as! String, fileIndex = op["index"] as! Int
                let destination = try scoped(path, root: root)
                let exists = fm.fileExists(atPath: destination.path)
                let currentHash = try exists ? fileDigest(destination) : nil
                guard currentHash == op["old_hash"] as? String else { throw failure("A fonte mudou durante a atualização; recuperação preservará a edição") }
                let data = try Data(contentsOf: staging.appendingPathComponent("\(fileIndex).new"))
                guard digest(data) == op["new_hash"] as? String else { throw failure("Pacote preparado foi alterado") }
                try fm.createDirectory(at: destination.deletingLastPathComponent(), withIntermediateDirectories: true)
                // intent is durable before the write; recovery also recognizes interrupted writes by hash.
                operations[index]["intent"] = true; transaction["operations"] = operations; try writeJSON(transaction, transactionURL)
                try data.write(to: destination, options: exists ? .atomic : .withoutOverwriting)
                guard try fileDigest(destination) == op["new_hash"] as? String else { throw failure("Não foi possível verificar a gravação") }
                operations[index]["applied"] = true; verified[path] = op["new_hash"] as? String
                transaction["operations"] = operations; try writeJSON(transaction, transactionURL)
                try recordUpdate("applying", "Atualizando skills", completed: index + 1, total: operations.count)
            }
            // Retain ownership of omitted files; release omissions never delete a user's files.
            var nextOwned = owned; for (path, hash) in verified { nextOwned[path] = hash }
            try writeJSON(["vault": root.path, "version": version, "repository": repository, "files": nextOwned], receiptURL)
            transaction["status"] = "completed"; try writeJSON(transaction, transactionURL)
            return ["id": "skills", "status": preserved.isEmpty ? "updated" : "preserved_edits", "version": version, "message": "\(operations.count) arquivos atualizados; \(preserved.count) personalizações preservadas.", "preserved": preserved]
        } catch {
            _ = try? rollbackSkills()
            throw error
        }
    }
    func rollbackSkills() throws -> [String: Any] {
        let transactionURL = try updatePath("skills/transaction.json")
        var transaction = try readJSON(transactionURL)
        guard transaction["status"] as? String != "rolled_back", let id = transaction["id"] as? String, UUID(uuidString: id) != nil, let rootPath = transaction["vault"] as? String, rootPath == config["vault"] as? String else { throw failure("Recuperação não disponível para esta fonte") }
        let root = try vault(), staging = try updatePath("skills/staging/" + id)
        var retained = [String](), restored = 0
        for op in (transaction["operations"] as? [[String: Any]] ?? []).reversed() {
            guard op["intent"] as? Bool == true, let path = op["path"] as? String, skillPathAllowed(path), let index = op["index"] as? Int else { continue }
            let destination = try scoped(path, root: root)
            guard fm.fileExists(atPath: destination.path) else { continue }
            guard try fileDigest(destination) == op["new_hash"] as? String else { retained.append(path); continue }
            if let expected = op["old_hash"] as? String {
                let data = try Data(contentsOf: staging.appendingPathComponent("\(index).old"))
                guard digest(data) == expected else { throw failure("Backup alterado; recuperação interrompida sem sobrescrever a fonte") }
                try data.write(to: destination, options: .atomic)
            } else { try fm.removeItem(at: destination) }
            restored += 1
        }
        try writeJSON(transaction["previous"] ?? [:], updatePath("skills/installed.json"))
        transaction["status"] = "rolled_back"; transaction["retained"] = retained; try writeJSON(transaction, transactionURL)
        return ["id": "skills", "status": "rolled_back", "message": "\(restored) arquivos restaurados; \(retained.count) edições posteriores preservadas.", "preserved": retained]
    }
    func performUpdates(operation: String = "check-apply") throws -> [String: Any] {
        let lock = try acquireOperationLock("updates"); defer { releaseOperationLock(lock) }
        let setup = try acquireOperationLock("setup"); defer { releaseOperationLock(setup) }
        let engine = try acquireOperationLock("gbrain"); defer { releaseOperationLock(engine) }
        refreshConfig()
        if operation == "rollback-gbrain" || operation == "rollback-skills" {
            let result = try operation == "rollback-gbrain" ? rollbackRuntime() : rollbackSkills()
            try recordUpdate("complete", "Versão anterior recuperada", results: [result]); return try updateStatus()
        }
        guard ["check-apply","check-only"].contains(operation) else { throw failure("Operação de atualização desconhecida") }
        let checkOnly = operation == "check-only"
        var recoveryError:String?
        if let pending = try? readJSON(updatePath("skills/transaction.json")), pending["status"] as? String == "applying" { if checkOnly { recoveryError="Há uma atualização interrompida. Use Restaurar skills anteriores antes de continuar." } else { do { _ = try rollbackSkills() } catch { recoveryError=error.localizedDescription } } }
        let manifest = try updateManifest(), network = UpdateNetwork()
        var results = [[String: Any]]()
        try recordUpdate("checking", "Consultando releases oficiais")
        do {
            let gbrain = manifest["gbrain"] as! [String: Any]
            if config["gbrainWorkspace"] != nil {
                results.append(["id": "gbrain", "status": "external", "message": "Instalação externa preservada. Atualização deve ser validada pelo operador dessa fonte."])
            } else {
                let latest = try network.json("https://api.github.com/repos/garrytan/gbrain/releases/latest")
                let current = ((try? readJSON(updatePath("runtime/current.json")))?["version"] as? String) ?? (gbrain["bundled_version"] as! String)
                let tag = latest["tag_name"] as? String ?? ""
                if tag == "v" + current {
                    _ = try engineResources()
                    results.append(["id": "gbrain", "status": "current", "version": current, "message": "Second Brain está na versão compatível atual."])
                } else if let release = (gbrain["compatible_releases"] as? [[String: Any]])?.first(where: { $0["tag"] as? String == tag }) {
                    guard let asset = (latest["assets"] as? [[String: Any]])?.first(where: { $0["name"] as? String == release["asset"] as? String }), asset["digest"] as? String == "sha256:" + (release["sha256"] as! String), let url = asset["browser_download_url"] as? String else { throw failure("Release sem checksum esperado") }
                    if checkOnly {
                        results.append(["id":"gbrain","status":"available","version":release["version"]!,"message":"Uma atualização compatível está disponível."])
                    } else {
                    try recordUpdate("downloading", "Baixando motor compatível")
                    let bytes = try network.fetch(url, limit: 220_000_000)
                    try recordUpdate("verifying", "Verificando motor e adaptador")
                    _ = try activateRuntime(binary: bytes, release: release)
                    results.append(["id": "gbrain", "status": "updated", "version": release["version"]!, "message": "Motor atualizado; banco e identidade preservados."])
                    }
                } else { results.append(["id": "gbrain", "status": "compatibility_required", "version": tag, "message": "Release novo encontrado. Aguardando validação do adaptador Oracle e do formato do banco."]) }
            }
        } catch { results.append(["id": "gbrain", "status": "error", "message": error.localizedDescription]) }
        results.append(["id": "cognee", "status": "not_adopted", "message": "Avaliado, ainda não adotado."])
        if let recoveryError { results.append(["id":"skills","status":"error","message":recoveryError]) }
        else if let repository = updatePreferences()["skills_repository"] as? String, !repository.isEmpty {
            do {
                let slug = try githubSlug(repository), latest = try network.json("https://api.github.com/repos/\(slug)/releases/latest")
                guard let asset = (latest["assets"] as? [[String: Any]])?.first(where: { $0["name"] as? String == "oracle-skills.json" }), let url = asset["browser_download_url"] as? String else { throw failure("Release sem oracle-skills.json. Consulte o contrato do catálogo.") }
                try recordUpdate("downloading","Baixando catálogo de skills")
                let bytes = try network.fetch(url,limit:72_000_000)
                guard asset["digest"] as? String == "sha256:" + digest(bytes) else { throw failure("Checksum do catálogo divergente do release") }
                try recordUpdate("verifying","Verificando conteúdo e compatibilidade do catálogo")
                let (version,files)=try decodeSkillsBundle(bytes)
                results.append(try checkOnly ? previewSkillFiles(files,version:version) : applySkillFiles(files, version: version, repository: repository))
            } catch { results.append(["id": "skills", "status": "error", "message": error.localizedDescription]) }
        } else { results.append(["id": "skills", "status": "not_configured", "message": "Fonte não configurada. Informe o futuro repositório central de skills."]) }
        try recordUpdate("complete", "Verificação concluída", results: results)
        return try updateStatus()
    }
}
