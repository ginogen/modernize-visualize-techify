import { useEffect } from "react";
import { motion } from "framer-motion";
import { ArrowRight, CheckCircle, Star, Users, Clock, Award, BookOpen, Video, Calendar, Target } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { useLanguage } from "@/contexts/LanguageContext";

const Capacitacion = () => {
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
                🎓 Capacitación Profesional en IA
              </Badge>
            </motion.div>

            <motion.h1
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="text-5xl md:text-7xl font-bold mb-6 bg-gradient-to-r from-white via-white to-neonGreen bg-clip-text text-transparent leading-tight"
            >
              Domina la Inteligencia Artificial
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.4 }}
              className="text-xl md:text-2xl text-white/80 mb-8 max-w-3xl mx-auto leading-relaxed"
            >
              Programas de capacitación especializados para profesionales y empresas que buscan liderar la transformación digital con IA.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.6 }}
              className="flex justify-center items-center mb-12"
            >
              <Button size="lg" className="bg-neonGreen text-darkBlue hover:bg-neonGreen/90 font-semibold px-8 py-4 text-lg button-glow">
                Explorar Cursos <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Programs Section */}
      <section id="programs" className="py-20 bg-muted/30 section-enhanced-bg">
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
              Programas de Capacitación
            </Badge>
            <h2 className="text-4xl md:text-5xl font-bold mb-6">
              Programas que <span className="text-neonGreen">Transforman</span> Carreras
            </h2>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              Desde fundamentos hasta implementación avanzada, nuestros programas están diseñados para profesionales de todos los niveles.
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
                title: "Fundamentos de IA",
                description: "Introducción completa a la inteligencia artificial y machine learning",
                duration: "8 semanas",
                level: "Principiante",
                features: ["Conceptos básicos de IA", "Python para IA", "Algoritmos ML", "Proyecto final"]
              },
              {
                icon: "/assets/icons/desarrollo.png",
                title: "IA para Desarrolladores",
                description: "Implementación práctica de soluciones de IA en aplicaciones reales",
                duration: "12 semanas",
                level: "Intermedio",
                features: ["APIs de IA", "Frameworks ML", "Deployment", "Casos de uso reales"]
              },
              {
                icon: "/assets/icons/chatboti.png",
                title: "Chatbots Avanzados",
                description: "Creación de chatbots inteligentes con NLP y procesamiento de lenguaje",
                duration: "6 semanas",
                level: "Intermedio",
                features: ["NLP avanzado", "Diseño conversacional", "Integración", "Análisis de sentimientos"]
              },
              {
                icon: "/assets/icons/procesos.png",
                title: "Automatización Empresarial",
                description: "Automatización de procesos empresariales con IA y RPA",
                duration: "10 semanas",
                level: "Avanzado",
                features: ["RPA + IA", "Análisis de procesos", "Optimización", "ROI measurement"]
              },
              {
                icon: "/assets/icons/web.png",
                title: "IA en Desarrollo Web",
                description: "Integración de IA en aplicaciones web modernas y escalables",
                duration: "8 semanas",
                level: "Intermedio",
                features: ["IA en frontend", "Backend inteligente", "APIs ML", "Performance"]
              },
              {
                icon: "/assets/icons/consultoria.png",
                title: "Liderazgo en IA",
                description: "Estrategias ejecutivas para liderar la transformación digital con IA",
                duration: "4 semanas",
                level: "Ejecutivo",
                features: ["Estrategia IA", "ROI y métricas", "Gestión de equipos", "Casos de éxito"]
              }
            ].map((program, index) => (
              <motion.div key={index} variants={fadeInUp}>
                <Card className="h-full hover:shadow-xl transition-all duration-300 border-0 bg-card/50 backdrop-blur-sm group hover:scale-105">
                  <CardContent className="p-8">
                    <div className="inline-flex items-center justify-center w-16 h-16 bg-neonGreen/10 rounded-xl mb-6 group-hover:bg-neonGreen/20 transition-colors">
                      <img 
                        src={program.icon} 
                        alt={program.title}
                        className="h-8 w-8 object-contain"
                      />
                    </div>
                    
                    <div className="flex items-center gap-2 mb-4">
                      <Badge variant="outline" className="text-xs">{program.level}</Badge>
                      <Badge variant="outline" className="text-xs">{program.duration}</Badge>
                    </div>
                    
                    <h3 className="text-xl font-bold mb-4">{program.title}</h3>
                    <p className="text-muted-foreground mb-6">{program.description}</p>
                    
                    <ul className="space-y-2">
                      {program.features.map((feature, idx) => (
                        <li key={idx} className="flex items-center text-sm">
                          <CheckCircle className="h-4 w-4 text-neonGreen mr-2 flex-shrink-0" />
                          {feature}
                        </li>
                      ))}
                    </ul>
                    
                    <Button className="w-full mt-6 bg-neonGreen/10 text-neonGreen hover:bg-neonGreen hover:text-darkBlue transition-colors">
                      Ver Detalles
                    </Button>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Methodology Section */}
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
              Nuestra Metodología
            </Badge>
            <h2 className="text-4xl md:text-5xl font-bold mb-6">
              Aprendizaje <span className="text-neonGreen">Práctico</span> y Efectivo
            </h2>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              Metodología probada que combina teoría, práctica y proyectos reales para garantizar el aprendizaje efectivo.
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
              { step: "01", title: "Teoría Fundamental", description: "Conceptos sólidos y fundamentos teóricos", icon: BookOpen },
              { step: "02", title: "Práctica Guiada", description: "Ejercicios prácticos con mentorías personalizadas", icon: Target },
              { step: "03", title: "Proyectos Reales", description: "Implementación en casos de uso empresariales", icon: Video },
              { step: "04", title: "Certificación", description: "Evaluación y certificación de competencias", icon: Award }
            ].map((method, index) => (
              <motion.div
                key={index}
                variants={fadeInUp}
                className="text-center relative"
              >
                <div className="inline-flex items-center justify-center w-16 h-16 bg-neonGreen text-darkBlue rounded-full font-bold text-xl mb-6">
                  {method.step}
                </div>
                <div className="inline-flex items-center justify-center w-12 h-12 bg-neonGreen/10 rounded-lg mb-4">
                  <method.icon className="h-6 w-6 text-neonGreen" />
                </div>
                <h3 className="text-xl font-bold mb-4">{method.title}</h3>
                <p className="text-muted-foreground">{method.description}</p>
                {index < 3 && (
                  <div className="hidden md:block absolute top-8 left-full w-full h-0.5 bg-gradient-to-r from-neonGreen to-transparent"></div>
                )}
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

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
              ¿Listo para <span className="text-neonGreen">Impulsar</span> tu Carrera?
            </h2>
            <p className="text-xl text-white/80 mb-8 max-w-2xl mx-auto">
              Únete a más de 500 profesionales que ya han transformado sus carreras con nuestros programas de capacitación en IA.
            </p>
            <div className="flex justify-center">
              <Button 
                size="lg" 
                className="bg-neonGreen text-darkBlue hover:bg-neonGreen/90 font-semibold px-8 py-4 text-lg button-glow"
                onClick={() => window.open('https://calendar.app.google/XXwTHc1qvikRrd2f6', '_blank')}
              >
                Comenzar Mi Capacitación <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
            </div>
          </motion.div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default Capacitacion; 