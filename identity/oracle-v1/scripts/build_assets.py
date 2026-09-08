#!/usr/bin/env python3
"""Original vector artwork. Run from any cwd; writes only identity/oracle-v1.
Requires fonttools, cairosvg, pillow. No network, tracing, or app mutations.
"""
from pathlib import Path
from functools import lru_cache
from math import cos, sin, radians
import base64, json, hashlib, shutil, struct
from html import escape
import cairosvg
from PIL import Image
from fontTools.ttLib import TTFont
from fontTools.varLib.instancer import instantiateVariableFont
from fontTools.pens.svgPathPen import SVGPathPen

ROOT = Path(__file__).resolve().parents[1]
INK = '#20252A'
PAPER = '#F3F1EB'
WHITE = '#FFFFFF'
DARK = '#171C20'
MUTED = '#67716F'
AMBER = '#F4B860'
BLUE = '#8FBAD2'
SAGE = '#9DB6A8'
NAMES = {'a': 'Órbita solar', 'b': 'Azimute', 'c': 'Fólio solar'}
ACCENTS = {'a': AMBER, 'b': BLUE, 'c': SAGE}

def svg(w, h, content, title='Oracle — proposta de identidade, não aprovada'):
    return f'<svg xmlns="http://www.w3.org/2000/svg" width="{w}" height="{h}" viewBox="0 0 {w} {h}" role="img"><title>{escape(title)}</title>{content}</svg>'

def rect(x,y,w,h,fill,rx=0,stroke='none'):
    return f'<rect x="{x}" y="{y}" width="{w}" height="{h}" rx="{rx}" fill="{fill}" stroke="{stroke}"/>'

def circle(x,y,r,fill):
    return f'<circle cx="{x}" cy="{y}" r="{r}" fill="{fill}"/>'

def place(content,x,y,scale=1):
    return f'<g transform="translate({x} {y}) scale({scale})">{content}</g>'

@lru_cache(None)
def font(family='Manrope', weight=500):
    axes={'wght':weight}
    if family=='Newsreader': axes['opsz']=24
    return instantiateVariableFont(TTFont(ROOT/f'fonts/{family}-Variable.ttf'),axes,inplace=False)

@lru_cache(None)
def glyph(family,weight,char):
    f=font(family,weight); gs=f.getGlyphSet(); name=f.getBestCmap().get(ord(char),'space')
    p=SVGPathPen(gs); gs[name].draw(p)
    return p.getCommands(),f['hmtx'][name][0], f['head'].unitsPerEm

def lettering(s,size=24,fill=INK,family='Manrope',weight=500,tracking=0,logo=False):
    result=[]; x=0
    for i,c in enumerate(s):
        d,adv,upm=glyph(family,weight,c); k=size/upm
        if i and logo:
            pairs={'Or':-0.028,'ra':-0.034,'ac':-0.014,'cl':-0.008,'le':-0.014,'OR':-0.022,'RA':-0.043,'AC':-0.028,'CL':-0.022,'LE':-0.008}
            x+=pairs.get(s[i-1:i+1],0)*size
        result.append(f'<path d="{d}" transform="translate({x:.4f} 0) scale({k:.7f} {-k:.7f})" fill="{fill}"/>')
        x+=adv*k+tracking
    return ''.join(result),x-tracking

def text(s,x,y,size=24,fill=INK,weight=500,tracking=0,family='Manrope'):
    return place(lettering(s,size,fill,family,weight,tracking)[0],x,y)

def centered(s,x,y,size=24,fill=INK,weight=500,tracking=0,family='Manrope'):
    t,w=lettering(s,size,fill,family,weight,tracking)
    return place(t,x-w/2,y)

def arc_band(cx,cy,outer,inner,start,end,fill):
    def p(r,a): return (cx+r*cos(radians(a)),cy+r*sin(radians(a)))
    a,b,c,d=p(outer,start),p(outer,end),p(inner,end),p(inner,start)
    large=int((end-start)%360>180)
    return f'<path fill="{fill}" d="M {a[0]:.6f} {a[1]:.6f} A {outer} {outer} 0 {large} 1 {b[0]:.6f} {b[1]:.6f} L {c[0]:.6f} {c[1]:.6f} A {inner} {inner} 0 {large} 0 {d[0]:.6f} {d[1]:.6f} Z"/>'

