# Publishing the LayerProof website on GitHub Pages

The website is the folder `website/`. It is self-contained. The LayerProof application repository stays private;
only the contents of `website/` go into a public repository.

Expected address: `https://<github-user-or-org>.github.io/<repository>/`
(or `https://<github-user-or-org>.github.io/` if the repository is named `<github-user-or-org>.github.io`).
The site uses relative links, so it works under any repository name without changes.

## Steps
1. **Create the public repository.** On GitHub: New repository, visibility Public, no template. Choose the name;
   it becomes the last part of the address.
2. **Push the website source.** From a copy of this project:
   ```
   cp -r website ~/layerproof-site && cd ~/layerproof-site
   rm -rf node_modules dist
   git init -b main && git add -A && git commit -m "LayerProof public website"
   git remote add origin git@github.com:<github-user-or-org>/<repository>.git
   git push -u origin main
   ```
   Push the *contents* of `website/` as the repository root, so that `.github/workflows/deploy-pages.yml` is at the
   top level. Do not push the application repository.
3. **Open the repository Settings.**
4. **Open Pages** (left menu, under "Code and automation").
5. **Select GitHub Actions** as the Source under "Build and deployment".
6. **Run the deployment.** The push in step 2 already started the workflow "Deploy website to GitHub Pages". If it
   ran before step 5, open Actions, choose the workflow and press "Run workflow".
7. **Verify the address** shown on the workflow run and under Settings, Pages:
   - the home page loads with styles and screenshots;
   - `…/research.html` shows the result tables;
   - a missing address such as `…/no/such/page` shows the "Page not found" page with styles;
   - no demo link is shown until a demo URL is set; the capability table states that the demonstration is not publicly hosted.
8. **Optional settings** (Settings, Secrets and variables, Actions, Variables tab, "New repository variable"):
   - `CONTACT_EMAIL` or `CONTACT_FORM_URL`: the public contact channel. Set one before announcing the site; without it the
     contact block asks visitors to reply through the channel where they received the link.
   - `DEMO_URL`: set only once the read-only demo is really hosted (see `docs/final/FINAL_LIVE_DEMO_GUIDE.md`). A button
     "Explore the live demo" and a Demo menu item then appear.
   Re-run the workflow after changing a variable.
9. **Optional custom domain, later.** Settings, Pages, Custom domain; add the DNS record GitHub shows; tick
   "Enforce HTTPS". The workflow reads the new address by itself. No domain is assumed anywhere in the site.

## What the workflow does
`actions/configure-pages` supplies the site address and base path, `node build.mjs` builds `dist/`,
`node tools/syntax-check.mjs` and `node tools/check.mjs` must pass (links, assets, private-content scan, claims and final-wording scan, frozen results), then `dist/` is deployed.
A failed check stops the deployment.

## Before every publication
Run `npm test` and read `docs/final/FINAL_RELEASE_CHECKLIST.md`.
