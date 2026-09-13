import Foundation
import Darwin

extension Core {
    var distributionLedgerURL:URL {home.appendingPathComponent("distribution/ledger.json")}
    func distributionOperations(stage:URL,journal:[String:Any]) throws -> [String:[String:Any]] {
        var operations=journal["operations"] as? [String:[String:Any]] ?? [:]
        let folder=stage.appendingPathComponent("operations")
        if fm.fileExists(atPath:folder.path) {
            let entries=try fm.contentsOfDirectory(at:folder,includingPropertiesForKeys:nil)
            guard entries.count<=30_000 else{throw failure("Journal excede o limite da distribuição.")}
            for entry in entries {
                let record=try readJSON(scoped("operations/"+entry.lastPathComponent,root:stage))
                guard let path=record["path"] as? String,entry.lastPathComponent==digest(Data(path.utf8))+".json",
                      let operation=record["operation"] as? [String:Any] else{throw failure("Operação inválida no journal.")}
                operations[path]=operation
            }
        }
        return operations
    }
    func persistDistributionOperation(_ operation:[String:Any],path:String,stage:URL) throws {
        try writeJSON(["path":path,"operation":operation],stage.appendingPathComponent("operations/"+digest(Data(path.utf8))+".json"))
    }
    func resolveDistributionConflicts() throws -> [String:Any] {
        let installation=try acquireOperationLock("installation");defer{releaseOperationLock(installation)}
        return try withVaultWrite {
            let plan=try validatedPlan(),report=try readJSON(home.appendingPathComponent("distribution/conflicts.json"))
            guard isMemoryOnly(plan),report["plan_hash"] as? String==plan["plan_hash"] as? String,
                  let conflicts=report["conflicts"] as? [[String:String]],!conflicts.isEmpty else{throw failure("Não há conflitos deste plano para resolver.")}
            let stage=try scoped("staging/"+(plan["id"] as! String),root:home),root=try vault()
            var resolutions=[String:[String:String]]()
            for conflict in conflicts {
                guard let path=conflict["path"],let destination=conflict["destination"],let expected=conflict["sha256"] else{throw failure("Confira novamente os conflitos antes de resolver.")}
                let file=try distributionOwnedDestination(destination,root:root),data=try Data(contentsOf:file)
                guard digest(data)==expected else{throw failure("Uma edição mudou desde a revisão. Tente novamente para atualizar os conflitos.")}
                let copy=path.hasPrefix("sources/gbrain/") ? try scoped("user-conflicts/"+path,root:stage) : try scoped("INBOX/oracle/conflitos/"+(plan["id"] as! String)+"/"+path,root:root)
                try fm.createDirectory(at:copy.deletingLastPathComponent(),withIntermediateDirectories:true)
                if fm.fileExists(atPath:copy.path) {guard try fileDigest(copy)==expected else{throw failure("A cópia local foi editada; preserve-a antes de resolver novamente.")}}
                else{try data.write(to:copy,options:.withoutOverwriting)}
                guard try fileDigest(copy)==expected else{throw failure("A cópia local não foi verificada.")}
                resolutions[path]=["sha256":expected,"copy":copy.path]
            }
            try writeJSON(["plan_hash":plan["plan_hash"]!,"resolutions":resolutions],stage.appendingPathComponent("resolutions.json"))
            return ["copies":resolutions.count,"location":"INBOX/oracle/conflitos","status":"ready_to_retry"]
        }
    }
    func distributionTrust() throws -> [String:Any] {
        try readJSON(bundledEngineResources().deletingLastPathComponent().appendingPathComponent("updates/distribution-keys.json"))
    }
    func decodeDistribution(_ data:Data,allowKnownRollback:Bool=false) throws -> DistributionManifest {
        let matrix=try updateManifest(),ledger=(try? readJSON(home.appendingPathComponent("distribution/highest-release.json"))) ?? [:]
        return try DistributionManifest(bytes:data,trust:distributionTrust(),oracleVersion:matrix["oracle_version"] as? String ?? "",
            adapterCommit:(matrix["gbrain"] as? [String:Any])?["adapter_commit"] as? String ?? "",
            minimumSequence:allowKnownRollback ? 0:ledger["sequence"] as? Int ?? 0,knownHash:allowKnownRollback ? nil:ledger["manifest_sha256"] as? String)
    }
    func distributionForPlan(_ plan:[String:Any]) throws -> DistributionManifest {
        guard plan["schema_version"] as? Int==3,plan["profile_mode"] as? String=="memory-only",
              let hash=plan["distribution_sha256"] as? String,DistributionManifest.validHash(hash) else{throw failure("Plano não contém uma distribuição assinada.")}
        let data=try Data(contentsOf:scoped("cache/distributions/"+hash+"/oracle-distribution.json",root:home))
        guard digest(data)==hash else{throw failure("O manifesto do plano foi alterado.")}
        let manifest=try decodeDistribution(data,allowKnownRollback:true)
        guard manifest.releaseID==plan["release_id"] as? String else{throw failure("A release mudou no meio da instalação.")}
        return manifest
    }
    /// A network failure may reuse a previously authenticated selection; a bad
    /// signature never triggers a cache fallback. No GitHub account is required.
    func downloadDistribution(_ url:String,limit:Int,fetch:(String,Int)throws->Data) throws -> Data {
        var last:Error?
        for attempt in 0..<3 {
            try checkOnboardingCancellation()
            do{return try fetch(url,limit)}catch{last=error}
            if attempt<2{Thread.sleep(forTimeInterval:attempt==0 ? 0.25:0.75)}
        }
        throw last ?? failure("Download indisponível; tente novamente.")
    }
    func resolveDistribution(fetch:((String,Int)throws->Data)?=nil) throws -> DistributionManifest {
        let network=UpdateNetwork(),download=fetch ?? {try network.fetch($0,limit:$1)}
        let selected=home.appendingPathComponent("distribution/selected.json")
        let data:Data
        do {
            let response=try downloadDistribution("https://api.github.com/repos/nitroxinteligence/ORACLE-SKILLS/releases/latest",limit:2_000_000,fetch:download)
            guard let release=try JSONSerialization.jsonObject(with:response) as? [String:Any],release["draft"] as? Bool != true,
                  let assets=release["assets"] as? [[String:Any]],
                  let asset=assets.first(where:{$0["name"] as? String=="oracle-distribution.json"}),
                  let tag=release["tag_name"] as? String,let url=asset["browser_download_url"] as? String,
                  url=="https://github.com/nitroxinteligence/ORACLE-SKILLS/releases/download/"+tag+"/oracle-distribution.json" else{throw failure("Ainda não existe uma release completa do acervo Oracle. O mantenedor precisa publicá-la.")}
            data=try downloadDistribution(url,limit:24_000_000,fetch:download)
        } catch {
            guard let prior=try? readJSON(selected),let hash=prior["manifest_sha256"] as? String,DistributionManifest.validHash(hash),
                  let cached=try? Data(contentsOf:scoped("cache/distributions/"+hash+"/oracle-distribution.json",root:home)),digest(cached)==hash else{throw error}
            data=cached
        }
        let manifest=try decodeDistribution(data)
        let cached=try scoped("cache/distributions/"+manifest.hash+"/oracle-distribution.json",root:home)
        try fm.createDirectory(at:cached.deletingLastPathComponent(),withIntermediateDirectories:true,attributes:[.posixPermissions:0o700])
        if fm.fileExists(atPath:cached.path) {guard try fileDigest(cached)==manifest.hash else{throw failure("Cache alterado; escolha uma nova cópia íntegra.")}}
        else {try atomicWriteData(data,to:cached,permissions:0o600)}
        try writeJSON(["manifest_sha256":manifest.hash,"release_id":manifest.releaseID,"sequence":manifest.sequence],selected)
        return manifest
    }
    func distributionLibraryChoices() -> [[String:Any]] {
        guard let root=try? vault(),let system=try? scoped("SISTEMA",root:root),let children=try? fm.contentsOfDirectory(at:system,includingPropertiesForKeys:[.isDirectoryKey],options:[]) else{return []}
        let selected=config["libraryRoots"] as? [String:String] ?? [:]
        return [("skills","SISTEMA/skills"),("prompt","SISTEMA/prompts"),("tutorial","SISTEMA/Tutoriais")].compactMap{kind,canonical in
            let matches=children.filter{portablePathKey("SISTEMA/"+$0.lastPathComponent)==portablePathKey(canonical)}.map{"SISTEMA/"+$0.lastPathComponent}.sorted()
            guard matches.count>1,!matches.contains(selected[kind] ?? "") else{return nil}
            return ["library":kind,"paths":matches]
        }
    }
    func distributionLibraryRoots(_ root:URL) throws -> [String:String] {
        let defaults=["skills":"SISTEMA/skills","prompt":"SISTEMA/prompts","tutorial":"SISTEMA/Tutoriais"]
        let selected=config["libraryRoots"] as? [String:String] ?? [:]
        let system=try scoped("SISTEMA",root:root)
        let children=fm.fileExists(atPath:system.path) ? try fm.contentsOfDirectory(at:system,includingPropertiesForKeys:[.isDirectoryKey],options:[]):[]
        var result=[String:String]()
        for (kind,canonical) in defaults {
            let matches=children.filter{portablePathKey("SISTEMA/"+$0.lastPathComponent)==portablePathKey(canonical)}
            if let choice=selected[kind],matches.contains(where:{"SISTEMA/"+$0.lastPathComponent==choice}) {result[kind]=choice}
            else if matches.count>1 {throw failure("Há duas pastas para \(kind). Escolha a raiz da biblioteca nos Ajustes antes de instalar.")}
            else {result[kind]=matches.first.map{"SISTEMA/"+$0.lastPathComponent} ?? canonical}
            let path=try scoped(result[kind]!,root:root)
            if fm.fileExists(atPath:path.path) {guard try path.resourceValues(forKeys:[.isDirectoryKey]).isDirectory==true else{throw failure("A raiz da biblioteca é um arquivo: \(result[kind]!).")}}
        }
        return result
    }
    func distributionDestination(_ file:DistributionFile,plan:[String:Any]) throws -> URL {
        if !file.isVault {return try scoped(file.path,root:home)}
        guard let roots=plan["library_roots"] as? [String:String],let rootPath=plan["vault"] as? String,rootPath==config["vault"] as? String else{throw failure("O destino do plano mudou.")}
        let key=["specialists":"skills","prompts":"prompt","tutorials":"tutorial"][file.kind]!
        let logical=["skills":"SISTEMA/skills","prompt":"SISTEMA/prompts","tutorial":"SISTEMA/Tutoriais"][key]!
        guard let actual=roots[key],portablePathKey(actual)==portablePathKey(logical),actual.split(separator:"/").count==2 else{throw failure("Raiz da biblioteca fora do contrato.")}
        return try scoped(actual+String(file.path.dropFirst(logical.count)),root:vault())
    }
    func distributionPreflight(_ manifest:DistributionManifest,roots:[String:String]) throws -> [String:Any] {
        let root=try vault(),technical=home.resolvingSymlinksInPath()
        guard root.path != technical.path,!root.path.hasPrefix(technical.path+"/"),!technical.path.hasPrefix(root.path+"/") else{throw failure("Vault e arquivos técnicos do Oracle não podem se sobrepor.")}
        let values=try root.resourceValues(forKeys:[.isDirectoryKey,.isWritableKey,.volumeAvailableCapacityForImportantUsageKey])
        guard values.isDirectory==true,values.isWritable==true else{throw failure("O vault precisa permitir leitura e gravação.")}
        let snapshot=try scanSnapshot(root:root)
        guard snapshot.complete else{throw failure("Não foi possível inventariar o vault antes de instalar. "+(snapshot.issues.first?["error"] ?? "Revise a pasta."))}
        let existing=Dictionary(uniqueKeysWithValues:snapshot.entries.filter{$0["directory"] as? Bool != true}.compactMap{row -> (String,Int)? in guard let path=row["path"] as? String,let size=row["size"] as? Int else{return nil};return(path,size)})
        var eligible=existing
        let temporary:[String:Any]=["vault":root.path,"library_roots":roots]
        for file in manifest.vaultFiles where file.path.lowercased().hasSuffix(".md") {
            let destination=try distributionDestination(file,plan:temporary),relative=String(destination.path.dropFirst(root.path.count+1))
            eligible[relative]=max(eligible[relative] ?? 0,file.size)
        }
        let indexBytes=eligible.filter{!$0.key.lowercased().hasPrefix("inbox/oracle-memory/")}.values.reduce(0,+)
        guard eligible.count<=60_000,indexBytes<=128_000_000 else{throw failure("Este vault com o acervo excede o suporte atual: até 60 mil notas e 128 MB de Markdown. Escolha um vault menor antes de instalar.")}
        let canonicalBytes=manifest.vaultFiles.reduce(0){$0+$1.size},technicalBytes=manifest.files.reduce(0){$0+$1.size}
        let downloadBytes=manifest.packages.reduce(0){$0+($1["bytes"] as? Int ?? 0)}
        let recovery=existing.values.reduce(0,+),required=Int64(technicalBytes+downloadBytes+canonicalBytes+recovery+512_000_000)
        let technicalSpace=try technical.resourceValues(forKeys:[.volumeAvailableCapacityForImportantUsageKey]).volumeAvailableCapacityForImportantUsage ?? 0
        guard technicalSpace>=required,(values.volumeAvailableCapacityForImportantUsage ?? 0)>=Int64(canonicalBytes+recovery+64_000_000) else{throw failure("Espaço insuficiente para download, instalação e recuperação. Libere pelo menos \((required+999_999)/1_000_000) MB e tente novamente.")}
        // Exercise actual create/read/unlink using one app-owned temporary file.
        try withVaultWrite {
            let probe=try scoped(".oracle-write-check-"+UUID().uuidString,root:root),data=Data(UUID().uuidString.utf8)
            try data.write(to:probe,options:.withoutOverwriting)
            defer{_ = Darwin.unlink(probe.path)}
            guard try Data(contentsOf:probe)==data else{throw failure("O volume não confirmou a gravação de preflight.")}
        }
        return ["markdown_count":eligible.count,"markdown_bytes":indexBytes,"required_bytes":required,"snapshot_signature":snapshot.signature,
                "limits":["markdown_file":2_000_000,"markdown_total":128_000_000,"markdown_count":60_000],"inference":false]
    }
    func makeMemoryOnlyPlan(manifest:DistributionManifest,id:String) throws -> [String:Any] {
        let setup=try acquireOperationLock("setup");defer{releaseOperationLock(setup)}
        let engineLock=try acquireOperationLock("gbrain");defer{releaseOperationLock(engineLock)}
        refreshConfig();guard UUID(uuidString:id) != nil else{throw failure("Instalação inválida.")}
        let root=try vault(),roots=try distributionLibraryRoots(root),preflight=try distributionPreflight(manifest,roots:roots)
        var identity=stat();guard lstat(root.path,&identity)==0,(identity.st_mode&S_IFMT)==S_IFDIR else{throw failure("A identidade da pasta do vault não pôde ser confirmada.")}
        let baseline=try scan(root:root),spaces=knowledgeSpaces(baseline)
        var folders=["INBOX/oracle","INBOX/oracle-memory/people","INBOX/oracle-memory/projects","INBOX/oracle-memory/signals","PROJETOS","WIKI/pessoas","WIKI/organizacoes","WIKI/conceitos","FONTES","DIARIO","OUTPUTS","ARQUIVO","SISTEMA/agentes","SISTEMA/modelos","SISTEMA/indices","SISTEMA/oracle"]
        folders += spaces.compactMap{$0["path"]}+roots.values.sorted()
        let engine=try engineResources(),method=try Data(contentsOf:officialGBrainMethodRoot().appendingPathComponent("manifest.json"))
        var plan:[String:Any]=["schema_version":3,"profile_mode":"memory-only","id":id,"vault":root.path,"library_roots":roots,"folders":folders,
            "knowledge_spaces":spaces,"catalog_collections":[String](),"attach":false,"executor":"native-local","template_profile":"complete-distribution-v3",
            "release_id":manifest.releaseID,"distribution_sha256":manifest.hash,"sequence":manifest.sequence,"preflight":preflight,
            "vault_identity":["device":Int64(identity.st_dev),"inode":UInt64(identity.st_ino)],
            "runtime_sha256":try fileDigest(engine.appendingPathComponent("gbrain")),"adapter_sha256":try fileDigest(engine.appendingPathComponent("oracle-gbrain-read")),
            "method_sha256":digest(method),"created_at":ISO8601DateFormatter().string(from:Date())]
        if let settings=try? readJSON(home.appendingPathComponent("onboarding/installations/"+id+"/maintenance.json")) {plan["maintenance"]=try OracleMaintenancePolicy.settings(settings)}
        plan["plan_hash"]=try planDigest(plan)
        // The native Install action confirms this exact scope, without fabricating identity consent.
        plan["confirmed_hash"]=plan["plan_hash"]
        try writeJSON(baseline,home.appendingPathComponent("setup/\(id).baseline.json"))
        try writeJSON(plan,home.appendingPathComponent("setup/plans/\(id).json"))
        try writeJSON(plan,home.appendingPathComponent("setup/plan.json"))
        config["libraryRoots"]=roots;try persist()
        return plan
    }
    func stageDistribution(_ manifest:DistributionManifest,plan:[String:Any],fetch:((String,Int)throws->Data)?=nil) throws {
        let network=UpdateNetwork(),download=fetch ?? {try network.fetch($0,limit:$1)},id=plan["id"] as! String
        let stage=try scoped("staging/"+id+"/files",root:home)
        try fm.createDirectory(at:stage,withIntermediateDirectories:true,attributes:[.posixPermissions:0o700])
        var downloaded=0;let total=manifest.packages.reduce(0){$0+($1["bytes"] as! Int)}
        for package in manifest.packages {
            try autoreleasepool {
            try checkOnboardingCancellation()
            let hash=package["sha256"] as! String,cache=try scoped("cache/packages/"+hash+".json",root:home)
            let bytes:Data
            if fm.fileExists(atPath:cache.path),try fileDigest(cache) != hash {
                let recovery=try scoped("staging/"+id+"/rejected-cache/"+UUID().uuidString+".json",root:home)
                try fm.createDirectory(at:recovery.deletingLastPathComponent(),withIntermediateDirectories:true)
                try fm.moveItem(at:cache,to:recovery)
            }
            if fm.fileExists(atPath:cache.path) {
                guard (try cache.resourceValues(forKeys:[.fileSizeKey])).fileSize==package["bytes"] as? Int else{throw failure("Cache fora do tamanho declarado.")}
                bytes=try Data(contentsOf:cache)
            } else {
                bytes=try downloadDistribution(package["url"] as! String,limit:DistributionManifest.maximumPackageBytes,fetch:download)
                _=try manifest.decodePackage(bytes,metadata:package)
                try fm.createDirectory(at:cache.deletingLastPathComponent(),withIntermediateDirectories:true,attributes:[.posixPermissions:0o700])
                try atomicWriteData(bytes,to:cache,permissions:0o600)
            }
            for file in try manifest.decodePackage(bytes,metadata:package) {
                try checkOnboardingCancellation()
                let target=try scoped(digest(Data(file.path.utf8)),root:stage)
                if fm.fileExists(atPath:target.path),try fileDigest(target)==file.hash {continue}
                try atomicWriteData(file.data,to:target,permissions:0o600)
            }
            downloaded+=bytes.count
            try distributionEvent(plan:plan,phase:"downloading",kind:"package",itemID:package["id"] as! String,status:"verified",paths:[],completed:downloaded,total:total,bytes:downloaded,byteTotal:total)
            }
        }
        for file in manifest.files {guard try fileDigest(stage.appendingPathComponent(digest(Data(file.path.utf8))))==file.hash else{throw failure("Staging incompleto; instalação não iniciada.")}}
        try writeJSON(["plan_hash":plan["plan_hash"]!,"manifest_sha256":manifest.hash,"files":manifest.files.count,"status":"verified"],home.appendingPathComponent("staging/"+id+"/receipt.json"))
    }
    /// A single durable ledger is shared by first install and subsequent updates.
    /// Intent and previous bytes precede each write, allowing safe replay after crash.
    func applyDistribution(_ manifest:DistributionManifest,plan:[String:Any]) throws -> [String:Any] {
        try withVaultWrite {
            let root=try vault(),id=plan["id"] as! String,stage=try scoped("staging/"+id,root:home)
            let stageReceipt=try readJSON(stage.appendingPathComponent("receipt.json"))
            guard stageReceipt["plan_hash"] as? String==plan["plan_hash"] as? String,stageReceipt["manifest_sha256"] as? String==manifest.hash else{throw failure("Pacotes pertencem a outro plano.")}
            let journalURL=stage.appendingPathComponent("transaction.json")
            let previous=(try? readJSON(distributionLedgerURL)) ?? [:]
            if let priorVault=previous["vault"] as? String,priorVault != root.path{throw failure("O acervo está vinculado a outro vault. Preserve o perfil anterior antes de trocar o destino.")}
            if let oldHash=previous["manifest_sha256"] as? String,DistributionManifest.validHash(oldHash),oldHash != manifest.hash {
                let oldBytes=try Data(contentsOf:scoped("cache/distributions/"+oldHash+"/oracle-distribution.json",root:home))
                guard digest(oldBytes)==oldHash else{throw failure("Manifesto anterior mudou; renomes não podem ser verificados.")}
                let oldManifest=try decodeDistribution(oldBytes,allowKnownRollback:true)
                let renames=manifest.document["renames"] as? [[String:String]] ?? []
                for item in manifest.items {
                    if let oldItem=oldManifest.items.first(where:{$0.id==item.id}),oldItem.entry != item.entry {
                        guard renames.contains(where:{$0["id"]==item.id && $0["from"]==oldItem.entry && $0["to"]==item.entry}) else{throw failure("Mudança de caminho exige mapeamento de renome com a mesma identidade.")}
                    }
                }
            }
            var journal=(try? readJSON(journalURL)) ?? ["schema_version":3,"id":id,"plan_hash":plan["plan_hash"]!,"manifest_sha256":manifest.hash,"vault":root.path,"status":"applying","previous":previous,"operations":[String:[String:Any]]()]
            guard journal["plan_hash"] as? String==plan["plan_hash"] as? String,journal["manifest_sha256"] as? String==manifest.hash else{throw failure("Journal pertence a outra instalação.")}
            var operations=try distributionOperations(stage:stage,journal:journal)
            let old=(journal["previous"] as? [String:Any])?["files"] as? [String:[String:Any]] ?? [:]
            let resolutionRecord=(try? readJSON(stage.appendingPathComponent("resolutions.json"))) ?? [:]
            let resolutions=resolutionRecord["plan_hash"] as? String==plan["plan_hash"] as? String ? resolutionRecord["resolutions"] as? [String:[String:String]] ?? [:]:[:]
            func approved(_ path:String,_ hash:String?) throws -> Bool {
                guard let hash,let choice=resolutions[path],choice["sha256"]==hash,let copyPath=choice["copy"] else{return false}
                let copyRoot=path.hasPrefix("sources/gbrain/") ? stage:root
                let prefix=path.hasPrefix("sources/gbrain/") ? stage.path+"/user-conflicts/":root.path+"/INBOX/oracle/conflitos/"
                guard copyPath.hasPrefix(prefix) else{return false}
                let copy=try scoped(String(copyPath.dropFirst(copyRoot.path.count+1)),root:copyRoot)
                return try fileDigest(copy)==hash
            }
            var installed=[String:[String:Any]](),verified=Set<String>(),conflicts=[[String:String]]()
            // Full conflict preflight before applying the first required file.
            for file in manifest.files {
                let target=try distributionDestination(file,plan:plan)
                if fm.fileExists(atPath:target.path) {
                    let hash=try fileDigest(target),resolved=try approved(file.path,hash)
                    if hash != file.hash && !(old[file.path]?["owned"] as? Bool==true && old[file.path]?["sha256"] as? String==hash) && !resolved {
                        conflicts.append(["path":file.path,"code":"local_edit","destination":target.path,"sha256":hash])
                    }
                }
            }
            let newPaths=Set(manifest.files.map(\.path))
            for (path,entry) in old where !newPaths.contains(path) && entry["owned"] as? Bool==true {
                guard let destination=entry["destination"] as? String,let hash=entry["sha256"] as? String else{throw failure("Ledger anterior inválido.")}
                let target=try distributionOwnedDestination(destination,root:root)
                if fm.fileExists(atPath:target.path) {let current=try fileDigest(target),resolved=try approved(path,current);if current != hash && !resolved{conflicts.append(["path":path,"code":"removed_item_edited","destination":destination,"sha256":current])}}
            }
            if !conflicts.isEmpty {
                try writeJSON(["plan_hash":plan["plan_hash"]!,"conflicts":conflicts,"status":"resolution_required"],home.appendingPathComponent("distribution/conflicts.json"))
                throw failure("\(conflicts.count) arquivos têm alterações locais. Resolva os conflitos do acervo antes de concluir; os originais foram preservados.")
            }
            try writeJSON(journal,journalURL)
            let itemMap=Dictionary(grouping:manifest.items.flatMap{item in item.required.map{($0,item.id)}},by:{$0.0})
            var remaining=Dictionary(uniqueKeysWithValues:manifest.items.map{($0.id,Set($0.required))})
            let items=Dictionary(uniqueKeysWithValues:manifest.items.map{($0.id,$0)})
            for start in stride(from:0,to:manifest.files.count,by:128) {
                let batch=manifest.files[start..<min(start+128,manifest.files.count)]
                var roots=[URL]()
                if batch.contains(where:{!$0.path.hasPrefix("sources/gbrain/")}) { roots.append(root) }
                if batch.contains(where:{$0.path.hasPrefix("sources/gbrain/")}) { roots.append(home) }
                try coordinatedWriteBatch(at:roots) {
                for file in batch {
                try autoreleasepool {
                try checkOnboardingCancellation()
                let target=try distributionDestination(file,plan:plan),key=digest(Data(file.path.utf8)),input=stage.appendingPathComponent("files/"+key)
                guard try fileDigest(input)==file.hash else{throw failure("Arquivo em staging alterado; retomada interrompida.")}
                try fm.createDirectory(at:target.deletingLastPathComponent(),withIntermediateDirectories:true)
                var op=operations[file.path] ?? [:]
                try coordinatedWrite(at:target) { coordinated in
                    guard try distributionDestination(file,plan:plan)==coordinated else{throw failure("Destino alterado durante a instalação.")}
                    let exists=fm.fileExists(atPath:target.path),current=try exists ? fileDigest(target):nil
                    if current==file.hash {
                        if op.isEmpty {op=["action":"reuse","owned":old[file.path]?["owned"] as? Bool ?? false,"new_hash":file.hash,"destination":target.path]}
                    } else {
                        if exists {
                            let resolved=try approved(file.path,current)
                            guard (old[file.path]?["owned"] as? Bool==true && current==old[file.path]?["sha256"] as? String) || resolved else{throw failure("Edição concorrente preservada: \(file.path)")}
                            let backup=stage.appendingPathComponent("recovery/"+key)
                            try fm.createDirectory(at:backup.deletingLastPathComponent(),withIntermediateDirectories:true)
                            if !fm.fileExists(atPath:backup.path){try atomicWriteData(Data(contentsOf:target),to:backup,permissions:0o600)}
                            guard try fileDigest(backup)==current else{throw failure("Cópia de recuperação divergente.")}
                        }
                        op=["action":"write","owned":true,"old_hash":current as Any? ?? NSNull(),"new_hash":file.hash,"destination":target.path,"intent":true,"recovery":key]
                        operations[file.path]=op;try persistDistributionOperation(op,path:file.path,stage:stage)
                        let data=try Data(contentsOf:input)
                        if exists {try atomicWriteData(data,to:target,permissions:mode_t(file.mode))}
                        else {try data.write(to:target,options:.withoutOverwriting);try fm.setAttributes([.posixPermissions:file.mode],ofItemAtPath:target.path)}
                    }
                    guard try fileDigest(target)==file.hash else{throw failure("A gravação não corresponde ao manifesto.")}
                }
                op["verified"]=true;operations[file.path]=op
                installed[file.path]=["sha256":file.hash,"owned":op["owned"] as? Bool ?? false,"destination":target.path,"mode":file.mode,"release_id":manifest.releaseID]
                try persistDistributionOperation(op,path:file.path,stage:stage);verified.insert(file.path)
                for pair in itemMap[file.path] ?? [] {
                    remaining[pair.1]?.remove(file.path)
                    if remaining[pair.1]?.isEmpty==true,let item=items[pair.1] {
                        let paths=try item.required.map{path -> [String:Any] in let required=manifest.byPath[path]!,destination=try distributionDestination(required,plan:plan);return ["path":String(destination.path.dropFirst(root.path.count+1)),"hash":required.hash]}
                        try distributionEvent(plan:plan,phase:"installing",kind:item.kind,itemID:item.id,status:"installed",paths:paths,completed:verified.count,total:manifest.files.count,extra:["entry":item.entry,"name":item.name,"department_id":item.department,"specialist_id":item.specialist as Any? ?? NSNull()])
                    }
                }
            }
            }
                }
                try distributionEvent(plan:plan,phase:"installing",kind:"files",itemID:"copy-progress",status:"verified",paths:[],completed:verified.count,total:manifest.files.count)
            }
            var tombstones=[[String:Any]]()
            for (path,entry) in old.sorted(by:{$0.key<$1.key}) where !newPaths.contains(path) {
                guard entry["owned"] as? Bool==true,let destination=entry["destination"] as? String,let hash=entry["sha256"] as? String else{continue}
                try checkOnboardingCancellation()
                let target=try distributionOwnedDestination(destination,root:root),key=digest(Data(path.utf8)),backup=stage.appendingPathComponent("recovery/"+key)
                if fm.fileExists(atPath:target.path) {
                    try coordinatedWrite(at:target,options:.forDeleting) {_ in
                        let current=try fileDigest(target),resolved=try approved(path,current)
                        guard current==hash || resolved else{throw failure("Arquivo retirado da release recebeu edição; original preservado.")}
                        try fm.createDirectory(at:backup.deletingLastPathComponent(),withIntermediateDirectories:true)
                        if !fm.fileExists(atPath:backup.path){try atomicWriteData(Data(contentsOf:target),to:backup,permissions:0o600)}
                        guard try fileDigest(backup)==current else{throw failure("Recuperação da remoção não foi verificada.")}
                        operations[path]=["action":"remove","old_hash":current,"destination":destination,"recovery":key,"intent":true]
                        try persistDistributionOperation(operations[path]!,path:path,stage:stage)
                        guard Darwin.unlink(target.path)==0 else{throw failure("Não foi possível retirar o arquivo gerenciado; original preservado.")}
                    }
                }
                tombstones.append(["path":path,"previous":entry,"recovery":backup.path])
            }
            let ledger:[String:Any]=["schema_version":3,"vault":root.path,"install_id":id,"plan_hash":plan["plan_hash"]!,"manifest_sha256":manifest.hash,"release_id":manifest.releaseID,"sequence":manifest.sequence,"files":installed,"tombstones":tombstones,"status":"files_installed"]
            try writeJSON(ledger,distributionLedgerURL)
            journal["operations"]=operations;journal["status"]="files_installed";try writeJSON(journal,journalURL)
            try writeJSON(["plan_hash":plan["plan_hash"]!,"conflicts":[],"status":"resolved"],home.appendingPathComponent("distribution/conflicts.json"))
            try writeJSON(["sequence":manifest.sequence,"manifest_sha256":manifest.hash,"release_id":manifest.releaseID],home.appendingPathComponent("distribution/highest-release.json"))
            try publishDistributionInventory(manifest,plan:plan)
            notifyVaultChanged(reason:"distribution-install")
            return ledger
        }
    }
    func distributionOwnedDestination(_ path:String,root:URL) throws -> URL {
        if path.hasPrefix(root.path+"/"){return try scoped(String(path.dropFirst(root.path.count+1)),root:root)}
        let source=home.appendingPathComponent("sources/gbrain").path
        guard path.hasPrefix(source+"/") else{throw failure("Ledger aponta para fora dos destinos gerenciados.")}
        return try scoped(String(path.dropFirst(home.path.count+1)),root:home)
    }
    func publishDistributionInventory(_ manifest:DistributionManifest,plan:[String:Any]) throws {
        let root=try vault(),target=try scoped("SISTEMA/oracle/distribution.json",root:root)
        let data=try jsonData(["schema_version":3,"release_id":manifest.releaseID,"manifest_sha256":manifest.hash,"counts":manifest.document["counts"]!,"items":manifest.items.map(\.raw),"library_roots":plan["library_roots"]!])
        let receipt=home.appendingPathComponent("distribution/vault-manifest.json"),old=try? readJSON(receipt)
        try coordinatedWrite(at:target) {_ in
            if fm.fileExists(atPath:target.path) {let hash=try fileDigest(target);guard hash==digest(data) || (old?["vault"] as? String==root.path && old?["sha256"] as? String==hash) else{throw failure("Manifesto do vault editado; arquivo preservado.")}}
            try fm.createDirectory(at:target.deletingLastPathComponent(),withIntermediateDirectories:true)
            try atomicWriteData(data,to:target,permissions:0o644)
        }
        try writeJSON(["vault":root.path,"sha256":digest(data),"plan_hash":plan["plan_hash"]!],receipt)
    }
    func verifyDistribution(_ manifest:DistributionManifest,plan:[String:Any]) throws -> [String:Any] {
        let ledger=try readJSON(distributionLedgerURL)
        guard ledger["manifest_sha256"] as? String==manifest.hash,ledger["vault"] as? String==plan["vault"] as? String,
              ledger["plan_hash"] as? String==plan["plan_hash"] as? String,
              let installed=ledger["files"] as? [String:[String:Any]],installed.count==manifest.files.count else{throw failure("Ledger incompleto para a distribuição selecionada.")}
        for file in manifest.files {let target=try distributionDestination(file,plan:plan);guard installed[file.path]?["sha256"] as? String==file.hash,installed[file.path]?["destination"] as? String==target.path,try fileDigest(target)==file.hash else{throw failure("Arquivo obrigatório ausente ou alterado: \(file.path)")}}
        let conflict=(try? readJSON(home.appendingPathComponent("distribution/conflicts.json"))) ?? [:]
        guard (conflict["conflicts"] as? [[String:Any]] ?? []).isEmpty else{throw failure("Ainda há conflitos sem resolução.")}
        return ["complete":true,"manifest_sha256":manifest.hash,"files":manifest.files.count,"items":manifest.items.count,"release_id":manifest.releaseID]
    }
    func distributionEvent(plan:[String:Any],phase:String,kind:String,itemID:String,status:String,paths:[[String:Any]],completed:Int,total:Int?,bytes:Int=0,byteTotal:Int?=nil,extra:[String:Any]=[:]) throws {
        guard let id=plan["id"] as? String,UUID(uuidString:id) != nil,let hash=plan["plan_hash"] as? String else{throw failure("Evento sem plano.")}
        let folder=try scoped("onboarding/installations/"+id,root:home),stateURL=folder.appendingPathComponent("progress.json")
        var state=(try? readJSON(stateURL)) ?? ["sequence":0,"items":[String:[String:Any]]()]
        let sequence=(state["sequence"] as? Int ?? 0)+1,eventID=digest(Data((hash+phase+itemID+status+String(completed)).utf8))
        var event:[String:Any]=["schema_version":3,"install_id":id,"plan_hash":hash,"generation":plan["distribution_sha256"] ?? hash,"event_id":eventID,"sequence":sequence,"phase":phase,"item_id":itemID,"kind":kind,"status":status,"completed":completed,"total":total as Any? ?? NSNull(),"bytes_downloaded":bytes,"bytes_total":byteTotal as Any? ?? NSNull(),"verified_paths":paths]
        for (key,value) in extra {event[key]=value}
        let eventURL=folder.appendingPathComponent("events/"+eventID+".json")
        if fm.fileExists(atPath:eventURL.path){
            let prior=try readJSON(eventURL)
            guard prior["plan_hash"] as? String==hash,prior["event_id"] as? String==eventID else{throw failure("Evento de outra instalação recusado.")}
            if let oldSequence=prior["sequence"] as? Int,oldSequence <= (state["sequence"] as? Int ?? 0){return}
            event=prior
        }else{try writeJSON(event,eventURL)}
        if ["skill","prompt","tutorial","connector","core"].contains(kind),["installed","verified"].contains(status) {
            var items=state["items"] as? [String:[String:Any]] ?? [:],projection=event
            projection.removeValue(forKey:"verified_paths")
            items[itemID]=projection;state["items"]=items
        }
        state["sequence"]=max(sequence,event["sequence"] as? Int ?? 0);state["plan_hash"]=hash;state["phase"]=phase;state["completed"]=completed;state["total"]=total as Any? ?? NSNull();state["bytes_downloaded"]=bytes;state["bytes_total"]=byteTotal as Any? ?? NSNull()
        try writeJSON(state,stateURL)
    }
}
