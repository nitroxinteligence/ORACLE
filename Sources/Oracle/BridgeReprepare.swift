import Foundation
import Darwin

enum OracleBridgeReprepareState {
    static func project(prepared:Bool,runtime:[String:Any],verify:()throws->Void)->[String:Any] {
        guard prepared else{return ["bridgeNeedsReprepare":false,"bridgeRepairStatus":"unprepared","bridgeRepairMessage":"A integração local ainda não foi preparada.","bridgeRepairing":false]}
        do {
            try verify()
            guard runtime["runtimeReady"] as? Bool==true else{throw failure(runtime["message"] as? String ?? "Os executáveis da ponte estão indisponíveis.")}
            return ["bridgeNeedsReprepare":false,"bridgeRepairStatus":"ready","bridgeRepairMessage":"Arquivos da ponte e alvos locais conferidos. Confiança e execução no Codex têm verificações próprias.","bridgeRepairing":false]
        } catch {
            return ["bridgeNeedsReprepare":true,"bridgeRepairStatus":"needs_reprepare","bridgeRepairMessage":error.localizedDescription+" Prepare novamente a integração local. Edições existentes serão preservadas; conflitos precisam de revisão.","bridgeRepairing":false]
        }
    }
}

extension Core {
    func bridgeReprepareStatus(runtime:[String:Any]?=nil)->[String:Any] {
        let prepared=fm.fileExists(atPath:home.appendingPathComponent("setup/bridge.json").path) || fm.fileExists(atPath:home.appendingPathComponent("setup/gbrain-method-install.json").path)
        return OracleBridgeReprepareState.project(prepared:prepared,runtime:runtime ?? codexRuntimeBindingStatus()){
            let workspace=try self.oracleWorkspace(),installed=try readJSON(self.home.appendingPathComponent("setup/gbrain-method-install.json")),bridge=try readJSON(self.home.appendingPathComponent("setup/bridge.json"))
            guard installed["workspace"] as? String==workspace.path,bridge["workspace"] as? String==workspace.path,
                  installed["commit"] as? String==oracleGBrainPinnedCommit,
                  installed["manifest_sha256"] as? String==(try OracleCodexRuntimeBinding.hash(self.officialGBrainMethodRoot().appendingPathComponent("manifest.json"))),
                  try OracleCodexRuntimeBinding.hash(workspace.appendingPathComponent(".oracle/gbrain-method/manifest.json"))==installed["manifest_sha256"] as? String else{throw failure("O pacote oficial mudou; prepare novamente a ponte preservando edições.")}
        }
    }
}

