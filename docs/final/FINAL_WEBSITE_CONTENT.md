# Final website content
> Final document. LayerProof public website, final release of 2026-10-07. Later changes are ordinary content or product updates.

The exact public copy of the LayerProof website, exported from the built pages by `tools/export-content.mjs`.
This is the canonical final public wording. Built with no demo URL and no contact address configured.


## index.html

Title: LayerProof — Evidence-Aware Construction Quality Assurance

Description: LayerProof integrates intelligent compaction and physical field-test evidence to help engineers identify evidence gaps and evaluate where additional verification may be useful.

LayerProof

### Know where to test next.

Evidence-aware construction quality assurance for intelligent compaction workflows.

Intelligent-compaction data can cover most of a construction site, while physical verification stays sparse. LayerProof brings both together with the project context, shows where the evidence does not support an interpretation, and helps engineers weigh where another physical test may add useful evidence.

Explore the product See how it works View the evidence

Decision support only — final engineering decisions remain with the engineer.

[Screenshot: LayerProof Verify page listing ranked verification candidates with support state, evidence-gap priority and reason codes.]

The Verify workspace on real field-trial data: candidate locations for another physical test, ordered by evidence gap. Screenshot of the LayerProof application. Data shown: Real SPARC field-trial data.

[Graphic: Dense roller data, sparse physical tests]

intelligent-compaction observations physical field test Schematic of the lane-tag layout of the SPARC field trial: 26 tagged positions, physical density tests at 8 of them on soil layer 1. Dot counts are illustrative.

#### Dense roller data, sparse tests

The hard part is not collecting data. It is knowing what the data you have can support.

##### Intelligent-compaction data

Roller measurement values, pass counts and positions logged continuously across the mat.

##### Physical field tests

Density, moisture, LWD or DCP results at chosen spots. Which of these exist differs from project to project.

##### Project context

Layers, lifts, rollers, coordinate reference, time zone and units that decide whether the two can be compared at all.

Where is the evidence strong enough to interpret, where is it not, and where could one more physical test add the most?

LayerProof does not replace field testing. It keeps the roller data and the tests side by side, with the provenance of both, so that the next test is chosen with the gaps in view.

#### How LayerProof works

Seven workspaces, in the order an engineer would use them.

- Project Metadata, lifts, rollers, coordinate reference

- Data Import roller and test files, keep the originals

- Evidence Validate structure, location, time and units

- Map See coverage, tests and their associations

- Science Evaluate real paired evidence, report what it shows

- Verify Rank candidate locations by evidence gap

- Pilot Review, decide, test, update the evidence

Walk through each workspace with real screens

#### The product, as built

These are screenshots of the working application on real data, not mock-ups.

[Screenshot: LayerProof Map page showing intelligent-compaction observations along a road alignment with layer controls and an evidence summary.]

Map. Roller observations coloured by the vendor's own metric, with the evidence in view listed on the right. Screenshot of the LayerProof application. Data shown: Real MnDOT IC sample rows; the ringed spot markers are a labelled SYNTHETIC fixture.

[Screenshot: LayerProof Evidence page with validation levels L0 to L3 and a table of findings.]

Evidence. Validation findings state exactly what blocks spatial or temporal use of a dataset. Screenshot of the LayerProof application. Data shown: Real MnDOT IC sample rows.

[Screenshot: LayerProof Science page showing the real paired evidence gate with each check and its result.]

Science. A gate lists every condition real data must meet before any model result is shown. Screenshot of the LayerProof application. Data shown: Real SPARC field-trial data.

#### Evidence support and abstention

Each location and pass gets a state that describes the evidence, never the construction.

A real physical test is associated with this location and pass, inside the range of the real paired evidence, on a validated dataset.

The nearest real test is at another pass of the same location or at an adjacent location, or a policy minimum is not met.

The layer, pass, measured values or machine lie outside what the real paired evidence covers.

No real paired evidence applies here. Roller data alone cannot anchor an interpretation.

The coordinate reference was never confirmed and the source defines no location correspondence.

A blocking validation finding stops this dataset from being used.

These states describe whether evidence is available and applicable. They say nothing about construction quality, which is why the site and the application do not colour them as pass or fail.

How the states are assigned

[Screenshot: LayerProof evidence support panel stating INFERENCE: ABSTAIN with counts of units by evidence state.]

The application abstains from inference on the field-trial data and says why. Screenshot of the LayerProof application. Data shown: Real SPARC field-trial data.

#### What the evidence showed

LayerProof reports negative and inconclusive results as they are.

On a real field trial, simple models built from roller values did not predict dry density at held-out test locations.

- UGM layer 2, 13 locations Linear-model R² −0.40; random forest −0.50

- Soil layer 1, 8 locations Linear-model R² −0.08; random forest +0.09

A negative R² means the model did worse than predicting the mean. With results like these, no predictive model is treated as validated and no predictive uncertainty is reported. LayerProof is designed to abstain when evidence is insufficient rather than manufacture confidence.

Read the full results and method

#### Where another test may help

Verification candidates are ordered by how much evidence is missing, using components you can read.

For each candidate location LayerProof shows seven components: whether a physical test exists there, the evidence-support state, the separation from existing tests, gaps in layer and pass context, gaps in the measured range, roller-data coverage, and how many nearby units a test there would newly anchor.

They combine into one ordering value, EVIDENCE_GAP_PRIORITY . The weights are explicit product-policy settings that anyone can inspect. They are not engineering acceptance criteria.

Decision support only — final test location selection remains with the engineer.

[Screenshot: Component breakdown of one verification candidate: seven named components with value, weight and detail.]

Every candidate opens to its components, weights and plain-language reasons. Screenshot of the LayerProof application. Data shown: Real SPARC field-trial data.

#### Retrospective check

We tested the ranking against history and report the answer as it came out.

Real historical test locations were hidden from LayerProof one at a time. The pipeline was rerun without them, and we measured how highly each hidden location was ranked, against two simple baselines.

NO CLEAR RETROSPECTIVE ADVANTAGE

The frozen ranking policy did not show a clear advantage over the baselines on the available data. Two of six layer-and-design combinations showed a limited signal; the other four did not, and none reached the pre-declared threshold for an observed signal.

*Soil layer 1 — 8 hidden locations, leave one location out*

| Ranking method | MRR | Hit@1 | Hit@3 | Hit@5 | Mean normalized rank |
| LayerProof frozen policy | 0.140 | 0.000 | 0.000 | 0.125 | 0.404 |
| Missing-anchor only (baseline) | 0.169 | 0.046 | 0.138 | 0.229 | 0.524 |
| Random order (baseline, mean of 1,000) | 0.172 | 0.046 | 0.146 | 0.234 | 0.520 |

