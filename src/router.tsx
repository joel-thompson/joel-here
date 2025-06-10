import { createBrowserRouter } from "react-router-dom";
import App from "./App";
import { AboutMe } from "./components/AboutMe";
import { Basic } from "./components/Basic";
import { ToDoList } from "./components/Todo/ToDoList";
import ErrorPage from "./error-page";
import { Resume } from "./components/Resume/Resume";

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
