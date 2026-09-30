import Foundation
import CryptoKit
import Darwin

struct OracleSkillInstallationInspection {
    let status:String,folder:URL,conflicts:[String],message:String
    let previous:[String:Any],profiles:[String:[String:String]],stamp:String
    let filesInstalled:Bool
    var projection:[String:Any] {[
        "status":status,"folder":folder.path,"filesInstalled":filesInstalled,
        "hostDiscovered":false,"executionVerified":false,"conflicts":conflicts,"message":message,
        "action":conflicts.isEmpty ? "install_or_update":"review_in_codex",
        "verificationMessage":"A descoberta no Codex e a execução exigem verificações separadas."
    ]}
    func requireInstallable()throws {
        guard conflicts.isEmpty else{throw NSError(domain:"OracleSkillPreflight",code:1,userInfo:[NSLocalizedDescriptionKey:message+" Caminho: "+folder.path])}
    }
}
/// Inspects fixed router paths, never follows context profile paths or reads vault files.
final class OracleSkillInstallationPreflight {
    static let paths=["SKILL.md","agents/openai.yaml","scripts/discover.py","references/oracle.md","references/routing.md","references/context.json"]
    let host:URL
    var records=[String](),bytesRead=0
    init(host:URL){self.host=host}
    func failure(_ message:String)->NSError {NSError(domain:"OracleSkillPreflight",code:1,userInfo:[NSLocalizedDescriptionKey:message])}
    static func hash(_ data:Data)->String {SHA256.hash(data:data).map{String(format:"%02x",$0)}.joined()}
    static func validHash(_ value:String)->Bool {value.range(of:"^[a-f0-9]{64}$",options:.regularExpression) != nil}
    func openParent(_ relative:String)throws->(Int32,String) {
        let pieces=relative.split(separator:"/").map(String.init)
        guard !pieces.isEmpty,pieces.allSatisfy({$0 != "." && $0 != ".." && !$0.contains("\\") && !$0.contains(":")}),relative.utf8.count<1024 else{throw failure("Caminho inválido no router.")}
        var fd=Darwin.open(host.path,O_RDONLY|O_DIRECTORY|O_NOFOLLOW)
        guard fd>=0 else{throw failure(errno==ENOENT ? "missing":"Pasta do host indisponível ou com link simbólico.")}
        do {
            for piece in pieces.dropLast() {
                let next=openat(fd,piece,O_RDONLY|O_DIRECTORY|O_NOFOLLOW)
                guard next>=0 else{throw failure(errno==ENOENT ? "missing":"Pasta do router indisponível ou com link: "+piece)}
                Darwin.close(fd);fd=next
            }
            return(fd,pieces.last!)
        }catch{Darwin.close(fd);throw error}
    }
    func fingerprint(_ s:stat)->String {"\(s.st_dev):\(s.st_ino):\(s.st_size):\(s.st_mode):\(s.st_nlink):\(s.st_mtimespec.tv_sec):\(s.st_mtimespec.tv_nsec):\(s.st_ctimespec.tv_sec):\(s.st_ctimespec.tv_nsec):\(s.st_flags)"}
    func read(_ relative:String,limit:Int=2_000_000)throws->Data? {
        let fd:Int32,name:String
        do{(fd,name)=try openParent(relative)}catch{if error.localizedDescription=="missing"{records.append(relative+":missing");return nil};throw error}
        defer{Darwin.close(fd)}
        var before=stat()
        if fstatat(fd,name,&before,AT_SYMLINK_NOFOLLOW) != 0 {guard errno==ENOENT else{throw failure("Arquivo do router indisponível.")};records.append(relative+":missing");return nil}
        guard before.st_mode&S_IFMT==S_IFREG,before.st_nlink==1,before.st_size>=0,before.st_size<=limit,before.st_flags&0x40000000==0 else{throw failure("Arquivo com link, dataless ou acima do limite preservado: "+relative)}
        bytesRead+=Int(before.st_size);guard bytesRead<=12_000_000 else{throw failure("Router excede 12 MB; arquivos preservados.")}
        let input=openat(fd,name,O_RDONLY|O_NOFOLLOW|O_NONBLOCK);guard input>=0 else{throw failure("Arquivo do router não pode ser lido.")};defer{Darwin.close(input)}
        var opened=stat();guard fstat(input,&opened)==0,fingerprint(opened)==fingerprint(before) else{throw failure("Router mudou durante a inspeção.")}
        var data=Data(),buffer=[UInt8](repeating:0,count:65536)
        while true {let size=Darwin.read(input,&buffer,buffer.count);guard size>=0 else{throw failure("Leitura parcial do router.")};if size==0{break};data.append(contentsOf:buffer.prefix(size));guard data.count<=limit else{throw failure("Arquivo mudou ou excedeu o limite.")}}
        var after=stat(),current=stat();guard fstat(input,&after)==0,fstatat(fd,name,&current,AT_SYMLINK_NOFOLLOW)==0,fingerprint(before)==fingerprint(after),fingerprint(before)==fingerprint(current),data.count==before.st_size else{throw failure("Router mudou durante a inspeção.")}
        records.append(relative+":"+fingerprint(before)+":"+Self.hash(data));return data
    }
    func inventory()throws->Bool {
        var total=0
        func list(_ relative:String)throws->Bool {
            let fd:Int32,name:String
            do{(fd,name)=try openParent(relative)}catch{if error.localizedDescription=="missing"{records.append(relative+":missing");return false};throw error}
            defer{Darwin.close(fd)}
            let dir=openat(fd,name,O_RDONLY|O_DIRECTORY|O_NOFOLLOW)
            if dir<0 {guard errno==ENOENT else{throw failure("Pasta oracle de outra origem ou com link preservada.")};records.append(relative+":missing");return false}
            defer{Darwin.close(dir)}
            var s=stat();guard fstat(dir,&s)==0,s.st_flags&0x40000000==0 else{throw failure("Router dataless preservado.")};records.append(relative+":"+fingerprint(s))
            let duplicate=dup(dir);guard let stream=fdopendir(duplicate) else{Darwin.close(duplicate);throw failure("Enumeração indisponível.")};defer{closedir(stream)}
            var names=[String]();errno=0
            while let item=readdir(stream) {
                let name=withUnsafePointer(to:&item.pointee.d_name){$0.withMemoryRebound(to:CChar.self,capacity:1024){String(cString:$0)}}
                if name=="." || name==".."{continue};total+=1;guard total<=32 else{throw failure("Router tem arquivos demais; revise-o no Codex.")};names.append(name)
            }
            guard errno==0 else{throw failure("Enumeração parcial; router preservado.")}
            for name in names.sorted() {
                let path=relative+"/"+name,short=String(path.dropFirst(".agents/skills/oracle/".count))
                if ["agents","scripts","references"].contains(short){_=try list(path)}
                else {guard Self.paths.contains(short) else{throw failure("Arquivo sem autoria do aplicativo preservado: "+short)}}
            }
            return true
        }
        return try list(".agents/skills/oracle")
    }
    func inspect(desired:[String:Data]=[:],state:URL?=nil,vault:String?=nil)->OracleSkillInstallationInspection {
        let folder=host.appendingPathComponent(".agents/skills/oracle")
        var previous=[String:Any](),profiles=[String:[String:String]]()
        func result(_ status:String,_ conflicts:[String],_ message:String,_ installed:Bool=false)->OracleSkillInstallationInspection {
            OracleSkillInstallationInspection(status:status,folder:folder,conflicts:conflicts,message:message,previous:previous,profiles:profiles,stamp:Self.hash(Data(records.sorted().joined(separator:"\n").utf8)),filesInstalled:installed)
        }
        do {
            let exists=try inventory(),ledger=try read(".agents/oracle-router-ledger.json",limit:128_000)
            if let ledger {guard let object=try JSONSerialization.jsonObject(with:ledger) as? [String:Any] else{throw failure("Recibo do router corrompido.")};previous=object}
            if previous.isEmpty {
                if exists{return result("foreign",[folder.path],"Já existe /oracle de outra origem. Seus arquivos foram preservados. Abra essa skill no Codex para revisar o conflito antes de instalar o router do aplicativo.")}
                return result("missing",[],"O router do aplicativo ainda não está instalado neste host.")
            }
            guard previous["folder"] as? String==folder.path,
                  let hashes=previous["hashes"] as? [String:String],hashes.keys.allSatisfy(Self.paths.contains),hashes.values.allSatisfy(Self.validHash),
                  previous["name"]==nil || previous["name"] as? String=="oracle" else{throw failure("Recibo do router inválido ou de outra pasta. Nenhum arquivo foi adotado.")}
            let pending=previous["pending_hashes"] as? [String:String] ?? [:]
            guard pending.keys.allSatisfy(Self.paths.contains),pending.values.allSatisfy(Self.validHash),previous["pending_hashes"]==nil || previous["pending_hashes"] is [String:String] else{throw failure("Recibo pendente inválido.")}
            let modern=previous["owner"] as? String=="oracle-router-v1" && previous["schema_version"] as? Int==1
            guard previous["owner"]==nil || modern else{throw failure("Recibo de outra origem ou esquema desconhecido; arquivos preservados.")}
            let known=Set(Self.paths),legacyComplete=Set(hashes.keys)==known || Set(hashes.keys)==known.subtracting(["references/routing.md"]),legacyPending=Set(pending.keys)==known && legacyComplete
            guard modern || legacyComplete || legacyPending else{throw failure("Recibo incompleto não comprova autoria do router.")}
            if modern {
                guard hashes.isEmpty || Set(hashes.keys)==known, pending.isEmpty || Set(pending.keys)==known,
                      let boundState=previous["state"] as? String,Self.absolutePath(boundState),
                      let prior=previous["previous_hashes"] as? [String:String],prior==hashes else{throw failure("Vínculo do recibo pendente com a versão anterior é inválido.")}
            }
            var actual=[String:String](),conflicts=[String]()
            for path in Self.paths {
                if let bytes=try read(".agents/skills/oracle/"+path) {
                    let hash=Self.hash(bytes);actual[path]=hash
                    if hash != hashes[path] && hash != pending[path]{conflicts.append(path)}
                    if path=="references/context.json" {
                        guard let context=try JSONSerialization.jsonObject(with:bytes) as? [String:Any],context["schema_version"] as? Int==1,
                              let entries=context["profiles"] as? [String:[String:String]],entries.count<=64 else{throw failure("Contexto de perfis inválido; ele foi preservado.")}
                        for (key,profile) in entries {
                            guard key.range(of:"^[a-f0-9]{20}$",options:.regularExpression) != nil,Set(profile.keys)==Set(["vault","state","name"]),let profileState=profile["state"],let profileVault=profile["vault"],Self.absolutePath(profileState),Self.absolutePath(profileVault),key==String(Self.hash(Data(profileState.utf8)).prefix(20)),let name=profile["name"],!name.isEmpty,name.utf8.count<=255 else{throw failure("Perfil de contexto sem vínculo válido; caminhos não foram acessados.")}
                        }
                        profiles=entries
                    }
                }
            }
            guard conflicts.isEmpty else{return result("edited_owned",conflicts,"O router gerenciado foi editado. As alterações foram preservadas. Revise os arquivos indicados com o Codex antes de atualizar.")}
            if !pending.isEmpty || actual.count<Self.paths.count{return result("pending",[],"A instalação do router está incompleta; pode retomar os arquivos cujo vínculo foi conferido.")}
            if let state {
                let id=String(Self.hash(Data(state.path.utf8)).prefix(20))
                if let entry=profiles[id],entry["state"] != state.path{throw failure("O perfil deste Oracle aponta para outro contexto. Revise-o no Codex.")}
            }
            let installed=actual==hashes
            let hasOwnProfile=state.map{let profile=profiles[String(Self.hash(Data($0.path.utf8)).prefix(20))];return profile != nil && (vault==nil || profile?["vault"]==vault)} ?? true
            let current=installed && hasOwnProfile && !desired.isEmpty && desired.allSatisfy{actual[$0.key]==Self.hash($0.value)}
            return result(current ? "current":"managed",[],current ? "Arquivos do router atual conferidos. A descoberta e a execução no Codex ainda precisam ser verificadas.":"Router gerenciado conferido; seus perfis existentes serão preservados na atualização.",installed)
        }catch{return result("foreign",[error.localizedDescription],"Não foi possível comprovar uma instalação segura: "+error.localizedDescription+" Revise o router e seu recibo no Codex; nenhum arquivo foi alterado.")}
    }
    static func absolutePath(_ path:String)->Bool {path.hasPrefix("/") && path.utf8.count<=4096 && !path.contains("\0") && URL(fileURLWithPath:path).standardizedFileURL.path==path}
}

