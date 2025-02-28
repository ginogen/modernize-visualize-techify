
import { useState, useEffect, useRef } from "react";
import { motion } from "framer-motion";
import { LineChart, Zap, ShoppingCart, CreditCard, Table, BrainCircuit, Cloud, ArrowRight } from "lucide-react";

interface ServiceNode {
  id: string;
  label: string;
  icon: JSX.Element;
  position: { x: number; y: number };
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

  // Define the service nodes
  const services: ServiceNode[] = [
    {
      id: "ai",
      label: "AI Brain",
      icon: <BrainCircuit size={28} />,
      position: { x: 50, y: 50 },
      color: "#6366f1"
    },
    {
      id: "shopify",
      label: "Shopify",
      icon: <ShoppingCart size={24} />,
      position: { x: 20, y: 10 },
      color: "#10b981"
    },
    {
      id: "mercadopago",
      label: "MercadoPago",
      icon: <CreditCard size={24} />,
      position: { x: 85, y: 15 },
      color: "#3b82f6"
    },
    {
      id: "paypal",
      label: "PayPal",
      icon: <Zap size={24} />,
      position: { x: 15, y: 75 },
      color: "#ec4899"
    },
    {
      id: "googlesheets",
      label: "Google Sheets",
      icon: <Table size={24} />,
      position: { x: 80, y: 85 },
      color: "#f59e0b"
    },
    {
      id: "cloud",
      label: "Cloud Services",
      icon: <Cloud size={24} />,
      position: { x: 50, y: 90 },
      color: "#8b5cf6"
    },
    {
      id: "analytics",
      label: "Analytics",
      icon: <LineChart size={24} />,
      position: { x: 85, y: 50 },
      color: "#ef4444"
    }
  ];

  // Define the connections between services
  const connections: Connection[] = [
    { from: "ai", to: "shopify", animationDelay: 0 },
    { from: "ai", to: "mercadopago", animationDelay: 1 },
    { from: "ai", to: "paypal", animationDelay: 2 },
    { from: "ai", to: "googlesheets", animationDelay: 3 },
    { from: "ai", to: "cloud", animationDelay: 4 },
    { from: "ai", to: "analytics", animationDelay: 5 },
    { from: "shopify", to: "mercadopago", animationDelay: 6 },
    { from: "analytics", to: "googlesheets", animationDelay: 7 },
    { from: "paypal", to: "cloud", animationDelay: 8 },
    { from: "cloud", to: "googlesheets", animationDelay: 9 },
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
      { threshold: 0.3 }
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

    // Calculate control points for a curved path
    const midX = (fromX + toX) / 2;
    const midY = (fromY + toY) / 2;

    // Add some curve variation based on the nodes' positions
    const curveVariation = ((fromX - toX) * 0.2) + ((fromY - toY) * 0.2);
    
    // If it's a connection from/to AI, make it more direct
    const isAIConnection = from.id === "ai" || to.id === "ai";
    const controlPoint = isAIConnection 
      ? { x: midX, y: midY }
      : { x: midX + curveVariation, y: midY - curveVariation };

    return `M ${fromX}% ${fromY}% Q ${controlPoint.x}% ${controlPoint.y}% ${toX}% ${toY}%`;
  };

  // Animation variants
  const nodeVariants = {
    hidden: { opacity: 0, scale: 0.8 },
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
    hidden: { opacity: 0 },
    visible: { 
      opacity: 1,
      transition: {
        when: "beforeChildren",
        staggerChildren: 0.1,
        delayChildren: 0.3
      }
    }
  };

