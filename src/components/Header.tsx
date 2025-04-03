import { useState, useEffect } from "react";
import { useIsMobile } from "@/hooks/use-mobile";
import { Button } from "@/components/ui/button";
import { Menu, X, UserCircle2 } from "lucide-react";
import { Link } from "react-router-dom";
import { useLanguage } from "@/contexts/LanguageContext";
import { supabase } from "@/integrations/supabase/client";
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
          const { data, error } = await supabase.rpc('is_admin');
          if (!error && data) {
            setIsAdmin(true);
          }
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
    { label: t("nav.home"), path: "/" },
    ...(isAdmin ? [{ label: "Admin", path: "/admin" }] : []),
  ];

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled
          ? "py-4 glass shadow-md"
          : "py-6 bg-transparent"
      }`}
    >
      <div className="container mx-auto px-4 md:px-6 flex items-center justify-between">
        <Link
          to="/"
          className="flex items-center space-x-2"
        >
          <img 
            src={logo} 
            alt="Builders AI" 
            className="h-20 w-auto" 
          />
        </Link>
        
        {!isMobile && (
          <nav className="hidden md:flex items-center space-x-1">
            {navItems.map((item) => (
              <Link
                key={item.label}
                to={item.path}
                className="px-4 py-2 text-foreground/80 hover:text-neonGreen font-mono rounded-md transition-colors duration-200"
              >
                {item.label}
              </Link>
            ))}
            <Button className="ml-4 button-glow bg-neonGreen text-black hover:bg-neonGreen/80 font-mono">
              {t("nav.get.started")}
            </Button>
            <Link to="/login" className="ml-2">
              <Button variant="outline" size="icon">
                <UserCircle2 className="h-5 w-5" />
              </Button>
            </Link>
          </nav>
        )}
        
        {isMobile && (
          <div className="flex items-center">
            <Link to="/login" className="mr-2">
              <Button variant="outline" size="icon">
                <UserCircle2 className="h-5 w-5" />
              </Button>
            </Link>
            <button onClick={toggleMenu} className="md:hidden p-2 text-foreground" aria-label="Toggle menu">
              {isOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        )}
      </div>
      
      {isMobile && (
        <div
          className={`fixed inset-0 bg-background/90 backdrop-blur-lg pt-20 transition-transform duration-300 ease-in-out z-40 ${
            isOpen ? "translate-x-0" : "translate-x-full"
          }`}
        >
          <nav className="flex flex-col items-center justify-center h-full space-y-6 p-4">
            {navItems.map((item) => (
              <Link
                key={item.label}
                to={item.path}
                className="px-4 py-3 text-lg font-mono font-medium text-foreground/80 hover:text-neonGreen transition-colors duration-200 w-full text-center"
                onClick={() => setIsOpen(false)}
              >
                {item.label}
              </Link>
            ))}
            <Button className="mt-4 w-full button-glow bg-neonGreen text-black hover:bg-neonGreen/80 font-mono" onClick={() => setIsOpen(false)}>
              {t("nav.get.started")}
            </Button>
          </nav>
        </div>
      )}
    </header>
  );
};

export default Header;
