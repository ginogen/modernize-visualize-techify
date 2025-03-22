
import React from "react";
import { useOnboarding } from "@/contexts/OnboardingContext";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Link } from "react-router-dom";
import { ExternalLink } from "lucide-react";

const Step1Form: React.FC = () => {
  const { formData, updateFormData } = useOnboarding();

  const handleCountryChange = (value: string) => {
    updateFormData({ 
      country: value as "Argentina" | "Chile" | "México" | "Colombia",
      // Reset Argentina info if country is not Argentina
      ...(value !== "Argentina" && { argentinaInfo: undefined })
    });
  };

  const handleArgentinaInfoChange = (key: keyof typeof formData.argentinaInfo, value: string) => {
    updateFormData({
      argentinaInfo: {
        ...formData.argentinaInfo,
        [key]: value
      }
    });
  };

  return (
    <div className="space-y-6">
      {formData.proposalId && formData.proposalSlug && (
        <div className="space-y-2 border p-4 rounded-md bg-accent/20">
          <Label htmlFor="proposalId">Referencia de Propuesta</Label>
          <div className="flex items-center space-x-2">
            <Input
              id="proposalId"
              value={formData.proposalId}
              readOnly
              className="bg-accent/10 cursor-not-allowed flex-grow"
            />
            <Link 
              to={`/proposal/${formData.proposalSlug}`}
              target="_blank" 
              rel="noopener noreferrer"
              className="p-2 rounded bg-primary text-primary-foreground hover:bg-primary/90 transition-colors"
            >
              <ExternalLink className="h-5 w-5" />
            </Link>
          </div>
          <p className="text-xs text-muted-foreground">
            Esta información se completará a partir de la propuesta aceptada
          </p>
        </div>
      )}

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="space-y-2">
          <Label htmlFor="responsibleName">Nombre del Responsable *</Label>
          <Input
            id="responsibleName"
            value={formData.responsibleName}
            onChange={(e) => updateFormData({ responsibleName: e.target.value })}
            placeholder="Nombre y apellido"
            required
          />
        </div>
        
        <div className="space-y-2">
          <Label htmlFor="businessName">Nombre de la Empresa *</Label>
          <Input
            id="businessName"
            value={formData.businessName}
            onChange={(e) => updateFormData({ businessName: e.target.value })}
            placeholder="Razón social"
            required
          />
        </div>
        
        <div className="space-y-2">
          <Label htmlFor="email">Correo Electrónico *</Label>
          <Input
            id="email"
            type="email"
            value={formData.email}
            onChange={(e) => updateFormData({ email: e.target.value })}
            placeholder="email@ejemplo.com"
            required
          />
        </div>
        
        <div className="space-y-2">
          <Label htmlFor="website">Sitio Web</Label>
          <Input
            id="website"
            value={formData.website}
            onChange={(e) => updateFormData({ website: e.target.value })}
            placeholder="https://www.ejemplo.com"
          />
        </div>
        
        <div className="space-y-2 md:col-span-2">
          <Label htmlFor="address">Dirección *</Label>
          <Input
            id="address"
            value={formData.address}
            onChange={(e) => updateFormData({ address: e.target.value })}
            placeholder="Calle, número, piso, depto."
            required
          />
        </div>
        
        <div className="space-y-2">
          <Label htmlFor="phone">Teléfono</Label>
          <Input
            id="phone"
            value={formData.phone}
            onChange={(e) => updateFormData({ phone: e.target.value })}
            placeholder="+123456789"
          />
        </div>
        
        <div className="space-y-2">
          <Label htmlFor="city">Ciudad *</Label>
          <Input
            id="city"
            value={formData.city}
            onChange={(e) => updateFormData({ city: e.target.value })}
            placeholder="Ciudad"
            required
          />
        </div>
        
        <div className="space-y-2">
          <Label htmlFor="country">País *</Label>
          <Select 
            value={formData.country} 
            onValueChange={handleCountryChange}
          >
            <SelectTrigger>
              <SelectValue placeholder="Seleccione un país" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="Argentina">Argentina</SelectItem>
              <SelectItem value="Chile">Chile</SelectItem>
              <SelectItem value="Colombia">Colombia</SelectItem>
              <SelectItem value="México">México</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>
      
      {formData.country === "Argentina" && (
        <div className="mt-6 p-4 border rounded-md bg-accent/10">
          <h3 className="text-lg font-medium mb-4">Información fiscal para Argentina</h3>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-2">
              <Label htmlFor="cuit">CUIT *</Label>
              <Input
                id="cuit"
                value={formData.argentinaInfo?.cuit || ""}
                onChange={(e) => handleArgentinaInfoChange("cuit", e.target.value)}
                placeholder="XX-XXXXXXXX-X"
                required
              />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="condicionFiscal">Condición Fiscal *</Label>
              <Select 
                value={formData.argentinaInfo?.condicionFiscal || "Responsable Inscripto"} 
                onValueChange={(value) => handleArgentinaInfoChange("condicionFiscal", value as any)}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Seleccione una condición fiscal" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="Responsable Inscripto">Responsable Inscripto</SelectItem>
                  <SelectItem value="Monotributista">Monotributista</SelectItem>
                  <SelectItem value="Exento">Exento</SelectItem>
                  <SelectItem value="Consumidor Final">Consumidor Final</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Step1Form;
