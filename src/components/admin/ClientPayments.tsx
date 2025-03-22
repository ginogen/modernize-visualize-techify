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
  id?: string;
  payment_number: number;
  description: string;
  amount?: string;
  is_paid: boolean;
  paid_date: string | null;
  is_invoiced: boolean;
  proposal_id?: string | null;
};

type Subscription = {
  id?: string;
  amount: string;
  is_active: boolean;
  proposal_id?: string | null;
};

type ClientPaymentsProps = {
  clientId: string;
  clientName: string;
};

const ClientPayments = ({ clientId, clientName }: ClientPaymentsProps) => {
  const [loading, setLoading] = useState(true);
  const [proposal, setProposal] = useState<any>(null);
  const [payments, setPayments] = useState<Payment[]>([]);
  const [subscription, setSubscription] = useState<Subscription | null>(null);
  const { toast } = useToast();

  useEffect(() => {
    fetchClientData();
  }, [clientId]);

  const fetchClientData = async () => {
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
      const { data: proposalData, error: proposalError } = await supabase
        .from('proposals')
        .select('*')
        .eq('client_email', clientData.email)
        .order('created_at', { ascending: false })
        .limit(1)
        .single();
      
      if (proposalError) {
        console.error("Error fetching proposal:", proposalError);
        setLoading(false);
        return;
      }
      
      setProposal(proposalData);
      
      // Fetch existing payment records
      const { data: existingPayments, error: paymentsError } = await supabase
        .from('client_payments')
        .select('*')
        .eq('client_id', clientId)
        .eq('proposal_id', proposalData.id)
        .order('payment_number', { ascending: true });
      
      if (paymentsError) throw paymentsError;
      
      // Fetch existing subscription
      const { data: existingSubscription, error: subscriptionError } = await supabase
        .from('client_subscriptions')
        .select('*')
        .eq('client_id', clientId)
        .eq('proposal_id', proposalData.id)
        .single();
      
      // If payments exist, use them
      if (existingPayments && existingPayments.length > 0) {
        setPayments(existingPayments);
      } 
      // Otherwise initialize from proposal
      else if (proposalData.payment_schedule) {
        const paymentLines = proposalData.payment_schedule.split('\n').filter((line: string) => line.trim() !== '');
        
        // Calculate per-payment amount if available
        const amount = proposalData.investment && proposalData.number_of_payments ? 
          (parseFloat(proposalData.investment.replace(/[^0-9.-]+/g, '')) / proposalData.number_of_payments).toFixed(2) : 
          undefined;
          
        const initializedPayments = paymentLines.map((description: string, index: number) => ({
          payment_number: index + 1,
          description,
          amount: amount ? `${proposalData.investment_currency || '$'}${amount}` : undefined,
          is_paid: false,
          paid_date: null,
          is_invoiced: false,
          client_id: clientId,
          proposal_id: proposalData.id
        }));
        
        // Create initial payment records in database
        const { error: createError } = await supabase
          .from('client_payments')
          .insert(initializedPayments);
          
        if (createError) throw createError;
        
        setPayments(initializedPayments);
      }
      
      // Handle subscription
      if (existingSubscription && !subscriptionError) {
        setSubscription(existingSubscription);
      } else if (proposalData.monthly_subscription) {
        const newSubscription = {
          client_id: clientId,
          proposal_id: proposalData.id,
          amount: proposalData.monthly_subscription,
          is_active: false
        };
        
        // Create subscription record in database
        const { data: subData, error: createSubError } = await supabase
          .from('client_subscriptions')
          .insert(newSubscription)
          .select()
          .single();
          
        if (createSubError) throw createSubError;
        
        setSubscription(subData);
      }
      
    } catch (error: any) {
      console.error('Error fetching client data:', error.message);
      toast({
        title: "Error",
        description: "No se pudo obtener la información de pagos del cliente.",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

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

  const handleInvoiceStatusChange = async (index: number, isInvoiced: boolean) => {
    try {
      const updatedPayments = [...payments];
      const payment = updatedPayments[index];
      
      payment.is_invoiced = isInvoiced;
      setPayments(updatedPayments);
      
      // Update in database
      const { error } = await supabase
        .from('client_payments')
        .update({
          is_invoiced: isInvoiced
        })
        .eq('id', payment.id);
      
      if (error) throw error;
      
      toast({
        title: isInvoiced ? "Factura registrada" : "Factura desmarcada",
        description: `${payment.description} ${isInvoiced ? 'marcado como facturado' : 'desmarcado como facturado'}`,
      });
    } catch (error: any) {
      console.error('Error updating invoice status:', error.message);
      toast({
        title: "Error",
        description: "No se pudo actualizar el estado de la factura.",
        variant: "destructive",
      });
    }
  };

  const handleSubscriptionStatusChange = async (active: boolean) => {
    try {
      if (!subscription) return;
      
      const updatedSubscription = { ...subscription, is_active: active };
      setSubscription(updatedSubscription);
      
      // Update in database
      const { error } = await supabase
        .from('client_subscriptions')
        .update({ is_active: active })
        .eq('id', subscription.id);
      
      if (error) throw error;
      
      toast({
        title: "Estado de suscripción actualizado",
        description: `Suscripción ${active ? 'activada' : 'desactivada'} para ${clientName}`,
      });
    } catch (error: any) {
      console.error('Error updating subscription status:', error.message);
      toast({
        title: "Error",
        description: "No se pudo actualizar el estado de la suscripción.",
        variant: "destructive",
      });
    }
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
                  <div key={payment.id || index} className="border p-4 rounded-md">
                    <div className="flex justify-between items-start mb-3">
                      <h4 className="font-medium">{payment.description}</h4>
                      {payment.amount && <span className="font-medium">{payment.amount}</span>}
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="flex items-center space-x-2">
                        <Checkbox 
                          id={`paid-${index}`}
                          checked={payment.is_paid}
                          onCheckedChange={(checked) => 
                            handlePaymentStatusChange(index, checked as boolean)
                          }
                        />
                        <Label htmlFor={`paid-${index}`}>Pagado</Label>
                        {payment.paid_date && (
                          <span className="text-sm text-muted-foreground">
                            ({format(new Date(payment.paid_date), "dd/MM/yyyy")})
                          </span>
                        )}
                      </div>
                      <div className="flex items-center space-x-2">
                        <Checkbox 
                          id={`invoiced-${index}`}
                          checked={payment.is_invoiced}
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

        {subscription && (
          <Card>
            <CardContent className="pt-6">
              <h3 className="text-lg font-semibold mb-4">Suscripción Mensual</h3>
              <div className="space-y-4">
                <div>
                  <Label>Monto</Label>
                  <p className="text-lg font-medium">{subscription.amount}</p>
                </div>
                <div className="flex items-center space-x-3">
                  <Label htmlFor="subscription-status">Estado:</Label>
                  <div className="flex items-center space-x-2">
                    <Switch
                      id="subscription-status"
                      checked={subscription.is_active}
                      onCheckedChange={handleSubscriptionStatusChange}
                    />
                    <span className={subscription.is_active ? "text-green-600 font-medium" : "text-amber-600 font-medium"}>
                      {subscription.is_active ? "Activada" : "No Activada"}
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