Share of random orderings that matched or beat the frozen policy on MRR: 0.563 . Recorded interpretation: NO CLEAR RETROSPECTIVE ADVANTAGE . Lower normalized rank is better.

This is a retrospective evaluation on 8 and 13 historical locations from one trial. It is not a prospective field pilot, and a historical test location is not proof of the best possible location.

See both layers and all three designs

#### External evidence

Public data from other sources, examined with the same methods and no tuning.

##### Two public asphalt datasets

Does a roller measurement value relate to physical density in a way that holds on groups the model has not seen?

Across two independent public asphalt datasets, compaction measurements did not show a stable universal relationship with physical density. LayerProof therefore keeps evidence specific to its context and abstains when transfer is unsupported. Neither dataset has coordinates, so they say nothing about where to test next.

See the asphalt analysis

##### Published MnROAD field data with positions

When tests are added one at a time, does the frozen priority recover the untested values faster than simple baselines?

Retrospectively evaluated on a public NCHRP/MnROAD spatial field dataset; no clear advantage over the comparison baselines was observed.

See the spatial benchmark

Both are published, aggregated data examined outside the project workflow. Neither is a prospective field pilot.

#### External Spatial Benchmark — NCHRP 933 / MnROAD

A retrospective external spatial evaluation on a public field dataset.

NCHRP Research Report 933 publishes, in its Appendix F, roller and spot-test results from proof mapping on four MnROAD cells (185, 186, 188 and 189) in 2017. Subgrade and base were tested in each cell, which gives eight nominal strata. For every stratum the report lists a roller compaction meter value (CMV), a light weight deflectometer (LWD) modulus and a falling weight deflectometer (FWD) modulus on a small grid.

[Graphic: Local grid defined by the source]

Original schematic of the test grid described in the source: four lines 2.1 m apart, nine chainages 7.5 m apart, 36 nominal positions per stratum. These are local positions, not GPS coordinates. No measured value is shown.

##### Retrospective design

Four tests were made visible and every other LWD or FWD value was hidden. The frozen LayerProof priority, with its accepted settings and no tuning, chose the next position; the published value there was revealed; and this was repeated for 15 tests. LWD and FWD were evaluated separately. The same replay was run with random choice and with spatial maximin, which always picks the position farthest from the tests taken so far. The measure was how well the tests taken so far reconstruct the values still hidden.

NO CLEAR EXTERNAL SPATIAL PRIORITIZATION ADVANTAGE

Retrospectively evaluated on a public NCHRP/MnROAD spatial field dataset; no clear advantage over the comparison baselines was observed.

The rule set before the run asked for an advantage over both baselines. The frozen priority did better than spatial maximin more often than not, and was level with or behind random choice in most combinations.

##### Limitations

- Retrospective replay of published values. No test was placed in the field because of LayerProof.

- One field study at one facility; published, buffer-averaged and rounded values, not raw files.

- The two sandy-subgrade strata could not be evaluated because their test positions are not exact in the source.

- Reconstruction error barely fell as tests were added under any strategy, so the benchmark has limited power.

Source: NCHRP Research Report 933, Appendix F, Transportation Research Board. The report's tables and figures are not reproduced here; the graphics are original and drawn from derived results. No endorsement by NCHRP, TRB, MnDOT, MnROAD or the report's authors is implied.

Method, per-stratum results and all limitations

#### Built for a pilot

The workflow an engineer would follow on a live project is implemented end to end.

- Import Roller and test files, originals kept

- Validate Findings and blockers

- Evidence What is paired, what is not

- Support A state for each location and pass

- Verify Candidates, ranked with reasons; the engineer decides

- Field test Taken by the project team

- Update Evidence before and after

[Screenshot: Pilot readiness checklist with eleven items and their status.]

The readiness checklist lists what a pilot needs. It is not a construction or quality status. Screenshot of the LayerProof application. Data shown: Real SPARC field-trial data in a browser-test project.

How a pilot would run

#### Provenance and trust

Every result can be followed back to the file it came from.

- source file

- file hash

- dataset version

- validation run

- association run

- science run

- support assessment

- candidate run

- retrospective and pilot history

- engineer decision

- new physical evidence

Source files are stored unchanged and fingerprinted. Datasets are versioned. Runs and decisions are append-only records that the application cannot edit or delete, so the history of how a conclusion was reached stays intact.

[Screenshot: LayerProof file page showing a SHA-256 provenance fingerprint and three passed integrity checks.]

A stored file with its SHA-256 fingerprint and integrity checks. Screenshot of the LayerProof application. Data shown: Synthetic 225-byte test file (software test).

#### Current capabilities

Implemented is not the same as shown in the field. Both are stated.

| Capability | Implemented | Prospective field pilot |
| Foundation and provenance | Complete | Not yet |
| Canonical data ingestion | Complete | Not yet |
| Validation and sufficiency | Complete | Not yet |
| Map and evidence workspace | Complete | Not yet |
| Real paired scientific baseline | Complete | Not yet |
| Evidence support and abstention | Complete | Not yet |
| Verification candidate prioritization | Complete | Not yet |
| Retrospective check on the field trial | Complete — result: no clear advantage | Not yet |
| External asphalt datasets | Complete — result: no stable universal relationship | Not applicable |
| External spatial evaluation, MnROAD | Complete — retrospective; result: no clear advantage | Not applicable |
| Pilot workflow | Complete — software workflow | No pilot run yet |
| Read-only demonstration | Packaged — not publicly hosted | Not applicable |

##### What LayerProof is not

- an autonomous acceptance system

- an automated pass/fail system

- a defect detector

- a pavement failure predictor

- a replacement for physical field testing

- a system shown to predict density or stiffness

- a system that always identifies the best next test location

- a tool that determines acceptance or accepts and rejects work

#### Team

LayerProof is developed by two co-founders.

##### Metehan Alp Memis

Co-Founder

PhD Student, Civil & Environmental Engineering, University of Illinois Urbana-Champaign. Transportation infrastructure, pavement engineering and intelligent compaction.

##### Şevval Ulus Memiş

Co-Founder

M.S. Data Science, Maryville University. Background in computer engineering and data science: machine learning, analytics and data workflows.

The universities named are the founders' affiliations. They do not own, sponsor or endorse LayerProof.

More about the team

#### Interested in evaluating LayerProof with real intelligent-compaction and field-test data?

We welcome conversations about field-data collaboration and pilot opportunities with transportation agencies, contractors, testing and quality-assurance organizations, and research groups.

To start a conversation, reply to either co-founder through the channel where you received this link.

What a pilot involves Contact and collaboration

### Footer (every page)

LayerProof

Evidence-aware construction quality assurance for intelligent compaction workflows. A research-driven project by Metehan Alp Memis and Şevval Ulus Memiş.

