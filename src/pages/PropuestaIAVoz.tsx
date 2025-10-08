import { useEffect } from "react";
import { motion } from "framer-motion";
import { Target, CheckCircle, MessageSquare, Bot, Calendar, DollarSign, Clock, Users, Shield, Zap, ArrowRight, FileText, Settings, BarChart3, Headphones } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

const PropuestaIAVoz = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
    
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

    const script = document.createElement('script');
    script.src = 'https://unpkg.com/@elevenlabs/convai-widget-embed';
    script.async = true;
    script.type = 'text/javascript';
    document.body.appendChild(script);

    return () => {
      document.body.removeChild(script);
    };
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
      
      <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-darkBlue via-slate-900 to-black"></div>
        <div className="absolute inset-0 hero-bg-overlay"></div>
        
        <div className="absolute inset-0 bg-grid-pattern opacity-20"></div>
        
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
                🎙️ Propuesta Técnica - IA Voz
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
              className="flex flex-col sm:flex-row justify-center items-center gap-4 mb-12"
            >
              <Button 
                size="lg" 
                className="bg-neonGreen text-darkBlue hover:bg-neonGreen/90 font-semibold px-8 py-4 text-lg button-glow"
                onClick={() => {
                  const widget = document.querySelector('elevenlabs-convai') as any;
                  if (widget && widget.startConversation) {
                    widget.startConversation();
                  }
                }}
              >
                <Headphones className="mr-2 h-5 w-5" />
                Hablar con IA Voz
              </Button>
              <Button 
                size="lg" 
                variant="outline"
                className="border-neonGreen text-neonGreen hover:bg-neonGreen/10 font-semibold px-8 py-4 text-lg"
                onClick={() => window.open('https://calendar.app.google/XXwTHc1qvikRrd2f6', '_blank')}
              >
                Agendar Reunión <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
            </motion.div>
          </div>
        </div>
      </section>

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
                Agente de Voz <span className="text-neonGreen">Inteligente</span>
              </h2>
            </div>

            <Card className="bg-card/50 backdrop-blur-sm border-0 shadow-xl">
              <CardContent className="p-8 md:p-12">
                <p className="text-xl text-muted-foreground leading-relaxed">
                  Desarrollo e implementación de un Agente de Voz Inteligente capaz de atender llamadas inbound utilizando lenguaje natural, con integración a una base de conocimiento dinámica, capacidad de agendamiento de turnos en tiempo real, y posibilidad de escalar a agentes humanos cuando sea necesario.
                </p>
              </CardContent>
            </Card>
          </motion.div>
        </div>
      </section>

      <section className="py-20 bg-muted/30 section-enhanced-bg">
        <div className="absolute inset-0 light-bg-overlay"></div>
        
        <div className="container mx-auto px-4">
          <motion.div
            initial="initial"
            whileInView="animate"
            viewport={{ once: true }}
            variants={fadeInUp}
            className="max-w-6xl mx-auto mb-20"
          >
            <div className="text-center mb-12">
              <Badge className="mb-4 bg-purple-500/10 text-purple-500 border-purple-500/20">
                <BarChart3 className="h-4 w-4 mr-2" />
                Panel de Análisis
              </Badge>
              <h2 className="text-4xl md:text-5xl font-bold mb-6">
                Métricas en <span className="text-neonGreen">Tiempo Real</span>
              </h2>
            </div>

            <Card className="bg-card/50 backdrop-blur-sm border-0 shadow-xl">
              <CardContent className="p-8 md:p-12">
                <div className="mb-8">
                  <p className="text-lg text-muted-foreground">Buenos días, Gino</p>
                  <p className="text-sm text-muted-foreground mt-1">Todos los agentes</p>
                  <p className="text-xs text-muted-foreground mt-1">Último mes</p>
                </div>

                <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-6">
                  <motion.div
                    variants={fadeInUp}
                    className="space-y-2"
                  >
                    <p className="text-sm text-muted-foreground">Número de llamadas</p>
                    <p className="text-3xl font-bold text-neonGreen">4</p>
                  </motion.div>

                  <motion.div
                    variants={fadeInUp}
                    className="space-y-2"
                  >
                    <p className="text-sm text-muted-foreground">Duración promedio</p>
                    <p className="text-3xl font-bold">0:10</p>
                  </motion.div>

                  <motion.div
                    variants={fadeInUp}
                    className="space-y-2"
                  >
                    <p className="text-sm text-muted-foreground">Costo total</p>
                    <p className="text-3xl font-bold">226</p>
                    <p className="text-xs text-muted-foreground">créditos</p>
                  </motion.div>

                  <motion.div
                    variants={fadeInUp}
                    className="space-y-2"
                  >
                    <p className="text-sm text-muted-foreground">Costo promedio</p>
                    <p className="text-2xl font-bold">57</p>
                    <p className="text-xs text-muted-foreground">créditos/llamada</p>
                  </motion.div>

                  <motion.div
                    variants={fadeInUp}
                    className="space-y-2"
                  >
                    <p className="text-sm text-muted-foreground">Costo total LLM</p>
                    <p className="text-2xl font-bold text-green-500">$0.0001</p>
                  </motion.div>

                  <motion.div
                    variants={fadeInUp}
                    className="space-y-2"
                  >
                    <p className="text-sm text-muted-foreground">Costo promedio LLM</p>
                    <p className="text-2xl font-bold text-green-500">$0.0002</p>
                    <p className="text-xs text-muted-foreground">/min</p>
                  </motion.div>
                </div>

                <div className="mt-8 p-4 bg-neonGreen/10 rounded-lg border border-neonGreen/20">
                  <p className="text-sm text-neonGreen font-semibold">
                    💡 Dashboard completo con analytics en tiempo real incluido en la mensualidad
                  </p>
                </div>

                <div className="mt-12">
                  <h3 className="text-xl font-bold mb-6">Historial de Llamadas</h3>
                  <div className="overflow-x-auto">
                    <table className="w-full">
                      <thead>
                        <tr className="border-b border-border">
                          <th className="text-left py-3 px-4 text-sm font-semibold text-muted-foreground">Fecha</th>
                          <th className="text-left py-3 px-4 text-sm font-semibold text-muted-foreground">Agente</th>
                          <th className="text-left py-3 px-4 text-sm font-semibold text-muted-foreground">Duración</th>
                          <th className="text-left py-3 px-4 text-sm font-semibold text-muted-foreground">Mensajes</th>
                          <th className="text-left py-3 px-4 text-sm font-semibold text-muted-foreground">Resultado</th>
                        </tr>
                      </thead>
                      <tbody>
                        {[
                          { date: "Oct 6, 2025 at 4:32 PM", agent: "Juan", duration: "0:01", messages: "0", result: "Unknown", resultColor: "text-gray-500" },
                          { date: "Oct 6, 2025 at 2:59 PM", agent: "Juan", duration: "0:07", messages: "1", result: "Successful", resultColor: "text-green-500" },
                          { date: "Oct 6, 2025 at 2:59 PM", agent: "Juan", duration: "0:10", messages: "1", result: "Successful", resultColor: "text-green-500" },
                          { date: "Oct 6, 2025 at 2:58 PM", agent: "Juan", duration: "0:22", messages: "3", result: "Successful", resultColor: "text-green-500" },
                          { date: "Aug 27, 2025 at 12:29 PM", agent: "Nico", duration: "0:17", messages: "3", result: "Successful", resultColor: "text-green-500" },
                          { date: "Aug 27, 2025 at 12:27 PM", agent: "Nico", duration: "0:45", messages: "7", result: "Successful", resultColor: "text-green-500" },
                          { date: "Aug 27, 2025 at 12:27 PM", agent: "Nico", duration: "0:01", messages: "0", result: "Error", resultColor: "text-red-500" }
                        ].map((call, index) => (
                          <tr key={index} className="border-b border-border/50 hover:bg-muted/50 transition-colors">
                            <td className="py-3 px-4 text-sm">{call.date}</td>
                            <td className="py-3 px-4 text-sm font-medium">{call.agent}</td>
                            <td className="py-3 px-4 text-sm">{call.duration}</td>
                            <td className="py-3 px-4 text-sm">{call.messages}</td>
                            <td className={`py-3 px-4 text-sm font-semibold ${call.resultColor}`}>{call.result}</td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>
              </CardContent>
            </Card>
          </motion.div>

          <motion.div
            initial="initial"
            whileInView="animate"
            viewport={{ once: true }}
            variants={fadeInUp}
            className="max-w-6xl mx-auto mb-20"
          >
            <div className="text-center mb-12">
              <Badge className="mb-4 bg-blue-500/10 text-blue-500 border-blue-500/20">
                <MessageSquare className="h-4 w-4 mr-2" />
                Análisis de Conversaciones
              </Badge>
              <h2 className="text-4xl md:text-5xl font-bold mb-6">
                Transcripción y <span className="text-neonGreen">Análisis Detallado</span>
              </h2>
            </div>

            <Card className="bg-card/50 backdrop-blur-sm border-0 shadow-xl">
              <CardContent className="p-8 md:p-12">
                <div className="mb-6">
                  <h3 className="text-2xl font-bold mb-2">Conversación con Juan</h3>
                  <p className="text-sm text-muted-foreground font-mono">conv_6801k6xatkw3fvh8tqddm1k7yfm7</p>
                </div>

                <div className="mb-8 bg-background/50 rounded-lg p-6 border border-border/50">
                  <div className="flex items-center justify-between mb-4">
                    <div className="flex items-center gap-4">
                      <button className="w-12 h-12 bg-neonGreen/10 rounded-full flex items-center justify-center hover:bg-neonGreen/20 transition-colors">
                        <div className="w-0 h-0 border-t-8 border-t-transparent border-l-12 border-l-neonGreen border-b-8 border-b-transparent ml-1"></div>
                      </button>
                      <div>
                        <p className="text-sm font-medium">1.0x</p>
                        <p className="text-xs text-muted-foreground">0:00 / 0:08</p>
                      </div>
                    </div>
                  </div>
                  
                  <div className="bg-blue-500/10 border border-blue-500/20 rounded-lg p-4 mb-6">
                    <p className="text-sm text-blue-400">
                      💡 Puedes asegurar que tu agente devuelva respuestas de alta calidad a conversaciones como esta. Prueba Tests en la pestaña de Transcripción.
                    </p>
                  </div>

                  <div className="grid md:grid-cols-3 gap-4 mb-6">
                    <button className="px-4 py-2 bg-neonGreen/20 text-neonGreen rounded-lg font-semibold border-2 border-neonGreen">
                      Overview
                    </button>
                    <button className="px-4 py-2 bg-background rounded-lg hover:bg-muted transition-colors">
                      Transcription
                    </button>
                    <button className="px-4 py-2 bg-background rounded-lg hover:bg-muted transition-colors">
                      Client data
                    </button>
                  </div>

                  <div className="space-y-4">
                    <div className="bg-background rounded-lg p-4 border border-border/50">
                      <div className="flex items-start gap-3">
                        <div className="w-8 h-8 bg-neonGreen/10 rounded-full flex items-center justify-center flex-shrink-0">
                          <span className="text-neonGreen font-bold text-sm">J</span>
                        </div>
                        <div className="flex-1">
                          <div className="flex items-center gap-2 mb-1">
                            <p className="font-semibold">Juan</p>
                            <span className="text-xs text-muted-foreground">0:00</span>
                          </div>
                          <p className="text-muted-foreground mb-2">Hospital Español, buenas tardes, ¿en qué puedo ayudarlo?</p>
                          <div className="flex gap-2">
                            <Badge className="bg-purple-500/10 text-purple-500 border-purple-500/20 text-xs">TTS</Badge>
                            <Badge className="bg-green-500/10 text-green-500 border-green-500/20 text-xs">128 ms</Badge>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="border-t border-border pt-6">
                  <h4 className="font-semibold mb-4">Metadata</h4>
                  <div className="grid md:grid-cols-2 gap-6">
                    <div>
                      <p className="text-sm text-muted-foreground mb-1">Fecha</p>
                      <p className="font-medium">Hoy, 2:59 PM</p>
                    </div>
                    <div>
                      <p className="text-sm text-muted-foreground mb-1">Duración de conexión</p>
                      <p className="font-medium">0:10</p>
                    </div>
                    <div>
                      <p className="text-sm text-muted-foreground mb-1">Créditos (llamada)</p>
                      <div className="flex items-center gap-2">
                        <p className="font-medium">56</p>
                        <Badge className="bg-orange-500/10 text-orange-500 border-orange-500/20 text-xs">
                          Descuento de desarrollo aplicado
                        </Badge>
                      </div>
                    </div>
                    <div>
                      <p className="text-sm text-muted-foreground mb-1">Créditos (LLM)</p>
                      <p className="font-medium">0</p>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        </div>
      </section>

      <section className="py-20 bg-background section-enhanced-bg">
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
              Características Principales
            </Badge>
            <h2 className="text-4xl md:text-5xl font-bold mb-6">
              <span className="text-neonGreen">Funcionalidades</span> Avanzadas
            </h2>
          </motion.div>

          <motion.div
            initial="initial"
            whileInView="animate"
            viewport={{ once: true }}
            variants={staggerContainer}
            className="max-w-6xl mx-auto"
          >
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {[
                { icon: "🎯", title: "Planeación y preparación del Agente", desc: "Diseño de flujo conversacional, objetivos y guiones base adaptados al negocio" },
                { icon: "🤖", title: "Implementación de multiagentes en paralelo", desc: "Configuración de diferentes voces, idiomas o personalidades según caso de uso" },
                { icon: "🧠", title: "Base de conocimiento y tono de marca", desc: "Integración con documentos, FAQs y recursos internos para respuestas contextuales" },
                { icon: "🎙️", title: "Voces personalizadas o clonadas", desc: "Elección de voces preentrenadas o clonación de voz propia (opcional)" },
                { icon: "📞", title: "Registro y grabación de llamadas", desc: "Almacenamiento seguro y accesible para auditoría o análisis posterior" },
                { icon: "📝", title: "Transcripción automática", desc: "Conversión de voz a texto en tiempo real para análisis y trazabilidad" },
                { icon: "👥", title: "Derivación a agente humano", desc: "Transferencia fluida en caso de consultas fuera del alcance del agente" },
                { icon: "🧪", title: "Pruebas A/B y optimización continua", desc: "Evaluación de rendimiento, tasa de resolución y experiencia del usuario" },
                { icon: "🔧", title: "Optimizaciones mensuales", desc: "Ajustes de flujo, lenguaje y conocimiento según métricas y feedback" }
              ].map((feature, index) => (
                <motion.div
                  key={index}
                  variants={fadeInUp}
                  className="relative"
                >
                  <Card className="bg-card/50 backdrop-blur-sm border-0 shadow-xl h-full hover:shadow-2xl transition-shadow">
                    <CardContent className="p-6">
                      <div className="text-4xl mb-4">{feature.icon}</div>
                      <h4 className="text-lg font-semibold mb-3">{feature.title}</h4>
                      <p className="text-muted-foreground text-sm">{feature.desc}</p>
                    </CardContent>
                  </Card>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </section>

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
            <div className="text-center mb-12">
              <Badge className="mb-4 bg-purple-500/10 text-purple-500 border-purple-500/20">
                <Clock className="h-4 w-4 mr-2" />
                Tiempos y Costos
              </Badge>
              <h2 className="text-4xl md:text-5xl font-bold mb-6">
                Inversión y <span className="text-neonGreen">Plazos</span>
              </h2>
            </div>

            <Card className="bg-card/50 backdrop-blur-sm border-0 shadow-xl mb-8">
              <CardContent className="p-8 md:p-12">
                <div className="overflow-x-auto">
                  <table className="w-full">
                    <thead>
                      <tr className="border-b-2 border-neonGreen/20">
                        <th className="text-left py-4 px-4 text-lg font-bold text-neonGreen">Concepto</th>
                        <th className="text-left py-4 px-4 text-lg font-bold text-neonGreen">Detalle</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr className="border-b border-border/50">
                        <td className="py-4 px-4 font-semibold">Tiempo de implementación</td>
                        <td className="py-4 px-4 text-2xl font-bold text-neonGreen">2 meses</td>
                      </tr>
                      <tr className="border-b border-border/50">
                        <td className="py-4 px-4 font-semibold">Fee de implementación</td>
                        <td className="py-4 px-4 text-2xl font-bold">U$D 3.800</td>
                      </tr>
                      <tr>
                        <td className="py-4 px-4 font-semibold">Fee mensual de mantenimiento y optimización</td>
                        <td className="py-4 px-4 text-2xl font-bold">$850.000 ARS</td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </CardContent>
            </Card>

            <Card className="bg-red-500/10 backdrop-blur-sm border-2 border-red-500/20 shadow-xl">
              <CardContent className="p-8 md:p-12">
                <div className="flex items-start gap-4">
                  <div className="text-4xl">⚠️</div>
                  <div>
                    <h3 className="text-2xl font-bold text-red-400 mb-4">Importante</h3>
                    <p className="text-muted-foreground mb-4">
                      El presente presupuesto <strong>no incluye</strong> gastos variables relacionados con:
                    </p>
                    <ul className="space-y-2 text-muted-foreground">
                      <li className="flex items-start gap-2">
                        <span className="text-red-400 mt-1">•</span>
                        <span>Costo por minuto de llamada</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <span className="text-red-400 mt-1">•</span>
                        <span>Costo por número telefónico (Twilio u otro proveedor)</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <span className="text-red-400 mt-1">•</span>
                        <span>Costo de consumo de modelos de lenguaje (LLM)</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <span className="text-red-400 mt-1">•</span>
                        <span>Ni otros cargos variables de infraestructura o terceros</span>
                      </li>
                    </ul>
                  </div>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        </div>
      </section>

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
      
      <elevenlabs-convai agent-id="agent_2901k6xaes0pfakteypayhzne1t5"></elevenlabs-convai>
    </div>
  );
};

export default PropuestaIAVoz;