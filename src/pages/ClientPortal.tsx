
import React, { useEffect, useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { motion } from "framer-motion";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";
import Footer from "@/components/Footer";
import { Separator } from "@/components/ui/separator";
import { CheckCircle2, CreditCard, Eye, EyeOff, FileText, LogOut, User, CircuitBoard, Copy, FileEdit, Activity, Upload, File, X } from "lucide-react";
import { OnboardingFormData } from "@/contexts/OnboardingContext";
import { Input } from "@/components/ui/input";
import { Link } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import { Progress } from "@/components/ui/progress";

// Add Banco Santa Fe logo
const BancoSantaFeLogo = () => (
  <div className="flex items-center justify-center my-4">
    <img 
      src="https://www.bancosantafe.com.ar/static/dlt/img/logo-banco.png" 
      alt="Banco de Santa Fe" 
      className="h-12 object-contain" 
      onError={(e) => {
        // Fallback if image can't be loaded
        e.currentTarget.style.display = 'none';
      }}
    />
  </div>
);

const ClientPortal: React.FC = () => {
  const [clientData, setClientData] = useState<OnboardingFormData | null>(null);
  const [loading, setLoading] = useState(true);
  const [showPassword, setShowPassword] = useState(false);
  const [password, setPassword] = useState("");
  const [progress, setProgress] = useState(25); // Initial progress value
  const [files, setFiles] = useState<File[]>([]);
  const [uploading, setUploading] = useState(false);
  const [receipts, setReceipts] = useState<any[]>([]);
  
  const navigate = useNavigate();
  const location = useLocation();
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
      
      // Load existing payment receipts if any
      if (session) {
        fetchReceipts(session.user.id);
      }
    };
    
    checkAuth();
  }, [navigate, toast]);
  
  const fetchReceipts = async (userId: string) => {
    try {
      const { data, error } = await supabase
        .storage
        .from('payment_receipts')
        .list(`${userId}/`, {
          sortBy: { column: 'created_at', order: 'desc' },
        });
        
      if (error) {
        throw error;
      }
      
      if (data) {
        setReceipts(data);
      }
    } catch (error) {
      console.error('Error fetching receipts:', error);
    }
  };

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

  const copyToClipboard = (text: string, description: string) => {
    navigator.clipboard.writeText(text).then(() => {
      toast({
        title: "Copiado al portapapeles",
        description,
      });
    }).catch(err => {
      toast({
        title: "Error",
        description: "No se pudo copiar al portapapeles",
        variant: "destructive",
      });
      console.error('Failed to copy: ', err);
    });
  };
  
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      const selectedFiles = Array.from(e.target.files);
      setFiles(selectedFiles);
    }
  };
  
  const handleFileUpload = async () => {
    if (!files.length || !clientData) return;
    
    try {
      setUploading(true);
      
      const { data: { session } } = await supabase.auth.getSession();
      
      if (!session) {
        throw new Error('No session found');
      }
      
      const userId = session.user.id;
      
      // Upload each file
      for (const file of files) {
        const fileName = `${Date.now()}_${file.name}`;
        const filePath = `${userId}/${fileName}`;
        
        const { error: uploadError } = await supabase
          .storage
          .from('payment_receipts')
          .upload(filePath, file);
          
        if (uploadError) {
          throw uploadError;
        }
      }
      
      // Clear the file input
      setFiles([]);
      
      // Fetch the updated list of receipts
      fetchReceipts(userId);
      
      toast({
        title: "Comprobante subido",
        description: "El comprobante de pago se ha subido correctamente.",
      });
    } catch (error) {
      console.error('Error uploading file:', error);
      toast({
        title: "Error",
        description: "No se pudo subir el comprobante de pago. Intente nuevamente.",
        variant: "destructive",
      });
    } finally {
      setUploading(false);
    }
  };
  
  const handleDeleteReceipt = async (fileName: string) => {
    try {
      const { data: { session } } = await supabase.auth.getSession();
      
      if (!session) {
        throw new Error('No session found');
      }
      
      const userId = session.user.id;
      const filePath = `${userId}/${fileName}`;
      
      const { error } = await supabase
        .storage
        .from('payment_receipts')
        .remove([filePath]);
        
      if (error) {
        throw error;
      }
      
      // Update the list of receipts
      fetchReceipts(userId);
      
      toast({
        title: "Comprobante eliminado",
        description: "El comprobante de pago se ha eliminado correctamente.",
      });
    } catch (error) {
      console.error('Error deleting receipt:', error);
      toast({
        title: "Error",
        description: "No se pudo eliminar el comprobante de pago. Intente nuevamente.",
        variant: "destructive",
      });
    }
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
            <aside className="w-full md:w-64 shrink-0">
              <Card className="sticky top-4">
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
                    <Button variant="ghost" className="justify-start h-12 px-4">
                      <Activity className="mr-2 h-4 w-4" />
                      Progreso
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
                  <TabsTrigger value="progress">Progreso</TabsTrigger>
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
                        {clientData?.proposalId && (
                          <div className="bg-accent/30 p-4 rounded-lg border mb-6">
                            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                              <div>
                                <h3 className="text-sm font-medium text-muted-foreground">ID de Propuesta</h3>
                                <p className="text-base font-medium">{clientData.proposalId}</p>
                              </div>
                              <Button variant="outline" size="sm" asChild className="shrink-0">
                                <Link to={`/proposal/${clientData.proposalId}`} className="flex items-center gap-2">
                                  <FileEdit size={16} />
                                  Ver propuesta completa
                                </Link>
                              </Button>
                            </div>
                          </div>
                        )}
                        
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
                            <BancoSantaFeLogo />
                            <h3 className="text-lg font-medium mb-4">Transferencia Bancaria</h3>
                            <dl className="grid grid-cols-1 gap-3">
                              <div className="flex flex-col">
                                <dt className="text-sm font-medium text-muted-foreground">Titular</dt>
                                <dd className="mt-1 flex items-center">
                                  <span className="mr-2">GENTILE, GINO GUSTAVO</span>
                                </dd>
                              </div>
                              <div className="flex flex-col">
                                <dt className="text-sm font-medium text-muted-foreground">CUIT</dt>
                                <dd className="mt-1 flex items-center">
                                  <span className="mr-2">20357025916</span>
                                </dd>
                              </div>
                              <div className="flex flex-col">
                                <dt className="text-sm font-medium text-muted-foreground">Nº de Cuenta</dt>
                                <dd className="mt-1 flex items-center">
                                  <span className="mr-2">CA $ 000040045500</span>
                                </dd>
                              </div>
                              <div className="flex flex-col">
                                <dt className="text-sm font-medium text-muted-foreground">Alias</dt>
                                <dd className="mt-1 flex items-center">
                                  <span className="mr-2">TRIGO.FARO.PERNO</span>
                                  <Button 
                                    variant="outline" 
                                    size="icon" 
                                    className="h-6 w-6"
                                    onClick={() => copyToClipboard("TRIGO.FARO.PERNO", "Alias copiado al portapapeles")}
                                  >
                                    <Copy className="h-3 w-3" />
                                  </Button>
                                </dd>
                              </div>
                              <div className="flex flex-col">
                                <dt className="text-sm font-medium text-muted-foreground">CBU</dt>
                                <dd className="mt-1 flex items-center">
                                  <span className="mr-2">3300000620000400455006</span>
                                  <Button 
                                    variant="outline" 
                                    size="icon" 
                                    className="h-6 w-6"
                                    onClick={() => copyToClipboard("3300000620000400455006", "CBU copiado al portapapeles")}
                                  >
                                    <Copy className="h-3 w-3" />
                                  </Button>
                                </dd>
                              </div>
                            </dl>
                          </div>
                          
                          <div className="border p-4 rounded-lg">
                            <p className="font-medium mb-4">
                              <strong>Importante:</strong> Una vez realizada la transferencia, por favor subir aquí el comprobante.
                            </p>
                            
                            <div className="space-y-4">
                              <div className="flex items-center gap-2 flex-wrap">
                                <Input 
                                  type="file" 
                                  accept="image/*,.pdf" 
                                  onChange={handleFileChange}
                                  multiple
                                  className="max-w-md"
                                />
                                <Button 
                                  onClick={handleFileUpload} 
                                  disabled={!files.length || uploading}
                                  className="flex items-center gap-2"
                                >
                                  {uploading ? 'Subiendo...' : 'Subir comprobante'}
                                  <Upload className="h-4 w-4" />
                                </Button>
                              </div>
                              
                              {files.length > 0 && (
                                <div className="bg-accent/30 p-3 rounded-md">
                                  <p className="text-sm font-medium mb-2">Archivos seleccionados:</p>
                                  <ul className="space-y-1">
                                    {files.map((file, index) => (
                                      <li key={index} className="text-sm flex items-center gap-2">
                                        <File className="h-4 w-4" />
                                        {file.name}
                                      </li>
                                    ))}
                                  </ul>
                                </div>
                              )}
                              
                              {receipts.length > 0 && (
                                <div className="mt-6">
                                  <h4 className="font-medium mb-3">Comprobantes subidos</h4>
                                  <div className="space-y-2">
                                    {receipts.map((receipt, index) => (
                                      <div key={index} className="flex items-center justify-between border p-2 rounded-md">
                                        <div className="flex items-center gap-2">
                                          <File className="h-4 w-4 text-primary" />
                                          <span className="text-sm truncate max-w-[200px]">{receipt.name}</span>
                                        </div>
                                        <div className="flex items-center gap-2">
                                          <Button 
                                            variant="ghost" 
                                            size="sm"
                                            onClick={() => {
                                              const { data: { session } } = supabase.auth.getSession();
                                              if (session) {
                                                const userId = session.user.id;
                                                const url = supabase.storage.from('payment_receipts').getPublicUrl(`${userId}/${receipt.name}`).data.publicUrl;
                                                window.open(url, '_blank');
                                              }
                                            }}
                                          >
                                            Ver
                                          </Button>
                                          <Button 
                                            variant="ghost" 
                                            size="sm" 
                                            className="text-destructive hover:text-destructive"
                                            onClick={() => handleDeleteReceipt(receipt.name)}
                                          >
                                            <X className="h-4 w-4" />
                                          </Button>
                                        </div>
                                      </div>
                                    ))}
                                  </div>
                                </div>
                              )}
                            </div>
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

                <TabsContent value="progress">
                  <Card>
                    <CardHeader>
                      <CardTitle>Progreso del Proyecto</CardTitle>
                      <CardDescription>
                        Estado actual y próximas etapas
                      </CardDescription>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-6">
                        <div className="space-y-2">
                          <div className="flex justify-between items-center">
                            <span className="text-sm font-medium">Progreso general</span>
                            <span className="text-sm font-medium">{progress}%</span>
                          </div>
                          <Progress value={progress} className="h-2" />
                        </div>

                        <div className="space-y-4">
                          <div className="bg-accent/40 p-4 rounded-lg border">
                            <div className="flex items-start">
                              <div className="h-6 w-6 rounded-full bg-green-500 flex items-center justify-center mr-3 mt-0.5 flex-shrink-0">
                                <CheckCircle2 className="h-4 w-4 text-white" />
                              </div>
                              <div>
                                <h4 className="font-medium">Iniciación del proyecto</h4>
                                <p className="text-sm text-muted-foreground mt-1">
                                  El proyecto ha sido iniciado. Propuesta aceptada y términos acordados.
                                </p>
                                <p className="text-xs text-muted-foreground mt-2">Completado el 15 de Agosto, 2024</p>
                              </div>
                            </div>
                          </div>

                          <div className="bg-accent/40 p-4 rounded-lg border">
                            <div className="flex items-start">
                              <div className="h-6 w-6 rounded-full bg-primary flex items-center justify-center mr-3 mt-0.5 flex-shrink-0">
                                <Activity className="h-4 w-4 text-white" />
                              </div>
                              <div>
                                <h4 className="font-medium">Desarrollo en progreso</h4>
                                <p className="text-sm text-muted-foreground mt-1">
                                  Actualmente trabajando en el desarrollo de la solución. 
                                </p>
                                <p className="text-xs text-muted-foreground mt-2">Estimado: 2 semanas</p>
                              </div>
                            </div>
                          </div>

                          <div className="bg-accent/20 p-4 rounded-lg border border-dashed">
                            <div className="flex items-start">
                              <div className="h-6 w-6 rounded-full bg-muted flex items-center justify-center mr-3 mt-0.5 flex-shrink-0">
                                <div className="h-2 w-2 rounded-full bg-muted-foreground"></div>
                              </div>
                              <div>
                                <h4 className="font-medium text-muted-foreground">Revisión y ajustes</h4>
                                <p className="text-sm text-muted-foreground mt-1">
                                  Revisión de la versión inicial y ajustes según feedback.
                                </p>
                                <p className="text-xs text-muted-foreground mt-2">Pendiente</p>
                              </div>
                            </div>
                          </div>

                          <div className="bg-accent/20 p-4 rounded-lg border border-dashed">
                            <div className="flex items-start">
                              <div className="h-6 w-6 rounded-full bg-muted flex items-center justify-center mr-3 mt-0.5 flex-shrink-0">
                                <div className="h-2 w-2 rounded-full bg-muted-foreground"></div>
                              </div>
                              <div>
                                <h4 className="font-medium text-muted-foreground">Entrega final</h4>
                                <p className="text-sm text-muted-foreground mt-1">
                                  Entrega de la solución final y capacitación.
                                </p>
                                <p className="text-xs text-muted-foreground mt-2">Pendiente</p>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
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
