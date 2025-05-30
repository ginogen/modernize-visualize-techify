import { useEffect } from "react";
import { motion } from "framer-motion";
import { ArrowRight, CheckCircle, Star, Users, Zap, Shield, Globe, Code, BrainCircuit, Bot, MessageSquare, Calendar, Database, Settings, Headphones, ChevronDown } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

const PropuestaBot = () => {
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
                🤖 Bot Conversacional con IA
              </Badge>
            </motion.div>

            <motion.h1
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="text-5xl md:text-7xl font-bold mb-6 bg-gradient-to-r from-white via-white to-neonGreen bg-clip-text text-transparent leading-tight"
            >
              Propuesta Bot <span className="text-neonGreen">Conversacional</span>
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.4 }}
              className="text-xl md:text-2xl text-white/80 mb-12 max-w-3xl mx-auto leading-relaxed"
            >
              Revoluciona la atención al cliente con inteligencia artificial avanzada. 
              Automatiza conversaciones, mejora la experiencia del usuario y optimiza tus procesos de negocio.
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

      {/* Implementation Section */}
      <section id="implementacion" className="py-20 bg-background section-enhanced-bg">
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
              Proceso de Implementación
            </Badge>
            <h2 className="text-4xl md:text-5xl font-bold mb-6">
              <span className="text-neonGreen">Implementación</span> Profesional
            </h2>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              Un proceso estructurado de 2 a 3 semanas para desarrollar tu bot conversacional personalizado
            </p>
          </motion.div>

          <motion.div
            initial="initial"
            whileInView="animate"
            viewport={{ once: true }}
            variants={staggerContainer}
            className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16"
          >
            {[
              {
                icon: <Settings className="h-8 w-8" />,
                title: "Mapa de Implementación",
                description: "Planificación detallada del proyecto y definición de objetivos específicos"
              },
              {
                icon: <Users className="h-8 w-8" />,
                title: "Requerimientos de Clientes",
                description: "Análisis profundo de las necesidades y expectativas del negocio"
              },
              {
                icon: <Code className="h-8 w-8" />,
                title: "Herramientas y Funciones",
                description: "Integración con Ecommerce, Calendario y Bases de datos existentes"
              },
              {
                icon: <BrainCircuit className="h-8 w-8" />,
                title: "Base de Conocimiento",
                description: "Desarrollo de la inteligencia artificial específica para tu industria"
              },
              {
                icon: <Zap className="h-8 w-8" />,
                title: "Pruebas y Ajustes",
                description: "Testing continuo y optimización del rendimiento del bot"
              },
              {
                icon: <MessageSquare className="h-8 w-8" />,
                title: "Conexión Múltiple",
                description: "Integración con WhatsApp, Instagram y Facebook Messenger"
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

          {/* Investment Card */}
          <motion.div
            initial="initial"
            whileInView="animate"
            viewport={{ once: true }}
            variants={fadeInUp}
            className="max-w-2xl mx-auto"
          >
            <Card className="bg-gradient-to-br from-neonGreen/5 to-blue-500/5 border-neonGreen/20 backdrop-blur-sm">
              <CardContent className="p-8 text-center">
                <div className="inline-flex items-center justify-center w-16 h-16 bg-neonGreen/10 rounded-full mb-6">
                  <Bot className="h-8 w-8 text-neonGreen" />
                </div>
                <h3 className="text-2xl font-bold mb-4">Inversión para Implementación Base</h3>
                <div className="text-4xl font-bold text-neonGreen mb-4">$500.000</div>
                <p className="text-muted-foreground mb-6">
                  Pago dividido en dos cuotas: al inicio del proyecto y al entregar el bot funcional
                </p>
                <div className="flex items-center justify-center space-x-4 text-sm text-muted-foreground">
                  <div className="flex items-center">
                    <CheckCircle className="h-4 w-4 text-neonGreen mr-2" />
                    50% al inicio
                  </div>
                  <div className="flex items-center">
                    <CheckCircle className="h-4 w-4 text-neonGreen mr-2" />
                    50% al entregar
                  </div>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        </div>
      </section>

      {/* Monthly Plan Section */}
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
                delay: Math.random() * 8,
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
              Etapa Mensual
            </Badge>
            <h2 className="text-4xl md:text-5xl font-bold mb-6">
              Plan <span className="text-neonGreen">Mensual</span> de Soporte
            </h2>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              Mantén tu bot funcionando de manera óptima con nuestro plan de soporte continuo
            </p>
          </motion.div>

          <div className="grid lg:grid-cols-2 gap-12 items-center">
            {/* Features List */}
            <motion.div
              initial="initial"
              whileInView="animate"
              viewport={{ once: true }}
              variants={staggerContainer}
              className="space-y-6"
            >
              {[
                {
                  icon: <Globe className="h-6 w-6" />,
                  title: "Acceso a Plataforma",
                  description: "Panel de control completo para gestionar todas las conversaciones"
                },
                {
                  icon: <MessageSquare className="h-6 w-6" />,
                  title: "Control de Conversaciones",
                  description: "Toma el control manual cuando sea necesario para casos complejos"
                },
                {
                  icon: <Database className="h-6 w-6" />,
                  title: "CRM y Etiquetado",
                  description: "Sistema completo de gestión de clientes y clasificación automática"
                },
                {
                  icon: <Headphones className="h-6 w-6" />,
                  title: "Soporte Continuo",
                  description: "Ajustes, cambios y mejoras constantes según tus necesidades"
                }
              ].map((feature, index) => (
                <motion.div
                  key={index}
                  variants={fadeInUp}
                  className="flex items-start space-x-4"
                >
                  <div className="flex-shrink-0 w-12 h-12 bg-neonGreen/10 rounded-lg flex items-center justify-center text-neonGreen">
                    {feature.icon}
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold mb-2">{feature.title}</h3>
                    <p className="text-muted-foreground">{feature.description}</p>
                  </div>
                </motion.div>
              ))}
            </motion.div>

            {/* Pricing Card */}
            <motion.div
              initial="initial"
              whileInView="animate"
              viewport={{ once: true }}
              variants={fadeInUp}
            >
              <Card className="bg-gradient-to-br from-blue-500/5 to-neonGreen/5 border-blue-500/20 backdrop-blur-sm">
                <CardContent className="p-8 text-center">
                  <div className="inline-flex items-center justify-center w-16 h-16 bg-blue-500/10 rounded-full mb-6">
                    <Calendar className="h-8 w-8 text-blue-400" />
                  </div>
                  <h3 className="text-2xl font-bold mb-4">Plan Mensual</h3>
                  <div className="text-4xl font-bold text-neonGreen mb-2">$200.000</div>
                  <p className="text-muted-foreground mb-6">por mes</p>
                  
                  <div className="bg-background/50 rounded-lg p-4 mb-6">
                    <div className="text-2xl font-bold text-blue-400 mb-1">5.000</div>
                    <div className="text-sm text-muted-foreground">contactos mensuales incluidos</div>
                  </div>
                  
                  <div className="space-y-3 text-sm">
                    <div className="flex items-center justify-center">
                      <CheckCircle className="h-4 w-4 text-neonGreen mr-2" />
                      <span>Plataforma de gestión completa</span>
                    </div>
                    <div className="flex items-center justify-center">
                      <CheckCircle className="h-4 w-4 text-neonGreen mr-2" />
                      <span>Soporte técnico 24/7</span>
                    </div>
                    <div className="flex items-center justify-center">
                      <CheckCircle className="h-4 w-4 text-neonGreen mr-2" />
                      <span>Actualizaciones incluidas</span>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          </div>
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
              Bot Conversacional con <span className="text-neonGreen">Inteligencia Artificial</span>
            </h2>
            <p className="text-xl text-white/80 mb-8">
              Una solución completa para automatizar y mejorar la atención al cliente de tu empresa con tecnología de vanguardia
            </p>
          </motion.div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default PropuestaBot; 