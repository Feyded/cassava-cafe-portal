import { Outlet } from 'react-router-dom'
import { AuthProvider } from '@/context/AuthContext'
import { CartProvider } from '@/context/CartContext'

/**
 * Root wrapper rendered as the top-level layout route.
 * Providers are placed here so they have access to the router context
 * (required for useNavigate inside AuthProvider, etc.).
 */
export function AppShell() {
  return (
    <AuthProvider>
      <CartProvider>
        <Outlet />
      </CartProvider>
    </AuthProvider>
  )
}
