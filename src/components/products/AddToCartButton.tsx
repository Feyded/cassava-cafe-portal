import { useState, useCallback } from 'react'
import { ShoppingBag, Check } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { useCartContext } from '@/context/CartContext'
import type { Product } from '@/types/product'
import type { CartItemVariants } from '@/types/cart'

interface AddToCartButtonProps {
  product: Product
  selectedVariants: CartItemVariants
  disabled?: boolean
}

export function AddToCartButton({ product, selectedVariants, disabled }: AddToCartButtonProps) {
  const [added, setAdded] = useState(false)
  const { addItem } = useCartContext()

  const handleAdd = useCallback(() => {
    addItem(product, selectedVariants)
    setAdded(true)
    const timer = setTimeout(() => setAdded(false), 2000)
    return () => clearTimeout(timer)
  }, [addItem, product, selectedVariants])

  return (
    <Button
      onClick={handleAdd}
      disabled={disabled || !product.inStock}
      className="w-full"
      size="lg"
    >
      {added ? (
        <>
          <Check className="size-4" />
          Added to bag
        </>
      ) : (
        <>
          <ShoppingBag className="size-4" />
          {product.inStock ? 'Add to bag' : 'Out of stock'}
        </>
      )}
    </Button>
  )
}
