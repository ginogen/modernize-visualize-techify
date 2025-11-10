import { useState, useEffect } from "react";
import { ArrowRight, CheckCircle, ExternalLink, Code2, Zap, Bot, HelpCircle, MessageCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Tooltip, TooltipContent, TooltipTrigger } from "@/components/ui/tooltip";
import { Link } from "react-router-dom";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { useLanguage } from "@/contexts/LanguageContext";
import SEO from "@/components/SEO/SEO";
import "../styles/minimal.css";

// A/B Testing Configuration
const AB_TEST_VARIANTS = {
  h1: [
    "Te ayudamos a desarrollar tu propio software.",
    "Deja de pagar suscripciones mensuales. Desarrollá tu propio software.",
    "¿Cansado de suscripciones costosas? Creá tu propio software.",
    "Independencia tecnológica: Desarrollá tu software sin depender de terceros."
  ],
  paragraph: [
    "Deja de depender de software de terceros, cientos de suscripciones mensuales y mas gastos. Estamos en la era en la que tener tu propio software ya no significa una inversion de miles de dolares.",
    "Miles de empresas gastan fortunas en suscripciones de software. Nosotros te ayudamos a crear tu propia solución y eliminar esos gastos para siempre.",
    "¿Sabías que las empresas gastan en promedio $5000 mensuales en software? Desarrollá tu propia herramienta y eliminá esos costos recurrentes.",
    "Suscripciones, licencias, dependencias de terceros. Es hora de tener el control total de tu tecnología con software desarrollado específicamente para tu negocio."
  ],
  cta: [
    { primary: "Agendar consulta gratuita", secondary: "Hablar en WhatsApp" },
    { primary: "Ver cómo funciona", secondary: "Consulta sin costo" },
    { primary: "Eliminar suscripciones ya", secondary: "Contactar ahora" },
    { primary: "Desarrollar mi software", secondary: "Hablar con experto" }
  ]
};

