/**
 * JSON-LD Structured Data for SEO
 * Helps search engines understand your business and content
 */

export function OrganizationSchema() {
  const schema = {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    name: 'GRAVITAS INDEX',
    url: 'https://gravitasindex.com',
    logo: 'https://gravitasindex.com/logo.svg',
    description: 'Data-driven entity optimization that transforms businesses into market authorities.',
    contactPoint: {
      '@type': 'ContactPoint',
      contactType: 'Sales',
      availableLanguage: 'English',
    },
    sameAs: [
      // Add social media profiles when available
      // 'https://twitter.com/gravitasindex',
      // 'https://linkedin.com/company/gravitasindex',
    ],
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  );
}

export function WebsiteSchema() {
  const schema = {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    name: 'GRAVITAS INDEX',
    url: 'https://gravitasindex.com',
    description: 'Transform your business into a market authority Google can\'t ignore.',
    potentialAction: {
      '@type': 'SearchAction',
      target: {
        '@type': 'EntryPoint',
        urlTemplate: 'https://gravitasindex.com/?q={search_term_string}',
      },
      'query-input': 'required name=search_term_string',
    },
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  );
}

export function ServiceSchema() {
  const schema = {
    '@context': 'https://schema.org',
    '@type': 'Service',
    serviceType: 'SEO & Entity Optimization',
    provider: {
      '@type': 'Organization',
      name: 'GRAVITAS INDEX',
    },
    areaServed: {
      '@type': 'Country',
      name: 'United States',
    },
    hasOfferCatalog: {
      '@type': 'OfferCatalog',
      name: 'Entity Optimization Services',
      itemListElement: [
        {
          '@type': 'Offer',
          itemOffered: {
            '@type': 'Service',
            name: 'Solo Agent Plan',
            description: 'Entity Search optimization for individual real estate agents',
          },
        },
        {
          '@type': 'Offer',
          itemOffered: {
            '@type': 'Service',
            name: 'Team Plan',
            description: 'Entity Search optimization for teams and brokerages',
          },
        },
      ],
    },
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  );
}
