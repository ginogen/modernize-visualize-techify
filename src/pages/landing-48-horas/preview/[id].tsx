import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import { Accordion, AccordionItem, AccordionTrigger, AccordionContent } from "@/components/ui/accordion";
import { Button } from "@/components/ui/button";
import { Minus, Maximize2 } from "lucide-react";

const sugerenciasFromPrompt = (prompt: string) => {
  const sugerencias = [];
  if (/whatsapp|wa\b/i.test(prompt)) sugerencias.push("Integración con WhatsApp");
  if (/reservas|booking/i.test(prompt)) sugerencias.push("Reservas online");
  if (/e-?commerce|tienda|carrito/i.test(prompt)) sugerencias.push("E-commerce / Carrito de compras");
  if (/blog/i.test(prompt)) sugerencias.push("Blog / Noticias");
  if (/galería|fotos|imágenes/i.test(prompt)) sugerencias.push("Galería de imágenes");
  if (/seo/i.test(prompt)) sugerencias.push("Optimización SEO");
  if (/analytics|estadísticas/i.test(prompt)) sugerencias.push("Google Analytics / Estadísticas");
  if (/contacto|formulario/i.test(prompt)) sugerencias.push("Formulario de contacto");
  if (/mapa|ubicación/i.test(prompt)) sugerencias.push("Mapa de ubicación");
  if (/chatbot|ia/i.test(prompt)) sugerencias.push("Chatbot con IA");
  if (/notificaciones/i.test(prompt)) sugerencias.push("Notificaciones automáticas");
  if (/multi-?idioma|idiomas/i.test(prompt)) sugerencias.push("Multi-idioma");
  if (sugerencias.length === 0) sugerencias.push("Integración de funcionalidades personalizadas según tus necesidades");
  return sugerencias;
};

export default function PreviewLanding() {
  const { id } = useParams();
  const [loading, setLoading] = useState(true);
  const [lead, setLead] = useState<any>(null);
  const [error, setError] = useState("");
  const [minimizado, setMinimizado] = useState(false);

  useEffect(() => {
    if (!id || typeof id !== 'string') return;
    const fetchLead = async () => {
      setLoading(true);
      const { data, error } = await supabase.from("landing_leads").select("*", { head: false }).eq("id", id).single();
      if (error || !data) {
        setError("No se encontró el boceto.");
        setLoading(false);
        return;
      }
      setLead(data);
      setLoading(false);
    };
    fetchLead();
  }, [id]);

  if (loading) return <div className="min-h-screen flex items-center justify-center text-xl">Cargando boceto...</div>;
  if (error) return <div className="min-h-screen flex items-center justify-center text-red-500 text-xl">{error}</div>;
  if (!lead) return null;

  const sugerencias = sugerenciasFromPrompt(lead.prompt || "");

  return (
    <div className="min-h-screen bg-background relative">
      {/* Boceto a pantalla completa */}
      <div className="w-full min-h-screen">
        <div className="w-full min-h-screen" dangerouslySetInnerHTML={{ __html: lead.generated_code || "<div class='text-center text-gray-400 mt-20'>No hay boceto generado.</div>" }} />
      </div>
      {/* Modal flotante fijo */}
      {!minimizado ? (
        <div className="fixed bottom-6 right-6 z-50 w-[340px] max-w-full">
          <div className="bg-white rounded-2xl shadow-2xl p-6 border border-gray-200 flex flex-col gap-3 relative">
            <button onClick={() => setMinimizado(true)} className="absolute top-2 right-2 text-gray-400 hover:text-gray-700" title="Minimizar" aria-label="Minimizar">
              <Minus className="h-5 w-5" />
            </button>
            <p className="text-lg text-darkBlue font-semibold text-center">¿Te gustaría contratar este servicio de desarrollo en 48 horas o te devolvemos el dinero?</p>
            <Accordion type="single" collapsible className="w-full mb-2 mt-2">
              <AccordionItem value="tecnologias">
                <AccordionTrigger className="text-base text-gray-700 font-medium">Tecnologías y funciones que podríamos integrar</AccordionTrigger>
                <AccordionContent>
                  <ul className="text-base text-gray-700 list-disc pl-6 text-left">
                    {sugerencias.map((s, i) => <li key={i}>{s}</li>)}
                  </ul>
                </AccordionContent>
              </AccordionItem>
            </Accordion>
            <a href="https://wa.me/17864087985" target="_blank" rel="noopener noreferrer">
              <Button className="bg-green-500 hover:bg-green-600 text-white text-lg px-8 py-3 rounded-full shadow-lg w-full">Sí, me interesa</Button>
            </a>
            <p className="text-sm text-gray-700 mt-2 text-center">Esto es un boceto simple que nos sirve como punto de partida, luego conversaremos contigo para entender los detalles de tu negocio y realizar un desarrollo final profesional.</p>
            <span className="text-sm text-gray-500 mt-1 text-center">Hablarás con Gino</span>
          </div>
        </div>
      ) : (
        <button onClick={() => setMinimizado(false)} className="fixed bottom-6 right-6 z-50 bg-white border border-gray-200 rounded-full shadow-lg p-3 flex items-center gap-2 hover:bg-gray-100 transition-all" title="Mostrar información" aria-label="Restaurar modal">
          <Maximize2 className="h-5 w-5 text-neonGreen" />
          <span className="text-sm font-semibold text-darkBlue">Ver info</span>
        </button>
      )}
    </div>
  );
} 