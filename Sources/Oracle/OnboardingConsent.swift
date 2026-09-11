import Foundation
import CoreFoundation

/// JSON-RPC numeric and string IDs are distinct. Booleans/fractional IDs are not valid here.
func onboardingRPCKey(_ id: Any) -> String? {
    if let text = id as? String, !text.isEmpty, text.utf8.count <= 256 { return "s:" + text }
    if let number = id as? NSNumber, CFGetTypeID(number) != CFBooleanGetTypeID(),
        number.doubleValue.isFinite, number.doubleValue == Double(number.int64Value) { return "n:" + number.stringValue }
    return nil
}

struct OnboardingApproval {
    let id = UUID().uuidString
    let rpcID: Any
    let rpcKey: String
    let method: String
    let params: [String: Any]
    let thread: String
    let turn: String
    let generation: UUID
    var projection: [String: Any] {
        var p: [String: Any] = ["id": id, "kind": method, "generation": generation.uuidString,
            "reason": params["reason"] as? String ?? "O Codex precisa da sua confirmação."]
        for key in ["questions", "command", "cwd", "permissions", "grantRoot", "networkApprovalContext", "additionalPermissions", "availableDecisions"] {
            if let value = params[key] { p[key] = value }
        }
        return p
    }
    func response(_ answer: [String: Any]) throws -> [String: Any] {
        let allow = answer["allow"] as? Bool == true
        if method == "item/tool/requestUserInput" {
            guard let questions = params["questions"] as? [[String: Any]], !questions.isEmpty, questions.count <= 3 else { throw failure("Perguntas incompatíveis; nada foi enviado.") }
            let ids = questions.compactMap { $0["id"] as? String }
            guard ids.count == questions.count, Set(ids).count == ids.count else { throw failure("Perguntas duplicadas ou sem identificador.") }
            if answer["allow"] as? Bool == false, answer["answers"] == nil { return ["answers": [String: Any]()] }
            guard let answers = answer["answers"] as? [String: Any], Set(answers.keys) == Set(ids), (try jsonData(answers)).count <= 16384 else { throw failure("Responda as perguntas exibidas, sem incluir outros campos.") }
            for question in questions {
                let id = question["id"] as! String
                guard let value = answers[id] as? [String: Any], Set(value.keys) == ["answers"],
                    let selections = value["answers"] as? [String], !selections.isEmpty, selections.count <= 16,
                    selections.allSatisfy({ !$0.trimmingCharacters(in: .whitespacesAndNewlines).isEmpty && $0.utf8.count <= 4096 }) else { throw failure("Formato de resposta inválido.") }
                if let options = question["options"] as? [[String: Any]], !options.isEmpty, question["isOther"] as? Bool != true {
                    let labels = Set(options.compactMap { $0["label"] as? String })
                    guard selections.allSatisfy({ labels.contains($0) }) else { throw failure("Escolha uma opção apresentada pelo Codex.") }
                }
            }
            return ["answers": answers]
        }
        if method == "item/permissions/requestApproval" {
            // No client-supplied permission dictionary is trusted and no session-wide grant is possible.
            return ["permissions": allow ? params["permissions"] as? [String: Any] ?? [:] : [:], "scope": "turn"]
        }
        let decision = allow ? "accept" : "decline"
        if let available = params["availableDecisions"] as? [Any], !available.isEmpty,
            !available.contains(where: { ($0 as? String) == decision }) {
            if !allow && available.contains(where: { ($0 as? String) == "cancel" }) { return ["decision": "cancel"] }
            throw failure("O Codex não oferece essa decisão para esta solicitação.")
        }
        return ["decision": decision]
    }
}

/// Owned by OnboardingController.stateLock. Sensitive protocol payloads exist only in memory.
final class OnboardingConsentQueue {
    enum Intake { case queued, deferred, duplicate, rejected }
    private(set) var pending = [OnboardingApproval]()
    private(set) var early = [OnboardingApproval]()
    private var seen = Set<String>()
    private(set) var generation = UUID()
    private(set) var thread: String?
    private(set) var turn: String?
    static let supported: Set<String> = ["item/commandExecution/requestApproval", "item/fileChange/requestApproval", "item/permissions/requestApproval", "item/tool/requestUserInput"]

    func begin(thread: String, generation: UUID) {
        pending.removeAll(); early.removeAll(); self.thread = thread; turn = nil; self.generation = generation
        // IDs remain tombstoned for this transport so a replay cannot become a new consent.
    }
    func bind(turn: String) -> [Any] {
        self.turn = turn
        let rejected = early.filter { $0.turn != turn }.map(\.rpcID)
        pending += early.filter { $0.turn == turn && $0.generation == generation }
        early.removeAll(); return rejected
    }
    func receive(id: Any, method: String, params: [String: Any], generation: UUID) -> Intake {
        guard let key = onboardingRPCKey(id), generation == self.generation, let thread = params["threadId"] as? String,
            thread == self.thread, let turn = params["turnId"] as? String, !turn.isEmpty,
            Self.supported.contains(method), ((try? jsonData(params).count) ?? Int.max) <= 65536 else { return .rejected }
        if seen.contains(key) { return .duplicate }
        guard seen.count < 4096, pending.count + early.count < 32, self.turn == nil || self.turn == turn else { return .rejected }
        seen.insert(key)
        let request = OnboardingApproval(rpcID: id, rpcKey: key, method: method, params: params, thread: thread, turn: turn, generation: generation)
        if self.turn == nil { early.append(request); return .deferred }
        pending.append(request); return .queued
    }
    func resolve(thread: String, rpcID: Any) -> Bool {
        guard thread == self.thread, let key = onboardingRPCKey(rpcID) else { return false }
        let before = pending.count + early.count
        pending.removeAll { $0.rpcKey == key }; early.removeAll { $0.rpcKey == key }
        if seen.count < 4096 { seen.insert(key) } // resolved may race ahead of its request
        return before != pending.count + early.count
    }
    func take(id: String, generation: UUID?) throws -> OnboardingApproval {
        guard let first = pending.first, first.id == id, first.generation == self.generation,
            generation == nil || generation == first.generation else { throw failure("Solicitação expirada, já respondida ou fora da ordem. Revise a solicitação atual.") }
        pending.removeFirst(); return first
    }
    func invalidate(newTransport: Bool = false) -> [Any] {
        let ids = (pending + early).map(\.rpcID)
        pending.removeAll(); early.removeAll(); thread = nil; turn = nil; generation = UUID()
        if newTransport { seen.removeAll() }
        return ids
    }
}
