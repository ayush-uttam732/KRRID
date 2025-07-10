import { createClient } from '@supabase/supabase-js';

const supabaseUrl = 'https://azphpzwalortrhrzqfou.supabase.co';
const supabaseAnonKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImF6cGhwendhbG9ydHJocnpxZm91Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDcyOTA0MjksImV4cCI6MjA2Mjg2NjQyOX0.ifa77hwBseuo9OUtsNuN78RXMeDx3cmx_fEUBIWXA0g';

// Add logging to verify the URL format
console.log('Supabase URL:', supabaseUrl);

export const supabase = createClient(supabaseUrl, supabaseAnonKey, {
  auth: {
    autoRefreshToken: true,
    persistSession: true,
    detectSessionInUrl: true
  }
});

// Admin client with custom storage key
export const supabaseAdmin = createClient(supabaseUrl, supabaseAnonKey, {
  auth: {
    autoRefreshToken: true,
    persistSession: true,
    detectSessionInUrl: true,
    storageKey: 'sb-admin-auth-token',
  }
});