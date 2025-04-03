import React, { createContext, useContext, useState, useEffect, ReactNode } from "react";

type Language = "es" | "en";

interface LanguageContextType {
  language: Language;
  setLanguage: (lang: Language) => void;
  t: (key: string) => string;
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

// Translation dictionaries
const translations: Record<Language, Record<string, string>> = {
  es: {
    // Navigation
    "nav.home": "Inicio",
    "nav.services": "Servicios",
    "nav.portfolio": "Portafolio",
    "nav.about": "Nosotros",
    "nav.contact": "Contacto",
    "nav.get.started": "Comenzar",
    
    // Index/Hero Section
    "hero.badge": "Soluciones Basadas en IA",
    "hero.title": "Transforme su Negocio con Soluciones de IA Personalizadas",
    "hero.description": "Desarrollamos soluciones personalizadas de IA y software que ayudan a las empresas a automatizar procesos, obtener información y impulsar el crecimiento.",
    "hero.get.started": "Comenzar",
    "hero.explore.services": "Explorar Servicios",

    // Services Cards
    "services.ai.integration": "Integración de IA",
    "services.ai.integration.desc": "Conecta modelos de IA a tus flujos de trabajo empresariales",
    "services.custom.dev": "Desarrollo Personalizado",
    "services.custom.dev.desc": "Soluciones a medida para tus necesidades",
    "services.chatbot": "Creación de Chatbots",
    "services.chatbot.desc": "Interfaces conversacionales inteligentes",
    "services.process.automation": "Automatización de Procesos",
    "services.process.automation.desc": "Optimiza flujos de trabajo con IA",
    
    // Services Section
    "services.title": "Nuestros Servicios",
    "services.subtitle": "Transformando Ideas en Soluciones Poderosas",
    "services.description": "Nos especializamos en desarrollar soluciones tecnológicas innovadoras que resuelven problemas empresariales reales",
    "services.view.all": "Ver Todos los Servicios",
    "services.learn.more": "Más Información",
    
    // Portfolio Section
    "portfolio.title": "Nuestro Portafolio",
    "portfolio.subtitle": "Mostrando Nuestro Mejor Trabajo",
    "portfolio.description": "Explore nuestros proyectos exitosos y vea cómo hemos ayudado a las empresas a transformar sus operaciones",
    "portfolio.view.details": "Ver Detalles",
    "portfolio.case.study": "Caso de Estudio",
    "portfolio.view.all": "Ver Todos los Proyectos",
    
    // Testimonials Section
    "testimonials.title": "Historias de Éxito de Clientes",
    "testimonials.subtitle": "Lo Que Dicen Nuestros Clientes",
    
    // CTA Section
    "cta.title": "¿Listo para Transformar su Negocio?",
    "cta.description": "Hablemos sobre cómo nuestras soluciones de software e IA pueden ayudarle a alcanzar sus objetivos empresariales. Programe una consulta gratuita hoy.",
    "cta.schedule": "Agendar Consulta",
    "cta.pricing": "Ver Precios",
    
    // 404 Page
    "404.title": "404",
    "404.message": "¡Ups! Página no encontrada",
    "404.back.link": "Volver al Inicio",
    
    // Login page
    "client.portal": "Portal del Cliente",
    "client.portal.description": "Ingrese sus credenciales para acceder a su portal",
    "email": "Correo electrónico",
    "password": "Contraseña",
    "login": "Iniciar sesión",
    "logging.in": "Iniciando sesión...",
    "login.success": "¡Inicio de sesión exitoso!",
    "login.welcome": "Bienvenido a su portal de cliente.",
    "login.error": "Error de inicio de sesión",
    "form.incomplete": "Formulario incompleto",
    "form.incomplete.message": "Por favor ingrese su correo electrónico y contraseña.",
    "invalid.credentials": "Credenciales inválidas. Por favor verifique su correo electrónico y contraseña.",
    "login.problem": "Hubo un problema al iniciar sesión. Intente nuevamente.",

    // AI Workflow Section
    "ai.workflow.title": "Flujo de Trabajo con IA",
    "ai.workflow.subtitle": "Cómo Implementamos Soluciones de IA",
    
    // Video Section
    "videos.title": "Builders AI en acción",
    
    // Country Stats Section
    "countries.title": "Países que atendemos",
    "countries.subtitle": "PRESENCIA GLOBAL",
    "countries.description": "Brindamos soluciones de IA y desarrollo personalizado a clientes en todo el mundo",
    "countries.clients": "clientes",
    "countries.total": "TOTAL DE CLIENTES",
    
    // Common
    "email.placeholder": "email@ejemplo.com",
  },
  en: {
    // Navigation
    "nav.home": "Home",
    "nav.services": "Services",
    "nav.portfolio": "Portfolio",
    "nav.about": "About",
    "nav.contact": "Contact",
    "nav.get.started": "Get Started",
    
    // Index/Hero Section
    "hero.badge": "AI-Powered Solutions",
    "hero.title": "Transform Your Business with Custom AI Solutions",
    "hero.description": "We build custom AI and software solutions that help businesses automate processes, gain insights, and drive growth.",
    "hero.get.started": "Get Started",
    "hero.explore.services": "Explore Services",

    // Services Cards
    "services.ai.integration": "AI Integration",
    "services.ai.integration.desc": "Connect AI models to your business workflows",
    "services.custom.dev": "Custom Development",
    "services.custom.dev.desc": "Tailored solutions for your needs",
    "services.chatbot": "Chatbot Creation",
    "services.chatbot.desc": "Intelligent conversational interfaces",
    "services.process.automation": "Process Automation",
    "services.process.automation.desc": "Streamline workflows with AI",
    
    // Services Section
    "services.title": "Our Services",
    "services.subtitle": "Transforming Ideas into Powerful Solutions",
    "services.description": "We specialize in developing innovative technology solutions that solve real business problems",
    "services.view.all": "View All Services",
    "services.learn.more": "Learn More",
    
    // Portfolio Section
    "portfolio.title": "Our Portfolio",
    "portfolio.subtitle": "Showcasing Our Best Work",
    "portfolio.description": "Explore our successful projects and see how we've helped businesses transform their operations",
    "portfolio.view.details": "View Details",
    "portfolio.case.study": "Case Study",
    "portfolio.view.all": "View All Projects",
    
    // Testimonials Section
    "testimonials.title": "Client Success Stories",
    "testimonials.subtitle": "What Our Clients Say",
    
    // CTA Section
    "cta.title": "Ready to Transform Your Business?",
    "cta.description": "Let's discuss how our software and bot solutions can help you achieve your business goals. Schedule a free consultation today.",
    "cta.schedule": "Schedule Consultation",
    "cta.pricing": "View Pricing",
    
    // 404 Page
    "404.title": "404",
    "404.message": "Oops! Page not found",
    "404.back.link": "Return to Home",
    
    // Login page
    "client.portal": "Client Portal",
    "client.portal.description": "Enter your credentials to access your portal",
    "email": "Email",
    "password": "Password",
    "login": "Log in",
    "logging.in": "Logging in...",
    "login.success": "Login successful!",
    "login.welcome": "Welcome to your client portal.",
    "login.error": "Login error",
    "form.incomplete": "Incomplete form",
    "form.incomplete.message": "Please enter your email and password.",
    "invalid.credentials": "Invalid credentials. Please check your email and password.",
    "login.problem": "There was a problem logging in. Please try again.",

    // AI Workflow Section
    "ai.workflow.title": "AI Workflow",
    "ai.workflow.subtitle": "How We Implement AI Solutions",
    
    // Video Section
    "videos.title": "Builders AI in Action",
    
    // Country Stats Section
    "countries.title": "Countries We Serve",
    "countries.subtitle": "GLOBAL PRESENCE",
    "countries.description": "We provide AI solutions and custom development to clients worldwide",
    "countries.clients": "clients",
    "countries.total": "TOTAL CLIENTS",
    
    // Common
    "email.placeholder": "email@example.com",
  }
};

interface LanguageProviderProps {
  children: ReactNode;
}

export const LanguageProvider: React.FC<LanguageProviderProps> = ({ children }) => {
  const [language, setLanguage] = useState<Language>(() => {
    // Try to get saved language or default to Spanish
    const saved = localStorage.getItem("language") as Language;
    return saved === "en" ? "en" : "es";
  });

  useEffect(() => {
    // Save language preference when it changes
    localStorage.setItem("language", language);
  }, [language]);

  const t = (key: string): string => {
    return translations[language][key] || key;
  };

  return (
    <LanguageContext.Provider value={{ language, setLanguage, t }}>
      {children}
    </LanguageContext.Provider>
  );
};

export const useLanguage = (): LanguageContextType => {
  const context = useContext(LanguageContext);
  if (context === undefined) {
    throw new Error("useLanguage must be used within a LanguageProvider");
  }
  return context;
};
