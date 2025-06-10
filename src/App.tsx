import CssBaseline from "@mui/material/CssBaseline";
import { ThemeProvider } from "@mui/material/styles"; // Removed createTheme
import { use } from "react";
import { DarkModeProvider } from "./contexts/DarkModeContext";
import { DarkModeContext } from "./contexts/themeContext";
import { TopNav } from "./components/TopNav";
import { Box } from "@mui/material";
import { Outlet } from "react-router-dom";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";

const queryClient = new QueryClient();

import { getAppTheme } from "./theme"; // Import the new theme function

const AppLayout = () => {
  const { darkMode } = use(DarkModeContext);

  // Generate the theme based on the darkMode state
  const currentTheme = getAppTheme(darkMode ? 'dark' : 'light');

  return (
    <ThemeProvider theme={currentTheme}>
      <CssBaseline />

      <TopNav />
      <Box sx={{ padding: "2rem", maxWidth: "1920px" }}>
        <Outlet />
      </Box>
    </ThemeProvider>
  );
};

const App = () => {
  return (
    <DarkModeProvider>
      <QueryClientProvider client={queryClient}>
        <AppLayout />
        <ReactQueryDevtools initialIsOpen={false} />
      </QueryClientProvider>
    </DarkModeProvider>
  );
};

export default App;
