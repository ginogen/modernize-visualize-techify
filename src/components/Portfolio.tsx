
import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowLeft, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";

interface Project {
  id: number;
  title: string;
  category: string;
  image: string;
  description: string;
}

const Portfolio = () => {
  const [active, setActive] = useState(0);
  const [width, setWidth] = useState(0);
  const carousel = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (carousel.current) {
      setWidth(carousel.current.scrollWidth - carousel.current.offsetWidth);
    }
  }, []);

  const projects: Project[] = [
    {
      id: 1,
      title: "E-Commerce AI Assistant",
      category: "Chatbot",
      image: "https://images.unsplash.com/photo-1611162617474-5b21e879e113?q=80&w=1974&auto=format&fit=crop",
      description: "An intelligent shopping assistant that helps customers find products and answer questions in real-time."
    },
    {
      id: 2,
      title: "Financial Data Platform",
      category: "Software",
      image: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?q=80&w=2070&auto=format&fit=crop",
      description: "A comprehensive analytics dashboard that processes and visualizes complex financial data."
    },
    {
      id: 3,
      title: "Healthcare Patient Portal",
      category: "Web Application",
      image: "https://images.unsplash.com/photo-1576091160550-2173dba999ef?q=80&w=2070&auto=format&fit=crop",
      description: "A secure patient management system that connects patients with healthcare providers."
    },
    {
      id: 4,
      title: "Logistics Automation System",
      category: "Software",
      image: "https://images.unsplash.com/photo-1494412574643-ff11b0a5c1c3?q=80&w=2070&auto=format&fit=crop",
      description: "An end-to-end logistics platform that optimizes shipping routes and inventory management."
    },
    {
      id: 5,
      title: "Retail Customer Support Bot",
      category: "Chatbot",
      image: "https://images.unsplash.com/photo-1559136555-9303baea8ebd?q=80&w=2070&auto=format&fit=crop",
      description: "A conversational AI that handles customer inquiries and support tickets 24/7."
    }
  ];

  const handleNext = () => {
    setActive(prev => (prev === projects.length - 1 ? 0 : prev + 1));
  };

  const handlePrev = () => {
    setActive(prev => (prev === 0 ? projects.length - 1 : prev - 1));
  };

  return (
    <section id="portfolio" className="section-padding">
      <div className="container mx-auto">
        <div className="text-center max-w-3xl mx-auto mb-16 animate-fade-in">
          <p className="text-sm md:text-base font-medium px-4 py-2 rounded-full bg-primary/10 text-primary inline-block mb-4">
            Our Portfolio
          </p>
          <h2 className="text-3xl md:text-4xl font-display font-bold mb-6">
            Showcasing Our Best Work
          </h2>
          <p className="text-foreground/70 text-lg">
            Explore our successful projects and see how we've helped businesses transform their operations
          </p>
        </div>

        <div className="relative overflow-hidden px-4 py-8">
          <div className="absolute top-1/2 left-4 z-10 transform -translate-y-1/2">
            <Button 
              variant="ghost" 
              size="icon" 
              className="rounded-full bg-white/80 shadow-md hover:bg-white"
              onClick={handlePrev}
            >
              <ArrowLeft className="h-5 w-5" />
            </Button>
          </div>

          <div className="absolute top-1/2 right-4 z-10 transform -translate-y-1/2">
            <Button 
              variant="ghost" 
              size="icon" 
              className="rounded-full bg-white/80 shadow-md hover:bg-white"
              onClick={handleNext}
            >
              <ArrowRight className="h-5 w-5" />
            </Button>
          </div>

          <div className="overflow-hidden" ref={carousel}>
            <AnimatePresence mode="wait">
              <motion.div
                key={active}
                initial={{ opacity: 0, x: 100 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -100 }}
                transition={{ duration: 0.5, ease: "easeInOut" }}
                className="flex flex-col lg:flex-row items-center gap-8 py-6"
              >
                <div className="w-full lg:w-1/2 relative">
                  <div className="absolute -right-3 -top-3 bg-primary/10 w-full h-full rounded-xl"></div>
                  <img 
                    src={projects[active].image} 
                    alt={projects[active].title} 
                    className="w-full h-[350px] object-cover rounded-xl z-10 relative shadow-md"
                  />
                  <div className="absolute top-4 left-4 bg-black/60 text-white px-3 py-1 rounded-full text-sm backdrop-blur-sm">
                    {projects[active].category}
                  </div>
                </div>
                <div className="w-full lg:w-1/2 flex flex-col justify-center">
                  <h3 className="text-2xl md:text-3xl font-display font-bold mb-4">
                    {projects[active].title}
                  </h3>
                  <p className="text-foreground/70 text-lg mb-6">
                    {projects[active].description}
                  </p>
                  <div className="flex gap-4">
                    <Button className="button-glow" asChild>
                      <Link to={`/portfolio/${projects[active].id}`}>
                        View Details
                      </Link>
                    </Button>
                    <Button variant="outline">Case Study</Button>
                  </div>
                </div>
              </motion.div>
            </AnimatePresence>
          </div>

          <div className="flex justify-center mt-8 gap-2">
            {projects.map((_, index) => (
              <button
                key={index}
                onClick={() => setActive(index)}
                className={`w-3 h-3 rounded-full transition-all ${
                  active === index ? "bg-primary w-6" : "bg-primary/30"
                }`}
                aria-label={`Go to slide ${index + 1}`}
              />
            ))}
          </div>
        </div>

        <div className="text-center mt-8">
          <Button variant="outline" asChild>
            <Link to="/portfolio">
              View All Projects <ArrowRight className="ml-2 h-4 w-4" />
            </Link>
          </Button>
        </div>
      </div>
    </section>
  );
};

export default Portfolio;
