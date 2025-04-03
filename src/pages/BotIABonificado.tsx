// Actualización para forzar nuevo despliegue en Vercel - 2024
// Corrigiendo integración de widgets externos

import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { useEffect } from "react";
import { Helmet } from "react-helmet";
import { useNavigate } from "react-router-dom";
import { FaCalendarAlt, FaCog, FaGoogle, FaHeadset, FaRobot, FaWhatsapp, FaQuoteLeft } from "react-icons/fa";
import { HiOutlineDocumentReport } from "react-icons/hi";
import { SiGooglesheets } from "react-icons/si";
import { IoMdAnalytics } from "react-icons/io";
import { AiFillGift } from "react-icons/ai";
import { FaInstagram, FaFacebookMessenger, FaStar, FaBuilding, FaUserTie } from "react-icons/fa";
import ginoPhoto from "@/assets/1695825782350-5.jpeg";

const BotIABonificado = () => {
  const navigate = useNavigate();

  useEffect(() => {
    // Cargar solo el script de Stripe dinámicamente
    const stripeScript = document.createElement('script');
    stripeScript.src = 'https://js.stripe.com/v3/buy-button.js';
    stripeScript.async = true;
    document.body.appendChild(stripeScript);

    return () => {
      // Limpiar scripts al desmontar el componente
      if (document.body.contains(stripeScript)) {
        document.body.removeChild(stripeScript);
      }
    };
  }, []);

  return (
    <div className="flex flex-col min-h-screen">
      <Helmet>
        <title>Bot IA Bonificado | Builderia</title>
        <meta name="description" content="Implementación 100% bonificada de un bot con inteligencia artificial para tu negocio. Solo pagás la suscripción mensual de U$D 59." />
      </Helmet>

      {/* Hero Section */}
      <section className="bg-gradient-to-b from-indigo-900 to-purple-900 text-white py-16 md:py-24">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6">
              Automatizá tu Negocio con un Bot de Inteligencia Artificial
            </h1>
            <p className="text-xl md:text-2xl mb-8">
              <span className="bg-gradient-to-r from-emerald-400 to-teal-500 text-transparent bg-clip-text font-bold">
                Implementación 100% Bonificada
              </span>{" "}
              – Solo pagás la suscripción mensual de U$D 59
            </p>
            <Button 
              onClick={() => document.getElementById('precios')?.scrollIntoView({ behavior: 'smooth' })}
              size="lg" 
              className="bg-gradient-to-r from-emerald-500 to-teal-600 hover:from-emerald-600 hover:to-teal-700 text-white font-bold text-lg px-8 py-6"
            >
              Quiero mi Bot IA Ahora
            </Button>
          </div>
        </div>
      </section>

      {/* ¿Qué es esta propuesta? */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-3xl md:text-4xl font-bold text-center mb-8 text-gray-800">
              ¿Qué es esta propuesta?
            </h2>
            <p className="text-lg text-gray-700 mb-8">
              Te ofrecemos la oportunidad de implementar un bot con inteligencia artificial personalizado para tu negocio, con un enfoque 100% práctico: nosotros lo desarrollamos, lo conectamos a tus canales y te lo entregamos funcionando. Todo esto, sin costo de implementación, y solo con una suscripción mensual accesible.
            </p>
            
            <h3 className="text-xl font-semibold mb-4 text-gray-800">
              Ideal para negocios que quieren:
            </h3>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-8">
              <div className="bg-gray-50 p-4 rounded-lg border border-gray-200">
                <div className="flex items-center space-x-3">
                  <FaHeadset className="text-indigo-600 text-xl" />
                  <p className="font-medium text-gray-700">Automatizar atención al cliente</p>
                </div>
              </div>
              
              <div className="bg-gray-50 p-4 rounded-lg border border-gray-200">
                <div className="flex items-center space-x-3">
                  <FaCalendarAlt className="text-indigo-600 text-xl" />
                  <p className="font-medium text-gray-700">Agendar reuniones o turnos</p>
                </div>
              </div>
              
              <div className="bg-gray-50 p-4 rounded-lg border border-gray-200">
                <div className="flex items-center space-x-3">
                  <IoMdAnalytics className="text-indigo-600 text-xl" />
                  <p className="font-medium text-gray-700">Aumentar conversiones desde redes o publicidad</p>
                </div>
              </div>
              
              <div className="bg-gray-50 p-4 rounded-lg border border-gray-200">
                <div className="flex items-center space-x-3">
                  <FaRobot className="text-indigo-600 text-xl" />
                  <p className="font-medium text-gray-700">Tener respuestas automáticas 24/7 con información actualizada</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ¿Qué incluye el plan? */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-3xl md:text-4xl font-bold text-center mb-2 text-gray-800">
              ✅ ¿Qué incluye el plan?
            </h2>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-10">
              <Card className="p-6 hover:shadow-lg transition-shadow">
                <div className="flex flex-col h-full">
                  <div className="mb-4">
                    <FaCog className="text-4xl text-indigo-600 mb-2" />
                    <h3 className="text-xl font-bold text-gray-800">🔧 Implementación personalizada y lista para usar</h3>
                  </div>
                  <p className="text-gray-600 flex-grow">
                    Nos encargamos de crear y configurar el bot según tu negocio. Te lo entregamos funcionando y conectado.
                  </p>
                </div>
              </Card>
              
              <Card className="p-6 hover:shadow-lg transition-shadow">
                <div className="flex flex-col h-full">
                  <div className="mb-4">
                    <div className="flex gap-2">
                      <FaWhatsapp className="text-3xl text-green-600" />
                      <FaInstagram className="text-3xl text-pink-600" />
                      <FaFacebookMessenger className="text-3xl text-blue-600" />
                    </div>
                    <h3 className="text-xl font-bold text-gray-800">💬 Conexión con WhatsApp, Instagram, Facebook Messenger</h3>
                  </div>
                  <p className="text-gray-600 flex-grow">
                    Podés automatizar mensajes en tus canales favoritos sin complicarte.
                  </p>
                </div>
              </Card>
              
              <Card className="p-6 hover:shadow-lg transition-shadow">
                <div className="flex flex-col h-full">
                  <div className="mb-4">
                    <div className="flex gap-2">
                      <FaGoogle className="text-3xl text-blue-600" />
                      <FaCalendarAlt className="text-3xl text-teal-600" />
                    </div>
                    <h3 className="text-xl font-bold text-gray-800">📅 Integración con Google Calendar o Calendly</h3>
                  </div>
                  <p className="text-gray-600 flex-grow">
                    Ideal para negocios con turnos, visitas o reuniones. El bot gestiona las reservas por vos.
                  </p>
                </div>
              </Card>
              
              <Card className="p-6 hover:shadow-lg transition-shadow">
                <div className="flex flex-col h-full">
                  <div className="mb-4">
                    <SiGooglesheets className="text-4xl text-green-600 mb-2" />
                    <h3 className="text-xl font-bold text-gray-800">📄 Acceso y edición desde Google Sheets</h3>
                  </div>
                  <p className="text-gray-600 flex-grow">
                    Podés actualizar fácilmente la información que el bot utiliza (como precios, servicios o preguntas frecuentes) sin conocimientos técnicos.
                  </p>
                </div>
              </Card>
              
              <Card className="p-6 hover:shadow-lg transition-shadow">
                <div className="flex flex-col h-full">
                  <div className="mb-4">
                    <HiOutlineDocumentReport className="text-4xl text-indigo-600 mb-2" />
                    <h3 className="text-xl font-bold text-gray-800">📊 Panel con CRM, analíticas y gestión de conversaciones</h3>
                  </div>
                  <p className="text-gray-600 flex-grow">
                    Visualizá todos los chats, clientes y métricas en un solo lugar.
                  </p>
                </div>
              </Card>
              
              <Card className="p-6 hover:shadow-lg transition-shadow">
                <div className="flex flex-col h-full">
                  <div className="mb-4">
                    <FaHeadset className="text-4xl text-purple-600 mb-2" />
                    <h3 className="text-xl font-bold text-gray-800">🧑‍💻 Soporte post-entrega</h3>
                  </div>
                  <p className="text-gray-600 flex-grow">
                    Te ayudamos con los ajustes iniciales y estamos disponibles si necesitás cambios.
                  </p>
                </div>
              </Card>
            </div>
            
            <div className="mt-12 bg-gradient-to-r from-purple-100 to-indigo-100 p-6 rounded-xl border border-purple-200">
              <div className="flex items-start space-x-4">
                <AiFillGift className="text-4xl text-purple-600 flex-shrink-0 mt-1" />
                <div>
                  <h3 className="text-xl font-bold text-gray-800">💥 Bonificación exclusiva: 1 año de OpenAI incluido (U$D 240 Ahorro en 1 año)</h3>
                  <p className="text-gray-700 mt-2">
                    No tenés que pagar por el uso de la inteligencia artificial del bot durante el primer año.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Precios */}
      <section id="precios" className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="text-3xl md:text-4xl font-bold mb-8 text-gray-800">
              💸 ¿Cuánto cuesta?
            </h2>
            
            <div className="bg-gradient-to-br from-indigo-50 to-purple-50 p-8 rounded-2xl border border-indigo-100 mb-8">
              <div className="flex flex-col md:flex-row items-center md:justify-between mb-6 gap-4">
                <div className="text-4xl font-bold text-gray-800 text-center md:text-left">
                  Solo U$D 59 <span className="text-lg text-gray-600 font-normal">mensuales</span>
                </div>
                <div className="flex flex-col items-center">
                  <img 
                    src={ginoPhoto} 
                    alt="Gino" 
                    className="w-20 h-20 md:w-24 md:h-24 rounded-full object-cover border-2 border-indigo-500 mb-2"
                  />
                  <p className="text-sm text-gray-700 max-w-[180px] text-center">
                    Luego de pagar vas a reservar una reunión conmigo: Gino Gentile
                  </p>
                </div>
              </div>
              
              {/* Garantía de devolución de dinero */}
              <div className="flex items-center p-3 my-4 bg-emerald-50 border-l-4 border-emerald-500 rounded-r-md shadow-sm w-full">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-emerald-600 mr-3 flex-shrink-0" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                </svg>
                <span className="text-base md:text-lg font-bold text-emerald-800">Si no es lo que estás buscando, te devolvemos el 100% de tu dinero.</span>
              </div>
              
              <ul className="space-y-3 text-left mb-8">
                <li className="flex items-center">
                  <span className="text-green-500 mr-2 font-bold">✔</span>
                  <span>Sin costo de implementación (bonificado 100%)</span>
                </li>
                <li className="flex items-center">
                  <span className="text-green-500 mr-2 font-bold">✔</span>
                  <span>Sin tarifas ocultas</span>
                </li>
                <li className="flex items-center">
                  <span className="text-green-500 mr-2 font-bold">✔</span>
                  <span>Cancelás cuando quieras</span>
                </li>
              </ul>
              
              <div id="stripe-button-container" className="mt-6">
                {/* Stripe Button se insertará aquí mediante el script */}
                <div
                  dangerouslySetInnerHTML={{
                    __html: `
                    <stripe-buy-button
                      buy-button-id="buy_btn_1R9ma0JiEqCqEtc0FRxg61xJ"
                      publishable-key="pk_live_51QiEz0JiEqCqEtc0UWq2c5ZpvxcAZJmO1nYEsncRcrbvGInuj15YG9ifNoGaku3IOrP3zroytlDGAiSnYsQmVOEK00accjQ47O"
                    >
                    </stripe-buy-button>
                    `
                  }}
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Proceso */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-3xl md:text-4xl font-bold text-center mb-12 text-gray-800">
              ⚙️ ¿Cómo es el proceso?
            </h2>
            
            <div className="space-y-12">
              <div className="flex flex-col md:flex-row items-start gap-6">
                <div className="bg-indigo-600 text-white rounded-full w-12 h-12 flex items-center justify-center text-xl font-bold flex-shrink-0 md:mt-0">
                  1
                </div>
                <div>
                  <h3 className="text-xl font-bold text-gray-800 mb-2">Te suscribís por U$D 59</h3>
                  <p className="text-gray-600">
                    Con tu suscripción asegurás tu cupo para la implementación bonificada.
                  </p>
                </div>
              </div>
              
              <div className="flex flex-col md:flex-row items-start gap-6">
                <div className="bg-indigo-600 text-white rounded-full w-12 h-12 flex items-center justify-center text-xl font-bold flex-shrink-0 md:mt-0">
                  2
                </div>
                <div>
                  <h3 className="text-xl font-bold text-gray-800 mb-2">Reservás una reunión personalizada</h3>
                  <p className="text-gray-600">
                    Nos encontramos para entender tu negocio y definir el flujo del bot.
                  </p>
                </div>
              </div>
              
              <div className="flex flex-col md:flex-row items-start gap-6">
                <div className="bg-indigo-600 text-white rounded-full w-12 h-12 flex items-center justify-center text-xl font-bold flex-shrink-0 md:mt-0">
                  3
                </div>
                <div>
                  <h3 className="text-xl font-bold text-gray-800 mb-2">En 2 semanas, tenés el bot listo para usar</h3>
                  <p className="text-gray-600">
                    Tu bot estará funcionando y listo para integrarse en tus campañas, redes o sitio web.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Cupos limitados */}
      <section className="py-16 bg-gradient-to-br from-amber-50 to-orange-50">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="text-3xl md:text-4xl font-bold mb-6 text-gray-800">
              ⏳ Cupos limitados
            </h2>
            <p className="text-xl text-gray-700 mb-8">
              Esta oferta estará disponible hasta el 14 de abril o hasta agotar los 50 cupos disponibles. Una vez se llenen, volverá a precio completo y sin implementación bonificada.
            </p>
            <Button 
              onClick={() => document.getElementById('stripe-button-container')?.scrollIntoView({ behavior: 'smooth' })}
              size="lg" 
              className="bg-gradient-to-r from-amber-500 to-orange-600 hover:from-amber-600 hover:to-orange-700 text-white font-bold text-lg px-8 py-6"
            >
              Quiero asegurar mi cupo
            </Button>
          </div>
        </div>
      </section>

      {/* Call to Action */}
      <section className="py-16 bg-gradient-to-b from-indigo-900 to-purple-900 text-white">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="text-3xl md:text-4xl font-bold mb-6">
              🚀 ¿Querés sumarte?
            </h2>
            <p className="text-xl mb-8">
              Transformá tu forma de atender, vender y agendar en solo 2 semanas.
            </p>
            <Button 
              onClick={() => document.getElementById('stripe-button-container')?.scrollIntoView({ behavior: 'smooth' })}
              size="lg" 
              className="bg-gradient-to-r from-emerald-500 to-teal-600 hover:from-emerald-600 hover:to-teal-700 text-white font-bold text-lg px-8 py-6"
            >
              Implementá tu bot ahora
            </Button>
          </div>
        </div>
      </section>

      {/* Testimonios */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-3xl md:text-4xl font-bold text-center mb-12 text-gray-800">
              Lo que dicen nuestros clientes
            </h2>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {/* Testimonio 1 */}
              <div className="bg-white p-6 rounded-xl shadow-md">
                <div className="flex mb-4 text-amber-400">
                  <FaStar />
                  <FaStar />
                  <FaStar />
                  <FaStar />
                  <FaStar />
                </div>
                <div className="flex items-start mb-4">
                  <FaQuoteLeft className="text-indigo-200 text-4xl mr-4 mt-1" />
                  <div>
                    <p className="text-gray-700 mb-3">
                      <span className="font-semibold">En torno a la experiencia por mi parte fue una excelente experiencia</span>, siempre atento y comunicativo.
                    </p>
                    <p className="text-gray-700 mb-3">
                      En torno al servicio, quizá hay alguno puntos que requieren ampliarse pero en términos generales me parece bien.
                    </p>
                    <p className="text-gray-700">
                      <span className="font-semibold">Claro que si recomendaría trabajar con BuildersAI</span>, ya que su servicio de atención es muy bueno.
                    </p>
                  </div>
                </div>
                <div className="flex items-center mt-6">
                  <div className="w-10 h-10 bg-indigo-100 rounded-full flex items-center justify-center flex-shrink-0">
                    <FaBuilding className="text-indigo-600 text-lg" />
                  </div>
                  <div className="ml-4">
                    <h4 className="text-lg font-semibold text-gray-800">Deeter Salas</h4>
                    <p className="text-gray-600">DO-GROUP Consulting & Training</p>
                  </div>
                </div>
              </div>
              
              {/* Testimonio 2 */}
              <div className="bg-white p-6 rounded-xl shadow-md">
                <div className="flex mb-4 text-amber-400">
                  <FaStar />
                  <FaStar />
                  <FaStar />
                  <FaStar />
                  <FaStar />
                </div>
                <div className="flex items-start mb-4">
                  <FaQuoteLeft className="text-indigo-200 text-4xl mr-4 mt-1" />
                  <div>
                    <p className="text-gray-700 mb-3">
                      Mi experiencia con BuildersAI fue <span className="font-semibold">excelente</span>. Desde el primer momento, entendieron exactamente lo que necesitaba y lograron plasmarlo en un chatbot que no solo funciona bien, sino que también aporta valor a los usuarios.
                    </p>
                    <p className="text-gray-700 mb-3">
                      El servicio <span className="font-semibold">superó mis expectativas</span>. No solo por la calidad técnica del chatbot, sino también por el enfoque estratégico y la optimización que logramos en el proceso de tasaciones.
                    </p>
                    <p className="text-gray-700">
                      Definitivamente recomendaría trabajar con BuildersAI. Son profesionales, resolutivos y aportan ideas innovadoras que realmente marcan la diferencia. ¡Muy satisfecho con el resultado!
                    </p>
                  </div>
                </div>
                <div className="flex items-center mt-6">
                  <div className="w-10 h-10 bg-indigo-100 rounded-full flex items-center justify-center flex-shrink-0">
                    <FaUserTie className="text-indigo-600 text-lg" />
                  </div>
                  <div className="ml-4">
                    <h4 className="text-lg font-semibold text-gray-800">Daniel Bryn</h4>
                    <p className="text-gray-600">Consultor Inmobiliario</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default BotIABonificado; 