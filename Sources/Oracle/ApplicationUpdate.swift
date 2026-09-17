import Foundation

struct OraclePreparedApplicationUpdate {
    let version:String
    let current:URL
    let replacement:URL
    let backup:URL
    let receipt:URL
}

extension Core {
    private func applicationUpdateStateRoot() throws -> URL {
        let root=try updatePath("application")
        try fm.createDirectory(at:root,withIntermediateDirectories:true,attributes:[.posixPermissions:0o700])
        return root
    }

    private func validateApplicationBundle(_ app:URL,expectedVersion:String) throws {
        let values=try app.resourceValues(forKeys:[.isDirectoryKey,.isSymbolicLinkKey])
        guard values.isDirectory==true,values.isSymbolicLink != true,app.pathExtension=="app" else{throw failure("O pacote baixado não contém um aplicativo Oracle válido.")}
        let infoURL=app.appendingPathComponent("Contents/Info.plist")
        let info=try PropertyListSerialization.propertyList(from:Data(contentsOf:infoURL),options:[],format:nil) as? [String:Any]
        guard info?["CFBundleIdentifier"] as? String=="com.oraclecompanion.macos",
              info?["CFBundleShortVersionString"] as? String==expectedVersion,
              info?["CFBundleExecutable"] as? String=="Oracle" else{throw failure("A identidade do aplicativo baixado não corresponde ao Oracle publicado.")}
        let manifest=try readJSON(app.appendingPathComponent("Contents/Resources/build-manifest.json"))
        guard manifest["product"] as? String=="oracle-macos",manifest["version"] as? String==expectedVersion,
              manifest["dirty"] as? Bool==false,let commit=manifest["commit"] as? String,
              commit.range(of:"^[a-f0-9]{40}$",options:.regularExpression) != nil else{throw failure("O build baixado não possui proveniência válida.")}
        var files=0,total:Int64=0
        guard let enumerator=fm.enumerator(at:app,includingPropertiesForKeys:[.isSymbolicLinkKey,.isRegularFileKey,.fileSizeKey],options:[]) else{throw failure("Não foi possível conferir o aplicativo baixado.")}
        for case let url as URL in enumerator {
            let value=try url.resourceValues(forKeys:[.isSymbolicLinkKey,.isRegularFileKey,.fileSizeKey])
            guard value.isSymbolicLink != true else{throw failure("O aplicativo baixado contém links simbólicos não permitidos.")}
            if value.isRegularFile==true {files+=1;total+=Int64(value.fileSize ?? 0)}
            guard files<=5000,total<=1_000_000_000 else{throw failure("O aplicativo baixado excede os limites de instalação.")}
        }
        let environment=["PATH":"/usr/bin:/bin:/usr/sbin:/sbin","HOME":home.path]
        let signature=try runProcess(URL(fileURLWithPath:"/usr/bin/codesign"),["--verify","--deep","--strict",app.path],cwd:app.deletingLastPathComponent(),environment:environment,timeout:90,operation:"A verificação do Oracle")
        guard signature.code==0 else{throw failure("A assinatura interna do aplicativo baixado não passou na verificação local.")}
        let executable=app.appendingPathComponent("Contents/MacOS/Oracle")
        let architecture=try runProcess(URL(fileURLWithPath:"/usr/bin/lipo"),["-archs",executable.path],cwd:app.deletingLastPathComponent(),environment:environment,timeout:30,operation:"A verificação da arquitetura")
        guard architecture.code==0,architecture.output.trimmingCharacters(in:.whitespacesAndNewlines)=="arm64" else{throw failure("A atualização não é compatível com este build Apple Silicon do Oracle.")}
    }

    private func recoverPreparedApplicationUpdate(currentBundle:URL) throws {
        let receipt=try applicationUpdateStateRoot().appendingPathComponent("pending.json")
        guard fm.fileExists(atPath:receipt.path),let pending=try? readJSON(receipt),
              let expected=pending["version"] as? String,OracleApplicationRelease.validVersion(expected),
              let targetPath=pending["current"] as? String,let replacementPath=pending["replacement"] as? String,
              let backupPath=pending["backup"] as? String else{return}
        let target=URL(fileURLWithPath:targetPath).standardizedFileURL,replacement=URL(fileURLWithPath:replacementPath).standardizedFileURL,backup=URL(fileURLWithPath:backupPath).standardizedFileURL
        let parent=target.deletingLastPathComponent()
        guard target.path==currentBundle.standardizedFileURL.path,
              replacement.deletingLastPathComponent().path==parent.path,backup.deletingLastPathComponent().path==parent.path,
              replacement.lastPathComponent.hasPrefix(".Oracle.update-"),backup.lastPathComponent.hasPrefix(".Oracle.backup-") else{return}
        let installed=OracleApplicationRelease.installedVersion(fallback:"")
        if installed==expected {
            if fm.fileExists(atPath:backup.path){try? fm.removeItem(at:backup)}
            if fm.fileExists(atPath:replacement.path){try? fm.removeItem(at:replacement)}
            try? fm.removeItem(at:receipt)
        } else if !fm.fileExists(atPath:backup.path) {
            // Preparation was abandoned before the running app exited. It is safe
            // to discard only the hidden sibling created by this updater.
            if fm.fileExists(atPath:replacement.path){try? fm.removeItem(at:replacement)}
            try? fm.removeItem(at:receipt)
        }
    }