/// Update admission is deliberately separate from the immutable installation
/// plan. It cannot authorize initialization, indexing, migration or new consent.
extension Core {
    func admitBridgeReprepare(plan:[String:Any]) throws -> [String:Any] {
        guard isMemoryOnly(plan),let id=plan["id"] as? String,UUID(uuidString:id) != nil else {
            throw failure("O repreparo exige uma instalação local de memória concluída e confirmada.")
        }
        _=try OracleAIMemoryOnboarding.required(plan)
        guard let roots=plan["library_roots"] as? [String:String],roots==config["libraryRoots"] as? [String:String] else{throw failure("As bibliotecas mudaram desde a instalação. Nenhum arquivo da ponte foi alterado.")}
        let root=try vault(),vaultIdentity=try verifyVaultPlanIdentity(plan)
        let owner=try readJSON(scoped("gbrain/profile/oracle-owned.json",root:home))
        guard owner["schema_version"] as? Int==2,owner["owner"] as? String=="OracleCompanion",owner["vault_root"] as? String==root.path,owner["plan_hash"] as? String==plan["plan_hash"] as? String else{throw failure("O perfil local não pertence ao vault confirmado.")}
        let completed=try readJSON(scoped("onboarding/installations/"+id+"/completed.json",root:home))
        guard completed["plan_hash"] as? String==plan["plan_hash"] as? String,completed["identity_status"] as? String=="not_applicable",
              (completed["distribution"] as? [String:Any])?["complete"] as? Bool==true,
              ((completed["memory"] as? [String:Any])?["index"] as? [String:Any])?["complete"] as? Bool==true else{throw failure("Esta instalação não tem confirmação integral do plano original.")}
        let memoryReceipt=try readJSON(scoped("setup/memory-only.json",root:home))
        guard memoryReceipt["plan_hash"] as? String==plan["plan_hash"] as? String,
              memoryReceipt["profile_mode"] as? String=="memory-only",memoryReceipt["identity_status"] as? String=="not_applicable",
              memoryReceipt["status"] as? String=="memory_and_index_verified",
              (memoryReceipt["index"] as? [String:Any])?["complete"] as? Bool==true else{throw failure("A memória instalada não pertence à conclusão confirmada.")}
        let distribution=try verifyDistribution(distributionForPlan(plan),plan:plan)
        _=try verifyDistributionSkills(distributionForPlan(plan),plan:plan)
        let engine=try engineResources(),adapter=try readAdapterExecutable()
        _=try officialGBrainMethodManifest()
        let workspace=try oracleWorkspace(),installed=try readJSON(scoped("setup/gbrain-method-install.json",root:home)),bridge=try readJSON(scoped("setup/bridge.json",root:home))
        guard bridge["workspace"] as? String==workspace.path,installed["workspace"] as? String==workspace.path,
              installed["plan_hash"] as? String==plan["plan_hash"] as? String,
              installed["profile_mode"] as? String=="memory-only",installed["identity_status"] as? String=="not_applicable",
              installed["id"] as? String==oracleGBrainMethodID,installed["version"] as? String==oracleGBrainPinnedVersion,
              installed["commit"] as? String==oracleGBrainPinnedCommit,let old=installed["files"] as? [String:String],
              old["AGENTS.md"] != nil,old[".agents/skills/oracle-gbrain-method/SKILL.md"] != nil else{throw failure("O método anterior não pertence à instalação confirmada.")}
        // A retry may contain a mix of old owned bytes and this app's exact new
        // bytes. The installer's full dry preflight checks both before any write.
        let next=try installOfficialGBrainMethod(workspace:workspace,plan:plan,preflightOnly:true)
        guard let nextHashes=next["files"] as? [String:String] else{throw failure("O pacote atual não tem inventário completo.")}
        let manifestPath=".oracle/gbrain-method/manifest.json",priorManifest=try readJSON(scoped(manifestPath,root:workspace))
        let manifestHash=try fileDigest(scoped(manifestPath,root:workspace))
        guard priorManifest["schema_version"] as? Int==1,priorManifest["id"] as? String==oracleGBrainMethodID,
              priorManifest["version"] as? String==oracleGBrainPinnedVersion,priorManifest["commit"] as? String==oracleGBrainPinnedCommit,
              priorManifest["source"] as? String=="pinned_git_objects_only",priorManifest["license"] as? String=="MIT",
              manifestHash==installed["manifest_sha256"] as? String || manifestHash==nextHashes[manifestPath],
              let priorRows=priorManifest["files"] as? [[String:Any]],!priorRows.isEmpty else{throw failure("O pacote anterior está incompleto ou incompatível.")}
        var priorPaths=Set<String>()
        for row in priorRows {
            guard let path=row["path"] as? String,let hash=row["sha256"] as? String,
                  priorPaths.insert(".oracle/gbrain-method/"+path).inserted,
                  old[".oracle/gbrain-method/"+path]==hash || nextHashes[".oracle/gbrain-method/"+path]==hash else{throw failure("Inventário anterior sem propriedade verificada.")}
        }
        priorPaths.formUnion([manifestPath,"AGENTS.md",".agents/skills/oracle-gbrain-method/SKILL.md"])
        let committed=bridge["official_method"] as? [String:Any] ?? [:]
        let oldAnchored=committed["files"] as? [String:String]==old && committed["manifest_sha256"] as? String==installed["manifest_sha256"] as? String && committed["commit"] as? String==oracleGBrainPinnedCommit
        let newManifestInstalled=manifestHash==nextHashes[manifestPath]
        // Method files precede their receipt, and that receipt precedes bridge.json.
        // Preserve both interrupted states using the last bridge's owned inventory
        // or the complete exact inventory of the current authenticated app package.
        let newReceiptInstalled=old==nextHashes && installed["manifest_sha256"] as? String==next["manifest_sha256"] as? String
        guard (Set(old.keys)==priorPaths && (oldAnchored || newReceiptInstalled)) || (newManifestInstalled && oldAnchored) else{throw failure("O inventário anterior não tem recibo de propriedade correspondente.")}
        for (path,hash) in old {
            guard OracleCodexRuntimeBinding.validHash(hash) else{throw failure("Recibo anterior inválido.")}
            guard path=="AGENTS.md" || path==".agents/skills/oracle-gbrain-method/SKILL.md" || path.hasPrefix(".oracle/gbrain-method/") else{throw failure("Inventário anterior fora do escopo do método.")}
            let target=try scoped(path,root:workspace)
            if !fm.fileExists(atPath:target.path),newManifestInstalled,oldAnchored,nextHashes[path]==nil {continue}
            let current=try fileDigest(target)
            guard current==hash || current==nextHashes[path] else{throw failure("Edição preservada no método: "+path)}
        }
        let currentIndex=try verifyBridgeReprepareIndex(plan:plan)
        // prepareCodexRuntimeBinding runs signature and durable app checks before
        // prepareBridge can write. The historical binding can be absent or stale.
        let binding=try prepareCodexRuntimeBinding()
        return ["schema_version":1,"owner":"OracleCompanion","plan_hash":plan["plan_hash"]!,"confirmed_hash":plan["confirmed_hash"]!,
                "profile":home.path,"vault":root.path,"vault_identity":vaultIdentity,"distribution":distribution,"index":currentIndex,
                "previous_method_sha256":installed["manifest_sha256"] ?? "","method_sha256":next["manifest_sha256"]!,
                "runtime_sha256":try fileDigest(engine.appendingPathComponent("gbrain")),"adapter_sha256":try fileDigest(adapter),
                "runtime_binding_sha256":digest(try jsonData(binding)),"inference":false,"hooksTrusted":false]
    }

