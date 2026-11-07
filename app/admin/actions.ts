"use server";

import { redirect } from "next/navigation";
import { isSiteAdmin } from "../../lib/supabase/admin";
import { createSupabaseClient } from "../../lib/supabase/server";

export async function signOut() {
  const supabase = await createSupabaseClient();
  if (!supabase || !(await isSiteAdmin(supabase))) redirect("/sign-in");

  const { error } = await supabase.auth.signOut({ scope: "local" });
  redirect(error ? "/admin?status=sign-out-error" : "/sign-in");
}
