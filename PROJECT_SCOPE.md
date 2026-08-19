# Rent ATV Santa Teresa — Project Scope

## 1. Overview

A static, lead-generation website for an ATV rental business in Santa Teresa, Costa Rica, built with Astro and Tailwind CSS. The business had no prior name, brand, or web presence; the domain **rentatvsantateresa.com** now serves as both the brand name and the primary SEO asset.

The site is built around a single conversion goal: **starting a WhatsApp conversation**. In Costa Rica, WhatsApp is the dominant booking channel for tourist rentals, so every page carries a click-to-WhatsApp CTA with a pre-filled, context-specific message. The contact form is deliberately secondary. Following the reference system, that CTA is the `#222222` pill rather than a WhatsApp-green button — the system permits exactly one primary action per surface, and the WhatsApp glyph inside the button carries the channel recognition.

Every page is pre-rendered static HTML with no client-side framework, which makes the full content available to search crawlers and AI retrieval systems in the initial response — no JavaScript execution required.

## 2. Design direction

**The site implements the Airbnb design system, carrying our own brand.** Structure, tokens, geometry and written voice follow the supplied reference; the name, content and accent hue are ours.

### What was taken from the reference, exactly

| Token | Value | Applied to |
|---|---|---|
| canvas | `#FFFFFF` | Page background |
| surface | `#F7F7F7` | Footer, CTA panel, chips, secondary buttons, media placeholders |
| ink-2 | `#222222` | Headings, body, icons, primary button fill |
| ink | `#000000` | Hover intensification only |
| muted | `#6C6C6C` | Secondary copy, captions, eyebrows |
| hairline | `#DDDDDD` | Dividers, input borders |
| error | `#C13515` | The placeholder-pricing warning only |

- **Radius scale:** 4px secondary buttons, 8px tabs, 12px inputs, 20px media masks, 30px pills.
- **Primary button:** `#222222` pill, 30px radius, white text — one per surface.
- **Secondary button:** `#F7F7F7` fill, 4px radius.
- **Focus:** double-ring `box-shadow: 0 0 0 2px #FFFFFF, 0 0 0 4px #222222`, no `outline` property.
- **Easing:** `cubic-bezier(0.2, 0, 0, 1)` at 0.2s on every transition.
- **Elevation:** `1px rgba(0,0,0,0.02)` outline + soft Y-offset drop. Nothing heavier.
- **Layout:** 24px side padding mobile / 48px desktop, 1344px max content width, 24px gutters.
- **Section rhythm:** 24px mobile / 48px desktop vertical padding, so stacked sections give 96px separation.
- **Voice:** sentence case throughout. No uppercase or title case anywhere. CTAs are action verb + named object ("Book on WhatsApp", "Check availability"), never orphaned verbs.
- **Footer separation** comes from the canvas-to-surface background shift, with no divider lines between columns.
- **Photography** is never overlaid with text or colour washes; hero copy sits beside the image, not on it.

### Three deliberate deviations

1. **Accent hue is ours, not `#FF385C`.** The reference reserves exactly one accent for CTAs, active nav and brand marks. We fill that slot with our clay red `#C2451E` under identical discipline — brand mark and card icons only, never a surface fill. Airbnb's pink is their registered trade dress in the travel-rental category, which is the same category this business operates in, so reusing it on a rental site invites confusion. Say the word and it is a one-line change in `tailwind.config.mjs`.
2. **No webfont.** Airbnb Cereal VF is proprietary. We ship the reference's own documented fallback stack, which is system-native and costs zero network requests — a real speed win for a lead-gen site. If you want closer visual parity, Figtree or Plus Jakarta Sans are free and geometrically similar.
3. **Type scale is an extension.** The reference documents only body type (14px / 400 / 18px). The heading scale is inferred from Airbnb's rendered product and marked as an extension, per the reference's own iteration guide.

### One thing the reference does that we deliberately do not

