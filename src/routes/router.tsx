import AuthLayout from "@/layouts/auth-layout";
import { Dashboard } from "@/layouts/dashboard-layout";
import MainLayout from "@/layouts/main-layout";
import RootLayout from "@/layouts/root-layout";
import CreateRoom from "@/pages/dashboard/create-room";
import CreateSlot from "@/pages/dashboard/create-slot";
import Rooms from "@/pages/dashboard/rooms";
import Slots from "@/pages/dashboard/slots";
import Home from "@/pages/home";
import Login from "@/pages/login";
import NotFound from "@/pages/not-found";
import Signup from "@/pages/signup";
import { createBrowserRouter, Navigate } from "react-router-dom";

const router = createBrowserRouter([
  {
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
        element: <Dashboard />,
        children: [
          {
            index: true,
            element: <Navigate to={"/dashboard/rooms"} replace />,
          },
          {
            path: "rooms",
            element: <Rooms />,
          },
          {
            path: "rooms/create",
            element: <CreateRoom />,
          },
          {
            path: "slots",
            element: <Slots />,
          },
          {
            path: "slots/create",
            element: <CreateSlot />,
          },
        ],
      },
    ],
    errorElement: <NotFound />,
  },
]);

export default router;
