#!/usr/bin/env node
// Local preview of ./dist.  node tools/serve.mjs [--port 4321] [--base /repository/] [--watch]
// --base serves the site under a sub-path, the way GitHub Pages does for a project repository.
import { createServer } from "node:http";
import { existsSync, readFileSync, statSync, watch } from "node:fs";
import { spawnSync } from "node:child_process";
import { dirname, extname, join, normalize } from "node:path";
import { fileURLToPath } from "node:url";

const root = join(dirname(fileURLToPath(import.meta.url)), "..");
const dist = join(root, "dist");
const arg = (n, d) => { const i = process.argv.indexOf(n); return i > 0 ? process.argv[i + 1] : d; };
const port = Number(arg("--port", "4321"));
let base = arg("--base", "/");
if (!base.startsWith("/")) base = "/" + base;
if (!base.endsWith("/")) base += "/";
const TYPES = { ".html": "text/html; charset=utf-8", ".css": "text/css; charset=utf-8", ".js": "text/javascript; charset=utf-8", ".svg": "image/svg+xml", ".png": "image/png", ".webp": "image/webp", ".woff2": "font/woff2", ".txt": "text/plain; charset=utf-8", ".xml": "application/xml", ".json": "application/json" };

if (process.argv.includes("--watch")) {
  let t;
  watch(join(root, "src"), { recursive: true }, () => { clearTimeout(t); t = setTimeout(() => { spawnSync(process.execPath, [join(root, "build.mjs")], { stdio: "inherit" }); }, 150); });
}

createServer((req, res) => {
  const url = decodeURIComponent(new URL(req.url, "http://x").pathname);
  const send = (code, file) => { res.writeHead(code, { "Content-Type": TYPES[extname(file)] || "application/octet-stream", "Cache-Control": "no-store" }); res.end(readFileSync(file)); };
  if (!url.startsWith(base)) return existsSync(join(dist, "404.html")) ? send(404, join(dist, "404.html")) : res.writeHead(404).end();
  let rel = normalize(url.slice(base.length)).replace(/^(\.\.[/\\])+/, "");
  let file = join(dist, rel);
  if (existsSync(file) && statSync(file).isDirectory()) file = join(file, "index.html");
  if (!existsSync(file) && existsSync(file + ".html")) file += ".html"; // GitHub Pages also serves /page for page.html
  if (!file.startsWith(dist) || !existsSync(file)) return send(404, join(dist, "404.html"));
  send(200, file);
}).listen(port, "127.0.0.1", () => console.log(`LayerProof website preview: http://127.0.0.1:${port}${base}`));
