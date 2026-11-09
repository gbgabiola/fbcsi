"use server";

import { redirect } from "next/navigation";
import { createSupabaseClient } from "../../lib/supabase/server";

import { getAdminAccess } from "../../lib/supabase/admin";

export type SignInState = {
  email: string;
  step: "request" | "verify";
  message: string;
};

export async function signIn(state: SignInState, formData: FormData): Promise<SignInState> {
  const email = String(formData.get("email") ?? "").trim().toLowerCase();
  if (email.length > 254 || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    return { email: "", step: "request", message: "Enter a valid email address." };
  }

  const supabase = await createSupabaseClient();
  if (!supabase) {
    return { email, step: "request", message: "Administrator sign-in is currently unavailable." };
  }

  if (state.step === "verify" && formData.get("intent") !== "resend") {
    const token = String(formData.get("code") ?? "").trim();
    if (!/^\d{6,10}$/.test(token)) {
      return { email, step: "verify", message: "Enter the full code from your email (6 to 10 digits)." };
    }

    const { error } = await supabase.auth.verifyOtp({ email, token, type: "email" });
    if (error) {
      return { email, step: "verify", message: "That code could not be verified. Try again or request a new code." };
    }

    if ((await getAdminAccess(supabase)) !== "granted") {
      await supabase.auth.signOut({ scope: "local" });
      return { email, step: "verify", message: "Administrator access could not be verified." };
    }

    redirect("/admin");
  }

  const { error } = await supabase.auth.signInWithOtp({ email, options: { shouldCreateUser: false } });
  if (error && error.code !== "user_not_found") {
    console.warn("Administrator sign-in code request failed", { code: error.code, status: error.status });
  }
  return {
    email,
    step: "verify",
    message: "If this email has the administrator account, you’ll receive a sign-in code.",
  };
}
