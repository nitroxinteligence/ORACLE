import Foundation

/// A local execution opportunity is not proof that a Desktop schedule exists.
enum OracleMaintenancePolicy {
    static func due(now: Date, lastSuccess: Date?, createdAt: Date, timeZone: TimeZone, hour: Int) -> Bool {
        var calendar=Calendar(identifier:.gregorian);calendar.timeZone=timeZone
        guard (0...23).contains(hour),var cutoff=calendar.date(bySettingHour:hour,minute:0,second:0,of:now,matchingPolicy:.nextTime,repeatedTimePolicy:.first,direction:.forward) else{return false}
        if cutoff>now {guard let previousDay=calendar.date(byAdding:.day,value:-1,to:now),let prior=calendar.date(bySettingHour:hour,minute:0,second:0,of:previousDay,matchingPolicy:.nextTime,repeatedTimePolicy:.first,direction:.forward) else{return false};cutoff=prior}
        guard createdAt<=cutoff else{return false}
        return lastSuccess.map {$0<cutoff} ?? true
    }
    static func settings(_ raw:[String:Any]) throws -> [String:Any] {
        let zone=raw["timezone"] as? String ?? TimeZone.current.identifier
        let hour=raw["hour"] as? Int ?? 3
        guard TimeZone(identifier:zone) != nil,(0...23).contains(hour) else{throw failure("Horário de manutenção inválido.")}
        let enabled=raw["enabled"] as? Bool==true
        for (key,expected) in [("captureSource",Core.maintenanceCaptureSource),("synthesisScope",Core.maintenanceSynthesisScope)] {
            if let value=raw[key] as? String,value != expected {throw failure("Fonte ou escopo de manutenção não suportado.")}
        }
        return ["schemaVersion":1,"enabled":enabled,"autoCapture":enabled && raw["autoCapture"] as? Bool==true,
                "remoteProcessing":enabled && raw["remoteProcessing"] as? Bool==true,"timezone":zone,"hour":hour,
                "captureSource":raw["captureSource"] as? String ?? NSNull(),
                "synthesisScope":raw["synthesisScope"] as? String ?? NSNull()]
    }
}

extension Core {
    private var maintenanceRoot:URL {home.appendingPathComponent("maintenance")}

    func configureMaintenance(_ raw:[String:Any]) throws -> [String:Any] {
        // Consent edits must remain possible while a model turn is running.
        let lock=try acquireOperationLock("maintenance-config");defer{releaseOperationLock(lock)}
        refreshConfig();_ = try vault()
        let settings=try OracleMaintenancePolicy.settings(raw)
        guard settings["enabled"] as? Bool != true || config["gbrainWorkspace"]==nil else{throw failure("A instalação externa mantém sua própria manutenção; nenhum agendamento local foi alterado.")}
        let path=maintenanceRoot.appendingPathComponent("config.json"),prior=(try? readJSON(path)) ?? [:]
        var value=settings
        value["id"]="oracle-maintenance-"+digest(Data(home.path.utf8)).prefix(16)
        value["vault"]=try vault().path
        value["createdAt"]=prior["createdAt"] ?? ISO8601DateFormatter().string(from:Date())
        value["updatedAt"]=ISO8601DateFormatter().string(from:Date())
        let changed=(prior["vault"] as? String != value["vault"] as? String) || !NSDictionary(dictionary:settings).isEqual(to:prior.filter {settings[$0.key] != nil})
        value["revision"]=changed ? UUID().uuidString : prior["revision"] as? String ?? UUID().uuidString
        let captureUnchanged=prior["vault"] as? String==value["vault"] as? String &&
            prior["autoCapture"] as? Bool==settings["autoCapture"] as? Bool &&
            prior["captureSource"] as? String==settings["captureSource"] as? String
        value["captureEpoch"]=captureUnchanged ? prior["captureEpoch"] as? String ?? UUID().uuidString : UUID().uuidString
        // Never write a Desktop private database/TOML or invent a task id.
        value["scheduleState"]=settings["enabled"] as? Bool==true ? "pending_host_registration" : "disabled"
        value["localExecutor"]="oracle_while_open"
        if changed {value["createdAt"]=ISO8601DateFormatter().string(from:Date())}
        try writeJSON(value,path)
        if settings["enabled"] as? Bool==true {
            let args=[Bundle.main.executableURL!.path,"--state",home.path,"--maintenance","run"]
            let command=String(decoding:try jsonData(args),as:UTF8.self)
            let request="""
            # Manutenção do Oracle — solicitação de agendamento local

            Identificador estável: \(value["id"]!). Fuso: \(settings["timezone"]!). Horário preferencial: \(settings["hour"]!)h diariamente.
            Use o mecanismo oficial de tarefas do aplicativo desktop. Procure uma tarefa com este identificador antes de criar; reutilize-a sem sobrescrever personalizações. Não escreva bancos privados, automation.toml ou confiança de hooks para simular registro.
            A tarefa trabalha neste perfil Oracle e somente no vault autorizado. Execute o comando como uma lista de argumentos, nunca por concatenação no shell: \(command).
            Leia o resultado estruturado: blocked, skipped e failed NÃO significam sucesso. Não rode em paralelo com instalação, atualização ou outra manutenção. Retome pendências na próxima execução elegível, sem reproduzir vários dias em duplicata.
            Não publique nada no GitHub, não copie o workspace do mentor, não altere credenciais, não atualize o binário do GBrain e não configure APIs pagas. O computador precisa estar ligado, acordado e com o executor aberto. O código local não mantém a máquina acordada.
            Captura automática consentida: \(settings["autoCapture"]!). Processamento remoto consentido: \(settings["remoteProcessing"]!). Consentimento não prova que o recurso está configurado: consulte as capacidades reais. Fases que exigem inferência não configurada devem ficar pendentes, não executadas. Não use tokens do ChatGPT como chave de API.
            A captura cobre somente UserPromptSubmit.prompt e Stop.last_assistant_message recebidos pelos hooks confiados no codex-workspace deste perfil. Não leia transcript_path, históricos privados, outras contas nem raciocínio/ferramentas. A síntese usa somente capturas autorizadas, persiste notas separadas e não altera SOUL/USER ou fatos como se fossem confirmados.
            Confirme a existência e o identificador reais da tarefa na interface oficial. Na ausência de uma ferramenta suportada, informe que o agendamento está pendente; não invente confirmação.
            """
            try fm.createDirectory(at:maintenanceRoot,withIntermediateDirectories:true)
            try atomicWriteData(Data(request.utf8),to:maintenanceRoot.appendingPathComponent("schedule-request.md"))
        }
        return try maintenanceSnapshot()
    }

