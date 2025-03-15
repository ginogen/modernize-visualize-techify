import { ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { useLanguage } from "@/contexts/LanguageContext";
const CTA = () => {
  const {
    t
  } = useLanguage();
  return <section className="section-padding bg-darkBlue">
      <div className="container mx-auto">
        <div className="relative max-w-5xl mx-auto">
          {/* Background Elements */}
          <div className="absolute -z-10 top-1/2 left-1/4 w-64 h-64 bg-neonGreen/20 rounded-full blur-3xl transform -translate-x-1/2 -translate-y-1/2 opacity-70"></div>
          <div className="absolute -z-10 top-1/2 right-1/4 w-64 h-64 bg-green-400/20 rounded-full blur-3xl transform translate-x-1/2 -translate-y-1/2 opacity-60"></div>
          
          <motion.div initial={{
          opacity: 0,
          y: 30
        }} whileInView={{
          opacity: 1,
          y: 0
        }} transition={{
          duration: 0.6
        }} viewport={{
          once: true
        }} className="glass rounded-3xl overflow-hidden shadow-xl relative bg-white/5">
            <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-br from-neonGreen/10 to-transparent pointer-events-none"></div>
            
            <div className="p-8 md:p-12 lg:p-16">
              <div className="text-center max-w-3xl mx-auto">
                <motion.h2 initial={{
                opacity: 0,
                y: 20
              }} whileInView={{
                opacity: 1,
                y: 0
              }} transition={{
                duration: 0.5,
                delay: 0.1
              }} viewport={{
                once: true
              }} className="text-3xl md:text-4xl lg:text-5xl font-mono font-bold mb-6 text-white">
                  {t("cta.title")}
                </motion.h2>
                
                <motion.p initial={{
                opacity: 0,
                y: 20
              }} whileInView={{
                opacity: 1,
                y: 0
              }} transition={{
                duration: 0.5,
                delay: 0.2
              }} viewport={{
                once: true
              }} className="text-lg md:text-xl text-white/80 mb-8 font-mono">
                  {t("cta.description")}
                </motion.p>
                
                <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                  <motion.div initial={{
                  opacity: 0,
                  y: 20
                }} whileInView={{
                  opacity: 1,
                  y: 0
                }} transition={{
                  duration: 0.4,
                  delay: 0.3
                }} viewport={{
                  once: true
                }}>
                    <Button className="button-glow px-8 py-6 text-lg bg-neonGreen text-black hover:bg-neonGreen/80 font-semibold font-mono" asChild>
                      <Link to="/contact">
                        {t("cta.schedule")} <ArrowRight className="ml-2 h-5 w-5" />
                      </Link>
                    </Button>
                  </motion.div>
                  
                  <motion.div initial={{
                  opacity: 0,
                  y: 20
                }} whileInView={{
                  opacity: 1,
                  y: 0
                }} transition={{
                  duration: 0.4,
                  delay: 0.4
                }} viewport={{
                  once: true
                }}>
                    
                  </motion.div>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>;
};
export default CTA;