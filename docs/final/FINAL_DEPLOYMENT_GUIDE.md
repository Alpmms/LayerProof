# Final deployment guide — static website
> Final document. LayerProof public website, final release of 2026-10-07. Later changes are ordinary content or product updates.

## Prerequisites
- Node 20 or newer (the workflow uses Node 22). npm is needed only for the browser check.
- A GitHub account that can create a public repository, or any static host.

## Environment
| Variable | Meaning | Required |
|---|---|---|
| `SITE_URL` | public address, `https://…` | on GitHub Pages it is supplied by the workflow |
| `SITE_BASE_PATH` | path the site is served under, e.g. `/<repository>/` | supplied by the workflow; used by `404.html` only |
| `CONTACT_EMAIL` or `CONTACT_FORM_URL` | public contact channel | set before announcing the site |
| `DEMO_URL` | address of the hosted read-only demo | only when it is hosted |

No secret is needed to build or deploy the site.

## Install, build, preview
```
npm ci                 # optional: only for npm run check:browser
npm test               # syntax and render check, build, static checks
npm run preview        # serves dist/ and prints the address
node tools/serve.mjs --base /my-repository/    # preview under a sub-path, as a project site is served
```
The deployable output is `dist/`.

## GitHub Pages
Branch `main`; workflow `.github/workflows/deploy-pages.yml`; Pages source "GitHub Actions". The workflow passes the
address and base path to the build, runs the checks and deploys `dist/`. Step by step: `FINAL_GITHUB_PAGES_GUIDE.md`.

## Base path
All links are relative. A project site at `https://<owner>.github.io/<repository>/` and a custom domain at `/` both
work without source changes. Only `404.html` needs the base path, and the workflow provides it.

## Custom domain and HTTPS
Settings, Pages, Custom domain. DNS: `CNAME` to `<owner>.github.io` for a subdomain; for an apex domain the `A`
records GitHub lists. After the certificate is issued, tick Enforce HTTPS. Re-run the workflow so canonical links and
the sitemap use the new address.

## Any other static host
Upload the contents of `dist/` (or of `layerproof-public-website-final-dist.zip`). Build with `SITE_URL` set to the
final address if canonical links and a sitemap are wanted, and `SITE_BASE_PATH` if the site is not at the root.

## Rollback
Actions, select the last good run of "Deploy website to GitHub Pages", Re-run all jobs; or `git revert` the offending
commit and push. The site is static, so a rollback has no data side effects.

## Version verification
- The workflow run page shows the deployed commit and address.
- Compare a deployed file with the build: `curl -s <address>/assets/styles.css | sha256sum` against
  `sha256sum dist/assets/styles.css`.
- The External Spatial Benchmark section must show `NO CLEAR EXTERNAL SPATIAL PRIORITIZATION ADVANTAGE`, and the
  retrospective check `NO CLEAR RETROSPECTIVE ADVANTAGE`.
