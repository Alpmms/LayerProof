#!/usr/bin/env node
// Static checks on ./dist (run after `npm run build`). Exits non-zero on any finding.
//   links + assets resolve · no localhost/private paths · no secrets · no raw data files · page weight
//   required statements present · prohibited claims absent · both founders shown · accepted numbers intact
import { existsSync, readFileSync, readdirSync, statSync } from "node:fs";
import { dirname, extname, join, relative } from "node:path";
import { fileURLToPath } from "node:url";

const root = join(dirname(fileURLToPath(import.meta.url)), "..");
const dist = join(root, "dist");
const findings = [];
const fail = (where, msg) => findings.push(`${where}: ${msg}`);
const walk = (d) => readdirSync(d).flatMap((f) => { const p = join(d, f); return statSync(p).isDirectory() ? walk(p) : [p]; });
const files = walk(dist);
const pages = files.filter((f) => f.endsWith(".html"));
const rel = (f) => relative(dist, f);
const strip = (html) => html.replace(/<script[\s\S]*?<\/script>/g, " ").replace(/<style[\s\S]*?<\/style>/g, " ").replace(/<[^>]+>/g, " ").replace(/&amp;/g, "&").replace(/&nbsp;/g, " ").replace(/\s+/g, " ");

// 1. file types: only web assets, never data or archives
const ALLOWED = new Set([".html", ".css", ".js", ".svg", ".png", ".webp", ".woff2", ".txt", ".xml", ""]);
for (const f of files) {
  if (!ALLOWED.has(extname(f))) fail(rel(f), `unexpected file type in the published site`);
  if (statSync(f).size > 400 * 1024) fail(rel(f), `larger than 400 KiB (${Math.round(statSync(f).size / 1024)} KiB)`);
}

