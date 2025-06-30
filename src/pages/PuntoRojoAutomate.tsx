import { useEffect } from "react";
import { motion } from "framer-motion";
import { Target, CheckCircle, MessageSquare, Bot, Calendar, DollarSign, Clock, Users, Shield, Zap, ArrowRight, FileText, Settings, BarChart3, Headphones, Workflow, Database, TrendingUp, Mail, CreditCard } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

const PuntoRojoAutomate = () => {
  useEffect(() => {
    // Scroll to top when component mounts
    window.scrollTo(0, 0);
    
    // Add smooth scrolling between sections
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
      anchor.addEventListener('click', function(e) {
        e.preventDefault();
        const targetId = this.getAttribute('href');
        if (targetId) {
          document.querySelector(targetId)?.scrollIntoView({
            behavior: 'smooth',
            block: 'start'
          });
        }
      });
    });
  }, []);

  const fadeInUp = {
    initial: { opacity: 0, y: 60 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: 0.6 }
  };

  const staggerContainer = {
    animate: {
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  return (
    <div className="min-h-screen overflow-x-hidden bg-background">
      <Header />
      
      {/* Hero Section */}
      <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
        {/* Enhanced Background Effects */}
        <div className="absolute inset-0 bg-gradient-to-br from-darkBlue via-slate-900 to-black"></div>
        <div className="absolute inset-0 hero-bg-overlay"></div>
        
        {/* Animated Grid Pattern */}
        <div className="absolute inset-0 bg-grid-pattern opacity-20"></div>
        
        {/* Floating Geometric Shapes */}
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute top-1/4 left-1/4 w-64 h-64 bg-neonGreen/5 rounded-full blur-3xl animate-pulse floating-shapes"></div>
          <div className="absolute top-3/4 right-1/4 w-96 h-96 bg-blue-500/5 rounded-full blur-3xl animate-pulse floating-shapes"></div>
          <div className="absolute bottom-1/4 left-1/3 w-48 h-48 bg-purple-500/5 rounded-full blur-3xl animate-pulse floating-shapes"></div>
        </div>

        <div className="container mx-auto px-4 py-32 relative z-10">
          <div className="max-w-4xl mx-auto text-center">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="mb-6"
            >
              <Badge className="bg-neonGreen/10 text-neonGreen border-neonGreen/20 px-4 py-2 text-sm font-mono">
                ⚡ Propuesta Técnica - Automatización
              </Badge>
            </motion.div>

            <motion.h1
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="text-5xl md:text-7xl font-bold mb-6 bg-gradient-to-r from-white via-white to-neonGreen bg-clip-text text-transparent leading-tight"
            >
              Automatización de Procesos
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.4 }}
              className="text-xl md:text-2xl text-white/80 mb-8 max-w-3xl mx-auto leading-relaxed"
            >
              Optimización integral de procesos administrativos, comerciales y de reporting con n8n
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.6 }}
              className="flex justify-center items-center mb-12"
            >
              <Button 
                size="lg" 
                className="bg-neonGreen text-darkBlue hover:bg-neonGreen/90 font-semibold px-8 py-4 text-lg button-glow"
                onClick={() => window.open('https://calendar.app.google/XXwTHc1qvikRrd2f6', '_blank')}
              >
                Agendar Reunión <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Objetivo Section */}
      <section className="py-20 bg-background section-enhanced-bg">
        <div className="absolute inset-0 light-bg-overlay"></div>
        
        <div className="container mx-auto px-4">
          <motion.div
            initial="initial"
            whileInView="animate"
            viewport={{ once: true }}
            variants={fadeInUp}
            className="max-w-6xl mx-auto"
          >
            <div className="text-center mb-16">
              <Badge className="mb-4 bg-neonGreen/10 text-neonGreen border-neonGreen/20">
                <Target className="h-4 w-4 mr-2" />
                Objetivo del Proyecto
              </Badge>
              <h2 className="text-4xl md:text-5xl font-bold mb-6">
                Transformación <span className="text-neonGreen">Operacional</span>
              </h2>
            </div>

            <Card className="bg-card/50 backdrop-blur-sm border-0 shadow-xl">
              <CardContent className="p-8 md:p-12">
                <p className="text-xl text-muted-foreground mb-8 leading-relaxed">
                  Automatizar procesos administrativos y operativos críticos en las áreas de administración, comercial y reporting, optimizando tiempos y reduciendo tareas manuales a través de flujos automatizados desarrollados en n8n.
                </p>
                
                <div className="grid md:grid-cols-3 gap-6">
                  {[
                    "Optimización de tiempos operativos",
                    "Reducción de tareas manuales",
                    "Flujos automatizados con n8n"
                  ].map((objetivo, index) => (
                    <motion.div
                      key={index}
                      initial={{ opacity: 0, x: -20 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      transition={{ delay: index * 0.1 }}
                      className="flex items-start space-x-3"
                    >
                      <CheckCircle className="h-6 w-6 text-neonGreen mt-1 flex-shrink-0" />
                      <p className="text-foreground">{objetivo}</p>
                    </motion.div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </motion.div>
        </div>
      </section>

      {/* Alcance del Proyecto Section */}
      <section className="py-20 bg-muted/30 section-enhanced-bg">
        <div className="absolute inset-0 light-bg-overlay"></div>
        
        <div className="container mx-auto px-4">
          <motion.div
            initial="initial"
            whileInView="animate"
            viewport={{ once: true }}
            variants={fadeInUp}
            className="text-center mb-16"
          >
            <Badge className="mb-4 bg-neonGreen/10 text-neonGreen border-neonGreen/20">
              <Workflow className="h-4 w-4 mr-2" />
              Alcance del Proyecto
            </Badge>
            <h2 className="text-4xl md:text-5xl font-bold mb-6">
              Procesos a <span className="text-neonGreen">Automatizar</span>
            </h2>
          </motion.div>

          <motion.div
            initial="initial"
            whileInView="animate"
            viewport={{ once: true }}
            variants={staggerContainer}
            className="max-w-6xl mx-auto"
          >
            <div className="grid lg:grid-cols-3 gap-8">
              {/* Administración y Proveedores */}
              <motion.div variants={fadeInUp}>
                <Card className="bg-card/50 backdrop-blur-sm border-0 shadow-xl h-full">
                  <CardContent className="p-8">
                    <div className="text-center mb-6">
                      <div className="inline-flex items-center justify-center w-16 h-16 bg-blue-500/10 rounded-xl mb-4">
                        <CreditCard className="h-8 w-8 text-blue-500" />
                      </div>
                      <h3 className="text-2xl font-bold text-blue-500 mb-2">A. Administración y Proveedores</h3>
                    </div>
                    
                    <div className="space-y-4">
                      {[
                        "Recepción y registro automático de facturas de proveedores",
                        "Asignación automatizada de fechas de pago",
                        "Seguimiento de pagos y cobros",
                        "Envío automático de comprobantes y recordatorios"
                      ].map((proceso, index) => (
                        <div key={index} className="flex items-start space-x-3">
                          <CheckCircle className="h-5 w-5 text-neonGreen mt-1 flex-shrink-0" />
                          <p className="text-muted-foreground text-sm">{proceso}</p>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </motion.div>

              {/* Precalificación de Leads */}
              <motion.div variants={fadeInUp}>
                <Card className="bg-card/50 backdrop-blur-sm border-0 shadow-xl h-full">
                  <CardContent className="p-8">
                    <div className="text-center mb-6">
                      <div className="inline-flex items-center justify-center w-16 h-16 bg-green-500/10 rounded-xl mb-4">
                        <Users className="h-8 w-8 text-green-500" />
                      </div>
                      <h3 className="text-2xl font-bold text-green-500 mb-2">B. Precalificación de Leads y Gestión Comercial</h3>
                    </div>
                    
                    <div className="space-y-4">
                      {[
                        "Calificación automática de leads en base a criterios definidos",
                        "Integración y actualización en Pipedrive",
                        "Envío automático de mails de precalificación o descalificación",
                        "Panel ágil para revisión y acciones rápidas del equipo comercial"
                      ].map((proceso, index) => (
                        <div key={index} className="flex items-start space-x-3">
                          <CheckCircle className="h-5 w-5 text-neonGreen mt-1 flex-shrink-0" />
                          <p className="text-muted-foreground text-sm">{proceso}</p>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </motion.div>

              {/* Reporting y Análisis */}
              <motion.div variants={fadeInUp}>
                <Card className="bg-card/50 backdrop-blur-sm border-0 shadow-xl h-full">
                  <CardContent className="p-8">
                    <div className="text-center mb-6">
                      <div className="inline-flex items-center justify-center w-16 h-16 bg-purple-500/10 rounded-xl mb-4">
                        <TrendingUp className="h-8 w-8 text-purple-500" />
                      </div>
                      <h3 className="text-2xl font-bold text-purple-500 mb-2">C. Reporting y Análisis de Campañas</h3>
                    </div>
                    
                    <div className="space-y-4">
                      {[
                        "Integración con herramientas de analítica (GA4, Search Console, Semrush, etc.)",
                        "Generación automática de reportes mensuales y trimestrales",
                        "Detección automática de alertas y oportunidades de mejora",
                        "Envío automático de reportes y alertas a clientes y equipo interno"
                      ].map((proceso, index) => (
                        <div key={index} className="flex items-start space-x-3">
                          <CheckCircle className="h-5 w-5 text-neonGreen mt-1 flex-shrink-0" />
                          <p className="text-muted-foreground text-sm">{proceso}</p>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Herramientas y Plataformas Section */}
      <section className="py-20 bg-background section-enhanced-bg">
        <div className="absolute inset-0 light-bg-overlay"></div>
        
        <div className="container mx-auto px-4">
          <motion.div
            initial="initial"
            whileInView="animate"
            viewport={{ once: true }}
            variants={fadeInUp}
            className="max-w-6xl mx-auto"
          >
            <div className="text-center mb-16">
              <Badge className="mb-4 bg-blue-500/10 text-blue-500 border-blue-500/20">
                <Settings className="h-4 w-4 mr-2" />
                Herramientas y Plataformas Integradas
              </Badge>
              <h2 className="text-4xl md:text-5xl font-bold mb-6">
                Stack <span className="text-neonGreen">Tecnológico</span>
              </h2>
            </div>

            <Card className="bg-card/50 backdrop-blur-sm border-0 shadow-xl">
              <CardContent className="p-8 md:p-12">
                <div className="grid lg:grid-cols-2 gap-12">
                  <div>
                    <h3 className="text-2xl font-bold mb-6 text-neonGreen">Plataforma Principal</h3>
                    <div className="space-y-4">
                      {[
                        "n8n (automatizador principal)",
                        "Gmail (correo y notificaciones)",
                        "Google Sheets (registro y gestión de datos)",
                        "Quicken, Paypal (gestión de pagos)",
                        "Pipedrive (CRM)"
                      ].map((tool, index) => (
                        <motion.div
                          key={index}
                          variants={fadeInUp}
                          className="flex items-start space-x-3"
                        >
                          <CheckCircle className="h-5 w-5 text-neonGreen mt-1 flex-shrink-0" />
                          <p className="text-muted-foreground">{tool}</p>
                        </motion.div>
                      ))}
                    </div>
                  </div>

                  <div>
                    <h3 className="text-2xl font-bold mb-6 text-neonGreen">Análisis y Reporting</h3>
                    <div className="grid grid-cols-2 gap-4">
                      {[
                        { name: "Search Console", icon: "🔍" },
                        { name: "GA4", icon: "📊" },
                        { name: "Semrush", icon: "📈" },
                        { name: "Ahrefs", icon: "🔗" },
                        { name: "Google Trends", icon: "📈" },
                        { name: "Slack", icon: "💬" }
                      ].map((tool, index) => (
                        <motion.div
                          key={index}
                          variants={fadeInUp}
                          className="bg-background/50 p-4 rounded-lg border border-border/50"
                        >
                          <div className="text-2xl mb-2">{tool.icon}</div>
                          <p className="font-semibold text-sm">{tool.name}</p>
                        </motion.div>
                      ))}
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        </div>
      </section>

      {/* Metodología Section */}
      <section className="py-20 bg-muted/30 section-enhanced-bg">
        <div className="absolute inset-0 light-bg-overlay"></div>
        
        <div className="container mx-auto px-4">
          <motion.div
            initial="initial"
            whileInView="animate"
            viewport={{ once: true }}
            variants={fadeInUp}
            className="text-center mb-16"
          >
            <Badge className="mb-4 bg-purple-500/10 text-purple-500 border-purple-500/20">
              <FileText className="h-4 w-4 mr-2" />
              Metodología y Etapas
            </Badge>
            <h2 className="text-4xl md:text-5xl font-bold mb-6">
              Proceso de <span className="text-neonGreen">Implementación</span>
            </h2>
          </motion.div>

          <motion.div
            initial="initial"
            whileInView="animate"
            viewport={{ once: true }}
            variants={staggerContainer}
            className="max-w-6xl mx-auto"
          >
            <div className="grid md:grid-cols-5 gap-6">
              {[
                { 
                  step: "1", 
                  title: "Kick-off & Relevamiento", 
                  desc: "Reunión inicial para definir prioridades, relevar detalles técnicos y permisos" 
                },
                { 
                  step: "2", 
                  title: "Mapa de Procesos", 
                  desc: "Documentación y diseño de los flujos a implementar" 
                },
                { 
                  step: "3", 
                  title: "Configuración y Desarrollo", 
                  desc: "Construcción de los workflows automatizados en n8n" 
                },
                { 
                  step: "4", 
                  title: "Pruebas y Ajustes", 
                  desc: "Validación, pruebas controladas y ajustes según feedback" 
                },
                { 
                  step: "5", 
                  title: "Capacitación y Puesta en Marcha", 
                  desc: "Entrega y capacitación al equipo usuario final" 
                }
              ].map((etapa, index) => (
                <motion.div
                  key={index}
                  variants={fadeInUp}
                  className="text-center relative"
                >
                  <div className="inline-flex items-center justify-center w-16 h-16 bg-neonGreen text-darkBlue rounded-full font-bold text-xl mb-6">
                    {etapa.step}
                  </div>
                  <h3 className="text-lg font-bold mb-4">{etapa.title}</h3>
                  <p className="text-muted-foreground text-sm">{etapa.desc}</p>
                  {index < 4 && (
                    <div className="hidden md:block absolute top-8 left-full w-full h-0.5 bg-gradient-to-r from-neonGreen to-transparent"></div>
                  )}
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </section>

      {/* Plazos e Inversión Section */}
      <section className="py-20 bg-background section-enhanced-bg">
        <div className="absolute inset-0 light-bg-overlay"></div>
        
        <div className="container mx-auto px-4">
          <motion.div
            initial="initial"
            whileInView="animate"
            viewport={{ once: true }}
            variants={staggerContainer}
            className="max-w-6xl mx-auto"
          >
            <div className="grid lg:grid-cols-2 gap-12">
              {/* Plazos */}
              <motion.div variants={fadeInUp}>
                <Card className="bg-card/50 backdrop-blur-sm border-0 shadow-xl h-full">
                  <CardContent className="p-8">
                    <div className="text-center mb-8">
                      <Badge className="mb-4 bg-orange-500/10 text-orange-500 border-orange-500/20">
                        <Clock className="h-4 w-4 mr-2" />
                        Plazo de Implementación
                      </Badge>
                      <h3 className="text-3xl font-bold mb-4">
                        Duración Estimada
                      </h3>
                      <div className="text-5xl font-bold text-neonGreen mb-2">2</div>
                      <p className="text-xl text-muted-foreground">meses (8 semanas)</p>
                    </div>
                    
                    <div className="space-y-4">
                      <p className="text-center text-muted-foreground">
                        Implementación completa de los 3 procesos principales
                      </p>
                      
                      <div className="grid grid-cols-2 gap-4 mt-6">
                        {[
                          "Relevamiento",
                          "Desarrollo",
                          "Pruebas",
                          "Capacitación"
                        ].map((fase, index) => (
                          <div key={index} className="bg-background/50 p-3 rounded-lg text-center">
                            <p className="font-semibold text-sm">{fase}</p>
                          </div>
                        ))}
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>

              {/* Inversión */}
              <motion.div variants={fadeInUp}>
                <Card className="bg-card/50 backdrop-blur-sm border-0 shadow-xl h-full">
                  <CardContent className="p-8">
                    <div className="text-center mb-8">
                      <Badge className="mb-4 bg-green-500/10 text-green-500 border-green-500/20">
                        <DollarSign className="h-4 w-4 mr-2" />
                        Inversión Total
                      </Badge>
                      <h3 className="text-3xl font-bold mb-6">Estructura de Pagos</h3>
                    </div>

                    <div className="space-y-6">
                      {/* Implementación */}
                      <div className="bg-background/50 p-6 rounded-lg">
                        <h4 className="text-xl font-bold text-neonGreen mb-2">🔧 Implementación Completa (3 procesos)</h4>
                        <div className="text-3xl font-bold mb-2">USD 4.400</div>
                        <div className="space-y-2 text-sm mb-4">
                          <div className="flex items-start">
                            <CheckCircle className="h-4 w-4 text-neonGreen mr-2 mt-0.5 flex-shrink-0" />
                            <span>Relevamiento, diseño y configuración de flujos</span>
                          </div>
                          <div className="flex items-start">
                            <CheckCircle className="h-4 w-4 text-neonGreen mr-2 mt-0.5 flex-shrink-0" />
                            <span>Integraciones necesarias</span>
                          </div>
                          <div className="flex items-start">
                            <CheckCircle className="h-4 w-4 text-neonGreen mr-2 mt-0.5 flex-shrink-0" />
                            <span>Capacitación y soporte inicial (15 días post go-live)</span>
                          </div>
                        </div>
                      </div>

                      {/* Condiciones Comerciales */}
                      <div className="bg-neonGreen/10 p-6 rounded-lg border border-neonGreen/20">
                        <h4 className="text-xl font-bold text-neonGreen mb-4">📋 Condiciones Comerciales</h4>
                        <div className="space-y-3 text-sm">
                          <div className="flex justify-between">
                            <span>40% anticipo para inicio:</span>
                            <span className="font-semibold">USD 1.760</span>
                          </div>
                          <div className="flex justify-between">
                            <span>30% contra avance intermedio:</span>
                            <span className="font-semibold">USD 1.320</span>
                          </div>
                          <div className="flex justify-between">
                            <span>30% contra entrega final:</span>
                            <span className="font-semibold">USD 1.320</span>
                          </div>
                        </div>
                        <div className="mt-4 p-3 bg-background/50 rounded-lg">
                          <p className="text-xs text-muted-foreground">
                            <strong>Opcional:</strong> Soporte y mantenimiento mensual: USD 300/mes
                          </p>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Próximos Pasos Section */}
      <section className="py-20 bg-gradient-to-r from-darkBlue to-darkBlue/90 text-white">
        <div className="container mx-auto px-4">
          <motion.div
            initial="initial"
            whileInView="animate"
            viewport={{ once: true }}
            variants={fadeInUp}
            className="max-w-4xl mx-auto text-center"
          >
            <Badge className="mb-6 bg-neonGreen/10 text-neonGreen border-neonGreen/20">
              <Calendar className="h-4 w-4 mr-2" />
              Próximos Pasos
            </Badge>
            <h2 className="text-4xl md:text-5xl font-bold mb-8">
              ¿Listo para <span className="text-neonGreen">Automatizar</span>?
            </h2>
            
            <div className="grid md:grid-cols-3 gap-4 mb-12">
              {[
                "Confirmar aprobación de propuesta",
                "Agendar reunión de kick-off y relevamiento",
                "Firmar acuerdo de servicios (Si lo requieren)"
              ].map((step, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                  className="relative"
                >
                  <div className="bg-white/10 backdrop-blur-sm p-6 rounded-lg border border-white/20">
                    <div className="w-8 h-8 bg-neonGreen text-darkBlue rounded-full flex items-center justify-center font-bold text-sm mb-3 mx-auto">
                      {index + 1}
                    </div>
                    <p className="text-sm text-white/80">{step}</p>
                  </div>
                </motion.div>
              ))}
            </div>

            <div className="bg-white/5 backdrop-blur-sm p-6 rounded-lg border border-white/10 mb-8">
              <p className="text-sm text-white/60">
                <strong>Importante:</strong> No incluye gastos relacionados a suscripciones de programas, uso de IA, créditos de IA ni similares ni gastos de hosting o similares.
              </p>
            </div>

            <div className="flex justify-center">
              <Button 
                size="lg" 
                className="bg-neonGreen text-darkBlue hover:bg-neonGreen/90 font-semibold px-8 py-4 text-lg button-glow"
                onClick={() => window.open('https://calendar.app.google/XXwTHc1qvikRrd2f6', '_blank')}
              >
                Agendar Reunión <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
            </div>
          </motion.div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default PuntoRojoAutomate; 