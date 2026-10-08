// Result tables and repeated blocks. Every number comes from src/data/results.json (built from the accepted tables).
import { results, external, spatial, signed, fixed, esc } from "../site.mjs";

const R = results;
const LAYER = { soil_layer1: "Soil layer 1", ugm_layer2: "UGM layer 2" };
const DESIGN = { LEAVE_ONE_LOCATION_OUT: "Leave one location out", LEAVE_ONE_GROUP_OUT: "Leave one group out", SEQUENTIAL_REPLAY: "Sequential replay" };

export function week5Table() {
  const rows = R.week5.map((r) => {
    const blocked = r.gate !== "READY";
    const cells = blocked
      ? `<td colspan="4">Not evaluated — the evidence gate was not ready (no real paired records at a compacted pass)</td>`
      : `<td class="num${r.ols_r2 < 0 ? " neg" : ""}">${signed(r.ols_r2)}</td><td class="num${r.ridge_r2 < 0 ? " neg" : ""}">${signed(r.ridge_r2)}</td><td class="num${r.rf_r2 < 0 ? " neg" : ""}">${signed(r.rf_r2)}</td><td class="num">${r.ols_rmse.toFixed(r.unit === "%" ? 2 : 1)} ${r.unit}</td>`;
    return `<tr><th scope="row">${esc(r.target)}<br><span class="table-sub">${esc(r.layer)}</span></th><td class="num">${r.locations} / ${r.pairs}</td>${cells}<td>${r.uncertainty === "UNRESOLVED" ? "Unresolved" : "Not assessable"}</td></tr>`;
  }).join("");
  return `<div class="table-wrap" tabindex="0" role="region" aria-label="Held-out results of the SPARC paired study">
<table>
<caption>Held-out R² on real SPARC data, grouped by physical test location</caption>
<thead><tr><th scope="col">Target and layer</th><th scope="col" class="num">Locations / paired records</th><th scope="col" class="num">Linear (OLS) R²</th><th scope="col" class="num">Ridge R²</th><th scope="col" class="num">Random forest R²</th><th scope="col" class="num">OLS RMSE</th><th scope="col">Predictive uncertainty</th></tr></thead>
<tbody>${rows}</tbody>
</table></div>
<p class="table-note">Inputs: neighbourhood medians of the roller's CMV and CCV values around each test. R² below zero means the model did worse on held-out locations than predicting the mean. Random-forest values use the recorded seed ${R.generated_from.week5.seed}. Values are rounded for display from the accepted result table.</p>`;
}

function methodRow(label, m, ours = false) {
  return `<tr${ours ? ' class="ours"' : ""}><th scope="row">${label}</th><td class="num">${fixed(m.mrr)}</td><td class="num">${fixed(m.hit_1)}</td><td class="num">${fixed(m.hit_3)}</td><td class="num">${fixed(m.hit_5)}</td><td class="num">${fixed(m.mean_normalized_rank)}</td></tr>`;
}

export function week8Table(layer, design = "LEAVE_ONE_LOCATION_OUT") {
  const d = R.week8[layer][design];
  return `<div class="table-wrap" tabindex="0" role="region" aria-label="Retrospective ranking, ${LAYER[layer]}">
<table>
<caption>${LAYER[layer]} — ${d.hidden_locations} hidden locations, ${DESIGN[design].toLowerCase()}</caption>
<thead><tr><th scope="col">Ranking method</th><th scope="col" class="num">MRR</th><th scope="col" class="num">Hit@1</th><th scope="col" class="num">Hit@3</th><th scope="col" class="num">Hit@5</th><th scope="col" class="num">Mean normalized rank</th></tr></thead>
<tbody>
${methodRow("LayerProof frozen policy", d.WEEK7_FROZEN, true)}
${methodRow("Missing-anchor only (baseline)", d.MISSING_ANCHOR_ONLY)}
${methodRow("Random order (baseline, mean of 1,000)", d.RANDOM)}
</tbody></table></div>
<p class="table-note">Share of random orderings that matched or beat the frozen policy on MRR: <strong>${d.share_random_at_least_week7.toFixed(3)}</strong>. Recorded interpretation: <span class="code">${d.interpretation}</span>. Lower normalized rank is better.</p>`;
}

