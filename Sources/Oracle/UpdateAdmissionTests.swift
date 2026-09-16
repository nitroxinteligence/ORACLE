import Foundation
import Darwin

/// A controllable scheduler exercises the actual coordinator without timers,
/// network, an installed app, real licenses, or the user's profile.
private final class UpdateTestClock {
    var time:TimeInterval=0
    var work=[(TimeInterval,()->Void)]()
    func schedule(_ delay:TimeInterval,_ body:@escaping()->Void) {work.append((time+delay,body))}
    func next() throws {
        guard !work.isEmpty else{throw failure("Expected an admission callback")}
        let item=work.removeFirst();time=item.0;item.1()
    }
    func drain() throws {
        var remaining=100
        while !work.isEmpty {remaining-=1;guard remaining>0 else{throw failure("Admission retry was not bounded")};try next()}
    }
}

func runUpdateAdmissionTests() throws {
    let base=try oracleTestDirectory("update-admission")
    defer{try? fm.removeItem(at:base)}
    var checks=0
    func expect(_ value:Bool,_ text:String)throws {guard value else{throw failure(text)};checks+=1;print("PASS "+text)}
    func refuses(_ text:String,_ body:()throws->Void)throws {do{try body()}catch{checks+=1;print("PASS "+text);return};throw failure("Accepted: "+text)}
    func fixture(_ label:String)throws->Core {
        let directory=base.appendingPathComponent(label),vault=directory.appendingPathComponent("vault")
        try fm.createDirectory(at:vault,withIntermediateDirectories:true)
        let core=try Core(home:directory.appendingPathComponent("state"))
        core.config["vault"]=vault.path;try core.persist();return core
    }
    func assertFree(_ core:Core,_ names:[String])throws {
        for name in names {let fd=try core.acquireOperationLock(name);core.releaseOperationLock(fd)}
    }
    func value(_ response:[String:Any])->[String:Any] {response["status"] as? [String:Any] ?? [:]}

    // Real kernel descriptors, including all partial-admission failure points.
    for (distribution,names) in [(true,["updates","installation"]),(false,["updates","setup","gbrain"])] {
        for heldName in names {
            let core=try fixture("order-\(distribution)-\(heldName)"),held=try core.acquireOperationLock(heldName)
            do {
                defer{core.releaseOperationLock(held)}
                do {_=try OracleUpdateExecution(core:core,requestID:UUID().uuidString,operation:"check-only",distribution:distribution);throw failure("Lock was bypassed")}
                catch let error as OracleOperationLockError {try expect(error.isBusy && error.name==heldName,"typed contention at \(heldName), distribution=\(distribution)")}
                try assertFree(core,names.filter{$0 != heldName})
                try expect(true,"partial admission releases all earlier descriptors at \(heldName)")
            }
            try assertFree(core,names)
        }
    }

    let core=try fixture("requests"),clock=UpdateTestClock()
    let statusURL=core.home.appendingPathComponent("updates/status.json")
    try writeJSON(["phase":"failed","message":"old error","results":[["id":"gbrain","status":"error"]],
                   "pendingUpdates":[["id":"skills","status":"available"]],"checkedAt":"2026-01-01T00:00:00Z",
                   "availabilitySourceKey":core.updateSourceKey()],statusURL)
    let oldStatus=try Data(contentsOf:statusURL)
    var runs=0,finishes=0,owner:OracleUpdateExecution?
    var coordinator:OracleUpdateCoordinator!
    let second=OracleUpdateCoordinator(home:core.home,schedule:clock.schedule,now:{clock.time})
    coordinator=OracleUpdateCoordinator(home:core.home,waitLimit:2,retryInterval:0.5,
        validate:{_,_ in},perform:{ service in
            runs+=1;owner=service.updateExecution
            try service.recordUpdate("checking","Synthetic check")
            let busy=try Core(home:core.home).updateStatus()
            try expect(busy["busy"] as? Bool==true && busy["requestID"] as? String==owner?.requestID,"other instance sees actual owner and live progress")
            let before=try Data(contentsOf:statusURL)
            try refuses("non-owner cannot overwrite active progress"){try Core(home:core.home).recordUpdate("failed","refused competitor")}
            try expect(try Data(contentsOf:statusURL)==before,"refused competitor preserves exact owner status bytes")
            let attached=try second.start(operation:"check-apply",requestID:UUID().uuidString)
            try expect(attached["accepted"] as? Bool==false && attached["requestID"] as? String==owner?.requestID && attached["operation"] as? String=="check-only","second instance attaches real request and operation instead of installing")
            let cancellation=try coordinator.cancel(requestID:owner!.requestID)
            try expect(cancellation["canCancelWait"] as? Bool==false && cancellation["phase"] as? String != "cancelled","cancel after admission cannot cancel running effects")
            try service.recordUpdate("complete","Synthetic verified check",results:[["id":"skills","status":"current"]])
            return try service.updateStatus()
        },schedule:clock.schedule,now:{clock.time},didFinish:{_ in finishes+=1})
    let held=try core.acquireOperationLock("updates"),id=UUID().uuidString
    let initial=try coordinator.start(operation:"check-only",requestID:id)
    try expect(initial["accepted"] as? Bool==true && value(initial)["phase"] as? String=="waiting" && value(initial)["results"] as? [[String:Any]] != nil && value(initial)["error"]==nil,"start immediately exposes a fresh waiting request, never old failure")
    try expect(try Data(contentsOf:statusURL)==oldStatus,"waiting does not write shared progress")
    try expect(OracleUpdatePriority.hasPending(home:core.home),"manual wait defers new automatic work in this process")
    let duplicate=try coordinator.start(operation:"check-apply",requestID:UUID().uuidString)
    try expect(duplicate["accepted"] as? Bool==false && duplicate["requestID"] as? String==id && duplicate["operation"] as? String=="check-only","duplicate click attaches actual check instead of requesting installation")
    let auto=try second.start(operation:"check-only",requestID:UUID().uuidString,automatic:true)
    try expect(auto["accepted"] as? Bool==false && value(auto)["phase"] as? String=="deferred","automatic check defers without error or another job")
    try clock.next()
    let waiting=try coordinator.status(requestID:id)
    try expect(waiting["phase"] as? String=="waiting" && waiting["blockedOn"] as? String=="updates" && (waiting["revision"] as? Int ?? 0)>(value(initial)["revision"] as? Int ?? 0),"busy resource retries admission with typed reason and increasing revision")
    try assertFree(core,["setup","gbrain","installation"])
    try expect(try core.performMaintenance{["status":"verified","complete":true]}["status"] as? String=="deferred","pending update defers automatic maintenance before any receipt")
    try refuses("CLI sync honors updates before attempting setup"){_=try core.syncGBrainVaultWithAdmission()}
    try assertFree(core,["setup"])
    try refuses("direct update entrypoint cannot reenter a held updates lock"){_=try core.performUpdates(operation:"check-only")}
    core.releaseOperationLock(held)
    try clock.drain()
    let complete=try coordinator.status(requestID:id)
    try expect(runs==1 && finishes==1 && complete["phase"] as? String=="complete" && complete["busy"] as? Bool==false,"release admits exactly one execution and one completion")
    try expect(!OracleUpdatePriority.hasPending(home:core.home),"completion releases only the scheduling preference")
    try expect(complete["checkedAt"] as? String != nil && complete["knownUpdate"] as? Bool==false,"verified result reconciles availability and keeps checked time")
    try assertFree(core,["updates","installation","setup","gbrain"])
    try expect(core.liveUpdateIdentity()==nil,"completed updater is not reported busy by stale metadata")
    let persisted=try Data(contentsOf:statusURL)
    try refuses("late download callback cannot publish after descriptor release"){try core.recordUpdate("downloading","late callback",owner:owner)}
    try expect(try Data(contentsOf:statusURL)==persisted,"late progress preserves terminal receipt bytes")
    try expect(try coordinator.start(operation:"check-only",requestID:id)["accepted"] as? Bool==false && runs==1,"replayed UUID does not execute again in same app")
    try expect(try second.start(operation:"check-only",requestID:id)["accepted"] as? Bool==false,"replayed UUID survives a second coordinator through its own receipt")
    let absent=try second.status(requestID:UUID().uuidString)
    try expect(absent["requestNotFound"] as? Bool==true && absent["busy"] as? Bool==false && absent["phase"] as? String=="interrupted","unknown UUID never borrows an old global result")

    let nextID=UUID().uuidString
    let later=OracleUpdateCoordinator(home:core.home,validate:{_,_ in},perform:{service in
        try service.recordUpdate("complete","Second instance finished",results:[["id":"skills","status":"current"]])
        return try service.updateStatus()
    },schedule:clock.schedule,now:{clock.time})
    _=try later.start(operation:"check-only",requestID:nextID);try clock.drain()
    try expect(try coordinator.status(requestID:nextID)["requestID"] as? String==nextID,"request poll follows the second instance to completion")
    try expect(try coordinator.status()["requestID"] as? String==nextID,"following global poll cannot resurrect the first instance's old result")
    let pendingID=UUID().uuidString,pendingGate=try core.acquireOperationLock("updates")
    _=try coordinator.start(operation:"check-only",requestID:pendingID)
    _=try coordinator.cancel(requestID:pendingID)
    try expect(try coordinator.status()["requestID"] as? String==pendingID && coordinator.status()["phase"] as? String=="cancelled","global polling still preserves a newer local cancellation over its old shared baseline")
    core.releaseOperationLock(pendingGate);try clock.drain()

    for componentFailure in [true,false] {
        let c=try fixture("partial-\(componentFailure)"),timer=UpdateTestClock(),failedID=UUID().uuidString
        try writeJSON(["pendingUpdates":[["id":"gbrain","status":"available"]],"availabilitySourceKey":c.updateSourceKey()],c.home.appendingPathComponent("updates/status.json"))
        var runner:OracleUpdateCoordinator!
        runner=OracleUpdateCoordinator(home:c.home,validate:{_,_ in},perform:{service in
            let updated:[String:Any]=["id":"gbrain","status":"updated","version":"synthetic"]
            try service.recordUpdate("installing","First component applied",results:[updated])
            if !componentFailure {throw failure("Synthetic interruption after a component")}
            try service.recordUpdate("complete","Check completed with a component error",results:[updated,["id":"skills","status":"error","message":"Synthetic component failure"]])
            try expect(try runner.status(requestID:failedID)["phase"] as? String=="failed","component error is failed before the first terminal callback is observed")
            return try service.updateStatus()
        },schedule:timer.schedule,now:{timer.time})
        _=try runner.start(operation:"check-only",requestID:failedID);try timer.drain()
        let result=try runner.status(requestID:failedID)
        try expect(result["phase"] as? String=="failed" && (result["results"] as? [[String:Any]] ?? []).contains{$0["id"] as? String=="gbrain" && $0["status"] as? String=="updated"},"partial failure preserves the completed component, mode=\(componentFailure)")
        try expect(result["knownUpdate"] as? Bool==false,"partial failure projects the reconciled ledger, mode=\(componentFailure)")
    }

    // Explicit cancellation, app lock, revocation before/after acquisition, and
    // target changes all end before claim() or any effect in the update body.
    for mode in ["cancel","locked","revoked","after-acquire","vault","deadline"] {
        let c=try fixture(mode),timer=UpdateTestClock(),requestID=UUID().uuidString
        var effects=0,validations=0,authorized=true,ended=[[String:Any]]()
        let controller=OracleUpdateCoordinator(home:c.home,waitLimit:1,retryInterval:0.5,
            validate:{_,_ in
                validations+=1
                if !authorized || (mode=="after-acquire" && validations==2) {throw failure("Synthetic authorization revoked")}
            },perform:{service in effects+=1;try service.recordUpdate("complete","unexpected",results:[["id":"skills","status":"current"]]);return try service.updateStatus()},
            schedule:timer.schedule,now:{timer.time},didFinish:{ended.append($0)})
        let cancelURL=c.home.appendingPathComponent("onboarding/cancel")
        try writeJSON(["sentinel":"existing pause"],cancelURL)
        let priorCancel=try Data(contentsOf:cancelURL)
        let lockFD=mode=="deadline" || mode=="cancel" ? try c.acquireOperationLock("updates"):nil
        let ack=try controller.start(operation:"check-only",requestID:requestID)
        try expect(ack["accepted"] as? Bool==true,"\(mode): request accepted before deterministic transition")
        switch mode {
        case "cancel":
            try timer.next()
            _=try controller.cancel(requestID:UUID().uuidString)
            try expect(try controller.status(requestID:requestID)["busy"] as? Bool==true,"wrong UUID cannot cancel another request")
            _=try controller.cancel(requestID:requestID)
        case "locked":controller.setAllowed(false);controller.setAllowed(true)
        case "revoked":authorized=false
        case "vault":
            let alternate=base.appendingPathComponent("alternate-vault")
            try fm.createDirectory(at:alternate,withIntermediateDirectories:true)
            c.config["vault"]=alternate.path;try c.persist()
        default:break
        }
        try timer.drain()
        if let lockFD {c.releaseOperationLock(lockFD)}
        try timer.drain()
        try expect(effects==0 && ended.count==1 && ended[0]["phase"] as? String==(mode=="deadline" ? "deferred":"cancelled"),"\(mode): ends once with no update effects or false success")
        try expect(!OracleUpdatePriority.hasPending(home:c.home),"\(mode): pending preference is cleared")
        try expect(try Data(contentsOf:cancelURL)==priorCancel,"\(mode): onboarding cancellation marker is unchanged")
        try expect(!fm.fileExists(atPath:c.home.appendingPathComponent("updates/status.json").path),"\(mode): pre-admission request never publishes shared progress")
        try assertFree(c,["updates","installation","setup","gbrain"])
    }

    let io=try fixture("io-error"),timer=UpdateTestClock()
    let directory=io.home.appendingPathComponent("setup/locks")
    try fm.createDirectory(at:directory,withIntermediateDirectories:true)
    try fm.createSymbolicLink(at:directory.appendingPathComponent("updates.lock"),withDestinationURL:base.appendingPathComponent("unused"))
    var failedEffects=0
    let controller=OracleUpdateCoordinator(home:io.home,validate:{_,_ in},perform:{_ in failedEffects+=1;return [:]},schedule:timer.schedule,now:{timer.time})
    let ioID=UUID().uuidString
    _=try controller.start(operation:"check-only",requestID:ioID);try timer.drain()
    let failed=try controller.status(requestID:ioID)
    try expect(failed["phase"] as? String=="failed" && failed["errno"] as? Int==Int(ELOOP) && failedEffects==0,"real open error is typed and failed once, never retried as busy")
    try refuses("automatic requests cannot turn checks into installation"){_=try controller.start(operation:"check-apply",automatic:true)}
    let scoped=try fixture("scoped-status"),lease=try scoped.acquireUpdateExecution(operation:"check-only")
    try lease.claim();scoped.updateExecution=lease
    defer{scoped.updateExecution=nil;lease.close()}
    let outside=base.appendingPathComponent("synthetic-outside-status.json"),sentinel=Data("preserve".utf8)
    try sentinel.write(to:outside)
    try fm.createSymbolicLink(at:scoped.home.appendingPathComponent("updates/status.json"),withDestinationURL:outside)
    try refuses("owned progress retains the existing scoped-path checks"){try scoped.recordUpdate("checking","must not escape")}
    try expect(try Data(contentsOf:outside)==sentinel,"status symlink cannot redirect a write outside the selected state")
    print("UPDATE_ADMISSION_RECEIPT "+String(decoding:try jsonData(["checks":checks,"network":false,"product_updates":false]),as:UTF8.self))
}
