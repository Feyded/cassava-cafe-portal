import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import type { Product } from "@/types/models/product";
import { formatFileUrl } from "@/utils/format-file-url";
import { formatPrice } from "@/utils/format-price";
import { ArrowLeft } from "lucide-react";
import { Link } from "react-router-dom";

type ProductListProps = {
  products: Product[];
  loading: boolean;
  onCategoryChange: (categoryId: number) => void;
};

export const categories = [
  { value: 1, label: "Snacks" },
  { value: 2, label: "Refreshers" },
  { value: 3, label: "Fruit Tea" },
  { value: 4, label: "Hot Coffee" },
  { value: 5, label: "Iced Coffee" },
  { value: 6, label: "Smoothies" },
  { value: 7, label: "Yoghurt Series" },
  { value: 8, label: "Frappe" },
];

export default function ProductList({
  products,
  loading,
  onCategoryChange,
}: ProductListProps) {
  return (
    <div className="flex-1 p-4 overflow-hidden pr-80">
      <Link to="/" className="mb-4 inline-block">
        <Button size="sm" variant="outline">
          <ArrowLeft className="size-4" />
        </Button>
      </Link>
      <div className="flex flex-col gap-4">
        <div className="flex gap-2 mb-5 whitespace-nowrap overflow-x-auto">
          {categories.map((category) => (
            <Button
              size="sm"
              key={category.value}
              className="  rounded-md bg-primary text-white"
              onClick={() => onCategoryChange(category.value)}
            >
              {category.label}
            </Button>
          ))}
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 xl:grid-cols-8 gap-2 overflow-y-auto">
          {loading &&
            Array.from({ length: 8 }).map((_, index) => (
              <div className="p-2" key={index}>
                <Skeleton
                  key={index}
                  className="w-full h-32 bg-red overflow-hidden rounded-md bg-muted"
                />
                <Skeleton className="mt-2 h-4 w-full rounded-md" />
                <div className="flex justify-center">
                  <Skeleton className="mt-1 h-4 w-1/2 rounded-md" />
                </div>
              </div>
            ))}

          {!loading &&
            products.map((product: Product) => (
              <button
                key={product.id}
                className="p-2 cursor-pointer border-2 rounded-md"
              >
                <div className="flex flex-col items-center justify-center">
                  <div className="w-full h-32 bg-red overflow-hidden rounded-md bg-muted">
                    <img
                      src={
                        product?.category
                          ? formatFileUrl(product.image_path)
                          : ""
                      }
                      alt={product.name}
                      className="h-full w-full object-cover"
                    />
                  </div>
                  <h3 className="mt-2 text-sm font-medium text-neutral-800">
                    {product.name}
                  </h3>
                  <p className="text-sm font-semibold text-neutral-900">
                    {formatPrice(product.variants[0].price)}
                  </p>
                </div>
              </button>
            ))}
        </div>
      </div>
    </div>
  );
}
