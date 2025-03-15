
import { useEffect, useState } from "react";
import { Navigate } from "react-router-dom";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { CircuitBoard, UserPlus } from "lucide-react";
import { Link } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";
import { Button } from "@/components/ui/button";
import ClientsTable from "@/components/admin/ClientsTable";
import ProposalsTable from "@/components/admin/ProposalsTable";

const AdminDashboard = () => {
  const [loading, setLoading] = useState(true);
  const [isAdmin, setIsAdmin] = useState(false);
  const [isCreatingAdmin, setIsCreatingAdmin] = useState(false);
  const [adminCreated, setAdminCreated] = useState<{ email: string, password: string } | null>(null);
  const { toast } = useToast();

  useEffect(() => {
    const checkAdmin = async () => {
      try {
        setLoading(true);
        
        // Check if user is logged in
        const { data: sessionData } = await supabase.auth.getSession();
        if (!sessionData.session) {
          setIsAdmin(false);
          setLoading(false);
          return;
        }

        // Check if user is admin
        const { data, error } = await supabase.rpc('is_admin');
        
        if (error) {
          throw error;
        }

        setIsAdmin(data);
      } catch (error: any) {
        console.error("Error checking admin:", error.message);
        toast({
          title: "Error",
          description: "No se pudo verificar los permisos de administrador.",
          variant: "destructive",
        });
        setIsAdmin(false);
      } finally {
        setLoading(false);
      }
    };

    checkAdmin();
  }, [toast]);

  const handleCreateAdmin = async () => {
    try {
      setIsCreatingAdmin(true);
      
      const response = await fetch(
        "https://vlkcjmhppcwfcgnwjbvc.supabase.co/functions/v1/create-admin",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${(await supabase.auth.getSession()).data.session?.access_token}`,
          },
        }
      );
      
      const data = await response.json();
      
      if (!response.ok) {
        throw new Error(data.error || "Error al crear usuario administrador");
      }
      
      setAdminCreated({
        email: data.email,
        password: data.password
      });
      
      toast({
        title: "Administrador creado",
        description: "El usuario administrador ha sido creado exitosamente.",
      });
    } catch (error: any) {
      console.error("Error creating admin:", error);
      toast({
        title: "Error",
        description: error.message || "No se pudo crear el usuario administrador.",
        variant: "destructive",
      });
    } finally {
      setIsCreatingAdmin(false);
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="animate-spin mr-2">
          <CircuitBoard size={24} />
        </div>
        <p>Cargando...</p>
      </div>
    );
  }

  if (!isAdmin) {
    toast({
      title: "Acceso denegado",
      description: "No tienes permisos para acceder al panel de administración.",
      variant: "destructive",
    });
    return <Navigate to="/login" />;
  }

  return (
    <div className="min-h-screen bg-background">
      <header className="py-4 px-6 border-b">
        <div className="container mx-auto flex justify-between items-center">
          <Link
            to="/admin"
            className="flex items-center space-x-2 text-xl md:text-2xl font-mono font-semibold"
          >
            <CircuitBoard className="text-neonGreen h-7 w-7 animate-pulse-soft" />
            <span className="text-gradient">Admin Dashboard</span>
          </Link>
          <div className="flex items-center space-x-4">
            <Link to="/" className="text-foreground/80 hover:text-neonGreen">
              Volver al sitio
            </Link>
          </div>
        </div>
      </header>

      <main className="container mx-auto py-8 px-4">
        {adminCreated && (
          <div className="mb-8 p-4 border border-green-500 bg-green-50 dark:bg-green-900/20 rounded-md">
            <h3 className="text-lg font-semibold mb-2">Usuario administrador creado exitosamente</h3>
            <p><strong>Email:</strong> {adminCreated.email}</p>
            <p><strong>Contraseña:</strong> {adminCreated.password}</p>
            <p className="text-sm mt-2 text-yellow-600 dark:text-yellow-400">
              ¡Guarde estos datos! No se mostrarán nuevamente.
            </p>
          </div>
        )}
        
        <div className="mb-8 flex justify-between items-center">
          <h1 className="text-3xl font-bold">Panel de Administración</h1>
          
          <Button 
            onClick={handleCreateAdmin}
            disabled={isCreatingAdmin}
            className="bg-purple-600 hover:bg-purple-700"
          >
            <UserPlus className="h-4 w-4 mr-2" />
            {isCreatingAdmin ? "Creando..." : "Crear Admin"}
          </Button>
        </div>
        
        <Tabs defaultValue="clients">
          <TabsList className="mb-8">
            <TabsTrigger value="clients">Clientes</TabsTrigger>
            <TabsTrigger value="proposals">Propuestas</TabsTrigger>
          </TabsList>
          
          <TabsContent value="clients">
            <ClientsTable />
          </TabsContent>
          
          <TabsContent value="proposals">
            <ProposalsTable />
          </TabsContent>
        </Tabs>
      </main>
    </div>
  );
};

export default AdminDashboard;
