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
  // GA4 measurement ID loaded by that container's Google tag. The booking
  // widget sends its lead event straight to it (see BookingWidget.astro).
  ga4Id: 'G-CRKZRD21G7',

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
 * ATV fleet and rates, per quad (not per person), from the operator's 2026
 * price sheet. Rates differ by machine: 8-hour and 24-hour. Rentals longer
 * than 7 days get `weeklyDiscount` off every 24-hour day. Home page, pricing
 * page, booking widget and the Offer schema all read these, so change a rate
 * here and nowhere else. Never name the operator on the site.
 */
export const weeklyDiscount = { minDays: 8, percent: 10 };

export const atvFleet = [
  {
    id: 'kymco',
    name: 'Kymco 300cc',
    engine: '300cc',
    transmission: 'Fully automatic',
    rate8h: 60,
    rate24h: 70,
    bestFor: 'First-time riders and easy days on the coast road',
    photo: 'fleet-kymco-front',
    alt: 'Red Kymco 300cc ATV with a rear cargo box, available for rent in Santa Teresa',
  },
  {
    id: 'honda',
    name: 'Honda 420cc',
    engine: '420cc',
    transmission: 'Semi-automatic',
    rate8h: 70,
    rate24h: 80,
    bestFor: 'Riders who want more power and are happy to shift with their foot',
    photo: 'fleet-honda-side',
    alt: 'Red Honda 420cc ATV with front and rear racks, available for rent in Santa Teresa',
  },
  {
    id: 'yamaha',
    name: 'Yamaha 450cc',
    engine: '450cc',
    transmission: 'Fully automatic',
    rate8h: 80,
    rate24h: 90,
    bestFor: 'Hill roads, Manzanillo and green-season mud',
    photo: 'fleet-yamaha-front',
    alt: 'Green Yamaha 450cc ATV with a rear cargo box, parked on the sand in Santa Teresa',
  },
];

/** Cheapest 24-hour ATV rate: the "from $X/day" figure. */
export const atvFromRate = Math.min(...atvFleet.map((q) => q.rate24h));

/** Per-day rate for a quad whose 24h rate is `rate24h`, over a rental of `days` days. */
export function atvDailyRate(rate24h: number, days: number) {
  return days >= weeklyDiscount.minDays ? Math.round(rate24h * (1 - weeklyDiscount.percent / 100)) : rate24h;
}

/** Side-by-sides (UTVs), from the same price sheet. */
export const utvFleet = [
  {
    id: 'utv4', name: '4-seat side-by-side', model: 'Yamaha', engine: '1000cc', seats: 4, rate8h: 200, rate24h: 250,
    photo: 'utv-4-seat', alt: 'Green Yamaha 1000cc 4-seat side-by-side (UTV) for rent in Santa Teresa',
  },
  {
    id: 'utv5', name: '5-seat side-by-side', model: 'Honda Pioneer', engine: '1000cc', seats: 5, rate8h: 180, rate24h: 230,
    photo: 'utv-5-seat', alt: 'Dark green Honda Pioneer 1000cc 5-seat side-by-side (UTV) for rent in Santa Teresa',
  },
];

/** Guided ATV tours. Price is per ATV, 1 or 2 riders. */
export const atvTours = [
  {
    id: 'montezuma-half-day',
    name: 'Montezuma waterfall ATV tour',
    length: 'Half day, 4 to 5 hours',
    price: 180,
    stops: [
      'Leave from Santa Teresa',
      'Stop at Playa Cuevas',
      'Ride through the jungle',
      'Visit Cabuya Island, if the tide is low',
      'Arrive at the Montezuma waterfalls',
      'Free time to swim and relax',
      'Short visit to Montezuma village',
      'Ride back to Santa Teresa',
    ],
    includes: ['A local guide', 'Fruit and a drink'],
  },
  {
    id: 'waterfalls-full-day',
    name: 'Full-day waterfalls ATV tour',
    length: 'Full day, 8 hours',
    price: 280,
    stops: ['Montezuma waterfall', 'Cóbano waterfall', 'Tangomar waterfall'],
    includes: ['A local guide'],
  },
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
      { label: 'UTV / side-by-side', href: '/utv-rentals-santa-teresa' },
    ],
  },
  { label: 'Tours', href: '/atv-tours-santa-teresa' },
  { label: 'Pricing', href: '/pricing' },
  { label: 'Blog', href: '/blog' },
  { label: 'FAQ', href: '/faq' },
  { label: 'Contact', href: '/contact' },
];
