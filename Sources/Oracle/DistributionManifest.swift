import Foundation
import CryptoKit
import CoreFoundation

/// ASCII canonical JSON shared with the publisher. No floating point or duplicate
/// identities enter the signed contract. Signature covers a domain + exact payload.
func distributionCanonical(_ value:Any) throws -> Data {
    func encode(_ value:Any) throws -> String {
        if value is NSNull {return "null"}
        if let text=value as? String {
            var result="\""
            for unit in text.utf16 {
                switch unit {
                case 34:result += "\\\""
                case 92:result += "\\\\"
                case 8:result += "\\b"
                case 9:result += "\\t"
                case 10:result += "\\n"
                case 12:result += "\\f"
                case 13:result += "\\r"
                case 0..<32,128...65535:result += String(format:"\\u%04x",unit)
                default:result.append(Character(UnicodeScalar(unit)!))
                }
            }
            return result+"\""
        }
        if let number=value as? NSNumber {
            if CFGetTypeID(number)==CFBooleanGetTypeID(){return number.boolValue ? "true":"false"}
            let integer=number.int64Value
            guard number.doubleValue==Double(integer),abs(number.doubleValue)<=9_007_199_254_740_991 else{throw failure("Número fora do contrato da distribuição.")}
            return String(integer)
        }
        if let rows=value as? [Any] {return "["+(try rows.map(encode)).joined(separator:",")+"]"}
        if let object=value as? [String:Any] {return "{"+(try object.keys.sorted().map{try encode($0)+":"+encode(object[$0]!)}).joined(separator:",")+"}"}
        throw failure("Campo não suportado na distribuição.")
    }
    return Data(try encode(value).utf8)
}

struct DistributionFile {
    let path:String,hash:String,kind:String,packageID:String
    let size:Int,mode:Int
    var isVault:Bool {kind != "gbrain-source"}
}

struct DistributionItem {
    let id:String,kind:String,name:String,entry:String,department:String
    let specialist:String?,hostName:String?
    let required:[String]
    let raw:[String:Any]
}

struct DistributionManifest {
    static let schema=3
    static let maximumFiles=30_000,maximumBytes=512_000_000,maximumPackageBytes=44_000_000
    let bytes:Data,hash:String,releaseID:String,sequence:Int
    let document:[String:Any],files:[DistributionFile],items:[DistributionItem],packages:[[String:Any]]
    var vaultFiles:[DistributionFile] {files.filter(\.isVault)}
    let byPath:[String:DistributionFile]

    static func safePath(_ path:String,source:Bool=false) -> Bool {
        let parts=path.split(separator:"/",omittingEmptySubsequences:false)
        guard !parts.isEmpty,path.utf8.count<=700,!path.contains("\\"),!path.unicodeScalars.contains(where:CharacterSet.controlCharacters.contains),
              !parts.contains(where:{$0.isEmpty || $0=="." || $0==".." || [".git",".env",".DS_Store","node_modules",".gbrain"].contains(String($0))}) else{return false}
        if source {return path.hasPrefix("sources/gbrain/"+oracleGBrainPinnedCommit+"/")}
        return parts.count>=3 && parts[0]=="SISTEMA" && ["skills","recursos-skills","prompts","Tutoriais"].contains(String(parts[1]))
    }
    static func validHash(_ value:String)->Bool {value.range(of:"^[a-f0-9]{64}$",options:.regularExpression) != nil}
    static func validID(_ value:String)->Bool {value.range(of:"^[a-z0-9][a-z0-9-]{0,63}$",options:.regularExpression) != nil}
    static func integer(_ value:Any?,minimum:Int=0,maximum:Int=Int.max)->Int? {
        guard let n=value as? NSNumber,CFGetTypeID(n) != CFBooleanGetTypeID(),n.doubleValue==Double(n.int64Value),n.doubleValue>=Double(minimum),n.doubleValue<=Double(maximum) else{return nil}
        return n.intValue
    }

