import { Helmet } from 'react-helmet-async';
import { useLanguage } from '@/contexts/LanguageContext';
import { organizationSchema, websiteSchema } from './structuredData';

interface SEOProps {
  title?: string;
  description?: string;
  keywords?: string;
  image?: string;
  url?: string;
  type?: string;
  structuredData?: object;
}

const SEO = ({ 
  title = "Builders AI | Desarrollo de IA y Chatbots Personalizados", 
  description = "Transformamos tu negocio con soluciones de IA personalizadas. Chatbots inteligentes, automatización de procesos y desarrollo web. +50 proyectos exitosos.",
  keywords = "desarrollo IA, chatbot empresarial, automatización procesos, inteligencia artificial, chatbot WhatsApp, desarrollo software personalizado, transformación digital, builders ai",
  image = "https://www.builders-ai.com/og-image.png",
  url = "https://www.builders-ai.com",
  type = "website",
  structuredData
}: SEOProps) => {
  const { language } = useLanguage();
  const locale = language === 'es' ? 'es_ES' : 'en_US';
  
  const fullTitle = title.includes("Builders AI") ? title : `${title} | Builders AI`;
  
  return (
    <Helmet>
      {/* Primary Meta Tags */}
      <title>{fullTitle}</title>
      <meta name="title" content={fullTitle} />
      <meta name="description" content={description} />
      <meta name="keywords" content={keywords} />
      <meta name="robots" content="index, follow" />
      <meta name="language" content={language === 'es' ? 'Spanish' : 'English'} />
      <link rel="canonical" href={url} />
      
      {/* Open Graph / Facebook */}
      <meta property="og:type" content={type} />
      <meta property="og:url" content={url} />
      <meta property="og:title" content={fullTitle} />
      <meta property="og:description" content={description} />
      <meta property="og:image" content={image} />
      <meta property="og:image:width" content="1200" />
      <meta property="og:image:height" content="630" />
      <meta property="og:locale" content={locale} />
      <meta property="og:site_name" content="Builders AI" />
      
      {/* Twitter */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:url" content={url} />
      <meta name="twitter:title" content={fullTitle} />
      <meta name="twitter:description" content={description} />
      <meta name="twitter:image" content={image} />
      
      {/* Language Alternates */}
      <link rel="alternate" hrefLang="es" href={`${url}?lang=es`} />
      <link rel="alternate" hrefLang="en" href={`${url}?lang=en`} />
      <link rel="alternate" hrefLang="x-default" href={url} />
      
      {/* Structured Data */}
      {structuredData && (
        <script type="application/ld+json">
          {JSON.stringify(structuredData)}
        </script>
      )}
      
      {/* Default Organization Schema */}
      <script type="application/ld+json">
        {JSON.stringify(organizationSchema)}
      </script>
      
      {/* Website Schema */}
      <script type="application/ld+json">
        {JSON.stringify(websiteSchema)}
      </script>
    </Helmet>
  );
};

export default SEO;