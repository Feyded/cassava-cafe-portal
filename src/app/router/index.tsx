import AdminDashboardPage from "@/features/admin/dashboard/pages/admin-dashboard-page";
import AdminProductsPage from "@/features/admin/products/pages/admin-products-page";
import LoginPage from "@/features/auth/pages/login-page";
import HomePage from "@/features/home/pages/home-page";
import ProductsPage from "@/features/products/pages/products-page";
import { createBrowserRouter } from "react-router-dom";

export const router = createBrowserRouter([
  {
    children: [
      {
        children: [
          { path: "/", element: <HomePage /> },
          { path: "/products", element: <ProductsPage /> },
          { path: "/login", element: <LoginPage /> },
        ],
      },

      //ADMIN ROUTES
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
