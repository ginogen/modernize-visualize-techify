
import React, { createContext, useContext, useState, useEffect, ReactNode } from "react";

type Language = "es" | "en";

interface LanguageContextType {
  language: Language;
  setLanguage: (lang: Language) => void;
  t: (key: string) => string;
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

// Translation dictionaries
const translations: Record<Language, Record<string, string>> = {
  es: {
    // Login page
    "client.portal": "Portal del Cliente",
    "client.portal.description": "Ingrese sus credenciales para acceder a su portal",
    "email": "Correo electrónico",
    "password": "Contraseña",
    "login": "Iniciar sesión",
    "logging.in": "Iniciando sesión...",
    "login.success": "¡Inicio de sesión exitoso!",
    "login.welcome": "Bienvenido a su portal de cliente.",
    "login.error": "Error de inicio de sesión",
    "form.incomplete": "Formulario incompleto",
    "form.incomplete.message": "Por favor ingrese su correo electrónico y contraseña.",
    "invalid.credentials": "Credenciales inválidas. Por favor verifique su correo electrónico y contraseña.",
    "login.problem": "Hubo un problema al iniciar sesión. Intente nuevamente.",
    // Common
    "email.placeholder": "email@ejemplo.com",
  },
  en: {
    // Login page
    "client.portal": "Client Portal",
    "client.portal.description": "Enter your credentials to access your portal",
    "email": "Email",
    "password": "Password",
    "login": "Log in",
    "logging.in": "Logging in...",
    "login.success": "Login successful!",
    "login.welcome": "Welcome to your client portal.",
    "login.error": "Login error",
    "form.incomplete": "Incomplete form",
    "form.incomplete.message": "Please enter your email and password.",
    "invalid.credentials": "Invalid credentials. Please check your email and password.",
    "login.problem": "There was a problem logging in. Please try again.",
    // Common
    "email.placeholder": "email@example.com",
  }
};

interface LanguageProviderProps {
  children: ReactNode;
}

export const LanguageProvider: React.FC<LanguageProviderProps> = ({ children }) => {
  const [language, setLanguage] = useState<Language>(() => {
    // Try to get saved language or default to Spanish
    const saved = localStorage.getItem("language") as Language;
    return saved === "en" ? "en" : "es";
  });

  useEffect(() => {
    // Save language preference when it changes
    localStorage.setItem("language", language);
  }, [language]);

  const t = (key: string): string => {
    return translations[language][key] || key;
  };

  return (
    <LanguageContext.Provider value={{ language, setLanguage, t }}>
      {children}
    </LanguageContext.Provider>
  );
};

export const useLanguage = (): LanguageContextType => {
  const context = useContext(LanguageContext);
  if (context === undefined) {
    throw new Error("useLanguage must be used within a LanguageProvider");
  }
  return context;
};
