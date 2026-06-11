import React, { useState, useMemo } from 'react';
import { 
  Search, 
  Trash2, 
  Plus, 
  Minus, 
  ShoppingCart, 
  CreditCard, 
  DollarSign, 
  Tag,
  X,
  Check
} from 'lucide-react';

// --- Types ---
interface Variant {
  id: string;
  name: string; // e.g., "16oz / Whole Milk", "Small", "1kg Bag"
  priceModifier: number; // Added to the base product price
  sku: string;
}

interface Product {
  id: string;
  name: string;
  basePrice: number;
  category: string;
  sku: string;
  color: string;
  variants?: Variant[]; // Optional array of variants
}

interface CartItem {
  cartId: string; // unique string matching product_id + variant_id
  product: Product;
  selectedVariant?: Variant;
  quantity: number;
}

// --- Mock Data ---
const PRODUCTS: Product[] = [
  { 
    id: '1', 
    name: 'Premium Espresso Beans', 
    basePrice: 18.50, 
    category: 'Coffee', 
    sku: 'COF-001', 
    color: 'bg-amber-100 text-amber-800',
    variants: [
      { id: 'v1-1', name: '250g Bag', priceModifier: 0, sku: 'COF-001-250' },
      { id: 'v1-2', name: '500g Bag', priceModifier: 12.00, sku: 'COF-001-500' },
      { id: 'v1-3', name: '1kg Bag', priceModifier: 24.50, sku: 'COF-001-1K' }
    ]
  },
  { 
    id: '2', 
    name: 'Organic Green Tea', 
    basePrice: 12.00, 
    category: 'Tea', 
    sku: 'TEA-004', 
    color: 'bg-emerald-100 text-emerald-800' 
  },
  { 
    id: '3', 
    name: 'Iced Latte', 
    basePrice: 4.50, 
    category: 'Coffee', 
    sku: 'COF-012', 
    color: 'bg-amber-100 text-amber-800',
    variants: [
      { id: 'v3-1', name: 'Regular / Whole Milk', priceModifier: 0, sku: 'LAT-REG-WM' },
      { id: 'v3-2', name: 'Large / Whole Milk', priceModifier: 1.00, sku: 'LAT-LRG-WM' },
      { id: 'v3-3', name: 'Regular / Oat Milk', priceModifier: 1.25, sku: 'LAT-REG-OM' },
      { id: 'v3-4', name: 'Large / Oat Milk', priceModifier: 2.25, sku: 'LAT-LRG-OM' }
    ]
  },
  { id: '4', name: 'Almond Croissant', basePrice: 4.50, category: 'Bakery', sku: 'BAK-012', color: 'bg-orange-100 text-orange-800' },
  { id: '5', name: 'Stainless Steel Tumbler', basePrice: 24.99, category: 'Merchandise', sku: 'MER-089', color: 'bg-slate-100 text-slate-800' },
];

const CATEGORIES = ['All', 'Coffee', 'Tea', 'Bakery', 'Merchandise'];

