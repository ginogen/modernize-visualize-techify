
import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowLeft, ArrowRight, Play } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";

interface Project {
  id: number;
  title: string;
  category: string;
  media: {
    type: "image" | "video";
    url: string;
    thumbnail?: string;
  };
  description: string;
}

const Portfolio = () => {
  const [active, setActive] = useState(0);
  const [width, setWidth] = useState(0);
  const [videoPlaying, setVideoPlaying] = useState(false);
  const [viewportEntered, setViewportEntered] = useState(false);
  const carousel = useRef<HTMLDivElement>(null);
  const videoRef = useRef<HTMLIFrameElement>(null);
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    if (carousel.current) {
      setWidth(carousel.current.scrollWidth - carousel.current.offsetWidth);
    }
    
    // Set up intersection observer for triggering animations when section enters viewport
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) {
          setViewportEntered(true);
          observer.unobserve(entries[0].target);
        }
      },
      { threshold: 0.2 }
    );
    
    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }
    
    return () => {
      if (sectionRef.current) {
        observer.unobserve(sectionRef.current);
      }
    };
  }, []);

  const projects: Project[] = [
    {
      id: 1,
      title: "AI Customer Service Chatbot",
      category: "Chatbot",
      media: {
        type: "video",
        url: "https://www.youtube.com/embed/dQw4w9WgXcQ",
        thumbnail: "https://images.unsplash.com/photo-1611162617474-5b21e879e113?q=80&w=1974&auto=format&fit=crop"
      },
      description: "An intelligent chatbot that handles customer inquiries, processes returns, and provides product recommendations 24/7."
    },
    {
      id: 2,
      title: "Financial Market Analysis Platform",
      category: "Software",
      media: {
        type: "image",
        url: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?q=80&w=2070&auto=format&fit=crop"
      },
      description: "Real-time market data analysis platform with predictive modeling and custom alert systems for financial institutions."
    },
    {
      id: 3,
      title: "Healthcare Patient Management System",
      category: "Web Application",
      media: {
        type: "video",
        url: "https://www.youtube.com/embed/dQw4w9WgXcQ",
        thumbnail: "https://images.unsplash.com/photo-1576091160550-2173dba999ef?q=80&w=2070&auto=format&fit=crop"
      },
      description: "A comprehensive solution for healthcare providers to manage patient records, scheduling, and telehealth services securely."
    },
    {
      id: 4,
      title: "Logistics Optimization Software",
      category: "Software",
      media: {
        type: "image",
        url: "https://images.unsplash.com/photo-1494412574643-ff11b0a5c1c3?q=80&w=2070&auto=format&fit=crop"
      },
      description: "Advanced logistics platform that optimizes delivery routes, reduces transportation costs, and improves sustainability metrics."
    },
    {
      id: 5,
      title: "Retail Inventory Management Bot",
      category: "Chatbot",
      media: {
        type: "video",
        url: "https://www.youtube.com/embed/dQw4w9WgXcQ",
        thumbnail: "https://images.unsplash.com/photo-1559136555-9303baea8ebd?q=80&w=2070&auto=format&fit=crop"
      },
      description: "AI-powered inventory management system that forecasts demand, automates reordering, and prevents stockouts."
    }
  ];

  const handleNext = () => {
    setActive(prev => (prev === projects.length - 1 ? 0 : prev + 1));
    setVideoPlaying(false);
  };

  const handlePrev = () => {
    setActive(prev => (prev === 0 ? projects.length - 1 : prev - 1));
    setVideoPlaying(false);
  };

  const handlePlayVideo = () => {
    setVideoPlaying(true);
  };

  const sectionVariants = {
    hidden: { opacity: 0, y: 50 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: { 
        duration: 0.8, 
        ease: "easeOut",
        when: "beforeChildren",
        staggerChildren: 0.2
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: { duration: 0.5 }
    }
  };

  return (
    <section 
      id="portfolio" 
      className="section-padding bg-darkBlue text-white overflow-hidden"
      ref={sectionRef}
    >
      <motion.div 
        className="container mx-auto"
        initial="hidden"
        animate={viewportEntered ? "visible" : "hidden"}
        variants={sectionVariants}
      >
        <motion.div className="text-center max-w-3xl mx-auto mb-16" variants={itemVariants}>
          <p className="text-sm md:text-base font-medium px-4 py-2 rounded-full bg-neonGreen/10 text-neonGreen inline-block mb-4">
            Our Portfolio
          </p>
          <h2 className="text-3xl md:text-4xl font-mono font-bold mb-6">
            Showcasing Our Best Work
          </h2>
          <p className="text-white/70 text-lg">
            Explore our successful projects and see how we've helped businesses transform their operations
          </p>
        </motion.div>

        <div className="relative overflow-hidden px-4 py-8">
          <motion.div 
            variants={itemVariants}
            className="absolute top-1/2 left-4 z-10 transform -translate-y-1/2"
          >
            <Button 
              variant="ghost" 
              size="icon" 
              className="rounded-full bg-white/10 backdrop-blur-sm hover:bg-white/20"
              onClick={handlePrev}
            >
              <ArrowLeft className="h-5 w-5 text-white" />
            </Button>
          </motion.div>

          <motion.div 
            variants={itemVariants}
            className="absolute top-1/2 right-4 z-10 transform -translate-y-1/2"
          >
            <Button 
              variant="ghost" 
              size="icon" 
              className="rounded-full bg-white/10 backdrop-blur-sm hover:bg-white/20"
              onClick={handleNext}
            >
              <ArrowRight className="h-5 w-5 text-white" />
            </Button>
          </motion.div>

          <motion.div 
            className="overflow-hidden" 
            ref={carousel}
            variants={itemVariants}
          >
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
                  <div className="absolute -right-3 -top-3 bg-neonGreen/10 w-full h-full rounded-xl"></div>
                  
                  {projects[active].media.type === "image" ? (
                    <motion.img 
                      src={projects[active].media.url} 
                      alt={projects[active].title} 
                      className="w-full h-[350px] object-cover rounded-xl z-10 relative shadow-md"
                      initial={{ scale: 0.95, opacity: 0.5 }}
                      animate={{ scale: 1, opacity: 1 }}
                      transition={{ duration: 0.4 }}
                    />
                  ) : (
                    videoPlaying ? (
                      <iframe
                        ref={videoRef}
                        src={`${projects[active].media.url}?autoplay=1`}
                        title={projects[active].title}
                        className="w-full h-[350px] rounded-xl z-10 relative shadow-md"
                        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                        allowFullScreen
                      />
                    ) : (
                      <div className="relative w-full h-[350px] rounded-xl z-10 shadow-md overflow-hidden">
                        <motion.img 
                          src={projects[active].media.thumbnail} 
                          alt={projects[active].title} 
                          className="w-full h-full object-cover"
                          initial={{ scale: 0.95, opacity: 0.5 }}
                          animate={{ scale: 1, opacity: 1 }}
                          transition={{ duration: 0.4 }}
                        />
                        <motion.div 
                          className="absolute inset-0 bg-black/40 flex items-center justify-center cursor-pointer transition-all hover:bg-black/60"
                          onClick={handlePlayVideo}
                          whileHover={{ backgroundColor: "rgba(0,0,0,0.6)" }}
                        >
                          <motion.div 
                            className="w-16 h-16 rounded-full bg-neonGreen/80 flex items-center justify-center"
                            animate={{ 
                              scale: [1, 1.1, 1],
                              boxShadow: [
                                "0 0 0 0 rgba(74, 222, 128, 0.7)",
                                "0 0 0 10px rgba(74, 222, 128, 0)",
                                "0 0 0 0 rgba(74, 222, 128, 0)"
                              ]
                            }}
                            transition={{ 
                              duration: 2, 
                              repeat: Infinity,
                              repeatType: "loop"
                            }}
                          >
                            <Play className="h-8 w-8 text-darkBlue" fill="currentColor" />
                          </motion.div>
                        </motion.div>
                      </div>
                    )
                  )}
                  
                  <div className="absolute top-4 left-4 bg-black/60 text-white px-3 py-1 rounded-full text-sm backdrop-blur-sm">
                    {projects[active].category}
                  </div>
                </div>
                <motion.div 
                  className="w-full lg:w-1/2 flex flex-col justify-center"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: 0.2 }}
                >
                  <h3 className="text-2xl md:text-3xl font-mono font-bold mb-4">
                    {projects[active].title}
                  </h3>
                  <p className="text-white/70 text-lg mb-6">
                    {projects[active].description}
                  </p>
                  <div className="flex gap-4">
                    <Button className="button-glow bg-neonGreen text-darkBlue hover:bg-neonGreen/80 font-mono" asChild>
                      <Link to={`/portfolio/${projects[active].id}`}>
                        View Details
                      </Link>
                    </Button>
                    <Button variant="outline" className="border-neonGreen text-neonGreen hover:bg-neonGreen/10">Case Study</Button>
                  </div>
                </motion.div>
              </motion.div>
            </AnimatePresence>
          </motion.div>

          <motion.div 
            className="flex justify-center mt-8 gap-2"
            variants={itemVariants}
          >
            {projects.map((_, index) => (
              <button
                key={index}
                onClick={() => {
                  setActive(index);
                  setVideoPlaying(false);
                }}
                className={`w-3 h-3 rounded-full transition-all ${
                  active === index ? "bg-neonGreen w-6" : "bg-neonGreen/30"
                }`}
                aria-label={`Go to slide ${index + 1}`}
              />
            ))}
          </motion.div>
        </div>

        <motion.div 
          className="text-center mt-8"
          variants={itemVariants}
        >
          <Button 
            variant="outline" 
            className="border-neonGreen text-neonGreen hover:bg-neonGreen/10"
            asChild
          >
            <Link to="/portfolio">
              View All Projects <ArrowRight className="ml-2 h-4 w-4" />
            </Link>
          </Button>
        </motion.div>
      </motion.div>
    </section>
  );
};

export default Portfolio;