    func verifyBridgeReprepareIndex(plan:[String:Any]) throws -> [String:Any] {
        let profile=try scoped("gbrain/profile",root:home),file=try scoped("oracle-vault-manifest.json",root:profile)
        for name in ["oracle-vault-checkpoint.json","oracle-vault-pending.json"] {
            guard !fm.fileExists(atPath:profile.appendingPathComponent(name).path) else{throw failure("Há uma indexação parcial. Conclua a sincronização antes de preparar a ponte.")}
        }
        let values=try file.resourceValues(forKeys:[.isRegularFileKey,.isSymbolicLinkKey,.fileSizeKey])
        guard values.isRegularFile==true,values.isSymbolicLink != true,(values.fileSize ?? Int.max)<=64_000_000 else{throw failure("Recibo atual do índice indisponível.")}
        let bytes=try Data(contentsOf:file),manifest=try readJSON(file),sync=try readJSON(scoped("setup/gbrain-sync.json",root:home))
        guard sync["status"] as? String=="verified",sync["complete"] as? Bool==true,
              (sync["failures"] as? [Any])?.isEmpty==true,sync["manifest_file_sha256"] as? String==digest(bytes),
              manifest["schema_version"] as? Int==2,manifest["complete"] as? Bool==true,
              manifest["root"] as? String==(try vault()).path,manifest["source"] as? String=="oracle-vault",
              manifest["excluded_sources"] as? [String]==["INBOX/oracle-memory"],
              let generation=manifest["generation"] as? Int,generation>=0,let records=manifest["records"] as? [[String:Any]],records.count<=60_000,
              sync["verified"] as? Int==records.count,sync["total"] as? Int==records.count,
              sync["receipt_sha256"] as? String==manifest["receipt_sha256"] as? String else{throw failure("O índice atual não tem recibo integral de sincronização.")}
        var payload=manifest;payload.removeValue(forKey:"receipt_sha256")
        let canonical=try OracleBridgeIndexCanonical.data(payload)
        guard digest(canonical)==manifest["receipt_sha256"] as? String else{throw failure("O recibo do índice foi alterado.")}
        var paths=Set<String>(),slugs=Set<String>()
        for record in records {
            guard let path=record["path"] as? String,!path.lowercased().hasPrefix("inbox/oracle-memory/"),path.lowercased().hasSuffix(".md"),
                  !path.contains("\\"),!path.split(separator:"/",omittingEmptySubsequences:false).contains(where:{$0.isEmpty || $0=="." || $0==".." || $0.hasPrefix(".")}),
                  let slug=record["slug"] as? String,!slug.isEmpty,paths.insert(path).inserted,slugs.insert(slug).inserted,
                  let hash=record["sha256"] as? String,OracleCodexRuntimeBinding.validHash(hash),
                  let pageHash=record["indexed_content_hash"] as? String,OracleCodexRuntimeBinding.validHash(pageHash),record["page_hash"] as? String==pageHash else{throw failure("Registro de propriedade do índice inválido.")}
        }
        let status=try gbrainRead(["operation":"status"],allowSetup:true) as? [String:Any],sources=status?["sources"] as? [[String:Any]] ?? [],freshness=status?["index"] as? [String:Any]
        let memory=try scoped("INBOX/oracle-memory",root:vault()).path
        guard sources.contains(where:{$0["id"] as? String=="oracle-memory" && $0["local_path"] as? String==memory}),
              sources.contains(where:{$0["id"] as? String=="oracle-vault" && ($0["local_path"]==nil || $0["local_path"] is NSNull)}),
              freshness?["complete"] as? Bool==true,freshness?["generation"] as? Int==generation,
              try fileDigest(file)==digest(bytes) else{throw failure("As fontes ou a geração do índice mudaram. Nenhum arquivo da ponte foi alterado.")}
        return ["complete":true,"generation":generation,"verified":records.count,"manifest_file_sha256":digest(bytes),"receipt_sha256":manifest["receipt_sha256"]!,"source":"oracle-vault"]
    }
}

/// Matches the adapter's canonical JSON (UTF-8 JSON.stringify strings, sorted
/// keys, no whitespace), unlike the ASCII distribution signature contract.
enum OracleBridgeIndexCanonical {
    static func data(_ value:Any) throws -> Data {
        func encode(_ value:Any)throws->String {
            if let object=value as? [String:Any] {return "{"+(try object.keys.sorted().map{try encode($0)+":"+encode(object[$0]!)}).joined(separator:",")+"}"}
            if let array=value as? [Any] {return "["+(try array.map(encode)).joined(separator:",")+"]"}
            let bytes=try JSONSerialization.data(withJSONObject:[value],options:[.withoutEscapingSlashes])
            let text=String(decoding:bytes,as:UTF8.self)
            return String(text.dropFirst().dropLast())
        }
        return Data(try encode(value).utf8)
    }
}
