// Test executable only. This file is never part of Sources/Oracle or a distributed bundle.
// Uses the production onboarding bridge/controller/driver and real pinned GBrain.
// Only device identity, folder selection and optional Codex transport are synthetic.
import AppKit
import WebKit
import CryptoKit

var core: Core!

private struct IntegrationDevice: OracleDeviceIdentity {
    let key = P256.Signing.PrivateKey()
    var publicKey: Data { key.publicKey.x963Representation }
    func sign(_ bytes: Data) throws -> Data { try key.signature(for: bytes).rawRepresentation }
}

private final class IntegrationAccess {
    let device = IntegrationDevice()
    let keys: LicenseKeys
    let code: String
    init() throws {
        let issuer = Curve25519.Signing.PrivateKey()
        keys = LicenseKeys(version: 1, keys: ["fixture": issuer.publicKey.rawRepresentation.base64EncodedString()])
        let value = OracleLicense(version: 2, product: "oracle-macos", keyID: "fixture", licenseID: UUID().uuidString,
            subject: "Integration fixture", issuedAt: 1, expiresAt: nil, deviceID: device.fingerprint,
            devicePublicKey: base64URL(device.publicKey), invitationID: digest(Data("fixture".utf8)), requestID: UUID().uuidString, role: "student")
        let bytes = try JSONEncoder().encode(value)
        code = "ORACLE2." + base64URL(bytes) + "." + base64URL(try issuer.signature(for: Data("ORACLE2.".utf8) + bytes))
    }
    func validate() throws -> OracleLicense { try validateDeviceLicense(code, keys: keys, identity: device) }
    func project(_ value: [String: Any]) throws -> [String: Any] {
        let license = try validate()
        var result = value
        result["licensed"] = true; result["role"] = license.role; result["legacyAccess"] = false
        result["capabilities"] = licenseCapabilities(license)
        result["deviceSupport"] = ["supported": true, "kind": "synthetic-test-key-not-hardware-attestation"]
        return result
    }
}

private final class ForbiddenCodex: CodexConnection {
    var onNotification: ((String, [String: Any]) -> Void)?
    var onRequest: ((Any, String, [String: Any]) -> Void)?
    var onDisconnect: (() -> Void)?
    var isRunning = false
    let version = "disabled-in-offline-integration"
    private let lock = NSLock()
    private var attempted = [String]()
    var calls: [String] { lock.lock(); defer { lock.unlock() }; return attempted }
    private func refused(_ name: String) -> Error { lock.lock(); attempted.append(name); lock.unlock(); return failure("Forbidden Codex call: " + name) }
    func start(cwd: URL) throws { throw refused("start") }
    func account() throws -> [String: Any] { throw refused("account") }
    func request(_ method: String, _ params: [String: Any], timeout: Double) throws -> [String: Any] { throw refused(method) }
    func reply(id: Any, result: [String: Any]) throws { throw refused("reply") }
    func inventory(threadID: String?) -> [String: Any] { _ = refused("inventory"); return ["status": "unavailable", "plugins": []] }
    func reject(id: Any) { _ = refused("reject") }
    func stop() {}
}

