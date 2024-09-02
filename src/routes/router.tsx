import LoadUser from "@/components/load-user";
import AuthLayout from "@/layouts/auth-layout";
import { Dashboard } from "@/layouts/dashboard-layout";
import MainLayout from "@/layouts/main-layout";
import RootLayout from "@/layouts/root-layout";
import AboutUs from "@/pages/about-us";
import BookingProcess from "@/pages/booking";
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
import PrivateRoute from "./private-route";
import Checkout from "@/pages/checkout";

const router = createBrowserRouter([
  {
    element: (
      <LoadUser>
        <RootLayout />
      </LoadUser>
    ),
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
            element: (
              <PrivateRoute>
                <MyBooking />
              </PrivateRoute>
            ),
          },

          {
            path: "/meeting-rooms",
            element: <MeetingRooms />,
          },
          {
            path: "/meeting-rooms/:id",
            element: (
              <PrivateRoute>
                <RoomDetails />
              </PrivateRoute>
            ),
          },
          {
            path: "/meeting-rooms/:id/booking",
            element: (
              <PrivateRoute>
                <BookingProcess />
              </PrivateRoute>
            ),
          },
          {
            path: "/meeting-rooms/:id/booking/chackout",
            element: (
              <PrivateRoute>
                <Checkout />
              </PrivateRoute>
            ),
          },

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
        element: (
          <PrivateRoute requireAdmin>
            <Dashboard />
          </PrivateRoute>
        ),
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
