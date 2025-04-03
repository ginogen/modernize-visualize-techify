
import React from "react";
import { motion } from "framer-motion";
import ChatInterface from "@/components/chat/ChatInterface";

const ChatbotDefinition: React.FC = () => {
  return (
    <div className="flex flex-col min-h-screen bg-background">
      <main className="flex-grow py-8 px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="max-w-6xl mx-auto h-[calc(100vh-120px)]"
        >
          <div className="text-center mb-8">
            <h1 className="text-3xl font-bold tracking-tight text-foreground sm:text-4xl mb-2">
              Asistente de Definición de Chatbot
            </h1>
            <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
              Comparta información detallada sobre su negocio para ayudarnos a definir su chatbot ideal
            </p>
            <p className="text-sm text-muted-foreground max-w-3xl mx-auto mt-2">
              Puede escribir o usar la función de audio para hablar directamente con el asistente
            </p>
          </div>
          
          <div className="h-[calc(100%-80px)]">
            <ChatInterface />
          </div>
        </motion.div>
      </main>
    </div>
  );
};

export default ChatbotDefinition;
