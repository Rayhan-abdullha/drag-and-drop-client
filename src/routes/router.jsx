import * as React from "react";
import { createBrowserRouter } from "react-router-dom";
import Home from "../pages/Home";
import NotFound from "../components/notFound/NotFound";
import AuthPage from "../pages/Auth";
import About from "../pages/About";
import GalleryPage from "../pages/GalleryPage";
import PrivateRoute from "./PrivateRoute";
import ProfilePage from "../pages/ProfilePage";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Home />,
  },
  {
    path: "signup",
    element: <AuthPage />,
  },
  {
    path: "gallery",
    element: <GalleryPage />,
  },
  {
    path: "about",
    element: <About />,
  },
  {
    path: "profile",
    element: (
      <PrivateRoute>
        <ProfilePage />
      </PrivateRoute>
    ),
  },
  {
    path: "*",
    element: <NotFound />,
  },
]);

export default router;
