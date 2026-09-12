import Foundation
import AppKit
import ImageIO
import UniformTypeIdentifiers

/// Local gallery covers only. The WebView receives a bounded PNG, never a file URL,
/// executable SVG, remote fetch, or wider read access to the vault.
enum LibraryImageReader {
    static let byteLimit = 16_000_000
    static let extensions: Set<String> = ["png", "jpg", "jpeg", "webp", "gif", "heic", "heif", "svg"]

    static func read(reference input: String, source: String, root: URL, scoped: (String) throws -> URL) throws -> [String: Any] {
        let parts = source.split(separator: "/")
        guard parts.count > 2, parts[0].lowercased() == "sistema",
              ["prompts", "tutoriais"].contains(parts[1].lowercased()),
              (source as NSString).pathExtension.lowercased() == "md" else {
            throw failure("A capa precisa pertencer a uma nota de Prompts ou Tutoriais.")
        }
        let note = try scoped(source)
        let noteValues = try note.resourceValues(forKeys: [.isRegularFileKey, .fileSizeKey])
        guard noteValues.isRegularFile == true, (noteValues.fileSize ?? Int.max) <= 2_000_000 else {
            throw failure("Nota de origem indisponível.")
        }
        var reference = input.trimmingCharacters(in: .whitespacesAndNewlines)
        guard !reference.isEmpty, reference.count <= 4096 else { throw failure("Referência de imagem inválida.") }
        if reference.hasPrefix("!") { reference.removeFirst() }
        let wiki = reference.hasPrefix("[[") && reference.hasSuffix("]]")
        if wiki { reference = String(reference.dropFirst(2).dropLast(2)).components(separatedBy: "|")[0] }
        if reference.hasPrefix("<"), reference.hasSuffix(">") { reference = String(reference.dropFirst().dropLast()) }
        reference = reference.components(separatedBy: "#")[0]
        guard let decoded = reference.removingPercentEncoding else { throw failure("Referência de imagem inválida.") }
        reference = decoded.trimmingCharacters(in: .whitespacesAndNewlines)
        guard !reference.isEmpty, reference.rangeOfCharacter(from: .controlCharacters) == nil,
              !reference.contains("\\"), !reference.hasPrefix("//"), !reference.contains("?"),
              reference.range(of: "^[A-Za-z][A-Za-z0-9+.-]*:", options: .regularExpression) == nil,
              extensions.contains((reference as NSString).pathExtension.lowercased()) else {
            throw failure("A capa precisa ser uma imagem local compatível.")
        }
        func normalized(_ path: String, from base: [String]) throws -> String {
            var result = base
            for part in path.split(separator: "/").map(String.init) {
                if part == "." { continue }
                if part == ".." {
                    guard !result.isEmpty else { throw failure("A imagem sai do vault autorizado.") }
                    result.removeLast()
                } else { result.append(part) }
            }
            guard !result.isEmpty else { throw failure("Caminho de imagem inválido.") }
            return result.joined(separator: "/")
        }
        let noteFolder = source.split(separator: "/").dropLast().map(String.init)
        let rooted = reference.hasPrefix("/")
        let explicitRelative = reference.hasPrefix("./") || reference.hasPrefix("../")
        let relative = try normalized(reference, from: rooted ? [] : noteFolder)
        var candidates = [relative]
        if !rooted && !explicitRelative {
            let vaultRelative = try normalized(reference, from: [])
            candidates = wiki ? [vaultRelative, relative] : [relative, vaultRelative]
        }
        var chosen: URL?
        for candidate in candidates {
            let url = try scoped(candidate)
            if fm.fileExists(atPath: url.path) { chosen = url; break }
        }
        // Obsidian's short wikilinks may point into an attachment directory.
        // An incomplete scan or duplicate filename never picks an arbitrary cover.
        if chosen == nil && !rooted && !explicitRelative {
            var incomplete = false, matches = [URL](), count = 0
            let started = Date()
            let keys: Set<URLResourceKey> = [.isDirectoryKey, .isRegularFileKey, .isSymbolicLinkKey]
            guard let enumerator = fm.enumerator(at: root, includingPropertiesForKeys: Array(keys), options: [.skipsHiddenFiles], errorHandler: { _, _ in incomplete = true; return false }) else {
                throw failure("Não foi possível consultar os anexos do vault.")
            }
            let suffix = reference.precomposedStringWithCanonicalMapping.lowercased()
            for case let url as URL in enumerator {
                count += 1
                if count > 100_000 || Date().timeIntervalSince(started) > 3 { incomplete = true; break }
                let values = try url.resourceValues(forKeys: keys)
                if values.isSymbolicLink == true { enumerator.skipDescendants(); continue }
                guard values.isRegularFile == true else { continue }
                let path = String(url.path.dropFirst(root.path.count + 1))
                let folded = path.precomposedStringWithCanonicalMapping.lowercased()
                if folded == suffix || folded.hasSuffix("/" + suffix) {
                    matches.append(try scoped(path))
                    if matches.count > 1 { break }
                }
            }
            guard !incomplete else { throw failure("Busca de anexos incompleta. Use o caminho completo da imagem na nota.") }
            guard matches.count < 2 else { throw failure("Há mais de uma imagem com esse nome. Use o caminho completo na nota.") }
            chosen = matches.first
        }
        guard let url = chosen else { throw failure("Imagem não encontrada no vault autorizado.") }
        let values = try url.resourceValues(forKeys: [.isRegularFileKey, .fileSizeKey])
        guard values.isRegularFile == true, (values.fileSize ?? Int.max) <= byteLimit else {
            throw failure("A imagem excede o limite de 16 MB ou não é um arquivo regular.")
        }
        let handle = try FileHandle(forReadingFrom: url)
        defer { try? handle.close() }
        let data = try handle.read(upToCount: byteLimit + 1) ?? Data()
        guard data.count <= byteLimit, !data.isEmpty else { throw failure("Imagem indisponível ou grande demais.") }
        let png = try thumbnail(data, svg: url.pathExtension.lowercased() == "svg")
        return ["dataURL": "data:image/png;base64," + png.base64EncodedString(),
                "path": String(url.path.dropFirst(root.path.count + 1))]
    }

