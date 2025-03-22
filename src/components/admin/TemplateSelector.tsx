
import { useState, useEffect } from 'react';
import { 
  Popover, 
  PopoverContent, 
  PopoverTrigger 
} from "@/components/ui/popover";
import { Button } from "@/components/ui/button";
import { 
  Command, 
  CommandEmpty, 
  CommandGroup, 
  CommandInput, 
  CommandItem, 
  CommandList, 
  CommandSeparator 
} from "@/components/ui/command";
import { 
  Check, 
  Plus, 
  Save, 
  BookmarkPlus 
} from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { Input } from "@/components/ui/input";
import { useToast } from "@/hooks/use-toast";

type Template = {
  id: string;
  name: string;
  content: string;
  template_type: string;
};

type TemplateSelectorProps = {
  fieldType: 'service' | 'scope' | 'investment_item' | 'payment_method' | 'monthly_subscription';
  value: string;
  onChange: (value: string) => void;
};

const TemplateSelector = ({ fieldType, value, onChange }: TemplateSelectorProps) => {
  const [open, setOpen] = useState(false);
  const [saveMode, setSaveMode] = useState(false);
  const [templateName, setTemplateName] = useState('');
  const [templates, setTemplates] = useState<Template[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();

  useEffect(() => {
    fetchTemplates();
  }, [fieldType]);

  const fetchTemplates = async () => {
    setIsLoading(true);
    try {
      const { data, error } = await supabase
        .from('templates' as any)
        .select('*')
        .eq('template_type', fieldType);
      
      if (error) throw error;
      
      const templateData = (data || []) as unknown as Template[];
      setTemplates(templateData);
    } catch (error: any) {
      console.error('Error fetching templates', error);
      toast({
        title: "Error",
        description: "No se pudieron cargar las plantillas",
        variant: "destructive"
      });
    } finally {
      setIsLoading(false);
    }
  };

  const saveTemplate = async () => {
    if (!templateName.trim()) {
      toast({
        title: "Error",
        description: "Por favor ingrese un nombre para la plantilla",
        variant: "destructive"
      });
      return;
    }

    try {
      const { error } = await supabase
        .from('templates' as any)
        .insert({
          name: templateName,
          content: value,
          template_type: fieldType
        } as any);
      
      if (error) throw error;
      
      toast({
        title: "Éxito",
        description: "Plantilla guardada correctamente"
      });
      
      fetchTemplates();
      setSaveMode(false);
      setTemplateName('');
    } catch (error: any) {
      console.error('Error saving template', error);
      toast({
        title: "Error",
        description: "No se pudo guardar la plantilla",
        variant: "destructive"
      });
    }
  };

  const selectTemplate = (content: string) => {
    onChange(content);
    setOpen(false);
  };

  const getFieldLabel = () => {
    switch (fieldType) {
      case 'service':
        return 'Servicio';
      case 'scope':
        return 'Alcance';
      case 'investment_item':
        return 'Ítem de Inversión';
      case 'payment_method':
        return 'Modalidad de Pago';
      case 'monthly_subscription':
        return 'Suscripción Mensual';
      default:
        return 'Campo';
    }
  };

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button 
          variant="outline" 
          size="sm" 
          className="h-8 ml-2 text-xs"
        >
          <BookmarkPlus className="h-3.5 w-3.5 mr-1" />
          Plantillas
        </Button>
      </PopoverTrigger>
      <PopoverContent className="p-0 w-72" align="end">
        {saveMode ? (
          <div className="p-4 space-y-4">
            <h4 className="font-medium text-sm">Guardar como plantilla</h4>
            <div className="space-y-2">
              <Input
                placeholder="Nombre de la plantilla"
                value={templateName}
                onChange={(e) => setTemplateName(e.target.value)}
              />
            </div>
            <div className="flex justify-between">
              <Button
                variant="outline"
                size="sm"
                onClick={() => setSaveMode(false)}
              >
                Cancelar
              </Button>
              <Button size="sm" onClick={saveTemplate}>
                <Save className="h-3.5 w-3.5 mr-1.5" />
                Guardar
              </Button>
            </div>
          </div>
        ) : (
          <Command>
            <CommandInput placeholder={`Buscar plantillas de ${getFieldLabel()}`} />
            <CommandList>
              <CommandEmpty>No se encontraron plantillas</CommandEmpty>
              <CommandGroup heading="Plantillas guardadas">
                {templates.map((template) => (
                  <CommandItem
                    key={template.id}
                    value={template.name}
                    onSelect={() => selectTemplate(template.content)}
                  >
                    {template.name}
                    <Check
                      className={`h-4 w-4 ml-auto ${value === template.content ? "opacity-100" : "opacity-0"}`}
                    />
                  </CommandItem>
                ))}
              </CommandGroup>
              <CommandSeparator />
              <CommandGroup>
                <CommandItem
                  onSelect={() => setSaveMode(true)}
                  className="text-primary"
                >
                  <Plus className="h-4 w-4 mr-2" />
                  Guardar contenido actual como plantilla
                </CommandItem>
              </CommandGroup>
            </CommandList>
          </Command>
        )}
      </PopoverContent>
    </Popover>
  );
};

export default TemplateSelector;