export default function VariantPOS() {
  // UI State
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [cart, setCart] = useState<CartItem[]>([]);
  const [discount, setDiscount] = useState<number>(0);

  // Variant Selection Sheet State
  const [activeProduct, setActiveProduct] = useState<Product | null>(null);
  const [chosenVariant, setChosenVariant] = useState<Variant | null>(null);

  // Filter Logic
  const filteredProducts = useMemo(() => {
    return PRODUCTS.filter((p) => {
      const matchesSearch = p.name.toLowerCase().includes(searchQuery.toLowerCase()) || p.sku.toLowerCase().includes(searchQuery.toLowerCase());
      const matchesCategory = selectedCategory === 'All' || p.category === selectedCategory;
      return matchesSearch && matchesCategory;
    });
  }, [searchQuery, selectedCategory]);

  // Handle Item Tap
  const handleProductClick = (product: Product) => {
    if (product.variants && product.variants.length > 0) {
      setActiveProduct(product);
      setChosenVariant(product.variants[0]); // Auto-select first variant
    } else {
      executeAddToCart(product);
    }
  };

  // Cart Commit
  const executeAddToCart = (product: Product, variant?: Variant) => {
    const cartId = variant ? `${product.id}-${variant.id}` : product.id;
    
    setCart((prevCart) => {
      const existing = prevCart.find((item) => item.cartId === cartId);
      if (existing) {
        return prevCart.map((item) =>
          item.cartId === cartId ? { ...item, quantity: item.quantity + 1 } : item
        );
      }
      return [...prevCart, { cartId, product, selectedVariant: variant, quantity: 1 }];
    });

    // Reset overlay
    setActiveProduct(null);
    setChosenVariant(null);
  };

  const updateQuantity = (cartId: string, amount: number) => {
    setCart((prev) =>
      prev.map((item) => (item.cartId === cartId ? { ...item, quantity: item.quantity + amount } : item))
          .filter((item) => item.quantity > 0)
    );
  };

  // Math Utilities
  const getItemPrice = (item: CartItem) => {
    const base = item.product.basePrice;
    const modifier = item.selectedVariant ? item.selectedVariant.priceModifier : 0;
    return base + modifier;
  };

  const subtotal = useMemo(() => {
    return cart.reduce((sum, item) => sum + getItemPrice(item) * item.quantity, 0);
  }, [cart]);

  const tax = subtotal * 0.12;
  const total = Math.max(0, subtotal + tax - discount);

  return (
    <div className="flex h-screen w-full bg-slate-50 text-slate-900 overflow-hidden font-sans relative">
      
      {/* LEFT COLUMN: Catalogue */}
      <div className="flex flex-col flex-1 p-6 overflow-hidden">
        <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between pb-4 border-b border-slate-200">
          <div>
            <h1 className="text-2xl font-bold tracking-tight">Terminal #01</h1>
            <p className="text-sm text-slate-500">Select items or configuration</p>
          </div>
          <div className="relative w-full sm:w-80">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400" />
            <input
              type="text"
              placeholder="Search items or lookup SKU..."
              className="w-full pl-9 pr-4 py-2 bg-white border border-slate-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-slate-900"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
        </div>

        {/* Categories */}
        <div className="flex gap-2 py-4 overflow-x-auto">
          {CATEGORIES.map((cat) => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={`px-4 py-1.5 rounded-full text-xs font-medium border transition-all ${
                selectedCategory === cat ? 'bg-slate-900 text-white border-slate-900' : 'bg-white text-slate-600 border-slate-200'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Dynamic Products Grid */}
        <div className="flex-1 overflow-y-auto pr-2 pb-6">
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            {filteredProducts.map((product) => (
              <button
                key={product.id}
                onClick={() => handleProductClick(product)}
                className="flex flex-col justify-between text-left p-4 bg-white border border-slate-200 rounded-xl hover:border-slate-400 shadow-sm transition-all relative group"
              >
                {product.variants && (
                  <span className="absolute top-2 right-2 bg-slate-100 text-slate-700 text-[10px] px-2 py-0.5 rounded font-medium">
                    {product.variants.length} options
                  </span>
                )}
                <div className={`w-full aspect-video rounded-lg mb-3 flex items-center justify-center font-bold text-xs uppercase opacity-75 min-h-[70px] ${product.color}`}>
                  {product.category}
                </div>
                <div>
                  <span className="text-[10px] font-mono text-slate-400 block mb-0.5">{product.sku}</span>
                  <h3 className="font-semibold text-slate-800 text-sm line-clamp-2 h-10 leading-snug mb-1">{product.name}</h3>
                  <div className="text-sm font-bold text-slate-900">
                    ${product.basePrice.toFixed(2)}
                    {product.variants && <span className="text-xs text-slate-400 font-normal"> base</span>}
                  </div>
                </div>
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* RIGHT COLUMN: Checkouts Sidebar */}
      <div className="w-[400px] bg-white border-l border-slate-200 flex flex-col h-full shadow-lg">
        <div className="p-4 border-b border-slate-200 flex items-center justify-between">
          <div className="flex items-center gap-2 font-bold text-slate-800">
            <ShoppingCart className="h-4 w-4" />
            <span>Current Order</span>
            <span className="bg-slate-100 text-slate-700 px-2 py-0.5 rounded-full text-xs font-semibold">
              {cart.reduce((sum, i) => sum + i.quantity, 0)}
            </span>
          </div>
          {cart.length > 0 && (
            <button onClick={() => setCart([])} className="text-xs text-rose-600 font-medium hover:underline">
              Clear All
            </button>
          )}
        </div>

        {/* Basket List */}
        <div className="flex-1 overflow-y-auto p-4 space-y-3">
          {cart.length === 0 ? (
            <div className="h-full flex flex-col items-center justify-center text-slate-400 gap-2 py-20">
              <ShoppingCart className="h-8 w-8 stroke-[1.5]" />
              <p className="text-xs font-medium">Select items to begin cart calculations</p>
            </div>
          ) : (
            cart.map((item) => (
              <div key={item.cartId} className="flex items-center justify-between p-3 bg-slate-50 border border-slate-100 rounded-xl">
                <div className="flex-1 min-w-0 pr-2">
                  <h4 className="text-sm font-semibold text-slate-800 truncate">{item.product.name}</h4>
                  {item.selectedVariant && (
                    <span className="inline-block text-[11px] bg-slate-200/70 text-slate-700 px-1.5 py-0.5 rounded font-medium mt-0.5">
                      {item.selectedVariant.name}
                    </span>
                  )}
                </div>

                <div className="flex items-center gap-1.5 bg-white border border-slate-200 rounded-lg p-1 shadow-sm">
                  <button onClick={() => updateQuantity(item.cartId, -1)} className="p-0.5 text-slate-500 hover:bg-slate-100 rounded">
                    <Minus className="h-3 w-3" />
                  </button>
                  <span className="w-5 text-center text-xs font-bold text-slate-800">{item.quantity}</span>
                  <button onClick={() => updateQuantity(item.cartId, 1)} className="p-0.5 text-slate-500 hover:bg-slate-100 rounded">
                    <Plus className="h-3 w-3" />
                  </button>
                </div>

                <div className="text-right pl-3 min-w-[70px]">
                  <span className="text-sm font-bold block text-slate-900">
                    ${(getItemPrice(item) * item.quantity).toFixed(2)}
                  </span>
                </div>
              </div>
            ))
          )}
        </div>

        {/* Financial Tally Panel */}
        <div className="p-4 border-t border-slate-200 bg-slate-50/50 space-y-3">
          <div className="space-y-1.5 text-xs font-medium text-slate-600">
            <div className="flex justify-between">
              <span>Subtotal</span>
              <span className="text-slate-900">${subtotal.toFixed(2)}</span>
            </div>
            <div className="flex justify-between">
              <span>Tax (12%)</span>
              <span className="text-slate-900">${tax.toFixed(2)}</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="flex items-center gap-1 text-slate-500"><Tag className="h-3 w-3" /> Discount ($)</span>
              <input 
                type="number" 
                placeholder="0.00" 
                className="w-16 px-1.5 py-0.5 text-right bg-white border border-slate-200 rounded text-xs"
                value={discount || ''} 
                onChange={(e) => setDiscount(Number(e.target.value))}
              />
            </div>
            <div className="border-t border-slate-200 pt-2 flex justify-between text-sm font-bold text-slate-900">
              <span>Total Due</span>
              <span className="text-base">${total.toFixed(2)}</span>
            </div>
          </div>
          <div className="grid grid-cols-2 gap-2 pt-1">
            <button disabled={cart.length === 0} className="flex items-center justify-center gap-1.5 py-2.5 border border-slate-200 bg-white hover:bg-slate-50 rounded-xl font-semibold text-xs transition-all disabled:opacity-50">
              <DollarSign className="h-3.5 w-3.5" /> Cash
            </button>
            <button disabled={cart.length === 0} className="flex items-center justify-center gap-1.5 py-2.5 bg-slate-900 hover:bg-slate-800 text-white rounded-xl font-semibold text-xs transition-all disabled:opacity-50">
              <CreditCard className="h-3.5 w-3.5" /> Card
            </button>
          </div>
        </div>
      </div>

      {/* VARIANT SELECTION SHEET (Modal Overlay Backdrop) */}
      {activeProduct && (
        <div className="absolute inset-0 bg-slate-900/40 backdrop-blur-xs flex items-center justify-center z-50 p-4 animate-in fade-in duration-100">
          <div className="bg-white w-full max-w-md rounded-2xl shadow-xl border border-slate-200 overflow-hidden animate-in zoom-in-95 duration-150">
            {/* Modal Header */}
            <div className="p-4 border-b border-slate-100 flex items-center justify-between bg-slate-50">
              <div>
                <span className="text-[10px] font-mono font-bold tracking-wider uppercase text-slate-400">{activeProduct.category}</span>
                <h3 className="font-bold text-slate-900 text-base leading-tight">{activeProduct.name}</h3>
              </div>
              <button 
                onClick={() => { setActiveProduct(null); setChosenVariant(null); }}
                className="p-1.5 hover:bg-slate-200/70 text-slate-400 hover:text-slate-700 rounded-lg transition-colors"
              >
                <X className="h-4 w-4" />
              </button>
            </div>

            {/* Modal Content - Variant Radios */}
            <div className="p-4 space-y-2 max-h-[300px] overflow-y-auto">
              <span className="text-xs font-bold text-slate-500 uppercase tracking-wider block mb-1">Select Configuration</span>
              {activeProduct.variants?.map((v) => {
                const isSelected = chosenVariant?.id === v.id;
                const finalPrice = activeProduct.basePrice + v.priceModifier;
                return (
                  <button
                    key={v.id}
                    onClick={() => setChosenVariant(v)}
                    className={`w-full flex items-center justify-between p-3 rounded-xl border text-left transition-all ${
                      isSelected 
                        ? 'border-slate-900 bg-slate-900 text-white shadow-sm' 
                        : 'border-slate-200 bg-white text-slate-800 hover:bg-slate-50'
                    }`}
                  >
                    <div className="flex items-center gap-3">
                      <div className={`h-4 w-4 rounded-full border flex items-center justify-center ${isSelected ? 'border-white bg-white' : 'border-slate-300'}`}>
                        {isSelected && <div className="h-2 w-2 rounded-full bg-slate-900" />}
                      </div>
                      <div>
                        <p className="text-sm font-semibold">{v.name}</p>
                        <p className={`text-[10px] font-mono ${isSelected ? 'text-slate-300' : 'text-slate-400'}`}>{v.sku}</p>
                      </div>
                    </div>
                    <span className="text-sm font-bold">
                      ${finalPrice.toFixed(2)}
                    </span>
                  </button>
                );
              })}
            </div>

            {/* Modal Action Footer */}
            <div className="p-4 border-t border-slate-100 bg-slate-50 flex gap-2">
              <button 
                onClick={() => { setActiveProduct(null); setChosenVariant(null); }}
                className="flex-1 py-2 border border-slate-200 bg-white text-slate-700 rounded-xl font-medium text-xs hover:bg-slate-50"
              >
                Cancel
              </button>
              <button 
                onClick={() => chosenVariant && executeAddToCart(activeProduct, chosenVariant)}
                className="flex-1 py-2 bg-slate-900 text-white rounded-xl font-bold text-xs hover:bg-slate-800 flex items-center justify-center gap-1.5 shadow-sm"
              >
                <Check className="h-3.5 w-3.5" />
                Add to Cart
              </button>
            </div>
          </div>
        </div>
      )}

    </div>
  );
}