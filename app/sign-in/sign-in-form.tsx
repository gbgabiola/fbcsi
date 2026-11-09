"use client";

import { useActionState } from "react";
import { signIn, type SignInState } from "./actions";

import { SignInChallenge } from "./sign-in-challenge";

const initialState: SignInState = { email: "", step: "request", message: "" };

export function SignInForm({ siteKey }: { siteKey?: string }) {
  const [state, action, pending] = useActionState(signIn, initialState);
  const verifying = state.step === "verify";

  return (
    <form className="admin-form" action={action}>
      <label htmlFor="email">Email address</label>
      <input key={state.step} id="email" name="email" type="email" autoComplete="email" maxLength={254} required defaultValue={state.email} readOnly={verifying} />
      {verifying && (
        <>
          <label htmlFor="code">Email code</label>
          <input id="code" name="code" inputMode="numeric" autoComplete="one-time-code" maxLength={10} />
        </>
      )}
      {siteKey && <SignInChallenge siteKey={siteKey} attempt={state} />}
      <p role="status">{state.message}</p>
      <div className="actions">
        <button className="button" type="submit" disabled={pending}>{verifying ? "Sign in" : "Email me a code"}</button>
        {verifying && <button className="secondary-button" type="submit" name="intent" value="resend" disabled={pending}>Resend code</button>}
      </div>
      {verifying && <a href="/sign-in">Use another email address</a>}
    </form>
  );
}
