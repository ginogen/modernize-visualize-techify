
import React from "react";
import { useOnboarding } from "@/contexts/OnboardingContext";
import { useToast } from "@/hooks/use-toast";
import { useNavigate } from "react-router-dom";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ArrowLeft, ArrowRight, Check, Loader2 } from "lucide-react";
import Step1Form from "./Step1Form";
import Step2Form from "./Step2Form";

const OnboardingSteps: React.FC = () => {
  const { currentStep, nextStep, prevStep, formData, isStepValid } = useOnboarding();
  const { toast } = useToast();
  const navigate = useNavigate();
  const [isSubmitting, setIsSubmitting] = React.useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!isStepValid(currentStep)) {
      toast({
        title: "Formulario incompleto",
        description: "Por favor complete todos los campos obligatorios.",
        variant: "destructive",
      });
      return;
    }
    
    if (currentStep < 2) {
      nextStep();
      return;
    }
    
    // Si llegamos al final, enviar datos
    setIsSubmitting(true);
    
    try {
      // Simular creación de usuario (en un caso real, llamaríamos a una API)
      console.log("Enviando datos:", formData);
      
      // Simular tiempo de procesamiento
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      // Generar contraseña automática
      const generatedPassword = Math.random().toString(36).substring(2, 10);
      console.log("Contraseña generada:", generatedPassword);
      
      toast({
        title: "¡Registro exitoso!",
        description: "Su cuenta ha sido creada correctamente.",
      });
      
      // Guardar datos en sessionStorage para usarlos en el portal
      sessionStorage.setItem("clientData", JSON.stringify(formData));
      
      // Guardar contraseña generada en sessionStorage
      sessionStorage.setItem("generatedPassword", generatedPassword);
      console.log("Contraseña guardada en sessionStorage:", generatedPassword);
      
      // Simular login y redireccionar al portal
      setTimeout(() => {
        navigate("/client-portal");
      }, 1000);
    } catch (error) {
      console.error("Error al enviar datos:", error);
      toast({
        title: "Error",
        description: "Hubo un problema al procesar su solicitud. Intente nuevamente.",
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const renderStepContent = () => {
    switch (currentStep) {
      case 1:
        return <Step1Form />;
      case 2:
        return <Step2Form />;
      default:
        return null;
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <Card className="max-w-4xl mx-auto">
        <CardHeader>
          <CardTitle className="text-2xl flex items-center">
            Paso {currentStep} de 2
            <div className="flex ml-4">
              <div className={`w-8 h-1 rounded-full mr-2 ${currentStep === 1 ? "bg-primary" : "bg-muted"}`}></div>
              <div className={`w-8 h-1 rounded-full ${currentStep === 2 ? "bg-primary" : "bg-muted"}`}></div>
            </div>
          </CardTitle>
          <CardDescription>
            {currentStep === 1
              ? "Información básica de contacto"
              : "Detalles sobre su negocio y objetivos"}
          </CardDescription>
        </CardHeader>
        
        <CardContent>
          {renderStepContent()}
        </CardContent>
        
        <CardFooter className="flex justify-between">
          {currentStep > 1 ? (
            <Button 
              type="button" 
              variant="outline" 
              onClick={prevStep}
              disabled={isSubmitting}
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
          >
            {isSubmitting ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Procesando...
              </>
            ) : currentStep < 2 ? (
              <>
                Siguiente
                <ArrowRight className="ml-2 h-4 w-4" />
              </>
            ) : (
              <>
                Finalizar
                <Check className="ml-2 h-4 w-4" />
              </>
            )}
          </Button>
        </CardFooter>
      </Card>
    </form>
  );
};

export default OnboardingSteps;
