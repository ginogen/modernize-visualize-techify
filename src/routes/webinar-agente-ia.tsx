import { useState, useEffect } from 'react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { motion, AnimatePresence } from "framer-motion";
import { Bot, Clock, Video, Users, CheckCircle2, Linkedin, X } from "lucide-react";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

const ciudades = [
  { ciudad: "Buenos Aires", pais: "Argentina" },
  { ciudad: "Córdoba", pais: "Argentina" },
  { ciudad: "Rosario", pais: "Argentina" },
  { ciudad: "Mendoza", pais: "Argentina" },
  { ciudad: "Santiago", pais: "Chile" },
  { ciudad: "Valparaíso", pais: "Chile" },
  { ciudad: "Concepción", pais: "Chile" },
  { ciudad: "Viña del Mar", pais: "Chile" },
  { ciudad: "Ciudad de México", pais: "México" },
  { ciudad: "Guadalajara", pais: "México" },
  { ciudad: "Monterrey", pais: "México" },
  { ciudad: "Puebla", pais: "México" },
  { ciudad: "La Plata", pais: "Argentina" },
  { ciudad: "Mar del Plata", pais: "Argentina" },
  { ciudad: "Antofagasta", pais: "Chile" },
  { ciudad: "Temuco", pais: "Chile" },
  { ciudad: "Tijuana", pais: "México" },
  { ciudad: "León", pais: "México" },
  { ciudad: "Salta", pais: "Argentina" },
  { ciudad: "Santa Fe", pais: "Argentina" }
];

