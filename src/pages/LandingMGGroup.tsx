import { useEffect } from "react";
import { motion } from "framer-motion";
import {
  MessageSquare,
  Bot,
  Zap,
  Shield,
  CheckCircle,
  Clock,
  DollarSign,
  Rocket,
  HeadphonesIcon,
  BarChart3,
  ChevronRight,
  Brain,
  Image,
  Mic,
  Tags,
  Users,
  LayoutDashboard,
  Send,
  Star,
  Settings,
  Workflow,
  Filter,
  MessageCircle,
  Target,
  PhoneCall,
  AlertTriangle,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { useToast } from "@/hooks/use-toast";

const LandingMGGroup = () => {
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

  const features = [
    {
      icon: <MessageSquare className="h-8 w-8" />,
      title: "Conexión WhatsApp API Oficial",
      description: "Integración directa con la API oficial de WhatsApp Business",
    },
    {
      icon: <Target className="h-8 w-8" />,
      title: "Chatbot con IA",
      description: "Agentes IA con objetivos, rol, persona y habilidades personalizadas",
    },
    {
      icon: <Settings className="h-8 w-8" />,
      title: "Creación de Tools",
      description: "Herramientas ejecutables por Agentes IA para recolectar información",
    },
    {
      icon: <Brain className="h-8 w-8" />,
      title: "Base de Conocimiento",
      description: "Cerebro del bot que se nutre de archivos CSV y PDF",
    },
    {
      icon: <Image className="h-8 w-8" />,
      title: "Interpreta Audio e Imágenes",
      description: "Procesamiento multimodal de contenido",
    },
    {
      icon: <MessageCircle className="h-8 w-8" />,
      title: "Live Chat con Filtros",
      description: "Chat en vivo con sistema de filtrado avanzado",
    },
    {
      icon: <Users className="h-8 w-8" />,
      title: "Asignación Automática",
      description: "Derivación automática a agentes humanos",
    },
    {
      icon: <Tags className="h-8 w-8" />,
      title: "Etiquetado Inteligente",
      description: "Etiquetado manual y automático de conversaciones",
    },
    {
      icon: <Workflow className="h-8 w-8" />,
      title: "Automatizaciones",
      description: "Mensajes automáticos basados en filtros y condiciones",
    },
    {
      icon: <LayoutDashboard className="h-8 w-8" />,
      title: "Tablero CRM",
      description: "Dashboard estilo CRM totalmente personalizable",
    },
    {
      icon: <Send className="h-8 w-8" />,
      title: "Campañas Masivas",
      description: "Envío de WhatsApp (costo extra) y Mails masivos",
    },
    {
      icon: <Star className="h-8 w-8" />,
      title: "Calificación de Leads",
      description: "Funciones para calificar leads y resumir conversaciones",
    },
    {
      icon: <Shield className="h-8 w-8" />,
      title: "Roles de Usuario",
      description: "Admin, Supervisor de Chat y Agente de Chat",
    },
    {
      icon: <Filter className="h-8 w-8" />,
      title: "Grupos de Trabajo",
      description: "Asignación por equipos de trabajo",
    },
  ];

  const implementationIncludes = [
    "Bot con Inteligencia Artificial personalizado",
    "Conexión a WhatsApp API Oficial",
    "Configuración de Agentes IA con roles y objetivos",
    "Creación de Tools personalizadas",
    "Carga de base de conocimiento (CSV/PDF)",
    "Configuración de Live Chat y asignaciones",
    "Setup de automatizaciones",
    "Configuración de tablero CRM",
    "Configuración de roles y grupos de trabajo",
    "Capacitación y soporte técnico",
  ];

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
                Propuesta Exclusiva para MG GROUP
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
              Automatiza tu atención al cliente con inteligencia artificial.
              <br />
              <span className="text-neonGreen font-semibold">WhatsApp Business API</span> para respuestas instantáneas 24/7
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
            className="grid md:grid-cols-2 lg:grid-cols-3 gap-6"
          >
            {features.map((feature, index) => (
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

          <div className="max-w-5xl mx-auto space-y-8">
            {/* Implementation Cost */}
            <motion.div
              initial={{ opacity: 0, y: 60 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              <Card className="bg-gradient-to-br from-card/50 to-card/30 backdrop-blur-sm border-2 border-neonGreen/30 shadow-xl shadow-neonGreen/10">
                <CardContent className="p-12">
                  <div className="text-center mb-8">
                    <div className="inline-flex items-center justify-center w-20 h-20 bg-neonGreen/10 rounded-xl mb-6">
                      <DollarSign className="h-10 w-10 text-neonGreen" />
                    </div>
                    <h3 className="text-3xl font-bold mb-4">Costo de Implementación</h3>
                    <div className="flex items-center justify-center gap-4 mb-4">
                      <span className="text-5xl font-bold text-neonGreen">$1.800.000</span>
                      <Badge className="bg-slate-100 text-slate-700 border-slate-300">
                        ARS
                      </Badge>
                    </div>
                    <p className="text-muted-foreground text-lg mb-2">
                      Tiempo de implementación: <span className="font-semibold text-slate-800">2 a 4 semanas</span>
                    </p>
                    <p className="text-muted-foreground">
                      50% para comenzar • 50% al entregar el bot funcionando
                    </p>
                  </div>
                </CardContent>
              </Card>
            </motion.div>

            {/* Monthly Plans */}
            <motion.div
              initial={{ opacity: 0, y: 60 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.2 }}
            >
              <h3 className="text-2xl font-bold text-center mb-6">Planes Mensuales</h3>
              <div className="grid md:grid-cols-2 gap-6">
                {/* Plan 1 */}
                <Card className="bg-card/50 backdrop-blur-sm border-border/50 hover:border-neonGreen/30 transition-all duration-300">
                  <CardContent className="p-8 text-center">
                    <h4 className="text-2xl font-bold mb-4">Plan 1</h4>
                    <div className="mb-4">
                      <span className="text-4xl font-bold text-neonGreen">USD 320</span>
                      <span className="text-muted-foreground">/mes</span>
                    </div>
                    <div className="space-y-3 text-left">
                      <div className="flex items-center gap-3">
                        <CheckCircle className="h-5 w-5 text-neonGreen flex-shrink-0" />
                        <span>Hasta <strong>10.000</strong> contactos</span>
                      </div>
                      <div className="flex items-center gap-3">
                        <CheckCircle className="h-5 w-5 text-neonGreen flex-shrink-0" />
                        <span>Hasta <strong>20</strong> colaboradores</span>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                {/* Plan 2 */}
                <Card className="bg-card/50 backdrop-blur-sm border-border/50 hover:border-neonGreen/30 transition-all duration-300">
                  <CardContent className="p-8 text-center">
                    <h4 className="text-2xl font-bold mb-4">Plan 2</h4>
                    <div className="mb-4">
                      <span className="text-4xl font-bold text-neonGreen">USD 690</span>
                      <span className="text-muted-foreground">/mes</span>
                    </div>
                    <div className="space-y-3 text-left">
                      <div className="flex items-center gap-3">
                        <CheckCircle className="h-5 w-5 text-neonGreen flex-shrink-0" />
                        <span>Hasta <strong>50.000</strong> contactos</span>
                      </div>
                      <div className="flex items-center gap-3">
                        <CheckCircle className="h-5 w-5 text-neonGreen flex-shrink-0" />
                        <span>Hasta <strong>50</strong> colaboradores</span>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </motion.div>

            {/* Important Notes */}
            <motion.div
              initial={{ opacity: 0, y: 60 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.3 }}
            >
              <Card className="bg-amber-50 border-amber-200">
                <CardContent className="p-6">
                  <h4 className="text-lg font-bold mb-4 flex items-center gap-2">
                    <AlertTriangle className="h-5 w-5 text-amber-600" />
                    Notas Importantes
                  </h4>
                  <div className="space-y-3">
                    <div className="flex items-start gap-3">
                      <AlertTriangle className="h-5 w-5 text-amber-600 flex-shrink-0 mt-0.5" />
                      <span className="text-amber-800">No incluye el uso y costo del motor de IA (OpenAI API)</span>
                    </div>
                    <div className="flex items-start gap-3">
                      <CheckCircle className="h-5 w-5 text-green-600 flex-shrink-0 mt-0.5" />
                      <span className="text-slate-700">La mensualidad incluye: soporte ante dudas/errores/cambios, acceso a plataforma y nuevas actualizaciones</span>
                    </div>
                    <div className="flex items-start gap-3">
                      <CheckCircle className="h-5 w-5 text-green-600 flex-shrink-0 mt-0.5" />
                      <span className="text-slate-700">La implementación es 100% a medida - entregamos el bot listo y funcionando</span>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          </div>
        </div>
      </section>

      {/* What's Included Section */}
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
              <CheckCircle className="h-4 w-4 mr-2" />
              Implementación Completa
            </Badge>
            <h2 className="text-4xl md:text-5xl font-bold mb-6">
              ¿Qué incluye la <span className="text-neonGreen">implementación</span>?
            </h2>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 60 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="max-w-4xl mx-auto"
          >
            <Card className="bg-card/50 backdrop-blur-sm border-border/50">
              <CardContent className="p-8">
                <div className="grid md:grid-cols-2 gap-4">
                  {implementationIncludes.map((item, index) => (
                    <div key={index} className="flex items-center gap-3">
                      <CheckCircle className="h-5 w-5 text-neonGreen flex-shrink-0" />
                      <span>{item}</span>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </motion.div>
        </div>
      </section>

      {/* Benefits Section */}
      <section className="py-20 bg-background section-enhanced-bg">
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
                description: "Inteligencia artificial que responde al instante con información precisa",
              },
              {
                icon: <DollarSign className="h-8 w-8" />,
                title: "Más Ventas",
                description: "Calificación automática de leads para identificar oportunidades",
              },
              {
                icon: <Users className="h-8 w-8" />,
                title: "Equipo Organizado",
                description: "Roles y grupos de trabajo para una gestión eficiente",
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

      {/* AI Costs Section */}
      <section className="py-20 bg-muted/30 section-enhanced-bg">
        <div className="container mx-auto px-4">
          <motion.div
            initial="initial"
            whileInView="animate"
            viewport={{ once: true }}
            variants={fadeInUp}
            className="text-center mb-16"
          >
            <Badge className="mb-4 bg-neonGreen/10 text-neonGreen border-neonGreen/20">
              <DollarSign className="h-4 w-4 mr-2" />
              Costos Estimados IA
            </Badge>
            <h2 className="text-4xl md:text-5xl font-bold mb-6">
              Costos de <span className="text-neonGreen">Inteligencia Artificial</span>
            </h2>
            <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
              Transparencia total en los costos del motor de IA (OpenAI API)
            </p>
          </motion.div>

          <div className="max-w-5xl mx-auto space-y-8">
            {/* Cost per conversation */}
            <motion.div
              initial={{ opacity: 0, y: 60 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              <Card className="bg-card/50 backdrop-blur-sm border-border/50">
                <CardContent className="p-6">
                  <h3 className="text-xl font-bold mb-4 text-center">Costo por Conversación</h3>
                  <div className="overflow-x-auto">
                    <table className="w-full text-sm">
                      <thead>
                        <tr className="border-b border-border">
                          <th className="text-left p-3 font-semibold">Modelo</th>
                          <th className="text-center p-3 font-semibold">Input (3k tokens)</th>
                          <th className="text-center p-3 font-semibold">Output (1k tokens)</th>
                          <th className="text-center p-3 font-semibold">Costo/conversación</th>
                        </tr>
                      </thead>
                      <tbody>
                        <tr className="border-b border-border/50">
                          <td className="p-3 font-medium">GPT-4.1</td>
                          <td className="p-3 text-center text-muted-foreground">$0.006</td>
                          <td className="p-3 text-center text-muted-foreground">$0.008</td>
                          <td className="p-3 text-center font-bold text-neonGreen">$0.014 USD</td>
                        </tr>
                        <tr>
                          <td className="p-3 font-medium">GPT-4.1 nano</td>
                          <td className="p-3 text-center text-muted-foreground">$0.00030</td>
                          <td className="p-3 text-center text-muted-foreground">$0.00040</td>
                          <td className="p-3 text-center font-bold text-neonGreen">$0.00070 USD</td>
                        </tr>
                      </tbody>
                    </table>
                  </div>
                </CardContent>
              </Card>
            </motion.div>

            {/* Monthly scenarios */}
            <motion.div
              initial={{ opacity: 0, y: 60 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.2 }}
            >
              <h3 className="text-xl font-bold mb-4 text-center">Costos Mensuales Estimados</h3>
              <div className="grid md:grid-cols-2 gap-6">
                {/* Scenario A */}
                <Card className="bg-card/50 backdrop-blur-sm border-border/50 hover:border-neonGreen/30 transition-all duration-300">
                  <CardContent className="p-6">
                    <h4 className="text-lg font-bold mb-4 text-center">
                      Escenario A: <span className="text-neonGreen">10,000 contactos/mes</span>
                    </h4>
                    <div className="space-y-3">
                      <div className="flex justify-between items-center p-3 bg-muted/50 rounded-lg">
                        <span className="font-medium">GPT-4.1</span>
                        <span className="font-bold text-lg">~$140 USD/mes</span>
                      </div>
                      <div className="flex justify-between items-center p-3 bg-neonGreen/10 rounded-lg border border-neonGreen/30">
                        <span className="font-medium">GPT-4.1 nano</span>
                        <span className="font-bold text-lg text-neonGreen">~$7 USD/mes</span>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                {/* Scenario B */}
                <Card className="bg-card/50 backdrop-blur-sm border-border/50 hover:border-neonGreen/30 transition-all duration-300">
                  <CardContent className="p-6">
                    <h4 className="text-lg font-bold mb-4 text-center">
                      Escenario B: <span className="text-neonGreen">15,000 contactos/mes</span>
                    </h4>
                    <div className="space-y-3">
                      <div className="flex justify-between items-center p-3 bg-muted/50 rounded-lg">
                        <span className="font-medium">GPT-4.1</span>
                        <span className="font-bold text-lg">~$210 USD/mes</span>
                      </div>
                      <div className="flex justify-between items-center p-3 bg-neonGreen/10 rounded-lg border border-neonGreen/30">
                        <span className="font-medium">GPT-4.1 nano</span>
                        <span className="font-bold text-lg text-neonGreen">~$10.50 USD/mes</span>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </motion.div>

            {/* Model comparison */}
            <motion.div
              initial={{ opacity: 0, y: 60 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.4 }}
            >
              <Card className="bg-card/50 backdrop-blur-sm border-border/50">
                <CardContent className="p-6">
                  <h3 className="text-xl font-bold mb-4 text-center">Comparativa de Modelos</h3>
                  <div className="overflow-x-auto">
                    <table className="w-full text-sm">
                      <thead>
                        <tr className="border-b border-border">
                          <th className="text-left p-3 font-semibold">Aspecto</th>
                          <th className="text-center p-3 font-semibold">GPT-4.1</th>
                          <th className="text-center p-3 font-semibold">GPT-4.1 nano</th>
                        </tr>
                      </thead>
                      <tbody>
                        <tr className="border-b border-border/50">
                          <td className="p-3 font-medium">Calidad de razonamiento</td>
                          <td className="p-3 text-center">
                            <div className="flex justify-center gap-0.5">
                              {[1,2,3,4,5].map((i) => (
                                <Star key={i} className="h-4 w-4 fill-neonGreen text-neonGreen" />
                              ))}
                            </div>
                          </td>
                          <td className="p-3 text-center">
                            <div className="flex justify-center gap-0.5">
                              {[1,2,3].map((i) => (
                                <Star key={i} className="h-4 w-4 fill-neonGreen text-neonGreen" />
                              ))}
                              {[4,5].map((i) => (
                                <Star key={i} className="h-4 w-4 text-muted-foreground" />
                              ))}
                            </div>
                          </td>
                        </tr>
                        <tr className="border-b border-border/50">
                          <td className="p-3 font-medium">Manejo de contexto largo</td>
                          <td className="p-3 text-center text-neonGreen font-semibold">Excelente</td>
                          <td className="p-3 text-center text-muted-foreground">Bueno</td>
                        </tr>
                        <tr className="border-b border-border/50">
                          <td className="p-3 font-medium">Velocidad</td>
                          <td className="p-3 text-center text-muted-foreground">Buena</td>
                          <td className="p-3 text-center text-neonGreen font-semibold">Muy alta</td>
                        </tr>
                        <tr className="border-b border-border/50">
                          <td className="p-3 font-medium">Ideal para</td>
                          <td className="p-3 text-center text-sm">Casos complejos, ventas, legal</td>
                          <td className="p-3 text-center text-sm">Alto volumen, WhatsApp, atención</td>
                        </tr>
                        <tr>
                          <td className="p-3 font-medium">Costo relativo</td>
                          <td className="p-3 text-center text-amber-600 font-semibold">Alto</td>
                          <td className="p-3 text-center text-neonGreen font-semibold">Muy bajo</td>
                        </tr>
                      </tbody>
                    </table>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          </div>
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
              En 2 a 4 semanas tendrás tu chatbot con IA funcionando completamente en WhatsApp Business.
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

export default LandingMGGroup;
