
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Separator } from "@/components/ui/separator";
import { CheckCircle2, CreditCard, FileText, User } from "lucide-react";
import { OnboardingFormData } from "@/contexts/OnboardingContext";

const ClientPortal: React.FC = () => {
  const [clientData, setClientData] = useState<OnboardingFormData | null>(null);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();
  const { toast } = useToast();
  
  useEffect(() => {
    // Cargar datos del cliente
    const savedData = sessionStorage.getItem("clientData");
    
    if (!savedData) {
      toast({
        title: "Acceso denegado",
        description: "Por favor complete el proceso de registro primero.",
        variant: "destructive",
      });
      navigate("/onboarding");
      return;
    }
    
    setClientData(JSON.parse(savedData));
    setLoading(false);
  }, []);

  if (loading) {
    return (
      <div className="flex flex-col min-h-screen">
        <Header />
        <div className="flex-grow flex items-center justify-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
        </div>
        <Footer />
      </div>
    );
  }

  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      
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
