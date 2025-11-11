import React, { useState, useEffect } from "react";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ArrowLeft, ArrowRight, Check, Loader2 } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import ContactStep1 from "./ContactStep1";
import ContactStep2 from "./ContactStep2";
import ContactStep3 from "./ContactStep3";
import { saveContactFormLead, sendAutoReply } from "@/services/contactFormService";
import { 
  startFormTracking, 
  startStepTracking, 
  completeStepTracking, 
  trackContactInfoCompleted, 
  trackProjectDetailsCompleted, 
  trackCallAvailabilitySelected, 
  trackFormSubmitted,
  setupFormAbandonmentTracking,
  trackFormValidationError 
} from "@/utils/metaPixelTracking";

interface FormData {
  email: string;
  phone: string;
  name: string;
  projectType: string;
  availableForCall: string;
  preferredTime?: string;
}

const MultistepContactForm: React.FC = () => {
  const [currentStep, setCurrentStep] = useState(1);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { toast } = useToast();
  
  const [formData, setFormData] = useState<FormData>({
    email: "",
    phone: "",
    name: "",
    projectType: "",
    availableForCall: "",
    preferredTime: ""
  });

  const updateFormData = (data: Partial<FormData>) => {
    setFormData(prev => ({ ...prev, ...data }));
  };

  const getStepName = (step: number): string => {
    switch (step) {
      case 1: return 'contact_info';
      case 2: return 'project_details';
      case 3: return 'call_availability';
      default: return 'unknown';
    }
  };

  // Initialize form tracking
  useEffect(() => {
    startFormTracking();
    startStepTracking(1, getStepName(1));

    // Setup form abandonment tracking
    const cleanup = setupFormAbandonmentTracking(currentStep, getStepName);
    
    return cleanup;
  }, []);

  // Track step changes
  useEffect(() => {
    if (currentStep > 1) {
      startStepTracking(currentStep, getStepName(currentStep));
    }
  }, [currentStep]);

  const isStepValid = (step: number): boolean => {
    switch (step) {
      case 1:
        return !!(formData.email && formData.phone && formData.name);
      case 2:
        return !!(formData.projectType.trim());
      case 3:
        return !!(formData.availableForCall);
      default:
        return false;
    }
  };

  const validateCurrentStep = (): boolean => {
    const isValid = isStepValid(currentStep);
    
    if (!isValid) {
      // Track validation errors
      let missingFields: string[] = [];
      
      if (currentStep === 1) {
        if (!formData.email) missingFields.push('email');
        if (!formData.phone) missingFields.push('phone');
        if (!formData.name) missingFields.push('name');
      } else if (currentStep === 2) {
        if (!formData.projectType.trim()) missingFields.push('project_type');
      } else if (currentStep === 3) {
        if (!formData.availableForCall) missingFields.push('available_for_call');
      }

      missingFields.forEach(field => {
        trackFormValidationError(currentStep, field, 'required_field_empty');
      });
    }

    return isValid;
  };

  const nextStep = () => {
    if (validateCurrentStep()) {
      // Track step completion with specific events
      completeStepTracking(currentStep, getStepName(currentStep));
      
      switch (currentStep) {
        case 1:
          trackContactInfoCompleted();
          break;
        case 2:
          trackProjectDetailsCompleted(formData.projectType);
          break;
      }
      
      setCurrentStep(prev => prev + 1);
    }
  };

  const prevStep = () => {
    setCurrentStep(prev => prev - 1);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validateCurrentStep()) {
      toast({
        title: "Formulario incompleto",
        description: "Por favor complete todos los campos obligatorios.",
        variant: "destructive",
      });
      return;
    }
    
    if (currentStep < 3) {
      nextStep();
      return;
    }
    
    // Track final step completion
    completeStepTracking(currentStep, getStepName(currentStep));
    trackCallAvailabilitySelected(formData.availableForCall, formData.preferredTime);
    
    setIsSubmitting(true);
    
    try {
      // Prepare form data for submission
      const submissionData = {
        email: formData.email,
        phone: formData.phone,
        name: formData.name,
        project_type: formData.projectType,
        available_for_call: formData.availableForCall,
        preferred_time: formData.preferredTime
      };

      // Send email via EmailJS
      const result = await saveContactFormLead(submissionData);
      
      if (result.success) {
        // Track successful submission
        trackFormSubmitted(submissionData);
        
        // Track for Google Analytics (GTM) 
        if (typeof window !== 'undefined' && window.dataLayer) {
          window.dataLayer.push({
            'event': 'form_submission_success',
            'form_type': 'multistep_contact',
            'project_type': formData.projectType,
            'available_for_call': formData.availableForCall,
            'preferred_time': formData.preferredTime || 'not_specified'
          });
        }

        // Send auto-reply email to user
        try {
          await sendAutoReply(formData.email, formData.name);
        } catch (autoReplyError) {
          console.warn('Auto-reply failed, but main email was sent:', autoReplyError);
        }
        
        toast({
          title: "¡Formulario enviado exitosamente!",
          description: formData.availableForCall === "yes" 
            ? "Te contactaremos pronto para agendar la llamada. Revisa tu email para más información."
            : "Te contactaremos por email/WhatsApp para discutir tu proyecto. Revisa tu email para más información.",
        });
        
        // Reset form
        setFormData({
          email: "",
          phone: "",
          name: "",
          projectType: "",
          availableForCall: "",
          preferredTime: ""
        });
        setCurrentStep(1);
        
      } else {
        throw new Error(result.error || 'Error desconocido');
      }
      
    } catch (error) {
      console.error("Error al enviar formulario:", error);
      
      // Track submission error
      if (typeof window !== 'undefined' && window.dataLayer) {
        window.dataLayer.push({
          'event': 'form_submission_error',
          'form_type': 'multistep_contact',
          'error_message': error instanceof Error ? error.message : 'Unknown error'
        });
      }
      
      toast({
        title: "Error al enviar",
        description: "Hubo un problema al enviar el formulario. Intente nuevamente o contáctenos por WhatsApp.",
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const renderStepContent = () => {
    switch (currentStep) {
      case 1:
        return <ContactStep1 formData={formData} updateFormData={updateFormData} />;
      case 2:
        return <ContactStep2 formData={formData} updateFormData={updateFormData} />;
      case 3:
        return <ContactStep3 formData={formData} updateFormData={updateFormData} />;
      default:
        return null;
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <Card className="w-full border-0 shadow-none bg-transparent">
        <CardHeader className="pb-4">
          <CardTitle className="text-lg flex flex-col sm:flex-row sm:items-center gap-2 text-white">
            <span>Paso {currentStep} de 3</span>
            <div className="flex ml-0 sm:ml-4">
              <div className={`w-8 h-1 rounded-full mr-2 ${currentStep >= 1 ? "bg-blue-400" : "bg-gray-500"}`}></div>
              <div className={`w-8 h-1 rounded-full mr-2 ${currentStep >= 2 ? "bg-blue-400" : "bg-gray-500"}`}></div>
              <div className={`w-8 h-1 rounded-full ${currentStep >= 3 ? "bg-blue-400" : "bg-gray-500"}`}></div>
            </div>
          </CardTitle>
          <CardDescription className="text-sm text-gray-300">
            {currentStep === 1 && "Información básica de contacto"}
            {currentStep === 2 && "Detalles de tu proyecto"}
            {currentStep === 3 && "Disponibilidad para llamada"}
          </CardDescription>
        </CardHeader>
        
        <CardContent className="min-h-[250px]">
          {renderStepContent()}
        </CardContent>
        
        <CardFooter className="flex justify-between">
          {currentStep > 1 ? (
            <Button 
              type="button" 
              variant="outline" 
              onClick={prevStep}
              disabled={isSubmitting}
              className="bg-transparent border-gray-500 text-gray-300 hover:bg-gray-700 hover:text-white"
            >
              <ArrowLeft className="mr-2 h-4 w-4" />
              Anterior
            </Button>
          ) : (
            <div></div>
          )}
          
          <Button 
            type="submit" 
            disabled={!isStepValid(currentStep) || isSubmitting}
            className="bg-blue-600 hover:bg-blue-700 text-white border-none"
          >
            {isSubmitting ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Enviando...
              </>
            ) : currentStep < 3 ? (
              <>
                Siguiente
                <ArrowRight className="ml-2 h-4 w-4" />
              </>
            ) : (
              <>
                Enviar
                <Check className="ml-2 h-4 w-4" />
              </>
            )}
          </Button>
        </CardFooter>
      </Card>
    </form>
  );
};

export default MultistepContactForm;