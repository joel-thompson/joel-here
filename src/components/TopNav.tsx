import { Stack, Typography, useTheme } from "@mui/material";
import { DarkModeButtonWithLabel } from "./DarkModeButton";

export const TopNav = () => {
  const theme = useTheme();
  return (
    <Stack
      direction="row"
      alignItems={"center"}
      flexBasis={"content"}
      sx={{ backgroundColor: theme.palette.primary.dark }}
      // temporary divider until I make a better one
      divider={
        <Typography
          sx={{
            color: theme.palette.background.default,
            marginLeft: theme.spacing(2),
            marginRight: theme.spacing(2),
          }}
        >
          |
        </Typography>
      }
    >
      <DarkModeButtonWithLabel />
    </Stack>
  );
};
