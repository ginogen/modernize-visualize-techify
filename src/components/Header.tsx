
import { useState, useEffect } from "react";
import { useIsMobile } from "@/hooks/use-mobile";
import { Button } from "@/components/ui/button";
import { Menu, X, CircuitBoard } from "lucide-react";
import { Link } from "react-router-dom";

const Header = () => {
  const isMobile = useIsMobile();
  const [isOpen, setIsOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

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

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  const navItems = [
    { label: "Home", path: "/" },
    { label: "Services", path: "/services" },
    { label: "Portfolio", path: "/portfolio" },
    { label: "About", path: "/about" },
    { label: "Contact", path: "/contact" },
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
          className="flex items-center space-x-2 text-xl md:text-2xl font-mono font-semibold"
        >
          <CircuitBoard className="text-neonGreen h-7 w-7 animate-pulse-soft" />
          <span className="text-gradient">Builders AI</span>
        </Link>
        
        {/* Desktop Navigation */}
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
            <Button className="ml-4 button-glow bg-neonGreen text-black hover:bg-neonGreen/80 font-mono">Get Started</Button>
          </nav>
        )}
        
        {/* Mobile Navigation Toggle */}
        {isMobile && (
          <button onClick={toggleMenu} className="md:hidden p-2 text-foreground" aria-label="Toggle menu">
            {isOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        )}
      </div>
      
      {/* Mobile Navigation Menu */}
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
              Get Started
            </Button>
          </nav>
        </div>
      )}
    </header>
  );
};

export default Header;
