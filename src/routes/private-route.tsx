import { ReactNode, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";
import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import { logOut, setUser } from "@/features/user/userSlice";
import { useGetMeQuery } from "@/features/user/userApi";
import Loading from "@/components/ui/loading";

export default function PrivateRoute({
  children,
  requireAdmin,
}: {
  children: ReactNode;
  requireAdmin?: boolean;
}) {
  const token = useAppSelector((state) => state.user.token);
  const user = useAppSelector((state) => state.user.user);
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const { data: userData, isLoading } = useGetMeQuery(null, {
    skip: !token,
  });

  useEffect(() => {
    if (userData) {
      dispatch(setUser(userData));
    }
  }, [userData, dispatch]);

  useEffect(() => {
    if (!user && !userData) {
      navigate("/login");
    }
  }, [user, userData, isLoading, navigate]);

  useEffect(() => {
    if (!isLoading && requireAdmin && user?.role !== "admin") {
      toast.warning("You have no access to this route");
      dispatch(logOut());
      navigate("/login");
    }
  }, [requireAdmin, user, isLoading, dispatch, navigate]);

  if (isLoading) {
    return <div>Loading...</div>;
  }
  if (!user) return <Loading />;

  return <div>{children}</div>;
}
