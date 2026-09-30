import Foundation

struct OraclePreparedApplicationUpdate {
    let version:String
    let current:URL
    let replacement:URL
    let backup:URL
    let receipt:URL
    let original:URL
    let token:String

    func helperArguments(processID:Int32,launcher:URL=URL(fileURLWithPath:"/usr/bin/open")) throws -> [String] {
        guard let record=try OracleApplicationUpdateRecovery.read(receipt),record.token==token,
              record.phase == .prepared,record.current==current.path,record.original==original.path,
              record.replacement==replacement.path,record.backup==backup.path else{throw failure("A preparação da atualização perdeu o escopo seguro.")}
        guard OracleApplicationUpdateRecovery.version(at:replacement)==record.version,
              (!fm.fileExists(atPath:backup.path) || OracleApplicationUpdateRecovery.version(at:backup)==record.previousVersion) else{throw failure("A atualização ou sua versão de recuperação mudou desde a preparação.")}
        return ["-c",OracleApplicationUpdateRecovery.helperScript,"oracle-updater",String(processID),current.path,replacement.path,backup.path,receipt.path,token,original.path,launcher.path]
    }
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
        try OracleApplicationUpdateRecovery.recoverAbandoned(receipt:receipt,currentBundle:currentBundle)
    }

    func finalizeApplicationUpdateIfNeeded(currentBundle:URL=Bundle.main.bundleURL) {
        try? recoverPreparedApplicationUpdate(currentBundle:currentBundle)
    }

    func beginApplicationUpdateLaunch(currentBundle:URL=Bundle.main.bundleURL) throws -> OracleApplicationUpdateLaunch? {
        try OracleApplicationUpdateRecovery.beginLaunch(receipt:applicationUpdateStateRoot().appendingPathComponent("pending.json"),currentBundle:currentBundle)
    }

    func applicationUpdateLocalStateHealthy() -> Bool {
        let file=home.appendingPathComponent("config.json")
        guard home.resolvingSymlinksInPath().path==home.path,fm.isWritableFile(atPath:home.path) else{return false}
        if fm.fileExists(atPath:file.path) {
            guard file.resolvingSymlinksInPath().path==file.path,
                  let size=try? file.resourceValues(forKeys:[.fileSizeKey]).fileSize,size<=5_000_000,
                  (try? readJSON(file)) != nil else{return false}
        }
        return true
    }

    func confirmApplicationUpdateHealthy(token:String,currentBundle:URL=Bundle.main.bundleURL,interfaceReady:Bool) throws -> Bool {
        try OracleApplicationUpdateRecovery.confirmHealthy(receipt:applicationUpdateStateRoot().appendingPathComponent("pending.json"),currentBundle:currentBundle,
            token:token,interfaceReady:interfaceReady,localStateReady:applicationUpdateLocalStateHealthy())
    }

    func applicationUpdateInstallationOptions(currentBundle:URL=Bundle.main.bundleURL) -> [String:Any] {
        let parent=currentBundle.deletingLastPathComponent().standardizedFileURL
        let writable=fm.isWritableFile(atPath:parent.path) && parent.resolvingSymlinksInPath().path==parent.path
        return ["writable":writable,"currentDirectory":parent.path,
                "suggestedDirectory":fm.homeDirectoryForCurrentUser.appendingPathComponent("Applications").path,
                "message":writable ? "Atualizar o Oracle nesta pasta." : "Esta conta não pode atualizar o Oracle em \(parent.path). Escolha Aplicativos na sua pasta pessoal (~/Applications) ou outra pasta gravável. O aplicativo original será preservado. Para substituir a cópia em /Applications, peça a um administrador."]
    }

    func prepareApplicationUpdate(currentBundle:URL=Bundle.main.bundleURL,destinationDirectory:URL?=nil,network:UpdateNetwork=UpdateNetwork()) throws -> OraclePreparedApplicationUpdate {
        let updates=try acquireOperationLock("updates");defer{releaseOperationLock(updates)}
        let installation=try acquireOperationLock("installation");defer{releaseOperationLock(installation)}
        refreshConfig();try requireCapability(.configure)
        try recoverPreparedApplicationUpdate(currentBundle:currentBundle)
        guard currentBundle.pathExtension=="app",currentBundle.lastPathComponent.hasSuffix(".app") else{throw failure("Abra o Oracle a partir de um aplicativo instalado para atualizar automaticamente.")}
        let original=currentBundle.standardizedFileURL
        guard let previousVersion=OracleApplicationUpdateRecovery.version(at:original) else{throw failure("A identidade do Oracle instalado precisa de revisão antes de atualizar.")}
        let parent=(destinationDirectory ?? original.deletingLastPathComponent()).standardizedFileURL
        if destinationDirectory != nil && !fm.fileExists(atPath:parent.path) {
            try fm.createDirectory(at:parent,withIntermediateDirectories:true,attributes:[.posixPermissions:0o700])
        }
        guard parent.resolvingSymlinksInPath().path==parent.path,
              (try? parent.resourceValues(forKeys:[.isDirectoryKey]).isDirectory)==true,fm.isWritableFile(atPath:parent.path) else {
            throw failure("Esta conta não pode atualizar o Oracle em \(parent.path). Escolha Aplicativos na sua pasta pessoal (~/Applications) ou outra pasta gravável. O aplicativo original será preservado. Para substituir a cópia em /Applications, peça a um administrador.")
        }
        let target=parent==original.deletingLastPathComponent() ? original : parent.appendingPathComponent("Oracle.app")
        guard target==original || !fm.fileExists(atPath:target.path) else{throw failure("Já existe um aplicativo nesta pasta. Escolha uma pasta sem Oracle.app; a atualização preservará essa cópia e o Oracle original.")}
        let pendingReceipt=try applicationUpdateStateRoot().appendingPathComponent("pending.json")
        if let pending=try OracleApplicationUpdateRecovery.read(pendingReceipt) {
            guard pending.phase == .healthy || pending.phase == .rolledBack else{throw failure("A atualização anterior ainda aguarda saúde ou recuperação. Reabra o Oracle antes de preparar outra.")}
            try fm.removeItem(at:pendingReceipt)
        }
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
        do {
            if target != original {try fm.copyItem(at:original,to:backup)}
            let journal=OracleApplicationUpdateJournal(schemaVersion:2,token:token,version:version,previousVersion:previousVersion,
                current:target.path,original:original.path,replacement:replacement.path,backup:backup.path,phase:.prepared,launchPID:nil,
                changedAt:ISO8601DateFormatter().string(from:Date()))
            try OracleApplicationUpdateRecovery.write(journal,to:receipt)
        } catch {try? fm.removeItem(at:replacement);if target != original {try? fm.removeItem(at:backup)};throw error}
        return OraclePreparedApplicationUpdate(version:version,current:target,replacement:replacement,backup:backup,receipt:receipt,original:original,token:token)
    }
}
