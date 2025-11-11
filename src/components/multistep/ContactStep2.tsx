import React from "react";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";

interface ContactStep2Props {
  formData: {
    projectType: string;
  };
  updateFormData: (data: Partial<ContactStep2Props['formData']>) => void;
}

const ContactStep2: React.FC<ContactStep2Props> = ({ formData, updateFormData }) => {
  return (
    <div className="space-y-6">
      <div>
        <h3 className="text-xl font-semibold text-white mb-2">
          ¿Qué proyecto querés desarrollar?
        </h3>
        <p className="text-gray-300">
          Contanos sobre tu idea y cómo podemos ayudarte
        </p>
      </div>
      
      <div className="space-y-4">
        <div className="space-y-2">
          <Label htmlFor="projectType" className="text-gray-200">Descripción del proyecto *</Label>
          <Textarea
            id="projectType"
            value={formData.projectType}
            onChange={(e) => updateFormData({ projectType: e.target.value })}
            placeholder="Indicar si es software, agente IA, automatización, etc. Describí tu proyecto con el mayor detalle posible."
            className="min-h-[120px] bg-gray-800 border-gray-600 text-white placeholder:text-gray-400 focus:border-blue-400"
            required
          />
        </div>
        
        <div className="text-sm text-gray-400">
          <p className="mb-2"><strong className="text-gray-300">Ejemplos de proyectos:</strong></p>
          <ul className="space-y-1">
            <li>• Software personalizado (CRM, sistema de gestión, etc.)</li>
            <li>• Agente de IA para atención al cliente</li>
            <li>• Automatización de procesos (facturas, emails, etc.)</li>
            <li>• Bot de WhatsApp para ventas o soporte</li>
            <li>• Integración de sistemas existentes</li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default ContactStep2;