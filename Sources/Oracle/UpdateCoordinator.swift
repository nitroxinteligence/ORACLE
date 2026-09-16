import Foundation

/// One request per app, with nonblocking admission. The only retried code is
/// validation + lock acquisition; an admitted update body runs exactly once.
final class OracleUpdateCoordinator {
    static let operations:Set<String>=["check-only","check-apply","rollback-gbrain","rollback-skills","rollback-distribution"]
    static let terminalPhases:Set<String>=["complete","failed","cancelled","deferred","interrupted"]
    static let activePhases:Set<String>=["waiting","preparing","checking","downloading","verifying","applying","installing","indexing","ready"]
    static func missing(_ id:String)->[String:Any] {
        ["requestID":id,"operation":NSNull(),"requestNotFound":true,"phase":"interrupted","busy":false,"revision":0,"canCancelWait":false,
         "message":"Esta solicitação não está mais disponível. Verifique novamente."]
    }
    private final class Request {
        let id:String,operation:String,target:String,vaultIdentity:String
        let automatic:Bool,deadline:TimeInterval
        let previousGlobalID:String?
        var admitted=false
        var value:[String:Any]
        init(id:String,operation:String,target:String,vaultIdentity:String,automatic:Bool,deadline:TimeInterval,previousGlobalID:String?,value:[String:Any]) {
            self.id=id;self.operation=operation;self.target=target;self.vaultIdentity=vaultIdentity
            self.automatic=automatic;self.deadline=deadline;self.value=value
            self.previousGlobalID=previousGlobalID
        }
    }
    let home:URL
    private let mutex=NSRecursiveLock()
    private var requests=[String:Request]()
    private var activeID:String?,lastID:String?
    private var allowed=true
    private let makeCore:()throws->Core
    private let validate:(Core,String)throws->Void
    private let perform:((Core)throws->[String:Any])?
    private let schedule:(TimeInterval,@escaping()->Void)->Void
    private let now:()->TimeInterval
    private let waitLimit:TimeInterval,retryInterval:TimeInterval
    private let didFinish:([String:Any])->Void

