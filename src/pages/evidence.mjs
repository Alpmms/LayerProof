import { shot, guardrail } from "../site.mjs";
import { statesGrid } from "./_parts.mjs";

export default {
  file: "evidence.html",
  title: "Evidence",
  description: "How LayerProof describes evidence support, when it abstains from inference, and how it keeps every result traceable to its source file.",
  body: () => `
<section class="page-head"><div class="wrap">
  <h1>Evidence, support and abstention</h1>
  <p>LayerProof states what the available evidence can support at each location and pass, and declines to infer anything beyond it.</p>
</div></section>

<section class="sec" id="states"><div class="wrap">
  <div class="sec-grid">
    <div class="sec-head"><h2>Six evidence states</h2><p>They describe the availability and applicability of evidence. They do not describe construction quality.</p></div>
    <div class="sec-body">
      ${statesGrid()}
      <p class="table-note">The states are assigned by rules, with no model involved: physical tests, their association with roller data, layer and pass, roller-data coverage, the range of the real paired evidence, the spatial reference and the validation result. Each unit lists the reason codes that led to its state.</p>
      <p class="table-note">Because these are not quality judgements, they are drawn with neutral patterns here and with neutral markers in the application. There is no red or green.</p>
    </div>
  </div>
  <div class="shot-pair sec-full">
    ${shot("support-abstain-sparc", "On the real field trial: 113 location-and-pass units, of which 12 have a direct physical anchor.")}
    ${shot("support-units-sparc", "Each unit carries its state and the reason codes behind it.")}
  </div>
</div></section>

<section class="sec sec-alt" id="abstain"><div class="wrap sec-grid">
  <div class="sec-head"><h2>Abstention is a result</h2><p>Two states are reported on purpose, not left blank.</p></div>
  <div class="sec-body">
    <div class="codes">
      <div><span class="code">PREDICTIVE_MODEL_NOT_VALIDATED</span><p>No criterion defines when a predictive baseline counts as validated, and the real held-out results do not support one. LayerProof reports those results as they are and makes no inference from them.</p></div>
      <div><span class="code">PREDICTIVE_UNCERTAINTY_NOT_AVAILABLE</span><p>Without a model that has passed validation there is no credible predictive uncertainty to report, so none is shown.</p></div>
    </div>
    <p class="sub">These are deliberate scientific states. An interface that always produced a number would hide exactly the cases an engineer most needs to see.</p>
    ${guardrail()}
  </div>
</div></section>

<section class="sec" id="ic-only"><div class="wrap sec-grid">
  <div class="sec-head"><h2>Roller data alone is not an anchor</h2><p>What happens when a project has intelligent-compaction data and no physical tests.</p></div>
  <div class="sec-body">
    <p>On real MnDOT intelligent-compaction samples with a confirmed coordinate system and no physical tests, every one of the 246 grid cells is <span class="code">NO_PHYSICAL_ANCHOR</span>. The same data delivered without a confirmed coordinate system is <span class="code">UNRESOLVED_SPATIAL_REFERENCE</span> and is not drawn on the map at all.</p>
    ${shot("support-no-anchor-mndot", "An IC-only dataset: coverage is high, physical evidence is zero, inference is withheld.")}
  </div>
</div></section>

<section class="sec sec-alt" id="traceability"><div class="wrap sec-grid">
  <div class="sec-head"><h2>Traceability and provenance</h2><p>An auditable chain from the source file to the engineer's decision.</p></div>
  <div class="sec-body">
    <ol class="chain">
      <li>source file</li><li>file hash</li><li>canonical dataset version</li><li>validation run</li><li>association run</li><li>science run</li><li>support assessment</li><li>candidate-generation run</li><li>retrospective and pilot history</li><li>engineer decision</li><li>new physical evidence</li>
    </ol>
    <ul class="facts sub">
      <li><strong>Source files are kept unchanged</strong>Stored once under their SHA-256 hash and re-verifiable at any time.</li>
      <li><strong>Datasets are versioned</strong>A re-import creates a new version; earlier versions stay readable.</li>
      <li><strong>Runs are append-only</strong>Validation, science, support, candidate and retrospective runs cannot be edited or deleted by the application.</li>
      <li><strong>Policies are recorded with results</strong>Each run stores the policy version and settings it used.</li>
      <li><strong>Real and synthetic are never mixed</strong>Every dataset has an evidence class; synthetic fixtures are labelled and cannot anchor a real result.</li>
      <li><strong>Actions are audited</strong>Imports, runs and decisions appear in a per-project audit trail.</li>
    </ul>
    ${shot("provenance-fingerprint", "The fingerprint of a stored file and its integrity checks.")}
  </div>
</div></section>
`,
};
