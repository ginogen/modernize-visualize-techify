export const organizationSchema = {
  "@context": "https://schema.org",
  "@type": "Organization",
  "name": "Builders AI",
  "alternateName": "Builders Artificial Intelligence",
  "url": "https://www.builders-ai.com",
  "logo": "https://www.builders-ai.com/logobuilders.png",
  "description": "Empresa líder en desarrollo de soluciones de inteligencia artificial, chatbots empresariales y automatización de procesos. Transformamos negocios con tecnología de vanguardia.",
  "foundingDate": "2022",
  "founders": [{
    "@type": "Person",
    "name": "Gino Gentile"
  }],
  "contactPoint": [{
    "@type": "ContactPoint",
    "telephone": "+1-786-408-7985",
    "contactType": "sales",
    "email": "hola@builders-ai.com",
    "availableLanguage": ["Spanish", "English"],
    "areaServed": ["US", "AR", "MX", "ES", "CO", "CL", "PE"]
  }],
  "address": [{
    "@type": "PostalAddress",
    "addressCountry": "US",
    "addressRegion": "NM",
    "addressLocality": "New Mexico"
  }, {
    "@type": "PostalAddress",
    "addressCountry": "AR",
    "addressLocality": "Rosario",
    "addressRegion": "Santa Fe"
  }],
  "sameAs": [
    "https://www.linkedin.com/company/builders-ai",
    "https://www.facebook.com/buildersai",
    "https://www.instagram.com/builders.ai"
  ],
  "makesOffer": [{
    "@type": "Offer",
    "itemOffered": {
      "@type": "Service",
      "name": "Desarrollo de Chatbots IA",
      "description": "Chatbots inteligentes personalizados para WhatsApp, web y múltiples plataformas"
    }
  }, {
    "@type": "Offer",
    "itemOffered": {
      "@type": "Service",
      "name": "Automatización de Procesos",
      "description": "Automatización inteligente de procesos empresariales con IA"
    }
  }, {
    "@type": "Offer",
    "itemOffered": {
      "@type": "Service",
      "name": "Desarrollo de Software Personalizado",
      "description": "Desarrollo de aplicaciones web y móviles con tecnologías modernas"
    }
  }]
};

export const websiteSchema = {
  "@context": "https://schema.org",
  "@type": "WebSite",
  "name": "Builders AI",
  "url": "https://www.builders-ai.com",
  "potentialAction": {
    "@type": "SearchAction",
    "target": {
      "@type": "EntryPoint",
      "urlTemplate": "https://www.builders-ai.com/search?q={search_term_string}"
    },
    "query-input": "required name=search_term_string"
  }
};

export const localBusinessSchema = {
  "@context": "https://schema.org",
  "@type": "LocalBusiness",
  "name": "Builders AI",
  "@id": "https://www.builders-ai.com",
  "url": "https://www.builders-ai.com",
  "telephone": "+1-786-408-7985",
  "email": "hola@builders-ai.com",
  "address": [{
    "@type": "PostalAddress",
    "addressCountry": "US",
    "addressRegion": "NM",
    "addressLocality": "New Mexico"
  }],
  "priceRange": "$$",
  "openingHoursSpecification": [{
    "@type": "OpeningHoursSpecification",
    "dayOfWeek": ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"],
    "opens": "09:00",
    "closes": "18:00"
  }],
  "geo": {
    "@type": "GeoCoordinates",
    "latitude": "35.0844",
    "longitude": "-106.6504"
  }
};

export const serviceSchema = (service: {
  name: string;
  description: string;
  provider?: string;
  serviceType?: string;
  areaServed?: string[];
}) => ({
  "@context": "https://schema.org",
  "@type": "Service",
  "name": service.name,
  "description": service.description,
  "provider": {
    "@type": "Organization",
    "name": service.provider || "Builders AI"
  },
  "serviceType": service.serviceType || "Technology Service",
  "areaServed": service.areaServed || ["US", "AR", "MX", "ES", "CO", "CL", "PE"],
  "hasOfferCatalog": {
    "@type": "OfferCatalog",
    "name": "Servicios de " + service.name
  }
});

export const breadcrumbSchema = (items: Array<{name: string; url: string}>) => ({
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  "itemListElement": items.map((item, index) => ({
    "@type": "ListItem",
    "position": index + 1,
    "name": item.name,
    "item": item.url
  }))
});

export const faqSchema = (faqs: Array<{question: string; answer: string}>) => ({
  "@context": "https://schema.org",
  "@type": "FAQPage",
  "mainEntity": faqs.map(faq => ({
    "@type": "Question",
    "name": faq.question,
    "acceptedAnswer": {
      "@type": "Answer",
      "text": faq.answer
    }
  }))
});