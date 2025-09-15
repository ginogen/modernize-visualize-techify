import { useEffect } from "react";
import {
  CheckCircle,
  AlertTriangle,
  Clock,
  TrendingUp,
  Zap,
  Shield,
  FileText,
} from "lucide-react";
import { Card } from "@/components/ui/card";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import SEO from "@/components/SEO/SEO";
import "../styles/minimal.css";

const IAAboados = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="min-h-screen bg-white">
      <SEO
        title="IA para Abogados: Guía Completa 2025 | Builders AI"
        description="Descubre cómo la inteligencia artificial está transformando la abogacía. Aprende los beneficios, herramientas, casos de uso y errores a evitar al implementar IA en estudios jurídicos."
        keywords="IA para abogados, inteligencia artificial derecho, automatización legal, software jurídico IA, chatbots legales, redactar demandas con IA, legaltech argentina"
        url="https://www.builders-ai.com/ia-para-abogados"
      />

      {/* Grid Background */}
      <div className="fixed inset-0 grid-bg pointer-events-none" />

      <Header />

      {/* Hero Section */}
      <section className="relative pt-32 pb-20 px-4">
        <div className="container-narrow">
          <div className="max-w-3xl">
            <h1 className="text-display font-semibold text-gray-900 mb-6">
              IA para abogados: guía completa sobre inteligencia artificial en
              el sector legal
            </h1>
            <p className="text-subtitle mb-8">
              La <strong>inteligencia artificial (IA) para abogados</strong>{" "}
              está revolucionando el ejercicio del derecho. Desde la redacción
              de demandas hasta la gestión de expedientes, las herramientas de
              IA permiten ahorrar tiempo, reducir errores y mejorar la atención
              a clientes.
            </p>
            <p className="text-subtitle mb-8">
              En este artículo exploraremos en detalle cómo la IA está
              transformando el sector legal, qué beneficios ofrece, qué
              herramientas existen y qué errores evitar al implementarla en tu
              estudio jurídico.
            </p>
          </div>
        </div>
      </section>

      {/* Content Section */}
      <section className="py-20">
        <div className="container-narrow">
          <div className="max-w-3xl">
            {/* Qué es */}
            <h2 className="text-3xl font-semibold text-gray-900 mb-6">
              ¿Qué es la IA para abogados?
            </h2>
            <p className="text-lg text-gray-600 mb-6">
              La IA para abogados consiste en el uso de software basado en
              inteligencia artificial para automatizar tareas jurídicas,
              analizar documentos, redactar escritos legales y brindar soporte
              en la gestión de casos. No reemplaza al profesional, sino que lo
              potencia con mayor velocidad y precisión.
            </p>

            {/* Beneficios */}
            <h2 className="text-3xl font-semibold text-gray-900 mb-6">
              Beneficios principales de la IA en el derecho
            </h2>
            <div className="grid md:grid-cols-2 gap-6 mb-12">
              <Card className="service-card">
                <div className="flex items-start gap-3 mb-3">
                  <Clock className="h-5 w-5 text-blue-600 mt-1" />
                  <div>
                    <h3 className="text-lg font-medium text-gray-900">
                      Ahorro de tiempo
                    </h3>
                    <p className="text-sm text-gray-600">
                      Redacción de escritos y análisis de documentos en minutos,
                      no horas.
                    </p>
                  </div>
                </div>
              </Card>

              <Card className="service-card">
                <div className="flex items-start gap-3 mb-3">
                  <TrendingUp className="h-5 w-5 text-blue-600 mt-1" />
                  <div>
                    <h3 className="text-lg font-medium text-gray-900">
                      Mayor productividad
                    </h3>
                    <p className="text-sm text-gray-600">
                      Permite atender más casos sin aumentar el equipo de
                      trabajo.
                    </p>
                  </div>
                </div>
              </Card>

              <Card className="service-card">
                <div className="flex items-start gap-3 mb-3">
                  <Shield className="h-5 w-5 text-blue-600 mt-1" />
                  <div>
                    <h3 className="text-lg font-medium text-gray-900">
                      Reducción de errores
                    </h3>
                    <p className="text-sm text-gray-600">
                      Los algoritmos detectan inconsistencias y validan datos de
                      forma automática.
                    </p>
                  </div>
                </div>
              </Card>

              <Card className="service-card">
                <div className="flex items-start gap-3 mb-3">
                  <Zap className="h-5 w-5 text-blue-600 mt-1" />
                  <div>
                    <h3 className="text-lg font-medium text-gray-900">
                      Mejor experiencia del cliente
                    </h3>
                    <p className="text-sm text-gray-600">
                      Respuestas rápidas y personalizadas a consultas legales
                      frecuentes.
                    </p>
                  </div>
                </div>
              </Card>
            </div>

            {/* Casos de uso */}
            <h2 className="text-3xl font-semibold text-gray-900 mb-6">
              Casos de uso de la IA para abogados
            </h2>
            <ul className="list-disc ml-6 mb-12 text-gray-600">
              <li>
                <strong>Redacción de demandas:</strong> la IA genera borradores
                basados en plantillas y jurisprudencia.
              </li>
              <li>
                <strong>Análisis de contratos:</strong> identificación de
                cláusulas riesgosas y recomendaciones.
              </li>
              <li>
                <strong>Investigación legal:</strong> búsqueda acelerada en
                bases de datos de jurisprudencia y legislación.
              </li>
              <li>
                <strong>Gestión de expedientes:</strong> organización
                automática, seguimiento de plazos y alertas.
              </li>
              <li>
                <strong>Chatbots legales:</strong> atención inicial de clientes
                vía WhatsApp o web.
              </li>
            </ul>

            {/* Herramientas */}
            <h2 className="text-3xl font-semibold text-gray-900 mb-6">
              Herramientas recomendadas de IA para abogados
            </h2>
            <ul className="list-disc ml-6 mb-12 text-gray-600">
              <li>
                <strong>Litigium / Litibot:</strong> generación de demandas y
                escritos legales en Argentina.
              </li>
              <li>
                <strong>Casetext (CoCounsel):</strong> asistente jurídico con IA
                en EE. UU.
              </li>
              <li>
                <strong>DoNotPay:</strong> plataforma de automatización para
                trámites y reclamos.
              </li>
              <li>
                <strong>ChatGPT con plugins legales:</strong> ideal para
                investigación y redacción asistida.
              </li>
              <li>
                <strong>Harvey AI:</strong> solución de IA para grandes estudios
                internacionales.
              </li>
            </ul>

            {/* Errores comunes */}
            <h2 className="text-3xl font-semibold text-gray-900 mb-6">
              Errores comunes al implementar IA en estudios jurídicos
            </h2>
            <div className="space-y-3 mb-12">
              <div className="flex items-start gap-3 p-4 bg-red-50 rounded-lg">
                <AlertTriangle className="h-4 w-4 text-red-600 mt-1" />
                <span>
                  Confiar ciegamente en la IA sin supervisión humana en los
                  escritos legales.
                </span>
              </div>
              <div className="flex items-start gap-3 p-4 bg-red-50 rounded-lg">
                <AlertTriangle className="h-4 w-4 text-red-600 mt-1" />
                <span>
                  No capacitar al equipo en el uso responsable de estas
                  herramientas.
                </span>
              </div>
              <div className="flex items-start gap-3 p-4 bg-red-50 rounded-lg">
                <AlertTriangle className="h-4 w-4 text-red-600 mt-1" />
                <span>
                  Descuidar la seguridad de los datos sensibles de los clientes.
                </span>
              </div>
            </div>

            {/* FAQ */}
            <h2 className="text-3xl font-semibold text-gray-900 mb-6">
              Preguntas frecuentes (FAQ)
            </h2>
            <div className="space-y-4 mb-12">
              <Card className="service-card">
                <h3 className="text-lg font-medium text-gray-900 mb-2">
                  ¿La IA reemplazará a los abogados?
                </h3>
                <p className="text-sm text-gray-600">
                  No. La IA es una herramienta de apoyo que agiliza tareas
                  repetitivas, pero el criterio legal y la estrategia siguen
                  siendo humanos.
                </p>
              </Card>
              <Card className="service-card">
                <h3 className="text-lg font-medium text-gray-900 mb-2">
                  ¿Es legal usar IA en procesos jurídicos?
                </h3>
                <p className="text-sm text-gray-600">
                  Sí, siempre que el abogado supervise y garantice el
                  cumplimiento normativo y la confidencialidad de los datos.
                </p>
              </Card>
              <Card className="service-card">
                <h3 className="text-lg font-medium text-gray-900 mb-2">
                  ¿Qué costo tiene implementar IA en un estudio jurídico?
                </h3>
                <p className="text-sm text-gray-600">
                  Varía según la herramienta: desde opciones gratuitas hasta
                  soluciones enterprise con suscripción mensual.
                </p>
              </Card>
            </div>

            {/* Conclusión */}
            <h2 className="text-3xl font-semibold text-gray-900 mb-6">
              Conclusión
            </h2>
            <p className="text-lg text-gray-600 mb-6">
              La <strong>IA para abogados</strong> no es una moda: es una
              transformación profunda en la forma de ejercer el derecho.
              Implementarla correctamente permite aumentar la productividad,
              mejorar la atención al cliente y competir en un mercado cada vez
              más exigente.
            </p>
            <p className="text-lg text-gray-600 mb-12">
              Los estudios jurídicos que adopten inteligencia artificial con una
              estrategia clara estarán mejor preparados para el futuro del
              sector legal.
            </p>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default IAAboados;
