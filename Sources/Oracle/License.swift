import Foundation
import CryptoKit

struct OracleLicense: Codable {
    let version: Int
    let product: String
    let keyID: String
    let licenseID: String
    let subject: String
    let issuedAt: Int64
    let expiresAt: Int64?
    let deviceID: String?
    var devicePublicKey: String? = nil
    var invitationID: String? = nil
    var requestID: String? = nil
    var role: String? = nil
    var accessKeyHash: String? = nil
    var usesKeyProof: Bool { devicePublicKey != nil || invitationID != nil || requestID != nil || role != nil }
}
struct LicenseKeys: Codable { let version: Int; let keys: [String: String] }
struct OracleActivationRequest: Codable {
    let version: Int
    let product: String
    let invitation: String
    let requestID: String
    let deviceID: String
    let devicePublicKey: String
    let keyProtection: String
    let createdAt: Int64
}
func base64URL(_ data: Data) -> String {
    data.base64EncodedString().replacingOccurrences(of: "+", with: "-").replacingOccurrences(of: "/", with: "_").replacingOccurrences(of: "=", with: "")
}
func decodeBase64URL(_ text: String) -> Data? {
    guard !text.isEmpty, text.count < 8192, text.allSatisfy({ $0.isASCII && ($0.isLetter || $0.isNumber || $0 == "-" || $0 == "_") }) else { return nil }
    let padded = text.replacingOccurrences(of: "-", with: "+").replacingOccurrences(of: "_", with: "/") + String(repeating: "=", count: (4-text.count%4)%4)
    guard let data = Data(base64Encoded: padded), base64URL(data) == text else { return nil }; return data
}
func validInvitation(_ text: String) -> Bool {
    let p = text.split(separator: ".", omittingEmptySubsequences: false)
    return p.count == 2 && p[0] == "ORACLEINV2" && decodeBase64URL(String(p[1]))?.count == 32
}
func makeActivationRequest(invitation: String, identity: OracleDeviceIdentity, now: Int64 = Int64(Date().timeIntervalSince1970)) throws -> String {
    guard validInvitation(invitation) else { throw failure("Convite inválido. Use o convite individual enviado pelo proprietário.") }
    try identity.provePossession()
    let value = OracleActivationRequest(version: 2, product: "oracle-macos", invitation: invitation, requestID: UUID().uuidString,
        deviceID: identity.fingerprint, devicePublicKey: base64URL(identity.publicKey), keyProtection: "secure-enclave-p256", createdAt: now)
    let bytes = try JSONEncoder().encode(value)
    return "ORACLEREQ2." + base64URL(bytes) + "." + base64URL(try identity.sign(Data("ORACLEREQ2.".utf8) + bytes))
}
func validateActivationRequest(_ code: String) throws -> OracleActivationRequest {
    let p = code.trimmingCharacters(in: .whitespacesAndNewlines).split(separator: ".", omittingEmptySubsequences: false)
    guard code.utf8.count <= 8192, p.count == 3, p[0] == "ORACLEREQ2",
        let bytes = decodeBase64URL(String(p[1])), bytes.count < 4096, let signature = decodeBase64URL(String(p[2])), signature.count == 64,
        let value = try? JSONDecoder().decode(OracleActivationRequest.self, from: bytes), value.version == 2, value.product == "oracle-macos",
        validInvitation(value.invitation), UUID(uuidString: value.requestID) != nil, value.createdAt >= 0,
        value.keyProtection == "secure-enclave-p256", let pub = decodeBase64URL(value.devicePublicKey), value.deviceID == digest(pub),
        let key = try? P256.Signing.PublicKey(x963Representation: pub), let sig = try? P256.Signing.ECDSASignature(rawRepresentation: signature),
        key.isValidSignature(sig, for: Data("ORACLEREQ2.".utf8) + bytes) else { throw failure("Solicitação de ativação inválida ou alterada.") }
    return value
}

