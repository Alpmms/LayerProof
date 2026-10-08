# Final security review
> Final document. LayerProof public website, final release of 2026-10-07. Later changes are ordinary content or product updates.

Scope: everything that enters the public website repository (the website source package) and the built site.

| Scan | Tool | Result |
|---|---|---|
| API keys, tokens, private keys, JWTs | `scripts/public_content_scan.py`; `tools/check.mjs` section 3 | PASS — No findings. |
| Passwords and credential assignments | same | PASS — No findings. |
| OIDC client secrets | same (credential and secret-name patterns) | PASS — No findings. |
| Database credentials and URLs | same | PASS — No findings. |
| Private email addresses | `public_content_scan.py` (personal-address pattern); manual review | PASS — No findings.. No email address is in the source; the contact address is supplied at deployment |
| Private internal URLs, loopback addresses | `tools/check.mjs` section 3 on the build; `public_content_scan.py` on the source | PASS — No findings.. The preview server binds to the loopback interface by default; that is a tool setting, not published content |
| Mount, temporary-directory and developer-machine paths | same | PASS — No findings. |
| Database dumps, archives, spreadsheets, PDFs | file-type rule in both tools; archive listing | PASS — no node_modules, build output, env file, dataset, dump, archive or PDF in the source archive |
| Confidential project material, discovery-interview material | manual review of the file list | none present |
| Non-public I-Corps information | manual review | none. The only I-Corps text is "Participant, UW–Madison NSF I-Corps Regional Cohort, Fall 2026." |
| University or private cloud-storage paths | pattern scan for common cloud-storage hosts (`scripts/website_release.py`) | PASS — no cloud-storage path in any text file |
| Third-party requests from the built pages | `tools/browser-check.mjs` (every request must stay inside the site) | PASS — OK: 7 pages x 3 viewports under /layerproof-site-check/ — requests, layout, axe WCAG 2.1 A/AA, keyboard, 404. |
| Source report PDF or its tables and figures | file-type rule; `tools/check.mjs` section 8 | none present |

## What the package deliberately excludes
`node_modules`, `dist`, any `.env` file, the application source, raw datasets, the extracted NCHRP grid, database
dumps, the source PDFs, internal planning documents.

## Residual points
- The contact address is published once set. Use a project address, not a personal one.
- The demo, when hosted, has its own security model (`FINAL_LIVE_DEMO_GUIDE.md`); it is not part of this repository.
