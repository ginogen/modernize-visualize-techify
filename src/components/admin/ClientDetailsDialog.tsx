import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";
import { useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { Card, CardContent } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Cloud, FileText } from "lucide-react";

type ClientDetailsProps = {
  client: {
    id: string;
    responsible_name: string;
    business_name: string;
    email: string;
    city: string;
    country: string;
    created_at: string;
  };
  open: boolean;
  onOpenChange: (open: boolean) => void;
  driveLinks?: {
    folderId: string | null;
    docId: string | null;
  };
};

type ArgentinaInfo = {
  cuit: string;
  condicion_fiscal: string;
};

const ClientDetailsDialog = ({ client, open, onOpenChange, driveLinks }: ClientDetailsProps) => {
  const [argentinaInfo, setArgentinaInfo] = useState<ArgentinaInfo | null>(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (open && client.country === "Argentina") {
      fetchArgentinaInfo();
    }
  }, [open, client]);

  const fetchArgentinaInfo = async () => {
    try {
      setLoading(true);
      const { data, error } = await supabase
        .from('argentina_info')
        .select('*')
        .eq('id', client.id)
        .single();
      
      if (error && error.code !== 'PGRST116') {
        console.error('Error fetching Argentina info:', error);
      } else {
        setArgentinaInfo(data);
      }
    } catch (error) {
      console.error('Error:', error);
    } finally {
      setLoading(false);
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

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-2xl">
        <DialogHeader>
          <DialogTitle>Detalles del Cliente</DialogTitle>
        </DialogHeader>

        <div className="space-y-6">
          {/* Documentación de Google Drive */}
          {driveLinks?.folderId && (
            <Card>
              <CardContent className="pt-6">
                <h3 className="text-lg font-semibold mb-4">Documentación en Google Drive</h3>
                <div className="space-y-4">
                  <div>
                    <Label>Carpeta del Cliente</Label>
                    <div className="flex items-center gap-2 mt-1">
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => window.open(`https://drive.google.com/drive/folders/${driveLinks.folderId}`, '_blank')}
                      >
                        <Cloud className="h-4 w-4 mr-2" />
                        Abrir Carpeta
                      </Button>
                    </div>
                  </div>
                  {driveLinks.docId && (
                    <div>
                      <Label>Documento de Implementación</Label>
                      <div className="flex items-center gap-2 mt-1">
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => window.open(`https://docs.google.com/document/d/${driveLinks.docId}/edit`, '_blank')}
                        >
                          <FileText className="h-4 w-4 mr-2" />
                          Abrir Documento
                        </Button>
                      </div>
                    </div>
                  )}
                </div>
              </CardContent>
            </Card>
          )}

          {/* Información del Cliente */}
          <Card>
            <CardContent className="pt-6">
              <div className="grid gap-4">
                <div>
                  <Label>Responsable</Label>
                  <p className="text-lg font-medium">{client.responsible_name}</p>
                </div>
                <div>
                  <Label>Empresa</Label>
                  <p className="text-lg font-medium">{client.business_name}</p>
                </div>
                <div>
                  <Label>Email</Label>
                  <p>{client.email}</p>
                </div>
                <div>
                  <Label>Ubicación</Label>
                  <p>{`${client.city}, ${client.country}`}</p>
                </div>
                <div>
                  <Label>Fecha de registro</Label>
                  <p>{formatDate(client.created_at)}</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default ClientDetailsDialog;
