import { ShoppingCart, Trash2, Plus, Minus, Coffee, X } from "lucide-react";
// Note: Replace these imports with your actual Shadcn component paths
import { ScrollArea } from "@/components/ui/scroll-area";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { Badge } from "@/components/ui/badge";
import type { CartItem } from "../types/cart-item";
import { formatPrice } from "@/utils/format-price";
import { useMemo } from "react";

type CartSidebarProps = {
  cart: CartItem[];
  updateQuantity: (id: string, quantity: number) => void;
  removeFromCart: (id: string) => void;
};

export default function CartSidebar({
  cart,
  updateQuantity,
  removeFromCart,
}: CartSidebarProps) {
  // Mock cart items for demonstration

  const getSubtotal = useMemo(() => {
    return cart.reduce(
      (sum, item) => sum + Number(item.price) * item.quantity,
      0,
    );
  }, [cart]);

  // const getDiscount = useMemo(() => {
  //   return cart.reduce(
  //     (sum, item) => sum + Number(item.price) * item.quantity,
  //     0,
  //   );
  // }, [cart]);

  const getTotal = useMemo(() => {
    return cart.reduce(
      (sum, item) => sum + Number(item.price) * item.quantity,
      0,
    );
  }, [cart]);

  return (
    // Width bumped up to w-96 (24rem) for comfortable dual-hand holding/tapping profiles on 10"+ tablets
    <div className="bg-white border-l border-gray-200 w-96 h-screen fixed right-0 top-0 z-50 flex flex-col shadow-2xl select-none">
      {/* 1. Header (Thicker for comfortable top-grip holding) */}
      <div className="p-5 border-b border-gray-100 flex items-center justify-between bg-gray-50/90 h-18">
        <div className="flex items-center gap-3">
          <ShoppingCart className="h-6 w-6 text-amber-700" />
          <h2 className="font-bold text-xl text-gray-800">Current Order</h2>
        </div>
        <Badge
          variant="secondary"
          className="bg-amber-100 text-amber-900 text-sm px-3 py-1 font-semibold rounded-full"
        >
          {cart.reduce((sum, item) => sum + item.quantity, 0)} items
        </Badge>
      </div>

      {/* 2. Cart Items List (High-contrast tap rows) */}
      <ScrollArea className="flex-1 px-4 py-2">
        {cart.length === 0 ? (
          <div className="flex flex-col items-center justify-center h-96 text-gray-400 gap-3">
            <Coffee className="h-12 w-12 stroke-1" />
            <p className="text-base font-medium">Tap items to add to cart</p>
          </div>
        ) : (
          <div className="space-y-3">
            {cart.map((item) => (
              <div
                key={item.id}
                className="flex flex-col gap-2 p-3 bg-white border border-gray-100 rounded-xl shadow-sm"
              >
                {/* Main Row */}
                <div className="flex justify-between items-start gap-2">
                  <div className="font-semibold text-base text-gray-900 pt-1">
                    {item.product_name}
                    <span className="text-sm font-normal text-gray-600">
                      {" "}
                      ( {item.variant_name})
                    </span>
                  </div>
                  <div className="text-base font-bold text-gray-900 pt-1 shrink-0">
                    {formatPrice(item.price)}
                  </div>
                </div>

                {/* Modifiers (Always clear, legible bulleted structure) */}
                {item.modifiers.length > 0 && (
                  <div className="space-y-1 pl-1 bg-gray-50/50 p-2 rounded-lg border border-gray-50">
                    {item.modifiers.map((mod) => (
                      <div
                        key={mod.id}
                        className="flex justify-between items-center text-xs text-gray-600"
                      >
                        <span>• {mod.name}</span>
                        {Number(mod.price) > 0 && (
                          <span className="font-medium text-gray-500">
                            +{formatPrice(mod.price)}
                          </span>
                        )}
                      </div>
                    ))}
                  </div>
                )}

                {/* Bottom Row: Tactile Quantity Toggles + Delete */}
                <div className="flex justify-between items-center mt-1">
                  {/* Big Touch-Friendly Quantity Stepper */}
                  <div className="flex items-center border border-gray-300 rounded-lg bg-gray-50 overflow-hidden">
                    <Button
                      variant="ghost"
                      size="icon"
                      className="h-11 w-11 text-gray-700 hover:bg-gray-200 active:bg-gray-300 rounded-none"
                      type="button"
                      onClick={() => updateQuantity(item.id, -1)}
                    >
                      <Minus className="h-4 w-4 stroke-[2.5]" />
                    </Button>
                    <span className="text-sm font-bold px-4 text-gray-800 min-w-8 text-center">
                      {item.quantity}
                    </span>
                    <Button
                      variant="ghost"
                      size="icon"
                      className="h-11 w-11 text-gray-700 hover:bg-gray-200 active:bg-gray-300 rounded-none"
                      type="button"
                      onClick={() => updateQuantity(item.id, 1)}
                    >
                      <Plus className="h-4 w-4 stroke-[2.5]" />
                    </Button>
                  </div>

                  {/* Distinct, static tap target for deleting items */}
                  <Button
                    variant="outline"
                    size="icon"
                    className="h-11 w-11 border-red-100 text-red-500 hover:bg-red-50 active:bg-red-100"
                    type="button"
                    onClick={() => removeFromCart(item.id)}
                  >
                    <Trash2 className="h-5 w-5" />
                  </Button>
                </div>
              </div>
            ))}
          </div>
        )}
      </ScrollArea>

      {/* 3. Checkout Summary & Big Action Buttons */}
      <div className="p-5 bg-gray-50 border-t border-gray-200 space-y-4 shadow-[0_-4px_12px_rgba(0,0,0,0.03)]">
        <div className="space-y-2 text-sm text-gray-600">
          <div className="flex justify-between font-medium">
            <span>Subtotal</span>
            <span className="text-gray-900">{formatPrice(getSubtotal)}</span>
          </div>
          {/* <div className="flex justify-between text-xs">
            <span>Discount</span>
            <span>{formatPrice(getDiscount)}</span>
          </div> */}
          <Separator className="my-2 bg-gray-300" />
          <div className="flex justify-between text-lg font-black text-gray-900">
            <span>Total</span>
            <span className="text-xl text-amber-900">
              {formatPrice(getTotal)}
            </span>
          </div>
        </div>

        {/* Chunky, full-hand width buttons for effortless register operations */}
        <div className="grid grid-cols-2 gap-3">
          <Button
            variant="outline"
            className="w-full h-14 border-gray-300 text-gray-700 text-base font-semibold active:bg-gray-200 rounded-xl"
          >
            Hold Order
          </Button>
          <Button className="w-full h-14 bg-amber-700 hover:bg-amber-800 active:bg-amber-900 text-white text-base font-bold shadow-md rounded-xl">
            Pay Now
          </Button>
        </div>
      </div>
    </div>
  );
}
