import CssBaseline from "@mui/material/CssBaseline";
import { ThemeProvider, createTheme } from "@mui/material/styles";
import { use } from "react";
import { DarkModeProvider } from "./contexts/DarkModeContext";
import { DarkModeContext } from "./contexts/themeContext";
import { TopNav } from "./components/TopNav";
import { Box } from "@mui/material";
import { Outlet } from "react-router-dom";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";

const queryClient = new QueryClient();

const AppLayout = () => {
    const { darkMode } = use(DarkModeContext);
  const darkTheme = createTheme({
    palette: {
      mode: "dark",
    },
  });

  const theme = createTheme({
    palette: {
      mode: "light",
    },
  });

  return (
    <ThemeProvider theme={darkMode ? darkTheme : theme}>
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
