import { Navigate, Outlet } from "react-router-dom";
import useMeQuery from "@/features/me/hooks/use-me-query";

type ProtectedRouteProps = {
  role: string[];
};

export const ProtectedRoute = ({ role = [] }: ProtectedRouteProps) => {
  const token = localStorage.getItem("auth_token");
  const user = useMeQuery();

  if (user.isLoading) {
    return <div>Loading...</div>;
  }

  if (!token || !user.data) {
    return <Navigate to="/login" replace />;
  }

  const allowedRoles = role.includes("super_admin")
    ? role
    : [...role, "super_admin"];

  if (!allowedRoles.includes(user.data.role)) {
    return <Navigate to="/menu" replace />;
  }

  return <Outlet />;
};
