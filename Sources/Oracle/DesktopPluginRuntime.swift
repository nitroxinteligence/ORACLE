import Foundation

/// Immutable owned generations keep hooks and scheduled commands alive when Codex
/// rotates or removes its plugin cache. Existing generations are never replaced.
enum OracleDesktopPluginRuntime {
    static let owner="oracle-desktop-plugin-runtime"
    static func inventory(_ bundle:URL)throws->[String:String] {
        try OracleCodexRuntimeBinding.existing(bundle,directory:true)
        guard let walker=fm.enumerator(at:bundle,includingPropertiesForKeys:[.isDirectoryKey,.isRegularFileKey,.isSymbolicLinkKey],options:[]) else{throw failure("Runtime do plugin indisponível.")}
        var files=[String:String]()
        for case let url as URL in walker {
            let values=try url.resourceValues(forKeys:[.isDirectoryKey,.isRegularFileKey,.isSymbolicLinkKey])
            guard values.isSymbolicLink != true,url.resolvingSymlinksInPath().path==url.path else{throw failure("O runtime do plugin contém um link indireto.")}
            if values.isRegularFile==true {
                guard files.count<30_000 else{throw failure("O runtime excede o limite de arquivos.")}
                files[String(url.path.dropFirst(bundle.path.count+1))]=try OracleCodexRuntimeBinding.hash(url)
            } else {guard values.isDirectory==true else{throw failure("O runtime contém um tipo de arquivo não admitido.")}}
        }
        return files
    }
    static func generationID(_ files:[String:String])throws->String {digest(try JSONSerialization.data(withJSONObject:files,options:[.sortedKeys]))}
    static func validateOwner(_ value:[String:Any],home:URL)throws {
        guard value["owner"] as? String==owner,value["schema_version"] as? Int==1,value["home"] as? String==home.path else{throw failure("O diretório de runtime pertence a outra instalação. Foi preservado.")}
    }
    static func verify(binding:[String:Any],state:String)throws {
        guard let id=binding["plugin_generation"] as? String,OracleCodexRuntimeBinding.validHash(id),binding["plugin_runtime_owner"] as? String==owner else{throw failure("Recibo da geração do plugin inválido.")}
        let home=URL(fileURLWithPath:state),root=home.appendingPathComponent("desktop-plugin-runtime"),generation=root.appendingPathComponent("generations/"+id),bundle=generation.appendingPathComponent("Oracle.app")
        guard binding["bundle"] as? String==bundle.path else{throw failure("O vínculo do plugin aponta para outro perfil.")}
        try OracleCodexRuntimeBinding.existing(root,directory:true)
        try validateOwner(readJSON(root.appendingPathComponent("owner.json")),home:home)
        let receiptURL=generation.appendingPathComponent("receipt.json");try OracleCodexRuntimeBinding.existing(receiptURL)
        let receipt=try readJSON(receiptURL);try validateOwner(receipt,home:home)
        guard receipt["generation"] as? String==id,receipt["bundle"] as? String==bundle.path,let files=receipt["files"] as? [String:String],try generationID(files)==id,try inventory(bundle)==files else{throw failure("A geração durável não corresponde ao recibo íntegro.")}
    }
    static func prepare(home:URL,source:URL,expectedFiles:[String:String],signature:(URL)throws->String)throws->[String:Any] {
        let root=home.appendingPathComponent("desktop-plugin-runtime"),generations=root.appendingPathComponent("generations")
        guard home.path==home.standardizedFileURL.path,home.resolvingSymlinksInPath().path==home.path,root.resolvingSymlinksInPath().path==root.path else{throw failure("O estado do runtime precisa de um caminho direto.")}
        let files=try inventory(source)
        guard !files.isEmpty,files==expectedFiles else{throw failure("O runtime do plugin diverge do inventário do pacote.")}
        let sourceSignature=try signature(source)
        guard ["developer_ad_hoc","developer_id","test_fixture"].contains(sourceSignature) else{throw failure("A assinatura do runtime do plugin não foi verificada.")}
        if fm.fileExists(atPath:root.path) {
            try OracleCodexRuntimeBinding.existing(root,directory:true)
            try validateOwner(readJSON(root.appendingPathComponent("owner.json")),home:home)
        } else {
            let rootStage=home.appendingPathComponent(".desktop-plugin-root-stage-"+UUID().uuidString.lowercased())
            try fm.createDirectory(at:rootStage,withIntermediateDirectories:false,attributes:[.posixPermissions:0o700])
            try writeJSON(["owner":owner,"schema_version":1,"home":home.path],rootStage.appendingPathComponent("owner.json"))
            try fm.moveItem(at:rootStage,to:root)
        }
        try fm.createDirectory(at:generations,withIntermediateDirectories:true,attributes:[.posixPermissions:0o700])
        try OracleCodexRuntimeBinding.existing(generations,directory:true)
        let id=try generationID(files),generation=generations.appendingPathComponent(id),bundle=generation.appendingPathComponent("Oracle.app")
        let receipt:[String:Any]=["owner":owner,"schema_version":1,"home":home.path,"generation":id,"bundle":bundle.path,"files":files,"signature":sourceSignature]
        if fm.fileExists(atPath:generation.path) {
            try OracleCodexRuntimeBinding.existing(generation,directory:true)
            let existing=try readJSON(generation.appendingPathComponent("receipt.json"));try validateOwner(existing,home:home)
            guard existing["generation"] as? String==id,existing["bundle"] as? String==bundle.path,existing["files"] as? [String:String]==files,try inventory(bundle)==files else{throw failure("A geração durável foi alterada; preservada para revisão.")}
        } else {
            let stage=root.appendingPathComponent(".stage-"+UUID().uuidString.lowercased())
            try fm.createDirectory(at:stage,withIntermediateDirectories:false,attributes:[.posixPermissions:0o700])
            // This receipt makes an interrupted stage recognizable without deleting
            // unowned paths. A later attempt can prepare a fresh stage safely.
            try writeJSON(receipt,stage.appendingPathComponent("receipt.json"))
            let staged=stage.appendingPathComponent("Oracle.app")
            try fm.copyItem(at:source,to:staged)
            guard try inventory(staged)==files,try signature(staged)==sourceSignature else{throw failure("A cópia do runtime não passou na verificação; geração anterior preservada.")}
            try fm.moveItem(at:stage,to:generation)
        }
        guard try signature(bundle)==sourceSignature else{throw failure("A assinatura da geração durável mudou.")}
        // Recovery after move-before-pointer simply verifies the existing complete
        // generation and rewrites this atomic pointer. Older generations survive.
        let binding=try OracleCodexRuntimeBinding.prepare(bundle:bundle,oracle:bundle.appendingPathComponent("Contents/MacOS/Oracle"),adapter:bundle.appendingPathComponent("Contents/Resources/engine/oracle-gbrain-read"),installationRoots:[generation],signature:signature)
        try writeJSON(receipt,root.appendingPathComponent("current.json"))
        var result=binding;result["plugin_generation"]=id;result["plugin_runtime_owner"]=owner
        return result
    }
}

