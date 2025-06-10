import React, { createContext } from "react";

// Create the DarkModeContext
export const DarkModeContext = createContext<{
  darkMode: boolean;
  setDarkMode: React.Dispatch<React.SetStateAction<boolean>>;
}>({
  darkMode: false,
  setDarkMode: () => { /* default no-op */ },
});
