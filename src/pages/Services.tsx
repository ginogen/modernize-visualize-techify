
import { useEffect } from "react";
import { motion } from "framer-motion";
import { ArrowRight, Bot, Code, Database, Layers, Cpu } from "lucide-react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import CodeTerminal from "@/components/CodeTerminal";

const Services = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.5 } }
  };

  const serviceCards = [
    {
      id: 1,
      icon: <Code className="w-12 h-12 text-neonGreen" />,
      title: "Custom Software Development",
      description: "Bespoke software solutions designed to address your unique business challenges and optimize operations.",
      features: [
        "Web & Mobile Applications",
        "Enterprise Solutions", 
        "SaaS Products",
        "API Integrations", 
        "Legacy System Modernization"
      ],
      link: "/services/custom-software"
    },
    {
      id: 2,
      icon: <Bot className="w-12 h-12 text-neonGreen" />,
      title: "AI & Chatbot Development",
      description: "Intelligent conversational interfaces that automate customer service and streamline business processes.",
      features: [
        "Customer Service Bots",
        "NLP-Powered Interactions",
        "Multi-Platform Deployment",
        "Analytics & Reporting",
        "Continuous Learning Models"
      ],
      link: "/services/ai-chatbots"
    },
    {
      id: 3,
      icon: <Layers className="w-12 h-12 text-neonGreen" />,
      title: "Machine Learning Solutions",
      description: "Advanced algorithms that analyze data, identify patterns, and make predictions to drive better business decisions.",
      features: [
        "Predictive Analytics",
        "Data Pattern Recognition",
        "Automated Decision Systems",
        "Image & Speech Recognition",
        "Custom ML Model Development"
      ],
      link: "/services/machine-learning"
    },
    {
      id: 4,
      icon: <Cpu className="w-12 h-12 text-neonGreen" />,
      title: "Process Automation",
      description: "End-to-end automation solutions that reduce manual tasks, minimize errors, and increase operational efficiency.",
      features: [
        "Workflow Automation",
        "RPA Implementation",
        "Business Process Optimization",
        "Document Processing",
        "System Integration"
      ],
      link: "/services/process-automation"
    }
  ];

  return (
    <div className="min-h-screen overflow-x-hidden bg-darkBlue text-white">
      <Header />
      <main>
        {/* Hero Section */}
        <section className="section-padding">
          <div className="container mx-auto">
            <div className="text-center max-w-3xl mx-auto mb-12">
              <motion.p
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
                className="text-sm md:text-base font-mono font-medium px-4 py-2 rounded-full bg-neonGreen/10 text-neonGreen inline-block mb-4"
              >
                Our Services
              </motion.p>
              <motion.h1
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.1 }}
                className="text-4xl md:text-5xl lg:text-6xl font-mono font-bold mb-6"
              >
                Transforming Ideas into Powerful Solutions
              </motion.h1>
              <motion.p
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.2 }}
                className="text-xl text-white/70 font-mono"
              >
                We specialize in developing innovative technology solutions that solve real business problems
              </motion.p>
            </div>
          </div>
        </section>

        {/* Terminal Section */}
        <section className="section-padding py-8">
          <div className="container mx-auto">
            <CodeTerminal />
          </div>
        </section>

        {/* Service Cards Section */}
        <section className="section-padding py-16">
          <div className="container mx-auto">
            <motion.div
              variants={containerVariants}
              initial="hidden"
              animate="visible"
              className="grid grid-cols-1 md:grid-cols-2 gap-8"
            >
              {serviceCards.map((service) => (
                <motion.div
                  key={service.id}
                  variants={itemVariants}
                  className="glass rounded-xl overflow-hidden transition-all duration-500 hover:shadow-glow hover:ring-2 hover:ring-neonGreen/50 bg-white/5"
                >
                  <div className="p-8">
                    <div className="flex items-center mb-6">
                      <div className="p-4 rounded-xl bg-neonGreen/10 mr-4">
                        {service.icon}
                      </div>
                      <h3 className="text-2xl font-mono font-semibold">{service.title}</h3>
                    </div>
                    
                    <p className="text-white/70 text-lg font-mono mb-6">{service.description}</p>
                    
                    <div className="mb-8">
                      <h4 className="font-mono font-semibold mb-4 text-neonGreen">Key Features:</h4>
                      <ul className="space-y-3">
                        {service.features.map((feature, index) => (
                          <li key={index} className="flex items-center">
                            <div className="w-2 h-2 rounded-full bg-neonGreen mr-3"></div>
                            <span className="text-white/80 font-mono">{feature}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                    
                    <Button 
                      className="button-glow bg-neonGreen text-darkBlue hover:bg-neonGreen/80 font-mono mt-4" 
                      asChild
                    >
                      <Link to={service.link}>
                        Learn More <ArrowRight className="ml-2 h-4 w-4" />
                      </Link>
                    </Button>
                  </div>
                </motion.div>
              ))}
            </motion.div>
          </div>
        </section>

        {/* Process Section */}
        <section className="section-padding bg-black/20">
          <div className="container mx-auto">
            <div className="text-center max-w-3xl mx-auto mb-16">
              <motion.p
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5 }}
                className="text-sm md:text-base font-mono font-medium px-4 py-2 rounded-full bg-neonGreen/10 text-neonGreen inline-block mb-4"
              >
                Our Process
              </motion.p>
              <motion.h2
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: 0.1 }}
                className="text-3xl md:text-4xl font-mono font-bold mb-6"
              >
                How We Deliver Results
              </motion.h2>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
              {[
                { step: "01", title: "Discovery", desc: "We analyze your business needs and identify opportunities for improvement." },
                { step: "02", title: "Planning", desc: "Our team creates a detailed roadmap and technical specifications for your solution." },
                { step: "03", title: "Development", desc: "We build your solution using cutting-edge technologies and best practices." },
                { step: "04", title: "Launch & Support", desc: "We deploy your solution and provide ongoing maintenance and enhancements." }
              ].map((item, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  className="glass p-6 rounded-xl relative"
                >
                  <div className="text-4xl font-mono font-bold text-neonGreen/30 mb-4">{item.step}</div>
                  <h3 className="text-xl font-mono font-semibold mb-3">{item.title}</h3>
                  <p className="text-white/70 font-mono">{item.desc}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
};

export default Services;
