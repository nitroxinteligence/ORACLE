import Foundation

// Release identity comes from the fixed official API, never from a user supplied
// repository or the release body's instructions. The bundled adapter stays pinned.
enum OfficialRuntimeRelease {
    static let api = "https://api.github.com/repos/garrytan/gbrain/releases/latest"
    static let repository = "https://github.com/garrytan/gbrain"
    static let asset = "gbrain-darwin-arm64"
    static func validVersion(_ value:String) -> Bool {
        value.range(of:"^[0-9]+(?:\\.[0-9]+){2,3}$",options:.regularExpression) != nil && value.count <= 48
    }
    static func valid(_ release:[String:Any]) -> Bool {
        guard release["origin"] as? String == "official-github",
              let version=release["version"] as? String,validVersion(version),
              release["tag"] as? String == "v"+version,
              release["repository"] as? String == repository,
              release["asset"] as? String == asset,
              release["platform"] as? String == "darwin-arm64",
              release["download_url"] as? String == repository+"/releases/download/v"+version+"/"+asset,
              let hash=release["sha256"] as? String,hash.range(of:"^[a-f0-9]{64}$",options:.regularExpression) != nil,
              let id=release["asset_id"] as? Int,id>0 else{return false}
        return true
    }
    static func resolve(_ response:[String:Any],adapterCommit:String) throws -> [String:Any] {
        guard response["draft"] as? Bool == false,response["prerelease"] as? Bool == false,
              let tag=response["tag_name"] as? String,tag.hasPrefix("v"),validVersion(String(tag.dropFirst())),
              response["html_url"] as? String == repository+"/releases/tag/"+tag,
              let assets=response["assets"] as? [[String:Any]] else{throw failure("A fonte oficial não retornou uma versão estável válida do Second Brain.")}
        let matches=assets.filter{$0["name"] as? String == asset}
        guard matches.count==1,let item=matches.first,let digest=item["digest"] as? String,digest.hasPrefix("sha256:"),
              let size=item["size"] as? Int,size>0,size<=220_000_000,let id=item["id"] as? Int,
              let url=item["browser_download_url"] as? String else{throw failure("A versão oficial não possui um arquivo para este Mac com verificação de integridade.")}
        let release:[String:Any] = ["origin":"official-github","repository":repository,"tag":tag,"version":String(tag.dropFirst()),"asset":asset,"asset_id":id,"sha256":String(digest.dropFirst(7)),"download_url":url,"platform":"darwin-arm64","commit":adapterCommit,"database_compatibility":"candidate-probe"]
        guard valid(release) else{throw failure("O arquivo não pertence à versão oficial do Second Brain.")}
        return release
    }
}

extension Core {
    func updateOfficialRuntime(network:UpdateNetwork,checkOnly:Bool,locksHeld:Bool=false) throws -> [String:Any] {
        let source=try updateManifest()["gbrain"] as? [String:Any] ?? [:]
        guard let adapter=source["adapter_commit"] as? String else{throw failure("Adaptador do Second Brain indisponível.")}
        let release=try OfficialRuntimeRelease.resolve(network.json(OfficialRuntimeRelease.api),adapterCommit:adapter)
        let version=release["version"] as! String
        let current=(try? readJSON(updatePath("runtime/current.json")))?["version"] as? String ?? oracleGBrainPinnedVersion
        if version.compare(current,options:.numeric) != .orderedDescending {
            _=try engineResources()
            return ["id":"gbrain","status":"current","version":current,"message":"Second Brain está atualizado."]
        }
        if checkOnly {return ["id":"gbrain","status":"available","version":version,"message":"Nova versão oficial disponível."]}
        try recordUpdate("downloading","Baixando atualização do Second Brain",progressSource:"runtime")
        let binary=try network.fetch(release["download_url"] as! String,limit:220_000_000) { downloaded,total in
            try? self.recordUpdate("downloading","Baixando atualização do Second Brain",completed:downloaded,total:total,progressSource:"runtime")
        }
        let setup=try locksHeld ? nil : acquireOperationLock("setup");defer{if let setup{releaseOperationLock(setup)}}
        let brain=try locksHeld ? nil : acquireOperationLock("gbrain");defer{if let brain{releaseOperationLock(brain)}}
        try requireCapability(.configure)
        try recordUpdate("verifying","Verificando o Second Brain em uma cópia local",progressSource:"runtime")
        _=try activateRuntime(binary:binary,release:release)
        return ["id":"gbrain","status":"updated","version":version,"message":"Second Brain atualizado e verificado."]
    }
}
