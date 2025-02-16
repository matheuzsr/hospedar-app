import { createClient } from '@supabase/supabase-js';

const runtimeConfig = useRuntimeConfig();
const supabaseUrl = runtimeConfig.supabaseUrl;
const supabaseKey = runtimeConfig.supabaseKey;

export const supabase = createClient(supabaseUrl, supabaseKey);
