import { motion } from "framer-motion";
import { Play, Quote, Star } from "lucide-react";
import { useState } from "react";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";

interface VideoTestimonial {
  id: string;
  youtubeId: string;
  title: string;
  clientName: string;
  clientPosition: string;
  company: string;
  rating: number;
  thumbnail?: string;
  quote: string;
}

const VideoTestimonials = () => {
  const [activeVideo, setActiveVideo] = useState<string | null>(null);

  // Datos de ejemplo - puedes reemplazar con datos reales
  const testimonials: VideoTestimonial[] = [
    {
      id: "1",
      youtubeId: "dQw4w9WgXcQ", // Reemplaza con IDs reales de YouTube
      title: "Transformación Digital Completa",
      clientName: "María González",
      clientPosition: "CEO",
      company: "TechCorp Solutions",
      rating: 5,
      quote: "Builders AI revolucionó completamente nuestros procesos. La implementación fue perfecta y los resultados superaron nuestras expectativas."
    },
    {
      id: "2",
      youtubeId: "dQw4w9WgXcQ", // Reemplaza con IDs reales de YouTube
      title: "Automatización de Procesos",
      clientName: "Carlos Rodríguez",
      clientPosition: "CTO",
      company: "InnovateNow",
      rating: 5,
      quote: "La solución de IA que desarrollaron nos ahorró 40 horas semanales de trabajo manual. Increíble retorno de inversión."
    },
    {
      id: "3",
      youtubeId: "dQw4w9WgXcQ", // Reemplaza con IDs reales de YouTube
      title: "Chatbot Inteligente",
      clientName: "Ana Martínez",
      clientPosition: "Directora de Marketing",
      company: "GrowthLab",
      rating: 5,
      quote: "Nuestro chatbot ahora maneja el 80% de las consultas de clientes automáticamente. La satisfacción del cliente aumentó significativamente."
    }
  ];

  const fadeInUp = {
    initial: { opacity: 0, y: 60 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: 0.6 }
  };

  const staggerContainer = {
    animate: {
      transition: {
        staggerChildren: 0.2
      }
    }
  };

  const getYouTubeThumbnail = (videoId: string) => {
    return `https://img.youtube.com/vi/${videoId}/maxresdefault.jpg`;
  };

  const handleVideoPlay = (videoId: string) => {
    setActiveVideo(videoId);
  };

  const renderStars = (rating: number) => {
    return Array.from({ length: 5 }, (_, i) => (
      <Star
        key={i}
        className={`h-4 w-4 ${
          i < rating ? "text-yellow-400 fill-current" : "text-gray-300"
        }`}
      />
    ));
  };

  return (
    <section className="py-20 bg-gradient-to-br from-muted/20 to-background section-enhanced-bg">
      {/* Light background overlay */}
      <div className="absolute inset-0 light-bg-overlay"></div>
      
      {/* Floating shapes */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-32 left-32 w-40 h-40 bg-neonGreen/6 light-floating-shapes"></div>
        <div className="absolute bottom-32 right-32 w-32 h-32 bg-blue-400/6 light-floating-shapes"></div>
        <div className="absolute top-2/3 right-1/4 w-24 h-24 bg-purple-400/6 light-floating-shapes"></div>
      </div>
      
      {/* Enhanced particles effect */}
      <div className="absolute inset-0 light-particles">
        {[...Array(25)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-1 h-1 bg-yellow-400/20 rounded-full"
            initial={{ 
              x: Math.random() * (typeof window !== 'undefined' ? window.innerWidth : 1200), 
              y: Math.random() * (typeof window !== 'undefined' ? window.innerHeight : 600),
              opacity: 0,
              scale: 0
            }}
            animate={{ 
              opacity: [0, 0.6, 0],
              scale: [0, 1.5, 0],
              x: [null, Math.random() * 80 - 40],
              y: [null, Math.random() * -120 - 60]
            }}
            transition={{ 
              repeat: Infinity, 
              duration: Math.random() * 8 + 5,
              delay: Math.random() * 10,
              ease: "easeInOut"
            }}
          />
        ))}
      </div>

      <div className="container mx-auto px-4">
        <motion.div
          initial="initial"
          whileInView="animate"
          viewport={{ once: true }}
          variants={fadeInUp}
          className="text-center mb-16"
        >
          <Badge className="mb-4 bg-yellow-400/10 text-yellow-600 border-yellow-400/20">
            Video Testimonios
          </Badge>
          <h2 className="text-4xl md:text-5xl font-bold mb-6">
            Escucha a Nuestros <span className="text-neonGreen">Clientes</span>
          </h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            Descubre cómo hemos transformado negocios reales con nuestras soluciones de IA. 
            Testimonios auténticos de clientes satisfechos.
          </p>
        </motion.div>

        <motion.div
          initial="initial"
          whileInView="animate"
          viewport={{ once: true }}
          variants={staggerContainer}
          className="grid md:grid-cols-2 lg:grid-cols-3 gap-8"
        >
          {testimonials.map((testimonial, index) => (
            <motion.div key={testimonial.id} variants={fadeInUp}>
              <Card className="h-full hover:shadow-xl transition-all duration-300 border-0 bg-card/80 backdrop-blur-sm group hover:scale-105 overflow-hidden">
                <CardContent className="p-0">
                  {/* Video Thumbnail */}
                  <div className="relative aspect-video bg-gray-900 overflow-hidden">
                    {activeVideo === testimonial.youtubeId ? (
                      <iframe
                        src={`https://www.youtube.com/embed/${testimonial.youtubeId}?autoplay=1`}
                        title={testimonial.title}
                        className="w-full h-full"
                        frameBorder="0"
                        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                        allowFullScreen
                      />
                    ) : (
                      <>
                        <img
                          src={getYouTubeThumbnail(testimonial.youtubeId)}
                          alt={testimonial.title}
                          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                        />
                        <div className="absolute inset-0 bg-black/30 flex items-center justify-center group-hover:bg-black/20 transition-colors">
                          <button
                            onClick={() => handleVideoPlay(testimonial.youtubeId)}
                            className="w-16 h-16 bg-neonGreen/90 hover:bg-neonGreen rounded-full flex items-center justify-center transition-all duration-300 hover:scale-110"
                          >
                            <Play className="h-8 w-8 text-darkBlue ml-1" fill="currentColor" />
                          </button>
                        </div>
                      </>
                    )}
                  </div>

                  {/* Content */}
                  <div className="p-6">
                    {/* Rating */}
                    <div className="flex items-center mb-3">
                      {renderStars(testimonial.rating)}
                    </div>

                    {/* Quote */}
                    <div className="relative mb-4">
                      <Quote className="absolute -top-2 -left-2 h-6 w-6 text-neonGreen/30" />
                      <p className="text-muted-foreground italic pl-4">
                        "{testimonial.quote}"
                      </p>
                    </div>

                    {/* Client Info */}
                    <div className="border-t pt-4">
                      <h4 className="font-semibold text-foreground">{testimonial.clientName}</h4>
                      <p className="text-sm text-muted-foreground">{testimonial.clientPosition}</p>
                      <p className="text-sm font-medium text-neonGreen">{testimonial.company}</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </motion.div>

        {/* Call to Action */}
        <motion.div
          initial="initial"
          whileInView="animate"
          viewport={{ once: true }}
          variants={fadeInUp}
          className="text-center mt-16"
        >
          <p className="text-lg text-muted-foreground mb-6">
            ¿Quieres ser nuestro próximo caso de éxito?
          </p>
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="bg-neonGreen text-darkBlue px-8 py-4 rounded-lg font-semibold hover:bg-neonGreen/90 transition-colors button-glow"
          >
            Comenzar Mi Proyecto
          </motion.button>
        </motion.div>
      </div>
    </section>
  );
};

export default VideoTestimonials; 