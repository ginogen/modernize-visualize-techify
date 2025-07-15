import { Clock, CheckCircle, Rocket, Zap, Star, ArrowRight } from "lucide-react";
import { motion } from "framer-motion";

const placas = [
  {
    text: "¡Tu web lista en 48 horas!",
    icon: <Clock className="h-10 w-10 text-neonGreen mb-4" />, 
    desc: "Garantía total o te devolvemos el dinero."
  },
  {
    text: "Impulsa tu negocio online",
    icon: <Rocket className="h-10 w-10 text-white mb-4" />, 
    desc: "Landing express, diseño profesional, IA y resultados rápidos."
  },
  {
    text: "¡Atrae más clientes YA!",
    icon: <Star className="h-10 w-10 text-yellow-400 mb-4" />, 
    desc: "Tu web lista para vender en tiempo récord."
  },
  {
    text: "¿Listo para destacar?",
    icon: <Zap className="h-10 w-10 text-orange-500 mb-4" />, 
    desc: "Diseños modernos, mobile first y con IA."
  },
  {
    text: "Garantía 48 horas",
    icon: <CheckCircle className="h-10 w-10 text-green-500 mb-4" />, 
    desc: "Si no entregamos, te devolvemos el 100%."
  },
  {
    text: "Transforma tu idea en web",
    icon: <ArrowRight className="h-10 w-10 text-neonGreen mb-4" />, 
    desc: "Describe tu proyecto y ve un boceto gratis."
  },
  {
    text: "¡Webs que venden!",
    icon: <Rocket className="h-10 w-10 text-purple-400 mb-4" />, 
    desc: "Landing pages optimizadas para captar clientes."
  },
  {
    text: "Desarrollo express",
    icon: <Clock className="h-10 w-10 text-yellow-500 mb-4" />, 
    desc: "Tu web lista en 48 horas, sin excusas."
  },
];

function Placa({ icon, text, desc, idx }: any) {
  return (
    <div className="relative w-[320px] h-[570px] rounded-3xl shadow-2xl flex flex-col items-center justify-center overflow-hidden font-sans">
      {/* Fondo gradiente */}
      <div className="absolute inset-0 bg-gradient-to-br from-darkBlue via-slate-900 to-black z-0" />
      {/* Cuadrícula */}
      <div className="absolute inset-0 bg-grid-pattern opacity-20 z-10" />
      {/* Partículas animadas */}
      <div className="absolute inset-0 z-20 pointer-events-none">
        {[...Array(30)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-1 h-1 bg-neonGreen/40 rounded-full"
            initial={{
              x: Math.random() * 320,
              y: Math.random() * 570,
              opacity: 0,
              scale: 0
            }}
            animate={{
              opacity: [0, 1, 0],
              scale: [0, 1, 0],
              y: [null, Math.random() * -100 - 50]
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
      {/* Contenido */}
      <div className="relative z-30 flex flex-col items-center justify-center h-full w-full px-4">
        {icon}
        <h2 className="text-2xl font-extrabold text-white drop-shadow mb-4 text-center font-sans" style={{ textShadow: "0 2px 8px #0008" }}>{text}</h2>
        <p className="text-lg text-white/80 text-center font-semibold mb-6 font-sans">{desc}</p>
      </div>
    </div>
  );
}

export default function Landing48HorasAds() {
  return (
    <div className="min-h-screen bg-black flex flex-col items-center py-8">
      <h1 className="text-3xl font-bold text-white mb-8 font-sans">Placas verticales para TikTok Ads</h1>
      <div className="flex flex-wrap gap-8 justify-center">
        {placas.map((p, i) => (
          <Placa key={i} {...p} idx={i} />
        ))}
      </div>
    </div>
  );
} 