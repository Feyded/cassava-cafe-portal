import AdminDashboardPage from "@/features/admin/dashboard/pages/admin-dashboard-page";
import AdminProductsPage from "@/features/admin/products/pages/admin-products-page";
import LoginPage from "@/features/auth/pages/login-page";
import NotFoundPage from "@/features/errors/pages/not-found-page";
import HomePage from "@/features/home/pages/home-page";
import MenuPage from "@/features/menu/pages/menu-page";
import VisitPage from "@/features/visit/pages/visit-page";
import { createBrowserRouter } from "react-router-dom";
import PublicLayout from "../layouts/public-layout";

export const router = createBrowserRouter([
  {
    children: [
      {
        children: [{ path: "*", element: <NotFoundPage /> }],
      },
      {
        element: <PublicLayout />,
        children: [
          { path: "/", element: <HomePage /> },
          { path: "/menu", element: <MenuPage /> },
          { path: "/visit", element: <VisitPage /> },
          { path: "/login", element: <LoginPage /> },
        ],
      },
      {
        path: "/admin",
        children: [
          { path: "dashboard", element: <AdminDashboardPage /> },
          { path: "products", element: <AdminProductsPage /> },
        ],
      },
    ],
  },
]);
