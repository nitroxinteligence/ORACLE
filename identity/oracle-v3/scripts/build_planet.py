#!/usr/bin/env python3
"""Planet + Michroma. Analytic vector curves; no raster tracing."""
from pathlib import Path
from functools import lru_cache
from math import sqrt
from html import escape
import base64
from fontTools.ttLib import TTFont
from fontTools.varLib.instancer import instantiateVariableFont
from fontTools.pens.svgPathPen import SVGPathPen
from fontTools.pens.boundsPen import BoundsPen
import cairosvg

ROOT=Path(__file__).resolve().parents[1]
WHITE='#EFF7FF'; DARK='#080E17'; INK='#101E2C'; BLUE='#79C9FF'; MUTED='#8DA6BD'
def svg(w,h,b,title='Oracle / Michroma + planeta / proposta V3'):
    return f'<svg xmlns="http://www.w3.org/2000/svg" width="{w}" height="{h}" viewBox="0 0 {w} {h}" role="img"><title>{escape(title)}</title>{b}</svg>'
def group(b,x=0,y=0,s=1):return f'<g transform="translate({x} {y}) scale({s})">{b}</g>'
def rect(x,y,w,h,c,r=0,stroke='none'):return f'<rect x="{x}" y="{y}" width="{w}" height="{h}" rx="{r}" fill="{c}" stroke="{stroke}"/>'
@lru_cache(None)
def font(key):
    if key=='michroma':return TTFont(ROOT/'fonts/Michroma-Regular.ttf')
    return instantiateVariableFont(TTFont(ROOT/'fonts/Manrope-Variable.ttf'),{'wght':500},inplace=False)
@lru_cache(None)
def glyph(key,char):
    f=font(key);gs=f.getGlyphSet();name=f.getBestCmap().get(ord(char),'space');p=SVGPathPen(gs);gs[name].draw(p)
    return p.getCommands(),f['hmtx'][name][0]
def letters(s,size,color=WHITE,key='body',tracking=0,cap=False):
    f=font(key);unit=f['head'].unitsPerEm
    if cap:
        gs=f.getGlyphSet();p=BoundsPen(gs);gs[f.getBestCmap()[ord('H')]].draw(p);unit=p.bounds[3]
    scale=size/unit;x=0;parts=[]
    for c in s:
        d,adv=glyph(key,c);parts.append(f'<path fill="{color}" d="{d}" transform="translate({x} 0) scale({scale} {-scale})"/>');x+=adv*scale+tracking
    return ''.join(parts),x-tracking
def text(s,x,y,size=20,c=WHITE,key='body',tracking=0):return group(letters(s,size,c,key,tracking)[0],x,y)
def center(s,x,y,size=20,c=WHITE,key='body',tracking=0):
    a,w=letters(s,size,c,key,tracking);return group(a,x-w/2,y)
def word(c=WHITE,h=48):return letters('ORACLE',h,c,'michroma',h*.12,True)
def crossing(rx,ry,r=68):
    u=sqrt((r*r-ry*ry)/(1-ry*ry/(rx*rx)))
    return u,sqrt(r*r-u*u)

def planet(c=WHITE,accent=None,part='all',micro=False):
    accent=accent or c
    # Planet radius 68. Orbit axes 112/45. The front belt is separate from the
    # two hemispheres with real transparent channels; all boundaries are arcs.
    u,v=crossing(112,45);ui,vi=crossing(99,32)
    left=f'M16 128 A112 45 0 0 1 {128-u} {128-v} L{128-ui} {128-vi} A99 32 0 0 0 29 128 Z'
    right=f'M240 128 A112 45 0 0 0 {128+u} {128-v} L{128+ui} {128-vi} A99 32 0 0 1 227 128 Z'
    ut,vt=crossing(112,23 if micro else 27)
    upper=f'<path fill="{c}" d="M{128-ut} {128+vt} A68 68 0 1 1 {128+ut} {128+vt} A112 {23 if micro else 27} 0 0 1 {128-ut} {128+vt} Z"/>'
    ub,vb=crossing(112,54 if micro else 50)
    lower=f'<path fill="{c}" d="M{128+ub} {128+vb} A68 68 0 0 1 {128-ub} {128+vb} A112 {54 if micro else 50} 0 0 0 {128+ub} {128+vb} Z"/>'
    front='M16 128 A112 45 0 0 0 240 128 L227 128 A99 32 0 0 1 29 128 Z'
    orbit=f'<path fill="{accent}" d="{left} {right} {front}"/>'
    b={'all':orbit+upper+lower,'sphere':upper+lower,'orbit':orbit}[part]
    return f'<g transform="rotate(-28 128 128)">{b}</g>'
def lockup(c=WHITE):
    wm,w=word(c,51)
    return group(planet(c),0,0,.50)+group(wm,150,90),150+w
