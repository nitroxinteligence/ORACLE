#!/usr/bin/env swift
// OWNER TOOL ONLY. Never copy this source, signing keys or its ledger into the application.
import Foundation
import CryptoKit
import Darwin

let fm = FileManager.default
func fail(_ message: String) -> NSError { NSError(domain: "OracleIssuer", code: 1, userInfo: [NSLocalizedDescriptionKey: message]) }
func b64(_ d: Data) -> String { d.base64EncodedString().replacingOccurrences(of: "+", with: "-").replacingOccurrences(of: "/", with: "_").replacingOccurrences(of: "=", with: "") }
func unb64(_ text: String) -> Data? {
    guard !text.isEmpty, text.count < 8192, text.allSatisfy({ $0.isASCII && ($0.isLetter || $0.isNumber || $0 == "-" || $0 == "_") }) else { return nil }
    guard let data = Data(base64Encoded: text.replacingOccurrences(of: "-", with: "+").replacingOccurrences(of: "_", with: "/") + String(repeating: "=", count: (4-text.count%4)%4)), b64(data) == text else { return nil }; return data
}
func hash(_ d: Data) -> String { SHA256.hash(data: d).map { String(format: "%02x", $0) }.joined() }
func json(_ value: Any) throws -> Data { try JSONSerialization.data(withJSONObject: value, options: [.sortedKeys, .withoutEscapingSlashes]) }
func privateFile(_ path: URL) throws -> Data {
    let fd = open(path.path, O_RDONLY | O_NOFOLLOW)
    guard fd >= 0 else { throw fail("Não foi possível abrir o arquivo privado.") }
    let handle = FileHandle(fileDescriptor: fd, closeOnDealloc: true); defer { try? handle.close() }
    var s = stat(); guard fstat(fd, &s) == 0, (s.st_mode & S_IFMT) == S_IFREG, s.st_uid == getuid(), s.st_mode & 0o077 == 0, s.st_size < 16_000_000 else { throw fail("Arquivo privado deve ser regular, do proprietário e chmod 600.") }
    return try handle.readToEnd() ?? Data()
}
func durableWrite(_ data: Data, to path: URL) throws {
    let temporary = path.deletingLastPathComponent().appendingPathComponent(".commit-" + UUID().uuidString)
    let fd = open(temporary.path, O_WRONLY | O_CREAT | O_EXCL | O_NOFOLLOW, S_IRUSR | S_IWUSR)
    guard fd >= 0 else { throw fail("Não foi possível preparar o registro durável.") }
    let handle = FileHandle(fileDescriptor: fd, closeOnDealloc: true)
    defer { try? handle.close(); try? fm.removeItem(at: temporary) }
    try handle.write(contentsOf: data)
    guard fsync(fd) == 0 else { throw fail("Falha ao sincronizar o registro; nenhuma resposta foi entregue.") }
    try handle.close()
    guard rename(temporary.path, path.path) == 0 else { throw fail("Falha ao confirmar o registro.") }
    let dir = open(path.deletingLastPathComponent().path, O_RDONLY | O_DIRECTORY | O_NOFOLLOW)
    guard dir >= 0 else { throw fail("Não foi possível confirmar a pasta do registro.") }
    defer { close(dir) }
    guard fsync(dir) == 0 else { throw fail("Falha de durabilidade. Repita a mesma solicitação; não emita outro convite.") }
}
struct Request: Decodable {
    let version: Int, product: String, invitation: String, requestID: String, deviceID: String, devicePublicKey: String, keyProtection: String, createdAt: Int64
}
func decodeRequest(_ code: String) throws -> Request {
    let p = code.trimmingCharacters(in: .whitespacesAndNewlines).split(separator: ".", omittingEmptySubsequences: false)
    guard code.utf8.count <= 8192, p.count == 3, p[0] == "ORACLEREQ2", let bytes = unb64(String(p[1])), bytes.count < 4096,
        let signature = unb64(String(p[2])), signature.count == 64, let request = try? JSONDecoder().decode(Request.self, from: bytes),
        request.version == 2, request.product == "oracle-macos", request.createdAt >= 0, UUID(uuidString: request.requestID) != nil,
        request.keyProtection == "secure-enclave-p256", let pub = unb64(request.devicePublicKey), hash(pub) == request.deviceID,
        let key = try? P256.Signing.PublicKey(x963Representation: pub), let sig = try? P256.Signing.ECDSASignature(rawRepresentation: signature),
        key.isValidSignature(sig, for: Data("ORACLEREQ2.".utf8) + bytes) else { throw fail("Solicitação inválida, adulterada ou sem prova de posse.") }
    let token = request.invitation.split(separator: ".", omittingEmptySubsequences: false)
    guard token.count == 2, token[0] == "ORACLEINV2", unb64(String(token[1]))?.count == 32 else { throw fail("Convite inválido.") }
    return request
}
final class OfflineIssuerLedger {
    let directory: URL, key: Curve25519.Signing.PrivateKey
    let keyID: String
    // Failure injection is used ONLY by --self-test with an ephemeral signer.
    var beforeCommit: (() throws -> Void)?, afterCommit: (() throws -> Void)?
    init(directory: URL, key: Curve25519.Signing.PrivateKey) {
        self.directory = directory; self.key = key; keyID = String(hash(key.publicKey.rawRepresentation).prefix(16))
    }
    func transaction<T>(_ mutation: (inout [String: Any]) throws -> T) throws -> T {
        let lockPath = directory.appendingPathComponent("ledger.lock")
        let fd = open(lockPath.path, O_RDWR | O_CREAT | O_NOFOLLOW, S_IRUSR | S_IWUSR)
        guard fd >= 0 else { throw fail("Registro indisponível.") }
        defer { flock(fd, LOCK_UN); close(fd) }
        var s = stat(); guard fstat(fd, &s) == 0, (s.st_mode & S_IFMT) == S_IFREG, s.st_uid == getuid(), s.st_mode & 0o077 == 0 else { throw fail("Lock do emissor inseguro.") }
        guard flock(fd, LOCK_EX | LOCK_NB) == 0 else { throw fail("Outro emissor está usando este registro. Repita depois; não crie um segundo registro.") }
        let path = directory.appendingPathComponent("ledger.json")
        guard let decoded = try JSONSerialization.jsonObject(with: privateFile(path)) as? [String: Any], decoded["version"] as? Int == 2,
            decoded["issuerKeyID"] as? String == keyID, decoded["invitations"] is [String: Any] else { throw fail("Registro incompatível ou corrompido; não foi reinicializado.") }
        var ledger = decoded
        let result = try mutation(&ledger)
        try beforeCommit?()
        try durableWrite(json(ledger), to: path)
        try afterCommit?()
        return result // Never expose invitation/response before the authoritative ledger is durable.
    }
    func invite(subject: String, role: String = "student") throws -> String {
        guard !subject.trimmingCharacters(in: .whitespacesAndNewlines).isEmpty, subject.count <= 160, ["student", "owner"].contains(role) else { throw fail("Nome ou papel inválido.") }
        let random = SymmetricKey(size: .bits256).withUnsafeBytes { Data($0) }
        let invitation = "ORACLEINV2." + b64(random), invitationID = hash(Data(invitation.utf8))
        return try transaction { ledger in
            var invitations = ledger["invitations"] as! [String: Any]
            guard invitations[invitationID] == nil else { throw fail("Colisão de convite; tente novamente.") }
            invitations[invitationID] = ["subject": subject, "role": role, "state": "unused", "createdAt": Int64(Date().timeIntervalSince1970)]
            ledger["invitations"] = invitations; return invitation
        }
    }
    func issue(_ code: String) throws -> String {
        let request = try decodeRequest(code), invitationID = hash(Data(request.invitation.utf8))
        return try transaction { ledger in
            var invitations = ledger["invitations"] as! [String: Any]
            guard var invitation = invitations[invitationID] as? [String: Any], let subject = invitation["subject"] as? String,
                let role = invitation["role"] as? String, ["student", "owner"].contains(role) else { throw fail("Convite não registrado neste emissor.") }
            if invitation["state"] as? String == "consumed" {
                guard invitation["deviceID"] as? String == request.deviceID, invitation["devicePublicKey"] as? String == request.devicePublicKey,
                    let response = invitation["response"] as? String else { throw fail("Convite já consumido por outro Mac. Nenhuma segunda licença foi emitida.") }
                let p = response.split(separator: ".", omittingEmptySubsequences: false)
                guard p.count == 3, p[0] == "ORACLE2", let bytes = unb64(String(p[1])), let sig = unb64(String(p[2])), key.publicKey.isValidSignature(sig, for: Data("ORACLE2.".utf8) + bytes) else { throw fail("Resposta arquivada corrompida. Recupere o registro do proprietário.") }
                return response // Same physical key: exact idempotent response, including after request regeneration.
            }
            guard invitation["state"] as? String == "unused" else { throw fail("Estado do convite inválido.") }
            let payload: [String: Any] = ["version": 2, "product": "oracle-macos", "keyID": keyID, "licenseID": UUID().uuidString,
                "subject": subject, "role": role, "issuedAt": Int64(Date().timeIntervalSince1970), "deviceID": request.deviceID,
                "devicePublicKey": request.devicePublicKey, "invitationID": invitationID, "requestID": request.requestID]
            let bytes = try json(payload), signature = try key.signature(for: Data("ORACLE2.".utf8) + bytes)
            let response = "ORACLE2." + b64(bytes) + "." + b64(signature)
            invitation["state"] = "consumed"; invitation["deviceID"] = request.deviceID; invitation["devicePublicKey"] = request.devicePublicKey
            invitation["response"] = response; invitation["requestID"] = request.requestID; invitation["issuedAt"] = payload["issuedAt"]
            invitations[invitationID] = invitation; ledger["invitations"] = invitations
            return response
        }
    }
}

