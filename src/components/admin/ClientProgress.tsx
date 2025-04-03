import { useState, useEffect } from "react";
import { Plus, Pencil, Trash2, CheckCircle, Clock } from "lucide-react";
import { format } from "date-fns";
import { es } from "date-fns/locale";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { Separator } from "@/components/ui/separator";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";
import ProgressItemForm from "./ProgressItemForm";

type ProgressItem = {
  id: string;
  task_name: string;
  description: string | null;
  due_date: string | null;
  status: "En Progreso" | "Completada";
  created_at: string;
  updated_at: string;
};

interface ClientProgressProps {
  clientId: string;
  clientName: string;
}

const ClientProgress = ({ clientId, clientName }: ClientProgressProps) => {
  const [progressItems, setProgressItems] = useState<ProgressItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [showAddForm, setShowAddForm] = useState(false);
  const [editingItem, setEditingItem] = useState<ProgressItem | null>(null);
  const [deletingItem, setDeletingItem] = useState<string | null>(null);
  const [refreshTrigger, setRefreshTrigger] = useState(0);
  const { toast } = useToast();

  // Calculate completion percentage
  const calculateCompletionPercentage = () => {
    if (progressItems.length === 0) return 0;
    const completedItems = progressItems.filter(item => item.status === "Completada").length;
    return Math.round((completedItems / progressItems.length) * 100);
  };

  // Load progress items for the client
  useEffect(() => {
    const fetchProgressItems = async () => {
      try {
        setLoading(true);
        const { data, error } = await supabase
          .from("client_progress")
          .select("*")
          .eq("client_id", clientId)
          .order("created_at", { ascending: false });

        if (error) throw error;
        if (data) {
          // Cast the status to the correct type since we know it's restricted in the DB
          const typedData = data.map(item => ({
            ...item,
            status: item.status as "En Progreso" | "Completada"
          }));
          setProgressItems(typedData);
        }
      } catch (error: any) {
        console.error("Error fetching progress items:", error.message);
        toast({
          title: "Error",
          description: "No se pudieron cargar los items de progreso.",
          variant: "destructive",
        });
      } finally {
        setLoading(false);
      }
    };

    fetchProgressItems();
  }, [clientId, refreshTrigger, toast]);

  const handleSuccessfulSubmit = () => {
    setShowAddForm(false);
    setEditingItem(null);
    setRefreshTrigger(prev => prev + 1);
  };

  const handleDeleteItem = async () => {
    if (!deletingItem) return;

    try {
      const { error } = await supabase
        .from("client_progress")
        .delete()
        .eq("id", deletingItem);

      if (error) throw error;

      toast({
        title: "Item eliminado",
        description: "El item de progreso ha sido eliminado exitosamente.",
      });
      setRefreshTrigger(prev => prev + 1);
    } catch (error: any) {
      console.error("Error deleting progress item:", error.message);
      toast({
        title: "Error",
        description: "No se pudo eliminar el item de progreso.",
        variant: "destructive",
      });
    } finally {
      setDeletingItem(null);
    }
  };

  return (
    <Card className="shadow-md">
      <CardHeader>
        <CardTitle className="flex justify-between items-center">
          <span>Progreso de {clientName}</span>
          <Button 
            onClick={() => setShowAddForm(true)}
            size="sm"
            className="flex items-center gap-1"
          >
            <Plus className="h-4 w-4" />
            <span>Añadir</span>
          </Button>
        </CardTitle>
        <CardDescription>
          Seguimiento de tareas y progreso del cliente
        </CardDescription>
        <div className="mt-4">
          <div className="flex justify-between mb-2">
            <span className="text-sm font-medium">Progreso general</span>
            <span className="text-sm font-medium">{calculateCompletionPercentage()}%</span>
          </div>
          <Progress value={calculateCompletionPercentage()} />
        </div>
      </CardHeader>
      <CardContent className="space-y-4">
        {loading ? (
          <div className="text-center py-4">Cargando items de progreso...</div>
        ) : progressItems.length === 0 ? (
          <div className="text-center py-4 text-muted-foreground">
            No hay items de progreso. Añade uno con el botón superior.
          </div>
        ) : (
          progressItems.map((item) => (
            <div key={item.id} className="border rounded-md p-4">
              <div className="flex justify-between items-start mb-2">
                <div className="flex items-center gap-2">
                  {item.status === "Completada" ? (
                    <CheckCircle className="h-5 w-5 text-green-500" />
                  ) : (
                    <Clock className="h-5 w-5 text-amber-500" />
                  )}
                  <h3 className="font-medium">{item.task_name}</h3>
                </div>
                <Badge variant={item.status === "Completada" ? "default" : "outline"}>
                  {item.status}
                </Badge>
              </div>
              {item.description && (
                <p className="text-sm text-muted-foreground mb-2">{item.description}</p>
              )}
              {item.due_date && (
                <div className="text-sm">
                  <span className="font-medium">Fecha:</span>{" "}
                  {format(new Date(item.due_date), "PPP", { locale: es })}
                </div>
              )}
              <div className="flex justify-end gap-2 mt-3">
                <Button
                  size="sm"
                  variant="outline"
                  onClick={() => setEditingItem(item)}
                >
                  <Pencil className="h-4 w-4 mr-1" />
                  Editar
                </Button>
                <Button
                  size="sm"
                  variant="destructive"
                  onClick={() => setDeletingItem(item.id)}
                >
                  <Trash2 className="h-4 w-4 mr-1" />
                  Eliminar
                </Button>
              </div>
            </div>
          ))
        )}
      </CardContent>

      {/* Dialog for adding/editing progress items */}
      <Dialog open={showAddForm || !!editingItem} onOpenChange={(open) => {
        if (!open) {
          setShowAddForm(false);
          setEditingItem(null);
        }
      }}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle>
              {editingItem ? "Editar progreso" : "Añadir nuevo progreso"}
            </DialogTitle>
            <DialogDescription>
              {editingItem
                ? "Actualiza los detalles del item de progreso"
                : "Añade un nuevo item de progreso para este cliente"}
            </DialogDescription>
          </DialogHeader>
          <ProgressItemForm
            clientId={clientId}
            onSuccess={handleSuccessfulSubmit}
            onCancel={() => {
              setShowAddForm(false);
              setEditingItem(null);
            }}
            initialData={editingItem || undefined}
          />
        </DialogContent>
      </Dialog>

      {/* Alert dialog for deleting items */}
      <AlertDialog open={!!deletingItem} onOpenChange={(open) => {
        if (!open) setDeletingItem(null);
      }}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>¿Estás seguro?</AlertDialogTitle>
            <AlertDialogDescription>
              Esta acción no se puede deshacer. Esto eliminará permanentemente este item de progreso.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancelar</AlertDialogCancel>
            <AlertDialogAction onClick={handleDeleteItem}>
              Eliminar
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </Card>
  );
};

export default ClientProgress;
