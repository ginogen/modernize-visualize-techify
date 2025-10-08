import { ArrowRight, CheckCircle, Mail, Search, TrendingUp } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import SEO from "@/components/SEO/SEO";
import "../styles/minimal.css";

const PropuestaServiciosISO = () => {
  return (
    <div className="min-h-screen bg-white">
      <SEO
        title="Propuesta Servicios ISO - Generación y Captación de Clientes B2B | Builders AI"
        description="Propuesta integral de prospección B2B: Call to Mail Marketing, SEO orgánico y Google Ads para captar clientes potenciales de forma constante y escalable."
        keywords="prospección b2b, call to mail marketing, seo, google ads, captación clientes, marketing b2b, builders ai"
        url="https://www.builders-ai.com/propuesta-servicios-iso"
      />

      <div className="fixed inset-0 grid-bg pointer-events-none" />

      <Header />

      <section className="relative pt-32 pb-20 px-4">
        <div className="container-narrow">
          <div className="max-w-3xl">
            <h1 className="text-display font-semibold text-gray-900 mb-6">
              Propuesta de Servicio: Generación y Captación de Clientes B2B
            </h1>
            <p className="text-subtitle mb-8">
              Sistema integral de prospección B2B que permite captar clientes potenciales de forma constante y escalable a través de estrategias combinadas de Cold EmailMarketing, SEO orgánico y Google Ads.
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
                Agendar Consulta <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </div>
          </div>
        </div>
      </section>

      <section className="py-20 bg-gray-50/50">
        <div className="container-narrow">
          <div className="max-w-3xl mb-12">
            <h2 className="text-4xl font-semibold text-gray-900 mb-4">
              Objetivo General
            </h2>
            <p className="text-lg text-gray-600">
              El enfoque está orientado a generar oportunidades calificadas, aumentar la visibilidad de la marca y establecer una presencia sólida tanto en canales de contacto directo como en búsquedas orgánicas y pagas.
            </p>
          </div>
        </div>
      </section>

      <section className="py-20">
        <div className="container-narrow">
          <div className="space-y-16">
            
            <div className="service-section">
              <div className="flex items-center gap-3 mb-6">
                <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center">
                  <Mail className="h-6 w-6 text-blue-600" />
                </div>
                <h2 className="text-3xl font-semibold text-gray-900">
                  Estrategia 1: Cold Email Marketing
                </h2>
              </div>
              
              <p className="text-lg text-gray-600 mb-8 max-w-3xl">
                Infraestructura de envío de correos de prospección masiva controlada, utilizando subdominios dedicados y cuentas configuradas exclusivamente para esta operación. Objetivo: alcanzar volúmenes óptimos de envío diario manteniendo una excelente reputación de dominio.
              </p>

              <div className="bg-gray-50/50 rounded-12 p-8 mb-8">
                <h3 className="text-xl font-semibold mb-6 text-gray-900">Fases del Proyecto</h3>
                
                <div className="space-y-8">
                  <div>
                    <h4 className="font-semibold text-gray-900 mb-4 flex items-center gap-2">
                      <span className="bg-blue-600 text-white w-6 h-6 rounded-full flex items-center justify-center text-sm">1</span>
                      Configuración Técnica e Infraestructura
                    </h4>
                    <div className="space-y-3 ml-8">
                      <div className="flex items-start gap-3">
                        <CheckCircle className="h-5 w-5 text-blue-600 mt-0.5 flex-shrink-0" />
                        <span className="text-gray-700">Creación de 4 subdominios (ej: contact1.empresa.com, contact2.empresa.com) para proteger el dominio principal</span>
                      </div>
                      <div className="flex items-start gap-3">
                        <CheckCircle className="h-5 w-5 text-blue-600 mt-0.5 flex-shrink-0" />
                        <span className="text-gray-700">Configuración de DNS, registros SPF, DKIM y DMARC para garantizar autenticación de envío</span>
                      </div>
                      <div className="flex items-start gap-3">
                        <CheckCircle className="h-5 w-5 text-blue-600 mt-0.5 flex-shrink-0" />
                        <span className="text-gray-700">Creación y verificación de 4 cuentas de correo independientes</span>
                      </div>
                      <div className="flex items-start gap-3">
                        <CheckCircle className="h-5 w-5 text-blue-600 mt-0.5 flex-shrink-0" />
                        <span className="text-gray-700">Integración con herramienta de automatización de envíos (ej. Instantly, Smartlead, Lemlist o similar)</span>
                      </div>
                    </div>
                  </div>

                  <div>
                    <h4 className="font-semibold text-gray-900 mb-4 flex items-center gap-2">
                      <span className="bg-blue-600 text-white w-6 h-6 rounded-full flex items-center justify-center text-sm">2</span>
                      Etapa de Warm-Up (Calentamiento de Dominios)
                    </h4>
                    <div className="space-y-3 ml-8">
                      <div className="flex items-start gap-3">
                        <CheckCircle className="h-5 w-5 text-blue-600 mt-0.5 flex-shrink-0" />
                        <span className="text-gray-700"><strong>Duración aproximada:</strong> 3 semanas</span>
                      </div>
                      <div className="flex items-start gap-3">
                        <CheckCircle className="h-5 w-5 text-blue-600 mt-0.5 flex-shrink-0" />
                        <span className="text-gray-700">Envío progresivo de entre 5 y 10 correos diarios por cuenta, sin links ni propuestas comerciales</span>
                      </div>
                      <div className="flex items-start gap-3">
                        <CheckCircle className="h-5 w-5 text-blue-600 mt-0.5 flex-shrink-0" />
                        <span className="text-gray-700">Correos de presentación o contacto suave, enfocados en iniciar conversación o generar confianza</span>
                      </div>
                      <div className="flex items-start gap-3">
                        <CheckCircle className="h-5 w-5 text-blue-600 mt-0.5 flex-shrink-0" />
                        <span className="text-gray-700">Monitoreo constante de tasa de apertura, rebotes y reputación del dominio</span>
                      </div>
                    </div>
                  </div>

                  <div>
                    <h4 className="font-semibold text-gray-900 mb-4 flex items-center gap-2">
                      <span className="bg-blue-600 text-white w-6 h-6 rounded-full flex items-center justify-center text-sm">3</span>
                      Generación y Segmentación de Leads
                    </h4>
                    <div className="space-y-3 ml-8">
                      <div className="flex items-start gap-3">
                        <CheckCircle className="h-5 w-5 text-blue-600 mt-0.5 flex-shrink-0" />
                        <span className="text-gray-700">Investigación ("Research") del perfil del cliente ideal (ICP): sector, tamaño, cargo, país o región</span>
                      </div>
                      <div className="flex items-start gap-3">
                        <CheckCircle className="h-5 w-5 text-blue-600 mt-0.5 flex-shrink-0" />
                        <span className="text-gray-700">Uso de herramientas de scraping y enriquecimiento de datos para obtener e-mails verificados de tomadores de decisión</span>
                      </div>
                      <div className="flex items-start gap-3">
                        <CheckCircle className="h-5 w-5 text-blue-600 mt-0.5 flex-shrink-0" />
                        <span className="text-gray-700">Filtrado de base de datos para evitar duplicados o correos no válidos</span>
                      </div>
                    </div>
                  </div>

                  <div>
                    <h4 className="font-semibold text-gray-900 mb-4 flex items-center gap-2">
                      <span className="bg-blue-600 text-white w-6 h-6 rounded-full flex items-center justify-center text-sm">4</span>
                      Creación de Secuencias de Contacto
                    </h4>
                    <div className="space-y-3 ml-8">
                      <div className="flex items-start gap-3">
                        <CheckCircle className="h-5 w-5 text-blue-600 mt-0.5 flex-shrink-0" />
                        <span className="text-gray-700">Diseño de secuencias automatizadas de entre 1 y 6 e-mails, distribuidas en lapsos de 3 a 5 días</span>
                      </div>
                      <div className="flex items-start gap-3">
                        <CheckCircle className="h-5 w-5 text-blue-600 mt-0.5 flex-shrink-0" />
                        <span className="text-gray-700"><strong>Primer contacto:</strong> introducción y valor diferencial</span>
                      </div>
                      <div className="flex items-start gap-3">
                        <CheckCircle className="h-5 w-5 text-blue-600 mt-0.5 flex-shrink-0" />
                        <span className="text-gray-700"><strong>Segundo y tercer e-mail:</strong> ejemplos, testimonios o casos</span>
                      </div>
                      <div className="flex items-start gap-3">
                        <CheckCircle className="h-5 w-5 text-blue-600 mt-0.5 flex-shrink-0" />
                        <span className="text-gray-700"><strong>Últimos contactos:</strong> llamada a la acción (reserva de llamada o reunión)</span>
                      </div>
                      <div className="flex items-start gap-3">
                        <CheckCircle className="h-5 w-5 text-blue-600 mt-0.5 flex-shrink-0" />
                        <span className="text-gray-700">Optimización de asunto, estructura y copywriting para maximizar la tasa de respuesta</span>
                      </div>
                    </div>
                  </div>

                  <div>
                    <h4 className="font-semibold text-gray-900 mb-4 flex items-center gap-2">
                      <span className="bg-blue-600 text-white w-6 h-6 rounded-full flex items-center justify-center text-sm">5</span>
                      Métricas y Reportes
                    </h4>
                    <div className="space-y-3 ml-8">
                      <div className="flex items-start gap-3">
                        <CheckCircle className="h-5 w-5 text-blue-600 mt-0.5 flex-shrink-0" />
                        <span className="text-gray-700">Seguimiento de aperturas, clics, respuestas y rebotes</span>
                      </div>
                      <div className="flex items-start gap-3">
                        <CheckCircle className="h-5 w-5 text-blue-600 mt-0.5 flex-shrink-0" />
                        <span className="text-gray-700">Reporte semanal con performance y ajuste de secuencias</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="service-section">
              <div className="flex items-center gap-3 mb-6">
                <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center">
                  <Search className="h-6 w-6 text-green-600" />
                </div>
                <h2 className="text-3xl font-semibold text-gray-900">
                  Estrategia 2: Posicionamiento Orgánico (SEO)
                </h2>
              </div>
              
              <p className="text-lg text-gray-600 mb-8 max-w-3xl">
                Captar clientes que buscan activamente los servicios de la empresa a través de Google, mediante optimización técnica, de contenido y autoridad del sitio web.
              </p>

              <div className="bg-gray-50/50 rounded-12 p-8 mb-8">
                <h3 className="text-xl font-semibold mb-6 text-gray-900">Acciones Propuestas</h3>
                
                <div className="space-y-6">
                  <div>
                    <h4 className="font-semibold text-gray-900 mb-3">Auditoría SEO técnica:</h4>
                    <div className="space-y-2 ml-4">
                      <div className="flex items-start gap-3">
                        <CheckCircle className="h-5 w-5 text-green-600 mt-0.5 flex-shrink-0" />
                        <span className="text-gray-700">Velocidad de carga, estructura, URLs, enlaces internos y externos</span>
                      </div>
                      <div className="flex items-start gap-3">
                        <CheckCircle className="h-5 w-5 text-green-600 mt-0.5 flex-shrink-0" />
                        <span className="text-gray-700">Revisión de metadatos, sitemap y estructura de encabezados</span>
                      </div>
                    </div>
                  </div>

                  <div>
                    <h4 className="font-semibold text-gray-900 mb-3">Optimización On-Page:</h4>
                    <div className="space-y-2 ml-4">
                      <div className="flex items-start gap-3">
                        <CheckCircle className="h-5 w-5 text-green-600 mt-0.5 flex-shrink-0" />
                        <span className="text-gray-700">Redacción o mejora de textos en secciones clave</span>
                      </div>
                      <div className="flex items-start gap-3">
                        <CheckCircle className="h-5 w-5 text-green-600 mt-0.5 flex-shrink-0" />
                        <span className="text-gray-700">Optimización de palabras clave (keywords) con volumen de búsqueda comprobado</span>
                      </div>
                      <div className="flex items-start gap-3">
                        <CheckCircle className="h-5 w-5 text-green-600 mt-0.5 flex-shrink-0" />
                        <span className="text-gray-700">Mejora de imágenes, titles, meta descriptions y estructura de enlaces</span>
                      </div>
                    </div>
                  </div>

                  <div>
                    <h4 className="font-semibold text-gray-900 mb-3">Estrategia de Contenido:</h4>
                    <div className="space-y-2 ml-4">
                      <div className="flex items-start gap-3">
                        <CheckCircle className="h-5 w-5 text-green-600 mt-0.5 flex-shrink-0" />
                        <span className="text-gray-700">Creación de artículos o secciones orientadas a keywords con intención comercial</span>
                      </div>
                      <div className="flex items-start gap-3">
                        <CheckCircle className="h-5 w-5 text-green-600 mt-0.5 flex-shrink-0" />
                        <span className="text-gray-700">Calendario de publicación mensual</span>
                      </div>
                    </div>
                  </div>

                  <div>
                    <h4 className="font-semibold text-gray-900 mb-3">Estrategia Off-Page:</h4>
                    <div className="space-y-2 ml-4">
                      <div className="flex items-start gap-3">
                        <CheckCircle className="h-5 w-5 text-green-600 mt-0.5 flex-shrink-0" />
                        <span className="text-gray-700">Creación gradual de enlaces externos (backlinks) de calidad</span>
                      </div>
                    </div>
                  </div>

                  <div>
                    <h4 className="font-semibold text-gray-900 mb-3">Seguimiento y métricas:</h4>
                    <div className="space-y-2 ml-4">
                      <div className="flex items-start gap-3">
                        <CheckCircle className="h-5 w-5 text-green-600 mt-0.5 flex-shrink-0" />
                        <span className="text-gray-700">Posiciones por keyword, tráfico orgánico y conversiones</span>
                      </div>
                      <div className="flex items-start gap-3">
                        <CheckCircle className="h-5 w-5 text-green-600 mt-0.5 flex-shrink-0" />
                        <span className="text-gray-700">Reporte mensual de evolución</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="service-section">
              <div className="flex items-center gap-3 mb-6">
                <div className="w-12 h-12 bg-purple-100 rounded-full flex items-center justify-center">
                  <TrendingUp className="h-6 w-6 text-purple-600" />
                </div>
                <h2 className="text-3xl font-semibold text-gray-900">
                  Estrategia 3: Campañas en Google Ads
                </h2>
              </div>
              
              <p className="text-lg text-gray-600 mb-8 max-w-3xl">
                Captar tráfico calificado de usuarios y empresas que buscan activamente los servicios ofrecidos, complementando la estrategia orgánica con resultados inmediatos.
              </p>

              <div className="bg-gray-50/50 rounded-12 p-8 mb-8">
                <h3 className="text-xl font-semibold mb-6 text-gray-900">Etapas</h3>
                
                <div className="space-y-6">
                  <div>
                    <h4 className="font-semibold text-gray-900 mb-3">Análisis de Keywords y Competencia:</h4>
                    <div className="space-y-2 ml-4">
                      <div className="flex items-start gap-3">
                        <CheckCircle className="h-5 w-5 text-purple-600 mt-0.5 flex-shrink-0" />
                        <span className="text-gray-700">Identificación de términos con alto potencial de conversión</span>
                      </div>
                      <div className="flex items-start gap-3">
                        <CheckCircle className="h-5 w-5 text-purple-600 mt-0.5 flex-shrink-0" />
                        <span className="text-gray-700">Evaluación de costos por clic (CPC) y competencia publicitaria</span>
                      </div>
                    </div>
                  </div>

                  <div>
                    <h4 className="font-semibold text-gray-900 mb-3">Configuración de Campañas:</h4>
                    <div className="space-y-2 ml-4">
                      <div className="flex items-start gap-3">
                        <CheckCircle className="h-5 w-5 text-purple-600 mt-0.5 flex-shrink-0" />
                        <span className="text-gray-700">Creación de grupos de anuncios segmentados</span>
                      </div>
                      <div className="flex items-start gap-3">
                        <CheckCircle className="h-5 w-5 text-purple-600 mt-0.5 flex-shrink-0" />
                        <span className="text-gray-700">Redacción de títulos y descripciones atractivas</span>
                      </div>
                      <div className="flex items-start gap-3">
                        <CheckCircle className="h-5 w-5 text-purple-600 mt-0.5 flex-shrink-0" />
                        <span className="text-gray-700">Configuración de conversiones y seguimiento con Google Tag Manager</span>
                      </div>
                    </div>
                  </div>

                  <div>
                    <h4 className="font-semibold text-gray-900 mb-3">Optimización Continua (3 meses iniciales):</h4>
                    <div className="space-y-2 ml-4">
                      <div className="flex items-start gap-3">
                        <CheckCircle className="h-5 w-5 text-purple-600 mt-0.5 flex-shrink-0" />
                        <span className="text-gray-700">Ajuste de pujas, exclusión de keywords negativas</span>
                      </div>
                      <div className="flex items-start gap-3">
                        <CheckCircle className="h-5 w-5 text-purple-600 mt-0.5 flex-shrink-0" />
                        <span className="text-gray-700">A/B testing de anuncios y páginas de destino</span>
                      </div>
                      <div className="flex items-start gap-3">
                        <CheckCircle className="h-5 w-5 text-purple-600 mt-0.5 flex-shrink-0" />
                        <span className="text-gray-700">Reporte mensual de métricas (CTR, CPC, conversiones)</span>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="mt-8 grid md:grid-cols-2 gap-6">
                  <div className="bg-white rounded-lg p-4 shadow-sm border border-gray-200">
                    <img 
                      src="/assets/icons/ads1.png" 
                      alt="Ejemplo Google Ads ISO 27001" 
                      className="w-full h-auto rounded-lg"
                    />
                    <p className="text-sm text-gray-600 mt-3 text-center">Ejemplo de búsqueda: ISMS Asset Management</p>
                  </div>
                  <div className="bg-white rounded-lg p-4 shadow-sm border border-gray-200">
                    <img 
                      src="/assets/icons/ads2.png" 
                      alt="Ejemplo Google Ads Gestión ISO" 
                      className="w-full h-auto rounded-lg"
                    />
                    <p className="text-sm text-gray-600 mt-3 text-center">Ejemplo de búsqueda: Plataforma gestión ISO</p>
                  </div>
                </div>
              </div>
            </div>

          </div>
        </div>
      </section>

      <section className="py-20 bg-gradient-to-br from-gray-900 to-gray-800 text-white">
        <div className="container-narrow">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-semibold mb-4">
              Inversión
            </h2>
            <p className="text-xl text-gray-300 max-w-2xl mx-auto">
              Servicio integral que combina las 3 estrategias para maximizar la generación de oportunidades B2B
            </p>
          </div>

          <Card className="max-w-2xl mx-auto bg-white text-gray-900 p-8 border-4 border-blue-600">
            <div className="text-center mb-6">
              <div className="inline-block bg-blue-100 text-blue-600 px-4 py-2 rounded-full text-sm font-semibold mb-4">
                Paquete Completo
              </div>
              <h3 className="text-3xl font-bold mb-2">Fee Mensual</h3>
              <div className="text-5xl font-bold text-blue-600 mb-2">$460.000</div>
              <div className="text-gray-500 text-lg">Pesos / mes</div>
            </div>

            <div className="border-t pt-6 mb-6">
              <h4 className="font-semibold text-gray-900 mb-4 text-center">Incluye:</h4>
              <div className="grid md:grid-cols-2 gap-4">
                <div className="flex items-center gap-3">
                  <CheckCircle className="h-5 w-5 text-blue-600 flex-shrink-0" />
                  <span className="text-sm">Call to Mail Marketing completo</span>
                </div>
                <div className="flex items-center gap-3">
                  <CheckCircle className="h-5 w-5 text-blue-600 flex-shrink-0" />
                  <span className="text-sm">Posicionamiento SEO orgánico</span>
                </div>
                <div className="flex items-center gap-3">
                  <CheckCircle className="h-5 w-5 text-blue-600 flex-shrink-0" />
                  <span className="text-sm">Campañas Google Ads</span>
                </div>
                <div className="flex items-center gap-3">
                  <CheckCircle className="h-5 w-5 text-blue-600 flex-shrink-0" />
                  <span className="text-sm">Reportes semanales y mensuales</span>
                </div>
              </div>
            </div>

            <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4 text-sm text-gray-700">
              <strong>Nota importante:</strong> No incluye costos asociados a plataformas de terceros ni inversión publicitaria en Google Ads.
            </div>
          </Card>

          <Card className="max-w-2xl mx-auto bg-gradient-to-br from-blue-50 to-indigo-50 text-gray-900 p-8 border-2 border-blue-300 mt-8">
            <div className="text-center mb-6">
              <div className="inline-block bg-indigo-600 text-white px-4 py-2 rounded-full text-sm font-semibold mb-4">
                Extra Opcional
              </div>
              <h3 className="text-2xl font-bold mb-2">Migración Web con Optimización</h3>
            </div>

            <div className="border-t border-blue-200 pt-6 mb-6">
              <p className="text-gray-700 mb-6">
                Migración Web con mismo estilo y diseño pero cumpliendo con los estándares requeridos por Google a nivel velocidad y performance (Por encima de 90). De esta manera nos aseguramos una correcta implementación de la estrategia y una gran base por años.
              </p>
              
              <div className="bg-white rounded-lg p-4 mb-4">
                <div className="flex items-center justify-between">
                  <span className="font-semibold text-gray-700">Tiempo de desarrollo:</span>
                  <span className="text-blue-600 font-bold">2 Semanas</span>
                </div>
              </div>
              
              <div className="bg-white rounded-lg p-4">
                <div className="flex items-center justify-between mb-2">
                  <span className="font-semibold text-gray-700">Fee Desarrollo:</span>
                  <span className="text-2xl font-bold text-indigo-600">$350.000</span>
                </div>
                <p className="text-sm text-gray-600 text-right">(se puede dividir en dos meses CONTRATANDO EL FEE MENSUAL)</p>
              </div>
            </div>
          </Card>
        </div>
      </section>

      <section className="py-20 bg-white">
        <div className="container-narrow">
          <div className="max-w-2xl mb-16 text-center mx-auto">
            <h2 className="text-4xl font-semibold text-gray-900 mb-4">
              Portfolio
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

      <section className="py-20 bg-gray-50/50">
        <div className="container-narrow text-center">
          <h2 className="text-4xl font-semibold text-gray-900 mb-4">
            ¿Listo para escalar tu captación de clientes B2B?
          </h2>
          <p className="text-xl text-gray-600 mb-8 max-w-2xl mx-auto">
            Agenda una consulta gratuita para conocer cómo podemos implementar este sistema en tu empresa.
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
            Agendar Consulta Gratuita <ArrowRight className="ml-2 h-5 w-5" />
          </Button>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default PropuestaServiciosISO;
