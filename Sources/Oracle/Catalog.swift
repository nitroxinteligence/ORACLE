import Foundation

extension Core {
    func catalogRoot() -> URL { bundledEngineResources().deletingLastPathComponent().appendingPathComponent("catalog") }
    func catalogManifest() throws -> [String:Any] { try readJSON(catalogRoot().appendingPathComponent("manifest.json")) }
    func catalogSummary() -> [[String:Any]] { (try? catalogManifest()["collections"] as? [[String:Any]]) ?? [] }
    func catalogDigest() throws -> String { digest(try Data(contentsOf:catalogRoot().appendingPathComponent("manifest.json"))) }
    func applyCatalog(plan:[String:Any],rollback:Bool=false,verifyOnly:Bool=false) throws -> [String:Any] {
        let selected=plan["catalog_collections"] as? [String] ?? []
        if selected.isEmpty { return ["verified":0,"total":0] }
        guard let id=plan["id"] as? String,plan["catalog_hash"] as? String == (try catalogDigest()) else { throw failure("Catálogo mudou. Gere e revise outro plano antes de instalar.") }
        let manifest=try catalogManifest(),root=try vault()
        let journalURL=home.appendingPathComponent("setup/\(id).catalog.json")
        var journal=(try? readJSON(journalURL)) ?? ["created_files":[String:String](),"created_dirs":[String](),"verified":0]
        var owned=journal["created_files"] as? [String:String] ?? [:]
        var directories=Set(journal["created_dirs"] as? [String] ?? [])
        if rollback {
            var retained=[String](),removed=0,removedBatch=[[String:Any]]()
            for (path,hash) in owned { let url=try scoped(path,root:root);if fm.fileExists(atPath:url.path) { if digest(try Data(contentsOf:url))==hash { try fm.removeItem(at:url);removed += 1;removedBatch.append(["path":path,"directory":false]);if removedBatch.count==50 { try event(type:"catalog.rollback_verified",summary:"\(removed) arquivos revertidos",id:id+"rollback"+String(removed),details:["run_id":id,"phase":"rollback","completed":removed,"total":owned.count,"removed_refs":removedBatch]);removedBatch=[] } } else { retained.append(path) } } }
            if !removedBatch.isEmpty { try event(type:"catalog.rollback_verified",summary:"\(removed) arquivos revertidos",id:id+"rollback"+String(removed),details:["run_id":id,"phase":"rollback","completed":removed,"total":owned.count,"removed_refs":removedBatch]);removedBatch=[] }
            for path in directories.sorted(by:{$0.count>$1.count}) { let url=try scoped(path,root:root);if (try? fm.contentsOfDirectory(atPath:url.path).isEmpty)==true { try fm.removeItem(at:url);removedBatch.append(["path":path,"directory":true]) } }
            for start in stride(from:0,to:removedBatch.count,by:100) { try event(type:"catalog.folders_reverted",summary:"Pastas vazias do catálogo revertidas",id:id+"rollback-dirs"+String(start),details:["run_id":id,"removed_refs":Array(removedBatch[start..<min(start+100,removedBatch.count)])]) }
            journal["status"]="rolled_back_preserving_edits";journal["removed"]=removed;journal["retained"]=retained;try writeJSON(journal,journalURL)
            return journal
        }
        struct Item { let source:URL;let target:URL;let path:String;let hash:String;let absent:Bool }
        var items=[Item](),conflicts=[String]()
        for file in manifest["files"] as? [[String:Any]] ?? [] {
            guard let path=file["path"] as? String,let hash=file["sha256"] as? String else { throw failure("Manifesto do catálogo inválido") }
            let pieces=path.split(separator:"/").map(String.init)
            guard pieces.count>=3,pieces[0]=="packs",selected.contains(pieces[1]) else { continue }
            let relative="SISTEMA/skills/"+pieces.dropFirst().joined(separator:"/")
            let source=try scoped(path,root:catalogRoot()),target=try scoped(relative,root:root)
            guard digest(try Data(contentsOf:source))==hash else { throw failure("Integridade inválida: \(path)") }
            let exists=fm.fileExists(atPath:target.path)
            if exists && (try? Data(contentsOf:target)).map(digest) != hash { conflicts.append(relative) }
            var parent=target.deletingLastPathComponent()
            while parent.path != root.path && parent.path.hasPrefix(root.path+"/") {
                var isDirectory:ObjCBool=false
                if fm.fileExists(atPath:parent.path,isDirectory:&isDirectory) { if !isDirectory.boolValue { conflicts.append(String(parent.path.dropFirst(root.path.count+1))) } }
                else { directories.insert(String(parent.path.dropFirst(root.path.count+1))) }
                parent.deleteLastPathComponent()
            }
            items.append(Item(source:source,target:target,path:relative,hash:hash,absent:!exists))
        }
        guard conflicts.isEmpty else { try writeJSON(["conflicts":conflicts,"status":"requires_review"],home.appendingPathComponent("setup/catalog-conflicts.json"));throw failure("Catálogo preservado: \(conflicts.count) conflitos. Veja setup/catalog-conflicts.json e ajuste as coleções no plano.") }
        if verifyOnly && items.contains(where:{$0.absent}) { throw failure("Catálogo incompleto. Retome o mesmo plano com --setup apply.") }
        let total=items.count
        for start in stride(from:0,to:total,by:50) {
            try checkOnboardingCancellation()
            let batch=Array(items[start..<min(total,start+50)])
            for item in batch where item.absent { owned[item.path]=item.hash }
            journal["created_files"]=owned;journal["created_dirs"]=Array(directories);journal["total"]=total;try writeJSON(journal,journalURL)
            for item in batch {
                if item.absent {
                    try fm.createDirectory(at:item.target.deletingLastPathComponent(),withIntermediateDirectories:true)
                    let temporary=item.target.deletingLastPathComponent().appendingPathComponent(".oracle-\(UUID().uuidString).tmp")
                    do { try fm.copyItem(at:item.source,to:temporary);try fm.moveItem(at:temporary,to:item.target) } catch { try? fm.removeItem(at:temporary);throw error }
                }
                guard digest(try Data(contentsOf:item.target))==item.hash else { throw failure("Arquivo mudou durante instalação: \(item.path)") }
            }
            let completed=min(total,start+50);journal["verified"]=completed;try writeJSON(journal,journalURL)
            try event(type:"catalog.files_verified",summary:"\(completed) arquivos do catálogo verificados",id:id+"catalog"+String(completed),details:["phase":"catalog","completed":completed,"total":total,"run_id":id,"subject_refs":batch.map{["path":$0.path,"directory":false,"hash":$0.hash] as [String:Any]}])
        }
        journal["status"]="catalog_verified";try writeJSON(journal,journalURL)
        return journal
    }

