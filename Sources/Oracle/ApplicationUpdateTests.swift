import Foundation
import CryptoKit

private struct ApplicationUpdateTestDevice:OracleLicenseDeviceProviding {
    func identifier(create:Bool)throws->String {"ORACLE-MAC2-"+String(repeating:"e",count:64)}
}

func runApplicationUpdateTests() throws {
    let base=try oracleTestDirectory("application-update"),state=base.appendingPathComponent("state")
    defer{try? fm.removeItem(at:base)}
    let signer=Curve25519.Signing.PrivateKey(),device=ApplicationUpdateTestDevice()
    let core=try Core(home:state,licenseDevice:device,
                      licenseTrust:LicenseKeys(version:1,keys:["fixture":signer.publicKey.rawRepresentation.base64EncodedString()]))
    var checks=0
    func expect(_ ok:Bool,_ name:String)throws {guard ok else{throw failure(name)};checks+=1;print("PASS "+name)}
    func refuses(_ name:String,_ body:()throws->Void)throws {do{try body()}catch{checks+=1;print("PASS "+name);return};throw failure("Accepted: "+name)}
    _=try core.licenseDeviceRequest()
    let grant=OracleLicense(version:2,product:"oracle-macos",keyID:"fixture",licenseID:UUID().uuidString,
                            subject:"Synthetic updater fixture",issuedAt:1,expiresAt:nil,deviceID:try device.identifier(create:false))
    let grantPayload=try JSONEncoder().encode(grant)
    _=try core.activateLicense("ORACLE2."+base64URL(grantPayload)+"."+base64URL(try signer.signature(for:Data("ORACLE2.".utf8)+grantPayload)))
    let marker=state.appendingPathComponent("preserved-profile.txt")
    try atomicWriteData(Data("profile stays outside the app bundle".utf8),to:marker)

    let install=base.appendingPathComponent("install"),current=install.appendingPathComponent("Oracle.app")
    try fm.createDirectory(at:current,withIntermediateDirectories:true)
    let source=base.appendingPathComponent("release/Oracle.app"),contents=source.appendingPathComponent("Contents"),macOS=contents.appendingPathComponent("MacOS"),resources=contents.appendingPathComponent("Resources")
    try fm.createDirectory(at:macOS,withIntermediateDirectories:true);try fm.createDirectory(at:resources,withIntermediateDirectories:true)
    let executable=macOS.appendingPathComponent("Oracle")
    try fm.copyItem(at:URL(fileURLWithPath:CommandLine.arguments[0]).standardizedFileURL,to:executable)
    let version="99.0.0"
    let info:[String:Any]=["CFBundleIdentifier":"com.oraclecompanion.macos","CFBundleShortVersionString":version,
                           "CFBundleVersion":"999","CFBundleExecutable":"Oracle","CFBundlePackageType":"APPL","LSMinimumSystemVersion":"13.0"]
    try PropertyListSerialization.data(fromPropertyList:info,format:.xml,options:0).write(to:contents.appendingPathComponent("Info.plist"),options:.withoutOverwriting)
    try writeJSON(["schemaVersion":1,"product":"oracle-macos","version":version,"dirty":false,
                   "commit":String(repeating:"a",count:40)],resources.appendingPathComponent("build-manifest.json"))
    let environment=["PATH":"/usr/bin:/bin:/usr/sbin:/sbin","HOME":state.path]
    let signed=try runProcess(URL(fileURLWithPath:"/usr/bin/codesign"),["--force","--sign","-",source.path],cwd:base,environment:environment,timeout:60,operation:"Synthetic app signing")
    try expect(signed.code==0,"synthetic candidate receives a valid ad-hoc code signature")
    let zip=base.appendingPathComponent("Oracle-99.0.0-macos-arm64.zip")
    let packed=try runProcess(URL(fileURLWithPath:"/usr/bin/ditto"),["-c","-k","--keepParent",source.path,zip.path],cwd:base,environment:environment,timeout:120,operation:"Synthetic app packaging")
    try expect(packed.code==0,"synthetic updater ZIP is created")
    let bytes=try Data(contentsOf:zip),tag="v"+version,url=OracleApplicationRelease.repository+"/releases/download/"+tag+"/"+zip.lastPathComponent
    func release(digestValue:String?=nil)->[String:Any] {
        ["draft":false,"prerelease":false,"tag_name":tag,"html_url":OracleApplicationRelease.repository+"/releases/tag/"+tag,
         "assets":[["id":123,"name":zip.lastPathComponent,"state":"uploaded","size":bytes.count,
                    "digest":digestValue ?? "sha256:"+digest(bytes),"browser_download_url":url]]]
    }
    func network(_ metadata:[String:Any])->UpdateNetwork {
        UpdateNetwork(transport:{request,_ in
            if request==OracleApplicationRelease.api{return try jsonData(metadata)}
            if request==url{return bytes}
            throw failure("Unexpected synthetic updater request")
        })
    }
    let prepared=try core.prepareApplicationUpdate(currentBundle:current,network:network(release()))
    try expect(prepared.version==version && fm.fileExists(atPath:prepared.replacement.path),"validated app is staged beside the current bundle")
    let preservedAfterPreparation=try Data(contentsOf:marker)
    try expect(fm.fileExists(atPath:current.path) && preservedAfterPreparation==Data("profile stays outside the app bundle".utf8),"preparation preserves current app and profile")
    let pending=try readJSON(prepared.receipt)
    try expect(pending["current"] as? String==current.path && pending["replacement"] as? String==prepared.replacement.path,"pending replacement is bound to the exact app path")
    core.finalizeApplicationUpdateIfNeeded(currentBundle:current)
    try expect(!fm.fileExists(atPath:prepared.replacement.path) && !fm.fileExists(atPath:prepared.receipt.path) && fm.fileExists(atPath:current.path),"abandoned preparation is cleaned without touching the current app")
    try refuses("changed published ZIP digest is rejected before staging") {
        _=try core.prepareApplicationUpdate(currentBundle:current,network:network(release(digestValue:"sha256:"+String(repeating:"0",count:64))))
    }
    try expect(try Data(contentsOf:marker)==Data("profile stays outside the app bundle".utf8),"failed update validation preserves profile bytes")
    print("APPLICATION_UPDATE_RECEIPT \(checks) checks")
}
