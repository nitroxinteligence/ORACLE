import Foundation

/// Access is serialized by the controller's stateLock. Never rely on dictionary order.
struct OracleOnboardingApprovalQueue {
    struct Pending {
        let key: String
        let rpcID: Any
        let method: String
        let parameters: [String: Any]
        let turnID: String?
        let presentation: [String: Any]
    }
    private var order = [String]()
    private var values = [String: Pending]()
    var first: Pending? { order.first.flatMap { values[$0] } }
    var count: Int { order.count }
    func containsRPC(_ id: Any) -> Bool {
        values.values.contains { String(reflecting: $0.rpcID) == String(reflecting: id) }
    }
    mutating func append(_ request: Pending) -> Bool {
        guard values[request.key] == nil, order.count < 32, !containsRPC(request.rpcID) else { return false }
        values[request.key] = request; order.append(request.key); return true
    }
    func request(_ key: String) -> Pending? { values[key] }
    mutating func remove(_ key: String) { values.removeValue(forKey: key); order.removeAll { $0 == key } }
    mutating func drain() -> [Pending] {
        let result = order.compactMap { values[$0] }; order.removeAll(); values.removeAll(); return result
    }
    static func belongsToTurn(_ pending: Pending, currentThread: String?, currentTurn: String?) -> Bool {
        guard let thread = pending.parameters["threadId"] as? String, thread == currentThread else { return false }
        if let expected = pending.turnID { return currentTurn == expected }
        return true
    }
}
