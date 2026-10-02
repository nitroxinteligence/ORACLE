import AppKit
import Darwin

/// JSONL transport only. Product authorization stays in the shared App router and Core.
enum OracleDesktopPluginServer {
    private static var shutdownSignals=[DispatchSourceSignal]()
    static func run(app:App) {
        signal(SIGPIPE,SIG_IGN)
        for number in [SIGTERM,SIGINT] {
            signal(number,SIG_IGN)
            let source=DispatchSource.makeSignalSource(signal:number,queue:.main)
            source.setEventHandler{beginShutdown(app:app)};source.resume();shutdownSignals.append(source)
        }
        NSApplication.shared.setActivationPolicy(.accessory)
        app.locked=core.config["protected"] as? Bool == true
        app.updateCoordinator.setAllowed(!app.locked)
        app.onboardingController=try? OnboardingController(home:core.home)
        app.onboardingController?.openLogin={url in DispatchQueue.main.async{NSWorkspace.shared.open(url)}}
        app.localServices=OracleLocalServices(home:core.home)
        let recovering=fm.fileExists(atPath:core.home.appendingPathComponent("updates/runtime/transition.json").path)
        app.localServices?.start(paused:app.locked || core.activeLicense()==nil || recovering)
        if !app.locked && core.activeLicense() != nil && !recovering {core.memorySync.start()}
        if recovering {
            app.queue.async {
                do {
                    let service=try Core(home:core.home);_=try service.recoverRuntimeGenerationIfNeeded()
                    DispatchQueue.main.async{if !app.locked && core.activeLicense() != nil{app.localServices?.setPaused(false);core.memorySync.start()}}
                } catch {try? writeJSON(["status":"recovery_required","message":error.localizedDescription],core.home.appendingPathComponent("updates/runtime/recovery-error.json"))}
            }
        }
        NSWorkspace.shared.notificationCenter.addObserver(app,selector:#selector(App.lockApp),name:NSWorkspace.willSleepNotification,object:nil)
        DistributedNotificationCenter.default().addObserver(app,selector:#selector(App.lockApp),name:NSNotification.Name("com.apple.screenIsLocked"),object:nil)
        app.pluginReply={id,result in
            var response=result;response["id"]=id
            if var data=try? JSONSerialization.data(withJSONObject:response,options:[.sortedKeys]) {
                data.append(10)
                data.withUnsafeBytes {bytes in
                    var offset=0
                    while offset<bytes.count {
                        let written=Darwin.write(STDOUT_FILENO,bytes.baseAddress!.advanced(by:offset),bytes.count-offset)
                        if written<0 {if errno==EINTR{continue};break}
                        if written==0{break};offset+=written
                    }
                }
            }
        }
        DispatchQueue.global(qos:.utility).async {
            while let line=readLine() {
                guard line.utf8.count<=4_000_000,let data=line.data(using:.utf8),let body=try? JSONSerialization.jsonObject(with:data) as? [String:Any],let id=body["id"] as? String,let method=body["method"] as? String else{continue}
                let params=body["params"] as? [String:Any] ?? [:]
                DispatchQueue.main.async{app.dispatchRequest(id,method:method,params:params)}
            }
            DispatchQueue.main.async {
                beginShutdown(app:app)
            }
        }
        // No application delegate launch, window, web view or activation. Native pickers
        // and device authentication run only when explicitly requested by the UI.
        NSApplication.shared.run()
    }
    static func beginShutdown(app:App) {
        guard !app.pluginClosing else{return}
        app.pluginClosing=true
        app.lockGeneration+=1
        app.pluginAuthenticationContexts.forEach{$0.invalidate()};app.pluginAuthenticationContexts.removeAll()
        if NSApp.modalWindow != nil {NSApp.abortModal()}
        app.updateCoordinator.setAllowed(false);app.localServices?.stop();core.memorySync.stop()
        waitForReplies(app:app,started:Date())
    }
    static func waitForReplies(app:App,started:Date) {
        // Device authentication and native modal selection were cancelled above.
        // OS launch callbacks are read-only and may safely receive a refusal.
        if Date().timeIntervalSince(started)>30 {
            let readOnlyCallbacks=Set(["openCodex","onboardingOpenCodex","onboardingOpenKnowledgeCodex","onboardingOpenIntegrationCodex"])
            for (id,method) in app.requestMethods where readOnlyCallbacks.contains(method) {app.reply(id,nil,"O transporte foi encerrado antes da resposta do aplicativo.")}
        }
        guard app.requestMethods.isEmpty else {
            DispatchQueue.main.asyncAfter(deadline:.now()+0.05){waitForReplies(app:app,started:started)};return
        }
        // Install requests can return a starting receipt then enqueue a local phase.
        // Cancel that phase cooperatively, and place barriers only after all accepted
        // requests have replied, so newly enqueued phases are included in the drain.
        app.onboardingController?.shutdown()
        let group=DispatchGroup()
        for queue in [app.queue,app.memoryQueue,app.updateStatusQueue]+(app.onboardingController.map{[$0.queue]} ?? []) {
            group.enter();queue.async{group.leave()}
        }
        if let services=app.localServices {group.enter();services.stopAndDrain{group.leave()}}
        group.enter();core.memorySync.stopAndDrain{group.leave()}
        group.notify(queue:.main){waitForMaintenance(app:app)}
    }
    static func waitForMaintenance(app:App) {
        // Worker barriers have drained owned canonical writes. Admitted updater
        // jobs retain their own bounded network timeouts and recovery receipts.
        let updating=(try? app.updateCoordinator.status(requestID:nil))?["busy"] as? Bool == true
        if updating {
            DispatchQueue.main.asyncAfter(deadline:.now()+0.1){waitForMaintenance(app:app)};return
        }
        exit(0)
    }
}

extension App {
    func presentPanel(_ panel:NSSavePanel,completion:@escaping(NSApplication.ModalResponse)->Void) {
        if let window {panel.beginSheetModal(for:window,completionHandler:completion)}
        else {NSApp.activate(ignoringOtherApps:true);completion(panel.runModal())}
    }
}
