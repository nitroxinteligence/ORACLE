import Foundation

extension Core {
    /// Receipts make new documents immediately reachable while the background
    /// scanner is still catching up. Only existing verified entry files appear.
    func installationEntries(_ cached:[[String:Any]]) throws -> [[String:Any]] {
        guard let root=try? vault() else{return cached}
        var entries=Dictionary(uniqueKeysWithValues:cached.compactMap{row -> (String,[String:Any])? in guard let path=row["path"] as? String else{return nil};return(path,row)})
        for item in try memoryOnlyProgress() {
            guard let path=item["path"] as? String,entries[path]==nil,let file=try? scoped(path,root:root),
                  let values=try? file.resourceValues(forKeys:[.isRegularFileKey,.fileSizeKey,.contentModificationDateKey]),values.isRegularFile==true else{continue}
            entries[path]=["path":path,"name":file.lastPathComponent,"directory":false,"size":values.fileSize ?? 0,"modified":values.contentModificationDate?.timeIntervalSince1970 ?? 0,"source":root.path]
            var parts=path.split(separator:"/").map(String.init);parts.removeLast()
            while !parts.isEmpty {let parent=parts.joined(separator:"/");if entries[parent]==nil{entries[parent]=["path":parent,"name":parts.last!,"directory":true,"size":0,"modified":0,"source":root.path]};parts.removeLast()}
        }
        return entries.values.sorted{($0["path"] as? String ?? "")<($1["path"] as? String ?? "")}
    }
    func memoryOnlyProgress() throws -> [[String:Any]] {
        let state=onboardingRecord()
        guard let id=state["runID"] as? String,UUID(uuidString:id) != nil else{return []}
        var result:[[String:Any]]=state["localStarted"] as? Bool==true ? [["id":"sol","kind":"core","label":"Oracle","evidence":"native installation started"]]:[]
        guard let plan=try? readJSON(home.appendingPathComponent("setup/plan.json")),plan["id"] as? String==id,plan["vault"] as? String==config["vault"] as? String,
              let progress=try? readJSON(home.appendingPathComponent("onboarding/installations/"+id+"/progress.json")),progress["plan_hash"] as? String==plan["plan_hash"] as? String else{return result}
        let items=progress["items"] as? [String:[String:Any]] ?? [:]
        for item in items.values.sorted(by:{($0["sequence"] as? Int ?? 0)<($1["sequence"] as? Int ?? 0)}) {
            guard item["plan_hash"] as? String==plan["plan_hash"] as? String,item["install_id"] as? String==id,item["generation"] as? String==plan["distribution_sha256"] as? String else{continue}
            guard let itemID=item["item_id"] as? String,itemID != "sol",let kind=item["kind"] as? String else{continue}
            var row:[String:Any]=["id":itemID,"kind":kind,"label":item["name"] ?? itemID,"evidence":"persisted verified installation event","sequence":item["sequence"] ?? 0]
            if let entry=item["entry"] as? String {row["path"]=try distributionRelativePath(entry,plan:plan)}
            row["department_id"]=item["department_id"];row["specialist_id"]=item["specialist_id"]
            result.append(row)
        }
        return result
    }
    func distributionDepartmentAssignments() -> [String:String] {
        var assignments=[String:String]()
        for row in (try? memoryOnlyProgress()) ?? [] where row["kind"] as? String=="skill" {
            if let specialist=row["specialist_id"] as? String,let department=row["department_id"] as? String {assignments[specialist]=department}
        }
        return assignments
    }
    func discoveredCollections(_ entries: [[String:Any]]) -> [[String:String]] {
        var rows=collections.map{["id":$0.0,"name":$0.1,"icon":$0.2]}
        var known=Set(collections.map{$0.0}),extra=Set<String>()
        for entry in entries where entry["directory"] as? Bool != true && entry["name"] as? String == "SKILL.md" {
            let parts=(entry["path"] as? String ?? "").split(separator:"/").map(String.init)
            let library=(config["libraryRoots"] as? [String:String])?["skills"] ?? "SISTEMA/skills"
            let index=parts.count>3 && Core.skillDepartmentFolders.values.contains(parts[2]) ? 3:2
            if parts.count>index+1,parts.prefix(2).joined(separator:"/")==library,!known.contains(parts[index]) {extra.insert(parts[index])}
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
