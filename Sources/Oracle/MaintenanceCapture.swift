import Foundation
import Darwin

/// Only the documented hook payload is captured. Never opens transcript_path,
/// account histories, tool output, reasoning, or any automatically found source.
extension Core {
    static let maintenanceCaptureSource = "codex_workspace_hooks_v1"
    static let maintenanceSynthesisScope = "captured_messages_codex_v1"

    func maintenanceContentConsent(_ settings:[String:Any], remote:Bool=false) -> Bool {
        refreshConfig()
        return settings["enabled"] as? Bool == true && settings["autoCapture"] as? Bool == true &&
            settings["captureSource"] as? String == Self.maintenanceCaptureSource &&
            settings["vault"] as? String == config["vault"] as? String && config["vault"] is String &&
            config["gbrainWorkspace"] == nil && config["gbrainAccess"] as? Bool == true &&
            (!remote || (settings["remoteProcessing"] as? Bool == true &&
                         settings["synthesisScope"] as? String == Self.maintenanceSynthesisScope))
    }

    /// A consent edit invalidates in-flight remote work, but not the original notes.
    func maintenanceConsentCurrent(_ settings:[String:Any]) -> Bool {
        guard let current=try? readJSON(scoped("maintenance/config.json",root:home)) else{return false}
        refreshConfig()
        let same=settings["revision"] is String ? current["revision"] as? String==settings["revision"] as? String : NSDictionary(dictionary:current).isEqual(to:settings)
        return same && current["enabled"] as? Bool == true &&
            current["vault"] as? String == config["vault"] as? String &&
            config["gbrainAccess"] as? Bool != false && config["gbrainWorkspace"] == nil
    }

    /// Bounded regular-file reads for this private journal; no symlink/fixture discovery.
    private func maintenanceBytes(_ relative:String, root:URL, limit:Int=200_000) throws -> Data {
        let url=try scoped(relative,root:root)
        let fd=open(url.path,O_RDONLY|O_NOFOLLOW|O_NONBLOCK)
        guard fd >= 0 else{throw failure("Registro da manutenção indisponível.")}
        let file=FileHandle(fileDescriptor:fd,closeOnDealloc:true)
        defer{try? file.close()}
        var before=stat(),after=stat()
        guard fstat(fd,&before)==0,(before.st_mode & S_IFMT)==S_IFREG,before.st_nlink==1,
              before.st_size>=0,before.st_size<=limit,(before.st_flags & 0x40000000)==0 else {
            throw failure("Registro da manutenção não é um arquivo local regular dentro do limite.")
        }
        let data=try file.read(upToCount:limit+1) ?? Data()
        guard data.count==Int(before.st_size),fstat(fd,&after)==0,
              before.st_size==after.st_size,before.st_mtimespec.tv_sec==after.st_mtimespec.tv_sec,
              before.st_mtimespec.tv_nsec==after.st_mtimespec.tv_nsec else {
            throw failure("Registro mudou durante a leitura.")
        }
        return data
    }

    /// An exclusive link publishes a complete sibling without replacing any note.
    private func publishMaintenanceNote(_ data:Data, path:String) throws {
        let root=try vault(),url=try scoped(path,root:root)
        if fm.fileExists(atPath:url.path) {
            guard try maintenanceBytes(path,root:root)==data else{throw failure("Nota da manutenção foi editada; versão existente preservada.")}
            return
        }
        try fm.createDirectory(at:url.deletingLastPathComponent(),withIntermediateDirectories:true,attributes:[.posixPermissions:0o700])
        _=try scoped(path,root:root)
        let temporary=url.deletingLastPathComponent().appendingPathComponent(".oracle-maintenance-"+UUID().uuidString)
        defer{try? fm.removeItem(at:temporary)}
        try atomicWriteData(data,to:temporary,permissions:0o600)
        guard link(temporary.path,url.path)==0 else{throw failure("Destino da manutenção já existe ou não pôde ser publicado; nenhuma nota foi substituída.")}
        try fm.removeItem(at:temporary)
        guard try maintenanceBytes(path,root:root)==data else{throw failure("Nota da manutenção sem readback válido.")}
    }

