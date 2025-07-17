import { useEffect } from "react";
import { motion } from "framer-motion";
import { Calendar, Car, Users, MapPin, Mail, CheckCircle, DollarSign, Smartphone, CloudRain, FileText, ArrowRight, MessageSquare, ChevronDown, CreditCard, Repeat, UserCheck } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

const PropuestaLavadoVehiculos = () => {
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
    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('animate-fade-in');
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: 0.1, rootMargin: "0px 0px -100px 0px" });
    const animatedElements = document.querySelectorAll('.animate-on-scroll');
    animatedElements.forEach((el) => observer.observe(el));
    return () => {
      animatedElements.forEach((el) => observer.unobserve(el));
      document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.removeEventListener('click', () => {});
      });
    };
  }, []);

  const fadeInUp = {
    initial: { opacity: 0, y: 60 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: 0.6 }
  };
  const staggerContainer = {
    animate: { transition: { staggerChildren: 0.1 } }
  };
  const handleWhatsAppClick = () => {
    const message = encodeURIComponent("¡Hola! Me interesa la propuesta de desarrollo para la plataforma de lavado de vehículos a domicilio para empresas. ¿Podrían enviarme más información?");
    window.open(`https://wa.me/+5491123456789?text=${message}`, '_blank');
  };

  return (
    <div className="min-h-screen overflow-x-hidden bg-background">
      <Header />
      {/* Hero */}
      <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-blue-900 via-slate-900 to-black"></div>
        <div className="absolute inset-0 bg-grid-pattern opacity-20"></div>
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute top-1/4 left-1/4 w-64 h-64 bg-blue-400/10 rounded-full blur-3xl animate-pulse"></div>
          <div className="absolute top-3/4 right-1/4 w-96 h-96 bg-green-400/10 rounded-full blur-3xl animate-pulse"></div>
          <div className="absolute bottom-1/4 left-1/3 w-48 h-48 bg-yellow-400/10 rounded-full blur-3xl animate-pulse"></div>
        </div>
        <div className="container mx-auto px-4 py-32 relative z-10">
          <div className="max-w-4xl mx-auto text-center">
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }} className="mb-6">
              <Badge className="bg-blue-400/10 text-blue-400 border-blue-400/20 px-4 py-2 text-sm font-mono">
                🚗 Propuesta de Desarrollo: Plataforma de Lavado de Vehículos a Domicilio
              </Badge>
            </motion.div>
            <motion.h1 initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8, delay: 0.2 }} className="text-5xl md:text-7xl font-bold mb-6 bg-gradient-to-r from-white via-white to-blue-400 bg-clip-text text-transparent leading-tight">
              Propuesta para Desarrollar una <span className="text-blue-400">Plataforma Integral</span> de Lavado Vehicular
            </motion.h1>
            <motion.p initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8, delay: 0.4 }} className="text-xl md:text-2xl text-white/80 mb-12 max-w-3xl mx-auto leading-relaxed">
              Esta es una propuesta para el desarrollo a medida de una plataforma digital que permitiría a empresas gestionar el lavado de vehículos a domicilio para sus empleados y flotas. Todo el proceso sería online, desde la agenda de turnos hasta la facturación.
            </motion.p>
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 1, delay: 0.6 }} className="flex justify-center">
              <ChevronDown className="h-8 w-8 text-white/60 animate-bounce" />
            </motion.div>
          </div>
        </div>
      </section>
      {/* Beneficios */}
      <section className="py-20 bg-background section-enhanced-bg">
        <div className="container mx-auto px-4">
          <motion.div initial="initial" whileInView="animate" viewport={{ once: true }} variants={fadeInUp} className="text-center mb-16">
            <Badge className="mb-4 bg-blue-400/10 text-blue-400 border-blue-400/20">¿Qué podría incluir la plataforma?</Badge>
            <h2 className="text-4xl md:text-5xl font-bold mb-6">Funcionalidades <span className="text-blue-400">propuestas</span></h2>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">Desarrollaríamos una solución digital personalizada para empresas que buscan comodidad, control y eficiencia en el lavado de flotas y autos de empleados.</p>
          </motion.div>
          <motion.div initial="initial" whileInView="animate" viewport={{ once: true }} variants={staggerContainer} className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              { icon: <Car className="h-8 w-8" />, title: "Lavado a Domicilio", description: "El sistema permitiría coordinar lavados en la empresa o domicilio de los empleados, sin traslados ni esperas." },
              { icon: <Calendar className="h-8 w-8" />, title: "Agenda Online", description: "Turnos online divididos por zonas y horarios disponibles, totalmente personalizables." },
              { icon: <Mail className="h-8 w-8" />, title: "Registro por Email", description: "Clientes y empleados podrían registrarse fácilmente con su email corporativo." },
              { icon: <Users className="h-8 w-8" />, title: "Gestión de Usuarios", description: "Acceso diferenciado para dueños y empleados, con control total de la operación." },
              { icon: <CreditCard className="h-8 w-8" />, title: "Reserva y Pago de Seña", description: "Reserva de turnos con pago de seña online para asegurar el servicio." },
              { icon: <MapPin className="h-8 w-8" />, title: "Zonas Personalizadas", description: "División por zonas para optimizar la logística y la agenda, configurable según la empresa." },
              { icon: <UserCheck className="h-8 w-8" />, title: "Registro de Vehículos", description: "Registro de cada vehículo por patente, permitiendo la gestión de flotas empresariales." },
              { icon: <CloudRain className="h-8 w-8" />, title: "Reprogramación por Clima", description: "Reprogramación automática en caso de mal clima, coordinando con el cliente." },
              { icon: <FileText className="h-8 w-8" />, title: "Facturación Integrada", description: "Facturación automática y gestión de comprobantes desde la plataforma, integrable con AFIP." },
            ].map((feature, index) => (
              <motion.div key={index} variants={fadeInUp}>
                <Card className="h-full bg-card/50 backdrop-blur-sm border-border/50 hover:border-blue-400/30 transition-all duration-300 hover:shadow-lg hover:shadow-blue-400/10">
                  <CardContent className="p-6">
                    <div className="inline-flex items-center justify-center w-12 h-12 bg-blue-400/10 rounded-lg mb-4 text-blue-400">{feature.icon}</div>
                    <h3 className="text-xl font-semibold mb-3">{feature.title}</h3>
                    <p className="text-muted-foreground">{feature.description}</p>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>
      {/* Proceso */}
      <section className="py-20 bg-muted/30 section-enhanced-bg">
        <div className="container mx-auto px-4">
          <motion.div initial="initial" whileInView="animate" viewport={{ once: true }} variants={fadeInUp} className="text-center mb-16">
            <Badge className="mb-4 bg-green-400/10 text-green-400 border-green-400/20">¿Cómo sería el flujo?</Badge>
            <h2 className="text-4xl md:text-5xl font-bold mb-6">Proceso <span className="text-green-400">propuesto</span></h2>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">Así podría funcionar la plataforma desarrollada a medida para tu empresa.</p>
          </motion.div>
          <motion.div initial="initial" whileInView="animate" viewport={{ once: true }} variants={staggerContainer} className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {[
              { step: "01", title: "Registro", description: "La empresa y empleados se registrarían con email corporativo." },
              { step: "02", title: "Alta de Vehículos", description: "Se cargarían los vehículos por patente y datos básicos." },
              { step: "03", title: "Reserva de Turno", description: "Seleccionarían zona, día y horario disponible. Se pagaría la seña online." },
              { step: "04", title: "Lavado y Facturación", description: "El equipo iría el día pactado, se facturaría y se reprogramaría si hay mal clima." },
            ].map((step, index) => (
              <motion.div key={index} variants={fadeInUp} className="text-center">
                <div className="relative mb-6">
                  <div className="w-16 h-16 bg-green-400/10 rounded-full flex items-center justify-center mx-auto mb-4">
                    <span className="text-2xl font-bold text-green-400">{step.step}</span>
                  </div>
                  {index < 3 && (
                    <div className="hidden lg:block absolute top-8 left-full w-full h-0.5 bg-gradient-to-r from-green-400/50 to-transparent transform translate-x-4"></div>
                  )}
                </div>
                <h3 className="text-lg font-semibold mb-3">{step.title}</h3>
                <p className="text-muted-foreground text-sm">{step.description}</p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>
      {/* Tecnologías y desarrollo */}
      <section className="py-20 bg-background section-enhanced-bg">
        <div className="container mx-auto px-4">
          <motion.div initial="initial" whileInView="animate" viewport={{ once: true }} variants={fadeInUp} className="text-center mb-16">
            <Badge className="mb-4 bg-blue-400/10 text-blue-400 border-blue-400/20">Tecnología propuesta</Badge>
            <h2 className="text-4xl md:text-5xl font-bold mb-6">Propuesta de desarrollo <span className="text-blue-400">PWA</span></h2>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">La plataforma se desarrollaría como PWA con React + Supabase. Se podría integrar API de AFIP para facturación (costo aparte). Tiempo estimado de desarrollo: 1 mes.</p>
          </motion.div>
          <div className="flex flex-col md:flex-row justify-center items-center gap-8">
            <Card className="bg-gradient-to-br from-blue-400/5 to-green-400/5 border-blue-400/20 backdrop-blur-sm max-w-md w-full">
              <CardContent className="p-8 text-center">
                <div className="inline-flex items-center justify-center w-16 h-16 bg-blue-400/10 rounded-full mb-6">
                  <Smartphone className="h-8 w-8 text-blue-400" />
                </div>
                <h3 className="text-2xl font-bold mb-4">PWA React + Supabase</h3>
                <p className="text-muted-foreground mb-2">Desarrollo a medida, escalable y seguro.</p>
                <p className="text-muted-foreground mb-2">Tiempo estimado: <b>1 mes</b></p>
                <p className="text-muted-foreground">API de AFIP para facturación: <b>costo mensual aparte</b></p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>
      {/* Inversión */}
      <section className="py-20 bg-muted/30 section-enhanced-bg">
        <div className="container mx-auto px-4">
          <motion.div initial="initial" whileInView="animate" viewport={{ once: true }} variants={fadeInUp} className="text-center mb-16">
            <Badge className="mb-4 bg-yellow-400/10 text-yellow-600 border-yellow-400/20">Inversión</Badge>
            <h2 className="text-4xl md:text-5xl font-bold mb-6">Inversión y Forma de Pago</h2>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">Desarrollo llave en mano, sin sorpresas.</p>
          </motion.div>
          <div className="flex flex-col md:flex-row justify-center items-center gap-8">
            <Card className="bg-gradient-to-br from-yellow-400/5 to-blue-400/5 border-yellow-400/20 backdrop-blur-sm max-w-md w-full">
              <CardContent className="p-8 text-center">
                <div className="inline-flex items-center justify-center w-16 h-16 bg-yellow-400/10 rounded-full mb-6">
                  <DollarSign className="h-8 w-8 text-yellow-600" />
                </div>
                <h3 className="text-2xl font-bold mb-4">$1.300.000 ARS</h3>
                <p className="text-muted-foreground mb-2">50% inicial, 50% al finalizar</p>
                <p className="text-muted-foreground">Incluye desarrollo a medida, soporte y capacitación inicial.</p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>
      {/* CTA final */}
      <section className="py-20 bg-gradient-to-br from-blue-900 via-slate-900 to-black relative overflow-hidden">
        <div className="absolute inset-0">
          <div className="absolute top-1/4 left-1/4 w-64 h-64 bg-blue-400/10 rounded-full blur-3xl animate-pulse"></div>
          <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-green-400/10 rounded-full blur-3xl animate-pulse"></div>
        </div>
        <div className="container mx-auto px-4 relative z-10">
          <motion.div initial="initial" whileInView="animate" viewport={{ once: true }} variants={fadeInUp} className="text-center max-w-3xl mx-auto">
            <h2 className="text-4xl md:text-5xl font-bold mb-6 text-white">¿Te interesa desarrollar esta <span className="text-blue-400">plataforma?</span></h2>
            <p className="text-xl text-white/80 mb-8">Solicita una reunión o propuesta personalizada para el desarrollo de la solución digital para tu empresa.</p>
            <div className="flex justify-center">
              <Button onClick={handleWhatsAppClick} size="lg" className="bg-blue-400 hover:bg-blue-500 text-white font-bold px-8 py-4">
                <MessageSquare className="h-5 w-5 mr-2" />
                Solicitar Propuesta de Desarrollo
              </Button>
            </div>
            <div className="mt-8 text-white/70 text-sm">
              <b>Nota:</b> La API de AFIP para facturación tendría un costo mensual aparte.
            </div>
          </motion.div>
        </div>
      </section>
      <Footer />
    </div>
  );
};

export default PropuestaLavadoVehiculos; 