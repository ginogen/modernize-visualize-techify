
import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2.38.4";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
};

serve(async (req) => {
  // Handle CORS preflight requests
  if (req.method === "OPTIONS") {
    return new Response("ok", { headers: corsHeaders });
  }

  try {
    const supabaseUrl = Deno.env.get("SUPABASE_URL") || "";
    const supabaseServiceKey = Deno.env.get("SUPABASE_SERVICE_ROLE_KEY") || "";
    
    if (!supabaseUrl || !supabaseServiceKey) {
      throw new Error("Missing environment variables for Supabase connection");
    }
    
    const supabase = createClient(supabaseUrl, supabaseServiceKey);
    
    // Generate a secure random password
    const generatedPassword = Math.random().toString(36).slice(2) + Math.random().toString(36).toUpperCase().slice(2);
    
    // Create the admin user with Supabase Auth
    const { data: authData, error: authError } = await supabase.auth.admin.createUser({
      email: "hola@builders-ai.com",
      password: generatedPassword,
      email_confirm: true, // Auto-confirm email
    });

    if (authError) {
      console.error("Error creating admin user:", authError);
      return new Response(
        JSON.stringify({ error: authError.message }),
        { 
          headers: { ...corsHeaders, "Content-Type": "application/json" },
          status: 400 
        }
      );
    }

    const userId = authData.user.id;

    // Insert or update profile data with admin role
    const { error: profileError } = await supabase
      .from("profiles")
      .upsert({
        id: userId,
        email: "hola@builders-ai.com",
        responsible_name: "Administrador",
        business_name: "Builders AI",
        address: "Dirección Administrativa",
        city: "Ciudad",
        country: "País",
        role: "admin" // Set the user as admin
      });

    if (profileError) {
      console.error("Error setting admin profile:", profileError);
      // Don't delete the user if profile creation fails, just report the error
      return new Response(
        JSON.stringify({ 
          error: profileError.message,
          note: "User was created but profile update failed",
          userId: userId,
          password: generatedPassword
        }),
        { 
          headers: { ...corsHeaders, "Content-Type": "application/json" },
          status: 400 
        }
      );
    }

    return new Response(
      JSON.stringify({ 
        success: true, 
        message: "Admin user created successfully",
        email: "hola@builders-ai.com",
        password: generatedPassword 
      }),
      { 
        headers: { ...corsHeaders, "Content-Type": "application/json" },
        status: 200 
      }
    );
  } catch (error) {
    console.error("Server error:", error);
    return new Response(
      JSON.stringify({ error: error instanceof Error ? error.message : "Error interno del servidor" }),
      { 
        headers: { ...corsHeaders, "Content-Type": "application/json" },
        status: 500 
      }
    );
  }
});
