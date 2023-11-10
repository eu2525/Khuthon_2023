import { createClient as CC } from 'https://esm.sh/@supabase/supabase-js@2'


export const createClient = (req: Request) => {
  const authHeader = req.headers.get("Authorization")!;
  const supabaseClient = CC(
    Deno.env.get("URL") ?? "",
    Deno.env.get("ANON_KEY") ?? "",
    { global: { headers: { Authorization: authHeader } } }
  );

  return supabaseClient;
};
