import { useState, useEffect, useRef } from "react";
import { motion } from "framer-motion";
import { 
  User, Building, MessageSquare, Headset, UserPlus, 
  Tag, Clock, BrainCircuit
} from "lucide-react";

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

const AIWorkflow = () => {
  const [activeConnections, setActiveConnections] = useState<string[]>([]);
  const containerRef = useRef<HTMLDivElement>(null);
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
        y: 30
      },
      color: "#10b981" // Green
    },
    // Brain AI
    {
      id: "ai",
      label: "Brain AI",
      icon: <BrainCircuit size={32} />,
      position: {
        x: 50,
        y: 50
      },
      color: "#ef4444" // Red
    },
    // Bottom level - multiple AI Agents in a row
    {
      id: "agenteSupport",
      label: "Agente Soporte",
      icon: <Headset size={24} />,
      position: {
        x: 20,
        y: 70
      },
      color: "#3b82f6" // Blue
    },
    {
      id: "agenteReclamos",
      label: "Agente Reclamos",
      icon: <UserPlus size={24} />,
      position: {
        x: 40,
        y: 70
      },
      color: "#ec4899" // Pink
    },
    {
      id: "agenteVentas",
      label: "Agente Ventas",
      icon: <Tag size={24} />,
      position: {
        x: 60,
        y: 70
      },
      color: "#f59e0b" // Amber
    },
    {
      id: "agenteSeguimiento",
      label: "Agente Seguimiento",
      icon: <Clock size={24} />,
      position: {
        x: 80,
        y: 70
      },
      color: "#8b5cf6" // Purple
    }
  ];

  // Define the connections between nodes in the workflow
  const connections: Connection[] = [
    // User Input to Tu Empresa
    {
      from: "userInput",
      to: "empresa",
      animationDelay: 0
    },
    // Tu Empresa to Brain AI
    {
      from: "empresa",
      to: "ai",
      animationDelay: 1
    },
    // Brain AI to all agents
    {
      from: "ai",
      to: "agenteSupport",
      animationDelay: 2
    },
    {
      from: "ai",
      to: "agenteReclamos",
      animationDelay: 3
    },
    {
      from: "ai",
      to: "agenteVentas",
      animationDelay: 4
    },
    {
      from: "ai",
      to: "agenteSeguimiento",
      animationDelay: 5
    }
  ];

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
    const observer = new IntersectionObserver(
      ([entry]) => {
        setIsInView(entry.isIntersecting);
      },
      {
        threshold: 0.3
      }
    );

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
    const controlPoint = isVertical
      ? { x: midX, y: midY }
      : { x: midX, y: fromY + (toY - fromY) * 0.33 };

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

  return (
    <div ref={containerRef} className="w-full bg-darkBlue overflow-hidden py-16">
      <motion.div
        className="container mx-auto text-center mb-12"
        initial={{ opacity: 0, y: 20 }}
        animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
        transition={{ duration: 0.5 }}
      >
        <h2 className="text-3xl md:text-4xl font-mono font-bold mb-6 text-white">
          Agentes IA Conversacionales
        </h2>
        <p className="text-white/70 text-lg max-w-2xl mx-auto">
          En nuestra plataforma podemos implementar bot conversacionales que se integran en tu empresa. Bots de texto y de voz.
        </p>
      </motion.div>

      <motion.div
        className="relative max-w-6xl h-[600px] mx-auto"
        variants={containerVariants}
        initial="hidden"
        animate={isInView ? "visible" : "hidden"}
      >
        {/* Workflow background effects */}
        <div className="absolute inset-0 bg-gradient-to-b from-indigo-500/10 via-transparent to-transparent rounded-xl opacity-30"></div>
        
        {/* Grid background */}
        <div className="absolute inset-0 bg-grid-pattern opacity-5"></div>
        
        {/* Draw connections between services */}
        <svg className="absolute inset-0 w-full h-full" viewBox="0 0 100 100" preserveAspectRatio="none">
          {/* Vertical workflow line */}
          <line x1="50" y1="10" x2="50" y2="50" stroke="rgba(255, 255, 255, 0.1)" strokeWidth="1" strokeDasharray="3 3" />
          
          {connections.map(connection => {
            const fromNode = services.find(s => s.id === connection.from)!;
            const toNode = services.find(s => s.id === connection.to)!;
            const isActive = activeConnections.includes(`${connection.from}-${connection.to}`);
            const connectionColor = fromNode.color;
            
            return (
              <g key={`${connection.from}-${connection.to}`}>
                {/* Base path (non-animated) */}
                <path
                  d={getPath(fromNode, toNode)}
                  fill="none"
                  stroke="rgba(255, 255, 255, 0.1)"
                  strokeWidth="1.5"
                  strokeDasharray="3 3"
                />
                
                {/* Animated path */}
                {isActive && (
                  <>
                    <path
                      d={getPath(fromNode, toNode)}
                      fill="none"
                      stroke={connectionColor}
                      strokeWidth="2"
                      strokeDasharray="3 2"
                      className="animate-pulse"
                    >
                      <animate
                        attributeName="stroke-dashoffset"
                        values="0;-20"
                        dur="1s"
                        repeatCount="indefinite"
                      />
                    </path>
                    
                    {/* Animated particle */}
                    <motion.circle
                      cx="0"
                      cy="0"
                      r="2.5"
                      fill={connectionColor}
                      initial={{ offset: 0 }}
                      animate={{ offset: 1 }}
                      transition={{
                        duration: 1.5,
                        ease: "easeInOut",
                        repeat: Infinity
                      }}
                    >
                      <animateMotion
                        dur="1.5s"
                        repeatCount="indefinite"
                        path={getPath(fromNode, toNode)}
                      />
                    </motion.circle>
                    
                    {/* Effect trail behind the main particle */}
                    <motion.circle
                      cx="0"
                      cy="0"
                      r="1.5"
                      fill={`${connectionColor}80`}
                      initial={{ offset: 0 }}
                      animate={{ offset: 1 }}
                      transition={{
                        duration: 1.5,
                        ease: "easeInOut",
                        repeat: Infinity,
                        delay: 0.1
                      }}
                    >
                      <animateMotion
                        dur="1.5s"
                        repeatCount="indefinite"
                        path={getPath(fromNode, toNode)}
                        keyPoints="0.05;1"
                        keyTimes="0;1"
                      />
                    </motion.circle>
                    
                    {/* Second smaller trail */}
                    <motion.circle
                      cx="0"
                      cy="0"
                      r="1"
                      fill={`${connectionColor}40`}
                      initial={{ offset: 0 }}
                      animate={{ offset: 1 }}
                      transition={{
                        duration: 1.5,
                        ease: "easeInOut",
                        repeat: Infinity,
                        delay: 0.2
                      }}
                    >
                      <animateMotion
                        dur="1.5s"
                        repeatCount="indefinite"
                        path={getPath(fromNode, toNode)}
                        keyPoints="0.1;1"
                        keyTimes="0;1"
                      />
                    </motion.circle>
                  </>
                )}
              </g>
            );
          })}
        </svg>

        {/* Render service nodes */}
        {services.map(service => {
          // Create separate variants for each service
          const serviceSpecificPulseVariants = service.id === 'ai' ? pulseVariants : {};
          
          return (
            <motion.div
              key={service.id}
              className={`absolute flex flex-col items-center ${service.id === 'ai' ? 'z-20' : 'z-10'}`}
              style={{
                left: `${service.position.x}%`,
                top: `${service.position.y}%`,
                transform: "translate(-50%, -50%)"
              }}
              variants={nodeVariants}
              whileHover={{ scale: 1.1 }}
              animate={service.id === 'ai' ? "pulse" : undefined}
              {...(service.id === 'ai' ? serviceSpecificPulseVariants : {})}
            >
              <motion.div
                className="glassmorphism rounded-xl p-5 flex flex-col items-center justify-center"
                style={{
                  backgroundColor: 'rgba(17, 24, 39, 0.7)',
                  backdropFilter: 'blur(8px)',
                  border: `2px solid ${service.color}`,
                  boxShadow: `0 0 15px ${service.color}50`
                }}
                animate={
                  service.id === 'ai'
                    ? {
                        boxShadow: [
                          `0 0 5px ${service.color}40`,
                          `0 0 20px ${service.color}60`,
                          `0 0 5px ${service.color}40`
                        ]
                      }
                    : {}
                }
                transition={
                  service.id === 'ai'
                    ? {
                        repeat: Infinity,
                        duration: 3
                      }
                    : {}
                }
              >
                <div 
                  className="rounded-full p-3 mb-2" 
                  style={{ 
                    backgroundColor: `${service.color}20`
                  }}
                >
                  <div className="text-white" style={{ color: service.color }}>
                    {service.icon}
                  </div>
                </div>
                
                <span className="text-white font-mono font-semibold whitespace-nowrap">
                  {service.label}
                </span>
                
                {service.id === 'ai' && (
                  <motion.div
                    className="absolute w-full h-full rounded-xl"
                    animate={{
                      boxShadow: ['0 0 0 0px rgba(99, 102, 241, 0.6)', '0 0 0 10px rgba(99, 102, 241, 0)'],
                      scale: [1, 1.1, 1]
                    }}
                    transition={{
                      duration: 2,
                      repeat: Infinity,
                      ease: "easeInOut"
                    }}
                  />
                )}

                {/* Pulse indication when a connection is active */}
                {activeConnections.some(
                  conn => conn.startsWith(service.id) || conn.endsWith(service.id)
                ) && (
                  <motion.div
                    className="absolute w-full h-full rounded-xl"
                    animate={{
                      boxShadow: [`0 0 0 0px ${service.color}99`, `0 0 0 5px ${service.color}00`]
                    }}
                    transition={{
                      duration: 1,
                      repeat: Infinity,
                      ease: "easeOut"
                    }}
                  />
                )}
              </motion.div>
            </motion.div>
          );
        })}
        
        {/* Floating particles for visual effect */}
        <div className="absolute inset-0 z-0">
          {Array.from({ length: 40 }).map((_, i) => (
            <motion.div
              key={i}
              className="absolute w-1 h-1 rounded-full"
              style={{
                backgroundColor: `rgba(${Math.floor(Math.random() * 150 + 100)}, ${Math.floor(
                  Math.random() * 150 + 100
                )}, ${Math.floor(Math.random() * 255)}, ${Math.random() * 0.5 + 0.3})`
              }}
              initial={{
                x: Math.random() * 100 + "%",
                y: Math.random() * 100 + "%",
                opacity: 0
              }}
              animate={{
                x: Math.random() * 100 + "%",
                y: Math.random() * 100 + "%",
                opacity: [0, 0.8, 0],
                scale: [0, 1, 0]
              }}
              transition={{
                duration: Math.random() * 3 + 2,
                repeat: Infinity,
                repeatType: "loop",
                ease: "easeInOut",
                delay: Math.random() * 2
              }}
            />
          ))}
        </div>
      </motion.div>
      
      <style>{`
        .glassmorphism {
          backdrop-filter: blur(10px);
          background-color: rgba(17, 24, 39, 0.7);
          box-shadow: 0 8px 32px 0 rgba(31, 38, 135, 0.37);
        }
      `}</style>
    </div>
  );
};

export default AIWorkflow;