    func maintenanceSnapshot(now:Date=Date()) throws -> [String:Any] {
        refreshConfig()
        let config=(try? readJSON(maintenanceRoot.appendingPathComponent("config.json"))) ?? [:]
        let recorded=(try? readJSON(maintenanceRoot.appendingPathComponent("last-run.json"))) ?? [:]
        let receipt=recorded["vault"] as? String==self.config["vault"] as? String ? recorded : [:]
        let formatter=ISO8601DateFormatter()
        let created=(config["createdAt"] as? String).flatMap{formatter.date(from:$0)} ?? now
        let last=(receipt["lastSuccess"] as? String).flatMap{formatter.date(from:$0)}
        let targetMatches=config["vault"] as? String==self.config["vault"] as? String && self.config["vault"] is String
        let external=self.config["gbrainWorkspace"] != nil
        let enabled=config["enabled"] as? Bool==true && targetMatches && self.config["gbrainAccess"] as? Bool != false && !external
        let zone=TimeZone(identifier:config["timezone"] as? String ?? "") ?? .current
        let due=enabled && OracleMaintenancePolicy.due(now:now,lastSuccess:last,createdAt:created,timeZone:zone,hour:config["hour"] as? Int ?? 3)
        return ["enabled":enabled,"scheduleState":config["enabled"] as? Bool == true ? "pending_host_registration" : "disabled","registered":false,"autoCapture":config["autoCapture"] ?? false,
                "remoteProcessing":config["remoteProcessing"] ?? false,"due":due,"external":external,"hour":config["hour"] ?? 3,
                "timezone":zone.identifier,"lastRun":receipt,"id":config["id"] ?? NSNull(),"targetMatches":targetMatches,"localExecutor":"oracle_while_open",
                "backup":gbrainBackupStatus(),"capabilities":["localSync":true,"privateDatabaseBackup":true,"autoCapture":true,"modelSynthesis":true],
                "captureSource":config["captureSource"] ?? NSNull(),"synthesisScope":config["synthesisScope"] ?? NSNull(),
                "captureConfigured":maintenanceContentConsent(config),"synthesisConfigured":maintenanceContentConsent(config,remote:true),
                "captureCoverage":"Somente prompts e últimas respostas entregues pelos hooks do workspace Oracle; sem histórico privado.",
                "message":!enabled ? "Manutenção automática desativada ou aguardando revisão do vault." : external ? "Instalação externa preservada; manutenção gerenciada pelo seu operador." : "Manutenção local enquanto o Oracle estiver aberto. Agendamento no Codex é separado e ainda requer confirmação."]
    }

    func maintenanceScheduleRequest() throws -> String {
        let config=try readJSON(maintenanceRoot.appendingPathComponent("config.json"))
        guard config["enabled"] as? Bool==true,(try maintenanceSnapshot())["enabled"] as? Bool==true else{throw failure("Autorize a manutenção para o vault atual antes de preparar o agendamento.")}
        return try String(contentsOf:maintenanceRoot.appendingPathComponent("schedule-request.md"),encoding:.utf8)
    }

