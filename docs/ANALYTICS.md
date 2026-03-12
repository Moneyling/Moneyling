# Tracking visitors and clicks on moneyling.org

This project is set up to support **Google Analytics 4 (GA4)** so you can track visitors, page views, and (optionally) custom events (e.g. button clicks) once the site is live on your **moneyling.org** domain.

---

## 1. Google Analytics 4 (included)

### Get your Measurement ID

1. Go to [Google Analytics](https://analytics.google.com/) and sign in.
2. Create a **GA4 property** (or use an existing one) for **moneyling.org**.
3. Under **Admin → Data Streams**, add a **Web** stream with URL `https://moneyling.org`.
4. Copy the **Measurement ID** (format: `G-XXXXXXXXXX`).

### Enable tracking in this project

1. In the project root, create or edit **`.env`** and **`.env.production`** (for production builds):
   ```bash
   VITE_GA_MEASUREMENT_ID=G-XXXXXXXXXX
   ```
   Replace `G-XXXXXXXXXX` with your real ID.

2. **Do not commit** `.env` or `.env.production` if they contain secrets. Add them to **`.gitignore`** (they usually are for Vite projects).

3. Rebuild and deploy:
   ```bash
   npm run build
   ```
   The built site will load the GA4 script only when `VITE_GA_MEASUREMENT_ID` is set.

### What is tracked automatically

- **Page views** – Every time a user opens the site or navigates to another page (e.g. Home → For Educators), a `page_view` event is sent with the path and current page title. So you get per-page traffic (visitors and clicks to each section).

### Optional: track specific button/link clicks

To track “Email Cart to Moneyling”, “Request a demo”, “Contact us”, etc.:

1. In GA4, use **Events** (they will appear in the report once they’re sent).
2. In code, send a custom event when the user clicks. Example:

   ```ts
   // Example: send event when user clicks "Request a demo"
   const sendEvent = (name: string, params?: Record<string, string>) => {
     if (typeof (window as unknown as { gtag?: (...a: unknown[]) => void }).gtag === "function") {
       (window as unknown as { gtag: (...a: unknown[]) => void }).gtag("event", name, params);
     }
   };

   // In your button/link onClick:
   sendEvent("click_request_demo", { page: "for-financial-institutions" });
   ```

3. You can add a small helper in `src/utils/analytics.ts` and call it from the buttons/links you care about.

---

## 2. Submitting your sitemap to Google

After the site is live at **https://moneyling.org**:

1. Open [Google Search Console](https://search.google.com/search-console) and add the property **https://moneyling.org**.
2. Under **Sitemaps**, submit: `https://moneyling.org/sitemap.xml`.
3. Ensure **robots.txt** is reachable at `https://moneyling.org/robots.txt` (it’s in `public/` and allows crawlers and points to the sitemap).

---

## 3. Other options (optional)

- **Plausible** – Privacy-focused, no cookies. Add their script in `index.html` or a similar component if you prefer not to use GA4.
- **Microsoft Clarity** – Free heatmaps and session recordings. Add their script alongside or instead of GA4 if you want click heatmaps.

Once your domain **moneyling.org** points to the deployed site and `VITE_GA_MEASUREMENT_ID` is set in the production environment, GA4 will track visitors and page views automatically; you can add custom events for important clicks as above.
