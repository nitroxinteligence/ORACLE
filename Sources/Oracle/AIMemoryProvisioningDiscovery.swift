import Foundation

/// Bounded read-only discovery. A configured ai-memory endpoint with incomplete
/// provenance blocks a new installation instead of being silently duplicated.
extension OracleAIMemoryProvisioning {
    static func tokens(_ command:String)throws->[String] {
        guard !command.contains("$"),!command.contains("`"),!command.contains(";"),!command.contains("\n"),!command.contains("|") else{throw error("Comando AI Memory existente exige revisão manual.")}
        var result=[String](),word="",quote:Character?,escaped=false,started=false
        for character in command {
            if escaped {word.append(character);escaped=false;started=true;continue}
            if character=="\\",quote != "'"{escaped=true;continue}
            if let q=quote {if character==q{quote=nil}else{word.append(character)};started=true;continue}
            if character=="'" || character=="\""{quote=character;started=true;continue}
            if character.isWhitespace {if started{result.append(word);word="";started=false}}else{word.append(character);started=true}
        }
        guard quote==nil,!escaped else{throw error("Comando AI Memory existente incompleto.")}
        if started{result.append(word)};return result
    }
    static func existingCodex(codexHome:URL,forbidden:[URL])throws->[String:Any]? {
        let config=codexHome.appendingPathComponent("config.toml")
        guard FileManager.default.fileExists(atPath:config.path) else{return nil}
        let bytes=try read(config,limit:1_000_000)
        guard let text=String(data:bytes,encoding:.utf8) else{throw error("Configuração Codex não é UTF-8.")}
        // Every table is a boundary, including unrelated tables. TOML allows
        // horizontal whitespace around the brackets and dotted-key separator.
        let regex=try NSRegularExpression(pattern:"(?m)^[\\t ]*\\[([^\\r\\n]*)\\][\\t ]*(?:#.*)?$")
        let ns=text as NSString,matches=regex.matches(in:text,range:NSRange(location:0,length:ns.length))
        let accepted:Set<String>=["ai-memory","ai_memory","ai-memory-codex","ai_memory_codex","oracle_ai_memory"]
        let serverHeader=try NSRegularExpression(pattern:"^[\\t ]*mcp_servers[\\t ]*\\.[\\t ]*([A-Za-z0-9_-]+)[\\t ]*$")
        let integrationMention=try NSRegularExpression(pattern:"(?<![A-Za-z0-9_-])(?:"+accepted.sorted().map{NSRegularExpression.escapedPattern(for:$0)}.joined(separator:"|")+")(?![A-Za-z0-9_-])")
        var servers=[(String,String)]()
        for (index,match) in matches.enumerated() {
            let header=ns.substring(with:match.range(at:1)),headerRange=NSRange(location:0,length:(header as NSString).length)
            guard let parsed=serverHeader.firstMatch(in:header,range:headerRange) else {
                if integrationMention.firstMatch(in:header,range:headerRange) != nil {throw error("AI Memory já aparece em tabela Codex não reconhecida. Preserve e revise a configuração existente; não será criada outra.")}
                continue
            }
            let name=(header as NSString).substring(with:parsed.range(at:1))
            guard accepted.contains(name) else{continue}
            let end=index+1<matches.count ? matches[index+1].range.location:ns.length
            let body=ns.substring(with:NSRange(location:match.range.location+match.range.length,length:end-match.range.location-match.range.length))
            servers.append((name,body))
        }
        if servers.isEmpty {
            // Inline/quoted representations of the named integration cannot be
            // safely adopted with this bounded reader. Never rewrite TOML.
            if integrationMention.firstMatch(in:text,range:NSRange(location:0,length:ns.length)) != nil {throw error("AI Memory já aparece em configuração Codex não reconhecida. Revise a instância existente; não será criada outra.")}
            return nil
        }
        guard servers.count==1 else{throw error("Há várias integrações AI Memory no Codex. Revise-as antes de provisionar outra.")}
        let (name,body)=servers[0]
        func value(_ key:String)->String? {
            let pattern="(?m)^"+key+"\\s*=\\s*(\"(?:[^\"\\\\]|\\\\.)*\")\\s*(?:#.*)?$"
            guard let regex=try? NSRegularExpression(pattern:pattern),let match=regex.firstMatch(in:body,range:NSRange(location:0,length:(body as NSString).length)),let data=(body as NSString).substring(with:match.range(at:1)).data(using:.utf8) else{return nil}
            return try? JSONDecoder().decode(String.self,from:data)
        }
        let url=value("url")
        var executable:URL?,data:URL?,evidence=[["path":config.path,"sha256":hash(bytes)]]
        if let command=value("command"),command.hasPrefix("/"),URL(fileURLWithPath:command).lastPathComponent=="ai-memory" {
            executable=URL(fileURLWithPath:command)
            let regex=try NSRegularExpression(pattern:"(?m)^args\\s*=\\s*(\\[[^\\n]*\\])\\s*$")
            if let found=regex.firstMatch(in:body,range:NSRange(location:0,length:(body as NSString).length)),let json=(body as NSString).substring(with:found.range(at:1)).data(using:.utf8),let args=try? JSONDecoder().decode([String].self,from:json),let index=args.firstIndex(of:"--data-dir"),index+1<args.count,args[index+1].hasPrefix("/"){data=URL(fileURLWithPath:args[index+1])}
        } else if let url,let endpoint=URL(string:url),endpoint.scheme=="http",["127.0.0.1","localhost"].contains(endpoint.host ?? ""),endpoint.port != 49374,endpoint.path=="/mcp" {
            let hooksFile=codexHome.appendingPathComponent("hooks.json"),hooksBytes=try read(hooksFile,limit:1_000_000)
            evidence.append(["path":hooksFile.path,"sha256":hash(hooksBytes)])
            guard let hooks=try JSONSerialization.jsonObject(with:hooksBytes) as? [String:Any] else{throw error("Hooks AI Memory existentes precisam de revisão.")}
            var candidates=Set<String>()
            func visit(_ value:Any)throws {
                if let object=value as? [String:Any] {
                    if let command=object["command"] as? String,command.contains("ai-memory"),command.contains("--agent") {
                        let args=try tokens(command)
                        if let first=args.first,first.hasPrefix("/"),URL(fileURLWithPath:first).lastPathComponent=="ai-memory",
                           let agent=args.firstIndex(of:"--agent"),agent+1<args.count,args[agent+1]=="codex",
                           let server=args.firstIndex(of:"--server-url"),server+1<args.count,args[server+1].trimmingCharacters(in:CharacterSet(charactersIn:"/"))+"/mcp"==url,
                           let index=args.firstIndex(of:"--data-dir"),index+1<args.count,args[index+1].hasPrefix("/") {candidates.insert(first+"\n"+args[index+1])}
                    }
                    for (_,child) in object{try visit(child)}
                } else if let values=value as? [Any]{for child in values{try visit(child)}}
            }
            try visit(hooks)
            guard candidates.count==1,let candidate=candidates.first else{throw error("AI Memory Codex já configurado, mas binary/data-dir não estão vinculados de forma inequívoca. Preserve a instalação e revise-a.")}
            let parts=candidate.split(separator:"\n").map(String.init);executable=URL(fileURLWithPath:parts[0]);data=URL(fileURLWithPath:parts[1])
        }
        guard let binaryAlias=executable,let dataAlias=data else{throw error("AI Memory Codex já existe, mas o runtime não pôde ser comprovado. Nenhuma duplicata foi instalada.")}
        let canonicalBinary=binaryAlias.standardizedFileURL.resolvingSymlinksInPath(),canonicalData=dataAlias.standardizedFileURL.resolvingSymlinksInPath()
        try safe(canonicalBinary);try safe(canonicalData)
        if binaryAlias.path != canonicalBinary.path {evidence.append(["path":binaryAlias.path,"kind":"alias","canonical":canonicalBinary.path])}
        if dataAlias.path != canonicalData.path {evidence.append(["path":dataAlias.path,"kind":"alias","canonical":canonicalData.path])}
        for root in forbidden {
            let canonical=root.standardizedFileURL.resolvingSymlinksInPath().path
            guard !canonicalData.path.hasPrefix(canonical+"/"),canonicalData.path != canonical,!canonical.hasPrefix(canonicalData.path+"/") else{throw error("O perfil AI Memory existente se sobrepõe ao vault/GBrain. Preserve-o e revise antes de continuar.")}
        }
        let profile=canonicalData.appendingPathComponent("config.toml"),profileBytes=try read(profile,limit:128_000)
        evidence.append(["path":profile.path,"sha256":hash(profileBytes)])
        return ["binary":canonicalBinary.path,"data":canonicalData.path,"serverName":name,"serverURL":url.map{$0 as Any} ?? NSNull(),"evidence":evidence]
    }
}