    init(bytes:Data,trust:[String:Any],oracleVersion:String,adapterCommit:String,minimumSequence:Int=0,knownHash:String?=nil) throws {
        guard bytes.count<=24_000_000,
              let envelope=try JSONSerialization.jsonObject(with:bytes) as? [String:Any],
              envelope["schema_version"] as? Int==Self.schema,
              let keyID=envelope["key_id"] as? String,Self.validID(keyID),
              let payload64=envelope["payload_base64"] as? String,let payload=Data(base64Encoded:payload64),payload.count<=16_000_000,
              let signature64=envelope["signature_base64"] as? String,let signature=Data(base64Encoded:signature64),signature.count==64,
              trust["schema_version"] as? Int==1,trust["algorithm"] as? String=="Ed25519",
              let keys=trust["keys"] as? [[String:Any]],
              let key=keys.first(where:{$0["id"] as? String==keyID}),let raw=key["public_key_base64"] as? String,let publicKey=Data(base64Encoded:raw) else {
            throw failure("Distribuição sem assinatura confiável. A publicação precisa ser configurada pelo mantenedor.")
        }
        let verifier=try Curve25519.Signing.PublicKey(rawRepresentation:publicKey)
        guard verifier.isValidSignature(signature,for:Data("oracle-distribution-v3\0".utf8)+payload) else {throw failure("Assinatura da distribuição inválida; nenhum conteúdo foi aplicado.")}
        guard let manifest=try JSONSerialization.jsonObject(with:payload) as? [String:Any],try distributionCanonical(manifest)==payload else {throw failure("Manifesto não canônico ou com campos duplicados.")}
        guard manifest["schema_version"] as? Int==Self.schema,
              let release=manifest["release_id"] as? String,release.range(of:"^[A-Za-z0-9][A-Za-z0-9._-]{0,79}$",options:.regularExpression) != nil,
              let sequence=Self.integer(manifest["sequence"],minimum:1,maximum:9_007_199_254_740_991),sequence>=minimumSequence,
              let minimum=manifest["minimum_oracle"] as? String,minimum.compare(oracleVersion,options:.numeric) != .orderedDescending,
              manifest["adapter_commit"] as? String==adapterCommit,adapterCommit==oracleGBrainPinnedCommit,
              manifest["gbrain_version"] as? String==oracleGBrainPinnedVersion,manifest["gbrain_commit"] as? String==oracleGBrainPinnedCommit else {
            throw failure("Distribuição antiga ou incompatível. Atualize o Oracle para instalar este conjunto.")
        }
        let envelopeHash=digest(bytes)
        if sequence==minimumSequence,let knownHash {guard knownHash==envelopeHash else{throw failure("Uma sequência publicada não pode mudar de conteúdo.")}}
        guard let rawFiles=manifest["files"] as? [[String:Any]],!rawFiles.isEmpty,rawFiles.count<=Self.maximumFiles,
              manifest["inventory_sha256"] as? String==digest(try distributionCanonical(rawFiles)),
              let packages=manifest["packages"] as? [[String:Any]],!packages.isEmpty,packages.count<=1024,
              let rawItems=manifest["items"] as? [[String:Any]],!rawItems.isEmpty,rawItems.count<=20_000,
              let licenses=manifest["licenses"] as? [Any],!licenses.isEmpty else {throw failure("Inventário da distribuição incompleto.")}
        var files=[DistributionFile](),pathKeys=Set<String>(),total=0
        for row in rawFiles {
            guard let path=row["path"] as? String,let kind=row["kind"] as? String,["specialists","prompts","tutorials","gbrain-source"].contains(kind),
                  Self.safePath(path,source:kind=="gbrain-source"),pathKeys.insert(portablePathKey(path)).inserted,
                  let hash=row["sha256"] as? String,Self.validHash(hash),
                  let size=Self.integer(row["size"],maximum:kind != "gbrain-source" && path.lowercased().hasSuffix(".md") ? 2_000_000:32_000_000),
                  let mode=Self.integer(row["mode"]),[0o644,0o755].contains(mode),
                  let package=row["package_id"] as? String,Self.validID(package) else{throw failure("Arquivo, modo ou caminho inválido na distribuição.")}
            let prefix=["specialists":"SISTEMA/skills/","prompts":"SISTEMA/prompts/","tutorials":"SISTEMA/Tutoriais/","gbrain-source":"sources/gbrain/"][kind]!
            guard path.hasPrefix(prefix) || (kind=="specialists" && path.hasPrefix("SISTEMA/recursos-skills/")) else{throw failure("Arquivo fora da biblioteca declarada.")}
            total+=size;guard total<=Self.maximumBytes else{throw failure("Distribuição excede o orçamento de instalação.")}
            files.append(DistributionFile(path:path,hash:hash,kind:kind,packageID:package,size:size,mode:mode))
        }
        // Reject file/directory collisions even on case-sensitive volumes.
        for key in pathKeys {var path=key;while let slash=path.lastIndex(of:"/"){path=String(path[..<slash]);guard !pathKeys.contains(path) else{throw failure("Colisão entre arquivo e pasta no pacote.")}}}
        let byPath=Dictionary(uniqueKeysWithValues:files.map{($0.path,$0)})
        var packageIDs=Set<String>(),packaged=Set<String>()
        for package in packages {
            guard let id=package["id"] as? String,Self.validID(id),packageIDs.insert(id).inserted,
                  let kind=package["kind"] as? String,let names=package["files"] as? [String],!names.isEmpty,names.count<=1000,
                  let bytes=Self.integer(package["bytes"],minimum:1,maximum:Self.maximumPackageBytes),bytes>0,
                  let expanded=Self.integer(package["expanded_bytes"],maximum:32_000_000),
                  let hash=package["sha256"] as? String,Self.validHash(hash),
                  let asset=package["asset"] as? String,asset==id+".json",
                  let url=package["url"] as? String,url=="https://github.com/nitroxinteligence/ORACLE-SKILLS/releases/download/"+release+"/"+asset,
                  let dependencies=package["dependencies"] as? [String],dependencies.isEmpty else {throw failure("Pacote fora do limite ou da origem aprovada.")}
            var sum=0
            for path in names {guard let file=byPath[path],file.packageID==id,file.kind==kind,packaged.insert(path).inserted else{throw failure("Arquivo ausente ou duplicado entre pacotes.")};sum+=file.size}
            guard expanded==sum else{throw failure("Contagem de bytes do pacote divergente.")}
        }
        guard packaged==Set(byPath.keys) else{throw failure("O manifesto deixou arquivos fora dos pacotes.")}
        var items=[DistributionItem](),itemIDs=Set<String>(),hostNames=Set<String>()
        var specialistDepartments=[String:String]()
        for row in rawItems {
            guard let id=row["id"] as? String,Self.validID(id),itemIDs.insert(id).inserted,
                  let kind=row["kind"] as? String,["skill","prompt","tutorial"].contains(kind),
                  let name=row["name"] as? String,!name.isEmpty,name.utf8.count<=500,
                  let entry=row["entry"] as? String,let entryFile=byPath[entry],entryFile.isVault,
                  let required=row["required_files"] as? [String],!required.isEmpty,required.contains(entry),Set(required).count==required.count,
                  required.allSatisfy({byPath[$0]?.isVault==true}),
                  let department=row["department_id"] as? String,["code","design","marketing","sales","research","content","unassigned","conversao","entrega","leads","oferta","sistemas","trafego"].contains(department),
                  row["dependencies"] is [Any] else{throw failure("Item visual sem documento, recursos ou dependências declaradas.")}
            let specialist=row["specialist_id"] as? String,hostName=row["host_name"] as? String
            if kind=="skill" {
                guard entry.hasSuffix("/SKILL.md"),entryFile.kind=="specialists",let specialist,validSpecialistID(specialist),(manifest["skills_layout"] as? String=="department-specialist-skill" ? entry.split(separator:"/").count==6 && entry.split(separator:"/")[3]==Substring(specialist) && Core.structuredSkillDepartments[String(entry.split(separator:"/")[2])]==department : entry.hasPrefix("SISTEMA/skills/"+specialist+"/")),
                      let hostName,hostName=="oracle-"+id,hostName.utf8.count<=64,hostNames.insert(hostName).inserted else{throw failure("Identidade de skill inválida ou duplicada no Codex.")}
            } else {guard entryFile.kind==(kind=="prompt" ? "prompts":"tutorials") else{throw failure("Documento da biblioteca incorreta.")}}
            if let specialist {
                guard specialistDepartments[specialist]==nil || specialistDepartments[specialist]==department else{throw failure("Especialista com departamentos contraditórios no manifesto.")}
                specialistDepartments[specialist]=department
            }
            items.append(DistributionItem(id:id,kind:kind,name:name,entry:entry,department:department,specialist:specialist,hostName:hostName,required:required,raw:row))
        }
        var renamedIDs=Set<String>(),renamedPaths=Set<String>()
        if let raw=manifest["renames"] {
            guard let renames=raw as? [[String:Any]],renames.count<=items.count else{throw failure("Mapeamento de renomes inválido.")}
            for rename in renames {
                guard let id=rename["id"] as? String,let from=rename["from"] as? String,let to=rename["to"] as? String,
                      renamedIDs.insert(id).inserted,renamedPaths.insert(from).inserted,from != to,byPath[from]==nil,
                      let item=items.first(where:{$0.id==id}),item.entry==to else{throw failure("Renome sem identidade estável ou destino correspondente.")}
                guard Self.safePath(from) else{throw failure("Origem do renome fora do vault.")}
            }
        }
        guard let counts=manifest["counts"] as? [String:[String:Any]] else{throw failure("Contagens ausentes.")}
        for kind in ["specialists","prompts","tutorials","gbrain-source"] {
            let group=files.filter{$0.kind==kind},itemKind=["specialists":"skill","prompts":"prompt","tutorials":"tutorial"][kind]
            let itemCount=items.filter{$0.kind==itemKind}.count
            guard !group.isEmpty,counts[kind]?["files"] as? Int==group.count,counts[kind]?["bytes"] as? Int==group.reduce(0,{$0+$1.size}),counts[kind]?["items"] as? Int==itemCount,
                  kind=="gbrain-source" || itemCount>0 else{throw failure("Biblioteca vazia ou inventário parcial não pode concluir a instalação.")}
        }
        guard let components=manifest["components"] as? [String:[String:Any]],components["runtime"]?["source"] as? String=="signed-app-bundle",
              components["runtime"]?["version"] as? String==oracleGBrainPinnedVersion,components["gbrain-method"]?["source"] as? String=="signed-app-bundle",
              components["gbrain-method"]?["commit"] as? String==oracleGBrainPinnedCommit else{throw failure("Motor e método precisam pertencer ao conjunto selado no Oracle.")}
        self.byPath=byPath;self.bytes=bytes;self.hash=envelopeHash;self.releaseID=release;self.sequence=sequence;self.document=manifest;self.files=files;self.items=items;self.packages=packages
    }

