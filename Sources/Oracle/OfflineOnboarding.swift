import Foundation

/// Local-only driver; injection lets tests exercise sequencing without a model, external profile or login.
protocol OfflineInstallationDriver {
    func apply(_ core: Core) throws
    func prepare(_ core: Core) throws -> [String: Any]
    func finish(_ core: Core) throws
    func prepareBridge(_ core: Core) throws
    func verify(_ core: Core) throws -> [String: Any]
}
struct NativeOfflineInstallation: OfflineInstallationDriver {
    func apply(_ core: Core) throws { _ = try core.applyPlan() }
    func prepare(_ core: Core) throws -> [String: Any] {
        let lock = try core.acquireOperationLock("gbrain"); defer { core.releaseOperationLock(lock) }
        return try core.prepareGBrain()
    }
    func finish(_ core: Core) throws {
        let lock = try core.acquireOperationLock("gbrain"); defer { core.releaseOperationLock(lock) }
        _ = try core.finishGBrain()
    }
    func prepareBridge(_ core: Core) throws {
        let setup = try core.acquireOperationLock("setup"); defer { core.releaseOperationLock(setup) }
        let brain = try core.acquireOperationLock("gbrain"); defer { core.releaseOperationLock(brain) }
        _ = try core.prepareBridge()
    }
    func verify(_ core: Core) throws -> [String: Any] { try core.onboardingFinalVerification() }
}

extension Core {
    func onboardingReview() throws -> [String: Any]? {
        guard let plan = try? readJSON(home.appendingPathComponent("setup/plan.json")),
            let hash = plan["plan_hash"] as? String, let id = plan["id"] as? String,
            id == onboardingRecord()["runID"] as? String, plan["vault"] as? String == config["vault"] as? String,
            hash == (try planDigest(plan)), plan["answers_hash"] as? String == digest(try jsonData(plan["answers"] ?? [:])) else { return nil }
        // The plan's private canonical vault path does not need to cross the UI bridge.
        var review = plan
        review.removeValue(forKey: "vault"); review["executor"] = "native-local"
        review["hash"] = hash; review["planHash"] = hash
        return review
    }
}
