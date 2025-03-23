
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { CircuitBoard, PlusCircle, FileEdit, Trash2, AlertTriangle } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";

type Proposal = {
  id: string;
  client_name: string;
  client_email: string;
  status: string;
  created_at: string;
  investment: string;
  investment_currency: string;
  slug: string;
  opened?: boolean;
  total_view_time?: number;
};

const AdminDashboard = () => {
  const [proposals, setProposals] = useState<Proposal[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [isAdmin, setIsAdmin] = useState<boolean | null>(null);
  const [proposalToDelete, setProposalToDelete] = useState<string | null>(null);
  const { toast } = useToast();

  useEffect(() => {
    checkAdmin();
    fetchProposals();
  }, []);

  const checkAdmin = async () => {
    try {
      const { data: { session } } = await supabase.auth.getSession();
      
      if (!session) {
        setIsAdmin(false);
        return;
      }
      
      // Call the RPC function to check if the user is an admin
      const { data, error } = await supabase.rpc('is_admin');
      
      if (error) {
        console.error("Error checking admin:", error.message);
        setIsAdmin(false);
        return;
      }
      
      setIsAdmin(data === true);
      
      if (data !== true) {
        toast({
          title: "Acceso restringido",
          description: "No tienes permisos para acceder al panel de administración.",
          variant: "destructive",
        });
      }
    } catch (err) {
      console.error("Error checking admin:", err);
      setIsAdmin(false);
    }
  };

  const fetchProposals = async () => {
    try {
      setLoading(true);
      setError("");
      
      const { data, error } = await supabase
        .from('proposals')
        .select('*')
        .order('created_at', { ascending: false });
      
      if (error) {
        throw error;
      }
      
      setProposals(data as Proposal[]);
    } catch (error: any) {
      console.error("Error fetching proposals:", error.message);
      setError("No se pudieron cargar las propuestas.");
    } finally {
      setLoading(false);
    }
  };

  const handleDeleteProposal = async () => {
    if (!proposalToDelete) return;
    
    try {
      const { error } = await supabase
        .from('proposals')
        .delete()
        .eq('id', proposalToDelete);
      
      if (error) {
        throw error;
      }
      
      toast({
        title: "Propuesta eliminada",
        description: "La propuesta ha sido eliminada correctamente.",
      });
      
      // Update the proposals list
      setProposals(proposals.filter(p => p.id !== proposalToDelete));
      setProposalToDelete(null);
    } catch (error: any) {
      console.error("Error deleting proposal:", error.message);
      toast({
        title: "Error",
        description: "No se pudo eliminar la propuesta.",
        variant: "destructive",
      });
    }
  };

  const formatCurrency = (proposal: Proposal) => {
    if (!proposal.investment_currency) return proposal.investment;
    return `${proposal.investment_currency} ${proposal.investment}`;
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('es-ES', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  if (isAdmin === false) {
    return (
      <div className="min-h-screen bg-background flex flex-col items-center justify-center p-4">
        <AlertTriangle className="h-12 w-12 text-red-500 mb-4" />
        <h1 className="text-xl font-bold mb-2">Acceso Denegado</h1>
        <p className="text-center mb-6">No tienes permisos para acceder al panel de administración.</p>
        <Link to="/">
          <Button>Volver al Inicio</Button>
        </Link>
      </div>
    );
  }

  if (isAdmin === null) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <header className="py-4 px-6 border-b">
        <div className="container mx-auto flex justify-between items-center">
          <Link
            to="/"
            className="flex items-center space-x-2 text-xl md:text-2xl font-mono font-semibold"
          >
            <CircuitBoard className="text-neonGreen h-7 w-7 animate-pulse-soft" />
            <span className="text-gradient">Admin Dashboard</span>
          </Link>
        </div>
      </header>

      <main className="container mx-auto py-8 px-4">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-2xl font-bold">Panel de Administración</h1>
          <Link to="/admin/proposals/create">
            <Button className="flex items-center">
              <PlusCircle className="h-4 w-4 mr-2" />
              Nueva Propuesta
            </Button>
          </Link>
        </div>
        
        <Tabs defaultValue="proposals">
          <TabsList>
            <TabsTrigger value="proposals">Propuestas</TabsTrigger>
            <TabsTrigger value="analytics">Analíticas</TabsTrigger>
            <TabsTrigger value="settings">Configuración</TabsTrigger>
          </TabsList>
          
          <TabsContent value="proposals" className="mt-6">
            <Card>
              <CardHeader>
                <CardTitle>Propuestas</CardTitle>
                <CardDescription>
                  Gestión de propuestas enviadas a clientes
                </CardDescription>
              </CardHeader>
              <CardContent>
                {loading ? (
                  <div className="flex justify-center py-8">
                    <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
                  </div>
                ) : error ? (
                  <div className="text-center py-8 text-destructive">
                    <AlertTriangle className="h-10 w-10 mx-auto mb-2" />
                    <p>{error}</p>
                  </div>
                ) : proposals.length === 0 ? (
                  <div className="text-center py-8">
                    <p className="text-muted-foreground mb-4">No hay propuestas disponibles</p>
                    <Link to="/admin/proposals/create">
                      <Button>
                        <PlusCircle className="h-4 w-4 mr-2" />
                        Crear propuesta
                      </Button>
                    </Link>
                  </div>
                ) : (
                  <div className="overflow-x-auto">
                    <Table>
                      <TableCaption>Lista de propuestas</TableCaption>
                      <TableHeader>
                        <TableRow>
                          <TableHead>Cliente</TableHead>
                          <TableHead>Email</TableHead>
                          <TableHead>Estado</TableHead>
                          <TableHead>Fecha</TableHead>
                          <TableHead>Inversión</TableHead>
                          <TableHead>Acciones</TableHead>
                        </TableRow>
                      </TableHeader>
                      <TableBody>
                        {proposals.map((proposal) => (
                          <TableRow key={proposal.id}>
                            <TableCell className="font-medium">{proposal.client_name}</TableCell>
                            <TableCell>{proposal.client_email}</TableCell>
                            <TableCell>
                              <div className="flex items-center">
                                <span 
                                  className={`px-2 py-1 rounded-full text-xs ${
                                    proposal.status === "Aceptada" 
                                      ? "bg-green-100 text-green-800" 
                                      : proposal.status === "No Aceptada"
                                      ? "bg-red-100 text-red-800"
                                      : "bg-blue-100 text-blue-800"
                                  }`}
                                >
                                  {proposal.status || "Enviada"}
                                </span>
                                {proposal.opened !== undefined && (
                                  <span 
                                    className={`ml-2 px-2 py-1 rounded-full text-xs ${
                                      proposal.opened 
                                        ? "bg-green-100 text-green-800" 
                                        : "bg-gray-100 text-gray-800"
                                    }`}
                                  >
                                    {proposal.opened ? "Vista" : "No vista"}
                                  </span>
                                )}
                              </div>
                            </TableCell>
                            <TableCell>{formatDate(proposal.created_at)}</TableCell>
                            <TableCell>{formatCurrency(proposal)}</TableCell>
                            <TableCell>
                              <div className="flex space-x-2">
                                <Link to={`/admin/proposals/edit/${proposal.id}`}>
                                  <Button variant="outline" size="icon">
                                    <FileEdit className="h-4 w-4" />
                                  </Button>
                                </Link>
                                <Link to={`/propuesta/${proposal.slug}`} target="_blank">
                                  <Button variant="outline" size="icon">
                                    <CircuitBoard className="h-4 w-4" />
                                  </Button>
                                </Link>
                                
                                <AlertDialog>
                                  <AlertDialogTrigger asChild>
                                    <Button variant="outline" size="icon" className="text-red-500" onClick={() => setProposalToDelete(proposal.id)}>
                                      <Trash2 className="h-4 w-4" />
                                    </Button>
                                  </AlertDialogTrigger>
                                  <AlertDialogContent>
                                    <AlertDialogHeader>
                                      <AlertDialogTitle>¿Eliminar propuesta?</AlertDialogTitle>
                                      <AlertDialogDescription>
                                        Esta acción no se puede deshacer. Esto eliminará permanentemente
                                        la propuesta para {proposal.client_name}.
                                      </AlertDialogDescription>
                                    </AlertDialogHeader>
                                    <AlertDialogFooter>
                                      <AlertDialogCancel onClick={() => setProposalToDelete(null)}>
                                        Cancelar
                                      </AlertDialogCancel>
                                      <AlertDialogAction 
                                        onClick={handleDeleteProposal}
                                        className="bg-red-500 hover:bg-red-600"
                                      >
                                        Eliminar
                                      </AlertDialogAction>
                                    </AlertDialogFooter>
                                  </AlertDialogContent>
                                </AlertDialog>
                              </div>
                            </TableCell>
                          </TableRow>
                        ))}
                      </TableBody>
                    </Table>
                  </div>
                )}
              </CardContent>
            </Card>
          </TabsContent>
          
          <TabsContent value="analytics" className="mt-6">
            <Card>
              <CardHeader>
                <CardTitle>Analíticas</CardTitle>
                <CardDescription>
                  Métricas de rendimiento de propuestas
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="text-center py-8">
                  <p className="text-muted-foreground">Funcionalidad en desarrollo</p>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
          
          <TabsContent value="settings" className="mt-6">
            <Card>
              <CardHeader>
                <CardTitle>Configuración</CardTitle>
                <CardDescription>
                  Ajustes del panel de administración
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="text-center py-8">
                  <p className="text-muted-foreground">Funcionalidad en desarrollo</p>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </main>
    </div>
  );
};

export default AdminDashboard;
