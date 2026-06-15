import { useState } from "react";
import {
  Trash2,
  Plus,
  Minus,
  CreditCard,
  Receipt,
  ShoppingCart,
} from "lucide-react";
import { formatPrice } from "@/utils/format-price";
import useGetProductsQuery from "@/features/menu/queries/use-get-products-query";
import type { Product } from "@/features/menu/types/product";
import { Skeleton } from "@/components/ui/skeleton";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";
import type { CartItem } from "../types/cart-item";
import PaymentDialog from "../components/payment-dialog";
import useCreateCheckoutMutation from "../queries/use-create-checkout-mutation";
import CategoryList from "../components/category-list";

export default function POSPage() {
  const [openSheet, setOpenSheet] = useState(false);
  const [isPaymentOpen, setIsPaymentOpen] = useState(false);
  const [activeCategory, setActiveCategory] = useState(1);
  const [editingItem, setEditingItem] = useState<CartItem | null>(null);
  const [cart, setCart] = useState<CartItem[] | []>([]);

  const productsQuery = useGetProductsQuery({
    page: 1,
    limit: 100,
    category_id: activeCategory,
  });

  const checkoutMutation = useCreateCheckoutMutation();

  const addToCart = (product: Product) => {
    const productInfo = {
      product_id: product.id,
      variant_id: product.variants[0].id,
      product_name: product.name,
      variant_name: product.variants[0].name,
      price: product.variants[0].price,
      quantity: 1,
      category: product.category.name,
      variants: product.variants,
    };

    const exist = cart.find(
      (item) => item.variant_id === productInfo.variant_id,
    );

    if (exist) {
      setCart((currentCart) =>
        currentCart.map((item) =>
          item.variant_id === productInfo.variant_id
            ? { ...item, quantity: item.quantity + 1 }
            : item,
        ),
      );
    } else {
      setCart((currentCart) => [...currentCart, productInfo]);
    }
  };

  const updateQuantity = (variant_id: number, amount: number) => {
    const exist = cart.find((item) => item.variant_id === variant_id);

    if (!exist) return;

    const newQty = exist.quantity + amount;
    if (newQty <= 0) {
      setCart((currentCart) =>
        currentCart.filter((item) => item.variant_id !== variant_id),
      );
    } else {
      setCart((currentCart) =>
        currentCart.map((item) =>
          item.variant_id === variant_id ? { ...item, quantity: newQty } : item,
        ),
      );
    }
  };

  const handleEditItem = (item: CartItem) => {
    setEditingItem(item);
    setOpenSheet(true);
  };

  const handleVariantChange = (item: CartItem, variant_id: number) => {
    const variant = item.variants.find((v) => v.id === variant_id);
    if (!variant) return;
    setCart((currentCart) =>
      currentCart.map((cartItem) =>
        cartItem.variant_id === item.variant_id
          ? {
              ...cartItem,
              variant_id,
              variant_name: variant.name,
              price: variant.price,
            }
          : cartItem,
      ),
    );
    setOpenSheet(false);
  };

  const handleConfirmPayment = (amountReceived: number) => {
    const payload = {
      received_amount: amountReceived,
      items: cart,
    };

    checkoutMutation.mutate(payload, {
      onSuccess: () => {
        setCart([]);
        setIsPaymentOpen(false);
      },
      onError: (error) => {
        console.error("Checkout failed:", error);
        alert("Payment failed. Please try again.");
      },
    });
  };

  // Calculations
  const subtotal = cart.reduce(
    (sum, item) => sum + Number(item.price) * item.quantity,
    0,
  );
  const total = subtotal;

  return (
    <div className="flex h-screen w-full bg-slate-50 text-slate-900 overflow-hidden font-sans">
      <CategoryList
        selectedCategory={activeCategory}
        onSelect={setActiveCategory}
      />

      {/* COLUMN 2: PRODUCTS (Flexible middle space) */}
      <div className="flex-1 overflow-y-auto p-6">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {productsQuery.isFetching ? (
            <>
              {Array.from({ length: 8 }).map((_, idx) => (
                <Skeleton key={idx} className="h-40 w-full rounded-xl" />
              ))}
            </>
          ) : (
            productsQuery.data.data?.map((product: Product) => (
              <button
                key={product.id}
                onClick={() => addToCart(product)}
                className="group flex flex-col bg-white border border-slate-200 rounded-2xl p-4 text-left shadow-sm hover:shadow-md hover:border-indigo-200 transition-all duration-200 active:scale-[0.98]"
              >
                <h3 className="font-semibold text-slate-800 line-clamp-1 mb-1">
                  {product.name}
                </h3>
                <div className="mt-auto flex items-center justify-between w-full pt-2">
                  <span className="text-primary font-bold">
                    {formatPrice(product.variants[0].price)}
                  </span>
                  <span className="text-xs bg-slate-100 text-slate-500 px-2 py-0.5 rounded-md capitalize">
                    {product.category.name}
                  </span>
                </div>
              </button>
            ))
          )}
        </div>
      </div>

      {/* COLUMN 3: ORDER ITEMS & PAY NOW */}
      <div className="w-72 bg-white border-l border-slate-200 flex flex-col h-full shadow-xl">
        {/* Cart Header */}
        <div className="h-16 border-b border-slate-200 flex items-center justify-between px-4 min-h-[64px]">
          <div className="flex items-center gap-2">
            <Receipt className="h-5 w-5 text-slate-600" />
            <h2 className="font-bold text-slate-800">Current Order</h2>
          </div>
          {cart.length > 0 && (
            <button
              onClick={() => setCart([])}
              className="text-xs text-red-500 hover:bg-red-50 px-2 py-1.5 rounded-lg flex items-center gap-1 font-medium transition-colors"
            >
              <Trash2 className="h-3.5 w-3.5" /> Clear All
            </button>
          )}
        </div>

        {/* Cart Items List */}
        <div className="flex-1 overflow-y-auto p-4 space-y-3">
          {cart.length === 0 ? (
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
            cart.map((item) => (
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
            disabled={cart.length === 0}
            onClick={() => setIsPaymentOpen(true)}
            className="w-full bg-primary hover:bg-indigo-700 disabled:bg-slate-300 disabled:cursor-not-allowed text-white font-bold py-3.5 px-4 rounded-xl flex items-center justify-center gap-2 shadow-lg shadow-indigo-100 transition-all active:scale-[0.99]"
          >
            <CreditCard className="h-5 w-5" />
            Pay Now
          </button>
        </div>
      </div>

      <Sheet open={openSheet} onOpenChange={setOpenSheet}>
        <SheetContent>
          <SheetHeader>
            <SheetTitle>Change Variant</SheetTitle>
            <SheetDescription>
              Select a different variant for{" "}
              <span className="font-semibold">{editingItem?.product_name}</span>
            </SheetDescription>
          </SheetHeader>
          <div className="px-4 grid gap-3 mt-4">
            {editingItem?.variants.map((variant) => (
              <Button
                key={variant.id}
                variant={
                  variant.id === editingItem.variant_id ? "default" : "outline"
                }
                className="w-full justify-between rounded-md"
                onClick={() => handleVariantChange(editingItem, variant.id)}
              >
                {variant.name}
                <span className="text-sm ">{formatPrice(variant.price)}</span>
              </Button>
            ))}
          </div>
        </SheetContent>
      </Sheet>

      <PaymentDialog
        isOpen={isPaymentOpen}
        onClose={() => setIsPaymentOpen(false)}
        totalAmount={total}
        onConfirm={handleConfirmPayment}
        isProcessing={checkoutMutation.isPending}
      />
    </div>
  );
}
