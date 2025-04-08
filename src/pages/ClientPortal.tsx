import React, { useEffect, useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { motion } from "framer-motion";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";
import Footer from "@/components/Footer";
import { Separator } from "@/components/ui/separator";
import { CheckCircle2, CreditCard, Eye, EyeOff, FileText, LogOut, User, CircuitBoard, Copy, FileEdit, Activity, Upload } from "lucide-react";
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

// Interfaz para los pagos
interface PaymentDetail {
  id: string;
  description: string;
  amount: number;
  dueDate: string | null;
  status: 'paid' | 'pending';
  paymentNumber: number;
}

interface DBPayment {
  id: string;
  proposal_id: string;
  description: string | null;
  amount: string;
  payment_number: number;
  is_paid: boolean;
  paid_date: string | null;
  created_at: string;
}

interface ClientData {
  id: string;
  email: string;
  responsible_name: string;
  business_name: string;
  business_description: string | null;
  objective: string | null;
  phone: string | null;
  address: string;
  city: string;
  country: string;
  website: string | null;
  role: string;
  created_at: string;
  proposalId: string | null;
  argentinaInfo?: {
    cuit: string;
    condicionIVA: string;
    razonSocial: string;
  };
  proposal?: {
    investment: string;
    number_of_payments: number;
    monthly_subscription: string;
  };
}

interface StoredFile {
  name: string;
  path: string;
  type: string;
  size: number;
  created_at: string;
}

const ClientPortal: React.FC = () => {
  const [clientData, setClientData] = useState<ClientData | null>(null);
  const [loading, setLoading] = useState(true);
  const [showPassword, setShowPassword] = useState(false);
  const [password, setPassword] = useState("");
  const [progress, setProgress] = useState(25); // Initial progress value
  const [paymentDetails, setPaymentDetails] = useState<PaymentDetail[]>([]);
  const [isUploading, setIsUploading] = useState(false);
  const [uploadedFiles, setUploadedFiles] = useState<File[]>([]);
  const [storedFiles, setStoredFiles] = useState<StoredFile[]>([]);
  const navigate = useNavigate();
  const location = useLocation();
  const { toast } = useToast();
  
  useEffect(() => {
    const checkAuth = async () => {
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
      
      try {
        // Verificar que el usuario existe en auth
        const { data: authUser, error: authError } = await supabase.auth.getUser();
        if (authError || !authUser.user) {
          throw new Error("Usuario no autenticado");
        }

        // Obtener el perfil del usuario
        const { data: profileData, error: profileError } = await supabase
          .from('profiles')
          .select('*')
          .eq('id', session.user.id)
          .single();
          
        if (profileError || !profileData) {
          console.error("Error al obtener perfil:", profileError);
          toast({
            title: "Perfil no encontrado",
            description: "No se encontró información de perfil para este usuario. Por favor contacte a soporte.",
            variant: "destructive",
          });
          // Cerrar sesión ya que el perfil no existe
          await supabase.auth.signOut();
          navigate("/login");
          return;
        }

        // Verificar si el usuario es un administrador
        if (profileData.role === 'admin') {
          navigate("/admin");
          return;
        }

        // Verificar que el perfil tenga los campos requeridos
        if (!profileData.email || !profileData.responsible_name || !profileData.business_name) {
          console.error("Perfil incompleto:", profileData);
          toast({
            title: "Perfil incompleto",
            description: "Su perfil no contiene toda la información necesaria. Por favor contacte a soporte.",
            variant: "destructive",
          });
          await supabase.auth.signOut();
          navigate("/login");
          return;
        }

        // Obtener la propuesta asociada al cliente
        const { data: proposalData, error: proposalError } = await supabase
          .from('proposals')
          .select('id, investment, number_of_payments, monthly_subscription')
          .eq('client_email', profileData.email)
          .single();

        if (proposalError) {
          console.error("Error fetching proposal:", proposalError);
          // Establecer proposalId como null si hay error
          const clientDataWithoutProposal = {
            ...profileData,
            proposalId: null
          } as ClientData;
          setClientData(clientDataWithoutProposal);
          return;
        }

        // Combinar los datos del perfil con la propuesta
        const clientDataWithProposal = {
          ...profileData,
          proposalId: proposalData?.id || null,
          proposal: proposalData ? {
            investment: proposalData.investment,
            number_of_payments: proposalData.number_of_payments,
            monthly_subscription: proposalData.monthly_subscription
          } : undefined
        } as ClientData;

        setClientData(clientDataWithProposal);
        sessionStorage.setItem("clientData", JSON.stringify(clientDataWithProposal));
        
        // Set password from sessionStorage if available
        const generatedPassword = sessionStorage.getItem("generatedPassword");
        if (generatedPassword) {
          setPassword(generatedPassword);
        } else {
          setPassword("(Contraseña no disponible)");
        }
      } catch (error) {
        console.error("Error loading profile:", error);
        toast({
          title: "Error",
          description: "No se pudo cargar la información del perfil.",
          variant: "destructive",
        });
        navigate("/login");
        return;
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
    const files = e.target.files;
    if (files) {
      setUploadedFiles(Array.from(files));
    }
  };

  // Función para listar archivos del storage
  const listStoredFiles = async () => {
    if (!clientData?.id) return;

    try {
      console.log('Listando archivos para el cliente:', {
        userId: clientData.id,
        bucket: 'payment_receipts',
        path: clientData.id
      });

      const { data, error } = await supabase.storage
        .from('payment_receipts')
        .list(clientData.id, {
          sortBy: { column: 'created_at', order: 'desc' }
        });

      if (error) {
        console.error('Error detallado al listar archivos:', {
          error,
          message: error.message,
          name: error.name
        });
        throw error;
      }

      console.log('Archivos encontrados:', data);

      const files = data.map(file => ({
        name: file.name,
        path: `${clientData.id}/${file.name}`,
        type: file.metadata?.mimetype || 'application/octet-stream',
        size: file.metadata?.size || 0,
        created_at: file.created_at || new Date().toISOString()
      }));

      setStoredFiles(files);
    } catch (error) {
      console.error('Error listing files:', error);
      toast({
        title: "Error",
        description: "No se pudieron cargar los archivos.",
        variant: "destructive",
      });
    }
  };

  // Cargar archivos cuando el componente se monta
  useEffect(() => {
    if (clientData?.id) {
      listStoredFiles();
    }
  }, [clientData?.id]);

  const handleFileUpload = async () => {
    if (!uploadedFiles.length || !clientData?.id) {
      toast({
        title: "Error",
        description: "No hay archivos seleccionados o no se pudo identificar el usuario.",
        variant: "destructive",
      });
      return;
    }

    setIsUploading(true);

    try {
      for (const file of uploadedFiles) {
        if (file.size > 10 * 1024 * 1024) {
          throw new Error(`El archivo ${file.name} excede el límite de 10MB`);
        }

        const fileExt = file.name.split('.').pop()?.toLowerCase();
        if (!['jpg', 'jpeg', 'png', 'pdf'].includes(fileExt || '')) {
          throw new Error(`El archivo ${file.name} no tiene un formato válido`);
        }

        // Crear un nombre de archivo seguro
        const timestamp = Date.now();
        const safeFileName = `${timestamp}_${file.name.replace(/[^a-zA-Z0-9.-]/g, '_')}`;
        const filePath = `${clientData.id}/${safeFileName}`;

        console.log('Intentando subir archivo:', {
          userId: clientData.id,
          fileName: safeFileName,
          filePath,
          fileSize: file.size,
          fileType: file.type,
          bucket: 'payment_receipts'
        });

        // Subir archivo a Storage
        const { error: uploadError } = await supabase.storage
          .from('payment_receipts')
          .upload(filePath, file);

        if (uploadError) {
          console.error('Error detallado al subir archivo:', {
            error: uploadError,
            message: uploadError.message,
            name: uploadError.name
          });
          throw uploadError;
        }

        console.log('Archivo subido exitosamente:', filePath);
      }

      // Recargar la lista de archivos
      await listStoredFiles();

      toast({
        title: "Comprobantes subidos exitosamente",
        description: "Los archivos han sido procesados correctamente.",
      });

      setUploadedFiles([]);
    } catch (error) {
      console.error('Error detallado al subir archivos:', error);
      
      let errorMessage = "Por favor, intente nuevamente.";
      if (error instanceof Error) {
        errorMessage = error.message;
      }

      toast({
        title: "Error al subir los archivos",
        description: errorMessage,
        variant: "destructive",
      });
    } finally {
      setIsUploading(false);
    }
  };

  const handleFileDelete = async (filePath: string) => {
    try {
      const { error } = await supabase.storage
        .from('payment_receipts')
        .remove([filePath]);

      if (error) throw error;

      // Actualizar la lista de archivos
      await listStoredFiles();

      toast({
        title: "Archivo eliminado",
        description: "El archivo ha sido eliminado correctamente.",
      });
    } catch (error) {
      console.error('Error al eliminar archivo:', error);
      toast({
        title: "Error",
        description: "No se pudo eliminar el archivo.",
        variant: "destructive",
      });
    }
  };

  const handleFileDownload = async (filePath: string, fileName: string) => {
    try {
      const { data, error } = await supabase.storage
        .from('payment_receipts')
        .download(filePath);

      if (error) throw error;

      // Crear un enlace temporal para descargar el archivo
      const url = window.URL.createObjectURL(data);
      const a = document.createElement('a');
      a.href = url;
      a.download = fileName;
      document.body.appendChild(a);
      a.click();
      window.URL.revokeObjectURL(url);
      document.body.removeChild(a);
    } catch (error) {
      console.error('Error al descargar archivo:', error);
      toast({
        title: "Error",
        description: "No se pudo descargar el archivo.",
        variant: "destructive",
      });
    }
  };

  useEffect(() => {
    const fetchPaymentDetails = async () => {
      if (!clientData?.proposalId) {
        setPaymentDetails([]);
        return;
      }

      try {
        console.log('Fetching payments for proposal:', clientData.proposalId);
        const { data, error } = await supabase
          .from('client_payments')
          .select('*')
          .eq('proposal_id', clientData.proposalId)
          .order('payment_number', { ascending: true });

        if (error) {
          console.error('Error fetching payment details:', error);
          toast({
            title: "Error al cargar los pagos",
            description: "No se pudieron cargar los detalles de los pagos. Por favor, intente nuevamente.",
            variant: "destructive",
          });
          return;
        }

        if (data) {
          console.log('Payments received:', data);
          const formattedPayments: PaymentDetail[] = (data as DBPayment[]).map(payment => ({
            id: payment.id,
            description: payment.description || `Pago ${payment.payment_number}`,
            amount: parseFloat(payment.amount) || 0,
            dueDate: payment.paid_date,
            status: payment.is_paid ? 'paid' : 'pending',
            paymentNumber: payment.payment_number
          }));
          setPaymentDetails(formattedPayments);
        } else {
          setPaymentDetails([]);
        }
      } catch (error) {
        console.error('Error fetching payment details:', error);
        toast({
          title: "Error al cargar los pagos",
          description: "No se pudieron cargar los detalles de los pagos. Por favor, intente nuevamente.",
          variant: "destructive",
        });
        setPaymentDetails([]);
      }
    };

    fetchPaymentDetails();
  }, [clientData?.proposalId, toast]);

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
          <div>
            <Tabs defaultValue="profile">
              <TabsList className="mb-6">
                <TabsTrigger value="profile" className="flex items-center gap-2">
                  <User className="h-4 w-4" />
                  Perfil
                </TabsTrigger>
                <TabsTrigger value="proposal" className="flex items-center gap-2">
                  <FileText className="h-4 w-4" />
                  Propuesta
                </TabsTrigger>
                <TabsTrigger value="payment" className="flex items-center gap-2">
                  <CreditCard className="h-4 w-4" />
                  Pagos
                </TabsTrigger>
                <TabsTrigger value="progress" className="flex items-center gap-2">
                  <Activity className="h-4 w-4" />
                  Progreso
                </TabsTrigger>
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
                        <dd className="mt-1 text-base">{clientData?.responsible_name}</dd>
                      </div>
                      <div>
                        <dt className="text-sm font-medium text-muted-foreground">Empresa</dt>
                        <dd className="mt-1 text-base">{clientData?.business_name}</dd>
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
                      <div>
                        <dt className="text-sm font-medium text-muted-foreground">CUIT</dt>
                        <dd className="mt-1 text-base">{clientData?.argentinaInfo?.cuit || "No disponible"}</dd>
                      </div>
                      <div>
                        <dt className="text-sm font-medium text-muted-foreground">Condición IVA</dt>
                        <dd className="mt-1 text-base">{clientData?.argentinaInfo?.condicionIVA || "No disponible"}</dd>
                      </div>
                      <div>
                        <dt className="text-sm font-medium text-muted-foreground">Razón Social</dt>
                        <dd className="mt-1 text-base">{clientData?.argentinaInfo?.razonSocial || "No disponible"}</dd>
                      </div>
                    </dl>
                    
                    <Separator className="my-6" />
                    <h3 className="text-lg font-medium mb-4">Sobre su negocio</h3>
                    <dl className="space-y-4">
                      <div>
                        <dt className="text-sm font-medium text-muted-foreground">Descripción</dt>
                        <dd className="mt-1 text-base">{clientData?.business_description}</dd>
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
                        <h3 className="text-xl font-semibold mb-4">Propuesta Aceptada</h3>
                        <p className="text-muted-foreground mb-6">
                          Basado en la información proporcionada, hemos preparado esta propuesta adaptada a sus necesidades específicas.
                        </p>
                        
                        {/* Información de Inversión */}
                        <div className="bg-background/80 p-4 rounded-lg mb-6">
                          <h4 className="text-lg font-medium mb-4">Detalles de Inversión</h4>
                          <dl className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div>
                              <dt className="text-sm font-medium text-muted-foreground">Inversión Total</dt>
                              <dd className="mt-1 text-2xl font-semibold">
                                {clientData?.proposal?.investment ? (
                                  parseFloat(clientData.proposal.investment).toLocaleString('es-AR', {
                                    style: 'currency',
                                    currency: 'ARS'
                                  })
                                ) : "No disponible"}
                              </dd>
                            </div>
                            <div>
                              <dt className="text-sm font-medium text-muted-foreground">Cantidad de Pagos</dt>
                              <dd className="mt-1 text-2xl font-semibold">
                                {clientData?.proposal?.number_of_payments || "No disponible"}
                              </dd>
                            </div>
                            {clientData?.proposal?.monthly_subscription && (
                              <div className="md:col-span-2">
                                <dt className="text-sm font-medium text-muted-foreground">Suscripción Mensual</dt>
                                <dd className="mt-1 text-lg">
                                  <div className="flex items-center gap-2">
                                    <span className="font-semibold">{clientData.proposal.monthly_subscription}</span>
                                    <span className="text-sm text-muted-foreground">(OpenAI API incluido durante 1 año sin cargo)</span>
                                  </div>
                                </dd>
                              </div>
                            )}
                          </dl>
                        </div>
                        
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

                        {/* Sección de carga de comprobantes */}
                        <div className="bg-accent/40 p-6 rounded-lg border mt-6">
                          <h3 className="text-lg font-medium mb-4">Subir Comprobantes de Pago</h3>
                          <div className="space-y-4">
                            <div className="flex flex-col gap-4">
                              <label className="flex-1 flex items-center gap-2 p-4 border-2 border-dashed rounded-md cursor-pointer hover:bg-accent/30 transition-colors">
                                <Upload className="h-6 w-6 text-primary" />
                                <span className="text-sm">
                                  {uploadedFiles.length > 0 
                                    ? `${uploadedFiles.length} archivo${uploadedFiles.length === 1 ? '' : 's'} seleccionado${uploadedFiles.length === 1 ? '' : 's'}`
                                    : 'Seleccionar archivos'}
                                </span>
                                <Input 
                                  type="file" 
                                  className="hidden" 
                                  accept="image/*,.pdf" 
                                  multiple
                                  onChange={handleFileChange}
                                />
                              </label>
                              <Button
                                variant="default"
                                size="lg"
                                disabled={!uploadedFiles.length || isUploading}
                                className="w-full"
                                onClick={handleFileUpload}
                              >
                                {isUploading ? (
                                  <>
                                    <div className="animate-spin h-4 w-4 border-b-2 border-white rounded-full mr-2"></div>
                                    Subiendo...
                                  </>
                                ) : (
                                  <>
                                    <Upload className="h-4 w-4 mr-2" />
                                    Subir Comprobantes
                                  </>
                                )}
                              </Button>
                            </div>
                            {uploadedFiles.length > 0 && (
                              <div className="mt-4">
                                <h4 className="text-sm font-medium mb-2">Archivos seleccionados:</h4>
                                <ul className="space-y-2">
                                  {uploadedFiles.map((file, index) => (
                                    <li key={index} className="text-sm text-muted-foreground flex items-center gap-2">
                                      <FileText className="h-4 w-4" />
                                      {file.name}
                                    </li>
                                  ))}
                                </ul>
                              </div>
                            )}
                            <p className="text-xs text-muted-foreground mt-2">
                              Formatos aceptados: JPG, PNG, PDF. Máx. 10MB por archivo
                            </p>

                            {/* Lista de archivos subidos */}
                            {storedFiles.length > 0 && (
                              <div className="mt-6">
                                <h4 className="text-sm font-medium mb-4">Archivos subidos:</h4>
                                <div className="space-y-3">
                                  {storedFiles.map((file) => (
                                    <div key={file.path} className="flex items-center justify-between p-3 bg-background rounded-lg border">
                                      <div className="flex items-center gap-3">
                                        <FileText className="h-5 w-5 text-primary" />
                                        <div>
                                          <p className="text-sm font-medium">{file.name}</p>
                                          <p className="text-xs text-muted-foreground">
                                            {new Date(file.created_at).toLocaleDateString()} - {(file.size / 1024 / 1024).toFixed(2)}MB
                                          </p>
                                        </div>
                                      </div>
                                      <div className="flex items-center gap-2">
                                        <Button
                                          variant="ghost"
                                          size="sm"
                                          onClick={() => handleFileDownload(file.path, file.name)}
                                        >
                                          Descargar
                                        </Button>
                                        <Button
                                          variant="ghost"
                                          size="sm"
                                          onClick={() => handleFileDelete(file.path)}
                                        >
                                          Eliminar
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
                        
                        {/* Detalles de Pagos Internacionales */}
                        {paymentDetails.length > 0 && (
                          <div className="bg-accent/40 p-6 rounded-lg border">
                            <h3 className="text-lg font-medium mb-4">Detalles de Pagos</h3>
                            <div className="space-y-6">
                              {paymentDetails.map((payment) => (
                                <div key={payment.id} className="border p-4 rounded-lg">
                                  <div className="flex flex-col sm:flex-row sm:items-center justify-between mb-4 gap-2">
                                    <div>
                                      <h4 className="font-medium">{payment.description}</h4>
                                      <p className="text-sm text-muted-foreground">
                                        Monto: ${payment.amount.toLocaleString()}
                                      </p>
                                      {payment.dueDate && (
                                        <p className="text-sm text-muted-foreground">
                                          Fecha límite: {new Date(payment.dueDate).toLocaleDateString()}
                                        </p>
                                      )}
                                    </div>
                                    <div className="flex items-center">
                                      <span className={`px-2 py-1 rounded-md text-xs ${
                                        payment.status === 'paid' 
                                          ? 'bg-green-100 text-green-800' 
                                          : 'bg-yellow-100 text-yellow-800'
                                      }`}>
                                        {payment.status === 'paid' 
                                          ? 'Pagado' 
                                          : 'Pendiente'}
                                      </span>
                                    </div>
                                  </div>
                                  
                                  <div className="mt-3">
                                    <p className="text-sm font-medium mb-2">Subir comprobante de pago:</p>
                                    <div className="flex flex-col sm:flex-row gap-2">
                                      <label className="flex-1 flex items-center gap-2 p-3 border-2 border-dashed rounded-md cursor-pointer hover:bg-accent/30 transition-colors">
                                        <Upload className="h-5 w-5 text-primary" />
                                        <span className="text-sm">{uploadedFiles[payment.id] ? uploadedFiles[payment.id]!.name : 'Seleccionar archivo'}</span>
                                        <Input 
                                          type="file" 
                                          className="hidden" 
                                          accept="image/*,.pdf" 
                                          onChange={(e) => handleFileChange(e)}
                                        />
                                      </label>
                                      <Button
                                        variant="default"
                                        size="default"
                                        disabled={!uploadedFiles[payment.id] || isUploading}
                                        className="shrink-0 min-w-[100px]"
                                        onClick={() => handleFileUpload()}
                                      >
                                        {isUploading ? (
                                          <div className="animate-spin h-4 w-4 border-b-2 border-white rounded-full mr-2"></div>
                                        ) : (
                                          <Upload className="h-4 w-4 mr-2" />
                                        )}
                                        Subir
                                      </Button>
                                    </div>
                                    <p className="text-xs text-muted-foreground mt-2">
                                      Formatos aceptados: JPG, PNG, PDF. Máx. 10MB
                                    </p>
                                  </div>
                                </div>
                              ))}
                            </div>
                          </div>
                        )}
                        
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
        </motion.div>
      </main>
      
      <Footer />
    </div>
  );
};

export default ClientPortal;
