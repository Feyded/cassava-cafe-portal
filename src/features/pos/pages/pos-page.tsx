import type { Product } from "@/features/menu/types/product";
import type { CartItem } from "../types/cart-item";
import { useState } from "react";
import useGetProductsQuery from "@/features/menu/queries/use-get-products-query";
import PaymentDialog from "../components/payment-dialog";
import useCreateCheckoutMutation from "../queries/use-create-checkout-mutation";
import CategoryList from "../components/category-list";
import ProductList from "../components/product-list";
import Cart from "../components/cart";
import ProductVariantsDialog from "../components/product-variants-dialog";

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

      <ProductList
        products={productsQuery.data?.data || []}
        loading={productsQuery.isFetching}
        addToCart={addToCart}
      />

      <Cart
        items={cart}
        updateQuantity={updateQuantity}
        handleEditItem={handleEditItem}
        onClearCart={() => setCart([])}
        subtotal={subtotal}
        total={total}
        onPay={() => setIsPaymentOpen(true)}
      />

      <ProductVariantsDialog
        open={openSheet}
        onOpen={setOpenSheet}
        item={editingItem}
        onVariantChange={handleVariantChange}
      />

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
