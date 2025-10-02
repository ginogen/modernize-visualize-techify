import { useEffect } from "react";
import { motion } from "framer-motion";
import { Target, CheckCircle, MessageSquare, Bot, Calendar, DollarSign, Clock, Users, Shield, Zap, ArrowRight, FileText, Settings, BarChart3, Headphones } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

const PropuestaIASalud = () => {
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
                🏥 Propuesta Técnica - IA en Salud
              </Badge>
            </motion.div>

            <motion.h1
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="text-5xl md:text-7xl font-bold mb-6 bg-gradient-to-r from-white via-white to-neonGreen bg-clip-text text-transparent leading-tight"
            >
              Sistema de Atención Automatizada
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.4 }}
              className="text-xl md:text-2xl text-white/80 mb-8 max-w-3xl mx-auto leading-relaxed"
            >
              Agentes conversacionales con IA para revolucionar la atención al paciente en el sector salud
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
                Transformación <span className="text-neonGreen">Digital</span> en Salud
              </h2>
            </div>

            <Card className="bg-card/50 backdrop-blur-sm border-0 shadow-xl">
              <CardContent className="p-8 md:p-12">
                <p className="text-xl text-muted-foreground mb-8 leading-relaxed">
                  Desarrollar e implementar un sistema de atención automatizada mediante agentes conversacionales con inteligencia artificial para:
                </p>
                
                <div className="grid md:grid-cols-2 gap-6">
                  {[
                    "Atender y dar seguimiento a consultas de pacientes desde múltiples canales (Facebook, Instagram, sitios web)",
                    "Centralizar y gestionar información mediante integración CRM",
                    "Facilitar campañas salientes (ej. control anual de chequeos)",
                    "Proveer un chat interno alternativo a WhatsApp sin restricciones de API"
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

      {/* Solución Propuesta Section */}
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
              <Bot className="h-4 w-4 mr-2" />
              Solución Propuesta
            </Badge>
            <h2 className="text-4xl md:text-5xl font-bold mb-6">
              Implementación del <span className="text-neonGreen">Bot Omnicanal</span>
            </h2>
          </motion.div>

          <motion.div
            initial="initial"
            whileInView="animate"
            viewport={{ once: true }}
            variants={staggerContainer}
            className="max-w-6xl mx-auto"
          >
            <Card className="bg-card/50 backdrop-blur-sm border-0 shadow-xl mb-8">
              <CardContent className="p-8 md:p-12">
                <div className="grid lg:grid-cols-2 gap-12">
                  <div>
                    <h3 className="text-2xl font-bold mb-6 text-neonGreen">Características Principales</h3>
                    <div className="space-y-4">
                      {[
                        "Desarrollo e implementación 100% a cargo de Builderbotia",
                        "IA conversacional con comprensión de contexto e intenciones",
                        "Widget embebible en sitios web (HE y Aliare)",
                        "Live Chat con derivación a agentes humanos según roles/permisos",
                        "Escalabilidad automática: desde 100 hasta +50.000 consultas mensuales"
                      ].map((feature, index) => (
                        <motion.div
                          key={index}
                          variants={fadeInUp}
                          className="flex items-start space-x-3"
                        >
                          <CheckCircle className="h-5 w-5 text-neonGreen mt-1 flex-shrink-0" />
                          <p className="text-muted-foreground">{feature}</p>
                        </motion.div>
                      ))}
                    </div>
                  </div>

                  <div>
                    <h3 className="text-2xl font-bold mb-6 text-neonGreen">Integraciones</h3>
                    <div className="grid grid-cols-2 gap-4">
                      {[
                        { name: "Instagram", icon: "📱" },
                        { name: "Facebook", icon: "📘" },
                        { name: "WhatsApp API", icon: "💬" },
                        { name: "Sistema de Mailing", icon: "📧" }
                      ].map((integration, index) => (
                        <motion.div
                          key={index}
                          variants={fadeInUp}
                          className="bg-background/50 p-4 rounded-lg border border-border/50"
                        >
                          <div className="text-2xl mb-2">{integration.icon}</div>
                          <p className="font-semibold">{integration.name}</p>
                        </motion.div>
                      ))}
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="bg-card/50 backdrop-blur-sm border-0 shadow-xl">
              <CardContent className="p-8 md:p-12">
                <h3 className="text-2xl font-bold mb-6 text-neonGreen">CRM Interno Integrado</h3>
                <div className="grid md:grid-cols-3 gap-6">
                  {[
                    { icon: Settings, title: "Etiquetado Inteligente", desc: "Clasificación automática de consultas" },
                    { icon: BarChart3, title: "Boards Visuales", desc: "Gestión visual de casos y seguimientos" },
                    { icon: Zap, title: "Automatización", desc: "Workflows por triggers y recordatorios" }
                  ].map((feature, index) => (
                    <motion.div
                      key={index}
                      variants={fadeInUp}
                      className="text-center"
                    >
                      <div className="inline-flex items-center justify-center w-16 h-16 bg-neonGreen/10 rounded-xl mb-4">
                        <feature.icon className="h-8 w-8 text-neonGreen" />
                      </div>
                      <h4 className="text-lg font-semibold mb-2">{feature.title}</h4>
                      <p className="text-muted-foreground text-sm">{feature.desc}</p>
                    </motion.div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </motion.div>
        </div>
      </section>

      {/* Chat Interno Alternativo Section */}
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
                <MessageSquare className="h-4 w-4 mr-2" />
                Chat Interno Alternativo
              </Badge>
              <h2 className="text-4xl md:text-5xl font-bold mb-6">
                Evita Restricciones de <span className="text-neonGreen">WhatsApp API</span>
              </h2>
            </div>

            <div className="grid lg:grid-cols-2 gap-12">
              <Card className="bg-card/50 backdrop-blur-sm border-0 shadow-xl">
                <CardContent className="p-8">
                  <h3 className="text-xl font-bold mb-6">Implementación</h3>
                  <div className="space-y-4">
                    {[
                      "Chat web embebido o mediante URL personalizada (ejemplo: bot.salud.com.ar)",
                      "Acceso libre e ilimitado para usuarios/pacientes",
                      "Autonomía para el equipo del cliente para modificar y actualizar la base de conocimiento"
                    ].map((item, index) => (
                      <div key={index} className="flex items-start space-x-3">
                        <CheckCircle className="h-5 w-5 text-neonGreen mt-1 flex-shrink-0" />
                        <p className="text-muted-foreground">{item}</p>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>

              <Card className="bg-card/50 backdrop-blur-sm border-0 shadow-xl">
                <CardContent className="p-8">
                  <h3 className="text-xl font-bold mb-6">Tecnología RAG + Embeddings</h3>
                  <p className="text-muted-foreground mb-4">
                    Comprensión de información compleja desde:
                  </p>
                  <div className="grid grid-cols-3 gap-4">
                    {[
                      { type: "PDFs", icon: "📄" },
                      { type: "Excel", icon: "📊" },
                      { type: "DOCX", icon: "📝" }
                    ].map((doc, index) => (
                      <div key={index} className="bg-background/50 p-4 rounded-lg text-center">
                        <div className="text-2xl mb-2">{doc.icon}</div>
                        <p className="font-semibold text-sm">{doc.type}</p>
                      </div>
                    ))}
                  </div>
                  <div className="mt-6 p-4 bg-neonGreen/10 rounded-lg">
                    <p className="text-sm text-neonGreen font-semibold">
                      Agentes de IA con conocimiento específico en procedimientos, normativas y coberturas
                    </p>
                  </div>
                </CardContent>
              </Card>
            </div>
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
              Metodología de Trabajo
            </Badge>
            <h2 className="text-4xl md:text-5xl font-bold mb-6">
              Proceso <span className="text-neonGreen">Integral</span>
            </h2>
          </motion.div>

          <motion.div
            initial="initial"
            whileInView="animate"
            viewport={{ once: true }}
            variants={staggerContainer}
            className="max-w-4xl mx-auto"
          >
            <Card className="bg-card/50 backdrop-blur-sm border-0 shadow-xl">
              <CardContent className="p-8 md:p-12">
                <div className="text-center mb-8">
                  <p className="text-xl font-semibold text-neonGreen">
                    Implementación 100% a cargo de Builderbotia
                  </p>
                  <p className="text-muted-foreground mt-2">
                    Entrenamiento, ajustes y puesta en producción incluidos
                  </p>
                </div>

                <div className="grid md:grid-cols-2 gap-8">
                  {[
                    { icon: "🎯", title: "Demo Funcionales", desc: "Presentaciones interactivas del sistema" },
                    { icon: "👥", title: "Capacitaciones Prácticas", desc: "Entrenamiento completo al equipo interno" },
                    { icon: "🧪", title: "Pruebas Exhaustivas", desc: "Testing completo antes del lanzamiento" },
                    { icon: "🛠️", title: "Soporte Técnico", desc: "Asistencia permanente post-implementación" }
                  ].map((item, index) => (
                    <motion.div
                      key={index}
                      variants={fadeInUp}
                      className="flex items-start space-x-4"
                    >
                      <div className="text-3xl">{item.icon}</div>
                      <div>
                        <h4 className="font-semibold mb-2">{item.title}</h4>
                        <p className="text-muted-foreground text-sm">{item.desc}</p>
                      </div>
                    </motion.div>
                  ))}
                </div>
              </CardContent>
            </Card>
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
                        Plazos Estimados
                      </Badge>
                      <h3 className="text-3xl font-bold mb-4">
                        Duración Total del Proyecto
                      </h3>
                      <div className="text-5xl font-bold text-neonGreen mb-2">1 - 1.5</div>
                      <p className="text-xl text-muted-foreground">meses</p>
                    </div>
                    
                    <div className="space-y-4">
                      <p className="text-center text-muted-foreground">
                        Incluye fases de desarrollo, entrenamiento, pruebas y ajustes
                      </p>
                      
                      <div className="grid grid-cols-2 gap-4 mt-6">
                        {[
                          "Desarrollo",
                          "Entrenamiento",
                          "Pruebas",
                          "Ajustes"
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
                        Inversión
                      </Badge>
                      <h3 className="text-3xl font-bold mb-6">Estructura de Pagos</h3>
                    </div>

                    <div className="space-y-6">
                      {/* Implementación */}
                      <div className="bg-background/50 p-6 rounded-lg">
                        <h4 className="text-xl font-bold text-neonGreen mb-2">🔧 Etapa de Implementación</h4>
                        <div className="text-3xl font-bold mb-2">USD 4.800</div>
                        <p className="text-sm text-muted-foreground mb-4">(al tipo de cambio oficial)</p>
                        <div className="grid grid-cols-2 gap-2 text-sm">
                          <div className="flex items-center">
                            <CheckCircle className="h-4 w-4 text-neonGreen mr-2" />
                            50% al inicio
                          </div>
                          <div className="flex items-center">
                            <CheckCircle className="h-4 w-4 text-neonGreen mr-2" />
                            50% al finalizar
                          </div>
                        </div>
                      </div>

                      {/* Mensualidad */}
                      <div className="bg-neonGreen/10 p-6 rounded-lg border border-neonGreen/20">
                        <h4 className="text-xl font-bold text-neonGreen mb-2">📅 Mensualidad</h4>
                        <div className="text-3xl font-bold mb-4">$710.000</div>
                        
                        <div className="mb-4 p-3 bg-background/50 rounded">
                          <p className="text-xs font-semibold text-neonGreen mb-2">✅ El costo incluye:</p>
                          <p className="text-xs text-muted-foreground">
                            1 cuenta con hasta 5 miembros (Empleados) y 30mil contactos en base de datos
                          </p>
                        </div>

                        <div className="space-y-2 text-sm mb-4">
                          {[
                            "Hosting del bot en nuestra plataforma",
                            "Soporte y ajustes ilimitados",
                            "Asesor exclusivo",
                            "Acceso continuo a nuevas funcionalidades"
                          ].map((benefit, index) => (
                            <div key={index} className="flex items-start">
                              <CheckCircle className="h-4 w-4 text-neonGreen mr-2 mt-0.5 flex-shrink-0" />
                              <span>{benefit}</span>
                            </div>
                          ))}
                        </div>

                        <div className="mt-4 p-3 bg-red-500/10 rounded border border-red-500/20">
                          <p className="text-xs font-semibold text-red-400 mb-2">⚠️ Costos NO Incluidos:</p>
                          <ul className="text-xs text-muted-foreground space-y-1 list-disc list-inside">
                            <li>OpenAI API Credits (Consumos variables de la IA) - Deben proporcionar su API KEY</li>
                            <li>Costos de Mensajes Salientes (Estos mensajes lo deberán pagar directamente a Meta)</li>
                          </ul>
                        </div>

                        <div className="mt-4 p-3 bg-blue-500/10 rounded border border-blue-500/20">
                          <p className="text-xs font-semibold text-blue-400 mb-2">💰 Costos Adicionales:</p>
                          <ul className="text-xs text-muted-foreground space-y-1">
                            <li>• Cuenta adicional (otra entidad, misma configuración): USD $99/mes</li>
                            <li>• Miembro adicional (Empleado): USD $6/mes</li>
                            <li>• 10k contactos adicionales (usuarios/pacientes): USD $35/mes</li>
                          </ul>
                        </div>

                        <div className="mt-4 p-3 bg-yellow-500/10 rounded border border-yellow-500/20">
                          <p className="text-xs font-semibold text-yellow-400 mb-1">💡 Recomendación:</p>
                          <p className="text-xs text-muted-foreground">
                            Se recomienda tener una base S3 o similar para guardar por tiempo prolongado las conversaciones de WhatsApp (mensajes, media, etc.) ya que por defecto WhatsApp API lo guarda por 30 días.
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
              ¿Listo para <span className="text-neonGreen">Comenzar</span>?
            </h2>
            
            <div className="grid md:grid-cols-5 gap-4 mb-12">
              {[
                "Aprobación de la propuesta",
                "Firma de acuerdo inicial y pago del 50%",
                "Inicio del desarrollo",
                "Demostraciones intermedias + Capacitación",
                "Ajustes finales y entrega"
              ].map((step, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                  className="relative"
                >
                  <div className="bg-white/10 backdrop-blur-sm p-4 rounded-lg border border-white/20">
                    <div className="w-8 h-8 bg-neonGreen text-darkBlue rounded-full flex items-center justify-center font-bold text-sm mb-3 mx-auto">
                      {index + 1}
                    </div>
                    <p className="text-sm text-white/80">{step}</p>
                  </div>
                  {index < 4 && (
                    <div className="hidden md:block absolute top-1/2 -right-2 w-4 h-0.5 bg-neonGreen/50"></div>
                  )}
                </motion.div>
              ))}
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

export default PropuestaIASalud; 