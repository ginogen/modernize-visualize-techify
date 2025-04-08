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
      tareas: {
        Row: {
          id: string
          descripcion: string
          cliente_id: string | null
          fecha_estimada: string | null
          completada: boolean
          created_at: string
          user_id: string
        }
        Insert: {
          id?: string
          descripcion: string
          cliente_id?: string | null
          fecha_estimada?: string | null
          completada?: boolean
          created_at?: string
          user_id: string
        }
        Update: {
          id?: string
          descripcion?: string
          cliente_id?: string | null
          fecha_estimada?: string | null
          completada?: boolean
          created_at?: string
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "tareas_cliente_id_fkey"
            columns: ["cliente_id"]
            referencedRelation: "clientes"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "tareas_user_id_fkey"
            columns: ["user_id"]
            referencedRelation: "users"
            referencedColumns: ["id"]
          }
        ]
      }
      argentina_info: {
        Row: {
          condicion_fiscal: string
          created_at: string
          cuit: string
          id: string
        }
        Insert: {
          condicion_fiscal: string
          created_at?: string
          cuit: string
          id: string
        }
        Update: {
          condicion_fiscal?: string
          created_at?: string
          cuit?: string
          id?: string
        }
        Relationships: [
          {
            foreignKeyName: "argentina_info_id_fkey"
            columns: ["id"]
            isOneToOne: true
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
        ]
      }
      client_payments: {
        Row: {
          amount: string | null
          client_id: string
          created_at: string | null
          description: string
          id: string
          is_invoiced: boolean | null
          is_paid: boolean | null
          paid_date: string | null
          payment_number: number
          proposal_id: string | null
          updated_at: string | null
        }
        Insert: {
          amount?: string | null
          client_id: string
          created_at?: string | null
          description: string
          id?: string
          is_invoiced?: boolean | null
          is_paid?: boolean | null
          paid_date?: string | null
          payment_number: number
          proposal_id?: string | null
          updated_at?: string | null
        }
        Update: {
          amount?: string | null
          client_id?: string
          created_at?: string | null
          description?: string
          id?: string
          is_invoiced?: boolean | null
          is_paid?: boolean | null
          paid_date?: string | null
          payment_number?: number
          proposal_id?: string | null
          updated_at?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "client_payments_client_id_fkey"
            columns: ["client_id"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "client_payments_proposal_id_fkey"
            columns: ["proposal_id"]
            isOneToOne: false
            referencedRelation: "proposals"
            referencedColumns: ["id"]
          },
        ]
      }
      client_progress: {
        Row: {
          client_id: string
          created_at: string
          description: string | null
          due_date: string | null
          id: string
          status: string
          task_name: string
          updated_at: string
        }
        Insert: {
          client_id: string
          created_at?: string
          description?: string | null
          due_date?: string | null
          id?: string
          status?: string
          task_name: string
          updated_at?: string
        }
        Update: {
          client_id?: string
          created_at?: string
          description?: string | null
          due_date?: string | null
          id?: string
          status?: string
          task_name?: string
          updated_at?: string
        }
        Relationships: [
          {
            foreignKeyName: "client_progress_client_id_fkey"
            columns: ["client_id"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
        ]
      }
      client_subscriptions: {
        Row: {
          amount: string
          client_id: string
          created_at: string | null
          id: string
          is_active: boolean | null
          proposal_id: string | null
          updated_at: string | null
        }
        Insert: {
          amount: string
          client_id: string
          created_at?: string | null
          id?: string
          is_active?: boolean | null
          proposal_id?: string | null
          updated_at?: string | null
        }
        Update: {
          amount?: string
          client_id?: string
          created_at?: string | null
          id?: string
          is_active?: boolean | null
          proposal_id?: string | null
          updated_at?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "client_subscriptions_client_id_fkey"
            columns: ["client_id"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "client_subscriptions_proposal_id_fkey"
            columns: ["proposal_id"]
            isOneToOne: false
            referencedRelation: "proposals"
            referencedColumns: ["id"]
          },
        ]
      }
      profiles: {
        Row: {
          address: string
          business_description: string | null
          business_name: string
          city: string
          country: string
          created_at: string
          email: string
          id: string
          objective: string | null
          phone: string | null
          responsible_name: string
          role: string
          website: string | null
        }
        Insert: {
          address: string
          business_description?: string | null
          business_name: string
          city: string
          country: string
          created_at?: string
          email: string
          id: string
          objective?: string | null
          phone?: string | null
          responsible_name: string
          role?: string
          website?: string | null
        }
        Update: {
          address?: string
          business_description?: string | null
          business_name?: string
          city?: string
          country?: string
          created_at?: string
          email?: string
          id?: string
          objective?: string | null
          phone?: string | null
          responsible_name?: string
          role?: string
          website?: string | null
        }
        Relationships: []
      }
      proposals: {
        Row: {
          client_email: string
          client_name: string
          created_at: string
          id: string
          investment: string
          investment_currency: string | null
          investment_items: string[] | null
          monthly_subscription: string | null
          number_of_payments: number | null
          opened: boolean | null
          payment_method: string | null
          payment_schedule: string | null
          scope: string
          service: string
          slug: string
          status: string
          total_view_time: number | null
          updated_at: string
        }
        Insert: {
          client_email: string
          client_name: string
          created_at?: string
          id?: string
          investment: string
          investment_currency?: string | null
          investment_items?: string[] | null
          monthly_subscription?: string | null
          number_of_payments?: number | null
          opened?: boolean | null
          payment_method?: string | null
          payment_schedule?: string | null
          scope: string
          service: string
          slug: string
          status?: string
          total_view_time?: number | null
          updated_at?: string
        }
        Update: {
          client_email?: string
          client_name?: string
          created_at?: string
          id?: string
          investment?: string
          investment_currency?: string | null
          investment_items?: string[] | null
          monthly_subscription?: string | null
          number_of_payments?: number | null
          opened?: boolean | null
          payment_method?: string | null
          payment_schedule?: string | null
          scope?: string
          service?: string
          slug?: string
          status?: string
          total_view_time?: number | null
          updated_at?: string
        }
        Relationships: []
      }
      templates: {
        Row: {
          content: string
          created_at: string
          id: string
          name: string
          template_type: string
        }
        Insert: {
          content: string
          created_at?: string
          id?: string
          name: string
          template_type: string
        }
        Update: {
          content?: string
          created_at?: string
          id?: string
          name?: string
          template_type?: string
        }
        Relationships: []
      }
      vibecode_waitlist: {
        Row: {
          created_at: string
          email: string
          id: string
          name: string
        }
        Insert: {
          created_at?: string
          email: string
          id?: string
          name: string
        }
        Update: {
          created_at?: string
          email?: string
          id?: string
          name?: string
        }
        Relationships: []
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      is_admin: {
        Args: Record<PropertyKey, never>
        Returns: boolean
      }
    }
    Enums: {
      [_ in never]: never
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
}

type PublicSchema = Database[Extract<keyof Database, "public">]

export type Tables<
  PublicTableNameOrOptions extends
    | keyof (PublicSchema["Tables"] & PublicSchema["Views"])
    | { schema: keyof Database },
  TableName extends PublicTableNameOrOptions extends { schema: keyof Database }
    ? keyof (Database[PublicTableNameOrOptions["schema"]]["Tables"] &
        Database[PublicTableNameOrOptions["schema"]]["Views"])
    : never = never,
> = PublicTableNameOrOptions extends { schema: keyof Database }
  ? (Database[PublicTableNameOrOptions["schema"]]["Tables"] &
      Database[PublicTableNameOrOptions["schema"]]["Views"])[TableName] extends {
      Row: infer R
    }
    ? R
    : never
  : PublicTableNameOrOptions extends keyof (PublicSchema["Tables"] &
        PublicSchema["Views"])
    ? (PublicSchema["Tables"] &
        PublicSchema["Views"])[PublicTableNameOrOptions] extends {
        Row: infer R
      }
      ? R
      : never
    : never

export type TablesInsert<
  PublicTableNameOrOptions extends
    | keyof PublicSchema["Tables"]
    | { schema: keyof Database },
  TableName extends PublicTableNameOrOptions extends { schema: keyof Database }
    ? keyof Database[PublicTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = PublicTableNameOrOptions extends { schema: keyof Database }
  ? Database[PublicTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Insert: infer I
    }
    ? I
    : never
  : PublicTableNameOrOptions extends keyof PublicSchema["Tables"]
    ? PublicSchema["Tables"][PublicTableNameOrOptions] extends {
        Insert: infer I
      }
      ? I
      : never
    : never

export type TablesUpdate<
  PublicTableNameOrOptions extends
    | keyof PublicSchema["Tables"]
    | { schema: keyof Database },
  TableName extends PublicTableNameOrOptions extends { schema: keyof Database }
    ? keyof Database[PublicTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = PublicTableNameOrOptions extends { schema: keyof Database }
  ? Database[PublicTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Update: infer U
    }
    ? U
    : never
  : PublicTableNameOrOptions extends keyof PublicSchema["Tables"]
    ? PublicSchema["Tables"][PublicTableNameOrOptions] extends {
        Update: infer U
      }
      ? U
      : never
    : never

export type Enums<
  PublicEnumNameOrOptions extends
    | keyof PublicSchema["Enums"]
    | { schema: keyof Database },
  EnumName extends PublicEnumNameOrOptions extends { schema: keyof Database }
    ? keyof Database[PublicEnumNameOrOptions["schema"]]["Enums"]
    : never = never,
> = PublicEnumNameOrOptions extends { schema: keyof Database }
  ? Database[PublicEnumNameOrOptions["schema"]]["Enums"][EnumName]
  : PublicEnumNameOrOptions extends keyof PublicSchema["Enums"]
    ? PublicSchema["Enums"][PublicEnumNameOrOptions]
    : never

export type CompositeTypes<
  PublicCompositeTypeNameOrOptions extends
    | keyof PublicSchema["CompositeTypes"]
    | { schema: keyof Database },
  CompositeTypeName extends PublicCompositeTypeNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof Database[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"]
    : never = never,
> = PublicCompositeTypeNameOrOptions extends { schema: keyof Database }
  ? Database[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"][CompositeTypeName]
  : PublicCompositeTypeNameOrOptions extends keyof PublicSchema["CompositeTypes"]
    ? PublicSchema["CompositeTypes"][PublicCompositeTypeNameOrOptions]
    : never