    func decodePackage(_ data:Data,metadata:[String:Any]) throws -> [UpdateFile] {
        guard data.count==metadata["bytes"] as? Int,data.count<=Self.maximumPackageBytes,digest(data)==metadata["sha256"] as? String,
              let raw=try JSONSerialization.jsonObject(with:data) as? [String:Any],raw["schema_version"] as? Int==Self.schema,
              raw["release_id"] as? String==releaseID,raw["id"] as? String==metadata["id"] as? String,
              let rows=raw["files"] as? [[String:Any]],let expected=metadata["files"] as? [String],rows.count==expected.count else {throw failure("Pacote incompleto ou checksum divergente.")}
        var decoded=[UpdateFile](),seen=Set<String>();let files=byPath
        for row in rows {
            guard let path=row["path"] as? String,let file=files[path],file.packageID==metadata["id"] as? String,seen.insert(path).inserted,
                  row["sha256"] as? String==file.hash,row["size"] as? Int==file.size,row["mode"] as? Int==file.mode,
                  let text=row["content_base64"] as? String,text.utf8.count<=42_666_668,let bytes=Data(base64Encoded:text),bytes.count==file.size,digest(bytes)==file.hash else{throw failure("Arquivo de pacote diverge do inventário assinado.")}
            decoded.append(UpdateFile(path:path,hash:file.hash,data:bytes))
        }
        guard seen==Set(expected) else{throw failure("Pacote não contém todos os arquivos obrigatórios.")}
        return decoded
    }
}
