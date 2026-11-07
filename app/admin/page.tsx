import type { Metadata } from "next";
import { redirect } from "next/navigation";
import { isSiteAdmin } from "../../lib/supabase/admin";
import { createSupabaseClient } from "../../lib/supabase/server";
import { signOut } from "./actions";

export const metadata: Metadata = { title: "Church administration", robots: { index: false, follow: false } };
export const dynamic = "force-dynamic";

export default async function AdminPage({ searchParams }: {
  searchParams: Promise<{ status?: string | string[] }>;
}) {
  const supabase = await createSupabaseClient();
  if (!supabase || !(await isSiteAdmin(supabase))) redirect("/sign-in");

  const { status } = await searchParams;
  return (
    <main id="main" className="wrap section">
      <div className="admin-panel">
        <h1>Church administration</h1>
        <p>You are signed in as the site administrator.</p>
        {status === "sign-out-error" && <p role="alert">You could not be signed out. Please try again.</p>}
        <form className="sign-out" action={signOut}>
          <button className="secondary-button" type="submit">Sign out</button>
        </form>
      </div>
    </main>
  );
}
