import useGetProductsQuery from "../queries/use-get-products-query";
import { useState } from "react";
import ProductList from "../components/product-list";
import CartSidebar from "../components/cart-sidebar";
import { ProductCustomizerDialog } from "../components/product-customizer-dialog";
import type { Product } from "@/types/models/product";
import useCart from "../hooks/use-cart";

export default function PosPage() {
  const [selectedCategory, setSelectedCategory] = useState(1);
  const [isCustomizerOpen, setIsCustomizerOpen] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const productsQuery = useGetProductsQuery({
    page: 1,
    limit: 100,
    categoryId: selectedCategory,
  });

  const { cart, addToCart, updateQuantity } = useCart();

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

        <CartSidebar cart={cart} updateQuantity={updateQuantity} />
      </div>

      <ProductCustomizerDialog
        isOpen={isCustomizerOpen}
        product={selectedProduct!}
        onAddToCart={addToCart}
        onClose={() => setIsCustomizerOpen(false)}
      />
    </div>
  );
}
