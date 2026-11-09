"use client";

import Script from "next/script";
import { useEffect, useRef, useState } from "react";

type TurnstileApi = {
  render(element: HTMLElement, options: { sitekey: string; theme: "auto" }): string;
  reset(widgetId: string): void;
  remove(widgetId: string): void;
};

function getTurnstile() {
  return (window as Window & { turnstile?: TurnstileApi }).turnstile;
}

export function SignInChallenge({ siteKey, attempt }: { siteKey: string; attempt: object }) {
  const container = useRef<HTMLDivElement>(null);
  const widget = useRef<string | null>(null);
  const [ready, setReady] = useState(false);
  const [unavailable, setUnavailable] = useState(false);

  useEffect(() => {
    const api = getTurnstile();
    if (!ready || !api || !container.current) return;

    const id = api.render(container.current, { sitekey: siteKey, theme: "auto" });
    widget.current = id;
    return () => {
      api.remove(id);
      widget.current = null;
    };
  }, [ready, siteKey]);

  useEffect(() => {
    if (widget.current !== null) getTurnstile()?.reset(widget.current);
  }, [attempt]);

  return (
    <>
      <Script
        src="https://challenges.cloudflare.com/turnstile/v0/api.js?render=explicit"
        strategy="afterInteractive"
        onReady={() => setReady(true)}
        onError={() => setUnavailable(true)}
      />
      <div ref={container} />
      {unavailable && <p role="alert">The security check could not load. Refresh this page and try again.</p>}
    </>
  );
}
