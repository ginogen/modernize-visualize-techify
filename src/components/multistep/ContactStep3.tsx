import React from "react";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

interface ContactStep3Props {
  formData: {
    availableForCall: string;
    preferredTime?: string;
  };
  updateFormData: (data: Partial<ContactStep3Props['formData']>) => void;
}

const ContactStep3: React.FC<ContactStep3Props> = ({ formData, updateFormData }) => {
  return (
    <div className="space-y-6">
      <div>
        <h3 className="text-xl font-semibold text-white mb-2">
          ¿Estás disponible para una llamada?
        </h3>
        <p className="text-gray-300">
          Una consulta gratuita de 30 minutos para revisar tu proyecto
        </p>
      </div>
      
      <div className="space-y-6">
        <div className="space-y-3">
          <Label className="text-gray-200">Disponibilidad para llamada *</Label>
          <RadioGroup
            value={formData.availableForCall}
            onValueChange={(value) => updateFormData({ availableForCall: value })}
            className="space-y-2"
          >
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="yes" id="yes" className="border-gray-500 text-blue-400" />
              <Label htmlFor="yes" className="font-normal text-gray-200">
                Sí, estoy disponible para una llamada
              </Label>
            </div>
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="no" id="no" className="border-gray-500 text-blue-400" />
              <Label htmlFor="no" className="font-normal text-gray-200">
                No ahora, prefiero que me contacten por email/WhatsApp
              </Label>
            </div>
          </RadioGroup>
        </div>
        
        {formData.availableForCall === "yes" && (
          <div className="space-y-2">
            <Label htmlFor="preferredTime" className="text-gray-200">Horario preferido</Label>
            <Select
              value={formData.preferredTime || ""}
              onValueChange={(value) => updateFormData({ preferredTime: value })}
            >
              <SelectTrigger className="bg-gray-800 border-gray-600 text-white focus:border-blue-400">
                <SelectValue placeholder="Selecciona tu horario preferido" />
              </SelectTrigger>
              <SelectContent className="bg-gray-800 border-gray-600">
                <SelectItem value="morning" className="text-white hover:bg-gray-700">Mañana (9:00 - 12:00)</SelectItem>
                <SelectItem value="afternoon" className="text-white hover:bg-gray-700">Tarde (13:00 - 17:00)</SelectItem>
                <SelectItem value="evening" className="text-white hover:bg-gray-700">Noche (18:00 - 20:00)</SelectItem>
                <SelectItem value="flexible" className="text-white hover:bg-gray-700">Horario flexible</SelectItem>
              </SelectContent>
            </Select>
          </div>
        )}
        
        <div className="text-sm text-gray-400 space-y-2">
          <p><strong className="text-gray-300">En la llamada revisaremos:</strong></p>
          <ul className="space-y-1">
            <li>• Los detalles técnicos de tu proyecto</li>
            <li>• Timeline y presupuesto estimado</li>
            <li>• Siguientes pasos para comenzar</li>
            <li>• Resolveremos todas tus dudas</li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default ContactStep3;