/// Verify the signed envelope before interpreting either shipped ORACLE2 binding.
/// ORACLE1 is read-only compatibility; v3 uses an issuer-provisioned short key.
func validateLicense(_ code: String, keys: LicenseKeys, device: String, now: Int64 = Int64(Date().timeIntervalSince1970)) throws -> OracleLicense {
    guard code.utf8.count <= 8192 else { throw failure("Código inválido ou muito longo.") }
    let p = code.trimmingCharacters(in: .whitespacesAndNewlines).split(separator: ".", omittingEmptySubsequences: false)
    guard keys.version == 1, p.count == 3, ["ORACLE1", "ORACLE2", "ORACLE3"].contains(String(p[0])),
        let bytes = decodeBase64URL(String(p[1])), bytes.count < 4096,
        let signature = decodeBase64URL(String(p[2])), signature.count == 64,
        let value = try? JSONDecoder().decode(OracleLicense.self, from: bytes),
        String(p[0]) == "ORACLE\(value.version)", [1, 2, 3].contains(value.version), value.product == "oracle-macos",
        UUID(uuidString: value.licenseID) != nil,
        !value.subject.trimmingCharacters(in: .whitespacesAndNewlines).isEmpty, value.subject.count <= 160,
        let publicText = keys.keys[value.keyID], let publicData = Data(base64Encoded: publicText),
        let key = try? Curve25519.Signing.PublicKey(rawRepresentation: publicData),
        key.isValidSignature(signature, for: Data((String(p[0]) + ".").utf8) + bytes) else {
        throw failure("Licença inválida ou alterada. Confira o código individual recebido.")
    }
    guard value.issuedAt >= 0, value.issuedAt <= now + 300 else { throw failure("Confira a data do Mac antes de ativar a licença.") }
    if value.version == 3 {
        guard value.expiresAt == nil, value.deviceID == nil, value.devicePublicKey == nil,
              value.invitationID == nil, value.requestID == nil,
              let role = value.role, ["owner", "student"].contains(role),
              let hash = value.accessKeyHash, hash.count == 64, hash.allSatisfy({ "0123456789abcdef".contains($0) }) else {
            throw failure("Chave de acesso incompleta ou incompatível.")
        }
    } else if value.version == 2 {
        guard value.expiresAt == nil, let required = value.deviceID, required == device else {
            throw failure("Este código permanente não corresponde ao vínculo verificado deste Mac.")
        }
        if value.usesKeyProof {
            guard let role = value.role, ["student", "owner"].contains(role),
                let invitation = value.invitationID, invitation.count == 64, invitation.allSatisfy({"0123456789abcdef".contains($0)}),
                let request = value.requestID, UUID(uuidString: request) != nil,
                let text = value.devicePublicKey, let pub = decodeBase64URL(text),
                (try? P256.Signing.PublicKey(x963Representation: pub)) != nil, digest(pub) == required else {
                throw failure("Resposta de ativação com prova de aparelho incompleta ou incompatível.")
            }
        } else {
            guard OracleDeviceBinding.valid(required) else { throw failure("Vínculo ORACLE-MAC2 inválido.") }
        }
    } else {
        guard !value.usesKeyProof else { throw failure("Campos ORACLE2 não podem ser usados como licença antiga.") }
        if let required = value.deviceID, required != device { throw failure("Este código foi emitido para outro Mac.") }
        if let expires = value.expiresAt { guard expires > value.issuedAt, expires > now else { throw failure("Este código expirou.") } }
    }
    return value
}
func validateDeviceLicense(_ code: String, keys: LicenseKeys, identity: OracleDeviceIdentity, now: Int64 = Int64(Date().timeIntervalSince1970)) throws -> OracleLicense {
    let license = try validateLicense(code, keys: keys, device: identity.fingerprint, now: now)
    guard license.usesKeyProof, let text = license.devicePublicKey, decodeBase64URL(text) == identity.publicKey else {
        throw failure("Chave do aparelho incompatível.")
    }
    try identity.provePossession(); return license
}

