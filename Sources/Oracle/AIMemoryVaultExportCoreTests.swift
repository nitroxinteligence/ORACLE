import Foundation
import CryptoKit

private struct AIMemoryExportTestDevice: OracleLicenseDeviceProviding {
    func identifier(create:Bool)throws->String {"ORACLE-MAC2-"+String(repeating:"e",count:64)}
}

/// Runs in the integrated native binary. Device and grant are synthetic; no
/// Keychain identity, installed wiki, personal vault or model is accessed.
func runAIMemoryVaultExportCoreTests()throws {
    let root=try oracleTestDirectory("ai-memory-export-core")
    defer{try? fm.removeItem(at:root)}
    let key=Curve25519.Signing.PrivateKey(),device=AIMemoryExportTestDevice()
    let core=try Core(home:root.appendingPathComponent("state"),licenseDevice:device,
        licenseTrust:LicenseKeys(version:1,keys:["fixture":key.publicKey.rawRepresentation.base64EncodedString()]))
    let workspace="11111111-1111-4111-8111-111111111111",project="22222222-2222-4222-8222-222222222222"
    let source=root.appendingPathComponent("installation/wiki/"+workspace+"/"+project)
    let vault=root.appendingPathComponent("Vault sintético Ana & João"),other=root.appendingPathComponent("Outro vault sintético")
    for folder in [source,vault,other]{try fm.createDirectory(at:folder,withIntermediateDirectories:true)}
    func markdown(_ title:String,tier:String="semantic")->String {
        "---\ntype: Decision\ntier: \(tier)\ntitle: \(title)\ngenerated:\n  by: process:ai-memory/2.4.2\n---\n# Fixture\nSomente conteúdo sintético.\n"
    }
    func writeSource(_ path:String,_ text:String)throws {
        let file=source.appendingPathComponent(path)
        try fm.createDirectory(at:file.deletingLastPathComponent(),withIntermediateDirectories:true)
        try Data(text.utf8).write(to:file)
    }
    let original=markdown("Decisão núcleo")
    try writeSource("decisions/core.md",original)
    try writeSource("sessions/session.md",markdown("Sessão excluída",tier:"episodic"))
    core.config=["vault":vault.path,"vaultSelectionRevision":UUID().uuidString.lowercased()];try core.persist()
    var count=0
    func expect(_ value:Bool,_ text:String)throws {guard value else{throw failure(text)};count+=1;print("PASS "+text)}
    func refuses(_ text:String,_ action:()throws->Void)throws {do{try action()}catch{count+=1;print("PASS "+text);return};throw failure("Accepted: "+text)}
    try expect(core.aiMemoryVaultExportStatus()["enabled"] as? Bool==false,"Core starts with AI Memory export disabled")
    try refuses("unlicensed Core cannot authorize export"){_=try core.configureAIMemoryVaultExport(enabled:true,source:source)}
    try expect(!fm.fileExists(atPath:core.home.appendingPathComponent("ai-memory-vault-export/consent.json").path),"unlicensed authorization creates no consent record")
    _=try core.licenseDeviceRequest()
    let grant=OracleLicense(version:2,product:"oracle-macos",keyID:"fixture",licenseID:UUID().uuidString,
        subject:"Synthetic AI Memory export",issuedAt:1,expiresAt:nil,deviceID:try device.identifier(create:false))
    let payload=try JSONEncoder().encode(grant)
    _=try core.activateLicense("ORACLE2."+base64URL(payload)+"."+base64URL(try key.signature(for:Data("ORACLE2.".utf8)+payload)))
    try expect(core.aiMemoryVaultExportStatus()["enabled"] as? Bool==false,"signed license alone does not enable export")
    try refuses("license alone does not admit wiki reading"){_=try core.aiMemoryVaultExportCandidates()}
    try refuses("source requires explicit selection"){_=try core.configureAIMemoryVaultExport(enabled:true)}
    try refuses("arbitrary folder is not a wiki project"){_=try core.configureAIMemoryVaultExport(enabled:true,source:root)}
    let enabled=try core.configureAIMemoryVaultExport(enabled:true,source:source)
    try expect(enabled["enabled"] as? Bool==true && enabled["targetMatches"] as? Bool==true,"explicit consent binds wiki project to selected vault")
    try expect(enabled["includeSessions"] as? Bool==false,"episodic sessions remain disabled by default")
    try expect(!fm.fileExists(atPath:core.home.appendingPathComponent("vault-backups/consent.json").path),"wiki authorization does not authorize vault backups")
    let listing=try core.aiMemoryVaultExportCandidates(),rows=listing["items"] as! [[String:Any]],snapshot=listing["snapshot"] as! String
    try expect(rows.count==1 && rows[0]["path"] as? String=="decisions/core.md" && listing["complete"] as? Bool==true,"Core lists only eligible durable pages with complete snapshot")
    let id=rows[0]["id"] as! String
    let preview=try core.aiMemoryVaultExportPreview(id:id,snapshot:snapshot)
    try expect(preview["text"] as? String==original,"Core preview preserves exact bounded source bytes")
    try expect(try fm.contentsOfDirectory(atPath:vault.path).isEmpty,"list and preview do not copy notes")
    try refuses("Core export requires separate confirmation"){_=try core.exportAIMemoryPages(ids:[id],confirmed:false,snapshot:snapshot)}
    try expect(try fm.contentsOfDirectory(atPath:vault.path).isEmpty,"missing confirmation leaves vault empty")
    let first=try core.exportAIMemoryPages(ids:[id],confirmed:true,snapshot:snapshot)
    let result=(first["results"] as! [[String:Any]])[0],destination=vault.appendingPathComponent(result["path"] as! String)
    try expect(first["complete"] as? Bool==true && result["status"] as? String=="written","native Core exports selected page and persists receipt")
    try expect(try Data(contentsOf:destination)==Data(original.utf8),"native destination preserves original Markdown bytes")
    try expect(first["indexed"] as? Bool==false && first["retrieved"] as? Bool==false && first["semanticApproval"] as? Bool==false,"copy never fabricates indexing retrieval or semantic approval")
    let second=try core.exportAIMemoryPages(ids:[id],confirmed:true,snapshot:snapshot)
    try expect((second["results"] as! [[String:Any]])[0]["status"] as? String=="no_op","native Core export is idempotent for same ID and hash")
    let nativeStatus=core.aiMemoryVaultExportStatus(),last=nativeStatus["lastRun"] as! [String:Any]
    try expect(last["vault"] as? String==vault.path && last["id"] is String && nativeStatus["indexed"] as? Bool==false && nativeStatus["retrieved"] as? Bool==false,"Core status exposes owned receipt without fabricating index coverage")
    let human=Data("Alteração humana sintética\n".utf8);try human.write(to:destination)
    let conflict=try core.exportAIMemoryPages(ids:[id],confirmed:true,snapshot:snapshot)
    try expect(conflict["complete"] as? Bool==false && (conflict["results"] as! [[String:Any]])[0]["status"] as? String=="conflict","Core reports human destination edit as preserved conflict")
    try expect(try Data(contentsOf:destination)==human,"Core conflict preserves exact human note")

    // Prepare only a synthetic interrupted engine journal, then exercise the
    // public Core recovery API with its real license/consent/vault gates.
    try writeSource("decisions/cut.md",markdown("Escrita interrompida"))
    let cutListing=try core.aiMemoryVaultExportCandidates(),cutRows=cutListing["items"] as! [[String:Any]]
    let cutID=cutRows.first{$0["path"] as? String=="decisions/cut.md"}!["id"] as! String
    let consent=try JSONDecoder().decode(AIMemoryExportConsent.self,from:Data(contentsOf:core.home.appendingPathComponent("ai-memory-vault-export/consent.json")))
    let runState=core.home.appendingPathComponent("ai-memory-vault-export/runs/"+OracleAIMemoryVaultExportEngine.hash(Data(vault.path.utf8)))
    var hooks=AIMemoryExportHooks();hooks.afterWrite={throw failure("Synthetic native recovery cut")}
    try refuses("synthetic post-write interruption prepares durable recovery journal") {
        _=try OracleAIMemoryVaultExportEngine.export(source:source,vault:vault,state:runState,consent:consent,
            ids:[cutID],confirmed:true,snapshot:cutListing["snapshot"] as? String,hooks:hooks)
    }
    let cutDestination=vault.appendingPathComponent("INBOX/oracle-ai-memory/"+workspace+"/"+project+"/decisions/cut.md")
    let cutHuman=Data("Texto humano após interrupção\n".utf8);try cutHuman.write(to:cutDestination)
    let recovery=try core.aiMemoryVaultExportRecoveryPreview(),token=recovery["previewID"] as! String
    try expect(recovery["recoveryRequired"] as? Bool==true,"native Core exposes conflict-bound recovery preview")
    try refuses("Core recovery requires separate confirmation"){_=try core.resolveAIMemoryVaultExportRecovery(confirmed:false,previewID:token)}
    let resolved=try core.resolveAIMemoryVaultExportRecovery(confirmed:true,previewID:token)
    try expect(resolved["status"] as? String=="preserved_conflicts" && resolved["notesChanged"] as? Bool==false,"Core recovery preserves notes and changes private disposition only")
    try expect(try Data(contentsOf:cutDestination)==cutHuman,"native recovery keeps human content byte for byte")
    try expect(try core.aiMemoryVaultExportRecoveryPreview()["recoveryRequired"] as? Bool==false,"native recovery closes pending journal")
    let afterRecovery=try core.exportAIMemoryPages(ids:[cutID],confirmed:true,snapshot:cutListing["snapshot"] as? String)
    try expect((afterRecovery["results"] as! [[String:Any]])[0]["status"] as? String=="conflict","preserved recovery note remains foreign on later export")

    core.config["vault"]=other.path;core.config["vaultSelectionRevision"]=UUID().uuidString.lowercased();try core.persist()
    try expect(core.aiMemoryVaultExportStatus()["enabled"] as? Bool==false,"vault change invalidates active export binding")
    try refuses("changed vault refuses previous source authorization"){_=try core.aiMemoryVaultExportCandidates()}
    core.config["vault"]=vault.path;core.config["vaultSelectionRevision"]=UUID().uuidString.lowercased();try core.persist()
    try expect(core.aiMemoryVaultExportStatus()["enabled"] as? Bool==false,"observed mismatch revocation is not revived on returning to old vault")
    _=try core.configureAIMemoryVaultExport(enabled:true,source:source)
    let oldScope=try core.memoryPortabilityScope()
    try core.withMemoryPortabilitySelection {
        try core.revokeMemoryPortabilityConsents()
        core.config["vault"]=other.path;core.config["vaultSelectionRevision"]=UUID().uuidString.lowercased();try core.persist()
    }
    try refuses("pending source choice cannot cross a new vault selection") {
        try core.withMemoryPortabilitySelection(expectedScope:oldScope){_=try core.configureAIMemoryVaultExport(enabled:true,source:source)}
    }
    core.config["vault"]=vault.path;core.config["vaultSelectionRevision"]=UUID().uuidString.lowercased();try core.persist()
    try expect(core.aiMemoryVaultExportStatus()["enabled"] as? Bool==false,"shared selection revocation persists when returning to old vault")
    print("AI Memory export Core: \(count) checks; signed synthetic device, no personal profile")
}
