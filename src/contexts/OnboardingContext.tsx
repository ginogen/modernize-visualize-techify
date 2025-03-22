
import React, { createContext, useContext, useState, useEffect } from "react";
import { useLocation } from "react-router-dom";

type ArgentinaInfo = {
  cuit: string;
  condicionFiscal: "Responsable Inscripto" | "Monotributista" | "Exento" | "Consumidor Final";
};

export type OnboardingFormData = {
  // Step 1
  responsibleName: string;
  businessName: string;
  email: string;
  website?: string;
  address: string;
  phone?: string;
  city: string;
  country: "Argentina" | "Chile" | "México" | "Colombia";
  argentinaInfo?: ArgentinaInfo;
  
  // Step 2
  businessDescription: string;
  objective: string;
  
  // Proposal reference
  proposalId?: string;
  proposalSlug?: string;
};

type OnboardingContextType = {
  formData: OnboardingFormData;
  updateFormData: (data: Partial<OnboardingFormData>) => void;
  currentStep: number;
  nextStep: () => void;
  prevStep: () => void;
  isStepValid: (step: number) => boolean;
};

const defaultFormData: OnboardingFormData = {
  responsibleName: "",
  businessName: "",
  email: "",
  website: "",
  address: "",
  phone: "",
  city: "",
  country: "Argentina",
  argentinaInfo: {
    cuit: "",
    condicionFiscal: "Responsable Inscripto",
  },
  businessDescription: "",
  objective: "",
  proposalId: "",
  proposalSlug: "",
};

const OnboardingContext = createContext<OnboardingContextType | undefined>(undefined);

export const OnboardingProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [formData, setFormData] = useState<OnboardingFormData>(defaultFormData);
  const [currentStep, setCurrentStep] = useState(1);
  const location = useLocation();

  // Extract proposal data from URL parameters when component mounts
  useEffect(() => {
    const searchParams = new URLSearchParams(location.search);
    const proposalId = searchParams.get('proposalId');
    const proposalSlug = searchParams.get('proposalSlug');

    if (proposalId && proposalSlug) {
      setFormData(prev => ({
        ...prev,
        proposalId,
        proposalSlug
      }));
    }
  }, [location]);

  const updateFormData = (data: Partial<OnboardingFormData>) => {
    setFormData((prev) => ({ ...prev, ...data }));
  };

  const nextStep = () => {
    if (currentStep < 2 && isStepValid(currentStep)) {
      setCurrentStep((prev) => prev + 1);
    }
  };

  const prevStep = () => {
    if (currentStep > 1) {
      setCurrentStep((prev) => prev - 1);
    }
  };

  const isStepValid = (step: number): boolean => {
    if (step === 1) {
      const { responsibleName, businessName, email, address, city, country } = formData;
      
      const isBasicInfoValid = !!responsibleName && !!businessName && !!email && !!address && !!city && !!country;
      
      // Validación adicional para Argentina
      if (country === "Argentina") {
        const { cuit, condicionFiscal } = formData.argentinaInfo || {};
        return isBasicInfoValid && !!cuit && !!condicionFiscal;
      }
      
      return isBasicInfoValid;
    }
    
    if (step === 2) {
      const { businessDescription, objective } = formData;
      return !!businessDescription && !!objective;
    }
    
    return false;
  };

  return (
    <OnboardingContext.Provider
      value={{
        formData,
        updateFormData,
        currentStep,
        nextStep,
        prevStep,
        isStepValid,
      }}
    >
      {children}
    </OnboardingContext.Provider>
  );
};

export const useOnboarding = () => {
  const context = useContext(OnboardingContext);
  
  if (context === undefined) {
    throw new Error("useOnboarding must be used within an OnboardingProvider");
  }
  
  return context;
};
