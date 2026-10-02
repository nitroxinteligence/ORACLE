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
    private static let crcTable:[UInt32]=(0..<256).map {entry in
        var value=UInt32(entry)
        for _ in 0..<8 {value=(value&1)==1 ? (value>>1)^0xedb88320 : value>>1}
        return value
    }
    private func validatePNGStructure()throws {
        func number(_ start:Int)->UInt32 {data[start..<start+4].reduce(UInt32(0)){($0<<8)|UInt32($1)}}
        var offset=8,header=false,palette=false,imageData=false,imageDataEnded=false,imageBytes=0,ended=false
        while offset<data.count {
            guard data.count-offset>=12 else{throw Self.error("O PNG está truncado antes do fim de um bloco.")}
            let length=Int(number(offset))
            guard length<=data.count-offset-12 else{throw Self.error("O PNG contém um bloco incompleto.")}
            let typeBytes=Array(data[offset+4..<offset+8])
            guard typeBytes.allSatisfy({(65...90).contains($0)||(97...122).contains($0)}),(65...90).contains(typeBytes[2]) else{throw Self.error("O PNG contém um tipo de bloco inválido.")}
            let type=String(decoding:typeBytes,as:UTF8.self),crcOffset=offset+8+length
            var crc=UInt32.max
            for byte in data[offset+4..<crcOffset] {crc=Self.crcTable[Int((crc^UInt32(byte))&255)]^(crc>>8)}
            guard (crc^UInt32.max)==number(crcOffset) else{throw Self.error("A integridade de um bloco PNG não foi confirmada.")}
            switch type {
            case "IHDR":guard !header,offset==8,length==13 else{throw Self.error("O cabeçalho PNG é inválido.")};header=true
            case "PLTE":guard header,!palette,!imageData,length>0,length<=768,length%3==0 else{throw Self.error("A paleta PNG é inválida.")};palette=true
            case "IDAT":
                guard header,!imageDataEnded,data[25] != 3 || palette else{throw Self.error("Os dados PNG estão fora de ordem.")}
                imageData=true;imageBytes+=length
            case "IEND":
                guard header,imageData,imageBytes>0,length==0,crcOffset+4==data.count else{throw Self.error("O PNG não possui um término completo.")}
                ended=true
            default:
                guard header,(typeBytes[0]&32) != 0 else{throw Self.error("O PNG contém um bloco crítico não reconhecido.")}
                if imageData {imageDataEnded=true}
            }
            offset=crcOffset+4
        }
        guard ended else{throw Self.error("O PNG está incompleto. A imagem não foi salva.")}
    }
    func finish(scope current:OracleDesktopPluginExportScope,now:Date=Date())throws->Data {
        try requireScope(current,now:now)
        let signature=Data([137,80,78,71,13,10,26,10])
        guard data.count>=33,data.prefix(8)==signature,Array(data[8..<16])==[0,0,0,13,73,72,68,82] else{throw Self.error("A imagem de exportação precisa ser um PNG íntegro.")}
        func number(_ start:Int)->UInt64 {data[start..<start+4].reduce(UInt64(0)){($0<<8)|UInt64($1)}}
        let width=number(16),height=number(20)
        guard width>0,height>0,width<=32768,height<=32768,width*height<=64_000_000 else{throw Self.error("As dimensões da imagem excedem o limite de exportação.")}
        try validatePNGStructure()
        guard let source=CGImageSourceCreateWithData(data as CFData,[kCGImageSourceShouldCache:false] as CFDictionary),
              CGImageSourceGetType(source) as String? == "public.png",CGImageSourceGetCount(source)==1,
              CGImageSourceGetStatus(source) == .statusComplete,
              let image=CGImageSourceCreateImageAtIndex(source,0,[kCGImageSourceShouldCacheImmediately:true] as CFDictionary),
              image.width==Int(width),image.height==Int(height) else{throw Self.error("Não foi possível confirmar o PNG completo. A imagem não foi salva.")}
        finished=true
        return data
    }
}
