#!/usr/bin/env node
// Screenshots of named sections of the built site (dist/), for the public screenshot inventory.
//   SHOTS=<dir> node tools/section-shots.mjs
import { chromium } from "playwright";
import { spawn } from "node:child_process";
import { mkdirSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";

const root = join(dirname(fileURLToPath(import.meta.url)), "..");
const out = process.env.SHOTS || join(root, "..", "docs/screenshots/public_final");
mkdirSync(out, { recursive: true });
const PORT = 4392;
const server = spawn(process.execPath, [join(root, "tools/serve.mjs"), "--port", String(PORT)], { stdio: "ignore" });
await new Promise((r) => setTimeout(r, 600));
const SHOTS = [
  ["site-01-homepage", "index.html", "#hero"],
  ["site-02-product-workflow", "product.html", null],
  ["site-03-science", "research.html", "#study"],
  ["site-04-external-validation", "research.html", "#external"],
  ["site-05-two-questions", "research.html", "#two-questions"],
  ["site-06-retrospective-disclosure", "research.html", "#retrospective"],
  ["site-07-home-retrospective-disclosure", "index.html", "#retrospective"],
  ["site-08-team", "team.html", null],
  ["site-09-home-external-evidence", "index.html", "#external"],
  ["site-10-home-nchrp-benchmark", "index.html", "#nchrp"],
  ["site-11-research-external-spatial", "research.html", "#external-spatial"],
  ["site-12-home-pilot-workflow", "index.html", "#pilot"],
  ["site-13-contact", "contact.html", null],
];
const browser = await chromium.launch({ executablePath: process.env.PW_CHROMIUM_PATH || undefined, args: ["--no-sandbox"] });
try {
  const page = await browser.newPage({ viewport: { width: 1440, height: 900 }, reducedMotion: "reduce" });
  for (const [name, file, sel] of SHOTS) {
    await page.goto(`http://127.0.0.1:${PORT}/${file}`, { waitUntil: "networkidle" });
    await page.evaluate(async () => { for (const i of document.images) i.loading = "eager"; await Promise.all([...document.images].map((i) => i.decode().catch(() => {}))); });
    await page.addStyleTag({ content: ".site-head, .sec-head { position: static !important; }" });
    if (sel) await page.locator(sel).screenshot({ path: join(out, `${name}.png`) });
    else await page.screenshot({ path: join(out, `${name}.png`), clip: { x: 0, y: 0, width: 1440, height: 1500 }, fullPage: true });
  }
} finally { await browser.close(); server.kill(); }
console.log(`${SHOTS.length} section screenshots written`);
