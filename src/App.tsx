import CssBaseline from "@mui/material/CssBaseline";
import { ThemeProvider, createTheme } from "@mui/material/styles";
import { Suspense, use } from "react";
import { DarkModeProvider } from "./contexts/DarkModeContext";
import { DarkModeContext } from "./contexts/themeContext";
import { TopNav } from "./components/TopNav";
import { Box, CircularProgress } from "@mui/material";
import { Outlet } from "react-router-dom";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";

const queryClient = new QueryClient();

const FallbackComponent = () => {
  return (
    <Box
      sx={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        height: "80vh",
      }}
    >
      <CircularProgress />
    </Box>
  );
};

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
        <Suspense fallback={<FallbackComponent />}>
          <Outlet />
        </Suspense>
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
