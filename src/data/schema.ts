import { site, atvFleet, atvFromRate, atvDailyRate, weeklyDiscount } from './site';

/**
 * AutoRental is a schema.org subtype of LocalBusiness and is the closest
 * standard match for a vehicle rental operation. additionalType points at the
 * Wikidata entity for ATV so machine readers get the vehicle class too.
 */
export const localBusinessSchema = {
  '@context': 'https://schema.org',
  '@type': 'AutoRental',
  '@id': `${site.url}/#business`,
  additionalType: 'https://www.wikidata.org/wiki/Q188841',
  name: site.name,
  description: `Self-drive ATV rentals in Santa Teresa, Costa Rica, from $${atvFromRate} per day, with ${weeklyDiscount.percent}% off rentals over 7 days. Kymco, Honda and Yamaha quads with locking cargo boxes, plus side-by-side (UTV) rentals and guided ATV tours. Helmets included. Free hotel delivery in Santa Teresa, Mal País, Playa Carmen and Playa Hermosa, with an extra fee to Cóbano or Cabuya.`,
  url: site.url,
  telephone: site.phoneDisplay,
  // Google uses this in rich results, so it must resolve. Points at the real
  // fleet photo rather than a path that does not exist.
  image: [
    `${site.url}/photos/fleet-honda-side-1200.webp`,
    `${site.url}/photos/fleet-kymco-front-1200.webp`,
    `${site.url}/photos/fleet-yamaha-front-1200.webp`,
    `${site.url}/photos/utv-4-seat-1200.webp`,
  ],
  logo: `${site.url}/logo.png`,
  priceRange: '$$',
  currenciesAccepted: 'CRC, USD',
  paymentAccepted: 'Cash, Credit Card',
  // No streetAddress, geo or hasMap — this is a delivery-only business with no
  // fixed storefront or GPS pin. `areaServed` below is what actually describes
  // where it operates.
  address: {
    '@type': 'PostalAddress',
    addressLocality: site.address.locality,
    addressRegion: site.address.region,
    addressCountry: site.address.country,
  },
  openingHoursSpecification: site.hours.map((block) => ({
    '@type': 'OpeningHoursSpecification',
    dayOfWeek: block.days,
    opens: block.opens,
    closes: block.closes,
  })),
  areaServed: site.areaServed.map((area) => ({
    '@type': 'Place',
    name: area,
  })),
  sameAs: site.socialProfiles,
};

export const websiteSchema = {
  '@context': 'https://schema.org',
  '@type': 'WebSite',
  name: site.name,
  url: site.url,
  inLanguage: 'en',
  publisher: { '@id': `${site.url}/#business` },
};

/**
 * One flat Offer per machine (no itemOffered, see note below), each carrying the tiered daily rate as
 * UnitPriceSpecifications (unitCode DAY) with the rental-length band each tier
 * applies to. Rates come from site.ts, so they cannot drift from the page.
 */
export function fleetOffersSchema(url: string) {
  return {
    '@context': 'https://schema.org',
    '@type': 'Service',
    name: 'ATV rental in Santa Teresa, Costa Rica',
    serviceType: 'ATV rental',
    url,
    provider: { '@id': `${site.url}/#business` },
    areaServed: site.areaServed.map((area) => ({ '@type': 'Place', name: area })),
    hasOfferCatalog: {
      '@type': 'OfferCatalog',
      name: 'ATV rental rates',
      itemListElement: atvFleet.map((model) => ({
        '@type': 'Offer',
        name: `${model.name} ATV rental`,
        url,
        priceCurrency: 'USD',
        availability: 'https://schema.org/InStock',
        description: `${model.transmission} ${model.name} ATV, rented for 8 hours ($${model.rate8h}) or by the 24-hour day.`,
        image: `${site.url}/photos/${model.photo}-1200.webp`,
        // No itemOffered: Google read the nested per-model entity as a Product
        // missing offers/review/aggregateRating (Search Console, Oct 2026).
        // Keeping the offer flat leaves Google nothing to classify as a product.
        priceSpecification: [
          { label: '1 to 7 days', minDays: 1, maxDays: weeklyDiscount.minDays - 1 },
          { label: 'Over 7 days', minDays: weeklyDiscount.minDays, maxDays: undefined },
        ].map((tier) => ({
          '@type': 'UnitPriceSpecification',
          price: atvDailyRate(model.rate24h, tier.minDays),
          priceCurrency: 'USD',
          unitCode: 'DAY',
          name: tier.label,
          eligibleQuantity: {
            '@type': 'QuantitativeValue',
            unitCode: 'DAY',
            minValue: tier.minDays,
            ...(tier.maxDays !== undefined ? { maxValue: tier.maxDays } : {}),
          },
        })),
      })),
    },
  };
}

export function faqSchema(items: { q: string; a: string }[]) {
  return {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: items.map((item) => ({
      '@type': 'Question',
      name: item.q,
      acceptedAnswer: { '@type': 'Answer', text: item.a },
    })),
  };
}

export function serviceSchema(opts: {
  name: string;
  description: string;
  url: string;
  serviceType?: string;
  offers?: { price: number; description: string }[];
}) {
  return {
    '@context': 'https://schema.org',
    '@type': 'Service',
    name: opts.name,
    description: opts.description,
    url: opts.url,
    serviceType: opts.serviceType ?? 'ATV rental',
    provider: { '@id': `${site.url}/#business` },
    areaServed: site.areaServed.map((area) => ({ '@type': 'Place', name: area })),
    ...(opts.offers?.length
      ? {
          offers: opts.offers.map((offer) => ({
            '@type': 'Offer',
            price: offer.price,
            priceCurrency: 'USD',
            description: offer.description,
          })),
        }
      : {}),
  };
}
