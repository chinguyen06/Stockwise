/// <reference types="vite/client" />
import { createClient } from '@supabase/supabase-js';

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL || 'https://epfzaoviwbuntyqtdyny.supabase.co';
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY || 'sb_publishable_IX1l_4P2s2mF57568oZQfg_7LRYE80g';

export const supabase = createClient(supabaseUrl, supabaseAnonKey);
