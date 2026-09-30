import Foundation
import CoreFoundation
import Darwin

/// An explicit, local CLI adapter. Consent, receipt and writer rules stay in Core.
enum OracleMemoryCommand {
    static let operations:Set<String>=["status","ai-configure","ai-candidates","ai-preview","ai-export","ai-recovery-preview","ai-recover","vault-backup-status","vault-backup-configure","vault-backup-create","vault-backup-restore","cache-status","cache-prune"]
    static let reads:Set<String>=["status","ai-candidates","ai-preview","ai-recovery-preview","vault-backup-status","cache-status"]
    struct Request {let operation:String;let input:URL?}

    static func request(arguments:[String])throws->Request {
        var values=[String:String](),index=1
        while index<arguments.count {
            let key=arguments[index]
            guard ["--memory","--memory-input","--state"].contains(key),values[key]==nil,index+1<arguments.count,!arguments[index+1].hasPrefix("--") else {
                throw failure("Use --memory <op> [--memory-input arquivo-json] [--state diretório]. Testes e outras operações exigem invocações separadas.")
            }
            values[key]=arguments[index+1];index+=2
        }
        guard let operation=values["--memory"],operations.contains(operation) else {throw failure("Operação de memória inválida: "+operations.sorted().joined(separator:", ")+".")}
        return Request(operation:operation,input:values["--memory-input"].map{URL(fileURLWithPath:$0)})
    }

    static func input(file:URL?)throws->[String:Any] {
        guard let file else{return [:]}
        let path=file.standardizedFileURL
        guard path.resolvingSymlinksInPath().path==path.path else{throw failure("O JSON de memória deve ser um arquivo regular sem symlinks.")}
        // Hold each parent descriptor so replacing an ancestor cannot redirect
        // this read to a link introduced after the path check.
        var parent=Darwin.open("/",O_RDONLY|O_DIRECTORY|O_NOFOLLOW|O_CLOEXEC)
        guard parent>=0 else{throw failure("Não foi possível conferir o caminho do JSON.")}
        defer{Darwin.close(parent)}
        let components=path.pathComponents.dropFirst()
        for component in components.dropLast() {
            let next=openat(parent,component,O_RDONLY|O_DIRECTORY|O_NOFOLLOW|O_CLOEXEC)
            guard next>=0 else{throw failure("O caminho do JSON contém um link ou diretório indisponível.")}
            Darwin.close(parent);parent=next
        }
        guard let name=components.last else{throw failure("Escolha um arquivo JSON regular.")}
        let descriptor=openat(parent,name,O_RDONLY|O_NOFOLLOW|O_NONBLOCK|O_CLOEXEC)
        guard descriptor>=0 else{throw failure("Não foi possível abrir o JSON de memória sem seguir links.")}
        defer{Darwin.close(descriptor)}
        var before=stat()
        guard fstat(descriptor,&before)==0,before.st_mode&S_IFMT==S_IFREG,before.st_size>=0,before.st_size<=1_000_000 else{throw failure("O JSON de memória deve ser regular e ter até 1 MB.")}
        let handle=FileHandle(fileDescriptor:descriptor,closeOnDealloc:false)
        let bytes=try handle.read(upToCount:1_000_001) ?? Data()
        var after=stat(),current=stat()
        guard bytes.count==Int(before.st_size),bytes.count<=1_000_000,fstat(descriptor,&after)==0,lstat(path.path,&current)==0,
              after.st_size==before.st_size,after.st_mtimespec.tv_sec==before.st_mtimespec.tv_sec,after.st_mtimespec.tv_nsec==before.st_mtimespec.tv_nsec,after.st_ctimespec.tv_sec==before.st_ctimespec.tv_sec,after.st_ctimespec.tv_nsec==before.st_ctimespec.tv_nsec,
              current.st_dev==before.st_dev,current.st_ino==before.st_ino,current.st_mode&S_IFMT==S_IFREG else{throw failure("O JSON mudou durante a leitura. Confira o arquivo e tente novamente.")}
        guard let object=try JSONSerialization.jsonObject(with:bytes) as? [String:Any] else{throw failure("O JSON de memória deve conter um objeto.")}
        return object
    }

