import useGetProductsQuery from "../queries/use-get-products-query";
import { useState } from "react";
import ProductList from "../components/product-list";
import CartSidebar from "../components/cart-sidebar";
import { ProductCustomizerDialog } from "../components/product-customizer-dialog";
import type { Product } from "@/types/models/product";
import useCart from "../hooks/use-cart";
import { PayDialog } from "../components/pay-dialog";
import useCreateCheckoutMutation from "../queries/use-create-checkout-mutation";
import { toast } from "sonner";
import { getErrorMessage } from "@/utils/get-error-message";

export default function PosPage() {
  const [selectedCategory, setSelectedCategory] = useState(1);
  const [isCustomizerOpen, setIsCustomizerOpen] = useState(false);
  const [isPayDialogOpen, setIsPayDialogOpen] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const productsQuery = useGetProductsQuery({
    page: 1,
    limit: 100,
    categoryId: selectedCategory,
  });

  const checkoutMutation = useCreateCheckoutMutation();

  const { cart, addToCart, removeFromCart, updateQuantity } = useCart();

  const handleProductClick = (product: Product) => {
    setSelectedProduct(product);
    setIsCustomizerOpen(true);
  };

  const handleCheckout = async (amountPaid: number) => {
    try {
      const payload = {
        received_amount: amountPaid, 
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

      await checkoutMutation.mutateAsync(payload);
      setIsPayDialogOpen(false);
      toast.success("Checkout successful!");
    } catch (error) {
      toast.error(getErrorMessage(error));
    }
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
    </div>
  );
}
