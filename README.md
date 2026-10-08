# LayerProof public website

**What is LayerProof?** Evidence-aware construction quality assurance for intelligent compaction workflows. It keeps
roller data and physical field tests side by side, shows where the evidence does not support an interpretation, and
helps engineers weigh where another physical test may add evidence. Decision support only — final engineering
decisions remain with the engineer. This repository is the static public website; it does not contain the application.

| Question | Answer |
|---|---|
| Run the site locally | `npm run build && npm run preview`, then open the address it prints (Node 20 or newer; no install needed) |
| Build it | `npm run build` (runs `node build.mjs`, output in `dist/`) |
| Check it | `npm test` (syntax and render check, build, links, wording, frozen results); `npm ci && npm run check:browser` for layout and accessibility |
| Deploy to GitHub Pages | push this folder as the root of a public repository, set Settings, Pages, Source to "GitHub Actions"; the workflow `.github/workflows/deploy-pages.yml` builds, checks and deploys. Steps: `docs/final/FINAL_GITHUB_PAGES_GUIDE.md` |
| Public claims | `docs/final/FINAL_PUBLIC_CLAIMS_MATRIX.md`; exact copy in `docs/final/FINAL_WEBSITE_CONTENT.md`; sources in `docs/final/FINAL_SOURCE_LOG.md` |
| Screenshots | `docs/final/FINAL_SCREENSHOT_INVENTORY.md`; files in `src/assets/shots/`, listed in `tools/screenshots.json` |
| Live demo | a separate read-only deployment of the application, described in `docs/final/FINAL_LIVE_DEMO_GUIDE.md`. Status: hosting required. Set `DEMO_URL` once it is hosted |
| Co-founders | Metehan Alp Memis and Şevval Ulus Memiş |

## Settings (`site.config.json`, or environment variables at build time)
| Setting | Variable | When empty |
|---|---|---|
| `siteUrl` | `SITE_URL` | no canonical URL and no sitemap; relative social image |
| `demoUrl` | `DEMO_URL` | no demo link anywhere; the capability table says the demonstration is not publicly hosted |
| `contactEmail` | `CONTACT_EMAIL` | no email button; the contact block asks visitors to reply through the channel where they received the link |
| `contactFormUrl` | `CONTACT_FORM_URL` | no form button |
| `showICorps` | — | `false` hides the I-Corps participation line on the Team page |

## Structure
- `build.mjs` — the build. Plain Node, no framework, no runtime dependencies.
- `src/site.mjs`, `src/pages/*.mjs` — layout and the eight pages (`index`, `product`, `evidence`, `research`, `pilot`, `team`, `contact`, `404`).
- `src/data/*.json` — frozen results. Every number on the site is rendered from these files; do not type numbers into pages.
- `src/assets/` — styles, self-hosted fonts, screenshots, social image.
- `tools/` — checks, preview server, content export.
- `docs/final/` — the final public documentation.

## Content rules
- Negative and inconclusive results are shown as recorded. `tools/check.mjs` fails the build on prohibited wording,
  on missing required statements, and on any number that differs from the frozen results.
- Screenshots are cropped copies of real application screens. No mock-ups.
- Tables and figures of third-party reports are not reproduced. Graphics are original.
- University names are affiliations only. No university, agency, programme or publisher endorses LayerProof.
