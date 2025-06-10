import ReactDOM from "react-dom/client";
import "./index.css";
import "@fontsource/roboto/300.css";
import "@fontsource/roboto/400.css";
import "@fontsource/roboto/500.css";
import "@fontsource/roboto/700.css";

import { RouterProvider } from "react-router-dom";
// ThemeProvider, CssBaseline, and theme import removed as they are handled in App.tsx
import router from "./router";

ReactDOM.createRoot(document.getElementById("root")!).render(
  // RouterProvider is now the top-level component here
  <RouterProvider router={router} />
);
