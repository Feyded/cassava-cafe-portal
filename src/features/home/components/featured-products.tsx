import useGetProductsQuery from "@/features/menu/queries/use-get-products-query";
import ProductCard from "./product-card";
import ProductCardSkeleton from "./product-card-skeleton";
import type { Product } from "@/types/models/product";

export default function FeaturedProducts() {
  const products = useGetProductsQuery({
    page: 1,
    limit: 6,
    category_id: null,
  });

  return (
    <section className="py-20 md:py-28">
      <div className="mx-auto max-w-6xl px-6">
        <div className="mb-12">
          <p className="mb-3 text-xs font-semibold uppercase tracking-widest text-muted-foreground">
            What we make
          </p>
          <h2 className="font-heading text-3xl font-semibold md:text-4xl">
            Featured Items
          </h2>
        </div>

        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {products.isFetching
            ? Array.from({ length: 6 }).map((_, i) => (
                <ProductCardSkeleton key={i} />
              ))
            : products.data?.data.map((product: Product) => (
                <ProductCard key={product.id} product={product} />
              ))}
        </div>
      </div>
    </section>
  );
}
