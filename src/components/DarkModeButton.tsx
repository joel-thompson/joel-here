import { useContext } from "react";
import { DarkModeContext } from "../contexts/DarkModeContext";
import Switch from "@mui/material/Switch";
import { Stack, Typography, useTheme } from "@mui/material";

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

export const DarkModeButtonWithLabel = () => {
  const theme = useTheme();
  return (
    <Stack direction="row" alignItems={"center"} flexBasis={"content"}>
      <DarkModeButton />
      <Typography sx={{ color: theme.palette.background.default }}>
        Dark Mode
      </Typography>
    </Stack>
  );
};
