import { useState, useEffect, useRef } from "react";
import { motion } from "framer-motion";
import { LineChart, Zap, ShoppingCart, CreditCard, Table, BrainCircuit, Cloud, ArrowRight, MessageSquare, User } from "lucide-react";
interface ServiceNode {
  id: string;
  label: string;
  icon: JSX.Element;
  position: {
    x: number;
    y: number;
  };
  color: string;
}
interface Connection {
  from: string;
  to: string;
  animationDelay: number;
}
interface ChatMessage {
  id: number;
  isUser: boolean;
  text: string;
}
const AIWorkflow = () => {
  const [activeConnections, setActiveConnections] = useState<string[]>([]);
  const [chatMessages, setChatMessages] = useState<ChatMessage[]>([]);
  const [currentMessageIndex, setCurrentMessageIndex] = useState(0);
  const containerRef = useRef<HTMLDivElement>(null);
  const chatRef = useRef<HTMLDivElement>(null);
  const [isInView, setIsInView] = useState(false);

  // Define the service nodes - posiciones ajustadas para estar más juntas
  const services: ServiceNode[] = [{
    id: "ai",
    label: "AI Brain",
    icon: <BrainCircuit size={28} />,
    position: {
      x: 50,
      y: 50
    },
    color: "#6366f1"
  }, {
    id: "shopify",
    label: "Shopify",
    icon: <ShoppingCart size={24} />,
    position: {
      x: 30,
      y: 25
    },
    color: "#10b981"
  }, {
    id: "mercadopago",
    label: "MercadoPago",
    icon: <CreditCard size={24} />,
    position: {
      x: 70,
      y: 25
    },
    color: "#3b82f6"
  }, {
    id: "paypal",
    label: "PayPal",
    icon: <Zap size={24} />,
    position: {
      x: 30,
      y: 75
    },
    color: "#ec4899"
  }, {
    id: "googlesheets",
    label: "Google Sheets",
    icon: <Table size={24} />,
    position: {
      x: 70,
      y: 75
    },
    color: "#f59e0b"
  }, {
    id: "cloud",
    label: "Cloud Services",
    icon: <Cloud size={24} />,
    position: {
      x: 50,
      y: 80
    },
    color: "#8b5cf6"
  }, {
    id: "analytics",
    label: "Analytics",
    icon: <LineChart size={24} />,
    position: {
      x: 70,
      y: 50
    },
    color: "#ef4444"
  }, {
    id: "chat",
    label: "Chat",
    icon: <MessageSquare size={24} />,
    position: {
      x: 30,
      y: 50
    },
    color: "#0ea5e9"
  }];

  // Define the connections between services
  const connections: Connection[] = [{
    from: "ai",
    to: "shopify",
    animationDelay: 0
  }, {
    from: "ai",
    to: "mercadopago",
    animationDelay: 1
  }, {
    from: "ai",
    to: "paypal",
    animationDelay: 2
  }, {
    from: "ai",
    to: "googlesheets",
    animationDelay: 3
  }, {
    from: "ai",
    to: "cloud",
    animationDelay: 4
  }, {
    from: "ai",
    to: "analytics",
    animationDelay: 5
  }, {
    from: "shopify",
    to: "mercadopago",
    animationDelay: 6
  }, {
    from: "analytics",
    to: "googlesheets",
    animationDelay: 7
  }, {
    from: "paypal",
    to: "cloud",
    animationDelay: 8
  }, {
    from: "cloud",
    to: "googlesheets",
    animationDelay: 9
  }, {
    from: "ai",
    to: "chat",
    animationDelay: 1
  }, {
    from: "chat",
    to: "shopify",
    animationDelay: 3
  }];

  // Predefined chat messages for the simulation
  const predefinedMessages: ChatMessage[] = [{
    id: 1,
    isUser: true,
    text: "I need to set up an online store"
  }, {
    id: 2,
    isUser: false,
    text: "I can help with that! Connecting to Shopify..."
  }, {
    id: 3,
    isUser: true,
    text: "What payment options can I integrate?"
  }, {
    id: 4,
    isUser: false,
    text: "You can use MercadoPago and PayPal. Setting up connections..."
  }, {
    id: 5,
    isUser: true,
    text: "Can I track my inventory?"
  }, {
    id: 6,
    isUser: false,
    text: "Yes! I'll set up Google Sheets integration for your inventory tracking."
  }, {
    id: 7,
    isUser: true,
    text: "Do you offer analytics?"
  }, {
    id: 8,
    isUser: false,
    text: "Absolutely! Connecting to analytics services now."
  }];

  // Animation sequence for chat messages
  useEffect(() => {
    if (!isInView) return;
    const chatInterval = setInterval(() => {
      if (currentMessageIndex < predefinedMessages.length) {
        setChatMessages(prev => [...prev.slice(-3), predefinedMessages[currentMessageIndex]]);
        setCurrentMessageIndex(prev => (prev + 1) % predefinedMessages.length);
      }
    }, 3000);
    return () => clearInterval(chatInterval);
  }, [isInView, currentMessageIndex]);
  useEffect(() => {
    if (!isInView) return;

    // Animation to activate connections in sequence
    const timer = setTimeout(() => {
      connections.forEach((connection, index) => {
        setTimeout(() => {
          setActiveConnections(prev => [...prev, `${connection.from}-${connection.to}`]);
        }, connection.animationDelay * 700);
      });
    }, 500);

    // Reset animations periodically
    const resetTimer = setTimeout(() => {
      setActiveConnections([]);
      // After clearing, restart the animation cycle
      setTimeout(() => {
        if (containerRef.current) {
          connections.forEach((connection, index) => {
            setTimeout(() => {
              setActiveConnections(prev => [...prev, `${connection.from}-${connection.to}`]);
            }, connection.animationDelay * 700);
          });
        }
      }, 1000);
    }, connections.length * 700 + 3000);
    return () => {
      clearTimeout(timer);
      clearTimeout(resetTimer);
    };
  }, [isInView]);
  useEffect(() => {
    // Auto-scroll chat to bottom when new messages appear
    if (chatRef.current) {
      chatRef.current.scrollTop = chatRef.current.scrollHeight;
    }
  }, [chatMessages]);
  useEffect(() => {
    const observer = new IntersectionObserver(([entry]) => {
      setIsInView(entry.isIntersecting);
    }, {
      threshold: 0.3
    });
    if (containerRef.current) {
      observer.observe(containerRef.current);
    }
    return () => {
      if (containerRef.current) {
        observer.unobserve(containerRef.current);
      }
    };
  }, []);

  // Helper to calculate path between two nodes
  const getPath = (from: ServiceNode, to: ServiceNode) => {
    const fromX = from.position.x;
    const fromY = from.position.y;
    const toX = to.position.x;
    const toY = to.position.y;

    // Calculamos puntos de control para crear una curva más suave
    const midX = (fromX + toX) / 2;
    const midY = (fromY + toY) / 2;

    // Añadimos una pequeña variación a la curva basada en las posiciones
    const curveVariation = (fromX - toX) * 0.1 + (fromY - toY) * 0.1;

    // Para conexiones desde/hacia AI, hacemos que sea más directa
    const isAIConnection = from.id === "ai" || to.id === "ai";
    const controlPoint = isAIConnection ? {
      x: midX,
      y: midY
    } : {
      x: midX + curveVariation,
      y: midY - curveVariation
    };
    return `M ${fromX}% ${fromY}% Q ${controlPoint.x}% ${controlPoint.y}% ${toX}% ${toY}%`;
  };

  // Animation variants
  const nodeVariants = {
    hidden: {
      opacity: 0,
      scale: 0.8
    },
    visible: {
      opacity: 1,
      scale: 1,
      transition: {
        duration: 0.5,
        ease: "easeOut"
      }
    }
  };
  const containerVariants = {
    hidden: {
      opacity: 0
    },
    visible: {
      opacity: 1,
      transition: {
        when: "beforeChildren",
        staggerChildren: 0.1,
        delayChildren: 0.3
      }
    }
  };

  // AI "thinking" animation
  const pulseVariants = {
    pulse: {
      scale: [1, 1.05, 1],
      opacity: [0.7, 1, 0.7],
      transition: {
        duration: 2,
        repeat: Infinity,
        ease: "easeInOut"
      }
    }
  };
  return <div ref={containerRef} className="w-full bg-darkBlue overflow-hidden py-[20px]">
      <motion.div className="container mx-auto text-center mb-8" initial={{
      opacity: 0,
      y: 20
    }} animate={isInView ? {
      opacity: 1,
      y: 0
    } : {
      opacity: 0,
      y: 20
    }} transition={{
      duration: 0.5
    }}>
        <h2 className="text-3xl md:text-4xl font-mono font-bold mb-6 text-white">Agentes IA Conversacionales</h2>
        <p className="text-white/70 text-lg max-w-2xl mx-auto">En nuestra plataforma podemos implementar bot conversacionales que se integran en tu empresa. Bots de texto y de voz.</p>
      </motion.div>

      <div className="relative max-w-5xl mx-auto flex flex-col md:flex-row items-center md:items-start gap-6 px-4">
        {/* Chat Interface */}
        <motion.div className="w-full md:w-1/3 h-[300px] bg-gray-900/70 backdrop-blur-md rounded-xl border border-gray-700 shadow-lg overflow-hidden flex flex-col z-30" initial={{
        opacity: 0,
        x: -20
      }} animate={isInView ? {
        opacity: 1,
        x: 0
      } : {
        opacity: 0,
        x: -20
      }} transition={{
        duration: 0.5,
        delay: 0.2
      }}>
          <div className="bg-gray-800 p-3 border-b border-gray-700 flex items-center gap-2">
            <MessageSquare size={18} className="text-blue-400" />
            <span className="text-white font-medium">AI Assistant</span>
            <span className="ml-auto text-xs text-green-400 flex items-center gap-1">
              <span className="w-2 h-2 bg-green-400 rounded-full inline-block animate-pulse"></span>
              Online
            </span>
          </div>
          
          <div ref={chatRef} className="flex-1 overflow-y-auto p-4 space-y-3">
            {chatMessages.length === 0 ? <div className="text-gray-500 text-center text-sm h-full flex items-center justify-center">
                Start your conversation with AI
              </div> : chatMessages.map(msg => <motion.div key={msg.id} className={`flex ${msg.isUser ? 'justify-end' : 'justify-start'}`} initial={{
            opacity: 0,
            y: 10
          }} animate={{
            opacity: 1,
            y: 0
          }} transition={{
            duration: 0.3
          }}>
                  <div className={`max-w-[80%] px-3 py-2 rounded-lg ${msg.isUser ? 'bg-indigo-600 text-white rounded-tr-none' : 'bg-gray-700 text-gray-100 rounded-tl-none'}`}>
                    <div className="flex items-center gap-2 mb-1">
                      {!msg.isUser && <BrainCircuit size={14} className="text-blue-300" />}
                      <span className="text-xs opacity-75">
                        {msg.isUser ? 'You' : 'AI Assistant'}
                      </span>
                      {msg.isUser && <User size={14} className="text-indigo-300" />}
                    </div>
                    <p className="text-sm">{msg.text}</p>
                  </div>
                </motion.div>)}
          </div>
          
          <div className="bg-gray-800 p-3 border-t border-gray-700 flex items-center gap-2">
            <input type="text" className="w-full bg-gray-700 border border-gray-600 rounded-lg px-3 py-2 text-sm text-white placeholder-gray-400 focus:outline-none focus:ring-1 focus:ring-blue-500" placeholder="Type your message..." disabled />
            <button className="bg-blue-500 text-white p-2 rounded-lg hover:bg-blue-600 transition-colors">
              <ArrowRight size={16} />
            </button>
          </div>
        </motion.div>

        <motion.div className="relative h-[500px] md:h-[600px] w-full md:w-2/3" variants={containerVariants} initial="hidden" animate={isInView ? "visible" : "hidden"}>
          {/* Fondo suave para el área de los nodos */}
          <div className="absolute inset-0 bg-gradient-radial from-indigo-500/10 via-transparent to-transparent rounded-xl opacity-30"></div>
          
          {/* Draw connections between services */}
          <svg className="absolute inset-0 w-full h-full" viewBox="0 0 100 100" preserveAspectRatio="none">
            {/* Círculo central que conecta todo */}
            <circle cx="50" cy="50" r="20" fill="none" stroke="rgba(99, 102, 241, 0.1)" strokeWidth="1" strokeDasharray="2 2" className="animate-pulse" />
            
            {connections.map(connection => {
            const fromNode = services.find(s => s.id === connection.from)!;
            const toNode = services.find(s => s.id === connection.to)!;
            const isActive = activeConnections.includes(`${connection.from}-${connection.to}`);
            const connectionColor = fromNode.color;
            return <g key={`${connection.from}-${connection.to}`}>
                  {/* Base path (non-animated) */}
                  <path d={getPath(fromNode, toNode)} fill="none" stroke="rgba(255, 255, 255, 0.1)" strokeWidth="1.5" strokeDasharray="3 3" />
                  
                  {/* Animated path */}
                  {isActive && <>
                      <path d={getPath(fromNode, toNode)} fill="none" stroke={connectionColor} strokeWidth="2" strokeDasharray="3 2" className="animate-pulse">
                        <animate attributeName="stroke-dashoffset" values="0;-20" dur="1s" repeatCount="indefinite" />
                      </path>
                      
                      {/* Animated particle */}
                      <motion.circle cx="0" cy="0" r="2.5" fill={connectionColor} initial={{
                  offset: 0
                }} animate={{
                  offset: 1
                }} transition={{
                  duration: 1.5,
                  ease: "easeInOut",
                  repeat: Infinity
                }}>
                        <animateMotion dur="1.5s" repeatCount="indefinite" path={getPath(fromNode, toNode)} />
                      </motion.circle>
                      
                      {/* Efecto de estela detrás de la partícula principal */}
                      <motion.circle cx="0" cy="0" r="1.5" fill={`${connectionColor}80`} initial={{
                  offset: 0
                }} animate={{
                  offset: 1
                }} transition={{
                  duration: 1.5,
                  ease: "easeInOut",
                  repeat: Infinity,
                  delay: 0.1
                }}>
                        <animateMotion dur="1.5s" repeatCount="indefinite" path={getPath(fromNode, toNode)} keyPoints="0.05;1" keyTimes="0;1" />
                      </motion.circle>
                      
                      {/* Segunda estela más pequeña */}
                      <motion.circle cx="0" cy="0" r="1" fill={`${connectionColor}40`} initial={{
                  offset: 0
                }} animate={{
                  offset: 1
                }} transition={{
                  duration: 1.5,
                  ease: "easeInOut",
                  repeat: Infinity,
                  delay: 0.2
                }}>
                        <animateMotion dur="1.5s" repeatCount="indefinite" path={getPath(fromNode, toNode)} keyPoints="0.1;1" keyTimes="0;1" />
                      </motion.circle>
                    </>}
                </g>;
          })}
          </svg>

          {/* Render service nodes */}
          {services.map(service => {
          // Create separate variants for each service
          const serviceSpecificPulseVariants = service.id === 'ai' ? pulseVariants : {};
          return <motion.div key={service.id} className={`absolute flex flex-col items-center ${service.id === 'ai' ? 'z-20' : 'z-10'}`} style={{
            left: `${service.position.x}%`,
            top: `${service.position.y}%`,
            transform: "translate(-50%, -50%)"
          }} variants={nodeVariants} whileHover={{
            scale: 1.1
          }} animate={service.id === 'ai' ? "pulse" : undefined} {...service.id === 'ai' ? serviceSpecificPulseVariants : {}}>
                <motion.div className={`w-16 h-16 md:w-18 md:h-18 rounded-full flex items-center justify-center shadow-lg ${service.id === 'ai' ? 'shadow-indigo-500/50' : ''}`} style={{
              backgroundColor: service.id === 'ai' ? service.color : 'rgba(17, 24, 39, 0.8)',
              backdropFilter: 'blur(8px)',
              border: `2px solid ${service.color}`
            }} animate={service.id === 'ai' ? {
              boxShadow: [`0 0 0 rgba(99, 102, 241, 0.4)`, `0 0 20px rgba(99, 102, 241, 0.6)`, `0 0 0 rgba(99, 102, 241, 0.4)`]
            } : {}} transition={service.id === 'ai' ? {
              repeat: Infinity,
              duration: 2
            } : {}}>
                  <div className="text-white">
                    {service.icon}
                  </div>
                  
                  {service.id === 'ai' && <motion.div className="absolute w-full h-full rounded-full" animate={{
                boxShadow: ['0 0 0 0px rgba(99, 102, 241, 0.6)', '0 0 0 10px rgba(99, 102, 241, 0)'],
                scale: [1, 1.2, 1]
              }} transition={{
                duration: 1.5,
                repeat: Infinity,
                ease: "easeInOut"
              }} />}

                  {/* Indicación de pulso cuando una conexión está activa */}
                  {activeConnections.some(conn => conn.startsWith(service.id) || conn.endsWith(service.id)) && <motion.div className="absolute w-full h-full rounded-full" animate={{
                boxShadow: [`0 0 0 0px ${service.color}99`, `0 0 0 5px ${service.color}00`]
              }} transition={{
                duration: 1,
                repeat: Infinity,
                ease: "easeOut"
              }} />}
                </motion.div>
                
                <div className="mt-2 text-center">
                  <motion.span className="text-xs md:text-sm font-medium bg-black/30 text-white px-2 py-1 rounded-full backdrop-blur-sm whitespace-nowrap" initial={{
                opacity: 0
              }} animate={{
                opacity: 1
              }} transition={{
                delay: 0.3
              }}>
                    {service.label}
                  </motion.span>
                </div>
              </motion.div>;
        })}
          
          {/* Partículas flotantes adicionales para efecto visual */}
          <div className="absolute inset-0 z-0">
            {Array.from({
            length: 40
          }).map((_, i) => <motion.div key={i} className="absolute w-1 h-1 rounded-full" style={{
            backgroundColor: `rgba(${Math.floor(Math.random() * 150 + 100)}, ${Math.floor(Math.random() * 150 + 100)}, ${Math.floor(Math.random() * 255)}, ${Math.random() * 0.5 + 0.3})`
          }} initial={{
            x: Math.random() * 100 + "%",
            y: Math.random() * 100 + "%",
            opacity: 0
          }} animate={{
            x: Math.random() * 100 + "%",
            y: Math.random() * 100 + "%",
            opacity: [0, 0.8, 0],
            scale: [0, 1, 0]
          }} transition={{
            duration: Math.random() * 3 + 2,
            repeat: Infinity,
            repeatType: "loop",
            ease: "easeInOut",
            delay: Math.random() * 2
          }} />)}
          </div>
        </motion.div>
      </div>
    </div>;
};
export default AIWorkflow;