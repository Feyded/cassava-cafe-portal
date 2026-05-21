import { formatPrice } from "@/utils/format-price";
import type { MenuProduct } from "../types/product";

type MenuProductGridProps = {
  items: MenuProduct[];
  onSelect: (product: MenuProduct) => void;
};

function getPriceLabel(variants: MenuProduct["variants"]) {
  if (variants.length === 0) {
    return "Price unavailable";
  }

  const firstPrice = variants[0].price;
  const lastPrice = variants.at(-1)?.price ?? firstPrice;

  if (firstPrice === lastPrice) {
    return formatPrice(firstPrice);
  }

  return `${formatPrice(firstPrice)} - ${formatPrice(lastPrice)}`;
}

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
          className="group relative overflow-hidden rounded-3xl border border-border/80 bg-card p-4 text-left shadow-sm transition hover:border-foreground/15 hover:bg-muted/30 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background sm:p-5"
        >
          <div className="mb-4 overflow-hidden rounded-2xl bg-muted">
            <img
              src={
                item.image ??
                "https://images.unsplash.com/photo-1510707577719-ae7c14805e3a?w=600&h=400&fit=crop"
              }
              alt={item.name}
              className="h-44 w-full object-cover transition-transform duration-500 group-hover:scale-105"
            />
          </div>

          {item.bestseller && (
            <span className="mb-3 inline-flex items-center gap-1.5 rounded-full bg-secondary px-2.5 py-1 text-[0.65rem] font-semibold tracking-[0.18em] uppercase text-secondary-foreground">
              <span className="h-1.5 w-1.5 rounded-full bg-primary" />
              Bestseller
            </span>
          )}

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
                {item.variants.length} variant{item.variants.length === 1 ? "" : "s"}
              </p>
            </div>
          </div>
        </button>
      ))}
    </div>
  );
}