import AppKit
import WebKit

extension App {
    /// Called after the local-content and application-lock checks in the shared bridge.
    /// Returns immediately; Codex work and authentication never block the window thread.
    func handleOnboarding(_ id:String,method:String,params:[String:Any]) -> Bool {
        guard method.hasPrefix("onboarding") || ["codexPlugins","codexPluginsRefresh"].contains(method) else{return false}
        if method=="onboardingStatus" {
            queue.async {do{let value=try core.onboardingSnapshot();DispatchQueue.main.async{self.reply(id,value)}}catch{DispatchQueue.main.async{self.reply(id,nil,error.localizedDescription)}}};return true
        }
        guard let controller=onboardingController else {reply(id,nil,"A configuração do Oracle não pôde ser aberta.");return true}
        if method=="onboardingChooseVault" || method=="onboardingChooseBrain" {
            let panel=NSOpenPanel();panel.canChooseDirectories=true;panel.canChooseFiles=false;panel.canCreateDirectories=method=="onboardingChooseVault"
            panel.message=method=="onboardingChooseVault" ? "Escolha a pasta original do seu vault Obsidian." : "Escolha a pasta da sua instalação existente do Second Brain (GBrain)."
            panel.beginSheetModal(for:window) {response in
                guard response == .OK,let url=panel.url else{self.reply(id,NSNull());return}
                controller.queue.async {
                    do {
                        if method=="onboardingChooseVault" {try controller.selectVault(url)}
                        else {try controller.selectExistingBrain(url)}
                        DispatchQueue.main.async{self.reply(id,["name":url.lastPathComponent])}
                    }catch{DispatchQueue.main.async{self.reply(id,nil,error.localizedDescription)}}
                }
            };return true
        }
        // Interrupt has its own queue so it can cancel an in-flight turn/start or inventory call.
        let workQueue=method=="onboardingCancel" ? DispatchQueue.global(qos:.userInitiated) : controller.queue
        workQueue.async {
            do {
                var result:Any=true
                switch method {
                case "onboardingDeviceRequest":result=try controller.core.licenseDeviceRequest()
                case "onboardingActivate":result=try controller.core.activateLicense(params["code"] as? String ?? "")
                case "onboardingConnect":result=try controller.connect()
                case "onboardingCheckConnection":result=try controller.checkConnection()
                case "onboardingSelectModel":try controller.selectModel(params["model"] as? String ?? "")
                case "onboardingOpenCodex":try controller.openCodexWorkspace()
                case "onboardingCancelLogin":try controller.cancelLogin()
                case "onboardingDraft":try controller.saveDraft(params)
                case "onboardingPlan":result=try controller.plan(params)
                case "onboardingInstall":result=try controller.install(params["hash"] as? String ?? "")
                case "onboardingResume":result=try controller.resume()
                case "onboardingCancel":result=try controller.cancel()
                case "onboardingConfirmIdentity":try controller.confirmReadback(params["hash"] as? String ?? "")
                case "onboardingAnswer":try controller.answerRequest(params)
                case "codexPlugins","codexPluginsRefresh":result=try controller.refreshPlugins()
                default:throw failure("Ação de configuração desconhecida.")
                }
                DispatchQueue.main.async{self.reply(id,result)}
            } catch {DispatchQueue.main.async{self.reply(id,nil,error.localizedDescription)}}
        };return true
    }
}
