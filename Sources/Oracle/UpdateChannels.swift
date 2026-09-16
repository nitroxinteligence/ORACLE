import Foundation

/// The application, catalog and engine have different release streams. A commit
/// is discovery evidence, never an installable or authenticated catalog package.
enum OracleApplicationRelease {
    static let repository="https://github.com/nitroxinteligence/ORACLE"
    static let api="https://api.github.com/repos/nitroxinteligence/ORACLE/releases/latest"
    static func validVersion(_ value:String)->Bool {
        value.count<=32 && value.range(of:"^(0|[1-9][0-9]*)\\.(0|[1-9][0-9]*)\\.(0|[1-9][0-9]*)$",options:.regularExpression) != nil
    }
    static func installedVersion(fallback:String)->String {
        let value=OracleBuildIdentity.metadata()["version"] as? String ?? ""
        return validVersion(value) ? value:fallback
    }
    static func resolve(_ response:[String:Any],installed:String)throws->[String:Any] {
        guard validVersion(installed),response["draft"] as? Bool==false,response["prerelease"] as? Bool==false,
              let tag=response["tag_name"] as? String,tag.hasPrefix("v"),validVersion(String(tag.dropFirst())),
              response["html_url"] as? String==repository+"/releases/tag/"+tag,
              let assets=response["assets"] as? [[String:Any]],assets.count<=1000 else {
            throw failure("A fonte do Oracle não retornou uma versão estável válida do aplicativo.")
        }
        let version=String(tag.dropFirst()),newer=version.compare(installed,options:.numeric) == .orderedDescending
        var value:[String:Any]=["id":"oracle","version":version,"installedVersion":installed,
            "releaseURL":repository+"/releases/tag/"+tag,"repository":repository,"status":"current",
            "message":version.compare(installed,options:.numeric) == .orderedAscending
                ? "Este Mac usa uma versão mais recente que o último instalador publicado."
                : "Você já usa a última versão publicada do aplicativo Oracle."]
        guard newer else{return value}
        // Accept only release assets, not source-code archives or instructions in
        // release notes. Opening the installer is an explicit user action.
        let expected=Set(["Oracle-"+version+"-macos-arm64.zip","Oracle-"+version+"-macos-arm64.dmg",
                          "Oracle-"+version+"-release-arm64.dmg"])
        let pipelinePattern="^Oracle-"+NSRegularExpression.escapedPattern(for:version)+"-[A-Za-z0-9][A-Za-z0-9._-]{0,95}-release-arm64\\.dmg$"
        let named=assets.filter{asset in
            guard let name=asset["name"] as? String else{return false}
            return expected.contains(name) || name.range(of:pipelinePattern,options:.regularExpression) != nil
        }
        let names=named.compactMap{$0["name"] as? String}
        guard Set(names).count==names.count else{throw failure("A release do Oracle contém instaladores duplicados; download não autorizado.")}
        let candidates=named.filter{asset in
            guard let name=asset["name"] as? String,asset["state"] as? String=="uploaded",
                  DistributionManifest.integer(asset["id"],minimum:1) != nil,
                  asset["browser_download_url"] as? String==repository+"/releases/download/"+tag+"/"+name,
                  let size=DistributionManifest.integer(asset["size"],minimum:1,maximum:1_000_000_000),size>0,
                  let hash=asset["digest"] as? String,hash.hasPrefix("sha256:"),DistributionManifest.validHash(String(hash.dropFirst(7))) else{return false}
            return true
        }.sorted{($0["name"] as? String ?? "")<($1["name"] as? String ?? "")}
        guard candidates.filter({($0["name"] as? String ?? "").hasSuffix(".dmg")}).count<=1 else {
            throw failure("A release do Oracle contém mais de um instalador para este Mac. Confira a publicação antes de baixar.")
        }
        guard let asset=candidates.first else {
            value["status"]="publication_pending"
            value["message"]="A nova versão foi anunciada, mas falta publicar um instalador verificável para este Mac."
            return value
        }
        value["status"]="download_available";value["downloadURL"]=asset["browser_download_url"]
        value["downloadSHA256"]=asset["digest"];value["downloadBytes"]=asset["size"]
        value["message"]="Nova versão do aplicativo Oracle disponível. Baixe o instalador; atualizar o acervo ou o GBrain não substitui o aplicativo."
        return value
    }
}

/// The signed manifest remains the authority for catalog bytes and compatibility.
/// This receipt binds those bytes to one stable release asset from the fixed repo.
struct OracleCatalogRelease {
    static let repository="https://github.com/nitroxinteligence/ORACLE-SKILLS"
    static let api="https://api.github.com/repos/nitroxinteligence/ORACLE-SKILLS/releases/latest"
    let tag:String,url:String,sha256:String
    let size:Int
    static func resolve(_ response:[String:Any])throws->OracleCatalogRelease {
        guard response["draft"] as? Bool==false,response["prerelease"] as? Bool==false,
              let tag=response["tag_name"] as? String,
              tag.range(of:"^[A-Za-z0-9][A-Za-z0-9._-]{0,79}$",options:.regularExpression) != nil,
              response["html_url"] as? String==repository+"/releases/tag/"+tag,
              let assets=response["assets"] as? [[String:Any]],assets.count<=1000 else {
            throw failure("A fonte do acervo não retornou uma release estável válida.")
        }
        let matches=assets.filter{$0["name"] as? String=="oracle-distribution.json"}
        guard matches.count==1,let asset=matches.first,asset["state"] as? String=="uploaded",
              DistributionManifest.integer(asset["id"],minimum:1) != nil,
              let size=DistributionManifest.integer(asset["size"],minimum:1,maximum:24_000_000),
              let hash=asset["digest"] as? String,hash.hasPrefix("sha256:"),DistributionManifest.validHash(String(hash.dropFirst(7))),
              let url=asset["browser_download_url"] as? String,
              url==repository+"/releases/download/"+tag+"/oracle-distribution.json" else {
            throw failure("A release do acervo não possui um manifesto publicado com origem e integridade verificáveis.")
        }
        return OracleCatalogRelease(tag:tag,url:url,sha256:String(hash.dropFirst(7)),size:size)
    }
    func verify(_ data:Data)throws {
        guard data.count==size,digest(data)==sha256 else{throw failure("O manifesto do acervo diverge do tamanho ou checksum da release publicada.")}
    }
}