export default function WebinarAgenteIA() {
  const [registeredCount, setRegisteredCount] = useState(20);
  const [showStickyButton, setShowStickyButton] = useState(false);
  const [showPopup, setShowPopup] = useState(false);
  const [currentLocation, setCurrentLocation] = useState({ ciudad: "", pais: "" });
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: ''
  });

  useEffect(() => {
    // Simular contador de registros
    const interval = setInterval(() => {
      setRegisteredCount(prev => {
        const newCount = prev + Math.floor(Math.random() * 3);
        return newCount > 100 ? 20 : newCount;
      });
    }, 5000);

    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 100) {
        setShowStickyButton(true);
      } else {
        setShowStickyButton(false);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    const showRandomPopup = () => {
      const randomLocation = ciudades[Math.floor(Math.random() * ciudades.length)];
      setCurrentLocation(randomLocation);
      setShowPopup(true);
      
      // Ocultar el popup después de 5 segundos
      setTimeout(() => {
        setShowPopup(false);
      }, 5000);
    };

    // Mostrar el primer popup después de 20 segundos
    const initialTimeout = setTimeout(showRandomPopup, 20000);

    // Configurar el intervalo para mostrar popups cada 20 segundos
    const interval = setInterval(showRandomPopup, 20000);

    return () => {
      clearTimeout(initialTimeout);
      clearInterval(interval);
    };
  }, []);

  useEffect(() => {
    if (typeof window !== 'undefined') {
      // Definir fbq antes de cargar el script
      (window as any).fbq = (window as any).fbq || function() {
        ((window as any).fbq as any).queue = ((window as any).fbq as any).queue || [];
        ((window as any).fbq as any).version = '2.0';
        ((window as any).fbq as any).queue.push(arguments);
      };

      // Cargar el script solo si no existe
      if (!document.querySelector('script[src*="fbevents.js"]')) {
        const script = document.createElement('script');
        script.async = true;
        script.src = 'https://connect.facebook.net/en_US/fbevents.js';
        document.head.appendChild(script);
      }

      // Inicializar el pixel con el ID correcto
      ((window as any).fbq as any)('init', '2237381153298856');
      ((window as any).fbq as any)('track', 'PageView');
    }
  }, []);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Aquí iría la lógica de envío del formulario
    
    // Track Facebook Pixel Conversion
    if (typeof window !== 'undefined' && (window as any).fbq) {
      ((window as any).fbq as any)('track', 'Lead', {
        content_name: 'Webinar Agente IA',
        content_category: 'Webinar',
        value: 0,
        currency: 'USD'
      });
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white">
      <div className="container mx-auto px-4 py-8 md:py-16">
        {/* Hero Section */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-center mb-12 md:mb-24"
        >
          <h1 className="text-3xl md:text-5xl font-bold text-gray-900 mb-4 md:mb-6 px-2 md:px-8">
            Cómo Crear un Agente IA Conversacional para tu Negocio
            <span className="block text-neonGreen text-2xl md:text-3xl mt-2">(sin saber programar)</span>
          </h1>
          <div className="inline-block bg-neonGreen/10 px-4 md:px-6 py-2 rounded-full mb-4 md:mb-6">
            <p className="text-lg md:text-xl font-bold text-neonGreen">🚀 100% GRATUITO 🚀</p>
          </div>
          <p className="text-lg md:text-xl text-gray-600 mb-6 md:mb-8 px-4">
            ¿Te imaginás tener un asistente virtual que trabaje 24/7 por vos?
          </p>
          <p className="text-base md:text-lg text-gray-700 mb-8 md:mb-12 max-w-3xl mx-auto px-4">
            En este webinar <span className="font-bold text-neonGreen">100% gratuito</span> y en vivo, te enseño paso a paso cómo crear tu propio Agente IA conversacional, aunque no tengas experiencia técnica.
            Ideal para emprendedores, negocios, freelancers, y cualquier persona que quiera automatizar su atención al cliente de forma profesional.
          </p>
        </motion.div>

        {/* Registration Form */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="max-w-3xl mx-auto mb-12 md:mb-24"
          id="registration-form"
        >
          <div className="bg-white rounded-2xl shadow-lg border border-neonGreen/20 overflow-hidden">
            <div className="p-4 md:p-6">
              <iframe 
                src="https://docs.google.com/forms/d/e/1FAIpQLSer_lFzg5RP1-MHRwDh6IfPykRBmC2FFKmI2hL652kafYhspQ/viewform?embedded=true" 
                className="w-full h-[800px] md:h-[683px] border-0"
                title="Formulario de Registro"
                onLoad={() => {
                  if (typeof window !== 'undefined' && (window as any).fbq) {
                    // Track ViewContent
                    ((window as any).fbq as any)('track', 'ViewContent', {
                      content_name: 'Webinar Registration Form',
                      content_category: 'Webinar',
                      value: 0,
                      currency: 'USD'
                    });

                    // Configurar intervalo para verificar envío del formulario
                    const checkFormSubmission = setInterval(() => {
                      const iframe = document.querySelector('iframe');
                      if (iframe) {
                        try {
                          const formSubmitted = iframe.contentWindow?.document.querySelector('.freebirdFormviewerViewResponseConfirmationMessage');
                          if (formSubmitted) {
                            // Track Lead
                            ((window as any).fbq as any)('track', 'Lead', {
                              content_name: 'Webinar Registration Form',
                              content_category: 'Webinar',
                              value: 0,
                              currency: 'USD'
                            });
                            clearInterval(checkFormSubmission);
                          }
                        } catch (e) {
                          // Error de CORS, continuamos intentando
                        }
                      }
                    }, 1000);

                    return () => clearInterval(checkFormSubmission);
                  }
                }}
              >
                Cargando…
              </iframe>
            </div>
          </div>
        </motion.div>

        {/* What You'll Learn */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.3 }}
          className="max-w-3xl mx-auto mb-24 bg-white p-8 rounded-2xl shadow-lg border border-neonGreen/20"
        >
          <h2 className="text-3xl font-bold mb-8 flex items-center gap-2">
            <CheckCircle2 className="text-neonGreen" />
            ¿Qué vas a aprender?
          </h2>
          <ul className="space-y-4">
            <li className="flex items-start">
              <span className="text-neonGreen mr-2">✅</span>
              <span>Fundamentos clave sobre los Agentes IA</span>
            </li>
            <li className="flex items-start">
              <span className="text-neonGreen mr-2">✅</span>
              <span>Cómo preparar la información que usará el Agente</span>
            </li>
            <li className="flex items-start">
              <span className="text-neonGreen mr-2">✅</span>
              <span>Cómo crear e implementar tu Agente desde cero</span>
            </li>
            <li className="flex items-start">
              <span className="text-neonGreen mr-2">✅</span>
              <span>Cómo conectarlo con WhatsApp sin perder tu número</span>
            </li>
            <li className="flex items-start">
              <span className="text-neonGreen mr-2">✅</span>
              <span>Integraciones con redes sociales y e-commerce</span>
            </li>
            <li className="flex items-start">
              <span className="text-neonGreen mr-2">✅</span>
              <span>Cómo hacer seguimiento (follow-up) automático</span>
            </li>
            <li className="flex items-start">
              <span className="text-neonGreen mr-2">✅</span>
              <span>Cómo dar instrucciones claras al Agente</span>
            </li>
          </ul>
        </motion.div>

        {/* Details Section */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.4 }}
          className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-24"
        >
          <Card className="border-neonGreen/20 bg-white/50 backdrop-blur-sm">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Clock className="text-neonGreen" />
                Duración
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-lg">1 hora</p>
            </CardContent>
          </Card>
          <Card className="border-neonGreen/20 bg-white/50 backdrop-blur-sm">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Video className="text-neonGreen" />
                Modalidad
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-lg">En Vivo (y queda grabado)</p>
            </CardContent>
          </Card>
          <Card className="border-neonGreen/20 bg-white/50 backdrop-blur-sm">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Users className="text-neonGreen" />
                Incluye
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-lg">Soporte personalizado bonificado</p>
            </CardContent>
          </Card>
        </motion.div>

        {/* Target Audience */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.6 }}
          className="text-center mb-24 bg-neonGreen/5 py-12 px-6 rounded-2xl"
        >
          <h2 className="text-3xl font-bold mb-6">🎯 ¿Para quién es?</h2>
          <p className="text-xl text-gray-700 max-w-3xl mx-auto">
            Para cualquiera que tenga un negocio o emprendimiento y quiera automatizar su atención al cliente, mejorar sus procesos y tener su propio asistente virtual inteligente.
          </p>
        </motion.div>

        {/* Unique Value Section */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.7 }}
          className="max-w-4xl mx-auto mb-24"
        >
          <h2 className="text-3xl font-bold mb-12 text-center">💎 ¿Por qué este curso es diferente?</h2>
          
          <div className="bg-white rounded-2xl shadow-lg p-10 mb-10 border border-neonGreen/20">
            <p className="text-xl text-gray-700 mb-6">
              No es teoría. Es experiencia real, aplicada y probada.
            </p>
            <p className="text-lg text-gray-600 mb-6">
              A lo largo de los últimos años, ayudé a decenas de negocios a automatizar su atención al cliente, escalar sus ventas, y mejorar su operación usando Agentes IA conversacionales conectados con WhatsApp, redes sociales, tiendas online y CRMs.
            </p>
            <p className="text-lg text-gray-600">
              Conozco lo que funciona y lo que no, y en este webinar te voy a mostrar exactamente cómo lo hago yo, con ejemplos y casos reales.
              Nada de fórmulas mágicas, cursos genéricos o promesas vacías.
            </p>
          </div>

          <div className="bg-neonGreen/10 rounded-2xl shadow-lg p-10 mb-10 border border-neonGreen/20">
            <h3 className="text-2xl font-bold mb-6 text-center">💰 Valor real del contenido: +U$D 5000</h3>
            <p className="text-lg text-gray-700 mb-6">
              Este no es un simple webinar.
              Es un entrenamiento intensivo, concentrado en una hora, con herramientas que:
            </p>
            <ul className="space-y-4 text-lg text-gray-600">
              <li className="flex items-start">
                <span className="text-neonGreen mr-2">•</span>
                <span>Empresas pagan miles de dólares por implementar</span>
              </li>
              <li className="flex items-start">
                <span className="text-neonGreen mr-2">•</span>
                <span>Te permiten ahorrar tiempo, errores y meses de prueba y error</span>
              </li>
              <li className="flex items-start">
                <span className="text-neonGreen mr-2">•</span>
                <span>Incluyen soporte directo conmigo para ayudarte a implementarlo</span>
              </li>
            </ul>
            <div className="mt-8 p-6 bg-white rounded-xl text-center">
              <p className="text-2xl font-bold text-neonGreen mb-2">
                ¡Y LO MEJOR!
              </p>
              <p className="text-3xl font-bold text-neonGreen">
                ES 100% GRATUITO
              </p>
              <p className="text-lg text-gray-600 mt-4">
                Porque quiero que más personas puedan acceder a esta tecnología y transformen la manera en la que se conectan con sus clientes.
              </p>
            </div>
          </div>

          <div className="bg-white rounded-2xl shadow-lg p-10 text-center border border-neonGreen/20">
            <h3 className="text-2xl font-bold mb-6">🎯 Vos no necesitás aprender IA.</h3>
            <p className="text-xl text-gray-700 mb-4">
              Necesitás que funcione para tu negocio.
            </p>
            <p className="text-xl font-bold text-neonGreen">
              Y eso es lo que vas a lograr.
            </p>
          </div>
        </motion.div>

        {/* Video Section */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.8 }}
          className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-24"
        >
          <div className="relative w-full" style={{ paddingBottom: '56.25%' }}>
            <iframe
              className="absolute top-0 left-0 w-full h-full rounded-2xl shadow-lg"
              src="https://www.youtube.com/embed/PX5gijuwSUI"
              title="YouTube video player"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
            />
          </div>
          <div className="relative w-full" style={{ paddingBottom: '56.25%' }}>
            <iframe
              className="absolute top-0 left-0 w-full h-full rounded-2xl shadow-lg"
              src="https://www.youtube.com/embed/FCWdHrkJQCw"
              title="YouTube video player"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
            />
          </div>
        </motion.div>

        {/* FAQ Section */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.8 }}
          className="max-w-3xl mx-auto mb-24 bg-white p-10 rounded-2xl shadow-lg border border-neonGreen/20"
        >
          <h2 className="text-3xl font-bold mb-12 text-center">❓ Preguntas Frecuentes</h2>
          <Accordion type="single" collapsible className="w-full">
            <AccordionItem value="item-1">
              <AccordionTrigger>💬 ¿Necesito saber programar?</AccordionTrigger>
              <AccordionContent>
                No, para nada. Este webinar está pensado justamente para quienes no tienen conocimientos técnicos. Te muestro paso a paso cómo hacerlo fácil.
              </AccordionContent>
            </AccordionItem>
            <AccordionItem value="item-2">
              <AccordionTrigger>📱 ¿Puedo usar el agente en mi número de WhatsApp actual?</AccordionTrigger>
              <AccordionContent>
                Sí. Te enseño cómo conectarlo sin perder tu número ni violar las políticas de WhatsApp.
              </AccordionContent>
            </AccordionItem>
            <AccordionItem value="item-3">
              <AccordionTrigger>🛍 ¿Sirve para negocios online o ecommerce?</AccordionTrigger>
              <AccordionContent>
                Totalmente. Vas a ver cómo integrar el Agente con tiendas online, ya sea para responder preguntas, recomendar productos o generar ventas automáticas.
              </AccordionContent>
            </AccordionItem>
            <AccordionItem value="item-4">
              <AccordionTrigger>🎥 ¿Qué pasa si no puedo estar en el vivo?</AccordionTrigger>
              <AccordionContent>
                No hay problema. El webinar queda grabado y vas a poder verlo cuando quieras.
              </AccordionContent>
            </AccordionItem>
            <AccordionItem value="item-5">
              <AccordionTrigger>🙋 ¿Puedo hacer preguntas durante el webinar?</AccordionTrigger>
              <AccordionContent>
                ¡Claro! Es en vivo, así que vas a poder preguntar y te voy a responder en tiempo real.
              </AccordionContent>
            </AccordionItem>
            <AccordionItem value="item-6">
              <AccordionTrigger>🧩 ¿Esto me sirve si recién estoy empezando con mi emprendimiento?</AccordionTrigger>
              <AccordionContent>
                ¡Muchísimo! Vas a aprender desde cero y aplicar lo que veas desde el primer día.
              </AccordionContent>
            </AccordionItem>
            <AccordionItem value="item-7">
              <AccordionTrigger>💡 ¿Qué herramientas vamos a usar?</AccordionTrigger>
              <AccordionContent>
                Usamos plataformas sencillas y accesibles (muchas con versión gratuita). Te explico cómo configurarlas sin complicaciones.
              </AccordionContent>
            </AccordionItem>
            <AccordionItem value="item-8">
              <AccordionTrigger>🧠 ¿Qué tipo de cosas puede hacer un Agente IA?</AccordionTrigger>
              <AccordionContent>
                Desde responder mensajes en WhatsApp y redes, agendar citas, dar recomendaciones, enviar información personalizada, hacer seguimiento automático, ¡y mucho más!
              </AccordionContent>
            </AccordionItem>
            <AccordionItem value="item-9">
              <AccordionTrigger>⏱ ¿Cuánto tiempo me va a llevar implementarlo?</AccordionTrigger>
              <AccordionContent>
                Depende del nivel de personalización, pero con lo que vas a aprender, podrías tener tu agente funcionando en menos de 2 semanas.
              </AccordionContent>
            </AccordionItem>
            <AccordionItem value="item-10">
              <AccordionTrigger>🤝 ¿Incluye soporte después del webinar?</AccordionTrigger>
              <AccordionContent>
                Sí. Tenés acceso a soporte personalizado bonificado, para ayudarte a implementar lo que aprendiste con éxito.
              </AccordionContent>
            </AccordionItem>
          </Accordion>
        </motion.div>

        {/* LinkedIn Section */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.8 }}
          className="text-center mb-24 bg-neonGreen/5 py-12 px-6 rounded-2xl"
        >
          <h2 className="text-3xl font-bold mb-8">👨‍💻 Sobre el Instructor</h2>
          <div className="max-w-2xl mx-auto">
            <p className="text-xl text-gray-700 mb-8">
              Gino Gentile es un experto en desarrollo de software y automatización con IA. 
              Con más de 10 años de experiencia en el sector tecnológico, ha ayudado a numerosas empresas 
              a implementar soluciones de IA para mejorar sus procesos y atención al cliente.
            </p>
            <Button
              asChild
              className="bg-[#0077B5] hover:bg-[#0077B5]/90 text-white font-bold"
            >
              <a 
                href="https://www.linkedin.com/in/gino-gentile/" 
                target="_blank" 
                rel="noopener noreferrer"
                className="flex items-center gap-2"
              >
                <Linkedin className="w-5 h-5" />
                Ver perfil en LinkedIn
              </a>
            </Button>
          </div>
        </motion.div>

        {/* CTA */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 1 }}
          className="text-center bg-white p-10 rounded-2xl shadow-lg border border-neonGreen/20"
        >
          <div className="inline-block bg-neonGreen/10 px-6 py-2 rounded-full mb-6">
            <p className="text-xl font-bold text-neonGreen">🚀 100% GRATUITO 🚀</p>
          </div>
          <p className="text-xl font-bold mb-8">
            👉 Cupos limitados. ¡Registrate ahora y empezá a transformar tu negocio con IA!
          </p>
          <Button 
            className="bg-neonGreen hover:bg-neonGreen/90 text-gray-900 font-bold text-lg px-8 py-6"
            onClick={() => document.getElementById('registration-form')?.scrollIntoView({ behavior: 'smooth' })}
          >
            Registrarme Ahora
          </Button>
        </motion.div>
      </div>

      {/* Sticky Button */}
      <motion.div
        initial={{ opacity: 0, y: 100 }}
        animate={{ opacity: showStickyButton ? 1 : 0, y: showStickyButton ? 0 : 100 }}
        transition={{ duration: 0.3 }}
        className="fixed bottom-0 left-0 right-0 md:hidden z-[9999] bg-white shadow-lg"
      >
        <Button
          className="w-full rounded-none bg-neonGreen hover:bg-neonGreen/90 text-gray-900 font-bold text-lg py-6"
          onClick={() => {
            const form = document.getElementById('registration-form');
            if (form) {
              const yOffset = -20; // Ajuste para que no quede pegado al borde superior
              const y = form.getBoundingClientRect().top + window.pageYOffset + yOffset;
              window.scrollTo({ top: y, behavior: 'smooth' });
            }
          }}
        >
          Reservar mi lugar GRATIS
        </Button>
      </motion.div>

      {/* Notification Popup */}
      <AnimatePresence>
        {showPopup && (
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 50 }}
            transition={{ duration: 0.3 }}
            className="fixed bottom-4 right-4 z-[9999]"
          >
            <div className="bg-white rounded-lg shadow-lg p-4 max-w-xs border border-neonGreen/20">
              <div className="flex items-start justify-between">
                <p className="text-sm text-gray-700">
                  <span className="font-semibold text-neonGreen">¡Nueva reserva!</span> Alguien en {currentLocation.ciudad}, {currentLocation.pais} acaba de reservar su lugar.
                </p>
                <button
                  onClick={() => setShowPopup(false)}
                  className="ml-2 text-gray-400 hover:text-gray-600"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
} 