import { useState, useMemo } from "react";
import type { CartItem } from "../types/cart-item";

export default function useCart() {
  const [cart, setCart] = useState<CartItem[]>([]);

  // ADD TO CART
  const addToCart = (cartItem: CartItem) => {
    setCart((current) => {
      const exist = current.find((item) => item.id === cartItem.id);

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
  const updateQuantity = (id: string, amount: number) => {
    setCart((current) => {
      const item = current.find((i) => i.id === id);
      if (!item) return current;

      const newQty = item.quantity + amount;

      if (newQty <= 0) {
        return current.filter((i) => i.id !== id);
      }

      return current.map((i) => (i.id === id ? { ...i, quantity: newQty } : i));
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