func selfTest(_ root: URL) throws {
    guard root.standardizedFileURL.path.split(separator: "/").contains(".work"), root.standardizedFileURL.path == root.resolvingSymlinksInPath().path else { throw fail("Testes exigem --work-root dentro de .work, sem symlink.") }
    let dir = root.appendingPathComponent("issuer-fixture-" + UUID().uuidString)
    try fm.createDirectory(at: dir, withIntermediateDirectories: true, attributes: [.posixPermissions: 0o700]); defer { try? fm.removeItem(at: dir) }
    let signer = Curve25519.Signing.PrivateKey(), device = P256.Signing.PrivateKey(), other = P256.Signing.PrivateKey()
    let issuer = OfflineIssuerLedger(directory: dir, key: signer)
    try durableWrite(json(["version": 2, "issuerKeyID": issuer.keyID, "invitations": [String: Any]()]), to: dir.appendingPathComponent("ledger.json"))
    var checks = 0
    func check(_ condition: Bool, _ label: String) throws { guard condition else { throw fail("FAIL " + label) }; checks += 1; print("PASS " + label) }
    func rejects(_ label: String, _ operation: () throws -> Void) throws { var rejected = false; do { try operation() } catch { rejected = true }; try check(rejected, label) }
    func request(_ invitation: String, _ key: P256.Signing.PrivateKey) throws -> String {
        let bytes = try json(["version": 2, "product": "oracle-macos", "invitation": invitation, "requestID": UUID().uuidString,
            "deviceID": hash(key.publicKey.x963Representation), "devicePublicKey": b64(key.publicKey.x963Representation), "keyProtection": "secure-enclave-p256", "createdAt": 1])
        return "ORACLEREQ2." + b64(bytes) + "." + b64(try key.signature(for: Data("ORACLEREQ2.".utf8) + bytes).rawRepresentation)
    }
    let invite = try issuer.invite(subject: "Synthetic student"), req = try request(invite, device), response = try issuer.issue(req)
    try check(try issuer.issue(req) == response, "same request returns exact response")
    try check(try OfflineIssuerLedger(directory: dir, key: signer).issue(request(invite, device)) == response, "durable reopen/recreated request is idempotent")
    try rejects("second device cannot consume invitation") { _ = try issuer.issue(request(invite, other)) }
    try rejects("unknown invitation rejected") { _ = try issuer.issue(request("ORACLEINV2." + b64(Data(repeating: 8, count: 32)), device)) }
    try rejects("tampered proof rejected") { _ = try issuer.issue(req + "A") }
    let raw = unb64(String(response.split(separator: ".")[1]))!, payload = try JSONSerialization.jsonObject(with: raw) as! [String: Any]
    try check(payload["expiresAt"] == nil && payload["role"] as? String == "student", "permanent student capability comes from owner ledger")
    let ownerInvitation = try issuer.invite(subject: "Synthetic owner", role: "owner")
    let ownerResponse = try issuer.issue(request(ownerInvitation, device))
    let ownerPayload = try JSONSerialization.jsonObject(with: unb64(String(ownerResponse.split(separator: ".")[1]))!) as! [String: Any]
    try check(ownerPayload["role"] as? String == "owner", "owner role requires explicit owner invitation")
    let retryInvite = try issuer.invite(subject: "Synthetic crash"), retryRequest = try request(retryInvite, device)
    issuer.beforeCommit = { throw fail("fixture before commit") }
    try rejects("pre-commit failure never delivers response") { _ = try issuer.issue(retryRequest) }
    issuer.beforeCommit = nil; issuer.afterCommit = { throw fail("fixture after commit") }
    try rejects("post-commit failure never delivers response") { _ = try issuer.issue(retryRequest) }
    issuer.afterCommit = nil
    let retryResponse = try issuer.issue(retryRequest)
    try check(try issuer.issue(retryRequest) == retryResponse, "response recovered after durable commit/transport loss")
    try rejects("failed response cannot free invitation for second device") { _ = try issuer.issue(request(retryInvite, other)) }
    let data = try privateFile(dir.appendingPathComponent("ledger.json"))
    try check(!String(decoding: data, as: UTF8.self).contains(invite), "ledger stores invitation digest, not bearer token")
    try check(!fm.fileExists(atPath: dir.appendingPathComponent("ed25519-private.key").path), "fixture signer is never persisted")
    print("Offline issuer: \(checks) checks passed; no real key, invitation or license issued.")
}

