import { shot, guardrail, demoCta } from "../site.mjs";

const stage = (n, id, name, lead, body, figure) => `
<div class="stage" id="${id}">
  <div><span class="stage-no">Workspace ${n} of 7</span><h2>${name}</h2><p class="lead" style="margin-top:14px">${lead}</p>${body}</div>
  <div>${figure}</div>
</div>`;

export default {
  file: "product.html",
  title: "Product",
  description: "A walk through the seven LayerProof workspaces, from project setup to pilot, with screenshots of the working application on real data.",
  body: (cfg) => `
<section class="page-head"><div class="wrap">
  <h1>The product, workspace by workspace</h1>
  <p>Project, Data, Evidence, Map, Science, Verify, Pilot. Every screen below is a screenshot of the working application.</p>
  ${cfg.demoUrl ? `<p class="cta-row" style="margin-top:22px">${demoCta(cfg, { primary: true })}</p>` : `<p class="plain-note" style="margin-top:22px">A read-only demonstration of the application is packaged for hosting. It is not publicly hosted; the screens on this page are from the same application.</p>`}
</div></section>

<section class="sec sec-alt"><div class="wrap">
  <ol class="pipe">
    <li><strong><a href="#project">Project</a></strong><span>Metadata, lifts, rollers, coordinate and reference context</span></li>
    <li><strong><a href="#data">Data</a></strong><span>Import with source files, units and versions preserved</span></li>
    <li><strong><a href="#evidence">Evidence</a></strong><span>Validation and evidence sufficiency</span></li>
    <li><strong><a href="#map">Map</a></strong><span>Coverage, tests, areas and associations</span></li>
    <li><strong><a href="#science">Science</a></strong><span>Leakage-resistant analysis of real paired evidence</span></li>
    <li><strong><a href="#verify">Verify</a></strong><span>Evidence gaps and ranked candidates</span></li>
    <li><strong><a href="#pilot">Pilot</a></strong><span>Review, decision log, field-test return</span></li>
  </ol>
  <p class="table-note">This page is a static walkthrough. The website itself does not run the LayerProof backend.</p>
</div></section>

<section class="sec"><div class="wrap">
${stage(1, "project", "Project", "Set the reference frame everything else depends on.", `
  <p>A project records its working coordinate system, time zone and vertical datum, the lifts and the rollers. LayerProof does not guess any of these: roller data cannot be placed on a map until the coordinate reference is confirmed.</p>
  <p>Every stored file gets a SHA-256 fingerprint, checked in the browser, on the server and again whenever the stored copy is re-verified.</p>`,
  shot("provenance-fingerprint", "A stored file with its fingerprint and three integrity checks."))}
${stage(2, "data", "Data", "Import roller and test files without losing where they came from.", `
  <p>Roller exports and physical-test workbooks are mapped to a canonical form. The original file is kept byte for byte, the mapping is saved and versioned, and each import creates a new dataset version rather than overwriting the last.</p>
  <p>Units are carried as stated in the source. Where a source does not state a unit, LayerProof records that instead of assuming one.</p>`,
  shot("data-datasets", "Datasets, their versions and the ingestion runs that produced them."))}
${stage(3, "evidence", "Evidence", "Check what the data can be used for before using it.", `
  <p>Validation runs in levels: file structure, coordinates and reference system, time, measurements and units, then the association between tests and roller data, then whether the minimum data package for an analysis is present.</p>
  <p>Findings are specific. An unconfirmed coordinate system blocks spatial use; unconfirmed time-zone semantics block time-based use. Nothing is silently repaired.</p>`,
  shot("evidence-validation", "Validation levels with the findings that block spatial and temporal use."))}
${stage(4, "map", "Map", "See the roller coverage and the tests in the same place.", `
  <p>The map draws recorded evidence only: roller observations, coverage, physical tests, lots and sublots, associations and located validation findings. At large scale the server returns aggregated grid cells, so a dataset with over a million rows never reaches the browser as individual points.</p>
  <p>Roller values are shown as the vendor's source metric. The map does not interpolate, estimate stiffness or mark zones.</p>`,
  shot("map-ic", "Roller observations with layer controls and the evidence-in-view panel."))}
${stage(5, "science", "Science", "Evaluate real paired evidence, and keep the result whatever it is.", `
  <p>A gate checks that the roller data and the tests are real, from the same site, spatially referenced, in known units and deterministically associated. Only then are baseline models evaluated, always held out by physical test location so that neighbouring rows cannot leak into the test set.</p>
  <p>Negative and inconclusive results are stored and shown like any other. <a href="research.html">See what the real study found.</a></p>`,
  shot("science-gate", "The evidence gate on real field-trial data, with statistical adequacy left unresolved."))}
${stage(6, "verify", "Verify", "Find the evidence gaps and rank where another test may help.", `
  <p>LayerProof ranks candidate locations by <span class="code">EVIDENCE_GAP_PRIORITY</span>, built from seven visible components. A read-only simulation shows how many units would gain a physical anchor if a test were taken at a candidate, without assuming any test result.</p>
  ${guardrail("Decision support only — final test location selection remains with the engineer.")}`,
  shot("verify-candidates", "Ranked candidates with support state, priority and reason codes.") + shot("verify-components", "The component breakdown behind one candidate.") + shot("map-candidates", "Candidates on the map as neutral rings, with the inspector open."))}
${stage(7, "pilot", "Pilot", "Close the loop with the engineer and the field.", `
  <p>The Pilot tab holds a readiness checklist, a log of engineer decisions on each candidate, and a before-and-after comparison once a new physical test has been imported. A decision is added next to the ranking; the ranking itself is never rewritten.</p>
  <p><a href="pilot.html">How a pilot would run</a></p>`,
  shot("pilot-readiness", "The pilot readiness checklist.") + shot("pilot-decisions", "The engineer review log beside the ranked candidates."))}
</div></section>
`,
};
