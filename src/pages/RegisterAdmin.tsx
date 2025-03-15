
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { CircuitBoard, Loader2 } from "lucide-react";
import { Link } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";

import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";

// Define form schema with validation
const formSchema = z.object({
  email: z.string().email("Ingrese un correo electrónico válido"),
  password: z.string().min(6, "La contraseña debe tener al menos 6 caracteres"),
  responsibleName: z.string().min(2, "El nombre es requerido"),
  businessName: z.string().min(2, "El nombre de la empresa es requerido"),
});

type FormValues = z.infer<typeof formSchema>;

const RegisterAdmin: React.FC = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const navigate = useNavigate();
  const { toast } = useToast();

  // Initialize form
  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: "",
      password: "",
      responsibleName: "",
      businessName: "",
    },
  });

  const onSubmit = async (data: FormValues) => {
    setIsLoading(true);
    
    try {
      const { data: response, error } = await supabase.functions.invoke('register-admin', {
        body: {
          email: data.email,
          password: data.password,
          responsibleName: data.responsibleName,
          businessName: data.businessName,
        },
      });
      
      if (error) {
        throw error;
      }
      
      toast({
        title: "Administrador registrado",
        description: "La cuenta de administrador se ha creado correctamente.",
      });
      
      setSuccess(true);
      
      // Reset form
      form.reset();
      
      // Redirect to login after 3 seconds
      setTimeout(() => {
        navigate("/login");
      }, 3000);
      
    } catch (error: any) {
      console.error("Error al registrar administrador:", error);
      
      let errorMessage = "Ocurrió un error al registrar el administrador.";
      
      // Handle specific error messages
      if (error.message?.includes("already exists")) {
        errorMessage = "El correo electrónico ya está registrado.";
      }
      
      toast({
        title: "Error de registro",
        description: errorMessage,
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex flex-col min-h-screen bg-background">
      <header className="py-4 px-6 border-b">
        <div className="container mx-auto flex justify-between items-center">
          <Link
            to="/"
            className="flex items-center space-x-2 text-xl md:text-2xl font-mono font-semibold"
          >
            <CircuitBoard className="text-neonGreen h-7 w-7 animate-pulse-soft" />
            <span className="text-gradient">Builders AI</span>
          </Link>
        </div>
      </header>
      
      <main className="flex-grow py-12 px-4 sm:px-6 lg:px-8 flex items-center justify-center">
        <Card className="w-full max-w-md mx-auto">
          <CardHeader className="space-y-1">
            <CardTitle className="text-2xl font-bold">Registro de Administrador</CardTitle>
            <CardDescription>
              Cree una cuenta de administrador para gestionar el portal.
            </CardDescription>
          </CardHeader>
          
          {success ? (
            <CardContent>
              <Alert className="bg-green-50 border-green-200">
                <AlertTitle>Registro exitoso</AlertTitle>
                <AlertDescription>
                  La cuenta de administrador se ha creado correctamente. Será redirigido a la página de inicio de sesión en unos segundos.
                </AlertDescription>
              </Alert>
            </CardContent>
          ) : (
            <Form {...form}>
              <form onSubmit={form.handleSubmit(onSubmit)}>
                <CardContent className="space-y-4">
                  <FormField
                    control={form.control}
                    name="email"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Correo Electrónico</FormLabel>
                        <FormControl>
                          <Input
                            placeholder="correo@ejemplo.com"
                            type="email"
                            disabled={isLoading}
                            {...field}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  
                  <FormField
                    control={form.control}
                    name="password"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Contraseña</FormLabel>
                        <FormControl>
                          <Input
                            placeholder="Contraseña"
                            type="password"
                            disabled={isLoading}
                            {...field}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  
                  <FormField
                    control={form.control}
                    name="responsibleName"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Nombre del Responsable</FormLabel>
                        <FormControl>
                          <Input
                            placeholder="Nombre completo"
                            disabled={isLoading}
                            {...field}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  
                  <FormField
                    control={form.control}
                    name="businessName"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Nombre de la Empresa</FormLabel>
                        <FormControl>
                          <Input
                            placeholder="Empresa S.A."
                            disabled={isLoading}
                            {...field}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </CardContent>
                
                <CardFooter>
                  <Button 
                    type="submit" 
                    className="w-full"
                    disabled={isLoading}
                  >
                    {isLoading ? (
                      <>
                        <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                        Procesando...
                      </>
                    ) : (
                      "Registrar Administrador"
                    )}
                  </Button>
                </CardFooter>
              </form>
            </Form>
          )}
        </Card>
      </main>
    </div>
  );
};

export default RegisterAdmin;
