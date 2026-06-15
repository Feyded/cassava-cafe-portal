import { formatPrice } from "@/utils/format-price";
import {
  CreditCard,
  Minus,
  Plus,
  Receipt,
  ShoppingCart,
  Trash2,
} from "lucide-react";
import type { CartItem } from "../types/cart-item";

interface CartProps {
  items: CartItem[];
  updateQuantity: (variant_id: number, amount: number) => void;
  handleEditItem: (item: CartItem) => void;
  onClearCart: () => void;
  onPay: () => void;
  subtotal: number;
  total: number;
}

export default function Cart({
  items,
  updateQuantity,
  handleEditItem,
  onClearCart,
  onPay,
  subtotal,
  total,
}: CartProps) {
  return (
    <div className="w-72 bg-white border-l border-slate-200 flex flex-col h-full shadow-xl">
      {/* Cart Header */}
      <div className="h-16 border-b border-slate-200 flex items-center justify-between px-4 min-h-[64px]">
        <div className="flex items-center gap-2">
          <Receipt className="h-5 w-5 text-slate-600" />
          <h2 className="font-bold text-slate-800">Current Order</h2>
        </div>
        {items.length > 0 && (
          <button
            onClick={onClearCart}
            className="text-xs text-red-500 hover:bg-red-50 px-2 py-1.5 rounded-lg flex items-center gap-1 font-medium transition-colors"
          >
            <Trash2 className="h-3.5 w-3.5" /> Clear All
          </button>
        )}
      </div>

      {/* Cart Items List */}
      <div className="flex-1 overflow-y-auto p-4 space-y-3">
        {items.length === 0 ? (
          <div className="h-full flex flex-col items-center justify-center text-center p-6 text-slate-400">
            <div className="w-16 h-16 bg-slate-50 rounded-full flex items-center justify-center mb-3">
              <ShoppingCart className="h-8 w-8 text-slate-300" />
            </div>
            <p className="font-medium text-sm">Your basket is empty</p>
            <p className="text-xs max-w-[200px] mt-1">
              Tap products on the left menu to add them here.
            </p>
          </div>
        ) : (
          items.map((item) => (
            <div
              key={item.product_id}
              className="flex items-center justify-between p-3 bg-slate-50 border border-slate-100 rounded-xl"
            >
              <div className="flex-1 min-w-0 pr-2">
                <h4 className="font-medium text-sm text-slate-800 truncate">
                  {item.product_name}
                </h4>
                {/* SHOW MODAL TO CHANGE VARIANT */}
                <button
                  onClick={() => handleEditItem(item)}
                  className="text-xs text-primary hover:underline mt-0.5"
                >
                  {item.variant_name}
                  <span className="ml-1 text-slate-400">(Change)</span>
                </button>
                <p className="text-xs text-primary font-semibold mt-0.5">
                  {formatPrice(Number(item.price) * item.quantity)}
                </p>
              </div>

              <div className="flex items-center gap-2 bg-white border border-slate-200 rounded-lg p-1 shadow-sm">
                <button
                  onClick={() => updateQuantity(item.variant_id, -1)}
                  className="p-1 hover:bg-slate-100 rounded text-slate-500 transition-colors"
                >
                  <Minus className="h-3.5 w-3.5" />
                </button>
                <span className="text-xs font-bold w-6 text-center text-slate-700">
                  {item.quantity}
                </span>
                <button
                  disabled={item.quantity >= 99}
                  onClick={() => updateQuantity(item.variant_id, 1)}
                  className="p-1 hover:bg-slate-100 rounded text-slate-500 transition-colors"
                >
                  <Plus className="h-3.5 w-3.5" />
                </button>
              </div>
            </div>
          ))
        )}
      </div>

      {/* Summary & Checkout Section */}
      <div className="border-t border-slate-200 p-4 bg-slate-50 space-y-4">
        <div className="space-y-2 text-sm">
          <div className="flex justify-between text-slate-500">
            <span>Subtotal</span>
            <span>{formatPrice(subtotal)}</span>
          </div>
          <hr className="border-slate-200 my-1" />
          <div className="flex justify-between text-base font-bold text-slate-900">
            <span>Total Amount</span>
            <span className="text-primary">{formatPrice(total)}</span>
          </div>
        </div>

        {/* Pay Now Button Trigger */}
        <button
          disabled={items.length === 0}
          onClick={onPay}
          className="w-full bg-primary hover:bg-indigo-700 disabled:bg-slate-300 disabled:cursor-not-allowed text-white font-bold py-3.5 px-4 rounded-xl flex items-center justify-center gap-2 shadow-lg shadow-indigo-100 transition-all active:scale-[0.99]"
        >
          <CreditCard className="h-5 w-5" />
          Pay Now
        </button>
      </div>
    </div>
  );
}