let args = Array(CommandLine.arguments.dropFirst())
func option(_ name: String) -> String? { guard let i = args.firstIndex(of: name), i+1 < args.count else { return nil }; return args[i+1] }
let command = args.first ?? "help"
do {
    if command == "--self-test" {
        guard let path = option("--work-root") else { throw fail("Use --self-test --work-root /caminho/.work/native-access-tests") }
        try selfTest(URL(fileURLWithPath: path).standardizedFileURL)
    } else if ["init", "invite", "issue", "export-public"].contains(command) {
        guard let directory = option("--issuer-dir"), directory.hasPrefix("/") else { throw fail("Informe --issuer-dir /pasta/privada explicitamente; nenhum emissor padrão será acessado.") }
        let issuer = URL(fileURLWithPath: directory).standardizedFileURL
        let repository = URL(fileURLWithPath: #filePath).deletingLastPathComponent().deletingLastPathComponent().deletingLastPathComponent().resolvingSymlinksInPath()
        guard issuer.path == issuer.resolvingSymlinksInPath().path, issuer.path != repository.path, !issuer.path.hasPrefix(repository.path + "/") else { throw fail("Emissor real deve ficar fora do repositório, sem symlinks.") }
        let allowed = command == "invite" ? ["--issuer-dir", "--to", "--role"] : command == "issue" ? ["--issuer-dir", "--request-file"] : ["--issuer-dir"]
        var i = 1, seen = Set<String>()
        while i < args.count { guard allowed.contains(args[i]), i+1 < args.count, seen.insert(args[i]).inserted else { throw fail("Opção inválida ou duplicada: " + args[i]) }; i += 2 }
        let keyFile = issuer.appendingPathComponent("ed25519-private.key")
        if command == "init" {
            guard !fm.fileExists(atPath: issuer.path) else { throw fail("A pasta do emissor já existe; não inicializei outro registro nem substituí chaves.") }
            try fm.createDirectory(at: issuer, withIntermediateDirectories: false, attributes: [.posixPermissions: 0o700])
            let key = Curve25519.Signing.PrivateKey()
            try durableWrite(key.rawRepresentation, to: keyFile)
            let keyID = String(hash(key.publicKey.rawRepresentation).prefix(16))
            try durableWrite(json(["version": 2, "issuerKeyID": keyID, "invitations": [String: Any]()]), to: issuer.appendingPathComponent("ledger.json"))
            print("Emissor inicializado. Mantenha uma única cópia ativa do registro e faça backup privado; nunca empacote esta pasta.")
        } else {
            let attrs = try fm.attributesOfItem(atPath: issuer.path)
            guard attrs[.type] as? FileAttributeType == .typeDirectory, (attrs[.ownerAccountID] as? NSNumber)?.uint32Value == getuid(), ((attrs[.posixPermissions] as? NSNumber)?.intValue ?? 0) & 0o077 == 0 else { throw fail("Pasta do emissor deve ser privada, do proprietário e chmod 700.") }
            let key = try Curve25519.Signing.PrivateKey(rawRepresentation: privateFile(keyFile)), ledger = OfflineIssuerLedger(directory: issuer, key: key)
            switch command {
            case "export-public": print(String(decoding: try json(["version": 1, "keys": [ledger.keyID: key.publicKey.rawRepresentation.base64EncodedString()]]), as: UTF8.self))
            case "invite": guard let subject = option("--to") else { throw fail("Use invite --to 'Pessoa' [--role student|owner].") }; print(try ledger.invite(subject: subject, role: option("--role") ?? "student"))
            default:
                guard let path = option("--request-file") else { throw fail("Use issue --request-file solicitacao.txt. Convite e chave do Mac são obrigatórios.") }
                let url = URL(fileURLWithPath: path)
                guard (try url.resourceValues(forKeys: [.fileSizeKey]).fileSize ?? Int.max) <= 8192 else { throw fail("Solicitação maior que o limite.") }
                print(try ledger.issue(String(contentsOf: url, encoding: .utf8)))
            }
        }
    } else {
        print("oracle-license init|export-public|invite --to 'Pessoa' [--role student|owner]|issue --request-file solicitacao.txt\nTodos exigem --issuer-dir /pasta/privada fora do repositório. Licença permanente, um Mac por convite. Nenhuma revogação remota offline.\nTestes: --self-test --work-root /projeto/.work/native-access-tests")
    }
} catch { fputs(error.localizedDescription + "\n", stderr); exit(1) }
