import { CalendarCheck, CalendarClock, Hotel } from "lucide-react";
import { NavLink } from "react-router-dom";

export default function SidebarNav() {
  const routes = [
    {
      path: "/dashboard/rooms",
      label: "Rooms",
      icon: Hotel,
    },
    {
      path: "/dashboard/slots",
      label: "Slots",
      icon: CalendarClock,
    },
    {
      path: "/dashboard/bookings",
      label: "Bookings",
      icon: CalendarCheck,
    },
  ];

  return (
    <nav className="grid items-start px-2 text py-2 font-medium lg:px-4">
      {routes.map(({ path, label, icon: Icon }) => (
        <NavLink
          key={path}
          to={path}
          className={({ isActive }) =>
            `flex items-center gap-3 rounded-lg px-3 py-2 ${
              isActive
                ? "text-primary font-semibold bg-gray-200"
                : "text-muted-foreground hover:text-primary hover:bg-gray-200"
            } transition-all`
          }
        >
          <Icon className="h-4 w-4" />
          {label}
        </NavLink>
      ))}
    </nav>
  );
}
