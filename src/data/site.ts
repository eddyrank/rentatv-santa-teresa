/**
 * Single source of truth for business data.
 *
 * NAP (Name, Address, Phone) consistency is a direct local-SEO ranking factor.
 * Every place the business details appear — footer, contact page, JSON-LD
 * schema — reads from this file so the three can never drift apart.
 *
 * This is a delivery-only, service-area business: no storefront, no email
 * inbox, no fixed GPS pin. `address` is deliberately just locality/region, and
 * `areaServed` is the real source of truth for where quads actually go.
 * Remaining PLACEHOLDER values are still marked — confirm before launch.
 */

export const site = {
  name: 'Rent ATV Santa Teresa',
  domain: 'rentatvsantateresa.com',
  url: 'https://rentatvsantateresa.com',
  tagline: 'ATV rentals in Santa Teresa, Costa Rica',

  // Same line handles calls and WhatsApp.
  phoneDisplay: '+506 7238 8955',
  phoneHref: '+50672388955',

  // Digits only, country code first, no + or spaces — wa.me link format.
  whatsappNumber: '50672388955',

  // No email inbox to monitor — WhatsApp is the only contact channel, by design.

  // Confirmed: this is a delivery-only, service-area business. There is no
  // storefront customers visit and no fixed GPS pin — quads go to wherever the
  // customer is staying across the whole area in `areaServed` below. Keep the
  // address to general locality/region only; never invent a street or geo pin.
  address: {
    locality: 'Santa Teresa',
    region: 'Puntarenas',
    country: 'CR',
    countryName: 'Costa Rica',
  },

  // Confirmed: no social profiles yet. An empty array is better than a wrong one.
  socialProfiles: [] as string[],

  // Google Tag Manager container. Not tied to the domain — works the same on
  // localhost, the workers.dev preview URL, and the live domain once it's live.
  gtmId: 'GTM-N8MH829D',

  hours: [
    { days: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'], opens: '06:00', closes: '23:00', label: 'Every day', time: '6:00am – 11:00pm' },
  ],

  // Confirmed with the owner — the actual delivery area, not a fixed address.
  areaServed: [
    'Santa Teresa',
    'Mal País',
    'Playa Carmen',
    'Playa Hermosa',
    'Cóbano',
    'Cabuya',
  ],
};

/**
 * Daily rates, per quad (not per person). Same for every machine in the fleet;
 * only the security deposit varies by quad. Pricing page, home page and the
 * Offer schema all read these, so change a rate here and nowhere else.
 */
export const rates = [
  { label: 'Under 3 days', minDays: 1, maxDays: 2, price: 65, detail: 'Full-day rentals' },
  { label: '3 to 7 days', minDays: 3, maxDays: 7, price: 60, detail: 'The most popular range' },
  { label: 'Over 7 days', minDays: 8, maxDays: 13, price: 55, detail: 'Weekly and longer' },
  { label: 'Two weeks+', minDays: 14, maxDays: undefined, price: 50, detail: 'Our best rate' },
];

/** Daily rate for a rental of `days` days. */
export function dailyRate(days: number) {
  return rates.find((r) => days >= r.minDays && (r.maxDays === undefined || days <= r.maxDays))!.price;
}

export const fleetModels = [
  { name: 'Can-Am Outlander 4x4', photo: 'fleet-canam-side' },
  { name: 'Honda ATV', photo: 'fleet-honda-side' },
  { name: 'Kymco 4x4 ATV', photo: 'fleet-kymco-front' },
];

/** Pre-fills the WhatsApp message so an inquiry arrives with context attached. */
export function whatsappLink(message = "Hi! I'd like to rent an ATV in Santa Teresa.") {
  return `https://wa.me/${site.whatsappNumber}?text=${encodeURIComponent(message)}`;
}

/* Sentence case, matching the reference's written voice. */
export const nav = [
  {
    label: 'ATV rentals',
    children: [
      { label: 'Santa Teresa', href: '/' },
      { label: 'Mal País', href: '/atv-rentals-mal-pais' },
    ],
  },
  { label: 'Pricing', href: '/pricing' },
  { label: 'Blog', href: '/blog' },
  { label: 'FAQ', href: '/faq' },
  { label: 'Contact', href: '/contact' },
];
