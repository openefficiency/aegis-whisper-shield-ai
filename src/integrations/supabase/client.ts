// This file is automatically generated. Do not edit it directly.
import { createClient } from '@supabase/supabase-js';
import type { Database } from './types';

const SUPABASE_URL = "https://qkchsuujefzafyepmmih.supabase.co";
const SUPABASE_PUBLISHABLE_KEY = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InFrY2hzdXVqZWZ6YWZ5ZXBtbWloIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDgyNTA1MTksImV4cCI6MjA2MzgyNjUxOX0.u_rukB0ujLDRL2ifU_Mx7vE0cxwv-af3YRRahJRQGZY";

// Import the supabase client like this:
// import { supabase } from "@/integrations/supabase/client";

export const supabase = createClient<Database>(SUPABASE_URL, SUPABASE_PUBLISHABLE_KEY);