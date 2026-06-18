import { formatFileUrl } from "@/utils/format-file-url";
import { getPriceLabel } from "../hooks/get-price-label";
import type { Product} from "../../../types/models/product";

type MenuProductGridProps = {
  items: Product[];
  onSelect: (product: Product) => void;
};

export default function MenuProductGrid({
  items,
  onSelect,
}: MenuProductGridProps) {
  return (
    <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
      {items.map((item) => (
        <button
          key={item.id}
          type="button"
          onClick={() => onSelect(item)}
          className="group cursor-pointer relative overflow-hidden rounded-3xl border border-border/80 bg-card p-4 text-left shadow-sm transition hover:border-foreground/15 hover:bg-muted/30 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background sm:p-5"
        >
          <div className="mb-4 overflow-hidden rounded-2xl bg-muted">
            <img
              src={
                item.image_path
                  ? formatFileUrl(item.image_path)
                  : "https://images.unsplash.com/photo-1510707577719-ae7c14805e3a?w=600&h=400&fit=crop"
              }
              alt={item.name}
              className="h-44 w-full object-cover transition-transform duration-500 group-hover:scale-105"
            />
          </div>

          <div className="space-y-2">
            <h3 className="font-heading text-lg font-semibold tracking-tight text-foreground">
              {item.name}
            </h3>
            <p className="min-h-10 text-sm leading-6 text-muted-foreground line-clamp-2">
              {item.description}
            </p>
          </div>

          <div className="mt-5 flex items-end justify-between gap-4 border-t border-border/70 pt-4">
            <div>
              <p className="text-base font-semibold text-foreground">
                {getPriceLabel(item.variants)}
              </p>
              <p className="mt-1 text-[0.65rem] font-semibold tracking-[0.18em] uppercase text-muted-foreground">
                {item.variants.length} variant
                {item.variants.length === 1 ? "" : "s"}
              </p>
            </div>
          </div>
        </button>
      ))}
    </div>
  );
}
