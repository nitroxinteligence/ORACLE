import Foundation

func runCodexExecutableLocatorTests(root: URL) throws {
    let manager = FileManager.default
    try manager.createDirectory(at: root, withIntermediateDirectories: true)
    var count = 0
    func check(_ value: Bool, _ label: String) throws {
        guard value else { throw NSError(domain: "OracleCodexLocatorTests", code: 1, userInfo: [NSLocalizedDescriptionKey: label]) }
        count += 1; print("PASS " + label)
    }
    func executable(_ url: URL, permissions: Int = 0o755) throws {
        try manager.createDirectory(at: url.deletingLastPathComponent(), withIntermediateDirectories: true)
        try Data("#!/bin/sh\nexit 0\n".utf8).write(to: url)
        try manager.setAttributes([.posixPermissions: permissions], ofItemAtPath: url.path)
    }
    func bundle(_ url: URL, id: String = OracleCodexExecutableLocator.desktopBundleIdentifier, layout: String = OracleCodexExecutableLocator.desktopLayouts[0]) throws -> URL {
        let binary = url.appendingPathComponent(layout)
        try executable(binary)
        let plist = try PropertyListSerialization.data(fromPropertyList: ["CFBundleIdentifier": id], format: .xml, options: 0)
        try plist.write(to: url.appendingPathComponent("Contents/Info.plist"))
        return binary
    }
    let system = root.appendingPathComponent("Applications"), user = root.appendingPathComponent("user/Applications")
    let desktop = system.appendingPathComponent("ChatGPT.app")
    let modern = try bundle(desktop)
    try check(OracleCodexExecutableLocator.locate(applicationRoots: [system, user]) == modern, "Desktop alone resolves modern launcher without CLI fallback")
    let cli = root.appendingPathComponent("npm/bin/codex"); try executable(cli)
    try check(OracleCodexExecutableLocator.locate(applicationRoots: [system], cliCandidates: [cli]) == modern, "Desktop takes precedence over separately installed CLI")
    try manager.removeItem(at: desktop)
    let userDesktop = user.appendingPathComponent("ChatGPT.app"), userBinary = try bundle(userDesktop)
    try check(OracleCodexExecutableLocator.locate(applicationRoots: [system, user]) == userBinary, "user Applications installation is discovered")
    try manager.removeItem(at: userDesktop)
    let renamed = user.appendingPathComponent("Workspace.app"), renamedBinary = try bundle(renamed)
    try check(OracleCodexExecutableLocator.locate(applicationRoots: [user]) == renamedBinary, "renamed Desktop is selected by bundle identity")
    try check(OracleCodexExecutableLocator.locate(applicationRoots: [], registeredApplication: renamed) == renamedBinary, "registered bundle can be outside standard installation roots")
    try manager.removeItem(at: renamed)
    let legacy = try bundle(desktop, layout: OracleCodexExecutableLocator.desktopLayouts[1])
    try check(OracleCodexExecutableLocator.locate(applicationRoots: [system]) == legacy, "verified legacy Desktop layout remains supported")
    try manager.removeItem(at: desktop)
    _ = try bundle(desktop, id: "com.openai.chat")
    try check(OracleCodexExecutableLocator.locate(applicationRoots: [system]) == nil, "ChatGPT name alone cannot identify Codex Desktop")
    try check(OracleCodexExecutableLocator.locate(applicationRoots: [system], cliCandidates: [cli]) == cli, "regular CLI remains an explicit fallback")
    try manager.removeItem(at: desktop)
    let nonExecutable = try bundle(desktop)
    try manager.setAttributes([.posixPermissions: 0o644], ofItemAtPath: nonExecutable.path)
    try check(OracleCodexExecutableLocator.locate(applicationRoots: [system]) == nil, "nonexecutable Desktop entry point is rejected")
    try manager.removeItem(at: nonExecutable)
    try manager.createDirectory(at: nonExecutable, withIntermediateDirectories: true)
    try check(OracleCodexExecutableLocator.locate(applicationRoots: [system]) == nil, "executable directory cannot serve as entry point")
    try manager.removeItem(at: nonExecutable)
    try manager.createSymbolicLink(at: nonExecutable, withDestinationURL: cli)
    try check(OracleCodexExecutableLocator.locate(applicationRoots: [system]) == nil, "Desktop entry point cannot escape bundle through symlink")
    let cliLink = root.appendingPathComponent("brew/bin/codex")
    try manager.createDirectory(at: cliLink.deletingLastPathComponent(), withIntermediateDirectories: true)
    try manager.createSymbolicLink(at: cliLink, withDestinationURL: cli)
    try check(OracleCodexExecutableLocator.locate(applicationRoots: [], cliCandidates: [cliLink]) == cliLink, "CLI symlink to regular executable remains supported")
    try manager.removeItem(at: desktop)
    _ = try bundle(desktop)
    let info = desktop.appendingPathComponent("Contents/Info.plist"), externalInfo = root.appendingPathComponent("external.plist")
    try manager.moveItem(at: info, to: externalInfo)
    try manager.createSymbolicLink(at: info, withDestinationURL: externalInfo)
    try check(OracleCodexExecutableLocator.locate(applicationRoots: [system]) == nil, "bundle identity plist cannot escape bundle")
    print("Codex executable locator: \(count) isolated checks passed")
}
