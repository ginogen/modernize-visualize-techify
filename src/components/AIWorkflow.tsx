import { useState, useEffect, useRef } from "react";
import { motion } from "framer-motion";
import { User, Building, MessageSquare, Headset, UserPlus, Tag, Clock, Workflow, ArrowDown, BrainCircuit } from "lucide-react";
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

  // Define the workflow nodes in a top-down structure
  const services: ServiceNode[] = [
  // Top level - User Input
  {
    id: "userInput",
    label: "User Input",
    icon: <User size={28} />,
    position: {
      x: 50,
      y: 10
    },
    color: "#6366f1" // Indigo
  },
  // Second level - Tu Empresa
  {
    id: "empresa",
    label: "Tu Empresa",
    icon: <Building size={28} />,
    position: {
      x: 50,
      y: 35
    },
    color: "#10b981" // Green
  },
  // Third level - Multiple AI Agents
  {
    id: "agenteSupport",
    label: "Agente Soporte",
    icon: <Headset size={24} />,
    position: {
      x: 25,
      y: 65
    },
    color: "#3b82f6" // Blue
  }, {
    id: "agenteReclamos",
    label: "Agente Reclamos",
    icon: <UserPlus size={24} />,
    position: {
      x: 42,
      y: 65
    },
    color: "#ec4899" // Pink
  }, {
    id: "agenteVentas",
    label: "Agente Ventas",
    icon: <Tag size={24} />,
    position: {
      x: 58,
      y: 65
    },
    color: "#f59e0b" // Amber
  }, {
    id: "agenteSeguimiento",
    label: "Agente Seguimiento",
    icon: <Clock size={24} />,
    position: {
      x: 75,
      y: 65
    },
    color: "#8b5cf6" // Purple
  },
  // AI Brain connected to all agents
  {
    id: "ai",
    label: "AI Brain",
    icon: <BrainCircuit size={28} />,
    position: {
      x: 50,
      y: 85
    },
    color: "#ef4444" // Red
  }];

  // Define the connections between nodes in the workflow
  const connections: Connection[] = [
  // User Input to Tu Empresa
  {
    from: "userInput",
    to: "empresa",
    animationDelay: 0
  },
  // Tu Empresa to all agents
  {
    from: "empresa",
    to: "agenteSupport",
    animationDelay: 1
  }, {
    from: "empresa",
    to: "agenteReclamos",
    animationDelay: 2
  }, {
    from: "empresa",
    to: "agenteVentas",
    animationDelay: 3
  }, {
    from: "empresa",
    to: "agenteSeguimiento",
    animationDelay: 4
  },
  // All agents to AI Brain
  {
    from: "agenteSupport",
    to: "ai",
    animationDelay: 5
  }, {
    from: "agenteReclamos",
    to: "ai",
    animationDelay: 6
  }, {
    from: "agenteVentas",
    to: "ai",
    animationDelay: 7
  }, {
    from: "agenteSeguimiento",
    to: "ai",
    animationDelay: 8
  }];

  // Predefined chat messages for the simulation
  const predefinedMessages: ChatMessage[] = [{
    id: 1,
    isUser: true,
    text: "Necesito información sobre mi pedido #45678"
  }, {
    id: 2,
    isUser: false,
    text: "Conectando con el agente de soporte adecuado..."
  }, {
    id: 3,
    isUser: true,
    text: "¿Cuándo llegará mi pedido?"
  }, {
    id: 4,
    isUser: false,
    text: "Según nuestro sistema, su pedido llegará mañana entre las 10:00 y 14:00."
  }, {
    id: 5,
    isUser: true,
    text: "¿Puedo cambiar la dirección de entrega?"
  }, {
    id: 6,
    isUser: false,
    text: "Consultando con el agente de seguimiento... Sí, puedo actualizar la dirección para usted."
  }, {
    id: 7,
    isUser: true,
    text: "Perfecto, gracias por la ayuda"
  }, {
    id: 8,
    isUser: false,
    text: "¡Encantado de ayudarle! ¿Necesita algo más?"
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

    // For top-down workflow, we want straighter lines with less curve
    // Calculate control points for smooth curves
    const midX = (fromX + toX) / 2;
    const midY = (fromY + toY) / 2;

    // Vertical connections should be straighter
    const isVertical = Math.abs(fromX - toX) < 10;
    const controlPoint = isVertical ? {
      x: midX,
      y: midY
    } : {
      x: midX,
      y: fromY + (toY - fromY) * 0.33
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
        <h2 className="text-3xl md:text-4xl font-mono font-bold mb-6 text-white">
          Agentes IA Conversacionales
        </h2>
        <p className="text-white/70 text-lg max-w-2xl mx-auto">
          En nuestra plataforma podemos implementar bot conversacionales que se integran en tu empresa. Bots de texto y de voz.
        </p>
      </motion.div>

      <div className="relative max-w-5xl mx-auto flex flex-col md:flex-row items-center md:items-start gap-6 px-4">
        {/* Chat Interface */}
        

        <motion.div className="relative h-[500px] md:h-[600px] w-full md:w-2/3" variants={containerVariants} initial="hidden" animate={isInView ? "visible" : "hidden"}>
          {/* Workflow background gradient */}
          <div className="absolute inset-0 bg-gradient-to-b from-indigo-500/10 via-transparent to-transparent rounded-xl opacity-30"></div>
          
          {/* Draw connections between services */}
          <svg className="absolute inset-0 w-full h-full" viewBox="0 0 100 100" preserveAspectRatio="none">
            {/* Vertical workflow line */}
            <line x1="50" y1="10" x2="50" y2="85" stroke="rgba(255, 255, 255, 0.1)" strokeWidth="1" strokeDasharray="3 3" />
            
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
                      
                      {/* Effect trail behind the main particle */}
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
                      
                      {/* Second smaller trail */}
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

                  {/* Pulse indication when a connection is active */}
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
          
          {/* Floating particles for visual effect */}
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