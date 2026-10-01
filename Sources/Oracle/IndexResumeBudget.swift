import Foundation

/// Only a genuine time exhaustion from the current request may advance the next
/// finite window. Derive the expected hint locally, never accept an arbitrary cap.
enum OracleIndexResumeBudget {
    static let initial:Double=25
    static let maximum:Double=480
    /// A periodic check must not reset a still-unfinished snapshot's retries,
    /// even when its last explicit window lasted longer than the check interval.
    static func beginDeepVerification(due:Bool,indexing:Bool,blocked:Bool,generation:Int,indexedGeneration:Int?)->Bool {
        due && !indexing && !blocked && indexedGeneration==generation
    }
    static func next(_ current:Double,result:[String:Any])->Double {
        let budget=min(maximum,max(initial,current))
        let expected=min(maximum,max(120,budget*2))
        guard result["needs_resume"] as? Bool==true,result["budget_exhausted"] as? Bool==true,
              (result["budget_ms"] as? NSNumber)?.doubleValue==budget*1000,
              (result["recommended_budget_ms"] as? NSNumber)?.doubleValue==expected*1000 else{return budget}
        return expected
    }
}