def symbol(key,fill=INK,accent=None,micro=False,part='all'):
    accent=accent or fill
    if key=='a':
        # The sun replaces the NE quadrant of the O, rather than becoming a pupil.
        # Radius 90; 26-unit band; a 100-degree opening centered at -45 degrees.
        body=arc_band(128,128,90,62 if micro else 64,5,265,fill)
        core=circle(177,79,30 if micro else 31,accent)
    elif key=='b':
        # Two opposing compass folds, with a round reference point in negative space.
        body=f'<path fill="{fill}" d="M 128 34 L 222 128 L 201 149 L 128 76 L 55 149 L 34 128 Z M 55 159 L 128 232 L 201 159 L 180 138 L 128 190 L 76 138 Z"/>'
        core=circle(128,132,16,accent)
        body=place(place(body,-128,-133),128,128,.90909091)
        core=place(place(core,-128,-133),128,128,.90909091)
    else:
        # Open folio. Two closed Bézier silhouettes, 16-unit gutter, independent sun.
        body=f'<path fill="{fill}" d="M 38 105 C 71 96 97 107 120 130 L 120 215 C 98 197 73 188 38 192 Z M 136 130 C 159 107 185 96 218 105 L 218 192 C 183 188 158 197 136 215 Z"/>'
        core=circle(128,66,27,accent)
    return body if part=='body' else core if part=='core' else body+core

def wordmark(key,fill=INK,size=72):
    if key=='b': return lettering('ORACLE',size,fill,'Manrope',500,size*.070,True)
    if key=='c': return lettering('Oracle',size,fill,'Newsreader',500,-size*.006,True)
    return lettering('Oracle',size,fill,'Manrope',600,-size*.012,True)

def lockup(key,fill=INK,accent=None,height=80):
    scale=height/256
    wm,ww=wordmark(key,fill,61 if key!='b' else 50)
    # 72 px artwork height at 102.4 px nominal symbol canvas.
    # Wordmark baseline aligns optically with circular O overshoot.
    content=place(symbol(key,fill,accent),0,0,scale)+place(wm,height+height*.17,height*.70)
    return content,height*1.17+ww

def icon(key,mode='dark',micro=False,legacy=True):
    bg={'dark':'#1E252A','light':'#EEECE6','mono-dark':'#202020','mono-light':'#F2F2F2'}[mode]
    fg=WHITE if 'dark' in mode else INK
    accent=ACCENTS[key] if mode=='dark' else {'a':'#B97423','b':'#416F8A','c':'#4D7461'}[key]
    if mode.startswith('mono'): fg='#FFFFFF' if mode=='mono-dark' else '#000000'; accent=fg
    # Rounded enclosure only for the static legacy preview, never Composer layers.
    if legacy:
        background=rect(64,64,896,896,bg,198)
    else:
        background=rect(0,0,1024,1024,bg)
    art=place(symbol(key,fg,accent,micro),144,144,736/256)
    return svg(1024,1024,background+art,f'Oracle / {NAMES[key]} / ícone conceitual {mode}')

def emit(path,document,png_sizes=(),pdf=False):
    path=ROOT/path; path.parent.mkdir(parents=True,exist_ok=True)
    path.write_text(document)
    for size in png_sizes:
        kwargs={'output_width':size} if isinstance(size,int) else {'output_width':size[0],'output_height':size[1]}
        name=path.with_name(path.stem+(f'-{size}' if len(png_sizes)>1 else '')+'.png')
        cairosvg.svg2png(bytestring=document.encode(),write_to=str(name),**kwargs)
    if pdf: cairosvg.svg2pdf(bytestring=document.encode(),write_to=str(path.with_suffix('.pdf')))

def build_directions():
    for key in NAMES:
        for mode,fg in [('black','#000000'),('white','#FFFFFF')]:
            emit(f'directions/{key}/symbol-{mode}.svg',svg(256,256,symbol(key,fg)),[256])
            wm,w=wordmark(key,fg)
            emit(f'directions/{key}/wordmark-{mode}.svg',svg(round(w+24,2),104,place(wm,12,77)),[round(w*3)])
            lo,w=lockup(key,fg,height=96)
            emit(f'directions/{key}/lockup-{mode}.svg',svg(round(w+24,2),120,place(lo,12,12)),[1000])
        for mode in ['light','dark','mono-light','mono-dark']:
            emit(f'directions/{key}/icon-{mode}.svg',icon(key,mode),[1024])