def icon(mode='dark'):
    dark=mode=='dark';fg=WHITE if dark else INK
    # Approved backgrounds stay unchanged; the entire foreground uses one solid fill.
    defs='<defs><linearGradient id="bg" x1="0" y1="0" x2="1" y2="1"><stop stop-color="'+('#1F354D' if dark else '#FFFFFF')+'"/><stop offset=".55" stop-color="'+('#0B1828' if dark else '#E5EFF6')+'"/><stop offset="1" stop-color="'+('#060B12' if dark else '#CDDDEA')+'"/></linearGradient></defs>'
    b=defs+rect(64,64,896,896,'url(#bg)',192,'#29415A' if dark else '#BDCFDC')
    b+=group(planet(fg),116,116,792/256)
    return svg(1024,1024,b,'Oracle / ícone conceitual de planeta / '+mode)
def emit(name,doc,width=None,pdf=False):
    p=ROOT/name;p.parent.mkdir(exist_ok=True,parents=True);p.write_text(doc)
    if width:cairosvg.svg2png(bytestring=doc.encode(),write_to=str(p.with_suffix('.png')),output_width=width)
    if pdf:cairosvg.svg2pdf(bytestring=doc.encode(),write_to=str(p.with_suffix('.pdf')))
def image(doc,x,y,size):return f'<image x="{x}" y="{y}" width="{size}" height="{size}" href="data:image/svg+xml;base64,{base64.b64encode(doc.encode()).decode()}"/>'
def exports():
    for name,c in [('white','#FFFFFF'),('black','#000000')]:
        emit(f'assets/symbol-{name}.svg',svg(256,256,planet(c)),1024,True)
        emit(f'assets/symbol-micro-{name}.svg',svg(256,256,planet(c,micro=True)),256)
        wm,w=word(c,64);emit(f'assets/wordmark-{name}.svg',svg(round(w+32,3),108,group(wm,16,79)),1400,True)
        lo,w=lockup(c);emit(f'assets/lockup-{name}.svg',svg(round(w+24,3),152,group(lo,12,12)),1400,True)
    for mode in ['dark','light']:emit(f'assets/icon-{mode}.svg',icon(mode),1024)
    for name in ['sphere','orbit']:emit(f'assets/composer-{name}.svg',svg(1024,1024,group(planet('#FFFFFF',part=name),116,116,792/256)),1024)

def board():
    w,h=1600,1190;s=rect(0,0,w,h,DARK)
    s+=text('ORACLE / IDENTIDADE V3',64,60,14,BLUE,tracking=2)
    s+=text('Michroma + planeta.',64,124,42)
    s+=text('Fonte escolhida · ícones com cores sólidas',65,161,18,MUTED)
    s+=group(planet(WHITE),169,222,1.7)
    wm,ww=word(WHITE,64);s+=group(wm,388-ww/2,758)
    s+=center('Um planeta. Uma órbita. Seu universo.',388,821,19,MUTED)
    s+=rect(830,228,706,648,'#0D1A28',20,'#1D334A')
    s+=text('ÍCONE DO APLICATIVO / CONCEITO',867,273,11,MUTED,tracking=1.4)
    s+=image(icon('dark'),866,305,297)+image(icon('light'),1202,356,232)
    s+=center('Escuro',1014,661,14,MUTED)+center('Claro',1318,661,14,MUTED)
    s+=text('FORMA EM UMA COR',867,733,10,MUTED,tracking=1.7)
    s+=group(planet(WHITE),902,754,100/256)
    s+=rect(1081,748,133,106,'#F1F6FA',10)+group(planet(INK),1097,751,100/256)
    s+=text('Curvas vetoriais.',1251,787,15,MUTED)+text('Órbita em negativo.',1251,817,15,MUTED)
    s+=rect(64,926,1472,1,'#263A4D')
    s+=text('ASSINATURA HORIZONTAL',64,967,10,MUTED,tracking=1.4)
    lo,lw=lockup(WHITE);s+=group(lo,64,987,.69)
    s+=text('REDUÇÃO / CANVAS EM PX',884,967,10,MUTED,tracking=1.4)
    for i,size in enumerate([16,24,32,64]):
        xx=910+i*131;s+=group(planet(WHITE,micro=size<32),xx,1044-size/2,size/256)+text(str(size),xx,1097,11,MUTED)
    s+=text('Proposta para revisão · Michroma: Google Fonts / Vernon Adams · nenhum ícone substituído no app',64,1150,13,MUTED)
    emit('boards/oracle-planet-michroma.svg',svg(w,h,s),1600,True)
def icon_color_board():
    s=rect(0,0,1200,740,DARK)
    s+=text('ORACLE / ÍCONES REVISADOS',64,61,13,BLUE,tracking=2)
    s+=text('Fundo preservado. Planeta em cor sólida.',64,117,32)
    s+=image(icon('dark'),102,161,425)+image(icon('light'),673,161,425)
    s+=center('Escuro / branco sólido',314,630,21)
    s+=center('Claro / grafite sólido',886,630,21)
    s+=center('Mesmo desenho, escala e fundos. Sem gradiente no planeta ou na órbita.',600,695,16,MUTED)
    emit('boards/icon-colors-corrected.svg',svg(1200,740,s),1200,True)
if __name__=='__main__':exports();board();icon_color_board();print('V3 planet + Michroma exported with solid icon foregrounds.')
