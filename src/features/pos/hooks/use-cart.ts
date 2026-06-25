import { useState, useMemo } from "react";
import type { CartItem } from "../types";
import type { Discount } from "@/entities/discount";

export default function useCart() {
  const [cart, setCart] = useState<CartItem[]>([]);
  const [selectedDiscount, setSelectedDiscount] = useState<Discount | null>(
    null,
  );

  const removeFromCart = (id: string) => {
    setCart((current) => current.filter((item) => item.id !== id));
  };

  // ADD TO CART
  const addToCart = (cartItem: CartItem) =>
    setCart((current) => {
      const exist = current.find((item) => item.id === cartItem.id);

      if (exist) {
        return current.map((item) =>
          item.id === cartItem.id
            ? { ...item, quantity: item.quantity + 1 }
            : item,
        );
      }

      return [...current, cartItem];
    });

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

  const subtotal = useMemo(() => {
    const modifiersPrice = cart.reduce((sum, item) => {
      const itemModifiersPrice = item.modifiers.reduce(
        (modSum, mod) => modSum + Number(mod.price),
        0,
      );
      return sum + itemModifiersPrice * item.quantity;
    }, 0);

    const basePrice = cart.reduce(
      (sum, item) => sum + Number(item.price) * item.quantity,
      0,
    );
    return basePrice + modifiersPrice;
  }, [cart]);

  const discount = useMemo(() => {
    if (selectedDiscount) {
      const discountAmount =
        (subtotal * Number(selectedDiscount.percentage)) / 100;
      return discountAmount;
    }
    return 0;
  }, [subtotal, selectedDiscount]);

  const total = useMemo(() => {
    if (selectedDiscount) {
      const discountAmount =
        (subtotal * Number(selectedDiscount.percentage)) / 100;
      return subtotal - discountAmount;
    }
    return subtotal;
  }, [subtotal, selectedDiscount]);

  return {
    cart,
    setCart,
    addToCart,
    removeFromCart,
    updateQuantity,
    clearCart,
    subtotal,
    discount,
    total,
    selectedDiscount,
    setSelectedDiscount,
  };
}