    func performMaintenance(force:Bool=false,backup:(() throws -> [String:Any])?=nil,
                            synthesis:((String,()->Bool)throws->[String:Any])?=nil,
                            cancelled:@escaping ()->Bool={false},sync:() throws -> [String:Any]) throws -> [String:Any] {
        let lock=try acquireOperationLock("maintenance");defer{releaseOperationLock(lock)}
        // Hold the same setup/update locks as all other writers for the whole
        // run. Checking a lock then releasing it would leave a race window.
        let setup=try acquireOperationLock("setup");defer{releaseOperationLock(setup)}
        let updates=try acquireOperationLock("updates");defer{releaseOperationLock(updates)}
        refreshConfig()
        let settings=(try? readJSON(maintenanceRoot.appendingPathComponent("config.json"))) ?? [:]
        guard settings["enabled"] as? Bool==true else{return ["status":"disabled","executed":false]}
        guard config["gbrainWorkspace"]==nil else{return ["status":"external","executed":false]}
        guard settings["vault"] as? String==config["vault"] as? String else{throw failure("A manutenção pertence a outro vault; revise o consentimento.")}
        guard config["gbrainAccess"] as? Bool != false else{return ["status":"blocked","reason":"access_revoked","executed":false]}
        if operationIsRunning("gbrain") {return ["status":"blocked","reason":"operation_in_progress","executed":false]}
        let isDue=try maintenanceSnapshot()["due"] as? Bool==true
        guard force || isDue else{return ["status":"not_due","executed":false]}
        let path=maintenanceRoot.appendingPathComponent("last-run.json"),recorded=(try? readJSON(path)) ?? [:]
        let prior=recorded["vault"] as? String==config["vault"] as? String ? recorded : [:]
        var result:[String:Any]=["status":"running","complete":false,"at":ISO8601DateFormatter().string(from:Date()),"vault":config["vault"] ?? NSNull(),"lastSuccess":prior["lastSuccess"] ?? NSNull(),"executed":false]
        try writeJSON(result,path)
        do {
            var deferred=[String]()
            var contentComplete=true
            if settings["autoCapture"] as? Bool==true {
                if maintenanceContentConsent(settings) {result["capture"]=try projectMaintenanceCaptures(settings)}
                else {deferred.append("capture_requires_explicit_workspace_hook_scope")}
            }
            if settings["remoteProcessing"] as? Bool==true {
                if maintenanceContentConsent(settings,remote:true) {
                    let execute=synthesis ?? {input,stopped in
                        let workspace=try self.scoped("maintenance/model-workspace",root:self.home)
                        try fm.createDirectory(at:workspace,withIntermediateDirectories:true,attributes:[.posixPermissions:0o700])
                        let preferred=(self.onboardingRecord()["draft"] as? [String:Any])?["model"] as? String
                        return try OracleMaintenanceSynthesis.run(bridge:CodexBridge(),workspace:workspace,input:input,preferredModel:preferred,cancelled:stopped)
                    }
                    let value=try synthesizeMaintenanceCaptures(settings,cancelled:cancelled,run:execute)
                    result["synthesis"]=value;contentComplete=value["complete"] as? Bool==true
                } else {deferred.append("synthesis_requires_explicit_captured_message_scope")}
            }
            guard !cancelled(),maintenanceConsentCurrent(settings) else{throw failure("Manutenção pausada ou consentimento alterado.")}
            let value=try sync()
            result["sync"]=value
            guard value["status"] as? String=="verified",value["complete"] as? Bool==true else {
                result["status"]="blocked";result["reason"]=value["status"] ?? "unavailable";try writeJSON(result,path);return result
            }
            // sync releases gbrain before backup acquires it; never nest that lock.
            if gbrainBackupStatus()["enabled"] as? Bool == true {
                let saved=try (backup ?? {try self.createGBrainBackup()})()
                result["backup"]=saved
                guard saved["status"] as? String == "backup_verified",saved["complete"] as? Bool == true,
                      saved["integrity_verified"] as? Bool == true else {throw failure("Backup da manutenção não foi verificado.")}
            } else {result["backup"]=["status":"not_consented","executed":false]}
            guard !cancelled(),maintenanceConsentCurrent(settings) else{throw failure("Manutenção pausada ou consentimento alterado.")}
            result["status"]="local_complete";result["executed"]=true;result["complete"]=deferred.isEmpty && contentComplete
            // An incomplete consented phase must remain due for the next opportunity.
            if deferred.isEmpty && contentComplete {result["lastSuccess"]=ISO8601DateFormatter().string(from:Date())}
            result["deferred"]=deferred
            try writeJSON(result,path);return result
        } catch {
            result["status"]="failed";result["message"]=error.localizedDescription;try writeJSON(result,path);throw error
        }
    }
}
