import { useEffect } from "react";
import {
  ArrowRight,
  CheckCircle,
  AlertTriangle,
  Clock,
  TrendingUp,
  Zap,
  Shield,
  FileText,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import SEO from "@/components/SEO/SEO";
import "../styles/minimal.css";

const AutomatizarWhatsApp = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="min-h-screen bg-white">
      <SEO
        title="Automatizar Mensajes de WhatsApp: Guía Completa | Builders AI"
        description="Aprende cómo automatizar mensajes de WhatsApp para tu negocio. Descubre herramientas, APIs, chatbots, integraciones y mejores prácticas para atención al cliente y ventas automáticas."
        keywords="automatizar mensajes whatsapp, whatsapp api, chatbot whatsapp, automatización whatsapp, meta whatsapp business api, mensajes automáticos whatsapp, ventas por whatsapp, atencion clientes whatsapp"
        url="https://www.builders-ai.com/automatizar-mensajes-de-whatsapp"
      />

      {/* Grid Background */}
      <div className="fixed inset-0 grid-bg pointer-events-none" />

      <Header />

      {/* Hero Section */}
      <section className="relative pt-32 pb-20 px-4">
        <div className="container-narrow">
          <div className="max-w-3xl">
            <h1 className="text-display font-semibold text-gray-900 mb-6">
              Guía completa: cómo automatizar mensajes de WhatsApp en tu negocio
            </h1>
            <p className="text-subtitle mb-8">
              WhatsApp es la aplicación de mensajería más utilizada en
              Latinoamérica y una de las más importantes a nivel mundial. Con
              más de 2.500 millones de usuarios activos, se ha convertido en el
              canal preferido para la atención al cliente, ventas y comunicación
              interna de empresas de todos los tamaños.
            </p>
            <p className="text-subtitle mb-8">
              <strong>Automatizar mensajes de WhatsApp</strong> ya no es un
              lujo: es una necesidad competitiva. Desde responder consultas
              básicas hasta confirmar pedidos o enviar recordatorios de citas,
              la automatización permite ahorrar tiempo, reducir costos y
              aumentar la satisfacción del cliente.
            </p>
            <p className="text-subtitle mb-8">
              En esta guía completa aprenderás:
              <ul className="list-disc ml-6 mt-2">
                <li>Qué significa automatizar mensajes de WhatsApp.</li>
                <li>Cuáles son los beneficios principales.</li>
                <li>Herramientas y métodos disponibles.</li>
                <li>
                  Casos de uso reales en pymes, e-commerce, clínicas y estudios.
                </li>
                <li>Errores comunes y cómo evitarlos.</li>
                <li>Preguntas frecuentes con respuestas claras.</li>
              </ul>
            </p>
          </div>
        </div>
      </section>

      {/* Content Section */}
      <section className="py-20">
        <div className="container-narrow">
          <div className="max-w-3xl">
            {/* Definición */}
            <h2 className="text-3xl font-semibold text-gray-900 mb-6">
              ¿Qué significa automatizar mensajes de WhatsApp?
            </h2>
            <p className="text-lg text-gray-600 mb-6">
              Automatizar WhatsApp consiste en configurar sistemas que envíen y
              gestionen mensajes de forma automática sin necesidad de
              intervención manual.
            </p>

            <div className="bg-gray-50 p-6 rounded-lg mb-12">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">
                Ejemplos prácticos:
              </h3>
              <ul className="space-y-3">
                <li className="flex items-start gap-3">
                  <CheckCircle className="h-4 w-4 text-green-600 mt-1" />
                  <span>
                    Bienvenida inmediata: cuando un cliente envía un mensaje,
                    recibe una respuesta automática con información básica.
                  </span>
                </li>
                <li className="flex items-start gap-3">
                  <CheckCircle className="h-4 w-4 text-green-600 mt-1" />
                  <span>
                    Seguimiento de pedidos: cada compra en un e-commerce genera
                    un mensaje automático con el estado de envío.
                  </span>
                </li>
                <li className="flex items-start gap-3">
                  <CheckCircle className="h-4 w-4 text-green-600 mt-1" />
                  <span>
                    Recordatorios de citas: clínicas, peluquerías o estudios
                    legales envían recordatorios sin que un asistente tenga que
                    escribirlos manualmente.
                  </span>
                </li>
              </ul>
            </div>

            {/* Beneficios */}
            <h2 className="text-3xl font-semibold text-gray-900 mb-6">
              Beneficios de automatizar mensajes de WhatsApp
            </h2>
            <div className="grid md:grid-cols-2 gap-6 mb-12">
              <Card className="service-card">
                <div className="flex items-start gap-3 mb-3">
                  <Clock className="h-5 w-5 text-blue-600 mt-1" />
                  <div>
                    <h3 className="text-lg font-medium text-gray-900">
                      Atención 24/7
                    </h3>
                    <p className="text-sm text-gray-600">
                      Responde al instante incluso fuera del horario laboral.
                    </p>
                  </div>
                </div>
              </Card>
              <Card className="service-card">
                <div className="flex items-start gap-3 mb-3">
                  <TrendingUp className="h-5 w-5 text-blue-600 mt-1" />
                  <div>
                    <h3 className="text-lg font-medium text-gray-900">
                      Más ventas y conversiones
                    </h3>
                    <p className="text-sm text-gray-600">
                      Un cliente que recibe respuesta inmediata tiene más
                      probabilidades de comprar.
                    </p>
                  </div>
                </div>
              </Card>
              <Card className="service-card">
                <div className="flex items-start gap-3 mb-3">
                  <Shield className="h-5 w-5 text-blue-600 mt-1" />
                  <div>
                    <h3 className="text-lg font-medium text-gray-900">
                      Consistencia
                    </h3>
                    <p className="text-sm text-gray-600">
                      Todos los clientes reciben la misma información clara y
                      precisa, evitando errores humanos.
                    </p>
                  </div>
                </div>
              </Card>
              <Card className="service-card">
                <div className="flex items-start gap-3 mb-3">
                  <Zap className="h-5 w-5 text-blue-600 mt-1" />
                  <div>
                    <h3 className="text-lg font-medium text-gray-900">
                      Escalabilidad
                    </h3>
                    <p className="text-sm text-gray-600">
                      Da igual si recibes 10 o 10.000 mensajes diarios: el
                      sistema responde con la misma eficiencia.
                    </p>
                  </div>
                </div>
              </Card>
            </div>

            {/* Cómo hacerlo */}
            <h2 className="text-3xl font-semibold text-gray-900 mb-6">
              Cómo automatizar mensajes de WhatsApp
            </h2>
            <p className="text-lg text-gray-600 mb-8">
              Para hacerlo correctamente, existen dos caminos principales:
            </p>

            <div className="grid md:grid-cols-2 gap-4 mb-12">
              <Card className="service-card">
                <h3 className="text-lg font-medium text-gray-900 mb-2">
                  Opción 1: WhatsApp Business App
                </h3>
                <p className="text-sm text-gray-600">
                  Permite crear mensajes básicos de bienvenida, ausencia y
                  respuestas rápidas. Ideal para freelancers y microempresas.
                </p>
              </Card>
              <Card className="service-card">
                <h3 className="text-lg font-medium text-gray-900 mb-2">
                  Opción 2: WhatsApp Business API
                </h3>
                <p className="text-sm text-gray-600">
                  La solución oficial de Meta para automatizar a gran escala con
                  chatbots, integraciones avanzadas y métricas de rendimiento.
                </p>
              </Card>
            </div>

            {/* Casos de uso */}
            <h2 className="text-3xl font-semibold text-gray-900 mb-6">
              Casos de uso de automatización en WhatsApp
            </h2>
            <ul className="list-disc ml-6 mb-12 text-gray-600">
              <li>
                <strong>E-commerce:</strong> confirmación de compras,
                seguimiento de pedidos y promociones personalizadas.
              </li>
              <li>
                <strong>Clínicas:</strong> recordatorios de turnos, envío de
                resultados y canal de emergencias.
              </li>
              <li>
                <strong>Estudios jurídicos:</strong> agenda de reuniones,
                recordatorio de vencimientos y comunicación directa con
                clientes.
              </li>
              <li>
                <strong>Restaurantes:</strong> confirmación inmediata de
                pedidos, envío de menú y promociones programadas.
              </li>
            </ul>

            {/* Herramientas */}
            <h2 className="text-3xl font-semibold text-gray-900 mb-6">
              Herramientas recomendadas
            </h2>
            <ul className="list-disc ml-6 mb-12 text-gray-600">
              <li>WhatsApp Business App → gratuito para pymes.</li>
              <li>Twilio WhatsApp API → flexible para desarrolladores.</li>
              <li>360dialog → partner oficial de Meta.</li>
              <li>Zenvia → integración latinoamericana con CRM.</li>
              <li>ManyChat → chatbots fáciles de configurar.</li>
            </ul>

            {/* Errores */}
            <h2 className="text-3xl font-semibold text-gray-900 mb-6">
              Errores comunes al automatizar WhatsApp
            </h2>
            <div className="space-y-3 mb-12">
              <div className="flex items-start gap-3 p-4 bg-red-50 rounded-lg">
                <AlertTriangle className="h-4 w-4 text-red-600 mt-1" />
                <span>
                  No cumplir con las políticas de Meta (bloqueo de línea).
                </span>
              </div>
              <div className="flex items-start gap-3 p-4 bg-red-50 rounded-lg">
                <AlertTriangle className="h-4 w-4 text-red-600 mt-1" />
                <span>Abusar de mensajes promocionales sin aportar valor.</span>
              </div>
              <div className="flex items-start gap-3 p-4 bg-red-50 rounded-lg">
                <AlertTriangle className="h-4 w-4 text-red-600 mt-1" />
                <span>No probar flujos antes de ponerlos en producción.</span>
              </div>
              <div className="flex items-start gap-3 p-4 bg-red-50 rounded-lg">
                <AlertTriangle className="h-4 w-4 text-red-600 mt-1" />
                <span>
                  No ofrecer la opción de hablar con un humano cuando el bot no
                  puede resolver el problema.
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
                  ¿Es legal automatizar mensajes de WhatsApp?
                </h3>
                <p className="text-sm text-gray-600">
                  Sí, siempre que uses la app oficial o la API de WhatsApp
                  Business y respetes las políticas de Meta.
                </p>
              </Card>
              <Card className="service-card">
                <h3 className="text-lg font-medium text-gray-900 mb-2">
                  ¿Puedo enviar mensajes masivos?
                </h3>
                <p className="text-sm text-gray-600">
                  Sí, pero solo a clientes que lo autoricen. Las plantillas
                  deben ser aprobadas por Meta.
                </p>
              </Card>
              <Card className="service-card">
                <h3 className="text-lg font-medium text-gray-900 mb-2">
                  ¿Qué cuesta automatizar WhatsApp?
                </h3>
                <p className="text-sm text-gray-600">
                  La app es gratuita, la API cobra por conversación y depende
                  del país y volumen.
                </p>
              </Card>
              <Card className="service-card">
                <h3 className="text-lg font-medium text-gray-900 mb-2">
                  ¿Necesito un programador?
                </h3>
                <p className="text-sm text-gray-600">
                  No para la app básica. Para la API puede ser necesario un
                  proveedor autorizado.
                </p>
              </Card>
            </div>

            {/* Conclusión */}
            <h2 className="text-3xl font-semibold text-gray-900 mb-6">
              Conclusión
            </h2>
            <p className="text-lg text-gray-600 mb-6">
              Automatizar mensajes de WhatsApp es una estrategia esencial para
              cualquier negocio moderno. No solo ahorra tiempo y dinero, sino
              que también mejora la atención al cliente, aumenta las ventas y
              asegura que tu empresa esté disponible 24/7.
            </p>
            <p className="text-lg text-gray-600 mb-12">
              Ya sea que tengas una pyme o una gran compañía, implementar un
              sistema de automatización en WhatsApp es el siguiente paso para
              escalar tu negocio. <strong>Comienza con la app</strong> si recién
              inicias y migra a la <strong>API oficial</strong> a medida que tu
              volumen y necesidades de integración crezcan.
            </p>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default AutomatizarWhatsApp;
