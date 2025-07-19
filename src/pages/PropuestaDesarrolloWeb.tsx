import React from 'react';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent } from '@/components/ui/card';
import { 
  ArrowRight, 
  Smartphone, 
  Palette, 
  Users, 
  Settings, 
  CheckCircle, 
  Clock, 
  DollarSign, 
  FileText,
  Code,
  Database,
  Shield,
  Zap,
  Globe,
  Monitor
} from 'lucide-react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';

const fadeInUp = {
  initial: { opacity: 0, y: 30 },
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

const PropuestaDesarrolloWeb = () => {
  return (
    <div className="min-h-screen bg-background">
      <Header />
      {/* Hero Section */}
      <section className="relative min-h-screen flex items-center justify-center overflow-hidden bg-gradient-to-br from-black via-gray-900 to-black text-white">
        {/* Background Effects */}
        <div className="absolute inset-0 bg-[url('data:image/svg+xml,%3Csvg%20width%3D%2260%22%20height%3D%2260%22%20viewBox%3D%220%200%2060%2060%22%20xmlns%3D%22http%3A//www.w3.org/2000/svg%22%3E%3Cg%20fill%3D%22none%22%20fill-rule%3D%22evenodd%22%3E%3Cg%20fill%3D%22%239C92AC%22%20fill-opacity%3D%220.1%22%3E%3Ccircle%20cx%3D%2230%22%20cy%3D%2230%22%20r%3D%222%22/%3E%3C/g%3E%3C/g%3E%3C/svg%3E')] opacity-20"></div>
        <div className="absolute inset-0 bg-gradient-to-r from-green-400/20 via-transparent to-blue-400/20"></div>
        
        <div className="container mx-auto px-4 relative z-10">
          <div className="text-center">
            <motion.div initial={{ opacity: 0, scale: 0.8 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: 0.8 }} className="mb-8">
              <Badge className="mb-4 bg-green-400/10 text-green-400 border-green-400/20">
                <Code className="h-4 w-4 mr-2" />
                Propuesta de Desarrollo
              </Badge>
            </motion.div>
            <motion.h1 initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8, delay: 0.2 }} className="text-5xl md:text-7xl font-bold mb-6 bg-gradient-to-r from-white via-white to-green-400 bg-clip-text text-transparent leading-tight">
              Desarrollo Web Profesional
            </motion.h1>
            <motion.p initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8, delay: 0.4 }} className="text-xl md:text-2xl text-white/80 mb-8 max-w-3xl mx-auto leading-relaxed">
              Aplicación web moderna con React + Vite, base de datos y panel de administración completo.
            </motion.p>
            <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8, delay: 0.6 }} className="flex justify-center items-center mb-12">
              <Button size="lg" className="bg-green-400 text-black hover:bg-green-400/90 font-semibold px-8 py-4 text-lg button-glow" onClick={() => window.open('https://wa.me/17864087985', '_blank')}>
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
                <Code className="h-4 w-4 mr-2" />
                Tecnología Moderna
              </Badge>
              <h2 className="text-4xl md:text-5xl font-bold mb-6">
                Stack <span className="text-green-400">Tecnológico</span>
              </h2>
            </div>
            <Card className="bg-card/50 backdrop-blur-sm border-0 shadow-xl">
              <CardContent className="p-8 md:p-12">
                <div className="grid md:grid-cols-2 gap-8">
                  <div className="space-y-6">
                    <div className="flex items-start space-x-4">
                      <div className="bg-green-400/10 p-3 rounded-lg">
                        <Code className="h-6 w-6 text-green-400" />
                      </div>
                      <div>
                        <h4 className="font-semibold text-lg mb-2">SPA React + Vite</h4>
                        <p className="text-muted-foreground">Aplicación de página única moderna y rápida</p>
                      </div>
                    </div>
                    <div className="flex items-start space-x-4">
                      <div className="bg-blue-400/10 p-3 rounded-lg">
                        <Database className="h-6 w-6 text-blue-400" />
                      </div>
                      <div>
                        <h4 className="font-semibold text-lg mb-2">Base de Datos</h4>
                        <p className="text-muted-foreground">Sistema de datos robusto y escalable</p>
                      </div>
                    </div>
                    <div className="flex items-start space-x-4">
                      <div className="bg-purple-400/10 p-3 rounded-lg">
                        <Shield className="h-6 w-6 text-purple-400" />
                      </div>
                      <div>
                        <h4 className="font-semibold text-lg mb-2">Login/Registro</h4>
                        <p className="text-muted-foreground">Sistema de autenticación completo</p>
                      </div>
                    </div>
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div className="bg-background/50 p-4 rounded-lg border border-border/50 flex flex-col items-center">
                      <Palette className="h-10 w-10 text-green-400 mb-2" />
                      <span className="font-semibold text-center">Diseño a Medida</span>
                    </div>
                    <div className="bg-background/50 p-4 rounded-lg border border-border/50 flex flex-col items-center">
                      <Smartphone className="h-10 w-10 text-green-400 mb-2" />
                      <span className="font-semibold text-center">Mobile Responsive</span>
                    </div>
                    <div className="bg-background/50 p-4 rounded-lg border border-border/50 flex flex-col items-center">
                      <Settings className="h-10 w-10 text-green-400 mb-2" />
                      <span className="font-semibold text-center">Panel Admin</span>
                    </div>
                    <div className="bg-background/50 p-4 rounded-lg border border-border/50 flex flex-col items-center">
                      <Zap className="h-10 w-10 text-green-400 mb-2" />
                      <span className="font-semibold text-center">Revisiones Ilimitadas</span>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        </div>
      </section>

      {/* Proceso de desarrollo */}
      <section className="py-20 bg-muted/30 section-enhanced-bg">
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
                  {[
                    { icon: "🎨", title: "Diseño y Planificación", desc: "Análisis de requerimientos y diseño de la interfaz" },
                    { icon: "⚙️", title: "Desarrollo Frontend", desc: "Implementación con React + Vite y componentes" },
                    { icon: "🗄️", title: "Base de Datos", desc: "Configuración y desarrollo del backend" },
                    { icon: "📱", title: "Testing y Ajustes", desc: "Pruebas y revisiones ilimitadas hasta tu aprobación" }
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

      {/* Plazos e Inversión */}
      <section className="py-20 bg-background section-enhanced-bg">
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
                      <div className="text-5xl font-bold text-green-400 mb-2">1</div>
                      <p className="text-xl text-muted-foreground">mes</p>
                    </div>
                    <div className="space-y-4">
                      <p className="text-center text-muted-foreground">Incluye diseño, desarrollo, pruebas y revisiones ilimitadas</p>
                      <div className="grid grid-cols-2 gap-4 mt-6">
                        {["Diseño","Desarrollo","Testing","Entrega"].map((fase, index) => (
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
                        <h4 className="text-xl font-bold text-green-400 mb-2">🌐 Desarrollo Web Completo</h4>
                        <div className="text-3xl font-bold mb-2">USD 990</div>
                        <p className="text-sm text-muted-foreground mb-4">(2 pagos de USD 495)</p>
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
                        <p className="text-xs text-muted-foreground mt-2">Incluye hosting por 1 año y soporte post-lanzamiento.</p>
                      </div>
                      <div className="bg-green-400/10 p-6 rounded-lg border border-green-400/20">
                        <h4 className="text-xl font-bold text-green-400 mb-2">✨ Revisiones Ilimitadas</h4>
                        <p className="text-sm text-muted-foreground">Ajustes y modificaciones sin costo adicional hasta tu completa satisfacción.</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Características detalladas */}
      <section className="py-20 bg-muted/30 section-enhanced-bg">
        <div className="container mx-auto px-4">
          <motion.div initial="initial" whileInView="animate" viewport={{ once: true }} variants={fadeInUp} className="text-center mb-16">
            <Badge className="mb-4 bg-blue-400/10 text-blue-400 border-blue-400/20">
              <Settings className="h-4 w-4 mr-2" />
              Características Incluidas
            </Badge>
            <h2 className="text-4xl md:text-5xl font-bold mb-6">
              Todo <span className="text-green-400">Incluido</span>
            </h2>
          </motion.div>
          <motion.div initial="initial" whileInView="animate" viewport={{ once: true }} variants={staggerContainer} className="max-w-4xl mx-auto">
            <Card className="bg-card/50 backdrop-blur-sm border-0 shadow-xl">
              <CardContent className="p-8 md:p-12">
                <div className="grid md:grid-cols-2 gap-6">
                  {[
                    "SPA React + Vite (aplicación moderna)",
                    "Base de datos completa",
                    "Sistema de login/registro",
                    "Diseño a medida (podemos copiar diseños que te gusten)",
                    "Mobile responsive",
                    "Panel de administración",
                    "Revisiones ilimitadas",
                    "Hosting por 1 año",
                    "Soporte post-lanzamiento",
                    "Optimización SEO básica"
                  ].map((feature, index) => (
                    <div key={index} className="flex items-start space-x-3">
                      <CheckCircle className="h-6 w-6 text-green-400 mt-1 flex-shrink-0" />
                      <p className="text-foreground">{feature}</p>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </motion.div>
        </div>
      </section>

      {/* Equipo y garantías */}
      <section className="py-20 bg-background section-enhanced-bg">
        <div className="container mx-auto px-4">
          <motion.div initial="initial" whileInView="animate" viewport={{ once: true }} variants={fadeInUp} className="max-w-4xl mx-auto text-center">
            <Badge className="mb-4 bg-blue-400/10 text-blue-400 border-blue-400/20">
              <Users className="h-4 w-4 mr-2" />
              Garantías y Soporte
            </Badge>
            <h2 className="text-4xl md:text-5xl font-bold mb-6">
              Tu <span className="text-green-400">Satisfacción</span> Garantizada
            </h2>
            <div className="grid md:grid-cols-3 gap-8 mt-8">
              <div className="bg-background/50 p-6 rounded-lg border border-border/50 flex flex-col items-center">
                <Zap className="h-10 w-10 text-green-400 mb-2" />
                <h4 className="font-semibold mb-2">Revisiones Ilimitadas</h4>
                <p className="text-muted-foreground text-sm">Ajustes sin costo hasta que estés 100% satisfecho.</p>
              </div>
              <div className="bg-background/50 p-6 rounded-lg border border-border/50 flex flex-col items-center">
                <Shield className="h-10 w-10 text-green-400 mb-2" />
                <h4 className="font-semibold mb-2">Hosting Incluido</h4>
                <p className="text-muted-foreground text-sm">Hosting por 1 año incluido en el precio.</p>
              </div>
              <div className="bg-background/50 p-6 rounded-lg border border-border/50 flex flex-col items-center">
                <Settings className="h-10 w-10 text-green-400 mb-2" />
                <h4 className="font-semibold mb-2">Soporte Post-Lanzamiento</h4>
                <p className="text-muted-foreground text-sm">Soporte técnico después de la entrega.</p>
              </div>
            </div>
            <div className="mt-12 text-muted-foreground text-sm">
              <p>Puedes mostrarnos diseños que te gusten y los adaptamos a tu proyecto. Trabajamos con metodología ágil para entregas rápidas y de calidad.</p>
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
            <div className="grid md:grid-cols-4 gap-4 mb-12">
              {["Aprobación de la propuesta","Pago inicial (50%)","Desarrollo en 1 mes","Entrega y pago final"].map((step, index) => (
                <div key={index} className="relative">
                  <div className="bg-white/10 backdrop-blur-sm p-4 rounded-lg border border-white/20">
                    <div className="w-8 h-8 bg-green-400 text-black rounded-full flex items-center justify-center font-bold text-sm mb-3 mx-auto">
                      {index + 1}
                    </div>
                    <p className="text-sm text-white/80">{step}</p>
                  </div>
                  {index < 3 && (
                    <div className="hidden md:block absolute top-1/2 -right-2 w-4 h-0.5 bg-green-400/50"></div>
                  )}
                </div>
              ))}
            </div>
            <div className="flex justify-center">
              <Button size="lg" className="bg-green-400 text-black hover:bg-green-400/90 font-semibold px-8 py-4 text-lg button-glow" onClick={() => window.open('https://wa.me/17864087985', '_blank')}>
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

export default PropuestaDesarrolloWeb; 