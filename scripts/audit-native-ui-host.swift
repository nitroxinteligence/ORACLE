// Test executable only. Compiled instead of production main.swift; never packaged.
// Actual Core, OnboardingUIBridge, NativeOfflineInstallation and copied GBrain.
// Only the license identity/access projection is ephemeral and synthetic.
import AppKit
import WebKit
import CryptoKit

var core: Core!

private struct EphemeralAuditIdentity: OracleDeviceIdentity {
    let key = P256.Signing.PrivateKey()
    var publicKey: Data { key.publicKey.x963Representation }
    func sign(_ data: Data) throws -> Data { try key.signature(for: data).rawRepresentation }
}

private final class AuditPermit {
    let identity = EphemeralAuditIdentity()
    let keys: LicenseKeys
    let response: String
    init() throws {
        let issuer = Curve25519.Signing.PrivateKey()
        keys = LicenseKeys(version: 1, keys: ["synthetic": issuer.publicKey.rawRepresentation.base64EncodedString()])
        let license = OracleLicense(version: 2, product: "oracle-macos", keyID: "synthetic", licenseID: UUID().uuidString,
            subject: "Synthetic integration fixture", issuedAt: 1, expiresAt: nil, deviceID: identity.fingerprint,
            devicePublicKey: base64URL(identity.publicKey), invitationID: digest(Data("synthetic".utf8)), requestID: UUID().uuidString, role: "student")
        let bytes = try JSONEncoder().encode(license)
        response = "ORACLE2." + base64URL(bytes) + "." + base64URL(try issuer.signature(for: Data("ORACLE2.".utf8) + bytes))
    }
    func validate() throws -> OracleLicense { try validateDeviceLicense(response, keys: keys, identity: identity) }
    func project(_ snapshot: [String: Any]) throws -> [String: Any] {
        let license = try validate()
        var result = snapshot
        result["licensed"] = true; result["role"] = license.role; result["capabilities"] = licenseCapabilities(license)
        result["deviceSupport"] = ["supported": true, "synthetic": true]
        result["legacyAccess"] = false
        return result
    }
}

