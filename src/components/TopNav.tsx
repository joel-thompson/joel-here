import { AppBar, Toolbar, useTheme } from "@mui/material";
import { DarkModeButtonSingle } from "./DarkModeButton";

export const TopNav = () => {
  const theme = useTheme();

  return (
    <>
      <AppBar
        position="static"
        sx={{ backgroundColor: theme.palette.primary.dark, width: "100%" }}
      >
        <Toolbar>
          <DarkModeButtonSingle />
        </Toolbar>
      </AppBar>
    </>
  );
};
