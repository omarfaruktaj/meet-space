import Navbar from "@/components/layout/navbar";
import { Outlet } from "react-router-dom";

export default function RootLayout() {
  return (
    <div>
      <Navbar />
      <p>This is root layout</p>
      <Outlet />
    </div>
  );
}