export function week8Matrix() {
  const head = Object.keys(DESIGN).map((k) => `<th scope="col">${DESIGN[k]}</th>`).join("");
  const rows = Object.keys(LAYER).map((l) => `<tr><th scope="row">${LAYER[l]} (${R.week8[l].LEAVE_ONE_LOCATION_OUT.hidden_locations} locations)</th>${Object.keys(DESIGN).map((k) => {
    const d = R.week8[l][k];
    return `<td><span class="code">${d.interpretation}</span><br><span class="table-sub">random ≥ policy: ${d.share_random_at_least_week7.toFixed(3)}</span></td>`;
  }).join("")}</tr>`).join("");
  return `<div class="table-wrap" tabindex="0" role="region" aria-label="Recorded interpretation per layer and design">
<table><caption>Recorded interpretation for each layer and holdout design</caption>
<thead><tr><th scope="col">Layer</th>${head}</tr></thead><tbody>${rows}</tbody></table></div>`;
}

export const STATES = [
  ["SUPPORTED_EVIDENCE", "A real physical test is associated with this location and pass, inside the range of the real paired evidence, on a validated dataset."],
  ["LIMITED_EVIDENCE", "The nearest real test is at another pass of the same location or at an adjacent location, or a policy minimum is not met."],
  ["OUT_OF_DOMAIN", "The layer, pass, measured values or machine lie outside what the real paired evidence covers."],
  ["NO_PHYSICAL_ANCHOR", "No real paired evidence applies here. Roller data alone cannot anchor an interpretation."],
  ["UNRESOLVED_SPATIAL_REFERENCE", "The coordinate reference was never confirmed and the source defines no location correspondence."],
  ["VALIDATION_BLOCKED", "A blocking validation finding stops this dataset from being used."],
];

export function statesGrid() {
  return `<div class="states">${STATES.map(([code, text], i) => `<div><span class="state s-${i + 1}"><i aria-hidden="true"></i>${code}</span><p>${text}</p></div>`).join("")}</div>`;
}

export const NOT_CLAIMS = [
  "an autonomous acceptance system",
  "an automated pass/fail system",
  "a defect detector",
  "a pavement failure predictor",
  "a replacement for physical field testing",
  "a system shown to predict density or stiffness",
  "a system that always identifies the best next test location",
  "a tool that determines acceptance or accepts and rejects work",
];

export const notClaims = () => `<ul class="notlist" data-not-claims>${NOT_CLAIMS.map((c) => `<li>${c}</li>`).join("")}</ul>`;

// ---------------------------------------------------------------- external public-data validation (EXTVAL export)
const X = external;
const s3 = (x) => (x == null ? "—" : `${x < 0 ? "−" : "+"}${Math.abs(x).toFixed(2)}`);
const cell = (rows, fs, design) => { const r = rows.find((q) => q.feature_set === fs && q.design_id === design); return r ? s3(r.ols) : "—"; };

/** One-input linear model, held-out R² under each design. Random rows are shown last and labelled exploratory. */
export function externalTable() {
  const [a, b] = X.datasets;
  const A = a.results.NNDG, BC = b.results.CORE_DENSITY, BN = b.results.NDG_DENSITY;
  const row = (label, n, g, s, r, cls = "") => `<tr${cls}><th scope="row">${label}</th><td class="num">${n}</td><td class="num">${g}</td><td class="num">${s}</td><td class="num">${r}</td></tr>`;
  const aRow = (fs, name) => row(`Asphalt A: ${name} to NNDG`, 153, cell(A, fs, "A_LOGO_LANEPASS"), cell(A, fs, "A_SOURCE_HOLDOUT"), cell(A, fs, "A_ROW_LEVEL"));
  const bRow = (rows, name) => row(`Asphalt B: HMV to ${name}`, 179, `${cell(rows, "hmv", "B_LOGO_THICKNESS")} / ${cell(rows, "hmv", "B_GROUP_ID")}`, cell(rows, "hmv", "B_SOURCE_HOLDOUT"), cell(rows, "hmv", "B_ROW_LEVEL"));
  return `<div class="table-wrap" tabindex="0" role="region" aria-label="External datasets: held-out R squared by hold-out design">
<table>
<caption>Held-out R² of a one-input linear model, by how records were held out</caption>
<thead><tr><th scope="col">Dataset, input and target</th><th scope="col" class="num">Records</th><th scope="col" class="num">A source group held out</th><th scope="col" class="num">Source's own split</th><th scope="col" class="num">Random rows (exploratory)</th></tr></thead>
<tbody>
${aRow("cmv", "CMV")}${aRow("ccv", "CCV")}${aRow("aicv", "AICV")}${aRow("rmv", "RMV")}
${bRow(BN, "NDG density")}${bRow(BC, "core density")}
</tbody></table></div>
<p class="table-note">Ordinary least squares, no tuning. For Asphalt A the held-out group is a source code column with 10 values. For Asphalt B the two figures are a layer thickness held out (3 values) and ID numbers held out (30). All hold-outs are inside one dataset; neither dataset identifies projects or sites, so none of this is independent project or site validation. Random-row figures are exploratory only and are not part of any LayerProof claim. One record of Asphalt B that looks column-shifted in the source is excluded here; results with it included are in the project's records and lead to the same conclusion.</p>`;
}

