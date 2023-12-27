// import reactLogo from "./assets/react.svg";
// import viteLogo from "/vite.svg";

import CssBaseline from "@mui/material/CssBaseline";
import { AboutMe } from "./components/AboutMe";
import { ThemeProvider, createTheme } from "@mui/material/styles";

const darkTheme = createTheme({
  palette: {
    mode: "dark",
  },
});

function App() {
  return (
    <>
      <ThemeProvider theme={darkTheme}>
        <CssBaseline />

        <AboutMe />
      </ThemeProvider>
    </>
  );
}

export default App;
