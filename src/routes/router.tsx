import MainLayout from "@/layouts/main-layout";
import RootLayout from "@/layouts/root-layout";
import Home from "@/pages/home";
import NotFound from "@/pages/not-found";
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
        ],
      },
    ],
    errorElement: <NotFound />,
  },
]);

export default router;
