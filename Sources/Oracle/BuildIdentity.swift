import Foundation

enum OracleBuildIdentity {
    static func metadata() -> [String:Any] {
        guard let root=Bundle.main.resourceURL,
              let record=try? readJSON(root.appendingPathComponent("build-manifest.json")) else {
            return ["version":Bundle.main.object(forInfoDictionaryKey:"CFBundleShortVersionString") as? String ?? "desenvolvimento",
                    "commit":"não registrado", "verifiedRelease":false]
        }
        return record
    }
    static func description() -> String {
        let info=metadata()
        let commit=(info["commit"] as? String).map{String($0.prefix(12))} ?? "não registrado"
        return "Versão \(info["version"] as? String ?? "desenvolvimento")\nCommit \(commit)\nBuild \(info["buildID"] as? String ?? "local")\n\(info["channel"] as? String ?? "Distribuição de desenvolvimento")"
    }
}
