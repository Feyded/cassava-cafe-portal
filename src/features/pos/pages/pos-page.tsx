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

const CATEGORIES = [
  { id: 1, name: "Snacks" },
  { id: 2, name: "Refreshers" },
  { id: 3, name: "Fruit Tea" },
  { id: 4, name: "Hot Coffee" },
  { id: 5, name: "Iced Coffee" },
  { id: 6, name: "Smoothies" },
  { id: 7, name: "Yoghurt Series" },
  { id: 8, name: "Frappe" },
];

type CartItem = {
  product_id: number;
  variant_id: number;
  product_name: string;
  variant_name: string;
  price: string;
  quantity: number;
  variants: Product["variants"];
};

export default function POSPage() {
  const [activeCategory, setActiveCategory] = useState(1);
  const [cart, setCart] = useState<CartItem[] | []>([]);

  const productsQuery = useGetProductsQuery({
    page: 1,
    limit: 100,
    category_id: activeCategory,
  });

  const addToCart = (product: Product) => {
    const productInfo = {
      product_id: product.id,
      variant_id: product.variants[0].id,
      product_name: product.name,
      variant_name: product.variants[0].name,
      price: product.variants[0].price,
      quantity: 1,
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

  // Calculations
  const subtotal = cart.reduce(
    (sum, item) => sum + Number(item.price) * item.quantity,
    0,
  );
  const total = subtotal ;

  return (
    <div className="flex h-screen w-full bg-slate-50 text-slate-900 overflow-hidden font-sans">
      {/* COLUMN 1: CATEGORIES (Width: 1/6 or fixed sidebar) */}
      <div className="w-40 bg-white border-r border-slate-200 flex flex-col justify-between p-4 gap-4">
        <div>
          <div className="flex items-center gap-2 px-2 py-3 mb-4 border-b border-slate-100">
            <ShoppingCart className="h-6 w-6 text-primary" />
            <span className="font-bold text-lg tracking-tight">Categories</span>
          </div>
          <div className="space-y-1">
            {CATEGORIES.map((cat) => {
              // const Icon = cat.icon;
              const isActive = activeCategory === cat.id;
              return (
                <button
                  key={cat.id}
                  onClick={() => setActiveCategory(cat.id)}
                  className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium transition-all duration-200 ${
                    isActive
                      ? "bg-primary text-white shadow-md shadow-indigo-100"
                      : "text-slate-600 hover:bg-slate-100"
                  }`}
                >
                  {/* <Icon className="h-5 w-5" /> */}
                  {cat.name}
                </button>
              );
            })}
          </div>
        </div>

        <div className="bg-slate-100 p-3 rounded-xl text-xs text-slate-500 text-center">
          Cashier: Alex
        </div>
      </div>

      {/* COLUMN 2: PRODUCTS (Flexible middle space) */}
      <div className="flex-1 flex flex-col min-w-0 bg-slate-50">
        {/* Header */}
        <div className="h-16 bg-white border-b border-slate-200 flex items-center justify-between px-6">
          {/* <h1 className="text-xl font-bold text-slate-800 capitalize">
            {activeCategory === "all"
              ? "All Products"
              : `${activeCategory} menu`}
          </h1> */}
          <div className="text-sm text-slate-500">
            {/* {filteredProducts.length} Items available */}
          </div>
        </div>

        {/* Product Grid Grid */}
        <div className="flex-1 overflow-y-auto p-6">
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
            {productsQuery.isFetching ? (
              <Skeleton className="h-40 w-full rounded-xl col-span-full" />
            ) : (
              productsQuery.data.data?.map((product: Product) => (
                <button
                  key={product.id}
                  onClick={() => addToCart(product)}
                  className="group flex flex-col bg-white border border-slate-200 rounded-2xl p-4 text-left shadow-sm hover:shadow-md hover:border-indigo-200 transition-all duration-200 active:scale-[0.98]"
                >
                  {/* <div className="w-full h-32 bg-slate-50 rounded-xl flex items-center justify-center text-4xl mb-3 group-hover:scale-105 transition-transform duration-200">
                    {formatFileUrl(product.image_path)}
                  </div> */}
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
            onClick={() => alert(`Processing payment of ${formatPrice(total)}`)}
            className="w-full bg-primary hover:bg-indigo-700 disabled:bg-slate-300 disabled:cursor-not-allowed text-white font-bold py-3.5 px-4 rounded-xl flex items-center justify-center gap-2 shadow-lg shadow-indigo-100 transition-all active:scale-[0.99]"
          >
            <CreditCard className="h-5 w-5" />
            Pay Now
          </button>
        </div>
      </div>
    </div>
  );
}