Airbnb has 8 million photographed listings to carry the emotional weight. This site currently has none. Until real photos land, the placeholder frames are the weakest part of the design — a surface-light system with no photography reads as empty rather than calm. **Photos are not a nice-to-have here; they are the load-bearing element of the system you chose.**

## 3. Pages

| Route | Status | Description |
|---|---|---|
| `/` | Built, placeholder content | Hero, rental options, why-a-quad, route distances, location, FAQ, CTA |
| `/atv-rentals` | Built, placeholder content | Fleet, what's included, what to bring, **guided rides**, **multi-day tiers**, routes |
| `/pricing` | Built, **all figures are `$00`** | Rental rate table, deposits and extras |
| `/faq` | Built, placeholder content | 13 questions in three groups, emits FAQPage schema |
| `/about` | Built, placeholder content | Positioning, four commitments, service area |
| `/contact` | Built, form backend unconfigured | WhatsApp CTA, NAP, hours, form, map placeholder |
| `/404` | Built | Noindexed, links back to key pages |

**Removed this round:** `/guided-tours` and `/multi-day-rentals` were deleted as requested. Because the business does still offer both, their content was folded into sections on `/atv-rentals` rather than discarded, and every internal link, nav entry, sitemap URL and Service schema block pointing at them was removed. Verified: zero dead links across the build.

**SEO cost of that removal, so it is a conscious choice:** you no longer have a page targeting "guided ATV tours Santa Teresa" or "weekly ATV rental Santa Teresa" as primary keywords. Those are separate search intents from "ATV rental Santa Teresa", and a section on a shared page ranks far weaker than a dedicated page. If tours are a meaningful share of revenue, reinstating a tours page later is the single cheapest ranking win available.

## 4. Components

| Component | File | Purpose |
|---|---|---|
| Header | `src/components/Header.astro` | Sticky nav, accessible mobile menu, WhatsApp CTA |
| Footer | `src/components/Footer.astro` | Crawlable NAP text, hours, footer nav |
| Hero | `src/components/Hero.astro` | Homepage hero with route strip |
| PageHero | `src/components/PageHero.astro` | Compact interior-page banner |
| Breadcrumb | `src/components/Breadcrumb.astro` | Visible breadcrumbs + matching BreadcrumbList JSON-LD |
| RouteStrip | `src/components/RouteStrip.astro` | Scrollable surface chips: real distances and ride times |
| SectionHeading | `src/components/SectionHeading.astro` | Muted eyebrow + heading + subtitle |
| Card | `src/components/Card.astro` | Feature card with optional inline SVG icon |
| InfoCard | `src/components/InfoCard.astro` | Centred stat/highlight card |
| CtaBand | `src/components/CtaBand.astro` | Surface-fill panel, 20px radius, WhatsApp primary button |
| Faq | `src/components/Faq.astro` | Native `<details>` accordion, no JS |
| WhatsAppIcon | `src/components/WhatsAppIcon.astro` | Inline SVG glyph |

**Layout:** `src/layouts/BaseLayout.astro` — full SEO head, OG/Twitter tags, canonical, JSON-LD injection, skip link.

**Data:** `src/data/site.ts` (single source of truth for NAP) and `src/data/schema.ts` (schema builders).

## 5. SEO checklist — verified against build output

