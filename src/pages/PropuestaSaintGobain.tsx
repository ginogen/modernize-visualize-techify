import { ArrowRight, CheckCircle, Code2, Zap, Bot, Users, Clock, DollarSign, Building2, Lock, Bell, Mail, MessageSquare, Server, Calendar, Package, Database, Settings, BarChart3, HeartPulse, AlertTriangle, ClipboardList, Activity, Shield, FileText } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import SEO from "@/components/SEO/SEO";
import "../styles/minimal.css";

const PropuestaSaintGobain = () => {
  return (
    <div className="min-h-screen bg-white">
      <SEO
        title="Propuesta Saint Gobain | Builders AI - Sistema de Gestión de Salud Ocupacional"
        description="Desarrollo de software personalizado para centralizar y automatizar la gestión de salud ocupacional y riesgo laboral para Saint Gobain (Plaka)"
        keywords="software salud ocupacional, gestión riesgo laboral, desarrollo software personalizado, sistema médico empresarial, automatización salud"
        url="https://www.builders-ai.com/propuesta-saint-gobain"
      />

      <div className="fixed inset-0 grid-bg pointer-events-none" />

      <Header />

      <section className="relative pt-32 pb-20 px-4">
        <div className="container-narrow">
          <div className="max-w-3xl">
            <div className="inline-block px-4 py-2 bg-gray-100 rounded-full text-sm font-medium text-gray-700 mb-6">
              🏥 Propuesta Técnica - Saint Gobain (Plaka)
            </div>
            <h1 className="text-display font-semibold text-gray-900 mb-6">
              Sistema Integral de Gestión de Salud Ocupacional y Riesgo Laboral
            </h1>
            <p className="text-subtitle mb-8">
              Desarrollo de software personalizado para centralizar, digitalizar y automatizar todos los procesos relacionados con el control médico, la gestión de incidentes, las incapacidades y el seguimiento de trabajadores.
            </p>
            <div className="flex flex-wrap gap-4">
              <Button 
                className="btn-primary"
                onClick={() => window.open('https://wa.me/17864087985', '_blank')}
              >
                Contactar por WhatsApp <MessageSquare className="ml-2 h-4 w-4" />
              </Button>
              <Button 
                variant="outline"
                onClick={() => window.open('mailto:hola@builders-ai.com', '_blank')}
              >
                Enviar Email <Mail className="ml-2 h-4 w-4" />
              </Button>
            </div>
          </div>
        </div>
      </section>

      <section className="py-20 border-t border-gray-100">
        <div className="container-narrow">
          <div className="max-w-2xl mb-12">
            <h2 className="text-4xl font-semibold text-gray-900 mb-4">
              Introducción
            </h2>
            <p className="text-lg text-gray-600 mb-6">
              Builders AI propone el desarrollo de un sistema integral de gestión de salud ocupacional y riesgo laboral para Saint Gobain. El objetivo es centralizar, digitalizar y automatizar todos los procesos relacionados con el control médico, la gestión de incidentes, las incapacidades y el seguimiento de trabajadores, bajo una plataforma moderna, escalable y 100% adaptada a las necesidades de la empresa.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            <div className="service-section">
              <div className="service-icon mb-4">
                <Code2 className="h-6 w-6 text-blue-600" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">
                Tecnología Moderna
              </h3>
              <p className="text-gray-600">
                React.js para el frontend y base de datos propia en servidores dedicados
              </p>
            </div>

            <div className="service-section">
              <div className="service-icon mb-4">
                <Package className="h-6 w-6 text-green-600" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">
                100% Responsive
              </h3>
              <p className="text-gray-600">
                Uso óptimo tanto en desktop como en dispositivos móviles
              </p>
            </div>

            <div className="service-section">
              <div className="service-icon mb-4">
                <Zap className="h-6 w-6 text-yellow-600" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">
                Desarrollo Desde Cero
              </h3>
              <p className="text-gray-600">
                100% personalizado y adaptado a sus necesidades específicas
              </p>
            </div>
          </div>
        </div>
      </section>

      <section className="py-20 bg-gray-50/50">
        <div className="container-narrow">
          <div className="max-w-2xl mb-16">
            <h2 className="text-4xl font-semibold text-gray-900 mb-4">
              Módulos Principales
            </h2>
            <p className="text-lg text-gray-600">
              El sistema contará con 8 módulos principales diseñados para cubrir todas las necesidades de gestión de salud ocupacional.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              { icon: BarChart3, title: "Dashboard General", desc: "Métricas, indicadores clave y alertas en tiempo real" },
              { icon: Users, title: "Gestión de Trabajadores", desc: "Fichas de empleados, historial médico, documentos" },
              { icon: HeartPulse, title: "Consultas Diarias", desc: "Registro de atenciones médicas y seguimiento" },
              { icon: ClipboardList, title: "Exámenes Médicos", desc: "Control de exámenes de ingreso, periódicos y especiales" },
              { icon: AlertTriangle, title: "Incidentes e Incapacidades", desc: "Registro, clasificación y análisis de casos" },
              { icon: Activity, title: "Gestión de Riesgo", desc: "Identificación de riesgos y planes de acción" },
              { icon: Calendar, title: "Calendario", desc: "Gestión de citas, exámenes y recordatorios" },
              { icon: Settings, title: "Configuración", desc: "Parametrización, usuarios, roles y permisos" }
            ].map((modulo, index) => (
              <Card key={index} className="card-minimal hover:shadow-md transition-shadow">
                <div className="service-icon mb-4">
                  <modulo.icon className="h-6 w-6 text-blue-600" />
                </div>
                <h4 className="text-lg font-semibold mb-2">{modulo.title}</h4>
                <p className="text-sm text-gray-600">{modulo.desc}</p>
              </Card>
            ))}
          </div>

          <div className="text-center mt-8">
            <p className="text-sm text-gray-500 italic">
              * Sujeto a modificaciones al momento de definir Mapa de Desarrollo
            </p>
          </div>
        </div>
      </section>

      <section className="py-20 bg-gray-50/50">
        <div className="container-narrow">
          <div className="max-w-2xl mb-16 text-center mx-auto">
            <h2 className="text-4xl font-semibold text-gray-900 mb-4">
              Vista Previa del Sistema
            </h2>
            <p className="text-lg text-gray-600">
              Explore una demostración interactiva del tipo de interfaz que desarrollaremos para Saint Gobain
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
                  src="https://saint-well-care.lovable.app/dashboard"
                  className="absolute inset-0 w-full h-full"
                  style={{ border: 'none', minHeight: '800px' }}
                  title="Vista Previa del Sistema Saint Gobain"
                  loading="lazy"
                />
              </div>
            </div>
            <div className="text-center mt-6">
              <p className="text-sm text-gray-500">
                💡 Esta es una demostración del tipo de interfaz que podemos desarrollar. El sistema final será 100% personalizado según sus necesidades.
              </p>
            </div>
          </div>
        </div>
      </section>

      <section className="py-20 border-t border-gray-100">
        <div className="container-narrow">
          <div className="max-w-2xl mb-16">
            <h2 className="text-4xl font-semibold text-gray-900 mb-4">
              Características Destacadas
            </h2>
            <p className="text-lg text-gray-600">
              Sistema escalable, seguro y diseñado para crecer junto con su organización.
            </p>
          </div>

          <div className="space-y-16">
            <div className="grid md:grid-cols-2 gap-12 items-start">
              <div>
                <div className="flex items-center gap-4 mb-4">
                  <div className="service-icon">
                    <Building2 className="h-6 w-6 text-blue-600" />
                  </div>
                  <h3 className="text-2xl font-semibold text-gray-900">
                    Estructura Multiempresa y Escalabilidad
                  </h3>
                </div>
                <p className="text-gray-600 mb-6">
                  El sistema estará preparado para manejar múltiples organizaciones, unidades de negocio y sucursales dentro de una misma infraestructura.
                </p>
                <ul className="space-y-2 text-gray-600">
                  <li className="flex items-start gap-2">
                    <CheckCircle className="h-5 w-5 text-green-600 mt-0.5 flex-shrink-0" />
                    Base de datos y configuración propia por organización
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle className="h-5 w-5 text-green-600 mt-0.5 flex-shrink-0" />
                    Escalabilidad flexible desde una hasta múltiples sedes
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle className="h-5 w-5 text-green-600 mt-0.5 flex-shrink-0" />
                    Infraestructura segura y centralizada
                  </li>
                </ul>
              </div>

              <div>
                <div className="flex items-center gap-4 mb-4">
                  <div className="service-icon">
                    <Lock className="h-6 w-6 text-purple-600" />
                  </div>
                  <h3 className="text-2xl font-semibold text-gray-900">
                    Control de Usuarios y Roles
                  </h3>
                </div>
                <p className="text-gray-600 mb-6">
                  Sistema de control de acceso por roles, donde cada usuario tendrá permisos personalizados según su perfil. Garantiza seguridad, trazabilidad y control total.
                </p>
                <ul className="space-y-2 text-gray-600">
                  <li className="flex items-start gap-2">
                    <CheckCircle className="h-5 w-5 text-green-600 mt-0.5 flex-shrink-0" />
                    Administrador
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle className="h-5 w-5 text-green-600 mt-0.5 flex-shrink-0" />
                    Médico
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle className="h-5 w-5 text-green-600 mt-0.5 flex-shrink-0" />
                    Supervisor
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle className="h-5 w-5 text-green-600 mt-0.5 flex-shrink-0" />
                    Empleado
                  </li>
                </ul>
              </div>
            </div>

            <div>
              <div className="flex items-center gap-4 mb-4">
                <div className="service-icon">
                  <Bell className="h-6 w-6 text-orange-600" />
                </div>
                <h3 className="text-2xl font-semibold text-gray-900">
                  Recordatorios y Automatizaciones
                </h3>
              </div>
              <p className="text-gray-600 mb-6">
                El sistema incluirá un módulo de recordatorios automáticos para mantener al día todas las actividades médicas y administrativas.
              </p>
              <div className="grid md:grid-cols-2 gap-6">
                <Card className="card-minimal">
                  <div className="flex items-center gap-3 mb-3">
                    <Mail className="h-5 w-5 text-blue-600" />
                    <h4 className="font-semibold">Notificaciones por Email</h4>
                  </div>
                  <p className="text-sm text-gray-600">
                    Recordatorios automáticos de citas, exámenes y vencimientos
                  </p>
                </Card>
                <Card className="card-minimal">
                  <div className="flex items-center gap-3 mb-3">
                    <MessageSquare className="h-5 w-5 text-green-600" />
                    <h4 className="font-semibold">WhatsApp</h4>
                  </div>
                  <p className="text-sm text-gray-600">
                    Integración con WhatsApp para confirmaciones y avisos
                  </p>
                </Card>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="py-20 bg-gray-50/50">
        <div className="container-narrow">
          <div className="max-w-2xl mb-16">
            <h2 className="text-4xl font-semibold text-gray-900 mb-4">
              Metodología de Trabajo
            </h2>
            <p className="text-lg text-gray-600">
              Proceso ágil y transparente con entregas parciales y seguimiento continuo.
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-12">
            <div>
              <h3 className="text-2xl font-semibold text-gray-900 mb-6">
                Equipo y Duración
              </h3>
              <div className="space-y-4">
                <div className="flex items-start gap-3">
                  <Users className="h-6 w-6 text-blue-600 mt-1 flex-shrink-0" />
                  <div>
                    <p className="font-semibold">3 Programadores Especializados</p>
                    <p className="text-sm text-gray-600">Frontend, Backend y Base de Datos</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <Clock className="h-6 w-6 text-blue-600 mt-1 flex-shrink-0" />
                  <div>
                    <p className="font-semibold">3 Meses de Desarrollo</p>
                    <p className="text-sm text-gray-600">Con entregas parciales y revisiones</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <Calendar className="h-6 w-6 text-blue-600 mt-1 flex-shrink-0" />
                  <div>
                    <p className="font-semibold">Reuniones cada 15-20 días</p>
                    <p className="text-sm text-gray-600">Seguimiento de avances y resolución de dudas</p>
                  </div>
                </div>
              </div>
            </div>

            <div>
              <h3 className="text-2xl font-semibold text-gray-900 mb-6">
                Proceso de Desarrollo
              </h3>
              <div className="space-y-3">
                {[
                  "Mapa de desarrollo inicial detallado",
                  "Desarrollo ágil con entregas parciales",
                  "Revisiones periódicas de avances",
                  "Resolución continua de dudas",
                  "Testing y ajustes finales"
                ].map((item, index) => (
                  <div key={index} className="flex items-start gap-3">
                    <div className="w-6 h-6 bg-blue-100 rounded-full flex items-center justify-center flex-shrink-0">
                      <span className="text-blue-600 text-xs font-bold">{index + 1}</span>
                    </div>
                    <p className="text-gray-600">{item}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="py-20 border-t border-gray-100">
        <div className="container-narrow">
          <div className="max-w-2xl mb-16">
            <h2 className="text-4xl font-semibold text-gray-900 mb-4">
              Propiedad del Software
            </h2>
            <p className="text-lg text-gray-600">
              El software será propiedad exclusiva de Saint Gobain con acceso completo a todo.
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-8">
            <Card className="card-minimal bg-green-50/50">
              <div className="flex items-center gap-3 mb-6">
                <Shield className="h-6 w-6 text-green-600" />
                <h3 className="text-xl font-semibold text-gray-900">✅ Incluido</h3>
              </div>
              <ul className="space-y-2 text-gray-600">
                {[
                  "Desarrollo completo del software",
                  "Código fuente completo",
                  "Base de datos completa",
                  "Acceso a servidores",
                  "Claves y credenciales de servicios",
                  "Manual de uso y capacitación",
                  "Cesión total de derechos"
                ].map((item, index) => (
                  <li key={index} className="flex items-start gap-2">
                    <CheckCircle className="h-5 w-5 text-green-600 mt-0.5 flex-shrink-0" />
                    {item}
                  </li>
                ))}
              </ul>
            </Card>

            <Card className="card-minimal bg-orange-50/50">
              <div className="flex items-center gap-3 mb-6">
                <Server className="h-6 w-6 text-orange-600" />
                <h3 className="text-xl font-semibold text-gray-900">⚠️ No Incluido</h3>
              </div>
              <p className="text-gray-600 mb-4 text-sm">
                Costos que pueden ser gestionados directamente o a través de Builders AI como servicio adicional:
              </p>
              <ul className="space-y-2 text-gray-600">
                {[
                  "Costos de servidores",
                  "Dominios y hosting",
                  "Servicios externos (Twilio, WhatsApp API, etc.)"
                ].map((item, index) => (
                  <li key={index} className="flex items-start gap-2">
                    <Server className="h-5 w-5 text-orange-600 mt-0.5 flex-shrink-0" />
                    {item}
                  </li>
                ))}
              </ul>
            </Card>
          </div>
        </div>
      </section>

      <section className="py-20 bg-gray-50/50">
        <div className="container-narrow">
          <div className="max-w-2xl mb-16 text-center mx-auto">
            <h2 className="text-4xl font-semibold text-gray-900 mb-4">
              Inversión
            </h2>
            <p className="text-lg text-gray-600">
              Propuesta económica clara y transparente con opciones de soporte post-implementación.
            </p>
          </div>

          <div className="grid lg:grid-cols-2 gap-12 max-w-5xl mx-auto">
            <Card className="card-minimal border-2 border-blue-200 bg-blue-50/30">
              <div className="text-center mb-6">
                <div className="inline-block px-4 py-2 bg-blue-100 rounded-full text-sm font-medium text-blue-700 mb-4">
                  Fee de Inversión
                </div>
                <div className="text-6xl font-bold text-gray-900 mb-2">USD 7.550</div>
                <p className="text-gray-600">Desarrollo completo del sistema</p>
              </div>
              
              <div className="space-y-4 mb-6">
                <div className="bg-white p-4 rounded-lg border border-gray-200">
                  <div className="flex items-center justify-between mb-2">
                    <span className="font-semibold">40% al iniciar</span>
                    <span className="text-blue-600 font-bold">USD 3.020</span>
                  </div>
                  <p className="text-xs text-gray-500">Pago inicial para comenzar el proyecto</p>
                </div>
                
                <div className="bg-white p-4 rounded-lg border border-gray-200">
                  <div className="flex items-center justify-between mb-2">
                    <span className="font-semibold">60% al finalizar</span>
                    <span className="text-blue-600 font-bold">USD 4.530</span>
                  </div>
                  <p className="text-xs text-gray-500">Pago final al entregar el software</p>
                </div>
              </div>

              <div className="bg-blue-100 p-4 rounded-lg">
                <p className="text-sm font-semibold text-blue-900 mb-2">✅ Incluye:</p>
                <ul className="text-xs text-gray-700 space-y-1">
                  <li>• Desarrollo completo en 3 meses</li>
                  <li>• 3 programadores especializados</li>
                  <li>• Reuniones de seguimiento</li>
                  <li>• Capacitación y documentación</li>
                  <li>• Propiedad total del código</li>
                </ul>
              </div>
            </Card>

            <Card className="card-minimal border-2 border-green-200 bg-green-50/30">
              <div className="text-center mb-6">
                <div className="inline-block px-4 py-2 bg-green-100 rounded-full text-sm font-medium text-green-700 mb-4">
                  Soporte Mensual
                </div>
                <div className="text-6xl font-bold text-gray-900 mb-2">USD 950</div>
                <p className="text-gray-600">Por mes</p>
              </div>
              
              <div className="mb-6">
                <h4 className="font-semibold mb-3">Programador Dedicado</h4>
                <ul className="space-y-2 text-gray-600 text-sm">
                  {[
                    "Monitoreo del sistema",
                    "Resolución de bugs y errores",
                    "Soporte técnico continuo",
                    "Respuesta a dudas funcionales",
                    "Mejoras y ajustes menores",
                    "Optimización de experiencia"
                  ].map((item, index) => (
                    <li key={index} className="flex items-start gap-2">
                      <CheckCircle className="h-5 w-5 text-green-600 mt-0.5 flex-shrink-0" />
                      {item}
                    </li>
                  ))}
                </ul>
              </div>

              <div className="bg-green-100 p-4 rounded-lg">
                <p className="text-xs text-green-900 font-semibold mb-1">💡 Recomendado</p>
                <p className="text-xs text-gray-700">
                  Plan opcional que se contrata después de la entrega del software para garantizar actualizaciones continuas y soporte profesional.
                </p>
              </div>
            </Card>
          </div>
        </div>
      </section>

      <section className="py-20 border-t border-gray-100">
        <div className="container-narrow">
          <div className="max-w-2xl mb-16">
            <h2 className="text-4xl font-semibold text-gray-900 mb-4">
              Próximos Pasos
            </h2>
            <p className="text-lg text-gray-600">
              Proceso simple y claro desde la aprobación hasta la entrega final.
            </p>
          </div>

          <div className="grid md:grid-cols-5 gap-4">
            {[
              "Reunión inicial y aprobación",
              "Firma de acuerdo y pago del 40%",
              "Desarrollo y entregas parciales",
              "Capacitación y ajustes",
              "Entrega final y pago del 60%"
            ].map((step, index) => (
              <div key={index} className="process-step">
                <div className="process-number">PASO 0{index + 1}</div>
                <p className="text-sm text-gray-600">{step}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-20 border-t border-gray-100">
        <div className="container-narrow">
          <div className="max-w-2xl mb-16 text-center mx-auto">
            <h2 className="text-4xl font-semibold text-gray-900 mb-4">
              Proyectos destacados
            </h2>
            <p className="text-lg text-gray-600">
              Landing pages y sistemas que hemos diseñado y desarrollado para impulsar el crecimiento digital de nuestros clientes.
            </p>
          </div>

          <div className="portfolio-showcase">
            {[
              {
                url: "https://airibot.lat/",
                title: "AIRI",
                description: "Detective personal de vuelos baratos por WhatsApp con alertas instantáneas y búsqueda inteligente",
                tags: ["Landing Page", "SaaS", "WhatsApp Bot"],
                color: "#3B82F6",
                screenshot: "/assets/icons/airi-fly-find-alerts.png",
              },
              {
                url: "#",
                title: "Clínica Dental Sonrisa Perfecta",
                description: "Clínica dental especializada en brindar sonrisas perfectas con tecnología de vanguardia y atención personalizada",
                tags: ["Landing Page", "Salud", "Dental"],
                color: "#06B6D4",
                screenshot: "/assets/icons/clinica-dental-landing-page.png",
              },
              {
                url: "#",
                title: "KeePi",
                description: "Plataforma para almacenar y gestionar tus pertenencias donde quieras de forma segura",
                tags: ["Web App", "Storage", "Marketplace"],
                color: "#F59E0B",
                screenshot: "/assets/icons/KeePi - Almacena donde quieras.png",
              },
              {
                url: "#",
                title: "Artisan Furniture Co.",
                description: "Landing page para empresa de muebles artesanales de lujo con enfoque en la excelencia y calidad",
                tags: ["Landing Page", "E-commerce", "Furniture"],
                color: "#8B4513",
                screenshot: "/assets/icons/Artisan Furniture Co. - Handcrafted Excellence.png",
              },
              {
                url: "#",
                title: "George Growth",
                description: "Consultora especializada en crecimiento empresarial y desarrollo de negocios",
                tags: ["Landing Page", "Consultoría", "Growth"],
                color: "#1E40AF",
                screenshot: "/assets/icons/George Growth – George Growth.png",
              },
            ].map((project, index) => (
              <div key={index} className="browser-showcase-container">
                <div className="browser-showcase">
                  <div className="browser-showcase-header">
                    <div className="browser-dots">
                      <span className="browser-dot" style={{ background: "#FF5F57" }}></span>
                      <span className="browser-dot" style={{ background: "#FFBD2E" }}></span>
                      <span className="browser-dot" style={{ background: "#28CA42" }}></span>
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
                        <h3 className="browser-showcase-title" style={{ color: project.color }}>
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
        <div className="container-narrow">
          <div className="max-w-2xl mb-16">
            <h2 className="text-4xl font-semibold text-gray-900 mb-4">
              Cómo trabajamos
            </h2>
            <p className="text-lg text-gray-600">
              Un proceso simple y efectivo para transformar tus ideas en soluciones reales.
            </p>
          </div>

          <div className="grid md:grid-cols-4 gap-8">
            {[
              {
                step: "01",
                title: "Descubrimiento",
                description: "Analizamos tus necesidades y definimos objetivos claros.",
              },
              {
                step: "02",
                title: "Diseño",
                description: "Creamos una solución personalizada para tu negocio.",
              },
              {
                step: "03",
                title: "Desarrollo",
                description: "Construimos con las mejores prácticas y tecnología.",
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

      <section className="py-20 border-t border-gray-100">
        <div className="container-narrow">
          <div className="max-w-2xl mb-16">
            <h2 className="text-4xl font-semibold text-gray-900 mb-4">
              Lo que dicen nuestros clientes
            </h2>
            <p className="text-lg text-gray-600">
              Empresas que han transformado sus operaciones con nuestras soluciones.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-6">
            {[
              {
                quote: "La implementación del chatbot redujo nuestros tiempos de respuesta en un 80% y mejoró significativamente la satisfacción del cliente.",
                author: "María García",
                role: "CEO, TechStore",
              },
              {
                quote: "El sistema de automatización que desarrollaron nos permitió escalar operaciones sin aumentar costos. Excelente trabajo.",
                author: "Carlos Rodríguez",
                role: "Director de Operaciones, LogiCorp",
              },
              {
                quote: "Builders AI no solo entregó tecnología, sino que transformó nuestra forma de trabajar. Son verdaderos partners estratégicos.",
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
                  <div className="text-sm text-gray-500">{testimonial.role}</div>
                </div>
              </Card>
            ))}
          </div>
        </div>
      </section>

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
              Trabajé toda mi vida en marketing pero hace dos años me dedico al mundo de las automatizaciones y programación. Siempre fue mi gran pasión y a lo largo de los años fui tomando diferentes cursos que me fueron preparando.
            </p>
            <div className="flex justify-center gap-4">
              <Button
                className="btn-primary"
                onClick={() => window.open("https://calendar.app.google/XXwTHc1qvikRrd2f6", "_blank")}
              >
                Agenda una llamada
              </Button>
              <Button
                variant="outline"
                onClick={() => window.open("https://www.linkedin.com/in/gino-gentile/", "_blank")}
              >
                Conóceme en LinkedIn
              </Button>
            </div>
          </div>
        </div>
      </section>

      <section className="py-20 bg-gray-50/50">
        <div className="container-narrow">
          <div className="text-center">
            <h2 className="text-4xl font-semibold text-gray-900 mb-8">
              Somos Internacionales
            </h2>
            <div className="flex flex-wrap justify-center items-center gap-8 md:gap-12">
              {[
                { flag: "🇦🇷", name: "Argentina" },
                { flag: "🇨🇱", name: "Chile" },
                { flag: "🇨🇴", name: "Colombia" },
                { flag: "🇲🇽", name: "México" },
                { flag: "🇺🇸", name: "Estados Unidos" },
                { flag: "🇪🇸", name: "España" }
              ].map((country, index) => (
                <div key={index} className="flex flex-col items-center">
                  <div className="w-16 h-12 bg-gray-200 rounded-lg flex items-center justify-center mb-2">
                    <span className="text-2xl">{country.flag}</span>
                  </div>
                  <span className="text-sm text-gray-600">{country.name}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="py-20 bg-gray-900 text-white">
        <div className="container-narrow text-center">
          <h2 className="text-4xl font-semibold mb-4">
            ¿Listo para transformar la gestión de salud ocupacional?
          </h2>
          <p className="text-xl text-gray-300 mb-8 max-w-2xl mx-auto">
            Agenda una consulta gratuita y descubre cómo podemos digitalizar y automatizar todos tus procesos.
          </p>
          <div className="flex justify-center gap-4">
            <Button
              className="bg-white text-gray-900 hover:bg-gray-100 px-8 py-3"
              onClick={() => window.open("https://calendar.app.google/XXwTHc1qvikRrd2f6", "_blank")}
            >
              Comenzar ahora <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
            <Button
              variant="outline"
              className="border-white text-white hover:bg-white hover:text-gray-900 px-8 py-3"
              onClick={() => window.open('https://wa.me/17864087985', '_blank')}
            >
              WhatsApp <MessageSquare className="ml-2 h-4 w-4" />
            </Button>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default PropuestaSaintGobain;
