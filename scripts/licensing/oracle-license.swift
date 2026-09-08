#!/usr/bin/env swift
import Foundation
import CryptoKit
import Darwin
let fm=FileManager.default
let args=CommandLine.arguments
let command=args.dropFirst().first ?? "help"
func option(_ name:String)->String? { guard let i=args.firstIndex(of:name),i+1<args.count else{return nil};return args[i+1] }
func fail(_ s:String)->Never { fputs(s+"\n",stderr);exit(1) }
func b64(_ d:Data)->String { d.base64EncodedString().replacingOccurrences(of:"+",with:"-").replacingOccurrences(of:"/",with:"_").replacingOccurrences(of:"=",with:"") }
let issuer=URL(fileURLWithPath:option("--issuer-dir") ?? fm.homeDirectoryForCurrentUser.appendingPathComponent(".oracle-issuer").path).standardizedFileURL
let repository=URL(fileURLWithPath:#filePath).deletingLastPathComponent().deletingLastPathComponent().deletingLastPathComponent().resolvingSymlinksInPath()
guard !issuer.resolvingSymlinksInPath().path.hasPrefix(repository.path+"/"),issuer.path != repository.path else { fail("A chave privada deve ficar fora do repositório.") }
let keyFile=issuer.appendingPathComponent("ed25519-private.key")
do {
 if command=="init" {
    guard !fm.fileExists(atPath:keyFile.path) else { fail("Emissor já existe; não substituí a chave privada.") }
    try fm.createDirectory(at:issuer,withIntermediateDirectories:true,attributes:[.posixPermissions:0o700])
    try fm.setAttributes([.posixPermissions:0o700],ofItemAtPath:issuer.path)
    let key=Curve25519.Signing.PrivateKey();let fd=open(keyFile.path,O_WRONLY|O_CREAT|O_EXCL|O_NOFOLLOW,S_IRUSR|S_IWUSR)
    guard fd>=0 else {fail("Não foi possível criar a chave privada com segurança.")};let handle=FileHandle(fileDescriptor:fd,closeOnDealloc:true);try handle.write(contentsOf:key.rawRepresentation);try handle.close()
    print("Emissor criado. Execute export-public para incorporar somente a chave pública ao app.")
 } else if command=="export-public" || command=="issue" {
    let attr=try fm.attributesOfItem(atPath:keyFile.path);guard (attr[.type] as? FileAttributeType) == .typeRegular,((attr[.posixPermissions] as? NSNumber)?.intValue ?? 0)&0o077==0 else {fail("A chave privada deve ser arquivo regular restrito (chmod 600).")}
    let key=try Curve25519.Signing.PrivateKey(rawRepresentation:Data(contentsOf:keyFile));let pub=key.publicKey.rawRepresentation;let id=SHA256.hash(data:pub).prefix(8).map{String(format:"%02x",$0)}.joined()
    if command=="export-public" {
      let data=try JSONSerialization.data(withJSONObject:["version":1,"keys":[id:pub.base64EncodedString()]],options:[.prettyPrinted,.sortedKeys]);FileHandle.standardOutput.write(data);print("")
    } else {
      guard let subject=option("--to"),!subject.isEmpty,subject.count<=160 else {fail("Use issue --to 'Nome da pessoa' [--days 365] [--device UUID].")}
      let now=Int64(Date().timeIntervalSince1970);var payload:[String:Any]=["version":1,"product":"oracle-macos","keyID":id,"licenseID":UUID().uuidString,"subject":subject,"issuedAt":now]
      if let days=option("--days") {guard let n=Int64(days),n>0,n<=36500 else{fail("Prazo inválido.")};payload["expiresAt"]=now+n*86400}
      if let device=option("--device") {guard UUID(uuidString:device) != nil else{fail("Identificador do Mac inválido.")};payload["deviceID"]=device}
      let data=try JSONSerialization.data(withJSONObject:payload,options:[.sortedKeys,.withoutEscapingSlashes]);let signature=try key.signature(for:Data("ORACLE1.".utf8)+data)
      print("ORACLE1."+b64(data)+"."+b64(signature))
    }
 } else { print("oracle-license init | export-public | issue --to 'Nome' [--days 365] [--device UUID]\nChave privada padrão: ~/.oracle-issuer (fora do app/repo). --issuer-dir permite um destino privado alternativo.") }
} catch {fail(error.localizedDescription)}
