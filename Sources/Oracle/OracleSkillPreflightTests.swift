import Foundation
import Darwin

func runOracleSkillPreflightTests(root:URL?=nil)throws {
    let base=try root ?? oracleTestDirectory("oracle-skill-preflight")
    let resources=base.appendingPathComponent("resources"),engine=resources.appendingPathComponent("engine")
    try fm.createDirectory(at:engine,withIntermediateDirectories:true)
    let prior=ProcessInfo.processInfo.environment["ORACLE_ENGINE_RESOURCES"]
    defer{if let prior{setenv("ORACLE_ENGINE_RESOURCES",prior,1)}else{unsetenv("ORACLE_ENGINE_RESOURCES")}}
    setenv("ORACLE_ENGINE_RESOURCES",engine.path,1)
    for path in OracleSkillInstallationPreflight.paths where path != "references/context.json" {
        let target=resources.appendingPathComponent("skills/oracle/"+path)
        try fm.createDirectory(at:target.deletingLastPathComponent(),withIntermediateDirectories:true)
        try Data((path=="SKILL.md" ? "---\nname: oracle\ndescription: synthetic\n---\n":"fixture "+path).utf8).write(to:target)
    }
    var count=0
    func check(_ ok:Bool,_ name:String)throws{guard ok else{throw failure(name)};count+=1;print("PASS "+name)}
    func reject(_ name:String,_ body:()throws->Void)throws{do{try body()}catch{try check(true,name);return};try check(false,name)}
    func fixture(_ name:String)throws->Core {
        let core=try Core(home:base.appendingPathComponent(name)),vault=base.appendingPathComponent(name+"-vault")
        try fm.createDirectory(at:vault,withIntermediateDirectories:true);core.config["vault"]=vault.path
        guard core.distributionHostHome().path.hasPrefix(base.path+"/") else{throw failure("Testes de router exigem host isolado em .work.")}
        return core
    }
    let manual=try fixture("manual"),host=manual.distributionHostHome(),skill=host.appendingPathComponent(".agents/skills/oracle")
    try fm.createDirectory(at:skill,withIntermediateDirectories:true)
    let manualBytes=Data("manual router".utf8);try manualBytes.write(to:skill.appendingPathComponent("SKILL.md"))
    let before=try fm.attributesOfItem(atPath:skill.path)[.modificationDate] as? Date
    let status=manual.oracleSkillInstallationStatus()
    try check(status["status"] as? String=="foreign" && status["filesInstalled"] as? Bool==false,"skill manual não é instalação do aplicativo")
    try reject("conflito é rejeitado antes de gravar"){_=try manual.installOracleSkill()}
    try check(try Data(contentsOf:skill.appendingPathComponent("SKILL.md"))==manualBytes,"skill foreign permanece byte a byte")
    try check(!fm.fileExists(atPath:host.appendingPathComponent(".agents/oracle-router-ledger.json").path) && before==(try fm.attributesOfItem(atPath:skill.path)[.modificationDate] as? Date),"falha não cria ledger nem toca pasta manual")
    let corrupt=try fixture("corrupt"),ledger=corrupt.distributionHostHome().appendingPathComponent(".agents/oracle-router-ledger.json")
    try fm.createDirectory(at:ledger.deletingLastPathComponent(),withIntermediateDirectories:true);try Data("broken JSON".utf8).write(to:ledger)
    try reject("recibo corrompido não vira estado ausente"){_=try corrupt.installOracleSkill()}
    try check(!fm.fileExists(atPath:corrupt.distributionHostHome().appendingPathComponent(".agents/skills").path),"recibo corrompido falha antes de criar raiz global")
    let managed=try fixture("managed")
    try check(managed.oracleSkillInstallationStatus()["status"] as? String=="missing","host vazio é missing e status não cria diretórios")
    try check(!fm.fileExists(atPath:managed.distributionHostHome().path),"consulta missing é somente leitura")
    let receipt=try managed.installOracleSkill(),folder=URL(fileURLWithPath:receipt["folder"] as! String)
    let current=managed.oracleSkillInstallationStatus()
    try check(current["status"] as? String=="current" && current["filesInstalled"] as? Bool==true,"instalação real em fixture torna arquivos current")
    try check(current["hostDiscovered"] as? Bool==false && current["executionVerified"] as? Bool==false,"arquivos instalados não inferem descoberta nem execução")
    _=try managed.installOracleSkill()
    let another=base.appendingPathComponent("other-vault");try fm.createDirectory(at:another,withIntermediateDirectories:true);managed.config["vault"]=another.path
    _=try managed.installOracleSkill()
    let profiles=try readJSON(folder.appendingPathComponent("references/context.json"))["profiles"] as! [String:[String:String]]
    try check(profiles.count==1 && profiles.values.first?["vault"]==another.path,"seleção explícita atualiza mesmo perfil sem duplicar router")
    let ownedBytes=Data("customized by owner".utf8);try ownedBytes.write(to:folder.appendingPathComponent("SKILL.md"))
    let ownedLedger=try Data(contentsOf:managed.distributionHostHome().appendingPathComponent(".agents/oracle-router-ledger.json"))
    try check(managed.oracleSkillInstallationStatus()["status"] as? String=="edited_owned","edição de arquivo gerenciado é identificada")
    try reject("edição owned não é sobrescrita"){_=try managed.installOracleSkill()}
    try check(try Data(contentsOf:folder.appendingPathComponent("SKILL.md"))==ownedBytes && Data(contentsOf:managed.distributionHostHome().appendingPathComponent(".agents/oracle-router-ledger.json"))==ownedLedger,"erro preserva bytes e recibo anteriores")
    let pending=try fixture("pending"),pendingReceipt=try pending.installOracleSkill(),pendingFolder=URL(fileURLWithPath:pendingReceipt["folder"] as! String)
    let pendingLedger=pending.distributionHostHome().appendingPathComponent(".agents/oracle-router-ledger.json")
    var journal=try readJSON(pendingLedger);journal["pending_hashes"]=journal["hashes"];journal["filesInstalled"]=false;try writeJSON(journal,pendingLedger)
    try fm.removeItem(at:pendingFolder.appendingPathComponent("references/routing.md"))
    try check(pending.oracleSkillInstallationStatus()["status"] as? String=="pending","retomada pendente mantém vínculo anterior")
    _=try pending.installOracleSkill()
    try check(pending.oracleSkillInstallationStatus()["status"] as? String=="current","retomada escreve arquivo faltante sem adotar foreign")
    journal=try readJSON(pendingLedger);journal["previous_hashes"]=["SKILL.md":String(repeating:"a",count:64)];journal["pending_hashes"]=journal["hashes"];try writeJSON(journal,pendingLedger)
    try reject("recibo pending com vínculo forjado é rejeitado"){_=try pending.installOracleSkill()}
    let wrongOwner=try fixture("wrong-owner");_=try wrongOwner.installOracleSkill()
    let wrongLedger=wrongOwner.distributionHostHome().appendingPathComponent(".agents/oracle-router-ledger.json")
    var foreignLedger=try readJSON(wrongLedger);foreignLedger["owner"]="manual-other-product";try writeJSON(foreignLedger,wrongLedger)
    try reject("recibo de outra origem não é adotado mesmo com hashes válidos"){_=try wrongOwner.installOracleSkill()}
    let badContext=try fixture("bad-context");_=try badContext.installOracleSkill()
    let badContextURL=badContext.distributionHostHome().appendingPathComponent(".agents/skills/oracle/references/context.json")
    try writeJSON(["schema_version":1,"profiles":[String(repeating:"a",count:20):["state":"../escape","vault":"/synthetic","name":"foreign"]]],badContextURL)
    let badContextBytes=try Data(contentsOf:badContextURL)
    try reject("perfil de contexto sem vínculo absoluto é rejeitado"){_=try badContext.installOracleSkill()}
    try check(try Data(contentsOf:badContextURL)==badContextBytes,"contexto inválido é preservado sem acessar seus caminhos")
    let linked=try fixture("linked"),outside=base.appendingPathComponent("outside");try fm.createDirectory(at:outside,withIntermediateDirectories:true)
    let links=linked.distributionHostHome().appendingPathComponent(".agents/skills");try fm.createDirectory(at:links,withIntermediateDirectories:true);try fm.createSymbolicLink(at:links.appendingPathComponent("oracle"),withDestinationURL:outside)
    try reject("pasta oracle symlink preservada"){_=try linked.installOracleSkill()}
    try check(try fm.contentsOfDirectory(atPath:outside.path).isEmpty,"destino do symlink continua vazio")
    let limited=try fixture("limit");_=try limited.installOracleSkill();let limitFolder=limited.distributionHostHome().appendingPathComponent(".agents/skills/oracle")
    try Data(repeating:65,count:2_000_001).write(to:limitFolder.appendingPathComponent("SKILL.md"))
    try reject("arquivo acima de 2 MB impede atualização"){_=try limited.installOracleSkill()}
    let locked=try fixture("locked");_=try locked.installOracleSkill()
    let fd=Darwin.open(locked.distributionHostHome().appendingPathComponent(".agents/skills").path,O_RDONLY|O_DIRECTORY);guard fd>=0 else{throw failure("Lock fixture")};defer{Darwin.close(fd)}
    guard flock(fd,LOCK_EX|LOCK_NB)==0 else{throw failure("Lock fixture ocupado")};defer{flock(fd,LOCK_UN)}
    let lockBefore=try Data(contentsOf:locked.distributionHostHome().appendingPathComponent(".agents/oracle-router-ledger.json"))
    try reject("lock global concorrente impede instalação"){_=try locked.installOracleSkill()}
    try check(try Data(contentsOf:locked.distributionHostHome().appendingPathComponent(".agents/oracle-router-ledger.json"))==lockBefore,"concorrência preserva ledger")
    print("\(count) checks de preflight do router em host sintético.")
}