// 2. links and assets
for (const f of pages) {
  const html = readFileSync(f, "utf8");
  const ids = new Set([...html.matchAll(/\sid="([^"]+)"/g)].map((m) => m[1]));
  const refs = [...html.matchAll(/\s(?:href|src)="([^"]+)"/g)].map((m) => m[1]);
  for (const s of [...html.matchAll(/\ssrcset="([^"]+)"/g)]) for (const part of s[1].split(",")) refs.push(part.trim().split(/\s+/)[0]);
  for (const r of refs) {
    if (/^(https:|mailto:)/.test(r)) continue;
    if (/^(http:|\/\/|javascript:|data:)/.test(r)) { fail(rel(f), `disallowed URL scheme: ${r}`); continue; }
    if (r.startsWith("/") && rel(f) !== "404.html") { fail(rel(f), `root-absolute URL breaks under a repository sub-path: ${r}`); continue; }
    const [path, hash] = r.split("#");
    if (!path) { if (hash && !ids.has(hash)) fail(rel(f), `missing anchor #${hash}`); continue; }
    const target = r.startsWith("/") ? null : join(dirname(f), path);
    if (target && !existsSync(target)) { fail(rel(f), `broken link or missing asset: ${r}`); continue; }
    if (target && hash && target.endsWith(".html")) {
      const t = readFileSync(target, "utf8");
      if (!new RegExp(`\\sid="${hash}"`).test(t)) fail(rel(f), `missing anchor ${r}`);
    }
  }
  for (const m of html.matchAll(/<img\b[^>]*>/g)) {
    if (!/\salt="[^"]+"/.test(m[0])) fail(rel(f), "image without alt text");
    if (!/\swidth="\d+"/.test(m[0]) || !/\sheight="\d+"/.test(m[0])) fail(rel(f), "image without width/height (layout shift)");
  }
  if ((html.match(/<h1\b/g) || []).length !== 1) fail(rel(f), "page must have exactly one h1");
  if (!/<html lang="en">/.test(html)) fail(rel(f), "missing lang attribute");
  if (!/<meta name="description" content="[^"]{50,}"/.test(html)) fail(rel(f), "missing or short meta description");
  if (!/<meta property="og:title"/.test(html) || !/<meta property="og:image"/.test(html)) fail(rel(f), "missing Open Graph metadata");
  if (!/<title>[^<]{5,}<\/title>/.test(html)) fail(rel(f), "missing title");
}

// 3. private paths, local URLs, secrets (all text assets)
const PRIVATE = [
  [/localhost|127\.0\.0\.1|0\.0\.0\.0/i, "local URL"],
  [/\/mnt\/|\/tmp\/|\/home\/|\/root\/|\/Users\/|[A-Z]:\\\\/, "private filesystem path"],
  [/layerproof\.local|@layerproof\.(test|invalid)/i, "development sign-in address"],
  [/postgres(ql)?(\+\w+)?:\/\//i, "database URL"],
  [/AKIA[0-9A-Z]{16}|-----BEGIN [A-Z ]*PRIVATE KEY-----|ghp_[A-Za-z0-9]{30,}|sk-[A-Za-z0-9]{20,}|xox[baprs]-[A-Za-z0-9-]{10,}/, "secret or key"],
  [/\b(password|passwd|secret|api[_-]?key|token)\s*[:=]\s*["']?[A-Za-z0-9+/_-]{8,}/i, "credential assignment"],
  [/eyJ[A-Za-z0-9_-]{10,}\.[A-Za-z0-9_-]{10,}\./, "JWT"],
  [/change-me|lp_owner|lp_app\b|LP_[A-Z_]+=/, "deployment configuration"],
];
for (const f of files.filter((x) => [".html", ".css", ".js", ".txt", ".xml", ".svg"].includes(extname(x)))) {
  const text = readFileSync(f, "utf8");
  for (const [re, what] of PRIVATE) { const m = text.match(re); if (m) fail(rel(f), `${what}: "${m[0].slice(0, 60)}"`); }
}

// 4. claims. Text inside [data-not-claims] is the explicit "LayerProof is not ..." list and is excluded.
const PROHIBITED = [
  /predicts? defects?/i, /detects? (weak|soft|defect)/i, /weak zones?/i, /guarantee/i, /optimal (next[- ])?test/i, /optimal location/i,
  /automated acceptance/i, /autonomous(ly)? (accept|decid|instruct)/i, /AI determines/i, /AI[- ]powered/i, /failure probability/i, /probability of failure/i,
  /quality score/i, /defect probability/i, /risk score/i, /acceptance likelihood/i, /confidence score/i, /predicted (density|stiffness|modulus)/i,
  /validated (predict|model|uncertainty)/i, /\bproven\b/i, /NSF[- ](funded|backed|endorsed|validated)/i, /funded by/i, /backed by/i,
  /trusted by/i, /\bcustomers\b|\bour customer/i, /testimonial/i, /blockchain/i, /trustworthy AI/i, /pricing|buy now|sign up|waitlist/i, /state[- ]of[- ]the[- ]art|revolution|cutting[- ]edge|world[- ]class|game[- ]chang/i,
  /\b\d+(\.\d+)?\s?% (accura|reduc|sav|faster|improv)/i, /\b(saves?|reduces?) (cost|time|testing) by/i,
  /in production|production[- ]ready|certified(?! \w*\.)/i, /pass\/fail (result|decision|determination) (is|are) /i,
  // final close-out list
  /identif(y|ies|ied|ying) weak/i, /determines? acceptance/i, /automatically accepts?/i, /accepts? or rejects?/i, /optimal test location/i, /best test location/i,
  /proven across/i, /validated across/i, /field[- ]validated/i, /AI (determines|decides|selects|chooses)/i, /externally validated/i,
  /endorsed by|in partnership with|partner(ed|ship) with (NCHRP|TRB|MnDOT|MnROAD|UTEP)/i,
];
// wording that would make the site read as unfinished
const TEMPORARY = [/\bdraft\b/i, /\btemporary\b/i, /placeholder/i, /coming soon/i, /\bTODO\b/, /\bTBD\b/, /hosting pending/i, /being set up/i, /lorem ipsum/i, /under construction/i, /work in progress/i, /dev(eloper)? note/i];
// phrases that are negations of a prohibited claim and are therefore intended
const NEGATED = [/not production-certified/gi, /is not a prospective field pilot/gi, /not evidence of a usable predictor/gi];
const REQUIRED_SITEWIDE = ["Decision support only — final engineering decisions remain with the engineer."];
const REQUIRED = {
  "index.html": ["Know where to test next.", "Evidence-aware construction quality assurance for intelligent compaction workflows.", "Metehan Alp Memis", "Şevval Ulus Memiş", "Co-Founder", "NO CLEAR RETROSPECTIVE ADVANTAGE", "LayerProof does not replace field testing", "EVIDENCE_GAP_PRIORITY", "final test location selection remains with the engineer", "abstain when evidence is insufficient rather than manufacture confidence", "Prospective field pilot", "did not show a stable universal relationship with physical density",
    "External Spatial Benchmark — NCHRP 933 / MnROAD", "retrospective external spatial evaluation", "NO CLEAR EXTERNAL SPATIAL PRIORITIZATION ADVANTAGE", "no clear advantage over the comparison baselines was observed", "eight nominal strata", "CMV", "LWD", "FWD", "Local grid defined by the source", "No endorsement by NCHRP, TRB, MnDOT, MnROAD", "Provenance and trust", "testing and quality-assurance organizations", "Field test", "do not own, sponsor or endorse LayerProof"],
  "research.html": ["NO CLEAR RETROSPECTIVE ADVANTAGE", "LIMITED RETROSPECTIVE SIGNAL", "−0.40", "−0.08", "+0.09", "−0.50", "worse than a mean baseline", "must not be read as a validated relationship", "not a prospective field pilot", "not proof that a historical test location was the mathematically best location", "never paired with the MnDOT data", "20261005",
    "External evidence: two asphalt datasets", "External Spatial Benchmark — NCHRP 933 / MnROAD", "retrospective external spatial evaluation", "NO CLEAR EXTERNAL SPATIAL PRIORITIZATION ADVANTAGE", "no clear advantage over the comparison baselines was observed", "SOURCE_DEFINED_LOCAL_GRID", "Nothing was tuned on this dataset", "not independent sites", "limited power", "No endorsement by NCHRP, TRB, MnDOT, MnROAD", "No latitude, longitude or coordinate system was added", "The grid is not complete", "did not show a stable universal relationship with physical density", "PUBLISHED_AGGREGATED_REAL", "CROSS-DATASET RELATIONSHIP NOT STABLE", "EXTERNAL DOMAIN SHIFT OBSERVED",
    "INDEPENDENT PROJECT/SPATIAL VALIDATION NOT ASSESSABLE", "SPATIAL CANDIDATE PRIORITIZATION NOT ASSESSABLE FROM THIS DATASET", "CROSS-DATASET PREDICTIVE TRANSFER NOT COMPARABLE",
    "Random-row figures are exploratory only", "not raw project files", "Asphalt results say nothing about soil or granular layers", "Spatial next-test prioritization", "do not change this"],
  "evidence.html": ["SUPPORTED_EVIDENCE", "LIMITED_EVIDENCE", "OUT_OF_DOMAIN", "NO_PHYSICAL_ANCHOR", "UNRESOLVED_SPATIAL_REFERENCE", "VALIDATION_BLOCKED", "PREDICTIVE_MODEL_NOT_VALIDATED", "PREDICTIVE_UNCERTAINTY_NOT_AVAILABLE", "do not describe construction quality"],
  "team.html": ["Metehan Alp Memis", "Şevval Ulus Memiş", "University of Illinois Urbana-Champaign", "Maryville University", "do not own, sponsor or endorse LayerProof"],
  "pilot.html": ["No prospective field pilot has been run", "not production-certified", "Final test location selection remains with the engineer", "No clear advantage over the comparison baselines was observed"],
  "contact.html": ["not commercially available", "Field-data collaboration", "Pilot opportunities", "Transportation agencies", "Contractors", "Testing and quality-assurance organizations", "Research groups"],
};
for (const f of pages) {
  const html = readFileSync(f, "utf8");
  let text = strip(html.replace(/<[^>]+data-not-claims[^>]*>[\s\S]*?<\/ul>/g, " "));
  for (const n of NEGATED) text = text.replace(n, " ");
  for (const re of PROHIBITED) { const m = text.match(re); if (m) fail(rel(f), `prohibited or unsupported claim wording: "${m[0]}"`); }
  const full = strip(html);
  for (const s of REQUIRED_SITEWIDE) if (!full.includes(s)) fail(rel(f), `required statement missing: "${s}"`);
  for (const s of REQUIRED[rel(f)] || []) if (!full.includes(s)) fail(rel(f), `required content missing: "${s}"`);
  if (/Week[- ]?\d|WEEK\d/.test(full)) fail(rel(f), "internal milestone label (Week N) in public copy");
  for (const re of TEMPORARY) { const m = full.match(re); if (m) fail(rel(f), `temporary or unfinished wording: "${m[0]}"`); }
  if (/aria-disabled="true"|btn-pending|href="#"/.test(html)) fail(rel(f), "dead or disabled control");
  if (/NCHRP|MnROAD|MnDOT|TRB\b/.test(full) && !/No endorsement by NCHRP, TRB, MnDOT, MnROAD|No university or agency owns, sponsors or endorses LayerProof/.test(full)) fail(rel(f), "names an agency without the no-endorsement statement");
  if (/NCHRP (Research Report )?933|NCHRP\/MnROAD/.test(full) && !/retrospective/i.test(full)) fail(rel(f), "mentions the NCHRP benchmark without the word retrospective");
}

// 5. equal prominence of the founders on the team page (same element, same role label, similar length)
{
  const t = readFileSync(join(dist, "team.html"), "utf8");
  const cards = [...t.matchAll(/<article class="person">([\s\S]*?)<\/article>/g)].map((m) => m[1]);
  if (cards.length !== 2) fail("team.html", `expected exactly 2 founder cards, found ${cards.length}`);
  else {
    const len = cards.map((c) => strip(c).length);
    if (Math.max(...len) / Math.min(...len) > 1.35) fail("team.html", `founder cards differ too much in length (${len.join(" vs ")})`);
    for (const c of cards) if (!/<p class="role">Co-Founder<\/p>/.test(c)) fail("team.html", "a founder card lacks the Co-Founder role");
    const tags = cards.map((c) => (c.match(/<h2[^>]*>/) || [""])[0]);
    if (tags[0] !== tags[1]) fail("team.html", "founder names use different heading markup");
  }
}

// 6. the published numbers are exactly the accepted ones (re-derived from the accepted tables, not from the site data)
{
  const parseLine = (l) => { const out = []; let cur = "", q = false; for (const ch of l) { if (ch === '"') q = !q; else if (ch === "," && !q) { out.push(cur); cur = ""; } else cur += ch; } out.push(cur); return out; };
  const csv = (p) => { const [h, ...rows] = readFileSync(join(root, "..", p), "utf8").trim().split(/\r?\n/).map(parseLine); return rows.map((r) => Object.fromEntries(h.map((k, i) => [k, r[i]]))); };
  const signed = (x) => `${x < 0 ? "−" : "+"}${Math.abs(x).toFixed(2)}`;
  const research = strip(readFileSync(join(dist, "research.html"), "utf8"));
  if (existsSync(join(root, "..", "docs/science/sparc/table_sparc_runs.csv"))) {
    for (const r of csv("docs/science/sparc/table_sparc_runs.csv")) for (const k of ["ols_r2", "ridge_r2", "random_forest_r2"])
      if (r[k] !== "" && !research.includes(signed(Number(r[k])))) fail("research.html", `accepted Week-5 value missing: ${r.run} ${k} ${signed(Number(r[k]))}`);
    for (const r of csv("docs/retro/table_retro_metrics.csv").filter((x) => x.design === "LEAVE_ONE_LOCATION_OUT"))
      if (!research.includes(Number(r.mrr).toFixed(3))) fail("research.html", `accepted Week-8 MRR missing: ${r.layer} ${r.method} ${Number(r.mrr).toFixed(3)}`);
    for (const r of csv("docs/retro/table_retro_metrics.csv").filter((x) => !x.method.startsWith("RANDOM")))
      if (!research.includes(r.interpretation)) fail("research.html", `accepted Week-8 interpretation missing: ${r.interpretation}`);
    if (research.includes("RETROSPECTIVE PRIORITIZATION SIGNAL OBSERVED")) fail("research.html", "claims a signal the accepted results do not contain");
  } else console.log("note: accepted result tables not found next to website/ (standalone checkout) — number cross-check skipped");
}

// 7. external-validation numbers and labels are exactly those of the frozen export
{
  const exp = join(root, "..", "docs/external_validation/public_summary.json");
  const local = JSON.parse(readFileSync(join(root, "src/data/external_validation.json"), "utf8"));
  const research = strip(readFileSync(join(dist, "research.html"), "utf8"));
  const s2 = (x) => `${x < 0 ? "−" : "+"}${Math.abs(x).toFixed(2)}`;
  if (existsSync(exp) && readFileSync(exp, "utf8") !== readFileSync(join(root, "src/data/external_validation.json"), "utf8")) fail("src/data/external_validation.json", "differs from the frozen external-validation summary");
  for (const k of ["a_cmv_logo_r2", "a_ccv_logo_r2", "a_rmv_source_r2", "b_hmv_core_thickness_r2", "b_hmv_ndg_thickness_r2", "b_ndg_to_core_thickness_r2"])
    if (!research.includes(s2(local.headline[k]))) fail("research.html", `external-validation value missing: ${k} ${s2(local.headline[k])}`);
  for (const l of local.interpretation_labels) if (!research.includes(l.label)) fail("research.html", `external-validation label missing: ${l.label}`);
  for (const d of local.datasets) for (const rows of Object.values(d.results)) for (const r of rows)
    if (r.feature_set.length <= 4 && !research.includes(s2(r.ols))) fail("research.html", `external one-input R² missing: ${d.id} ${r.feature_set} ${r.design_id}`);
  if (/[A-Z]:\\|source_row|observed_vs_predicted/.test(JSON.stringify(local))) fail("src/data/external_validation.json", "contains record-level content");
}

// 8. external spatial benchmark: exact frozen label and counts, derived content only, no stale pre-benchmark claims
{
  const src = join(root, "src/data/external_spatial.json");
  const exp = join(root, "..", "docs/external_spatial_validation/public_summary.json");
  const sp = JSON.parse(readFileSync(src, "utf8"));
  if (existsSync(exp) && readFileSync(exp, "utf8") !== readFileSync(src, "utf8")) fail("src/data/external_spatial.json", "differs from the frozen external spatial summary");
  if (sp.interpretation !== "NO CLEAR EXTERNAL SPATIAL PRIORITIZATION ADVANTAGE" || sp.protocol !== "NCHRP933_SPATIAL_1.0.0") fail("src/data/external_spatial.json", "not the frozen NCHRP933_SPATIAL_1.0.0 result");
  if (sp.evidence_class !== "PUBLISHED_AGGREGATED_REAL") fail("src/data/external_spatial.json", "evidence class changed");
  if (/lwd_ksi|fwd_ksi|source_grid|"latitude"|"longitude"/.test(JSON.stringify(sp))) fail("src/data/external_spatial.json", "contains source values or coordinates");
  const pct = (x) => `${x < 0 ? "−" : "+"}${Math.abs(100 * x).toFixed(1)}%`;
  const research = strip(readFileSync(join(dist, "research.html"), "utf8"));
  const home = strip(readFileSync(join(dist, "index.html"), "utf8"));
  for (const [name, text] of [["research.html", research], ["index.html", home]]) {
    if (!text.includes(sp.interpretation)) fail(name, "frozen external spatial interpretation missing");
    if (!text.includes(sp.public_statement)) fail(name, "frozen external spatial public statement missing");
    for (const other of Object.keys(sp.interpretation_rule).filter((k) => k !== "favourable_cell" && k !== sp.interpretation)) if (text.includes(other)) fail(name, `shows a label the benchmark did not produce: ${other}`);
    const k = sp.counts;
    for (const [n, label] of [[k.evaluable_cells, "evaluable combinations"], [k.favourable_vs_random, "favourable against random choice"], [k.favourable_vs_maximin, "favourable against spatial maximin"], [k.favourable_vs_both, "favourable against both"]])
      if (!text.includes(`${n} ${label}`)) fail(name, `external spatial count missing or changed: ${n} ${label}`);
  }
  for (const c of sp.cells) for (const v of [c.vs_random, c.vs_maximin]) if (!research.includes(pct(v.median_delta))) fail("research.html", `external spatial value missing: ${c.stratum} ${c.modality} ${pct(v.median_delta)}`);
  for (const k of ["nominal_positions", "cmv", "lwd_exact_position", "fwd_exact_position", "cmv_lwd_pairs", "cmv_fwd_pairs", "cmv_lwd_fwd_triplets"]) if (!research.includes(String(sp.totals[k]))) fail("research.html", `external spatial total missing: ${k}`);
  // statements that were true before the spatial benchmark existed and would now be stale
  for (const f of pages) {
    const text = strip(readFileSync(f, "utf8"));
    for (const re of [/Addressed only by the retrospective check on the field trial/i, /no public dataset with positions/i, /has not been examined on external spatial data/i])
      if (re.test(text)) fail(rel(f), `stale statement from before the external spatial benchmark: ${re}`);
    if (/<img[^>]+(nchrp|F-2[4-7]|appendix)/i.test(readFileSync(f, "utf8"))) fail(rel(f), "embeds an image named after the source report");
  }
}

const total = files.reduce((n, f) => n + statSync(f).size, 0);
console.log(`Checked ${pages.length} pages, ${files.length} files, ${(total / 1024).toFixed(0)} KiB total.`);
if (findings.length) { console.error(`\n${findings.length} finding(s):\n- ${findings.join("\n- ")}`); process.exit(1); }
console.log("OK: links, assets, private-content scan, claims scan, final-wording scan, required statements, founder parity, accepted numbers, external evidence, external spatial benchmark.");
