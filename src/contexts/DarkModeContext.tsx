import { useLocalStorage } from "@uidotdev/usehooks";
import React, { ReactNode, createContext } from "react";

// Create the DarkModeContext
export const DarkModeContext = createContext<{
  darkMode: boolean;
  setDarkMode: React.Dispatch<React.SetStateAction<boolean>>;
}>({
  darkMode: false,
  setDarkMode: () => {},
});

// Create the DarkModeProvider component
export const DarkModeProvider = ({ children }: { children: ReactNode }) => {
  const [darkMode, setDarkMode] = useLocalStorage("dark-mode", false);

  return (
    <DarkModeContext.Provider value={{ darkMode, setDarkMode }}>
      {children}
    </DarkModeContext.Provider>
  );
};