Decision support only — final engineering decisions remain with the engineer.

- Home

- Product

- Evidence

- Research

- Pilot

- Team

- Contact

LayerProof is a research prototype. It is not production-certified and has not been evaluated in a prospective field pilot.

Public datasets and reports are cited as sources only. No endorsement by NCHRP, TRB, MnDOT, MnROAD or any report author is implied.

University names describe the founders' affiliations only. No university or agency owns, sponsors or endorses LayerProof.

Map screenshots: © OpenStreetMap contributors. This site uses no cookies and no analytics.

## product.html

Title: Product — LayerProof

Description: A walk through the seven LayerProof workspaces, from project setup to pilot, with screenshots of the working application on real data.

### The product, workspace by workspace

Project, Data, Evidence, Map, Science, Verify, Pilot. Every screen below is a screenshot of the working application.

A read-only demonstration of the application is packaged for hosting. It is not publicly hosted; the screens on this page are from the same application.

- Project Metadata, lifts, rollers, coordinate and reference context

- Data Import with source files, units and versions preserved

- Evidence Validation and evidence sufficiency

- Map Coverage, tests, areas and associations

- Science Leakage-resistant analysis of real paired evidence

- Verify Evidence gaps and ranked candidates

- Pilot Review, decision log, field-test return

This page is a static walkthrough. The website itself does not run the LayerProof backend.

#### Project

Set the reference frame everything else depends on.

A project records its working coordinate system, time zone and vertical datum, the lifts and the rollers. LayerProof does not guess any of these: roller data cannot be placed on a map until the coordinate reference is confirmed.

Every stored file gets a SHA-256 fingerprint, checked in the browser, on the server and again whenever the stored copy is re-verified.

[Screenshot: LayerProof file page showing a SHA-256 provenance fingerprint and three passed integrity checks.]

A stored file with its fingerprint and three integrity checks. Screenshot of the LayerProof application. Data shown: Synthetic 225-byte test file (software test).

#### Data

Import roller and test files without losing where they came from.

Roller exports and physical-test workbooks are mapped to a canonical form. The original file is kept byte for byte, the mapping is saved and versioned, and each import creates a new dataset version rather than overwriting the last.

Units are carried as stated in the source. Where a source does not state a unit, LayerProof records that instead of assuming one.

[Screenshot: LayerProof Data page listing imported datasets, their versions and ingestion runs.]

Datasets, their versions and the ingestion runs that produced them. Screenshot of the LayerProof application. Data shown: Real MnDOT IC sample rows and real FHWA LTPP DCP records (not co-located, never paired).

#### Evidence

Check what the data can be used for before using it.

Validation runs in levels: file structure, coordinates and reference system, time, measurements and units, then the association between tests and roller data, then whether the minimum data package for an analysis is present.

Findings are specific. An unconfirmed coordinate system blocks spatial use; unconfirmed time-zone semantics block time-based use. Nothing is silently repaired.

[Screenshot: LayerProof Evidence page with validation levels L0 to L3 and a table of findings.]

Validation levels with the findings that block spatial and temporal use. Screenshot of the LayerProof application. Data shown: Real MnDOT IC sample rows.

#### Map

See the roller coverage and the tests in the same place.

The map draws recorded evidence only: roller observations, coverage, physical tests, lots and sublots, associations and located validation findings. At large scale the server returns aggregated grid cells, so a dataset with over a million rows never reaches the browser as individual points.

Roller values are shown as the vendor's source metric. The map does not interpolate, estimate stiffness or mark zones.

[Screenshot: LayerProof Map page showing intelligent-compaction observations along a road alignment with layer controls and an evidence summary.]

Roller observations with layer controls and the evidence-in-view panel. Screenshot of the LayerProof application. Data shown: Real MnDOT IC sample rows; the ringed spot markers are a labelled SYNTHETIC fixture.

#### Science

Evaluate real paired evidence, and keep the result whatever it is.

A gate checks that the roller data and the tests are real, from the same site, spatially referenced, in known units and deterministically associated. Only then are baseline models evaluated, always held out by physical test location so that neighbouring rows cannot leak into the test set.

Negative and inconclusive results are stored and shown like any other. See what the real study found.

[Screenshot: LayerProof Science page showing the real paired evidence gate with each check and its result.]

The evidence gate on real field-trial data, with statistical adequacy left unresolved. Screenshot of the LayerProof application. Data shown: Real SPARC field-trial data.

#### Verify

Find the evidence gaps and rank where another test may help.

LayerProof ranks candidate locations by EVIDENCE_GAP_PRIORITY , built from seven visible components. A read-only simulation shows how many units would gain a physical anchor if a test were taken at a candidate, without assuming any test result.

Decision support only — final test location selection remains with the engineer.

[Screenshot: LayerProof Verify page listing ranked verification candidates with support state, evidence-gap priority and reason codes.]

Ranked candidates with support state, priority and reason codes. Screenshot of the LayerProof application. Data shown: Real SPARC field-trial data.

[Screenshot: Component breakdown of one verification candidate: seven named components with value, weight and detail.]

The component breakdown behind one candidate. Screenshot of the LayerProof application. Data shown: Real SPARC field-trial data.

[Screenshot: LayerProof Map page with neutral ring markers for verification candidates and an inspector panel.]

Candidates on the map as neutral rings, with the inspector open. Screenshot of the LayerProof application. Data shown: Real MnDOT IC sample rows.

#### Pilot

Close the loop with the engineer and the field.

The Pilot tab holds a readiness checklist, a log of engineer decisions on each candidate, and a before-and-after comparison once a new physical test has been imported. A decision is added next to the ranking; the ranking itself is never rewritten.

How a pilot would run

[Screenshot: Pilot readiness checklist with eleven items and their status.]

The pilot readiness checklist. Screenshot of the LayerProof application. Data shown: Real SPARC field-trial data in a browser-test project.

[Screenshot: Engineer review table showing ranked candidates and the latest recorded decision for each.]

The engineer review log beside the ranked candidates. Screenshot of the LayerProof application. Data shown: Real SPARC field-trial data; the recorded decision was entered by the automated browser test, not by a practising engineer.

## evidence.html

Title: Evidence — LayerProof

Description: How LayerProof describes evidence support, when it abstains from inference, and how it keeps every result traceable to its source file.

### Evidence, support and abstention

LayerProof states what the available evidence can support at each location and pass, and declines to infer anything beyond it.

#### Six evidence states

They describe the availability and applicability of evidence. They do not describe construction quality.

A real physical test is associated with this location and pass, inside the range of the real paired evidence, on a validated dataset.

The nearest real test is at another pass of the same location or at an adjacent location, or a policy minimum is not met.

The layer, pass, measured values or machine lie outside what the real paired evidence covers.

