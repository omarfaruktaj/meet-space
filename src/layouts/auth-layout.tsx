import { useAppSelector } from "@/redux/hooks";
import { useEffect } from "react";
import { Outlet, useLocation, useNavigate } from "react-router-dom";

export default function AuthLayout() {
  const token = useAppSelector((state) => state.user.token);
  const location = useLocation();
  const navigate = useNavigate();
  const from = location?.state?.from?.pathname || "/";

  useEffect(() => {
    if (token) {
      navigate(from, { replace: true });
    }
  }, [token, navigate, from]);

  return (
    <div className="min-h-screen w-full flex items-center justify-center">
      <Outlet />
    </div>
  );
}
