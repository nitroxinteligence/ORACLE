import Foundation
import Darwin

enum OracleAIMemoryServiceProcess {
    static func run(_ binary:String,_ args:[String],timeout:Double=10)throws->String {
        let p=Process(),out=Pipe(),err=Pipe();p.executableURL=URL(fileURLWithPath:binary);p.arguments=args
        p.environment=["PATH":"/usr/bin:/bin:/usr/sbin:/sbin","LANG":"en_US.UTF-8"]
        p.standardOutput=out;p.standardError=err
        let fd=out.fileHandleForReading.fileDescriptor,ef=err.fileHandleForReading.fileDescriptor
        _=fcntl(fd,F_SETFL,O_NONBLOCK);_=fcntl(ef,F_SETFL,O_NONBLOCK)
        try p.run();defer{if p.isRunning{p.terminate();let deadline=Date().addingTimeInterval(1);while p.isRunning,Date()<deadline{Thread.sleep(forTimeInterval:0.01)};if p.isRunning{kill(p.processIdentifier,SIGKILL)}};try? out.fileHandleForReading.close();try? err.fileHandleForReading.close()}
        var bytes=Data(),errors=Data(),buffer=[UInt8](repeating:0,count:32_768);let end=Date().addingTimeInterval(timeout)
        repeat {
            let n=Darwin.read(fd,&buffer,buffer.count);if n>0{bytes.append(contentsOf:buffer.prefix(n))}
            let e=Darwin.read(ef,&buffer,buffer.count);if e>0{errors.append(contentsOf:buffer.prefix(e))}
            guard bytes.count<=2_000_000,errors.count<=128_000,Date()<end else{throw OracleAIMemoryService.fail("Processo de serviço excedeu limite ou prazo.")}
            if !p.isRunning,n<=0,e<=0{break};Thread.sleep(forTimeInterval:0.01)
        } while true
        guard p.terminationStatus==0 else{throw OracleAIMemoryService.fail("Comando do serviço falhou: "+String(decoding:errors.suffix(1_000),as:UTF8.self))}
        return String(decoding:bytes,as:UTF8.self)
    }
    static func arguments(pid:Int32)throws->[String] {
        var mib:[Int32]=[CTL_KERN,KERN_PROCARGS2,pid],size=0
        guard sysctl(&mib,3,nil,&size,nil,0)==0,size>4,size<=2_000_000 else{throw OracleAIMemoryService.fail("Argumentos do PID indisponíveis.")}
        var bytes=[UInt8](repeating:0,count:size)
        guard sysctl(&mib,3,&bytes,&size,nil,0)==0 else{throw OracleAIMemoryService.fail("PID mudou durante a conferência.")}
        let argc=bytes.withUnsafeBytes{$0.loadUnaligned(as:Int32.self)}
        guard argc>0,argc<=128 else{throw OracleAIMemoryService.fail("Argumentos do PID fora dos limites.")}
        var offset=4
        func string()throws->String {guard offset<size,let end=bytes[offset..<size].firstIndex(of:0),let value=String(bytes:bytes[offset..<end],encoding:.utf8) else{throw OracleAIMemoryService.fail("Argumentos do PID inválidos.")};offset=end+1;return value}
        let executable=try string()
        while offset<size,bytes[offset]==0{offset+=1}
        var argv=[String]();for _ in 0..<argc{argv.append(try string())}
        guard argv.first==executable else{throw OracleAIMemoryService.fail("Executável e argv do PID divergem.")}
        return argv
    }
    static func nativeHooks(profile:URL)->AIMemoryServiceHooks {
        let domain="gui/\(getuid())"
        func loaded(_ label:String)->String? {try? run("/bin/launchctl",["print",domain+"/"+label])}
        func pid(_ label:String)throws->Int32 {
            guard let text=loaded(label),let line=text.split(separator:"\n").first(where:{$0.trimmingCharacters(in:.whitespaces).hasPrefix("pid = ")}),let value=Int32(line.split(separator:"=").last!.trimmingCharacters(in:.whitespaces)),value>0 else{throw OracleAIMemoryService.fail("LaunchAgent sem processo ativo.")};return value
        }
        return AIMemoryServiceHooks(register:{plist,label in
            if loaded(label) != nil {
                let document=try PropertyListSerialization.propertyList(from:OracleAIMemoryProvisioning.read(plist,limit:128_000),options:[],format:nil) as! [String:Any]
                let args=document["ProgramArguments"] as! [String]
                if let current=try? pid(label) {
                let command=try arguments(pid:current)
                guard command==args else{throw OracleAIMemoryService.fail("Label já carregado por processo diferente. Preservado.")}
                } else {
                    guard let description=loaded(label),description.split(separator:"\n").map({$0.trimmingCharacters(in:.whitespaces)}).contains("program = "+args[0]),let begin=description.range(of:"arguments = {"),let end=description[begin.upperBound...].range(of:"}") else{throw OracleAIMemoryService.fail("Registro carregado não corresponde ao plist próprio.")}
                    let loadedArgs=description[begin.upperBound..<end.lowerBound].split(separator:"\n").map{$0.trimmingCharacters(in:.whitespaces)}.filter{!$0.isEmpty}
                    guard loadedArgs==args else{throw OracleAIMemoryService.fail("Registro carregado não corresponde ao plist próprio.")}
                }
            } else{_=try run("/bin/launchctl",["bootstrap",domain,plist.path])}
        },start:{label in
            // bootstrap/RunAtLoad starts a new daemon; kickstart without -k
            // never kills an already running process.
            _=try run("/bin/launchctl",["kickstart",domain+"/"+label])
        },stop:{plist,label in
            // register validates any loaded PID or its loaded arguments first.
            if loaded(label)==nil{return}
            let hooks=nativeHooks(profile:profile)
            try hooks.register(plist,label)
            _=try run("/bin/launchctl",["bootout",domain+"/"+label])
        },identity:{label,binary,args,port in
            let deadline=Date().addingTimeInterval(20)
            repeat {
                if let current=try? pid(label),let command=try? arguments(pid:current),command==[binary.path]+args,
                   let listening=try? run("/usr/sbin/lsof",["-nP","-a","-p",String(current),"-iTCP:\(port)","-sTCP:LISTEN","-Fn"]),listening.contains("n127.0.0.1:\(port)") {return current}
                Thread.sleep(forTimeInterval:0.1)
            } while Date()<deadline
            throw OracleAIMemoryService.fail("PID, executável e endpoint do serviço não coincidem.")
        })
    }
}

