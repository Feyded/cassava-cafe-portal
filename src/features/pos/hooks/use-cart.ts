import { useState, useMemo } from "react";
import type { Product } from "@/features/menu/types/product";
import type { CartItem } from "../types/cart-item";

export default function useCart() {
  const [cart, setCart] = useState<CartItem[]>([]);

  // ADD TO CART
  const addToCart = (product: Product) => {
    const productInfo: CartItem = {
      product_id: product.id,
      variant_id: product.variants[0].id,
      product_name: product.name,
      variant_name: product.variants[0].name,
      price: product.variants[0].price,
      quantity: 1,
      category: product.category.name,
      variants: product.variants,
    };

    setCart((current) => {
      const exist = current.find(
        (item) => item.variant_id === productInfo.variant_id
      );

      if (exist) {
        return current.map((item) =>
          item.variant_id === productInfo.variant_id
            ? { ...item, quantity: item.quantity + 1 }
            : item
        );
      }

      return [...current, productInfo];
    });
  };

  // UPDATE QTY (+/-)
  const updateQuantity = (variant_id: number, amount: number) => {
    setCart((current) => {
      const item = current.find((i) => i.variant_id === variant_id);
      if (!item) return current;

      const newQty = item.quantity + amount;

      if (newQty <= 0) {
        return current.filter((i) => i.variant_id !== variant_id);
      }

      return current.map((i) =>
        i.variant_id === variant_id ? { ...i, quantity: newQty } : i
      );
    });
  };

  // CHANGE VARIANT
  const changeVariant = (item: CartItem, variant_id: number) => {
    const variant = item.variants.find((v) => v.id === variant_id);
    if (!variant) return;

    setCart((current) =>
      current.map((cartItem) =>
        cartItem.variant_id === item.variant_id
          ? {
              ...cartItem,
              variant_id,
              variant_name: variant.name,
              price: variant.price,
            }
          : cartItem
      )
    );
  };

  // CLEAR CART
  const clearCart = () => setCart([]);

  // TOTALS (memoized)
  const subtotal = useMemo(() => {
    return cart.reduce(
      (sum, item) => sum + Number(item.price) * item.quantity,
      0
    );
  }, [cart]);

  const total = subtotal;

  return {
    cart,
    setCart,
    addToCart,
    updateQuantity,
    changeVariant,
    clearCart,
    subtotal,
    total,
  };
}