#!/usr/bin/env node
// Builds the static LayerProof website into ./dist. No dependencies.
//   node build.mjs
// Environment (all optional; values in site.config.json are the defaults):
//   SITE_URL        public URL of the site, e.g. https://<user>.github.io/<repository>  (canonical + social metadata)
//   SITE_BASE_PATH  path the site is served under, e.g. /<repository>/  (only used by 404.html)
//   DEMO_URL        URL of the hosted read-only demo; empty = no demo link is rendered
//   CONTACT_EMAIL / CONTACT_FORM_URL   public project contact channel
import { cpSync, mkdirSync, readFileSync, readdirSync, rmSync, writeFileSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";
import { page } from "./src/site.mjs";

const root = dirname(fileURLToPath(import.meta.url));
const dist = join(root, "dist");
const cfg = JSON.parse(readFileSync(join(root, "site.config.json"), "utf8"));
const env = process.env;
if (env.SITE_URL !== undefined) cfg.siteUrl = env.SITE_URL;
if (env.DEMO_URL !== undefined) cfg.demoUrl = env.DEMO_URL;
if (env.CONTACT_EMAIL !== undefined) cfg.contactEmail = env.CONTACT_EMAIL;
if (env.CONTACT_FORM_URL !== undefined) cfg.contactFormUrl = env.CONTACT_FORM_URL;
for (const k of ["siteUrl", "demoUrl", "contactFormUrl"])
  if (cfg[k] && !/^https:\/\//.test(cfg[k])) throw new Error(`${k} must be an https:// URL (got ${cfg[k]})`);
if (cfg.contactEmail && !/^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(cfg.contactEmail)) throw new Error("contactEmail is not an email address");
let basePath = env.SITE_BASE_PATH || "";
if (basePath && !basePath.endsWith("/")) basePath += "/";

rmSync(dist, { recursive: true, force: true });
mkdirSync(join(dist, "assets"), { recursive: true });

const names = ["index", "product", "evidence", "research", "pilot", "team", "contact", "notfound"];
const built = [];
for (const n of names) {
  const p = (await import(`./src/pages/${n}.mjs`)).default;
  // GitHub Pages serves 404.html for any missing path, at any depth, so it needs absolute asset paths.
  const basePrefix = p.file === "404.html" ? basePath : "";
  let html = page({ ...p, body: p.body(cfg), cfg, basePrefix });
  if (p.file === "404.html") html = html.replace(/href="(index|product)\.html"/g, (_, f) => `href="${basePrefix}${f}.html"`);
  writeFileSync(join(dist, p.file), html);
  built.push(p.file);
}

cpSync(join(root, "src/assets/styles.css"), join(dist, "assets/styles.css"));
cpSync(join(root, "src/assets/site.js"), join(dist, "assets/site.js"));
cpSync(join(root, "src/assets/fonts"), join(dist, "assets/fonts"), { recursive: true });
mkdirSync(join(dist, "assets/shots"));
for (const f of readdirSync(join(root, "src/assets/shots"))) if (f.endsWith(".webp")) cpSync(join(root, "src/assets/shots", f), join(dist, "assets/shots", f));
for (const f of ["og.png"]) cpSync(join(root, "src/assets", f), join(dist, "assets", f));
for (const f of ["favicon.svg", "favicon.png", "apple-touch-icon.png"]) cpSync(join(root, "src/static", f), join(dist, f));
writeFileSync(join(dist, ".nojekyll"), "");
const site = cfg.siteUrl.replace(/\/$/, "");
writeFileSync(join(dist, "robots.txt"), `User-agent: *\nAllow: /\n${site ? `Sitemap: ${site}/sitemap.xml\n` : ""}`);
if (site) {
  const urls = built.filter((f) => f !== "404.html").map((f) => `  <url><loc>${site}/${f === "index.html" ? "" : f}</loc></url>`).join("\n");
  writeFileSync(join(dist, "sitemap.xml"), `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${urls}\n</urlset>\n`);
}
console.log(`Built ${built.length} pages into dist/ (demo ${cfg.demoUrl ? "linked" : "not linked"}, contact ${cfg.contactEmail || cfg.contactFormUrl ? "set" : "not set"}, site URL ${site || "not set"})`);
