
import React from "react";
import { useOnboarding } from "@/contexts/OnboardingContext";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";

const Step2Form: React.FC = () => {
  const { formData, updateFormData } = useOnboarding();

  return (
    <div className="space-y-6">
      <div className="space-y-2">
        <Label htmlFor="businessDescription">Breve descripción del Negocio *</Label>
        <Textarea
          id="businessDescription"
          value={formData.businessDescription}
          onChange={(e) => updateFormData({ businessDescription: e.target.value })}
          placeholder="Describa brevemente a qué se dedica su empresa"
          rows={5}
          required
        />
      </div>
      
      <div className="space-y-2">
        <Label htmlFor="objective">Objetivo *</Label>
        <Textarea
          id="objective"
          value={formData.objective}
          onChange={(e) => updateFormData({ objective: e.target.value })}
          placeholder="¿Qué desea lograr con nuestro servicio?"
          rows={5}
          required
        />
      </div>
    </div>
  );
};

export default Step2Form;
