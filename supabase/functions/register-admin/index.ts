
import { serve } from 'https://deno.land/std@0.168.0/http/server.ts'
import { createClient } from 'https://esm.sh/@supabase/supabase-js@2.22.0'

// CORS headers for browser requests
const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
}

interface RequestBody {
  email: string
  password: string
  responsibleName: string
  businessName: string
}

serve(async (req) => {
  // Handle CORS preflight requests
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders })
  }

  try {
    // Create a Supabase client with the service role key
    const supabaseUrl = Deno.env.get('SUPABASE_URL') || ''
    const supabaseServiceRoleKey = Deno.env.get('SUPABASE_SERVICE_ROLE_KEY') || ''
    
    const supabase = createClient(supabaseUrl, supabaseServiceRoleKey)
    
    // Get request data
    const requestData: RequestBody = await req.json()
    const { email, password, responsibleName, businessName } = requestData
    
    console.log(`Attempting to register admin for email: ${email}`)
    
    // Validate input
    if (!email || !password || !responsibleName || !businessName) {
      return new Response(
        JSON.stringify({ 
          error: 'Missing required fields' 
        }),
        { 
          status: 400, 
          headers: { 
            'Content-Type': 'application/json',
            ...corsHeaders
          } 
        }
      )
    }
    
    // Create user
    const { data: userData, error: createUserError } = await supabase.auth.admin.createUser({
      email,
      password,
      email_confirm: true, // Auto-confirm email
      user_metadata: {
        responsible_name: responsibleName,
        business_name: businessName,
      }
    })
    
    if (createUserError) {
      console.error('Error creating user:', createUserError)
      throw createUserError
    }
    
    if (!userData.user) {
      throw new Error('Failed to create user')
    }
    
    // Set user role as admin
    const { error: roleError } = await supabase
      .from('profiles')
      .update({ 
        role: 'admin',
        name: responsibleName,
        business_name: businessName
      })
      .eq('id', userData.user.id)
    
    if (roleError) {
      console.error('Error setting admin role:', roleError)
      throw roleError
    }
    
    return new Response(
      JSON.stringify({ 
        id: userData.user.id,
        email: userData.user.email,
        message: 'Admin user created successfully'
      }),
      { 
        status: 200, 
        headers: { 
          'Content-Type': 'application/json',
          ...corsHeaders
        } 
      }
    )
  } catch (error) {
    console.error('Error in register-admin function:', error)
    
    return new Response(
      JSON.stringify({ 
        error: error.message || 'An unexpected error occurred'
      }),
      { 
        status: 500, 
        headers: { 
          'Content-Type': 'application/json',
          ...corsHeaders
        } 
      }
    )
  }
})
