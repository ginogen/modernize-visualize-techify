
import { useEffect } from "react";
import { motion } from "framer-motion";
import { ArrowRight, Check, Bot, ArrowLeft, MessageSquare } from "lucide-react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

const AIChatbots = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const features = [
    {
      title: "Natural Language Processing",
      description: "Our chatbots understand context, nuance, and complex queries to provide human-like interactions."
    },
    {
      title: "Multi-Platform Integration",
      description: "Seamlessly deploy across websites, mobile apps, messaging platforms, and social media channels."
    },
    {
      title: "Continuous Learning",
      description: "Advanced ML algorithms improve response accuracy over time based on real user interactions."
    },
    {
      title: "Analytics Dashboard",
      description: "Comprehensive reporting on user engagement, common queries, and conversation satisfaction."
    }
  ];

  return (
    <div className="min-h-screen overflow-x-hidden bg-darkBlue text-white">
      <Header />
      <main>
        {/* Hero Section */}
        <section className="section-padding">
          <div className="container mx-auto">
            <Button 
              variant="ghost" 
              size="sm" 
              className="mb-6 text-neonGreen hover:bg-neonGreen/10"
              asChild
            >
              <Link to="/services">
                <ArrowLeft className="mr-2 h-4 w-4" />
                Back to Services
              </Link>
            </Button>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
              <motion.div
                initial={{ opacity: 0, x: -30 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.5 }}
              >
                <p className="text-sm md:text-base font-mono font-medium px-4 py-2 rounded-full bg-neonGreen/10 text-neonGreen inline-block mb-4">
                  AI & Chatbot Development
                </p>
                <h1 className="text-4xl md:text-5xl font-mono font-bold mb-6">
                  Intelligent Conversational Interfaces
                </h1>
                <p className="text-xl text-white/70 font-mono mb-8">
                  Automate customer interactions, streamline operations, and enhance user experiences with our advanced AI chatbots.
                </p>
                <Button 
                  className="button-glow bg-neonGreen text-darkBlue hover:bg-neonGreen/80 font-mono" 
                  asChild
                >
                  <Link to="/contact">
                    Discuss Your Project <ArrowRight className="ml-2 h-4 w-4" />
                  </Link>
                </Button>
              </motion.div>
              
              <motion.div
                initial={{ opacity: 0, x: 30 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.5 }}
                className="relative"
              >
                <div className="absolute -right-4 -bottom-4 bg-neonGreen/10 w-full h-full rounded-xl"></div>
                <img 
                  src="https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?q=80&w=2000&auto=format&fit=crop" 
                  alt="AI Chatbot Development" 
                  className="rounded-xl relative z-10 w-full h-auto"
                />
                <div className="absolute top-4 left-4 bg-black/60 text-white px-3 py-1 rounded-full text-sm backdrop-blur-sm z-20">
                  <Bot className="inline mr-2 h-4 w-4" /> AI Solutions
                </div>
              </motion.div>
            </div>
          </div>
        </section>

        {/* Mock Chatbot Demo */}
        <section className="section-padding py-12">
          <div className="container mx-auto">
            <div className="max-w-md mx-auto">
              <div className="glass rounded-xl overflow-hidden border border-neonGreen/20">
                <div className="bg-black/40 p-4 flex items-center border-b border-neonGreen/20">
                  <Bot className="h-6 w-6 text-neonGreen mr-3" />
                  <p className="font-mono font-semibold">AI Assistant</p>
                </div>
                <div className="p-4 h-80 overflow-y-auto space-y-4">
                  <div className="flex justify-start">
                    <div className="bg-white/10 p-3 rounded-lg rounded-tl-none max-w-[80%]">
                      <p className="font-mono text-white">Hello! How can I assist you today?</p>
                    </div>
                  </div>
                  <div className="flex justify-end">
                    <div className="bg-neonGreen/20 p-3 rounded-lg rounded-tr-none max-w-[80%]">
                      <p className="font-mono text-white">I'm interested in your enterprise solutions.</p>
                    </div>
                  </div>
                  <div className="flex justify-start">
                    <div className="bg-white/10 p-3 rounded-lg rounded-tl-none max-w-[80%]">
                      <p className="font-mono text-white">Great! Our enterprise solutions include custom workflows, system integrations, and scalable architecture. Would you like to learn more about a specific aspect?</p>
                    </div>
                  </div>
                  <div className="flex justify-end">
                    <div className="bg-neonGreen/20 p-3 rounded-lg rounded-tr-none max-w-[80%]">
                      <p className="font-mono text-white">Tell me about your system integrations.</p>
                    </div>
                  </div>
                  <div className="flex justify-start">
                    <div className="bg-white/10 p-3 rounded-lg rounded-tl-none max-w-[80%]">
                      <p className="font-mono text-white">Our system integrations connect your existing software with new solutions. We specialize in API development, data synchronization, and legacy system modernization. Would you like to schedule a consultation with our integration specialist?</p>
                    </div>
                  </div>
                </div>
                <div className="p-4 border-t border-neonGreen/20 flex items-center">
                  <input
                    type="text"
                    placeholder="Type your message..."
                    className="bg-white/5 border border-white/20 rounded-full py-2 px-4 text-white font-mono w-full focus:outline-none focus:ring-2 focus:ring-neonGreen/50"
                  />
                  <Button size="icon" className="ml-2 bg-neonGreen text-darkBlue rounded-full">
                    <ArrowRight className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Features Section */}
        <section className="section-padding bg-black/20">
          <div className="container mx-auto">
            <div className="text-center max-w-3xl mx-auto mb-16">
              <motion.h2
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5 }}
                className="text-3xl md:text-4xl font-mono font-bold mb-6"
              >
                Key Features
              </motion.h2>
              <motion.p
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: 0.1 }}
                className="text-xl text-white/70 font-mono"
              >
                What makes our AI chatbots stand out from the competition
              </motion.p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {features.map((feature, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  className="glass p-6 rounded-xl flex"
                >
                  <div className="p-3 rounded-lg bg-neonGreen/10 h-fit mr-4">
                    <MessageSquare className="w-6 h-6 text-neonGreen" />
                  </div>
                  <div>
                    <h3 className="text-xl font-mono font-semibold mb-3">{feature.title}</h3>
                    <p className="text-white/70 font-mono">{feature.description}</p>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Use Cases Section */}
        <section className="section-padding">
          <div className="container mx-auto">
            <div className="text-center max-w-3xl mx-auto mb-16">
              <motion.p
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5 }}
                className="text-sm md:text-base font-mono font-medium px-4 py-2 rounded-full bg-neonGreen/10 text-neonGreen inline-block mb-4"
              >
                Applications
              </motion.p>
              <motion.h2
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: 0.1 }}
                className="text-3xl md:text-4xl font-mono font-bold mb-6"
              >
                Common Use Cases
              </motion.h2>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {[
                {
                  title: "Customer Support",
                  description: "24/7 assistance for common inquiries, troubleshooting, and service requests."
                },
                {
                  title: "Lead Generation",
                  description: "Engage website visitors, qualify leads, and schedule consultations with sales teams."
                },
                {
                  title: "Internal Operations",
                  description: "Automate HR processes, IT support, and employee onboarding procedures."
                },
                {
                  title: "E-commerce",
                  description: "Product recommendations, order tracking, and personalized shopping experiences."
                },
                {
                  title: "Healthcare",
                  description: "Appointment scheduling, symptom checking, and medication reminders."
                },
                {
                  title: "Finance",
                  description: "Account inquiries, transaction monitoring, and financial advice."
                }
              ].map((useCase, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  className="glass p-6 rounded-xl"
                >
                  <div className="p-3 rounded-lg bg-neonGreen/10 inline-block mb-4">
                    <Check className="w-6 h-6 text-neonGreen" />
                  </div>
                  <h3 className="text-xl font-mono font-semibold mb-3">{useCase.title}</h3>
                  <p className="text-white/70 font-mono">{useCase.description}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="section-padding bg-black/20">
          <div className="container mx-auto">
            <div className="glass rounded-xl overflow-hidden">
              <div className="p-8 md:p-12">
                <div className="text-center max-w-3xl mx-auto">
                  <motion.h2
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5 }}
                    className="text-3xl md:text-4xl font-mono font-bold mb-6"
                  >
                    Ready to Enhance Your Customer Interactions?
                  </motion.h2>
                  <motion.p
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5, delay: 0.1 }}
                    className="text-xl text-white/70 font-mono mb-8"
                  >
                    Schedule a demo to see how our AI chatbots can transform your business operations.
                  </motion.p>
                  <Button 
                    className="button-glow bg-neonGreen text-darkBlue hover:bg-neonGreen/80 font-mono" 
                    asChild
                  >
                    <Link to="/contact">
                      Request a Demo <ArrowRight className="ml-2 h-4 w-4" />
                    </Link>
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
};

export default AIChatbots;
