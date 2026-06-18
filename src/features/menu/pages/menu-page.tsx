import { useState } from "react";
import { menuCategories } from "../data/menu";
import useGetProductsQuery from "../queries/use-get-products-query";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { cn } from "@/lib/utils";
import MenuProductGrid from "../components/menu-product-grid";
import ProductDetailsDrawer from "../components/product-details-drawer";
import type { Product } from "../../../types/models/product";

export default function MenuPage() {
  const [active, setActive] = useState<number | null>(null);
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(
    null,
  );

  const products = useGetProductsQuery({ page: 1, limit: 100, category_id: active });
  const productItems = products.data?.data ?? [];

  return (
    <div className="min-h-screen bg-background">
      {/* Hero */}
      <section className="border-b border-border bg-[linear-gradient(180deg,var(--color-secondary),transparent)]/60 px-6 py-16 text-center">
        <p className="mb-2 text-xs font-semibold tracking-[0.2em] uppercase text-muted-foreground">
          Cassava Café
        </p>
        <h1 className="font-heading text-4xl font-light tracking-tight text-foreground md:text-5xl">
          Our Menu
        </h1>
        <p className="mx-auto mt-4 max-w-sm text-sm leading-relaxed text-muted-foreground">
          Thoughtfully crafted drinks and bites, made fresh every day.
        </p>
      </section>

      {/* Category Tabs */}
      <section className="sticky top-0 z-10 border-b border-border bg-background/95 backdrop-blur-sm">
        <div className="mx-auto max-w-6xl overflow-x-auto">
          <div className="flex gap-0 px-6">
            {menuCategories.map((cat) => (
              <button
                key={cat.value}
                onClick={() => setActive(cat.value)}
                className={cn(
                  "shrink-0 border-b-2 px-4 py-4 text-xs font-semibold tracking-widest uppercase transition-colors cursor-pointer",
                  active === cat.value
                    ? "border-foreground text-foreground"
                    : "border-transparent text-muted-foreground hover:text-foreground",
                )}
              >
                {cat.label}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Grid */}
      <main className="mx-auto max-w-6xl px-6 py-12">
        {products.isFetching ? (
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {Array.from({ length: 3 }).map((_, i) => (
              <Card
                key={i}
                className="w-full rounded-3xl border border-border/70"
              >
                <CardHeader>
                  <Skeleton className="aspect-video w-full" />
                </CardHeader>
                <CardContent>
                  <Skeleton className="h-4 w-2/3 mb-2" />
                  <Skeleton className="h-4 w-1/2" />
                </CardContent>
              </Card>
            ))}
          </div>
        ) : active === null ? (
          menuCategories
            .filter((c) => c.value !== null)
            .map((cat) => {
              const catItems = productItems.filter(
                ({ category_id }: { category_id: number }) => category_id === cat.value,
              );
              return (
                <section key={cat.value} className="mb-16">
                  <div className="mb-6 flex items-center gap-4">
                    <h2 className="font-heading text-xs font-semibold tracking-[0.2em] uppercase text-muted-foreground">
                      {cat.label}
                    </h2>
                    <div className="h-px flex-1 bg-border" />
                  </div>
                  <MenuProductGrid
                    items={catItems}
                    onSelect={setSelectedProduct}
                  />
                </section>
              );
            })
        ) : (
          <MenuProductGrid items={productItems} onSelect={setSelectedProduct} />
        )}
      </main>

      <ProductDetailsDrawer
        product={selectedProduct}
        open={selectedProduct !== null}
        onClose={() => setSelectedProduct(null)}
      />
    </div>
  );
}
