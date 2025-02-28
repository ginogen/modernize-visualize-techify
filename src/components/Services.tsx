
import { useState } from "react";
import { Bot, Code, Database, Server, ArrowRight, Puzzle, Robot, Layers, Cpu } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";

interface Service {
  id: number;
  icon: React.ReactNode;
  title: string;
  description: string;
  features: string[];
}

const Services = () => {
  const [activeService, setActiveService] = useState<number | null>(null);

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
    show: { opacity: 1, y: 0 }
  };

  return (
    <section id="services" className="section-padding bg-darkBlue text-white">
      <div className="container mx-auto">
        <div className="text-center max-w-3xl mx-auto mb-16 animate-fade-in">
          <p className="text-sm md:text-base font-mono font-medium px-4 py-2 rounded-full bg-neonGreen/10 text-neonGreen inline-block mb-4">
            Our Services
          </p>
          <h2 className="text-3xl md:text-4xl font-mono font-bold mb-6">
            Transforming Ideas into Powerful Solutions
          </h2>
          <p className="text-white/70 text-lg font-mono">
            We specialize in developing innovative technology solutions that solve real business problems
          </p>
        </div>

        <motion.div 
          variants={container}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6"
        >
          {services.map((service) => (
            <motion.div 
              key={service.id}
              variants={item}
              className={`glass rounded-xl overflow-hidden transition-all duration-300 bg-white/5 ${
                activeService === service.id ? 'ring-2 ring-neonGreen/50 shadow-glow' : 'hover:translate-y-[-5px]'
              }`}
            >
              <div 
                className="p-6 cursor-pointer" 
                onClick={() => toggleService(service.id)}
              >
                <div className="flex items-center justify-between mb-4">
                  <div className="p-3 rounded-lg bg-neonGreen/10">
                    {service.icon}
                  </div>
                  <Button 
                    variant="ghost" 
                    size="icon" 
                    className="text-neonGreen hover:bg-neonGreen/10"
                    onClick={(e) => {
                      e.stopPropagation();
                      toggleService(service.id);
                    }}
                  >
                    <ArrowRight className={`w-5 h-5 transition-transform duration-300 ${
                      activeService === service.id ? 'rotate-90' : ''
                    }`} />
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
                    transition={{ duration: 0.3 }}
                    className="px-6 pb-6"
                  >
                    <div className="pt-4 border-t border-white/10">
                      <h4 className="font-mono font-semibold mb-3 text-neonGreen">Key Features:</h4>
                      <ul className="space-y-2">
                        {service.features.map((feature, index) => (
                          <li key={index} className="flex items-center">
                            <div className="w-1.5 h-1.5 rounded-full bg-neonGreen mr-2"></div>
                            <span className="text-white/80 font-mono">{feature}</span>
                          </li>
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
          <Button className="button-glow bg-neonGreen text-darkBlue hover:bg-neonGreen/80 font-mono" asChild>
            <Link to="/services">
              View All Services <ArrowRight className="ml-2 h-4 w-4" />
            </Link>
          </Button>
        </div>
      </div>
    </section>
  );
};

export default Services;
