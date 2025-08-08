import { createClient } from '@supabase/supabase-js';

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

// Check if Supabase is properly configured
if (!supabaseUrl || !supabaseKey || supabaseKey === 'your-anon-key') {
  console.error('⚠️ Supabase not configured. Please add VITE_SUPABASE_URL and VITE_SUPABASE_ANON_KEY environment variables.');
}

export const supabase = createClient(
  supabaseUrl || 'https://placeholder.supabase.co', 
  supabaseKey || 'placeholder-key',
  {
    auth: {
      persistSession: true,
      autoRefreshToken: true,
    },
  }
);

export const isSupabaseConfigured = !!(supabaseUrl && supabaseKey && supabaseKey !== 'your-anon-key');

export type AuthUser = {
  id: string;
  email: string;
  user_metadata: {
    first_name?: string;
    last_name?: string;
    username?: string;
    favorite_game?: string;
    bio?: string;
  };
};