    init(home:URL,waitLimit:TimeInterval=120,retryInterval:TimeInterval=0.5,
         makeCore:(()throws->Core)?=nil,validate:((Core,String)throws->Void)?=nil,
         perform:((Core)throws->[String:Any])?=nil,
         schedule:((TimeInterval,@escaping()->Void)->Void)?=nil,
         now:@escaping()->TimeInterval={ProcessInfo.processInfo.systemUptime},
         didFinish:@escaping([String:Any])->Void={_ in}) {
        self.home=home;self.waitLimit=waitLimit;self.retryInterval=retryInterval
        self.makeCore=makeCore ?? {try Core(home:home)}
        self.validate=validate ?? {try $0.validateUpdateAccess(operation:$1)}
        self.perform=perform;self.now=now;self.didFinish=didFinish
        let queue=DispatchQueue(label:"oracle.updates",qos:.userInitiated,autoreleaseFrequency:.workItem)
        self.schedule=schedule ?? {delay,work in queue.asyncAfter(deadline:.now()+delay,execute:work)}
    }
    deinit {
        if let activeID {OracleUpdatePriority.setPending(false,home:home,requestID:activeID)}
    }
    private func locked<T>(_ body:()throws->T) rethrows -> T {mutex.lock();defer{mutex.unlock()};return try body()}
    private func reply(_ value:[String:Any],accepted:Bool)->[String:Any] {
        ["accepted":accepted,"requestID":value["requestID"] ?? NSNull(),"operation":value["operation"] ?? NSNull(),"status":value]
    }
    private func external(_ owner:[String:Any],core:Core) throws -> [String:Any] {
        var status=try core.updateStatus(requestID:owner["requestID"] as? String)
        if status["scopeChanged"] as? Bool==true {return status}
        if status["requestNotFound"] as? Bool==true {
            status=owner;status["phase"]="preparing";status["revision"]=0
            status["message"]="Outra janela está preparando a atualização."
        }
        status["busy"] = !Self.terminalPhases.contains(status["phase"] as? String ?? "")
        status["canCancelWait"]=false
        return status
    }
    func start(operation:String,requestID:String=UUID().uuidString,automatic:Bool=false) throws -> [String:Any] {
        var enqueue:String?
        let response=try locked { ()throws->[String:Any] in
            guard Self.operations.contains(operation),UUID(uuidString:requestID) != nil,!automatic || operation=="check-only" else{throw failure("Pedido de atualização inválido.")}
            if let activeID,let active=requests[activeID] {return reply(active.value,accepted:false)}
            if let previous=requests[requestID] {return reply(previous.value,accepted:false)}
            let service=try makeCore()
            if let owner=service.liveUpdateIdentity() {return reply(try external(owner,core:service),accepted:false)}
            let recorded=try service.updateStatus(requestID:requestID)
            if recorded["requestNotFound"] as? Bool != true || recorded["scopeChanged"] as? Bool==true {
                var previous=recorded;previous["operation"]=previous["operation"] ?? operation
                return reply(previous,accepted:false)
            }
            let old=try service.updateStatus()
            let fields:Set<String>=["pendingUpdates","available","applicationUpdateAvailable","knownUpdate","checkedAt","skills_repository","gbrain_version","gbrain_rollback","skills_rollback","catalog_origins","availabilitySourceKey"]
            var value=old.filter{fields.contains($0.key)}
            value["requestID"]=requestID;value["operation"]=operation;value["revision"]=1
            value["phase"]=automatic ? "preparing":"waiting";value["busy"]=true;value["canCancelWait"] = !automatic
            value["message"]=automatic ? "Preparando a verificação das atualizações.":"Aguardando a operação atual para iniciar a atualização…"
            value["results"]=[[String:Any]]();value["completed"]=0;value["total"]=0
            let request=Request(id:requestID,operation:operation,target:try service.updateTargetIdentity(),
                                vaultIdentity:try service.updateTargetIdentity(includeSettings:false),automatic:automatic,
                                deadline:now()+waitLimit,previousGlobalID:old["requestID"] as? String,value:value)
            requests[requestID]=request;lastID=requestID
            if !allowed {end(request,phase:"cancelled",message:"A solicitação foi cancelada porque o Oracle está bloqueado.");return reply(request.value,accepted:false)}
            if automatic && (OracleUpdatePriority.hasPending(home:home) || service.operationIsRunning("updates") || service.operationIsRunning("installation")) {
                end(request,phase:"deferred",message:"Verificação adiada enquanto outra operação termina.")
                return reply(request.value,accepted:false)
            }
            activeID=requestID
            if !automatic {OracleUpdatePriority.setPending(true,home:home,requestID:requestID)}
            enqueue=requestID
            return reply(request.value,accepted:true)
        }
        if let enqueue {schedule(0){[weak self] in self?.attempt(enqueue)}}
        return response
    }
    /// Called while holding mutex. Pending states are local and never overwrite
    /// the shared progress file belonging to a different process.
    private func end(_ request:Request,phase:String,message:String) {
        request.value["phase"]=phase;request.value["message"]=message
        request.value["busy"]=false;request.value["canCancelWait"]=false
        request.value["revision"]=(request.value["revision"] as? Int ?? 0)+1
        if activeID==request.id {activeID=nil}
        OracleUpdatePriority.setPending(false,home:home,requestID:request.id)
    }
    func setAllowed(_ value:Bool) {
        locked{allowed=value}
        if !value {_=cancelWaiting(message:"A solicitação foi cancelada porque o Oracle está bloqueado.")}
    }
    @discardableResult
    func cancelWaiting(message:String="Espera cancelada. A atualização não foi iniciada.")->[String:Any]? {
        let result=locked { ()->[String:Any]? in
            guard let activeID,let request=requests[activeID],!request.admitted else{return nil}
            end(request,phase:"cancelled",message:message);return request.value
        }
        if let result {didFinish(result)}
        return result
    }
    func cancel(requestID:String) throws -> [String:Any] {
        guard UUID(uuidString:requestID) != nil else{throw failure("Pedido de atualização inválido.")}
        let result=locked { ()->[String:Any]? in
            guard activeID==requestID,let request=requests[requestID],!request.admitted,request.value["canCancelWait"] as? Bool==true else{return nil}
            end(request,phase:"cancelled",message:"Espera cancelada. A atualização não foi iniciada.")
            return request.value
        }
        if let result {didFinish(result);return result}
        return try status(requestID:requestID)
    }
    func status(requestID:String?=nil) throws -> [String:Any] {
        if let requestID,UUID(uuidString:requestID)==nil {throw failure("Pedido de atualização inválido.")}
        let service=try makeCore()
        if requestID==nil,locked({activeID==nil}),let owner=service.liveUpdateIdentity() {return try external(owner,core:service)}
        if let local=locked({(requestID ?? activeID ?? lastID).flatMap{requests[$0]}}) {
            if requestID==nil,locked({activeID==nil}) {
                let shared=try service.updateStatus()
                if let latestID=shared["requestID"] as? String,latestID != local.id,latestID != local.previousGlobalID {
                    return shared
                }
            }
            if try service.updateTargetIdentity(includeSettings:false) != local.vaultIdentity {
                if !locked({local.admitted}) {_=cancelWaiting(message:"A pasta selecionada mudou. Solicite uma nova verificação.")}
                if requestID==nil {return try service.updateStatus()}
                var missing=Self.missing(local.id);missing["scopeChanged"]=true;return missing
            }
            return locked{local.value}
        }
        return try service.updateStatus(requestID:requestID)
    }
    private func attempt(_ id:String) {
        var execution:OracleUpdateExecution?,service:Core?,completion:[String:Any]?,retry=false
        locked {
            guard activeID==id,let request=requests[id],!request.admitted else{return}
            do {
                guard allowed else{end(request,phase:"cancelled",message:"A solicitação foi cancelada porque o Oracle está bloqueado.");completion=request.value;return}
                let candidate=try makeCore()
                do {try validate(candidate,request.operation)}
                catch {end(request,phase:"cancelled",message:error.localizedDescription);completion=request.value;return}
                guard try candidate.updateTargetIdentity()==request.target else {
                    end(request,phase:"cancelled",message:"A configuração ou pasta mudou durante a espera. Solicite uma nova verificação.");completion=request.value;return
                }
                guard now()<request.deadline else{end(request,phase:"deferred",message:"A atualização não começou porque outra operação continua em andamento. Tente novamente.");completion=request.value;return}
                let admittedRevision=(request.value["revision"] as? Int ?? 1)+1
                let lease=try candidate.acquireUpdateExecution(operation:request.operation,requestID:id,revision:admittedRevision) {[weak self] value in
                    self?.locked {
                        guard let current=self?.requests[id],current.admitted else{return}
                        guard (value["revision"] as? Int ?? 0)>(current.value["revision"] as? Int ?? 0) else{return}
                        for (key,item) in value {current.value[key]=item}
                    }
                }
                do {
                    // Authorization and target may have changed during acquisition.
                    try validate(candidate,request.operation)
                    guard allowed,try candidate.updateTargetIdentity()==request.target else{throw failure("A configuração ou autorização mudou. Solicite uma nova verificação.")}
                } catch {
                    lease.close();end(request,phase:"cancelled",message:error.localizedDescription);completion=request.value;return
                }
                request.admitted=true;request.value["phase"]="preparing";request.value["canCancelWait"]=false
                request.value["revision"]=admittedRevision
                OracleUpdatePriority.setPending(false,home:home,requestID:id)
                service=candidate;execution=lease
            } catch let error as OracleOperationLockError where error.isBusy {
                for (key,item) in error.diagnostic {request.value[key]=item}
                if let candidate=try? makeCore(),let owner=candidate.liveUpdateIdentity() {
                    request.value["activeRequestID"]=owner["requestID"]
                    end(request,phase:"deferred",message:"Outra atualização já está em andamento. Acompanhe essa operação antes de iniciar outra.");completion=request.value
                } else if request.automatic {
                    end(request,phase:"deferred",message:"Verificação adiada enquanto outra operação termina.");completion=request.value
                } else {
                    request.value["phase"]="waiting";request.value["revision"]=(request.value["revision"] as? Int ?? 0)+1
                    request.value["message"]="Aguardando a operação atual para iniciar a atualização…";retry=true
                }
            } catch {
                if let error=error as? OracleOperationLockError {for (key,item) in error.diagnostic {request.value[key]=item}}
                end(request,phase:"failed",message:error.localizedDescription);completion=request.value
            }
        }
        if let completion {didFinish(completion)}
        if retry {schedule(retryInterval){[weak self] in self?.attempt(id)};return}
        guard let execution,let service else{return}
        var result:[String:Any]
        do {result=try service.performAdmittedUpdates(execution,perform:perform,validate:validate)}
        catch {
            result=execution.lastSnapshot()
            if !result.isEmpty,let projected=try? service.updateStatus(requestID:id),projected["requestNotFound"] as? Bool != true {result=projected}
            if result.isEmpty {result=["phase":"failed","message":error.localizedDescription]}
        }
        execution.close()
        let final=locked { ()->[String:Any] in
            guard let request=requests[id] else{return Self.missing(id)}
            for (key,item) in result where !["requestID","operation","revision"].contains(key) {request.value[key]=item}
            let phase=result["phase"] as? String ?? "failed"
            end(request,phase:Self.terminalPhases.contains(phase) ? phase:"failed",
                message:result["message"] as? String ?? "A atualização não confirmou a conclusão.")
            return request.value
        }
        didFinish(final)
    }
}
