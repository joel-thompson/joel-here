import { lazy } from "react";
import { createBrowserRouter } from "react-router-dom";
import App from "./App";
import ErrorPage from "./error-page";
import { AboutMe } from "./components/AboutMe";

const Basic = lazy(() =>
  import("./components/Basic").then((module) => ({ default: module.Basic }))
);
const ToDoList = lazy(() =>
  import("./components/Todo/ToDoList").then((module) => ({
    default: module.ToDoList,
  }))
);
const Resume = lazy(() =>
  import("./components/Resume/Resume").then((module) => ({
    default: module.Resume,
  }))
);

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
        path: "resume",
        element: <Resume />,
      },
    ],
  },
]);

export default router;
