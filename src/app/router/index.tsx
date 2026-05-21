import AdminDashboardPage from "@/features/admin/dashboard/pages/admin-dashboard-page";
import AdminProductsPage from "@/features/admin/products/pages/admin-products-page";
import LoginPage from "@/features/auth/pages/login-page";
import NotFoundPage from "@/features/errors/pages/not-found-page";
import HomePage from "@/features/home/pages/home-page";
import MenuPage from "@/features/menu/pages/menu-page";
import VisitPage from "@/features/visit/pages/visit-page";
import { createBrowserRouter } from "react-router-dom";
import PublicLayout from "../layouts/public-layout";
import AdminLayout from "../layouts/admin-layout";
import { GuestOnlyRoute } from "../guards/GuestOnlyRoute";
import { ProtectedRoute } from "../guards/ProtectedRoute";

export const router = createBrowserRouter([
  {
    children: [
      {
        element: <GuestOnlyRoute />,
        children: [{ path: "/login", element: <LoginPage /> }],
      },
      {
        element: <PublicLayout />,
        children: [
          { path: "/", element: <HomePage /> },
          { path: "/menu", element: <MenuPage /> },
          { path: "/visit", element: <VisitPage /> },
        ],
      },
      {
        path: "/admin",
        element: <ProtectedRoute />,
        children: [
          {
            element: <AdminLayout />,
            children: [
              { path: "dashboard", element: <AdminDashboardPage /> },
              { path: "products", element: <AdminProductsPage /> },
            ],
          },
        ],
      },
      { path: "*", element: <NotFoundPage /> },
    ],
  },
]);
