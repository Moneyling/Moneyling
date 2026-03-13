# Deploying Moneyling.org

## Current setup: GitHub Pages + custom domain

- **Build:** GitHub Actions (`.github/workflows/deploy-pages.yml`) on push to `main`.
- **Site:** Served at **moneyling.org** (custom domain). Build uses `BASE_PATH=/` so assets are at `/assets/...`.

### If the site is blank or “works then fails”

1. **DNS / custom domain flakiness**  
   GitHub Pages sometimes shows “DNS Check in Progress” and can serve different caches. If the site was live and then goes blank with no code changes, it’s often this:
   - In the repo: **Settings → Pages**. Ensure **Source** is **GitHub Actions** (not “Deploy from a branch”).
   - Under **Custom domain**, re-enter `moneyling.org`, click **Save**, and wait until the DNS check passes (no orange “in progress”).
   - At your DNS provider (e.g. GoDaddy): keep the records GitHub shows (usually A records for apex and/or CNAME for `www`). Avoid changing them while the check is in progress.

2. **Hard refresh**  
   After a successful deploy, do a hard refresh (Ctrl+Shift+R) so the browser doesn’t use an old cached `index.html`.

3. **Fallback message**  
   If the app fails to load (e.g. script 404), a short message and contact link appear after a few seconds instead of a blank screen.

---

## Alternative: host on Netlify or Vercel

If GitHub Pages + custom domain keeps failing or going blank, you can host the same repo on **Netlify** or **Vercel** and point **moneyling.org** there. Both handle custom domains and caching in a more stable way.

- **Netlify:** Connect the repo, set build command `BASE_PATH=/ npm run build` (or `npm run build` with env `BASE_PATH=/`), publish directory `dist`. Then add custom domain moneyling.org in Netlify and update DNS to Netlify’s instructions.
- **Vercel:** Connect the repo; it usually detects Vite. Set env `BASE_PATH=/`. Add custom domain in Vercel and point DNS there.

The same codebase and workflow (build with `BASE_PATH=/`) work for any of these; only DNS and the “where to deploy” setting change.

---

## Azure

You can host the site on Azure and point **moneyling.org** there for more stable custom-domain behavior than GitHub Pages.

### Option 1: Azure Static Web Apps (recommended)

Static Web Apps is ideal for this repo: free tier, custom domains, and no “DNS Check in Progress” flakiness.

1. **Create the app in Azure**
   - Azure Portal → **Create a resource** → **Static Web App**.
   - Choose **Other** (or **GitHub**) for deployment source; you’ll use the deployment token.
   - After creation, go to the resource → **Overview** → copy the **Deployment token**.

2. **Add the token in GitHub**
   - Repo → **Settings → Secrets and variables → Actions** → **New repository secret**.
   - Name: `AZURE_STATIC_WEB_APPS_API_TOKEN`, value: the deployment token.

3. **Use the Azure workflow**
   - Enable the workflow in [`.github/workflows/azure-static-web-apps.yml`](../.github/workflows/azure-static-web-apps.yml) (it’s set up to build with `BASE_PATH=/` and deploy the `dist` folder).
   - Push to `main` (or run the workflow manually). The site will deploy to your Static Web App URL.

4. **Custom domain**
   - In the Static Web App → **Custom domains** → add **moneyling.org**.
   - Follow the instructions to update DNS (CNAME or A record). Once validated, traffic goes to Azure.

You can keep or remove the GitHub Pages workflow; if both run, you can point DNS to Azure and ignore the Pages URL.

**If deployment shows "Failed" or "We have not received any content for your site yet":**

1. **Add or fix the deployment token in GitHub**
   - In **Azure Portal** → your Static Web App → **Manage deployment token** → copy the token (or reset and copy).
   - In **GitHub** → repo **Moneyling** → **Settings** → **Secrets and variables** → **Actions**.
   - If `AZURE_STATIC_WEB_APPS_API_TOKEN` is missing: **New repository secret** → Name: `AZURE_STATIC_WEB_APPS_API_TOKEN`, Value: (paste the token).
   - If it already exists but the run still fails: delete the secret, get a fresh token from Azure (**Manage deployment token** → Reset if needed), then add the secret again.

2. **See why the last run failed**
   - In **GitHub** → **Actions** → open the failed run (e.g. "Deploy to Azure Static Web Apps" or "ci: add Azure Static Web Apps workflow file").
   - Open the **Build And Deploy** (or failing) step and read the error. Common messages:
     - *"api key was invalid" / "No matching Static Web App"* → fix the token (step 1).
     - *Build / npm error* → the workflow’s build command or Node version may need adjusting.

3. **Trigger a new deployment**
   - **Actions** → **Deploy to Azure Static Web Apps** → **Run workflow** → **Run workflow**, or push a new commit to `main`.

### Option 2: Azure App Service or VM

If you already have an **App Service** (web app) or a **VM** (IIS, nginx, etc.):

- **Build** the site the same way: `BASE_PATH=/ npm run build` (or set `BASE_PATH=/` in the environment).
- **Deploy** the contents of the `dist` folder to the server:
  - **App Service:** e.g. zip the `dist` folder and use “Zip Deploy” or Azure CLI `az webapp deployment source config-zip`.
  - **VM:** copy `dist` to the web root (e.g. scp/rsync to `/var/www/html` or the IIS site path).

No workflow is included for these; you can add a GitHub Action that builds and deploys via Azure CLI or FTP if you want automation.
