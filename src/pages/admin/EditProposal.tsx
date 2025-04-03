import { useState, useEffect } from "react";
import { useNavigate, useParams, Link } from "react-router-dom";
import { 
  Card, 
  CardContent, 
  CardDescription, 
  CardFooter, 
  CardHeader, 
  CardTitle 
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { 
  CircuitBoard, 
  ArrowLeft, 
  Save, 
  Loader2,
  AlertTriangle,
  Plus,
  Trash2,
  DollarSign,
  Currency
} from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";
import { 
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import TemplateSelector from "@/components/admin/TemplateSelector";
import PaymentDetailsFields from "@/components/admin/PaymentDetailsFields";

const EditProposal = () => {
  const [formData, setFormData] = useState({
    clientName: "",
    clientEmail: "",
    service: "",
    scope: "",
    investment: "",
    status: "",
    paymentMethod: "",
    monthlySubscription: ""
  });
  const [investmentItems, setInvestmentItems] = useState<string[]>([""]);
  const [currency, setCurrency] = useState("$");
  const [numberOfPayments, setNumberOfPayments] = useState(1);
  const [paymentSchedule, setPaymentSchedule] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState("");
  const navigate = useNavigate();
  const { id } = useParams();
  const { toast } = useToast();

  useEffect(() => {
    if (id) {
      fetchProposal(id);
    }
  }, [id]);

  const fetchProposal = async (proposalId: string) => {
    try {
      setIsLoading(true);
      setError("");
      
      const { data, error } = await supabase
        .from('proposals')
        .select('*')
        .eq('id', proposalId)
        .single();
      
      if (error) {
        throw error;
      }
      
      if (data) {
        setFormData({
          clientName: data.client_name,
          clientEmail: data.client_email,
          service: data.service,
          scope: data.scope,
          investment: data.investment,
          status: data.status,
          paymentMethod: data.payment_method || "",
          monthlySubscription: data.monthly_subscription || ""
        });
        
        if (data.investment_items && Array.isArray(data.investment_items) && data.investment_items.length > 0) {
          setInvestmentItems(data.investment_items);
        }
        
        if (data.investment_currency) {
          setCurrency(data.investment_currency);
        }

        if (data.number_of_payments) {
          setNumberOfPayments(data.number_of_payments);
        }

        if (data.payment_schedule) {
          setPaymentSchedule(data.payment_schedule);
        }
      }
    } catch (error: any) {
      console.error('Error fetching proposal:', error.message);
      setError("No se pudo cargar la propuesta. Verifique el ID e intente nuevamente.");
    } finally {
      setIsLoading(false);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleStatusChange = (value: string) => {
    setFormData((prev) => ({ ...prev, status: value }));
  };

  const handleInvestmentItemChange = (index: number, value: string) => {
    const updatedItems = [...investmentItems];
    updatedItems[index] = value;
    setInvestmentItems(updatedItems);
  };

  const addInvestmentItem = () => {
    setInvestmentItems([...investmentItems, ""]);
  };

  const removeInvestmentItem = (index: number) => {
    if (investmentItems.length > 1) {
      const updatedItems = investmentItems.filter((_, i) => i !== index);
      setInvestmentItems(updatedItems);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!formData.clientName || !formData.clientEmail || !formData.service || !formData.scope || !formData.investment) {
      toast({
        title: "Error",
        description: "Por favor completa todos los campos obligatorios.",
        variant: "destructive"
      });
      return;
    }
    
    // Filter out empty investment items
    const filteredInvestmentItems = investmentItems.filter(item => item.trim() !== "");

    // Generar un nuevo slug basado en el nombre del cliente actual
    const generateNewSlug = (name: string) => {
      const baseSlug = name
        .toLowerCase()
        .replace(/[^\w\s]/gi, '')
        .replace(/\s+/g, '-')
        .trim();
      
      // Añadir un sufijo aleatorio para garantizar la unicidad
      return `${baseSlug}-${Date.now().toString().slice(-4)}`;
    };
    
    try {
      setIsSubmitting(true);
      
      // Primero obtener la propuesta actual para comparar el nombre del cliente
      const { data: currentProposal, error: fetchError } = await supabase
        .from('proposals')
        .select('client_name, slug')
        .eq('id', id)
        .single();
      
      if (fetchError) {
        throw fetchError;
      }
      
      // Determinar si hay que actualizar el slug
      const needsNewSlug = currentProposal.client_name !== formData.clientName;
      const updateData: any = {
        client_name: formData.clientName,
        client_email: formData.clientEmail,
        service: formData.service,
        scope: formData.scope,
        investment: formData.investment,
        investment_items: filteredInvestmentItems,
        investment_currency: currency,
        status: formData.status,
        payment_method: formData.paymentMethod,
        monthly_subscription: formData.monthlySubscription,
        payment_schedule: paymentSchedule,
        number_of_payments: numberOfPayments,
        updated_at: new Date().toISOString()
      };
      
      // Si el nombre del cliente cambió, generar un nuevo slug
      if (needsNewSlug) {
        updateData.slug = generateNewSlug(formData.clientName);
      }
      
      const { error } = await supabase
        .from('proposals')
        .update(updateData)
        .eq('id', id);
      
      if (error) {
        throw error;
      }
      
      toast({
        title: "Éxito",
        description: "Propuesta actualizada correctamente."
      });
      
      navigate('/admin');
    } catch (error: any) {
      console.error("Error updating proposal:", error.message);
      toast({
        title: "Error",
        description: "No se pudo actualizar la propuesta.",
        variant: "destructive"
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <Loader2 className="h-8 w-8 animate-spin mr-2" />
        <p>Cargando propuesta...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-background flex flex-col items-center justify-center p-4">
        <AlertTriangle className="h-12 w-12 text-red-500 mb-4" />
        <h1 className="text-xl font-bold mb-2">Error</h1>
        <p className="text-center mb-6">{error}</p>
        <Button onClick={() => navigate('/admin')}>
          Volver al Dashboard
        </Button>
      </div>
    );
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
        </div>
      </header>

      <main className="container mx-auto py-8 px-4">
        <div className="max-w-3xl mx-auto">
          <div className="flex items-center mb-6">
            <Button variant="ghost" onClick={() => navigate('/admin')} className="mr-4">
              <ArrowLeft className="h-4 w-4 mr-2" />
              Volver
            </Button>
            <h1 className="text-2xl font-bold">Editar Propuesta</h1>
          </div>
          
          <Card>
            <CardHeader>
              <CardTitle>Modificar Propuesta</CardTitle>
              <CardDescription>
                Actualiza los detalles de la propuesta
              </CardDescription>
            </CardHeader>
            
            <form onSubmit={handleSubmit}>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="clientName">Nombre del Cliente</Label>
                  <Input
                    id="clientName"
                    name="clientName"
                    value={formData.clientName}
                    onChange={handleChange}
                    placeholder="Nombre del cliente o empresa"
                  />
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="clientEmail">Email del Cliente</Label>
                  <Input
                    id="clientEmail"
                    name="clientEmail"
                    type="email"
                    value={formData.clientEmail}
                    onChange={handleChange}
                    placeholder="email@ejemplo.com"
                  />
                </div>
                
                <div className="space-y-2">
                  <div className="flex justify-between items-center">
                    <Label htmlFor="service">Servicio</Label>
                    <TemplateSelector 
                      fieldType="service"
                      value={formData.service}
                      onChange={(value) => setFormData(prev => ({ ...prev, service: value }))}
                    />
                  </div>
                  <Input
                    id="service"
                    name="service"
                    value={formData.service}
                    onChange={handleChange}
                    placeholder="Descripción del servicio"
                  />
                </div>
                
                <div className="space-y-2">
                  <div className="flex justify-between items-center">
                    <Label htmlFor="scope">Alcance de Funciones</Label>
                    <TemplateSelector 
                      fieldType="scope"
                      value={formData.scope}
                      onChange={(value) => setFormData(prev => ({ ...prev, scope: value }))}
                    />
                  </div>
                  <Textarea
                    id="scope"
                    name="scope"
                    value={formData.scope}
                    onChange={handleChange}
                    placeholder="Detalle el alcance y las funcionalidades"
                    rows={6}
                  />
                </div>
                
                <div className="space-y-4">
                  <div className="flex justify-between items-center">
                    <Label htmlFor="investment">Inversión</Label>
                    <div className="flex items-center gap-2">
                      <Label htmlFor="currency" className="sr-only">Moneda</Label>
                      <Select value={currency} onValueChange={setCurrency}>
                        <SelectTrigger className="w-24">
                          <SelectValue placeholder="Moneda" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="$">
                            <div className="flex items-center">
                              <DollarSign className="h-4 w-4 mr-1" />
                              <span>$</span>
                            </div>
                          </SelectItem>
                          <SelectItem value="U$D">
                            <div className="flex items-center">
                              <Currency className="h-4 w-4 mr-1" />
                              <span>U$D</span>
                            </div>
                          </SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>
                  
                  <Input
                    id="investment"
                    name="investment"
                    type="text"
                    value={formData.investment}
                    onChange={handleChange}
                    placeholder="Monto total de la inversión"
                  />
                </div>
                
                <PaymentDetailsFields 
                  investment={formData.investment}
                  paymentMethod={formData.paymentMethod}
                  onPaymentMethodChange={(value) => setFormData(prev => ({ ...prev, paymentMethod: value }))}
                  paymentSchedule={paymentSchedule}
                  onPaymentScheduleChange={setPaymentSchedule}
                  numberOfPayments={numberOfPayments}
                  onNumberOfPaymentsChange={setNumberOfPayments}
                />

                <div className="space-y-2">
                  <div className="flex justify-between items-center">
                    <Label htmlFor="monthlySubscription">Suscripción Mensual</Label>
                    <TemplateSelector 
                      fieldType="monthly_subscription"
                      value={formData.monthlySubscription}
                      onChange={(value) => setFormData(prev => ({ ...prev, monthlySubscription: value }))}
                    />
                  </div>
                  <Input
                    id="monthlySubscription"
                    name="monthlySubscription"
                    value={formData.monthlySubscription}
                    onChange={handleChange}
                    placeholder="Detalles de la suscripción mensual"
                  />
                </div>
                
                <div className="space-y-2">
                  <div className="flex justify-between items-center">
                    <Label>Ítems de Inversión</Label>
                    <TemplateSelector 
                      fieldType="investment_item"
                      value={investmentItems.join('\n')}
                      onChange={(value) => setInvestmentItems(value.split('\n').filter(line => line.trim() !== ""))}
                    />
                  </div>
                  <p className="text-sm text-muted-foreground">Detalles de los ítems incluidos en la propuesta</p>
                  
                  {investmentItems.map((item, index) => (
                    <div key={index} className="flex gap-2 items-start">
                      <div className="flex-1">
                        <Input
                          placeholder="Descripción del ítem"
                          value={item}
                          onChange={(e) => handleInvestmentItemChange(index, e.target.value)}
                        />
                      </div>
                      <Button
                        type="button"
                        variant="ghost"
                        size="icon"
                        onClick={() => removeInvestmentItem(index)}
                        disabled={investmentItems.length === 1}
                      >
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </div>
                  ))}
                  
                  <Button
                    type="button"
                    variant="outline"
                    size="sm"
                    onClick={addInvestmentItem}
                    className="mt-2"
                  >
                    <Plus className="h-4 w-4 mr-1" />
                    Agregar Ítem
                  </Button>
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="status">Estado</Label>
                  <Select
                    value={formData.status}
                    onValueChange={handleStatusChange}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Selecciona un estado" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="Enviada">Enviada</SelectItem>
                      <SelectItem value="Aceptada">Aceptada</SelectItem>
                      <SelectItem value="No Aceptada">No Aceptada</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </CardContent>
              
              <CardFooter>
                <Button type="submit" disabled={isSubmitting} className="w-full">
                  {isSubmitting ? (
                    <>Guardando...</>
                  ) : (
                    <>
                      <Save className="mr-2 h-4 w-4" />
                      Actualizar Propuesta
                    </>
                  )}
                </Button>
              </CardFooter>
            </form>
          </Card>
        </div>
      </main>
    </div>
  );
};

export default EditProposal;
