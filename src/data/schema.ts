import { site, rates, fleetModels } from './site';

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
  description: `Self-drive ATV rentals in Santa Teresa, Costa Rica, from $50 per day. Fully automatic 4x4 quads with locking cargo boxes. Helmets included. Free hotel delivery in Santa Teresa, Mal País, Playa Carmen and Playa Hermosa, with an extra fee to Cóbano or Cabuya.`,
  url: site.url,
  telephone: site.phoneDisplay,
  // Google uses this in rich results, so it must resolve. Points at the real
  // fleet photo rather than a path that does not exist.
  image: [
    `${site.url}/photos/fleet-canam-side-1200.webp`,
    `${site.url}/photos/fleet-honda-side-1200.webp`,
    `${site.url}/photos/fleet-kymco-front-1200.webp`,
  ],
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
 * One Offer per machine, each carrying the tiered daily rate as
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
      itemListElement: fleetModels.map((model) => ({
        '@type': 'Offer',
        name: `${model.name} rental`,
        url,
        priceCurrency: 'USD',
        availability: 'https://schema.org/InStock',
        itemOffered: {
          '@type': 'Product',
          name: model.name,
          category: 'Fully automatic ATV',
          image: `${site.url}/photos/${model.photo}-1200.webp`,
        },
        priceSpecification: rates.map((tier) => ({
          '@type': 'UnitPriceSpecification',
          price: tier.price,
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
  offers?: { price: number; description: string }[];
}) {
  return {
    '@context': 'https://schema.org',
    '@type': 'Service',
    name: opts.name,
    description: opts.description,
    url: opts.url,
    serviceType: 'ATV rental',
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
