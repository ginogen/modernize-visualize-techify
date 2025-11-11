import React from "react";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";

interface ContactStep1Props {
  formData: {
    email: string;
    phone: string;
    name: string;
  };
  updateFormData: (data: Partial<ContactStep1Props['formData']>) => void;
}

const ContactStep1: React.FC<ContactStep1Props> = ({ formData, updateFormData }) => {
  return (
    <div className="space-y-6">
      <div>
        <h3 className="text-xl font-semibold text-white mb-2">
          Información de Contacto
        </h3>
        <p className="text-gray-300">
          Para poder contactarte sobre tu proyecto
        </p>
      </div>
      
      <div className="space-y-4">
        <div className="space-y-2">
          <Label htmlFor="name" className="text-gray-200">Nombre completo *</Label>
          <Input
            id="name"
            value={formData.name}
            onChange={(e) => updateFormData({ name: e.target.value })}
            placeholder="Tu nombre y apellido"
            className="bg-gray-800 border-gray-600 text-white placeholder:text-gray-400 focus:border-blue-400"
            required
          />
        </div>
        
        <div className="space-y-2">
          <Label htmlFor="email" className="text-gray-200">Correo electrónico *</Label>
          <Input
            id="email"
            type="email"
            value={formData.email}
            onChange={(e) => updateFormData({ email: e.target.value })}
            placeholder="tu@email.com"
            className="bg-gray-800 border-gray-600 text-white placeholder:text-gray-400 focus:border-blue-400"
            required
          />
        </div>
        
        <div className="space-y-2">
          <Label htmlFor="phone" className="text-gray-200">Número de teléfono *</Label>
          <Input
            id="phone"
            type="tel"
            value={formData.phone}
            onChange={(e) => updateFormData({ phone: e.target.value })}
            placeholder="+54 9 11 1234-5678"
            className="bg-gray-800 border-gray-600 text-white placeholder:text-gray-400 focus:border-blue-400"
            required
          />
        </div>
      </div>
    </div>
  );
};

export default ContactStep1;