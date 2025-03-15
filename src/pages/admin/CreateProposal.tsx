
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

type InvestmentItem = {
  description: string;
  amount: string;
};

const CreateProposal = () => {
  const [formData, setFormData] = useState({
    clientName: "",
    clientEmail: "",
    service: "",
    scope: "",
    investment: ""
  });
  const [investmentItems, setInvestmentItems] = useState<InvestmentItem[]>([
    { description: "", amount: "" }
  ]);
  const [currency, setCurrency] = useState("$");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const navigate = useNavigate();
  const { toast } = useToast();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleInvestmentItemChange = (index: number, field: keyof InvestmentItem, value: string) => {
    const updatedItems = [...investmentItems];
    updatedItems[index] = { ...updatedItems[index], [field]: value };
    setInvestmentItems(updatedItems);
  };

  const addInvestmentItem = () => {
    setInvestmentItems([...investmentItems, { description: "", amount: "" }]);
  };

  const removeInvestmentItem = (index: number) => {
    if (investmentItems.length > 1) {
      const updatedItems = investmentItems.filter((_, i) => i !== index);
      setInvestmentItems(updatedItems);
    }
  };

  const calculateTotal = (): string => {
    const total = investmentItems.reduce((sum, item) => {
      const amount = parseFloat(item.amount) || 0;
      return sum + amount;
    }, 0);
    return total.toFixed(2);
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
    
    if (!formData.clientName || !formData.clientEmail || !formData.service || !formData.scope) {
      toast({
        title: "Error",
        description: "Por favor completa todos los campos obligatorios.",
        variant: "destructive"
      });
      return;
    }
    
    // Validate investment items
    const emptyItems = investmentItems.some(item => !item.description || !item.amount);
    if (emptyItems) {
      toast({
        title: "Error",
        description: "Por favor completa todos los ítems de inversión o elimina los vacíos.",
        variant: "destructive"
      });
      return;
    }
    
    try {
      setIsSubmitting(true);
      
      const slug = generateSlug(formData.clientName);
      const totalInvestment = calculateTotal();
      
      const { data, error } = await supabase
        .from('proposals')
        .insert([
          {
            client_name: formData.clientName,
            client_email: formData.clientEmail,
            service: formData.service,
            scope: formData.scope,
            investment: totalInvestment,
            investment_items: investmentItems,
            investment_currency: currency,
            slug: slug
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
                  <Label htmlFor="service">Servicio</Label>
                  <Input
                    id="service"
                    name="service"
                    value={formData.service}
                    onChange={handleChange}
                    placeholder="Descripción del servicio"
                  />
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="scope">Alcance de Funciones</Label>
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
                    <Label>Inversión</Label>
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
                  
                  {investmentItems.map((item, index) => (
                    <div key={index} className="flex gap-2 items-start">
                      <div className="flex-1">
                        <Input
                          placeholder="Descripción del ítem"
                          value={item.description}
                          onChange={(e) => handleInvestmentItemChange(index, 'description', e.target.value)}
                        />
                      </div>
                      <div className="w-32">
                        <Input
                          placeholder="Monto"
                          type="number"
                          min="0"
                          step="0.01"
                          value={item.amount}
                          onChange={(e) => handleInvestmentItemChange(index, 'amount', e.target.value)}
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
                  
                  <div className="flex justify-between items-center">
                    <Button
                      type="button"
                      variant="outline"
                      size="sm"
                      onClick={addInvestmentItem}
                    >
                      <Plus className="h-4 w-4 mr-1" />
                      Agregar Ítem
                    </Button>
                    
                    <div className="text-right">
                      <p className="text-sm text-muted-foreground">Total:</p>
                      <p className="text-lg font-bold">{currency} {calculateTotal()}</p>
                    </div>
                  </div>
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
