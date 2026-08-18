# Rent ATV Santa Teresa

ATV rental website for Santa Teresa, Costa Rica. Built with Astro, Tailwind CSS, and designed using the Airbnb design system.

## Features

- **WhatsApp-first booking**: Green CTAs for instant messaging
- **Real pricing**: $65/day (under 3 days), $60/day (3-7 days), $55/day (7+ days), $50/day (14+ days)
- **Fleet specs**: Fully automatic quads with 4x4 storage boxes
- **Responsive design**: Mobile-first, works on all devices
- **SEO-ready**: JSON-LD schemas, sitemaps, breadcrumbs
- **Fast**: Static site, zero runtime overhead

## Tech Stack

- **Astro** - Static site generator
- **Tailwind CSS** - Utility-first styling
- **Astro Sitemap** - Automatic XML sitemaps

## Getting Started

### Local Development

```bash
# Install dependencies
npm install

# Start dev server (http://localhost:4321)
npm run dev

# Build for production
npm run build

# Preview production build
npm run preview
```

### Deployment

This site is deployed to **Cloudflare Pages** and auto-builds on every push to the `main` branch.

```bash
# Deploy changes to GitHub (and auto-deploy to Cloudflare Pages)
bash deploy-to-github.sh
```

## Pages

- `/` - Homepage with hero ATV, pricing overview, routes
- `/atv-rentals` - Rental options, fleet details, what's included
- `/pricing` - Detailed rate table
- `/faq` - Frequently asked questions
- `/about` - About the business
- `/contact` - Contact form and hours
- `/404` - Custom 404 page

## Configuration

### Update Business Info

Edit `src/data/site.ts`:
- Phone number and WhatsApp
- Address and hours
- Service area

### Update Pricing

Edit `src/pages/pricing.astro` and `src/pages/atv-rentals.astro`

### Update Fleet

Edit `src/pages/atv-rentals.astro` (quad specs and descriptions)

## Design System

Implements the **Airbnb design system** with a custom brand accent (clay red `#C2451E`) and WhatsApp green CTAs (`#25D366`).

### Colors
- **Canvas**: `#FFFFFF` (backgrounds)
- **Surface**: `#F7F7F7` (secondary fills)
- **Ink**: `#222222` (text, primary buttons)
- **Muted**: `#6C6C6C` (secondary text)
- **CTA**: `#25D366` (WhatsApp green)
- **Contrast**: `#F5E6D3` (warm sand sections)

## Adding Photos

Replace placeholders in:
- `/public/hero-atv.png` - Hero section
- `/src/pages/index.astro` - Homepage gallery
- `/src/pages/atv-rentals.astro` - Fleet photos
- `/src/pages/about.astro` - Team photo

## Support

For changes, updates, or troubleshooting, push changes via the deploy script and Cloudflare Pages will auto-deploy within minutes.

---

**Site**: https://rentatv-santa-teresa.pages.dev  
**GitHub**: https://github.com/eddyrank/rentatv-santa-teresa  
**Cloudflare Pages**: https://pages.cloudflare.com
