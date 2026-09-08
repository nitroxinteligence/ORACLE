import CoreGraphics
import Foundation
// Window metadata for the explicitly selected QA process, never another application.
let pid = Int(CommandLine.arguments[1])!
let windows = CGWindowListCopyWindowInfo(.optionOnScreenOnly, kCGNullWindowID) as? [[String: Any]] ?? []
let selected = windows.filter {
    ($0[kCGWindowOwnerPID as String] as? Int) == pid &&
    ($0[kCGWindowName as String] as? String) == "Oracle · Atlas Motion QA"
}
print(String(data: try! JSONSerialization.data(withJSONObject: selected, options: .sortedKeys), encoding: .utf8)!)
