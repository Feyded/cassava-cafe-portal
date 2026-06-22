import React from 'react';
import { ShoppingCart, Trash2, Plus, Minus, Coffee } from 'lucide-react';
// Note: Replace these imports with your actual Shadcn component paths
import { ScrollArea } from "@/components/ui/scroll-area";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { Badge } from "@/components/ui/badge";

// Mock Data Structure for Cart Items
interface Modifier {
  id: string;
  name: string;
  price: number;
}

interface CartItem {
  id: string;
  name: string;
  basePrice: number;
  quantity: number;
  modifiers: Modifier[];
}

export default function CartSidebar() {
  // Mock cart items for demonstration
  const [cart, setCart] = React.useState<CartItem[]>([
    {
      id: '1',
      name: 'Iced Vanilla Latte',
      basePrice: 4.50,
      quantity: 2,
      modifiers: [
        { id: 'm1', name: 'Oat Milk', price: 0.75 },
        { id: 'm2', name: 'Extra Espresso Shot', price: 1.00 }
      ]
    },
    {
      id: '2',
      name: 'Croissant',
      basePrice: 3.75,
      quantity: 1,
      modifiers: [
        { id: 'm3', name: 'Warmed', price: 0.00 }
      ]
    }
  ]);

  // Helper to calculate single item total including its modifiers
  const getItemTotal = (item: CartItem) => {
    const modifiersTotal = item.modifiers.reduce((sum, mod) => sum + mod.price, 0);
    return (item.basePrice + modifiersTotal) * item.quantity;
  };

  // Helper to calculate total cart order
  const getSubtotal = () => cart.reduce((sum, item) => sum + getItemTotal(item), 0);
  const tax = getSubtotal() * 0.08; // 8% Coffee shop tax
  const total = getSubtotal() + tax;

  return (
    <div className="bg-white border-l border-gray-200 w-80 h-screen fixed right-0 top-0 z-50 flex flex-col shadow-xl font-sans">
      
      {/* 1. Header */}
      <div className="p-4 border-b border-gray-100 flex items-center justify-between bg-gray-50/70">
        <div className="flex items-center gap-2">
          <ShoppingCart className="h-5 w-5 text-amber-700" />
          <h2 className="font-semibold text-lg text-gray-800">Current Order</h2>
        </div>
        <Badge variant="secondary" className="bg-amber-100 text-amber-800 hover:bg-amber-100">
          {cart.reduce((sum, item) => sum + item.quantity, 0)} items
        </Badge>
      </div>

      {/* 2. Cart Items List (Scrollable) */}
      <ScrollArea className="flex-1 p-4">
        {cart.length === 0 ? (
          <div className="flex flex-col items-center justify-center h-64 text-gray-400 gap-2">
            <Coffee className="h-8 w-8 stroke-1" />
            <p className="text-sm">Cart is empty</p>
          </div>
        ) : (
          <div className="space-y-4">
            {cart.map((item) => (
              <div key={item.id} className="group flex flex-col gap-1.5 p-2 rounded-lg hover:bg-gray-50 transition-colors">
                
                {/* Item Name and Main Price */}
                <div className="flex justify-between items-start">
                  <div className="font-medium text-sm text-gray-900">{item.name}</div>
                  <div className="text-sm font-semibold text-gray-900">
                    ${getItemTotal(item).toFixed(2)}
                  </div>
                </div>

                {/* Selected Modifiers list */}
                {item.modifiers.length > 0 && (
                  <div className="flex flex-wrap gap-1 pl-1">
                    {item.modifiers.map((mod) => (
                      <span key={mod.id} className="text-[11px] text-gray-500 bg-gray-100 px-1.5 py-0.5 rounded">
                        + {mod.name} {mod.price > 0 ? `(+$${mod.price.toFixed(2)})` : ''}
                      </span>
                    ))}
                  </div>
                )}

                {/* Quantity Controls & Delete */}
                <div className="flex justify-between items-center mt-1.5">
                  <div className="flex items-center border border-gray-200 rounded-md bg-white">
                    <Button variant="ghost" size="icon" className="h-7 w-7 rounded-none p-0">
                      <Minus className="h-3 w-3" />
                    </Button>
                    <span className="text-xs px-2.5 font-medium text-gray-700">{item.quantity}</span>
                    <Button variant="ghost" size="icon" className="h-7 w-7 rounded-none p-0">
                      <Plus className="h-3 w-3" />
                    </Button>
                  </div>
                  
                  <Button variant="ghost" size="icon" className="h-7 w-7 text-gray-400 hover:text-red-500 opacity-0 group-hover:opacity-100 transition-opacity">
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            ))}
          </div>
        )}
      </ScrollArea>

      {/* 3. Checkout Summary & Actions */}
      <div className="p-4 bg-gray-50 border-t border-gray-100 space-y-4">
        <div className="space-y-1.5 text-sm text-gray-600">
          <div className="flex justify-between">
            <span>Subtotal</span>
            <span>${getSubtotal().toFixed(2)}</span>
          </div>
          <div className="flex justify-between text-xs">
            <span>Tax (8%)</span>
            <span>${tax.toFixed(2)}</span>
          </div>
          <Separator className="my-2 bg-gray-200" />
          <div className="flex justify-between text-base font-bold text-gray-900">
            <span>Total</span>
            <span>${total.toFixed(2)}</span>
          </div>
        </div>

        <div className="grid grid-cols-2 gap-2">
          <Button variant="outline" className="w-full border-gray-300 text-gray-700 hover:bg-gray-100">
            Hold Order
          </Button>
          <Button className="w-full bg-amber-700 hover:bg-amber-800 text-white font-medium">
            Pay Now
          </Button>
        </div>
      </div>

    </div>
  );
}