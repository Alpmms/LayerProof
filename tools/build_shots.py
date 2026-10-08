#!/usr/bin/env python3
"""Make the public, web-sized copies of accepted application screenshots (crop + resize + WebP). Nothing inside the
kept region is edited. Sources and crops: website/tools/screenshots.json. Needs Pillow.
    python website/tools/build_shots.py"""
from __future__ import annotations

import json
from pathlib import Path

from PIL import Image

ROOT = Path(__file__).resolve().parents[2]
OUT = ROOT / "website" / "src" / "assets" / "shots"
spec = json.loads((ROOT / "website" / "tools" / "screenshots.json").read_text())
manifest = []
OUT.mkdir(parents=True, exist_ok=True)
for s in spec["shots"]:
    im = Image.open(ROOT / s["src"]).convert("RGB")
    left, top, right, bottom = s["crop"]
    im = im.crop((left, top, min(right, im.width), min(bottom, im.height)))
    sizes = {}
    for w in (1400, 760):
        v = im if im.width <= w else im.resize((w, round(im.height * w / im.width)), Image.LANCZOS)
        name = f"{s['id']}-{w}.webp"
        v.save(OUT / name, "WEBP", quality=80, method=6)
        sizes[w] = {"file": name, "width": v.width, "height": v.height, "bytes": (OUT / name).stat().st_size}
    manifest.append({**s, "sizes": sizes})
(OUT / "manifest.json").write_text(json.dumps(manifest, indent=1))
print(f"{len(manifest)} screenshots, {sum(x['bytes'] for m in manifest for x in m['sizes'].values()) / 1024:.0f} KiB")
