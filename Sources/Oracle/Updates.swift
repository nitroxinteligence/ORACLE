import Foundation
import CryptoKit
import Darwin

// Update artifacts stay in the application's own state. No git checkout is mutated.
// Official executable releases are verified dynamically; the compiled adapter stays pinned.
struct UpdateFile {
    let path: String
    let hash: String
    let data: Data
}

func fileDigest(_ url: URL) throws -> String {
    let handle = try FileHandle(forReadingFrom: url)
    defer { try? handle.close() }
    var hash = SHA256()
    // FileHandle buffers are autoreleased; an onboarding work item can last
    // minutes and hash the bundled engines repeatedly. Drain every chunk.
    while try autoreleasepool(invoking: { () throws -> Bool in
        guard let chunk=try handle.read(upToCount:1_048_576),!chunk.isEmpty else{return false}
        hash.update(data:chunk);return true
    }) {}
    return hash.finalize().map { String(format: "%02x", $0) }.joined()
}

struct OracleUpdateRateLimitError: LocalizedError {
    let statusCode:Int
    let retryAt:Date

    var errorDescription:String? {
        let formatter=DateFormatter();formatter.dateStyle = .none;formatter.timeStyle = .short
        return "O GitHub limitou temporariamente as consultas. O Oracle tentará novamente após \(formatter.string(from:retryAt))."
    }
    var timestamp:String {ISO8601DateFormatter().string(from:retryAt)}
    static func date(_ value:Any?)->Date? {
        guard let text=value as? String else{return nil}
        return ISO8601DateFormatter().date(from:text)
    }
    static func response(_ response:HTTPURLResponse,now:Date=Date())->OracleUpdateRateLimitError? {
        let remaining=response.value(forHTTPHeaderField:"x-ratelimit-remaining")
        let reset=response.value(forHTTPHeaderField:"x-ratelimit-reset").flatMap(TimeInterval.init).map{Date(timeIntervalSince1970:$0)}
        let retry=response.value(forHTTPHeaderField:"retry-after").flatMap(TimeInterval.init).map{now.addingTimeInterval(max(1,$0))}
        guard [403,429].contains(response.statusCode),(remaining=="0" || retry != nil) else{return nil}
        return OracleUpdateRateLimitError(statusCode:response.statusCode,retryAt:max(reset ?? now.addingTimeInterval(60),retry ?? now))
    }
}

