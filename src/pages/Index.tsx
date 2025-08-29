import { ArrowRight, CheckCircle, ExternalLink } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
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
              Tres servicios principales diseñados para transformar tu negocio con tecnología de vanguardia.
            </p>
          </div>

          <div className="space-y-16">
            {/* Desarrollo de Software */}
            <div className="service-section">
              <h3 className="text-3xl font-semibold text-gray-900 mb-4">
                Desarrollo de Software
              </h3>
              <p className="text-lg text-gray-600 mb-8 max-w-3xl">
                Creamos aplicaciones web y móviles personalizadas utilizando las tecnologías más modernas. 
                Desde MVPs hasta plataformas enterprise, desarrollamos soluciones que escalan con tu negocio.
              </p>
              
              <div className="grid md:grid-cols-3 gap-4">
                <Card className="service-card">
                  <div className="flex items-start justify-between mb-2">
                    <h4 className="text-lg font-medium">Aplicaciones Web</h4>
                    <ExternalLink className="h-4 w-4 text-gray-400 service-card-icon" />
                  </div>
                  <p className="text-sm text-gray-600">React, Next.js y tecnologías modernas</p>
                </Card>
                <Card className="service-card">
                  <div className="flex items-start justify-between mb-2">
                    <h4 className="text-lg font-medium">APIs y Backend</h4>
                    <ExternalLink className="h-4 w-4 text-gray-400 service-card-icon" />
                  </div>
                  <p className="text-sm text-gray-600">Arquitecturas escalables y seguras</p>
                </Card>
                <Card className="service-card">
                  <div className="flex items-start justify-between mb-2">
                    <h4 className="text-lg font-medium">E-commerce</h4>
                    <ExternalLink className="h-4 w-4 text-gray-400 service-card-icon" />
                  </div>
                  <p className="text-sm text-gray-600">Tiendas online optimizadas</p>
                </Card>
              </div>
            </div>

            {/* AI Agents */}
            <div className="service-section">
              <h3 className="text-3xl font-semibold text-gray-900 mb-4">
                AI Agents
              </h3>
              <p className="text-lg text-gray-600 mb-8 max-w-3xl">
                Desarrollamos agentes de inteligencia artificial personalizados que automatizan tareas complejas,
                mejoran la atención al cliente y optimizan procesos empresariales.
              </p>
              
              <div className="grid md:grid-cols-3 gap-4">
                <Card className="service-card">
                  <div className="flex items-start justify-between mb-2">
                    <h4 className="text-lg font-medium">Chatbots WhatsApp</h4>
                    <ExternalLink className="h-4 w-4 text-gray-400 service-card-icon" />
                  </div>
                  <p className="text-sm text-gray-600">Atención 24/7 con IA conversacional</p>
                </Card>
                <Card className="service-card">
                  <div className="flex items-start justify-between mb-2">
                    <h4 className="text-lg font-medium">Asistentes Virtuales</h4>
                    <ExternalLink className="h-4 w-4 text-gray-400 service-card-icon" />
                  </div>
                  <p className="text-sm text-gray-600">Agentes especializados por industria</p>
                </Card>
                <Card className="service-card">
                  <div className="flex items-start justify-between mb-2">
                    <h4 className="text-lg font-medium">Análisis Inteligente</h4>
                    <ExternalLink className="h-4 w-4 text-gray-400 service-card-icon" />
                  </div>
                  <p className="text-sm text-gray-600">Procesamiento de datos con IA</p>
                </Card>
              </div>
            </div>

            {/* Automatizaciones */}
            <div className="service-section">
              <h3 className="text-3xl font-semibold text-gray-900 mb-4">
                Automatizaciones
              </h3>
              <p className="text-lg text-gray-600 mb-8 max-w-3xl">
                Implementamos sistemas de automatización que conectan tus herramientas existentes,
                eliminan tareas repetitivas y optimizan flujos de trabajo empresariales.
              </p>
              
              <div className="grid md:grid-cols-3 gap-4">
                <Card className="service-card">
                  <div className="flex items-start justify-between mb-2">
                    <h4 className="text-lg font-medium">Workflows</h4>
                    <ExternalLink className="h-4 w-4 text-gray-400 service-card-icon" />
                  </div>
                  <p className="text-sm text-gray-600">Automatización de procesos empresariales</p>
                </Card>
                <Card className="service-card">
                  <div className="flex items-start justify-between mb-2">
                    <h4 className="text-lg font-medium">Integraciones</h4>
                    <ExternalLink className="h-4 w-4 text-gray-400 service-card-icon" />
                  </div>
                  <p className="text-sm text-gray-600">Conecta todas tus herramientas</p>
                </Card>
                <Card className="service-card">
                  <div className="flex items-start justify-between mb-2">
                    <h4 className="text-lg font-medium">Reportes Automáticos</h4>
                    <ExternalLink className="h-4 w-4 text-gray-400 service-card-icon" />
                  </div>
                  <p className="text-sm text-gray-600">Datos en tiempo real sin esfuerzo</p>
                </Card>
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
                title: "AiriBot",
                description: "Plataforma de chatbots con IA para empresas",
                tags: ["Landing Page", "SaaS", "IA"],
                color: "#3B82F6",
                screenshot: "/portfolio/airibot-preview.jpg",
              },
              {
                url: "https://autentika.lat/",
                title: "Autentika",
                description: "Solución de autenticación digital",
                tags: ["Landing Page", "Fintech", "Seguridad"],
                color: "#10B981",
                screenshot: "/portfolio/autentika-preview.jpg",
              },
              {
                url: "https://keepi-space-share.lovable.app",
                title: "Keepi Space Share",
                description: "Aplicación para compartir y gestionar espacios",
                tags: ["Web App", "UX/UI", "Marketplace"],
                color: "#F59E0B",
                screenshot: "/portfolio/keepi-preview.jpg",
              },
              {
                url: "https://vibecoders.lat/",
                title: "Vibecoders",
                description: "Agencia de desarrollo de software",
                tags: ["Landing Page", "Agencia", "Tech"],
                color: "#8B5CF6",
                screenshot: "/portfolio/vibecoders-preview.jpg",
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
