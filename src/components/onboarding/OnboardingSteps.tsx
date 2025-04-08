import React from "react";
import { useOnboarding } from "@/contexts/OnboardingContext";
import { useToast } from "@/hooks/use-toast";
import { useNavigate } from "react-router-dom";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ArrowLeft, ArrowRight, Check, Loader2 } from "lucide-react";
import Step1Form from "./Step1Form";
import Step2Form from "./Step2Form";
import { supabase } from "@/integrations/supabase/client";

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
    
    setIsSubmitting(true);
    
    try {
      console.log("Enviando datos:", formData);
      
      const response = await fetch("https://vlkcjmhppcwfcgnwjbvc.supabase.co/functions/v1/create-client", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${import.meta.env.VITE_SUPABASE_ANON_KEY || "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InZsa2NqbWhwcGN3ZmNnbndqYnZjIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDEyNjkwMjQsImV4cCI6MjA1Njg0NTAyNH0.9-lV_9vidAiczSivLkLSN_8gbLbb2b4mdnUAtQW9Kuc"}`,
        },
        body: JSON.stringify({ 
          formData,
          proposalInfo: formData.proposalId ? {
            id: formData.proposalId,
            slug: formData.proposalSlug
          } : undefined
        }),
      });
      
      const data = await response.json();
      
      if (!response.ok) {
        throw new Error(data.error || "Error al crear el cliente");
      }
      
      const { generatedPassword, userId } = data;
      
      toast({
        title: "¡Registro exitoso!",
        description: "Su cuenta ha sido creada correctamente.",
      });
      
      sessionStorage.setItem("clientData", JSON.stringify({
        ...formData,
        id: userId
      }));
      
      sessionStorage.setItem("generatedPassword", generatedPassword);
      console.log("Contraseña generada:", generatedPassword);
      
      // Now automatically log in the user
      const { error: signInError } = await supabase.auth.signInWithPassword({
        email: formData.email,
        password: generatedPassword,
      });
      
      if (signInError) {
        console.error("Error iniciando sesión automáticamente:", signInError);
        toast({
          title: "Error de inicio de sesión",
          description: "Su cuenta fue creada pero hubo un problema al iniciar sesión. Por favor, intente iniciar sesión manualmente.",
          variant: "destructive",
        });
        navigate("/login");
        return;
      }
      
      // Verificar que la sesión se creó correctamente
      const { data: { session } } = await supabase.auth.getSession();
      if (!session) {
        toast({
          title: "Error de sesión",
          description: "No se pudo establecer la sesión. Por favor, intente iniciar sesión manualmente.",
          variant: "destructive",
        });
        navigate("/login");
        return;
      }
      
      setTimeout(() => {
        navigate("/client-portal");
      }, 1000);
    } catch (error) {
      console.error("Error al enviar datos:", error);
      toast({
        title: "Error",
        description: error instanceof Error ? error.message : "Hubo un problema al procesar su solicitud. Intente nuevamente.",
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
