import { serve } from "https://deno.land/std@0.177.0/http/server.ts";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2.42.7";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "*",
  "Access-Control-Allow-Methods": "POST, OPTIONS",
  "Access-Control-Max-Age": "86400"
};

serve(async (req) => {
  // Handle CORS preflight requests
  if (req.method === "OPTIONS") {
    return new Response("ok", { 
      headers: corsHeaders,
      status: 200
    });
  }

  try {
    const supabaseUrl = Deno.env.get("SUPABASE_URL") || "";
    const supabaseServiceKey = Deno.env.get("SUPABASE_SERVICE_ROLE_KEY") || "";
    
    // Cliente de Supabase con permisos de servicio para operaciones administrativas
    const supabase = createClient(supabaseUrl, supabaseServiceKey);
    
    // Crear un cliente con el token de autorización del administrador
    const authHeader = req.headers.get("Authorization");
    if (!authHeader || !authHeader.startsWith("Bearer ")) {
      return new Response(
        JSON.stringify({ error: "Se requiere autorización" }),
        { 
          headers: { ...corsHeaders, "Content-Type": "application/json" },
          status: 401
        }
      );
    }
    
    const token = authHeader.split(" ")[1];
    const adminClient = createClient(supabaseUrl, token);
    
    // Verificar que el usuario es un administrador
    const { data: { user }, error: authError } = await adminClient.auth.getUser();
    
    if (authError || !user) {
      return new Response(
        JSON.stringify({ error: "Usuario no autenticado" }),
        { 
          headers: { ...corsHeaders, "Content-Type": "application/json" },
          status: 401
        }
      );
    }
    
    // Verificar rol de administrador
    const { data: profileData, error: profileError } = await supabase
      .from('profiles')
      .select('role')
      .eq('id', user.id)
      .single();
    
    if (profileError || !profileData || profileData.role !== 'admin') {
      return new Response(
        JSON.stringify({ error: "Acceso denegado. Se requieren permisos de administrador." }),
        { 
          headers: { ...corsHeaders, "Content-Type": "application/json" },
          status: 403
        }
      );
    }
    
    // Obtener los datos del cuerpo de la solicitud
    const { email } = await req.json();
    
    if (!email) {
      return new Response(
        JSON.stringify({ error: "Se requiere el email del usuario" }),
        { 
          headers: { ...corsHeaders, "Content-Type": "application/json" },
          status: 400
        }
      );
    }
    
    // Buscar el usuario por email
    const { data: userData, error: userError } = await supabase.auth.admin.listUsers();
    
    if (userError) {
      return new Response(
        JSON.stringify({ error: "Error al buscar usuarios" }),
        { 
          headers: { ...corsHeaders, "Content-Type": "application/json" },
          status: 500
        }
      );
    }
    
    const targetUser = userData.users.find(u => u.email === email);
    if (!targetUser) {
      return new Response(
        JSON.stringify({ error: "Usuario no encontrado" }),
        { 
          headers: { ...corsHeaders, "Content-Type": "application/json" },
          status: 404
        }
      );
    }
    
    return new Response(
      JSON.stringify({ 
        success: true,
        userId: targetUser.id,
        userEmail: targetUser.email,
        userCreatedAt: targetUser.created_at
      }),
      { 
        headers: { ...corsHeaders, "Content-Type": "application/json" },
        status: 200
      }
    );
  } catch (error) {
    console.error("Error del servidor:", error);
    return new Response(
      JSON.stringify({ error: "Error interno del servidor" }),
      { 
        headers: { ...corsHeaders, "Content-Type": "application/json" },
        status: 500
      }
    );
  }
}); 