    func prepareBridge() throws -> [String:Any] {
        let setup=try acquireOperationLock("setup");defer{releaseOperationLock(setup)}
        let brain=try acquireOperationLock("gbrain");defer{releaseOperationLock(brain)}
        refreshConfig()
        let plan=try validatedPlan()
        let previous=(try? readJSON(home.appendingPathComponent("setup/bridge.json"))) ?? [:]
        var mcpHash=previous["mcp_sha256"] as? String ?? ""
        let root=try scoped("codex-workspace",root:home)
        try fm.createDirectory(at:root,withIntermediateDirectories:true)
        let method=try installOfficialGBrainMethod(workspace:root,plan:plan)
        let executable=Bundle.main.executableURL!.path
        func quote(_ value:String)->String { "'"+value.replacingOccurrences(of:"'",with:"'\\''")+"'" }
        let command=quote(executable)+" --state "+quote(home.path)+" --hook"
        var hooks=[String:Any]()
        for name in ["SessionStart","UserPromptSubmit","PreToolUse","PostToolUse","Stop","SessionEnd","SubagentStart","SubagentStop"] { hooks[name]=[["hooks":[["type":"command","command":command]]]] }
        let document:[String:Any]=["description":"Oracle metadata observer by default. Review and trust in Codex. Separate explicit Oracle consent may capture UserPromptSubmit.prompt and Stop.last_assistant_message from this workspace only. Never reads transcripts, reasoning or tool output.","hooks":hooks]
        let hookPath=try scoped(".codex/hooks.json",root:root)
        if fm.fileExists(atPath:hookPath.path) {
            let existing=try readJSON(hookPath)
            let currentHash=digest(try jsonData(existing)),expectedHash=digest(try jsonData(document))
            let prior=(try? readJSON(home.appendingPathComponent("setup/bridge.json")))?["hooks_sha256"] as? String
            guard currentHash==expectedHash || currentHash==prior else { throw failure("Ponte contém alterações externas. Preserve e reconcilie o arquivo antes de preparar novamente.") }
        }
        try writeJSON(document,hookPath)
        let source=bundledEngineResources().deletingLastPathComponent().appendingPathComponent("skills/oracle-setup/SKILL.md")
        let skill=try scoped(".agents/skills/oracle-setup/SKILL.md",root:root)
        try fm.createDirectory(at:skill.deletingLastPathComponent(),withIntermediateDirectories:true)
        let skillData=try Data(contentsOf:source)
        if fm.fileExists(atPath:skill.path) { let existingHash=digest(try Data(contentsOf:skill));guard existingHash==digest(skillData) || existingHash==previous["skill_sha256"] as? String else { throw failure("A skill da ponte foi editada. Preserve a versão antes de atualizar.") } }
        try atomicWriteData(skillData,to:skill,permissions:0o600)
        var mcpStatus="existing_installation_preserved"
        if plan["attach"] as? Bool != true {
            guard (try? readJSON(home.appendingPathComponent("setup/gbrain-readback.json")))?["status"] as? String=="identity_and_index_verified" else { throw failure("Finalize GBrain com --gbrain finish antes de preparar sua conexão MCP.") }
            func toml(_ value:String)->String { let data=try! JSONSerialization.data(withJSONObject:[value],options:[.withoutEscapingSlashes]);return String(decoding:data,as:UTF8.self).dropFirst().dropLast().description }
            let adapter=try engineResources().appendingPathComponent("oracle-gbrain-read").path
            let content="""
            # Oracle-owned project configuration. Review in Codex; no global settings changed.
            [mcp_servers.oracle_companion]
            command = \(toml(adapter))
            args = ["--mcp"]
            enabled_tools = ["remember", "recall", "entity", "context_pack", "delta", "forget", "search", "get_page", "list_pages", "get_links", "get_backlinks", "traverse_graph", "put_page"]
            [mcp_servers.oracle_companion.env]
            GBRAIN_HOME = \(toml(home.appendingPathComponent("gbrain/profile").path))
            HOME = \(toml(home.appendingPathComponent("gbrain/profile").path))
            TMPDIR = \(toml(home.appendingPathComponent("gbrain/profile/tmp").path))
            GBRAIN_HOOKS = "0"
            GBRAIN_SKIP_UPDATE_CHECK = "1"
            ORACLE_OWNED_ONLY = "1"
            OPENAI_API_KEY = ""
            ANTHROPIC_API_KEY = ""
            GOOGLE_API_KEY = ""
            GEMINI_API_KEY = ""
            VOYAGE_API_KEY = ""
            """
            let configURL=try scoped(".codex/config.toml",root:root)
            let data=Data(content.utf8)
            if fm.fileExists(atPath:configURL.path) { let existingHash=digest(try Data(contentsOf:configURL));guard existingHash==digest(data) || existingHash==mcpHash else { throw failure("Configuração MCP preexistente preservada: \(configURL.path)") } }
            try atomicWriteData(data,to:configURL,permissions:0o600);mcpHash=digest(data)
            mcpStatus="prepared_requires_codex_trust"
        }
        let receipt:[String:Any]=["official_method":method,"required_skill_paths":requiredGBrainCodexSkillPaths(),"mcp_sha256":mcpHash,"skill_sha256":digest(skillData),"mcp_status":mcpStatus,"workspace":root.path,"hooks":hookPath.path,"skill":skill.path,"hooks_sha256":digest(try jsonData(document)),"status":"prepared_requires_codex_trust","coverage":"Only trusted hooks in tasks using this workspace. No global or existing configuration was changed."]
        try writeJSON(receipt,home.appendingPathComponent("setup/bridge.json"));try event(type:"bridge.prepared",summary:"Ponte preparada em workspace próprio; confiança Codex ainda não verificada",details:["run_id":plan["id"]!])
        _=try verifyGBrainBridge()
        return receipt
    }
}
