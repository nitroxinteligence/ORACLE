import Foundation
import AppKit
import ImageIO
import UniformTypeIdentifiers

/// Public branding only. Inventory authorization is never inferred from artwork.
/// SVG is parsed against a small geometry allowlist before AppKit rasterizes it.
/// The WebView receives 96 px PNGs, never a remote resource or executable SVG.
final class PluginIconLoader:NSObject,URLSessionDataDelegate {
    static let byteLimit=2_000_000
    private static let lock=NSLock()
    private static var cache=[String:String]()
    private var bytes=Data(),accepted=false,result:Data?
    private let done=DispatchSemaphore(value:0)
    private var session:URLSession?

    static func catalogURL(_ text:String)->URL? {
        let value=text.hasPrefix("/images/ecosystem/") ? "https://chatgpt.com"+text : text
        guard let url=URL(string:value),url.scheme=="https",url.user==nil,url.password==nil,url.port==nil,
              let host=url.host,["files.openai.com","chatgpt.com"].contains(host) else{return nil}
        if host=="chatgpt.com" && !url.path.hasPrefix("/images/ecosystem/"){return nil}
        return url
    }
    static func dataURL(_ text:String)->String? {
        guard let url=catalogURL(text) else{return nil}
        lock.lock();let prior=cache[text];lock.unlock();if let prior{return prior}
        let loader=PluginIconLoader();guard let data=loader.fetch(url),let value=rasterDataURL(data) else{return nil}
        lock.lock();if cache.count>200{cache.removeAll()};cache[text]=value;lock.unlock();return value
    }
    static func rasterDataURL(_ data:Data)->String? {
        guard !data.isEmpty,data.count<=byteLimit else{return nil}
        let head=Array(data.prefix(12))
        let rasterSignature=head.starts(with:[137,80,78,71,13,10,26,10]) || head.starts(with:[255,216,255]) || (head.count==12 && head[0...3].elementsEqual([82,73,70,70]) && head[8...11].elementsEqual([87,69,66,80]))
        let image:CGImage
        if rasterSignature,let source=CGImageSourceCreateWithData(data as CFData,nil),let type=CGImageSourceGetType(source) as String?,
           [UTType.png.identifier,UTType.jpeg.identifier,"org.webmproject.webp"].contains(type),
           let properties=CGImageSourceCopyPropertiesAtIndex(source,0,nil) as? [CFString:Any],
           let width=properties[kCGImagePropertyPixelWidth] as? Int,let height=properties[kCGImagePropertyPixelHeight] as? Int {
            guard width>0,height>0,width<=4096,height<=4096 else{return nil}
            let options:[CFString:Any]=[kCGImageSourceCreateThumbnailFromImageAlways:true,kCGImageSourceThumbnailMaxPixelSize:96,kCGImageSourceCreateThumbnailWithTransform:true,kCGImageSourceShouldCacheImmediately:false]
            guard let raster=CGImageSourceCreateThumbnailAtIndex(source,0,options as CFDictionary) else{return nil};image=raster
        }else{
            guard let safe=SafePluginSVG.sanitize(data),let native=NSImage(data:safe),native.size.width.isFinite,native.size.height.isFinite,native.size.width>0,native.size.height>0,
                  native.size.width<=4096,native.size.height<=4096 else{return nil}
            let ratio=min(96/native.size.width,96/native.size.height)
            let size=NSSize(width:max(1,round(native.size.width*ratio)),height:max(1,round(native.size.height*ratio)))
            guard let space=CGColorSpace(name:CGColorSpace.sRGB),
                  let canvas=CGContext(data:nil,width:Int(size.width),height:Int(size.height),bitsPerComponent:8,bytesPerRow:Int(size.width)*4,space:space,bitmapInfo:CGImageAlphaInfo.premultipliedLast.rawValue) else{return nil}
            var proposed=NSRect(origin:.zero,size:size)
            guard let vector=native.cgImage(forProposedRect:&proposed,context:nil,hints:nil) else{return nil}
            canvas.interpolationQuality = .high
            canvas.draw(vector,in:CGRect(origin:.zero,size:size))
            guard let raster=canvas.makeImage() else{return nil};image=raster
        }
        let out=NSMutableData();guard let dest=CGImageDestinationCreateWithData(out,UTType.png.identifier as CFString,1,nil) else{return nil}
        CGImageDestinationAddImage(dest,image,nil);guard CGImageDestinationFinalize(dest) else{return nil}
        return "data:image/png;base64,"+(out as Data).base64EncodedString()
    }
    struct Brand {
        let name:String,package:String,appKey:String?,file:URL
        let ownApp:Bool
    }
    static func normalized(_ name:String)->String {name.lowercased().filter{$0.isLetter || $0.isNumber}}
    static func localFile(_ path:String,root:URL)->URL? {
        let base=root.resolvingSymlinksInPath(),url=root.appendingPathComponent(path).resolvingSymlinksInPath()
        guard url.path.hasPrefix(base.path+"/"),["png","jpg","jpeg","webp","svg"].contains(url.pathExtension.lowercased()),
              let values=try? url.resourceValues(forKeys:[.fileSizeKey,.isRegularFileKey]),values.isRegularFile==true,
              (values.fileSize ?? byteLimit+1)<=byteLimit else{return nil};return url
    }
    // Index by package identity and exact app ID. Dependencies are never branded as their owner.
    static func localBrands(root:URL)->[String:[Brand]] {
        func directories(_ url:URL)->[URL]{((try? fm.contentsOfDirectory(at:url,includingPropertiesForKeys:[.isDirectoryKey],options:[.skipsHiddenFiles])) ?? []).filter{(try? $0.resourceValues(forKeys:[.isDirectoryKey]).isDirectory)==true}.sorted{$0.path<$1.path}}
        var result=[String:[Brand]]()
        for marketplace in directories(root).sorted(by:{($0.lastPathComponent=="openai-curated") != ($1.lastPathComponent=="openai-curated") ? $0.lastPathComponent != "openai-curated" : $0.path<$1.path}){for package in directories(marketplace){for version in directories(package).sorted(by:{$0.lastPathComponent.compare($1.lastPathComponent,options:.numeric) == .orderedDescending}){
            guard version.resolvingSymlinksInPath().path.hasPrefix(root.resolvingSymlinksInPath().path+"/"),
                  let manifest=try? readJSON(version.appendingPathComponent(".codex-plugin/plugin.json")),let name=manifest["name"] as? String,
                  let ui=manifest["interface"] as? [String:Any],let display=ui["displayName"] as? String else{continue}
            // A supplied full-color logo takes precedence over a composer silhouette.
            let files=["logoDark","logo","composerIcon"].compactMap{ui[$0] as? String}.compactMap{localFile($0,root:version)}
            guard !files.isEmpty else{continue}
            for file in files {result[name+"@"+marketplace.lastPathComponent,default:[]].append(Brand(name:display,package:name,appKey:nil,file:file,ownApp:false))}
            let appDocument=(try? readJSON(version.appendingPathComponent(".app.json"))) ?? [:]
            let apps=appDocument["apps"] as? [String:[String:Any]] ?? [:]
            for (key,app) in apps {guard let id=app["id"] as? String else{continue}
                let own=normalized(name)==normalized(key) || id=="asdk_"+name
                for file in files{result[id,default:[]].append(Brand(name:display,package:name,appKey:key,file:file,ownApp:own))}
            }
        }}}
        return result
    }
    static func localBrand(for row:[String:Any],index:[String:[Brand]])->(String,String)? {
        guard let id=row["id"] as? String,let name=row["name"] as? String else{return nil}
        for brand in index[id] ?? [] {
            guard row["kind"] as? String=="plugin" || brand.ownApp || normalized(brand.name)==normalized(name) else{continue}
            let values=try? brand.file.resourceValues(forKeys:[.contentModificationDateKey,.fileSizeKey])
            let key=brand.file.path+"|"+String(values?.contentModificationDate?.timeIntervalSince1970 ?? 0)+"|"+String(values?.fileSize ?? 0)
            lock.lock();let cached=cache[key];lock.unlock()
            let png:String
            if let cached{png=cached}else{
                guard let data=try? Data(contentsOf:brand.file),let raster=rasterDataURL(data) else{continue};png=raster
                lock.lock();if cache.count>200{cache.removeAll()};cache[key]=png;lock.unlock()
            }
            return(png,"package:"+brand.package+"/"+brand.file.lastPathComponent)
        }
        return nil
    }
    static func decorate(_ inventory:[String:Any])->[String:Any] {
        let root=fm.homeDirectoryForCurrentUser.appendingPathComponent(".codex/plugins/cache"),index=localBrands(root:root)
        var result=inventory
        let rows=(inventory["plugins"] as? [[String:Any]] ?? []).map{r in var row=r
            if let (icon,origin)=localBrand(for:row,index:index){row["iconDataURL"]=icon;row["iconOrigin"]=origin}
            return row
        }
        let group=DispatchGroup(),limit=DispatchSemaphore(value:4),resultsLock=NSLock();var icons=[Int:String]()
        for(i,row) in rows.enumerated() where row["iconDataURL"]==nil {
            guard let text=row["iconURL"] as? String,catalogURL(text) != nil else{continue}
            group.enter();DispatchQueue.global(qos:.utility).async{limit.wait();defer{limit.signal();group.leave()};if let value=dataURL(text){resultsLock.lock();icons[i]=value;resultsLock.unlock()}}
        }
        group.wait()
        result["plugins"]=rows.enumerated().map{i,r in var row=r;row.removeValue(forKey:"iconURL");if let icon=icons[i]{row["iconDataURL"]=icon;row["iconOrigin"]="app-catalog"};return row}
        return result
    }
    private func fetch(_ url:URL)->Data? {
        let config=URLSessionConfiguration.ephemeral;config.httpCookieStorage=nil;config.urlCache=nil;config.timeoutIntervalForRequest=5;config.timeoutIntervalForResource=7
        let session=URLSession(configuration:config,delegate:self,delegateQueue:nil);self.session=session
        var request=URLRequest(url:url);request.httpShouldHandleCookies=false
        let task=session.dataTask(with:request);task.resume()
        if done.wait(timeout:.now()+8) == .timedOut{task.cancel();session.invalidateAndCancel();return nil}
        session.finishTasksAndInvalidate();return result
    }
    func urlSession(_ session:URLSession,task:URLSessionTask,willPerformHTTPRedirection response:HTTPURLResponse,newRequest request:URLRequest,completionHandler:@escaping(URLRequest?)->Void){
        guard let url=request.url,Self.catalogURL(url.absoluteString) != nil else{completionHandler(nil);return}
        var safe=request;safe.httpShouldHandleCookies=false;safe.setValue(nil,forHTTPHeaderField:"Authorization");completionHandler(safe)
    }
    func urlSession(_ session:URLSession,dataTask:URLSessionDataTask,didReceive response:URLResponse,completionHandler:@escaping(URLSession.ResponseDisposition)->Void){
        accepted=(response as? HTTPURLResponse)?.statusCode==200 && response.expectedContentLength<=Int64(Self.byteLimit) && ["image/png","image/jpeg","image/webp","image/svg+xml"].contains(response.mimeType ?? "")
        completionHandler(accepted ? .allow : .cancel)
    }
    func urlSession(_ session:URLSession,dataTask:URLSessionDataTask,didReceive data:Data){if bytes.count+data.count>Self.byteLimit{accepted=false;dataTask.cancel()}else{bytes.append(data)}}
    func urlSession(_ session:URLSession,task:URLSessionTask,didCompleteWithError error:Error?){if error==nil&&accepted{result=bytes};done.signal()}
}

