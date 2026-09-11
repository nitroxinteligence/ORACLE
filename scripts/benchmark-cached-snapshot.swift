// Standalone benchmark executable; never part of the distributed application.
// Measures completed cache reads separately from the initial asynchronous response.
import Foundation

@main struct CachedSnapshotBenchmark {
    static func main() throws {
        guard CommandLine.arguments.count==2 else {throw failure("An explicit new .work output directory is required")}
        let base=URL(fileURLWithPath:CommandLine.arguments[1]).standardizedFileURL
        guard base.pathComponents.contains(".work"),base.resolvingSymlinksInPath()==base,!fm.fileExists(atPath:base.path) else {throw failure("Refusing existing or non-fixture benchmark output")}
        try fm.createDirectory(at:base,withIntermediateDirectories:true,attributes:[.posixPermissions:0o700])
        var rows=[[String:Any]]()
        for count in [100,1000,10000] {
            let root=base.appendingPathComponent("vault-\(count)"),home=base.appendingPathComponent("state-\(count)")
            try fm.createDirectory(at:root,withIntermediateDirectories:true)
            for i in 0..<count {try Data("# Synthetic \(i)\n\nBenchmark text, not personal knowledge.\n".utf8).write(to:root.appendingPathComponent("note-\(i).md"))}
            let core=try Core(home:home);core.config["vault"]=root.path;core.config["gbrainAccess"]=false;try core.persist()
            var scan=[Double](),snapshot=[Double](),serialize=[Double]()
            for _ in 0..<5 {
                let at=ProcessInfo.processInfo.systemUptime,result=try core.scanSnapshot(root:root)
                scan.append((ProcessInfo.processInfo.systemUptime-at)*1000)
                guard result.complete,result.files.count==count else {throw failure("Incomplete benchmark scan")}
            }
            let initialAt=ProcessInfo.processInfo.systemUptime,initial=try core.snapshot()
            let initialMilliseconds=(ProcessInfo.processInfo.systemUptime-initialAt)*1000
            guard (initial["scan"] as? [String:Any])?["pending"] as? Bool==true else {throw failure("Initial snapshot did not expose pending state")}
            core.memorySync.start()
            let deadline=ProcessInfo.processInfo.systemUptime+30
            while core.memorySync.status()["scanComplete"] as? Bool != true && ProcessInfo.processInfo.systemUptime<deadline {Thread.sleep(forTimeInterval:0.05)}
            defer {core.memorySync.stop()}
            guard core.memorySync.status()["scanComplete"] as? Bool==true else {throw failure("Background scan did not complete")}
            var snapshotBytes=0
            for _ in 0..<5 {
                let at=ProcessInfo.processInfo.systemUptime,result=try core.snapshot()
                snapshot.append((ProcessInfo.processInfo.systemUptime-at)*1000)
                guard (result["entries"] as? [[String:Any]])?.count==count,(result["scan"] as? [String:Any])?["complete"] as? Bool==true else {throw failure("Cached measurement is not a complete inventory")}
                let wireAt=ProcessInfo.processInfo.systemUptime
                snapshotBytes=try jsonData(result).count
                serialize.append((ProcessInfo.processInfo.systemUptime-wireAt)*1000)
            }
            core.memorySync.stop()
            rows.append(["notes":count,"scanMilliseconds":scan,"completedCachedSnapshotMilliseconds":snapshot,
                         "serializationMilliseconds":serialize,"snapshotBytes":snapshotBytes,
                         "initialPendingSnapshotMilliseconds":initialMilliseconds,"backgroundScanComplete":true])
        }
        let result:[String:Any]=["rows":rows,"scope":"Synthetic local Markdown; completed Core snapshots and JSON serialization measured separately. No engine inference, physical pilot, GPU, energy, battery, or approved production budget measured.","at":ISO8601DateFormatter().string(from:Date())]
        try writeJSON(result,base.appendingPathComponent("result.json"))
        print(String(decoding:try jsonData(result),as:UTF8.self))
    }
}
