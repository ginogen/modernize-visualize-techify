
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";
import { useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";

type ClientDetailsProps = {
  client: {
    id: string;
    responsible_name: string;
    business_name: string;
    email: string;
    city: string;
    country: string;
  };
  open: boolean;
  onOpenChange: (open: boolean) => void;
};

type ArgentinaInfo = {
  cuit: string;
  condicion_fiscal: string;
};

const ClientDetailsDialog = ({ client, open, onOpenChange }: ClientDetailsProps) => {
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

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-lg">
        <DialogHeader>
          <DialogTitle className="text-xl">Detalles del Cliente</DialogTitle>
          <DialogDescription>
            Información completa del cliente
          </DialogDescription>
        </DialogHeader>
        
        <div className="grid gap-4 py-4">
          <div className="grid grid-cols-1 gap-y-3">
            <h3 className="font-semibold text-lg">Información de Contacto</h3>
            
            <div className="grid grid-cols-3 items-center gap-2">
              <span className="font-medium">Responsable:</span>
              <span className="col-span-2">{client.responsible_name}</span>
            </div>
            
            <div className="grid grid-cols-3 items-center gap-2">
              <span className="font-medium">Empresa:</span>
              <span className="col-span-2">{client.business_name}</span>
            </div>
            
            <div className="grid grid-cols-3 items-center gap-2">
              <span className="font-medium">Email:</span>
              <span className="col-span-2">{client.email}</span>
            </div>
            
            <div className="grid grid-cols-3 items-center gap-2">
              <span className="font-medium">Ciudad:</span>
              <span className="col-span-2">{client.city}</span>
            </div>
            
            <div className="grid grid-cols-3 items-center gap-2">
              <span className="font-medium">País:</span>
              <span className="col-span-2">{client.country}</span>
            </div>
            
            {client.country === "Argentina" && (
              <>
                <h3 className="font-semibold text-lg mt-4">Información Fiscal (Argentina)</h3>
                
                {loading ? (
                  <p>Cargando información fiscal...</p>
                ) : argentinaInfo ? (
                  <>
                    <div className="grid grid-cols-3 items-center gap-2">
                      <span className="font-medium">CUIT:</span>
                      <span className="col-span-2">{argentinaInfo.cuit}</span>
                    </div>
                    
                    <div className="grid grid-cols-3 items-center gap-2">
                      <span className="font-medium">Condición Fiscal:</span>
                      <span className="col-span-2">{argentinaInfo.condicion_fiscal}</span>
                    </div>
                  </>
                ) : (
                  <p>No hay información fiscal disponible</p>
                )}
              </>
            )}
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default ClientDetailsDialog;
