import Foundation
import Security
import IOKit

/// Only explicit device-request creation may create a Keychain item. The provider
/// is injected in tests; construction alone does not read hardware or credentials.
protocol OracleLicenseDeviceProviding {
    func identifier(create: Bool) throws -> String
}

enum OracleDeviceBinding {
    static let prefix = "ORACLE-MAC2-"
    static func valid(_ value: String) -> Bool {
        value.hasPrefix(prefix) && value.utf8.count == prefix.utf8.count + 64 &&
        value.dropFirst(prefix.count).allSatisfy { "0123456789abcdef".contains($0) }
    }
    static func identifier(platformUUID: String, secret: Data) throws -> String {
        guard let uuid = UUID(uuidString: platformUUID), secret.count == 32 else {
            throw failure("Não foi possível verificar o vínculo deste Mac. Nenhuma licença foi substituída.")
        }
        return prefix + digest(Data("Oracle/mac-license/v2\u{0}".utf8) +
            Data(uuid.uuidString.lowercased().utf8) + Data([0]) + secret)
    }
}

/// Binds signed access to this hardware AND a non-synchronizing local Keychain
/// secret. Not Secure Enclave attestation, remote revocation or anti-root DRM.
final class OracleMacLicenseDevice: OracleLicenseDeviceProviding {
    private func query() -> [String: Any] {
        [kSecClass as String: kSecClassGenericPassword,
         kSecAttrService as String: "com.oraclecompanion.license.device-v2",
         kSecAttrAccount as String: "local-device-secret",
         kSecUseDataProtectionKeychain as String: true,
         kSecAttrSynchronizable as String: false]
    }
    private func existingSecret() throws -> Data? {
        var request = query()
        request[kSecReturnData as String] = true
        request[kSecMatchLimit as String] = kSecMatchLimitOne
        request[kSecUseAuthenticationUI as String] = kSecUseAuthenticationUIFail
        var item: CFTypeRef?
        let result = SecItemCopyMatching(request as CFDictionary, &item)
        if result == errSecItemNotFound { return nil }
        guard result == errSecSuccess, let data = item as? Data, data.count == 32 else {
            throw failure("O Chaves do macOS está indisponível. Desbloqueie sua sessão; os documentos permanecem intactos.")
        }
        return data
    }
    private func platformUUID() throws -> String {
        let service = IOServiceGetMatchingService(kIOMainPortDefault, IOServiceMatching("IOPlatformExpertDevice"))
        guard service != 0 else { throw failure("O identificador deste Mac não está disponível.") }
        defer { IOObjectRelease(service) }
        guard let property = IORegistryEntryCreateCFProperty(service, kIOPlatformUUIDKey as CFString, kCFAllocatorDefault, 0),
              let value = property.takeRetainedValue() as? String, UUID(uuidString: value) != nil else {
            throw failure("Não foi possível verificar o identificador deste Mac.")
        }
        return value
    }
    func identifier(create: Bool) throws -> String {
        // A self-test must supply a fake provider; never touch the real device.
        guard !CommandLine.arguments.contains(where: { $0.hasPrefix("--self-test") }) else {
            throw failure("Testes exigem um provedor de dispositivo sintético.")
        }
        let hardware = try platformUUID()
        if let data = try existingSecret() {
            return try OracleDeviceBinding.identifier(platformUUID: hardware, secret: data)
        }
        guard create else { throw failure("Gere o pedido de acesso deste Mac; códigos de outra instalação não são reaproveitados.") }
        var bytes = [UInt8](repeating: 0, count: 32)
        guard SecRandomCopyBytes(kSecRandomDefault, bytes.count, &bytes) == errSecSuccess else {
            throw failure("Não foi possível preparar o pedido de acesso.")
        }
        var item = query()
        item[kSecValueData as String] = Data(bytes)
        item[kSecAttrAccessible as String] = kSecAttrAccessibleWhenUnlockedThisDeviceOnly
        item[kSecAttrLabel as String] = "Oracle — vínculo local de acesso"
        let result = SecItemAdd(item as CFDictionary, nil)
        guard result == errSecSuccess || result == errSecDuplicateItem else {
            throw failure("O macOS não permitiu guardar o vínculo local. Nenhuma licença foi alterada.")
        }
        // Read the winning item if another process created it concurrently.
        guard let data = try existingSecret() else { throw failure("Vínculo não confirmado no Chaves do macOS.") }
        return try OracleDeviceBinding.identifier(platformUUID: hardware, secret: data)
    }
}
