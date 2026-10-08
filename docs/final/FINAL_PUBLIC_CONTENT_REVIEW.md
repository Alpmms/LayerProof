# Final public content review
> Final document. LayerProof public website, final release of 2026-10-07. Later changes are ordinary content or product updates.

Manual review of the built site, page by page, on 2026-10-07, together with the automated checks.

| Subject | Finding |
|---|---|
| Scientific claims | Every number is rendered from the frozen files and cross-checked against the accepted tables. Negative results are stated as recorded: negative held-out R² on the field trial; NO CLEAR RETROSPECTIVE ADVANTAGE; no stable universal relationship on the asphalt datasets; NO CLEAR EXTERNAL SPATIAL PRIORITIZATION ADVANTAGE on NCHRP 933 / MnROAD (3 of 12 favourable against both baselines). The three favourable combinations appear only together with the others. No statement from before the NCHRP benchmark remains that it would contradict |
| Prohibited wording | None of: predicts defects, identifies weak zones, guarantees quality, determines acceptance, automatically accepts or rejects, optimal or best test location, failure probability, quality score, proven across projects, AI determines where to test, validated across agencies, field validated. The list of what LayerProof is not is the only place such terms occur, as negations |
| Institutional wording | University names appear as the founders' affiliations with the sentence that they do not own, sponsor or endorse LayerProof. NCHRP, TRB, MnDOT and MnROAD appear as sources with "No endorsement … is implied" on every page that names them |
| I-Corps wording | Exactly "Participant, UW–Madison NSF I-Corps Regional Cohort, Fall 2026.", followed by the statement that participation is not funding or endorsement. Switchable with `showICorps` |
| Source attribution | Each dataset is attributed as its own documentation states; gaps are stated as gaps. See `FINAL_SOURCE_LOG.md` |
| Copyright | No table, figure or individual value from NCHRP Research Report 933 or the asphalt publications. Original graphics only. Map screenshots credit OpenStreetMap contributors. Fonts under the Open Font License |
| Accessibility | PASS — OK: 7 pages x 3 viewports under /layerproof-site-check/ — requests, layout, axe WCAG 2.1 A/AA, keyboard, 404. |
| Mobile layout (390 px) | no horizontal overflow on any page; tables scroll inside their own region; the workflow strips stack |
| Desktop layout (1440 px) | reviewed from section screenshots, including the new NCHRP sections |
| Broken links | PASS — OK: links, assets, private-content scan, claims scan, final-wording scan, required statements, founder parity, accepted numbers, external evidence, external spatial benchmark. |
| Navigation | seven items, current page marked, keyboard reachable; the 404 page works at a nested missing address |
| Spelling | read through; British "favourable" is used consistently in the benchmark sections, matching the frozen result files |
| Founder names | "Metehan Alp Memis" and "Şevval Ulus Memiş", each as Co-Founder, same markup and comparable length (checked automatically) |
| University names | "University of Illinois Urbana-Champaign"; "Maryville University" |
| Contact text | names field-data collaboration, pilot opportunities, transportation agencies, contractors, testing and quality-assurance organizations, and research groups. No address is hard-coded |
| Temporary wording | none: no unfinished-state wording, no disabled button, no internal milestone labels, no internal paths |
| Demo presentation | no demo link without a hosted address; the capability table states "not publicly hosted" |
