import { AppBar, Toolbar, useTheme, IconButton, Box } from "@mui/material";
import { DarkModeButtonSingle } from "./DarkModeButton";
import { Home } from "@mui/icons-material";

export const TopNav = () => {
  const theme = useTheme();

  return (
    <>
      <AppBar
        position="sticky"
        sx={{ backgroundColor: theme.palette.primary.dark, width: "100%" }}
      >
        <Toolbar>
          <IconButton
            edge="start"
            color="inherit"
            aria-label="home"
            href="/"
            sx={{ color: theme.palette.background.default }}
          >
            <Home />
          </IconButton>
          <Box sx={{ flexGrow: 1 }} />
          <DarkModeButtonSingle />
        </Toolbar>
      </AppBar>
    </>
  );
};