def build_comparison():
    W,H=1800,1400
    s=rect(0,0,W,H,PAPER)
    s+=text('ORACLE  /  ESTUDO DE IDENTIDADE',64,58,14,weight=700,tracking=2)
    s+=text('Um núcleo. Três caminhos.',64,120,42,weight=500)
    s+=text('Propostas para avaliação · 07 set 2026 · símbolo, palavra e ícone na mesma escala',65,156,17,MUTED)
    descriptions=[['Um sol ocupa a abertura de uma órbita.','O conjunto desenha o O de Oracle.'],['Um ponto de referência entre duas direções.','Leitura precisa, cartográfica e técnica.'],['Conhecimento que se abre ao redor de um sol.','Leitura editorial, próxima e contemplativa.']]
    judgements=[['RECOMENDADA','Melhor equilíbrio entre presença, síntese','e relação com o universo do produto.'],['ALTERNATIVA TÉCNICA','Forte em orientação; pode lembrar','ferramentas de navegação e engenharia.'],['ALTERNATIVA EDITORIAL','Clara para conhecimento; menos própria','do atlas e mais próxima de leitura.']]
    for i,key in enumerate(NAMES):
        x=64+i*572; w=528; cx=x+w/2
        s+=text(f'{key.upper()}  /  {NAMES[key]}',x,224,25,weight=600)
        for j,line in enumerate(descriptions[i]): s+=text(line,x,258+j*25,16,MUTED)
        s+=rect(x,308,w,312,WHITE,18)
        s+=place(symbol(key),cx-88,330,176/256)
        wm,ww=wordmark(key,size=53 if key!='b' else 46)
        s+=place(wm,cx-ww/2,570)
        s+=text('01  /  SÍMBOLO + WORDMARK',x+22,599,10,MUTED,weight=700,tracking=1.1)
        s+=rect(x,632,w,157,DARK,18)
        lo,lw=lockup(key,WHITE,height=80)
        s+=place(lo,cx-lw/2,657)
        s+=text('02  /  INVERSÃO MONOCROMÁTICA',x+22,768,10,'#A7B0B0',weight=700,tracking=1.1)
        s+=rect(x,801,w,206,'#E5E3DC',18)
        for j,mode in enumerate(['light','dark','mono-dark']):
            icon_doc=icon(key,mode)
            b64=base64.b64encode(icon_doc.encode()).decode()
            s+=f'<image x="{x+30+j*164}" y="{817}" width="140" height="140" href="data:image/svg+xml;base64,{b64}"/>'
            s+=centered(['Claro','Escuro','Mono'][j],x+100+j*164,977,13,MUTED)
        s+=text('03  /  REDUÇÃO — PIXELS REAIS NA PRANCHA',x,1043,11,MUTED,weight=700,tracking=.8)
        for j,size in enumerate([16,24,32,48]):
            xx=x+32+j*93
            s+=place(symbol(key,'#000000',micro=size<=24),xx,1096-size/2,size/256)
            s+=centered(str(size),xx+size/2,1145,12,MUTED)
        s+=rect(x+434,1070,78,63,'#000000',9)
        s+=place(symbol(key,WHITE,micro=True),x+456,1085,32/256)
        s+=rect(x,1180,w,152,'#DFE5DC' if key=='a' else '#E9E7E0',18)
        s+=text(judgements[i][0],x+24,1214,12,weight=700,tracking=1.2)
        for j,line in enumerate(judgements[i][1:]): s+=text(line,x+24,1248+j*25,17)
    s+=text('Estudo original em vetor · Ícones estáticos de apresentação · Nenhuma direção aprovada ou aplicada ao app',64,1372,14,MUTED)
    emit('boards/01-comparison.svg',svg(W,H,s),[1800],True)

def build_hero():
    W,H=1600,1040; s=rect(0,0,W,H,DARK)
    s+=text('ORACLE  /  DIREÇÃO A',64,61,14,'#BCC4C2',weight=600,tracking=2)
    s+=text('Órbita solar',64,122,44,WHITE)
    s+=text('Seu universo, em perspectiva.',65,162,21,'#BAC3C4')
    s+=place(symbol('a',WHITE,AMBER),143,243,1.6)
    wm,ww=wordmark('a',WHITE,126)
    s+=place(wm,154,760)
    s+=text('Um sol abre o caminho.',154,818,21,'#C0C8C6')
    s+=text('O desenho funciona antes da cor.',154,852,17,'#929E9E')
    s+=rect(880,215,608,643,'#252D31',24)
    for j,mode in enumerate(['dark','light']):
        raw=icon('a',mode)
        s+=f'<image x="{924+j*262}" y="284" width="246" height="246" href="data:image/svg+xml;base64,{base64.b64encode(raw.encode()).decode()}"/>'
        s+=centered(['Escuro','Claro'][j],1047+j*262,569,16,'#C8D1CC')
    s+=text('ESCALAS DO ÍCONE / SIMULAÇÃO',926,643,11,'#AEB8B4',weight=700,tracking=1.1)
    for j,size in enumerate([128,64,32,16]):
        b64=base64.b64encode(icon('a','dark',micro=size<=32).encode()).decode()
        xx=926+j*132
        s+=f'<image x="{xx}" y="{725-size/2}" width="{size}" height="{size}" href="data:image/svg+xml;base64,{b64}"/>'
        s+=text(f'{size} px',xx,814,12,'#B4BFBB')
    s+=rect(64,939,1424,1,'#3A4345')
    s+=text('SÍMBOLO ORIGINAL',65,979,11,'#BFC9C5',weight=700,tracking=1.3)
    s+=text('Manrope 600 · espaçamento óptico · curvas vetoriais',356,979,15,'#BFC9C5')
    s+=text('PROPOSTA / AGUARDA ESCOLHA',1150,979,11,'#D9C7A6',weight=700,tracking=1.1)
    emit('boards/02-recommendation.svg',svg(W,H,s),[1600],True)

