import React from "react";
import {
  RouterProvider,
  createBrowserRouter,
} from "react-router-dom";
import ProtectedRoute from "./components/ProtectedRoute";
import Home from "./components/Home";
import SignIn from "./components/SignIn";
import SignUp from "./components/SignUp";
import TaskUser from "./components/TaskUser";
import { useAuth } from "./hooks/useAuth";

function Main() {
  useAuth();

  const router = createBrowserRouter([
    {
      path: "/",
      element: <ProtectedRoute reverse element={<Home />} />,
    },
    {
      path: "/signin",
      element: <ProtectedRoute reverse element={<SignIn />} />,
    },
    {
      path: "/signup",
      element: <ProtectedRoute reverse element={<SignUp />} />,
    },
    {
      path: "/tasks",
      element: <ProtectedRoute element={<TaskUser />} />,
    },
  ]);

  return <RouterProvider router={router}></RouterProvider>;
}
export default Main;
