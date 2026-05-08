import { createBrowserRouter } from 'react-router-dom'
import { AppShell } from '@/components/layout/AppShell'
import { RootLayout } from '@/components/layout/RootLayout'
import { HomePage } from '@/features/home/pages/home-page'
import { ProductsPage } from '@/features/products/pages/products'
import { ProductDetailPage } from '@/features/products/pages/products-details'
import { LoginPage } from '@/features/auth/pages/login-page'

export const router = createBrowserRouter([
  {
    element: <AppShell />,
    children: [
      {
        element: <RootLayout />,
        children: [
          { path: '/', element: <HomePage /> },
          { path: '/products', element: <ProductsPage /> },
          { path: '/products/:id', element: <ProductDetailPage /> },
          { path: '/login', element: <LoginPage /> },
        ],
      },
    ],
  },
])
