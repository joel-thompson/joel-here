import { Stack, Typography, useTheme } from "@mui/material"
import { DarkModeButton } from "./DarkModeButton"

export const DarkModeToggleWithLabel = () => {
  const theme = useTheme();
  return (
    <Stack direction="row" alignItems={'center'} flexBasis={'content'} sx={{backgroundColor: theme.palette.primary.dark}}>
      <DarkModeButton />
      <Typography sx={{color: theme.palette.background.default}} >Dark Mode</Typography>
    </Stack>
  );
}