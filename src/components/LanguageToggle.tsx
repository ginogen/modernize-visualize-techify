
import React from "react";
import { useLanguage } from "@/contexts/LanguageContext";
import { Button } from "@/components/ui/button";
import { Globe } from "lucide-react";

const LanguageToggle: React.FC = () => {
  const { language, setLanguage } = useLanguage();
  
  const toggleLanguage = () => {
    setLanguage(language === "es" ? "en" : "es");
  };
  
  return (
    <Button
      variant="ghost"
      size="sm"
      onClick={toggleLanguage}
      className="flex items-center gap-1 px-2"
    >
      <Globe className="w-4 h-4" />
      <span>{language.toUpperCase()}</span>
    </Button>
  );
};

export default LanguageToggle;
