import Foundation

/// Daily hook capture projection, separately consented Codex synthesis and backup.
/// No global launch agent or fabricated host automation registration.
final class OracleLocalServices {
    private let home:URL
    private let queue=DispatchQueue(label:"oracle.local-services",qos:.utility)
    private let mutex=NSLock()
    private var timer:DispatchSourceTimer?
    private var paused=true
    private var scheduled=false

    init(home:URL) {self.home=home}
    func start(paused:Bool) {
        setPaused(paused)
        guard timer==nil else{return}
        let source=DispatchSource.makeTimerSource(queue:DispatchQueue.global(qos:.utility))
        source.schedule(deadline:.now()+10,repeating:120,leeway:.seconds(15))
        source.setEventHandler {[weak self] in self?.request()}
        timer=source;source.resume()
    }
    func setPaused(_ value:Bool) {mutex.lock();paused=value;mutex.unlock()}
    func isPaused() -> Bool {mutex.lock();defer{mutex.unlock()};return paused}
    func stop() {setPaused(true);timer?.cancel();timer=nil}
    deinit {timer?.cancel()}

    /// Coalesces editor saves, wake-ups and timer ticks into one pending scan.
    func request() {
        mutex.lock()
        guard !paused,!scheduled else{mutex.unlock();return}
        scheduled=true;mutex.unlock()
        queue.asyncAfter(deadline:.now()+2) {[weak self] in
            guard let self else{return}
            defer{self.mutex.lock();self.scheduled=false;self.mutex.unlock()}
            self.mutex.lock();let paused=self.paused;self.mutex.unlock()
            guard !paused else{return}
            do {
                let service=try Core(home:self.home)
                guard service.config["gbrainWorkspace"]==nil,
                      service.config["gbrainAccess"] as? Bool != false,
                      service.config["gbrainVaultSource"] as? String=="oracle-vault" else{return}
                let state=service.onboardingRecord()
                guard state["status"] as? String=="completed" || service.onboardingLegacyAccess() else{return}
                if (try service.maintenanceSnapshot())["due"] as? Bool==true {
                    _=try service.performMaintenance(cancelled:{self.isPaused()}) {try service.syncGBrainVault()}
                }
                // Basic indexing has one authority: MemorySyncCoordinator.
                // This timer runs only the separately consented daily maintenance.
            } catch {
                // Sync/maintenance APIs retain their own failed receipts. A
                // busy lock is retried at the next opportunity, not spun on.
            }
        }
    }
}
