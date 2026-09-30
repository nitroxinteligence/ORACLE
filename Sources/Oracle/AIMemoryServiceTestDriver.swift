import Foundation
import Darwin

/// Explicitly gated synthetic LaunchAgent adapter. HTTP is served by an owned
/// real child; this adapter never invokes launchctl or registers a system job.
enum OracleAIMemoryServiceTestDriver {
    private struct Entry {var profile:URL;var label:String;var args:[String];var environment:[String:String];var cwd:URL;var child:Process?}
    private static let lock=NSRecursiveLock()
    private static var entries=[String:Entry]()
    private static func inside(_ url:URL,_ root:URL)throws {
        try OracleAIMemoryProvisioning.safe(url)
        guard url.path.hasPrefix(root.path+"/") else{throw OracleAIMemoryService.fail("Driver sintético fora do perfil autorizado.")}
    }
    private static func terminate(_ child:Process?) {
        guard let p=child,p.isRunning else{return};p.terminate()
        let end=Date().addingTimeInterval(2);while p.isRunning,Date()<end{Thread.sleep(forTimeInterval:0.01)}
        if p.isRunning{kill(p.processIdentifier,SIGKILL)}
        let killed=Date().addingTimeInterval(2);while p.isRunning,Date()<killed{Thread.sleep(forTimeInterval:0.01)}
    }
    static func cleanup(profile:URL) {
        lock.lock();defer{lock.unlock()}
        for key in Array(entries.keys) where entries[key]?.profile.path==profile.path {terminate(entries[key]?.child);entries.removeValue(forKey:key)}
    }
    static func hooksIfAllowed(profile:URL,state:URL)throws->AIMemoryServiceHooks? {
        let env=ProcessInfo.processInfo.environment
        guard env["ORACLE_AI_MEMORY_SERVICE_TEST"] != nil else{return nil}
        let args=CommandLine.arguments
        guard env["ORACLE_AI_MEMORY_SERVICE_TEST"]=="1",args.filter({$0=="--self-test-distribution"}).count==1,
              !args.contains(where:{$0.hasPrefix("--self-test") && $0 != "--self-test-distribution"}),
              let rootPath=env["ORACLE_TEST_ROOT"],rootPath.hasPrefix("/"),rootPath.split(separator:"/").contains(".work") else{throw OracleAIMemoryService.fail("Driver AI Memory exige self-test-distribution isolado explícito.")}
        let root=URL(fileURLWithPath:rootPath);try OracleAIMemoryProvisioning.safe(root);try inside(profile,root);try inside(state,profile)
        let agents=profile.appendingPathComponent("host-fixture/Library/LaunchAgents")
        func registered(_ plist:URL,_ label:String)throws->Entry {
            try inside(plist,agents)
            guard plist.path==agents.appendingPathComponent(label+".plist").path,label=="com.oraclecompanion.ai-memory."+OracleAIMemoryProvisioning.hash(Data(state.path.utf8)).prefix(20),
                  let doc=try PropertyListSerialization.propertyList(from:OracleAIMemoryProvisioning.read(plist,limit:128_000),options:[],format:nil) as? [String:Any],doc["Label"] as? String==label,
                  let argv=doc["ProgramArguments"] as? [String],argv.count==15,
                  argv[1]=="--data-dir",argv[3]=="--config",argv[5]=="serve",argv[6]=="--transport",argv[7]=="http",argv[8]=="--bind",argv[9].hasPrefix("127.0.0.1:"),argv[10]=="--no-watcher",argv[11]=="--workspace",argv[12].hasPrefix("oracle-profile-"),argv[13]=="--project",argv[14].hasPrefix("vault-"),
                  let port=Int(argv[9].dropFirst("127.0.0.1:".count)),(1025...65535).contains(port),![49374,49375].contains(port),
                  let environment=doc["EnvironmentVariables"] as? [String:String],let cwdPath=doc["WorkingDirectory"] as? String,let home=environment["HOME"] else{throw OracleAIMemoryService.fail("Plist sintético inválido.")}
            for path in [argv[0],argv[2],argv[4],cwdPath,home] {try inside(URL(fileURLWithPath:path),profile)}
            let expected=OracleAIMemoryProvisioning.environment(home:URL(fileURLWithPath:home),data:URL(fileURLWithPath:argv[2]))
            guard expected.allSatisfy({environment[$0.key]==$0.value}),Set(environment.keys).subtracting(expected.keys).isSubset(of:["AI_MEMORY_BASE_PATH","AI_MEMORY_ENABLE_WEB"]),environment["AI_MEMORY_BASE_PATH"] ?? ""=="",environment["AI_MEMORY_ENABLE_WEB"] ?? "false"=="false" else{throw OracleAIMemoryService.fail("Ambiente sintético contém capacidade externa não autorizada.")}
            return Entry(profile:profile,label:label,args:argv,environment:environment,cwd:URL(fileURLWithPath:cwdPath),child:nil)
        }
        return AIMemoryServiceHooks(register:{plist,label in
            lock.lock();defer{lock.unlock()};let next=try registered(plist,label)
            if let old=entries[state.path],old.child?.isRunning==true {
                guard old.label==label,old.args==next.args,old.environment==next.environment,try OracleAIMemoryServiceProcess.arguments(pid:old.child!.processIdentifier)==old.args else{throw OracleAIMemoryService.fail("Processo sintético já ativo com outra identidade.")};return
            };entries[state.path]=next
        },start:{label in
            lock.lock();defer{lock.unlock()};guard var entry=entries[state.path],entry.label==label else{throw OracleAIMemoryService.fail("Driver sem registro próprio.")}
            if entry.child?.isRunning==true{return}
            let p=Process();p.executableURL=URL(fileURLWithPath:entry.args[0]);p.arguments=Array(entry.args.dropFirst());p.environment=entry.environment;p.currentDirectoryURL=entry.cwd;p.standardOutput=FileHandle.nullDevice;p.standardError=FileHandle.nullDevice
            try p.run();entry.child=p;entries[state.path]=entry
        },stop:{plist,label in
            lock.lock();defer{lock.unlock()};let validated=try registered(plist,label)
            guard let entry=entries[state.path] else{return}
            guard entry.label==label,entry.args==validated.args else{throw OracleAIMemoryService.fail("Parada recusada para processo divergente.")}
            if let p=entry.child,p.isRunning{guard try OracleAIMemoryServiceProcess.arguments(pid:p.processIdentifier)==entry.args else{throw OracleAIMemoryService.fail("PID sintético divergiu.")}}
            terminate(entry.child);entries.removeValue(forKey:state.path)
        },identity:{label,binary,args,port in
            let end=Date().addingTimeInterval(20)
            repeat {
                lock.lock();let entry=entries[state.path];lock.unlock()
                guard let entry,entry.label==label,entry.args==[binary.path]+args,let p=entry.child,p.isRunning,try OracleAIMemoryServiceProcess.arguments(pid:p.processIdentifier)==entry.args else{throw OracleAIMemoryService.fail("Identidade do filho sintético divergente.")}
                if let listening=try? OracleAIMemoryServiceProcess.run("/usr/sbin/lsof",["-nP","-a","-p",String(p.processIdentifier),"-iTCP:\(port)","-sTCP:LISTEN","-Fn"]),listening.contains("n127.0.0.1:\(port)"){return p.processIdentifier}
                Thread.sleep(forTimeInterval:0.1)
            } while Date()<end
            throw OracleAIMemoryService.fail("Filho sintético não abriu endpoint próprio.")
        })
    }
}
