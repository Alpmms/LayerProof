import { shot, results } from "../site.mjs";
import { week5Table, week8Table, week8Matrix, externalTable, externalDatasets, externalLabels, externalStatement, externalHead, externalNotAssessable, spatialData, spatialVerdict, spatialStatement, spatialCounts, spatialGrid, spatialDeltaChart, spatialTable, spatialAvailability, spatialLimits, spatialPct } from "./_parts.mjs";

const SP = spatialData;

const m2 = (x) => `${x < 0 ? "−" : "+"}${Math.abs(x).toFixed(2)}`;

const moist = results.week5.find((r) => r.run === "B_moisture_lab_UGM_layer2");

export default {
  file: "research.html",
  title: "Research",
  description: "The scientific approach behind LayerProof: a real paired field-trial study, a retrospective check of the ranking, two public asphalt datasets and a retrospective external spatial evaluation on published MnROAD data, with negative results reported as they are.",
  body: () => `
<section class="page-head"><div class="wrap">
  <h1>The scientific approach</h1>
  <p>LayerProof does not force a predictive claim when the evidence does not support one. This page gives the results in full, including the ones that did not go our way.</p>
</div></section>

<section class="sec" id="study"><div class="wrap">
  <div class="sec-grid">
    <div class="sec-head"><h2>The real paired study</h2><p>Can roller measurement values predict a physical test result at a location the model has not seen?</p></div>
    <div class="sec-body">
      <p class="lead">On the SPARC field trial, simple models of CMV and CCV neighbourhood values did not reliably predict held-out dry density.</p>
      <p>Each physical test was paired with the roller observations of the same layer, location tag and pass. Models were evaluated by holding out whole test locations, never random rows, so that observations next to a test could not leak into its prediction.</p>
    </div>
  </div>
  <div class="sec-full">${week5Table()}</div>
  <div class="sec-grid sec-full">
    <div></div>
    <div class="sec-body">
      <h3>How to read this</h3>
      <ul>
        <li>For dry and wet density, every linear and ridge R² is negative. Those models performed worse than a mean baseline on held-out locations.</li>
        <li>One random-forest comparison on soil layer 1 is slightly positive on 8 locations. That is not evidence of a usable predictor, and it is the only density value above zero.</li>
        <li>The laboratory-moisture row rests on ${moist.locations} independent locations. Its linear R² is high and its random-forest R² is negative on the same data. It is an observation about six points and must not be read as a validated relationship.</li>
        <li>For every evaluated row, predictive uncertainty is recorded as unresolved: it can be computed, but no source defines the tolerance that would make it credible. No sourced minimum sample size exists either, so statistical adequacy is also left unresolved.</li>
      </ul>
      <p>The consequence in the product: no predictive map, no density or stiffness prediction, and no uncertainty band. LayerProof is designed to abstain when evidence is insufficient rather than manufacture confidence.</p>
    </div>
  </div>
</div></section>

<section class="sec sec-alt" id="gate"><div class="wrap sec-grid">
  <div class="sec-head"><h2>A gate before any model</h2><p>Real data has to earn a scientific run.</p></div>
  <div class="sec-body">
    <p>Before a model is evaluated, a gate checks that both sides are real, from the same site, spatially referenced, in known units, traceable to stored files and deterministically associated. Runs on synthetic fixtures are labelled as software tests and can never produce a scientific claim.</p>
    ${shot("science-gate", "The gate for the soil layer 1 study: ten checks pass, statistical adequacy stays unresolved.")}
  </div>
</div></section>

<section class="sec" id="retrospective"><div class="wrap">
  <div class="sec-grid">
    <div class="sec-head"><h2>Retrospective check on the field trial</h2><p>Does the candidate ranking put real historical test locations near the top?</p></div>
    <div class="sec-body">
      <p>Historical physical-test locations are withheld from LayerProof, one location or one group at a time. The evidence, support and candidate pipeline is rerun without those anchors, with the ranking policy frozen. We then record how highly each hidden location is ranked and compare that with two baselines: ranking by missing anchor alone, and random order repeated 1,000 times with fixed seeds.</p>
      <p><span class="verdict">${results.week8_overall}</span></p>
      <p>That is the overall recorded outcome. The policy was not changed after seeing it.</p>
    </div>
  </div>
  <div class="sec-full">${week8Table("soil_layer1")}</div>
  <div class="sec-full">${week8Table("ugm_layer2")}</div>
  <div class="sec-full">${week8Matrix()}</div>
  <div class="sec-grid sec-full">
    <div></div>
    <div class="sec-body">
      <h3>What this does and does not show</h3>
      <ul>
        <li>On UGM layer 2 the frozen policy ranked hidden locations higher than both baselines in the primary design. On soil layer 1 its reciprocal-rank score was below both baselines, although its average normalized rank was better.</li>
        <li>The two limited-signal cells are not consistent across designs: each is contradicted by another design on the same layer. No cell reached the pre-declared threshold for an observed signal.</li>
        <li>This is not proof that a historical test location was the mathematically best location. Testers chose those locations for their own reasons.</li>
        <li>This is not a prospective field pilot. It uses 8 and 13 locations from a single trial, so every metric is highly variable.</li>
        <li>A sensitivity analysis varied one weight at a time and is stored separately. No variant was adopted, because choosing one from the same few locations would be fitting to them.</li>
      </ul>
      ${shot("retro-ranking", "The retrospective result for soil layer 1 as shown in the application.")}
      ${shot("retro-folds", "Each hidden location with its rank, the leakage checks, and evidence states before and after the test is restored.")}
    </div>
  </div>
</div></section>

<section class="sec" id="external"><div class="wrap">
  <div class="sec-grid">
    <div class="sec-head"><h2>External evidence: two asphalt datasets</h2><p>Two independent public asphalt datasets, examined with the same simple models and the same evidence gate.</p></div>
    <div class="sec-body">
      <p class="lead">${externalStatement()}</p>
      <p>After the field-trial study, LayerProof was examined on two public asphalt compaction datasets from other sources. Both are tables published alongside research papers. They are processed values, not raw project files, and they carry no project names, sites or coordinates.</p>
      ${externalDatasets()}
      <h3 class="sub">What could be evaluated</h3>
      <p>Whether roller measurement values relate to a physical density reading in a way that holds when part of the data is held out, with each physical target kept separate: NNDG in one dataset, nuclear-gauge density and core density in the other.</p>
    </div>
  </div>
  <div class="sec-full">${externalTable()}</div>
  <div class="sec-grid sec-full">
    <div></div>
    <div class="sec-body">
      <h3>What the numbers say</h3>
      <ul>
        <li><strong>Asphalt A:</strong> the measurement values rise with NNDG inside this one dataset. With a source group held out, a one-input model explains a modest share of the variation (R² ${m2(externalHead.a_cmv_logo_r2)} to ${m2(externalHead.a_ccv_logo_r2)}). On the source's own validation file the picture is mixed, down to ${m2(externalHead.a_rmv_source_r2)} for one input.</li>
        <li><strong>Asphalt B:</strong> the direction of the association between HMV and core density changes between layer-thickness groups (correlation ${Object.entries(externalHead.b_hmv_core_r_by_thickness).map(([k, v]) => `${m2(v)} at ${k}`).join(", ")}). With a thickness group held out, HMV alone does worse than predicting the mean (R² ${m2(externalHead.b_hmv_core_thickness_r2)} for core density, ${m2(externalHead.b_hmv_ndg_thickness_r2)} for nuclear-gauge density).</li>
        <li><strong>Two density measurements are not interchangeable:</strong> in Asphalt B, nuclear-gauge and core density move together inside each group, but the offset between them differs by group, so a line fitted on two groups fails on the third (R² ${m2(externalHead.b_ndg_to_core_thickness_r2)}).</li>
        <li><strong>The split matters:</strong> results on random rows look better than results with a group held out. Random-row figures are shown only to make that visible.</li>
      </ul>
      <h3 class="sub">Recorded interpretation</h3>
      ${externalLabels()}
      <h3 class="sub">What could not be evaluated</h3>
      <ul>
        <li><span class="code">${externalNotAssessable[0]}</span>. Neither dataset identifies projects or sites.</li>
        <li><span class="code">${externalNotAssessable[1]}</span>. Neither dataset has coordinates, so nothing was learned about candidate ranking or where to test next.</li>
        <li>Transfer from one dataset to the other. They share no measurement value and no target, so no transfer test was run.</li>
      </ul>
      <h3 class="sub">How LayerProof responded</h3>
      <p>The evidence gate did not allow a scientific claim for either dataset: the roller values are published aggregates rather than row-level observations, there is no spatial reference, and the pairing of roller values with tests cannot be reproduced. Relative to the soil and granular evidence LayerProof holds, both datasets are out of domain in material, measurement values and physical target. LayerProof therefore abstains: no density prediction, no uncertainty band, no map and no candidates for these datasets.</p>
      <p class="plain-note">Asphalt results say nothing about soil or granular layers, and the reverse. Metrics reported in the source publications, which used tuned models and random splits, are not LayerProof results and are not quoted here. The datasets carry no stated licence, so their records are not redistributed on this site.</p>
    </div>
  </div>
</div></section>

<section class="sec sec-alt" id="external-spatial"><div class="wrap">
  <div class="sec-grid">
    <div class="sec-head"><h2>External Spatial Benchmark — NCHRP 933 / MnROAD</h2><p>A retrospective external spatial evaluation: does the frozen priority recover untested values faster than simple baselines?</p></div>
    <div class="sec-body">
      <p class="lead">${spatialStatement()}</p>
      <p>The asphalt datasets carry no positions, so they could not test the ranking. A public source that does carry positions is NCHRP Research Report 933. Its Appendix F reports proof mapping on four MnROAD low-volume-road cells in July and August 2017: cells 185 and 186 on sandy subgrade, cells 188 and 189 on clayey subgrade, each tested on the subgrade and on the base. That gives eight nominal strata.</p>
      <p>For each stratum the report prints three quantities on a grid of four lines and nine chainages: a roller compaction meter value (CMV) averaged around each position, a light weight deflectometer (LWD) modulus and a falling weight deflectometer (FWD) modulus.</p>
      ${spatialGrid()}
      <div class="codes">
        <div><span class="code">${SP.evidence_class}</span><p><strong>Published, aggregated field data.</strong> A real field study, read from matrices printed in the report. Not raw roller or test files, and not treated as project field data.</p></div>
        <div><span class="code">${SP.spatial_reference}</span><p><strong>Local grid defined by the source.</strong> Chainage along the lane and the 2.1 m spacing between lines. No latitude, longitude or coordinate system was added.</p></div>
      </div>
    </div>
  </div>
  <div class="sec-full">${spatialAvailability()}</div>
  <div class="sec-grid sec-full">
    <div></div>
    <div class="sec-body">
      <h3>Retrospective design</h3>
      <ol>
        <li>Four tests are visible at the start, one on each line, at positions drawn with a recorded seed.</li>
        <li>Every other LWD or FWD value is hidden from the ranking.</li>
        <li>The frozen LayerProof priority, with its accepted settings, picks the next position. Nothing was tuned on this dataset.</li>
        <li>The published value at that position is revealed and becomes a visible test.</li>
        <li>This repeats for ${SP.design.horizon} added tests, from ${SP.design.replicates} starting configurations per combination of stratum and test type.</li>
      </ol>
      <p>LWD and FWD are separate benchmarks; a value of one is never used to choose or score the other. A combination was evaluated when it had at least 20 exactly positioned pairs, which left ${SP.counts.evaluable_cells} combinations from ${SP.counts.physical_cells} cells.</p>
      <h3 class="sub">What it was compared with</h3>
      <ul>
        <li><strong>Random choice</strong>, averaged over 20 seeded orders.</li>
        <li><strong>Spatial maximin</strong>, which always picks the position farthest from the tests taken so far.</li>
        <li><strong>Missing-anchor only</strong>, the baseline of the field-trial check. Here every untested position scores the same on it, so it reduces to random choice.</li>
      </ul>
      <h3 class="sub">How usefulness was measured</h3>
      <p>After each added test, every hidden value is estimated by the value at the nearest test taken so far, and the mean absolute error is divided by the spread of the values. The summary is the area under that error curve over the ${SP.design.horizon} steps; lower is better. No model is fitted. The measure, the seed, the baselines and the rule for the label were written down before any outcome was computed.</p>
      <h3 class="sub">Result</h3>
      <p>${spatialVerdict()}</p>
      ${spatialCounts()}
      <p>The frozen priority was clearly behind random choice in ${SP.counts.clearly_worse_than_random} combinations and clearly behind spatial maximin in ${SP.counts.clearly_worse_than_maximin}. The three combinations favourable against both baselines were ${SP.favourable_lists.vs_both.map((x) => x.replace(" · ", ", ")).join("; ")}. They are listed for completeness and are not a finding on their own.</p>
      ${spatialDeltaChart()}
    </div>
  </div>
  <div class="sec-full">${spatialTable()}</div>
  <div class="sec-grid sec-full">
    <div></div>
    <div class="sec-body">
      <h3>How to read this</h3>
      <ul>
        <li>A stronger label needed an advantage over <strong>both</strong> baselines in at least a third of the combinations. ${SP.counts.favourable_vs_both} of ${SP.counts.evaluable_cells} is below that.</li>
        <li>Against random choice the pooled median change was ${spatialPct(SP.pooled.RANDOM.median_delta)}: slightly behind. Against spatial maximin it was ${spatialPct(SP.pooled.SPATIAL_MAXIMIN.median_delta)}.</li>
        <li>Five further analyses declared in advance (a different reconstruction rule, the metric-distance mode, two and eight starting tests, random tie-breaking) all lead to the same label.</li>
        <li>Under random choice the reconstruction error changed by between ${spatialPct(SP.power_note.random_error_change_min, 0)} and ${spatialPct(SP.power_note.random_error_change_max, 0)} over ${SP.design.horizon} added tests. The published moduli vary mostly at a scale finer than the 7.5 m grid, so no strategy had much to gain, and the benchmark has limited power to tell strategies apart.</li>
        <li>The CMV values correlate only weakly with the spot moduli in these strata. That is a description of the published numbers, not a calibration.</li>
      </ul>
      <h3 class="sub">Limitations</h3>
      ${spatialLimits()}
      <p class="plain-note">Source: NCHRP Research Report 933 (Project 24-45), Appendix F, published by the Transportation Research Board. The report is a copyrighted publication; its tables and figures are not reproduced, and no individual value from it is shown. The graphics above are original. No endorsement by NCHRP, TRB, MnDOT, MnROAD or the report's authors is implied, and none of them took part in this evaluation.</p>
    </div>
  </div>
</div></section>

<section class="sec" id="two-questions"><div class="wrap sec-grid">
  <div class="sec-head"><h2>Two different questions</h2><p>A result on one does not carry over to the other.</p></div>
  <div class="sec-body">
    <div class="twoq">
      <div><h3>Scientific relationship</h3><p>Do roller measurement values relate to a physical test result in a way that holds on groups the model has not seen?</p><p>Addressed by the field-trial study and by the two asphalt datasets. Answer so far: no stable universal relationship.</p></div>
      <div><h3>Spatial next-test prioritization</h3><p>Does the candidate ranking put useful test locations near the top?</p><p>Addressed twice, both retrospectively. On the field trial: <span class="code">${results.week8_overall}</span>. On published MnROAD data: <span class="code">${SP.interpretation}</span>. The asphalt datasets have no coordinates and do not change this. A prospective pilot is the open step.</p></div>
    </div>
  </div>
</div></section>

<section class="sec sec-alt" id="data"><div class="wrap sec-grid">
  <div class="sec-head"><h2>Real data used</h2><p>What each dataset was used for, and what it was not.</p></div>
  <div class="sec-body">
    <h3>SPARC Intelligent Compaction Analyzer field trial</h3>
    <p>A real field trial from 23 and 24 May 2024 on a compaction area of about 12 m by 4 m with a Caterpillar CS44B roller. It contains intelligent-compaction observations together with nuclear-gauge density and moisture tests and laboratory moisture reports to AS 1289. Roller data and tests share the trial's own lane position tags, which is what makes real pairing possible. This is the dataset behind the paired study, the evidence-support examples and the retrospective check.</p>
    <p class="table-note">Attribution: "SPARC Intelligent Compaction Analyzer (ICA) Dataset", trial of 2024-05-23/24. The dataset's documentation does not name a publisher or author, and LayerProof records that as stated. Raw files are not distributed on this site.</p>
    <h3 class="sub">MnDOT intelligent-compaction exports</h3>
    <p>Real Minnesota DOT intelligent-compaction exports in Veta 9 format are used for import, validation, canonical storage, mapping and for showing how LayerProof behaves when there is roller data and no physical test. No scientific pairing was made with them.</p>
    <p class="table-note">An FHWA LTPP InfoPave DCP workbook is used to exercise the import of physical-test records. It comes from unrelated pavement sections, has no coordinates, and was never paired with the MnDOT data.</p>
    <h3 class="sub">Two public asphalt datasets</h3>
    <p>Published supplementary tables used for the asphalt analysis above: one with CMV, CCV, AICV and RMV values and NNDG readings (170 records), one with HMV values and nuclear-gauge and core density (180 records). Both are processed publication data without project, site or coordinate information. They were examined outside LayerProof's project workflow and were never combined with the field-trial or MnDOT data.</p>
    <p class="table-note">The second accompanies "Optimizing Asphalt Compaction: Intelligent Compaction Roller Frequency and Machine Learning Prediction of In-Place Density". The first was supplied under a title beginning "Bayesian Optimization-Based SVR and RF Models for…"; its archive contains no citation. No licence is stated for either, so no records are redistributed here.</p>
    <h3 class="sub">NCHRP Research Report 933, Appendix F</h3>
    <p>Published matrices of CMV, LWD modulus and FWD modulus from proof mapping on MnROAD cells 185, 186, 188 and 189 in 2017. Used only for the retrospective external spatial evaluation above, outside LayerProof's project workflow, and never combined with any other dataset.</p>
    <p class="table-note">National Cooperative Highway Research Program, Transportation Research Board. Cited as a source; its content is not redistributed here.</p>
    <h3 class="sub">Synthetic fixtures</h3>
    <p>Small synthetic files exist to test the software. They are labelled synthetic wherever they appear and cannot anchor a real result.</p>
  </div>
</div></section>
`,
};
