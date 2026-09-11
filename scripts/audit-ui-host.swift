// Dedicated UI fixture host. It has no Core, license, Codex, Keychain or vault implementation.
import AppKit
import WebKit

final class AuditUIHost:NSObject,NSApplicationDelegate,WKNavigationDelegate,WKScriptMessageHandler {
    var window:NSWindow!,web:WKWebView!
    let args=CommandLine.arguments
    var output:URL {URL(fileURLWithPath:args[3])}
    func applicationDidFinishLaunching(_ notification:Notification){
        NSApp.setActivationPolicy(.regular)
        let content=WKUserContentController();content.add(self,name:"oracle")
        let config=WKWebViewConfiguration();config.userContentController=content;config.websiteDataStore = .nonPersistent()
        web=WKWebView(frame:.zero,configuration:config);web.navigationDelegate=self
        window=NSWindow(contentRect:NSRect(x:0,y:0,width:1200,height:780),styleMask:[.titled,.resizable,.closable],backing:.buffered,defer:false)
        window.title="Oracle — regressões sintéticas";window.contentView=web;window.center();window.makeKeyAndOrderFront(nil);NSApp.activate(ignoringOtherApps:true)
        let root=URL(fileURLWithPath:args[1]);web.loadFileURL(root.appendingPathComponent("index.html"),allowingReadAccessTo:root)
        DispatchQueue.main.asyncAfter(deadline:.now()+120){self.finish(["fatal":"UI test timeout"],code:2)}
    }
    func userContentController(_ userContentController:WKUserContentController,didReceive message:WKScriptMessage){
        guard let body=message.body as? [String:Any],let id=body["id"] as? String,let method=body["method"] as? String else{return}
        let params=body["params"] as? [String:Any] ?? [:]
        if method=="fixtureSnapshot" {
            guard let name=params["name"] as? String,["library","department"].contains(name) else{return}
            web.takeSnapshot(with:nil) {image,error in
                let destination=self.output.deletingLastPathComponent().appendingPathComponent("ui-"+name+".png")
                var saved=false
                if let tiff=image?.tiffRepresentation,let bitmap=NSBitmapImageRep(data:tiff),let png=bitmap.representation(using:.png,properties:[:]) {do{try png.write(to:destination,options:.atomic);saved=true}catch{}}
                let encoded=(try? JSONSerialization.data(withJSONObject:[id])) ?? Data()
                self.web.evaluateJavaScript("window.oracleReply(\(String(decoding:encoded,as:UTF8.self))[0],{value:\(saved)})")
            };return
        }
        let onboard:[String:Any]=["licensed":true,"legacyAccess":false,"status":"completed","codexConnected":false,"hasVault":true,"confirmed":[]]
        let snapshot:[String:Any]=["entries":[],"collections":[["id":"code","name":"Code","icon":"code"]],"events":[],"config":["fixture":true,"vault":"/synthetic-vault"],"onboarding":onboard,"codexPlugins":["status":"unavailable","plugins":[]],"catalog":[],"operations":["setup":false,"gbrain":false]]
        let value:Any
        switch method {
        case "fixtureResize":window.setContentSize(NSSize(width:max(840,min(1600,params["width"] as? Double ?? 1200)),height:max(620,min(1000,params["height"] as? Double ?? 780))));value=true
        case "boot":value=["locked":false,"accessibility":["reduceMotion":true,"reduceTransparency":true]]
        case "snapshot":value=snapshot
        case "onboardingStatus":value=onboard
        case "updateStatus":value=["phase":"idle","busy":false,"available":false,"results":[]]
        case "memoryStatus":value=["state":"unavailable","active":false,"lastScanAt":NSNull()]
        case "events","conversations","instructions":value=[Any]()
        default:value=true
        }
        let reply=(try? JSONSerialization.data(withJSONObject:["value":value])) ?? Data()
        let encoded=(try? JSONSerialization.data(withJSONObject:[id])) ?? Data()
        web.evaluateJavaScript("window.oracleReply(\(String(decoding:encoded,as:UTF8.self))[0],\(String(decoding:reply,as:UTF8.self)))")
    }
    func webView(_ webView:WKWebView,didFinish navigation:WKNavigation!){
        DispatchQueue.main.asyncAfter(deadline:.now()+0.8){
            do {
                let script=try String(contentsOfFile:self.args[2],encoding:.utf8)
                let guarded="try {\n"+script+"\n} catch(error) {return {fatal:String(error),stack:error.stack,title:document.querySelector('#modal-title')?.textContent,body:document.body.innerText.slice(0,1400)}}"
                self.web.callAsyncJavaScript(guarded,arguments:[:],in:nil,in:.page){result in
                    switch result {
                    case .success(let value):let report=value as? [String:Any] ?? [:];self.finish(value,code:(report["failed"] as? Int ?? 0)>0 || report["fatal"] != nil ? 1 : 0)
                    case .failure(let error):self.finish(["fatal":String(describing:(error as NSError).userInfo)],code:1)
                    }
                }
            }catch{self.finish(["fatal":error.localizedDescription],code:1)}
        }
    }
    func finish(_ value:Any,code:Int32){
        let data=(try? JSONSerialization.data(withJSONObject:value,options:[.prettyPrinted,.sortedKeys])) ?? Data()
        try? data.write(to:output,options:.atomic)
        print(String(decoding:data,as:UTF8.self));fflush(stdout);exit(code)
    }
}
let host=AuditUIHost();NSApplication.shared.delegate=host;NSApplication.shared.run()
