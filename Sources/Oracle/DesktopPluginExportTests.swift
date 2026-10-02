import Foundation

func runDesktopPluginExportTests(root:URL)throws {
    guard oracleRuntimeBindingTestContext(home:root) else{throw failure("Exportação exige perfil sintético explícito dentro de .work.")}
    let scope=OracleDesktopPluginExportScope(state:root.path,vault:root.appendingPathComponent("vault").path,revision:"synthetic-revision")
    let png=Data(base64Encoded:"iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAQAAAC1HAwCAAAAC0lEQVR42mNk+A8AAQUBAScY42YAAAAASUVORK5CYII=")!
    var checks=0
    func check(_ condition:Bool,_ message:String)throws {guard condition else{throw failure("FAIL export "+message)};checks+=1;print("PASS export "+message)}
    func refuse(_ message:String,_ body:()throws->Void)throws {var refused=false;do{try body()}catch{refused=true};try check(refused,message)}
    let buffer=OracleDesktopPluginExportBuffer(scope:scope)
    try buffer.append(base64:png.prefix(13).base64EncodedString(),index:0,scope:scope)
    try buffer.append(base64:png.dropFirst(13).base64EncodedString(),index:1,scope:scope)
    let complete=try buffer.finish(scope:scope)
    try check(complete==png,"ordered chunks preserve exact PNG bytes")
    try refuse("completed token cannot be reused"){_=try buffer.finish(scope:scope)}
    let scoped=OracleDesktopPluginExportBuffer(scope:scope)
    for changed in [OracleDesktopPluginExportScope(state:root.appendingPathComponent("other").path,vault:scope.vault,revision:scope.revision),OracleDesktopPluginExportScope(state:scope.state,vault:root.appendingPathComponent("other-vault").path,revision:scope.revision),OracleDesktopPluginExportScope(state:scope.state,vault:scope.vault,revision:"other-revision")] {
        try refuse("state/vault/revision mismatch refused"){try scoped.append(base64:png.base64EncodedString(),index:0,scope:changed)}
    }
    try refuse("expired token refused"){try OracleDesktopPluginExportBuffer(scope:scope,createdAt:Date(timeIntervalSinceNow:-901)).append(base64:png.base64EncodedString(),index:0,scope:scope)}
    try refuse("out-of-order chunk refused"){try scoped.append(base64:png.base64EncodedString(),index:1,scope:scope)}
    try refuse("malformed base64 refused"){try scoped.append(base64:"invalid@",index:0,scope:scope)}
    let oversized=Data(repeating:0,count:OracleDesktopPluginExportBuffer.maximumChunkBytes+1).base64EncodedString()
    try refuse("oversized chunk refused"){try scoped.append(base64:oversized,index:0,scope:scope)}
    let total=OracleDesktopPluginExportBuffer(scope:scope),chunk=Data(repeating:0,count:OracleDesktopPluginExportBuffer.maximumChunkBytes).base64EncodedString()
    for index in 0..<(OracleDesktopPluginExportBuffer.maximumBytes/OracleDesktopPluginExportBuffer.maximumChunkBytes) {try total.append(base64:chunk,index:index,scope:scope)}
    try refuse("aggregate PNG byte limit enforced"){try total.append(base64:Data([0]).base64EncodedString(),index:total.nextIndex,scope:scope)}
    let malformed=OracleDesktopPluginExportBuffer(scope:scope)
    try malformed.append(base64:Data("not an image".utf8).base64EncodedString(),index:0,scope:scope)
    try refuse("non-PNG image refused"){_=try malformed.finish(scope:scope)}
    let truncated=OracleDesktopPluginExportBuffer(scope:scope)
    try truncated.append(base64:png.prefix(33).base64EncodedString(),index:0,scope:scope)
    try refuse("incomplete PNG refused"){_=try truncated.finish(scope:scope)}
    var huge=png;huge.replaceSubrange(16..<20,with:[255,255,255,255])
    let dimensions=OracleDesktopPluginExportBuffer(scope:scope)
    try dimensions.append(base64:huge.base64EncodedString(),index:0,scope:scope)
    try refuse("unsafe PNG dimensions refused before decode"){_=try dimensions.finish(scope:scope)}
    let destination=root.appendingPathComponent("confirmed-export.png")
    try atomicWriteData(complete,to:destination)
    try check(try Data(contentsOf:destination)==png,"atomic output file confirms exact PNG bytes")
    print("PASS \(checks) desktop plugin export buffer checks; no license bypass or host dialog exercised")
}
