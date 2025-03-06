
import { useLocation, Link } from "react-router-dom";
import { useEffect } from "react";
import { useLanguage } from "@/contexts/LanguageContext";

const NotFound = () => {
  const location = useLocation();
  const { language } = useLanguage();

  useEffect(() => {
    console.error(
      "404 Error: User attempted to access non-existent route:",
      location.pathname
    );
  }, [location.pathname]);

  const translations = {
    title: language === "es" ? "404" : "404",
    message: language === "es" ? "¡Ups! Página no encontrada" : "Oops! Page not found",
    backLink: language === "es" ? "Volver al Inicio" : "Return to Home"
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="text-center">
        <h1 className="text-4xl font-bold mb-4">{translations.title}</h1>
        <p className="text-xl text-gray-600 mb-4">{translations.message}</p>
        <Link to="/" className="text-blue-500 hover:text-blue-700 underline">
          {translations.backLink}
        </Link>
      </div>
    </div>
  );
};

export default NotFound;
