import AppKit

// Rasterize the actual ICNS through AppKit, without opening or changing Oracle.app.
let root = URL(fileURLWithPath: CommandLine.arguments[1])
let output = root.appendingPathComponent("qa/native")
try FileManager.default.createDirectory(at: output, withIntermediateDirectories: true)
var records: [[String: Any]] = []
for mode in ["dark", "light", "mono-dark", "mono-light"] {
    let url = root.appendingPathComponent("recommended/legacy/Oracle-\(mode).icns")
    guard let source = NSImage(contentsOf: url) else { fatalError("Unable to read \(url.path)") }
    for points in [16, 32, 64, 128, 256, 512] {
        for scale in [1, 2] {
            let pixels = points * scale
            let bitmap = NSBitmapImageRep(bitmapDataPlanes: nil, pixelsWide: pixels,
                pixelsHigh: pixels, bitsPerSample: 8, samplesPerPixel: 4,
                hasAlpha: true, isPlanar: false, colorSpaceName: .deviceRGB,
                bytesPerRow: 0, bitsPerPixel: 0)!
            bitmap.size = NSSize(width: points, height: points)
            let graphics = NSGraphicsContext(bitmapImageRep: bitmap)!
            NSGraphicsContext.saveGraphicsState()
            NSGraphicsContext.current = graphics
            graphics.imageInterpolation = .high
            source.draw(in: NSRect(x: 0, y: 0, width: points, height: points),
                from: .zero, operation: .copy, fraction: 1,
                respectFlipped: true, hints: nil)
            NSGraphicsContext.restoreGraphicsState()
            let target = output.appendingPathComponent("\(mode)-\(points)pt-\(scale)x.png")
            try bitmap.representation(using: .png, properties: [:])!.write(to: target)
            records.append(["mode": mode, "points": points, "scale": scale,
                "pixels": pixels, "file": target.lastPathComponent,
                "renderer": "NSImage.draw / NSBitmapImageRep"])
        }
    }
}
let data = try JSONSerialization.data(withJSONObject: records, options: [.prettyPrinted, .sortedKeys])
try data.write(to: output.appendingPathComponent("render-receipt.json"))
print("Rendered \(records.count) native ICNS samples via AppKit.")
