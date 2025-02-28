
import { useEffect, useRef } from "react";
import { Button } from "@/components/ui/button";
import { ArrowRight, Code, Bot, Database, ArrowDown } from "lucide-react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";

const Hero = () => {
  const heroRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (!heroRef.current) return;
      
      const elements = heroRef.current.querySelectorAll('.parallax-element');
      
      elements.forEach((el) => {
        const htmlEl = el as HTMLElement;
        const speed = parseFloat(htmlEl.dataset.speed || "0.05");
        const x = (window.innerWidth - e.pageX * speed) / 100;
        const y = (window.innerHeight - e.pageY * speed) / 100;
        
        htmlEl.style.transform = `translateX(${x}px) translateY(${y}px)`;
      });
    };

    document.addEventListener('mousemove', handleMouseMove);
    
    return () => {
      document.removeEventListener('mousemove', handleMouseMove);
    };
  }, []);

  return (
    <div ref={heroRef} className="relative min-h-screen flex items-center justify-center overflow-hidden pt-20 bg-tech-pattern">
      {/* Background Elements */}
      <div className="absolute inset-0 z-0">
        <div className="absolute -top-20 -left-20 w-72 h-72 bg-neonGreen/20 rounded-full blur-3xl opacity-70 parallax-element" data-speed="0.03"></div>
        <div className="absolute top-1/3 -right-20 w-80 h-80 bg-neonGreen/20 rounded-full blur-3xl opacity-60 parallax-element" data-speed="0.05"></div>
        <div className="absolute bottom-10 left-1/4 w-60 h-60 bg-green-400/20 rounded-full blur-3xl opacity-60 parallax-element" data-speed="0.02"></div>
      </div>

      {/* Floating Icons */}
      <motion.div
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.2 }}
        className="absolute top-1/4 left-1/5 p-4 glass rounded-2xl parallax-element animate-float"
        data-speed="0.04"
      >
        <Code className="text-neonGreen w-8 h-8" />
      </motion.div>
      
      <motion.div
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.4 }}
        className="absolute bottom-1/3 right-1/4 p-4 glass rounded-2xl parallax-element animate-float"
        style={{animationDelay: "2s"}}
        data-speed="0.06"
      >
        <Bot className="text-neonGreen w-8 h-8" />
      </motion.div>
      
      <motion.div
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.6 }}
        className="absolute top-2/3 left-1/3 p-4 glass rounded-2xl parallax-element animate-float"
        style={{animationDelay: "1s"}}
        data-speed="0.08"
      >
        <Database className="text-neonGreen w-8 h-8" />
      </motion.div>

      <div className="container mx-auto px-4 md:px-6 relative z-10">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="flex flex-col items-center text-center max-w-4xl mx-auto"
        >
          <p className="text-sm md:text-base font-mono font-medium px-4 py-2 rounded-full bg-neonGreen/10 text-neonGreen mb-4">
            Innovative Software & Bot Solutions
          </p>
          <h1 className="text-4xl md:text-6xl lg:text-7xl font-mono font-bold mb-6 text-balance">
            Transform Your Business with <span className="text-gradient">AI-Powered</span> Solutions
          </h1>
          <p className="text-lg md:text-xl font-mono text-foreground/80 max-w-3xl mb-8 text-balance">
            We design and develop custom software solutions and intelligent bots that automate processes, enhance customer experiences, and drive growth for businesses of all sizes.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 mt-2">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.4, delay: 0.4 }}
            >
              <Button className="button-glow px-6 py-6 bg-neonGreen text-darkBlue hover:bg-neonGreen/80 font-mono" asChild>
                <Link to="/contact">
                  Get Started <ArrowRight className="ml-2 h-5 w-5" />
                </Link>
              </Button>
            </motion.div>
            
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.4, delay: 0.4 }}
            >
              <Button variant="outline" className="px-6 py-6 font-mono border-neonGreen text-neonGreen hover:bg-neonGreen/10" asChild>
                <Link to="/portfolio">
                  View Our Work
                </Link>
              </Button>
            </motion.div>
          </div>
        </motion.div>

        {/* Technology Showcase */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.8 }}
          className="mt-20 grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4 max-w-5xl mx-auto animate-fade-in"
        >
          {["AI/ML", "Chatbots", "Custom Software", "Web Apps", "Automation"].map((tech, index) => (
            <motion.div 
              key={tech}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3, delay: 0.5 + (index * 0.1) }}
              className="glass p-4 rounded-lg text-center transition-all hover:scale-105 hover:shadow-glow"
            >
              <p className="font-mono font-medium">{tech}</p>
            </motion.div>
          ))}
        </motion.div>
        
        {/* Scroll Down Indicator */}
        <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce">
          <Button variant="ghost" size="sm" className="rounded-full opacity-70 hover:opacity-100">
            <ArrowDown className="h-5 w-5 text-neonGreen" />
          </Button>
        </div>
      </div>
    </div>
  );
};

export default Hero;
