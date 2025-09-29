import { ArrowRight, CheckCircle, Bot, Calendar, Clock, Users, TrendingUp, Shield } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Link } from "react-router-dom";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { useLanguage } from "@/contexts/LanguageContext";
import SEO from "@/components/SEO/SEO";
import "../styles/minimal.css";

const PropuestaAgendamiento = () => {
  const { t } = useLanguage();

  return (
    <div className="min-h-screen bg-white">
      <SEO
        title="Propuesta Software de Agendamiento | Builders AI"
        description="Optimiza la atención al cliente y mejora la gestión de tu negocio con nuestras soluciones de automatización con BOTs y software de agendamiento con CRM integrado."
        keywords="software agendamiento, bot whatsapp business, crm integrado, agenda pro, automatización atención cliente, gestión citas, sistema reservas"
        url="https://www.builders-ai.com/propuesta-agendamiento"
      />

      {/* Grid Background */}
      <div className="fixed inset-0 grid-bg pointer-events-none" />

      <Header />

      {/* Hero Section */}
      <section className="relative pt-32 pb-20 px-4">
        <div className="container-narrow">
          <div className="max-w-3xl">
            <h1 className="text-display font-semibold text-gray-900 mb-6">
              Propuesta de Desarrollo de Software de Agendamiento
            </h1>
            <p className="text-subtitle mb-8">
              Con el objetivo de optimizar la atención al cliente, mejorar la gestión del negocio 
              y proyectar el crecimiento hacia un modelo escalable, presentamos dos alternativas:
            </p>
            <div className="space-y-4">
              <div className="flex items-center gap-3">
                <div className="w-2 h-2 bg-blue-600 rounded-full" />
                <p className="text-lg text-gray-700">Automatización de la atención con BOTs en WhatsApp e Instagram</p>
              </div>
              <div className="flex items-center gap-3">
                <div className="w-2 h-2 bg-blue-600 rounded-full" />
                <p className="text-lg text-gray-700">Desarrollo de un software propio estilo Agenda PRO con CRM integrado</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Opción 1: BOT */}
      <section className="py-20 border-t border-gray-100">
        <div className="container-narrow">
          <div className="grid md:grid-cols-2 gap-12 items-start">
            <div>
              <div className="flex items-center gap-3 mb-6">
                <div className="bg-green-100 p-3 rounded-lg">
                  <Bot className="h-8 w-8 text-green-600" />
                </div>
                <h2 className="text-3xl font-semibold text-gray-900">
                  Opción 1: Automatización BOT Atención
                </h2>
              </div>
              <p className="text-lg text-gray-600 mb-8">
                Implementación de un bot inteligente conectado a WhatsApp e Instagram vía API, 
                diseñado para responder con el tono de la marca, evitando parecer un bot rígido.
              </p>

              <div className="mb-8">
                <h3 className="text-xl font-semibold mb-4">Funcionalidades</h3>
                <ul className="space-y-3">
                  <li className="flex items-start gap-2">
                    <CheckCircle className="h-5 w-5 text-green-600 mt-0.5 flex-shrink-0" />
                    <span className="text-gray-600">Conexión con WhatsApp Business API e Instagram API</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle className="h-5 w-5 text-green-600 mt-0.5 flex-shrink-0" />
                    <span className="text-gray-600">Respuestas automáticas basadas en la información del negocio</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle className="h-5 w-5 text-green-600 mt-0.5 flex-shrink-0" />
                    <span className="text-gray-600">Personalización del tono y estilo de comunicación</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle className="h-5 w-5 text-green-600 mt-0.5 flex-shrink-0" />
                    <span className="text-gray-600">Panel editable para actualizar información (horarios, promociones, precios, etc.)</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle className="h-5 w-5 text-green-600 mt-0.5 flex-shrink-0" />
                    <span className="text-gray-600">Posibilidad de intervención manual para tomar el control de la conversación</span>
                  </li>
                </ul>
              </div>

              <div className="mb-8">
                <h3 className="text-xl font-semibold mb-4">Beneficios</h3>
                <ul className="space-y-3">
                  <li className="flex items-start gap-2">
                    <TrendingUp className="h-5 w-5 text-blue-600 mt-0.5 flex-shrink-0" />
                    <span className="text-gray-600">Atención 24/7 a clientes</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <Clock className="h-5 w-5 text-blue-600 mt-0.5 flex-shrink-0" />
                    <span className="text-gray-600">Ahorro de tiempo en consultas repetitivas</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <TrendingUp className="h-5 w-5 text-blue-600 mt-0.5 flex-shrink-0" />
                    <span className="text-gray-600">Incremento en el cierre de turnos y ventas</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <Users className="h-5 w-5 text-blue-600 mt-0.5 flex-shrink-0" />
                    <span className="text-gray-600">Mejora en la experiencia del cliente</span>
                  </li>
                </ul>
              </div>
            </div>

            {/* Pricing Card Opción 1 */}
            <div>
              <Card className="card-minimal p-8 bg-green-50 border-green-200">
                <h3 className="text-2xl font-semibold text-gray-900 mb-6">Condiciones</h3>
                <div className="space-y-4">
                  <div>
                    <p className="text-sm text-gray-500">Fee de implementación</p>
                    <p className="text-3xl font-bold text-gray-900">$850.000 ARS</p>
                    <p className="text-sm text-gray-600 mt-1">50% al comenzar, 50% contra entrega</p>
                  </div>
                  <div className="border-t border-green-200 pt-4">
                    <p className="text-sm text-gray-500">Plazo de implementación</p>
                    <p className="text-xl font-semibold text-gray-900">1 mes</p>
                  </div>
                  <div className="border-t border-green-200 pt-4">
                    <p className="text-sm text-gray-500">Mantenimiento mensual</p>
                    <p className="text-2xl font-bold text-gray-900">$65.000 ARS</p>
                  </div>
                </div>
                <Button className="btn-primary w-full mt-6" onClick={() => window.open("https://calendar.app.google/XXwTHc1qvikRrd2f6", "_blank")}>
                  Agenda una reunión
                </Button>
              </Card>
            </div>
          </div>
        </div>
      </section>

      {/* Opción 2: Software Propio */}
      <section className="py-20 bg-gray-50/50">
        <div className="container-narrow">
          <div className="grid md:grid-cols-2 gap-12 items-start">
            {/* Pricing Card Opción 2 */}
            <div className="md:order-2">
              <Card className="card-minimal p-8 bg-blue-50 border-blue-200">
                <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
                  <span className="bg-blue-600 text-white px-4 py-1 rounded-full text-sm font-medium">
                    Recomendado
                  </span>
                </div>
                <h3 className="text-2xl font-semibold text-gray-900 mb-6 mt-2">Condiciones</h3>
                <div className="space-y-4">
                  <div>
                    <p className="text-sm text-gray-500">Fee de desarrollo</p>
                    <p className="text-3xl font-bold text-gray-900">U$D 3.400</p>
                    <p className="text-sm text-gray-600 mt-1">Posibilidad de pago en 3 cuotas</p>
                  </div>
                  <div className="border-t border-blue-200 pt-4">
                    <p className="text-sm text-gray-500">Tiempo de desarrollo</p>
                    <p className="text-xl font-semibold text-gray-900">3 meses</p>
                  </div>
                  <div className="border-t border-blue-200 pt-4">
                    <p className="text-sm text-gray-500">Costos no incluidos:</p>
                    <ul className="text-sm text-gray-600 mt-1 space-y-1">
                      <li>• Servidor: U$D 20/mes</li>
                      <li>• Base de datos: U$D 20/mes</li>
                    </ul>
                  </div>
                  <div className="border-t border-blue-200 pt-4">
                    <p className="text-sm text-gray-500">Mantenimiento mensual</p>
                    <p className="text-2xl font-bold text-gray-900">$120.000 ARS</p>
                    <p className="text-sm text-gray-600 mt-1">monitoreo de errores y actualizaciones</p>
                  </div>
                </div>
                <Button className="btn-primary w-full mt-6" onClick={() => window.open("https://calendar.app.google/XXwTHc1qvikRrd2f6", "_blank")}>
                  Agenda una reunión
                </Button>
              </Card>
            </div>

            <div className="md:order-1">
              <div className="flex items-center gap-3 mb-6">
                <div className="bg-blue-100 p-3 rounded-lg">
                  <Calendar className="h-8 w-8 text-blue-600" />
                </div>
                <h2 className="text-3xl font-semibold text-gray-900">
                  Opción 2: Desarrollo de Software Propio
                </h2>
              </div>
              <p className="text-lg text-gray-600 mb-2">
                Desarrollo a medida de un sistema moderno, modular y escalable basado en React, 
                pensado para administrar el negocio, franquicias y futuras expansiones.
              </p>
              <p className="text-base font-medium text-blue-600 mb-8">
                (CRM + Agenda PRO)
              </p>

              <div className="mb-8">
                <h3 className="text-xl font-semibold mb-4">Funcionalidades Principales</h3>
                <ul className="space-y-3">
                  <li className="flex items-start gap-2">
                    <CheckCircle className="h-5 w-5 text-green-600 mt-0.5 flex-shrink-0" />
                    <span className="text-gray-600">Usuarios ilimitados con roles (Admin, Gerente, Empleado)</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle className="h-5 w-5 text-green-600 mt-0.5 flex-shrink-0" />
                    <span className="text-gray-600">Permisos por rol para control de accesos</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle className="h-5 w-5 text-green-600 mt-0.5 flex-shrink-0" />
                    <span className="text-gray-600">Gestión de franquicias/locales con estadísticas separadas</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle className="h-5 w-5 text-green-600 mt-0.5 flex-shrink-0" />
                    <span className="text-gray-600">Agenda con calendario interactivo, recordatorios automáticos vía WhatsApp</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle className="h-5 w-5 text-green-600 mt-0.5 flex-shrink-0" />
                    <span className="text-gray-600">Ficha de clientes con historial de servicios, turnos, notas y preferencias</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle className="h-5 w-5 text-green-600 mt-0.5 flex-shrink-0" />
                    <span className="text-gray-600">Gestión de productos con inventario y catálogo estilo tienda online</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle className="h-5 w-5 text-green-600 mt-0.5 flex-shrink-0" />
                    <span className="text-gray-600">Administración: integración con Mercado Pago y facturación AFIP</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle className="h-5 w-5 text-green-600 mt-0.5 flex-shrink-0" />
                    <span className="text-gray-600">Reportes: métricas de clientes, ventas, comparaciones y análisis</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle className="h-5 w-5 text-green-600 mt-0.5 flex-shrink-0" />
                    <span className="text-gray-600 font-semibold">Incluye todo lo de la Opción 1 (automatización de bots)</span>
                  </li>
                </ul>
              </div>

              <div>
                <h3 className="text-xl font-semibold mb-4">Beneficios</h3>
                <ul className="space-y-3">
                  <li className="flex items-start gap-2">
                    <TrendingUp className="h-5 w-5 text-blue-600 mt-0.5 flex-shrink-0" />
                    <span className="text-gray-600">Crecimiento sin límites, sin depender de terceros</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <Shield className="h-5 w-5 text-blue-600 mt-0.5 flex-shrink-0" />
                    <span className="text-gray-600">Costos mensuales previsibles y bajos</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <Users className="h-5 w-5 text-blue-600 mt-0.5 flex-shrink-0" />
                    <span className="text-gray-600">Control total sobre clientes, agenda, facturación y franquicias</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <TrendingUp className="h-5 w-5 text-blue-600 mt-0.5 flex-shrink-0" />
                    <span className="text-gray-600">Escalabilidad para agregar nuevas funciones en el futuro</span>
                  </li>
                </ul>
              </div>
            </div>
          </div>

          {/* Ventaja adicional */}
          <div className="mt-16 p-8 bg-blue-50 rounded-2xl border border-blue-200">
            <h3 className="text-xl font-semibold text-gray-900 mb-4">
              💡 Ventaja del Sistema Propio
            </h3>
            <p className="text-gray-700">
              La ventaja de este tipo de sistema propio es que les permite crecer de manera ilimitada, 
              ya que los costos mensuales se mantienen, y no tienen que depender de sistemas de terceros 
              que puedan cambiar sus precios cuando quieren y donde deben pagar por cada usuario que 
              vayan agregando o cada funcionalidad.
            </p>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-blue-50">
        <div className="container-narrow">
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="text-3xl font-semibold text-gray-900 mb-6">
              ¿Listo para optimizar tu negocio?
            </h2>
            <p className="text-lg text-gray-600 mb-8">
              Agenda una reunión para discutir cuál opción se adapta mejor a las necesidades 
              de tu negocio. Te ayudaremos a tomar la mejor decisión.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button
                className="btn-primary px-8 py-3"
                onClick={() => window.open("https://calendar.app.google/XXwTHc1qvikRrd2f6", "_blank")}
              >
                Agendar reunión <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
              <Button
                variant="outline"
                className="px-8 py-3"
                onClick={() => window.location.href = "/propuesta-con-precios"}
              >
                Ver más propuestas
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
              Veamos algunos ejemplos reales
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
              <div className="bg-gray-100 rounded-xl p-4 text-center md:order-1">
                <img 
                  src="/assets/icons/botliti.png" 
                  alt="Bot WhatsApp Despacho Legal - Asistente virtual para abogados"
                  className="w-full h-auto rounded-lg shadow-sm"
                />
              </div>
              <div className="md:order-2">
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
            </div>
          </div>
        </div>
      </section>

      {/* Video Section */}
      <section className="py-20 bg-gray-50/50">
        <div className="container-narrow">
          <div className="max-w-4xl mx-auto text-center">
            <h3 className="text-3xl font-semibold text-gray-900 mb-4">
              Conoce más sobre cómo podemos ayudarte
            </h3>
            <p className="text-lg text-gray-600 mb-8">
              Mira este video donde te explico en detalle nuestro proceso y cómo podemos transformar tu negocio
            </p>
            <div className="relative rounded-2xl overflow-hidden shadow-lg bg-gray-100">
              <div style={{ position: "relative", paddingBottom: "56.25%", height: 0 }}>
                <iframe 
                  style={{ position: "absolute", top: 0, left: 0, width: "100%", height: "100%", border: 0 }} 
                  src="https://www.tella.tv/video/cmfqwbw0y000u0bi57nvafgrr/embed?b=0&title=0&a=1&loop=0&autoPlay=true&t=0&muted=1&wt=0" 
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                  allowFullScreen={true}
                  title="Video presentación - Cómo podemos ayudarte"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Portfolio Section */}
      <section className="py-20 border-t border-gray-100">
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

      <Footer />
    </div>
  );
};

export default PropuestaAgendamiento;