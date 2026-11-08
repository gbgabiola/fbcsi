"use server";

import { redirect } from "next/navigation";
import { createSupabaseClient } from "../../lib/supabase/server";

export async function signOut() {
  const supabase = await createSupabaseClient();
  if (!supabase) redirect("/sign-in");

  const { error } = await supabase.auth.signOut({ scope: "local" });
  const failed = error && error.code !== "session_not_found" && error.name !== "AuthSessionMissingError";
  redirect(failed ? "/sign-in?status=sign-out-error" : "/sign-in");
}
