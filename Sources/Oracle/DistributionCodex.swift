import Foundation
import Darwin

extension Core {
    /// Isolated native fixtures must never write into the operator's real skills.
    func distributionHostHome() -> URL {
        let fixtureRoot=ProcessInfo.processInfo.environment["ORACLE_TEST_ROOT"].map{URL(fileURLWithPath:$0).standardizedFileURL.path}
        let fixtureInvocation=ProcessInfo.processInfo.arguments.contains(where:{["--self-test-distribution","--self-test-maintenance"].contains($0)}) && fixtureRoot.map{home.path.hasPrefix($0+"/")}==true
        if home.pathComponents.contains(".work"),Bundle.main.bundleIdentifier==nil || Bundle.main.bundleIdentifier?.hasSuffix(".validation")==true || fixtureInvocation {
            return home.appendingPathComponent("host-fixture")
        }
        return fm.homeDirectoryForCurrentUser
    }
    func distributionCodexLedgerURL()->URL {distributionHostHome().appendingPathComponent(".agents/oracle-distribution-ledger.json")}
    func rollbackDistributionSkillLinks(plan:[String:Any]) throws -> [String] {
        let host=distributionHostHome(),journalURL=try scoped(".agents/oracle-distribution-transaction.json",root:host)
        guard var journal=try? readJSON(journalURL),journal["plan_hash"] as? String==plan["plan_hash"] as? String else{return []}
        let root=try scoped(".agents/skills",root:host),fd=Darwin.open(root.path,O_RDONLY|O_DIRECTORY|O_CLOEXEC|O_NOFOLLOW)
        guard fd>=0 else{throw failure("Skills locais indisponíveis para recuperação.")};defer{Darwin.close(fd)}
        guard flock(fd,LOCK_EX|LOCK_NB)==0 else{throw failure("Outra operação está usando as skills locais.")};defer{flock(fd,LOCK_UN)}
        let previous=journal["previous"] as? [String:Any] ?? [:],old=previous["links"] as? [String:String] ?? [:],next=journal["links"] as? [String:String] ?? [:]
        var retained=[String]()
        for name in Set(old.keys).union(next.keys).sorted() {
            guard DistributionManifest.validID(name),name.hasPrefix("oracle-") else{throw failure("Nome inválido no journal de skills.")}
            let link=root.appendingPathComponent(name);var info=stat()
            if lstat(link.path,&info)==0 {
                guard (info.st_mode&S_IFMT)==S_IFLNK else{retained.append(name);continue}
                let current=try fm.destinationOfSymbolicLink(atPath:link.path)
                if current==old[name]{continue}
                guard current==next[name] else{retained.append(name);continue}
                guard Darwin.unlink(link.path)==0 else{throw failure("Link preservado; não foi possível restaurar as skills anteriores.")}
            } else if errno != ENOENT {throw failure("Não foi possível ler o link gerenciado.")}
            if let destination=old[name] {
                guard URL(fileURLWithPath:destination).resolvingSymlinksInPath().path==destination,fm.fileExists(atPath:destination) else{throw failure("Destino anterior ausente; recuperação de skills pendente.")}
                try fm.createSymbolicLink(atPath:link.path,withDestinationPath:destination)
            }
        }
        if retained.isEmpty {
            try writeJSON(previous,distributionCodexLedgerURL())
            try writeJSON(previous.isEmpty ? ["files_installed":false,"status":"rolled_back"]:previous,home.appendingPathComponent("setup/codex-distribution.json"))
            journal["status"]="rolled_back";try writeJSON(journal,journalURL)
        }
        return retained
    }
    func distributionSkillLinks(_ manifest:DistributionManifest,plan:[String:Any]) throws -> [String:String] {
        let files=manifest.byPath
        var links=[String:String]()
        for item in manifest.items where item.kind=="skill" {
            guard let file=files[item.entry],let name=item.hostName else{throw failure("Skill sem caminho de descoberta.")}
            for path in item.required {
                let resource=files[path]!,target=try distributionDestination(resource,plan:plan)
                guard try fileDigest(target)==resource.hash else{throw failure("Recurso da skill ainda não foi instalado: \(path)")}
            }
            let entry=try distributionDestination(file,plan:plan),text=try String(contentsOf:entry,encoding:.utf8)
            guard text.hasPrefix("---\n"),text.range(of:"(?m)^name: "+NSRegularExpression.escapedPattern(for:name)+"$",options:.regularExpression) != nil,
                  text.range(of:"(?m)^description: \\S",options:.regularExpression) != nil else{throw failure("Nome/frontmatter incompatível com a descoberta do Codex: \(item.name)")}
            links[name]=entry.deletingLastPathComponent().path
        }
        return links
    }
    func installDistributionSkills(_ manifest:DistributionManifest,plan:[String:Any]) throws -> [String:Any] {
        let host=distributionHostHome()
        try fm.createDirectory(at:host,withIntermediateDirectories:true,attributes:[.posixPermissions:0o700])
        let root=try scoped(".agents/skills",root:host)
        try fm.createDirectory(at:root,withIntermediateDirectories:true,attributes:[.posixPermissions:0o700])
        let fd=Darwin.open(root.path,O_RDONLY|O_DIRECTORY|O_CLOEXEC|O_NOFOLLOW)
        guard fd>=0 else{throw failure("A pasta de skills do Codex está indisponível.")}
        defer{Darwin.close(fd)}
        guard flock(fd,LOCK_EX|LOCK_NB)==0 else{throw failure("Outra instalação está atualizando as skills locais do Codex.")}
        defer{flock(fd,LOCK_UN)}
        let ledgerURL=try scoped(".agents/oracle-distribution-ledger.json",root:host)
        let journalURL=try scoped(".agents/oracle-distribution-transaction.json",root:host)
        let previous=(try? readJSON(ledgerURL)) ?? [:]
        if !previous.isEmpty {guard previous["owner"] as? String=="OracleCompanion",previous["schema_version"] as? Int==3 else{throw failure("Registro Codex preexistente não pertence ao Oracle.")}}
        let old=previous["links"] as? [String:String] ?? [:],next=try distributionSkillLinks(manifest,plan:plan)
        var journal=(try? readJSON(journalURL)) ?? [:]
        if journal["status"] as? String=="applying",journal["plan_hash"] as? String != plan["plan_hash"] as? String {throw failure("Retome a atualização anterior das skills do Codex antes de trocar o vault.")}
        if journal["status"] as? String != "applying" {
            journal=["schema_version":3,"owner":"OracleCompanion","plan_hash":plan["plan_hash"]!,"manifest_sha256":manifest.hash,"previous":previous,"links":next,"status":"applying","intents":[String:String]()]
        }
        guard journal["manifest_sha256"] as? String==manifest.hash else{throw failure("A distribuição Codex mudou durante a retomada.")}
        var intents=journal["intents"] as? [String:String] ?? [:]
        func currentLink(_ name:String)throws->String? {
            guard DistributionManifest.validID(name),name.hasPrefix("oracle-") else{throw failure("Nome fora do escopo das skills Oracle.")}
            let url=root.appendingPathComponent(name)
            var info=stat()
            if lstat(url.path,&info) != 0 {if errno==ENOENT{return nil};throw failure("Não foi possível conferir a skill local.")}
            guard (info.st_mode & S_IFMT)==S_IFLNK else{throw failure("Uma skill existente ocupa o nome \(name). Nenhum arquivo foi substituído.")}
            return try fm.destinationOfSymbolicLink(atPath:url.path)
        }
        // Preflight every entry before replacing/removing any global link.
        for name in Set(old.keys).union(next.keys) {
            if let current=try currentLink(name) {
                guard current==old[name] || (intents[name]==next[name] && current==next[name]) else{throw failure("Link local alterado ou não pertencente ao Oracle: \(name)")}
            }
        }
        try writeJSON(journal,journalURL)
        for name in Set(old.keys).union(next.keys).sorted() {
            try checkOnboardingCancellation()
            let link=root.appendingPathComponent(name),current=try currentLink(name)
            if let target=next[name] {
                let targetURL=URL(fileURLWithPath:target)
                guard targetURL.resolvingSymlinksInPath().path==target,try targetURL.resourceValues(forKeys:[.isDirectoryKey]).isDirectory==true else{throw failure("Destino da skill movido ou indisponível; selecione o vault novamente.")}
                if current==target {continue}
                intents[name]=target;journal["intents"]=intents;try writeJSON(journal,journalURL)
                // Exclusive link creation; an unrelated entry appearing after the
                // preflight is preserved. Replacement validates again before unlink.
                if let current {
                    guard current==old[name],try currentLink(name)==current,Darwin.unlink(link.path)==0 else{throw failure("Link alterado durante a atualização; original preservado.")}
                }
                try fm.createSymbolicLink(atPath:link.path,withDestinationPath:target)
                guard try currentLink(name)==target else{throw failure("O Codex não recebeu o link esperado.")}
            } else if let current {
                guard current==old[name],try currentLink(name)==current else{throw failure("Skill removida da release foi alterada; link preservado.")}
                intents[name]="removed";journal["intents"]=intents;try writeJSON(journal,journalURL)
                guard Darwin.unlink(link.path)==0 else{throw failure("Não foi possível retirar o link gerenciado.")}
            }
        }
        let receipt:[String:Any]=["schema_version":3,"owner":"OracleCompanion","vault":plan["vault"]!,"profile":home.path,"plan_hash":plan["plan_hash"]!,"release_id":manifest.releaseID,"manifest_sha256":manifest.hash,"links":next,"files_installed":true,"host_discovered":false,"execution_verified":false,"status":"files_installed_host_pending"]
        try writeJSON(receipt,ledgerURL);try writeJSON(receipt,home.appendingPathComponent("setup/codex-distribution.json"))
        journal["status"]="completed";try writeJSON(journal,journalURL)
        return try verifyDistributionSkills(manifest,plan:plan)
    }
    func verifyDistributionSkills(_ manifest:DistributionManifest,plan:[String:Any]) throws -> [String:Any] {
        let host=distributionHostHome(),ledger=try readJSON(scoped(".agents/oracle-distribution-ledger.json",root:host)),expected=try distributionSkillLinks(manifest,plan:plan)
        guard ledger["owner"] as? String=="OracleCompanion",ledger["manifest_sha256"] as? String==manifest.hash,
              ledger["vault"] as? String==plan["vault"] as? String,ledger["plan_hash"] as? String==plan["plan_hash"] as? String,
              ledger["links"] as? [String:String]==expected else{throw failure("As skills locais do Codex ainda não correspondem ao vault ativo.")}
        let root=try scoped(".agents/skills",root:host)
        for (name,target) in expected {
            let link=root.appendingPathComponent(name)
            guard (try link.resourceValues(forKeys:[.isSymbolicLinkKey])).isSymbolicLink==true,
                  try fm.destinationOfSymbolicLink(atPath:link.path)==target,link.resolvingSymlinksInPath().path==target,
                  fm.fileExists(atPath:URL(fileURLWithPath:target).appendingPathComponent("SKILL.md").path) else{throw failure("Skill indisponível no Codex: \(name). Selecione o vault novamente se ele mudou.")}
        }
        return ["files_installed":true,"count":expected.count,"host_discovered":false,"execution_verified":false,"manifest_sha256":manifest.hash,"message":"Skills preparadas; verificação no Codex pendente."]
    }
    func distributionRequiredCodexSkillPaths()->[String] {
        guard let plan=try? validatedPlan(),isMemoryOnly(plan),let manifest=try? distributionForPlan(plan),let links=try? distributionSkillLinks(manifest,plan:plan) else{return []}
        return links.keys.sorted().map{distributionHostHome().appendingPathComponent(".agents/skills/"+$0+"/SKILL.md").path}
    }
}
