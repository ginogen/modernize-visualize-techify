import { useState, useEffect } from "react";
import { 
  Table, 
  TableBody, 
  TableCell, 
  TableHead, 
  TableHeader, 
  TableRow 
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent } from "@/components/ui/sheet";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";
import { Eye, BarChart, CreditCard, Key } from "lucide-react";
import ClientDetailsDialog from "./ClientDetailsDialog";
import ClientProgress from "./ClientProgress";
import ClientPayments from "./ClientPayments";
import ResetPasswordDialog from "./ResetPasswordDialog";
import { GoogleDriveAuth } from "@/components/GoogleDriveAuth";

type Client = {
  id: string;
  responsible_name: string;
  business_name: string;
  email: string;
  city: string;
  country: string;
  created_at: string;
};

const ClientsTable = () => {
  const [clients, setClients] = useState<Client[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedClient, setSelectedClient] = useState<Client | null>(null);
  const [showDetailsDialog, setShowDetailsDialog] = useState(false);
  const [showProgressSheet, setShowProgressSheet] = useState(false);
  const [showPaymentsSheet, setShowPaymentsSheet] = useState(false);
  const [showResetPasswordDialog, setShowResetPasswordDialog] = useState(false);
  const [driveLinks, setDriveLinks] = useState<{
    folderId: string | null;
    docId: string | null;
  }>({ folderId: null, docId: null });
  const { toast } = useToast();

  useEffect(() => {
    fetchClients();
  }, []);

  const fetchClients = async () => {
    try {
      setLoading(true);
      const { data, error } = await supabase
        .from('profiles')
        .select('*')
        .order('created_at', { ascending: false });
      
      if (error) {
        throw error;
      }
      
      setClients(data || []);
    } catch (error: any) {
      console.error('Error fetching clients:', error.message);
      toast({
        title: "Error",
        description: "No se pudieron cargar los clientes.",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  const handleViewDetails = async (client: Client) => {
    setSelectedClient(client);
    // Verificar si existen documentos en Google Drive
    try {
      const response = await fetch('http://localhost:3001/api/google-drive', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        credentials: 'include',
        body: JSON.stringify({ clientName: client.business_name })
      });

      const data = await response.json();

      if (data.success) {
        setDriveLinks({
          folderId: data.folderId,
          docId: data.docId
        });
      } else {
        setDriveLinks({ folderId: null, docId: null });
      }
    } catch (error) {
      console.error('Error checking Google Drive documents:', error);
      setDriveLinks({ folderId: null, docId: null });
    }
    setShowDetailsDialog(true);
  };

  const handleManageProgress = (client: Client) => {
    setSelectedClient(client);
    setShowProgressSheet(true);
  };

  const handleManagePayments = (client: Client) => {
    setSelectedClient(client);
    setShowPaymentsSheet(true);
  };

  const handleResetPassword = (client: Client) => {
    setSelectedClient(client);
    setShowResetPasswordDialog(true);
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('es-ES', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold">Listado de Clientes</h2>
        <GoogleDriveAuth />
      </div>
      
      {loading ? (
        <div className="text-center py-8">Cargando clientes...</div>
      ) : clients.length === 0 ? (
        <div className="text-center py-8">No hay clientes registrados.</div>
      ) : (
        <div className="rounded-md border">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Responsable</TableHead>
                <TableHead>Empresa</TableHead>
                <TableHead>Email</TableHead>
                <TableHead>Ubicación</TableHead>
                <TableHead>Fecha de registro</TableHead>
                <TableHead>Acciones</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {clients.map((client) => (
                <TableRow key={client.id}>
                  <TableCell className="font-medium">{client.responsible_name}</TableCell>
                  <TableCell>{client.business_name}</TableCell>
                  <TableCell>{client.email}</TableCell>
                  <TableCell>{`${client.city}, ${client.country}`}</TableCell>
                  <TableCell>{formatDate(client.created_at)}</TableCell>
                  <TableCell>
                    <div className="flex gap-2 flex-wrap">
                      <Button 
                        variant="outline" 
                        size="sm" 
                        onClick={() => handleViewDetails(client)}
                      >
                        <Eye className="h-4 w-4 mr-2" />
                        Ver detalles
                      </Button>
                      <Button 
                        variant="outline" 
                        size="sm" 
                        onClick={() => handleManageProgress(client)}
                      >
                        <BarChart className="h-4 w-4 mr-2" />
                        Progreso
                      </Button>
                      <Button 
                        variant="outline" 
                        size="sm" 
                        onClick={() => handleManagePayments(client)}
                      >
                        <CreditCard className="h-4 w-4 mr-2" />
                        Pagos
                      </Button>
                      <Button 
                        variant="outline" 
                        size="sm" 
                        onClick={() => handleResetPassword(client)}
                      >
                        <Key className="h-4 w-4 mr-2" />
                        Restablecer contraseña
                      </Button>
                    </div>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      )}
      
      {selectedClient && (
        <>
          <ClientDetailsDialog
            client={selectedClient}
            open={showDetailsDialog}
            onOpenChange={setShowDetailsDialog}
            driveLinks={driveLinks}
          />
          
          <Sheet open={showProgressSheet} onOpenChange={setShowProgressSheet}>
            <SheetContent className="sm:max-w-md md:max-w-lg">
              {selectedClient && (
                <ClientProgress 
                  clientId={selectedClient.id} 
                  clientName={selectedClient.business_name}
                />
              )}
            </SheetContent>
          </Sheet>
          
          <Sheet open={showPaymentsSheet} onOpenChange={setShowPaymentsSheet}>
            <SheetContent className="sm:max-w-md md:max-w-lg">
              {selectedClient && (
                <ClientPayments 
                  clientId={selectedClient.id} 
                  clientName={selectedClient.business_name}
                />
              )}
            </SheetContent>
          </Sheet>
          
          {selectedClient && (
            <ResetPasswordDialog
              open={showResetPasswordDialog}
              onOpenChange={setShowResetPasswordDialog}
              clientEmail={selectedClient.email}
              clientName={selectedClient.business_name}
            />
          )}
        </>
      )}
    </div>
  );
};

export default ClientsTable;
