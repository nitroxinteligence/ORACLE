// Compiled only by build-atlas-qa.py. Never included in the shipped app.
// Runs the real App/Core with a synthetic --state and a local QA mailbox.
import AppKit
import WebKit

final class AtlasQA {
    static var retained: AtlasQA?
    let web: WKWebView
    let window: NSWindow
    let root: URL
    var timer: Timer?
    var busy = false

    static func attach(_ web: WKWebView, _ window: NSWindow) {
        guard core.config["fixture"] as? Bool == true,
              let dir = ProcessInfo.processInfo.environment["ORACLE_ATLAS_QA_DIR"] else { return }
        retained = AtlasQA(web, window, URL(fileURLWithPath: dir))
    }
    init(_ web: WKWebView, _ window: NSWindow, _ root: URL) {
        self.web = web; self.window = window; self.root = root
        window.setContentSize(NSSize(width: 1200, height: 760))
        window.level = .floating // Keep another concurrent QA app from occluding this sample.
        window.center()
        timer = Timer.scheduledTimer(withTimeInterval: 0.1, repeats: true) { [weak self] _ in self?.poll() }
    }
    func reply(_ value: Any) {
        if let data = try? JSONSerialization.data(withJSONObject: value, options: [.prettyPrinted, .sortedKeys]) {
            try? data.write(to: root.appendingPathComponent("response.json"), options: .atomic)
        }
        busy = false
    }
    func poll() {
        let request = root.appendingPathComponent("request.json")
        guard !busy, let data = try? Data(contentsOf: request),
              let object = try? JSONSerialization.jsonObject(with: data) as? [String: Any] else { return }
        busy = true; try? FileManager.default.removeItem(at: request)
        switch object["op"] as? String ?? "eval" {
        case "hide": window.level = .normal; window.miniaturize(nil); reply(["hidden": true])
        case "show": window.level = .floating; window.deminiaturize(nil); window.makeKeyAndOrderFront(nil); NSApp.activate(ignoringOtherApps: true); reply(["visible": true])
        case "close": reply(["closed": true]); NSApp.terminate(nil)
        case "resize":
            let width=max(840,min(1920,object["width"] as? Double ?? 1200)),height=max(620,min(1200,object["height"] as? Double ?? 760))
            window.setContentSize(NSSize(width:width,height:height));window.center();reply(["width":width,"height":height])
        case "snapshot":
            let path = root.appendingPathComponent(object["name"] as? String ?? "snapshot.png")
            web.takeSnapshot(with: nil) { image, error in
                guard let image, let tiff = image.tiffRepresentation, let bitmap = NSBitmapImageRep(data: tiff),
                      let png = bitmap.representation(using: .png, properties: [:]) else {
                    self.reply(["error": error?.localizedDescription ?? "snapshot unavailable"]); return
                }
                do { try png.write(to: path); self.reply(["path": path.path]) }
                catch { self.reply(["error": error.localizedDescription]) }
            }
        default:
            web.evaluateJavaScript(object["js"] as? String ?? "null") { value, error in
                if let error { self.reply(["error": String(describing: (error as NSError).userInfo)]) }
                else { self.reply(["value": value ?? NSNull()]) }
            }
        }
    }
}
