
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
import { Eye, BarChart, CreditCard } from "lucide-react";
import ClientDetailsDialog from "./ClientDetailsDialog";
import ClientProgress from "./ClientProgress";
import ClientPayments from "./ClientPayments";

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

  const handleViewDetails = (client: Client) => {
    setSelectedClient(client);
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
      <h2 className="text-2xl font-bold mb-6">Listado de Clientes</h2>
      
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
        </>
      )}
    </div>
  );
};

export default ClientsTable;
