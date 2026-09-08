import Foundation

extension Core {
    func discoveredCollections(_ entries: [[String:Any]]) -> [[String:String]] {
        var rows=collections.map{["id":$0.0,"name":$0.1,"icon":$0.2]}
        var known=Set(collections.map{$0.0}),extra=Set<String>()
        for entry in entries where entry["directory"] as? Bool != true && entry["name"] as? String == "SKILL.md" {
            let parts=(entry["path"] as? String ?? "").split(separator:"/").map(String.init)
            if parts.count>=4,parts[0]=="SISTEMA",parts[1]=="skills",!known.contains(parts[2]) {extra.insert(parts[2])}
        }
        for id in extra.sorted() {known.insert(id);rows.append(["id":id,"name":id.replacingOccurrences(of:"-",with:" ").replacingOccurrences(of:"_",with:" ").capitalized,"icon":"tool"])}
        return rows
    }

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
