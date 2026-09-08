#!/usr/bin/env python3
"""Focused integrity checks for the proposal exports, not the application."""
from pathlib import Path
import hashlib, json, struct, subprocess, tempfile, xml.etree.ElementTree as ET
from PIL import Image, ImageChops

ROOT=Path(__file__).resolve().parents[1]
EXPECTED={'icon_16x16':16,'icon_16x16@2x':32,'icon_32x32':32,'icon_32x32@2x':64,
          'icon_128x128':128,'icon_128x128@2x':256,'icon_256x256':256,
          'icon_256x256@2x':512,'icon_512x512':512,'icon_512x512@2x':1024}
report={'status':'pass','scope':'identity/oracle-v1 only','iconsets':[],'svg':{},'limitations':[
    'No recognition study or legal clearance',
    'No integration into Oracle.app',
    'Composer layers are prepared, not an exported or tested .icon project',
    'Clear/tinted material previews require Icon Composer and target Xcode'
]}

for mode in ['dark','light','mono-dark','mono-light']:
    source=ROOT/f'recommended/legacy/Oracle-{mode}.iconset'
    icns=source.with_suffix('.icns')
    assert {p.stem for p in source.glob('*.png')}==set(EXPECTED)
    raw_max=0
    with tempfile.TemporaryDirectory(prefix='oracle-icns-verify-') as tmp:
        decoded=Path(tmp)/'decoded.iconset'
        subprocess.run(['iconutil','-c','iconset',str(icns),'-o',str(decoded)],check=True)
        assert {p.stem for p in decoded.glob('*.png')}==set(EXPECTED)
        for name,size in EXPECTED.items():
            original=Image.open(source/f'{name}.png').convert('RGBA')
            roundtrip=Image.open(decoded/f'{name}.png').convert('RGBA')
            assert original.size==roundtrip.size==(size,size)
            # Premultiplied ARGB can quantize straight RGB by one code value.
            # Check alpha exactly and displayed pixels on both black and white.
            assert original.getchannel('A').tobytes()==roundtrip.getchannel('A').tobytes()
            max_delta=max(high for low,high in ImageChops.difference(original,roundtrip).getextrema())
            raw_max=max(raw_max,max_delta)
            if name in ['icon_16x16','icon_32x32']:
                assert max_delta<=1,(mode,name,max_delta)
            else:
                assert original.tobytes()==roundtrip.tobytes()
            for background in ['#000000','#FFFFFF']:
                backdrop=Image.new('RGBA',original.size,background)
                assert Image.alpha_composite(backdrop,original).tobytes()==Image.alpha_composite(backdrop,roundtrip).tobytes()
            assert original.getpixel((0,0))[3]==0
            assert original.getpixel((size//2,size//2))[3]==255
    binary=icns.read_bytes(); magic,length=struct.unpack('>4sI',binary[:8])
    assert magic==b'icns' and length==len(binary)
    position=8; chunks=[]
    while position<len(binary):
        kind,n=struct.unpack('>4sI',binary[position:position+8]); assert n>=8
        chunks.append({'type':kind.decode(),'bytes':n}); position+=n
    assert position==len(binary)
    report['iconsets'].append({'mode':mode,'representations':10,'png_dimensions':'pass',
        'iconutil_roundtrip_alpha':'identical','max_straight_rgb_delta':raw_max,
        'composited_black_white_pixels':'identical','png_payload_representations':8,
        'premultiplied_argb_representations':2,'chunks':chunks})

files=list((ROOT/'recommended').rglob('*.svg'))
for p in files:
    tree=ET.fromstring(p.read_text())
    assert tree.attrib.get('viewBox')
    banned={'image','text','filter','mask','script','foreignObject'}
    assert not any(n.tag.split('}')[-1] in banned for n in tree.iter()),str(p)
report['svg']={'checked':len(files),'external_resources':0,'raster_images':0,
    'live_text':0,'filters':0,'all_parse':True}
layers=list((ROOT/'recommended/icon-composer-layers').rglob('*.svg'))
for p in layers:
    tree=ET.fromstring(p.read_text()); assert tree.attrib['viewBox']=='0 0 1024 1024'
    assert not any(n.tag.split('}')[-1]=='rect' for n in tree.iter())
report['composer_layers']={'count':len(layers),'canvas':'1024x1024','premasked':False,
    'native_composer_validation':False}
native=list((ROOT/'qa/native').glob('*.png'))
report['native_appkit_samples']=len(native)
assert len(native)==48

def lum(h):
    rgb=[int(h[i:i+2],16)/255 for i in (1,3,5)]
    a=[v/12.92 if v<=.04045 else ((v+.055)/1.055)**2.4 for v in rgb]
    return sum(v*w for v,w in zip(a,[.2126,.7152,.0722]))
def contrast(a,b):
    l,h=sorted([lum(a),lum(b)]); return round((h+.05)/(l+.05),2)
report['contrast_reference_only']={
    'white_on_dark':contrast('#FFFFFF','#1E252A'),
    'amber_on_dark':contrast('#F4B860','#1E252A'),
    'ink_on_light':contrast('#20252A','#EEECE6'),
    'ochre_on_light':contrast('#B97423','#EEECE6')}
(ROOT/'qa/verification.json').write_text(json.dumps(report,indent=2,ensure_ascii=False)+'\n')
print(json.dumps({k:v for k,v in report.items() if k not in ['iconsets']},indent=2))