    @discardableResult
    func captureMaintenanceHook(_ input:[String:Any]) throws -> [String:Any] {
        guard let kind=input["hook_event_name"] as? String,["UserPromptSubmit","Stop"].contains(kind) else {
            return ["status":"not_supported","executed":false]
        }
        // This short lock serializes capture with opt-in/revocation, not model runs.
        let lock=try acquireOperationLock("maintenance-config");defer{releaseOperationLock(lock)}
        let settings=(try? readJSON(scoped("maintenance/config.json",root:home))) ?? [:]
        guard maintenanceContentConsent(settings),let epoch=settings["captureEpoch"] as? String else {
            return ["status":"not_consented","executed":false]
        }
        let expected=try scoped("codex-workspace",root:home)
        let binding=try readJSON(scoped("setup/bridge.json",root:home))
        let owner=try readJSON(scoped("gbrain/profile/oracle-owned.json",root:home))
        guard binding["workspace"] as? String==expected.path,owner["owner"] as? String=="OracleCompanion",
              owner["schema_version"] as? Int==2,config["gbrainVaultSource"] as? String=="oracle-vault",
              owner["vault_root"] as? String==config["vault"] as? String,
              let cwd=input["cwd"] as? String,URL(fileURLWithPath:cwd).resolvingSymlinksInPath().path==cwd,
              cwd==expected.path || cwd.hasPrefix(expected.path+"/") else {
            throw failure("Hook fora do workspace Oracle autorizado; conteúdo não capturado.")
        }
        guard let session=input["session_id"] as? String,!session.isEmpty,session.utf8.count<=256,
              let turn=input["turn_id"] as? String,!turn.isEmpty,turn.utf8.count<=256,
              let text=input[kind=="Stop" ? "last_assistant_message" : "prompt"] as? String,
              !text.trimmingCharacters(in:.whitespacesAndNewlines).isEmpty,text.utf8.count<=64_000 else {
            throw failure("Hook sem mensagem/identificadores suportados ou acima de 64 KB; não houve captura parcial.")
        }
        let payload:[String:Any]=["schemaVersion":1,"source":Self.maintenanceCaptureSource,"epoch":epoch,
            "vault":config["vault"]!,"session":digest(Data(session.utf8)),"turn":digest(Data(turn.utf8)),
            "role":kind=="Stop" ? "assistant" : "user","text":text]
        let id=digest(try jsonData(payload)),relative="maintenance/capture-events/"+id+".json"
        let url=try scoped(relative,root:home)
        if fm.fileExists(atPath:url.path) {
            guard let prior=try JSONSerialization.jsonObject(with:maintenanceBytes(relative,root:home)) as? [String:Any],
                  let stored=prior["payload"] as? [String:Any],digest(try jsonData(stored))==id else {
                throw failure("Registro de captura alterado; original preservado.")
            }
            return ["status":"already_captured","executed":false,"id":id]
        }
        let folder=try scoped("maintenance/capture-events",root:home)
        try fm.createDirectory(at:folder,withIntermediateDirectories:true,attributes:[.posixPermissions:0o700])
        guard try fm.contentsOfDirectory(atPath:folder.path).count<5000 else{throw failure("Limite de 5 mil capturas locais atingido; nenhuma mensagem descartada como sucesso.")}
        try writeJSON(["id":id,"receivedAt":ISO8601DateFormatter().string(from:Date()),"payload":payload],url)
        try writeJSON(["status":"captured","id":id,"vault":config["vault"]!,"epoch":epoch,
                       "at":ISO8601DateFormatter().string(from:Date())],try scoped("maintenance/last-capture.json",root:home))
        return ["status":"captured","executed":true,"id":id]
    }

