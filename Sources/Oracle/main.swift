import AppKit
import WebKit
import LocalAuthentication

let arguments = CommandLine.arguments
func argument(_ key: String) -> String? { guard let i = arguments.firstIndex(of:key), arguments.count > i+1 else { return nil }; return arguments[i+1] }
// A validation bundle may pin its disposable profile, including relaunches from Finder.
// The distributed application has neither this identifier nor this Info.plist key.
let validationState = Bundle.main.bundleIdentifier?.hasSuffix(".validation") == true ? Bundle.main.object(forInfoDictionaryKey:"OracleQAState") as? String : nil
let core = try Core(home: (argument("--state") ?? validationState).map { URL(fileURLWithPath:$0) })
if arguments.contains("--hook") {
    do { let data = FileHandle.standardInput.readDataToEndOfFile(); guard data.count < 4_000_000, let value = try JSONSerialization.jsonObject(with:data) as? [String: Any] else { exit(0) }; try core.ingestHook(value) } catch { /* Observability must not block Codex. */ }
    print("{}"); exit(0)
}
if arguments.contains("--prepare-bridge") { do { print(String(decoding:try jsonData(core.prepareBridge()),as:UTF8.self));exit(0) } catch { fputs(error.localizedDescription+"\n",stderr);exit(1) } }
if let operation = argument("--gbrain") {
    do { let lock=try core.acquireOperationLock("gbrain");defer{core.releaseOperationLock(lock)};let value = try operation == "prepare" ? core.prepareGBrain() : core.finishGBrain(); print(String(decoding:try jsonData(value),as:UTF8.self)); exit(0) } catch { fputs(error.localizedDescription + "\n",stderr); exit(1) }
}
if let file = argument("--create-plan") {
    do { let params=try readJSON(URL(fileURLWithPath:file)); let plan=try core.makePlan(answers:params["answers"] as? [String:String] ?? [:],isNew:params["newVault"] as? Bool == true,attach:params["attach"] as? Bool == true,catalogCollections:params["catalogCollections"] as? [String] ?? []); print(String(decoding:try jsonData(plan),as:UTF8.self)); exit(0) } catch { fputs(error.localizedDescription + "\n",stderr); exit(1) }
}
if let hash = argument("--confirm-plan") { do { try core.confirmPlan(hash:hash); print("Plan confirmed"); exit(0) } catch { fputs(error.localizedDescription + "\n",stderr); exit(1) } }
if let hash = argument("--confirm-gbrain") { do { try core.confirmGBrain(hash); print("GBrain readback confirmed"); exit(0) } catch { fputs(error.localizedDescription + "\n",stderr); exit(1) } }
if let operation = argument("--setup") {
    do { let result = try core.applyPlan(rollback:operation == "rollback",verifyOnly:operation == "verify"); print(String(decoding:try jsonData(result),as:UTF8.self)); exit(0) } catch { fputs(error.localizedDescription + "\n",stderr); exit(1) }
}
if arguments.contains("--self-test-editor") { do { try runEditorTests();exit(0) } catch { fputs(error.localizedDescription+"\n",stderr);exit(1) } }
if arguments.contains("--codex-inventory") { do {let bridge=CodexBridge();defer{bridge.stop()};try bridge.start(cwd:core.home);let account=try bridge.account();guard account["connected"] as? Bool==true else{throw failure("Conecte sua conta no Codex primeiro.")};print(String(decoding:try jsonData(bridge.inventory()),as:UTF8.self));exit(0)}catch{fputs(error.localizedDescription+"\n",stderr);exit(1)} }
if arguments.contains("--onboarding-verify") { do { print(String(decoding:try jsonData(core.onboardingFinalVerification()),as:UTF8.self));exit(0) } catch { fputs(error.localizedDescription+"\n",stderr);exit(1) } }
if arguments.contains("--self-test-onboarding") { do { try runOnboardingTests();try runOnboardingLifecycleTests();exit(0) } catch { fputs(error.localizedDescription+"\n",stderr);exit(1) } }
if arguments.contains("--self-test-updates") { do { try runUpdateTests(releasePath:argument("--test-release"));exit(0) } catch { fputs(error.localizedDescription+"\n",stderr);exit(1) } }
if arguments.contains("--self-test") { do { try runTests(); exit(0) } catch { fputs("FAIL: \(error)\n",stderr); exit(1) } }

