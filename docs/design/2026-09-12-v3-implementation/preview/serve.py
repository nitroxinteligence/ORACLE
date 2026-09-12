"""Read-only local UI preview; uses active web sources and synthetic scenarios."""
from http.server import SimpleHTTPRequestHandler, ThreadingHTTPServer
from pathlib import Path
from urllib.parse import urlsplit
import argparse, re, time
ROOT=Path(__file__).resolve().parents[4]
WEB=ROOT/'Resources/web'
HERE=Path(__file__).resolve().parent
class Preview(SimpleHTTPRequestHandler):
    inject_fixture=True
    def do_GET(self):
        name=urlsplit(self.path).path
        if name in ('/','/index.html'):
            html=(WEB/'index.html').read_text()
            if self.inject_fixture:html=html.replace('<script src="app.js"></script>','<script src="fixture.js"></script><script src="app.js"></script><script src="scenarios.js"></script>')
            revision=str(time.time_ns())
            html=re.sub(r'(src|href)="([^"?#]+\.(?:js|css))"',lambda m:f'{m[1]}="{m[2]}?v={revision}"',html)
            payload=html.encode();self.send_response(200);self.send_header('Content-Type','text/html; charset=utf-8');self.send_header('Cache-Control','no-store');self.end_headers();self.wfile.write(payload);return
        return super().do_GET()
    def translate_path(self,path):
        name=urlsplit(path).path.lstrip('/')
        if name in ('fixture.js','scenarios.js'):return str(HERE/name)
        candidate=(WEB/name).resolve()
        if not candidate.is_relative_to(WEB.resolve()):return str(WEB/'missing')
        return str(candidate)
    def log_message(self,*args):pass
if __name__=='__main__':
    p=argparse.ArgumentParser();p.add_argument('--port',type=int,default=8770);p.add_argument('--base-preview',action='store_true');args=p.parse_args();Preview.inject_fixture=not args.base_preview
    print(f'Preview sintético: http://127.0.0.1:{args.port}',flush=True)
    ThreadingHTTPServer(('127.0.0.1',args.port),Preview).serve_forever()
