import { Skeleton } from "@/components/ui/skeleton";
import type { Product } from "@/types/models/product";
import { formatPrice } from "@/utils/format-price";

interface ProductListProps {
  products: Product[];
  loading: boolean;
  addToCart: (product: Product) => void;
}

export default function ProductList({ products, loading, addToCart }: ProductListProps) {
  return (
    <div className="flex-1 overflow-y-auto p-6">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {loading ? (
          <>
            {Array.from({ length: 8 }).map((_, idx) => (
              <Skeleton key={idx} className="h-40 w-full rounded-xl" />
            ))}
          </>
        ) : (
          products.map((product: Product) => (
            <button
              key={product.id}
              onClick={() => addToCart(product)}
              className="group flex flex-col bg-white border border-slate-200 rounded-2xl p-4 text-left shadow-sm hover:shadow-md hover:border-indigo-200 transition-all duration-200 active:scale-[0.98]"
            >
              <h3 className="font-semibold text-slate-800 line-clamp-1 mb-1">
                {product.name}
              </h3>
              <div className="mt-auto flex items-center justify-between w-full pt-2">
                <span className="text-primary font-bold">
                  {formatPrice(product.variants[0].price)}
                </span>
                <span className="text-xs bg-slate-100 text-slate-500 px-2 py-0.5 rounded-md capitalize">
                  {product.category.name}
                </span>
              </div>
            </button>
          ))
        )}
      </div>
    </div>
  );
}
