import { useContext } from "react";
import { DarkModeContext } from "../contexts/DarkModeContext";
import Switch from "@mui/material/Switch";

export const DarkModeButton = () => {
  const { darkMode, setDarkMode } = useContext(DarkModeContext);
  return (
    <Switch
      checked={darkMode}
      onClick={() => {
        setDarkMode(!darkMode);
      }}
      color="default"
    />
  );
};
