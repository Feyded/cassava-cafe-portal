import { createContext, useContext, type ReactNode } from 'react'
import { useCart } from '@/hooks/useCart'
import type { CartItem, CartItemVariants } from '@/types/cart'
import type { Product } from '@/types/product'

interface CartContextValue {
  items: CartItem[]
  addItem: (product: Product, variants: CartItemVariants) => void
  removeItem: (productId: string, variants: CartItemVariants) => void
  updateQuantity: (productId: string, variants: CartItemVariants, quantity: number) => void
  clearCart: () => void
  totalItems: number
  totalPrice: number
}

const CartContext = createContext<CartContextValue | null>(null)

export function CartProvider({ children }: { children: ReactNode }) {
  const cart = useCart()
  return <CartContext.Provider value={cart}>{children}</CartContext.Provider>
}

export function useCartContext(): CartContextValue {
  const ctx = useContext(CartContext)
  if (!ctx) throw new Error('useCartContext must be used within a CartProvider')
  return ctx
}
