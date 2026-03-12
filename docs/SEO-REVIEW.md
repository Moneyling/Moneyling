# SEO Review – Moneyling.org

Review date: March 2025. Focus: discoverability in search (Google/Bing) and share/social previews.

---

## What’s Already in Good Shape

- **`lang="en"`** on `<html>` in `index.html` – correct language signal.
- **Single, clear `<title>`** – “Moneyling.org – Financial Education & Community Outreach”.
- **Viewport meta** – present and correct for mobile.
- **Semantic structure** – one **`<h1>` per page** on key routes (Home, For Educators, For Institutions, Individuals, About, Contact, Payment); **`<h2>`/`<h3>`** used for sections.
- **`<main>`** – Layout wraps page content in `<main>`; nav has `aria-label="Main"`.
- **Clean URLs** – `/for-educators`, `/for-financial-institutions`, `/individuals`, `/about`, `/contact`, `/payment` (readable, no IDs).
- **Internal linking** – cross-links between audience paths (e.g. Educators ↔ Institutions).
- **Vite `base`** – supports non-root deployment (e.g. GitHub Pages) via `BASE_PATH`.

---

## Gaps and Recommended Improvements

### 1. **Meta description (high impact)**

- **Current:** No `<meta name="description">` in `index.html`.
- **Impact:** Search engines often use this for the snippet; missing = auto-generated or poor snippets.
- **Fix:** Add a global description in `index.html`, and ideally **per-page descriptions** (see §2).

**Example in `index.html` (global fallback):**
```html
<meta name="description" content="Moneyling delivers story-based financial literacy for schools and community programs, and Dreamlife-Sim for individuals and financial institutions. Standards-aligned curriculum, LMS, and measurable outcomes." />
```

---

### 2. **Per-page `<title>` and meta (high impact)**

- **Current:** Same `<title>` for every route (SPA; no `document.title` or Helmet).
- **Impact:** Every URL (e.g. `/for-educators`, `/individuals`) shows the same title in tabs and search results; weaker relevance and CTR.
- **Fix:** Set **per-route `<title>` and `<meta name="description">`** (and optionally OG/Twitter) from React.

**Options:**

- **A. Lightweight:** In each page component (or in a small wrapper), use `useEffect` to set `document.title` and a single meta description (e.g. create/update a `<meta name="description">` in `<head>`).
- **B. Full control:** Use **`react-helmet-async`** (or similar) in a layout/route wrapper so each route can set:
  - `title`
  - `meta name="description"`
  - Open Graph and Twitter tags (see §3).

**Suggested titles (examples):**

| Route | Suggested `<title>` |
|-------|----------------------|
| `/` | Moneyling – Financial Education & Community Outreach |
| `/for-educators` | For Educators – School & Community Financial Literacy \| Moneyling |
| `/for-financial-institutions` | For Financial Institutions – Community Outreach & FinEd \| Moneyling |
| `/individuals` | For Individuals – Dreamlife-Sim \| Moneyling |
| `/about` | About Moneyling – Mission & Team |
| `/contact` | Contact Moneyling |
| `/payment` | My Cart \| Moneyling |

---

### 3. **Open Graph and Twitter Card meta (medium impact)**

- **Current:** No `og:*` or `twitter:*` tags.
- **Impact:** When links are shared (e.g. LinkedIn, Facebook, X), crawlers fall back to generic or poor previews.
- **Fix:** Add per-page (or at least per-section) tags. Prefer **per-route** if you add react-helmet-async.

**Recommended tags (per page or global to start):**

- `og:title`, `og:description`, `og:url`, `og:type` (e.g. `website`)
- `og:image` – e.g. a 1200×630 PNG/JPG (logo + tagline or key visual)
- `twitter:card` (e.g. `summary_large_image`), `twitter:title`, `twitter:description`, `twitter:image`

Put the image in `public/` (e.g. `public/og-image.png`) and reference it with an absolute URL (e.g. `https://moneyling.org/og-image.png`).

---

### 4. **`robots.txt` (medium impact)**

- **Current:** No `robots.txt` in `public/`.
- **Impact:** Crawlers use defaults; you don’t explicitly allow/disallow or point to a sitemap.
- **Fix:** Add `public/robots.txt`.

**Example (allow all, suggest sitemap):**
```text
User-agent: *
Allow: /

Sitemap: https://moneyling.org/sitemap.xml
```
Adjust host if you use a different production URL (e.g. GitHub Pages).

---

### 5. **Sitemap (medium impact)**

- **Current:** No `sitemap.xml`.
- **Impact:** Search engines may discover URLs only via links; a sitemap speeds and clarifies indexing.
- **Fix:** Add a **static `sitemap.xml`** in `public/` listing important URLs (and optionally a build step to generate it).

