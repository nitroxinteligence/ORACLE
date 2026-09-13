import Foundation

extension Core {
    func maintenanceWikiPath(_ settings:[String:Any]) throws -> String {
        guard let epoch=settings["captureEpoch"] as? String,UUID(uuidString:epoch) != nil else{throw failure("Escopo da wiki inválido.")}
        return "WIKI/Oracle/memoria-"+epoch.lowercased()+".md"
    }
    func maintenanceWikiContext(_ settings:[String:Any]) throws -> String {
        guard settings["consolidateWiki"] as? Bool==true else{return ""}
        let path=try maintenanceWikiPath(settings),url=try scoped(path,root:vault())
        guard fm.fileExists(atPath:url.path) else{return ""}
        let note=try readNote(path),record=try readJSON(home.appendingPathComponent("maintenance/wiki.json"))
        guard record["path"] as? String==path,
              [record["sha256"] as? String,record["pendingSHA256"] as? String].contains(note["hash"] as? String),
              let text=note["text"] as? String,text.utf8.count<=48_000 else {
            throw failure("A página da wiki foi editada ou excede o lote suportado. Original preservado; consolidação pendente.")
        }
        return text
    }
    /// Compare coordinated bytes before replacing an owned page. A pending hash
    /// permits recovery after the file was committed but before its receipt.
    func publishMaintenanceWiki(_ text:String,settings:[String:Any],expected:String) throws -> String {
        let path=try maintenanceWikiPath(settings),url=try scoped(path,root:vault()),data=Data(text.utf8)
        let receiptURL=home.appendingPathComponent("maintenance/wiki.json"),sha=digest(data)
        guard data.count<=48_000 else{throw failure("A síntese excede o tamanho suportado da wiki; nenhuma página substituída.")}
        try fm.createDirectory(at:url.deletingLastPathComponent(),withIntermediateDirectories:true)
        let coordinator=NSFileCoordinator(filePresenter:nil)
        var coordinationError:NSError?,outcome:Result<Void,Error>?
        coordinator.coordinate(writingItemAt:url,options:.forReplacing,error:&coordinationError) { target in
            outcome=Result {
                guard try scoped(path,root:vault()).path==target.path else{throw failure("Destino da wiki mudou.")}
                let existing=fm.fileExists(atPath:target.path) ? try Data(contentsOf:target) : Data()
                guard existing==Data(expected.utf8) || existing==data else{throw failure("Edição concorrente na wiki preservada. Tente novamente após revisar.")}
                try writeJSON(["path":path,"sha256":digest(existing),"pendingSHA256":sha],receiptURL)
                if existing != data {try atomicWriteData(data,to:target,permissions:0o600)}
                guard try Data(contentsOf:target)==data else{throw failure("A wiki não confirmou os bytes gravados.")}
                try writeJSON(["path":path,"sha256":sha,"at":ISO8601DateFormatter().string(from:Date())],receiptURL)
            }
        }
        if let coordinationError {throw coordinationError}
        guard let outcome else{throw failure("A wiki não pôde ser coordenada.")};try outcome.get()
        return path
    }
}
