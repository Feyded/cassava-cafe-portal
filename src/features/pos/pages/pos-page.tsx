import useGetProductsQuery from "../hooks/use-get-products-query";
import { useState } from "react";
import ProductList from "../components/product-list";
import CartSidebar from "../components/cart-sidebar";
import { ProductCustomizerDialog } from "../components/product-customizer-dialog";
import useCart from "../hooks/use-cart";
import { PayDialog } from "../components/pay-dialog";
import useCreateCheckoutMutation from "../hooks/use-create-checkout-mutation";
import { toast } from "sonner";
import { getErrorMessage } from "@/shared/utils/get-error-message";
import CheckoutSuccessDialog from "../components/checkout-success-dialog";
import type { Order } from "@/entities/order";
import type { Product } from "@/entities/product";
import type { CheckoutPaymentPayload } from "../types";

export default function PosPage() {
  const [selectedCategory, setSelectedCategory] = useState(1);
  const [isCustomizerOpen, setIsCustomizerOpen] = useState(false);
  const [isPayDialogOpen, setIsPayDialogOpen] = useState(false);
  const [isSuccessDialogOpen, setIsSuccessDialogOpen] = useState(false);
  const [completedOrder, setCompletedOrder] = useState<Order | null>(null);
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const productsQuery = useGetProductsQuery({
    page: 1,
    limit: 100,
    categoryId: selectedCategory,
  });

  const checkoutMutation = useCreateCheckoutMutation();

  const { cart, addToCart, removeFromCart, updateQuantity, clearCart } =
    useCart();

  const handleProductClick = (product: Product) => {
    setSelectedProduct(product);
    setIsCustomizerOpen(true);
  };

  const handleCheckout = async (payment: CheckoutPaymentPayload) => {
    try {
      const payload = {
        payment_method: payment.payment_method,
        received_amount: payment.received_amount,
        reference_number: payment.reference_number,
        payment_provider: payment.payment_provider,
        items: cart.map((item) => ({
          variant_id: item.variant_id,
          quantity: item.quantity,
          price: item.price,
          modifiers: item.modifiers.map((mod) => ({
            modifier_id: mod.id,
            quantity: 1,
          })),
        })),
      };

      const response = await checkoutMutation.mutateAsync(payload);
      
      setIsPayDialogOpen(false);
      setCompletedOrder(response.data);
      setIsSuccessDialogOpen(true);
      toast.success("Checkout successful!");
    } catch (error) {
      toast.error(getErrorMessage(error));
      throw error;
    }
  };

  const handleNewSale = () => {
    clearCart();
    setCompletedOrder(null);
    setIsSuccessDialogOpen(false);
  };

  return (
    <div>
      <div className="flex">
        <ProductList
          products={productsQuery.data?.data}
          loading={productsQuery.isFetching}
          onCategoryChange={setSelectedCategory}
          onProductClick={handleProductClick}
        />

        <CartSidebar
          cart={cart}
          updateQuantity={updateQuantity}
          removeFromCart={removeFromCart}
          onProceedToPay={() => setIsPayDialogOpen(true)}
        />
      </div>

      <ProductCustomizerDialog
        isOpen={isCustomizerOpen}
        product={selectedProduct!}
        onAddToCart={addToCart}
        onClose={() => setIsCustomizerOpen(false)}
      />

      <PayDialog
        isOpen={isPayDialogOpen}
        onOpenChange={setIsPayDialogOpen}
        cart={cart}
        onCheckout={handleCheckout}
        isLoading={checkoutMutation.isPending}
      />

      <CheckoutSuccessDialog
        isOpen={isSuccessDialogOpen}
        onOpenChange={setIsSuccessDialogOpen}
        order={completedOrder}
        onNewSale={handleNewSale}
      />
    </div>
  );
}