No real paired evidence applies here. Roller data alone cannot anchor an interpretation.

The coordinate reference was never confirmed and the source defines no location correspondence.

A blocking validation finding stops this dataset from being used.

The states are assigned by rules, with no model involved: physical tests, their association with roller data, layer and pass, roller-data coverage, the range of the real paired evidence, the spatial reference and the validation result. Each unit lists the reason codes that led to its state.

Because these are not quality judgements, they are drawn with neutral patterns here and with neutral markers in the application. There is no red or green.

[Screenshot: LayerProof evidence support panel stating INFERENCE: ABSTAIN with counts of units by evidence state.]

On the real field trial: 113 location-and-pass units, of which 12 have a direct physical anchor. Screenshot of the LayerProof application. Data shown: Real SPARC field-trial data.

[Screenshot: Table of location and pass units with their evidence state and reason codes.]

Each unit carries its state and the reason codes behind it. Screenshot of the LayerProof application. Data shown: Real SPARC field-trial data.

#### Abstention is a result

Two states are reported on purpose, not left blank.

No criterion defines when a predictive baseline counts as validated, and the real held-out results do not support one. LayerProof reports those results as they are and makes no inference from them.

Without a model that has passed validation there is no credible predictive uncertainty to report, so none is shown.

These are deliberate scientific states. An interface that always produced a number would hide exactly the cases an engineer most needs to see.

Decision support only — final engineering decisions remain with the engineer.

#### Roller data alone is not an anchor

What happens when a project has intelligent-compaction data and no physical tests.

On real MnDOT intelligent-compaction samples with a confirmed coordinate system and no physical tests, every one of the 246 grid cells is NO_PHYSICAL_ANCHOR . The same data delivered without a confirmed coordinate system is UNRESOLVED_SPATIAL_REFERENCE and is not drawn on the map at all.

[Screenshot: LayerProof evidence support panel for an IC-only dataset: all units have no physical anchor.]

An IC-only dataset: coverage is high, physical evidence is zero, inference is withheld. Screenshot of the LayerProof application. Data shown: Real MnDOT IC sample rows (no physical tests exist for them).

#### Traceability and provenance

An auditable chain from the source file to the engineer's decision.

- source file

- file hash

- canonical dataset version

- validation run

- association run

- science run

- support assessment

- candidate-generation run

- retrospective and pilot history

- engineer decision

- new physical evidence

- Source files are kept unchanged Stored once under their SHA-256 hash and re-verifiable at any time.

- Datasets are versioned A re-import creates a new version; earlier versions stay readable.

- Runs are append-only Validation, science, support, candidate and retrospective runs cannot be edited or deleted by the application.

- Policies are recorded with results Each run stores the policy version and settings it used.

- Real and synthetic are never mixed Every dataset has an evidence class; synthetic fixtures are labelled and cannot anchor a real result.

- Actions are audited Imports, runs and decisions appear in a per-project audit trail.

[Screenshot: LayerProof file page showing a SHA-256 provenance fingerprint and three passed integrity checks.]

The fingerprint of a stored file and its integrity checks. Screenshot of the LayerProof application. Data shown: Synthetic 225-byte test file (software test).

## research.html

Title: Research — LayerProof

Description: The scientific approach behind LayerProof: a real paired field-trial study, a retrospective check of the ranking, two public asphalt datasets and a retrospective external spatial evaluation on published MnROAD data, with negative results reported as they are.

### The scientific approach

LayerProof does not force a predictive claim when the evidence does not support one. This page gives the results in full, including the ones that did not go our way.

#### The real paired study

Can roller measurement values predict a physical test result at a location the model has not seen?

On the SPARC field trial, simple models of CMV and CCV neighbourhood values did not reliably predict held-out dry density.

Each physical test was paired with the roller observations of the same layer, location tag and pass. Models were evaluated by holding out whole test locations, never random rows, so that observations next to a test could not leak into its prediction.

*Held-out R² on real SPARC data, grouped by physical test location*

| Target and layer | Locations / paired records | Linear (OLS) R² | Ridge R² | Random forest R² | OLS RMSE | Predictive uncertainty |
| Dry density / UGM layer 2 | 13 / 19 | −0.40 | −0.25 | −0.50 | 48.2 kg/m³ | Unresolved |
| Dry density / UGM layer 2, held out in blocks of 3 tags | 13 / 19 | −0.60 | −0.50 | −0.48 | 51.6 kg/m³ | Unresolved |
| Dry density / Soil layer 1 | 8 / 12 | −0.08 | −0.12 | +0.09 | 24.8 kg/m³ | Unresolved |
| Dry density / Existing layer | 0 / 0 | Not evaluated — the evidence gate was not ready (no real paired records at a compacted pass) | Not assessable |
| Wet density / UGM layer 2 | 13 / 19 | −0.52 | −0.35 | −0.60 | 53.8 kg/m³ | Unresolved |
| Laboratory moisture / UGM layer 2 | 6 / 6 | +0.87 | +0.85 | −0.14 | 0.13 % | Unresolved |

Inputs: neighbourhood medians of the roller's CMV and CCV values around each test. R² below zero means the model did worse on held-out locations than predicting the mean. Random-forest values use the recorded seed 20261005. Values are rounded for display from the accepted result table.

##### How to read this

- For dry and wet density, every linear and ridge R² is negative. Those models performed worse than a mean baseline on held-out locations.

- One random-forest comparison on soil layer 1 is slightly positive on 8 locations. That is not evidence of a usable predictor, and it is the only density value above zero.

- The laboratory-moisture row rests on 6 independent locations. Its linear R² is high and its random-forest R² is negative on the same data. It is an observation about six points and must not be read as a validated relationship.

- For every evaluated row, predictive uncertainty is recorded as unresolved: it can be computed, but no source defines the tolerance that would make it credible. No sourced minimum sample size exists either, so statistical adequacy is also left unresolved.

The consequence in the product: no predictive map, no density or stiffness prediction, and no uncertainty band. LayerProof is designed to abstain when evidence is insufficient rather than manufacture confidence.

#### A gate before any model

Real data has to earn a scientific run.

Before a model is evaluated, a gate checks that both sides are real, from the same site, spatially referenced, in known units, traceable to stored files and deterministically associated. Runs on synthetic fixtures are labelled as software tests and can never produce a scientific claim.

[Screenshot: LayerProof Science page showing the real paired evidence gate with each check and its result.]

The gate for the soil layer 1 study: ten checks pass, statistical adequacy stays unresolved. Screenshot of the LayerProof application. Data shown: Real SPARC field-trial data.

#### Retrospective check on the field trial

Does the candidate ranking put real historical test locations near the top?

