"use client";

import { useEffect, useState } from "react";

import { themeKey } from "./theme";

export function ThemeSwitch() {
  const [dark, setDark] = useState(false);

  useEffect(() => {
    const preference = matchMedia("(prefers-color-scheme: dark)");
    const root = document.documentElement;

    function syncPreference() {
      let saved;
      try { saved = localStorage.getItem(themeKey); } catch {}
      if (saved !== "light" && saved !== "dark" && root.dataset.themeOverride === undefined) {
        root.dataset.theme = preference.matches ? "dark" : "light";
      }
      setDark(root.dataset.theme === "dark");
    }

    syncPreference();
    preference.addEventListener("change", syncPreference);
    return () => preference.removeEventListener("change", syncPreference);
  }, []);

  function toggleTheme() {
    const root = document.documentElement;
    const next = root.dataset.theme === "dark" ? "light" : "dark";
    root.dataset.theme = next;
    root.dataset.themeOverride = "";
    setDark(next === "dark");
    try { localStorage.setItem(themeKey, next); } catch {}
  }

  return (
    <button type="button" className="theme-switch" aria-label="Dark mode" aria-pressed={dark} onClick={toggleTheme}>
      <span className="theme-icon-moon" aria-hidden="true">☾</span>
      <span className="theme-icon-sun" aria-hidden="true">☀︎</span>
    </button>
  );
}