if let operation = argument("--update") {
    do { print(String(decoding:try jsonData(core.performUpdates(operation:operation)),as:UTF8.self));exit(0) } catch { fputs(error.localizedDescription+"\n",stderr);exit(1) }
}

final class App: NSObject, NSApplicationDelegate, WKScriptMessageHandler, WKNavigationDelegate, NSWindowDelegate {
    var onboardingController:OnboardingController?
    var window: NSWindow!
    var web: WKWebView!
    var locked = true
    var requestMethods=[String:String]()
    var lockGeneration=0
    var terminationPending=false
    var resourceRoot: URL { Bundle.main.resourceURL!.appendingPathComponent("web") }
    let queue = DispatchQueue(label:"oracle.core")
    let updateQueue = DispatchQueue(label:"oracle.updates")
    var updating = false
    func applicationDidFinishLaunching(_ notification: Notification) {
        NSApp.setActivationPolicy(.regular)
        onboardingController=try? OnboardingController(home:core.home)
        onboardingController?.openLogin={ url in DispatchQueue.main.async { NSWorkspace.shared.open(url) } }
        let content = WKUserContentController(); content.add(self,name:"oracle")
        let cfg = WKWebViewConfiguration(); cfg.userContentController = content
        cfg.websiteDataStore = .nonPersistent()
        cfg.preferences.tabFocusesLinks = true
        web = WKWebView(frame:.zero,configuration:cfg); web.navigationDelegate = self
        web.setValue(false,forKey:"drawsBackground")
        window = NSWindow(contentRect:NSRect(x:0,y:0,width:1440,height:900),styleMask:[.titled,.closable,.miniaturizable,.resizable,.fullSizeContentView],backing:.buffered,defer:false)
        window.title = "Oracle"; window.titlebarAppearsTransparent = true; window.titleVisibility = .hidden
        window.backgroundColor = .black; window.minSize = NSSize(width:840,height:620); window.contentView = web; window.delegate = self
        window.setFrameAutosaveName("OracleUniverse"); window.center(); window.makeKeyAndOrderFront(nil)
        buildMenu()
        locked = core.config["protected"] as? Bool == true
        web.loadFileURL(resourceRoot.appendingPathComponent("index.html"),allowingReadAccessTo:resourceRoot)
        NSApp.activate(ignoringOtherApps:true)
        NSWorkspace.shared.notificationCenter.addObserver(self,selector:#selector(accessibilityChanged),name:NSWorkspace.accessibilityDisplayOptionsDidChangeNotification,object:nil)
        NSWorkspace.shared.notificationCenter.addObserver(self,selector:#selector(lockApp),name:NSWorkspace.willSleepNotification,object:nil)
        DistributedNotificationCenter.default().addObserver(self,selector:#selector(lockApp),name:NSNotification.Name("com.apple.screenIsLocked"),object:nil)
    }
    func windowDidMiniaturize(_ notification:Notification) { web.evaluateJavaScript("window.oracleVisibility?.(false)",completionHandler:nil) }
    func windowDidDeminiaturize(_ notification:Notification) { web.evaluateJavaScript("window.oracleVisibility?.(true)",completionHandler:nil) }
    func windowDidChangeOcclusionState(_ notification:Notification) { web.evaluateJavaScript("window.oracleVisibility?.(\(window.occlusionState.contains(.visible) ? "true" : "false"))",completionHandler:nil) }
    @objc func accessibilityChanged() {
        let value:[String:Any]=["reduceMotion":NSWorkspace.shared.accessibilityDisplayShouldReduceMotion,"reduceTransparency":NSWorkspace.shared.accessibilityDisplayShouldReduceTransparency]
        if let data=try? jsonData(value) {web.evaluateJavaScript("window.oracleAccessibility?.(\(String(decoding:data,as:UTF8.self)))",completionHandler:nil)}
    }
    func applicationShouldTerminate(_ sender:NSApplication)->NSApplication.TerminateReply {
        guard web != nil else {return .terminateNow}
        if terminationPending{return .terminateLater};terminationPending=true
        web.callAsyncJavaScript("return await window.oraclePrepareToClose?.() ?? true",arguments:[:],in:nil,in:.page) { result in
            self.terminationPending=false
            switch result {
            case .success: sender.reply(toApplicationShouldTerminate:true)
            case .failure:
                let alert=NSAlert();alert.messageText="Não foi possível guardar seu rascunho";alert.informativeText="Volte ao editor e salve o documento ou descarte as alterações antes de sair.";alert.addButton(withTitle:"Voltar ao editor");self.addAlertBreadcrumb(alert,"Oracle › Editor › Rascunho");alert.beginSheetModal(for:self.window){_ in sender.reply(toApplicationShouldTerminate:false)}
            }
        }
        return .terminateLater
    }
    func windowShouldClose(_ sender:NSWindow)->Bool {NSApp.terminate(nil);return false}
    func applicationWillTerminate(_ notification:Notification) {onboardingController?.shutdown()}
    func applicationShouldTerminateAfterLastWindowClosed(_ sender:NSApplication) -> Bool { true }
    func buildMenu() {
        let bar = NSMenu()
        let appItem = NSMenuItem(); bar.addItem(appItem); let appMenu = NSMenu(); appItem.submenu = appMenu
        appMenu.addItem(withTitle:"Sobre o Oracle",action:#selector(about),keyEquivalent:"")
        appMenu.addItem(withTitle:"Bloquear Oracle",action:#selector(lockApp),keyEquivalent:"l")
        appMenu.addItem(.separator()); appMenu.addItem(withTitle:"Sair do Oracle",action:#selector(NSApplication.terminate(_:)),keyEquivalent:"q")
        let edit = NSMenuItem(); bar.addItem(edit); edit.submenu = NSMenu(title:"Editar")
        for (title,selector,key) in [("Desfazer",Selector(("undo:")),"z"),("Recortar",#selector(NSText.cut(_:)),"x"),("Copiar",#selector(NSText.copy(_:)),"c"),("Colar",#selector(NSText.paste(_:)),"v"),("Selecionar tudo",#selector(NSText.selectAll(_:)),"a")] { edit.submenu!.addItem(withTitle:title,action:selector,keyEquivalent:key) }
        let view = NSMenuItem(); bar.addItem(view); view.submenu = NSMenu(title:"Janela")
        view.submenu!.addItem(withTitle:"Minimizar",action:#selector(NSWindow.miniaturize(_:)),keyEquivalent:"m")
        view.submenu!.addItem(withTitle:"Tela cheia",action:#selector(NSWindow.toggleFullScreen(_:)),keyEquivalent:"f")
        NSApp.mainMenu = bar
    }
    func addAlertBreadcrumb(_ alert:NSAlert,_ path:String) {
        let trail=NSTextField(labelWithString:path)
        trail.font=NSFont.systemFont(ofSize:11);trail.textColor = .secondaryLabelColor
        trail.setAccessibilityLabel("Caminho da janela: \(path)")
        alert.accessoryView=trail
    }
    @objc func about() { let a = NSAlert(); a.messageText = "Oracle 0.3.0"; a.informativeText = "Seu conhecimento, conectado. Codex e Obsidian, em um só universo."; addAlertBreadcrumb(a,"Oracle › Sobre o Oracle");a.addButton(withTitle:"Voltar");a.runModal() }
    @objc func lockApp() {
        lockGeneration += 1;locked=true
        web?.evaluateJavaScript("window.oracleTakeDraftAndLock?.()") {value,_ in
            guard let draft=value as? [String:String],let path=draft["path"],let hash=draft["hash"],let text=draft["text"] else {return}
            self.queue.async {if draft["vault"]==core.config["vault"] as? String {_ = try? core.saveDraft(path:path,original:hash,text:text)}}
        }
    }
    func authenticate(_ completion:@escaping(Bool,String?)->Void) {
        let generation=lockGeneration
        let context = LAContext(); var error:NSError?
        guard context.canEvaluatePolicy(.deviceOwnerAuthentication,error:&error) else { completion(false,error?.localizedDescription ?? "Autenticação indisponível"); return }
        context.evaluatePolicy(.deviceOwnerAuthentication,localizedReason:"Abrir seu universo no Oracle") { success,error in DispatchQueue.main.async { completion(success && generation==self.lockGeneration,generation==self.lockGeneration ? error?.localizedDescription : "Autenticação cancelada após bloqueio") } }
    }
    func reply(_ id: String,_ value: Any? = nil,_ error: String? = nil) {
        let method=requestMethods.removeValue(forKey:id) ?? ""
        let finalError = locked && !["boot","unlock","lock"].contains(method) ? "Oracle bloqueado" : error
        let result:[String:Any] = finalError.map { ["error":$0] } ?? ["value":value ?? NSNull()]
        guard let data = try? jsonData(result), let idData = try? JSONSerialization.data(withJSONObject:[id]) else { return }
        let safeID = String(decoding:idData,as:UTF8.self)
        web.evaluateJavaScript("window.oracleReply(\(safeID)[0],\(String(decoding:data,as:UTF8.self)))",completionHandler:nil)
    }
    func userContentController(_ userContentController: WKUserContentController,didReceive message:WKScriptMessage) {
        guard message.frameInfo.isMainFrame, message.frameInfo.request.url?.isFileURL == true, let body = message.body as? [String:Any], let id = body["id"] as? String, let method = body["method"] as? String else { return }
        requestMethods[id]=method
        let p = body["params"] as? [String:Any] ?? [:]
        if method == "lock" { lockApp(); reply(id,true); return }
        if method == "boot" { reply(id,["locked":locked,"accessibility":["reduceMotion":NSWorkspace.shared.accessibilityDisplayShouldReduceMotion,"reduceTransparency":NSWorkspace.shared.accessibilityDisplayShouldReduceTransparency]]); return }
        if method == "unlock" { authenticate { ok,error in if ok { self.locked = false }; self.reply(id,ok,error) }; return }
        guard !locked else { reply(id,nil,"Oracle bloqueado"); return }
        if handleOnboarding(id,method:method,params:p) { return }
        if !core.onboardingLegacyAccess() && core.activeLicense()==nil && !["snapshot","copy","openExternal","openCodex"].contains(method) {reply(id,nil,"Ative seu código para continuar.");return}
        if method == "chooseVault" || method == "chooseProject" || method == "chooseGBrain" {
            let panel = NSOpenPanel(); panel.canChooseDirectories = true; panel.canChooseFiles = false; panel.canCreateDirectories = true
            panel.message = method == "chooseVault" ? "Escolha o vault. Oracle lê os documentos e salva os arquivos que você editar nesta pasta." : method == "chooseProject" ? "Autorize somente a descoberta de AGENTS.md e AGENTS.override.md neste projeto." : "Escolha o workspace GBrain existente. Apenas operações oficiais de consulta serão usadas."
            panel.beginSheetModal(for:window) { response in
                guard response == .OK, let url = panel.url else { self.reply(id,NSNull()); return }
                self.queue.async { do {
                    let lock=try core.acquireOperationLock("setup");defer{core.releaseOperationLock(lock)};let brain=try core.acquireOperationLock("gbrain");defer{core.releaseOperationLock(brain)};core.refreshConfig()
                    if method == "chooseVault" { core.config["vault"] = url.path;core.config.removeValue(forKey:"vaultBookmark") }
                    else if method == "chooseGBrain" { core.config["gbrainWorkspace"] = url.path;core.config["gbrainAccess"] = true }
                    else { var roots = core.config["projects"] as? [String] ?? []; if !roots.contains(url.path) { roots.append(url.path) }; core.config["projects"] = roots }
                    try core.persist(); DispatchQueue.main.async { self.reply(id,url.path) }
                } catch { DispatchQueue.main.async { self.reply(id,nil,error.localizedDescription) } } }
            }; return
        }
        if method == "updateStart" {
            guard !updating else { reply(id,true);return }
            let operation=p["operation"] as? String ?? "check-apply"
            guard ["check-apply","check-only","rollback-gbrain","rollback-skills"].contains(operation) else { reply(id,nil,"Operação inválida");return }
            updating=true; reply(id,true)
            updateQueue.async {
                do { let updater=try Core(home:core.home);_ = try updater.performUpdates(operation:operation) }
                catch { try? core.recordUpdate("failed",error.localizedDescription) }
                DispatchQueue.main.async { self.updating=false }
            };return
        }
        if method == "protect" { authenticate { ok,error in if ok { self.queue.async { core.config["protected"] = true; try? core.persist(); DispatchQueue.main.async { self.reply(id,true) } } } else { self.reply(id,nil,error) } }; return }
        if method == "openCodex" { let url = NSWorkspace.shared.urlForApplication(withBundleIdentifier:"com.openai.codex") ?? NSWorkspace.shared.urlForApplication(withBundleIdentifier:"com.openai.Codex"); if let url { NSWorkspace.shared.openApplication(at:url,configuration:.init()); reply(id,true) } else { reply(id,nil,"Codex não encontrado. Abra o app instalado manualmente e cole o pedido.") }; return }
        if method == "openExternal" { guard let text=p["url"] as? String,let parts=URLComponents(string:text),["https","http"].contains(parts.scheme ?? ""),parts.host != nil,parts.user == nil,parts.password == nil,let url=parts.url else { reply(id,nil,"Link externo inválido"); return }; NSWorkspace.shared.open(url); reply(id,true); return }
        if method == "copy" { NSPasteboard.general.clearContents(); NSPasteboard.general.setString(p["text"] as? String ?? "",forType:.string); reply(id,true); return }
        if method == "reveal" { do { let url = try core.scoped(p["path"] as? String ?? "",root:core.vault()); NSWorkspace.shared.activateFileViewerSelecting([url]); reply(id,true) } catch { reply(id,nil,error.localizedDescription) }; return }
        if method == "exportSnapshot" {
            let panel=NSSavePanel(); panel.nameFieldStringValue="Oracle-universo.png"; panel.allowedContentTypes=[.png]; panel.message="Exportar a visão atual do Oracle como imagem."
            panel.beginSheetModal(for:window) { result in guard result == .OK,let url=panel.url else { self.reply(id,NSNull()); return }
                DispatchQueue.main.asyncAfter(deadline:.now()+0.25) { self.web.takeSnapshot(with:nil) { image,error in
                    do { guard let image,let tiff=image.tiffRepresentation,let rep=NSBitmapImageRep(data:tiff),let png=rep.representation(using:.png,properties:[:]) else { throw error ?? failure("Não foi possível gerar a imagem") }; try png.write(to:url,options:.atomic); self.reply(id,url.path) } catch { self.reply(id,nil,error.localizedDescription) }
                } }
            }; return
        }
        if method == "importConversations" {
            let panel = NSOpenPanel(); panel.allowedContentTypes = [.json]; panel.message = "Importe uma exportação Oracle Conversations v1. Não lê histórico privado nem conteúdo cloud automaticamente."
            panel.beginSheetModal(for:window) { result in guard result == .OK,let url = panel.url else { self.reply(id,NSNull()); return }; self.queue.async { do { let data = try Data(contentsOf:url); guard data.count < 10_000_000 else { throw failure("Exportação maior que 10 MB") }; let doc = try readJSON(url); guard doc["schema_version"] as? Int == 1,let items = doc["conversations"] as? [[String:Any]], items.count <= 1000 else { throw failure("Formato: schema_version 1, conversations[]") }; var clean = [[String:Any]](); for item in items { guard let title = item["title"] as? String,let messages = item["messages"] as? [[String:String]] else { throw failure("Conversa inválida") }; clean.append(["title":title,"source":url.lastPathComponent,"messages":messages.filter { ["user","assistant"].contains($0["role"] ?? "") }.map { ["role":$0["role"]!,"text":$0["text"] ?? ""] }]) }; try writeJSON(["schema_version":1,"conversations":clean],core.home.appendingPathComponent("conversations.json")); DispatchQueue.main.async { self.reply(id,clean) } } catch { DispatchQueue.main.async { self.reply(id,nil,error.localizedDescription) } } } }; return
        }
        let updaterBusy=updating
        queue.async {
            do {
                var result:Any = NSNull()
                switch method {
                case "saveLayout":
                    guard let layout=p["layout"] as? [String:Any],let nodes=layout["nodes"] as? [String:[String:Double]],let leaves=layout["leaves"] as? [String:[String:Double]],nodes.count<=128,leaves.count<=2000 else { throw failure("Layout inválido") }
                    for point in Array(nodes.values)+Array(leaves.values) { guard let x=point["x"],let y=point["y"],x.isFinite,y.isFinite,abs(x)<=2000,abs(y)<=2000 else { throw failure("Posição inválida") } }
                    core.config["layout"]=layout; try core.persist(); result=true
                case "updateStatus": var status=try core.updateStatus();status["busy"]=updaterBusy;if !updaterBusy,["checking","downloading","verifying","applying"].contains(status["phase"] as? String ?? "") {status["phase"]="interrupted";status["message"]="Operação interrompida. Verifique novamente para recuperar com segurança."};result=status
                case "configureSkillSource": result = try core.configureSkillSource(p["repository"] as? String ?? "")
                case "snapshot": result = try core.snapshot()
                case "gbrainRead": result = try core.gbrainRead(p)
                case "gbrainReadback": result = (try? readJSON(core.home.appendingPathComponent("setup/gbrain-readback.json"))) ?? [:]
                case "confirmGBrain": try core.confirmGBrain(p["hash"] as? String ?? ""); result = true
                case "read": result = try core.readEditableNote(p["path"] as? String ?? "")
                case "saveNote": result = try core.saveNote(path:p["path"] as? String ?? "",original:p["hash"] as? String ?? "",text:p["text"] as? String ?? "")
                case "saveDraft": result = try core.saveDraft(path:p["path"] as? String ?? "",original:p["hash"] as? String ?? "",text:p["text"] as? String ?? "")
                case "discardDraft": try core.discardDraft(p["path"] as? String ?? "");result=true
                case "saveVersion": result = try core.saveVersion(path:p["path"] as? String ?? "",original:p["hash"] as? String ?? "",text:p["text"] as? String ?? "")
                case "plan": result = try core.makePlan(answers:p["answers"] as? [String:String] ?? [:],isNew:p["newVault"] as? Bool == true,attach:p["attach"] as? Bool == true,catalogCollections:p["catalogCollections"] as? [String] ?? [])
                case "confirm": try core.confirmPlan(hash:p["hash"] as? String ?? ""); result = true
                case "briefing": result = self.briefing()
                case "events": result = try core.events()
                case "replayData": result = try core.replayData()
                case "bridgeReceipt": result = (try? readJSON(core.home.appendingPathComponent("setup/bridge.json"))) ?? [:]
                case "conversations": result = (try? readJSON(core.home.appendingPathComponent("conversations.json")))?["conversations"] ?? []
                case "instructions": result = try (core.config["projects"] as? [String] ?? []).flatMap { try core.scan(root:URL(fileURLWithPath:$0),instructionsOnly:true).filter { $0["directory"] as? Bool != true } }
                case "readInstruction": guard let root = p["source"] as? String,(core.config["projects"] as? [String] ?? []).contains(root),let path = p["path"] as? String,["AGENTS.md","AGENTS.override.md"].contains(URL(fileURLWithPath:path).lastPathComponent) else { throw failure("Fonte não autorizada") }; let url = try core.scoped(path,root:URL(fileURLWithPath:root)); result = ["text":try String(contentsOf:url,encoding:.utf8),"path":url.path]
                case "revoke": core.config.removeValue(forKey:"vault");core.config.removeValue(forKey:"vaultBookmark"); core.config.removeValue(forKey:"projects"); core.config.removeValue(forKey:"gbrainWorkspace");core.config["gbrainAccess"] = false; try core.persist(); result = true
                default: throw failure("Operação não suportada")
                }
                DispatchQueue.main.async { self.reply(id,result) }
            } catch { DispatchQueue.main.async { self.reply(id,nil,error.localizedDescription) } }
        }
    }
    func briefing() -> String {
        let executable = Bundle.main.executableURL!.path
        let skill = Bundle.main.resourceURL!.appendingPathComponent("skills/oracle-setup/SKILL.md").path
        func quote(_ s:String)->String { "'" + s.replacingOccurrences(of:"'",with:"'\\''") + "'" }
        return "Configure o Oracle usando a skill em \(skill). Leia o plano confirmado em \(core.home.path)/setup/plan.json e confira a confirmação. Execute os scripts determinísticos: \(quote(executable)) --state \(quote(core.home.path)) --setup apply. Continue o bootstrap GBrain oficial conforme a skill, com recibos e sem outro executor IA. Preserve instalações existentes. Hooks exigem confiança oficial no Codex. Não considere apenas a estrutura de pastas como setup completo."
    }
    func webView(_ webView:WKWebView,decidePolicyFor navigationAction:WKNavigationAction,decisionHandler:@escaping(WKNavigationActionPolicy)->Void) { guard let url = navigationAction.request.url, url.isFileURL, url.standardizedFileURL.path.hasPrefix(resourceRoot.path + "/") else { decisionHandler(.cancel); return }; decisionHandler(.allow) }
}
let app = App()
NSApplication.shared.delegate = app
NSApplication.shared.run()
