import Foundation
import Darwin

/// Local MCP readiness only. This never asks Codex/model, opens an HTTP port,
/// reads the vault, or calls memory tools that ingest content.
enum OracleAIMemoryProvisioningProbe {
    static func run(binary:URL,args:[String],cwd:URL,environment:[String:String])throws->[String:Any] {
        let process=Process(),input=Pipe(),output=Pipe(),errors=Pipe()
        process.executableURL=binary;process.arguments=args;process.currentDirectoryURL=cwd;process.environment=environment
        process.standardInput=input;process.standardOutput=output;process.standardError=errors
        let out=output.fileHandleForReading.fileDescriptor,err=errors.fileHandleForReading.fileDescriptor
        _=fcntl(out,F_SETFL,O_NONBLOCK);_=fcntl(err,F_SETFL,O_NONBLOCK)
        try process.run()
        defer {
            try? input.fileHandleForWriting.close()
            if process.isRunning {process.terminate();let until=Date().addingTimeInterval(1);while process.isRunning,Date()<until{Thread.sleep(forTimeInterval:0.01)};if process.isRunning{kill(process.processIdentifier,SIGKILL)}}
            try? output.fileHandleForReading.close();try? errors.fileHandleForReading.close()
        }
        func send(_ value:[String:Any])throws {try input.fileHandleForWriting.write(contentsOf:JSONSerialization.data(withJSONObject:value)+Data([10]))}
        var pending=Data(),stderr=Data(),seen=0
        func receive(_ id:Int)throws->[String:Any] {
            let deadline=Date().addingTimeInterval(25)
            var buffer=[UInt8](repeating:0,count:32_768)
            while Date()<deadline {
                let count=Darwin.read(out,&buffer,buffer.count)
                if count>0 {pending.append(contentsOf:buffer.prefix(count));seen+=count}
                let errorCount=Darwin.read(err,&buffer,buffer.count)
                if errorCount>0{stderr.append(contentsOf:buffer.prefix(errorCount))}
                guard seen<=8_000_000,stderr.count<=512_000 else{throw OracleAIMemoryProvisioning.error("Readiness MCP AI Memory excedeu os limites: stdout=\(seen), stderr=\(stderr.count).")}
                while let newline=pending.firstIndex(of:10) {
                    let line=pending.prefix(upTo:newline);pending.removeSubrange(...newline)
                    guard let value=try? JSONSerialization.jsonObject(with:line) as? [String:Any] else{throw OracleAIMemoryProvisioning.error("AI Memory não respondeu protocolo MCP JSON válido.")}
                    if value["id"] as? Int==id {
                        guard value["error"]==nil,let result=value["result"] as? [String:Any] else{throw OracleAIMemoryProvisioning.error("AI Memory recusou o handshake MCP local.")};return result
                    }
                }
                if !process.isRunning{throw OracleAIMemoryProvisioning.error("AI Memory encerrou antes do handshake MCP local. "+String(decoding:stderr.suffix(2_000),as:UTF8.self))}
                Thread.sleep(forTimeInterval:0.01)
            }
            throw OracleAIMemoryProvisioning.error("AI Memory não concluiu readiness local em 25 segundos.")
        }
        try send(["jsonrpc":"2.0","id":1,"method":"initialize","params":["protocolVersion":"2024-11-05","capabilities":[:],"clientInfo":["name":"oracle-local-readiness","version":"1"]]])
        let initialized=try receive(1)
        guard let server=initialized["serverInfo"] as? [String:Any],let version=server["version"] as? String,["2.4.1","2.4.2"].contains(version) else{throw OracleAIMemoryProvisioning.error("MCP local não declarou a versão AI Memory compatível.")}
        try send(["jsonrpc":"2.0","method":"notifications/initialized"])
        try send(["jsonrpc":"2.0","id":2,"method":"tools/list","params":[:]])
        let result=try receive(2)
        guard let tools=result["tools"] as? [[String:Any]],tools.count<=256 else{throw OracleAIMemoryProvisioning.error("Inventário MCP AI Memory fora dos limites.")}
        let names=tools.compactMap{$0["name"] as? String}.sorted()
        guard names.contains("memory_query"),names.count==tools.count else{throw OracleAIMemoryProvisioning.error("MCP local não anunciou memory_query.")}
        return ["serverVersion":version,"protocolVersion":initialized["protocolVersion"] ?? "unknown","tools":names,"localProtocolVerified":true]
    }
}