// Named App to compile the actual shared OnboardingUIBridge.swift unchanged.
final class App: NSObject, NSApplicationDelegate, WKNavigationDelegate, WKScriptMessageHandler {
    var window: NSWindow!
    var web: WKWebView!
    var onboardingController: OnboardingController?
    let queue = DispatchQueue(label: "oracle.integration.core")
    let memoryQueue = DispatchQueue(label: "oracle.integration.memory")
    private let access: IntegrationAccess
    private let codex = ForbiddenCodex()
    private let root: URL
    private let script: URL
    private var methods = [String: String]()
    private var counts = [String: Int]()
    private var finished = false
    private var saveDelay = 0.0
    init(root: URL, script: URL) throws {
        self.root = root; self.script = script; access = try IntegrationAccess()
        super.init()
        let access = self.access
        onboardingController = try OnboardingController(home: core.home, bridge: codex, automaticallyReconnect: false,
            localDriver: NativeOfflineInstallation(), accessCheck: { _ = try access.validate() })
    }
    func applicationDidFinishLaunching(_ notification: Notification) {
        NSApp.setActivationPolicy(.regular)
        let content = WKUserContentController(); content.add(self, name: "oracle")
        let config = WKWebViewConfiguration(); config.userContentController = content
        config.websiteDataStore = .nonPersistent(); config.preferences.tabFocusesLinks = true
        web = WKWebView(frame: .zero, configuration: config); web.navigationDelegate = self
        window = NSWindow(contentRect: NSRect(x: 0, y: 0, width: 1200, height: 780), styleMask: [.titled, .resizable, .closable], backing: .buffered, defer: false)
        window.title = "Oracle — integração isolada"; window.contentView = web; window.center(); window.makeKeyAndOrderFront(nil)
        let resources = Bundle.main.resourceURL!.appendingPathComponent("web")
        web.loadFileURL(resources.appendingPathComponent("index.html"), allowingReadAccessTo: resources)
        DispatchQueue.main.asyncAfter(deadline: .now() + 300) { self.finish(["fatal": "Integrated UI timeout"], code: 2) }
    }
    func reply(_ id: String, _ value: Any? = nil, _ error: String? = nil) {
        precondition(Thread.isMainThread)
        let method = methods.removeValue(forKey: id) ?? ""
        var result = value ?? NSNull()
        var failureText = error
        do {
            if error == nil, method == "onboardingStatus", let status = value as? [String: Any] { result = try access.project(status) }
            if error == nil, method == "snapshot", var snapshot = value as? [String: Any] {
                snapshot["onboarding"] = try access.project(snapshot["onboarding"] as? [String: Any] ?? [:]); result = snapshot
            }
        } catch { failureText = error.localizedDescription }
        let envelope: [String: Any] = failureText.map { ["error": $0] } ?? ["value": result]
        if let data = try? jsonData(envelope), let safeID = try? jsonData([id]) {
            web.evaluateJavaScript("window.oracleReply(\(String(decoding: safeID, as: UTF8.self))[0],\(String(decoding: data, as: UTF8.self)))", completionHandler: nil)
        }
    }
    func userContentController(_ userContentController: WKUserContentController, didReceive message: WKScriptMessage) {
        guard message.frameInfo.isMainFrame, message.frameInfo.request.url?.isFileURL == true,
            let body = message.body as? [String: Any], let id = body["id"] as? String, let method = body["method"] as? String else { return }
        methods[id] = method; counts[method, default: 0] += 1
        let params = body["params"] as? [String: Any] ?? [:]
        if method == "boot" { reply(id, ["locked": false, "accessibility": ["reduceMotion": true]]); return }
        // The fixture supplies its sole allowed folder; production always uses the native picker.
        if method == "onboardingChooseVault" {
            onboardingController!.queue.async {
                do { try self.onboardingController!.selectVault(self.root.appendingPathComponent("vault")); DispatchQueue.main.async { self.reply(id, ["name": "vault"]) } }
                catch { DispatchQueue.main.async { self.reply(id, nil, error.localizedDescription) } }
            }; return
        }
        if ["onboardingActivate", "onboardingActivationRequest", "onboardingChooseBrain", "onboardingOpenCodex"].contains(method) { reply(id, nil, "No real identity, external folder or application in fixture"); return }
        if handleOnboarding(id, method: method, params: params) { return }
        if method == "fixtureEvidence" { reply(id, ["calls": counts, "codexCalls": codex.calls, "hardwareIdentityUsed": false, "nativeDriver": true]); return }
        if method == "fixtureSaveDelay" { saveDelay = min(1, max(0, params["seconds"] as? Double ?? 0)); reply(id, true); return }
        if method == "fixtureResize" { window.setContentSize(NSSize(width: 840, height: 620)); reply(id, true); return }
        if method == "snapshot" { core.memorySync.start() }
        if method == "memoryStatus" { reply(id, core.memorySync.status()); return }
        if method == "memoryRefresh" { core.memorySync.invalidate(reason: "manual-refresh"); core.memorySync.start(); reply(id, core.memorySync.status()); return }
        let delay = saveDelay
        let workQueue = method == "gbrainRead" ? memoryQueue : queue
        workQueue.async {
            do {
                _ = try self.access.validate()
                let value: Any
                switch method {
                case "snapshot": value = try core.snapshot()
                case "events": value = try core.events()
                case "updateStatus": value = ["phase": "idle", "busy": false, "available": false, "results": []] as [String: Any]
                case "conversations", "instructions": value = [Any]()
                case "read": value = try core.readEditableNote(params["path"] as? String ?? "")
                case "saveNote":
                    if delay > 0 { Thread.sleep(forTimeInterval: delay) }
                    value = try core.saveNote(path: params["path"] as? String ?? "", original: params["hash"] as? String ?? "", text: params["text"] as? String ?? "")
                case "saveDraft": value = try core.saveDraft(path: params["path"] as? String ?? "", original: params["hash"] as? String ?? "", text: params["text"] as? String ?? "")
                case "discardDraft": try core.discardDraft(params["path"] as? String ?? ""); value = true
                case "gbrainRead": value = try Core(home: core.home).gbrainRead(params)
                case "gbrainReadback": value = try readJSON(core.home.appendingPathComponent("setup/gbrain-readback.json"))
                case "fixtureVerify": value = try core.onboardingFinalVerification()
                case "fixtureExternalEdit":
                    // Only this dedicated canonical fixture can be changed by the external-editor probe.
                    try Data((params["text"] as? String ?? "").utf8).write(to: self.root.appendingPathComponent("vault/WIKI/Integration.md"), options: .atomic)
                    value = true
                case "fixtureStopSync": core.memorySync.stop(); value = core.memorySync.status()
                case "saveLayout", "saveVisualPreferences": value = true
                default: throw failure("Unimplemented fixture method: " + method)
                }
                DispatchQueue.main.async { self.reply(id, value) }
            } catch { DispatchQueue.main.async { self.reply(id, nil, error.localizedDescription) } }
        }
    }
    func webView(_ webView: WKWebView, didFinish navigation: WKNavigation!) {
        DispatchQueue.main.asyncAfter(deadline: .now() + 0.5) {
            do {
                let script = try String(contentsOf: self.script, encoding: .utf8)
                self.web.callAsyncJavaScript(script, arguments: [:], in: nil, in: .page) { result in
                    switch result {
                    case .success(let value):
                        let report = value as? [String: Any] ?? ["fatal": "Missing report"]
                        self.web.takeSnapshot(with: nil) { image, _ in
                            if let tiff = image?.tiffRepresentation, let bitmap = NSBitmapImageRep(data: tiff), let png = bitmap.representation(using: .png, properties: [:]) { try? png.write(to: self.root.appendingPathComponent("integration-ui.png")) }
                            self.finish(report, code: report["fatal"] != nil || (report["failed"] as? Int ?? 0) > 0 ? 1 : 0)
                        }
                    case .failure(let error): self.finish(["fatal": String(describing: (error as NSError).userInfo)], code: 1)
                    }
                }
            } catch { self.finish(["fatal": error.localizedDescription], code: 1) }
        }
    }
    private func finish(_ report: [String: Any], code: Int32) {
        guard !finished else { return }; finished = true
        core.memorySync.stop(); onboardingController?.shutdown()
        var report = report
        report["bridgeCalls"] = counts; report["codexCalls"] = codex.calls
        report["scope"] = "Real WKWebView, production onboarding bridge/controller, NativeOfflineInstallation and pinned GBrain/PGLite. Synthetic device keys and folder picker. No hardware activation or optional Codex execution."
        if let data = try? jsonData(report) { try? data.write(to: root.appendingPathComponent("result.json"), options: .atomic); print(String(decoding: data, as: UTF8.self)) }
        fflush(stdout); exit(code)
    }
}

@main struct OracleIntegrationMain {
    static func main() throws {
        let args = CommandLine.arguments
        guard args.count == 3, Bundle.main.bundleIdentifier?.hasSuffix(".validation") == true else { throw failure("Dedicated validation bundle and fixture arguments required") }
        let root = URL(fileURLWithPath: args[1]).standardizedFileURL
        guard root.pathComponents.contains(".work"), root.resolvingSymlinksInPath().path == root.path,
            (try? String(contentsOf: root.appendingPathComponent("fixture-marker"))) == "oracle-integrated-audit\n" else { throw failure("Refusing non-fixture state") }
        core = try Core(home: root.appendingPathComponent("state"))
        core.config["fixture"] = true; try core.persist()
        let host = try App(root: root, script: URL(fileURLWithPath: args[2]))
        NSApplication.shared.delegate = host
        withExtendedLifetime(host) { NSApplication.shared.run() }
    }
}
