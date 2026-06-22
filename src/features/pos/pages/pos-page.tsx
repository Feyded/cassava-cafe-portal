import useGetProductsQuery from "../queries/use-get-products-query";
import { useState } from "react";
import ProductList from "../components/product-list";

export default function PosPage() {
  const [selectedCategory, setSelectedCategory] = useState(1);
  const productsQuery = useGetProductsQuery({
    page: 1,
    limit: 100,
    categoryId: selectedCategory,
  });

  return (
    <div>
      <ProductList
        products={productsQuery.data?.data}
        loading={productsQuery.isFetching}
        onCategoryChange={setSelectedCategory}
      />

      
    </div>
  );
}