- [x] Unique `<title>` and meta description on all 7 pages
- [x] Canonical URL on every page, trailing-slash convention enforced and consistent with the sitemap
- [x] Open Graph tags (title, description, image, dimensions, site_name, locale, type, url)
- [x] Twitter Card tags (summary_large_image)
- [x] `apple-touch-icon.png`, `favicon.svg`, `theme-color`
- [x] XML sitemap generated, 404 filtered out — 6 indexable URLs
- [x] `robots.txt` with sitemap reference
- [x] `AutoRental` JSON-LD with full NAP, geo, hours, areaServed, priceRange, hasMap, sameAs
- [x] `WebSite` JSON-LD on homepage
- [x] `BreadcrumbList` JSON-LD on all 5 interior pages, matching visible breadcrumbs
- [x] `FAQPage` JSON-LD on homepage and `/faq`
- [x] `Service` JSON-LD on `/atv-rentals`
- [x] All JSON-LD blocks confirmed to parse as valid JSON
- [x] Exactly one `<h1>` per page (verified across all 7 pages)
- [x] Semantic landmarks: `header`, `nav`, `main`, `footer`, `section`, `article`, `address`
- [x] Skip-to-content link as first focusable element
- [x] `aria-label` on all four navs, `aria-current="page"`, `aria-expanded` on the menu toggle, `aria-hidden` on decorative SVGs
- [x] NAP identical in footer, contact page, and schema — enforced structurally via `site.ts`
- [x] Custom 404, noindexed
- [x] All form inputs have associated `<label>` elements
- [x] Internal linking between all related pages
- [x] **Zero dead links** — every `href` in the build resolves to a real page (verified after page removal)
- [x] Design tokens verified in compiled CSS: ink, muted, hairline, surface, error, accent, canvas all present; no Tailwind default grays leak through
- [x] No `text-transform: uppercase` anywhere; no external font requests
- [x] `geo.region` / `geo.placename` meta for local relevance
- [ ] Real image `alt` text — pending actual photos
- [ ] Hreflang / Spanish version — see recommendations

## 6. Content needed from the owner

### Blocking launch — the site cannot convert without these

1. **WhatsApp number.** `src/data/site.ts` currently holds `50600000000`, which is not a real number. **Every CTA on the site opens a chat to nowhere.** This is the single highest-priority item: the entire site is built around WhatsApp as the booking channel, so until this is real, the site generates zero leads no matter how much traffic it gets.
2. **Phone number** — displayed as `+506 0000-0000` in the footer, contact page and schema.
3. **Email address** — `hola@rentatvsantateresa.com` is invented.
4. **Physical address** — Santa Teresa has no formal street numbering. Use whatever wording the Google Business Profile uses, verbatim, so the NAP matches.

All four live in one file (`src/data/site.ts`) and propagate everywhere automatically.

### Important, not blocking

5. Real opening hours (currently Mon–Sat 7–6, Sun 8–5).
6. GPS coordinates from the Google Business Profile pin.
7. Confirmation of the distances and ride times in `RouteStrip.astro`.
8. Deposit amount and insurance terms — **have these reviewed by someone who knows Costa Rican rental law before publishing.**
9. The owner's real story for `/about`.
10. Social profile URLs for `sameAs` in the schema.

### Resolved

- ~~Pricing~~ — real rates in place: $65 under 3 days, $60 for 3–7, $55 over 7, $50 for two weeks or more.
- ~~Fleet details~~ — corrected to Can-Am Outlander 450 4x4, single-model fleet, automatic, locking cargo box.
- ~~Share image~~ — `og-default.jpg` generated from a real fleet photo.

## 7. Photo assets

### Supplied and in use

| File | Used on |
|---|---|
| `quad-angle` | Homepage hero, fleet card |
| `quad-side` | Fleet card, homepage gallery |
| `quad-front` | Fleet card, homepage gallery |
| `fleet-line` | Homepage gallery, About |
| `fleet-wide` | Full-bleed dark band |
| `og-default.jpg` | Social share card (generated from `quad-angle`) |

All are responsive WebP at two widths, served through `Photo.astro` with explicit dimensions.

### Still worth shooting

- **A clean hero shot.** The current hero photo has a dumpster, power lines and construction in the background. One quad against a plain wall or the beach would lift the top of the page more than any code change. Shot against a plain background, it can be cut out to float with no frame.
- Riders actually on the coast road or beach — people in the frame convert better than parked machines.
- The pickup location, so arriving customers recognise it.

## 8. Integrations to configure

1. **Contact form backend** — `action="#"` on `/contact`. Formspree or Netlify Forms; Netlify Forms is free and needs only a `netlify` attribute plus a honeypot field.
2. **Google Map embed** — two placeholders (homepage, contact page)
3. **Google Business Profile** — the single highest-impact task for local SEO. Create it, verify it, match the NAP to `site.ts` exactly.
4. **Analytics** — Plausible or GA4
5. **Google Search Console** — verify the domain and submit `sitemap-index.xml`

