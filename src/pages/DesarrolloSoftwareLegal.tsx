import { useEffect } from "react";
import { motion } from "framer-motion";
import { Shield, FileText, Briefcase, LayoutList, Calendar, Laptop, Database, Globe, CheckCircle, ArrowRight, Clock, DollarSign, BarChart3, Settings } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

const DesarrolloSoftwareLegal = () => {
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
        <div className="absolute inset-0 bg-gradient-to-br from-black via-gray-900 to-gray-800"></div>
        <div className="absolute inset-0 hero-bg-overlay"></div>
        <div className="absolute inset-0 bg-grid-pattern opacity-20"></div>
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute top-1/4 left-1/4 w-64 h-64 bg-blue-400/10 rounded-full blur-3xl animate-pulse floating-shapes"></div>
          <div className="absolute top-3/4 right-1/4 w-96 h-96 bg-purple-400/10 rounded-full blur-3xl animate-pulse floating-shapes"></div>
          <div className="absolute bottom-1/4 left-1/3 w-48 h-48 bg-indigo-400/10 rounded-full blur-3xl animate-pulse floating-shapes"></div>
        </div>
        <div className="container mx-auto px-4 py-32 relative z-10">
          <div className="max-w-4xl mx-auto text-center">
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }} className="mb-6">
              <Badge className="bg-blue-400/10 text-blue-400 border-blue-400/20 px-4 py-2 text-sm font-mono">
                ⚖️ Propuesta de Desarrollo - Software Legal
              </Badge>
            </motion.div>
            <motion.h1 initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8, delay: 0.2 }} className="text-5xl md:text-7xl font-bold mb-6 bg-gradient-to-r from-white via-white to-blue-400 bg-clip-text text-transparent leading-tight">
              Software Legal Colaborativo
            </motion.h1>
            <motion.p initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8, delay: 0.4 }} className="text-xl md:text-2xl text-white/80 mb-8 max-w-3xl mx-auto leading-relaxed">
              Aplicación online para gestión eficiente de expedientes y trabajo colaborativo en el ámbito legal.
            </motion.p>
            <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8, delay: 0.6 }} className="flex justify-center items-center mb-12">
              <Button size="lg" className="bg-blue-400 text-black hover:bg-blue-400/90 font-semibold px-8 py-4 text-lg button-glow" onClick={() => window.open('https://wa.me/17864087985', '_blank')}>
                Solicitar reunión <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
            </motion.div>
          </div>
        </div>
      </section>
      {/* Funcionalidades principales */}
      <section className="py-20 bg-background section-enhanced-bg">
        <div className="container mx-auto px-4">
          <motion.div initial="initial" whileInView="animate" viewport={{ once: true }} variants={fadeInUp} className="max-w-6xl mx-auto">
            <div className="text-center mb-16">
              <Badge className="mb-4 bg-blue-400/10 text-blue-400 border-blue-400/20">
                <Briefcase className="h-4 w-4 mr-2" />
                Principales Funcionalidades
              </Badge>
              <h2 className="text-4xl md:text-5xl font-bold mb-6">
                Gestión <span className="text-blue-400">Integral</span> de Expedientes
              </h2>
            </div>
            <div className="grid md:grid-cols-2 gap-8">
              <Card className="bg-card/50 backdrop-blur-sm border-0 shadow-xl">
                <CardContent className="p-8">
                  <h3 className="text-2xl font-bold mb-6">Funcionalidades Core</h3>
                  <div className="space-y-4">
                    {[
                      "Acceso seguro por Login (Google)",
                      "Permisos y roles (Admin, Editor, Visor)",
                      "Expedientes individuales por casos",
                      "Vista Kanban o Lista adaptativa"
                    ].map((feature, index) => (
                      <div key={index} className="flex items-start space-x-3">
                        <CheckCircle className="h-6 w-6 text-blue-400 mt-1 flex-shrink-0" />
                        <p className="text-foreground">{feature}</p>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
              <div className="grid grid-cols-2 gap-4">
                <Card className="bg-card/50 backdrop-blur-sm border-0 shadow-xl">
                  <CardContent className="p-6 flex flex-col items-center justify-center h-full">
                    <Shield className="h-12 w-12 text-blue-400 mb-3" />
                    <h4 className="font-semibold text-center">Acceso Seguro</h4>
                    <p className="text-sm text-muted-foreground text-center mt-2">Login con Google</p>
                  </CardContent>
                </Card>
                <Card className="bg-card/50 backdrop-blur-sm border-0 shadow-xl">
                  <CardContent className="p-6 flex flex-col items-center justify-center h-full">
                    <LayoutList className="h-12 w-12 text-blue-400 mb-3" />
                    <h4 className="font-semibold text-center">Vista Flexible</h4>
                    <p className="text-sm text-muted-foreground text-center mt-2">Kanban o Lista</p>
                  </CardContent>
                </Card>
              </div>
            </div>
          </motion.div>
        </div>
      </section>
      {/* Stack Tecnológico */}
      <section className="py-20 bg-muted/30 section-enhanced-bg">
        <div className="container mx-auto px-4">
          <motion.div initial="initial" whileInView="animate" viewport={{ once: true }} variants={fadeInUp} className="text-center mb-16">
            <Badge className="mb-4 bg-blue-400/10 text-blue-400 border-blue-400/20">
              <Settings className="h-4 w-4 mr-2" />
              Stack Tecnológico
            </Badge>
            <h2 className="text-4xl md:text-5xl font-bold mb-6">
              Tecnologías <span className="text-blue-400">Líderes</span> en la Industria
            </h2>
          </motion.div>
          <motion.div initial="initial" whileInView="animate" viewport={{ once: true }} variants={staggerContainer} className="max-w-4xl mx-auto">
            <Card className="bg-card/50 backdrop-blur-sm border-0 shadow-xl">
              <CardContent className="p-8 md:p-12">
                <div className="grid md:grid-cols-3 gap-6">
                  {[
                    { icon: <Laptop className="h-10 w-10 text-blue-400 mx-auto mb-2" />, title: "React (Next.js)", desc: "Frontend moderno y escalable" },
                    { icon: <Database className="h-10 w-10 text-blue-400 mx-auto mb-2" />, title: "Supabase", desc: "Base de datos robusta" },
                    { icon: <Globe className="h-10 w-10 text-blue-400 mx-auto mb-2" />, title: "Vercel", desc: "Despliegue optimizado" },
                    { icon: <Shield className="h-10 w-10 text-blue-400 mx-auto mb-2" />, title: "Auth Google", desc: "Seguridad garantizada" },
                    { icon: <BarChart3 className="h-10 w-10 text-blue-400 mx-auto mb-2" />, title: "Escalable", desc: "Crecimiento sin límites" },
                  ].map((tech, index) => (
                    <div key={index} className="text-center bg-background/50 p-6 rounded-lg border border-border/50 flex flex-col items-center">
                      {tech.icon}
                      <h4 className="font-semibold mb-2">{tech.title}</h4>
                      <p className="text-muted-foreground text-sm">{tech.desc}</p>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </motion.div>
        </div>
      </section>
      {/* Metodología */}
      <section className="py-20 bg-background section-enhanced-bg">
        <div className="container mx-auto px-4">
          <motion.div initial="initial" whileInView="animate" viewport={{ once: true }} variants={fadeInUp} className="text-center mb-16">
            <Badge className="mb-4 bg-purple-400/10 text-purple-400 border-purple-400/20">
              <FileText className="h-4 w-4 mr-2" />
              Metodología y Alcance
            </Badge>
            <h2 className="text-4xl md:text-5xl font-bold mb-6">
              Proceso <span className="text-blue-400">Colaborativo</span>
            </h2>
          </motion.div>
          <motion.div initial="initial" whileInView="animate" viewport={{ once: true }} variants={staggerContainer} className="max-w-4xl mx-auto">
            <Card className="bg-card/50 backdrop-blur-sm border-0 shadow-xl">
              <CardContent className="p-8 md:p-12">
                <div className="grid md:grid-cols-2 gap-8">
                  {[
                    { icon: "📋", title: "Definición del PRD", desc: "Documento detallado de requisitos y funcionalidades" },
                    { icon: "🎨", title: "Diseño y Prototipado", desc: "Interfaz intuitiva para abogados y personal legal" },
                    { icon: "🔧", title: "Desarrollo Iterativo", desc: "Entregas parciales y retroalimentación continua" },
                    { icon: "📊", title: "Informes Quincenales", desc: "Seguimiento transparente del progreso" }
                  ].map((item, index) => (
                    <div key={index} className="flex items-start space-x-4">
                      <div className="text-3xl">{item.icon}</div>
                      <div>
                        <h4 className="font-semibold mb-2">{item.title}</h4>
                        <p className="text-muted-foreground text-sm">{item.desc}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </motion.div>
        </div>
      </section>
      {/* Tiempos e Inversión */}
      <section className="py-20 bg-muted/30 section-enhanced-bg">
        <div className="container mx-auto px-4">
          <motion.div initial="initial" whileInView="animate" viewport={{ once: true }} variants={staggerContainer} className="max-w-6xl mx-auto">
            <div className="grid lg:grid-cols-2 gap-12">
              {/* Tiempos */}
              <motion.div variants={fadeInUp} className="lg:col-span-2">
                <Card className="bg-card/50 backdrop-blur-sm border-0 shadow-xl">
                  <CardContent className="p-8">
                    <div className="text-center mb-8">
                      <Badge className="mb-4 bg-purple-400/10 text-purple-400 border-purple-400/20">
                        <Clock className="h-4 w-4 mr-2" />
                        Tiempos Estimados
                      </Badge>
                      <h3 className="text-3xl font-bold mb-4">Duración del Proyecto</h3>
                    </div>
                    <div className="grid md:grid-cols-2 gap-8">
                      <div className="text-center">
                        <div className="text-6xl font-bold text-blue-400 mb-2">2-3</div>
                        <p className="text-2xl text-muted-foreground mb-4">meses</p>
                        <div className="bg-background/50 p-4 rounded-lg">
                          <div className="flex items-center justify-center space-x-2 mb-3">
                            <Calendar className="h-5 w-5 text-purple-400" />
                            <p className="font-semibold">Seguimiento quincenal</p>
                          </div>
                          <p className="text-sm text-muted-foreground">Informes detallados de avances cada 15 días</p>
                        </div>
                      </div>
                      <div>
                        <h4 className="font-semibold mb-4 text-center">Fases del Proyecto</h4>
                        <div className="space-y-3">
                          {[
                            { fase: "Análisis y PRD", icon: "📋" },
                            { fase: "Diseño UI/UX", icon: "🎨" },
                            { fase: "Desarrollo", icon: "⚙️" },
                            { fase: "Pruebas y ajustes", icon: "🧪" }
                          ].map((item, index) => (
                            <div key={index} className="bg-background/50 p-3 rounded-lg flex items-center justify-between">
                              <div className="flex items-center space-x-3">
                                <span className="text-2xl">{item.icon}</span>
                                <p className="font-semibold">{item.fase}</p>
                              </div>
                            </div>
                          ))}
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
              {/* Propuesta Económica */}
              <motion.div variants={fadeInUp} className="lg:col-span-2">
                <div className="text-center mb-8">
                  <Badge className="mb-4 bg-blue-400/10 text-blue-400 border-blue-400/20">
                    <DollarSign className="h-4 w-4 mr-2" />
                    Propuesta Económica
                  </Badge>
                  <h3 className="text-3xl font-bold mb-6">Opciones de Inversión</h3>
                </div>
                <Card className="bg-gradient-to-br from-blue-400/20 to-purple-400/20 backdrop-blur-sm border-2 border-blue-400/30 shadow-2xl relative overflow-hidden">
                  <CardContent className="p-8">
                    <div className="flex items-center justify-between mb-4">
                      <h4 className="text-2xl font-bold text-blue-400">💼 Desarrollo de Software Legal</h4>
                      <Badge className="bg-blue-400/20 text-blue-400 border-blue-400/30">Proyecto único</Badge>
                    </div>
                    <div className="grid md:grid-cols-2 gap-6">
                      <div>
                        <div className="text-4xl font-bold text-blue-400 mb-2">USD 2.100</div>
                        <p className="text-sm text-muted-foreground mb-4">También se puede pagar en Pesos a Cambio Oficial</p>
                        <div className="space-y-2 text-sm">
                          <div className="flex items-center">
                            <CheckCircle className="h-4 w-4 text-blue-400 mr-2" />
                            <span className="font-semibold">Proyecto llave en mano</span>
                          </div>
                          <div className="flex items-center">
                            <CheckCircle className="h-4 w-4 text-blue-400 mr-2" />
                            <span className="font-semibold">Soporte exclusivo para errores/bugs</span>
                          </div>
                          <div className="flex items-center">
                            <CheckCircle className="h-4 w-4 text-blue-400 mr-2" />
                            <span className="font-semibold">Entrega en 2-3 meses</span>
                          </div>
                        </div>
                      </div>
                      <div className="bg-blue-400/10 p-4 rounded-lg border border-blue-400/20">
                        <h5 className="font-semibold mb-2 text-blue-400">Costos adicionales:</h5>
                        <div className="space-y-1 text-sm">
                          <p>• Soporte mensual: $150.000</p>
                          <p>• Servidor: U$D 25/mes</p>
                          <p>• Base de datos: U$D 25/mes</p>
                          <p>• Dominio: No incluido</p>
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
      {/* Próximos Pasos */}
      <section className="py-20 bg-gradient-to-r from-black to-gray-900 text-white">
        <div className="container mx-auto px-4">
          <motion.div initial="initial" whileInView="animate" viewport={{ once: true }} variants={fadeInUp} className="max-w-4xl mx-auto text-center">
            <Badge className="mb-6 bg-blue-400/10 text-blue-400 border-blue-400/20">
              <FileText className="h-4 w-4 mr-2" />
              Próximos Pasos
            </Badge>
            <h2 className="text-4xl md:text-5xl font-bold mb-8">
              Comencemos a <span className="text-blue-400">Modernizar</span> su Práctica Legal
            </h2>
            <div className="grid md:grid-cols-3 gap-6 mb-12">
              {[
                { step: "1", title: "Aceptación", desc: "Aprobación de la propuesta" },
                { step: "2", title: "Reunión PRD", desc: "Definición detallada de requisitos" },
                { step: "3", title: "Desarrollo", desc: "Inicio del proyecto con informes quincenales" }
              ].map((item, index) => (
                <div key={index} className="relative">
                  <div className="bg-white/10 backdrop-blur-sm p-6 rounded-lg border border-white/20">
                    <div className="w-12 h-12 bg-blue-400 text-black rounded-full flex items-center justify-center font-bold text-lg mb-4 mx-auto">
                      {item.step}
                    </div>
                    <h4 className="font-bold mb-2">{item.title}</h4>
                    <p className="text-sm text-white/80">{item.desc}</p>
                  </div>
                  {index < 2 && (
                    <div className="hidden md:block absolute top-1/2 -right-3 w-6 h-0.5 bg-blue-400/50"></div>
                  )}
                </div>
              ))}
            </div>
            <div className="flex justify-center">
              <Button size="lg" className="bg-blue-400 text-black hover:bg-blue-400/90 font-semibold px-8 py-4 text-lg button-glow" onClick={() => window.open('https://wa.me/17864087985', '_blank')}>
                Agendar reunión inicial <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
            </div>
          </motion.div>
        </div>
      </section>
      <Footer />
    </div>
  );
};

export default DesarrolloSoftwareLegal;