import { Stack, Typography, useTheme } from "@mui/material"
import { DarkModeButton } from "./DarkModeButton"

export const DarkModeToggleWithLabel = () => {
  const theme = useTheme();
  return (
    <Stack direction="row" alignItems={'center'} flexBasis={'content'} sx={{backgroundColor: theme.palette.primary.light}}>
      <DarkModeButton />
      <Typography>Dark Mode</Typography>
    </Stack>
  );
}