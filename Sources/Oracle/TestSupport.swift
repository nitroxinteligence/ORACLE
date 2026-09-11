import Foundation

/// Foundation may ignore TMPDIR on macOS. Tests therefore require an explicit
/// disposable worktree location rather than silently writing the user's T dir.
func oracleTestDirectory(_ prefix:String) throws -> URL {
    guard let raw=ProcessInfo.processInfo.environment["ORACLE_TEST_ROOT"],raw.hasPrefix("/"),!prefix.contains("/"),
          URL(fileURLWithPath:raw).standardizedFileURL.pathComponents.contains(".work") else {
        throw failure("Defina ORACLE_TEST_ROOT como uma pasta descartável dentro de .work antes dos testes.")
    }
    let root=URL(fileURLWithPath:raw).standardizedFileURL
    var cursor=root
    while cursor.path != "/" {
        if (try? cursor.resourceValues(forKeys:[.isSymbolicLinkKey]).isSymbolicLink)==true {throw failure("A pasta de testes não pode atravessar links simbólicos.")}
        cursor=cursor.deletingLastPathComponent()
    }
    try fm.createDirectory(at:root,withIntermediateDirectories:true)
    return root.appendingPathComponent(prefix+"-"+UUID().uuidString)
}
