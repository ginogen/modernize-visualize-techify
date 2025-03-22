
import { useState, useEffect } from "react";
import { SheetHeader, SheetTitle } from "@/components/ui/sheet";
import { Card, CardContent } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import { Switch } from "@/components/ui/switch";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";
import { format } from "date-fns";

type Payment = {
  number: number;
  description: string;
  isPaid: boolean;
  paidDate: string | null;
  isInvoiced: boolean;
};

type ClientPaymentsProps = {
  clientId: string;
  clientName: string;
};

const ClientPayments = ({ clientId, clientName }: ClientPaymentsProps) => {
  const [loading, setLoading] = useState(true);
  const [proposal, setProposal] = useState<any>(null);
  const [payments, setPayments] = useState<Payment[]>([]);
  const [subscriptionActive, setSubscriptionActive] = useState(false);
  const { toast } = useToast();

  useEffect(() => {
    fetchClientProposal();
  }, [clientId]);

  const fetchClientProposal = async () => {
    try {
      setLoading(true);
      
      // Get client email
      const { data: clientData, error: clientError } = await supabase
        .from('profiles')
        .select('email')
        .eq('id', clientId)
        .single();
      
      if (clientError) throw clientError;
      
      // Get client's proposal
      const { data, error } = await supabase
        .from('proposals')
        .select('*')
        .eq('client_email', clientData.email)
        .order('created_at', { ascending: false })
        .limit(1)
        .single();
      
      if (error) throw error;
      
      setProposal(data);
      
      // Initialize payments based on payment_schedule
      if (data.payment_schedule) {
        const paymentLines = data.payment_schedule.split('\n').filter((line: string) => line.trim() !== '');
        const initializedPayments = paymentLines.map((description: string, index: number) => ({
          number: index + 1,
          description,
          isPaid: false,
          paidDate: null,
          isInvoiced: false
        }));
        setPayments(initializedPayments);
      }

      // Initialize subscription status (placeholder - would come from database in real implementation)
      setSubscriptionActive(false);
    } catch (error: any) {
      console.error('Error fetching client proposal:', error.message);
      toast({
        title: "Error",
        description: "No se pudo obtener la información de pagos del cliente.",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  const handlePaymentStatusChange = (index: number, isPaid: boolean) => {
    const updatedPayments = [...payments];
    updatedPayments[index].isPaid = isPaid;
    updatedPayments[index].paidDate = isPaid ? new Date().toISOString() : null;
    setPayments(updatedPayments);
    
    // In a real application, you would save this to the database
    toast({
      title: isPaid ? "Pago registrado" : "Pago desmarcado",
      description: `${payments[index].description} ${isPaid ? 'marcado como pagado' : 'desmarcado'}`,
    });
  };

  const handleInvoiceStatusChange = (index: number, isInvoiced: boolean) => {
    const updatedPayments = [...payments];
    updatedPayments[index].isInvoiced = isInvoiced;
    setPayments(updatedPayments);
    
    // In a real application, you would save this to the database
    toast({
      title: isInvoiced ? "Factura registrada" : "Factura desmarcada",
      description: `${payments[index].description} ${isInvoiced ? 'marcado como facturado' : 'desmarcado como facturado'}`,
    });
  };

  const handleSubscriptionStatusChange = (active: boolean) => {
    setSubscriptionActive(active);
    
    // In a real application, you would save this to the database
    toast({
      title: "Estado de suscripción actualizado",
      description: `Suscripción ${active ? 'activada' : 'desactivada'} para ${clientName}`,
    });
  };

  if (loading) {
    return <div className="py-8 text-center">Cargando información de pagos...</div>;
  }

  if (!proposal) {
    return (
      <div className="py-8 text-center">
        No se encontró información de propuesta para este cliente.
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <SheetHeader>
        <SheetTitle>Gestión de Pagos: {clientName}</SheetTitle>
      </SheetHeader>

      <div className="space-y-6">
        <Card>
          <CardContent className="pt-6">
            <h3 className="text-lg font-semibold mb-2">Información de Inversión</h3>
            <div className="grid gap-4">
              <div>
                <Label>Inversión Total</Label>
                <p className="text-lg font-medium">{proposal.investment}</p>
              </div>
              <div>
                <Label>Modalidad de Pago</Label>
                <p>{proposal.payment_method || "No especificada"}</p>
              </div>
            </div>
          </CardContent>
        </Card>

        {payments.length > 0 && (
          <Card>
            <CardContent className="pt-6">
              <h3 className="text-lg font-semibold mb-4">Detalle de Pagos</h3>
              <div className="space-y-4">
                {payments.map((payment, index) => (
                  <div key={index} className="border p-4 rounded-md">
                    <div className="flex justify-between items-start mb-3">
                      <h4 className="font-medium">{payment.description}</h4>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="flex items-center space-x-2">
                        <Checkbox 
                          id={`paid-${index}`}
                          checked={payment.isPaid}
                          onCheckedChange={(checked) => 
                            handlePaymentStatusChange(index, checked as boolean)
                          }
                        />
                        <Label htmlFor={`paid-${index}`}>Pagado</Label>
                        {payment.paidDate && (
                          <span className="text-sm text-muted-foreground">
                            ({format(new Date(payment.paidDate), "dd/MM/yyyy")})
                          </span>
                        )}
                      </div>
                      <div className="flex items-center space-x-2">
                        <Checkbox 
                          id={`invoiced-${index}`}
                          checked={payment.isInvoiced}
                          onCheckedChange={(checked) => 
                            handleInvoiceStatusChange(index, checked as boolean)
                          }
                        />
                        <Label htmlFor={`invoiced-${index}`}>Facturado</Label>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        )}

        {proposal.monthly_subscription && (
          <Card>
            <CardContent className="pt-6">
              <h3 className="text-lg font-semibold mb-4">Suscripción Mensual</h3>
              <div className="space-y-4">
                <div>
                  <Label>Monto</Label>
                  <p className="text-lg font-medium">{proposal.monthly_subscription}</p>
                </div>
                <div className="flex items-center space-x-3">
                  <Label htmlFor="subscription-status">Estado:</Label>
                  <div className="flex items-center space-x-2">
                    <Switch
                      id="subscription-status"
                      checked={subscriptionActive}
                      onCheckedChange={handleSubscriptionStatusChange}
                    />
                    <span className={subscriptionActive ? "text-green-600 font-medium" : "text-amber-600 font-medium"}>
                      {subscriptionActive ? "Activada" : "No Activada"}
                    </span>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  );
};

export default ClientPayments;
