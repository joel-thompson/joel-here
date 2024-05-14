import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import "@fontsource/roboto/300.css";
import "@fontsource/roboto/400.css";
import "@fontsource/roboto/500.css";
import "@fontsource/roboto/700.css";

import { createBrowserRouter, RouterProvider } from "react-router-dom";
import App from "./App.tsx";
import ErrorPage from "./error-page.tsx";
import { AboutMe } from "./components/AboutMe.tsx";
import { Basic } from "./components/Basic.tsx";
import { ToDoList } from "./components/ToDoList.tsx";
import { StoryWriter } from "./components/StoryWriter.tsx";
import Users from "./components/Users.tsx";

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    errorElement: <ErrorPage />,
    children: [
      { index: true, element: <AboutMe /> },
      {
        path: "basic/:basicId",
        element: <Basic />,
      },
      {
        path: "todo",
        element: <ToDoList />,
      },
      {
        path: "story-writer",
        element: <StoryWriter />,
      },
      {
        path: "users",
        element: <Users />,
      }
    ],
  },
]);

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);