**Example minimal `public/sitemap.xml`:**
```xml
<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
  <url><loc>https://moneyling.org/</loc><changefreq>weekly</changefreq><priority>1</priority></url>
  <url><loc>https://moneyling.org/for-educators</loc><changefreq>weekly</changefreq><priority>0.9</priority></url>
  <url><loc>https://moneyling.org/for-financial-institutions</loc><changefreq>weekly</changefreq><priority>0.9</priority></url>
  <url><loc>https://moneyling.org/individuals</loc><changefreq>weekly</changefreq><priority>0.9</priority></url>
  <url><loc>https://moneyling.org/about</loc><changefreq>monthly</changefreq><priority>0.7</priority></url>
  <url><loc>https://moneyling.org/contact</loc><changefreq>monthly</changefreq><priority>0.8</priority></url>
</urlset>
```
Use your real production base URL. You can omit `/payment` if you prefer not to index the cart.

---

### 6. **Image `alt` text (medium impact for SEO and accessibility)**

- **Current:** Several images use **`alt=""`** (decorative or generic), including:
  - HomePage: Educator, Financial Institution, Individual path images
  - ForEducatorsPage: course thumbnails and carousel
  - IndividualsPage: QR code images
- **Impact:** Empty alt is correct for purely decorative images, but **content images** (path cards, course cards) should have descriptive alt so search and screen readers understand the page.
- **Fix:** Give meaningful `alt` to images that convey information.

**Examples:**

- Home “path” cards: e.g. `alt="Educator – financial literacy for schools and community"`, `alt="Financial institution – community outreach and member engagement"`, `alt="Individual – Dreamlife-Sim app on phone"`.
- Course cards: e.g. `alt="NS-8 Earning Income course"` (or course name + “course”).
- QR codes: e.g. `alt="QR code to download Dreamlife-Sim on Google Play"`.

Keep `alt=""` only for purely decorative images (e.g. some icons/backgrounds).

---

### 7. **Heading order on Home (low–medium)**

- **Current:** HomePage uses **`<h2>What is Moneyling?</h2>`** first, then **`<h1>Are you…</h1>`**.
- **Impact:** Best practice is one primary `<h1>` per page and a logical order (h1 → h2 → h3). Having h2 before h1 can confuse assistive tech and some SEO heuristics.
- **Fix:** Either:
  - Make “What is Moneyling?” an **`<h1>`** and “Are you…” an **`<h2>`**, or
  - Swap order so the main question is the first heading: e.g. **`<h1>Are you…</h1>`** at the top, then **`<h2>What is Moneyling?</h2>`** for the intro block.

---

### 8. **Canonical URL (low for single-domain, useful for multi-domain)**

- **Current:** No canonical tags.
- **Fix:** If you ever have the same content on multiple URLs (e.g. `www` vs non-`www`, or different domains), add `<link rel="canonical" href="https://moneyling.org/..." />` per page. For a single canonical domain, optional but good practice once you have dynamic `<head>` (e.g. via react-helmet-async).

---

### 9. **Structured data (optional, medium long-term)**

- **Current:** No JSON-LD (e.g. Organization, WebSite, FAQPage).
- **Impact:** Rich results (e.g. org info, FAQs in search) can improve CTR.
- **Fix:** Add JSON-LD in `<head>` (or inject via React):
  - **Organization** (name, url, logo, contact) on Home or About.
  - **FAQPage** on For Educators (and FI/Individuals if you want FAQ rich results there).

---

### 10. **Performance / Core Web Vitals (indirect SEO)**

- **Current:** Raleway loaded from Google Fonts (preconnect present); no obvious heavy blocking resources.
- **Suggestions:** Keep images optimized (e.g. WebP where possible), lazy-load below-the-fold images if you add more, and avoid large render-blocking scripts. These help Core Web Vitals, which can affect ranking.

---

## Priority Summary

| Priority | Item | Effort | Impact |
|----------|------|--------|--------|
| 1 | Meta description (global + per-page) | Low–Medium | High |
| 2 | Per-page `<title>` | Low–Medium | High |
| 3 | `robots.txt` + sitemap | Low | Medium |
| 4 | Open Graph + Twitter Card | Low–Medium | Medium |
| 5 | Image alt text for content images | Low | Medium (SEO + a11y) |
| 6 | Home heading order (h1 before h2) | Low | Low–Medium |
| 7 | Canonical URLs | Low | Low (unless multi-URL) |
| 8 | JSON-LD (Organization, FAQPage) | Medium | Medium (long-term) |

---

## Quick Wins You Can Do First

1. Add **one global `<meta name="description">`** in `index.html`.
2. Add **`public/robots.txt`** and **`public/sitemap.xml`** with your production base URL.
3. In **HomePage**, make the first heading the **`<h1>`** (e.g. “Are you…”) and the intro “What is Moneyling?” an **`<h2>`**.
4. Add **descriptive `alt`** to the three Home path images and to key course/hero images on For Educators and other pages.

Then implement per-page title + description (and optionally OG/Twitter) via `useEffect` or `react-helmet-async` for the biggest SEO and sharing gains.
