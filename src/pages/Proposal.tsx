
import { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { CircuitBoard, Loader2, AlertTriangle } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

type Proposal = {
  id: string;
  client_name: string;
  client_email: string;
  service: string;
  scope: string;
  investment: string;
  status: string;
  created_at: string;
  slug: string;
};

const Proposal = () => {
  const [proposal, setProposal] = useState<Proposal | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const { slug } = useParams();

  useEffect(() => {
    if (slug) {
      fetchProposal(slug);
    }
  }, [slug]);

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
      
      setProposal(data);
    } catch (error: any) {
      console.error('Error fetching proposal:', error.message);
      setError("No se pudo encontrar la propuesta solicitada.");
    } finally {
      setLoading(false);
    }
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

  return (
    <div className="min-h-screen bg-background flex flex-col">
      <Header />
      
      <main className="flex-grow container mx-auto py-12 px-4">
        <div className="max-w-4xl mx-auto">
          <div className="mb-8 text-center">
            <div className="flex justify-center mb-4">
              <CircuitBoard className="text-neonGreen h-14 w-14 animate-pulse-soft" />
            </div>
            <h1 className="text-3xl font-bold mb-2">Propuesta para {proposal.client_name}</h1>
            <p className="text-lg text-foreground/70">{proposal.service}</p>
          </div>
          
          <div className="space-y-10">
            <section className="bg-card rounded-lg p-6 shadow-md border">
              <h2 className="text-2xl font-bold mb-4">Alcance de Funciones</h2>
              <div className="prose max-w-none dark:prose-invert">
                {proposal.scope.split('\n').map((paragraph, index) => (
                  <p key={index} className="mb-4">{paragraph}</p>
                ))}
              </div>
            </section>
            
            <section className="bg-card rounded-lg p-6 shadow-md border">
              <h2 className="text-2xl font-bold mb-4">Video Explicativo</h2>
              <div className="aspect-w-16 aspect-h-9">
                <div className="w-full h-0 pb-[56.25%] relative bg-black/5 rounded-md flex items-center justify-center">
                  <p className="absolute text-foreground/50">Video Demostrativo</p>
                </div>
              </div>
            </section>
            
            <section className="bg-card rounded-lg p-6 shadow-md border">
              <h2 className="text-2xl font-bold mb-4">Testimonios</h2>
              <div className="grid gap-6 md:grid-cols-2">
                <div className="bg-background p-4 rounded-md border">
                  <p className="italic mb-2">"El servicio superó todas nuestras expectativas. El equipo fue muy profesional y entregaron el proyecto antes de lo esperado."</p>
                  <p className="font-semibold">- Cliente Satisfecho</p>
                </div>
                <div className="bg-background p-4 rounded-md border">
                  <p className="italic mb-2">"Excelente trabajo. La comunicación fue fluida y el resultado final es exactamente lo que buscábamos."</p>
                  <p className="font-semibold">- Otro Cliente Feliz</p>
                </div>
              </div>
            </section>
            
            <section className="bg-card rounded-lg p-6 shadow-md border">
              <h2 className="text-2xl font-bold mb-4">Ejemplos de Proyectos</h2>
              <div className="grid gap-4 md:grid-cols-3">
                {[1, 2, 3].map((item) => (
                  <div key={item} className="bg-black/5 rounded-md aspect-video flex items-center justify-center">
                    <p className="text-foreground/50">Ejemplo {item}</p>
                  </div>
                ))}
              </div>
            </section>
            
            <section className="bg-card rounded-lg p-6 shadow-md border">
              <h2 className="text-2xl font-bold mb-4">Inversión</h2>
              <div className="p-6 bg-background rounded-md border text-center">
                <p className="text-3xl font-bold mb-2">{proposal.investment}</p>
                <p className="text-foreground/70">Inversión total para el proyecto</p>
              </div>
            </section>
            
            <div className="flex justify-center">
              <Link to="/onboarding">
                <Button size="lg" className="button-glow bg-neonGreen text-black hover:bg-neonGreen/80 font-mono text-lg">
                  Comenzar Ahora
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default Proposal;
