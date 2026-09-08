import Foundation
import ImageIO
import UniformTypeIdentifiers

/// Loads only public icon assets from the observed Codex catalog origins, without cookies
/// or credentials. Rasterizes to small PNGs so WebKit never executes SVG or loads remote URLs.
final class PluginIconLoader:NSObject,URLSessionDataDelegate {
    private static let lock=NSLock()
    private static var cache=[String:String]()
    private var bytes=Data(),accepted=false,result:Data?
    private let done=DispatchSemaphore(value:0)
    private var session:URLSession?
    static func catalogURL(_ text:String)->URL? {
        let value=text.hasPrefix("/images/ecosystem/") ? "https://chatgpt.com"+text : text
        guard let url=URL(string:value),url.scheme=="https",url.user==nil,url.password==nil,url.port==nil,let host=url.host,["files.openai.com","chatgpt.com"].contains(host) else{return nil};return url
    }
    static func dataURL(_ text:String)->String? {
        guard let url=catalogURL(text) else{return nil}
        lock.lock();let prior=cache[text];lock.unlock();if let prior{return prior}
        let loader=PluginIconLoader();guard let data=loader.fetch(url),let value=rasterDataURL(data) else{return nil}
        lock.lock();if cache.count>200{cache.removeAll()};cache[text]=value;lock.unlock();return value
    }
    static func rasterDataURL(_ data:Data)->String? {
        guard data.count<=400_000,let source=CGImageSourceCreateWithData(data as CFData,nil),let properties=CGImageSourceCopyPropertiesAtIndex(source,0,nil) as? [CFString:Any],let width=properties[kCGImagePropertyPixelWidth] as? Int,let height=properties[kCGImagePropertyPixelHeight] as? Int,width>0,height>0,width<=4096,height<=4096 else{return nil}
        let options:[CFString:Any]=[kCGImageSourceCreateThumbnailFromImageAlways:true,kCGImageSourceThumbnailMaxPixelSize:96,kCGImageSourceCreateThumbnailWithTransform:true,kCGImageSourceShouldCacheImmediately:false]
        guard let image=CGImageSourceCreateThumbnailAtIndex(source,0,options as CFDictionary) else{return nil}
        let out=NSMutableData();guard let dest=CGImageDestinationCreateWithData(out,UTType.png.identifier as CFString,1,nil) else{return nil};CGImageDestinationAddImage(dest,image,nil);guard CGImageDestinationFinalize(dest) else{return nil}
        return "data:image/png;base64,"+(out as Data).base64EncodedString()
    }
    // Branding lookup only: exact connector ID from a cached package manifest. Never a connection signal.
    private static let localBrands:[String:String] = {
        let root=fm.homeDirectoryForCurrentUser.appendingPathComponent(".codex/plugins/cache")
        func directories(_ url:URL)->[URL]{((try? fm.contentsOfDirectory(at:url,includingPropertiesForKeys:[.isDirectoryKey],options:[.skipsHiddenFiles])) ?? []).filter{(try? $0.resourceValues(forKeys:[.isDirectoryKey]).isDirectory)==true}}
        var result=[String:String]()
        for marketplace in directories(root) {for package in directories(marketplace) {for version in directories(package).sorted(by:{$0.lastPathComponent.compare($1.lastPathComponent,options:.numeric) == .orderedDescending}) {
            guard version.resolvingSymlinksInPath().path.hasPrefix(root.resolvingSymlinksInPath().path+"/") else{continue}
            guard let appDocument=try? readJSON(version.appendingPathComponent(".app.json")),let apps=appDocument["apps"] as? [String:[String:Any]],let manifest=try? readJSON(version.appendingPathComponent(".codex-plugin/plugin.json")),let ui=manifest["interface"] as? [String:Any] else{continue}
            for name in ["logoDark","logo","composerIcon"] {
                guard let path=ui[name] as? String else{continue}
                let url=version.appendingPathComponent(path).resolvingSymlinksInPath()
                guard url.path.hasPrefix(version.resolvingSymlinksInPath().path+"/"),["png","jpg","jpeg","webp"].contains(url.pathExtension.lowercased()),let data=try? Data(contentsOf:url),let icon=rasterDataURL(data) else{continue}
                for app in apps.values {if let id=app["id"] as? String,result[id]==nil{result[id]=icon}}
                break
            }
        }}}
        return result
    }()
    static func decorate(_ inventory:[String:Any])->[String:Any] {
        var result=inventory;let rows=(inventory["plugins"] as? [[String:Any]] ?? []).map{r in var row=r;if row["iconDataURL"]==nil,let id=row["id"] as? String,let local=localBrands[id]{row["iconDataURL"]=local};return row}
        let group=DispatchGroup(),limit=DispatchSemaphore(value:4),resultsLock=NSLock();var icons=[Int:String]()
        for(i,row) in rows.enumerated() where i<64 && row["iconDataURL"]==nil {
            guard let text=row["iconURL"] as? String,catalogURL(text) != nil else{continue}
            group.enter();DispatchQueue.global(qos:.utility).async {limit.wait();defer{limit.signal();group.leave()};if let value=dataURL(text){resultsLock.lock();icons[i]=value;resultsLock.unlock()}}
        }
        group.wait()
        result["plugins"]=rows.enumerated().map{i,r in var row=r;row.removeValue(forKey:"iconURL");if let icon=icons[i]{row["iconDataURL"]=icon};return row};return result
    }
    private func fetch(_ url:URL)->Data? {
        let config=URLSessionConfiguration.ephemeral;config.httpCookieStorage=nil;config.urlCache=nil;config.timeoutIntervalForRequest=5;config.timeoutIntervalForResource=7
        let session=URLSession(configuration:config,delegate:self,delegateQueue:nil);self.session=session
        var request=URLRequest(url:url);request.httpShouldHandleCookies=false
        let task=session.dataTask(with:request);task.resume()
        if done.wait(timeout:.now()+8) == .timedOut {task.cancel();session.invalidateAndCancel();return nil}
        session.finishTasksAndInvalidate();return result
    }
    func urlSession(_ session:URLSession,task:URLSessionTask,willPerformHTTPRedirection response:HTTPURLResponse,newRequest request:URLRequest,completionHandler:@escaping(URLRequest?)->Void){
        guard let url=request.url,Self.catalogURL(url.absoluteString) != nil else{completionHandler(nil);return};var safe=request;safe.httpShouldHandleCookies=false;safe.setValue(nil,forHTTPHeaderField:"Authorization");completionHandler(safe)
    }
    func urlSession(_ session:URLSession,dataTask:URLSessionDataTask,didReceive response:URLResponse,completionHandler:@escaping(URLSession.ResponseDisposition)->Void){
        accepted=(response as? HTTPURLResponse)?.statusCode==200 && response.expectedContentLength<=400_000 && ["image/png","image/jpeg","image/webp"].contains(response.mimeType ?? "")
        completionHandler(accepted ? .allow : .cancel)
    }
    func urlSession(_ session:URLSession,dataTask:URLSessionDataTask,didReceive data:Data){if bytes.count+data.count>400_000{accepted=false;dataTask.cancel()}else{bytes.append(data)}}
    func urlSession(_ session:URLSession,task:URLSessionTask,didCompleteWithError error:Error?){if error==nil&&accepted{result=bytes};done.signal()}
}
