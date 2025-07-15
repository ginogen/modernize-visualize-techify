import { useState, useEffect } from "react";
import { useIsMobile } from "@/hooks/use-mobile";
import { Button } from "@/components/ui/button";
import { Menu, X, UserCircle2, Home, GraduationCap, Clock } from "lucide-react";
import { Link } from "react-router-dom";
import { useLanguage } from "@/contexts/LanguageContext";
import { supabase } from "@/integrations/supabase/client";
import { motion, AnimatePresence } from "framer-motion";
import logo from "@/assets/logobuilders.png";

const Header = () => {
  const isMobile = useIsMobile();
  const [isOpen, setIsOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [isAdmin, setIsAdmin] = useState(false);
  const { t } = useLanguage();

  const handleScroll = () => {
    if (window.scrollY > 20) {
      setIsScrolled(true);
    } else {
      setIsScrolled(false);
    }
  };

  useEffect(() => {
    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  useEffect(() => {
    const checkAdmin = async () => {
      const { data: sessionData } = await supabase.auth.getSession();
      if (sessionData.session) {
        try {
          // const { data, error } = await supabase.rpc('is_admin');
          // if (!error && data) {
          //   setIsAdmin(true);
          // }
        } catch (error) {
          console.error("Error checking admin status:", error);
        }
      }
    };

    checkAdmin();
  }, []);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  const navItems = [
    { label: "Home", path: "/", icon: Home },
    { label: "Capacitación", path: "/capacitacion", icon: GraduationCap },
    { label: "48 Horas", path: "/landing-48-horas", icon: Clock },
  ];

  return (
    <>
      <header className="absolute top-0 left-0 right-0 z-50 py-6 bg-transparent">
        <div className="container mx-auto px-4 md:px-6 flex items-center justify-between">
          {/* Logo centrado */}
          <div className="flex-1 flex justify-center">
            <Link to="/" className="flex items-center space-x-2">
              <img 
                src={logo} 
                alt="Builders AI" 
                className="h-20 w-auto" 
              />
            </Link>
          </div>
          
          {/* Menú hamburguesa creativo */}
          <motion.button
            onClick={toggleMenu}
            className="relative z-50 p-3 rounded-full bg-neonGreen/10 backdrop-blur-sm border border-neonGreen/20 hover:bg-neonGreen/20 transition-all duration-300"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <motion.div
              animate={isOpen ? "open" : "closed"}
              className="w-6 h-6 flex flex-col justify-center items-center"
            >
              <motion.span
                variants={{
                  closed: { rotate: 0, y: 0 },
                  open: { rotate: 45, y: 6 }
                }}
                className="w-6 h-0.5 bg-neonGreen block absolute transition-all duration-300"
              />
              <motion.span
                variants={{
                  closed: { opacity: 1 },
                  open: { opacity: 0 }
                }}
                className="w-6 h-0.5 bg-neonGreen block absolute transition-all duration-300"
              />
              <motion.span
                variants={{
                  closed: { rotate: 0, y: 0 },
                  open: { rotate: -45, y: -6 }
                }}
                className="w-6 h-0.5 bg-neonGreen block absolute transition-all duration-300"
              />
            </motion.div>
          </motion.button>
        </div>
      </header>

      {/* Menú expandible creativo */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="fixed inset-0 z-40 bg-black/50 backdrop-blur-sm"
            onClick={toggleMenu}
          >
            <motion.div
              initial={{ x: "100%" }}
              animate={{ x: 0 }}
              exit={{ x: "100%" }}
              transition={{ type: "spring", damping: 25, stiffness: 200 }}
              className="absolute right-0 top-0 h-full w-80 bg-gradient-to-br from-darkBlue via-slate-900 to-black border-l border-neonGreen/20"
              onClick={(e) => e.stopPropagation()}
            >
              {/* Background effects */}
              <div className="absolute inset-0 overflow-hidden">
                <div className="absolute top-20 right-20 w-32 h-32 bg-neonGreen/5 rounded-full blur-3xl animate-pulse"></div>
                <div className="absolute bottom-20 left-20 w-24 h-24 bg-blue-400/5 rounded-full blur-3xl animate-pulse"></div>
              </div>

              {/* Particles */}
              <div className="absolute inset-0">
                {[...Array(20)].map((_, i) => (
                  <motion.div
                    key={i}
                    className="absolute w-1 h-1 bg-neonGreen/30 rounded-full"
                    initial={{ 
                      x: Math.random() * 320, 
                      y: Math.random() * window.innerHeight,
                      opacity: 0,
                      scale: 0
                    }}
                    animate={{ 
                      opacity: [0, 1, 0],
                      scale: [0, 1, 0],
                      y: [null, Math.random() * -100 - 50]
                    }}
                    transition={{ 
                      repeat: Infinity, 
                      duration: Math.random() * 3 + 2,
                      delay: Math.random() * 2,
                      ease: "easeOut"
                    }}
                  />
                ))}
              </div>

              {/* Content */}
              <div className="relative z-10 h-full flex flex-col justify-center items-center p-8">
                <motion.div
                  initial={{ y: 50, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{ delay: 0.2 }}
                  className="text-center mb-12"
                >
                  <h3 className="text-2xl font-bold text-white mb-2">Navegación</h3>
                  <div className="w-16 h-0.5 bg-neonGreen mx-auto"></div>
                </motion.div>

                <nav className="space-y-6 w-full">
                  {navItems.map((item, index) => (
                    <motion.div
                      key={item.label}
                      initial={{ x: 50, opacity: 0 }}
                      animate={{ x: 0, opacity: 1 }}
                      transition={{ delay: 0.3 + index * 0.1 }}
                    >
                      <Link
                        to={item.path}
                        onClick={toggleMenu}
                        className="group flex items-center space-x-4 p-4 rounded-xl bg-white/5 backdrop-blur-sm border border-white/10 hover:border-neonGreen/50 hover:bg-neonGreen/10 transition-all duration-300"
                      >
                        <div className="flex items-center justify-center w-12 h-12 rounded-lg bg-neonGreen/10 group-hover:bg-neonGreen/20 transition-colors">
                          <item.icon className="h-6 w-6 text-neonGreen" />
                        </div>
                        <div>
                          <span className="text-white font-semibold text-lg group-hover:text-neonGreen transition-colors">
                            {item.label}
                          </span>
                        </div>
                        <motion.div
                          className="ml-auto opacity-0 group-hover:opacity-100 transition-opacity"
                          whileHover={{ x: 5 }}
                        >
                          <div className="w-2 h-2 bg-neonGreen rounded-full"></div>
                        </motion.div>
                      </Link>
                    </motion.div>
                  ))}
                </nav>

                {/* Decorative elements */}
                <motion.div
                  initial={{ scale: 0, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  transition={{ delay: 0.6 }}
                  className="absolute bottom-8 left-8 right-8"
                >
                  <div className="h-px bg-gradient-to-r from-transparent via-neonGreen/50 to-transparent"></div>
                  <div className="text-center mt-4">
                    <span className="text-white/60 text-sm font-mono">Builders AI</span>
                  </div>
                </motion.div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default Header;
