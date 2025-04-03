
import { useState, useEffect } from "react";
import { CheckCircle, Clock } from "lucide-react";
import { format } from "date-fns";
import { es } from "date-fns/locale";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";

type ProgressItem = {
  id: string;
  task_name: string;
  description: string | null;
  due_date: string | null;
  status: "En Progreso" | "Completada";
  created_at: string;
};

interface ProgressCardProps {
  clientId: string;
}

const ProgressCard = ({ clientId }: ProgressCardProps) => {
  const [progressItems, setProgressItems] = useState<ProgressItem[]>([]);
  const [loading, setLoading] = useState(true);
  const { toast } = useToast();

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

    if (clientId) {
      fetchProgressItems();
    }
    
    // Set up a subscription for real-time updates
    const channel = supabase
      .channel('progress-changes')
      .on(
        'postgres_changes',
        {
          event: '*',
          schema: 'public',
          table: 'client_progress',
          filter: `client_id=eq.${clientId}`
        },
        () => {
          fetchProgressItems();
        }
      )
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  }, [clientId, toast]);

  // Calculate completion percentage
  const calculateCompletionPercentage = () => {
    if (progressItems.length === 0) return 0;
    const completedItems = progressItems.filter(item => item.status === "Completada").length;
    return Math.round((completedItems / progressItems.length) * 100);
  };

  if (loading) {
    return (
      <Card>
        <CardHeader>
          <CardTitle>Progreso del Proyecto</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="text-center py-4">Cargando información de progreso...</div>
        </CardContent>
      </Card>
    );
  }

  if (progressItems.length === 0) {
    return (
      <Card>
        <CardHeader>
          <CardTitle>Progreso del Proyecto</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="text-center py-4 text-muted-foreground">
            No hay información de progreso disponible aún.
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Progreso del Proyecto</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div>
          <div className="flex justify-between mb-2">
            <span className="text-sm font-medium">Progreso general</span>
            <span className="text-sm font-medium">{calculateCompletionPercentage()}%</span>
          </div>
          <Progress value={calculateCompletionPercentage()} className="h-3" />
        </div>
        
        <div className="space-y-3 mt-4">
          {progressItems.map((item) => (
            <div key={item.id} className="border rounded-md p-3">
              <div className="flex justify-between items-start mb-2">
                <div className="flex items-center gap-2">
                  {item.status === "Completada" ? (
                    <CheckCircle className="h-5 w-5 text-green-500 flex-shrink-0" />
                  ) : (
                    <Clock className="h-5 w-5 text-amber-500 flex-shrink-0" />
                  )}
                  <h3 className="font-medium">{item.task_name}</h3>
                </div>
                <Badge variant={item.status === "Completada" ? "default" : "outline"}>
                  {item.status}
                </Badge>
              </div>
              {item.description && (
                <p className="text-sm text-muted-foreground ml-7 mb-2">{item.description}</p>
              )}
              {item.due_date && (
                <div className="text-xs text-muted-foreground ml-7">
                  <span className="font-medium">Fecha:</span>{" "}
                  {format(new Date(item.due_date), "PPP", { locale: es })}
                </div>
              )}
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};

export default ProgressCard;
