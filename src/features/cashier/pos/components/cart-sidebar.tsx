import { ShoppingCart, Trash2, Plus, Minus, Coffee } from "lucide-react";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { Badge } from "@/components/ui/badge";
import { formatPrice } from "@/shared/utils/format-price";
import type { CartItem } from "../types";
import type { Discount } from "@/entities/discount";
import { cn } from "@/shared/lib/utils";

type CartSidebarProps = {
  cart: CartItem[];
  setSelectedDiscount?: (discount: Discount | null) => void;
  updateQuantity: (id: string, quantity: number) => void;
  removeFromCart: (id: string) => void;
  onProceedToPay: () => void;
  isDiscountLoading: boolean;
  discounts?: Discount[];
  subtotal: number;
  selectedDiscount?: Discount | null;
  total: number;
  discount: number;
};

export default function CartSidebar({
  cart,
  updateQuantity,
  removeFromCart,
  onProceedToPay,
  isDiscountLoading,
  discounts = [],
  subtotal,
  discount,
  total,
  selectedDiscount,
  setSelectedDiscount,
}: CartSidebarProps) {
  const calculateItemTotal = (item: CartItem) => {
    const basePrice = parseFloat(item.price) || 0;
    const modifiersPrice = (item.modifiers || []).reduce(
      (sum, mod) => sum + (parseFloat(mod.price) || 0),
      0,
    );
    return (basePrice + modifiersPrice) * item.quantity;
  };

  return (
    <div className="bg-white border-l border-gray-200 w-96 h-dvh fixed right-0 bottom-0 top-0 z-50 flex flex-col shadow-2xl select-none">
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
      <ScrollArea className="flex-1 min-h-0 px-4 py-2">
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
                  </div>
                  <div className="text-base font-bold text-gray-900 pt-1 shrink-0">
                    {formatPrice(calculateItemTotal(item))}
                  </div>
                </div>
                <div className="flex justify-between items-start gap-2">
                  <div className="font-semibold text-base text-gray-900 pt-1">
                    <p className="text-xs text-muted-foreground mt-1 italic">
                      {item.variant_name}
                    </p>
                  </div>
                  <div className="text-xs font-bold text-gray-900 pt-1 shrink-0">
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
      <Separator className="mt-4 bg-gray-300" />
      {isDiscountLoading ? (
        <div className="p-4 text-sm text-gray-500">Loading discounts...</div>
      ) : discounts && discounts.length > 0 ? (
        <div className="p-4 space-y-2">
          <h3 className="text-sm font-semibold text-gray-700">Discounts</h3>
          <ul className="space-y-2 grid grid-cols-2 gap-2">
            {discounts.map((discount) => {
              const isSelected = selectedDiscount?.id === discount.id;

              return (
                <li key={discount.id}>
                  <button
                    type="button"
                    onClick={() =>
                      setSelectedDiscount?.(isSelected ? null : discount)
                    }
                    className={cn(
                      "inline-block items-center gap-3 rounded-lg border px-3 py-1.5 text-sm transition-all duration-200 cursor-pointer",
                      isSelected
                        ? "border-primary bg-blue-50 font-medium text-primary shadow-sm"
                        : "border-gray-200 bg-white text-gray-600 hover:border-gray-300 hover:bg-gray-50",
                    )}
                  >
                    <span className="mr-2">{discount.name}</span>
                    <span
                      className={
                        isSelected
                          ? "text-primary font-semibold"
                          : "text-gray-500"
                      }
                    >
                      {Number(discount.percentage).toFixed(0)}%
                    </span>
                  </button>
                </li>
              );
            })}
          </ul>
        </div>
      ) : (
        <div className="p-4 text-sm text-gray-500">No discounts available.</div>
      )}
      <div className="p-5 bg-gray-50 border-t border-gray-200 space-y-4 shadow-[0_-4px_12px_rgba(0,0,0,0.03)]">
        <div className="space-y-2 text-sm text-gray-600">
          <div className="flex justify-between font-medium">
            <span>Subtotal</span>
            <span className="text-gray-900">{formatPrice(subtotal)}</span>
          </div>
          <div className="flex justify-between text-xs">
            <span>Discount</span>
            <span>{formatPrice(discount)}</span>
          </div>
          <Separator className="my-2 bg-gray-300" />
          <div className="flex justify-between text-lg font-black text-gray-900">
            <span>Total</span>
            <span className="text-xl text-amber-900">{formatPrice(total)}</span>
          </div>
        </div>

        {/* Chunky, full-hand width buttons for effortless register operations */}
        <div className="grid grid-cols-1 gap-3">
          {/* <Button
            variant="outline"
            className="w-full h-14 border-gray-300 text-gray-700 text-base font-semibold active:bg-gray-200 rounded-xl"
          >
            Hold Order
          </Button> */}
          <Button
            className="w-full h-14 bg-amber-700 hover:bg-amber-800 active:bg-amber-900 text-white text-base font-bold shadow-md rounded-xl"
            onClick={onProceedToPay}
            type="button"
            disabled={cart.length <= 0}
          >
            Pay Now
          </Button>
        </div>
      </div>
    </div>
  );
}
