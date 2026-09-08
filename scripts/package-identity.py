#!/usr/bin/env python3
"""Build ICNS from the authorized V3 correction, preserving its chosen background."""
from pathlib import Path
import shutil,subprocess
root=Path(__file__).resolve().parent.parent
source=root/'identity/oracle-v3/assets/icon-dark.png'
assert source.is_file(), 'Oracle V3 source is required; never fall back to rejected V1'
iconset=root/'.work/OracleV3.iconset';iconset.mkdir(parents=True,exist_ok=True)
for size in [16,32,128,256,512]:
    for scale in [1,2]:
        name=f'icon_{size}x{size}'+('@2x' if scale==2 else '')+'.png'
        subprocess.run(['sips','-z',str(size*scale),str(size*scale),str(source),'--out',str(iconset/name)],check=True,stdout=subprocess.DEVNULL)
subprocess.run(['iconutil','-c','icns',str(iconset),'-o',str(root/'Resources/Oracle.icns')],check=True)
shutil.copy(root/'identity/oracle-v3/assets/lockup-white.svg',root/'Resources/web/brand/lockup-white.svg')
print('Oracle V3 ICNS and wordmark prepared.')
