// import reactLogo from "./assets/react.svg";
// import viteLogo from "/vite.svg";

import CssBaseline from "@mui/material/CssBaseline";
import { ThemeProvider, createTheme } from "@mui/material/styles";
import { useContext } from "react";
import { DarkModeContext, DarkModeProvider } from "./contexts/DarkModeContext";
import { DarkModeToggleWithLabel } from "./components/DarkModeToggleWithLabel";
import { Box } from "@mui/material";
import { Outlet } from "react-router-dom";
// import { purple } from "@mui/material/colors";

const OuterApp = () => {
  return (
    <DarkModeProvider>
      <App />
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

      <DarkModeToggleWithLabel />
      <Box sx={{ padding: "2rem" }}>
        <Outlet />
      </Box>
    </ThemeProvider>
  );
};

export default OuterApp;
