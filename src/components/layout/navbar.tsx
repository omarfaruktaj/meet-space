import { Link } from "react-router-dom";
import { Button } from "../ui/button";
import Logo from "../ui/logo";
import MainNav from "./main-nav";
import MobileNav from "./mobile-nav";
import UserProfile from "../user-profile";
import { selectUser } from "@/features/user/userSlice";
import { useSelector } from "react-redux";

export default function Navbar() {
  const user = useSelector(selectUser);
  console.log(user);
  return (
    <div className=" py-4 border-b mb-3 rounded">
      <div className="flex items-center justify-between">
        <Logo />
        <div className="flex items-center justify-center space-x-3">
          <div className="hidden md:block">
            <MainNav />
          </div>
          <div>
            {user ? (
              <UserProfile />
            ) : (
              <Button size={"sm"}>
                <Link to={"/login"}>Login</Link>
              </Button>
            )}
          </div>
          <div className="block md:hidden">
            <MobileNav />
          </div>
        </div>
      </div>
    </div>
  );
}
