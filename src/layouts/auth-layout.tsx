import { useAppSelector } from "@/redux/hooks";
import { useEffect } from "react";
import { Outlet, useLocation, useNavigate } from "react-router-dom";

export default function AuthLayout() {
  const user = useAppSelector((state) => state.user.user);
  const location = useLocation();
  const navigate = useNavigate();
  const from = location?.state?.from?.pathname || "/";

  useEffect(() => {
    if (user) {
      navigate(from, { replace: true });
    }
  }, [user, navigate, from]);

  return (
    <div className="min-h-screen w-full flex items-center justify-center">
      <Outlet />
    </div>
  );
}
