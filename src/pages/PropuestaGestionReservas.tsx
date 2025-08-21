import { useEffect } from "react";
import { motion } from "framer-motion";
import { ArrowRight, CheckCircle, Star, Users, Zap, Shield, Globe, Code, BrainCircuit, Calendar, Database, Settings, Headphones, ChevronDown, FileText, DollarSign, BarChart3, Clock, AlertTriangle, Package } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

const PropuestaGestionReservas = () => {
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
        <div className="absolute inset-0 bg-gradient-to-br from-darkBlue via-slate-900 to-black"></div>
        <div className="absolute inset-0 hero-bg-overlay"></div>
        
        <div className="absolute inset-0 bg-grid-pattern opacity-20"></div>
        
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute top-1/4 left-1/4 w-64 h-64 bg-neonGreen/5 rounded-full blur-3xl animate-pulse floating-shapes"></div>
          <div className="absolute top-3/4 right-1/4 w-96 h-96 bg-blue-500/5 rounded-full blur-3xl animate-pulse floating-shapes"></div>
          <div className="absolute bottom-1/4 left-1/3 w-48 h-48 bg-purple-500/5 rounded-full blur-3xl animate-pulse floating-shapes"></div>
        </div>
        
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
                🏢 Sistema de Gestión Empresarial
              </Badge>
            </motion.div>

            <motion.h1
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="text-5xl md:text-7xl font-bold mb-6 bg-gradient-to-r from-white via-white to-neonGreen bg-clip-text text-transparent leading-tight"
            >
              Sistema de <span className="text-neonGreen">Gestión de Reservas</span> y Expedientes
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.4 }}
              className="text-xl md:text-2xl text-white/80 mb-12 max-w-3xl mx-auto leading-relaxed"
            >
              Aplicación web completa para agencias de viajes que centraliza clientes, proveedores, 
              expedientes, servicios, estados de cuenta y facturación con control de rentabilidad.
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

      {/* Executive Summary Section */}
      <section id="resumen" className="py-20 bg-background section-enhanced-bg">
        <div className="absolute inset-0 light-bg-overlay"></div>
        
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
            <Badge className="mb-4 bg-neonGreen/10 text-neonGreen border-neonGreen/20">
              Resumen Ejecutivo
            </Badge>
            <h2 className="text-4xl md:text-5xl font-bold mb-6">
              <span className="text-neonGreen">Solución Integral</span> para Agencias
            </h2>
            <p className="text-xl text-muted-foreground max-w-4xl mx-auto">
              Desarrollo de una aplicación web que centraliza toda la operación de tu agencia de viajes, 
              desde la gestión de clientes hasta el control de rentabilidad por expediente.
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
                icon: <Users className="h-8 w-8" />,
                title: "Gestión de Clientes",
                description: "Centralización completa de clientes y pasajeros con vinculación a expedientes"
              },
              {
                icon: <Package className="h-8 w-8" />,
                title: "Control de Proveedores",
                description: "ABM completo con datos bancarios, CUIT y vista consolidada por proveedor"
              },
              {
                icon: <FileText className="h-8 w-8" />,
                title: "Expedientes Digitales",
                description: "Gestión completa de reservas con servicios, pagos y control de vencimientos"
              },
              {
                icon: <BarChart3 className="h-8 w-8" />,
                title: "Control de Rentabilidad",
                description: "Cálculo automático de rentabilidad por expediente en pesos y porcentaje"
              },
              {
                icon: <DollarSign className="h-8 w-8" />,
                title: "Estados de Cuenta",
                description: "Seguimiento detallado de pagos por cliente, pasajero y proveedor"
              },
              {
                icon: <AlertTriangle className="h-8 w-8" />,
                title: "Alertas de Vencimiento",
                description: "Notificaciones automáticas para evitar pérdidas y recargos"
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

      {/* Functional Scope Section */}
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
              Alcance Funcional MVP
            </Badge>
            <h2 className="text-4xl md:text-5xl font-bold mb-6">
              Funcionalidades <span className="text-neonGreen">Principales</span>
            </h2>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              Módulos completos para una gestión integral de tu agencia de viajes
            </p>
          </motion.div>

          <motion.div
            initial="initial"
            whileInView="animate"
            viewport={{ once: true }}
            variants={staggerContainer}
            className="grid lg:grid-cols-2 gap-8"
          >
            {[
              {
                title: "Dashboard Principal",
                features: [
                  "Tabla con filtros avanzados por sucursal, beneficiario, fecha",
                  "Control de rentabilidad automática por expediente",
                  "Gestión de vencimientos próximos con alertas",
                  "Widgets de reservas por vencer y pagos pendientes",
                  "Facturación automática configurable por expediente"
                ]
              },
              {
                title: "Gestión de Expedientes",
                features: [
                  "Apertura con configuración de pago por pasajero o reserva",
                  "Vinculación de pasajeros y elección de titular",
                  "Manejo de múltiples monedas con tipo de cambio",
                  "Servicios asociados con proveedores y destinos",
                  "Historial completo de auditoría de cambios"
                ]
              },
              {
                title: "Control Financiero",
                features: [
                  "Estados de cuenta por cliente/PAX y proveedor",
                  "Imputación de pagos con emisión de recibos",
                  "Formas de pago configurables (efectivo, transferencia, tarjeta)",
                  "Registro histórico de tipos de cambio aplicados",
                  "Flag de facturación automática por expediente"
                ]
              },
              {
                title: "Exportación y Comunicación",
                features: [
                  "Exportación completa de expedientes con logo corporativo",
                  "Condiciones de viaje personalizables",
                  "Notas internas (staff) y externas (cliente)",
                  "Generación de vouchers cuando aplique",
                  "Notificaciones configurables por email"
                ]
              }
            ].map((module, index) => (
              <motion.div
                key={index}
                variants={fadeInUp}
              >
                <Card className="h-full bg-card/50 backdrop-blur-sm border-border/50">
                  <CardContent className="p-6">
                    <h3 className="text-2xl font-semibold mb-4 text-neonGreen">{module.title}</h3>
                    <ul className="space-y-3">
                      {module.features.map((feature, featureIndex) => (
                        <li key={featureIndex} className="flex items-start">
                          <CheckCircle className="h-5 w-5 text-neonGreen mr-3 mt-0.5 flex-shrink-0" />
                          <span className="text-muted-foreground">{feature}</span>
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

      {/* Timeline Section */}
      <section className="py-20 bg-background section-enhanced-bg">
        <div className="container mx-auto px-4">
          <motion.div
            initial="initial"
            whileInView="animate"
            viewport={{ once: true }}
            variants={fadeInUp}
            className="text-center mb-16"
          >
            <Badge className="mb-4 bg-neonGreen/10 text-neonGreen border-neonGreen/20">
              Cronograma de Desarrollo
            </Badge>
            <h2 className="text-4xl md:text-5xl font-bold mb-6">
              Entrega en <span className="text-neonGreen">3-4 Meses</span>
            </h2>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              Plan estructurado por fases con entregas incrementales y demos al final de cada etapa
            </p>
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
                phase: "Fase 0",
                duration: "1 semana",
                title: "Descubrimiento y PRD",
                items: [
                  "Afinar campos y flujos",
                  "Definir reportes exportables",
                  "Aceptación del PRD",
                  "Plan de releases"
                ]
              },
              {
                phase: "Fase 1",
                duration: "Semanas 2-5",
                title: "Fundaciones y Catálogos",
                items: [
                  "Base de datos y autenticación",
                  "Layout y permisos",
                  "Clientes y Proveedores (ABM)",
                  "Componentes UI base"
                ]
              },
              {
                phase: "Fase 2",
                duration: "Semanas 6-9",
                title: "Expedientes y Servicios",
                items: [
                  "Alta de expedientes completos",
                  "Gestión de servicios",
                  "Imputación de pagos",
                  "Historial de cambios"
                ]
              },
              {
                phase: "Fase 3",
                duration: "Semanas 10-12",
                title: "Dashboard y Estados",
                items: [
                  "Dashboard con filtros",
                  "Estados de cuenta",
                  "Exportación de expedientes",
                  "KPIs de rentabilidad"
                ]
              }
            ].map((phase, index) => (
              <motion.div
                key={index}
                variants={fadeInUp}
              >
                <Card className="h-full bg-card/50 backdrop-blur-sm border-border/50 hover:border-neonGreen/30 transition-all duration-300">
                  <CardContent className="p-6">
                    <div className="text-center mb-4">
                      <Badge className="bg-neonGreen/10 text-neonGreen border-neonGreen/20 mb-2">
                        {phase.phase}
                      </Badge>
                      <div className="text-sm text-muted-foreground">{phase.duration}</div>
                    </div>
                    <h3 className="text-lg font-semibold mb-4 text-center">{phase.title}</h3>
                    <ul className="space-y-2">
                      {phase.items.map((item, itemIndex) => (
                        <li key={itemIndex} className="flex items-start text-sm">
                          <div className="w-1.5 h-1.5 bg-neonGreen rounded-full mr-2 mt-2 flex-shrink-0"></div>
                          <span className="text-muted-foreground">{item}</span>
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

      {/* Investment Section */}
      <section className="py-20 bg-muted/30 section-enhanced-bg">
        <div className="container mx-auto px-4">
          <motion.div
            initial="initial"
            whileInView="animate"
            viewport={{ once: true }}
            variants={fadeInUp}
            className="text-center mb-16"
          >
            <Badge className="mb-4 bg-blue-500/10 text-blue-400 border-blue-500/20">
              Inversión del Proyecto
            </Badge>
            <h2 className="text-4xl md:text-5xl font-bold mb-6">
              Inversión <span className="text-neonGreen">Total</span>
            </h2>
          </motion.div>

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
                  <DollarSign className="h-8 w-8 text-neonGreen" />
                </div>
                <h3 className="text-2xl font-bold mb-4">Sistema Completo de Gestión</h3>
                <div className="text-5xl font-bold text-neonGreen mb-4">USD $3,000</div>
                <p className="text-muted-foreground mb-8">
                  Desarrollo completo del sistema con todas las funcionalidades MVP incluidas
                </p>
                
                <div className="bg-background/50 rounded-lg p-6 mb-6">
                  <h4 className="text-lg font-semibold mb-4">Plan de Pagos</h4>
                  <div className="grid grid-cols-2 gap-4 text-sm">
                    {[
                      "4 pagos consecutivos",
                      "USD $750 cada uno",
                      "Sin intereses",
                      "Flexibilidad de fechas"
                    ].map((item, index) => (
                      <div key={index} className="flex items-center">
                        <CheckCircle className="h-4 w-4 text-neonGreen mr-2" />
                        <span>{item}</span>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="space-y-3 text-sm">
                  <div className="flex items-center justify-center">
                    <CheckCircle className="h-4 w-4 text-neonGreen mr-2" />
                    <span>Código fuente completo incluido</span>
                  </div>
                  <div className="flex items-center justify-center">
                    <CheckCircle className="h-4 w-4 text-neonGreen mr-2" />
                    <span>Infraestructura configurada</span>
                  </div>
                  <div className="flex items-center justify-center">
                    <CheckCircle className="h-4 w-4 text-neonGreen mr-2" />
                    <span>Manual de usuario y técnico</span>
                  </div>
                  <div className="flex items-center justify-center">
                    <CheckCircle className="h-4 w-4 text-neonGreen mr-2" />
                    <span>Plan de respaldo y recuperación</span>
                  </div>
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
            <Badge className="mb-4 bg-neonGreen/10 text-neonGreen border-neonGreen/20">
              Beneficios Clave
            </Badge>
            <h2 className="text-4xl md:text-5xl font-bold mb-6">
              <span className="text-neonGreen">Ventajas</span> del Sistema
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
                icon: <Zap className="h-8 w-8" />,
                title: "Eficiencia Operativa",
                description: "Menos errores y reprocesos con datos centralizados y auditoría completa"
              },
              {
                icon: <BarChart3 className="h-8 w-8" />,
                title: "Control de Rentabilidad",
                description: "Visibilidad total de rentabilidad por expediente en pesos y porcentaje"
              },
              {
                icon: <Clock className="h-8 w-8" />,
                title: "Ahorro de Tiempo",
                description: "Plantillas, filtros y exportables listos para enviar a clientes"
              },
              {
                icon: <AlertTriangle className="h-8 w-8" />,
                title: "Alertas Inteligentes",
                description: "Notificaciones de vencimientos que evitan pérdidas y recargos"
              },
              {
                icon: <Shield className="h-8 w-8" />,
                title: "Seguridad y Trazabilidad",
                description: "Historial completo para auditorías internas y control de cambios"
              },
              {
                icon: <Settings className="h-8 w-8" />,
                title: "Escalabilidad",
                description: "Arquitectura modular con React + TypeScript + PostgreSQL"
              }
            ].map((benefit, index) => (
              <motion.div
                key={index}
                variants={fadeInUp}
              >
                <Card className="h-full bg-card/50 backdrop-blur-sm border-border/50 hover:border-neonGreen/30 transition-all duration-300 hover:shadow-lg hover:shadow-neonGreen/10">
                  <CardContent className="p-6">
                    <div className="inline-flex items-center justify-center w-12 h-12 bg-neonGreen/10 rounded-lg mb-4 text-neonGreen">
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

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-br from-darkBlue via-slate-900 to-black relative overflow-hidden">
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
              Sistema de Gestión <span className="text-neonGreen">Integral</span> para Agencias
            </h2>
            <p className="text-xl text-white/80 mb-8">
              Una solución completa que revolucionará la gestión de tu agencia de viajes con 
              tecnología moderna, control de rentabilidad y automatización inteligente.
            </p>
          </motion.div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default PropuestaGestionReservas;