export function externalDatasets() {
  return `<div class="codes">${X.datasets.map((d) => `<div><span class="code">${d.label} · ${d.evidence_class}</span>
<p><strong>${d.short}.</strong> ${d.records} records. ${d.record_nature}. Projects and sites: not identified. Coordinates: none.</p></div>`).join("")}</div>`;
}

export const externalLabels = () => `<ul class="labels">${X.interpretation_labels.map((l) => `<li><span class="code">${l.label}</span><span>${esc(l.why)}</span></li>`).join("")}</ul>`;
export const externalStatement = () => esc(X.public_statement);
export const externalHead = X.headline;
export const externalNotAssessable = X.not_assessable;

// ---------------------------------------------------------------- external spatial benchmark (NCHRP933_SPATIAL export)
// Only derived results are shown. No source table, no source figure and no individual extracted value is published.
const SP = spatial;
const pct = (x, d = 1) => `${x < 0 ? "−" : "+"}${Math.abs(100 * x).toFixed(d)}%`;
export const spatialData = SP;
export const spatialVerdict = () => `<span class="verdict">${esc(SP.interpretation)}</span>`;
export const spatialStatement = () => esc(SP.public_statement);
export const spatialPct = pct;

export function spatialCounts() {
  const k = SP.counts;
  return `<div class="sp-counts">
<div><strong>${k.evaluable_cells}</strong><span>evaluable combinations of stratum and test type, from ${k.physical_cells} MnROAD cells</span></div>
<div><strong>${k.favourable_vs_random}</strong><span>favourable against random choice</span></div>
<div><strong>${k.favourable_vs_maximin}</strong><span>favourable against spatial maximin</span></div>
<div><strong>${k.favourable_vs_both}</strong><span>favourable against both, which is what the rule required</span></div>
</div>`;
}

/** Original schematic of the source-defined local grid: four lines, nine chainages. Positions only; no values. */
export function spatialGrid() {
  const x0 = 70, dx = 72, y0 = 34, dy = 30;
  let g = "";
  ["A", "B", "C", "D"].forEach((ln, r) => {
    const y = y0 + r * dy;
    g += `<line class="sp-line" x1="${x0}" y1="${y}" x2="${x0 + 8 * dx}" y2="${y}"/><text x="${x0 - 46}" y="${y + 4}">Line ${ln}</text>`;
    for (let c = 0; c < 9; c++) g += `<circle class="sp-pos" cx="${x0 + c * dx}" cy="${y}" r="5"/>`;
  });
  for (let c = 0; c < 9; c++) g += `<text class="sp-sub" x="${x0 + c * dx}" y="${y0 + 3 * dy + 26}" text-anchor="middle">${(c * 7.5).toString()} m</text>`;
  g += `<text class="sp-sub" x="${x0 + 8 * dx + 18}" y="${y0 + 4}">0 m</text><text class="sp-sub" x="${x0 + 8 * dx + 18}" y="${y0 + 3 * dy + 4}">6.3 m</text>`;
  return `<figure class="sp-fig">
<svg viewBox="0 0 720 170" role="img" aria-labelledby="spg-t spg-d"><title id="spg-t">Local grid defined by the source</title>
<desc id="spg-d">Four parallel lines A to D, 2.1 metres apart, each with nine positions from 0 to 60 metres at 7.5 metre spacing: 36 nominal positions per stratum.</desc>${g}</svg>
<figcaption>Original schematic of the test grid described in the source: four lines 2.1 m apart, nine chainages 7.5 m apart, 36 nominal positions per stratum. These are local positions, not GPS coordinates. No measured value is shown.</figcaption>
</figure>`;
}

