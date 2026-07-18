import { createContext } from "react";

export type Theme = "dark" | "light" | "system";

export interface ThemeProviderState {
  setTheme: (theme: Theme) => void;
  theme: Theme;
}

export const ThemeProviderContext = createContext<
  ThemeProviderState | undefined
>(undefined);
