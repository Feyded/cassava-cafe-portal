import { Navigate, Outlet } from "react-router-dom";
import useMeQuery from "@/features/me/queries/use-me-query";

type ProtectedRouteProps = {
  role: string[];
};

export const ProtectedRoute = ({ role }: ProtectedRouteProps) => {
  const token = localStorage.getItem("auth_token");
  const user = useMeQuery();

  if (user.isLoading) {
    return <div>Loading...</div>;
  }

  if (!token || !user.data) {
    return <Navigate to="/login" replace />;
  }

  if (!role.includes(user.data.role)) {
    return <Navigate to="/menu" replace />;
  }

  return <Outlet />;
};
