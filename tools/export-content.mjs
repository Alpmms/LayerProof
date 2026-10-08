#!/usr/bin/env node
// Writes the exact public copy of the built site (dist/) as Markdown, page by page and section by section.
//   node tools/export-content.mjs > FINAL_WEBSITE_CONTENT.md
import { readFileSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";

const dist = join(dirname(fileURLToPath(import.meta.url)), "..", "dist");
const PAGES = ["index.html", "product.html", "evidence.html", "research.html", "pilot.html", "team.html", "contact.html", "404.html"];
const ent = (s) => s.replace(/&amp;/g, "&").replace(/&lt;/g, "<").replace(/&gt;/g, ">").replace(/&quot;/g, '"').replace(/&nbsp;/g, " ");
const inline = (s) => ent(s.replace(/<br\s*\/?>/g, " / ").replace(/<\/(strong|span|a|h3|i)>/g, " ").replace(/<[^>]+>/g, "").replace(/\s+/g, " ").trim());
function md(html) {
  let h = html.replace(/<svg[\s\S]*?<\/svg>/g, (m) => { const t = m.match(/<title[^>]*>([\s\S]*?)<\/title>/); return t ? `<p>[Graphic: ${t[1]}]</p>` : ""; });
  h = h.replace(/<img[^>]*alt="([^"]*)"[^>]*>/g, "<p>[Screenshot: $1]</p>");
  const out = [];
  const re = /<(h1|h2|h3|p|li|figcaption|caption|tr|dt|dd)\b[^>]*>([\s\S]*?)<\/\1>/g;
  let m;
  while ((m = re.exec(h))) {
    const [, tag, inner] = m;
    if (tag === "tr") { const cells = [...inner.matchAll(/<(th|td)\b[^>]*>([\s\S]*?)<\/\1>/g)].map((c) => inline(c[2])); if (cells.length) out.push(`| ${cells.join(" | ")} |`); continue; }
    if (/<(p|li|h[123]|tr)\b/.test(inner) && tag !== "li") { re.lastIndex = m.index + m[0].indexOf(">") + 1; continue; }
    const t = inline(inner);
    if (!t) continue;
    out.push(tag === "h1" ? `### ${t}` : tag === "h2" ? `#### ${t}` : tag === "h3" ? `##### ${t}` : tag === "li" ? `- ${t}` : tag === "caption" ? `*${t}*` : tag === "dt" ? `**${t}**` : t);
  }
  return out.join("\n\n").replace(/\|\n\n\|/g, "|\n|");
}
console.log("# Final website content\n\nThe exact public copy of the LayerProof website, exported from the built pages by `tools/export-content.mjs`.\nThis is the canonical final public wording. Built with no demo URL and no contact address configured.\n");
for (const p of PAGES) {
  const html = readFileSync(join(dist, p), "utf8");
  console.log(`\n## ${p}\n`);
  console.log(`Title: ${inline(html.match(/<title>([\s\S]*?)<\/title>/)[1])}\n`);
  console.log(`Description: ${ent(html.match(/<meta name="description" content="([^"]*)"/)[1])}\n`);
  console.log(md(html.match(/<main[^>]*>([\s\S]*?)<\/main>/)[1]));
  if (p === "index.html") console.log(`\n### Footer (every page)\n\n${md(html.match(/<footer[^>]*>([\s\S]*?)<\/footer>/)[1])}`);
}
