import Foundation

extension Core {
    /// Creates only owned navigation notes. Folder membership is structural
    /// evidence, not an inferred semantic relationship between personal notes.
    func maintainGraphIndexes() throws -> [String:Any] {
        try withVaultWrite {
            let root=try vault(),snapshot=try scanSnapshot(root:root)
            guard snapshot.complete else{throw failure("Índices do Graph aguardam uma leitura completa do vault.")}
            let prefix="SISTEMA/indices/oracle-graph/"
            let paths=snapshot.entries.compactMap{row -> String? in
                guard row["directory"] as? Bool != true,let path=row["path"] as? String,path.lowercased().hasSuffix(".md"),!path.hasPrefix(prefix) else{return nil}
                return path
            }.sorted()
            var groups=[String:[String]]()
            for path in paths {
                let parts=path.split(separator:"/").map(String.init),folders=Array(parts.dropLast())
                let depth=path.hasPrefix("SISTEMA/skills/") ? 3:2
                let group=folders.isEmpty ? "Notas na raiz":folders.prefix(depth).joined(separator:"/")
                groups[group,default:[]].append(path)
            }
            let allowed=CharacterSet.alphanumerics.union(CharacterSet(charactersIn:"/-._~"))
            func link(_ path:String,_ title:String) -> String {
                let label=title.replacingOccurrences(of:"\\",with:"\\\\").replacingOccurrences(of:"[",with:"\\[").replacingOccurrences(of:"]",with:"\\]")
                return "- ["+label+"](../../../"+path.addingPercentEncoding(withAllowedCharacters:allowed)!+")"
            }
            var expected=[String:Data](),map=["# Mapa do vault","","Índice por pastas, mantido pelo Oracle. As notas originais são preservadas.",""]
            for group in groups.keys.sorted() {
                let notes=groups[group]!
                for start in stride(from:0,to:notes.count,by:200) {
                    let page=start/200+1,title=group+(notes.count>200 ? " · \(page)":"")
                    let path=prefix+String(digest(Data(group.utf8)).prefix(20))+"-\(page).md"
                    let lines=notes[start..<min(start+200,notes.count)].map{link($0,$0)}
                    expected[path]=Data((["# "+title,"","Organização por pasta; links não representam relações inferidas.",""]+lines+[""]).joined(separator:"\n").utf8)
                    map.append(link(path,title))
                }
            }
            expected[prefix+"Mapa.md"]=Data((map+[""]).joined(separator:"\n").utf8)
            let receiptURL=home.appendingPathComponent("maintenance/graph-index.json"),pendingURL=home.appendingPathComponent("maintenance/graph-index-pending.json")
            let previous=(try? readJSON(receiptURL)) ?? [:],pending=(try? readJSON(pendingURL)) ?? [:]
            let old=previous["vault"] as? String==root.path ? previous["files"] as? [String:String] ?? [:]:[:]
            let intents=pending["vault"] as? String==root.path ? pending["files"] as? [String:String] ?? [:]:[:]
            let hashes=expected.mapValues{digest($0)}
            for path in Set(expected.keys).union(old.keys) {
                guard path.hasPrefix(prefix),path.hasSuffix(".md") else{throw failure("Recibo de índices fora do escopo.")}
                let file=try scoped(path,root:root)
                if fm.fileExists(atPath:file.path) {
                    let hash=try fileDigest(file)
                    guard hash==old[path] || hash==intents[path] else{throw failure("Índice editado pelo usuário; arquivo preservado: \(path)")}
                }
            }
            try writeJSON(["vault":root.path,"files":hashes],pendingURL)
            var changed=0
            for path in expected.keys.sorted() {
                let file=try scoped(path,root:root),data=expected[path]!
                try coordinatedWrite(at:file) {_ in
                    if fm.fileExists(atPath:file.path) {
                        let hash=try fileDigest(file)
                        guard hash==old[path] || hash==intents[path] else{throw failure("Índice mudou durante a manutenção; edição preservada.")}
                        if hash==hashes[path]{return}
                    }
                    try fm.createDirectory(at:file.deletingLastPathComponent(),withIntermediateDirectories:true)
                    try atomicWriteData(data,to:file,permissions:0o644);changed+=1
                }
            }
            for path in old.keys where expected[path]==nil {
                let file=try scoped(path,root:root)
                if fm.fileExists(atPath:file.path) {
                    try coordinatedWrite(at:file,options:.forDeleting) {_ in
                        guard try fileDigest(file)==old[path] else{throw failure("Índice antigo editado; arquivo preservado.")}
                        try fm.removeItem(at:file);changed+=1
                    }
                }
            }
            try writeJSON(["vault":root.path,"files":hashes,"status":"verified","notes":paths.count],receiptURL)
            try fm.removeItem(at:pendingURL)
            if changed>0{notifyVaultChanged(reason:"graph-index")}
            return ["status":"verified","notes":paths.count,"indexes":expected.count,"changed":changed]
        }
    }
}
