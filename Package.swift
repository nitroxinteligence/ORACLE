// swift-tools-version: 5.9
import PackageDescription
let package = Package(name: "Oracle", platforms: [.macOS(.v13)], products: [.executable(name: "Oracle", targets: ["Oracle"])], targets: [.executableTarget(name: "Oracle", path: "Sources/Oracle")])
