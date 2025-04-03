import { useState, useEffect, useRef } from "react";
import { useParams, Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { 
  CircuitBoard, 
  Loader2, 
  AlertTriangle, 
  CheckCircle, 
  ArrowRight, 
  Calendar, 
  DollarSign, 
  Users, 
  Play,
  Smartphone,
  MessageSquare,
  Brain,
  Sliders,
  HeadsetIcon,
  Bell,
  Lock,
  Clock,
  CreditCard
} from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import VideoCarousel from "@/components/VideoCarousel";
import logo from "@/assets/logobuilders.png";

type Proposal = {
  id: string;
  client_name: string;
  client_email: string;
  service: string;
  scope: string;
  investment: string;
  investment_items?: string[];
  investment_currency?: string;
  status: string;
  created_at: string;
  slug: string;
  opened?: boolean;
  total_view_time?: number;
  payment_method?: string;
  monthly_subscription?: string;
  payment_schedule?: string;
  number_of_payments?: number;
};

const Proposal = () => {
  const [proposal, setProposal] = useState<Proposal | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [hoursCounter, setHoursCounter] = useState(0);
  const { slug } = useParams();
  
  const viewTimeInterval = useRef<number | null>(null);
  const startViewTime = useRef<number>(Date.now());
  const accumulatedTime = useRef<number>(0);
  const lastUpdateTime = useRef<number>(Date.now());

  useEffect(() => {
    if (slug) {
      fetchProposal(slug);
    }

    startViewTime.current = Date.now();
    lastUpdateTime.current = Date.now();
    
    viewTimeInterval.current = window.setInterval(() => {
      updateViewTime();
    }, 5000);

    return () => {
      if (viewTimeInterval.current) {
        clearInterval(viewTimeInterval.current);
      }
      updateViewTime(true);
    };
  }, [slug]);

  useEffect(() => {
    const handleVisibilityChange = () => {
      if (document.visibilityState === 'hidden') {
        updateViewTime();
      } else {
        startViewTime.current = Date.now();
        lastUpdateTime.current = Date.now();
      }
    };

    document.addEventListener('visibilitychange', handleVisibilityChange);
    
    return () => {
      document.removeEventListener('visibilitychange', handleVisibilityChange);
    };
  }, []);

  useEffect(() => {
    if (!loading && proposal) {
      if (proposal.opened === false) {
        markAsOpened();
      }
      
      const targetHours = 60;
      const duration = 2000;
      const frameDuration = 20;
      const frames = duration / frameDuration;
      const increment = targetHours / frames;
      let currentCount = 0;
      
      const timer = setInterval(() => {
        currentCount += increment;
        if (currentCount >= targetHours) {
          setHoursCounter(targetHours);
          clearInterval(timer);
        } else {
          setHoursCounter(Math.floor(currentCount));
        }
      }, frameDuration);
      
      return () => clearInterval(timer);
    }
  }, [loading, proposal]);

  const fetchProposal = async (proposalSlug: string) => {
    try {
      setLoading(true);
      setError("");
      
      const { data, error } = await supabase
        .from('proposals')
        .select('*')
        .eq('slug', proposalSlug)
        .single();
      
      if (error) {
        throw error;
      }
      
      if (data) {
        setProposal(data);
        
        if (data.total_view_time) {
          accumulatedTime.current = data.total_view_time;
        }
      } else {
        throw new Error('No proposal found with that slug');
      }
    } catch (error: any) {
      console.error('Error fetching proposal:', error.message);
      setError("No se pudo encontrar la propuesta solicitada.");
    } finally {
      setLoading(false);
    }
  };

  const markAsOpened = async () => {
    if (!proposal) return;
    
    try {
      const { error } = await supabase
        .from('proposals')
        .update({ opened: true })
        .eq('id', proposal.id);
      
      if (error) {
        console.error('Error marking proposal as opened:', error.message);
      } else {
        setProposal(prev => prev ? {...prev, opened: true} : null);
      }
    } catch (error: any) {
      console.error('Error marking proposal as opened:', error.message);
    }
  };

  const updateViewTime = async (isFinal = false) => {
    if (!proposal) return;
    
    const now = Date.now();
    const sessionTime = Math.floor((now - startViewTime.current) / 1000);
    
    if ((now - lastUpdateTime.current) > 300000 && !isFinal) {
      console.log("Long inactive period detected, not counting this time");
      startViewTime.current = now;
      lastUpdateTime.current = now;
      return;
    }
    
    const totalTime = accumulatedTime.current + sessionTime;
    
    console.log(`Updating view time: +${sessionTime}s, total: ${totalTime}s`);
    
    if (!isFinal) {
      startViewTime.current = now;
      lastUpdateTime.current = now;
      accumulatedTime.current = totalTime;
    }

    try {
      const { error } = await supabase
        .from('proposals')
        .update({ total_view_time: totalTime })
        .eq('id', proposal.id);
      
      if (error) {
        console.error('Error updating view time:', error.message);
      } else {
        setProposal(prev => prev ? {...prev, total_view_time: totalTime} : null);
      }
    } catch (error: any) {
      console.error('Error updating view time:', error.message);
    }
  };

  const formatCurrency = (currency: string, amount: string) => {
    const formattedAmount = amount.includes('.') ? amount.split('.')[0] : amount;
    
    if (currency === "$") {
      return (
        <>
          {currency} {formattedAmount}
          <div className="text-xs text-muted-foreground mt-1">(Pesos Argentinos)</div>
        </>
      );
    } else if (currency === "U$D") {
      return (
        <>
          {currency} {formattedAmount}
        </>
      );
    }
    return `${currency} ${formattedAmount}`;
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <Loader2 className="h-8 w-8 animate-spin mr-2" />
        <p>Cargando propuesta...</p>
      </div>
    );
  }

  if (error || !proposal) {
    return (
      <div className="min-h-screen bg-background flex flex-col items-center justify-center p-4">
        <AlertTriangle className="h-12 w-12 text-red-500 mb-4" />
        <h1 className="text-xl font-bold mb-2">Error</h1>
        <p className="text-center mb-6">{error}</p>
        <Link to="/">
          <Button>Volver al Inicio</Button>
        </Link>
      </div>
    );
  }

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('es-ES', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  const scopeItems = proposal?.scope.split('\n').filter(item => item.trim() !== '') || [];
  
  const paymentScheduleItems = proposal?.payment_schedule 
    ? proposal.payment_schedule.split('\n').filter(item => item.trim() !== '')
    : [];

  return (
    <div className="min-h-screen bg-gradient-to-b from-background to-accent/20 flex flex-col">
      <div className="w-full bg-background border-b sticky top-0 z-10">
        <div className="container mx-auto py-4 px-4 flex justify-between items-center">
          <Link to="/" className="flex items-center gap-2">
            <img src={logo} alt="Builders AI" className="h-10 w-auto" />
          </Link>
          <div className="flex items-center gap-2">
            <span className="text-sm font-medium hidden md:inline-block">Propuesta para {proposal?.client_name}</span>
            <span className="px-3 py-1 rounded-full text-xs font-medium bg-green-100 text-green-800">
              {proposal?.status || "Enviada"}
            </span>
          </div>
        </div>
      </div>

      <main className="flex-grow container mx-auto px-4 py-12">
        <div className="max-w-5xl mx-auto mb-16 text-center">
          <div className="inline-flex items-center justify-center p-2 bg-accent rounded-full mb-4">
            <CircuitBoard className="text-neonGreen h-6 w-6 mr-2" />
            <span className="text-sm font-medium">Propuesta Personalizada</span>
          </div>
          
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-4 bg-gradient-to-r from-primary to-green-400 bg-clip-text text-transparent">
            {proposal?.service}
          </h1>
          
          <p className="text-xl text-foreground/80 max-w-2xl mx-auto mb-8">
            Creado especialmente para <span className="font-bold">{proposal?.client_name}</span> para alcanzar sus objetivos de negocio.
          </p>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 max-w-3xl mx-auto">
            <div className="flex flex-col items-center p-4 rounded-lg border bg-background shadow-sm">
              <Calendar className="h-10 w-10 text-primary mb-2" />
              <h3 className="font-medium">Fecha</h3>
              <p className="text-sm text-foreground/70">{proposal && formatDate(proposal.created_at)}</p>
            </div>
            
            <div className="flex flex-col items-center p-4 rounded-lg border bg-background shadow-sm">
              <Clock className="h-10 w-10 text-primary mb-2" />
              <h3 className="font-medium">Ahorro de Horas</h3>
              <p className="text-2xl font-bold text-primary">+{hoursCounter}</p>
            </div>
            
            <div className="flex flex-col items-center p-4 rounded-lg border bg-background shadow-sm">
              <Users className="h-10 w-10 text-primary mb-2" />
              <h3 className="font-medium">Cliente</h3>
              <p className="text-sm text-foreground/70">{proposal?.client_name}</p>
            </div>
          </div>
        </div>

        <section className="max-w-4xl mx-auto mb-16">
          <div className="flex items-center mb-8">
            <div className="w-12 h-12 rounded-full flex items-center justify-center bg-primary/20 text-primary mr-4">
              <CheckCircle className="h-6 w-6" />
            </div>
            <h2 className="text-3xl font-bold">Alcance del Proyecto</h2>
          </div>
          
          <div className="bg-white dark:bg-darkBlue/40 rounded-xl p-8 shadow-lg border">
            <ul className="space-y-4">
              {scopeItems.map((item, index) => (
                <li key={index} className="flex">
                  <div className="mr-4 mt-1">
                    <div className="w-5 h-5 rounded-full bg-neonGreen flex items-center justify-center shadow-glow">
                      <CheckCircle className="h-3 w-3 text-background" />
                    </div>
                  </div>
                  <p className="flex-1">{item}</p>
                </li>
              ))}
            </ul>
          </div>
        </section>

        <section className="max-w-4xl mx-auto mb-16">
          <div className="flex items-center mb-8">
            <div className="w-12 h-12 rounded-full flex items-center justify-center bg-primary/20 text-primary mr-4">
              <CheckCircle className="h-6 w-6" />
            </div>
            <h2 className="text-3xl font-bold">Qué Incluye</h2>
          </div>
          
          <div className="bg-white dark:bg-darkBlue/40 rounded-xl p-8 shadow-lg border">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div className="flex">
                <div className="flex-shrink-0 mr-4">
                  <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center">
                    <Smartphone className="h-6 w-6 text-primary" />
                  </div>
                </div>
                <div>
                  <h3 className="font-bold text-lg mb-2">Integración Multiplataforma</h3>
                  <p className="text-foreground/80">
                    WhatsApp, Messenger, Instagram y Web: El bot estará disponible en las principales plataformas de mensajería y en el sitio web de la empresa.
                  </p>
                </div>
              </div>
              
              <div className="flex">
                <div className="flex-shrink-0 mr-4">
                  <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center">
                    <Brain className="h-6 w-6 text-primary" />
                  </div>
                </div>
                <div>
                  <h3 className="font-bold text-lg mb-2">Inteligencia Artificial y NLP</h3>
                  <p className="text-foreground/80">
                    Utilización de modelos avanzados de IA para interpretar consultas y entrenamiento personalizado con información de la empresa.
                  </p>
                </div>
              </div>
              
              <div className="flex">
                <div className="flex-shrink-0 mr-4">
                  <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center">
                    <Sliders className="h-6 w-6 text-primary" />
                  </div>
                </div>
                <div>
                  <h3 className="font-bold text-lg mb-2">Personalización del Tono</h3>
                  <p className="text-foreground/80">
                    Configuración de tono y estilo para que el bot responda de manera coherente con la identidad de la marca.
                  </p>
                </div>
              </div>
              
              <div className="flex">
                <div className="flex-shrink-0 mr-4">
                  <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center">
                    <HeadsetIcon className="h-6 w-6 text-primary" />
                  </div>
                </div>
                <div>
                  <h3 className="font-bold text-lg mb-2">Gestión de Atención al Cliente</h3>
                  <p className="text-foreground/80">
                    Automatización de consultas frecuentes, asistencia en procesos de venta y soporte técnico con escalado a agentes humanos.
                  </p>
                </div>
              </div>
              
              <div className="flex">
                <div className="flex-shrink-0 mr-4">
                  <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center">
                    <Bell className="h-6 w-6 text-primary" />
                  </div>
                </div>
                <div>
                  <h3 className="font-bold text-lg mb-2">Notificaciones y Seguimiento</h3>
                  <p className="text-foreground/80">
                    Envío de alertas proactivas sobre promociones y seguimiento del historial de interacciones para un servicio personalizado.
                  </p>
                </div>
              </div>
              
              <div className="flex">
                <div className="flex-shrink-0 mr-4">
                  <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center">
                    <Lock className="h-6 w-6 text-primary" />
                  </div>
                </div>
                <div>
                  <h3 className="font-bold text-lg mb-2">Seguridad y Privacidad</h3>
                  <p className="text-foreground/80">
                    Implementación de medidas para garantizar la confidencialidad y protección de la información, cumpliendo con regulaciones de datos.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section className="max-w-4xl mx-auto mb-16">
          <div className="flex items-center mb-8">
            <div className="w-12 h-12 rounded-full flex items-center justify-center bg-primary/20 text-primary mr-4">
              <Play className="h-6 w-6" />
            </div>
            <h2 className="text-3xl font-bold">Nuestra Solución</h2>
          </div>
          
          <div className="bg-white dark:bg-darkBlue/40 rounded-xl p-8 shadow-lg border">
            <div className="relative w-full aspect-video mx-auto overflow-hidden rounded-lg">
              <iframe 
                src="https://www.tella.tv/video/cm89ib26f00000al2fnttcdg4/embed?b=0&title=0&a=1&loop=0&t=0&muted=0&wt=0"
                className="absolute top-0 left-0 w-full h-full border-0"
                allowFullScreen 
                title="Propuesta Video"
              />
            </div>
          </div>
        </section>

        {proposal?.investment_items && proposal.investment_items.length > 0 && (
          <section className="max-w-4xl mx-auto mb-16">
            <div className="flex items-center mb-8">
              <div className="w-12 h-12 rounded-full flex items-center justify-center bg-primary/20 text-primary mr-4">
                <DollarSign className="h-6 w-6" />
              </div>
              <h2 className="text-3xl font-bold">Detalles de la Inversión</h2>
            </div>
            
            <div className="bg-white dark:bg-darkBlue/40 rounded-xl p-8 shadow-lg border">
              <ul className="space-y-4">
                {proposal.investment_items.map((item, index) => (
                  <li key={index} className="flex">
                    <div className="mr-4 mt-1">
                      <div className="w-5 h-5 rounded-full bg-neonGreen flex items-center justify-center shadow-glow">
                        <CheckCircle className="h-3 w-3 text-background" />
                      </div>
                    </div>
                    <p className="flex-1">{item}</p>
                  </li>
                ))}
              </ul>
            </div>
          </section>
        )}

        <section className="max-w-3xl mx-auto mb-16">
          <div className="bg-background rounded-xl shadow-xl border overflow-hidden">
            <div className="bg-gradient-to-r from-primary/20 to-primary/5 p-6 text-center">
              <h2 className="text-3xl font-bold mb-2">Inversión</h2>
              <p className="text-foreground/70">Un paso hacia el crecimiento de su negocio</p>
            </div>
            
            <div className="p-8">
              <div className="text-center mb-8">
                <p className="text-5xl font-bold mb-4">
                  {formatCurrency(proposal?.investment_currency || "$", proposal?.investment)}
                </p>
                <p className="text-foreground/70">Inversión total para implementar la solución completa</p>
              </div>
              
              {proposal?.payment_method && (
                <div className="mb-6 border-t pt-6">
                  <div className="flex items-center mb-3">
                    <CreditCard className="h-5 w-5 text-primary mr-2" />
                    <h3 className="text-lg font-semibold">Modalidad de Pago</h3>
                  </div>
                  <p>{proposal.payment_method}</p>
                </div>
              )}
              
              {paymentScheduleItems.length > 0 && (
                <div className="mb-6 border-t pt-6">
                  <div className="flex items-center mb-3">
                    <DollarSign className="h-5 w-5 text-primary mr-2" />
                    <h3 className="text-lg font-semibold">Detalle de Pagos</h3>
                  </div>
                  <ul className="space-y-2">
                    {paymentScheduleItems.map((item, index) => (
                      <li key={index} className="flex items-start">
                        <div className="mr-2 mt-1">
                          <div className="w-5 h-5 rounded-full bg-primary/10 flex items-center justify-center">
                            <span className="text-xs font-medium">{index + 1}</span>
                          </div>
                        </div>
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              )}
              
              {proposal?.monthly_subscription && (
                <div className="mb-6 border-t pt-6">
                  <div className="flex items-center mb-3">
                    <Clock className="h-5 w-5 text-primary mr-2" />
                    <h3 className="text-lg font-semibold">Suscripción Mensual</h3>
                  </div>
                  <p>{proposal.monthly_subscription}</p>
                </div>
              )}
              
              <ul className="space-y-3 text-left mb-8">
                <li className="flex items-center">
                  <CheckCircle className="h-5 w-5 text-neonGreen mr-2" />
                  <span>Desarrollo completo de la solución</span>
                </li>
                <li className="flex items-center">
                  <CheckCircle className="h-5 w-5 text-neonGreen mr-2" />
                  <span>Soporte técnico prioritario</span>
                </li>
                <li className="flex items-center">
                  <CheckCircle className="h-5 w-5 text-neonGreen mr-2" />
                  <span>Actualizaciones continuas</span>
                </li>
                <li className="flex items-center">
                  <CheckCircle className="h-5 w-5 text-neonGreen mr-2" />
                  <span>Capacitación para su equipo</span>
                </li>
              </ul>
              
              <div className="text-center">
                <Link to={`/onboarding?proposalId=${proposal?.id}&proposalSlug=${proposal?.slug}`}>
                  <Button size="lg" className="button-glow bg-neonGreen text-black hover:bg-neonGreen/90 font-semibold">
                    Aceptar Propuesta
                    <ArrowRight className="ml-2 h-5 w-5" />
                  </Button>
                </Link>
              </div>
            </div>
          </div>
        </section>

        <section className="max-w-4xl mx-auto mb-16">
          <div className="flex items-center mb-8">
            <div className="w-12 h-12 rounded-full flex items-center justify-center bg-primary/20 text-primary mr-4">
              <Play className="h-6 w-6" />
            </div>
            <h2 className="text-3xl font-bold">Casos Reales</h2>
          </div>
          
          <div className="mb-8">
            <p className="text-lg text-center mb-8">Ejemplos de soluciones similares que hemos implementado con otros clientes.</p>
            
            <VideoCarousel />
          </div>
        </section>

        <section className="max-w-4xl mx-auto text-center mb-16">
          <h2 className="text-3xl font-bold mb-6">Próximos Pasos</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="bg-background p-6 rounded-lg shadow-md border">
              <div className="w-12 h-12 rounded-full bg-primary/20 flex items-center justify-center mx-auto mb-4">
                <span className="text-primary font-bold text-xl">1</span>
              </div>
              <h3 className="font-bold text-lg mb-2">Aceptar Propuesta</h3>
              <p className="text-foreground/70">Para aceptar, haga click en el botón "Aceptar Propuesta" a continuación</p>
            </div>
            
            <div className="bg-background p-6 rounded-lg shadow-md border">
              <div className="w-12 h-12 rounded-full bg-primary/20 flex items-center justify-center mx-auto mb-4">
                <span className="text-primary font-bold text-xl">2</span>
              </div>
              <h3 className="font-bold text-lg mb-2">Pago Inicial y Onboarding</h3>
              <p className="text-foreground/70">Una vez recibido el pago inicial del 50%, se realiza onboarding y acceso a su Portal Cliente</p>
            </div>
            
            <div className="bg-background p-6 rounded-lg shadow-md border">
              <div className="w-12 h-12 rounded-full bg-primary/20 flex items-center justify-center mx-auto mb-4">
                <span className="text-primary font-bold text-xl">3</span>
              </div>
              <h3 className="font-bold text-lg mb-2">Desarrollo</h3>
              <p className="text-foreground/70">Comenzamos a trabajar en su solución personalizada</p>
            </div>
          </div>
        </section>
        
        <div className="max-w-3xl mx-auto text-center mb-16">
          <Link to={`/onboarding?proposalId=${proposal?.id}&proposalSlug=${proposal?.slug}`}>
            <Button size="lg" className="button-glow bg-neonGreen text-black hover:bg-neonGreen/90 font-semibold">
              Aceptar Propuesta
              <ArrowRight className="ml-2 h-5 w-5" />
            </Button>
          </Link>
          <p className="mt-4 text-foreground/70">¿Tiene preguntas? Contáctenos directamente</p>
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default Proposal;