## 9. Deployment

**Live:** https://rentatv-santa-teresa.throbbing-hill-7e73.workers.dev
**Repo:** https://github.com/eddyrank/rentatv-santa-teresa

GitHub is the source of truth. Every push to `main` triggers `.github/workflows/deploy.yml`, which installs with `npm ci`, builds, verifies `dist/index.html` exists, and deploys to Cloudflare Workers via `wrangler`. Typical run: about 30 seconds.

Cloudflare serves the site as Static Assets, configured in `wrangler.jsonc`:
- `html_handling: drop-trailing-slash` — matches Astro's `trailingSlash: 'never'` so URLs, canonical tags and the sitemap all agree. Without this every interior page 307-redirects and contradicts its own canonical.
- `not_found_handling: 404-page` — serves the custom noindexed 404.

**Secrets** live in GitHub repo settings, never in the codebase: `CLOUDFLARE_API_TOKEN` and `CLOUDFLARE_ACCOUNT_ID`.

**Rollback:** revert the commit and push, or redeploy a previous version from the Cloudflare dashboard.

**Note:** if the Cloudflare dashboard's own Git integration is still connected, disconnect it. Its build configuration is broken and will keep firing failed builds alongside the working Actions deploy.

## 10. Future: CMS for non-technical editing

To let the owner update rates and tours without touching code:

1. Move rates, tours and FAQs into `src/content/` Markdown or JSON collections
2. Add Decap CMS at `public/admin/index.html` with a `config.yml`
3. Enable Netlify Identity with Git Gateway
4. Owner workflow: log in at `/admin` → edit → publish → site rebuilds automatically

## 11. Recommended next steps for lead generation

Ranked by impact:

1. **Google Business Profile** — for "atv rental near me" searches, the map pack outranks organic results. This matters more than anything on the site itself.
2. **Real prices.** Rental shoppers compare on price; a page of `$00` will lose bookings to any competitor showing real numbers.
3. **A Spanish version** at `/es/` with `hreflang` tags. Some tourists and most domestic Costa Rican visitors search in Spanish. This is the largest untapped keyword pool.
4. **Hotel partnerships.** Front-desk referrals in Santa Teresa convert extremely well and also produce local backlinks.
5. **Reviews.** Ask every renter for a Google review. Review volume and recency are heavily weighted in local rankings.

## 12. File structure

```
rentatv/
├── public/
│   ├── apple-touch-icon.png      # generated placeholder
│   ├── favicon.svg
│   ├── og-default.jpg            # generated placeholder
│   └── robots.txt
├── src/
│   ├── components/
│   │   ├── Breadcrumb.astro
│   │   ├── Card.astro
│   │   ├── CtaBand.astro
│   │   ├── Faq.astro
│   │   ├── Footer.astro
│   │   ├── Header.astro
│   │   ├── Hero.astro
│   │   ├── InfoCard.astro
│   │   ├── PageHero.astro
│   │   ├── RouteStrip.astro
│   │   ├── SectionHeading.astro
│   │   └── WhatsAppIcon.astro
│   ├── data/
│   │   ├── schema.ts
│   │   └── site.ts
│   ├── layouts/
│   │   └── BaseLayout.astro
│   ├── pages/
│   │   ├── 404.astro
│   │   ├── about.astro
│   │   ├── atv-rentals.astro
│   │   ├── contact.astro
│   │   ├── faq.astro
│   │   ├── index.astro
│   │   └── pricing.astro
│   └── styles/
│       └── global.css
├── astro.config.mjs
├── package.json
├── tailwind.config.mjs
├── tsconfig.json
├── PROJECT_SCOPE.md
└── .gitignore
```

## 13. Running locally

```bash
npm install
npm run dev      # http://localhost:4321
npm run build    # outputs to dist/
npm run preview
```
