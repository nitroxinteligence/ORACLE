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
    init(home: URL? = nil) throws {
        self.home = home ?? fm.homeDirectoryForCurrentUser.appendingPathComponent("Library/Application Support/OracleCompanion")
        try fm.createDirectory(at: self.home, withIntermediateDirectories: true, attributes: [.posixPermissions: 0o700])
        config = (try? readJSON(self.home.appendingPathComponent("config.json"))) ?? [:]
    }
    func persist() throws { try writeJSON(config, home.appendingPathComponent("config.json")) }
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
        var value: [String: Any] = ["config":config,"collections":collections.map { ["id":$0.0,"name":$0.1,"icon":$0.2] },"events":try events(),"engine":"não verificado","coverage":"Hooks opcionais; sem acesso ao banco privado do Codex; ausência de evento = desconhecido"]
        if let root = try? vault() { do { value["entries"] = try scan(root: root) } catch { value["entries"] = []; value["scanError"] = error.localizedDescription } }
        else { value["entries"] = [] }
        value["home"] = home.path
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
        guard path.hasSuffix("SKILL.md"), text.utf8.count < 2_000_000, text.hasPrefix("---\n"), text.range(of: "(?m)^name: .+", options: .regularExpression) != nil, text.range(of: "(?m)^description: .+", options: .regularExpression) != nil else { throw failure("SKILL.md exige frontmatter com name e description") }
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
        let relative = "SISTEMA/skills/personal-overrides/\(slug)-\(UUID().uuidString.prefix(8))/SKILL.md"
        let destination = try scoped(relative, root: vault())
        try fm.createDirectory(at: destination.deletingLastPathComponent(), withIntermediateDirectories: true)
        try Data(text.utf8).write(to: destination, options: .atomic)
        try writeJSON(["source":path,"source_hash":original,"saved_hash":digest(Data(text.utf8)),"created_at":ISO8601DateFormatter().string(from: Date()),"codex_status":"não verificado"], destination.deletingLastPathComponent().appendingPathComponent("provenance.json"))
        return ["path":relative,"status":"Versão pessoal salva; aplicação no Codex não verificada"]
    }
    func events() throws -> [[String: Any]] {
        let dir = home.appendingPathComponent("events")
        guard fm.fileExists(atPath: dir.path) else { return [] }
        return try fm.contentsOfDirectory(at: dir, includingPropertiesForKeys: nil).filter { $0.pathExtension == "json" }.compactMap { try? readJSON($0) }.sorted { ($0["received_at"] as? String ?? "") < ($1["received_at"] as? String ?? "") }.suffix(2000).map { $0 }
    }
    func event(type: String, summary: String, source: String = "oracle", id: String = UUID().uuidString) throws {
        let safeID = digest(Data(id.utf8))
        let dest = home.appendingPathComponent("events/\(safeID).json")
        if fm.fileExists(atPath: dest.path) { return }
        let now = ISO8601DateFormatter().string(from: Date())
        try writeJSON(["schema_version":1,"event_id":safeID,"source":source,"event_type":type,"sanitized_summary":summary,"received_at":now,"occurred_at":now,"coverage":"partial","observed_status":"observed"],dest)
    }
    func ingestHook(_ input: [String: Any]) throws {
        let allowed = ["SessionStart","SessionEnd","UserPromptSubmit","PreToolUse","PostToolUse","PermissionRequest","SubagentStart","SubagentStop","Stop","PreCompact","PostCompact"]
        guard let kind = input["hook_event_name"] as? String, allowed.contains(kind) else { throw failure("Evento de hook desconhecido") }
        // No prompt, tool arguments, output, transcript or reasoning is persisted.
        let session = digest(Data((input["session_id"] as? String ?? "unknown").utf8))
        let ref = input["tool_use_id"] as? String ?? input["event_id"] as? String ?? UUID().uuidString
        try event(type:kind,summary:kind == "Stop" ? "Turno encerrado; conclusão do objetivo não verificada" : "Hook \(kind) recebido",source:"codex-hook",id:session+kind+ref)
    }
    func makePlan(answers: [String: String], isNew: Bool, attach: Bool) throws -> [String: Any] {
        if !attach { for (key, limit) in identityLimits { guard let v = answers[key], !v.trimmingCharacters(in: .whitespacesAndNewlines).isEmpty, v.count <= limit else { throw failure("Campo obrigatório inválido: \(key)") } } }
        let root = try vault()
        let plan: [String: Any] = ["schema_version":1,"id":UUID().uuidString,"vault":root.path,"new_vault":isNew,"attach":attach,"answers":answers,"answers_hash":digest(try jsonData(answers)),"folders":isNew ? templateFolders : [],"executor":"Codex Desktop","created_at":ISO8601DateFormatter().string(from:Date())]
        try writeJSON(plan,home.appendingPathComponent("setup/plan.json"))
        return plan
    }
    func confirmPlan(hash: String) throws {
        let url = home.appendingPathComponent("setup/plan.json")
        var plan = try readJSON(url)
        guard plan["answers_hash"] as? String == hash, digest(try jsonData(plan["answers"] ?? [:])) == hash else { throw failure("Respostas mudaram; revise novamente") }
        plan["confirmed_hash"] = hash; try writeJSON(plan,url)
    }
    func applyPlan(rollback: Bool = false, verifyOnly: Bool = false) throws -> [String: Any] {
        let plan = try readJSON(home.appendingPathComponent("setup/plan.json"))
        guard let hash = plan["confirmed_hash"] as? String, hash == plan["answers_hash"] as? String, hash == digest(try jsonData(plan["answers"] ?? [:])), let rootPath = plan["vault"] as? String, rootPath == config["vault"] as? String, let id = plan["id"] as? String else { throw failure("Plano não confirmado ou pasta alterada") }
        let lock = home.appendingPathComponent("setup/apply.lock")
        do { try fm.createDirectory(at:lock,withIntermediateDirectories:false) } catch { throw failure("Instalação já em execução; se houve falha, examine e remova apply.lock antes de retomar") }
        defer { try? fm.removeItem(at:lock) }
        let root = URL(fileURLWithPath:rootPath)
        let journalURL = home.appendingPathComponent("setup/\(id).json")
        var journal = (try? readJSON(journalURL)) ?? ["id":id,"created":[String](),"verified":[String]()]
        var created = journal["created"] as? [String] ?? []
        var verified = journal["verified"] as? [String] ?? []
        if rollback {
            for path in created.reversed() {
                let dir = try scoped(path,root:root)
                if (try? fm.contentsOfDirectory(atPath:dir.path).isEmpty) == true { try fm.removeItem(at:dir) }
            }
            journal["status"] = "rolled_back_empty_folders_only"; try writeJSON(journal,journalURL)
            try event(type:"setup.rollback",summary:"Rollback preservou arquivos e pastas não vazias")
            return journal
        }
        for path in plan["folders"] as? [String] ?? [] {
            let url = try scoped(path,root:root)
            if !fm.fileExists(atPath:url.path) {
                if verifyOnly { throw failure("Pasta ausente: \(path)") }
                // Journal ownership before mutation: safe resume after crash.
                if !created.contains(path) { created.append(path); journal["created"] = created; try writeJSON(journal,journalURL) }
                try fm.createDirectory(at:url,withIntermediateDirectories:true)
            }
            var directory: ObjCBool = false
            guard fm.fileExists(atPath:url.path,isDirectory:&directory), directory.boolValue else { throw failure("Colisão: \(path) não é pasta") }
            if !verified.contains(path) { verified.append(path); journal["verified"] = verified; try writeJSON(journal,journalURL); try event(type:"setup.folder_verified",summary:path,id:id+path) }
        }
        journal["status"] = "structure_verified"; journal["gbrain"] = "requires_official_bootstrap"; try writeJSON(journal,journalURL)
        try event(type:"setup.structure_verified",summary:"Estrutura verificada; GBrain e confiança Codex têm verificações separadas",id:id+"structure")
        return journal
    }
}
