import { useEffect, useState } from "react";
import { ThemeContext } from "./context";

function ThemeProvider({ children }) {
  const [theme, setTheme] = useState(() => {
    return localStorage.getItem("theme") || "auto";
  });

  // Apply theme to HTML element
  useEffect(() => {
    const html = document.documentElement;
    const prefersDark = window.matchMedia(
      "(prefers-color-scheme: dark)",
    ).matches;

    html.classList.remove("light", "dark");

    if (theme === "dark" || (theme === "auto" && prefersDark)) {
      html.classList.add("dark");
    } else if (theme === "light" || (theme === "auto" && !prefersDark)) {
      html.classList.add("light");
    }

    localStorage.setItem("theme", theme);
  }, [theme]);

  return (
    <ThemeContext.Provider value={{ theme, setTheme }}>
      {children}
    </ThemeContext.Provider>
  );
}

export default ThemeProvider;
