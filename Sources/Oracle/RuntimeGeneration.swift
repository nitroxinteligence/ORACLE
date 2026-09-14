import Foundation

extension Core {
    func runRuntimeGeneration(_ request:[String:Any]) throws -> [String:Any] {
        let configFD=Darwin.open(home.appendingPathComponent("config.lock").path,O_CREAT|O_RDWR|O_CLOEXEC|O_NOFOLLOW,S_IRUSR|S_IWUSR)
        guard configFD>=0 else{throw failure("Não foi possível preservar as preferências durante a transação.")};defer{Darwin.close(configFD)}
        guard flock(configFD,LOCK_EX|LOCK_NB)==0 else{throw failure("Preferências ocupadas; tente novamente.")};defer{flock(configFD,LOCK_UN)}
        // The immutable bundled adapter also recovers an interrupted profile when
        // the current runtime pointer or profile directory has not been activated.
        var environment=engineEnvironment();environment.removeValue(forKey:"ORACLE_CANCEL_FILE")
        let result=try runProcess(bundledEngineResources().appendingPathComponent("oracle-gbrain-read"),[],cwd:home,environment:environment,input:jsonData(request),timeout:600)
        guard let line=result.output.split(separator:"\n").last(where:{$0.hasPrefix("{")}),
              let response=try JSONSerialization.jsonObject(with:Data(line.utf8)) as? [String:Any],result.code==0,response["ok"] as? Bool==true,
              let value=response["value"] as? [String:Any],value["complete"] as? Bool==true else{throw failure("A transação do motor não foi concluída. Reabra o Oracle para recuperar a geração anterior; notas canônicas preservadas.")}
        return value
    }
    func recoverRuntimeGenerationIfNeeded() throws -> [String:Any] {
        let transition=try updatePath("runtime/transition.json")
        guard fm.fileExists(atPath:transition.path) else{return ["status":"no_pending_transaction","complete":true]}
        let installation=try acquireOperationLock("installation");defer{releaseOperationLock(installation)}
        let setup=try acquireOperationLock("setup");defer{releaseOperationLock(setup)}
        let engine=try acquireOperationLock("gbrain");defer{releaseOperationLock(engine)}
        // Restoring the known interrupted generation is recovery, not a new
        // purchase/consent or a reason to delete files after license expiration.
        return try runRuntimeGeneration(["operation":"runtime-generation","action":"recover"])
    }
    func validateDownloadedRuntime(_ executable:URL,release:[String:Any]) throws {
        if OfficialRuntimeRelease.valid(release) {
            // Integrity/provenance is established by the official HTTPS asset digest
            // before execution. Do not strip quarantine or forge a distributor signature.
            // The official arm64 asset is a thin 64-bit Mach-O. Inspect its
            // header without requiring Xcode/Command Line Tools on user Macs.
            let file=try FileHandle(forReadingFrom:executable);defer{try? file.close()}
            guard try file.read(upToCount:8)==Data([0xcf,0xfa,0xed,0xfe,0x0c,0x00,0x00,0x01]) else{throw failure("O arquivo do Second Brain não é compatível com este Mac.")}
            return
        }
        guard Bundle.main.bundleIdentifier != nil,Bundle.main.bundleIdentifier?.hasSuffix(".validation") != true else{return}
        guard let team=release["distribution_signing_team"] as? String,team.range(of:"^[A-Z0-9]{10}$",options:.regularExpression) != nil else{throw failure("O runtime baixado ainda não foi homologado para Gatekeeper. O mantenedor precisa fornecer um pacote assinado.")}
        let environment=["PATH":"/usr/bin:/bin","HOME":executable.deletingLastPathComponent().path]
        let signature=try runProcess(URL(fileURLWithPath:"/usr/bin/codesign"),["--verify","--strict","-R=anchor apple generic and certificate leaf[subject.OU] = \""+team+"\"",executable.path],cwd:home,environment:environment,timeout:30)
        guard signature.code==0 else{throw failure("A assinatura do runtime não pertence ao distribuidor homologado.")}
        let assessment=try runProcess(URL(fileURLWithPath:"/usr/sbin/spctl"),["--assess","--type","execute",executable.path],cwd:home,environment:environment,timeout:60)
        guard assessment.code==0 else{throw failure("Gatekeeper não aprovou o runtime. O aplicativo preservou a versão anterior; não removeu a quarentena.")}
    }
}