enum OracleCapability: String { case useOracle, configure, manageCatalogSource, manageDistribution, issueLicenses }
func licenseCapabilities(_ license: OracleLicense?) -> [String: Bool] {
    let active = license != nil, owner = license?.role == "owner"
    return ["useOracle": active, "configure": active, "manageCatalogSource": owner, "manageDistribution": owner, "issueLicenses": false]
}
extension Core {
    func licenseKeys() throws -> LicenseKeys {
        // In-process test injection only; no UI, environment or profile trust override.
        if let licenseTrust { return licenseTrust }
        guard let resources = Bundle.main.resourceURL else { throw failure("As chaves públicas do aplicativo não estão disponíveis.") }
        let url = resources.appendingPathComponent("licensing/public-keys.json")
        let values = try url.resourceValues(forKeys: [.isRegularFileKey, .isSymbolicLinkKey, .fileSizeKey])
        guard values.isRegularFile == true, values.isSymbolicLink != true, (values.fileSize ?? Int.max) <= 65536 else { throw failure("O pacote de chaves públicas é inválido.") }
        return try JSONDecoder().decode(LicenseKeys.self, from: Data(contentsOf: url))
    }
    func licenseDeviceID() throws -> String { try licenseDevice.identifier(create:false) }
    private func checkedLicense(_ code:String) throws -> OracleLicense {
        let parts=code.split(separator:".",omittingEmptySubsequences:false)
        guard parts.count==3,let bytes=decodeBase64URL(String(parts[1])),
              let value=try? JSONDecoder().decode(OracleLicense.self,from:bytes) else {throw failure("Código de acesso inválido.")}
        let keys=try licenseKeys()
        if value.version == 3 {return try validateLicense(code,keys:keys,device:"")}
        if value.usesKeyProof {return try validateDeviceLicense(code,keys:keys,identity:SecureEnclaveDeviceIdentity.load())}
        let device:String
        if code.hasPrefix("ORACLE2.") {device=try licenseDevice.identifier(create:false)}
        else {device=(try? licenseFile("onboarding/device-id",limit:128)).flatMap{String(data:$0,encoding:.utf8)} ?? ""}
        return try validateLicense(code,keys:keys,device:device)
    }
    func activeLicense() -> OracleLicense? {
        guard let bytes=try? licenseFile("onboarding/license"),let text=String(data:bytes,encoding:.utf8) else{return nil}
        return try? checkedLicense(text.trimmingCharacters(in:.whitespacesAndNewlines))
    }
    func requireCapability(_ capability: OracleCapability) throws {
        guard licenseCapabilities(activeLicense())[capability.rawValue] == true else {
            throw failure(capability == .useOracle || capability == .configure ? "Ative a licença deste Mac para continuar." : "Esta ação exige autorização administrativa assinada do proprietário.")
        }
    }
    func activationRequest(_ invitation: String) throws -> [String: Any] {
        let token=invitation.trimmingCharacters(in:.whitespacesAndNewlines)
        guard validInvitation(token) else{throw failure("Convite individual inválido.")}
        let lock=try acquireOperationLock("license");defer{releaseOperationLock(lock)}
        let identity=try SecureEnclaveDeviceIdentity.load(create:true)
        let path=try scoped("onboarding/activation-request",root:home)
        if let bytes=try? licenseFile("onboarding/activation-request"),let saved=String(data:bytes,encoding:.utf8),
           let previous=try? validateActivationRequest(saved),previous.invitation==token,previous.deviceID==identity.fingerprint {
            try identity.provePossession();return ["request":saved,"deviceID":identity.fingerprint,"status":"awaiting_response"]
        }
        let request=try makeActivationRequest(invitation:token,identity:identity)
        try fm.createDirectory(at:path.deletingLastPathComponent(),withIntermediateDirectories:true,attributes:[.posixPermissions:0o700])
        try atomicWriteData(Data(request.utf8),to:path,permissions:0o600)
        return ["request":request,"deviceID":identity.fingerprint,"status":"awaiting_response"]
    }
    func activateLicense(_ code:String) throws -> [String:Any] {
        var clean=code.trimmingCharacters(in:.whitespacesAndNewlines)
        guard clean.utf8.count<=8192 else {throw failure("Chave de acesso inválida.")}
        // A short key selects an issuer-provisioned, signed grant. The key itself
        // cannot grant access or change a role; no issuer secrets ship in the app.
        if !clean.hasPrefix("ORACLE2.") {
            let normalized=clean.uppercased().replacingOccurrences(of:"-",with:"").replacingOccurrences(of:" ",with:"")
            guard normalized.count==16, normalized.allSatisfy({"23456789ABCDEFGHJKLMNPQRSTUVWXYZ".contains($0)}) else {throw failure("Confira sua chave de acesso.")}
            let hash=digest(Data(normalized.utf8))
            guard let bytes=try? licenseFile("onboarding/access-grants/\(hash).license"),
                  let grant=String(data:bytes,encoding:.utf8),
                  let license=try? checkedLicense(grant),license.version==3,license.accessKeyHash==hash else {
                throw failure("Chave de acesso não reconhecida nesta instalação.")
            }
            clean=grant
        }
        let lock=try acquireOperationLock("license");defer{releaseOperationLock(lock)}
        let setup=try acquireOperationLock("setup");defer{releaseOperationLock(setup)}
        let value=try checkedLicense(clean)
        let path=try scoped("onboarding/license",root:home)
        try fm.createDirectory(at:path.deletingLastPathComponent(),withIntermediateDirectories:true,attributes:[.posixPermissions:0o700])
        try atomicWriteData(Data(clean.utf8),to:path,permissions:0o600)
        var state=onboardingRecord();state["legacyAccess"]=false;try writeJSON(state,onboardingURL)
        return ["valid":true,"subject":value.subject,"deviceBound":value.deviceID != nil,"offline":true,"expires":false,
                "role":value.role ?? "student","capabilities":licenseCapabilities(value)]
    }
}
