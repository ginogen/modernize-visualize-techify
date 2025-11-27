import { ArrowRight, CheckCircle, Bot, Cloud, Cpu, Database, Shield, TrendingUp, BarChart3, MessageSquare, Users } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import SEO from "@/components/SEO/SEO";
import "../styles/minimal.css";

const PropuestaRosarioPack = () => {
  return (
    <div className="min-h-screen bg-white">
      <SEO
        title="Rosario Pack Data Cloud | Builders AI"
        description="Plataforma inteligente de decisiones para empresas del sector retail. Dashboards cloud con IA, analítica dinámica y predicciones automáticas."
        keywords="rosario pack, data cloud, dashboard, inteligencia artificial, analítica de datos, builders ai, saas empresarial"
        url="https://www.builders-ai.com/rosario-pack-data-cloud"
      />

      {/* Background */}
      <div className="fixed inset-0 grid-bg pointer-events-none" />

      <Header />

      {/* HERO */}
      <section className="relative pt-32 pb-20 px-4">
        <div className="container-narrow">
          <div className="max-w-3xl">
            <h1 className="text-display font-semibold text-gray-900 mb-6">
              Rosario Pack Data Cloud — Plataforma Inteligente de Decisiones 🚀
            </h1>
            <p className="text-subtitle mb-8">
              Transformamos el enfoque clásico de BI en una plataforma SaaS dinámica y evolutiva, basada en Inteligencia Artificial, accesible desde cualquier dispositivo. 
              El objetivo no es solo <strong>ver datos</strong>, sino <strong>hacer que los datos trabajen por tu empresa.</strong>
            </p>
            <Button
              className="btn-primary px-8 py-3"
              onClick={() => window.open("https://calendar.app.google/XXwTHc1qvikRrd2f6", "_blank")}
            >
              Agenda una reunión <ArrowRight className="ml-2 h-5 w-5" />
            </Button>
          </div>
        </div>
      </section>

      {/* SECCIÓN 1: DATA LAYER */}
      <section className="py-20 border-t border-gray-100">
        <div className="container-narrow">
          <div className="grid md:grid-cols-2 gap-12 items-start">
            <div>
              <div className="flex items-center gap-3 mb-6">
                <div className="bg-blue-100 p-3 rounded-lg">
                  <Database className="h-8 w-8 text-blue-600" />
                </div>
                <h2 className="text-3xl font-semibold text-gray-900">
                  1️⃣ Data Layer — Ingesta + Normalización
                </h2>
              </div>
              <p className="text-lg text-gray-600 mb-8">
                Centralizamos todos los datos operativos y comerciales de Rosario Pack a través de APIs y conectores automáticos con ERP, eCommerce, POS, Excel y Google Sheets.
              </p>

              <ul className="space-y-3">
                <li className="flex items-start gap-2">
                  <CheckCircle className="h-5 w-5 text-green-600 mt-0.5 flex-shrink-0" />
                  <span className="text-gray-600">Pipelines automáticos en Supabase Edge Functions / Airbyte / n8n</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle className="h-5 w-5 text-green-600 mt-0.5 flex-shrink-0" />
                  <span className="text-gray-600">Limpieza, validación y normalización continua de datos</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle className="h-5 w-5 text-green-600 mt-0.5 flex-shrink-0" />
                  <span className="text-gray-600">Base analítica unificada en PostgreSQL Cloud (Neon / Supabase / AWS RDS)</span>
                </li>
              </ul>
            </div>

            <Card className="card-minimal p-8 bg-blue-50 border-blue-200">
              <h3 className="text-2xl font-semibold text-gray-900 mb-6">Beneficios</h3>
              <ul className="space-y-3">
                <li className="flex items-start gap-2">
                  <TrendingUp className="h-5 w-5 text-blue-600 mt-0.5 flex-shrink-0" />
                  <span className="text-gray-600">Datos actualizados en tiempo real</span>
                </li>
                <li className="flex items-start gap-2">
                  <TrendingUp className="h-5 w-5 text-blue-600 mt-0.5 flex-shrink-0" />
                  <span className="text-gray-600">Menor intervención humana y cero duplicaciones</span>
                </li>
                <li className="flex items-start gap-2">
                  <TrendingUp className="h-5 w-5 text-blue-600 mt-0.5 flex-shrink-0" />
                  <span className="text-gray-600">Infraestructura escalable y segura</span>
                </li>
              </ul>
            </Card>
          </div>
        </div>
      </section>

      {/* SECCIÓN 2: APP & DASHBOARD */}
      <section className="py-20 bg-gray-50/50 border-t border-gray-100">
        <div className="container-narrow">
          <div className="grid md:grid-cols-2 gap-12 items-start">
            <div className="md:order-2">
              <div className="bg-blue-100 p-3 rounded-lg w-fit mb-4">
                <BarChart3 className="h-8 w-8 text-blue-600" />
              </div>
              <h2 className="text-3xl font-semibold text-gray-900 mb-4">
                2️⃣ App & Dashboard Layer
              </h2>
              <p className="text-lg text-gray-600 mb-8">
                Dashboard web 100% personalizado, responsivo y conectado en tiempo real. Cada usuario accede a paneles dinámicos de ventas, stock y rentabilidad, con KPIs generados automáticamente por IA.
              </p>
              <ul className="space-y-3">
                <li className="flex items-start gap-2">
                  <CheckCircle className="h-5 w-5 text-green-600 mt-0.5 flex-shrink-0" />
                  <span className="text-gray-600">Desarrollado en Next.js + Tailwind + Supabase</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle className="h-5 w-5 text-green-600 mt-0.5 flex-shrink-0" />
                  <span className="text-gray-600">Integración directa con WhatsApp y Email para alertas automáticas</span>
                </li>
              </ul>
            </div>

            <Card className="card-minimal p-8 bg-blue-50 border-blue-200 md:order-1">
              <h3 className="text-2xl font-semibold text-gray-900 mb-6">Ejemplo de uso</h3>
              <p className="text-gray-700 mb-4">
                "El margen de la tienda física cayó 12% esta semana."  
                El sistema lo detecta y notifica automáticamente al responsable comercial.
              </p>
              <p className="text-gray-700">
                "Mostrame los productos con menor rotación del último mes."  
                El asistente IA genera el gráfico en segundos.
              </p>
            </Card>
          </div>
        </div>
      </section>

      {/* SECCIÓN 3: IA INTEGRADA */}
      <section className="py-20 border-t border-gray-100">
        <div className="container-narrow">
          <div className="flex items-center gap-3 mb-6">
            <div className="bg-green-100 p-3 rounded-lg">
              <Cpu className="h-8 w-8 text-green-600" />
            </div>
            <h2 className="text-3xl font-semibold text-gray-900">
              3️⃣ Inteligencia Artificial Integrada
            </h2>
          </div>
          <p className="text-lg text-gray-600 mb-8 max-w-3xl">
            Un asistente entrenado con los datos reales de Rosario Pack permite consultar, analizar y visualizar información en lenguaje natural.  
            Además, genera insights automáticos y predicciones de demanda o stock.
          </p>

          <div className="grid md:grid-cols-2 gap-12">
            <Card className="card-minimal p-8 bg-green-50 border-green-200">
              <h3 className="text-xl font-semibold text-gray-900 mb-4">💬 Asistente Conversacional</h3>
              <ul className="space-y-3 text-gray-700">
                <li>• Entiende preguntas en lenguaje natural</li>
                <li>• Devuelve respuestas con contexto y visuales dinámicos</li>
                <li>• Accesible desde el dashboard o WhatsApp</li>
              </ul>
            </Card>
            <Card className="card-minimal p-8 bg-green-50 border-green-200">
              <h3 className="text-xl font-semibold text-gray-900 mb-4">📊 Insights Automáticos</h3>
              <ul className="space-y-3 text-gray-700">
                <li>• Detección de anomalías (ventas fuera de patrón, márgenes negativos)</li>
                <li>• Predicciones de stock y demanda</li>
                <li>• Alertas inteligentes al equipo comercial</li>
              </ul>
            </Card>
          </div>
        </div>
      </section>

      {/* SECCIÓN 4: CLOUD & SEGURIDAD */}
<section className="py-20 bg-gray-50/50 border-t border-gray-100">
  <div className="container-narrow">
    <div className="flex items-center gap-3 mb-6">
      <div className="bg-blue-100 p-3 rounded-lg">
        <Shield className="h-8 w-8 text-blue-600" />
      </div>
      <h2 className="text-3xl font-semibold text-gray-900">4️⃣ Cloud y Seguridad</h2>
    </div>
    <ul className="space-y-3 text-lg text-gray-600 mb-8">
      <li>• Infraestructura multi-tenant con espacios de datos separados por empresa o área</li>
      <li>• Roles y permisos configurables</li>
      <li>• Autenticación con Google Workspace / email corporativo</li>
      <li>• Backups automáticos y registro de accesos</li>
    </ul>

    <div className="grid md:grid-cols-2 gap-8 max-w-4xl">
      {/* Card 1: Implementación */}
      <Card className="card-minimal p-8 bg-blue-50 border-blue-200">
        <h3 className="text-2xl font-semibold text-gray-900 mb-4">Condiciones Iniciales Implementación de Tableros</h3>
        <p className="text-gray-700 mb-2">
          ⏱ <strong>Tiempo de Implementación:</strong> 2 semanas
        </p>
        <p className="text-gray-700 mb-2">
          💰 <strong>Fee de Implementación:</strong> U$D 900 (único pago)
        </p>
        <p className="text-gray-700 mb-4 text-sm bg-green-100 p-3 rounded-lg">
          🎁 <strong>Extra Opcional Bonificado:</strong> WhatsApp para Alertas
        </p>
      </Card>

      {/* Card 2: Fee mensual */}
      <Card className="card-minimal p-8 bg-green-50 border-green-200">
        <h3 className="text-2xl font-semibold text-gray-900 mb-4">Fee Mensual y Mantenimiento</h3>
        <p className="text-gray-700 mb-2">
          💵 <strong>Fee Mensual:</strong> $130.000 ARS
        </p>
        <ul className="space-y-2 text-gray-700 mt-4">
          <li>• Actualizaciones continuas</li>
          <li>• Incorporación de nuevos reportes y componentes según requerimiento del cliente</li>
          <li>• <strong>Costo por cuenta de cliente:</strong> U$D 30 (servidores y base de datos)</li>
        </ul>
      </Card>
    </div>

    {/* Card 3: Nuevo Extra de Agente IA */}
    <div className="mt-8 max-w-4xl">
      <Card className="card-minimal p-8 bg-purple-50 border-purple-200">
        <h3 className="text-2xl font-semibold text-gray-900 mb-4">🤖 Extra: Desarrollo de Agente IA para Emails</h3>
        <p className="text-gray-700 mb-4">
          Desarrollo de Agente IA que lee los emails, interpreta y clasifica según pedidos, prioridad o parámetros que defina el cliente. 
          Esto se podrá integrar en el Dashboard para una rápida visualización de correos importantes.
        </p>
        <ul className="space-y-2 text-gray-700 mb-4">
          <li>• Clasificación automática de emails por tipo de contenido</li>
          <li>• Priorización según criterios personalizables</li>
          <li>• Integración completa con el Dashboard principal</li>
          <li>• Alertas automáticas para correos críticos</li>
        </ul>
        <p className="text-gray-700 font-semibold">
          💰 <strong>Costo de desarrollo:</strong> U$D 750 (Única vez)
        </p>
      </Card>
    </div>
  </div>

  {/* Vista previa del dashboard */}
  <section className="py-20 bg-gray-50/50">
    <div className="container-narrow">
      <div className="max-w-2xl mb-16 text-center mx-auto">
        <h2 className="text-4xl font-semibold text-gray-900 mb-4">
          Vista Previa de un Dashboard conectado a OpenWings
        </h2>
        <p className="text-lg text-gray-600">
          Explore un dashboard demo
        </p>
      </div>

      <div className="max-w-6xl mx-auto">
        <div className="bg-white rounded-xl shadow-lg overflow-hidden border border-gray-200">
          <div className="bg-gray-100 px-4 py-3 border-b border-gray-200 flex items-center gap-2">
            <div className="flex gap-2">
              <div className="w-3 h-3 rounded-full bg-red-500"></div>
              <div className="w-3 h-3 rounded-full bg-yellow-500"></div>
              <div className="w-3 h-3 rounded-full bg-green-500"></div>
            </div>
            <div className="flex-1 text-center">
              <span className="text-sm text-gray-600 font-mono">Demo</span>
            </div>
          </div>
          <div className="relative" style={{ paddingBottom: '75%' }}>
            <iframe
              src="https://excel-vision-pilot.lovable.app/"
              className="absolute inset-0 w-full h-full"
              style={{ border: 'none', minHeight: '800px' }}
              title="Vista Previa del Dashboard"
              loading="lazy"
            />
          </div>
        </div>
        <div className="text-center mt-6">
          <p className="text-sm text-gray-500">
            💡 Esta es una demostración del tipo de interfaz que podemos desarrollar. 
            El sistema final será 100% personalizado según sus necesidades.
          </p>
        </div>
      </div>
    </div>
  </section>
</section>

{/* SECCIÓN 5: SERVICIO FACTURAS AUTOMÁTICAS */}
<section className="py-20 border-t border-gray-100 bg-white">
  <div className="container-narrow">
    <div className="flex items-center gap-3 mb-6">
      <div className="bg-yellow-100 p-3 rounded-lg">
        <Bot className="h-8 w-8 text-yellow-600" />
      </div>
      <h2 className="text-3xl font-semibold text-gray-900">
        🧾 Servicio de Facturas Automáticas — Billence
      </h2>
    </div>

    <div className="grid md:grid-cols-2 gap-12 items-start">
      {/* Descripción */}
      <div>
        <p className="text-lg text-gray-600 mb-6">
          Este servicio <strong>Billence</strong> es una solución propia desarrollada por nuestro equipo, 
          diseñada para automatizar completamente la gestión de facturas de proveedores.
        </p>

        <ul className="space-y-3 text-gray-700 mb-8">
          <li className="flex items-start gap-2">
            <CheckCircle className="h-5 w-5 text-green-600 mt-0.5 flex-shrink-0" />
            <span>Conecte su <strong>Gmail</strong> y permita que las facturas que llegan por correo se procesen automáticamente.</span>
          </li>
          <li className="flex items-start gap-2">
            <CheckCircle className="h-5 w-5 text-green-600 mt-0.5 flex-shrink-0" />
            <span>El sistema analiza los PDF o imágenes, extrae los datos clave y los carga directamente en su <strong>ERP</strong>.</span>
          </li>
          <li className="flex items-start gap-2">
            <CheckCircle className="h-5 w-5 text-green-600 mt-0.5 flex-shrink-0" />
            <span>También permite enviar facturas manualmente por <strong>WhatsApp</strong> en PDF o imagen para su procesamiento automático.</span>
          </li>
        </ul>

        <p className="text-gray-700">
          Este servicio elimina tareas repetitivas y reduce errores, garantizando un flujo contable mucho más ágil y eficiente.
        </p>
      </div>

      {/* Card de precios */}
      <Card className="card-minimal p-8 bg-yellow-50 border-yellow-200">
        <h3 className="text-2xl font-semibold text-gray-900 mb-4">Condiciones</h3>
        <ul className="space-y-2 text-gray-700">
          <li>💰 <strong>Fee Mensual:</strong> U$D 150 finales</li>
          <li>📄 Procesamiento incluido: hasta 300 facturas mensuales</li>
          <li>⚙️ <strong>Sin costo de implementación</strong></li>
        </ul>
        <p className="text-green-700 font-semibold mt-4 bg-green-100 p-3 rounded-lg">
          🎁 <strong>Implementación Bonificada por referido OpenWings</strong>
        </p>
        <p className="text-gray-600 mt-6 text-sm">
          Ideal para empresas que buscan digitalizar su área contable y ahorrar horas de carga manual cada mes.
        </p>

        <Button
          className="btn-primary w-full mt-6"
          onClick={() => window.open("https://calendar.app.google/XXwTHc1qvikRrd2f6", "_blank")}
        >
          Solicitar activación <ArrowRight className="ml-2 h-5 w-5" />
        </Button>
      </Card>
    </div>
  </div>
</section>
{/* SECCIÓN 5: REQUERIMIENTOS */}





{/* SECCIÓN 5: CRM CON IA PARA GESTIÓN DE MENSAJES */}
<section className="py-20 border-t border-gray-100 bg-white">
  <div className="container-narrow">
    <div className="flex items-center gap-3 mb-6">
      <div className="bg-purple-100 p-3 rounded-lg">
        <MessageSquare className="h-8 w-8 text-purple-600" />
      </div>
      <h2 className="text-3xl font-semibold text-gray-900">
        📱 CRM con IA para Gestión de Mensajes
      </h2>
    </div>

    <div className="grid md:grid-cols-2 gap-12 items-start">
      {/* Descripción */}
      <div>
        <p className="text-lg text-gray-600 mb-6">
          Plataforma unificada donde pueden conectar sus redes sociales, WhatsApp y Web. 
          <strong> Todos los mensajes de todos los canales ingresan en la misma bandeja de entrada.</strong>
        </p>

        <ul className="space-y-3 text-gray-700 mb-8">
          <li className="flex items-start gap-2">
            <CheckCircle className="h-5 w-5 text-green-600 mt-0.5 flex-shrink-0" />
            <span>El <strong>Agente IA</strong> se conecta directamente con su sitio web o con <strong>OpenWings</strong> para responder con información real sobre productos</span>
          </li>
          <li className="flex items-start gap-2">
            <CheckCircle className="h-5 w-5 text-green-600 mt-0.5 flex-shrink-0" />
            <span>El bot <strong>atiende 24 horas</strong> los 365 días del año</span>
          </li>
          <li className="flex items-start gap-2">
            <CheckCircle className="h-5 w-5 text-green-600 mt-0.5 flex-shrink-0" />
            <span>Puede <strong>clasificar conversaciones</strong> y asignar a persona humana para seguimiento</span>
          </li>
          <li className="flex items-start gap-2">
            <CheckCircle className="h-5 w-5 text-green-600 mt-0.5 flex-shrink-0" />
            <span>La conexión a WhatsApp se realiza a través de la <strong>API oficial de WhatsApp</strong></span>
          </li>
        </ul>

        <p className="text-gray-700 bg-blue-50 p-4 rounded-lg">
          💡 <strong>De nuestra parte:</strong> Guiamos y nos ocupamos de la implementación de inicio a fin con <strong>cambios ilimitados</strong>.
        </p>
      </div>

      {/* Cards de precios y detalles */}
      <div className="space-y-6">
        {/* Card 1: Implementación */}
        <Card className="card-minimal p-6 bg-purple-50 border-purple-200">
          <h3 className="text-xl font-semibold text-gray-900 mb-4">📋 Condiciones de Implementación</h3>
          <ul className="space-y-2 text-gray-700">
            <li>⏱ <strong>Tiempo de Implementación:</strong> 2 semanas</li>
            <li>💰 <strong>Costo de Implementación:</strong> $450.000 (única vez)</li>
            <li>🔄 <strong>Cambios ilimitados</strong> durante la implementación</li>
          </ul>
        </Card>

        {/* Card 2: Fee mensual */}
        <Card className="card-minimal p-6 bg-green-50 border-green-200">
          <h3 className="text-xl font-semibold text-gray-900 mb-4">💵 Fee Mensual</h3>
          <p className="text-2xl font-bold text-green-700 mb-2">$145.000</p>
          <ul className="space-y-2 text-gray-700 text-sm">
            <li>• Mantenimiento y soporte técnico</li>
            <li>• Actualizaciones del sistema</li>
            <li>• Respaldo y seguridad de datos</li>
            <li>• Monitoreo 24/7</li>
          </ul>
        </Card>

        {/* Card 3: Características técnicas */}
        <Card className="card-minimal p-6 bg-blue-50 border-blue-200">
          <h3 className="text-xl font-semibold text-gray-900 mb-4">🔧 Características Técnicas</h3>
          <div className="grid grid-cols-2 gap-3 text-sm text-gray-700">
            <div className="flex items-center gap-2">
              <Users className="h-4 w-4 text-blue-600" />
              <span>Multi-canal</span>
            </div>
            <div className="flex items-center gap-2">
              <Bot className="h-4 w-4 text-blue-600" />
              <span>IA 24/7</span>
            </div>
            <div className="flex items-center gap-2">
              <MessageSquare className="h-4 w-4 text-blue-600" />
              <span>WhatsApp API</span>
            </div>
            <div className="flex items-center gap-2">
              <Database className="h-4 w-4 text-blue-600" />
              <span>OpenWings</span>
            </div>
          </div>
        </Card>

        <Button
          className="btn-primary w-full mt-6"
          onClick={() => window.open("https://calendar.app.google/XXwTHc1qvikRrd2f6", "_blank")}
        >
          Solicitar implementación <ArrowRight className="ml-2 h-5 w-5" />
        </Button>
      </div>
    </div>
  </div>
</section>

      {/* CTA */}
      <section className="py-20 bg-blue-600 text-white text-center">
        <div className="container-narrow">
          <h2 className="text-4xl font-semibold mb-6">
            Potenciá tu empresa con analítica inteligente
          </h2>
          <p className="text-lg text-blue-100 mb-8 max-w-2xl mx-auto">
            En solo dos semanas podés tener tu propio dashboard con IA, predicciones automáticas y reportes inteligentes en la nube.
          </p>
          <Button
            variant="secondary"
            className="px-8 py-3 bg-white text-blue-700 font-semibold"
            onClick={() => window.open("https://calendar.app.google/XXwTHc1qvikRrd2f6", "_blank")}
          >
            Agendar reunión <ArrowRight className="ml-2 h-5 w-5" />
          </Button>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default PropuestaRosarioPack;