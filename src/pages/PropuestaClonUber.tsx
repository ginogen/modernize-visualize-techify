import { useEffect } from "react";
import { motion } from "framer-motion";
import { Smartphone, MapPin, UserPlus, Car, DollarSign, Clock, Users, Settings, ArrowRight, FileText, Shield, UploadCloud, BarChart3, CheckCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

const PropuestaClonUber = () => {
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
          <div className="absolute top-1/4 left-1/4 w-64 h-64 bg-green-400/10 rounded-full blur-3xl animate-pulse floating-shapes"></div>
          <div className="absolute top-3/4 right-1/4 w-96 h-96 bg-yellow-400/10 rounded-full blur-3xl animate-pulse floating-shapes"></div>
          <div className="absolute bottom-1/4 left-1/3 w-48 h-48 bg-blue-400/10 rounded-full blur-3xl animate-pulse floating-shapes"></div>
        </div>
        <div className="container mx-auto px-4 py-32 relative z-10">
          <div className="max-w-4xl mx-auto text-center">
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }} className="mb-6">
              <Badge className="bg-green-400/10 text-green-400 border-green-400/20 px-4 py-2 text-sm font-mono">
                🚗 Propuesta Técnica - App tipo Uber
              </Badge>
            </motion.div>
            <motion.h1 initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8, delay: 0.2 }} className="text-5xl md:text-7xl font-bold mb-6 bg-gradient-to-r from-white via-white to-green-400 bg-clip-text text-transparent leading-tight">
              Desarrollo de App de Transporte
            </motion.h1>
            <motion.p initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8, delay: 0.4 }} className="text-xl md:text-2xl text-white/80 mb-8 max-w-3xl mx-auto leading-relaxed">
              Solución móvil inspirada en Uber, lista para Android, con funcionalidades clave y diseño profesional.
            </motion.p>
            <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8, delay: 0.6 }} className="flex justify-center items-center mb-12">
              <Button size="lg" className="bg-green-400 text-black hover:bg-green-400/90 font-semibold px-8 py-4 text-lg button-glow" onClick={() => window.open('https://wa.me/5491123456789', '_blank')}>
                Solicitar propuesta <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
            </motion.div>
          </div>
        </div>
      </section>
      {/* Características principales */}
      <section className="py-20 bg-background section-enhanced-bg">
        <div className="container mx-auto px-4">
          <motion.div initial="initial" whileInView="animate" viewport={{ once: true }} variants={fadeInUp} className="max-w-6xl mx-auto">
            <div className="text-center mb-16">
              <Badge className="mb-4 bg-green-400/10 text-green-400 border-green-400/20">
                <Smartphone className="h-4 w-4 mr-2" />
                Funcionalidades Clave
              </Badge>
              <h2 className="text-4xl md:text-5xl font-bold mb-6">
                App <span className="text-green-400">Mobile</span> para Transporte
              </h2>
            </div>
            <Card className="bg-card/50 backdrop-blur-sm border-0 shadow-xl">
              <CardContent className="p-8 md:p-12">
                <div className="grid md:grid-cols-2 gap-6">
                  <div className="space-y-4">
                    {["Registro de usuarios y conductores","Panel de conductores","Trackeo en tiempo real (mapa)","Cálculo de tarifas dinámicas","Notificaciones push","Historial de viajes","Panel de administración (opcional)","Métodos de pago integrables (opcional)",].map((feature, index) => (
                      <div key={index} className="flex items-start space-x-3">
                        <CheckCircle className="h-6 w-6 text-green-400 mt-1 flex-shrink-0" />
                        <p className="text-foreground">{feature}</p>
                      </div>
                    ))}
                  </div>
                  {/* Ejemplo de gráficos de funcionalidades */}
                  <div className="grid grid-cols-2 gap-4">
                    <div className="bg-background/50 p-4 rounded-lg border border-border/50 flex flex-col items-center">
                      <UserPlus className="h-10 w-10 text-green-400 mb-2" />
                      <span className="font-semibold text-center">Registro</span>
                    </div>
                    <div className="bg-background/50 p-4 rounded-lg border border-border/50 flex flex-col items-center">
                      <MapPin className="h-10 w-10 text-green-400 mb-2" />
                      <span className="font-semibold text-center">Mapa y Trackeo</span>
                    </div>
                    <div className="bg-background/50 p-4 rounded-lg border border-border/50 flex flex-col items-center">
                      <Car className="h-10 w-10 text-green-400 mb-2" />
                      <span className="font-semibold text-center">Panel Conductor</span>
                    </div>
                    <div className="bg-background/50 p-4 rounded-lg border border-border/50 flex flex-col items-center">
                      <DollarSign className="h-10 w-10 text-green-400 mb-2" />
                      <span className="font-semibold text-center">Tarifas</span>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        </div>
      </section>
      {/* Tecnologías */}
      <section className="py-20 bg-muted/30 section-enhanced-bg">
        <div className="container mx-auto px-4">
          <motion.div initial="initial" whileInView="animate" viewport={{ once: true }} variants={fadeInUp} className="text-center mb-16">
            <Badge className="mb-4 bg-green-400/10 text-green-400 border-green-400/20">
              <Settings className="h-4 w-4 mr-2" />
              Tecnologías Utilizadas
            </Badge>
            <h2 className="text-4xl md:text-5xl font-bold mb-6">
              Stack <span className="text-green-400">Tecnológico</span>
            </h2>
          </motion.div>
          <motion.div initial="initial" whileInView="animate" viewport={{ once: true }} variants={staggerContainer} className="max-w-4xl mx-auto">
            <Card className="bg-card/50 backdrop-blur-sm border-0 shadow-xl">
              <CardContent className="p-8 md:p-12">
                <div className="grid md:grid-cols-3 gap-6">
                  {[{ icon: <Smartphone className="h-10 w-10 text-green-400 mx-auto mb-2" />, title: "React Native", desc: "Desarrollo mobile cross-platform" },{ icon: <Settings className="h-10 w-10 text-green-400 mx-auto mb-2" />, title: "Supabase", desc: "Base de datos y autenticación" },{ icon: <MapPin className="h-10 w-10 text-green-400 mx-auto mb-2" />, title: "Google Maps API", desc: "Mapas y geolocalización" },{ icon: <UploadCloud className="h-10 w-10 text-green-400 mx-auto mb-2" />, title: "Play Store Ready", desc: "Listo para publicar en Android" },{ icon: <Shield className="h-10 w-10 text-green-400 mx-auto mb-2" />, title: "Notificaciones Push", desc: "Comunicación en tiempo real" },{ icon: <BarChart3 className="h-10 w-10 text-green-400 mx-auto mb-2" />, title: "Panel Admin (opcional)", desc: "Gestión de usuarios y viajes" },].map((tech, index) => (
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
      {/* Proceso de desarrollo */}
      <section className="py-20 bg-background section-enhanced-bg">
        <div className="container mx-auto px-4">
          <motion.div initial="initial" whileInView="animate" viewport={{ once: true }} variants={fadeInUp} className="text-center mb-16">
            <Badge className="mb-4 bg-yellow-400/10 text-yellow-400 border-yellow-400/20">
              <FileText className="h-4 w-4 mr-2" />
              Proceso de Desarrollo
            </Badge>
            <h2 className="text-4xl md:text-5xl font-bold mb-6">
              Metodología <span className="text-green-400">Ágil</span>
            </h2>
          </motion.div>
          <motion.div initial="initial" whileInView="animate" viewport={{ once: true }} variants={staggerContainer} className="max-w-4xl mx-auto">
            <Card className="bg-card/50 backdrop-blur-sm border-0 shadow-xl">
              <CardContent className="p-8 md:p-12">
                <div className="grid md:grid-cols-2 gap-8">
                  {[{ icon: "🎨", title: "Diseño UI/UX", desc: "Layout inspirado en Uber, adaptado a tu marca" },{ icon: "⚙️", title: "Desarrollo y Pruebas", desc: "Iteraciones y entregas parciales para revisión" },{ icon: "📦", title: "Publicación Play Store", desc: "Set up y acompañamiento para publicar la app" },{ icon: "🛠️", title: "Soporte y Ajustes", desc: "Ajustes y soporte post-lanzamiento (opcional)" }].map((item, index) => (
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
      {/* Plazos e Inversión */}
      <section className="py-20 bg-muted/30 section-enhanced-bg">
        <div className="container mx-auto px-4">
          <motion.div initial="initial" whileInView="animate" viewport={{ once: true }} variants={staggerContainer} className="max-w-6xl mx-auto">
            <div className="grid lg:grid-cols-2 gap-12">
              {/* Plazos */}
              <motion.div variants={fadeInUp}>
                <Card className="bg-card/50 backdrop-blur-sm border-0 shadow-xl h-full">
                  <CardContent className="p-8">
                    <div className="text-center mb-8">
                      <Badge className="mb-4 bg-yellow-400/10 text-yellow-400 border-yellow-400/20">
                        <Clock className="h-4 w-4 mr-2" />
                        Plazos Estimados
                      </Badge>
                      <h3 className="text-3xl font-bold mb-4">Duración Total del Proyecto</h3>
                      <div className="text-5xl font-bold text-green-400 mb-2">2 - 3</div>
                      <p className="text-xl text-muted-foreground">meses</p>
                    </div>
                    <div className="space-y-4">
                      <p className="text-center text-muted-foreground">Incluye diseño, desarrollo, pruebas y publicación en Play Store</p>
                      <div className="grid grid-cols-2 gap-4 mt-6">
                        {["Diseño","Desarrollo","Pruebas","Publicación"].map((fase, index) => (
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
                      <Badge className="mb-4 bg-green-400/10 text-green-400 border-green-400/20">
                        <DollarSign className="h-4 w-4 mr-2" />
                        Inversión
                      </Badge>
                      <h3 className="text-3xl font-bold mb-6">Estructura de Pagos</h3>
                    </div>
                    <div className="space-y-6">
                      <div className="bg-background/50 p-6 rounded-lg">
                        <h4 className="text-xl font-bold text-green-400 mb-2">🔧 Desarrollo Android</h4>
                        <div className="text-3xl font-bold mb-2">USD 3.600</div>
                        <p className="text-sm text-muted-foreground mb-4">(Solo para Play Store)</p>
                        <div className="grid grid-cols-2 gap-2 text-sm">
                          <div className="flex items-center">
                            <CheckCircle className="h-4 w-4 text-green-400 mr-2" />
                            50% al inicio
                          </div>
                          <div className="flex items-center">
                            <CheckCircle className="h-4 w-4 text-green-400 mr-2" />
                            50% al finalizar
                          </div>
                        </div>
                        <p className="text-xs text-muted-foreground mt-2">No incluye costos de servidores, base de datos ni registro en Play Store.</p>
                      </div>
                      <div className="bg-yellow-400/10 p-6 rounded-lg border border-yellow-400/20">
                        <h4 className="text-xl font-bold text-yellow-400 mb-2">🍏 Desarrollo iOS (opcional)</h4>
                        <div className="text-3xl font-bold mb-4">+ USD 1.000</div>
                        <p className="text-xs text-muted-foreground">Para publicación en App Store (iOS). No incluye registro ni costos de Apple.</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            </div>
          </motion.div>
        </div>
      </section>
      {/* Equipo y extras */}
      <section className="py-20 bg-background section-enhanced-bg">
        <div className="container mx-auto px-4">
          <motion.div initial="initial" whileInView="animate" viewport={{ once: true }} variants={fadeInUp} className="max-w-4xl mx-auto text-center">
            <Badge className="mb-4 bg-blue-400/10 text-blue-400 border-blue-400/20">
              <Users className="h-4 w-4 mr-2" />
              Equipo y Extras
            </Badge>
            <h2 className="text-4xl md:text-5xl font-bold mb-6">
              Equipo <span className="text-green-400">Dedicado</span>
            </h2>
            <div className="grid md:grid-cols-2 gap-8 mt-8">
              <div className="bg-background/50 p-6 rounded-lg border border-border/50 flex flex-col items-center">
                <Users className="h-10 w-10 text-green-400 mb-2" />
                <h4 className="font-semibold mb-2">2 Programadores dedicados</h4>
                <p className="text-muted-foreground text-sm">Equipo especializado en desarrollo mobile y backend.</p>
              </div>
              <div className="bg-background/50 p-6 rounded-lg border border-border/50 flex flex-col items-center">
                <Settings className="h-10 w-10 text-green-400 mb-2" />
                <h4 className="font-semibold mb-2">Set up Play Store incluido</h4>
                <p className="text-muted-foreground text-sm">Acompañamiento y configuración para publicación en Play Store.</p>
              </div>
            </div>
            <div className="mt-12 text-muted-foreground text-sm">
              <p>Recomendamos agregar un panel de administración web para gestión de usuarios y viajes (cotización aparte). La app es escalable y permite agregar más funciones en el futuro. Soporte y mantenimiento opcional.</p>
            </div>
          </motion.div>
        </div>
      </section>
      {/* Próximos Pasos */}
      <section className="py-20 bg-gradient-to-r from-black to-gray-900 text-white">
        <div className="container mx-auto px-4">
          <motion.div initial="initial" whileInView="animate" viewport={{ once: true }} variants={fadeInUp} className="max-w-4xl mx-auto text-center">
            <Badge className="mb-6 bg-green-400/10 text-green-400 border-green-400/20">
              <FileText className="h-4 w-4 mr-2" />
              Próximos Pasos
            </Badge>
            <h2 className="text-4xl md:text-5xl font-bold mb-8">
              ¿Listo para <span className="text-green-400">Comenzar</span>?
            </h2>
            <div className="grid md:grid-cols-5 gap-4 mb-12">
              {["Aprobación de la propuesta","Firma de acuerdo inicial y pago del 50%","Inicio del desarrollo","Demostraciones intermedias","Publicación y entrega"].map((step, index) => (
                <div key={index} className="relative">
                  <div className="bg-white/10 backdrop-blur-sm p-4 rounded-lg border border-white/20">
                    <div className="w-8 h-8 bg-green-400 text-black rounded-full flex items-center justify-center font-bold text-sm mb-3 mx-auto">
                      {index + 1}
                    </div>
                    <p className="text-sm text-white/80">{step}</p>
                  </div>
                  {index < 4 && (
                    <div className="hidden md:block absolute top-1/2 -right-2 w-4 h-0.5 bg-green-400/50"></div>
                  )}
                </div>
              ))}
            </div>
            <div className="flex justify-center">
              <Button size="lg" className="bg-green-400 text-black hover:bg-green-400/90 font-semibold px-8 py-4 text-lg button-glow" onClick={() => window.open('https://wa.me/5491123456789', '_blank')}>
                Solicitar propuesta <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
            </div>
          </motion.div>
        </div>
      </section>
      <Footer />
    </div>
  );
};

export default PropuestaClonUber; 