import Foundation
import Darwin

struct AIMemoryServiceHooks {
    var register:(URL,String)throws->Void
    var start:(String)throws->Void
    var stop:(URL,String)throws->Void = {_,_ in throw OracleAIMemoryService.fail("Reconfiguração do serviço exige driver de parada próprio.")}
    /// Returns only a PID whose executable, arguments and listening endpoint match.
    var identity:(String,URL,[String],Int)throws->Int32
    var probe:(URL)throws->[String:Any] = {try OracleAIMemoryServiceHTTP.probe($0)}
}

enum OracleAIMemoryService {
    static let owner="oracle-ai-memory-http-service"
    static func fail(_ text:String)->NSError{OracleAIMemoryProvisioning.error(text)}
    static func locked<T>(_ state:URL,_ body:()throws->T)throws->T {
        try OracleAIMemoryProvisioning.safe(state)
        try FileManager.default.createDirectory(at:state,withIntermediateDirectories:true,attributes:[.posixPermissions:0o700])
        let fd=Darwin.open(state.path,O_RDONLY|O_DIRECTORY|O_NOFOLLOW|O_CLOEXEC)
        guard fd>=0 else{throw fail("Estado do serviço indisponível.")};defer{Darwin.close(fd)}
        guard flock(fd,LOCK_EX|LOCK_NB)==0 else{throw fail("Outra operação do serviço está em andamento.")};defer{flock(fd,LOCK_UN)}
        return try body()
    }
    static func fingerprint(_ runtime:[String:Any])throws->String {
        guard runtime["mode"] as? String=="owned",runtime["runtimePrepared"] as? Bool==true,runtime["localProtocolVerified"] as? Bool==true,
              let binary=runtime["binary"] as? String,let sha=runtime["binarySHA256"] as? String,
              let config=runtime["config"] as? String,let configSHA=runtime["configSHA256"] as? String,
              let binding=runtime["binding"] as? [String:Any],!(binding["vault"] as? String ?? "").isEmpty else{throw fail("Runtime do serviço sem autoria ou vínculo comprovado.")}
        let executable=URL(fileURLWithPath:binary),installation=executable.deletingLastPathComponent().deletingLastPathComponent()
        guard executable.path==installation.appendingPathComponent("runtime/ai-memory").path,
              runtime["data"] as? String==installation.appendingPathComponent("data").path,
              config==installation.appendingPathComponent("data/config.toml").path else{throw fail("Caminhos do serviço não pertencem à instalação própria.")}
        try OracleAIMemoryProvisioning.safe(installation.appendingPathComponent("data"))
        guard OracleAIMemoryProvisioning.hash(try OracleAIMemoryProvisioning.read(URL(fileURLWithPath:binary),limit:80_000_000))==sha,
              OracleAIMemoryProvisioning.hash(try OracleAIMemoryProvisioning.read(URL(fileURLWithPath:config),limit:128_000))==configSHA else{throw fail("Runtime ou configuração do serviço mudou.")}
        return OracleAIMemoryProvisioning.hash(try OracleAIMemoryProvisioning.canonical(runtime))
    }
    static func availablePort()throws->Int {
        let fd=socket(AF_INET,SOCK_STREAM,0);guard fd>=0 else{throw fail("Não foi possível escolher uma porta local.")};defer{Darwin.close(fd)}
        var address=sockaddr_in();address.sin_len=UInt8(MemoryLayout<sockaddr_in>.size);address.sin_family=sa_family_t(AF_INET);address.sin_addr.s_addr=inet_addr("127.0.0.1")
        let bound=withUnsafePointer(to:&address){$0.withMemoryRebound(to:sockaddr.self,capacity:1){Darwin.bind(fd,$0,socklen_t(MemoryLayout<sockaddr_in>.size))}}
        guard bound==0 else{throw fail("Porta local indisponível.")}
        var size=socklen_t(MemoryLayout<sockaddr_in>.size)
        let result=withUnsafeMutablePointer(to:&address){$0.withMemoryRebound(to:sockaddr.self,capacity:1){getsockname(fd,$0,&size)}}
        let port=Int(UInt16(bigEndian:address.sin_port));guard result==0,port>1024,![49374,49375].contains(port) else{throw fail("Porta reservada; tente novamente.")};return port
    }
    static func arguments(runtime:[String:Any],port:Int)->[String] {
        let data=runtime["data"] as! String,binding=runtime["binding"] as! [String:Any]
        return ["--data-dir",data,"--config",runtime["config"] as! String,"serve","--transport","http","--bind","127.0.0.1:\(port)","--no-watcher","--workspace","oracle-profile-"+OracleAIMemoryProvisioning.hash(Data(URL(fileURLWithPath:data).deletingLastPathComponent().path.utf8)).prefix(16),"--project","vault-"+OracleAIMemoryProvisioning.hash(Data((binding["vault"] as! String).utf8)).prefix(16)]
    }
    static func ownership(_ receipt:[String:Any],state:URL,launchAgents:URL)throws {
        let label="com.oraclecompanion.ai-memory."+OracleAIMemoryProvisioning.hash(Data(state.path.utf8)).prefix(20)
        guard receipt["owner"] as? String==owner,receipt["schemaVersion"] as? Int==1,receipt["mode"] as? String=="owned",
              receipt["label"] as? String==String(label),receipt["plist"] as? String==launchAgents.appendingPathComponent(String(label)+".plist").path,
              let encoded=receipt["plistBytes"] as? String,let bytes=Data(base64Encoded:encoded),bytes.count<=128_000,
              OracleAIMemoryProvisioning.hash(bytes)==receipt["plistSHA256"] as? String,
              let document=try PropertyListSerialization.propertyList(from:bytes,options:[],format:nil) as? [String:Any],document["Label"] as? String==String(label),
              Set(document.keys)==Set(["Label","ProgramArguments","EnvironmentVariables","WorkingDirectory","RunAtLoad","KeepAlive","ThrottleInterval","StandardOutPath","StandardErrorPath"]),
              document["RunAtLoad"] as? Bool==true,document["KeepAlive"] as? Bool==true,document["ThrottleInterval"] as? Int==10,
              document["StandardOutPath"] as? String==state.appendingPathComponent("stdout.log").path,document["StandardErrorPath"] as? String==state.appendingPathComponent("stderr.log").path else{throw fail("Autoria ou destino de registro do serviço divergente.")}
        try OracleAIMemoryProvisioning.safe(launchAgents)
        try OracleAIMemoryProvisioning.safe(URL(fileURLWithPath:receipt["plist"] as! String))
    }
    static func prepare(state:URL,runtime:[String:Any],launchAgents:URL,hooks:AIMemoryServiceHooks)throws->[String:Any] {
        if runtime["mode"] as? String=="existing"{return ["mode":"existing","registered":false,"serviceAvailable":false,"mcp":NSNull(),"captureEnabled":false,"hooksTrusted":false,"executionVerified":false]}
        return try locked(state) {
            let fingerprint=try fingerprint(runtime),receiptURL=state.appendingPathComponent("receipt.json"),pending=state.appendingPathComponent("pending.json")
            var receipt:[String:Any]
            if FileManager.default.fileExists(atPath:pending.path){receipt=try OracleAIMemoryProvisioning.object(pending)}
            else if FileManager.default.fileExists(atPath:receiptURL.path){receipt=try OracleAIMemoryProvisioning.object(receiptURL)}
            else {
                let label="com.oraclecompanion.ai-memory."+OracleAIMemoryProvisioning.hash(Data(state.path.utf8)).prefix(20),port=try availablePort()
                let binary=runtime["binary"] as! String,data=URL(fileURLWithPath:runtime["data"] as! String),args=arguments(runtime:runtime,port:port)
                let home=data.deletingLastPathComponent().appendingPathComponent("execution-home")
                try FileManager.default.createDirectory(at:home,withIntermediateDirectories:true,attributes:[.posixPermissions:0o700])
                var env=OracleAIMemoryProvisioning.environment(home:home,data:data);env["AI_MEMORY_BASE_PATH"]="";env["AI_MEMORY_ENABLE_WEB"]="false"
                let plist:[String:Any]=["Label":String(label),"ProgramArguments":[binary]+args,"EnvironmentVariables":env,"WorkingDirectory":home.path,"RunAtLoad":true,"KeepAlive":true,"ThrottleInterval":10,"StandardOutPath":state.appendingPathComponent("stdout.log").path,"StandardErrorPath":state.appendingPathComponent("stderr.log").path]
                let bytes=try PropertyListSerialization.data(fromPropertyList:plist,format:.xml,options:0)
                receipt=["owner":owner,"schemaVersion":1,"mode":"owned","binding":runtime["binding"]!,"runtimeFingerprint":fingerprint,"label":String(label),"port":port,"url":"http://127.0.0.1:\(port)/mcp","plist":launchAgents.appendingPathComponent(String(label)+".plist").path,"plistSHA256":OracleAIMemoryProvisioning.hash(bytes),"plistBytes":bytes.base64EncodedString(),"registered":false,"serviceAvailable":false,"captureEnabled":false,"hooksTrusted":false,"executionVerified":false]
                try OracleAIMemoryProvisioning.write(receipt,to:pending)
            }
            try ownership(receipt,state:state,launchAgents:launchAgents)
            var recordedRuntime=runtime;recordedRuntime["binding"]=receipt["binding"]
            try validate(receipt,runtime:recordedRuntime,fingerprint:self.fingerprint(recordedRuntime))
            // A pending rebind may have replaced the plist, or may still have
            // the committed preimage. Both are admitted only by exact hashes.
            if FileManager.default.fileExists(atPath:pending.path),receipt["runtimeFingerprint"] as? String != fingerprint,
               let previousSHA=receipt["previousPlistSHA256"] as? String {
                let committed=try FileManager.default.fileExists(atPath:receiptURL.path) ? OracleAIMemoryProvisioning.object(receiptURL) : (receipt["previousReceipt"] as? [String:Any] ?? [:])
                try ownership(committed,state:state,launchAgents:launchAgents)
                var committedRuntime=runtime;committedRuntime["binding"]=committed["binding"]
                try validate(committed,runtime:committedRuntime,fingerprint:self.fingerprint(committedRuntime))
                guard previousSHA==committed["plistSHA256"] as? String else{throw fail("Preimagem do journal divergente; preservada.")}
                let plist=URL(fileURLWithPath:receipt["plist"] as! String),current=OracleAIMemoryProvisioning.hash(try OracleAIMemoryProvisioning.read(plist,limit:128_000))
                guard current==previousSHA || current==receipt["plistSHA256"] as? String else{throw fail("Plist editado durante retomada; preservado.")}
                let archive=state.appendingPathComponent("journal-archive")
                try FileManager.default.createDirectory(at:archive,withIntermediateDirectories:true,attributes:[.posixPermissions:0o700]);try OracleAIMemoryProvisioning.safe(archive)
                let journal=try OracleAIMemoryProvisioning.read(pending,limit:128_000)
                let archiveFile=archive.appendingPathComponent(OracleAIMemoryProvisioning.hash(journal)+".json")
                if !FileManager.default.fileExists(atPath:archiveFile.path){try journal.write(to:archiveFile,options:.withoutOverwriting)}
                if current != previousSHA {
                    try hooks.stop(plist,receipt["label"] as! String)
                    guard OracleAIMemoryProvisioning.hash(try OracleAIMemoryProvisioning.read(plist,limit:128_000))==current else{throw fail("Plist mudou durante a parada; preservado.")}
                    try Data(base64Encoded:committed["plistBytes"] as! String)!.write(to:plist,options:.atomic)
                }
                receipt=committed
                try FileManager.default.removeItem(at:pending)
            }
            if receipt["runtimeFingerprint"] as? String != fingerprint,!FileManager.default.fileExists(atPath:receiptURL.path),
               !FileManager.default.fileExists(atPath:receipt["plist"] as! String) {
                // An initial journal has not registered or written a plist.
                // Rebind those exact pending bytes without touching any job.
                var document=try PropertyListSerialization.propertyList(from:Data(base64Encoded:receipt["plistBytes"] as! String)!,options:[],format:nil) as! [String:Any]
                document["ProgramArguments"]=[runtime["binary"] as! String]+arguments(runtime:runtime,port:receipt["port"] as! Int)
                let bytes=try PropertyListSerialization.data(fromPropertyList:document,format:.xml,options:0)
                let archive=state.appendingPathComponent("journal-archive")
                try FileManager.default.createDirectory(at:archive,withIntermediateDirectories:true,attributes:[.posixPermissions:0o700]);try OracleAIMemoryProvisioning.safe(archive)
                let journal=try OracleAIMemoryProvisioning.read(pending,limit:128_000),file=archive.appendingPathComponent(OracleAIMemoryProvisioning.hash(journal)+".json")
                if !FileManager.default.fileExists(atPath:file.path){try journal.write(to:file,options:.withoutOverwriting)}
                receipt["binding"]=runtime["binding"];receipt["runtimeFingerprint"]=fingerprint;receipt["plistSHA256"]=OracleAIMemoryProvisioning.hash(bytes);receipt["plistBytes"]=bytes.base64EncodedString()
                try OracleAIMemoryProvisioning.write(receipt,to:pending)
            }
            if receipt["runtimeFingerprint"] as? String != fingerprint {
                var previous=runtime;previous["binding"]=receipt["binding"]
                guard try self.fingerprint(previous)==receipt["runtimeFingerprint"] as? String,
                      receipt["owner"] as? String==owner else{throw fail("Runtime anterior divergente; serviço preservado.")}
                let oldPlist=URL(fileURLWithPath:receipt["plist"] as! String)
                guard OracleAIMemoryProvisioning.hash(try OracleAIMemoryProvisioning.read(oldPlist,limit:128_000))==receipt["plistSHA256"] as? String else{throw fail("LaunchAgent anterior foi editado; preservado.")}
                try ownership(receipt,state:state,launchAgents:launchAgents)
                try hooks.stop(oldPlist,receipt["label"] as! String)
                guard OracleAIMemoryProvisioning.hash(try OracleAIMemoryProvisioning.read(oldPlist,limit:128_000))==receipt["plistSHA256"] as? String else{throw fail("Plist mudou durante a parada; preservado.")}
                var document=try PropertyListSerialization.propertyList(from:OracleAIMemoryProvisioning.read(oldPlist,limit:128_000),options:[],format:nil) as! [String:Any]
                document["ProgramArguments"]=[runtime["binary"] as! String]+arguments(runtime:runtime,port:receipt["port"] as! Int)
                let bytes=try PropertyListSerialization.data(fromPropertyList:document,format:.xml,options:0)
                receipt["previousReceipt"]=receipt
                receipt["previousPlistSHA256"]=receipt["plistSHA256"]
                receipt["binding"]=runtime["binding"];receipt["runtimeFingerprint"]=fingerprint;receipt["plistBytes"]=bytes.base64EncodedString();receipt["plistSHA256"]=OracleAIMemoryProvisioning.hash(bytes);receipt["registered"]=false;receipt["serviceAvailable"]=false
                // Keep the previous exact bytes in a private receipt before the owned replacement.
                try OracleAIMemoryProvisioning.write(receipt,to:pending)

            }
            try validate(receipt,runtime:runtime,fingerprint:fingerprint)
            let expectedLabel="com.oraclecompanion.ai-memory."+OracleAIMemoryProvisioning.hash(Data(state.path.utf8)).prefix(20)
            guard receipt["label"] as? String==String(expectedLabel),receipt["plist"] as? String==launchAgents.appendingPathComponent(String(expectedLabel)+".plist").path else{throw fail("Destino de registro do serviço divergente.")}
            let plist=URL(fileURLWithPath:receipt["plist"] as! String);try OracleAIMemoryProvisioning.safe(plist)
            if FileManager.default.fileExists(atPath:plist.path) {
                let current=OracleAIMemoryProvisioning.hash(try OracleAIMemoryProvisioning.read(plist,limit:128_000))
                if current != receipt["plistSHA256"] as? String {
                    guard FileManager.default.fileExists(atPath:pending.path),current==receipt["previousPlistSHA256"] as? String,let bytes=Data(base64Encoded:receipt["plistBytes"] as! String) else{throw fail("LaunchAgent existente diverge do recibo. Foi preservado.")}
                    try bytes.write(to:plist,options:.atomic)
                }
            } else {
                guard let bytes=Data(base64Encoded:receipt["plistBytes"] as! String) else{throw fail("Plist do serviço inválido.")}
                try FileManager.default.createDirectory(at:launchAgents,withIntermediateDirectories:true)
                try bytes.write(to:plist,options:.withoutOverwriting);try FileManager.default.setAttributes([.posixPermissions:0o600],ofItemAtPath:plist.path)
            }
            let args=arguments(runtime:runtime,port:receipt["port"] as! Int)
            receipt["workspace"]=args[args.firstIndex(of:"--workspace")!+1];receipt["project"]=args[args.firstIndex(of:"--project")!+1]
            try hooks.register(plist,receipt["label"] as! String)
            receipt.removeValue(forKey:"previousReceipt")
            receipt.removeValue(forKey:"previousPlistSHA256")
            receipt["registered"]=true;receipt["serviceAvailable"]=false
            try OracleAIMemoryProvisioning.write(receipt,to:receiptURL)
            if FileManager.default.fileExists(atPath:pending.path){try FileManager.default.removeItem(at:pending)}
            try hooks.start(receipt["label"] as! String)
            return receipt
        }
    }
    static func validate(_ receipt:[String:Any],runtime:[String:Any],fingerprint:String)throws {
        guard receipt["owner"] as? String==owner,receipt["schemaVersion"] as? Int==1,receipt["runtimeFingerprint"] as? String==fingerprint,
              let binding=receipt["binding"] as? [String:Any],try OracleAIMemoryProvisioning.canonical(binding)==OracleAIMemoryProvisioning.canonical(runtime["binding"] as! [String:Any]),let port=receipt["port"] as? Int,(1025...65535).contains(port),![49374,49375].contains(port),receipt["url"] as? String=="http://127.0.0.1:\(port)/mcp",
              receipt["captureEnabled"] as? Bool==false,receipt["hooksTrusted"] as? Bool==false,receipt["executionVerified"] as? Bool==false,
              let encoded=receipt["plistBytes"] as? String,let bytes=Data(base64Encoded:encoded),
              let document=try PropertyListSerialization.propertyList(from:bytes,options:[],format:nil) as? [String:Any],
              document["ProgramArguments"] as? [String]==[runtime["binary"] as! String]+arguments(runtime:runtime,port:port) else{throw fail("Serviço AI Memory pertence a outro plano/vault ou sofreu alteração.")}
        let data=URL(fileURLWithPath:runtime["data"] as! String),home=data.deletingLastPathComponent().appendingPathComponent("execution-home")
        var expectedEnvironment=OracleAIMemoryProvisioning.environment(home:home,data:data);expectedEnvironment["AI_MEMORY_BASE_PATH"]="";expectedEnvironment["AI_MEMORY_ENABLE_WEB"]="false"
        guard document["EnvironmentVariables"] as? [String:String]==expectedEnvironment,document["WorkingDirectory"] as? String==home.path else{throw fail("Ambiente do serviço divergente; preservado.")}
    }
    static func verify(state:URL,runtime:[String:Any],hooks:AIMemoryServiceHooks)throws->[String:Any] {
        if runtime["mode"] as? String=="existing"{return try prepare(state:state,runtime:runtime,launchAgents:state,hooks:hooks)}
        return try locked(state) {
            var receipt=try OracleAIMemoryProvisioning.object(state.appendingPathComponent("receipt.json"))
            guard let plistPath=receipt["plist"] as? String else{throw fail("Recibo sem destino de serviço.")}
            try ownership(receipt,state:state,launchAgents:URL(fileURLWithPath:plistPath).deletingLastPathComponent())
            try validate(receipt,runtime:runtime,fingerprint:fingerprint(runtime))
            guard receipt["registered"] as? Bool==true,OracleAIMemoryProvisioning.hash(try OracleAIMemoryProvisioning.read(URL(fileURLWithPath:receipt["plist"] as! String),limit:128_000))==receipt["plistSHA256"] as? String else{throw fail("Registro do serviço mudou ou está incompleto.")}
            let label=receipt["label"] as! String,port=receipt["port"] as! Int,binary=URL(fileURLWithPath:runtime["binary"] as! String),args=arguments(runtime:runtime,port:port)
            let pid=try hooks.identity(label,binary,args,port);guard pid>0 else{throw fail("O serviço registrado ainda não está disponível.")}
            let proof=try hooks.probe(URL(string:receipt["url"] as! String)!)
            guard try hooks.identity(label,binary,args,port)==pid,proof["httpProtocolVerified"] as? Bool==true,proof["healthVerified"] as? Bool==true,proof["twoClientsVerified"] as? Bool==true,proof["serverVersion"] as? String==runtime["version"] as? String else{throw fail("Identidade do endpoint AI Memory não foi comprovada.")}
            receipt["protocol"]=proof;receipt["serviceAvailable"]=true;receipt["httpProtocolVerified"]=true
            try OracleAIMemoryProvisioning.write(receipt,to:state.appendingPathComponent("receipt.json"));return receipt
        }
    }
    static func descriptor(_ receipt:[String:Any])throws->[String:Any] {
        if receipt["mode"] as? String=="existing"{return ["existingCodexConfiguration":true,"mcp":NSNull()]}
        guard receipt["serviceAvailable"] as? Bool==true,receipt["httpProtocolVerified"] as? Bool==true,let url=receipt["url"] as? String else{throw fail("HTTP AI Memory ainda não verificado.")}
        return ["existingCodexConfiguration":false,"workspace":receipt["workspace"] ?? "", "project":receipt["project"] ?? "", "mcp":["name":"oracle_ai_memory","url":url],"captureEnabled":false,"hooksTrusted":false,"executionVerified":false]
    }
}