Historical physical-test locations are withheld from LayerProof, one location or one group at a time. The evidence, support and candidate pipeline is rerun without those anchors, with the ranking policy frozen. We then record how highly each hidden location is ranked and compare that with two baselines: ranking by missing anchor alone, and random order repeated 1,000 times with fixed seeds.

NO CLEAR RETROSPECTIVE ADVANTAGE

That is the overall recorded outcome. The policy was not changed after seeing it.

*Soil layer 1 — 8 hidden locations, leave one location out*

| Ranking method | MRR | Hit@1 | Hit@3 | Hit@5 | Mean normalized rank |
| LayerProof frozen policy | 0.140 | 0.000 | 0.000 | 0.125 | 0.404 |
| Missing-anchor only (baseline) | 0.169 | 0.046 | 0.138 | 0.229 | 0.524 |
| Random order (baseline, mean of 1,000) | 0.172 | 0.046 | 0.146 | 0.234 | 0.520 |

Share of random orderings that matched or beat the frozen policy on MRR: 0.563 . Recorded interpretation: NO CLEAR RETROSPECTIVE ADVANTAGE . Lower normalized rank is better.

*UGM layer 2 — 13 hidden locations, leave one location out*

| Ranking method | MRR | Hit@1 | Hit@3 | Hit@5 | Mean normalized rank |
| LayerProof frozen policy | 0.209 | 0.000 | 0.462 | 0.538 | 0.348 |
| Missing-anchor only (baseline) | 0.166 | 0.045 | 0.135 | 0.225 | 0.479 |
| Random order (baseline, mean of 1,000) | 0.157 | 0.043 | 0.123 | 0.206 | 0.522 |

Share of random orderings that matched or beat the frozen policy on MRR: 0.163 . Recorded interpretation: LIMITED RETROSPECTIVE SIGNAL . Lower normalized rank is better.

*Recorded interpretation for each layer and holdout design*

| Layer | Leave one location out | Leave one group out | Sequential replay |
| Soil layer 1 (8 locations) | NO CLEAR RETROSPECTIVE ADVANTAGE / random ≥ policy: 0.563 | NO CLEAR RETROSPECTIVE ADVANTAGE / random ≥ policy: 0.726 | LIMITED RETROSPECTIVE SIGNAL / random ≥ policy: 0.192 |
| UGM layer 2 (13 locations) | LIMITED RETROSPECTIVE SIGNAL / random ≥ policy: 0.163 | NO CLEAR RETROSPECTIVE ADVANTAGE / random ≥ policy: 0.374 | NO CLEAR RETROSPECTIVE ADVANTAGE / random ≥ policy: 0.783 |

##### What this does and does not show

- On UGM layer 2 the frozen policy ranked hidden locations higher than both baselines in the primary design. On soil layer 1 its reciprocal-rank score was below both baselines, although its average normalized rank was better.

- The two limited-signal cells are not consistent across designs: each is contradicted by another design on the same layer. No cell reached the pre-declared threshold for an observed signal.

- This is not proof that a historical test location was the mathematically best location. Testers chose those locations for their own reasons.

- This is not a prospective field pilot. It uses 8 and 13 locations from a single trial, so every metric is highly variable.

- A sensitivity analysis varied one weight at a time and is stored separately. No variant was adopted, because choosing one from the same few locations would be fitting to them.

[Screenshot: Retrospective evaluation design and a table comparing the frozen policy with missing-anchor-only and random baselines.]

The retrospective result for soil layer 1 as shown in the application. Screenshot of the LayerProof application. Data shown: Real SPARC field-trial data (soil layer 1).

[Screenshot: Fold table listing hidden locations with their ranks and a before and after comparison of evidence states.]

Each hidden location with its rank, the leakage checks, and evidence states before and after the test is restored. Screenshot of the LayerProof application. Data shown: Real SPARC field-trial data (soil layer 1).

#### External evidence: two asphalt datasets

Two independent public asphalt datasets, examined with the same simple models and the same evidence gate.

Across two independent public asphalt datasets, compaction measurements did not show a stable universal relationship with physical density. LayerProof therefore keeps evidence specific to its context and abstains when transfer is unsupported.

After the field-trial study, LayerProof was examined on two public asphalt compaction datasets from other sources. Both are tables published alongside research papers. They are processed values, not raw project files, and they carry no project names, sites or coordinates.

CMV, CCV, AICV and RMV with NNDG readings. 170 records. Processed table, one row per paired record; pairing was done by the source. Projects and sites: not identified. Coordinates: none.

HMV with NDG and core density. 180 records. Publication supplementary table; processed and aggregated values. Projects and sites: not identified. Coordinates: none.

##### What could be evaluated

Whether roller measurement values relate to a physical density reading in a way that holds when part of the data is held out, with each physical target kept separate: NNDG in one dataset, nuclear-gauge density and core density in the other.

*Held-out R² of a one-input linear model, by how records were held out*

| Dataset, input and target | Records | A source group held out | Source's own split | Random rows (exploratory) |
| Asphalt A: CMV to NNDG | 153 | +0.16 | +0.13 | +0.31 |
| Asphalt A: CCV to NNDG | 153 | +0.27 | +0.09 | +0.40 |
| Asphalt A: AICV to NNDG | 153 | +0.27 | +0.24 | +0.38 |
| Asphalt A: RMV to NNDG | 153 | +0.20 | −0.59 | +0.31 |
| Asphalt B: HMV to NDG density | 179 | −0.48 / +0.22 | +0.28 | +0.24 |
| Asphalt B: HMV to core density | 179 | −1.75 / +0.03 | −0.04 | +0.03 |

Ordinary least squares, no tuning. For Asphalt A the held-out group is a source code column with 10 values. For Asphalt B the two figures are a layer thickness held out (3 values) and ID numbers held out (30). All hold-outs are inside one dataset; neither dataset identifies projects or sites, so none of this is independent project or site validation. Random-row figures are exploratory only and are not part of any LayerProof claim. One record of Asphalt B that looks column-shifted in the source is excluded here; results with it included are in the project's records and lead to the same conclusion.

##### What the numbers say

- Asphalt A: the measurement values rise with NNDG inside this one dataset. With a source group held out, a one-input model explains a modest share of the variation (R² +0.16 to +0.27). On the source's own validation file the picture is mixed, down to −0.59 for one input.

- Asphalt B: the direction of the association between HMV and core density changes between layer-thickness groups (correlation −0.44 at 38 mm, −0.12 at 50.8 mm, +0.42 at 63.5 mm). With a thickness group held out, HMV alone does worse than predicting the mean (R² −1.75 for core density, −0.48 for nuclear-gauge density).

- Two density measurements are not interchangeable: in Asphalt B, nuclear-gauge and core density move together inside each group, but the offset between them differs by group, so a line fitted on two groups fails on the third (R² −1.36).

