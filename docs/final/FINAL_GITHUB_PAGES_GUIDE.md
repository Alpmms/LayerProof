# Final GitHub Pages guide
> Final document. LayerProof public website, final release of 2026-10-07. Later changes are ordinary content or product updates.

The repository name is not fixed. `<owner>` is the GitHub user or organization, `<repository>` the name you choose.

## Project-site format: `https://<owner>.github.io/<repository>/`
1. On GitHub create a new **public** repository named `<repository>`. No template.
2. Unpack `layerproof-public-website-final.zip` and push its contents as the repository root:
   ```
   cd layerproof-public-website-final
   git init -b main && git add -A && git commit -m "LayerProof public website"
   git remote add origin git@github.com:<owner>/<repository>.git
   git push -u origin main
   ```
   `.github/workflows/deploy-pages.yml` must be at the top level of the repository.
3. Settings, Pages, Build and deployment, Source: **GitHub Actions**.
4. Actions, "Deploy website to GitHub Pages", Run workflow (if the first push ran before step 3).
5. Settings, Secrets and variables, Actions, Variables: add `CONTACT_EMAIL` or `CONTACT_FORM_URL`. Add `DEMO_URL`
   only when the demo is hosted. Re-run the workflow.
6. Open the address shown on the run. Check the home page, `research.html`, and a missing address such as
   `…/no/such/page`, which must show the styled "Page not found" page.

If the repository is named `<owner>.github.io`, the address is `https://<owner>.github.io/` and nothing else changes.

## Custom-domain format: `https://<your-domain>/`
1. Complete the steps above.
2. Settings, Pages, Custom domain: enter the domain and save.
3. At the DNS provider: a `CNAME` record from the subdomain to `<owner>.github.io`; or, for an apex domain, the `A`
   records listed in GitHub's Pages documentation.
4. Wait until GitHub reports the DNS check as successful and the certificate as issued, then tick **Enforce HTTPS**.
5. Re-run the workflow. The site now uses the domain for canonical links, the sitemap and the social image.

Do not add a `CNAME` file by hand; with the Actions source GitHub keeps the domain in the repository settings.

## Do not publish
The application repository. Only the website folder is public.
