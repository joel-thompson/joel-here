import { useLocalStorage } from "@uidotdev/usehooks";
import { ReactNode, useMemo } from "react";
import { DarkModeContext } from './themeContext';

// Create the DarkModeProvider component
export const DarkModeProvider = ({ children }: { children: ReactNode }) => {
  const [darkMode, setDarkMode] = useLocalStorage("dark-mode", false);

  const contextValue = useMemo(() => ({
    darkMode,
    setDarkMode,
  }), [darkMode, setDarkMode]);

  return (
    <DarkModeContext.Provider value={contextValue}>
      {children}
    </DarkModeContext.Provider>
  );
};
