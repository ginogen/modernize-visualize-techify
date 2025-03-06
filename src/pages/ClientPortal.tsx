
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";
import Footer from "@/components/Footer";
import { Separator } from "@/components/ui/separator";
import { CheckCircle2, CreditCard, Eye, EyeOff, FileText, LogOut, User, CircuitBoard } from "lucide-react";
import { OnboardingFormData } from "@/contexts/OnboardingContext";
import { Input } from "@/components/ui/input";
import { Link } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";

const ClientPortal: React.FC = () => {
  const [clientData, setClientData] = useState<OnboardingFormData | null>(null);
  const [loading, setLoading] = useState(true);
  const [showPassword, setShowPassword] = useState(false);
  const [password, setPassword] = useState("");
  const navigate = useNavigate();
  const { toast } = useToast();
  
  useEffect(() => {
    const checkAuth = async () => {
      // Check if user is authenticated
      const { data: { session } } = await supabase.auth.getSession();
      
      if (!session) {
        toast({
          title: "Acceso denegado",
          description: "Por favor inicie sesión para acceder al portal.",
          variant: "destructive",
        });
        navigate("/login");
        return;
      }
      
      // Try to get data from sessionStorage first
      const savedData = sessionStorage.getItem("clientData");
      const generatedPassword = sessionStorage.getItem("generatedPassword");
      
      if (savedData) {
        setClientData(JSON.parse(savedData));
      } else {
        // If not in sessionStorage, fetch from Supabase
        const { data: profileData, error } = await supabase
          .from('profiles')
          .select('*')
          .eq('id', session.user.id)
          .single();
          
        if (error) {
          console.error("Error fetching profile:", error);
          toast({
            title: "Error",
            description: "No se pudo cargar la información del perfil.",
            variant: "destructive",
          });
          navigate("/login");
          return;
        }
        
        if (profileData) {
          setClientData(profileData as unknown as OnboardingFormData);
          sessionStorage.setItem("clientData", JSON.stringify(profileData));
        } else {
          toast({
            title: "Perfil no encontrado",
            description: "No se encontró información de perfil para este usuario.",
            variant: "destructive",
          });
          navigate("/login");
          return;
        }
      }
      
      // Set password from sessionStorage if available
      if (generatedPassword) {
        setPassword(generatedPassword);
      } else {
        setPassword("(Contraseña no disponible)");
      }
      
      setLoading(false);
    };
    
    checkAuth();
  }, [navigate, toast]);

  const handleLogout = async () => {
    try {
      await supabase.auth.signOut();
      sessionStorage.removeItem("clientData");
      sessionStorage.removeItem("generatedPassword");
      
      toast({
        title: "Sesión cerrada",
        description: "Ha cerrado sesión correctamente.",
      });
      
      navigate("/login");
    } catch (error) {
      console.error("Error closing session:", error);
      toast({
        title: "Error",
        description: "Hubo un problema al cerrar sesión. Intente nuevamente.",
        variant: "destructive",
      });
    }
  };

  const toggleShowPassword = () => {
    setShowPassword(!showPassword);
  };

  if (loading) {
    return (
      <div className="flex flex-col min-h-screen">
        <div className="flex-grow flex items-center justify-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
        </div>
        <Footer />
      </div>
    );
  }

  return (
    <div className="flex flex-col min-h-screen">
      <header className="py-4 px-6 bg-background border-b">
        <div className="container mx-auto flex items-center justify-between">
          <Link
            to="/"
            className="flex items-center space-x-2 text-xl md:text-2xl font-mono font-semibold"
          >
            <CircuitBoard className="text-neonGreen h-7 w-7 animate-pulse-soft" />
            <span className="text-gradient">Builders AI</span>
          </Link>
          
          <Button variant="ghost" onClick={handleLogout} className="flex items-center gap-2">
            <LogOut size={16} />
            Cerrar sesión
          </Button>
        </div>
      </header>
      
      <main className="flex-grow py-12 px-4 sm:px-6 lg:px-8 bg-background">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="max-w-7xl mx-auto"
        >
          <div className="flex flex-col md:flex-row gap-6">
            <aside className="w-full md:w-64">
              <Card>
                <CardHeader>
                  <CardTitle>Portal del Cliente</CardTitle>
                  <CardDescription>{clientData?.businessName}</CardDescription>
                </CardHeader>
                <CardContent className="p-0">
                  <nav className="flex flex-col">
                    <Button variant="ghost" className="justify-start h-12 px-4">
                      <User className="mr-2 h-4 w-4" />
                      Perfil
                    </Button>
                    <Button variant="ghost" className="justify-start h-12 px-4">
                      <FileText className="mr-2 h-4 w-4" />
                      Propuestas
                    </Button>
                    <Button variant="ghost" className="justify-start h-12 px-4">
                      <CreditCard className="mr-2 h-4 w-4" />
                      Pagos
                    </Button>
                  </nav>
                </CardContent>
              </Card>
            </aside>
            
            <div className="flex-grow">
              <Tabs defaultValue="profile">
                <TabsList className="mb-6">
                  <TabsTrigger value="profile">Perfil</TabsTrigger>
                  <TabsTrigger value="proposal">Propuesta</TabsTrigger>
                  <TabsTrigger value="payment">Pagos</TabsTrigger>
                </TabsList>
                
                <TabsContent value="profile">
                  <Card>
                    <CardHeader>
                      <CardTitle>Información del Cliente</CardTitle>
                      <CardDescription>
                        Datos de contacto y empresa
                      </CardDescription>
                    </CardHeader>
                    <CardContent>
                      <dl className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        <div>
                          <dt className="text-sm font-medium text-muted-foreground">Nombre Responsable</dt>
                          <dd className="mt-1 text-base">{clientData?.responsibleName}</dd>
                        </div>
                        <div>
                          <dt className="text-sm font-medium text-muted-foreground">Empresa</dt>
                          <dd className="mt-1 text-base">{clientData?.businessName}</dd>
                        </div>
                        <div>
                          <dt className="text-sm font-medium text-muted-foreground">Email</dt>
                          <dd className="mt-1 text-base">{clientData?.email}</dd>
                        </div>
                        <div>
                          <dt className="text-sm font-medium text-muted-foreground">Contraseña</dt>
                          <dd className="mt-1 text-base relative">
                            <div className="flex items-center">
                              <Input 
                                type={showPassword ? "text" : "password"} 
                                value={password} 
                                className="pr-10" 
                                readOnly
                              />
                              <Button 
                                type="button" 
                                variant="ghost" 
                                size="icon" 
                                className="absolute right-0 top-0"
                                onClick={toggleShowPassword}
                              >
                                {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
                              </Button>
                            </div>
                          </dd>
                        </div>
                        {clientData?.website && (
                          <div>
                            <dt className="text-sm font-medium text-muted-foreground">Sitio Web</dt>
                            <dd className="mt-1 text-base">{clientData.website}</dd>
                          </div>
                        )}
                        <div>
                          <dt className="text-sm font-medium text-muted-foreground">Dirección</dt>
                          <dd className="mt-1 text-base">{clientData?.address}</dd>
                        </div>
                        {clientData?.phone && (
                          <div>
                            <dt className="text-sm font-medium text-muted-foreground">Teléfono</dt>
                            <dd className="mt-1 text-base">{clientData.phone}</dd>
                          </div>
                        )}
                        <div>
                          <dt className="text-sm font-medium text-muted-foreground">Ciudad</dt>
                          <dd className="mt-1 text-base">{clientData?.city}</dd>
                        </div>
                        <div>
                          <dt className="text-sm font-medium text-muted-foreground">País</dt>
                          <dd className="mt-1 text-base">{clientData?.country}</dd>
                        </div>
                      </dl>
                      
                      {clientData?.country === "Argentina" && clientData.argentinaInfo && (
                        <>
                          <Separator className="my-6" />
                          <h3 className="text-lg font-medium mb-4">Información fiscal</h3>
                          <dl className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                            <div>
                              <dt className="text-sm font-medium text-muted-foreground">CUIT</dt>
                              <dd className="mt-1 text-base">{clientData.argentinaInfo.cuit}</dd>
                            </div>
                            <div>
                              <dt className="text-sm font-medium text-muted-foreground">Condición Fiscal</dt>
                              <dd className="mt-1 text-base">{clientData.argentinaInfo.condicionFiscal}</dd>
                            </div>
                          </dl>
                        </>
                      )}
                      
                      <Separator className="my-6" />
                      <h3 className="text-lg font-medium mb-4">Sobre su negocio</h3>
                      <dl className="space-y-4">
                        <div>
                          <dt className="text-sm font-medium text-muted-foreground">Descripción</dt>
                          <dd className="mt-1 text-base">{clientData?.businessDescription}</dd>
                        </div>
                        <div>
                          <dt className="text-sm font-medium text-muted-foreground">Objetivo</dt>
                          <dd className="mt-1 text-base">{clientData?.objective}</dd>
                        </div>
                      </dl>
                    </CardContent>
                  </Card>
                </TabsContent>
                
                <TabsContent value="proposal">
                  <Card>
                    <CardHeader>
                      <CardTitle>Propuesta de Servicios</CardTitle>
                      <CardDescription>
                        Detalles de la propuesta adaptada a sus necesidades
                      </CardDescription>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-8">
                        <div className="bg-accent/50 p-6 rounded-lg border">
                          <h3 className="text-xl font-semibold mb-4">Plan Personalizado</h3>
                          <p className="text-muted-foreground mb-6">
                            Basado en la información proporcionada, hemos preparado esta propuesta adaptada a sus necesidades específicas.
                          </p>
                          
                          <ul className="space-y-2">
                            <li className="flex items-start">
                              <CheckCircle2 className="h-5 w-5 text-primary mr-2 mt-0.5 flex-shrink-0" />
                              <span>Servicio personalizado según sus objetivos</span>
                            </li>
                            <li className="flex items-start">
                              <CheckCircle2 className="h-5 w-5 text-primary mr-2 mt-0.5 flex-shrink-0" />
                              <span>Soporte técnico dedicado durante todo el proceso</span>
                            </li>
                            <li className="flex items-start">
                              <CheckCircle2 className="h-5 w-5 text-primary mr-2 mt-0.5 flex-shrink-0" />
                              <span>Actualizaciones y mejoras continuas</span>
                            </li>
                            <li className="flex items-start">
                              <CheckCircle2 className="h-5 w-5 text-primary mr-2 mt-0.5 flex-shrink-0" />
                              <span>Informes de progreso mensuales</span>
                            </li>
                          </ul>
                        </div>
                        
                        <div>
                          <h3 className="text-lg font-medium mb-4">Próximos pasos</h3>
                          <ol className="list-decimal pl-5 space-y-2">
                            <li>Revisar la propuesta y confirmar detalles</li>
                            <li>Proceder con el pago inicial</li>
                            <li>Agendar reunión de inicio del proyecto</li>
                            <li>Comenzar el desarrollo según cronograma</li>
                          </ol>
                        </div>
                        
                        <div className="flex justify-end">
                          <Button>
                            Aceptar propuesta
                          </Button>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </TabsContent>
                
                <TabsContent value="payment">
                  <Card>
                    <CardHeader>
                      <CardTitle>Métodos de Pago</CardTitle>
                      <CardDescription>
                        Información para realizar sus pagos
                      </CardDescription>
                    </CardHeader>
                    <CardContent>
                      {clientData?.country === "Argentina" ? (
                        <div className="space-y-6">
                          <div className="bg-accent/50 p-6 rounded-lg border">
                            <h3 className="text-lg font-medium mb-4">Transferencia Bancaria</h3>
                            <dl className="grid grid-cols-1 gap-3">
                              <div>
                                <dt className="text-sm font-medium text-muted-foreground">Banco</dt>
                                <dd className="mt-1">Banco de la Nación Argentina</dd>
                              </div>
                              <div>
                                <dt className="text-sm font-medium text-muted-foreground">Titular</dt>
                                <dd className="mt-1">Empresa de Desarrollo S.A.</dd>
                              </div>
                              <div>
                                <dt className="text-sm font-medium text-muted-foreground">CUIT</dt>
                                <dd className="mt-1">30-71234567-8</dd>
                              </div>
                              <div>
                                <dt className="text-sm font-medium text-muted-foreground">CBU</dt>
                                <dd className="mt-1">0110012345678901234567</dd>
                              </div>
                              <div>
                                <dt className="text-sm font-medium text-muted-foreground">Alias</dt>
                                <dd className="mt-1">EMPRESA.DESARROLLO.SA</dd>
                              </div>
                            </dl>
                          </div>
                          
                          <div className="border p-4 rounded-lg">
                            <p className="text-muted-foreground text-sm">
                              <strong>Nota importante:</strong> Una vez realizada la transferencia, por favor envíe el comprobante de pago a <a href="mailto:pagos@empresa.com" className="text-primary underline">pagos@empresa.com</a>
                            </p>
                          </div>
                        </div>
                      ) : (
                        <div className="space-y-6">
                          <div className="bg-accent/50 p-6 rounded-lg border">
                            <h3 className="text-lg font-medium mb-4">Pago con Tarjeta</h3>
                            <p className="mb-6">
                              Para clientes internacionales, ofrecemos pago seguro a través de Stripe. Al hacer clic en el botón de pago, será redirigido a nuestra pasarela de pago segura.
                            </p>
                            <Button className="w-full sm:w-auto">
                              <CreditCard className="mr-2 h-4 w-4" />
                              Proceder al pago
                            </Button>
                          </div>
                          
                          <div className="border p-4 rounded-lg">
                            <p className="text-muted-foreground text-sm">
                              <strong>Nota importante:</strong> Todos los pagos son procesados de forma segura. No almacenamos información de tarjetas de crédito.
                            </p>
                          </div>
                        </div>
                      )}
                    </CardContent>
                  </Card>
                </TabsContent>
              </Tabs>
            </div>
          </div>
        </motion.div>
      </main>
      
      <Footer />
    </div>
  );
};

export default ClientPortal;
