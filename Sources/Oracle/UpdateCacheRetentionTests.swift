import Foundation
import CryptoKit
import Darwin

func runUpdateCacheRetentionTests(root:URL?=nil)throws {
    let base=try root ?? oracleTestDirectory("update-cache-retention")
    try FileManager.default.createDirectory(at:base,withIntermediateDirectories:true)
    let key=Curve25519.Signing.PrivateKey()
    var count=0
    func check(_ value:Bool,_ text:String)throws {guard value else{throw NSError(domain:"CacheTest",code:1,userInfo:[NSLocalizedDescriptionKey:text])};count+=1;print("PASS "+text)}
    func rejected(_ text:String,_ body:()throws->Void)throws {do{try body()}catch{try check(true,text);return};try check(false,text)}
    func write(_ data:Data,_ path:String,_ home:URL,age:Int=8)throws {
        let url=home.appendingPathComponent(path);try FileManager.default.createDirectory(at:url.deletingLastPathComponent(),withIntermediateDirectories:true);try data.write(to:url)
        try FileManager.default.setAttributes([.modificationDate:Date().addingTimeInterval(-Double(age)*86400)],ofItemAtPath:url.path)
    }
    func json(_ value:[String:Any],_ path:String,_ home:URL,age:Int=8)throws {try write(JSONSerialization.data(withJSONObject:value,options:[.sortedKeys]),path,home,age:age)}
    func engine(_ home:URL)->OracleUpdateCacheRetention {
        OracleUpdateCacheRetention(home:home) {data in
            let doc=try JSONSerialization.jsonObject(with:data) as! [String:String]
            guard let payload=Data(base64Encoded:doc["payload"] ?? ""),let signature=Data(base64Encoded:doc["signature"] ?? ""),key.publicKey.isValidSignature(signature,for:payload),let packages=try JSONSerialization.jsonObject(with:payload) as? [String] else{throw NSError(domain:"Signature",code:1)}
            return packages
        }
    }
    func fixture(_ name:String)throws->(URL,[String],[String]) {
        let home=base.appendingPathComponent(name);try FileManager.default.createDirectory(at:home,withIntermediateDirectories:true)
        var hashes=[String](),packages=[String]()
        for index in 0..<5 {
            let bytes=Data("package-\(index)".utf8),package=OracleUpdateCacheRetention.hash(bytes)
            let payload=try JSONSerialization.data(withJSONObject:[package]),signature=try key.signature(for:payload)
            let envelope=try JSONSerialization.data(withJSONObject:["payload":payload.base64EncodedString(),"signature":signature.base64EncodedString()],options:.sortedKeys),hash=OracleUpdateCacheRetention.hash(envelope)
            try write(envelope,"cache/distributions/"+hash+"/oracle-distribution.json",home,age:10+index)
            try write(bytes,"cache/packages/"+package+".json",home,age:10+index)
            hashes.append(hash);packages.append(package)
        }
        try json(["manifest_sha256":hashes[4]],"distribution/ledger.json",home)
        return(home,hashes,packages)
    }
    let (home,hashes,packages)=try fixture("clean")
    let preview=try engine(home).preview()
    try check(preview.candidates.count==4,"somente duas distribuições antigas não referidas e seus pacotes")
    try check(!preview.candidates.contains{$0.id==hashes[4] || $0.id==packages[4]},"geração ativa e seus pacotes preservados")
    try check(!preview.candidates.contains{$0.id==hashes[0] || $0.id==hashes[1]},"duas últimas gerações úteis preservadas")
    try rejected("confirmação obrigatória"){_=try engine(home).prune(preview,confirmed:false)}
    let result=try engine(home).prune(preview,confirmed:true)
    try check(result["count"] as? Int==4,"limpeza real remove somente prévia confirmada")
    try check(FileManager.default.fileExists(atPath:home.appendingPathComponent("cache/packages/"+packages[4]+".json").path),"pacote ativo permanece no disco")
    let forgedFile=OracleCacheFile(path:"../outside",hash:String(repeating:"a",count:64),identity:"forged",bytes:1,modified:0)
    let forged=OracleCachePreview(id:UUID().uuidString,created:Date().timeIntervalSince1970,references:preview.references,candidates:[OracleCacheCandidate(id:"foreign",kind:"package",files:[forgedFile])],preserved:[])
    try rejected("recibo de prévia forjado não concede autoria"){_=try engine(home).prune(forged,confirmed:true)}
    let (lateRefs,lateHashes,_)=try fixture("late-references")
    let latePreview=try engine(lateRefs).preview()
    try rejected("nova referência imediatamente antes de unlink bloqueia limpeza"){_=try engine(lateRefs).prune(latePreview,confirmed:true,beforeDelete:{try json(["manifest_sha256":lateHashes[2]],"distribution/selected.json",lateRefs)})}
    let (changed,_,_)=try fixture("changed")
    let old=try engine(changed).preview(),path=old.candidates[0].files[0].path
    try write(Data("external change".utf8),path,changed)
    try rejected("hash alterado após prévia recusa toda limpeza"){_=try engine(changed).prune(old,confirmed:true)}
    let (refs,h,p)=try fixture("references")
    let prior=try engine(refs).preview()
    try json(["previous":["manifest_sha256":h[2]],"status":"interrupted"],"updates/runtime/transition.json",refs)
    try rejected("interrupção concorrente invalida prévia"){_=try engine(refs).prune(prior,confirmed:true)}
    let protected=try engine(refs).preview()
    try check(!protected.candidates.contains{$0.id==h[2] || $0.id==p[2]},"rollback/interrupted preserva manifesto e pacote")
    try json(["distribution_sha256":h[3]],"setup/plans/"+UUID().uuidString+".json",refs)
    try check(try engine(refs).preview().candidates.isEmpty,"planos históricos mantêm downloads referidos")
    let (foreign,_,_)=try fixture("foreign")
    try write(Data("personal".utf8),"cache/packages/custom.json",foreign)
    try write(Data("{}".utf8),"cache/distributions/"+String(repeating:"a",count:64)+"/oracle-distribution.json",foreign)
    let foreignPreview=try engine(foreign).preview()
    try check(!foreignPreview.candidates.contains{$0.kind=="package"},"manifesto inválido impede apagar pacotes de autoria incerta")
    try check(foreignPreview.preserved.contains{$0.contains("custom.json")},"arquivo estrangeiro listado e preservado")
    let (links,_,_)=try fixture("links")
    let outside=base.appendingPathComponent("outside");try Data("outside".utf8).write(to:outside)
    try FileManager.default.createSymbolicLink(at:links.appendingPathComponent("cache/packages/link.json"),withDestinationURL:outside)
    let linkPreview=try engine(links).preview()
    _=try engine(links).prune(linkPreview,confirmed:true)
    try check(try Data(contentsOf:outside)==Data("outside".utf8),"symlink não é seguido nem removido")
    let (collision,_,_)=try fixture("collision")
    let collisionPreview=try engine(collision).preview(),folder=collisionPreview.candidates.first{$0.kind=="distribution"}!.id
    try rejected("arquivo externo entre confirmação e unlink impede limpeza"){_=try engine(collision).prune(collisionPreview,confirmed:true,beforeDelete:{try write(Data("note".utf8),"cache/distributions/"+folder+"/external.md",collision)})}
    try check(FileManager.default.fileExists(atPath:collision.appendingPathComponent(collisionPreview.candidates[0].files[0].path).path),"falha concorrente preserva arquivos da prévia")
    let stages=base.appendingPathComponent("stages");try FileManager.default.createDirectory(at:stages,withIntermediateDirectories:true)
    var completedIDs=[String]()
    for index in 0..<5 {
        let id=UUID().uuidString,bytes=Data("old-\(index)".utf8),new=Data("new-\(index)".utf8)
        try write(bytes,"updates/skills/staging/"+id+"/0.old",stages,age:10+index)
        try write(new,"updates/skills/staging/"+id+"/0.new",stages,age:10+index)
        let journal:[String:Any]=["id":id,"cache_retention_owner":"oracle-skills-update-v1","status":index==4 ? "applying":"completed","operations":[["index":0,"old_hash":OracleUpdateCacheRetention.hash(bytes),"new_hash":OracleUpdateCacheRetention.hash(new),"applied":true]]]
        try json(journal,"updates/skills/history/"+UUID().uuidString+".json",stages,age:10+index);completedIDs.append(id)
    }
    try json(["id":completedIDs[3],"status":"completed","previous":["id":completedIDs[2]]],"updates/skills/transaction.json",stages)
    let stagePreview=try engine(stages).preview()
    try check(stagePreview.candidates.isEmpty,"current e previous/last-known-good preservados com duas gerações úteis")
    try json(["id":completedIDs[3],"status":"completed"],"updates/skills/transaction.json",stages)
    let stagePrune=try engine(stages).preview()
    try check(stagePrune.candidates.count==1 && stagePrune.candidates[0].id==completedIDs[2],"apenas snapshot completed além da retenção fica elegível")
    _=try engine(stages).prune(stagePrune,confirmed:true)
    try check(FileManager.default.fileExists(atPath:stages.appendingPathComponent("updates/skills/staging/"+completedIDs[4]+"/0.old").path),"snapshot applying permanece fisicamente")
    let expires=OracleCachePreview(id:preview.id,created:Date().addingTimeInterval(-1000).timeIntervalSince1970,references:preview.references,candidates:preview.candidates,preserved:preview.preserved)
    try rejected("token expira em 15 minutos"){_=try engine(home).prune(expires,confirmed:true)}
    let unavailable=OracleUpdateCacheRetention(home:home,availability:{path in if path=="cache/packages"{throw NSError(domain:"DatalessFixture",code:1)}},authenticate:{_ in []})
    try rejected("raiz dataless simulada impede sucesso parcial"){_=try unavailable.preview()}
    try rejected("path traversal em recibo recusado"){_=try engine(home).file("../outside")}
    let linkroot=base.appendingPathComponent("link-root");try FileManager.default.createSymbolicLink(at:linkroot,withDestinationURL:home)
    try rejected("raiz de estado symlink recusada"){_=try engine(linkroot).preview()}
    print("\(count) checks de retenção de cache concluídos em fixtures isoladas.")
    #if !ORACLE_CACHE_RETENTION_STANDALONE
    try runUpdateCacheRetentionCoreTests()
    #endif
}
