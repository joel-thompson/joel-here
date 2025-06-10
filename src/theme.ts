import { PaletteMode } from "@mui/material";
import { createTheme, ThemeOptions } from "@mui/material/styles";

// Define your shared theme options here
const sharedThemeOptions: Omit<ThemeOptions, "palette"> = {
  typography: {
    fontFamily: '"Roboto", "Helvetica", "Arial", sans-serif',
  },
  shape: {
    borderRadius: 18,
  },
  components: {
    MuiButton: {
      defaultProps: {
        disableElevation: true,
      },
      styleOverrides: {
        root: {
          textTransform: "none",
        },
      },
    },
  },
};

// Function to create a theme based on the mode
export const getAppTheme = (mode: PaletteMode) => {
  // Return type is inferred as Theme
  return createTheme({
    ...sharedThemeOptions,
    palette: {
      mode,
      ...(mode === "light"
        ? {
            // Palette values for light mode
            primary: {
              main: "#1976d2", // Blue
            },
            secondary: {
              main: "#fb8c00", // Deep Orange (contrasts well with blue)
            },
            background: {
              default: "#f4f6f8",
              paper: "#ffffff",
            },
          }
        : {
            // Palette values for dark mode
            primary: {
              main: "#64b5f6", // Lighter blue for dark mode
            },
            secondary: {
              main: "#4db6ac", // Lighter teal for dark mode
            },
            background: {
              default: "#121212",
              paper: "#1e1e1e",
            },
          }),
    },
  });
};
