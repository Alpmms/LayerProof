import { shot, guardrail, demoCta, ctaRow, contactBlock, laneStrip, results } from "../site.mjs";
import { week8Table, statesGrid, notClaims, externalStatement, spatialStatement, spatialVerdict, spatialCounts, spatialGrid } from "./_parts.mjs";

const soil = results.week5.find((r) => r.run === "A_dry_density_soil_layer1");
const ugm = results.week5.find((r) => r.run === "A_dry_density_UGM_layer2");
const m = (x) => `${x < 0 ? "−" : "+"}${Math.abs(x).toFixed(2)}`;

export default {
  file: "index.html",
  title: "LayerProof",
  body: (cfg) => `
<section class="hero" id="hero">
  <div class="wrap">
    <div class="hero-grid">
      <div>
        <p class="product-name">LayerProof</p>
        <h1>Know where to test next.</h1>
        <p class="lede">Evidence-aware construction quality assurance for intelligent compaction workflows.</p>
        <p>Intelligent-compaction data can cover most of a construction site, while physical verification stays sparse. LayerProof brings both together with the project context, shows where the evidence does not support an interpretation, and helps engineers weigh where another physical test may add useful evidence.</p>
        <p class="cta-row">
          <a class="btn btn-primary" href="product.html">Explore the product</a>
          <a class="btn btn-line" href="#how">See how it works</a>
          <a class="btn btn-line" href="research.html">View the evidence</a>
        </p>
        <p class="hero-guard">${"Decision support only — final engineering decisions remain with the engineer."}</p>
      </div>
      ${shot("verify-candidates", "The Verify workspace on real field-trial data: candidate locations for another physical test, ordered by evidence gap.", { eager: true })}
    </div>
    ${laneStrip()}
  </div>
</section>

<section class="sec" id="problem">
  <div class="wrap sec-grid">
    <div class="sec-head">
      <h2>Dense roller data, sparse tests</h2>
      <p>The hard part is not collecting data. It is knowing what the data you have can support.</p>
    </div>
    <div class="sec-body">
      <div class="sources">
        <div><span class="dens">thousands of rows per lift</span><h3>Intelligent-compaction data</h3><p>Roller measurement values, pass counts and positions logged continuously across the mat.</p></div>
        <div><span class="dens">a handful of points</span><h3>Physical field tests</h3><p>Density, moisture, LWD or DCP results at chosen spots. Which of these exist differs from project to project.</p></div>
        <div><span class="dens">often incomplete</span><h3>Project context</h3><p>Layers, lifts, rollers, coordinate reference, time zone and units that decide whether the two can be compared at all.</p></div>
      </div>
      <p class="question">Where is the evidence strong enough to interpret, where is it not, and where could one more physical test add the most?</p>
      <p>LayerProof does not replace field testing. It keeps the roller data and the tests side by side, with the provenance of both, so that the next test is chosen with the gaps in view.</p>
    </div>
  </div>
</section>

<section class="sec sec-alt" id="how">
  <div class="wrap sec-grid">
    <div class="sec-head">
      <h2>How LayerProof works</h2>
      <p>Seven workspaces, in the order an engineer would use them.</p>
    </div>
    <div class="sec-body">
      <ol class="pipe">
        <li><strong>Project</strong><span>Metadata, lifts, rollers, coordinate reference</span></li>
        <li><strong>Data</strong><span>Import roller and test files, keep the originals</span></li>
        <li><strong>Evidence</strong><span>Validate structure, location, time and units</span></li>
        <li><strong>Map</strong><span>See coverage, tests and their associations</span></li>
        <li><strong>Science</strong><span>Evaluate real paired evidence, report what it shows</span></li>
        <li><strong>Verify</strong><span>Rank candidate locations by evidence gap</span></li>
        <li><strong>Pilot</strong><span>Review, decide, test, update the evidence</span></li>
      </ol>
      <p class="sub"><a href="product.html">Walk through each workspace with real screens</a></p>
    </div>
  </div>
</section>

<section class="sec" id="screens">
  <div class="wrap">
    <div class="sec-grid">
      <div class="sec-head"><h2>The product, as built</h2><p>These are screenshots of the working application on real data, not mock-ups.</p></div>
      <div class="sec-body">
        ${shot("map-ic", "<strong>Map.</strong> Roller observations coloured by the vendor's own metric, with the evidence in view listed on the right.")}
      </div>
    </div>
    <div class="shot-pair sec-full">
      ${shot("evidence-validation", "<strong>Evidence.</strong> Validation findings state exactly what blocks spatial or temporal use of a dataset.")}
      ${shot("science-gate", "<strong>Science.</strong> A gate lists every condition real data must meet before any model result is shown.")}
    </div>
  </div>
</section>

<section class="sec sec-alt" id="abstention">
  <div class="wrap">
    <div class="sec-grid">
      <div class="sec-head">
        <h2>Evidence support and abstention</h2>
        <p>Each location and pass gets a state that describes the evidence, never the construction.</p>
      </div>
      <div class="sec-body">
        ${statesGrid()}
        <p class="table-note">These states describe whether evidence is available and applicable. They say nothing about construction quality, which is why the site and the application do not colour them as pass or fail.</p>
        <p class="sub"><a href="evidence.html">How the states are assigned</a></p>
      </div>
    </div>
    <div class="sec-full">${shot("support-abstain-sparc", "The application abstains from inference on the field-trial data and says why.", { wide: true })}</div>
  </div>
</section>

<section class="sec" id="science">
  <div class="wrap sec-grid">
    <div class="sec-head">
      <h2>What the evidence showed</h2>
      <p>LayerProof reports negative and inconclusive results as they are.</p>
    </div>
    <div class="sec-body">
      <p class="lead">On a real field trial, simple models built from roller values did not predict dry density at held-out test locations.</p>
      <ul class="facts">
        <li><strong>UGM layer 2, ${ugm.locations} locations</strong>Linear-model R² ${m(ugm.ols_r2)}; random forest ${m(ugm.rf_r2)}</li>
        <li><strong>Soil layer 1, ${soil.locations} locations</strong>Linear-model R² ${m(soil.ols_r2)}; random forest ${m(soil.rf_r2)}</li>
      </ul>
      <p>A negative R² means the model did worse than predicting the mean. With results like these, no predictive model is treated as validated and no predictive uncertainty is reported. LayerProof is designed to abstain when evidence is insufficient rather than manufacture confidence.</p>
      <p><a href="research.html">Read the full results and method</a></p>
    </div>
  </div>
</section>

<section class="sec" id="verify">
  <div class="wrap">
    <div class="sec-grid">
      <div class="sec-head">
        <h2>Where another test may help</h2>
        <p>Verification candidates are ordered by how much evidence is missing, using components you can read.</p>
      </div>
      <div class="sec-body">
        <p>For each candidate location LayerProof shows seven components: whether a physical test exists there, the evidence-support state, the separation from existing tests, gaps in layer and pass context, gaps in the measured range, roller-data coverage, and how many nearby units a test there would newly anchor.</p>
        <p>They combine into one ordering value, <span class="code">EVIDENCE_GAP_PRIORITY</span>. The weights are explicit product-policy settings that anyone can inspect. They are not engineering acceptance criteria.</p>
        ${guardrail("Decision support only — final test location selection remains with the engineer.")}
        ${shot("verify-components", "Every candidate opens to its components, weights and plain-language reasons.")}
      </div>
    </div>
  </div>
</section>

<section class="sec sec-alt" id="retrospective">
  <div class="wrap sec-grid">
    <div class="sec-head">
      <h2>Retrospective check</h2>
      <p>We tested the ranking against history and report the answer as it came out.</p>
    </div>
    <div class="sec-body">
      <p>Real historical test locations were hidden from LayerProof one at a time. The pipeline was rerun without them, and we measured how highly each hidden location was ranked, against two simple baselines.</p>
      <p><span class="verdict">${results.week8_overall}</span></p>
      <p>The frozen ranking policy did not show a clear advantage over the baselines on the available data. Two of six layer-and-design combinations showed a limited signal; the other four did not, and none reached the pre-declared threshold for an observed signal.</p>
      ${week8Table("soil_layer1")}
      <p class="plain-note">This is a retrospective evaluation on 8 and 13 historical locations from one trial. It is not a prospective field pilot, and a historical test location is not proof of the best possible location.</p>
      <p><a href="research.html#retrospective">See both layers and all three designs</a></p>
    </div>
  </div>
</section>

<section class="sec" id="external">
  <div class="wrap sec-grid">
    <div class="sec-head">
      <h2>External evidence</h2>
      <p>Public data from other sources, examined with the same methods and no tuning.</p>
    </div>
    <div class="sec-body">
      <div class="twoq">
        <div><h3>Two public asphalt datasets</h3><p>Does a roller measurement value relate to physical density in a way that holds on groups the model has not seen?</p><p>${externalStatement()} Neither dataset has coordinates, so they say nothing about where to test next.</p><p><a href="research.html#external">See the asphalt analysis</a></p></div>
        <div><h3>Published MnROAD field data with positions</h3><p>When tests are added one at a time, does the frozen priority recover the untested values faster than simple baselines?</p><p>${spatialStatement()}</p><p><a href="#nchrp">See the spatial benchmark</a></p></div>
      </div>
      <p class="plain-note">Both are published, aggregated data examined outside the project workflow. Neither is a prospective field pilot.</p>
    </div>
  </div>
</section>

<section class="sec sec-alt" id="nchrp">
  <div class="wrap">
    <div class="sec-grid">
      <div class="sec-head">
        <h2>External Spatial Benchmark — NCHRP 933 / MnROAD</h2>
        <p>A retrospective external spatial evaluation on a public field dataset.</p>
      </div>
      <div class="sec-body">
        <p>NCHRP Research Report 933 publishes, in its Appendix F, roller and spot-test results from proof mapping on four MnROAD cells (185, 186, 188 and 189) in 2017. Subgrade and base were tested in each cell, which gives eight nominal strata. For every stratum the report lists a roller compaction meter value (CMV), a light weight deflectometer (LWD) modulus and a falling weight deflectometer (FWD) modulus on a small grid.</p>
        ${spatialGrid()}
        <h3 class="sub">Retrospective design</h3>
        <p>Four tests were made visible and every other LWD or FWD value was hidden. The frozen LayerProof priority, with its accepted settings and no tuning, chose the next position; the published value there was revealed; and this was repeated for 15 tests. LWD and FWD were evaluated separately. The same replay was run with random choice and with spatial maximin, which always picks the position farthest from the tests taken so far. The measure was how well the tests taken so far reconstruct the values still hidden.</p>
        <p>${spatialVerdict()}</p>
        <p>${spatialStatement()}</p>
        ${spatialCounts()}
        <p>The rule set before the run asked for an advantage over both baselines. The frozen priority did better than spatial maximin more often than not, and was level with or behind random choice in most combinations.</p>
        <h3 class="sub">Limitations</h3>
        <ul>
          <li>Retrospective replay of published values. No test was placed in the field because of LayerProof.</li>
          <li>One field study at one facility; published, buffer-averaged and rounded values, not raw files.</li>
          <li>The two sandy-subgrade strata could not be evaluated because their test positions are not exact in the source.</li>
          <li>Reconstruction error barely fell as tests were added under any strategy, so the benchmark has limited power.</li>
        </ul>
        <p class="plain-note">Source: NCHRP Research Report 933, Appendix F, Transportation Research Board. The report's tables and figures are not reproduced here; the graphics are original and drawn from derived results. No endorsement by NCHRP, TRB, MnDOT, MnROAD or the report's authors is implied.</p>
        <p><a href="research.html#external-spatial">Method, per-stratum results and all limitations</a></p>
      </div>
    </div>
  </div>
</section>

<section class="sec" id="pilot">
  <div class="wrap sec-grid">
    <div class="sec-head">
      <h2>Built for a pilot</h2>
      <p>The workflow an engineer would follow on a live project is implemented end to end.</p>
    </div>
    <div class="sec-body">
      <ol class="pipe pipe-7">
        <li><strong>Import</strong><span>Roller and test files, originals kept</span></li>
        <li><strong>Validate</strong><span>Findings and blockers</span></li>
        <li><strong>Evidence</strong><span>What is paired, what is not</span></li>
        <li><strong>Support</strong><span>A state for each location and pass</span></li>
        <li><strong>Verify</strong><span>Candidates, ranked with reasons; the engineer decides</span></li>
        <li><strong>Field test</strong><span>Taken by the project team</span></li>
        <li><strong>Update</strong><span>Evidence before and after</span></li>
      </ol>
      ${shot("pilot-readiness", "The readiness checklist lists what a pilot needs. It is not a construction or quality status.")}
      <p class="sub"><a href="pilot.html">How a pilot would run</a></p>
    </div>
  </div>
</section>

<section class="sec sec-alt" id="traceability">
  <div class="wrap sec-grid">
    <div class="sec-head">
      <h2>Provenance and trust</h2>
      <p>Every result can be followed back to the file it came from.</p>
    </div>
    <div class="sec-body">
      <ol class="chain">
        <li>source file</li><li>file hash</li><li>dataset version</li><li>validation run</li><li>association run</li><li>science run</li><li>support assessment</li><li>candidate run</li><li>retrospective and pilot history</li><li>engineer decision</li><li>new physical evidence</li>
      </ol>
      <p class="sub">Source files are stored unchanged and fingerprinted. Datasets are versioned. Runs and decisions are append-only records that the application cannot edit or delete, so the history of how a conclusion was reached stays intact.</p>
      ${shot("provenance-fingerprint", "A stored file with its SHA-256 fingerprint and integrity checks.")}
    </div>
  </div>
</section>

<section class="sec" id="capabilities">
  <div class="wrap sec-grid">
    <div class="sec-head">
      <h2>Current capabilities</h2>
      <p>Implemented is not the same as shown in the field. Both are stated.</p>
    </div>
    <div class="sec-body">
      <div class="table-wrap" tabindex="0" role="region" aria-label="Capability status">
      <table class="cap">
        <thead><tr><th scope="col">Capability</th><th scope="col">Implemented</th><th scope="col">Prospective field pilot</th></tr></thead>
        <tbody>
          <tr><th scope="row">Foundation and provenance</th><td><span class="tag tag-done">Complete</span></td><td><span class="tag tag-open">Not yet</span></td></tr>
          <tr><th scope="row">Canonical data ingestion</th><td><span class="tag tag-done">Complete</span></td><td><span class="tag tag-open">Not yet</span></td></tr>
          <tr><th scope="row">Validation and sufficiency</th><td><span class="tag tag-done">Complete</span></td><td><span class="tag tag-open">Not yet</span></td></tr>
          <tr><th scope="row">Map and evidence workspace</th><td><span class="tag tag-done">Complete</span></td><td><span class="tag tag-open">Not yet</span></td></tr>
          <tr><th scope="row">Real paired scientific baseline</th><td><span class="tag tag-done">Complete</span></td><td><span class="tag tag-open">Not yet</span></td></tr>
          <tr><th scope="row">Evidence support and abstention</th><td><span class="tag tag-done">Complete</span></td><td><span class="tag tag-open">Not yet</span></td></tr>
          <tr><th scope="row">Verification candidate prioritization</th><td><span class="tag tag-done">Complete</span></td><td><span class="tag tag-open">Not yet</span></td></tr>
          <tr><th scope="row">Retrospective check on the field trial</th><td><span class="tag tag-done">Complete</span> — result: no clear advantage</td><td><span class="tag tag-open">Not yet</span></td></tr>
          <tr><th scope="row">External asphalt datasets</th><td><span class="tag tag-done">Complete</span> — result: no stable universal relationship</td><td><span class="tag tag-open">Not applicable</span></td></tr>
          <tr><th scope="row">External spatial evaluation, MnROAD</th><td><span class="tag tag-done">Complete</span> — retrospective; result: no clear advantage</td><td><span class="tag tag-open">Not applicable</span></td></tr>
          <tr><th scope="row">Pilot workflow</th><td><span class="tag tag-done">Complete</span> — software workflow</td><td><span class="tag tag-open">No pilot run yet</span></td></tr>
          <tr><th scope="row">Read-only demonstration</th><td><span class="tag tag-done">Packaged</span>${cfg.demoUrl ? " and hosted" : " — not publicly hosted"}</td><td><span class="tag tag-open">Not applicable</span></td></tr>
        </tbody>
      </table></div>
      <h3 class="sub">What LayerProof is not</h3>
      ${notClaims()}
    </div>
  </div>
</section>

<section class="sec sec-alt" id="team">
  <div class="wrap sec-grid">
    <div class="sec-head"><h2>Team</h2><p>LayerProof is developed by two co-founders.</p></div>
    <div class="sec-body">
      <div class="team">
        <div class="person"><h3>Metehan Alp Memis</h3><p class="role">Co-Founder</p><p>PhD Student, Civil &amp; Environmental Engineering, University of Illinois Urbana-Champaign. Transportation infrastructure, pavement engineering and intelligent compaction.</p></div>
        <div class="person"><h3>Şevval Ulus Memiş</h3><p class="role">Co-Founder</p><p>M.S. Data Science, Maryville University. Background in computer engineering and data science: machine learning, analytics and data workflows.</p></div>
      </div>
      <p class="plain-note">The universities named are the founders' affiliations. They do not own, sponsor or endorse LayerProof.</p>
      <p class="sub"><a href="team.html">More about the team</a></p>
    </div>
  </div>
</section>

<section class="cta-band" id="contact">
  <div class="wrap">
    <h2>Interested in evaluating LayerProof with real intelligent-compaction and field-test data?</h2>
    <p>We welcome conversations about field-data collaboration and pilot opportunities with transportation agencies, contractors, testing and quality-assurance organizations, and research groups.</p>
    ${contactBlock(cfg)}
    ${ctaRow(`<a class="btn btn-line" href="pilot.html">What a pilot involves</a>`, `<a class="btn btn-line" href="contact.html">Contact and collaboration</a>`, demoCta(cfg))}
  </div>
</section>
`,
};
