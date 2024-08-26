import AuthLayout from "@/layouts/auth-layout";
import { Dashboard } from "@/layouts/dashboard-layout";
import MainLayout from "@/layouts/main-layout";
import RootLayout from "@/layouts/root-layout";
import Home from "@/pages/home";
import Login from "@/pages/login";
import NotFound from "@/pages/not-found";
import Signup from "@/pages/signup";
import { createBrowserRouter } from "react-router-dom";

const router = createBrowserRouter([
  {
    path: "",
    element: <RootLayout />,
    children: [
      {
        path: "",
        element: <MainLayout />,
        children: [
          {
            path: "/",
            element: <Home />,
          },
          {
            path: "",
            element: <AuthLayout />,
            children: [
              {
                path: "/signup",
                element: <Signup />,
              },
              {
                path: "/login",
                element: <Login />,
              },
            ],
          },
        ],
      },
      {
        path: "/dashboard",
        index: true,
        element: <Dashboard />,
      },
    ],
    errorElement: <NotFound />,
  },
]);

export default router;
