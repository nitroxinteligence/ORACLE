import Foundation
import CryptoKit
import Security

/// Injection exists only in native tests. No environment/config/UI switch selects a software key.
protocol OracleDeviceIdentity {
    var publicKey: Data { get }
    func sign(_ bytes: Data) throws -> Data
}
extension OracleDeviceIdentity {
    var fingerprint: String { digest(publicKey) }
    func provePossession() throws {
        var nonce = Data(count: 32)
        let result = nonce.withUnsafeMutableBytes { SecRandomCopyBytes(kSecRandomDefault, 32, $0.baseAddress!) }
        guard result == errSecSuccess else { throw failure("Não foi possível verificar a identidade deste Mac.") }
        let challenge = Data("ORACLE-DEVICE-PROOF2.".utf8) + nonce
        let key = try P256.Signing.PublicKey(x963Representation: publicKey)
        guard key.isValidSignature(try P256.Signing.ECDSASignature(rawRepresentation: sign(challenge)), for: challenge) else {
            throw failure("A chave privada deste Mac não confirmou a licença.")
        }
    }
}

/// CryptoKit's dataRepresentation is an encrypted enclave key reference, NOT an exportable key.
/// It is additionally held in a non-synchronizing, ThisDeviceOnly Keychain item, outside profiles.
struct SecureEnclaveDeviceIdentity: OracleDeviceIdentity {
    private let key: SecureEnclave.P256.Signing.PrivateKey
    var publicKey: Data { key.publicKey.x963Representation }
    func sign(_ bytes: Data) throws -> Data { try key.signature(for: bytes).rawRepresentation }
    static let service = "com.oracle.companion.device-identity.v2"
    private static let lock = NSLock()

    static func load(create: Bool = false) throws -> SecureEnclaveDeviceIdentity {
        lock.lock(); defer { lock.unlock() }
        guard SecureEnclave.isAvailable else {
            throw failure("Este Mac não oferece Secure Enclave compatível. A ativação vinculada ao aparelho não é suportada; nenhum identificador copiável será usado.")
        }
        let query: [String: Any] = [kSecClass as String: kSecClassGenericPassword,
            kSecAttrService as String: service, kSecAttrAccount as String: "primary",
            kSecAttrSynchronizable as String: false, kSecUseDataProtectionKeychain as String: true]
        var read = query; read[kSecReturnData as String] = true; read[kSecMatchLimit as String] = kSecMatchLimitOne
        var item: CFTypeRef?
        let status = SecItemCopyMatching(read as CFDictionary, &item)
        if status == errSecSuccess, let blob = item as? Data {
            // A broken/unavailable existing key is never silently replaced.
            do { return SecureEnclaveDeviceIdentity(key: try .init(dataRepresentation: blob)) }
            catch { throw failure("A identidade protegida deste Mac está indisponível. Preserve o perfil e solicite recuperação ao proprietário.") }
        }
        guard status == errSecItemNotFound else { throw failure("Não foi possível abrir a identidade protegida no Chaves (\(status)).") }
        guard create else { throw failure("Gere a solicitação de ativação neste Mac primeiro.") }
        var error: Unmanaged<CFError>?
        guard let access = SecAccessControlCreateWithFlags(nil, kSecAttrAccessibleAfterFirstUnlockThisDeviceOnly, .privateKeyUsage, &error) else {
            throw failure("Não foi possível proteger a chave do aparelho.")
        }
        let key = try SecureEnclave.P256.Signing.PrivateKey(accessControl: access)
        var add = query
        add[kSecAttrAccessible as String] = kSecAttrAccessibleAfterFirstUnlockThisDeviceOnly
        add[kSecValueData as String] = key.dataRepresentation
        let added = SecItemAdd(add as CFDictionary, nil)
        guard added == errSecSuccess else { throw failure("A identidade não foi salva no Chaves (\(added)); nenhuma licença foi ativada.") }
        return SecureEnclaveDeviceIdentity(key: key)
    }
}
