import { useEffect, useState, type ReactNode } from "react";
import { ThemeProviderContext, type Theme } from "@/components/theme-context";

interface ThemeProviderProps {
  children: ReactNode;
  defaultTheme?: Theme;
  storageKey?: string;
}

const isTheme = (value: string | null): value is Theme =>
  value === "dark" || value === "light" || value === "system";

const getSystemTheme = (): "dark" | "light" =>
  window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light";

export const ThemeProvider = ({
  children,
  defaultTheme = "system",
  storageKey = "rizon-ui-theme",
}: ThemeProviderProps) => {
  const [theme, setThemeState] = useState<Theme>(() => {
    const storedTheme = localStorage.getItem(storageKey);

    return isTheme(storedTheme) ? storedTheme : defaultTheme;
  });

  useEffect(() => {
    const root = window.document.documentElement;
    const applyTheme = () => {
      root.classList.remove("light", "dark");
      root.classList.add(theme === "system" ? getSystemTheme() : theme);
    };

    applyTheme();

    if (theme !== "system") return;

    const mediaQuery = window.matchMedia("(prefers-color-scheme: dark)");
    mediaQuery.addEventListener("change", applyTheme);

    return () => mediaQuery.removeEventListener("change", applyTheme);
  }, [theme]);

  const setTheme = (nextTheme: Theme) => {
    localStorage.setItem(storageKey, nextTheme);
    setThemeState(nextTheme);
  };

  return (
    <ThemeProviderContext.Provider value={{ setTheme, theme }}>
      {children}
    </ThemeProviderContext.Provider>
  );
};
