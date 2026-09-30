import Foundation

/// New onboarding plans prepare a single local service for all Codex chats.
/// Installation readiness never grants capture, provider access or hook trust.
extension Core {
    private func aiMemoryServiceState() throws -> URL {
        let state=try scoped("ai-memory-service",root:home)
        try OracleAIMemoryProvisioning.safe(state)
        let destination=state.standardizedFileURL.resolvingSymlinksInPath().path
        var roots=[try vault(),home.appendingPathComponent("gbrain"),home.appendingPathComponent("oracle-workspace"),home.appendingPathComponent("codex-workspace")]
        for key in ["gbrainProfile","gbrainWorkspace"] {
            if let path=config[key] as? String {roots.append(URL(fileURLWithPath:path))}
        }
        for root in roots {
            let path=root.standardizedFileURL.resolvingSymlinksInPath().path
            guard destination != path,!destination.hasPrefix(path+"/"),!path.hasPrefix(destination+"/") else {
                throw failure("O serviço de memória precisa de estado próprio fora do vault e dos workspaces. Preserve os arquivos e revise o destino.")
            }
        }
        return state
    }
    private func aiMemoryServiceHooks(state:URL) throws -> AIMemoryServiceHooks {
        if let fixture=try OracleAIMemoryServiceTestDriver.hooksIfAllowed(profile:home,state:state) {return fixture}
        guard !ProcessInfo.processInfo.arguments.contains(where:{$0.hasPrefix("--self-test")}),
              distributionHostHome().path==fm.homeDirectoryForCurrentUser.path else {
            throw failure("Testes do serviço exigem um driver sintético explícito. Nenhum LaunchAgent real foi registrado.")
        }
        return OracleAIMemoryServiceProcess.nativeHooks(profile:home)
    }
    @discardableResult
    func prepareAIMemoryService(plan:[String:Any]) throws -> [String:Any] {
        refreshConfig();try requireCapability(.configure)
        let lock=try acquireOperationLock("ai-memory-service");defer{releaseOperationLock(lock)}
        return try withMemoryPortabilitySelection {
            refreshConfig();try requireCapability(.configure);try checkOnboardingCancellation()
            let runtime=try verifyAIMemoryRuntime(plan:plan),state=try aiMemoryServiceState()
            let agents=distributionHostHome().appendingPathComponent("Library/LaunchAgents")
            let hooks=try aiMemoryServiceHooks(state:state)
            _=try OracleAIMemoryService.prepare(state:state,runtime:runtime,launchAgents:agents,hooks:hooks)
            try checkOnboardingCancellation()
            return try OracleAIMemoryService.verify(state:state,runtime:runtime,hooks:hooks)
        }
    }
    func verifyAIMemoryService(plan:[String:Any]) throws -> [String:Any] {
        try withMemoryPortabilitySelection {
            let runtime=try verifyAIMemoryRuntime(plan:plan),state=try aiMemoryServiceState()
            return try OracleAIMemoryService.verify(state:state,runtime:runtime,hooks:aiMemoryServiceHooks(state:state))
        }
    }
    func aiMemoryServiceCodexDescriptor(plan:[String:Any]) throws -> [String:Any] {
        try OracleAIMemoryService.descriptor(verifyAIMemoryService(plan:plan))
    }
}
