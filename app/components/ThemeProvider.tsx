"use client";

import { createContext, useContext, useEffect, useCallback, useState, useSyncExternalStore } from "react";

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

const emptySubscribe = () => () => {};

export function ThemeProvider({
  children,
  initialTheme,
}: {
  children: React.ReactNode;
  initialTheme: Theme;
}) {
  const [theme, setTheme] = useState<Theme>(initialTheme);
  // Hydration-safe mounted flag without setState-in-effect: false during SSR
  // and the hydration pass, true on the client afterwards
  const isMounted = useSyncExternalStore(
    emptySubscribe,
    () => true,
    () => false
  );

  // After hydration, use the correct theme from localStorage or system
  // preference; deferred a tick so the hydration pass isn't invalidated
  useEffect(() => {
    const timer = setTimeout(() => {
      setTheme((prev) => {
        const correctTheme = getInitialTheme();
        return correctTheme !== prev ? correctTheme : prev;
      });
    }, 0);
    return () => clearTimeout(timer);
  }, []);

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
