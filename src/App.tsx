// import reactLogo from "./assets/react.svg";
// import viteLogo from "/vite.svg";

import CssBaseline from "@mui/material/CssBaseline";
import { ThemeProvider, createTheme } from "@mui/material/styles";
import { useContext } from "react";
import { DarkModeContext, DarkModeProvider } from "./contexts/DarkModeContext";
import { TopNav } from "./components/TopNav";
import { Box } from "@mui/material";
import { Outlet, Route, Routes } from "react-router-dom";
import BlogList from './components/BlogList';
import BlogPost from './components/BlogPost';
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
// import { purple } from "@mui/material/colors";

const queryClient = new QueryClient();

const OuterApp = () => {
  return (
    <DarkModeProvider>
      <QueryClientProvider client={queryClient}>
        <App />
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
      <Box sx={{ padding: "2rem" }}>
        <Routes>
          <Route path="/blog" element={<BlogList />} />
          <Route path="/blog/:id" element={<BlogPost />} />
          <Route path="*" element={<Outlet />} />
        </Routes>
      </Box>
    </ThemeProvider>
  );
};

export default OuterApp;
