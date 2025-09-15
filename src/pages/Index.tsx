import { ArrowRight, CheckCircle, ExternalLink } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Link } from "react-router-dom";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { useLanguage } from "@/contexts/LanguageContext";
import SEO from "@/components/SEO/SEO";
import "../styles/minimal.css";

const Index = () => {
  const { t } = useLanguage();

  return (
    <div className="min-h-screen bg-white">
      <SEO
        title="Builders AI | Desarrollo de IA y Chatbots Personalizados | Automatización Empresarial"
        description="Transformamos tu negocio con soluciones de IA personalizadas. Chatbots inteligentes para WhatsApp, automatización de procesos empresariales y desarrollo web. +50 proyectos exitosos. Consulta gratis."
        keywords="desarrollo IA, chatbot empresarial, chatbot WhatsApp, automatización procesos, inteligencia artificial, desarrollo software personalizado, transformación digital, builders ai, agencia IA"
        url="https://www.builders-ai.com/"
      />

      {/* Grid Background */}
      <div className="fixed inset-0 grid-bg pointer-events-none" />

      <Header />

      {/* Hero Section */}
      <section className="relative pt-32 pb-20 px-4">
        <div className="container-narrow">
          <div className="max-w-3xl">
            <h1 className="text-display font-semibold text-gray-900 mb-6">
              Transformamos negocios con inteligencia artificial
            </h1>
            <p className="text-subtitle mb-8">
              Creamos soluciones de IA personalizadas que automatizan procesos,
              mejoran la experiencia del cliente y aceleran el crecimiento.
            </p>
            <div className="flex flex-wrap gap-4">
              <Button
                className="btn-primary"
                onClick={() =>
                  window.open(
                    "https://calendar.app.google/XXwTHc1qvikRrd2f6",
                    "_blank"
                  )
                }
              >
                Agenda una consulta <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-20 border-y border-gray-100">
        <div className="container-narrow">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {[
              { number: "50+", label: "Proyectos completados" },
              { number: "98%", label: "Satisfacción del cliente" },
              { number: "24/7", label: "Soporte disponible" },
              { number: "3", label: "Países con presencia" },
            ].map((stat, index) => (
              <div key={index} className="text-center">
                <div className="stat-number">{stat.number}</div>
                <div className="stat-label">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Services Section */}
      <section className="py-20">
        <div className="container-narrow">
          <div className="max-w-2xl mb-16">
            <h2 className="text-4xl font-semibold text-gray-900 mb-4">
              Nuestros servicios
            </h2>
            <p className="text-lg text-gray-600">
              Tres servicios principales diseñados para transformar tu negocio
              con tecnología de vanguardia.
            </p>
          </div>

          <div className="space-y-16">
            {/* Desarrollo de Software */}
            <div className="service-section">
              <h3 className="text-3xl font-semibold text-gray-900 mb-4">
                Desarrollo de Software
              </h3>
              <p className="text-lg text-gray-600 mb-8 max-w-3xl">
                Creamos aplicaciones web y móviles personalizadas utilizando las
                tecnologías más modernas. Desde MVPs hasta plataformas
                enterprise, desarrollamos soluciones que escalan con tu negocio.
              </p>

              <div className="grid md:grid-cols-3 gap-4">
                <Card className="service-card">
                  <div className="flex items-start justify-between mb-2">
                    <h4 className="text-lg font-medium">Aplicaciones Web</h4>
                    <ExternalLink className="h-4 w-4 text-gray-400 service-card-icon" />
                  </div>
                  <p className="text-sm text-gray-600">
                    React, Next.js y tecnologías modernas
                  </p>
                </Card>
                <Card className="service-card">
                  <div className="flex items-start justify-between mb-2">
                    <h4 className="text-lg font-medium">APIs y Backend</h4>
                    <ExternalLink className="h-4 w-4 text-gray-400 service-card-icon" />
                  </div>
                  <p className="text-sm text-gray-600">
                    Arquitecturas escalables y seguras
                  </p>
                </Card>
                <Card className="service-card">
                  <div className="flex items-start justify-between mb-2">
                    <h4 className="text-lg font-medium">E-commerce</h4>
                    <ExternalLink className="h-4 w-4 text-gray-400 service-card-icon" />
                  </div>
                  <p className="text-sm text-gray-600">
                    Tiendas online optimizadas
                  </p>
                </Card>
              </div>
            </div>

            {/* AI Agents */}
            <div className="service-section">
              <h3 className="text-3xl font-semibold text-gray-900 mb-4">
                AI Agents e Inteligencia Artificial para Negocios y Empresas
              </h3>
              <p className="text-lg text-gray-600 mb-8 max-w-3xl">
                Desarrollamos agentes de inteligencia artificial personalizados
                que automatizan tareas complejas, mejoran la atención al cliente
                y optimizan procesos empresariales.
              </p>

              <div className="grid md:grid-cols-3 gap-4">
                <Link to="/ia-para-abogados">
                  <Card className="service-card cursor-pointer hover:shadow-md transition-shadow">
                    <div className="flex items-start justify-between mb-2">
                      <h4 className="text-lg font-medium">
                        Inteligencia Artificial para Abogados
                      </h4>
                      <ExternalLink className="h-4 w-4 text-gray-400 service-card-icon" />
                    </div>
                    <p className="text-sm text-gray-600">
                      Herramientas y apps con IA para abogados y estudios
                      juridicos
                    </p>
                  </Card>
                </Link>
                <Card className="service-card">
                  <div className="flex items-start justify-between mb-2">
                    <h4 className="text-lg font-medium">
                      Asistentes Virtuales
                    </h4>
                    <ExternalLink className="h-4 w-4 text-gray-400 service-card-icon" />
                  </div>
                  <p className="text-sm text-gray-600">
                    Agentes especializados por industria
                  </p>
                </Card>
                <Card className="service-card">
                  <div className="flex items-start justify-between mb-2">
                    <h4 className="text-lg font-medium">
                      Análisis Inteligente
                    </h4>
                    <ExternalLink className="h-4 w-4 text-gray-400 service-card-icon" />
                  </div>
                  <p className="text-sm text-gray-600">
                    Procesamiento de datos con IA
                  </p>
                </Card>
              </div>
            </div>

            {/* Automatizaciones */}
            <div className="service-section">
              <h3 className="text-3xl font-semibold text-gray-900 mb-4">
                Automatizaciones
              </h3>
              <p className="text-lg text-gray-600 mb-8 max-w-3xl">
                Implementamos sistemas de automatización que conectan tus
                herramientas existentes, eliminan tareas repetitivas y optimizan
                flujos de trabajo empresariales.
              </p>

              <div className="grid md:grid-cols-2 lg:grid-cols-5 gap-4">
                <Link to="/automatizar-mensajes-de-whatsapp">
                  <Card className="service-card cursor-pointer hover:shadow-md transition-shadow">
                    <div className="flex items-start justify-between mb-2">
                      <h4 className="text-lg font-medium">
                        Automatizar Mensajes de Whatsapp
                      </h4>
                      <ExternalLink className="h-4 w-4 text-gray-400 service-card-icon" />
                    </div>
                    <p className="text-sm text-gray-600">
                      Breve introducción sobre automatizaciones para Whatsapp
                    </p>
                  </Card>
                </Link>
                <Link to="/automatizar-facturas">
                  <Card className="service-card cursor-pointer hover:shadow-md transition-shadow">
                    <div className="flex items-start justify-between mb-2">
                      <h4 className="text-lg font-medium">
                        Automatizar Facturas
                      </h4>
                      <ExternalLink className="h-4 w-4 text-gray-400 service-card-icon" />
                    </div>
                    <p className="text-sm text-gray-600">
                      Facturación automática integrada con AFIP
                    </p>
                  </Card>
                </Link>
                <Link to="/automatizar-documentos-word">
                  <Card className="service-card cursor-pointer hover:shadow-md transition-shadow">
                    <div className="flex items-start justify-between mb-2">
                      <h4 className="text-lg font-medium">
                        Automatizar Documentos en Word
                      </h4>
                      <ExternalLink className="h-4 w-4 text-gray-400 service-card-icon" />
                    </div>
                    <p className="text-sm text-gray-600">
                      Plantillas y documentos automáticos
                    </p>
                  </Card>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Process Section */}
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

      {/* Testimonials Section */}
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

      {/* Portfolio Section */}
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

      {/* About Section */}
      <section className="py-20 border-t border-gray-100">
        <div className="container-narrow">
          <div className="max-w-3xl mx-auto text-center">
            <img
              src="https://media.licdn.com/dms/image/v2/D4D03AQGUSYi1kuY81w/profile-displayphoto-shrink_400_400/profile-displayphoto-shrink_400_400/0/1695825782350?e=1760572800&v=beta&t=Q9puM4cASq1wec1rTtSZv9Rc_PyjFHstM9MDhKIA23o"
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
                className="btn-primary"
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

      {/* CTA Section */}
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

      <Footer />
    </div>
  );
};

export default Index;