// Same narrow surface required by the real OnboardingUIBridge.swift extension.
// No production App entry point or physical authentication is replaced on disk.
final class App: NSObject, NSApplicationDelegate, WKNavigationDelegate, WKScriptMessageHandler {
    var window: NSWindow!, web: WKWebView!
    var locked = false, lockGeneration = 0
    var onboardingController: OnboardingController?
    let queue = DispatchQueue(label: "oracle.fixture.core")
    let memoryQueue = DispatchQueue(label: "oracle.fixture.memory")
    let root: URL, resources: URL, script: URL
    private let permit: AuditPermit
    private var finished = false, started = false
    private var methods: [String: String] = [:], calls: [String: Int] = [:]
    init(root: URL, resources: URL, script: URL) throws {
        self.root = root; self.resources = resources; self.script = script; permit = try AuditPermit()
        super.init()
        let access = permit
        onboardingController = try OnboardingController(home: core.home, automaticallyReconnect: false,
            localDriver: NativeOfflineInstallation(), accessCheck: { _ = try access.validate() })
        try onboardingController!.selectVault(root.appendingPathComponent("vault"))
    }
    func applicationDidFinishLaunching(_ notification: Notification) {
        NSApp.setActivationPolicy(.regular)
        let content = WKUserContentController(); content.add(self, name: "oracle")
        let config = WKWebViewConfiguration(); config.userContentController = content; config.websiteDataStore = .nonPersistent()
        config.preferences.tabFocusesLinks = true
        web = WKWebView(frame: .zero, configuration: config); web.navigationDelegate = self
        window = NSWindow(contentRect: NSRect(x: 0, y: 0, width: 1200, height: 780), styleMask: [.titled, .closable, .resizable], backing: .buffered, defer: false)
        window.title = "Oracle — integração nativa sintética"; window.contentView = web; window.center(); window.makeKeyAndOrderFront(nil)
        let webRoot = resources.appendingPathComponent("web")
        web.loadFileURL(webRoot.appendingPathComponent("index.html"), allowingReadAccessTo: webRoot)
        DispatchQueue.main.asyncAfter(deadline: .now() + 300) { self.finish(["fatal": "Native UI fixture exceeded its bounded deadline"], code: 2) }
    }
    func reply(_ id: String, _ value: Any? = nil, _ error: String? = nil) {
        let method = methods.removeValue(forKey: id) ?? ""
        do {
            var output: Any = value ?? NSNull()
            if error == nil, method == "onboardingStatus", let snapshot = value as? [String: Any] { output = try permit.project(snapshot) }
            let result: [String: Any] = error.map { ["error": $0] } ?? ["value": output]
            let key = String(decoding: try jsonData([id]), as: UTF8.self)
            let bytes = String(decoding: try jsonData(result), as: UTF8.self)
            web.evaluateJavaScript("window.oracleReply(\(key)[0],\(bytes))", completionHandler: nil)
        } catch { finish(["fatal": error.localizedDescription], code: 1) }
    }
    func userContentController(_ userContentController: WKUserContentController, didReceive message: WKScriptMessage) {
        guard message.frameInfo.isMainFrame, let origin = message.frameInfo.request.url, origin.isFileURL,
              origin.standardizedFileURL.path.hasPrefix(resources.appendingPathComponent("web").path + "/"),
              let body = message.body as? [String: Any], let id = body["id"] as? String, let method = body["method"] as? String,
              methods.count < 128 else { return }
        methods[id] = method; calls[method, default: 0] += 1
        let params = body["params"] as? [String: Any] ?? [:]
        // No UI route can create a hardware identity, discover/login to an account,
        // open a network URL, use the clipboard or select an unrelated directory.
        let onboardingAllowed: Set<String> = ["onboardingStatus", "onboardingDraft", "onboardingDraftUI", "onboardingPlan", "onboardingInstall", "onboardingConfirmIdentity", "onboardingResume", "onboardingCancel"]
        if method.hasPrefix("onboarding") {
            guard onboardingAllowed.contains(method) else { reply(id, nil, "Unavailable in the isolated fixture"); return }
            _ = handleOnboarding(id, method: method, params: params); return
        }
        do { _ = try permit.validate() } catch { reply(id, nil, error.localizedDescription); return }
        if method == "boot" { reply(id, ["locked": false, "accessibility": ["reduceMotion": true, "reduceTransparency": true]]); return }
        if method == "memoryStatus" { reply(id, core.memorySync.status()); return }
        if method == "memoryRefresh" { core.memorySync.invalidate(reason: "fixture-manual"); core.memorySync.start(); reply(id, core.memorySync.status()); return }
        if method == "snapshot" { core.memorySync.start() }
        let target = method == "gbrainRead" ? memoryQueue : queue
        target.async {
            do {
                let result: Any
                switch method {
                case "snapshot":
                    var value = try core.snapshot()
                    value["onboarding"] = try self.permit.project(self.onboardingController!.snapshot())
                    value["build"] = ["version": "integration-fixture", "channel": "validation", "verifiedRelease": false]
                    result = value
                case "read": result = try core.readEditableNote(params["path"] as? String ?? "")
                case "saveNote": result = try core.saveNote(path: params["path"] as? String ?? "", original: params["hash"] as? String ?? "", text: params["text"] as? String ?? "")
                case "saveDraft": result = try core.saveDraft(path: params["path"] as? String ?? "", original: params["hash"] as? String ?? "", text: params["text"] as? String ?? "")
                case "gbrainRead": result = try Core(home: core.home).gbrainRead(params)
                case "events": result = try core.events()
                case "updateStatus": result = ["phase": "not_checked", "busy": false, "available": false, "results": []]
                case "fixtureExternalEdit":
                    try Data("# Integration note\n\nExternal synthetic revision\n".utf8).write(to: self.root.appendingPathComponent("vault/WIKI/integration-note.md"), options: .atomic)
                    result = true
                case "fixtureResize":
                    DispatchQueue.main.async { self.window.setContentSize(NSSize(width: 840, height: 620)); self.reply(id, true) }; return
                default: throw failure("Method is not enabled in the isolated fixture: " + method)
                }
                DispatchQueue.main.async { self.reply(id, result) }
            } catch { DispatchQueue.main.async { self.reply(id, nil, error.localizedDescription) } }
        }
    }
    func webView(_ webView: WKWebView, didFinish navigation: WKNavigation!) {
        guard !started else { return }; started = true
        do {
            let source = try String(contentsOf: script, encoding: .utf8)
            web.callAsyncJavaScript("try {\n" + source + "\n} catch(error) {return {fatal:String(error),stack:error.stack,body:document.body.innerText.slice(0,2000)}}", arguments: [:], in: nil, in: .page) { result in
                switch result {
                case .success(let value):
                    let report = value as? [String: Any] ?? ["fatal": "Missing JS report"]
                    self.finish(report, code: report["fatal"] != nil || (report["failed"] as? Int ?? 0) > 0 ? 1 : 0)
                case .failure(let error): self.finish(["fatal": error.localizedDescription], code: 1)
                }
            }
        } catch { finish(["fatal": error.localizedDescription], code: 1) }
    }
    func finish(_ report: [String: Any], code: Int32) {
        guard !finished else { return }; finished = true
        core.memorySync.stop(); onboardingController?.shutdown()
        var value = report
        value["calls"] = calls; value["fixture"] = root.path
        value["scope"] = "Real WKWebView, OnboardingUIBridge, NativeOfflineInstallation, Core, official GBrain/PGLite and adapter; ephemeral signed identity, no physical Keychain activation or production App launch"
        value["at"] = ISO8601DateFormatter().string(from: Date())
        do { try writeJSON(value, root.appendingPathComponent("native-ui-result.json")) } catch { fputs("Unable to persist fixture result\n", stderr) }
        print(String(decoding: (try? jsonData(value)) ?? Data(), as: UTF8.self)); fflush(stdout)
        window?.orderOut(nil); exit(code)
    }
}

@main struct NativeAuditMain {
    static func main() throws {
        guard CommandLine.arguments.count == 4 else { throw failure("Expected explicit fixture, resources and test script") }
        let root = URL(fileURLWithPath: CommandLine.arguments[1]).standardizedFileURL
        let resources = URL(fileURLWithPath: CommandLine.arguments[2]).standardizedFileURL
        let script = URL(fileURLWithPath: CommandLine.arguments[3]).standardizedFileURL
        guard root.pathComponents.contains(".work"), root.path == root.resolvingSymlinksInPath().path,
              resources.path.hasPrefix(root.path + "/"), script.path.hasPrefix(root.path + "/"),
              !fm.fileExists(atPath: root.appendingPathComponent("state").path),
              ProcessInfo.processInfo.environment["HOME"] == root.appendingPathComponent("host-home").path,
              ProcessInfo.processInfo.environment["ORACLE_ENGINE_RESOURCES"] == resources.appendingPathComponent("engine").path else { throw failure("Native UI tests require a fresh isolated .work fixture and explicit environment") }
        core = try Core(home: root.appendingPathComponent("state"))
        let app = try App(root: root, resources: resources, script: script)
        NSApplication.shared.delegate = app; NSApplication.shared.run()
    }
}
