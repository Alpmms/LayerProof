#!/usr/bin/env node
// Renders the social preview image (1200x630) to src/assets/og.png. Run only when the brand line changes.
import { chromium } from "playwright";
import { dirname, join } from "node:path";
import { fileURLToPath, pathToFileURL } from "node:url";

const root = join(dirname(fileURLToPath(import.meta.url)), "..");
const fonts = pathToFileURL(join(root, "src/assets/fonts")).href;
const html = `<!doctype html><meta charset="utf-8"><style>
@font-face{font-family:D;font-weight:600;src:url(${fonts}/barlow-semi-condensed-latin-600-normal.woff2)}
@font-face{font-family:T;font-weight:500;src:url(${fonts}/barlow-latin-500-normal.woff2)}
body{margin:0;width:1200px;height:630px;background:#18202b;color:#fff;font-family:T;display:flex;flex-direction:column;justify-content:center;padding:0 88px;box-sizing:border-box}
.b{display:flex;align-items:center;gap:18px;font:600 40px D;color:#e9dcb6;margin-bottom:34px}
.m i{display:block;width:54px;height:10px;border-radius:2px;margin:6px 0}
h1{font:600 104px/0.98 D;margin:0 0 28px}p{font-size:34px;line-height:1.3;color:#c5cdd8;margin:0;max-width:900px}
.g{margin-top:44px;font-size:24px;color:#e9d9a8;border-left:4px solid #b9a67e;padding-left:16px}
</style><div class="b"><span class="m"><i style="background:#5c83c4"></i><i style="background:#b9a67e"></i><i style="background:#8a9a7b"></i></span>LayerProof</div>
<h1>Know where to test next.</h1><p>Evidence-aware construction quality assurance for intelligent compaction workflows.</p>
<div class="g">Decision support only — final engineering decisions remain with the engineer.</div>`;
const browser = await chromium.launch({ executablePath: process.env.PW_CHROMIUM_PATH || undefined, args: ["--no-sandbox"] });
const page = await browser.newPage({ viewport: { width: 1200, height: 630 } });
await page.setContent(html);
await page.evaluate(() => document.fonts.ready);
await page.screenshot({ path: join(root, "src/assets/og.png") });
await browser.close();
console.log("og.png written");
