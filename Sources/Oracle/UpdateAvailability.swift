import Foundation

extension Core {
    /// Read-only assessment uses the same ownership rules as installation.
    func previewSkillFiles(_ files: [UpdateFile], version: String) throws -> [String:Any] {
        guard files.count<=5000,Set(files.map { portablePathKey($0.path) }).count==files.count,
              files.allSatisfy({$0.data.count<=2_000_000}),files.reduce(0,{$0+$1.data.count})<=50_000_000 else { throw failure("Manifesto de skills fora dos limites") }
        let root = try vault()
        let prior = (try? readJSON(updatePath("skills/installed.json"))) ?? [:]
        if let priorRoot = prior["vault"] as? String, priorRoot != root.path { throw failure("Selecione a pasta usada na instalação dessas skills.") }
        var owned = prior["files"] as? [String:String] ?? [:]
        if prior.isEmpty, let plan = try? readJSON(home.appendingPathComponent("setup/plan.json")), plan["vault"] as? String == root.path,
           let id = plan["id"] as? String, UUID(uuidString:id) != nil,
           let catalog = try? readJSON(home.appendingPathComponent("setup/\(id).catalog.json")), let created = catalog["created_files"] as? [String:String] { owned = created }
        var changes=0,preserved=0
        for file in files {
            guard skillPathAllowed(file.path),digest(file.data)==file.hash else { throw failure("Não foi possível verificar este pacote.") }
            let destination = try scoped(file.path,root:root)
            guard fm.fileExists(atPath:destination.path) else { if owned[file.path] == nil { changes += 1 } else { preserved += 1 };continue }
            let current = try fileDigest(destination)
            if current==file.hash { continue }
            if owned[file.path]==current { changes += 1 } else { preserved += 1 }
        }
        return ["id":"skills","status":changes>0 ? "available" : preserved>0 ? "preserved_edits" : "current",
                "version":version,"changes":changes,"preservedCount":preserved,
                "message":changes>0 ? "\(changes) arquivos prontos para atualizar." : preserved>0 ? "Suas \(preserved) personalizações serão preservadas." : "Suas skills estão em dia."]
    }
}
