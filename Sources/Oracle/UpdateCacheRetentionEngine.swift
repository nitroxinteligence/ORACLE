import Foundation
import CryptoKit
import Darwin

struct OracleCacheFile: Codable, Equatable {
    let path:String, hash:String, identity:String
    let bytes:Int64, modified:Double
}
struct OracleCacheCandidate: Codable, Equatable {
    let id:String, kind:String
    let files:[OracleCacheFile]
    var bytes:Int64 {files.reduce(0){$0+$1.bytes}}
}
struct OracleCachePreview: Codable {
    let id:String, created:Double, references:String
    let candidates:[OracleCacheCandidate]
    let preserved:[String]
    var projection:[String:Any] {
        ["previewID":id,"manual":true,"network":false,"retentionDays":7,"retainedGenerations":2,
         "expiresAt":created+900,"bytes":candidates.reduce(Int64(0)){$0+$1.bytes},"count":candidates.count,
         "candidates":candidates.map{["id":$0.id,"kind":$0.kind,"bytes":$0.bytes,"paths":$0.files.map(\.path)] as [String:Any]},
         "preserved":preserved,"scope":"Downloads assinados e histórico de staging concluído; notas, vault e backups pessoais preservados.",
         "limits":["entries":10_000,"readBytes":536_870_912,"seconds":30,"metadataBytes":24_000_000]]
    }
}
/// Only fixed state-relative scopes are read. No URL from a journal is followed.
final class OracleUpdateCacheRetention {
    let home:URL
    var entries=0,readBytes:Int64=0
    let started=ProcessInfo.processInfo.systemUptime
    var referenceFiles=[OracleCacheFile]()
    var protected=Set<String>(),preserved=[String]()
    let authenticate:(Data)throws->[String]
    let now:Date
    let availability:(String)throws->Void
    init(home:URL,now:Date=Date(),availability:@escaping(String)throws->Void={_ in},authenticate:@escaping(Data)throws->[String]) {
        self.home=home;self.now=now;self.authenticate=authenticate;self.availability=availability
    }
    static func hash(_ data:Data)->String {SHA256.hash(data:data).map{String(format:"%02x",$0)}.joined()}
    static func validHash(_ value:String)->Bool {value.range(of:"^[a-f0-9]{64}$",options:.regularExpression) != nil}
    func fail(_ message:String)->NSError {NSError(domain:"OracleUpdateCache",code:1,userInfo:[NSLocalizedDescriptionKey:message])}
    func bounded()throws {
        guard entries<=10_000,readBytes<=536_870_912,ProcessInfo.processInfo.systemUptime-started<=30 else{throw fail("A prévia excedeu 10 mil arquivos, 512 MiB de leitura ou 30 segundos. Nada foi limpo.")}
    }
    func components(_ path:String)throws->[String] {
        let parts=path.split(separator:"/",omittingEmptySubsequences:false).map(String.init)
        guard !parts.isEmpty,parts.count<20,path.utf8.count<2048,parts.allSatisfy({!$0.isEmpty && $0 != "." && $0 != ".." && !$0.contains("\\") && !$0.contains(":") && !$0.unicodeScalars.contains(where:CharacterSet.controlCharacters.contains)}) else{throw fail("Caminho de cache recusado.")}
        return parts
    }
    func directory(_ path:String)throws->Int32 {
        try availability(path)
        var fd=Darwin.open(home.path,O_RDONLY|O_DIRECTORY|O_NOFOLLOW)
        guard fd>=0 else{throw fail("Estado do Oracle não é uma pasta local segura.")}
        do {
            if !path.isEmpty {for part in try components(path) {
                let next=openat(fd,part,O_RDONLY|O_DIRECTORY|O_NOFOLLOW);Darwin.close(fd);fd=next
                guard fd>=0 else{throw fail("Cache ausente, indisponível ou com link: "+path)}
            }}
            var s=stat();guard fstat(fd,&s)==0,s.st_flags & 0x40000000==0 else{throw fail("Pasta dataless preservada: "+path)}
            return fd
        } catch {if fd>=0{Darwin.close(fd)};throw error}
    }
    func identity(_ s:stat)->String {
        "\(s.st_dev):\(s.st_ino):\(s.st_mode):\(s.st_nlink):\(s.st_size):\(s.st_mtimespec.tv_sec):\(s.st_mtimespec.tv_nsec):\(s.st_ctimespec.tv_sec):\(s.st_ctimespec.tv_nsec):\(s.st_flags)"
    }
    func list(_ path:String)throws->[String] {
        let fd=try directory(path);defer{Darwin.close(fd)}
        let copy=dup(fd);guard let stream=fdopendir(copy) else{Darwin.close(copy);throw fail("Não foi possível enumerar o cache.")};defer{closedir(stream)}
        var names=[String]();errno=0
        while let row=readdir(stream) {
            let name=withUnsafePointer(to:&row.pointee.d_name){$0.withMemoryRebound(to:CChar.self,capacity:1024){String(cString:$0)}}
            if name=="." || name==".."{continue};entries+=1;try bounded();names.append(name)
        }
        guard errno==0 else{throw fail("Enumeração parcial do cache; nada foi limpo.")}
        return names.sorted()
    }
    func exists(_ path:String)throws->Bool {
        let parts=try components(path),parent=parts.dropLast().joined(separator:"/")
        let fd:Int32
        do{fd=try directory(parent)}catch {if errno==ENOENT{return false};throw error};defer{Darwin.close(fd)}
        var s=stat();if fstatat(fd,parts.last!,&s,AT_SYMLINK_NOFOLLOW)==0{return true}
        guard errno==ENOENT else{throw fail("Estado indisponível: "+path)};return false
    }
    func file(_ path:String,limit:Int64=24_000_000)throws->(OracleCacheFile,Data) {
        try availability(path)
        let parts=try components(path),parent=try directory(parts.dropLast().joined(separator:"/"));defer{Darwin.close(parent)}
        let fd=openat(parent,parts.last!,O_RDONLY|O_NOFOLLOW|O_NONBLOCK);guard fd>=0 else{throw fail("Arquivo indisponível ou link preservado: "+path)};defer{Darwin.close(fd)}
        var before=stat();guard fstat(fd,&before)==0,(before.st_mode & S_IFMT)==S_IFREG,before.st_nlink==1,before.st_flags & 0x40000000==0,before.st_size>=0,before.st_size<=limit else{throw fail("Arquivo estrangeiro, dataless ou acima do limite preservado: "+path)}
        readBytes+=before.st_size;entries+=1;try bounded()
        var data=Data(),buffer=[UInt8](repeating:0,count:65536)
        while true {let n=Darwin.read(fd,&buffer,buffer.count);guard n>=0 else{throw fail("Leitura parcial: "+path)};if n==0{break};data.append(contentsOf:buffer.prefix(n));guard data.count<=limit else{throw fail("Arquivo mudou durante a leitura.")};try bounded()}
        var after=stat(),current=stat();guard fstat(fd,&after)==0,fstatat(parent,parts.last!,&current,AT_SYMLINK_NOFOLLOW)==0,identity(before)==identity(after),identity(before)==identity(current),data.count==before.st_size else{throw fail("Arquivo mudou durante a prévia: "+path)}
        return (OracleCacheFile(path:path,hash:Self.hash(data),identity:identity(before),bytes:Int64(data.count),modified:Double(before.st_mtimespec.tv_sec)+Double(before.st_mtimespec.tv_nsec)/1e9),data)
    }
    func json(_ path:String,reference:Bool=true)throws->[String:Any]? {
        guard try exists(path) else{return nil}
        let (record,data)=try file(path)
        guard let object=try JSONSerialization.jsonObject(with:data) as? [String:Any] else{throw fail("Recibo inválido preservado: "+path)}
        if reference {referenceFiles.append(record);collect(object)}
        return object
    }
    func collect(_ object:Any) {
        if let text=object as? String {
            if Self.validHash(text) || UUID(uuidString:text) != nil{protected.insert(text)}
            for part in text.split(separator:"/") {let name=String(part);if Self.validHash(name) || UUID(uuidString:name) != nil{protected.insert(name)}}
        } else if let rows=object as? [Any]{rows.forEach(collect)}
        else if let rows=object as? [String:Any]{rows.values.forEach(collect)}
    }
    func references()throws {
        for path in ["config.json","setup/plan.json","distribution/ledger.json","distribution/selected.json","distribution/highest-release.json","distribution/vault-manifest.json","onboarding/state.json","updates/runtime/current.json","updates/runtime/transition.json","updates/runtime/generation.json","updates/skills/transaction.json","updates/skills/installed.json","updates/application/pending.json","updates/application/last-known-good.json"] {_ = try json(path)}
        for path in ["setup/plans","updates/runtime/versions","staging"] {
            guard try exists(path) else{continue}
            for name in try list(path) {
                if path=="setup/plans" {guard name.hasSuffix(".json"),UUID(uuidString:String(name.dropLast(5))) != nil else{throw fail("Plano estrangeiro preservado; revise o estado antes de limpar.")};_=try json(path+"/"+name)}
                else {
                    let root=path+"/"+name
                    // All unfinished distribution staging and runtime receipts remain references.
                    for suffix in path=="staging" ? ["transaction.json","receipt.json"]:["receipt.json"] {_ = try json(root+"/"+suffix)}
                    protected.insert(name);preserved.append(root+": geração ou recuperação preservada")
                }
            }
        }
    }
    func referenceStamp()throws->String {
        let encoder=JSONEncoder();encoder.outputFormatting=[.sortedKeys]
        let metadata=try encoder.encode(referenceFiles.sorted{$0.path<$1.path})
        return Self.hash(metadata+Data(protected.sorted().joined(separator:"\n").utf8))
    }
    func preview()throws->OracleCachePreview {
        try references()
        let references=try referenceStamp()
        var candidates=[OracleCacheCandidate](),manifests=[(OracleCacheFile,[String])](),uncertainManifest=false
        if try exists("cache/distributions") {
            for name in try list("cache/distributions") {
                let path="cache/distributions/"+name
                do {
                    guard Self.validHash(name),try list(path)==["oracle-distribution.json"] else{throw fail("Conteúdo sem autoria")}
                    let (record,data)=try file(path+"/oracle-distribution.json")
                    guard record.hash==name else{throw fail("Hash divergente")}
                    let packages=try authenticate(data);guard packages.allSatisfy(Self.validHash) else{throw fail("Manifesto inválido")}
                    manifests.append((record,packages))
                }catch{uncertainManifest=true;preserved.append(path+": "+error.localizedDescription)}
            }
        }
        let retained=Set(manifests.sorted{$0.0.modified>$1.0.modified}.prefix(2).map{$0.0.hash})
        var ownedPackages=Set<String>()
        for (record,packages) in manifests {
            ownedPackages.formUnion(packages)
            if protected.contains(record.hash) || retained.contains(record.hash) || now.timeIntervalSince1970-record.modified<604800 {
                protected.formUnion(packages);preserved.append(record.path+": geração referida, recente ou entre as duas últimas")
            }else{candidates.append(OracleCacheCandidate(id:record.hash,kind:"distribution",files:[record]))}
        }
        if try exists("cache/packages") {
            for name in try list("cache/packages") {
                let hash=String(name.dropLast(5)),path="cache/packages/"+name
                do {
                    guard name.hasSuffix(".json"),Self.validHash(hash),ownedPackages.contains(hash),!protected.contains(hash),!uncertainManifest else{preserved.append(path+": referido ou sem autoria assinada");continue}
                    let (record,_)=try file(path,limit:44_000_000)
                    guard record.hash==hash else{throw fail("Hash divergente")}
                    if now.timeIntervalSince1970-record.modified>=604800{candidates.append(OracleCacheCandidate(id:hash,kind:"package",files:[record]))}else{preserved.append(path+": recente")}
                }catch{preserved.append(path+": "+error.localizedDescription)}
            }
        }
        // Legacy history has no ownership contract and is deliberately retained.
        var completed=[OracleCacheCandidate]()
        if try exists("updates/skills/history") {
            for name in try list("updates/skills/history") {
                let path="updates/skills/history/"+name
                do {
                    guard name.hasSuffix(".json"),UUID(uuidString:String(name.dropLast(5))) != nil,let journal=try json(path,reference:false),journal["cache_retention_owner"] as? String=="oracle-skills-update-v1",journal["status"] as? String=="completed",let id=journal["id"] as? String,UUID(uuidString:id) != nil,!protected.contains(id),let ops=journal["operations"] as? [[String:Any]],!ops.isEmpty,ops.count<=5000 else{preserved.append(path+": ativo, legado ou não concluído");continue}
                    var expected=[String:String]()
                    for op in ops {
                        guard op["applied"] as? Bool==true,let index=op["index"] as? Int,index>=0,index<5000,let new=op["new_hash"] as? String,Self.validHash(new),expected["\(index).new"]==nil else{throw fail("Operação não comprovada")}
                        expected["\(index).new"]=new
                        if let old=op["old_hash"] as? String {guard Self.validHash(old) else{throw fail("Preimagem inválida")};expected["\(index).old"]=old}
                    }
                    let root="updates/skills/staging/"+id
                    guard Set(try list(root))==Set(expected.keys) else{throw fail("Staging contém arquivo estrangeiro")}
                    var files=[try file(path).0]
                    for name in expected.keys.sorted(){let record=try file(root+"/"+name,limit:50_000_000).0;guard record.hash==expected[name] else{throw fail("Staging alterado")};files.append(record)}
                    completed.append(OracleCacheCandidate(id:id,kind:"completed-skills-staging",files:files))
                }catch{preserved.append(path+": "+error.localizedDescription)}
            }
        }
        let recent=completed.sorted{$0.files[0].modified>$1.files[0].modified}
        for (index,item) in recent.enumerated() {
            if index<2 || now.timeIntervalSince1970-item.files[0].modified<604800{preserved.append(item.id+": histórico útil ou recente")}
            else{candidates.append(item)}
        }
        try bounded()
        return OracleCachePreview(id:UUID().uuidString,created:now.timeIntervalSince1970,references:references,candidates:candidates.sorted{$0.id+$0.kind<$1.id+$1.kind},preserved:preserved)
    }
    func prune(_ approved:OracleCachePreview,confirmed:Bool,beforeDelete:(()throws->Void)?=nil)throws->[String:Any] {
        guard confirmed else{throw fail("Confirme os IDs e bytes da prévia para limpar os downloads guardados.")}
        guard UUID(uuidString:approved.id) != nil,now.timeIntervalSince1970-approved.created>=0,now.timeIntervalSince1970-approved.created<=900 else{throw fail("A prévia expirou. Confira novamente antes de limpar.")}
        let current=try preview()
        guard current.references==approved.references,current.candidates==approved.candidates else{throw fail("Cache ou referências mudaram desde a prévia. Nada foi limpo; confira novamente.")}
        try beforeDelete?()
        let recheck=OracleUpdateCacheRetention(home:home,now:now,availability:availability,authenticate:authenticate)
        try recheck.references()
        guard try recheck.referenceStamp()==approved.references else{throw fail("Estado mudou imediatamente antes da limpeza; nada foi limpo.")}
        readBytes+=recheck.readBytes;entries+=recheck.entries;try bounded()
        let required=approved.candidates.reduce(Int64(0)){$0+$1.bytes}*2
        guard readBytes+required<=536_870_912 else{throw fail("A revalidação excederia 512 MiB de leitura. Nada foi limpo.")}
        for candidate in approved.candidates {
            if candidate.kind=="distribution" {guard try list("cache/distributions/"+candidate.id)==["oracle-distribution.json"] else{throw fail("Arquivo estrangeiro apareceu após a prévia; nada foi limpo.")}}
            if candidate.kind=="completed-skills-staging" {let expected=Set(candidate.files.filter{$0.path.hasPrefix("updates/skills/staging/")}.map{URL(fileURLWithPath:$0.path).lastPathComponent});guard Set(try list("updates/skills/staging/"+candidate.id))==expected else{throw fail("Staging mudou após a prévia; nada foi limpo.")}}
        }
        // Revalidate every file before the first unlink, then again at its anchored parent.
        for candidate in approved.candidates {for expected in candidate.files {guard try file(expected.path,limit:50_000_000).0==expected else{throw fail("Arquivo mudou antes da limpeza; nada foi limpo.")}}}
        var bytes:Int64=0,removed=[String]()
        for candidate in approved.candidates {
            for expected in candidate.files {
                guard try file(expected.path,limit:50_000_000).0==expected else{throw fail("Limpeza interrompida por mudança concorrente. Arquivos restantes preservados.")}
                let parts=try components(expected.path),parent=try directory(parts.dropLast().joined(separator:"/"));defer{Darwin.close(parent)}
                var s=stat();guard fstatat(parent,parts.last!,&s,AT_SYMLINK_NOFOLLOW)==0,identity(s)==expected.identity,unlinkat(parent,parts.last!,0)==0 else{throw fail("Limpeza interrompida; arquivo concorrente preservado.")}
                bytes+=expected.bytes
            }
            let emptyRoot:String?
            if candidate.kind=="distribution" {emptyRoot="cache/distributions/"+candidate.id}
            else if candidate.kind=="completed-skills-staging" {emptyRoot="updates/skills/staging/"+candidate.id}
            else {emptyRoot=nil}
            if let emptyRoot {
                let parts=try components(emptyRoot),parent=try directory(parts.dropLast().joined(separator:"/"));defer{Darwin.close(parent)}
                // A concurrent file makes AT_REMOVEDIR fail and remains untouched.
                _=unlinkat(parent,parts.last!,AT_REMOVEDIR)
            }
            removed.append(candidate.id)
        }
        return ["removed":removed,"count":removed.count,"bytes":bytes,"network":false,"manual":true,"preserved":approved.preserved]
    }
}
