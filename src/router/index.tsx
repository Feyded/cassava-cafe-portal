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
    ],
  },
]);
