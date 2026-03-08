Äimport { createServerClient, type CookieOptions } from "@supabase/ssr";
import { cookies } from "next/headers";

export async function createSupabaseServerClient() {
  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

  if (!supabaseUrl || !supabaseKey) {
    if (process.env.NODE_ENV === "development") {
      console.warn("[Supabase Server] Missing environment variables. Please check .env.example");
    }
    return null;
  }

  const cookieStore = await cookies();

  return createServerClient(
    supabaseUrl,
    supabaseKey,
    {
      cookies: {
        getAll() {
          return cookieStore.getAll();
        },
        setAll(cookiesToSet: { name: string; value: string; options: CookieOptions }[]) {
          try {
            cookiesToSet.forEach(({ name, value, options }) => {
              cookieStore.set(name, value, options);
            });
          } catch (error) {
            // This can be ignored if setAll is called from a Server Component
          }
        },
      },
    }
  );
}° °±*cascade08
±² ²µ*cascade08
µ¶ ¶·*cascade08
·º º»*cascade08
»à àá*cascade08
áä äé*cascade08
éê ê÷*cascade08
÷¡ ¡ª*cascade08
ª« «Î *cascade08Î‚*cascade08‚Š *cascade08ŠŒ*cascade08Œ *cascade08*cascade08Á *cascade08ÁÂ*cascade08ÂÃ *cascade08ÃÄ*cascade08ÄÅ *cascade08ÅÇ*cascade08ÇÈ *cascade08ÈÏ*cascade08ÏĞ *cascade08ĞÒ*cascade08ÒÓ *cascade08ÓÚ*cascade08Úİ *cascade08İã*cascade08ãß *cascade08
ß¿ ¿Ç*cascade08
ÇÈ È—*cascade08
—Ä "(72bd7035e7a959ee4bbfe129beb12c2a2dd46bad2rfile:///Users/santiagovalencia/proyecto%20informatico_1%20frontend/Proyecto_Informatico/src/lib/supabase/server.ts:Wfile:///Users/santiagovalencia/proyecto%20informatico_1%20frontend/Proyecto_Informatico