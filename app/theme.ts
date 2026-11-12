export const themeKey = "fbcsi-theme";

export const themeScript = `
(() => {
  let saved;
  try { saved = localStorage.getItem("${themeKey}"); } catch {}
  document.documentElement.dataset.theme = saved === "light" || saved === "dark"
    ? saved
    : matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light";
})();
`;