    static func thumbnail(_ data: Data, svg: Bool) throws -> Data {
        let image: CGImage
        if svg {
            guard let safe = SafePluginSVG.sanitize(data), let native = NSImage(data: safe),
                  native.size.width.isFinite, native.size.height.isFinite,
                  native.size.width > 0, native.size.height > 0,
                  native.size.width <= 16_384, native.size.height <= 16_384 else {
                throw failure("Este SVG não pode ser usado como capa.")
            }
            let ratio = min(1, min(960 / native.size.width, 960 / native.size.height))
            let width = max(1, Int((native.size.width * ratio).rounded()))
            let height = max(1, Int((native.size.height * ratio).rounded()))
            guard let colorSpace = CGColorSpace(name: CGColorSpace.sRGB),
                  let canvas = CGContext(data: nil, width: width, height: height, bitsPerComponent: 8, bytesPerRow: width * 4, space: colorSpace, bitmapInfo: CGImageAlphaInfo.premultipliedLast.rawValue) else {
                throw failure("Não foi possível preparar a capa.")
            }
            var rect = NSRect(x: 0, y: 0, width: width, height: height)
            guard let raster = native.cgImage(forProposedRect: &rect, context: nil, hints: nil) else { throw failure("SVG indisponível.") }
            canvas.interpolationQuality = .high
            canvas.draw(raster, in: CGRect(x: 0, y: 0, width: width, height: height))
            guard let output = canvas.makeImage() else { throw failure("Capa indisponível.") }
            image = output
        } else {
            let types: Set<String> = [UTType.png.identifier, UTType.jpeg.identifier, UTType.gif.identifier, UTType.heic.identifier, "public.heif", "org.webmproject.webp"]
            guard let source = CGImageSourceCreateWithData(data as CFData, [kCGImageSourceShouldCache: false] as CFDictionary),
                  let type = CGImageSourceGetType(source) as String?, types.contains(type),
                  let properties = CGImageSourceCopyPropertiesAtIndex(source, 0, nil) as? [CFString: Any],
                  let width = properties[kCGImagePropertyPixelWidth] as? Int,
                  let height = properties[kCGImagePropertyPixelHeight] as? Int,
                  width > 0, height > 0, width <= 16_384, height <= 16_384, width * height <= 67_108_864 else {
                throw failure("Formato ou dimensões da imagem não suportados.")
            }
            let options: [CFString: Any] = [kCGImageSourceCreateThumbnailFromImageAlways: true,
                kCGImageSourceThumbnailMaxPixelSize: 960, kCGImageSourceCreateThumbnailWithTransform: true,
                kCGImageSourceShouldCacheImmediately: false]
            guard let raster = CGImageSourceCreateThumbnailAtIndex(source, 0, options as CFDictionary) else {
                throw failure("Não foi possível preparar a capa.")
            }
            image = raster
        }
        let output = NSMutableData()
        guard let destination = CGImageDestinationCreateWithData(output, UTType.png.identifier as CFString, 1, nil) else { throw failure("Capa indisponível.") }
        CGImageDestinationAddImage(destination, image, nil)
        guard CGImageDestinationFinalize(destination), output.length < 4_000_000 else { throw failure("A capa excede o limite de exibição.") }
        return output as Data
    }
}

extension Core {
    func readLibraryImage(_ params: [String: Any]) throws -> [String: Any] {
        refreshConfig()
        let root = try vault()
        return try LibraryImageReader.read(reference: params["reference"] as? String ?? "",
            source: params["source"] as? String ?? "", root: root,
            scoped: { try self.scoped($0, root: root) })
    }
}