  return (
    <div className="w-full py-20 bg-darkBlue overflow-hidden" ref={containerRef}>
      <motion.div
        className="container mx-auto text-center mb-8"
        initial={{ opacity: 0, y: 20 }}
        animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
        transition={{ duration: 0.5 }}
      >
        <h2 className="text-3xl md:text-4xl font-mono font-bold mb-6 text-white">
          AI-Powered Workflow Integration
        </h2>
        <p className="text-white/70 text-lg max-w-2xl mx-auto">
          Our AI orchestrates seamless connections between your business systems and popular services
        </p>
      </motion.div>

      <motion.div 
        className="relative h-[500px] md:h-[600px] w-full max-w-5xl mx-auto"
        variants={containerVariants}
        initial="hidden"
        animate={isInView ? "visible" : "hidden"}
      >
        {/* Draw connections between services */}
        <svg className="absolute inset-0 w-full h-full" viewBox="0 0 100 100" preserveAspectRatio="none">
          {connections.map((connection) => {
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
                  strokeWidth="2"
                />
                
                {/* Animated path */}
                {isActive && (
                  <>
                    <path
                      d={getPath(fromNode, toNode)}
                      fill="none"
                      stroke={connectionColor}
                      strokeWidth="2"
                      strokeDasharray="4 2"
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
                      r="3"
                      fill={connectionColor}
                      initial={{ offset: 0 }}
                      animate={{ offset: 1 }}
                      transition={{
                        duration: 2,
                        ease: "easeInOut",
                        repeat: Infinity,
                      }}
                    >
                      <animateMotion
                        dur="2s"
                        repeatCount="indefinite"
                        path={getPath(fromNode, toNode)}
                      />
                    </motion.circle>
                    
                    {/* Arrow indicator */}
                    <motion.circle
                      cx="0"
                      cy="0"
                      r="2"
                      fill="white"
                    >
                      <animateMotion
                        dur="2s"
                        repeatCount="indefinite"
                        path={getPath(fromNode, toNode)}
                        keyPoints="0.9;1"
                        keyTimes="0;1"
                        calcMode="linear"
                      />
                    </motion.circle>
                  </>
                )}
              </g>
            );
          })}
        </svg>

        {/* Render service nodes */}
        {services.map((service) => (
          <motion.div
            key={service.id}
            className={`absolute flex flex-col items-center ${service.id === 'ai' ? 'z-20' : 'z-10'}`}
            style={{
              left: `${service.position.x}%`,
              top: `${service.position.y}%`,
              transform: "translate(-50%, -50%)"
            }}
            variants={nodeVariants}
          >
            <motion.div 
              className={`w-16 h-16 md:w-20 md:h-20 rounded-full flex items-center justify-center shadow-lg ${service.id === 'ai' ? 'shadow-indigo-500/50' : ''}`}
              style={{ 
                backgroundColor: service.id === 'ai' ? service.color : 'rgba(17, 24, 39, 0.8)', 
                backdropFilter: 'blur(8px)',
                border: `2px solid ${service.color}`
              }}
              whileHover={{ scale: 1.1 }}
              animate={
                service.id === 'ai' 
                  ? { 
                      boxShadow: [
                        `0 0 0 rgba(99, 102, 241, 0.4)`,
                        `0 0 20px rgba(99, 102, 241, 0.6)`,
                        `0 0 0 rgba(99, 102, 241, 0.4)`
                      ] 
                    }
                  : {}
              }
              transition={
                service.id === 'ai' 
                  ? { 
                      repeat: Infinity, 
                      duration: 2
                    } 
                  : {}
              }
            >
              <div className="text-white">
                {service.icon}
              </div>
              
              {service.id === 'ai' && (
                <motion.div
                  className="absolute w-full h-full rounded-full"
                  animate={{
                    boxShadow: [
                      '0 0 0 0px rgba(99, 102, 241, 0.6)',
                      '0 0 0 10px rgba(99, 102, 241, 0)'
                    ],
                    scale: [1, 1.2, 1]
                  }}
                  transition={{
                    duration: 1.5,
                    repeat: Infinity,
                    ease: "easeInOut"
                  }}
                />
              )}
            </motion.div>
            
            <div className="mt-2 text-center">
              <motion.span 
                className="text-xs md:text-sm font-medium bg-black/30 text-white px-2 py-1 rounded-full backdrop-blur-sm whitespace-nowrap"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.3 }}
              >
                {service.label}
              </motion.span>
            </div>
          </motion.div>
        ))}
        
        {/* Flowing data particles for visual effect */}
        <div className="absolute inset-0 z-0">
          {Array.from({ length: 30 }).map((_, i) => (
            <motion.div
              key={i}
              className="absolute w-1 h-1 bg-white/30 rounded-full"
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
    </div>
  );
};

export default AIWorkflow;
