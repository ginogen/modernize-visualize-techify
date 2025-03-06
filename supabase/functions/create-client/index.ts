
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
    
    const supabase = createClient(supabaseUrl, supabaseServiceKey);
    
    const { formData } = await req.json();
    
    if (!formData || !formData.email) {
      return new Response(
        JSON.stringify({ error: "Email es requerido" }),
        { 
          headers: { ...corsHeaders, "Content-Type": "application/json" },
          status: 400 
        }
      );
    }

    // Generate a random password
    const generatedPassword = Math.random().toString(36).substring(2, 10);
    
    // Create the user with Supabase Auth
    const { data: authData, error: authError } = await supabase.auth.admin.createUser({
      email: formData.email,
      password: generatedPassword,
      email_confirm: true, // Auto-confirm email
    });

    if (authError) {
      console.error("Error creating user:", authError);
      return new Response(
        JSON.stringify({ error: authError.message }),
        { 
          headers: { ...corsHeaders, "Content-Type": "application/json" },
          status: 400 
        }
      );
    }

    const userId = authData.user.id;

    // Insert profile data
    const { error: profileError } = await supabase
      .from("profiles")
      .insert({
        id: userId,
        responsible_name: formData.responsibleName,
        business_name: formData.businessName,
        email: formData.email,
        website: formData.website || null,
        address: formData.address,
        phone: formData.phone || null,
        city: formData.city,
        country: formData.country,
        business_description: formData.businessDescription,
        objective: formData.objective
      });

    if (profileError) {
      console.error("Error inserting profile:", profileError);
      // Try to clean up the auth user if profile creation fails
      await supabase.auth.admin.deleteUser(userId);
      
      return new Response(
        JSON.stringify({ error: profileError.message }),
        { 
          headers: { ...corsHeaders, "Content-Type": "application/json" },
          status: 400 
        }
      );
    }

    // Insert Argentina-specific info if provided
    if (formData.country === "Argentina" && formData.argentinaInfo) {
      const { error: argentinaError } = await supabase
        .from("argentina_info")
        .insert({
          id: userId,
          cuit: formData.argentinaInfo.cuit,
          condicion_fiscal: formData.argentinaInfo.condicionFiscal
        });

      if (argentinaError) {
        console.error("Error inserting argentina info:", argentinaError);
        // Note: We don't delete the user here as the main profile was created successfully
      }
    }

    return new Response(
      JSON.stringify({ 
        success: true, 
        userId: userId,
        generatedPassword: generatedPassword 
      }),
      { 
        headers: { ...corsHeaders, "Content-Type": "application/json" },
        status: 201 
      }
    );
  } catch (error) {
    console.error("Server error:", error);
    return new Response(
      JSON.stringify({ error: "Error interno del servidor" }),
      { 
        headers: { ...corsHeaders, "Content-Type": "application/json" },
        status: 500 
      }
    );
  }
});
