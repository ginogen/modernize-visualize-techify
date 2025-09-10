import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Menu, X } from "lucide-react";
import { Link } from "react-router-dom";
import { useLanguage } from "@/contexts/LanguageContext";
import logo from "@/assets/logobuilders.png";

const Header = () => {
  const [isOpen, setIsOpen] = useState(false);
  const { t } = useLanguage();

  const navItems = [
    { label: "Inicio", path: "/" },
    { label: "Servicios", path: "/services" },
    { label: "Portfolio", path: "/portfolio" },
    { label: "Capacitación", path: "/capacitacion" },
    { label: "Contacto", path: "#contact" },
  ];

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-white/80 backdrop-blur-sm border-b border-gray-100">
      <div className="container mx-auto px-6">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link to="/" className="flex items-center">
            <img 
              src={logo} 
              alt="Builders AI - Logo de la empresa de desarrollo de IA y automatización" 
              className="h-8 w-auto" 
            />
          </Link>
          
          {/* CTA Button - now always visible */}
          <div className="block">
            <Button 
              className="bg-gray-900 text-white hover:bg-gray-800 text-sm px-6 py-2"
              onClick={() => window.open('https://calendar.app.google/XXwTHc1qvikRrd2f6', '_blank')}
            >
              Agenda una consulta
            </Button>
          </div>
        </div>

      </div>
    </header>
  );
};

export default Header;