import { AppBar, Link, Stack, Typography, useTheme } from "@mui/material";
import { DarkModeButtonWithLabel } from "./DarkModeButton";
import { Link as RouterLink } from "react-router-dom";

export const TopNav = () => {
  const theme = useTheme();
  // const isSmallScreen = useMediaQuery(theme.breakpoints.down("sm")); // eventually will need to make this responsive
  return (
    <AppBar position="sticky">
      <Stack
        direction="row"
        alignItems={"center"}
        flexBasis={"content"}
        sx={{
          backgroundColor: theme.palette.primary.dark,
        }}
        // temporary divider until I make a better one
        divider={
          <Typography
            sx={{
              color: theme.palette.background.default, // make the text color the same as the background
              marginLeft: theme.spacing(2),
              marginRight: theme.spacing(2),
            }}
          >
            |
          </Typography>
        }
      >
        <DarkModeButtonWithLabel />
        <Link
          color={theme.palette.background.default}
          component={RouterLink}
          to="/"
        >
          Home
        </Link>

        <Link
          color={theme.palette.background.default}
          component={RouterLink}
          to="/todo"
        >
          To Do List
        </Link>

        <Link
          color={theme.palette.background.default}
          component={RouterLink}
          to="/joegpt"
        >
          Civil Engineering Helper
        </Link>
      </Stack>
    </AppBar>
  );
};
