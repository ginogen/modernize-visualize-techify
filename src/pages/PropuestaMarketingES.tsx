import { ArrowRight, CheckCircle, ExternalLink } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import SEO from "@/components/SEO/SEO";
import "../styles/minimal.css";

const PropuestaMarketingES = () => {
  return (
    <div className="min-h-screen bg-white">
      <SEO
        title="Propuesta de Marketing Digital | Builders AI"
        description="Propuesta completa de servicios de marketing digital: Social Ads (Meta y TikTok), Google Ads y SEO. Planes desde USD 450 mensuales."
        keywords="marketing digital, social ads, google ads, seo, meta ads, tiktok ads, builders ai"
        url="https://www.builders-ai.com/propuesta-marketing"
      />

      {/* Fondo en cuadrícula */}
      <div className="fixed inset-0 grid-bg pointer-events-none" />

      <Header />

      {/* Sección Hero */}
      <section className="relative pt-32 pb-20 px-4">
        <div className="container-narrow">
          <div className="max-w-3xl">
            <h1 className="text-display font-semibold text-gray-900 mb-6">
              Propuesta de Marketing Digital
            </h1>
            <p className="text-subtitle mb-8">
              Estrategias completas de marketing digital para potenciar tu
              negocio con Social Ads, Google Ads.
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
                Solicitar Cotización <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Sección de Paquetes */}
      <section className="py-20">
        <div className="container-narrow">
          <div className="space-y-16">
            {/* Paquete 1 - Social Ads */}
            <div className="service-section">
              <div className="flex items-center gap-3 mb-6">
                <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center text-blue-600 font-bold text-xl">
                  1
                </div>
                <h2 className="text-3xl font-semibold text-gray-900">
                  Social Ads
                </h2>
              </div>

              <p className="text-lg text-gray-600 mb-8 max-w-3xl">
                Este plan incluye todo lo relacionado con estrategias de
                publicidad paga en Social Ads (Meta y TikTok) y Google Ads.
              </p>

              <div className="bg-gray-50/50 rounded-12 p-8 mb-8">
                <h3 className="text-xl font-semibold mb-6 text-gray-900">
                  Incluye:
                </h3>

                <div className="grid md:grid-cols-2 gap-6 mb-8">
                  <div className="space-y-4">
                    <div className="flex items-start gap-3">
                      <CheckCircle className="h-5 w-5 text-green-600 mt-0.5 flex-shrink-0" />
                      <span className="text-gray-700">
                        Verificación de sistemas de tracking en el eCommerce
                        (Analytics y eventos de conversión)
                      </span>
                    </div>
                    <div className="flex items-start gap-3">
                      <CheckCircle className="h-5 w-5 text-green-600 mt-0.5 flex-shrink-0" />
                      <span className="text-gray-700">
                        Configuración del Business Manager en Meta para
                        publicidad
                      </span>
                    </div>
                    <div className="flex items-start gap-3">
                      <CheckCircle className="h-5 w-5 text-green-600 mt-0.5 flex-shrink-0" />
                      <span className="text-gray-700">
                        Preparación e implementación de campañas Meta, TikTok y
                        Google Ads (no incluye creatividades o videos)
                      </span>
                    </div>
                    <div className="flex items-start gap-3">
                      <CheckCircle className="h-5 w-5 text-green-600 mt-0.5 flex-shrink-0" />
                      <span className="text-gray-700">
                        1 Reunión Semanal para seguimiento y ajustes
                      </span>
                    </div>
                    <div className="flex items-start gap-3">
                      <CheckCircle className="h-5 w-5 text-green-600 mt-0.5 flex-shrink-0" />
                      <span className="text-gray-700">
                        Sugerencias y trabajo en equipo con diseñador y mejoras
                        de landing para conversión.
                      </span>
                    </div>
                    <div className="flex items-start gap-3">
                      <CheckCircle className="h-5 w-5 text-green-600 mt-0.5 flex-shrink-0" />
                      <span className="text-gray-700">
                        Monitoreo y optimización continua de campañas
                      </span>
                    </div>
                  </div>

                  <div className="space-y-4">
                    <h4 className="font-semibold text-gray-900">
                      Para Google Ads, si aplica:
                    </h4>
                    <div className="flex items-start gap-3">
                      <CheckCircle className="h-5 w-5 text-green-600 mt-0.5 flex-shrink-0" />
                      <span className="text-gray-700">
                        Investigación de palabras clave
                      </span>
                    </div>
                    <div className="flex items-start gap-3">
                      <CheckCircle className="h-5 w-5 text-green-600 mt-0.5 flex-shrink-0" />
                      <span className="text-gray-700">
                        Planificación e implementación de campañas de Búsqueda y
                        Display (imágenes/videos)
                      </span>
                    </div>
                    <div className="flex items-start gap-3">
                      <CheckCircle className="h-5 w-5 text-green-600 mt-0.5 flex-shrink-0" />
                      <span className="text-gray-700">
                        Monitoreo y optimización continua
                      </span>
                    </div>
                  </div>
                </div>

                <div className="bg-blue-600 text-white rounded-lg p-6 text-center">
                  <div className="text-2xl font-bold mb-2">$ 390.000</div>
                  <div className="text-blue-100">Fee Mensual</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Proceso */}
      <section className="py-20">
        <div className="container-narrow">
          <div className="max-w-2xl mb-16">
            <h2 className="text-4xl font-semibold text-gray-900 mb-4">
              Nuestro Proceso
            </h2>
            <p className="text-lg text-gray-600">
              Un enfoque estructurado para maximizar el ROI de tu inversión en
              marketing digital.
            </p>
          </div>

          <div className="grid md:grid-cols-4 gap-8">
            {[
              {
                step: "01",
                title: "Auditoría Inicial",
                description:
                  "Analizamos tu presencia digital actual e identificamos oportunidades de mejora.",
              },
              {
                step: "02",
                title: "Estrategia",
                description:
                  "Diseñamos una estrategia personalizada según los objetivos de tu negocio.",
              },
              {
                step: "03",
                title: "Implementación",
                description:
                  "Configuramos y lanzamos las campañas con seguimiento completo.",
              },
              {
                step: "04",
                title: "Optimización",
                description:
                  "Monitoreamos y optimizamos constantemente para mejorar los resultados.",
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

      {/* CTA Final */}
      <section className="py-20 bg-gray-900 text-white">
        <div className="container-narrow text-center">
          <h2 className="text-4xl font-semibold mb-4">
            ¿Listo para hacer crecer tu negocio?
          </h2>
          <p className="text-xl text-gray-300 mb-8 max-w-2xl mx-auto">
            Agendá una consulta gratuita para analizar qué plan se adapta mejor
            a tus necesidades.
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
            Agendar consulta gratuita <ArrowRight className="ml-2 h-4 w-4" />
          </Button>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default PropuestaMarketingES;
