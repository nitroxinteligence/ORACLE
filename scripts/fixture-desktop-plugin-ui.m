// Synthetic MCP Apps iframe host. No Oracle Core and no native oracle handler.
#import <AppKit/AppKit.h>
#import <WebKit/WebKit.h>
@interface PluginFixture : NSObject <WKScriptMessageHandler,WKNavigationDelegate>
@property WKWebView *web;
@property NSWindow *window;
@property NSString *scratch;
@property BOOL finished;
- (void)finish:(NSDictionary *)report;
@end
@implementation PluginFixture
- (void)finish:(NSDictionary *)report {
 if(self.finished)return;self.finished=YES;
 NSData *data=[NSJSONSerialization dataWithJSONObject:report options:NSJSONWritingPrettyPrinted error:nil];
 [data writeToFile:[self.scratch stringByAppendingPathComponent:@"result.json"] atomically:NO];
 fprintf(stdout,"FIXTURE_DONE %ld passed %ld failed\n",(long)[report[@"passed"] integerValue],(long)[report[@"failed"] integerValue]);fflush(stdout);
 [self.window orderOut:nil];dispatch_after(dispatch_time(DISPATCH_TIME_NOW,100*NSEC_PER_MSEC),dispatch_get_main_queue(),^{exit([report[@"failed"] integerValue]?1:0);});
}
- (void)userContentController:(WKUserContentController *)controller didReceiveScriptMessage:(WKScriptMessage *)message {
 if(self.finished||![message.body isKindOfClass:NSDictionary.class])return;NSDictionary *body=message.body;
 if([body[@"type"] isEqual:@"snapshot"]){
  NSString *name=body[@"name"];if(![@[@"graph",@"tutorials",@"prompts",@"reader",@"settings"] containsObject:name])return;
  [self.web takeSnapshotWithConfiguration:nil completionHandler:^(NSImage *image,NSError *error){
   BOOL saved=NO;if(image){NSBitmapImageRep *rep=[NSBitmapImageRep imageRepWithData:image.TIFFRepresentation];NSData *png=[rep representationUsingType:NSBitmapImageFileTypePNG properties:@{}];saved=[png writeToFile:[self.scratch stringByAppendingPathComponent:[name stringByAppendingPathExtension:@"png"]] atomically:NO];}
   [self.web evaluateJavaScript:[NSString stringWithFormat:@"window.__fixtureSnapshotDone(%@,%@)",[[NSString alloc] initWithData:[NSJSONSerialization dataWithJSONObject:@[name] options:0 error:nil] encoding:NSUTF8StringEncoding],saved?@"true":@"false"] completionHandler:nil];
  }];return;
 }
 if([body[@"type"] isEqual:@"export"]){NSData *png=[[NSData alloc] initWithBase64EncodedString:body[@"base64"] options:0];[png writeToFile:[self.scratch stringByAppendingPathComponent:@"exported.png"] atomically:NO];return;}
 if([body[@"type"] isEqual:@"done"]){[self finish:body];return;}
 if([body[@"type"] isEqual:@"case"]){NSData *data=[NSJSONSerialization dataWithJSONObject:body options:0 error:nil];fwrite(data.bytes,1,data.length,stdout);fputc('\n',stdout);fflush(stdout);}
}
- (void)webView:(WKWebView *)webView didFinishNavigation:(WKNavigation *)navigation {
 [webView evaluateJavaScript:@"void window.__fixtureRun?.()" completionHandler:^(id value,NSError *error){if(error)[self finish:@{@"passed":@0,@"failed":@1,@"fatal":error.localizedDescription}];}];
}
- (void)webView:(WKWebView *)webView didFailProvisionalNavigation:(WKNavigation *)navigation withError:(NSError *)error {[self finish:@{@"passed":@0,@"failed":@1,@"fatal":error.localizedDescription}];}
- (void)webViewWebContentProcessDidTerminate:(WKWebView *)webView {[self finish:@{@"passed":@0,@"failed":@1,@"fatal":@"WebContent process terminated"}];}
- (void)webView:(WKWebView *)webView decidePolicyForNavigationAction:(WKNavigationAction *)action decisionHandler:(void (^)(WKNavigationActionPolicy))decisionHandler {
 NSURL *url=action.request.URL;BOOL allowed=([url.scheme isEqual:@"about"]||([url isFileURL]&&[url.path hasPrefix:[self.scratch stringByAppendingString:@"/"]]));
 decisionHandler(allowed?WKNavigationActionPolicyAllow:WKNavigationActionPolicyCancel);
}
@end
int main(int argc,const char **argv){@autoreleasepool{
 if(argc!=2)return 2;PluginFixture *host=[PluginFixture new];host.scratch=[NSString stringWithUTF8String:argv[1]];
 [NSApplication sharedApplication];[NSApp setActivationPolicy:NSApplicationActivationPolicyAccessory];
 WKWebViewConfiguration *config=[WKWebViewConfiguration new];config.websiteDataStore=WKWebsiteDataStore.nonPersistentDataStore;
 [config.userContentController addScriptMessageHandler:host name:@"fixture"];
 NSString *script=[NSString stringWithContentsOfFile:[host.scratch stringByAppendingPathComponent:@"fixture.js"] encoding:NSUTF8StringEncoding error:nil];
 [config.userContentController addUserScript:[[WKUserScript alloc] initWithSource:script injectionTime:WKUserScriptInjectionTimeAtDocumentStart forMainFrameOnly:NO]];
 host.web=[[WKWebView alloc] initWithFrame:NSMakeRect(0,0,1280,820) configuration:config];host.web.navigationDelegate=host;
 host.window=[[NSWindow alloc] initWithContentRect:NSMakeRect(30,30,1280,820) styleMask:NSWindowStyleMaskTitled|NSWindowStyleMaskClosable backing:NSBackingStoreBuffered defer:NO];host.window.releasedWhenClosed=NO;host.window.title=@"Oracle synthetic MCP Apps iframe";host.window.contentView=host.web;[host.window orderFront:nil];
 NSURL *scratch=[NSURL fileURLWithPath:host.scratch isDirectory:YES];[host.web loadFileURL:[scratch URLByAppendingPathComponent:@"index.html"] allowingReadAccessToURL:scratch];
 dispatch_after(dispatch_time(DISPATCH_TIME_NOW,90*NSEC_PER_SEC),dispatch_get_main_queue(),^{[host finish:@{@"passed":@0,@"failed":@1,@"fatal":@"Fixture timed out"}];});[NSApp run];
}return 2;}
