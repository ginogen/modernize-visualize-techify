
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
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";
import { Eye } from "lucide-react";
import ClientDetailsDialog from "./ClientDetailsDialog";

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
                    <Button 
                      variant="outline" 
                      size="sm" 
                      onClick={() => handleViewDetails(client)}
                    >
                      <Eye className="h-4 w-4 mr-2" />
                      Ver detalles
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      )}
      
      {selectedClient && (
        <ClientDetailsDialog
          client={selectedClient}
          open={showDetailsDialog}
          onOpenChange={setShowDetailsDialog}
        />
      )}
    </div>
  );
};

export default ClientsTable;