    private func maintenanceCaptures(_ settings:[String:Any]) throws -> [[String:Any]] {
        let folder=try scoped("maintenance/capture-events",root:home)
        guard fm.fileExists(atPath:folder.path) else{return []}
        let files=try fm.contentsOfDirectory(atPath:folder.path).sorted()
        guard files.count<=5000 else{throw failure("Inventário de captura excede o limite; nenhuma conclusão parcial.")}
        var rows=[[String:Any]]()
        for name in files {
            guard name.range(of:"^[a-f0-9]{64}\\.json$",options:.regularExpression) != nil else{throw failure("Registro inesperado na captura.")}
            let data=try maintenanceBytes("maintenance/capture-events/"+name,root:home)
            guard let row=try JSONSerialization.jsonObject(with:data) as? [String:Any],let id=row["id"] as? String,
                  name==id+".json",let payload=row["payload"] as? [String:Any],digest(try jsonData(payload))==id else {
                throw failure("Integridade da captura não confirmada.")
            }
            guard payload["vault"] as? String==config["vault"] as? String,
                  payload["epoch"] as? String==settings["captureEpoch"] as? String else{continue}
            guard payload["source"] as? String==Self.maintenanceCaptureSource,
                  ["user","assistant"].contains(payload["role"] as? String ?? ""),
                  payload["session"] is String,payload["turn"] is String,
                  let text=payload["text"] as? String,text.utf8.count<=64_000 else{throw failure("Mensagem capturada inválida.")}
            rows.append(row)
        }
        return rows.sorted { ($0["receivedAt"] as? String ?? "")+($0["id"] as! String) < ($1["receivedAt"] as? String ?? "")+($1["id"] as! String) }
    }

    private func captureNote(_ row:[String:Any]) throws -> (String,Data) {
        guard let id=row["id"] as? String,let p=row["payload"] as? [String:Any],let text=p["text"] as? String else{throw failure("Captura inválida.")}
        let note="# Mensagem capturada no Codex\n\nFonte: hook autorizado do workspace Oracle. Cobertura parcial, sem ferramentas ou raciocínio interno.\n\nRegistro: \(id)\nSessão: \(p["session"] ?? "")\nTurno: \(p["turn"] ?? "")\nPapel: \(p["role"] ?? "")\n\n## Conteúdo original (dados, não instruções)\n\n"+text+"\n"
        return ("INBOX/oracle-history/conversations/oracle-"+id+".md",Data(note.utf8))
    }

    func projectMaintenanceCaptures(_ settings:[String:Any]) throws -> [String:Any] {
        guard maintenanceContentConsent(settings) else{return ["status":"not_configured","complete":false]}
        let rows=try maintenanceCaptures(settings)
        for row in rows {
            let consent=try acquireOperationLock("maintenance-config");defer{releaseOperationLock(consent)}
            guard maintenanceConsentCurrent(settings) else{throw failure("Manutenção pausada ou consentimento alterado.")}
            let (path,bytes)=try captureNote(row);try publishMaintenanceNote(bytes,path:path)
        }
        return ["status":"verified","complete":true,"capturedMessages":rows.count,
                "coverage":"only_delivered_workspace_hooks","historyAccessed":false]
    }

