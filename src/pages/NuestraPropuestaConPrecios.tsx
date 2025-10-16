import { ArrowRight, CheckCircle, ExternalLink, Code2, Zap, Bot, HelpCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Tooltip, TooltipContent, TooltipTrigger } from "@/components/ui/tooltip";
import { Link } from "react-router-dom";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { useLanguage } from "@/contexts/LanguageContext";
import SEO from "@/components/SEO/SEO";
import "../styles/minimal.css";

const NuestraPropuestaConPrecios = () => {
  const { t } = useLanguage();

  return (
    <div className="min-h-screen bg-white">
      <SEO
        title="Nuestra Propuesta con Precios | Builders AI - Automatización y Desarrollo de Software"
        description="Simplificamos las operaciones de tu negocio mediante automatización inteligente, desarrollo de software personalizado y asistentes con IA. Conoce nuestros planes Partner Tech con precios transparentes."
        keywords="automatización empresarial, desarrollo software personalizado, bots whatsapp, asistentes IA, CRM personalizado, automatizar facturas, automatización procesos, precios planes tech"
        url="https://www.builders-ai.com/propuesta-con-precios"
      />

      {/* Grid Background */}
      <div className="fixed inset-0 grid-bg pointer-events-none" />

      <Header />

      {/* Hero Section - Nuestra Propuesta */}
      <section className="relative pt-32 pb-20 px-4">
        <div className="container-narrow">
          <div className="max-w-3xl">
            <h1 className="text-display font-semibold text-gray-900 mb-6">
              Nuestra Propuesta
            </h1>
            <p className="text-subtitle mb-8">
              Nos enfocamos en ayudar a nuestros clientes a simplicar sus operaciones 
              en el día a día, identificar qué procesos son los que se pueden automatizar 
              para lograr un ahorro real en tiempo y por lo tanto dinero.
            </p>
          </div>
        </div>
      </section>

      {/* Cómo lo hacemos Section */}
      <section className="py-20 border-t border-gray-100">
        <div className="container-narrow">
          <div className="max-w-2xl mb-8">
            <h2 className="text-4xl font-semibold text-gray-900 mb-4">
              ¿Cómo lo hacemos?
            </h2>
            <p className="text-lg text-gray-600">
              Conversando, reuniones virtuales 1:1 para enteder el funcionamiento 
              de tu negocio, identificar ese dolor o tarea que no es tu actividad 
              principal pero que te quita a vos o tus empleados tiempo valioso cada día.
            </p>
          </div>
        </div>
      </section>

      {/* Qué podemos hacer Section */}
      <section className="py-20 bg-gray-50/50">
        <div className="container-narrow">
          <div className="max-w-2xl mb-16">
            <h2 className="text-4xl font-semibold text-gray-900 mb-4">
              ¿Qué podemos hacer?
            </h2>
            <p className="text-lg text-gray-600">
              Desde desarrollo de Software, automatizaciones y bot/asistentes virtuales 
              con IA (sí, sabemos de IA bien aplicada). Para ser más concretos y entender 
              cada uno de estos servicios:
            </p>
          </div>

          <div className="space-y-16">
            {/* Software */}
            <div className="service-section">
              <div className="flex items-center gap-4 mb-4">
                <div className="service-icon">
                  <Code2 className="h-6 w-6 text-blue-600" />
                </div>
                <h3 className="text-3xl font-semibold text-gray-900">
                  Software
                </h3>
              </div>
              <p className="text-lg text-gray-600 mb-8 max-w-3xl">
                En este caso podemos desarrollar desde un website, ecommerce, hasta 
                herramientas internas estilo CRMs, aplicaciones para usuarios o cualquier 
                tipo de app o herramienta que se te ocurra.
              </p>
            </div>

            {/* Automatizaciones */}
            <div className="service-section">
              <div className="flex items-center gap-4 mb-4">
                <div className="service-icon">
                  <Zap className="h-6 w-6 text-yellow-600" />
                </div>
                <h3 className="text-3xl font-semibold text-gray-900">
                  Automatizaciones
                </h3>
              </div>
              <p className="text-lg text-gray-600 mb-8 max-w-3xl">
                Lo que te imagines, por ejemplo, automatizar la extracción de datos de 
                facturas para cargar en un sistema determinado, automatizar generación 
                de contenido (imágenes o videos), automatizar mailing, llamadas y más.
              </p>
            </div>

            {/* Bots o Asistentes */}
            <div className="service-section">
              <div className="flex items-center gap-4 mb-4">
                <div className="service-icon">
                  <Bot className="h-6 w-6 text-green-600" />
                </div>
                <h3 className="text-3xl font-semibold text-gray-900">
                  Bots o Asistentes
                </h3>
              </div>
              <p className="text-lg text-gray-600 mb-8 max-w-3xl">
                Pueden ser de los que funcionan con Whatsapp para atender a tus clientes 
                o asistentes virtuales que funcionan como tu secretario privado y puede 
                realizar acciones con tu casilla de email, mensajes, base de datos, documentos.
              </p>
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

      {/* Pricing Section - NEW */}
      <section className="py-20 bg-gray-50/50 border-t border-gray-100">
        <div className="container-narrow">
          <div className="max-w-2xl mb-16 text-center mx-auto">
            <h2 className="text-4xl font-semibold text-gray-900 mb-4">
              Nuestros Planes Partner Tech
            </h2>
            <p className="text-lg text-gray-600">
              Planes mensuales diseñados para ser tu socio tecnológico de confianza
            </p>
            <p className="text-sm text-gray-500 mt-2">
              *Todos los precios están expresados en Pesos Argentinos - No hay otros costos ocultos
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {/* Partner Tech Basic */}
            <Card className="card-minimal relative p-8">
              <div className="mb-6">
                <h3 className="text-2xl font-semibold text-gray-900 mb-2">
                  Partner Tech Basic
                </h3>
                <div className="text-3xl font-bold text-blue-600 mb-4">
                  $320.000
                  <span className="text-lg font-normal text-gray-600">/mes</span>
                </div>
              </div>
              <div className="space-y-3 mb-8">
                <div className="flex items-start gap-2">
                  <CheckCircle className="h-5 w-5 text-green-600 mt-0.5 flex-shrink-0" />
                  <span className="text-gray-600">Socio tecnológico para corrección de problemas técnicos</span>
                </div>
                <div className="flex items-start gap-2">
                  <CheckCircle className="h-5 w-5 text-green-600 mt-0.5 flex-shrink-0" />
                  <span className="text-gray-600">SEO básico (revisión de SEO On Page)</span>
                </div>
                <div className="flex items-start gap-2">
                  <CheckCircle className="h-5 w-5 text-green-600 mt-0.5 flex-shrink-0" />
                  <div className="flex items-center gap-2">
                    <span className="text-gray-600">Creación de 1 automatización</span>
                    <Tooltip>
                      <TooltipTrigger asChild>
                        <button type="button" className="inline-flex">
                          <HelpCircle className="h-4 w-4 text-gray-400 hover:text-gray-600" />
                        </button>
                      </TooltipTrigger>
                      <TooltipContent>
                        <p className="max-w-xs">Por ejemplo automatizar carga de facturas, de documentación, crear presentaciones, mensajes, etc</p>
                      </TooltipContent>
                    </Tooltip>
                  </div>
                </div>
                <div className="flex items-start gap-2">
                  <CheckCircle className="h-5 w-5 text-green-600 mt-0.5 flex-shrink-0" />
                  <span className="text-gray-600">Asesoramiento de consultas técnicas</span>
                </div>
              </div>
            </Card>

            {/* Partner Tech Intermediate */}
            <Card className="card-minimal relative p-8 ring-2 ring-blue-600">
              <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
                <span className="bg-blue-600 text-white px-4 py-1 rounded-full text-sm font-medium">
                  Más Popular
                </span>
              </div>
              <div className="mb-6">
                <h3 className="text-2xl font-semibold text-gray-900 mb-2">
                  Partner Tech Intermediate
                </h3>
                <div className="text-3xl font-bold text-blue-600 mb-4">
                  $490.000
                  <span className="text-lg font-normal text-gray-600">/mes</span>
                </div>
              </div>
              <div className="space-y-3 mb-8">
                <div className="flex items-start gap-2">
                  <CheckCircle className="h-5 w-5 text-green-600 mt-0.5 flex-shrink-0" />
                  <span className="text-gray-600">Todo lo del plan Basic</span>
                </div>
                <div className="flex items-start gap-2">
                  <CheckCircle className="h-5 w-5 text-green-600 mt-0.5 flex-shrink-0" />
                  <div className="flex items-center gap-2">
                    <span className="text-gray-600">Investigación de palabras claves para mejoras en posicionamiento</span>
                    <Tooltip>
                      <TooltipTrigger asChild>
                        <button type="button" className="inline-flex">
                          <HelpCircle className="h-4 w-4 text-gray-400 hover:text-gray-600" />
                        </button>
                      </TooltipTrigger>
                      <TooltipContent>
                        <p className="max-w-xs">Esto es lo que ayudará a que su sitio comience a tener mejor posicionamiento en Google en su sector</p>
                      </TooltipContent>
                    </Tooltip>
                  </div>
                </div>
                <div className="flex items-start gap-2">
                  <CheckCircle className="h-5 w-5 text-green-600 mt-0.5 flex-shrink-0" />
                  <span className="text-gray-600">Sistema de creación de artículos (hasta 4 mensuales)</span>
                </div>
                <div className="flex items-start gap-2">
                  <CheckCircle className="h-5 w-5 text-green-600 mt-0.5 flex-shrink-0" />
                  <span className="text-gray-600">Mejoras en diseño y velocidad del sitio web</span>
                </div>
                <div className="flex items-start gap-2">
                  <CheckCircle className="h-5 w-5 text-green-600 mt-0.5 flex-shrink-0" />
                  <span className="text-gray-600">Desarrollo de hasta 1 nueva sección o landing page</span>
                </div>
                <div className="flex items-start gap-2">
                  <CheckCircle className="h-5 w-5 text-green-600 mt-0.5 flex-shrink-0" />
                  <div className="flex items-center gap-2">
                    <span className="text-gray-600">Asistente virtual a medida por WhatsApp</span>
                    <Tooltip>
                      <TooltipTrigger asChild>
                        <button type="button" className="inline-flex">
                          <HelpCircle className="h-4 w-4 text-gray-400 hover:text-gray-600" />
                        </button>
                      </TooltipTrigger>
                      <TooltipContent>
                        <p className="max-w-xs">Puede ser un asistente de uso interno que por ejemplo lo use a modo de recordatorios, conectar con sus sistemas y poder obtener información rápidamente o un asistente que atienda a sus clientes</p>
                      </TooltipContent>
                    </Tooltip>
                  </div>
                </div>
                <div className="flex items-start gap-2">
                  <CheckCircle className="h-5 w-5 text-green-600 mt-0.5 flex-shrink-0" />
                  <span className="text-gray-600">Mantenimiento completo</span>
                </div>
              </div>
            </Card>

            {/* Partner Tech VIP */}
            <Card className="card-minimal relative p-8">
              <div className="mb-6">
                <h3 className="text-2xl font-semibold text-gray-900 mb-2">
                  Partner Tech VIP
                </h3>
                <div className="text-3xl font-bold text-blue-600 mb-4">
                  $750.000
                  <span className="text-lg font-normal text-gray-600">/mes</span>
                </div>
              </div>
              <div className="space-y-3 mb-8">
                <div className="flex items-start gap-2">
                  <CheckCircle className="h-5 w-5 text-green-600 mt-0.5 flex-shrink-0" />
                  <span className="text-gray-600">Todo lo del Basic e Intermediate</span>
                </div>
                <div className="flex items-start gap-2">
                  <CheckCircle className="h-5 w-5 text-green-600 mt-0.5 flex-shrink-0" />
                  <span className="text-gray-600">Sistema de generación de artículos ilimitados</span>
                </div>
                <div className="flex items-start gap-2">
                  <CheckCircle className="h-5 w-5 text-green-600 mt-0.5 flex-shrink-0" />
                  <span className="text-gray-600">Desarrollo de automatizaciones ilimitadas</span>
                </div>
                <div className="flex items-start gap-2">
                  <CheckCircle className="h-5 w-5 text-green-600 mt-0.5 flex-shrink-0" />
                  <div className="flex items-center gap-2">
                    <span className="text-gray-600">Desarrollo de hasta 1 sistema durante la contratación</span>
                    <Tooltip>
                      <TooltipTrigger asChild>
                        <button type="button" className="inline-flex">
                          <HelpCircle className="h-4 w-4 text-gray-400 hover:text-gray-600" />
                        </button>
                      </TooltipTrigger>
                      <TooltipContent>
                        <p className="max-w-xs">Durante el tiempo de contratación se podrá desarrollar hasta 1 herramienta o app que necesite para uso interno, por ejemplo un CRM o similar</p>
                      </TooltipContent>
                    </Tooltip>
                  </div>
                </div>
                <div className="flex items-start gap-2">
                  <CheckCircle className="h-5 w-5 text-green-600 mt-0.5 flex-shrink-0" />
                  <span className="text-gray-600">Asesoramiento en publicidad</span>
                </div>
                <div className="flex items-start gap-2">
                  <CheckCircle className="h-5 w-5 text-green-600 mt-0.5 flex-shrink-0" />
                  <div className="flex items-center gap-2">
                    <span className="text-gray-600">Hasta dos sesiones mensuales de 1 hora para aprender IA</span>
                    <Tooltip>
                      <TooltipTrigger asChild>
                        <button type="button" className="inline-flex">
                          <HelpCircle className="h-4 w-4 text-gray-400 hover:text-gray-600" />
                        </button>
                      </TooltipTrigger>
                      <TooltipContent>
                        <p className="max-w-xs">Capacitamos a su equipo en el uso de herramientas de IA para mayor eficiencia en el trabajo y autonomía</p>
                      </TooltipContent>
                    </Tooltip>
                  </div>
                </div>
              </div>
            </Card>
          </div>

          {/* Contract Terms */}
          <div className="mt-12 p-6 bg-yellow-50 border border-yellow-200 rounded-lg">
            <div className="flex items-start gap-3">
              <div className="w-6 h-6 bg-yellow-400 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                <span className="text-yellow-800 text-sm font-bold">!</span>
              </div>
              <div>
                <h4 className="font-semibold text-yellow-800 mb-2">Términos de Contratación</h4>
                <p className="text-yellow-700">
                  <strong>Tiempo mínimo de contratación:</strong> 3 meses. En caso de querer rescindir 
                  antes de ese tiempo se deberá pagar el equivalente a un mes del plan contratado.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Video Section */}
      <section className="py-20 bg-white">
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

      <Footer />
    </div>
  );
};

export default NuestraPropuestaConPrecios;