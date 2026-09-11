import Foundation

/// Pure policy. A transient network failure must not erase a known update.
enum OracleUpdateLedger {
    static let terminal = Set(["current", "updated", "external", "not_adopted", "not_configured", "rolled_back"])
    static let pending = Set(["available", "compatibility_required", "upstream_available"])
    static func reconcile(previous: [[String: Any]], results: [[String: Any]]) -> [[String: Any]] {
        var known = [String: [String: Any]]()
        for row in previous {
            guard let id = row["id"] as? String, pending.contains(row["status"] as? String ?? "") else { continue }
            known[id] = row
        }
        for row in results {
            guard let id = row["id"] as? String, let status = row["status"] as? String else { continue }
            if pending.contains(status) {
                var value = row; value.removeValue(forKey: "recheckError"); known[id] = value
            } else if terminal.contains(status) || status == "preserved_edits" {
                known.removeValue(forKey: id)
            } else if status == "error", var value = known[id] {
                value["recheckError"] = row["message"] as? String ?? "Não foi possível verificar novamente."
                known[id] = value
            }
        }
        return known.keys.sorted().compactMap { known[$0] }
    }
    static func installable(_ rows: [[String: Any]]) -> Bool { rows.contains { $0["status"] as? String == "available" } }
    static func hasNews(_ rows: [[String: Any]]) -> Bool { rows.contains { pending.contains($0["status"] as? String ?? "") } }
}