enum OracleSourcePublication {
    /// Bounded non-recursive tree reads compare content, not push timestamps.
    /// A README-only commit must not announce new catalog material.
    static func fingerprint(_ response:[String:Any],paths:Set<String>)throws->[String:String] {
        guard response["truncated"] as? Bool==false,let rows=response["tree"] as? [[String:Any]],rows.count<=1000 else {
            throw failure("Inventário do GitHub incompleto; não foi possível conferir a publicação.")
        }
        var value=[String:String](),seen=Set<String>()
        for row in rows {
            guard let path=row["path"] as? String,seen.insert(path).inserted,
                  let type=row["type"] as? String,["tree","blob","commit"].contains(type),
                  let hash=row["sha"] as? String,hash.range(of:"^[a-f0-9]{40}$",options:.regularExpression) != nil else {
                throw failure("Inventário do GitHub inválido; publicação não conferida.")
            }
            if paths.contains(path) {value[path]=type+":"+hash}
        }
        guard !value.isEmpty else{throw failure("O GitHub não retornou as pastas esperadas desta publicação.")}
        return value
    }
    static func pending(repository:String,tag:String,paths:Set<String>,fetch:(String)throws->[String:Any])throws->Bool {
        guard ["ORACLE","ORACLE-SKILLS"].contains(repository),
              tag.range(of:"^[A-Za-z0-9][A-Za-z0-9._-]{0,79}$",options:.regularExpression) != nil else {
            throw failure("Origem de publicação inválida.")
        }
        let base="https://api.github.com/repos/nitroxinteligence/"+repository+"/git/trees/"
        let published=try fingerprint(fetch(base+tag),paths:paths)
        let current=try fingerprint(fetch(base+"main"),paths:paths)
        return current != published
    }
    static func annotate(_ row:[String:Any],pending:Bool,message:String)->[String:Any] {
        var result=row
        result["publicationChecked"]=true;result["publicationPending"]=pending
        if pending {
            result["publicationMessage"]=message
            if ["current","updated"].contains(row["status"] as? String ?? "") {
                result["publishedStatus"]=row["status"];result["status"]="publication_pending"
            }
        }
        return result
    }
}

extension Core {
    /// Runs independently of the engine and catalog result. No self-install,
    /// shell command, release-body execution or application replacement here.
    func checkOracleApplication(network:UpdateNetwork)->[String:Any]? {
        guard (try? updateManifest()["oracle"] as? [String:Any])?["repository"] as? String==OracleApplicationRelease.repository else{return nil}
        do {
            let release=try network.json(OracleApplicationRelease.api)
            let fallback=(try? updateManifest()["oracle_version"] as? String) ?? ""
            let installed=OracleApplicationRelease.installedVersion(fallback:fallback)
            var row=try OracleApplicationRelease.resolve(release,installed:installed)
            if row["status"] as? String=="current",let tag=release["tag_name"] as? String {
                do {
                    let pending=try OracleSourcePublication.pending(repository:"ORACLE",tag:tag,
                        paths:["Sources","Resources","packages","scripts","skills","Package.swift","package.json"],fetch:network.json)
                    row=OracleSourcePublication.annotate(row,pending:pending,
                        message:"Há alterações no código do GitHub que ainda não fazem parte de um novo instalador publicado para os usuários.")
                } catch {row["publicationChecked"]=false;row["publicationMessage"]="O instalador publicado foi consultado, mas não foi possível comparar as alterações da branch."}
            }
            return row
        } catch {return ["id":"oracle","status":"error","message":"Não foi possível consultar o aplicativo Oracle: "+error.localizedDescription]}
    }
    func catalogPublication(manifest:DistributionManifest,network:UpdateNetwork)->[String:Any] {
        do {
            let pending=try OracleSourcePublication.pending(repository:"ORACLE-SKILLS",tag:manifest.releaseID,paths:["SISTEMA"],fetch:network.json)
            return ["publicationChecked":true,"publicationPending":pending,
                "publicationMessage":pending ? "Há skills, prompts ou tutoriais novos no GitHub que ainda não foram incluídos em uma release assinada do acervo. O mantenedor precisa publicar o novo pacote.":""]
        } catch {return ["publicationChecked":false,"publicationMessage":"A release do acervo foi consultada, mas não foi possível comparar as alterações da branch."]}
    }
    func catalogUpdateRow(status:String,message:String,manifest:DistributionManifest,publication:[String:Any])->[String:Any] {
        var row:[String:Any]=["id":"skills","status":status,"message":message,"version":manifest.releaseID,
            "repository":"https://github.com/nitroxinteligence/ORACLE-SKILLS",
            "counts":["skills":manifest.items.filter{$0.kind=="skill"}.count,
                      "prompts":manifest.items.filter{$0.kind=="prompt"}.count,
                      "tutorials":manifest.items.filter{$0.kind=="tutorial"}.count]]
        for (key,value) in publication {row[key]=value}
        if publication["publicationPending"] as? Bool==true,["current","updated"].contains(status) {
            row["publishedStatus"]=status;row["status"]="publication_pending"
        }
        return row
    }
}
