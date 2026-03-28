import { createClient } from '@supabase/supabase-js';
import dotenv from 'dotenv';
dotenv.config();
const supabaseUrl = process.env.VITE_SUPABASE_URL || 'https://epfzaoviwbuntyqtdyny.supabase.co';
const supabaseAnonKey = process.env.VITE_SUPABASE_ANON_KEY || 'sb_publishable_IX1l_4P2s2mF57568oZQfg_7LRYE80g';
const supabase = createClient(supabaseUrl, supabaseAnonKey);

async function test() {
  const { data, error } = await supabase.from('categories').select('*').limit(5);
  console.log('categories:', JSON.stringify(data, null, 2), error);
}
test();
