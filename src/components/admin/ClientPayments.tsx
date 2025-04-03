import { useState, useEffect } from "react";
import { SheetHeader, SheetTitle } from "@/components/ui/sheet";
import { Card, CardContent } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import { Switch } from "@/components/ui/switch";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";
import { format } from "date-fns";
import { FileText, Download, Trash2, Eye, Cloud } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent } from "@/components/ui/dialog";
import { ScrollArea } from "@/components/ui/scroll-area";
import { initializeGoogleDrive, createClientFolder, createImplementationDoc } from "@/integrations/google/drive";

type Payment = {
  id?: string;
  payment_number: number;
  description: string;
  amount?: string;
  is_paid: boolean;
  paid_date: string | null;
  is_invoiced: boolean;
  proposal_id?: string | null;
};

type Subscription = {
  id?: string;
  amount: string;
  is_active: boolean;
  proposal_id?: string | null;
};

type StoredFile = {
  name: string;
  path: string;
  type: string;
  size: number;
  created_at: string;
};

type ClientPaymentsProps = {
  clientId: string;
  clientName: string;
};

const ClientPayments = ({ clientId, clientName }: ClientPaymentsProps) => {
  const [loading, setLoading] = useState(true);
  const [proposal, setProposal] = useState<any>(null);
  const [payments, setPayments] = useState<Payment[]>([]);
  const [subscription, setSubscription] = useState<Subscription | null>(null);
  const [storedFiles, setStoredFiles] = useState<StoredFile[]>([]);
  const [selectedFile, setSelectedFile] = useState<StoredFile | null>(null);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  const { toast } = useToast();
  const [isCreatingDocs, setIsCreatingDocs] = useState(false);
  const [driveLinks, setDriveLinks] = useState<{
    folderId: string | null;
    docId: string | null;
  }>({ folderId: null, docId: null });

  useEffect(() => {
    fetchClientData();
    listStoredFiles();
  }, [clientId]);

  const fetchClientData = async () => {
    try {
      setLoading(true);
      
      // Get client email
      const { data: clientData, error: clientError } = await supabase
        .from('profiles')
        .select('email')
        .eq('id', clientId)
        .single();
      
      if (clientError) throw clientError;
      
      // Get client's proposal
      const { data: proposalData, error: proposalError } = await supabase
        .from('proposals')
        .select('*')
        .eq('client_email', clientData.email)
        .order('created_at', { ascending: false })
        .limit(1)
        .single();
      
      if (proposalError) {
        console.error("Error fetching proposal:", proposalError);
        setLoading(false);
        return;
      }
      
      setProposal(proposalData);
      
      // Fetch existing payment records
      const { data: existingPayments, error: paymentsError } = await supabase
        .from('client_payments')
        .select('*')
        .eq('client_id', clientId)
        .eq('proposal_id', proposalData.id)
        .order('payment_number', { ascending: true });
      
      if (paymentsError) throw paymentsError;
      
      // Fetch existing subscription
      const { data: existingSubscription, error: subscriptionError } = await supabase
        .from('client_subscriptions')
        .select('*')
        .eq('client_id', clientId)
        .eq('proposal_id', proposalData.id)
        .single();
      
      // If payments exist, use them
      if (existingPayments && existingPayments.length > 0) {
        setPayments(existingPayments);
      } 
      // Otherwise initialize from proposal
      else if (proposalData.payment_schedule) {
        const paymentLines = proposalData.payment_schedule.split('\n').filter((line: string) => line.trim() !== '');
        
        // Calculate per-payment amount if available
        const amount = proposalData.investment && proposalData.number_of_payments ? 
          (parseFloat(proposalData.investment.replace(/[^0-9.-]+/g, '')) / proposalData.number_of_payments).toFixed(2) : 
          undefined;
          
        const initializedPayments = paymentLines.map((description: string, index: number) => ({
          payment_number: index + 1,
          description,
          amount: amount ? `${proposalData.investment_currency || '$'}${amount}` : undefined,
          is_paid: false,
          paid_date: null,
          is_invoiced: false,
          client_id: clientId,
          proposal_id: proposalData.id
        }));
        
        // Create initial payment records in database
        const { error: createError } = await supabase
          .from('client_payments')
          .insert(initializedPayments);
          
        if (createError) throw createError;
        
        setPayments(initializedPayments);
      }
      
      // Handle subscription
      if (existingSubscription && !subscriptionError) {
        setSubscription(existingSubscription);
      } else if (proposalData.monthly_subscription) {
        const newSubscription = {
          client_id: clientId,
          proposal_id: proposalData.id,
          amount: proposalData.monthly_subscription,
          is_active: false
        };
        
        // Create subscription record in database
        const { data: subData, error: createSubError } = await supabase
          .from('client_subscriptions')
          .insert(newSubscription)
          .select()
          .single();
          
        if (createSubError) throw createSubError;
        
        setSubscription(subData);
      }
      
    } catch (error: any) {
      console.error('Error fetching client data:', error.message);
      toast({
        title: "Error",
        description: "No se pudo obtener la información de pagos del cliente.",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  const handlePaymentStatusChange = async (index: number, isPaid: boolean) => {
    try {
      const updatedPayments = [...payments];
      const payment = updatedPayments[index];
      
      payment.is_paid = isPaid;
      payment.paid_date = isPaid ? new Date().toISOString() : null;
      
      setPayments(updatedPayments);
      
      // Update in database
      const { error } = await supabase
        .from('client_payments')
        .update({
          is_paid: isPaid,
          paid_date: payment.paid_date
        })
        .eq('id', payment.id);
      
      if (error) throw error;

      // Si es el primer pago y está marcado como pagado, crear carpeta y documento en Google Drive
      if (index === 0 && isPaid) {
        setIsCreatingDocs(true);
        try {
          const response = await fetch('http://localhost:3001/api/google-drive', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            credentials: 'include',
            body: JSON.stringify({ clientName })
          });

          const data = await response.json();

          if (!data.success) {
            if (response.status === 401 && data.authUrl) {
              // ... código de autenticación existente ...
              return;
            }
            throw new Error(data.error);
          }

          // Guardar los IDs de la carpeta y documento
          setDriveLinks({
            folderId: data.folderId,
            docId: data.docId
          });

          toast({
            title: "Documentación lista",
            description: data.message || "Se ha creado la carpeta y el documento de implementación en Google Drive",
          });
        } catch (error: any) {
          console.error('Error creating Google Drive documents:', error);
          toast({
            title: "Error",
            description: error.message || "No se pudo crear la documentación en Google Drive",
            variant: "destructive",
          });
        } finally {
          setIsCreatingDocs(false);
        }
      }
      
      toast({
        title: isPaid ? "Pago registrado" : "Pago desmarcado",
        description: `${payment.description} ${isPaid ? 'marcado como pagado' : 'desmarcado'}`,
      });
    } catch (error: any) {
      console.error('Error updating payment status:', error.message);
      toast({
        title: "Error",
        description: "No se pudo actualizar el estado del pago.",
        variant: "destructive",
      });
    }
  };

  const handleInvoiceStatusChange = async (index: number, isInvoiced: boolean) => {
    try {
      const updatedPayments = [...payments];
      const payment = updatedPayments[index];
      
      payment.is_invoiced = isInvoiced;
      setPayments(updatedPayments);
      
      // Update in database
      const { error } = await supabase
        .from('client_payments')
        .update({
          is_invoiced: isInvoiced
        })
        .eq('id', payment.id);
      
      if (error) throw error;
      
      toast({
        title: isInvoiced ? "Factura registrada" : "Factura desmarcada",
        description: `${payment.description} ${isInvoiced ? 'marcado como facturado' : 'desmarcado como facturado'}`,
      });
    } catch (error: any) {
      console.error('Error updating invoice status:', error.message);
      toast({
        title: "Error",
        description: "No se pudo actualizar el estado de la factura.",
        variant: "destructive",
      });
    }
  };

  const handleSubscriptionStatusChange = async (active: boolean) => {
    try {
      if (!subscription) return;
      
      const updatedSubscription = { ...subscription, is_active: active };
      setSubscription(updatedSubscription);
      
      // Update in database
      const { error } = await supabase
        .from('client_subscriptions')
        .update({ is_active: active })
        .eq('id', subscription.id);
      
      if (error) throw error;
      
      toast({
        title: "Estado de suscripción actualizado",
        description: `Suscripción ${active ? 'activada' : 'desactivada'} para ${clientName}`,
      });
    } catch (error: any) {
      console.error('Error updating subscription status:', error.message);
      toast({
        title: "Error",
        description: "No se pudo actualizar el estado de la suscripción.",
        variant: "destructive",
      });
    }
  };

  const listStoredFiles = async () => {
    try {
      console.log('Listando archivos para el cliente:', {
        userId: clientId,
        bucket: 'payment_receipts'
      });

      // Verificar la sesión actual
      const { data: { session }, error: sessionError } = await supabase.auth.getSession();
      if (sessionError) {
        console.error('Error al obtener la sesión:', sessionError);
        throw sessionError;
      }
      console.log('Sesión actual:', {
        role: session?.user?.role,
        id: session?.user?.id,
        email: session?.user?.email
      });

      // Intentar listar archivos directamente desde la carpeta del cliente
      const { data: clientFiles, error: clientError } = await supabase.storage
        .from('payment_receipts')
        .list(clientId, {
          limit: 100,
          sortBy: { column: 'created_at', order: 'desc' }
        });

      if (clientError) {
        console.error('Error al listar archivos del cliente:', {
          error: clientError,
          message: clientError.message,
          name: clientError.name
        });
        
        // Si hay un error, intentar listar desde la raíz
        const { data: rootFiles, error: rootError } = await supabase.storage
          .from('payment_receipts')
          .list('', {
            limit: 100,
            sortBy: { column: 'created_at', order: 'desc' }
          });

        if (rootError) {
          console.error('Error al listar archivos desde la raíz:', {
            error: rootError,
            message: rootError.message,
            name: rootError.name
          });
          throw rootError;
        }

        // Filtrar archivos que pertenecen al cliente
        const filteredFiles = (rootFiles || []).filter(file => 
          file.name.includes(clientId)
        );

        if (filteredFiles.length > 0) {
          console.log('Archivos encontrados en la raíz:', filteredFiles);
          const processedFiles = filteredFiles.map(file => ({
            name: file.name.split('/').pop() || file.name,
            path: file.name,
            type: file.metadata?.mimetype || 'application/octet-stream',
            size: file.metadata?.size || 0,
            created_at: file.created_at || new Date().toISOString()
          }));
          setStoredFiles(processedFiles);
        } else {
          console.log('No se encontraron archivos para el cliente');
          setStoredFiles([]);
        }
      } else if (clientFiles && clientFiles.length > 0) {
        console.log('Archivos encontrados en la carpeta del cliente:', clientFiles);
        const processedFiles = clientFiles.map(file => ({
          name: file.name,
          path: `${clientId}/${file.name}`,
          type: file.metadata?.mimetype || 'application/octet-stream',
          size: file.metadata?.size || 0,
          created_at: file.created_at || new Date().toISOString()
        }));
        setStoredFiles(processedFiles);
      } else {
        console.log('No se encontraron archivos en la carpeta del cliente');
        setStoredFiles([]);
      }
    } catch (error) {
      console.error('Error listing files:', error);
      toast({
        title: "Error",
        description: "No se pudieron cargar los archivos.",
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

  const handleFileDelete = async (filePath: string) => {
    try {
      const { error } = await supabase.storage
        .from('payment_receipts')
        .remove([filePath]);

      if (error) throw error;

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

  const handlePreview = async (file: StoredFile) => {
    try {
      const { data, error } = await supabase.storage
        .from('payment_receipts')
        .createSignedUrl(file.path, 60); // URL válida por 60 segundos

      if (error) throw error;

      setPreviewUrl(data.signedUrl);
      setSelectedFile(file);
    } catch (error) {
      console.error('Error al generar preview:', error);
      toast({
        title: "Error",
        description: "No se pudo generar la previsualización del archivo.",
        variant: "destructive",
      });
    }
  };

  if (loading) {
    return <div className="py-8 text-center">Cargando información de pagos...</div>;
  }

  if (!proposal) {
    return (
      <div className="py-8 text-center">
        No se encontró información de propuesta para este cliente.
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <SheetHeader className="px-6">
        <SheetTitle>Gestión de Pagos: {clientName}</SheetTitle>
      </SheetHeader>

      <ScrollArea className="h-[calc(100vh-120px)] px-6">
        <div className="space-y-6 max-w-5xl mx-auto">
          <Card>
            <CardContent className="pt-6">
              <h3 className="text-lg font-semibold mb-2">Información de Inversión</h3>
              <div className="grid gap-4">
                <div>
                  <Label>Inversión Total</Label>
                  <p className="text-lg font-medium">{proposal.investment}</p>
                </div>
                <div>
                  <Label>Modalidad de Pago</Label>
                  <p>{proposal.payment_method || "No especificada"}</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="pt-6">
              <h3 className="text-lg font-semibold mb-4">Comprobantes de Pago</h3>
              {storedFiles.length > 0 ? (
                <div className="space-y-3">
                  {storedFiles.map((file) => (
                    <div key={file.path} className="flex items-center justify-between p-3 bg-accent/20 rounded-lg border">
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
                          onClick={() => handlePreview(file)}
                        >
                          <Eye className="h-4 w-4" />
                        </Button>
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => handleFileDownload(file.path, file.name)}
                        >
                          <Download className="h-4 w-4" />
                        </Button>
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => handleFileDelete(file.path)}
                        >
                          <Trash2 className="h-4 w-4 text-destructive" />
                        </Button>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <p className="text-muted-foreground text-sm">No hay comprobantes subidos.</p>
              )}
            </CardContent>
          </Card>

          {payments.length > 0 && (
            <Card>
              <CardContent className="pt-6">
                <h3 className="text-lg font-semibold mb-4">Detalle de Pagos</h3>
                <div className="space-y-4">
                  {payments.map((payment, index) => (
                    <div key={payment.id || index} className="border p-4 rounded-md">
                      <div className="flex justify-between items-start mb-3">
                        <h4 className="font-medium">{payment.description}</h4>
                        {payment.amount && <span className="font-medium">{payment.amount}</span>}
                      </div>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div className="flex items-center space-x-2">
                          <Checkbox 
                            id={`paid-${index}`}
                            checked={payment.is_paid}
                            onCheckedChange={(checked) => 
                              handlePaymentStatusChange(index, checked as boolean)
                            }
                          />
                          <Label htmlFor={`paid-${index}`}>Pagado</Label>
                          {payment.paid_date && (
                            <span className="text-sm text-muted-foreground">
                              ({format(new Date(payment.paid_date), "dd/MM/yyyy")})
                            </span>
                          )}
                        </div>
                        <div className="flex items-center space-x-2">
                          <Checkbox 
                            id={`invoiced-${index}`}
                            checked={payment.is_invoiced}
                            onCheckedChange={(checked) => 
                              handleInvoiceStatusChange(index, checked as boolean)
                            }
                          />
                          <Label htmlFor={`invoiced-${index}`}>Facturado</Label>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          )}

          {subscription && (
            <Card>
              <CardContent className="pt-6">
                <h3 className="text-lg font-semibold mb-4">Suscripción Mensual</h3>
                <div className="space-y-4">
                  <div>
                    <Label>Monto</Label>
                    <p className="text-lg font-medium">{subscription.amount}</p>
                  </div>
                  <div className="flex items-center space-x-3">
                    <Label htmlFor="subscription-status">Estado:</Label>
                    <div className="flex items-center space-x-2">
                      <Switch
                        id="subscription-status"
                        checked={subscription.is_active}
                        onCheckedChange={handleSubscriptionStatusChange}
                      />
                      <span className={subscription.is_active ? "text-green-600 font-medium" : "text-amber-600 font-medium"}>
                        {subscription.is_active ? "Activada" : "No Activada"}
                      </span>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          )}
        </div>
      </ScrollArea>

      <Dialog open={!!selectedFile} onOpenChange={() => {
        setSelectedFile(null);
        setPreviewUrl(null);
      }}>
        <DialogContent className="max-w-4xl h-[80vh]">
          {selectedFile && previewUrl && (
            <div className="w-full h-full">
              {selectedFile.type.startsWith('image/') ? (
                <img 
                  src={previewUrl} 
                  alt={selectedFile.name}
                  className="w-full h-full object-contain"
                />
              ) : selectedFile.type === 'application/pdf' ? (
                <iframe
                  src={previewUrl}
                  className="w-full h-full"
                  title={selectedFile.name}
                />
              ) : (
                <div className="flex items-center justify-center h-full">
                  <p>Este tipo de archivo no se puede previsualizar</p>
                </div>
              )}
            </div>
          )}
        </DialogContent>
      </Dialog>

      {isCreatingDocs && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center">
          <div className="bg-white p-4 rounded-lg">
            <p>Creando documentación en Google Drive...</p>
          </div>
        </div>
      )}
    </div>
  );
};

export default ClientPayments;
