import type { Database } from '@/integrations/supabase/types';

export type Cliente = Database['public']['Tables']['clientes']['Row'];
export type ClienteFormData = Omit<Database['public']['Tables']['clientes']['Insert'], 'id' | 'color' | 'created_at' | 'user_id'>;

export type Tarea = Database['public']['Tables']['tareas']['Row'];
export type TareaFormData = Omit<Database['public']['Tables']['tareas']['Insert'], 'id' | 'created_at' | 'user_id'> & {
  completada?: boolean;
};

export interface Mensualidad {
  id: string;
  cliente_id: string;
  suscripcion_activa: boolean;
  plataforma: 'Stripe' | 'MercadoPago' | 'Transferencia';
  moneda: 'ARS' | 'USD';
  pagos: {
    [mes: string]: number;
  };
  created_at: string;
  updated_at: string;
  user_id: string;
} 