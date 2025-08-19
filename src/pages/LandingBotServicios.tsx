import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { MessageSquare, Bot, Users, Zap, Shield, Globe, Code, Settings, ChevronRight, Check, Clock, DollarSign, Rocket, HeadphonesIcon, BarChart3, Smartphone } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { useToast } from "@/hooks/use-toast";

const LandingBotServicios = () => {
  const { toast } = useToast();
  const [selectedOption, setSelectedOption] = useState<number | null>(null);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const fadeInUp = {
    initial: { opacity: 0, y: 60 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: 0.6 }
  };

  const staggerContainer = {
    animate: { transition: { staggerChildren: 0.1 } }
  };

  const options = [
    {
      id: 1,
      title: "Bot con WhatsApp API Oficial",
      badge: "Recomendado",
      badgeColor: "bg-neonGreen/10 text-neonGreen border-neonGreen/20",
      icon: <MessageSquare className="h-8 w-8" />,
      features: [
        "Bot con Inteligencia Artificial",
        "Base de conocimiento personalizada",
        "Etiquetado de conversaciones",
        "Integración con WhatsApp, Instagram y Facebook",
        "Chat en vivo desde un único número",
        "Hasta 5 usuarios conectados",
        "Derivación manual y automática",
        "Tablero de gestión con columnas personalizadas"
      ],
      restrictions: [
        "Ventana de 24 horas de WhatsApp API",
        "Uso de plantillas para reactivar conversaciones o realizar difusión (U$D 0.06 por mensaje)"
      ],
      implementation: {
        time: "1 mes",
        investmentImplementation: "$650.000",
        paymentTerms: "50% para iniciar – 50% al finalizar",
        monthly: "U$D 69"
      },
      color: "from-green-400 to-blue-500"
    },
    {
      id: 2,
      title: "Bot con WhatsApp vía QR",
      badge: "Más flexible",
      badgeColor: "bg-blue-500/10 text-blue-400 border-blue-500/20",
      icon: <Bot className="h-8 w-8" />,
      description: "Permite mantener el uso habitual de WhatsApp sin restricciones, aunque existe un leve riesgo de detección por parte de WhatsApp.",
      technologies: [
        "Chatwoot como plataforma",
        "Evolution API",
        "Servidor dedicado",
        "Base de datos",
        "Arquitectura de OpenAI Agents para el desarrollo del bot"
      ],
      implementation: {
        time: "2 meses",
        investmentImplementation: "$1.600.000",
        monthly: "$145.000"
      },
      additionalCosts: [
        "Evolution API: U$D 39/mes",
        "Servidor y base de datos: U$D 50/mes aprox.",
        "OpenAI: U$D 20/mes"
      ],
      color: "from-blue-400 to-purple-500"
    },
    {
      id: 3,
      title: "Partner Tech",
      badge: "Integral",
      badgeColor: "bg-purple-500/10 text-purple-400 border-purple-500/20",
      icon: <Rocket className="h-8 w-8" />,
      description: "Este plan comprende la implementación de la opción 1 o 2, y además la transformación en su partner tecnológico.",
      includes: [
        "Todo lo incluido en la opción elegida",
        "Implementación de automatizaciones de procesos internos",
        "Desarrollo de mini apps o herramientas internas",
        "Asesoramiento sobre uso de IA en la empresa (2 sesiones virtuales/presenciales de 1 hora)",
        "Mantenimiento y soporte de todas las implementaciones y desarrollos"
      ],
      objective: "Convertirnos en un socio tecnológico estratégico, acompañando a la empresa en cada iniciativa digital y de innovación.",
      implementation: {
        monthlyFee: "$950.000"
      },
      note: "No incluye costos asociados a licencias, servidores, bases de datos u otros servicios externos.",
      color: "from-purple-400 to-pink-500"
    }
  ];

  const handleSelectOption = (optionId: number) => {
    setSelectedOption(optionId);
    toast({
      title: "Opción seleccionada",
      description: `Has seleccionado la ${options.find(o => o.id === optionId)?.title}. Contáctanos para más información.`,
    });
  };

  return (
    <div className="min-h-screen overflow-x-hidden bg-background">
      <Header />

      {/* Hero Section */}
      <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-darkBlue via-slate-900 to-black"></div>
        <div className="absolute inset-0 hero-bg-overlay"></div>
        <div className="absolute inset-0 bg-grid-pattern opacity-20"></div>
        
        {/* Floating Shapes */}
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute top-1/4 left-1/4 w-64 h-64 bg-neonGreen/5 rounded-full blur-3xl animate-pulse floating-shapes"></div>
          <div className="absolute top-3/4 right-1/4 w-96 h-96 bg-blue-500/5 rounded-full blur-3xl animate-pulse floating-shapes"></div>
          <div className="absolute bottom-1/4 left-1/3 w-48 h-48 bg-purple-500/5 rounded-full blur-3xl animate-pulse floating-shapes"></div>
        </div>

        {/* Particles */}
        <div className="absolute inset-0">
          {[...Array(50)].map((_, i) => (
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

        <div className="container mx-auto px-4 py-32 relative z-10">
          <div className="max-w-4xl mx-auto text-center">
            <motion.div 
              initial={{ opacity: 0, y: 20 }} 
              animate={{ opacity: 1, y: 0 }} 
              transition={{ duration: 0.6 }} 
              className="mb-6"
            >
              <Badge className="bg-neonGreen/10 text-neonGreen border-neonGreen/20 px-4 py-2 text-sm font-mono">
                <Bot className="h-4 w-4 mr-2" />
                Soluciones de IA para tu Negocio
              </Badge>
            </motion.div>

            <motion.h1 
              initial={{ opacity: 0, y: 30 }} 
              animate={{ opacity: 1, y: 0 }} 
              transition={{ duration: 0.8, delay: 0.2 }} 
              className="text-5xl md:text-7xl font-bold mb-6 bg-gradient-to-r from-white via-white to-neonGreen bg-clip-text text-transparent leading-tight"
            >
              Bot con IA y <span className="text-neonGreen">Servicios Tecnológicos</span>
            </motion.h1>

            <motion.p 
              initial={{ opacity: 0, y: 30 }} 
              animate={{ opacity: 1, y: 0 }} 
              transition={{ duration: 0.8, delay: 0.4 }} 
              className="text-xl md:text-2xl text-white/80 mb-8 max-w-3xl mx-auto leading-relaxed"
            >
              Automatiza la atención al cliente, mejora la eficiencia y transforma tu negocio con nuestras soluciones inteligentes
            </motion.p>

            <motion.div 
              initial={{ opacity: 0, y: 30 }} 
              animate={{ opacity: 1, y: 0 }} 
              transition={{ duration: 0.8, delay: 0.6 }} 
              className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-12"
            >
              <Button 
                size="lg" 
                className="bg-neonGreen text-darkBlue hover:bg-neonGreen/90 font-semibold px-8 py-4 text-lg button-glow"
                onClick={() => document.getElementById('options')?.scrollIntoView({ behavior: 'smooth' })}
              >
                Ver Opciones <ChevronRight className="ml-2 h-5 w-5" />
              </Button>
              <Button 
                size="lg" 
                variant="outline"
                className="border-white text-white hover:bg-white hover:text-darkBlue px-8 py-4 text-lg"
                onClick={() => window.open('https://wa.me/17864087985', '_blank')}
              >
                Hablar con un Experto
              </Button>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Benefits Section */}
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
            <Badge className="mb-4 bg-blue-500/10 text-blue-400 border-blue-500/20">
              <Zap className="h-4 w-4 mr-2" />
              Beneficios Clave
            </Badge>
            <h2 className="text-4xl md:text-5xl font-bold mb-6">
              ¿Por qué implementar un <span className="text-neonGreen">Bot con IA</span>?
            </h2>
          </motion.div>

          <motion.div
            initial="initial"
            whileInView="animate"
            viewport={{ once: true }}
            variants={staggerContainer}
            className="grid md:grid-cols-2 lg:grid-cols-4 gap-6"
          >
            {[
              {
                icon: <Clock className="h-8 w-8" />,
                title: "Atención 24/7",
                description: "Responde a tus clientes en cualquier momento, sin descanso",
                color: "text-green-400"
              },
              {
                icon: <Users className="h-8 w-8" />,
                title: "Escalabilidad",
                description: "Atiende miles de conversaciones simultáneamente",
                color: "text-blue-400"
              },
              {
                icon: <BarChart3 className="h-8 w-8" />,
                title: "Análisis y Métricas",
                description: "Obtén insights valiosos sobre tus clientes y conversaciones",
                color: "text-purple-400"
              },
              {
                icon: <DollarSign className="h-8 w-8" />,
                title: "Reducción de Costos",
                description: "Ahorra hasta 80% en costos de atención al cliente",
                color: "text-yellow-400"
              }
            ].map((benefit, index) => (
              <motion.div key={index} variants={fadeInUp}>
                <Card className="h-full bg-card/50 backdrop-blur-sm border-border/50 hover:border-neonGreen/30 transition-all duration-300 hover:shadow-lg hover:shadow-neonGreen/10">
                  <CardContent className="p-6 text-center">
                    <div className={`inline-flex items-center justify-center w-16 h-16 bg-neonGreen/10 rounded-xl mb-4 ${benefit.color}`}>
                      {benefit.icon}
                    </div>
                    <h3 className="text-xl font-semibold mb-3">{benefit.title}</h3>
                    <p className="text-muted-foreground">{benefit.description}</p>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Options Section */}
      <section id="options" className="py-20 bg-background section-enhanced-bg">
        <div className="absolute inset-0 light-bg-overlay"></div>
        
        <div className="container mx-auto px-4">
          <motion.div
            initial="initial"
            whileInView="animate"
            viewport={{ once: true }}
            variants={fadeInUp}
            className="text-center mb-16"
          >
            <Badge className="mb-4 bg-purple-500/10 text-purple-400 border-purple-500/20">
              <Settings className="h-4 w-4 mr-2" />
              Planes y Opciones
            </Badge>
            <h2 className="text-4xl md:text-5xl font-bold mb-6">
              Elige la <span className="text-neonGreen">opción perfecta</span> para tu negocio
            </h2>
          </motion.div>

          <div className="grid lg:grid-cols-3 gap-8 max-w-7xl mx-auto">
            {options.map((option, index) => (
              <motion.div
                key={option.id}
                initial={{ opacity: 0, y: 60 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: index * 0.2 }}
              >
                <Card 
                  className={`h-full bg-card/50 backdrop-blur-sm border-2 transition-all duration-300 hover:shadow-xl ${
                    selectedOption === option.id 
                      ? 'border-neonGreen shadow-lg shadow-neonGreen/20' 
                      : 'border-border/50 hover:border-neonGreen/30'
                  }`}
                >
                  <CardContent className="p-8">
                    {/* Header */}
                    <div className="text-center mb-6">
                      <div className={`inline-flex items-center justify-center w-16 h-16 bg-gradient-to-r ${option.color} rounded-xl mb-4 text-white`}>
                        {option.icon}
                      </div>
                      <h3 className="text-2xl font-bold mb-2">{option.title}</h3>
                      <Badge className={option.badgeColor}>
                        {option.badge}
                      </Badge>
                    </div>

                    {/* Description */}
                    {option.description && (
                      <p className="text-muted-foreground mb-6">{option.description}</p>
                    )}

                    {/* Features/Technologies */}
                    {option.features && (
                      <div className="mb-6">
                        <h4 className="font-semibold mb-3 text-neonGreen">Incluye:</h4>
                        <ul className="space-y-2">
                          {option.features.map((feature, idx) => (
                            <li key={idx} className="flex items-start">
                              <Check className="h-5 w-5 text-neonGreen mr-2 mt-0.5 flex-shrink-0" />
                              <span className="text-sm">{feature}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                    )}

                    {option.technologies && (
                      <div className="mb-6">
                        <h4 className="font-semibold mb-3 text-blue-400">Tecnologías:</h4>
                        <ul className="space-y-2">
                          {option.technologies.map((tech, idx) => (
                            <li key={idx} className="flex items-start">
                              <Code className="h-5 w-5 text-blue-400 mr-2 mt-0.5 flex-shrink-0" />
                              <span className="text-sm">{tech}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                    )}

                    {option.includes && (
                      <div className="mb-6">
                        <h4 className="font-semibold mb-3 text-purple-400">Incluye:</h4>
                        <ul className="space-y-2">
                          {option.includes.map((item, idx) => (
                            <li key={idx} className="flex items-start">
                              <Check className="h-5 w-5 text-purple-400 mr-2 mt-0.5 flex-shrink-0" />
                              <span className="text-sm">{item}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                    )}

                    {/* Restrictions */}
                    {option.restrictions && (
                      <div className="mb-6">
                        <h4 className="font-semibold mb-3 text-orange-400">Restricciones técnicas:</h4>
                        <ul className="space-y-2">
                          {option.restrictions.map((restriction, idx) => (
                            <li key={idx} className="flex items-start">
                              <Shield className="h-5 w-5 text-orange-400 mr-2 mt-0.5 flex-shrink-0" />
                              <span className="text-sm text-muted-foreground">{restriction}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                    )}

                    {/* Objective */}
                    {option.objective && (
                      <div className="mb-6 p-4 bg-purple-500/10 rounded-lg border border-purple-500/20">
                        <h4 className="font-semibold mb-2 text-purple-400">Objetivo:</h4>
                        <p className="text-sm">{option.objective}</p>
                      </div>
                    )}

                    {/* Investment */}
                    <div className="border-t pt-6 mb-6">
                      <h4 className="font-semibold mb-4">Inversión y plazos:</h4>
                      {option.implementation.time && (
                        <div className="flex items-center justify-between mb-2">
                          <span className="text-sm text-muted-foreground">Tiempo de implementación:</span>
                          <span className="font-semibold">{option.implementation.time}</span>
                        </div>
                      )}
                      {option.implementation.investmentImplementation && (
                        <div className="flex items-center justify-between mb-2">
                          <span className="text-sm text-muted-foreground">Inversión implementación:</span>
                          <span className="font-semibold text-neonGreen">{option.implementation.investmentImplementation}</span>
                        </div>
                      )}
                      {option.implementation.paymentTerms && (
                        <div className="text-sm text-muted-foreground mb-2">
                          {option.implementation.paymentTerms}
                        </div>
                      )}
                      {option.implementation.monthly && (
                        <div className="flex items-center justify-between mb-2">
                          <span className="text-sm text-muted-foreground">Mensual:</span>
                          <span className="font-semibold">{option.implementation.monthly}</span>
                        </div>
                      )}
                      {option.implementation.monthlyFee && (
                        <div className="flex items-center justify-between">
                          <span className="text-sm text-muted-foreground">Fee mensual:</span>
                          <span className="font-semibold text-purple-400">{option.implementation.monthlyFee}</span>
                        </div>
                      )}
                    </div>

                    {/* Additional Costs */}
                    {option.additionalCosts && (
                      <div className="mb-6 p-4 bg-yellow-500/10 rounded-lg border border-yellow-500/20">
                        <h4 className="font-semibold mb-2 text-yellow-400 text-sm">Costos adicionales (no incluidos):</h4>
                        <ul className="space-y-1">
                          {option.additionalCosts.map((cost, idx) => (
                            <li key={idx} className="text-xs text-muted-foreground">• {cost}</li>
                          ))}
                        </ul>
                      </div>
                    )}

                    {/* Note */}
                    {option.note && (
                      <p className="text-xs text-muted-foreground mb-6">{option.note}</p>
                    )}

                    {/* CTA Button */}
                    <Button 
                      className="w-full bg-neonGreen text-darkBlue hover:bg-neonGreen/90 font-semibold"
                      onClick={() => handleSelectOption(option.id)}
                    >
                      Seleccionar esta opción
                    </Button>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Features Section */}
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
            <Badge className="mb-4 bg-green-500/10 text-green-400 border-green-500/20">
              <Globe className="h-4 w-4 mr-2" />
              Características Avanzadas
            </Badge>
            <h2 className="text-4xl md:text-5xl font-bold mb-6">
              Tecnología de <span className="text-neonGreen">vanguardia</span> para tu negocio
            </h2>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-5xl mx-auto">
            {[
              {
                icon: <Bot className="h-6 w-6" />,
                title: "IA Conversacional Avanzada",
                description: "Comprende el contexto y responde de manera natural y coherente"
              },
              {
                icon: <Smartphone className="h-6 w-6" />,
                title: "Multiplataforma",
                description: "WhatsApp, Instagram, Facebook Messenger en una sola interfaz"
              },
              {
                icon: <Shield className="h-6 w-6" />,
                title: "Seguridad y Privacidad",
                description: "Cumplimiento con GDPR y encriptación end-to-end"
              },
              {
                icon: <BarChart3 className="h-6 w-6" />,
                title: "Analytics en Tiempo Real",
                description: "Dashboards personalizados con métricas clave de tu negocio"
              },
              {
                icon: <HeadphonesIcon className="h-6 w-6" />,
                title: "Soporte Dedicado",
                description: "Equipo técnico disponible para asistencia y mejoras continuas"
              },
              {
                icon: <Settings className="h-6 w-6" />,
                title: "Personalización Total",
                description: "Adapta el bot a tu marca, tono y procesos específicos"
              }
            ].map((feature, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="flex items-start space-x-4"
              >
                <div className="flex-shrink-0 w-12 h-12 bg-neonGreen/10 rounded-lg flex items-center justify-center text-neonGreen">
                  {feature.icon}
                </div>
                <div>
                  <h3 className="font-semibold mb-2">{feature.title}</h3>
                  <p className="text-muted-foreground text-sm">{feature.description}</p>
                </div>
              </motion.div>
            ))}
          </div>
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
              ¿Listo para <span className="text-neonGreen">transformar</span> tu atención al cliente?
            </h2>
            <p className="text-xl text-white/80 mb-8 max-w-2xl mx-auto">
              Implementa un bot con IA y lleva tu negocio al siguiente nivel. Nuestro equipo de expertos te acompañará en todo el proceso.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button 
                size="lg" 
                className="bg-neonGreen text-darkBlue hover:bg-neonGreen/90 font-semibold px-8 py-4 text-lg button-glow"
                onClick={() => window.open('https://wa.me/17864087985', '_blank')}
              >
                Solicitar Demo Gratuita
              </Button>
              <Button 
                size="lg" 
                variant="outline"
                className="border-white text-white hover:bg-white hover:text-darkBlue px-8 py-4 text-lg"
                onClick={() => window.open('https://calendar.app.google/XXwTHc1qvikRrd2f6', '_blank')}
              >
                Agendar Consultoría
              </Button>
            </div>
          </motion.div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default LandingBotServicios;