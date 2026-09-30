import Foundation
import Darwin

enum OracleApplicationUpdatePhase: String, Codable { case prepared, launched, healthy, rolledBack }

struct OracleApplicationUpdateJournal: Codable {
    let schemaVersion: Int
    let token: String
    let version: String
    let previousVersion: String
    let current: String
    let original: String
    let replacement: String
    let backup: String
    var phase: OracleApplicationUpdatePhase
    var launchPID: Int32?
    var changedAt: String

    var target: URL { URL(fileURLWithPath: current) }
    var backupURL: URL { URL(fileURLWithPath: backup) }
    var replacementURL: URL { URL(fileURLWithPath: replacement) }
    var failedURL: URL { target.deletingLastPathComponent().appendingPathComponent(".Oracle.failed-" + token + ".app") }
}

struct OracleApplicationUpdateLaunch {
    let token: String
    let phase: OracleApplicationUpdatePhase
    let bundle: URL
    var rolledBack: Bool { phase == .rolledBack }
}

/// Small, bounded public journal. It never inspects login, hooks or onboarding completion.
enum OracleApplicationUpdateRecovery {
    private static let manager = FileManager.default
    private static func error(_ text: String) -> NSError {
        NSError(domain: "OracleApplicationUpdate", code: 1, userInfo: [NSLocalizedDescriptionKey: text])
    }
    static func version(at bundle: URL) -> String? {
        let file = bundle.appendingPathComponent("Contents/Info.plist")
        guard bundle.resolvingSymlinksInPath().path == bundle.standardizedFileURL.path,
              file.resolvingSymlinksInPath().path == file.standardizedFileURL.path,
              let size = try? file.resourceValues(forKeys: [.fileSizeKey]).fileSize, size <= 128_000,
              let data = try? Data(contentsOf: file),
              let info = try? PropertyListSerialization.propertyList(from: data, format: nil) as? [String: Any],
              info["CFBundleIdentifier"] as? String == "com.oraclecompanion.macos",
              info["CFBundleExecutable"] as? String == "Oracle",
              let version = info["CFBundleShortVersionString"] as? String,
              version.range(of: "^[0-9]+\\.[0-9]+\\.[0-9]+$", options: .regularExpression) != nil else { return nil }
        return version
    }
    static func read(_ receipt: URL) throws -> OracleApplicationUpdateJournal? {
        guard manager.fileExists(atPath: receipt.path) else { return nil }
        guard receipt.resolvingSymlinksInPath().path == receipt.standardizedFileURL.path,
              let size = try receipt.resourceValues(forKeys: [.fileSizeKey]).fileSize, size <= 16_384 else {
            throw error("O recibo de atualização precisa de revisão; a versão anterior foi preservada.")
        }
        let data = try Data(contentsOf: receipt)
        let record: OracleApplicationUpdateJournal
        if let current = try? JSONDecoder().decode(OracleApplicationUpdateJournal.self, from: data) { record = current }
        else if let legacy = try JSONSerialization.jsonObject(with: data) as? [String: Any],
                legacy["schema_version"] as? Int == 1, let current = legacy["current"] as? String,
                let replacement = legacy["replacement"] as? String, let backup = legacy["backup"] as? String,
                let expected = legacy["version"] as? String {
            let name = URL(fileURLWithPath: backup).deletingPathExtension().lastPathComponent
            let token = String(name.dropFirst(".Oracle.backup-".count))
            let previous = version(at: URL(fileURLWithPath: backup)) ?? version(at: URL(fileURLWithPath: current)) ?? ""
            record = OracleApplicationUpdateJournal(schemaVersion: 2, token: token, version: expected, previousVersion: previous,
                current: current, original: current, replacement: replacement, backup: backup, phase: .prepared,
                launchPID: nil, changedAt: ISO8601DateFormatter().string(from: Date()))
        } else { throw error("O recibo de atualização precisa de revisão; a versão anterior foi preservada.") }
        try validate(record)
        return record
    }
    static func write(_ record: OracleApplicationUpdateJournal, to receipt: URL) throws {
        try validate(record)
        guard receipt.resolvingSymlinksInPath().path == receipt.standardizedFileURL.path else { throw error("O caminho do recibo de atualização não é seguro.") }
        let data = try JSONEncoder().encode(record)
        guard data.count <= 16_384 else { throw error("O recibo de atualização excedeu o limite local.") }
        try data.write(to: receipt, options: .atomic)
        try manager.setAttributes([.posixPermissions: 0o600], ofItemAtPath: receipt.path)
    }
    private static func validate(_ record: OracleApplicationUpdateJournal) throws {
        guard record.schemaVersion == 2, UUID(uuidString: record.token)?.uuidString.lowercased() == record.token,
              [record.version,record.previousVersion].allSatisfy({$0.count<=32 && $0.range(of:"^[0-9]+\\.[0-9]+\\.[0-9]+$",options:.regularExpression) != nil}) else { throw error("O recibo de atualização não possui autoria reconhecida.") }
        let target = record.target, parent = target.deletingLastPathComponent()
        guard target.pathExtension == "app", target.path == target.standardizedFileURL.path,
              parent.resolvingSymlinksInPath().path == parent.path,
              record.original.hasPrefix("/"), record.original == URL(fileURLWithPath: record.original).standardizedFileURL.path,
              URL(fileURLWithPath: record.original).resolvingSymlinksInPath().path == record.original,
              target.resolvingSymlinksInPath().path == target.path,
              record.replacementURL.resolvingSymlinksInPath().path == record.replacement,
              record.backupURL.resolvingSymlinksInPath().path == record.backup,
              record.failedURL.resolvingSymlinksInPath().path == record.failedURL.path,
              record.replacement == parent.appendingPathComponent(".Oracle.update-" + record.token + ".app").path,
              record.backup == parent.appendingPathComponent(".Oracle.backup-" + record.token + ".app").path else {
            throw error("A atualização perdeu o vínculo com os caminhos preparados; os aplicativos foram preservados.")
        }
    }
    static func recoverAbandoned(receipt: URL, currentBundle: URL) throws {
        guard let record = try read(receipt), [record.current,record.original].contains(currentBundle.standardizedFileURL.path) else { return }
        // A matching version does not prove a healthy interface. Keep the backup and journal.
        if record.phase == .prepared && version(at: record.target) != record.version && !manager.fileExists(atPath: record.backup) {
            if manager.fileExists(atPath: record.replacement) { try manager.removeItem(at: record.replacementURL) }
            try manager.removeItem(at: receipt)
        }
        if record.phase == .prepared && record.original != record.current,
           currentBundle.standardizedFileURL.path == record.original && !manager.fileExists(atPath: record.current) {
            if manager.fileExists(atPath: record.replacement) { try manager.removeItem(at: record.replacementURL) }
            if manager.fileExists(atPath: record.backup), version(at: record.backupURL) == record.previousVersion { try manager.removeItem(at: record.backupURL) }
            if manager.fileExists(atPath: receipt.path) { try manager.removeItem(at: receipt) }
        }
    }
    static func beginLaunch(receipt: URL, currentBundle: URL, processID: Int32 = getpid()) throws -> OracleApplicationUpdateLaunch? {
        try recoverAbandoned(receipt: receipt, currentBundle: currentBundle)
        guard var record = try read(receipt), record.target.path == currentBundle.standardizedFileURL.path else { return nil }
        if record.phase == .healthy || record.phase == .rolledBack { return nil }
        guard version(at: record.target) == record.version else { return nil }
        if record.phase == .launched, let previous = record.launchPID, previous != processID, kill(previous, 0) != 0, errno == ESRCH {
            try rollback(receipt: receipt, token: record.token)
            return OracleApplicationUpdateLaunch(token: record.token, phase: .rolledBack, bundle: record.target)
        }
        if record.phase == .launched, let previous = record.launchPID, previous != processID { throw error("A atualização ainda está aberta em outro processo. Aguarde a verificação de saúde.") }
        guard version(at: record.backupURL) == record.previousVersion else { throw error("A versão anterior da atualização não está disponível para recuperação.") }
        record.phase = .launched; record.launchPID = processID; record.changedAt = ISO8601DateFormatter().string(from: Date())
        try write(record, to: receipt)
        return OracleApplicationUpdateLaunch(token: record.token, phase: record.phase, bundle: record.target)
    }
    static func confirmHealthy(receipt: URL, currentBundle: URL, token: String, interfaceReady: Bool, localStateReady: Bool, processID: Int32 = getpid()) throws -> Bool {
        guard interfaceReady, localStateReady, var record = try read(receipt), record.token == token,
              record.phase == .launched, record.launchPID == processID,
              record.target.path == currentBundle.standardizedFileURL.path,
              version(at: record.target) == record.version,
              version(at: record.backupURL) == record.previousVersion else { return false }
        record.phase = .healthy; record.changedAt = ISO8601DateFormatter().string(from: Date())
        let good = receipt.deletingLastPathComponent().appendingPathComponent("last-known-good.json")
        let previous = try read(good)
        // Publish health last, after recovery metadata is durably written.
        try write(record, to: good)
        try write(record, to: receipt)
        if let previous, previous.token != token, previous.current == record.current,
           previous.backup != record.backup, version(at: previous.backupURL) == previous.previousVersion {
            try? manager.removeItem(at: previous.backupURL)
        }
        return true
    }
    static func rollback(receipt: URL, token: String) throws {
        guard var record = try read(receipt), record.token == token,
              record.phase != .healthy, record.phase != .rolledBack,
              version(at: record.backupURL) == record.previousVersion else { throw error("A atualização não possui uma versão anterior válida para restaurar.") }
        if manager.fileExists(atPath: record.current) {
            guard version(at: record.target) == record.version, !manager.fileExists(atPath: record.failedURL.path) else { throw error("O destino mudou desde a atualização; a recuperação não substituirá esse aplicativo.") }
            try manager.moveItem(at: record.target, to: record.failedURL)
        }
        do { try manager.copyItem(at: record.backupURL, to: record.target) }
        catch { if manager.fileExists(atPath: record.failedURL.path) && !manager.fileExists(atPath: record.current) { try? manager.moveItem(at: record.failedURL, to: record.target) }; throw error }
        record.phase = .rolledBack; record.launchPID = nil; record.changedAt = ISO8601DateFormatter().string(from: Date())
        try write(record, to: receipt)
    }

