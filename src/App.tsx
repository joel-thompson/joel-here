import { useState } from "react";
// import reactLogo from "./assets/react.svg";
// import viteLogo from "/vite.svg";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import { AboutMe } from "./components/AboutMe";

function App() {
  const [count, setCount] = useState(0);

  return (
    <>
      <CssBaseline />

      <AboutMe />

      <Button
        variant="contained"
        onClick={() => setCount((count) => count + 1)}
      >
        count is {count}
      </Button>
    </>
  );
}

export default App;
