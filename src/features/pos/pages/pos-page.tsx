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
import useCart from "../hooks/use-cart";

export default function POSPage() {
  const [openSheet, setOpenSheet] = useState(false);
  const [isPaymentOpen, setIsPaymentOpen] = useState(false);
  const [activeCategory, setActiveCategory] = useState(1);
  const {
    cart,
    addToCart,
    updateQuantity,
    changeVariant,
    clearCart,
    subtotal,
    total,
  } = useCart();
  
  const [editingItem, setEditingItem] = useState<CartItem | null>(null);

  const productsQuery = useGetProductsQuery({
    page: 1,
    limit: 100,
    category_id: activeCategory,
  });

  const checkoutMutation = useCreateCheckoutMutation();
 

  const handleEditItem = (item: CartItem) => {
    setEditingItem(item);
    setOpenSheet(true);
  };

  //MAKE IT MUTATEASYNC AND USE TRY CATCH
  const handleConfirmPayment = (amountReceived: number) => {
    const payload = {
      received_amount: amountReceived,
      items: cart,
    };

    checkoutMutation.mutate(payload, {
      onSuccess: () => {
        clearCart();
        setIsPaymentOpen(false);
      },
      onError: (error) => {
        console.error("Checkout failed:", error);
        alert("Payment failed. Please try again.");
      },
    });
  };


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
        onClearCart={clearCart}
        subtotal={subtotal}
        total={total}
        onPay={() => setIsPaymentOpen(true)}
      />

      <ProductVariantsDialog
        open={openSheet}
        onOpen={setOpenSheet}
        item={editingItem}
        onVariantChange={changeVariant}
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
