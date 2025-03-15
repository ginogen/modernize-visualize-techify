import { useLanguage } from "@/contexts/LanguageContext";
import { motion } from "framer-motion";
import AIWorkflow from "./AIWorkflow";
const AIWorkflowWrapper = () => {
  const {
    t
  } = useLanguage();
  return <section id="ai-workflow" className="section-padding bg-darkBlue text-white relative overflow-hidden">
      <div className="container mx-auto">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <motion.p initial={{
          opacity: 0,
          y: 20
        }} whileInView={{
          opacity: 1,
          y: 0
        }} transition={{
          duration: 0.5
        }} viewport={{
          once: true
        }} className="text-sm md:text-base font-medium px-4 py-2 rounded-full bg-neonGreen/10 text-neonGreen inline-block mb-4">
            {t("ai.workflow.title")}
          </motion.p>
          
        </div>
        
        <AIWorkflow />
      </div>
    </section>;
};
export default AIWorkflowWrapper;