const NuestraPropuestaConPrecios = () => {
  const { t } = useLanguage();
  const [showStickyButton, setShowStickyButton] = useState(false);
  const [currentVariant, setCurrentVariant] = useState({
    h1: 0,
    paragraph: 0,
    cta: 0
  });

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 100) {
        setShowStickyButton(true);
      } else {
        setShowStickyButton(false);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // A/B Testing Logic
  useEffect(() => {
    const urlParams = new URLSearchParams(window.location.search);
    
    // Check for URL parameters (for Meta Ads testing)
    const h1Variant = urlParams.get('h1');
    const paragraphVariant = urlParams.get('p');
    const ctaVariant = urlParams.get('cta');
    
    if (h1Variant || paragraphVariant || ctaVariant) {
      // Use URL parameters if provided
      setCurrentVariant({
        h1: h1Variant ? parseInt(h1Variant) || 0 : 0,
        paragraph: paragraphVariant ? parseInt(paragraphVariant) || 0 : 0,
        cta: ctaVariant ? parseInt(ctaVariant) || 0 : 0
      });
      
      // Store variant for analytics
      sessionStorage.setItem('abTest', JSON.stringify({
        h1: h1Variant ? parseInt(h1Variant) || 0 : 0,
        paragraph: paragraphVariant ? parseInt(paragraphVariant) || 0 : 0,
        cta: ctaVariant ? parseInt(ctaVariant) || 0 : 0,
        source: 'url'
      }));
    } else {
      // Check if user already has a variant assigned
      const storedVariant = sessionStorage.getItem('abTest');
      
      if (storedVariant) {
        const parsed = JSON.parse(storedVariant);
        setCurrentVariant({
          h1: parsed.h1 || 0,
          paragraph: parsed.paragraph || 0,
          cta: parsed.cta || 0
        });
      } else {
        // Randomly assign variants
        const randomVariant = {
          h1: Math.floor(Math.random() * AB_TEST_VARIANTS.h1.length),
          paragraph: Math.floor(Math.random() * AB_TEST_VARIANTS.paragraph.length),
          cta: Math.floor(Math.random() * AB_TEST_VARIANTS.cta.length)
        };
        
        setCurrentVariant(randomVariant);
        sessionStorage.setItem('abTest', JSON.stringify({
          ...randomVariant,
          source: 'random'
        }));
      }
    }

    // Track variant view for analytics
    if (typeof window !== 'undefined' && window.gtag) {
      window.gtag('event', 'ab_test_view', {
        'custom_parameter_1': `h1_v${currentVariant.h1}`,
        'custom_parameter_2': `p_v${currentVariant.paragraph}`,
        'custom_parameter_3': `cta_v${currentVariant.cta}`
      });
    }
  }, []);

  return (
    <div className="min-h-screen bg-white">
      <SEO
        title="Nuestra Propuesta | Builders AI - Automatización y Desarrollo de Software"
        description="Simplificamos las operaciones de tu negocio mediante automatización inteligente, desarrollo de software personalizado y asistentes con IA. Conoce casos reales como Billence, CRMs personalizados y bots de WhatsApp."
        keywords="automatización empresarial, desarrollo software personalizado, bots whatsapp, asistentes IA, CRM personalizado, automatizar facturas, Billence, casos de éxito"
        url="https://www.builders-ai.com/nuestra-propuesta"
      />

      {/* Grid Background */}
      <div className="fixed inset-0 grid-bg pointer-events-none" />

      <Header />

      {/* Hero Section - Nuestra Propuesta */}
      <section className="relative pt-32 pb-20 px-4">
        <div className="container-narrow">
          <div className="max-w-4xl mx-auto text-center">
            <h1 className="text-display font-bold text-gray-900 mb-6">
              {AB_TEST_VARIANTS.h1[currentVariant.h1]}
            </h1>
            <p className="text-subtitle mb-8">
              {AB_TEST_VARIANTS.paragraph[currentVariant.paragraph]}
            </p>
            <div className="mb-6">
              <div className="inline-flex items-center px-4 py-2 bg-blue-50 border border-blue-200 rounded-full text-blue-800 text-sm font-medium">
                Unite a 100+ clientes que ya desarrollaron sus sistemas
              </div>
            </div>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button
                className="btn-primary px-8 py-3 text-lg text-black"
                onClick={() => {
                  // Track CTA click for Google Analytics
                  if (typeof window !== 'undefined' && window.gtag) {
                    window.gtag('event', 'cta_click', {
                      'custom_parameter_1': `primary_cta_v${currentVariant.cta}`,
                      'custom_parameter_2': AB_TEST_VARIANTS.cta[currentVariant.cta].primary
                    });
                  }

                  // Track for Meta Pixel - Standard Event
                  if (typeof window !== 'undefined' && window.fbq) {
                    window.fbq('track', 'Lead', {
                      content_name: AB_TEST_VARIANTS.cta[currentVariant.cta].primary,
                      variant_h1: currentVariant.h1,
                      variant_paragraph: currentVariant.paragraph, 
                      variant_cta: currentVariant.cta,
                      button_type: 'primary',
                      button_location: 'hero_section'
                    });

                    // Custom Event for detailed A/B tracking
                    window.fbq('trackCustom', 'cta_click_agenda', {
                      variant_combination: `h1_${currentVariant.h1}_p_${currentVariant.paragraph}_cta_${currentVariant.cta}`,
                      test_group: `variant_${currentVariant.h1}_${currentVariant.paragraph}_${currentVariant.cta}`,
                      button_text: AB_TEST_VARIANTS.cta[currentVariant.cta].primary,
                      conversion_type: 'agenda_click'
                    });
                  }

                  window.open(
                    "https://calendar.app.google/XXwTHc1qvikRrd2f6",
                    "_blank"
                  );
                }}
              >
                {AB_TEST_VARIANTS.cta[currentVariant.cta].primary} <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
              <Button
                variant="outline"
                className="px-8 py-3 text-lg border-gray-300 hover:bg-gray-50"
                onClick={() => {
                  // Track CTA click for Google Analytics
                  if (typeof window !== 'undefined' && window.gtag) {
                    window.gtag('event', 'cta_click', {
                      'custom_parameter_1': `secondary_cta_v${currentVariant.cta}`,
                      'custom_parameter_2': AB_TEST_VARIANTS.cta[currentVariant.cta].secondary
                    });
                  }

                  // Track for Meta Pixel - Standard Event
                  if (typeof window !== 'undefined' && window.fbq) {
                    window.fbq('track', 'InitiateCheckout', {
                      content_name: AB_TEST_VARIANTS.cta[currentVariant.cta].secondary,
                      variant_h1: currentVariant.h1,
                      variant_paragraph: currentVariant.paragraph,
                      variant_cta: currentVariant.cta,
                      button_type: 'secondary',
                      button_location: 'hero_section'
                    });

                    // Custom Event for detailed A/B tracking
                    window.fbq('trackCustom', 'cta_click_whatsapp', {
                      variant_combination: `h1_${currentVariant.h1}_p_${currentVariant.paragraph}_cta_${currentVariant.cta}`,
                      test_group: `variant_${currentVariant.h1}_${currentVariant.paragraph}_${currentVariant.cta}`,
                      button_text: AB_TEST_VARIANTS.cta[currentVariant.cta].secondary,
                      conversion_type: 'whatsapp_click'
                    });
                  }

                  window.open(
                    "https://wa.me/5491168626336?text=Hola!%20Me%20interesa%20conocer%20más%20sobre%20sus%20servicios",
                    "_blank"
                  );
                }}
              >
                {AB_TEST_VARIANTS.cta[currentVariant.cta].secondary} <MessageCircle className="ml-2 h-5 w-5" />
              </Button>
            </div>
          </div>
        </div>
      </section>



      {/* Ejemplos Reales Section */}
      <section className="py-20 border-t border-gray-100">
        <div className="container-narrow">
          <div className="max-w-2xl mb-16">
            <h2 className="text-4xl font-semibold text-gray-900 mb-4">
              Esto ya hicimos y podriamos hacer para vos.
            </h2>
          </div>

          <div className="space-y-20">
            {/* CRM para Agencia de Viajes */}
            <div className="grid md:grid-cols-2 gap-12 items-center">
              <div>
                <h3 className="text-2xl font-semibold text-gray-900 mb-4">
                  CRM para Agencia de Viajes
                </h3>
                <p className="text-gray-600 mb-6">
                  En este caso una agencia de viajes llegó con un problema, no tenía control 
                  real todos los leads que llegaban desde campañas de publicidad, ni control 
                  sobre cómo gestionaban sus empleados. Escuchamos sus necesidades y principal 
                  dolor y diseñamos un mapa de desarrollo con lo siguiente:
                </p>
                <ul className="space-y-2 text-gray-600">
                  <li className="flex items-start gap-2">
                    <CheckCircle className="h-5 w-5 text-green-600 mt-0.5 flex-shrink-0" />
                    Dashboard de control
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle className="h-5 w-5 text-green-600 mt-0.5 flex-shrink-0" />
                    Tablero de leads con filtros y conectado a sus campañas directamente
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle className="h-5 w-5 text-green-600 mt-0.5 flex-shrink-0" />
                    Posibilidad de enviar directamente mensajes de Whatsapp desde CRM
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle className="h-5 w-5 text-green-600 mt-0.5 flex-shrink-0" />
                    Gestión de roles admin y empleado
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle className="h-5 w-5 text-green-600 mt-0.5 flex-shrink-0" />
                    Creación de presupuestos, plantillas y envío de presupuestos
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle className="h-5 w-5 text-green-600 mt-0.5 flex-shrink-0" />
                    Reglas para automatizar asignaciones
                  </li>
                </ul>
              </div>
              <div className="bg-gray-100 rounded-xl p-4 text-center">
                <img 
                  src="/assets/icons/yularacrm.png" 
                  alt="CRM Agencia de Viajes - Dashboard y gestión de leads"
                  className="w-full h-auto rounded-lg shadow-sm"
                />
              </div>
            </div>

            {/* Asistente para Despacho de Abogados */}
            <div className="grid md:grid-cols-2 gap-12 items-center">
              <div>
                <h3 className="text-2xl font-semibold text-gray-900 mb-4">
                  Asistente para Despacho de Abogados
                </h3>
                <p className="text-gray-600 mb-6">
                  En este caso el cliente quería algo bien puntual, un bot en Whatsapp 
                  para su despacho conectado a su base de datos de clientes y casos, 
                  el objetivo es que cada abogado pueda crear recordatorios o tareas 
                  sobre X cliente y el bot se encarga de ejecutarla de manera autónoma 
                  (ejemplo: un recordatorio a x cliente que debe ir al juzgado la 
                  próxima semana) el bot se encarga de recordarle al cliente y obtener 
                  su confirmación y luego confirmar al abogado.
                </p>
              </div>
              <div className="bg-gray-100 rounded-xl p-4 text-center">
                <img 
                  src="/assets/icons/botliti.png" 
                  alt="Bot WhatsApp Despacho Legal - Asistente virtual para abogados"
                  className="w-full h-auto rounded-lg shadow-sm"
                />
              </div>
            </div>

            {/* Sistema de Automatización de Facturas - Billence */}
            <div className="grid md:grid-cols-2 gap-12 items-center">
              <div>
                <h3 className="text-2xl font-semibold text-gray-900 mb-4">
                  Sistema de Automatización de Facturas y Gastos
                </h3>
                <p className="text-gray-600 mb-6">
                  Desarrollamos Billence, un sistema que permite a las PYMES y negocios poder 
                  automatizar la gestión de sus facturas de proveedores en segundos conectando 
                  su email o utilizando Whatsapp. Este sistema extrae la información de las 
                  facturas y lo ordena para luego poder exportar en csv o integrar con sistemas 
                  de terceros.
                </p>
                <ul className="space-y-2 text-gray-600">
                  <li className="flex items-start gap-2">
                    <CheckCircle className="h-5 w-5 text-green-600 mt-0.5 flex-shrink-0" />
                    Extracción automática de datos de facturas
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle className="h-5 w-5 text-green-600 mt-0.5 flex-shrink-0" />
                    Integración con email y WhatsApp
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle className="h-5 w-5 text-green-600 mt-0.5 flex-shrink-0" />
                    Exportación a CSV y sistemas de terceros
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle className="h-5 w-5 text-green-600 mt-0.5 flex-shrink-0" />
                    Organización y categorización inteligente
                  </li>
                </ul>
              </div>
              <div className="bg-gray-100 rounded-xl p-4 text-center">
                <img 
                  src="/assets/icons/procesos.png" 
                  alt="Billence - Sistema de automatización de facturas y gastos"
                  className="w-full h-auto rounded-lg shadow-sm"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section after Pricing */}
      <section className="py-20 bg-blue-50 border-t border-gray-100">
        <div className="container-narrow">
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="text-3xl font-semibold text-gray-900 mb-6">
              ¿No estás seguro aún sobre contratarnos?
            </h2>
            <p className="text-lg text-gray-600 mb-8">
              Te invito a que reserves una llamada conmigo y vemos punto por punto 
              cómo podemos ayudarte a transformar tu negocio.
            </p>
            <Button
              className="btn-primary px-8 py-3 text-lg"
              onClick={() =>
                window.open(
                  "https://calendar.app.google/XXwTHc1qvikRrd2f6",
                  "_blank"
                )
              }
            >
              Reservar llamada gratuita <ArrowRight className="ml-2 h-5 w-5" />
            </Button>
            <p className="text-sm text-gray-500 mt-4">
              Sin compromiso • 30 minutos • Completamente gratis
            </p>
          </div>
        </div>
      </section>

      {/* Stats Counter Section */}
      <section className="py-20 border-y border-gray-100">
        <div className="container-narrow">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="text-center">
              <div className="stat-number">+500</div>
              <div className="stat-label">Horas ahorradas</div>
            </div>
            <div className="text-center">
              <div className="stat-number">+$8,000</div>
              <div className="stat-label">Dólares ahorrados</div>
            </div>
          </div>
        </div>
      </section>

      {/* Portfolio Section - Reutilizada del Home */}
      <section className="py-20 bg-gray-50/50">
        <div className="container-narrow">
          <div className="max-w-2xl mb-16 text-center mx-auto">
            <h2 className="text-4xl font-semibold text-gray-900 mb-4">
              Proyectos destacados
            </h2>
            <p className="text-lg text-gray-600">
              Landing pages que hemos diseñado y desarrollado para impulsar el
              crecimiento digital de nuestros clientes.
            </p>
          </div>

          <div className="portfolio-showcase">
            {[
              {
                url: "https://airibot.lat/",
                title: "AIRI",
                description:
                  "Detective personal de vuelos baratos por WhatsApp con alertas instantáneas y búsqueda inteligente",
                tags: ["Landing Page", "SaaS", "WhatsApp Bot"],
                color: "#3B82F6",
                screenshot: "/assets/icons/airi-fly-find-alerts.png",
              },
              {
                url: "#",
                title: "Clínica Dental Sonrisa Perfecta",
                description:
                  "Clínica dental especializada en brindar sonrisas perfectas con tecnología de vanguardia y atención personalizada",
                tags: ["Landing Page", "Salud", "Dental"],
                color: "#06B6D4",
                screenshot: "/assets/icons/clinica-dental-landing-page.png",
              },
              {
                url: "#",
                title: "KeePi",
                description:
                  "Plataforma para almacenar y gestionar tus pertenencias donde quieras de forma segura",
                tags: ["Web App", "Storage", "Marketplace"],
                color: "#F59E0B",
                screenshot: "/assets/icons/KeePi - Almacena donde quieras.png",
              },
              {
                url: "#",
                title: "Artisan Furniture Co.",
                description:
                  "Landing page para empresa de muebles artesanales de lujo con enfoque en la excelencia y calidad",
                tags: ["Landing Page", "E-commerce", "Furniture"],
                color: "#8B4513",
                screenshot:
                  "/assets/icons/Artisan Furniture Co. - Handcrafted Excellence.png",
              },
              {
                url: "#",
                title: "George Growth",
                description:
                  "Consultora especializada en crecimiento empresarial y desarrollo de negocios",
                tags: ["Landing Page", "Consultoría", "Growth"],
                color: "#1E40AF",
                screenshot: "/assets/icons/George Growth – George Growth.png",
              },
            ].map((project, index) => (
              <div key={index} className="browser-showcase-container">
                <div className="browser-showcase">
                  <div className="browser-showcase-header">
                    <div className="browser-dots">
                      <span
                        className="browser-dot"
                        style={{ background: "#FF5F57" }}
                      ></span>
                      <span
                        className="browser-dot"
                        style={{ background: "#FFBD2E" }}
                      ></span>
                      <span
                        className="browser-dot"
                        style={{ background: "#28CA42" }}
                      ></span>
                    </div>
                    <div className="browser-url-bar">
                      <span className="browser-url-text">{project.url}</span>
                    </div>
                    <div className="browser-status">
                      <div className="browser-status-dot"></div>
                    </div>
                  </div>
                  <div className="browser-showcase-viewport">
                    <div className="browser-scroll-container">
                      <div className="browser-scroll-content">
                        <img
                          src={project.screenshot}
                          alt={project.title}
                          className="browser-screenshot-fullpage"
                          loading="lazy"
                          decoding="async"
                          style={{ animationDelay: `${index * 2}s` }}
                        />
                        <div className="browser-image-placeholder">
                          <div className="browser-placeholder-grid">
                            <div className="browser-placeholder-block"></div>
                            <div className="browser-placeholder-block"></div>
                            <div className="browser-placeholder-block"></div>
                            <div className="browser-placeholder-block"></div>
                          </div>
                        </div>
                      </div>

                      <div className="browser-scroll-indicator">
                        <div className="browser-progress-bar"></div>
                      </div>

                      <div className="browser-scroll-gradients">
                        <div className="browser-gradient-top"></div>
                        <div className="browser-gradient-bottom"></div>
                      </div>

                      <div className="browser-scroll-hint">
                        <span>Scroll automático - Pausa al pasar el mouse</span>
                      </div>
                    </div>

                    <div className="browser-showcase-overlay">
                      <div className="browser-showcase-info">
                        <h3
                          className="browser-showcase-title"
                          style={{ color: project.color }}
                        >
                          {project.title}
                        </h3>
                        <p className="browser-showcase-description">
                          {project.description}
                        </p>
                        <div className="browser-showcase-tags">
                          {project.tags.map((tag) => (
                            <span key={tag} className="browser-showcase-tag">
                              {tag}
                            </span>
                          ))}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Process Section - Reutilizada del Home */}
      <section className="py-20 bg-gray-50/50">
        <div className="container-narrow">
          <div className="max-w-2xl mb-16">
            <h2 className="text-4xl font-semibold text-gray-900 mb-4">
              Cómo trabajamos
            </h2>
            <p className="text-lg text-gray-600">
              Un proceso simple y efectivo para transformar tus ideas en
              soluciones reales.
            </p>
          </div>

          <div className="grid md:grid-cols-4 gap-8">
            {[
              {
                step: "01",
                title: "Descubrimiento",
                description:
                  "Analizamos tus necesidades y definimos objetivos claros.",
              },
              {
                step: "02",
                title: "Diseño",
                description:
                  "Creamos una solución personalizada para tu negocio.",
              },
              {
                step: "03",
                title: "Desarrollo",
                description:
                  "Construimos con las mejores prácticas y tecnología.",
              },
              {
                step: "04",
                title: "Lanzamiento",
                description: "Implementamos y optimizamos para máximo impacto.",
              },
            ].map((process, index) => (
              <div key={index} className="process-step">
                <div className="process-number">PASO {process.step}</div>
                <h3 className="text-lg font-semibold mb-2">{process.title}</h3>
                <p className="text-sm text-gray-600">{process.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials Section - Reutilizada del Home */}
      <section className="py-20 border-t border-gray-100">
        <div className="container-narrow">
          <div className="max-w-2xl mb-16">
            <h2 className="text-4xl font-semibold text-gray-900 mb-4">
              Lo que dicen nuestros clientes
            </h2>
            <p className="text-lg text-gray-600">
              Empresas que han transformado sus operaciones con nuestras
              soluciones.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-6">
            {[
              {
                quote:
                  "La implementación del chatbot redujo nuestros tiempos de respuesta en un 80% y mejoró significativamente la satisfacción del cliente.",
                author: "María García",
                role: "CEO, TechStore",
              },
              {
                quote:
                  "El sistema de automatización que desarrollaron nos permitió escalar operaciones sin aumentar costos. Excelente trabajo.",
                author: "Carlos Rodríguez",
                role: "Director de Operaciones, LogiCorp",
              },
              {
                quote:
                  "Builders AI no solo entregó tecnología, sino que transformó nuestra forma de trabajar. Son verdaderos partners estratégicos.",
                author: "Ana Martínez",
                role: "CTO, FinanceHub",
              },
            ].map((testimonial, index) => (
              <Card key={index} className="card-minimal">
                <p className="text-gray-600 mb-4 italic">
                  "{testimonial.quote}"
                </p>
                <div>
                  <div className="font-semibold">{testimonial.author}</div>
                  <div className="text-sm text-gray-500">
                    {testimonial.role}
                  </div>
                </div>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* About Section - Reutilizada del Home */}
      <section className="py-20 border-t border-gray-100">
        <div className="container-narrow">
          <div className="max-w-3xl mx-auto text-center">
            <img
              src="https://media.licdn.com/dms/image/v2/D4D03AQGUSYi1kuY81w/profile-displayphoto-shrink_400_400/profile-displayphoto-shrink_400_400/0/1695825782350?e=1764201600&v=beta&t=2TS8rCloE1yLn14Zn5TptSygbyI1nevs2xEjFop6_Dg"
              alt="Gino Gentile"
              className="w-40 h-40 rounded-full mx-auto mb-6 object-cover shadow-md"
            />
            <h2 className="text-3xl font-semibold text-gray-900 mb-4">
              Gino Gentile
            </h2>
            <p className="text-lg text-gray-600 mb-6">
              Trabajé toda mi vida en marketing pero hace dos años me dedico al
              mundo de las automatizaciones y programación. Siempre fue mi gran
              pasión y a lo largo de los años fui tomando diferentes cursos que
              me fueron preparando.
            </p>
            <div className="flex justify-center gap-4">
              <Button
                className="btn-primary text-black"
                onClick={() =>
                  window.open(
                    "https://calendar.app.google/XXwTHc1qvikRrd2f6",
                    "_blank"
                  )
                }
              >
                Agenda una llamada
              </Button>
              <Button
                variant="outline"
                onClick={() =>
                  window.open(
                    "https://www.linkedin.com/in/gino-gentile/",
                    "_blank"
                  )
                }
              >
                Conóceme en LinkedIn
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Somos Internacionales Section */}
      <section className="py-20 bg-gray-50/50">
        <div className="container-narrow">
          <div className="text-center">
            <h2 className="text-4xl font-semibold text-gray-900 mb-8">
              Somos Internacionales
            </h2>
            <div className="flex flex-wrap justify-center items-center gap-8 md:gap-12">
              {/* Argentina */}
              <div className="flex flex-col items-center">
                <div className="w-16 h-12 bg-gray-200 rounded-lg flex items-center justify-center mb-2">
                  <span className="text-2xl">🇦🇷</span>
                </div>
                <span className="text-sm text-gray-600">Argentina</span>
              </div>
              
              {/* Chile */}
              <div className="flex flex-col items-center">
                <div className="w-16 h-12 bg-gray-200 rounded-lg flex items-center justify-center mb-2">
                  <span className="text-2xl">🇨🇱</span>
                </div>
                <span className="text-sm text-gray-600">Chile</span>
              </div>
              
              {/* Colombia */}
              <div className="flex flex-col items-center">
                <div className="w-16 h-12 bg-gray-200 rounded-lg flex items-center justify-center mb-2">
                  <span className="text-2xl">🇨🇴</span>
                </div>
                <span className="text-sm text-gray-600">Colombia</span>
              </div>
              
              {/* México */}
              <div className="flex flex-col items-center">
                <div className="w-16 h-12 bg-gray-200 rounded-lg flex items-center justify-center mb-2">
                  <span className="text-2xl">🇲🇽</span>
                </div>
                <span className="text-sm text-gray-600">México</span>
              </div>
              
              {/* Estados Unidos */}
              <div className="flex flex-col items-center">
                <div className="w-16 h-12 bg-gray-200 rounded-lg flex items-center justify-center mb-2">
                  <span className="text-2xl">🇺🇸</span>
                </div>
                <span className="text-sm text-gray-600">Estados Unidos</span>
              </div>
              
              {/* España */}
              <div className="flex flex-col items-center">
                <div className="w-16 h-12 bg-gray-200 rounded-lg flex items-center justify-center mb-2">
                  <span className="text-2xl">🇪🇸</span>
                </div>
                <span className="text-sm text-gray-600">España</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section - Reutilizada del Home */}
      <section className="py-20 bg-gray-900 text-white">
        <div className="container-narrow text-center">
          <h2 className="text-4xl font-semibold mb-4">
            ¿Listo para transformar tu negocio?
          </h2>
          <p className="text-xl text-gray-300 mb-8 max-w-2xl mx-auto">
            Agenda una consulta gratuita y descubre cómo la IA puede
            revolucionar tu empresa.
          </p>
          <Button
            className="bg-white text-gray-900 hover:bg-gray-100 px-8 py-3"
            onClick={() =>
              window.open(
                "https://calendar.app.google/XXwTHc1qvikRrd2f6",
                "_blank"
              )
            }
          >
            Comenzar ahora <ArrowRight className="ml-2 h-4 w-4" />
          </Button>
        </div>
      </section>

      {/* Sticky CTA for Mobile */}
      {showStickyButton && (
        <div 
          className="fixed bottom-0 left-0 right-0 md:hidden z-50 bg-white shadow-lg border-t border-gray-200 p-4 transition-all duration-300 ease-in-out"
          style={{
            transform: showStickyButton ? 'translateY(0)' : 'translateY(100%)',
            opacity: showStickyButton ? 1 : 0
          }}
        >
          <div className="flex gap-3">
            <Button
              className="flex-1 btn-primary py-3 text-sm font-medium text-black"
              onClick={() => {
                // Track for Meta Pixel - Sticky CTA
                if (typeof window !== 'undefined' && window.fbq) {
                  window.fbq('track', 'Lead', {
                    content_name: 'Consulta gratuita',
                    button_type: 'primary',
                    button_location: 'sticky_mobile'
                  });

                  window.fbq('trackCustom', 'sticky_cta_agenda', {
                    device_type: 'mobile',
                    cta_type: 'sticky_bottom'
                  });
                }

                window.open(
                  "https://calendar.app.google/XXwTHc1qvikRrd2f6",
                  "_blank"
                );
              }}
            >
              Consulta gratuita <ArrowRight className="ml-1 h-4 w-4" />
            </Button>
            <Button
              variant="outline"
              className="flex-1 border-gray-300 hover:bg-gray-50 py-3 text-sm font-medium"
              onClick={() => {
                // Track for Meta Pixel - Sticky CTA WhatsApp
                if (typeof window !== 'undefined' && window.fbq) {
                  window.fbq('track', 'InitiateCheckout', {
                    content_name: 'WhatsApp',
                    button_type: 'secondary',
                    button_location: 'sticky_mobile'
                  });

                  window.fbq('trackCustom', 'sticky_cta_whatsapp', {
                    device_type: 'mobile',
                    cta_type: 'sticky_bottom'
                  });
                }

                window.open(
                  "https://wa.me/5491168626336?text=Hola!%20Me%20interesa%20conocer%20más%20sobre%20sus%20servicios",
                  "_blank"
                );
              }}
            >
              WhatsApp <MessageCircle className="ml-1 h-4 w-4" />
            </Button>
          </div>
        </div>
      )}

      <Footer />
    </div>
  );
};

export default NuestraPropuestaConPrecios;