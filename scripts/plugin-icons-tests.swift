import Foundation
import AppKit
let fm=FileManager.default
func readJSON(_ url:URL)throws->[String:Any]{try JSONSerialization.jsonObject(with:Data(contentsOf:url)) as? [String:Any] ?? [:]}
var checks=0
func check(_ value:Bool,_ message:String){if !value{fatalError(message)};checks+=1}
let valid="""
<svg xmlns="http://www.w3.org/2000/svg" width="128" height="128" viewBox="0 0 128 128"><rect width="128" height="128" fill="#ff0000"/></svg>
"""
check(SafePluginSVG.sanitize(Data(valid.utf8)) != nil,"simple original SVG accepted")
let png=PluginIconLoader.rasterDataURL(Data(valid.utf8))!
let bitmap=NSBitmapImageRep(data:Data(base64Encoded:png.components(separatedBy:",")[1])!)!
check(bitmap.pixelsWide==96&&bitmap.pixelsHigh==96,"native SVG is bounded to 96 px")
// Inspect the encoded PNG channels. NSColor.colorAt on HDR macOS applies a
// display/headroom conversion and is not a reading of the stored sRGB bytes.
let offset=48*bitmap.bytesPerRow+48*4,pixels=bitmap.bitmapData!
check(pixels[offset]>245&&pixels[offset+1]<10&&pixels[offset+2]<10&&pixels[offset+3]==255,"original red survives PNG rasterization")
for payload in [
 "<script>alert(1)</script>","<image href='https://example.com/a.png'/>","<foreignObject><body/></foreignObject>",
 "<rect width='10' onload='alert(1)'/>","<rect fill='url(https://example.com/a)'/>",
 "<use href='file:///etc/passwd'/>","<use id='recursive' href='#recursive'/>",
 "<style>@import url(https://example.com/a);</style>","<?xml-stylesheet href='https://example.com/a'?>",
 "<rect fill='u&#114;l(https://example.com/a)'/>","<rect style='fill:red'/>"
]{let data=Data("<svg xmlns='http://www.w3.org/2000/svg'>\(payload)</svg>".utf8);check(SafePluginSVG.sanitize(data)==nil,"active or unsupported SVG rejected: \(payload)");check(PluginIconLoader.rasterDataURL(data)==nil,"SVG cannot bypass sanitization through ImageIO")}
check(SafePluginSVG.sanitize(Data("<!DOCTYPE svg [<!ENTITY x SYSTEM 'file:///etc/passwd'>]><svg>&x;</svg>".utf8))==nil,"external entities rejected before parsing")
check(SafePluginSVG.sanitize(Data(("<svg>"+String(repeating:"<g/>",count:1501)+"</svg>").utf8))==nil,"element count bounded")
check(PluginIconLoader.rasterDataURL(Data(repeating:32,count:PluginIconLoader.byteLimit+1))==nil,"byte budget enforced")
check(PluginIconLoader.catalogURL("https://files.openai.com/content?id=icon") != nil,"catalog source allowed")
for url in ["http://files.openai.com/icon.png","file:///tmp/icon.svg","https://files.openai.com.evil.test/icon.png","https://user@files.openai.com/icon.png","https://files.openai.com:8443/icon.png","https://chatgpt.com/backend-api/private"]{check(PluginIconLoader.catalogURL(url)==nil,"untrusted origin rejected")}
let root=fm.temporaryDirectory.appendingPathComponent("oracle-brand-tests-"+UUID().uuidString)
try fm.createDirectory(at:root,withIntermediateDirectories:true)
defer{try? fm.removeItem(at:root)}
func package(_ name:String,_ display:String,_ appKey:String,_ appID:String)throws{
 let dir=root.appendingPathComponent("test-market/\(name)/1.0")
 try fm.createDirectory(at:dir.appendingPathComponent(".codex-plugin"),withIntermediateDirectories:true)
 try Data(valid.utf8).write(to:dir.appendingPathComponent("logo.svg"))
 try JSONSerialization.data(withJSONObject:["name":name,"interface":["displayName":display,"logo":"./logo.svg"]]).write(to:dir.appendingPathComponent(".codex-plugin/plugin.json"))
 try JSONSerialization.data(withJSONObject:["apps":[appKey:["id":appID,"optional":true]]]).write(to:dir.appendingPathComponent(".app.json"))
}
try package("analytics","Analytics","canva","connector_canva")
var index=PluginIconLoader.localBrands(root:root)
let app:[String:Any]=["id":"connector_canva","name":"Canva","kind":"app","status":"installed"]
check(PluginIconLoader.localBrand(for:app,index:index)==nil,"analytics logo is never borrowed by its Canva dependency")
try package("canva","Canva","canva","connector_canva")
index=PluginIconLoader.localBrands(root:root)
check(PluginIconLoader.localBrand(for:app,index:index) != nil,"owner app resolved by exact connector ID")
check(PluginIconLoader.localBrand(for:["id":"analytics@test-market","name":"Analytics","kind":"plugin"],index:index) != nil,"package artwork works without using an app dependency")
let dir=root.appendingPathComponent("test-market/canva/1.0")
check(PluginIconLoader.localFile("../1.0/logo.svg",root:dir) != nil,"normalized in-package path allowed")
check(PluginIconLoader.localFile("../../../outside.svg",root:dir)==nil,"path traversal rejected")
try fm.createSymbolicLink(at:dir.appendingPathComponent("escape.svg"),withDestinationURL:URL(fileURLWithPath:"/etc/passwd"))
check(PluginIconLoader.localFile("escape.svg",root:dir)==nil,"symlink escape rejected")
print("\(checks) plugin artwork checks passed; colors, source ownership and SVG isolation verified")
