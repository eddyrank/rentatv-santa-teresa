import { defineConfig } from 'astro/config';
import tailwind from '@astrojs/tailwind';
import sitemap from '@astrojs/sitemap';
import { writeFileSync } from 'node:fs';

// Cloudflare's drop-trailing-slash handling (wrangler.jsonc) answers
// /page/ with a 307, which search engines treat as temporary. _redirects
// rules run before that, so emit an explicit 301 for every built page.
// Generated from the build output so new pages and posts are covered.
// Retired URLs are listed below and 301 to the page that absorbed them.
const retiredPages = {
  // Merged into the home page so the two stopped competing for the same query.
  'atv-rentals': '/',
};

const trailingSlashRedirects = {
  name: 'trailing-slash-301s',
  hooks: {
    'astro:build:done': ({ dir, pages }) => {
      const rules = pages
        .map(({ pathname }) => pathname.replace(/\/$/, ''))
        .filter((path) => path && path !== '404')
        .sort()
        .map((path) => `/${path}/ /${path} 301`);
      const retired = Object.entries(retiredPages).flatMap(([from, to]) => [
        `/${from} ${to} 301`,
        `/${from}/ ${to} 301`,
      ]);
      writeFileSync(new URL('_redirects', dir), [...retired, ...rules].join('\n') + '\n');
    },
  },
};

export default defineConfig({
  site: 'https://rentatvsantateresa.com',
  integrations: [
    tailwind(),
    sitemap({
      filter: (page) => !page.includes('/thank-you') && !page.includes('/404'),
    }),
    trailingSlashRedirects,
  ],
  output: 'static',
  trailingSlash: 'never',
});
