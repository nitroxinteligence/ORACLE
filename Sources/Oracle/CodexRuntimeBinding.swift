import Foundation
import CryptoKit
import Darwin

/// Direct paths deliberately avoid a second installation or a launcher selecting
/// another build. Same-location updates and relocation require explicit reprepare.
enum OracleCodexRuntimeBinding {
    static let hookEvents = ["SessionStart","UserPromptSubmit","PreToolUse","PostToolUse","Stop","SessionEnd","SubagentStart","SubagentStop"]
    static func error(_ message:String)->NSError {NSError(domain:"Oracle.RuntimeBinding",code:1,userInfo:[NSLocalizedDescriptionKey:message])}
    static func quote(_ text:String)->String {"'"+text.replacingOccurrences(of:"'",with:"'\\''")+"'"}
    static func hookCommand(executable:String,state:String)->String {quote(executable)+" --state "+quote(state)+" --hook"}
    static func validHash(_ value:String)->Bool {value.range(of:"^[a-f0-9]{64}$",options:.regularExpression) != nil}
    private static let cacheLock=NSLock()
    private static var hashCache=[String:(String,String)]()
    static func invalidateCache() {cacheLock.lock();hashCache.removeAll();cacheLock.unlock()}
    private static func fingerprint(_ url:URL)throws->String {
        var value=stat()
        guard lstat(url.path,&value)==0 else {throw error("Um alvo do runtime foi removido. Prepare novamente a ponte.")}
        return "\(value.st_dev):\(value.st_ino):\(value.st_size):\(value.st_mode):\(value.st_mtimespec.tv_sec):\(value.st_mtimespec.tv_nsec):\(value.st_ctimespec.tv_sec):\(value.st_ctimespec.tv_nsec)"
    }
    static func hash(_ url:URL)throws->String {
        let stamp=try fingerprint(url)
        cacheLock.lock();let cached=hashCache[url.path];cacheLock.unlock()
        if let cached,cached.0==stamp {return cached.1}
        let file=try FileHandle(forReadingFrom:url);defer{try? file.close()}
        var hash=SHA256()
        while let data=try file.read(upToCount:1_048_576),!data.isEmpty {hash.update(data:data)}
        guard try fingerprint(url)==stamp else {throw error("O runtime mudou durante a verificação. Tente novamente.")}
        let result=hash.finalize().map{String(format:"%02x",$0)}.joined()
        cacheLock.lock()
        // Full plugin generations include resource files. Fingerprints still check
        // every lookup; bounded metadata avoids rehashing hundreds of MB on status.
        if hashCache.count>30_000 {hashCache.removeAll()}
        hashCache[url.path]=(stamp,result);cacheLock.unlock()
        return result
    }
    static func existing(_ url:URL,directory:Bool=false,executable:Bool=false)throws {
        guard url.isFileURL,url.path==url.standardizedFileURL.path,
              url.resolvingSymlinksInPath().path==url.path else {throw error("O runtime contém um caminho indireto. Reprepare a ponte a partir da instalação durável.")}
        guard let value=try? url.resourceValues(forKeys:[.isRegularFileKey,.isDirectoryKey,.isSymbolicLinkKey]) else {throw error("Um alvo do runtime está ausente. Instale o Oracle em Aplicativos e prepare novamente a ponte.")}
        guard value.isSymbolicLink != true,(directory ? value.isDirectory==true : value.isRegularFile==true),
              !executable || FileManager.default.isExecutableFile(atPath:url.path) else {throw error("Um alvo do runtime está ausente ou não é executável. Instale o Oracle em Aplicativos e prepare novamente a ponte.")}
    }
    static func prepare(bundle:URL,oracle:URL,adapter:URL,installationRoots:[URL],signature:(URL)throws->String)throws->[String:Any] {
        invalidateCache()
        let bundle=bundle.standardizedFileURL
        guard bundle.pathExtension=="app",installationRoots.contains(where:{bundle.path.hasPrefix($0.standardizedFileURL.path+"/")}),
              (!bundle.pathComponents.contains(".work") || installationRoots.allSatisfy{$0.pathComponents.contains(".work")}),!bundle.pathComponents.contains("AppTranslocation") else {
            throw error("O Oracle está em um build temporário. Instale este aplicativo em Aplicativos antes de preparar a conexão Codex.")
        }
        try existing(bundle,directory:true)
        let expectedOracle=bundle.appendingPathComponent("Contents/MacOS/Oracle")
        let expectedAdapter=bundle.appendingPathComponent("Contents/Resources/engine/oracle-gbrain-read")
        guard oracle.path==expectedOracle.path,adapter.path==expectedAdapter.path else {throw error("Os alvos não pertencem ao aplicativo Oracle atual.")}
        try existing(oracle,executable:true);try existing(adapter,executable:true)
        let infoURL=bundle.appendingPathComponent("Contents/Info.plist"),manifestURL=bundle.appendingPathComponent("Contents/Resources/build-manifest.json")
        try existing(infoURL);try existing(manifestURL)
        for url in [infoURL,manifestURL] {guard (try url.resourceValues(forKeys:[.fileSizeKey]).fileSize ?? Int.max)<=262_144 else {throw error("A proveniência do runtime excede o limite de leitura.")}}
        let info=try PropertyListSerialization.propertyList(from:Data(contentsOf:infoURL),options:[],format:nil) as? [String:Any]
        let manifest=try JSONSerialization.jsonObject(with:Data(contentsOf:manifestURL)) as? [String:Any]
        guard info?["CFBundleIdentifier"] as? String=="com.oraclecompanion.macos",info?["CFBundleExecutable"] as? String=="Oracle",
              let version=info?["CFBundleShortVersionString"] as? String,!version.isEmpty,
              manifest?["product"] as? String=="oracle-macos",manifest?["version"] as? String==version,
              let commit=manifest?["commit"] as? String,commit.range(of:"^[a-f0-9]{40}$",options:.regularExpression) != nil,
              manifest?["dirty"] is Bool else {throw error("A identidade ou proveniência do runtime Oracle não é válida.")}
        let classification=try signature(bundle)
        guard ["developer_ad_hoc","developer_id","test_fixture"].contains(classification) else {throw error("A assinatura do runtime Oracle não foi verificada.")}
        return ["schema_version":1,"mode":"direct_durable","bundle":bundle.path,"oracle":oracle.path,"adapter":adapter.path,
                "oracle_sha256":try hash(oracle),"adapter_sha256":try hash(adapter),"manifest_sha256":try hash(manifestURL),
                "info_sha256":try hash(infoURL),"version":version,"commit":commit,"signature":classification,"notarization_verified":false]
    }
    static func verify(binding:[String:Any],hooks:[String:Any],mcp:String?,state:String)throws->[String:String] {
        guard binding["schema_version"] as? Int==1,binding["mode"] as? String=="direct_durable",
              let classification=binding["signature"] as? String,["developer_ad_hoc","developer_id","test_fixture"].contains(classification),
              let bundle=binding["bundle"] as? String,let oracle=binding["oracle"] as? String,let adapter=binding["adapter"] as? String,
              oracle==bundle+"/Contents/MacOS/Oracle",adapter==bundle+"/Contents/Resources/engine/oracle-gbrain-read" else {throw error("Vínculo de runtime ausente. Prepare novamente a ponte a partir do Oracle instalado em Aplicativos.")}
        guard classification=="test_fixture" || (!URL(fileURLWithPath:bundle).pathComponents.contains(".work") && !URL(fileURLWithPath:bundle).pathComponents.contains("AppTranslocation")) else {throw error("Runtime temporário não pode manter uma conexão durável.")}
        if binding["plugin_generation"] != nil {try OracleDesktopPluginRuntime.verify(binding:binding,state:state)}
        try existing(URL(fileURLWithPath:bundle),directory:true)
        for (path,key,executable) in [(oracle,"oracle_sha256",true),(adapter,"adapter_sha256",true),(bundle+"/Contents/Resources/build-manifest.json","manifest_sha256",false),(bundle+"/Contents/Info.plist","info_sha256",false)] {
            let url=URL(fileURLWithPath:path);try existing(url,executable:executable)
            guard let expected=binding[key] as? String,validHash(expected),try hash(url)==expected else {throw error("O runtime Oracle mudou. Prepare novamente a ponte e revise a conexão Codex.")}
        }
        guard let events=hooks["hooks"] as? [String:Any],Set(events.keys)==Set(hookEvents) else {throw error("Os hooks não correspondem ao runtime gerido.")}
        for name in hookEvents {
            guard let groups=events[name] as? [[String:Any]],groups.count==1,
                  let commands=groups[0]["hooks"] as? [[String:Any]],commands.count==1,
                  commands[0]["type"] as? String=="command",commands[0]["command"] as? String==hookCommand(executable:oracle,state:state) else {throw error("Um hook não corresponde ao runtime gerido.")}
        }
        if let mcp {
            var section="",commands=[String]()
            for line in mcp.components(separatedBy:.newlines) {
                let text=line.trimmingCharacters(in:.whitespaces)
                if text.hasPrefix("[") {section=text}
                else if section=="[mcp_servers.oracle_companion]",text.range(of:"^command\\s*=",options:.regularExpression) != nil {
                    let value=String(text[text.index(after:text.firstIndex(of:"=")!)...]).trimmingCharacters(in:.whitespaces)
                    guard let data=("["+value+"]").data(using:.utf8),let values=try? JSONSerialization.jsonObject(with:data) as? [String],values.count==1 else {throw error("O alvo MCP não pode ser verificado.")}
                    commands.append(values[0])
                }
            }
            guard commands==[adapter] else {throw error("O MCP não corresponde ao runtime gerido.")}
        }
        return ["bundle":bundle,"oracle":oracle,"adapter":adapter]
    }
}
