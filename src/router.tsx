import { createBrowserRouter } from "react-router-dom";
import App from "./App";
import { AboutMe } from "./components/AboutMe";
import { Basic } from "./components/Basic";
import { StoryWriter } from "./components/StoryWriter";
import { ToDoList } from "./components/ToDoList";
import ErrorPage from "./error-page";

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
    ],
  },
]);

export default router;
