import type { Database } from '@/integrations/supabase/types';

export type Cliente = Database['public']['Tables']['clientes']['Row'];
export type ClienteFormData = Omit<Database['public']['Tables']['clientes']['Insert'], 'id' | 'color' | 'created_at' | 'user_id'>;

export type Tarea = Database['public']['Tables']['tareas']['Row'];
export type TareaFormData = Omit<Database['public']['Tables']['tareas']['Insert'], 'id' | 'created_at' | 'user_id'> & {
  completada?: boolean;
}; 