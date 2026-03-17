// Re-export for legacy imports (e.g. SignIn, SignUp). New code should use lib/supabase.
import { supabase } from './lib/supabase';
export { supabase };
export default supabase;
