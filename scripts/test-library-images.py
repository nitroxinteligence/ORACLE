#!/usr/bin/env python3
"""Run the actual image reader against a disposable vault; no app build/install."""
from pathlib import Path
import subprocess, tempfile
root = Path(__file__).resolve().parents[1]
work = root / '.work' / 'library-image-tests'
work.mkdir(parents=True, exist_ok=True)
core = (root / 'Sources/Oracle/Core.swift').read_text()
scoped = core[core.index('    func scoped('):core.index('    func vault()')]
svg = (root / 'Sources/Oracle/PluginIcons.swift').read_text().split('final class SafePluginSVG:', 1)[1]
reader = (root / 'Sources/Oracle/LibraryImages.swift').read_text()
preamble = '''import Foundation
import AppKit
import ImageIO
import UniformTypeIdentifiers
let fm = FileManager.default
func failure(_ text:String)->NSError { NSError(domain:"LibraryImageTest",code:1,userInfo:[NSLocalizedDescriptionKey:text]) }
final class PluginIconLoader { static let byteLimit=2_000_000 }
final class Core {
 let root:URL
 init(_ root:URL){self.root=root}
 func refreshConfig(){}
 func vault()throws->URL{root}
'''
tests = r'''
let root=URL(fileURLWithPath:CommandLine.arguments[1]).appendingPathComponent("vault")
try fm.createDirectory(at:root.appendingPathComponent("SISTEMA/prompts/design"),withIntermediateDirectories:true)
try fm.createDirectory(at:root.appendingPathComponent("Anexos"),withIntermediateDirectories:true)
let source="SISTEMA/prompts/design/Exemplo.md"
try "# Exemplo".write(to:root.appendingPathComponent(source),atomically:true,encoding:.utf8)
let space=CGColorSpaceCreateDeviceRGB()
let canvas=CGContext(data:nil,width:2048,height:1024,bitsPerComponent:8,bytesPerRow:2048*4,space:space,bitmapInfo:CGImageAlphaInfo.premultipliedLast.rawValue)!
canvas.setFillColor(NSColor.systemBlue.cgColor);canvas.fill(CGRect(x:0,y:0,width:2048,height:1024))
let buffer=NSMutableData(),destination=CGImageDestinationCreateWithData(buffer,UTType.png.identifier as CFString,1,nil)!
CGImageDestinationAddImage(destination,canvas.makeImage()!,nil);CGImageDestinationFinalize(destination)
let png=buffer as Data
try png.write(to:root.appendingPathComponent("Anexos/Capa azul.png"))
try png.write(to:root.appendingPathComponent("SISTEMA/prompts/design/local.png"))
let core=Core(root)
var checks=0
func expect(_ value:Bool,_ name:String)throws{guard value else{throw failure(name)};checks+=1}
func read(_ ref:String,_ src:String=source)throws->[String:Any]{try core.readLibraryImage(["reference":ref,"source":src])}
func rejects(_ ref:String,_ src:String=source)throws{do{_ = try read(ref,src)}catch{checks+=1;return};throw failure("Accepted forbidden input: "+ref)}
let image=try read("../../../Anexos/Capa%20azul.png")
try expect(image["path"] as? String == "Anexos/Capa azul.png","relative path")
let dataURL=image["dataURL"] as! String
let decoded=Data(base64Encoded:String(dataURL.split(separator:",")[1]))!
let raster=CGImageSourceCreateWithData(decoded as CFData,nil)!
let properties=CGImageSourceCopyPropertiesAtIndex(raster,0,nil) as! [CFString:Any]
try expect(properties[kCGImagePropertyPixelWidth] as? Int == 960,"bounded thumbnail width")
try expect(properties[kCGImagePropertyPixelHeight] as? Int == 480,"aspect ratio")
try expect(try read("![[Capa azul.png|400]]")["path"] as? String == "Anexos/Capa azul.png","short wikilink")
try expect(try read("/Anexos/Capa azul.png")["path"] as? String == "Anexos/Capa azul.png","vault relative")
try expect(try read("local.png")["path"] as? String == "SISTEMA/prompts/design/local.png","sibling")
try rejects("../../../../outside.png")
try rejects("https://example.com/cover.png")
try rejects("file:///tmp/cover.png")
try rejects("data:image/png;base64,AAAA")
try rejects("%2e%2e/%2e%2e/%2e%2e/%2e%2e/outside.png")
try rejects("Anexos/Capa azul.png","INBOX/Exemplo.md")
try rejects("Anexos/secret.txt")
try fm.createSymbolicLink(at:root.appendingPathComponent("SISTEMA/prompts/design/link.png"),withDestinationURL:root.appendingPathComponent("Anexos/Capa azul.png"))
try rejects("link.png")
try fm.createDirectory(at:root.appendingPathComponent("Duplicados"),withIntermediateDirectories:true)
try png.write(to:root.appendingPathComponent("Duplicados/Capa azul.png"))
try rejects("![[Capa azul.png]]")
try "not a png".write(to:root.appendingPathComponent("Anexos/invalid.png"),atomically:true,encoding:.utf8)
try rejects("/Anexos/invalid.png")
let large=root.appendingPathComponent("Anexos/large.png")
fm.createFile(atPath:large.path,contents:Data())
let handle=try FileHandle(forWritingTo:large);try handle.truncate(atOffset:16_000_001);try handle.close()
try rejects("/Anexos/large.png")
try "<svg xmlns='http://www.w3.org/2000/svg' width='100' height='80'><rect width='100' height='80' fill='#abcdef'/></svg>".write(to:root.appendingPathComponent("Anexos/safe.svg"),atomically:true,encoding:.utf8)
try expect((try read("/Anexos/safe.svg")["dataURL"] as? String)?.hasPrefix("data:image/png;base64,")==true,"safe SVG raster")
try "<svg xmlns='http://www.w3.org/2000/svg'><script>alert(1)</script></svg>".write(to:root.appendingPathComponent("Anexos/unsafe.svg"),atomically:true,encoding:.utf8)
try rejects("/Anexos/unsafe.svg")
print("Library image reader: \(checks) checks passed. Disposable vault only.")
'''
with tempfile.TemporaryDirectory(prefix='run-', dir=work) as directory:
    script = Path(directory) / 'check.swift'
    script.write_text(preamble + scoped + '}\nfinal class SafePluginSVG:' + svg + '\n' + reader + '\n' + tests)
    subprocess.run(['/usr/bin/swift', '-module-cache-path', str(work / 'module-cache'), str(script), directory], check=True)
