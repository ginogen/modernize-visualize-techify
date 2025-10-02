import React, { useEffect, useState } from 'react';
import { Helmet } from 'react-helmet-async';
import '../styles/funkyart.css';

const FunkyArt: React.FC = () => {
  const [activeLanguage, setActiveLanguage] = useState('es');

  useEffect(() => {
    // Smooth scroll behavior
    const links = document.querySelectorAll('a[href^="#"]');
    links.forEach(link => {
      link.addEventListener('click', (e) => {
        e.preventDefault();
        const targetId = link.getAttribute('href')?.substring(1);
        const targetElement = targetId ? document.getElementById(targetId) : null;
        if (targetElement) {
          targetElement.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }
      });
    });

    // Language tabs functionality
    const tabButtons = document.querySelectorAll('.tab-button');
    const langContents = document.querySelectorAll('.lang-content');
    
    tabButtons.forEach(button => {
      button.addEventListener('click', () => {
        const lang = button.getAttribute('data-lang') || 'es';
        
        // Update active button
        tabButtons.forEach(btn => btn.classList.remove('active'));
        button.classList.add('active');
        
        // Update active content
        langContents.forEach(content => {
          content.classList.remove('active');
          if (content.getAttribute('data-lang') === lang) {
            content.classList.add('active');
          }
        });
        
        setActiveLanguage(lang);
      });
    });

    // Lazy loading images
    const images = document.querySelectorAll('img[loading="lazy"]');
    const imageObserver = new IntersectionObserver((entries, observer) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          const img = entry.target as HTMLImageElement;
          img.src = img.src; // Trigger load
          observer.unobserve(img);
        }
      });
    });
    images.forEach(img => imageObserver.observe(img));

    return () => {
      // Cleanup
      links.forEach(link => {
        link.removeEventListener('click', () => {});
      });
      tabButtons.forEach(button => {
        button.removeEventListener('click', () => {});
      });
      imageObserver.disconnect();
    };
  }, []);

  const structuredDataProduct = {
    "@context": "https://schema.org/",
    "@type": "Product",
    "name": "Abstract Balloon Dog - Escultura de Resina",
    "image": [
      "https://funkyart.gallery/images/balloon-dog-1.jpg",
      "https://funkyart.gallery/images/balloon-dog-2.jpg",
      "https://funkyart.gallery/images/balloon-dog-3.jpg"
    ],
    "description": "Escultura de perro globo rosa pastel en resina de alta calidad. Diseño abstracto y moderno perfecto para decoración de interiores. Inspirado en el arte contemporáneo, esta pieza única añade un toque de creatividad y energía a cualquier espacio.",
    "sku": "BALLOON-DOG-001",
    "brand": {
      "@type": "Brand",
      "name": "FunkyArt Gallery"
    },
    "offers": {
      "@type": "Offer",
      "url": "https://funkyart.gallery/producto/abstract-balloon-dog",
      "priceCurrency": "EUR",
      "price": "299.00",
      "availability": "https://schema.org/InStock",
      "seller": {
        "@type": "Organization",
        "name": "FunkyArt Gallery"
      }
    }
  };

  const structuredDataLocalBusiness = {
    "@context": "https://schema.org",
    "@type": "LocalBusiness",
    "name": "FunkyArt Gallery Barcelona",
    "image": "https://funkyart.gallery/logo.jpg",
    "url": "https://funkyart.gallery",
    "@id": "https://funkyart.gallery",
    "telephone": "+34 932 123 456",
    "priceRange": "€€",
    "address": {
      "@type": "PostalAddress",
      "streetAddress": "Carrer de Mallorca, 401",
      "addressLocality": "Barcelona",
      "postalCode": "08013",
      "addressCountry": "ES"
    },
    "geo": {
      "@type": "GeoCoordinates",
      "latitude": 41.3851,
      "longitude": 2.1734
    },
    "openingHoursSpecification": {
      "@type": "OpeningHoursSpecification",
      "dayOfWeek": [
        "Monday",
        "Tuesday",
        "Wednesday",
        "Thursday",
        "Friday"
      ],
      "opens": "10:00",
      "closes": "20:00"
    },
    "sameAs": [
      "https://www.instagram.com/funkyartgallery",
      "https://www.facebook.com/funkyartgallery"
    ]
  };

  return (
    <>
      <Helmet>
        <title>FunkyArt Gallery - Esculturas de Arte Moderno en Barcelona | Balloon Dog & Más</title>
        <meta name="description" content="Galería de arte en Barcelona especializada en esculturas modernas. Descubre nuestra colección de balloon dogs, esculturas de animales y piezas únicas de arte contemporáneo." />
        <meta name="keywords" content="galería de arte barcelona, art store barcelona, balloon dog, escultura corazón, oso rojo, esculturas de animales, arte moderno barcelona" />
        
        {/* Open Graph */}
        <meta property="og:title" content="FunkyArt Gallery - Esculturas de Arte Moderno en Barcelona" />
        <meta property="og:description" content="Descubre esculturas únicas de arte contemporáneo. Balloon dogs, animales abstractos y piezas decorativas exclusivas." />
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://funkyart.gallery" />
        <meta property="og:image" content="https://funkyart.gallery/og-image.jpg" />
        <meta property="og:site_name" content="FunkyArt Gallery" />
        
        {/* Twitter Card */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="FunkyArt Gallery - Arte Moderno Barcelona" />
        <meta name="twitter:description" content="Esculturas únicas de arte contemporáneo en Barcelona" />
        <meta name="twitter:image" content="https://funkyart.gallery/twitter-card.jpg" />
        
        {/* Hreflang */}
        <link rel="alternate" hrefLang="es" href="https://funkyart.gallery/es" />
        <link rel="alternate" hrefLang="en" href="https://funkyart.gallery/en" />
        <link rel="alternate" hrefLang="it" href="https://funkyart.gallery/it" />
        <link rel="alternate" hrefLang="fr" href="https://funkyart.gallery/fr" />
        <link rel="alternate" hrefLang="de" href="https://funkyart.gallery/de" />
        
        {/* Canonical */}
        <link rel="canonical" href="https://funkyart.gallery" />
        
        {/* Structured Data */}
        <script type="application/ld+json">
          {JSON.stringify(structuredDataProduct)}
        </script>
        <script type="application/ld+json">
          {JSON.stringify(structuredDataLocalBusiness)}
        </script>
      </Helmet>

      <div className="funky-art-landing">
        {/* Hero Section */}
        <section className="hero-section">
          <div className="container">
            <div className="hero-content">
              <h1 className="hero-title">
                FunkyArt Gallery Barcelona
                <span className="subtitle">Esculturas de Arte Moderno que Transforman Espacios</span>
              </h1>
              <p className="hero-description">
                Descubre nuestra exclusiva colección de esculturas contemporáneas. 
                Desde el icónico Balloon Dog hasta piezas únicas de animales abstractos, 
                cada obra está diseñada para inspirar creatividad y originalidad en tu espacio.
              </p>
              <div className="hero-cta">
                <a href="#catalogo" className="btn btn-primary">Ver Catálogo</a>
                <a href="#visita" className="btn btn-secondary">Visita la Galería</a>
              </div>
            </div>
            <div className="hero-image">
              <img 
                src="https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=600&h=600&fit=crop" 
                alt="Escultura de perro globo rosa pastel en resina - FunkyArt Gallery Barcelona" 
                loading="eager"
                width="600"
                height="600"
              />
            </div>
          </div>
        </section>

        {/* Featured Product Section */}
        <section id="destacado" className="featured-section">
          <div className="container">
            <h2 className="section-title">Abstract Balloon Dog - Nuestra Pieza Estrella</h2>
            <div className="product-showcase">
              <div className="product-gallery">
                <img 
                  src="https://images.unsplash.com/photo-1578321272176-b7bbc0679853?w=400&h=300&fit=crop" 
                  alt="Vista frontal escultura balloon dog rosa pastel" 
                  loading="lazy"
                />
                <img 
                  src="https://images.unsplash.com/photo-1581833971358-2c8b550f87b3?w=400&h=300&fit=crop" 
                  alt="Vista lateral escultura balloon dog con acabado brillante" 
                  loading="lazy"
                />
                <img 
                  src="https://images.unsplash.com/photo-1594614270360-e64549827022?w=400&h=300&fit=crop" 
                  alt="Detalle textura resina balloon dog arte moderno" 
                  loading="lazy"
                />
              </div>
              <div className="product-info">
                <h3>Balloon Dog - Escultura de Resina Premium</h3>
                <p className="product-description">
                  Esta icónica escultura de perro globo está meticulosamente elaborada en resina 
                  de alta calidad con un acabado rosa pastel brillante. Inspirada en el arte pop 
                  contemporáneo, esta pieza de 30cm de altura es perfecta para coleccionistas y 
                  amantes del diseño moderno.
                </p>
                <ul className="product-features">
                  <li>Material: Resina premium con acabado glossy</li>
                  <li>Dimensiones: 30cm x 25cm x 10cm</li>
                  <li>Color: Rosa pastel con acabado brillante</li>
                  <li>Peso: 2.5 kg</li>
                  <li>Edición limitada: Solo 100 piezas</li>
                </ul>
                <div className="product-price">
                  <span className="price">€299</span>
                  <span className="availability">En stock</span>
                </div>
                <button className="btn btn-buy">Comprar Ahora</button>
              </div>
            </div>
          </div>
        </section>

        {/* Animal Sculptures Section */}
        <section id="animales" className="animals-section">
          <div className="container">
            <h2 className="section-title">Esculturas de Animales - Arte que Cobra Vida</h2>
            <p className="section-description">
              Nuestra colección de esculturas de animales fusiona el realismo con la abstracción 
              moderna. Desde majestuosos leones hasta adorables gatos negros, cada pieza está 
              diseñada para capturar la esencia y energía del reino animal.
            </p>
            <div className="animals-grid">
              <div className="animal-card">
                <img src="https://images.unsplash.com/photo-1565098772267-60af42b81ef2?w=300&h=300&fit=crop" alt="Escultura oso rojo arte moderno" loading="lazy" />
                <h3>Oso Rojo Abstracto</h3>
                <p>Poderosa escultura en resina roja que simboliza fuerza y protección</p>
                <span className="price">€450</span>
              </div>
              <div className="animal-card">
                <img src="https://images.unsplash.com/photo-1514888286974-6c03e2ca1dba?w=300&h=300&fit=crop" alt="Escultura gato negro estilo italiano" loading="lazy" />
                <h3>Gatto Nero Elegante</h3>
                <p>Elegante felino negro con líneas minimalistas, inspiración italiana</p>
                <span className="price">€320</span>
              </div>
              <div className="animal-card">
                <img src="https://images.unsplash.com/photo-1614027164847-1b28cfe1df60?w=300&h=300&fit=crop" alt="Escultura león dorado majestuoso" loading="lazy" />
                <h3>León Dorado Majestuoso</h3>
                <p>Imponente león con acabado dorado, símbolo de liderazgo</p>
                <span className="price">€680</span>
              </div>
              <div className="animal-card">
                <img src="https://images.unsplash.com/photo-1602491453631-e2a5ad90a131?w=300&h=300&fit=crop" alt="Escultura tigre abstracto moderno" loading="lazy" />
                <h3>Tigre Abstracto</h3>
                <p>Diseño geométrico único que captura la esencia salvaje del tigre</p>
                <span className="price">€520</span>
              </div>
            </div>
          </div>
        </section>

        {/* Hearts & Love Collection */}
        <section id="corazones" className="hearts-section">
          <div className="container">
            <h2 className="section-title">Colección Corazones - Esculturas que Emocionan</h2>
            <div className="hearts-content">
              <div className="hearts-text">
                <h3>Esculturas Corazón: Arte que Late</h3>
                <p>
                  Nuestra colección de esculturas de corazones representa el amor en todas sus 
                  formas. Desde diseños minimalistas hasta piezas elaboradas con texturas únicas, 
                  cada corazón es una declaración artística perfecta para regalar o decorar 
                  espacios especiales.
                </p>
                <ul className="hearts-features">
                  <li>Variedad de tamaños: desde 15cm hasta 60cm</li>
                  <li>Materiales premium: resina, metal y técnicas mixtas</li>
                  <li>Colores vibrantes y acabados metálicos</li>
                  <li>Perfectos para San Valentín y ocasiones especiales</li>
                </ul>
              </div>
              <div className="hearts-gallery">
                <img src="https://images.unsplash.com/photo-1518199266791-5375a83190b7?w=300&h=250&fit=crop" alt="Escultura corazón rojo brillante" loading="lazy" />
                <img src="https://images.unsplash.com/photo-1535185384036-28bbc8035f28?w=300&h=250&fit=crop" alt="Escultura corazón acabado metálico" loading="lazy" />
                <img src="https://images.unsplash.com/photo-1516450360452-9312f5e86fc7?w=300&h=250&fit=crop" alt="Escultura corazón con textura única" loading="lazy" />
              </div>
            </div>
          </div>
        </section>

        {/* Local Gallery Section */}
        <section id="galeria" className="gallery-section">
          <div className="container">
            <h2 className="section-title">Visita Nuestra Galería de Arte en Barcelona</h2>
            <div className="gallery-info">
              <div className="gallery-details">
                <h3>FunkyArt Gallery Barcelona</h3>
                <p>
                  Ubicada en el corazón del Eixample, nuestra galería es un espacio dedicado 
                  al arte contemporáneo donde podrás experimentar nuestras esculturas en persona. 
                  Nuestro equipo de expertos está disponible para asesorarte y ayudarte a 
                  encontrar la pieza perfecta para tu colección o espacio.
                </p>
                <div className="contact-info">
                  <div className="info-item">
                    <strong>Dirección:</strong>
                    <p>Carrer de Mallorca, 401<br />08013 Barcelona, España</p>
                  </div>
                  <div className="info-item">
                    <strong>Horario:</strong>
                    <p>Lunes a Viernes: 10:00 - 20:00<br />Sábados: 11:00 - 18:00</p>
                  </div>
                  <div className="info-item">
                    <strong>Contacto:</strong>
                    <p>Tel: +34 932 123 456<br />Email: info@funkyart.gallery</p>
                  </div>
                </div>
                <a href="https://goo.gl/maps/example" className="btn btn-map" target="_blank" rel="noopener noreferrer">
                  Ver en Google Maps
                </a>
              </div>
              <div className="gallery-map">
                <iframe 
                  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2992.8!2d2.1734!3d41.3851!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2sFunkyArt+Gallery!5e0!3m2!1ses!2ses!4v1234567890"
                  width="100%"
                  height="400"
                  style={{ border: 0 }}
                  allowFullScreen
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                  title="Ubicación FunkyArt Gallery Barcelona"
                ></iframe>
              </div>
            </div>
          </div>
        </section>

        {/* International Collection */}
        <section id="internacional" className="international-section">
          <div className="container">
            <h2 className="section-title">Colección Internacional</h2>
            <div className="language-tabs">
              <button className="tab-button active" data-lang="es">Español</button>
              <button className="tab-button" data-lang="en">English</button>
              <button className="tab-button" data-lang="it">Italiano</button>
              <button className="tab-button" data-lang="fr">Français</button>
            </div>
            <div className="international-content">
              <div className="lang-content active" data-lang="es">
                <h3>Arte Sin Fronteras</h3>
                <p>
                  Nuestra galería trabaja con artistas de todo el mundo, trayendo a Barcelona 
                  las últimas tendencias en escultura contemporánea. Ofrecemos envío internacional 
                  y asesoramiento en múltiples idiomas.
                </p>
              </div>
              <div className="lang-content" data-lang="en">
                <h3>Art Without Borders</h3>
                <p>
                  Our gallery works with artists from around the world, bringing the latest trends 
                  in contemporary sculpture to Barcelona. We offer international shipping and 
                  multilingual assistance.
                </p>
              </div>
              <div className="lang-content" data-lang="it">
                <h3>Collezione Italiana</h3>
                <p>
                  Scopri la nostra esclusiva collezione di sculture italiane, inclusi i popolari 
                  "gatti neri" e "cuccioli" che hanno conquistato i collezionisti di tutta Europa.
                </p>
              </div>
              <div className="lang-content" data-lang="fr">
                <h3>Collection Internationale</h3>
                <p>
                  Découvrez notre collection exclusive de sculptures contemporaines. Nous proposons 
                  une expédition internationale et un service clientèle en plusieurs langues.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* FAQ Section */}
        <section id="faq" className="faq-section">
          <div className="container">
            <h2 className="section-title">Preguntas Frecuentes</h2>
            <div className="faq-grid">
              <div className="faq-item">
                <h3>¿Realizan envíos internacionales?</h3>
                <p>Sí, enviamos a toda Europa y países seleccionados. Los costes y tiempos varían según el destino y el tamaño de la pieza.</p>
              </div>
              <div className="faq-item">
                <h3>¿Puedo visitar la galería sin cita previa?</h3>
                <p>Por supuesto. Estamos abiertos de lunes a viernes de 10:00 a 20:00. Para visitas privadas o fuera de horario, contacta con nosotros.</p>
              </div>
              <div className="faq-item">
                <h3>¿Ofrecen certificado de autenticidad?</h3>
                <p>Todas nuestras esculturas incluyen un certificado de autenticidad firmado por el artista o la galería.</p>
              </div>
              <div className="faq-item">
                <h3>¿Hacen esculturas personalizadas?</h3>
                <p>Sí, trabajamos con artistas que pueden crear piezas únicas según tus especificaciones. Contacta para más detalles.</p>
              </div>
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="cta-section">
          <div className="container">
            <div className="cta-content">
              <h2>¿Listo para Añadir Arte a tu Vida?</h2>
              <p>Descubre la pieza perfecta que transformará tu espacio en una galería personal</p>
              <div className="cta-buttons">
                <a href="#catalogo" className="btn btn-primary">Explorar Catálogo Completo</a>
                <a href="tel:+34932123456" className="btn btn-secondary">Llamar Ahora</a>
              </div>
            </div>
          </div>
        </section>

        {/* Footer */}
        <footer className="footer">
          <div className="container">
            <div className="footer-content">
              <div className="footer-section">
                <h4>FunkyArt Gallery</h4>
                <p>Tu destino en Barcelona para el arte contemporáneo más innovador</p>
                <div className="social-links">
                  <a href="https://instagram.com/funkyartgallery" target="_blank" rel="noopener noreferrer">Instagram</a>
                  <a href="https://facebook.com/funkyartgallery" target="_blank" rel="noopener noreferrer">Facebook</a>
                </div>
              </div>
              <div className="footer-section">
                <h4>Enlaces Rápidos</h4>
                <ul>
                  <li><a href="#catalogo">Catálogo</a></li>
                  <li><a href="#animales">Esculturas de Animales</a></li>
                  <li><a href="#corazones">Colección Corazones</a></li>
                  <li><a href="#galeria">Visita la Galería</a></li>
                </ul>
              </div>
              <div className="footer-section">
                <h4>Información</h4>
                <ul>
                  <li>Envíos y Devoluciones</li>
                  <li>Términos y Condiciones</li>
                  <li>Política de Privacidad</li>
                  <li>Certificados de Autenticidad</li>
                </ul>
              </div>
            </div>
            <div className="footer-bottom">
              <p>&copy; 2024 FunkyArt Gallery. Todos los derechos reservados.</p>
            </div>
          </div>
        </footer>
      </div>
    </>
  );
};

export default FunkyArt;