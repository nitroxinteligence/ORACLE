import Foundation

protocol CodexConnection:AnyObject {
    var onNotification:((String,[String:Any])->Void)? {get set}
    var onRequest:((Any,String,[String:Any])->Void)? {get set}
    var onDisconnect:(()->Void)? {get set}
    var isRunning:Bool {get}
    var version:String {get}
    func start(cwd:URL) throws
    func request(_ method:String,_ params:[String:Any],timeout:Double) throws -> [String:Any]
    func reply(id:Any,result:[String:Any]) throws
    func reject(id:Any)
    func stop()
    func account() throws -> [String:Any]
    func inventory(threadID:String?) -> [String:Any]
}
extension CodexConnection {
    func request(_ method:String,_ params:[String:Any]=[:]) throws -> [String:Any] {try request(method,params,timeout:45)}
}

/// A dedicated public app-server connection. It does not attach to Desktop's private databases,
/// inspect auth.json, or export tokens. Only documented, generated protocol messages cross here.
final class CodexBridge:CodexConnection {
    private let condition=NSCondition(), writer=NSLock()
    private var process:Process?, input:FileHandle?, output:FileHandle?, errors:FileHandle?
    private var buffer=Data(), responses=[Int:[String:Any]](), nextID=0
    var onNotification: ((String,[String:Any])->Void)?
    var onRequest: ((Any,String,[String:Any])->Void)?
    var onDisconnect:(()->Void)?
    private(set) var version=""
    var isRunning:Bool { process?.isRunning == true }
    static func executable() throws -> URL {
        let home=FileManager.default.homeDirectoryForCurrentUser
        // Prefer the Desktop version: an unrelated npm CLI may lag its config schema.
        let candidates=["/Applications/Codex.app/Contents/Resources/codex","/Applications/ChatGPT.app/Contents/Resources/codex",home.appendingPathComponent("Applications/Codex.app/Contents/Resources/codex").path,home.appendingPathComponent(".npm-global/bin/codex").path,"/opt/homebrew/bin/codex","/usr/local/bin/codex"]
        guard let path=candidates.first(where:{fm.isExecutableFile(atPath:$0)}) else {throw failure("Instale o Codex para continuar e tente conectar novamente.")};return URL(fileURLWithPath:path)
    }
    func start(cwd:URL) throws {
        if isRunning {return}
        let p=Process(),stdin=Pipe(),stdout=Pipe(),stderr=Pipe()
        p.executableURL=try Self.executable();p.arguments=["app-server","--stdio"];p.currentDirectoryURL=cwd
        // Codex owns its normal login and configuration. API credentials are not passed through.
        p.environment=["HOME":fm.homeDirectoryForCurrentUser.path,"PATH":"/opt/homebrew/bin:/usr/local/bin:/usr/bin:/bin:/usr/sbin:/sbin","LANG":"en_US.UTF-8","TERM":"dumb"]
        p.standardInput=stdin;p.standardOutput=stdout;p.standardError=stderr
        process=p;input=stdin.fileHandleForWriting;output=stdout.fileHandleForReading;errors=stderr.fileHandleForReading
        stdout.fileHandleForReading.readabilityHandler={ [weak self] h in self?.consume(h.availableData) }
        stderr.fileHandleForReading.readabilityHandler={ h in _=h.availableData } // Never store credentials or full engine output.
        p.terminationHandler={ [weak self] _ in guard let self else{return};self.condition.lock();self.condition.broadcast();self.condition.unlock();self.onDisconnect?() }
        try p.run()
        let result=try request("initialize",["clientInfo":["name":"oracle_companion","title":"Oracle","version":"0.3.0"],"capabilities":["experimentalApi":true]])
        version=result["userAgent"] as? String ?? "Codex";try write(["method":"initialized"])
    }
    private func consume(_ data:Data) {
        guard !data.isEmpty else{return}
        condition.lock();buffer.append(data)
        if buffer.count>16_000_000 { buffer.removeAll();condition.unlock();process?.terminate();return }
        var messages=[[String:Any]]()
        while let end=buffer.firstIndex(of:10) {
            let line=Data(buffer[..<end]);buffer.removeSubrange(...end)
            if let obj=try? JSONSerialization.jsonObject(with:line) as? [String:Any] {messages.append(obj)}
        }
        condition.unlock()
        for msg in messages {
            if let method=msg["method"] as? String {
                let params=msg["params"] as? [String:Any] ?? [:]
                if let id=msg["id"] {onRequest?(id,method,params)} else {onNotification?(method,params)}
            } else if let id=msg["id"] as? Int {condition.lock();responses[id]=msg;condition.broadcast();condition.unlock()}
        }
    }
    func write(_ object:[String:Any]) throws {
        let data=try JSONSerialization.data(withJSONObject:object)+Data([10]);writer.lock();defer{writer.unlock()}
        guard isRunning,let input else{throw failure("Conexão com Codex interrompida. Reconecte para continuar.")};try input.write(contentsOf:data)
    }
    func request(_ method:String,_ params:[String:Any]=[:],timeout:Double=45) throws -> [String:Any] {
        condition.lock();nextID+=1;let id=nextID;condition.unlock()
        try write(["id":id,"method":method,"params":params]);let deadline=Date().addingTimeInterval(timeout)
        condition.lock();defer{condition.unlock()}
        while responses[id]==nil && isRunning {if !condition.wait(until:deadline){break}}
        guard let response=responses.removeValue(forKey:id) else{throw failure("Codex não respondeu a tempo. A conexão pode ser retomada.")}
        if let error=response["error"] as? [String:Any] {throw failure("Codex: \((error["message"] as? String ?? "operação indisponível").prefix(700))")}
        return response["result"] as? [String:Any] ?? [:]
    }
    func reply(id:Any,result:[String:Any]) throws {try write(["id":id,"result":result])}
    func reject(id:Any) {try? write(["id":id,"error":["code":-32601,"message":"This Oracle client does not support this request."]])}
    func stop() {
        onDisconnect=nil;onNotification=nil;onRequest=nil
        output?.readabilityHandler=nil;errors?.readabilityHandler=nil
        try? input?.close();if isRunning{process?.terminate()}
        condition.lock();responses.removeAll();condition.broadcast();condition.unlock()
    }
    deinit{stop()}
    func account() throws -> [String:Any] {
        let result=try request("account/read",["refreshToken":false]);let a=result["account"] as? [String:Any]
        return ["connected":a?["type"] as? String=="chatgpt","status":a?["type"] as? String=="chatgpt" ? "connected" : "needs_auth"]
    }
    func inventory(threadID:String?=nil) -> [String:Any] {
        var apps=[[String:Any]](),servers=[[String:Any]](),packages=[[String:Any]](),runtime=[[String:Any]](),issues=[String]()
        func paged(_ method:String,_ extra:[String:Any]) throws -> [[String:Any]] {
            var rows=[[String:Any]](),cursor:String?,seen=Set<String>()
            repeat {var p=extra;p["limit"]=100;if let cursor{p["cursor"]=cursor};let r=try request(method,p,timeout:60);rows += r["data"] as? [[String:Any]] ?? [];cursor=r["nextCursor"] as? String
                if let cursor {guard seen.insert(cursor).inserted,seen.count<50 else{throw failure("Catálogo Codex retornou paginação inconsistente.")}}
            } while cursor != nil
            return rows
        }
        do {
            var p:[String:Any]=["forceRefresh":true];if let threadID{p["threadId"]=threadID}
            runtime=try request("app/installed",p,timeout:60)["apps"] as? [[String:Any]] ?? []
            let ids=runtime.compactMap{$0["id"] as? String}
            for start in stride(from:0,to:ids.count,by:100) {
                let metadata=try request("app/read",["appIds":Array(ids[start..<min(start+100,ids.count)])])["apps"] as? [[String:Any]] ?? []
                apps += metadata.map { row in var a=row;let r=runtime.first{$0["id"] as? String==row["id"] as? String};a["isEnabled"]=r?["enabled"] ?? false;a["isAccessible"]=true;return a }
            }
            // Runtime names remain useful if metadata is temporarily absent.
            for r in runtime where !apps.contains(where:{$0["id"] as? String==r["id"] as? String}) {
                apps.append(["id":r["id"] ?? "","name":r["runtimeName"] ?? r["id"] ?? "Plugin","isEnabled":r["enabled"] ?? false,"isAccessible":true])
            }
        }catch{issues.append("Conexões de apps não verificadas")}
        do{let result=try request("plugin/installed");packages=(result["marketplaces"] as? [[String:Any]] ?? []).flatMap{$0["plugins"] as? [[String:Any]] ?? []};if !(result["marketplaceLoadErrors"] as? [Any] ?? []).isEmpty{issues.append("Parte dos plugins indisponível")}}catch{issues.append("Plugins indisponíveis")}
        do{var p:[String:Any]=[:];if let threadID{p["threadId"]=threadID};servers=try paged("mcpServerStatus/list",p)}catch{issues.append("Conexões locais não verificadas")}
        return PluginIconLoader.decorate(Self.projectInventory(apps:apps,runtime:runtime,packages:packages,servers:servers,issues:issues))
    }
    static func projectInventory(apps:[[String:Any]],runtime:[[String:Any]],packages:[[String:Any]],servers:[[String:Any]],issues:[String]=[]) -> [String:Any] {
        var rows=[[String:Any]](),claimed=Set<String>()
        for app in apps where app["isAccessible"] as? Bool==true || runtime.contains(where:{$0["id"] as? String==app["id"] as? String}) {
            guard let id=app["id"] as? String,let name=app["name"] as? String else{continue}
            let live=runtime.first{$0["id"] as? String==id},enabled=app["isEnabled"] as? Bool==true
            let connected=enabled && live?["enabled"] as? Bool==true && live?["callable"] as? Bool==true
            let status=connected ? "connected" : !enabled ? "unavailable" : app["isAccessible"] as? Bool==false ? "needs_auth" : "installed"
            let displayNames=app["pluginDisplayNames"] as? [String] ?? [];claimed.formUnion(displayNames)
            var row:[String:Any]=["id":id,"name":name,"kind":"app","status":status,"detail":connected ? "Ferramentas disponíveis no Codex" : "Conexão ainda não confirmada","evidence":connected ? "app/installed.enabled+callable" : "app/list","iconURL":app["iconUrlDark"] ?? app["iconUrl"] ?? NSNull()]
            if let plugin=packages.first(where:{p in let ui=p["interface"] as? [String:Any] ?? [:];return displayNames.contains(ui["displayName"] as? String ?? "") || ui["displayName"] as? String==name}),let ui=plugin["interface"] as? [String:Any]{row["iconURL"]=ui["logoUrlDark"] ?? ui["logoUrl"] ?? row["iconURL"];if let icon=localIcon(ui["logoDark"] as? String ?? ui["logo"] as? String ?? ui["composerIcon"] as? String){row["iconDataURL"]=icon}}
            rows.append(row)
        }
        for plugin in packages where plugin["installed"] as? Bool==true {
            guard let id=plugin["id"] as? String else{continue};let ui=plugin["interface"] as? [String:Any] ?? [:];let name=ui["displayName"] as? String ?? plugin["name"] as? String ?? id
            if claimed.contains(name){continue}
            let linked=servers.filter{$0["pluginId"] as? String==id},enabled=plugin["enabled"] as? Bool==true
            let connected=enabled && linked.contains{$0["runtimeStatus"] as? String=="connected" && !($0["tools"] as? [String:Any] ?? [:]).isEmpty}
            let needsAuth=linked.contains{$0["runtimeStatus"] as? String=="authenticationRequired"}
            var row:[String:Any]=["id":id,"name":name,"kind":"plugin","status":connected ? "connected" : !enabled ? "unavailable" : needsAuth ? "needs_auth" : "installed","detail":connected ? "Conexão ativa no Codex" : enabled ? "Instalado no Codex" : "Desativado no Codex","evidence":connected ? "mcpServerStatus.runtimeStatus+tools" : "plugin/installed"]
            row["iconURL"]=ui["logoUrlDark"] ?? ui["logoUrl"]
            if let data=localIcon(ui["logoDark"] as? String ?? ui["logo"] as? String ?? ui["composerIcon"] as? String){row["iconDataURL"]=data}
            rows.append(row)
        }
        return ["status":rows.isEmpty && !issues.isEmpty ? "unavailable" : "available","checkedAt":ISO8601DateFormatter().string(from:Date()),"plugins":rows.sorted{($0["name"] as! String)<($1["name"] as! String)},"reason":issues.joined(separator:". "),"scope":"Conexão Oracle ao Codex; presença de pacote não comprova autorização"]
    }
    private static func localIcon(_ path:String?)->String? {
        guard let path,path.hasPrefix(fm.homeDirectoryForCurrentUser.appendingPathComponent(".codex/plugins/").path),["png","jpg","jpeg","webp"].contains(URL(fileURLWithPath:path).pathExtension.lowercased()),let data=try? Data(contentsOf:URL(fileURLWithPath:path)),data.count<200_000 else{return nil}
        let ext=URL(fileURLWithPath:path).pathExtension.lowercased();return "data:image/\(ext=="jpg" ? "jpeg" : ext);base64,"+data.base64EncodedString()
    }
}