final class SafePluginSVG:NSObject,XMLParserDelegate {
    private var output="",valid=true,count=0,depth=0,rootSeen=false
    private static let tags:Set<String>=["svg","g","path","rect","circle","ellipse","line","polyline","polygon","defs","linearGradient","radialGradient","stop","clipPath","mask","title","desc"]
    private static let attributes:Set<String>=["xmlns","xmlns:xlink","version","width","height","viewBox","preserveAspectRatio","id","x","y","x1","x2","y1","y2","cx","cy","r","rx","ry","d","points","transform","fill","fill-rule","fill-opacity","stroke","stroke-width","stroke-linecap","stroke-linejoin","stroke-miterlimit","stroke-dasharray","stroke-dashoffset","stroke-opacity","opacity","clip-path","clip-rule","clipPathUnits","mask","maskUnits","maskContentUnits","offset","stop-color","stop-opacity","gradientUnits","gradientTransform","spreadMethod","fx","fy","fr","href","xlink:href","color"]
    static func sanitize(_ data:Data)->Data? {
        guard data.count<=PluginIconLoader.byteLimit,let text=String(data:data,encoding:.utf8),
              !text.lowercased().contains("<!doctype"),!text.lowercased().contains("<!entity") else{return nil}
        let delegate=SafePluginSVG(),parser=XMLParser(data:data);parser.delegate=delegate;parser.shouldResolveExternalEntities=false
        guard parser.parse(),delegate.valid,delegate.rootSeen,delegate.depth==0 else{return nil}
        return delegate.output.data(using:.utf8)
    }
    private func reject(_ parser:XMLParser){valid=false;parser.abortParsing()}
    private func escape(_ value:String)->String{value.replacingOccurrences(of:"&",with:"&amp;").replacingOccurrences(of:"\"",with:"&quot;").replacingOccurrences(of:"<",with:"&lt;").replacingOccurrences(of:">",with:"&gt;")}
    func parser(_ parser:XMLParser,didStartElement element:String,namespaceURI:String?,qualifiedName:String?,attributes values:[String:String]){
        count+=1;depth+=1
        guard count<=1500,depth<=32,Self.tags.contains(element),rootSeen || element=="svg" else{reject(parser);return};rootSeen=true
        var attributes=[String:String]()
        for (key,value) in values {
            guard Self.attributes.contains(key),value.count<=180_000 else{reject(parser);return}
            if key=="xmlns" {guard value=="http://www.w3.org/2000/svg" else{reject(parser);return}}
            else if key=="xmlns:xlink" {guard value=="http://www.w3.org/1999/xlink" else{reject(parser);return}}
            else if key=="href" || key=="xlink:href" {guard value.range(of:"^#[A-Za-z_][A-Za-z0-9_.-]*$",options:.regularExpression) != nil else{reject(parser);return}}
            else {
                let lower=value.lowercased()
                guard !lower.contains("javascript"),!lower.contains("data:"),!lower.contains("http"),!lower.contains("file:"),!lower.contains("\\"),!lower.contains("@"),!lower.contains("&") else{reject(parser);return}
                if lower.contains("url") {guard value.range(of:"^url\\(#[A-Za-z_][A-Za-z0-9_.-]*\\)$",options:.regularExpression) != nil else{reject(parser);return}}
            }
            attributes[key]=value
        }
        if element=="svg" {attributes["xmlns"]="http://www.w3.org/2000/svg"}
        output+="<"+element+attributes.keys.sorted().map{" "+$0+"=\""+escape(attributes[$0]!)+"\""}.joined()+">"
    }
    func parser(_ parser:XMLParser,didEndElement element:String,namespaceURI:String?,qualifiedName:String?){output+="</"+element+">";depth-=1}
    func parser(_ parser:XMLParser,foundCharacters text:String){output+=escape(text)}
    func parser(_ parser:XMLParser,foundCDATA data:Data){reject(parser)}
    func parser(_ parser:XMLParser,foundProcessingInstructionWithTarget target:String,data:String?){reject(parser)}
    func parser(_ parser:XMLParser,resolveExternalEntityName name:String,systemID:String?)->Data?{reject(parser);return nil}
}
