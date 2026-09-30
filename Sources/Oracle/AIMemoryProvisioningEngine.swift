import Foundation
import CryptoKit
import Darwin

struct AIMemoryProvisioningPin {
    var archiveSHA256:String
    var binarySHA256:String
    var existingBinarySHA256:[String:String] = ["2.4.1":"f719aa9504a223c29b3199e7e57369d540adf7ad10093a18f935ad48a7000fec","2.4.2":"99a3c230d7de4b6a494bed505505cc62cbb4e3bd1ad02b9e650374d1b6519f2e"]
    static let official=AIMemoryProvisioningPin(archiveSHA256:"b4ca2bc3b1f3b4daba7a2fb2b9a87c54b4fd25adf21e58a1edf4500067737907",binarySHA256:"99a3c230d7de4b6a494bed505505cc62cbb4e3bd1ad02b9e650374d1b6519f2e")
}
struct AIMemoryProvisioningHooks {
    var fetch:(URL,Int)throws->Data
    var run:(URL,[String],URL,[String:String])throws->String
    var probe:(URL,[String],URL,[String:String])throws->[String:Any] = {try OracleAIMemoryProvisioningProbe.run(binary:$0,args:$1,cwd:$2,environment:$3)}
}

/// Prepares only an owned runtime and an isolated, empty data profile. The
/// official stdio transport is launched by Codex after its own trust decision.
enum OracleAIMemoryProvisioning {
    static let version="2.4.2",commit="a0ca8d1a5fbd5920799411fa891fe6d49c90efc1"
    static let archiveURL=URL(string:"https://github.com/akitaonrails/ai-memory/releases/download/v2.4.2/ai-memory-macos-aarch64.tar.gz")!
    static let requirement:[String:Any]=["required":true,"version":version,"commit":commit,"archiveSHA256":AIMemoryProvisioningPin.official.archiveSHA256,"interface":"codex_mcp_http_v1"]
    static func error(_ message:String)->NSError{NSError(domain:"Oracle.AIMemoryProvisioning",code:1,userInfo:[NSLocalizedDescriptionKey:message])}
    static func hash(_ data:Data)->String{SHA256.hash(data:data).map{String(format:"%02x",$0)}.joined()}
    static func canonical(_ value:[String:Any])throws->Data{try JSONSerialization.data(withJSONObject:value,options:[.sortedKeys,.withoutEscapingSlashes])}
    static func safe(_ path:URL)throws {
        guard path.path==path.standardizedFileURL.path,path.path==path.resolvingSymlinksInPath().path else{throw error("O caminho do AI Memory contém links ou precisa de revisão.")}
    }
    static func read(_ path:URL,limit:Int)throws->Data {
        try safe(path)
        let fd=Darwin.open(path.path,O_RDONLY|O_NOFOLLOW|O_NONBLOCK|O_CLOEXEC)
        guard fd>=0 else{throw error("Arquivo do AI Memory indisponível: "+path.lastPathComponent)}
        defer{Darwin.close(fd)}
        var before=stat(),after=stat()
        guard fstat(fd,&before)==0,before.st_mode&S_IFMT==S_IFREG,before.st_size>=0,before.st_size<=limit,before.st_flags&0x40000000==0 else{throw error("Arquivo do AI Memory fora dos limites.")}
        let bytes=try FileHandle(fileDescriptor:fd,closeOnDealloc:false).read(upToCount:limit+1) ?? Data()
        guard bytes.count==before.st_size,fstat(fd,&after)==0,after.st_size==before.st_size,after.st_mtimespec.tv_sec==before.st_mtimespec.tv_sec,after.st_mtimespec.tv_nsec==before.st_mtimespec.tv_nsec else{throw error("O arquivo AI Memory mudou durante a conferência.")}
        return bytes
    }
    static func write(_ document:[String:Any],to path:URL)throws {
        try safe(path);try canonical(document).write(to:path,options:.atomic)
        try FileManager.default.setAttributes([.posixPermissions:0o600],ofItemAtPath:path.path)
    }
    static func object(_ path:URL)throws->[String:Any] {
        guard let value=try JSONSerialization.jsonObject(with:read(path,limit:128_000)) as? [String:Any] else{throw error("Recibo AI Memory inválido.")};return value
    }
    static func admission(_ bytes:Data)throws->[String:Any] {
        func u32(_ offset:Int)throws->UInt32{guard offset>=0,offset+4<=bytes.count else{throw error("Mach-O AI Memory incompleto.")};return (0..<4).reduce(0){$0|UInt32(bytes[offset+$1])<<UInt32($1*8)}}
        guard try u32(0)==0xfeedfacf,try u32(4)==0x0100000c,try u32(12)==2 else{throw error("O runtime AI Memory precisa ser um executável Mach-O arm64.")}
        let count=try u32(16),total=try u32(20)
        guard count<=256,total<=1_000_000,32+Int(total)<=bytes.count else{throw error("Cabeçalho AI Memory inválido.")}
        var offset=32,minOS:UInt32?
        for _ in 0..<count {
            let command=try u32(offset),size=try u32(offset+4)
            guard size>=8,offset+Int(size)<=32+Int(total) else{throw error("Load command AI Memory inválido.")}
            if command==0x32 {guard size>=24,try u32(offset+8)==1 else{throw error("O runtime AI Memory não declara plataforma macOS.")};minOS=try u32(offset+12)}
            if command==0x24 {guard size>=16 else{throw error("Versão mínima AI Memory inválida.")};minOS=try u32(offset+8)}
            offset+=Int(size)
        }
        guard let minOS,minOS<=0x000d0000 else{throw error("Este runtime AI Memory exige macOS posterior ao 13. A instalação ficou pendente.")}
        return ["architecture":"arm64","minimumOS":"\(minOS>>16).\((minOS>>8)&255).\(minOS&255)","macOS13Admitted":true]
    }
    static func environment(home:URL,data:URL)->[String:String] {
        var result=["PATH":"/usr/bin:/bin:/usr/sbin:/sbin","HOME":home.path,"LANG":"en_US.UTF-8","RUST_LOG":"warn","AI_MEMORY_DATA_DIR":data.path,"AI_MEMORY_EMBEDDING_PROVIDER":"none","AI_MEMORY_CAPTURE_ASSISTANT":"false","AI_MEMORY_LLM_PROVIDER":"","AI_MEMORY_LLM_FALLBACKS":"[]","AI_MEMORY_RERANKER":""]
        for key in ["ANTHROPIC_API_KEY","OPENAI_API_KEY","GOOGLE_API_KEY","GEMINI_API_KEY","VOYAGE_API_KEY","COHERE_API_KEY","MISTRAL_API_KEY","GROQ_API_KEY","XAI_API_KEY","AI_MEMORY_API_KEY","AI_MEMORY_LLM_API_KEY","AI_MEMORY_EMBEDDING_API_KEY","AI_MEMORY_LLM_BASE_URL","AI_MEMORY_EMBEDDING_BASE_URL","AI_MEMORY_AUTH_TOKEN","AI_MEMORY_AUTH__INITIAL_ROOT_PASSWORD","AI_MEMORY_AUTH__RECOVERY_TOKEN"] {result[key]=""}
        return result
    }
    static func extract(archive:URL,to stage:URL,hooks:AIMemoryProvisioningHooks)throws {
        let env=["PATH":"/usr/bin:/bin","LANG":"en_US.UTF-8"]
        let names=try hooks.run(URL(fileURLWithPath:"/usr/bin/tar"),["-tzf",archive.path],stage,env).split(separator:"\n",omittingEmptySubsequences:true).map(String.init)
        guard !names.isEmpty,names.count<=2_000 else{throw error("Inventário AI Memory fora do limite de 2.000 itens.")}
        var seen=Set<String>()
        for raw in names {
            let name=raw.hasPrefix("./") ? String(raw.dropFirst(2)):raw
            if name.isEmpty{continue}
            let parts=name.split(separator:"/",omittingEmptySubsequences:true)
            guard !name.hasPrefix("/"),!parts.contains(".."),!parts.contains("."),!name.contains("\\"),!name.contains("\r"),!name.contains("\u{0}"),seen.insert(name.lowercased()).inserted else{throw error("Arquivo AI Memory contém caminho inseguro ou colisão de nomes.")}
        }
        let details=try hooks.run(URL(fileURLWithPath:"/usr/bin/tar"),["-tvzf",archive.path],stage,env)
        var expanded=0
        for line in details.split(separator:"\n") {
            let parts=line.split(whereSeparator:{$0==" " || $0=="\t"})
            guard let mode=parts.first,mode.first=="d" || mode.first=="-",parts.count>=5,let size=Int(parts[4]),size>=0,size<=80_000_000 else{throw error("Archive AI Memory contém links, tipos especiais ou arquivos fora do limite.")}
            expanded+=size;guard expanded<=160_000_000 else{throw error("Archive AI Memory excede 160 MB expandidos.")}
        }
        _=try hooks.run(URL(fileURLWithPath:"/usr/bin/tar"),["-xzf",archive.path,"-C",stage.path],stage,env)
        try inspectTree(stage)
    }
    static func inspectTree(_ root:URL)throws {
        let manager=FileManager.default
        var unreadable=false
        guard let iterator=manager.enumerator(at:root,includingPropertiesForKeys:[.isSymbolicLinkKey,.isRegularFileKey,.isDirectoryKey,.fileSizeKey],options:[],errorHandler:{_,_ in unreadable=true;return true}) else{throw error("Não foi possível conferir o runtime extraído.")}
        var count=0,total=0
        for case let path as URL in iterator {
            count+=1;let values=try path.resourceValues(forKeys:[.isSymbolicLinkKey,.isRegularFileKey,.isDirectoryKey,.fileSizeKey])
            guard count<=2_000,values.isSymbolicLink != true,values.isRegularFile==true || values.isDirectory==true else{throw error("Runtime extraído contém arquivos inseguros.")}
            total+=values.fileSize ?? 0;guard total<=160_000_000 else{throw error("Runtime extraído fora do limite.")}
        }
        guard !unreadable else{throw error("Runtime extraído com arquivos ilegíveis; verificação incompleta.")}
    }
    static func verify(state:URL,binding:[String:Any],pin:AIMemoryProvisioningPin = .official)throws->[String:Any] {
        let receipt=try object(state.appendingPathComponent("receipt.json"))
        guard receipt["owner"] as? String=="oracle-ai-memory-runtime",receipt["schemaVersion"] as? Int==1,receipt["captureEnabled"] as? Bool==false,receipt["hooksTrusted"] as? Bool==false,receipt["executionVerified"] as? Bool==false,
              let recordedBinding=receipt["binding"] as? [String:Any],try canonical(recordedBinding)==canonical(binding),let binary=receipt["binary"] as? String,let expected=receipt["binarySHA256"] as? String else{throw error("O recibo AI Memory não corresponde ao plano/vault atual.")}
        let path=URL(fileURLWithPath:binary),bytes=try read(path,limit:80_000_000)
        guard FileManager.default.isExecutableFile(atPath:path.path),hash(bytes)==expected else{throw error("O executável AI Memory mudou. Revise a instalação preservando o perfil existente.")}
        _=try admission(bytes)
        if receipt["mode"] as? String=="owned" {
            let installation=state.appendingPathComponent("installation-"+version)
            guard path.path==installation.appendingPathComponent("runtime/ai-memory").path,expected==pin.binarySHA256,
                  receipt["localProtocolVerified"] as? Bool==true,receipt["archiveSHA256"] as? String==pin.archiveSHA256,receipt["version"] as? String==version,receipt["commit"] as? String==commit,
                  let config=receipt["config"] as? String,config==installation.appendingPathComponent("data/config.toml").path,receipt["data"] as? String==installation.appendingPathComponent("data").path,
                  receipt["configSHA256"] as? String==hash(try read(URL(fileURLWithPath:config),limit:128_000)) else{throw error("Runtime/configuração AI Memory alterado; nenhuma conclusão foi fabricada.")}
            let owner=try object(installation.appendingPathComponent("owner.json"))
            guard owner["owner"] as? String=="oracle-ai-memory-runtime",owner["state"] as? String==state.path else{throw error("Runtime AI Memory sem autoria comprovada.")}
        } else if receipt["mode"] as? String=="existing" {
            guard let evidence=receipt["evidence"] as? [[String:String]],!evidence.isEmpty else{throw error("Instância Codex existente sem evidência.")}
            guard let existingVersion=receipt["version"] as? String,pin.existingBinarySHA256[existingVersion]==expected else{throw error("Binary AI Memory existente sem proveniência de release compatível.")}
            for item in evidence {
                guard let file=item["path"] else{throw error("Evidência AI Memory incompleta.")}
                if item["kind"]=="alias" {
                    guard URL(fileURLWithPath:file).resolvingSymlinksInPath().path==item["canonical"] else{throw error("O alias do AI Memory mudou. Preserve a integração existente e revise-a.")}
                } else {guard let expected=item["sha256"],hash(try read(URL(fileURLWithPath:file),limit:1_000_000))==expected else{throw error("A integração AI Memory existente mudou. Revise sem reinstalar.")}}
            }
        } else{throw error("Autoria AI Memory desconhecida.")}
        return receipt
    }
    static func prepare(state:URL,binding:[String:Any],existing:[String:Any]?=nil,bundledArchive:URL?=nil,pin:AIMemoryProvisioningPin = .official,hooks:AIMemoryProvisioningHooks)throws->[String:Any] {
        try safe(state);let manager=FileManager.default
        try manager.createDirectory(at:state,withIntermediateDirectories:true,attributes:[.posixPermissions:0o700])
        let fd=Darwin.open(state.path,O_RDONLY|O_DIRECTORY|O_NOFOLLOW|O_CLOEXEC)
        guard fd>=0 else{throw error("Estado AI Memory indisponível.")};defer{Darwin.close(fd)}
        guard flock(fd,LOCK_EX|LOCK_NB)==0 else{throw error("Outra instalação AI Memory está em andamento.")};defer{flock(fd,LOCK_UN)}
        let receiptURL=state.appendingPathComponent("receipt.json")
        if manager.fileExists(atPath:receiptURL.path) {
            let previous=try object(receiptURL)
            // Reuse is allowed across new plans only after checking the exact
            // previous bytes and evidence; never adopt an edited runtime.
            guard let old=previous["binding"] as? [String:Any] else{throw error("Recibo AI Memory sem vínculo.")}
            var receipt=try verify(state:state,binding:old,pin:pin)
            receipt["binding"]=binding;try write(receipt,to:receiptURL);return receipt
        }
        var receipt:[String:Any]=["owner":"oracle-ai-memory-runtime","schemaVersion":1,"binding":binding,"runtimePrepared":true,"serviceAvailable":false,"codexConfigured":false,"captureEnabled":false,"hooksPrepared":false,"hooksTrusted":false,"executionVerified":false,"vaultImported":false]
        if var existing {
            guard let path=existing["binary"] as? String,let data=existing["data"] as? String,
                  let evidence=existing["evidence"] as? [[String:String]],!evidence.isEmpty else{throw error("A instância Codex existente precisa de revisão; não foi criada uma duplicata.")}
            let binary=URL(fileURLWithPath:path),dataURL=URL(fileURLWithPath:data)
            try safe(dataURL);let bytes=try read(binary,limit:80_000_000);_=try admission(bytes)
            guard manager.isExecutableFile(atPath:path) else{throw error("Executável AI Memory existente indisponível.")}
            let reported=try hooks.run(binary,["--version"],state,environment(home:state,data:dataURL)).trimmingCharacters(in:.whitespacesAndNewlines)
            guard ["ai-memory 2.4.1","ai-memory 2.4.2"].contains(reported) else{throw error("A versão AI Memory Codex existente precisa de revisão. Nenhuma atualização incidental foi feita.")}
            let existingVersion=String(reported.dropFirst("ai-memory ".count))
            guard pin.existingBinarySHA256[existingVersion]==hash(bytes) else{throw error("Binary AI Memory existente diverge da release oficial compatível. Preserve-o para revisão, sem reinstalar.")}
            existing["binarySHA256"]=hash(bytes);existing["version"]=existingVersion
            existing["existingVersionCompatible"]=true;existing["pinApplied"]=false
            for (key,value) in existing{receipt[key]=value}
            receipt["mode"]="existing";receipt["codexConfigured"]=true;receipt["existingCodexConfiguration"]=true
        } else {
            let installation=state.appendingPathComponent("installation-"+version)
            if manager.fileExists(atPath:installation.path) {
                let owner=try object(installation.appendingPathComponent("owner.json"))
                guard owner["owner"] as? String=="oracle-ai-memory-runtime",owner["state"] as? String==state.path,
                      owner["archiveSHA256"] as? String==pin.archiveSHA256,owner["binarySHA256"] as? String==pin.binarySHA256,
                      let expected=owner["configSHA256"] as? String else{throw error("Instalação AI Memory sem autoria comprovada. Preserve-a e revise antes de continuar.")}
                let binary=installation.appendingPathComponent("runtime/ai-memory"),config=installation.appendingPathComponent("data/config.toml")
                let bytes=try read(binary,limit:80_000_000)
                guard hash(bytes)==pin.binarySHA256,hash(try read(config,limit:128_000))==expected else{throw error("A instalação interrompida AI Memory foi editada; os arquivos foram preservados.")}
                receipt.merge(["mode":"owned","existingCodexConfiguration":false,"version":version,"commit":commit,"archiveSHA256":pin.archiveSHA256,"binarySHA256":pin.binarySHA256,"binary":binary.path,"data":installation.appendingPathComponent("data").path,"config":config.path,"configSHA256":expected,"admission":try admission(bytes)],uniquingKeysWith:{$1})
            } else {
            let stage=state.appendingPathComponent(".stage-"+UUID().uuidString.lowercased()),runtime=stage.appendingPathComponent("runtime"),data=stage.appendingPathComponent("data")
            try manager.createDirectory(at:runtime,withIntermediateDirectories:true,attributes:[.posixPermissions:0o700])
            try write(["owner":"oracle-ai-memory-runtime","state":state.path],to:stage.appendingPathComponent("owner.json"))
            var stageIdentity=stat();guard lstat(stage.path,&stageIdentity)==0 else{throw error("Staging AI Memory indisponível.")}
            defer {
                var current=stat()
                if manager.fileExists(atPath:stage.path),(try? safe(stage)) != nil,lstat(stage.path,&current)==0,current.st_ino==stageIdentity.st_ino,current.st_dev==stageIdentity.st_dev,
                   let owner=try? object(stage.appendingPathComponent("owner.json")),owner["owner"] as? String=="oracle-ai-memory-runtime",owner["state"] as? String==state.path {try? manager.removeItem(at:stage)}
            }
            let archiveBytes=try bundledArchive.map{try read($0,limit:24_000_000)} ?? hooks.fetch(archiveURL,24_000_000)
            guard archiveBytes.count<=24_000_000,hash(archiveBytes)==pin.archiveSHA256 else{throw error("SHA-256 da release AI Memory não confere. Nenhum executável foi iniciado.")}
            let archive=stage.appendingPathComponent("release.tar.gz");try archiveBytes.write(to:archive)
            try extract(archive:archive,to:runtime,hooks:hooks)
            let binary=runtime.appendingPathComponent("ai-memory"),bytes=try read(binary,limit:80_000_000),admitted=try admission(bytes)
            guard hash(bytes)==pin.binarySHA256,manager.isExecutableFile(atPath:binary.path) else{throw error("Binary AI Memory não corresponde à release arm64 verificada.")}
            let env=environment(home:stage,data:data)
            let reported=try hooks.run(binary,["--version"],stage,env).trimmingCharacters(in:.whitespacesAndNewlines)
            guard reported=="ai-memory "+version else{throw error("Versão AI Memory divergente do pin.")}
            _=try hooks.run(binary,["--data-dir",data.path,"init"],stage,env)
            let config=data.appendingPathComponent("config.toml"),configured=try read(config,limit:128_000)
            try manager.setAttributes([.posixPermissions:0o600],ofItemAtPath:config.path)
            try write(["owner":"oracle-ai-memory-runtime","state":state.path,"archiveSHA256":pin.archiveSHA256,"binarySHA256":pin.binarySHA256,"configSHA256":hash(configured)],to:stage.appendingPathComponent("owner.json"))
            try manager.moveItem(at:stage,to:installation)
            receipt.merge(["mode":"owned","existingCodexConfiguration":false,"version":version,"commit":commit,"archiveSHA256":pin.archiveSHA256,"binarySHA256":pin.binarySHA256,"binary":installation.appendingPathComponent("runtime/ai-memory").path,"data":installation.appendingPathComponent("data").path,"config":installation.appendingPathComponent("data/config.toml").path,"configSHA256":hash(configured),"admission":admitted],uniquingKeysWith:{$1})
        }
        }
        if receipt["mode"] as? String=="owned" {
            let description=try descriptor(receipt),mcp=description["mcp"] as! [String:Any]
            let binary=URL(fileURLWithPath:receipt["binary"] as! String)
            let env=mcp["env"] as! [String:String]
            try manager.createDirectory(at:URL(fileURLWithPath:env["HOME"]!),withIntermediateDirectories:true,attributes:[.posixPermissions:0o700])
            receipt["localProtocol"]=try hooks.probe(binary,mcp["args"] as! [String],state,env)
            receipt["localProtocolVerified"]=true
        }
        try write(receipt,to:receiptURL);return try verify(state:state,binding:binding,pin:pin)
    }
    /// Internal stdio descriptor for bounded local readiness only. Core exposes HTTP after service verification.
    static func descriptor(_ receipt:[String:Any])throws->[String:Any] {
        var result:[String:Any]=["existingCodexConfiguration":receipt["mode"] as? String=="existing","captureEnabled":false,"hooksTrusted":false,"executionVerified":false,"projectScopeRequired":true,"mcp":NSNull()]
        if receipt["mode"] as? String=="owned",let binary=receipt["binary"] as? String,let data=receipt["data"] as? String,let config=receipt["config"] as? String {
            result["mcp"]=["name":"oracle_ai_memory","command":binary,"args":["--data-dir",data,"--config",config,"serve","--transport","stdio","--no-watcher","--workspace","oracle-profile-"+hash(Data(URL(fileURLWithPath:data).deletingLastPathComponent().deletingLastPathComponent().path.utf8)).prefix(16),"--project","vault-"+hash(Data(((receipt["binding"] as? [String:Any])?["vault"] as? String ?? "unselected").utf8)).prefix(16)],"env":environment(home:URL(fileURLWithPath:data).deletingLastPathComponent().appendingPathComponent("execution-home"),data:URL(fileURLWithPath:data))]
        }
        return result
    }
}
