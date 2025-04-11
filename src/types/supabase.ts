Need to install the following packages:
supabase@2.20.12
Ok to proceed? (y) 

export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export interface Database {
  public: {
    Tables: {
      clientes: {
        Row: {
          id: string
          nombre: string
          color: string
          email: string | null
          telefono: string | null
          pais: string | null
          cuit: string | null
          condicion: string | null
          created_at: string
          user_id: string
        }
        Insert: {
          id?: string
          nombre: string
          color: string
          email?: string | null
          telefono?: string | null
          pais?: string | null
          cuit?: string | null
          condicion?: string | null
          created_at?: string
          user_id: string
        }
        Update: {
          id?: string
          nombre?: string
          color?: string
          email?: string | null
          telefono?: string | null
          pais?: string | null
          cuit?: string | null
          condicion?: string | null
          created_at?: string
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "clientes_user_id_fkey"
            columns: ["user_id"]
            referencedRelation: "users"
            referencedColumns: ["id"]
          }
        ]
      }
      pagos: {
        Row: {
          id: string
          cliente_id: string
          descripcion: string
          monto: number
          fecha_pago: string
          estado: string
          moneda: string
          created_at: string
          updated_at: string
          user_id: string
        }
        Insert: {
          id?: string
          cliente_id: string
          descripcion: string
          monto: number
          fecha_pago: string
          estado: string
          moneda: string
          created_at?: string
          updated_at?: string
          user_id: string
        }
        Update: {
          id?: string
          cliente_id?: string
          descripcion?: string
          monto?: number
          fecha_pago?: string
          estado?: string
          moneda?: string
          created_at?: string
          updated_at?: string
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "pagos_cliente_id_fkey"
            columns: ["cliente_id"]
            referencedRelation: "clientes"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "pagos_user_id_fkey"
            columns: ["user_id"]
            referencedRelation: "users"
            referencedColumns: ["id"]
          }
        ]
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      [_ in never]: never
    }
    Enums: {
      [_ in never]: never
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
} 