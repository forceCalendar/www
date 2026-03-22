"use client";

import { createContext, useContext, useEffect, useCallback, useState } from "react";

type Theme = "light" | "dark";

interface ThemeContextValue {
  theme: Theme;
  toggleTheme: () => void;
}

const ThemeContext = createContext<ThemeContextValue>({
  theme: "light",
  toggleTheme: () => {},
});

export function useTheme() {
  return useContext(ThemeContext);
}

function getInitialTheme(): Theme {
  // Check localStorage first (client-side only)
  if (typeof window !== "undefined") {
    const stored = localStorage.getItem("theme") as Theme | null;
    if (stored === "light" || stored === "dark") {
      return stored;
    }
    // Fall back to system preference
    if (window.matchMedia("(prefers-color-scheme: dark)").matches) {
      return "dark";
    }
  }
  return "light";
}

export function ThemeProvider({
  children,
  initialTheme,
}: {
  children: React.ReactNode;
  initialTheme: Theme;
}) {
  const [theme, setTheme] = useState<Theme>(initialTheme);
  const [isMounted, setIsMounted] = useState(false);

  // After hydration, use the correct theme from localStorage or system preference
  useEffect(() => {
    setIsMounted(true);
    const correctTheme = getInitialTheme();
    if (correctTheme !== initialTheme) {
      setTheme(correctTheme);
    }
  }, [initialTheme]);

  useEffect(() => {
    if (!isMounted) return;
    
    const root = document.documentElement;
    if (theme === "dark") {
      root.classList.add("dark");
    } else {
      root.classList.remove("dark");
    }
    localStorage.setItem("theme", theme);
    document.cookie = `theme=${theme};path=/;max-age=31536000;SameSite=Lax`;
  }, [theme, isMounted]);

  const toggleTheme = useCallback(() => {
    setTheme((prev) => (prev === "light" ? "dark" : "light"));
  }, []);

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  );
}
