import { useEffect } from "react";
import { motion } from "framer-motion";
import {
  Brain,
  FileSpreadsheet,
  Upload,
  CheckCircle,
  Clock,
  Shield,
  Zap,
  Camera,
  FileCheck,
  Eye,
  RefreshCw,
  AlertCircle,
  Calculator,
  Database,
  ChevronRight,
  DollarSign,
  Rocket,
  MessageSquare,
  Copy,
  FileX,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { useToast } from "@/hooks/use-toast";

const LandingEVContadores = () => {
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
      title: "Redirigiendo a WhatsApp",
      description: "Te contactaremos para coordinar tu demo.",
    });
    window.open("https://wa.me/17864087985", "_blank");
  };

  const problems = [
    { icon: <Clock className="h-6 w-6" />, text: "Horas cargando comprobantes manualmente" },
    { icon: <AlertCircle className="h-6 w-6" />, text: "Errores de tipeo que generan inconsistencias" },
    { icon: <FileX className="h-6 w-6" />, text: "Formatos distintos entre impresoras fiscales" },
    { icon: <Copy className="h-6 w-6" />, text: "Duplicados y omisiones difíciles de detectar" },
  ];

  const steps = [
    {
      number: "01",
      icon: <Camera className="h-8 w-8" />,
      title: "Sacá las fotos",
      description: "Desde tu celular, fotografiá los comprobantes Z (100, 200 o más)",
    },
    {
      number: "02",
      icon: <Upload className="h-8 w-8" />,
      title: "Subí en lote",
      description: "Cargá todas las imágenes de una sola vez al sistema",
    },
    {
      number: "03",
      icon: <Brain className="h-8 w-8" />,
      title: "IA procesa",
      description: "Cada imagen se analiza: fecha, punto de venta, totales, rangos",
    },
    {
      number: "04",
      icon: <FileSpreadsheet className="h-8 w-8" />,
      title: "Sheet listo",
      description: "Un único Google Sheet con formato ONVIO, listo para importar",
    },
  ];

  const features = [
    {
      icon: <Eye className="h-8 w-8" />,
      title: "Visión Inteligente",
      description: "Lee texto y entiende la estructura del comprobante, más robusto que OCR tradicional",
    },
    {
      icon: <RefreshCw className="h-8 w-8" />,
      title: "Normalización Automática",
      description: "Traduce cualquier formato al esquema AFIP estándar",
    },
    {
      icon: <FileSpreadsheet className="h-8 w-8" />,
      title: "Google Sheets API",
      description: "Inserta filas automáticamente en un archivo compartido",
    },
    {
      icon: <Database className="h-8 w-8" />,
      title: "Almacenamiento",
      description: "Guarda imágenes para auditoría o reprocesamiento",
    },
  ];

  const benefits = [
    {
      icon: <Clock className="h-8 w-8" />,
      title: "De horas a minutos",
      description: "Procesá 200 comprobantes en el tiempo de cargar 5 manualmente",
    },
    {
      icon: <Shield className="h-8 w-8" />,
      title: "Cero errores",
      description: "Sin errores de tipeo ni números transpuestos",
    },
    {
      icon: <FileCheck className="h-8 w-8" />,
      title: "Un solo archivo",
      description: "Todo consolidado, ordenado por fecha, sin duplicados",
    },
    {
      icon: <Eye className="h-8 w-8" />,
      title: "100% auditable",
      description: "Las imágenes originales se conservan para revisión",
    },
  ];

  const systemIncludes = [
    "Sistema de carga masiva de imágenes",
    "IA con reconocimiento de comprobantes Z",
    "Motor de normalización contable",
    "Integración con Google Sheets",
    "Formato compatible con ONVIO",
    "Almacenamiento de imágenes para auditoría",
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
                <Calculator className="h-4 w-4 mr-2" />
                Automatización Contable con IA
              </Badge>
            </motion.div>

            <motion.h1
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="text-5xl md:text-7xl font-bold mb-6 bg-gradient-to-r from-white via-white to-neonGreen bg-clip-text text-transparent leading-tight"
            >
              Procesá cientos de{" "}
              <span className="text-neonGreen">comprobantes Z</span>
              <br />en minutos
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.4 }}
              className="text-xl md:text-2xl text-white/80 mb-8 max-w-3xl mx-auto leading-relaxed"
            >
              Subí las fotos desde tu celular, nuestra IA extrae los datos y genera un{" "}
              <span className="text-neonGreen font-semibold">Google Sheet listo para importar en ONVIO</span>
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
                  Solicitar Demo <ChevronRight className="ml-2 h-5 w-5" />
                </Button>
                <Button
                  size="lg"
                  variant="outline"
                  className="border-white text-white hover:bg-white hover:text-darkBlue px-8 py-4 text-lg"
                  onClick={() =>
                    document
                      .getElementById("how-it-works")
                      ?.scrollIntoView({ behavior: "smooth" })
                  }
                >
                  Ver cómo funciona
                </Button>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Problem Section */}
      <section className="py-20 bg-muted/30 section-enhanced-bg">
        <div className="container mx-auto px-4">
          <motion.div
            initial="initial"
            whileInView="animate"
            viewport={{ once: true }}
            variants={fadeInUp}
            className="text-center mb-16"
          >
            <Badge className="mb-4 bg-red-100 text-red-700 border-red-200">
              <AlertCircle className="h-4 w-4 mr-2" />
              El problema actual
            </Badge>
            <h2 className="text-4xl md:text-5xl font-bold mb-6">
              El <span className="text-red-500">dolor</span> de cargar comprobantes Z
            </h2>
            <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
              Cada cierre mensual, los contadores enfrentan el mismo desafío repetitivo
            </p>
          </motion.div>

          <motion.div
            initial="initial"
            whileInView="animate"
            viewport={{ once: true }}
            variants={staggerContainer}
            className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 max-w-5xl mx-auto"
          >
            {problems.map((problem, index) => (
              <motion.div key={index} variants={fadeInUp}>
                <Card className="h-full bg-card/50 backdrop-blur-sm border-red-200/50 hover:border-red-300 transition-all duration-300">
                  <CardContent className="p-6 text-center">
                    <div className="inline-flex items-center justify-center w-14 h-14 bg-red-100 rounded-xl mb-4 text-red-600">
                      {problem.icon}
                    </div>
                    <p className="text-slate-700 font-medium">{problem.text}</p>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* How It Works Section */}
      <section id="how-it-works" className="py-20 bg-background section-enhanced-bg">
        <div className="container mx-auto px-4">
          <motion.div
            initial="initial"
            whileInView="animate"
            viewport={{ once: true }}
            variants={fadeInUp}
            className="text-center mb-16"
          >
            <Badge className="mb-4 bg-neonGreen/10 text-neonGreen border-neonGreen/20">
              <Zap className="h-4 w-4 mr-2" />
              Cómo funciona
            </Badge>
            <h2 className="text-4xl md:text-5xl font-bold mb-6">
              De fotos a <span className="text-neonGreen">planilla lista</span> en 4 pasos
            </h2>
          </motion.div>

          <motion.div
            initial="initial"
            whileInView="animate"
            viewport={{ once: true }}
            variants={staggerContainer}
            className="grid md:grid-cols-2 lg:grid-cols-4 gap-6"
          >
            {steps.map((step, index) => (
              <motion.div key={index} variants={fadeInUp}>
                <Card className="h-full bg-card/50 backdrop-blur-sm border-border/50 hover:border-neonGreen/30 transition-all duration-300 hover:shadow-lg hover:shadow-neonGreen/10">
                  <CardContent className="p-6 text-center">
                    <div className="text-6xl font-bold text-neonGreen/20 mb-4">
                      {step.number}
                    </div>
                    <div className="inline-flex items-center justify-center w-16 h-16 bg-slate-100 rounded-xl mb-4 text-slate-600">
                      {step.icon}
                    </div>
                    <h3 className="text-xl font-semibold mb-3">{step.title}</h3>
                    <p className="text-muted-foreground">{step.description}</p>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* AI Features Section */}
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
              <Brain className="h-4 w-4 mr-2" />
              Tecnología de IA
            </Badge>
            <h2 className="text-4xl md:text-5xl font-bold mb-6">
              Capacidades de la <span className="text-neonGreen">Inteligencia Artificial</span>
            </h2>
            <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
              No es un OCR tradicional. Es visión artificial que entiende el contexto contable.
            </p>
          </motion.div>

          <motion.div
            initial="initial"
            whileInView="animate"
            viewport={{ once: true }}
            variants={staggerContainer}
            className="grid md:grid-cols-2 lg:grid-cols-4 gap-6"
          >
            {features.map((feature, index) => (
              <motion.div key={index} variants={fadeInUp}>
                <Card className="h-full bg-card/50 backdrop-blur-sm border-border/50 hover:border-neonGreen/30 transition-all duration-300 hover:shadow-lg hover:shadow-neonGreen/10">
                  <CardContent className="p-6 text-center">
                    <div className="inline-flex items-center justify-center w-16 h-16 bg-slate-100 rounded-xl mb-4 text-slate-600">
                      {feature.icon}
                    </div>
                    <h3 className="text-xl font-semibold mb-3">{feature.title}</h3>
                    <p className="text-muted-foreground">{feature.description}</p>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </motion.div>

          {/* What the AI extracts */}
          <motion.div
            initial={{ opacity: 0, y: 60 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="mt-12 max-w-4xl mx-auto"
          >
            <Card className="bg-card/50 backdrop-blur-sm border-neonGreen/30">
              <CardContent className="p-8">
                <h3 className="text-xl font-bold mb-6 text-center">
                  Datos que extrae de cada comprobante Z
                </h3>
                <div className="grid md:grid-cols-3 gap-4">
                  {[
                    "Fecha del comprobante",
                    "Punto de venta",
                    "Rango de comprobantes",
                    "Total exento",
                    "Total gravado",
                    "IVA discriminado",
                  ].map((item, index) => (
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
              <Zap className="h-4 w-4 mr-2" />
              Beneficios
            </Badge>
            <h2 className="text-4xl md:text-5xl font-bold mb-6">
              Resultados <span className="text-neonGreen">inmediatos</span>
            </h2>
          </motion.div>

          <motion.div
            initial="initial"
            whileInView="animate"
            viewport={{ once: true }}
            variants={staggerContainer}
            className="grid md:grid-cols-2 lg:grid-cols-4 gap-6"
          >
            {benefits.map((benefit, index) => (
              <motion.div key={index} variants={fadeInUp}>
                <Card className="h-full bg-card/50 backdrop-blur-sm border-border/50 hover:border-neonGreen/30 transition-all duration-300 hover:shadow-lg hover:shadow-neonGreen/10">
                  <CardContent className="p-6 text-center">
                    <div className="inline-flex items-center justify-center w-16 h-16 bg-slate-100 rounded-xl mb-4 text-slate-600">
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
              Qué incluye el sistema
            </Badge>
            <h2 className="text-4xl md:text-5xl font-bold mb-6">
              Todo lo que <span className="text-neonGreen">necesitás</span>
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
                  {systemIncludes.map((item, index) => (
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
            {/* Development Cost */}
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
                    <h3 className="text-3xl font-bold mb-4">Desarrollo del Sistema</h3>
                    <div className="flex items-center justify-center gap-4 mb-4">
                      <span className="text-5xl font-bold text-neonGreen">$1.200.000</span>
                      <Badge className="bg-slate-100 text-slate-700 border-slate-300">
                        ARS
                      </Badge>
                    </div>
                    <p className="text-muted-foreground text-lg mb-2">
                      Tiempo de desarrollo: <span className="font-semibold text-slate-800">2-3 semanas</span>
                    </p>
                    <p className="text-muted-foreground">
                      50% para iniciar - 50% al finalizar
                    </p>
                  </div>
                </CardContent>
              </Card>
            </motion.div>

            {/* Monthly Fee */}
            <motion.div
              initial={{ opacity: 0, y: 60 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.2 }}
            >
              <Card className="bg-card/50 backdrop-blur-sm border-border/50 hover:border-neonGreen/30 transition-all duration-300">
                <CardContent className="p-8 text-center">
                  <h4 className="text-2xl font-bold mb-4">Fee Mensual</h4>
                  <div className="mb-4">
                    <span className="text-4xl font-bold text-neonGreen">$130.000</span>
                    <span className="text-muted-foreground"> ARS/mes</span>
                  </div>
                  <p className="text-muted-foreground">
                    Incluye mantenimiento, soporte técnico y actualizaciones
                  </p>
                </CardContent>
              </Card>
            </motion.div>

            {/* What's Included in Price */}
            <motion.div
              initial={{ opacity: 0, y: 60 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.3 }}
            >
              <Card className="bg-slate-50 border-slate-200">
                <CardContent className="p-6">
                  <h4 className="text-lg font-bold mb-4 flex items-center gap-2">
                    <CheckCircle className="h-5 w-5 text-neonGreen" />
                    La propuesta incluye
                  </h4>
                  <div className="grid md:grid-cols-2 gap-3">
                    {systemIncludes.map((item, index) => (
                      <div key={index} className="flex items-start gap-3">
                        <CheckCircle className="h-5 w-5 text-neonGreen flex-shrink-0 mt-0.5" />
                        <span className="text-slate-700">{item}</span>
                      </div>
                    ))}
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
              Dejá de perder tiempo con la <span className="text-neonGreen">carga manual</span>
            </h2>
            <p className="text-xl text-white/80 mb-8 max-w-3xl mx-auto">
              Automatizá el procesamiento de comprobantes Z y dedicá tu tiempo a tareas de mayor valor para tus clientes.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button
                size="lg"
                className="bg-neonGreen text-darkBlue hover:bg-neonGreen/90 font-bold px-12 py-4 text-xl button-glow"
                onClick={handleContactClick}
              >
                <MessageSquare className="mr-3 h-6 w-6" />
                Solicitar Demo por WhatsApp
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

export default LandingEVContadores;
