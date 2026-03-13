# What we need to deploy correctly

## What was wrong (GitHub Pages)

Two workflows were deploying to GitHub Pages on every push:

- **deploy-pages.yml** – builds the app and uploads **`./dist`** (correct).
- **static.yml** – uploaded **`.`** (the whole repo, including source).

When both ran, the last one to finish overwrote the other. When `static.yml` won, the live site was the **source** repo (index.html with `<script src="/src/main.tsx">`), so the browser requested `main.tsx`, got 404, and showed the fallback.

**Fix applied:** `static.yml` was removed. Only **deploy-pages.yml** deploys to GitHub Pages now, and it uploads **dist** only.

---

## Information that helps

### GitHub Pages

1. **Repo → Settings → Pages**
   - **Source** must be **“GitHub Actions”** (not “Deploy from a branch”).  
   - If it’s “branch”, the site can be served from the branch instead of the Actions artifact and look broken.

### Azure Static Web Apps

1. **Repository secret**
   - Name must match what’s in the workflow, e.g.  
     `AZURE_STATIC_WEB_APPS_API_TOKEN_CALM_STONE_07758A010`  
   - Value = deployment token from Azure (Static Web App → Manage deployment token).

2. **Which workflow runs**
   - Either our **azure-static-web-apps.yml** or Azure’s **azure-static-web-apps-calm-stone-07758a010.yml** (or both).  
   - Both are set to: `output_location: "dist"`, `app_build_command: "npm install && npm run build:prod"`, and checkout with `persist-credentials: false`.

3. **If build fails**
   - In **Actions**, open the failed run and the failing job step.  
   - The log (e.g. “could not lock .git/config” or “api key invalid”) tells us whether it’s permissions, token, or build.

---

## Current deploy flow

| Target           | Workflow / method                    | What gets deployed      |
|-----------------|--------------------------------------|--------------------------|
| GitHub Pages    | **deploy-pages.yml** (on push main)  | Contents of **dist/**    |
| Azure (SWA)     | **azure-static-web-apps*.yml**       | Build output **dist/**   |
| Local / emulator| `npm run build:prod` then `npm run swa:dist` | **dist/**        |

Build command everywhere: **`npm run build:prod`** (relative base `./`, so it works at project URL and custom domain).

After any change: push to **main**; wait for the relevant Actions run to finish; hard refresh the site (Ctrl+Shift+R).
