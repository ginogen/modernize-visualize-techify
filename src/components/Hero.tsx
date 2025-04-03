
import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { ArrowRight, BrainCircuit, Code, Bot, Puzzle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { useLanguage } from "@/contexts/LanguageContext";

const Hero = () => {
  const { t } = useLanguage();
  const [isTyping, setIsTyping] = useState(true);
  const [typedText, setTypedText] = useState("");
  const fullText = t("hero.title");

  useEffect(() => {
    if (typedText.length < fullText.length) {
      const timeout = setTimeout(() => {
        setTypedText(fullText.substring(0, typedText.length + 1));
      }, 50);
      return () => clearTimeout(timeout);
    } else {
      setIsTyping(false);
    }
  }, [typedText, fullText]);

  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        delayChildren: 0.3,
        staggerChildren: 0.2
      }
    }
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: { duration: 0.5 }
    }
  };

  return (
    <section id="hero" className="min-h-screen flex flex-col justify-center bg-darkBlue text-white overflow-hidden">
      <div className="absolute inset-0 bg-grid-pattern opacity-10"></div>
      
      <div className="container mx-auto px-4 py-24 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <motion.div
            initial="hidden"
            animate="visible"
            variants={containerVariants}
            className="flex flex-col justify-center"
          >
            <motion.div variants={itemVariants} className="mb-4">
              <span className="px-4 py-2 rounded-full bg-neonGreen/10 text-neonGreen text-sm md:text-base font-mono inline-block">
                {t("hero.badge")}
              </span>
            </motion.div>

            <motion.h1 
              variants={itemVariants} 
              className="text-4xl md:text-5xl lg:text-6xl font-mono font-bold mb-6 leading-tight"
            >
              {typedText}
              {isTyping && (
                <motion.span
                  animate={{ opacity: [0, 1, 0] }}
                  transition={{ repeat: Infinity, duration: 0.8 }}
                  className="inline-block w-2 h-8 bg-neonGreen ml-1"
                ></motion.span>
              )}
            </motion.h1>

            <motion.p 
              variants={itemVariants}
              className="text-xl text-white/70 mb-8 max-w-xl font-mono"
            >
              {t("hero.description")}
            </motion.p>

            <motion.div variants={itemVariants} className="flex flex-wrap gap-4">
              <Button className="button-glow bg-neonGreen text-darkBlue hover:bg-neonGreen/80 font-mono">
                {t("hero.get.started")} <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </motion.div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.3 }}
            className="relative"
          >
            <div className="w-full h-full absolute -right-4 top-4 border-2 border-neonGreen/30 rounded-xl"></div>
            <div className="relative overflow-hidden rounded-xl">
              <div className="bg-gradient-to-r from-neonGreen/10 to-blue-500/10 p-8 rounded-xl border border-white/10 backdrop-blur-sm">
                <div className="grid grid-cols-2 gap-8">
                  <div className="col-span-2 mb-2">
                    <div className="flex space-x-2">
                      <div className="w-3 h-3 rounded-full bg-red-500"></div>
                      <div className="w-3 h-3 rounded-full bg-yellow-500"></div>
                      <div className="w-3 h-3 rounded-full bg-green-500"></div>
                    </div>
                  </div>
                  
                  <div className="bg-darkBlue/60 p-4 rounded-lg border border-white/10">
                    <BrainCircuit className="text-neonGreen mb-2 w-8 h-8" />
                    <h3 className="text-lg font-mono font-semibold mb-1">{t("services.ai.integration")}</h3>
                    <p className="text-white/70 text-sm font-mono">{t("services.ai.integration.desc")}</p>
                  </div>
                  
                  <div className="bg-darkBlue/60 p-4 rounded-lg border border-white/10">
                    <Code className="text-neonGreen mb-2 w-8 h-8" />
                    <h3 className="text-lg font-mono font-semibold mb-1">{t("services.custom.dev")}</h3>
                    <p className="text-white/70 text-sm font-mono">{t("services.custom.dev.desc")}</p>
                  </div>
                  
                  <div className="bg-darkBlue/60 p-4 rounded-lg border border-white/10">
                    <Bot className="text-neonGreen mb-2 w-8 h-8" />
                    <h3 className="text-lg font-mono font-semibold mb-1">{t("services.chatbot")}</h3>
                    <p className="text-white/70 text-sm font-mono">{t("services.chatbot.desc")}</p>
                  </div>
                  
                  <div className="bg-darkBlue/60 p-4 rounded-lg border border-white/10">
                    <Puzzle className="text-neonGreen mb-2 w-8 h-8" />
                    <h3 className="text-lg font-mono font-semibold mb-1">{t("services.process.automation")}</h3>
                    <p className="text-white/70 text-sm font-mono">{t("services.process.automation.desc")}</p>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
      
      {/* Animated Particles */}
      <div className="absolute inset-0 pointer-events-none">
        {[...Array(20)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-2 h-2 rounded-full bg-neonGreen/30"
            initial={{ 
              x: Math.random() * 100 + "%", 
              y: Math.random() * 100 + "%", 
              opacity: Math.random() * 0.5 + 0.3 
            }}
            animate={{ 
              y: [null, Math.random() * 100 + "%"], 
              opacity: [null, Math.random() * 0.5]
            }}
            transition={{ 
              repeat: Infinity, 
              repeatType: "reverse", 
              duration: Math.random() * 10 + 10,
            }}
          />
        ))}
      </div>
    </section>
  );
};

export default Hero;
