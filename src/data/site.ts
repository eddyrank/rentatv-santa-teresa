/**
 * Single source of truth for business data.
 *
 * NAP (Name, Address, Phone) consistency is a direct local-SEO ranking factor.
 * Every place the business details appear — footer, contact page, JSON-LD
 * schema — reads from this file so the three can never drift apart.
 *
 * PLACEHOLDER VALUES ARE MARKED. Replace them before launch and make sure they
 * match the Google Business Profile listing character for character.
 */

export const site = {
  name: 'Rent ATV Santa Teresa',
  domain: 'rentatvsantateresa.com',
  url: 'https://rentatvsantateresa.com',
  tagline: 'ATV rentals and guided rides in Santa Teresa, Costa Rica',

  // Same line handles calls and WhatsApp.
  phoneDisplay: '+506 6152 7014',
  phoneHref: '+50661527014',

  // Digits only, country code first, no + or spaces — wa.me link format.
  whatsappNumber: '50661527014',

  // PLACEHOLDER
  email: 'hola@rentatvsantateresa.com',

  address: {
    // PLACEHOLDER — Santa Teresa has no formal street numbering; most businesses
    // use a landmark-relative address. Confirm the exact wording used on the
    // Google Business Profile and mirror it here.
    street: 'Calle Principal, 200m south of Playa Carmen intersection',
    locality: 'Santa Teresa',
    region: 'Puntarenas',
    postalCode: '60111',
    country: 'CR',
    countryName: 'Costa Rica',
  },

  // PLACEHOLDER — pull the true coordinates from the Google Business Profile pin.
  geo: {
    latitude: 9.6449,
    longitude: -85.1669,
  },

  // PLACEHOLDER — replace with the real Google Maps share link.
  mapUrl: 'https://maps.google.com/?q=Santa+Teresa+Costa+Rica',

  // PLACEHOLDER — add real profile URLs. An empty array is better than a wrong one.
  socialProfiles: [] as string[],

  hours: [
    { days: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'], opens: '07:00', closes: '18:00', label: 'Monday – Saturday', time: '7:00am – 6:00pm' },
    { days: ['Sunday'], opens: '08:00', closes: '17:00', label: 'Sunday', time: '8:00am – 5:00pm' },
  ],

  areaServed: [
    'Santa Teresa',
    'Mal País',
    'Playa Carmen',
    'Playa Hermosa',
    'Montezuma',
    'Cóbano',
  ],
};

/** Pre-fills the WhatsApp message so an inquiry arrives with context attached. */
export function whatsappLink(message = "Hi! I'd like to rent an ATV in Santa Teresa.") {
  return `https://wa.me/${site.whatsappNumber}?text=${encodeURIComponent(message)}`;
}

/* Sentence case, matching the reference's written voice. */
export const nav = [
  { label: 'ATV rentals', href: '/atv-rentals' },
  { label: 'Pricing', href: '/pricing' },
  { label: 'FAQ', href: '/faq' },
  { label: 'About', href: '/about' },
  { label: 'Contact', href: '/contact' },
];
