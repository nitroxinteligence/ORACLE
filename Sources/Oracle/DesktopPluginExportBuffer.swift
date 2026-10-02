import Foundation
import ImageIO

struct OracleDesktopPluginExportScope:Equatable {
    let state:String
    let vault:String
    let revision:String
}

/// Transport buffer only. The shared App dispatcher supplies license/lock admission.
final class OracleDesktopPluginExportBuffer {
    static let maximumBytes=32*1024*1024
    static let maximumChunkBytes=256*1024
    let scope:OracleDesktopPluginExportScope
    let createdAt:Date
    private(set) var data=Data()
    private(set) var nextIndex=0
    private var finished=false
    init(scope:OracleDesktopPluginExportScope,createdAt:Date=Date()) {self.scope=scope;self.createdAt=createdAt}
    static func error(_ message:String)->NSError {NSError(domain:"Oracle.DesktopExport",code:1,userInfo:[NSLocalizedDescriptionKey:message])}
    func requireScope(_ current:OracleDesktopPluginExportScope,now:Date=Date())throws {
        guard !finished,current==scope,now.timeIntervalSince(createdAt)>=0,now.timeIntervalSince(createdAt)<900 else{throw Self.error("A pasta ou a sessão mudou. Exporte novamente a imagem atual.")}
    }
    func append(base64:String,index:Int,scope current:OracleDesktopPluginExportScope,now:Date=Date())throws {
        try requireScope(current,now:now)
        guard index==nextIndex,base64.utf8.count<=((Self.maximumChunkBytes+2)/3)*4,
              let bytes=Data(base64Encoded:base64),!bytes.isEmpty,bytes.count<=Self.maximumChunkBytes,
              data.count+bytes.count<=Self.maximumBytes else{throw Self.error("O bloco da imagem é inválido ou excede o limite de exportação.")}
        data.append(bytes);nextIndex+=1
    }
    func finish(scope current:OracleDesktopPluginExportScope,now:Date=Date())throws->Data {
        try requireScope(current,now:now)
        let signature=Data([137,80,78,71,13,10,26,10])
        guard data.count>=33,data.prefix(8)==signature,Array(data[8..<16])==[0,0,0,13,73,72,68,82] else{throw Self.error("A imagem de exportação precisa ser um PNG íntegro.")}
        func number(_ start:Int)->UInt64 {data[start..<start+4].reduce(UInt64(0)){($0<<8)|UInt64($1)}}
        let width=number(16),height=number(20)
        guard width>0,height>0,width<=32768,height<=32768,width*height<=64_000_000 else{throw Self.error("As dimensões da imagem excedem o limite de exportação.")}
        guard let source=CGImageSourceCreateWithData(data as CFData,[kCGImageSourceShouldCache:false] as CFDictionary),
              CGImageSourceGetType(source) as String? == "public.png",CGImageSourceGetCount(source)==1,
              CGImageSourceGetStatus(source) == .statusComplete else{throw Self.error("Não foi possível confirmar o PNG completo. A imagem não foi salva.")}
        finished=true
        return data
    }
}
