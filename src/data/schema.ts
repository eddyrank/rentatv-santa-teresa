import { site } from './site';

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
  description: `Self-drive ATV rentals, guided ATV tours and multi-day rates in Santa Teresa, Costa Rica. Free delivery to hotels in Santa Teresa and Mal País.`,
  url: site.url,
  telephone: site.phoneDisplay,
  email: site.email,
  // PLACEHOLDER — replace with a real photo URL once assets are supplied.
  image: `${site.url}/images/atv-santa-teresa.jpg`,
  priceRange: '$$',
  currenciesAccepted: 'CRC, USD',
  paymentAccepted: 'Cash, Credit Card',
  address: {
    '@type': 'PostalAddress',
    streetAddress: site.address.street,
    addressLocality: site.address.locality,
    addressRegion: site.address.region,
    postalCode: site.address.postalCode,
    addressCountry: site.address.country,
  },
  geo: {
    '@type': 'GeoCoordinates',
    latitude: site.geo.latitude,
    longitude: site.geo.longitude,
  },
  hasMap: site.mapUrl,
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
  };
}
