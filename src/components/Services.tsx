
import { useState, useEffect } from "react";
import { Bot, Code, Database, Server, ArrowRight, Puzzle, Layers, Cpu } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import CodeTerminal from "./CodeTerminal";

interface Service {
  id: number;
  icon: React.ReactNode;
  title: string;
  description: string;
  features: string[];
}

const Services = () => {
  const [activeService, setActiveService] = useState<number | null>(null);
  const [visibleSections, setVisibleSections] = useState<number[]>([]);
  const [typingTitle, setTypingTitle] = useState("");
  const [typingComplete, setTypingComplete] = useState(false);
  
  const fullTitle = "Transforming Ideas into Powerful Solutions";

  // Terminal typing effect for the title
  useEffect(() => {
    if (typingTitle.length < fullTitle.length) {
      const timeout = setTimeout(() => {
        setTypingTitle(fullTitle.substring(0, typingTitle.length + 1));
      }, 50);
      return () => clearTimeout(timeout);
    } else {
      setTypingComplete(true);
    }
  }, [typingTitle]);

  // Start typing effect when section becomes visible
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting && entry.target.id === "services-title") {
            setTypingTitle(prev => prev || fullTitle.charAt(0));
          }
        });
      },
      { threshold: 0.1 }
    );

    const titleElement = document.getElementById("services-title");
    if (titleElement) observer.observe(titleElement);

    return () => {
      if (titleElement) observer.unobserve(titleElement);
    };
  }, []);

  const services: Service[] = [
    {
      id: 1,
      icon: <Code className="w-8 h-8 text-neonGreen" />,
      title: "Custom Software Development",
      description: "Bespoke software solutions designed to address your unique business challenges and optimize operations.",
      features: [
        "Web & Mobile Applications",
        "Enterprise Solutions",
        "SaaS Products",
        "API Integrations",
        "Legacy System Modernization"
      ]
    },
    {
      id: 2,
      icon: <Bot className="w-8 h-8 text-neonGreen" />,
      title: "AI & Chatbot Development",
      description: "Intelligent conversational interfaces that automate customer service and streamline business processes.",
      features: [
        "Customer Service Bots",
        "NLP-Powered Interactions",
        "Multi-Platform Deployment",
        "Analytics & Reporting",
        "Continuous Learning Models"
      ]
    },
    {
      id: 3,
      icon: <Layers className="w-8 h-8 text-neonGreen" />,
      title: "Machine Learning Solutions",
      description: "Advanced algorithms that analyze data, identify patterns, and make predictions to drive better business decisions.",
      features: [
        "Predictive Analytics",
        "Data Pattern Recognition",
        "Automated Decision Systems",
        "Image & Speech Recognition",
        "Custom ML Model Development"
      ]
    },
    {
      id: 4,
      icon: <Cpu className="w-8 h-8 text-neonGreen" />,
      title: "Process Automation",
      description: "End-to-end automation solutions that reduce manual tasks, minimize errors, and increase operational efficiency.",
      features: [
        "Workflow Automation",
        "RPA Implementation",
        "Business Process Optimization",
        "Document Processing",
        "System Integration"
      ]
    }
  ];

  const toggleService = (id: number) => {
    setActiveService(activeService === id ? null : id);
  };

  // Custom observer setup for staggered animations
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const id = parseInt(entry.target.getAttribute('data-service-id') || '0');
            if (id && !visibleSections.includes(id)) {
              setVisibleSections(prev => [...prev, id]);
            }
          }
        });
      },
      { threshold: 0.1, rootMargin: "0px 0px -100px 0px" }
    );

    const serviceElements = document.querySelectorAll('.service-card');
    serviceElements.forEach(el => observer.observe(el));

    return () => {
      serviceElements.forEach(el => observer.unobserve(el));
    };
  }, [visibleSections]);

  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  const item = {
    hidden: { opacity: 0, y: 20 },
    show: { opacity: 1, y: 0, transition: { duration: 0.5, ease: "easeOut" } }
  };

  // Card hover animation
  const cardHover = {
    rest: { scale: 1, y: 0, transition: { duration: 0.3, ease: "easeOut" } },
    hover: { scale: 1.02, y: -8, transition: { duration: 0.3, ease: "easeOut" } }
  };

  // Cursor blink animation for terminal effect
  const cursorVariants = {
    blink: {
      opacity: [0, 1, 0],
      transition: {
        duration: 0.8,
        repeat: Infinity,
        repeatType: "loop" as const
      }
    }
  };

  return (
    <section id="services" className="section-padding bg-darkBlue text-white">
      <div className="container mx-auto">
        {/* Terminal Animation Component */}
        <CodeTerminal />

        <div className="text-center max-w-3xl mx-auto mb-16 animate-fade-in">
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: true }}
            className="text-sm md:text-base font-mono font-medium px-4 py-2 rounded-full bg-neonGreen/10 text-neonGreen inline-block mb-4"
          >
            Our Services
          </motion.p>
          <h2 id="services-title" className="text-3xl md:text-4xl font-mono font-bold mb-6 relative">
            <span className="text-white">{typingTitle}</span>
            {!typingComplete && (
              <motion.span
                variants={cursorVariants}
                animate="blink"
                className="inline-block w-2 h-8 bg-neonGreen ml-1"
              ></motion.span>
            )}
          </h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.3 }}
            viewport={{ once: true }}
            className="text-white/70 text-lg font-mono"
          >
            We specialize in developing innovative technology solutions that solve real business problems
          </motion.p>
        </div>

        <motion.div 
          variants={container}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: "-100px 0px" }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6"
        >
          {services.map((service) => (
            <motion.div 
              key={service.id}
              data-service-id={service.id}
              className={`service-card glass rounded-xl overflow-hidden transition-all duration-500 bg-white/5 ${
                activeService === service.id ? 'ring-2 ring-neonGreen/50 shadow-glow' : ''
              }`}
              initial="hidden"
              animate={visibleSections.includes(service.id) ? "show" : "hidden"}
              variants={item}
              whileHover={cardHover}
              whileTap={{ scale: 0.98 }}
            >
              <div 
                className="p-6 cursor-pointer transform transition-all" 
                onClick={() => toggleService(service.id)}
              >
                <div className="flex items-center justify-between mb-4">
                  <motion.div 
                    className="p-3 rounded-lg bg-neonGreen/10"
                    whileHover={{ scale: 1.1, rotate: 5 }}
                    transition={{ type: "spring", stiffness: 500 }}
                  >
                    {service.icon}
                  </motion.div>
                  <Button 
                    variant="ghost" 
                    size="icon" 
                    className="text-neonGreen hover:bg-neonGreen/10"
                    onClick={(e) => {
                      e.stopPropagation();
                      toggleService(service.id);
                    }}
                  >
                    <motion.div
                      animate={{ rotate: activeService === service.id ? 90 : 0 }}
                      transition={{ duration: 0.3 }}
                    >
                      <ArrowRight className="w-5 h-5" />
                    </motion.div>
                  </Button>
                </div>
                <h3 className="text-xl font-mono font-semibold mb-3">{service.title}</h3>
                <p className="text-white/70 font-mono mb-2">{service.description}</p>
              </div>

              <AnimatePresence>
                {activeService === service.id && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: 'auto', opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.5, ease: "easeInOut" }}
                    className="px-6 pb-6"
                  >
                    <div className="pt-4 border-t border-white/10">
                      <h4 className="font-mono font-semibold mb-3 text-neonGreen">Key Features:</h4>
                      <ul className="space-y-2">
                        {service.features.map((feature, index) => (
                          <motion.li 
                            key={index} 
                            className="flex items-center"
                            initial={{ opacity: 0, x: -10 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ duration: 0.2, delay: index * 0.1 }}
                          >
                            <div className="w-1.5 h-1.5 rounded-full bg-neonGreen mr-2"></div>
                            <span className="text-white/80 font-mono">{feature}</span>
                          </motion.li>
                        ))}
                      </ul>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          ))}
        </motion.div>

        <div className="text-center mt-16">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: true }}
          >
            <Button 
              className="button-glow bg-neonGreen text-darkBlue hover:bg-neonGreen/80 font-mono" 
              asChild
            >
              <Link to="/services">
                View All Services <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
            </Button>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default Services;