final class UpdateNetwork: NSObject, URLSessionTaskDelegate {
    // Native test injection only; production always uses the restricted HTTPS GET.
    private let transport:((String,Int)throws->Data)?
    private static let rateMutex=NSLock()
    private static var blockedUntil:Date?
    private(set) var rateLimit:OracleUpdateRateLimitError?
    private(set) var githubRemaining:Int?
    init(transport:((String,Int)throws->Data)?=nil) {self.transport=transport;super.init()}
    static func resetRateLimitForTests() {rateMutex.lock();blockedUntil=nil;rateMutex.unlock()}
    private static func activeRateLimit(now:Date=Date())->OracleUpdateRateLimitError? {
        rateMutex.lock();defer{rateMutex.unlock()}
        guard let until=blockedUntil else{return nil}
        if until<=now {blockedUntil=nil;return nil}
        return OracleUpdateRateLimitError(statusCode:429,retryAt:until)
    }
    private func register(_ error:OracleUpdateRateLimitError) {
        Self.rateMutex.lock()
        if Self.blockedUntil.map({$0<error.retryAt}) != false {Self.blockedUntil=error.retryAt}
        Self.rateMutex.unlock();rateLimit=error
    }
    private func observe(_ response:HTTPURLResponse) {
        guard response.url?.host=="api.github.com" else{return}
        if let remaining=response.value(forHTTPHeaderField:"x-ratelimit-remaining").flatMap(Int.init) {githubRemaining=remaining}
        if let error=OracleUpdateRateLimitError.response(response) {register(error)}
        else if githubRemaining==0,
                let reset=response.value(forHTTPHeaderField:"x-ratelimit-reset").flatMap(TimeInterval.init) {
            register(OracleUpdateRateLimitError(statusCode:response.statusCode,retryAt:Date(timeIntervalSince1970:reset)))
        }
    }
    func canSpendOptionalRequests(_ count:Int,reserving:Int=0)->Bool {
        guard rateLimit==nil else{return false}
        return githubRemaining.map{$0>=count+reserving} ?? true
    }
    static func permitted(_ url: URL) -> Bool {
        guard url.scheme == "https", url.user == nil, url.password == nil, url.port == nil else { return false }
        return ["github.com", "api.github.com", "objects.githubusercontent.com", "release-assets.githubusercontent.com", "raw.githubusercontent.com"].contains(url.host ?? "")
    }
    func urlSession(_ session: URLSession, task: URLSessionTask, willPerformHTTPRedirection response: HTTPURLResponse, newRequest request: URLRequest, completionHandler: @escaping (URLRequest?) -> Void) {
        completionHandler(request.url.map { Self.permitted($0) } == true ? request : nil)
    }
    func fetch(_ text: String, limit: Int = 2_000_000, progress: ((Int, Int) -> Void)? = nil) throws -> Data {
        guard let url = URL(string: text), Self.permitted(url) else { throw failure("Fonte de atualização não permitida") }
        if url.host=="api.github.com",let blocked=Self.activeRateLimit(){rateLimit=blocked;throw blocked}
        if let transport {
            let data:Data
            do {data=try transport(text,limit)}
            catch let error as OracleUpdateRateLimitError {register(error);throw error}
            guard data.count<=limit else{throw failure("Pacote excede o limite autorizado")}
            progress?(data.count,data.count);return data
        }
        let settings = URLSessionConfiguration.ephemeral
        settings.httpCookieStorage = nil; settings.urlCredentialStorage = nil
        settings.urlCache=nil;settings.requestCachePolicy = .reloadIgnoringLocalCacheData
        settings.timeoutIntervalForRequest = 30; settings.timeoutIntervalForResource = 180
        let session = URLSession(configuration: settings, delegate: self, delegateQueue: nil)
        defer { session.invalidateAndCancel() }
        var request = URLRequest(url: url); request.setValue("OracleCompanion/"+OracleApplicationRelease.installedVersion(fallback:"0.3.14"), forHTTPHeaderField: "User-Agent")
        request.setValue("application/vnd.github+json", forHTTPHeaderField: "Accept")
        let done = DispatchSemaphore(value: 0), mutex = NSLock()
        var result: Result<Data, Error>?
        let task = session.downloadTask(with: request) { local, response, error in
            let value: Result<Data, Error>
            do {
                if let error { throw error }
                guard let response = response as? HTTPURLResponse else{throw failure("Fonte de atualização sem resposta HTTP válida.")}
                self.observe(response)
                if let rate=OracleUpdateRateLimitError.response(response) {throw rate}
                guard response.statusCode == 200, let local else { throw failure("Fonte indisponível (HTTP \(response.statusCode)). Tente novamente.") }
                guard (try local.resourceValues(forKeys: [.fileSizeKey]).fileSize ?? Int.max) <= limit else { throw failure("Pacote excede o limite autorizado") }
                value = .success(try Data(contentsOf: local))
            } catch { value = .failure(error) }
            mutex.lock(); result = value; mutex.unlock(); done.signal()
        }
        // URLSession reports bytes actually transferred, without a simulated timer.
        let progressLock=NSLock();var lastProgress=Date.distantPast,acceptsProgress=true
        let observation=task.observe(\.countOfBytesReceived,options:[.new]) { state,_ in
            guard let progress else{return}
            progressLock.lock();defer{progressLock.unlock()}
            guard acceptsProgress else{return}
            let now=Date()
            guard now.timeIntervalSince(lastProgress)>=0.5 else{return}
            lastProgress=now
            progress(Int(state.countOfBytesReceived),max(0,Int(state.countOfBytesExpectedToReceive)))
        }
        defer{observation.invalidate();progressLock.lock();acceptsProgress=false;progressLock.unlock()}
        task.resume()
        guard done.wait(timeout: .now() + 190) == .success else { task.cancel(); throw failure("Atualização sem resposta; versão atual preservada") }
        mutex.lock(); let answer = result; mutex.unlock()
        observation.invalidate()
        progressLock.lock();acceptsProgress=false;progressLock.unlock()
        let data=try answer!.get()
        progress?(data.count,data.count)
        return data
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
        try writeJSON(preferences, updatePath("sources.local.json"))
        try writeJSON(["phase":"idle","message":"Fonte alterada. Verifique as atualizações.",
                       "results":[],"pendingUpdates":[],"availabilitySourceKey":updateSourceKey()],updatePath("status.json"))
        return preferences
    }
    func githubSlug(_ repository: String) throws -> String {
        guard let url = URLComponents(string: repository), url.scheme == "https", url.host == "github.com", url.user == nil, url.password == nil, url.port == nil, url.query == nil, url.fragment == nil else { throw failure("Use o endereço HTTPS do repositório GitHub, sem credenciais") }
        let parts = url.path.split(separator: "/")
        guard parts.count == 2, parts.allSatisfy({ $0.range(of: #"^[A-Za-z0-9_.-]+$"#, options: .regularExpression) != nil && $0 != "." && $0 != ".." }) else { throw failure("Endereço esperado: https://github.com/organização/repositório") }
        return parts.joined(separator: "/")
    }
    func updateSourceKey() -> String {
        (updatePreferences()["skills_repository"] as? String ?? "")+"|"+(config["gbrainWorkspace"] as? String ?? "managed")+"|"+(config["vault"] as? String ?? "")
    }
    func recordUpdate(_ phase: String, _ text: String, completed: Int = 0, total: Int = 0, results: [[String: Any]] = [], progressSource: String? = nil, diagnostic:[String:Any]=[:], owner:OracleUpdateExecution?=nil) throws {
        guard let execution=owner ?? updateExecution else{throw failure("Progresso recusado: nenhum atualizador possui esta operação.")}
        try execution.write { old in
        let key=execution.sourceKey,oldKey=old["availabilitySourceKey"] as? String
        let sameSource=oldKey == nil || oldKey == key
        let prior=sameSource ? (old["pendingUpdates"] as? [[String:Any]] ?? old["results"] as? [[String:Any]] ?? []) : []
        let pending=OracleUpdateLedger.reconcile(previous:prior,results:results)
        let verified=OracleUpdateLedger.verified(previous:sameSource ? (old["lastVerifiedResults"] as? [[String:Any]] ?? []) : [],results:results)
        let errors=results.filter{$0["status"] as? String=="error"}
        let recordedPhase=phase=="complete" && !errors.isEmpty ? "failed":phase
        let now=ISO8601DateFormatter().string(from:Date())
        let fresh=recordedPhase=="complete"
        var value:[String:Any]=["phase":recordedPhase,"message":text,"completed":completed,"total":total,
            "results":results,"at":now,"pendingUpdates":pending,"lastVerifiedResults":verified,"availabilitySourceKey":key,
            "available":OracleUpdateLedger.installable(pending),"knownUpdate":OracleUpdateLedger.hasNews(pending),
            "installableNow":fresh && results.contains{$0["status"] as? String=="available"},
            "applicationUpdateAvailable":pending.contains{$0["id"] as? String=="oracle" && ["install_available","download_available"].contains($0["status"] as? String ?? "")},
            "applicationUpdateAvailableNow":fresh && results.contains{$0["id"] as? String=="oracle" && $0["status"] as? String=="install_available"}]
        if recordedPhase=="failed",!errors.isEmpty {value["error"]=errors.compactMap{$0["message"] as? String}.joined(separator:"\n")}
        if let progressSource {value["progressSource"]=progressSource}
        for (field,item) in diagnostic {value[field]=item}
        if phase=="complete" {value["checkedAt"]=now}
        else if let checked=old["checkedAt"] {value["checkedAt"]=checked}
        return value
        }
    }
    func updateStatus(requestID:String?=nil) throws -> [String: Any] {
        if let requestID,UUID(uuidString:requestID)==nil {throw failure("Pedido de atualização inválido.")}
        let path=requestID.map{"requests/"+$0+".json"} ?? "status.json"
        var value = (try? readJSON(updatePath(path))) ?? ["phase": "idle", "message": "Pronto para verificar as fontes"]
        if let requestID,value["requestID"] as? String != requestID {
            return OracleUpdateCoordinator.missing(requestID)
        }
        if let target=value["vaultIdentity"] as? String,try updateTargetIdentity(includeSettings:false) != target {
            if let requestID {
                var missing=OracleUpdateCoordinator.missing(requestID);missing["scopeChanged"]=true
                missing["operation"]=value["operation"] ?? NSNull();return missing
            }
            value=["phase":"idle","message":"A pasta mudou. Verifique as atualizações para a seleção atual."]
        }
        value["requestID"]=value["requestID"] ?? NSNull();value["operation"]=value["operation"] ?? NSNull()
        let owner=liveUpdateIdentity()
        let ownsStatus=owner?["executorID"] as? String != nil && owner?["executorID"] as? String==value["executorID"] as? String
        value["busy"]=ownsStatus && !OracleUpdateCoordinator.terminalPhases.contains(value["phase"] as? String ?? "")
        value["canCancelWait"]=false
        value["revision"]=value["revision"] as? Int ?? 0
        if !ownsStatus,OracleUpdateCoordinator.activePhases.contains(value["phase"] as? String ?? "") {
            value["phase"]="interrupted";value["message"]="Operação interrompida. Verifique novamente para recuperar com segurança."
        }
        let key=updateSourceKey(),storedKey=value["availabilitySourceKey"] as? String
        let sameSource=storedKey == nil || storedKey == key
        let pending=OracleUpdateLedger.reconcile(previous:sameSource ? (value["pendingUpdates"] as? [[String:Any]] ?? value["results"] as? [[String:Any]] ?? []) : [],results:[])
        if !sameSource {value["lastVerifiedResults"]=[[String:Any]]()}
        let results=value["results"] as? [[String:Any]] ?? []
        value["pendingUpdates"]=pending
        value["available"]=OracleUpdateLedger.installable(pending)
        value["knownUpdate"]=OracleUpdateLedger.hasNews(pending)
        value["applicationUpdateAvailable"]=pending.contains{$0["id"] as? String=="oracle" && ["install_available","download_available"].contains($0["status"] as? String ?? "")}
        let fresh=value["phase"] as? String=="complete"
        value["installableNow"]=fresh && results.contains{$0["status"] as? String=="available"}
        value["applicationUpdateAvailableNow"]=fresh && results.contains{$0["id"] as? String=="oracle" && $0["status"] as? String=="install_available"}
        value["skills_repository"] = updatePreferences()["skills_repository"] ?? NSNull()
        value["gbrain_version"] = ((try? readJSON(updatePath("runtime/current.json")))?["version"] ?? ((try? updateManifest())?["gbrain"] as? [String: Any])?["bundled_version"]) ?? "desconhecida"
        value["gbrain_rollback"] = (try? readJSON(updatePath("runtime/current.json")))?["previous"] != nil
        value["skills_rollback"] = ((try? readJSON(updatePath("skills/transaction.json")))?["status"] as? String).map { $0 != "rolled_back" } ?? false
        if let plan=try? readJSON(home.appendingPathComponent("setup/plan.json")),isMemoryOnly(plan),let id=plan["id"] as? String,UUID(uuidString:id) != nil {
            value["skills_rollback"]=((try? readJSON(home.appendingPathComponent("staging/"+id+"/transaction.json")))?["status"] as? String).map{["applying","files_installed","rolling_back"].contains($0)} ?? false
        }
        if value["progressSource"] as? String != "runtime",
           onboardingRecord()["status"] as? String == "running",
           ["downloading","installing"].contains(value["phase"] as? String ?? ""),
           let id=onboardingRecord()["runID"] as? String,UUID(uuidString:id) != nil,
           let progress=try? readJSON(home.appendingPathComponent("onboarding/installations/"+id+"/progress.json")) {
            for field in ["completed","total","bytes_downloaded","bytes_total"] {if let number=progress[field] {value[field]=number}}
        }
        let errors=results.filter{$0["status"] as? String=="error"}
        if value["phase"] as? String=="complete",!errors.isEmpty {value["phase"]="failed"}
        if !errors.isEmpty {value["error"]=errors.compactMap{$0["message"] as? String}.joined(separator:"\n")}
        value["catalog_origins"] = catalogSummary().filter { $0["repo"] as? String != nil }.map { ["id":$0["id"] ?? "", "repo":$0["repo"] ?? "", "commit":$0["commit"] ?? ""] }
        return value
    }
    func verifiedRuntime(_ metadata: [String: Any]) throws -> URL {
        guard let id = metadata["directory"] as? String, UUID(uuidString: id) != nil, let files = metadata["files"] as? [String: String], Set(files.keys) == Set(["gbrain", "oracle-gbrain-read"]) else { throw failure("Recibo do motor inválido; restaure a versão anterior nos ajustes") }
        guard let source=try updateManifest()["gbrain"] as? [String:Any],metadata["commit"] as? String==source["adapter_commit"] as? String,
              ((metadata["official_release"] as? [String:Any]).map { OfficialRuntimeRelease.valid($0) && $0["version"] as? String == metadata["version"] as? String && $0["sha256"] as? String == files["gbrain"] } == true || (source["compatible_releases"] as? [[String:Any]] ?? []).contains(where:{$0["version"] as? String==metadata["version"] as? String && $0["sha256"] as? String==files["gbrain"]})) else { throw failure("A versão instalada do Second Brain não corresponde à fonte oficial registrada.") }
        let root = try updatePath("runtime/versions/" + id)
        for (file, expected) in files {
            let path = try scoped(file, root: root)
            guard try fileDigest(path) == expected else { throw failure("Motor alterado fora do atualizador; arquivo preservado. Restaure a versão anterior ou revise a alteração.") }
        }
        return root
    }
    func engineResources() throws -> URL {
        if fm.fileExists(atPath:try updatePath("runtime/transition.json").path){throw failure("Há uma transação do motor interrompida. Reabra o Oracle para recuperar a geração anterior.")}
        let current = try updatePath("runtime/current.json")
        guard fm.fileExists(atPath: current.path) else { return bundledEngineResources() }
        return try verifiedRuntime(readJSON(current))
    }
    /// The release slot preserves its original checksums for integrity/rollback.
    /// Oracle's adapter belongs to the signed app, not to the downloaded CLI.
    /// A new app build may change its bytes without changing the upstream API pin.
    func readAdapterExecutable() throws -> URL {
        _ = try engineResources()
        return try scoped("oracle-gbrain-read",root:bundledEngineResources())
    }

    func activateRuntime(binary: Data, release: [String: Any], validate: ((URL) throws -> Void)? = nil) throws -> [String: Any] {
        let manifest = try updateManifest()
        let official=OfficialRuntimeRelease.valid(release)
        guard let oracleVersion = manifest["oracle_version"] as? String,
              let expected = release["sha256"] as? String, digest(binary) == expected,
              let version = release["version"] as? String, let commit = release["commit"] as? String,
              release["platform"] as? String == "darwin-arm64",
              official || (release["minimum_oracle"] as? String).map { $0.compare(oracleVersion, options:.numeric) != .orderedDescending } == true,
              let gbrain = manifest["gbrain"] as? [String: Any], commit == gbrain["adapter_commit"] as? String,
              (official || (gbrain["compatible_releases"] as? [[String: Any]] ?? []).contains(where: { $0["version"] as? String == version && $0["sha256"] as? String == expected })) else { throw failure("Pacote sem integridade ou compatibilidade aprovada") }
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
        try validateDownloadedRuntime(executable,release:release)
        // Version check has no database, vault, credentials or home profile available.
        if let validate { try validate(executable) } else {
            let result = try runProcess(executable, ["--version"], cwd: slot, environment: ["PATH": "/usr/bin:/bin", "HOME": slot.path, "GBRAIN_HOME": slot.path, "GBRAIN_SKIP_UPDATE_CHECK": "1", "GBRAIN_HOOKS": "0"], timeout: 20)
            guard result.code == 0, result.output.trimmingCharacters(in:.whitespacesAndNewlines) == "gbrain "+version else { throw failure("O motor não passou na verificação de versão") }
        }
        var metadata: [String: Any] = ["directory": id, "version": version, "commit": commit, "upstream_sha256":release["upstream_sha256"] ?? expected,"distributed_sha256":expected,"files": ["gbrain": try fileDigest(executable), "oracle-gbrain-read": try fileDigest(adapter)], "previous": previous]
        if official {metadata["official_release"]=release}
        try writeJSON(metadata, slot.appendingPathComponent("receipt.json"))
        if fm.fileExists(atPath:home.appendingPathComponent("gbrain/profile/.gbrain/config.json").path) {
            guard official || release["database_compatibility"] as? String=="same-schema" else{throw failure("A migração deste banco ainda não foi homologada na matriz do aplicativo.")}
            _=try runRuntimeGeneration(["operation":"runtime-generation","action":"activate","id":UUID().uuidString,"commit":commit,"database_compatibility":"same-schema","metadata":metadata])
            return try readJSON(currentURL)
        }
        // Until this one atomic write, every client keeps using the previous version.
        try writeJSON(metadata, currentURL)
        return metadata
    }
    func rollbackRuntime() throws -> [String: Any] {
        let currentURL = try updatePath("runtime/current.json")
        let current = try readJSON(currentURL)
        guard let previous = current["previous"] as? [String: Any] else { throw failure("Nenhuma versão anterior registrada") }
        if current["generation"] is String,fm.fileExists(atPath:home.appendingPathComponent("gbrain/profile/.gbrain/config.json").path) {
            // The supported matrix has the same adapter/schema. Clone the current
            // database, retaining writes since activation, and validate it with
            // the previous runtime as a new atomic generation. Never restore an
            // old database over new canonical memory.
            let metadata:[String:Any]
            if previous["bundled"] as? Bool==true {
                let id=UUID().uuidString,slot=try updatePath("runtime/versions/"+id)
                try fm.createDirectory(at:slot,withIntermediateDirectories:true)
                for file in ["gbrain","oracle-gbrain-read"]{try fm.copyItem(at:bundledEngineResources().appendingPathComponent(file),to:slot.appendingPathComponent(file))}
                metadata=["directory":id,"version":oracleGBrainPinnedVersion,"commit":oracleGBrainPinnedCommit,"bundled_generation":true,"files":["gbrain":try fileDigest(slot.appendingPathComponent("gbrain")),"oracle-gbrain-read":try fileDigest(slot.appendingPathComponent("oracle-gbrain-read"))],"previous":current]
            } else {_=try verifiedRuntime(previous);metadata=previous}
            _=try runRuntimeGeneration(["operation":"runtime-generation","action":"activate","id":UUID().uuidString,"commit":oracleGBrainPinnedCommit,"database_compatibility":"same-schema","metadata":metadata])
            if metadata["bundled_generation"] as? Bool==true {try fm.removeItem(at:currentURL)}
            notifyVaultChanged(reason:"runtime-recovered-current-canonical-files")
            return ["id":"gbrain","status":"rolled_back","message":"Motor anterior validado com o banco atual; novas memórias e notas preservadas."]
        }
        // A modified active slot is retained for inspection, never deleted by rollback.
        if previous["bundled"] as? Bool == true { try fm.removeItem(at: currentURL) }
        else { _ = try verifiedRuntime(previous); try writeJSON(previous, currentURL) }
        return ["id": "gbrain", "status": "rolled_back", "message": "Motor anterior restaurado. Banco e arquivos pessoais preservados."]
    }
    func skillPathAllowed(_ path: String) -> Bool {
        let pieces = path.split(separator: "/", omittingEmptySubsequences: false)
        guard pieces.count >= 4, pieces[0] == "SISTEMA", pieces[1] == "skills", validSpecialistID(String(pieces[2])), !pieces.contains(where: { $0.isEmpty || $0 == "." || $0 == ".." || $0.hasPrefix(".") }), !path.contains("\\"), path.utf8.count <= 700,!path.unicodeScalars.contains(where:CharacterSet.controlCharacters.contains) else { return false }
        let name=String(pieces.last!).uppercased(),ext=URL(fileURLWithPath:path).pathExtension.lowercased()
        return ["md", "txt", "json", "yaml", "yml", "py", "js", "ts", "sh", "toml", "css", "html", "csv","sql","svg","png","jpg","jpeg","webp"].contains(ext) || ["LICENSE","LICENCE","NOTICE","COPYING"].contains(name)
    }
    func skillFileLimit(_ path:String)->Int {["png","jpg","jpeg","webp"].contains(URL(fileURLWithPath:path).pathExtension.lowercased()) ? 5_000_000 : 2_000_000}
    func skillPathIdentity(_ path:String)->String {portablePathKey(path)}
    func decodeSkillsBundle(_ bytes:Data) throws -> (String,[UpdateFile]) {
        guard bytes.count<=72_000_000,let payload=try JSONSerialization.jsonObject(with:bytes) as? [String:Any],let schema=payload["schema_version"] as? Int,
              (schema==1 && payload["oracle_compatibility"] as? String=="0.2") || (schema==2 && payload["oracle_compatibility"] as? String=="0.3"),
              let version=payload["version"] as? String,!version.isEmpty,version.utf8.count<=80,let records=payload["files"] as? [[String:Any]],!records.isEmpty,records.count<=5000 else { throw failure("Catálogo fora dos contratos Oracle 0.2/0.3") }
        var files=[UpdateFile](),total=0,paths=Set<String>()
        for record in records {
            guard let path=record["path"] as? String,skillPathAllowed(path),paths.insert(skillPathIdentity(path)).inserted,let hash=record["sha256"] as? String,let encoded=record["content_base64"] as? String,encoded.utf8.count<=6_700_000,let data=Data(base64Encoded:encoded),data.count<=(schema==1 ? 2_000_000 : skillFileLimit(path)),digest(data)==hash else { throw failure("Arquivo sem integridade ou caminho autorizado") }
            total+=data.count;guard total<=50_000_000 else { throw failure("Catálogo maior que 50 MB") }
            files.append(UpdateFile(path:path,hash:hash,data:data))
        }
        return (version,files)
    }
    func applySkillFiles(_ files: [UpdateFile], version: String, repository: String) throws -> [String: Any] {
        try withVaultWrite {
            defer { notifyVaultChanged(reason:"skills-update") }
            return try applySkillFilesLocked(files,version:version,repository:repository)
        }
    }
    private func applySkillFilesLocked(_ files: [UpdateFile], version: String, repository: String) throws -> [String: Any] {
        let root = try vault(), receiptURL = try updatePath("skills/installed.json")
        let prior = (try? readJSON(receiptURL)) ?? [:]
        if let priorRoot = prior["vault"] as? String, priorRoot != root.path { throw failure("O catálogo gerenciado pertence a outro vault. Selecione a fonte original antes de atualizar.") }
        if let priorSource=prior["repository"] as? String,priorSource != repository {throw failure("O catálogo pertence a outra fonte. Nenhum arquivo foi adotado automaticamente; revise a migração da fonte.")}
        var owned = prior["files"] as? [String: String] ?? [:]
        if prior.isEmpty,let plan=try? readJSON(home.appendingPathComponent("setup/plan.json")),plan["vault"] as? String==root.path,let planID=plan["id"] as? String,UUID(uuidString:planID) != nil,let catalog=try? readJSON(home.appendingPathComponent("setup/\(planID).catalog.json")),let created=catalog["created_files"] as? [String:String] { owned=created }
        guard files.count <= 5000, Set(files.map {skillPathIdentity($0.path)}).count == files.count, files.reduce(0, { $0 + $1.data.count }) <= 50_000_000 else { throw failure("Manifesto de skills fora dos limites") }
        for file in files { guard skillPathAllowed(file.path), file.data.count <= skillFileLimit(file.path), digest(file.data) == file.hash else { throw failure("Arquivo de skill inválido ou hash divergente") } }
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
                try coordinatedWrite(at:destination) { coordinated in
                guard try scoped(path,root:root).path == coordinated.path else { throw failure("O destino da atualização mudou.") }
                let exists = fm.fileExists(atPath: destination.path)
                let currentHash = try exists ? fileDigest(destination) : nil
                guard currentHash == op["old_hash"] as? String else { throw failure("A fonte mudou durante a atualização; recuperação preservará a edição") }
                let data = try Data(contentsOf: staging.appendingPathComponent("\(fileIndex).new"))
                guard digest(data) == op["new_hash"] as? String else { throw failure("Pacote preparado foi alterado") }
                try fm.createDirectory(at: destination.deletingLastPathComponent(), withIntermediateDirectories: true)
                // intent is durable before the write; recovery also recognizes interrupted writes by hash.
                operations[index]["intent"] = true; transaction["operations"] = operations; try writeJSON(transaction, transactionURL)
                if exists {try atomicWriteData(data,to:destination)}else{try data.write(to:destination,options:.withoutOverwriting)}
                guard try fileDigest(destination) == op["new_hash"] as? String else { throw failure("Não foi possível verificar a gravação") }
                }
                operations[index]["applied"] = true; verified[path] = op["new_hash"] as? String
                transaction["operations"] = operations; try writeJSON(transaction, transactionURL)
                if updateExecution != nil {try recordUpdate("applying", "Atualizando skills", completed: index + 1, total: operations.count)}
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
        try withVaultWrite {
            defer { notifyVaultChanged(reason:"skills-rollback") }
            return try rollbackSkillsLocked()
        }
    }
    private func rollbackSkillsLocked() throws -> [String: Any] {
        let transactionURL = try updatePath("skills/transaction.json")
        var transaction = try readJSON(transactionURL)
        guard transaction["status"] as? String != "rolled_back", let id = transaction["id"] as? String, UUID(uuidString: id) != nil, let rootPath = transaction["vault"] as? String, rootPath == config["vault"] as? String else { throw failure("Recuperação não disponível para esta fonte") }
        let root = try vault(), staging = try updatePath("skills/staging/" + id)
        var retained = [String](), restored = 0
        for op in (transaction["operations"] as? [[String: Any]] ?? []).reversed() {
            guard op["intent"] as? Bool == true, let path = op["path"] as? String, skillPathAllowed(path), let index = op["index"] as? Int else { continue }
            let destination = try scoped(path, root: root)
            guard fm.fileExists(atPath: destination.path) else { continue }
            try coordinatedWrite(at:destination) { coordinated in
            guard try scoped(path,root:root).path == coordinated.path else { throw failure("O destino da recuperação mudou.") }
            guard try fileDigest(destination) == op["new_hash"] as? String else { retained.append(path); return }
            if let expected = op["old_hash"] as? String {
                let data = try Data(contentsOf: staging.appendingPathComponent("\(index).old"))
                guard digest(data) == expected else { throw failure("Backup alterado; recuperação interrompida sem sobrescrever a fonte") }
                try atomicWriteData(data,to:destination)
            } else { guard Darwin.unlink(destination.path) == 0 else { throw failure("Arquivo preservado: recuperação não remove pastas recursivamente.") } }
            restored += 1
            }
        }
        try writeJSON(transaction["previous"] ?? [:], updatePath("skills/installed.json"))
        transaction["status"] = "rolled_back"; transaction["retained"] = retained; try writeJSON(transaction, transactionURL)
        return ["id": "skills", "status": "rolled_back", "message": "\(restored) arquivos restaurados; \(retained.count) edições posteriores preservadas.", "preserved": retained]
    }
    func performUpdates(operation: String = "check-apply") throws -> [String: Any] {
        let execution=try acquireUpdateExecution(operation:operation)
        defer{execution.close()}
        return try performAdmittedUpdates(execution)
    }
    func performLegacyUpdatesLocked(operation:String) throws -> [String:Any] {
        guard updateExecution?.distribution==false else{throw failure("Atualização sem admissão exclusiva.")}
        refreshConfig()
        if operation == "rollback-gbrain" || operation == "rollback-skills" {
            let result = try operation == "rollback-gbrain" ? rollbackRuntime() : rollbackSkills()
            try recordUpdate("complete", "Versão anterior recuperada", results: [result]); return try updateStatus()
        }
        guard ["check-apply","check-only"].contains(operation) else { throw failure("Operação de atualização desconhecida") }
        let checkOnly = operation == "check-only"
        var recoveryError:String?
        if let pending = try? readJSON(updatePath("skills/transaction.json")), pending["status"] as? String == "applying" { if checkOnly { recoveryError="Há uma atualização interrompida. Use Restaurar skills anteriores antes de continuar." } else { do { _ = try rollbackSkills() } catch { recoveryError=error.localizedDescription } } }
        let network = UpdateNetwork()
        var results = [[String: Any]]()
        try recordUpdate("checking", "Consultando releases oficiais")
        if let application=checkOracleApplication(network:network) {results.append(application)}
        do {
            if config["gbrainWorkspace"] != nil {
                results.append(["id": "gbrain", "status": "external", "message": "Instalação externa preservada. Atualização deve ser validada pelo operador dessa fonte."])
            } else {
                results.append(try updateOfficialRuntime(network:network,checkOnly:checkOnly,locksHeld:true))
            }
        } catch { results.append(["id": "gbrain", "status": "error", "message": error.localizedDescription]) }
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
                results.append(try checkOnly ? previewSkillFiles(files,version:version,repository:repository) : applySkillFiles(files, version: version, repository: repository))
            } catch { results.append(["id": "skills", "status": "error", "message": error.localizedDescription]) }
        } else { results.append(["id": "skills", "status": "not_configured", "message": "Fonte não configurada. Informe o futuro repositório central de skills."]) }
        try recordUpdate("complete", "Verificação concluída", results: results)
        return try updateStatus()
    }
}
