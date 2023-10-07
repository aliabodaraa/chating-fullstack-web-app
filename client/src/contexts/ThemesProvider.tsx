import React, { useContext } from "react";
import { default as useThemeHook } from "../hooks/useTheme";

type ThemeContextProviderProps = {
  children: React.ReactNode;
};
type ThemeContextType = {
  theme: string;
  setTheme: React.Dispatch<React.SetStateAction<string>>;
};
const ThemeContext = React.createContext({} as ThemeContextType);

export function useTheme() {
  return useContext(ThemeContext);
}
export function ThemesProvider({ children }: ThemeContextProviderProps) {
  console.log("Theme Provider");
  const [theme, setTheme] = useThemeHook("secondary");
  let value = { theme, setTheme };
  return (
    <ThemeContext.Provider value={value}>{children}</ThemeContext.Provider>
  );
}
