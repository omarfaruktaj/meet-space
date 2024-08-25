import { Link } from "react-router-dom";
import { Button } from "../ui/button";
import Logo from "../ui/logo";
import MainNav from "./main-nav";
import MobileNav from "./mobile-nav";

export default function Navbar() {
  return (
    <div className=" p-4">
      <div className="container mx-auto flex items-center justify-between">
        <Logo />
        <div className="flex items-center justify-center space-x-3">
          <div className="hidden md:block">
            <MainNav />
          </div>
          <div className="">
            <Button size={"sm"}>
              <Link to={"/login"}>Login</Link>
            </Button>
          </div>
          <div className="block md:hidden">
            <MobileNav />
          </div>
        </div>
      </div>
    </div>
  );
}
