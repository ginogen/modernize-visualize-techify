
import React, { useEffect } from "react";
import { useOnboarding } from "@/contexts/OnboardingContext";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Card, CardContent } from "@/components/ui/card";

const Step1Form: React.FC = () => {
  const { formData, updateFormData } = useOnboarding();
  
  // Mostrar/ocultar campos específicos de Argentina cuando cambie el país
  useEffect(() => {
    if (formData.country !== "Argentina" && formData.argentinaInfo) {
      updateFormData({ argentinaInfo: undefined });
    } else if (formData.country === "Argentina" && !formData.argentinaInfo) {
      updateFormData({
        argentinaInfo: {
          cuit: "",
          condicionFiscal: "Responsable Inscripto",
        },
      });
    }
  }, [formData.country]);

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="space-y-2">
          <Label htmlFor="responsibleName">Nombre Responsable *</Label>
          <Input
            id="responsibleName"
            value={formData.responsibleName}
            onChange={(e) => updateFormData({ responsibleName: e.target.value })}
            placeholder="Nombre completo"
            required
          />
        </div>
        
        <div className="space-y-2">
          <Label htmlFor="businessName">Nombre de la Empresa *</Label>
          <Input
            id="businessName"
            value={formData.businessName}
            onChange={(e) => updateFormData({ businessName: e.target.value })}
            placeholder="Nombre de la empresa"
            required
          />
        </div>
        
        <div className="space-y-2">
          <Label htmlFor="email">Email *</Label>
          <Input
            id="email"
            type="email"
            value={formData.email}
            onChange={(e) => updateFormData({ email: e.target.value })}
            placeholder="correo@ejemplo.com"
            required
          />
        </div>
        
        <div className="space-y-2">
          <Label htmlFor="website">Sitio Web</Label>
          <Input
            id="website"
            value={formData.website}
            onChange={(e) => updateFormData({ website: e.target.value })}
            placeholder="www.ejemplo.com"
          />
        </div>
        
        <div className="space-y-2">
          <Label htmlFor="address">Dirección *</Label>
          <Input
            id="address"
            value={formData.address}
            onChange={(e) => updateFormData({ address: e.target.value })}
            placeholder="Dirección completa"
            required
          />
        </div>
        
        <div className="space-y-2">
          <Label htmlFor="phone">Teléfono</Label>
          <Input
            id="phone"
            value={formData.phone}
            onChange={(e) => updateFormData({ phone: e.target.value })}
            placeholder="+1234567890"
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
            onValueChange={(value) => updateFormData({ country: value as any })}
          >
            <SelectTrigger id="country">
              <SelectValue placeholder="Seleccione un país" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="Argentina">Argentina</SelectItem>
              <SelectItem value="Chile">Chile</SelectItem>
              <SelectItem value="México">México</SelectItem>
              <SelectItem value="Colombia">Colombia</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>
      
      {formData.country === "Argentina" && (
        <Card className="mt-6 bg-accent/50">
          <CardContent className="pt-6">
            <h3 className="text-lg font-medium mb-4">Información adicional para Argentina</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <Label htmlFor="cuit">CUIT *</Label>
                <Input
                  id="cuit"
                  value={formData.argentinaInfo?.cuit || ""}
                  onChange={(e) =>
                    updateFormData({
                      argentinaInfo: {
                        ...formData.argentinaInfo!,
                        cuit: e.target.value,
                      },
                    })
                  }
                  placeholder="XX-XXXXXXXX-X"
                  required
                />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="condicionFiscal">Condición Fiscal *</Label>
                <Select
                  value={formData.argentinaInfo?.condicionFiscal}
                  onValueChange={(value) =>
                    updateFormData({
                      argentinaInfo: {
                        ...formData.argentinaInfo!,
                        condicionFiscal: value as any,
                      },
                    })
                  }
                >
                  <SelectTrigger id="condicionFiscal">
                    <SelectValue placeholder="Seleccione condición fiscal" />
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
          </CardContent>
        </Card>
      )}
    </div>
  );
};

export default Step1Form;
