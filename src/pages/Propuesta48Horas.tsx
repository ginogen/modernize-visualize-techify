import { useEffect } from "react";
import { motion } from "framer-motion";
import { ArrowRight, CheckCircle, Star, Users, Zap, Shield, Globe, Code, BrainCircuit, Bot, MessageSquare, Calendar, Database, Settings, Headphones, ChevronDown, Clock, DollarSign, Smartphone, Palette, RefreshCw, Copy, Eye } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

const Propuesta48Horas = () => {
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
    
    // Enhance section transitions with IntersectionObserver
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
    animate: {
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  const handleWhatsAppClick = () => {
    const message = encodeURIComponent("¡Hola! Me interesa el servicio de diseño web en 48 horas. ¿Podrían darme más información?");
    window.open(`https://wa.me/+5491123456789?text=${message}`, '_blank');
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
        
        {/* Dynamic Particles */}
        <div className="absolute inset-0">
          {[...Array(100)].map((_, i) => (
            <motion.div
              key={i}
              className="absolute w-1 h-1 bg-neonGreen/40 rounded-full"
              initial={{ 
                x: Math.random() * (typeof window !== 'undefined' ? window.innerWidth : 1200), 
                y: Math.random() * (typeof window !== 'undefined' ? window.innerHeight : 800),
                opacity: 0,
                scale: 0
              }}
              animate={{ 
                opacity: [0, 1, 0],
                scale: [0, 1, 0],
                y: [null, Math.random() * -200 - 100]
              }}
              transition={{ 
                repeat: Infinity, 
                duration: Math.random() * 4 + 3,
                delay: Math.random() * 5,
                ease: "easeOut"
              }}
            />
          ))}
        </div>

        {/* Glowing Orbs */}
        <div className="absolute inset-0">
          <motion.div
            className="absolute top-20 right-20 w-32 h-32 bg-neonGreen/10 rounded-full blur-xl"
            animate={{
              scale: [1, 1.2, 1],
              opacity: [0.3, 0.6, 0.3]
            }}
            transition={{
              repeat: Infinity,
              duration: 4,
              ease: "easeInOut"
            }}
          />
          <motion.div
            className="absolute bottom-20 left-20 w-24 h-24 bg-blue-400/10 rounded-full blur-xl"
            animate={{
              scale: [1, 1.3, 1],
              opacity: [0.2, 0.5, 0.2]
            }}
            transition={{
              repeat: Infinity,
              duration: 5,
              ease: "easeInOut",
              delay: 1
            }}
          />
        </div>

        {/* Animated Lines */}
        <div className="absolute inset-0">
          <svg className="w-full h-full opacity-10" viewBox="0 0 1200 800">
            <motion.path
              d="M0,400 Q300,200 600,400 T1200,400"
              stroke="url(#gradient1)"
              strokeWidth="2"
              fill="none"
              initial={{ pathLength: 0 }}
              animate={{ pathLength: 1 }}
              transition={{ duration: 3, repeat: Infinity, repeatType: "reverse" }}
            />
            <motion.path
              d="M0,300 Q400,100 800,300 T1200,300"
              stroke="url(#gradient2)"
              strokeWidth="1"
              fill="none"
              initial={{ pathLength: 0 }}
              animate={{ pathLength: 1 }}
              transition={{ duration: 4, repeat: Infinity, repeatType: "reverse", delay: 1 }}
            />
            <defs>
              <linearGradient id="gradient1" x1="0%" y1="0%" x2="100%" y2="0%">
                <stop offset="0%" stopColor="#39FF14" stopOpacity="0" />
                <stop offset="50%" stopColor="#39FF14" stopOpacity="0.8" />
                <stop offset="100%" stopColor="#39FF14" stopOpacity="0" />
              </linearGradient>
              <linearGradient id="gradient2" x1="0%" y1="0%" x2="100%" y2="0%">
                <stop offset="0%" stopColor="#3B82F6" stopOpacity="0" />
                <stop offset="50%" stopColor="#3B82F6" stopOpacity="0.6" />
                <stop offset="100%" stopColor="#3B82F6" stopOpacity="0" />
              </linearGradient>
            </defs>
          </svg>
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
                ⚡ Diseño Web Express - 48 Horas
              </Badge>
            </motion.div>

            <motion.h1
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="text-5xl md:text-7xl font-bold mb-6 bg-gradient-to-r from-white via-white to-neonGreen bg-clip-text text-transparent leading-tight"
            >
              Diseño Web en <span className="text-neonGreen">48 Horas</span>
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.4 }}
              className="text-xl md:text-2xl text-white/80 mb-12 max-w-3xl mx-auto leading-relaxed"
            >
              Tu sitio web profesional listo en solo 48 horas. 
              Diseño a medida con tecnología moderna, responsive y optimizado para conversiones.
            </motion.p>

            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 1, delay: 0.6 }}
              className="flex justify-center"
            >
              <ChevronDown className="h-8 w-8 text-white/60 animate-bounce" />
            </motion.div>
          </div>
        </div>
      </section>

      {/* Pricing Section */}
      <section id="precios" className="py-20 bg-background section-enhanced-bg">
        {/* Light background overlay */}
        <div className="absolute inset-0 light-bg-overlay"></div>
        
        {/* Floating shapes */}
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute top-20 left-20 w-32 h-32 bg-neonGreen/8 light-floating-shapes"></div>
          <div className="absolute bottom-20 right-20 w-24 h-24 bg-blue-400/8 light-floating-shapes"></div>
          <div className="absolute top-1/2 right-1/4 w-20 h-20 bg-purple-400/6 light-floating-shapes"></div>
        </div>
        
        {/* Enhanced particles effect */}
        <div className="absolute inset-0 light-particles">
          {[...Array(40)].map((_, i) => (
            <motion.div
              key={i}
              className="absolute w-1 h-1 bg-neonGreen/30 rounded-full"
              initial={{ 
                x: Math.random() * (typeof window !== 'undefined' ? window.innerWidth : 1200), 
                y: Math.random() * (typeof window !== 'undefined' ? window.innerHeight : 600),
                opacity: 0,
                scale: 0
              }}
              animate={{ 
                opacity: [0, 0.8, 0],
                scale: [0, 1.5, 0],
                y: [null, Math.random() * -150 - 75]
              }}
              transition={{ 
                repeat: Infinity, 
                duration: Math.random() * 5 + 3,
                delay: Math.random() * 6,
                ease: "easeOut"
              }}
            />
          ))}
        </div>
        
        <div className="container mx-auto px-4">
          <motion.div
            initial="initial"
            whileInView="animate"
            viewport={{ once: true }}
            variants={fadeInUp}
            className="text-center mb-16"
          >
            <Badge className="mb-4 bg-neonGreen/10 text-neonGreen border-neonGreen/20">
              Precios y Plazos
            </Badge>
            <h2 className="text-4xl md:text-5xl font-bold mb-6">
              <span className="text-neonGreen">Precios</span> Transparentes
            </h2>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              Dos opciones flexibles para adaptarse a tus necesidades y presupuesto
            </p>
          </motion.div>

          <motion.div
            initial="initial"
            whileInView="animate"
            viewport={{ once: true }}
            variants={staggerContainer}
            className="grid lg:grid-cols-2 gap-8 max-w-5xl mx-auto"
          >
            {/* Plan 48 Horas */}
            <motion.div variants={fadeInUp}>
              <Card className="h-full bg-gradient-to-br from-neonGreen/5 to-blue-500/5 border-neonGreen/20 backdrop-blur-sm hover:border-neonGreen/40 transition-all duration-300">
                <CardContent className="p-8">
                  <div className="text-center mb-6">
                    <div className="inline-flex items-center justify-center w-16 h-16 bg-neonGreen/10 rounded-full mb-4">
                      <Clock className="h-8 w-8 text-neonGreen" />
                    </div>
                    <h3 className="text-2xl font-bold mb-2">48 Horas</h3>
                    <Badge className="bg-neonGreen/10 text-neonGreen border-neonGreen/20">Express</Badge>
                  </div>
                  
                  <div className="text-center mb-6">
                    <div className="text-4xl font-bold text-neonGreen mb-2">U$D 650</div>
                    <p className="text-muted-foreground">Pago dividido en dos cuotas</p>
                  </div>

                  <div className="space-y-4 mb-6">
                    <div className="flex items-center">
                      <CheckCircle className="h-4 w-4 text-neonGreen mr-3" />
                      <span>Diseño a medida</span>
                    </div>
                    <div className="flex items-center">
                      <CheckCircle className="h-4 w-4 text-neonGreen mr-3" />
                      <span>Tecnología React + Vite o Next.js</span>
                    </div>
                    <div className="flex items-center">
                      <CheckCircle className="h-4 w-4 text-neonGreen mr-3" />
                      <span>Mobile Responsive</span>
                    </div>
                    <div className="flex items-center">
                      <CheckCircle className="h-4 w-4 text-neonGreen mr-3" />
                      <span>Cambios y revisiones ilimitadas</span>
                    </div>
                    <div className="flex items-center">
                      <CheckCircle className="h-4 w-4 text-neonGreen mr-3" />
                      <span>Podemos clonar o imitar lo que nos pidas</span>
                    </div>
                  </div>

                  <div className="bg-background/50 rounded-lg p-4 mb-6">
                    <div className="text-sm text-muted-foreground mb-2">Forma de Pago:</div>
                    <div className="flex items-center justify-center space-x-4 text-sm">
                      <div className="flex items-center">
                        <DollarSign className="h-4 w-4 text-neonGreen mr-1" />
                        50% para comenzar
                      </div>
                      <div className="flex items-center">
                        <DollarSign className="h-4 w-4 text-neonGreen mr-1" />
                        50% al entregar
                      </div>
                    </div>
                  </div>

                  <Button 
                    onClick={handleWhatsAppClick}
                    className="w-full bg-neonGreen hover:bg-neonGreen/90 text-black font-bold"
                  >
                    <MessageSquare className="h-4 w-4 mr-2" />
                    Solicitar Presupuesto
                  </Button>
                </CardContent>
              </Card>
            </motion.div>

            {/* Plan 7 Días */}
            <motion.div variants={fadeInUp}>
              <Card className="h-full bg-gradient-to-br from-blue-500/5 to-neonGreen/5 border-blue-500/20 backdrop-blur-sm hover:border-blue-500/40 transition-all duration-300">
                <CardContent className="p-8">
                  <div className="text-center mb-6">
                    <div className="inline-flex items-center justify-center w-16 h-16 bg-blue-500/10 rounded-full mb-4">
                      <Calendar className="h-8 w-8 text-blue-400" />
                    </div>
                    <h3 className="text-2xl font-bold mb-2">7 Días</h3>
                    <Badge className="bg-blue-500/10 text-blue-400 border-blue-500/20">Estándar</Badge>
                  </div>
                  
                  <div className="text-center mb-6">
                    <div className="text-4xl font-bold text-blue-400 mb-2">U$D 475</div>
                    <p className="text-muted-foreground">Pago dividido en dos cuotas</p>
                  </div>

                  <div className="space-y-4 mb-6">
                    <div className="flex items-center">
                      <CheckCircle className="h-4 w-4 text-blue-400 mr-3" />
                      <span>Diseño a medida</span>
                    </div>
                    <div className="flex items-center">
                      <CheckCircle className="h-4 w-4 text-blue-400 mr-3" />
                      <span>Tecnología React + Vite o Next.js</span>
                    </div>
                    <div className="flex items-center">
                      <CheckCircle className="h-4 w-4 text-blue-400 mr-3" />
                      <span>Mobile Responsive</span>
                    </div>
                    <div className="flex items-center">
                      <CheckCircle className="h-4 w-4 text-blue-400 mr-3" />
                      <span>Cambios y revisiones ilimitadas</span>
                    </div>
                    <div className="flex items-center">
                      <CheckCircle className="h-4 w-4 text-blue-400 mr-3" />
                      <span>Podemos clonar o imitar lo que nos pidas</span>
                    </div>
                  </div>

                  <div className="bg-background/50 rounded-lg p-4 mb-6">
                    <div className="text-sm text-muted-foreground mb-2">Forma de Pago:</div>
                    <div className="flex items-center justify-center space-x-4 text-sm">
                      <div className="flex items-center">
                        <DollarSign className="h-4 w-4 text-blue-400 mr-1" />
                        50% para comenzar
                      </div>
                      <div className="flex items-center">
                        <DollarSign className="h-4 w-4 text-blue-400 mr-1" />
                        50% al entregar
                      </div>
                    </div>
                  </div>

                  <Button 
                    onClick={handleWhatsAppClick}
                    className="w-full bg-blue-500 hover:bg-blue-600 text-white font-bold"
                  >
                    <MessageSquare className="h-4 w-4 mr-2" />
                    Solicitar Presupuesto
                  </Button>
                </CardContent>
              </Card>
            </motion.div>
          </motion.div>

          {/* Nota importante */}
          <motion.div
            initial="initial"
            whileInView="animate"
            viewport={{ once: true }}
            variants={fadeInUp}
            className="mt-12 text-center"
          >
            <Card className="bg-gradient-to-br from-yellow-500/5 to-orange-500/5 border-yellow-500/20 backdrop-blur-sm max-w-2xl mx-auto">
              <CardContent className="p-6">
                <div className="flex items-center justify-center mb-4">
                  <Shield className="h-6 w-6 text-yellow-500 mr-2" />
                  <span className="font-semibold text-yellow-600">Nota Importante</span>
                </div>
                <p className="text-muted-foreground">
                  <strong>No incluye el dominio.</strong> El dominio deberá ser contratado por separado o proporcionado por el cliente.
                </p>
              </CardContent>
            </Card>
          </motion.div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 bg-muted/30 section-enhanced-bg">
        {/* Light background overlay */}
        <div className="absolute inset-0 light-bg-overlay"></div>
        
        {/* Floating shapes */}
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute top-32 right-32 w-40 h-40 bg-blue-400/10 light-floating-shapes"></div>
          <div className="absolute bottom-32 left-32 w-28 h-28 bg-neonGreen/8 light-floating-shapes"></div>
          <div className="absolute top-1/3 left-1/2 w-24 h-24 bg-purple-400/8 light-floating-shapes"></div>
        </div>
        
        {/* Enhanced particles effect */}
        <div className="absolute inset-0 light-particles">
          {[...Array(35)].map((_, i) => (
            <motion.div
              key={i}
              className="absolute w-1 h-1 bg-blue-400/25 rounded-full"
              initial={{ 
                x: Math.random() * (typeof window !== 'undefined' ? window.innerWidth : 1200), 
                y: Math.random() * (typeof window !== 'undefined' ? window.innerHeight : 600),
                opacity: 0,
                scale: 0
              }}
              animate={{ 
                opacity: [0, 0.7, 0],
                scale: [0, 1.2, 0],
                x: [null, Math.random() * 120 - 60],
                y: [null, Math.random() * -100 - 50]
              }}
              transition={{ 
                repeat: Infinity, 
                duration: Math.random() * 7 + 4,
                ease: "easeInOut"
              }}
            />
          ))}
        </div>

        <div className="container mx-auto px-4">
          <motion.div
            initial="initial"
            whileInView="animate"
            viewport={{ once: true }}
            variants={fadeInUp}
            className="text-center mb-16"
          >
            <Badge className="mb-4 bg-blue-500/10 text-blue-400 border-blue-500/20">
              Características Incluidas
            </Badge>
            <h2 className="text-4xl md:text-5xl font-bold mb-6">
              Todo lo que <span className="text-neonGreen">Incluye</span> tu Sitio Web
            </h2>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              Tecnología moderna y características profesionales para tu negocio
            </p>
          </motion.div>

          <motion.div
            initial="initial"
            whileInView="animate"
            viewport={{ once: true }}
            variants={staggerContainer}
            className="grid md:grid-cols-2 lg:grid-cols-3 gap-8"
          >
            {[
              {
                icon: <Palette className="h-8 w-8" />,
                title: "Diseño a Medida",
                description: "Cada sitio web es único y diseñado específicamente para tu negocio y necesidades"
              },
              {
                icon: <Code className="h-8 w-8" />,
                title: "React + Vite o Next.js",
                description: "Tecnología moderna y robusta para un rendimiento excepcional"
              },
              {
                icon: <Smartphone className="h-8 w-8" />,
                title: "Mobile Responsive",
                description: "Perfecto en todos los dispositivos: móviles, tablets y computadoras"
              },
              {
                icon: <RefreshCw className="h-8 w-8" />,
                title: "Revisiones Ilimitadas",
                description: "Cambios y ajustes sin límite hasta que estés 100% satisfecho"
              },
              {
                icon: <Copy className="h-8 w-8" />,
                title: "Clonación de Diseños",
                description: "Podemos replicar cualquier diseño o estilo que te guste"
              },
              {
                icon: <Eye className="h-8 w-8" />,
                title: "Optimizado para Conversiones",
                description: "Diseño enfocado en convertir visitantes en clientes"
              }
            ].map((feature, index) => (
              <motion.div
                key={index}
                variants={fadeInUp}
              >
                <Card className="h-full bg-card/50 backdrop-blur-sm border-border/50 hover:border-neonGreen/30 transition-all duration-300 hover:shadow-lg hover:shadow-neonGreen/10">
                  <CardContent className="p-6">
                    <div className="inline-flex items-center justify-center w-12 h-12 bg-neonGreen/10 rounded-lg mb-4 text-neonGreen">
                      {feature.icon}
                    </div>
                    <h3 className="text-xl font-semibold mb-3">{feature.title}</h3>
                    <p className="text-muted-foreground">{feature.description}</p>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Process Section */}
      <section className="py-20 bg-background section-enhanced-bg">
        {/* Light background overlay */}
        <div className="absolute inset-0 light-bg-overlay"></div>
        
        {/* Floating shapes */}
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute top-20 left-20 w-32 h-32 bg-neonGreen/8 light-floating-shapes"></div>
          <div className="absolute bottom-20 right-20 w-24 h-24 bg-blue-400/8 light-floating-shapes"></div>
          <div className="absolute top-1/2 right-1/4 w-20 h-20 bg-purple-400/6 light-floating-shapes"></div>
        </div>
        
        <div className="container mx-auto px-4">
          <motion.div
            initial="initial"
            whileInView="animate"
            viewport={{ once: true }}
            variants={fadeInUp}
            className="text-center mb-16"
          >
            <Badge className="mb-4 bg-purple-500/10 text-purple-400 border-purple-500/20">
              Proceso de Trabajo
            </Badge>
            <h2 className="text-4xl md:text-5xl font-bold mb-6">
              Cómo <span className="text-neonGreen">Trabajamos</span>
            </h2>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              Un proceso simple y eficiente para entregar tu sitio web en tiempo récord
            </p>
          </motion.div>

          <motion.div
            initial="initial"
            whileInView="animate"
            viewport={{ once: true }}
            variants={staggerContainer}
            className="grid md:grid-cols-2 lg:grid-cols-4 gap-8"
          >
            {[
              {
                step: "01",
                title: "Consulta Inicial",
                description: "Conversamos sobre tus necesidades, objetivos y referencias de diseño"
              },
              {
                step: "02",
                title: "Pago Inicial",
                description: "50% del valor total para comenzar el desarrollo inmediatamente"
              },
              {
                step: "03",
                title: "Desarrollo",
                description: "Creamos tu sitio web con la tecnología y diseño acordados"
              },
              {
                step: "04",
                title: "Entrega",
                description: "Revisamos juntos el resultado y recibes el pago final"
              }
            ].map((step, index) => (
              <motion.div
                key={index}
                variants={fadeInUp}
                className="text-center"
              >
                <div className="relative mb-6">
                  <div className="w-16 h-16 bg-neonGreen/10 rounded-full flex items-center justify-center mx-auto mb-4">
                    <span className="text-2xl font-bold text-neonGreen">{step.step}</span>
                  </div>
                  {index < 3 && (
                    <div className="hidden lg:block absolute top-8 left-full w-full h-0.5 bg-gradient-to-r from-neonGreen/50 to-transparent transform translate-x-4"></div>
                  )}
                </div>
                <h3 className="text-lg font-semibold mb-3">{step.title}</h3>
                <p className="text-muted-foreground text-sm">{step.description}</p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-br from-darkBlue via-slate-900 to-black relative overflow-hidden">
        {/* Background Effects */}
        <div className="absolute inset-0">
          <div className="absolute top-1/4 left-1/4 w-64 h-64 bg-neonGreen/5 rounded-full blur-3xl animate-pulse"></div>
          <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-blue-500/5 rounded-full blur-3xl animate-pulse"></div>
        </div>
        
        <div className="container mx-auto px-4 relative z-10">
          <motion.div
            initial="initial"
            whileInView="animate"
            viewport={{ once: true }}
            variants={fadeInUp}
            className="text-center max-w-3xl mx-auto"
          >
            <h2 className="text-4xl md:text-5xl font-bold mb-6 text-white">
              ¿Listo para tu <span className="text-neonGreen">Sitio Web</span>?
            </h2>
            <p className="text-xl text-white/80 mb-8">
              Tu sitio web profesional en solo 48 horas. Diseño moderno, tecnología de vanguardia y soporte completo.
            </p>
            
            <div className="flex justify-center">
              <Button 
                onClick={handleWhatsAppClick}
                size="lg"
                className="bg-neonGreen hover:bg-neonGreen/90 text-black font-bold px-8 py-4"
              >
                <MessageSquare className="h-5 w-5 mr-2" />
                Solicitar Presupuesto
              </Button>
            </div>
          </motion.div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default Propuesta48Horas; 