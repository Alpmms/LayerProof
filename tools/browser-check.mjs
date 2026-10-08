#!/usr/bin/env node
// Browser checks on the built site, served under a repository sub-path exactly as GitHub Pages serves a project site.
//   every page x desktop/tablet/mobile: all requests succeed, no horizontal overflow, axe WCAG 2.1 A/AA clean,
//   keyboard-reachable navigation, 404 page works at a nested missing path. Optional screenshots: SITE_SHOTS=<dir>
import { chromium } from "playwright";
import { AxeBuilder } from "@axe-core/playwright";
import { spawn, spawnSync } from "node:child_process";
import { mkdirSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";

const root = join(dirname(fileURLToPath(import.meta.url)), "..");
const BASE = "/layerproof-site-check/", PORT = 4391, origin = `http://127.0.0.1:${PORT}`;
const b = spawnSync(process.execPath, [join(root, "build.mjs")], { env: { ...process.env, SITE_BASE_PATH: BASE }, stdio: "inherit" });
if (b.status !== 0) process.exit(1);
const server = spawn(process.execPath, [join(root, "tools/serve.mjs"), "--port", String(PORT), "--base", BASE], { stdio: "ignore" });
await new Promise((r) => setTimeout(r, 700));
const shots = process.env.SITE_SHOTS;
if (shots) mkdirSync(shots, { recursive: true });
const findings = [];
const PAGES = ["index.html", "product.html", "evidence.html", "research.html", "pilot.html", "team.html", "contact.html"];
const VIEWS = [["desktop", 1440, 900], ["tablet", 820, 1100], ["mobile", 390, 800]];
const browser = await chromium.launch({ executablePath: process.env.PW_CHROMIUM_PATH || undefined, args: ["--no-sandbox"] });
try {
  for (const [name, width, height] of VIEWS) {
    const ctx = await browser.newContext({ viewport: { width, height }, reducedMotion: "reduce" });
    const page = await ctx.newPage();
    page.on("response", (r) => { if (r.status() >= 400 && !r.url().includes("/no/such/")) findings.push(`${name}: ${r.status()} ${r.url()}`); });
    page.on("requestfailed", (r) => { if (r.failure()?.errorText !== "net::ERR_ABORTED") findings.push(`${name}: request failed ${r.url()}`); });
    page.on("request", (r) => { if (!r.url().startsWith(origin + BASE)) findings.push(`${name}: request outside the site: ${r.url()}`); });
    page.on("pageerror", (e) => findings.push(`${name}: script error ${e.message}`));
    for (const p of PAGES) {
      await page.goto(origin + BASE + p, { waitUntil: "networkidle" });
      await page.evaluate(async () => { for (const i of document.images) i.loading = "eager"; await Promise.all([...document.images].map((i) => i.decode().catch(() => {}))); });
      const broken = await page.evaluate(() => [...document.images].filter((i) => !i.naturalWidth).map((i) => i.src));
      for (const s of broken) findings.push(`${name} ${p}: image did not load ${s}`);
      const over = await page.evaluate(() => document.documentElement.scrollWidth - window.innerWidth);
      if (over > 1) findings.push(`${name} ${p}: horizontal overflow of ${over}px`);
      const axe = await new AxeBuilder({ page }).withTags(["wcag2a", "wcag2aa", "wcag21a", "wcag21aa"]).analyze();
      for (const v of axe.violations) findings.push(`${name} ${p}: axe ${v.id} (${v.impact}) x${v.nodes.length}: ${v.nodes[0].target}`);
      if (shots && (name !== "tablet")) await page.screenshot({ path: join(shots, `${p.replace(".html", "")}-${name}.png`), fullPage: true });
    }
    // keyboard: skip link first, then navigation reachable
    await page.goto(origin + BASE + "index.html");
    await page.keyboard.press("Tab");
    if (!(await page.evaluate(() => document.activeElement?.classList.contains("skip")))) findings.push(`${name}: first Tab stop is not the skip link`);
    if (name === "mobile") {
      await page.locator(".nav-toggle").click();
      if (!(await page.locator("#site-nav a", { hasText: "Team" }).isVisible())) findings.push("mobile: menu did not open");
      await page.locator("#site-nav a", { hasText: "Team" }).click();
      if (!page.url().endsWith("team.html")) findings.push("mobile: navigation link did not work");
    }
    // GitHub Pages serves 404.html for any missing path, at any depth
    const r = await page.goto(origin + BASE + "no/such/page", { waitUntil: "networkidle" });
    if (r.status() !== 404) findings.push(`${name}: missing path did not return 404`);
    if (!(await page.locator("h1", { hasText: "Page not found" }).isVisible())) findings.push(`${name}: 404 page not rendered`);
    const styled = await page.evaluate(() => getComputedStyle(document.querySelector(".site-head")).backgroundColor);
    if (styled !== "rgb(24, 32, 43)") findings.push(`${name}: 404 page lost its stylesheet at a nested path`);
    await page.locator("a[data-home]").first().click();
    if (!page.url().endsWith(BASE + "index.html")) findings.push(`${name}: 404 home link went to ${page.url()}`);
    await ctx.close();
  }
} finally {
  await browser.close();
  server.kill();
  spawnSync(process.execPath, [join(root, "build.mjs")], { stdio: "ignore" }); // leave dist/ as the default build
}
if (findings.length) { console.error(`${findings.length} finding(s):\n- ${[...new Set(findings)].join("\n- ")}`); process.exit(1); }
console.log(`OK: ${PAGES.length} pages x ${VIEWS.length} viewports under ${BASE} — requests, layout, axe WCAG 2.1 A/AA, keyboard, 404.`);
