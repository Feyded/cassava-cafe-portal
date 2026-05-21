import { Navigate, Outlet } from "react-router-dom";
import useMeQuery from "@/features/me/queries/use-me-query";

export const GuestOnlyRoute = () => {
  const token = localStorage.getItem("auth_token");
  const user = useMeQuery();

  if (user.isLoading) {
    return <div>Loading...</div>;
  }

  if (token && user.data) {
    return <Navigate to="/menu" replace />;
  }

  return <Outlet />;
};
