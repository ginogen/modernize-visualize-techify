
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
import { PlusCircle, Eye, Edit, Clock, Check, X } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";
import { Link, useNavigate } from "react-router-dom";

type InvestmentItem = {
  description: string;
};

type Proposal = {
  id: string;
  client_name: string;
  client_email: string;
  service: string;
  scope: string;
  investment: string;
  investment_items?: string[];
  investment_currency?: string;
  status: string;
  created_at: string;
  slug: string;
  opened: boolean;
  total_view_time: number;
};

const ProposalsTable = () => {
  const [proposals, setProposals] = useState<Proposal[]>([]);
  const [loading, setLoading] = useState(true);
  const { toast } = useToast();
  const navigate = useNavigate();

  useEffect(() => {
    fetchProposals();
  }, []);

  const fetchProposals = async () => {
    try {
      setLoading(true);
      const { data, error } = await supabase
        .from('proposals')
        .select('*')
        .order('created_at', { ascending: false });
      
      if (error) {
        throw error;
      }
      
      setProposals(data || []);
    } catch (error: any) {
      console.error('Error fetching proposals:', error.message);
      toast({
        title: "Error",
        description: "No se pudieron cargar las propuestas.",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  const getStatusClass = (status: string) => {
    switch (status) {
      case 'Aceptada':
        return 'bg-green-100 text-green-800 border-green-300';
      case 'No Aceptada':
        return 'bg-red-100 text-red-800 border-red-300';
      default:
        return 'bg-blue-100 text-blue-800 border-blue-300';
    }
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('es-ES', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  const formatViewTime = (seconds: number) => {
    if (seconds === 0) return "No visto";
    
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;
    
    if (minutes === 0) return `${remainingSeconds} seg`;
    return `${minutes} min ${remainingSeconds} seg`;
  };

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold">Propuestas</h2>
        <Button onClick={() => navigate('/admin/proposals/create')}>
          <PlusCircle className="mr-2 h-4 w-4" />
          Crear Propuesta
        </Button>
      </div>
      
      {loading ? (
        <div className="text-center py-8">Cargando propuestas...</div>
      ) : proposals.length === 0 ? (
        <div className="text-center py-8">No hay propuestas registradas.</div>
      ) : (
        <div className="rounded-md border">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Cliente</TableHead>
                <TableHead>Email</TableHead>
                <TableHead>Servicio</TableHead>
                <TableHead>Fecha</TableHead>
                <TableHead>Estado</TableHead>
                <TableHead>Abierto</TableHead>
                <TableHead>Tiempo Visualización</TableHead>
                <TableHead>Acciones</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {proposals.map((proposal) => (
                <TableRow key={proposal.id}>
                  <TableCell className="font-medium">{proposal.client_name}</TableCell>
                  <TableCell>{proposal.client_email}</TableCell>
                  <TableCell>{proposal.service}</TableCell>
                  <TableCell>{formatDate(proposal.created_at)}</TableCell>
                  <TableCell>
                    <span className={`px-2 py-1 rounded-full text-xs font-medium border ${getStatusClass(proposal.status)}`}>
                      {proposal.status}
                    </span>
                  </TableCell>
                  <TableCell>
                    {proposal.opened ? (
                      <div className="flex items-center text-green-600">
                        <Check className="h-5 w-5 mr-1" />
                        <span>Sí</span>
                      </div>
                    ) : (
                      <div className="flex items-center text-red-600">
                        <X className="h-5 w-5 mr-1" />
                        <span>No</span>
                      </div>
                    )}
                  </TableCell>
                  <TableCell>
                    <div className="flex items-center">
                      <Clock className="h-4 w-4 mr-1 text-blue-500" />
                      <span>{formatViewTime(proposal.total_view_time)}</span>
                    </div>
                  </TableCell>
                  <TableCell>
                    <div className="flex space-x-2">
                      <Link to={`/propuesta/${proposal.slug}`}>
                        <Button variant="outline" size="sm">
                          <Eye className="h-4 w-4 mr-1" />
                          Ver
                        </Button>
                      </Link>
                      <Link to={`/admin/proposals/edit/${proposal.id}`}>
                        <Button variant="outline" size="sm">
                          <Edit className="h-4 w-4 mr-1" />
                          Editar
                        </Button>
                      </Link>
                    </div>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      )}
    </div>
  );
};

export default ProposalsTable;