/** Median change in area under the error curve, with its bootstrap interval, for every evaluable combination. */
export function spatialDeltaChart() {
  const cells = SP.cells;
  const all = cells.flatMap((c) => [...c.vs_random.ci95_median_delta, ...c.vs_maximin.ci95_median_delta]);
  const lim = Math.ceil((Math.max(...all.map(Math.abs)) * 100) / 5) * 5;
  const L = 250, R = 20, T = 46, rh = 30, W = 720, H = T + cells.length * rh + 34;
  const x = (v) => L + ((100 * v + lim) / (2 * lim)) * (W - L - R);
  let g = `<text x="${L}" y="16" class="sp-sub">Change in area under the error curve, median of ${SP.design.replicates} starting configurations with 95% interval</text>`;
  g += `<circle class="sp-r" cx="${L + 6}" cy="30" r="4.5"/><text x="${L + 16}" y="34">against random choice</text><rect class="sp-m" x="${L + 170}" y="25.5" width="9" height="9" transform="rotate(45 ${L + 174.5} 30)"/><text x="${L + 186}" y="34">against spatial maximin</text>`;
  for (let t = -lim; t <= lim; t += 5) g += `<line class="${t === 0 ? "sp-zero" : "sp-row"}" x1="${x(t / 100)}" y1="${T}" x2="${x(t / 100)}" y2="${T + cells.length * rh}"/><text class="sp-sub" x="${x(t / 100)}" y="${T + cells.length * rh + 16}" text-anchor="middle">${t > 0 ? "+" : t < 0 ? "−" : ""}${Math.abs(t)}%</text>`;
  g += `<text class="sp-sub" x="${x(-lim / 100)}" y="${H - 4}">baseline better</text><text class="sp-sub" x="${x(lim / 100)}" y="${H - 4}" text-anchor="end">frozen priority better</text>`;
  cells.forEach((c, i) => {
    const y = T + i * rh + rh / 2;
    const name = c.name.replace(/^Cell (\d+), /, "$1 · ").replace(" on sandy subgrade", "").replace(" on clayey subgrade", "");
    g += `<text x="8" y="${y + 4}">${esc(name)} · ${c.modality}</text>`;
    const r = c.vs_random, m = c.vs_maximin;
    g += `<line class="sp-ci sp-r" x1="${x(r.ci95_median_delta[0])}" y1="${y - 6}" x2="${x(r.ci95_median_delta[1])}" y2="${y - 6}"/><circle class="sp-r" cx="${x(r.median_delta)}" cy="${y - 6}" r="4.5"/>`;
    const mx = x(m.median_delta);
    g += `<line class="sp-ci sp-m" x1="${x(m.ci95_median_delta[0])}" y1="${y + 6}" x2="${x(m.ci95_median_delta[1])}" y2="${y + 6}"/><rect class="sp-m" x="${mx - 4.5}" y="${y + 1.5}" width="9" height="9" transform="rotate(45 ${mx} ${y + 6})"/>`;
  });
  return `<figure class="sp-fig">
<svg viewBox="0 0 ${W} ${H}" role="img" aria-labelledby="spd-t spd-d"><title id="spd-t">Frozen priority compared with two baselines on published MnROAD data</title>
<desc id="spd-d">For each of ${cells.length} combinations of stratum and test type, the median relative change in area under the reconstruction-error curve against random choice and against spatial maximin, with 95 percent intervals. Most intervals against random choice include or lie below zero. The values are in the table that follows.</desc>${g}</svg>
<figcaption>Original graphic drawn from the benchmark results. To the right of zero the frozen priority reduced reconstruction error faster than the baseline; to the left the baseline did. A combination counts as favourable only when the whole interval is to the right of zero.</figcaption>
</figure>`;
}

