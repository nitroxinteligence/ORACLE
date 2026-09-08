import AppKit
let output=CommandLine.arguments[1]
try FileManager.default.createDirectory(atPath:output,withIntermediateDirectories:true)
for size in [16,32,64,128,256,512,1024] {
 let image=NSImage(size:NSSize(width:size,height:size));image.lockFocus()
 let scale=CGFloat(size)/1024
 let transform=NSAffineTransform();transform.scale(by:scale);transform.concat()
 NSColor(calibratedRed:0.025,green:0.035,blue:0.065,alpha:1).setFill()
 NSBezierPath(roundedRect:NSRect(x:0,y:0,width:1024,height:1024),xRadius:226,yRadius:226).fill()
 for (radius,alpha) in [(CGFloat(310),CGFloat(0.035)),(270,0.05),(235,0.09)] {
  NSColor(calibratedRed:1,green:0.45,blue:0.14,alpha:alpha).setFill();NSBezierPath(ovalIn:NSRect(x:512-radius,y:512-radius,width:radius*2,height:radius*2)).fill()
 }
 let sun=NSBezierPath(ovalIn:NSRect(x:332,y:332,width:360,height:360))
 NSGradient(colors:[NSColor(calibratedRed:1,green:0.94,blue:0.72,alpha:1),NSColor(calibratedRed:1,green:0.59,blue:0.24,alpha:1)])!.draw(in:sun,angle:-60)
 for i in 0..<7 {
  let angle=Double(i)*Double.pi*2/7+0.2
  let x=512+cos(angle)*365,y=512+sin(angle)*365
  NSColor(calibratedWhite:0.6,alpha:0.22).setStroke();let line=NSBezierPath();line.move(to:NSPoint(x:512+cos(angle)*220,y:512+sin(angle)*220));line.line(to:NSPoint(x:x,y:y));line.lineWidth=2;line.stroke()
  NSColor(calibratedHue:CGFloat(i)/7,saturation:0.48,brightness:0.97,alpha:1).setFill();NSBezierPath(ovalIn:NSRect(x:x-14,y:y-14,width:28,height:28)).fill()
 }
 image.unlockFocus()
 let rep=NSBitmapImageRep(data:image.tiffRepresentation!)!
 let data=rep.representation(using:.png,properties:[:])!
 let names: [Int:[String]]=[16:["icon_16x16"],32:["icon_16x16@2x","icon_32x32"],64:["icon_32x32@2x"],128:["icon_128x128"],256:["icon_128x128@2x","icon_256x256"],512:["icon_256x256@2x","icon_512x512"],1024:["icon_512x512@2x"]]
 for name in names[size]! {try data.write(to:URL(fileURLWithPath:output+"/"+name+".png"))}
}