enum OracleAIMemoryServiceHTTP {
    static func request(_ url:URL,_ body:[String:Any]?=nil)throws->[String:Any] {
        guard url.host=="127.0.0.1",url.scheme=="http" else{throw OracleAIMemoryService.fail("Endpoint não local.")}
        var args=["--disable","--silent","--show-error","--fail","--noproxy","*","--connect-timeout","2","--max-time","8","--max-filesize","1500000","-H","Accept: application/json, text/event-stream"]
        if let body{args += ["-H","Content-Type: application/json","--data-binary",String(decoding:try OracleAIMemoryProvisioning.canonical(body),as:UTF8.self)]}
        args.append(url.absoluteString)
        let text=try OracleAIMemoryServiceProcess.run("/usr/bin/curl",args)
        guard let document=try JSONSerialization.jsonObject(with:Data(text.utf8)) as? [String:Any] else{throw OracleAIMemoryService.fail("Resposta HTTP inválida.")};return document
    }
    static func probe(_ url:URL)throws->[String:Any] {
        let health=url.deletingLastPathComponent().appendingPathComponent("healthz")
        guard try request(health)["status"] as? String=="ok" else{throw OracleAIMemoryService.fail("AI Memory não respondeu healthz.")}
        var inventories=[[String]](),versions=[String]()
        for client in 1...2 {
            let initialized=try request(url,["jsonrpc":"2.0","id":client*10,"method":"initialize","params":["protocolVersion":"2024-11-05","capabilities":[:],"clientInfo":["name":"oracle-readiness-\(client)","version":"1"]]])
            guard initialized["error"]==nil,let result=initialized["result"] as? [String:Any],let server=result["serverInfo"] as? [String:Any],let version=server["version"] as? String else{throw OracleAIMemoryService.fail("Handshake HTTP MCP incompleto.")}
            let listed=try request(url,["jsonrpc":"2.0","id":client*10+1,"method":"tools/list","params":[:]])
            guard listed["error"]==nil,let content=listed["result"] as? [String:Any],let tools=content["tools"] as? [[String:Any]],tools.count<=256 else{throw OracleAIMemoryService.fail("Inventário HTTP MCP inválido.")}
            let names=tools.compactMap{$0["name"] as? String}.sorted();guard names.count==tools.count,names.contains("memory_query") else{throw OracleAIMemoryService.fail("memory_query indisponível.")}
            inventories.append(names);versions.append(version)
        }
        guard versions[0]==versions[1],inventories[0]==inventories[1] else{throw OracleAIMemoryService.fail("Clientes MCP receberam identidades diferentes.")}
        return ["healthVerified":true,"httpProtocolVerified":true,"twoClientsVerified":true,"serverVersion":versions[0],"tools":inventories[0]]
    }
}
