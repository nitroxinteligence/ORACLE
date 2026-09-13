import Foundation

/// Read-only receipt from the host's public automation configuration. Oracle never
/// writes this configuration or its hook trust store. Creation belongs to Codex.
enum OracleScheduleRecord {
    static func fields(_ text:String) -> [String:String] {
        var result=[String:String]()
        for line in text.components(separatedBy:.newlines) {
            if line.trimmingCharacters(in:.whitespaces).hasPrefix("["){break}
            guard let split=line.firstIndex(of:"=") else{continue}
            let key=line[..<split].trimmingCharacters(in:.whitespaces)
            let raw=line[line.index(after:split)...].trimmingCharacters(in:.whitespaces)
            if let value=try? JSONSerialization.jsonObject(with:Data(raw.utf8),options:.fragmentsAllowed) as? String {if result[key] != nil{return [:]};result[key]=value}
        }
        return result
    }
    static func matches(_ fields:[String:String],marker:String,hour:Int) -> Bool {
        let rule=fields["rrule",default:""].replacingOccurrences(of:"RRULE:",with:"")
        let components=Set(rule.split(separator:";").map(String.init))
        return fields["kind"]=="cron" && fields["status"]=="ACTIVE" &&
            fields["model"]=="gpt-5.6-sol" && fields["reasoning_effort"]=="medium" &&
            fields["prompt",default:""].contains(marker) &&
            components==Set(["FREQ=DAILY","BYHOUR=\(hour)","BYMINUTE=0","BYSECOND=0"])
    }
}

extension Core {
    func maintenanceMarker(_ settings:[String:Any]) -> String {
        "ORACLE_MAINTENANCE:"+(settings["id"] as? String ?? "")+":"+(settings["revision"] as? String ?? "")
    }
    func maintenanceHostSchedule(_ settings:[String:Any]) -> [String:Any] {
        guard settings["enabled"] as? Bool==true,settings["vault"] as? String==config["vault"] as? String,
              settings["revision"] is String else{return ["registered":false,"status":"disabled"]}
        let root=distributionHostHome().appendingPathComponent(".codex/automations")
        guard root.resolvingSymlinksInPath().path==root.path,
              let entries=try? fm.contentsOfDirectory(at:root,includingPropertiesForKeys:nil),entries.count<=2000 else {
            return ["registered":false,"status":"pending_host_registration"]
        }
        let marker=maintenanceMarker(settings),hour=settings["hour"] as? Int ?? 15
        var matching=[[String:Any]]()
        for entry in entries {
            let file=entry.appendingPathComponent("automation.toml")
            guard file.resolvingSymlinksInPath().path==file.path,
                  let size=try? file.resourceValues(forKeys:[.fileSizeKey]).fileSize,size<=128_000,
                  let data=try? Data(contentsOf:file),let text=String(data:data,encoding:.utf8) else{continue}
            let fields=OracleScheduleRecord.fields(text)
            guard OracleScheduleRecord.matches(fields,marker:marker,hour:hour),fields["id"]==entry.lastPathComponent else{continue}
            matching.append(["id":entry.lastPathComponent,"sha256":digest(data),"path":file.path])
        }
        guard matching.count==1 else{return ["registered":false,"status":matching.isEmpty ? "pending_host_registration":"duplicate_host_schedules"]}
        return ["registered":true,"status":"registered","receipt":matching[0],"model":"gpt-5.6-sol","effort":"medium"]
    }
    func maintenanceHookContext(_ input:[String:Any]) throws -> [String:Any] {
        guard let event=input["hook_event_name"] as? String,["UserPromptSubmit","SessionStart"].contains(event),
              let cwd=input["cwd"] as? String,
              cwd==(try? oracleWorkspace().path),
              let settings=try? readJSON(home.appendingPathComponent("maintenance/config.json")),
              settings["enabled"] as? Bool==true,maintenanceConsentCurrent(settings) else{return [:]}
        var context=""
        if maintenanceContentConsent(settings) {
            context="Memória Oracle autorizada neste workspace: durante a conversa, registre apenas fatos duradouros explicitamente declarados pelo usuário, decisões e preferências relevantes com remember e entidades people/projects apropriadas. Consulte antes de gravar, evite duplicações, preserve correções e respeite pedidos de não reter. Use proveniência da sessão. Para cada declaração selecionada, crie uma nota-fonte em signals/ com put_page antes de remember, referencie essa nota na proveniência e confirme com recall e get_page. Capturas literais são fontes, não fatos confirmados; respostas do assistente não viram fatos pessoais. O histórico local é processado pela manutenção diária.\n"
        }
        if maintenanceHostSchedule(settings)["registered"] as? Bool != true {context += try maintenanceScheduleRequest()}
        return context.isEmpty ? [:] : ["hookSpecificOutput":["hookEventName":event,"additionalContext":context]]
    }
}

/// Public hooks/list evidence. Unrelated optional hooks cannot block the three
/// events needed by memory; installed files alone never confer trust.
enum OracleHookVerification {
    static func check(_ response:[String:Any],path:String,workspace:String) -> (trusted:Bool,message:String) {
        let groups=(response["data"] as? [[String:Any]] ?? []).filter{$0["cwd"] as? String==workspace}
        if groups.contains(where:{!($0["errors"] as? [Any] ?? []).isEmpty}) {return (false,"O Codex informou um erro ao carregar os hooks deste workspace. Confira os hooks no Codex e tente novamente.")}
        let hooks=groups.flatMap{$0["hooks"] as? [[String:Any]] ?? []}.filter{($0["sourcePath"] as? String)==path || ($0["key"] as? String ?? "").hasPrefix(path+":")}
        if hooks.isEmpty {return (false,"O Codex ainda não carregou os hooks do Oracle. Abra o workspace Oracle e revise os hooks no Codex.")}
        let required=["sessionStart","userPromptSubmit","stop"]
        let missing=required.filter{event in
            let handlers=hooks.filter{$0["eventName"] as? String==event}
            return handlers.isEmpty || !handlers.allSatisfy{$0["enabled"] as? Bool==true && $0["trustStatus"] as? String=="trusted"}
        }
        return missing.isEmpty ? (true,"Hooks confirmados no Codex.") : (false,"Há hooks de memória desativados ou aguardando confiança no Codex. Revise SessionStart, UserPromptSubmit e Stop no workspace Oracle e clique em Verificar.")
    }
}
