import { NavLink } from "react-router-dom";

export default function MainNav() {
  const routes = [
    {
      label: "Home",
      href: "/",
    },
    {
      label: "Meeting Rooms",
      href: "/meeting-rooms",
    },
    {
      label: "About Us",
      href: "/about-us",
    },
    {
      label: "Contact Us",
      href: "/contact-us",
    },
  ];

  return (
    <div>
      <div className=" flex flex-col md:flex-row items-start space-y-2 md:space-y-0 md:space-x-4">
        {routes.map((route) => (
          <NavLink
            key={route.href}
            to={route.href}
            className={({ isActive, isPending }) =>
              isPending
                ? ""
                : isActive
                ? "bg-gray-100 w-full md:w-auto text-primary px-3 py-2 rounded-md text-sm font-medium"
                : "hover:bg-gray-100 w-full md:w-auto hover:text-primary px-3 py-2 rounded-md text-sm font-medium"
            }
          >
            {route.label}
          </NavLink>
        ))}
      </div>
    </div>
  );
}
