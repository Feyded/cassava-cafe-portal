import { useCallback, useReducer } from 'react'
import type { CartItem, CartItemVariants } from '@/types/cart'
import type { Product } from '@/types/product'

type CartAction =
  | { type: 'ADD_ITEM'; product: Product; variants: CartItemVariants }
  | { type: 'REMOVE_ITEM'; productId: string; variants: CartItemVariants }
  | { type: 'UPDATE_QUANTITY'; productId: string; variants: CartItemVariants; quantity: number }
  | { type: 'CLEAR' }

function variantKey(variants: CartItemVariants): string {
  return Object.entries(variants)
    .sort(([a], [b]) => a.localeCompare(b))
    .map(([k, v]) => `${k}:${v}`)
    .join('|')
}

function isSameItem(item: CartItem, productId: string, variants: CartItemVariants): boolean {
  return item.product.id === productId && variantKey(item.selectedVariants) === variantKey(variants)
}

function cartReducer(state: CartItem[], action: CartAction): CartItem[] {
  switch (action.type) {
    case 'ADD_ITEM': {
      const existing = state.find((i) => isSameItem(i, action.product.id, action.variants))
      if (existing) {
        return state.map((i) =>
          isSameItem(i, action.product.id, action.variants)
            ? { ...i, quantity: i.quantity + 1 }
            : i,
        )
      }
      return [...state, { product: action.product, quantity: 1, selectedVariants: action.variants }]
    }
    case 'REMOVE_ITEM':
      return state.filter((i) => !isSameItem(i, action.productId, action.variants))
    case 'UPDATE_QUANTITY':
      return state
        .map((i) =>
          isSameItem(i, action.productId, action.variants)
            ? { ...i, quantity: action.quantity }
            : i,
        )
        .filter((i) => i.quantity > 0)
    case 'CLEAR':
      return []
    default:
      return state
  }
}

export function useCart() {
  const [items, dispatch] = useReducer(cartReducer, [])

  const addItem = useCallback((product: Product, variants: CartItemVariants) => {
    dispatch({ type: 'ADD_ITEM', product, variants })
  }, [])

  const removeItem = useCallback((productId: string, variants: CartItemVariants) => {
    dispatch({ type: 'REMOVE_ITEM', productId, variants })
  }, [])

  const updateQuantity = useCallback(
    (productId: string, variants: CartItemVariants, quantity: number) => {
      dispatch({ type: 'UPDATE_QUANTITY', productId, variants, quantity })
    },
    [],
  )

  const clearCart = useCallback(() => {
    dispatch({ type: 'CLEAR' })
  }, [])

  const totalItems = items.reduce((sum, i) => sum + i.quantity, 0)
  const totalPrice = items.reduce((sum, i) => sum + i.product.price * i.quantity, 0)

  return { items, addItem, removeItem, updateQuantity, clearCart, totalItems, totalPrice }
}