- The split matters: results on random rows look better than results with a group held out. Random-row figures are shown only to make that visible.

##### Recorded interpretation

- CROSS-DATASET RELATIONSHIP NOT STABLE The direction of the HMV–density association differs between layer-thickness groups in Asphalt B, and the one-input model is worse than the mean when a thickness group is held out. Asphalt A shows a positive within-dataset association. The declared stability rule is not met.

- EXTERNAL DOMAIN SHIFT OBSERVED Both datasets differ from the accepted evidence in material, measurement values and physical target; Asphalt A's CCV values lie entirely outside the accepted reference range.

- EXTERNAL RELATIONSHIP OBSERVED BUT INDEPENDENT VALIDATION LIMITED Applies to Asphalt A only: a positive association between its ICMVs and NNDG, with modest grouped R² inside one dataset and mixed results on the source's own validation file.

- INSUFFICIENT METADATA FOR INDEPENDENT EXTERNAL VALIDATION Neither dataset identifies projects, sites or coordinates.

- CROSS-DATASET PREDICTIVE TRANSFER NOT COMPARABLE No shared measurement value or target; no transfer test was run.

- EXTERNAL SUPPORT FOR ABSTENTION FRAMEWORK The accepted evidence gate did not allow a scientific claim for either dataset, and the grouped results show why: relationships that look usable on random rows weaken or reverse when a source group is held out. This is consistent with abstaining; it is two datasets, not a proof.

##### What could not be evaluated

- INDEPENDENT PROJECT/SPATIAL VALIDATION NOT ASSESSABLE . Neither dataset identifies projects or sites.

- SPATIAL CANDIDATE PRIORITIZATION NOT ASSESSABLE FROM THIS DATASET . Neither dataset has coordinates, so nothing was learned about candidate ranking or where to test next.

- Transfer from one dataset to the other. They share no measurement value and no target, so no transfer test was run.

##### How LayerProof responded

The evidence gate did not allow a scientific claim for either dataset: the roller values are published aggregates rather than row-level observations, there is no spatial reference, and the pairing of roller values with tests cannot be reproduced. Relative to the soil and granular evidence LayerProof holds, both datasets are out of domain in material, measurement values and physical target. LayerProof therefore abstains: no density prediction, no uncertainty band, no map and no candidates for these datasets.

Asphalt results say nothing about soil or granular layers, and the reverse. Metrics reported in the source publications, which used tuned models and random splits, are not LayerProof results and are not quoted here. The datasets carry no stated licence, so their records are not redistributed on this site.

#### External Spatial Benchmark — NCHRP 933 / MnROAD

A retrospective external spatial evaluation: does the frozen priority recover untested values faster than simple baselines?

Retrospectively evaluated on a public NCHRP/MnROAD spatial field dataset; no clear advantage over the comparison baselines was observed.

The asphalt datasets carry no positions, so they could not test the ranking. A public source that does carry positions is NCHRP Research Report 933. Its Appendix F reports proof mapping on four MnROAD low-volume-road cells in July and August 2017: cells 185 and 186 on sandy subgrade, cells 188 and 189 on clayey subgrade, each tested on the subgrade and on the base. That gives eight nominal strata.

For each stratum the report prints three quantities on a grid of four lines and nine chainages: a roller compaction meter value (CMV) averaged around each position, a light weight deflectometer (LWD) modulus and a falling weight deflectometer (FWD) modulus.

[Graphic: Local grid defined by the source]

Original schematic of the test grid described in the source: four lines 2.1 m apart, nine chainages 7.5 m apart, 36 nominal positions per stratum. These are local positions, not GPS coordinates. No measured value is shown.

Published, aggregated field data. A real field study, read from matrices printed in the report. Not raw roller or test files, and not treated as project field data.

Local grid defined by the source. Chainage along the lane and the 2.1 m spacing between lines. No latitude, longitude or coordinate system was added.

*What the source provides: counts of exactly positioned values in the eight nominal strata*

| Stratum | Nominal positions | CMV | LWD | FWD | Evaluated |
| Cell 185, sandy subgrade | 36 | 32 | 0 | 4 | no — test positions not exact in the source |
| Cell 186, sandy subgrade | 36 | 36 | 4 | 4 | no — test positions not exact in the source |
| Cell 188, clayey subgrade | 36 | 36 | 36 | 36 | yes |
| Cell 189, clayey subgrade | 36 | 36 | 36 | 33 | yes |
| Cell 185, coarse RCA base on sandy subgrade | 36 | 32 | 32 | 31 | yes |
| Cell 186, fine RCA base on sandy subgrade | 36 | 35 | 36 | 32 | yes |
| Cell 188, limestone aggregate base on clayey subgrade | 36 | 36 | 36 | 34 | yes |
| Cell 189, recycled aggregate base on clayey subgrade | 36 | 35 | 36 | 35 | yes |
| Total | 288 | 278 | 216 | 209 |  |

The grid is not complete. The source states that empty entries are missing or erroneous measurements. A further 24 LWD and 24 FWD values on the sandy subgrade are printed across two chainages; their position is not exact, so they were counted and not used. CMV and LWD are both present at 214 positions, CMV and FWD at 208, all three at 204.

##### Retrospective design

- Four tests are visible at the start, one on each line, at positions drawn with a recorded seed.

- Every other LWD or FWD value is hidden from the ranking.

- The frozen LayerProof priority, with its accepted settings, picks the next position. Nothing was tuned on this dataset.

- The published value at that position is revealed and becomes a visible test.

- This repeats for 15 added tests, from 100 starting configurations per combination of stratum and test type.

LWD and FWD are separate benchmarks; a value of one is never used to choose or score the other. A combination was evaluated when it had at least 20 exactly positioned pairs, which left 12 combinations from 4 cells.

##### What it was compared with

- Random choice , averaged over 20 seeded orders.

- Spatial maximin , which always picks the position farthest from the tests taken so far.

- Missing-anchor only , the baseline of the field-trial check. Here every untested position scores the same on it, so it reduces to random choice.

##### How usefulness was measured

After each added test, every hidden value is estimated by the value at the nearest test taken so far, and the mean absolute error is divided by the spread of the values. The summary is the area under that error curve over the 15 steps; lower is better. No model is fitted. The measure, the seed, the baselines and the rule for the label were written down before any outcome was computed.

##### Result

NO CLEAR EXTERNAL SPATIAL PRIORITIZATION ADVANTAGE

The frozen priority was clearly behind random choice in 4 combinations and clearly behind spatial maximin in 1. The three combinations favourable against both baselines were Cell 188, clayey subgrade, LWD; Cell 185, coarse RCA base on sandy subgrade, FWD; Cell 189, recycled aggregate base on clayey subgrade, FWD. They are listed for completeness and are not a finding on their own.

