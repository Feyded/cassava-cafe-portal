import type { Product } from './product'

export type CartItemVariants = Record<string, string>

export interface CartItem {
  product: Product
  quantity: number
  selectedVariants: CartItemVariants
}

export interface Cart {
  items: CartItem[]
}