export function spatialTable() {
  const rows = SP.cells.map((c) => {
    const ci = (v) => `${pct(v.median_delta)}<br><span class="table-sub">${pct(v.ci95_median_delta[0])} to ${pct(v.ci95_median_delta[1])}</span>`;
    return `<tr><th scope="row">${esc(c.name)}</th><td>${c.modality}</td><td class="num">${c.values}</td><td class="num">${ci(c.vs_random)}</td><td class="num">${ci(c.vs_maximin)}</td><td>${c.vs_random.favourable ? "yes" : "no"} / ${c.vs_maximin.favourable ? "yes" : "no"}</td></tr>`;
  }).join("");
  return `<div class="table-wrap" tabindex="0" role="region" aria-label="External spatial benchmark by stratum and test type">
<table>
<caption>Frozen priority against two baselines, by stratum and test type</caption>
<thead><tr><th scope="col">Stratum</th><th scope="col">Test</th><th scope="col" class="num">Values</th><th scope="col" class="num">Against random choice</th><th scope="col" class="num">Against spatial maximin</th><th scope="col">Favourable (random / maximin)</th></tr></thead>
<tbody>${rows}</tbody></table></div>
<p class="table-note">Each figure is the median relative change in the area under the normalized reconstruction-error curve over 15 added tests, with its 95% bootstrap interval. Positive means the frozen priority did better. Pooled over all starting configurations: ${pct(SP.pooled.RANDOM.median_delta)} against random choice and ${pct(SP.pooled.SPATIAL_MAXIMIN.median_delta)} against spatial maximin. The ${SP.design.replicates} starting configurations per row are replays of one field, not independent sites.</p>`;
}

export function spatialAvailability() {
  const rows = SP.strata.map((s) => `<tr><th scope="row">${esc(s.name)}</th><td class="num">${s.nominal_positions}</td><td class="num">${s.cmv}</td><td class="num">${s.lwd_exact_position}</td><td class="num">${s.fwd_exact_position}</td><td>${s.evaluable.LWD || s.evaluable.FWD ? "yes" : "no — test positions not exact in the source"}</td></tr>`).join("");
  const t = SP.totals;
  return `<div class="table-wrap" tabindex="0" role="region" aria-label="Counts of published values by stratum">
<table>
<caption>What the source provides: counts of exactly positioned values in the eight nominal strata</caption>
<thead><tr><th scope="col">Stratum</th><th scope="col" class="num">Nominal positions</th><th scope="col" class="num">CMV</th><th scope="col" class="num">LWD</th><th scope="col" class="num">FWD</th><th scope="col">Evaluated</th></tr></thead>
<tbody>${rows}<tr><th scope="row">Total</th><td class="num">${t.nominal_positions}</td><td class="num">${t.cmv}</td><td class="num">${t.lwd_exact_position}</td><td class="num">${t.fwd_exact_position}</td><td></td></tr></tbody></table></div>
<p class="table-note">The grid is not complete. The source states that empty entries are missing or erroneous measurements. A further ${t.lwd_merged_cells} LWD and ${t.fwd_merged_cells} FWD values on the sandy subgrade are printed across two chainages; their position is not exact, so they were counted and not used. CMV and LWD are both present at ${t.cmv_lwd_pairs} positions, CMV and FWD at ${t.cmv_fwd_pairs}, all three at ${t.cmv_lwd_fwd_triplets}.</p>`;
}

export const SPATIAL_LIMITS = [
  "It is retrospective. Published values were revealed in a simulated order; no test was placed in the field because of LayerProof.",
  "It is one field study with four cells at one facility. The replays per combination are different starting configurations, not independent sites.",
  "The input is published, buffer-averaged and rounded. Raw roller records and raw deflection data were not available.",
  "The two sandy-subgrade strata could not be evaluated because their test positions are not exact in the source.",
  "Two of the seven priority components cannot vary on this dataset, and about two thirds of the choices were ties resolved by a fixed order.",
  "Usefulness was measured one way: how well the tests taken so far reconstruct the values not yet taken. Another definition could order the strategies differently.",
  "Reconstruction error barely fell as tests were added under any strategy, so the benchmark has limited power to separate them.",
  "LWD and FWD moduli are not density, and nothing here concerns acceptance.",
];
export const spatialLimits = () => `<ul>${SPATIAL_LIMITS.map((l) => `<li>${l}</li>`).join("")}</ul>`;
