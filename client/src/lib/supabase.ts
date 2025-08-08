import { createClient } from '@supabase/supabase-js';

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL || 'http://localhost:54321';
const supabaseKey = import.meta.env.VITE_SUPABASE_ANON_KEY || 'your-anon-key';

export const supabase = createClient(supabaseUrl, supabaseKey, {
  auth: {
    persistSession: true,
    autoRefreshToken: true,
  },
});

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
