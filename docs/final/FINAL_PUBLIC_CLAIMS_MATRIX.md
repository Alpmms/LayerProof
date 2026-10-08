# Final public claims matrix
> Final document. LayerProof public website, final release of 2026-10-07. Later changes are ordinary content or product updates.

If a public sentence is stronger than the "Allowed public wording" column, the sentence is wrong.
`tools/check.mjs` enforces the prohibited wording and the required statements on every build.

| Claim | Supported | Evidence source | Supporting artifact | Limitations | Allowed public wording | Prohibited stronger wording |
|---|---|---|---|---|---|---|
| Imports real intelligent-compaction data and keeps source files unchanged | Yes | Weeks 1–2 | `WEEK2_ACCEPTANCE.md` | Two source formats exercised | "Imports real intelligent-compaction exports and keeps the source files unchanged" | "Works with any roller or vendor" |
| Validates data and reports what blocks its use | Yes | Week 3 | `WEEK3_ACCEPTANCE.md`; ADR-016 | The minimum data package is a project definition, not a standard | "Checks what the data can be used for and reports what blocks it" | "Certifies data quality" |
| Pairs roller data with physical tests (SPARC) | Yes | Week 5, SPARC field trial | `WEEK5_ACCEPTANCE.md`; ADR-025 | One trial; pairing by the source's location tags | "Pairs roller data with physical tests from the same site, layer and pass" | "Fuses all field data automatically" |
| Simple models predict held-out dry density on SPARC | **No** | Week 5 | `docs/science/sparc/table_sparc_runs.csv` (seed 20261005) | 8 and 13 locations, one trial | "Simple models built from roller values did not predict dry density at held-out test locations" | "Predicts density"; "predicts stiffness" |
| A validated predictive model or predictive uncertainty exists | **No** | Weeks 5–6 | ADR-028; `WEEK6_ACCEPTANCE.md` | — | "No predictive model is treated as validated and no predictive uncertainty is reported" | "Confidence intervals"; "failure probability"; "quality score" |
| States evidence support and abstains | Yes | Week 6 | `WEEK6_ACCEPTANCE.md`; ADR-027 | Rule-based; calibration of the rules is not established | "Designed to abstain when evidence is insufficient rather than manufacture confidence" | "Always knows when it is wrong" |
| Evidence states describe construction quality | **No** | Week 6 | ADR-027 | — | "They describe the evidence, never the construction" | "Identifies weak zones"; "predicts defects" |
| Ranks verification candidates by evidence gap | Yes | Week 7 | `WEEK7_ACCEPTANCE.md`; `config/verify/verify_v1.yaml` | Product-policy weights, not acceptance criteria | "Ranks candidate locations for another physical test by evidence gap; the engineer decides" | "Optimal test location"; "best test location"; "AI determines where to test" |
| The ranking showed a clear retrospective advantage on SPARC | **No** | Week 8 | `docs/retro/table_retro_metrics.csv`; `WEEK8_ACCEPTANCE.md` | Retrospective; 8 and 13 locations; one trial | "NO CLEAR RETROSPECTIVE ADVANTAGE" | "Outperforms random"; "validated prioritization" |
| Pilot workflow is implemented | Yes | Week 8 | `WEEK8_ACCEPTANCE.md`; ADR-032 | Software workflow; decisions in screenshots were entered by automated tests | "The workflow an engineer would follow is implemented end to end" | "Piloted with agencies"; "field validated" |
| A prospective field pilot has been run | **No** | — | — | — | "No prospective field pilot has been run" | "Field validated"; "proven across projects" |
| Two public asphalt datasets were examined | Yes | EXTVAL_1.0.0 | `docs/external_validation/RESULTS.md`; export `EXTVAL_1.0.0` | Published processed tables; no projects, sites or coordinates | "Examined on two independent public asphalt datasets" | "Validated on asphalt"; "validated across materials" |
| A stable universal relationship between roller values and density exists | **No** | Week 5; EXTVAL_1.0.0 | `RESULTS.md`; `CROSS_DATASET_COMPARISON.md` | — | "Compaction measurements did not show a stable universal relationship with physical density" | "Predicts density" |
| Cross-dataset transfer works | **No — not comparable** | EXTVAL_1.0.0 | `CROSS_DATASET_COMPARISON.md` | No shared measurement or target | "Transfer between datasets could not be compared" | "Generalizes"; "transfers across sites" |
| The evidence gate withheld a claim on the asphalt datasets | Yes | EXTVAL_1.0.0 | `exports/EXTVAL_1.0.0/accepted_gate.json` | Shows caution, not calibration | "The evidence gate did not allow a scientific claim for either dataset" | "Abstention has been validated" |
| The ranking was evaluated on an external spatial dataset | Yes — retrospectively | NCHRP933_SPATIAL_1.0.0 | `docs/external_spatial_validation/RESULTS.md`; export `NCHRP933_SPATIAL_1.0.0` | Retrospective replay; one field study; published aggregated values; limited power | "Retrospectively evaluated on a public NCHRP/MnROAD spatial field dataset; no clear advantage over the comparison baselines was observed."; "retrospective external spatial evaluation" | "Validated on MnROAD"; "validated across agencies"; "field validated" |
| The ranking showed an advantage on that dataset | **No** | NCHRP933_SPATIAL_1.0.0 | `benchmark_results.json`: favourable against both baselines in 3 of 12 (random 3, maximin 8) | same | "NO CLEAR EXTERNAL SPATIAL PRIORITIZATION ADVANTAGE" | "Outperforms spatial maximin" on its own; "optimal test location" |
| LayerProof determines acceptance or quality | **No** | — | — | Decision support only | "Decision support only — final engineering decisions remain with the engineer." | "Determines acceptance"; "automatically accepts/rejects"; "guarantees quality" |
| Production readiness | **No** | — | — | Research prototype | "Research prototype; not production-certified" | "Production-ready"; "certified" |
| Endorsement by a university, agency, programme, publisher or data host | **No** | — | — | — | Affiliations and I-Corps participation as facts; "No endorsement … is implied" | "Backed by"; "endorsed by"; "in partnership with" |

## Two questions that are kept apart
| Question | Addressed by | Recorded answer |
|---|---|---|
| Scientific relationship | SPARC paired study; two asphalt datasets | no stable universal relationship |
| Spatial next-test prioritization | retrospective check on SPARC; retrospective external spatial evaluation on NCHRP 933 / MnROAD | NO CLEAR RETROSPECTIVE ADVANTAGE; NO CLEAR EXTERNAL SPATIAL PRIORITIZATION ADVANTAGE |
