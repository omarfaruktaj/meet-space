import { useAppSelector } from "@/redux/hooks";
import { useEffect } from "react";
import { Outlet, useLocation } from "react-router-dom";

export default function RootLayout() {
  const bookingInfo = useAppSelector((state) => state.booking.bookingInfo);

  useEffect(() => {
    const handleBeforeUnload = (event: BeforeUnloadEvent) => {
      if (bookingInfo) {
        const message =
          "Your cart will be empty if you leave this page. Are you sure you want to continue?";
        event.preventDefault();
        return message;
      }
    };

    window.addEventListener("beforeunload", handleBeforeUnload);

    return () => {
      window.removeEventListener("beforeunload", handleBeforeUnload);
    };
  }, [bookingInfo]);
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  return (
    <div>
      <Outlet />
    </div>
  );
}
