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
    let deviceID: String
    let devicePublicKey: String
    let invitationID: String
    let requestID: String
    let role: String
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

/// This verifies the issuer envelope. Every production access decision ALSO proves local key possession.
func validateLicense(_ code: String, keys: LicenseKeys, device: String, now: Int64 = Int64(Date().timeIntervalSince1970)) throws -> OracleLicense {
    let p = code.trimmingCharacters(in: .whitespacesAndNewlines).split(separator: ".", omittingEmptySubsequences: false)
    guard code.utf8.count <= 8192, keys.version == 1, p.count == 3, p[0] == "ORACLE2",
        let bytes = decodeBase64URL(String(p[1])), bytes.count < 4096, let sig = decodeBase64URL(String(p[2])), sig.count == 64,
        let value = try? JSONDecoder().decode(OracleLicense.self, from: bytes), value.version == 2, value.product == "oracle-macos",
        UUID(uuidString: value.licenseID) != nil, UUID(uuidString: value.requestID) != nil,
        !value.subject.trimmingCharacters(in: .whitespacesAndNewlines).isEmpty, value.subject.count <= 160,
        ["student", "owner"].contains(value.role), value.invitationID.count == 64, value.invitationID.allSatisfy(\.isHexDigit),
        let pub = decodeBase64URL(value.devicePublicKey), (try? P256.Signing.PublicKey(x963Representation: pub)) != nil, digest(pub) == value.deviceID,
        let publicText = keys.keys[value.keyID], let publicData = Data(base64Encoded: publicText),
        let key = try? Curve25519.Signing.PublicKey(rawRepresentation: publicData), key.isValidSignature(sig, for: Data("ORACLE2.".utf8) + bytes) else {
        throw failure("Licença inválida, antiga ou alterada. Solicite uma resposta de ativação vinculada a este Mac.")
    }
    guard value.deviceID == device else { throw failure("Esta licença pertence a outro Mac.") }
    guard value.issuedAt >= 0, value.issuedAt <= now + 300 else { throw failure("Confira a data do Mac antes de ativar a licença.") }
    guard value.expiresAt == nil else { throw failure("Este produto exige licença permanente, sem expiração.") }
    return value
}
func validateDeviceLicense(_ code: String, keys: LicenseKeys, identity: OracleDeviceIdentity, now: Int64 = Int64(Date().timeIntervalSince1970)) throws -> OracleLicense {
    let license = try validateLicense(code, keys: keys, device: identity.fingerprint, now: now)
    guard decodeBase64URL(license.devicePublicKey) == identity.publicKey else { throw failure("Chave do aparelho incompatível.") }
    try identity.provePossession(); return license
}

enum OracleCapability: String { case useOracle, configure, manageCatalogSource, manageDistribution, issueLicenses }
func licenseCapabilities(_ license: OracleLicense?) -> [String: Bool] {
    let active = license != nil, owner = license?.role == "owner"
    return ["useOracle": active, "configure": active, "manageCatalogSource": owner, "manageDistribution": owner, "issueLicenses": false]
}
extension Core {
    func licenseKeys() throws -> LicenseKeys {
        // Trust roots come only from the signed application bundle, never engine/config overrides.
        // Tests inject an ephemeral LicenseKeys directly into the pure validator instead.
        guard let resources = Bundle.main.resourceURL else { throw failure("As chaves públicas do aplicativo não estão disponíveis.") }
        let url = resources.appendingPathComponent("licensing/public-keys.json")
        let values = try url.resourceValues(forKeys: [.isRegularFileKey, .isSymbolicLinkKey, .fileSizeKey])
        guard values.isRegularFile == true, values.isSymbolicLink != true, (values.fileSize ?? Int.max) <= 65536 else { throw failure("O pacote de chaves públicas é inválido. Reinstale o aplicativo verificado.") }
        return try JSONDecoder().decode(LicenseKeys.self, from: Data(contentsOf: url))
    }
    func licenseDeviceID() throws -> String { try SecureEnclaveDeviceIdentity.load().fingerprint }
    func activeLicense() -> OracleLicense? {
        guard let code = try? String(contentsOf: home.appendingPathComponent("onboarding/license"), encoding: .utf8) else { return nil }
        return try? validateDeviceLicense(code, keys: licenseKeys(), identity: SecureEnclaveDeviceIdentity.load())
    }
    func requireCapability(_ capability: OracleCapability) throws {
        guard licenseCapabilities(activeLicense())[capability.rawValue] == true else {
            throw failure(capability == .useOracle || capability == .configure ? "Ative a licença deste Mac para continuar." : "Esta ação exige autorização administrativa assinada do proprietário.")
        }
    }
    func activationRequest(_ invitation: String) throws -> [String: Any] {
        let token = invitation.trimmingCharacters(in: .whitespacesAndNewlines)
        guard validInvitation(token) else { throw failure("Convite individual inválido.") }
        let identity = try SecureEnclaveDeviceIdentity.load(create: true)
        let path = home.appendingPathComponent("onboarding/activation-request")
        if let saved = try? String(contentsOf: path, encoding: .utf8), let previous = try? validateActivationRequest(saved),
            previous.invitation == token, previous.deviceID == identity.fingerprint {
            try identity.provePossession(); return ["request": saved, "deviceID": identity.fingerprint, "status": "awaiting_response"]
        }
        let request = try makeActivationRequest(invitation: token, identity: identity)
        try fm.createDirectory(at: path.deletingLastPathComponent(), withIntermediateDirectories: true, attributes: [.posixPermissions: 0o700])
        try Data(request.utf8).write(to: path, options: .atomic)
        try fm.setAttributes([.posixPermissions: 0o600], ofItemAtPath: path.path)
        return ["request": request, "deviceID": identity.fingerprint, "status": "awaiting_response"]
    }
    func activateLicense(_ code: String) throws -> [String: Any] {
        let identity = try SecureEnclaveDeviceIdentity.load()
        let value = try validateDeviceLicense(code, keys: licenseKeys(), identity: identity)
        let path = home.appendingPathComponent("onboarding/license")
        // Recovery/reinstallation may re-import the same device-bound response; no remote service is needed.
        try fm.createDirectory(at: path.deletingLastPathComponent(), withIntermediateDirectories: true, attributes: [.posixPermissions: 0o700])
        try Data(code.trimmingCharacters(in: .whitespacesAndNewlines).utf8).write(to: path, options: .atomic)
        try fm.setAttributes([.posixPermissions: 0o600], ofItemAtPath: path.path)
        return ["valid": true, "subject": value.subject, "role": value.role, "capabilities": licenseCapabilities(value)]
    }
}
