
import { useState } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { CalendarIcon } from "lucide-react";
import { format } from "date-fns";
import { es } from "date-fns/locale";

import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Calendar } from "@/components/ui/calendar";
import { useToast } from "@/hooks/use-toast";
import { supabase } from "@/integrations/supabase/client";

const progressItemSchema = z.object({
  task_name: z.string().min(1, { message: "El nombre de la tarea es requerido" }),
  description: z.string().optional(),
  due_date: z.date().optional(),
  status: z.enum(["En Progreso", "Completada"]),
});

type ProgressItemValues = z.infer<typeof progressItemSchema>;

interface ProgressItemFormProps {
  clientId: string;
  onSuccess: () => void;
  onCancel: () => void;
  initialData?: {
    id: string;
    task_name: string;
    description: string | null;
    due_date: string | null;
    status: "En Progreso" | "Completada";
  };
}

const ProgressItemForm = ({
  clientId,
  onSuccess,
  onCancel,
  initialData,
}: ProgressItemFormProps) => {
  const { toast } = useToast();
  const [isSubmitting, setIsSubmitting] = useState(false);

  const form = useForm<ProgressItemValues>({
    resolver: zodResolver(progressItemSchema),
    defaultValues: {
      task_name: initialData?.task_name || "",
      description: initialData?.description || "",
      due_date: initialData?.due_date ? new Date(initialData.due_date) : undefined,
      status: initialData?.status || "En Progreso",
    },
  });

  const onSubmit = async (data: ProgressItemValues) => {
    try {
      setIsSubmitting(true);
      
      // Convert Date object to ISO string for Supabase
      const formattedData = {
        task_name: data.task_name,
        description: data.description || null,
        due_date: data.due_date ? data.due_date.toISOString().split('T')[0] : null,
        status: data.status,
      };
      
      if (initialData) {
        // Update existing progress item
        const { error } = await supabase
          .from("client_progress")
          .update(formattedData)
          .eq("id", initialData.id);

        if (error) throw error;
        
        toast({
          title: "Progreso actualizado",
          description: "El progreso del cliente ha sido actualizado exitosamente.",
        });
      } else {
        // Insert new progress item
        const { error } = await supabase.from("client_progress").insert({
          client_id: clientId,
          ...formattedData,
        });

        if (error) throw error;
        
        toast({
          title: "Progreso añadido",
          description: "El progreso del cliente ha sido añadido exitosamente.",
        });
      }
      
      onSuccess();
    } catch (error: any) {
      console.error("Error saving progress:", error.message);
      toast({
        title: "Error",
        description: "Hubo un problema al guardar el progreso.",
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
        <FormField
          control={form.control}
          name="task_name"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Nombre de la tarea</FormLabel>
              <FormControl>
                <Input placeholder="Ej. Configuración inicial" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        
        <FormField
          control={form.control}
          name="description"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Descripción</FormLabel>
              <FormControl>
                <Textarea 
                  placeholder="Breve descripción de la tarea" 
                  className="resize-none" 
                  {...field} 
                  value={field.value || ''}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        
        <FormField
          control={form.control}
          name="due_date"
          render={({ field }) => (
            <FormItem className="flex flex-col">
              <FormLabel>Fecha</FormLabel>
              <Popover>
                <PopoverTrigger asChild>
                  <FormControl>
                    <Button
                      variant={"outline"}
                      className={`w-full pl-3 text-left font-normal ${
                        !field.value ? "text-muted-foreground" : ""
                      }`}
                    >
                      {field.value ? (
                        format(field.value, "PPP", { locale: es })
                      ) : (
                        <span>Seleccionar fecha</span>
                      )}
                      <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                    </Button>
                  </FormControl>
                </PopoverTrigger>
                <PopoverContent className="w-auto p-0" align="start">
                  <Calendar
                    mode="single"
                    selected={field.value}
                    onSelect={field.onChange}
                    disabled={(date) => date < new Date("1900-01-01")}
                    initialFocus
                  />
                </PopoverContent>
              </Popover>
              <FormMessage />
            </FormItem>
          )}
        />
        
        <FormField
          control={form.control}
          name="status"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Estado</FormLabel>
              <Select
                onValueChange={field.onChange}
                defaultValue={field.value}
              >
                <FormControl>
                  <SelectTrigger>
                    <SelectValue placeholder="Seleccionar estado" />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  <SelectItem value="En Progreso">En Progreso</SelectItem>
                  <SelectItem value="Completada">Completada</SelectItem>
                </SelectContent>
              </Select>
              <FormMessage />
            </FormItem>
          )}
        />
        
        <div className="flex justify-end space-x-2 pt-4">
          <Button
            type="button"
            variant="outline"
            onClick={onCancel}
            disabled={isSubmitting}
          >
            Cancelar
          </Button>
          <Button type="submit" disabled={isSubmitting}>
            {isSubmitting ? "Guardando..." : initialData ? "Actualizar" : "Guardar"}
          </Button>
        </div>
      </form>
    </Form>
  );
};

export default ProgressItemForm;
