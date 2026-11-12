#!/usr/bin/env python3
"""Portfolio helper.
  python3 tools/portfolio.py export         resize and compress everything in _source/ into the site
  python3 tools/portfolio.py url <address>  set the public site address used by share cards
"""
import re,sys
from pathlib import Path
R=Path(__file__).resolve().parent.parent
def export():
    try:from PIL import Image,ImageOps
    except ImportError:sys.exit('Install Pillow first: pip install pillow')
    src=R/'_source'
    if not src.is_dir():sys.exit('Create a _source folder that mirrors the site folders (see README).')
    n=0
    for f in sorted(src.rglob('*')):
        if f.suffix.lower() not in('.png','.jpg','.jpeg','.tif','.tiff','.webp','.psd'):continue
        rel=f.relative_to(src);dest=next((R/c.with_suffix(e) for c in(rel,rel.parent/'images'/rel.name) for e in('.jpg','.png') if (R/c.with_suffix(e)).exists()),None)
        if not dest:print('skipped, no matching slot:',rel);continue
        with Image.open(dest) as d:size=d.size
        im=ImageOps.exif_transpose(Image.open(f))
        if dest.suffix=='.png':
            im=ImageOps.contain(im.convert('RGBA'),size,Image.LANCZOS);out=Image.new('RGBA',size,(0,0,0,0))
            out.paste(im,((size[0]-im.width)//2,(size[1]-im.height)//2));out.save(dest,optimize=True)
        else:ImageOps.fit(im.convert('RGB'),size,Image.LANCZOS).save(dest,quality=78,optimize=True,progressive=True)
        n+=1;print('ok',rel,f'{dest.stat().st_size//1024} KB')
    print(n,'file(s) exported')
def url(new):
    bf=R/'tools'/'base.txt';old=bf.read_text().strip();new=new.rstrip('/')+'/';n=0
    for f in R.rglob('index.html'):
        t=f.read_text(encoding='utf-8')
        if old in t:f.write_text(t.replace(old,new),encoding='utf-8');n+=1
    bf.write_text(new);print('updated',n,'pages to',new)
a=sys.argv[1:]
if a[:1]==['export']:export()
elif a[:1]==['url'] and len(a)>1:url(a[1])
else:print(__doc__)
