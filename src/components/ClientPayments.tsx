import { useState, useEffect } from "react";
import { useToast } from "@/components/ui/use-toast";
import { supabase } from "@/lib/supabase";

interface Payment {
  id?: string;
  description: string;
  is_paid: boolean;
  paid_date: string | null;
}

const ClientPayments = ({ clientId, clientName }: { clientId: string, clientName: string }) => {
  const { toast } = useToast();
  const [payments, setPayments] = useState<Payment[]>([]);
  const [isCreatingDocs, setIsCreatingDocs] = useState(false);

  const handlePaymentStatusChange = async (index: number, isPaid: boolean) => {
    try {
      const updatedPayments = [...payments];
      const payment = updatedPayments[index];
      
      payment.is_paid = isPaid;
      payment.paid_date = isPaid ? new Date().toISOString() : null;
      
      setPayments(updatedPayments);
      
      // Update in database
      const { error } = await supabase
        .from('client_payments')
        .update({
          is_paid: isPaid,
          paid_date: payment.paid_date
        })
        .eq('id', payment.id);
      
      if (error) throw error;

      // Si es el primer pago y está marcado como pagado, crear carpeta y documento en Google Drive
      if (index === 0 && isPaid) {
        setIsCreatingDocs(true);
        try {
          const response = await fetch('http://localhost:3001/api/google-drive', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            credentials: 'include',
            body: JSON.stringify({ clientName })
          });

          const data = await response.json();

          if (!data.success) {
            if (response.status === 401 && data.authUrl) {
              // Guardar el estado actual
              localStorage.setItem('pendingGDriveAction', JSON.stringify({
                clientId,
                clientName,
                paymentIndex: index,
                timestamp: Date.now()
              }));
              
              // Primero obtener la URL de autenticación
              const authResponse = await fetch(`http://localhost:3001${data.authUrl}`);
              const authData = await authResponse.json();
              
              if (!authData.authUrl) {
                throw new Error('No se pudo obtener la URL de autenticación');
              }
              
              // Configurar el manejador de mensajes antes de abrir la ventana
              const messageHandler = (event: MessageEvent) => {
                if (event.origin !== 'http://localhost:3001') return;
                
                if (event.data === 'auth_success') {
                  // Reintentamos la acción después de la autenticación exitosa
                  handlePaymentStatusChange(index, isPaid);
                } else if (event.data === 'auth_error') {
                  toast({
                    title: "Error",
                    description: "No se pudo completar la autenticación con Google",
                    variant: "destructive",
                  });
                }
                
                // Limpiar el manejador de mensajes
                window.removeEventListener('message', messageHandler);
              };
              
              window.addEventListener('message', messageHandler);
              
              // Abrir la autenticación en una nueva ventana
              const authWindow = window.open(authData.authUrl, 'googleAuth', 'width=600,height=600,menubar=no,toolbar=no,location=no,status=no');
              
              if (!authWindow) {
                window.removeEventListener('message', messageHandler);
                toast({
                  title: "Error",
                  description: "El navegador bloqueó la ventana emergente. Por favor, permite las ventanas emergentes para este sitio.",
                  variant: "destructive",
                });
                return;
              }
              
              return;
            }
            throw new Error(data.error);
          }

          toast({
            title: "Documentación creada",
            description: "Se ha creado la carpeta y el documento de implementación en Google Drive",
          });
        } catch (error: any) {
          console.error('Error creating Google Drive documents:', error);
          toast({
            title: "Error",
            description: "No se pudo crear la documentación en Google Drive",
            variant: "destructive",
          });
        } finally {
          setIsCreatingDocs(false);
        }
      }
      
      toast({
        title: isPaid ? "Pago registrado" : "Pago desmarcado",
        description: `${payment.description} ${isPaid ? 'marcado como pagado' : 'desmarcado'}`,
      });
    } catch (error: any) {
      console.error('Error updating payment status:', error.message);
      toast({
        title: "Error",
        description: "No se pudo actualizar el estado del pago.",
        variant: "destructive",
      });
    }
  };

  // Verificar si hay una acción pendiente después de la autenticación
  useEffect(() => {
    const pendingAction = localStorage.getItem('pendingGDriveAction');
    if (pendingAction) {
      try {
        const { clientId: savedClientId, clientName: savedClientName, paymentIndex, timestamp } = JSON.parse(pendingAction);
        
        // Solo procesar si la acción pendiente tiene menos de 5 minutos
        const fiveMinutes = 5 * 60 * 1000;
        if (Date.now() - timestamp < fiveMinutes) {
          // Si coincide con el cliente actual, reintentamos la acción
          if (savedClientId === clientId && savedClientName === clientName) {
            handlePaymentStatusChange(paymentIndex, true);
          }
        }
        
        // Limpiar la acción pendiente
        localStorage.removeItem('pendingGDriveAction');
      } catch (error) {
        console.error('Error processing pending action:', error);
      }
    }
  }, [clientId, clientName]);

  return (
    <div>
      {/* ... rest of the component JSX ... */}
      {isCreatingDocs && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center">
          <div className="bg-white p-4 rounded-lg">
            <p>Creando documentación en Google Drive...</p>
          </div>
        </div>
      )}
    </div>
  );
}

export default ClientPayments; 