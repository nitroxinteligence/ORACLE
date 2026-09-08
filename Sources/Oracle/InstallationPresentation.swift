import Foundation

extension Core {
    /// Saved before installation. Current files are never assumed to be preexisting after a restart.
    func installationBaselinePaths() -> [String] {
        guard let plan=try? readJSON(home.appendingPathComponent("setup/plan.json")),
              plan["vault"] as? String==config["vault"] as? String,
              let id=plan["id"] as? String,UUID(uuidString:id) != nil,
              let data=try? Data(contentsOf:home.appendingPathComponent("setup/\(id).baseline.json")),
              let rows=(try? JSONSerialization.jsonObject(with:data)) as? [[String:Any]] else {return []}
        return rows.compactMap{$0["path"] as? String}
    }
}
