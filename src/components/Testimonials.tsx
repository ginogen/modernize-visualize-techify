
import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowLeft, ArrowRight, Quote } from "lucide-react";
import { Button } from "@/components/ui/button";

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

  const testimonials: Testimonial[] = [
    {
      id: 1,
      name: "Sarah Johnson",
      position: "CTO",
      company: "TechLife Solutions",
      avatar: "https://randomuser.me/api/portraits/women/1.jpg",
      quote: "Working with Builders AI transformed our customer service operations. Their chatbot solution reduced response times by 80% and increased customer satisfaction scores. The team was professional and delivered beyond our expectations."
    },
    {
      id: 2,
      name: "Michael Chen",
      position: "Director of Digital",
      company: "Global Retail Inc.",
      avatar: "https://randomuser.me/api/portraits/men/2.jpg",
      quote: "The e-commerce platform Builders AI developed for us has significantly improved our conversion rates and streamlined our inventory management. Their attention to detail and technical expertise made all the difference."
    },
    {
      id: 3,
      name: "Emma Rodriguez",
      position: "CEO",
      company: "HealthTrack Systems",
      avatar: "https://randomuser.me/api/portraits/women/3.jpg", 
      quote: "Builders AI delivered a patient management system that exceeded our requirements. Their understanding of healthcare workflows and regulatory requirements was impressive. We've seen a 45% improvement in administrative efficiency."
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
    <section className="section-padding bg-gradient-to-b from-background to-secondary/20">
      <div className="container mx-auto">
        <div className="text-center max-w-3xl mx-auto mb-16 animate-fade-in">
          <p className="text-sm md:text-base font-medium px-4 py-2 rounded-full bg-primary/10 text-primary inline-block mb-4">
            Client Success Stories
          </p>
          <h2 className="text-3xl md:text-4xl font-display font-bold mb-6">
            What Our Clients Say
          </h2>
        </div>

        <div className="max-w-6xl mx-auto relative">
          <div className="absolute -z-10 w-72 h-72 bg-primary/10 rounded-full blur-3xl top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 opacity-70"></div>
          
          <div className="relative p-4 md:p-8">
            <div className="absolute top-1/2 -left-4 md:-left-6 transform -translate-y-1/2">
              <Button 
                variant="ghost" 
                size="icon" 
                className="rounded-full bg-white shadow-md hover:bg-white"
                onClick={handlePrev}
              >
                <ArrowLeft className="h-5 w-5" />
              </Button>
            </div>
            
            <div className="absolute top-1/2 -right-4 md:-right-6 transform -translate-y-1/2">
              <Button 
                variant="ghost" 
                size="icon" 
                className="rounded-full bg-white shadow-md hover:bg-white"
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
                  className="flex flex-col md:flex-row items-center gap-8 glass rounded-2xl p-8"
                >
                  <div className="flex-shrink-0 relative">
                    <div className="w-24 h-24 md:w-32 md:h-32 rounded-full overflow-hidden ring-4 ring-white shadow-lg">
                      <img 
                        src={testimonials[activeIndex].avatar} 
                        alt={testimonials[activeIndex].name} 
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <div className="absolute -bottom-2 -right-2 bg-primary text-white p-2 rounded-full">
                      <Quote className="w-5 h-5" />
                    </div>
                  </div>
                  
                  <div className="flex-1 text-center md:text-left">
                    <p className="text-lg md:text-xl mb-6 italic text-foreground/80">
                      "{testimonials[activeIndex].quote}"
                    </p>
                    <div>
                      <h3 className="font-semibold text-xl mb-1">{testimonials[activeIndex].name}</h3>
                      <p className="text-foreground/70">
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
                    activeIndex === index ? "bg-primary w-6" : "bg-primary/30"
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