[Graphic: Frozen priority compared with two baselines on published MnROAD data]

Original graphic drawn from the benchmark results. To the right of zero the frozen priority reduced reconstruction error faster than the baseline; to the left the baseline did. A combination counts as favourable only when the whole interval is to the right of zero.

*Frozen priority against two baselines, by stratum and test type*

| Stratum | Test | Values | Against random choice | Against spatial maximin | Favourable (random / maximin) |
| Cell 188, clayey subgrade | LWD | 36 | +4.0% / +1.6% to +5.7% | +6.0% / +4.9% to +7.9% | yes / yes |
| Cell 188, clayey subgrade | FWD | 36 | +0.5% / −1.1% to +2.2% | +0.9% / −1.1% to +2.1% | no / no |
| Cell 189, clayey subgrade | LWD | 36 | −4.1% / −5.7% to −2.1% | +6.4% / +5.5% to +8.4% | no / yes |
| Cell 189, clayey subgrade | FWD | 33 | −7.5% / −10.4% to −5.4% | +2.9% / +1.7% to +5.1% | no / yes |
| Cell 185, coarse RCA base on sandy subgrade | LWD | 32 | −1.2% / −4.5% to +1.6% | −0.5% / −3.5% to +1.1% | no / no |
| Cell 185, coarse RCA base on sandy subgrade | FWD | 31 | +3.2% / +0.5% to +4.9% | +6.1% / +2.7% to +7.3% | yes / yes |
| Cell 186, fine RCA base on sandy subgrade | LWD | 36 | −3.3% / −4.7% to −1.4% | −3.8% / −6.0% to −1.4% | no / no |
| Cell 186, fine RCA base on sandy subgrade | FWD | 32 | −7.4% / −9.6% to −5.2% | −2.2% / −3.8% to +0.6% | no / no |
| Cell 188, limestone aggregate base on clayey subgrade | LWD | 36 | −1.2% / −2.9% to +0.1% | +5.1% / +2.8% to +6.5% | no / yes |
| Cell 188, limestone aggregate base on clayey subgrade | FWD | 34 | −1.8% / −3.0% to +0.0% | +2.8% / +0.3% to +4.7% | no / yes |
| Cell 189, recycled aggregate base on clayey subgrade | LWD | 36 | −0.3% / −2.3% to +0.8% | +8.5% / +7.3% to +10.2% | no / yes |
| Cell 189, recycled aggregate base on clayey subgrade | FWD | 35 | +7.6% / +5.4% to +9.3% | +4.7% / +3.7% to +6.5% | yes / yes |

Each figure is the median relative change in the area under the normalized reconstruction-error curve over 15 added tests, with its 95% bootstrap interval. Positive means the frozen priority did better. Pooled over all starting configurations: −1.0% against random choice and +3.4% against spatial maximin. The 100 starting configurations per row are replays of one field, not independent sites.

##### How to read this

- A stronger label needed an advantage over both baselines in at least a third of the combinations. 3 of 12 is below that.

- Against random choice the pooled median change was −1.0%: slightly behind. Against spatial maximin it was +3.4%.

- Five further analyses declared in advance (a different reconstruction rule, the metric-distance mode, two and eight starting tests, random tie-breaking) all lead to the same label.

- Under random choice the reconstruction error changed by between −7% and +16% over 15 added tests. The published moduli vary mostly at a scale finer than the 7.5 m grid, so no strategy had much to gain, and the benchmark has limited power to tell strategies apart.

- The CMV values correlate only weakly with the spot moduli in these strata. That is a description of the published numbers, not a calibration.

##### Limitations

- It is retrospective. Published values were revealed in a simulated order; no test was placed in the field because of LayerProof.

- It is one field study with four cells at one facility. The replays per combination are different starting configurations, not independent sites.

- The input is published, buffer-averaged and rounded. Raw roller records and raw deflection data were not available.

- The two sandy-subgrade strata could not be evaluated because their test positions are not exact in the source.

- Two of the seven priority components cannot vary on this dataset, and about two thirds of the choices were ties resolved by a fixed order.

- Usefulness was measured one way: how well the tests taken so far reconstruct the values not yet taken. Another definition could order the strategies differently.

- Reconstruction error barely fell as tests were added under any strategy, so the benchmark has limited power to separate them.

- LWD and FWD moduli are not density, and nothing here concerns acceptance.

Source: NCHRP Research Report 933 (Project 24-45), Appendix F, published by the Transportation Research Board. The report is a copyrighted publication; its tables and figures are not reproduced, and no individual value from it is shown. The graphics above are original. No endorsement by NCHRP, TRB, MnDOT, MnROAD or the report's authors is implied, and none of them took part in this evaluation.

#### Two different questions

A result on one does not carry over to the other.

##### Scientific relationship

Do roller measurement values relate to a physical test result in a way that holds on groups the model has not seen?

Addressed by the field-trial study and by the two asphalt datasets. Answer so far: no stable universal relationship.

##### Spatial next-test prioritization

Does the candidate ranking put useful test locations near the top?

Addressed twice, both retrospectively. On the field trial: NO CLEAR RETROSPECTIVE ADVANTAGE . On published MnROAD data: NO CLEAR EXTERNAL SPATIAL PRIORITIZATION ADVANTAGE . The asphalt datasets have no coordinates and do not change this. A prospective pilot is the open step.

#### Real data used

What each dataset was used for, and what it was not.

##### SPARC Intelligent Compaction Analyzer field trial

A real field trial from 23 and 24 May 2024 on a compaction area of about 12 m by 4 m with a Caterpillar CS44B roller. It contains intelligent-compaction observations together with nuclear-gauge density and moisture tests and laboratory moisture reports to AS 1289. Roller data and tests share the trial's own lane position tags, which is what makes real pairing possible. This is the dataset behind the paired study, the evidence-support examples and the retrospective check.

Attribution: "SPARC Intelligent Compaction Analyzer (ICA) Dataset", trial of 2024-05-23/24. The dataset's documentation does not name a publisher or author, and LayerProof records that as stated. Raw files are not distributed on this site.

##### MnDOT intelligent-compaction exports

Real Minnesota DOT intelligent-compaction exports in Veta 9 format are used for import, validation, canonical storage, mapping and for showing how LayerProof behaves when there is roller data and no physical test. No scientific pairing was made with them.

An FHWA LTPP InfoPave DCP workbook is used to exercise the import of physical-test records. It comes from unrelated pavement sections, has no coordinates, and was never paired with the MnDOT data.

##### Two public asphalt datasets

Published supplementary tables used for the asphalt analysis above: one with CMV, CCV, AICV and RMV values and NNDG readings (170 records), one with HMV values and nuclear-gauge and core density (180 records). Both are processed publication data without project, site or coordinate information. They were examined outside LayerProof's project workflow and were never combined with the field-trial or MnDOT data.

