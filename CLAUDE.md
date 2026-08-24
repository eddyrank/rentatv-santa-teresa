# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Commands

```bash
npm install       # install dependencies
npm run dev        # dev server at http://localhost:4321
npm run build       # build to dist/
npm run preview      # serve the production build locally
```

There is no test suite and no lint script configured. The closest thing to a correctness check is `npm run build` — Astro fails the build on broken content-collection frontmatter, invalid component props, or unresolved imports, so run it after any content or component change.

Deployment is push-triggered, not run locally: pushing to `main` fires `.github/workflows/deploy.yml`, which runs `npm ci && npm run build`, verifies `dist/index.html` exists, and deploys `dist/` to Cloudflare Workers via `wrangler`. `deploy-to-github.sh` is a legacy helper for committing and pushing everything in one shot; prefer normal `git` commands for anything more surgical.

## Architecture

**Astro static site, zero client JS.** Every route in `src/pages/` pre-renders to static HTML at build time (`output: 'static'` in `astro.config.mjs`). There is no server runtime and no hydration — the Cloudflare deploy target (`wrangler.jsonc`) serves `dist/` as static assets.

**Single source of truth for business data.** `src/data/site.ts` holds every NAP (name/address/phone) fact, WhatsApp number, hours, and service area. Header, footer, contact page, and all JSON-LD schema read from this one file so the values can never drift apart across the site — change a phone number or rate once, here, not per-page. `whatsappLink()` in the same file builds pre-filled `wa.me` URLs; every CTA on the site goes through it (or a hardcoded variant of the same pattern) rather than linking WhatsApp directly.

**Schema builders, not inline JSON-LD.** `src/data/schema.ts` exports `localBusinessSchema`, `websiteSchema`, and the `faqSchema()` / `serviceSchema()` factories, all keyed off `site.ts`. `BaseLayout.astro` injects whatever schema object a page passes in via its `schema` prop. When adding a new page type that needs structured data, add a builder here rather than hand-writing JSON-LD in the page.

**Layout nesting:** `BaseLayout.astro` (SEO head, OG/Twitter tags, canonical URL, skip link, schema injection) wraps every page directly, except blog posts, which go through `BlogLayout.astro` (article header, tags, WhatsApp CTA block, breadcrumb) which itself wraps `BaseLayout`.

**Blog is an Astro content collection**, not hand-built pages. Posts are markdown files in `src/content/blog/`, validated against the zod schema in `src/content/config.ts` (`title`, `description`, `pubDate`, `tags`, `image`/`imageAlt`, `featured`, etc.). `src/pages/blog/index.astro` lists all posts sorted by `pubDate` descending; `src/pages/blog/[slug].astro` is the single dynamic route that renders every post via `getStaticPaths()` — adding a post means adding a markdown file, not a new page file. There is a project writing skill (`rentatv-blog-writer`) covering voice, structure, and required facts for blog content — it applies whenever drafting or editing anything in `src/content/blog/`.

**Design tokens are Airbnb-system-derived but hand-rolled**, not a component library. Colors, radii, easing, and spacing are defined directly in `tailwind.config.mjs` and `src/styles/global.css` (see `PROJECT_SCOPE.md` §2 for the full token table and the reasoning behind the three deliberate deviations from the reference system — own accent hue, no webfont, extended type scale). There is exactly one primary CTA style (`#222222` pill) per surface; don't introduce a second competing button style on a page.

**Photo delivery is a fixed pattern:** `src/components/Photo.astro` renders responsive WebP images at two widths with explicit dimensions. New imagery should go through this component rather than a raw `<img>` tag, to stay consistent with the site's zero-CLS, no-lazy-load-shift approach.

`PROJECT_SCOPE.md` is the fuller design/SEO/content spec this build was implemented against (pending owner content, SEO checklist, deployment rationale). `DEPLOY.md` covers the GitHub → Cloudflare Pages/Workers deployment path in more detail than needed day-to-day.