    static func run(core:Core,operation:String,input:[String:Any]=[:])throws->[String:Any] {
        guard operations.contains(operation) else{throw failure("Operação de memória desconhecida.")}
        try core.requireCapability(reads.contains(operation) ? .useOracle : .configure)
        let fields:[String:Set<String>]=[
            "ai-configure":["enabled","source","includeSessions","scopeToken"],"ai-candidates":["offset"],
            "ai-preview":["id","snapshot"],"ai-export":["ids","confirmed","snapshot"],"ai-recover":["confirmed","previewID"],
            "vault-backup-configure":["enabled","destination","exclusions","scopeToken"],
            "vault-backup-restore":["id","destination","confirmed"],"cache-prune":["confirmed","previewID"]]
        guard Set(input.keys).isSubset(of:fields[operation] ?? []) else{throw failure("Campos inesperados no JSON para "+operation+".")}
        func string(_ key:String)throws->String {guard let value=input[key] as? String,!value.isEmpty else{throw failure("Informe "+key+" no JSON.")};return value}
        func boolean(_ key:String,default fallback:Bool?=nil)throws->Bool {
            if input[key]==nil,let fallback{return fallback}
            guard let value=input[key] as? NSNumber,CFGetTypeID(value)==CFBooleanGetTypeID() else{throw failure("Informe "+key+" como true ou false.")};return value.boolValue
        }
        func strings(_ key:String,default fallback:[String]?=nil)throws->[String] {
            if input[key]==nil,let fallback{return fallback}
            guard let values=input[key] as? [String] else{throw failure("Informe "+key+" como lista de textos.")};return values
        }
        func url(_ key:String)throws->URL {let path=try string(key);guard path.hasPrefix("/") else{throw failure("Informe "+key+" como caminho absoluto explicitamente escolhido.")};return URL(fileURLWithPath:path)}
        switch operation {
        case "status":return try core.withMemoryPortabilitySelection {
            ["scopeToken":try core.memoryPortabilityScope(),"aiMemory":core.aiMemoryVaultExportStatus(),"aiMemoryRuntime":core.aiMemoryProvisioningStatus(),"vaultBackup":core.vaultBackupStatus(),"runtime":core.codexRuntimeBindingStatus(),"maintenance":try core.maintenanceSnapshot(),"router":core.oracleSkillInstallationStatus(),"manual":true,"network":false]
        }
        case "ai-configure":
            let enabled=try boolean("enabled"),includeSessions=try boolean("includeSessions",default:false)
            let source=input["source"]==nil ? nil : try url("source")
            return try core.withMemoryPortabilitySelection(expectedScope:enabled ? try string("scopeToken") : nil) {
                try core.configureAIMemoryVaultExport(enabled:enabled,source:source,includeSessions:includeSessions)
            }
        case "ai-candidates":
            var offset=0
            if let raw=input["offset"] {
                guard let number=raw as? NSNumber,CFGetTypeID(number) != CFBooleanGetTypeID(),number.doubleValue>=0,number.doubleValue<=Double(Int32.max),number.doubleValue.rounded()==number.doubleValue else{throw failure("offset precisa ser um inteiro não negativo.")};offset=number.intValue
            }
            return try core.aiMemoryVaultExportCandidates(offset:offset)
        case "ai-preview":return try core.aiMemoryVaultExportPreview(id:string("id"),snapshot:string("snapshot"))
        case "ai-export":return try core.exportAIMemoryPages(ids:strings("ids"),confirmed:boolean("confirmed"),snapshot:input["snapshot"]==nil ? nil : string("snapshot"))
        case "ai-recovery-preview":return try core.aiMemoryVaultExportRecoveryPreview()
        case "ai-recover":return try core.resolveAIMemoryVaultExportRecovery(confirmed:boolean("confirmed"),previewID:string("previewID"))
        case "vault-backup-status":return core.vaultBackupStatus()
        case "vault-backup-configure":
            let enabled=try boolean("enabled"),destination=input["destination"]==nil ? nil : try url("destination"),exclusions=try strings("exclusions",default:[])
            return try core.withMemoryPortabilitySelection(expectedScope:enabled ? try string("scopeToken") : nil) {
                try core.configureVaultBackupConsent(enabled:enabled,destination:destination,exclusions:exclusions)
            }
        case "vault-backup-create":return try core.createVaultBackup()
        case "vault-backup-restore":return try core.restoreVaultBackup(id:string("id"),destination:url("destination"),confirmed:boolean("confirmed"))
        case "cache-status":return try core.updateCacheStatus()
        case "cache-prune":return try core.pruneUpdateCache(confirmed:boolean("confirmed"),previewID:string("previewID"))
        default:throw failure("Operação de memória desconhecida.")
        }
    }
}
