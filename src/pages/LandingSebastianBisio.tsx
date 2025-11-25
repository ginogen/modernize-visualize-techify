import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import {
  MessageSquare,
  Bot,
  Instagram,
  Facebook,
  Zap,
  Shield,
  CheckCircle,
  Clock,
  DollarSign,
  Rocket,
  HeadphonesIcon,
  BarChart3,
  Smartphone,
  Database,
  UserCheck,
  Gift,
  PhoneCall,
  ChevronRight,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { useToast } from "@/hooks/use-toast";

const LandingSebastianBisio = () => {
  const { toast } = useToast();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const fadeInUp = {
    initial: { opacity: 0, y: 60 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: 0.6 },
  };

  const staggerContainer = {
    animate: { transition: { staggerChildren: 0.1 } },
  };

  const handleContactClick = () => {
    toast({
      title: "¡Excelente!",
      description: "Te contactaremos para coordinar tu implementación.",
    });
    window.open("https://wa.me/17864087985", "_blank");
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
          <div className="absolute top-1/4 left-1/4 w-64 h-64 bg-white/3 rounded-full blur-3xl animate-pulse floating-shapes"></div>
          <div className="absolute top-3/4 right-1/4 w-96 h-96 bg-neonGreen/3 rounded-full blur-3xl animate-pulse floating-shapes"></div>
          <div className="absolute bottom-1/4 left-1/3 w-48 h-48 bg-white/2 rounded-full blur-3xl animate-pulse floating-shapes"></div>
        </div>

        <div className="container mx-auto px-4 py-32 relative z-10">
          <div className="max-w-5xl mx-auto text-center">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="mb-6"
            >
              <Badge className="bg-neonGreen/10 text-neonGreen border-neonGreen/20 px-4 py-2 text-sm font-mono">
                <Bot className="h-4 w-4 mr-2" />
                Propuesta Exclusiva para Sebastian Bisio
              </Badge>
            </motion.div>

            <motion.h1
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="text-5xl md:text-7xl font-bold mb-6 bg-gradient-to-r from-white via-white to-neonGreen bg-clip-text text-transparent leading-tight"
            >
              <span className="text-neonGreen">Chatbot</span> con IA{" "}
              <br />para tu Negocio
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.4 }}
              className="text-xl md:text-2xl text-white/80 mb-8 max-w-3xl mx-auto leading-relaxed"
            >
              Automatiza WhatsApp, Instagram y Facebook con inteligencia artificial.
              <br />
              <span className="text-neonGreen font-semibold">Conectado con OpenWings</span> para respuestas instantáneas
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.6 }}
              className="flex flex-col gap-4 items-center mb-12"
            >
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button
                  size="lg"
                  className="bg-neonGreen text-darkBlue hover:bg-neonGreen/90 font-semibold px-8 py-4 text-lg button-glow"
                  onClick={handleContactClick}
                >
                  ¡Quiero mi Chatbot! <ChevronRight className="ml-2 h-5 w-5" />
                </Button>
                <Button
                  size="lg"
                  variant="outline"
                  className="border-white text-white hover:bg-white hover:text-darkBlue px-8 py-4 text-lg"
                  onClick={() =>
                    document
                      .getElementById("proposal")
                      ?.scrollIntoView({ behavior: "smooth" })
                  }
                >
                  Ver Propuesta
                </Button>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 bg-muted/30 section-enhanced-bg">
        <div className="container mx-auto px-4">
          <motion.div
            initial="initial"
            whileInView="animate"
            viewport={{ once: true }}
            variants={fadeInUp}
            className="text-center mb-16"
          >
            <Badge className="mb-4 bg-slate-100 text-slate-700 border-slate-200">
              <Zap className="h-4 w-4 mr-2" />
              Características Principales
            </Badge>
            <h2 className="text-4xl md:text-5xl font-bold mb-6">
              Todo lo que necesitas en{" "}
              <span className="text-neonGreen">un solo sistema</span>
            </h2>
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
                icon: <MessageSquare className="h-8 w-8" />,
                title: "WhatsApp Oficial",
                description: "API oficial de WhatsApp para máxima confiabilidad",
              },
              {
                icon: <Instagram className="h-8 w-8" />,
                title: "Instagram Direct",
                description: "Responde automáticamente en Instagram Direct Messages",
              },
              {
                icon: <Facebook className="h-8 w-8" />,
                title: "Facebook Messenger",
                description: "Integración completa con Facebook Messenger",
              },
              {
                icon: <Bot className="h-8 w-8" />,
                title: "IA Conversacional",
                description: "Responde en lenguaje natural con inteligencia artificial",
              },
              {
                icon: <UserCheck className="h-8 w-8" />,
                title: "Seguimiento Automático",
                description: "Reactiva conversaciones con usuarios que no responden",
              },
              {
                icon: <Database className="h-8 w-8" />,
                title: "Conexión OpenWings",
                description: "Acceso directo a productos, stock, precios y medidas",
              },
            ].map((feature, index) => (
              <motion.div key={index} variants={fadeInUp}>
                <Card className="h-full bg-card/50 backdrop-blur-sm border-border/50 hover:border-neonGreen/30 transition-all duration-300 hover:shadow-lg hover:shadow-neonGreen/10">
                  <CardContent className="p-6 text-center">
                    <div className="inline-flex items-center justify-center w-16 h-16 bg-slate-100 rounded-xl mb-4 text-slate-600">
                      {feature.icon}
                    </div>
                    <h3 className="text-xl font-semibold mb-3">
                      {feature.title}
                    </h3>
                    <p className="text-muted-foreground">
                      {feature.description}
                    </p>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Proposal Section */}
      <section id="proposal" className="py-20 bg-background section-enhanced-bg">
        <div className="container mx-auto px-4">
          <motion.div
            initial="initial"
            whileInView="animate"
            viewport={{ once: true }}
            variants={fadeInUp}
            className="text-center mb-16"
          >
            <Badge className="mb-4 bg-neonGreen/10 text-neonGreen border-neonGreen/20">
              <Rocket className="h-4 w-4 mr-2" />
              Propuesta Comercial
            </Badge>
            <h2 className="text-4xl md:text-5xl font-bold mb-6">
              Inversión y <span className="text-neonGreen">Términos</span>
            </h2>
          </motion.div>

          <div className="max-w-4xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 60 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              <Card className="bg-gradient-to-br from-card/50 to-card/30 backdrop-blur-sm border-2 border-neonGreen/30 shadow-xl shadow-neonGreen/10">
                <CardContent className="p-12">
                  {/* Implementation Cost */}
                  <div className="text-center mb-12">
                    <div className="inline-flex items-center justify-center w-20 h-20 bg-neonGreen/10 rounded-xl mb-6">
                      <DollarSign className="h-10 w-10 text-neonGreen" />
                    </div>
                    <h3 className="text-3xl font-bold mb-4">Costo de Implementación</h3>
                    <div className="flex items-center justify-center gap-4 mb-2">
                      <span className="text-5xl font-bold text-neonGreen">$450.000</span>
                      <Badge className="bg-slate-100 text-slate-700 border-slate-300">
                        Pago Único
                      </Badge>
                    </div>
                    <p className="text-muted-foreground">
                      50% para iniciar • 50% al finalizar
                    </p>
                  </div>


                  <div className="grid md:grid-cols-2 gap-8 mb-8">
                    {/* Implementation Time */}
                    <div className="text-center">
                      <div className="inline-flex items-center justify-center w-16 h-16 bg-slate-100 rounded-xl mb-4">
                        <Clock className="h-8 w-8 text-slate-600" />
                      </div>
                      <h4 className="text-xl font-semibold mb-2">Tiempo de Implementación</h4>
                      <p className="text-3xl font-bold text-slate-800 mb-2">2 Semanas</p>
                      <p className="text-slate-600">
                        Funcionando y conectado completamente
                      </p>
                    </div>

                    {/* Monthly Fee */}
                    <div className="text-center">
                      <div className="inline-flex items-center justify-center w-16 h-16 bg-slate-100 rounded-xl mb-4">
                        <HeadphonesIcon className="h-8 w-8 text-slate-600" />
                      </div>
                      <h4 className="text-xl font-semibold mb-2">Fee Mensual</h4>
                      <p className="text-3xl font-bold text-slate-800 mb-2">$195.000</p>
                      <p className="text-slate-600">
                        Mantenimiento y uso continuo
                      </p>
                    </div>
                  </div>

                  {/* What's Included */}
                  <div className="border-t pt-8">
                    <h4 className="text-2xl font-bold mb-6 text-center">¿Qué incluye?</h4>
                    <div className="grid md:grid-cols-2 gap-6">
                      {[
                        "Bot con Inteligencia Artificial",
                        "Integración WhatsApp, Instagram, Facebook",
                        "Conexión directa con sistema OpenWings",
                        "Respuestas automáticas de productos y precios",
                        "Generación de presupuestos sin intervención humana",
                        "Seguimiento automático a usuarios inactivos",
                        "Respuestas en lenguaje natural",
                        "Soporte técnico incluido",
                      ].map((feature, index) => (
                        <div key={index} className="flex items-center gap-3">
                          <CheckCircle className="h-5 w-5 text-neonGreen flex-shrink-0" />
                          <span className="text-sm">{feature}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* CTA */}
                  <div className="text-center mt-12">
                    <Button
                      size="lg"
                      className="bg-neonGreen text-darkBlue hover:bg-neonGreen/90 font-bold px-12 py-4 text-xl button-glow"
                      onClick={handleContactClick}
                    >
                      <PhoneCall className="mr-3 h-6 w-6" />
                      ¡Implementar Ahora!
                    </Button>
                    <p className="text-sm text-muted-foreground mt-4">
                      Contacto directo para coordinar implementación
                    </p>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Benefits Section */}
      <section className="py-20 bg-muted/30 section-enhanced-bg">
        <div className="container mx-auto px-4">
          <motion.div
            initial="initial"
            whileInView="animate"
            viewport={{ once: true }}
            variants={fadeInUp}
            className="text-center mb-16"
          >
            <Badge className="mb-4 bg-slate-100 text-slate-700 border-slate-200">
              <BarChart3 className="h-4 w-4 mr-2" />
              Beneficios para tu Negocio
            </Badge>
            <h2 className="text-4xl md:text-5xl font-bold mb-6">
              Resultados <span className="text-neonGreen">inmediatos</span> y medibles
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
                description: "Tus clientes reciben respuestas inmediatas cualquier hora del día",
              },
              {
                icon: <Zap className="h-8 w-8" />,
                title: "Respuestas Instantáneas",
                description: "Información de productos y precios al instante desde OpenWings",
              },
              {
                icon: <DollarSign className="h-8 w-8" />,
                title: "Más Ventas",
                description: "Genera presupuestos automáticamente sin perder oportunidades",
              },
              {
                icon: <Shield className="h-8 w-8" />,
                title: "Sin Errores Humanos",
                description: "Información siempre actualizada y precisa desde tu sistema",
              },
            ].map((benefit, index) => (
              <motion.div key={index} variants={fadeInUp}>
                <Card className="h-full bg-card/50 backdrop-blur-sm border-border/50 hover:border-neonGreen/30 transition-all duration-300 hover:shadow-lg hover:shadow-neonGreen/10">
                  <CardContent className="p-6 text-center">
                    <div className="inline-flex items-center justify-center w-16 h-16 bg-slate-100 rounded-xl mb-4 text-slate-600">
                      {benefit.icon}
                    </div>
                    <h3 className="text-xl font-semibold mb-3">
                      {benefit.title}
                    </h3>
                    <p className="text-slate-600 text-sm">
                      {benefit.description}
                    </p>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Final CTA */}
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
              ¿Listo para <span className="text-neonGreen">automatizar</span> tu atención?
            </h2>
            <p className="text-xl text-white/80 mb-8 max-w-3xl mx-auto">
              En solo 2 semanas tendrás tu chatbot funcionando completamente conectado con OpenWings.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button
                size="lg"
                className="bg-neonGreen text-darkBlue hover:bg-neonGreen/90 font-bold px-12 py-4 text-xl button-glow"
                onClick={handleContactClick}
              >
                <MessageSquare className="mr-3 h-6 w-6" />
                Contactar por WhatsApp
              </Button>
              <Button
                size="lg"
                variant="outline"
                className="border-white text-white hover:bg-white hover:text-darkBlue px-8 py-4 text-lg"
                onClick={() =>
                  window.open(
                    "https://calendar.app.google/XXwTHc1qvikRrd2f6",
                    "_blank"
                  )
                }
              >
                Agendar Videollamada
              </Button>
            </div>
          </motion.div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default LandingSebastianBisio;