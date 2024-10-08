import CssBaseline from "@mui/material/CssBaseline";
import { ThemeProvider, createTheme } from "@mui/material/styles";
import { useContext } from "react";
import { DarkModeContext, DarkModeProvider } from "./contexts/DarkModeContext";
import { TopNav } from "./components/TopNav";
import { Box } from "@mui/material";
import { Outlet } from "react-router-dom";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
// import { purple } from "@mui/material/colors";

const queryClient = new QueryClient();

const OuterApp = () => {
  return (
    <DarkModeProvider>
      <QueryClientProvider client={queryClient}>
        <App />
        <ReactQueryDevtools initialIsOpen={false} />
      </QueryClientProvider>
    </DarkModeProvider>
  );
};

const App = () => {
  const { darkMode } = useContext(DarkModeContext);
  const darkTheme = createTheme({
    palette: {
      mode: "dark",
    },
  });

  const theme = createTheme({
    palette: {
      mode: "light",
      // primary: purple,
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

export default OuterApp;