def build_recommended():
    for p in (ROOT/'directions/a').glob('*'):
        shutil.copy2(p,ROOT/'recommended'/p.name)
    for mode,fg in [('black','#000000'),('white','#FFFFFF')]:
        emit(f'recommended/symbol-micro-{mode}.svg',svg(256,256,symbol('a',fg,micro=True)),[16,24,32,48])
        emit(f'recommended/symbol-{mode}.svg',svg(256,256,symbol('a',fg)),[256,512,1024],True)
        wm,w=wordmark('a',fg)
        emit(f'recommended/wordmark-{mode}.svg',svg(round(w+24,2),104,place(wm,12,77)),[round((w+24)*4)],True)
        lo,w=lockup('a',fg,height=96)
        emit(f'recommended/lockup-{mode}.svg',svg(round(w+24,2),120,place(lo,12,12)),[1600],True)
    emit('recommended/symbol-color.svg',svg(256,256,symbol('a',INK,'#B97423')),[256,512,1024],True)
    # Two clean 1024 x 1024 foreground layers. Background is configured in Composer.
    for variant,fg,ac in [('default',INK,'#B97423'),('dark',WHITE,AMBER),('mono','#FFFFFF','#FFFFFF')]:
        for part,name in [('body','01-field'),('core','02-sun')]:
            emit(f'recommended/icon-composer-layers/{variant}/{name}.svg',svg(1024,1024,place(symbol('a',fg,ac,part=part),144,144,736/256)),[1024])
    sizes={'icon_16x16':(16,True),'icon_16x16@2x':(32,True),'icon_32x32':(32,True),'icon_32x32@2x':(64,True),'icon_128x128':(128,False),'icon_128x128@2x':(256,False),'icon_256x256':(256,False),'icon_256x256@2x':(512,False),'icon_512x512':(512,False),'icon_512x512@2x':(1024,False)}
    for mode in ['dark','light','mono-dark','mono-light']:
        iconset=ROOT/f'recommended/legacy/Oracle-{mode}.iconset'; iconset.mkdir(parents=True,exist_ok=True)
        for name,(sz,micro) in sizes.items():
            # Render at 4x then downsample for a clean antialiased classic PNG.
            data=cairosvg.svg2png(bytestring=icon('a',mode,micro).encode(),output_width=sz*4,output_height=sz*4)
            import io
            image=Image.open(io.BytesIO(data)).convert('RGBA').resize((sz,sz),Image.Resampling.LANCZOS)
            image.save(iconset/(name+'.png'))
        # This Mac's iconutil emits ic04/ic05 ARGB with straight RGB and then
        # unpremultiplies it on decode, producing light edge fringes. Encode the
        # small ARGB resources explicitly with premultiplied channels. Larger
        # resources preserve the exact PNG payloads. Native decoding is tested.
        types={'icon_16x16':'ic04','icon_16x16@2x':'ic11','icon_32x32':'ic05',
               'icon_32x32@2x':'ic12','icon_128x128':'ic07','icon_128x128@2x':'ic13',
               'icon_256x256':'ic08','icon_256x256@2x':'ic14','icon_512x512':'ic09',
               'icon_512x512@2x':'ic10'}
        chunks=[]
        for name,kind in types.items():
            payload=(iconset/(name+'.png')).read_bytes()
            if kind in ['ic04','ic05']:
                pixels=list(Image.open(iconset/(name+'.png')).convert('RGBA').get_flattened_data())
                channels=[bytes(p[3] for p in pixels)]+[bytes(round(p[c]*p[3]/255) for p in pixels) for c in range(3)]
                # Literal RLE runs of up to 128 bytes; channel order A,R,G,B.
                payload=b'ARGB'+b''.join(b''.join(bytes([len(channel[i:i+128])-1])+channel[i:i+128]
                    for i in range(0,len(channel),128)) for channel in channels)
            chunks.append(kind.encode()+struct.pack('>I',8+len(payload))+payload)
        body=b''.join(chunks)
        iconset.with_suffix('.icns').write_bytes(b'icns'+struct.pack('>I',8+len(body))+body)

