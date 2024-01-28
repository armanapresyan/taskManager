import React from "react";
import {
  RouterProvider,
  createBrowserRouter,
} from "react-router-dom";
import Home from "./components/Home";
import SignIn from "./components/SignIn";
import SignUp from "./components/SignUp";
import TaskUser from "./components/TaskUser";
import { useAuth } from "./hooks/useAuth";
import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";

const ProtectedRoute = ({ user, element }) => {
  const isAuthenticated = !!user;

  if (user === undefined) {
    return null;
  }

  return isAuthenticated ? element : <Navigate to="/" />;
};

function Main() {
  useAuth();

  const user = useSelector((state) => state.auth.user);

  const router = createBrowserRouter([
    {
      path: "/",
      element: <Home />,
    },
    {
      path: "/signin",
      element: <SignIn />,
    },
    {
      path: "/signup",
      element: <SignUp />,
    },
    {
      path: "/tasks",
      element: <ProtectedRoute user={user} element={<TaskUser />} />,
    },
  ]);

  return <RouterProvider router={router}></RouterProvider>;
}
export default Main;
