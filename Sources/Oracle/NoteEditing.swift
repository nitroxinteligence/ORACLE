import Foundation

extension Core {
    // Only the explicitly selected vault is writable. The indexing mirror is never a destination.
    func editableURL(_ path: String) throws -> URL {
        let root = try vault().resolvingSymlinksInPath()
        guard !root.path.lowercased().contains("/library/application support/oraclegbrain/obsidian") else {
            throw failure("Selecione a pasta original no Obsidian para editar este documento.")
        }
        let url = try scoped(path, root: root)
        let values = try url.resourceValues(forKeys: [.isRegularFileKey, .fileSizeKey])
        guard url.pathExtension.lowercased() == "md", values.isRegularFile == true,
              (values.fileSize ?? 0) <= 2_000_000 else { throw failure("Escolha um arquivo Markdown de até 2 MB.") }
        return url
    }
    func draftURL(_ path: String) throws -> URL {
        let root = try vault().resolvingSymlinksInPath().path
        return home.appendingPathComponent("drafts/\(digest(Data((root+"/"+path).utf8))).json")
    }
    func saveDraft(path: String, original: String, text: String) throws -> [String:Any] {
        _ = try editableURL(path)
        guard text.utf8.count <= 2_000_000, original.count == 64 else { throw failure("Não foi possível guardar este rascunho.") }
        let updated = ISO8601DateFormatter().string(from: Date())
        try writeJSON(["path":path,"vault":try vault().resolvingSymlinksInPath().path,
                       "originalHash":original,"text":text,"updatedAt":updated], try draftURL(path))
        return ["saved":true,"updatedAt":updated]
    }
    func readDraft(_ path: String) throws -> [String:Any]? {
        _ = try editableURL(path)
        guard let value = try? readJSON(draftURL(path)), value["path"] as? String == path,
              value["vault"] as? String == (try vault().resolvingSymlinksInPath().path) else { return nil }
        return value
    }
    func discardDraft(_ path: String) throws {
        _ = try editableURL(path)
        let url = try draftURL(path)
        if fm.fileExists(atPath:url.path) { try fm.removeItem(at:url) }
    }
    func readEditableNote(_ path: String) throws -> [String:Any] {
        var result = try readNote(path)
        result["editable"] = (try? editableURL(path)) != nil
        if let draft = try? readDraft(path) { result["draft"] = draft }
        return result
    }
    func saveNote(path: String, original: String, text: String) throws -> [String:Any] {
        // Keep the proposal even when another writer currently owns the vault.
        _ = try saveDraft(path:path,original:original,text:text)
        return try withVaultWrite {
            let result = try saveNoteLocked(path:path,original:original,text:text)
            if result["status"] as? String == "saved" { notifyVaultChanged(reason:"editor-save") }
            return result
        }
    }
    private func saveNoteLocked(path: String, original: String, text: String) throws -> [String:Any] {
        let operation = try acquireOperationLock("editor")
        defer { releaseOperationLock(operation) }
        let url = try editableURL(path)
        guard text.utf8.count <= 2_000_000, original.count == 64 else { throw failure("O documento deve ter até 2 MB.") }
        _ = try saveDraft(path:path,original:original,text:text)
        let coordinator = NSFileCoordinator(filePresenter:nil)
        var coordinationError: NSError?
        var outcome: Result<[String:Any],Error>?
        coordinator.coordinate(writingItemAt:url,options:.forReplacing,error:&coordinationError) { destination in
            outcome = Result {
                // Re-resolve scope after acquiring coordinated access, and compare the full bytes.
                guard try editableURL(path).path == destination.path else { throw failure("A pasta do documento mudou. Abra-o novamente.") }
                let current = try Data(contentsOf:destination)
                guard digest(current) == original else {
                    return ["status":"conflict","current":try readNote(path),"draftSaved":true]
                }
                guard String(data:current,encoding:.utf8) != nil else { throw failure("Este documento não está em UTF-8. Abra-o no Obsidian.") }
                let replacement = Data(text.utf8)
                if replacement == current { try discardDraft(path); return ["status":"saved","document":try readNote(path)] }
                let backupID = UUID().uuidString
                let backup = home.appendingPathComponent("editor-recovery/\(backupID).md")
                try fm.createDirectory(at:backup.deletingLastPathComponent(),withIntermediateDirectories:true,attributes:[.posixPermissions:0o700])
                try current.write(to:backup,options:.atomic)
                try fm.setAttributes([.posixPermissions:0o600],ofItemAtPath:backup.path)
                try writeJSON(["path":path,"vault":try vault().path,"hash":original,"createdAt":ISO8601DateFormatter().string(from:Date())],backup.deletingPathExtension().appendingPathExtension("json"))
                // Catch uncoordinated writers that changed the file during backup preparation.
                guard digest(try Data(contentsOf:destination)) == original else {
                    return ["status":"conflict","current":try readNote(path),"draftSaved":true]
                }
                let permissions = try fm.attributesOfItem(atPath:destination.path)[.posixPermissions]
                try replacement.write(to:destination,options:.atomic)
                if let permissions { try fm.setAttributes([.posixPermissions:permissions],ofItemAtPath:destination.path) }
                let verified = try readNote(path)
                guard verified["hash"] as? String == digest(replacement) else {
                    return ["status":"conflict","current":verified,"draftSaved":true]
                }
                try discardDraft(path)
                return ["status":"saved","document":verified,"recoveryID":backupID]
            }
        }
        if let coordinationError { throw coordinationError }
        guard let outcome else { throw failure("Não foi possível acessar este arquivo. Seu rascunho está guardado.") }
        return try outcome.get()
    }
}