extension Core {
    func desktopPluginRuntimeBinding()throws->[String:Any]? {
        guard let path=ProcessInfo.processInfo.environment["ORACLE_DESKTOP_PLUGIN_ROOT"] else{return nil}
        try requireCapability(.configure)
        let lock=try acquireOperationLock("desktop-plugin-runtime");defer{releaseOperationLock(lock)}
        let plugin=URL(fileURLWithPath:path).standardizedFileURL,source=plugin.appendingPathComponent("runtime/Oracle.app")
        guard plugin.path==path,plugin.resolvingSymlinksInPath().path==path,Bundle.main.bundleURL.standardizedFileURL.path==source.path else{throw failure("O runtime atual não pertence ao pacote Oracle System declarado.")}
        let receiptURL=plugin.appendingPathComponent("package-receipt.json")
        try OracleCodexRuntimeBinding.existing(receiptURL)
        guard (try receiptURL.resourceValues(forKeys:[.fileSizeKey]).fileSize ?? Int.max)<4_000_000 else{throw failure("Inventário do pacote excessivo.")}
        let receipt=try readJSON(receiptURL)
        guard receipt["schemaVersion"] as? Int==1,receipt["plugin"] as? String=="oracle-desktop",let inventory=receipt["files"] as? [String:String] else{throw failure("Recibo do pacote Oracle System inválido.")}
        let prefix="runtime/Oracle.app/"
        var expected=[String:String]()
        for (file,hash) in inventory where file.hasPrefix(prefix) {
            let relative=String(file.dropFirst(prefix.count))
            guard !relative.isEmpty,!relative.hasPrefix("/"),!relative.split(separator:"/").contains(".."),OracleCodexRuntimeBinding.validHash(hash) else{throw failure("Inventário do runtime fora do escopo.")}
            expected[relative]=hash
        }
        let destination=home.appendingPathComponent("desktop-plugin-runtime").standardizedFileURL.path
        var protected=[source.path]
        for key in ["vault","gbrainWorkspace","gbrainProfile"] {if let value=config[key] as? String{protected.append(URL(fileURLWithPath:value).standardizedFileURL.resolvingSymlinksInPath().path)}}
        guard protected.allSatisfy({destination != $0 && !destination.hasPrefix($0+"/") && !$0.hasPrefix(destination+"/")}) else{throw failure("O runtime durável precisa ficar fora do vault e dos perfis de conhecimento.")}
        return try OracleDesktopPluginRuntime.prepare(home:home,source:source,expectedFiles:expected,signature:verifyDesktopPluginSignature)
    }
    func verifyDesktopPluginSignature(_ app:URL)throws->String {
        let env=["PATH":"/usr/bin:/bin:/usr/sbin:/sbin","HOME":home.path]
        let check=try runProcess(URL(fileURLWithPath:"/usr/bin/codesign"),["--verify","--deep","--strict",app.path],cwd:app.deletingLastPathComponent(),environment:env,timeout:90,operation:"Verificar runtime durável do Oracle System")
        guard check.code==0 else{throw failure("A assinatura interna do Oracle System não passou na verificação.")}
        let details=try runProcess(URL(fileURLWithPath:"/bin/sh"),["-c","exec /usr/bin/codesign -dv --verbose=4 "+OracleCodexRuntimeBinding.quote(app.path)+" 2>&1"],cwd:app.deletingLastPathComponent(),environment:env,timeout:30)
        guard details.code==0 else{throw failure("A assinatura do Oracle System não pôde ser identificada.")}
        if details.output.contains("Signature=adhoc"){return "developer_ad_hoc"}
        guard details.output.contains("Authority=Developer ID Application:") else{throw failure("Origem da assinatura do Oracle System desconhecida.")}
        return "developer_id"
    }
}
