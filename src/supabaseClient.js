import { createClient } from "@supabase/supabase-js";

const supabaseUrl = "https://utyrftyzmfezmptvsiop.supabase.co";
const supabaseAnonKey =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InV0eXJmdHl6bWZlem1wdHZzaW9wIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTI5ODY3ODgsImV4cCI6MjA2ODU2Mjc4OH0.5zZGxwsJGGOmb4YIppju-bUdXwJPPqsFlXx0LBSF1jE";

export const supabase = createClient(supabaseUrl, supabaseAnonKey);