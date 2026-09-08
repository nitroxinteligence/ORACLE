import Foundation
import CryptoKit

let fm = FileManager.default
func failure(_ text: String) -> NSError { NSError(domain: "Oracle", code: 1, userInfo: [NSLocalizedDescriptionKey: text]) }
func digest(_ data: Data) -> String { SHA256.hash(data: data).map { String(format: "%02x", $0) }.joined() }
func jsonData(_ value: Any) throws -> Data { try JSONSerialization.data(withJSONObject: value, options: [.sortedKeys, .prettyPrinted]) }
func readJSON(_ url: URL) throws -> [String: Any] { guard let v = try JSONSerialization.jsonObject(with: Data(contentsOf: url)) as? [String: Any] else { throw failure("JSON inválido") }; return v }
func writeJSON(_ value: Any, _ url: URL) throws { try fm.createDirectory(at: url.deletingLastPathComponent(), withIntermediateDirectories: true); try jsonData(value).write(to: url, options: .atomic); try fm.setAttributes([.posixPermissions: 0o600], ofItemAtPath: url.path) }
let collections: [(String, String, String)] = [("ads","Ads","megaphone"),("code","Code","code"),("contents","Contents","note"),("customer-finder","Customer Finder","search"),("cyber-security","Cybersecurity","shield"),("marketing","Marketing","chart"),("personal-branding","Personal Branding","person")]
let identityLimits = ["AGENT_NAME":64,"PRINCIPAL_NAME":128,"AGENT_PURPOSE":2048,"AGENT_TOP_JOBS":2048,"PRINCIPAL_CONTEXT":4096,"VOICE_REGISTER":1024]
let templateFolders = ["INBOX/oracle","INBOX/oracle-history/conversations","INBOX/oracle-memory/people","INBOX/oracle-memory/projects","INBOX/oracle-memory/signals","PROJETOS","AREAS/pessoal","AREAS/profissional","WIKI/pessoas","WIKI/organizacoes","WIKI/conceitos","FONTES","DIARIO","OUTPUTS","ARQUIVO","SISTEMA/agentes","SISTEMA/modelos","SISTEMA/indices","SISTEMA/oracle"] + collections.map { "SISTEMA/skills/" + $0.0 }

