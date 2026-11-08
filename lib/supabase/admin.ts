import type { SupabaseClient } from "@supabase/supabase-js";

export async function getAdminAccess(supabase: SupabaseClient) {
  const { data } = await supabase.auth.getClaims();
  const claims = data?.claims;
  if (!claims?.sub) return "signed-out";
  if (claims.is_anonymous) return "denied";

  const { data: assignment, error } = await supabase
    .from("site_admin")
    .select("user_id")
    .eq("user_id", claims.sub)
    .maybeSingle();

  return !error && assignment?.user_id === claims.sub ? "granted" : "denied";
}