def build_geometry():
    W,H=1600,900; s=rect(0,0,W,H,PAPER)
    s+=text('CONSTRUÇÃO E REDUÇÃO',64,62,14,weight=700,tracking=2)
    s+=text('Poucas formas. Espaço suficiente.',64,124,39)
    x,y=90,210; scale=2
    for n in range(0,257,16):
        s+=f'<path d="M {x+n*scale} {y} v 512 M {x} {y+n*scale} h 512" stroke="#DDDCD4" stroke-width="1"/>'
    s+=place(symbol('a',INK,'#B97423'),x,y,scale)
    for radius in [90,64]:
        s+=f'<circle cx="{x+256}" cy="{y+256}" r="{radius*2}" fill="none" stroke="#A7884E" stroke-width="1" stroke-dasharray="3 6"/>'
    s+=text('256 × 256 unidades · centro (128, 128)',90,770,17,MUTED)
    lines=['Raio externo 90 · raio interno 64','Sol: centro (177, 79) · raio 31','Abertura de 100° orientada a nordeste','Dois elementos sólidos e independentes','Margem do símbolo: 38 unidades','Sem filtros, máscaras ou autotrace']
    for i,line in enumerate(lines): s+=text(line,713,248+i*39,20)
    s+=text('AJUSTE ÓPTICO PARA 16–24 PX',713,533,12,MUTED,weight=700,tracking=1.2)
    s+=text('Anel 28 u · sol 30 u · abertura preservada',713,569,19)
    for i,size in enumerate([16,24,32,48,64]):
        xx=723+i*145
        s+=place(symbol('a',INK,micro=size<=24),xx,652-size/2,size/256)
        s+=text(f'{size} px',xx,728,14,MUTED)
    s+=text('Geometria e espaçamento são decisões desta proposta; não representam uma grade obrigatória da Apple.',64,854,16,MUTED)
    emit('boards/03-construction.svg',svg(W,H,s),[1600],True)

def build_native_board():
    W,H=1600,1050; s=rect(0,0,W,H,PAPER)
    s+=text('VERIFICAÇÃO NATIVA / ICNS',64,60,14,weight=700,tracking=2)
    s+=text('O arquivo lido pelo macOS.',64,119,42)
    s+=text('AppKit · NSImage.draw · 16, 32, 64 e 128 pt · imagens @1x e @2x no mesmo tamanho visual',64,162,17,MUTED)
    widths=[85,105,145,190]
    for scale in [1,2]:
        base=350+(scale-1)*575
        s+=text(f'REPRESENTAÇÃO @{scale}X',base,215,12,MUTED,weight=700,tracking=1.3)
        for j,points in enumerate([16,32,64,128]):
            xx=base+sum(widths[:j])
            s+=text(f'{points} pt',xx,246,13,MUTED)
    for row,mode in enumerate(['dark','light','mono-dark','mono-light']):
        yy=277+row*175
        s+=rect(64,yy,1472,163,'#D8DCD9' if 'dark' in mode else '#FFFFFF',16)
        s+=text(mode,90,yy+88,20)
        for scale in [1,2]:
            base=350+(scale-1)*575
            for j,points in enumerate([16,32,64,128]):
                path=ROOT/f'qa/native/{mode}-{points}pt-{scale}x.png'
                raw=base64.b64encode(path.read_bytes()).decode()
                xx=base+sum(widths[:j])
                s+=f'<image x="{xx}" y="{yy+81-points/2}" width="{points}" height="{points}" href="data:image/png;base64,{raw}"/>'
    s+=text('Renderização dos ICNS entregues. Não é uma captura do Dock nem integração no Oracle.app.',64,1015,16,MUTED)
    emit('boards/04-native-icns.svg',svg(W,H,s),[1600],True)

if __name__=='__main__':
    import sys
    if '--native-board' in sys.argv:
        build_native_board(); sys.exit(0)
    build_directions()
    build_comparison()
    build_hero()
    build_recommended()
    build_geometry()
    print('Created SVG, PDF, PNG and four classic ICNS families in',ROOT)