    func finalizeApplicationUpdateIfNeeded(currentBundle:URL=Bundle.main.bundleURL) {
        try? recoverPreparedApplicationUpdate(currentBundle:currentBundle)
    }

    func prepareApplicationUpdate(currentBundle:URL=Bundle.main.bundleURL,network:UpdateNetwork=UpdateNetwork()) throws -> OraclePreparedApplicationUpdate {
        let updates=try acquireOperationLock("updates");defer{releaseOperationLock(updates)}
        let installation=try acquireOperationLock("installation");defer{releaseOperationLock(installation)}
        refreshConfig();try requireCapability(.configure)
        try recoverPreparedApplicationUpdate(currentBundle:currentBundle)
        guard currentBundle.pathExtension=="app",currentBundle.lastPathComponent.hasSuffix(".app") else{throw failure("Abra o Oracle a partir de um aplicativo instalado para atualizar automaticamente.")}
        let parent=currentBundle.deletingLastPathComponent().standardizedFileURL
        guard fm.isWritableFile(atPath:parent.path) else{throw failure("O Oracle está em uma pasta sem permissão de atualização. Mova-o para Aplicativos uma vez e tente novamente.")}
        guard let row=checkOracleApplication(network:network),row["status"] as? String=="install_available",
              let version=row["version"] as? String,OracleApplicationRelease.validVersion(version),
              let text=row["downloadURL"] as? String,let expected=row["downloadSHA256"] as? String,
              expected.hasPrefix("sha256:"),let bytes=DistributionManifest.integer(row["downloadBytes"],minimum:1,maximum:500_000_000) else{
            throw failure("Não há uma atualização instalável do Oracle disponível agora.")
        }
        let archive=try network.fetch(text,limit:500_000_000)
        guard archive.count==bytes,digest(archive)==String(expected.dropFirst(7)) else{throw failure("A atualização baixada não corresponde ao checksum publicado.")}
        let token=UUID().uuidString.lowercased(),state=try applicationUpdateStateRoot(),stage=state.appendingPathComponent("staging/"+token),expanded=stage.appendingPathComponent("expanded")
        try fm.createDirectory(at:expanded,withIntermediateDirectories:true,attributes:[.posixPermissions:0o700])
        let zip=stage.appendingPathComponent("Oracle.zip");try archive.write(to:zip,options:.withoutOverwriting)
        let environment=["PATH":"/usr/bin:/bin:/usr/sbin:/sbin","HOME":home.path]
        let extraction=try runProcess(URL(fileURLWithPath:"/usr/bin/ditto"),["-x","-k",zip.path,expanded.path],cwd:stage,environment:environment,timeout:180,operation:"A preparação da atualização")
        guard extraction.code==0 else{throw failure("Não foi possível preparar o aplicativo baixado.")}
        let top=try fm.contentsOfDirectory(at:expanded,includingPropertiesForKeys:[.isDirectoryKey,.isSymbolicLinkKey],options:[])
        guard top.count==1,top[0].lastPathComponent=="Oracle.app" else{throw failure("A atualização publicada possui uma estrutura inesperada.")}
        let candidate=top[0];try validateApplicationBundle(candidate,expectedVersion:version)
        let replacement=parent.appendingPathComponent(".Oracle.update-"+token+".app"),backup=parent.appendingPathComponent(".Oracle.backup-"+token+".app")
        guard !fm.fileExists(atPath:replacement.path),!fm.fileExists(atPath:backup.path) else{throw failure("Já existe uma preparação de atualização com o mesmo identificador.")}
        try fm.copyItem(at:candidate,to:replacement)
        do {try validateApplicationBundle(replacement,expectedVersion:version)}
        catch {try? fm.removeItem(at:replacement);throw error}
        let receipt=state.appendingPathComponent("pending.json")
        guard !fm.fileExists(atPath:receipt.path) else{try? fm.removeItem(at:replacement);throw failure("Há uma atualização preparada anteriormente. Reabra o Oracle e tente novamente.")}
        try writeJSON(["schema_version":1,"version":version,"current":currentBundle.standardizedFileURL.path,
                       "replacement":replacement.path,"backup":backup.path,"prepared_at":ISO8601DateFormatter().string(from:Date())],receipt)
        return OraclePreparedApplicationUpdate(version:version,current:currentBundle.standardizedFileURL,replacement:replacement,backup:backup,receipt:receipt)
    }
}
