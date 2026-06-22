import useGetProductsQuery from "../queries/use-get-products-query";
import { useState } from "react";
import ProductList from "../components/product-list";
import CartSidebar from "../components/cart-sidebar";

export default function PosPage() {
  const [selectedCategory, setSelectedCategory] = useState(1);
  const [isCustomizerOpen, setIsCustomizerOpen] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const productsQuery = useGetProductsQuery({
    page: 1,
    limit: 100,
    categoryId: selectedCategory,
  });

  return (
    <div>
      <div className="flex">
        <ProductList
          products={productsQuery.data?.data}
          loading={productsQuery.isFetching}
          onCategoryChange={setSelectedCategory}
        />

        <CartSidebar />

      </div>
    </div>
  );
}
