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

  if (!darkMode) {
    return (
      <DarkMode
        sx={{ cursor: "pointer" }}
        onClick={() => {
          setDarkMode(!darkMode);
        }}
      />
    );
  }

  return (
    <LightMode
      sx={{ cursor: "pointer", color: theme.palette.background.default }}
      onClick={() => {
        setDarkMode(!darkMode);
      }}
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
