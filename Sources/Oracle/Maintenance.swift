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
        let hour=raw["hour"] as? Int ?? 15
        guard TimeZone(identifier:zone) != nil,(0...23).contains(hour) else{throw failure("Horário de manutenção inválido.")}
        let enabled=raw["enabled"] as? Bool==true
        for (key,expected) in [("captureSource",Core.maintenanceCaptureSource),("synthesisScope",Core.maintenanceSynthesisScope)] {
            if let value=raw[key] as? String,value != expected {throw failure("Fonte ou escopo de manutenção não suportado.")}
        }
        return ["schemaVersion":1,"enabled":enabled,"autoCapture":enabled && raw["autoCapture"] as? Bool==true,
                "remoteProcessing":enabled && raw["remoteProcessing"] as? Bool==true,"timezone":zone,"hour":hour,
                "captureSource":raw["captureSource"] as? String ?? NSNull(),
                "synthesisScope":raw["synthesisScope"] as? String ?? NSNull(),
                "graphIndexes":enabled && raw["graphIndexes"] as? Bool==true,"model":"gpt-5.6-sol","effort":"medium","consolidateWiki":enabled && raw["consolidateWiki"] as? Bool==true]
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
            let request=try maintenanceScheduleInstructions(value)
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
        let host=maintenanceHostSchedule(config)
        let capture=(try? readJSON(maintenanceRoot.appendingPathComponent("last-capture.json"))) ?? [:]
        let captured=capture["vault"] as? String==config["vault"] as? String && capture["epoch"] as? String==config["captureEpoch"] as? String && capture["status"] as? String=="captured"
        let due=enabled && OracleMaintenancePolicy.due(now:now,lastSuccess:last,createdAt:created,timeZone:zone,hour:config["hour"] as? Int ?? 15)
        return ["enabled":enabled,"scheduleState":host["status"]!,"registered":host["registered"]!,"hostSchedule":host,"model":"gpt-5.6-sol","effort":"medium","consolidateWiki":config["consolidateWiki"] as? Bool==true,"autoCapture":config["autoCapture"] ?? false,
                "remoteProcessing":config["remoteProcessing"] ?? false,"due":due,"external":external,"hour":config["hour"] ?? 15,
                "timezone":zone.identifier,"lastRun":receipt,"id":config["id"] ?? NSNull(),"targetMatches":targetMatches,"localExecutor":"oracle_while_open",
                "captureObserved":captured,"lastCapture":captured ? capture : [:],"backup":gbrainBackupStatus(),"capabilities":["localSync":true,"privateDatabaseBackup":true,"autoCapture":true,"modelSynthesis":true],
                "captureSource":config["captureSource"] ?? NSNull(),"synthesisScope":config["synthesisScope"] ?? NSNull(),
                "captureConfigured":maintenanceContentConsent(config),"synthesisConfigured":maintenanceContentConsent(config,remote:true),
                "captureCoverage":"Somente prompts e últimas respostas entregues pelos hooks do workspace Oracle; sem histórico privado.",
                "message":!enabled ? "Manutenção automática desativada ou aguardando revisão do vault." : external ? "Instalação externa preservada; manutenção gerenciada pelo seu operador." : (host["registered"] as? Bool==true ? "Agendamento confirmado no Codex. O computador e o Codex precisam estar disponíveis." : "Manutenção local preparada. Abra o espaço Oracle no Codex para registrar a tarefa diária.")]
    }

    func maintenanceScheduleRequest() throws -> String {
        let config=try readJSON(maintenanceRoot.appendingPathComponent("config.json"))
        guard config["enabled"] as? Bool==true,(try maintenanceSnapshot())["enabled"] as? Bool==true else{throw failure("Autorize a manutenção para o vault atual antes de preparar o agendamento.")}
        return try maintenanceScheduleInstructions(config)
    }

    private func maintenanceScheduleInstructions(_ settings:[String:Any]) throws -> String {
        let args=[Bundle.main.executableURL!.path,"--state",home.path,"--maintenance","run"]
        let command=String(decoding:try jsonData(args),as:UTF8.self)
        return """
        Configure a manutenção diária do Oracle neste Codex Desktop. O consentimento já foi registrado no onboarding; não o solicite novamente. A revisão e a confiança dos hooks continuam a cargo do usuário no Codex.

        Perfil: \(settings["id"]!). Workspace: \(try oracleWorkspace().path).
        Vault autorizado: \(settings["vault"]!). Horário: \(settings["hour"]!)h, todos os dias, fuso \(settings["timezone"]!).

        1. Use a ferramenta oficial de automações. Localize pelo identificador do perfil uma tarefa existente e atualize-a, sem duplicar nem alterar outras tarefas. Registre uma tarefa independente (cron), local, no projeto deste workspace, com model gpt-5.6-sol e reasoningEffort medium. Confira o horário no fuso indicado.
        2. No prompt recorrente, inclua o marcador \(maintenanceMarker(settings)) e a execução deste comando como lista de argumentos:
        \(command)
        A tarefa deve conferir o recibo, respeitar os consentimentos atuais e retomar pendências na próxima execução. Não execute durante instalação, atualização ou outra manutenção. blocked, skipped e failed não significam sucesso. Fique em silêncio quando não houver erro ou mudança que exija ação.
        O comando mantém índices com links em SISTEMA/indices/oracle-graph quando essa opção estiver autorizada no perfil. Não mova nem reescreva notas pessoais e não altere configurações do Graph View. Atualizações ficam restritas ao Second Brain e ao acervo gerenciado.

        3. Após registrar, execute o mesmo comando substituindo run por status. Só confirme o agendamento se hostSchedule.registered for true e a tarefa existir na interface oficial. Informe separadamente qualquer pendência de confiança dos hooks. Sem ferramenta oficial, informe a pendência; não escreva automation.toml, bancos privados ou registros de confiança.

        Captura autorizada: \(settings["autoCapture"]!). Processamento remoto autorizado: \(settings["remoteProcessing"]!). A captura limita-se a UserPromptSubmit.prompt e Stop.last_assistant_message recebidos pelos hooks confiados deste workspace. Não leia transcript_path, históricos privados, raciocínio ou ferramentas. A síntese usa apenas capturas autorizadas e não altera SOUL/USER nem transforma mensagens em fatos confirmados. Sem capacidade de inferência disponível, deixe essa fase pendente.
        Não publique no GitHub, altere credenciais, configure APIs pagas nem atualize o GBrain. O Mac precisa estar acordado e o Codex aberto no horário.
        """
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
                        let preferred=settings["model"] as? String ?? "gpt-5.6-sol"
                        return try OracleMaintenanceSynthesis.run(bridge:CodexBridge.maintenanceConnection(),workspace:workspace,input:input,preferredModel:preferred,preferredEffort:"medium",cancelled:stopped)
                    }
                    let value=try synthesizeMaintenanceCaptures(settings,cancelled:cancelled,run:execute)
                    result["synthesis"]=value;contentComplete=value["complete"] as? Bool==true
                } else {deferred.append("synthesis_requires_explicit_captured_message_scope")}
            }
            guard !cancelled(),maintenanceConsentCurrent(settings) else{throw failure("Manutenção pausada ou consentimento alterado.")}
            if settings["graphIndexes"] as? Bool==true {result["graphIndexes"]=try maintainGraphIndexes()}
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
