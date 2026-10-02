import AppKit

extension App {
    func desktopPluginExportScope()->OracleDesktopPluginExportScope {
        core.refreshConfig()
        return OracleDesktopPluginExportScope(state:core.home.path,vault:core.config["vault"] as? String ?? "",revision:core.config["vaultSelectionRevision"] as? String ?? "legacy")
    }
    func cancelDesktopPluginExport(requestID:String)->Bool {
        guard requestMethods[requestID]=="exportSnapshot",let panel=pluginExportPanels[requestID] else{return false}
        panel.cancel(nil);return true
    }
    /// Invoked only after the shared application-lock and active-license gates.
    func handleDesktopPluginExport(_ id:String,method:String,params:[String:Any])->Bool {
        guard pluginReply != nil,["exportSnapshotBegin","exportSnapshotChunk","exportSnapshotDiscard","exportSnapshot"].contains(method) else{return false}
        do {
            let scope=desktopPluginExportScope(),now=Date()
            pluginExports=pluginExports.filter{$0.value.scope==scope && now.timeIntervalSince($0.value.createdAt)<900}
            if method=="exportSnapshotBegin" {
                guard pluginExports.count<4 else{throw OracleDesktopPluginExportBuffer.error("Aguarde a exportação atual antes de iniciar outra imagem.")}
                let token=UUID().uuidString.lowercased();pluginExports[token]=OracleDesktopPluginExportBuffer(scope:scope)
                reply(id,["exportID":token,"maximumBytes":OracleDesktopPluginExportBuffer.maximumBytes,"maximumChunkBytes":OracleDesktopPluginExportBuffer.maximumChunkBytes]);return true
            }
            guard let token=params["exportID"] as? String,UUID(uuidString:token) != nil else{throw OracleDesktopPluginExportBuffer.error("Identificador de exportação inválido.")}
            if method=="exportSnapshotDiscard" {pluginExports.removeValue(forKey:token);reply(id,true);return true}
            guard let buffer=pluginExports[token] else{throw OracleDesktopPluginExportBuffer.error("A imagem de exportação expirou. Gere novamente a imagem atual.")}
            if method=="exportSnapshotChunk" {
                guard let index=params["index"] as? Int,let base64=params["base64"] as? String else{throw OracleDesktopPluginExportBuffer.error("Bloco de exportação inválido.")}
                try buffer.append(base64:base64,index:index,scope:scope)
                reply(id,["accepted":true]);return true
            }
            let png=try buffer.finish(scope:scope);pluginExports.removeValue(forKey:token)
            let panel=NSSavePanel();panel.nameFieldStringValue="Oracle-universo.png";panel.allowedContentTypes=[.png]
            panel.message="Exportar a visão atual do Oracle como imagem."
            pluginExportPanels[id]=panel
            presentPanel(panel) {response in
                self.pluginExportPanels.removeValue(forKey:id)
                guard response == .OK,let destination=panel.url else{self.reply(id,NSNull());return}
                guard !self.locked,core.activeLicense() != nil,self.desktopPluginExportScope()==scope else{self.reply(id,nil,"O acesso ou a pasta mudou. A imagem não foi salva.");return}
                self.queue.async {
                    do {try atomicWriteData(png,to:destination);DispatchQueue.main.async{self.reply(id,destination.path)}}
                    catch {DispatchQueue.main.async{self.reply(id,nil,error.localizedDescription)}}
                }
            }
        } catch {reply(id,nil,error.localizedDescription)}
        return true
    }
}
