import Footer from "@/components/layout/footer";
import Navbar from "@/components/layout/navbar";
import { Outlet } from "react-router-dom";

export default function MainLayout() {
  return (
    <div className="container mx-auto">
      <Navbar />
      <Outlet />
      <Footer />
    </div>
  );
}
