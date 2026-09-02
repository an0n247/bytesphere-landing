import React, { createContext, useContext, useEffect, useState } from "react";

export type ThemeMode = "light" | "dark" | "system";

export interface ThemeContextType {
  themeMode: ThemeMode;
  setThemeMode: (mode: ThemeMode) => void;
}

const ThemeContext = createContext<ThemeContextType | null>(null);

const STORAGE_THEME_KEY = "bytsphere_theme";

export function ThemeProvider({ children }: { children: React.ReactNode }) {
  const [themeMode, setThemeMode] = useState<ThemeMode>("light");

  // Load saved theme on client mount
  useEffect(() => {
    try {
      if (typeof window !== "undefined") {
        const savedTheme = localStorage.getItem(STORAGE_THEME_KEY) as ThemeMode;
        if (savedTheme === "light" || savedTheme === "dark" || savedTheme === "system") {
          setThemeMode(savedTheme);
        }
      }
    } catch {
      // Storage unavailable or blocked
    }
  }, []);

  // Sync theme mode to DOM root element
  useEffect(() => {
    if (typeof document === "undefined") return;
    const root = document.documentElement;

    const isDark =
      themeMode === "dark" ||
      (themeMode === "system" &&
        typeof window !== "undefined" &&
        window.matchMedia?.("(prefers-color-scheme: dark)").matches);

    if (isDark) {
      root.classList.add("dark");
    } else {
      root.classList.remove("dark");
    }

    try {
      localStorage.setItem(STORAGE_THEME_KEY, themeMode);
    } catch {
      // ignore
    }
  }, [themeMode]);

  // Proactively remove Lovable badge if injected dynamically
  useEffect(() => {
    if (typeof document === "undefined") return;

    const removeBadge = () => {
      const badges = document.querySelectorAll(
        "#lovable-badge, [id*='lovable-badge'], [class*='lovable-badge'], [data-lovable-badge], a[href*='lovable.dev']",
      );
      badges.forEach((el) => el.remove());
    };

    removeBadge();
    const observer = new MutationObserver(() => {
      removeBadge();
    });

    observer.observe(document.documentElement, { childList: true, subtree: true });
    return () => observer.disconnect();
  }, []);

  return (
    <ThemeContext.Provider value={{ themeMode, setThemeMode }}>{children}</ThemeContext.Provider>
  );
}

export function useTheme() {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error("useTheme must be used within a ThemeProvider");
  }
  return context;
}
