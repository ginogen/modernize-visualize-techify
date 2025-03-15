
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { useToast } from "@/hooks/use-toast";
import { UserPlus, Loader2, CircuitBoard } from "lucide-react";
import { Link } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";

const formSchema = z.object({
  email: z.string().email("Ingrese un email válido"),
  password: z.string().min(6, "La contraseña debe tener al menos 6 caracteres"),
  responsibleName: z.string().min(2, "Ingrese un nombre válido"),
  businessName: z.string().min(2, "Ingrese un nombre de empresa válido"),
});

type FormValues = z.infer<typeof formSchema>;

const RegisterAdmin = () => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const { toast } = useToast();
  const navigate = useNavigate();

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
    setIsSubmitting(true);
    setError(null);

    try {
      const { email, password, responsibleName, businessName } = data;

      // Call the register-admin edge function
      const response = await supabase.functions.invoke("register-admin", {
        body: {
          email,
          password,
          responsibleName,
          businessName,
        },
      });

      // Check for function error response
      if (response.error) {
        throw new Error(response.error.message || "Error en la comunicación con el servidor");
      }

      // Check for application error in the response data
      if (response.data && response.data.error) {
        throw new Error(response.data.error);
      }

      toast({
        title: "Registro exitoso",
        description: "El usuario administrador ha sido creado correctamente",
      });

      // Navigate to login page after successful registration
      navigate("/login");
    } catch (err: any) {
      console.error("Error registering admin:", err);
      
      // Handle specific error for existing user
      if (err.message?.includes("already been registered") || 
          err.message?.includes("Ya existe un usuario")) {
        setError("Ya existe un usuario con este correo electrónico. Por favor, utilice otro email.");
      } else {
        setError(err.message || "Hubo un error al registrar el administrador");
      }
      
      toast({
        title: "Error de registro",
        description: err.message || "Hubo un error al registrar el administrador",
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
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
              Complete el formulario para crear un nuevo usuario administrador
            </CardDescription>
          </CardHeader>
          
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)}>
              <CardContent className="space-y-4">
                {error && (
                  <Alert variant="destructive">
                    <AlertDescription>{error}</AlertDescription>
                  </Alert>
                )}
                
                <FormField
                  control={form.control}
                  name="email"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Email</FormLabel>
                      <FormControl>
                        <Input placeholder="admin@example.com" {...field} disabled={isSubmitting} />
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
                        <Input type="password" {...field} disabled={isSubmitting} />
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
                      <FormLabel>Nombre Responsable</FormLabel>
                      <FormControl>
                        <Input placeholder="Juan Pérez" {...field} disabled={isSubmitting} />
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
                      <FormLabel>Nombre de Empresa</FormLabel>
                      <FormControl>
                        <Input placeholder="Mi Empresa" {...field} disabled={isSubmitting} />
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
                  disabled={isSubmitting}
                >
                  {isSubmitting ? (
                    <>
                      <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                      Registrando...
                    </>
                  ) : (
                    <>
                      <UserPlus className="mr-2 h-4 w-4" />
                      Registrar Administrador
                    </>
                  )}
                </Button>
              </CardFooter>
            </form>
          </Form>
        </Card>
      </main>
    </div>
  );
};

export default RegisterAdmin;