    /// open -W remains alive until the launched app exits. A crash before health
    /// restores the previous app. A slow but live process is never killed or rolled back.
    static let helperScript = """
    pid="$1"; current="$2"; replacement="$3"; backup="$4"; receipt="$5"; token="$6"; original="$7"; launcher="$8"; limit="${9:-1800}"
    phase() { /usr/bin/plutil -extract phase raw -o - "$receipt" 2>/dev/null; }
    valid() {
      [ "$(/usr/bin/plutil -extract token raw -o - "$receipt" 2>/dev/null)" = "$token" ] &&
      [ "$(/usr/bin/plutil -extract current raw -o - "$receipt" 2>/dev/null)" = "$current" ] &&
      [ "$(/usr/bin/plutil -extract backup raw -o - "$receipt" 2>/dev/null)" = "$backup" ] &&
      [ "$(/usr/bin/plutil -extract replacement raw -o - "$receipt" 2>/dev/null)" = "$replacement" ]
    }
    count=0
    while /bin/kill -0 "$pid" 2>/dev/null && [ "$count" -lt 600 ]; do /bin/sleep 0.1; count=$((count+1)); done
    if /bin/kill -0 "$pid" 2>/dev/null; then exit 20; fi
    valid && [ "$(phase)" = prepared ] || exit 21
    [ -d "$replacement" ] && [ ! -L "$replacement" ] && [ ! -L "$current" ] && [ ! -L "$backup" ] || exit 22
    if [ -d "$current" ]; then
      [ ! -e "$backup" ] || exit 23
      /bin/mv "$current" "$backup" || exit 24
    else
      [ -d "$backup" ] || exit 23
    fi
    if ! /bin/mv "$replacement" "$current"; then
      /usr/bin/ditto "$backup" "$current" 2>/dev/null || true
      exit 25
    fi
    "$launcher" -n -W "$current" >/dev/null 2>&1 &
    opened=$!; count=0
    while :; do
      valid || exit 27
      [ "$(phase)" = healthy ] && exit 0
      if ! /bin/kill -0 "$opened" 2>/dev/null; then break; fi
      if [ "$count" -lt "$limit" ]; then /bin/sleep 0.1; count=$((count+1)); else /bin/sleep 1; fi
    done
    # A live, slow app is watched with lower frequency; it is never killed.
    valid && [ "$(phase)" != healthy ] || exit 0
    failed="${current%/*}/.Oracle.failed-${token}.app"
    [ ! -e "$failed" ] && [ -d "$backup" ] || exit 29
    /bin/mv "$current" "$failed" || exit 30
    if ! /usr/bin/ditto "$backup" "$current"; then /bin/mv "$failed" "$current" 2>/dev/null || true; exit 31; fi
    /usr/bin/plutil -replace phase -string rolledBack "$receipt" || exit 32
    "$launcher" -n "$current" >/dev/null 2>&1 || true
    exit 26
    """
}
