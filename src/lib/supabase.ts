import { createClient } from '@supabase/supabase-js';

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL || "https://oywpzlotiryyuafjuwur.supabase.co";
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY || "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im95d3B6bG90aXJ5eXVhZmp1d3VyIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDg5ODQ3OTAsImV4cCI6MjA2NDU2MDc5MH0.0HK-8jFghnaTemYWQdeB19aE5Ib-gaZu2sW6j_gVb6w";

if (!supabaseUrl || !supabaseAnonKey) {
  throw new Error('Missing Supabase configuration');
}

export const supabase = createClient(supabaseUrl, supabaseAnonKey); 