extension Core {
    func oracleSkillInstallationStatus()->[String:Any] {
        let inspection=OracleSkillInstallationPreflight(host:distributionHostHome()).inspect(state:home,vault:config["vault"] as? String)
        guard inspection.conflicts.isEmpty else{return inspection.projection}
        let source=bundledEngineResources().deletingLastPathComponent().appendingPathComponent("skills/oracle")
        let reader=OracleSkillInstallationPreflight(host:source)
        var desired=[String:Data]()
        do {for path in OracleSkillInstallationPreflight.paths where path != "references/context.json" {
            guard let bytes=try reader.read(path) else{throw failure("Arquivo do router ausente no aplicativo: "+path)};desired[path]=bytes
        }}catch {var result=inspection.projection;result["message"]=error.localizedDescription;result["conflicts"]=[error.localizedDescription];result["action"]="review_application_resources";return result}
        return OracleSkillInstallationPreflight(host:distributionHostHome()).inspect(desired:desired,state:home,vault:config["vault"] as? String).projection
    }
    func oracleSkillInstallationPreflight()throws->OracleSkillInstallationInspection {
        let inspection=OracleSkillInstallationPreflight(host:distributionHostHome()).inspect(state:home,vault:config["vault"] as? String)
        try inspection.requireInstallable();return inspection
    }
}
