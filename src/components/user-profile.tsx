import { LogOut, User2 } from "lucide-react";
import { Avatar, AvatarFallback } from "./ui/avatar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Link, useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { logOut, selectUser } from "@/features/user/userSlice";
import { useAppDispatch } from "@/redux/hooks";

export default function UserProfile() {
  const user = useSelector(selectUser);
  const navigate = useNavigate();

  const dispatch = useAppDispatch();
  function handleLogout() {
    dispatch(logOut());
    navigate("/");
  }

  return (
    <DropdownMenu>
      <DropdownMenuTrigger>
        <Avatar>
          <AvatarFallback>
            <User2 />
          </AvatarFallback>
        </Avatar>
      </DropdownMenuTrigger>
      <DropdownMenuContent>
        {user?.role === "user" && (
          <DropdownMenuItem>
            <Link to={"/my-bookings"}>My Bookings</Link>
          </DropdownMenuItem>
        )}
        {user?.role === "admin" && (
          <DropdownMenuItem>
            <Link to={"/dashboard"}>Dashboard</Link>
          </DropdownMenuItem>
        )}
        <DropdownMenuSeparator />
        <DropdownMenuItem onClick={handleLogout}>
          <LogOut className="mr-2 h-4 w-4" />
          <span>Log out</span>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
