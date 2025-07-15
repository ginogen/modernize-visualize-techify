import { useEffect, useState, useRef } from "react";
import { motion } from "framer-motion";
import { ArrowRight, CheckCircle, Clock, Star, Users, Zap, Shield, Globe, Code, BrainCircuit, Palette, Rocket, ChevronDown, Loader2, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { useToast } from "@/hooks/use-toast";
// 1. Importar Accordion de UI
import { Accordion, AccordionItem, AccordionTrigger, AccordionContent } from "@/components/ui/accordion";
import { supabase } from "@/integrations/supabase/client";
import { HexColorPicker } from "react-colorful";
import { useNavigate } from "react-router-dom";

const PALETAS = [
  { name: "Neón", value: "from-green-400 to-blue-500" },
  { name: "Oscuro", value: "from-gray-900 to-gray-700" },
  { name: "Pastel", value: "from-pink-200 to-yellow-200" },
  { name: "Minimalista", value: "from-white to-gray-100" },
  { name: "Vibrante", value: "from-orange-400 to-pink-500" },
];
const TIPOS = [
  { name: "Sans Serif (Inter)", value: "Inter, sans-serif" },
  { name: "Serif (Merriweather)", value: "Merriweather, serif" },
  { name: "Monospace (Fira Mono)", value: "Fira Mono, monospace" },
  { name: "Display (Montserrat)", value: "Montserrat, sans-serif" },
];

const COLORES_SUGERIDOS = [
  "#00e676", "#ff9800", "#2196f3", "#f50057", "#ffd600", "#673ab7", "#212121", "#fff", "#e91e63", "#607d8b"
];

const ESTILOS = [
  { name: "Moderno", value: "moderno" },
  { name: "Minimalista", value: "minimalista" },
  { name: "Vibrante", value: "vibrante" },
  { name: "Vintage", value: "vintage" },
  { name: "Elegante", value: "elegante" },
  { name: "Divertido", value: "divertido" },
  { name: "Tecnológico", value: "tecnológico" },
];

const initialForm = {
  nombre: "",
  email: "",
  whatsapp: "",
  ciudad: "",
  negocio: "",
};

const Landing48Horas = () => {
  // Prompt fields
  const [prompt, setPrompt] = useState("");
  const [mostrar, setMostrar] = useState("");
  const [paraQue, setParaQue] = useState("");
  // Colores seleccionados
  const [colorPrincipal, setColorPrincipal] = useState("#00e676");
  const [coloresSecundarios, setColoresSecundarios] = useState<string[]>([]);
  const [nuevoColorSecundario, setNuevoColorSecundario] = useState("#ffffff");
  const [estilo, setEstilo] = useState(ESTILOS[0].value);

  // Modal y datos de contacto
  const [showModal, setShowModal] = useState(false);
  const [form, setForm] = useState(initialForm);
  const [formError, setFormError] = useState("");

  // Boceto
  const [isGenerating, setIsGenerating] = useState(false);
  const [generatedCode, setGeneratedCode] = useState("");
  const [showBoceto, setShowBoceto] = useState(false);
  const { toast } = useToast();
  const [showPreviewModal, setShowPreviewModal] = useState(false);
  const navigate = useNavigate();

  const TIEMPO_TOTAL = 6000; // 6 segundos estimados
  const MENSAJES_LOADER = [
    "Analizando tu descripción y preferencias...",
    "Diseñando estructura y secciones...",
    "Aplicando paleta de colores y estilos...",
    "Generando HTML optimizado con Tailwind...",
    "¡Casi listo! Afinando detalles finales..."
  ];
  const [progreso, setProgreso] = useState(0);
  const [mensajeActual, setMensajeActual] = useState(MENSAJES_LOADER[0]);
  const [mensajeIdx, setMensajeIdx] = useState(0);
  const intervalRef = useRef<NodeJS.Timeout | null>(null);
  const timeoutRef = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  // Validar formulario modal
  const validateForm = () => {
    for (const key in form) {
      if (!form[key as keyof typeof form].trim()) {
        setFormError("Todos los campos son obligatorios");
        return false;
      }
    }
    setFormError("");
    return true;
  };

  // Lógica para abrir modal de datos
  const handleVerBoceto = () => {
    if (!prompt.trim()) {
      toast({
        title: "Completa el campo",
        description: "Por favor describe tu proyecto para generar el boceto.",
        variant: "destructive",
      });
      return;
    }
    setShowModal(true);
  };

  // 2. Guardar datos en Supabase
  const guardarLead = async (lead: any) => {
    await supabase.from("landing_leads").insert([lead]);
  };

  // Lógica para enviar a v0 y mostrar modal de preview
  const handleSubmitModal = async (e?: any) => {
    if (e) e.preventDefault();
    if (!validateForm()) return;
    setShowModal(false);
    setIsGenerating(true);
    setShowBoceto(false);
    setGeneratedCode("");
    setProgreso(0);
    setMensajeActual(MENSAJES_LOADER[0]);
    setMensajeIdx(0);
    if (intervalRef.current) clearInterval(intervalRef.current);
    if (timeoutRef.current) clearTimeout(timeoutRef.current);
    // Loader sincronizado
    const pasos = MENSAJES_LOADER.length;
    const pasoMs = Math.floor(TIEMPO_TOTAL / pasos);
    let progresoLocal = 0;
    intervalRef.current = setInterval(() => {
      setMensajeIdx((idx) => {
        if (idx < pasos - 1) {
          setMensajeActual(MENSAJES_LOADER[idx + 1]);
          return idx + 1;
        } else {
          setMensajeActual(MENSAJES_LOADER[pasos - 1]);
          return idx;
        }
      });
      setProgreso((prev) => {
        progresoLocal = prev + Math.floor(95 / (pasos - 1));
        if (progresoLocal >= 95) return 95;
        return progresoLocal;
      });
    }, pasoMs);
    // Guardar en Supabase
    const { data, error } = await supabase.from("landing_leads").insert([
      {
        ...form,
        prompt,
        color_principal: colorPrincipal,
        colores_secundarios: coloresSecundarios,
        estilo: estilo,
        fecha: new Date().toISOString(),
      }
    ]).select("id").single();
    if (error || !data?.id) {
      toast({ title: "Error", description: "No se pudo guardar el lead.", variant: "destructive" });
      setIsGenerating(false);
      if (intervalRef.current) clearInterval(intervalRef.current);
      if (timeoutRef.current) clearTimeout(timeoutRef.current);
      return;
    }
    const leadId = data.id;
    try {
      const apiKey = "v1:iUOb3hfItKewYif384kS8fSh:rDNgzPtCS2xU5EsqbT04AQli"; // <-- Pega aquí tu API Key
      const coloresTexto = `Color principal: ${colorPrincipal}. Colores secundarios: ${coloresSecundarios.length > 0 ? coloresSecundarios.join(", ") : "ninguno"}.`;
      const estiloTexto = `Estilo visual: ${ESTILOS.find(e => e.value === estilo)?.name || estilo}.`;
      const promptFinal = `Genera únicamente el HTML (sin explicaciones, sin repetir el prompt ni comentarios) de una landing page ${estiloTexto}\n\nDescripción: ${prompt}\n${coloresTexto}\n\nLa landing debe ser lo más completa posible y debe INCLUIR SIEMPRE: header, hero, secciones de productos/servicios, sobre nosotros, contacto y un footer completo con información de contacto, redes sociales y derechos de autor. El diseño debe ser siempre ${ESTILOS.find(e => e.value === estilo)?.name || estilo}, usar gradientes, algunos efectos de scroll y contener imágenes atractivas (pueden ser imágenes de ejemplo, placeholders o imágenes libres de derechos). Usa solo clases de TailwindCSS (asume que Tailwind ya está cargado en el sitio). No incluyas <script>, <style>, <html>, <head>, <body> ni enlaces externos. Solo el HTML principal con clases de Tailwind.`;
      const response = await fetch("https://api.v0.dev/v1/chat/completions", {
        method: "POST",
        headers: {
          "Authorization": `Bearer ${apiKey}`,
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          model: "v0-1.5-md",
          messages: [
            { role: "user", content: promptFinal }
          ]
        })
      });
      const dataV0 = await response.json();
      let html = dataV0.choices?.[0]?.message?.content || "";
      if (html.startsWith("```")) {
        html = html.replace(/```[a-zA-Z]*\n?/, "").replace(/```$/, "");
      }
      // Guardar el HTML generado en Supabase
      await supabase.from("landing_leads").update({ generated_code: html }).eq("id", leadId);
      // Al terminar, barra al 100% y loader desaparece tras breve delay
      setProgreso(100);
      setMensajeActual("¡Listo! Boceto generado.");
      if (intervalRef.current) clearInterval(intervalRef.current);
      timeoutRef.current = setTimeout(() => {
        setIsGenerating(false);
        navigate(`/landing-48-horas/preview/${leadId}`);
      }, 700);
    } catch (error) {
      toast({ title: "Error", description: "No se pudo generar el boceto. Intenta nuevamente.", variant: "destructive" });
      setIsGenerating(false);
      if (intervalRef.current) clearInterval(intervalRef.current);
      if (timeoutRef.current) clearTimeout(timeoutRef.current);
    }
  };

  // UI
  const fadeInUp = {
    initial: { opacity: 0, y: 60 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: 0.6 }
  };
  const staggerContainer = {
    animate: { transition: { staggerChildren: 0.1 } }
  };

  // Restaurar sugerencias en el return principal
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

  return (
    <div className="min-h-screen overflow-x-hidden bg-background">
      {isGenerating && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 backdrop-blur-sm">
          <div className="bg-white rounded-xl shadow-2xl p-8 w-full max-w-md flex flex-col items-center gap-6">
            <Loader2 className="h-12 w-12 text-neonGreen animate-spin mb-2" />
            <p className="text-lg font-semibold text-darkBlue text-center">{mensajeActual}</p>
            <div className="w-full bg-gray-200 rounded-full h-3 overflow-hidden">
              <div className="bg-neonGreen h-3 rounded-full transition-all duration-500" style={{ width: `${progreso}%` }} />
            </div>
            <p className="text-xs text-gray-400 mt-2">Esto puede tardar unos segundos...</p>
          </div>
        </div>
      )}
      <a
        href="https://wa.me/17864087985"
        target="_blank"
        rel="noopener noreferrer"
        className="fixed bottom-6 left-1/2 -translate-x-1/2 z-50"
        style={{ pointerEvents: isGenerating ? 'none' : 'auto' }}
      >
        <Button className="bg-neonGreen text-darkBlue hover:bg-neonGreen/90 font-bold text-lg px-8 py-4 rounded-full shadow-xl animate-bounce">
          Quiero mi landing
        </Button>
      </a>
      <Header />
      {/* Hero Section igual que antes */}
      <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
        {/* Enhanced Background Effects */}
        <div className="absolute inset-0 bg-gradient-to-br from-darkBlue via-slate-900 to-black"></div>
        <div className="absolute inset-0 hero-bg-overlay"></div>
        
        {/* Animated Grid Pattern */}
        <div className="absolute inset-0 bg-grid-pattern opacity-20"></div>
        
        {/* Floating Geometric Shapes */}
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute top-1/4 left-1/4 w-64 h-64 bg-neonGreen/5 rounded-full blur-3xl animate-pulse floating-shapes"></div>
          <div className="absolute top-3/4 right-1/4 w-96 h-96 bg-blue-500/5 rounded-full blur-3xl animate-pulse floating-shapes"></div>
          <div className="absolute bottom-1/4 left-1/3 w-48 h-48 bg-purple-500/5 rounded-full blur-3xl animate-pulse floating-shapes"></div>
        </div>
        
        {/* Dynamic Particles */}
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

        <div className="container mx-auto px-4 py-32 relative z-10">
          <div className="max-w-4xl mx-auto text-center">
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }} className="mb-6">
              <Badge className="bg-neonGreen/10 text-neonGreen border-neonGreen/20 px-4 py-2 text-sm font-mono">
                ⚡ Garantía 48 Horas
              </Badge>
            </motion.div>
            <motion.h1 initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8, delay: 0.2 }} className="text-5xl md:text-7xl font-bold mb-6 bg-gradient-to-r from-white via-white to-neonGreen bg-clip-text text-transparent leading-tight">
              Tu Landing/Web en <span className="text-neonGreen">48 Horas</span>
            </motion.h1>
            <motion.p initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8, delay: 0.4 }} className="text-xl md:text-2xl text-white/80 mb-8 max-w-3xl mx-auto leading-relaxed">
              Si no entregamos tu sitio web en 48 horas, <strong className="text-neonGreen">te devolvemos el 100% del dinero</strong>. Describe tu proyecto y ve un primer boceto ahora mismo.
            </motion.p>
            <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8, delay: 0.6 }} className="flex justify-center items-center mb-12">
              <Button size="lg" className="bg-neonGreen text-darkBlue hover:bg-neonGreen/90 font-semibold px-8 py-4 text-lg button-glow" onClick={() => document.getElementById('generator')?.scrollIntoView({ behavior: 'smooth' })}>
                Ver Mi Boceto Gratis <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
            </motion.div>
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 1, delay: 0.8 }} className="flex justify-center">
              <ChevronDown className="h-8 w-8 text-white/60 animate-bounce" />
            </motion.div>
          </div>
        </div>
      </section>

      {/* Generator Section */}
      <section id="generator" className="py-20 bg-background section-enhanced-bg">
        <div className="absolute inset-0 light-bg-overlay"></div>
        
        <div className="container mx-auto px-4">
          <motion.div initial="initial" whileInView="animate" viewport={{ once: true }} variants={fadeInUp} className="text-center mb-16">
            <Badge className="mb-4 bg-neonGreen/10 text-neonGreen border-neonGreen/20">
              <Palette className="h-4 w-4 mr-2" />
              Generador de Bocetos IA
            </Badge>
            <h2 className="text-4xl md:text-5xl font-bold mb-6">
              Describe tu proyecto y <span className="text-neonGreen">ve el resultado</span>
            </h2>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              Nuestra IA generará un primer boceto de tu sitio web basado en tu descripción y esto nos servira para entender rapidamente lo que estas buscando. Son bocetos incompletos que pueden contener errores, no te lleves por eso.
            </p>
          </motion.div>

          <div className="max-w-2xl mx-auto">
            <Card className="bg-card/50 backdrop-blur-sm border-0 shadow-xl">
              <CardContent className="p-8 space-y-6">
                <h3 className="text-2xl font-bold mb-6 text-neonGreen">Cuéntanos sobre tu proyecto</h3>
                <div>
                  <Label htmlFor="prompt" className="text-base font-semibold mb-3 block">Describe tu negocio, qué quieres mostrar y para qué lo necesitas</Label>
                  <Textarea id="prompt" placeholder="Ej: Necesito una web para mi restaurante italiano, mostrar menú, reservas online, fotos del local, captar más clientes..." value={prompt} onChange={e => setPrompt(e.target.value)} rows={7} className="text-base w-full min-w-[400px] max-w-full" style={{ minWidth: '400px', width: '100%' }} />
                </div>
                <div>
                  <Label className="text-base font-semibold mb-3 block">Color principal</Label>
                  <div className="flex items-center gap-4 mb-2 flex-wrap">
                    {COLORES_SUGERIDOS.map((c) => (
                      <button key={c} type="button" className={`w-8 h-8 rounded-full border-2 ${colorPrincipal === c ? 'border-neonGreen ring-2 ring-neonGreen' : 'border-gray-300'}`} style={{ background: c }} onClick={() => setColorPrincipal(c)} aria-label={`Elegir color ${c}`}></button>
                    ))}
                    <span className="text-base ml-2">{colorPrincipal}</span>
                  </div>
                  <div className="max-w-xs mb-4">
                    <HexColorPicker color={colorPrincipal} onChange={setColorPrincipal} />
                  </div>
                  <Label className="text-base font-semibold mb-3 block mt-4">Colores secundarios (opcional)</Label>
                  <div className="flex items-center gap-2 mb-2 flex-wrap">
                    {coloresSecundarios.map((c, i) => (
                      <div key={i} className="flex items-center gap-1">
                        <span className="w-8 h-8 rounded-full border-2 border-gray-300" style={{ background: c }}></span>
                        <button type="button" className="text-red-500 ml-1" onClick={() => setColoresSecundarios(coloresSecundarios.filter((_, idx) => idx !== i))}>×</button>
                      </div>
                    ))}
                    <HexColorPicker color={nuevoColorSecundario} onChange={setNuevoColorSecundario} />
                    <Button type="button" size="sm" onClick={() => {
                      if (!coloresSecundarios.includes(nuevoColorSecundario)) setColoresSecundarios([...coloresSecundarios, nuevoColorSecundario]);
                    }}>Agregar</Button>
                  </div>
                  {/* Vista previa de combinación de colores */}
                  <div className="flex items-center gap-4 mt-4">
                    <div className="w-32 h-10 rounded-lg border flex items-center justify-center" style={{ background: colorPrincipal, color: '#fff', fontWeight: 600 }}>Header</div>
                    {coloresSecundarios.map((c, i) => (
                      <div key={i} className="w-10 h-10 rounded-full border-2 border-gray-300" style={{ background: c }}></div>
                    ))}
                  </div>
                </div>
                <div>
                  <Label className="text-base font-semibold mb-3 block mt-4">Estilo visual</Label>
                  <div className="flex gap-2 flex-wrap mb-4">
                    {ESTILOS.map(e => (
                      <Button key={e.value} type="button" variant={estilo === e.value ? "default" : "outline"} className={estilo === e.value ? "ring-2 ring-neonGreen" : ""} onClick={() => setEstilo(e.value)}>{e.name}</Button>
                    ))}
                  </div>
                </div>
                <Button onClick={handleVerBoceto} disabled={isGenerating} className="w-full bg-neonGreen text-darkBlue hover:bg-neonGreen/90 font-semibold py-3 text-lg">
                  {isGenerating ? (<><Loader2 className="mr-2 h-5 w-5 animate-spin" />Generando boceto...</>) : (<>Ver Boceto <BrainCircuit className="ml-2 h-5 w-5" /></>)}
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Modal de datos de contacto */}
      {showModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm">
          <form onSubmit={handleSubmitModal} className="bg-white rounded-xl shadow-xl p-8 w-full max-w-md relative">
            <button type="button" className="absolute top-4 right-4 text-gray-400 hover:text-gray-700" onClick={() => setShowModal(false)}>
              <X className="h-6 w-6" />
            </button>
            <h2 className="text-2xl font-bold mb-6 text-darkBlue">Completa tus datos para ver el boceto</h2>
            <div className="space-y-4">
              <div>
                <Label>Nombre y Apellido</Label>
                <Input value={form.nombre} onChange={e => setForm(f => ({ ...f, nombre: e.target.value }))} required />
              </div>
              <div>
                <Label>Email</Label>
                <Input type="email" value={form.email} onChange={e => setForm(f => ({ ...f, email: e.target.value }))} required />
              </div>
              <div>
                <Label>Whatsapp</Label>
                <Input value={form.whatsapp} onChange={e => setForm(f => ({ ...f, whatsapp: e.target.value }))} required />
              </div>
              <div>
                <Label>Ciudad</Label>
                <Input value={form.ciudad} onChange={e => setForm(f => ({ ...f, ciudad: e.target.value }))} required />
              </div>
              <div>
                <Label>Nombre del Negocio</Label>
                <Input value={form.negocio} onChange={e => setForm(f => ({ ...f, negocio: e.target.value }))} required />
              </div>
              {formError && <p className="text-red-500 text-sm">{formError}</p>}
              <Button type="submit" className="w-full bg-neonGreen text-darkBlue hover:bg-neonGreen/90 font-semibold py-3 text-lg" disabled={isGenerating}>
                {isGenerating ? (<><Loader2 className="mr-2 h-5 w-5 animate-spin" />Generando boceto...</>) : (<>Ver Boceto</>)}
              </Button>
            </div>
          </form>
        </div>
      )}

      {/* Modal de vista previa del boceto */}
      {showPreviewModal && showBoceto && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-sm">
          <div className="bg-white rounded-xl shadow-2xl p-4 w-full max-w-5xl relative flex flex-col items-center">
            <button type="button" className="absolute top-4 right-4 text-gray-400 hover:text-gray-700" onClick={() => setShowPreviewModal(false)}>
              <X className="h-8 w-8" />
            </button>
            <h2 className="text-2xl font-bold mb-4 text-darkBlue">Vista previa del boceto generado</h2>
            <div className="w-full h-[80vh] max-h-[700px] overflow-y-auto border rounded-lg bg-gray-50 p-4">
              <div className="w-full" dangerouslySetInnerHTML={{ __html: generatedCode }} />
            </div>
            <div className="w-full flex flex-col items-center mt-6 gap-3">
              <p className="text-lg text-darkBlue font-semibold text-center">¿Te gustaría contratar este servicio de desarrollo en 48 horas o te devolvemos el dinero?</p>
              {/* Listado de tecnologías y funciones sugeridas como acordeón */}
              <Accordion type="single" collapsible className="w-full max-w-lg mb-2 mt-2">
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
                <Button className="bg-green-500 hover:bg-green-600 text-white text-lg px-8 py-3 rounded-full shadow-lg">Sí, me interesa</Button>
              </a>
              <span className="text-sm text-gray-500 mt-1">Hablarás con Gino</span>
            </div>
            <p className="text-center text-muted-foreground mt-4">Este es solo un boceto inicial generado por IA. Nos contactaremos contigo para definir detalles y personalizar tu web.</p>
          </div>
        </div>
      )}

      {/* Benefits Section */}
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
              <Shield className="h-4 w-4 mr-2" />
              Garantías y Beneficios
            </Badge>
            <h2 className="text-4xl md:text-5xl font-bold mb-6">
              ¿Por qué elegir nuestro <span className="text-neonGreen">servicio express</span>?
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
                icon: <Clock className="h-8 w-8" />,
                title: "Entrega en 48 Horas",
                description: "Tu sitio web listo y funcionando en máximo 48 horas o te devolvemos tu dinero",
                color: "text-neonGreen"
              },
              {
                icon: <Shield className="h-8 w-8" />,
                title: "Garantía Total",
                description: "100% de garantía de satisfacción. Si no cumplimos, recuperas tu inversión completa",
                color: "text-blue-400"
              },
              {
                icon: <Zap className="h-8 w-8" />,
                title: "Tecnología Avanzada",
                description: "Usando IA y las mejores prácticas para crear sitios web modernos y optimizados",
                color: "text-purple-400"
              },
              {
                icon: <Users className="h-8 w-8" />,
                title: "Equipo Experto",
                description: "Desarrolladores con años de experiencia trabajando en modo express para ti",
                color: "text-green-400"
              },
              {
                icon: <Code className="h-8 w-8" />,
                title: "Código Limpio",
                description: "Sitios web optimizados para velocidad, SEO y compatibilidad con todos los dispositivos",
                color: "text-orange-400"
              },
              {
                icon: <Globe className="h-8 w-8" />,
                title: "Hosting Incluido",
                description: "Tu sitio web estará online inmediatamente con hosting gratuito por 3 meses",
                color: "text-cyan-400"
              }
            ].map((benefit, index) => (
              <motion.div
                key={index}
                variants={fadeInUp}
              >
                <Card className="h-full bg-card/50 backdrop-blur-sm border-border/50 hover:border-neonGreen/30 transition-all duration-300 hover:shadow-lg hover:shadow-neonGreen/10">
                  <CardContent className="p-6">
                    <div className={`inline-flex items-center justify-center w-12 h-12 bg-neonGreen/10 rounded-lg mb-4 ${benefit.color}`}>
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

      {/* Process Section */}
      <section className="py-20 bg-background section-enhanced-bg">
        <div className="absolute inset-0 light-bg-overlay"></div>
        
        <div className="container mx-auto px-4">
          <motion.div
            initial="initial"
            whileInView="animate"
            viewport={{ once: true }}
            variants={fadeInUp}
            className="text-center mb-16"
          >
            <Badge className="mb-4 bg-purple-500/10 text-purple-400 border-purple-500/20">
              <Rocket className="h-4 w-4 mr-2" />
              Proceso Express
            </Badge>
            <h2 className="text-4xl md:text-5xl font-bold mb-6">
              De la idea al <span className="text-neonGreen">sitio web</span> en 3 pasos
            </h2>
          </motion.div>

          <motion.div
            initial="initial"
            whileInView="animate"
            viewport={{ once: true }}
            variants={staggerContainer}
            className="max-w-4xl mx-auto"
          >
            <div className="grid md:grid-cols-3 gap-8">
              {[
                {
                  step: "1",
                  title: "Describes tu proyecto",
                  description: "Nos cuentas qué necesitas y vemos tu boceto inicial",
                  time: "5 minutos"
                },
                {
                  step: "2", 
                  title: "Desarrollamos tu sitio",
                  description: "Nuestro equipo crea tu sitio web personalizado",
                  time: "24-48 horas"
                },
                {
                  step: "3",
                  title: "Sitio web listo",
                  description: "Recibes tu sitio web funcionando y online",
                  time: "Inmediato"
                }
              ].map((step, index) => (
                <motion.div
                  key={index}
                  variants={fadeInUp}
                  className="text-center relative"
                >
                  <div className="inline-flex items-center justify-center w-16 h-16 bg-neonGreen text-darkBlue rounded-full font-bold text-xl mb-6">
                    {step.step}
                  </div>
                  <h3 className="text-xl font-bold mb-4">{step.title}</h3>
                  <p className="text-muted-foreground mb-2">{step.description}</p>
                  <Badge variant="outline" className="text-xs">
                    <Clock className="h-3 w-3 mr-1" />
                    {step.time}
                  </Badge>
                  {index < 2 && (
                    <div className="hidden md:block absolute top-8 left-full w-full h-0.5 bg-gradient-to-r from-neonGreen to-transparent"></div>
                  )}
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </section>

      {/* Testimonials Section */}
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
            <Badge className="mb-4 bg-yellow-500/10 text-yellow-400 border-yellow-500/20">
              <Star className="h-4 w-4 mr-2" />
              Testimonios
            </Badge>
            <h2 className="text-4xl md:text-5xl font-bold mb-6">
              Clientes que confiaron en nuestro <span className="text-neonGreen">servicio express</span>
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
                name: "María González",
                business: "Restaurante La Nonna",
                text: "Increíble! En 36 horas tenía mi sitio web con sistema de reservas funcionando. Mis ventas aumentaron 40%.",
                rating: 5
              },
              {
                name: "Carlos Ruiz",
                business: "Estudio Jurídico Ruiz & Asociados",
                text: "Necesitaba urgente una web profesional para mi estudio. Cumplieron en tiempo record y con calidad excepcional.",
                rating: 5
              },
              {
                name: "Ana Martín",
                business: "Boutique Fashion",
                text: "El boceto inicial me encantó y el resultado final superó mis expectativas. Definitivamente recomiendo el servicio.",
                rating: 5
              }
            ].map((testimonial, index) => (
              <motion.div
                key={index}
                variants={fadeInUp}
              >
                <Card className="h-full bg-card/50 backdrop-blur-sm border-0 shadow-xl">
                  <CardContent className="p-6">
                    <div className="flex items-center mb-4">
                      {[...Array(testimonial.rating)].map((_, i) => (
                        <Star key={i} className="h-4 w-4 text-yellow-400 fill-current" />
                      ))}
                    </div>
                    <p className="text-muted-foreground mb-4 italic">"{testimonial.text}"</p>
                    <div>
                      <p className="font-semibold">{testimonial.name}</p>
                      <p className="text-sm text-muted-foreground">{testimonial.business}</p>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Final CTA Section */}
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
              ¿Listo para tener tu sitio web en <span className="text-neonGreen">48 horas</span>?
            </h2>
            <p className="text-xl text-white/80 mb-8 max-w-2xl mx-auto">
              No esperes más. Describe tu proyecto ahora y ve cómo podemos transformar tu idea en realidad en tiempo record.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button 
                size="lg" 
                className="bg-neonGreen text-darkBlue hover:bg-neonGreen/90 font-semibold px-8 py-4 text-lg button-glow"
                onClick={() => document.getElementById('generator')?.scrollIntoView({ behavior: 'smooth' })}
              >
                Generar Mi Boceto Gratis
              </Button>
              <Button 
                size="lg" 
                variant="outline"
                className="border-white text-white hover:bg-white hover:text-darkBlue px-8 py-4 text-lg"
                onClick={() => window.open('https://calendar.app.google/XXwTHc1qvikRrd2f6', '_blank')}
              >
                Hablar con un Experto
              </Button>
            </div>
            
            <div className="mt-8 p-4 bg-white/10 backdrop-blur-sm rounded-lg border border-white/20 inline-block">
              <p className="text-sm">
                <strong>Garantía 100%:</strong> Si no entregamos en 48 horas, te devolvemos todo tu dinero.
              </p>
            </div>
          </motion.div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default Landing48Horas; 