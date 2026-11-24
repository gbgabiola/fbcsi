"use client";

import { useEffect, useState } from "react";

export function ThemeSwitch() {
  const [dark, setDark] = useState(false);
  const [ready, setReady] = useState(false);

  useEffect(() => {
    const preference = matchMedia("(prefers-color-scheme: dark)");
    function syncPreference() {
      document.documentElement.dataset.theme = preference.matches ? "dark" : "light";
      setDark(preference.matches);
    }
    syncPreference();
    setReady(true);
    preference.addEventListener("change", syncPreference);
    return () => preference.removeEventListener("change", syncPreference);
  }, []);

  function toggleTheme() {
    const next = document.documentElement.dataset.theme !== "dark";
    document.documentElement.dataset.theme = next ? "dark" : "light";
    setDark(next);
  }

  return (
    <button type="button" className="theme-switch" aria-label="Dark mode" aria-pressed={dark} disabled={!ready} title={dark ? "Switch to light mode" : "Switch to dark mode"} onClick={toggleTheme}>
      <svg className="theme-icon-sun" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" aria-hidden="true" focusable="false">
        <circle cx="12" cy="12" r="4" />
        <path d="M12 2v2m0 16v2M2 12h2m16 0h2M5 5l1.5 1.5m11 11L19 19M5 19l1.5-1.5m11-11L19 5" />
      </svg>
      <svg className="theme-icon-moon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinejoin="round" aria-hidden="true" focusable="false">
        <path d="M20.5 15A8.5 8.5 0 0 1 9 3.5 8.5 8.5 0 1 0 20.5 15Z" />
      </svg>
    </button>
  );
}
