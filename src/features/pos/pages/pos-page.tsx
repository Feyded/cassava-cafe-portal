import useGetProductsQuery from "../queries/use-get-products-query";
import { useState } from "react";
import ProductList from "../components/product-list";
import CartSidebar from "../components/cart-sidebar";
import { ProductCustomizerDialog } from "../components/product-customizer-dialog";
import type { Product } from "@/types/models/product";
import useCart from "../hooks/use-cart";
import { PayDialog } from "../components/pay-dialog";

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

  const { cart, addToCart, removeFromCart, updateQuantity } = useCart();

  const handleProductClick = (product: Product) => {
    setSelectedProduct(product);
    setIsCustomizerOpen(true);
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

      <PayDialog
        isOpen={isPayDialogOpen}
        onOpenChange={setIsPayDialogOpen}
        cart={cart}
        onCompletePayment={(paymentMethod, amountPaid, change) => {
          console.log("Payment completed:", {
            paymentMethod,
            amountPaid,
            change,
          });
        }}
      />
      <ProductCustomizerDialog
        isOpen={isCustomizerOpen}
        product={selectedProduct!}
        onAddToCart={addToCart}
        onClose={() => setIsCustomizerOpen(false)}
      />
    </div>
  );
}
