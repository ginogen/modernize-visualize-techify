// This file is automatically generated. Do not edit it directly.
import { createClient } from '@supabase/supabase-js';
import type { Database } from './types';

const SUPABASE_URL = "https://vlkcjmhppcwfcgnwjbvc.supabase.co";
const SUPABASE_PUBLISHABLE_KEY = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InZsa2NqbWhwcGN3ZmNnbndqYnZjIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDEyNjkwMjQsImV4cCI6MjA1Njg0NTAyNH0.9-lV_9vidAiczSivLkLSN_8gbLbb2b4mdnUAtQW9Kuc";

// Import the supabase client like this:
// import { supabase } from "@/integrations/supabase/client";

export const supabase = createClient<Database>(SUPABASE_URL, SUPABASE_PUBLISHABLE_KEY);