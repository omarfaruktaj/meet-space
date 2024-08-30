import { useGetMeQuery } from "@/features/user/userApi";
import { setUser } from "@/features/user/userSlice";
import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import { ReactNode, useEffect } from "react";
import Loading from "./ui/loading";

export default function LoadUser({ children }: { children: ReactNode }) {
  const token = useAppSelector((state) => state.user.token);
  const dispatch = useAppDispatch();
  const { data, isLoading } = useGetMeQuery(null, { skip: !token });

  useEffect(() => {
    if (data) {
      dispatch(setUser(data));
    }
  }, [data, dispatch]);

  if (isLoading) return <Loading />;

  return <div>{children}</div>;
}
