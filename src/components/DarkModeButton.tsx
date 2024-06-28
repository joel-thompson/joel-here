import { useContext } from "react";
import { DarkModeContext } from "../contexts/DarkModeContext";
import Switch from "@mui/material/Switch";
import { Stack, Typography, useTheme } from "@mui/material";
import { DarkMode, LightMode } from "@mui/icons-material";

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

export const DarkModeButtonSingle = () => {
  const { darkMode, setDarkMode } = useContext(DarkModeContext);
  const theme = useTheme();
  const Icon = darkMode ? LightMode : DarkMode;

  return (
    <Icon
      sx={{ color: theme.palette.background.default, cursor: "pointer" }}
      onClick={() => setDarkMode(!darkMode)}
    />
  );
};

export const DarkModeButtonWithLabel = () => {
  const theme = useTheme();
  return (
    <Stack direction="row" alignItems={"center"} flexBasis={"content"}>
      <DarkModeButton />
      <Typography sx={{ color: theme.palette.background.default }}>
        Dark
      </Typography>
    </Stack>
  );
};
