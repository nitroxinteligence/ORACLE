import Foundation

/// model/list is the host-owned capability contract; no hardcoded model fallback.
struct OracleCodexModel {
    let id: String
    let label: String
    let effort: String
    var snapshot: [String: Any] { ["model":id,"displayName":label,"effort":effort] }

    static func choose(_ rows: [[String: Any]], preferred: String? = nil) throws -> OracleCodexModel {
        let visible=rows.filter { row in
            guard row["hidden"] as? Bool != true,let id=row["model"] as? String,!id.isEmpty else{return false}
            let modalities=row["inputModalities"] as? [String]
            return modalities == nil || modalities!.contains("text")
        }
        let chosen: [String:Any]?
        if let preferred,!preferred.isEmpty {
            chosen=visible.first { $0["model"] as? String==preferred }
            guard chosen != nil else {throw failure("O modelo selecionado não está disponível nesta conta. Escolha um modelo disponível antes de instalar.")}
        } else {chosen=visible.first {$0["isDefault"] as? Bool==true} ?? (visible.count==1 ? visible.first : nil)}
        guard let row=chosen,let id=row["model"] as? String,
              let effort=row["defaultReasoningEffort"] as? String,
              (row["supportedReasoningEfforts"] as? [[String:Any]] ?? []).contains(where:{$0["reasoningEffort"] as? String==effort}) else {
            throw failure("O Codex não informou um modelo padrão com esforço compatível. Reconecte e selecione um modelo antes de instalar.")
        }
        return OracleCodexModel(id:id,label:row["displayName"] as? String ?? id,effort:effort)
    }
}

extension CodexConnection {
    func oracleModels() throws -> [[String:Any]] {
        var rows=[[String:Any]](),cursor:String?,seen=Set<String>()
        repeat {
            var params:[String:Any]=["limit":50,"includeHidden":false]
            if let cursor {params["cursor"]=cursor}
            let response=try request("model/list",params,timeout:15)
            rows += response["data"] as? [[String:Any]] ?? []
            cursor=response["nextCursor"] as? String
            if let cursor {guard seen.insert(cursor).inserted,seen.count<10 else{throw failure("Lista de modelos com paginação inconsistente.")}}
        } while cursor != nil
        return rows
    }
}