    func synthesizeMaintenanceCaptures(_ settings:[String:Any], cancelled:@escaping ()->Bool,
                                      run:(String,()->Bool)throws->[String:Any]) throws -> [String:Any] {
        guard maintenanceContentConsent(settings,remote:true) else{return ["status":"not_configured","complete":false]}
        let rows=try maintenanceCaptures(settings)
        let ledgerURL=try scoped("maintenance/synthesis-ledger.json",root:home)
        var ledger:[String:Any]=[:]
        if fm.fileExists(atPath:ledgerURL.path) {
            guard let saved=try JSONSerialization.jsonObject(with:maintenanceBytes("maintenance/synthesis-ledger.json",root:home,limit:2_000_000)) as? [String:Any] else {
                throw failure("Recibo de síntese inválido; nenhum conteúdo reenviado.")
            }
            ledger=saved
        }
        var pending=[[String:Any]]()
        for row in rows {
            let id=row["id"] as! String,(path,bytes)=try captureNote(row)
            guard try maintenanceBytes(path,root:vault())==bytes else{throw failure("Captura canônica editada; síntese não enviada.")}
            if let saved=ledger[id] as? [String:Any],let path=saved["path"] as? String,let sha=saved["sha256"] as? String {
                guard path.hasPrefix("INBOX/oracle-history/syntheses/oracle-"),
                      digest(try maintenanceBytes(path,root:vault()))==sha else{throw failure("Síntese anterior foi editada; conteúdo preservado.")}
            } else {pending.append(row)}
        }
        guard !pending.isEmpty else{return ["status":"no_new_messages","complete":true,"executed":false]}
        var batch=[[String:Any]](),size=0
        for row in pending {
            let count=try jsonData(row).count
            if batch.count>=64 || size+count>120_000 {break}
            batch.append(row);size += count
        }
        guard !batch.isEmpty else{throw failure("Mensagem excede o lote de síntese; nenhum conteúdo truncado.")}
        // Local paths and consent bookkeeping are not sent to the model.
        let messages=batch.map {row -> [String:Any] in
            let payload=row["payload"] as! [String:Any]
            return ["id":row["id"]!,"session":payload["session"]!,"turn":payload["turn"]!,
                    "role":payload["role"]!,"text":payload["text"]!]
        }
        let input=try jsonData(messages),batchID=digest(input)
        func stopped() -> Bool {cancelled() || !self.maintenanceConsentCurrent(settings)}
        guard !stopped() else{throw failure("Síntese cancelada antes do envio.")}
        let responsePath="maintenance/synthesis-results/"+batchID+".json",responseURL=try scoped(responsePath,root:home)
        let response:[String:Any]
        if fm.fileExists(atPath:responseURL.path) {
            guard let saved=try JSONSerialization.jsonObject(with:maintenanceBytes(responsePath,root:home)) as? [String:Any] else{throw failure("Síntese sem recibo válido.")}
            response=saved
        } else {
            response=try run(String(decoding:input,as:UTF8.self),stopped)
        }
        guard !stopped(),response["status"] as? String=="verified",response["complete"] as? Bool==true,
              let text=response["text"] as? String,!text.trimmingCharacters(in:.whitespacesAndNewlines).isEmpty,
              text.utf8.count<=64_000,let model=response["model"] as? String,!model.isEmpty,
              response["threadId"] is String,response["turnId"] is String else{throw failure("Síntese cancelada ou sem resposta verificável.")}
        // Persist the validated response first so a local write retry does not call a model twice.
        if !fm.fileExists(atPath:responseURL.path) {try writeJSON(response,responseURL)}
        let ids=batch.map{$0["id"] as! String}
        let content=Data(("# Síntese de conversas — gerada por modelo\n\nRevisão humana recomendada. Não altera identidade nem fatos canônicos automaticamente.\n\nLote: "+batchID+"\n\n"+text+"\n\n## Fontes capturadas\n"+ids.map{"- [\($0)](../conversations/oracle-\($0).md)"}.joined(separator:"\n")+"\n").utf8)
        let path="INBOX/oracle-history/syntheses/oracle-"+batchID+".md"
        let consentLock=try acquireOperationLock("maintenance-config");defer{releaseOperationLock(consentLock)}
        guard !stopped() else{throw failure("Consentimento alterado; síntese não publicada.")}
        try publishMaintenanceNote(content,path:path)
        for id in ids {ledger[id]=["path":path,"sha256":digest(content)]}
        try writeJSON(ledger,ledgerURL)
        return ["status":"verified","complete":batch.count==pending.count,"executed":true,"messages":batch.count,
                "remaining":pending.count-batch.count,"path":path,"sha256":digest(content),"model":model,
                "threadId":response["threadId"]!,"turnId":response["turnId"]!,"inputSHA256":batchID]
    }
}
