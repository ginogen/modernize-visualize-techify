
import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
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
  Plus, 
  Trash2, 
  DollarSign, 
  Currency
} from "lucide-react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";
import TemplateSelector from "@/components/admin/TemplateSelector";
import PaymentDetailsFields from "@/components/admin/PaymentDetailsFields";

const CreateProposal = () => {
  const [formData, setFormData] = useState({
    clientName: "",
    clientEmail: "",
    service: "",
    scope: "",
    investment: "",
    paymentMethod: "",
    monthlySubscription: ""
  });
  const [investmentItems, setInvestmentItems] = useState<string[]>([""]);
  const [currency, setCurrency] = useState("$");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [numberOfPayments, setNumberOfPayments] = useState(1);
  const [paymentSchedule, setPaymentSchedule] = useState("");
  const navigate = useNavigate();
  const { toast } = useToast();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
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

  const generateSlug = (name: string) => {
    // Create a slug from the client name
    const slug = name
      .toLowerCase()
      .replace(/[^\w\s]/gi, '')
      .replace(/\s+/g, '-')
      .trim();
    
    // Add a random string at the end to make it unique
    return `${slug}-${Math.random().toString(36).substring(2, 7)}`;
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
    
    try {
      setIsSubmitting(true);
      
      const slug = generateSlug(formData.clientName);
      
      const { data, error } = await supabase
        .from('proposals')
        .insert([
          {
            client_name: formData.clientName,
            client_email: formData.clientEmail,
            service: formData.service,
            scope: formData.scope,
            investment: formData.investment,
            investment_items: filteredInvestmentItems,
            investment_currency: currency,
            slug: slug,
            payment_method: formData.paymentMethod,
            monthly_subscription: formData.monthlySubscription,
            payment_schedule: paymentSchedule,
            number_of_payments: numberOfPayments
          }
        ])
        .select();
      
      if (error) {
        throw error;
      }
      
      toast({
        title: "Éxito",
        description: "Propuesta creada correctamente."
      });
      
      navigate('/admin');
    } catch (error: any) {
      console.error("Error creating proposal:", error.message);
      toast({
        title: "Error",
        description: "No se pudo crear la propuesta.",
        variant: "destructive"
      });
    } finally {
      setIsSubmitting(false);
    }
  };

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
            <h1 className="text-2xl font-bold">Crear Nueva Propuesta</h1>
          </div>
          
          <Card>
            <CardHeader>
              <CardTitle>Información de la Propuesta</CardTitle>
              <CardDescription>
                Ingresa los detalles para la nueva propuesta
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
                  <p className="text-sm text-muted-foreground">Añada detalles de los ítems incluidos en la propuesta</p>
                  
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
              </CardContent>
              
              <CardFooter>
                <Button type="submit" disabled={isSubmitting} className="w-full">
                  {isSubmitting ? (
                    <>Guardando...</>
                  ) : (
                    <>
                      <Save className="mr-2 h-4 w-4" />
                      Guardar Propuesta
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

export default CreateProposal;
