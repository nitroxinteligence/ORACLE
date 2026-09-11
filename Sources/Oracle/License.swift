import Foundation
import CryptoKit

// The exact payload bytes are signed, so JSON encoding differences cannot validate a forged code.
struct OracleLicense: Codable {
    let version: Int
    let product: String
    let keyID: String
    let licenseID: String
    let subject: String
    let issuedAt: Int64
    let expiresAt: Int64?
    let deviceID: String?
}
struct LicenseKeys: Codable { let version: Int; let keys: [String:String] }
func base64URL(_ data:Data)->String { data.base64EncodedString().replacingOccurrences(of:"+",with:"-").replacingOccurrences(of:"/",with:"_").replacingOccurrences(of:"=",with:"") }
func decodeBase64URL(_ text:String)->Data? {
    guard !text.isEmpty,text.count<8192,text.allSatisfy({$0.isASCII && ($0.isLetter || $0.isNumber || $0=="-" || $0=="_")}) else { return nil }
    let padded=text.replacingOccurrences(of:"-",with:"+").replacingOccurrences(of:"_",with:"/") + String(repeating:"=",count:(4-text.count%4)%4)
    guard let data=Data(base64Encoded:padded),base64URL(data)==text else { return nil };return data
}
func validateLicense(_ code:String, keys:LicenseKeys, device:String, now:Int64=Int64(Date().timeIntervalSince1970)) throws -> OracleLicense {
    guard code.utf8.count<=8192 else{throw failure("Código inválido ou muito longo.")}
    let parts=code.trimmingCharacters(in:.whitespacesAndNewlines).split(separator:".",omittingEmptySubsequences:false)
    guard parts.count==3,["ORACLE1","ORACLE2"].contains(parts[0]),keys.version==1,
          let payload=decodeBase64URL(String(parts[1])),payload.count<4096,
          let signature=decodeBase64URL(String(parts[2])),signature.count==64,
          let value=try? JSONDecoder().decode(OracleLicense.self,from:payload),
          (value.version==1 && parts[0]=="ORACLE1" || value.version==2 && parts[0]=="ORACLE2"),
          value.product=="oracle-macos",UUID(uuidString:value.licenseID) != nil,
          !value.subject.trimmingCharacters(in:.whitespacesAndNewlines).isEmpty,value.subject.count<=160,
          let publicText=keys.keys[value.keyID],let publicData=Data(base64Encoded:publicText),
          let publicKey=try? Curve25519.Signing.PublicKey(rawRepresentation:publicData),
          publicKey.isValidSignature(signature,for:Data((String(parts[0])+".").utf8)+payload) else {
        throw failure("Código inválido ou alterado. Confira o código recebido de Mateus.")
    }
    if value.version==2 {
        guard let required=value.deviceID,OracleDeviceBinding.valid(required),required==device else {
            throw failure("Este código não corresponde ao vínculo verificado deste Mac. Solicite a emissão ou migração do acesso.")
        }
        guard value.expiresAt==nil,value.issuedAt>=0 else {
            throw failure("O acesso offline desta versão não aceita prazo de expiração.")
        }
    }
    guard value.issuedAt<=now+300 else { throw failure("Confira a data do Mac antes de ativar este código.") }
    if let expires=value.expiresAt { guard expires>value.issuedAt,expires>now else { throw failure("Este código expirou. Solicite um novo código a Mateus.") } }
    if let required=value.deviceID { guard required==device else { throw failure("Este código foi emitido para outro Mac.") } }
    return value
}
extension Core {
    func licenseKeys() throws -> LicenseKeys {
        if let licenseTrust {return licenseTrust}
        let url=bundledEngineResources().deletingLastPathComponent().appendingPathComponent("licensing/public-keys.json")
        return try JSONDecoder().decode(LicenseKeys.self,from:Data(contentsOf:url))
    }
    func licenseDeviceID() throws -> String {
        let path=home.appendingPathComponent("onboarding/device-id")
        if let value=try? String(contentsOf:path,encoding:.utf8),UUID(uuidString:value) != nil { return value }
        try fm.createDirectory(at:path.deletingLastPathComponent(),withIntermediateDirectories:true,attributes:[.posixPermissions:0o700])
        let value=UUID().uuidString;try Data(value.utf8).write(to:path,options:.withoutOverwriting);try fm.setAttributes([.posixPermissions:0o600],ofItemAtPath:path.path);return value
    }
    func activeLicense() -> OracleLicense? {
        guard let bytes=try? licenseFile("onboarding/license"),let raw=String(data:bytes,encoding:.utf8),let keys=try? licenseKeys() else{return nil}
        let code=raw.trimmingCharacters(in:.whitespacesAndNewlines)
        let device:String
        if code.hasPrefix("ORACLE2.") {
            guard let current=try? licenseDevice.identifier(create:false) else{return nil};device=current
        } else {
            // Read-only v1 compatibility, never regenerate a device UUID.
            device=(try? licenseFile("onboarding/device-id",limit:128)).flatMap{String(data:$0,encoding:.utf8)} ?? ""
        }
        return try? validateLicense(code,keys:keys,device:device)
    }
    func activateLicense(_ code:String) throws -> [String:Any] {
        let clean=code.trimmingCharacters(in:.whitespacesAndNewlines)
        guard clean.hasPrefix("ORACLE2.") else {
            throw failure("Novas ativações exigem um código individual ORACLE2 para este Mac. A instalação e os documentos existentes foram preservados.")
        }
        let lock=try acquireOperationLock("license");defer{releaseOperationLock(lock)}
        let setup=try acquireOperationLock("setup");defer{releaseOperationLock(setup)}
        let device=try licenseDevice.identifier(create:false)
        let value=try validateLicense(clean,keys:licenseKeys(),device:device)
        let path=try scoped("onboarding/license",root:home)
        try fm.createDirectory(at:path.deletingLastPathComponent(),withIntermediateDirectories:true,attributes:[.posixPermissions:0o700])
        try atomicWriteData(Data(clean.utf8),to:path,permissions:0o600)
        // Legacy access also checks the v2 prefix if interrupted before this save.
        var state=onboardingRecord();state["legacyAccess"]=false;try writeJSON(state,onboardingURL)
        return ["valid":true,"subject":value.subject,"deviceBound":true,"offline":true,"expires":false]
    }
}
