import AuthLayout from "@/layouts/auth-layout";
import { Dashboard } from "@/layouts/dashboard-layout";
import MainLayout from "@/layouts/main-layout";
import RootLayout from "@/layouts/root-layout";
import AboutUs from "@/pages/about-us";
import Contact from "@/pages/contact";
import Booking from "@/pages/dashboard/booking";
import CreateRoom from "@/pages/dashboard/create-room";
import CreateSlot from "@/pages/dashboard/create-slot";
import Rooms from "@/pages/dashboard/rooms";
import Slots from "@/pages/dashboard/slots";
import Home from "@/pages/home";
import Login from "@/pages/login";
import MeetingRooms from "@/pages/meeting-rooms";
import MyBooking from "@/pages/my-bookings";
import NotFound from "@/pages/not-found";
import RoomDetails from "@/pages/room-details";
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
          {
            path: "/my-bookings",
            element: <MyBooking />,
          },

          {
            path: "/meeting-rooms",
            element: <MeetingRooms />,
          },
          { path: "/meeting-rooms/:id", element: <RoomDetails /> },
          {
            path: "/about-us",
            element: <AboutUs />,
          },
          {
            path: "/contact-us",
            element: <Contact />,
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
          {
            path: "bookings",
            element: <Booking />,
          },
        ],
      },
    ],
    errorElement: <NotFound />,
  },
]);

export default router;
