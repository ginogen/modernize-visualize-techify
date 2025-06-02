import { useEffect } from "react";
import { motion } from "framer-motion";
import { ArrowRight, CheckCircle, Star, Users, Zap, Shield, Globe, Code, BrainCircuit, Bot, Puzzle, Play, ChevronDown } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import VideoTestimonials from "@/components/VideoTestimonials";
import { useLanguage } from "@/contexts/LanguageContext";

const Index = () => {
  const { language, t } = useLanguage();
  
  useEffect(() => {
    // Scroll to top when component mounts or language changes
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
  }, [language]);

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
                🚀 {t("hero.badge")}
              </Badge>
            </motion.div>

            <motion.h1
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="text-5xl md:text-7xl font-bold mb-6 bg-gradient-to-r from-white via-white to-neonGreen bg-clip-text text-transparent leading-tight"
            >
              {t("hero.title")}
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.4 }}
              className="text-xl md:text-2xl text-white/80 mb-8 max-w-3xl mx-auto leading-relaxed"
            >
              {t("hero.description")}
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
                {t("hero.get.started")} <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
            </motion.div>

            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 1, delay: 0.8 }}
              className="flex justify-center"
            >
              <ChevronDown className="h-8 w-8 text-white/60 animate-bounce" />
            </motion.div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-20 bg-background section-enhanced-bg">
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
            variants={staggerContainer}
            className="grid grid-cols-2 md:grid-cols-4 gap-8"
          >
            {[
              { number: "50+", label: "Proyectos Completados", icon: "/assets/icons/proyectos.png" },
              { number: "98%", label: "Satisfacción del Cliente", icon: "/assets/icons/rating.png" },
              { number: "50+", label: "Clientes Activos", icon: "/assets/icons/clientesac.png" },
              { number: "24/7", label: "Soporte Técnico", icon: "/assets/icons/soporte.png" }
            ].map((stat, index) => (
              <motion.div
                key={index}
                variants={fadeInUp}
                className="text-center"
              >
                <div className="inline-flex items-center justify-center w-16 h-16 bg-neonGreen/10 rounded-full mb-4">
                  <img 
                    src={stat.icon} 
                    alt={stat.label}
                    className="h-8 w-8 object-contain"
                  />
                </div>
                <div className="text-3xl md:text-4xl font-bold text-foreground mb-2">{stat.number}</div>
                <div className="text-muted-foreground">{stat.label}</div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Services Section */}
      <section id="services" className="py-20 bg-muted/30 section-enhanced-bg">
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
            <Badge className="mb-4 bg-neonGreen/10 text-neonGreen border-neonGreen/20">
              Nuestros Servicios
            </Badge>
            <h2 className="text-4xl md:text-5xl font-bold mb-6">
              Soluciones que <span className="text-neonGreen">Transforman</span>
            </h2>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              Ofrecemos servicios de vanguardia en inteligencia artificial y desarrollo web para impulsar tu negocio hacia el futuro digital.
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
                icon: "/assets/icons/cerebroia.png",
                title: t("services.ai.integration"),
                description: t("services.ai.integration.desc"),
                features: ["Machine Learning", "Análisis Predictivo", "Automatización Inteligente"]
              },
              {
                icon: "/assets/icons/desarrollo.png",
                title: t("services.custom.dev"),
                description: t("services.custom.dev.desc"),
                features: ["React & Next.js", "Node.js & Python", "Bases de Datos"]
              },
              {
                icon: "/assets/icons/chatboti.png",
                title: t("services.chatbot"),
                description: t("services.chatbot.desc"),
                features: ["NLP Avanzado", "Integración Multi-canal", "Análisis de Sentimientos"]
              },
              {
                icon: "/assets/icons/procesos.png",
                title: t("services.process.automation"),
                description: t("services.process.automation.desc"),
                features: ["Workflows Automatizados", "APIs Personalizadas", "Integración de Sistemas"]
              },
              {
                icon: "/assets/icons/web.png",
                title: "Desarrollo Web Completo",
                description: "Sitios web modernos, responsivos y optimizados para conversión",
                features: ["Diseño Responsivo", "SEO Optimizado", "Performance Máximo"]
              },
              {
                icon: "/assets/icons/consultoria.png",
                title: "Consultoría Digital",
                description: "Estrategias digitales personalizadas para acelerar tu crecimiento",
                features: ["Auditoría Digital", "Estrategia de Crecimiento", "Transformación Digital"]
              }
            ].map((service, index) => (
              <motion.div key={index} variants={fadeInUp}>
                <Card className="h-full hover:shadow-xl transition-all duration-300 border-0 bg-card/50 backdrop-blur-sm group hover:scale-105">
                  <CardContent className="p-8">
                    <div className="inline-flex items-center justify-center w-16 h-16 bg-neonGreen/10 rounded-xl mb-6 group-hover:bg-neonGreen/20 transition-colors">
                      <img 
                        src={service.icon} 
                        alt={service.title}
                        className="h-8 w-8 object-contain"
                      />
                    </div>
                    <h3 className="text-xl font-bold mb-4">{service.title}</h3>
                    <p className="text-muted-foreground mb-6">{service.description}</p>
                    <ul className="space-y-2">
                      {service.features.map((feature, idx) => (
                        <li key={idx} className="flex items-center text-sm">
                          <CheckCircle className="h-4 w-4 text-neonGreen mr-2 flex-shrink-0" />
                          {feature}
                        </li>
                      ))}
                    </ul>
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
          <div className="absolute top-24 left-1/4 w-36 h-36 bg-purple-400/10 light-floating-shapes"></div>
          <div className="absolute bottom-24 right-1/4 w-32 h-32 bg-neonGreen/8 light-floating-shapes"></div>
          <div className="absolute top-2/3 left-3/4 w-20 h-20 bg-blue-400/8 light-floating-shapes"></div>
        </div>
        
        {/* Enhanced particles effect */}
        <div className="absolute inset-0 light-particles">
          {[...Array(30)].map((_, i) => (
            <motion.div
              key={i}
              className="absolute w-1 h-1 bg-purple-400/25 rounded-full"
              initial={{ 
                x: Math.random() * (typeof window !== 'undefined' ? window.innerWidth : 1200), 
                y: Math.random() * (typeof window !== 'undefined' ? window.innerHeight : 600),
                opacity: 0,
                scale: 0
              }}
              animate={{ 
                opacity: [0, 0.6, 0],
                scale: [0, 2, 0],
                rotate: [0, 360]
              }}
              transition={{ 
                repeat: Infinity, 
                duration: Math.random() * 8 + 6,
                delay: Math.random() * 10,
                ease: "linear"
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
              Nuestro Proceso
            </Badge>
            <h2 className="text-4xl md:text-5xl font-bold mb-6">
              Cómo <span className="text-neonGreen">Trabajamos</span>
            </h2>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              Un proceso probado que garantiza resultados excepcionales en cada proyecto.
            </p>
          </motion.div>

          <motion.div
            initial="initial"
            whileInView="animate"
            viewport={{ once: true }}
            variants={staggerContainer}
            className="grid md:grid-cols-4 gap-8"
          >
            {[
              { step: "01", title: "Descubrimiento", description: "Analizamos tus necesidades y objetivos específicos" },
              { step: "02", title: "Estrategia", description: "Diseñamos una solución personalizada y escalable" },
              { step: "03", title: "Desarrollo", description: "Implementamos con las mejores prácticas y tecnologías" },
              { step: "04", title: "Lanzamiento", description: "Desplegamos y optimizamos para máximo rendimiento" }
            ].map((process, index) => (
              <motion.div
                key={index}
                variants={fadeInUp}
                className="text-center relative"
              >
                <div className="inline-flex items-center justify-center w-16 h-16 bg-neonGreen text-darkBlue rounded-full font-bold text-xl mb-6">
                  {process.step}
                </div>
                <h3 className="text-xl font-bold mb-4">{process.title}</h3>
                <p className="text-muted-foreground">{process.description}</p>
                {index < 3 && (
                  <div className="hidden md:block absolute top-8 left-full w-full h-0.5 bg-gradient-to-r from-neonGreen to-transparent"></div>
                )}
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Video Testimonials Section */}
      {/* <VideoTestimonials /> */}

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-r from-darkBlue to-darkBlue/90 text-white">
        <div className="container mx-auto px-4 text-center">
          <motion.div
            initial="initial"
            whileInView="animate"
            viewport={{ once: true }}
            variants={fadeInUp}
            className="max-w-4xl mx-auto"
          >
            <h2 className="text-4xl md:text-5xl font-bold mb-6">
              ¿Listo para <span className="text-neonGreen">Transformar</span> tu Negocio?
            </h2>
            <p className="text-xl text-white/80 mb-8 max-w-2xl mx-auto">
              Únete a más de 50 empresas que ya han revolucionado sus procesos con nuestras soluciones de IA.
            </p>
            <div className="flex justify-center">
              <Button 
                size="lg" 
                className="bg-neonGreen text-darkBlue hover:bg-neonGreen/90 font-semibold px-8 py-4 text-lg button-glow"
                onClick={() => window.open('https://calendar.app.google/XXwTHc1qvikRrd2f6', '_blank')}
              >
                Comenzar Ahora <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
            </div>
          </motion.div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default Index;
