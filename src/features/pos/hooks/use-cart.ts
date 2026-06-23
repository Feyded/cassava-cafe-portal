import { useState, useMemo } from "react";
import type { CartItem } from "../types/cart-item";

export default function useCart() {
  const [cart, setCart] = useState<CartItem[]>([]);

  // ADD TO CART
  const addToCart = (cartItem: CartItem) => {
    setCart((current) => {
      const exist = current.find(
        (item) => item.variant_id === cartItem.variant_id,
      );

      if (exist) {
        return current.map((item) =>
          item.variant_id === cartItem.variant_id
            ? { ...item, quantity: item.quantity + 1 }
            : item,
        );
      }

      return [...current, cartItem];
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
        i.variant_id === variant_id ? { ...i, quantity: newQty } : i,
      );
    });
  };

  // CLEAR CART
  const clearCart = () => setCart([]);

  // TOTALS (memoized)
  const subtotal = useMemo(() => {
    return cart.reduce(
      (sum, item) => sum + Number(item.price) * item.quantity,
      0,
    );
  }, [cart]);

  const total = subtotal;

  return {
    cart,
    setCart,
    addToCart,
    updateQuantity,
    clearCart,
    subtotal,
    total,
  };
}