final class Core {
    let home: URL
    var config: [String: Any]
    var lastSequence:Int64 = 0
    var configBaseline:[String:Any] = [:]
    init(home: URL? = nil) throws {
        self.home = home ?? fm.homeDirectoryForCurrentUser.appendingPathComponent("Library/Application Support/OracleCompanion")
        try fm.createDirectory(at: self.home, withIntermediateDirectories: true, attributes: [.posixPermissions: 0o700])
        config = (try? readJSON(self.home.appendingPathComponent("config.json"))) ?? [:]
        configBaseline=config
    }
    func persist() throws { try persistMergedConfig() }
    func scoped(_ relative: String, root: URL) throws -> URL {
        guard !relative.hasPrefix("/"), !relative.split(separator: "/").contains("..") else { throw failure("Caminho fora do escopo") }
        let url = root.appendingPathComponent(relative).standardizedFileURL
        let base = root.resolvingSymlinksInPath().path
        guard url.resolvingSymlinksInPath().path.hasPrefix(base + "/") else { throw failure("Link fora da pasta autorizada") }
        // Reject every symbolic-link component, including links within the vault.
        var current = root
        for piece in relative.split(separator: "/") { current.appendPathComponent(String(piece)); if (try? current.resourceValues(forKeys: [.isSymbolicLinkKey]).isSymbolicLink) == true { throw failure("Links simbólicos não são acessados") } }
        return url
    }
    func vault() throws -> URL { guard let path = config["vault"] as? String, fm.fileExists(atPath: path) else { throw failure("Selecione uma pasta de conhecimento acessível") }; return URL(fileURLWithPath: path) }
    func scan(root: URL, instructionsOnly: Bool = false) throws -> [[String: Any]] {
        var output = [[String: Any]]()
        guard let walker = fm.enumerator(at: root, includingPropertiesForKeys: [.isDirectoryKey,.isSymbolicLinkKey,.fileSizeKey,.contentModificationDateKey], options: [.skipsHiddenFiles], errorHandler: { _, _ in false }) else { throw failure("Não foi possível ler a pasta") }
        for case let file as URL in walker {
            let values = try file.resourceValues(forKeys: [.isDirectoryKey,.isSymbolicLinkKey,.fileSizeKey,.contentModificationDateKey])
            if values.isSymbolicLink == true { walker.skipDescendants(); continue }
            if ["node_modules","vendor","dist","build"].contains(file.lastPathComponent), values.isDirectory == true { walker.skipDescendants(); continue }
            let rel = String(file.path.dropFirst(root.path.count + 1))
            if instructionsOnly && values.isDirectory != true && !["AGENTS.md","AGENTS.override.md"].contains(file.lastPathComponent) { continue }
            if values.isDirectory != true && file.pathExtension.lowercased() != "md" { continue }
            if values.isDirectory != true && (values.fileSize ?? 0) > 2_000_000 { continue }
            output.append(["path":rel,"name":file.lastPathComponent,"directory":values.isDirectory == true,"size":values.fileSize ?? 0,"modified":values.contentModificationDate?.timeIntervalSince1970 ?? 0,"source":root.path])
            if output.count >= 60000 { throw failure("Limite de 60 mil entradas: selecione uma pasta menor") }
        }
        return output.sorted { ($0["path"] as! String) < ($1["path"] as! String) }
    }
    func snapshot() throws -> [String: Any] {
        refreshConfig()
        var value: [String: Any] = ["config":config,"collections":collections.map { ["id":$0.0,"name":$0.1,"icon":$0.2] },"events":try events(),"engine":"não verificado","coverage":"Hooks opcionais; sem acesso ao banco privado do Codex; ausência de evento = desconhecido"]
        if let root = try? vault() { do { value["entries"] = try scan(root: root) } catch { value["entries"] = []; value["scanError"] = error.localizedDescription } }
        else { value["entries"] = [] }
        value["home"] = home.path
        value["catalog"] = catalogSummary()
        if let plan=try? readJSON(home.appendingPathComponent("setup/plan.json")),plan["vault"] as? String==config["vault"] as? String { value["setup"]=["plan_id":plan["id"] ?? "", "confirmed":plan["confirmed_hash"] != nil] }
        value["projects"] = config["projects"] ?? []
        return value
    }
    func readNote(_ relative: String) throws -> [String: Any] {
        let url = try scoped(relative, root: vault())
        guard url.pathExtension.lowercased() == "md", (try url.resourceValues(forKeys: [.fileSizeKey]).fileSize ?? 0) <= 2_000_000 else { throw failure("Somente Markdown até 2 MB") }
        let data = try Data(contentsOf: url)
        return ["text":String(decoding: data, as: UTF8.self),"hash":digest(data),"path":url.path]
    }
    func saveVersion(path: String, original: String, text: String) throws -> [String: Any] {
        let normalized=text.replacingOccurrences(of:"\r\n",with:"\n")
        let header=normalized.components(separatedBy:"\n---\n")
        guard path.hasSuffix("/SKILL.md"), text.utf8.count < 2_000_000, normalized.hasPrefix("---\n"), header.count>=2, header[0].range(of: "(?m)^name: .+", options: .regularExpression) != nil, header[0].range(of: "(?m)^description: .+", options: .regularExpression) != nil else { throw failure("SKILL.md exige frontmatter delimitado com name e description") }
        let source = try scoped(path, root: vault())
        let current = try Data(contentsOf: source)
        guard digest(current) == original else {
            let conflict = home.appendingPathComponent("conflicts/\(UUID().uuidString).md")
            try fm.createDirectory(at: conflict.deletingLastPathComponent(), withIntermediateDirectories: true)
            try Data(text.utf8).write(to: conflict, options: .atomic)
            throw failure("Conflito: a fonte mudou. Sua proposta foi preservada em \(conflict.path)")
        }
        // A personal version never overwrites a vendor's source.
        let slug = source.deletingLastPathComponent().lastPathComponent
        let parent=source.deletingLastPathComponent().deletingLastPathComponent()
        let parentRelative=String(parent.path.dropFirst(try vault().path.count+1))
        let relative = "\(parentRelative)/\(slug)-personal-\(UUID().uuidString.prefix(8))/SKILL.md"
        let destination = try scoped(relative, root: vault())
        let sourceFolder=source.deletingLastPathComponent()
        // Copy relative assets alongside the personal skill, at the same depth.
        guard let enumerator=fm.enumerator(at:sourceFolder,includingPropertiesForKeys:[.isSymbolicLinkKey,.fileSizeKey],options:[]) else { throw failure("Não foi possível ler o pacote") }
        let assets=enumerator.allObjects.compactMap{$0 as? URL}
        guard assets.count<10000 else { throw failure("Pacote grande demais para uma versão pessoal") }
        var size=0
        for asset in assets { let values=try asset.resourceValues(forKeys:[.isSymbolicLinkKey,.fileSizeKey]);guard values.isSymbolicLink != true else { throw failure("Pacote com symlink exige revisão manual") };size += values.fileSize ?? 0 }
        guard size<100_000_000 else { throw failure("Pacote pessoal excede 100 MB") }
        try fm.copyItem(at:sourceFolder,to:destination.deletingLastPathComponent())
        try Data(text.utf8).write(to: destination, options: .atomic)
        try writeJSON(["source":path,"source_hash":original,"saved_hash":digest(Data(text.utf8)),"created_at":ISO8601DateFormatter().string(from: Date()),"codex_status":"não verificado"], destination.deletingLastPathComponent().appendingPathComponent("provenance.json"))
        return ["path":relative,"status":"Versão pessoal salva; aplicação no Codex não verificada"]
    }
    func events(directory:URL? = nil,limit:Int = 2000) throws -> [[String: Any]] {
        let dir=directory ?? home.appendingPathComponent("events")
        guard fm.fileExists(atPath:dir.path) else { return [] }
        let urls=try fm.contentsOfDirectory(at:dir,includingPropertiesForKeys:[.contentModificationDateKey,.fileSizeKey],options:[.skipsHiddenFiles]).filter{$0.pathExtension=="json"}
        let recent=urls.map{url in (url,(try? url.resourceValues(forKeys:[.contentModificationDateKey]).contentModificationDate) ?? Date.distantPast)}.sorted{$0.1>$1.1}.prefix(limit)
        let fractional=ISO8601DateFormatter();fractional.formatOptions=[.withInternetDateTime,.withFractionalSeconds]
        let basic=ISO8601DateFormatter()
        return recent.compactMap { pair -> (Int64,[String:Any])? in
            guard (try? pair.0.resourceValues(forKeys:[.fileSizeKey]).fileSize) ?? 0 < 65536,let doc=try? readJSON(pair.0),doc["schema_version"] as? Int==1,doc["event_id"] is String else { return nil }
            let at=doc["received_at"] as? String ?? ""
            let date=fractional.date(from:at) ?? basic.date(from:at) ?? Date.distantPast
            let sequence=(doc["sequence"] as? NSNumber)?.int64Value ?? Int64(max(0,date.timeIntervalSince1970)*1_000_000)
            return (sequence,doc)
        }.sorted { a,b in a.0==b.0 ? (a.1["event_id"] as! String)<(b.1["event_id"] as! String) : a.0<b.0 }.map{$0.1}
    }
    func event(type: String, summary: String, source: String = "oracle", id: String = UUID().uuidString, details:[String:Any] = [:]) throws {
        let safeID = digest(Data(id.utf8))
        let dest = home.appendingPathComponent("events/\(safeID).json")
        if fm.fileExists(atPath: dest.path) { return }
        let formatter=ISO8601DateFormatter();formatter.formatOptions=[.withInternetDateTime,.withFractionalSeconds];let now=formatter.string(from:Date());lastSequence=max(lastSequence+1,Int64(Date().timeIntervalSince1970*1_000_000))
        var document:[String:Any] = ["schema_version":1,"event_id":safeID,"sequence":lastSequence,"source":source,"event_type":type,"sanitized_summary":summary,"received_at":now,"occurred_at":now,"coverage":"partial","observed_status":"observed"]
        for key in ["phase","completed","total","run_id","plan_ref","subject_refs","removed_refs"] { if let value=details[key] { document[key]=value } };try writeJSON(document,dest)
        if let planID=(details["plan_ref"] ?? details["run_id"]) as? String,UUID(uuidString:planID) != nil { try writeJSON(document,home.appendingPathComponent("setup/events/\(planID)/\(safeID).json")) }
    }
    func ingestHook(_ input: [String: Any]) throws {
        let allowed = ["SessionStart","SessionEnd","UserPromptSubmit","PreToolUse","PostToolUse","PermissionRequest","SubagentStart","SubagentStop","Stop","PreCompact","PostCompact"]
        guard let kind = input["hook_event_name"] as? String, allowed.contains(kind) else { throw failure("Evento de hook desconhecido") }
        // No prompt, tool arguments, output, transcript or reasoning is persisted.
        let session = digest(Data((input["session_id"] as? String ?? "unknown").utf8))
        let ref = input["tool_use_id"] as? String ?? input["event_id"] as? String ?? UUID().uuidString
        try event(type:kind,summary:kind == "Stop" ? "Turno encerrado; conclusão do objetivo não verificada" : "Hook \(kind) recebido",source:"codex-hook",id:session+kind+ref)
    }
    func makePlan(answers: [String: String], isNew: Bool, attach: Bool, catalogCollections:[String] = []) throws -> [String: Any] {
        let lock=try acquireOperationLock("setup");defer{releaseOperationLock(lock)}
        let brain=try acquireOperationLock("gbrain");defer{releaseOperationLock(brain)}
        refreshConfig()
        if !attach { for (key, limit) in identityLimits { guard let v = answers[key], !v.trimmingCharacters(in: .whitespacesAndNewlines).isEmpty, v.count <= limit else { throw failure("Campo obrigatório inválido: \(key)") } } }
        let root = try vault()
        guard catalogCollections.allSatisfy({id in collections.contains(where:{$0.0==id})}) else { throw failure("Coleção desconhecida") }
        var plan: [String: Any] = ["schema_version":1,"id":UUID().uuidString,"vault":root.path,"new_vault":isNew,"attach":attach,"answers":answers,"answers_hash":digest(try jsonData(answers)),"folders":isNew ? templateFolders : [],"executor":"Codex Desktop","created_at":ISO8601DateFormatter().string(from:Date())]
        plan["catalog_collections"]=catalogCollections
        if !catalogCollections.isEmpty { plan["catalog_hash"]=try catalogDigest() }
        plan["plan_hash"]=try planDigest(plan)
        try writeJSON(try scan(root:root),home.appendingPathComponent("setup/\(plan["id"] as! String).baseline.json"))
        try writeJSON(plan,home.appendingPathComponent("setup/plans/\(plan["id"] as! String).json"))
        try writeJSON(plan,home.appendingPathComponent("setup/plan.json"))
        return plan
    }
    func planDigest(_ plan:[String:Any]) throws -> String {
        var payload=plan;payload.removeValue(forKey:"plan_hash");payload.removeValue(forKey:"confirmed_hash")
        return digest(try jsonData(payload))
    }
    func validatedPlan() throws -> [String:Any] {
        let plan=try readJSON(home.appendingPathComponent("setup/plan.json"))
        guard let hash=plan["plan_hash"] as? String,hash==plan["confirmed_hash"] as? String,hash==(try planDigest(plan)),plan["answers_hash"] as? String==digest(try jsonData(plan["answers"] ?? [:])),plan["vault"] as? String==config["vault"] as? String else { throw failure("Plano mudou ou não foi confirmado. Revise a configuração no Oracle.") }
        return plan
    }
    func confirmPlan(hash: String) throws {
        let url=home.appendingPathComponent("setup/plan.json");var plan=try readJSON(url)
        guard plan["plan_hash"] as? String==hash,try planDigest(plan)==hash else { throw failure("A configuração mudou. Revise o plano novamente.") }
        plan["confirmed_hash"]=hash;try writeJSON(plan,url)
        if let id=plan["id"] as? String { try writeJSON(plan,home.appendingPathComponent("setup/plans/\(id).json")) }
    }
    func replayData() throws -> [String:Any] {
        refreshConfig();let plan=try readJSON(home.appendingPathComponent("setup/plan.json"));guard plan["vault"] as? String==config["vault"] as? String,let id=plan["id"] as? String else { throw failure("Nenhum plano para reproduzir") }
        let baselineURL=home.appendingPathComponent("setup/\(id).baseline.json")
        let baseline=(try? JSONSerialization.jsonObject(with:Data(contentsOf:baselineURL))) ?? []
        let archive=home.appendingPathComponent("setup/events/\(id)")
        let journal=try events(directory:fm.fileExists(atPath:archive.path) ? archive : nil,limit:10000).filter { $0["run_id"] as? String==id || $0["plan_ref"] as? String==id }
        return ["baseline":baseline,"events":journal,"plan_id":id,"coverage":"Somente itens do journal desta instalação; não é todo o histórico do vault."]
    }
    func applyPlan(rollback: Bool = false, verifyOnly: Bool = false) throws -> [String: Any] {
        let operationLock=try acquireOperationLock("setup");defer{releaseOperationLock(operationLock)}
        let brainLock=try acquireOperationLock("gbrain");defer{releaseOperationLock(brainLock)}
        refreshConfig()
        let plan=try validatedPlan()
        guard let rootPath=plan["vault"] as? String,let id=plan["id"] as? String else { throw failure("Plano inválido") }
        let root = URL(fileURLWithPath:rootPath)
        let journalURL = home.appendingPathComponent("setup/\(id).json")
        var journal = (try? readJSON(journalURL)) ?? ["id":id,"created":[String](),"verified":[String]()]
        var created = journal["created"] as? [String] ?? []
        var verified = journal["verified"] as? [String] ?? []
        if rollback {
            _ = try applyCatalog(plan:plan,rollback:true)
            var removedRefs=[[String:Any]]()
            for path in created.reversed() {
                let dir = try scoped(path,root:root)
                if (try? fm.contentsOfDirectory(atPath:dir.path).isEmpty) == true { try fm.removeItem(at:dir);removedRefs.append(["path":path,"directory":true]) }
            }
            journal["status"] = "rolled_back_empty_folders_only"; try writeJSON(journal,journalURL)
            try event(type:"setup.rollback",summary:"Rollback preservou arquivos e pastas não vazias",details:["run_id":id,"phase":"rollback","completed":removedRefs.count,"total":created.count,"removed_refs":removedRefs])
            return journal
        }
        for path in plan["folders"] as? [String] ?? [] {
            let url = try scoped(path,root:root)
            if !fm.fileExists(atPath:url.path) {
                if verifyOnly { throw failure("Pasta ausente: \(path)") }
                // Journal ownership before mutation: safe resume after crash.
                var prefix="";for part in path.split(separator:"/") { prefix=prefix.isEmpty ? String(part) : prefix+"/"+part;let parent=try scoped(prefix,root:root);if !fm.fileExists(atPath:parent.path) && !created.contains(prefix) { created.append(prefix) } };journal["created"]=created;try writeJSON(journal,journalURL)
                try fm.createDirectory(at:url,withIntermediateDirectories:true)
            }
            var directory: ObjCBool = false
            guard fm.fileExists(atPath:url.path,isDirectory:&directory), directory.boolValue else { throw failure("Colisão: \(path) não é pasta") }
            if !verified.contains(path) { verified.append(path); journal["verified"] = verified; try writeJSON(journal,journalURL); try event(type:"setup.folder_verified",summary:path,id:id+path,details:["run_id":id,"phase":"structure","completed":verified.count,"total":(plan["folders"] as? [String] ?? []).count,"subject_refs":[["path":path,"directory":true]]]) }
        }
        journal["status"] = "structure_verified"; journal["gbrain"] = "requires_official_bootstrap"; try writeJSON(journal,journalURL)
        try event(type:"setup.structure_verified",summary:"Estrutura verificada; GBrain e confiança Codex têm verificações separadas",id:id+"structure",details:["run_id":id,"phase":"structure","completed":verified.count,"total":verified.count])
        _ = try applyCatalog(plan:plan,verifyOnly:verifyOnly)
        return journal
    }
}
