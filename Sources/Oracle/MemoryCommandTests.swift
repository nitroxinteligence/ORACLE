import Foundation
import CryptoKit

private struct MemoryCommandTestDevice:OracleLicenseDeviceProviding {
    func identifier(create:Bool)throws->String {"ORACLE-MAC2-"+String(repeating:"b",count:64)}
}

func runMemoryCommandTests()throws {
    let root=try oracleTestDirectory("memory-command-core");defer{try? fm.removeItem(at:root)}
    var count=0
    func expect(_ value:Bool,_ text:String)throws {guard value else{throw failure(text)};count+=1;print("PASS "+text)}
    func refuses(_ text:String,_ body:()throws->Void)throws {do{try body()}catch{count+=1;print("PASS "+text);return};throw failure("Accepted: "+text)}
    let key=Curve25519.Signing.PrivateKey(),device=MemoryCommandTestDevice()
    let core=try Core(home:root.appendingPathComponent("state"),licenseDevice:device,licenseTrust:LicenseKeys(version:1,keys:["fixture":key.publicKey.rawRepresentation.base64EncodedString()]))
    let vault=root.appendingPathComponent("vault"),other=root.appendingPathComponent("other"),backups=root.appendingPathComponent("backups")
    for path in [vault,other,backups]{try fm.createDirectory(at:path,withIntermediateDirectories:true)}
    core.config=["vault":vault.path,"vaultSelectionRevision":UUID().uuidString.lowercased()];try core.persist()
    try refuses("CLI status requires real license"){_=try OracleMemoryCommand.run(core:core,operation:"status")}
    try refuses("CLI mutation requires real license"){_=try OracleMemoryCommand.run(core:core,operation:"ai-configure",input:["enabled":false])}
    _=try core.licenseDeviceRequest()
    let grant=OracleLicense(version:2,product:"oracle-macos",keyID:"fixture",licenseID:UUID().uuidString,subject:"Synthetic memory CLI",issuedAt:1,expiresAt:nil,deviceID:try device.identifier(create:false))
    let payload=try JSONEncoder().encode(grant)
    _=try core.activateLicense("ORACLE2."+base64URL(payload)+"."+base64URL(try key.signature(for:Data("ORACLE2.".utf8)+payload)))
    guard core.distributionHostHome().path.hasPrefix(root.path+"/") else{throw failure("O teste CLI exige host-fixture isolado, sem leitura do perfil pessoal.")}
    let status=try OracleMemoryCommand.run(core:core,operation:"status"),scope=status["scopeToken"] as! String
    try expect(status["runtime"] is [String:Any] && status["maintenance"] is [String:Any] && status["router"] is [String:Any],"CLI status includes real runtime maintenance and router projections")
    try expect((status["aiMemory"] as! [String:Any])["enabled"] as? Bool==false && (status["vaultBackup"] as! [String:Any])["enabled"] as? Bool==false,"CLI license never enables independent consents")
    let input=root.appendingPathComponent("input.json");try Data("{\"enabled\":false}".utf8).write(to:input)
    try expect(try OracleMemoryCommand.input(file:input)["enabled"] as? Bool==false,"CLI reads bounded JSON object")
    let linked=root.appendingPathComponent("linked.json");try fm.createSymbolicLink(at:linked,withDestinationURL:input)
    try refuses("CLI rejects symlink JSON"){_=try OracleMemoryCommand.input(file:linked)}
    try refuses("CLI rejects directory JSON"){_=try OracleMemoryCommand.input(file:root)}
    try Data(repeating:32,count:1_000_001).write(to:input)
    try refuses("CLI refuses JSON larger than 1 MB"){_=try OracleMemoryCommand.input(file:input)}
    try Data("[]".utf8).write(to:input)
    try refuses("CLI rejects non-object JSON"){_=try OracleMemoryCommand.input(file:input)}
    let request=try OracleMemoryCommand.request(arguments:["oracle","--memory","status","--state",core.home.path])
    try expect(request.operation=="status" && request.input==nil,"CLI accepts one explicit operation")
    try refuses("CLI does not combine self-tests with operations"){_=try OracleMemoryCommand.request(arguments:["oracle","--memory","status","--self-test-memory-command"])}
    try refuses("CLI does not combine other product operations"){_=try OracleMemoryCommand.request(arguments:["oracle","--memory","status","--update","apply"])}
    try refuses("CLI refuses repeated operation switch"){_=try OracleMemoryCommand.request(arguments:["oracle","--memory","status","--memory","ai-export"])}
    try refuses("CLI rejects numeric consent"){_=try OracleMemoryCommand.run(core:core,operation:"ai-configure",input:["enabled":1])}
    try refuses("CLI rejects unexpected fields"){_=try OracleMemoryCommand.run(core:core,operation:"status",input:["enable":true])}
    let workspace="11111111-1111-4111-8111-111111111111",project="22222222-2222-4222-8222-222222222222"
    let source=root.appendingPathComponent("wiki/"+workspace+"/"+project),page=source.appendingPathComponent("decisions/core.md")
    try fm.createDirectory(at:page.deletingLastPathComponent(),withIntermediateDirectories:true)
    let text="---\ntype: Decision\ntier: semantic\ntitle: CLI fixture\ngenerated:\n  by: process:ai-memory/2.4.2\n---\n# Apenas fixture\n"
    try Data(text.utf8).write(to:page)
    try refuses("CLI enabling requires selection scope"){_=try OracleMemoryCommand.run(core:core,operation:"ai-configure",input:["enabled":true,"source":source.path])}
    core.config["vault"]=other.path;core.config["vaultSelectionRevision"]=UUID().uuidString.lowercased();try core.persist()
    core.config["vault"]=vault.path;core.config["vaultSelectionRevision"]=UUID().uuidString.lowercased();try core.persist()
    try refuses("CLI rejects stale scope after A B A vault selection"){_=try OracleMemoryCommand.run(core:core,operation:"ai-configure",input:["enabled":true,"source":source.path,"scopeToken":scope])}
    try refuses("backup enabling also rejects stale scope"){_=try OracleMemoryCommand.run(core:core,operation:"vault-backup-configure",input:["enabled":true,"destination":backups.path,"scopeToken":scope])}
    let current=try OracleMemoryCommand.run(core:core,operation:"status")["scopeToken"] as! String
    _=try OracleMemoryCommand.run(core:core,operation:"ai-configure",input:["enabled":true,"source":source.path,"scopeToken":current])
    let listing=try OracleMemoryCommand.run(core:core,operation:"ai-candidates"),items=listing["items"] as! [[String:Any]],snapshot=listing["snapshot"] as! String,id=items[0]["id"] as! String
    let preview=try OracleMemoryCommand.run(core:core,operation:"ai-preview",input:["id":id,"snapshot":snapshot])
    try expect(preview["text"] as? String==text,"CLI preview uses real Core source snapshot")
    try refuses("CLI export refuses unconfirmed write"){_=try OracleMemoryCommand.run(core:core,operation:"ai-export",input:["ids":[id],"snapshot":snapshot,"confirmed":false])}
    let exported=try OracleMemoryCommand.run(core:core,operation:"ai-export",input:["ids":[id],"snapshot":snapshot,"confirmed":true])
    let destination=vault.appendingPathComponent((exported["results"] as! [[String:Any]])[0]["path"] as! String)
    try expect(try Data(contentsOf:destination)==Data(text.utf8),"CLI export routes real engine and preserves exact Markdown")
    try expect(exported["indexed"] as? Bool==false && exported["retrieved"] as? Bool==false,"CLI never claims fabricated indexing or retrieval")
    let repeated=try OracleMemoryCommand.run(core:core,operation:"ai-export",input:["ids":[id],"snapshot":snapshot,"confirmed":true])
    try expect((repeated["results"] as! [[String:Any]])[0]["status"] as? String=="no_op","CLI keeps Core idempotent export contract")
    try Data((text+"Changed source\n").utf8).write(to:page)
    try refuses("CLI preview rejects stale snapshot"){_=try OracleMemoryCommand.run(core:core,operation:"ai-preview",input:["id":id,"snapshot":snapshot])}
    _=try OracleMemoryCommand.run(core:core,operation:"vault-backup-configure",input:["enabled":true,"destination":backups.path,"scopeToken":current])
    let backup=try OracleMemoryCommand.run(core:core,operation:"vault-backup-create"),backupID=backup["id"] as! String
    try expect(backup["complete"] as? Bool==true,"CLI creates owned full vault snapshot through Core")
    let restore=root.appendingPathComponent("restore");try fm.createDirectory(at:restore,withIntermediateDirectories:true)
    try refuses("CLI restore requires confirmation"){_=try OracleMemoryCommand.run(core:core,operation:"vault-backup-restore",input:["id":backupID,"destination":restore.path,"confirmed":false])}
    let restored=try OracleMemoryCommand.run(core:core,operation:"vault-backup-restore",input:["id":backupID,"destination":restore.path,"confirmed":true])
    try expect(restored["complete"] as? Bool==true,"CLI restores only registered snapshot to chosen empty fixture")
    try refuses("CLI cache pruning requires confirmation"){_=try OracleMemoryCommand.run(core:core,operation:"cache-prune",input:["confirmed":false,"previewID":UUID().uuidString])}
    _=try OracleMemoryCommand.run(core:core,operation:"ai-configure",input:["enabled":false])
    _=try OracleMemoryCommand.run(core:core,operation:"vault-backup-configure",input:["enabled":false])
    try expect(try OracleMemoryCommand.run(core:core,operation:"vault-backup-status")["enabled"] as? Bool==false,"CLI explicit revocation persists")
    print("Memory CLI: \(count) checks; isolated signed synthetic Core, no model or UI")
}
