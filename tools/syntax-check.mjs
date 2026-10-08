#!/usr/bin/env node
// Static check of every JavaScript module of the site. The site has no TypeScript; this is its type/syntax gate:
// each file must parse (node --check), every page module must load and export { file, title, body }, and every page
// must render with both an empty and a fully populated configuration.
import { spawnSync } from "node:child_process";
import { readdirSync, statSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath, pathToFileURL } from "node:url";

const root = join(dirname(fileURLToPath(import.meta.url)), "..");
const walk = (d) => readdirSync(d).flatMap((f) => { const p = join(d, f); return statSync(p).isDirectory() ? (/node_modules|dist|\.git$/.test(p) ? [] : walk(p)) : [p]; });
const files = walk(root).filter((f) => /\.(mjs|js)$/.test(f));
let bad = 0;
for (const f of files) {
  const r = spawnSync(process.execPath, ["--check", f], { encoding: "utf8" });
  if (r.status !== 0) { bad++; console.error(r.stderr); }
}
const { page } = await import(pathToFileURL(join(root, "src/site.mjs")));
const configs = [
  { siteUrl: "", demoUrl: "", contactEmail: "", contactFormUrl: "", showICorps: true },
  { siteUrl: "https://example.org/site", demoUrl: "https://demo.example.org", contactEmail: "team@example.org", contactFormUrl: "https://example.org/form", showICorps: false },
];
for (const f of readdirSync(join(root, "src/pages")).filter((n) => !n.startsWith("_"))) {
  const m = (await import(pathToFileURL(join(root, "src/pages", f)))).default;
  for (const k of ["file", "title", "body"]) if (!(k in m)) { bad++; console.error(`${f}: page module lacks "${k}"`); }
  for (const cfg of configs) {
    const html = page({ ...m, body: m.body(cfg), cfg });
    if (typeof html !== "string" || /undefined|\[object Object\]|NaN/.test(html.replace(/<script[\s\S]*?<\/script>/g, ""))) { bad++; console.error(`${f}: rendered output contains undefined, NaN or an object`); }
  }
}
if (bad) process.exit(1);
console.log(`OK: ${files.length} modules parse; every page renders with empty and full configuration.`);
