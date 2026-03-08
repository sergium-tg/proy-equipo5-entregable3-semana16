¡import { createBrowserClient } from "@supabase/ssr";

export function createSupabaseBrowserClient() {
  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

  if (!supabaseUrl || !supabaseKey) {
    console.warn("[Supabase Browser] Missing environment variables.");
    return null;
  }

  return createBrowserClient(supabaseUrl, supabaseKey);
}
h hl*cascade08lm mo*cascade08op pq*cascade08qr rt*cascade08tv vw*cascade08wz z{*cascade08	{   ¡*cascade08
¡¤ ¤©*cascade08
©ª ª·*cascade08
·á áê*cascade08
êë ë‰*cascade08
‰Œ Œœ*cascade08
œ¡ "(72bd7035e7a959ee4bbfe129beb12c2a2dd46bad2rfile:///Users/santiagovalencia/proyecto%20informatico_1%20frontend/Proyecto_Informatico/src/lib/supabase/client.ts:Wfile:///Users/santiagovalencia/proyecto%20informatico_1%20frontend/Proyecto_Informatico