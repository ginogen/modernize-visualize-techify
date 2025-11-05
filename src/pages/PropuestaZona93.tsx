import { ArrowRight, CheckCircle, Bot, Cloud, Cpu, Database, Shield, TrendingUp, BarChart3 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import SEO from "@/components/SEO/SEO";
import "../styles/minimal.css";

const PropuestaZona93 = () => {
  return (
    <div className="min-h-screen bg-white">
      <SEO
        title="Zona93 Data Cloud | Builders AI"
        description="Plataforma inteligente de decisiones para empresas del sector retail. Dashboards cloud con IA, analítica dinámica y predicciones automáticas."
        keywords="zona93, data cloud, dashboard, inteligencia artificial, analítica de datos, builders ai, saas empresarial"
        url="https://www.builders-ai.com/zona93-data-cloud"
      />

      {/* Background */}
      <div className="fixed inset-0 grid-bg pointer-events-none" />

      <Header />

      {/* HERO */}
      <section className="relative pt-32 pb-20 px-4">
        <div className="container-narrow">
          <div className="max-w-3xl">
            <h1 className="text-display font-semibold text-gray-900 mb-6">
              Zona93 Data Cloud — Plataforma Inteligente de Decisiones 🚀
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
                Centralizamos todos los datos operativos y comerciales de Zona93 a través de APIs y conectores automáticos con ERP, eCommerce, POS, Excel y Google Sheets.
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
                “El margen de la tienda física cayó 12% esta semana.”  
                El sistema lo detecta y notifica automáticamente al responsable comercial.
              </p>
              <p className="text-gray-700">
                “Mostrame los productos con menor rotación del último mes.”  
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
            Un asistente entrenado con los datos reales de Zona93 permite consultar, analizar y visualizar información en lenguaje natural.  
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
        <h3 className="text-2xl font-semibold text-gray-900 mb-4">Condiciones Iniciales</h3>
        <p className="text-gray-700 mb-2">
          ⏱ <strong>Tiempo de Implementación:</strong> 1 semana
        </p>
        <p className="text-gray-700 mb-2">
          💰 <strong>Fee de Implementación:</strong> U$D 1.000 (único pago)
        </p>
      </Card>

      {/* Card 2: Fee mensual */}
      <Card className="card-minimal p-8 bg-green-50 border-green-200">
        <h3 className="text-2xl font-semibold text-gray-900 mb-4">Fee Mensual y Mantenimiento</h3>
        <p className="text-gray-700 mb-2">
          💵 <strong>Fee Mensual:</strong> $290.000 ARS
        </p>
        <ul className="space-y-2 text-gray-700 mt-4">
          <li>• Actualizaciones continuas</li>
          <li>• Incorporación de nuevos reportes y componentes según requerimiento del cliente</li>
          <li>• <strong>Costo por cuenta de cliente:</strong> U$D 30 (servidores y base de datos)</li>
        </ul>
      </Card>
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
            En solo una semana podés tener tu propio dashboard con IA, predicciones automáticas y reportes inteligentes en la nube.
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

export default PropuestaZona93;
