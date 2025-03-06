
import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowLeft, ArrowRight, Quote } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useLanguage } from "@/contexts/LanguageContext";

interface Testimonial {
  id: number;
  name: string;
  position: string;
  company: string;
  avatar: string;
  quote: string;
}

const Testimonials = () => {
  const [activeIndex, setActiveIndex] = useState(0);
  const [autoplay, setAutoplay] = useState(true);
  const { t } = useLanguage();

  const testimonials: Testimonial[] = [
    {
      id: 1,
      name: "Sarah Johnson",
      position: "CTO",
      company: "TechLife Solutions",
      avatar: "https://randomuser.me/api/portraits/women/1.jpg",
      quote: "Builders AI delivered a custom chatbot that revolutionized our customer service. Their team's expertise in AI and natural language processing was evident throughout the project. The bot now handles 80% of inquiries automatically, leading to significant cost savings."
    },
    {
      id: 2,
      name: "Michael Chen",
      position: "Director of Digital",
      company: "Global Retail Inc.",
      avatar: "https://randomuser.me/api/portraits/men/2.jpg",
      quote: "Our e-commerce platform needed a major upgrade to handle increasing customer demand. Builders AI developed a scalable solution that not only improved performance but also added intelligent features like personalized recommendations. Sales increased by 42% in the first quarter after launch."
    },
    {
      id: 3,
      name: "Emma Rodriguez",
      position: "CEO",
      company: "HealthTrack Systems",
      avatar: "https://randomuser.me/api/portraits/women/3.jpg", 
      quote: "Working with Builders AI to develop our patient management system was an excellent decision. They understood the unique challenges in healthcare and delivered a secure, compliant solution. The AI-powered scheduling and reminder system has reduced no-shows by 63%."
    }
  ];

  useEffect(() => {
    let interval: number;
    
    if (autoplay) {
      interval = window.setInterval(() => {
        setActiveIndex(prevIndex => 
          prevIndex === testimonials.length - 1 ? 0 : prevIndex + 1
        );
      }, 5000);
    }
    
    return () => {
      if (interval) clearInterval(interval);
    };
  }, [autoplay, testimonials.length]);

  const handlePrev = () => {
    setAutoplay(false);
    setActiveIndex(prevIndex => 
      prevIndex === 0 ? testimonials.length - 1 : prevIndex - 1
    );
  };

  const handleNext = () => {
    setAutoplay(false);
    setActiveIndex(prevIndex => 
      prevIndex === testimonials.length - 1 ? 0 : prevIndex + 1
    );
  };

  return (
    <section className="section-padding bg-gradient-to-b from-darkBlue to-background">
      <div className="container mx-auto">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: true }}
            className="text-sm md:text-base font-medium px-4 py-2 rounded-full bg-neonGreen/10 text-neonGreen inline-block mb-4"
          >
            {t("testimonials.title")}
          </motion.p>
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            viewport={{ once: true }}
            className="text-3xl md:text-4xl font-mono font-bold mb-6"
          >
            {t("testimonials.subtitle")}
          </motion.h2>
        </div>

        <div className="max-w-6xl mx-auto relative">
          <div className="absolute -z-10 w-72 h-72 bg-neonGreen/10 rounded-full blur-3xl top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 opacity-70"></div>
          
          <div className="relative p-4 md:p-8">
            <div className="absolute top-1/2 -left-4 md:-left-6 transform -translate-y-1/2">
              <Button 
                variant="ghost" 
                size="icon" 
                className="rounded-full bg-white/10 backdrop-blur-sm hover:bg-white/20 text-white"
                onClick={handlePrev}
              >
                <ArrowLeft className="h-5 w-5" />
              </Button>
            </div>
            
            <div className="absolute top-1/2 -right-4 md:-right-6 transform -translate-y-1/2">
              <Button 
                variant="ghost" 
                size="icon" 
                className="rounded-full bg-white/10 backdrop-blur-sm hover:bg-white/20 text-white"
                onClick={handleNext}
              >
                <ArrowRight className="h-5 w-5" />
              </Button>
            </div>

            <div className="overflow-hidden py-8">
              <AnimatePresence mode="wait">
                <motion.div
                  key={activeIndex}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  transition={{ duration: 0.5 }}
                  className="flex flex-col md:flex-row items-center gap-8 glass rounded-2xl p-8 bg-white/5"
                >
                  <div className="flex-shrink-0 relative">
                    <div className="w-24 h-24 md:w-32 md:h-32 rounded-full overflow-hidden ring-4 ring-neonGreen/20 shadow-lg">
                      <img 
                        src={testimonials[activeIndex].avatar} 
                        alt={testimonials[activeIndex].name} 
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <div className="absolute -bottom-2 -right-2 bg-neonGreen text-darkBlue p-2 rounded-full">
                      <Quote className="w-5 h-5" />
                    </div>
                  </div>
                  
                  <div className="flex-1 text-center md:text-left">
                    <p className="text-lg md:text-xl mb-6 italic text-foreground/80">
                      "{testimonials[activeIndex].quote}"
                    </p>
                    <div>
                      <h3 className="font-mono font-semibold text-xl mb-1">{testimonials[activeIndex].name}</h3>
                      <p className="text-foreground/70 font-mono">
                        {testimonials[activeIndex].position}, {testimonials[activeIndex].company}
                      </p>
                    </div>
                  </div>
                </motion.div>
              </AnimatePresence>
            </div>
            
            <div className="flex justify-center gap-2 mt-4">
              {testimonials.map((_, index) => (
                <button
                  key={index}
                  onClick={() => {
                    setAutoplay(false);
                    setActiveIndex(index);
                  }}
                  className={`w-3 h-3 rounded-full transition-all ${
                    activeIndex === index ? "bg-neonGreen w-6" : "bg-neonGreen/30"
                  }`}
                  aria-label={`View testimonial ${index + 1}`}
                />
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Testimonials;
