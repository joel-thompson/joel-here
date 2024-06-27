import { createBrowserRouter } from "react-router-dom";
import App from "./App";
import { AboutMe } from "./components/AboutMe";
import { Basic } from "./components/Basic";
import { BasicGPT } from "./components/BasicGPT";
import { StoryWriter } from "./components/StoryWriter";
import { ToDoList } from "./components/ToDoList";
import Users from "./components/Users";
import ErrorPage from "./error-page";
import TechPlanner from "./components/TechPlanner";

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
      },
      {
        path: "joegpt",
        element: <BasicGPT />,
      },
      {
        path: "tech-planner",
        element: <TechPlanner />,
      },
    ],
  },
]);

export default router;
