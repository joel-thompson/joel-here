import ReactDOM from "react-dom/client";
import "./index.css";


import { RouterProvider } from "react-router-dom";
// ThemeProvider, CssBaseline, and theme import removed as they are handled in App.tsx
import router from "./router";

ReactDOM.createRoot(document.getElementById("root")!).render(
  // RouterProvider is now the top-level component here
  <RouterProvider router={router} />
);
