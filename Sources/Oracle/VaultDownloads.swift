import Foundation

/// Only an explicit installation requests cloud downloads. Scans stay read-only.
enum OracleVaultDownloads {
    static func prepare(_ files:[URL],request:(URL)throws->Void,available:(URL)throws->Bool,
                        progress:(Int,Int)throws->Void,timeout:TimeInterval=180,
                        now:()->TimeInterval={ProcessInfo.processInfo.systemUptime},
                        sleep:()->Void={Thread.sleep(forTimeInterval:1)}) throws {
        let deadline=now()+timeout
        var pending=files,requested=Set<URL>()
        while !pending.isEmpty {
            pending=try pending.filter{try !available($0)}
            try progress(files.count-pending.count,files.count)
            if pending.isEmpty{return}
            guard now()<deadline else{throw failure("O macOS ainda está baixando arquivos do vault. Aguarde o download e tente instalar novamente. Nenhuma nota foi substituída nesta preparação.")}
            for file in pending where !requested.contains(file) {
                guard now()<deadline else{throw failure("O macOS ainda está preparando os downloads. Aguarde e tente instalar novamente.")}
                try request(file);requested.insert(file)
                if requested.count%25==0 {try progress(files.count-pending.count,files.count)}
            }
            sleep()
        }
    }
}

extension Core {
    func prepareVaultDownloads(progress:(Int,Int)throws->Void) throws {
        let root=try vault(),snapshot=try scanSnapshot(root:root)
        let pending=try snapshot.entries.filter{$0["available"] as? Bool==false}.compactMap { row -> URL? in
            guard let path=row["path"] as? String else{return nil}
            return try scoped(path,root:root)
        }
        let pendingBytes=snapshot.entries.filter{$0["available"] as? Bool==false}.reduce(Int64(0)){$0+Int64($1["size"] as? Int ?? 0)}
        guard pendingBytes<=128_000_000 else{throw failure("O download pendente excede o limite de 128 MB de Markdown. Revise o escopo do vault antes de instalar.")}
        if !pending.isEmpty {
            let free=try root.resourceValues(forKeys:[.volumeAvailableCapacityForImportantUsageKey]).volumeAvailableCapacityForImportantUsage ?? 0
            guard free>=pendingBytes+64_000_000 else{throw failure("Libere espaço no Mac para baixar os arquivos pendentes do vault.")}
        }
        try OracleVaultDownloads.prepare(pending,request:{file in
            guard try file.resourceValues(forKeys:[.isUbiquitousItemKey]).isUbiquitousItem==true else {
                throw failure("Um arquivo do vault ainda está somente na nuvem. No Finder, baixe a pasta do vault pelo seu provedor e tente novamente: "+file.lastPathComponent)
            }
            try fm.startDownloadingUbiquitousItem(at:file)
        },available:{file in
            guard try scoped(String(file.path.dropFirst(root.path.count+1)),root:root)==file else{throw failure("O destino do download mudou.")}
            var info=stat();guard lstat(file.path,&info)==0 else{throw failure("Arquivo indisponível durante o download.")}
            return info.st_flags & 0x40000000 == 0
        },progress:progress)
    }
}
