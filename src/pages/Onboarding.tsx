
import React from "react";
import { motion } from "framer-motion";
import { OnboardingProvider } from "@/contexts/OnboardingContext";
import OnboardingSteps from "@/components/onboarding/OnboardingSteps";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

const Onboarding: React.FC = () => {
  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      
      <main className="flex-grow py-12 px-4 sm:px-6 lg:px-8 bg-background">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="max-w-7xl mx-auto"
        >
          <div className="text-center mb-12">
            <h1 className="text-4xl font-bold tracking-tight text-foreground sm:text-5xl mb-4">
              Comencemos
            </h1>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              Complete la siguiente información para iniciar su experiencia con nosotros
            </p>
          </div>
          
          <OnboardingProvider>
            <OnboardingSteps />
          </OnboardingProvider>
        </motion.div>
      </main>
      
      <Footer />
    </div>
  );
};

export default Onboarding;
