import {
  AppBar,
  Toolbar,
  IconButton,
  Drawer,
  List,
  ListItemText,
  Link,
  useMediaQuery,
  useTheme,
  Stack,
  ListItemButton,
} from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import OpenInNewIcon from "@mui/icons-material/OpenInNew";
import { DarkModeButtonSingle } from "./DarkModeButton";
import { Link as RouterLink } from "react-router-dom";
import { useState } from "react";

export const TopNav = () => {
  const theme = useTheme();
  const isSmallScreen = useMediaQuery(theme.breakpoints.down("sm"));
  const [drawerOpen, setDrawerOpen] = useState(false);

  const handleDrawerToggle = () => {
    setDrawerOpen(!drawerOpen);
  };

  const menuItems = [
    { text: "Home", to: "/" },
    { text: "To Do List", to: "/todo" },
    // { text: "Civil Engineering Helper", to: "/joegpt" },
    // { text: "Tech Planner", to: "/tech-planner" },
    {
      text: "Bike Tools",
      to: "https://www.somebiketools.com/",
      options: { openInNewTab: true },
    },
  ];

  return (
    <>
      <AppBar
        position="sticky"
        sx={{ backgroundColor: theme.palette.primary.dark, width: "100%" }}
      >
        <Toolbar>
          <DarkModeButtonSingle />
          {isSmallScreen ? (
            <>
              <div style={{ flexGrow: 1 }} />
              <IconButton
                edge="end"
                aria-label="menu"
                onClick={handleDrawerToggle}
                sx={{
                  color: theme.palette.background.default,
                }}
              >
                <MenuIcon />
              </IconButton>
              <Drawer
                anchor="left"
                open={drawerOpen}
                onClose={handleDrawerToggle}
              >
                <List>
                  {menuItems.map((item) => (
                    <ListItemButton
                      key={item.text}
                      component={RouterLink}
                      to={item.to}
                      onClick={handleDrawerToggle}
                      target={item.options?.openInNewTab ? "_blank" : undefined}
                    >
                      <ListItemText primary={item.text} />
                      {item.options?.openInNewTab && (
                        <OpenInNewIcon sx={{ ml: 0.5, fontSize: "small" }} />
                      )}
                    </ListItemButton>
                  ))}
                </List>
              </Drawer>
            </>
          ) : (
            <Stack direction="row" alignItems={"center"} flexBasis={"content"}>
              {menuItems.map((item) => (
                <Link
                  key={item.text}
                  color={theme.palette.background.default}
                  component={RouterLink}
                  to={item.to}
                  sx={{
                    marginLeft: theme.spacing(2),
                    display: "flex",
                    alignItems: "center",
                  }}
                  target={item.options?.openInNewTab ? "_blank" : undefined}
                >
                  {item.text}
                  {item.options?.openInNewTab && (
                    <OpenInNewIcon sx={{ ml: 0.5, fontSize: "small" }} />
                  )}
                </Link>
              ))}
            </Stack>
          )}
        </Toolbar>
      </AppBar>
    </>
  );
};
