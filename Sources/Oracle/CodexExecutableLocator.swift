import AppKit
import Foundation

/// Discovery only. Bundle identity selects Desktop independently of its filename.
/// Known CLI entry points remain a fallback; no shell or personal configuration is read.
enum OracleCodexExecutableLocator {
    static let desktopBundleIdentifier = "com.openai.codex"
    static let desktopLayouts = ["Contents/Resources/codex-cli/bin/codex", "Contents/Resources/codex"]

    static func systemExecutable() -> URL? {
        let home = FileManager.default.homeDirectoryForCurrentUser
        return locate(applicationRoots: [URL(fileURLWithPath: "/Applications"), home.appendingPathComponent("Applications")],
                      registeredApplication: NSWorkspace.shared.urlForApplication(withBundleIdentifier: desktopBundleIdentifier),
                      cliCandidates: [home.appendingPathComponent(".npm-global/bin/codex"),
                                      URL(fileURLWithPath: "/opt/homebrew/bin/codex"),
                                      URL(fileURLWithPath: "/usr/local/bin/codex")])
    }

    static func locate(applicationRoots: [URL], registeredApplication: URL? = nil, cliCandidates: [URL] = []) -> URL? {
        let manager = FileManager.default
        var applications = registeredApplication.map { [$0] } ?? []
        for root in applicationRoots {
            applications += ["Codex.app", "ChatGPT.app"].map { root.appendingPathComponent($0) }
            // Also handle a renamed Desktop bundle, with a bounded, shallow search.
            if let entries = try? manager.contentsOfDirectory(at: root, includingPropertiesForKeys: nil), entries.count <= 2000 {
                applications += entries.filter { $0.pathExtension == "app" }.sorted { $0.path < $1.path }
            }
        }
        var seen = Set<String>()
        for application in applications where seen.insert(application.standardizedFileURL.path).inserted {
            let bundle = application.standardizedFileURL.resolvingSymlinksInPath()
            let info = bundle.appendingPathComponent("Contents/Info.plist")
            guard contains(info.resolvingSymlinksInPath(), in: bundle),
                  let size = try? info.resourceValues(forKeys: [.fileSizeKey]).fileSize, size <= 256_000,
                  let data = try? Data(contentsOf: info),
                  let values = try? PropertyListSerialization.propertyList(from: data, format: nil) as? [String: Any],
                  values["CFBundleIdentifier"] as? String == desktopBundleIdentifier else { continue }
            for layout in desktopLayouts {
                let candidate = bundle.appendingPathComponent(layout)
                if contains(candidate.resolvingSymlinksInPath(), in: bundle), isExecutable(candidate) { return candidate }
            }
        }
        // CLI symlinks are normal (npm/Homebrew), but their destination must be a regular executable file.
        return cliCandidates.first(where: isExecutable)
    }

    private static func contains(_ file: URL, in directory: URL) -> Bool {
        file.path.hasPrefix(directory.path + "/")
    }

    private static func isExecutable(_ file: URL) -> Bool {
        let manager = FileManager.default, resolved = file.standardizedFileURL.resolvingSymlinksInPath()
        return manager.isExecutableFile(atPath: file.path) &&
            (try? manager.attributesOfItem(atPath: resolved.path)[.type] as? FileAttributeType) == .typeRegular
    }
}
