import { AppBar, Toolbar, IconButton, Box } from "@mui/material";
import { DarkModeButtonSingle } from "./DarkModeButton";
import { Home } from "@mui/icons-material";

export const TopNav = () => {
  return (
    <>
      <AppBar position="sticky" color="primary">
        <Toolbar>
          <IconButton edge="start" color="inherit" aria-label="home" href="/">
            <Home />
          </IconButton>
          <Box sx={{ flexGrow: 1 }} />
          <DarkModeButtonSingle />
        </Toolbar>
      </AppBar>
    </>
  );
};
