import Foundation

extension Notification.Name { static let oracleVaultChanged = Notification.Name("OracleVaultChanged") }

struct VaultScanSnapshot {
    let root:URL
    let entries:[[String:Any]]
    let issues:[[String:String]]
    let complete:Bool
    let inspected:Int
    let at:Date
    let signature:String
    var files:[String] { entries.filter { $0["directory"] as? Bool != true }.compactMap { $0["path"] as? String } }
    var metadata:[String:Any] {
        ["complete":complete,"issues":issues,"inspected":inspected,"at":at.timeIntervalSince1970,
         "signature":signature,"coverage":"Markdown até 2 MB; pastas ocultas, links e dependências excluídos"]
    }
}

extension Core {
    /// A partial enumeration is usable for display, NEVER authoritative for deletions.
    /// Failure in one subtree does not prevent inspecting safe siblings.
    func scanSnapshot(root inputRoot:URL, instructionsOnly:Bool = false,
                      maxEntries:Int = 60_000, maxVisited:Int = 180_000,
                      budget:TimeInterval = 15) throws -> VaultScanSnapshot {
        let root = inputRoot.resolvingSymlinksInPath()
        let keys:Set<URLResourceKey> = [.isDirectoryKey,.isSymbolicLinkKey,.isRegularFileKey,.fileSizeKey,.contentModificationDateKey]
        guard (try root.resourceValues(forKeys:[.isDirectoryKey])).isDirectory == true else {
            throw failure("A pasta selecionada está indisponível.")
        }
        var entries=[[String:Any]](), issues=[[String:String]](), inspected=0, complete=true
        let started = ProcessInfo.processInfo.systemUptime
        let prefix = root.path.hasSuffix("/") ? root.path : root.path + "/"
        func issue(_ url:URL, _ reason:String) {
            complete=false
            if issues.count < 100 {
                let path = url.path.hasPrefix(prefix) ? String(url.path.dropFirst(prefix.count)) : "."
                issues.append(["path":path,"error":String(reason.prefix(240))])
            }
        }
        guard let walker = fm.enumerator(at:root,includingPropertiesForKeys:Array(keys),options:[.skipsHiddenFiles],
                                         errorHandler:{ url,error in issue(url,error.localizedDescription);return true }) else {
            throw failure("Não foi possível ler a pasta.")
        }
        for case let file as URL in walker {
            inspected += 1
            if inspected > maxVisited || entries.count >= maxEntries || ProcessInfo.processInfo.systemUptime-started > budget {
                issue(root,"Leitura parcial: limite de trabalho atingido. Escolha uma pasta menor ou revise o escopo.")
                break
            }
            do {
                let values = try file.resourceValues(forKeys:keys)
                if values.isSymbolicLink == true { walker.skipDescendants();continue }
                if values.isDirectory == true && ["node_modules","vendor","dist","build"].contains(file.lastPathComponent) {
                    walker.skipDescendants();continue
                }
                guard file.path.hasPrefix(prefix), file.resolvingSymlinksInPath().path.hasPrefix(prefix) else {
                    issue(file,"A pasta mudou durante a leitura.");walker.skipDescendants();continue
                }
                let relative = String(file.path.dropFirst(prefix.count))
                if values.isDirectory != true {
                    if instructionsOnly && !["AGENTS.md","AGENTS.override.md"].contains(file.lastPathComponent) { continue }
                    if file.pathExtension.lowercased() != "md" { continue }
                    guard values.isRegularFile == true else { issue(file,"Markdown não é arquivo regular.");continue }
                    // Explicit omission: a note that grew cannot be mistaken for a deletion.
                    guard (values.fileSize ?? Int.max) <= 2_000_000 else { issue(file,"Markdown excede 2 MB e não foi indexado.");continue }
                }
                entries.append(["path":relative,"name":file.lastPathComponent,"directory":values.isDirectory == true,
                                "size":values.fileSize ?? 0,"modified":values.contentModificationDate?.timeIntervalSince1970 ?? 0,
                                "source":inputRoot.path])
            } catch { issue(file,error.localizedDescription);walker.skipDescendants() }
        }
        let sorted=entries.sorted { ($0["path"] as? String ?? "") < ($1["path"] as? String ?? "") }
        let rows=sorted.map { ["path":$0["path"] ?? "", "size":$0["size"] ?? 0,
                              "modified":$0["modified"] ?? 0, "directory":$0["directory"] ?? false] }
        return VaultScanSnapshot(root:root,entries:sorted,issues:issues,complete:complete,inspected:inspected,at:Date(),signature:digest(try jsonData(rows)))
    }
}
