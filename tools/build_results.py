#!/usr/bin/env python3
"""Copy the ACCEPTED result tables into the JSON the website renders, so no scientific number is typed by hand.
Sources: docs/science/sparc/table_sparc_runs.csv (Week 5, canonical seed 20261005) and
docs/retro/table_retro_metrics.csv (Week 8, frozen policy). Nothing is recomputed.
    python website/tools/build_results.py"""
from __future__ import annotations

import csv
import hashlib
import json
from pathlib import Path

ROOT = Path(__file__).resolve().parents[2]
W5 = ROOT / "docs/science/sparc/table_sparc_runs.csv"
W8 = ROOT / "docs/retro/table_retro_metrics.csv"
num = lambda x: None if x in ("", None) else float(x)  # noqa: E731
sha = lambda p: hashlib.sha256(p.read_bytes()).hexdigest()  # noqa: E731

LABELS = {
    "A_dry_density_UGM_layer2": ("Dry density", "UGM layer 2", "kg/m³"),
    "A_dry_density_UGM_layer2_lane_blocks": ("Dry density", "UGM layer 2, held out in blocks of 3 tags", "kg/m³"),
    "A_dry_density_soil_layer1": ("Dry density", "Soil layer 1", "kg/m³"),
    "A_dry_density_existing_layer": ("Dry density", "Existing layer", "kg/m³"),
    "C_wet_density_UGM_layer2": ("Wet density", "UGM layer 2", "kg/m³"),
    "B_moisture_lab_UGM_layer2": ("Laboratory moisture", "UGM layer 2", "%"),
}
week5 = []
rows = {r["run"]: r for r in csv.DictReader(W5.open())}
for key, (target, layer, unit) in LABELS.items():
    r = rows[key]
    week5.append({"run": key, "target": target, "layer": layer, "unit": unit, "gate": r["gate"],
                  "model_status": r["model_status"], "pairs": int(r["pairs"]),
                  "locations": int(r["independent_locations"]), "groups": num(r["groups"]),
                  "ols_r2": num(r["ols_r2"]), "ridge_r2": num(r["ridge_r2"]), "rf_r2": num(r["random_forest_r2"]),
                  "ols_rmse": num(r["ols_rmse"]), "uncertainty": r["uncertainty"]})

week8: dict[str, dict[str, dict]] = {}
for r in csv.DictReader(W8.open()):
    d = week8.setdefault(r["layer"], {}).setdefault(r["design"], {"hidden_locations": int(r["hidden_locations"])})
    m = {k: num(r[k]) for k in ("mrr", "hit_1", "hit_3", "hit_5", "median_rank", "mean_normalized_rank")}
    if r["method"].startswith("RANDOM"):
        d["RANDOM"] = m
        d["share_random_at_least_week7"] = float(r["interpretation"].rsplit(":", 1)[1])
    else:
        d[r["method"]] = m
        d["interpretation"] = r["interpretation"]

out = {"generated_from": {"week5": {"file": str(W5.relative_to(ROOT)), "sha256": sha(W5), "seed": 20261005},
                          "week8": {"file": str(W8.relative_to(ROOT)), "sha256": sha(W8),
                                    "policy": "VERIFICATION_CANDIDATES@1.0.0", "random_repetitions": 1000,
                                    "random_seed_base": 20261008}},
       "week5": week5, "week8": week8,
       "week8_overall": "NO CLEAR RETROSPECTIVE ADVANTAGE"}
(ROOT / "website/src/data").mkdir(parents=True, exist_ok=True)
(ROOT / "website/src/data/results.json").write_text(json.dumps(out, indent=1, ensure_ascii=False))
print("results.json written")
