import Foundation

extension Core {
    /// Reopen only the same folder previously selected through NSOpenPanel.
    /// A moved/stale bookmark requires selecting the folder again; it cannot widen access.
    func beginVaultAccess(_ root:URL) throws {
        if scopedVaultURL?.standardizedFileURL==root.standardizedFileURL{return}
        guard let text=config["vaultBookmark"] as? String,let data=Data(base64Encoded:text) else{return}
        var stale=false
        let resolved:URL
        do {resolved=try URL(resolvingBookmarkData:data,options:[.withSecurityScope,.withoutUI],relativeTo:nil,bookmarkDataIsStale:&stale)}
        catch {throw failure("A permissão para o Obsidian precisa ser renovada. Escolha a pasta novamente.")}
        guard !stale,resolved.standardizedFileURL==root.standardizedFileURL else{throw failure("A pasta do Obsidian mudou. Selecione-a novamente para renovar o acesso.")}
        scopedVaultURL?.stopAccessingSecurityScopedResource();scopedVaultURL=nil
        if resolved.startAccessingSecurityScopedResource(){scopedVaultURL=resolved}
    }
}
