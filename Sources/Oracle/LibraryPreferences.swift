import Foundation

extension Core {
    func saveDepartmentAssignments(_ assignments:[String:String]) throws -> [String:Any] {
        try requireCapability(.configure)
        let allowed:Set<String>=["code","design","marketing","sales","research","content","unassigned"]
        guard assignments.count<=128,assignments.keys.allSatisfy({$0.utf8.count<=128 && !$0.isEmpty && !$0.contains("/")}),assignments.values.allSatisfy({allowed.contains($0)}) else {
            throw failure("Organização de departamentos inválida.")
        }
        refreshConfig();config["departmentAssignments"]=assignments;try persist();return ["saved":true]
    }
    func saveLibraryRoot(library:String, path:String) throws -> [String:Any] {
        try requireCapability(.configure)
        let expected:[String:String] = ["prompt":"SISTEMA/prompts", "tutorial":"SISTEMA/Tutoriais"]
        guard let canonical=expected[library],path.split(separator:"/").count==2,
              path.precomposedStringWithCanonicalMapping.lowercased()==canonical.lowercased() else {
            throw failure("Pasta fora do escopo desta biblioteca.")
        }
        let root=try vault(),selected=try scoped(path,root:root)
        guard (try selected.resourceValues(forKeys:[.isDirectoryKey])).isDirectory==true else {
            throw failure("A pasta escolhida não está disponível no vault autorizado.")
        }
        refreshConfig()
        var choices=config["libraryRoots"] as? [String:String] ?? [:]
        choices[library]=path;config["libraryRoots"]=choices;try persist()
        return ["library":library,"path":path]
    }
    func saveVisualPreferences(_ value:[String:Any]) throws -> [String:Any] {
        try requireCapability(.configure)
        let allowed:Set<String>=["reduceMotion","reduceTransparency","economy"]
        guard Set(value.keys).isSubset(of:allowed),value.values.allSatisfy({$0 is Bool}) else {
            throw failure("Preferências visuais inválidas.")
        }
        refreshConfig();var preferences=config["visualPreferences"] as? [String:Any] ?? [:]
        for(key,value) in value {preferences[key]=value}
        config["visualPreferences"]=preferences;try persist();return preferences
    }
}
