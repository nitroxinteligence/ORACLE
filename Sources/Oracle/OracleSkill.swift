import Foundation
import Darwin

extension Core {
    /// Shared router lives directly in Codex's discovery root, never in Obsidian.
    /// Its registry supports multiple Oracle profiles without silently switching vaults.
    func installOracleSkill() throws -> [String:Any] {
        let root=try vault().resolvingSymlinksInPath(),host=distributionHostHome()
        let skills=try scoped(".agents/skills",root:host)
        try fm.createDirectory(at:skills,withIntermediateDirectories:true)
        let lock=Darwin.open(skills.path,O_RDONLY|O_DIRECTORY|O_CLOEXEC|O_NOFOLLOW)
        guard lock>=0 else{throw failure("Pasta de skills do Codex indisponível.")}
        defer{Darwin.close(lock)}
        guard flock(lock,LOCK_EX|LOCK_NB)==0 else{throw failure("Outra instalação está atualizando as skills do Codex.")}
        defer{flock(lock,LOCK_UN)}
        let folder=try scoped("oracle",root:skills)
        let ledgerURL=try scoped(".agents/oracle-router-ledger.json",root:host)
        let previous=(try? readJSON(ledgerURL)) ?? [:]
        let hashes=previous["hashes"] as? [String:String] ?? [:]
        guard !fm.fileExists(atPath:folder.path) || previous["folder"] as? String==folder.path else {
            throw failure("Já existe uma skill oracle de outra origem no Codex. Ela foi preservada; libere esse nome para instalar a skill do aplicativo.")
        }
        let source=bundledEngineResources().deletingLastPathComponent().appendingPathComponent("skills/oracle")
        var files=[String:Data]()
        for path in ["SKILL.md","agents/openai.yaml","scripts/discover.py","references/oracle.md"] {
            files[path]=try Data(contentsOf:source.appendingPathComponent(path))
        }
        let contextURL=try scoped("references/context.json",root:folder)
        var profiles=((try? readJSON(contextURL))?["profiles"] as? [String:[String:String]]) ?? [:]
        profiles[String(digest(Data(home.path.utf8)).prefix(20))]=["vault":root.path,"state":home.path,"name":root.lastPathComponent]
        files["references/context.json"]=try jsonData(["schema_version":1,"profiles":profiles])
        for (path,bytes) in files {
            let target=try scoped(path,root:folder)
            if fm.fileExists(atPath:target.path) {
                let actual=try fileDigest(target)
                guard actual==digest(bytes) || actual==hashes[path] || actual==(previous["pending_hashes"] as? [String:String])?[path] else{throw failure("A skill oracle foi editada; suas alterações foram preservadas: "+path)}
            }
        }
        // Record ownership first: interrupted writes can resume without claiming a foreign folder.
        let receipt:[String:Any]=["name":"oracle","folder":folder.path,"hashes":files.mapValues{digest($0)},"filesInstalled":true,"hostDiscovered":false]
        try writeJSON(["folder":folder.path,"hashes":hashes,"pending_hashes":files.mapValues{digest($0)},"filesInstalled":false],ledgerURL)
        for (path,bytes) in files {
            let target=try scoped(path,root:folder)
            try fm.createDirectory(at:target.deletingLastPathComponent(),withIntermediateDirectories:true)
            if (try? fileDigest(target)) != digest(bytes){try atomicWriteData(bytes,to:target)}
            guard try fileDigest(target)==digest(bytes) else{throw failure("Falha ao verificar a skill oracle.")}
        }
        try writeJSON(receipt,ledgerURL)
        try writeJSON(receipt,home.appendingPathComponent("setup/oracle-skill.json"))
        return receipt
    }
}