The second accompanies "Optimizing Asphalt Compaction: Intelligent Compaction Roller Frequency and Machine Learning Prediction of In-Place Density". The first was supplied under a title beginning "Bayesian Optimization-Based SVR and RF Models for…"; its archive contains no citation. No licence is stated for either, so no records are redistributed here.

##### NCHRP Research Report 933, Appendix F

Published matrices of CMV, LWD modulus and FWD modulus from proof mapping on MnROAD cells 185, 186, 188 and 189 in 2017. Used only for the retrospective external spatial evaluation above, outside LayerProof's project workflow, and never combined with any other dataset.

National Cooperative Highway Research Program, Transportation Research Board. Cited as a source; its content is not redistributed here.

##### Synthetic fixtures

Small synthetic files exist to test the software. They are labelled synthetic wherever they appear and cannot anchor a real result.

## pilot.html

Title: Pilot — LayerProof

Description: How a LayerProof pilot would run on an intelligent-compaction project, what the project needs to provide, and what has and has not been shown so far.

### Running a pilot

The software workflow for a pilot is implemented. A prospective field pilot has not been run yet, and that is what we are looking for partners to do.

#### The loop

From the first import to the updated evidence after a new test.

- Import Roller exports and existing test records

- Validate Location, time, units, structure

- Evidence What is paired with a physical test, and what is not

- Support A state per location and pass, with gaps in view

- Verify Candidates with reasons; the engineer's decision is recorded

- Field test Taken in the field by the project team

- Update Compare the evidence before and after

Decision support, not an engineering acceptance determination. Final test location selection remains with the engineer.

#### Readiness checklist

What LayerProof needs from a project before the loop can start.

- Project metadata Working coordinate system and time zone.

- Roller data with its source An intelligent-compaction export, fingerprinted and versioned.

- A legitimate spatial reference A confirmed coordinate system, or location tags defined by the source.

- Roller and machine details At least the roller in use.

- Layer, material and pass context So tests are compared with the right roller passes.

- Existing physical tests Whatever has been taken so far, with locations.

- A validation result With no blocking finding.

- An engineer To review the candidates and decide.

[Screenshot: Pilot readiness checklist with eleven items and their status.]

The readiness checklist in the application. The status describes what a pilot needs, not the construction. Screenshot of the LayerProof application. Data shown: Real SPARC field-trial data in a browser-test project.

#### The engineer decides

LayerProof records the decision. It does not make it.

For each candidate an engineer can select it, defer it, reject it, or choose a different location and say why. The decision is appended to the history next to the candidate. The ranking that LayerProof produced is kept as it was, so the record shows both what was suggested and what was done.

When the new physical test comes back, it is imported like any other file. The evidence-support assessment is rerun, and the two assessments are compared side by side. No model is retrained.

[Screenshot: Engineer review table showing ranked candidates and the latest recorded decision for each.]

The review log. The decision shown was entered by an automated software test, not by a practising engineer. Screenshot of the LayerProof application. Data shown: Real SPARC field-trial data; the recorded decision was entered by the automated browser test, not by a practising engineer.

#### Where things stand

Stated plainly, so a partner knows what they would be evaluating.

- The workflow runs end to end in the application on real field-trial data.

- The ranking has been checked retrospectively against simple baselines. The recorded outcome is no clear retrospective advantage. Details .

- The priority has also been evaluated retrospectively on a public NCHRP/MnROAD spatial field dataset. No clear advantage over the comparison baselines was observed. Details .

- No prospective field pilot has been run. No agency or contractor has used LayerProof on a live project.

- LayerProof is a research prototype and is not production-certified.

A pilot is how the open question gets answered: on a live project, do the candidates LayerProof raises help an engineer place tests where they add evidence?

#### Interested in evaluating LayerProof on a real intelligent-compaction project?

We welcome conversations about field-data collaboration and pilot opportunities with transportation agencies, contractors, testing and quality-assurance organizations, and research groups.

To start a conversation, reply to either co-founder through the channel where you received this link.

Contact and collaboration

## team.html

Title: Team — LayerProof

Description: LayerProof is developed by co-founders Metehan Alp Memis and Şevval Ulus Memiş as a research-driven construction quality-assurance and decision-support platform.

### Team

LayerProof is being developed as a research-driven construction quality-assurance and decision-support platform by two co-founders.

#### Metehan Alp Memis

Co-Founder

**Position**

PhD Student, Civil & Environmental Engineering

**Affiliation**

University of Illinois Urbana-Champaign

**Focus**

Transportation infrastructure, pavement engineering, intelligent compaction, field validation, research direction and product development.

#### Şevval Ulus Memiş

Co-Founder

**Degree**

M.S. Data Science, with a background in Computer Engineering and Data Science

**Affiliation**

Maryville University

**Focus**

Data science, machine learning, analytics, visualization, data workflows and product and data development.

#### About the project

LayerProof combines intelligent compaction data, physical field-test evidence and project context to identify where evidence is insufficient and where additional physical verification may be most valuable.

Participant, UW–Madison NSF I-Corps Regional Cohort, Fall 2026.

The universities named here are the founders' affiliations. They do not own, sponsor or endorse LayerProof. Participation in an I-Corps cohort is a training and customer-discovery programme; it is not funding for, or an endorsement of, the technology.

Get in touch about a pilot or collaboration

## contact.html

Title: Contact — LayerProof

Description: Contact the LayerProof team about research collaboration, field-data collaboration, pilot opportunities, or feedback from agencies, contractors and testing organizations.

### Contact and collaboration

Interested in evaluating LayerProof on a real intelligent-compaction project?

#### Who we would like to hear from

- Field-data collaboration Roller exports together with physical tests from the same site, layer and pass.

- Pilot opportunities An upcoming project that uses intelligent compaction and could run the workflow alongside its own process.

- Transportation agencies How verification testing is specified today, and where the evidence feels thin.

- Contractors How roller data is used on site, and what would make it more useful.

- Testing and quality-assurance organizations How test locations are chosen and recorded in practice.

- Research groups Work on compaction, pavement foundations or construction quality assurance.

To start a conversation, reply to either co-founder through the channel where you received this link.

What a pilot involves View the evidence

#### What to expect

LayerProof is a research prototype. It is not commercially available and is not production-certified. A first conversation is about whether your data and workflow are a fit for an evaluation, and what such an evaluation could and could not show.

Decision support only — final engineering decisions remain with the engineer.

## 404.html

Title: Page not found — LayerProof

Description: This page does not exist on the LayerProof website.

### Page not found

There is no page at this address. The links below go to the pages that exist.

Go to the home page See the product
