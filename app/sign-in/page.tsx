import type { Metadata } from "next";
import { redirect } from "next/navigation";
import { createSupabaseClient } from "../../lib/supabase/server";
import { isSiteAdmin } from "../../lib/supabase/admin";
import { SignInForm } from "./sign-in-form";

export const metadata: Metadata = { title: "Administrator sign-in", robots: { index: false, follow: false } };
export const dynamic = "force-dynamic";

export default async function SignInPage() {
  const supabase = await createSupabaseClient();
  if (supabase && await isSiteAdmin(supabase)) redirect("/admin");

  return (
    <main id="main" className="wrap section">
      <div className="admin-panel">
        <h1>Administrator sign-in</h1>
        <p>Use the email address assigned to the church website administrator.</p>
        {supabase ? <SignInForm /> : <p>Administrator sign-in is currently unavailable.</p>}
      </div>
    </main>
  );
}
